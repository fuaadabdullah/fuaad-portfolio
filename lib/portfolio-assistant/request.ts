import { NextResponse } from "next/server";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

export async function parsePrompt(
  request: Request
): Promise<{ prompt: string; trimmed: string } | NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ reply: "Invalid JSON body." }, { status: 400 });
  }

  const prompt = isRecord(body) && typeof body.prompt === "string" ? body.prompt : "";
  const trimmed = prompt.trim();
  if (!trimmed) {
    return NextResponse.json({ reply: "Please enter a question." }, { status: 400 });
  }
  if (trimmed.length > 2000) {
    return NextResponse.json(
      { reply: "Please keep prompts under 2000 characters." },
      { status: 400 }
    );
  }

  return { prompt, trimmed };
}

