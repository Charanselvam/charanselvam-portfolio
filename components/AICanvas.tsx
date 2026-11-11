'use client';
import { useEffect, useRef } from 'react';
import type React from 'react';

export type AICanvasKind = 'flow' | 'nn' | 'attention' | 'mesh';

// ─── Flow-field scene (home hero) ───────────────────────────────────────────

type Particle = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; amber: boolean };

function spawnParticle(W: number, H: number, stagger = false): Particle {
  const maxLife = 220 + Math.random() * 320;
  return { x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, life: stagger ? Math.random() * maxLife : 0, maxLife, amber: Math.random() < 0.08 };
}

function makeFlowScene(W: number, H: number) {
  const SCALE = 0.0014, SPEED = 1.1, COUNT = 160;
  const particles: Particle[] = [];
  for (let i = 0; i < COUNT; i++) particles.push(spawnParticle(W, H, true));
  return {
    resize(w: number, h: number) {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) particles.push(spawnParticle(w, h, true));
    },
    frame(ctx: CanvasRenderingContext2D, t: number, w: number, h: number, fadeFill: string) {
      ctx.fillStyle = fadeFill;
      ctx.fillRect(0, 0, w, h);
      for (const p of particles) {
        const nx = p.x * SCALE, ny = p.y * SCALE;
        const angle = (Math.sin(nx + t * 0.6) * Math.cos(ny * 1.4 + t * 0.45) + Math.sin(ny * 0.9 - t * 0.35) * 0.55) * Math.PI * 2.4;
        const tx = Math.cos(angle) * SPEED, ty = Math.sin(angle) * SPEED;
        p.vx += (tx - p.vx) * 0.06; p.vy += (ty - p.vy) * 0.06;
        p.x += p.vx; p.y += p.vy; p.life++;
        const prog = p.life / p.maxLife;
        const alpha = prog < 0.1 ? prog * 10 : prog > 0.82 ? (1 - prog) / 0.18 : 1;
        if (p.amber) {
          ctx.fillStyle = `rgba(210,148,38,${(alpha * 0.55).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.fillStyle = `rgba(238,232,218,${(alpha * 0.14).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, 0.9, 0, Math.PI * 2); ctx.fill();
        }
        if (p.life >= p.maxLife || p.x < -12 || p.x > w + 12 || p.y < -12 || p.y > h + 12) {
          Object.assign(p, spawnParticle(w, h, false));
        }
      }
    },
  };
}

// ─── Neural-network scene (work page) ───────────────────────────────────────

type NNNode = { x: number; y: number };
type Signal = { x1: number; y1: number; x2: number; y2: number; t: number; speed: number };

const NN_LAYERS = [3, 5, 4, 2];

function makeNNScene(W: number, H: number) {
  let nodes: NNNode[][] = [];
  let signals: Signal[] = [];

  function buildNodes(w: number, h: number) {
    const marginX = w * 0.14;
    const spanX = w - 2 * marginX;
    const gap = Math.min(h / 7, 50);
    nodes = NN_LAYERS.map((count, li) => {
      const x = marginX + (li / (NN_LAYERS.length - 1)) * spanX;
      return Array.from({ length: count }, (_, ni) => ({
        x, y: h / 2 + (ni - (count - 1) / 2) * gap,
      }));
    });
  }

  function spawnSignal() {
    const li = Math.floor(Math.random() * (NN_LAYERS.length - 1));
    const a = nodes[li][Math.floor(Math.random() * NN_LAYERS[li])];
    const b = nodes[li + 1][Math.floor(Math.random() * NN_LAYERS[li + 1])];
    signals.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, t: 0, speed: 0.009 + Math.random() * 0.005 });
  }

  buildNodes(W, H);
  for (let i = 0; i < 4; i++) spawnSignal();

  return {
    resize(w: number, h: number) { buildNodes(w, h); signals = []; for (let i = 0; i < 4; i++) spawnSignal(); },
    frame(ctx: CanvasRenderingContext2D, _t: number, w: number, h: number) {
      ctx.clearRect(0, 0, w, h);

      // Connections
      ctx.lineWidth = 0.8;
      for (let li = 0; li < NN_LAYERS.length - 1; li++) {
        for (const a of nodes[li]) for (const b of nodes[li + 1]) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(220,210,190,0.07)';
          ctx.stroke();
        }
      }

      // Signals
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.t += s.speed;
        if (s.t >= 1) { signals.splice(i, 1); spawnSignal(); continue; }
        const x = s.x1 + (s.x2 - s.x1) * s.t;
        const y = s.y1 + (s.y2 - s.y1) * s.t;
        const alpha = Math.sin(s.t * Math.PI);
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 12);
        grd.addColorStop(0, `rgba(210,148,38,${(alpha * 0.5).toFixed(3)})`);
        grd.addColorStop(1, 'rgba(210,148,38,0)');
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(210,148,38,${alpha.toFixed(3)})`;
        ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill();
      }

      // Nodes
      for (const layer of nodes) for (const n of layer) {
        ctx.fillStyle = 'rgba(220,210,190,0.06)';
        ctx.beginPath(); ctx.arc(n.x, n.y, 9, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(220,210,190,0.22)';
        ctx.beginPath(); ctx.arc(n.x, n.y, 3.5, 0, Math.PI * 2); ctx.fill();
      }
    },
  };
}

// ─── Attention-heatmap scene (about page) ───────────────────────────────────

function makeAttentionScene() {
  return {
    resize() {},
    frame(ctx: CanvasRenderingContext2D, t: number, w: number, h: number) {
      ctx.clearRect(0, 0, w, h);
      const N = 10;
      const size = Math.min(w, h) * 0.72;
      const cell = size / N;
      const ox = (w - size) / 2;
      const oy = (h - size) / 2;

      for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
          // Two overlapping wave patterns that shift with time
          const wave1 = Math.cos((r - c) * 0.5 + t * 0.6) * 0.5 + 0.5;
          const wave2 = Math.cos((r + c) * 0.35 - t * 0.4) * 0.3 + 0.7;
          const score = wave1 * wave2;
          // Stronger diagonal — typical of causal attention
          const diagBoost = Math.exp(-Math.abs(r - c) * 0.4) * 0.35;
          const alpha = Math.max(0, Math.min(1, score * 0.28 + diagBoost));

          ctx.fillStyle = `rgba(210,148,38,${alpha.toFixed(3)})`;
          ctx.fillRect(ox + c * cell + 1, oy + r * cell + 1, cell - 2, cell - 2);
        }
      }

      // Grid lines
      ctx.strokeStyle = 'rgba(220,210,190,0.06)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= N; i++) {
        ctx.beginPath(); ctx.moveTo(ox + i * cell, oy); ctx.lineTo(ox + i * cell, oy + size); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(ox, oy + i * cell); ctx.lineTo(ox + size, oy + i * cell); ctx.stroke();
      }
    },
  };
}

// ─── Mesh scene (ambient footer) ────────────────────────────────────────────

type MeshNode = { x: number; y: number; vx: number; vy: number };
type MeshSignal = { a: MeshNode; b: MeshNode; t: number; speed: number };

function makeMeshScene(W: number, H: number) {
  let nodes: MeshNode[] = [];
  let signals: MeshSignal[] = [];
  const THRESH = 190;

  function d(a: MeshNode, b: MeshNode) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }

  function spawnSignal() {
    const ai = Math.floor(Math.random() * nodes.length);
    const a = nodes[ai];
    const near = nodes.filter((b) => b !== a && d(a, b) < THRESH);
    if (!near.length) return;
    const b = near[Math.floor(Math.random() * near.length)];
    signals.push({ a, b, t: 0, speed: 0.004 + Math.random() * 0.003 });
  }

  function build(w: number, h: number) {
    const count = Math.min(80, Math.max(24, Math.floor((w * h) / 5500)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
    }));
    signals = [];
    for (let i = 0; i < 8; i++) spawnSignal();
  }

  build(W, H);

  return {
    resize(w: number, h: number) { build(w, h); },
    frame(ctx: CanvasRenderingContext2D, _t: number, w: number, h: number) {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = d(nodes[i], nodes[j]);
          if (dist < THRESH) {
            ctx.strokeStyle = `rgba(220,210,190,${((1 - dist / THRESH) * 0.09).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.t += s.speed;
        if (s.t >= 1) { signals.splice(i, 1); spawnSignal(); continue; }
        const x = s.a.x + (s.b.x - s.a.x) * s.t;
        const y = s.a.y + (s.b.y - s.a.y) * s.t;
        const alpha = Math.sin(s.t * Math.PI);
        const g = ctx.createRadialGradient(x, y, 0, x, y, 10);
        g.addColorStop(0, `rgba(210,148,38,${(alpha * 0.4).toFixed(3)})`);
        g.addColorStop(1, 'rgba(210,148,38,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(210,148,38,${(alpha * 0.85).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
      }

      for (const n of nodes) {
        ctx.fillStyle = 'rgba(220,210,190,0.12)';
        ctx.beginPath(); ctx.arc(n.x, n.y, 2, 0, Math.PI * 2); ctx.fill();
      }
    },
  };
}

// ─── Component ──────────────────────────────────────────────────────────────

type Scene = ReturnType<typeof makeFlowScene>;

export function AICanvas({
  className = '',
  style,
  kind = 'flow',
}: {
  className?: string;
  style?: React.CSSProperties;
  kind?: AICanvasKind;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let disposed = false, raf = 0, visible = true, t = 0, W = 0, H = 0;

    function bgFade() {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--background').trim();
      return raw ? `hsl(${raw} / 0.07)` : 'rgba(13,12,11,0.07)';
    }
    let fadeFill = bgFade();

    let scene: Scene | null = null;

    function resize() {
      const r = canvas!.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!scene) {
        scene = kind === 'nn' ? makeNNScene(W, H) : kind === 'attention' ? (makeAttentionScene() as unknown as Scene) : kind === 'mesh' ? (makeMeshScene(W, H) as unknown as Scene) : makeFlowScene(W, H);
      } else {
        scene.resize(W, H);
      }
    }

    function frame() {
      t += 0.004;
      if (kind === 'flow') {
        (scene as ReturnType<typeof makeFlowScene>).frame(ctx!, t, W, H, fadeFill);
      } else {
        (scene as unknown as { frame: (c: CanvasRenderingContext2D, t: number, w: number, h: number) => void }).frame(ctx!, t, W, H);
      }
    }

    const start = () => { if (!raf && !reduced && visible && !document.hidden) raf = requestAnimationFrame(loop); };
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };
    const loop = () => { raf = 0; if (!visible || disposed) return; frame(); raf = requestAnimationFrame(loop); };
    const onVis = () => (document.hidden ? stop() : start());

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }, { rootMargin: '100px' });
    const ro = new ResizeObserver(resize);
    const mo = new MutationObserver(() => { fadeFill = bgFade(); });

    const boot = () => {
      if (disposed) return;
      resize();
      if (reduced) { frame(); return; }
      io.observe(canvas!);
      ro.observe(canvas!);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      document.addEventListener('visibilitychange', onVis);
      start();
    };

    if (document.readyState === 'complete') boot();
    else window.addEventListener('load', boot, { once: true });

    return () => {
      disposed = true;
      stop();
      window.removeEventListener('load', boot as EventListener);
      io.disconnect(); ro.disconnect(); mo.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [kind]);

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', ...style }}
    />
  );
}
