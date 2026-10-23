import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import JsonLd from "./JsonLd";

describe("JsonLd", () => {
  it("round-trips unsafe text without turning it into executable markup", () => {
    const dangerous = String.fromCharCode(60) + "/script" + String.fromCharCode(62) + "placeholder";
    const { container } = render(<JsonLd data={{ name: dangerous }} />);
    const scripts = container.querySelectorAll("script");
    expect(scripts).toHaveLength(1);
    expect(scripts[0].textContent).not.toContain(String.fromCharCode(60));
    expect(JSON.parse(scripts[0].textContent || "{}").name).toBe(dangerous);
  });
});
