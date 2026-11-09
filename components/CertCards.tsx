interface Cert {
  abbrev: string;
  issuer: string;
  title: string;
  description: string;
  year: string;
  badgeUrl?: string;
  linkLabel?: string;
}

const OCI_CERTS: Cert[] = [
  {
    abbrev: 'GEN AI',
    issuer: 'Oracle Cloud',
    title: 'OCI Gen AI Professional',
    description: 'Retrieval-augmented generation, prompt engineering, and deploying generative AI services on Oracle Cloud Infrastructure.',
    year: '2024',
    badgeUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=DA062811E79F1E91A46CCA426EFA8B21B190E4EC828497D68CA92D967F845687',
    linkLabel: 'Credly ↗',
  },
  {
    abbrev: 'VEC',
    issuer: 'Oracle Cloud',
    title: 'OCI AI Vector Search',
    description: 'Vector embeddings, similarity search, and integrating AI vector databases into enterprise applications.',
    year: '2024',
    badgeUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=CC8011EC6D7750B3D2BF06BE54B8BEE7AFDDFDD53311CB055CDE5041045F8AE9',
    linkLabel: 'Credly ↗',
  },
  {
    abbrev: 'AI',
    issuer: 'Oracle Cloud',
    title: 'OCI AI Foundations',
    description: 'Core AI and machine learning concepts, Oracle AI services, and cloud-based model training and deployment.',
    year: '2024',
    badgeUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=6FC127CCA1AF56D2A950C837C213B4D6F210FC6189B57FE4DC7645BDD00C6C1A',
    linkLabel: 'Credly ↗',
  },
  {
    abbrev: 'DS',
    issuer: 'Oracle Cloud',
    title: 'OCI Data Science',
    description: 'Model development lifecycle, feature engineering, and productionising machine learning pipelines on OCI.',
    year: '2024',
    badgeUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=BB587E561C95DE5448C95A6223C1C7D28880BA965BC27806B348AAF2EF4E66B8',
    linkLabel: 'Credly ↗',
  },
];

const ANTHROPIC_CERTS: Cert[] = [
  {
    abbrev: 'CC 101',
    issuer: 'Anthropic',
    title: 'Claude Code 101',
    description: 'Practical AI-assisted development with Claude Code: agentic workflows, CLI usage, and integrating Claude into the engineering process.',
    year: '2026',
    badgeUrl: 'https://verify.skilljar.com/c/fiw4htgr6xwt',
    linkLabel: 'Verify ↗',
  },
  {
    abbrev: 'CL 101',
    issuer: 'Anthropic',
    title: 'Claude 101',
    description: 'Foundations of working with Claude: capabilities, effective prompting, and responsible use of large language models in production.',
    year: '2026',
    badgeUrl: 'https://verify.skilljar.com/c/hqwznn2t3b62',
    linkLabel: 'Verify ↗',
  },
];

function TicketCard({ cert, index }: { cert: Cert; index: number }) {
  return (
    <a
      href={cert.badgeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="cert-ticket"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '22px',
        background: 'hsl(var(--foreground))',
        color: 'hsl(var(--background))',
        minHeight: '360px',
        overflow: 'hidden',
        position: 'relative',
        textDecoration: 'none',
        transition: 'transform 0.45s cubic-bezier(.16,1,.3,1)',
      }}
    >
      {/* Upper content */}
      <div style={{ padding: '26px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '13px',
            letterSpacing: '0.06em',
            opacity: 0.6,
          }}
        >
          <span>{cert.issuer}</span>
          <span>No. {String(index + 1).padStart(2, '0')}</span>
        </div>

        <p
          className="font-bold"
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: 'var(--amber)',
            marginTop: '22px',
            marginBottom: 0,
          }}
        >
          {cert.abbrev}
        </p>

        <p
          className="font-semibold"
          style={{ margin: '16px 0 0', fontSize: '20px', lineHeight: 1.15, letterSpacing: '-0.015em' }}
        >
          {cert.title}
        </p>

        <p style={{ margin: '10px 0 0', fontSize: '14px', lineHeight: 1.55, opacity: 0.72 }}>
          {cert.description}
        </p>
      </div>

      {/* Dashed separator */}
      <div
        style={{
          height: 0,
          borderTop: '2px dashed color-mix(in srgb, hsl(var(--background)) 40%, transparent)',
          margin: '0 22px',
        }}
      />

      {/* Footer */}
      <div
        style={{
          height: '88px',
          padding: '0 26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '13px',
        }}
      >
        <span style={{ opacity: 0.6 }}>{cert.year}</span>
        <span
          style={{
            padding: '9px 16px',
            borderRadius: '999px',
            background: 'var(--amber)',
            color: 'hsl(30 8% 5%)',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {cert.linkLabel ?? 'Verify ↗'}
        </span>
      </div>

      {/* Ticket notch cutouts */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: 'hsl(var(--background))',
          top: 'calc(100% - 90px)',
          left: -13,
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: 'hsl(var(--background))',
          top: 'calc(100% - 90px)',
          right: -13,
        }}
      />
    </a>
  );
}

export function CertCards() {
  return (
    <section className="px-6 sm:px-8 py-14">
      <style>{`.cert-ticket:hover { transform: translateY(-5px); }`}</style>

      <p
        className="text-[13px] text-foreground/40 uppercase tracking-widest mb-8"
        style={{ fontFamily: 'var(--font-geist-mono)' }}
      >
        Certifications
      </p>

      {/* OCI — 4-col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        {OCI_CERTS.map((cert, i) => (
          <TicketCard key={cert.title} cert={cert} index={i} />
        ))}
      </div>

      {/* Anthropic — 2-col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ANTHROPIC_CERTS.map((cert, i) => (
          <TicketCard key={cert.title} cert={cert} index={i} />
        ))}
      </div>
    </section>
  );
}
