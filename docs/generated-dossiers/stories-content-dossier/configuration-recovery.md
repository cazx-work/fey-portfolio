---
type: story
slug: configuration-recovery
title: Configuration Recovery
project: SEPIA
visibility: public
status: published
featured: false
tags: State, Recovery, Resilience
homepageTitle: Preserving user intent through configuration recovery
homepageSummary: I treated saved configurations as user intent, then made topology changes visible instead of silently restoring unsafe state.
---

# Configuration Recovery

## Executive Content

### Overview

I redesigned configuration recall as a recovery workflow for hardware that may no longer match the saved setup. The system compares a saved snapshot with the current topology, explains meaningful conflicts, and applies only the portions that can be resolved safely.

### Problem

The saved file could be valid while the environment had changed: hosts could be discovered in a different order, modules could move or be replaced, and dependent paths could refer to unavailable hardware. A position-based restore treats arrangement as identity, creating a risk of applying correct-looking values to the wrong component or retaining invalid references.

### What changed

- Treated the saved configuration as immutable user intent rather than a disposable import payload.
- Compared saved and live systems through a canonical snapshot model.
- Matched hosts using meaningful module identity overlap instead of list position.
- Distinguished identity, serial, placement, availability, and dependency conflicts by severity.
- Allowed safe partial resolution while preventing invalid paths from being applied silently.
- Re-evaluated the preserved intent when the live hardware repository changed.

### Why it matters

Operators can see why a recall is incomplete, retain the unaffected parts of a configuration, and retry when missing hardware becomes available. Recovery becomes explainable and reversible instead of silently mutating saved intent or failing as an opaque all-or-nothing operation.

## Technical Deep-Dive

### Investigation focus

The failure was initially easy to misclassify as a file or deserialization problem. The more important question was whether a valid snapshot still referred to the same system when it was loaded. The investigation therefore followed the data past parsing:

1. Compare the saved representation with the live host and module topology.
2. Separate host order, module identity, serial identity, slot placement, and availability instead of treating them as one mismatch.
3. Trace which paths, buses, and relationships depend on each unavailable or ambiguous module.
4. Define which differences can be resolved safely and which require operator attention.
5. Check what happens when the live repository changes again while the recovery view is open.

This reframed recall as a state-reconciliation problem: the saved snapshot is durable intent, while the live topology is volatile evidence about what can be applied now.

### Architecture and ownership

The workflow uses a canonical snapshot model as the boundary between persistence and recovery. The same conceptual shape represents both the saved configuration and a snapshot derived from the current system. That makes comparison explicit and keeps file parsing separate from the decision to apply state.

```text
Saved file ──> Parse and validate ──> Original snapshot ──┐
																													 ├─> Matcher ─> Conflict classifier
Live system ─> Read current topology ─> Live snapshot ────┘                    │
																																								├─> Safe resolved state
																																								└─> Unresolved intent + feedback
																																												 │
																											 Live repository changes ──────────┘
```

Ownership is deliberately split. Persistence owns loading and serialization; the recovery flow owns comparison and resolution; the live repository remains the source of current topology; and the presentation layer communicates conflicts rather than deciding whether a reference is safe. This complements the broader [state-retention architecture](../../contents/journals/state-retention-architecture.md), where durable application state is kept separate from volatile connectivity concerns.

### State and data flow

The loaded file is retained as an immutable original snapshot. A derived resolved snapshot can change as matching succeeds, modules are unavailable, or dependent paths must be cleared. The derived result must not overwrite the original: otherwise a temporary hardware mismatch would destroy the intent that should be re-evaluated after reconnection or replacement.

Host alignment uses meaningful module identity overlap rather than list position. Within an aligned host, module identity, serial identity, placement, and availability are evaluated independently. This allows the resolver to distinguish a reordered host from a replacement module, and a moved module from a missing module, without collapsing all cases into “load failed.”

When a module cannot be safely resolved, dependent paths are handled as a consequence of that specific missing reference. A safe partial result may retain unrelated state, while affected paths—including related stereo relationships where applicable—are cleared or left unresolved for explicit feedback. Changes in the live module repository trigger re-evaluation against the preserved original snapshot.

### Before-and-after scenario

**Before:** A saved configuration expects a host with two known modules in fixed slots. After a hardware change, the host is discovered in a different order, one module has moved, and the second module is absent. A positional restore can attach the saved values to the wrong slot or leave a path pointing at a component that does not exist.

**After:** The resolver first aligns the host using module identity overlap, then reports the moved placement separately from the missing module. Unaffected settings are eligible for partial resolution; paths dependent on the absent module are not applied. The original snapshot remains available, so the missing module can be re-evaluated when it returns instead of requiring the operator to reconstruct the saved configuration.

### Illustrative resolution rule

“Illustrative Dart pseudocode. This is a generalized example and does not represent the production implementation.”

```dart
Resolution decide(StoredIntent intent, LiveTopology topology) {
	final matches = matchByStableIdentity(intent.items, topology.items);
	final unresolved = matches.where((match) => !match.isSafe).toList();

	return Resolution(
		applied: matches.where((match) => match.isSafe).map((match) => match.value),
		conflicts: unresolved.map((match) => Conflict(match.reason)),
		original: intent,
	);
}
```

The example illustrates the important boundary: matching produces decisions, but it does not mutate the stored intent. Production details such as schema shape, identifiers, and conflict policy are intentionally omitted.

### Boundaries and implementation decisions

- **Persistence boundary:** canonical JSON snapshots are parsed defensively, including supported legacy shapes, duplicate-name conditions, canceled selection, and malformed input. File validity is handled before topology resolution.
- **Identity boundary:** host matching is based on module identity overlap; module checks keep identity, serial, placement, and availability distinct so the conflict explanation remains meaningful.
- **Mutation boundary:** only the safe subset is materialized into runtime state. Invalid references are not silently rewritten to a nearby position.
- **Recovery boundary:** the original snapshot and the derived resolved state are separate, allowing repeatable revalidation when the hardware repository changes.
- **Lifecycle boundary:** late topology changes are treated as normal asynchronous input, not as permission to apply a stale resolution. Device discovery and reconnection remain concerns of the broader [device lifecycle coordinator](../../contents/journals/device-lifecycle-management.md).

### Failure modes and safeguards

- **Ambiguous identity:** duplicate or insufficient identity overlap prevents a confident assignment rather than guessing.
- **Changed placement:** a known module in a different slot is surfaced as a structural conflict, not accepted as positional equivalence.
- **Missing dependency:** affected paths are excluded or cleared while unrelated resolvable state can remain available.
- **Malformed or unsupported input:** guarded parsing and compatibility handling keep invalid file data from entering the resolver.
- **Topology drift during recovery:** a new live snapshot invalidates the prior derived result, so resolution is recalculated from the preserved original intent.

### Tradeoffs

Best-effort restoration would require less modeling and produce a shorter happy path, but it would make identity mistakes difficult to detect and reverse. The chosen design accepts a richer snapshot model, matching logic, conflict states, and revalidation work in exchange for explainable partial recovery.

The main usability tradeoff is that the operator may see more states than a simple success/failure dialog. That complexity is intentional: a recoverable mismatch, an unsafe reference, and malformed input have different remediation paths and should not be presented as equivalent.

### Testing strategy and evidence

The recovery behavior is best proven at several boundaries:

- **Model and parsing tests** cover canonical serialization, supported legacy shapes, malformed input, duplicate conditions, and reconstruction.
- **Matcher tests** cover reordered hosts, moved modules, serial differences, missing modules, and ambiguous identity.
- **Resolution tests** verify severity classification, safe partial application, dependent-path handling, and preservation of the original snapshot.
- **Revalidation tests** change the live topology after an initial conflict and verify that the derived result is recalculated rather than accumulated or silently persisted.
- **Workflow-level tests** exercise load, conflict feedback, partial resolution, and later recovery through controlled repositories and streams rather than requiring a particular physical setup.

The primary evidence is the [configuration recall journal](../../contents/journals/configuration-recall-system.md), including conflict-classification fixtures, topology-drift scenarios, and partial-resolution behavior. The broader [application testing architecture](../../contents/journals/application-testing-architecture.md) explains why these checks are split between deterministic domain tests, application transition tests, and selected higher-level workflows. Exact schemas, identifiers, and environment-specific policies remain intentionally unpublished.

### Confidentiality note

Exact schema definitions, private identifiers, and environment-specific policies are omitted.
