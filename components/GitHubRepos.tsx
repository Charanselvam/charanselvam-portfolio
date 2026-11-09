interface GHRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
}

const SKIP = new Set([
  'Charanselvam', 'charanselvam-portfolio', 'chan.github.io',
  'json', 'jsonmf', 'expert-journey', 'reimagined-disco', 'crescendo',
  'PushStack', 'Portfolio', 'CV', 'ica5nt',
]);

async function fetchRepos(): Promise<GHRepo[]> {
  try {
    const res = await fetch(
      'https://api.github.com/users/Charanselvam/repos?sort=updated&per_page=50',
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const LANG_COLOR: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

export async function GitHubRepos() {
  const repos = await fetchRepos();
  const filtered = repos
    .filter((r) => !r.fork && r.language && !SKIP.has(r.name))
    .slice(0, 12);

  if (filtered.length === 0) return null;

  return (
    <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid hsl(var(--foreground)/0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '12px',
            color: 'hsl(var(--foreground)/0.35)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          github · public repos
        </span>
        <a
          href="https://github.com/Charanselvam"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '11px',
            color: 'hsl(var(--foreground)/0.4)',
            textDecoration: 'none',
            letterSpacing: '0.04em',
          }}
        >
          View all →
        </a>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '10px',
        }}
      >
        {filtered.map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: 'var(--surface)',
              border: '1px solid hsl(var(--foreground)/0.07)',
              borderRadius: '10px',
              padding: '14px 16px',
              textDecoration: 'none',
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'hsl(var(--foreground)/0.85)',
                  letterSpacing: '-0.01em',
                  wordBreak: 'break-word',
                }}
              >
                {repo.name}
              </span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px', opacity: 0.3 }}>
                <path d="M2.5 1h8.5v8.5M1 11L10.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            {repo.description && (
              <p
                style={{
                  margin: '6px 0 10px',
                  fontSize: '11.5px',
                  lineHeight: 1.5,
                  color: 'hsl(var(--foreground)/0.45)',
                }}
              >
                {repo.description}
              </p>
            )}
            {repo.language && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: repo.description ? 0 : '10px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: LANG_COLOR[repo.language] ?? 'hsl(var(--foreground)/0.3)',
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'hsl(var(--foreground)/0.35)', letterSpacing: '0.04em' }}>
                  {repo.language}
                </span>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
