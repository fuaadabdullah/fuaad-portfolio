# Fuaad Abdullah — Personal Branding Site

Next.js (App Router) + Tailwind starter with pages for portfolio, resume, and services.
Dark mode by default. JSON-LD for Person + Service. OG + Twitter cards via Next Metadata.

## Quick start

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000

## Replace defaults
- Update `metadataBase` in `app/layout.tsx` to your domain.
- Put your real OG image at `public/og-default.png` (1200x630).
- Drop your PDF resume at `public/Fuaad_Abdullah_Resume.pdf`.
- Edit services in `app/services/page.tsx` and projects in `data/projects.ts`.

## SEO & A11y
- JSON-LD schemas in `lib/seo.ts`.
- Uses semantic HTML, high color contrast, keyboard-friendly focus styles.
- Lighthouse + Core Web Vitals: aim for LCP < 2.5s, INP < 200ms, CLS < 0.1.

## GoblinOS Environment Management

The **Forge Guild** in GoblinOS automates environment control for this portfolio:

- **Tools**: `portfolio-dev`, `portfolio-build`
- **Owner**: `websmith` goblin
- **Script**: `ForgeMonorepo/tools/portfolio_env.sh`

To run from GoblinOS:

```bash
cd ForgeMonorepo/GoblinOS
# Invoke the guild tool:
PORTFOLIO_DIR=/Users/fuaadabdullah/Downloads/fuaad-portfolio-starter \
NEXT_PUBLIC_SITE_URL=https://example.com \
bash ../tools/portfolio_env.sh dev
```

See `ForgeMonorepo/GoblinOS/goblins.yaml` for full registry.

## Deploy
- Vercel: zero-config for Next.js.
- Or build a Docker image and deploy to Azure Web Apps.

