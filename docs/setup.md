# Setup

## Prerequisites

- Node.js 20.20.0 through 25.x
- pnpm 10.30.3 via Corepack

## Environment variables

Copy `.env.local.example` to `.env.local`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL for metadata and links |
| `OLLAMA_BASE_URL` | Optional | Ollama host for the TinyLlama chat (defaults to `http://localhost:11434` in development) |
| `OLLAMA_API_KEY` | With a remote host | Bearer token the reverse proxy in front of Ollama requires |
| `OLLAMA_MODEL` | Optional | Model name, default `tinyllama:1.1b` |
| `ADMIN_TOKEN` | Yes for admin/API operations | Bearer token for `/api/ai`, `/api/upload`, and contact retrieval |
| `DATABASE_URL` | Yes | Supabase pooled Postgres URL for runtime queries |
| `DIRECT_URL` | Yes | Supabase direct Postgres URL for Prisma migrations |

## Install

```bash
corepack pnpm install
```

## Run

```bash
corepack pnpm dev
```

## Validate

```bash
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
```

## TinyLlama chat

The chat box calls `POST /api/chat`, which streams TinyLlama replies from Ollama. Questions that match curated portfolio knowledge are answered from that copy without calling the model, and the chat falls back to curated answers whenever Ollama is unavailable.

### Local

```bash
ollama pull tinyllama:1.1b
ollama serve            # binds to 127.0.0.1:11434 by default
corepack pnpm dev
```

### Production

Vercel can't reach `localhost`, so run Ollama on a separate host and set `OLLAMA_BASE_URL` and `OLLAMA_API_KEY` in Vercel. The production host runs on Oracle Cloud; follow [deploy/oracle-ollama/README.md](../deploy/oracle-ollama/README.md), which scripts everything below.

- Never expose port `11434` publicly. Ollama has no authentication, and anyone who can reach it can pull, delete, or run models.
- Keep Ollama bound to `127.0.0.1` and put a TLS reverse proxy in front of it that only allows `POST /api/chat` with the bearer token. Caddy example:

  ```caddyfile
  ollama.your-domain.example {
      @chat {
          method POST
          path /api/chat
          header Authorization "Bearer {$OLLAMA_API_KEY}"
      }
      handle @chat {
          reverse_proxy 127.0.0.1:11434
      }
      respond 404
  }
  ```

- Set `OLLAMA_KEEP_ALIVE=24h` (or `-1`) on the host so the model stays loaded. A cold load can exceed the chat's 15-second first-token timeout, and those requests get curated fallback answers.
- `OLLAMA_NUM_PARALLEL=2` and `OLLAMA_MAX_QUEUE=10` match the route's concurrency cap and keep a small host from running out of memory.

## External API docs

Use these docs only if you are integrating with the project APIs:

- Human guide: [API.md](API.md)
- Machine contract: [openapi.yaml](openapi.yaml)

Quick local checks:

```bash
curl -sS -X POST "http://localhost:3000/api/ai" \
	-H "Authorization: Bearer $ADMIN_TOKEN" \
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
