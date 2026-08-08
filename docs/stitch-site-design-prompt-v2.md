# Google Stitch Prompt — Felix Edrian Ybañez

## Build brief

Design and generate a complete, responsive, accessible personal engineering portfolio for **Felix Edrian Ybañez**.

This is a hiring-oriented portfolio for a real software engineer. It must feel credible, calm, technically literate, and personal—not like a startup landing page, agency template, or futuristic engineering command center.

The primary objective is to help visitors quickly understand Felix’s engineering focus and start a hiring conversation, especially for senior Flutter/Dart and cross-platform systems roles.

## Source-of-truth rules

Treat the following as factual portfolio content. Do not invent additional facts.

Use the companion attachment `stitch-site-content-companion.md` alongside this prompt. This prompt defines the design and editorial brief; the companion defines the approved content model, résumé source, project context, engineering stories, capabilities, and publication boundaries. Preserve the distinction between résumé-supplied facts, deeper SEPIA project material, and approval-gated evidence.

### Approved identity and positioning

- Name: **Felix Edrian Ybañez**
- Working title: **Senior Cross-Platform Systems Engineer**
- Résumé title: **Software Engineer**
- Location: **Cebu, Philippines**
- Short positioning: **Software engineer specializing in Flutter, native integrations, hardware communication, and enterprise software platforms.**
- Professional summary: **Software Engineer with 7+ years of experience building production applications across mobile, web, and desktop platforms. Specialized in Flutter with Dart FFI for native system integration. Experienced in modernizing legacy systems and developing cross-platform applications for enterprise and professional audio solutions.**
- Primary focus: Flutter, Dart, cross-platform applications, application architecture, state ownership, testing, native integration, and connected devices.
- Approved public contact email: `yfelixedrian.work@gmail.com`
- Education: **Bachelor of Science in Computer Engineering, Negros Oriental State University, 2019**
- Core competencies: structured problem solving, AI-assisted development, cross-functional collaboration, system integration, software design, continuous improvement, quality-focused engineering, and ownership/accountability.

The public site currently has no approved GitHub URL, approved LinkedIn URL, résumé PDF, or public media. The companion attachment includes résumé-supplied employment history for the résumé page; render it exactly as supplied there without adding details. Do not invent or display unapproved links as real links. Do not create fake download buttons; omit unavailable actions or use a clearly non-production placeholder in the design only.

The résumé chronology is: Karno Sound (Jan 2024–Jul 2026), Experience Digital (Mar 2023–Nov 2023), Xurpas Inc. (Aug 2022–Feb 2023), Kyocera Document Solutions Philippines (Jul 2021–Aug 2022), and Bluebeans Systems (Jun 2018–Jun 2021). See the companion attachment for the exact supplied responsibilities and project context.

### Verified technology and experience context

Verified in the prepared portfolio material:

- Flutter and Dart
- BLoC/Cubit, streams, immutable application state
- AES70 and OCA Protocol in the SEPIA context
- Binary serialization/deserialization and typed protocol boundaries
- WebSocket-backed repositories and JSON persistence
- Signal-path and matrix modeling
- Gherkin/BDD integration testing
- Flutter/Dart unit, application, widget, and integration testing
- Mocks, fakes, semantic UI identity, Linux hardware test doubles
- Feature-first/domain-oriented architecture modernization
- Rive interaction and animation state management
- GitHub Actions, automated testing, and delivery workflow contribution

Additional approved project-associated experience may be presented carefully and separately from SEPIA:

- Dart FFI and native C++ integration
- Dante Audio Networking
- React, TypeScript, NestJS, Node.js, GraphQL, PostgreSQL, Docker, SQL Server, AngularJS, C#, and enterprise application work

The résumé skill inventory also includes JavaScript, REST APIs, Firebase, Provider, Riverpod, Redux, SQLite, Firestore, MySQL, Git, VS Code, Android, iOS, Web, Windows, macOS, and Linux. Group technologies by project/context and avoid a giant undifferentiated technology wall.

Do not present every technology as part of SEPIA or imply equal depth across all technologies. Use context labels such as **Primary focus**, **Project experience**, or **Working knowledge** where appropriate.

## Voice and credibility

Use a first-person voice on About and Contact pages and a clear editorial voice on case studies. The tone should be:

- Grounded and evidence-based
- Collaborative and precise
- Confident without exaggeration
- Warm, practical, and approachable
- Focused on engineering reasoning rather than technology name-dropping

Prefer: **contributed to**, **worked on**, **helped improve**, **supported**, **investigated**, **maintained**, **collaborated with**, **focused on**, and **made behavior easier to test**.

Never claim or imply that Felix:

- Built an entire product alone
- Single-handedly architected a large system
- Led every layer or owned every decision
- Revolutionized a product or industry
- Is world-class, omnipotent, or an expert in everything
- Achieved unverified metrics, business outcomes, awards, or performance gains

Do not fabricate testimonials, quotations, names, job titles, employers, dates, team sizes, users, customers, revenue, metrics, awards, or client logos. If approved content is unavailable, omit the element rather than generating filler.

## Information architecture

Generate a coherent multi-page site with shared navigation, footer, typography, spacing, and component patterns:

1. **Homepage** — positioning, proof points, featured SEPIA work, selected stories, capabilities, contact CTA.
2. **Projects** — verified project and project-context index.
3. **SEPIA** — the flagship long-form case study.
4. **Capabilities** — engineering problem areas, not a flat list of buzzwords.
5. **Stories** — concise engineering narratives with technical detail.
6. **About** — personal, first-person, professional context.
7. **Résumé** — compact and print-friendly using verified information only.
8. **Contact** — email-first hiring conversation.
9. **Not found** — useful, branded, and consistent with the site.

Prioritize the visual and editorial effort in this order:

1. Felix’s positioning
2. The SEPIA case study
3. Engineering stories and capabilities
4. About, résumé, testimonials if later approved, and contact

Do not give every section the same card-grid treatment. Use hierarchy, whitespace, article layouts, diagrams, lists, and occasional cards deliberately.

## Homepage requirements

The first screen or two must answer:

- Who Felix is
- What kind of software he works on
- What makes his experience distinctive
- What roles or conversations he is open to
- Where visitors can learn more

Use a restrained hero such as:

> Software engineer focused on Flutter, cross-platform applications, and the boundaries between product interfaces, native systems, and connected devices.

Include:

- Eyebrow: `Senior Cross-Platform Systems Engineer`
- Primary action: explore SEPIA
- Secondary action: view capabilities or résumé page
- Short supporting copy about maintainability, testing, collaboration, and real production software
- A simple conceptual boundary diagram
- Featured SEPIA summary
- Three or four proof-oriented engineering themes
- Selected engineering stories
- A clear email/contact CTA

The hero diagram must be editorial and conceptual, with no fake telemetry, charts, terminal panels, status counters, or command-center styling.

## Flagship case study: SEPIA

Use **SEPIA** as the visible public project name. Do not use “SEPIA Client” in visible portfolio copy.

SEPIA is a Flutter application for configuring and controlling professional audio hardware systems. Users compose signal paths, adjust modules, save configurations, and operate connected devices through an interactive dashboard.

The core engineering challenge is that hardware can disconnect, reconnect, change topology, respond asynchronously, or represent routing differently from the UI. The public case study should explain how Felix contributed to making those workflows more predictable without implying sole ownership.

### Approved contribution themes

- Typed application-facing abstractions over hardware communication
- Device discovery, lifecycle coordination, reconnect behavior, state retention, and cleanup
- Repository ownership and online/offline application contracts
- Configuration snapshots, identity matching, conflict classification, and safe recovery
- Visual signal-path composition and deterministic routing conversion
- Layered testing, BDD workflows, semantic UI identity, and hardware-free development paths
- Localized dashboard interaction and animation state

### Case-study structure

Create an editorial reading experience containing:

- Project context and concise summary
- Felix’s contribution, clearly separated from broader team/product scope
- A small project-facts panel using only known facts
- “The problem” section focused on unreliable external systems
- Conceptual architecture overview
- Technical table of contents
- Sections for:
    - Hardware communication boundaries
    - Device lifecycle and state ownership
    - Configuration recovery
    - Visual signal paths and safe routing
    - Testing and hardware-free development
    - Interaction and animation state
    - Decisions, trade-offs, and lessons
- Evidence slots labeled as **planned**, **needs approval**, or **not publicly available**; do not pretend evidence exists
- Interview prompts for engineering discussions
- Related stories and capabilities
- Contact CTA

Use the following simplified architecture illustration where useful:

```text
Flutter UI and feature state
                    ↓
Domain rules and durable application state
                    ↓
Native integration and device communication
                    ↓
Professional audio and hardware systems
```

Label every diagram as conceptual or simplified. Include an adjacent text explanation for accessibility.

### Suggested public case-study framing

> I build reliable software around unreliable hardware.

> A focused case study about preserving user intent, separating volatile device state from durable application state, and making complex hardware workflows safer to change.

Use these outcomes as qualitative, source-backed themes only:

- **Safe recovery:** persisted user intent remained separate from resolved runtime state.
- **Clear boundaries:** UI features could use domain-facing APIs without duplicating protocol and lifecycle rules.
- **Safer change:** layered tests and hardware-free workflows made asynchronous behavior easier to verify.

Additional supported themes include explicit lifecycle ownership and cleanup, deterministic visual-routing conversion, localized interaction/animation state, and project-context architecture modernization. Keep all outcomes qualitative; no metrics are approved.

Do not convert these into percentages, speed improvements, adoption metrics, or business claims.

## Capability and story content

Organize capabilities around engineering problems and visitor value:

- Flutter and Dart application development
- Cross-platform architecture
- Native and hardware integration
- Device lifecycle and state ownership
- Configuration recovery and reliability
- Visual routing and domain modeling
- Testing and quality engineering
- Architecture modernization
- Enterprise and full-stack project experience

Create story previews and detail pages for the prepared narratives:

1. Hardware communication platform
2. Device lifecycle and state ownership
3. Configuration recovery
4. Visual signal paths to safe routing
5. Testing and hardware-free developer workflows
6. Cross-platform architecture modernization
7. Rive interaction and animation performance

Each story should communicate **problem → contribution → reasoning → trade-off → lesson**. Keep implementation details generalized and avoid internal names, source paths, commands, private schemas, and proprietary protocol extensions.

## About, résumé, and contact

### About

Use first-person copy that explains Felix’s interest in the difficult boundaries between application code, native systems, and connected devices. Mention maintainability, testing, practical collaboration, and the kinds of problems he wants to work on next. Do not invent hobbies, personal history, employment chronology, or biographical details.

### Résumé

Create a compact print-friendly résumé page with:

- Name and positioning
- Professional summary
- Core strengths
- Technical skills grouped by context
- Selected projects and contributions
- Employment and education sections only when verified content is supplied

In this project, the supplied résumé includes draft employment and education content. Render the chronology and responsibilities from `stitch-site-content-companion.md` without adding employers, clients, team sizes, awards, metrics, or leadership claims. Keep the résumé print-friendly. Do not render a download control because no approved PDF is available.

Support printing with a clean print stylesheet. Only show a download action when a real approved PDF is available.

### Contact

Use an email-first layout. Display the approved email address and a clear copy/open-mail action. Do not invent social links. The résumé source contains a LinkedIn URL, but its public approval is not confirmed; keep it omitted unless the owner explicitly approves it.

Suggested heading:

> Interested in working on complex cross-platform software?

Mention openness to Flutter/Dart, cross-platform, native integration, hardware/device communication, architecture, testing, and related React/TypeScript/full-stack opportunities.

## Visual system

Use a modern technical editorial style. A dark slate system is encouraged:

- Canvas: `#0F172A`
- Cards/surfaces: `#1E293B`
- Primary text: `#F1F5F9`
- Muted text: `#94A3B8`
- Signal blue accent: `#0EA5E9`
- Sparse warm amber state accent: `#F59E0B`

You may refine the palette, but preserve a calm, high-contrast, readable result.

Use a clean sans-serif such as Inter or Plus Jakarta Sans. Use a monospace face such as JetBrains Mono for technology tags, protocol names, and small technical annotations.

Visual language:

- Thin borders and restrained shadows
- Clear article measure and generous whitespace
- Strong typographic hierarchy
- Subtle hover and reveal states
- Diagrams that explain relationships rather than decorate them
- Occasional warm personal touches without stock photography

Avoid neon gradients, excessive glassmorphism, fake analytics, giant technology walls, repetitive rounded cards, stock developer imagery, and decorative code that has no meaning.

## Reusable UI patterns

Design reusable components or equivalents for:

- Header, desktop navigation, and keyboard-accessible mobile drawer
- Footer and contact CTA
- Buttons, links, breadcrumbs, and section headings
- Project, story, and capability previews
- `TechBadge`
- `ConceptualDiagram`
- `ConfidentialityBanner`
- Facts panel and technical annotations
- Evidence marker and evidence slot
- Table of contents
- Accessible expandable technical deep dives and interview prompts
- Related-content previews
- Empty and unavailable-content states

Components must support long articles, optional fields, missing images, confidential projects, and empty related-content sections without looking broken.

## Confidentiality and publication rules

Do not publish:

- Source code, source paths, repository names, internal class or package names
- Private APIs, commands, hostnames, device identifiers, customer information, credentials, or private URLs
- Unapproved screenshots, recordings, diagrams, configuration files, routing tables, or infrastructure details
- Proprietary protocol extensions or exact internal schemas

Include a small notice on the SEPIA case study:

> Project details and diagrams are intentionally simplified to respect client confidentiality.

## Responsive and accessibility requirements

Design and show intentional states for approximately:

- Desktop: `1440px`
- Tablet: `1024px`
- Mobile: `390px`

Meet WCAG 2.2 AA as the baseline, with AAA contrast where practical for primary body content. Do not use muted text for essential information. Include:

- Semantic heading hierarchy
- Keyboard navigation and visible `2px` focus rings
- Minimum `44px` touch targets
- Accessible labels and descriptions for diagrams
- Keyboard-accessible disclosure controls with expanded state
- Responsive code blocks and diagrams
- Reduced-motion support via `prefers-reduced-motion`
- Mobile navigation and collapsible table of contents
- No interaction that depends on hover alone

## Final instruction

Generate the complete portfolio experience, not only a homepage mockup. Make Felix look capable, thoughtful, collaborative, technically deep, and employable—never omnipotent. Use source-backed content, preserve uncertainty honestly, give SEPIA the strongest editorial treatment, and let the design communicate reliable engineering judgment.
