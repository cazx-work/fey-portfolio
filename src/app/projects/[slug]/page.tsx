import { notFound } from 'next/navigation';
import { getProjectPresentation } from '@/lib/content';
import { repository } from '@/lib/portfolio-repository';
import { Card } from '@/components/card';
import { BackButton } from '@/components/back-button';
import { MarkdownContent } from '@/components/portfolio/MarkdownContent';
import { TechnicalDeepDive } from '@/components/portfolio/technical-deep-dive';
import { LocalVideo } from '@/components/portfolio/media-placeholder';
import { ProjectSignalFlow } from '@/components/project-signal-flow';
import { SepiaMediaStory } from '@/components/portfolio/sepia-media-story';
import { SupportingProjectMedia } from '@/components/portfolio/supporting-project-media';
import { GithubContributionHeatmap } from '@/components/portfolio/github-contribution-heatmap';
import { ProjectTension } from '@/components/project-tension';
import { MediaImage } from '@/components/portfolio/media-image';
import { InlineIcon } from '@/components/inline-icon';
import type { Metadata } from 'next';
import Link from 'next/link';
export function generateStaticParams() {
  return repository.listProjects().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const portfolioItem = repository.getProject(slug);
  return portfolioItem?.dossier
    ? {
        title: portfolioItem.title,
        description: portfolioItem.dossier.executive.overview,
      }
    : {};
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = repository.getProject(slug);
  const p = project?.dossier;
  const backHref = '/projects';
  const backLabel = 'Back to projects';
  if (!project || !p) notFound();
  const presentation = getProjectPresentation(slug);
  const related = repository.relatedContent(project, 3);
  const relatedItems =
    related.length > 0
      ? related
      : repository
          .listProjects()
          .filter((candidate) => candidate.slug !== project.slug)
          .slice(0, 3);
  const showingRelatedContent = related.length > 0;
  return (
    <div className="project-case-study pb-10 sm:pb-16">
      <section className="project-hero overflow-hidden border-t border-[var(--line)]">
        <div className="project-hero__nav">
          <BackButton href={backHref} label={backLabel} />
        </div>
        <div className="project-hero__signal" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="project-hero__content relative z-10 grid gap-10 px-6 sm:px-10 lg:grid-cols-[1.22fr_.78fr] lg:gap-14 lg:px-14 lg:items-center">
          <div className="project-hero__intro">
            <p className="project-hero__eyebrow case-study-label">
              <span aria-hidden="true">◆</span>
              {presentation.eyebrow}
            </p>
            <h1 className="project-hero__title mt-5 max-w-3xl text-5xl font-semibold tracking-tight sm:text-7xl">
              {p.title}
            </h1>
            <p className="project-hero__overview mt-5 max-w-4xl text-xl leading-9 text-[var(--muted)]">
              {presentation.heroOverview ?? p.executive.overview}
            </p>
            {project.evidence && (
              <dl className="mt-7 grid gap-3 border-y border-[var(--line)] py-4 text-sm">
                {Object.entries(project.evidence).map(([label, value]) => (
                  <div
                    className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4"
                    key={label}
                  >
                    <dt className="font-mono text-xs uppercase tracking-[.16em] text-[var(--accent)]">
                      {label}
                    </dt>
                    <dd className="leading-6 text-[var(--muted)]">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <div className="project-hero__claim mt-7 max-w-2xl">
              <span className="project-hero__claim-rule" aria-hidden="true" />
              <p className="text-sm font-medium uppercase tracking-[.16em] text-[var(--accent)]">
                {presentation.heroClaim}
              </p>
            </div>
          </div>
          <div className="project-hero__aside project-hero__aside--visual lg:col-start-2 lg:flex lg:flex-col">
            {slug === 'sepia-client' ? (
              <div className="project-hero__visual project-hero__visual--mobile">
                <MediaImage
                  src="/images/optimized/projects/sepia/mobile-photo-1.jpg"
                  alt="SEPIA mobile interface showing signal paths, modules, and bottom navigation."
                  width={800}
                  height={1624}
                  priority
                  sizes="(max-width: 64rem) 100vw, 42vw"
                  className="project-hero__visual-image"
                />
              </div>
            ) : slug === 'availbld' ? (
              <div className="project-hero__visual project-hero__visual--availbld">
                <MediaImage
                  src="/images/optimized/projects/availbld/availbld-1.jpg"
                  alt="Availbld live event feed showing active event conversations and instant join actions."
                  width={552}
                  height={1236}
                  priority
                  sizes="(max-width: 64rem) 100vw, 42vw"
                  className="project-hero__visual-image"
                />
              </div>
            ) : slug === 'metacare' ? (
              <div className="project-hero__visual project-hero__visual--mobile">
                <MediaImage
                  src="/images/optimized/projects/Metacare/metacare-1.jpg"
                  alt="MetaCare home dashboard interface."
                  width={454}
                  height={978}
                  priority
                  sizes="(max-width: 64rem) 100vw, 42vw"
                  className="project-hero__visual-image"
                />
              </div>
            ) : slug === 'fast' ? (
              <div className="project-hero__visual project-hero__visual--mobile">
                <MediaImage
                  src="/images/optimized/projects/FAST/fast-mobile.jpg"
                  alt="FAST document archive mobile interface."
                  width={458}
                  height={1028}
                  priority
                  sizes="(max-width: 64rem) 100vw, 42vw"
                  className="project-hero__visual-image"
                />
              </div>
            ) : slug === 'qpro' ? (
              <div className="project-hero__visual project-hero__visual--mobile">
                <MediaImage
                  src="/images/optimized/projects/QPRO/qpro-mobile.jpg"
                  alt="QPRO queue management mobile interface."
                  width={594}
                  height={1344}
                  priority
                  sizes="(max-width: 64rem) 100vw, 42vw"
                  className="project-hero__visual-image"
                />
              </div>
            ) : (
              <div className="project-brief project-brief--tension rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] p-4 backdrop-blur sm:p-6">
                <p className="project-brief__label case-study-label">
                  {presentation.tension.label}
                </p>
                <p className="project-brief__statement mt-2 text-base leading-7">
                  {presentation.tension.statement}
                </p>
                <ProjectTension stages={presentation.tension.stages} />
              </div>
            )}
          </div>
        </div>
      </section>
      {presentation.video && (
        <div className="project-video-transition">
          <LocalVideo {...presentation.video} />
        </div>
      )}
      {presentation.demo && (
        <section
          className="project-demo-callout"
          aria-labelledby="demo-heading"
        >
          <div>
            <p className="case-study-label">Interactive demo</p>
            <h2 id="demo-heading">{presentation.demo.title}</h2>
            <p>{presentation.demo.description}</p>
          </div>
          <a
            href={presentation.demo.href}
            target="_blank"
            rel="noreferrer"
            className="project-demo-callout__link"
          >
            Open the SEPIA demo <InlineIcon name="external" />
          </a>
        </section>
      )}
      <section
        className="case-study-section project-profile-section mx-4 mt-16 rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] px-6 py-6 backdrop-blur sm:mx-0 sm:p-7"
        aria-labelledby="profile-heading"
      >
        <p id="profile-heading" className="case-study-label">
          System profile
        </p>
        <div className="project-profile__grid mt-4 grid gap-x-6 gap-y-5 border-t border-[var(--line)] pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {presentation.profile.map((item, index) => (
            <div className="project-profile__item" key={item.label}>
              <span className="project-profile__number">0{index + 1}</span>
              <p className="case-study-label">{item.label}</p>
              <p className="case-study-value">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
      {slug === 'sepia-client' && (
        <section
          className="case-study-section sepia-hardware-section mt-16"
          aria-labelledby="hardware-heading"
        >
          <div className="sepia-hardware-section__copy">
            <p className="case-study-label">Hardware context</p>
            <h2 id="hardware-heading">
              The module is physical. The control surface is not.
            </h2>
            <p className="case-study-lead">
              SEPIA keeps the analog processing in compact hardware modules
              while the application manages control, routing, recall, and live
              state around it.
            </p>
          </div>
          <div className="sepia-hardware-section__media">
            <figure className="sepia-hardware-section__figure">
              <MediaImage
                src="/images/optimized/projects/sepia/sepia-rack.png"
                alt="SEPIA rack filled with digitally controlled analog audio modules."
                width={2048}
                height={1798}
                loading="lazy"
                sizes="(max-width: 64rem) 50vw, 25vw"
              />
              <figcaption>
                The rack: a physical arrangement of modules coordinated by the
                control surface.
              </figcaption>
            </figure>
            <figure className="sepia-hardware-section__figure">
              <MediaImage
                src="/images/optimized/projects/sepia/sepia-module.png"
                alt="Close view of a SEPIA analog audio module with its enclosure opened to reveal the circuitry."
                width={2042}
                height={2048}
                loading="lazy"
                sizes="(max-width: 64rem) 50vw, 25vw"
              />
              <figcaption>
                One physical module: analog circuitry remains close to the
                signal while software coordinates its behavior.
              </figcaption>
            </figure>
          </div>
        </section>
      )}
      {slug === 'availbld' && (
        <section
          className="case-study-section project-tension-section mx-4 mt-6 rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] px-6 py-6 backdrop-blur sm:mx-0 sm:p-7"
          aria-labelledby="tension-heading"
        >
          <p id="tension-heading" className="case-study-label">
            {presentation.tension.label}
          </p>
          <p className="project-brief__statement mt-2 text-base leading-7">
            {presentation.tension.statement}
          </p>
          <ProjectTension stages={presentation.tension.stages} />
        </section>
      )}
      {slug === 'sepia-client' ? (
        <SepiaMediaStory />
      ) : (
        <SupportingProjectMedia slug={slug} />
      )}
      <section
        className="case-study-section mt-16"
        aria-labelledby="contribution-heading"
      >
        <p className="case-study-label">Engineering contribution</p>
        <h2 id="contribution-heading">{presentation.contribution.title}</h2>
        <p className="case-study-lead">
          {presentation.contribution.description}
        </p>
        <div className="contribution-grid">
          {presentation.contribution.themes.map((item, index) => (
            <article key={item.title} className="evidence-card">
              <span className="evidence-card__number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        className="case-study-section mt-16"
        aria-labelledby="system-heading"
      >
        <p className="case-study-label">Follow one signal</p>
        <h2 id="system-heading">
          {slug === 'sepia-client'
            ? 'From operator intent to analog hardware'
            : slug === 'fast'
              ? 'From scanned source to governed retrieval'
              : slug === 'qpro'
                ? 'From customer intent to branch guidance'
                : 'From user intent to durable system state'}
        </h2>
        <p className="case-study-lead">
          {slug === 'sepia-client'
            ? 'The control path keeps operator intent legible as it moves through software and into physical circuitry. Each boundary has one job: represent intent, validate change, or perform the signal work.'
            : slug === 'fast'
              ? 'The retrieval path keeps a document match grounded in the source record while OCR, indexing, access checks, and preview behavior remain explicit.'
              : slug === 'qpro'
                ? 'The queue path keeps a customer request understandable as it becomes a ticket transition, teller action, and public counter call.'
                : 'Each boundary keeps user intent, domain rules, external behavior, and recovery context understandable.'}
        </p>
        <ProjectSignalFlow stages={presentation.signalFlow} />
      </section>
      {presentation.recovery && (
        <section
          className="case-study-section mt-16"
          aria-labelledby="recovery-heading"
        >
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="case-study-label">{presentation.recovery.label}</p>
              <h2 id="recovery-heading">{presentation.recovery.title}</h2>
            </div>
            <div className="recovery-story">
              {presentation.recovery.steps.map((step) => (
                <div className="recovery-story__item" key={step.label}>
                  <div className="recovery-story__label">
                    <span
                      className={`recovery-story__dot ${step.tone === 'warning' ? 'recovery-story__dot--warn' : step.tone === 'success' ? 'recovery-story__dot--ok' : ''}`}
                    />
                    {step.label}
                  </div>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {slug === 'sepia-client' && <GithubContributionHeatmap />}
      <TechnicalDeepDive
        className="mt-16 mx-auto max-w-[68rem]"
        blocks={p.technical}
      />
      <section className="related-stories-section mt-20">
        <div className="related-stories__header flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="related-stories__index">04</span>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
                {showingRelatedContent ? 'Related work' : 'Other projects'}
              </p>
            </div>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Keep exploring the system
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[var(--muted)]">
            {showingRelatedContent
              ? 'See this work from a related capability or engineering-story perspective.'
              : 'Explore other projects when this case study has no related stories or capabilities yet.'}
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {relatedItems.map((s, index) => (
            <Card
              key={s.slug}
              href={
                s.metadata.type === 'story'
                  ? `/engineering-stories/${s.slug}`
                  : s.metadata.type === 'capability'
                    ? `/capabilities/${s.slug}`
                    : `/projects/${s.slug}`
              }
              className="related-story-card"
              eyebrow={`${String(index + 1).padStart(2, '0')} / ${s.category}`}
              title={s.title}
              summary={s.summary}
              tags={s.tags}
            />
          ))}
        </div>
        <div className="related-stories__footer mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="related-stories__prompt">
            Choose a lens to continue exploring.
          </p>
          <nav
            className="flex flex-wrap gap-3.5"
            aria-label="Explore portfolio sections"
          >
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--bg)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Explore projects <InlineIcon name="external" className="ml-2" />
            </Link>
            <Link
              href="/capabilities"
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Explore capabilities{' '}
              <InlineIcon name="external" className="ml-2" />
            </Link>
            <Link
              href="/engineering-stories"
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Explore stories <InlineIcon name="external" className="ml-2" />
            </Link>
          </nav>
        </div>
      </section>
    </div>
  );
}
