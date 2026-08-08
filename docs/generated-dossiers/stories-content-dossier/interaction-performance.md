---
type: story
slug: interaction-performance
title: Interaction Performance
project: SEPIA
visibility: public
status: published
featured: false
tags: Performance, Interaction, Flutter
---

# Interaction Performance

## Executive Content

### Overview

SEPIA’s dashboard combined multiple animated module panels, live meters, nested scrolling, zoom, reordering, and direct manipulation. I contributed to restructuring the interaction boundaries so high-frequency control updates stayed local while structural changes continued to flow from the dashboard’s current workflow state.

### Problem

The same pointer movement could be interpreted as control dragging or dashboard navigation, while asynchronous module updates could arrive during that interaction. If those concerns shared broad state, a local meter or animation change could invalidate unrelated panels, interrupt manipulation, or leave cached ordering and controller resources out of sync.

### What changed

- Localized module animation, meter, and controller synchronization behind per-module boundaries.
- Narrowed rebuilds with selective projections so structural dashboard changes remained distinct from high-frequency visual updates.
- Separated control dragging, horizontal navigation, and path-level vertical scrolling with explicit interaction ownership.
- Reconciled cached reorderable content with current workflow ordering and bounded local scroll movement.
- Made subscription, listener, and controller cleanup part of the owning module’s lifecycle.

### Why it matters

The dashboard gained a clearer contract for deciding what should update, what should rebuild, and which gesture is active. Users could manipulate a control without intentionally invalidating unrelated panels, while engineers gained a more extensible boundary for adding modules, meters, and animation behavior. The evidence supports an architectural and behavioral improvement; no unsupported numerical performance claim is made.

## Technical Deep-Dive

### Investigation focus and constraints

The dashboard was not slow because of one isolated animation. It combined several animated module panels, live meters, hover and zoom behavior, horizontal navigation, path-level vertical scrolling, reordering, and direct control manipulation. Those events arrived on different timelines and did not have the same rendering cost.

The investigation therefore started by classifying updates rather than optimizing widgets indiscriminately:

1. Identify which events changed dashboard structure: path order, module composition, dimensions, zoom, or selected artboard.
2. Identify which events were high frequency and local: meter values, controller synchronization, pointer movement, hover state, and an active control drag.
3. Trace which state boundary received each event and which widgets listened to its projection.
4. Check whether scroll and drag recognizers could interpret the same pointer movement simultaneously.
5. Verify that cached reorderable content, subscriptions, pointer/keyboard listeners, and animation controllers were disposed or resynchronized when their owning module changed.

This made perceived responsiveness an ownership problem: a local visual change should not invalidate unrelated panels, while a structural change must rebuild from current domain data rather than from a stale cache.

### Architecture and state flow

The story-specific boundary can be described as four cooperating layers:

```text
Live module data / user intent
							|
							v
				Dashboard workflow state
	 		(composition, order, size, zoom)
							|
				 selective projections
				  /                 \
			   	 v                   v
		 Module interaction     Path navigation
	      state boundary         and scroll state
				 |                   |
				 v                   v
		Animation surface      Scrollable path view
		and controller sync
```

- **Dashboard workflow state** owns structural facts such as the active composition, ordering, panel sizing, and zoom context. It is the source used to rebuild the dashboard when the domain changes.
- **Module interaction state** owns the state specific to one animated control surface. A module update can synchronize its animation and meter presentation without making every other module rebuild.
- **Navigation state** owns horizontal dashboard movement and path-level vertical offsets. Scroll extents are bounded, and navigation is constrained while a control drag owns the pointer.
- **Controller lifecycle** sits inside the module boundary. It synchronizes high-frequency visual values with the active animation surface and is cleaned up with the owning module rather than with an unrelated screen-wide controller.

This is intentionally narrower than the lifecycle and repository architecture described in the related [device-lifecycle story](../../contents/journals/device-lifecycle-management.md): this story focuses on how already-available state is projected into a dense interactive surface.

### Before and after: one meter update during a control drag

**Before — broad invalidation:** a meter or control event entered a dashboard-wide state boundary. The dashboard rebuilt its panel collection, scrollable content, and unrelated animated controls while the pointer was moving. At the same time, a vertical scroll recognizer could continue receiving the gesture. The visible symptoms were unnecessary work, interrupted manipulation, and ambiguous ownership of pointer movement.

**After — local projection and explicit arbitration:** the event is routed to the owning module boundary. The module synchronizes its animation/controller values locally; the dashboard workflow remains unchanged. If the pointer is in `draggingControl` mode, the navigation layer temporarily declines conflicting scrolling. A later composition or ordering event still rebuilds from the current workflow state, so local optimization does not become a second source of truth.

The observable improvement is architectural and behavioral rather than a numerical benchmark: unrelated surfaces are not intentionally invalidated by a local update, and the active gesture has a defined owner.

### Illustrative update boundary

“Illustrative Dart pseudocode. This is a generalized example and does not represent the production implementation.”

```dart
enum GestureOwner { none, control, navigation }

class PanelProjection {
	final GestureOwner owner;
	final double level;

	const PanelProjection(this.owner, this.level);
}

bool shouldRefreshPanel(PanelProjection previous, PanelProjection next) {
	return previous.owner != next.owner || previous.level != next.level;
}
```

The example illustrates the decision boundary, not a production state shape: a consumer compares only the projection it renders. Structural dashboard changes can use a different projection, while high-frequency control values remain local to the animated panel.

### Interaction arbitration and failure modes

The important failure cases were not limited to frame rendering:

- **Drag versus scroll:** pointer movement can look like both control manipulation and navigation. An explicit interaction mode gives the active control first ownership and constrains conflicting scroll behavior until the gesture ends.
- **Nested scroll bounds:** path-specific offsets must be clamped to valid extents so a local scroll event does not produce invalid movement or propagate unexpectedly to the parent dashboard.
- **Stale animation resources:** a controller or subscription can outlive the module or artboard that created it. Ownership-bound cleanup prevents updates from reaching a disposed surface.
- **Cached ordering drift:** reorderable content improves continuity only if it is reconciled with the current domain ordering. Structural changes therefore replace or update the working list from workflow state rather than trusting an old cache.
- **Asynchronous update races:** external module updates and local pointer changes can arrive in different orders. The UI boundary must distinguish a visual synchronization update from a structural workflow mutation and avoid treating every event as a global rebuild.

The related [dynamic module layout story](../../contents/journals/creator-dynamic-module-layout-system.md) covers the deeper semantics of heterogeneous paths, split parts, and multi-cell placement; those rules are intentionally not repeated here.

### Implementation decisions and tradeoffs

- **Per-module state boundaries:** increase the number of state objects and disposal paths, but align ownership with the visible unit that changes most often.
- **Selective comparisons:** require explicit maintenance when state evolves, but make the rebuild contract reviewable instead of implicit.
- **Controller-level visual synchronization:** adds lifecycle code, but keeps high-frequency animation and meter updates out of broad Flutter layout work.
- **Separate interaction modes:** add arbitration state and edge cases around gesture transitions, but remove ambiguity between control dragging, horizontal navigation, hover, and keyboard-assisted panning.
- **Cached, stateful dashboard content:** preserves interaction context during reordering and navigation, but requires a reconciliation rule when active domain ordering changes.

The design deliberately accepts coordination complexity where it buys a stable ownership model. It does not claim a measured frame-rate or latency improvement because the approved evidence does not include a publishable numerical benchmark.

### Testing strategy and evidence

Evidence should test the boundaries that produce the behavior, not only whether a screen renders:

- **State tests:** verify initial state, event-driven transitions, no-op updates, and error paths for dashboard and module projections.
- **Interaction tests:** cover control drag, release, horizontal navigation, path scrolling, bounded offsets, hover/zoom changes, and reorder reconciliation.
- **Lifecycle tests:** verify that subscriptions, pointer/keyboard listeners, timers where applicable, and animation/controller resources stop affecting a disposed module.
- **Asynchronous tests:** use controlled streams or collaborators to place external updates before, during, and after local interaction, then verify that only the owning projection changes.
- **Workflow evidence:** use a targeted interaction trace or approved recording showing several animated panels, a local control change, scrolling, and a reorder without claiming unsupported measurements.

These tests complement, rather than duplicate, the broader [BDD integration testing story](../../contents/journals/bdd-integration-testing-framework.md) and [application testing architecture](../../contents/journals/application-testing-architecture.md). The evidence for this story should demonstrate update scope, gesture ownership, synchronization, and cleanup.

### Evidence boundary

The verified source supports the architecture and failure-path narrative above. It does not support a public numerical claim about frame rate, latency, device count, or percentage reduction. Any future trace should be approved and should identify the scenario, target environment, and exact engineering point it demonstrates.

### Confidentiality note

Private traces, recordings, production code, internal UI identifiers, package names, source paths, and device-specific details are excluded. The Dart example is generalized pseudocode and must not be read as an extract from the implementation.
