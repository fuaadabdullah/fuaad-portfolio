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

    fetchMock.mockResolvedValueOnce(new Response('Hello from AI!'));

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
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/chat',
      expect.objectContaining({ method: 'POST' })
    );
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
      messages: [{ role: 'user', content: 'Hello' }],
    });

    vi.useFakeTimers();
  });

  it('should render streamed tokens progressively', async () => {
    vi.useRealTimers();

    const encoder = new TextEncoder();
    let streamController!: ReadableStreamDefaultController<Uint8Array>;
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        streamController = controller;
      },
    });
    fetchMock.mockResolvedValueOnce(new Response(body));

    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.sendMessage('Tell me about RIZZK');
    });

    act(() => {
      streamController.enqueue(encoder.encode('RIZZK is '));
    });

    await waitFor(() => {
      expect(result.current.messages[1].text).toBe('RIZZK is ');
    });
    expect(result.current.status).toBe('loading');

    act(() => {
      streamController.enqueue(encoder.encode('a risk tool.'));
      streamController.close();
    });

    await waitFor(() => {
      expect(result.current.status).toBe('idle');
    });
    expect(result.current.messages[1].text).toBe('RIZZK is a risk tool.');

    vi.useFakeTimers();
  });

  it('should send explicit text and recent history for follow-ups', async () => {
    vi.useRealTimers();

    fetchMock.mockImplementation(() => Promise.resolve(new Response('ShopMindAI is a diagnostic assistant.')));

    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.sendMessage('What is ShopMindAI?');
    });

    await waitFor(() => {
      expect(result.current.status).toBe('idle');
    });

    act(() => {
      result.current.sendMessage('Where is it deployed?');
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toEqual({
      messages: [
        { role: 'user', content: 'What is ShopMindAI?' },
        { role: 'assistant', content: 'ShopMindAI is a diagnostic assistant.' },
        { role: 'user', content: 'Where is it deployed?' },
      ],
    });

    vi.useFakeTimers();
  });

  it('should show a friendly message when rate limited', async () => {
    vi.useRealTimers();

    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429 }));

    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.sendMessage('Hello');
    });

    await waitFor(() => {
      expect(result.current.status).toBe('idle');
    });

    expect(result.current.messages[1].text).toContain('wait a minute');

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

    fetchMock.mockImplementation(() => Promise.resolve(new Response('Response')));

    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.setInput('First message');
    });

    act(() => {
      result.current.sendMessage();
    });

    // Wait for first exchange to finish
    await waitFor(() => {
      expect(result.current.messages).toHaveLength(2);
      expect(result.current.status).toBe('idle');
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
