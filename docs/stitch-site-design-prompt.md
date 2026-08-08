# Google Stitch Prompt — FEY/systems Portfolio

Design and prototype a complete, polished, responsive personal engineering portfolio for **Felix Edrian Ybañez**.

Position Felix as a **Senior Cross-Platform Systems Engineer** specializing in Flutter, native integrations, hardware communication, and enterprise software platforms.

This is an engineering portfolio, not a generic developer résumé, design portfolio, SaaS landing page, or agency website. It should feel like a premium technical publication: calm, precise, editorial, credible, and systems-oriented.

## Primary positioning

The site should communicate that Felix builds software across application, device, and infrastructure boundaries. Emphasize:

- Flutter and Dart
- Mobile and desktop applications
- Native platform integration
- Dart FFI and C++
- Hardware communication
- Dante Audio Networking
- AES70 and OCA Protocol
- Device discovery
- State management and recovery
- Cross-platform architecture
- Testing and quality engineering
- React and TypeScript as secondary strengths
- NestJS, Node.js, GraphQL, PostgreSQL, Docker, and CI/CD where relevant

Flutter and cross-platform systems engineering must remain the primary identity.

## Design direction

Create a restrained editorial visual system combining technical documentation, engineering case studies, and a premium personal portfolio.

The site should feel:

- Technical
- Mature
- Structured
- Human
- Intelligent
- Calm
- Readable
- Credible

Avoid:

- Neon gradients
- Excessive glassmorphism
- Generic SaaS dashboards
- Stock photography
- Decorative 3D objects
- Fake product screenshots
- Fake metrics or statistics
- Client logos
- Generic marketing language
- Repetitive card grids
- Invented professional or technical claims

When a visual is conceptual rather than an actual product screenshot, label it **Conceptual system illustration** or **Simplified architecture overview**.

## Brand and visual system

Use the wordmark **FEY/systems** and the full name **Felix Edrian Ybañez** where appropriate.

Use a light theme as the default:

- Background: `#F5F7F8`
- Surface: `#FFFFFF`
- Primary text: `#142027`
- Muted text: `#5D6A70`
- Border: `#DBE3E5`
- Accent: `#0D7773`
- Accent surface: `#D8EFEB`
- Technical panel: `#101B1E`

Also provide a dark theme:

- Background: `#0E1518`
- Surface: `#152126`
- Primary text: `#EDF7F4`
- Muted text: `#AABBBC`
- Border: `#2A3C42`
- Accent: `#72D5C7`
- Accent surface: `#193D3B`

Use teal sparingly for active states, links, section markers, diagram boundaries, important annotations, and primary actions.

Use:

- Sans-serif for navigation, headings, labels, buttons, and interface elements
- Refined serif typography for long-form narrative and explanatory content
- Monospace typography for technical metadata, code, and system labels

## Shared site shell

Create a sticky responsive header with:

- `FEY/systems` wordmark
- Projects
- Capabilities
- Stories
- About
- Résumé
- Contact
- Theme toggle

Include active navigation states, subtle borders, restrained backdrop blur, keyboard focus states, and a compact mobile menu.

Create a consistent footer with the wordmark, full name, short positioning statement, navigation links, contact link, résumé link, and a small factual-content note.

## Required pages

Design the following routes:

1. `/` — Homepage
2. `/projects` — Projects index
3. `/projects/[slug]` — Project detail
4. `/capabilities` — Capabilities index
5. `/capabilities/[slug]` — Capability detail
6. `/engineering-stories` — Engineering stories index
7. `/engineering-stories/[slug]` — Engineering story detail
8. `/about` — About
9. `/resume` — Résumé
10. `/contact` — Contact
11. `/404` — Not found

The primary page is the flagship SEPIA project detail page at `/projects/sepia-client`.

## Homepage

Create a strong homepage that answers who Felix is, what he builds, and where visitors should explore next.

### Hero

Use a two-column desktop layout with:

- Label: `01 / SYSTEMS-ORIENTED ENGINEERING`
- Heading: `I build reliable software for systems that get complicated.`
- Supporting copy about application, device, infrastructure, asynchronous systems, hardware communication, state recovery, and product interfaces
- Primary action: `Read the flagship case study ↗`
- Secondary action: `Get in touch`

Add a technical focus panel listing:

- Flutter · Dart
- Hardware communication
- Native integration
- State and recovery
- Architecture · testing
- Platform delivery

### Homepage sections

Include:

- Proof points: engineering stories and technical decisions
- Featured systems: prominent SEPIA project preview
- Capability map: problem-oriented capabilities, not only technology names
- Restrained contact CTA

Use editorial variation instead of a page full of identical cards.

## Projects index

Create a projects page with:

- Label: `PROJECTS`
- Heading: `Selected engineering work`
- Introductory explanation of project overviews and deeper case studies
- Responsive project listing
- Project category, title, summary, tags, and link
- SEPIA as the flagship project

Do not invent additional professional projects. The layout must still work if only one verified project is available.

## SEPIA project detail page

Make this the strongest and most detailed page in the site. Design it as a premium editorial technical case study.

### Hero

Include:

- Breadcrumb: `Projects / SEPIA / Case study`
- `← Back to projects`
- Eyebrow: `FLAGSHIP CASE STUDY`
- Title: `SEPIA`
- Descriptive subtitle about cross-platform control software for connected audio systems, only where source-backed
- Executive overview
- Verified technology tags such as Flutter, Dart, native integration, Dart FFI, C++, hardware communication, Dante Audio Networking, AES70, OCA Protocol, device discovery, and testing

Add a dark conceptual system illustration showing:

```text
Flutter application
        ↓
Application and state layer
        ↓
Native integration boundary
        ↓
Protocol and communication layer
        ↓
Connected audio devices
```

Use thin teal lines, labelled nodes, subtle grid details, platform markers, and a caption stating that confidential implementation details are omitted.

### Project facts

Show a compact facts panel containing only source-backed fields, such as:

- Project type
- Core platform
- Primary focus
- Integration areas
- Evidence level

Never invent dates, team sizes, customers, users, performance numbers, or business outcomes.

### Reading layout

On desktop, use a three-column layout:

1. Sticky table of contents
2. Main article
3. Compact engineering-signals rail

The table of contents should include:

- Context
- Engineering challenge
- Architecture
- Native integration
- Hardware and protocol communication
- State management
- Testing and evidence
- Decisions and trade-offs
- Confidentiality
- Interview prompts

The mobile version should use a collapsible table of contents.

The article should support:

- Long-form prose
- Headings and lists
- Blockquotes
- Syntax-highlighted code blocks
- Technical annotations
- Architecture diagrams
- Evidence markers
- Decision records

Use a comfortable reading width and do not put every section inside a card.

### Case-study sections

Design visual treatments for:

- Context
- Engineering challenge
- Cross-platform architecture
- Native integration
- Dart FFI and C++ boundaries
- Hardware communication
- Dante, AES70, and OCA concepts where verified
- Device discovery
- State management and recovery
- Testing and evidence
- Decisions and trade-offs
- Confidentiality note
- Interview prompts

Testing and evidence may include unit testing, widget testing, integration testing, platform validation, hardware validation, regression prevention, build verification, and manual test workflows. Do not add unsupported counts or percentages.

Use interview prompts such as:

- How did you decide where the Flutter layer should end and native integration should begin?
- How would you test a hardware communication boundary?
- What trade-offs exist when supporting mobile and desktop from a shared codebase?
- How should device discovery and connection state be modeled?
- How would you isolate protocol-specific behavior from application state?
- What would you improve in a redesign?

Make these expandable, but do not fabricate answers.

### End of project page

Add:

- `Continue exploring` related-content section
- Related engineering story
- Related capability
- Another relevant project or topic
- Final CTA: `Interested in the systems behind the interface?`
- Actions: `Get in touch` and `View résumé`

## Capabilities pages

The capabilities index should present engineering problems rather than a technology list.

Use topics such as:

- Cross-platform architecture
- Flutter and Dart systems
- Native platform integration
- Dart FFI and C++
- Hardware communication
- Device discovery
- State management and recovery
- Testing and quality engineering
- Enterprise platform modernization
- React and TypeScript

Each capability should have a title, summary, related tags, and a link to a focused technical essay.

Capability detail pages should include:

- Breadcrumb
- Capability title
- Executive overview
- Why the capability matters
- Technical deep dive
- Architecture or boundary illustration
- Evidence and testing
- Related stories
- Contact CTA

## Engineering stories pages

The stories index should present shorter technical narratives about:

- State recovery
- Device discovery
- Native integration
- Hardware communication
- Testing boundaries
- Cross-platform delivery
- Protocol-aware architecture

Each story should show a category, title, summary, related project, tags, and read link.

Story detail pages should include:

- Breadcrumb
- Story label and title
- Executive overview
- Context
- Technical explanation
- Diagram or annotation
- Testing and evidence
- Lessons and trade-offs
- Related project and capabilities
- Contact CTA

Keep stories more focused and concise than the full project case study.

## About page

Create an editorial About page with the heading:

> I work at the boundaries where software becomes a system.

Include sections for:

- Engineering perspective
- Areas of focus
- Approach to difficult problems
- Cross-platform development
- Native and hardware integration
- Quality and maintainability
- Current direction

Do not invent employment history, dates, companies, titles, metrics, or achievements.

## Résumé page

Create a compact, print-friendly résumé page containing:

- Name and positioning
- Professional summary
- Core strengths
- Technical focus
- Selected project
- Engineering themes
- Verified experience only
- Résumé download action only if a real file exists
- Contact link

## Contact page

Create a simple, professional contact page with:

- Heading: `Let’s talk about complex software.`
- Supporting copy about cross-platform products, native integrations, hardware communication, and maintainable systems
- Verified contact methods only
- Links to résumé and public professional profiles where available
- Conversation topics such as Flutter roles, cross-platform architecture, native integrations, hardware communication, and enterprise platforms

Prefer an email-first experience over a complex form.

## Not-found page

Create a calm 404 page with:

- Heading: `This route does not exist.`
- Short explanation
- Links to Home, Projects, and Contact
- Subtle disconnected-system visual

## Reusable components

Define a consistent design system for:

- Header and mobile navigation
- Footer
- Buttons and links
- Breadcrumbs
- Section headings
- Project, story, and capability cards
- Tags and metadata
- Project hero
- Project facts panel
- Technical annotations
- Architecture diagrams
- Code blocks with copy affordance
- Evidence markers
- Confidentiality notes
- Table of contents
- Expandable interview prompts
- Related-content cards
- Contact CTA
- Empty or unavailable content states

The visual system must support content-driven pages with different titles, summaries, tags, technical sections, diagrams, evidence, confidentiality notes, and related content. It must also support missing optional fields without looking broken.

## Responsive requirements

Generate desktop, tablet, and mobile states.

### Desktop

- Approximately 1440px wide
- Full navigation
- Two-column homepage hero
- Three-column project reading layout
- Sticky table of contents
- Wide diagrams
- Multi-column related content

### Tablet

- Approximately 1024px wide
- Reduced gutters
- Simplified two-column layouts
- Hero visual may move below text
- Narrower or simplified table of contents
- Two-column cards where appropriate

### Mobile

- Approximately 390px wide
- Compact header
- Single-column content
- Expandable navigation
- Collapsible table of contents
- Stacked facts and decision records
- Full-width diagrams
- Horizontal scrolling for wide diagrams and code
- Stacked related content
- Minimum 44px touch targets

Design mobile intentionally rather than simply collapsing desktop layouts.

## Accessibility and interaction

Include:

- WCAG AA contrast
- Semantic heading hierarchy
- Keyboard-accessible navigation
- Visible focus states
- Accessible icon labels
- Diagram text alternatives
- No color-only meaning
- Reduced-motion support
- Readable line lengths
- Accessible expandable sections
- Keyboard-usable code blocks
- Sticky header with subtle scroll compaction
- Active table-of-contents state
- Theme toggle
- Mobile navigation drawer
- Code-block copy action
- Expandable interview prompts

Motion should clarify navigation and hierarchy, not decorate the page.

## Content truthfulness

Treat the design as source-backed and content-driven. Never invent:

- Employment dates
- Job titles
- Team sizes
- User counts
- Revenue
- Performance numbers
- Customer names
- Business outcomes
- Security or compliance claims
- Unsupported technologies
- Proprietary implementation details

Omit unknown fields or use neutral copy such as `Project detail intentionally summarized`.

## Prototype states to generate

Generate these screens and states:

1. Desktop homepage
2. Mobile homepage
3. Desktop projects index
4. Mobile projects index
5. Desktop SEPIA project detail
6. Tablet SEPIA project detail
7. Mobile SEPIA project detail
8. Dark-theme project detail
9. Desktop capabilities index
10. Capability detail
11. Engineering stories index
12. Engineering story detail
13. About
14. Résumé
15. Contact
16. Mobile navigation open
17. Mobile table of contents open
18. Expanded interview prompt
19. Code-block copy state
20. Not-found page

The final result should feel like one coherent technical publication and portfolio. Prioritize clear positioning, readable technical storytelling, evidence, reusable structures, responsive behavior, accessibility, and calm visual confidence.
