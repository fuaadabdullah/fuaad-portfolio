import { useState } from "react";

export function useChat() {
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  async function sendMessage() {
    if (!input.trim() || status === "loading") return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setInput("");
    setStatus("loading");

    // Add an empty bot message that we'll update
    const botMessageIndex = messages.length + 1;
    setMessages((prev) => [...prev, { from: "bot", text: "" }]);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText }),
      });

      if (!res.ok) {
        throw new Error(`Network error: ${res.status}`);
      }

      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        throw new Error("Invalid response format");
      }

      const { reply } = data;
      if (!reply || typeof reply !== 'string') {
        throw new Error("Invalid reply format");
      }

      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[botMessageIndex] = { from: "bot", text: reply };
        return newMessages;
      });
    } catch (err) {
      console.error("Chat error:", err);
      
      const errorMessage = err instanceof Error && err.message?.includes("Network error")
        ? "Oops — can't reach the assistant right now. Check your connection."
        : err instanceof Error && err.message?.includes("Invalid")
        ? "Oops — received an invalid response. Try again."
        : "Oops — something went wrong 😕 Try again.";

      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[botMessageIndex] = {
          from: "bot",
          text: errorMessage,
        };
        return newMessages;
      });
    } finally {
      setStatus("idle");
    }
  }

  return {
    messages,
    input,
    setInput,
    sendMessage,
    status,
  };
}
