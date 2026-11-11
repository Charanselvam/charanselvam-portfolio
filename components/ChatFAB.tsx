'use client';

import { useEffect, useRef, useState } from 'react';
import { ChatPanel } from './ChatInterface';

export function ChatFAB() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  // Focus close button when panel opens; return focus to FAB when it closes
  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    } else {
      fabRef.current?.focus();
    }
  }, [open]);

  // Escape key closes panel
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <>
      {/* Floating button */}
      <button
        ref={fabRef}
        onClick={() => setOpen(true)}
        aria-label="Open AI chat"
        aria-expanded={open}
        aria-haspopup="dialog"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 20px',
          background: 'var(--amber)',
          color: 'hsl(30 8% 5%)',
          border: 'none',
          borderRadius: '999px',
          cursor: 'pointer',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '13px',
          letterSpacing: '0.06em',
          fontWeight: 600,
          transition: 'transform 0.2s',
          visibility: open ? 'hidden' : 'visible',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        ASK MY AI
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          style={{
            position: 'fixed', inset: 0, zIndex: 110,
            background: 'rgba(0,0,0,0.5)',
          }}
        />
      )}

      {/* Chat panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="AI chat — ask about Charan's work"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 120,
          width: 'min(420px, calc(100vw - 32px))',
          height: 'min(560px, calc(100vh - 100px))',
          background: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.2s',
          transformOrigin: 'bottom right',
        }}
      >
        {/* Panel header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 16px',
            borderBottom: '1px solid hsl(var(--border))',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '13px',
              letterSpacing: '0.08em',
              color: 'var(--amber)',
              textTransform: 'uppercase',
            }}
          >
            Ask my AI
          </span>
          <button
            ref={closeRef}
            onClick={() => setOpen(false)}
            aria-label="Close AI chat"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'hsl(var(--muted-foreground))',
              padding: '4px',
              lineHeight: 1,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ChatPanel />
      </div>
    </>
  );
}
