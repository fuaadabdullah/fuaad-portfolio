import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import PortfolioPage from "./page";

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
    unoptimized: _unoptimized,
    ...props
  }: {
    src: string;
    alt: string;
    unoptimized?: boolean;
    [key: string]: unknown;
  }) => <img src={src} alt={alt} {...props} />,
}));

describe("Portfolio route", () => {
  it("highlights outcomes and demos in page intro", () => {
    render(<PortfolioPage />);
    expect(
      screen.getByText(/four projects worth your time/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Flagship Build/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "GoblinOS Assistant" })
    ).toBeInTheDocument();
  });
});
