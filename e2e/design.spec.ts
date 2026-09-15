import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/portfolio",
  "/resume",
  "/cv",
  "/contact",
  "/about",
  "/services",
  "/blog",
  "/blog/building-rizzk",
  "/portfolio/rizzk-calculator",
  "/portfolio/goblin-assistant",
];

for (const width of [375, 768, 1440]) {
  test(`public pages fit a ${width}px viewport`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        route,
      ).toBe(true);
      const brokenImages = await page
        .locator("main img")
        .evaluateAll(
          (images) =>
            images.filter(
              (image) =>
                (image as HTMLImageElement).complete &&
                !(image as HTMLImageElement).naturalWidth,
            ).length,
        );
      expect(brokenImages, route).toBe(0);
    }
  });
}

test("mobile menu traps focus, restores it, and follows a project link", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Navigation menu" });
  const close = dialog.getByRole("button", { name: "Close menu" });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("link", { name: "LinkedIn" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.locator("main")).not.toHaveAttribute("inert");
  await trigger.click();
  await dialog.getByRole("link", { name: "Portfolio", exact: true }).click();
  await expect(page).toHaveURL(/\/portfolio$/);
  await expect(dialog).not.toBeVisible();
});

test("contact errors preserve the message and allow retry", async ({
  page,
}) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: "Please try again." }),
    }),
  );
  await page.goto("/contact");
  await page.getByLabel(/^Name/).fill("Alex Hiring");
  await page.getByLabel(/^Email/).fill("alex@example.com");
  await page
    .getByLabel(/^Message/)
    .fill("I'd like to discuss an engineering role with our team.");
  await page.getByRole("button", { name: /send message/i }).click();
  await expect(
    page.getByText("Please try again.", { exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel(/^Message/)).toHaveValue(
    "I'd like to discuss an engineering role with our team.",
  );
  await expect(
    page.getByRole("button", { name: /send message/i }),
  ).toBeEnabled();
});

test("chat opens on mobile and recovers from a failed request", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.route("**/api/chat", (route) =>
    route.fulfill({ status: 500, body: "Unavailable" }),
  );
  await page.goto("/");
  await page.getByRole("button", { name: "Open chat" }).click();
  const dialog = page.getByRole("dialog", { name: "Ask Me Anything" });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Chat input" })).toBeFocused();
  await page
    .getByRole("textbox", { name: "Chat input" })
    .fill("Tell me about your projects");
  await dialog.getByRole("button", { name: "Send message" }).click();
  await expect(
    dialog.getByRole("button", { name: "Send message" }),
  ).toBeEnabled({ timeout: 15000 });
  await expect(dialog.getByRole("log")).toContainText(
    /sorry|error|trouble|try again|unable/i,
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    375,
  );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Open chat" })).toBeFocused();
});

test("chat answers through the real API route", async ({ page }) => {
  // Unmocked: the origin check once rejected same-origin requests on 127.0.0.1 with 403
  await page.goto("/");
  await page.getByRole("button", { name: "Open chat" }).click();
  const dialog = page.getByRole("dialog", { name: "Ask Me Anything" });
  const reply = page.waitForResponse((response) =>
    response.url().endsWith("/api/chat"),
  );
  await dialog.getByRole("button", { name: "View projects" }).click();
  expect((await reply).status()).toBe(200);
  await expect(dialog.getByRole("log")).toContainText("RIZZK Calculator");
  await expect(
    dialog.getByRole("link", { name: "projects page" }),
  ).toHaveAttribute("href", "/portfolio");
});

test("reduced motion keeps the hero visible and disables entrance animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(
    await page
      .locator(".entrance")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    await page
      .locator(".signal-trace")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await expect(page.locator(".reveal-ready")).toHaveCount(0);
});

test("motion draws the hero trace and reveals sections as they enter view", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  expect(
    await page
      .locator(".signal-trace")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("trace-draw");
  const section = page.locator('section[aria-labelledby="approach-heading"]');
  await expect(section).toHaveClass(/reveal-ready/);
  await section.scrollIntoViewIfNeeded();
  await expect(section).toHaveClass(/is-revealed/);
  await expect(section).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".reveal-ready")).toHaveCount(0);
});
