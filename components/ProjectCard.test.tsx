import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/data/projects";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => <img src={src} alt={alt} {...props} />,
}));

const baseProject: Project = {
  slug: "test-project",
  title: "Test Project",
  tagline: "A project focused on measurable impact.",
  description: "Test description",
  tech: ["TypeScript", "Next.js", "Tailwind"],
  links: {
    live: "https://example.com",
    source: "https://github.com/example/repo",
  },
  results: [
    { label: "conversion lift", value: "18%", sourceLabel: "analytics" },
    { label: "setup time reduced", value: "42 mins", sourceLabel: "user-reported" },
    { label: "build timeline", value: "3 weeks", sourceLabel: "delivery scope" },
  ],
  proofMedia: [
    {
      type: "gif",
      src: "/projects/demos/test-project.gif",
      width: 1280,
      height: 720,
      alt: "Test project gif demo",
      status: "ready",
    },
    {
      type: "image",
      src: "/projects/test-project-1.png",
      width: 1280,
      height: 720,
      alt: "Test project screenshot 1",
      status: "ready",
    },
    {
      type: "image",
      src: "/projects/test-project-2.png",
      width: 1280,
      height: 720,
      alt: "Test project screenshot 2",
      status: "ready",
    },
  ],
};

describe("ProjectCard", () => {
  it("renders exactly 3 KPI chips with source labels", () => {
    render(<ProjectCard project={baseProject} />);

    const outcomes = screen.getByLabelText("Project outcomes");
    const chips = within(outcomes).getAllByTestId("project-result-chip");
    expect(chips).toHaveLength(3);
    expect(screen.getByText("analytics")).toBeInTheDocument();
    expect(screen.getByText("user-reported")).toBeInTheDocument();
    expect(screen.getByText("delivery scope")).toBeInTheDocument();
  });

  it("renders hero plus two thumbnail media tiles when media exists", () => {
    render(<ProjectCard project={baseProject} />);

    const mediaContainer = screen.getByTestId("project-proof-card");
    const tiles = within(mediaContainer).getAllByTestId("project-proof-tile");
    expect(tiles).toHaveLength(3);
  });

  it("renders pending fallback tile when media is unavailable", () => {
    const pendingProject: Project = {
      ...baseProject,
      proofMedia: [
        {
          type: "gif",
          src: "/projects/demos/test-project.gif",
          width: 1280,
          height: 720,
          alt: "Demo clip for test project",
          status: "pending",
        },
      ],
    };

    render(<ProjectCard project={pendingProject} />);
    expect(screen.getByText(/Demo capture pending/i)).toBeInTheDocument();
  });

  it("keeps tech row below outcomes in visual hierarchy", () => {
    render(<ProjectCard project={baseProject} />);

    const outcomes = screen.getByLabelText("Project outcomes");
    const techRow = screen.getByTestId("project-tech-row");
    const relationship = outcomes.compareDocumentPosition(techRow);

    expect(relationship & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
