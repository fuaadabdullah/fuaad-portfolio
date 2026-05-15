import { expect, test } from "@playwright/test";

test("resume page exposes downloadable resume and CV PDFs", async ({ page, request }) => {
  await page.goto("/resume");

  const resumeLink = page.getByRole("link", { name: "Resume (1 page)" }).first();
  const cvLink = page.getByRole("link", { name: "CV (full)" }).first();

  await expect(resumeLink).toHaveAttribute("href", "/Fuaad_Abdullah_Resume.pdf");
  await expect(cvLink).toHaveAttribute("href", "/Fuaad_Abdullah_CV.pdf");

  const resumeResponse = await request.get("/Fuaad_Abdullah_Resume.pdf");
  const cvResponse = await request.get("/Fuaad_Abdullah_CV.pdf");

  expect(resumeResponse.ok()).toBeTruthy();
  expect(cvResponse.ok()).toBeTruthy();
  expect(resumeResponse.headers()["content-type"]).toContain("application/pdf");
  expect(cvResponse.headers()["content-type"]).toContain("application/pdf");
});
