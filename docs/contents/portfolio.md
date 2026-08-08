# Sepia Client

## Engineering Case Study

> Designed the architecture and engineering workflows that made a complex, hardware-connected audio application predictable to extend, safe to recover, testable across boundaries, and responsive under real interaction load.

---

## Overview

Sepia Client is a Flutter application for controlling professional audio hardware through complex device protocols, dynamic signal paths, configurable modules, and responsive visual controls.

The product combines:

- Hardware discovery and lifecycle management
- AES70/OCA protocol communication
- Dynamic module composition
- Matrix-based signal routing
- Configuration persistence and recall
- Multi-module control synchronization
- Rive-powered interactive controls
- Connected and offline workflows
- Layered unit, widget, integration, and BDD testing
- Linux-based hardware test doubles

The central engineering challenge was not building isolated screens. It was creating boundaries that kept user intent, domain state, protocol communication, external resources, and visual interaction consistent as the hardware environment changed.

## Engineering Highlights

| Area | Contribution | Engineering signal |
|---|---|---|
| Protocol engineering | Designed a typed AES70 SDK | Converted binary communication into maintainable application APIs |
| State architecture | Established repository-owned state and lifecycle boundaries | Separated durable user intent from volatile connectivity |
| Signal-path modeling | Built Grid and matrix conversion boundaries | Translated visual routing into validated hardware operations |
| Reliability | Designed configuration conflict resolution and recovery | Prevented unsafe restoration when hardware topology changed |
| Testing | Created layered testing and reusable BDD infrastructure | Made complex asynchronous workflows executable and repeatable |
| Performance | Localized Rive state and narrowed rebuild scopes | Preserved responsiveness across multiple animated panels |
| Developer experience | Automated a Linux hardware-free test environment | Reduced setup friction and stale-process failures |

---

# 1. System Architecture

## Ownership and State

### Repository-owned module state

Module behavior crosses UI controls, device communication, offline simulation, stereo and split configuration, presets, and asynchronous updates. The `ModuleRepository` provides one feature-owned contract for this behavior.

Online and offline implementations share the same application-facing boundary while keeping their runtime details separate. Immutable repository snapshots provide a stable source for BLoCs and presentation components.

```text
Presentation
     |
     v
Module BLoC
     |
     v
Module Repository Contract
   /                 \
Online Runtime    Offline Runtime
   |                   |
Device Transport   Simulated Data
```

This prevents screens and neighboring features from mutating transport-specific state directly.

### State retention across lifecycle changes

The application distinguishes between:

- Durable user intent and module configuration
- Current connection availability
- Runtime-resolved device state
- UI-specific presentation state

Repositories retain durable feature state while infrastructure manages connection recovery. BLoCs initialize from repository snapshots and subscribe to repository streams rather than recreating hardware state whenever a screen changes.

## Device lifecycle management

External devices can disappear, reappear, change network addresses, or respond slowly. The device lifecycle coordinator owns:

- Discovery
- Connection initialization
- Duplicate connection prevention
- Reconnection
- Failure tracking
- Repository creation and removal
- Timers and listeners
- Stream propagation
- Ordered disposal

Connecting and connected endpoints are tracked separately so concurrent discovery, manual connection, and reconnect operations do not create duplicate repositories.

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

The lifecycle boundary keeps unreliable external systems from destabilizing application state and makes resource ownership explicit.

## AES70 SDK and protocol abstraction

Application features should not need to understand binary message layouts, object identifiers, parameter encoding, response statuses, or notification formats.

The SDK provides a layered boundary:

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
OCP1 / Binary Codec Layer
        |
        v
Injected Transport
        |
        v
Professional Audio Hardware
```

The command path centralizes:

- Request construction
- Message framing
- Serialization and deserialization
- Correlation of asynchronous responses
- Status validation
- Typed payload decoding
- Error interpretation
- Notification handling

Transport ownership remains with the host application through dependency injection. This keeps connection and retry policy outside the SDK and makes protocol behavior easier to test with simulated responses.

### Why this matters

The application gains a consistent API for managers, workers, sensors, actuators, matrix controls, and notifications. New hardware capabilities can be added without distributing protocol details throughout the product.

---

# 2. Signal-Path and Configuration Domain

## Grid dynamic module layout

Grid is a visual matrix editor for arranging heterogeneous modules into ordered signal paths.

A simple list could not represent the domain because modules may be:

- Single-width
- Dual-width
- Stereo
- Split into independent parts
- Duplicated
- Empty but still valid drop targets

The layout uses explicit nullable matrix slots so occupancy, alignment, and available capacity remain visible in the domain model.

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

Drag context includes source path, source slot, module identity, and split-part information. Accepted drops become serialized application events, allowing placement, movement, copying, stereo handling, and synchronization to execute deterministically.

Validation checks:

- Module ordering
- Input-slot compatibility
- Host consistency
- Stereo and dual-width placement
- Split-part constraints
- Synchronization with host-facing path data

## Matrix conversion engine

The visual editor expresses intent as paths, modules, buses, and channel relationships. Hardware exposes a two-dimensional collection of addressable matrix objects.

The conversion engine provides a deterministic translation boundary:

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

The engine supports both directions:

- Reconstructing domain paths from hardware matrix state
- Generating matrix operations from Grid state

It explicitly handles:

- Source and sink orientation
- Stereo and split modules
- Dual-width placement
- Buses
- Side chains
- Host ownership
- Port mappings
- Deferred dependency resolution

Before a write reaches hardware, desired connections are compared with current state and validated against the permitted topology. Conflicting connections are muted before desired connections are unmuted, reducing the risk of invalid intermediate states.

## Configuration recall and conflict resolution

A saved configuration must remain meaningful even when hardware changes between save and restore.

The recall system models a configuration as a canonical snapshot containing hosts, paths, ports, buses, modules, control groups, and routing data.

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

Persisted configuration remains separate from resolved runtime state. This means a temporary adaptation does not overwrite the user's original intent. If missing hardware returns or the topology changes again, the resolution can be recalculated.

Conflict severity distinguishes recoverable differences from conditions that make restoration unsafe. Missing modules can trigger targeted path clearing and stereo relationship handling instead of silently applying invalid references.

## Module ganging

The ganging system allows compatible modules to behave as one coordinated control group.

It supports:

- Absolute synchronization
- Relative synchronization
- Stable membership metadata
- Multiple connected hosts
- Dynamic membership changes
- Control-type-specific propagation

Absolute synchronization forwards the source value directly. Relative synchronization calculates the source delta and applies that delta to each peer, preserving meaningful offsets.

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

Propagated updates carry origin information so they are not treated as new user sources. This prevents recursive feedback loops.

---

# 3. Testing and Developer Experience

## Layered application testing

The test architecture mirrors feature ownership and architectural boundaries.

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

The strategy includes:

- Fast unit tests for value objects, parsers, validation, and transformations
- BLoC and Cubit tests for state transitions and asynchronous coordination
- Infrastructure tests with deterministic fakes and generated mocks
- Widget tests for important interaction and rendering contracts
- Integration tests for connected multi-unit workflows

This makes failures easier to localize to domain, application, infrastructure, presentation, or integration behavior.

## BDD integration platform

The BDD framework turns product-readable workflows into executable specifications.

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

The framework provides:

- Feature discovery and focused execution
- Reusable step definitions
- Scenario-scoped state
- Stable semantic finders
- Bounded synchronization helpers
- Consistent setup and cleanup
- Structured reporting

New workflows can be added by composing existing vocabulary or introducing one focused step without rebuilding the test runner.

## Structured UI identity

`KeyService` and `KeyFinder` provide a shared identity contract for production widgets, widget tests, and integration tests.

Typed dynamic keys can identify:

- Paths
- Slots
- Ports
- Modules
- Labels
- Side-chain indicators

This avoids selectors based on visible text or fragile widget hierarchy. Contract tests verify key stability, uniqueness, dynamic naming, and lookup behavior.

## Linux hardware-free test environment

Physical hardware was not consistently available for development and integration testing. A Linux automation workflow replaced that dependency with repeatable host and module test doubles.

```text
Bootstrap
   |
   +--> Network, Dependencies, Toolchain
   |
   v
Run Orchestrator
   |
   +--> Host Test Double
   +--> Module Test Doubles
   +--> Supporting Services
   |
   v
Tracked Runtime State
   |
   v
Stop Orchestrator
   |
   +--> Graceful Group Shutdown
   +--> Forced Cleanup if Needed
   +--> Runtime Reset
```

The workflow separates:

- Environment bootstrap
- Service startup
- Preset loading
- Command-line overrides
- Process tracking
- Graceful shutdown
- Runtime cleanup

GitHub Copilot assisted with Bash and Linux implementation details. The workflow requirements, testing scenarios, review, and validation remained engineering responsibilities, ensuring the automation matched the real development environment.

---

# 4. Performance Engineering

The dashboard renders multiple Rive-powered module controls while coordinating live state, meters, hover feedback, nested scrolling, zooming, and drag interactions.

Performance work focused on ownership and rebuild scope rather than generic optimization.

Key decisions included:

- Per-module Rive state boundaries
- Selective rebuild predicates
- Controller-level updates for high-frequency visual values
- Separate interaction modes for dragging and scrolling
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

The result is a clearer separation between structural Flutter rebuilds and high-frequency animation updates. Claims about frame rate or reduced jank should be supported in the final portfolio with representative profiling or frame-timing evidence.

---

# 5. Contributions and Ownership

## Architecture

- Designed repository and lifecycle ownership boundaries.
- Created a typed protocol SDK boundary around AES70 communication.
- Established deterministic conversion between domain paths and matrix operations.
- Modeled configuration identity, conflict severity, and recovery behavior.

## Testing

- Structured tests around feature and architectural layers.
- Built reusable BDD integration infrastructure.
- Introduced semantic widget identity shared by UI and tests.
- Added deterministic seams for asynchronous and external-system behavior.

## Performance

- Localized animation state ownership.
- Reduced unnecessary rebuild scope.
- Coordinated drag, scroll, hover, and nested interaction modes.
- Preserved extensibility for additional modules and animated panels.

## Developer experience

- Replaced scarce hardware with a repeatable Linux test-double environment.
- Documented setup, execution, and cleanup as executable workflows.
- Supported focused test execution and reusable scenario extension.
- Used Copilot as an implementation partner while retaining review and validation ownership.

---

# 6. Lessons and Tradeoffs

## Explicit models versus implementation simplicity

Typed protocol models, canonical snapshots, nullable layout matrices, and structured identity objects add code. The cost is justified when the model protects a boundary, makes an invariant visible, or prevents unsafe mutation.

## Central coordination versus distributed flexibility

Repositories and lifecycle managers carry meaningful orchestration responsibility. This creates larger ownership boundaries, but avoids duplicate state, conflicting mutation paths, and unclear resource ownership.

## Higher-level tests versus fast feedback

Integration and widget tests are slower and harder to diagnose. They are reserved for behavior that cannot be proven lower in the stack, while domain and application tests provide most of the fast feedback.

## Recovery versus silent best effort

Configuration recall and device lifecycle management prefer explicit conflict feedback and recovery over silently applying an approximate result. This increases UI and state complexity but protects user intent and hardware state.

## Future improvements

- Add property-based round-trip tests for matrix and codec conversions.
- Formalize device lifecycle behavior as an explicit state machine.
- Strengthen online/offline repository contract tests.
- Add schema versioning and migration for configuration files.
- Make propagation rules pure, table-driven, and easier to verify.
- Establish measurable performance budgets and automated frame-timing scenarios.
- Improve diagnostics for malformed topology and protocol data.

---

# 7. Recommended Evidence

## Flagship workflow

Record one end-to-end sequence:

1. Compose a signal path in Grid.
2. Place a stereo or split module.
3. Convert the path into validated matrix operations.
4. Save the configuration.
5. Change the connected hardware topology.
6. Reload and inspect conflicts.
7. Resolve the runtime state without overwriting saved intent.
8. Demonstrate that the UI and module state remain coherent.

## Supporting artifacts

- System architecture diagram
- Protocol command lifecycle animation
- Configuration conflict matrix
- Grid matrix visualization
- BDD test execution capture
- Before/after performance evidence
- Linux environment lifecycle recording

---

## Final portfolio statement

> I worked across architecture, protocol integration, state management, testing, performance, and developer experience to make a complex hardware-connected application easier to extend, safer to recover, and more reliable to operate.
