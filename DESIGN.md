---
name: Felix Edrian Ybañez Engineering Portfolio
description: A calm, evidence-led technical field guide to systems-oriented engineering work.
colors:
  background: '#0f172a'
  surface: '#1e293b'
  ink: '#f1f5f9'
  muted: '#b7c4d4'
  line: '#334155'
  accent: '#38bdf8'
  accent-soft: '#12334b'
  on-accent: '#082522'
  shadow-ink: '#050910'
  diagram-background: '#101b1e'
  status-warning: '#fbbf24'
  status-success: '#86efac'
  status-on-dark: '#c6eee6'
  shadow-deep: '#020617'
  shadow-surface: 'rgba(2, 8, 23, .18)'
typography:
  display:
    fontFamily: 'Arial, Helvetica, sans-serif'
    fontSize: 'clamp(2.25rem, 6vw, 4.5rem)'
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: '-0.04em'
  headline:
    fontFamily: 'Arial, Helvetica, sans-serif'
    fontSize: 'clamp(1.875rem, 4vw, 3rem)'
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: '-0.02em'
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace'
    fontSize: '0.75rem'
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: '0.18em'
  scale:
    body-reading: '1.08rem'
    body-small: '0.85rem'
    compact-label: '0.7rem'
    compact-meta: '0.72rem'
    compact-copy: '0.86rem'
    control: '0.9rem'
    diagram: '1.1rem'
    section: '1.15rem'
    section-large: '1.2rem'
    card: '1.25rem'
    card-feature: '1.35rem'
    display-small: '1.4rem'
    title: '1.5rem'
    title-large: '1.55rem'
    feature: '1.7rem'
    feature-large: '2rem'
    dialog-close: '1.75rem'
    avatar-fallback: '5rem'
    profile-section: 'clamp(2rem, 4vw, 3.4rem)'
    carousel-heading: 'clamp(1.7rem, 3vw, 2.6rem)'
    profile-moments: 'clamp(1.8rem, 3vw, 2.7rem)'
    placeholder: 'clamp(2rem, 4vw, 4rem)'
    hero-tablet: 'clamp(2.9rem, 5.4vw, 4rem)'
    resume-heading: 'clamp(2.5rem, 6vw, 4rem)'
    contact-heading: 'clamp(2.25rem, 4vw, 3.5rem)'
    diagram-code: 'clamp(0.8rem, 1.3vw, 1rem)'
    detail-fact: '0.95rem'
    compact-chip: '0.62rem'
    calendar-label: '0.65rem'
    case-study-heading: 'clamp(2rem, 4vw, 3.25rem)'
    project-marker: '0.5rem'
    project-hero: 'clamp(4.5rem, 10vw, 6rem)'
    project-hero-mobile: 'clamp(4rem, 20vw, 6rem)'
    project-profile-value: '0.96rem'
    signal-arrow: '1.3rem'
rounded:
  sm: '0.25rem'
  md: '0.75rem'
  lg: '1rem'
  pill: '999px'
  compact-control: '0.4rem'
  media: '0.85rem'
  evidence-control: '0.8rem'
  calendar-day: '0.2rem'
  calendar-day-compact: '0.18rem'
  calendar-tooltip: '0.55rem'
spacing:
  xs: '0.5rem'
  sm: '1rem'
  md: '1.5rem'
  lg: '2rem'
  xl: '5rem'
components:
  button-primary:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.on-accent}'
    rounded: '{rounded.pill}'
    padding: '0.75rem 1.5rem'
  button-secondary:
    backgroundColor: 'transparent'
    textColor: '{colors.muted}'
    rounded: '{rounded.pill}'
    padding: '0.75rem 1.25rem'
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.lg}'
    padding: '1.5rem'
  chip:
    backgroundColor: '{colors.accent-soft}'
    textColor: '{colors.ink}'
    rounded: '{rounded.pill}'
    padding: '0.25rem 0.75rem'
---

# Design System: Felix Edrian Ybañez Engineering Portfolio

## Overview

**Creative North Star: "The Technical Field Guide"**

The portfolio is a dark, documentation-inspired field guide for evaluating systems-oriented engineering work. It treats the interface as a reading instrument: visitors get a concise orientation, then progressively deeper project, capability, story, and collaboration evidence. The visual language is calm and infrastructural rather than promotional.

The system uses cool navy surfaces, near-white reading text, cyan as a deliberately scarce signal color, thin rules, compact metadata, and diagrams that make boundaries and handoffs legible. Rounded containers and selective shadows provide grouping without turning every section into a dashboard. The voice remains precise, warm, and evidence-led; visual treatment must never compensate for missing proof or introduce unsupported claims.

The compact project signal flow intentionally preserves a horizontal sequence on narrow screens. Its ordered stages are the content, and a clipped next card plus the explicit scroll instruction makes that sequence discoverable without reinterpreting the diagram as a vertical list. The overflow is contained within the labelled region and remains usable with touch, pointer, and keyboard input.

**Key Characteristics:**

- Dark navy field with quiet surface layering
- One cyan signal accent for actions, labels, focus, and evidence markers
- Documentation-style rules, indexes, diagrams, and progressive disclosure
- Strong typographic hierarchy with restrained system sans and monospace metadata
- Public-safe, hiring-focused content presented before technical depth

## Colors

The palette is restrained: cool neutrals establish a low-glare reading field while one cyan accent marks interaction, structure, and verified signal.

### Primary

- **Signal Cyan** (`#38bdf8`): Primary actions, focus rings, active states, metadata labels, diagram lines, and selected evidence.

### Neutral

- **Deep Navy** (`#0f172a`): Page background and the quietest reading surface.
- **Slate Surface** (`#1e293b`): Cards, navigation, bands, dialogs, and grouped content.
- **Near-White Ink** (`#f1f5f9`): Headings, primary text, and high-priority content.
- **Cool Muted Text** (`#b7c4d4`): Supporting copy, summaries, captions, and secondary metadata.
- **Slate Rule** (`#334155`): Borders, dividers, section boundaries, and inactive controls.
- **Deep Accent Surface** (`#12334b`): Selected chips, subtle emphasis bands, and accent-backed calls to action.
- **On-Accent Ink** (`#082522`): Dark text used on the bright cyan action surface.

**The One Signal Rule.** Use cyan to identify an action, active state, boundary, or evidence marker. Do not turn every container into an accent object.

## Typography

**Display Font:** Arial, Helvetica, sans-serif
**Body Font:** Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
**Label/Mono Font:** ui-monospace, SFMono-Regular, Menlo, monospace

**Character:** Headings are compact and direct, with tight tracking and a strong weight step. Body copy is readable and generous; monospace is reserved for short metadata, indexes, labels, and measurements rather than used as a costume for all technical text.

### Hierarchy

- **Display** (600, `clamp(2.25rem, 6vw, 4.5rem)`, `1.05`): Homepage and profile introductions; establishes the engineering proposition quickly.
- **Headline** (600, `clamp(1.875rem, 4vw, 3rem)`, `1.1`): Section and route headings that organize the reading path.
- **Title** (600, approximately `1.5rem–2.25rem`, `1.1`): Project, capability, story, and card titles.
- **Body** (400, `1rem` or `1.08rem` for long-form prose, `1.65–1.9`): Evidence, summaries, captions, and case-study reading.
- **Diagram title** (approximately `1.1rem`, `1.25`): Compact stage and boundary labels inside system diagrams.
- **Label** (400, `0.68–0.75rem`, tracked `0.12–0.24em`, often uppercase): Short route labels, indexes, categories, and system-boundary annotations.

### Intentional role exceptions

- Compact controls and fallback initials use the `dialog-close` and `avatar-fallback` sizes rather than reading-scale typography.
- Project heroes, route headings, diagrams, contribution calendars, and focused evidence use the named responsive or compact tokens listed in the frontmatter. These roles are intentionally distinct, but each is centralized in `src/app/globals.css`.
- Display type is capped at `6rem`; project titles use responsive scale within that limit.

**The Readable Measure Rule.** Long-form prose stays near 65–70 characters per line where possible; labels may be compact, but paragraphs must remain comfortable to scan.

## Layout

The primary container is a centered `max-width: 72rem`/`max-width: 6xl` field with responsive horizontal padding, generally `1.25rem` on small screens and `2rem` on wider layouts. Pages use generous vertical sections, commonly `5rem` on desktop, with tighter rhythm on mobile.

The homepage opens with a two-part hero: the proposition and action occupy the primary column while a system-boundary diagram provides an immediate product-specific proof shape. Subsequent content alternates between open reading sections, bordered surface bands, project media, evidence cards, and related-content navigation. Detail pages use a wider case-study field with a constrained prose measure and explicit section anchors.

At narrow widths, multi-column layouts collapse to one column, navigation becomes an explicit menu, controls remain at least `2.75rem` high, media keeps its aspect ratio, and horizontal overflow is contained inside labelled scroll regions. Breakpoint behavior is organized around approximately `30rem`, `40rem`, `48rem`, `64rem`, `75rem`, and `90rem`.

## Elevation & Depth

Depth is layered and restrained. Surface contrast and 1px rules do most of the structural work; shadows appear selectively on interactive cards, dialogs, media, or accent-backed regions. Gradients and radial fields are used only where they support an established system diagram or hero atmosphere, never as a generic decorative backdrop.

### Shadow Vocabulary

- **Interactive lift** (`0 18px 45px -28px rgba(56, 189, 248, 0.7)`): Hover emphasis for portfolio cards.
- **Ambient surface** (`0 1rem 2.5rem rgba(2, 8, 23, .18)`): Subtle separation for selected surface treatments.
- **Deep media/dialog** (`0 24px 44px color-mix(in srgb, #050910 56%, transparent)`): Stronger depth reserved for large media and detail surfaces.

**The Layered Surface Rule.** Borders clarify grouping first; shadow should reinforce an existing hierarchy, not create one from nothing.

## Shapes

The form language combines rounded containers with thin documentation rules. Cards and grouped surfaces generally use `0.75rem–1rem` radii, chips and action buttons use pill geometry, and small metadata controls may use a `0.25rem` radius. Borders remain 1px except where a geometric diagram requires a line or a legacy content treatment explicitly carries more weight.

Focus is always visible through a 2px cyan outline with a 4px offset. Rounded controls have generous inline padding and a minimum height near `2.75rem` for touch and keyboard use. Fixed-format evidence and contribution-calendar surfaces use named compact radii so their geometry remains stable without expanding the global radius scale.

## Components

### Buttons

- **Shape:** Pill radius (`999px`) for primary and secondary actions.
- **Primary:** Signal Cyan background, On-Accent Ink text, typically `0.75rem 1.5rem` padding and semibold text.
- **Hover / Focus:** Short color or transform transition; focus uses the global 2px cyan outline and 4px offset. Reduced motion removes transition movement.
- **Secondary / Ghost:** Transparent or surface-backed with a Slate Rule border and muted or ink text; hover shifts toward the accent without becoming a filled primary button.

### Chips

- **Style:** Deep Accent Surface fill with near-white text, or transparent surface with a Slate Rule border and muted text.
- **State:** Chips communicate tags and evidence categories; they are not used as faux metrics or decorative badges.

### Cards / Containers

- **Corner Style:** `0.75rem–1rem` rounded corners.
- **Background:** Slate Surface against Deep Navy, with occasional Deep Accent Surface for selected CTA regions.
- **Shadow Strategy:** Flat at rest where possible; interactive lift or ambient separation only when it clarifies hierarchy.
- **Border:** 1px Slate Rule, shifting to Signal Cyan on hover or selected states.
- **Internal Padding:** Commonly `1.5rem`, expanding to `1.75rem–2.5rem` for feature or project surfaces.

### Inputs / Fields

- **Style:** Use a surface background, 1px Slate Rule border, readable ink, and a rounded control shape consistent with the surrounding route.
- **Focus:** Global 2px Signal Cyan outline with 4px offset.
- **Error / Disabled:** Preserve readable text and a non-color cue; do not rely on a muted border alone to communicate state.

### Navigation

- **Style:** Sticky dark Slate Surface header with a bottom Slate Rule. Navigation text is compact sans; active routes use ink and weight while hover and focus use Signal Cyan.
- **Mobile:** A labelled menu button exposes `aria-expanded`, supports Escape to close, and keeps the hire/contact action discoverable.

### System-boundary diagram

The homepage’s vertical flow diagram is a signature content component. It translates the portfolio thesis into a visible path from user intent and interface, through domain rules and durable state, to a typed integration boundary and connected device behavior. It is conceptual evidence, not a product telemetry display.

### Progressive technical detail

Case studies use labelled sections, diagrams, deep-dive indexes, media stories, and related-content links to let hiring readers move from orientation to implementation reasoning without forcing every visitor through the full technical corpus.

## Do's and Don'ts

### Do:

- **Do** lead with engineering problems, boundaries, decisions, and verified evidence.
- **Do** reuse the semantic tokens in `src/app/globals.css` instead of introducing arbitrary colors.
- **Do** use monospace for short metadata, indexes, labels, and measurement-like information.
- **Do** preserve visible focus, semantic landmarks, meaningful image alternatives, keyboard access, and reduced-motion behavior.
- **Do** vary density between diagrams, prose, media, lists, and quiet spacing while keeping the same field-guide grammar.
- **Do** keep public-safe uncertainty visible rather than filling gaps with invented metrics or chronology.

### Don't:

- **Don't** add generic gradients, neon glows, glassmorphism, fake telemetry, or terminal-command chrome.
- **Don't** turn every section into a repeated icon-plus-heading card grid.
- **Don't** use cyan as decoration on every border or heading; its scarcity gives it meaning.
- **Don't** use monospace for ordinary long-form prose or add unsupported “technical” claims.
- **Don't** introduce employers, clients, dates, metrics, links, testimonials, or confidential details that are not approved in the content sources.
- **Don't** hide essential comprehension behind motion, dialogs, or client-only behavior.
