import { NextResponse } from "next/server";
import { siteFacts, faq } from "@/data/portfolio_knowledge";
import { blogContent, projectContent } from "@/data/site_content";
import { getOllamaConfig } from "@/lib/ollama";
import { buildAssistantContext } from "@/lib/portfolio-assistant/context";
import { fallbackMockReply } from "@/lib/portfolio-assistant/mock";
import { callOllamaChat } from "@/lib/portfolio-assistant/ollamaChat";
import { parsePrompt } from "@/lib/portfolio-assistant/request";
import { isRateLimited } from "@/lib/portfolio-assistant/rateLimit";

function isAbortError(err: unknown): boolean {
  return err instanceof Error && err.name === "AbortError";
}

function isNetworkError(err: unknown): boolean {
  return (
    err instanceof TypeError ||
    (err instanceof Error && err.message.toLowerCase().includes("fetch"))
  );
}

export async function POST(request: Request) {
  if (isRateLimited()) {
    return NextResponse.json({ reply: "⌛ Please wait a moment..." });
  }

  const parsed = await parsePrompt(request);
  if (parsed instanceof NextResponse) return parsed;

  const { prompt, trimmed } = parsed;
  const ollama = getOllamaConfig(process.env);

  const context = buildAssistantContext({
    prompt,
    siteFacts,
    faq,
    blogContent,
    projectContent,
  });

  try {
    const reply = await callOllamaChat({
      ollama,
      system: "You are a helpful assistant about this portfolio site.",
      prompt: context,
    });
    return NextResponse.json({ reply });
  } catch (err) {
    if (isAbortError(err)) {
      return NextResponse.json(
        {
          reply:
            "The AI service is taking too long to respond. Please try again.",
        },
        { status: 504 }
      );
    }

    if (isNetworkError(err)) {
      return NextResponse.json({ reply: fallbackMockReply(trimmed) });
    }

    console.error("AI route error:", err);
    return NextResponse.json(
      { reply: "Sorry, something went wrong with the AI assistant." },
      { status: 500 }
    );
  }
}

