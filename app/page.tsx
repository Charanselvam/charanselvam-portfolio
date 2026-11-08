import { Hero } from '@/components/Hero';
import { Cases } from '@/components/Cases';
import { FactsStrip } from '@/components/FactsStrip';
import { Marquee } from '@/components/Marquee';
import { BioBlock } from '@/components/BioBlock';
import { ChatInterface } from '@/components/ChatInterface';
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

      {/* 6 — Config-row metrics band */}
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
