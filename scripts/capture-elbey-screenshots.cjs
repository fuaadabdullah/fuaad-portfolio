#!/usr/bin/env node

/* eslint-disable no-console */
const puppeteer = require("puppeteer");
const fs = require("fs");
const os = require("os");
const path = require("path");

const BASE_URL =
  process.env.ELBEY_BASE_URL ||
  "https://marcus-website-iof60vvkq-fuaadabdullahs-projects.vercel.app";

const OUT_DIR = path.join(__dirname, "../public/projects");

const PAGES = [
  { path: "/", out: "elbey-projects-home.png" },
  { path: "/services", out: "elbey-projects-services.png" },
  { path: "/gallery", out: "elbey-projects-gallery.png" },
  { path: "/faq", out: "elbey-projects-faq.png" },
];

async function main() {
  const executablePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

  // Chrome can be finicky about profiles on external volumes; keep the profile on /tmp.
  const profileRoot = process.env.PUPPETEER_PROFILE_ROOT || "/tmp";
  const userDataDir = fs.mkdtempSync(
    path.join(profileRoot, "elbey-puppeteer-profile-")
  );

  console.log("Launching browser for screenshots…");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    userDataDir,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 850 });

    for (const entry of PAGES) {
      const url = new URL(entry.path, BASE_URL).toString();
      const outPath = path.join(OUT_DIR, entry.out);

      console.log(`Capturing ${url} -> ${outPath}`);
      await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

      // Remove any tel: link CTAs so we don't capture placeholder phone numbers.
      await page.addStyleTag({
        content: 'a[href^="tel:"]{display:none !important;}',
      });

      // Give animations/layout a moment to settle.
      await new Promise((r) => setTimeout(r, 800));

      await page.screenshot({ path: outPath, fullPage: false });
    }
  } finally {
    await browser.close();
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
