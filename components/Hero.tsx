'use client';

import { motion } from 'framer-motion';
import { Hello } from './Hello';
import { AICanvas } from './AICanvas';

const ease = [0.16, 1, 0.3, 1] as const;
const fade = (d: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: d } },
});

export function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '96dvh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Backgrounds */}
      <AICanvas style={{ zIndex: 1 }} />

      {/* Content */}
      <div className="px-6 sm:px-8 xl:pl-24 relative z-10 flex flex-col" style={{ flex: 1, paddingTop: '80px', paddingBottom: '56px' }}>

        {/* Greeting */}
        <motion.div {...fade(0.15)} style={{ display: 'flex', alignItems: 'baseline', gap: '0.2em' }}>
          <Hello />
          <span style={{
            fontFamily: 'var(--font-geist-sans)',
            fontSize: 'clamp(1.4rem, 2.6vw, 2.4rem)',
            color: 'hsl(var(--foreground) / 0.75)',
            letterSpacing: '-0.01em',
          }}>, I&apos;m</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fade(0.25)}
          style={{
            fontSize: 'clamp(64px, 13vw, 196px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            margin: '14px 0 0',
            color: 'hsl(var(--foreground))',
            fontFamily: 'var(--font-geist-sans)',
            userSelect: 'none',
          }}
        >
          <span className="block">CHARAN</span>
          <span className="block">SELVAM</span>
        </motion.h1>

        {/* Description + CTAs — pushed to bottom */}
        <motion.div {...fade(0.5)} style={{ marginTop: 'auto', paddingTop: '48px', maxWidth: '780px' }}>
          <p style={{
            fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            color: 'hsl(var(--foreground))',
            margin: 0,
          }}>
            I build{' '}
            <span style={{ color: 'var(--amber)' }}>AI agents, RAG pipelines, and MCP servers</span>
            {' '}that plug into enterprise APIs. Shipped to production, not just prototyped.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '32px', alignItems: 'center' }}>
            <a
              href="/contact"
              style={{
                height: '48px',
                padding: '0 24px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'var(--amber)',
                color: 'hsl(30 8% 5%)',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '13px',
                letterSpacing: '0.04em',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Get in touch
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#work"
              style={{
                height: '48px',
                padding: '0 24px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                border: '1px solid hsl(var(--foreground) / 0.3)',
                color: 'hsl(var(--foreground))',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '13px',
                letterSpacing: '0.04em',
                textDecoration: 'none',
              }}
              className="hover:border-[var(--amber)] hover:text-[var(--amber)] transition-colors"
            >
              See my work
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
