'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/card';
import type { PortfolioItem } from '@/lib/portfolio-repository';

const validRoles = [
  'Full-stack',
  'Systems integration',
  'Cross-platform',
  'Reliability',
] as const;

const projectImages: Record<string, { src: string; alt: string }> = {
  'sepia-client': {
    src: '/images/optimized/projects/sepia/sepia-project.jpg',
    alt: 'SEPIA desktop control interface, analog rack, and hardware module',
  },
  qpro: {
    src: '/images/optimized/projects/QPRO/qpro-project.jpg',
    alt: 'QPRO teller dashboard and mobile queue flow',
  },
  fast: {
    src: '/images/optimized/projects/FAST/fast-project.jpg',
    alt: 'FAST document search interface and mobile document vault',
  },
  availbld: {
    src: '/images/optimized/projects/availbld/availbld-project.jpg',
    alt: 'Availbld mobile screens for live events, groups, chat, and discovery',
  },
  'awh-app': {
    src: '/images/optimized/projects/AWH/awh.jpg',
    alt: 'AWH warehouse operations dashboards and field workflows',
  },
  metacare: {
    src: '/images/optimized/projects/Metacare/metacare-project.jpg',
    alt: 'MetaCare health and wellness marketplace mobile screens',
  },
};

export function ProjectList({ projects }: { projects: PortfolioItem[] }) {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const activeRole = validRoles.find(
    (value) => value.toLowerCase() === role?.toLowerCase(),
  );
  const filteredProjects = activeRole
    ? projects.filter((project) => project.roleFit?.includes(activeRole))
    : projects;

  return (
    <section className="mt-16 md:mt-20" aria-labelledby="project-list-title">
      <div className="mb-7 flex items-end justify-between gap-5 border-b border-[var(--line)] pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--muted)]">
            Selected work
          </p>
          <h2
            id="project-list-title"
            className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl"
          >
            The project in focus
          </h2>
        </div>
        <span className="hidden font-mono text-xs text-[var(--muted)] sm:block">
          {String(filteredProjects.length).padStart(2, '0')} project
          {filteredProjects.length === 1 ? '' : 's'}
        </span>
      </div>
      <nav
        className="mb-8 flex flex-wrap gap-2"
        aria-label="Filter projects by role fit"
      >
        <Link
          href="/projects"
          className={`rounded-full border px-4 py-2 text-sm transition ${!activeRole ? 'border-[var(--accent)] text-[var(--ink)]' : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'}`}
        >
          All projects
        </Link>
        {validRoles.map((value) => (
          <Link
            key={value}
            href={`/projects?role=${encodeURIComponent(value)}`}
            className={`rounded-full border px-4 py-2 text-sm transition ${activeRole === value ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--ink)]' : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'}`}
          >
            {value}
          </Link>
        ))}
      </nav>
      <div className="grid gap-5">
        {filteredProjects.map((project, index) => (
          <Card
            key={project.slug}
            href={`/projects/${project.slug}?from=projects`}
            eyebrow={`${String(index + 1).padStart(2, '0')} / ${project.category}`}
            title={project.title}
            summary={project.summary}
            tags={project.tags}
            image={projectImages[project.slug]}
            className="project-card"
          />
        ))}
      </div>
    </section>
  );
}
