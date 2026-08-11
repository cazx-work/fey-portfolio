import {
  capabilities,
  capabilityDossiers,
  getCapability,
  getProject,
  getStory,
  projects,
  sepiaDossier,
  professionalProjectDossiers,
  stories,
  storyDossiers,
  personalProjectDossiers,
  type Dossier,
} from './content';

export type PortfolioType = 'professional-project' | 'personal-project' | 'story' | 'capability';
export type PublicationStatus = 'published' | 'draft';

export type PortfolioMetadata = {
  type: PortfolioType;
  project: string;
  visibility: 'public' | 'private';
  status: PublicationStatus;
  featured: boolean;
  year?: number;
  tags: string[];
  homepageTitle?: string;
  homepageSummary?: string;
};

export type PortfolioItem = {
  slug: string;
  title: string;
  summary: string;
  metadata: PortfolioMetadata;
  dossier?: Dossier;
  tags: string[];
  category: string;
};

const metadataFor = (item: Dossier, fallback: PortfolioMetadata): PortfolioMetadata => ({
  type: item.metadata.type,
  project: item.metadata.project ?? fallback.project,
  visibility: item.metadata.visibility,
  status: item.metadata.status,
  featured: item.metadata.featured,
  year: item.metadata.year,
  tags: item.metadata.tags.length ? item.metadata.tags : fallback.tags,
  homepageTitle: item.metadata.homepageTitle,
  homepageSummary: item.metadata.homepageSummary,
});

const professionalProjectMetadata: PortfolioMetadata = { type: 'professional-project', project: 'SEPIA', visibility: 'public', status: 'published', featured: true, tags: ['Flutter', 'Dart', 'Native integration', 'Testing'] };
const storyMetadata: PortfolioMetadata = { type: 'story', project: 'SEPIA', visibility: 'public', status: 'published', featured: false, tags: [] };
const capabilityMetadata: PortfolioMetadata = { type: 'capability', project: 'SEPIA', visibility: 'public', status: 'published', featured: false, tags: [] };

export const portfolioProjects: PortfolioItem[] = projects.map((item) => ({
  slug: item.slug, title: item.title, summary: item.summary, metadata: metadataFor(item.dossier, item.slug === 'sepia-client' ? professionalProjectMetadata : { type: 'professional-project', project: item.dossier.metadata.project ?? 'Experience Digital', visibility: item.dossier.metadata.visibility, status: item.dossier.metadata.status, featured: item.dossier.metadata.featured, tags: item.tags }), dossier: item.dossier, tags: item.tags, category: item.category,
}));
export const portfolioPersonalProjects: PortfolioItem[] = personalProjectDossiers.map((item) => ({
  slug: item.slug, title: item.title, summary: item.executive.overview, metadata: metadataFor(item, { type: 'personal-project', project: item.metadata.project ?? 'Personal', visibility: 'public', status: 'published', featured: false, tags: [] }), dossier: item, tags: item.metadata.tags, category: 'Personal project',
}));
export const portfolioStories: PortfolioItem[] = storyDossiers.map((item) => ({
  slug: item.slug, title: item.title.replace(/^SEPIA\s+/i, ''), summary: item.executive.overview, metadata: metadataFor(item, storyMetadata), dossier: item, tags: item.metadata.tags, category: 'Engineering story',
}));
export const portfolioCapabilities: PortfolioItem[] = capabilityDossiers.map((item) => ({
  slug: item.slug, title: item.title, summary: item.executive.overview, metadata: metadataFor(item, capabilityMetadata), dossier: item, tags: item.metadata.tags, category: 'Capability',
}));

export const portfolioItems = [...portfolioProjects, ...portfolioPersonalProjects, ...portfolioStories, ...portfolioCapabilities];

const publicItem = (item: PortfolioItem | undefined) =>
  item && item.metadata.status === 'published' && item.metadata.visibility === 'public' ? item : undefined;

export function published<T extends PortfolioItem>(items: T[]) {
  return items.filter((item) => item.metadata.status === 'published' && item.metadata.visibility === 'public');
}
export function featured<T extends PortfolioItem>(items: T[]) {
  return published(items).filter((item) => item.metadata.featured);
}
export function searchPortfolio(query: string, items = portfolioItems) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return published(items);
  return published(items).filter((item) => [item.title, item.summary, item.metadata.project, ...item.metadata.tags].join(' ').toLowerCase().includes(normalized));
}
export function filterByTag(tag: string, items = portfolioItems) {
  return published(items).filter((item) => item.metadata.tags.some((value) => value.toLowerCase() === tag.toLowerCase()));
}
export function relatedContent(item: PortfolioItem, limit = 3) {
  return published(portfolioItems).filter((candidate) => candidate.slug !== item.slug && candidate.metadata.project === item.metadata.project && candidate.metadata.type !== item.metadata.type).slice(0, limit);
}

export const repository = {
  listProjects: () => published(portfolioProjects),
  getProject: (slug: string) => publicItem(portfolioProjects.find((item) => item.slug === slug)),
  listPersonalProjects: () => published(portfolioPersonalProjects),
  getPersonalProject: (slug: string) => publicItem(portfolioPersonalProjects.find((item) => item.slug === slug)),
  listStories: () => published(portfolioStories),
  getStory: (slug: string) => publicItem(portfolioStories.find((item) => item.slug === slug)),
  listCapabilities: () => published(portfolioCapabilities),
  getCapability: (slug: string) => publicItem(portfolioCapabilities.find((item) => item.slug === slug)),
  relatedContent,
  listFeatured: () => featured(portfolioItems),
};

export { capabilities, getCapability, getProject, getStory, parseFrontmatter, projects, sepiaDossier, stories } from './content';
