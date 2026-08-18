import type { MetadataRoute } from 'next';
import { repository } from '@/lib/portfolio-repository';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const capabilities = repository.listCapabilities();
  const projects = repository.listProjects();
  const stories = repository.listStories();
  const base = 'https://felixybanez.dev';
  return [
    '',
    'profile',
    'capabilities',
    'projects',
    'engineering-stories',
    'resume',
    'testimonials',
  ]
    .map((path) => ({ url: `${base}/${path}` }))
    .concat(
      capabilities.map((x) => ({ url: `${base}/capabilities/${x.slug}` })),
      projects.map((x) => ({ url: `${base}/projects/${x.slug}` })),
      stories.map((x) => ({ url: `${base}/engineering-stories/${x.slug}` })),
    );
}
