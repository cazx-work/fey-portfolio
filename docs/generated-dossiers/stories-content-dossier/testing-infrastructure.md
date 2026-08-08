---
type: story
slug: testing-infrastructure
title: Testing Infrastructure
project: SEPIA
visibility: public
status: published
featured: false
tags: Testing, Infrastructure, Developer Enablement
---

# Testing Infrastructure

## Executive Content

### Overview

I turned testing for SEPIA's asynchronous, device-connected workflows into a reliability system rather than a single suite. Fast deterministic tests explain local behavior; selected connected workflows verify that the pieces still work together.

### Problem

SEPIA combined changing device state, persistence, interactive UI, external boundaries, and multi-step workflows. Tests that relied only on live hardware were slow and difficult to reproduce, while broad integration failures often showed a symptom without revealing which boundary owned the defect.

### What changed

- Organized coverage around domain, application, adapter, widget, and connected-workflow responsibilities.
- Made asynchronous transitions observable with controlled streams, deterministic fakes, and focused state assertions.
- Replaced fragile text- and layout-based UI lookup with semantic interaction contracts shared by the application and tests.
- Built reusable Gherkin workflows with scenario-scoped state, bounded synchronization, and focused feature execution.
- Added a repeatable hardware-free environment with test doubles and explicit startup, process ownership, and cleanup boundaries.

### Why it matters

The team could investigate failures at the cheapest useful seam before escalating to a connected workflow. That improved diagnostic clarity, made regression coverage easier to extend, and reduced dependence on live hardware for everyday development and validation.

## Technical Deep-Dive

### Engineering problem and investigation method

SEPIA combined device-facing behavior, asynchronous application state, persistence, interactive controls, and multi-step workflows. A failure visible in a connected workflow could therefore originate in several places: a device-like event might be decoded incorrectly, mapped into the wrong application value, emitted through the wrong state transition, rendered by the wrong widget, or observed before the UI was ready. A broad end-to-end failure proved that the user journey was broken, but did not identify the owning boundary.

The investigation method was consequently boundary-first:

1. Reproduce the symptom at the narrowest deterministic seam available.
2. Control the event source with a stream, fake, or mock rather than depending on live timing.
3. Assert the contract owned by that layer: a transformation, state transition, adapter interaction, or semantic UI behavior.
4. Escalate to widget and connected workflow tests only when the behavior genuinely crosses those boundaries.
5. When the scenario required a realistic process topology, use the hardware-free environment and investigate startup, interaction, and teardown as separate lifecycle concerns.

This made a failing test actionable. A domain failure pointed to a rule or transformation; an application failure pointed to orchestration; an adapter failure pointed to an external contract; and a connected failure identified a composition problem that lower layers could not represent alone.

### Architecture and state/data flow

The test structure followed the application’s ownership boundaries instead of treating testing as one undifferentiated suite:

```text
Device-like events or persisted values
		  |
		  v
Domain parsing, validation, and transformation
		  |
		  v
Application state transitions
	controlled streams + fakes
		  |
		  v
Persistence and protocol adapters
	deterministic substitutes
		  |
		  v
Widget interaction contracts
	semantic identity + bounded waits
		  |
		  v
Selected connected workflows
	Gherkin + scenario-scoped state
		  |
		  v
Hardware-free runtime when devices are unavailable
	test doubles + tracked lifecycle
```

At the lower layers, inputs are values, events, and collaborator responses. Application controllers translate them into observable state and side effects. Widgets consume that state through stable semantic identity rather than incidental text or layout. A Gherkin scenario expresses the user-facing intent; reusable steps resolve it into interactions and carry only scenario-scoped context. When physical devices are unavailable, host and module test doubles provide a repeatable process topology, while separate bootstrap, run, and stop responsibilities keep environment lifecycle out of application assertions.

### Layer strategy and implementation decisions

- **Domain:** Validate value semantics, parsing, copying, and graph or matrix transformations without Flutter or external services. This is the fastest evidence for rules that should remain independent of presentation.
- **Application:** Use controlled streams and focused assertions for initial state, event handling, asynchronous coordination, no-op behavior, error paths, and observable side effects. Timing becomes explicit without requiring a live device.
- **Infrastructure and adapters:** Substitute persistence, discovery, protocol, and platform-facing collaborators with deterministic fakes or generated mocks. Tests verify request/response contracts and fallback behavior without making external systems part of most runs.
- **Widgets:** Use semantic, stable identity for important controls and assertions. A shared identity/finder contract allows UI tests and connected steps to target dynamic elements without depending on visible copy or widget nesting.
- **Connected workflows:** Use selected Gherkin scenarios for behavior that truly spans multiple units. Reusable steps, bounded synchronization, feature selection, reporting, and scenario cleanup make these workflows executable specifications rather than duplicated scripts.
- **Developer environment:** Use a hardware-free runtime for realistic connected behavior when hardware is unavailable. Presets and explicit overrides support standard and focused investigations; tracked process ownership and group cleanup reduce stale-service failures.

The important design decision was not to maximize the number of tests at one level. It was to give each behavior one primary owner and reserve expensive tests for evidence that could not be obtained more cheaply below it.

### Before-and-after investigation scenario

**Before:** A connected workflow intermittently failed after a simulated device update. The visible symptom was that a control did not show the latest value. The broad scenario mixed event timing, application state, widget lookup, and test-double lifecycle, so rerunning it produced a result but not a diagnosis.

**After:** The behavior was decomposed into four linked checks:

1. A controlled event stream drove the application-facing update, and an application test asserted the resulting state transition.
2. An adapter test verified that the device-like response became the expected application value.
3. A widget test verified that semantic control identity rendered that value.
4. The connected scenario remained as a composition contract, using bounded waits instead of fixed sleeps.

The higher-level test still protected the real workflow, but it was no longer the only evidence. The same approach could be applied to persistence updates, reconnect behavior, or multi-step UI flows: isolate the owning transition first, then retain one broader test for cross-boundary confidence.

### Illustrative code example

“Illustrative Dart pseudocode. This is a generalized example and does not represent the production implementation.”

```dart
test('turns a controlled external event into owned application state', () async {
  final events = StreamController<ExternalChange>();
  final source = FakeSource(events.stream);
  final model = StateModel(source);

  model.begin();
  events.add(const ExternalChange(level: 0.75));

  await expectLater(
    model.states,
    emitsThrough(const ViewState(level: 0.75)),
  );

  await model.close();
  await events.close();
});
```

The principle is more important than the syntax: the test owns the event source, observes application-owned state, and verifies cleanup. It does not need a device, a widget tree, or a fixed delay to prove this transition. A separate connected scenario can validate the complete composition.

### Failure modes and responses

- **Flaky asynchronous updates:** Controlled streams, bounded waits, and transition assertions make readiness and ordering explicit instead of relying on sleeps.
- **Lifecycle leaks:** Application tests dispose subscriptions; scenario state is reset between workflows; the hardware-free environment tracks related processes and shuts them down as groups.
- **Over-mocking:** Adapter and application tests remain distinct, while selected connected scenarios exercise real composition so mocks are not the only evidence.
- **Brittle selectors:** Semantic identity and reusable finders protect important interactions from layout and copy changes.
- **Stale hardware-free state:** Bootstrap, run, and stop are separate lifecycle stages, with explicit ownership and runtime cleanup after interrupted sessions.
- **Connected failures without localization:** Use the layered result as a diagnostic map, then add or refine the narrowest regression test that captures the defect.

### Tradeoffs

The approach deliberately accepts complexity where it improves evidence quality:

- Mocks and fakes require maintenance as contracts evolve, but keep most feedback deterministic and independent of device availability.
- Semantic keys and finder conventions add UI discipline, but avoid selectors coupled to layout or incidental labels.
- Gherkin runner and scenario-state infrastructure add registration and cleanup rules, but make connected workflows readable and reusable.
- Hardware-free test doubles cannot prove every property of physical hardware, but provide a repeatable environment for application behavior and lifecycle investigation.
- Higher-level tests are slower and harder to diagnose, so they are reserved for behavior that lower layers cannot prove.

### Evidence

Evidence was chosen according to the question being investigated:

- Layered application tests show domain rules and asynchronous state transitions.
- Adapter tests show isolated external-boundary behavior and fallback handling.
- Semantic widget tests show that user-facing interaction contracts remain stable.
- Gherkin workflows show that selected product behaviors compose across units.
- The hardware-free environment shows that connected development can be repeated without requiring every developer to have physical devices available.

This story intentionally links to the reusable [Testing and Developer Enablement capability](../capabilities-content-dossier/testing-and-developer-enablement.md), which explains the transferable competency. This page focuses on the SEPIA investigation, migration of evidence across boundaries, and project-specific testing infrastructure.

### Confidentiality note

Private test commands, source paths, production code, device identifiers, schemas, environment configuration, and internal reports remain excluded. The diagram and Dart example are generalized and publication-safe; no example represents the production implementation.
