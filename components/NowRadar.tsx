'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { NOW } from '@/lib/content';

const PERIOD = 9000;
const R = 150;
const UPDATED = 'November 2026';

export function NowRadar() {
  const blocks = NOW.filter((b) => b.text);
  const n = blocks.length;
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState<number | null>(null);
  const [month, setMonth] = useState<{ day: number; days: number } | null>(null);

  useEffect(() => {
    const d = new Date();
    setMonth({ day: d.getDate(), days: new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate() });
  }, []);

  const sweep = useRef<SVGGElement>(null);
  const box = useRef<HTMLElement>(null);
  const heldRef = useRef(held);
  heldRef.current = held;

  const blip = (i: number) => {
    const a = ((i + 0.55) / n) * 2 * Math.PI - Math.PI / 2;
    const r = R * (0.42 + 0.5 * ((i * 37) % 10) / 10);
    return { x: Math.cos(a) * r, y: Math.sin(a) * r };
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0, on = false, t0 = performance.now(), last = -1;

    const tick = (now: number) => {
      if (heldRef.current === null) {
        const deg = (((now - t0) % PERIOD) / PERIOD) * 360;
        if (sweep.current) sweep.current.setAttribute('transform', `rotate(${deg.toFixed(1)})`);
        const i = Math.floor((deg / 360) * n) % n;
        if (i !== last) { last = i; setActive(i); }
      } else {
        t0 = now - (((heldRef.current + 0.6) / n) * PERIOD);
      }
      raf = on ? requestAnimationFrame(tick) : 0;
    };

    const io = new IntersectionObserver(([e]) => {
      on = e.isIntersecting;
      if (on && !raf) raf = requestAnimationFrame(tick);
      else if (!on) { cancelAnimationFrame(raf); raf = 0; }
    });

    if (box.current) io.observe(box.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [n]);

  const cur = held === null ? active : held;
  const hold = (i: number) => () => setHeld(i);
  const release = () => setHeld(null);
  const sinPi4 = (R * Math.sin(Math.PI / 4)).toFixed(1);
  const cosPi4 = (-R * Math.cos(Math.PI / 4)).toFixed(1);

  return (
    <section ref={box as React.RefObject<HTMLElement>} style={{ padding: '110px 0', borderBottom: '1px solid var(--line)' }}>
      <style>{`
        @keyframes nowr-ping {
          0%   { r: 7px; opacity: 0.7; }
          100% { r: 22px; opacity: 0; }
        }
        .nowr-ping-active { animation: nowr-ping 1.2s ease-out infinite; }
        .nowr-item {
          position: relative;
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 16px 20px 16px 24px;
          background: var(--surface);
          outline: none;
          transition: border-color 0.3s, background-color 0.3s, transform 0.4s cubic-bezier(.16,1,.3,1);
          cursor: default;
        }
        .nowr-item::before {
          content: "";
          position: absolute;
          left: 0; top: 14px; bottom: 14px;
          width: 3px;
          border-radius: 3px;
          background: var(--amber);
          transform: scaleY(0);
          transition: transform 0.35s cubic-bezier(.16,1,.3,1);
        }
        .nowr-item.on {
          border-color: color-mix(in srgb, var(--amber) 50%, var(--line));
          background: color-mix(in srgb, var(--amber) 7%, var(--surface));
          transform: translateX(6px);
        }
        .nowr-item.on::before { transform: scaleY(1); }
        .nowr-item:focus-visible { outline: 2px solid var(--amber); outline-offset: 3px; }
        @media (max-width: 860px) {
          .nowr-grid { grid-template-columns: minmax(0, 1fr) !important; }
          .nowr-radar-wrap { max-width: 320px; margin: 0 auto; }
          .nowr-item.on { transform: none !important; }
          .nowr-month { width: 100% !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nowr-ping-active { animation: none !important; }
          .nowr-item, .nowr-item::before { transition: none !important; }
          .nowr-track-fill { transition: none !important; }
        }
      `}</style>

      <div className="px-6 sm:px-8">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', letterSpacing: '0.08em', color: 'hsl(var(--foreground)/0.4)', display: 'flex', alignItems: 'center' }}>
              <span className="nowr-live" aria-hidden="true" />
              Right now · {UPDATED}
            </span>
            <h2
              className="font-bold rv"
              style={{ margin: '20px 0 0', fontSize: 'clamp(48px, 6.4vw, 100px)', letterSpacing: '-0.04em', lineHeight: 0.9 }}
            >
              On my{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--amber)' }}>radar</em>
            </h2>
          </div>

          {/* Day progress bar */}
          <div
            className="nowr-month"
            aria-hidden="true"
            style={{ display: 'flex', alignItems: 'center', gap: '16px', width: 'min(360px, 100%)', paddingBottom: '8px', color: 'hsl(var(--foreground)/0.4)', fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.08em' }}
          >
            <span style={{ flexShrink: 0 }}>
              {month ? `Day ${month.day} of ${month.days}` : 'This month'}
            </span>
            <span style={{ flex: 1, height: '4px', borderRadius: '4px', background: 'var(--line)', overflow: 'hidden' }}>
              <i
                className="nowr-track-fill"
                style={{
                  display: 'block',
                  height: '100%',
                  background: 'var(--amber)',
                  transformOrigin: 'left',
                  transform: `scaleX(${month ? month.day / month.days : 0})`,
                  transition: 'transform 1.2s cubic-bezier(.16,1,.3,1)',
                }}
              />
            </span>
          </div>
        </div>

        {/* Radar + cards */}
        <div
          className="nowr-grid"
          style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'minmax(280px, 420px) minmax(0, 1fr)', gap: '56px', alignItems: 'center' }}
        >
          {/* SVG radar */}
          <div className="nowr-radar-wrap">
            <svg style={{ width: '100%', height: 'auto', overflow: 'visible' }} viewBox="-170 -170 340 340" aria-hidden="true">
              <defs>
                <radialGradient id="nowr-glow">
                  <stop offset="0" stopColor="var(--amber)" stopOpacity=".18" />
                  <stop offset="1" stopColor="var(--amber)" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="nowr-beam" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="var(--amber)" stopOpacity="0" />
                  <stop offset="1" stopColor="var(--amber)" stopOpacity=".55" />
                </linearGradient>
              </defs>

              <circle r={R + 12} fill="url(#nowr-glow)" />
              {[0.25, 0.5, 0.75, 1].map((k) => (
                <circle key={k} r={R * k} fill="none" stroke="var(--line)" strokeWidth="1" />
              ))}
              <path d={`M${-R} 0H${R}M0 ${-R}V${R}`} stroke="var(--line)" strokeWidth="1" fill="none" />

              <g ref={sweep} transform={`rotate(${(((cur + 0.6) / n) * 360).toFixed(1)})`}>
                <path
                  d={`M0 0L0 ${-R}A${R} ${R} 0 0 1 ${sinPi4} ${cosPi4}Z`}
                  fill="url(#nowr-beam)"
                  transform="rotate(-45)"
                />
                <line x1="0" y1="0" x2="0" y2={-R} stroke="var(--amber)" strokeWidth="2" strokeOpacity="0.8" />
              </g>

              {blocks.map((b, i) => {
                const p = blip(i);
                const isActive = i === cur;
                return (
                  <g
                    key={b.key}
                    transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}
                    onMouseEnter={hold(i)}
                    onMouseLeave={release}
                    style={{ cursor: 'default' }}
                  >
                    <circle
                      r="16"
                      fill="none"
                      stroke="var(--amber)"
                      strokeWidth="1.5"
                      opacity={isActive ? 1 : 0}
                      className={isActive ? 'nowr-ping-active' : ''}
                    />
                    <circle r={isActive ? 7 : 5} fill={isActive ? 'var(--amber)' : 'hsl(var(--foreground)/0.3)'} style={{ transition: 'fill 0.3s, r 0.3s' }} />
                    <text
                      y="-12"
                      textAnchor="middle"
                      style={{
                        fontFamily: 'var(--font-geist-mono)',
                        fontSize: '9px',
                        fill: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--foreground)/0.45)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        transition: 'fill 0.3s',
                      } as React.CSSProperties}
                    >
                      {b.key}
                    </text>
                  </g>
                );
              })}
              <circle r="3" fill="var(--amber)" />
            </svg>
          </div>

          {/* Card list */}
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px' }}>
            {blocks.map((b, i) => (
              <li
                key={b.key}
                className={`nowr-item${i === cur ? ' on' : ''}`}
                onMouseEnter={hold(i)}
                onMouseLeave={release}
                onFocus={hold(i)}
                onBlur={release}
                tabIndex={0}
              >
                <div style={{ display: 'flex', gap: '10px', fontFamily: 'var(--font-geist-mono)', fontSize: '10.5px', color: 'var(--amber)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  <span style={{ color: 'hsl(var(--foreground)/0.4)' }}>{String(i + 1).padStart(2, '0')}</span>
                  {b.key}
                </div>
                <p style={{ margin: '8px 0 0', fontSize: '15px', lineHeight: 1.5, color: 'hsl(var(--foreground)/0.75)' }}>
                  {b.text}
                </p>
                {b.link && (
                  <Link
                    href={b.link[0]}
                    style={{ display: 'inline-block', marginTop: '8px', fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'hsl(var(--foreground)/0.45)', textDecoration: 'underline', letterSpacing: '0.04em' }}
                  >
                    {b.link[1]} →
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
