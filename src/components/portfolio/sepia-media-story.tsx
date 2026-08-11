'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MediaImage } from '@/components/portfolio/media-image';
import { MediaVideo } from '@/components/portfolio/media-video';

type MediaFrame = {
  src: string;
  alt: string;
  label: string;
  detail: string;
  width: number;
  height: number;
};

const desktopFrames: MediaFrame[] = [
  {
    src: '/images/projects/sepia/desktop-photo-1.png',
    alt: 'SEPIA desktop creator interface showing multiple signal paths, modules, inputs, outputs, and a library of available modules.',
    label: '01 / Compose',
    detail: 'A wide control surface makes signal paths and module placement visible together.',
    width: 2646,
    height: 1624,
  },
  {
    src: '/images/projects/sepia/desktop-photo-2.png',
    alt: 'SEPIA desktop interface showing a different arrangement of signal paths and modules.',
    label: '02 / Reconfigure',
    detail: 'The same surface can hold changing arrangements without hiding the surrounding context.',
    width: 2646,
    height: 1624,
  },
];

const tabletFrames: MediaFrame[] = [
  {
    src: '/images/projects/sepia/ipad-photo-1.png',
    alt: 'SEPIA iPad interface showing a wide, touch-oriented view of signal paths and module groups.',
    label: '03 / Extend',
    detail: 'The tablet view preserves the composition model while giving the operator more room for touch.',
    width: 2098,
    height: 1604,
  },
  {
    src: '/images/projects/sepia/ipad-photo-2.png',
    alt: 'SEPIA iPad interface showing another signal-path arrangement with grouped modules.',
    label: '04 / Inspect',
    detail: 'A second tablet state shows how the surface remains legible as the arrangement changes.',
    width: 2098,
    height: 1604,
  },
  {
    src: '/images/projects/sepia/ipad-photo-3.png',
    alt: 'SEPIA iPad interface showing a detailed control and routing state.',
    label: '05 / Control',
    detail: 'The product keeps the operational surface close to the visual model.',
    width: 2098,
    height: 1604,
  },
];

const mobileFrames: MediaFrame[] = [
  {
    src: '/images/projects/sepia/mobile-photo-1.png',
    alt: 'SEPIA mobile interface showing signal paths, modules, and the bottom navigation.',
    label: '06 / Focus',
    detail: 'On a phone, the same product is reduced to a focused, vertically navigable surface.',
    width: 800,
    height: 1624,
  },
  {
    src: '/images/projects/sepia/mobile-photo-2.png',
    alt: 'SEPIA mobile interface showing a focused module arrangement.',
    label: '07 / Navigate',
    detail: 'Navigation stays explicit instead of relying on a desktop-sized canvas.',
    width: 800,
    height: 1624,
  },
  {
    src: '/images/projects/sepia/mobile-photo-3.png',
    alt: 'SEPIA mobile interface showing another signal-path state.',
    label: '08 / Adapt',
    detail: 'Different form factors present the same control story at different densities.',
    width: 800,
    height: 1624,
  },
];

export function SepiaMediaStory() {
  const [focusedFrame, setFocusedFrame] = useState<MediaFrame | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (focusedFrame && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current?.showModal();
    }
  }, [focusedFrame]);

  useEffect(() => () => {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, []);

  function openFrame(frame: MediaFrame) {
    triggerRef.current = document.activeElement instanceof HTMLButtonElement ? document.activeElement : null;
    setFocusedFrame(frame);
  }

  const restoreTriggerFocus = useCallback(() => {
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const closeFrame = useCallback(() => {
    dialogRef.current?.close();
    setFocusedFrame(null);
    restoreTriggerFocus();
  }, [restoreTriggerFocus]);

  return (
    <>
      <section className="sepia-media-story" aria-labelledby="media-story-heading">
      <div className="sepia-media-story__intro">
        <div>
          <p className="case-study-label">Selected evidence</p>
          <h2 id="media-story-heading">One control model, three working surfaces</h2>
        </div>
        <p className="sepia-media-story__lede">
          The supplied recordings and stills show the product at desktop, tablet, and phone sizes. Read them as one connected surface: compose a signal path, inspect its modules, and carry that state into the next context.
        </p>
      </div>

      <figure className="sepia-media-story__walkthrough">
        <div className="sepia-media-story__video-frame">
          <MediaVideo
            className="sepia-media-story__video"
            controls
            lazy
            preload="metadata"
            playsInline
            poster="/images/optimized/projects/sepia/desktop-photo-1.jpg"
            aria-label="SEPIA responsive product walkthrough"
            aria-describedby="sepia-video-caption"
          >
            <source src="/videos/sepia/desktop-video.mp4" type="video/mp4" />
            Your browser does not support the SEPIA walkthrough video. Use the still sequence below instead.
          </MediaVideo>
        </div>
        <figcaption id="sepia-video-caption" className="sepia-media-story__video-caption">
          <span><strong>Walkthrough</strong> / responsive product recording</span>
          <span>Controls are available for a self-paced review.</span>
        </figcaption>
      </figure>

      <div className="sepia-media-story__sequence">
        <MediaChapter title="The wide view" description="Desktop screenshots establish the full composition: paths, modules, library, and the surrounding control context." frames={desktopFrames} onFrameClick={openFrame} featured />
        <MediaChapter title="The working view" description="Tablet screenshots keep the visual model intact while changing the available space and interaction posture." frames={tabletFrames} onFrameClick={openFrame} />
        <MediaChapter title="The focused view" description="Mobile screenshots show the same product language compressed into a navigable, focused surface." frames={mobileFrames} onFrameClick={openFrame} />
      </div>
      </section>
      <dialog
        ref={dialogRef}
        className="sepia-media-dialog"
        aria-labelledby="sepia-media-dialog-title"
        aria-describedby="sepia-media-dialog-description"
        onCancel={(event) => {
          event.preventDefault();
          closeFrame();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeFrame();
        }}
      >
        {focusedFrame && (
          <figure className="sepia-media-dialog__content">
            <div className="sepia-media-dialog__header">
              <p id="sepia-media-dialog-title" className="case-study-label">{focusedFrame.label}</p>
              <button type="button" className="sepia-media-dialog__close" onClick={closeFrame} aria-label="Close focused image">×</button>
            </div>
            <div className="sepia-media-dialog__image-scroll" aria-label="Scrollable focused image">
              <MediaImage src={focusedFrame.src} alt={focusedFrame.alt} width={focusedFrame.width} height={focusedFrame.height} />
            </div>
            <figcaption id="sepia-media-dialog-description">{focusedFrame.detail}</figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}

function MediaChapter({ title, description, frames, onFrameClick, featured = false }: { title: string; description: string; frames: MediaFrame[]; onFrameClick: (frame: MediaFrame) => void; featured?: boolean }) {
  return (
    <section className={`sepia-media-chapter ${featured ? 'sepia-media-chapter--featured' : ''}`} aria-labelledby={`${title.toLowerCase().replaceAll(' ', '-')}-heading`}>
      <div className="sepia-media-chapter__heading">
        <div>
          <p className="case-study-label">{title}</p>
          <h3 id={`${title.toLowerCase().replaceAll(' ', '-')}-heading`}>{description}</h3>
        </div>
        <span className="sepia-media-chapter__count">{String(frames.length).padStart(2, '0')} frames</span>
      </div>
      <div className="sepia-media-chapter__frames">
        {frames.map((frame) => (
          <figure className="sepia-media-frame" key={frame.src}>
            <button type="button" className="sepia-media-frame__button" onClick={() => onFrameClick(frame)} aria-label={`Focus image: ${frame.label}`}>
              <div className="sepia-media-frame__image">
                <MediaImage src={frame.src} alt={frame.alt} width={frame.width} height={frame.height} loading="lazy" sizes={frame.width < 1000 ? '(max-width: 639px) 45vw, 18rem' : '(max-width: 639px) 100vw, 52rem'} />
              </div>
            </button>
            <figcaption>
              <span className="sepia-media-frame__label">{frame.label}</span>
              <span>{frame.detail}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
