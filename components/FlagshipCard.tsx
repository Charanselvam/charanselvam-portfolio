import type { Project } from '@/lib/content';
import { DemoStatus } from './DemoStatus';

interface Props {
  project: Project;
  index: number;
}

export function FlagshipCard({ project, index }: Props) {
  return (
    <article
      style={{
        borderTop: '1px solid hsl(var(--border))',
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-12">
        {/* Index + period */}
        <div>
          <span
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: 'var(--amber)',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <p
            className="text-foreground/40 mt-1"
            style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '12px' }}
          >
            {project.period}
          </p>
          {project.status === 'live_in_production' && (
            <span style={{ display: 'block', marginTop: '8px' }}>
              {project.demoUrl
                ? <DemoStatus url={project.demoUrl} />
                : (
                  <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: '#2fd47a', letterSpacing: '0.04em' }}>
                    ● live
                  </span>
                )}
            </span>
          )}
        </div>

        {/* Content */}
        <div>
          <h3
            className="font-semibold text-foreground mb-3"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', letterSpacing: '-0.01em' }}
          >
            {project.title}
          </h3>
          <p className="text-foreground/60 leading-relaxed mb-5" style={{ maxWidth: '60ch' }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.04em',
                  padding: '3px 10px',
                  background: 'hsl(var(--muted))',
                  color: 'hsl(var(--muted-foreground))',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
