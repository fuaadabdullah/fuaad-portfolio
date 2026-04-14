import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import ProjectPage from "./page";

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

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("notFound called");
  }),
}));

describe("Project detail route", () => {
  it("renders results and demo walkthrough sections", async () => {
    const page = await ProjectPage({
      params: Promise.resolve({ slug: "rizzk-calculator" }),
    });

    render(page);

    expect(
      screen.getByRole("heading", { name: /Results at a glance/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Demo walkthrough/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Tech stack/i })).toBeInTheDocument();
  });

  it("renders architecture highlights for GoblinOS", async () => {
    const page = await ProjectPage({
      params: Promise.resolve({ slug: "goblin-assistant" }),
    });

    render(page);
    expect(
      screen.getByRole("heading", { name: /Architecture highlights/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/FastAPI backend with typed request\/response contracts/i)).toBeInTheDocument();
  });
});
