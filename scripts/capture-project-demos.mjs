#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const outputDir = path.resolve(process.cwd(), "public/projects/demos");

const captureTargets = [
  {
    slug: "rizzk-calculator",
    url: "https://rizzk-calculator-demo-eus2-f1.azurewebsites.net",
  },
  {
    slug: "goblin-assistant",
    url: "https://goblin-assistant.vercel.app",
  },
  {
    slug: "personal-portfolio-site",
    url: "https://heyimfuaad.me",
  },
  {
    slug: "elbey-projects",
    url: "https://marcus-website-iof60vvkq-fuaadabdullahs-projects.vercel.app",
  },
  {
    slug: "gradem8",
    url: "https://huggingface.co/spaces/fuaadabdullah1/gradem8",
  },
  {
    slug: "shopmind-ai",
    url: "https://shopmindai-backend.azurewebsites.net",
  },
];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

async function captureTarget(page, target) {
  for (const viewport of viewports) {
    const outputPath = path.join(outputDir, `${target.slug}-${viewport.name}.png`);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(target.url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: outputPath,
      fullPage: false,
    });
    console.log(`saved ${path.relative(process.cwd(), outputPath)}`);
  }
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const failures = [];

  try {
    for (const target of captureTargets) {
      try {
        console.log(`capturing ${target.slug}...`);
        await captureTarget(page, target);
      } catch (error) {
        failures.push({
          slug: target.slug,
          message: error instanceof Error ? error.message : String(error),
        });
      }
    }
  } finally {
    await browser.close();
  }

  if (failures.length > 0) {
    console.error("capture completed with failures:");
    for (const failure of failures) {
      console.error(`- ${failure.slug}: ${failure.message}`);
    }
    process.exitCode = 1;
  } else {
    console.log("capture completed successfully");
    console.log("note: GIF assets are still managed separately; this command backfills screenshot media.");
  }
}

main().catch((error) => {
  console.error("capture pipeline failed:", error);
  process.exit(1);
});
