import React from 'react';

interface ChatMessageProps {
  message: {
    id: string;
    from: 'user' | 'bot';
    text: string;
    timestamp: Date;
  };
}

// Replies come from a language model that can invent or be steered into external URLs,
// so only site-relative paths and mailto links become clickable.
function getSafeHref(url: string): string | null {
  const href = url.trim();
  if (/^\/(?![/\\])/.test(href)) return href;
  if (/^mailto:/i.test(href)) return href;
  return null;
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

    // Add the link, or just its text when the target isn't safe
    const linkText = match[1];
    const linkUrl = getSafeHref(match[2]);
    parts.push(
      linkUrl ? (
        <a
          key={match.index}
          href={linkUrl}
          className="text-[var(--color-accent)] hover:text-[var(--color-sand)] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText}
          <span className="sr-only">{" (opens in a new tab)"}</span>
        </a>
      ) : (
        linkText
      )
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
  // TinyLlama often mangles the name's casing ("FuaaD")
  const text = isUser ? message.text : (message.text || '').replace(/\bfuaad\b/gi, 'Fuaad');

  return (
    <div
      data-testid="message-container"
      className={`flex items-start gap-2 mb-2 ${isUser ? 'text-right justify-end' : 'text-left'}`}
    >
      {!isUser && (
        <div className="w-6 h-6 shrink-0 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center">
          <span className="text-xs">AI</span>
        </div>
      )}
      <div
        data-testid="message-text"
        className={`inline-block min-w-0 p-3 rounded-lg text-sm max-w-xs break-words whitespace-pre-wrap ${
          isUser
            ? 'bg-[var(--color-accent-soft)] text-[var(--color-sand)]'
            : 'bg-[var(--color-coal)] text-[var(--color-sand)]'
        }`}
      >
        {parseMarkdownLinks(text || '')}
      </div>
      {isUser && (
        <div className="w-6 h-6 shrink-0 rounded-full bg-[var(--color-accent)] text-[var(--color-ink)] flex items-center justify-center">
          <span className="text-xs">U</span>
        </div>
      )}
    </div>
  );
}
