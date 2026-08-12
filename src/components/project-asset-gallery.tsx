'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MediaImage } from '@/components/portfolio/media-image';
import { InlineIcon } from '@/components/inline-icon';

type ProjectAsset = {
  project: string;
  src: string;
  alt: string;
  type: 'desktop' | 'ipad' | 'mobile';
};

const projectAssets: readonly ProjectAsset[] = [
  {
    project: 'AWH',
    src: '/images/optimized/projects/AWH/awh.jpg',
    alt: 'AWH logistics operations interface',
    type: 'desktop',
  },
  {
    project: 'FAST',
    src: '/images/optimized/projects/FAST/fast-mobile.jpg',
    alt: 'FAST document archive mobile interface',
    type: 'mobile',
  },
  {
    project: 'FAST',
    src: '/images/optimized/projects/FAST/fast-desktop.jpg',
    alt: 'FAST document search and OCR interface',
    type: 'desktop',
  },
  {
    project: 'QPRO',
    src: '/images/optimized/projects/QPRO/qpro-mobile.jpg',
    alt: 'QPRO queue management mobile interface',
    type: 'mobile',
  },
  {
    project: 'QPRO',
    src: '/images/optimized/projects/QPRO/qpro-screen.jpg',
    alt: 'QPRO queue status display interface',
    type: 'desktop',
  },
  {
    project: 'QPRO',
    src: '/images/optimized/projects/QPRO/qpro-teller.jpg',
    alt: 'QPRO teller queue management interface',
    type: 'desktop',
  },
  {
    project: 'Availbld',
    src: '/images/optimized/projects/availbld/availbld-1.jpg',
    alt: 'Availbld live event feed interface',
    type: 'mobile',
  },
  {
    project: 'Availbld',
    src: '/images/optimized/projects/availbld/availbld-2.jpg',
    alt: 'Availbld event group interface',
    type: 'mobile',
  },
  {
    project: 'Availbld',
    src: '/images/optimized/projects/availbld/availbld-3.jpg',
    alt: 'Availbld event discovery interface',
    type: 'mobile',
  },
  {
    project: 'Availbld',
    src: '/images/optimized/projects/availbld/availbld-4.jpg',
    alt: 'Availbld event conversation interface',
    type: 'mobile',
  },
  {
    project: 'MetaCare',
    src: '/images/optimized/projects/Metacare/metacare-1.jpg',
    alt: 'MetaCare home dashboard interface',
    type: 'mobile',
  },
  {
    project: 'MetaCare',
    src: '/images/optimized/projects/Metacare/metacare-2.jpg',
    alt: 'MetaCare benefits dashboard interface',
    type: 'mobile',
  },
  {
    project: 'MetaCare',
    src: '/images/optimized/projects/Metacare/metacare-3.jpg',
    alt: 'MetaCare products marketplace interface',
    type: 'mobile',
  },
  {
    project: 'MetaCare',
    src: '/images/optimized/projects/Metacare/metacare-4.jpg',
    alt: 'MetaCare services marketplace interface',
    type: 'mobile',
  },
  {
    project: 'MetaCare',
    src: '/images/optimized/projects/Metacare/metacare-5.jpg',
    alt: 'MetaCare merchants marketplace interface',
    type: 'mobile',
  },
  {
    project: 'MetaCare',
    src: '/images/optimized/projects/Metacare/metacare-6.jpg',
    alt: 'MetaCare order history interface',
    type: 'mobile',
  },
  {
    project: 'MetaCare',
    src: '/images/optimized/projects/Metacare/metacare-7.jpg',
    alt: 'MetaCare order summary interface',
    type: 'mobile',
  },
  {
    project: 'SEPIA',
    src: '/images/optimized/projects/sepia/sepia-rack.png',
    alt: 'SEPIA rack filled with digitally controlled analog audio modules',
    type: 'desktop',
  },
  {
    project: 'SEPIA',
    src: '/images/optimized/projects/sepia/sepia-module.png',
    alt: 'SEPIA analog audio module with its enclosure opened to reveal the circuitry',
    type: 'desktop',
  },
  {
    project: 'SEPIA',
    src: '/images/optimized/projects/sepia/desktop-photo-1.jpg',
    alt: 'SEPIA desktop creator interface',
    type: 'desktop',
  },
  {
    project: 'SEPIA',
    src: '/images/optimized/projects/sepia/desktop-photo-2.jpg',
    alt: 'SEPIA desktop signal path interface',
    type: 'desktop',
  },
  {
    project: 'SEPIA',
    src: '/images/optimized/projects/sepia/ipad-photo-1.jpg',
    alt: 'SEPIA tablet signal path interface',
    type: 'ipad',
  },
  {
    project: 'SEPIA',
    src: '/images/optimized/projects/sepia/ipad-photo-2.jpg',
    alt: 'SEPIA tablet module interface',
    type: 'ipad',
  },
  {
    project: 'SEPIA',
    src: '/images/optimized/projects/sepia/ipad-photo-3.jpg',
    alt: 'SEPIA tablet control interface',
    type: 'ipad',
  },
  {
    project: 'SEPIA',
    src: '/images/optimized/projects/sepia/mobile-photo-1.jpg',
    alt: 'SEPIA mobile creator interface',
    type: 'mobile',
  },
  {
    project: 'SEPIA',
    src: '/images/optimized/projects/sepia/mobile-photo-2.jpg',
    alt: 'SEPIA mobile module library interface',
    type: 'mobile',
  },
  {
    project: 'SEPIA',
    src: '/images/optimized/projects/sepia/mobile-photo-3.jpg',
    alt: 'SEPIA mobile dashboard interface',
    type: 'mobile',
  },
] as const;

export function ProjectAssetGallery() {
  const [focusedAsset, setFocusedAsset] = useState<
    (typeof projectAssets)[number] | null
  >(null);
  const desktopAssets = projectAssets.filter(
    (asset) => asset.type === 'desktop',
  );
  const ipadAssets = projectAssets.filter((asset) => asset.type === 'ipad');
  const mobileAssets = projectAssets.filter((asset) => asset.type === 'mobile');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (focusedAsset && dialogRef.current && !dialogRef.current.open)
      dialogRef.current.showModal();
  }, [focusedAsset]);

  useEffect(
    () => () => {
      if (dialogRef.current?.open) dialogRef.current.close();
    },
    [],
  );

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
    setFocusedAsset(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  function focusAsset(asset: (typeof projectAssets)[number]) {
    triggerRef.current =
      document.activeElement instanceof HTMLButtonElement
        ? document.activeElement
        : null;
    setFocusedAsset(asset);
  }

  return (
    <>
      <section
        className="mt-16 border-t border-[var(--line)] pt-10 md:mt-20"
        aria-labelledby="project-assets-title"
      >
        <div className="mb-7 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
            Project evidence
          </p>
          <h2
            id="project-assets-title"
            className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl"
          >
            A visual index of the supplied work
          </h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            Interface captures are grouped by project and served through the
            optimized image derivatives.
          </p>
        </div>
        <div className="project-evidence__group">
          <h3 className="project-evidence__group-title">Desktop</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {desktopAssets.map((asset) => (
              <figure
                key={asset.src}
                className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]"
              >
                <button
                  type="button"
                  className="project-evidence__button"
                  onClick={() => focusAsset(asset)}
                  aria-label={`Focus evidence: ${asset.alt}`}
                >
                  <div className="project-evidence__frame relative aspect-[4/3]">
                    <MediaImage
                      src={asset.src}
                      alt={asset.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 40rem) 100vw, (max-width: 64rem) 50vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>
                </button>
                <figcaption className="px-4 py-3 font-mono text-xs uppercase tracking-[.14em] text-[var(--muted)]">
                  {asset.project}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="project-evidence__group">
          <h3 className="project-evidence__group-title">Tablet</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ipadAssets.map((asset) => (
              <figure
                key={asset.src}
                className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]"
              >
                <button
                  type="button"
                  className="project-evidence__button"
                  onClick={() => focusAsset(asset)}
                  aria-label={`Focus evidence: ${asset.alt}`}
                >
                  <div className="project-evidence__frame relative aspect-[4/3]">
                    <MediaImage
                      src={asset.src}
                      alt={asset.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 40rem) 100vw, (max-width: 64rem) 50vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>
                </button>
                <figcaption className="px-4 py-3 font-mono text-xs uppercase tracking-[.14em] text-[var(--muted)]">
                  {asset.project}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="project-evidence__group">
          <h3 className="project-evidence__group-title">Mobile</h3>
          <div className="project-evidence__mobile-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mobileAssets.map((asset) => (
              <figure
                key={asset.src}
                className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]"
              >
                <button
                  type="button"
                  className="project-evidence__button"
                  onClick={() => focusAsset(asset)}
                  aria-label={`Focus evidence: ${asset.alt}`}
                >
                  <div className="project-evidence__frame project-evidence__frame--mobile relative">
                    <MediaImage
                      src={asset.src}
                      alt={asset.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 40rem) 50vw, (max-width: 64rem) 25vw, 20vw"
                      className="object-contain object-top"
                    />
                  </div>
                </button>
                <figcaption className="px-4 py-3 font-mono text-xs uppercase tracking-[.14em] text-[var(--muted)]">
                  {asset.project}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <dialog
        ref={dialogRef}
        className="project-evidence-dialog"
        aria-labelledby="project-evidence-dialog-title"
        onClose={() => {
          if (focusedAsset) setFocusedAsset(null);
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        {focusedAsset && (
          <figure className="project-evidence-dialog__content">
            <div className="project-evidence-dialog__header">
              <p
                id="project-evidence-dialog-title"
                className="font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]"
              >
                {focusedAsset.project} / focused evidence
              </p>
              <button
                type="button"
                className="project-evidence-dialog__close"
                onClick={closeDialog}
                aria-label="Close focused image"
              >
                <InlineIcon name="close" />
              </button>
            </div>
            <div className="project-evidence-dialog__image-scroll">
              <MediaImage
                src={focusedAsset.src}
                alt={focusedAsset.alt}
                width={1600}
                height={1200}
              />
            </div>
            <figcaption>{focusedAsset.alt}</figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
