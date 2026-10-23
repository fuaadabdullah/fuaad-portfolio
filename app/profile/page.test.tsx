import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ProfilePage from "./page";

describe("ProfessionalProfile", () => {
  it("shows the professional identity and three intended audiences", () => {
    render(<ProfilePage />);
    expect(screen.getByRole("heading", { level: 1, name: /Fuaad Abdullah/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /For customers/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /For employers/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /For schools/i })).toBeInTheDocument();
  });
  it("routes clients, employers, and schools to the right evidence and contact paths", () => {
    render(<ProfilePage />);
    expect(screen.getByRole("link", { name: /Discuss a project/i })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: /Read my résumé/i })).toHaveAttribute("href", "/resume");
    expect(screen.getByRole("link", { name: /Review academic profile/i })).toHaveAttribute("href", "/cv");
    expect(screen.getByRole("link", { name: /See client services/i })).toHaveAttribute("href", "/services");
    expect(screen.getByRole("link", { name: /Customers, go to section/i })).toHaveAttribute("href", "#customers");
    expect(screen.getByRole("link", { name: /Employers, go to section/i })).toHaveAttribute("href", "#employers");
    expect(screen.getByRole("link", { name: /Schools, go to section/i })).toHaveAttribute("href", "#schools");
  });

  it("describes enrollment as current rather than a finished degree", () => {
    render(<ProfilePage />);
    expect(screen.getByText(/undergraduate student at Georgia State University/i)).toBeInTheDocument();
    expect(screen.getByText(/My degree remains in progress/i)).toBeInTheDocument();
  });

});
