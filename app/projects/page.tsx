import React from 'react';
import { PROJECTS } from '@/lib/content';

export default function ProjectsPage() {
  return (
    <div className="px-6 sm:px-8 py-16 sm:py-24 max-w-5xl mx-auto">
      <p
        className="text-[13px] text-[var(--amber)] tracking-[0.06em] mb-10"
        style={{ fontFamily: 'var(--font-geist-mono)' }}
      >
        projects
      </p>

      <div className="space-y-0">
        {PROJECTS.map((project, i) => (
          <article
            key={i}
            className="grid grid-cols-1 sm:grid-cols-[3fr_2fr] gap-4 sm:gap-12 py-10 border-t border-foreground/25"
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
                <h2 className="text-base font-semibold text-foreground">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--amber)] transition-colors"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h2>
                {project.status && (
                  <span
                    className="text-[13px] text-[var(--amber)]"
                    style={{ fontFamily: 'var(--font-geist-mono)' }}
                  >
                    {project.status}
                  </span>
                )}
              </div>
              <p className="text-base leading-relaxed text-foreground/65">
                {project.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 content-start">
              <span
                className="text-[13px] text-foreground/35"
                style={{ fontFamily: 'var(--font-geist-mono)' }}
              >
                {project.period}
              </span>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[13px] text-foreground/45"
                    style={{ fontFamily: 'var(--font-geist-mono)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
