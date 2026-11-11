'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { PROFILE } from '@/lib/content';

interface Props {
  open: boolean;
  onClose: () => void;
}

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
  { href: '/ai', label: 'Ask AI' },
];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MenuOverlay({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Focus trap + Escape
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;

      const overlay = overlayRef.current;
      if (!overlay) return;
      const nodes = Array.from(overlay.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'hsl(var(--background))',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem 2rem',
      }}
    >
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link
          href="/"
          onClick={onClose}
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontWeight: 600,
            fontSize: '1rem',
            color: 'hsl(var(--foreground))',
            textDecoration: 'none',
          }}
        >
          CS
        </Link>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close menu"
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '13px',
            letterSpacing: '0.04em',
            color: 'hsl(var(--muted-foreground))',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 8px',
          }}
        >
          Close ×
        </button>
      </div>

      {/* Nav links */}
      <nav aria-label="Main navigation" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
        {NAV.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontWeight: 600,
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              letterSpacing: '-0.03em',
              color: 'hsl(var(--foreground))',
              textDecoration: 'none',
              transition: 'color 0.15s',
            }}
            className="hover:text-[var(--amber)]"
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer row */}
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile (opens in new tab)"
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: 'hsl(var(--muted-foreground))', textDecoration: 'none' }}
          className="hover:text-[var(--amber)]"
        >
          GitHub
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile (opens in new tab)"
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: 'hsl(var(--muted-foreground))', textDecoration: 'none' }}
          className="hover:text-[var(--amber)]"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
