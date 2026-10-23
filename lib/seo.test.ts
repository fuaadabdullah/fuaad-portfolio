import { describe, expect, it } from "vitest";
import { personJsonLd } from "./seo";

describe("public Person structured data", () => {
  it("points to the professional identity and verified public contact", () => {
    expect(personJsonLd["@type"]).toBe("Person");
    expect(personJsonLd.url).toBe("https://heyimfuaad.me/profile");
    expect(personJsonLd.email).toBe("mailto:ayahos.dev@gmail.com");
    expect(personJsonLd.image).toBe("https://heyimfuaad.me/fuaad-professional-portrait.jpg");
    expect(personJsonLd.sameAs).toContain("https://www.linkedin.com/in/fuaadabdullah");
  });
});
