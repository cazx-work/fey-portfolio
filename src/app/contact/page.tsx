import { InlineIcon } from '@/components/inline-icon';

export default function Contact() {
  return (
    <div className="contact-page mx-auto max-w-6xl px-5 py-10 sm:py-12">
      <section className="contact-hero" aria-labelledby="contact-heading">
        <div className="max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
            Hiring / 01
          </p>
          <h1
            id="contact-heading"
            className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            I am looking for my next software engineering role.
          </h1>
          <p className="mt-6 max-w-5xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
            I am a software engineer specializing in Flutter, Dart, native
            integrations, hardware communication, architecture, and testing. I
            am looking for senior cross-platform engineering opportunities and
            related React, TypeScript, or full-stack roles where I can help
            teams build dependable software.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="contact-options"
        className="contact-options mt-8 border-y border-[var(--line)]"
      >
        <h2 id="contact-options" className="sr-only">
          Contact options
        </h2>
        <div className="grid gap-0 md:grid-cols-3">
          <div className="border-b border-[var(--line)] py-5 md:border-b-0 md:border-r md:pr-8">
            <p className="font-mono text-sm text-[var(--accent)]">Email</p>
            <a
              href="mailto:yfelixedrian.work@gmail.com"
              className="mt-3 inline-block break-words text-lg underline decoration-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent)] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              yfelixedrian.work@gmail.com
            </a>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Best for discussing an open role.
            </p>
          </div>

          <div className="border-b border-[var(--line)] py-5 md:border-b-0 md:border-r md:px-8">
            <p className="font-mono text-sm text-[var(--accent)]">Phone</p>
            <a
              href="tel:+639558175624"
              className="mt-3 inline-block text-lg underline decoration-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent)] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              +63 955 8175 624
            </a>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Available for an initial screening call.
            </p>
          </div>

          <div className="py-5 md:pl-8">
            <p className="font-mono text-sm text-[var(--accent)]">
              Professional profile
            </p>
            <a
              href="https://www.linkedin.com/in/ybanezfe"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-lg underline decoration-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent)] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              LinkedIn <InlineIcon name="external" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Review my experience and connect with me.
            </p>
          </div>
        </div>
      </section>

      <p className="contact-supporting-copy mt-6 max-w-2xl text-sm leading-6 text-[var(--muted)]">
        Please include the role, team, or software problem you would like to
        discuss. Email is usually the best place to start.
      </p>
    </div>
  );
}
