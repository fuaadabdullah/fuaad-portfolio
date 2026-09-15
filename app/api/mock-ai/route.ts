// Mock API for testing when Ollama isn't available
import { NextResponse } from "next/server";
import { getKnowledgeReply } from "@/lib/ai/knowledge";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const body = await request.json().catch(() => null);
  const prompt: unknown = body?.prompt;

  if (typeof prompt !== "string" || !prompt.trim()) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  console.debug("MOCK API - PROMPT RECEIVED:", prompt);

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const reply = getKnowledgeReply(prompt);

  if (!reply || typeof reply !== 'string') {
    console.error("Invalid mock response");
    return NextResponse.json({ reply: "Sorry, something went wrong." });
  }

  console.debug("MOCK API - REPLY:", reply);

  return NextResponse.json({ reply });
}
