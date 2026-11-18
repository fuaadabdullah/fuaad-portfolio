import { describe, expect, it } from "vitest";
import manifest from "@/docs/hardening/findings.json";
describe("audited hardening backlog", () => {
  it("tracks all 35 unique audit findings with an explicit disposition", () => {
    expect(manifest.findings).toHaveLength(35);
    expect(new Set(manifest.findings.map(f => f.id)).size).toBe(35);
    expect(manifest.findings.map(f => f.id)).toEqual(
      Array.from({ length: 35 }, (_, i) => `AUDIT-${String(i + 1).padStart(2, "0")}`)
    );
    expect(manifest.findings.every(f =>
      ["open", "blocked", "implemented-unverified", "verified", "disproven", "accepted"].includes(f.status)
    )).toBe(true);
    expect(manifest.findings.every(f => /^M[0-7]$/.test(f.module))).toBe(true);
  });
});
