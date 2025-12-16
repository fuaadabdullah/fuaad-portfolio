interface ChatMessageProps {
  message: {
    id: string;
    from: 'user' | 'bot';
    text: string;
    timestamp: Date;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.from === 'user';

  return (
    <div
      data-testid="message-container"
      className={`flex items-start gap-2 mb-2 ${isUser ? 'text-right justify-end' : 'text-left'}`}
    >
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-zinc-600 flex items-center justify-center">
          <span className="text-xs">AI</span>
        </div>
      )}
      <div
        data-testid="message-text"
        className={`inline-block p-2 rounded text-sm max-w-xs break-words ${
          isUser
            ? 'bg-emerald-600 text-white'
            : 'bg-zinc-700 text-gray-100'
        }`}
      >
        {message.text || ''}
      </div>
      {isUser && (
        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
          <span className="text-xs">U</span>
        </div>
      )}
    </div>
  );
}
