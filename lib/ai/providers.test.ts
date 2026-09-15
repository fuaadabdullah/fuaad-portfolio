import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const callOllama = vi.fn();
const callGeminiAPI = vi.fn();
const callHuggingFaceAPI = vi.fn();

vi.mock("./providers/index", () => ({ callOllama, callGeminiAPI, callHuggingFaceAPI }));

async function loadProviders() {
  vi.resetModules();
  return import("./providers");
}

describe("tryProvidersWithCircuitBreaker", () => {
  beforeEach(() => {
    callOllama.mockReset().mockResolvedValue("tinyllama reply");
    callGeminiAPI.mockReset().mockResolvedValue("gemini reply");
    callHuggingFaceAPI.mockReset().mockResolvedValue("hugging face reply");
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("skips TinyLlama entirely when the Oracle host isn't configured", async () => {
    vi.stubEnv("OLLAMA_BASE_URL", "");
    const { tryProvidersWithCircuitBreaker } = await loadProviders();

    await expect(tryProvidersWithCircuitBreaker("hi")).resolves.toBe("gemini reply");
    expect(callOllama).not.toHaveBeenCalled();
  });

  it("tries the Oracle TinyLlama host first, then Gemini, then Hugging Face", async () => {
    vi.stubEnv("OLLAMA_BASE_URL", "https://tinyllama.oracle.example");
    callOllama.mockRejectedValue(new Error("host down"));
    callGeminiAPI.mockRejectedValue(new Error("quota"));
    const { tryProvidersWithCircuitBreaker } = await loadProviders();

    await expect(tryProvidersWithCircuitBreaker("hi")).resolves.toBe("hugging face reply");
    expect(callOllama).toHaveBeenCalledTimes(1);
    expect(callGeminiAPI).toHaveBeenCalledTimes(1);
  });
});
