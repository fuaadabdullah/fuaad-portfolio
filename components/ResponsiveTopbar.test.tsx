import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResponsiveTopbar from "./ResponsiveTopbar";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("ResponsiveTopbar", () => {
  it("renders the navbar and opens/closes mobile menu", async () => {
    render(<ResponsiveTopbar />);

    const openBtn = screen.getByRole("button", { name: /open menu/i });
    expect(openBtn).toBeInTheDocument();

    fireEvent.click(openBtn);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    const closeBtn = screen.getByRole("button", { name: /^close menu$/i });
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("contains the main navigation link with Homepage label", () => {
    render(<ResponsiveTopbar />);
    expect(screen.getByRole("link", { name: /fuaad abdullah - home/i })).toBeInTheDocument();
  });
});
