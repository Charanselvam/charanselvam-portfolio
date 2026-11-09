'use client';

const PROMPTS = [
  'How did you crack the carrier integration?',
  'What was wrong with the IBM WatsonX setup?',
  'What would you build at a company still on legacy?',
  'Are you open to fully remote roles?',
];

export function PromptChips({
  onSelect,
  disabled,
}: {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {PROMPTS.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          disabled={disabled}
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '11px',
            padding: '6px 12px',
            borderRadius: '999px',
            border: '1px solid hsl(var(--foreground)/0.12)',
            background: 'transparent',
            color: 'hsl(var(--foreground)/0.45)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            transition: 'border-color 0.15s, color 0.15s',
            letterSpacing: '0.02em',
            lineHeight: 1.4,
            textAlign: 'left',
          }}
          onMouseEnter={(e) => {
            if (disabled) return;
            e.currentTarget.style.borderColor = 'var(--amber)';
            e.currentTarget.style.color = 'var(--amber)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'hsl(var(--foreground)/0.12)';
            e.currentTarget.style.color = 'hsl(var(--foreground)/0.45)';
          }}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
