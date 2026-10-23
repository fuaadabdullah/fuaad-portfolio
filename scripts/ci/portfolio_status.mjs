import { pathToFileURL } from "node:url";
const HASH = /^[0-9a-f]{40}$/;
const PREFIX = /^fuaad-portfolio-octopus-verify\.[a-z0-9-]+\.workers\.dev$/;
export function makeStatusUrl(base, sha) {
  if (!HASH.test(sha ?? "")) throw new Error("Expected exact commit hash");
  const u = new URL(base);
  if (u.protocol !== "https:" || !PREFIX.test(u.hostname) || u.pathname !== "/" || u.search || u.hash || u.username || u.password || u.port) throw new Error("Invalid verification endpoint");
  return new URL("/status/" + sha, u);
}
export async function verifyOctopusStatus({ sha, base, request = fetch }) {
  const u = makeStatusUrl(base, sha);
  const r = await request(u, { cache: "no-store", headers: { Accept: "application/json" }, signal: AbortSignal.timeout(10000) });
  if (r.status !== 200 || !r.ok) throw new Error("Octopus verification unavailable");
  const data = await r.json();
  if (data?.sha !== sha || data?.state !== "success") throw new Error("Commit not verified by Octopus");
  return true;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  verifyOctopusStatus({ sha: process.argv[2], base: process.env.PORTFOLIO_CI_STATUS_URL }).then(
    () => console.log("Portfolio commit passed Octopus verification"),
    (err) => { console.error("Verification blocked:", err.message); process.exitCode = 1; },
  );
}
