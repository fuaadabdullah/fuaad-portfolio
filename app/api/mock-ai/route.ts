// Mock API for testing when Ollama isn't available
import { NextResponse } from "next/server";

const mockResponses = {
  "hello": "Hello! I'm the portfolio assistant. How can I help you learn about Fuaad's work?",
  "tech": "This portfolio uses Next.js 16, TypeScript, Tailwind CSS, MDX for blogs, and custom tooling.",
  "fuaad": "Fuaad is a finance major and full-stack developer who specializes in web apps, MVP tooling, and custom dashboards.",
  "rizzk": "RIZZK Calculator is a risk management tool for day traders, built with Python and Streamlit. It helps with position sizing and risk/reward calculations.",
  "80/20": "The 80/20 rule means focusing on the 20% of features that deliver 80% of the value. Fuaad uses this to ship production-ready projects in just 2 weeks.",
  "services": "Fuaad offers web app builds, MVP tooling, custom dashboards, and developer utilities.",
  "portfolio": "This is Fuaad's personal portfolio showcasing his projects like RIZZK Calculator, this website, and various development tools."
};

function getMockResponse(prompt: string): string {
  const lower = prompt.toLowerCase();

  // Check for keywords
  for (const [key, response] of Object.entries(mockResponses)) {
    if (lower.includes(key)) {
      return response;
    }
  }

  // Default response
  return "I'm here to help you learn about Fuaad's portfolio! Try asking about the tech stack, projects, or services.";
}

export async function POST(request: Request) {
  const { prompt } = await request.json();

  console.debug("MOCK API - PROMPT RECEIVED:", prompt);

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const reply = getMockResponse(prompt);

  if (!reply || typeof reply !== 'string') {
    console.error("Invalid mock response");
    return NextResponse.json({ reply: "Sorry, something went wrong." });
  }

  console.debug("MOCK API - REPLY:", reply);

  return NextResponse.json({ reply });
}