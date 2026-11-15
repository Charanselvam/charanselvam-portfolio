import Link from 'next/link';

export const metadata = { title: '404 — Page not found' };

export default function NotFound() {
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
        404 — Not found
      </p>

      <h1
        style={{
          fontSize: 'clamp(56px, 10vw, 140px)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          lineHeight: 0.9,
          margin: 0,
        }}
      >
        This page<br />
        <span style={{ color: 'var(--amber)' }}>doesn&apos;t exist.</span>
      </h1>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '48px' }}>
        {[
          { href: '/', label: 'Home' },
          { href: '/work', label: 'Work' },
          { href: '/contact', label: 'Contact' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '13px',
              letterSpacing: '0.04em',
              padding: '10px 20px',
              borderRadius: '999px',
              border: '1px solid hsl(var(--foreground) / 0.25)',
              color: 'hsl(var(--foreground))',
              textDecoration: 'none',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            className="hover:border-[var(--amber)] hover:text-[var(--amber)]"
          >
            {label}
          </Link>
        ))}
      </div>
    </main>
  );
}
