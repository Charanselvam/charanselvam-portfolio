'use client';

import { QA } from '@/lib/qa';

export function PromptChips({
  onSelect,
  disabled,
}: {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
      {QA.map(({ question }) => (
        <button
          key={question}
          onClick={() => onSelect(question)}
          disabled={disabled}
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '11px',
            padding: '7px 13px',
            borderRadius: '999px',
            border: '1px solid hsl(var(--foreground)/0.11)',
            background: 'transparent',
            color: 'hsl(var(--foreground)/0.45)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.4 : 1,
            transition: 'border-color 0.15s, color 0.15s, background 0.15s',
            letterSpacing: '0.02em',
            lineHeight: 1.4,
            textAlign: 'left',
          }}
          onMouseEnter={(e) => {
            if (disabled) return;
            e.currentTarget.style.borderColor = 'hsl(var(--amber) / 0.6)';
            e.currentTarget.style.color = 'var(--amber)';
            e.currentTarget.style.background = 'hsl(var(--amber) / 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'hsl(var(--foreground)/0.11)';
            e.currentTarget.style.color = 'hsl(var(--foreground)/0.45)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {question}
        </button>
      ))}
    </div>
  );
}
