import { MediaImage } from '@/components/portfolio/media-image';

type SupportingProjectMediaProps = {
  slug: string;
};

type MediaFrame = {
  src: string;
  alt: string;
  label: string;
  detail: string;
  mobile?: boolean;
};

const mediaByProject: Record<string, { title: string; lede: string; frames: MediaFrame[] }> = {
  availbld: {
    title: 'From live feed to useful conversation',
    lede: 'The supplied screens show the product as a connected flow: discover an event, find an instant group, and coordinate around a changing physical moment.',
    frames: [
      {
        src: '/images/optimized/projects/availbld/availbld-1.jpg',
        alt: 'Availbld live event feed showing active event conversations and instant join actions.',
        label: '01 / Discover',
        detail: 'The live feed makes nearby conversations visible without requiring a permanent social connection.',
        mobile: true,
      },
      {
        src: '/images/optimized/projects/availbld/availbld-2.jpg',
        alt: 'Availbld event detail screen showing an active event and nearby instant groups.',
        label: '02 / Group',
        detail: 'An event becomes a focused context for finding or creating a temporary group.',
        mobile: true,
      },
      {
        src: '/images/optimized/projects/availbld/availbld-3.jpg',
        alt: 'Availbld discovery screen showing featured events, categories, and nearby activity.',
        label: '03 / Explore',
        detail: 'Discovery combines event context, category, activity, and proximity signals.',
        mobile: true,
      },
      {
        src: '/images/optimized/projects/availbld/availbld-4.jpg',
        alt: 'Availbld group conversation showing a rally point update and message delivery state.',
        label: '04 / Coordinate',
        detail: 'The conversation surface keeps location updates and delivery state close to the action.',
        mobile: true,
      },
    ],
  },
  'awh-app': {
    title: 'One operational view for a moving warehouse',
    lede: 'The supplied dashboard screen shows how inventory, dispatch, gate activity, field operators, and system synchronization can share one operational surface.',
    frames: [
      {
        src: '/images/optimized/projects/AWH/awh.jpg',
        alt: 'AWH warehouse operations dashboard showing warehouse capacity, inventory and batch scanner queue, dispatch manifests, gate activity, field operators, and system sync status.',
        label: '01 / Operate',
        detail: 'A dense operational dashboard keeps high-priority state close to the workflows that change it.',
      },
    ],
  },
  fast: {
    title: 'From scanned source to governed retrieval',
    lede: 'The supplied screens show FAST across mobile and desktop: documents move from capture and processing into OCR-aware search and visual review.',
    frames: [
      {
        src: '/images/optimized/projects/FAST/fast-mobile.jpg',
        alt: 'FAST mobile vault screen showing OCR search, recent documents, and document processing states.',
        label: '01 / Capture',
        detail: 'The mobile vault makes recent scans, pending processing, and document review visible in one workflow.',
      },
      {
        src: '/images/optimized/projects/FAST/fast-desktop.jpg',
        alt: 'FAST desktop document index showing OCR search results, extracted context, and a highlighted document preview.',
        label: '02 / Retrieve',
        detail: 'The desktop view connects an OCR match to its document context and a visual preview.',
      },
    ],
  },
  qpro: {
    title: 'One queue, three operational views',
    lede: 'The supplied screens show QPRO as a coordinated flow: customers create a ticket, tellers manage transitions, and the lobby display makes counter calls legible.',
    frames: [
      {
        src: '/images/optimized/projects/QPRO/qpro-mobile.jpg',
        alt: 'QPRO mobile queue intake screen showing regular and priority service lanes.',
        label: '01 / Intake',
        detail: 'The customer flow starts with a clear lane decision before progressively collecting transaction context.',
      },
      {
        src: '/images/optimized/projects/QPRO/qpro-teller.jpg',
        alt: 'QPRO teller portal showing the queue ledger, current ticket, and ticket details.',
        label: '02 / Operate',
        detail: 'The teller portal keeps the current ticket, queue ledger, and transition controls close together.',
      },
      {
        src: '/images/optimized/projects/QPRO/qpro-screen.jpg',
        alt: 'QPRO public lobby display showing tickets assigned to counters and a branch notice ticker.',
        label: '03 / Guide',
        detail: 'The public display translates shared queue state into readable counter guidance from a distance.',
      },
    ],
  },
};

export function SupportingProjectMedia({ slug }: SupportingProjectMediaProps) {
  const media = mediaByProject[slug];
  if (!media) return null;

  return (
    <section className="case-study-section mt-16" aria-labelledby={`${slug}-media-heading`}>
      <div className="mb-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div>
          <p className="case-study-label">Selected evidence</p>
          <h2 id={`${slug}-media-heading`}>{media.title}</h2>
        </div>
        <p className="case-study-lead m-0">{media.lede}</p>
      </div>
      <div className="evidence-media-grid">
        {media.frames.map((frame) => (
          <figure key={frame.src} className="evidence-media-card group">
            <div className={`evidence-media-card__visual ${frame.mobile ? 'evidence-media-card__visual--mobile' : ''}`}>
              {frame.mobile ? (
                <MediaImage src={frame.src} alt={frame.alt} width={552} height={1236} loading="lazy" sizes="(max-width: 40rem) 100vw, 50vw" className="evidence-media-card__image evidence-media-card__image--mobile" />
              ) : (
                <MediaImage src={frame.src} alt={frame.alt} fill loading="lazy" sizes="(max-width: 40rem) 100vw, 50vw" className="evidence-media-card__image object-contain object-top" />
              )}
            </div>
            <figcaption className="evidence-media-card__caption">
              <div className="evidence-media-card__heading">
                <span className="case-study-label">{frame.label}</span>
                <span className="evidence-media-card__rule" aria-hidden="true" />
              </div>
              <span className="evidence-media-card__detail">{frame.detail}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
