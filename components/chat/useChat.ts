import { useRef, useState } from "react";

export type ChatMsg = { id: string; from: "user" | "bot"; text: string };

function newId(): string {
  // crypto.randomUUID is available in modern browsers; keep a fallback for tests.
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function isAbortError(err: unknown): boolean {
  return (
    (err instanceof DOMException && err.name === "AbortError") ||
    (err instanceof Error && err.name === "AbortError")
  );
}

function replaceMsgTextById(prev: ChatMsg[], id: string, text: string): ChatMsg[] {
  const idx = prev.findIndex((m) => m.id === id);
  if (idx === -1) return prev;
  const next = [...prev];
  next[idx] = { ...next[idx], text };
  return next;
}

function parseReplyJson(json: unknown): string {
  if (typeof json !== "object" || json === null) {
    throw new Error("Invalid response format");
  }
  const reply = (json as { reply?: unknown }).reply;
  if (typeof reply !== "string" || reply.trim().length === 0) {
    throw new Error("Invalid reply format");
  }
  return reply;
}

function toUserFacingError(err: unknown): string {
  if (isAbortError(err)) return "Canceled.";
  if (err instanceof Error && err.message.includes("Network error")) {
    return "Oops — can't reach the assistant right now. Check your connection.";
  }
  if (err instanceof Error && err.message.includes("Invalid")) {
    return "Oops — received an invalid response. Try again.";
  }
  return "Oops — something went wrong. Try again.";
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const abortRef = useRef<AbortController | null>(null);

  function cancel() {
    abortRef.current?.abort();
  }

  async function sendMessage(text?: string) {
    const userText = (text ?? input).trim();
    if (!userText) return;

    // If a request is in-flight, cancel it and allow the new message through.
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const userMsgId = newId();
    const botMsgId = newId();

    setMessages((prev) => [
      ...prev,
      { id: userMsgId, from: "user", text: userText },
      { id: botMsgId, from: "bot", text: "" },
    ]);
    setInput("");
    setStatus("loading");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText }),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`Network error: ${res.status}`);
      }

      const data = (await res.json()) as unknown;
      const reply = parseReplyJson(data);

      setMessages((prev) => {
        return replaceMsgTextById(prev, botMsgId, reply);
      });
    } catch (err) {
      const errorMessage = toUserFacingError(err);

      setMessages((prev) => {
        return replaceMsgTextById(prev, botMsgId, errorMessage);
      });
    } finally {
      // Only clear loading if this is still the active request.
      if (abortRef.current === controller) {
        abortRef.current = null;
        setStatus("idle");
      }
    }
  }

  return {
    messages,
    input,
    setInput,
    sendMessage,
    status,
    cancel,
  };
}
