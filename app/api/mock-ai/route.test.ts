import { describe, it, expect } from "vitest";

async function postPrompt(prompt: string) {
  const { POST } = await import("../mock-ai/route");

  const request = new Request("http://localhost/api/mock-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const response = await POST(request);
  const data = await response.json();

  return { response, data };
}

describe("Mock AI API Route", () => {
  describe("POST /api/mock-ai", () => {
    it("returns a shared greeting response", async () => {
      const { response, data } = await postPrompt("hello");

      expect(response.status).toBe(200);
      expect(data.reply).toContain("projects, tech stack, services, or background");
      expect(data.reply).toContain("GoblinOS");
      expect(data.reply).toContain("ShopMindAI");
    });

    it("answers RIZZK using shared portfolio knowledge", async () => {
      const { response, data } = await postPrompt("rizzk");

      expect(response.status).toBe(200);
      expect(data.reply).toContain("day traders");
      expect(data.reply).toContain("Python, Streamlit, Plotly, Docker, and Azure");
    });

    it("answers GoblinOS stack questions with project-specific details", async () => {
      const { response, data } = await postPrompt("what's your tech stack for goblinos?");

      expect(response.status).toBe(200);
      expect(data.reply).toContain("FastAPI backend");
      expect(data.reply).toContain("PostgreSQL");
      expect(data.reply).toContain("Terraform");
    });

    it("answers ShopMindAI stack questions with project-specific details", async () => {
      const { response, data } = await postPrompt("what's your tech stack for ShopMindAI?");

      expect(response.status).toBe(200);
      expect(data.reply).toContain("FastAPI");
      expect(data.reply).toContain("VIN, OBD code, and symptom intake");
      expect(data.reply).toContain("health and metrics endpoints");
    });

    it("covers the remaining portfolio projects", async () => {
      const elbey = await postPrompt("tell me about Elbey Projects");
      expect(elbey.data.reply).toContain("mobile mechanic business");
      expect(elbey.data.reply).toContain("current public Vercel preview deployment");

      const portfolio = await postPrompt("tell me about your portfolio site");
      expect(portfolio.data.reply).toContain("projects, services, blog content, and professional background");
      expect(portfolio.data.reply).toContain("Next.js App Router");

      const gradem8 = await postPrompt("what is GradeM8?");
      expect(gradem8.data.reply).toContain("Hugging Face Spaces");
      expect(gradem8.data.reply).toContain("document assessment");
    });

    it("answers common visitor questions about services, background, location, and availability", async () => {
      const services = await postPrompt("what services do you offer?");
      expect(services.data.reply).toContain("web app builds");
      expect(services.data.reply).toContain("MVP bootstrap");

      const background = await postPrompt("tell me about your background");
      expect(background.data.reply).toContain("Georgia State University finance graduate");

      const location = await postPrompt("where are you based?");
      expect(location.data.reply).toContain("Atlanta, Georgia");

      const availability = await postPrompt("are you open to work?");
      expect(availability.data.reply).toContain("open to software engineering roles");
    });

    it("falls back cleanly for unknown prompts", async () => {
      const { response, data } = await postPrompt("unknown topic xyz");

      expect(response.status).toBe(200);
      expect(data.reply).toBe(
        "I'm here to help you learn about Fuaad's portfolio. Ask about a project, the tech stack, services, or how to get in touch."
      );
    });

    it("returns valid JSON responses", async () => {
      const { response, data } = await postPrompt("test");

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("reply");
      expect(typeof data.reply).toBe("string");
      expect(data.reply.length).toBeGreaterThan(0);
    });
  });
});
