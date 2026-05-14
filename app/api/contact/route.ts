import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { ContactFormSchema, sanitizeText } from '@/lib/validation';
import { isRequestAuthorized } from '@/lib/auth';
import { kv } from '@vercel/kv';
import { z } from 'zod';

const ContactSubmissionsQuerySchema = z.object({
  sortBy: z.enum(['createdAt', 'email', 'name']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  limit: z.coerce.number().int().min(1).max(100).default(100),
});

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
 * Uses Vercel KV for persistent rate limiting across deployments
 */
async function isRateLimited(ip: string): Promise<boolean> {
  try {
    const key = `ratelimit:contact:${ip}`;
    const current = await kv.incr(key);
    
    // Set expiry on first increment
    if (current === 1) {
      await kv.expire(key, 86400); // 24 hours
    }
    
    return current > 5;
  } catch (error) {
    console.error('Rate limit check failed:', error);
    // Fail open on Redis error; don't block legitimate users
    return false;
  }
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

    // Check rate limit (now async)
    if (await isRateLimited(clientIp)) {
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
      const zodError = error as z.ZodError;
      const fieldErrors = zodError.issues.reduce<Record<string, string>>(
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
 * GET /api/contact (admin only)
 * 
 * Fetch all contact submissions with authentication required.
 * Requires Bearer token via Authorization header.
 * 
 * Example:
 * curl -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
 *   http://localhost:3000/api/contact?sortBy=createdAt&sortOrder=desc&limit=50
 * 
 * Query Parameters:
 * - sortBy: 'createdAt' | 'email' | 'name' (default: 'createdAt')
 * - sortOrder: 'asc' | 'desc' (default: 'desc')
 * - limit: number 1-100 (default: 100)
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    
    if (!isRequestAuthorized(authHeader)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin Bearer token required.' },
        { 
          status: 401,
          headers: {
            'WWW-Authenticate': 'Bearer realm="admin"'
          }
        }
      );
    }

    const { searchParams } = new URL(request.url);
    const parsedQuery = ContactSubmissionsQuerySchema.parse({
      sortBy: searchParams.get('sortBy') ?? undefined,
      sortOrder: searchParams.get('sortOrder') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
    });

    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { [parsedQuery.sortBy]: parsedQuery.sortOrder },
      take: parsedQuery.limit,
    });

    return NextResponse.json(
      {
        data: submissions,
        count: submissions.length,
        query: {
          sortBy: parsedQuery.sortBy,
          sortOrder: parsedQuery.sortOrder,
          limit: parsedQuery.limit,
        }
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid query parameters',
          details: error.issues.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }

    console.error('Failed to fetch submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
