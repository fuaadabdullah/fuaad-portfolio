# Security Audit Report
**Date:** April 14, 2026  
**Target:** fuaad-portfolio (heyimfuaad.me)  
**Scope:** HTTP endpoints, OG image handlers, API routes

---

## Executive Summary
Your portfolio site received a **path traversal probe** (`GET /twitter-image?38ff60930c93eb8c\`), which was safely rejected due to static file handling. However, the `/api/contact` endpoint has **3 critical security gaps** that require immediate remediation.

---

## Incidents Detected

### 1. Path Traversal Probe on `/twitter-image`
**Severity:** LOW (safely mitigated)  
**Request:** `GET /twitter-image?38ff60930c93eb8c\ HTTP/1.1`  
**Analysis:**
- Backslash (`\`) is a path traversal bypass technique
- Typical of automated scanner fuzzing
- **Result:** Fails safely — static OG image doesn't process query params

**Recommendation:** Monitor for repeated probes (sign of reconnaissance).

---

## Vulnerabilities in `/api/contact`

### 2. Unauthenticated GET Endpoint (CRITICAL)
**Severity:** CRITICAL  
**File:** `app/api/contact/route.ts` (lines 141–166)  
**Issue:**
```typescript
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check here ⚠️ NOT IMPLEMENTED
    // if (!isAdmin(request)) return NextResponse.json(...);
```

**Risk:**
- Anyone can call `GET /api/contact?limit=100&email=any@email.com`
- Enumerate all submitted contact forms
- Leak user emails and messages (PII exposure)
- Violate GDPR/privacy regulations

**Fix:** Add authentication middleware immediately.

```typescript
export async function GET(request: NextRequest) {
  // Add authentication check
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // ... rest of handler
}
```

---

### 3. In-Memory Rate Limiting (MEDIUM)
**Severity:** MEDIUM  
**File:** `app/api/contact/route.ts` (lines 15–43)  
**Issue:**
```typescript
const submissionCounts = new Map<string, { count: number; resetTime: number }>();
// Resets on server restart — not persistent across deployments
```

**Risk:**
- Rate limit resets after deploy (1–2 minute window of abuse)
- Distributed deployments don't share rate limit state
- Attackers can spam submissions by timing requests around deploys

**Fix:** Use Redis or Vercel KV for persistent rate limiting.

```typescript
import { kv } from '@vercel/kv'; // Already in package.json!

async function isRateLimited(ip: string): Promise<boolean> {
  const key = `ratelimit:contact:${ip}`;
  const current = await kv.incr(key);
  
  if (current === 1) {
    await kv.expire(key, 86400); // 24 hours
  }
  
  return current > 5;
}
```

---

### 4. Email Enumeration via Query Parameter (LOW)
**Severity:** LOW  
**File:** `app/api/contact/route.ts` (line 166)  
**Issue:**
```typescript
where: parsedQuery.email ? { email: parsedQuery.email } : undefined,
```

**Risk:**
- Unauthenticated users can probe for specific emails
- Enables account enumeration ("Is user@domain.com in your contacts?")
- Amplified by lack of GET auth (issue #2)

**Fix:** Move email filtering to authenticated-only requests.

---

## Recommendations (Priority Order)

| Priority | Issue | Effort | Impact |
|----------|-------|--------|--------|
| 🔴 P0 | Add GET endpoint authentication | 30 min | Block unauthenticated access |
| 🟠 P1 | Migrate rate limiting to Redis/KV | 45 min | Prevent spam during deploys |
| 🟡 P2 | Remove email filter from unauthenticated GET | 15 min | Block email enumeration |
| 🟢 P3 | Monitor for repeated path traversal probes | 10 min | Early breach warning |

---

## Files Reviewed
- ✅ `app/api/contact/route.ts` (POST & GET handlers)
- ✅ `app/twitter-image.tsx` (static OG image)
- ✅ `lib/validation.ts` (schema & sanitization)

## Cleared (No Issues)
- ✅ SQL injection (Prisma + Zod validation)
- ✅ XSS (HTML sanitization via `sanitizeText()`)
- ✅ CORS (static files only)

---

## Next Steps
1. Implement GET endpoint authentication within 24 hours
2. Switch to Vercel KV rate limiting before next deploy
3. Set up monitoring alerts for path traversal probes
4. Schedule monthly security audits

---

**Report generated:** April 14, 2026  
**Next review recommended:** May 14, 2026
