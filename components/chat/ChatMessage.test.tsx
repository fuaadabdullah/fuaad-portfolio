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
    expect(messageElement).toHaveClass('inline-block', 'p-2', 'rounded', 'bg-emerald-600', 'text-white');
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
    expect(messageElement).toHaveClass('inline-block', 'p-2', 'rounded', 'bg-zinc-700', 'text-gray-100');
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
    expect(messageDiv).toHaveClass('bg-emerald-600');

    rerender(<ChatMessage message={botMessage} />);
    messageDiv = screen.getByText('Bot message').closest('div');
    expect(messageDiv).toHaveClass('bg-zinc-700');
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
});