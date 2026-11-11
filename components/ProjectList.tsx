'use client';

import { useState } from 'react';
import type { Project } from '@/lib/content';

const GH_ICON = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

function StatusBadge({ status }: { status?: string }) {
  if (status === 'live_in_production') {
    return (
      <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: '#2fd47a', border: '1px solid #2fd47a44', borderRadius: '100px', padding: '2px 8px', letterSpacing: '0.06em', flexShrink: 0 }}>
        LIVE
      </span>
    );
  }
  if (status === 'college_project') {
    return (
      <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'hsl(220 70% 65%)', border: '1px solid hsl(220 70% 65% / 0.35)', borderRadius: '100px', padding: '2px 8px', letterSpacing: '0.06em', flexShrink: 0 }}>
        ACADEMIC
      </span>
    );
  }
  return (
    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'hsl(var(--foreground)/0.3)', border: '1px solid hsl(var(--foreground)/0.12)', borderRadius: '100px', padding: '2px 8px', letterSpacing: '0.06em', flexShrink: 0 }}>
      INTERNAL
    </span>
  );
}

function HoverCard({ project, index, total }: { project: Project; index: number; total: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 50,
        width: '300px',
        background: 'var(--surface)',
        border: '1px solid hsl(var(--foreground)/0.15)',
        borderRadius: '14px',
        padding: '20px',
        pointerEvents: 'none',
        boxShadow: '0 20px 60px hsl(0 0% 0% / 0.5)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'hsl(var(--foreground)/0.35)', letterSpacing: '0.08em' }}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} · {project.category ?? 'PROJECT'}
        </span>
        <StatusBadge status={project.status} />
      </div>
      <h3 style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '10px' }}>
        {project.title}
      </h3>
      <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'hsl(var(--foreground)/0.55)', marginBottom: '14px' }}>
        {project.description.slice(0, 160)}{project.description.length > 160 ? '…' : ''}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: project.github ? '12px' : 0 }}>
        {project.tags.slice(0, 5).map((tag) => (
          <span key={tag} style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--amber)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{tag}</span>
        ))}
      </div>
      {project.github && (
        <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'hsl(var(--foreground)/0.3)', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '5px' }}>
          {GH_ICON} OPEN SOURCE ON GITHUB
        </div>
      )}
    </div>
  );
}

interface Props {
  projects: Project[];
  startIndex?: number;
}

export function ProjectList({ projects, startIndex = 1 }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{ borderTop: '1px solid hsl(var(--foreground)/0.1)' }}>
      {projects.map((p, i) => {
        const idx = startIndex - 1 + i;
        const isHovered = hovered === i;

        return (
          <div
            key={p.slug}
            style={{ position: 'relative' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '44px 1fr auto auto auto',
                gap: '0 16px',
                alignItems: 'center',
                padding: '16px 0',
                borderBottom: '1px solid hsl(var(--foreground)/0.07)',
                background: isHovered ? 'hsl(var(--foreground)/0.03)' : 'transparent',
                transition: 'background 0.15s',
                cursor: 'default',
              }}
            >
              {/* Number */}
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'hsl(var(--foreground)/0.22)', letterSpacing: '0.06em' }}>
                {String(idx + 1).padStart(2, '0')}
              </span>

              {/* Title + status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {p.title}
                </span>
                <StatusBadge status={p.status} />
              </div>

              {/* Category */}
              <span
                className="hidden sm:block"
                style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'hsl(var(--foreground)/0.3)', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}
              >
                {p.category}
              </span>

              {/* Tags (desktop) */}
              <div className="hidden lg:flex" style={{ gap: '8px', alignItems: 'center' }}>
                {p.tags.slice(0, 3).map((tag) => (
                  <span key={tag} style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'hsl(var(--foreground)/0.35)', letterSpacing: '0.04em' }}>{tag}</span>
                ))}
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontSize: '10px',
                      color: '#2fd47a',
                      border: '1px solid #2fd47a55',
                      borderRadius: '100px',
                      padding: '4px 10px',
                      textDecoration: 'none',
                      letterSpacing: '0.06em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    ↗ LINK
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontSize: '10px',
                      color: 'hsl(var(--foreground)/0.5)',
                      border: '1px solid hsl(var(--foreground)/0.15)',
                      borderRadius: '100px',
                      padding: '4px 10px',
                      textDecoration: 'none',
                      letterSpacing: '0.06em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {GH_ICON} CODE
                  </a>
                )}
              </div>
            </div>

            {/* Hover popup */}
            {isHovered && (
              <HoverCard project={p} index={idx} total={projects.length + startIndex - 1} />
            )}
          </div>
        );
      })}
    </div>
  );
}
