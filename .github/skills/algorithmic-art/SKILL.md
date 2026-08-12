---
name: algorithmic-art
description: 'Use when creating dynamic SVG or Canvas graphics, generative diagrams, signal-flow visuals, procedural backgrounds, or data-informed illustrations for this portfolio.'
---

# Algorithmic art

Create restrained, explainable visuals that support the engineering story.

## Rules

- Start from the content concept: boundaries, signal flow, state transitions, routing, recovery, or connected systems. Do not add procedural graphics merely to fill space.
- Prefer inline SVG for diagrams and deterministic shapes; use Canvas for dense, animated, or pixel-oriented rendering that SVG cannot handle efficiently.
- Keep graphics deterministic, lightweight, responsive, and visually quiet. Use the project’s semantic tokens rather than arbitrary palettes.
- Provide accessible alternatives: a meaningful `role="img"` and label for informative graphics, visible accompanying text for complex diagrams, and `aria-hidden="true"` for decoration.
- Preserve crisp geometry, adequate contrast, and readable labels at narrow widths. Avoid tiny text, excessive noise, flashing, and fake real-time telemetry.
- Use `viewBox`-based SVG sizing and handle device-pixel-ratio correctly for Canvas. Resize with `ResizeObserver` where needed and clean up animation frames/listeners.
- Respect `prefers-reduced-motion`: freeze or simplify animation, and ensure the static graphic still communicates the concept.
- Keep generated output separate from source content and do not imply that illustrative paths, counts, or measurements are factual evidence.
- Prefer CSS transitions or a static SVG when they tell the story more clearly than a rendering loop.

## Review checklist

- What engineering idea does the visual clarify?
- Can it be understood without motion, color, or hover?
- Is it performant on mobile and safe in server-rendered Next.js code?
- Does the implementation preserve the existing editorial, non-generic visual language?
