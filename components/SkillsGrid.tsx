'use client';

import { SKILLS } from '@/lib/content';

const LEVEL_LABEL: Record<number, string> = { 5: 'Core', 4: 'Strong', 3: 'Working', 2: 'Exploring' };

export function SkillsGrid() {
  return (
    <section className="px-6 sm:px-8 py-14">
      <style>{`
        .skill-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 11px;
          border-radius: 999px;
          font-size: 13px;
          font-family: var(--font-geist-mono);
          letter-spacing: 0.03em;
          opacity: 0;
          animation: chip-in 0.3s ease both;
          animation-delay: calc(var(--i, 0) * 50ms + 100ms);
        }
        @keyframes chip-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .skill-chip { opacity: 1; animation: none; }
        }
        .skill-chip.lv5 {
          background: var(--amber);
          color: hsl(30 8% 5%);
          font-weight: 600;
        }
        .skill-chip.lv4 {
          background: hsl(var(--foreground) / 0.12);
          color: hsl(var(--foreground) / 0.9);
          border: 1px solid hsl(var(--foreground) / 0.15);
        }
        .skill-chip.lv3 {
          background: transparent;
          color: hsl(var(--foreground) / 0.55);
          border: 1px solid hsl(var(--foreground) / 0.12);
        }
        .skill-chip.lv2 {
          background: transparent;
          color: hsl(var(--foreground) / 0.35);
          border: 1px dashed hsl(var(--foreground) / 0.15);
        }
        .skill-depth-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: hsl(var(--foreground) / 0.12);
          transition: background 0.2s;
        }
        .skill-depth-dot.on {
          background: var(--amber);
        }
      `}</style>

      <p
        className="text-[13px] text-foreground/40 uppercase tracking-widest mb-8"
        style={{ fontFamily: 'var(--font-geist-mono)' }}
      >
        Skills
      </p>

      {/* Legend */}
      <div
        className="flex flex-wrap gap-x-5 gap-y-2 mb-10"
        style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: 'hsl(var(--foreground) / 0.5)' }}
      >
        {([5, 4, 3, 2] as const).map((lv) => (
          <span key={lv} className="inline-flex items-center gap-2">
            <span
              style={{
                width: 10, height: 10, borderRadius: '50%',
                background: lv === 5 ? 'var(--amber)' : lv === 4 ? 'hsl(var(--foreground) / 0.5)' : lv === 3 ? 'hsl(var(--foreground) / 0.25)' : 'hsl(var(--foreground) / 0.12)',
              }}
            />
            {LEVEL_LABEL[lv]}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {SKILLS.map(({ group, items }, gi) => {
          const avg = items.reduce((a, [, v]) => a + v, 0) / items.length;
          return (
            <div key={group}>
              {/* Header */}
              <div className="flex justify-between items-baseline mb-3">
                <span className="font-semibold text-foreground" style={{ fontSize: '15px' }}>{group}</span>
                <span
                  style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: 'hsl(var(--foreground) / 0.3)' }}
                >
                  {String(gi + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Depth meter */}
              <div
                className="flex gap-1 mb-4"
                title={`Average depth ${avg.toFixed(1)} / 5`}
                aria-hidden="true"
              >
                {[1, 2, 3, 4, 5].map((d) => (
                  <span
                    key={d}
                    className={`skill-depth-dot${avg >= d - 0.25 ? ' on' : ''}`}
                  />
                ))}
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-2">
                {items.map(([name, lv], ki) => (
                  <span
                    key={name}
                    className={`skill-chip lv${lv}`}
                    style={{ '--i': String(gi * 3 + ki) } as React.CSSProperties}
                    title={LEVEL_LABEL[lv]}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
