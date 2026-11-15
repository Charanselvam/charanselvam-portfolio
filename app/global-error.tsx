'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, sans-serif',
          background: 'hsl(30 8% 5%)',
          color: 'hsl(35 15% 88%)',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 clamp(24px, 6vw, 80px)',
        }}
      >
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: '13px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0.4,
            marginBottom: '24px',
          }}
        >
          Critical error
        </p>

        <h1
          style={{
            fontSize: 'clamp(40px, 7vw, 100px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            margin: 0,
            color: 'hsl(38 80% 55%)',
          }}
        >
          Something broke.
        </h1>

        <button
          onClick={reset}
          style={{
            marginTop: '48px',
            alignSelf: 'flex-start',
            fontFamily: 'monospace',
            fontSize: '13px',
            padding: '10px 24px',
            border: 'none',
            background: 'hsl(38 80% 55%)',
            color: 'hsl(30 8% 5%)',
            fontWeight: 600,
            cursor: 'pointer',
            borderRadius: '999px',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
