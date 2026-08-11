import Link from 'next/link';
import { Card } from '@/components/card';
import { ProjectAssetGallery } from '@/components/project-asset-gallery';
import { repository } from '@/lib/portfolio-repository';

export default function Projects() {
  const projects = repository.listProjects();
  return (
    <div className="projects-page mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <section className="projects-hero">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[.24em] text-[var(--accent)]">
            Projects
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-[-.04em] md:text-6xl">
            Building the boundaries that make complex products dependable
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
            A project is more than a technology stack. It is the problem, the
            decisions made under pressure, and the behavior that holds up when
            real users and real systems change.
          </p>
        </div>
        <div className="projects-hero-note" aria-label="How to use this page">
          <span className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">
            A closer look
          </span>
          <p>
            Start with the product context, then follow the architecture,
            tradeoffs, and outcomes behind the work.
          </p>
        </div>
      </section>

      <section className="mt-16 md:mt-20" aria-labelledby="project-list-title">
        <div className="mb-7 flex items-end justify-between gap-5 border-b border-[var(--line)] pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--muted)]">
              Selected work
            </p>
            <h2 id="project-list-title" className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              The project in focus
            </h2>
          </div>
          <span className="hidden font-mono text-xs text-[var(--muted)] sm:block">
            {String(projects.length).padStart(2, '0')} project{projects.length === 1 ? '' : 's'}
          </span>
        </div>
        <div className="grid gap-5">
          {projects.map((project, index) => (
            <Card
              key={project.slug}
              href={`/projects/${project.slug}?from=projects`}
              eyebrow={`${String(index + 1).padStart(2, '0')} / ${project.category}`}
              title={project.title}
              summary={project.summary}
              tags={project.tags}
              className="project-card border-[var(--accent)]/60 p-7 shadow-[0_20px_70px_-35px_rgba(56,189,248,0.55)] md:p-10"
            />
          ))}
        </div>
      </section>

      <section className="projects-cta mt-16 md:mt-24" aria-labelledby="projects-cta-title">
        <div>
          <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
            See the working method
          </p>
          <h2 id="projects-cta-title" className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Interested in the capabilities behind the project?
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Explore the engineering practices that shaped the architecture,
            delivery, and reliability of this work.
          </p>
        </div>
        <Link
          href="/capabilities"
          className="shrink-0 rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-[#082522] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          View capabilities <span aria-hidden="true">↗</span>
        </Link>
        </section>
        <ProjectAssetGallery />
    </div>
  );
}
