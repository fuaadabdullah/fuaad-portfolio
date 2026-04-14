import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactPage from "./page";

vi.mock("@/components/ContactForm", () => ({
  default: () => (
    <form aria-label="Contact form">
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" />
      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" />
      <button type="submit">Send Message</button>
    </form>
  ),
}));

describe("ContactPage", () => {
  it("renders direct contact details and the shared contact form", () => {
    render(<ContactPage />);

    expect(screen.getByRole("heading", { name: /ask a quick question or book the call/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /book a call/i })).toHaveAttribute(
      "href",
      "https://calendly.com/fuaadabdullah/30min"
    );
    expect(screen.getByRole("link", { name: /fuaadabdullah@gmail.com/i })).toHaveAttribute(
      "href",
      "mailto:fuaadabdullah@gmail.com"
    );
    expect(screen.getByRole("form", { name: /contact form/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });
});
