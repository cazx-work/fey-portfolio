import Link from 'next/link';
import { MediaImage } from '@/components/portfolio/media-image';
import { InlineIcon } from '@/components/inline-icon';
import type { ProjectEvidence } from '@/lib/content';
export function Card({
  href,
  eyebrow,
  title,
  summary,
  tags = [],
  image,
  evidence,
  className = '',
}: {
  href: string;
  eyebrow?: string;
  title: string;
  summary: string;
  tags?: string[];
  image?: { src: string; alt: string };
  evidence?: ProjectEvidence;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`portfolio-card group block overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_18px_45px_-28px_rgba(56,189,248,0.7)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] ${className}`}
    >
      {image && (
        <div className="project-card__media relative aspect-[16/8] border-b border-[var(--line)] bg-[var(--bg)]">
          <MediaImage
            src={image.src}
            alt={image.alt}
            fill
            loading="lazy"
            sizes="(max-width: 48rem) 100vw, 50vw"
            className="object-cover object-center transition duration-500 group-hover:scale-[1.025]"
          />
        </div>
      )}
      <div className="p-7 md:p-10">
        <div className="mb-6 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
          {eyebrow ? <span>{eyebrow}</span> : <span aria-hidden="true" />}
          <InlineIcon
            name="external"
            className="h-4 w-4 transition group-hover:translate-x-1"
          />
        </div>
        <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-[var(--accent)] md:text-3xl">
          {title}
        </h3>
        <p className="mt-4 max-w-4xl leading-8 text-[var(--muted)]">
          {summary}
        </p>
        {evidence && (
          <dl className="mt-7 grid gap-3 border-y border-[var(--line)] py-4 text-sm">
            {Object.entries(evidence).map(([label, value]) => (
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
        <div className="mt-7 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs text-[var(--ink)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
