export function PrintButton() {
  return (
    <a
      href="/resume.pdf"
      download="Charanselvam_S_Resume.pdf"
      style={{
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '13px',
        letterSpacing: '0.06em',
        padding: '12px 24px',
        background: 'var(--amber)',
        color: 'hsl(30 8% 5%)',
        borderRadius: '999px',
        fontWeight: 700,
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      Download PDF ↓
    </a>
  );
}
