# Gemini CLI via Octopus Cloud (not GitHub Actions)

Gemini review runs only as a **manual, advisory** Octopus script task, separate from the mandatory portfolio quality and Playwright checks. No GitHub Actions workflow is created. This is an integration plan and runner script, not evidence of a successful Octopus execution.

## Verified account state

- Octopus instance: https://ayahos.octopus.app
- Space: `Spaces-1`
- Existing isolated environment: `Portfolio-CI` (`Environments-21`)
- Dedicated project: **not yet created**
- Dedicated lifecycle: **not yet saved**. Create `Fuaad Portfolio CI Only` with exactly one phase `Portfolio verification` containing only `Portfolio-CI`. Do not use Default Lifecycle because it includes production.
- Existing AyahOS and AyahOS HQ Verification projects must not be modified.

## Provisioning

1. Save the dedicated lifecycle, then create a separate project `Fuaad Portfolio CI` assigned to that lifecycle.
2. Configure its Git source as `fuaadabdullah/fuaad-portfolio` and a trusted reviewed branch, never a fork's arbitrary code. Use Octopus's hosted Ubuntu worker with a Node.js-capable container or install Node.js in a non-root temporary directory.
3. Create a **sensitive** Octopus project variable `GEMINI_API_KEY`, scoped to this project and `Portfolio-CI` only. Obtain the value from an authorized Google AI Studio account. Never put the key in Git, the command line, a log, a PR comment or a non-sensitive variable.
4. Create a separate optional script step (not a replacement for the required quality and e2e steps) with script source `scripts/ci/octopus_gemini_review.sh`. Pass the project name and environment name from Octopus's trusted built-in variables, and supply `GEMINI_REVIEW_PROMPT` from a project-scoped variable. Review only the specified PR and commit.
5. Run a **manual** Octopus deployment to `Portfolio-CI`. Check logs for real Gemini CLI output, correct repository/commit, and zero secrets. Mark Gemini review as advisory; failure must never be reported as quality/E2E success.
6. Only after a separate real Octopus quality+Playwright run for the exact Git SHA and a verified GitHub status should the old GitHub Actions checks be retired. Do not deploy to Production.

## Worker command

```bash
bash scripts/ci/octopus_gemini_review.sh
```

This requires `node`, `npm`, a valid Gemini API key, and the project/environment variables listed above. The script intentionally fails closed when invoked outside the dedicated project or environment.

**Important:** Gemini CLI reviews do not replace TypeScript, ESLint, Vitest, Playwright or build checks. The separate Octopus project and its credentials must be provisioned before execution. No Gemini invocation or full Octopus run has yet been verified.

## Optional Cline CLI reviewer

`scripts/ci/octopus_cline_review.sh` adds Cline as a second manual, advisory reviewer on the **same dedicated portfolio Octopus worker**, with the project/environment name guards and exact 40-character SHA validation. It expects `REVIEW_DIFF_FILE` to point to a trusted, size-limited diff obtained through a read-only GitHub adapter. Cline runs with `--json --auto-approve false` and is instructed not to use tools or modify code.

Cline must be installed and authenticated with a project-scoped provider credential before execution; no Cline account, API key, or live invocation has been verified. The Octopus project, lifecycle and diff adapter remain prerequisites. Keep Gemini, Cline and deterministic CI results distinct. Cline is optional and must never block or fake the required TypeScript, ESLint, unit, build or Playwright outcomes.
