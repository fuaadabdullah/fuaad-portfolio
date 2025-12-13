interface ChatMessageProps {
  message: { from: "user" | "bot"; text: string };
  isUser: boolean;
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <div
      className={`${
        isUser ? "text-right" : "text-left"
      } flex items-start gap-2`}
    >
      <div
        className={`inline-block p-2 rounded ${
          isUser ? "bg-emerald-600" : "bg-zinc-700"
        } text-sm`}
      >
        {message.text}
      </div>
    </div>
  );
}
