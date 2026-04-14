#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import http from "node:http";
import https from "node:https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = path.join(__dirname, "../public/Fuaad_Abdullah_CV.pdf");
const HOST = process.env.CV_HOST || "127.0.0.1";
const PORT = Number(process.env.CV_PORT || "3013");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      ...options,
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} ${args.join(" ")} failed with exit code ${code}`));
    });
  });
}

function isUrlReachable(url) {
  return new Promise((resolve) => {
    const client = url.startsWith("https://") ? https : http;
    const request = client.get(url, (response) => {
      response.resume();
      resolve(Boolean(response.statusCode && response.statusCode >= 200 && response.statusCode < 500));
    });
    request.on("error", () => resolve(false));
    request.setTimeout(2500, () => {
      request.destroy();
      resolve(false);
    });
  });
}

async function waitForUrl(url, timeoutMs = 120000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (await isUrlReachable(url)) {
      return;
    }
    await sleep(1000);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function startDevServer() {
  console.log(`Starting Next.js dev server on http://${HOST}:${PORT} ...`);
  return spawn("pnpm", ["exec", "next", "dev", "--hostname", HOST, "--port", String(PORT)], {
    cwd: path.join(__dirname, ".."),
    stdio: "inherit",
    env: { ...process.env, TMPDIR: process.env.TMPDIR || "/tmp" },
  });
}

async function generatePdfFromCvRoute() {
  let devServer = null;

  try {
    const configuredCvUrl = process.env.CV_URL;
    let cvUrl = configuredCvUrl;
    if (!cvUrl) {
      devServer = startDevServer();
      cvUrl = `http://${HOST}:${PORT}/cv`;
    }

    console.log(`Waiting for CV page at ${cvUrl} ...`);
    await waitForUrl(cvUrl);

    console.log("Rendering PDF with Playwright CLI ...");
    await runCommand(
      "npx",
      [
        "--yes",
        "playwright@1.52.0",
        "pdf",
        "--browser=chromium",
        "--paper-format=Letter",
        "--wait-for-timeout=2000",
        cvUrl,
        PDF_PATH,
      ],
      { env: { ...process.env, TMPDIR: process.env.TMPDIR || "/tmp" } }
    );

    console.log(`PDF generated successfully at: ${PDF_PATH}`);
  } finally {
    if (devServer) {
      devServer.kill("SIGTERM");
    }
  }
}

generatePdfFromCvRoute().catch((error) => {
  console.error("Error generating PDF:", error?.message || error);
  process.exit(1);
});
