// Rate limiting implementation
const userRateLimit = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS_PER_MINUTE = 10;

export function checkRateLimit(ip: string): { allowed: boolean; error?: string } {
  const now = Date.now();
  const userLimit = userRateLimit.get(ip) || { count: 0, resetTime: now + 60000 };

  if (userLimit.resetTime < now) {
    // Reset the counter
    userRateLimit.set(ip, { count: 1, resetTime: now + 60000 });
    return { allowed: true };
  } else if (userLimit.count >= MAX_REQUESTS_PER_MINUTE) {
    return {
      allowed: false,
      error: 'Rate limit exceeded. Please try again later.'
    };
  } else {
    // Increment the counter
    userRateLimit.set(ip, { ...userLimit, count: userLimit.count + 1 });
    return { allowed: true };
  }
}

export function getRateLimitConfig() {
  return {
    maxRequestsPerMinute: MAX_REQUESTS_PER_MINUTE
  };
}