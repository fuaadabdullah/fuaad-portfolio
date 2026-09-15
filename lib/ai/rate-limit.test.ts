import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("rate limiting", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
  });

  afterEach(() => vi.useRealTimers());

  it("allows ten requests and resets at the end of the minute", async () => {
    const { checkRateLimit } = await import("./rate-limit");
    for (let index = 0; index < 10; index++) {
      expect(checkRateLimit("visitor").allowed).toBe(true);
    }
    expect(checkRateLimit("visitor").allowed).toBe(false);
    vi.advanceTimersByTime(60_000);
    expect(checkRateLimit("visitor").allowed).toBe(true);
  });

  it("rejects new clients at capacity without discarding active counters", async () => {
    const { checkRateLimit } = await import("./rate-limit");
    for (let index = 0; index < 10_000; index++) {
      expect(checkRateLimit(`visitor-${index}`).allowed).toBe(true);
    }
    expect(checkRateLimit("overflow-visitor").allowed).toBe(false);
    for (let index = 0; index < 9; index++) {
      expect(checkRateLimit("visitor-0").allowed).toBe(true);
    }
    expect(checkRateLimit("visitor-0").allowed).toBe(false);
    vi.advanceTimersByTime(60_000);
    expect(checkRateLimit("overflow-visitor").allowed).toBe(true);
  });
});
