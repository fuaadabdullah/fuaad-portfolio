import { describe, it, expect } from "vitest";
import { abstainReply } from "@/lib/ai/knowledge";

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
      expect(data.reply).toContain("Docker");
    });

    it("answers ShopMindAI stack questions with project-specific details", async () => {
      const { response, data } = await postPrompt("what's your tech stack for ShopMindAI?");

      expect(response.status).toBe(200);
      expect(data.reply).toContain("FastAPI");
      expect(data.reply).toContain("VIN, OBD code, and symptom intake");
      expect(data.reply).toContain("health and metrics endpoints");
    });

    it("lists all projects for the quick-question button", async () => {
      const { data } = await postPrompt("View projects");

      for (const project of ["RIZZK Calculator", "GoblinOS Assistant", "ShopMindAI", "Elbey Projects", "GradeM8"]) {
        expect(data.reply).toContain(project);
      }
      expect(data.reply).toContain("[projects page](/portfolio)");
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

    it("answers questions that open with a greeting instead of only greeting back", async () => {
      const { data } = await postPrompt("Hi, what's your tech stack for goblinos?");

      expect(data.reply).toContain("FastAPI backend");
    });

    it("only matches topic triggers at the start of a word", async () => {
      // "location" inside "allocation" used to return the Atlanta answer
      const { data } = await postPrompt("how do you think about asset allocation?");

      expect(data.reply).not.toContain("Atlanta");
    });

    it("rejects malformed bodies and missing prompts with 400", async () => {
      const { POST } = await import("../mock-ai/route");

      for (const body of ["{not json", JSON.stringify({}), JSON.stringify({ prompt: 42 })]) {
        const response = await POST(
          new Request("http://localhost/api/mock-ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          })
        );
        expect(response.status).toBe(400);
      }
    });

    it("falls back cleanly for unknown prompts", async () => {
      const { response, data } = await postPrompt("unknown topic xyz");

      expect(response.status).toBe(200);
      expect(data.reply).toBe(abstainReply);
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
