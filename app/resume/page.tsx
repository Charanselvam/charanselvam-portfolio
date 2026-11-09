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
    points: [
      'Designed and shipped a config-driven third-party API integration marketplace for an enterprise insurance PAS — 4 carriers live in production, zero hardcoded integration logic.',
      'Replaced a failing IBM WatsonX Excel extraction with a Gemini-powered pipeline; parsing failures dropped from 30% to near zero in production.',
      'Built a self-service carrier onboarding workbench (FastAPI + React) so business analysts configure carrier endpoints, auth flows, and field mappings without developer involvement.',
      'Authored CLAUDE.md knowledge bases for a 5-year-old Java monolith so Claude Code can reason about the codebase; accelerated AI-assisted feature delivery across the team.',
      'Built an MCP server exposing MySQL databases as Claude Code tools — direct schema inspection, config tracing, and tenant-aware queries during development sessions.',
    ],
  },
];

const PROJECTS = [
  {
    name: 'ThirdParty Service Integration Marketplace',
    tech: 'Drools DRL, BPMN, Java, JSONata, MySQL, Spring Boot',
    points: [
      'Config-driven marketplace for connecting any third-party API to an insurance PAS without code changes. Field mappings, auth flows, and response parsing all in configuration.',
      '4 carriers, 20+ operations (Quote, Bind, Cancel, Renew) live in production.',
    ],
  },
  {
    name: 'AI Document Extractor',
    tech: 'Java, Gemini API, Spring Boot, Docker',
    points: [
      'Extracts structured JSON from any Excel file using Gemini, regardless of column layout or format variation.',
      'Replaced a failing IBM WatsonX implementation; parsing failures dropped from 30% to near zero. Containerised and live in production.',
    ],
  },
  {
    name: 'Carrier Onboarding Workbench',
    tech: 'FastAPI, React, MySQL, JSONata, Python',
    points: [
      'Self-service 9-step web UI for onboarding insurance carrier APIs. No developer involvement needed post-deployment.',
      'Handles endpoint config, OAuth2 auth flows, JSONata field mappings, and live API testing.',
    ],
  },
  {
    name: 'PDF RAG Chatbot',
    tech: 'LangChain, ChromaDB, Ollama, HuggingFace, Python',
    points: [
      'Fully local RAG system: chat with any uploaded PDF. HuggingFace embeddings index the document into ChromaDB; Ollama serves a local LLM for inference.',
      'No external API calls, no data leaves the machine.',
    ],
  },
];

const CERTS = [
  'OCI Generative AI Professional · Oracle Cloud · 2024',
  'OCI AI Vector Search · Oracle Cloud · 2024',
  'OCI AI Foundations · Oracle Cloud · 2024',
  'OCI Data Science · Oracle Cloud · 2024',
  'Claude Code 101 · Anthropic · 2026',
  'Claude 101 · Anthropic · 2026',
];

function Role({ role, org, when, points }: { role: string; org: string; when: string; points: string[] }) {
  return (
    <div className="rs-item">
      <div className="rs-line">
        <h3><b>{role}</b> at {org}</h3>
        <span className="rs-when">({when})</span>
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
          max-width: 880px;
          margin: 0 auto;
          padding: clamp(24px, 5vw, 56px);
          border: 1px solid var(--line);
          border-radius: 22px;
          background: var(--surface);
          font-size: 16px;
          line-height: 1.6;
        }
        .rs-paper a { color: inherit; text-decoration: underline; text-decoration-color: color-mix(in srgb, var(--amber) 55%, transparent); text-underline-offset: 3px; }
        .rs-paper a:hover { color: var(--amber); }
        .rs-top { text-align: center; margin-bottom: 8px; }
        .rs-top h1 { margin: 0; font-size: clamp(32px, 5vw, 44px); letter-spacing: -.02em; }
        .rs-role { margin: 4px 0 0; font-size: 18px; color: hsl(var(--muted-foreground)); }
        .rs-contact { margin: 10px 0 0; font-size: 13.5px; color: hsl(var(--muted-foreground)); overflow-wrap: anywhere; }
        .rs-paper h2 { margin: 32px 0 10px; padding-bottom: 6px; border-bottom: 1px solid hsl(var(--foreground)); font-size: 13px; letter-spacing: .1em; text-transform: uppercase; }
        .rs-paper h3 { margin: 0; font-size: 16px; font-weight: 400; }
        .rs-item + .rs-item { margin-top: 16px; }
        .rs-line { display: flex; justify-content: space-between; align-items: baseline; gap: 6px 20px; flex-wrap: wrap; }
        .rs-when { color: hsl(var(--muted-foreground)); font-size: 14px; white-space: nowrap; font-style: italic; }
        .rs-paper ul { margin: 6px 0 0; padding-left: 20px; }
        .rs-paper li { margin: 4px 0; font-size: 15px; }
        .rs-paper p { margin: 0; }
        .rs-skills { list-style: none; padding-left: 0 !important; }
        .rs-tech { font-size: 13px; color: hsl(var(--muted-foreground)); font-style: italic; margin-top: 2px; }

        /* ── print ── */
        @media print {
          @page { size: A4; margin: 12mm 14mm; }
          :root { color-scheme: light; }
          html, body { background: #fff !important; }
          header, footer, .no-print { display: none !important; }
          main { padding: 0 !important; }
          .rs-wrap { padding: 0 !important; }
          .rs-paper { max-width: none; border: 0; border-radius: 0; padding: 0; background: #fff !important; color: #000 !important; font-size: 10pt; line-height: 1.4; }
          .rs-top h1 { font-size: 22pt; }
          .rs-role { font-size: 11.5pt; }
          .rs-contact { font-size: 8.5pt; }
          .rs-paper h2 { margin: 14px 0 5px; padding-bottom: 3px; font-size: 10pt; border-color: #000; break-after: avoid; }
          .rs-paper h3 { font-size: 10.5pt; }
          .rs-line { flex-wrap: nowrap; }
          .rs-when { font-size: 9pt; color: #333 !important; }
          .rs-item + .rs-item { margin-top: 8px; }
          .rs-paper ul { margin-top: 3px; }
          .rs-paper li { margin: 1px 0; font-size: 9.5pt; }
          .rs-paper a { text-decoration: none; color: #000 !important; }
          .rs-contact { color: #333 !important; }
          .rs-item { break-inside: avoid; }
          .rs-tech { font-size: 8.5pt; }
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
        <div style={{ padding: '0 clamp(20px, 4vw, 48px)', maxWidth: '1200px', margin: '0 auto' }}>
          <span
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '13px',
              letterSpacing: '0.06em',
              color: 'hsl(var(--muted-foreground))',
              display: 'block',
              marginBottom: '24px',
            }}
          >
            Web version · same layout as the PDF
          </span>
          <h1
            style={{
              fontSize: 'clamp(48px, 13vw, 160px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              margin: '0 0 32px',
            }}
          >
            Résumé<span style={{ color: 'var(--amber)' }}>.</span>
          </h1>
          <PrintButton />
        </div>
      </section>

      {/* Paper */}
      <section style={{ padding: '64px 0 110px' }}>
        <div className="rs-wrap" style={{ padding: '0 clamp(16px, 3vw, 32px)' }}>
          <article className="rs-paper">

            {/* Header */}
            <div className="rs-top">
              <h1>{PROFILE.name}</h1>
              <p className="rs-role">{PROFILE.title}</p>
              <p className="rs-contact">
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                {' | '}
                {PROFILE.location}
                {' | '}
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">github.com/charanselvam</a>
                {' | '}
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/charanselvam</a>
                {' | '}
                charanselvam.dev
              </p>
            </div>

            <h2>Summary</h2>
            <p>{PROFILE.bio}</p>

            <h2>Experience</h2>
            {EXPERIENCE.map((r) => (
              <Role key={r.org} role={r.role} org={r.org} when={r.when} points={r.points} />
            ))}

            <h2>Projects</h2>
            {PROJECTS.map((p) => (
              <div key={p.name} className="rs-item">
                <h3><b>{p.name}</b></h3>
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
                  {items.map(([name]) => name).join(', ')}
                </li>
              ))}
            </ul>

            <h2>Certifications</h2>
            <ul>
              {CERTS.map((c) => <li key={c}>{c}</li>)}
            </ul>

            <h2>Education</h2>
            <div className="rs-item">
              <div className="rs-line">
                <h3><b>B.E. Electronics &amp; Communication Engineering</b> at Anna University, Chennai</h3>
                <span className="rs-when">(2016 – 2020)</span>
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
