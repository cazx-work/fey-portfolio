# UI/UX Audit Command Prompt Template

Copy and adapt the prompt below when requesting a focused UI/UX audit.

```text
/ui-ux-pro-max Audit and improve [PAGE OR FEATURE] in this project.

Do not edit files yet. Inspect the implementation and return an audit only. After the audit, wait for approval before modifying anything.

## Scope

Inspect:

- `[PRIMARY FILE OR ROUTE]`
- `[RELATED COMPONENT DIRECTORY OR FILES]`
- `[STYLESHEET OR DESIGN TOKENS]`
- `[DATA OR CONTENT SOURCE]`
- `[ARCHITECTURE DOCUMENTATION]`
- `[CONTENT OR PRODUCT CONTEXT]`

Also locate and inspect the implementation of `[HEADER / APP BAR / NAVIGATION / OTHER SHARED UI]` wherever it is defined.

## Primary objective

The main goal is to `[REMOVE REDUNDANCY / IMPROVE WAYFINDING / CLARIFY THE CTA / IMPROVE ACCESSIBILITY / OTHER GOAL]`.

Pay particular attention to repetition in:

- Content and messaging
- Navigation and links
- Calls to action
- Headings, labels, metadata, badges, and helper text
- Cards, borders, icons, and decorative elements
- Desktop and mobile variants
- Accessible names, tooltips, and ARIA attributes

Prefer removing, merging, shortening, renaming, or relocating existing content over adding new UI.

## Product and content goals

The interface should quickly communicate:

- `[GOAL OR MESSAGE 1]`
- `[GOAL OR MESSAGE 2]`
- `[GOAL OR MESSAGE 3]`
- `[PRIMARY USER ACTION]`

## Existing visual language

Use the project’s existing visual language. Preserve and reuse:

- `[DESIGN TOKEN OR CSS VARIABLE 1]`
- `[DESIGN TOKEN OR CSS VARIABLE 2]`
- `[DESIGN TOKEN OR CSS VARIABLE 3]`
- `[TYPOGRAPHY / SPACING / COMPONENT CONVENTIONS]`

Do not introduce a new visual direction unless the existing system cannot support the required improvement.

## Skills and references

Use these project skills where relevant:

- `[SKILL NAME]`
- `[SKILL NAME]`
- `[SKILL NAME]`

## Evaluate

1. First-screen hierarchy and clarity
2. Navigation and wayfinding
3. Primary and secondary calls to action
4. Information hierarchy and scanning behavior
5. Content redundancy and unnecessary repetition
6. Visual hierarchy, typography, spacing, borders, and surfaces
7. Responsive behavior at approximately `[NARROW WIDTH]`, `[TABLET WIDTH]`, and `[DESKTOP WIDTH]`
8. Keyboard navigation and visible focus states
9. Semantic HTML and heading hierarchy
10. Contrast and non-color state communication
11. Reduced-motion behavior
12. Content accuracy, credibility, and product constraints
13. Conversion or task completion without unnecessary persuasion

## Important constraints

- Do not invent `[METRICS / TESTIMONIALS / CUSTOMERS / AWARDS / LINKS / CLAIMS]`.
- Do not expose draft, private, or non-public content.
- Do not bypass `[PUBLICATION FILTER / DATA ACCESS LAYER / CONTENT REPOSITORY]`.
- Preserve existing routes and architecture.
- Keep `[SERVER COMPONENTS / STATIC RENDERING / EXISTING STATE MODEL]` as the default.
- Use client-side code only when browser state or effects are required.
- Preserve `prefers-reduced-motion` support.
- Reuse existing components before creating new ones.
- Do not add dependencies unless clearly necessary.
- Avoid `[FORBIDDEN VISUAL PATTERN 1]`, `[FORBIDDEN VISUAL PATTERN 2]`, and `[FORBIDDEN VISUAL PATTERN 3]`.
- Do not modify files during the audit.
- Do not generate a patch until approval is given.

## Required output

### 1. Executive summary

- State the current condition of `[PAGE OR FEATURE]`.
- Identify the three most important problems.
- State the single most important user action or outcome.

### 2. Prioritized findings

Use these priorities:

- Blocker
- High
- Medium
- Low

For every finding include:

- Priority
- Exact file path and line number, or component/symbol
- Problem category
- What is wrong or repeated
- User impact
- Recommended action: Remove, merge, shorten, rename, relocate, retain, or redesign
- Change type: Content, layout, styling, interaction, accessibility, or code

### 3. Detailed `[APP BAR / NAVIGATION / COMPONENT]` review

- List each item and its purpose.
- Mark each item as Essential, Overlapping, Unclear, or Unnecessary.
- Identify duplication with surrounding content.
- Recommend the smallest effective final structure.
- Evaluate desktop, mobile, keyboard, and screen-reader behavior.

### 4. Information architecture review

- Describe the current hierarchy.
- Identify sections or elements that repeat another section.
- Recommend the minimum structure needed to achieve the stated goals.

### 5. Recommended changes

- Recommend minimal component and layout changes.
- Identify components to reuse.
- Identify content or controls to remove, merge, simplify, or relocate.
- Do not add new sections unless existing sections cannot perform the required job.

### 6. Improved microcopy

Provide concise replacement copy for redundant:

- Headings
- Navigation labels
- Buttons
- Links
- Helper text
- Empty or error states, if relevant

Ensure every CTA has a distinct purpose. Avoid hype and unsupported claims.

### 7. Accessibility and responsive review

Include findings for:

- Semantic structure
- Heading order
- Keyboard access
- Focus behavior
- Screen-reader naming
- Contrast
- Target sizes
- Reduced motion
- Narrow-width overflow and layout behavior

### 8. Implementation plan

Separate:

- Required fixes
- Optional polish

Order the work by user impact and implementation cost.

### 9. Smallest high-value changes first

List no more than five changes. Prioritize removal, consolidation, and clarification over additions.

### 10. Final verdict

- What should be removed?
- What should be merged?
- What should remain?
- What issues require approval or product decisions?
- What redundancy, if any, would remain after implementation?

After returning the audit, wait for approval before modifying files.
```

## Quick usage notes

Replace every `[PLACEHOLDER]` before sending the prompt. For a narrow audit, remove sections that are not relevant rather than adding more scope. Keep the primary objective measurable, such as “remove duplicated messaging between the app bar and hero” or “make the primary hiring CTA unambiguous.”
