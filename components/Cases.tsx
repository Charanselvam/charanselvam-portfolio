import { AnimateIn } from './AnimateIn';

const CONFIG_ROWS = [
  {
    key: 'carrier_onboarding.duration',
    value: 'days → hours',
    proof:
      "Adding a new insurance carrier meant weeks of custom integration work. Built a config-driven framework — zero hardcoded carrier logic, everything in three config tables. Four carriers onboarded. Now it's hours.",
  },
  {
    key: 'doc_parse.failure_rate',
    value: '30% → near zero',
    proof:
      'Document parser was failing on 30% of submissions — every client sent Excel files in a different format. Replaced the failing IBM WatsonX implementation with a Gemini API service using engineered prompts. Live in production.',
  },
  {
    key: 'policy_tx.silent_failures',
    value: 'eliminated',
    proof:
      '4–5% of policy transactions were failing without throwing an error or triggering an alert. Traced root cause across two system layers and fixed it.',
  },
];

export function Cases() {
  return (
    <section
      className="px-6 sm:px-8 py-16 sm:py-24"
      aria-label="Outcomes"
    >
      <h2 className="sr-only">Outcomes</h2>

      {CONFIG_ROWS.map((row, i) => (
        <AnimateIn key={row.key} delay={i * 120}>
          {i > 0 && (
            <div
              className="w-full"
              style={{ height: '2px', background: 'hsl(var(--foreground) / 0.25)' }}
            />
          )}
          <div className="py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-[2fr_3fr] gap-6 sm:gap-12 items-start">
            <p
              className="text-sm text-foreground/65 pt-1 tracking-wide"
              style={{ fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.02em' }}
            >
              {row.key}
            </p>
            <div>
              <p
                className="metric-value font-semibold text-[var(--amber)] leading-none"
                style={{
                  fontSize: 'clamp(2.25rem, 6vw, 5.25rem)',
                  letterSpacing: '-0.025em',
                }}
              >
                {row.value}
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/65 max-w-prose">
                {row.proof}
              </p>
            </div>
          </div>
        </AnimateIn>
      ))}
    </section>
  );
}
