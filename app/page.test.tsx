import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import HomePage from "./page";
import projects from "@/data/projects";
import { bookingLink } from "@/data/contact";

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

describe("HomePage", () => {
  it("renders a simplified hero with portfolio-first CTA and supporting proof", async () => {
    const rizzkProject = projects.find((project) => project.slug === "rizzk-calculator");

    render(await HomePage());

    expect(rizzkProject).toBeDefined();
    expect(screen.getByRole("heading", { name: /finance student shipping real trading tools/i })).toBeInTheDocument();
    expect(screen.getByText(/fintech, automation, and ai products built end to end/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: rizzkProject!.title })
    ).toBeInTheDocument();
    expect(screen.getByText(rizzkProject!.tagline)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(rizzkProject!.results[0].label, "i"))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see the work/i })).toHaveAttribute("href", "/portfolio");
    expect(screen.getByRole("link", { name: /view résumé/i })).toHaveAttribute("href", "/resume");
    expect(screen.getByRole("link", { name: /start a project/i })).toHaveAttribute("href", bookingLink);
    expect(screen.getByText(/Fuaad built our site in a week, clean and fast\./i)).toBeInTheDocument();
    expect(screen.getByText(/Featured build: /i)).toBeInTheDocument();
  });
});
