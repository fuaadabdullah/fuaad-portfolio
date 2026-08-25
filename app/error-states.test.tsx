import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import Loading from "./loading";
import Error from "./error";
import NotFound from "./not-found";

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

describe("app shell states", () => {
  it("renders a branded loading state", () => {
    render(<Loading />);

    expect(screen.getByLabelText(/loading page/i)).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders a recoverable error state", () => {
    const reset = vi.fn();
    render(<Error error={new Error("boom")} reset={reset} />);

    expect(screen.getByRole("alert")).toHaveTextContent(/this page failed to load/i);
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("renders a useful not-found state", () => {
    render(<NotFound />);

    expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view portfolio/i })).toHaveAttribute("href", "/portfolio");
    expect(screen.getByRole("link", { name: /view resume/i })).toHaveAttribute("href", "/resume");
  });
});
