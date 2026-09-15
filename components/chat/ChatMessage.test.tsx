import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatMessage } from './ChatMessage';

describe('ChatMessage Component', () => {
  it('should render user message with correct styling', () => {
    const message = {
      id: '1',
      from: 'user' as const,
      text: 'Hello from user',
      timestamp: new Date(),
    };

    render(<ChatMessage message={message} />);

    const container = screen.getByTestId('message-container');
    expect(container).toHaveClass('text-right', 'justify-end', 'flex', 'items-start', 'gap-2', 'mb-2');

    const messageElement = screen.getByTestId('message-text');
    expect(messageElement).toHaveClass('inline-block', 'p-3', 'rounded-lg', 'bg-[var(--color-accent-soft)]', 'text-[var(--color-sand)]');
    expect(messageElement).toHaveTextContent('Hello from user');
  });

  it('should render bot message with correct styling', () => {
    const message = {
      id: '2',
      from: 'bot' as const,
      text: 'Hello from bot',
      timestamp: new Date(),
    };

    render(<ChatMessage message={message} />);

    const container = screen.getByTestId('message-container');
    expect(container).toHaveClass('text-left', 'flex', 'items-start', 'gap-2', 'mb-2');

    const messageElement = screen.getByTestId('message-text');
    expect(messageElement).toHaveClass('inline-block', 'p-3', 'rounded-lg', 'bg-[var(--color-coal)]', 'text-[var(--color-sand)]');
    expect(messageElement).toHaveTextContent('Hello from bot');
  });

  it('should apply correct background colors', () => {
    const userMessage = {
      id: '1',
      from: 'user' as const,
      text: 'User message',
      timestamp: new Date(),
    };

    const botMessage = {
      id: '2',
      from: 'bot' as const,
      text: 'Bot message',
      timestamp: new Date(),
    };

    const { rerender } = render(<ChatMessage message={userMessage} />);
    let messageDiv = screen.getByText('User message').closest('div');
    expect(messageDiv).toHaveClass('bg-[var(--color-accent-soft)]');

    rerender(<ChatMessage message={botMessage} />);
    messageDiv = screen.getByText('Bot message').closest('div');
    expect(messageDiv).toHaveClass('bg-[var(--color-coal)]');
  });

  it('should render long messages with proper styling', () => {
    const longMessage = {
      id: '3',
      from: 'user' as const,
      text: 'This is a very long message that should still be rendered properly with appropriate styling and should not break the layout in any way.',
      timestamp: new Date(),
    };

    render(<ChatMessage message={longMessage} />);

    const messageElement = screen.getByText(longMessage.text);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('max-w-xs', 'break-words');
  });

  it('should handle empty messages', () => {
    const emptyMessage = {
      id: '4',
      from: 'bot' as const,
      text: '',
      timestamp: new Date(),
    };

    render(<ChatMessage message={emptyMessage} />);

    // Should still render the container
    const container = screen.getByTestId('message-container');
    expect(container).toBeInTheDocument();

    // The message div should be present but empty
    const messageElement = screen.getByTestId('message-text');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveTextContent('');
  });

  it('should handle special characters and emojis', () => {
    const specialMessage = {
      id: '5',
      from: 'user' as const,
      text: 'Hello! 👋 How are you? 😀 Special chars: àáâãäå',
      timestamp: new Date(),
    };

    render(<ChatMessage message={specialMessage} />);

    const messageElement = screen.getByText(specialMessage.text);
    expect(messageElement).toBeInTheDocument();
  });

  it('should parse and render markdown links as clickable elements', () => {
    const linkMessage = {
      id: '6',
      from: 'bot' as const,
      text: 'Check out his [featured projects](/portfolio) or [learn more about his background](/about).',
      timestamp: new Date(),
    };

    render(<ChatMessage message={linkMessage} />);

    // Check that the link elements are rendered
    const portfolioLink = screen.getByRole('link', {
      name: /featured projects\s*\(opens in a new tab\)/i,
    });
    expect(portfolioLink).toHaveAttribute('href', '/portfolio');
    expect(portfolioLink).toHaveAttribute('target', '_blank');
    expect(portfolioLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(portfolioLink).toHaveClass('text-[var(--color-accent)]', 'hover:text-[var(--color-sand)]', 'underline');

    const aboutLink = screen.getByRole('link', {
      name: /learn more about his background\s*\(opens in a new tab\)/i,
    });
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(aboutLink).toHaveAttribute('target', '_blank');
    expect(aboutLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(aboutLink).toHaveClass('text-[var(--color-accent)]', 'hover:text-[var(--color-sand)]', 'underline');

    // Check that the message container contains the expected text content
    const messageElement = screen.getByTestId('message-text');
    expect(messageElement).toHaveTextContent(
      'Check out his featured projects (opens in a new tab) or learn more about his background (opens in a new tab).'
    );
  });

  it('should not render unsafe link targets from model output', () => {
    const unsafeMessage = {
      id: '8',
      from: 'bot' as const,
      text: 'See [script](javascript:void0), [data](data:text/html,hi), [proto](//evil.example), [site](https://fake.example), and [contact](/contact).',
      timestamp: new Date(),
    };

    render(<ChatMessage message={unsafeMessage} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', '/contact');
    expect(screen.getByTestId('message-text')).toHaveTextContent(
      'See script, data, proto, site, and contact (opens in a new tab).'
    );
  });

  it('should normalize the casing of Fuaad in bot replies', () => {
    const message = {
      id: '9',
      from: 'bot' as const,
      text: "You can ask FuaaD directly. FUAAD's projects are listed.",
      timestamp: new Date(),
    };

    render(<ChatMessage message={message} />);

    expect(screen.getByTestId('message-text')).toHaveTextContent("You can ask Fuaad directly. Fuaad's projects are listed.");
  });

  it('should handle messages without links', () => {
    const noLinkMessage = {
      id: '7',
      from: 'bot' as const,
      text: 'This is a message without any links.',
      timestamp: new Date(),
    };

    render(<ChatMessage message={noLinkMessage} />);

    const messageElement = screen.getByTestId('message-text');
    expect(messageElement).toHaveTextContent('This is a message without any links.');
    
    // Should not have any link elements
    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);
  });
});