import Link from 'next/link';
import { Card } from '@/components/card';
import { repository } from '@/lib/portfolio-repository';

export default function Stories() {
  const stories = repository.listStories();
  return (
    <div className="stories-page mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <section className="capabilities-hero">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[.24em] text-[var(--accent)]">
            Engineering stories
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-[-.04em] md:text-6xl">
            The decisions behind the system
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
            Focused narratives that show the problem, the engineering judgment,
            how I investigated it, and the technical evidence behind the shipped
            surface.
          </p>
        </div>
        <div className="capabilities-hero-note" aria-label="How to use this page">
          <span className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">
            A practical lens
          </span>
          <p>
            Start with the failure mode, then follow the boundary, decision, and
            evidence behind the fix.
          </p>
        </div>
      </section>

      <section className="mt-16 md:mt-20" aria-labelledby="story-list-title">
        <div className="mb-7 flex items-end justify-between gap-5 border-b border-[var(--line)] pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--muted)]">
              Selected engineering investigations
            </p>
            <h2 id="story-list-title" className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              The work behind the work
            </h2>
          </div>
          <span className="hidden font-mono text-xs text-[var(--muted)] sm:block">
            {String(stories.length).padStart(2, '0')} stories
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {stories.map((s, index) => (
            <Card
              key={s.slug}
              href={`/engineering-stories/${s.slug}`}
              eyebrow={`${String(index + 1).padStart(2, '0')} / ${s.category}`}
              title={s.title}
              summary={s.summary}
              tags={s.tags}
              className="capability-card"
            />
          ))}
        </div>

      </section>

      <section className="capabilities-cta mt-16 md:mt-24" aria-labelledby="stories-cta-title">
        <div>
          <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
            Continue the investigation
          </p>
          <h2 id="stories-cta-title" className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Want the broader system context?
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Explore the SEPIA case study for the architecture, state ownership,
            hardware boundaries, and testing behind these decisions.
          </p>
        </div>
        <Link
          href="/projects/sepia-client?from=stories"
          className="shrink-0 rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-[#082522] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          Explore SEPIA <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
