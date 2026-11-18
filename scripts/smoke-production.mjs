#!/usr/bin/env node
// Non-destructive verification only: this script never writes to production APIs.
const origin = process.env.SMOKE_BASE_URL || "https://fuaadabdullah.vercel.app";
const checks = [
  ["/", "text/html"], ["/about", "text/html"], ["/profile", "text/html"],
  ["/portfolio", "text/html"], ["/blog", "text/html"], ["/services", "text/html"],
  ["/contact", "text/html"], ["/resume", "text/html"], ["/cv", "text/html"],
  ["/sitemap.xml", "xml"], ["/robots.txt", "text/plain"],
  ["/Fuaad_Abdullah_Resume.pdf", "application/pdf"],
  ["/api/health", null]
];
const failures = [];
for (const [route, contentType] of checks) {
  try {
    const url = new URL(route, origin);
    const response = await fetch(url, { signal: AbortSignal.timeout(12000), redirect: "follow" });
    const receivedType = response.headers.get("content-type") ?? "";
    if (!response.ok || (contentType && !receivedType.includes(contentType))) {
      failures.push(`${route}: HTTP ${response.status}; content-type ${receivedType}`);
    } else console.log(`OK ${response.status} ${route}`);
  } catch (error) { failures.push(`${route}: ${String(error)}`); }
}
if (failures.length) {
  console.error("Smoke failures:\n" + failures.join("\n"));
  process.exitCode = 1;
} else console.log("Read-only smoke checks passed.");
