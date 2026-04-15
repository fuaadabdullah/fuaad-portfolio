/**
 * Authentication utilities for admin endpoints
 * Provides secure token verification and timing-safe comparisons
 */

/**
 * Verify admin authentication token using constant-time comparison
 * Prevents timing attacks that could leak token information
 * 
 * @param token - The token to verify (from Authorization header)
 * @returns true if token matches ADMIN_TOKEN, false otherwise
 */
export function verifyAdminToken(token: string): boolean {
  const adminToken = process.env.ADMIN_TOKEN;
  
  // If no admin token configured, deny access
  if (!adminToken) {
    console.warn('ADMIN_TOKEN not configured. GET /api/contact is blocked.');
    return false;
  }

  // Constant-time comparison prevents timing attacks
  // If either token is invalid length, fail safely
  if (token.length !== adminToken.length) {
    return false;
  }

  // Use a simple XOR comparison for constant-time verification
  // This is safer than string comparison which short-circuits
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ adminToken.charCodeAt(i);
  }
  
  return result === 0;
}

/**
 * Extract and validate Bearer token from Authorization header
 * 
 * @param authHeader - The Authorization header value
 * @returns The token string, or null if invalid
 */
export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader) return null;
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return null;
  }
  
  return parts[1];
}

/**
 * Check if a request is authorized
 * 
 * @param authHeader - The Authorization header from the request
 * @returns true if valid admin token provided, false otherwise
 */
export function isRequestAuthorized(authHeader: string | null): boolean {
  const token = extractBearerToken(authHeader);
  if (!token) return false;
  
  return verifyAdminToken(token);
}
