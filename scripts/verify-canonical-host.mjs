#!/usr/bin/env node
// Block a future accidental return to the expired portfolio hostname.
import fs from "node:fs/promises";
import path from "node:path";
const root = process.cwd();
const legacy = "heyimfuaad" + ".me";
const expected = "fuaadabdullah.vercel.app";
const dirs = ["app", "components", "data", "lib"];
const extra = ["next.config.ts", "public/robots.txt", "content/resume.md", "content/cv.md", "README.md", "scripts/capture-project-demos.mjs"];
const failures = [];
async function check(file) {
  const content = await fs.readFile(path.join(root, file), "utf8");
  if (content.includes(legacy)) failures.push(file + ": expired hostname");
}
async function walk(dir) {
  for (const entry of await fs.readdir(path.join(root, dir), { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (/\.(tsx?|jsx?|mdx?|txt)$/.test(entry.name) && !/\.test\./.test(entry.name)) await check(file);
  }
}
for (const dir of dirs) await walk(dir);
for (const file of extra) await check(file);
const config = await fs.readFile(path.join(root, "lib/site-config.ts"), "utf8");
if (!config.includes(expected)) failures.push("Canonical origin does not match the deployed host");
if (failures.length) { console.error(failures.join("\n")); process.exitCode = 1; }
else console.log("Canonical hostname verified.");
