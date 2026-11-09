import Link from 'next/link';
import type { Project } from '@/lib/content';
import { DemoStatus } from './DemoStatus';

interface Props {
  project: Project;
  index: number;
}

function ApiMotif() {
  return (
    <svg
      className="dash"
      width="100%"
      height="150"
      viewBox="0 0 320 150"
      fill="none"
      aria-hidden="true"
      style={{ color: 'hsl(var(--foreground) / 0.2)' }}
    >
      <path d="M32 75 H132" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
      <path d="M188 75 H288" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
      <path d="M160 14 V56" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
      <path d="M160 94 V136" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
      <circle className="blink-dot" cx="20" cy="75" r="8" fill="currentColor" style={{ '--d': '0s' } as React.CSSProperties} />
      <circle className="blink-dot" cx="300" cy="75" r="8" fill="currentColor" style={{ '--d': '0.4s' } as React.CSSProperties} />
      <circle className="blink-dot" cx="160" cy="8" r="8" fill="currentColor" style={{ '--d': '0.8s' } as React.CSSProperties} />
      <circle className="blink-dot" cx="160" cy="142" r="8" fill="currentColor" style={{ '--d': '1.2s' } as React.CSSProperties} />
      <circle className="spin" cx="160" cy="75" r="44" stroke="var(--amber)" strokeWidth="1.5" strokeOpacity="0.35" strokeDasharray="5 10" style={{ '--dur': '14s' } as React.CSSProperties} />
      <circle cx="160" cy="75" r="22" fill="var(--amber)" />
      <text x="160" y="79" textAnchor="middle" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', fill: 'hsl(30 8% 5%)', fontWeight: 600, letterSpacing: '0.08em' } as React.CSSProperties}>API</text>
    </svg>
  );
}

function WorkbenchMotif() {
  const steps = [40, 130, 220];
  return (
    <svg width="100%" height="150" viewBox="0 0 290 150" fill="none" aria-hidden="true">
      {/* Step connector lines */}
      <path d="M68 55 H112" stroke="hsl(var(--foreground)/0.2)" strokeWidth="1" strokeDasharray="4 4" />
      <path d="M158 55 H202" stroke="hsl(var(--foreground)/0.2)" strokeWidth="1" strokeDasharray="4 4" />

      {steps.map((cx, i) => (
        <g key={i}>
          <rect
            x={cx - 28} y="36" width="56" height="38" rx="8"
            fill={i === 2 ? 'var(--amber)' : 'var(--surface)'}
            stroke={i === 2 ? 'var(--amber)' : 'hsl(var(--foreground)/0.18)'}
            strokeWidth="1.5"
          />
          <text
            x={cx} y="52"
            textAnchor="middle"
            style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '8px', fill: i === 2 ? 'hsl(30 8% 5%)' : 'hsl(var(--foreground)/0.4)', fontWeight: 600, letterSpacing: '0.08em' } as React.CSSProperties}
          >{`0${i + 1}`}</text>
          <text
            x={cx} y="65"
            textAnchor="middle"
            style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '7px', fill: i === 2 ? 'hsl(30 8% 5%)' : 'hsl(var(--foreground)/0.3)', letterSpacing: '0.06em' } as React.CSSProperties}
          >{['Config', 'Map', 'Deploy'][i]}</text>
        </g>
      ))}

      {/* Row of simulated form fields */}
      {[90, 100, 110].map((y, i) => (
        <rect key={i} x="40" y={y} width={[120, 90, 60][i]} height="5" rx="2.5" fill="hsl(var(--foreground)/0.08)" />
      ))}
      <rect x="195" y="90" width="55" height="25" rx="6" fill="var(--amber)" opacity="0.18" />
      <text x="222" y="106" textAnchor="middle" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '7px', fill: 'var(--amber)', fontWeight: 600, letterSpacing: '0.06em' } as React.CSSProperties}>SUBMIT</text>
    </svg>
  );
}

export function FlagshipCard({ project, index }: Props) {
  const href = project.link ?? '/work';
  const isExternal = project.link?.startsWith('http');
  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="flag-card"
      style={{
        background: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '420px',
        overflow: 'hidden',
        padding: '24px',
        textDecoration: 'none',
      }}
    >

      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <span style={{ display: 'none' }}>{index}</span>
        {project.status === 'live_in_production' && (
          project.demoUrl
            ? <DemoStatus url={project.demoUrl} />
            : (
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: '#2fd47a', letterSpacing: '0.04em' }}>
                ● live
              </span>
            )
        )}
      </div>

      {/* SVG motif */}
      <div
        className="card-motif"
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0', position: 'relative', zIndex: 1 }}
      >
        {index === 0 ? <ApiMotif /> : <WorkbenchMotif />}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3
          className="font-semibold text-foreground mb-3"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', letterSpacing: '-0.02em', lineHeight: 1.2 }}
        >
          {project.title}
        </h3>
        <p className="text-foreground/60 leading-relaxed" style={{ fontSize: '14px', maxWidth: '52ch' }}>
          {project.description}
        </p>
        <div style={{ marginTop: '20px', display: 'flex', gap: '8px', alignItems: 'center', fontFamily: 'var(--font-geist-mono)', fontSize: '12px', color: 'var(--amber)', letterSpacing: '0.04em' }}>
          {isExternal ? 'View project ↗' : 'View all work →'}
        </div>
      </div>
    </Link>
  );
}
