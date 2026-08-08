import { notFound } from 'next/navigation';
import { getProjectPresentation } from '@/lib/content';
import { repository } from '@/lib/portfolio-repository';
import { Card } from '@/components/card';
import { BackButton } from '@/components/back-button';
import { MarkdownContent } from '@/components/portfolio/MarkdownContent';
import { TechnicalDeepDive } from '@/components/portfolio/technical-deep-dive';
import { YouTubeEmbed } from '@/components/portfolio/media-placeholder';
import { SepiaMediaStory } from '@/components/portfolio/sepia-media-story';
import { GithubContributionHeatmap } from '@/components/portfolio/github-contribution-heatmap';
import type { Metadata } from 'next';
import Link from 'next/link';
export function generateStaticParams() {
  return repository.listProjects().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const portfolioItem = repository.getProject(slug);
  return portfolioItem?.dossier ? { title: portfolioItem.title, description: portfolioItem.dossier.executive.overview } : {};
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
  return (
    <div className="project-case-study pb-10 sm:pb-16">
      <section className="project-hero overflow-hidden border-t border-[var(--line)]">
        <div className="project-hero__nav">
          <BackButton href={backHref} label={backLabel} />
        </div>
        <div className="project-hero__signal" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
        <div className="project-hero__content relative z-10 grid gap-10 px-6 sm:px-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-16 lg:px-14 lg:items-center">
          <div className="project-hero__intro">
            <p className="project-hero__eyebrow case-study-label"><span aria-hidden="true">◆</span>{presentation.eyebrow}</p>
            <h1 className="project-hero__title mt-5 max-w-3xl text-5xl font-semibold tracking-tight sm:text-7xl">{p.title}</h1>
            <p className="project-hero__overview mt-5 max-w-3xl text-xl leading-9 text-[var(--muted)]">{presentation.heroOverview ?? p.executive.overview}</p>
            <div className="project-hero__claim mt-7 max-w-2xl">
              <span className="project-hero__claim-rule" aria-hidden="true" />
              <p className="text-sm font-medium uppercase tracking-[.16em] text-[var(--accent)]">{presentation.heroClaim}</p>
            </div>
          </div>
          <div className="project-hero__aside lg:col-start-2 lg:flex lg:flex-col">
            <div className="project-brief project-brief--tension rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] p-4 backdrop-blur sm:p-6">
              <p className="project-brief__label case-study-label">{presentation.tension.label}</p>
              <p className="project-brief__statement mt-2 text-base leading-7">{presentation.tension.statement}</p>
              <div className="project-brief__stages mt-6 grid grid-cols-3 gap-2 text-center text-xs text-[var(--muted)]">
                {presentation.tension.stages.map((stage, index) => <div key={stage.title} className={`project-brief__stage rounded-lg border p-2.5 ${stage.active ? 'project-brief__stage--active border-[var(--accent)]' : 'border-[var(--line)]'}`}><span className="project-brief__stage-number">0{index + 1}</span><strong className={`block ${stage.active ? 'text-[var(--accent)]' : 'text-[var(--ink)]'}`}>{stage.title}</strong><span>{stage.detail}</span></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      {presentation.video && <div className="project-video-transition"><YouTubeEmbed {...presentation.video} /></div>}
      {presentation.demo && (
        <section className="project-demo-callout" aria-labelledby="demo-heading">
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
            Open the SEPIA demo <span aria-hidden="true">↗</span>
          </a>
        </section>
      )}
      <section className="case-study-section project-profile-section mx-4 mt-16 rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] px-6 py-6 backdrop-blur sm:mx-0 sm:p-7" aria-labelledby="profile-heading">
        <p id="profile-heading" className="case-study-label">System profile</p>
        <div className="project-profile__grid mt-4 grid gap-x-6 gap-y-5 border-t border-[var(--line)] pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {presentation.profile.map((item, index) => <div className="project-profile__item" key={item.label}><span className="project-profile__number">0{index + 1}</span><p className="case-study-label">{item.label}</p><p className="case-study-value">{item.value}</p></div>)}
        </div>
      </section>
      <section className="case-study-section mt-16" aria-labelledby="contribution-heading">
        <p className="case-study-label">Engineering contribution</p>
        <h2 id="contribution-heading">{presentation.contribution.title}</h2>
        <p className="case-study-lead">{presentation.contribution.description}</p>
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
      <section className="case-study-section mt-16" aria-labelledby="system-heading">
        <p className="case-study-label">Follow one signal</p>
        <h2 id="system-heading">From operator intent to analog hardware</h2>
        <p className="case-study-lead">The control path keeps operator intent legible as it moves through software and into physical circuitry. Each boundary has one job: represent intent, validate change, or perform the signal work.</p>
        <div className="signal-flow" aria-label="Conceptual SEPIA control flow">
          {presentation.signalFlow.map((stage, index) => <div className="signal-flow__item" key={stage.title}>
            <div className={`signal-flow__card ${stage.active ? 'signal-flow__active' : ''}`}>
              <span className="signal-flow__number">{String(index + 1).padStart(2, '0')}</span>
              <strong>{stage.title}</strong>
              <small>{stage.detail}</small>
            </div>
            {index < presentation.signalFlow.length - 1 && <i aria-hidden="true">→</i>}
          </div>)}
        </div>
      </section>
      {presentation.recovery && <section className="case-study-section mt-16" aria-labelledby="recovery-heading">
        <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
          <div><p className="case-study-label">{presentation.recovery.label}</p><h2 id="recovery-heading">{presentation.recovery.title}</h2></div>
          <div className="recovery-story">{presentation.recovery.steps.map((step) => <div className="recovery-story__item" key={step.label}><div className="recovery-story__label"><span className={`recovery-story__dot ${step.tone === 'warning' ? 'recovery-story__dot--warn' : step.tone === 'success' ? 'recovery-story__dot--ok' : ''}`} />{step.label}</div><p>{step.description}</p></div>)}</div>
        </div>
      </section>}
      {slug === 'sepia-client' && <GithubContributionHeatmap />}
      {slug === 'sepia-client' && <SepiaMediaStory />}
      <TechnicalDeepDive
        className="mt-16 mx-auto max-w-[68rem]"
        blocks={p.technical}
        confidentiality={p.confidentiality}
      />
      <section className="related-stories-section mt-20">
        <div className="related-stories__header flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="related-stories__index">04</span>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">Related stories</p>
            </div>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Keep exploring the system
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[var(--muted)]">
            See the work from the project, capability, and engineering-story perspectives.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {repository.listStories().slice(0, 3).map((s, index) => (
            <Card
              key={s.slug}
              href={`/engineering-stories/${s.slug}`}
              className="related-story-card"
              eyebrow={`${String(index + 1).padStart(2, '0')} / SEPIA`}
              title={s.title}
              summary={s.summary}
              tags={s.tags}
            />
          ))}
        </div>
        <div className="related-stories__footer mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="related-stories__prompt">Choose a lens to continue exploring.</p>
          <nav className="flex flex-wrap gap-3.5" aria-label="Explore portfolio sections">
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--bg)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Explore projects <span aria-hidden="true" className="ml-2">↗</span>
            </Link>
            <Link
              href="/capabilities"
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Explore capabilities <span aria-hidden="true" className="ml-2">↗</span>
            </Link>
            <Link
              href="/engineering-stories"
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Explore stories <span aria-hidden="true" className="ml-2">↗</span>
            </Link>
          </nav>
        </div>
      </section>
    </div>
  );
}
