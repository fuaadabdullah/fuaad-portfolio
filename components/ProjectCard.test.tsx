import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
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

describe("ProjectCard actions", () => {
  it("renders live, source, and detail links with accessible labels", () => {
    render(<ProjectCard project={SAMPLE_PROJECT} />);

    const liveLink = screen.getByRole("link", { name: /live demo for sample project/i });
    expect(liveLink).toHaveAttribute("href", "https://example.com");
    expect(liveLink).toHaveAttribute("target", "_blank");
    expect(liveLink).toHaveAttribute("rel", "noopener noreferrer");

    const sourceLink = screen.getByRole("link", { name: /source code for sample project/i });
    expect(sourceLink).toHaveAttribute("href", "https://github.com/example/repo");
    expect(sourceLink).toHaveAttribute("target", "_blank");
    expect(sourceLink).toHaveAttribute("rel", "noopener noreferrer");

    const detailLink = screen.getByRole("link", { name: /view details for sample project/i });
    expect(detailLink).toHaveAttribute("href", "/portfolio/sample");
  });

  it("always renders the details link even when no external URLs are provided", () => {
    const projectWithoutLinks: Project = {
      ...SAMPLE_PROJECT,
      links: undefined,
    };

    render(<ProjectCard project={projectWithoutLinks} />);

    const detailLink = screen.getByRole("link", { name: /view details for sample project/i });
    expect(detailLink).toHaveAttribute("href", "/portfolio/sample");
  });
});
