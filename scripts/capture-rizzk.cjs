#!/usr/bin/env node
"use strict";
/**
 * Captures RIZZK Calculator demo frames with real Streamlit input interaction.
 * Streamlit number inputs use: input[data-testid='stNumberInput-Input']
 * or simply: .stNumberInput input
 */
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("/Users/fuaadabdullah/fuaad-portfolio/node_modules/.pnpm/playwright@1.60.0/node_modules/playwright");

const FRAMES_DIR = path.resolve(process.cwd(), "scripts/demo-frames/rizzk");
const W = 1280, H = 800;
const URL = "https://rizzk-calculator-demo-eus2-f1.azurewebsites.net";

async function shot(page, n, label) {
  const p = path.join(FRAMES_DIR, `frame-${String(n).padStart(3, "0")}.png`);
  await page.screenshot({ path: p, fullPage: false });
  console.log(`  [${n}] ${label}`);
  return n + 1;
}

async function fillInput(page, selector, value) {
  const el = await page.$(selector);
  if (!el) return false;
  await el.click({ clickCount: 3 });
  await el.fill(String(value));
  await page.keyboard.press("Enter");
  await page.waitForTimeout(1200); // Streamlit re-renders
  return true;
}

async function main() {
  // Wipe old frames
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  fs.mkdirSync(FRAMES_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  let n = 0;

  console.log("RIZZK: loading...");
  await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(3000); // Streamlit hydration
  n = await shot(page, n, "initial load — default state");

  // Discover all input selectors
  const selectors = [
    "input[data-testid='stNumberInput-Input']",
    ".stNumberInput input",
    "input[aria-label]",
    "input[type='number']",
    "input[class*='st-']",
  ];

  let inputs = [];
  for (const sel of selectors) {
    inputs = await page.$$(sel);
    if (inputs.length > 0) {
      console.log(`  found ${inputs.length} inputs via: ${sel}`);
      break;
    }
  }

  if (inputs.length === 0) {
    // Log all inputs on page for debugging
    const allInputs = await page.$$("input");
    console.log(`  fallback: found ${allInputs.length} raw inputs`);
    const info = await page.evaluate(() =>
      Array.from(document.querySelectorAll("input")).map(i => ({
        type: i.type,
        class: i.className.slice(0, 60),
        'aria-label': i.getAttribute('aria-label'),
        'data-testid': i.getAttribute('data-testid'),
      }))
    );
    console.log("  inputs:", JSON.stringify(info, null, 2).slice(0, 600));
    inputs = await page.$$("input");
  }

  // Scroll to show whatever loaded
  await page.evaluate(() => window.scrollTo(0, 250));
  await page.waitForTimeout(800);
  n = await shot(page, n, "scrolled to calculator");

  await page.evaluate(() => window.scrollTo(0, 550));
  await page.waitForTimeout(800);
  n = await shot(page, n, "scrolled to chart area");

  // Return to top and try filling inputs
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  if (inputs.length > 0) {
    // Fill account balance
    const filled0 = await fillInput(page, null, "10000").catch(() => false);
    // Try directly on the input element
    try {
      await inputs[0].click({ clickCount: 3 });
      await inputs[0].fill("10000");
      await page.keyboard.press("Enter");
      await page.waitForTimeout(1500);
      n = await shot(page, n, "account balance = $10,000");
    } catch (e) { console.log("  input[0] fill failed:", e.message.slice(0, 60)); }

    if (inputs.length > 1) {
      try {
        await inputs[1].click({ clickCount: 3 });
        await inputs[1].fill("2");
        await page.keyboard.press("Enter");
        await page.waitForTimeout(1500);
        n = await shot(page, n, "risk % = 2%");
      } catch (e) { console.log("  input[1] fill failed:", e.message.slice(0, 60)); }
    }

    if (inputs.length > 2) {
      try {
        await inputs[2].click({ clickCount: 3 });
        await inputs[2].fill("50");
        await page.keyboard.press("Enter");
        await page.waitForTimeout(1500);
        n = await shot(page, n, "stop loss = 50");
      } catch (e) { console.log("  input[2] fill failed:", e.message.slice(0, 60)); }
    }

    // Scroll to results/chart
    await page.evaluate(() => window.scrollTo(0, 350));
    await page.waitForTimeout(1000);
    n = await shot(page, n, "results panel after inputs");

    await page.evaluate(() => window.scrollTo(0, 700));
    await page.waitForTimeout(1000);
    n = await shot(page, n, "chart after inputs");

    // Try a different risk value to show interactivity
    await page.evaluate(() => window.scrollTo(0, 0));
    if (inputs.length > 1) {
      try {
        await inputs[1].click({ clickCount: 3 });
        await inputs[1].fill("5");
        await page.keyboard.press("Enter");
        await page.waitForTimeout(1500);
      } catch {}
    }
    await page.evaluate(() => window.scrollTo(0, 350));
    await page.waitForTimeout(1000);
    n = await shot(page, n, "results with 5% risk");

    await page.evaluate(() => window.scrollTo(0, 700));
    await page.waitForTimeout(800);
    n = await shot(page, n, "chart with 5% risk");
  } else {
    // No inputs found — just do thorough scroll tour
    const scrollStops = [0, 150, 300, 500, 700, 900, 0];
    for (const y of scrollStops) {
      await page.evaluate((sy) => window.scrollTo(0, sy), y);
      await page.waitForTimeout(900);
      n = await shot(page, n, `scroll y=${y}`);
    }
  }

  await browser.close();
  console.log(`RIZZK: ${n} frames saved`);
}

main().catch(e => { console.error(e); process.exit(1); });
