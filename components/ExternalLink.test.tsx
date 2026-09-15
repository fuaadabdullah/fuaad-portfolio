import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import ExternalLink from "./ExternalLink";

expect.extend(toHaveNoViolations);

describe("ExternalLink", () => {
  it("appends 'opens in a new tab' to the accessible name when accessibleName is provided", () => {
    render(
      <ExternalLink href="https://example.com" accessibleName="GitHub">
        GitHub
      </ExternalLink>
    );

    const link = screen.getByRole("link", { name: /GitHub \(opens in a new tab\)/i });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("uses visually-hidden suffix when accessibleName is omitted", () => {
    render(
      <ExternalLink href="https://example.com" className="text-link">
        Visit site
      </ExternalLink>
    );

    // The accessible name algorithm collapses whitespace, so the sr-only suffix
    // appears concatenated with the visible text.
    const link = screen.getByRole("link", { name: /Visit site/i });
    expect(link).toHaveTextContent(/Visit site/);
    expect(link).toHaveTextContent(/opens in a new tab/);
    expect(link).toHaveClass("text-link");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ExternalLink href="https://example.com" accessibleName="GitHub">
        GitHub
      </ExternalLink>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
