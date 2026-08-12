import { TeammateFeedback } from '@/components/teammate-feedback';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  return (
    <div className="testimonials-page mx-auto max-w-6xl px-5 pb-24 pt-10 md:px-8 md:pt-16">
      <section
        className="testimonials-hero"
        aria-labelledby="testimonials-heading"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
            Testimonials / collaboration in practice
          </p>
          <h1
            id="testimonials-heading"
            className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-.05em] md:text-7xl"
          >
            What it is like to work together
          </h1>
          <p className="testimonials-hero__lede">
            A growing collection of feedback from colleagues and collaborators
            about the engineering work behind the systems.
          </p>
        </div>
      </section>
      <section className="testimonials-archive" aria-label="Recommendations">
        <div className="testimonials-archive__list">
          <TeammateFeedback testimonials={testimonials} />
        </div>
      </section>
    </div>
  );
}
