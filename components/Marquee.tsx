import { MARQUEE_TAGS } from '@/lib/content';

const TAGS = [...MARQUEE_TAGS, ...MARQUEE_TAGS];

export function Marquee() {
  return (
    <div
      style={{ background: 'var(--amber)', overflow: 'hidden' }}
      aria-hidden="true"
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marq 22s linear infinite',
        }}
      >
        {TAGS.map((tag, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '13px',
              letterSpacing: '0.04em',
              color: 'hsl(30 8% 5%)',
              padding: '10px 24px',
              whiteSpace: 'nowrap',
            }}
          >
            {tag}
            <span style={{ margin: '0 12px', opacity: 0.4 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
