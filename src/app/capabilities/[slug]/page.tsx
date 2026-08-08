import { notFound } from 'next/navigation';
import { repository } from '@/lib/portfolio-repository';
import { Card } from '@/components/card';
import { BackButton } from '@/components/back-button';
import { MarkdownContent } from '@/components/portfolio/MarkdownContent';
import { TechnicalDeepDive } from '@/components/portfolio/technical-deep-dive';
import type { Metadata } from 'next';
export function generateStaticParams() {
  return repository.listCapabilities().map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const portfolioItem = repository.getCapability(slug);
  return portfolioItem?.dossier ? { title: portfolioItem.title, description: portfolioItem.dossier.executive.overview } : {};
}
export default async function Capability({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const portfolioItem = repository.getCapability(slug);
  const item = portfolioItem?.dossier;
  if (!portfolioItem || !item) notFound();
  const summary = portfolioItem;
  const tags = item.metadata.tags.length > 0 ? item.metadata.tags : ['Architecture', 'Systems thinking'];
  return (
    <div className="detail-page mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-16">
      <div className="detail-topbar">
        <BackButton href="/capabilities" label="Back to capabilities" />
      </div>
      <header className="detail-hero">
        <div>
          <p className="detail-hero__eyebrow">{item.metadata.project ?? 'Architecture'}</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-6xl">
            {item.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-[var(--muted)]">
            {item.executive.overview}
          </p>
          <div className="mt-7 flex flex-wrap gap-2" aria-label="Capability tags">
            {tags.map((tag) => <span key={tag} className="detail-tag">{tag}</span>)}
          </div>
        </div>
      </header>

      <section id="overview" className="detail-section mt-12 scroll-mt-8" aria-labelledby="overview-title">
        <div className="detail-overview rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-9">
        <MarkdownContent className="text-left" blocks={item.executive.blocks.filter((block, i, arr) => {
          if (block.type === 'heading' && block.text.toLowerCase() === 'overview') return false;
          const prev = i > 0 ? arr[i - 1] : null;
          if (prev?.type === 'heading' && prev.text.toLowerCase() === 'overview') return false;
          return true;
        })} />
        </div>
      </section>
      <TechnicalDeepDive
        id="technical-deep-dive"
        className="detail-page-deep-dive mt-12 scroll-mt-8"
        contentClassName="text-left"
        blocks={item.technical}
        confidentiality={item.confidentiality}
      />
      <section id="related-stories" className="mt-20 scroll-mt-8" aria-labelledby="related-stories-title">
        <div className="detail-section__label">
          <p id="related-stories-title">Continue exploring</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {repository.listStories().slice(0, 2).map((s) => (
            <Card
              key={s.slug}
              href={`/engineering-stories/${s.slug}`}
              eyebrow="SEPIA"
              title={s.title}
              summary={s.summary}
              tags={summary?.tags}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
