# Architecture

- Next.js App Router with server-rendered pages and static params for content routes.
- `src/lib/content.ts` is the current typed local content model used by the homepage mini-site and project routes.
- `docs/contents/` is the editorial content layer. Dossiers separate executive summaries from technical deep dives; `docs/contents/journals/` remains the source evidence corpus.
- `src/components` contains the shell and reusable visual primitives.
- Public routes are file-system routes under `src/app`.
- No database, CMS, authentication, or API routes are used.
- Draft or unverified information is not rendered as a production claim.
- The visual system uses CSS variables for light/dark themes and Tailwind utilities for layout.

A future content phase can replace the typed seed model with MDX files and Zod frontmatter validation without changing route contracts. The dossiers establish hierarchy, evidence, and confidentiality rules before that migration.
