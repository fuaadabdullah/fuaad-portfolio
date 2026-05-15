# Fuaad Portfolio

Production portfolio for Fuaad Abdullah, focused on employer-ready project presentation, case studies, and resume delivery.

## What this project does

- Presents selected engineering and fintech-adjacent projects with clear business and technical context.
- Publishes a resume page and downloadable PDF for applications and recruiter outreach.
- Includes lightweight portfolio assistant endpoints and public API docs.

## Screenshots

![Portfolio homepage hero](docs/images/hero.webp)
![Project index and case-study cards](docs/images/feature-01.webp)
![Resume page with downloadable PDF flow](docs/images/feature-02.webp)

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- MDX content pipeline
- Vercel deployment

## Quickstart

```bash
pnpm install
pnpm dev
```

## Quality checks

```bash
pnpm typecheck
pnpm lint
pnpm test:run
```

## E2E tests (Playwright)

```bash
pnpm exec playwright install chromium
pnpm e2e
```

Optional debug commands:

```bash
pnpm e2e:headed
pnpm e2e:ui
pnpm e2e:report
```

Current E2E scope (MVP):

- Route smoke checks for `/`, `/portfolio`, `/resume`, `/contact`, `/cv`
- Contact form happy-path submission (mocked `/api/contact` for deterministic UI validation)
- Resume and CV PDF link and response validation

## Key routes

- `/` home
- `/portfolio` project index
- `/resume` resume page
- `/api/ai` assistant endpoint
- `/api/contact` contact endpoint

## Docs

- [Architecture](docs/architecture.md)
- [Setup](docs/setup.md)
- [Impact](docs/impact.md)
- [External API Guide](docs/API.md)
- [OpenAPI Spec](docs/openapi.yaml)

## Contact

- Email: fuaadabdullah@gmail.com
- LinkedIn: https://www.linkedin.com/in/fuaadabdullah
