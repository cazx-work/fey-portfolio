'use client';

import MermaidDiagram from '@/components/portfolio/mermaid-diagram';
import type { MarkdownBlock } from '@/lib/content';

export function MarkdownContent({ blocks, className = '' }: { blocks: MarkdownBlock[]; className?: string }) {
  return <div className={`prose max-w-none ${className}`}>{blocks.map((block, index) => <MarkdownBlockView key={`${block.type}-${index}`} block={block} />)}</div>;
}

function MarkdownBlockView({ block }: { block: MarkdownBlock }) {
  if (block.type === 'heading') {
    return block.level === 2
      ? <h2 id={block.id} data-section-level="2">{renderInlineMarkdown(block.text)}</h2>
      : block.level === 3
        ? <h3 id={block.id} data-section-level="3">{renderInlineMarkdown(block.text)}</h3>
        : <h4 id={block.id} data-section-level="4">{renderInlineMarkdown(block.text)}</h4>;
  }
  if (block.type === 'paragraph') return <p>{renderInlineMarkdown(block.text)}</p>;
  if (block.type === 'table') {
    return (
      <div className="markdown-table-wrap" role="region" aria-label="Technical evidence table" tabIndex={0}>
        <table className="markdown-table">
          <thead>
            <tr>{block.headers.map((header, index) => <th key={`${header}-${index}`}>{renderInlineMarkdown(header)}</th>)}</tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {block.headers.map((_, cellIndex) => <td key={`cell-${rowIndex}-${cellIndex}`}>{renderInlineMarkdown(row[cellIndex] ?? '')}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (block.type === 'blockquote') return <blockquote>{renderInlineMarkdown(block.text)}</blockquote>;
  if (block.type === 'list') {
    const List = block.ordered ? 'ol' : 'ul';
    return <List>{block.items.map((item, index) => <li key={`${item}-${index}`}>{renderInlineMarkdown(item)}</li>)}</List>;
  }
  if (block.language.toLowerCase() === 'mermaid') return <MermaidDiagram code={block.code} />;
  if (isDiagramCode(block.code)) {
    return (
      <div className="diagram-scroll diagram-scroll--text" role="img" aria-label="Architecture diagram">
        <pre><code>{block.code}</code></pre>
      </div>
    );
  }
  return <pre className="overflow-x-auto"><code>{block.code}</code></pre>;
}

function isDiagramCode(code: string) {
  const lines = code.split('\n').filter((line) => line.trim());
  if (lines.length < 3) return false;
  return lines.some((line) => /[│┃┌┐└┘├┤┬┴┼─→←↑↓<>]/u.test(line))
    || lines.filter((line) => /^\s*(v|\^|\|)\s*$/i.test(line)).length >= 2;
}

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^\)]+\)|\*\*[^*]+\*\*|__[^_]+__)/g);
  return parts.map((part, index) => {
    const link = /^\[([^\]]+)\]\(([^\)]+)\)$/.exec(part);
    if (link) {
      return <a key={`${part}-${index}`} href={resolveMarkdownLink(link[2])}>{link[1]}</a>;
    }
    const isBold = (part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'));
    if (!isBold) return part;
    return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
  });
}

function resolveMarkdownLink(href: string) {
  const [pathname, anchor] = href.split('#', 2);
  const suffix = anchor ? `#${anchor}` : '';

  if (pathname.endsWith('/contents/stories-content-dossier.md')) {
    return `/engineering-stories/interaction-performance${suffix}`;
  }

  if (pathname.endsWith('/contents/journals/rive-animation-performance-optimization.md')) {
    return `/engineering-stories/interaction-performance${anchor ? suffix : '#evidence'}`;
  }

  const storyMatch = pathname.match(/(?:^|\/)stories-content-dossier\/([^/]+)\.md$/);
  if (storyMatch) {
    const storySlugs: Record<string, string> = {
      'architecture-modernization': 'sepia-architecture-modernization',
    };
    return `/engineering-stories/${storySlugs[storyMatch[1]] ?? storyMatch[1]}${suffix}`;
  }

  const capabilityMatch = pathname.match(/(?:^|\/)capabilities-content-dossier\/([^/]+)\.md$/);
  if (capabilityMatch) return `/capabilities/${capabilityMatch[1]}${suffix}`;

  return href;
}
