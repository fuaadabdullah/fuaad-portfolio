import { describe, it, expect } from "vitest";
import { formatDate } from "./date";

describe("formatDate", () => {
  it("formats date string to long format", () => {
    const result = formatDate("2024-01-15");
    expect(result).toBe("January 15, 2024");
  });

  it("handles different date formats", () => {
    const result = formatDate("2024-12-25");
    expect(result).toBe("December 25, 2024");
  });

  it("handles ISO date strings", () => {
    const result = formatDate("2024-06-01T00:00:00.000Z");
    // Note: The exact output may vary based on timezone, but should contain the date
    expect(result).toMatch(/June/);
    expect(result).toMatch(/2024/);
  });
});
