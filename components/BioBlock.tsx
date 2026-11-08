import Image from 'next/image';
import { PROFILE } from '@/lib/content';

export function BioBlock() {
  return (
    <section className="px-6 sm:px-8 py-16 border-t border-foreground/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Photo */}
        <div
          className="img-panel"
          style={{ aspectRatio: '4/5', maxWidth: '420px' }}
        >
          <Image
            src="/charanselvam.jpg"
            alt={PROFILE.name}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            priority
          />
          <span className="img-caption">{PROFILE.sticker}</span>
        </div>

        {/* Text */}
        <div>
          <p
            className="text-[11px] text-foreground/40 uppercase tracking-widest mb-4"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            About
          </p>
          <h2
            className="font-semibold text-foreground leading-tight mb-6"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
          >
            Five years at the intersection of enterprise and AI.
          </h2>
          <p className="text-foreground/65 leading-relaxed mb-4" style={{ maxWidth: '52ch' }}>
            {PROFILE.bio}
          </p>
          <p className="text-foreground/65 leading-relaxed mb-8" style={{ maxWidth: '52ch' }}>
            I&apos;ve shipped AI tooling that removed weeks of manual work per quarter — from a Gemini-powered Excel
            extractor that replaced a failing IBM WatsonX integration, to a fully local RAG chatbot, to a JSONata-based
            carrier mapping engine that cut onboarding from days to hours.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '13px',
                letterSpacing: '0.03em',
                padding: '8px 16px',
                border: '1px solid var(--amber)',
                color: 'var(--amber)',
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
              className="hover:bg-[var(--amber)] hover:text-background"
            >
              GitHub ↗
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '13px',
                letterSpacing: '0.03em',
                padding: '8px 16px',
                border: '1px solid hsl(var(--border))',
                color: 'hsl(var(--muted-foreground))',
                textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              className="hover:border-[var(--amber)] hover:text-[var(--amber)]"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
