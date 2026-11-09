'use client';

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '13px',
        letterSpacing: '0.06em',
        padding: '12px 24px',
        background: 'var(--amber)',
        color: 'hsl(30 8% 5%)',
        border: 'none',
        borderRadius: '999px',
        cursor: 'pointer',
        fontWeight: 700,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      Download PDF ↓
    </button>
  );
}
