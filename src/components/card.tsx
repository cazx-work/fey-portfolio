import Link from 'next/link';
export function Card({
  href,
  eyebrow,
  title,
  summary,
  tags = [],
  className = '',
}: {
  href: string;
  eyebrow?: string;
  title: string;
  summary: string;
  tags?: string[];
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`portfolio-card group block rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_18px_45px_-28px_rgba(56,189,248,0.7)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] ${className}`}
    >
      <div className="mb-6 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
        {eyebrow ? <span>{eyebrow}</span> : <span aria-hidden="true" />}
        <span aria-hidden="true" className="transition group-hover:translate-x-1">↗</span>
      </div>
      <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-[var(--accent)] md:text-3xl">{title}</h3>
      <p className="mt-4 max-w-4xl leading-8 text-[var(--muted)]">{summary}</p>
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
    </Link>
  );
}
