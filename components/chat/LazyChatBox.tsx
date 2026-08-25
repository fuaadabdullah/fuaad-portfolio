"use client";

import { useState } from "react";

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
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-[140] inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-ink)] sm:right-6"
      aria-label={isLoading ? "Loading chat" : "Open chat"}
      aria-busy={isLoading}
    >
      AI
    </button>
  );
}
