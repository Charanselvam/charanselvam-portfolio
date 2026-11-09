import type { Metadata } from 'next';
import { PROFILE, SKILLS } from '@/lib/content';
import { PrintButton } from './PrintButton';

export const metadata: Metadata = {
  title: 'Résumé | Charanselvam S',
  description: 'AI Integration Engineer — 5 years enterprise Java, Spring Boot, and production LLM systems. Chennai, India.',
};

const EXPERIENCE = [
  {
    role: 'AI Integration Engineer',
    org: 'Solartis LLC',
    when: '2020 – Present',
    location: 'Chennai, India',
    points: [
      'Designed and shipped a config-driven third-party API integration marketplace for an enterprise insurance PAS — 4 carriers live in production, zero hardcoded integration logic.',
      'Replaced a failing IBM WatsonX Excel extraction with a Gemini-powered pipeline; parsing failures dropped from 30% to near zero in production.',
      'Built a self-service carrier onboarding workbench (FastAPI + React) so business analysts configure carrier endpoints, auth flows, and field mappings without developer involvement.',
      'Authored CLAUDE.md knowledge bases for a 5-year-old Java monolith so Claude Code can reason accurately about legacy architecture; accelerated AI-assisted feature delivery across the team.',
      'Built an MCP server exposing MySQL databases as Claude Code tools — direct schema inspection, config tracing, and tenant-aware queries during development sessions.',
    ],
  },
];

const PROJECTS = [
  {
    name: 'ThirdParty Service Integration Marketplace',
    tech: 'Drools DRL · BPMN · Java · JSONata · MySQL · Spring Boot',
    points: [
      'Config-driven marketplace for connecting any third-party API to an insurance PAS without code changes. Field mappings, auth flows, and response parsing are all in configuration.',
      '4 carriers, 20+ operations (Quote, Bind, Cancel, Renew) live in production.',
    ],
  },
  {
    name: 'AI Document Extractor',
    tech: 'Java · Gemini API · Spring Boot · Docker',
    points: [
      'Extracts structured JSON from any Excel file using Gemini, regardless of column layout or format variation.',
      'Replaced a failing IBM WatsonX implementation; parsing failures dropped from 30% to near zero. Containerised and live in production.',
    ],
  },
  {
    name: 'Carrier Onboarding Workbench',
    tech: 'FastAPI · React · MySQL · JSONata · Python',
    points: [
      'Self-service 9-step web UI for onboarding insurance carrier APIs. No developer involvement needed post-deployment.',
      'Handles endpoint config, OAuth2 auth flows, JSONata field mappings, and live API testing.',
    ],
  },
  {
    name: 'PDF RAG Chatbot',
    tech: 'LangChain · ChromaDB · Ollama · HuggingFace · Python',
    points: [
      'Fully local RAG system: chat with any uploaded PDF. HuggingFace embeddings index the document into ChromaDB; Ollama serves a local LLM for inference.',
      'No external API calls, no data leaves the machine.',
    ],
  },
];

const CERTS = [
  { name: 'OCI Generative AI Professional', issuer: 'Oracle Cloud', year: '2024' },
  { name: 'OCI AI Vector Search', issuer: 'Oracle Cloud', year: '2024' },
  { name: 'OCI AI Foundations', issuer: 'Oracle Cloud', year: '2024' },
  { name: 'OCI Data Science', issuer: 'Oracle Cloud', year: '2024' },
  { name: 'Claude Code 101', issuer: 'Anthropic', year: '2026' },
  { name: 'Claude 101', issuer: 'Anthropic', year: '2026' },
];

function Role({
  role, org, when, location, points,
}: {
  role: string; org: string; when: string; location: string; points: string[];
}) {
  return (
    <div className="rs-item">
      <div className="rs-line">
        <div>
          <h3 style={{ fontWeight: 700, fontSize: '17px' }}>{role}</h3>
          <p className="rs-org">{org} · {location}</p>
        </div>
        <span className="rs-when">{when}</span>
      </div>
      <ul>
        {points.map((p) => <li key={p}>{p}</li>)}
      </ul>
    </div>
  );
}

export default function ResumePage() {
  return (
    <>
      <style>{`
        /* ── paper card ── */
        .rs-paper {
          max-width: 900px;
          margin: 0 auto;
          padding: clamp(28px, 5vw, 60px);
          border: 1px solid var(--line);
          border-radius: 24px;
          background: var(--surface);
          font-size: 15.5px;
          line-height: 1.65;
        }
        .rs-paper a { color: inherit; text-decoration: underline; text-decoration-color: color-mix(in srgb, var(--amber) 55%, transparent); text-underline-offset: 3px; }
        .rs-paper a:hover { color: var(--amber); }

        /* header block */
        .rs-top { text-align: center; padding-bottom: 24px; border-bottom: 1px solid var(--line); margin-bottom: 4px; }
        .rs-top h1 { margin: 0; font-size: clamp(28px, 5vw, 42px); letter-spacing: -.025em; font-weight: 700; }
        .rs-role-title { margin: 6px 0 0; font-size: 17px; color: var(--amber); font-family: var(--font-geist-mono); letter-spacing: 0.03em; }
        .rs-contact { margin: 10px 0 0; font-size: 13px; color: hsl(var(--muted-foreground)); overflow-wrap: anywhere; }
        .rs-contact span { padding: 0 6px; opacity: 0.4; }

        /* section headings */
        .rs-paper h2 {
          margin: 36px 0 14px;
          padding-bottom: 7px;
          border-bottom: 1px solid hsl(var(--foreground) / 0.15);
          font-size: 11px;
          letter-spacing: .14em;
          text-transform: uppercase;
          font-family: var(--font-geist-mono);
          color: hsl(var(--foreground) / 0.5);
        }
        .rs-paper h3 { margin: 0; font-size: 16px; }
        .rs-org { margin: 2px 0 8px; font-size: 13px; color: var(--amber); font-family: var(--font-geist-mono); letter-spacing: 0.03em; }
        .rs-item + .rs-item { margin-top: 20px; padding-top: 20px; border-top: 1px solid hsl(var(--foreground) / 0.06); }
        .rs-line { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px 24px; flex-wrap: wrap; }
        .rs-when { color: hsl(var(--muted-foreground)); font-size: 13px; white-space: nowrap; font-family: var(--font-geist-mono); flex-shrink: 0; margin-top: 2px; }
        .rs-paper ul { margin: 10px 0 0; padding-left: 18px; }
        .rs-paper li { margin: 5px 0; font-size: 14.5px; line-height: 1.6; color: hsl(var(--foreground) / 0.75); }
        .rs-paper p { margin: 0; }
        .rs-skills { list-style: none; padding-left: 0 !important; display: flex; flex-direction: column; gap: 6px; }
        .rs-skills li { font-size: 14px; color: hsl(var(--foreground) / 0.75); }
        .rs-tech { font-size: 12px; color: hsl(var(--muted-foreground)); font-family: var(--font-geist-mono); margin: 3px 0 6px; letter-spacing: 0.02em; }
        .rs-summary { font-size: 15px; line-height: 1.7; color: hsl(var(--foreground) / 0.7); }

        /* certs grid */
        .rs-certs { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 32px; list-style: none; padding: 0; }
        .rs-certs li { display: flex; justify-content: space-between; align-items: baseline; font-size: 14px; color: hsl(var(--foreground) / 0.75); gap: 8px; }
        .rs-cert-issuer { font-size: 11px; font-family: var(--font-geist-mono); color: hsl(var(--muted-foreground)); }
        .rs-cert-year { font-size: 11px; font-family: var(--font-geist-mono); color: hsl(var(--muted-foreground)); }

        /* ── print ── */
        @media print {
          @page { size: A4; margin: 12mm 14mm; }
          :root { color-scheme: light; }
          html, body { background: #fff !important; }
          header, footer, .no-print { display: none !important; }
          main { padding: 0 !important; }
          .rs-wrap { padding: 0 !important; }
          .rs-paper { max-width: none; border: 0; border-radius: 0; padding: 0; background: #fff !important; color: #000 !important; font-size: 10pt; line-height: 1.4; }
          .rs-top { border-color: #ccc !important; }
          .rs-top h1 { font-size: 20pt; }
          .rs-role-title { font-size: 10.5pt; color: #555 !important; }
          .rs-contact { font-size: 8pt; color: #333 !important; }
          .rs-paper h2 { margin: 12px 0 5px; padding-bottom: 3px; font-size: 7.5pt; border-color: #999 !important; break-after: avoid; color: #666 !important; }
          .rs-paper h3 { font-size: 10.5pt; }
          .rs-org { font-size: 8.5pt; color: #555 !important; }
          .rs-line { flex-wrap: nowrap; }
          .rs-when { font-size: 8.5pt; color: #555 !important; }
          .rs-item + .rs-item { margin-top: 8px; padding-top: 8px; border-top-color: #eee !important; }
          .rs-paper ul { margin-top: 3px; }
          .rs-paper li { margin: 1px 0; font-size: 9pt; color: #222 !important; }
          .rs-paper a { text-decoration: none; color: #000 !important; }
          .rs-item { break-inside: avoid; }
          .rs-tech { font-size: 8pt; }
          .rs-certs { grid-template-columns: 1fr 1fr; gap: 2px 24px; }
          .rs-certs li { font-size: 9pt; }
          .rs-cert-issuer, .rs-cert-year { font-size: 7.5pt; color: #555 !important; }
          .rs-summary { font-size: 9.5pt; color: #333 !important; }
          .rs-skills li { font-size: 9pt; color: #333 !important; }
        }
      `}</style>

      {/* Hero */}
      <section
        className="no-print"
        style={{
          position: 'relative',
          paddingTop: 'clamp(80px, 14vw, 190px)',
          paddingBottom: '64px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="px-6 sm:px-8" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'hsl(var(--muted-foreground))',
              display: 'block',
              marginBottom: '24px',
            }}
          >
            Web version · same layout as the PDF
          </span>
          <h1
            style={{
              fontSize: 'clamp(56px, 13vw, 160px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              margin: '0 0 36px',
            }}
          >
            Résumé<span style={{ color: 'var(--amber)' }}>.</span>
          </h1>
          <PrintButton />
        </div>
      </section>

      {/* Paper */}
      <section style={{ padding: '64px 0 110px' }}>
        <div className="rs-wrap px-6 sm:px-8">
          <article className="rs-paper">

            {/* Card header */}
            <div className="rs-top">
              <h1>{PROFILE.name}</h1>
              <p className="rs-role-title">{PROFILE.title}</p>
              <p className="rs-contact">
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                <span>·</span>
                {PROFILE.location}
                <span>·</span>
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">github.com/charanselvam</a>
                <span>·</span>
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/charanselvam</a>
                <span>·</span>
                charanselvam.dev
              </p>
            </div>

            <h2>Summary</h2>
            <p className="rs-summary">{PROFILE.bio}</p>

            <h2>Experience</h2>
            {EXPERIENCE.map((r) => (
              <Role key={r.org} role={r.role} org={r.org} when={r.when} location={r.location} points={r.points} />
            ))}

            <h2>Projects</h2>
            {PROJECTS.map((p) => (
              <div key={p.name} className="rs-item">
                <h3 style={{ fontWeight: 700 }}>{p.name}</h3>
                <p className="rs-tech">{p.tech}</p>
                <ul>
                  {p.points.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            ))}

            <h2>Skills</h2>
            <ul className="rs-skills">
              {SKILLS.map(({ group, items }) => (
                <li key={group}>
                  <b>{group}:</b>{' '}
                  <span style={{ color: 'hsl(var(--foreground)/0.6)' }}>
                    {items.map(([name]) => name).join(', ')}
                  </span>
                </li>
              ))}
            </ul>

            <h2>Certifications</h2>
            <ul className="rs-certs">
              {CERTS.map((c) => (
                <li key={c.name}>
                  <span>{c.name}</span>
                  <span className="rs-cert-issuer">{c.issuer} &nbsp;{c.year}</span>
                </li>
              ))}
            </ul>

            <h2>Education</h2>
            <div className="rs-item">
              <div className="rs-line">
                <div>
                  <h3 style={{ fontWeight: 700 }}>B.E. Electronics &amp; Communication Engineering</h3>
                  <p className="rs-org">Anna University, Chennai</p>
                </div>
                <span className="rs-when">2016 – 2020</span>
              </div>
              <ul>
                <li>Final-year project: Smart Glass — Bluetooth-connected wearable HMD for hands-free notification display (Arduino, OLED, Bluetooth HC05).</li>
              </ul>
            </div>

          </article>
        </div>
      </section>
    </>
  );
}
