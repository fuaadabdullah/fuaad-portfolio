// IP detection utilities for rate limiting and security
import { NextRequest } from 'next/server';

export function getClientIP(request: NextRequest): string {
  // Try multiple headers in order of preference for getting real client IP

  // Check x-forwarded-for (take first IP if multiple)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  // Check other proxy headers
  const realIP = request.headers.get('x-real-ip');
  if (realIP) return realIP;

  const clientIP = request.headers.get('x-client-ip');
  if (clientIP) return clientIP;

  // Cloudflare
  const cfIP = request.headers.get('cf-connecting-ip');
  if (cfIP) return cfIP;

  // RFC 7239 Forwarded header
  const forwarded = request.headers.get('forwarded');
  if (forwarded) {
    const match = forwarded.match(/for="?\[?([^;\]"]+)/);
    if (match) return match[1];
  }

  // Fallback to request.ip if available (Next.js 13+)
  if ('ip' in request && typeof request.ip === 'string') {
    return request.ip;
  }

  // Final fallback
  return 'anonymous';
}