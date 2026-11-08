'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { MenuOverlay } from './MenuOverlay';
import { useISTClock } from '@/hooks/useISTClock';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const clock = useISTClock();

  return (
    <>
      <header className="flex items-center justify-between px-6 sm:px-8 py-6">
        <Link
          href="/"
          className="text-sm font-semibold text-foreground hover:text-[var(--amber)] transition-colors"
        >
          CS
        </Link>

        <div className="flex items-center gap-5">
          {clock && (
            <span
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                color: 'hsl(var(--muted-foreground))',
              }}
            >
              {clock}
            </span>
          )}
          <ModeToggle />
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
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
