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
      screen.getByRole("heading", { name: /System architecture/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/three deployment layers: a Cloudflare edge/i)
    ).toBeInTheDocument();
  });

  it("renders the flagship systems sections for GoblinOS", async () => {
    const page = await ProjectPage({
      params: Promise.resolve({ slug: "goblin-assistant" }),
    });

    render(page);

    expect(
      screen.getByRole("heading", { name: /Production observability/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /System architecture/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Provider routing: the failover path/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Incident postmortem/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /What changes at 10× scale/i })
    ).toBeInTheDocument();

    // Diagrams render with accessible names
    expect(screen.getByTestId("goblin-architecture-diagram")).toBeInTheDocument();
    expect(screen.getByTestId("goblin-routing-sequence")).toBeInTheDocument();

    // Postmortem content renders
    expect(
      screen.getByText(/The failover stampede/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Split 429 handling from 5xx/i)).toBeInTheDocument();

    // 10x scale items render
    expect(screen.getAllByTestId("at-scale-item").length).toBe(6);

    // Observability screenshots render with descriptive alt text
    expect(
      screen.getByAltText(/production control panel showing live status/i)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/chat workspace with guest mode/i)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/agent workflow execution page showing task intake/i)
    ).toBeInTheDocument();
  });

  it("does not render flagship systems sections for other projects", async () => {
    const page = await ProjectPage({
      params: Promise.resolve({ slug: "rizzk-calculator" }),
    });

    render(page);

    expect(
      screen.queryByRole("heading", { name: /Production observability/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Incident postmortem/i })
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("goblin-architecture-diagram")).not.toBeInTheDocument();
  });
});
