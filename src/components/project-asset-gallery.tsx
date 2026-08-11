import { MediaImage } from '@/components/portfolio/media-image';

const projectAssets = [
  { project: 'AWH', src: '/images/optimized/projects/AWH/awh.jpg', alt: 'AWH logistics operations interface' },
  { project: 'FAST', src: '/images/optimized/projects/FAST/fast-mobile.jpg', alt: 'FAST document archive mobile interface' },
  { project: 'FAST', src: '/images/optimized/projects/FAST/fast-desktop.jpg', alt: 'FAST document search and OCR interface' },
  { project: 'QPRO', src: '/images/optimized/projects/QPRO/qpro-mobile.jpg', alt: 'QPRO queue management mobile interface' },
  { project: 'QPRO', src: '/images/optimized/projects/QPRO/qpro-screen.jpg', alt: 'QPRO queue status display interface' },
  { project: 'QPRO', src: '/images/optimized/projects/QPRO/qpro-teller.jpg', alt: 'QPRO teller queue management interface' },
  { project: 'Availbld', src: '/images/optimized/projects/availbld/availbld-1.jpg', alt: 'Availbld live event feed interface' },
  { project: 'Availbld', src: '/images/optimized/projects/availbld/availbld-2.jpg', alt: 'Availbld event group interface' },
  { project: 'Availbld', src: '/images/optimized/projects/availbld/availbld-3.jpg', alt: 'Availbld event discovery interface' },
  { project: 'Availbld', src: '/images/optimized/projects/availbld/availbld-4.jpg', alt: 'Availbld event conversation interface' },
  { project: 'MetaCare', src: '/images/optimized/projects/Metacare/metacare-1.jpg', alt: 'MetaCare home dashboard interface' },
  { project: 'MetaCare', src: '/images/optimized/projects/Metacare/metacare-2.jpg', alt: 'MetaCare benefits dashboard interface' },
  { project: 'MetaCare', src: '/images/optimized/projects/Metacare/metacare-3.jpg', alt: 'MetaCare products marketplace interface' },
  { project: 'MetaCare', src: '/images/optimized/projects/Metacare/metacare-4.jpg', alt: 'MetaCare services marketplace interface' },
  { project: 'MetaCare', src: '/images/optimized/projects/Metacare/metacare-5.jpg', alt: 'MetaCare merchants marketplace interface' },
  { project: 'MetaCare', src: '/images/optimized/projects/Metacare/metacare-6.jpg', alt: 'MetaCare order history interface' },
  { project: 'MetaCare', src: '/images/optimized/projects/Metacare/metacare-7.jpg', alt: 'MetaCare order summary interface' },
  { project: 'SEPIA', src: '/images/optimized/projects/sepia/sepia-rack.png', alt: 'SEPIA rack filled with digitally controlled analog audio modules' },
  { project: 'SEPIA', src: '/images/optimized/projects/sepia/sepia-module.png', alt: 'SEPIA analog audio module with its enclosure opened to reveal the circuitry' },
  { project: 'SEPIA', src: '/images/optimized/projects/sepia/desktop-photo-1.png', alt: 'SEPIA desktop creator interface' },
  { project: 'SEPIA', src: '/images/projects/sepia/desktop-photo-2.png', alt: 'SEPIA desktop signal path interface' },
  { project: 'SEPIA', src: '/images/projects/sepia/ipad-photo-1.png', alt: 'SEPIA tablet signal path interface' },
  { project: 'SEPIA', src: '/images/projects/sepia/ipad-photo-2.png', alt: 'SEPIA tablet module interface' },
  { project: 'SEPIA', src: '/images/projects/sepia/ipad-photo-3.png', alt: 'SEPIA tablet control interface' },
  { project: 'SEPIA', src: '/images/projects/sepia/mobile-photo-1.png', alt: 'SEPIA mobile creator interface' },
  { project: 'SEPIA', src: '/images/projects/sepia/mobile-photo-2.png', alt: 'SEPIA mobile module library interface' },
  { project: 'SEPIA', src: '/images/projects/sepia/mobile-photo-3.png', alt: 'SEPIA mobile dashboard interface' },
] as const;

export function ProjectAssetGallery() {
  return (
    <section className="mt-16 border-t border-[var(--line)] pt-10 md:mt-20" aria-labelledby="project-assets-title">
      <div className="mb-7 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">Project evidence</p>
        <h2 id="project-assets-title" className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">A visual index of the supplied work</h2>
        <p className="mt-3 leading-7 text-[var(--muted)]">Interface captures are grouped by project and served through the optimized image derivatives.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projectAssets.map((asset) => (
          <figure key={asset.src} className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]">
            <div className="relative aspect-[4/3]">
              <MediaImage src={asset.src} alt={asset.alt} fill loading="lazy" sizes="(max-width: 40rem) 100vw, (max-width: 64rem) 50vw, 33vw" className="object-cover object-top" />
            </div>
            <figcaption className="px-4 py-3 font-mono text-xs uppercase tracking-[.14em] text-[var(--muted)]">{asset.project}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}