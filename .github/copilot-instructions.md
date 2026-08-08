# Portfolio design intelligence

These instructions apply to UI, content presentation, and interaction work in this portfolio.

## Global taste rules

- Preserve the existing dark, editorial, documentation-inspired visual language. Prefer the established CSS tokens in `src/app/globals.css` (`--bg`, `--surface`, `--ink`, `--muted`, `--line`, `--accent`) over arbitrary colors.
- Treat typography as a primary design element: use a restrained system sans for readable body copy, compact uppercase or monospace treatments for metadata, and deliberate line lengths and hierarchy. Do not add decorative font stacks without a clear content or accessibility reason.
- Prefer strong hierarchy, whitespace, indexed sections, diagrams, lists, and occasional cards over repeating every section as a card grid.
- Use subtle 1px borders, quiet surface contrast, and restrained shadows to define structure. Borders should clarify grouping, not become decoration.
- Use motion to explain state changes or guide attention. Keep transitions short and calm; respect `prefers-reduced-motion`.
- Do not use generic gradients, neon glows, glassmorphism, fake dashboards, fake telemetry, terminal-command aesthetics, or other AI-slop visual clichés unless an existing content requirement explicitly calls for them.
- Do not invent metrics, testimonials, product claims, links, customer details, or visual evidence. Follow the public-content boundaries documented in `README.md`, `docs/architecture.md`, and `docs/portfolio-context.md`.
- Keep the engineering portfolio credible, warm, precise, and evidence-oriented. Avoid hype such as “revolutionary,” “world-class,” or unsupported ownership claims.
- Prefer semantic HTML, visible `:focus-visible` states, sufficient contrast, keyboard access, and meaningful labels. Decorative icons and SVGs must be hidden from assistive technology.
- Keep route and content boundaries intact: use repository publication filtering and do not expose draft or non-public material.
- Follow the existing architecture: server components by default, explicit `'use client'` only for browser state/effects, Tailwind CSS v4 utilities plus semantic CSS in `src/app/globals.css`, and the `@/*` path alias.

## Design review checklist

Before considering UI work complete, check:

1. Does it reuse the existing tokens and visual grammar?
2. Is the hierarchy understandable without color or motion?
3. Does it work at narrow widths and with keyboard navigation?
4. Is motion optional and reduced-motion safe?
5. Does the copy describe verified portfolio content without filler?
6. Is the visual treatment specific to this engineering portfolio rather than a generic landing page?

Useful references: [`docs/architecture.md`](../docs/architecture.md), [`docs/stitch-site-design-prompt-v2.md`](../docs/stitch-site-design-prompt-v2.md), and [`README.md`](../README.md).
