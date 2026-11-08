import Link from 'next/link';
import type { ProjectData } from '@/lib/tools';

export function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <div className="mt-3 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30">
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
          {project.title}
        </p>
        {project.period && (
          <span className="text-xs text-slate-400 shrink-0">{project.period}</span>
        )}
      </div>
      {'status' in project && project.status && (
        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
          {project.status}
        </p>
      )}
      <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        href="/projects"
        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
      >
        View all projects →
      </Link>
    </div>
  );
}
