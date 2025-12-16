import { useState, useCallback } from 'react';

interface ChatMessage {
  id: string;
  from: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface UseChatReturn {
  messages: ChatMessage[];
  input: string;
  status: 'idle' | 'loading';
  setInput: (text: string) => void;
  sendMessage: () => Promise<void>;
  clearMessages: () => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const sendMessage = useCallback(async () => {
    if (!input.trim() || status === 'loading') return;

    const userText = input.trim();
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

    // Optimistic update
    setMessages(prev => [...prev, userMessage, botPlaceholder]);
    setInput('');
    setStatus('loading');

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText })
      });

      let reply = '';
      if (response.ok) {
        const data = await response.json();
        reply = data.reply || 'I received your message.';
      } else {
        reply = 'Sorry, I encountered an error. Please try again.';
      }

      // Update bot message with reply
      setMessages(prev => prev.map(msg =>
        msg.id === botPlaceholder.id
          ? { ...msg, text: reply }
          : msg
      ));

    } catch (error) {
      console.error('Failed to send message:', error);

      // Update with error message
      setMessages(prev => prev.map(msg =>
        msg.id === botPlaceholder.id
          ? {
              ...msg,
              text: 'Network error. Please check your connection.'
            }
          : msg
      ));
    } finally {
      setStatus('idle');
    }
  }, [input, status]);

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
