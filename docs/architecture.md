# Architecture

## Overview

This portfolio is a content-driven Next.js application with static and server-rendered routes, designed for speed, SEO, and recruiter usability.

## Application layers

- `app/`: App Router pages, API routes, route metadata.
- `components/`: reusable UI primitives and layout blocks.
- `data/`: typed resume/project/service content sources.
- `content/`: MDX blog posts and long-form writeups.
- `lib/`: assistant context helpers and utility functions.
- `public/`: screenshots, downloadable resume PDF, and static media.

## Data flow

1. Structured content from `data/*.ts` is imported into page routes.
2. Pages render server-side metadata and static content for SEO.
3. Public chat uses `/api/chat`: curated local knowledge for documented topics, streamed TinyLlama (Ollama) replies for everything else, and curated fallback replies when the model is unavailable. Provider-backed `/api/ai` is admin-only.
4. Resume route and script flow publish `public/Fuaad_Abdullah_Resume.pdf`.

## Deployment topology

- Frontend and API routes deploy on Vercel as a single Next.js project.
- Static assets (screenshots, PDF) are served from the same deployment.
- TinyLlama runs on a separate Ollama host behind an authenticated reverse proxy (`OLLAMA_BASE_URL`, `OLLAMA_API_KEY`); see [setup.md](setup.md#tinyllama-chat).
- Optional paid LLM route integrations point to configured upstream providers and require `ADMIN_TOKEN`.
