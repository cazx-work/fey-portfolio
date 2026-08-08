import Link from 'next/link';
import { Card } from '@/components/card';
import { SectionHeading } from '@/components/section-heading';
import { repository } from '@/lib/portfolio-repository';
import { TeammateFeedback } from '@/components/teammate-feedback';
import { testimonials } from '@/data/testimonials';

export default function Home() {
  const capabilities = repository.listCapabilities();
  const projects = repository.listProjects();
  const flagship = projects.find((project) => project.slug === 'sepia-client');
  const stories = repository.listStories();
  const featuredStories = ['device-lifecycle-management', 'configuration-recovery', 'hardware-communication-platform']
    .map((slug) => stories.find((story) => story.slug === slug))
    .filter((story): story is (typeof stories)[number] => Boolean(story));
  const featuredCapabilities = ['cross-platform-architecture', 'native-and-hardware-integration', 'state-recovery-and-resilience', 'testing-and-developer-enablement']
    .map((slug) => capabilities.find((capability) => capability.slug === slug))
    .filter((capability): capability is (typeof capabilities)[number] => Boolean(capability));
  return (
    <>
      <section className="home-hero" aria-labelledby="hero-heading">
        <div className="hero-grid mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 px-5 pb-24 pt-12 lg:grid-cols-12 md:gap-8 md:pb-28 md:pt-16">
          <header className="lg:col-span-7">
            <div className="hero-status mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)]/70 px-3 py-1.5 font-mono text-[.68rem] uppercase tracking-[.18em] text-[var(--accent)]">
              <span className="hero-status-dot" aria-hidden="true" />
              Systems-oriented software engineer
            </div>
            <h1 id="hero-heading" className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-.04em] md:text-6xl">
              Software at the boundary between product interfaces, native systems, and connected devices.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] md:mt-6 md:text-lg md:leading-8">
              I build cross-platform products at the boundary between Flutter interfaces, C++ and native integrations, performance-sensitive workflows, and solid software architecture. My focus is maintainable software that stays understandable when external systems are asynchronous or unreliable.
            </p>
            <div className="hero-actions mt-8 flex flex-wrap items-center gap-3 md:mt-9">
              <Link
                href="/capabilities"
                className="hero-primary-cta group inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#082522] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                <span>Explore capabilities</span>
                <span className="hero-cta-arrow transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5" aria-hidden="true">↗</span>
              </Link>
              <Link href="/projects" className="hero-secondary-link group inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--line)] px-5 py-3 text-sm font-medium text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
                <span>View selected work</span>
                <span className="hero-cta-arrow transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5" aria-hidden="true">↗</span>
              </Link>
            </div>
          </header>
          <figure className="hero-boundary-card rounded-2xl border border-[var(--line)] bg-[var(--surface)]/90 p-4 text-sm lg:col-span-5 lg:mt-10 md:p-6">
            <div className="hero-boundary-heading">
              <p className="font-mono text-[.68rem] uppercase tracking-[.18em] text-[var(--accent)]">/ how I work</p>
              <p className="mt-2 text-base font-medium text-[var(--ink)]">A conceptual system boundary</p>
            </div>
            <ol className="diagram-flow mt-5" aria-label="System layers">
              <li className="diagram-step">
                <span className="diagram-step-index">01</span>
                <span className="diagram-node">Flutter UI + feature state</span>
              </li>
              <li className="diagram-step">
                <span className="diagram-step-index">02</span>
                <span className="diagram-node">Domain rules + durable state</span>
              </li>
              <li className="diagram-step">
                <span className="diagram-step-index">03</span>
                <span className="diagram-node">Native integration + device communication</span>
              </li>
              <li className="diagram-step">
                <span className="diagram-step-index">04</span>
                <span className="diagram-node">Professional audio + hardware systems</span>
              </li>
            </ol>
            <figcaption className="hero-boundary-caption mt-5 pt-4 text-xs leading-5 text-[var(--muted)]">The work is in making each boundary explicit, observable, and dependable.</figcaption>
          </figure>
        </div>
      </section>
      <section className="home-section home-section--proof mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          kicker="02 / proof points"
          title="Making complex boundaries dependable"
        >
          Three examples of the engineering problems I work on: preserving
          intent, owning asynchronous state, and making specialized systems
          safer to extend.
        </SectionHeading>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredStories.map((s) => {
            return (
            <Card
              key={s.slug}
              href={`/engineering-stories/${s.slug}`}
              eyebrow="SEPIA"
              title={s.metadata.homepageTitle ?? s.title}
              summary={s.metadata.homepageSummary ?? s.summary}
              tags={s.tags}
            />
            );
          })}
        </div>
        <div className="mt-8">
          <Link href="/engineering-stories" className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
            Explore all engineering stories <span aria-hidden="true" className="transition group-hover:translate-x-1">↗</span>
          </Link>
        </div>
      </section>
      <section className="home-section home-section--flagship border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading kicker="03 / flagship project" title="What makes SEPIA dependable in real time">
            The case study looks past the product surface to the boundaries that keep a changing hardware system understandable: preserving operator intent, owning device lifecycles, and validating state before it is restored.
          </SectionHeading>
          {flagship && (
            <Link
              href={`/projects/${flagship.slug}?from=home`}
              className="group block rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_18px_45px_-28px_rgba(56,189,248,0.7)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] md:p-8"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">Inside the case study</p>
                  <h3 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight transition-colors group-hover:text-[var(--accent)] md:text-3xl">
                    Turning live hardware changes into safe, recoverable software behavior
                  </h3>
                </div>
                <span aria-hidden="true" className="text-xl text-[var(--accent)] transition group-hover:translate-x-1">↗</span>
              </div>
              <div className="mt-8 grid gap-4 border-t border-[var(--line)] pt-6 md:grid-cols-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[.16em] text-[var(--accent)]">01</p>
                  <p className="mt-2 font-medium text-[var(--ink)]">Preserve intent</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Saved decisions stay distinct from transient device state.</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[.16em] text-[var(--accent)]">02</p>
                  <p className="mt-2 font-medium text-[var(--ink)]">Own the lifecycle</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Discovery, reconnect, and disposal have clear ownership.</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[.16em] text-[var(--accent)]">03</p>
                  <p className="mt-2 font-medium text-[var(--ink)]">Validate before restore</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Topology and compatibility are checked before state is applied.</p>
                </div>
              </div>
              <p className="mt-8 text-sm font-semibold text-[var(--accent)]">Read the SEPIA case study <span aria-hidden="true" className="ml-1 transition group-hover:translate-x-1">↗</span></p>
            </Link>
          )}
        </div>
      </section>
      <section className="home-section mx-auto max-w-6xl px-5 pb-12 pt-20">
        <SectionHeading
          kicker="04 / capability map"
          title="The capabilities behind the work"
        >
          A focused view of the practices that support the project. The full
          capability map includes the supporting disciplines and deeper evidence.
        </SectionHeading>
        <div className="grid gap-5 md:grid-cols-2">
          {featuredCapabilities.map((c) => {
            return (
            <Card
              key={c.slug}
              href={`/capabilities/${c.slug}`}
              eyebrow="SEPIA"
              title={c.metadata.homepageTitle ?? c.title}
              summary={c.metadata.homepageSummary ?? c.summary}
              tags={c.tags}
            />
            );
          })}
        </div>
        <div className="mt-8">
          <Link href="/capabilities" className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
            View the full capability map <span aria-hidden="true" className="transition group-hover:translate-x-1">↗</span>
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-8 md:pt-10">
        <SectionHeading
          kicker="05 / teammate feedback"
          title="A collaborative approach to complex systems"
        >
          A small selection of feedback from teammates and collaborators. More context and the full set of quotes live on the testimonials page.
        </SectionHeading>
        <TeammateFeedback testimonials={[testimonials[0], testimonials[1]]} />
        <Link href="/testimonials" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
          Read all testimonials <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
            06 / hiring
          </p>
          <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight md:text-4xl">
            I am looking for my next software engineering role.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-[var(--muted)]">
            If you are hiring for senior Flutter, cross-platform, or systems-oriented engineering work, I would be glad to discuss the role and the problems the team is solving.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[#082522] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            Discuss an open role <span aria-hidden="true" className="ml-2">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
