#!/usr/bin/env bash
# Required Octopus Cloud verification, never a deployment to production.
set -Eeuo pipefail

fail() { printf 'portfolio-ci: %s\n' "$*" >&2; exit 2; }

lane="${1:-}"
case "$lane" in
  quality|e2e) ;;
  *) fail "unsupported verification lane: $lane" ;;
esac

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$repo_root"
[[ -f package.json && -f pnpm-lock.yaml && -d app ]] ||
  fail "incomplete portfolio Git source checkout"

# Project, environment and exact SHA must come from the Octopus release, not
# from caller-controlled variables. A production release or AyahOS's shared
# Development environment must never be used for portfolio verification.
command -v get_octopusvariable >/dev/null 2>&1 ||
  fail "Octopus variable helper unavailable; refusing unverified execution"

project="$(get_octopusvariable "Octopus.Project.Name")" ||
  fail "cannot determine Octopus project"
environment="$(get_octopusvariable "Octopus.Environment.Name")" ||
  fail "cannot determine Octopus environment"
commit="$(get_octopusvariable "Octopus.Release.Git.CommitHash")" ||
  fail "cannot determine exact Octopus Git commit"

[[ "$project" == "Fuaad Portfolio CI" ]] ||
  fail "expected dedicated Octopus project Fuaad Portfolio CI"
[[ "$environment" == "Portfolio-CI" ]] ||
  fail "expected isolated Octopus environment Portfolio-CI"
[[ "$commit" =~ ^[0-9a-f]{40}$ ]] ||
  fail "Octopus release must be pinned to an exact 40-hex Git commit"

# Secrets belong to the independent ingress bridge, never on an execution
# worker running branch code. Fail closed on accidental bridge credential scope.
[[ -z "${OCTOPUS_API_KEY:-}" && -z "${GITHUB_STATUS_TOKEN:-}" &&
   -z "${GITHUB_WEBHOOK_SECRET:-}" ]] ||
  fail "bridge credentials must not be exposed to portfolio test code"

if [[ -d .git ]]; then
  checked_out="$(git rev-parse HEAD)" || fail "cannot read checkout commit"
  [[ "$checked_out" == "$commit" ]] ||
    fail "source checkout differs from Octopus release commit"
fi

command -v node >/dev/null 2>&1 || fail "Node.js unavailable"
command -v corepack >/dev/null 2>&1 || fail "Corepack unavailable"
node -e 'const p=require("./package.json");if(p.name!=="fuaad-portfolio"||p.packageManager!=="pnpm@10.30.3")process.exit(2)' ||
  fail "unexpected package identity or pnpm version"
pnpm_version="$(corepack pnpm --version)"
[[ "$pnpm_version" == "10.30.3" ]] || fail "expected pnpm 10.30.3"

export CI=true
export NEXT_TELEMETRY_DISABLED=1
export PLAYWRIGHT_HTML_OPEN=never

printf 'portfolio-ci: beginning lane=%s commit=%s environment=%s\n' "$lane" "$commit" "$environment"
corepack pnpm install --frozen-lockfile

case "$lane" in
  quality)
    corepack pnpm exec tsc --noEmit
    corepack pnpm lint
    corepack pnpm test
    corepack pnpm build
    ;;
  e2e)
    # Isolated container only. Installs Chromium and its runtime deps, then
    # runs all existing Playwright tests with low worker concurrency to avoid
    # hosted-runner memory exhaustion.
    corepack pnpm exec playwright install --with-deps chromium
    corepack pnpm exec playwright test --workers=1
    ;;
esac

printf 'portfolio-ci: PASSED lane=%s commit=%s\n' "$lane" "$commit"
