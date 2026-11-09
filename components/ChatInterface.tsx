'use client';

import { useEffect, useRef, useState } from 'react';
import { useChatCtx } from '@/context/ChatContext';
import { MessageBubble } from './MessageBubble';
import { PromptChips } from './PromptChips';

const STAGES = ['Reading the portfolio', 'Thinking', 'Composing reply'];

export function ChatInterface() {
  const { messages, sendMessage, status } = useChatCtx();
  const [input, setInput] = useState('');
  const [stageIdx, setStageIdx] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isLoading = status === 'submitted' || status === 'streaming';
  const hasMessages = messages.length > 0;

  // Cycle loading stage text while waiting
  useEffect(() => {
    if (!isLoading) { setStageIdx(0); return; }
    const id = setInterval(() => setStageIdx((s) => Math.min(STAGES.length - 1, s + 1)), 1500);
    return () => clearInterval(id);
  }, [isLoading]);

  useEffect(() => {
    if (hasMessages) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, hasMessages, isLoading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    await sendMessage({ text });
  }

  async function handleChipSelect(prompt: string) {
    if (isLoading) return;
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
      {/* Greeting — always visible */}
      {!hasMessages && (
        <div
          style={{
            background: 'hsl(var(--foreground)/0.04)',
            border: '1px solid hsl(var(--foreground)/0.08)',
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '16px',
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'hsl(var(--foreground)/0.6)',
          }}
        >
          Hi — I&apos;m Charan&apos;s AI. Ask me about his projects, enterprise integrations, certifications, or how to reach him.
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 space-y-1">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Loading indicator with stage cycling */}
        {isLoading && (
          <div className="flex items-center gap-3 py-2 mb-2">
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                border: '1px solid hsl(var(--foreground)/0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '9px',
                letterSpacing: '0.05em',
                color: 'var(--amber)',
                flexShrink: 0,
              }}
            >
              CS
            </div>
            <span
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '11px',
                color: 'hsl(var(--foreground)/0.35)',
                letterSpacing: '0.04em',
              }}
            >
              {STAGES[stageIdx]}
              <span className="animate-pulse">...</span>
            </span>
          </div>
        )}

        {/* Quick question chips — only before first message */}
        {!hasMessages && (
          <div className="pt-1">
            <PromptChips onSelect={handleChipSelect} disabled={isLoading} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 pt-5 pb-1" style={{ background: 'transparent' }}>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '10px',
              padding: '10px 14px',
              border: '1px solid hsl(var(--foreground)/0.12)',
              borderRadius: '12px',
              background: 'var(--surface)',
              transition: 'border-color 0.15s',
            }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about my work..."
              rows={1}
              style={{
                flex: 1,
                resize: 'none',
                background: 'transparent',
                fontSize: '14px',
                lineHeight: 1.5,
                color: 'hsl(var(--foreground)/0.85)',
                outline: 'none',
                border: 'none',
                fontFamily: 'inherit',
              }}
              className="placeholder:text-foreground/30"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                border: 'none',
                background: isLoading || !input.trim() ? 'hsl(var(--foreground)/0.08)' : 'var(--amber)',
                color: isLoading || !input.trim() ? 'hsl(var(--foreground)/0.3)' : 'hsl(30 8% 5%)',
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.15s',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
