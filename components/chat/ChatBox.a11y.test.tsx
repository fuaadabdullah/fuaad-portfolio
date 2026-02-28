import { describe, expect, it } from "vitest";
import { axe } from "jest-axe";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatBox } from "./ChatBox";

describe("ChatBox accessibility", () => {
  it("has no detectable violations when closed", async () => {
    const { container } = render(<ChatBox />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no serious/critical violations when open", async () => {
    const user = userEvent.setup();
    const { container } = render(<ChatBox />);

    await user.click(screen.getByRole("button", { name: "Open chat" }));

    const results = await axe(container);
    const seriousOrCritical = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical"
    );

    expect(seriousOrCritical).toEqual([]);
  });
});
