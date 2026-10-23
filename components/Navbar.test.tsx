import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import Navbar from "./Navbar";

vi.mock("next/navigation", () => ({ usePathname: () => "/fuaad" }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("portfolio navigation identity", () => {
  it("uses the new orbital FA logo as the single navigation mark", () => {
    const { container } = render(<Navbar />);
    const homeLink = screen.getByRole("link", { name: /Fuaad Abdullah - Home/i });
    expect(homeLink).toHaveAttribute("href", "/");
    const brand = container.querySelector(".brand-mark");
    expect(brand).not.toBeNull();
    const mark = brand?.querySelector("[style]") as HTMLElement | null;
    expect(mark?.style.backgroundImage).toContain("fa-orbit-professional.jpg");
    expect(mark?.style.backgroundSize).toBe("cover");
    expect(mark?.getAttribute("aria-hidden")).toBeNull();
  });
});
