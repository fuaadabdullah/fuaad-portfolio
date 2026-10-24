import { test } from "node:test";
import assert from "node:assert/strict";
import { makeStatusUrl, verifyOctopusStatus } from "./portfolio_status.mjs";

const SHA = "a".repeat(40);
const HOST = "https://fuaad-portfolio-octopus-verify.example.workers.dev";

test("rejects malformed SHAs, unsafe URLs and non-portfolio Workers", () => {
  for (const sha of ["main", "../secrets", "A".repeat(40), "", "a".repeat(39)]) {
    assert.throws(() => makeStatusUrl(HOST, sha));
  }
  for (const host of [
    "http://fuaad-portfolio-octopus-verify.example.workers.dev",
    "https://evil.example",
    "https://fuaad-portfolio-octopus-verify.example.workers.dev@evil.example",
    "https://fuaad-portfolio-octopus-verify.example.workers.dev/untrusted",
  ]) assert.throws(() => makeStatusUrl(host, SHA));
});

test("constructs a fixed, exact-commit status endpoint", () => {
  assert.equal(makeStatusUrl(HOST, SHA).href, HOST + "/status/" + SHA);
});

test("accepts only an authenticated bridge's exact successful SHA response", async () => {
  const read = async (url, init) => {
    assert.equal(url.href, HOST + "/status/" + SHA);
    assert.equal(init.cache, "no-store");
    return { ok: true, status: 200, json: async () => ({ sha: SHA, state: "success" }) };
  };
  assert.equal(await verifyOctopusStatus({ sha: SHA, base: HOST, request: read }), true);
});

test("rejects pending, unknown, failed, malformed or mismatched status", async () => {
  for (const reply of [
    { ok: false, status: 404 },
    { ok: true, status: 200, json: async () => ({ sha: SHA, state: "pending" }) },
    { ok: true, status: 200, json: async () => ({ sha: SHA, state: "error" }) },
    { ok: true, status: 200, json: async () => ({ sha: SHA, state: "failure" }) },
    { ok: true, status: 200, json: async () => ({ sha: "b".repeat(40), state: "success" }) },
    { ok: true, status: 200, json: async () => ({ sha: SHA, state: "SUCCESS" }) },
    { ok: true, status: 200, json: async () => { throw Error("bad JSON"); } },
  ]) {
    await assert.rejects(verifyOctopusStatus({ sha: SHA, base: HOST, request: async () => reply }));
  }
});
