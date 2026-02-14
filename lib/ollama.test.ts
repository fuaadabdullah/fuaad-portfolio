import { describe, expect, it } from "vitest";
import { cleanBaseUrl, parseChatReply } from "./ollama";

describe("cleanBaseUrl", () => {
  it("adds http:// to host:port inputs", () => {
    expect(cleanBaseUrl("1.2.3.4:11434")).toBe("http://1.2.3.4:11434");
  });

  it("strips paths from full URLs", () => {
    expect(cleanBaseUrl("http://1.2.3.4:11434/api/generate")).toBe("http://1.2.3.4:11434");
  });

  it("trims trailing slashes", () => {
    expect(cleanBaseUrl("http://example.com:11434/")).toBe("http://example.com:11434");
  });
});

describe("parseChatReply", () => {
  it("parses Ollama /api/chat shape", () => {
    expect(parseChatReply({ message: { role: "assistant", content: "hello" } })).toBe("hello");
  });

  it("parses legacy response shape", () => {
    expect(parseChatReply({ response: "hi" })).toBe("hi");
  });

  it("parses OpenAI-like choices shape", () => {
    expect(parseChatReply({ choices: [{ message: { content: "yo" } }] })).toBe("yo");
  });

  it("returns null for unknown shapes", () => {
    expect(parseChatReply({})).toBeNull();
  });
});

