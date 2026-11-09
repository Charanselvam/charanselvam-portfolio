import type { Metadata } from 'next';
import Link from 'next/link';
import { PROFILE, SKILLS } from '@/lib/content';
import { PrintButton } from './PrintButton';

export const metadata: Metadata = {
  title: 'Resume | Charanselvam S',
  description: 'AI Integration Engineer — 5 years enterprise Java, Spring Boot, and production LLM systems. Chennai, India.',
};

const EXPERIENCE = [
  {
    role: 'AI Integration Engineer',
    company: 'Solartis LLC',
    period: '2020 – Present',
    location: 'Chennai, India',
    bullets: [
      'Designed and shipped a config-driven third-party API integration marketplace for an enterprise insurance PAS — 4 carriers live in production, zero hardcoded integration logic.',
      'Replaced a failing IBM WatsonX Excel extraction with a Gemini-powered pipeline; parsing failures dropped from 30% to near zero in production.',
      'Built a self-service carrier onboarding workbench (FastAPI + React) so business analysts configure carrier endpoints, auth flows, and field mappings without developer involvement.',
      'Authored CLAUDE.md knowledge bases for 5-year-old Java monoliths so Claude Code can reason about legacy codebases; accelerated AI-assisted delivery across the team.',
      'Built an MCP server exposing MySQL databases as Claude Code tools — direct schema inspection, config tracing, and tenant-aware queries during development sessions.',
    ],
  },
];

const EDUCATION = [
  {
    degree: 'B.E. Electronics & Communication Engineering',
    school: 'Anna University',
    period: '2016 – 2020',
    detail: 'Final-year project: Smart Glass — Bluetooth-connected wearable HMD for hands-free notification display.',
  },
];

const OCI_CERTS = [
  { name: 'OCI Gen AI Professional', year: '2024' },
  { name: 'OCI AI Vector Search', year: '2024' },
  { name: 'OCI AI Foundations', year: '2024' },
  { name: 'OCI Data Science', year: '2024' },
  { name: 'Claude Code 101', year: '2026' },
  { name: 'Claude 101', year: '2026' },
];

const RESUME_PROJECTS = [
  {
    name: 'ThirdParty Service Integration Marketplace',
    tech: 'Drools DRL · BPMN · Java · JSONata · MySQL',
    detail: 'Config-driven marketplace for connecting any third-party API without code changes. 4 carriers, 20+ operations live.',
  },
  {
    name: 'AI Document Extractor',
    tech: 'Java · Gemini API · Spring Boot · Docker',
    detail: 'Extracts structured JSON from any Excel file using Gemini. Replaced IBM WatsonX; 30% → ~0% parsing failures.',
  },
  {
    name: 'Carrier Onboarding Workbench',
    tech: 'FastAPI · React · MySQL · JSONata',
    detail: 'Self-service 9-step UI for onboarding carrier APIs. No developer involvement needed post-deployment.',
  },
  {
    name: 'PDF RAG Chatbot',
    tech: 'LangChain · ChromaDB · Ollama · HuggingFace',
    detail: 'Fully local RAG system: chat with any PDF. No external API calls, no data leaves the machine.',
  },
];

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '44px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--amber)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'hsl(var(--foreground)/0.08)' }} />
      </div>
      {children}
    </section>
  );
}

export default function ResumePage() {
  return (
    <>
      <style>{`
        @media print {
          html, body { background: #fff !important; color: #111 !important; }
          .no-print { display: none !important; }
          .print-section { break-inside: avoid; }
          a { color: inherit !important; text-decoration: none !important; }
        }
      `}</style>

      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: 'clamp(32px, 6vw, 80px) clamp(20px, 4vw, 48px)',
        }}
      >
        {/* Top bar: back link + print button */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '48px',
          }}
        >
          <Link
            href="/about"
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '12px',
              color: 'hsl(var(--foreground)/0.4)',
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            ← About
          </Link>
          <PrintButton />
        </div>

        {/* Header */}
        <header style={{ marginBottom: '52px' }}>
          <h1
            style={{
              fontSize: 'clamp(36px, 7vw, 72px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              marginBottom: '12px',
            }}
          >
            {PROFILE.name}
          </h1>
          <p
            style={{
              fontSize: '20px',
              color: 'hsl(var(--foreground)/0.6)',
              letterSpacing: '-0.01em',
              marginBottom: '20px',
            }}
          >
            {PROFILE.title}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '12px',
              color: 'hsl(var(--foreground)/0.45)',
              letterSpacing: '0.03em',
            }}
          >
            <span>{PROFILE.location}</span>
            <a
              href={`mailto:${PROFILE.email}`}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {PROFILE.email}
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              github/charanselvam
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              linkedin/charanselvam
            </a>
          </div>
        </header>

        {/* Summary */}
        <Section label="Summary">
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'hsl(var(--foreground)/0.7)',
              maxWidth: '680px',
            }}
          >
            {PROFILE.bio}
          </p>
        </Section>

        {/* Experience */}
        <Section label="Experience">
          {EXPERIENCE.map((job) => (
            <div key={job.company} className="print-section" style={{ marginBottom: '32px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '4px',
                  marginBottom: '4px',
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '16px', letterSpacing: '-0.01em' }}>
                  {job.role}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '11px',
                    color: 'hsl(var(--foreground)/0.4)',
                    letterSpacing: '0.03em',
                  }}
                >
                  {job.period}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '12px',
                  color: 'var(--amber)',
                  letterSpacing: '0.04em',
                  marginBottom: '12px',
                }}
              >
                {job.company} · {job.location}
              </p>
              <ul
                style={{
                  paddingLeft: '0',
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {job.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      display: 'flex',
                      gap: '10px',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: 'hsl(var(--foreground)/0.65)',
                    }}
                  >
                    <span style={{ color: 'var(--amber)', flexShrink: 0, marginTop: '2px' }}>–</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* Projects */}
        <Section label="Projects">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {RESUME_PROJECTS.map((p) => (
              <div key={p.name} className="print-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '3px' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>{p.name}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontSize: '10px',
                      color: 'hsl(var(--foreground)/0.35)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {p.tech}
                  </span>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'hsl(var(--foreground)/0.55)', margin: 0 }}>
                  {p.detail}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section label="Skills">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SKILLS.map((group) => (
              <div key={group.group} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'baseline' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '10px',
                    color: 'hsl(var(--foreground)/0.35)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    minWidth: '90px',
                    flexShrink: 0,
                  }}
                >
                  {group.group}
                </span>
                <span style={{ fontSize: '13px', color: 'hsl(var(--foreground)/0.6)', lineHeight: 1.6 }}>
                  {group.items.map(([name]) => name).join(' · ')}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Certifications */}
        <Section label="Certifications">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '8px',
            }}
          >
            {OCI_CERTS.map((cert) => (
              <div
                key={cert.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  fontSize: '13px',
                  color: 'hsl(var(--foreground)/0.6)',
                  gap: '8px',
                }}
              >
                <span>{cert.name}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '10px',
                    color: 'hsl(var(--foreground)/0.3)',
                  }}
                >
                  {cert.year}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section label="Education">
          {EDUCATION.map((edu) => (
            <div key={edu.school} className="print-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <span style={{ fontWeight: 600, fontSize: '15px' }}>{edu.degree}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '11px',
                    color: 'hsl(var(--foreground)/0.4)',
                  }}
                >
                  {edu.period}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '12px',
                  color: 'var(--amber)',
                  letterSpacing: '0.04em',
                  margin: '3px 0 6px',
                }}
              >
                {edu.school}
              </p>
              {edu.detail && (
                <p style={{ fontSize: '13px', color: 'hsl(var(--foreground)/0.5)', lineHeight: 1.5 }}>
                  {edu.detail}
                </p>
              )}
            </div>
          ))}
        </Section>

        {/* Footer note */}
        <div
          className="no-print"
          style={{
            marginTop: '64px',
            paddingTop: '24px',
            borderTop: '1px solid hsl(var(--foreground)/0.08)',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '11px',
            color: 'hsl(var(--foreground)/0.3)',
            letterSpacing: '0.04em',
          }}
        >
          charanselvam.dev · {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
}
