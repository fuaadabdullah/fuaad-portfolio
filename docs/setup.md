# Setup

## Prerequisites

- Node.js 18+
- pnpm 9+

## Environment variables

Copy `.env.local.example` to `.env.local`.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL for metadata and links |
| `OLLAMA_API_URL` | Optional | Local/remote Ollama endpoint for assistant features |
| `NEXT_PUBLIC_FORMSPREE_ID` | Optional | Contact form integration |

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

## Generate resume PDF

```bash
pnpm run generate:resume
```

(If unavailable in scripts, run `node scripts/generate-resume-pdf.js`.)

## Deploy

```bash
vercel --prod
```
