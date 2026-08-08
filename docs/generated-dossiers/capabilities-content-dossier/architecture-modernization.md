---
type: capability
slug: architecture-modernization
title: Architecture Modernization
project: SEPIA
visibility: public
status: published
featured: false
tags: Architecture, Modernization, Ownership
---

# Architecture Modernization

## Executive Content

### Overview

When behavior breaks, the first engineering question should be where the fix belongs. This capability focuses on making that answer visible across feature state, domain rules, repositories, and external integrations.

### The challenge

Device-facing product code tends to blur quickly. UI state, lifecycle logic, routing semantics, persistence, and transport details can drift into each other until every change feels risky.

### Why it was difficult

This was not a greenfield rewrite. Existing workflows had to keep working while boundaries were improved incrementally, without introducing abstraction that only looked clean on diagrams.

### The approach

- Organized by capability and responsibility, not by generic technical layer alone.
- Kept workflow transitions in application state, not inside widgets.
- Kept product rules in domain models, not in adapters.
- Kept side effects behind repository and infrastructure boundaries.
- Extracted shared code only when it represented genuinely shared behavior.

### Results

Modernization reduced investigation time and change ambiguity. New work could be placed with clearer intent, and failure analysis had a narrower starting point.

### Key takeaways

Good architecture is less about elegance and more about fault isolation, safe change, and explicit ownership.

## Technical Deep-Dive

### Technical thesis

Architecture modernization is successful when dependency direction and state ownership become visible in day-to-day debugging, not only in architecture docs.

### Ownership model

- Presentation: compose views and capture intent.
- Application: coordinate workflows and transitions.
- Domain: own business meaning and invariants.
- Repositories and adapters: own external reads/writes and side effects.

The boundary is useful only when it changes the direction of a real interaction. A widget can
capture a user action, but it should not decide how that action changes a module, persist the
result, and update a device connection in the same callback. Instead, the action is translated
into an application intent, validated by the domain, and executed through a repository contract.

The following is an illustrative Dart-style example. It intentionally uses generic names and does
not represent production code:

```dart
// Presentation: captures intent, but does not own the workflow.
onPressed: () => context.read<ModuleBloc>().add(const SelectControl(controlId));

// Application: coordinates the use case.
Future<void> _onSelectControl(SelectControl event, Emitter<ModuleState> emit) async {
	final result = await repository.selectControl(event.controlId);
	emit(result.toUiState());
}

// Domain-facing contract: hides transport and persistence details.
abstract interface class ModuleRepository {
	Future<SelectionResult> selectControl(ControlId id);
}
```

The important design choice is not the framework or syntax. It is that each layer has one reason
to change: the widget changes when presentation changes, the application handler changes when the
workflow changes, and the repository implementation changes when the external system changes.

### Before-and-after scenario

Consider a control-selection defect in a device-facing dashboard:

**Before modernization:** a widget updated a local selected-control value, called a transport
helper, and triggered a second screen refresh. The repository maintained another selected value,
so a reconnect could restore stale data and overwrite the user's latest choice. Investigating the
defect required reading UI callbacks, stream listeners, and transport code together.

**After modernization:** the widget emitted an intent. Application state asked the repository to
perform the transition, the repository produced one immutable state snapshot, and the BLoC mapped
that snapshot to presentation state. A reconnect still affected the repository, but it no longer
required the widget to understand device lifecycle or synchronization details.

The result is a narrower diagnostic path: determine whether the intent was emitted, whether the
domain transition was accepted, whether the repository state changed, or whether the UI mapping
failed. Each question points to a different owner.

### Common failure signals

- UI mutating transport state directly.
- Duplicate state across feature and repository layers.
- Shared utilities becoming hidden owners of business behavior.
- Adapters leaking protocol details into product-facing logic.

### Migration pattern

Modernization is usually safer as a sequence of boundary extractions rather than a rewrite:

1. Identify duplicated or contradictory state for one workflow.
2. Choose the authoritative owner and document the transition it controls.
3. Introduce a narrow contract around that owner.
4. Move one consumer behind the contract while preserving existing behavior.
5. Add a focused transition test and remove the old mutation path.

For example, a direct UI call such as `deviceClient.setValue(value)` can first be replaced with
`repository.updateControl(controlId, value)`. The repository may initially delegate to the same
client, but the application and presentation layers are no longer coupled to that client. Later,
online, offline, or test implementations can evolve independently.

### Testing the boundary

Tests should prove ownership and behavior, not merely the existence of folders. A focused test can
substitute a fake repository, send an application intent, and assert the emitted UI state:

```dart
test('selecting a control updates UI state from repository data', () async {
	final repository = FakeModuleRepository();
	final bloc = ModuleBloc(repository);

	bloc.add(const SelectControl(ControlId('control-a')));

	await expectLater(
		bloc.stream,
		emitsThrough(ModuleState.selected('control-a')),
	);
	expect(repository.lastSelectedId, ControlId('control-a'));
});
```

This is illustrative pseudocode. The test demonstrates the seam: no physical device, transport
connection, or widget tree is needed to verify the workflow. Adapter tests can separately verify
that a repository implementation translates the same intent into an external effect.

### Tradeoffs

Stronger boundaries add mapping and convention overhead. In exchange, teams gain predictable change impact and better testing seams.

### Evidence strategy

The strongest proof is behavioral: focused state-transition tests, adapter substitution tests, and before/after failure investigations tied to concrete workflows.

### Linked story

This capability describes the reusable method: make ownership visible, introduce seams
incrementally, and evaluate modernization by change safety and testability. For the SEPIA-specific
migration, see [Architecture Modernization — SEPIA](../stories-content-dossier/architecture-modernization.md).

### Confidentiality note

Internal source paths, private naming, and proprietary implementation details are intentionally generalized.
