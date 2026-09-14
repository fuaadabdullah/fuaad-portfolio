import { useState, useCallback, useEffect, useRef } from 'react';

interface ChatMessage {
  id: string;
  from: 'user' | 'bot';
  text: string;
  timestamp: Date;
  failed?: boolean;
}

interface UseChatReturn {
  messages: ChatMessage[];
  input: string;
  status: 'idle' | 'loading';
  setInput: (text: string) => void;
  sendMessage: (text?: string) => Promise<void>;
  clearMessages: () => void;
}

export const CHAT_ENDPOINT = '/api/chat';
export const MAX_INPUT_CHARS = 500;
const HISTORY_LIMIT = 4; // prior messages sent so follow-up questions have context
const MAX_HISTORY_REPLY_CHARS = 1200;

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  // A ref (not state) guards against double sends from the same render
  const inFlight = useRef<AbortController | null>(null);

  useEffect(() => () => inFlight.current?.abort(), []);

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const sendMessage = useCallback(async (text?: string) => {
    const userText = (text ?? input).trim().slice(0, MAX_INPUT_CHARS);
    if (!userText || inFlight.current) return;

    const history = messages
      .filter(msg => msg.text && !msg.failed)
      .slice(-HISTORY_LIMIT)
      .map(msg => ({
        role: msg.from === 'user' ? 'user' : 'assistant',
        content: msg.text.slice(0, msg.from === 'user' ? MAX_INPUT_CHARS : MAX_HISTORY_REPLY_CHARS)
      }));

    const userMessage: ChatMessage = {
      id: generateId(),
      from: 'user',
      text: userText,
      timestamp: new Date()
    };

    const botPlaceholder: ChatMessage = {
      id: generateId(),
      from: 'bot',
      text: '',
      timestamp: new Date()
    };

    const updateBot = (reply: string, failed = false) =>
      setMessages(prev => prev.map(msg =>
        msg.id === botPlaceholder.id ? { ...msg, text: reply, failed } : msg
      ));

    const controller = new AbortController();
    inFlight.current = controller;

    // Optimistic update
    setMessages(prev => [...prev, userMessage, botPlaceholder]);
    setInput('');
    setStatus('loading');

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history, { role: 'user', content: userText }] }),
        signal: controller.signal
      });

      if (!response.ok) {
        updateBot(
          response.status === 429
            ? "You're sending messages quickly. Please wait a minute and try again."
            : 'Sorry, I encountered an error. Please try again.',
          true
        );
        return;
      }

      // Replies stream in token by token
      let reply = '';
      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          reply += decoder.decode(value, { stream: true });
          updateBot(reply);
        }
        reply += decoder.decode();
      } else {
        reply = await response.text();
      }

      updateBot(reply.trim() || 'I received your message.');
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error('Failed to send message:', error);
      updateBot('Network error. Please check your connection.', true);
    } finally {
      inFlight.current = null;
      setStatus('idle');
    }
  }, [input, messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    input,
    status,
    setInput,
    sendMessage,
    clearMessages
  };
}
