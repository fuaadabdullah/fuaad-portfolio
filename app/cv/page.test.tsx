import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { axe, toHaveNoViolations } from "jest-axe";
import CvPage from "./page";

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

describe("CvPage", () => {
  it("renders a single h1 with the candidate name", () => {
    render(<CvPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("announces external links as opening in a new tab", () => {
    render(<CvPage />);

    expect(
      screen.getByRole("link", { name: /Download CV PDF \(opens in a new tab\)/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /GitHub profile \(opens in a new tab\)/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /LinkedIn profile \(opens in a new tab\)/i })
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CvPage />);
    const results = await axe(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
