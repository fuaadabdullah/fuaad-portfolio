import { expect, test } from "@playwright/test";

const routesToCheck = ["/", "/portfolio", "/resume", "/contact", "/cv", "/about", "/services", "/blog", "/blog/building-rizzk", "/portfolio/rizzk-calculator", "/portfolio/goblin-assistant"];

test.describe("Core route smoke", () => {
  for (const route of routesToCheck) {
    test(`loads ${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    });
  }
});
