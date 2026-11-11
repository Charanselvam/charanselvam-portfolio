'use client';

import { createContext, useContext } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import type { UIMessage } from 'ai';
import type { QASource, QACard } from '@/lib/qa';

type SendFn = (msg: { text: string }) => Promise<void>;

interface ChatCtxValue {
  messages: UIMessage[];
  sendMessage: SendFn;
  sendInstant: (text: string, answer: string, sources: QASource[], card?: QACard) => void;
  status: string;
}

const ChatCtx = createContext<ChatCtxValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  function sendInstant(text: string, answer: string, sources: QASource[], card?: QACard) {
    const ts = Date.now();
    const userMsg = {
      id: `qi-u-${ts}`,
      role: 'user' as const,
      parts: [{ type: 'text' as const, text }],
    };
    const botParts: unknown[] = [{ type: 'text' as const, text: answer }];
    if (card) {
      const toolName = card.type === 'resume' ? 'show_resume' : 'show_contact';
      botParts.push({
        type: `tool-${toolName}`,
        state: 'output-available',
        toolCallId: `qi-${toolName}-${ts}`,
        output: card.data,
      });
    }
    if (sources.length) {
      botParts.push({
        type: 'tool-show_sources',
        state: 'output-available',
        toolCallId: `qi-src-${ts}`,
        output: { items: sources },
      });
    }
    const botMsg = {
      id: `qi-b-${ts}`,
      role: 'assistant' as const,
      parts: botParts,
    };
    setMessages([...messages, userMsg, botMsg] as UIMessage[]);
  }

  return (
    <ChatCtx.Provider value={{ messages, sendMessage: sendMessage as SendFn, sendInstant, status }}>
      {children}
    </ChatCtx.Provider>
  );
}

export function useChatCtx() {
  const ctx = useContext(ChatCtx);
  if (!ctx) throw new Error('useChatCtx: missing ChatProvider');
  return ctx;
}
