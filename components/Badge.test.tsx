import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
  it("renders children content", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies default variant styles", () => {
    const { container } = render(<Badge>Default</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass("bg-white/10", "text-white");
  });

  it("applies success variant styles", () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toMatch(/bg-\[color:var\(--color-accent\)\]\/20/);
  });

  it("applies outline variant styles", () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass("border", "border-white/20", "text-white");
  });

  it("applies custom className", () => {
    const { container } = render(<Badge className="custom-class">Custom</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass("custom-class");
  });

  it("supports role attribute for accessibility", () => {
    render(<Badge role="listitem">List Item</Badge>);
    const badge = screen.getByRole("listitem");
    expect(badge).toBeInTheDocument();
  });

  it("supports title attribute", () => {
    render(<Badge title="Badge tooltip">Hover me</Badge>);
    const badge = screen.getByTitle("Badge tooltip");
    expect(badge).toBeInTheDocument();
  });

  it("renders as a span element", () => {
    const { container } = render(<Badge>Span Test</Badge>);
    expect(container.firstChild?.nodeName).toBe("SPAN");
  });
});
