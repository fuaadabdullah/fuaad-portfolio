import { describe, expect, it } from "vitest";
import projects from "@/data/projects";
import * as resumeData from "@/data/resume";
const denied = "rizzk-calculator-demo-eus2-f1.azurewebsites.net";

describe("public project links", () => {
  it("does not promote a live demo that currently returns 403", () => {
    expect(JSON.stringify(projects)).not.toContain(denied);
    expect(JSON.stringify(resumeData)).not.toContain(denied);
  });
  it("keeps the RIZZK project source available", () => {
    const rizzk = projects.find(p => p.slug === "rizzk-calculator");
    expect(rizzk?.links?.source).toContain("github.com/fuaadabdullah/");
  });
});
