import { NextResponse } from "next/server";
import { siteFacts, faq } from "@/data/portfolio_knowledge";
import { blogContent, projectContent } from "@/data/site_content";

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

async function fetchWithTimeout(url: string, opts: any = {}, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

// Rate limiter: allow ~2 requests per second
let lastRequestTime = 0;

export async function POST(request: Request) {
  const now = Date.now();
  if (now - lastRequestTime < 500) {
    return NextResponse.json({ reply: "⌛ Please wait a moment..." });
  }
  lastRequestTime = now;

  const { prompt } = await request.json();
  const base = "http://localhost:11434";

  console.debug("PROMPT RECEIVED:", prompt);

  const lower = prompt.toLowerCase();

  // FAQ
  const matchedFaq = faq.find(f =>
    f.trigger.some(t => lower.includes(t))
  );
  const faqText = matchedFaq ? `FAQ Answer: ${matchedFaq.answer}` : "";

  // blog matches
  const matchedBlog = blogContent.find(b =>
    lower.includes(b.slug) || lower.includes(b.title.toLowerCase())
  );
  const blogText = matchedBlog
    ? `Blog: ${matchedBlog.title}\nSummary: ${matchedBlog.summary}\nKey points: ${matchedBlog.keyPoints.join(', ')}\n`
    : "";

  // project matches
  const matchedProject = projectContent.find(p =>
    lower.includes(p.slug) || lower.includes(p.title.toLowerCase())
  );
  const projectText = matchedProject
    ? `Project: ${matchedProject.title}\nSummary: ${matchedProject.summary}\nKey points: ${matchedProject.keyPoints.join(', ')}\n`
    : "";

  const fullContext = `
Portfolio Facts:
${siteFacts}

${faqText}

${blogText}

${projectText}

User: ${prompt}
Assistant:
`;

  console.debug("Sending to LLM:", fullContext);

  try {
    const res = await fetchWithTimeout(`${base}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "tinyllama:1.1b",
        messages: [
          { role: "system", content: "You are a helpful assistant about this portfolio site." },
          { role: "user", content: fullContext },
        ],
      }),
    }, 8000); // 8 seconds timeout

    console.debug("Response status:", res.status);
    console.debug("Raw body:", await res.clone().text());

    if (!res.ok) {
      console.error("LLM API ERROR:", res.status, res.statusText);
      throw new Error(`LLM API returned ${res.status}: ${res.statusText}`);
    }

    let json;
    try {
      json = await res.json();
    } catch (e) {
      console.error("JSON parsing error:", e);
      return NextResponse.json({ reply: "I couldn't parse the AI response 🤖" });
    }

    const reply = json.response ?? json;

    if (!reply || typeof reply !== 'string') {
      console.error("Invalid LLM response format:", json);
      return NextResponse.json({ reply: "I received an invalid response from the AI 🤖" });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("API ERROR:", err);

    // Fail fast with user-friendly fallback
    if (err instanceof Error && err.name === 'AbortError') {
      return NextResponse.json({ reply: "The AI service is taking too long to respond. Please try again." });
    }

    if (err instanceof Error && err.message.includes('fetch')) {
      // Fallback to mock response when Ollama is not available
      const reply = getMockResponse(prompt);
      return NextResponse.json({ reply });
    }

    return NextResponse.json({ reply: "Sorry, something went wrong with the AI assistant." });
  }
}