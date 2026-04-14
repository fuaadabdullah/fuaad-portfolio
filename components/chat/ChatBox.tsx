
"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { Bot, MessageSquareMore, SendHorizonal, X } from "lucide-react";
import clsx from "clsx";
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
    <div className="flex items-center gap-2 text-sm text-zinc-400" role="status" aria-live="polite">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse" style={{animationDelay: "0.2s"}}></div>
        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse" style={{animationDelay: "0.4s"}}></div>
      </div>
      <span>AI is thinking{dots}</span>
    </div>
  );
}

export function ChatBox() {
  const [open, setOpen] = useState(false);
  const { messages, input, setInput, sendMessage, status } = useChat();
  const dialogId = useId();
  const titleId = useId();
  const descriptionId = useId();
  const inputId = useId();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => toggleButtonRef.current?.focus());
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const suggestions = [
    "View projects",
    "Understand tech stack",
    "Discuss services",
    "Contact Fuaad"
  ];

  const handleSuggestionClick = async (suggestion: string) => {
    setInput(suggestion);
    // Small delay to show the text in input before sending
    await new Promise(resolve => setTimeout(resolve, 100));
    sendMessage();
  };

  const handleClose = () => {
    setOpen(false);
    requestAnimationFrame(() => toggleButtonRef.current?.focus());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && status !== "loading") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        ref={toggleButtonRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={clsx(
          "fixed z-[140] bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 sm:right-6",
          "inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition",
          "hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-ink)]"
        )}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-controls={dialogId}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {open ? <X size={22} aria-hidden="true" /> : <Bot size={22} aria-hidden="true" />}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[120] bg-black/55 backdrop-blur-[1px]"
            aria-label="Close chat overlay"
            onClick={handleClose}
          />

          <section
            id={dialogId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className={clsx(
              "fixed z-[130] inset-x-3 top-20 bottom-[calc(env(safe-area-inset-bottom)+5rem)]",
              "flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/95 text-white shadow-2xl",
              "sm:inset-x-auto sm:top-auto sm:right-6 sm:bottom-24 sm:w-[24rem] sm:h-[min(36rem,70vh)]"
            )}
          >
          {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-white/10 bg-zinc-900/80 px-4 py-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
                  <MessageSquareMore size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 id={titleId} className="text-base font-semibold tracking-tight">
                    Ask Me Anything
                  </h2>
                  <p id={descriptionId} className="mt-1 text-xs text-zinc-400">
                    Ask about projects, stack, availability, or how to get in touch.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-white"
                aria-label="Close chat"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

          {/* Messages */}
            <div
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              role="log"
              aria-live="polite"
              aria-relevant="additions text"
            >
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                />
              ))}
              {status === "loading" && (
                <TypingIndicator />
              )}
              <div ref={messagesEndRef} />
            </div>

          {/* Suggestions */}
            {messages.length === 0 && (
              <div className="border-t border-white/10 px-4 py-3">
                <div className="mb-2 text-xs font-medium uppercase tracking-[0.08em] text-zinc-400">
                  Quick questions
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="min-h-10 rounded-full bg-white/6 px-3 py-2 text-left text-sm text-zinc-200 transition hover:bg-white/10"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* Input */}
            <form
              className="border-t border-white/10 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <div className="flex items-end gap-2">
                <input
                  id={inputId}
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a question…"
                  className="min-h-11 flex-1 rounded-2xl border border-white/10 bg-zinc-900 px-3 py-2 text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                  disabled={status === "loading"}
                  aria-label="Chat input"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  {status === "loading" ? "..." : <SendHorizonal size={18} aria-hidden="true" />}
                </button>
              </div>
            </form>
          </section>
        </>
      )}
    </>
  );
}
