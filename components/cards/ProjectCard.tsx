import type { ProjectData } from '@/lib/tools';

export function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <div
      className="mt-3 p-4"
      style={{
        background: 'var(--surface)',
        border: '1px solid hsl(var(--foreground)/0.12)',
        borderRadius: '12px',
      }}
    >
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <p className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground)/0.9)' }}>
          {project.title}
        </p>
        {project.period && (
          <span
            className="text-xs shrink-0"
            style={{ fontFamily: 'var(--font-geist-mono)', color: 'hsl(var(--foreground)/0.35)' }}
          >
            {project.period}
          </span>
        )}
      </div>
      {'status' in project && project.status && (
        <p
          className="text-xs font-semibold mb-2"
          style={{ color: 'var(--amber)', fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.05em' }}
        >
          {project.status}
        </p>
      )}
      <p className="text-[12px] leading-relaxed mb-3 line-clamp-2" style={{ color: 'hsl(var(--foreground)/0.55)' }}>
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5"
            style={{
              fontFamily: 'var(--font-geist-mono)',
              color: 'var(--amber)',
              letterSpacing: '0.04em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
