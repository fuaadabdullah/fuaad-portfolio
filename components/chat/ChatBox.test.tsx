import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatBox } from './ChatBox';
import { useChat } from './useChat';

// Mock the useChat hook at the module level
vi.mock('./useChat');

describe('ChatBox Component', () => {
  let mockReturnValue: any;

  beforeEach(() => {
    mockReturnValue = {
      messages: [],
      input: '',
      status: 'idle',
      setInput: vi.fn(),
      sendMessage: vi.fn(),
      clearMessages: vi.fn(),
    };

    vi.mocked(useChat).mockReturnValue(mockReturnValue);
  });

  it('should render toggle button', () => {
    render(<ChatBox />);

    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('should not show chat initially', () => {
    render(<ChatBox />);

    expect(screen.queryByText('Ask Me Anything')).not.toBeInTheDocument();
  });

  it('should show chat when toggle is clicked', () => {
    render(<ChatBox />);

    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(toggleButton);

    expect(screen.getByRole('dialog', { name: /ask me anything/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close chat/i })).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('should hide chat when toggle is clicked again', () => {
    render(<ChatBox />);

    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(toggleButton); // Open
    fireEvent.click(toggleButton); // Close

    expect(screen.queryByText('Ask Me Anything')).not.toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('should show suggestions when no messages exist', () => {
    render(<ChatBox />);

    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(toggleButton);

    expect(screen.getByText('Quick questions')).toBeInTheDocument();
    expect(screen.getByText('Discuss services')).toBeInTheDocument();
  });

  it('should not show suggestions when messages exist', () => {
    mockReturnValue.messages = [
      { id: '1', from: 'user', text: 'Hello', timestamp: new Date() },
    ];

    render(<ChatBox />);

    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(toggleButton);

    expect(screen.queryByText('Try asking:')).not.toBeInTheDocument();
  });

  it('should call setInput and sendMessage when suggestion is clicked', async () => {
    render(<ChatBox />);

    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(toggleButton);

    const suggestion = screen.getByText('Discuss services');
    fireEvent.click(suggestion);

    expect(mockReturnValue.setInput).toHaveBeenCalledWith('Discuss services');
    await waitFor(() => {
      expect(mockReturnValue.sendMessage).toHaveBeenCalled();
    });
  });

  it('should render input field and send button', () => {
    render(<ChatBox />);

    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(toggleButton);

    const input = screen.getByLabelText('Chat input');
    const sendButton = screen.getByRole('button', { name: /send message/i });

    expect(input).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });

  it('should call setInput when typing in input field', () => {
    render(<ChatBox />);

    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(toggleButton);

    const input = screen.getByLabelText('Chat input');
    fireEvent.change(input, { target: { value: 'Hello world' } });

    expect(mockReturnValue.setInput).toHaveBeenCalledWith('Hello world');
  });

  it('should call sendMessage when Enter is pressed', () => {
    render(<ChatBox />);

    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(toggleButton);

    const input = screen.getByLabelText('Chat input');
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockReturnValue.sendMessage).toHaveBeenCalled();
  });

  it('should call sendMessage when send button is clicked', () => {
    render(<ChatBox />);

    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(toggleButton);

    const sendButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(sendButton);

    expect(mockReturnValue.sendMessage).toHaveBeenCalled();
  });

  it('should disable input and send button when loading', () => {
    mockReturnValue.status = 'loading';

    render(<ChatBox />);

    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(toggleButton);

    const input = screen.getByLabelText('Chat input');
    const sendButton = screen.getByRole('button', { name: /send message/i });

    expect(input).toBeDisabled();
    expect(sendButton).toBeDisabled();
    expect(sendButton).toHaveTextContent('...');
  });

  it('should show typing indicator when loading', () => {
    mockReturnValue.status = 'loading';

    render(<ChatBox />);

    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(toggleButton);

    expect(screen.getByText(/AI is thinking/)).toBeInTheDocument();
  });

  it('should render messages when they exist', () => {
    mockReturnValue.messages = [
      { id: '1', from: 'user', text: 'Hello', timestamp: new Date() },
      { id: '2', from: 'bot', text: 'Hi there!', timestamp: new Date() },
    ];

    render(<ChatBox />);

    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(toggleButton);

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('should have proper ARIA labels and accessibility', () => {
    render(<ChatBox />);

    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(toggleButton);

    expect(screen.getByLabelText('Chat input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });
});
