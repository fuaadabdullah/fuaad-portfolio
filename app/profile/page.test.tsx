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
});
