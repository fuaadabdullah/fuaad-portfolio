# Gemini CLI: Fuaad Portfolio

You are working in `fuaadabdullah/fuaad-portfolio`, a Next.js personal portfolio. Treat this repository independently from the AyahOS monorepo and its Octopus CI project.

## Working agreement

- Default to analysis and suggested patches, not deployment or automatic merging.
- Do not weaken or skip TypeScript, ESLint, Vitest, Playwright, or production build gates.
- Do not claim that a workflow passed when the GitHub account billing lock prevented runner allocation.
- Octopus CI migration is in PR #27. The dedicated `Portfolio-CI` environment has been created, but the dedicated project, lifecycle save, independent webhook, and full E2E verification have not been confirmed.
- Never point the portfolio at AyahOS's existing `Development`, `Staging`, or `Production` environments or its `octopus/verify` status context.
- Do not access, print, create, or rotate cloud secrets. Never include credentials in code, logs, or PR comments.
- Do not deploy, merge, or delete CI workflows without explicit human authorization and evidence from the exact tested SHA.
- Respect the user's preference for free-tier infrastructure and minimal dependencies.
- For PR reviews, prioritize concrete defects, security boundaries, regression risk, and precise file references.

## Useful checks

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm exec tsc --noEmit
corepack pnpm lint
corepack pnpm test
corepack pnpm build
corepack pnpm exec playwright test --workers=1
```

When reporting results, distinguish verified commands from commands merely recommended or configured.
