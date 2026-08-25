import { beforeEach, describe, expect, it, vi } from "vitest";

const createMock = vi.fn();
const findManyMock = vi.fn();
const adminToken = "test-admin-token";

vi.mock("@/lib/db", () => ({
  prisma: {
    contactSubmission: {
      create: createMock,
      findMany: findManyMock,
    },
  },
}));

function makeRequest(body: unknown, ip = "203.0.113.10") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

describe("Contact API route", () => {
  beforeEach(() => {
    process.env.ADMIN_TOKEN = adminToken;
    createMock.mockReset();
    findManyMock.mockReset();
    createMock.mockResolvedValue({ id: "test-id" });
    findManyMock.mockResolvedValue([]);
  });

  function makeAdminRequest(url: string) {
    return new Request(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });
  }

  it("rejects invalid payloads with field errors", async () => {
    const { POST } = await import("./route");

    const request = makeRequest({ name: "", email: "bad-email", message: "" }, "198.51.100.1");
    const response = await POST(request as any);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Validation failed");
    expect(data.details).toHaveProperty("name");
    expect(data.details).toHaveProperty("email");
    expect(data.details).toHaveProperty("message");
    expect(createMock).not.toHaveBeenCalled();
  });

  it("sanitizes user input before persisting", async () => {
    const { POST } = await import("./route");

    const payload = {
      name: "Jane Doe",
      email: "JANE@EXAMPLE.COM",
      message:
        "Hello <script>alert('xss')</script> world onload='evil()' javascript:alert(1)",
    };

    const response = await POST(makeRequest(payload, "198.51.100.2") as any);

    expect(response.status).toBe(201);
    expect(createMock).toHaveBeenCalledTimes(1);

    const callArg = createMock.mock.calls[0][0];
    expect(callArg.data.name).toBe("Jane Doe");
    expect(callArg.data.email).toBe("jane@example.com");
    expect(callArg.data.message).not.toContain("<script>");
    expect(callArg.data.message).not.toContain("javascript:");
  });

  it("treats SQL-like content as plain message text (no raw SQL execution)", async () => {
    const { POST } = await import("./route");

    const sqlLikeMessage = "hello'; DROP TABLE ContactSubmission; --";

    const response = await POST(
      makeRequest(
        {
          name: "John Smith",
          email: "john@example.com",
          message: sqlLikeMessage,
        },
        "198.51.100.3"
      ) as any
    );

    expect(response.status).toBe(201);
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock.mock.calls[0][0].data.message).toBe(sqlLikeMessage);
  });

  it("rate limits after 5 submissions per 24 hours per IP", async () => {
    const { POST } = await import("./route");

    const payload = {
      name: "Rate Tester",
      email: "rate@example.com",
      message: "test message",
    };

    const ip = "198.51.100.99";

    for (let i = 0; i < 5; i++) {
      const response = await POST(makeRequest(payload, ip) as any);
      expect(response.status).toBe(201);
    }

    const blocked = await POST(makeRequest(payload, ip) as any);
    const data = await blocked.json();

    expect(blocked.status).toBe(429);
    expect(data.error).toContain("Too many submissions");
  });

  it("rejects invalid ORDER BY values in GET query params", async () => {
    const { GET } = await import("./route");

    const request = makeAdminRequest(
      "http://localhost/api/contact?sortBy=createdAt;DROP TABLE ContactSubmission--&sortOrder=desc"
    );

    const response = await GET(request as any);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Invalid query parameters");
    expect(findManyMock).not.toHaveBeenCalled();
  });

  it("rejects invalid WHERE email filters in GET query params", async () => {
    const { GET } = await import("./route");

    const request = makeAdminRequest(
      "http://localhost/api/contact?email=foo@example.com' OR 1=1 --"
    );

    const response = await GET(request as any);

    expect(response.status).toBe(400);
    expect(findManyMock).not.toHaveBeenCalled();
  });

  it("uses allowlisted sort and validated where values in GET query params", async () => {
    const { GET } = await import("./route");

    const request = makeAdminRequest(
      "http://localhost/api/contact?sortBy=email&sortOrder=asc&limit=25&email=JANE@EXAMPLE.COM"
    );

    const response = await GET(request as any);

    expect(response.status).toBe(200);
    expect(findManyMock).toHaveBeenCalledTimes(1);
    expect(findManyMock.mock.calls[0][0]).toEqual({
      where: { email: "jane@example.com" },
      orderBy: { email: "asc" },
      take: 25,
    });
  });
});
