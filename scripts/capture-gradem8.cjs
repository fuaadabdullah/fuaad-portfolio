#!/usr/bin/env node
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("/Users/fuaadabdullah/fuaad-portfolio/node_modules/.pnpm/playwright@1.60.0/node_modules/playwright");

const FRAMES_DIR = path.resolve(process.cwd(), "scripts/demo-frames/gradem8");
const W = 1280, H = 800;

async function shot(page, n, label) {
  const p = path.join(FRAMES_DIR, `frame-${String(n).padStart(3, "0")}.png`);
  await page.screenshot({ path: p, fullPage: false });
  console.log(`  [${n}] ${label}`);
  return n + 1;
}

async function main() {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  let n = 0;

  console.log("GradeM8: loading...");
  try {
    await page.goto("https://huggingface.co/spaces/fuaadabdullah1/gradem8", {
      waitUntil: "domcontentloaded",
      timeout: 40000,
    });
  } catch (e) {
    console.log("  navigation error (continuing):", e.message.slice(0, 80));
  }

  // Wait for Gradio iframe / content to load
  await page.waitForTimeout(6000);
  n = await shot(page, n, "space landing");

  // Try to find Gradio iframe
  const iframeEl = await page.$("iframe#iFrameResizer0, iframe.gradio-app, iframe");
  if (iframeEl) {
    console.log("  found iframe, waiting for content...");
    const frame = await iframeEl.contentFrame();
    if (frame) {
      try { await frame.waitForLoadState("domcontentloaded", { timeout: 15000 }); } catch {}
      await page.waitForTimeout(4000);
    }
  }

  n = await shot(page, n, "after iframe load");

  // Scroll to show the Gradio UI
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(1000);
  n = await shot(page, n, "scrolled");

  await page.evaluate(() => window.scrollTo(0, 450));
  await page.waitForTimeout(1000);
  n = await shot(page, n, "lower scroll");

  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(800);
  n = await shot(page, n, "bottom");

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  n = await shot(page, n, "back top");

  await browser.close();
  console.log(`GradeM8: ${n} frames saved`);
}

main().catch(e => { console.error(e); process.exit(1); });
