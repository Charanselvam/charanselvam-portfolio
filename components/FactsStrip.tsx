import { PROFILE } from '@/lib/content';

const FACTS = [
  { label: 'Currently', value: 'Solartis Technology Services' },
  { label: 'Role', value: PROFILE.title },
  { label: 'Based', value: PROFILE.location },
  { label: 'Experience', value: '5+ years' },
] as const;

export function FactsStrip() {
  return (
    <section className="px-6 sm:px-8 py-8 border-t border-foreground/10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
        {FACTS.map(({ label, value }) => (
          <div key={label}>
            <p
              className="text-[13px] text-foreground/40 uppercase tracking-widest mb-1"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              {label}
            </p>
            <p
              className="text-[15px] text-foreground/80"
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
