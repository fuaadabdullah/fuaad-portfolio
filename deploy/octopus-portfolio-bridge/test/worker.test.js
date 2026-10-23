import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, it } from "node:test";

import worker, {
  missingConfig,
  pushTarget,
  reconcile,
  startVerification,
  statusForTask,
  verifySignature,
} from "../src/worker.js";

const SHA = "a".repeat(40);
const SECRET = "webhook-secret";

class MemoryKV {
  constructor() {
    this.store = new Map();
    this.options = new Map();
    this.failPutFor = null;
  }
  async get(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }
  async put(key, value, options) {
    if (this.failPutFor?.test(key)) throw new Error("KV PUT failed: 429");
    this.store.set(key, value);
    this.options.set(key, options);
  }
  async delete(key) {
    this.store.delete(key);
  }
  async list({ prefix, limit, cursor }) {
    // Model the opaque, paginated Workers KV cursor. Numeric encoding here
    // is a test-only stand-in for the API's cursor token.
    const all = [...this.store.keys()].filter((key) => key.startsWith(prefix)).sort();
    const offset = cursor ? Number(cursor) : 0;
    const keys = all.slice(offset, offset + limit);
    const end = offset + keys.length;
    return { keys: keys.map((name) => ({ name })),
      list_complete: end >= all.length, cursor: end >= all.length ? undefined : String(end) };
  }
}

function makeEnv(overrides = {}) {
  return {
    GITHUB_REPOSITORY: "fuaadabdullah/AyahOS_Dual_Lineage",
    GITHUB_WEBHOOK_SECRET: SECRET,
    GITHUB_STATUS_TOKEN: "gh-token",
    OCTOPUS_URL: "https://ayahos.octopus.app/",
    OCTOPUS_API_KEY: "API-KEY",
    OCTOPUS_SPACE_ID: "Spaces-1",
    OCTOPUS_PROJECT: "AyahOS",
    OCTOPUS_ENVIRONMENT: "Development",
    TASKS: new MemoryKV(),
    ...overrides,
  };
}

function taskKeys(env) {
  return [...env.TASKS.store.keys()].filter((key) => key.startsWith("task:"));
}

function pushPayload(overrides = {}) {
  return {
    ref: "refs/heads/fix/retire-circleci-octopus",
    after: SHA,
    deleted: false,
    repository: { full_name: "fuaadabdullah/AyahOS_Dual_Lineage" },
    ...overrides,
  };
}

function sign(body, secret = SECRET) {
  return `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
}

// Records every outbound request and answers from a route table keyed by "METHOD path".
function mockFetch(routes) {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    const { origin, pathname } = new URL(url);
    const method = init.method || "GET";
    calls.push({ origin, method, pathname, headers: init.headers, body: init.body ? JSON.parse(init.body) : undefined });
    const route = routes[`${method} ${pathname}`];
    if (!route) return new Response("no route", { status: 404 });
    const { status = 200, json } = typeof route === "function" ? route() : route;
    return new Response(json === undefined ? "" : JSON.stringify(json), { status });
  };
  return calls;
}

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

const STATUS_PATH = `/repos/fuaadabdullah/AyahOS_Dual_Lineage/statuses/${SHA}`;
const OCTOPUS_ROUTES = {
  "POST /api/Spaces-1/releases/create/v1": { json: { ReleaseId: "Releases-9", ReleaseVersion: "0.1.9" } },
  "POST /api/Spaces-1/deployments/create/untenanted/v1": {
    json: { DeploymentServerTasks: [{ DeploymentId: "Deployments-4", ServerTaskId: "ServerTasks-77" }] },
  },
  [`POST ${STATUS_PATH}`]: { status: 201, json: {} },
};

describe("webhook signature", () => {
  it("accepts the GitHub HMAC and rejects anything else", async () => {
    const body = JSON.stringify(pushPayload());
    assert.equal(await verifySignature(SECRET, body, sign(body)), true);
    assert.equal(await verifySignature(SECRET, body, sign(body, "other")), false);
    assert.equal(await verifySignature(SECRET, `${body} `, sign(body)), false);
    assert.equal(await verifySignature(SECRET, body, null), false);
    assert.equal(await verifySignature(SECRET, body, "sha1=abc"), false);
  });
});

describe("push filtering", () => {
  const env = makeEnv();
  it("verifies branch pushes to the configured repository", () => {
    assert.deepEqual(pushTarget(env, pushPayload()), { ref: "refs/heads/fix/retire-circleci-octopus", sha: SHA });
    assert.ok(!pushTarget(env, pushPayload({ repository: { full_name: "FUAADABDULLAH/ayahos_dual_lineage" } })).skip);
  });
  it("ignores forks, tags, deletions and malformed commits", () => {
    assert.ok(pushTarget(env, pushPayload({ repository: { full_name: "someone/fork" } })).skip);
    assert.ok(pushTarget(env, pushPayload({ ref: "refs/tags/v1" })).skip);
    assert.ok(pushTarget(env, pushPayload({ deleted: true, after: "0".repeat(40) })).skip);
    assert.ok(pushTarget(env, pushPayload({ after: "0".repeat(40) })).skip);
    assert.ok(pushTarget(env, pushPayload({ after: "HEAD" })).skip);
    assert.ok(pushTarget(env, pushPayload({ ref: `refs/heads/${"x".repeat(300)}` })).skip);
  });
});

describe("task state mapping", () => {
  it("maps every Octopus task state to a GitHub status", () => {
    assert.equal(statusForTask({ State: "Success" }).state, "success");
    assert.equal(statusForTask({ State: "Failed", ErrorMessage: "step api-postgres failed" }).state, "failure");
    assert.match(statusForTask({ State: "Failed", ErrorMessage: "step api-postgres failed" }).description, /api-postgres/);
    assert.equal(statusForTask({ State: "TimedOut" }).state, "failure");
    assert.equal(statusForTask({ State: "Canceled" }).state, "error");
    for (const state of ["Queued", "Executing", "Cancelling"]) {
      assert.equal(statusForTask({ State: state }).state, "pending");
    }
    assert.match(statusForTask({ State: "Executing", HasPendingInterruptions: true }).description, /manual intervention/);
  });
  it("keeps descriptions within GitHub's 140 characters", () => {
    assert.ok(statusForTask({ State: "Failed", ErrorMessage: "x".repeat(500) }).description.length <= 140);
  });
});

describe("startVerification", () => {
  it("releases the exact commit, deploys it, records the task and posts pending", async () => {
    const env = makeEnv();
    const calls = mockFetch(OCTOPUS_ROUTES);
    const result = await startVerification(env, { ref: "refs/heads/feature", sha: SHA });

    assert.deepEqual(result, { taskId: "ServerTasks-77", releaseVersion: "0.1.9" });
    const [release, deploy, status] = calls;
    assert.equal(release.origin, "https://ayahos.octopus.app");
    assert.equal(release.headers["X-Octopus-ApiKey"], "API-KEY");
    assert.deepEqual(
      { gitRef: release.body.gitRef, gitCommit: release.body.gitCommit, projectName: release.body.projectName },
      { gitRef: "refs/heads/feature", gitCommit: SHA, projectName: "AyahOS" },
    );
    assert.equal(release.body.spaceIdOrName, "Spaces-1");
    assert.deepEqual(deploy.body.environmentNames, ["Development"]);
    assert.equal(deploy.body.releaseVersion, "0.1.9");
    assert.equal(deploy.body.useGuidedFailure, false);
    assert.equal(status.origin, "https://api.github.com");
    assert.equal(status.pathname, STATUS_PATH);
    assert.equal(status.headers.Authorization, "Bearer gh-token");
    assert.equal(status.body.state, "pending");
    assert.equal(status.body.context, "octopus/verify");
    assert.equal(status.body.target_url, "https://ayahos.octopus.app/app#/Spaces-1/tasks/ServerTasks-77");
    assert.deepEqual(JSON.parse(await env.TASKS.get("task:ServerTasks-77")).sha, SHA);
  });

  it("posts an error status when Octopus refuses the release", async () => {
    const env = makeEnv();
    const calls = mockFetch({
      ...OCTOPUS_ROUTES,
      "POST /api/Spaces-1/releases/create/v1": { status: 400, json: { ErrorMessage: "channel rule" } },
    });
    await assert.rejects(startVerification(env, { ref: "refs/heads/feature", sha: SHA }), /returned 400/);
    const status = calls.at(-1);
    assert.equal(status.pathname, STATUS_PATH);
    assert.equal(status.body.state, "error");
    assert.deepEqual(taskKeys(env), []);
    assert.deepEqual(JSON.parse(await env.TASKS.get(`result:${SHA}`)), { state: "error" });
  });

  it("diagnoses missing deployment environment without choosing another or leaking credentials", async () => {
    const env = makeEnv({ OCTOPUS_ENVIRONMENT: "Verification" });
    const calls = mockFetch({
      ...OCTOPUS_ROUTES,
      "POST /api/Spaces-1/deployments/create/untenanted/v1": {
        status: 400,
        json: { ErrorMessage: "There was a problem", Errors: ["Unable to locate deployment environment(s) named 'Verification'"] },
      },
      "GET /api/Spaces-1/environments/all": {
        json: [{ Id: "Environments-1", Name: "CI" }, { Id: "Environments-2", Name: "Production" }],
      },
    });
    const originalError = console.error;
    const logged = [];
    console.error = (...parts) => logged.push(parts.join(" "));
    try {
      await assert.rejects(startVerification(env, { ref: "refs/heads/feature", sha: SHA }), /returned 400/);
    } finally {
      console.error = originalError;
    }
    assert.ok(calls.some((call) => call.method === "GET" && call.pathname === "/api/Spaces-1/environments/all"));
    assert.deepEqual(calls.filter((call) => call.pathname.includes("/deployments/create")).length, 1);
    assert.match(logged.join(" "), /OCTOPUS_ENVIRONMENT_MISMATCH/);
    assert.match(logged.join(" "), /CI/);
    assert.match(logged.join(" "), /Production/);
    assert.doesNotMatch(logged.join(" "), /API-KEY|gh-token|webhook-secret/);
    assert.deepEqual(taskKeys(env), []);
    assert.deepEqual(JSON.parse(await env.TASKS.get(`result:${SHA}`)), { state: "error" });
  });

  it("records the result without any GitHub call when no token is configured", async () => {
    const env = makeEnv({ GITHUB_STATUS_TOKEN: undefined });
    const calls = mockFetch(OCTOPUS_ROUTES);
    await startVerification(env, { ref: "refs/heads/feature", sha: SHA });
    assert.deepEqual(calls.map((call) => call.origin), ["https://ayahos.octopus.app", "https://ayahos.octopus.app"]);
    assert.deepEqual(JSON.parse(await env.TASKS.get(`result:${SHA}`)), { state: "pending" });
    assert.equal(env.TASKS.options.get(`result:${SHA}`).expirationTtl, 7 * 24 * 60 * 60);
  });

  it("still posts the GitHub status when the KV result write fails", async () => {
    const env = makeEnv();
    env.TASKS.failPutFor = /^result:/;
    const calls = mockFetch(OCTOPUS_ROUTES);
    await startVerification(env, { ref: "refs/heads/feature", sha: SHA });
    assert.equal(calls.at(-1).pathname, STATUS_PATH);
    assert.equal(calls.at(-1).body.state, "pending");
  });

  it("surfaces a KV result write failure when there is no token to fall back on", async () => {
    const env = makeEnv({ GITHUB_STATUS_TOKEN: undefined });
    env.TASKS.failPutFor = /^result:/;
    mockFetch(OCTOPUS_ROUTES);
    await assert.rejects(startVerification(env, { ref: "refs/heads/feature", sha: SHA }), /KV PUT failed/);
  });
});

describe("reconcile", () => {
  let env;
  beforeEach(async () => {
    env = makeEnv();
    await env.TASKS.put("task:ServerTasks-77", JSON.stringify({ sha: SHA, ref: "refs/heads/feature", state: "pending" }));
  });

  it("paginates beyond twenty long-running tasks instead of starving later commits", async () => {
    // The real Octopus queue exceeded 40 jobs. Without a persisted cursor,
    // the first twenty queued jobs monopolize every cron tick.
    const tokenless = makeEnv({ GITHUB_STATUS_TOKEN: undefined });
    const routes = {};
    const lastSha = (24).toString(16).padStart(40, "0");
    for (let i = 0; i < 25; i++) {
      const id = `ServerTasks-${String(i).padStart(3, "0")}`;
      const uniqueSha = i.toString(16).padStart(40, "0");
      await tokenless.TASKS.put(`task:${id}`,
        JSON.stringify({ sha: uniqueSha, ref: "refs/heads/feature", state: "pending" }));
      routes[`GET /api/Spaces-1/tasks/${id}`] = {
        json: { State: i === 24 ? "Success" : "Queued" },
      };
    }
    const calls = mockFetch(routes);
    await reconcile(tokenless);
    assert.equal(JSON.parse(await tokenless.TASKS.get(`result:${"0".repeat(40)}`)).state, "pending");
    // The final task has its own SHA and must be reported from Octopus,
    // without treating earlier still-queued commits as successful.
    await reconcile(tokenless);
    assert.equal(JSON.parse(await tokenless.TASKS.get(`result:${lastSha}`)).state, "success");
    assert.equal(JSON.parse(await tokenless.TASKS.get(`result:${"0".repeat(40)}`)).state, "pending");
    assert.ok(calls.some(c => c.pathname === "/api/Spaces-1/tasks/ServerTasks-024"));
    assert.ok(!tokenless.TASKS.store.has("task:ServerTasks-024"));
    assert.ok(tokenless.TASKS.store.has("task:ServerTasks-000"));
  });

  it("reports progress once and keeps the task while it runs", async () => {
    const calls = mockFetch({
      "GET /api/Spaces-1/tasks/ServerTasks-77": { json: { State: "Executing" } },
      [`POST ${STATUS_PATH}`]: { status: 201, json: {} },
    });
    await reconcile(env);
    await reconcile(env);
    assert.equal(calls.filter((call) => call.method === "POST").length, 1);
    assert.ok(env.TASKS.store.has("task:ServerTasks-77"));
  });

  it("posts the final state and forgets the task", async () => {
    const calls = mockFetch({
      "GET /api/Spaces-1/tasks/ServerTasks-77": { json: { State: "Failed", ErrorMessage: "rag-postgres failed" } },
      [`POST ${STATUS_PATH}`]: { status: 201, json: {} },
    });
    assert.deepEqual(await reconcile(env), [{ taskId: "ServerTasks-77", state: "failure" }]);
    assert.equal(calls.at(-1).body.state, "failure");
    assert.deepEqual(taskKeys(env), []);
    assert.deepEqual(JSON.parse(await env.TASKS.get(`result:${SHA}`)), { state: "failure" });
  });

  it("finishes without GitHub when no token is configured", async () => {
    const tokenless = makeEnv({ GITHUB_STATUS_TOKEN: undefined });
    await tokenless.TASKS.put("task:ServerTasks-77", JSON.stringify({ sha: SHA, ref: "refs/heads/feature", state: "pending" }));
    const calls = mockFetch({ "GET /api/Spaces-1/tasks/ServerTasks-77": { json: { State: "Success" } } });
    assert.deepEqual(await reconcile(tokenless), [{ taskId: "ServerTasks-77", state: "success" }]);
    assert.ok(calls.every((call) => call.origin === "https://ayahos.octopus.app"));
    assert.deepEqual(taskKeys(tokenless), []);
    assert.deepEqual(JSON.parse(await tokenless.TASKS.get(`result:${SHA}`)), { state: "success" });
  });

  it("keeps the task for the next tick when GitHub is unavailable", async () => {
    mockFetch({
      "GET /api/Spaces-1/tasks/ServerTasks-77": { json: { State: "Success" } },
      [`POST ${STATUS_PATH}`]: { status: 502, json: {} },
    });
    const [result] = await reconcile(env);
    assert.match(result.error, /502/);
    assert.ok(env.TASKS.store.has("task:ServerTasks-77"));
    assert.deepEqual(JSON.parse(await env.TASKS.get(`result:${SHA}`)), { state: "success" });
  });

  it("posts the final GitHub status and forgets the task even when the KV result write fails", async () => {
    env.TASKS.failPutFor = /^result:/;
    const calls = mockFetch({
      "GET /api/Spaces-1/tasks/ServerTasks-77": { json: { State: "Success" } },
      [`POST ${STATUS_PATH}`]: { status: 201, json: {} },
    });
    assert.deepEqual(await reconcile(env), [{ taskId: "ServerTasks-77", state: "success" }]);
    assert.equal(calls.at(-1).body.state, "success");
    assert.deepEqual(taskKeys(env), []);
  });

  it("keeps the task for the next tick when the KV result write fails and there is no token", async () => {
    const tokenless = makeEnv({ GITHUB_STATUS_TOKEN: undefined });
    await tokenless.TASKS.put("task:ServerTasks-77", JSON.stringify({ sha: SHA, ref: "refs/heads/feature", state: "pending" }));
    tokenless.TASKS.failPutFor = /^result:/;
    mockFetch({ "GET /api/Spaces-1/tasks/ServerTasks-77": { json: { State: "Success" } } });
    const [result] = await reconcile(tokenless);
    assert.match(result.error, /KV PUT failed/);
    assert.deepEqual(taskKeys(tokenless), ["task:ServerTasks-77"]);
  });
});

describe("fetch handler", () => {
  const ctx = () => {
    const pending = [];
    return { pending, waitUntil: (promise) => pending.push(promise) };
  };

  it("rejects unsigned webhooks without calling Octopus", async () => {
    const calls = mockFetch(OCTOPUS_ROUTES);
    const body = JSON.stringify(pushPayload());
    const response = await worker.fetch(
      new Request("https://bridge.example/github", {
        method: "POST",
        body,
        headers: { "X-GitHub-Event": "push", "X-Hub-Signature-256": sign(body, "wrong") },
      }),
      makeEnv(),
      ctx(),
    );
    assert.equal(response.status, 401);
    assert.equal(calls.length, 0);
  });

  it("starts verification for a signed push", async () => {
    const calls = mockFetch(OCTOPUS_ROUTES);
    const body = JSON.stringify(pushPayload());
    const context = ctx();
    const response = await worker.fetch(
      new Request("https://bridge.example/github", {
        method: "POST",
        body,
        headers: { "X-GitHub-Event": "push", "X-Hub-Signature-256": sign(body) },
      }),
      makeEnv(),
      context,
    );
    assert.equal(response.status, 202);
    await Promise.all(context.pending);
    assert.equal(calls.length, 3);
  });

  it("stages signed branch pushes and starts only a debounced revision on cron", async () => {
    const env = makeEnv({ BRANCH_QUEUE_ENABLED: "true" }); // An existing token must be ignored.
    const calls = mockFetch(OCTOPUS_ROUTES);
    const body = JSON.stringify(pushPayload());
    const context = ctx();
    const response = await worker.fetch(
      new Request("https://bridge.example/github", {
        method: "POST", body,
        headers: { "X-GitHub-Event": "push", "X-Hub-Signature-256": sign(body) },
      }),
      env, context,
    );
    assert.equal(response.status, 202);
    await Promise.all(context.pending);
    assert.deepEqual(calls, []); // No Octopus release from the webhook itself.
    const desiredKey = `desired:${encodeURIComponent(pushPayload().ref)}`;
    const desired = JSON.parse(await env.TASKS.get(desiredKey));
    assert.equal(desired.sha, SHA);
    assert.equal(await env.TASKS.get(`result:${SHA}`), null); // Not verified yet.
    await env.TASKS.put(desiredKey, JSON.stringify({ ...desired, seenAt: Date.now() - 600000 }));
    const scheduled = ctx();
    // Simulate a scheduled six-minute slot without waiting or relying on wall time.
    const realNow = Date.now;
    Date.now = () => Math.floor(realNow() / 360000) * 360000;
    try {
      await worker.scheduled({}, env, scheduled);
      await Promise.all(scheduled.pending);
    } finally {
      Date.now = realNow;
    }
    assert.deepEqual(calls.map(c => c.origin), ["https://ayahos.octopus.app", "https://ayahos.octopus.app"]);
    assert.deepEqual(taskKeys(env), ["task:ServerTasks-77"]);
    assert.deepEqual(JSON.parse(await env.TASKS.get(`result:${SHA}`)), { state: "pending" });
  });

  it("reports missing configuration on /healthz without leaking values", async () => {
    const response = await worker.fetch(new Request("https://bridge.example/healthz"), makeEnv({ OCTOPUS_API_KEY: "" }), ctx());
    assert.equal(response.status, 503);
    const text = await response.text();
    assert.match(text, /OCTOPUS_API_KEY/);
    assert.doesNotMatch(text, /gh-token|webhook-secret/);
    assert.deepEqual(missingConfig(makeEnv()), []);
  });

  it("is healthy without a GitHub token", async () => {
    const env = makeEnv({ GITHUB_STATUS_TOKEN: undefined });
    assert.deepEqual(missingConfig(env), []);
    const response = await worker.fetch(new Request("https://bridge.example/healthz"), env, ctx());
    assert.equal(response.status, 200);
  });

  describe("GET /status/<sha>", () => {
    const get = (env, path) => worker.fetch(new Request(`https://bridge.example${path}`), env, ctx());

    it("returns only the recorded state", async () => {
      const env = makeEnv();
      await env.TASKS.put(`result:${SHA}`, JSON.stringify({ state: "failure", description: "secret detail" }));
      const response = await get(env, `/status/${SHA}`);
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("Cache-Control"), "no-store");
      assert.deepEqual(await response.json(), { sha: SHA, state: "failure" });
    });

    it("404s for an unknown commit and 400s for a malformed one, never cacheable", async () => {
      const env = makeEnv();
      const unknown = await get(env, `/status/${"b".repeat(40)}`);
      assert.equal(unknown.status, 404);
      assert.equal(unknown.headers.get("Cache-Control"), "no-store");
      const malformed = await get(env, "/status/HEAD");
      assert.equal(malformed.status, 400);
      assert.equal(malformed.headers.get("Cache-Control"), "no-store");
      assert.equal((await get(env, `/status/${"A".repeat(40)}`)).status, 400);
    });

    it("treats a corrupt, empty or unrecognised record as unknown", async () => {
      const env = makeEnv();
      for (const value of ["{not json", "{}", JSON.stringify({ state: "weird" }), JSON.stringify({ state: 1 }), "null"]) {
        await env.TASKS.put(`result:${SHA}`, value);
        assert.equal((await get(env, `/status/${SHA}`)).status, 404, value);
      }
    });

    it("only answers GET on the exact /status/<sha> path", async () => {
      const env = makeEnv();
      await env.TASKS.put(`result:${SHA}`, JSON.stringify({ state: "success" }));
      assert.equal((await get(env, `/status/${SHA}`)).status, 200);
      for (const method of ["POST", "PUT", "DELETE", "HEAD"]) {
        const response = await worker.fetch(new Request(`https://bridge.example/status/${SHA}`, { method }), env, ctx());
        assert.equal(response.status, 404, method);
      }
      assert.equal((await get(env, `/status/${SHA}/`)).status, 404);
      assert.equal((await get(env, `/status/${SHA}/extra`)).status, 404);
    });

    it("reports an unconfigured bridge", async () => {
      assert.equal((await get(makeEnv({ OCTOPUS_API_KEY: "" }), `/status/${SHA}`)).status, 503);
    });

    it("tracks a commit from pending to its final state end to end", async () => {
      const env = makeEnv({ GITHUB_STATUS_TOKEN: undefined });
      mockFetch({
        ...OCTOPUS_ROUTES,
        "GET /api/Spaces-1/tasks/ServerTasks-77": { json: { State: "Success" } },
      });
      await startVerification(env, { ref: "refs/heads/feature", sha: SHA });
      assert.equal((await (await get(env, `/status/${SHA}`)).json()).state, "pending");
      await reconcile(env);
      assert.equal((await (await get(env, `/status/${SHA}`)).json()).state, "success");
    });
  });
});
