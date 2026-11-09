import type { Metadata } from 'next';
import { AICanvas } from '@/components/AICanvas';
import { LetterReveal } from '@/components/LetterReveal';
import { NextPageNav } from '@/components/NextPageNav';
import { PROJECTS } from '@/lib/content';
import { GitHubRepos } from '@/components/GitHubRepos';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Five years of AI integration and enterprise engineering work at Solartis Technology Services.',
};

import React from 'react';

interface Achievement {
  text: string;
  tags: string[];
  ai?: boolean;
}

const aiAndArchitecture: Achievement[] = [
  {
    text: 'Built AI-powered document extraction service using Google Gemini API. Accepts any Excel format regardless of column structure and extracts structured JSON via engineered prompts. Replaced a failing IBM WatsonX implementation, reducing parsing failures from 30% to near zero. Containerised with Docker. Live in production.',
    tags: ['Gemini API', 'Python', 'Docker', 'Prompt Engineering'],
    ai: true,
  },
  {
    text: 'Built PDF RAG chatbot using Python, LangChain, ChromaDB, HuggingFace embeddings, and Ollama. Users can chat with any uploaded PDF via a local LLM with hallucination prevention. Fully local inference: no external API calls.',
    tags: ['LangChain', 'ChromaDB', 'Ollama', 'RAG', 'Python'],
    ai: true,
  },
  {
    text: 'Authored CLAUDE.md knowledge bases across 5 legacy repositories. Parsed 15 years of undocumented platform code into structured markdown, enabling AI-assisted development on a codebase with no prior documentation. Used Claude Code as primary development tool for migration work.',
    tags: ['Claude Code', 'Technical Writing', 'Legacy Migration'],
    ai: true,
  },
  {
    text: 'Introduced JSONata to replace AtlasMap for carrier request/response transformation. Reduced new carrier onboarding from days to hours. Enabled non-technical QA and BA teams to independently onboard carriers through 3-table configuration (service, detail, and value mapping). Four commercial carriers integrated.',
    tags: ['JSONata', 'MySQL', 'Python', 'Carrier Integration'],
    ai: false,
  },
  {
    text: 'Architected and delivered a multi-carrier API unification prototype. Single request handled by multiple carriers simultaneously using a serverless fan-out pattern on Oracle Cloud Infrastructure. Built locally in 6 hours, deployed to OCI in 4 hours.',
    tags: ['OCI Functions', 'Node.js', 'TypeScript', 'Serverless'],
    ai: false,
  },
];

const productionEngineering: Achievement[] = [
  {
    text: 'Diagnosed and resolved critical payment integration failure affecting 4–5% of high-value policy transactions. Root cause: missing webhook listener causing iframe redirect failures combined with a session timeout mismatch. Implemented defensive exception handling with retry mechanism, reducing silent failures to near zero.',
    tags: ['Java', 'JSF', 'Payment Integration'],
  },
  {
    text: 'Automated manual operations team renewal workflow using Java, Drools, and MySQL. Converted a fully manual process into an automated system, eliminating repetitive ops work across policy renewal cycles.',
    tags: ['Java', 'Drools', 'MySQL'],
  },
  {
    text: 'Integrated third-party carrier rating engines and PDF APIs. Handled Base64 PDF conversion, and intelligent split and merge of 70–100 page policy documents using Apache libraries.',
    tags: ['Drools', 'JSF', 'PDF Processing', 'Apache'],
  },
  {
    text: 'Built JSON-driven dynamic form renderer in React. A JSON schema drives entire UI component rendering without code changes. Delivered using GitHub Actions for automated deployment.',
    tags: ['React', 'JSON Schema', 'GitHub Actions'],
  },
  {
    text: 'Integrated Concept One, MapRisk, and a document imaging system as third-party services, including JWT token lifecycle management with automated refresh on expiry for the MapRisk API.',
    tags: ['JWT', 'Spring Boot', 'API Integration'],
  },
];

function Tag({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <span
      className={`text-[13px] ${highlight ? 'text-[var(--amber)]' : 'text-foreground/45'}`}
      style={{ fontFamily: 'var(--font-geist-mono)' }}
    >
      {label}
    </span>
  );
}

function AchievementItem({ item }: { item: Achievement }) {
  return (
    <li className="grid grid-cols-1 sm:grid-cols-[3fr_2fr] gap-4 sm:gap-12 py-8 border-t border-foreground/25">
      <p className="text-base leading-relaxed text-foreground/70">
        {item.text}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-1 content-start">
        {item.tags.map((tag) => (
          <Tag key={tag} label={tag} highlight={item.ai} />
        ))}
      </div>
    </li>
  );
}

export default function WorkPage() {
  return (
    <>
      {/* Page hero with NN canvas backdrop */}
      <section className="page-hero px-6 sm:px-8 py-16 sm:py-20">
        <AICanvas kind="nn" className="page-hero-canvas" />
        <div className="page-hero-content">
          <p
            className="text-[13px] text-foreground/40 uppercase tracking-widest mb-6"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            experience
          </p>
          <h1
            className="font-bold text-foreground"
            style={{ fontSize: 'clamp(48px, 8vw, 120px)', letterSpacing: '-0.04em', lineHeight: 0.9 }}
          >
            <LetterReveal text="WORK" />
            <span style={{ color: 'var(--amber)' }} aria-hidden="true">.</span>
          </h1>
        </div>
      </section>

      <div className="px-6 sm:px-8 py-16 sm:py-24 max-w-5xl mx-auto">
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-12">
            <div>
              <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                Solartis Technology Services
              </h2>
              <p className="text-base text-foreground/55 mt-1">
                Senior Software Engineer → AI Integration · Chennai, India
              </p>
            </div>
            <span
              className="text-[13px] text-foreground/45 shrink-0"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              Jul 2021 – Present
            </span>
          </div>

          <div className="mb-12">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-[13px] text-[var(--amber)] tracking-wider" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                ai_and_architecture
              </span>
              <span className="text-[13px] text-foreground/35" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                2025–2026
              </span>
            </div>
            <ul className="space-y-0">
              {aiAndArchitecture.map((item, i) => (
                <AchievementItem key={i} item={item} />
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-[13px] text-foreground/55 tracking-wider" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                production_engineering
              </span>
              <span className="text-[13px] text-foreground/35" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                2021–2025
              </span>
            </div>
            <ul className="space-y-0">
              {productionEngineering.map((item, i) => (
                <AchievementItem key={i} item={item} />
              ))}
            </ul>
          </div>
        </div>

        {/* Projects grid */}
        <div className="mt-24 pt-16 border-t-2 border-foreground/25">
          <span className="text-[13px] text-foreground/45 tracking-wider" style={{ fontFamily: 'var(--font-geist-mono)' }}>
            tools_and_projects
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
            {PROJECTS.map((p) => (
              <div
                key={p.slug}
                style={{
                  background: 'var(--surface)',
                  borderRadius: '14px',
                  padding: '20px 24px',
                  border: '1px solid hsl(var(--foreground)/0.08)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: p.status === 'live_in_production' ? '#2fd47a' : p.status === 'college_project' ? 'hsl(220 70% 65%)' : 'hsl(var(--foreground)/0.3)' }}>
                    {p.status === 'live_in_production' ? '● live' : p.status === 'college_project' ? '● academic' : '● internal'}
                  </span>
                  <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'hsl(var(--foreground)/0.3)' }}>{p.period}</span>
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '8px' }}>
                  {p.link ? <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{p.title} ↗</a> : p.title}
                </h3>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'hsl(var(--foreground)/0.6)', marginBottom: '14px' }}>{p.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {p.tags.map((tag) => (
                      <span key={tag} style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--amber)', letterSpacing: '0.04em' }}>{tag}</span>
                    ))}
                  </div>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: 'hsl(var(--foreground)/0.3)', flexShrink: 0, marginLeft: '8px' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <GitHubRepos />

        <div className="pt-10 mt-16 border-t-2 border-foreground/25">
          <span className="text-[13px] text-foreground/45 tracking-wider" style={{ fontFamily: 'var(--font-geist-mono)' }}>
            education
          </span>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mt-4">
            <div>
              <p className="text-base font-medium text-foreground">
                Velammal Institute of Technology
              </p>
              <p className="text-base text-foreground/55 mt-0.5">
                B.E. Electronics and Communication Engineering
              </p>
            </div>
            <span className="text-[13px] text-foreground/35 shrink-0" style={{ fontFamily: 'var(--font-geist-mono)' }}>
              2017–2021
            </span>
          </div>
        </div>
      </div>

      <NextPageNav href="/contact" label="Contact" />
    </>
  );
}
