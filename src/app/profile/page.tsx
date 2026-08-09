import Link from 'next/link';
import { MediaImage } from '@/components/portfolio/media-image';
import { TeammateFeedback } from '@/components/teammate-feedback';
import { BeyondCodeCarousel } from '@/components/beyond-code-carousel';
import { GithubContributionHeatmap } from '@/components/portfolio/github-contribution-heatmap';
import { testimonials } from '@/data/testimonials';
import { repository } from '@/lib/portfolio-repository';

export const metadata = {
  title: 'Profile',
  description: 'A concise profile of Felix Edrian Ybañez, a systems-oriented Flutter and Dart engineer working across application, native, and hardware boundaries.',
};

const workingAreas = [
  {
    number: '01',
    label: 'Application architecture',
    title: 'Make complexity changeable',
    summary: 'Feature-first boundaries, explicit state ownership, and typed seams help teams evolve products without losing the shape of the system.',
    tags: ['Flutter', 'Dart', 'BLoC'],
  },
  {
    number: '02',
    label: 'Native and hardware boundaries',
    title: 'Make specialized systems approachable',
    summary: 'Protocol models, device capabilities, discovery, and recovery-aware workflows keep hardware complexity behind application-facing boundaries.',
    tags: ['AES70 / OCA', 'Device lifecycle', 'Integration'],
  },
  {
    number: '03',
    label: 'Quality and delivery',
    title: 'Design for the unhappy path',
    summary: 'Layered tests, deterministic seams, and hardware-free workflows make reconnects, partial failures, and asynchronous events easier to validate.',
    tags: ['Testing', 'BDD', 'Developer enablement'],
  },
];

const principles = [
  ['01', 'Make ownership explicit', 'Every important state transition should have a clear owner, lifecycle, and cleanup path.'],
  ['02', 'Preserve user intent', 'Durable decisions should remain distinct from transient runtime state and external feedback.'],
  ['03', 'Design for the unhappy path', 'Reconnects, partial failures, and asynchronous events are part of the product—not edge cases.'],
  ['04', 'Keep complexity changeable', 'Typed seams, layered tests, and understandable boundaries make difficult systems safer to evolve.'],
];

export default function Profile() {
  const capabilities = repository.listCapabilities().slice(0, 4);

  return (
    <div className="profile-page mx-auto max-w-6xl px-5 pb-24 md:px-8">
      <section className="profile-hero-shell w-full" aria-labelledby="profile-heading">
        <div className="profile-hero">
          <div className="profile-hero__signal" aria-hidden="true" />
          <div className="profile-hero__intro">
            <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">Profile / the engineer behind the systems</p>
            <h1 id="profile-heading" className="profile-hero__name mt-5 text-5xl font-semibold tracking-[-.05em] md:text-7xl">
              <span>Felix Edrian</span>
              <br />
              <span>Ybañez</span>
            </h1>
            <p className="profile-hero__lede">A systems-oriented engineer building Flutter and Dart products across application, native, and hardware boundaries.</p>
            <div className="profile-hero__actions" aria-label="Profile actions">
              <Link href="/resume" className="profile-download profile-download--primary">View résumé <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <figure className="profile-portrait">
            <div className="profile-portrait__fallback" aria-hidden="true">Felix Edrian Ybañez / profile portrait</div>
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
                <p className="font-mono text-xs uppercase tracking-[.16em] text-[var(--accent)]">Hiring snapshot</p>
                <div className="profile-signal__role">Cross-platform systems engineering</div>
                <div className="profile-tags">
                  {['Flutter + Dart', 'Native integration', 'Connected devices', 'Reliable delivery'].map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="working-areas" className="profile-section" aria-labelledby="areas-heading">
        <div className="profile-section__intro">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">01 / working areas</p>
          <h2 id="areas-heading">Where the engineering focus is strongest</h2>
          <p>The public work points to a consistent practice: turn complex systems into software people can operate with confidence.</p>
        </div>
        <div className="profile-arc">
          {workingAreas.map((phase) => (
            <article className="profile-arc__item" key={phase.number}>
              <div className="profile-arc__marker"><span>{phase.number}</span></div>
              <div>
                <p className="profile-card-label">{phase.label}</p>
                <h3>{phase.title}</h3>
                <p>{phase.summary}</p>
                <div className="profile-tags">{phase.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="principles" className="profile-section profile-section--band" aria-labelledby="principles-heading">
        <div className="profile-section__intro">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">02 / working principles</p>
          <h2 id="principles-heading">What stays consistent across the work</h2>
        </div>
        <div className="profile-principles">
          {principles.map(([number, title, summary]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{summary}</p></article>)}
        </div>
      </section>

      <section className="profile-section profile-capabilities" aria-labelledby="capabilities-heading">
        <div className="profile-section__intro">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">03 / public evidence</p>
          <h2 id="capabilities-heading">Follow the work, not just the title</h2>
          <p>These published capability pages are the quickest route into the engineering decisions behind the profile.</p>
        </div>
        <div className="profile-capabilities__list">
          {capabilities.map((capability, index) => (
            <Link href={`/capabilities/${capability.slug}`} key={capability.slug} className="profile-capability-link">
              <span className="font-mono text-xs text-[var(--accent)]">{String(index + 1).padStart(2, '0')}</span>
              <span><strong>{capability.title}</strong><small>{capability.summary}</small></span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <GithubContributionHeatmap sectionNumber="04" />

      <section id="collaboration" className="profile-section profile-collaboration" aria-labelledby="collaboration-heading">
        <div className="profile-section__intro profile-section__intro--wide">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">05 / collaboration</p>
          <h2 id="collaboration-heading">The best systems are built with other people</h2>
          <p>Technical depth matters most when it gives a team a clearer path forward. Here is a small preview of how collaborators describe that work.</p>
        </div>
        <TeammateFeedback testimonials={testimonials.slice(2, 4)} />
        <Link href="/testimonials" className="profile-inline-link">Read collaborator testimonials <span aria-hidden="true">↗</span></Link>
      </section>

      <section id="resume" className="profile-resume" aria-labelledby="resume-heading">
        <div>
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">06 / résumé</p>
          <h2 id="resume-heading">Read the concise version</h2>
          <p>Open the dedicated résumé page for a compact view of the experience behind this portfolio.</p>
        </div>
        <Link href="/resume" className="profile-download profile-download--large">View résumé <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="profile-section beyond-code-section" aria-labelledby="beyond-code-heading">
        <div className="profile-section__intro profile-section__intro--wide">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">07 / a small visual journal</p>
          <h2 id="beyond-code-heading">Notes from outside the desk</h2>
          <p>Tap through a few moments that give the rest of the story its shape. Each image is a personal snapshot, not a work sample.</p>
        </div>
        <BeyondCodeCarousel />
      </section>
    </div>
  );
}