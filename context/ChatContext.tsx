'use client';

import { createContext, useContext } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import type { UIMessage } from 'ai';

// Shared chat state — one conversation between the floating FAB and the /ai page.
// Both mount <ChatInterface /> which reads from this context.

type SendFn = (msg: { text: string }) => Promise<void>;

interface ChatCtxValue {
  messages: UIMessage[];
  sendMessage: SendFn;
  status: string;
}

const ChatCtx = createContext<ChatCtxValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  return (
    <ChatCtx.Provider value={{ messages, sendMessage: sendMessage as SendFn, status }}>
      {children}
    </ChatCtx.Provider>
  );
}

export function useChatCtx() {
  const ctx = useContext(ChatCtx);
  if (!ctx) throw new Error('useChatCtx: missing ChatProvider');
  return ctx;
}
