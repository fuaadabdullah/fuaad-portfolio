# Setup

## Prerequisites

- Node.js 18+
- pnpm 10+

## Install

```bash
pnpm install
```

## Run locally

```bash
pnpm dev
```

## Generate resume PDF

Run the app locally, then generate the PDF from the local resume route:

```bash
node scripts/generate-resume-pdf.js http://localhost:3000/resume
```

Output:

- `public/Fuaad_Abdullah_Resume.pdf`

## Validation

```bash
pnpm typecheck
pnpm lint
pnpm test:run
```
