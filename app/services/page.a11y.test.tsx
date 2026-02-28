import { describe, expect, it } from "vitest";
import { axe } from "jest-axe";
import { render } from "@testing-library/react";
import ServicesPage from "./page";

describe("ServicesPage accessibility", () => {
  it("has no serious or critical a11y violations", async () => {
    const { container } = render(<ServicesPage />);
    const results = await axe(container);
    const seriousOrCritical = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical"
    );

    expect(seriousOrCritical).toEqual([]);
  });
});
