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
  it("renders booking-first CTA, testimonial proof, and secondary actions", () => {
    const rizzkProject = projects.find((project) => project.slug === "rizzk-calculator");

    render(<HomePage />);

    expect(rizzkProject).toBeDefined();
    expect(
      screen.getByRole("heading", { name: rizzkProject!.title })
    ).toBeInTheDocument();
    expect(screen.getByText(rizzkProject!.tagline)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(rizzkProject!.results[0].label, "i"))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start a project/i })).toHaveAttribute("href", bookingLink);
    expect(screen.getByRole("link", { name: /see portfolio/i })).toHaveAttribute("href", "/portfolio");
    expect(screen.getByRole("link", { name: /get a quote/i })).toHaveAttribute("href", "/contact");
    expect(screen.getByText(/Fuaad built our site in a week, clean and fast\./i)).toBeInTheDocument();
    expect(screen.getByText(/Explore GoblinOS case study/i)).toBeInTheDocument();
  });
});
