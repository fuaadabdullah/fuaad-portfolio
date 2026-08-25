# Burp Suite Scanning Guide

**Objective:** Use Burp Suite Community Edition to perform vulnerability assessment on fuaad-portfolio  
**Target:** http://localhost:3000  
**Status:** Ready for scanning

---

## Quick Start

### 1. Start the Dev Server
```bash
# Terminal 1
cd /Users/fuaadabdullah/fuaad-portfolio
corepack pnpm dev
# Wait for: "✓ Ready in XXXms"
```

### 2. Launch Burp Suite
```bash
# Terminal 2
open -a 'Burp Suite Community Edition'
```

### 3. Configure Burp Proxy

**In Burp Suite GUI:**

1. Go to **Settings > Network > Proxy**
2. Ensure proxy is running on `127.0.0.1:8080` (default)
3. Click **CA Certificate** and download `cacert.der`

### 4. Install Burp CA Certificate in Browser

**Option A: Using Firefox (Recommended for Burp)**
```bash
# Import via Firefox Settings > Privacy > Certificates > View Certificates
# Or: Preferences > Certificate > Import the cacert.der file
```

**Option B: Using Chrome**
```bash
# System Preferences > Security & Privacy > Certificates
# Or: Open Chrome > Settings > Privacy > Security > Manage Certificates
```

### 5. Configure Browser to Use Burp Proxy

**Firefox:**
1. Settings > Network Settings
2. Manual proxy configuration
3. HTTP Proxy: `127.0.0.1` Port: `8080`
4. ✓ Also use this proxy for HTTPS

**Chrome/Chromium:**
```bash
# Or use automatic proxy switcher extension:
# - Proxy SwitchyOmega (recommended)
# - Set to: http://127.0.0.1:8080
```

### 6. Test Proxy Connection

Open browser and navigate to: `http://localhost:3000`

**In Burp Suite, you should see:**
- HTTP request appears in **Proxy > HTTP history**
- GET / request captured

If you don't see requests, check:
- [ ] Burp proxy is running (green checkmark on Proxy tab)
- [ ] Browser proxy is configured
- [ ] CA certificate is installed

---

## Vulnerability Scanning Workflow

### Phase 1: Passive Scanning
Burp automatically scans as you browse—no active attack.

1. **Browse the app normally** through the proxy
   - Visit: `http://localhost:3000`
   - Click through pages, forms, links
   - Submit the contact form (if available)
   - Test API endpoints: `http://localhost:3000/api/contact`

2. **In Burp, go to Dashboard**
   - View scan progress in real-time
   - Issues are categorized by severity

### Phase 2: Target Spidering (Optional)
Automatically crawl entire application.

1. Right-click in **Proxy > HTTP history**
2. Select **Send to Spider**
3. Go to **Tools > Spider**
4. Click **Start scanning**

---

## Key Endpoints to Test

### Authentication Testing
```bash
# Without token (should return 401)
curl http://localhost:3000/api/contact

# With valid token
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/contact

# With invalid token (should return 401)
curl -H "Authorization: Bearer invalid-token" http://localhost:3000/api/contact
```

### Rate Limiting Testing
```bash
# Submit 6+ contact forms in quick succession
# 6th should return 429 (Too Many Requests)

for i in {1..6}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@example.com","message":"Test '$i'"}'
  echo ""
done
```

### Input Validation Testing
```bash
# SQL Injection attempt (should be blocked by Zod validation)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"<script>alert(1)</script>"}'

# Missing required fields
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":""}'
```

---

## Expected Security Findings

### ✅ Already Fixed (No Issues Expected)
1. **Unauthenticated GET endpoint** → Returns 401
2. **Email enumeration** → Parameter removed
3. **Rate limit bypass** → Contact submission limit enforced per runtime process
4. **SQL injection** → Protected by Prisma + Zod validation
5. **XSS attacks** → Sanitized by `sanitizeText()`

### Potential Findings to Investigate
1. **HTTPS redirect** — Dev server is HTTP only (expected)
2. **CSP headers** — May need security headers middleware
3. **CORS policy** — May trigger warnings in shared environment
4. **Cookies/Session** — Check expiry and flags
5. **Form validation** — Verify client-side matches server

---

## Burp Suite Navigation

| Tab | Purpose |
|-----|---------|
| **Dashboard** | Overview of all findings |
| **Proxy** | HTTP history, request/response capture |
| **Scanner** | Active and passive scan results |
| **Repeater** | Manually craft requests and analyze |
| **Intruder** | Automated attack patterns (Community limited) |
| **Decoder** | Encode/decode payloads |
| **Comparer** | Diff request/response pairs |

---

## Generating a Report

### In Burp Suite:
1. Go to **Reporting** (or Dashboard if Community Edition)
2. Click **Generate Report**
3. Select findings to include
4. Export as **HTML** or **PDF**

### Command-line Alternative:
```bash
# Automated test with our test suite
ADMIN_TOKEN=your-token corepack pnpm test:contact

# Or direct cURL with Burp history
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  http://localhost:3000/api/contact > /tmp/contact_submissions.json
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Proxy requests stuck | Check Burp is running, CA cert installed |
| 401 errors on GET | Token mismatch, check ADMIN_TOKEN in .env |
| 429 rate limit errors | Clear rate limit cache in Redis/KV or wait 24h |
| No HTTPS support | Community Edition can't generate certs; use HTTP |
| Browser won't connect | Disable proxy, restart browser, re-enable |

---

## Security Improvements Implemented

✅ **Bearer Token Authentication**
- GET endpoint requires `Authorization: Bearer <token>`
- Constant-time comparison prevents timing attacks

✅ **Contact Rate Limiting**
- Uses an in-memory 24h submission counter
- 5 submissions per IP per 24 hours
- Persistent cross-deployment rate limiting remains a hardening backlog item

✅ **Input Validation**
- Zod schemas enforce type and length constraints
- HTML sanitization prevents XSS
- Prisma parameterized queries prevent SQL injection

✅ **Email Enumeration Blocked**
- Exact email filtering is available only after admin authentication
- Public users can't probe for specific contacts

---

## Next Steps

1. **Run local dev server:** `pnpm dev`
2. **Launch Burp Suite** with browser proxy configured
3. **Browse app normally** through proxy (passive scanning)
4. **Submit the contact form** to test rate limiting
5. **Test authenticated endpoint:** Add Authorization header
6. **Review findings** in Burp Dashboard
7. **Export report** as HTML/PDF

---

**Ready to scan!** Follow the steps above and report any findings.
