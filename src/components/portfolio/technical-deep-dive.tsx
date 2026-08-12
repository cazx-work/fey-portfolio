'use client';

import { useId, useRef, useState } from 'react';
import type { MarkdownBlock } from '@/lib/content';
import { MarkdownContent } from '@/components/portfolio/MarkdownContent';

type TechnicalDeepDiveProps = {
  blocks: MarkdownBlock[];
  id?: string;
  className?: string;
  contentClassName?: string;
};

type DeepDiveSection = {
  id: string;
  text: string;
};

function shorten(text: string, limit = 240) {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trimEnd()}...`;
}

function getPreviewBlock(blocks: MarkdownBlock[]) {
  const headingIndex = blocks.findIndex((block) => block.type === 'heading');
  if (headingIndex >= 0) {
    const heading = blocks[headingIndex] as Extract<
      MarkdownBlock,
      { type: 'heading' }
    >;
    const paragraph = blocks
      .slice(headingIndex + 1)
      .find((block) => block.type === 'paragraph');
    if (paragraph) {
      return { heading: heading.text.trim(), paragraph: paragraph.text.trim() };
    }
    return { heading: heading.text.trim(), paragraph: '' };
  }

  const paragraph = blocks.find((block) => block.type === 'paragraph');
  if (paragraph) {
    return { heading: 'Preview', paragraph: paragraph.text.trim() };
  }

  return {
    heading: 'Preview',
    paragraph:
      'Expand this section to see architecture boundaries, state ownership, and implementation details.',
  };
}

function getSections(blocks: MarkdownBlock[]): DeepDiveSection[] {
  return blocks
    .filter(
      (block): block is Extract<MarkdownBlock, { type: 'heading' }> =>
        block.type === 'heading',
    )
    .filter((block) => block.level === 2)
    .map((block) => ({ id: block.id, text: block.text.trim() }));
}

export function TechnicalDeepDive({
  blocks,
  id,
  className = '',
  contentClassName,
}: TechnicalDeepDiveProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentId = useId();
  const preview = getPreviewBlock(blocks);
  const topLevelSections = getSections(blocks);
  const firstParagraph = blocks.find(
    (block): block is Extract<MarkdownBlock, { type: 'paragraph' }> =>
      block.type === 'paragraph',
  );
  const expandedContentClassName = [
    'deep-dive-body text-[var(--muted)]',
    contentClassName ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const scrollSectionIntoView = () => {
    if (!sectionRef.current) return;
    const header = document.querySelector('header');
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const top =
      window.scrollY +
      sectionRef.current.getBoundingClientRect().top -
      headerHeight -
      12;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  };

  const onToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        requestAnimationFrame(() => {
          scrollSectionIntoView();
        });
      }
      return next;
    });
  };

  return (
    <article
      ref={sectionRef}
      id={id}
      data-state={isOpen ? 'open' : 'closed'}
      className={`${className} deep-dive mb-14 overflow-hidden rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_86%,transparent)] px-6 py-6 md:px-9 md:py-9`}
    >
      <h2 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          className="deep-dive-toggle group flex w-full items-center justify-between gap-4 rounded-xl px-3 py-1 text-left text-inherit transition-colors md:px-4"
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <span className="min-w-0">
            <span className="deep-dive-toggle__title block text-[2rem] leading-[1.2] tracking-[-0.01em]">
              Technical Deep Dive
            </span>
            <span className="mt-2 block max-w-3xl text-sm leading-6 text-[var(--muted)]">
              {isOpen
                ? 'Collapse details to return to a short, plain-language snapshot.'
                : 'Expand for architecture boundaries, trade-offs, and implementation rationale.'}
            </span>
            <span className="deep-dive-meta mt-3 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.13em] text-[var(--muted)]">
              {topLevelSections.length > 0 && (
                <span className="deep-dive-meta__chip">
                  {topLevelSections.length} sections
                </span>
              )}
            </span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
            <span>{isOpen ? 'Collapse' : 'Expand'}</span>
            <span
              aria-hidden="true"
              className={`inline-block transition-transform ${isOpen ? 'rotate-180' : ''}`}
            >
              ▼
            </span>
          </span>
        </button>
      </h2>
      {!isOpen && (
        <div className="deep-dive-panel deep-dive-panel--preview mt-5 border-t border-[color-mix(in_srgb,var(--line)_72%,transparent)] px-6 pt-4 md:px-8">
          <p className="m-0 font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
            What this deep dive covers
          </p>
          <p className="deep-dive-intro mt-3">
            {shorten(firstParagraph?.text ?? preview.paragraph, 210)}
          </p>
          {topLevelSections.length > 0 && (
            <ul
              className="deep-dive-topics mt-4"
              aria-label="Previewed technical topics"
            >
              {topLevelSections.slice(0, 4).map((section, index) => (
                <li key={`${section.id}-${index}`}>{section.text}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {isOpen && (
        <div
          id={contentId}
          className="deep-dive-panel deep-dive-panel--expanded mt-6 border-t border-[color-mix(in_srgb,var(--line)_72%,transparent)] px-6 pt-5 md:px-8"
        >
          {topLevelSections.length > 0 && (
            <nav
              className="deep-dive-index"
              aria-label="Deep dive section index"
            >
              <p className="deep-dive-index__label">In this deep dive</p>
              <ol className="deep-dive-index__list">
                {topLevelSections.map((section, index) => (
                  <li key={`${section.id}-${index}`}>
                    <span className="deep-dive-index__number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <a href={`#${section.id}`}>{section.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <MarkdownContent
            className={expandedContentClassName}
            blocks={blocks}
          />
        </div>
      )}
    </article>
  );
}
