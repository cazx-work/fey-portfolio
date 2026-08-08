# Stitch Site Content Companion — Felix Edrian Ybañez

Use this document together with `stitch-site-design-prompt-v2.md`. The Stitch prompt defines the visual, editorial, responsive, and accessibility brief. This companion supplies the portfolio content model, résumé details, project context, story inventory, and publication boundaries.

## 1. How to use this attachment

- Treat the Stitch prompt as the design and information-architecture authority.
- Treat this document as the content and source-context authority for the requested portfolio generation.
- Preserve uncertainty. Do not fill missing information with invented employers, metrics, testimonials, links, screenshots, customers, or achievements.
- Separate résumé-supplied employment history from the deeper SEPIA engineering dossier. Do not imply that every technology in the résumé belongs to SEPIA.
- Use progressive disclosure: concise recruiter-facing summaries first, followed by technical details for engineering reviewers.
- Where the document says `approval-gated`, label the content as planned or unavailable rather than presenting it as existing public evidence.

## 2. Identity and positioning

- **Name:** Felix Edrian Ybañez
- **Working title:** Senior Cross-Platform Systems Engineer
- **Résumé title:** Software Engineer
- **Location:** Cebu, Philippines
- **Public email:** `yfelixedrian.work@gmail.com`
- **Primary positioning:** Software engineer specializing in Flutter, native integrations, hardware communication, and enterprise software platforms.
- **Longer positioning:** Cross-platform systems engineer specializing in Flutter, native interoperability, hardware communication, and enterprise software platforms. Experience spans mobile, web, and desktop applications, native technologies, connected-device workflows, and enterprise web/backend platforms.
- **Primary role direction:** Senior Flutter/Dart and cross-platform systems engineering.
- **Secondary role direction:** React, TypeScript, native integration, hardware/device communication, architecture, testing, and related full-stack engineering.

### Voice

Write as a capable, thoughtful, collaborative engineer. Prefer wording such as `contributed to`, `worked on`, `helped improve`, `supported`, `investigated`, `maintained`, `collaborated with`, `focused on`, and `made behavior easier to test`.

Avoid claims that Felix built a complete product alone, led every layer, owned every architectural decision, achieved unverified metrics, or is an expert in every listed technology. The strongest narrative is systems-oriented: explicit boundaries, state ownership, recovery-aware workflows, domain modeling, testing, and practical delivery.

## 3. Résumé source

The following résumé information is supplied for the portfolio and may be presented as résumé content. Do not add responsibilities beyond this list.

### Professional summary

Software Engineer with 7+ years of experience building production applications across mobile, web, and desktop platforms. Specialized in Flutter with Dart FFI for native system integration. Experienced in modernizing legacy systems and developing cross-platform applications for enterprise and professional audio solutions.

### Technical skills

Group these by context rather than displaying a giant undifferentiated technology wall:

- **Languages:** Dart, JavaScript, TypeScript, C++, C#
- **Frameworks:** Flutter, React, Node.js, NestJS
- **Native integration:** Dart FFI, Dante Audio Networking, AES70/OCA Protocol
- **Backend and APIs:** REST APIs, GraphQL, Firebase
- **State management:** BLoC, Provider, Riverpod
- **Databases:** SQLite, PostgreSQL, Firestore, SQL Server, MySQL
- **Development and delivery:** Git, GitHub, Docker, GitHub Actions, CI/CD, VS Code
- **Platforms:** Android, iOS, Web, Windows, macOS, Linux

Use context labels such as `primary focus`, `project experience`, or `working knowledge`. In particular, do not make React, NestJS, PostgreSQL, Docker, SQL Server, AngularJS, or C# appear to be SEPIA technologies unless the page explicitly identifies the résumé project where they were used.

### Core competencies

- Structured problem solving
- AI-assisted development
- Cross-functional collaboration
- System integration
- Software design
- Continuous improvement
- Quality-focused engineering
- Ownership and accountability

### Education

- **Bachelor of Science in Computer Engineering**, Negros Oriental State University, 2019

### Employment history

Present this as résumé-supplied history. Keep the chronology and scope exactly as follows; do not add team sizes, customers, awards, metrics, or leadership claims.

#### Software Engineer — Karno Sound

- **Location:** Remote (London, UK)
- **Dates:** Jan 2024 – Jul 2026
- **Context:** Developing SEPIA, a professional audio control platform for digitally managed studio hardware.
- Developed Flutter applications with Dart FFI to integrate native C++ audio libraries.
- Integrated Dante APIs and AES70 to enable audio routing, device discovery, and remote device control.
- Refactored legacy modules into a modular BLoC architecture for improved maintainability.
- Enhanced GitHub Actions CI/CD workflows for automated testing and deployment.
- Collaborated with frontend, native, and firmware engineers to deliver integrated software solutions.

#### Software Engineer — Experience Digital

- **Location:** Remote (Sydney, AU)
- **Dates:** Mar 2023 – Nov 2023
- **Context:** Developed enterprise business and event management applications.
- Developed Flutter features for a production event management application.
- Migrated legacy platform modules to React, NestJS, and TypeScript.
- Designed PostgreSQL database schemas and implemented GraphQL integrations.
- Used Riverpod, Redux, Docker, and CI/CD throughout the development workflow.

#### Flutter Developer — Xurpas Inc.

- **Location:** Remote (Makati, PH)
- **Dates:** Aug 2022 – Feb 2023
- **Context:** Contributed to MetaCare, a healthcare mobile application.
- Developed responsive Flutter user interfaces from Figma designs.
- Built reusable Flutter widgets and shared UI components for consistent application design.
- Implemented BLoC architecture to improve state management and code organization.

#### Software Engineer — Kyocera Document Solutions Philippines

- **Location:** Hybrid (Cebu, PH)
- **Dates:** Jul 2021 – Aug 2022
- Developed C# backend services for enterprise device communication.
- Maintained AngularJS web applications supporting printer management systems.
- Developed and maintained SQL Server databases for business applications.

#### Software Engineer — Bluebeans Systems

- **Location:** On-site (Dumaguete, PH)
- **Dates:** Jun 2018 – Jun 2021
- Built the QPro queue management system for customer service operations.
- Built document archiving applications using C# WinForms and Flutter.
- Developed MySQL backend integrations for business management applications.

### Professional links

The résumé includes `linkedin.com/in/ybanezfe` in a malformed Google-search wrapper. Treat the canonical LinkedIn destination as `https://linkedin.com/in/ybanezfe`, but expose it in the generated site only if the owner confirms it is approved for public display. No GitHub URL or résumé PDF was supplied. Do not create a fake résumé download action.

## 4. Flagship project: SEPIA

Use **SEPIA** as the visible public project name. Do not use `SEPIA Client` in visible copy.

### Product context

SEPIA is a cross-platform Flutter control platform for professional audio systems and digitally managed studio hardware. Operators compose signal paths, adjust modules and controls, save configurations, and operate connected devices through an interactive dashboard. The résumé-supplied platform context includes Windows, macOS, and iOS support; avoid expanding platform claims beyond that statement.

### Engineering challenge

The application coordinates external hardware that can disconnect, reconnect through a changed endpoint, change topology, expose different capabilities, respond asynchronously, or report updates after the user has acted. The system must preserve operator intent while preventing stale or unsafe operations.

The public case study should frame Felix’s work as collaborative contribution across difficult boundaries, not sole product ownership:

- typed application-facing abstractions over hardware communication;
- device discovery, initialization, lifecycle coordination, reconnect behavior, state retention, and cleanup;
- repository ownership and meaningful online/offline application contracts;
- configuration snapshots, identity matching, conflict classification, and safe recovery;
- visual signal-path composition and deterministic routing conversion;
- layered testing, BDD workflows, semantic UI identity, and hardware-free development paths;
- localized dashboard interaction and Rive animation state.

### SEPIA architecture

Use a conceptual, simplified diagram with this structure:

```text
Flutter UI and feature state
                    ↓
Domain rules and durable application state
                    ↓
Native integration and device communication
                    ↓
Professional audio and hardware systems
```

The adjacent accessible explanation should state that UI intent is handled by domain/application state, translated through a native/device boundary, and then reconciled with changing external systems. Do not show private package names, source paths, protocol schemas, device identifiers, hostnames, or production commands.

### Technical content to include

#### Hardware communication boundaries

A typed Dart boundary translates complex professional audio communication into application-facing device APIs. High-level responsibilities include protocol models, binary framing, serialization/deserialization, command handling, response correlation and validation, notification handling, capability objects, and application mapping. Injected transport and reusable codecs provide deterministic testing seams. Keep transport/session lifecycle with the host application rather than hiding it inside the communication abstraction.

#### Device lifecycle and state ownership

A lifecycle coordinator manages discovery, initialization, reconnect, disconnect, repository ownership, failure tracking, and ordered disposal. It guards duplicate discovery/manual connection work, separates connecting from connected state, makes failures observable, and cleans up timers, listeners, subscriptions, repositories, and streams. Network/interface resets should be described conceptually: preserve known identities, close active resources, restart discovery, and reconnect safely.

#### Configuration recovery

A saved configuration is a structured expression of user intent, not an unconditional instruction to mutate current hardware. The recovery flow reads a canonical snapshot, obtains the current topology, matches meaningful host/module identity, classifies differences, resolves only safe portions, and preserves the original snapshot for revalidation. Cover reordered hosts, missing modules, duplicate identities, unavailable paths, dependencies, malformed JSON, older supported shapes, cancellation, partial recovery, and conflict feedback without publishing exact schemas or files.

#### Visual signal paths and safe routing

The visual editor expresses paths, modules, buses, channels, stereo/split behavior, side chains, and relationships. A deterministic conversion layer translates the domain model to a boolean matrix and validated hardware-facing coordinates, and can map external state back into the visual model. Validate topology before mutation and sequence conflicting mutes before desired unmutes. Explain that this protects intent from protocol coordinates and makes routing defects easier to isolate.

#### Testing and hardware-free development

Describe layered Flutter/Dart unit, application, widget, and integration testing; Gherkin/BDD workflows; controlled streams; mocks and fakes; semantic UI identity; and Linux hardware test doubles. Explain that hardware-free workflows create deterministic seams for asynchronous lifecycle, transport, recovery, routing, and UI behavior. GitHub Actions may be described as supporting automated testing and delivery workflows. Do not publish internal commands, runner details, hostnames, or private workflow files.

#### Interaction and animation state

Describe Rive dashboard work at a high level: local animation ownership, selective rebuild boundaries, controller synchronization, meters, separation of drag and navigation concerns, and lifecycle cleanup. Do not claim measured performance improvements because no approved measurements exist.

### SEPIA qualitative outcomes

Use only these architectural/behavioral outcomes:

- protocol complexity was centralized behind application-facing APIs;
- durable user intent was separated from volatile hardware/runtime state;
- configuration recovery could classify mismatches and preserve the original snapshot;
- lifecycle ownership and cleanup became explicit;
- routing conversion became deterministic and testable before hardware operations;
- online/offline repositories offered meaningful feature-facing contracts;
- layered tests and hardware-free workflows made asynchronous behavior easier to verify;
- interaction state and rebuild boundaries were localized.

Do not convert these into percentages, speed improvements, uptime, adoption, revenue, customer, or business claims.

## 5. Supporting engineering stories

Create previews and detail pages with the progression `problem → contribution → reasoning → trade-off → lesson`. The following stories are all associated with SEPIA unless otherwise noted:

1. **Hardware Communication Platform** — typed boundaries, codecs, framing, response/notification distinction, capability models, and injected transport.
2. **Device Lifecycle and State Ownership** — discovery, reconnect, duplicate-work guards, repositories, streams, cancellation, and ordered cleanup.
3. **Configuration Recovery** — saved intent, topology matching, conflict classification, safe partial resolution, and revalidation.
4. **Visual Signal Paths to Safe Routing** — domain modeling, matrix conversion, orientation, stereo/split semantics, validation, and safe mutation order.
5. **Testing and Hardware-Free Developer Workflows** — layered tests, BDD, semantic identity, fakes, Linux test doubles, and deterministic seams.
6. **Cross-Platform Architecture Modernization** — feature-first/domain-oriented boundaries, repository ownership, state retention, and refactoring for safer change.
7. **Rive Interaction and Animation Performance** — local state ownership, selective rebuilds, controller synchronization, gesture/navigation separation, and cleanup.

Keep internal implementation names, source paths, commands, private schemas, proprietary protocol extensions, and customer/device information out of public pages.

## 6. Capability model

Organize capabilities around engineering problems and visitor value rather than a flat skill list:

- **Flutter and Dart application development** — production UI, feature state, reusable widgets, BLoC/Cubit, Provider, and Riverpod in project context.
- **Cross-platform architecture** — shared application behavior across mobile, web, and desktop contexts; feature-first and domain-oriented organization.
- **Native and hardware integration** — Dart FFI, native C++ libraries, Dante Audio Networking, AES70/OCA communication, device discovery, and control workflows.
- **Device lifecycle and state ownership** — asynchronous resources, reconnect, repository ownership, immutable state, streams, cleanup, and online/offline contracts.
- **Configuration recovery and resilience** — snapshots, identity matching, conflict classification, dependency-aware resolution, and revalidation.
- **Visual systems and domain modeling** — signal paths, dynamic modules, matrix conversion, stereo/split behavior, ganging, validation, and deterministic operations.
- **Testing and developer enablement** — unit/application/widget/integration testing, BDD, mocks/fakes, semantic identity, Linux test doubles, and GitHub Actions.
- **Architecture modernization** — legacy-module refactoring, modular BLoC, feature-first boundaries, maintainability, and safer change.
- **Enterprise and full-stack product engineering** — résumé-supplied experience with React, TypeScript, NestJS, Node.js, GraphQL, PostgreSQL, Docker, C#, AngularJS, SQL Server, MySQL, REST, Firebase, and enterprise applications. Keep these project-labeled and avoid implying equal depth across the portfolio.

## 7. Page-specific content

### Homepage

Answer immediately who Felix is, what he builds, why the work is distinctive, which roles he is open to, and where to explore evidence. Feature SEPIA first, then capability/problem themes and selected stories. Include a simple conceptual boundary diagram, not telemetry or a fake command center.

### Projects

Feature SEPIA as the flagship project. Include résumé-context projects carefully: Experience Digital enterprise/event management work, MetaCare at Xurpas, Kyocera enterprise printer/device systems, and Bluebeans business process/document management work. These can be concise context entries; do not invent case-study details not supplied here.

### SEPIA

Use a long-form editorial case study with overview, contribution boundary, facts panel, problem, architecture, technical table of contents, the six technical sections, evidence slots, interview prompts, related stories/capabilities, and contact CTA. Include: `Project details and diagrams are intentionally simplified to respect client confidentiality.`

### Capabilities

Use the problem-oriented capability model above. Link each capability to relevant stories and identify technologies by project/context.

### Stories

Use the eight story titles above. Each detail page should support recruiter scanning and technical review through progressive disclosure.

### About

Use first person. Explain interest in the boundary between application code, native systems, and connected devices; emphasize maintainability, testing, practical collaboration, and difficult systems problems. Include verified résumé context without inventing hobbies or personal history.

### Résumé

Create a compact print-friendly page containing name, positioning, summary, strengths, grouped technical skills, selected projects/contributions, education, and the supplied employment chronology. Only show a download button if a real approved PDF is later attached.

### Contact

Use the approved email as the primary action. Suggested heading: `Interested in working on complex cross-platform software?` Mention openness to Flutter/Dart, cross-platform, native integration, hardware/device communication, architecture, testing, React/TypeScript, and related full-stack opportunities. Do not fabricate social links.

## 8. Evidence and confidentiality rules

No public screenshots, recordings, architecture diagrams, production code, configuration files, routing tables, private URLs, credentials, customer information, source paths, repository names, internal class/package names, private APIs, hostnames, device identifiers, or proprietary protocol extensions are approved by this content model.

Use evidence slots with explicit labels:

- **Planned** — a possible future artifact, not currently available.
- **Needs approval** — requires owner/client/confidentiality review before publication.
- **Not publicly available** — do not render as if evidence exists.

Conceptual diagrams and illustrative code may be used only when clearly labeled and generalized. Never imply that a conceptual diagram is a production architecture artifact.

## 9. Generation checklist

Before finalizing the generated portfolio, verify that:

- SEPIA is the visible flagship project name.
- Résumé facts are shown in context and not all attributed to SEPIA.
- Felix’s contribution is separated from broader team/product scope.
- No unsupported metrics, testimonials, employers, clients, awards, or outcomes were invented.
- Missing links and PDF downloads are omitted or marked unavailable.
- All diagrams have accessible adjacent text and a conceptual/simplified label.
- Technical pages use progressive disclosure instead of overwhelming every visitor.
- The visual system remains calm, editorial, readable, and hiring-oriented.
- Confidentiality notices and evidence labels remain visible where relevant.
- Responsive, keyboard, focus, reduced-motion, touch-target, and contrast requirements from the Stitch prompt are preserved.
