'use client';

import { useEffect, useRef, useState } from 'react';
import { STATS } from '@/lib/content';

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(eased * to));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <p
      ref={ref}
      className="font-semibold text-foreground"
      style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1 }}
    >
      {value}{suffix}
    </p>
  );
}

export function GlanceBento() {
  const statRows = [
    { label: 'Years of experience', to: STATS.yearsExperience, suffix: '+' },
    { label: 'Integrations live', to: STATS.carriersIntegrated, suffix: '' },
    { label: 'AI projects in production', to: STATS.aiProjectsInProduction, suffix: '' },
    { label: 'OCI certifications', to: STATS.certifications, suffix: '' },
  ];

  return (
    <section className="px-6 sm:px-8 pt-16 pb-4">

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {statRows.map(({ label, to, suffix }) => (
          <div key={label}>
            <CountUp to={to} suffix={suffix} />
            <p
              className="text-foreground/55 mt-2"
              style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', letterSpacing: '0.06em' }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
