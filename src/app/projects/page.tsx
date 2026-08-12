import Link from 'next/link';
import { Suspense } from 'react';
import { InlineIcon } from '@/components/inline-icon';
import { ProjectAssetGallery } from '@/components/project-asset-gallery';
import { ProjectList } from '@/components/project-list';
import { repository } from '@/lib/portfolio-repository';
export default function Projects() {
  const allProjects = repository.listProjects();
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

      <Suspense
        fallback={<div className="mt-16 h-40 md:mt-20" aria-hidden="true" />}
      >
        <ProjectList projects={allProjects} />
      </Suspense>

      <section
        className="projects-cta mt-16 md:mt-24"
        aria-labelledby="projects-cta-title"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
            See the working method
          </p>
          <h2
            id="projects-cta-title"
            className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl"
          >
            Interested in the capabilities behind the project?
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Explore the engineering practices that shaped the architecture,
            delivery, and reliability of this work.
          </p>
        </div>
        <Link
          href="/capabilities"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-[var(--on-accent)] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          View capabilities <InlineIcon name="external" />
        </Link>
      </section>
      <ProjectAssetGallery />
    </div>
  );
}
