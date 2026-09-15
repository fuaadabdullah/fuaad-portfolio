import { describe, expect, it } from "vitest";
import { getMockResponse, MOCK_RESPONSES } from "./fallback";
import { enrichPrompt, optimizePrompt } from "./prompt-utils";

// Providers receive the enriched prompt, not the raw question
async function mockReplyFor(question: string) {
  return getMockResponse(await enrichPrompt(optimizePrompt(question)));
}

describe("getMockResponse", () => {
  it("answers from the visitor's question, not the site context wrapped around it", async () => {
    expect(await mockReplyFor("How does RIZZK work?")).toBe(MOCK_RESPONSES.rizzk);
    expect(await mockReplyFor("Tell me about the 80/20 approach")).toBe(MOCK_RESPONSES["80/20"]);
  });

  it("prefers a specific topic over generic words in the same question", () => {
    expect(getMockResponse("hello, what is Fuaad's RIZZK calculator?")).toBe(MOCK_RESPONSES.rizzk);
  });

  it("uses the default reply when the question matches no topic", async () => {
    expect(await mockReplyFor("What's the weather like?")).toContain("What would you like to know?");
  });
});
