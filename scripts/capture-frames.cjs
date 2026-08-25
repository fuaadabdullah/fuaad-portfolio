#!/usr/bin/env node
"use strict";
/**
 * Captures frame sequences for each demo app, saves as numbered PNGs.
 * Python script (make-gifs.py) then stitches them into animated GIFs.
 */

const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("/Users/fuaadabdullah/fuaad-portfolio/node_modules/.pnpm/playwright@1.60.0/node_modules/playwright");

const FRAMES_DIR = path.resolve(process.cwd(), "scripts/demo-frames");
const W = 1280;
const H = 800;

async function shot(page, dir, n, label) {
  const p = path.join(dir, `frame-${String(n).padStart(3, "0")}.png`);
  await page.screenshot({ path: p, fullPage: false });
  console.log(`  [${n}] ${label}`);
  return n + 1;
}

async function wait(page, ms) {
  await page.waitForTimeout(ms);
}

// ─── RIZZK Calculator ────────────────────────────────────────────────────────
async function captureRizzk(browser) {
  const dir = path.join(FRAMES_DIR, "rizzk");
  fs.mkdirSync(dir, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  let n = 0;

  console.log("RIZZK: loading...");
  await page.goto("https://rizzk-calculator-demo-eus2-f1.azurewebsites.net", {
    waitUntil: "networkidle",
    timeout: 45000,
  });
  await wait(page, 2000);
  n = await shot(page, dir, n, "initial load");

  // Try to find and fill inputs — Streamlit inputs
  const inputs = await page.$$("input[type='number'], input.st-ae, input[aria-label]");
  console.log(`  found ${inputs.length} inputs`);

  // Screenshot after a brief pause (Streamlit may re-render)
  await wait(page, 1500);
  n = await shot(page, dir, n, "after settle");

  // Scroll down to see charts/results
  await page.evaluate(() => window.scrollTo(0, 300));
  await wait(page, 1000);
  n = await shot(page, dir, n, "scrolled to results");

  await page.evaluate(() => window.scrollTo(0, 600));
  await wait(page, 1000);
  n = await shot(page, dir, n, "scrolled to chart");

  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(page, 500);

  // Try interacting with number inputs if present
  const numInputs = await page.$$("input[type='number']");
  if (numInputs.length > 0) {
    await numInputs[0].click({ clickCount: 3 });
    await numInputs[0].type("10000");
    await page.keyboard.press("Tab");
    await wait(page, 1500);
    n = await shot(page, dir, n, "after account balance input");
  }

  if (numInputs.length > 1) {
    await numInputs[1].click({ clickCount: 3 });
    await numInputs[1].type("2");
    await page.keyboard.press("Tab");
    await wait(page, 1500);
    n = await shot(page, dir, n, "after risk pct input");
  }

  // Scroll down to see results
  await page.evaluate(() => window.scrollTo(0, 300));
  await wait(page, 800);
  n = await shot(page, dir, n, "results after inputs");

  await page.evaluate(() => window.scrollTo(0, 700));
  await wait(page, 800);
  n = await shot(page, dir, n, "chart after inputs");

  await ctx.close();
  console.log(`RIZZK: ${n} frames saved\n`);
}

// ─── GoblinOS ─────────────────────────────────────────────────────────────────
async function captureGoblin(browser) {
  const dir = path.join(FRAMES_DIR, "goblin");
  fs.mkdirSync(dir, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  let n = 0;
  const BASE = "https://goblin-assistant.vercel.app";

  console.log("GoblinOS: loading main...");
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
  await wait(page, 2000);
  n = await shot(page, dir, n, "main interface");

  // Pause on main a bit longer — show chat UI
  await wait(page, 1000);
  n = await shot(page, dir, n, "main interface 2");

  // Navigate to providers tab
  console.log("  → providers tab");
  await page.goto(BASE + "/?tab=providers", { waitUntil: "networkidle", timeout: 20000 });
  await wait(page, 2000);
  n = await shot(page, dir, n, "provider health panel");
  await wait(page, 800);
  n = await shot(page, dir, n, "provider health panel 2");

  // Navigate to workflow tab
  console.log("  → workflow tab");
  await page.goto(BASE + "/?tab=workflow", { waitUntil: "networkidle", timeout: 20000 });
  await wait(page, 2000);
  n = await shot(page, dir, n, "workflow execution");
  await wait(page, 800);
  n = await shot(page, dir, n, "workflow execution 2");

  // Navigate to metrics tab
  console.log("  → metrics tab");
  await page.goto(BASE + "/?tab=metrics", { waitUntil: "networkidle", timeout: 20000 });
  await wait(page, 2000);
  n = await shot(page, dir, n, "cost metrics");
  await wait(page, 800);
  n = await shot(page, dir, n, "cost metrics 2");

  // Return to main
  console.log("  → back to main");
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 20000 });
  await wait(page, 1500);
  n = await shot(page, dir, n, "main again");

  await ctx.close();
  console.log(`GoblinOS: ${n} frames saved\n`);
}

// ─── GradeM8 ──────────────────────────────────────────────────────────────────
async function captureGradem8(browser) {
  const dir = path.join(FRAMES_DIR, "gradem8");
  fs.mkdirSync(dir, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  let n = 0;

  console.log("GradeM8: loading HuggingFace Space...");
  await page.goto("https://huggingface.co/spaces/fuaadabdullah1/gradem8", {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await wait(page, 4000);
  n = await shot(page, dir, n, "space landing");

  // HF spaces embed in an iframe — try to get inside it
  const iframe = await page.$("iframe");
  if (iframe) {
    const frame = await iframe.contentFrame();
    if (frame) {
      await frame.waitForLoadState("networkidle").catch(() => {});
      await wait(page, 3000);
      n = await shot(page, dir, n, "gradio interface loaded");

      // Scroll inside the page to see tabs/inputs
      await page.evaluate(() => window.scrollTo(0, 200));
      await wait(page, 800);
      n = await shot(page, dir, n, "scrolled to interface");

      await page.evaluate(() => window.scrollTo(0, 500));
      await wait(page, 800);
      n = await shot(page, dir, n, "rubric input area");

      await page.evaluate(() => window.scrollTo(0, 0));
      await wait(page, 500);
      n = await shot(page, dir, n, "back to top");
    }
  } else {
    // No iframe — direct embed, scroll through the page
    await wait(page, 3000);
    n = await shot(page, dir, n, "interface after load");
    await page.evaluate(() => window.scrollTo(0, 300));
    await wait(page, 800);
    n = await shot(page, dir, n, "scrolled");
    await page.evaluate(() => window.scrollTo(0, 600));
    await wait(page, 800);
    n = await shot(page, dir, n, "scrolled lower");
    await page.evaluate(() => window.scrollTo(0, 0));
    await wait(page, 500);
    n = await shot(page, dir, n, "back to top");
  }

  await ctx.close();
  console.log(`GradeM8: ${n} frames saved\n`);
}

async function main() {
  const target = process.argv[2] || "all";
  fs.mkdirSync(FRAMES_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    if (target === "all" || target === "rizzk") await captureRizzk(browser);
    if (target === "all" || target === "goblin") await captureGoblin(browser);
    if (target === "all" || target === "gradem8") await captureGradem8(browser);
  } finally {
    await browser.close();
  }

  console.log("Frame capture complete. Run: python3 scripts/make-gifs.py");
}

main().catch((e) => { console.error(e); process.exit(1); });
