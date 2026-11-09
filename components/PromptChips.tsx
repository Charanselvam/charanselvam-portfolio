'use client';

const PROMPTS = [
  'How did you crack the carrier integration?',
  'What was wrong with the IBM WatsonX setup?',
  'Walk me through the payment bug.',
  'What would you build at a company still on legacy?',
  'Are you open to fully remote roles?',
];

export function PromptChips({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PROMPTS.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="text-sm px-4 py-2 rounded-full border border-slate-700 text-slate-400 hover:border-amber-500 hover:text-amber-400 hover:bg-amber-50/5 transition-colors"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
