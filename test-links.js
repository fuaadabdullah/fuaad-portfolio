// Quick test of the link parsing functionality
import React from 'react';

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
      React.createElement('a', {
        key: match.index,
        href: linkUrl,
        className: "text-emerald-400 hover:text-emerald-300 underline",
        target: "_blank",
        rel: "noopener noreferrer"
      }, linkText)
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

// Test the function
const testText = "Check out his [featured projects](/portfolio) or [learn more about his background](/about).";
const result = parseMarkdownLinks(testText);

console.log("Original:", testText);
console.log("Parsed result contains React elements:", React.isValidElement(result) || Array.isArray(result));

// Test with no links
const noLinksText = "This is just plain text.";
const noLinksResult = parseMarkdownLinks(noLinksText);
console.log("No links text:", noLinksText);
console.log("No links result:", noLinksResult);

console.log("✅ Link parsing test completed!");