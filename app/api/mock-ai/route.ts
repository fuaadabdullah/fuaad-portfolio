// Mock API for testing when Ollama isn't available
import { NextResponse } from "next/server";
import { getKnowledgeReply } from "@/lib/ai/knowledge";

export async function POST(request: Request) {
  const { prompt } = await request.json();

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
