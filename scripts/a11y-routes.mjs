import axe from "axe-core";
import puppeteer from "puppeteer";

const BASE_URL = process.env.A11Y_BASE_URL || "http://127.0.0.1:3000";
const ROUTES = ["/", "/portfolio", "/services"];
const FAIL_IMPACTS = new Set(["critical", "serious"]);

async function assertServerReachable() {
  const res = await fetch(`${BASE_URL}/`, { method: "GET" });
  if (!res.ok) {
    throw new Error(`Server responded ${res.status} at ${BASE_URL}`);
  }
}

function summarizeViolations(route, violations) {
  const bad = violations.filter((v) => FAIL_IMPACTS.has(v.impact || ""));
  if (bad.length === 0) return [];

  return bad.map((v) => ({
    route,
    id: v.id,
    impact: v.impact,
    nodes: v.nodes.length,
    help: v.help,
  }));
}

async function run() {
  await assertServerReachable();

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const failures = [];

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.addScriptTag({ content: axe.source });

    const results = await page.evaluate(async () => {
      return window.axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
        },
      });
    });

    failures.push(...summarizeViolations(route, results.violations));
    console.log(
      `[a11y] ${route}: ${results.violations.length} violations (${results.incomplete.length} incomplete)`
    );
  }

  await browser.close();

  if (failures.length > 0) {
    console.error("\n[a11y] Serious/Critical violations found:\n");
    for (const failure of failures) {
      console.error(
        `- ${failure.route} :: ${failure.id} (${failure.impact}) [nodes: ${failure.nodes}] ${failure.help}`
      );
    }
    process.exit(1);
  }

  console.log("\n[a11y] Passed: no serious/critical violations on audited routes.");
}

run().catch((error) => {
  console.error("[a11y] Route audit failed:", error.message);
  process.exit(1);
});
