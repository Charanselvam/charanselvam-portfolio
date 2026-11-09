'use client';

import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';

const MCP_URL = 'https://charanselvam.dev/api/mcp';

const INTEGRATIONS: { id: string; label: string; steps: string[] }[] = [
  {
    id: 'claude',
    label: 'CLAUDE',
    steps: [
      'Open Claude → Settings → Integrations.',
      'Click "Add custom connector".',
      `Paste the MCP URL and save.`,
      'Ask Claude anything about my work.',
    ],
  },
  {
    id: 'claude-code',
    label: 'CLAUDE CODE',
    steps: [
      'In your terminal, run:',
      '`claude mcp add charanselvam --url <MCP_URL>`',
      'Claude Code now has live access to my portfolio context.',
      'Try: "What projects has Charanselvam built?"',
    ],
  },
  {
    id: 'cursor',
    label: 'CURSOR',
    steps: [
      'Open Cursor → Settings → MCP.',
      'Click "Add MCP Server".',
      `Set URL to the MCP address and name it "Charanselvam".`,
      'The AI sidebar can now answer questions about my work.',
    ],
  },
  {
    id: 'vscode',
    label: 'VS CODE',
    steps: [
      'Install the GitHub Copilot or Continue.dev extension.',
      'Open settings and find the MCP server config.',
      `Add the MCP URL as a new server endpoint.`,
      'Ask your IDE assistant about my background.',
    ],
  },
  {
    id: 'chatgpt',
    label: 'CHATGPT',
    steps: [
      'Open ChatGPT → Explore GPTs → My GPTs.',
      'Create a new GPT and add an Action.',
      `Paste the MCP URL as the OpenAPI schema endpoint.`,
      'Your custom GPT now knows my full portfolio.',
    ],
  },
  {
    id: 'other',
    label: 'ANYTHING ELSE',
    steps: [
      'Any MCP-compatible client works.',
      `Use the URL: ${MCP_URL}`,
      'It exposes tools: get_profile, get_projects, get_skills, get_now, get_stats.',
      'Standard JSON-RPC 2.0 over HTTP.',
    ],
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      style={{
        background: 'var(--amber)',
        color: 'hsl(30 8% 5%)',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'opacity 0.15s',
        flexShrink: 0,
      }}
    >
      {copied ? '✓ COPIED' : 'COPY ADDRESS'}
    </button>
  );
}

export default function AIPage() {
  const [activeIntegration, setActiveIntegration] = useState('claude');
  const active = INTEGRATIONS.find((i) => i.id === activeIntegration)!;

  return (
    <div className="min-h-screen px-6 sm:px-8 py-16 sm:py-20 max-w-6xl mx-auto">

      {/* Hero */}
      <div style={{ marginBottom: '64px' }}>
        <span
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '11px',
            color: 'hsl(var(--foreground)/0.35)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '16px',
          }}
        >
          AI · Portfolio Interface
        </span>
        <h1
          className="font-bold"
          style={{ fontSize: 'clamp(48px, 10vw, 120px)', letterSpacing: '-0.04em', lineHeight: 0.9, marginBottom: '24px' }}
        >
          ASK{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--amber)' }}>MY AI.</em>
        </h1>
        <p
          style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            lineHeight: 1.6,
            color: 'hsl(var(--foreground)/0.55)',
            maxWidth: '560px',
          }}
        >
          Add my portfolio to your own AI assistant and ask it anything about me: projects, experience, skills, and availability. It answers from live data, so it&apos;s always current.
        </p>
      </div>

      {/* Two-col layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '48px',
          alignItems: 'start',
        }}
        className="grid-cols-1 md:grid-cols-2"
      >
        {/* Left — MCP + integrations */}
        <div>
          {/* MCP URL bar */}
          <div style={{ marginBottom: '40px' }}>
            <span
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '10px',
                color: 'hsl(var(--foreground)/0.35)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              MCP Server URL
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'var(--surface)',
                border: '1px solid hsl(var(--foreground)/0.12)',
                borderRadius: '10px',
                padding: '12px 16px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '13px',
                  color: 'hsl(var(--foreground)/0.6)',
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {MCP_URL}
              </span>
              <CopyButton text={MCP_URL} />
            </div>
          </div>

          {/* Integration selector */}
          <div style={{ marginBottom: '24px' }}>
            <span
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '10px',
                color: 'hsl(var(--foreground)/0.35)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              01 · Connect it
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {INTEGRATIONS.map((intg) => (
                <button
                  key={intg.id}
                  onClick={() => setActiveIntegration(intg.id)}
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: activeIntegration === intg.id
                      ? '1px solid var(--amber)'
                      : '1px solid hsl(var(--foreground)/0.12)',
                    background: activeIntegration === intg.id
                      ? 'hsl(var(--amber) / 0.08)'
                      : 'transparent',
                    color: activeIntegration === intg.id
                      ? 'var(--amber)'
                      : 'hsl(var(--foreground)/0.45)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {intg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid hsl(var(--foreground)/0.08)',
              borderRadius: '12px',
              padding: '20px 24px',
            }}
          >
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {active.steps.map((step, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    paddingBottom: i < active.steps.length - 1 ? '14px' : 0,
                    borderBottom: i < active.steps.length - 1 ? '1px solid hsl(var(--foreground)/0.06)' : 'none',
                    marginBottom: i < active.steps.length - 1 ? '14px' : 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontSize: '10px',
                      color: 'var(--amber)',
                      lineHeight: '22px',
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '13px', lineHeight: 1.6, color: 'hsl(var(--foreground)/0.6)' }}>
                    {step.includes('`') ? (
                      <>
                        {step.split('`').map((seg, j) =>
                          j % 2 === 1 ? (
                            <code
                              key={j}
                              style={{
                                fontFamily: 'var(--font-geist-mono)',
                                fontSize: '11px',
                                background: 'hsl(var(--foreground)/0.07)',
                                color: 'var(--amber)',
                                padding: '1px 6px',
                                borderRadius: '4px',
                              }}
                            >
                              {seg.replace('<MCP_URL>', MCP_URL)}
                            </code>
                          ) : (
                            seg
                          )
                        )}
                      </>
                    ) : (
                      step
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Available tools */}
          <div style={{ marginTop: '24px' }}>
            <span
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '10px',
                color: 'hsl(var(--foreground)/0.3)',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              02 · Available tools
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['get_profile', 'get_projects', 'get_skills', 'get_now', 'get_stats'].map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '10px',
                    color: 'hsl(var(--foreground)/0.35)',
                    border: '1px solid hsl(var(--foreground)/0.08)',
                    borderRadius: '6px',
                    padding: '4px 10px',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — inline chat */}
        <div
          style={{
            position: 'sticky',
            top: '24px',
            background: 'var(--surface)',
            border: '1px solid hsl(var(--foreground)/0.1)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {/* Chat header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 18px',
              borderBottom: '1px solid hsl(var(--foreground)/0.08)',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'hsl(var(--amber) / 0.15)',
                border: '1px solid hsl(var(--amber) / 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '9px',
                color: 'var(--amber)',
                letterSpacing: '0.05em',
                flexShrink: 0,
              }}
            >
              CS
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '12px',
                  color: 'var(--amber)',
                  letterSpacing: '0.06em',
                }}
              >
                CHARAN&apos;S AI
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '9px',
                  color: 'hsl(var(--foreground)/0.3)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Answers from portfolio context
              </div>
            </div>
          </div>

          {/* Chat body */}
          <div style={{ padding: '16px', maxHeight: '520px', overflowY: 'auto' }}>
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
}
