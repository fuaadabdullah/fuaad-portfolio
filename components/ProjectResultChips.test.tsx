import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectResultChips from "./ProjectResultChips";

const baseResults = [
  {
    label: "Lighthouse performance",
    value: "89/100",
    sourceLabel: "audit of Aug 25 2026",
    proof: { href: "/proofs/lighthouse-home-mobile-2026-08-25.json", label: "audit JSON" },
  },
];

describe("ProjectResultChips", () => {
  it("renders a proof link when a metric provides one", () => {
    render(<ProjectResultChips results={baseResults} />);
    const link = screen.getByRole("link", { name: "audit JSON" });
    expect(link).toHaveAttribute("href", "/proofs/lighthouse-home-mobile-2026-08-25.json");
    expect(link).not.toHaveAttribute("target");
  });

  it("renders no proof link when none is provided", () => {
    render(
      <ProjectResultChips
        results={[{ label: "build timeline", value: "2 weeks", sourceLabel: "delivery scope" }]}
      />
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("opens external proof links in a new tab", () => {
    render(
      <ProjectResultChips
        results={[
          {
            label: "uptime",
            value: "99%",
            sourceLabel: "status page",
            proof: { href: "https://example.com/status", label: "status" },
          },
        ]}
      />
    );
    expect(screen.getByRole("link", { name: "status" })).toHaveAttribute("target", "_blank");
  });
});
