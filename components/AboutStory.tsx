import { PROFILE } from '@/lib/content';

export function AboutStory() {
  return (
    <section className="px-6 sm:px-8 pt-16 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
        <div>
          <p
            className="text-[11px] text-foreground/40 uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            Story
          </p>
        </div>
        <div>
          <h1
            className="font-semibold text-foreground leading-tight mb-8"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            {PROFILE.statement}
          </h1>
          <div className="space-y-5 text-foreground/65 leading-relaxed" style={{ maxWidth: '58ch' }}>
            <p>
              I started as a Java developer inside an enterprise insurance PAS — the kind of system
              where every deploy touches policy data for real customers across multiple states.
              Five years of shipping in that environment teaches you to care about correctness first.
            </p>
            <p>
              When LLMs became capable enough to wire into production, I was already deep inside the
              enterprise context they needed to be useful in. I built tools that removed real friction:
              a Gemini-based Excel extractor that cut parsing failures from 30% to near zero; a
              fully-local RAG chatbot for internal document Q&amp;A; a JSONata mapping engine that
              cut carrier onboarding from days to hours.
            </p>
            <p>
              Today I work at the junction of enterprise reliability and AI capability — helping
              systems that weren&apos;t built for AI become meaningfully better with it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
