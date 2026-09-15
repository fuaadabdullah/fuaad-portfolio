# Setup

## Prerequisites

- Node.js 20.20.0 through 25.x
- pnpm 10.30.3 via Corepack

## Environment variables

Copy `.env.local.example` to `.env.local`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL for metadata and links |
| `CHAT_TINYLLAMA_EXPERIMENT` | Optional | `true` lets a preview deployment send unanswered chat questions to TinyLlama; ignored on Vercel production |
| `OLLAMA_BASE_URL` | Optional | The Oracle Cloud TinyLlama host, used by the admin `/api/ai` route and the chat experiment. Unset means no model; there is no localhost default |
| `OLLAMA_API_KEY` | With `OLLAMA_BASE_URL` | Bearer token the Caddy proxy on the Oracle host requires |
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

## Chat

The chat box calls `POST /api/chat`, which answers only from site data (`data/portfolio_knowledge.ts` and the project tech lists) and abstains when that data doesn't answer a question. It needs no model host.

## TinyLlama experiment

TinyLlama runs only on the Oracle Cloud host; there is no local Ollama setup. It used to answer questions outside curated knowledge and invented facts (a college Fuaad never attended, "no blog posts"), so production chat never calls it.

To try it on a preview deployment, set these for the Preview environment in Vercel:

- `CHAT_TINYLLAMA_EXPERIMENT=true`
- `OLLAMA_BASE_URL` and `OLLAMA_API_KEY` for the Oracle host

### Oracle host

The host is an Always Free VM on Oracle Cloud; [deploy/oracle-ollama/README.md](../deploy/oracle-ollama/README.md) scripts everything below.

- Never expose port `11434` publicly. Ollama has no authentication, and anyone who can reach it can pull, delete, or run models.
- Keep Ollama bound to `127.0.0.1` on the VM and put a TLS reverse proxy in front of it that only allows `POST /api/chat` with the bearer token. Caddy example:

  ```caddyfile
  ollama.your-domain.example {
      @chat {
          method POST
          path /api/chat
          header Authorization "Bearer {$OLLAMA_API_KEY}"
      }
      handle @chat {
          reverse_proxy 127.0.0.1:11434 {
              header_up -Authorization
              # Ollama returns 403 for non-localhost Host headers
              header_up Host 127.0.0.1:11434
          }
      }
      respond 404
  }
  ```

- Set `OLLAMA_KEEP_ALIVE=24h` (or `-1`) on the host so the model stays loaded. A cold load can exceed the chat's 15-second first-token timeout, and those requests get the abstention reply.
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
