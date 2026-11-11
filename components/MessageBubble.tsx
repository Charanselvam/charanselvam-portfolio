'use client';

import type { UIMessage } from 'ai';
import ReactMarkdown from 'react-markdown';
import { ProjectCard } from './cards/ProjectCard';
import { ActionCard } from './cards/ActionCard';
import type { ProjectData } from '@/lib/tools';

export function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';

  if (isUser) {
    const text = message.parts
      .filter((p) => p.type === 'text')
      .map((p) => (p as { type: 'text'; text: string }).text)
      .join('');
    return (
      <div className="flex justify-end mb-4">
        <div
          className="max-w-[80%] px-4 py-2.5 text-sm leading-relaxed"
          style={{
            background: 'hsl(var(--foreground)/0.07)',
            border: '1px solid hsl(var(--foreground)/0.1)',
            borderRadius: '16px 16px 4px 16px',
            color: 'hsl(var(--foreground)/0.85)',
          }}
        >
          {text}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5 flex gap-3">
      {/* Avatar */}
      <div
        className="shrink-0 mt-0.5 flex items-center justify-center"
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          border: '1px solid hsl(var(--foreground)/0.2)',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '9px',
          letterSpacing: '0.05em',
          color: 'var(--amber)',
        }}
      >
        CS
      </div>

      <div className="flex-1 text-sm leading-relaxed" style={{ color: 'hsl(var(--foreground)/0.75)' }}>
        {message.parts.map((part, i) => {
          if (part.type === 'text') {
            const textPart = part as { type: 'text'; text: string };
            return (
              <ReactMarkdown
                key={i}
                components={{
                  p: ({ children }) => <p className="mb-2">{children}</p>,
                  strong: ({ children }) => (
                    <strong style={{ fontWeight: 600, color: 'hsl(var(--foreground)/0.9)' }}>{children}</strong>
                  ),
                  ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1">{children}</ol>,
                  li: ({ children }) => <li>{children}</li>,
                  code: ({ children }) => (
                    <code
                      className="px-1 py-0.5 rounded text-xs"
                      style={{
                        background: 'hsl(var(--foreground)/0.07)',
                        fontFamily: 'var(--font-geist-mono)',
                        color: 'var(--amber)',
                      }}
                    >
                      {children}
                    </code>
                  ),
                }}
              >
                {textPart.text}
              </ReactMarkdown>
            );
          }

          if (part.type === 'tool-show_project') {
            const toolPart = part as { type: string; state: string; output?: unknown };
            if (toolPart.state === 'output-available' && toolPart.output) {
              return <ProjectCard key={i} project={toolPart.output as ProjectData} />;
            }
          }

          if (part.type === 'tool-show_resume') {
            const toolPart = part as { type: string; state: string; output?: unknown };
            if (toolPart.state === 'output-available' && toolPart.output) {
              return <ActionCard key={i} type="resume" data={toolPart.output as { filename: string; url: string }} />;
            }
          }

          if (part.type === 'tool-show_contact') {
            const toolPart = part as { type: string; state: string; output?: unknown };
            if (toolPart.state === 'output-available' && toolPart.output) {
              return <ActionCard key={i} type="contact" data={toolPart.output as { email: string; linkedin: string }} />;
            }
          }

          if (part.type === 'tool-show_sources') {
            const toolPart = part as { type: string; state: string; output?: { items: { label: string; href: string }[] } };
            if (toolPart.state === 'output-available' && toolPart.output?.items?.length) {
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginTop: '12px',
                    paddingTop: '10px',
                    borderTop: '1px solid hsl(var(--foreground)/0.07)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'hsl(var(--foreground)/0.25)',
                    }}
                  >
                    From
                  </span>
                  {toolPart.output.items.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: 'var(--font-geist-mono)',
                        fontSize: '10px',
                        letterSpacing: '0.04em',
                        color: 'hsl(var(--foreground)/0.45)',
                        textDecoration: 'none',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: '1px solid hsl(var(--foreground)/0.08)',
                        transition: 'color 0.15s, border-color 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--amber)';
                        e.currentTarget.style.borderColor = 'hsl(var(--amber) / 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'hsl(var(--foreground)/0.45)';
                        e.currentTarget.style.borderColor = 'hsl(var(--foreground)/0.08)';
                      }}
                    >
                      <span style={{ color: 'var(--amber)', opacity: 0.5, fontSize: '9px' }}>→</span>
                      {s.label}
                    </a>
                  ))}
                </div>
              );
            }
          }

          return null;
        })}
      </div>
    </div>
  );
}
