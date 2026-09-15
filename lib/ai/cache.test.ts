import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

async function loadCache() {
  vi.resetModules();
  return import("./cache");
}

describe("memory response cache", () => {
  beforeEach(() => {
    vi.stubEnv("REDIS_URL", "");
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it("serves fresh entries, then marks them stale", async () => {
    const { getCachedResponse, setCachedResponse } = await loadCache();

    await setCachedResponse("chat:question", "answer");
    expect(await getCachedResponse("chat:question")).toEqual({ data: "answer", isStale: false });

    vi.advanceTimersByTime(6 * 60_000);
    expect(await getCachedResponse("chat:question")).toEqual({ data: "answer", isStale: true });
  });

  it("stops serving entries once their TTL has passed", async () => {
    const { getCachedResponse, setCachedResponse } = await loadCache();

    await setCachedResponse("chat:question", "answer");
    vi.advanceTimersByTime(61 * 60_000);

    expect(await getCachedResponse("chat:question")).toEqual({ data: null, isStale: false });
  });
});
