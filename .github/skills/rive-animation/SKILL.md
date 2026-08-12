---
name: rive-animation
description: 'Use when adding Rive assets, animated UI transitions, interactive state machines, loading states, hover feedback, or motion systems that must support prefers-reduced-motion.'
---

# Rive and motion

Use animation to communicate state, continuity, and interaction—not to decorate empty space.

## Workflow

1. Identify the state being communicated: loading, active, connected, expanded, recovering, success, or error.
2. Prefer the smallest reliable transition. Existing CSS transitions and keyframes in `src/app/globals.css` are the default; use Rive when a stateful vector animation provides clear value.
3. Keep animation assets local, purposeful, and resilient when they fail to load. The interface must remain understandable without animation.
4. Keep Rive/browser APIs behind a client component and avoid importing them into server-rendered routes unnecessarily.
5. Respect `prefers-reduced-motion: reduce`: disable looping/decorative motion, reduce transforms, and preserve essential state changes through text, color, borders, or layout.
6. Do not animate layout continuously, flash content, or use fake telemetry and command-center effects.
7. Consider performance: pause offscreen or hidden animations, avoid multiple competing loops, and clean up listeners/controllers on unmount.
8. Make interactive animation state keyboard-accessible and expose meaningful state with labels or live regions where appropriate.

## Review checklist

- Is the purpose of the motion clear?
- Does the reduced-motion experience communicate the same state?
- Does the page remain usable before, during, and after asset loading?
- Are focus, contrast, and hit targets preserved?
