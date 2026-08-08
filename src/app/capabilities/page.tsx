import Link from 'next/link';
import { Card } from '@/components/card';
import { repository } from '@/lib/portfolio-repository';

export default function Capabilities() {
  const capabilities = repository.listCapabilities();
  return (
    <div className="capabilities-page mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <section className="capabilities-hero">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[.24em] text-[var(--accent)]">
            Capabilities
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-[-.04em] md:text-6xl">
            The capabilities behind dependable systems
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
            Each capability describes a boundary I help make explicit: the
            problem it solves, the decisions it requires, and the architecture,
            tradeoffs, and evidence behind dependable software.
          </p>
        </div>
        <div className="capabilities-hero-note" aria-label="How to use this page">
          <span className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">
            A practical lens
          </span>
          <p>
            Start with the outcome, then follow the boundary, decision, and
            evidence behind it.
          </p>
        </div>
      </section>

      <section className="mt-16 md:mt-20" aria-labelledby="capability-list-title">
        <div className="mb-7 flex items-end justify-between gap-5 border-b border-[var(--line)] pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--muted)]">
              Selected areas of practice
            </p>
            <h2 id="capability-list-title" className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Where I contribute
            </h2>
          </div>
          <span className="hidden font-mono text-xs text-[var(--muted)] sm:block">
            {String(capabilities.length).padStart(2, '0')} areas
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {capabilities.map((c, index) => (
            <Card
              key={c.slug}
              href={`/capabilities/${c.slug}`}
              eyebrow={`${String(index + 1).padStart(2, '0')} / ${c.metadata.project}`}
              title={c.title}
              summary={c.summary}
              tags={c.tags}
              className="capability-card"
            />
          ))}
        </div>
      </section>

      <section className="capabilities-cta mt-16 md:mt-24" aria-labelledby="capabilities-cta-title">
        <div>
          <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
            Continue the conversation
          </p>
          <h2 id="capabilities-cta-title" className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Want the reasoning behind a capability?
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Explore the SEPIA case study for a deeper look at architecture,
            state ownership, hardware boundaries, and testing.
          </p>
        </div>
        <Link
          href="/projects/sepia-client?from=capabilities"
          className="shrink-0 rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-[#082522] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          Explore SEPIA <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
