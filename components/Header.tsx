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

const NAV_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/resume', label: 'Resume' },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="flex items-center justify-between px-6 sm:px-8 py-6">
        <ScrambleMark />

        <nav className="hidden sm:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '13px',
                letterSpacing: '0.04em',
                color: pathname === href ? 'var(--amber)' : 'hsl(var(--muted-foreground))',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              className="hover:text-[var(--amber)]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
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
