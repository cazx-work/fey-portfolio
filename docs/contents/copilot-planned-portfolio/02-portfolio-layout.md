# Portfolio Layout

## Design principle

Present the product as one engineering case study with linked technical stories. The first screen should communicate scope, ownership, and outcomes; deeper sections should let senior engineers inspect the decisions behind those outcomes.

## 1. Overview

### Purpose

Orient the visitor to the commercial product, its hardware-connected context, and the engineering surface area.

### Why it matters

Recruiters need a fast mental model. Engineering managers need to understand whether the work involved meaningful ownership rather than isolated UI implementation.

### Suggested content length

150–250 words, plus three achievement cards.

### Suggested presentation

Hero summary, product boundary diagram, and three metric/evidence cards. Do not lead with screenshots.

### Featured content

- Professional audio control application
- Hardware communication and dynamic topology
- Architecture, testing, performance, and developer tooling ownership

## 2. Product Vision and Technical Scope

### Purpose

Explain what the application enables and why its domain is technically difficult.

### Why it matters

Creates context for every later tradeoff: unreliable hardware, protocol boundaries, signal routing, dynamic configuration, and responsive control surfaces.

### Suggested content length

250–350 words.

### Suggested presentation

A concise system-context diagram showing users, Flutter application, device protocol, test doubles, and hardware.

## 3. System Architecture

### Purpose

Show the major ownership boundaries and how state flows through the system.

### Why it matters

This is the highest-value section for hiring managers and senior engineers. It demonstrates system design, not just feature delivery.

### Suggested content length

500–700 words, with expandable detail.

### Suggested presentation

Layered architecture diagram plus four architecture cards:

1. Repository-owned state and online/offline implementations.
2. Device lifecycle and resource ownership.
3. AES70 protocol and typed SDK boundary.
4. Domain-to-protocol signal-path conversion.

Use a short “decision / tradeoff / outcome” pattern for each card.

## 4. Signal-Path and Configuration Domain

### Purpose

Explain the most distinctive product logic: composing modules, converting routes, grouping controls, and restoring state across hardware changes.

### Why it matters

This cluster demonstrates domain modeling, algorithms, validation, state management, and recovery-oriented design.

### Suggested content length

700–1,000 words total, split into focused subsections.

### Suggested presentation

Interactive or animated data-flow diagram. Use one end-to-end example: drag a dual-width module, convert the resulting path to matrix operations, group compatible controls, save the configuration, then resolve it after a device changes.

### Featured subsections

- Grid dynamic layout engine
- Matrix conversion engine
- Configuration recall and conflict resolution
- Module ganging and propagation semantics

## 5. Engineering Challenges

### Purpose

Frame the work as problems and constraints rather than a list of features.

### Why it matters

Hiring managers assess judgment through constraints, failure modes, and tradeoffs.

### Suggested content length

400–600 words.

### Suggested presentation

Four challenge cards, each with: constraint, decision, failure avoided, and evidence link.

### Challenges to feature

- Dynamic and unreliable hardware
- Non-uniform layouts and routing semantics
- Asynchronous state and feedback loops
- High-frequency UI interaction and rendering

## 6. Quality and Developer Experience

### Purpose

Show how the system was made safe to change and easier for other developers to operate.

### Why it matters

This is strong evidence of technical leadership and leverage beyond individual feature code.

### Suggested content length

500–700 words.

### Suggested presentation

Testing pyramid, BDD flow diagram, key identity contract, and Linux environment lifecycle. Put exact directories and test tooling behind `Read more`.

### Featured content

- Layered unit/application/widget/integration strategy
- Gherkin framework with reusable steps and scenario state
- Semantic KeyService shared by UI and tests
- Hardware-free Linux test environment with tracked process cleanup

## 7. Performance Engineering

### Purpose

Explain how responsiveness was protected while rendering multiple animated, stateful controls.

### Why it matters

Performance work is credible when tied to a concrete workload, ownership boundary, and observable user experience.

### Suggested content length

300–450 words.

### Suggested presentation

Before/after frame-timing or rebuild-scope comparison, supplemented by a state-flow diagram. Avoid generic claims such as “optimized Flutter.”

## 8. Contributions and Ownership

### Purpose

Make the individual contribution legible across architecture, testing, performance, and developer enablement.

### Why it matters

A portfolio reviewer must distinguish personal ownership from team or product capability.

### Suggested content length

250–400 words.

### Suggested presentation

Contribution matrix with columns: area, decision owned, collaboration, evidence, outcome. Include the Copilot-assisted Linux work as reviewed and validated engineering, not as autonomous generation.

## 9. Media and Evidence

### Purpose

Provide visual proof without turning the portfolio into a screenshot gallery.

### Why it matters

Diagrams communicate systems faster; videos prove workflows; screenshots anchor the domain.

### Suggested content length

Minimal captions: 30–60 words per artifact.

### Suggested presentation

One representative artifact per major story, with captions stating what the visitor should notice. Keep raw evidence and additional captures expandable.

## 10. Lessons and Tradeoffs

### Purpose

Show mature reflection on complexity, ownership, and future improvement.

### Why it matters

Senior engineers are evaluated on judgment, not only successful outcomes.

### Suggested content length

350–500 words.

### Suggested presentation

Three columns: decision, benefit, cost. Finish with three concrete improvements: stronger contract/property-based tests, explicit lifecycle state machines, and measurable performance budgets.

## Content rules

- Keep one canonical explanation for each architectural concept and cross-link it elsewhere.
- Feature outcomes and failure modes; summarize class inventories and file lists.
- Put protocol field details, test evidence maps, and edge-case lists behind `Read more`.
- Remove generic technology lists, repeated “Senior Engineering Signals,” and unsupported performance claims.
- Every prominent claim should point to a diagram, workflow, code evidence, test, or measurable outcome.
