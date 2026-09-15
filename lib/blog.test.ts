import { afterEach, describe, expect, it, vi } from "vitest";
import { formatDate } from "./blog";

describe("formatDate", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("shows the calendar date from front matter regardless of the server timezone", () => {
    for (const timeZone of ["America/Los_Angeles", "America/New_York", "UTC", "Asia/Tokyo"]) {
      vi.stubEnv("TZ", timeZone);
      expect(formatDate("2025-10-28")).toBe("October 28, 2025");
    }
  });
});
