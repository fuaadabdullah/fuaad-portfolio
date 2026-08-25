#!/usr/bin/env node
"use strict";
/**
 * Capture GoblinOS panel screenshots for the portfolio proof layer.
 */

const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("/Users/fuaadabdullah/fuaad-portfolio/node_modules/.pnpm/playwright@1.60.0/node_modules/playwright");

const BASE = "https://goblin-assistant.vercel.app";
const OUT = path.resolve(process.cwd(), "public/projects");

const PANELS = [
  {
    name: "goblin-assistant-provider-status",
    paths: ["/providers", "/status", "/?tab=providers", "/?view=providers"],
    label: "provider health panel",
  },
  {
    name: "goblin-assistant-workflow-execution",
    paths: ["/workflows", "/workflow", "/?tab=workflow"],
    label: "workflow execution panel",
  },
  {
    name: "goblin-assistant-cost-tracking",
    paths: ["/metrics", "/costs", "/usage", "/analytics", "/?tab=metrics"],
    label: "cost and usage panel",
  },
];

async function tryCapture(page, panel) {
  // Try dedicated routes first
  for (const route of panel.paths) {
    try {
      const res = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 20000 });
      const currentUrl = page.url();
      if (res && res.status() < 400 && currentUrl !== BASE + "/" && currentUrl !== BASE) {
        await page.waitForTimeout(2000);
        const outPath = path.join(OUT, `${panel.name}.png`);
        await page.screenshot({ path: outPath, fullPage: false });
        console.log(`✓  ${panel.name} → ${route}`);
        return { success: true, route, isFallback: false };
      }
    } catch (_) {
      // try next
    }
  }

  // Fallback: capture main page as-is (better than nothing)
  try {
    const currentUrl = page.url();
    if (currentUrl !== BASE && currentUrl !== BASE + "/") {
      await page.goto(BASE, { waitUntil: "networkidle", timeout: 25000 });
      await page.waitForTimeout(2000);
    }
    const outPath = path.join(OUT, `${panel.name}.png`);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`~  ${panel.name} → main page fallback (no dedicated ${panel.label} route)`);
    return { success: true, route: "/", isFallback: true };
  } catch (err) {
    console.error(`✗  ${panel.name}: ${err.message}`);
    return { success: false };
  }
}

async function main() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log("Loading GoblinOS main page...");
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(2000);
  console.log("Loaded:", page.url(), "\n");

  const results = [];
  for (const panel of PANELS) {
    const result = await tryCapture(page, panel);
    results.push({ name: panel.name, ...result });
  }

  await browser.close();

  const succeeded = results.filter((r) => r.success);
  const real = succeeded.filter((r) => !r.isFallback);
  const fallbacks = succeeded.filter((r) => r.isFallback);

  console.log(`\n${succeeded.length}/${PANELS.length} captured.`);
  if (real.length > 0) {
    console.log("Dedicated route captures:", real.map((r) => r.name).join(", "));
  }
  if (fallbacks.length > 0) {
    console.log(
      `Fallback (main page) captures — skip updating proofMedia to 'ready' for these unless the images show distinct UI: ${fallbacks.map((r) => r.name).join(", ")}`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
