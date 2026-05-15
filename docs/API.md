# External API Guide

This guide is for external developers integrating with this project APIs.

Canonical contract:
- OpenAPI spec: [openapi.yaml](openapi.yaml)

Base URLs:
- Production: `https://heyimfuaad.me`
- Local: `http://localhost:3000`

## Audience And Scope

- Public integration endpoints:
  - `POST /api/ai`
  - `POST /api/contact`
- Operational/admin endpoints:
  - `GET /api/ai` (monitoring)
  - `GET /api/contact` (admin token required)

## Assistant API

### POST /api/ai

Generate a reply from the portfolio assistant.

Request body:

```json
{
  "prompt": "What projects are highlighted in this portfolio?"
}
```

Success response (`200`):

```json
{
  "reply": "The portfolio highlights product engineering and fintech-adjacent work.",
  "cached": false
}
```

Cached response example (`200`):

```json
{
  "reply": "The portfolio highlights product engineering and fintech-adjacent work.",
  "cached": true,
  "stale": true
}
```

Possible errors:
- `400` with `{ "error": "Prompt is required" }`
- `429` with `{ "error": "Rate limit exceeded. Please try again later." }`

Notes:
- When `stale` is `true`, the response was served from stale cache and refreshed in the background.
- If provider calls fail, a fallback reply can still be returned with HTTP `200`.

### GET /api/ai

Operational status endpoint for assistant internals.

Includes:
- circuit breaker states per provider
- cache configuration (`ttl`, `staleWhileRevalidateTtl`, `redisAvailable`)
- rate-limit configuration (`maxRequestsPerMinute`)

## Contact API

### POST /api/contact

Submit a public contact form message.

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "I would like to discuss a project collaboration."
}
```

Validation rules:
- `name`: required, max 100 chars, letters/spaces/hyphen/apostrophe only
- `email`: required, valid email, max 255 chars
- `message`: required, max 5000 chars

Success response (`201`):

```json
{
  "message": "Your message has been received. Thank you for reaching out!",
  "id": "c0f780bb-8371-4a95-8a4b-e6fa7f4d0c2c"
}
```

Possible errors:
- `400` validation error with field-level details
- `429` too many submissions per IP
- `500` submission persistence failure

### GET /api/contact (Admin)

List contact submissions.

Auth:
- Header: `Authorization: Bearer <ADMIN_TOKEN>`
- Missing/invalid token returns `401` and `WWW-Authenticate: Bearer realm="admin"`

Query params:
- `sortBy`: `createdAt` | `email` | `name` (default: `createdAt`)
- `sortOrder`: `asc` | `desc` (default: `desc`)
- `limit`: `1` to `100` (default: `100`)

Example request:

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  "https://heyimfuaad.me/api/contact?sortBy=createdAt&sortOrder=desc&limit=50"
```

## Quick Test Commands

```bash
curl -sS -X POST "http://localhost:3000/api/ai" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Summarize this portfolio in one sentence."}'
```

```bash
curl -sS -X POST "http://localhost:3000/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","message":"Hello"}'
```

## Versioning

Current contract version is `v1.0.0` in [openapi.yaml](openapi.yaml). Breaking API changes should increment this version and be communicated in release notes.
