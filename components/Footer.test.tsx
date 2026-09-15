import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { axe, toHaveNoViolations } from "jest-axe";
import Footer from "./Footer";

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

describe("Footer", () => {
  it("exposes a contentinfo landmark with an accessible name", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo", { name: /site footer/i });
    expect(footer).toBeInTheDocument();
  });

  it("marks the Explore and Elsewhere groups as navigations with accessible names", () => {
    render(<Footer />);

    expect(screen.getByRole("navigation", { name: /footer navigation/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /social links/i })).toBeInTheDocument();
  });

  it("announces external social links as opening in a new tab", () => {
    render(<Footer />);

    expect(
      screen.getByRole("link", { name: /GitHub \(opens in a new tab\)/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /LinkedIn \(opens in a new tab\)/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Instagram \(opens in a new tab\)/i })
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Footer />);
    const results = await axe(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
