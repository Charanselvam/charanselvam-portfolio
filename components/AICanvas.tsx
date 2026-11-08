'use client';
import { useEffect, useRef } from 'react';

// Animated canvas: nodes (enterprise systems) connected by data flows.
// Thematically represents "connecting legacy systems to modern AI".
// Amber at ~12% opacity — backdrop, never foreground.

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
}

interface Packet {
  from: number;
  to: number;
  t: number; // 0–1 progress
  speed: number;
}

export function AICanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let disposed = false;

    const N = 14;
    const nodes: Node[] = [];
    const edges: [number, number][] = [];
    const packets: Packet[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      nodes.length = 0;
      edges.length = 0;
      packets.length = 0;

      // Seed nodes avoiding center (where hero text lives)
      for (let i = 0; i < N; i++) {
        nodes.push({
          x: 60 + Math.random() * (w - 120),
          y: 60 + Math.random() * (h - 120),
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: 2.5 + Math.random() * 2,
          pulse: Math.random() * Math.PI * 2,
        });
      }

      // Connect nearby nodes
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < w * 0.28) edges.push([i, j]);
        }
      }

      // Seed some packets
      for (let k = 0; k < 6; k++) {
        spawnPacket();
      }
    }

    function spawnPacket() {
      if (edges.length === 0) return;
      const e = edges[Math.floor(Math.random() * edges.length)];
      const reversed = Math.random() > 0.5;
      packets.push({
        from: reversed ? e[1] : e[0],
        to: reversed ? e[0] : e[1],
        t: Math.random(),
        speed: 0.0015 + Math.random() * 0.0025,
      });
    }

    const AMBER = '38 80% 50%';

    function draw(ts: number) {
      if (disposed) return;
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      // Update nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.025;
        if (n.x < 20 || n.x > w - 20) n.vx *= -1;
        if (n.y < 20 || n.y > h - 20) n.vy *= -1;
      }

      // Draw edges
      for (const [i, j] of edges) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = Math.max(0, 1 - dist / (w * 0.3)) * 0.09;
        ctx!.beginPath();
        ctx!.strokeStyle = `hsla(${AMBER} / ${alpha})`;
        ctx!.lineWidth = 0.8;
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
      }

      // Draw packets (data flowing along edges)
      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k];
        p.t += p.speed;
        if (p.t >= 1) {
          packets.splice(k, 1);
          spawnPacket();
          continue;
        }
        const a = nodes[p.from];
        const b = nodes[p.to];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx!.beginPath();
        ctx!.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${AMBER} / 0.55)`;
        ctx!.fill();
      }

      // Draw nodes
      for (const n of nodes) {
        const pulse = 0.6 + 0.4 * Math.sin(n.pulse);
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${AMBER} / 0.18)`;
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${AMBER} / 0.45)`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(canvas);

    init();
    raf = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
