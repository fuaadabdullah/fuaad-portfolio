import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

async function loadBreaker() {
  vi.resetModules();
  return import("./circuit-breaker");
}

describe("circuit breaker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("opens after repeated failures and half-opens after the recovery timeout", async () => {
    const { canExecute, recordFailure, getCircuitBreakerStatus } = await loadBreaker();

    for (let i = 0; i < 3; i++) recordFailure("local-llm");
    expect(canExecute("local-llm")).toBe(false);

    vi.advanceTimersByTime(60_000);
    expect(canExecute("local-llm")).toBe(true);
    expect(getCircuitBreakerStatus()["local-llm"].state).toBe("HALF_OPEN");
  });

  it("reopens immediately when the half-open trial fails, even after the failure window resets", async () => {
    const { canExecute, recordFailure } = await loadBreaker();

    for (let i = 0; i < 3; i++) recordFailure("local-llm");
    // Long enough that the monitoring window clears the failure count
    vi.advanceTimersByTime(6 * 60_000);
    expect(canExecute("local-llm")).toBe(true);

    recordFailure("local-llm");

    expect(canExecute("local-llm")).toBe(false);
  });

  it("closes again after a successful half-open trial", async () => {
    const { canExecute, recordFailure, recordSuccess } = await loadBreaker();

    for (let i = 0; i < 3; i++) recordFailure("local-llm");
    vi.advanceTimersByTime(60_000);
    expect(canExecute("local-llm")).toBe(true);

    recordSuccess("local-llm");
    recordFailure("local-llm");

    expect(canExecute("local-llm")).toBe(true);
  });
});
