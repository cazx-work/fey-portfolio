import { notFound } from 'next/navigation';
import { repository } from '@/lib/portfolio-repository';
import { BackButton } from '@/components/back-button';
import { MarkdownContent } from '@/components/portfolio/MarkdownContent';
import { TechnicalDeepDive } from '@/components/portfolio/technical-deep-dive';
import type { Metadata } from 'next';
export function generateStaticParams() {
  return repository.listStories().map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const portfolioItem = repository.getStory(slug);
  return portfolioItem?.dossier ? { title: portfolioItem.title, description: portfolioItem.dossier.executive.overview } : {};
}
export default async function Story({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const portfolioItem = repository.getStory(slug);
  const s = portfolioItem?.dossier;
  if (!portfolioItem || !s) notFound();
  const displayTitle = portfolioItem.title;
  return (
    <div className="mx-auto max-w-4xl px-5 py-20">
      <BackButton href="/engineering-stories" label="Back to stories" />
      <p className="font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
        {s.metadata.project}
      </p>
      <h1 className="mt-5 text-5xl font-semibold tracking-tight">{displayTitle}</h1>
      <p className="mt-6 text-xl leading-9 text-[var(--muted)]">{s.executive.overview}</p>
      {s.executive.blocks.length > 0 && (
        <div className="mt-10 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
          <MarkdownContent blocks={s.executive.blocks.filter((block, i, arr) => {
            if (block.type === 'heading' && block.text.toLowerCase() === 'overview') return false;
            const prev = i > 0 ? arr[i - 1] : null;
            if (prev?.type === 'heading' && prev.text.toLowerCase() === 'overview') return false;
            return true;
          })} />
        </div>
      )}
      <TechnicalDeepDive
        className="detail-page-deep-dive mt-14"
        blocks={s.technical}
        confidentiality={s.confidentiality}
      />
    </div>
  );
}
