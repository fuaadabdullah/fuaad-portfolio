import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import ServicesPage from "./page";

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

vi.mock("@/components/ContactForm", () => ({
  default: () => <form aria-label="Contact form"><button type="submit">Send Message</button></form>,
}));

vi.mock("@/components/JsonLd", () => ({
  default: () => null,
}));

describe("ServicesPage", () => {
  it("renders delivery speed proof and testimonial content", () => {
    render(<ServicesPage />);

    expect(screen.getAllByText(/1 week/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/4 weeks/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Fuaad built our site in a week, clean and fast\./i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /open contact page/i })).toHaveAttribute("href", "/contact");
  });
});
