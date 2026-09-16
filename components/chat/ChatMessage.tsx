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

// TinyLlama is a 1.1b model and garbles proper nouns it was handed verbatim
// ("GobleinOS"), so restore the spellings the site data uses. Each pattern has
// to stay narrow enough not to rewrite ordinary words: RIZZK requires the z, so
// the word "risk" in "RIZZK is a risk tool" survives.
const PROPER_NOUNS: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bfuaad\b/gi, "Fuaad"],
  [/\bgobl[a-z]{0,3}n\s*os\b/gi, "GoblinOS"],
  [/\briz+k\b/gi, "RIZZK"],
  [/\bshop\s*mind\s*ai\b/gi, "ShopMindAI"],
  [/\bgrade\s*m\s*-?\s*8\b/gi, "GradeM8"],
  [/\belb[ae]y\b/gi, "Elbey"],
  [/\btiny\s*l+ama\b/gi, "TinyLlama"],
];

function normalizeProperNouns(text: string): string {
  return PROPER_NOUNS.reduce(
    (result, [pattern, canonical]) => result.replace(pattern, canonical),
    text,
  );
}

// Simple function to convert markdown-style links to HTML links. `normalize` is
// applied to visible text only — never to a link target, since rewriting
// "/portfolio/rizzk-calculator" would break the href.
function parseMarkdownLinks(
  text: string,
  normalize: (value: string) => string = (value) => value,
): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(normalize(text.slice(lastIndex, match.index)));
    }

    // Add the link, or just its text when the target isn't safe
    const linkText = normalize(match[1]);
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
    parts.push(normalize(text.slice(lastIndex)));
  }

  return parts.length > 0 ? parts : normalize(text);
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.from === 'user';
  // Visitors' own wording is left alone; only model output is normalized.
  const text = message.text || '';

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
        {parseMarkdownLinks(text, isUser ? undefined : normalizeProperNouns)}
      </div>
      {isUser && (
        <div className="w-6 h-6 shrink-0 rounded-full bg-[var(--color-accent)] text-[var(--color-ink)] flex items-center justify-center">
          <span className="text-xs">U</span>
        </div>
      )}
    </div>
  );
}
