import { describe, expect, it } from "vitest";
import { readLimitedText } from "@/lib/security/request-body";

function request(body: string, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/example", { method: "POST", headers, body });
}

describe("bounded request reader", () => {
  it("accepts a normal JSON request", async () => {
    const input = '{"name":"Fuaad"}';
    expect(await readLimitedText(request(input), 1024)).toEqual({ ok: true, text: input });
  });
  it("rejects oversized UTF-8 payloads without trusting character counts", async () => {
    const result = await readLimitedText(request("😀😀"), 7);
    expect(result).toEqual({ ok: false, status: 413, error: "Request too large" });
  });
  it("rejects oversized declared Content-Length before consuming the body", async () => {
    const result = await readLimitedText(request("small", { "content-length": "25000" }), 1024);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(413);
  });
  it("rejects malformed Content-Length", async () => {
    const result = await readLimitedText(request("small", { "content-length": "-1" }), 1024);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(400);
  });
  it("does not accept invalid limits", async () => {
    await expect(readLimitedText(request("data"), 0)).rejects.toThrow("Invalid request byte limit");
  });
});
