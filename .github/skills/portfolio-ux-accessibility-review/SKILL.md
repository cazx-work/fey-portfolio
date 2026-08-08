---
name: portfolio-ux-accessibility-review
description: "Use when auditing or improving this portfolio’s UX, accessibility, responsive behavior, hiring-focused information architecture, navigation, case-study readability, calls to action, keyboard support, focus states, contrast, dialogs, disclosures, or reduced-motion behavior."
---

# Portfolio UX and accessibility review

Review the site as both an accessible interface and a hiring-oriented engineering portfolio. Favor evidence-based findings over subjective redesign preferences.

## Review workflow

1. Read the relevant route, component, and content source before making conclusions. Start with `docs/architecture.md`, `README.md`, and the affected files.
2. Inspect the existing visual system in `src/app/globals.css`. Reuse `--bg`, `--surface`, `--ink`, `--muted`, `--line`, and `--accent`; do not introduce arbitrary colors during a fix.
3. Check the information path: identify the engineer, understand the engineering focus, find the strongest case study, scan proof points, and reach a clear contact action without confusion.
4. Review semantic structure: landmarks, one clear page heading, heading order, labelled sections, meaningful link text, form labels, table structure, and informative image/diagram alternatives.
5. Review interaction behavior: keyboard access, visible `:focus-visible`, tab order, escape handling, disclosure state, `aria-expanded`/`aria-controls`, `aria-current`, dialog labelling, and focus management.
6. Review visual accessibility: text and UI contrast, non-color state cues, readable line lengths, target sizes, zoom/reflow, long labels, and narrow-width overflow.
7. Review motion: confirm that animation communicates state, is not required for comprehension, does not flash, and has a meaningful `prefers-reduced-motion: reduce` fallback.
8. Check client/server boundaries. Keep server components as the default and limit browser state, effects, Mermaid, dialogs, and navigation state to focused client components.
9. Check publication safety. Do not recommend exposing drafts, unapproved links, unsupported metrics, confidential implementation details, or invented testimonials.

## Portfolio-specific checkpoints

- Homepage: positioning and contact path are clear above the fold; SEPIA and capabilities are discoverable.
- Projects and stories: contribution language is precise; technical depth is scannable; progressive disclosure remains usable without JavaScript or motion.
- Navigation: current route is understandable, mobile navigation is keyboard-accessible, and menu state is exposed.
- Diagrams and heatmaps: labels and text alternatives explain the concept; illustrative graphics are not presented as factual evidence.
- Testimonials and dialogs: names, quotes, controls, focus behavior, and close actions are accessible and approved.
- Content routes: use `src/lib/portfolio-repository.ts` publication filtering rather than bypassing the repository with raw content arrays.

## Findings format

Report findings in priority order:

- **Blocker** — prevents access, causes data/content exposure, or makes a primary task unusable.
- **High** — materially harms keyboard, screen-reader, mobile, contrast, comprehension, or hiring conversion.
- **Medium** — creates friction or inconsistency for some users.
- **Low** — polish or maintainability improvement.

For every finding include:

- File path and line or symbol
- User impact
- Specific recommendation
- Whether it requires code, content, styling, or dependency changes

Do not report a preference as a defect. If no issue is found, say so and identify what was checked. When implementing fixes, keep the change narrow and preserve existing content and visual conventions.

## Validation

Use the least expensive relevant validation first:

- Inspect affected files and run the project’s targeted type/lint checks when code changes are made.
- Use the existing Playwright configuration for route and viewport checks when browser behavior matters.
- Test keyboard-only navigation and reduced-motion behavior.
- Check at approximately 375px, 768px, 1024px, and 1440px widths.
- Do not run the full production build or complete E2E suite unless requested or required by the change.
