import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { PrintButton } from './PrintButton';

export const metadata: Metadata = {
  title: 'Resume | Charanselvam S',
  description:
    'AI Integration Engineer building AI agents, MCP servers, RAG pipelines, and API integrations for enterprise systems. Chennai, India.',
};

/* ── Content: mirrors resume.tex 1:1 ───────────────────────────── */

const PROFILE = {
  name: 'Charanselvam S',
  title: 'AI Integration Engineer',
  email: 'charanselvam.csk@gmail.com',
  location: 'Chennai, India',
  github: 'https://github.com/charanselvam',
  linkedin: 'https://www.linkedin.com/in/charanselvam',
  portfolio: 'https://charanselvam.vercel.app/',
};

const SUMMARY =
  'I build AI agents, Model Context Protocol (MCP) servers, Retrieval-Augmented Generation (RAG) pipelines, and API integration layers that plug into enterprise systems already in production. Backed by 5+ years of enterprise Java and Spring Boot engineering. Shipped features with real users, not prototypes.';

const SKILLS: { group: string; items: string }[] = [
  { group: 'AI/LLM', items: 'LLM Integration, AI Agents, RAG, MCP, Prompt Engineering, LangChain, Gemini API, Ollama, ChromaDB, HuggingFace, Claude Code' },
  { group: 'Languages', items: 'Java, SQL, Python, TypeScript, JavaScript' },
  { group: 'Frameworks', items: 'Spring Boot, FastAPI, REST APIs, React, Next.js, React Native' },
  { group: 'Integration', items: 'JSONata, OAuth2, JWT, BPMN, Drools DRL, ActiveMQ' },
  { group: 'Database', items: 'MySQL, PostgreSQL, Oracle DB' },
  { group: 'Cloud', items: 'Oracle Cloud Infrastructure (OCI), OCI Functions, Serverless' },
  { group: 'Tools', items: 'Docker, Git, GitHub Actions, Jenkins, CI/CD, Postman, Swagger' },
];

function RepoLink({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {href.replace('https://', '')}
    </a>
  );
}

const EXPERIENCE: {
  role: string; org: string; when: string; location: string; points: ReactNode[];
}[] = [
    {
      role: 'AI Integration Engineer',
      org: 'Solartis Technology Services Pvt. Ltd',
      when: 'Jul 2021 – Present',
      location: 'Chennai, India',
      points: [
        <>
          Designed and shipped a <b>config-driven third-party API integration marketplace</b> for an
          enterprise insurance PAS, with <b>4 carriers live in production</b> across 20+ operations
          (Quote, Bind, Cancel, Renew) and <b>zero hardcoded integration logic</b>.
        </>,
        <>
          Replaced a failing IBM WatsonX Excel extraction with a <b>Google Gemini LLM pipeline</b>;
          parsing failures dropped from <b>30% to near zero</b> in production.
        </>,
        <>
          Built a <b>self-service carrier onboarding workbench (FastAPI + React)</b> so business
          analysts configure carrier endpoints, auth flows, and field mappings{' '}
          <b>without developer involvement</b>.
        </>,
        <>
          Authored <b>CLAUDE.md knowledge bases</b> for a 5-year-old Java monolith so Claude Code can
          reason accurately about legacy architecture;{' '}
          <b>accelerated AI-assisted feature delivery</b> across the team.
        </>,
        <>
          Built an <b>MCP server exposing MySQL databases as Claude Code tools</b>, enabling direct
          schema inspection, config tracing, and tenant-aware queries during development sessions.
        </>,
      ],
    },
  ];

const PROJECTS: {
  name: string; stack: string; when: string; description: string; points: ReactNode[];
}[] = [
    {
      name: 'ThirdParty Service Integration Marketplace',
      stack: 'Drools DRL | BPMN | Java | JSONata | MySQL | Spring Boot',
      when: '2025 – Present',
      description:
        'Config-driven marketplace for connecting any third-party API to an insurance PAS without code changes. Field mappings, auth flows, and response parsing are all in configuration.',
      points: [
        <>
          <b>4 carriers, 20+ operations</b> (Quote, Bind, Cancel, Renew) live in production.
        </>,
      ],
    },
    {
      name: 'AI Document Extractor',
      stack: 'Java | Gemini API | Spring Boot | Docker',
      when: '2025',
      description:
        'Extracts structured JSON from any Excel file using Gemini, regardless of column layout or format variation.',
      points: [
        <>
          Replaced a failing IBM WatsonX implementation; parsing failures dropped from{' '}
          <b>30% to near zero</b>. Containerised and live in production.{' '}
          <RepoLink href="https://github.com/Charanselvam/ai-document-extractor" />
        </>,
      ],
    },
    {
      name: 'Carrier Onboarding Workbench',
      stack: 'FastAPI | React | MySQL | JSONata | Python',
      when: '2025',
      description:
        'Self-service 9-step web UI for onboarding insurance carrier APIs. No developer involvement needed post-deployment.',
      points: [
        <>
          Handles endpoint config, OAuth2 auth flows, JSONata field mappings, and live API testing.
        </>,
      ],
    },
    {
      name: 'PDF RAG Chatbot',
      stack: 'LangChain | ChromaDB | Ollama | HuggingFace | Python',
      when: '2025',
      description:
        'Fully local RAG system: chat with any uploaded PDF. HuggingFace embeddings index the document into ChromaDB; Ollama serves a local LLM for inference.',
      points: [
        <>
          No external API calls, no data leaves the machine.{' '}
          <RepoLink href="https://github.com/Charanselvam/RAG-Chatbot" />
        </>,
      ],
    },
  ];

const CERTS = [
  { name: 'OCI Generative AI Professional', issuer: 'Oracle Cloud', year: '2025' },
  { name: 'OCI AI Vector Search', issuer: 'Oracle Cloud', year: '2025' },
  { name: 'OCI AI Foundations', issuer: 'Oracle Cloud', year: '2025' },
  { name: 'OCI Data Science', issuer: 'Oracle Cloud', year: '2025' },
  { name: 'Claude Code 101', issuer: 'Anthropic', year: '2026' },
  { name: 'Claude 101', issuer: 'Anthropic', year: '2026' },
];

function Role({
  role, org, when, location, points,
}: {
  role: string; org: string; when: string; location: string; points: ReactNode[];
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
        {points.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
    </div>
  );
}

function Project({
  name, stack, when, description, points,
}: {
  name: string; stack: string; when: string; description: string; points: ReactNode[];
}) {
  return (
    <div className="rs-item">
      <div className="rs-line">
        <div>
          <h3 style={{ fontWeight: 700, fontSize: '17px' }}>{name}</h3>
          <p className="rs-org">{stack}</p>
        </div>
        <span className="rs-when">{when}</span>
      </div>
      <p className="rs-desc">{description}</p>
      <ul>
        {points.map((p, i) => <li key={i}>{p}</li>)}
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
        .rs-paper ul { margin: 10px 0 0; padding-left: 0; list-style: none; }
        .rs-paper li {
          margin: 5px 0;
          font-size: 14.5px;
          line-height: 1.6;
          color: hsl(var(--foreground) / 0.75);
          position: relative;
          padding-left: 16px;
        }
        .rs-paper li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--amber);
          opacity: 0.75;
        }
        .rs-paper p { margin: 0; }
        .rs-skills { list-style: none; padding-left: 0 !important; display: flex; flex-direction: column; gap: 6px; }
        .rs-skills li { font-size: 14px; color: hsl(var(--foreground) / 0.75); }
        .rs-summary { font-size: 15px; line-height: 1.7; color: hsl(var(--foreground) / 0.7); }
        .rs-paper .rs-desc { margin: 6px 0 0; font-size: 14.5px; line-height: 1.6; color: hsl(var(--foreground) / 0.75); }

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
          .rs-paper li { margin: 1px 0; font-size: 9pt; color: #222 !important; padding-left: 12px; }
          .rs-paper li::before { width: 4px; height: 4px; top: 6px; background: #555 !important; opacity: 1; }
          .rs-paper a { text-decoration: none; color: #000 !important; }
          .rs-item { break-inside: avoid; }
          .rs-certs { grid-template-columns: 1fr 1fr; gap: 2px 24px; }
          .rs-certs li { font-size: 9pt; }
          .rs-cert-issuer, .rs-cert-year { font-size: 7.5pt; color: #555 !important; }
          .rs-summary { font-size: 9.5pt; color: #333 !important; }
          .rs-paper .rs-desc { margin: 3px 0 0; font-size: 9pt; color: #333 !important; }
          .rs-skills li { font-size: 9pt; color: #333 !important; }
        }
      `}</style>

      {/* Hero */}
      <section
        className="no-print"
        style={{
          position: 'relative',
          paddingTop: 'clamp(72px, 10vw, 120px)',
          paddingBottom: '48px',
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
            Resume<span style={{ color: 'var(--amber)' }}>.</span>
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
                <a href={PROFILE.portfolio} target="_blank" rel="noopener noreferrer">charanselvam.vercel.app</a>
              </p>
            </div>

            <h2>Summary</h2>
            <p className="rs-summary">{SUMMARY}</p>

            <h2>Experience</h2>
            {EXPERIENCE.map((r) => (
              <Role key={r.org} role={r.role} org={r.org} when={r.when} location={r.location} points={r.points} />
            ))}

            <h2>Projects</h2>
            {PROJECTS.map((p) => (
              <Project key={p.name} name={p.name} stack={p.stack} when={p.when} description={p.description} points={p.points} />
            ))}

            <h2>Technical Skills</h2>
            <ul className="rs-skills">
              {SKILLS.map(({ group, items }) => (
                <li key={group}>
                  <b>{group}:</b>{' '}
                  <span style={{ color: 'hsl(var(--foreground)/0.6)' }}>{items}</span>
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
                  <h3 style={{ fontWeight: 700 }}>Bachelor of Engineering (B.E.) in Electronics & Communication Engineering</h3>
                  <p className="rs-org">Velammal Institute of Technology (Anna University) · Chennai</p>
                </div>
                <span className="rs-when">2017 – 2021</span>
              </div>
              <p className="rs-desc">
                Final-year project: <b>The WatchDog</b>, an IoT helmet streaming six-sensor environmental data
                (temperature, humidity, air quality, pressure) over Wi-Fi to a Firebase real-time database,
                visualized on a Node.js web dashboard (Arduino, NodeMCU, multi-master/multi-slave I2C).
              </p>
              <p className="rs-desc">
                Pre-final-year competition project: <b>Smart Glass</b>, a Bluetooth-connected wearable HMD for
                hands-free notification display (Arduino, OLED, Bluetooth HC05).
              </p>
            </div>

          </article>
        </div>
      </section>
    </>
  );
}
