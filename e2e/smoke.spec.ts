import { expect, test } from "@playwright/test";

const routesToCheck = ["/", "/portfolio", "/resume", "/contact", "/cv"];

test.describe("Core route smoke", () => {
  for (const route of routesToCheck) {
    test(`loads ${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("main")).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    });
  }
});
