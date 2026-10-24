// Octopus <-> GitHub bridge (Cloudflare Worker).
//
// Octopus cannot create releases for pull-request branches on its own (Git triggers only follow
// the default branch) and it reports nothing to GitHub. This worker closes both gaps:
//
//   1. A signed GitHub `push` webhook creates an Octopus release for that exact branch and commit
//      and deploys it to the verification environment, which runs the seven required gates in
//      .octopus/deployment_process.ocl. The commit gets a `pending` status linking the task.
//   2. A cron trigger polls each task it started and posts `success`, `failure` or `error`.
//
// The latest state per commit is also kept in KV and served read-only at GET /status/<sha>, so a
// consumer (see README.md) can read the outcome without any GitHub token in the Worker.
// GITHUB_STATUS_TOKEN is optional: when it is set the Worker also posts commit statuses itself,
// and that post never depends on the KV write succeeding.
//
// The Octopus API key and the optional GitHub token live only here, never in the Octopus process,
// so code on a branch under test cannot read them. Pushes from other repositories, tag pushes and
// branch deletions are ignored.

import { stagePush, flushBranchQueue, shouldProcessBranchTick } from "./branch_queue.js";

const GITHUB_API = "https://api.github.com";
const TASK_PREFIX = "task:";
const RESULT_PREFIX = "result:";
const RECONCILE_CURSOR_KEY = "meta:reconcile_cursor";
const TASK_TTL_SECONDS = 7 * 24 * 60 * 60;
// Two subrequests per task (Octopus read + GitHub write) stay under the Workers free-plan cap.
const MAX_TASKS_PER_TICK = 20;
const SHA = /^[0-9a-f]{40}$/;
const ZERO_SHA = "0".repeat(40);
const MAX_REF_LENGTH = 255;
const DESCRIPTION_LIMIT = 140;

const REQUIRED_ENV = [
  "GITHUB_REPOSITORY",
  "GITHUB_WEBHOOK_SECRET",
  "OCTOPUS_URL",
  "OCTOPUS_API_KEY",
  "OCTOPUS_SPACE_ID",
  "OCTOPUS_PROJECT",
  "OCTOPUS_ENVIRONMENT",
];

export function missingConfig(env) {
  const missing = REQUIRED_ENV.filter((name) => !env[name]);
  if (!env.TASKS) missing.push("TASKS (KV binding)");
  return missing;
}

function statusContext(env) {
  return env.STATUS_CONTEXT || "octopus/verify";
}

function octopusBase(env) {
  return env.OCTOPUS_URL.replace(/\/+$/, "");
}

export function taskUrl(env, taskId) {
  return `${octopusBase(env)}/app#/${env.OCTOPUS_SPACE_ID}/tasks/${encodeURIComponent(taskId)}`;
}

function truncate(text, limit = DESCRIPTION_LIMIT) {
  const clean = String(text ?? "").replace(/\s+/g, " ").trim();
  return clean.length <= limit ? clean : `${clean.slice(0, limit - 1)}…`;
}

function hex(buffer) {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function verifySignature(secret, body, header) {
  if (!header || !header.startsWith("sha256=")) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  return constantTimeEqual(`sha256=${hex(mac)}`, header);
}

// Returns {ref, sha} for a push this bridge should verify, or {skip: reason}.
export function pushTarget(env, payload) {
  const repository = payload?.repository?.full_name;
  if (typeof repository !== "string" || repository.toLowerCase() !== env.GITHUB_REPOSITORY.toLowerCase()) {
    return { skip: "push is not for the configured repository" };
  }
  const ref = payload.ref;
  if (typeof ref !== "string" || !ref.startsWith("refs/heads/") || ref.length > MAX_REF_LENGTH) {
    return { skip: "not a branch push" };
  }
  const sha = payload.after;
  if (payload.deleted || typeof sha !== "string" || !SHA.test(sha) || sha === ZERO_SHA) {
    return { skip: "branch deletion or missing commit" };
  }
  return { ref, sha };
}

// Octopus task state -> GitHub commit status.
export function statusForTask(task) {
  switch (task.State) {
    case "Success":
      return { state: "success", description: "All required Octopus gates passed" };
    case "Failed":
      return { state: "failure", description: truncate(`Octopus gates failed: ${task.ErrorMessage || "see task log"}`) };
    case "TimedOut":
      return { state: "failure", description: "Octopus task timed out" };
    case "Canceled":
      return { state: "error", description: "Octopus task was canceled" };
    default:
      if (task.HasPendingInterruptions) {
        return { state: "pending", description: "Octopus task is waiting on a manual intervention" };
      }
      return { state: "pending", description: `Octopus task ${String(task.State || "queued").toLowerCase()}` };
  }
}

async function octopus(env, method, path, body) {
  const response = await fetch(`${octopusBase(env)}${path}`, {
    method,
    headers: {
      "X-Octopus-ApiKey": env.OCTOPUS_API_KEY,
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Octopus ${method} ${path.split("?")[0]} returned ${response.status}: ${truncate(text, 300)}`);
  }
  return text ? JSON.parse(text) : {};
}

// A missing verification environment is a configuration fault, not a failed test.
// Inspect names using the existing service credential only after Octopus rejects
// deployment. Report sanitized candidates in private Worker logs and fail closed:
// never silently route a verification release to a different environment.
async function diagnoseEnvironmentMismatch(env, error) {
  if (!String(error?.message || "").includes("Unable to locate deployment environment")) return;
  let available = "unavailable";
  try {
    const environments = await octopus(env, "GET", `/api/${env.OCTOPUS_SPACE_ID}/environments/all`);
    if (Array.isArray(environments)) {
      available = environments
        .filter((item) => typeof item?.Name === "string")
        .slice(0, 30)
        .map((item) => item.Name.replace(/[\r\n]/g, " ").slice(0, 80))
        .join(", ") || "none";
    }
  } catch {
    available = "permission denied or API unavailable";
  }
  const configured = String(env.OCTOPUS_ENVIRONMENT || "").replace(/[\r\n]/g, " ").slice(0, 80);
  console.error(`OCTOPUS_ENVIRONMENT_MISMATCH configured=${configured}; available=${available}`);
}

export async function postStatus(env, sha, { state, description, targetUrl }) {
  const response = await fetch(`${GITHUB_API}/repos/${env.GITHUB_REPOSITORY}/statuses/${sha}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.GITHUB_STATUS_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "ayahos-octopus-github-bridge",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      state,
      description: truncate(description),
      context: statusContext(env),
      ...(targetUrl ? { target_url: targetUrl } : {}),
    }),
  });
  if (!response.ok) {
    throw new Error(`GitHub status for ${sha} returned ${response.status}: ${truncate(await response.text(), 300)}`);
  }
}

// Keep the latest state per commit for GET /status/<sha>, and post it to GitHub when a token is set.
// With a token the GitHub post is authoritative: a KV failure is logged but never blocks it, and a
// post failure still propagates so reconcile keeps the task for the next tick. Without a token the
// KV record is the only channel, so its failure propagates instead.
async function reportStatus(env, sha, status) {
  let recordError = null;
  try {
    await env.TASKS.put(`${RESULT_PREFIX}${sha}`, JSON.stringify({ state: status.state }), {
      expirationTtl: TASK_TTL_SECONDS,
    });
  } catch (error) {
    recordError = error;
  }
  if (env.GITHUB_STATUS_TOKEN) {
    if (recordError) console.error(`result ${sha}: ${recordError.message}`);
    await postStatus(env, sha, status);
  } else if (recordError) {
    throw recordError;
  }
}

// Create the release on the pushed commit, deploy it to the verification environment, and
// record the task so the cron trigger can report its outcome.
export async function startVerification(env, { ref, sha }) {
  const space = env.OCTOPUS_SPACE_ID;
  try {
    const release = await octopus(env, "POST", `/api/${space}/releases/create/v1`, {
      spaceId: space,
      spaceIdOrName: space,
      projectName: env.OCTOPUS_PROJECT,
      gitRef: ref,
      gitCommit: sha,
      ignoreIfAlreadyExists: false,
      ignoreChannelRules: false,
    });
    const deployment = await octopus(env, "POST", `/api/${space}/deployments/create/untenanted/v1`, {
      spaceId: space,
      spaceIdOrName: space,
      projectName: env.OCTOPUS_PROJECT,
      releaseVersion: release.ReleaseVersion,
      environmentNames: [env.OCTOPUS_ENVIRONMENT],
      forcePackageDownload: false,
      forcePackageRedeployment: false,
      updateVariableSnapshot: false,
      // A failed gate must fail the task, not park it waiting for someone to click retry.
      useGuidedFailure: false,
    });
    const taskId = deployment.DeploymentServerTasks?.[0]?.ServerTaskId;
    if (!taskId) throw new Error("Octopus deployment response had no server task");
    await env.TASKS.put(
      `${TASK_PREFIX}${taskId}`,
      JSON.stringify({ sha, ref, releaseVersion: release.ReleaseVersion, state: "pending" }),
      { expirationTtl: TASK_TTL_SECONDS },
    );
    await reportStatus(env, sha, {
      state: "pending",
      description: `Octopus release ${release.ReleaseVersion} queued`,
      targetUrl: taskUrl(env, taskId),
    });
    return { taskId, releaseVersion: release.ReleaseVersion };
  } catch (error) {
    await diagnoseEnvironmentMismatch(env, error);
    // Best effort: if GitHub itself is the failure, the original error is the one to surface.
    await reportStatus(env, sha, {
      state: "error",
      description: truncate(`Could not start Octopus verification: ${error.message}`),
    }).catch(() => {});
    throw error;
  }
}

// One cron tick: report every recorded task whose state changed; forget finished ones.
export async function reconcile(env) {
  // The project may have more tasks than MAX_TASKS_PER_TICK. Keep an opaque
  // cursor across cron ticks so the first long-running page cannot starve
  // every later commit indefinitely. Advance before processing: a failed
  // task stays in KV and is retried when the cursor wraps around.
  const previousCursor = await env.TASKS.get(RECONCILE_CURSOR_KEY);
  const listing = await env.TASKS.list({
    prefix: TASK_PREFIX, limit: MAX_TASKS_PER_TICK,
    ...(previousCursor ? { cursor: previousCursor } : {}),
  });
  const nextCursor = listing.list_complete === false && typeof listing.cursor === "string"
    ? listing.cursor : null;
  if (nextCursor !== previousCursor) {
    if (nextCursor) {
      await env.TASKS.put(RECONCILE_CURSOR_KEY, nextCursor,
        { expirationTtl: TASK_TTL_SECONDS });
    } else if (previousCursor) {
      await env.TASKS.delete(RECONCILE_CURSOR_KEY);
    }
  }
  const results = [];
  for (const { name } of listing.keys) {
    const taskId = name.slice(TASK_PREFIX.length);
    try {
      const record = JSON.parse((await env.TASKS.get(name)) ?? "null");
      if (!record) continue;
      const task = await octopus(env, "GET", `/api/${env.OCTOPUS_SPACE_ID}/tasks/${encodeURIComponent(taskId)}`);
      const status = statusForTask(task);
      const key = `${status.state}:${status.description}`;
      if (key !== record.reported) {
        await reportStatus(env, record.sha, { ...status, targetUrl: taskUrl(env, taskId) });
      }
      if (status.state === "pending") {
        if (key !== record.reported) {
          await env.TASKS.put(name, JSON.stringify({ ...record, reported: key }), { expirationTtl: TASK_TTL_SECONDS });
        }
      } else {
        await env.TASKS.delete(name);
      }
      results.push({ taskId, state: status.state });
    } catch (error) {
      // Leave the record for the next tick; one bad task must not block the others.
      console.error(`reconcile ${taskId}: ${error.message}`);
      results.push({ taskId, error: error.message });
    }
  }
  return results;
}

async function handleWebhook(request, env, ctx) {
  const body = await request.text();
  if (!(await verifySignature(env.GITHUB_WEBHOOK_SECRET, body, request.headers.get("X-Hub-Signature-256")))) {
    return new Response("invalid signature\n", { status: 401 });
  }
  const event = request.headers.get("X-GitHub-Event");
  if (event === "ping") return new Response("pong\n");
  if (event !== "push") return new Response(`ignored event ${event}\n`, { status: 202 });

  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return new Response("invalid JSON\n", { status: 400 });
  }
  const target = pushTarget(env, payload);
  if (target.skip) return new Response(`ignored: ${target.skip}\n`, { status: 202 });

  // Optional branch-level coalescing defers a burst to the cron. No tasks are
  // canceled, and a staged SHA cannot be mistaken for verified success.
  if (env.BRANCH_QUEUE_ENABLED === "true") {
    ctx.waitUntil(stagePush(env, target).catch((error) =>
      console.error(`stage ${target.sha}: ${error.message}`)));
    return new Response(`staged ${target.sha}\n`, { status: 202 });
  }
  // Legacy path stays active until the scheduler is proven on the live Worker.
  ctx.waitUntil(
    startVerification(env, target).catch((error) => console.error(`start ${target.sha}: ${error.message}`)),
  );
  return new Response(`verifying ${target.sha}\n`, { status: 202 });
}

const RESULT_STATES = new Set(["pending", "success", "failure", "error"]);
const NO_STORE = { "Cache-Control": "no-store" };

// Only the state is exposed: Octopus error text and task links stay out of this unauthenticated route.
// A missing, unparsable or unrecognised record is "unknown", never a guess.
async function handleStatus(env, sha) {
  if (!SHA.test(sha)) return new Response("invalid commit\n", { status: 400, headers: NO_STORE });
  let record = null;
  try {
    record = JSON.parse((await env.TASKS.get(`${RESULT_PREFIX}${sha}`)) ?? "null");
  } catch {
    record = null;
  }
  if (!record || !RESULT_STATES.has(record.state)) {
    return new Response("unknown commit\n", { status: 404, headers: NO_STORE });
  }
  return Response.json({ sha, state: record.state }, { headers: NO_STORE });
}

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    const missing = missingConfig(env);
    const statusMatch = pathname.match(/^\/status\/([^/]+)$/);
    if (statusMatch && request.method === "GET") {
      if (missing.length) return new Response("bridge is not configured\n", { status: 503 });
      return handleStatus(env, statusMatch[1]);
    }
    if (pathname === "/healthz") {
      return missing.length
        ? new Response(`missing configuration: ${missing.join(", ")}\n`, { status: 503 })
        : new Response("ok\n");
    }
    if (pathname === "/github" && request.method === "POST") {
      if (missing.length) return new Response("bridge is not configured\n", { status: 503 });
      return handleWebhook(request, env, ctx);
    }
    return new Response("not found\n", { status: 404 });
  },

  async scheduled(_controller, env, ctx) {
    if (missingConfig(env).length) return;
    // The branch queue uses three KV list operations per tick. Process only
    // once every six minutes to remain under the Workers KV Free daily quota.
    // Legacy scheduling is unchanged until the feature flag is promoted.
    if (env.BRANCH_QUEUE_ENABLED === "true" && !shouldProcessBranchTick()) return;
    ctx.waitUntil((async () => {
      // Do not use a GitHub status token in the branch queue, even if an old
      // secret binding still exists on the deployed Worker.
      const tokenless = env.BRANCH_QUEUE_ENABLED === "true"
        ? { ...env, GITHUB_STATUS_TOKEN: undefined } : env;
      await reconcile(tokenless);
      if (env.BRANCH_QUEUE_ENABLED === "true") {
        // At most one new release per tick, and never for a ref with a tracked
        // task already in flight. KV convergence is best-effort, not a lock.
        await flushBranchQueue(tokenless, (target) => startVerification(tokenless, target));
      }
    })());
  },
};
