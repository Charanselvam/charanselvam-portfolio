'use client';

import { motion } from 'framer-motion';
import { Hello } from './Hello';
import { AICanvas } from './AICanvas';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: d } }),
};

// Name band: "CHARANSELVAM S" at monument scale — moves left at ~40px/s
// Photo square sits behind; a second copy in the light/background color is clipped to the
// photo rect, so letters appear to invert as they cross the image.
function NameBand() {
  const name = 'CHARANSELVAM S';
  const repeat = `${name}   ·   ${name}   ·   ${name}   ·   `;

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: 'clamp(120px, 16vw, 220px)',
        userSelect: 'none',
        margin: '0 calc(-1 * var(--page-margin, 32px))',
      }}
      aria-hidden="true"
    >
      {/* Photo square — sits behind the name band */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: 'clamp(48px, 8vw, 120px)',
          transform: 'translateY(-50%)',
          width: 'clamp(100px, 14vw, 200px)',
          aspectRatio: '1',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/charanselvam.jpg"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1) brightness(0.75)' }}
        />
        {/* Amber duotone overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'hsl(38 80% 48% / 0.25)', mixBlendMode: 'color' }} />
      </div>

      {/* Moving name — dark layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          animation: 'marq 18s linear infinite',
          fontSize: 'clamp(100px, 14vw, 200px)',
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: 'hsl(var(--foreground))',
          fontFamily: 'var(--font-geist-sans)',
          zIndex: 2,
        }}
      >
        {repeat}
        {repeat}
      </div>

      {/* Moving name — light layer, clipped to photo square region */}
      {/* This makes letters appear in the background color as they cross the photo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          animation: 'marq 18s linear infinite',
          fontSize: 'clamp(100px, 14vw, 200px)',
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: 'hsl(var(--background))',
          fontFamily: 'var(--font-geist-sans)',
          zIndex: 3,
          clipPath: 'inset(0 calc(100% - clamp(48px, 8vw, 120px) - clamp(100px, 14vw, 200px)) 0 calc(100% - clamp(48px, 8vw, 120px) - clamp(100px, 14vw, 200px) * 2 - clamp(100px, 14vw, 200px)))',
        }}
      >
        {repeat}
        {repeat}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      style={{ position: 'relative', minHeight: '96dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      {/* AI canvas backdrop */}
      <AICanvas />

      {/* Top row: greeting + nav hint */}
      <div
        className="px-6 sm:px-8 pt-10 flex items-start justify-between"
        style={{ position: 'relative', zIndex: 5 }}
      >
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
          <Hello />
        </motion.div>
        <motion.a
          href="#live-query"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '12px',
            letterSpacing: '0.06em',
            color: 'hsl(var(--muted-foreground))',
            textDecoration: 'none',
          }}
          className="hover:text-[var(--amber)] transition-colors"
        >
          Ask the archive ↓
        </motion.a>
      </div>

      {/* Name band — the monument */}
      <div className="mt-auto mb-auto relative z-10">
        {/* Screen-reader h1 */}
        <h1 className="sr-only">Charanselvam S — AI Integration Engineer</h1>
        <NameBand />
      </div>

      {/* Bottom: statement + CTA */}
      <motion.div
        className="px-6 sm:px-8 pb-10 relative z-10"
        style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'end' }}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.5}
      >
        <div>
          <p
            className="font-semibold text-foreground leading-tight"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2.6rem)', letterSpacing: '-0.025em', maxWidth: '18ch' }}
          >
            I connect legacy enterprise systems to modern AI.
          </p>
          <p
            className="text-foreground/50 mt-3"
            style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '12px', letterSpacing: '0.04em' }}
          >
            Chennai · IST · open to remote
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
          <a
            href="/contact"
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '13px',
              letterSpacing: '0.03em',
              padding: '10px 20px',
              background: 'var(--amber)',
              color: 'hsl(30 8% 5%)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Let&apos;s talk →
          </a>
          <a
            href="/about"
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '12px',
              letterSpacing: '0.04em',
              color: 'hsl(var(--muted-foreground))',
              textDecoration: 'none',
            }}
            className="hover:text-[var(--amber)] transition-colors"
          >
            About me
          </a>
        </div>
      </motion.div>
    </section>
  );
}
