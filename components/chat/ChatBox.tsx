
"use client";

import React, { useState } from "react";
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
    <div className="flex items-center gap-2 text-sm text-zinc-400">
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

  const suggestions = [
    "Tell me about your services",
    "Show me your projects",
    "What's your background?",
    "How can I contact you?"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    // Small delay to show the text in input before sending
    setTimeout(() => {
      sendMessage();
    }, 100);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-500 transition"
      >
        {open ? "✖" : "💬"}
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 max-h-[65vh] bg-zinc-900 text-white rounded-lg shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-zinc-800 p-3 text-center font-bold">
            Ask Me Anything
          </div>

          {/* Messages */}
          <div className="flex-1 p-2 space-y-2 overflow-y-auto">
            {messages.map((msg, i) => (
              <ChatMessage
                key={i}
                message={msg}
                isUser={msg.from === "user"}
              />
            ))}
            {status === "loading" && (
              <TypingIndicator />
            )}
          </div>

          {/* Suggestions */}
          {messages.length === 0 && (
            <div className="border-t border-zinc-800 p-2">
              <div className="text-xs text-zinc-400 mb-2">Quick questions:</div>
              <div className="flex flex-wrap gap-1">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs px-2 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-zinc-300 transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-zinc-800 p-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && status !== "loading" && sendMessage()}
              placeholder="Type a question…"
              className="flex-1 px-2 py-1 rounded bg-zinc-800 text-white"
              disabled={status === "loading"}
            />
            <button
              onClick={sendMessage}
              disabled={status === "loading"}
              className="px-3 bg-emerald-500 text-white rounded hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
