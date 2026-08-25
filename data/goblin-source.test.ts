import { describe, expect, it } from "vitest";
import projects from "@/data/projects";
import { resumeData } from "@/data/resume";
import { projectContent } from "@/data/site_content";

const canonicalGoblinSource = "https://github.com/fuaadabdullah/goblin-assistant";

describe("GoblinOS source of truth", () => {
  it("uses the canonical repository across portfolio and resume data", () => {
    const project = projects.find((item) => item.slug === "goblin-assistant");
    const resumeProject = resumeData.projects.items.find(
      (item) => item.title === "Goblin Assistant"
    );
    const assistantContent = projectContent.find(
      (item) => item.slug === "goblin-assistant"
    );

    expect(project?.links?.source).toBe(canonicalGoblinSource);
    expect(resumeProject?.links?.source).toBe(canonicalGoblinSource);
    expect(assistantContent?.keyPoints).toContain(
      "Canonical repository: github.com/fuaadabdullah/goblin-assistant"
    );
  });
});
