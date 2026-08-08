# Repository Ownership Architecture

## Navigation

- Challenges
  - Repository Ownership Architecture
- Architecture
  - Ownership Boundaries
  - State Flow
  - Runtime Variants
- Contributions
  - Architecture
  - Maintainability
  - Testability

## Portfolio Card

**Title:** Repository Ownership Architecture

**Summary:** A feature-centered repository boundary that keeps module state, device behavior, and synchronization behind a stable API.

**Skills:** Architecture • State Management • Domain Modeling

**Key Achievement:** Established a predictable ownership model in which module workflows are coordinated through the Module Repository rather than through cross-feature mutation.

## Summary

The Module Repository acts as the owner of module identity, configuration, presentation data, lifecycle, and module-specific state. Application BLoCs and presentation widgets consume that contract, while online and offline implementations provide different runtime behaviors behind the same boundary.

## Problem

Module behavior spans device communication, offline simulation, Rive-driven controls, stereo and split configuration, presets, and asynchronous updates. Allowing screens or neighboring features to modify these concerns directly would duplicate state and make synchronization difficult to reason about. The architecture needed a single feature owner without forcing consumers to understand transport or persistence details.

## Solution

The feature defines `ModuleRepository` as the domain-facing contract for module identity, capabilities, control data, stereo transitions, split configuration, and state streams. `ModuleRepositoryOnline` and `ModuleRepositoryOffline` implement that contract for connected and simulated workflows, allowing consumers to remain runtime-agnostic.

Mutable module state is held inside the repository implementations and represented through immutable `ModuleRepositoryStateData` snapshots. Repository methods such as state updates, stereo changes, split operations, and control-value changes provide the mutation boundary. `ModuleBloc` subscribes to repository streams and translates updates into UI state, while presentation code sends intent through the repository API instead of reaching into transport or device internals.

## Outcome

The design reduces cross-feature coupling and gives module behavior a clear home. Consumers can render and coordinate workflows using stable abstractions, while online and offline behavior evolve independently. Stream-based updates also make asynchronous changes observable and keep UI state aligned with repository-owned data.

## Key Challenges

### Distributed Module State

Module configuration includes stereo mode, split parts, path labels, chaining, selected controls, and runtime metadata.

**Solution:** Centralized module-specific state in the repository and exposed immutable snapshots through `ModuleRepositoryStateData`.

### Online and Offline Parity

Connected hardware and simulated modules require different initialization and side-effect behavior.

**Solution:** Shared the `ModuleRepository` contract while separating online and offline implementations.

### Asynchronous Synchronization

Device updates, control changes, and UI reactions can arrive on different timelines.

**Solution:** Used repository-owned streams as the notification boundary and had `ModuleBloc` translate them into emitted screen state.

### Cross-Feature Mutation Risk

Direct access to device or transport details would let consumers bypass ownership rules.

**Solution:** Kept application consumers dependent on the repository abstraction rather than concrete communication mechanisms.

### Derived Module Relationships

Stereo pairs, slot identity, split parts, and preset representations must remain coherent.

**Solution:** Encapsulated relationship and transformation logic in repository operations and feature-local extensions.

## Architecture Highlights

### Repository as Feature Owner

The Module Repository owns module lifecycle, capabilities, control data, and module-specific configuration.

**Tradeoff:** The repository contract is broad, but the feature gains one authoritative mutation boundary and avoids duplicated state.

### Domain Contract with Multiple Implementations

`ModuleRepository` separates consumer expectations from online and offline runtime details.

**Tradeoff:** Implementations must maintain behavioral parity, but testing and simulation become substantially easier.

### Immutable State Snapshots

`ModuleRepositoryStateData` uses value semantics and `copyWith` updates for configuration changes.

**Tradeoff:** Updates allocate new snapshots, but state transitions are easier to compare, stream, test, and debug.

### Stream-Based Data Flow

Repository streams notify application BLoCs about state, control, metering, and stereo changes.

**Tradeoff:** Subscription lifecycle must be managed carefully, but consumers avoid polling and remain decoupled from event producers.

### Application-to-Presentation Translation

`ModuleBloc` consumes repository data and emits UI-facing state rather than exposing repository internals directly to widgets.

**Tradeoff:** The BLoC adds a translation step, but presentation remains simpler and the ownership boundary stays explicit.

## Senior Engineering Signals

- Established a single owner for module-specific state.
- Preserved runtime independence through online/offline implementations.
- Separated domain contracts from concrete communication behavior.
- Reduced cross-feature mutation and hidden coupling.
- Used immutable snapshots to make transitions predictable.
- Converted asynchronous repository updates into UI-facing BLoC state.
- Encapsulated stereo, split, and preset relationship logic.
- Designed a boundary that supports simulation and future implementation changes.

## Interview Talking Point

### What made this difficult?

Module behavior crossed UI, device communication, visual control data, and asynchronous synchronization. The difficult part was defining one ownership boundary without losing the flexibility required by connected and offline workflows.

### Why was this solution chosen?

A repository contract gave every consumer the same feature API while allowing online and offline implementations to differ internally. This reduced coupling and made state flow observable through explicit streams.

### What tradeoffs existed?

The repository owns a substantial surface area, and stream subscriptions require disciplined lifecycle management. Those costs were accepted to avoid fragmented module state and consumers that depend on transport-specific behavior.

### What would you improve?

The next refinement would be to narrow mutation access further by replacing broad setters with intent-oriented methods or commands, while preserving the repository as the sole state owner.

## Media Suggestions

- Repository-to-BLoC data-flow diagram
- Online versus offline implementation comparison
- State ownership boundary diagram
- Stereo and split configuration workflow
- Before/after view of direct mutation versus repository-mediated updates

## Diagram

```text
Presentation
     |
     | intents and subscriptions
     v
Module BLoC
     |
     | feature contract
     v
Module Repository
   /           \
  v             v
Online       Offline
Runtime      Runtime
  |             |
  v             v
Device /     Simulated /
Transport    Local Data
```

## Portfolio Callout

> Designed a repository boundary that keeps module state authoritative, runtime implementations replaceable, and UI consumers independent of device-specific behavior.

## Evidence Map

- `lib/feature/module/domain/module_repository.dart` — feature contract and mutation boundary (lines 23–145).
- `lib/feature/module/domain/model/module_repository_state_data.dart` — immutable module configuration snapshot (lines 4–144).
- `lib/feature/module/application/module_repository_online.dart` — connected implementation and repository-owned streams (lines 40–170, 390–470).
- `lib/feature/module/application/module_repository_offline.dart` — offline implementation behind the same contract (lines 32–130, 330–430).
- `lib/feature/module/application/blocs/module_bloc/module_bloc.dart` — repository subscription and UI-state translation (lines 8–132).
