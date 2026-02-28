import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  it("renders children content", () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("renders as article element", () => {
    const { container } = render(<Card>Content</Card>);
    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
  });

  it("applies default variant styles", () => {
    const { container } = render(<Card>Default</Card>);
    const article = container.querySelector("article");
    expect(article).toHaveClass("p-6");
  });

  it("applies compact variant styles", () => {
    const { container } = render(<Card variant="compact">Compact</Card>);
    const article = container.querySelector("article");
    expect(article).toHaveClass("p-3", "text-sm");
  });

  it("applies featured variant styles", () => {
    const { container } = render(<Card variant="featured">Featured</Card>);
    const article = container.querySelector("article");
    expect(article).toHaveClass("shadow-2xl", "border-white/20", "bg-white/5");
  });

  it("applies hoverable styles when enabled", () => {
    const { container } = render(<Card hoverable>Hoverable</Card>);
    const article = container.querySelector("article");
    expect(article?.className).toMatch(/hover:bg-white/);
  });

  it("applies custom className", () => {
    const { container } = render(<Card className="custom-class">Custom</Card>);
    const article = container.querySelector("article");
    expect(article).toHaveClass("custom-class");
  });

  it("supports custom semantic elements via as prop", () => {
    const { container } = render(
      <Card as="section" aria-label="Card section">
        Content
      </Card>
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("aria-label", "Card section");
  });

  it("renders gradient overlay when gradient is enabled", () => {
    const { container } = render(<Card gradient>Gradient</Card>);
    const gradientOverlay = container.querySelector(".bg-gradient-to-br");
    expect(gradientOverlay).toBeInTheDocument();
  });

  it("does not render gradient overlay when gradient is disabled", () => {
    const { container } = render(<Card>No Gradient</Card>);
    const gradientOverlay = container.querySelector(".bg-gradient-to-br");
    expect(gradientOverlay).not.toBeInTheDocument();
  });
});
