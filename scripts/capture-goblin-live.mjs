#!/usr/bin/env node
/**
 * Capture real GoblinOS production pages for the portfolio case study.
 * Only captures routes that actually exist on the live app.
 */

import path from "node:path";
import { chromium } from "@playwright/test";

const BASE = "https://goblin-assistant.vercel.app";
const OUT = path.resolve(process.cwd(), "public/projects");

const TARGETS = [
  {
    name: "goblin-live-control-panel",
    route: "/",
    scrollTo: 0,
    waitFor: "text=Control panel",
    clip: null,
  },
  {
    name: "goblin-live-chat",
    route: "/chat",
    scrollTo: 0,
    waitFor: null,
    clip: null,
  },
  {
    name: "goblin-live-agent",
    route: "/agent",
    scrollTo: 0,
    waitFor: null,
    clip: null,
  },
];

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  for (const target of TARGETS) {
    try {
      const res = await page.goto(BASE + target.route, {
        waitUntil: "networkidle",
        timeout: 25000,
      });
      if (!res || res.status() >= 400) {
        console.log(`skip ${target.name}: status ${res ? res.status() : "?"}`);
        continue;
      }
      await page.waitForTimeout(3000);
      if (target.waitFor) {
        await page.waitForSelector(target.waitFor, { timeout: 8000 }).catch(() => {});
      }
      if (target.scrollTo > 0) {
        await page.evaluate((y) => window.scrollTo(0, y), target.scrollTo);
        await page.waitForTimeout(800);
      }
      const outPath = path.join(OUT, `${target.name}.png`);
      const options = { path: outPath, fullPage: false };
      if (target.clip) options.clip = target.clip;
      await page.screenshot(options);
      console.log(`captured ${target.name} from ${target.route}`);
    } catch (err) {
      console.log(`failed ${target.name}: ${err.message.split("\n")[0]}`);
    }
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
