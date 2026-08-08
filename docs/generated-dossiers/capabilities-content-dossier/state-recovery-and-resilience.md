---
type: capability
slug: state-recovery-and-resilience
title: State, Recovery, and Resilience
project: SEPIA
visibility: public
status: published
featured: false
tags: State, Recovery, Resilience
homepageSummary: Modeling durable intent and volatile external state so asynchronous systems can recover without becoming opaque.
---

# State, Recovery, and Resilience

## Executive Content

### Overview

Reliable recovery starts by separating three questions: what the operator saved, what hardware currently reports, and what the interface can safely allow. This capability formalizes that separation as hardware conditions change.

### The challenge

Saved sessions and live topology regularly drift: hosts reorder, modules disappear, identities change, and dependencies break. Blind restore is unsafe.

### Why it was difficult

Recovery had to be both strict and usable: block unsafe operations, keep valid intent, and explain conflicts clearly.

### The approach

- Kept durable snapshots separate from runtime-resolved state.
- Matched topology by meaningful identity, not position alone.
- Classified mismatches and surfaced conflict semantics.
- Allowed revalidation when hardware conditions changed later.

### Results

Recovery moved from hidden best-effort behavior to explicit, explainable workflows with safer failure handling.

### Key takeaways

Resilience is not retry logic; it is state design plus decision transparency.

## Technical Deep-Dive

### Technical thesis

Reliable recovery requires explicit ownership of three different facts: the configuration the operator saved, the topology the system can currently observe, and the state the interface is allowed to present or apply. Treating those facts as one mutable object makes topology drift look like a normal update and makes unsafe recovery difficult to explain.

This is a reusable engineering competency: identify the durable intent, model external state as provisional, and make the resolution between them observable and reversible.

### Investigation focus

The investigation started with failure behavior rather than with file format design. The relevant questions were:

- Can a saved host still be identified when live host order changes?
- What is the difference between a moved module, a replacement with the same model, and an unavailable module?
- Which dependent paths can be cleared or retained without applying an invalid reference?
- What should happen when topology changes while a restore or revalidation is already in progress?
- Which state belongs to persistence, which belongs to the live repositories, and which is only derived for the UI?

The source material treats these as related but distinct concerns. Configuration recall supplies the matching and conflict-resolution behavior; state retention and repository ownership supply the durable state and stream boundaries; lifecycle coordination supplies the asynchronous change and cleanup constraints. Together they define recovery as a state-resolution problem rather than a best-effort import.

### Ownership model

- **Snapshot model:** serializes the operator's configuration, including hosts, paths, ports, buses, modules, control groups, and optional routing data. It remains the durable expression of intent.
- **Live repositories:** own current host/module identity, placement, availability, and runtime updates. They are the source of present conditions, not a replacement for the saved snapshot.
- **Recovery coordinator:** converts live state into the comparable snapshot representation, matches meaningful identities, classifies differences, and produces a safe resolved result.
- **Application and UI state:** exposes conflict severity, retained context, and available operator actions. It must not silently rewrite the original snapshot.

The boundary matters because a resolved result is not necessarily a new saved configuration. It is a derived answer to “what can be applied now?” Keeping that answer separate permits revalidation when a missing or changed module later becomes available.

### State and data flow

```text
Saved configuration ──> canonical snapshot ──┐
											 ├─> identity/topology matching
Live repositories ──> current snapshot ──────┘              |
															│
															v
												conflict classification
													/              \
										safe resolution       recovery feedback
													\              /
															v
												resolved runtime state
															│
											revalidate on live-state changes
```

The flow has two important properties. First, both sides are compared through a canonical model, so persistence and live state do not require separate, contradictory comparison rules. Second, revalidation derives a new result from the original snapshot and current facts; it does not accumulate temporary repairs into the durable source.

### Matching and resolution decisions

Position alone is insufficient because hosts may reorder and modules may move between slots. Matching therefore considers meaningful module identity overlap and then evaluates module identity, serial identity, placement, and availability separately. This distinguishes cases that look similar in a list but have different safety implications.

Conflict severity is a policy boundary, not just a display label:

- A recoverable difference can remain visible while the unaffected portion is resolved.
- An unavailable module can cause dependent paths to be cleared or withheld rather than applied with an invalid reference; related stereo behavior must be handled together.
- An ambiguous or high-risk match blocks automatic application until the operator or a later topology update provides enough information.
- Malformed, canceled, duplicate, or legacy-shaped input is handled at the file boundary and does not become a partially constructed runtime state.

#### Before-and-after scenario

**Before:** a saved setup placed a module in a particular slot. On recall, the live host list had been reordered and one module was absent. A positional restore could apply the saved control and path data to the wrong module, or leave a route pointing at unavailable hardware while appearing successful.

**After:** the saved snapshot remains unchanged. The current topology is aligned by identity overlap, slot and serial differences are classified, and the unavailable module's dependent path is withheld or cleared according to the recovery policy. The UI reports the conflict instead of presenting an exact restore. If the module later returns, the original snapshot can be evaluated again and the resolved state can be recomputed.

### Illustrative resolution boundary

The following is **illustrative pseudocode**, generalized from the verified recovery behavior. It intentionally omits private schemas, identifiers, and production APIs:

```dart
Resolution resolve(Snapshot savedSnapshot, Topology liveTopology) {
	final liveSnapshot = canonicalize(liveTopology);
	final alignment = matchByIdentityOverlap(
		savedSnapshot.hosts,
		liveSnapshot.hosts,
	);
	final conflicts = classify(alignment, savedSnapshot, liveSnapshot);

	if (conflicts.contains(Conflict.highRiskAmbiguity)) {
		return Resolution(
			blocked: true,
			original: savedSnapshot,
			conflicts: conflicts,
		);
	}

	final resolved = applyOnlySafeParts(savedSnapshot, alignment, conflicts);
	return Resolution(
		blocked: false,
		original: savedSnapshot,
		resolved: resolved,
		conflicts: conflicts,
	);
}
```

The important contract is not the function names. It is that resolution returns the original intent, the derived safe result, and the conflict information together. This prevents a partial restore from becoming an undocumented overwrite.

### Failure patterns

- **Positional matching:** list order changes can map state to the wrong hardware. Identity and placement are evaluated independently.
- **Hidden partial restores:** applying some state without recording what was omitted makes an approximate restore look complete. Resolved state and conflict information must travel together.
- **Lifecycle races:** a topology update can arrive during initialization, restore, or teardown. Revalidation must be driven by owned repository/lifecycle events and must not assume the earlier topology is still current.
- **Late-event overwrites:** a delayed update can replace a newer conflict result or resolved state. The application boundary needs a deliberate ordering or current-state check before publishing derived state.
- **Malformed or legacy input:** parsing and compatibility handling must fail safely before invalid references enter runtime state.

### Tradeoffs

Richer state, identity matching, conflict modeling, and revalidation add complexity and require more explicit transitions than a single restore command. That cost buys reversibility: the original intent is retained, unsafe differences are visible, and the same configuration can be evaluated again as conditions change. It also keeps transport and lifecycle policy out of UI code, although consumers must handle more than one valid state—resolved, conflicted, unavailable, or awaiting revalidation.

The design deliberately favors safe partial resolution over pretending that every restore is all-or-nothing or exact. That policy must remain explicit because a missing module may invalidate only dependent paths, while an ambiguous identity may make automatic application unsafe across a larger boundary.

### Testing strategy

Testing should follow the ownership boundaries and target the failure decisions that make this capability valuable:

- **Domain fixtures:** serialize and parse canonical snapshots, including supported legacy shapes, malformed input, duplicate names, and round-trip behavior.
- **Matching tests:** permute host order and module placement; distinguish stable identity, serial identity, moved modules, replacements, missing modules, and ambiguous matches.
- **Resolution tests:** verify severity classification, blocked high-risk cases, safe partial resolution, dependent-path clearing, and preservation of the original snapshot.
- **Application/state tests:** use controlled repository streams to verify initial resolution, revalidation after topology changes, and protection against stale or late events.
- **Boundary and workflow tests:** cover file-selection cancellation and user-visible conflict feedback without requiring private production schemas or live hardware.

This layered approach makes the most reusable rules fast and deterministic while reserving higher-level workflow coverage for behavior that genuinely crosses persistence, repositories, recovery, and presentation.

### Evidence and transferable method

The strongest public evidence is a conceptual save → topology change → conflict review → safe resolution → revalidation walkthrough, supported by topology fixtures and conflict-classification tests. A state-flow diagram can show the original-versus-resolved boundary without exposing product internals. The illustrative pseudocode demonstrates the ownership contract, not production implementation.

The transferable method is to preserve intent, canonicalize both sides of a comparison, classify before mutating, retain enough information to explain omissions, and recompute derived state when external facts change. This applies to other asynchronous systems where persisted intent meets a changing external resource, without claiming that their identity or recovery policies are identical.

### Linked stories

- [Configuration Recovery](../stories-content-dossier/configuration-recovery.md)
- [Device Lifecycle Management](../stories-content-dossier/device-lifecycle-management.md)

### Confidentiality note

Private identity schemas, environment-specific policies, and proprietary recovery details are generalized.
