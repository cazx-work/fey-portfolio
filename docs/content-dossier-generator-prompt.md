# Engineering Portfolio Dossier Generator Prompt

Copy and paste the prompt below into GitHub Copilot Chat when you want to generate publication-quality dossier content.

---

## Prompt

You are a Principal Software Architect, Staff Software Engineer, Engineering Manager, technical writer, and technical recruiter. Your task is to transform the engineering dossiers and journal material in this repository into publication-quality portfolio content.

Write with the clarity, structure, narrative quality, and technical depth of a strong Medium Engineering article. The content should demonstrate engineering ownership, architectural judgment, decision-making, tradeoffs, problem solving, reliability thinking, and user or business value. It must remain factually grounded and must not invent achievements.

## Primary objective

Create a reusable content library for the engineering portfolio.

Create one main output folder:

```text
docs/generated-dossiers/
```

Inside it, create one subfolder for each dossier:

```text
docs/generated-dossiers/
├── capabilities-content-dossier/
├── sepia-content-dossier/
└── stories-content-dossier/
```

Reuse the dossier source filenames as the subfolder names. Do not rename the dossiers unless the repository contains a clear, approved alternative.

Within each dossier subfolder, create one Markdown file for each meaningful topic, capability, project, or engineering story identified in that dossier. Use stable, descriptive filenames such as:

```text
docs/generated-dossiers/stories-content-dossier/
├── hardware-communication-platform.md
├── configuration-recovery.md
├── device-lifecycle-management.md
└── ...
```

Each generated Markdown file must contain both of these layers in the same file:

1. `## Executive Content`
2. `## Technical Deep-Dive`

The executive layer is used for story cards, carousel slides, portfolio tiles, homepage highlights, recruiters, hiring managers, founders, and non-specialist readers. The technical layer is used for the full article, senior engineering review, architecture discussion, and technical interviews.

Also create a dossier-level `README.md` in each subfolder that briefly indexes the generated topic files and explains how the executive and technical layers are intended to be used.

Example structure:

```text
docs/generated-dossiers/
├── capabilities-content-dossier/
│   ├── README.md
│   ├── native-hardware-integration.md
│   ├── cross-platform-architecture.md
│   ├── state-recovery-resilience.md
│   └── ...
├── sepia-content-dossier/
│   ├── README.md
│   └── sepia.md
└── stories-content-dossier/
    ├── README.md
    ├── hardware-communication-platform.md
    ├── configuration-recovery.md
    ├── device-lifecycle-management.md
    └── ...
```

## Source-of-truth rule

Before writing anything:

1. Inspect the repository structure.
2. Read the relevant dossier source file under `docs/contents/`.
3. Read all relevant journals under:

```text
docs/contents/journals/
```

4. Use the journals as the primary source of truth for engineering decisions, constraints, failures, iterations, tradeoffs, lessons learned, and technical behavior.
5. Use the dossier files as the editorial map for what should be presented.
6. Use source code only to validate or enrich claims when journal evidence is incomplete. Never replace journal evidence with assumptions inferred from code.
7. Read `docs/content-questions.md`, `docs/portfolio-context.md`, and relevant confidentiality guidance before publishing claims.

Do not modify the source dossiers or journals. They are reference material.

If a source file cannot be read, report it and continue with the remaining sources. Do not silently omit it.

## Factual and confidentiality rules

Do not invent or imply:

- employment dates or job titles;
- team sizes, budgets, customers, revenue, adoption, or user counts;
- performance improvements or numerical outcomes without evidence;
- ownership of work that the sources describe only as collaborative;
- technologies, protocols, APIs, architecture, or operational behavior not supported by the sources;
- production deployment, security, compliance, or reliability claims without evidence.

Use `contributed` when the source describes collaborative work. Use `owned`, `led`, `designed`, or `implemented` only when the source clearly supports that level of responsibility.

Do not publish:

- credentials, tokens, private URLs, internal hostnames, or customer data;
- proprietary source code, production schemas, private commands, or private identifiers;
- unreleased features or unapproved screenshots, recordings, diagrams, or media;
- internal class names, package names, repository paths, or confidential product details.

Generalize or redact proprietary details. If a fact is important but not verified, write a neutral version or record it as a follow-up question rather than displaying `[VERIFY]` in publication-ready prose.

Do not create fake metrics. If no metric is available, describe the architectural or behavioral outcome without a number and explicitly avoid unsupported quantitative claims.

## Required content for every topic file

### `## Executive Content`

Write 500–1,000 words, suitable for a 1–3 minute reading experience.

Use these subsections:

- `### Overview` — What was built or improved?
- `### The Challenge` — What problem existed and why did it matter?
- `### Why It Was Difficult` — Explain constraints, uncertainty, failure modes, and competing concerns in accessible language.
- `### The Approach` — Explain the major engineering decisions without overwhelming the reader with implementation details.
- `### Results` — Describe verified technical, user, operational, or business outcomes. Do not invent metrics.
- `### Key Takeaways` — Explain why the work demonstrates senior engineering judgment.

The executive layer must be understandable without knowledge of the codebase. Avoid leading with class names, method names, file paths, package names, or dense protocol terminology. Technologies may be mentioned when they help explain the decision, but the narrative must focus on the problem, value, constraints, choices, and outcome.

Write it like a polished portfolio case study, not a résumé bullet list.

### `## Technical Deep-Dive`

Write a substantial Medium-style engineering article. Aim for 2,500–5,000 words when the available source material supports it. Do not add filler to reach a word count; depth and accuracy are more important than length.

Use these subsections where supported by the source material:

- `### Background`
- `### Problem Statement`
- `### Existing Architecture`
- `### Investigation`
- `### Evaluated Solutions`
- `### Final Architecture`
- `### Implementation Details`
- `### State and Data Flow`
- `### Error Handling and Reliability`
- `### Performance and Scalability`
- `### Challenges and Edge Cases`
- `### Results`
- `### Lessons Learned`
- `### Interview Discussion Topics`
- `### Confidentiality Note`

The deep dive must explain:

- what problem existed;
- why the problem was difficult;
- how the issue was investigated;
- which assumptions failed;
- what alternatives were considered;
- why the selected approach was chosen;
- how responsibilities and ownership were divided;
- how data and state move through the system;
- how errors, cancellation, recovery, cleanup, and partial failure are handled;
- what tradeoffs were accepted;
- what evidence supports the results;
- what should be improved next.

Include at least three Mermaid diagrams when the material supports them. Prefer diagrams that explain architecture or reasoning rather than decorative diagrams. Useful diagram types include:

- component or layered architecture diagrams;
- state or data-flow diagrams;
- sequence diagrams for asynchronous workflows;
- recovery or failure-path diagrams;
- before-and-after responsibility maps.

Every diagram must use generalized, publication-safe labels. Do not reproduce private production schemas, proprietary protocol layouts, credentials, internal hostnames, or confidential identifiers.

Include exactly 10 senior-level interview discussion topics at the end of the technical section when the topic is substantial enough to warrant them. These should be questions that reveal architectural judgment, not trivia.

## Writing style

Write in a confident, precise, human voice. The engineer should sound like someone presenting the work in a Staff Engineer interview while still being readable to a product leader.

Prefer:

- clear narrative progression;
- concrete constraints;
- explicit ownership maps;
- evidence-backed outcomes;
- tradeoffs stated plainly;
- failure paths and recovery behavior;
- domain language explained before it is used;
- short paragraphs and informative headings;
- active voice.

Avoid:

- generic technology lists;
- résumé-style fragments;
- vague claims such as “highly scalable” or “best-in-class”;
- unsupported words such as “revolutionary,” “seamless,” or “zero downtime”;
- code summaries without design reasoning;
- invented metrics;
- excessive jargon;
- confidential implementation details;
- repeating the same paragraph in both layers.

The executive layer should answer: “Why should I care?”

The technical layer should answer: “How did it work, why was it designed this way, and what would I challenge in an interview?”

## Topic selection

Use the source dossiers to determine the generated files.

For `stories-content-dossier.md`, create a separate topic file for each engineering story, such as hardware communication, configuration recovery, device lifecycle, visual routing, testing infrastructure, architecture modernization, and interaction performance.

For `capabilities-content-dossier.md`, create a separate topic file for each capability, such as native and hardware integration, cross-platform architecture, state and resilience, visual systems, testing and developer enablement, architecture modernization, interaction performance, and enterprise product engineering. Keep project-specific claims tied to the evidence that supports them.

For `sepia-content-dossier.md`, create a focused SEPIA case-study file covering the product context, contribution boundaries, architecture, recovery, routing, lifecycle, testing, and approved public evidence. Do not imply that every listed subsystem was solely owned by the engineer.

If a topic lacks enough evidence for a full article, create the file with a concise, accurate treatment and record the limitation in its confidentiality or evidence note. Do not fabricate missing detail.

## Final quality check

Before finishing:

1. Confirm every output is under `docs/generated-dossiers/`.
2. Confirm there is one subfolder per dossier.
3. Confirm every topic file contains both `## Executive Content` and `## Technical Deep-Dive`.
4. Confirm each dossier has a `README.md` index.
5. Confirm all claims are grounded in `docs/contents/journals/` and the approved context files.
6. Search the generated content for private identifiers, credentials, internal paths, unsupported metrics, and unresolved placeholders.
7. Remove repetition between the executive and technical layers while preserving the same factual narrative.
8. Ensure Mermaid syntax is valid and diagrams use safe generalized labels.
9. Report which files were created and identify any unresolved content questions.
10. Do not modify source dossiers or journals.

Do not stop after making a plan. Inspect the sources, create the folders and files, write the content, and validate the result in the repository.
