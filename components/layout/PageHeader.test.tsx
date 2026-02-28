import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PageHeader from "./PageHeader";

describe("PageHeader", () => {
  it("renders title", () => {
    render(<PageHeader title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders eyebrow text when provided", () => {
    render(<PageHeader title="Title" eyebrow="Eyebrow Text" />);
    expect(screen.getByText("Eyebrow Text")).toBeInTheDocument();
  });

  it("does not render eyebrow when not provided", () => {
    const { container } = render(<PageHeader title="Title" />);
    const eyebrow = container.querySelector(".uppercase.tracking-\\[0\\.3em\\]");
    expect(eyebrow).not.toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<PageHeader title="Title" description="Test description" />);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    const { container } = render(<PageHeader title="Title" />);
    const description = container.querySelector(".text-white\\/70");
    expect(description).not.toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    render(
      <PageHeader
        title="Title"
        actions={<button>Action Button</button>}
      />
    );
    expect(screen.getByRole("button", { name: "Action Button" })).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <PageHeader title="Title" className="custom-class" />
    );
    const header = container.querySelector("header");
    expect(header).toHaveClass("custom-class");
  });

  it("applies animation classes when animated is true", () => {
    const { container } = render(
      <PageHeader title="Title" animated={true} />
    );
    const h1 = container.querySelector("h1");
    expect(h1).toHaveClass("animate-fade-in-up", "opacity-0", "delay-100");
  });

  it("does not apply animation classes when animated is false", () => {
    const { container } = render(
      <PageHeader title="Title" animated={false} />
    );
    const h1 = container.querySelector("h1");
    expect(h1).not.toHaveClass("animate-fade-in-up");
    expect(h1).not.toHaveClass("opacity-0");
  });

  it("applies staggered animation delays to elements", () => {
    const { container } = render(
      <PageHeader
        title="Title"
        eyebrow="Eyebrow"
        description="Description"
        actions={<button>Action</button>}
        animated={true}
      />
    );

    const eyebrow = container.querySelector(".animate-fade-in");
    expect(eyebrow).toBeInTheDocument();

    const h1 = container.querySelector("h1");
    expect(h1).toHaveClass("delay-100");

    const description = container.querySelector(".text-white\\/70");
    expect(description).toHaveClass("delay-200");

    const actionsDiv = container.querySelector(".pt-2");
    expect(actionsDiv).toHaveClass("delay-300");
  });

  it("renders as header element", () => {
    const { container } = render(<PageHeader title="Title" />);
    expect(container.querySelector("header")).toBeInTheDocument();
  });

  it("renders title in h1 element", () => {
    render(<PageHeader title="Test Title" />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Test Title");
  });
});
