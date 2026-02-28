"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { MessageCircle, Send, Square, X } from "lucide-react";
import { useChat } from "./useChat";
import { ChatMessage } from "./ChatMessage";

const QUICK_SUGGESTIONS = [
  "Tell me about your services",
  "Show me your projects",
  "What's your background?",
  "How can I contact you?",
];

function TypingIndicator() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : `${prev}.`));
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

function ChatSuggestionList({ onSelect }: { onSelect: (value: string) => void }) {
  return (
    <div className="border-t border-white/10 p-3">
      <div className="text-[11px] text-white/60 mb-2">Quick questions</div>
      <div className="flex flex-wrap gap-2">
        {QUICK_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSelect(suggestion)}
            className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ChatComposerProps {
  input: string;
  onInput: (value: string) => void;
  onSubmit: () => void;
}

function ChatComposer({ input, onInput, onSubmit }: ChatComposerProps) {
  return (
    <div className="border-t border-white/10 p-3 flex gap-2">
      <textarea
        value={input}
        onChange={(event) => onInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          if (event.shiftKey) return;
          event.preventDefault();
          onSubmit();
        }}
        placeholder="Type a question (Enter to send, Shift+Enter for a new line)"
        aria-label="Chat input"
        rows={2}
        className="flex-1 px-3 py-2 rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)] resize-none"
      />
      <button
        type="button"
        onClick={onSubmit}
        disabled={!input.trim()}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-4 py-2 font-semibold text-black hover:bg-[color:var(--color-accent)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Send size={16} aria-hidden="true" />
        Send
      </button>
    </div>
  );
}

interface ChatToggleButtonProps {
  onToggle: () => void;
  buttonRef: React.Ref<HTMLButtonElement>;
  open: boolean;
}

function ChatToggleButton({ onToggle, buttonRef, open }: ChatToggleButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-[45] inline-flex items-center justify-center rounded-full border border-white/10 bg-[color:var(--color-coal)] p-3 shadow-lg shadow-black/40 hover:bg-white/5 transition-colors"
      aria-label="Open chat"
      aria-expanded={open}
    >
      <MessageCircle size={20} aria-hidden="true" />
    </button>
  );
}

interface ChatPanelProps {
  onClose: () => void;
  titleId: string;
}

function ChatPanel({ onClose, titleId }: ChatPanelProps) {
  const { messages, input, setInput, sendMessage, status, cancel } = useChat();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  const shouldAutoScrollRef = useRef(true);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element || !shouldAutoScrollRef.current) return;
    element.scrollTop = element.scrollHeight;
  }, [messages.length]);

  useEffect(() => {
    composerRef.current?.focus();
  }, []);

  return (
    <section
      className="fixed bottom-20 right-6 z-[46] w-[min(24rem,calc(100vw-3rem))] max-h-[70vh] bg-[color:var(--color-coal)] text-white rounded-2xl shadow-2xl shadow-black/50 border border-white/10 flex flex-col overflow-hidden"
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        onClose();
      }}
    >
      <div className="bg-white/5 backdrop-blur p-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[color:var(--color-accent)]" aria-hidden="true" />
          <div className="leading-tight">
            <h2 id={titleId} className="text-sm font-semibold">
              Ask Me Anything
            </h2>
            <p className="text-[11px] text-white/60">Portfolio assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {status === "loading" && (
            <button
              type="button"
              onClick={cancel}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 transition-colors"
            >
              <Square size={14} aria-hidden="true" />
              Stop
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10 transition-colors"
            aria-label="Close chat"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 p-3 space-y-2 overflow-y-auto"
        aria-live="polite"
        aria-busy={status === "loading"}
        onScroll={() => {
          const element = scrollRef.current;
          if (!element) return;
          const remaining = element.scrollHeight - element.scrollTop - element.clientHeight;
          shouldAutoScrollRef.current = remaining < 80;
        }}
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} isUser={msg.from === "user"} />
        ))}

        {status === "loading" && <TypingIndicator />}
      </div>

      {messages.length === 0 && <ChatSuggestionList onSelect={sendMessage} />}

      <ChatComposer input={input} onInput={setInput} onSubmit={sendMessage} />
    </section>
  );
}

export function ChatBox() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();

  const closeChat = () => {
    setOpen(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  return (
    <>
      {!open && (
        <ChatToggleButton onToggle={() => setOpen(true)} buttonRef={triggerRef} open={open} />
      )}
      {open && <ChatPanel onClose={closeChat} titleId={titleId} />}
    </>
  );
}
