import Link from 'next/link';
import { InlineIcon } from '@/components/inline-icon';
import { MediaImage } from '@/components/portfolio/media-image';
import { TeammateFeedback } from '@/components/teammate-feedback';
import { BeyondCodeCarousel } from '@/components/beyond-code-carousel';
import { GithubContributionHeatmap } from '@/components/portfolio/github-contribution-heatmap';
import { testimonials } from '@/data/testimonials';
import { repository } from '@/lib/portfolio-repository';

export const metadata = {
  title: 'Profile',
  description:
    'A concise profile of Felix Edrian Ybañez, a Full-Stack Software Engineer working across frontend, backend, protocol, native, and hardware boundaries.',
};

const workingAreas = [
  {
    number: '01',
    label: 'Frontend and application architecture',
    title: 'Make interfaces carry real complexity',
    summary:
      'React, Next.js, Tailwind CSS, Flutter, and Dart help me shape clear interfaces around explicit state ownership and feature-first boundaries.',
    tags: ['React', 'TypeScript', 'Next.js', 'Flutter'],
  },
  {
    number: '02',
    label: 'Backend, APIs, and data',
    title: 'Make services dependable behind the interface',
    summary:
      'Node.js, NestJS, REST, GraphQL, Firebase, PostgreSQL, SQLite, Firestore, and Prisma connect product workflows to durable data and reliable services.',
    tags: ['Node.js', 'NestJS', 'GraphQL', 'PostgreSQL'],
  },
  {
    number: '03',
    label: 'Native and hardware boundaries',
    title: 'Make specialized systems approachable',
    summary:
      'Dart FFI, Dante Audio Networking, AES70/OCA, device capabilities, discovery, and recovery-aware workflows keep hardware complexity behind application-facing boundaries.',
    tags: ['Dart FFI', 'Dante', 'AES70 / OCA'],
  },
  {
    number: '04',
    label: 'AI-assisted quality and delivery',
    title: 'Shorten the path into unfamiliar systems',
    summary:
      'AI-assisted codebase exploration reduces switching time, while BLoC, Provider, Riverpod, layered tests, CI/CD, and deterministic seams keep delivery human-led.',
    tags: ['BLoC', 'Riverpod', 'Testing', 'CI/CD'],
  },
];

const principles = [
  [
    '01',
    'Make ownership explicit',
    'Every important state transition should have a clear owner, lifecycle, and cleanup path.',
  ],
  [
    '02',
    'Preserve user intent',
    'Durable decisions should remain distinct from transient runtime state and external feedback.',
  ],
  [
    '03',
    'Design for the unhappy path',
    'Reconnects, partial failures, and asynchronous events are part of the product—not edge cases.',
  ],
  [
    '04',
    'Keep complexity changeable',
    'Typed seams, layered tests, and understandable boundaries make difficult systems safer to evolve.',
  ],
];

const toolkit = [
  {
    label: 'Languages',
    items: ['Dart', 'JavaScript', 'TypeScript', 'C++', 'C#', 'HTML', 'CSS'],
  },
  {
    label: 'Web and application frameworks',
    items: ['Flutter', 'React', 'Node.js', 'NestJS', 'Next.js', 'Tailwind CSS'],
  },
  {
    label: 'Native integration',
    items: ['Dart FFI', 'Dante Audio Networking', 'AES70 / OCA Protocol'],
  },
  {
    label: 'Backend and APIs',
    items: ['REST APIs', 'GraphQL', 'Firebase'],
  },
  {
    label: 'State management',
    items: ['BLoC', 'Provider', 'Riverpod'],
  },
  {
    label: 'Databases and ORMs',
    items: ['SQLite', 'PostgreSQL', 'Firestore', 'Prisma'],
  },
  {
    label: 'Development and DevOps',
    items: ['Git', 'GitHub', 'Docker', 'GitHub Actions', 'CI/CD', 'VS Code'],
  },
  {
    label: 'Platforms',
    items: ['Android', 'iOS', 'Web', 'Windows', 'macOS', 'Linux'],
  },
];

export default function Profile() {
  const capabilities = repository.listCapabilities().slice(0, 4);

  return (
    <div className="profile-page mx-auto max-w-6xl px-5 pb-24 md:px-8">
      <section
        className="profile-hero-shell w-full"
        aria-labelledby="profile-heading"
      >
        <div className="profile-hero">
          <div className="profile-hero__signal" aria-hidden="true" />
          <div className="profile-hero__intro">
            <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
              Full-Stack Software Engineer / frontend to systems
            </p>
            <h1
              id="profile-heading"
              className="profile-hero__name mt-5 text-5xl font-semibold tracking-[-.05em] md:text-7xl"
            >
              <span>Felix Edrian</span>
              <br />
              <span>Ybañez</span>
            </h1>
            <p className="profile-hero__lede">
              I build dependable frontend and backend software across web,
              mobile, desktop, and connected systems. My toolkit spans React,
              TypeScript, Node.js, NestJS, Flutter, Dart, typed APIs, and native
              protocol boundaries, with AI-assisted investigation accelerating
              delivery without replacing engineering judgment.
            </p>
            <div className="profile-hero__actions" aria-label="Profile actions">
              <Link
                href="/resume"
                className="profile-download profile-download--primary"
              >
                View résumé <InlineIcon name="external" />
              </Link>
            </div>
          </div>
          <figure className="profile-portrait">
            <div className="profile-portrait__fallback" aria-hidden="true">
              Felix Edrian Ybañez / profile portrait
            </div>
            <MediaImage
              src="/images/felix_edrian_ybanez.jpg"
              alt="Felix Edrian Ybañez seated at a café table, wearing a navy shirt and looking toward the camera"
              fill
              priority
              sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 40vw, 25rem"
            />
          </figure>
          <aside className="profile-signal" aria-label="Professional profile">
            <div className="profile-signal__content">
              <div className="profile-signal__details">
                <p className="font-mono text-xs uppercase tracking-[.16em] text-[var(--accent)]">
                  Hiring snapshot
                </p>
                <div className="profile-signal__role">
                  Full-stack software engineering
                </div>
                <div className="profile-tags">
                  {[
                    'React + TypeScript',
                    'Node.js + NestJS',
                    'Flutter + Dart',
                    'Native + protocol systems',
                  ].map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="working-areas"
        className="profile-section"
        aria-labelledby="areas-heading"
      >
        <div className="profile-section__intro">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">
            01 / working areas
          </p>
          <h2 id="areas-heading">Where the engineering focus is strongest</h2>
          <p>
            The public work points to a consistent practice: turn complex
            systems into software people can operate with confidence.
          </p>
        </div>
        <div className="profile-arc">
          {workingAreas.map((phase) => (
            <article className="profile-arc__item" key={phase.number}>
              <div className="profile-arc__marker">
                <span>{phase.number}</span>
              </div>
              <div>
                <p className="profile-card-label">{phase.label}</p>
                <h3>{phase.title}</h3>
                <p>{phase.summary}</p>
                <div className="profile-tags">
                  {phase.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="principles"
        className="profile-section profile-section--band"
        aria-labelledby="principles-heading"
      >
        <div className="profile-section__intro">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">
            02 / working principles
          </p>
          <h2 id="principles-heading">What stays consistent across the work</h2>
        </div>
        <div className="profile-principles">
          {principles.map(([number, title, summary]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="toolkit"
        className="profile-section profile-toolkit"
        aria-labelledby="toolkit-heading"
      >
        <div className="profile-section__intro profile-section__intro--wide">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">
            03 / full-stack toolkit
          </p>
          <h2 id="toolkit-heading">
            Frontend, backend, and the boundaries between them
          </h2>
          <p>
            The stack is broad by design: web interfaces, services, data, native
            integration, and delivery tooling all need to work together as one
            dependable system.
          </p>
        </div>
        <div className="profile-toolkit__grid">
          {toolkit.map((group) => (
            <article className="profile-toolkit__group" key={group.label}>
              <h3>{group.label}</h3>
              <p>{group.items.join(' · ')}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="profile-section profile-capabilities"
        aria-labelledby="capabilities-heading"
      >
        <div className="profile-section__intro">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">
            04 / public evidence
          </p>
          <h2 id="capabilities-heading">Follow the work, not just the title</h2>
          <p>
            These published capability pages are the quickest route into the
            engineering decisions behind the profile.
          </p>
        </div>
        <div className="profile-capabilities__list">
          {capabilities.map((capability, index) => (
            <Link
              href={`/capabilities/${capability.slug}`}
              key={capability.slug}
              className="profile-capability-link"
            >
              <span className="font-mono text-xs text-[var(--accent)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>
                <strong>{capability.title}</strong>
                <small>{capability.summary}</small>
              </span>
              <InlineIcon name="external" />
            </Link>
          ))}
        </div>
      </section>

      <GithubContributionHeatmap sectionNumber="06" />

      <section
        id="collaboration"
        className="profile-section profile-collaboration"
        aria-labelledby="collaboration-heading"
      >
        <div className="profile-section__intro profile-section__intro--wide">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">
            07 / collaboration
          </p>
          <h2 id="collaboration-heading">
            The best systems are built with other people
          </h2>
          <p>
            Technical depth matters most when it gives a team a clearer path
            forward. Here is a small preview of how collaborators describe that
            work.
          </p>
        </div>
        <TeammateFeedback testimonials={testimonials.slice(2, 4)} />
        <Link href="/testimonials" className="profile-inline-link">
          Read collaborator testimonials <InlineIcon name="external" />
        </Link>
      </section>

      <section
        id="resume"
        className="profile-resume"
        aria-labelledby="resume-heading"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">
            08 / résumé
          </p>
          <h2 id="resume-heading">Read the concise version</h2>
          <p>
            Open the dedicated résumé page for a compact view of the experience
            behind this portfolio.
          </p>
        </div>
        <Link
          href="/resume"
          className="profile-download profile-download--large"
        >
          View résumé <InlineIcon name="external" />
        </Link>
      </section>

      <section
        className="profile-section beyond-code-section"
        aria-labelledby="beyond-code-heading"
      >
        <div className="profile-section__intro profile-section__intro--wide">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">
            09 / a small visual journal
          </p>
          <h2 id="beyond-code-heading">Notes from outside the desk</h2>
          <p>
            Tap through a few moments that give the rest of the story its shape.
            Each image is a personal snapshot, not a work sample.
          </p>
        </div>
        <BeyondCodeCarousel />
      </section>
    </div>
  );
}
