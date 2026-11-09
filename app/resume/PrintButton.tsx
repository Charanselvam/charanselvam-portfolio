'use client';

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '12px',
        letterSpacing: '0.08em',
        padding: '9px 18px',
        background: 'var(--amber)',
        color: 'hsl(30 8% 5%)',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 700,
      }}
    >
      PRINT / SAVE PDF
    </button>
  );
}
