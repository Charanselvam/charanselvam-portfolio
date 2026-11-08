import { SKILLS } from '@/lib/content';

export function SkillsGrid() {
  return (
    <section className="px-6 sm:px-8 py-14 border-t border-foreground/10">
      <p
        className="text-[11px] text-foreground/40 uppercase tracking-widest mb-8"
        style={{ fontFamily: 'var(--font-geist-mono)' }}
      >
        Skills
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {SKILLS.map(({ group, items }) => (
          <div key={group}>
            <p
              className="text-[11px] text-foreground/40 uppercase tracking-widest mb-3"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              {group}
            </p>
            <ul className="space-y-1">
              {items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-foreground/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
