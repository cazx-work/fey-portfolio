---
name: theme-factory
description: "Use when creating or revising dark and light visual themes, CSS variables, Tailwind CSS v4 color tokens, contrast rules, or component state colors for this portfolio."
---

# Theme Factory

Create a coherent token system before styling individual components.

## Workflow

1. Inspect `src/app/globals.css` and reuse the existing semantic tokens: `--bg`, `--surface`, `--ink`, `--muted`, `--line`, `--accent`, `--accent-soft`, and `--accent-glow`.
2. Define semantic roles, not component-specific colors: page background, raised surface, primary text, secondary text, divider, accent, focus ring, success, warning, and error.
3. Keep dark and light themes structurally equivalent. Change values, not meaning or component markup.
4. Validate normal text, large text, focus indicators, disabled states, links, borders, and controls for contrast. Never communicate meaning through color alone.
5. Use Tailwind CSS v4 utilities with CSS variables, for example `bg-[var(--surface)]`, `text-[var(--muted)]`, and `border-[var(--line)]`. Avoid introducing a `tailwind.config` solely to store one-off colors.
6. Prefer subtle surface separation and borders over gradients. Reserve accent glow for a small, purposeful state.
7. Test hover, focus-visible, active, disabled, empty, loading, and error states in both themes.

## Output expectations

- Explain the token roles and intended contrast hierarchy.
- Keep token names stable and semantic.
- Include a reduced-motion note when theme changes animate.
- Do not invent a separate visual language from the dark editorial engineering system.
