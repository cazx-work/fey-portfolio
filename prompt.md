You are the lead product engineer, technical writer, UX designer, and repository architect responsible for building my complete personal engineering portfolio.

You must work directly inside the current repository.

Before making changes, inspect the repository and read all relevant files.

## Source of truth

My professional information and project materials are located in:

SOURCE CONTENT DIRECTORY:

docs/contents

This directory may contain:

- Markdown files
- Text files
- PDFs
- Word documents
- Images
- Screenshots
- Architecture notes
- Résumé files
- Project documentation
- Existing portfolio drafts
- Technical notes
- Exported conversation files

Treat the source-content directory as reference material.

Do not modify or delete files in the source-content directory.

Create a safe internal content inventory from the available files.

If a file cannot be parsed, report it clearly and continue with the remaining files.

---

# Primary objective

Build a production-ready personal portfolio for:

Felix Edrian Ybañez

The portfolio should position Felix as:

Senior Cross-Platform Systems Engineer specializing in Flutter, native integrations, hardware communication, and enterprise software platforms.

The portfolio must not present Felix merely as a Flutter UI developer.

The intended positioning is:

A systems-oriented software engineer who uses Flutter as one of several tools to build cross-platform products, integrate native technologies, communicate with hardware systems, and deliver enterprise software solutions.

---

# Career targeting strategy

The primary target is Flutter employment.

The portfolio must make these strengths immediately visible:

- Flutter
- Dart
- Flutter mobile
- Flutter desktop
- Dart FFI
- Native C++
- Hardware communication
- Dante Audio Networking
- AES70
- OCA Protocol
- Device discovery
- BLoC
- Riverpod
- Cross-platform architecture

The secondary target is React, TypeScript, and full-stack employment.

The portfolio must also provide credible evidence of:

- React
- TypeScript
- NestJS
- Node.js
- GraphQL
- PostgreSQL
- Docker
- SQL Server
- CI/CD
- GitHub Actions
- Enterprise platform modernization

Flutter must remain the primary identity.

React and web technologies must be presented as important secondary strengths and future-pivot capabilities.

---

# Required technology stack

Use this stack unless a strong technical reason requires a documented alternative:

- Next.js using the App Router
- TypeScript
- React
- MDX
- Tailwind CSS
- Zod
- Shiki for code syntax highlighting
- Vitest
- Playwright
- ESLint
- Prettier
- GitHub Actions
- Static generation for public content where possible

Use server components by default.

Use client components only for genuine interactivity.

Do not add a database or CMS.

Do not add authentication.

Do not add unnecessary API routes.

Do not add unnecessary state-management libraries.

Use local MDX content and typed metadata.

---

# Important implementation behavior

You are authorized to implement the complete project instead of merely explaining what should be done.

However, work in logical phases and validate each phase before continuing.

Do not stop after creating a plan.

Do not wait for confirmation between normal implementation phases unless you encounter a destructive action, an ambiguous architectural decision, or missing information that would require inventing facts.

If information is missing, continue implementation with a clearly marked draft or placeholder and record the missing information in:

docs/content-questions.md

Do not fabricate professional information.

---

# Content truthfulness rules

The source-content directory is the factual source of truth.

Never invent:

- Employment dates
- Job titles
- Responsibilities
- Performance metrics
- Revenue
- User counts
- Team sizes
- Client names
- Business outcomes
- Technologies
- Protocol behavior
- Architecture details
- Performance numbers
- Security claims
- Compliance claims

When a claim appears in source materials, preserve its meaning but improve grammar and clarity.

When a detail is uncertain, mark it as:

[VERIFY]

Do not publish [VERIFY] content in the production-facing UI.

If information is missing, use a neutral statement or add the question to:

docs/content-questions.md

Do not create fake metrics such as latency, percentage improvements, adoption numbers, or delivery times.

Do not expose confidential information.

Do not copy proprietary source code into the public portfolio.

Do not expose:

- Credentials
- Tokens
- Private URLs
- Internal hostnames
- Customer data
- Proprietary source code
- Confidential diagrams
- Internal documentation
- Private employee information
- Restricted company or product details

If source materials contain potentially confidential information, summarize it at a high level and record the concern in:

docs/content-questions.md

---

# Content extraction process

First, inspect and catalog all files inside the source-content directory.

Create:

docs/source-content-inventory.md

The inventory must include:

- File path
- File type
- Whether it was readable
- Main topics
- Relevant projects
- Possible confidentiality concerns
- Whether it contains factual portfolio information
- Whether it contains media that can be used publicly

Then extract factual information into the portfolio content model.

Create or update:

docs/portfolio-context.md

This file should contain:

- Personal positioning
- Target roles
- Capability map
- Technology map
- Company history
- Project summaries
- SEPIA details
- Engineering stories
- Verified outcomes
- Unverified details
- Confidentiality restrictions
- Content questions

The extracted content must preserve source accuracy.

---

# Required portfolio structure

Create the following public routes:

- /
- /about
- /capabilities
- /capabilities/[slug]
- /projects
- /projects/[slug]
- /engineering-stories
- /engineering-stories/[slug]
- /resume
- /contact

Create a documentation-style layout for technical project pages.

The site should organize content primarily around capabilities and engineering evidence rather than only chronological employment history.

Companies should appear as supporting context.

---

# Homepage requirements

The homepage must communicate the primary value proposition within approximately sixty seconds.

Implement these sections:

## Hero

Use a factual headline based on the source materials.

The default messaging direction is:

Senior Cross-Platform Systems Engineer specializing in Flutter, native integrations, hardware communication, and enterprise software platforms.

Do not use unsupported claims such as “top one percent,” “world-class,” or “industry-leading.”

## Primary proof points

Show only verified proof points, such as:

- Flutter mobile and desktop delivery
- Native C++ integration through Dart FFI
- Dante and AES70 integration
- Windows, macOS, and Linux support
- Enterprise backend and platform experience
- CI/CD and automated testing

## Featured capabilities

Prioritize:

1. Native and Hardware Integration
2. Cross-Platform Architecture
3. Enterprise Full-Stack Engineering
4. Platform Reliability and Delivery
5. Software Architecture and Modernization

## Featured project

SEPIA should be the primary featured project if the source materials support this.

## Secondary projects

Include other projects only when there is enough verified information.

## Technology landscape

Group technologies by engineering capability rather than displaying a flat logo wall.

## Contact call-to-action

Provide clear contact and résumé actions using verified contact details only.

---

# Capability pages

Create content-driven capability pages for:

- Native and Hardware Integration
- Cross-Platform Architecture
- Enterprise Full-Stack Engineering
- Platform Reliability and Delivery
- Software Architecture and Modernization

Each capability page should contain:

- Capability summary
- Why the capability matters
- Relevant technologies
- Supporting projects
- Supporting engineering stories
- Verified evidence
- Related content

The page should explain engineering problems solved, not just list technologies.

---

# Project pages

Create content-driven project pages with this structure:

- Project title
- Company and domain
- Project summary
- Business or product context
- My role
- Responsibilities
- Platforms
- Technologies
- Architecture
- Technical challenges
- Key decisions
- Tradeoffs
- Testing strategy
- Delivery and CI/CD
- Outcomes
- Lessons learned
- Confidentiality note where necessary
- Related capabilities
- Related engineering stories

The SEPIA project should receive the deepest treatment because it is the primary differentiator.

---

# SEPIA requirements

Use all verified SEPIA information found in the source-content directory.

Organize SEPIA around the following possible topics where supported by evidence:

- Hardware communication platform
- Dart FFI and native C++ integration
- Dante Audio Networking
- AES70 and OCA protocol integration
- Device discovery
- Device lifecycle management
- State synchronization
- Configuration recovery
- Cross-platform desktop support
- Flutter architecture
- BLoC architecture
- Packaging
- Automated testing
- GitHub Actions
- CI/CD

Do not assume every topic is confirmed.

Only create a topic when the source materials support it.

If a topic appears relevant but lacks enough detail, create a placeholder content section and add a question to:

docs/content-questions.md

---

# Engineering stories

Create engineering stories from the strongest verified technical evidence.

Possible stories include:

- Hardware Communication Platform
- Dart FFI and Native C++ Integration
- Dante Integration
- Device Discovery Architecture
- Cross-Platform Packaging
- Legacy Platform Modernization
- Enterprise State Management
- CI/CD and Release Engineering

Each story should include:

- Overview
- Context
- Problem
- Constraints
- My responsibility
- Architecture
- Technical challenges
- Decisions
- Tradeoffs
- Testing strategy
- Outcome
- Lessons learned
- Related projects
- Related capabilities

Do not create artificial technical depth where the source materials do not support it.

---

# Content model

Use MDX with typed frontmatter and Zod validation.

Create separate content collections or equivalent typed loaders for:

- Capabilities
- Projects
- Engineering stories
- Engineering notes

Each item should support appropriate metadata such as:

- title
- slug
- summary
- description
- featured
- order
- technologies
- capabilities
- companies
- platforms
- draft
- date
- seoTitle
- seoDescription
- confidentiality

Draft content must not appear in production navigation, sitemap, or search results.

---

# Design direction

Create a polished, technical, documentation-inspired visual system.

Visual references may include the general qualities of:

- Stripe documentation
- Vercel documentation
- GitBook
- Linear

Do not copy their branding.

The portfolio should feel like:

- An engineering field guide
- A systems architecture documentation site
- A polished product engineering showcase

Use:

- Strong typography
- Clear information hierarchy
- Restrained color palette
- Light and dark themes
- Technical labels
- Technology badges
- Architecture diagrams
- Code examples
- Subtle motion
- Generous whitespace

Avoid:

- Excessive gradients
- Excessive glassmorphism
- Unnecessary animations
- Large walls of technology logos
- Generic developer portfolio clichés
- A visual style that makes Flutter look secondary

---

# Interaction requirements

Implement only interactions that improve comprehension.

Required:

- Responsive navigation
- Accessible theme toggle
- Mobile navigation
- Expandable technical sections where useful
- Copyable code blocks
- Technical table of contents
- Anchor links
- Previous and next story navigation where appropriate

Optional, only if justified by the implementation:

- Command palette
- Project filtering
- Interactive architecture diagrams
- Project carousel

Do not make a carousel the only way to access project content.

All core information must be accessible through normal pages and direct links.

Every interactive feature must:

- Work with keyboard navigation
- Have visible focus states
- Support Escape where appropriate
- Respect reduced-motion preferences
- Preserve usable behavior on mobile
- Avoid unnecessary global state

---

# Architecture diagrams

Use static SVG or Mermaid by default.

Create diagrams only from verified architecture information.

Every diagram must have:

- A title
- An accessible description
- A textual explanation
- Mobile-friendly rendering
- Light and dark theme support

Use React Flow only if interaction genuinely helps explain the system.

Do not use interactive diagrams merely for visual novelty.

---

# Code examples

Create only illustrative code examples unless public source code is explicitly available.

Possible examples:

- Conceptual native C++ API
- Conceptual Dart FFI declaration
- Flutter abstraction around native functionality
- State-management structure
- CI/CD workflow structure

Clearly label illustrative examples.

Never include secrets or proprietary production code.

---

# SEO requirements

Implement:

- Page titles
- Meta descriptions
- Canonical URLs
- Open Graph metadata
- Social metadata
- Sitemap
- Robots file
- Breadcrumb structured data where appropriate
- Person structured data where appropriate
- Article structured data for engineering stories where appropriate

Do not include unsupported claims in structured metadata.

Exclude draft content.

---

# Accessibility requirements

Audit and implement:

- Semantic HTML
- Correct heading hierarchy
- Keyboard navigation
- Visible focus states
- Accessible buttons and links
- Accessible mobile menu
- Accessible dialogs
- Reduced-motion support
- Sufficient color contrast
- Text alternatives for diagrams
- Usable code blocks on mobile
- Appropriate touch target sizes

---

# Testing requirements

Set up and run:

- Type checking
- ESLint
- Prettier check
- Unit tests with Vitest
- Browser tests with Playwright
- Production build

Add tests for:

- Homepage rendering
- Project directory
- SEPIA project route
- Capability route
- Mobile navigation
- Theme toggle
- Code-copy interaction
- Draft content exclusion
- Not-found page
- Basic metadata

---

# GitHub Actions requirements

Create a workflow that runs on pull requests and pushes to the main branch.

The workflow must run:

1. Dependency installation.
2. Formatting check.
3. Linting.
4. Type checking.
5. Unit tests.
6. Production build.
7. End-to-end smoke tests.

Do not add deployment secrets.

Create documentation explaining how deployment can be connected later to Vercel or Cloudflare.

---

# Documentation files to create

Create and maintain:

- README.md
- docs/source-content-inventory.md
- docs/portfolio-context.md
- docs/content-questions.md
- docs/architecture.md
- docs/content-authoring.md
- docs/deployment.md
- docs/implementation-report.md

The implementation report must document:

- What was implemented
- Which files were created
- Which source materials were used
- Which claims were excluded
- Which placeholders remain
- Which validation commands were run
- Whether validation passed
- Recommended next steps

---

# Execution sequence

Follow this sequence:

## Step 1 — Inspect

Inspect the repository and source-content directory.

Do not modify source-content files.

## Step 2 — Inventory

Create the source-content inventory and identify factual, public, and confidential information.

## Step 3 — Bootstrap

Initialize or adapt the Next.js application.

## Step 4 — Create context

Create the portfolio context and content questions.

## Step 5 — Create content model

Implement typed MDX content loading and validation.

## Step 6 — Create design system

Implement the global layout, theme, navigation, typography, cards, buttons, and tags.

## Step 7 — Create pages

Implement homepage, capability pages, project pages, engineering story pages, résumé, about, and contact.

## Step 8 — Implement SEPIA

Create the strongest and most complete factual SEPIA project experience.

## Step 9 — Add technical enhancements

Add code blocks, diagrams, table of contents, and selective interaction.

## Step 10 — Add SEO and accessibility

Implement metadata, sitemap, robots, structured data, responsive behavior, and accessibility improvements.

## Step 11 — Add tests and CI

Implement tests and GitHub Actions.

## Step 12 — Validate

Run all checks and fix errors.

## Step 13 — Report

Create docs/implementation-report.md with a complete implementation summary.

---

# Final validation commands

Run the appropriate commands for the selected package manager.

At minimum, run:

- Formatting check
- Lint
- Type check
- Unit tests
- Production build
- End-to-end smoke tests

Do not claim success unless the commands actually pass.

At the end, report:

1. Commands run.
2. Commands passed.
3. Commands failed.
4. Files created.
5. Files modified.
6. Remaining content questions.
7. Potential confidentiality issues.
8. Recommended manual review items.
9. How to start the development server.
10. How to build the project for production.

Begin now by inspecting the repository and the source-content directory.

Do not delete existing files.

Do not modify the source-content directory.

Proceed with implementation after the initial inspection unless a destructive or irreversible decision is required.
