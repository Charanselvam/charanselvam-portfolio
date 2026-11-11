import Link from 'next/link';
import { PROFILE } from '@/lib/content';

const PAGES = [
  ['Home', '/'],
  ['Work', '/work'],
  ['About', '/about'],
  ['Resume', '/resume'],
  ['Contact', '/contact'],
  ['Ask AI', '/ai'],
];

const PROFILES = [
  ['GitHub ↗', PROFILE.github],
  ['LinkedIn ↗', PROFILE.linkedin],
];

const SOCIAL = [
  {
    label: 'GitHub',
    href: PROFILE.github,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true">
        <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: PROFILE.linkedin,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${PROFILE.email}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
];

const Footer = () => (
  <footer
    style={{
      background: 'hsl(var(--foreground))',
      color: 'hsl(var(--background))',
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    <style>{`
      .foot-soc {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        border: 1px solid hsl(var(--background) / 0.2);
        color: hsl(var(--background) / 0.7);
        text-decoration: none;
        transition: border-color 0.2s, color 0.2s;
      }
      .foot-soc:hover { border-color: var(--amber); color: var(--amber); }
      .foot-ul {
        display: block;
        font-size: 15px;
        color: hsl(var(--background) / 0.6);
        text-decoration: none;
        transition: color 0.2s;
        line-height: 1.9;
      }
      .foot-ul:hover { color: var(--amber); }
      .foot-col-head {
        font-family: var(--font-geist-mono);
        font-size: 11px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: hsl(var(--background) / 0.35);
        margin-bottom: 14px;
      }
      .foot-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        align-items: start;
      }
      @media (min-width: 768px) {
        .foot-grid {
          grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.2fr);
        }
      }
    `}</style>

    {/* Main grid */}
    <div
      className="foot-grid px-6 sm:px-8"
      style={{ paddingTop: '56px', paddingBottom: '32px' }}
    >
      {/* Col 1: tagline + email + social icons */}
      <div>
        <p
          style={{
            margin: 0,
            fontSize: 'clamp(20px, 2.5vw, 32px)',
            lineHeight: 1.1,
            maxWidth: '16ch',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'hsl(var(--background))',
          }}
        >
          Open to work. Let&apos;s build something.
        </p>
        <a
          href={`mailto:${PROFILE.email}`}
          style={{
            display: 'block',
            marginTop: '14px',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '13px',
            letterSpacing: '0.03em',
            color: 'hsl(var(--background) / 0.7)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          className="hover:text-[var(--amber)]"
        >
          {PROFILE.email} ↗
        </a>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          {SOCIAL.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              className="foot-soc"
              aria-label={label}
              title={label}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Col 2: Pages */}
      <nav aria-label="Footer pages">
        <div className="foot-col-head">Pages</div>
        {PAGES.map(([name, href]) => (
          <Link key={href} href={href} className="foot-ul">{name}</Link>
        ))}
      </nav>

      {/* Col 3: Profiles */}
      <div>
        <div className="foot-col-head">Profiles</div>
        {PROFILES.map(([label, href]) => (
          <a key={href} href={href} className="foot-ul" target="_blank" rel="noopener noreferrer">{label}</a>
        ))}
      </div>

      {/* Col 4: Contact */}
      <div>
        <div className="foot-col-head">Contact</div>
        <a href={`mailto:${PROFILE.email}`} className="foot-ul">{PROFILE.email}</a>
        <span style={{ display: 'block', fontSize: '15px', color: 'hsl(var(--background) / 0.4)', lineHeight: 1.9 }}>
          Chennai, India · open to relocate
        </span>
        <a
          href={`mailto:${PROFILE.email}`}
          style={{
            display: 'inline-block',
            marginTop: '14px',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '13px',
            letterSpacing: '0.04em',
            padding: '10px 18px',
            background: 'var(--amber)',
            color: 'hsl(30 8% 5%)',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Email me →
        </a>
      </div>
    </div>

    {/* Bottom bar */}
    <div
      className="px-6 sm:px-8"
      style={{
        paddingBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '13px',
        color: 'hsl(var(--background) / 0.3)',
        borderTop: '1px solid hsl(var(--background) / 0.08)',
        paddingTop: '16px',
      }}
    >
      <span>© 2026 Charanselvam S · built with Next.js</span>
      <span>AI Integration Engineer · connecting legacy systems to modern AI</span>
    </div>

    {/* Watermark name */}
    <div
      aria-hidden="true"
      style={{
        fontFamily: 'var(--font-geist-sans)',
        fontWeight: 700,
        fontSize: 'clamp(40px, 12vw, 200px)',
        letterSpacing: '-0.04em',
        lineHeight: 0.85,
        whiteSpace: 'nowrap',
        color: 'hsl(var(--background) / 0.08)',
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
