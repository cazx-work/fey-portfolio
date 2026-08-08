import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-32">
      <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
        404 / not found
      </p>
      <h1 className="mt-5 text-5xl font-semibold">
        This route does not exist.
      </h1>
      <p className="mt-5 text-[var(--muted)]">
        Try the project directory or return to the homepage.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-[var(--ink)] px-5 py-3 text-sm text-[var(--bg)]"
      >
        Back home
      </Link>
    </div>
  );
}
