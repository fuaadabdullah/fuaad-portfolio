#!/usr/bin/env node
// Read-only progress inspector for the 35-finding portfolio audit package.
import fs from "node:fs";
const manifest = JSON.parse(fs.readFileSync(new URL("../docs/hardening/findings.json", import.meta.url), "utf8"));
const allowed = new Set(["open", "blocked", "implemented-unverified", "verified", "disproven", "accepted"]);
const ids = new Set();
for (const item of manifest.findings) {
  if (!allowed.has(item.status) || ids.has(item.id)) throw new Error("Invalid finding " + item.id);
  ids.add(item.id);
}
if (manifest.findings.length !== 35) throw new Error("Expected 35 audited findings");
const totals = {};
for (const item of manifest.findings) totals[item.status] = (totals[item.status] || 0) + 1;
if (process.argv.includes("--json")) console.log(JSON.stringify(totals, null, 2));
else {
  console.log("Portfolio audit finding status:");
  for (const [name, total] of Object.entries(totals)) console.log(`  ${name}: ${total}`);
  for (const item of manifest.findings.filter(f => f.status !== "verified" && f.status !== "disproven" && f.status !== "accepted")) {
    console.log(`[${item.status}] ${item.id} ${item.module} ${item.title}`);
  }
}
