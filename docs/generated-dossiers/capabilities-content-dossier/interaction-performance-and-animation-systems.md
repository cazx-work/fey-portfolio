---
type: capability
slug: interaction-performance-and-animation-systems
title: Interaction Performance and Animation Systems
project: SEPIA
visibility: public
status: published
featured: false
tags: Performance, Animation, Interaction
---

# Interaction Performance and Animation Systems

## Executive Content

### Overview

Responsive dashboards depend on matching state ownership to update frequency. High-frequency animation state stays local, structural state remains intentional, and gesture conflicts are resolved before they affect control precision.

### The challenge

Nested gestures, Rive controllers, meters, drag interactions, scrolling, and navigation can all compete. Without explicit ownership, the UI can feel unstable even when logic is correct.

### Why it was difficult

Not all updates are equal. Structural updates and high-frequency animation updates require different boundaries, lifecycles, and cleanup behavior.

### The approach

- Localized animation/controller state to module-level boundaries.
- Narrowed rebuilds with selective state projections.
- Treated drag, horizontal navigation, and vertical scrolling as distinct interaction modes.
- Enforced explicit cleanup for controllers, listeners, and subscriptions.

### Results

Interaction behavior became more predictable and extensible without making unsupported numeric performance claims.

### Key takeaways

Perceived responsiveness is often an ownership problem before it is a rendering-engine problem.

## Technical Deep-Dive

### Technical thesis

Performance is more reliable when state frequency and gesture intent are modeled explicitly. In this kind of dashboard, the important question is not simply whether an animation is expensive. It is whether a local signal is allowed to invalidate unrelated structure, and whether a pointer movement has one unambiguous owner at a time.

### Engineering problem and investigation

The dashboard combined several independently changing surfaces: multiple Rive-powered module panels, live meters, hover state, zoom, nested scrolling, reordering, and direct control dragging. Those updates did not have the same frequency or the same lifecycle. A meter or controller value could change repeatedly while a panel's composition, ordering, or selected artboard remained unchanged.

The investigation therefore followed update ownership rather than starting with a generic optimization claim:

1. Identify which changes were structural—panel composition, path order, layout, zoom, or selected artboard—and which were high-frequency visual updates such as controller values, meters, and pointer feedback.
2. Trace how external module updates, local gestures, and presentation state reached the dashboard. The supporting architecture keeps durable module meaning behind repository/application boundaries while focused BLoCs and listeners translate updates for presentation.
3. Observe where gesture interpretations competed. Horizontal dashboard navigation, path-level vertical scrolling, and control dragging all begin with pointer movement, so their active modes had to be coordinated rather than inferred independently.
4. Review lifecycle edges: controller attachment, stream subscriptions, pointer and keyboard listeners, timers, and disposal. A stale listener can make a performance symptom look like a rendering problem by continuing to update an already inactive surface.
5. Validate the resulting boundaries with targeted interaction, state-transition, and cleanup tests, supplemented by representative traces when approved measurements are available.

This process distinguishes a rebuild-scope problem from a controller-lifecycle problem and from a gesture-routing problem before changing implementation details.

### Architecture and state flow

The reusable boundary model is:

- **Dashboard:** owns composition, navigation context, path ordering, and broad layout decisions.
- **Path/module surface:** owns local interaction, module-level animation synchronization, and the relationship between a control gesture and its visual surface.
- **Application/repository state:** owns durable workflow meaning and asynchronous module updates; presentation consumes this through focused state boundaries rather than reaching into transport or persistence behavior.
- **Rive controller boundary:** applies high-frequency visual values and meter changes without turning each value change into a dashboard-wide structural update.

The resulting flow is intentionally directional:

```text
                        External module update ─┐
												v
							Repository/application state
												|
												v
							Focused module state boundary
								 ┌──────┴──────┐
								 v             v
					Structural UI   Rive controller / meter
								 ^             ^
								 └── local control gesture
```

The diagram is conceptual and generalized. Structural state can rebuild the relevant surface, while controller-level values remain inside the animation boundary. A local gesture produces an explicit control intent; it does not implicitly become permission for the dashboard to rebuild or scroll.

### Concrete before-and-after scenario

**Before:** A user drags a control while several module panels are visible. The same pointer movement can be interpreted as a control change and as dashboard/path navigation. A local value update also travels through a broad state boundary, causing unrelated panels and layout consumers to participate in the update. The visible symptoms are interrupted dragging, competing scroll movement, and unnecessary work outside the active module.

**After:** The active module surface enters a control-drag mode and temporarily constrains conflicting dashboard scrolling. Pointer input is translated into a control update at that module boundary. Selective state comparison limits structural rebuilds to the state that changed, while the Rive controller and meter update inside the animation boundary. When the gesture ends, the interaction mode is released and normal navigation resumes. This is a before-and-after change in ownership and update scope, not an unsupported claim about frame rate.

### Illustrative implementation shape

The following is **illustrative pseudocode**, generalized from the verified architecture. It is not production code and intentionally omits private names, APIs, schemas, and source details:

```dart
// Illustrative pseudocode: generalized, not production code.
Widget buildModule(ModuleState state) {
	return SelectiveBuilder<ModuleState>(
		select: (next) => (next.artboard, next.layoutMode),
		builder: (selected) => AnimationSurface(
			artboard: selected.artboard,
			onControlDrag: (intent) {
				interactionCoordinator.beginControlDrag();
				moduleController.apply(intent);
			},
			onControllerValue: (value) {
				riveController.setValue(value);
			},
		),
	);
}
```

The important decision is the boundary represented by `SelectiveBuilder` and `AnimationSurface`: structural selections are compared explicitly, while high-frequency controller work stays local. The coordinator also needs an explicit end path that restores scrolling and releases listeners; the names above are descriptive placeholders only.

### Failure modes and design responses

- **Global rebuilds from local signals:** A meter or control update can invalidate unrelated panels. Selective projections and per-module state boundaries keep the update surface proportional to the changed concern.
- **Gesture ambiguity:** Dragging, horizontal navigation, and vertical scrolling can claim the same pointer movement. Explicit interaction modes and temporary scroll constraints make intent deterministic.
- **Stale controller updates:** A disposed or replaced surface can continue receiving stream or pointer events. Controller, listener, subscription, and timer ownership must be paired with explicit disposal.
- **Feedback loops:** A propagated control update can return through the same reactive path as a direct user action. The broader synchronization design distinguishes internally generated updates from new sources so they do not recursively re-enter propagation.
- **Cached view drift:** Preserved reorderable or path content can diverge from current domain ordering. Cached presentation state must be reconciled with source state rather than treated as a second durable source of truth.

### Implementation decisions and tradeoffs

Localized state was chosen because module animation changes have a different frequency and lifecycle from dashboard composition. Selective comparisons add comparison logic and can become a maintenance concern when state shapes evolve. Per-module blocs and controller boundaries add instances and disposal work. A focused scroll coordinator adds another coordination layer. These costs were accepted because they make ownership visible, reduce accidental coupling, and provide clearer seams for testing.

This is deliberately not a claim that local state eliminates all rendering cost. It narrows the work that a change is allowed to trigger and makes later measurement meaningful. If profiling identifies a controller or raster bottleneck, that can be investigated independently instead of being obscured by broad state churn.

### Testing and evidence strategy

Evidence should be collected at the same boundaries as the design:

- **State and interaction tests:** Verify that a control gesture produces the intended module update and that conflicting scrolling is constrained only during the active drag mode.
- **Selective rebuild tests:** Exercise representative state changes and confirm that unrelated module surfaces do not respond to local changes. Assertions should target observable rebuild or update contracts, not private implementation names.
- **Lifecycle and cleanup tests:** Attach and detach controllers, listeners, subscriptions, and timers across creation, replacement, and disposal paths; verify that inactive surfaces no longer receive updates.
- **Application tests:** Use controlled streams and deterministic fakes to cover asynchronous transitions without requiring live external systems, consistent with the wider layered testing strategy.
- **Representative traces:** Compare the update/rebuild scope for one active module versus several visible modules only when approved traces or measurements exist. The current public evidence supports architectural and behavioral claims, not numerical frame-rate or latency claims.

### Transferable engineering method

The competency is a repeatable method for rich reactive interfaces:

1. Classify state by meaning, frequency, and lifecycle.
2. Assign each class to the narrowest owner that can enforce its invariants.
3. Separate structural rendering from high-frequency controller work.
4. Model competing gestures as explicit modes with clear entry and exit conditions.
5. Pair every external callback or controller with an observable cleanup boundary.
6. Test the failure paths and update scope, then publish only evidence that has been measured or approved.

### Linked story

See [Keeping a rich dashboard responsive and understandable](../../contents/stories-content-dossier.md#7-keeping-a-rich-dashboard-responsive-and-understandable) for the related story-level framing. The [Rive animation journal](../../contents/journals/rive-animation-performance-optimization.md) provides the underlying source evidence.

### Confidentiality note

Private traces, recordings, internal UI identifiers, production code, source paths, product-specific commands, and proprietary implementation details are omitted. The code sample and state-flow diagram are illustrative and generalized; no numerical performance outcome is claimed.
