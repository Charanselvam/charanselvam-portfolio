'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useChatCtx } from '@/context/ChatContext';
import { MessageBubble } from './MessageBubble';
import { PromptChips } from './PromptChips';
import { QA } from '@/lib/qa';

const STAGES = ['Reading the portfolio', 'Thinking', 'Composing reply'];

// ── Form state context so ChatMessages and ChatInputBar share one instance ──

interface FormCtx {
  input: string;
  setInput: (v: string) => void;
  stageIdx: number;
  isLoading: boolean;
  hasMessages: boolean;
  handleChipSelect: (p: string) => void;
  handleSubmit: (text: string, resetFn?: () => void) => void;
}

const FormCtx = createContext<FormCtx | null>(null);

function useFormCtx() {
  const ctx = useContext(FormCtx);
  if (!ctx) throw new Error('Must be inside ChatFormProvider');
  return ctx;
}

function ChatFormProvider({ children }: { children: React.ReactNode }) {
  const { messages, sendMessage, sendInstant, status } = useChatCtx();
  const [input, setInput] = useState('');
  const [stageIdx, setStageIdx] = useState(0);
  const isLoading = status === 'submitted' || status === 'streaming';
  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (!isLoading) { setStageIdx(0); return; }
    const id = setInterval(() => setStageIdx((s) => Math.min(STAGES.length - 1, s + 1)), 1500);
    return () => clearInterval(id);
  }, [isLoading]);

  function handleChipSelect(prompt: string) {
    if (isLoading) return;
    const qa = QA.find((q) => q.question === prompt);
    if (qa) sendInstant(prompt, qa.answer, qa.sources, qa.card);
    else sendMessage({ text: prompt });
  }

  async function handleSubmit(text: string, resetFn?: () => void) {
    if (!text.trim() || isLoading) return;
    resetFn?.();
    await sendMessage({ text: text.trim() });
  }

  return (
    <FormCtx.Provider value={{ input, setInput, stageIdx, isLoading, hasMessages, handleChipSelect, handleSubmit }}>
      {children}
    </FormCtx.Provider>
  );
}

// ── ChatMessages — goes inside a scrollable container ──

export function ChatMessages() {
  const { messages } = useChatCtx();
  const { stageIdx, isLoading, hasMessages, handleChipSelect } = useFormCtx();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <>
      <style>{`
        @keyframes ci-dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>

      {!hasMessages && (
        <div
          style={{
            background: 'hsl(var(--foreground)/0.03)',
            border: '1px solid hsl(var(--foreground)/0.07)',
            borderRadius: '14px',
            padding: '14px 16px',
            marginBottom: '16px',
            fontSize: '13px',
            lineHeight: 1.65,
            color: 'hsl(var(--foreground)/0.6)',
          }}
        >
          Hi — I&apos;m Charan&apos;s AI. Ask me about his projects, enterprise integrations, certifications, or how to reach him.
        </div>
      )}

      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isLoading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0' }}>
          <div
            style={{
              width: '26px', height: '26px', borderRadius: '50%',
              border: '1px solid hsl(var(--foreground)/0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-geist-mono)', fontSize: '9px',
              letterSpacing: '0.05em', color: 'var(--amber)', flexShrink: 0,
            }}
          >CS</div>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'hsl(var(--foreground)/0.35)', letterSpacing: '0.04em' }}>
            {STAGES[stageIdx]}
          </span>
          <span style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--amber)', opacity: 0.6, animation: `ci-dot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
            ))}
          </span>
        </div>
      )}

      {!hasMessages && (
        <div style={{ marginTop: '12px' }}>
          <PromptChips onSelect={handleChipSelect} disabled={isLoading} />
        </div>
      )}

      <div ref={endRef} />
    </>
  );
}

// ── ChatInputBar — goes outside the scroll area, stays fixed at the bottom ──

export function ChatInputBar({ hint = false }: { hint?: boolean }) {
  const { input, setInput, isLoading, handleSubmit } = useFormCtx();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function autoGrow(el: HTMLTextAreaElement) {
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }

  function reset() {
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(input, reset);
    }
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(input, reset); }}>
      <div
        style={{
          display: 'flex', alignItems: 'flex-end', gap: '10px',
          padding: '10px 14px',
          border: '1px solid hsl(var(--foreground)/0.12)',
          borderRadius: '14px',
          background: 'var(--surface)',
          transition: 'border-color 0.15s',
        }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => { setInput(e.target.value); autoGrow(e.target); }}
          onKeyDown={onKeyDown}
          placeholder="Ask me anything about my work..."
          rows={1}
          style={{
            flex: 1, resize: 'none', background: 'transparent',
            fontSize: '14px', lineHeight: 1.55,
            color: 'hsl(var(--foreground)/0.85)',
            outline: 'none', border: 'none', fontFamily: 'inherit',
            overflowY: 'hidden',
          }}
          className="placeholder:text-foreground/30"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          aria-label="Send"
          style={{
            width: '34px', height: '34px', borderRadius: '10px', border: 'none',
            background: isLoading || !input.trim() ? 'hsl(var(--foreground)/0.08)' : 'var(--amber)',
            color: isLoading || !input.trim() ? 'hsl(var(--foreground)/0.3)' : 'hsl(30 8% 5%)',
            cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, transition: 'background 0.15s, transform 0.1s',
          }}
          onMouseEnter={(e) => { if (!isLoading && input.trim()) e.currentTarget.style.transform = 'scale(1.08)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      {hint && (
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'hsl(var(--foreground)/0.2)', textAlign: 'center', marginTop: '8px', letterSpacing: '0.03em' }}>
          Shift + Enter for new line
        </p>
      )}
    </form>
  );
}

// ── ChatInterface — full-page layout (wraps both in a provider) ──

export function ChatInterface() {
  return (
    <ChatFormProvider>
      <div>
        <div style={{ marginBottom: '16px' }}>
          <ChatMessages />
        </div>
        <ChatInputBar hint />
      </div>
    </ChatFormProvider>
  );
}

// ── ChatPanel — FAB layout (provider wraps messages + input separately) ──

export function ChatPanel() {
  return <ChatFormProvider><ChatPanelInner /></ChatFormProvider>;
}

function ChatPanelInner() {
  return (
    <>
      <div style={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain', padding: '16px 16px 8px' }}>
        <ChatMessages />
      </div>
      <div style={{ flexShrink: 0, padding: '8px 16px 14px', borderTop: '1px solid hsl(var(--foreground)/0.08)' }}>
        <ChatInputBar />
      </div>
    </>
  );
}
