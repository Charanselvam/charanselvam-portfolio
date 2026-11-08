'use client';

import { motion } from 'framer-motion';
import { Hello } from './Hello';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease, delay },
  }),
};

const wipe = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.1, ease, delay: 0.25 },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col px-6 sm:px-8 pt-10 sm:pt-14 pb-10"
      style={{ minHeight: '94dvh' }}
    >
      {/* Identity block */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
        <div className="mb-3">
          <Hello />
        </div>
        <h1
          className="font-semibold text-foreground leading-none"
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', letterSpacing: '-0.02em' }}
        >
          Charanselvam S
        </h1>
        <p className="text-base text-foreground/55 mt-2">
          AI Integration Engineer · Chennai, India
        </p>
        <p
          className="text-[13px] text-[var(--amber)] mt-1 tracking-[0.04em]"
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          open_to_remote
        </p>
      </motion.div>

      {/* Statement — clip-path wipe left-to-right */}
      <div className="flex-1 flex flex-col justify-center py-10 sm:py-14">
        <motion.p
          className="font-semibold text-foreground"
          style={{
            fontSize: 'clamp(3rem, 8.5vw, 9rem)',
            lineHeight: 0.94,
            letterSpacing: '-0.04em',
          }}
          variants={wipe}
          initial="hidden"
          animate="visible"
        >
          I connect legacy enterprise systems to modern AI.
        </motion.p>
      </div>

      {/* Bottom row */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.75}
      >
        <p
          className="text-lg leading-snug text-foreground/65"
          style={{ maxWidth: '46ch' }}
        >
          Five years inside enterprise systems — real carriers, real production,
          real constraints. I build AI tools that remove repetitive work from
          enterprise workflows.
        </p>
        <a
          href="#live-query"
          className="inline-block text-[13px] text-[var(--amber)] hover:text-[var(--amber-light)] transition-colors whitespace-nowrap px-4 py-2.5"
          style={{
            fontFamily: 'var(--font-geist-mono)',
            letterSpacing: '0.03em',
            border: '2px solid var(--amber)',
          }}
        >
          Interrogate the archive ↓
        </a>
      </motion.div>
    </section>
  );
}
