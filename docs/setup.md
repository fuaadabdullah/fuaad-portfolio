# Setup

## Prerequisites

- Node.js 18+
- pnpm 9+

## Environment variables

Copy `.env.local.example` to `.env.local`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL for metadata and links |
| `OLLAMA_API_URL` | Optional | Local/remote Ollama endpoint for assistant features |
| `DATABASE_URL` | Yes | Supabase pooled Postgres URL for runtime queries |
| `DIRECT_URL` | Yes | Supabase direct Postgres URL for Prisma migrations |

## Install

```bash
pnpm install
```

## Run

```bash
pnpm dev
```

## Validate

```bash
pnpm typecheck
pnpm lint
pnpm test:run
```

## External API docs

Use these docs only if you are integrating with the project APIs:

- Human guide: [API.md](API.md)
- Machine contract: [openapi.yaml](openapi.yaml)

Quick local checks:

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

## Generate resume PDF

```bash
pnpm run generate:resume
```

(If unavailable in scripts, run `node scripts/generate-resume-pdf.js`.)

## Deploy

```bash
vercel --prod
```
