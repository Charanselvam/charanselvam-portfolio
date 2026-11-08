import Link from 'next/link';
import { PROFILE } from '@/lib/content';

const LINKS = [
  { label: 'email', href: `mailto:${PROFILE.email}` },
  { label: 'github', href: PROFILE.github, external: true },
  { label: 'linkedin', href: PROFILE.linkedin, external: true },
  { label: 'about', href: '/about' },
  { label: 'contact', href: '/contact' },
];

const YEAR = 2026;

const Footer = () => (
  <footer
    style={{
      background: 'hsl(var(--foreground))',
      color: 'hsl(var(--background))',
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    {/* Upper: invitation + links */}
    <div
      className="px-6 sm:px-8 pt-14 pb-10"
      style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'start' }}
    >
      {/* Invitation */}
      <div>
        <p
          className="font-semibold leading-tight"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', letterSpacing: '-0.025em', maxWidth: '14ch', color: 'hsl(var(--background))' }}
        >
          Open to work. Let&apos;s build something.
        </p>
        <a
          href={`mailto:${PROFILE.email}`}
          style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '13px',
            letterSpacing: '0.03em',
            padding: '10px 20px',
            background: 'var(--amber)',
            color: 'hsl(30 8% 5%)',
            textDecoration: 'none',
          }}
        >
          Email me →
        </a>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '4px' }}>
        {LINKS.map(({ label, href, external }) => (
          <Link
            key={label}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '12px',
              letterSpacing: '0.04em',
              color: 'hsl(var(--background) / 0.5)',
              textDecoration: 'none',
            }}
            className="hover:text-[var(--amber)] transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>

    {/* Legal line above name */}
    <div
      className="px-6 sm:px-8"
      style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}
    >
      <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'hsl(var(--background) / 0.3)', letterSpacing: '0.04em' }}>
        © {YEAR} Charanselvam S
      </span>
      <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'hsl(var(--background) / 0.3)', letterSpacing: '0.04em' }}>
        built with Next.js
      </span>
    </div>

    {/* Cropped name — the monument close */}
    <div
      aria-hidden="true"
      style={{
        fontFamily: 'var(--font-geist-sans)',
        fontWeight: 700,
        fontSize: 'clamp(72px, 16vw, 220px)',
        letterSpacing: '-0.04em',
        lineHeight: 0.85,
        whiteSpace: 'nowrap',
        color: 'hsl(var(--background) / 0.12)',
        paddingLeft: '24px',
        transform: 'translateY(28%)',
        userSelect: 'none',
      }}
    >
      CHARANSELVAM S
    </div>
  </footer>
);

export default Footer;
