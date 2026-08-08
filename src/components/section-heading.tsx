export function SectionHeading({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading mb-10 max-w-2xl">
      <p className="mb-3 font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
        {kicker}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      {children && (
        <p className="mt-4 leading-7 text-[var(--muted)]">{children}</p>
      )}
    </div>
  );
}
