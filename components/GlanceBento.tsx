import { NOW, STATS } from '@/lib/content';

export function GlanceBento() {
  const statRows = [
    { label: 'Years of experience', value: `${STATS.yearsExperience}+` },
    { label: 'Carriers integrated', value: STATS.carriersIntegrated },
    { label: 'AI projects in production', value: STATS.aiProjectsInProduction },
    { label: 'OCI certifications', value: STATS.certifications },
  ];

  return (
    <section className="px-6 sm:px-8 py-16 border-t border-foreground/10">
      <p
        className="text-[11px] text-foreground/40 uppercase tracking-widest mb-10"
        style={{ fontFamily: 'var(--font-geist-mono)' }}
      >
        At a glance
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NOW block */}
        <div
          style={{
            background: 'var(--surface)',
            padding: '2rem',
            borderRadius: '2px',
          }}
        >
          <p
            className="text-[11px] text-foreground/40 uppercase tracking-widest mb-6"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            Now
          </p>
          <div className="space-y-5">
            {NOW.map(({ key, text, link }) => (
              <div key={key}>
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    color: 'var(--amber)',
                    display: 'block',
                    marginBottom: '4px',
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
        </div>

        {/* Stats block */}
        <div
          style={{
            background: 'var(--surface)',
            padding: '2rem',
            borderRadius: '2px',
          }}
        >
          <p
            className="text-[11px] text-foreground/40 uppercase tracking-widest mb-6"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            Numbers
          </p>
          <div className="grid grid-cols-2 gap-6">
            {statRows.map(({ label, value }) => (
              <div key={label}>
                <p
                  className="font-semibold text-foreground"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
                >
                  {value}
                </p>
                <p
                  className="text-foreground/40 mt-1"
                  style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.04em' }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
