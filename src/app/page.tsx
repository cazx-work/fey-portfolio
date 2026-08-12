import Link from 'next/link';
import { Card } from '@/components/card';
import { MediaImage } from '@/components/portfolio/media-image';
import { ProjectCarousel } from '@/components/project-carousel';
import { SectionHeading } from '@/components/section-heading';
import { repository } from '@/lib/portfolio-repository';
import { TeammateFeedback } from '@/components/teammate-feedback';
import { testimonials } from '@/data/testimonials';
import { InlineIcon } from '@/components/inline-icon';

const ExternalIcon = () => <InlineIcon name="external" />;

const projectVisuals = {
  'sepia-client': {
    src: '/images/optimized/projects/sepia/sepia-overview.jpg',
    alt: 'SEPIA desktop creator interface, rack, and hardware module arranged as one centered visual group',
    label: 'SEPIA software-to-hardware platform',
  },
  qpro: {
    src: '/images/optimized/projects/QPRO/qpro-overview.jpg',
    alt: 'QPRO queue management overview with a large teller dashboard on the left and an overlapping mobile service-lane flow on the right',
    label: 'QPRO queue management system',
  },
  fast: {
    src: '/images/optimized/projects/FAST/fast-overview.jpg',
    alt: 'FAST document intelligence overview with a large desktop OCR search interface and an overlapping mobile document vault',
    label: 'FAST document intelligence platform',
  },
  availbld: {
    src: '/images/optimized/projects/availbld/availbld-overview.jpg',
    alt: 'Four Availbld mobile screens showing live event feeds, instant groups, event chat, and event discovery on a dark editorial background',
    label: 'Availbld event coordination',
  },
  metacare: {
    src: '/images/optimized/projects/Metacare/metacare-overview.jpg',
    alt: 'Four MetaCare mobile screens showing the health marketplace home, member benefits, product discovery, and order summary',
    label: 'MetaCare health and wellness marketplace',
  },
  'awh-app': {
    src: '/images/optimized/projects/AWH/awh.jpg',
    alt: 'AWH warehouse operations dashboard showing inventory, dispatch, scanner, field operator, zone density, and system synchronization panels',
    label: 'AWH warehouse operations platform',
  },
};

export default function Home() {
  const capabilities = repository.listCapabilities();
  const projects = repository.listProjects().slice(0, 4);
  const stories = repository.listStories();
  const featuredStories = [
    'device-lifecycle-management',
    'configuration-recovery',
    'hardware-communication-platform',
  ]
    .map((slug) => stories.find((story) => story.slug === slug))
    .filter((story): story is (typeof stories)[number] => Boolean(story));
  const primaryProject = projects[0];

  return (
    <>
      <section className="home-hero" aria-labelledby="hero-heading">
        <div className="hero-grid mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 pb-24 pt-12 lg:grid-cols-12 md:pb-28 md:pt-16">
          <div className="lg:col-span-7">
            <p className="mb-5 font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">
              Full-Stack Software Engineer · Frontend to native systems
            </p>
            <h1
              id="hero-heading"
              className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-.04em] md:text-6xl"
            >
              Building dependable software across web, mobile, backend, and
              connected systems.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              I work across React, TypeScript, Node.js, NestJS, Flutter, Dart,
              APIs, databases, and native protocol boundaries. AI-assisted
              investigation helps me move quickly through unfamiliar codebases,
              while clear architecture, state ownership, and testing keep the
              delivery dependable.
            </p>
            <div className="hero-actions mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#projects"
                className="hero-primary-cta inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--on-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                View selected projects <InlineIcon name="external" />
              </Link>
              <Link
                href="/profile"
                className="hero-secondary-link inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--line)] px-5 py-3 text-sm font-medium text-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                Open my profile <InlineIcon name="external" />
              </Link>
            </div>
          </div>
          <figure className="hero-boundary-card rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 lg:col-span-5 lg:mt-8 md:p-7">
            <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">
              / full-stack boundary
            </p>
            <p className="mt-2 text-lg font-medium">
              Make every handoff visible.
            </p>
            <ol
              className="diagram-flow mt-6"
              aria-label="A conceptual path from user intent through frontend and backend systems to connected hardware"
            >
              <li className="diagram-step">
                <span className="diagram-step-index">01</span>
                <span className="diagram-node">User intent + frontend</span>
              </li>
              <li className="diagram-step">
                <span className="diagram-step-index">02</span>
                <span className="diagram-node">
                  Backend services + durable data
                </span>
              </li>
              <li className="diagram-step">
                <span className="diagram-step-index">03</span>
                <span className="diagram-node">
                  Typed API + native boundary
                </span>
              </li>
              <li className="diagram-step">
                <span className="diagram-step-index">04</span>
                <span className="diagram-node">Connected device behavior</span>
              </li>
            </ol>
            <figcaption className="hero-boundary-caption mt-5 pt-4 text-sm leading-6 text-[var(--muted)]">
              Clear ownership helps every layer stay understandable as systems
              change.
            </figcaption>
          </figure>
        </div>
      </section>
      <section
        id="projects"
        className="home-section home-section--projects mx-auto max-w-6xl px-5 py-20"
        aria-labelledby="projects-heading"
      >
        <SectionHeading
          kicker="01 / selected projects"
          title="Products shaped by real system constraints"
          id="projects-heading"
        >
          A focused look at the product context and engineering boundaries
          behind the work.
        </SectionHeading>
        {primaryProject ? (
          <ProjectCarousel projects={projects} visuals={projectVisuals} />
        ) : (
          <p className="border-y border-[var(--line)] py-6 text-[var(--muted)]">
            No published projects are available yet.
          </p>
        )}
      </section>
      <section
        id="workflow"
        className="home-section"
        aria-labelledby="workflow-heading"
      >
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading
            kicker="02 / workflow"
            title="Workflow &amp; AI-Accelerated Engineering"
            id="workflow-heading"
          >
            Leveraging modern AI tooling to compress context-switching time,
            rapidly onboard to new stacks, and accelerate delivery while
            maintaining strict architectural rigor.
          </SectionHeading>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <article className="portfolio-card rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_18px_45px_-28px_rgba(56,189,248,0.7)] md:p-7">
              <h3 className="text-xl font-semibold tracking-tight">
                <InlineIcon name="bolt" className="mr-2 text-[var(--accent)]" />
                Rapid Context Retrieval &amp; Onboarding
              </h3>
              <p className="mt-4 leading-7 text-[var(--muted)]">
                Utilizing AI tools to parse unfamiliar codebases, trace
                dependencies, and master new domain paradigms in hours instead
                of weeks.
              </p>
            </article>
            <article className="portfolio-card rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_18px_45px_-28px_rgba(56,189,248,0.7)] md:p-7">
              <h3 className="text-xl font-semibold tracking-tight">
                <InlineIcon
                  name="tools"
                  className="mr-2 text-[var(--accent)]"
                />
                Multi-Stack Implementation
              </h3>
              <p className="mt-4 leading-7 text-[var(--muted)]">
                Transferring context across unfamiliar stacks with AI as an
                inline copilot, while keeping architecture and validation
                grounded in the system&apos;s real boundaries.
              </p>
            </article>
            <article className="portfolio-card rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_18px_45px_-28px_rgba(56,189,248,0.7)] md:p-7">
              <h3 className="text-xl font-semibold tracking-tight">
                <InlineIcon
                  name="shield"
                  className="mr-2 text-[var(--accent)]"
                />
                Human-Led Engineering &amp; Testing
              </h3>
              <p className="mt-4 leading-7 text-[var(--muted)]">
                Filtering generated code through strict state management,
                protocol boundary verification, and automated test coverage.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section
        id="about"
        className="home-section"
        aria-labelledby="about-heading"
      >
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <figure
            className="profile-portrait mx-0 max-w-sm"
            aria-label="Portrait of Felix Edrian Ybañez"
          >
            <MediaImage
              src="/images/felix_edrian_ybanez.jpg"
              alt="Felix Edrian Ybañez"
              fill
              sizes="(max-width: 64rem) 100vw, 28rem"
            />
          </figure>
          <div>
            <SectionHeading
              id="about-heading"
              kicker="03 / about me"
              title="Calm, explicit, and collaborative"
            >
              I make complex software easier to change, especially when state,
              hardware, and people all need to stay aligned.
            </SectionHeading>
            <ol
              className="about-lens-list mt-7 grid gap-3 sm:grid-cols-2"
              aria-label="Engineering principles"
            >
              <li className="about-lens-card rounded-xl border border-[var(--line)] bg-[var(--bg)] p-4 text-sm">
                <strong className="block text-[var(--accent)]">
                  01 / Make ownership explicit
                </strong>
                <span className="mt-2 block text-[var(--muted)]">
                  Every important state transition should have a clear owner,
                  lifecycle, and cleanup path.
                </span>
              </li>
              <li className="about-lens-card rounded-xl border border-[var(--line)] bg-[var(--bg)] p-4 text-sm">
                <strong className="block text-[var(--accent)]">
                  02 / Preserve user intent
                </strong>
                <span className="mt-2 block text-[var(--muted)]">
                  Durable decisions should remain distinct from transient
                  runtime state and external feedback.
                </span>
              </li>
              <li className="about-lens-card rounded-xl border border-[var(--line)] bg-[var(--bg)] p-4 text-sm">
                <strong className="block text-[var(--accent)]">
                  03 / Design for the unhappy path
                </strong>
                <span className="mt-2 block text-[var(--muted)]">
                  Reconnects, partial failures, and asynchronous events are part
                  of the product—not edge cases.
                </span>
              </li>
              <li className="about-lens-card rounded-xl border border-[var(--line)] bg-[var(--bg)] p-4 text-sm">
                <strong className="block text-[var(--accent)]">
                  04 / Keep complexity changeable
                </strong>
                <span className="mt-2 block text-[var(--muted)]">
                  Typed seams, layered tests, and understandable boundaries make
                  difficult systems safer to evolve.
                </span>
              </li>
            </ol>
            <Link
              href="/profile"
              className="about-profile-link mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Read the full engineering profile{' '}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <section
        id="testimonials"
        className="home-section mx-auto max-w-6xl px-5 py-20"
        aria-labelledby="testimonials-heading"
      >
        <SectionHeading
          kicker="04 / recommendations"
          title="Trusted in the difficult parts of delivery"
          id="testimonials-heading"
        >
          A small proof strip from published feedback by people who worked with
          Felix.
        </SectionHeading>
        <TeammateFeedback testimonials={testimonials.slice(0, 4)} />
        <Link
          href="/testimonials"
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          Read all testimonials <ExternalIcon />
        </Link>
      </section>
      <section
        className="home-section border-t border-[var(--line)] mx-auto max-w-6xl px-5 py-20"
        aria-labelledby="evidence-heading"
      >
        <SectionHeading
          kicker="05 / evidence map"
          title="The engineering shape of the work"
          id="evidence-heading"
        >
          Start with the project evidence, then follow the capabilities and
          questions behind it.
        </SectionHeading>
        <div className="grid min-w-0 gap-12 lg:grid-cols-2">
          <div
            id="capabilities"
            className="min-w-0"
            aria-labelledby="capabilities-heading"
          >
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h3
                id="capabilities-heading"
                className="text-xl font-semibold tracking-tight"
              >
                Capabilities
              </h3>
              <Link
                href="/capabilities"
                className="shrink-0 text-sm font-semibold text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                View all <span aria-hidden="true">↗</span>
              </Link>
            </div>
            {capabilities.length > 0 ? (
              <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {capabilities.slice(0, 4).map((capability) => (
                  <li key={capability.slug}>
                    <Link
                      href={`/capabilities/${capability.slug}`}
                      className="group flex min-h-20 min-w-0 items-center justify-between gap-5 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-[var(--muted)]">
                          {capability.category}
                        </span>
                        <span className="mt-1 block break-words text-lg font-semibold tracking-tight transition-colors group-hover:text-[var(--accent)]">
                          {capability.metadata.homepageTitle ??
                            capability.title}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-[var(--accent)] transition-transform group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border-y border-[var(--line)] py-6 text-[var(--muted)]">
                No published capabilities are available yet.
              </p>
            )}
          </div>
          <div
            id="stories"
            className="min-w-0"
            aria-labelledby="stories-heading"
          >
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h3
                id="stories-heading"
                className="text-xl font-semibold tracking-tight"
              >
                Engineering stories
              </h3>
              <Link
                href="/engineering-stories"
                className="shrink-0 text-sm font-semibold text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                Explore all <span aria-hidden="true">↗</span>
              </Link>
            </div>
            {featuredStories.length > 0 ? (
              <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {featuredStories.map((story) => (
                  <li key={story.slug}>
                    <Link
                      href={`/engineering-stories/${story.slug}`}
                      className="group flex min-h-20 min-w-0 items-center justify-between gap-5 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-[var(--muted)]">
                          Architecture · reliability · recovery
                        </span>
                        <span className="mt-1 block break-words text-lg font-semibold tracking-tight transition-colors group-hover:text-[var(--accent)]">
                          {story.metadata.homepageTitle ?? story.title}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-[var(--accent)] transition-transform group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border-y border-[var(--line)] py-6 text-[var(--muted)]">
                No published engineering stories are available yet.
              </p>
            )}
          </div>
        </div>
      </section>
      <section
        className="mx-auto max-w-6xl px-5 pb-24"
        aria-labelledby="hire-heading"
      >
        <div className="home-hire-card rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
            06 / hiring
          </p>
          <h2
            id="hire-heading"
            className="mt-5 max-w-2xl text-3xl font-semibold leading-tight md:text-4xl"
          >
            Hiring for senior Flutter, cross-platform, or systems-oriented
            engineering work?
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            Let’s discuss the role, the product, and the engineering problems
            the team is solving.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--on-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            Discuss a role <InlineIcon name="external" />
          </Link>
        </div>
      </section>
    </>
  );
}
