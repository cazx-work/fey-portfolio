# Portfolio context

This is the factual content model extracted from `docs/contents`. It is intentionally conservative: source material contains detailed Sepia Client case-study and architecture notes, but does not provide a verified résumé, employment chronology, public contact links, or quantitative outcomes.

## Personal positioning

**Felix Edrian Ybañez** is positioned for senior cross-platform systems engineering work: building Flutter products across mobile and desktop, integrating native technologies and hardware communication, and contributing to enterprise software platforms.

The strongest supported narrative is systems-oriented rather than UI-only: architecture, protocol boundaries, state ownership, recovery-aware workflows, signal-path modeling, testing, and delivery enablement.

## Target roles

- Primary: senior Flutter / Dart cross-platform engineering roles.
- Secondary: React, TypeScript, and full-stack engineering roles.
- Public contact and résumé details: not present in source material; do not invent.

## Capability map

1. **Native and Hardware Integration** — typed AES70/OCA communication boundary, binary framing and codecs, device capability abstractions, injected transport, discovery, lifecycle, and recovery.
2. **Cross-Platform Architecture** — Flutter application architecture, online/offline repository contracts, feature-first/domain-oriented boundaries, desktop and hardware-free workflows where supported by source material.
3. **Enterprise Full-Stack Engineering** — the source materials support enterprise/platform modernization as a target narrative, but do not provide enough verified project detail for specific React, TypeScript, NestJS, Node.js, GraphQL, PostgreSQL, Docker, SQL Server, or CI/CD claims beyond the explicitly documented GitHub Actions/Linux testing work. Keep these technologies as content questions until corroborated.
4. **Platform Reliability and Delivery** — layered tests, BDD integration tooling, semantic UI identity, Linux test doubles, process lifecycle, and GitHub Copilot-assisted workflow implementation with engineering review and validation.
5. **Software Architecture and Modernization** — feature-first/domain-driven organization, repository ownership, state retention, explicit boundaries, and refactoring for safer change.

## Technology map

### Verified in source materials

Flutter; Dart; BLoC/Cubit; Rive; AES70; OCA/OCP1 protocol concepts; binary serialization/deserialization; WebSocket-backed repositories; streams; JSON persistence; signal-path and matrix modeling; Gherkin/BDD integration testing; Flutter/Dart unit, application, widget, and integration testing; mocks/fakes; Linux shell automation; GitHub Actions (as referenced in source content); GitHub Copilot assistance for Linux workflow implementation.

### Requested positioning but not corroborated by source content

Dart FFI, native C++, Dante Audio Networking, Windows/macOS/Linux product support, React, TypeScript, NestJS, Node.js, GraphQL, PostgreSQL, Docker, SQL Server, and general CI/CD. These must not appear as verified personal experience until confirmed; see `docs/content-questions.md`.

## Company history

No employers, dates, job titles, client names, team sizes, or employment chronology are present in the readable source content. The public site should use project/domain context rather than fabricate a timeline.

## Project summaries

### Sepia Client

A Flutter application for configuring and controlling professional audio hardware. Users compose signal paths, adjust modules, save configurations, and operate connected devices through an interactive dashboard. The supported engineering narrative covers protocol abstraction, lifecycle and repository ownership, signal-path and matrix conversion, configuration recovery, testing, performance, and hardware-free workflows.

### Supporting engineering work

- AES70 SDK and protocol abstraction.
- Device lifecycle management.
- State retention and repository ownership.
- Configuration recall and conflict-aware recovery.
- Grid dynamic module layout.
- Matrix conversion engine.
- Module ganging and synchronized control.
- Application testing and BDD integration testing.
- Structured semantic widget identity.
- Linux test environment automation.
- Rive interaction performance.
- Feature-first/domain-driven architecture modernization.

These are presented as project facets or engineering stories unless a separate product identity is verified.

## SEPIA details supported by source

- Hardware-connected professional audio control application.
- Flutter/Dart application with interactive dashboard, signal paths, modules, routing, saved configurations, and offline test environments.
- Typed AES70/OCA communication boundary with protocol models, OCP1/binary framing and codecs, command correlation, response validation, typed payload decoding, notifications, device capabilities, and application mapping.
- Device lifecycle coordinator covering discovery, initialization, reconnect, duplicate-work guards, recovery tracking, repository ownership, and explicit cleanup.
- Repository-owned durable state with online/offline contracts and BLoC-facing streams/immutable state.
- Configuration snapshots covering hosts, paths, ports, buses, modules, control groups, and routing data; identity matching, conflict classification, partial recovery behavior, and revalidation.
- Dynamic module layout with heterogeneous footprints, stereo/dual-width placement, split semantics, drag-and-drop transitions, explicit matrix representation, capability-driven rendering, serialized events, and derived validation.
- Matrix conversion in both directions between visual/domain routing state and protocol-ready addressable matrix operations.
- Module ganging with absolute/relative synchronization, persisted group metadata, dynamic membership, multiple connected hosts, and feedback-loop avoidance.
- Layered test architecture, controlled streams, mocks/fakes, widget and integration coverage, Gherkin workflows, semantic keys, and Linux hardware test doubles.
- Rive dashboard work focused on local animation ownership, selective rebuild boundaries, controller synchronization, meters, drag/navigation separation, and lifecycle cleanup. No measured performance claim is provided.

## Engineering stories

Recommended public stories: Hardware Communication Platform; Device Lifecycle and State Ownership; Configuration Recovery; Visual Signal Paths to Safe Routing; Testing and Hardware-Free Developer Workflows; Cross-Platform Architecture Modernization; Rive Interaction Performance. Each story should disclose only high-level architecture and avoid proprietary code or internal identifiers.

## Verified outcomes

- Protocol complexity was centralized behind application-facing APIs.
- Durable user intent was separated from volatile hardware/runtime state.
- Configuration recovery could classify mismatches and preserve the original snapshot.
- Lifecycle ownership and cleanup were made explicit.
- Routing conversion was modeled deterministically and validated before hardware operations.
- Testing was organized by feature/layer with deterministic seams.
- Hardware-free Linux testing was made more repeatable through bootstrap/run/stop workflow design; implementation was assisted by GitHub Copilot and reviewed/validated as engineering work.
- Interaction state and rebuild boundaries were localized. Do not turn this into a quantitative performance claim.

## Unverified details

Employment history, exact title, dates, company/client names, public contact links, résumé file, Dart FFI/native C++ implementation, Dante integration, supported desktop platforms, React/web stack, backend stack, quantified outcomes, user/business scale, and public media assets.

## Confidentiality restrictions

Do not publish source paths, repository names, internal class/method inventories, hostnames, device/customer information, credentials, private URLs, proprietary source code, exact internal commands, or unapproved screenshots/recordings/diagrams. Use conceptual diagrams and illustrative code only.

## Content questions

See `docs/content-questions.md`. Draft-only fields must not appear in production navigation or public metadata.
