import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import AboutPage from "./page";

expect.extend(toHaveNoViolations);

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

describe("AboutPage", () => {
  it("renders a single h1", () => {
    render(<AboutPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: /Finance student\. Trader\. Builder\./i })
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<AboutPage />);
    const results = await axe(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
