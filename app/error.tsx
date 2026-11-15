'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to an error reporting service if one is added later
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: '80dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(24px, 6vw, 80px)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '13px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'hsl(var(--foreground) / 0.4)',
          marginBottom: '24px',
        }}
      >
        Something went wrong
      </p>

      <h1
        style={{
          fontSize: 'clamp(40px, 7vw, 100px)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          lineHeight: 0.9,
          margin: 0,
        }}
      >
        An error<br />
        <span style={{ color: 'var(--amber)' }}>occurred.</span>
      </h1>

      <p
        style={{
          marginTop: '32px',
          fontSize: '16px',
          color: 'hsl(var(--foreground) / 0.6)',
          maxWidth: '40ch',
        }}
      >
        Something unexpected happened. Try again or come back later.
      </p>

      <button
        onClick={reset}
        style={{
          marginTop: '40px',
          alignSelf: 'flex-start',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '13px',
          letterSpacing: '0.04em',
          padding: '10px 24px',
          borderRadius: '999px',
          border: 'none',
          background: 'var(--amber)',
          color: 'hsl(30 8% 5%)',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </main>
  );
}
