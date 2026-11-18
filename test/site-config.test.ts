import { describe, expect, it } from "vitest";
import { SITE_ORIGIN, canonicalUrl } from "@/lib/site-config";
describe("canonical portfolio origin", () => {
  it("uses the free production host", () => {
    expect(SITE_ORIGIN).toBe("https://fuaadabdullah.vercel.app");
  });
  it("produces valid URLs", () => {
    expect(canonicalUrl("/resume")).toBe("https://fuaadabdullah.vercel.app/resume");
    expect(canonicalUrl("/")).toBe("https://fuaadabdullah.vercel.app/");
  });
  it("rejects scheme-relative and fragment paths", () => {
    expect(() => canonicalUrl("//other.example")).toThrow();
    expect(() => canonicalUrl("/resume#old")).toThrow();
  });
});
