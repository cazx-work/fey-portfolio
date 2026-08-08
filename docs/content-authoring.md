# Content authoring

1. Start with source evidence in `docs/contents`.
2. Separate factual content from planning recommendations.
3. Do not add employment facts, metrics, technologies, client names, or outcomes unless verified.
4. Generalize internal names, source paths, commands, network details, and product-sensitive behavior.
5. Use high-level architecture diagrams and clearly label illustrative code.
6. Record missing information in `docs/content-questions.md`; never publish `[VERIFY]` text.
7. Keep entries concise, outcome-led, and organized around engineering decisions.

The current public seed entries live in `src/lib/content.ts`. MDX/Zod can be introduced when the approved content inventory is ready.

## Portfolio content dossiers

The editorial source is organized into three larger dossiers:

- `docs/contents/sepia-content-dossier.md` — SEPIA mini-site and full case-study content.
- `docs/contents/capabilities-content-dossier.md` — capability pages and visitor-value framing.
- `docs/contents/stories-content-dossier.md` — long-form engineering stories derived from the journals.

Each dossier has an **Executive content** layer and a **Technical deep-dive** layer. The homepage mini-site should use the executive layer first and route interested visitors to the deeper layer.

## Journal and evidence workflow

Files in `docs/contents/journals/` are the source corpus for technical claims. They may be used to draft public content, illustrative code, diagrams, photo captions, and video narratives, but they are not automatically publication-approved.

For every proposed photo, video, diagram, or code sample, record the story or capability it supports, its approval status, its redaction status, and the specific engineering point it proves. Do not publish production code, private identifiers, commands, schemas, source paths, credentials, hostnames, or unapproved media.
