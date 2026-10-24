import test from "node:test";
import assert from "node:assert/strict";
import bridge, { isPortfolioEnvironment } from "../src/index.js";

const correct = {
  GITHUB_REPOSITORY: "fuaadabdullah/fuaad-portfolio",
  OCTOPUS_URL: "https://ayahos.octopus.app",
  OCTOPUS_SPACE_ID: "Spaces-1",
  OCTOPUS_PROJECT: "Fuaad Portfolio CI",
  OCTOPUS_ENVIRONMENT: "Portfolio-CI",
  STATUS_CONTEXT: "octopus/portfolio-ci",
};

test("requires the dedicated project, environment, repository and status context", () => {
  assert.equal(isPortfolioEnvironment(correct), true);
  for (const [key, wrong] of [
    ["GITHUB_REPOSITORY", "fuaadabdullah/AyahOS_Dual_Lineage"],
    ["OCTOPUS_PROJECT", "AyahOS"],
    ["OCTOPUS_ENVIRONMENT", "Development"],
    ["STATUS_CONTEXT", "octopus/verify"],
    ["OCTOPUS_SPACE_ID", "Spaces-2"],
  ]) {
    assert.equal(isPortfolioEnvironment({ ...correct, [key]: wrong }), false, key);
  }
});

test("wrong environment fails closed without calling task APIs", async () => {
  const r = await bridge.fetch(new Request("https://example.workers.dev/github", { method: "POST" }), {
    ...correct, OCTOPUS_ENVIRONMENT: "Production"
  }, { waitUntil() { throw new Error("must not enqueue"); } });
  assert.equal(r.status, 503);
  assert.equal(r.headers.get("Cache-Control"), "no-store");
  assert.doesNotMatch(await r.text(), /AyahOS|Production|secret/);
});

test("cron is a no-op under configuration drift", () => {
  let started = 0;
  bridge.scheduled({}, { ...correct, GITHUB_REPOSITORY: "unknown/repo" }, {
    waitUntil() { started += 1; }
  });
  assert.equal(started, 0);
});
