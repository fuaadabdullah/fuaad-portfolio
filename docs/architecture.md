# Architecture

## Overview

This portfolio is a content-driven Next.js application with static and server-rendered routes, designed for speed, SEO, and recruiter usability.

## Application layers

- `app/`: route handlers and page composition
- `components/`: shared UI primitives and feature components
- `data/`: structured content for resume, projects, services, and assistant context
- `content/`: MDX blog content
- `lib/`: utilities and assistant logic
- `public/`: static assets including screenshots and generated resume PDF

## Data flow

1. Structured content in `data/*.ts` drives page rendering.
2. Metadata is generated per route for sharing and indexing.
3. Assistant routes consume local knowledge structures.
