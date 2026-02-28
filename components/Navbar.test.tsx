import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar", () => {
  it("renders the site title/logo", () => {
    render(<Navbar />);
    expect(screen.getByText(/Hey I'm/)).toBeInTheDocument();
    expect(screen.getByText("Fuaad")).toBeInTheDocument();
  });

  it("renders navigation header with correct ARIA label", () => {
    render(<Navbar />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav).toBeInTheDocument();
  });

  it("renders mobile menu button", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toBeInTheDocument();
  });

  it("mobile menu button has correct initial ARIA attributes", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).not.toHaveAttribute("aria-controls");
  });

  it("updates ARIA attributes when menu is opened", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    
    const button = screen.getByRole("button", { name: "Open menu" });
    await user.click(button);
    
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAttribute("aria-controls");
  });

  it("restores focus to trigger when menu closes with Escape", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const button = screen.getByRole("button", { name: "Open menu" });
    await user.click(button);
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(button).toHaveFocus();
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("renders menu icon with aria-hidden", () => {
    const { container } = render(<Navbar />);
    const menuIcon = container.querySelector('[aria-hidden="true"]');
    expect(menuIcon).toBeInTheDocument();
  });

  it("renders sticky header with backdrop blur", () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector("header");
    expect(header).toHaveClass("sticky", "top-0", "backdrop-blur-md");
  });

  it("logo link has correct href and aria-label", () => {
    render(<Navbar />);
    const logoLink = screen.getByLabelText("Fuaad Abdullah - Home");
    expect(logoLink).toHaveAttribute("href", "/");
  });
});
