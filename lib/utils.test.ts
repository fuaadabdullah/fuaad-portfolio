import { describe, it, expect } from "vitest";
import { clsx, cn } from "./utils";

describe("clsx", () => {
  it("joins multiple class names", () => {
    expect(clsx("foo", "bar", "baz")).toBe("foo bar baz");
  });

  it("filters out falsy values", () => {
    expect(clsx("foo", false, "bar", null, "baz", undefined)).toBe("foo bar baz");
  });

  it("handles empty input", () => {
    expect(clsx()).toBe("");
  });

  it("handles all falsy values", () => {
    expect(clsx(false, null, undefined)).toBe("");
  });

  it("handles single class name", () => {
    expect(clsx("single")).toBe("single");
  });
});

describe("cn", () => {
  it("is an alias for clsx", () => {
    expect(cn).toBe(clsx);
  });

  it("works the same as clsx", () => {
    expect(cn("foo", false, "bar")).toBe(clsx("foo", false, "bar"));
  });
});
