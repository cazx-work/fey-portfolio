# Professional Projects

Use this directory for professional project dossiers that document work completed as part of an employment or client engagement. These projects are separate from personal projects and should preserve the relevant company or product context without overstating individual ownership.

SEPIA remains the flagship case study. Supporting professional projects should use a similar evidence-led structure and technical depth, while keeping their own product problem, engineering decisions, and publication boundaries distinct.

Each project should begin with frontmatter:

```yaml
---
type: professional-project
slug: project-slug
title: Project title
project: Employer or approved client context
visibility: public
status: published
featured: false
tags: TypeScript, Systems Design
---
```

Then include:

- `## Executive Content` for the product context, problem, contribution, verified outcomes, and key takeaway.
- `## Technical Deep-Dive` for architecture, system boundaries, failure paths, tradeoffs, testing, and public-content limits.

## Writing rules

- Identify the employment or client context only when publication is approved.
- Describe personal contribution precisely; distinguish contributed, implemented, supported, and led.
- Lead with the real product or operational problem, not a technology list.
- Explain the system boundaries, state transitions, failure paths, and tradeoffs behind the work.
- Prefer architectural and behavioral outcomes when quantitative evidence is unavailable.
- Do not invent metrics, users, timelines, ownership, technologies, customer details, or business results.
- Generalize private schemas, source paths, service names, deployment topology, identifiers, credentials, and operational terminology.
- Keep screenshots, diagrams, recordings, code examples, and links behind explicit approval boundaries.
- Mark unapproved or incomplete dossiers as `visibility: private` and `status: draft`.
- Do not place draft or private claims in public navigation, metadata, summaries, or project listings.

## Current dossiers

- `availbld.md` — public supporting case study from Experience Digital.
- `fast.md` — public supporting case study from Experience Digital; OCR, governed search, and cross-platform document workflows.
- `qpro.md` — public supporting case study from Experience Digital; synchronized queue intake, teller operations, and lobby guidance.
- `awh-app.md` — private draft; requires publication and contribution confirmation before release.
