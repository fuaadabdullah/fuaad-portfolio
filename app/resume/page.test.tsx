import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { axe, toHaveNoViolations } from "jest-axe";
import ResumePage from "./page";

expect.extend(toHaveNoViolations);

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// The badge injects a third-party script; it is unrelated to this page's
// landmark/heading structure and is covered by its own component tests.
vi.mock("@/components/LinkedInBadge", () => ({
  default: () => <div data-testid="linkedin-badge" />,
}));

describe("ResumePage", () => {
  it("renders a single h1 with the resume heading id used by aria-labelledby", async () => {
    render(await ResumePage());

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(document.getElementById("resume-heading")).toBe(
      screen.getByRole("heading", { level: 1 })
    );
  });

  it("announces the primary external links as opening in a new tab", async () => {
    render(await ResumePage());

    expect(
      screen.getByRole("link", {
        name: /Resume \(1 page\) PDF \(opens in a new tab\)/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /CV \(full\) PDF \(opens in a new tab\)/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /View LinkedIn profile \(opens in a new tab\)/i,
      })
    ).toBeInTheDocument();
  });

  it("keeps each visible link label inside its accessible name (WCAG 2.5.3)", async () => {
    const { container } = render(await ResumePage());

    const externalLinks = Array.from(
      container.querySelectorAll('a[target="_blank"]')
    );
    expect(externalLinks.length).toBeGreaterThan(0);

    for (const link of externalLinks) {
      // Strip the new-tab hint the link itself appends, then require the
      // remaining visible label to be part of the computed accessible name.
      const visible = (link.textContent ?? "")
        .replace(/\(opens in a new tab\)/gi, "")
        .trim();
      if (visible.length === 0) continue;
      expect(link).toHaveAccessibleName(
        new RegExp(visible.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
      );
    }
  });

  it("warns screen-reader users on every link that opens a new tab", async () => {
    const { container } = render(await ResumePage());

    const externalLinks = Array.from(
      container.querySelectorAll('a[target="_blank"]')
    );
    expect(externalLinks.length).toBeGreaterThan(0);

    for (const link of externalLinks) {
      const announced = link.getAttribute("aria-label") ?? link.textContent ?? "";
      expect(announced).toMatch(/opens in a new tab/i);
    }
  });

  it("has no accessibility violations", async () => {
    const { container } = render(await ResumePage());
    const results = await axe(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});