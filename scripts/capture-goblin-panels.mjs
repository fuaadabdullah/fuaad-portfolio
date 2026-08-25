#!/usr/bin/env node
/**
 * Capture GoblinOS panel screenshots for the portfolio proof layer.
 * Tries multiple plausible routes; saves whatever renders successfully.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const BASE = "https://goblin-assistant.vercel.app";
const OUT = path.resolve(process.cwd(), "public/projects");

const PANELS = [
  {
    name: "goblin-assistant-provider-status",
    paths: ["/providers", "/status", "/settings", "/?tab=providers", "/?view=providers"],
    fallbackScroll: 600,
  },
  {
    name: "goblin-assistant-workflow-execution",
    paths: ["/workflows", "/workflow", "/chat", "/?tab=workflow", "/?view=workflow"],
    fallbackScroll: 0,
  },
  {
    name: "goblin-assistant-cost-tracking",
    paths: ["/metrics", "/costs", "/usage", "/analytics", "/?tab=metrics", "/?view=costs"],
    fallbackScroll: 1200,
  },
];

async function tryCapture(page, panel) {
  for (const route of panel.paths) {
    try {
      const res = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 20000 });
      if (res && res.status() < 400) {
        await page.waitForTimeout(2000);
        const outPath = path.join(OUT, `${panel.name}.png`);
        await page.screenshot({ path: outPath, fullPage: false });
        console.log(`✓  ${panel.name} captured from ${route}`);
        return { success: true, route };
      }
    } catch {
      // try next route
    }
  }

  // Fallback: screenshot main page scrolled to reveal different content
  try {
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 25000 });
    await page.waitForTimeout(2000);
    if (panel.fallbackScroll > 0) {
      await page.evaluate((y) => window.scrollTo(0, y), panel.fallbackScroll);
      await page.waitForTimeout(800);
    }
    const outPath = path.join(OUT, `${panel.name}.png`);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`~  ${panel.name} captured from main page (fallback scroll=${panel.fallbackScroll})`);
    return { success: true, route: "/ (fallback)" };
  } catch (err) {
    console.error(`✗  ${panel.name} failed: ${err.message}`);
    return { success: false };
  }
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const results = [];
  for (const panel of PANELS) {
    const result = await tryCapture(page, panel);
    results.push({ name: panel.name, ...result });
  }

  await browser.close();

  const succeeded = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`\nDone. ${succeeded.length}/${PANELS.length} panels captured.`);
  if (failed.length > 0) {
    console.log("Failed:", failed.map((f) => f.name).join(", "));
  }
  if (succeeded.length > 0) {
    console.log("\nNext: update proofMedia status to 'ready' in data/projects.ts for:");
    for (const s of succeeded) {
      console.log(`  ${s.name}.png  (from ${s.route})`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
