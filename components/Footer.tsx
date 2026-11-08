import Link from 'next/link';
import { PROFILE } from '@/lib/content';

const LINKS = [
  { label: 'email', href: `mailto:${PROFILE.email}` },
  { label: 'github', href: PROFILE.github, external: true },
  { label: 'linkedin', href: PROFILE.linkedin, external: true },
  { label: 'about', href: '/about' },
  { label: 'contact', href: '/contact' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="px-6 sm:px-8 pt-16 pb-10 mt-8 border-t border-foreground/10"
      style={{ fontFamily: 'var(--font-geist-mono)' }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
        {/* Left: identity */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-geist-sans)', letterSpacing: '-0.01em' }}>
            Charanselvam S
          </p>
          <p className="text-[12px] text-foreground/40 leading-relaxed" style={{ maxWidth: '36ch' }}>
            AI Integration Engineer · Chennai, India<br />
            Open to remote · Europe · Singapore
          </p>
        </div>

        {/* Right: nav links */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 sm:justify-end items-start">
          {LINKS.map(({ label, href, external }) => (
            <Link
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-[12px] text-foreground/40 hover:text-[var(--amber)] transition-colors"
              style={{ letterSpacing: '0.04em' }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-[11px] text-foreground/25" style={{ letterSpacing: '0.04em' }}>
          © {year} Charanselvam S
        </p>
        <p className="text-[11px] text-foreground/25" style={{ letterSpacing: '0.04em' }}>
          built with Next.js · deployed on Vercel
        </p>
      </div>
    </footer>
  );
};

export default Footer;
