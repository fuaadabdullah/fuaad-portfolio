import { describe, expect, it } from "vitest";
import { fallbackMockReply, mockResponses } from "./mock";

describe("fallback mock responses", () => {
  it("returns a configured reply when a keyword is present", () => {
    const response = fallbackMockReply("Tell me about tech stack");
    expect(response).toBe(mockResponses["tech"]);
  });

  it("returns the default message when nothing matches", () => {
    const response = fallbackMockReply("Unrelated question");
    expect(response).toContain("portfolio assistant");
    expect(response).not.toBe(mockResponses["tech"]);
  });
});
