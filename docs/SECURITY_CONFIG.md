# Security Configuration

## Overview
This document covers security setup for authenticated endpoints and rate limiting.

## Admin Token Setup

The `GET /api/contact` endpoint requires authentication. Set the following environment variable:

### Generate a secure token:
```bash
# macOS/Linux - Option 1: OpenSSL
openssl rand -base64 32

# macOS/Linux - Option 2: Node.js (if OpenSSL not available)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Windows PowerShell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

### Store in environment:
```bash
# .env.local (development)
ADMIN_TOKEN=your-secure-token-here

# Or Vercel dashboard (production)
# Settings > Environment Variables > ADMIN_TOKEN
```

### Usage example:
```bash
# With curl
ADMIN_TOKEN="your-token-here"
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  https://heyimfuaad.me/api/contact

# With HTTPie
http --auth-type bearer --auth $ADMIN_TOKEN \
  https://heyimfuaad.me/api/contact?limit=50

# With jq for formatted output
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  https://heyimfuaad.me/api/contact | jq '.'
```

## Rate Limiting

Rate limiting uses Vercel KV (Redis) for persistence across deployments.

**Limits:** 
- 5 submissions per IP address per 24 hours
- Graceful degradation if KV is unavailable (requests allowed)

**Configuration:**
- KV credentials are auto-managed by Vercel
- No manual setup required if using Vercel deployments
- For local development, rate limiting continues with in-memory fallback

## Endpoint Reference

### GET /api/contact (Authenticated)
Returns all contact submissions.

**Requirements:**
- Authorization header with Bearer token
- Token must match ADMIN_TOKEN environment variable

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| sortBy | string | createdAt | Field to sort by: `createdAt`, `email`, `name` |
| sortOrder | string | desc | Sort direction: `asc`, `desc` |
| limit | number | 100 | Results per page: 1–100 |

**Response (Success - 200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Hello...",
      "createdAt": "2026-04-14T10:30:00Z"
    }
  ],
  "count": 1,
  "query": {
    "sortBy": "createdAt",
    "sortOrder": "desc",
    "limit": 100
  }
}
```

**Response (Unauthorized - 401):**
```json
{
  "error": "Unauthorized. Admin Bearer token required."
}
```

### POST /api/contact (Public)
Submit a new contact form.

**Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here..."
}
```

**Rate Limit:** 5 per 24 hours per IP

**Returns (201):**
```json
{
  "message": "Your message has been received. Thank you for reaching out!",
  "id": "submission-uuid"
}
```

## Deployment Checklist

- [ ] Generate secure random `ADMIN_TOKEN`
- [ ] Add `ADMIN_TOKEN` to Vercel Environment Variables (Settings > Environment Variables)
- [ ] Verify Vercel KV is connected (if using Redis rate limiting)
- [ ] Test authentication: `curl -H "Authorization: Bearer $TOKEN" https://yourdomain.com/api/contact`
- [ ] Test rate limiting with multiple rapid requests
- [ ] Monitor logs for auth failures: `Failed to fetch submissions`
- [ ] Document token securely (password manager, not in code)
- [ ] Set up alerts for 401/429 status codes

## Security Notes

1. **Token Handling**
   - Never commit `ADMIN_TOKEN` to git
   - Use constant-time comparison to prevent timing attacks
   - Rotate token if suspected to be compromised

2. **Rate Limiting**
   - 5 submissions per 24 hours per client IP
   - Uses XFF headers for proxy/CDN scenarios
   - Resets after 24 hours

3. **Input Validation**
   - All inputs validated via Zod schemas
   - HTML sanitization prevents XSS
   - Prisma parameterized queries prevent SQL injection

## Troubleshooting

**401 Unauthorized**
- Verify token is set: `echo $ADMIN_TOKEN`
- Check header format: `Authorization: Bearer <token>`
- Ensure token matches value in environment

**429 Too Many Requests**
- Wait 24 hours from first submission
- Token-based, not request-based limiting
- Check client IP isn't being shared (corporate proxy, VPN)

**KV Connection Issues**
- Rate limiting degrades gracefully
- Check Vercel KV status in dashboard
- Verify credentials are correctly configured
- Local development continues with in-memory fallback
