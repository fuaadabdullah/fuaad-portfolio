import type { ChatMsg } from "./useChat";

interface ChatMessageProps {
  message: ChatMsg;
  isUser: boolean;
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap break-words border ${
          isUser
            ? "bg-[color:var(--color-accent)]/15 border-[color:var(--color-accent)]/25 text-white"
            : "bg-white/5 border-white/10 text-white/90"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
