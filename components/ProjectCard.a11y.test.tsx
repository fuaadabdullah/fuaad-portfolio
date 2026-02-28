import { describe, expect, it } from "vitest";
import { axe } from "jest-axe";
import { render } from "@testing-library/react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/data/projects";

const SAMPLE_PROJECT: Project = {
  slug: "sample",
  title: "Sample Project",
  tagline: "Sample tagline for project card testing.",
  description: "Sample project description.",
  tech: ["TypeScript", "React"],
  links: {
    live: "https://example.com",
    source: "https://github.com/example/repo",
  },
};

describe("ProjectCard accessibility", () => {
  it("has no detectable a11y violations", async () => {
    const { container } = render(<ProjectCard project={SAMPLE_PROJECT} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
