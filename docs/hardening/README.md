# Portfolio hardening package — execution contract

Issue tracker: https://github.com/fuaadabdullah/fuaad-portfolio/issues/29
Implementation branch: `feat/portfolio-hardening-e2e-20261118`
Baseline production SHA: `3d2c0c753e215300670e24c9199c9bb7cbc9c29c`
Canonical production origin: https://fuaadabdullah.vercel.app

This package is **partial implementation plus an executable validation framework**. It is not a statement that 35 findings have been fixed. Use `pnpm hardening:status` to inspect the machine-readable findings manifest. Only record `verified` after passing tests, release checks, and runtime evidence.

## Modules, dependencies, and required deliverables

| Module | Dependency | Implementation and tests |
| --- | --- | --- |
| M0 — release controls | none | fix GitHub runner no-step failures, pin toolchain, recover required checks, guard main |
| M1 — host and SEO | M0 | canonical host, robots, sitemap, OG, JSON-LD, links, CV/PDF, redirects |
| M2 — content and demos | M1 | validate RIZZK and all demo URLs, verify professional claims, avoid invented metrics |
| M3 — contact | M0 | shared atomic quota, trusted ingress identity, anti-spam challenge, persistence, notification, integration E2E |
| M4 — chat and AI | M0 and M3 shared boundary | byte limits, grounded reply, shared rate limit, circuit half-open probe, bounded concurrency, cache failure |
| M5 — admin and uploads | M0 | bearer auth, client boundary, signature/size validation, storage deletion scope |
| M6 — operations | M3/M4/M5 | liveness vs readiness, redacted structured logs, rollback and restore |
| M7 — UX and maintenance | M1/M2 | accessibility, CSP, images, Storybook cleanup, real browser checks |

## Execution order

1. Preserve last-known-good deployment and environment metadata (never commit secrets). Determine whether the host allows commercial portfolio/services usage.
2. Diagnose why GitHub Actions CI/E2E jobs on baseline stop before running steps. Review draft PRs #26, #27 and #28 for overlapping CI and branding changes. Avoid activating required status checks before the named job is functional.
3. Apply small modular PRs with regression tests; do not combine migration, broad refactor, and data changes.
4. Run `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm verify:canonical`, `pnpm build`, and `pnpm e2e` in the authenticated CI environment.
5. Deploy a preview and inspect browser console, DOM, broken links, visual regressions, keyboard navigation, reduced motion, API failure paths.
6. Merge only verified PRs with required checks passing; production release must match the reviewed commit. Run `pnpm smoke:production` **read-only** and record observed SHA, HTTP response and rollback reference.
7. Update `findings.json` after each verified outcome. Keep unresolved issues open. Accept risks only with written rationale and owner.

## E2E contract

- Chromium PR suite: homepage, navigation, portfolio, resume/CV downloads, chat curated answer/failure, contact error/success, SEO metadata and sitemap.
- Release matrix: Chromium/Firefox/WebKit, 320px and 390px mobile plus tablet/desktop, keyboard/focus, reduced motion, no JavaScript, inaccessible project demo.
- Boundary tests: contact persistence against isolated test database (no production writes); invalid token, oversized body, MIME/content mismatch, Redis/DB/AI outages, cancellation and shared concurrency.
- External providers are fake/stubbed in deterministic unit tests; separate controlled staging integration tests verify real connections.
- Production smoke must not send forms, delete files, run load tests or expose credentials.

## Non-negotiable constraints

- Keep `fuaad-portfolio` separate from AyahOS and ForgeTM repositories.
- No unapproved paid services, forced merges, data resets, or destructive deployment steps.
- Do not publish client tokens or third-party secrets in browser bundles.
- A GitHub failed check is a block, even if Vercel reports READY.
- Status `implemented-unverified` means source changes exist but have **not** passed release verification.

## Remaining infrastructure and data gates

Shared throttling must be atomic and independently verified on the chosen store; the original in-memory Maps are not distributed. Cloudflare Turnstile is an option only with mandatory server-side verification. Production email notifications and database migrations require a separate deployment/backfill/rollback decision. Do not claim those are implemented until configured and tested.

## Rollback

Capture the current Vercel deployment ID, the exact main commit, migration version, and a safe copy of non-secret configuration before promotion. UI-only failures can roll back to the verified deployment. Schema/data changes require compatible forward migrations, tested backups and explicit authorization; a frontend redeploy cannot restore data.

For each finding track: source evidence, regression test, CI URL, preview E2E, deployed SHA, result, and risk acceptance or blocker.

## Pending PDF asset migration

The canonical domain has been updated in source content, but checked-in `public/Fuaad_Abdullah_Resume.pdf` and `public/Fuaad_Abdullah_CV.pdf` have not been regenerated. Audit finding AUDIT-08 remains open until both PDFs have been rebuilt from approved current content and verified without obsolete URLs or unsupported claims. Do not automate production PDF rewriting from unverified content.
