# Gemini CLI in GitHub

The repository contains a **manual, advisory-only** workflow: `.github/workflows/gemini-review.yml`. It uses Google's official `google-github-actions/run-gemini-cli@v0.1.22` action with read-only GitHub permissions and instructions from `GEMINI.md`. It does not push changes, merge PRs, or run a deployment.

## One-time activation

1. Create or reuse a Gemini API key through [Google AI Studio](https://aistudio.google.com/apikey). Never commit it or paste it into chat.
2. In [this repository's Actions secrets](https://github.com/fuaadabdullah/fuaad-portfolio/settings/secrets/actions), add the repository secret named `GEMINI_API_KEY`.
3. **Important blocker:** GitHub Actions jobs on this account have recently been rejected *before starting* because of an account-level GitHub billing lock. A new Gemini workflow will face the same runner restriction. Gemini CLI does **not** bypass that restriction. Resolve the GitHub billing lock or run Gemini CLI on an external, authorized worker with its own securely provisioned key.
4. Once GitHub Actions runner access is restored and this workflow has been merged into `main`, open [Gemini CLI portfolio review](https://github.com/fuaadabdullah/fuaad-portfolio/actions/workflows/gemini-review.yml), select **Run workflow**, enter PR number `27`, and review the output in the workflow's step summary.
5. Treat the review as advisory. Never replace required Octopus quality/E2E evidence with an AI review.

## Alternative: external Octopus verification worker

The repository's existing `Portfolio-CI` environment is an isolated Octopus destination, not an active worker. If you want Gemini CLI to run there rather than in GitHub Actions, first provision the dedicated `Fuaad Portfolio CI` project and a secret variable restricted to that project's trusted worker execution. Avoid making Gemini credentials available to untrusted PR code. On a trusted, isolated Node.js worker with the appropriate authentication, the supported CLI command is:

```bash
npx --yes @google/gemini-cli --version
```

This version command requires no model API key and does not prove model inference. An actual review requires a valid authenticated Gemini API connection, appropriate permissions, and a known-good execution log. Do not configure a second Octopus project to share AyahOS's existing bridge, tokens, or environment.

## Security boundaries

The workflow uses manual dispatch only, checks out the trusted `main` branch, limits its GitHub token to `contents: read` and `pull-requests: read`, and disallows edits or merges. PR number input is restricted to digits. Local Gemini credentials and temporary GitHub App credential files are ignored in Git.

This setup is **prepared** until the key is configured and a real GitHub Actions runner or isolated external worker completes a Gemini invocation. No successful Gemini review is claimed.
