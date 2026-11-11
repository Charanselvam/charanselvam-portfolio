import Image from 'next/image';
import { PROFILE } from '@/lib/content';

export function BioBlock() {
  return (
    <section className="px-6 sm:px-8 py-16">
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
        </div>

        {/* Text */}
        <div>
          <p
            className="text-[13px] text-foreground/40 uppercase tracking-widest mb-4"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            About
          </p>
          <h2
            className="font-semibold text-foreground leading-tight mb-6"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
          >
            Agents, pipelines, and APIs for systems that actually run.
          </h2>
          <p className="text-foreground/65 leading-relaxed mb-4" style={{ maxWidth: '52ch' }}>
            {PROFILE.bio}
          </p>
          <p className="text-foreground/65 leading-relaxed mb-8" style={{ maxWidth: '52ch' }}>
            Enterprise Java background means I can drop an agentic workflow or MCP server into a legacy system
            without rebuilding it. API-first, pipeline-driven, production-proven.
          </p>
          <div className="flex flex-wrap gap-6">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '13px',
                letterSpacing: '0.03em',
                color: 'var(--amber)',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              className="hover:opacity-70"
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
                color: 'hsl(var(--foreground) / 0.5)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              className="hover:text-[var(--amber)]"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
