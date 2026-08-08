# State Retention Architecture

## Navigation

- Challenges
  - State Retention Architecture
- Architecture
  - Long-Lived Ownership
  - Reconnection Boundaries
  - UI Transition Consistency
- Contributions
  - Repository Design
  - Reactive State Propagation
  - Lifecycle Resilience

## Portfolio Card

**Title:** State Retention Architecture

**Summary:** A predictable state model for keeping application intent aligned with changing hardware connectivity.

**Skills:** Flutter BLoC • Repository Architecture • Lifecycle Synchronization

**Key Achievement:** Established a durable repository-owned state boundary that allowed UI flows to survive connection changes without unnecessary hardware reinitialization.

## Summary

State Retention Architecture defines how module state remains consistent while hardware connections are initialized, interrupted, restored, or intentionally changed. Repositories own durable feature data, BLoCs expose immutable UI state, and infrastructure handles transport-specific lifecycle work.

## Problem

The application had to represent both stable user intent and volatile device availability. Rebuilding UI controllers or reconnecting hardware for every screen transition could discard selections, routing metadata, stereo relationships, and control values. Without a clear ownership model, reconnects risked producing stale screens, duplicated subscriptions, or inconsistent transitions between stereo and split configurations.

## Solution

The design places long-lived module state in repository instances and exposes it through immutable domain models and streams. Repository state includes configuration and presentation-relevant metadata such as path labels, host relationships, split assignments, Grid-load status, and validation results. BLoCs initialize from the repository snapshot, then subscribe to repository updates and emit immutable UI state.

Online and offline repositories share the same contract while isolating transport behavior. The online implementation owns connection and data-repository lifecycle concerns; the offline implementation preserves equivalent state behavior without hardware communication. Reconnection is treated as infrastructure recovery rather than a reason to recreate application state. Explicit stereo transitions update dependent selections and derived flags, while UI listeners react to streams instead of initiating transport work themselves.

## Outcome

The architecture made lifecycle behavior more predictable, reduced unnecessary hardware reconnections, and preserved user-visible context across UI transitions. It also gave future features a clear extension point: repositories coordinate durable state and side effects, while BLoCs translate changes into narrowly scoped UI updates.

## Key Challenges

### Volatile Connectivity

Hardware availability can change independently of the UI lifecycle.

**Solution:** Kept durable module state at the repository boundary and treated connection recovery as a separate infrastructure concern.

### Multiple Representations of State

The same module must be represented by domain data, repository state, and UI state without creating competing sources of truth.

**Solution:** Initialized BLoCs from repository snapshots and synchronized subsequent changes through explicit repository streams.

### Stereo and Split Transitions

Changing module topology affects selected controls, slot identity, mono counts, and visible presentation.

**Solution:** Centralized transition coordination in the repository contract and emitted dedicated update events for dependent UI flows.

### Rebuild and Reconnect Pressure

Screen reconstruction should not imply a new device session or reset local context.

**Solution:** Reused long-lived repository instances and allowed presentation BLoCs to attach or detach from them independently.

### Online and Offline Parity

Different transport modes still need consistent application behavior.

**Solution:** Shared a repository abstraction and common state-update behavior while keeping connection-specific implementation details behind each concrete repository.

## Architecture Highlights

### Repository-Owned Durable State

Module configuration and lifecycle metadata are retained by the repository rather than hidden in widgets or mutable BLoC fields.

**Tradeoff:** Repository objects have a longer lifecycle and require explicit cleanup, but state ownership remains unambiguous.

### Snapshot Plus Stream Synchronization

BLoCs receive an initial repository snapshot and then subscribe to incremental updates.

**Tradeoff:** Consumers must manage subscriptions carefully, but transitions are observable and UI state remains testable.

### Stable Application Contract

Online and offline repositories expose the same application-facing capabilities.

**Tradeoff:** The abstraction requires disciplined parity between implementations, but it prevents transport details from leaking into presentation code.

### Explicit Lifecycle Transitions

Stereo changes, slot relationships, and connection recovery are modeled as intentional transitions rather than incidental widget effects.

**Tradeoff:** Transition coordination is more deliberate, but it avoids hidden side effects and inconsistent intermediate UI states.

### Reactive Presentation Boundaries

Rive controls, labels, meters, and module indicators consume repository streams through focused BLoCs or listeners.

**Tradeoff:** More subscription plumbing is required, but rebuilds remain localized and presentation stays decoupled from hardware operations.

## Senior Engineering Signals

- Designed a single durable ownership boundary for feature state
- Separated volatile transport lifecycle from application state
- Preserved user context across reconnect and UI reconstruction scenarios
- Established parity between online and offline repository behavior
- Used immutable BLoC state for predictable rendering
- Coordinated topology changes without pushing hardware logic into widgets
- Managed stream subscriptions and repository cleanup explicitly
- Reduced coupling between presentation and device infrastructure

## Interview Talking Point

### What made this difficult?

The difficult part was not rendering the module UI; it was maintaining agreement between user intent, hardware state, and multiple representations of the same module while connectivity and topology changed asynchronously.

### Why was this solution chosen?

A repository was the most stable boundary available to both UI flows and infrastructure. It could retain durable state, expose reactive updates, and hide whether the module was online or operating through an offline representation.

### What tradeoffs existed?

Long-lived repositories improve continuity but increase lifecycle responsibility. Streams improve decoupling but require explicit subscription cancellation and careful handling of ordering, stale events, and transitions.

### What would you improve?

I would make lifecycle states and reconnect semantics even more explicit, add focused contract tests for online/offline parity, and formalize event ordering guarantees for concurrent device updates and user actions.

## Media Suggestions

- Architecture diagram showing UI, BLoC, repository, and infrastructure ownership
- Reconnect walkthrough demonstrating preserved module context
- Before/after comparison of UI behavior during a connection interruption
- State transition diagram for stereo, mono, and split configurations
- Short workflow video showing a module surviving screen reconstruction

## Diagram

```text
UI
 ↓  user intent and rendering
BLoC
 ↓  immutable UI-facing state
Repository
 ├─ durable module state
 ├─ lifecycle coordination
 └─ online/offline contract
 ↓
Infrastructure
 ├─ connection recovery
 └─ hardware synchronization
```

## Portfolio Callout

> Designed a repository-centered state boundary that kept hardware synchronization predictable without sacrificing UI continuity during reconnects and topology changes.
