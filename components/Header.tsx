'use client';

'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './ModeToggle';
import { MenuOverlay } from './MenuOverlay';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&';
const WORDMARK = 'CS';

function ScrambleMark() {
  const elRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef(0);

  const scramble = useCallback(() => {
    let frame = 0;
    const total = 26;
    const tick = () => {
      if (!elRef.current) return;
      const prog = frame / total;
      let out = '';
      for (let i = 0; i < WORDMARK.length; i++) {
        out += prog > i / WORDMARK.length
          ? WORDMARK[i]
          : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      elRef.current.textContent = out;
      frame++;
      if (frame <= total) rafRef.current = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (elRef.current) elRef.current.textContent = WORDMARK;
  }, []);

  return (
    <Link
      href="/"
      onMouseEnter={scramble}
      onMouseLeave={reset}
      style={{
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '14px',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textDecoration: 'none',
        color: 'hsl(var(--foreground))',
        transition: 'color 0.2s',
        minWidth: '2ch',
        display: 'inline-block',
      }}
      className="hover:text-[var(--amber)]"
      aria-label="Home"
    >
      <span ref={elRef}>{WORDMARK}</span>
    </Link>
  );
}


const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="flex items-center justify-between px-6 sm:px-8 py-6">
        <ScrambleMark />

        <div className="flex items-center gap-5">
          <Link
            href="/resume"
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '5px 13px',
              borderRadius: '999px',
              border: `1px solid ${pathname === '/resume' ? 'var(--amber)' : 'hsl(var(--muted-foreground) / 0.35)'}`,
              color: pathname === '/resume' ? 'var(--amber)' : 'hsl(var(--muted-foreground))',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            className="hover:border-[var(--amber)] hover:text-[var(--amber)]"
          >
            Resume
          </Link>
          <ModeToggle />
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '13px',
              letterSpacing: '0.04em',
              color: 'hsl(var(--foreground))',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
            }}
          >
            Menu
          </button>
        </div>
      </header>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default React.memo(Header);
