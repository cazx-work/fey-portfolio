import { describe, expect, it } from 'vitest';
import sitemap from '@/app/sitemap';
import {
  capabilities,
  capabilityDossiers,
  getCapability,
  getProject,
  getStory,
  personalProjectDossiers,
  projects,
  sepiaDossier,
  stories,
  storyDossiers,
} from '@/lib/content';
import {
  filterByTag,
  parseFrontmatter,
  portfolioItems,
  published,
  repository,
  searchPortfolio,
} from '@/lib/portfolio-repository';
describe('content model', () => {
  it('has the flagship project', () =>
    expect(projects.some((x) => x.slug === 'sepia-client')).toBe(true));
  it('discovers generated capability and story dossiers', () => {
    expect(capabilityDossiers.length).toBeGreaterThan(5);
    expect(storyDossiers.length).toBeGreaterThan(5);
  });
  it('has the generated SEPIA dossier', () =>
    expect(sepiaDossier?.title).toBe('SEPIA'));
  it('resolves representative slugs', () => {
    expect(getCapability('native-and-hardware-integration')).toBeDefined();
    expect(getStory('hardware-communication-platform')).toBeDefined();
    expect(getProject('sepia-client')).toBeDefined();
    expect(getStory('missing')).toBeUndefined();
  });
  it('contains required dossier sections', () => {
    for (const dossier of [
      ...capabilityDossiers,
      ...storyDossiers,
      ...(sepiaDossier ? [sepiaDossier] : []),
    ]) {
      expect(dossier.executive.overview).not.toBe('');
      expect(dossier.technical.length).toBeGreaterThan(0);
    }
  });
  it('has no draft entries in public collections', () =>
    expect(
      [...capabilities, ...projects, ...stories].every(
        (x) => !x.title.includes('[VERIFY]'),
      ),
    ).toBe(true));
  it('supports scalable metadata and repository access', () => {
    expect(repository.listProjects().length).toBeGreaterThan(1);
    expect(repository.getProject('metacare')?.metadata.project).toBe(
      'Xurpas Inc.',
    );
    expect(repository.getProject('awh-app')?.metadata.project).toBe(
      'Experience Digital',
    );
    expect(
      repository.getProject('kyocera-device-manager')?.metadata.project,
    ).toBe('Kyocera Document Solutions Philippines');
    expect(
      repository
        .listStories()
        .every((item) => item.metadata.project === 'SEPIA'),
    ).toBe(true);
    expect(
      repository
        .listCapabilities()
        .every((item) => item.metadata.type === 'capability'),
    ).toBe(true);
    expect(portfolioItems.length).toBeGreaterThan(10);
  });
  it('supports static search and tag filtering', () => {
    expect(
      searchPortfolio('recovery').some(
        (item) => item.slug === 'configuration-recovery',
      ),
    ).toBe(true);
    expect(
      filterByTag('flutter').some((item) => item.metadata.project === 'SEPIA'),
    ).toBe(true);
  });
  it('parses simple future frontmatter', () => {
    expect(
      parseFrontmatter(
        '---\ntype: personal-project\nfeatured: false\n---\n# Demo',
      ).type,
    ).toBe('personal-project');
  });
  it('fails closed for non-public and invalid visibility values', () => {
    expect(
      parseFrontmatter('---\nvisibility: private\n---\n# Draft').visibility,
    ).toBe('private');
    expect(
      published([
        {
          metadata: { status: 'published', visibility: 'private' },
          title: 'Private',
        } as never,
      ]),
    ).toEqual([]);
  });
  it('publishes only canonical public routes in the sitemap', () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).not.toContain('https://felixybanez.dev/about');
    expect(urls).toContain('https://felixybanez.dev/profile');
    expect(urls).toContain('https://felixybanez.dev/projects/sepia-client');
    expect(urls.every((url) => !url.includes('[VERIFY]'))).toBe(true);
  });
  it('exposes a dedicated personal-project collection', () => {
    expect(personalProjectDossiers).toEqual([]);
  });
});
