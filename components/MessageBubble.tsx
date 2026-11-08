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
        <div className="max-w-[80%] px-4 py-2.5 rounded-2xl bg-slate-900 dark:bg-slate-100 text-slate-50 dark:text-slate-900 text-sm leading-relaxed">
          {text}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 flex gap-3">
      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-white text-xs font-semibold">C</span>
      </div>
      <div className="flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {message.parts.map((part, i) => {
          if (part.type === 'text') {
            const textPart = part as { type: 'text'; text: string };
            return (
              <ReactMarkdown
                key={i}
                components={{
                  p: ({ children }) => <p className="mb-2">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-slate-900 dark:text-slate-100">{children}</strong>,
                  ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1">{children}</ol>,
                  li: ({ children }) => <li>{children}</li>,
                  code: ({ children }) => <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono">{children}</code>,
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

          return null;
        })}
      </div>
    </div>
  );
}
