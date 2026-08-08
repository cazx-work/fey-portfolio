---
name: shadcn-ui
description: "Use when designing or implementing accessible React UI with Radix primitives, shadcn/ui patterns, Lucide icons, Tailwind CSS, dialogs, menus, disclosures, tabs, or form controls."
---

# Accessible component patterns

Use shadcn/ui as a pattern library, not as a reason to replace the portfolio’s visual language.

## Rules

- Check existing components first: `src/components/card.tsx`, `src/components/section-heading.tsx`, `src/components/site-shell.tsx`, and `src/components/portfolio/technical-deep-dive.tsx` already establish local patterns.
- Prefer semantic HTML and native controls when they provide the required behavior. Use Radix primitives for complex interaction contracts such as dialogs, popovers, menus, tabs, and disclosure when needed.
- If adding Radix or shadcn/ui dependencies, confirm the package is actually needed and preserve the server/client boundary. Interactive primitives belong in focused `'use client'` components.
- Use Lucide icons only when an icon improves recognition. Icons must be sized consistently, have `aria-hidden="true"` when decorative, and never replace an accessible text label. Do not mix arbitrary Unicode symbols and icon styles in a new control family.
- Preserve keyboard navigation, focus trapping for modal dialogs, escape handling, visible `:focus-visible` styling, correct heading structure, and labelled relationships.
- Use `aria-expanded`/`aria-controls` for disclosures and `aria-current` for current navigation. Prefer native `<dialog>` when it meets the requirement.
- Keep surfaces, borders, radii, spacing, and focus colors tied to the project tokens. Do not import a generic shadcn theme wholesale or add default gradients.
- Test narrow layouts, long labels, keyboard-only operation, reduced motion, and screen-reader names.

## Implementation note

This project currently does not list Radix, shadcn/ui, or Lucide in `package.json`. Treat them as optional dependencies and do not claim they are available until installed.
