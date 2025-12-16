import React from 'react';

interface ChatMessageProps {
  message: {
    id: string;
    from: 'user' | 'bot';
    text: string;
    timestamp: Date;
  };
}

// Simple function to convert markdown-style links to HTML links
function parseMarkdownLinks(text: string): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Add the link
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <a
        key={match.index}
        href={linkUrl}
        className="text-emerald-400 hover:text-emerald-300 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkText}
      </a>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
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
        {parseMarkdownLinks(message.text || '')}
      </div>
      {isUser && (
        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
          <span className="text-xs">U</span>
        </div>
      )}
    </div>
  );
}
