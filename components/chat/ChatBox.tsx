
"use client";

import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, Square, X } from "lucide-react";
import { useChat } from "./useChat";
import { ChatMessage } from "./ChatMessage";

// Typing indicator component
function TypingIndicator() {
  const [dots, setDots] = useState("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs text-white/60">
      <div className="flex gap-1" aria-hidden="true">
        <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
        <div
          className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
      <span>AI is thinking{dots}</span>
    </div>
  );
}

function ChatToggleButton({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center rounded-full border border-white/10 bg-[color:var(--color-coal)] p-3 shadow-lg shadow-black/40 hover:bg-white/5 transition-colors"
      aria-label={open ? "Close chat" : "Open chat"}
      aria-expanded={open}
    >
      {open ? (
        <X size={20} aria-hidden="true" />
      ) : (
        <MessageCircle size={20} aria-hidden="true" />
      )}
    </button>
  );
}

function ChatPanel() {
  const { messages, input, setInput, sendMessage, status, cancel } = useChat();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const shouldAutoScrollRef = useRef(true);

  const suggestions = [
    "Tell me about your services",
    "Show me your projects",
    "What's your background?",
    "How can I contact you?",
  ];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (!shouldAutoScrollRef.current) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  return (
    <section
      className="fixed bottom-20 right-6 z-50 w-[min(24rem,calc(100vw-3rem))] max-h-[70vh] bg-[color:var(--color-coal)] text-white rounded-2xl shadow-2xl shadow-black/50 border border-white/10 flex flex-col overflow-hidden"
      aria-label="Portfolio assistant chat"
    >
      <div className="bg-white/5 backdrop-blur p-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full bg-[color:var(--color-accent)]"
            aria-hidden="true"
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold">Ask Me Anything</p>
            <p className="text-[11px] text-white/60">Portfolio assistant</p>
          </div>
        </div>

        {status === "loading" ? (
          <button
            type="button"
            onClick={() => cancel()}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 transition-colors"
          >
            <Square size={14} aria-hidden="true" />
            Stop
          </button>
        ) : null}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 p-3 space-y-2 overflow-y-auto"
        aria-live="polite"
        aria-busy={status === "loading"}
        onScroll={() => {
          const el = scrollRef.current;
          if (!el) return;
          const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
          shouldAutoScrollRef.current = remaining < 80;
        }}
      >
        {messages.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/70">
            Ask about projects, services, or anything on the site.
          </div>
        ) : null}

        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} isUser={msg.from === "user"} />
        ))}

        {status === "loading" ? <TypingIndicator /> : null}
      </div>

      {messages.length === 0 ? (
        <div className="border-t border-white/10 p-3">
          <div className="text-[11px] text-white/60 mb-2">Quick questions</div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => sendMessage(suggestion)}
                className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="border-t border-white/10 p-3 flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            if (e.shiftKey) return;
            e.preventDefault();
            sendMessage();
          }}
          placeholder="Type a question (Enter to send, Shift+Enter for a new line)"
          rows={2}
          className="flex-1 px-3 py-2 rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)] resize-none"
        />
        <button
          type="button"
          onClick={() => sendMessage()}
          disabled={!input.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-4 py-2 font-semibold text-black hover:bg-[color:var(--color-accent)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={16} aria-hidden="true" />
          Send
        </button>
      </div>
    </section>
  );
}

export function ChatBox() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ChatToggleButton open={open} onToggle={() => setOpen((v) => !v)} />
      {open ? <ChatPanel /> : null}
    </>
  );
}
