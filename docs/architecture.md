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
3. Public chat uses `/api/chat`, which answers only from site data: curated knowledge for documented topics, project tech lists for technology questions, and a fixed abstention for anything else. TinyLlama is available only as an opt-in experiment outside production. Provider-backed `/api/ai` is admin-only.
4. Resume route and script flow publish `public/Fuaad_Abdullah_Resume.pdf`.

## Deployment topology

- Frontend and API routes deploy on Vercel as a single Next.js project.
- Static assets (screenshots, PDF) are served from the same deployment.
- The public chat needs no model host. TinyLlama runs only on the Oracle Cloud Ollama host (`OLLAMA_BASE_URL`, `OLLAMA_API_KEY`), used by the admin `/api/ai` route and the preview chat experiment; see [setup.md](setup.md#tinyllama-experiment).
- Optional paid LLM route integrations point to configured upstream providers and require `ADMIN_TOKEN`.
