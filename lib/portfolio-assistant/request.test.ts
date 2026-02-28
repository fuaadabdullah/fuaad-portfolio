import { describe, expect, it } from "vitest";
import { parsePrompt } from "./request";
import { NextResponse } from "next/server";

describe("parsePrompt helper", () => {
  it("returns an error response for invalid JSON", async () => {
    const response = await parsePrompt(
      new Request("http://localhost/api", { method: "POST", body: "not json" })
    );
    expect(response).toBeInstanceOf(NextResponse);
    const payload = await (response as NextResponse).json();
    expect(payload.reply).toMatch(/Invalid JSON/);
  });

  it("returns an error response for missing prompt text", async () => {
    const response = await parsePrompt(
      new Request("http://localhost/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "    " }),
      })
    );
    expect(response).toBeInstanceOf(NextResponse);
    const payload = await (response as NextResponse).json();
    expect(payload.reply).toMatch(/Please enter a question/);
  });

  it("enforces the 2000 character limit", async () => {
    const longPrompt = "a".repeat(2001);
    const response = await parsePrompt(
      new Request("http://localhost/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: longPrompt }),
      })
    );
    expect(response).toBeInstanceOf(NextResponse);
    const payload = await (response as NextResponse).json();
    expect(payload.reply).toMatch(/keep prompts under 2000/);
  });

  it("returns the prompt and trimmed value when valid", async () => {
    const cleanPrompt = "   Hello world   ";
    const result = await parsePrompt(
      new Request("http://localhost/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: cleanPrompt }),
      })
    );
    if (result instanceof NextResponse) {
      throw new Error("Expected payload instead of NextResponse");
    }
    expect(result.trimmed).toBe("Hello world");
    expect(result.prompt).toBe(cleanPrompt);
  });
});
