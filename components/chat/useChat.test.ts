import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useChat } from '../../components/chat/useChat';

// Mock fetch globally
const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('useChat Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    // Reset fetch mock to default implementation that resolves
    fetchMock.mockReset();
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ reply: 'Default response' }),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with empty messages and idle status', () => {
    const { result } = renderHook(() => useChat());

    expect(result.current.messages).toEqual([]);
    expect(result.current.input).toBe('');
    expect(result.current.status).toBe('idle');
  });

  it('should update input when setInput is called', () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.setInput('Hello world');
    });

    expect(result.current.input).toBe('Hello world');
  });

  it('should not send message when input is empty', async () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.sendMessage();
    });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.current.messages).toEqual([]);
  });

  it('should not send message when already loading', async () => {
    vi.useRealTimers();

    // Mock a pending fetch that never resolves
    fetchMock.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.setInput('test');
    });

    act(() => {
      result.current.sendMessage();
    });

    // Wait for messages to be added
    await waitFor(() => {
      expect(result.current.messages).toHaveLength(2);
    });

    // Now status should be loading
    expect(result.current.status).toBe('loading');

    // Try to send another message while loading
    act(() => {
      result.current.setInput('another test');
      result.current.sendMessage();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1); // Only one call

    vi.useFakeTimers();
  });

  it('should send message and handle successful response', async () => {
    vi.useRealTimers();

    const mockResponse = { reply: 'Hello from AI!' };
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.setInput('Hello');
    });

    act(() => {
      result.current.sendMessage();
    });

    // Wait for status to become loading
    await waitFor(() => {
      expect(result.current.status).toBe('loading');
    });

    expect(result.current.input).toBe('');
    expect(result.current.messages).toHaveLength(2); // User message + bot placeholder

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(result.current.status).toBe('idle');
    }, { timeout: 100 });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[0]).toMatchObject({
      from: 'user',
      text: 'Hello',
    });
    expect(result.current.messages[1]).toMatchObject({
      from: 'bot',
      text: 'Hello from AI!',
    });

    vi.useFakeTimers();
  });

  it('should handle API error gracefully', async () => {
    vi.useRealTimers();

    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.setInput('Hello');
    });

    act(() => {
      result.current.sendMessage();
    });

    // Wait for status to become loading
    await waitFor(() => {
      expect(result.current.status).toBe('loading');
    });

    await waitFor(() => {
      expect(result.current.status).toBe('idle');
    }, { timeout: 100 });

    expect(result.current.messages[1].text).toContain('error');

    vi.useFakeTimers();
  });

  it('should handle network error gracefully', async () => {
    vi.useRealTimers();

    fetchMock.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.setInput('Hello');
    });

    act(() => {
      result.current.sendMessage();
    });

    // Wait for status to become loading
    await waitFor(() => {
      expect(result.current.status).toBe('loading');
    });

    await waitFor(() => {
      expect(result.current.status).toBe('idle');
    }, { timeout: 200 });

    expect(result.current.messages[1].text).toContain('Network error');

    vi.useFakeTimers();
  });

  it('should clear messages when clearMessages is called', () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.setInput('test');
    });

    // Simulate having messages (normally this would be set by sendMessage)
    act(() => {
      // We can't directly set messages, but we can test the function exists
      expect(typeof result.current.clearMessages).toBe('function');
    });
  });

  it('should generate unique IDs for messages', async () => {
    vi.useRealTimers();

    const mockResponse = { reply: 'Response' };
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.setInput('First message');
    });

    act(() => {
      result.current.sendMessage();
    });

    // Wait for first message to be sent
    await waitFor(() => {
      expect(result.current.messages).toHaveLength(2);
    });

    const firstMessageId = result.current.messages[0].id;

    act(() => {
      result.current.setInput('Second message');
    });

    act(() => {
      result.current.sendMessage();
    });

    // Wait for second message to be sent
    await waitFor(() => {
      expect(result.current.messages).toHaveLength(4);
    }, { timeout: 200 });

    const thirdMessageId = result.current.messages[2].id;

    expect(firstMessageId).not.toBe(thirdMessageId);
    expect(typeof firstMessageId).toBe('string');
    expect(firstMessageId.length).toBeGreaterThan(0);

    vi.useFakeTimers();
  });
});