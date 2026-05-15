import { expect, test } from "@playwright/test";

test("contact form submits and shows success state", async ({ page }) => {
  await page.route("**/api/contact*", async (route) => {
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Your message has been received. Thank you for reaching out!",
        id: "test-id-1",
      }),
    });
  });

  await page.goto("/contact");

  await page.getByLabel("Name").fill("Playwright Tester");
  await page.getByLabel("Email").fill("playwright@example.com");
  await page.getByLabel("Message").fill("Please share next steps for a discovery call.");

  await expect(page.getByLabel("Name")).toHaveValue("Playwright Tester");
  await expect(page.getByLabel("Email")).toHaveValue("playwright@example.com");

  const contactResponsePromise = page.waitForResponse((response) => {
    return response.url().includes("/api/contact") && response.request().method() === "POST";
  });

  await page.getByRole("button", { name: "Send Message" }).click();

  const contactResponse = await contactResponsePromise;
  expect(contactResponse.status()).toBe(201);

  await expect(page.getByText("Thanks, I'll be in touch!")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send Message" })).toBeEnabled();
});
