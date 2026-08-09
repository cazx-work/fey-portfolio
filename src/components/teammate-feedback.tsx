'use client';

import { useEffect, useRef, useState } from 'react';
import { MediaImage } from '@/components/portfolio/media-image';
import type { Testimonial } from '@/data/testimonials';

type TeammateFeedbackProps = {
  testimonials: Testimonial[];
  limit?: number;
};

export function TeammateFeedback({ testimonials, limit }: TeammateFeedbackProps) {
  const visibleTestimonials = limit ? testimonials.slice(0, limit) : testimonials;
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [dialogType, setDialogType] = useState<'testimony' | 'profile' | null>(null);
  const testimonyDialogRef = useRef<HTMLDialogElement>(null);
  const profileDialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selectedTestimonial) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedTestimonial]);

  function openDialog(testimonial: Testimonial, type: 'testimony' | 'profile') {
    triggerRef.current = document.activeElement instanceof HTMLButtonElement ? document.activeElement : null;
    setSelectedTestimonial(testimonial);
    setDialogType(type);
    const dialogRef = type === 'testimony' ? testimonyDialogRef : profileDialogRef;
    dialogRef.current?.showModal();
  }

  function closeDialog(type: 'testimony' | 'profile') {
    const dialogRef = type === 'testimony' ? testimonyDialogRef : profileDialogRef;
    dialogRef.current?.close();
    setSelectedTestimonial(null);
    setDialogType(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {visibleTestimonials.map((testimonial, index) => (
          <figure
            key={`${testimonial.author}-${index}`}
            className="testimonial-card flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6"
          >
            <button type="button" className="testimonial-card__testimony flex-1 text-left text-lg leading-8 text-[var(--ink)]" onClick={() => openDialog(testimonial, 'testimony')}>
              <span className="mr-2 text-2xl text-[var(--accent)]" aria-hidden="true">“</span>
              {testimonial.summary}
              <span className="ml-1 text-2xl text-[var(--accent)]" aria-hidden="true">”</span>
              <span className="testimonial-expand-label"><span aria-hidden="true">＋ </span>Read full testimony</span>
            </button>
            <figcaption
              className="testimonial-card__info mt-6 border-t border-[var(--line)] pt-4"
            >
              <button type="button" className="testimonial-profile-button flex w-full items-center gap-3 text-left" onClick={() => openDialog(testimonial, 'profile')} aria-label={`View ${testimonial.author}'s profile`}>
                {testimonial.avatar ? (
                  <MediaImage src={testimonial.avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)] font-mono text-sm text-[var(--accent)]"
                    aria-hidden="true"
                  >
                    {testimonial.author.charAt(0)}
                  </span>
                )}
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-[var(--muted)]">{testimonial.role} · {testimonial.company}</p>
                </div>
              </button>
              <p className="mt-3 font-mono text-xs uppercase tracking-[.12em] text-[var(--accent)]">
                {testimonial.relationship}{testimonial.project ? ` · ${testimonial.project}` : ''}
              </p>
              {testimonial.linkedin && (
                <a className="testimonial-link mt-3 inline-block text-sm text-[var(--accent)] underline underline-offset-4" href={testimonial.linkedin} target="_blank" rel="noreferrer">
                  View LinkedIn profile <span aria-hidden="true">↗</span>
                </a>
              )}
              {testimonial.themes.length > 0 && <div className="profile-tags">{testimonial.themes.map((theme) => <span key={theme}>{theme}</span>)}</div>}
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog ref={testimonyDialogRef} className="testimonial-dialog" aria-labelledby="testimonial-dialog-title" onCancel={() => closeDialog('testimony')} onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog('testimony');
      }}>
        {selectedTestimonial && (
          <article className="testimonial-dialog__content">
            <div className="testimonial-dialog__header">
              <p className="font-mono text-xs uppercase tracking-[.14em] text-[var(--accent)]">Full testimony</p>
              <button className="testimonial-dialog__close" type="button" onClick={() => closeDialog('testimony')} aria-label="Close testimony">×</button>
            </div>
            <div className="testimonial-dialog__quote">
              <blockquote className="border-t border-[var(--line)] pt-6 text-lg leading-8 text-[var(--ink)]">
                {selectedTestimonial.quote.split('\n\n').map((paragraph, paragraphIndex) => (
                  <p className="testimonial-paragraph" key={paragraphIndex}>{paragraph}</p>
                ))}
              </blockquote>
            </div>
            <footer className="testimonial-dialog__footer">
              <div className="flex items-center gap-3">
                {selectedTestimonial.avatar ? (
                  <MediaImage src={selectedTestimonial.avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)] font-mono text-sm text-[var(--accent)]" aria-hidden="true">
                    {selectedTestimonial.author.charAt(0)}
                  </span>
                )}
                <div>
                  <h2 id="testimonial-dialog-title" className="font-medium">{selectedTestimonial.author}</h2>
                  <p className="text-sm text-[var(--muted)]">{selectedTestimonial.role} · {selectedTestimonial.company}</p>
                </div>
              </div>
              <p className="font-mono text-xs uppercase tracking-[.12em] text-[var(--accent)]">
                {selectedTestimonial.relationship}{selectedTestimonial.project ? ` · ${selectedTestimonial.project}` : ''}
              </p>
              {selectedTestimonial.linkedin && <a className="testimonial-link mt-4 inline-block text-sm text-[var(--accent)] underline underline-offset-4" href={selectedTestimonial.linkedin} target="_blank" rel="noreferrer">View LinkedIn profile <span aria-hidden="true">↗</span></a>}
              {selectedTestimonial.themes.length > 0 && <div className="profile-tags">{selectedTestimonial.themes.map((theme) => <span key={theme}>{theme}</span>)}</div>}
            </footer>
          </article>
        )}
      </dialog>
      <dialog ref={profileDialogRef} className="testimonial-dialog testimonial-profile-dialog" aria-labelledby="profile-dialog-title" onCancel={() => closeDialog('profile')} onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog('profile');
      }}>
        {selectedTestimonial && dialogType === 'profile' && (
          <article className="testimonial-dialog__content testimonial-profile-dialog__content">
            <div className="testimonial-dialog__header">
              <button className="testimonial-dialog__close" type="button" onClick={() => closeDialog('profile')} aria-label="Close profile">×</button>
            </div>
            <div className="testimonial-profile-dialog__portrait">
              {selectedTestimonial.avatar ? (
                <MediaImage src={selectedTestimonial.avatar} alt={`${selectedTestimonial.author} profile`} width={320} height={320} />
              ) : (
                <span aria-hidden="true">{selectedTestimonial.author.charAt(0)}</span>
              )}
            </div>
            <div className="testimonial-profile-dialog__details">
              <h2 id="profile-dialog-title">{selectedTestimonial.author}</h2>
              <p>{selectedTestimonial.role} · {selectedTestimonial.company}</p>
              <p className="font-mono text-xs uppercase tracking-[.12em] text-[var(--accent)]">{selectedTestimonial.relationship}</p>
              {selectedTestimonial.linkedin && <a className="testimonial-link" href={selectedTestimonial.linkedin} target="_blank" rel="noreferrer">View LinkedIn profile <span aria-hidden="true">↗</span></a>}
            </div>
          </article>
        )}
      </dialog>
    </>
  );
}
