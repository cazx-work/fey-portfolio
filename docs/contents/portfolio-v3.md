# Sepia Client

## I build reliable software around unreliable hardware

> A focused engineering case study about preserving user intent, separating volatile device state from durable application state, and making complex hardware workflows safer to change.

[View the flagship workflow](#flagship-workflow) · [Explore the architecture](#architecture-at-a-glance) · [Review the evidence plan](#evidence)

---

## Overview

Sepia Client is a Flutter application for configuring and controlling professional audio hardware. Users compose signal paths, adjust modules, save configurations, and operate several connected devices through an interactive dashboard.

The defining engineering constraint was that the hardware could disconnect, change topology, respond asynchronously, or expose routing rules that did not map directly to the UI. I investigated these problems across architecture, protocol integration, state ownership, recovery, testing, performance, and developer enablement, then helped make the resulting behavior more predictable for users and developers.

### My contribution

I contributed to decisions across:

- Device lifecycle, repository ownership, and online/offline state contracts
- A typed hardware communication boundary and protocol-to-domain mapping
- Visual signal-path composition and safe routing conversion
- Configuration matching and conflict-aware recovery
- Layered testing, BDD integration tooling, and hardware-free workflows
- Interactive dashboard state and update-scope improvements

Where work was collaborative, this case study distinguishes my contribution from broader team outcomes. It focuses on the problems I investigated, the decisions I helped shape, and the evidence that can support each claim. Numerical claims are intentionally omitted unless they can be verified from project evidence.

### Three outcomes

| Outcome | What changed |
|---|---|
| **Safe recovery** | Saved configurations remained separate from resolved runtime state, so changing hardware could be handled without silently overwriting user intent. |
| **Clear boundaries** | UI features could work with domain-facing APIs instead of duplicating protocol, lifecycle, and resource-management logic. |
| **Safer change** | Layered tests, reusable integration workflows, and hardware-free test doubles made asynchronous behavior easier to verify repeatedly. |

### Technical scope

<details>
<summary>Expand technical scope</summary>

State management · lifecycle coordination · protocol abstraction · signal-path modeling · matrix conversion · configuration recovery · asynchronous workflows · BDD integration testing · semantic UI identity · Flutter interaction performance · Linux test automation

</details>

---

## The problem: one user intent, several changing systems

A user may compose a signal path, save it, disconnect a device, reconnect to a different topology, and continue working. The application must preserve useful context while preventing invalid hardware operations.

```text
User intent
    |
    v
Feature state and domain rules
    |
    +--> Persisted configuration and recovery
    |
    +--> Signal-path composition and routing validation
    |
    v
Typed hardware communication boundary
    |
    v
Device lifecycle and external resources
```

The difficult requirements were connected:

- **Continuity:** connectivity failures should not erase the user's working context.
- **Safety:** ambiguous or invalid routing should be rejected before reaching hardware.
- **Clarity:** protocol and lifecycle rules should have one understandable owner.
- **Confidence:** asynchronous workflows should be repeatable without always having physical devices.
- **Responsiveness:** high-frequency control updates should not invalidate unrelated UI.

The portfolio is organized around those problems, not around a list of individual mechanisms.

---

# Signature stories

## 1. Restoring configurations safely when hardware changes

### The user risk

A saved configuration cannot safely be restored by list position alone. Between save and restore, a device may be missing, moved, replaced, or temporarily unreachable. Blindly applying the snapshot could connect a user's intended route to the wrong hardware.

### The decision

I separated the **original persisted snapshot** from the **resolved runtime state**. A matching and conflict-resolution pipeline uses meaningful identity and current availability to determine what can be restored safely.

```text
Saved configuration
        |
        v
Identity and topology matching
        |
        v
Conflict classification
   /                \
Safe resolution   User-visible recovery feedback
   \                /
        v
Resolved runtime state
        |
        v
Revalidate when hardware changes again
```

Matching can consider module identity, serial identity, host relationships, slot placement, availability, and dependent paths. Conflict severity distinguishes recoverable differences from conditions that make restoration unsafe. The saved snapshot remains available for later revalidation instead of being silently rewritten.

### Why it mattered

The system could recover the safe portion of a setup while clearly exposing what changed. Users retained their original intent, and the application avoided presenting an approximate restore as if it were an exact one.

### Tradeoff

Explicit snapshots, matching, conflict states, and revalidation require more modeling than a best-effort restore. That complexity was accepted because configuration recovery is a user-trust problem, not only a file-loading problem.

### Evidence

- **Primary:** recording of save → hardware topology change → conflict review → safe recovery
- **Secondary:** diagram showing original snapshot versus resolved runtime state
- **Verified facts to add:** supported identity types, conflict categories, and representative recovery scenarios

<details>
<summary>Technical deep dive</summary>

The strongest engineering questions are deterministic matching, tie-breaking, blocking versus recoverable conflicts, partial restore policy, schema evolution, and topology permutation coverage. These should be supported by tests or diagrams rather than broad qualitative claims.

</details>

---

## 2. Keeping application state consistent when devices disconnect

### The user risk

When a device disappears, reconnects, or emits duplicate discovery events, the application must keep useful module context without creating duplicate connections, stale listeners, or leaked resources.

### The decision

I established explicit ownership boundaries:

- A lifecycle coordinator owns discovery, initialization, reconnection, failure tracking, and disposal.
- A repository owns durable module state and exposes immutable snapshots and streams.
- Online and offline implementations share an application-facing contract.
- BLoCs translate repository updates into UI state without owning transport behavior.

```text
Discovery · user action · reconnect timer
                    |
                    v
          Device lifecycle coordinator
             |       |       |       |
          Duplicate  Init  Recovery Cleanup
           guard     queue tracking ownership
                    |
                    v
            Repository per device
                    |
                    v
             External device system
```

Connecting and connected endpoints are tracked separately. Initialization is coordinated so concurrent events cannot create duplicate work. Disposal is explicit and ordered across timers, listeners, repositories, streams, and external resources.

### Why it mattered

The UI could recover from transient hardware problems without losing its working context or learning connection rules from every feature. Lifecycle behavior had one place where it could be reasoned about and tested.

### Tradeoff

The coordinator carries real orchestration complexity. Centralizing it was preferable to distributing discovery, reconnect, cancellation, and cleanup decisions across screens and feature controllers.

### Evidence

- **Primary:** recording of disconnect → rediscovery → reconnect while context remains visible
- **Secondary:** lifecycle state flow and resource ownership diagram
- **Verified facts to add:** lifecycle scenarios covered by tests and any meaningful retry or cleanup behavior

<details>
<summary>Technical deep dive</summary>

A senior review should examine cancellation, timeout and retry policy, stale stream events, duplicate discovery, idempotent disposal, and shutdown-versus-reconnect races. These are the invariants behind the visible recovery behavior.

</details>

---

## 3. Building a hardware communication platform

### The product problem

Every feature should not need to understand binary message layouts, object identifiers, parameter encoding, response status, or notification formats.

### The decision

I designed a typed AES70/OCA communication boundary that translates low-level device behavior into application-facing APIs.

```text
Application feature
        |
        v
Domain-facing API
        |
        v
Device capability model
        |
        v
Command, response, and notification handling
        |
        v
Binary codec and message framing
        |
        v
Injected transport
        |
        v
Hardware
```

The shared command path centralizes request construction, serialization, response correlation, status validation, typed payload decoding, error interpretation, and notification handling. Transport and connection policy remain outside the SDK through dependency injection.

### Why it mattered

Product features received a consistent way to work with device capabilities without duplicating protocol details. New behavior could be added at a defined boundary and tested with deterministic transports rather than requiring every test to talk to physical hardware.

### Tradeoff

Typed models and mappings require more explicit code than direct byte manipulation. The cost buys discoverability, type safety, test seams, and a smaller protocol surface for the rest of the application.

### Evidence

- **Primary:** one operation traced from user intent to encoded command, response correlation, validation, and domain result
- **Secondary:** protocol-to-domain mapping diagram including one failure response
- **Verified facts to add:** supported capability families, codec scenarios, and consumers of the shared boundary

<details>
<summary>Technical deep dive</summary>

The deep-dive version should show message correlation and expiry, malformed input handling, timeout and cancellation semantics, protocol-to-domain error conversion, and codec round-trip or conformance evidence.

</details>

---

## 4. From visual signal paths to safe hardware operations

### The user problem

The visual editor and the device represent the same routing intent differently. The UI works with modules, paths, buses, and channel relationships; the hardware uses addressable matrix connections. A conversion error can produce an incorrect or unsafe route.

### The decision

I treated composition and conversion as one end-to-end domain story:

1. Capture typed drag intent.
2. Validate module footprint, ordering, compatibility, and relationships.
3. Represent the path with explicit occupancy and capacity.
4. Convert domain routing into deterministic matrix operations.
5. Validate topology and compare desired versus current connections.
6. Apply safe mutation ordering, including mute-before-unmute where required.

```text
Visual intent
    |
    v
Typed drag event
    |
    v
Validated path model
    |
    v
Stable routing representation
    |
    v
Matrix conversion and topology validation
    |
    v
Safe hardware operations
```

The layout model supports single-width, dual-width, stereo, split, and empty-but-meaningful cells. Nullable slots preserve occupancy as domain information instead of leaving it inside widgets. The conversion layer keeps coordinate conventions and source/sink semantics explicit.

### Why it mattered

Users could express routing visually while the hardware received deterministic, validated operations. Invalid compositions were rejected at the boundary where they were created, and protocol rules did not leak into presentation code.

### Tradeoff

The model is more explicit than a flat list and requires placeholder and coordinate maintenance. That complexity makes multi-cell constraints visible and gives validation enough information to explain invalid compositions.

### Evidence

- **Primary:** visual path → matrix representation → validated update, including a stereo or split example
- **Secondary:** before/after route diagram and invalid-topology rejection
- **Verified facts to add:** supported footprint types, topology sizes, round-trip scenarios, and routing concepts covered by tests

<details>
<summary>Technical deep dive</summary>

The technical version should include round-trip invariants, coordinate conventions, malformed topology behavior, atomicity of multi-cell moves, normalization rules, and the source of truth during partial updates.

</details>

---

# Quality and performance

## Making complex workflows safer to change

The product combines pure domain rules, asynchronous state, persistence, external devices, platform services, and multi-screen UI workflows. One test style could not provide fast feedback and confidence across every boundary.

I treated testing and developer enablement as part of the architecture:

```text
Domain rules
    |
    v
Application state and use cases
    |
    v
Infrastructure adapters
    |
    v
Widget contracts
    |
    v
Selected connected workflows
```

### Layered verification

- Unit tests cover value objects, parsing, validation, and transformations.
- BLoC and Cubit tests cover state transitions and asynchronous coordination.
- Fakes and mocks isolate persistence, protocol, discovery, and platform boundaries.
- Widget tests verify important interaction and rendering contracts.
- Integration tests exercise selected connected workflows.

### Reusable BDD platform

Gherkin features, reusable steps, semantic finders, scenario-scoped state, bounded waits, cleanup, and structured reporting turn important connected behavior into repeatable specifications.

### Hardware-free development

A Linux workflow bootstraps the environment, starts host and module test doubles, tracks process ownership, and performs graceful cleanup. This supports meaningful integration work when physical hardware is scarce.

### Why it mattered

The team could focus on a workflow, isolate external dependencies, and localize failures without treating every scenario as a bespoke manual exercise. With GitHub Copilot's assistance, I shaped and validated the Linux workflow; engineering ownership remained in defining requirements, reviewing lifecycle behavior, and validating the result.

### Evidence

- **Primary:** focused BDD run from feature selection through report
- **Secondary:** hardware-free bootstrap → run → cleanup workflow
- **Verified facts to add:** test-layer counts, focused/full execution times, reusable step coverage, or setup time only where tracked

<details>
<summary>Technical deep dive</summary>

Semantic UI identity is shared between production widgets and tests through typed keys and finders. A stronger evidence panel would show one defect-to-test example, scenario isolation, flaky-test handling, and the distinction between environment setup failures and product failures.

</details>

---

## Keeping interactive controls responsive at scale

The dashboard combines animated panels, live values, hover feedback, nested scrolling, zooming, and drag interactions. The performance strategy was to narrow ownership and update scope rather than make unsupported global performance claims.

The work localized animation state, used selective rebuild boundaries, routed high-frequency values through controllers where appropriate, and treated dragging and navigation as distinct interaction modes. Controller, stream, pointer, and timer cleanup remained explicit.

```text
Dashboard
    |
    v
Panel and scroll coordination
    |
    v
Module-local state + animation controller + interaction mode
    |
    v
Focused repository updates
```

### What became possible

The architecture reduced the scope of routine updates and made interaction ownership more predictable as the dashboard grew. Quantified improvement is intentionally not claimed here until profiling evidence is attached.

### Evidence to collect

Before/after profiling trace, representative workload recording, rebuild visualization, frame timing, or input-to-visual-update measurements. A well-captioned qualitative comparison is preferable to an invented metric.

---

# Architecture at a glance

The strongest design choice was separating responsibilities that change for different reasons:

| Boundary | Owns | Protects |
|---|---|---|
| Feature and domain layer | User intent, invariants, transformations | Product behavior and testable rules |
| Repository | Durable feature state and streams | Consistent state access |
| Lifecycle coordinator | Discovery, connection, recovery, disposal | Resource and concurrency safety |
| Protocol platform | Encoding, correlation, capability mapping | Hardware communication consistency |
| UI state layer | Presentation state and interaction | View-specific behavior |
| Test platform | Fakes, scenarios, semantic identity, environment lifecycle | Repeatable verification |

These boundaries are not free. They add models, coordination, and contracts. They are valuable when they make ownership explicit, protect an invariant, or prevent unsafe behavior from spreading.

---

# Evidence

Each flagship story should show one primary artifact and one supporting artifact. The final site should caption every artifact with the behavior the visitor should notice.

| Story | Primary artifact | Supporting artifact |
|---|---|---|
| Safe configuration recovery | Save → topology change → conflict review → recovery recording | Snapshot/resolved-state diagram |
| Reliable device state | Disconnect → rediscover → reconnect recording | Lifecycle and ownership flow |
| Communication platform | Intent → command → response → domain result trace | Protocol boundary diagram |
| Safe hardware routing | Visual path → matrix update recording | Validation or topology diagram |
| Safer workflows | Focused BDD execution | Hardware-free environment lifecycle |
| Responsive controls | Representative interaction/profiling capture | Update-scope or rebuild diagram |

No evidence panel should expose proprietary source code, internal APIs, infrastructure details, or confidential business logic. Show decisions, boundaries, generalized flows, and verified outcomes.

---

# Ownership and lessons

## Responsibility summary

| Area | Owned or co-owned decision | Value |
|---|---|---|
| Architecture | Defined feature, state, lifecycle, and protocol boundaries | Reduced cross-feature coupling and clarified change impact |
| Protocol integration | Shaped typed communication and domain mappings | Kept product behavior independent of binary details |
| Signal-path systems | Modeled layout constraints and matrix conversion | Made routing deterministic and safer to apply |
| Reliability | Designed recovery and reconnect behavior | Preserved user intent through changing hardware |
| Testing | Built layered and reusable workflow verification | Improved failure localization and repeatability |
| Developer enablement | Created hardware-free environment workflows | Reduced dependence on scarce physical hardware |

## Deliberate tradeoffs

- **Explicit models over short implementations:** more code, but clearer invariants and safer boundaries.
- **Central coordination over duplicated flexibility:** more orchestration, but fewer conflicting lifecycle paths.
- **Recovery feedback over silent best effort:** richer state, but stronger user trust and safer hardware behavior.
- **Layered verification over one universal test style:** more test infrastructure, but faster feedback where it matters and stronger coverage at external boundaries.

## What I would strengthen next

- Add property-based round-trip tests for routing and codec conversions.
- Formalize device lifecycle behavior as an explicit state machine.
- Expand online/offline repository contract tests.
- Add schema versioning and migration for persisted configurations.
- Make propagation rules pure and table-driven.
- Establish measurable performance budgets once representative profiling data is available.

---

# Flagship workflow

The entire case study can be understood through one end-to-end scenario:

```text
Compose a signal path
        |
        v
Translate it into validated hardware routing
        |
        v
Save the configuration
        |
        v
Change the connected hardware
        |
        v
Review conflicts and recover safe state
        |
        v
Continue working without losing user intent
```

This is the primary narrative. The architecture, lifecycle, protocol, testing, and performance sections provide evidence for why that workflow can remain safe and understandable as the system changes.

---

## One-line summary

A hardware-connected Flutter application made safer to change through explicit state ownership, protocol boundaries, routing validation, recovery-aware modeling, and layered testing.

## Tagline

**Designing reliable software around unreliable hardware.**
