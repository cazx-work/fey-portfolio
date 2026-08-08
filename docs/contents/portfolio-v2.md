# Sepia Client

## Engineering a Reliable Control System for Changing Hardware

> A senior engineering case study about making a complex professional-audio application easier to extend, safer to recover, easier to test, and responsive under real interaction load.

---

## At a glance

Sepia Client is a Flutter application used to configure and control professional audio hardware. The application manages connected devices, signal paths, modules, routing, saved configurations, interactive controls, and offline test environments.

The difficult part was not building individual screens. Hardware could disconnect, change, or expose complex routing rules while users were still working. The application therefore needed clear ownership boundaries and recovery behavior across the entire system.

### My role

I owned or co-owned architecture decisions across:

- Hardware communication and typed application APIs
- Device lifecycle and state ownership
- Visual signal-path composition and routing conversion
- Configuration recovery when hardware changed
- Testing architecture and integration tooling
- Interactive dashboard performance
- Hardware-free developer workflows

I translated product and testing needs into technical designs, implemented key flows, and validated behavior against real workflows. Some Linux automation implementation was accelerated with GitHub Copilot; the requirements, review, and validation remained engineering responsibilities.

---

## Three outcomes

### Made complex hardware easier to control

Designed a typed communication platform that hid binary protocol details from product features and gave the application consistent APIs for device capabilities.

### Protected saved configurations from changing hardware

Built identity matching, conflict detection, and safe runtime resolution for devices that could be missing, moved, replaced, or temporarily unavailable.

### Made complex workflows safer to change

Created layered tests, reusable integration infrastructure, and a hardware-free development environment for asynchronous device workflows and interactive UI behavior.

---

# 1. The engineering challenge

Professional audio systems are not static. A user may build a signal path from modules with different widths and channel relationships, save that configuration, disconnect a device, reconnect to a changed topology, and continue working through a responsive dashboard.

That creates several competing requirements:

- **Users need continuity:** temporary connectivity problems should not erase their working context.
- **Hardware needs safety:** invalid or ambiguous routing should not be sent to a device.
- **Developers need clarity:** product features should not duplicate protocol and lifecycle logic.
- **Teams need confidence:** complex asynchronous workflows must be repeatable and diagnosable.
- **The interface needs responsiveness:** multiple animated controls must update without broad UI churn.

The architecture was organized around those problems rather than around individual screens.

```text
User Intent
    |
    v
Feature State and Domain Rules
    |
    +--> Saved Configuration and Recovery
    |
    +--> Signal-Path and Matrix Conversion
    |
    v
Hardware Communication Boundary
    |
    v
Device Lifecycle and External Resources
```

---

# 2. Keeping the application reliable when devices disconnect

## The problem

Devices can disappear, reappear, change network addresses, or respond slowly. Without centralized coordination, discovery, manual connection, and reconnect attempts can create duplicate repositories, stale listeners, inconsistent host lists, and leaked timers or sockets.

The UI also needs to preserve useful application state while the connection is unavailable.

## What I designed

I established explicit ownership boundaries:

- A lifecycle coordinator owns discovery, initialization, reconnection, failure tracking, and disposal.
- A repository owns durable module state and exposes immutable snapshots and streams.
- Online and offline implementations share an application-facing contract.
- BLoCs translate repository updates into UI state without owning transport behavior.

```text
Discovery / User Action / Reconnect Timer
                    |
                    v
       Device Lifecycle Coordinator
          |       |       |       |
     Duplicate  Init   Recovery  Cleanup
       Guard    Queue  Tracking  Ownership
                    |
                    v
          Host Repository per Device
                    |
                    v
            External Device System
```

Connecting and connected endpoints are tracked separately. Initialization is coordinated so concurrent events cannot create duplicate work. Disposal is explicit and ordered across timers, listeners, repositories, streams, and external resources.

## Why it mattered

Users could recover from transient hardware problems without the rest of the application entering an inconsistent state. Product features remained independent of connection mechanics, and lifecycle behavior had one place where it could be reasoned about and tested.

## Technical deep dive

- Repository snapshots separate durable user intent from volatile transport state.
- Stream-based updates prevent consumers from polling or reaching into device internals.
- Online/offline parity supports connected operation and simulation through one contract.
- Recovery tracking keeps failed-but-recoverable identities visible.
- Cleanup ownership prevents stale resources from surviving the manager.

### Tradeoff

The lifecycle coordinator carries meaningful orchestration complexity. That cost was accepted to prevent discovery, reconnect, and cleanup rules from spreading across UI components.

---

# 3. Building a hardware communication platform

## The problem

Every application feature should not need to understand binary message layouts, object identifiers, parameter encoding, response statuses, or notification formats.

Spreading those details through product features would make new hardware capabilities expensive to add and difficult to test.

## What I designed

I designed a typed AES70/OCA communication boundary that translates low-level device behavior into application-facing APIs.

```text
Application Features
        |
        v
Domain-Friendly API
        |
        v
Device Capability Model
        |
        v
Command and Response Handling
        |
        v
Binary Codec and Message Framing
        |
        v
Injected Transport
        |
        v
Professional Audio Hardware
```

The shared command path centralizes:

- Request construction
- Message framing
- Serialization and deserialization
- Asynchronous response correlation
- Status validation
- Typed payload decoding
- Error interpretation
- Notification handling

Transport and connection lifecycle remain outside the SDK through dependency injection. The SDK therefore focuses on protocol and device capability behavior, while the host application owns connection policy.

## Why it mattered

New product features received a consistent way to work with managers, workers, sensors, actuators, matrix controls, and notifications. Protocol complexity became localized instead of becoming a dependency of every screen and workflow.

## Technical deep dive

Engineers can inspect:

- Typed protocol models and capability abstractions
- Command lifecycle and correlation behavior
- Protocol-to-domain mapping
- Transport seams for deterministic testing
- Error and notification boundaries

### Tradeoff

The SDK requires explicit models, mappings, and abstraction layers. That is more code than direct byte manipulation, but it improves type safety, testability, discoverability, and extensibility.

---

# 4. Designing a visual editor for complex hardware signal paths

## The problem

Users needed to arrange modules visually, but the modules did not all occupy the same space or obey the same placement rules.

A normal drag-and-drop list could not safely represent:

- Single-width and dual-width modules
- Stereo relationships
- Split module parts
- Duplicated modules
- Empty but meaningful drop cells
- Host and input compatibility constraints

## What I designed

I modeled paths as explicit matrix-like structures with nullable slots. This preserved occupancy, alignment, and available capacity as domain information rather than leaving it inside widgets.

```text
Drag Source
    |
    v
Typed Drag Intent
    |
    v
Grid BLoC
    |
    v
Placement Coordinator
    |
    v
Path Matrix and Constraints
    |
    v
Validated Grid State
    |
    +--> Grid Projection
    +--> Runtime Projection
```

Drag context carries source path, slot, module identity, and split-part information. Accepted drops become serialized application events. Placement, copying, movement, stereo handling, and synchronization therefore follow deterministic state transitions.

Validation checks ordering, input compatibility, host consistency, stereo and dual-width placement, split-part constraints, and synchronization with host-facing path data.

## Why it mattered

The editor behaved as a constrained composition tool rather than a collection of independent widgets. Invalid signal paths were identified at the composition boundary before downstream operations used them.

### Tradeoff

The model is more explicit than a flat list and requires placeholder management and coordinate maintenance. That complexity makes edge cases visible and gives validation enough information to explain invalid compositions.

---

# 5. Translating visual routing into safe hardware operations

## The problem

The visual editor represents routing as paths, modules, buses, and channel relationships. Hardware represents the same intent as addressable matrix connections.

The two models differ in shape, indexing, orientation, and semantics. A small conversion error can create an incorrect route or an unsafe hardware update.

## What I designed

I built a deterministic, bidirectional translation layer.

```text
Visual Signal-Chain State
          |
          v
Domain Paths, Modules, and Buses
          |
          v
Deterministic Matrix Conversion
          |
          v
Boolean Matrix and Object Coordinates
          |
          v
Topology Validation
          |
          v
Protocol Adapter -> Hardware Matrix
```

The engine supports:

- Reconstructing domain paths from hardware matrix state
- Generating matrix operations from Grid state
- Stereo and split channel semantics
- Dual-width placement
- Buses and side chains
- Host ownership filtering
- Port and object-coordinate mapping
- Deferred dependency resolution

Before a device update is sent, desired connections are compared with current state and checked against the valid topology. Conflicting connections are muted before desired connections are unmuted, reducing invalid intermediate states.

## Why it mattered

The UI could use expressive domain concepts while the communication layer received deterministic, validated operations. Routing rules stayed testable and did not become embedded in presentation code.

## Technical deep dive

Senior engineers should look for:

- Stable intermediate representations
- Explicit source/sink coordinate conventions
- Round-trip conversion invariants
- Malformed topology handling
- Property-based test opportunities
- Safe mutation sequencing

---

# 6. Restoring user configurations safely when hardware changes

## The problem

A saved setup cannot always be restored by position. Between save and restore, a device may be missing, moved to another slot, replaced by a different module, or temporarily unreachable.

Blindly applying the saved file could silently point paths at the wrong hardware.

## What I designed

I created a canonical snapshot and recovery workflow.

```text
Current System ──┐
                 v
            Snapshot Model
                 ^
                 |
Saved Snapshot ──┘
                 |
                 v
          Host and Module Matcher
                 |
                 v
          Conflict Classification
            /             \
   Safe Resolution    Recovery Feedback
            \             /
                 v
        Resolved Runtime State
                 |
                 v
       Revalidate as Hardware Changes
```

Matching considers meaningful identity rather than list position:

- Module identity
- Serial identity
- Host relationships
- Slot placement
- Availability
- Dependent paths

The original persisted snapshot remains separate from its resolved runtime presentation. If hardware returns or changes again, the runtime state can be recalculated without losing the user's saved intent.

Conflict severity distinguishes recoverable differences from conditions that make restoration unsafe. Missing modules can trigger targeted path clearing and stereo relationship handling instead of silently applying invalid references.

## Why it mattered

The system chose explicit conflict feedback over unsafe best-effort restoration. Users could understand what changed, recover what was safe, and keep the original setup available for future revalidation.

### Tradeoff

The design introduces richer models, matching logic, conflict states, and revalidation work. That complexity is deliberate because preserving user intent is more valuable than making a restore operation appear successful when the hardware no longer matches.

---

# 7. Synchronizing controls across multiple devices

## The problem

Users may want several compatible modules to behave as one group, but they may also need to preserve intentional differences between those modules.

Every propagated control update can return through the same event stream as a direct user action, creating the possibility of recursive feedback.

## What I designed

The synchronization system supports absolute and relative behavior:

- **Absolute:** peer controls receive the source value.
- **Relative:** the source delta is applied to each peer's current value.
- **Origin-aware updates:** propagated writes are not treated as new user sources.
- **Topology-aware membership:** groups can span multiple connected hosts.

```text
User Control
     |
     v
Intent Event
     |
     v
Gang Coordinator
  |       |        |
Validate Resolve  Select Rule
Members  Hosts   Absolute/Relative
     \      |       /
          v
    Peer Module Controls
          |
          v
 Origin-Aware Updates
```

## Why it mattered

Users could coordinate multiple devices without losing meaningful offsets or triggering unstable update cascades.

---

# 8. Making complex workflows safer to change

## The problem

The product combines pure domain rules, asynchronous state, persistence, external devices, platform services, and multi-screen UI workflows. A single test style could not provide fast feedback and confidence across all of those boundaries.

Physical hardware was also not consistently available for development and integration testing.

## What I designed

I treated testing and developer tooling as part of the product architecture.

### Layered testing

```text
Domain Rules
     |
     v
Application State and Use Cases
     |
     v
Infrastructure Adapters
     |
     v
Widget Contracts
     |
     v
Connected Integration Workflows
```

The strategy uses:

- Unit tests for value objects, parsing, validation, and transformations
- BLoC/Cubit tests for state transitions and asynchronous coordination
- Fakes and mocks for persistence, protocol, discovery, and platform boundaries
- Widget tests for important interaction and rendering contracts
- Integration tests for selected connected workflows

### Reusable BDD integration platform

```text
Gherkin Feature
      |
      v
Feature Selector
      |
      v
Step Definition Registry
      |
      v
Reusable Steps, Finders, and Wait Helpers
      |
      v
Scenario World
      |
      v
Connected Flutter Application
      |
      v
Reports and Regression Signals
```

The framework supports feature discovery, focused execution, reusable steps, scenario-scoped state, stable finders, bounded synchronization, cleanup, and structured reporting.

### Hardware-free development environment

A Linux workflow provisions the environment, starts host and module test doubles, tracks process groups, and performs graceful cleanup.

```text
Bootstrap -> Run Test Doubles -> Track Runtime -> Stop and Reset
```

## Why it mattered

Business rules became executable documentation. Developers could run focused workflows, isolate external dependencies, and continue meaningful integration work without always depending on scarce physical devices.

## Technical deep dive

`KeyService` and `KeyFinder` provide semantic UI identity shared by production widgets and tests. Typed keys identify paths, slots, ports, modules, labels, and side-chain indicators without coupling tests to visible text or widget hierarchy.

The Linux automation work was implemented with assistance from GitHub Copilot. Engineering ownership remained in defining the workflow, reviewing systems behavior, validating process lifecycle decisions, and checking the result against real testing needs.

---

# 9. Keeping interactive hardware controls responsive at scale

## The problem

The dashboard combines multiple animated Rive panels, live meters, hover feedback, nested scrolling, zooming, and drag interactions. Broad state changes could cause unnecessary rebuilds or competing gesture interpretations.

## What I designed

Performance work focused on ownership boundaries and update scope:

- Per-module animation state boundaries
- Selective rebuild predicates
- Controller-level updates for high-frequency visual values
- Separate drag and scroll interaction modes
- Focused scroll coordination
- Preserved dashboard view state
- Explicit controller, stream, pointer, and timer cleanup

```text
Dashboard
    |
    v
Path Panel and Scroll Coordination
    |
    v
Module Control
   / | \
State Rive Drag
Boundary Controller Interaction
    |      |      |
    +------+------+
           |
           v
     Module Repository
```

## Why it mattered

The interface could grow to include more animated controls without requiring every update to invalidate the entire dashboard. Interaction behavior remained more predictable because dragging and navigation were treated as distinct modes.

## Evidence note

The final portfolio should attach profiling traces, frame timing, rebuild counts, or a before/after comparison before making numerical performance claims. The architectural improvement is clear; quantified impact should be added only where verified.

---

# 10. My engineering responsibility

| Area | Responsibility | Resulting value |
|---|---|---|
| Architecture | Defined feature, state, lifecycle, and protocol boundaries | Made ownership and change impact easier to reason about |
| Protocol integration | Designed typed communication and domain mappings | Kept product features independent of binary device details |
| Signal-path systems | Modeled layout constraints and matrix conversion | Made complex routing deterministic and safer to apply |
| Reliability | Designed conflict resolution and reconnect behavior | Preserved user intent through changing hardware conditions |
| Testing | Built layered and reusable workflow verification | Improved regression confidence and failure localization |
| Performance | Localized animation state and interaction coordination | Reduced broad UI work and protected responsiveness |
| Developer enablement | Created repeatable hardware-free environment workflows | Reduced dependence on scarce physical test hardware |

Where work was collaborative, this portfolio distinguishes architecture owned or co-owned from broader team outcomes. Evidence links, tests, and recordings should be attached to individual claims in the final UI.

---

# 11. Tradeoffs and lessons

## Explicit models versus simple implementation

Typed protocol models, canonical snapshots, nullable layout matrices, and structured identity objects add code. They are worthwhile when they make invariants visible, protect a boundary, or prevent unsafe mutation.

## Central coordination versus distributed flexibility

Repositories and lifecycle managers carry substantial orchestration responsibility. That complexity is accepted to prevent duplicated state, conflicting mutation paths, and unclear resource ownership.

## Higher-level tests versus fast feedback

Integration and widget tests are slower and harder to diagnose. They are reserved for behavior that cannot be proven lower in the stack, while domain and application tests provide most of the rapid feedback.

## Recovery versus silent best effort

Configuration recall and device lifecycle management prefer explicit feedback and recovery over silently applying an approximate result. This increases state complexity but protects user intent and hardware state.

## Next improvements

- Add property-based round-trip tests for matrix and codec conversions.
- Formalize device lifecycle behavior as an explicit state machine.
- Strengthen online/offline repository contract tests.
- Add schema versioning and migration for configuration files.
- Make propagation rules pure and table-driven.
- Establish measurable performance budgets and automated frame-timing scenarios.
- Improve diagnostics for malformed topology and protocol data.

---

# Recommended reading paths

## For recruiters — three minutes

### 1. Read the opening and three outcomes

**Message:** This was a real hardware-connected product, and the work improved reliability, extensibility, and team productivity.

### 2. Read “Restoring user configurations safely”

**Message:** The candidate solved a clear user-risk problem involving changing hardware and preserved user intent.

### 3. Read “Building a hardware communication platform”

**Message:** The candidate made complicated technology usable by the rest of the product.

### 4. Read “Making complex workflows safer to change”

**Message:** The candidate improved how the team tested and developed the product, not only how one feature worked.

### 5. Read “My engineering responsibility”

**Message:** The candidate owned cross-cutting architecture and delivery concerns.

## For senior engineers — ten minutes

1. Start with the engineering challenge and system context.
2. Inspect state ownership and device lifecycle guarantees.
3. Follow the protocol boundary into Grid and matrix conversion.
4. Review configuration identity matching and original/resolved state separation.
5. Inspect testing seams, BDD extension behavior, and hardware-free execution.
6. Review performance ownership and evidence requirements.
7. Finish with tradeoffs, rejected simplicity, and next improvements.

Technical deep dives should expose concrete invariants, concurrency behavior, failure semantics, testing evidence, profiling evidence, and personal ownership without interrupting the recruiter path.

---

## Final statement

> I worked across architecture, protocol integration, state management, routing systems, testing, performance, and developer experience to make a complex hardware-connected application easier to extend, safer to recover, and more reliable to operate.
