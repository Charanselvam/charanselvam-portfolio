import { PROFILE } from '@/lib/content';

const FACTS = [
  { label: 'Currently', value: 'Solartis Technology Services' },
  { label: 'Role', value: PROFILE.title },
  { label: 'Based', value: `${PROFILE.location} (IST)` },
  { label: 'Open to', value: 'Remote · Europe · Singapore' },
] as const;

export function FactsStrip() {
  return (
    <section className="px-6 sm:px-8 py-8 border-t border-foreground/10">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {FACTS.map(({ label, value }) => (
          <div key={label}>
            <p
              className="text-[11px] text-foreground/40 uppercase tracking-widest mb-1"
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
