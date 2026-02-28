import { describe, expect, it } from "vitest";
import {
  buildAssistantContext,
  findMatchingContent,
  findMatchingFaq,
} from "./context";
import { blogContent, projectContent } from "@/data/site_content";
import { faq, siteFacts } from "@/data/portfolio_knowledge";

describe("assistant context helpers", () => {
  it("finds a matching FAQ answer", () => {
    const match = findMatchingFaq("Tell me about services", faq);
    expect(match?.answer).toContain("web app builds");
  });

  it("matches content by slug or title", () => {
    const match = findMatchingContent("performance tips", blogContent);
    expect(match?.slug).toBe("performance-tips");
  });

  it("builds context with matching sections", () => {
    const context = buildAssistantContext({
      prompt: "What can you tell me about GoblinOS Assistant?",
      siteFacts,
      faq,
      blogContent,
      projectContent,
    });
    expect(context).toContain("GoblinOS Assistant");
    expect(context).toContain("FAQ Answer");
    expect(context).toContain("User:");
  });

  it("omits optional sections when nothing matches", () => {
    const context = buildAssistantContext({
      prompt: "What is your favorite color?",
      siteFacts,
      faq,
      blogContent,
      projectContent,
    });

    expect(context).not.toContain("FAQ Answer:");
    expect(context).not.toContain("Blog:");
    expect(context).toContain("Portfolio Facts:");
  });
});
