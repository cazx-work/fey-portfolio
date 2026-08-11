'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MediaImage } from '@/components/portfolio/media-image';
import type { PortfolioItem } from '@/lib/portfolio-repository';

type ProjectVisual = { src: string; alt: string; label: string };

type ProjectCarouselProps = {
  projects: PortfolioItem[];
  visuals: Record<string, ProjectVisual>;
};

export function ProjectCarousel({ projects, visuals }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = projects[activeIndex];

  if (!project) return null;

  const visual = visuals[project.slug];
  const hasMultiple = projects.length > 1;
  const move = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + projects.length) % projects.length);
  };

  return (
    <div className="project-carousel" aria-roledescription={hasMultiple ? 'carousel' : undefined}>
      <div className="project-carousel__meta">
        <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">{String(activeIndex + 1).padStart(2, '0')} / {project.category}</p>
        {hasMultiple && (
          <div className="project-carousel__dots" aria-label="Choose a project">
            {projects.map((item, index) => <button key={item.slug} type="button" className={index === activeIndex ? 'is-active' : ''} onClick={() => setActiveIndex(index)} aria-label={`Show project ${index + 1}: ${item.title}`} aria-current={index === activeIndex ? 'true' : undefined} />)}
          </div>
        )}
      </div>
      <article className={`project-carousel__slide project-carousel__slide--${project.slug}`} aria-label={project.title}>
        <div className="project-carousel__visual">
          {visual ? (
            <MediaImage src={visual.src} alt={visual.alt} fill sizes="(max-width: 48rem) 100vw, 56vw" className="object-contain object-center" />
          ) : (
            <div className="project-carousel__placeholder" aria-label="Conceptual project visual placeholder">
              <span aria-hidden="true">{project.category}</span>
              <strong>{project.title}</strong>
              <small>Published case study</small>
            </div>
          )}
        </div>
        <div className="project-carousel__content">
          <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">{project.title}</h3>
          <p className="mt-4 max-w-xl leading-7 text-[var(--muted)]">{project.metadata.homepageSummary ?? project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} system tags`}>
            {project.tags.slice(0, 4).map((tag) => <span key={tag} className="rounded-full border border-[var(--line)] px-2.5 py-1 text-xs text-[var(--muted)]">{tag}</span>)}
          </div>
          <Link href={`/projects/${project.slug}?from=home`} className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[#082522] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
            Read the case study <span aria-hidden="true" className="ml-2">↗</span>
          </Link>
          {hasMultiple && (
            <div className="project-carousel__controls" aria-label="Project navigation">
              <button type="button" onClick={() => move(-1)} aria-label="Show previous project">← <span>Previous</span></button>
              <button type="button" onClick={() => move(1)} aria-label="Show next project"><span>Next</span> →</button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
