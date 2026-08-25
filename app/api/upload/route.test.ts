import { beforeEach, describe, expect, it, vi } from "vitest";

const adminToken = "test-admin-token";
const uploadFileMock = vi.fn();
const deleteFileMock = vi.fn();
const listFilesMock = vi.fn();
const validateFileMock = vi.fn();

vi.mock("@/lib/blob", () => ({
  uploadFile: uploadFileMock,
  deleteFile: deleteFileMock,
  listFiles: listFilesMock,
  validateFile: validateFileMock,
}));

describe("Upload API route", () => {
  beforeEach(() => {
    process.env.ADMIN_TOKEN = adminToken;
    uploadFileMock.mockReset();
    deleteFileMock.mockReset();
    listFilesMock.mockReset();
    validateFileMock.mockReset();

    uploadFileMock.mockResolvedValue({
      url: "https://blob.example/file.png",
      pathname: "file.png",
      size: 12,
      type: "image/png",
    });
    listFilesMock.mockResolvedValue([
      {
        url: "https://blob.example/file.png",
        pathname: "file.png",
        size: 12,
        uploadedAt: new Date("2026-08-25T00:00:00Z"),
      },
    ]);
    deleteFileMock.mockResolvedValue(undefined);
  });

  function authorizedHeaders(): HeadersInit {
    return { authorization: `Bearer ${adminToken}` };
  }

  it("rejects unauthenticated uploads before reading blob storage", async () => {
    const { POST } = await import("./route");
    const formData = new FormData();
    formData.append(
      "file",
      new File(["x"], "proof.png", { type: "image/png" })
    );

    const response = await POST(
      new Request("http://localhost/api/upload", {
        method: "POST",
        body: formData,
      }) as any
    );
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(response.headers.get("WWW-Authenticate")).toBe('Bearer realm="admin"');
    expect(data.error).toBe("Unauthorized. Admin Bearer token required.");
    expect(uploadFileMock).not.toHaveBeenCalled();
  });

  it("accepts authenticated uploads", async () => {
    const { POST } = await import("./route");
    const formData = new FormData();
    formData.append(
      "file",
      new File(["x"], "proof.png", { type: "image/png" })
    );

    const response = await POST(
      new Request("http://localhost/api/upload", {
        method: "POST",
        headers: authorizedHeaders(),
        body: formData,
      }) as any
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(validateFileMock).toHaveBeenCalledTimes(1);
    expect(uploadFileMock).toHaveBeenCalledTimes(1);
    expect(data.success).toBe(true);
    expect(data.url).toBe("https://blob.example/file.png");
  });

  it("rejects unauthenticated list and delete requests", async () => {
    const { GET, DELETE } = await import("./route");

    const listResponse = await GET(
      new Request("http://localhost/api/upload", { method: "GET" }) as any
    );
    const deleteResponse = await DELETE(
      new Request("http://localhost/api/upload?url=https://blob.example/file.png", {
        method: "DELETE",
      }) as any
    );

    expect(listResponse.status).toBe(401);
    expect(deleteResponse.status).toBe(401);
    expect(listFilesMock).not.toHaveBeenCalled();
    expect(deleteFileMock).not.toHaveBeenCalled();
  });

  it("accepts authenticated list and delete requests", async () => {
    const { GET, DELETE } = await import("./route");

    const listResponse = await GET(
      new Request("http://localhost/api/upload", {
        method: "GET",
        headers: authorizedHeaders(),
      }) as any
    );
    const listData = await listResponse.json();

    const deleteResponse = await DELETE(
      new Request("http://localhost/api/upload?url=https://blob.example/file.png", {
        method: "DELETE",
        headers: authorizedHeaders(),
      }) as any
    );

    expect(listResponse.status).toBe(200);
    expect(listData.files).toHaveLength(1);
    expect(deleteResponse.status).toBe(200);
    expect(listFilesMock).toHaveBeenCalledTimes(1);
    expect(deleteFileMock).toHaveBeenCalledWith("https://blob.example/file.png");
  });
});
