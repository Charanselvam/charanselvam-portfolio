import { Hero } from '@/components/Hero';
import { Cases } from '@/components/Cases';
import { FactsStrip } from '@/components/FactsStrip';
import { Marquee } from '@/components/Marquee';
import { BioBlock } from '@/components/BioBlock';
import { FlagshipCard } from '@/components/FlagshipCard';
import { GlanceBento } from '@/components/GlanceBento';
import { ChatInterface } from '@/components/ChatInterface';
import { FLAGSHIPS } from '@/lib/content';
import { AnimateIn } from '@/components/AnimateIn';

export default function Home() {
  return (
    <>
      {/* 1 — Type-only hero */}
      <Hero />

      {/* 2 — Facts strip */}
      <FactsStrip />

      {/* 3 — Marquee band */}
      <Marquee />

      {/* 5 — Bio block */}
      <BioBlock />

      {/* 7 — Flagship project cards */}
      <section className="px-6 sm:px-8 py-16 border-t border-foreground/10">
        <p
          className="text-[11px] text-foreground/40 uppercase tracking-widest mb-10"
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          Selected work
        </p>
        {FLAGSHIPS.map((p, i) => (
          <FlagshipCard key={p.title} project={p} index={i} />
        ))}
      </section>

      {/* 8 — Glance bento */}
      <GlanceBento />

      {/* 9 — Config-row metrics band */}
      <Cases />

      {/* 3 — Live query (chat) */}
      <AnimateIn>
        <section
          id="live-query"
          className="px-6 sm:px-8 pt-16 pb-16"
        >
          <ChatInterface />
        </section>
      </AnimateIn>
    </>
  );
}
