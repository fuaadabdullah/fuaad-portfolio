// Mock API for testing when Ollama isn't available
import { NextResponse } from "next/server";

const mockResponses = {
  "hello": "I can walk you through Fuaad's projects, tech stack, or how to get in touch. Check out his [featured projects](/portfolio) or [learn more about his background](/about).",
  "tech": "This site runs on Next.js 16 with TypeScript, Tailwind CSS, and MDX. Clean architecture with custom AI integration. Explore the [technical details](/about) or see the [live projects](/portfolio).",
  "fuaad": "Fuaad combines finance expertise with full-stack development. He focuses on practical web applications and developer tools. View his [professional background](/about) or [contact him directly](/resume).",
  "rizzk": "RIZZK Calculator provides risk management tools for traders. Built with Python and Streamlit for position sizing and analysis. Try the [live demo](https://rizzk.streamlit.app) or see [more projects](/portfolio).",
  "80/20": "Fuaad applies the 80/20 principle to development: focus on core features that deliver maximum value, shipping MVPs in weeks. Read his [blog post about this approach](/blog/80-20-rule-student-projects) or [view his services](/services).",
  "services": "Fuaad builds web applications, MVPs, custom dashboards, and developer utilities. Focus on practical solutions. See his [service offerings](/services) or [get in touch to discuss your project](/resume).",
  "portfolio": "This portfolio showcases Fuaad's projects including trading tools, web applications, and development frameworks. Browse the [full portfolio](/portfolio) or [download his resume](/resume)."
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
  return "I'm here to help you learn about Fuaad's portfolio! Try asking about the tech stack, projects, or services. Check out his [featured projects](/portfolio) or [learn more about his background](/about).";
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