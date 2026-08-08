---
type: capability
slug: visual-systems-and-domain-modeling
title: Visual Systems and Domain Modeling
project: SEPIA
visibility: public
status: published
featured: false
tags: Domain Modeling, Visual Systems, Routing
---

# Visual Systems and Domain Modeling

## Executive Content

### Overview

Gestures become trustworthy when they produce validated domain intent before they trigger external change. This capability covers the modeling discipline required to connect visual interaction with hardware-safe operations.

### The challenge

Paths, stereo relationships, split modules, buses, and side-chain dependencies carry domain meaning that cannot live only in widget handlers.

### Why it was difficult

Small conversion or ordering mistakes can produce invalid routes or subtle drift between visual and hardware state.

### The approach

- Modeled visual intent explicitly.
- Used deterministic conversion steps and intermediate matrix representation.
- Validated topology and dependency order before mutation.
- Preserved round-trip mapping between external state and visual projection.

### Results

Complex routing behavior became testable, reviewable, and easier to debug across UI/domain/adapter boundaries.

### Key takeaways

Rich UI systems become reliable when domain meaning is explicit and conversion rules are first-class.

## Technical Deep-Dive

### Technical thesis

In SEPIA's routing workflows, the difficult problem was preserving one routing intention across representations that have different shapes and rules. The Grid presents ordered paths and module slots; the communication boundary works with addressable source/sink matrix objects; repositories and BLoCs must also keep the visible state coherent while external updates arrive. A reliable design therefore treats a gesture as an intent to validate and convert, not as permission for a widget to mutate hardware-facing state.

This is a reusable competency: identify the semantic model first, make each representation change explicit, and place safety checks before the side-effecting boundary.

### Engineering problem and investigation

The investigation started from the edge cases rather than from the grid itself. A one-cell-per-module model could not express dual-width or stereo occupancy, split parts with distinct coordinates, duplicated instances, or meaningful empty drop targets. Separately, a direct visual-to-protocol mapping would have had to combine ordering, channel relationships, host ownership, and coordinate conventions inside presentation code.

The source material points to three decisions that resolved those risks:

1. Represent paths as ordered nullable slots so capacity and alignment remain explicit.
2. Carry source path, source slot, and split-part context as typed drag intent into a serialized Grid event flow.
3. Use a boolean matrix as a deterministic intermediate representation between domain paths and addressable communication objects.

These decisions make the invariants inspectable: a module's footprint must fit its path positions; split and stereo relationships must retain their semantic identity; foreign-host modules must not enter a host-specific matrix; and a desired matrix must be admissible before mutation.

### Architecture and state/data flow

```text
User gesture
	↓
Typed drag intent
	↓
Grid and placement helpers
	↓
Immutable path matrix + derived validation
	↓
Domain routing paths and module relationships
	↓
Deterministic matrix conversion
	↓
Boolean matrix + source/sink object mapping
	↓
Host-topology validation
	↓
Protocol adapter / external mutation
```

- **Presentation:** renders the rectangular matrix and derives tile spans from module capabilities. It does not own placement rules or protocol identifiers.
- **Application flow:** the Grid BLoC serializes placement, movement, copying, stereo handling, and synchronization events so multi-cell changes have an explicit order.
- **Domain model:** ordered paths, nullable slots, module identity, split-part coordinates, buses, side chains, and host relationships express routing meaning.
- **Conversion boundary:** one direction reconstructs domain paths from host matrix state; the other builds a matrix from Grid state and resolves primary/secondary positions and dependent connections.
- **Repository/state boundary:** long-lived feature state is represented through immutable snapshots and streams; BLoCs initialize from those snapshots and react to later updates rather than recreating transport work in widgets.
- **Adapter boundary:** only validated, host-scoped operations reach the external communication layer.

### Implementation decisions and tradeoffs

#### Explicit occupancy instead of a flat module list

Nullable slots preserve empty capacity and make a heterogeneous layout renderable as a consistent matrix. The cost is normalization and index maintenance when modules move, but the benefit is that placement, persistence, and validation operate on the same explicit positions.

#### Capability-driven projection

Tile spans are derived from module capabilities, and paired stereo representations are filtered so they are not rendered twice. This keeps presentation behavior aligned with domain semantics without hard-coding every module form into individual widgets.

#### Staged conversion and dependency resolution

Protocol object numbers are decoded into source/sink coordinates before matrix operations are built. The complementary conversion walks domain paths and defers dependent side-chain work until the relevant bus connection is known. This adds staging and intermediate data, but avoids hidden ordering assumptions.

#### Validation before mutation

Desired connections are compared with current host state and checked against the host-provided valid matrix. Conflicting connections are muted before desired connections are enabled. The ordering is more deliberate than issuing independent cell updates, but it avoids exposing an invalid intermediate route.

#### Repository-owned state and reactive projection

Repositories retain feature state and provide online/offline implementations behind one contract. Immutable snapshots and streams make external changes observable to BLoCs. This requires lifecycle and subscription discipline, but prevents widgets and neighboring features from becoming competing state owners.

### Before and after: moving a multi-cell module

**Before the explicit model:** a drag could be treated as a change to the item under the pointer. For a composite item with more than one visual or logical part, that risks moving only part of the representation or allowing a placement that violates domain constraints. A widget-level fix would still leave conversion and runtime state exposed to the same ambiguity.

**After the explicit model:** the drag carries an item identity, position, and relevant relationship context into an ordered application workflow. Placement updates the affected slots and related metadata, recalculates validation, and rebuilds the visual surface from one domain state. If the resulting composition is accepted, conversion produces the external representation, filters unsupported or out-of-scope items, validates the result against the available capabilities, and applies the safe mutation order. The same domain state can also be projected back from external state, supporting round-trip checks.

### Small illustrative example

The following is **generalized illustrative pseudocode**, not production code. It shows the separation between domain conversion and external mutation without mirroring any product-specific models, identifiers, or protocol APIs.

```dart
ExternalModel buildExternalModel(
	Iterable<DomainGroup> groups,
	CapabilitySet capabilities,
) {
	final model = ExternalModel.empty(capabilities);

	for (final group in groups) {
		for (final item in group.orderedItems) {
			if (!capabilities.supports(item)) continue;

			for (final relationship in relationshipsFor(item, group)) {
				final externalValue = convertToExternalValue(relationship);
				require(capabilities.allows(externalValue));
				model.add(externalValue);
			}
		}
	}

	return model;
}

void applySafely(
	ExternalModel currentModel,
	ExternalModel desiredModel,
	ExternalAdapter adapter,
) {
	for (final value in currentModel.conflictsWith(desiredModel)) {
		adapter.remove(value);
	}

	for (final value in desiredModel.values) {
		adapter.apply(value);
	}
}
```

The important contract is not the syntax: domain helpers own relationship semantics, conversion is deterministic, capability validation happens before writes, and the adapter receives only the validated result.

### Failure modes and safeguards

- **Coordinate or orientation drift:** centralize object-number decoding and source/sink mapping; use round-trip fixtures to detect mismatches.
- **Incorrect stereo, dual-width, or split projection:** retain module identity and semantic part/slot context; validate occupancy and split placement after each composition update.
- **Invalid host scope:** filter modules at the conversion boundary rather than assuming every Grid path belongs to the current host.
- **Dependency-order errors:** retain conversion context for bus connections and resolve side chains only after their prerequisites are known.
- **Transient conflicting routes:** compare desired and current matrices, then mute conflicting connections before enabling desired ones.
- **State feedback loops or stale UI:** keep durable state in repositories, expose immutable snapshots/streams, and let BLoCs project updates for the UI.
- **Malformed external matrix data:** treat object-number and topology decoding as a defensive boundary; reject data that cannot be mapped to valid coordinates rather than guessing.

### Testing and evidence strategy

The evidence should be layered because no single test level proves the whole capability:

- **Domain tests:** value semantics, nullable-slot placement, split/stereo coordinates, ordering, host compatibility, and matrix transformations.
- **Round-trip fixtures:** reconstruct paths from a matrix, convert them back, and compare routing intent rather than incidental representation details.
- **Boundary tests:** malformed object mappings, invalid topology, unsupported placement, empty capacity, duplicated modules, and foreign-host modules.
- **Application tests:** controlled streams and BLoC tests for serialized drag events, emitted state, no-op/error paths, and synchronization side effects.
- **Mutation-order tests:** verify that conflicting connections are muted before desired connections are enabled.
- **Integration coverage:** reserve higher-level workflows for behavior that genuinely crosses the editor, repository, adapter, and external-system boundaries.

This evidence strategy demonstrates more than that the grid renders: it shows that the same intent survives placement, conversion, validation, state projection, and safe mutation.

### Transferable engineering method

For other visual systems with non-uniform entities or external side effects, the method is:

1. List the semantic relationships that a widget cannot safely own.
2. Choose an intermediate representation that preserves those relationships and meaningful empty state.
3. Convert gestures into typed intent and serialize multi-part transitions.
4. Recalculate derived validation from the resulting domain state.
5. Validate topology and dependencies before invoking an adapter.
6. Test both directions of the projection and the ordering of side effects.

The result is not merely a more structured UI. It is a repeatable boundary between user intent, domain correctness, and external change.

### Linked story

See [Visual Routing](../stories-content-dossier/visual-routing.md).

### Confidentiality note

Private routing schemas, identifiers, and hardware-specific policy details are generalized.
