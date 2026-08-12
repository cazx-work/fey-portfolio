import fs from 'node:fs';
import path from 'node:path';

export type MarkdownBlock =
  | { type: 'heading'; level: 2 | 3 | 4; text: string; id: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'blockquote'; text: string }
  | { type: 'code'; language: string; code: string };

export type Dossier = {
  dossier: 'capability' | 'story' | 'project' | 'personal-project';
  slug: string;
  title: string;
  filename: string;
  metadata: {
    type: 'professional-project' | 'personal-project' | 'story' | 'capability';
    project?: string;
    visibility: 'public' | 'private';
    status: 'published' | 'draft';
    featured: boolean;
    year?: number;
    tags: string[];
    homepageTitle?: string;
    homepageSummary?: string;
  };
  executive: { overview: string; blocks: MarkdownBlock[] };
  technical: MarkdownBlock[];
};
export type ProjectRole =
  'Full-stack' | 'Systems integration' | 'Cross-platform' | 'Reliability';
export type ProjectEvidence = {
  problem: string;
  contribution: string;
  boundary: string;
  result: string;
};
export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  roleFit: ProjectRole[];
  problemDomain: string;
  systemBoundary: string;
  evidence: ProjectEvidence;
  dossier: Dossier;
};
export type ProjectSection = never;

export type ProjectPresentation = {
  eyebrow: string;
  heroOverview?: string;
  heroClaim: string;
  tension: {
    label: string;
    statement: string;
    stages: { title: string; detail: string; active?: boolean }[];
  };
  profile: { label: string; value: string }[];
  contribution: {
    title: string;
    description: string;
    themes: { title: string; description: string }[];
  };
  signalFlow: { title: string; detail: string; active?: boolean }[];
  recovery?: {
    label: string;
    title: string;
    steps: {
      label: string;
      description: string;
      tone: 'default' | 'warning' | 'success';
    }[];
  };
  video?: { src: string; title: string; description: string };
  demo?: { href: string; title: string; description: string };
};

const root = path.join(process.cwd(), 'docs', 'generated-dossiers');
const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const headingId = (value: string) => slugify(value);

function parseBlocks(lines: string[]): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i += 1;
      continue;
    }
    const heading = /^(#{2,4})\s+(.+)$/.exec(line);
    if (heading) {
      const level = heading[1].length as 2 | 3;
      blocks.push({
        type: 'heading',
        level,
        text: heading[2].trim(),
        id: headingId(heading[2]),
      });
      i += 1;
      continue;
    }
    const fence = /^```([\w-]*)\s*$/.exec(line);
    if (fence) {
      const code: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```'))
        code.push(lines[i++]);
      i += 1;
      blocks.push({
        type: 'code',
        language: fence[1] || 'text',
        code: code.join('\n'),
      });
      continue;
    }
    const list = /^(\d+\.|[-*])\s+(.+)$/.exec(line);
    if (list) {
      const ordered = list[1].endsWith('.');
      const items: string[] = [];
      while (i < lines.length) {
        const item = /^(\d+\.|[-*])\s+(.+)$/.exec(lines[i].trim());
        if (!item || item[1].endsWith('.') !== ordered) break;
        items.push(item[2]);
        i += 1;
      }
      blocks.push({ type: 'list', ordered, items });
      continue;
    }
    if (
      line.includes('|') &&
      i + 1 < lines.length &&
      isTableSeparator(lines[i + 1])
    ) {
      const headers = parseTableRow(line);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].trim().includes('|')) {
        rows.push(parseTableRow(lines[i++]));
      }
      blocks.push({ type: 'table', headers, rows });
      continue;
    }
    if (line.startsWith('> ')) {
      blocks.push({ type: 'blockquote', text: line.slice(2) });
      i += 1;
      continue;
    }
    const paragraph = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{2,4})\s|^```|^(\d+\.|[-*])\s|^>\s/.test(lines[i].trim())
    )
      paragraph.push(lines[i++].trim());
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
  }
  return blocks;
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string) {
  const cells = parseTableRow(line);
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function removeSection(blocks: MarkdownBlock[], title: string) {
  const start = blocks.findIndex(
    (block) =>
      block.type === 'heading' &&
      block.text.toLowerCase() === title.toLowerCase(),
  );
  if (start < 0) return blocks;
  const end = blocks.findIndex(
    (block, index) =>
      index > start &&
      block.type === 'heading' &&
      block.level <=
        (blocks[start] as Extract<MarkdownBlock, { type: 'heading' }>).level,
  );
  return [...blocks.slice(0, start), ...(end < 0 ? [] : blocks.slice(end))];
}

function readDossier(
  directory: string,
  filename: string,
  dossier: Dossier['dossier'],
): Dossier | null {
  const fullPath = path.join(root, directory, filename);
  if (!fs.existsSync(fullPath) || filename === 'README.md') return null;
  const source = fs.readFileSync(fullPath, 'utf8').replace(/\r\n/g, '\n');
  const frontmatter = parseFrontmatter(source);
  const title = source.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const executiveStart = source.indexOf('## Executive Content');
  const technicalStart = source.indexOf('## Technical Deep-Dive');
  if (!title || executiveStart < 0 || technicalStart < 0) return null;
  const executiveLines = source
    .slice(executiveStart + '## Executive Content'.length, technicalStart)
    .split('\n');
  const technicalLines = source
    .slice(technicalStart + '## Technical Deep-Dive'.length)
    .split('\n');
  const executiveBlocks = parseBlocks(executiveLines);
  const overviewHeading = executiveBlocks.findIndex(
    (block) =>
      block.type === 'heading' && block.text.toLowerCase() === 'overview',
  );
  const overviewBlock =
    overviewHeading >= 0 ? executiveBlocks[overviewHeading + 1] : undefined;
  const technical = removeSection(
    parseBlocks(technicalLines),
    'Interview Discussion Topics',
  );
  const confidentialityIndex = technical.findIndex(
    (block) =>
      block.type === 'heading' &&
      block.text.toLowerCase().includes('confidentiality'),
  );
  return {
    dossier,
    slug: frontmatter.slug ?? slugify(filename.replace(/\.md$/, '')),
    title,
    filename,
    metadata: {
      type:
        (frontmatter.type as Dossier['metadata']['type']) ??
        (dossier === 'project' ? 'professional-project' : dossier),
      project: frontmatter.project,
      visibility: frontmatter.visibility === 'public' ? 'public' : 'private',
      status: frontmatter.status === 'draft' ? 'draft' : 'published',
      featured: frontmatter.featured === 'true',
      year: frontmatter.year ? Number(frontmatter.year) : undefined,
      tags: frontmatter.tags
        ? frontmatter.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
      homepageTitle: frontmatter.homepageTitle,
      homepageSummary: frontmatter.homepageSummary,
    },
    executive: {
      overview: overviewBlock?.type === 'paragraph' ? overviewBlock.text : '',
      blocks: executiveBlocks,
    },
    technical:
      confidentialityIndex >= 0
        ? technical.slice(0, confidentialityIndex)
        : technical,
  };
}

export function parseFrontmatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return {};
  return Object.fromEntries(
    match[1].split('\n').flatMap((line) => {
      const separator = line.indexOf(':');
      if (separator < 0) return [];
      const key = line.slice(0, separator).trim();
      const value = line
        .slice(separator + 1)
        .trim()
        .replace(/^['"]|['"]$/g, '');
      return [[key, value]];
    }),
  );
}

function discover(directory: string, dossier: Dossier['dossier']) {
  return fs
    .readdirSync(path.join(root, directory))
    .filter((file) => file.endsWith('.md'))
    .map((file) => readDossier(directory, file, dossier))
    .filter((item): item is Dossier => Boolean(item));
}

export const capabilityDossiers = discover(
  'capabilities-content-dossier',
  'capability',
);
export const storyDossiers = discover('stories-content-dossier', 'story');
export const sepiaDossier = readDossier(
  'sepia-content-dossier',
  'sepia.md',
  'project',
);
export const professionalProjectDossiers = fs.existsSync(
  path.join(root, 'professional-projects'),
)
  ? discover('professional-projects', 'project')
  : [];
export const personalProjectDossiers = fs.existsSync(
  path.join(root, 'personal-projects'),
)
  ? discover('personal-projects', 'personal-project').filter(
      (item) => item.metadata.type === 'personal-project',
    )
  : [];

export const capabilities = capabilityDossiers.map((item) => ({
  slug: item.slug,
  title: item.title,
  summary: item.executive.overview,
  category: 'Capability',
  tags: [] as string[],
}));
export const stories = storyDossiers.map((item) => ({
  slug: item.slug,
  title: item.title,
  summary: item.executive.overview,
  category: 'Engineering story',
  tags: [] as string[],
}));
const discoveredProjects = [
  ...(sepiaDossier
    ? [
        {
          slug: 'sepia-client',
          title: sepiaDossier.title,
          summary: sepiaDossier.executive.overview,
          category: 'Flagship case study',
          tags: [
            'True analog',
            'Host-and-Module',
            'AEQUOREA Engine',
            'Flutter',
            'Dart',
          ],
          dossier: sepiaDossier,
        },
      ]
    : []),
  ...professionalProjectDossiers.map((item) => ({
    slug: item.slug,
    title: item.title,
    summary: item.executive.overview,
    category: 'Experience Digital · Supporting case study',
    tags: item.metadata.tags,
    dossier: item,
  })),
];

const projectEvidence: Record<
  string,
  Pick<Project, 'roleFit' | 'problemDomain' | 'systemBoundary' | 'evidence'>
> = {
  'sepia-client': {
    roleFit: ['Systems integration', 'Cross-platform', 'Reliability'],
    problemDomain: 'Connected professional audio control',
    systemBoundary:
      'Flutter/Dart application ↔ typed protocol boundary ↔ changing hardware',
    evidence: {
      problem:
        'Operators need software control to remain understandable when connected hardware changes or becomes unavailable.',
      contribution:
        'Contributed across Flutter/Dart architecture, protocol modeling, lifecycle ownership, recovery, routing, and testing.',
      boundary:
        'Separated user intent, domain state, transport behavior, and device runtime state.',
      result:
        'Published case study with verified architecture, recovery, and hardware-free testing evidence.',
    },
  },
  availbld: {
    roleFit: ['Full-stack', 'Cross-platform', 'Reliability'],
    problemDomain: 'Real-time event coordination',
    systemBoundary:
      'Flutter client ↔ live transport ↔ bounded event and conversation state',
    evidence: {
      problem:
        'People need to discover and coordinate around live events while network state changes underneath them.',
      contribution:
        'Contributed Flutter client work around discovery, live messaging, state transitions, and responsive updates.',
      boundary:
        'Made pending, delivered, failed, reconnect, and expiry states visible to the client experience.',
      result:
        'Published case study focused on reliable, bounded real-time coordination.',
    },
  },
  metacare: {
    roleFit: ['Full-stack', 'Cross-platform'],
    problemDomain: 'Health and wellness marketplace',
    systemBoundary:
      'Flutter client ↔ shared APIs and payment state ↔ product and service fulfillment',
    evidence: {
      problem:
        'Different products and services need a coherent member experience without sharing identical fulfillment rules.',
      contribution:
        'Contributed Flutter features, reusable UI, and BLoC-oriented state organization for marketplace workflows.',
      boundary:
        'Connected shared identity, catalog, checkout, payment, and fulfillment states across product verticals.',
      result:
        'Published project narrative covering cross-platform product delivery and shared workflow boundaries.',
    },
  },
  fast: {
    roleFit: ['Full-stack', 'Cross-platform'],
    problemDomain: 'Governed document search and archiving',
    systemBoundary:
      'Desktop and mobile clients ↔ OCR/search services ↔ permission-aware document records',
    evidence: {
      problem:
        'Teams need to find information inside scanned records without losing source context or access controls.',
      contribution:
        'Contributed across C# desktop and Flutter client workflows for document discovery and review.',
      boundary:
        'Kept OCR-derived search metadata connected to governed source documents and permissions.',
      result:
        'Published project narrative showing aligned desktop/mobile document workflows.',
    },
  },
  qpro: {
    roleFit: ['Full-stack', 'Cross-platform'],
    problemDomain: 'Connected service-branch operations',
    systemBoundary:
      'Customer and teller interfaces ↔ queue workflow ↔ branch guidance displays',
    evidence: {
      problem:
        'Customers and tellers need a predictable service path across self-service, counter, and display surfaces.',
      contribution:
        'Contributed to cross-surface queue management workflows and business process automation.',
      boundary:
        'Connected customer intent, ticket state, teller actions, and public counter guidance.',
      result:
        'Published project narrative covering a coordinated operational workflow.',
    },
  },
  'awh-app': {
    roleFit: ['Full-stack', 'Cross-platform'],
    problemDomain: 'Warehouse operations',
    systemBoundary:
      'Operations dashboards ↔ inventory and dispatch workflows ↔ field execution',
    evidence: {
      problem:
        'Warehouse teams need shared operational context across planning, scanning, dispatch, and field work.',
      contribution:
        'Contributed to application workflows spanning operational dashboards and field-facing surfaces.',
      boundary:
        'Connected system synchronization, inventory state, dispatch decisions, and operator actions.',
      result:
        'Published project narrative focused on coordinated warehouse operations.',
    },
  },
  'kyocera-device-manager': {
    roleFit: ['Full-stack', 'Systems integration'],
    problemDomain: 'Enterprise device management',
    systemBoundary:
      'C# services ↔ SQL Server data ↔ AngularJS management interfaces ↔ devices',
    evidence: {
      problem:
        'Enterprise teams need reliable software for managing connected printing devices and business operations.',
      contribution:
        'Contributed C# backend services, SQL Server data work, and AngularJS management interfaces.',
      boundary:
        'Worked across backend services, web management surfaces, persistence, and device communication.',
      result:
        'Published project narrative with enterprise web, backend, and device-integration evidence.',
    },
  },
};

const projectSequence = [
  'sepia-client',
  'availbld',
  'metacare',
  'fast',
  'qpro',
  'awh-app',
  'kyocera-device-manager',
];

export const projects = projectSequence
  .map((slug) => {
    const project = discoveredProjects.find((item) => item.slug === slug);
    const evidence = projectEvidence[slug];
    return project && evidence ? { ...project, ...evidence } : undefined;
  })
  .filter((item): item is NonNullable<typeof item> => Boolean(item))
  .filter(
    (item) =>
      item.dossier.metadata.status === 'published' &&
      item.dossier.metadata.visibility === 'public',
  );

const projectPresentations: Record<string, ProjectPresentation> = {
  'sepia-client': {
    eyebrow: 'Flagship case study · Karno Sound platform engineering',
    heroOverview:
      'SEPIA is a modular true-analog audio platform with a digital control plane. Authentic hardware circuitry stays in compact modules while software handles control, routing, automation, and recall. This case study focuses on making that boundary reliable as the system changes in real time.',
    heroClaim:
      'Real analog circuitry, software-level recall, and control that stays safe when hardware changes.',
    tension: {
      label: 'The tension',
      statement:
        'Analog sound stays in hardware while control runs in software, yet operators still expect instant, trustworthy response.',
      stages: [
        { title: 'Intent', detail: 'operator action' },
        { title: 'Boundary', detail: 'typed control', active: true },
        { title: 'Hardware', detail: 'live state' },
      ],
    },
    profile: [
      { label: 'Signal path', value: 'Analog modules + host matrix' },
      {
        label: 'Control plane',
        value: 'Flutter/Dart + AEQUOREA + DAW/console',
      },
      { label: 'I/O context', value: 'Analog, Dante/AES67, MADI' },
      {
        label: 'Reliability model',
        value: 'Intent-preserving conflict recovery',
      },
    ],
    contribution: {
      title: 'What the work made possible',
      description:
        'The contribution turned a changing analog hardware system into something operators could control with confidence. The work focused on the seams where intent becomes device behavior—and where live hardware can disagree with a saved session.',
      themes: [
        {
          title: 'Typed control boundaries',
          description:
            'Commands and telemetry crossed the device boundary through explicit, testable models instead of leaking wire-format details into product features.',
        },
        {
          title: 'Owned lifecycle behavior',
          description:
            'Discovery, reconnect, and disposal had a clear home, making asynchronous device changes easier to reason about and safer to recover from.',
        },
        {
          title: 'Intent-preserving recall',
          description:
            'Saved configurations remained the source of truth while topology and module identity were checked before state was restored.',
        },
        {
          title: 'Deterministic routing',
          description:
            'Visual signal-path intent became predictable hardware operations through a conversion layer that could be validated without live hardware.',
        },
      ],
    },
    signalFlow: [
      { title: 'Operator intent', detail: 'DAW, console, or app control' },
      {
        title: 'Application state',
        detail: 'intent, constraints, and recovery context',
      },
      {
        title: 'Typed integration',
        detail: 'commands, telemetry, and validation',
        active: true,
      },
      {
        title: 'Analog system',
        detail: 'host routing and physical processing',
      },
    ],
    recovery: {
      label: 'The moment that matters',
      title: 'When live hardware no longer matches a saved session',
      steps: [
        {
          label: 'Saved intent',
          description:
            'A recalled configuration is treated as the original decision, not overwritten by transient runtime values.',
          tone: 'default',
        },
        {
          label: 'Topology check',
          description:
            'Hosts, modules, slots, identity, and path compatibility are evaluated before applying state.',
          tone: 'warning',
        },
        {
          label: 'Safe restore',
          description:
            'Only valid mappings are applied; conflicts stay visible and can be revalidated later.',
          tone: 'success',
        },
      ],
    },
    video: {
      src: 'https://www.youtube-nocookie.com/embed/ionaUivRNfc',
      title: 'SEPIA hardware and control overview',
      description:
        'An overview of SEPIA’s hardware and software control relationship. The case study below explains the engineering boundaries that keep that relationship reliable.',
    },
    demo: {
      href: 'https://karno.com/demo/',
      title: 'Try the SEPIA demo',
      description:
        'Explore the interactive demo on Karno’s website before reading the engineering story behind the control experience.',
    },
  },
  availbld: {
    eyebrow: 'Supporting case study · Experience Digital collaboration',
    heroClaim:
      'Real-time coordination is useful only when discovery, delivery, and expiry remain understandable.',
    tension: {
      label: 'The tension',
      statement:
        'People need to find the right conversation quickly, while the product must keep temporary activity responsive and privacy-aware.',
      stages: [
        { title: 'Moment', detail: 'shared context' },
        { title: 'Coordination', detail: 'live rooms', active: true },
        { title: 'Expiry', detail: 'bounded state' },
      ],
    },
    profile: [
      {
        label: 'Product shape',
        value: 'Temporary, location-aware communities',
      },
      { label: 'Client context', value: 'Flutter mobile work' },
      {
        label: 'System concerns',
        value: 'WebSockets, spatial discovery, Redis',
      },
      {
        label: 'Engineering lens',
        value: 'Responsive state under unreliable networks',
      },
    ],
    contribution: {
      title: 'What the work made possible',
      description:
        'The work shaped a product model for short-lived conversations: fast enough for a live event, specific enough to be useful, and bounded enough not to become a permanent social graph.',
      themes: [
        {
          title: 'Live discovery',
          description:
            'Event context, topic, proximity, and urgency were treated as first-class inputs to finding the right conversation.',
        },
        {
          title: 'Reconnect-aware messaging',
          description:
            'Pending, delivered, and failed states made network conditions visible instead of presenting optimistic rendering as server confirmation.',
        },
        {
          title: 'Efficient mobile updates',
          description:
            'Virtualized feeds and localized state updates kept high-density activity from becoming a full-screen rendering problem.',
        },
        {
          title: 'Ephemeral by design',
          description:
            'Room lifecycle states separated active conversation from archive and expiry, keeping retention an explicit product decision.',
        },
      ],
    },
    signalFlow: [
      { title: 'Shared moment', detail: 'event, venue, or local need' },
      { title: 'Discovery', detail: 'context and proximity signals' },
      {
        title: 'Live room',
        detail: 'transport and client state',
        active: true,
      },
      { title: 'Lifecycle', detail: 'archive and eventual expiry' },
    ],
    recovery: {
      label: 'The moment that matters',
      title: 'When a live conversation crosses an unreliable network',
      steps: [
        {
          label: 'Local intent',
          description:
            'The client reflects the user action immediately while marking the message as pending.',
          tone: 'default',
        },
        {
          label: 'Transport change',
          description:
            'Reconnect and fallback behavior preserve a useful path without hiding delivery uncertainty.',
          tone: 'warning',
        },
        {
          label: 'Confirmed state',
          description:
            'The message becomes delivered only after the service accepts it, with bounded retry for safe recovery.',
          tone: 'success',
        },
      ],
    },
  },
  metacare: {
    eyebrow: 'Supporting case study · Xurpas Inc. mobile engineering',
    heroClaim:
      'A superapp becomes coherent when different service rules meet shared boundaries for identity, pricing, checkout, and fulfillment.',
    tension: {
      label: 'The tension',
      statement:
        'Products, appointments, benefits, and subscriptions need one account experience without pretending that every transaction follows the same path.',
      stages: [
        { title: 'Discovery', detail: 'many verticals' },
        { title: 'Checkout', detail: 'shared boundary', active: true },
        { title: 'Fulfillment', detail: 'domain rules' },
      ],
    },
    profile: [
      {
        label: 'Product shape',
        value: 'Health and wellness marketplace superapp',
      },
      { label: 'Client context', value: 'Flutter cross-platform mobile app' },
      {
        label: 'System concerns',
        value: 'Firebase, REST APIs, Xendit payments',
      },
      {
        label: 'Engineering lens',
        value: 'Shared checkout with vertical autonomy',
      },
    ],
    contribution: {
      title: 'What the work made possible',
      description:
        'The contribution shaped a shared mobile workflow for a marketplace whose products and services had different pricing, payment, scheduling, and fulfillment rules.',
      themes: [
        {
          title: 'Feature-first boundaries',
          description:
            'Marketplace, telehealth, insurance, loans, and checkout could retain domain-specific behavior while using shared client infrastructure.',
        },
        {
          title: 'Dual fulfillment paths',
          description:
            'Physical items could use delivery or pickup and returns, while digital and scheduled services used appointments, vouchers, and entitlements.',
        },
        {
          title: 'Payment recovery',
          description:
            'Xendit flows were treated as asynchronous and retry-aware, with trusted service responses—not a local success flag—deciding transaction state.',
        },
        {
          title: 'Responsive catalog state',
          description:
            'Lazy rendering, image caching, selective updates, and decoupled filtering supported rich marketplace discovery on mobile devices.',
        },
      ],
    },
    signalFlow: [
      { title: 'Member intent', detail: 'benefit, product, or service' },
      { title: 'Shared cart', detail: 'identity and pricing context' },
      {
        title: 'Payment boundary',
        detail: 'Xendit and verified status',
        active: true,
      },
      { title: 'Fulfillment', detail: 'delivery, appointment, or voucher' },
    ],
    recovery: {
      label: 'The moment that matters',
      title: 'When checkout leaves the app before payment is confirmed',
      steps: [
        {
          label: 'Initiate safely',
          description:
            'The client starts a transaction with retry-aware state and avoids treating a foreground redirect as completion.',
          tone: 'default',
        },
        {
          label: 'Reconcile externally',
          description:
            'Webhook handling, status checks, and synchronized updates allow payment and order state to converge after interruption.',
          tone: 'warning',
        },
        {
          label: 'Show next action',
          description:
            'Pending, confirmed, failed, and recovery states remain visible so the member knows what happened and what to do next.',
          tone: 'success',
        },
      ],
    },
  },
  fast: {
    eyebrow: 'Supporting case study · Experience Digital collaboration',
    heroClaim:
      'Document search becomes trustworthy when OCR, access control, and visual context share one retrieval boundary.',
    tension: {
      label: 'The tension',
      statement:
        'Teams need to find a phrase inside a scanned record quickly, while derived OCR metadata must remain as governed as the source document.',
      stages: [
        { title: 'Source', detail: 'scanned record' },
        { title: 'Intelligence', detail: 'OCR + index', active: true },
        { title: 'Retrieval', detail: 'safe context' },
      ],
    },
    profile: [
      {
        label: 'Product shape',
        value: 'Governed document vault and discovery',
      },
      { label: 'Client context', value: 'WinForms C# + Flutter' },
      { label: 'System concerns', value: 'OCR, indexing, access-aware search' },
      {
        label: 'Engineering lens',
        value: 'Derived metadata with source-level permissions',
      },
    ],
    contribution: {
      title: 'What the work made possible',
      description:
        'The work connected document ingestion, asynchronous OCR, search, and preview behavior across two client environments without treating extracted text as an ungoverned copy of the vault.',
      themes: [
        {
          title: 'Shared cross-platform behavior',
          description:
            'Desktop and mobile clients could present aligned document, search, permission, and processing states through a common service boundary.',
        },
        {
          title: 'OCR with visual context',
          description:
            'Token and page-position metadata made a search result explainable by connecting the match back to the source preview.',
        },
        {
          title: 'Permission-aware retrieval',
          description:
            'Access evaluation belongs before document matches, snippets, autocomplete terms, and other derived search signals are returned.',
        },
        {
          title: 'Visible processing state',
          description:
            'Archived, OCR-processing, indexed, and failed states help users understand when a document is actually searchable.',
        },
      ],
    },
    signalFlow: [
      { title: 'Source document', detail: 'PDF, TIFF, or scanned record' },
      { title: 'OCR pipeline', detail: 'text and spatial metadata' },
      {
        title: 'Governed index',
        detail: 'scoped search and snippets',
        active: true,
      },
      { title: 'Review surface', detail: 'document preview and highlight' },
    ],
    recovery: {
      label: 'The moment that matters',
      title: 'When a search match exists but the source is not safe to reveal',
      steps: [
        {
          label: 'Search intent',
          description:
            'A user asks for a phrase across the records available to their current workflow.',
          tone: 'default',
        },
        {
          label: 'Scope check',
          description:
            'Role, department, and vault permissions are evaluated before matches or OCR snippets cross the service boundary.',
          tone: 'warning',
        },
        {
          label: 'Explainable result',
          description:
            'Only permitted records return, with page and position context available for a grounded document preview.',
          tone: 'success',
        },
      ],
    },
  },
  qpro: {
    eyebrow: 'Supporting case study · Experience Digital collaboration',
    heroClaim:
      'A queue feels simple at the screen only when ticket state stays authoritative across customers, tellers, and the lobby.',
    tension: {
      label: 'The tension',
      statement:
        'Each surface needs a focused experience, but every ticket transition must remain synchronized, recoverable, and clear across the branch.',
      stages: [
        { title: 'Intake', detail: 'customer context' },
        { title: 'Transition', detail: 'shared ticket', active: true },
        { title: 'Guidance', detail: 'counter call' },
      ],
    },
    profile: [
      {
        label: 'Product shape',
        value: 'Customer, teller, and lobby queue ecosystem',
      },
      { label: 'Client context', value: 'Mobile/kiosk + desktop + display' },
      {
        label: 'System concerns',
        value: 'Ticket lifecycle and synchronization',
      },
      {
        label: 'Engineering lens',
        value: 'Explicit transitions under stale state',
      },
    ],
    contribution: {
      title: 'What the work made possible',
      description:
        'The work shaped a common queue model across intake, teller operations, and public guidance, keeping each surface focused without allowing local UI state to become the source of truth.',
      themes: [
        {
          title: 'Progressive queue intake',
          description:
            'Customers make the minimum useful decision first, then provide transaction detail before generating a ticket.',
        },
        {
          title: 'Safe teller controls',
          description:
            'Next, recall, call, and completion are treated as explicit operational transitions rather than incidental button effects.',
        },
        {
          title: 'Synchronized public guidance',
          description:
            'Counter and ticket relationships remain legible on a high-visibility display without relying on audio or color alone.',
        },
        {
          title: 'Recovery-aware state',
          description:
            'Reconnects, stale clients, duplicate actions, and uncertain responses have a visible place in the workflow model.',
        },
      ],
    },
    signalFlow: [
      { title: 'Customer intent', detail: 'lane and transaction context' },
      { title: 'Ticket lifecycle', detail: 'validated shared state' },
      {
        title: 'Operational views',
        detail: 'teller actions and status',
        active: true,
      },
      { title: 'Branch guidance', detail: 'counter call and notice' },
    ],
    recovery: {
      label: 'The moment that matters',
      title:
        'When a teller action may have succeeded but the response is unclear',
      steps: [
        {
          label: 'Pending action',
          description:
            'The client records the requested transition and gives immediate feedback without presenting it as final.',
          tone: 'default',
        },
        {
          label: 'Authoritative commit',
          description:
            'The service validates the current ticket state and prevents a repeated action from advancing the wrong client.',
          tone: 'warning',
        },
        {
          label: 'Reconciliation',
          description:
            'The teller, customer flow, and public display converge on the current state through refresh or live update.',
          tone: 'success',
        },
      ],
    },
  },
  'awh-app': {
    eyebrow: 'Supporting case study · Experience Digital collaboration',
    heroClaim:
      'Operational software becomes dependable when physical movement and digital state share one workflow model.',
    tension: {
      label: 'The tension',
      statement:
        'Warehouse teams need dense, immediate information, but every status update must remain traceable when inventory, freight, and capacity change together.',
      stages: [
        { title: 'Physical', detail: 'items and bays' },
        { title: 'Operational', detail: 'shared state', active: true },
        { title: 'Dispatch', detail: 'committed action' },
      ],
    },
    profile: [
      {
        label: 'Product shape',
        value: 'Warehouse and freight operations platform',
      },
      { label: 'Application layer', value: 'React, TypeScript, GraphQL' },
      { label: 'Data layer', value: 'Prisma and PostgreSQL' },
      {
        label: 'Engineering lens',
        value: 'Stateful workflows and write consistency',
      },
    ],
    contribution: {
      title: 'What the work was designed to make possible',
      description:
        'The platform brought inventory, freight, scanning, bay occupancy, and dispatch into a shared operational model. Its value was in making high-volume state changes visible and recoverable, not in presenting a dashboard for its own sake.',
      themes: [
        {
          title: 'Unified operational visibility',
          description:
            'Inventory, containers, scanner queues, capacity, and manifests could be understood as related parts of one workflow.',
        },
        {
          title: 'High-density interaction',
          description:
            'Virtualized data views, filtering, sorting, and batch selection supported operators working continuously across large record sets.',
        },
        {
          title: 'Typed system boundaries',
          description:
            'GraphQL, service logic, Prisma, and PostgreSQL provided explicit contracts between operator intent and durable operational state.',
        },
        {
          title: 'Consistency before convenience',
          description:
            'Validated transitions, transaction boundaries, and visible recovery paths addressed duplicate submissions and concurrent operational changes.',
        },
      ],
    },
    signalFlow: [
      { title: 'Physical operation', detail: 'scan, move, receive, load' },
      { title: 'Workflow state', detail: 'validated transition' },
      {
        title: 'Typed service',
        detail: 'GraphQL and application rules',
        active: true,
      },
      { title: 'Durable record', detail: 'relational operational data' },
    ],
    recovery: {
      label: 'The moment that matters',
      title:
        'When a status update may have succeeded but the response is unclear',
      steps: [
        {
          label: 'Validate intent',
          description:
            'The requested batch action is checked against current location, permissions, and workflow status.',
          tone: 'default',
        },
        {
          label: 'Commit consistently',
          description:
            'Related records move through one explicit consistency boundary rather than a sequence of loosely coordinated writes.',
          tone: 'warning',
        },
        {
          label: 'Recover visibly',
          description:
            'Timeouts, conflicts, and reconciliation needs remain visible to the operator instead of being mistaken for success.',
          tone: 'success',
        },
      ],
    },
  },
  'kyocera-device-manager': {
    eyebrow: 'Supporting case study · Kyocera Document Solutions Philippines',
    heroClaim:
      'Enterprise device management becomes dependable when fleet state, device capability, long-running work, and audit history share one boundary.',
    tension: {
      label: 'The tension',
      statement:
        'Administrators need one clear command center, while heterogeneous devices expose different capabilities, protocols, and failure modes.',
      stages: [
        { title: 'Fleet', detail: 'many models' },
        { title: 'Intent', detail: 'shared command', active: true },
        { title: 'Device', detail: 'reconciled state' },
      ],
    },
    profile: [
      {
        label: 'Product shape',
        value: 'Enterprise printer and MFP fleet administration',
      },
      { label: 'Application layer', value: 'AngularJS / Angular 2 + C#' },
      {
        label: 'Service boundary',
        value: 'ASP.NET Web API and background jobs',
      },
      { label: 'Data layer', value: 'Microsoft SQL Server' },
    ],
    contribution: {
      title: 'What the work made possible',
      description:
        'The contribution connected administration views, API services, device-facing orchestration, background work, and relational history into a shared model for fleet operations.',
      themes: [
        {
          title: 'Capability-driven administration',
          description:
            'Metadata-driven settings allowed shared configuration surfaces to adapt to model-specific capabilities without hardcoding every form.',
        },
        {
          title: 'Protocol translation boundaries',
          description:
            'Device adapters isolated model and communication differences from normalized administration commands and fleet workflows.',
        },
        {
          title: 'Long-running job state',
          description:
            'Polling, metering, firmware, and bulk configuration work could be requested, queued, processed, and reconciled beyond the initiating browser request.',
        },
        {
          title: 'Auditable operations',
          description:
            'Device inventory, events, jobs, configuration history, permissions, and redacted administrative actions remained part of the operational model.',
        },
      ],
    },
    signalFlow: [
      { title: 'Admin intent', detail: 'fleet view or configuration action' },
      {
        title: 'Normalized command',
        detail: 'capability and permission checks',
      },
      {
        title: 'Device adapter',
        detail: 'protocol-specific operation',
        active: true,
      },
      { title: 'Reconciled history', detail: 'status, job, and audit state' },
    ],
    recovery: {
      label: 'The moment that matters',
      title: 'When a bulk device operation partially succeeds',
      steps: [
        {
          label: 'Validate targets',
          description:
            'Permissions, device capability, current state, and requested changes are checked before work is created.',
          tone: 'default',
        },
        {
          label: 'Track independently',
          description:
            'Each device receives an identifiable outcome so one timeout or rejection does not hide the rest of the operation.',
          tone: 'warning',
        },
        {
          label: 'Reconcile visibly',
          description:
            'Authoritative polling and job history surface completed, pending, failed, and follow-up states to the administrator.',
          tone: 'success',
        },
      ],
    },
  },
};

export function getProjectPresentation(slug: string): ProjectPresentation {
  return (
    projectPresentations[slug] ?? {
      eyebrow: 'Project case study',
      heroClaim: 'A closer look at the decisions behind the work.',
      tension: {
        label: 'The challenge',
        statement:
          'A product problem shaped by real constraints, users, and systems.',
        stages: [
          { title: 'Context', detail: 'problem' },
          { title: 'Work', detail: 'decisions', active: true },
          { title: 'Outcome', detail: 'impact' },
        ],
      },
      profile: [
        { label: 'Platform', value: 'Cross-platform product engineering' },
        { label: 'Focus', value: 'Architecture and delivery' },
        {
          label: 'Engineering lens',
          value: 'Clear boundaries and reliable behavior',
        },
        { label: 'Public boundary', value: 'Conceptual case study' },
      ],
      contribution: {
        title: 'What the work made possible',
        description:
          'This case study explains the engineering decisions, tradeoffs, and outcomes supported by the available project material.',
        themes: [],
      },
      signalFlow: [
        { title: 'Problem', detail: 'user and system context' },
        { title: 'Design', detail: 'models and boundaries' },
        { title: 'Implementation', detail: 'tested behavior', active: true },
        { title: 'Outcome', detail: 'reliable product change' },
      ],
    }
  );
}

export function getCapability(slug: string) {
  return capabilityDossiers.find((item) => item.slug === slug);
}
export function getStory(slug: string) {
  return storyDossiers.find((item) => item.slug === slug);
}
export function getProject(slug: string) {
  return projects.find((item) => item.slug === slug);
}
