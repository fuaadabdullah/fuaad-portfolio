"use client";

import { useState } from "react";
import { Bot } from "lucide-react";

type ChatBoxComponent = typeof import("./ChatBox")["ChatBox"];

export default function LazyChatBox() {
  const [ChatBoxComponent, setChatBoxComponent] = useState<ChatBoxComponent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function loadChat() {
    if (ChatBoxComponent || isLoading) return;

    setIsLoading(true);
    const module = await import("./ChatBox");
    setChatBoxComponent(() => module.ChatBox);
  }

  if (ChatBoxComponent) {
    return <ChatBoxComponent initialOpen />;
  }

  return (
    <button
      type="button"
      onClick={loadChat}
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-[140] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-semibold text-[var(--color-ink)] shadow-lg transition hover:bg-[var(--color-sand)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] sm:right-6"
      aria-label={isLoading ? "Loading chat" : "Open chat"}
      aria-busy={isLoading}
    >
      <Bot size={22} aria-hidden="true" />
    </button>
  );
}
