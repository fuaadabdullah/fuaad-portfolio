# Isolated Octopus verification for the Fuaad portfolio

This project replaces the **execution** of the blocked GitHub-hosted CI and E2E jobs with an independent Octopus Cloud project and non-production environment. No part of this configuration deploys or modifies the AyahOS runtime, or changes Vercel production settings.

## Targets and isolation

| Resource | Portfolio-only setting |
| --- | --- |
| Octopus instance | `https://ayahos.octopus.app` |
| Space | `Spaces-1` (Default) |
| Project | `Fuaad Portfolio CI` (new, separate from `AyahOS`) |
| Environment | `Portfolio-CI` (new, never `Development` or `Production`) |
| Git repository | `fuaadabdullah/fuaad-portfolio` |
| Git configuration directory | `.octopus` |
| Worker pool | `hosted-ubuntu`, no deployment targets |
| Execution image | `octopusdeploy/worker-tools:6.6.5-ubuntu.24.04` |
| GitHub status | `octopus/portfolio-ci` (new, not `octopus/verify`) |
| Git webhook worker | `fuaad-portfolio-octopus-verify` (dedicated) |
| KV namespace | A **new** portfolio-only `TASKS` namespace |

The GitHub webhook is validated by HMAC-SHA256 before a branch SHA can become an Octopus release. The bridge selects the **exact** pushed ref/commit, and separately records pending or terminal status. Only Octopus task completion can produce success. A release must complete both required steps.

## One-time Octopus setup (authenticated account only)

1. In `ayahos.octopus.app`, create the **Portfolio-CI** environment. Do not reuse the existing `Development` environment, which belongs to AyahOS.
2. Create a dedicated lifecycle with a **single phase** permitting only `Portfolio-CI`. Do not associate the portfolio project with an AyahOS production lifecycle or deployment targets.
3. Create the **Fuaad Portfolio CI** project in the existing Default space, using **Version Control** connected through Octopus's GitHub App to `fuaadabdullah/fuaad-portfolio`, directory `.octopus`, branch `main`. The repository already contains OCL. Verify that the UI **uses the existing config** rather than overwriting it, and select the portfolio-only lifecycle.
4. Confirm the deployment process has exactly two **required** worker steps: `quality` and `e2e`, each using `scripts/ci/portfolio_verify.sh` from **this project's Git revision** and the pinned Ubuntu execution container. The project must allow deployments with no deployment targets.
5. Do not configure project production secrets, database credentials, or personal account tokens. Test workers execute code from PR branches; they must be isolated and unprivileged. Bridge API keys and GitHub status tokens must remain **only in the Cloudflare Worker**. The script fails if bridge secrets are visible in its environment.

The `quality` lane performs frozen pnpm install, the standalone Node-native CI/bridge isolation regression tests, TypeScript typecheck, ESLint, all Vitest tests and a Next.js production build. The Node-native tests are explicitly excluded from Vitest collection to prevent double execution and preserve the existing application test suite. The `e2e` lane installs Chromium and browser dependencies and runs the full Playwright suite on localhost with one worker, without touching the live site. These match the existing GitHub-hosted CI/E2E gates; no tests are disabled or silently skipped.

## Independent webhook/status bridge

Source: `deploy/octopus-portfolio-bridge/`. This is a separately deployed instance of the tested AyahOS Octopus GitHub bridge with a fail-closed repository/project/environment wrapper. It **must not** share the deployed AyahOS worker, its secret values or its KV namespace.

1. Create a new Cloudflare KV namespace for the portfolio CI worker. Replace `REPLACE_WITH_NEW_PORTFOLIO_KV_NAMESPACE_ID` only with the newly returned namespace ID. Do not change the AyahOS Worker/KV.
2. Create a dedicated Octopus service account scoped to project **Fuaad Portfolio CI** and environment **Portfolio-CI**, with only ProjectView, ReleaseCreate, DeploymentCreate, TaskView. Store the new API key as the portfolio Worker's `OCTOPUS_API_KEY` secret.
3. Generate a **different** GitHub HMAC webhook secret. Store it as `GITHUB_WEBHOOK_SECRET` in the portfolio Worker. Never copy it into the repo, Octopus project, or chat.
4. For commit statuses, use a GitHub token scoped **only** to `fuaadabdullah/fuaad-portfolio` with Commit statuses Read and write. Set the portfolio Worker's `GITHUB_STATUS_TOKEN`. This is needed for `octopus/portfolio-ci` to be visible on commits.
5. Deploy from this directory with Wrangler v4 using its own authenticated Cloudflare account. `npx wrangler@4 deploy` must point to `fuaad-portfolio-octopus-verify`. Test `GET /healthz` and confirm it reports ready; no upload with the KV placeholder.
6. In this portfolio repo (not AyahOS), configure a **push-only** GitHub webhook to `https://<portfolio-worker-host>/github` with content type JSON and its own HMAC secret. Confirm signed ping returns `pong`, then a branch push starts a release on the exact SHA.
7. Verify that `octopus/portfolio-ci` starts pending then becomes success only after the two Octopus steps finish. `GET /status/<40-hex-sha>` is read-only and may return 404 for **unknown**. Treat 404, pending, error and failure as **not verified**.
8. If account settings support it, require `octopus/portfolio-ci` before merging to `main`. Private repositories on GitHub Free may not support enforceable required checks; in that case the no-merge-until-green rule remains an explicit operator gate.

No Octopus Git trigger should be enabled **in addition to** the signed webhook bridge, since that can create duplicate releases for the same commit. The bridge poll interval is deliberately 15 minutes to conserve shared Cloudflare KV free-tier read/list budget. Keep `BRANCH_QUEUE_ENABLED` **unset** so the inherited experimental batching logic cannot alter the default workflow.

## Acceptance and legacy CI retirement

Do **not** delete or disable `.github/workflows/ci.yml` or `.github/workflows/e2e.yml` before the new Octopus project, environment, dedicated Worker, GitHub webhook, and two real exact-commit tests are verified end-to-end.

Acceptance evidence for a feature branch must show:

- HMAC-signed webhook from the portfolio repo targeting an exact 40-hex SHA, never AyahOS or a fork.
- `Fuaad Portfolio CI` release of that Git ref and SHA deployed to **Portfolio-CI**.
- Both required Octopus steps pass with logs for that **same** SHA, and `octopus/portfolio-ci=success` on the commit.
- Unit tests, typecheck, ESLint, production build, and Playwright all genuinely ran.
- Vercel preview and existing live production profile remain healthy.

**Only then** make a final PR deleting the two GitHub Actions workflows, document the cutover, and merge after reviewing the latest Octopus status. Preserve the old workflow definitions in Git history for rollback; do not replace failure signals with a fake success status. If Octopus fails, do not ship an unverified release.

## Current limitation

The Octopus instance requires an authenticated login to create projects and environments. No separate portfolio project or environment has yet been confirmed in the Octopus dashboard. The GitHub Actions failures were caused by an account-level billing lock before any job steps ran. Do not misdiagnose this as application test failures. The new project + environment and bridge credentials are distinct provisioning steps, and this repository-side configuration alone does **not** complete the operational cutover.
