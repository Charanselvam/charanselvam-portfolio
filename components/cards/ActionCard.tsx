'use client';

interface ResumeData {
  filename: string;
  url: string;
}

interface ContactData {
  email: string;
  linkedin: string;
}

type ActionCardProps =
  | { type: 'resume'; data: ResumeData }
  | { type: 'contact'; data: ContactData };

async function downloadBlob(url: string, filename: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(blobUrl);
}

const cardStyle = {
  background: 'var(--surface)',
  border: '1px solid hsl(var(--foreground)/0.12)',
  borderRadius: '12px',
  padding: '14px 16px',
  marginTop: '12px',
};

export function ActionCard(props: ActionCardProps) {
  if (props.type === 'resume') {
    return (
      <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <p className="text-sm font-medium" style={{ color: 'hsl(var(--foreground)/0.85)' }}>
            Resume
          </p>
          <p
            className="text-xs"
            style={{ fontFamily: 'var(--font-geist-mono)', color: 'hsl(var(--foreground)/0.35)', marginTop: '2px' }}
          >
            {props.data.filename}
          </p>
        </div>
        <button
          onClick={() => downloadBlob(props.data.url, props.data.filename)}
          className="shrink-0 text-xs font-semibold transition-opacity hover:opacity-80"
          style={{
            background: 'var(--amber)',
            color: 'hsl(30 8% 5%)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontFamily: 'var(--font-geist-mono)',
            letterSpacing: '0.04em',
          }}
        >
          Download
        </button>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <p
        className="text-xs mb-3"
        style={{ fontFamily: 'var(--font-geist-mono)', color: 'hsl(var(--foreground)/0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}
      >
        Get in touch
      </p>
      <div className="flex flex-wrap gap-2">
        <a
          href={`mailto:${props.data.email}`}
          className="inline-flex items-center text-xs font-medium transition-opacity hover:opacity-80"
          style={{
            background: 'var(--amber)',
            color: 'hsl(30 8% 5%)',
            borderRadius: '8px',
            padding: '8px 14px',
            textDecoration: 'none',
            fontFamily: 'var(--font-geist-mono)',
          }}
        >
          {props.data.email}
        </a>
        <a
          href={props.data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs transition-colors"
          style={{
            border: '1px solid hsl(var(--foreground)/0.15)',
            color: 'hsl(var(--foreground)/0.6)',
            borderRadius: '8px',
            padding: '8px 14px',
            textDecoration: 'none',
            fontFamily: 'var(--font-geist-mono)',
          }}
        >
          LinkedIn →
        </a>
      </div>
    </div>
  );
}
