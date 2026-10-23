// Portfolio-only guard around the vetted AyahOS bridge implementation.
// Never route source code checks through the AyahOS project or Development environment.
import worker from "./worker.js";

const EXPECTED = Object.freeze({
  GITHUB_REPOSITORY: "fuaadabdullah/fuaad-portfolio",
  OCTOPUS_URL: "https://ayahos.octopus.app",
  OCTOPUS_SPACE_ID: "Spaces-1",
  OCTOPUS_PROJECT: "Fuaad Portfolio CI",
  OCTOPUS_ENVIRONMENT: "Portfolio-CI",
  STATUS_CONTEXT: "octopus/portfolio-ci",
});

export function isPortfolioEnvironment(env) {
  return !!env && Object.entries(EXPECTED).every(([key, expected]) => env[key] === expected);
}

export default {
  async fetch(request, env, ctx) {
    if (!isPortfolioEnvironment(env)) {
      return new Response("not configured\n", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
      });
    }
    return worker.fetch(request, env, ctx);
  },
  scheduled(event, env, ctx) {
    if (!isPortfolioEnvironment(env)) return;
    return worker.scheduled(event, env, ctx);
  },
};
