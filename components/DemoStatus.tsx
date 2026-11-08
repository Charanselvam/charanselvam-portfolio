'use client';
import { useEffect, useState } from 'react';

type State = 'checking' | 'live' | 'offline';

export function DemoStatus({ url }: { url: string }) {
  const [state, setState] = useState<State>('checking');

  useEffect(() => {
    let disposed = false;
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 5000);

    fetch(`/api/ping?url=${encodeURIComponent(url)}`, { signal: ctrl.signal })
      .then((r) => { if (!disposed) setState(r.ok ? 'live' : 'offline'); })
      .catch(() => { if (!disposed) setState('offline'); })
      .finally(() => clearTimeout(timeout));

    return () => { disposed = true; ctrl.abort(); clearTimeout(timeout); };
  }, [url]);

  if (state === 'checking') return null;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '11px',
        letterSpacing: '0.04em',
        color: state === 'live' ? '#2fd47a' : 'hsl(var(--muted-foreground))',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: state === 'live' ? '#2fd47a' : 'hsl(var(--muted-foreground))',
        }}
      />
      {state === 'live' ? 'live' : 'offline'}
    </span>
  );
}
