---
type: story
slug: visual-routing
title: Visual Routing
project: SEPIA
visibility: public
status: published
featured: false
tags: Routing, Domain Modeling, Flutter
---

# Visual Routing

## Executive Content

### Overview

An operator composes signal paths using modules, channel relationships, and dependencies; hardware receives coordinate-driven matrix operations. I introduced a deterministic translation boundary that preserves that intent, validates it against the active topology, and applies changes in a safe order.

### Problem

The visual editor speaks in paths, modules, stereo or split relationships, buses, and side chains. Hardware exposes addressable matrix cells with different coordinate and ordering rules. Without an explicit conversion boundary, a visually plausible edit could produce an incorrect route, leak data from another host, or create a conflicting intermediate state during mutation.

### What changed

- Converted drag intent into validated domain updates instead of treating a widget change as a hardware operation.
- Used a boolean matrix and explicit coordinate mapping as the deterministic intermediate representation.
- Modeled multi-cell, stereo, split, bus, and side-chain relationships at the domain boundary.
- Scoped generated routes to the active host and validated them against permitted topology before mutation.
- Sequenced conflicting changes before enabling desired connections.
- Reconstructed visual state from external updates without introducing a second source of truth.

### Why it matters

Routing became inspectable and testable as domain behavior rather than fragile UI side effects. The same conversion boundaries made coordinate errors, topology mismatches, dependency-order failures, and round-trip drift easier to isolate before they reached hardware.

## Technical Deep-Dive

### Investigation focus

The defect surface was not limited to the routing screen. The Grid represented intent as ordered paths, module slots, and relationships, while the communication boundary represented the same intent as addressable source/sink cells. The investigation traced one route in both directions:

1. Reconstruct domain paths from the host's current matrix to check coordinate orientation and graph ordering.
2. Build a desired matrix from Grid state to check module footprints, channel relationships, and host ownership.
3. Compare the desired and current matrices before any external mutation.
4. Exercise the dependency cases—split parts, stereo/dual-width modules, buses, side chains, empty capacity, and foreign-host modules—in isolation.

This separated representation errors from ordering errors. A route could be visually plausible yet decode to the wrong source/sink coordinates, or be correctly converted but applied in an unsafe order. The related capability dossier, [Visual Systems and Domain Modeling](../capabilities-content-dossier/visual-systems-and-domain-modeling.md), describes the reusable modeling method; this story focuses on how that method was applied to SEPIA's routing workflow.

### Engineering problem and architecture

The original risk was implicit coupling: a drag operation could appear to change one grid cell even though the domain operation affected multiple slots, ports, or dependent connections. A flat list of modules also could not preserve empty capacity or express a dual-width, stereo, split, or duplicated module without reconstructing meaning in presentation code.

The solution established explicit boundaries:

- **Grid projection:** renders ordered nullable slots and derives visual spans from module capabilities. Widgets do not own protocol identifiers or placement rules.
- **Application coordination:** carries source path, source slot, and split-part context as typed drag intent, then serializes placement, movement, copying, stereo handling, and synchronization events.
- **Domain routing model:** preserves module identity, path order, empty positions, split coordinates, buses, side chains, and host relationships.
- **Conversion boundary:** reconstructs domain paths from external matrix state in one direction and builds a host-scoped matrix from Grid state in the other.
- **Mutation boundary:** compares desired and current state, validates against the host-provided valid matrix, and sends only ordered, admissible operations to the communication layer.

The boolean matrix is the deliberate intermediate representation. It makes source/sink coordinates, occupancy, comparison, and round-trip behavior inspectable without requiring the UI model to understand external object identifiers.

### State and data flow

```text
Drag intent
		↓
Grid event flow
		↓
Ordered path slots + module relationships
		↓
Host-scoped domain projection
		↓
Boolean matrix and coordinate mapping
		↓
Valid-topology check + current-state diff
		↓
Mute conflicts, then enable desired connections
		↓
External update → domain reconstruction → UI projection
```

The reverse path matters as much as the forward path. External matrix state is decoded into coordinates and reconstructed into domain paths rather than being pushed directly into widgets. That keeps the visual surface derived from domain state and prevents a separate UI representation from becoming a second source of truth.

### Implementation decisions and tradeoffs

#### Nullable slots instead of a flat list

Ordered nullable slots preserve empty drop targets, alignment, and the footprint of modules that span more than one position. This requires normalization and index maintenance after movement, but gives placement, validation, persistence, and rendering the same positional facts.

#### Typed intent and serialized updates

A drag carries its source and relationship context into an ordered application workflow. This is more explicit than letting a widget mutate a cell directly, but it prevents a multi-cell operation from being partially applied or reordered with another update.

#### Matrix conversion instead of direct protocol mapping

External object numbers are decoded into source/sink coordinates, while Grid state is converted through the same conceptual matrix before writes. This adds mapping and validation structures, but isolates coordinate conventions and keeps protocol details out of presentation and domain placement rules.

#### Staged dependency resolution

Primary connections are established before dependent bus and side-chain connections are resolved. The staging adds conversion context and deferred work, but makes ordering requirements explicit instead of relying on incidental iteration order.

#### Validation before mutation

The desired matrix is checked against the valid host topology and compared with current state. Conflicting connections are removed or muted before desired connections are enabled. The workflow may reject an otherwise plausible visual edit, but it avoids exposing an invalid intermediate route to hardware.

### Before and after: moving a stereo or split-aware module

**Before the explicit conversion boundary:** a drag could be interpreted as changing the cell under the pointer. For a module with paired or split representations, that could leave a related slot behind, misplace a channel, or allow a visually complete composition that could not be represented by the active host. A direct UI-to-device update would also make it difficult to tell whether the failure came from placement, coordinate orientation, or mutation order.

**After the boundary:** the drag carries identity, position, and relationship context into the serialized Grid workflow. The affected nullable slots and related metadata are updated together, the resulting composition is revalidated, and only the current host's modules are projected into the matrix. The desired matrix is compared with the current one, checked against permitted topology, and applied by first clearing conflicting connections and then enabling desired connections. An external update can then be decoded and projected back into the domain model, allowing the same route to be inspected in both directions.

### Small illustrative example

“Illustrative Dart pseudocode. This is a generalized example and does not represent the production implementation.”

```dart
class RouteCell {
	const RouteCell(this.source, this.sink);

	final int source;
	final int sink;
}

List<RouteCell> planChange(
	Set<RouteCell> current,
	Set<RouteCell> desired,
	Set<RouteCell> permitted,
) {
	if (!desired.every(permitted.contains)) {
		throw StateError('Route is not permitted by the current topology');
	}

	final removals = current.difference(desired);
	final additions = desired.difference(current);
	return [...removals, ...additions];
}
```

The example demonstrates only the safety principle: validate the complete desired representation first, then produce a deterministic change plan with conflicting state handled before additions. The production workflow also accounts for domain relationships, host scope, dependency staging, and external-state reconciliation; those details are intentionally generalized here.

### Failure modes and safeguards

- **Coordinate orientation drift:** centralize object-number decoding and source/sink mapping; use reverse conversion fixtures to detect swapped axes or indexing errors.
- **Split, stereo, or dual-width mismatch:** preserve module identity and semantic part/slot context; validate occupancy and related positions after each composition update.
- **Foreign-host leakage:** filter at the conversion boundary so a host matrix contains only modules owned by that host.
- **Side-chain ordering errors:** retain conversion context for bus connections and resolve dependent edges after their prerequisites exist.
- **Transient conflicting routes:** diff current and desired matrices, then clear conflicting connections before enabling new ones.
- **Malformed external data:** reject object numbers or topology records that cannot map to valid coordinates instead of guessing.
- **Stale visual projection:** reconstruct UI-facing state from domain updates and keep external observations separate from the user's intended composition.

### Testing and evidence strategy

The evidence was layered to localize failures rather than relying on a single end-to-end test:

- **Domain transformation tests:** value semantics, nullable-slot placement, ordering, split/stereo coordinates, graph or matrix transformations, and host compatibility.
- **Round-trip scenarios:** reconstruct a route from matrix state, convert it back, and compare routing intent rather than incidental object ordering.
- **Boundary and malformed-input tests:** invalid coordinates, unsupported topology, empty capacity, duplicated modules, foreign-host modules, and incomplete dependency context.
- **Application tests:** controlled streams and BLoC tests for serialized drag events, emitted state, no-op/error paths, and synchronization side effects.
- **Mutation-order verification:** assert that conflicting operations are handled before desired connections are enabled.

Together, these tests support the central claim: routing became inspectable domain behavior with a validation boundary, rather than an untraceable side effect of a widget interaction.

### Confidentiality note

Private routing schemas, identifiers, and production command details are not published.
