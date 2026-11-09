import { Hero } from '@/components/Hero';
import { FactsStrip } from '@/components/FactsStrip';
import { Marquee } from '@/components/Marquee';
import { BioBlock } from '@/components/BioBlock';
import { FlagshipCard } from '@/components/FlagshipCard';
import { GlanceBento } from '@/components/GlanceBento';
import { NowRadar } from '@/components/NowRadar';
import { NextPageNav } from '@/components/NextPageNav';
import { FLAGSHIPS, PROJECTS } from '@/lib/content';
import { ProjectList } from '@/components/ProjectList';
import { AICanvas } from '@/components/AICanvas';

export default function Home() {
  return (
    <>
      <Hero />

      <FactsStrip />

      <Marquee />

      <BioBlock />

      <section id="work" className="px-6 sm:px-8 py-16">
        {/* Section header with count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span
              style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '12px', color: 'hsl(var(--foreground)/0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}
            >
              Selected work · {FLAGSHIPS.length} of {PROJECTS.length}
            </span>
            <h2
              className="font-bold"
              style={{ fontSize: 'clamp(36px, 6vw, 80px)', letterSpacing: '-0.04em', lineHeight: 0.92 }}
            >
              What I&apos;ve{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--amber)' }}>built.</em>
            </h2>
          </div>
          <a
            href="/work"
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '13px',
              letterSpacing: '0.06em',
              color: 'hsl(var(--foreground)/0.6)',
              textDecoration: 'none',
              border: '1px solid hsl(var(--foreground)/0.2)',
              borderRadius: '100px',
              padding: '10px 20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            All {PROJECTS.length} projects →
          </a>
        </div>

        {/* Flagship cards */}
        <div className={`grid gap-6 ${FLAGSHIPS.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          {FLAGSHIPS.map((p, i) => (
            <FlagshipCard key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* Interactive project list */}
        {PROJECTS.filter((p) => !p.featured).length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <ProjectList
              projects={PROJECTS.filter((p) => !p.featured)}
              startIndex={FLAGSHIPS.length + 1}
            />
          </div>
        )}
      </section>

      <GlanceBento />

      <NowRadar />

      {/* Ambient mesh footer strip */}
      <div style={{ position: 'relative', width: '100%', height: '160px', borderTop: '1px solid hsl(var(--foreground)/0.06)' }}>
        <AICanvas kind="mesh" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      </div>

      <NextPageNav href="/about" label="About" />
    </>
  );
}
