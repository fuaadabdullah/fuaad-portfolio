import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { axe, toHaveNoViolations } from "jest-axe";
import HomePage from "./page";
import projects from "@/data/projects";
import { bookingLink } from "@/data/contact";

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

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => <img src={src} alt={alt} {...props} />,
}));

describe("HomePage", () => {
  it("renders a simplified hero with portfolio-first CTA and supporting proof", async () => {
    const rizzkProject = projects.find((project) => project.slug === "rizzk-calculator");

    render(await HomePage());

    expect(rizzkProject).toBeDefined();
    expect(screen.getByRole("heading", { name: /i build software for markets, automation, and ai/i })).toBeInTheDocument();
    expect(screen.getByText(/fintech and ai products built end to end/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: rizzkProject!.title })
    ).toBeInTheDocument();
    expect(screen.getByText(rizzkProject!.tagline)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(rizzkProject!.results[0].label, "i"))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see the work/i })).toHaveAttribute("href", "/portfolio");
    expect(screen.getByRole("link", { name: /view résumé/i })).toHaveAttribute("href", "/resume");
    expect(screen.getByRole("link", { name: /start a project/i })).toHaveAttribute("href", bookingLink);
    expect(screen.getByText(/Fuaad built our site in a week, clean and fast\./i)).toBeInTheDocument();
    expect(screen.getByText(/Featured build/i)).toBeInTheDocument();
  });

  it("renders exactly one h1", async () => {
    render(await HomePage());

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(await HomePage());
    const results = await axe(container, {
      rules: {
        // jsdom doesn't compute color-contrast reliably; covered by manual review
        "color-contrast": { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
