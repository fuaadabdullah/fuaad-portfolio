import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import Navbar from "./Navbar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar accessibility", () => {
  it("has no detectable a11y violations in default state", async () => {
    const { container } = render(<Navbar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no serious violations when mobile menu is open", async () => {
    const user = userEvent.setup();
    const { container } = render(<Navbar />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const results = await axe(container);
    const seriousOrCritical = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical"
    );

    expect(seriousOrCritical).toEqual([]);
  });
});
