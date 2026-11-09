import { NOW } from '@/lib/content';

export function StatusCards() {
  return (
    <section className="px-6 sm:px-8 py-14">
      <p
        className="text-[13px] text-foreground/40 uppercase tracking-widest mb-8"
        style={{ fontFamily: 'var(--font-geist-mono)' }}
      >
        Now
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {NOW.map(({ key, text, link }) => (
          <div
            key={key}
            style={{
              background: 'var(--surface)',
              padding: '1.5rem',
              borderRadius: '2px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '13px',
                letterSpacing: '0.08em',
                color: 'var(--amber)',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              {key}
            </span>
            <p className="text-sm text-foreground/70 leading-relaxed">
              {text}
              {link && (
                <>
                  {' '}
                  <a
                    href={link[0]}
                    style={{ color: 'var(--amber)', textDecoration: 'underline' }}
                  >
                    {link[1]}
                  </a>
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
