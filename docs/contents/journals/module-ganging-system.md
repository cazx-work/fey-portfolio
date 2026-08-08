# Module Ganging System

## Navigation

Challenges
└─ Module Ganging System

Architecture
├─ Group Identity
├─ Propagation Rules
├─ State Ownership
└─ Lifecycle

Contributions
├─ Architecture
├─ State Management
├─ Mathematical Transformations
└─ Reliability

## Portfolio Card

**Title:** Predictable Multi-Module Control Synchronization

**Summary:** A synchronized control system that lets users operate compatible modules as one coordinated group.

**Skills:** State Management • Event Propagation • Mathematical Modeling

**Key Achievement:** Implemented absolute and relative synchronization while preventing propagated updates from recursively re-entering the control flow.

## Summary

The Module Ganging System allows users to group compatible modules so a control change on one module is reflected across the group. It supports absolute synchronization, relative offsets, persisted group metadata, dynamic membership, and multiple connected hosts.

## Problem

Independent modules are useful for local control, but repetitive when several compatible modules must move together. The system needed to coordinate modules across connections without confusing external updates with user intent, losing relative offsets, or creating feedback loops as synchronized values arrived back through the event stream.

## Solution

The implementation establishes a repository-owned model of gangs, with each group identified by compatible module identity and a stable membership descriptor. A BLoC exposes user intents such as create, delete, add, remove, and update type, while the repository translates those intents into group metadata and control propagation.

Absolute ganging forwards the source value to peer controls. Relative ganging computes the source delta and applies that delta to each peer's current value, preserving each module's starting relationship. Control-type rules handle continuous controls and fixed-value interactions separately. Propagated writes are marked as internally generated so they do not become new sources, while subscriptions are rebuilt when the connected module set changes.

## Outcome

Users can control several compatible modules as a coherent system while retaining either shared values or intentional offsets. The design makes synchronization behavior explicit, supports modules distributed across multiple hosts, and gives future changes a clear boundary for testing and refinement.

## Key Challenges

### Distinguishing Intent from Echoes

A propagated write can return through the same update stream as a direct user action.

**Solution:** Classify updates by origin and ignore internally propagated values as new synchronization sources.

### Absolute and Relative Semantics

A single assignment rule cannot preserve both equal values and meaningful per-module offsets.

**Solution:** Use direct value assignment for absolute gangs and apply the source change delta for relative gangs.

### Multiple Connected Hosts

A gang may span modules discovered through different host connections and slot locations.

**Solution:** Resolve membership through host and slot descriptors, then address each peer through its owning module and host boundary.

### Stable Group Discovery

Groups must be reconstructed from connection state and remain valid when modules appear or disappear.

**Solution:** Derive gangs from shared metadata, validate compatible module identity, and rebuild subscriptions as the connected topology changes.

### Conflicting Presentation Metadata

Several groups may initially request the same visual identifier.

**Solution:** Detect collisions, temporarily suspend reactive reconstruction, reassign available identifiers, and publish the resolved group list.

## Architecture Highlights

### Repository-Owned Coordination

The repository owns group discovery, membership resolution, control subscriptions, and propagation across module boundaries.

**Tradeoff:** The repository carries substantial coordination responsibility, but synchronization behavior remains centralized instead of being duplicated across widgets.

### Intent-Based BLoC Events

The presentation layer communicates operations such as create, delete, and change type as explicit events.

**Tradeoff:** User actions pass through more layers, but the UI remains decoupled from connection and control mechanics.

### Metadata-Based Membership

Group membership is represented by stable host-and-slot descriptors rather than transient widget state.

**Tradeoff:** Reconciliation is required when topology changes, but groups can be reconstructed across discovery and persistence flows.

### Origin-Aware Propagation

Every propagated control update carries enough origin information to distinguish it from a direct source update.

**Tradeoff:** Event payloads and routing rules become more deliberate, preventing recursive synchronization and unpredictable cascades.

### Transformation by Control Type

Continuous controls, switches, and fixed-value controls follow separate propagation rules.

**Tradeoff:** The behavior matrix is more explicit, but it avoids applying numeric transformations where they do not represent the control's semantics.

## Senior Engineering Signals

- Designed a reusable synchronization boundary across connected modules
- Modeled absolute and relative behavior as distinct domain semantics
- Applied delta-based mathematical transformation to preserve offsets
- Prevented recursive event propagation through update-origin tracking
- Reconciled group state from changing connection topology
- Validated compatibility before creating a group
- Centralized multi-host membership resolution
- Kept presentation events separate from infrastructure-side effects

## Interview Talking Point

### What made this difficult?

The difficult part was not copying a value; it was defining which updates represented user intent, preserving relative relationships, and coordinating modules that could be discovered through different connections. Every write could potentially generate another event, so the flow needed an explicit feedback-loop boundary.

### Why was this solution chosen?

A centralized repository could observe all module streams, resolve group membership, and apply the correct propagation rule without giving individual widgets knowledge of the connected topology. BLoC events kept UI actions explicit while leaving synchronization decisions in the feature-owned coordination layer.

### What tradeoffs existed?

Central coordination improves consistency but increases repository responsibility. Metadata-based membership is resilient to reconstruction and persistence, but requires validation and reconciliation when modules disconnect. Relative synchronization preserves offsets, but its meaning depends on the source and peer values being interpreted consistently.

### What would you improve?

I would isolate the propagation calculation into a pure, table-driven policy component and add focused tests for absolute, relative, fixed-value, switch, missing-control, disconnect, and multi-module scenarios. I would also make subscription lifecycle and update-origin state more explicit and observable.

## Media Suggestions

- Before/after workflow showing independent versus grouped control
- State-flow diagram for direct and propagated updates
- Animation of absolute versus relative movement
- Multi-host topology diagram showing group membership
- Short video demonstrating group creation, expansion, and removal

## Diagram

```text
User Control
     ↓
Intent Events
     ↓
Gang Coordinator
     ├─ Validate compatible modules
     ├─ Resolve host/slot membership
     └─ Select absolute or relative rule
             ↓
      Peer Module Controls
             ↓
      Origin-Aware Updates
             └─ Propagated echoes do not re-enter as sources
```

## Portfolio Callout

> Designed predictable multi-module synchronization with absolute and delta-based relative control propagation, while preventing recursive update feedback.
