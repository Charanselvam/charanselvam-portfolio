'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useEffect, useRef, useState } from 'react';
import { MessageBubble } from './MessageBubble';
import { PromptChips } from './PromptChips';


export function ChatInterface() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoading = status === 'submitted' || status === 'streaming';

  const hasUserMessage = messages.length > 0;

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    await sendMessage({ text });
  }

  async function handlePromptSelect(prompt: string) {
    await sendMessage({ text: prompt });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  }

  return (
    <div className="flex flex-col">
      <p
        className="text-[13px] text-[var(--amber)] mb-8 tracking-[0.05em]"
        style={{ fontFamily: 'var(--font-geist-mono)' }}
      >
        live_query · ask about any system above
      </p>

      <div className="flex-1 space-y-3">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 py-2">
            <div
              className="w-6 h-6 flex items-center justify-center shrink-0"
              style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: 'var(--amber)' }}
            >
              cs
            </div>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        {!hasUserMessage && (
          <div className="pt-2">
            <PromptChips onSelect={handlePromptSelect} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 pt-6 pb-2 bg-background">
        <form onSubmit={handleSubmit}>
          <div
            className="flex items-end gap-3 px-4 py-3 transition-colors"
            style={{ border: '2px solid hsl(var(--border))', outline: 'none' }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about my work..."
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder-foreground/35 outline-none leading-relaxed"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="shrink-0 w-8 h-8 flex items-center justify-center bg-[var(--amber)] text-background hover:bg-[var(--amber-light)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Send"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
