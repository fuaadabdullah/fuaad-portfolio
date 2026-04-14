import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { ContactFormSchema, sanitizeText } from '@/lib/validation';
import { z } from 'zod';

// Track rate limiting per IP (in-memory, resets on restart)
// In production, use Redis or a distributed rate limit service
const submissionCounts = new Map<string, { count: number; resetTime: number }>();

/**
 * Extract client IP from request headers
 * Handles multiple proxy scenarios (Vercel, Cloudflare, etc.)
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  const realIp = request.headers.get('x-real-ip');
  
  return (forwarded?.split(',')[0] || cfConnectingIp || realIp || 'unknown').trim();
}

/**
 * Check rate limit: max 5 submissions per 24 hours per IP
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = submissionCounts.get(ip);

  if (!entry || now > entry.resetTime) {
    submissionCounts.set(ip, { count: 1, resetTime: now + 24 * 60 * 60 * 1000 });
    return false;
  }

  if (entry.count >= 5) {
    return true;
  }

  entry.count++;
  return false;
}

/**
 * POST /api/contact
 * 
 * Accepts contact form submission with SQL injection protections:
 * 1. Input validation (Zod schema enforces type and length constraints)
 * 2. HTML sanitization (removes script tags and event handlers)
 * 3. Parameterized queries via Prisma (SQL injection prevention)
 * 4. Rate limiting (prevents abuse)
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request);

    // Check rate limit
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse JSON body
    const body = await request.json();

    // Validate input with Zod schema
    // This prevents invalid data from reaching the database
    const validatedData = ContactFormSchema.parse(body);

    // Sanitize text fields to prevent XSS (defense-in-depth)
    const sanitizedData = {
      name: sanitizeText(validatedData.name),
      email: validatedData.email,
      message: sanitizeText(validatedData.message),
    };

    // Insert into database via Prisma
    // Prisma automatically uses parameterized queries, preventing SQL injection
    // Even if malicious SQL is in the data, it's treated as literal string content
    const submission = await prisma.contactSubmission.create({
      data: sanitizedData,
    });

    return NextResponse.json(
      {
        message: 'Your message has been received. Thank you for reaching out!',
        id: submission.id,
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.reduce<Record<string, string>>(
        (acc: Record<string, string>, err: any) => {
          const path = err.path.join('.');
          acc[path] = err.message;
          return acc;
        },
        {}
      );

      return NextResponse.json(
        { error: 'Validation failed', details: fieldErrors },
        { status: 400 }
      );
    }

    // Handle database errors
    if (error instanceof Error) {
      console.error('Contact submission error:', error.message);
    }

    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact (admin only, optional)
 * 
 * Fetch all contact submissions (requires admin authentication in production)
 * This is a basic example - add proper authentication/authorization before using
 */
export async function GET() {
  try {
    // TODO: Add authentication check here
    // if (!isAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100, // Limit to last 100 submissions
    });

    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
