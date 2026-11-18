import { expect, test } from "@playwright/test";
const origin = "https://fuaadabdullah.vercel.app";
const legacy = "heyimfuaad" + ".me";
test("canonical and social URL point to current portfolio", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", origin + "/");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", origin + "/");
  expect(await page.content()).not.toContain(legacy);
});
test("sitemap and robots refer only to the canonical hostname", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  expect(xml).toContain(origin + "/");
  expect(xml).not.toContain(legacy);
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain(origin + "/sitemap.xml");
});
