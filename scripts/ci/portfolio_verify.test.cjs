"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } = require("node:fs");
const { tmpdir } = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const original = path.join(__dirname, "portfolio_verify.sh");
const SHA = "a".repeat(40);

function fixture({ project = "Fuaad Portfolio CI", environment = "Portfolio-CI", sha = SHA, secrets = false } = {}) {
  const base = mkdtempSync(path.join(tmpdir(), "portfolio-octopus-test-"));
  const bin = path.join(base, "bin");
  const scriptDir = path.join(base, "scripts", "ci");
  mkdirSync(bin, { recursive: true });
  mkdirSync(scriptDir, { recursive: true });
  mkdirSync(path.join(base, "app"), { recursive: true });
  writeFileSync(path.join(scriptDir, "portfolio_verify.sh"), readFileSync(original));
  writeFileSync(path.join(base, "package.json"), JSON.stringify({ name: "fuaad-portfolio", packageManager: "pnpm@10.30.3" }));
  writeFileSync(path.join(base, "pnpm-lock.yaml"), "lockfileVersion: '9.0'\n");
  const log = path.join(base, "invocations.txt");
  writeFileSync(path.join(bin, "get_octopusvariable"), [
    "#!/bin/sh",
    "case \"$1\" in",
    "  Octopus.Project.Name) printf '%s\\n' \"$FIXTURE_PROJECT\" ;;",
    "  Octopus.Environment.Name) printf '%s\\n' \"$FIXTURE_ENVIRONMENT\" ;;",
    "  Octopus.Release.Git.CommitHash) printf '%s\\n' \"$FIXTURE_SHA\" ;;",
    "esac",
  ].join("\n"), { mode: 0o755 });
  writeFileSync(path.join(bin, "corepack"), [
    "#!/bin/sh",
    "printf '%s\\n' \"$*\" >> \"$FIXTURE_LOG\"",
    "if [ \"$1\" = \"pnpm\" ] && [ \"$2\" = \"--version\" ]; then printf '10.30.3\\n'; fi",
  ].join("\n"), { mode: 0o755 });
  const env = {
    PATH: bin + ":" + process.env.PATH, HOME: base, CI: "true",
    FIXTURE_PROJECT: project, FIXTURE_ENVIRONMENT: environment, FIXTURE_SHA: sha, FIXTURE_LOG: log,
    ...(secrets ? { OCTOPUS_API_KEY: "test-only-sentinel" } : {}),
  };
  return {
    run(lane) {
      return spawnSync("bash", [path.join(scriptDir, "portfolio_verify.sh"), lane], {
        encoding: "utf8", cwd: base, env, timeout: 6000,
      });
    },
    commands() {
      try { return readFileSync(log, "utf8").trim().split("\n"); } catch { return []; }
    },
    close() { rmSync(base, { recursive: true, force: true }); },
  };
}

test("denies execution outside the dedicated Octopus environment", () => {
  const f = fixture({ environment: "Development" });
  try {
    const r = f.run("quality");
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /Portfolio-CI/);
    assert.deepEqual(f.commands(), []);
  } finally { f.close(); }
});

test("denies execution as the AyahOS project", () => {
  const f = fixture({ project: "AyahOS" });
  try {
    const r = f.run("quality");
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /Fuaad Portfolio CI/);
    assert.deepEqual(f.commands(), []);
  } finally { f.close(); }
});

test("denies missing or malformed exact source revision", () => {
  const f = fixture({ sha: "main" });
  try {
    const r = f.run("quality");
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /commit/i);
    assert.deepEqual(f.commands(), []);
  } finally { f.close(); }
});

test("refuses to expose bridge credentials to test code", () => {
  const f = fixture({ secrets: true });
  try {
    const r = f.run("quality");
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /bridge credentials/i);
    assert.deepEqual(f.commands(), []);
  } finally { f.close(); }
});

test("quality lane preserves install, typecheck, lint, unit test and production build", () => {
  const f = fixture();
  try {
    const r = f.run("quality");
    assert.equal(r.status, 0, r.stderr + r.stdout);
    assert.deepEqual(f.commands(), [
      "pnpm --version",
      "pnpm install --frozen-lockfile",
      "pnpm exec tsc --noEmit",
      "pnpm lint",
      "pnpm test",
      "pnpm build",
    ]);
  } finally { f.close(); }
});

test("E2E lane installs chromium and keeps the real Playwright suite", () => {
  const f = fixture();
  try {
    const r = f.run("e2e");
    assert.equal(r.status, 0, r.stderr + r.stdout);
    assert.deepEqual(f.commands(), [
      "pnpm --version",
      "pnpm install --frozen-lockfile",
      "pnpm exec playwright install --with-deps chromium",
      "pnpm exec playwright test --workers=1",
    ]);
  } finally { f.close(); }
});

test("unsupported lane fails without invoking dependency installers", () => {
  const f = fixture();
  try {
    const r = f.run("deploy-production");
    assert.notEqual(r.status, 0);
    assert.deepEqual(f.commands(), []);
  } finally { f.close(); }
});
