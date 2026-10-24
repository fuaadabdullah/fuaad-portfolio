#!/usr/bin/env bash
set -euo pipefail

# Octopus-hosted, advisory-only Gemini review. No GitHub Actions runner.
[[ "${OCTOPUS_PROJECT_NAME:-}" == "Fuaad Portfolio CI" ]] || { echo "Wrong Octopus project" >&2; exit 20; }
[[ "${OCTOPUS_ENVIRONMENT_NAME:-}" == "Portfolio-CI" ]] || { echo "Wrong Octopus environment" >&2; exit 21; }

: "${GEMINI_API_KEY:?Set a sensitive project-scoped Octopus variable GEMINI_API_KEY}"
: "${GEMINI_REVIEW_PROMPT:?Set a review prompt for this run}"
command -v node >/dev/null || { echo "Node.js required" >&2; exit 22; }
command -v npm >/dev/null || { echo "npm required" >&2; exit 23; }

# Keep the secret out of command-line arguments and output. Avoid arbitrary
# execution from untrusted pull-request code; this runs on a trusted script ref.
tmp_home="$(mktemp -d)"
trap 'rm -rf "$tmp_home"' EXIT
export HOME="$tmp_home"
export CI=1
export NO_COLOR=1
export GEMINI_CLI_NO_RELAUNCH=1
# The CLI reads GEMINI_API_KEY from its environment.
printf '%s\n' "$GEMINI_REVIEW_PROMPT" | npx --yes --package @google/gemini-cli gemini --prompt "" --output-format text
