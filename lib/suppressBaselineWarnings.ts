// baseline-browser-mapping uses `process.env` for warning suppression.
// In Next.js Edge runtime, `process` is typically undefined, so the warning
// can't be suppressed via normal env vars. Define a minimal `process.env`
// to make suppression work during edge prerender/generation.
//
// This file is intentionally side-effectful: import it once in Edge routes.
const g = globalThis as unknown as { process?: { env?: Record<string, string> } };

if (typeof g.process === "undefined") {
  g.process = { env: {} };
}
if (!g.process.env) {
  g.process.env = {};
}

g.process.env.BROWSERSLIST_IGNORE_OLD_DATA ??= "true";
g.process.env.BASELINE_BROWSER_MAPPING_IGNORE_OLD_DATA ??= "true";

