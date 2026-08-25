import { beforeEach, describe, expect, it, vi } from "vitest";

const adminToken = "test-admin-token";

vi.mock("@/lib/ai/ip-detection", () => ({
  getClientIP: () => "203.0.113.10",
}));

vi.mock("@/lib/ai/rate-limit", () => ({
  checkRateLimit: () => ({ allowed: true }),
  getRateLimitConfig: () => ({ maxRequestsPerMinute: 10 }),
}));

vi.mock("@/lib/ai/cache", () => ({
  getCachedResponse: () => Promise.resolve({ data: null, isStale: false }),
  setCachedResponse: vi.fn(() => Promise.resolve()),
  refreshCacheInBackground: vi.fn(),
  getCacheConfig: () =>
    Promise.resolve({
      ttl: 300,
      staleWhileRevalidateTtl: 60,
      redisAvailable: false,
    }),
}));

vi.mock("@/lib/ai/circuit-breaker", () => ({
  getCircuitBreakerStatus: () => ({}),
}));

vi.mock("@/lib/ai/providers", () => ({
  tryProvidersWithCircuitBreaker: vi.fn(() => Promise.resolve("Admin AI reply")),
}));

vi.mock("@/lib/ai/prompt-utils", () => ({
  optimizePrompt: (prompt: string) => prompt,
  enrichPrompt: (prompt: string) => Promise.resolve(prompt),
}));

describe("AI API route", () => {
  beforeEach(() => {
    process.env.ADMIN_TOKEN = adminToken;
  });

  function makeRequest(headers?: HeadersInit) {
    return new Request("http://localhost/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({ prompt: "Tell me about GoblinOS" }),
    });
  }

  it("rejects unauthenticated provider-backed assistant requests", async () => {
    const { POST } = await import("./route");

    const response = await POST(makeRequest() as any);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(response.headers.get("WWW-Authenticate")).toBe('Bearer realm="admin"');
    expect(data.error).toBe("Unauthorized. Admin Bearer token required.");
  });

  it("accepts authenticated provider-backed assistant requests", async () => {
    const { POST } = await import("./route");

    const response = await POST(
      makeRequest({ authorization: `Bearer ${adminToken}` }) as any
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.reply).toBe("Admin AI reply");
    expect(data.cached).toBe(false);
  });

  it("rejects unauthenticated runtime status requests", async () => {
    const { GET } = await import("./route");

    const response = await GET(
      new Request("http://localhost/api/ai", { method: "GET" }) as any
    );

    expect(response.status).toBe(401);
    expect(response.headers.get("WWW-Authenticate")).toBe('Bearer realm="admin"');
  });
});
