---
type: story
slug: sepia-architecture-modernization
title: Architecture Modernization — SEPIA
project: SEPIA
visibility: public
status: published
featured: false
tags: Architecture, Modernization, Ownership
---

# Architecture Modernization — SEPIA

## Executive Content

### Overview

Cross-layer guesswork was making ordinary SEPIA defects expensive to investigate. The modernization
work reorganized a growing dashboard and module architecture so feature state, domain rules,
repositories, and integrations each provided a clear first boundary for diagnosis.

### Problem

As SEPIA features expanded, dashboard interactions, module lifecycle rules, routing logic, UI
state, persistence, and device communication risked blending together. This made small changes
harder to reason about and testing less targeted.

### What changed

- Dashboard and module behavior was grouped around the feature it supported.
- Application state coordinated workflow transitions instead of widgets doing so directly.
- Domain models represented concepts such as ordering, paths, and module relationships.
- Repository and adapter seams isolated persistence, device communication, and runtime variants.
- Shared widgets and helpers were retained only where they represented genuinely shared behavior.

### Why it matters

Modernization improved change predictability and reduced architectural drift across the SEPIA
dashboard. Engineers could diagnose state and side-effect issues faster without a speculative
rewrite, while online and offline behavior could remain behind the same feature-facing contract.

## Technical Deep-Dive

### Investigation focus

The investigation traced real defects through emitted state, side-effect boundaries, and dependency direction rather than starting from folder structure.

The first step was to follow a user-visible transition end to end: intent from the presentation
layer, application-state emission, domain transformation, repository mutation, and any resulting
stream update. This exposed ownership problems that a folder review alone would miss. A useful
question at each step was: “If this behavior changes, which component should be the only one that
needs to change?”

### Typical failure paths

- Feature state duplicated across layers.
- Transport or persistence details leaking into UI-facing logic.
- Shared utility code becoming accidental policy owner.
- Dependency arrows pointing opposite to intended ownership.

### Before-and-after scenario: one state transition

Suppose a user changes a module control while the application is also receiving asynchronous
device updates.

**Before:** the widget changed its local value immediately, a neighboring feature updated a
shared model, and a transport callback later emitted another value. The visible result depended
on callback timing. A reconnect could restore the old value, while tests had to recreate several
services to reproduce the race.

**After:** the widget emitted a semantic intent such as `ChangeControlValue`. Application state
sent that intent to the module repository. The repository became the single owner of the resulting
immutable snapshot and published the update through its stream. The BLoC translated the snapshot
to UI state, while transport callbacks entered through the same repository boundary.

The change did not eliminate asynchronous behavior. It made the ordering and ownership explicit,
so the investigation could distinguish a rejected domain transition, a repository synchronization
issue, and a presentation mapping issue.

### Illustrative code shape

The following generalized Dart-style example shows the before-and-after dependency direction. It
is intentionally illustrative and contains no proprietary names, schemas, or production code:

```dart
// Before: presentation knows about an external effect and local state.
onChanged: (value) {
	setState(() => selectedValue = value);
	deviceClient.writeValue(value);
}

// After: presentation sends intent; the feature owner coordinates the effect.
onChanged: (value) {
	context.read<ModuleBloc>().add(ChangeControlValue(value));
}

// The repository contract becomes the stable seam.
abstract interface class ModuleRepository {
	Stream<ModuleSnapshot> get state;
	Future<void> changeControlValue(ControlValue value);
}
```

In the modernized flow, `ModuleRepositoryOnline` can translate the operation to a connected
runtime, while `ModuleRepositoryOffline` can update a simulation. The BLoC and presentation code
do not need separate branches for those environments.

### Incremental migration

The work was approached as a set of narrow migrations:

- map existing mutations and streams for one feature workflow;
- select one authoritative state owner;
- place a repository or domain contract in front of the existing implementation;
- migrate consumers one at a time;
- add a boundary-level test before removing the old path.

This kept product behavior available during the change and made each intermediate step reviewable.
It also avoided treating a visually tidy folder structure as proof that the architecture was
actually improved.

### Boundary-level test example

A focused test can verify that application code depends on the contract rather than a device:

```dart
test('control intent is reflected in repository-owned state', () async {
	final repository = FakeModuleRepository();
	final bloc = ModuleBloc(repository);

	bloc.add(ChangeControlValue(ControlValue(0.5)));

	await expectLater(
		bloc.stream,
		emitsThrough(ModuleState.withControlValue(0.5)),
	);
});
```

This is redacted illustrative pseudocode. The production-safe evidence is the testing seam and
the behavior it demonstrates, not an internal implementation name or an unsupported metric.

### Boundary rules

- Dashboard widgets capture and render operator intent.
- Feature application state coordinates module workflows and emitted UI state.
- Domain models enforce meaning for ordering, paths, controls, and module relationships.
- Repository implementations own module state, persistence, streams, and runtime-specific effects.
- Device and transport adapters remain behind those repository boundaries.

### Migration tradeoffs

The migration added mapping, focused state holders, repository contracts, and naming conventions to
an existing production codebase. The team accepted that navigation and coordination would require
more deliberate structure in exchange for safer incremental change, clearer test design, and less
cross-feature mutation.

### Evidence from the SEPIA migration

Evidence comes from before/after workflow investigations, boundary-level tests, and reduced ambiguity in ownership during defect analysis.

Useful evidence includes the before-and-after responsibility map for dashboard behavior, the
repository-to-BLoC state flow, online/offline substitution, focused state-transition tests, and
defect walkthroughs that identify the first failing boundary. Together these show that the SEPIA
architecture changed behaviorally: module state has one owner, external effects enter through a
seam, and consumers can be tested without hardware or transport infrastructure.

### Related capability

The reusable engineering method is documented in [Architecture Modernization](../capabilities-content-dossier/architecture-modernization.md).
