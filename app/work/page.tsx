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
    text: 'Built PDF RAG chatbot using Python, LangChain, ChromaDB, HuggingFace embeddings, and Ollama. Users can chat with any uploaded PDF via a local LLM with hallucination prevention. Fully local inference — no external API calls.',
    tags: ['LangChain', 'ChromaDB', 'Ollama', 'RAG', 'Python'],
    ai: true,
  },
  {
    text: 'Authored CLAUDE.md knowledge bases across 5 legacy repositories — parsed 15 years of undocumented platform code into structured markdown, enabling AI-assisted development on a codebase with no prior documentation. Used Claude Code as primary development tool for migration work.',
    tags: ['Claude Code', 'Technical Writing', 'Legacy Migration'],
    ai: true,
  },
  {
    text: 'Introduced JSONata to replace AtlasMap for carrier request/response transformation. Reduced new carrier onboarding from days to hours. Enabled non-technical QA and BA teams to independently onboard carriers through 3-table configuration — service, detail, and value mapping. Four commercial carriers integrated.',
    tags: ['JSONata', 'MySQL', 'Python', 'Carrier Integration'],
    ai: false,
  },
  {
    text: 'Architected and delivered a multi-carrier API unification prototype — single request handled by multiple carriers simultaneously using a serverless fan-out pattern on Oracle Cloud Infrastructure. Built locally in 6 hours, deployed to OCI in 4 hours.',
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
    <div className="px-6 sm:px-8 py-16 sm:py-24 max-w-5xl mx-auto">
      <p
        className="text-[13px] text-[var(--amber)] tracking-[0.06em] mb-10"
        style={{ fontFamily: 'var(--font-geist-mono)' }}
      >
        experience
      </p>

      <div className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-12">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              Solartis Technology Services
            </h1>
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

      <div className="pt-10 border-t-2 border-foreground/25">
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
  );
}
