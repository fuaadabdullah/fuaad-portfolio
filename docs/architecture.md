# Architecture

## Overview

This portfolio is a content-driven Next.js application with static and server-rendered routes, designed for speed, SEO, and recruiter usability.

## Application layers

- `app/`: Route handlers and page composition.
- `components/`: Shared UI primitives and feature components.
- `data/`: Structured site content for resume, projects, services, and assistant context.
- `content/`: MDX blog content.
- `lib/`: Utilities and assistant plumbing.
- `public/`: Static assets including screenshots and the generated resume PDF.

## Data flow

1. Structured content in `data/*.ts` drives resume and project pages.
2. Route-level metadata is generated per page for social previews and indexing.
3. API routes (`/api/ai`, `/api/mock-ai`) provide assistant responses from local knowledge structures.
4. Resume PDF is generated from the rendered `/resume` route to keep visual parity.

## Deployment model

- Primary hosting: Vercel.
- Static assets served from `public/`.
- Build and runtime configuration managed via `next.config.mjs` and environment variables.
