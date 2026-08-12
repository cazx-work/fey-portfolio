'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import Link from 'next/link';
import { MediaImage } from '@/components/portfolio/media-image';
import { InlineIcon } from '@/components/inline-icon';
import type { PortfolioItem } from '@/lib/portfolio-repository';

type ProjectVisual = { src: string; alt: string; label: string };

type ProjectCarouselProps = {
  projects: PortfolioItem[];
  visuals: Record<string, ProjectVisual>;
};

export function ProjectCarousel({ projects, visuals }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDotRef = useRef<HTMLButtonElement | null>(null);
  const swipeStart = useRef<{ x: number; y: number; pointerId: number } | null>(
    null,
  );
  const project = projects[activeIndex];

  if (!project) return null;

  const visual = visuals[project.slug];
  const hasMultiple = projects.length > 1;
  const move = (direction: 1 | -1) => {
    setActiveIndex(
      (current) => (current + direction + projects.length) % projects.length,
    );
  };

  useEffect(() => {
    activeDotRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeIndex]);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') return;

    swipeStart.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;

    if (!start || start.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const swipeThreshold = 48;

    if (
      Math.abs(deltaX) < swipeThreshold ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return;
    }

    move(deltaX < 0 ? 1 : -1);
  };

  return (
    <div
      className="project-carousel"
      role="region"
      aria-label="Selected projects"
      aria-roledescription={hasMultiple ? 'carousel' : undefined}
    >
      <div className="project-carousel__meta">
        {hasMultiple && (
          <div className="project-carousel__meta-actions">
            <div
              className="project-carousel__controls"
              aria-label="Project navigation"
            >
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Show previous project"
                aria-controls="active-project-slide"
              >
                <InlineIcon name="arrow-left" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Show next project"
                aria-controls="active-project-slide"
              >
                <InlineIcon name="arrow-right" />
              </button>
            </div>
            <div
              className="project-carousel__dots"
              aria-label="Choose a project"
            >
              {projects.map((item, index) => (
                <button
                  key={item.slug}
                  type="button"
                  ref={index === activeIndex ? activeDotRef : undefined}
                  className={index === activeIndex ? 'is-active' : ''}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show project ${index + 1}: ${item.title}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  aria-controls="active-project-slide"
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.title}</strong>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <article
        id="active-project-slide"
        className={`project-carousel__slide project-carousel__slide--${project.slug}`}
        aria-labelledby="active-project-title"
        aria-live="polite"
      >
        <figure
          className="project-carousel__visual"
          aria-label={visual?.label ?? `${project.title} project visual`}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerEnd}
          onPointerCancel={() => {
            swipeStart.current = null;
          }}
        >
          {visual ? (
            <MediaImage
              src={visual.src}
              alt={visual.alt}
              fill
              priority={activeIndex === 0}
              sizes="(max-width: 48rem) 100vw, 72rem"
              className="object-contain object-center"
            />
          ) : (
            <div
              className="project-carousel__placeholder"
              aria-label="Conceptual project visual placeholder"
            >
              <span aria-hidden="true">{project.category}</span>
              <strong>{project.title}</strong>
              <small>Published case study</small>
            </div>
          )}
          <figcaption className="project-carousel__visual-caption">
            {visual?.label ?? 'Published case study visual'}
          </figcaption>
        </figure>
        <div className="project-carousel__content">
          <div className="project-carousel__title-block">
            <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--accent)]">
              {project.category}
            </p>
            <h3
              id="active-project-title"
              className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl"
            >
              {project.title}
            </h3>
          </div>
          <p className="project-carousel__summary leading-7 text-[var(--muted)]">
            {project.metadata.homepageSummary ?? project.summary}
          </p>
          <div className="project-carousel__details">
            <div
              className="flex flex-wrap gap-2"
              aria-label={`${project.title} system tags`}
            >
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--line)] px-2.5 py-1 text-xs text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/projects/${project.slug}?from=home`}
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--on-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              Read the case study{' '}
              <InlineIcon name="external" className="ml-2" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
