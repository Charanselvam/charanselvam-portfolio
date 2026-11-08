'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { PROFILE } from '@/lib/content';

interface Props {
  open: boolean;
  onClose: () => void;
}

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function MenuOverlay({ open, onClose }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
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
          onClick={onClose}
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
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
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
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '12px', color: 'hsl(var(--muted-foreground))', textDecoration: 'none' }}
          className="hover:text-[var(--amber)]"
        >
          GitHub
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '12px', color: 'hsl(var(--muted-foreground))', textDecoration: 'none' }}
          className="hover:text-[var(--amber)]"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
