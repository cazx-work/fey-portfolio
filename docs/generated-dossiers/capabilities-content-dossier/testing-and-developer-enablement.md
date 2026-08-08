---
type: capability
slug: testing-and-developer-enablement
title: Testing and Developer Enablement
project: SEPIA
visibility: public
status: published
featured: false
tags: Testing, Developer Enablement, Quality
homepageSummary: Building repeatable tests and developer workflows for products whose behavior depends on timing, devices, and multiple platforms.
---

# Testing and Developer Enablement

## Executive Content

### Overview

The most useful test system shortens investigation: reproduce behavior at the cheapest deterministic seam, then escalate only when broader integration evidence is needed. This capability connects test design with developer workflow.

### The challenge

Device communication, asynchronous state, UI workflows, and environment variability can make failures expensive and hard to diagnose.

### Why it was difficult

No single test layer gives complete confidence. The system needed fast local feedback and meaningful connected workflow validation.

### The approach

- Aligned test layers with ownership boundaries.
- Used controlled streams and deterministic substitutes for async behavior.
- Kept widget contracts semantic and stable.
- Used selected BDD workflows for cross-boundary behavior.
- Enabled hardware-free paths for repeatable developer workflows.

### Results

Failures became easier to localize, workflows became easier to verify repeatedly, and test feedback became more actionable.

### Key takeaways

Developer enablement is architecture. Good tests reduce both defect risk and investigation cost.

## Technical Deep-Dive

### Technical thesis

Testing infrastructure should optimize for diagnosis quality, not only test count. In a product that combines device-facing behavior, asynchronous state, visual controls, and multiple runtimes, the useful question is not simply “does the suite pass?” It is “which boundary produced this behavior, and what is the cheapest repeatable test that can prove or disprove it?”

### The engineering problem and investigation method

The difficult failures were usually cross-boundary failures: a device event changed repository state, an application controller translated that state, and a widget rendered or acted on it later. A connected test could demonstrate the symptom, but it could not by itself explain whether the defect was a domain transformation, an application transition, an adapter interaction, a UI lookup, or environment lifecycle.

The reusable investigation method was therefore:

1. Reproduce the behavior at the narrowest observable seam available.
2. Replace timing-sensitive collaborators with controlled streams, deterministic fakes, or mocks.
3. Assert state transitions and side effects at the owner of the behavior, rather than asserting private implementation details.
4. Escalate to widget or connected workflow coverage only when the behavior genuinely crosses that boundary.
5. If the failure requires external processes or device-like behavior, run it through the hardware-free environment and verify startup, interaction, and cleanup separately.

This approach makes the test result useful to the next debugging step: a failing domain test points to a rule or transformation; a failing application test points to orchestration; a failing adapter test points to a boundary contract; and a failing connected scenario signals a problem that lower layers cannot fully represent.

### Architecture and state/data flow

The test architecture follows the ownership model of the application rather than treating the test suite as a separate system:

```text
Domain rules and transformations
				|
				v
Application state transitions
	controlled streams + fakes
				|
				v
Repositories and protocol adapters
	mocks + deterministic substitutes
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

At the lower layers, inputs are values, events, and collaborator responses. The application layer turns them into observable state transitions and side effects. At the UI boundary, semantic widget identity gives tests a stable contract without coupling them to visible text or layout. At the connected boundary, a Gherkin feature expresses intent, reusable steps resolve that intent into interactions, and scenario-scoped state carries only the context needed by the workflow. The Linux test environment supplies host and module test doubles when physical hardware is unavailable; its bootstrap, run, and stop responsibilities keep process ownership separate from application assertions.

### Layer strategy and boundaries

- **Domain:** Test value semantics, parsing, validation, copying, and graph or matrix transformations without Flutter or external services. These tests are fast and high-signal, but do not prove integration behavior.
- **Application:** Use controlled streams and focused assertions to verify initial state, event handling, asynchronous coordination, no-op behavior, error paths, and observable side effects. This is where timing is made explicit without depending on a live device.
- **Infrastructure and adapters:** Replace persistence, discovery, protocol, and platform-facing dependencies with deterministic fakes or generated mocks. Verify the boundary contract and fallback behavior while keeping the external system out of most tests.
- **Widgets:** Assert important interaction and rendering contracts through stable semantic identity. This protects user behavior while avoiding brittle dependence on layout or incidental labels.
- **Connected workflow:** Use selected Gherkin scenarios for behavior that truly spans multiple units. Feature selection, reusable steps, bounded waits, reporting, and cleanup make these tests executable specifications rather than duplicated scripts.
- **Developer environment:** Use a hardware-free runtime when connected behavior needs a realistic process topology. Presets and explicit overrides support standard and focused investigations; tracked process groups and teardown prevent stale services from contaminating the next run.

### Before-and-after investigation scenario

**Before:** A connected workflow intermittently failed after a simulated device update. The visible symptom was that a control did not reflect the latest value. A broad workflow test showed the failure, but the result mixed stream timing, application state, widget lookup, and test-double lifecycle, so the root cause was unclear.

**After:** The behavior was decomposed into evidence at each owner:

1. A controlled stream emitted the device-like update and the application test asserted the resulting state transition.
2. An adapter test verified that the external update was converted into the expected application-facing value.
3. A widget test verified that the semantic control identity rendered the application state.
4. The connected scenario remained as a contract test for the complete path, with bounded waiting rather than fixed timing assumptions.

The connected test still mattered, but it became the final confirmation rather than the only diagnostic instrument. The same method transfers to other asynchronous workflows: first isolate the state or boundary transition, then retain one higher-level test for cross-boundary confidence.

### Illustrative code example

The following is **illustrative pseudocode**, generalized from the testing approach. It is not production code and intentionally omits project-specific names, schemas, commands, and APIs.

```dart
test('publishes a device update as application state', () async {
	final updates = StreamController<DeviceUpdate>();
	final adapter = FakeAdapter(updates.stream);
	final controller = createController(adapter);

	controller.start();
	updates.add(DeviceUpdate(value: 0.75));

	await expectLater(
		controller.states,
		emitsThrough(const AppState(controlValue: 0.75)),
	);

	await controller.dispose();
	await updates.close();
	expect(updates.isClosed, isTrue);
});
```

The important contract is not the syntax. It is that the test controls the event source, observes the application-owned state, and checks lifecycle cleanup. A separate connected test can validate the same behavior through the real workflow without making every test depend on that environment.

### Failure modes and design responses

- **Flaky stream timing:** Controlled streams, bounded waits, and assertions over emitted transitions make ordering and readiness explicit instead of relying on sleeps.
- **Leaked lifecycle resources:** Application tests dispose subscriptions; the connected runner resets scenario state; the hardware-free environment tracks related processes and shuts them down as groups.
- **Over-mocking:** Adapter and application tests are kept distinct, while selected workflow tests exercise real composition so mocks do not become the only evidence.
- **Brittle widget selectors:** Semantic identity and reusable finders protect interaction contracts from layout and copy changes.
- **Stale hardware-free state:** Separate bootstrap, run, and stop stages; explicit process ownership and runtime cleanup reduce failures caused by an earlier interrupted session.
- **Connected failures without localization:** Use the layered result as a diagnostic map, then add or refine the narrowest regression test that captures the defect.

### Tradeoffs and implementation decisions

The strategy accepts maintenance costs in exchange for clearer evidence:

- Mocks and fakes must evolve with repository and adapter contracts, but they keep most feedback deterministic and independent of device availability.
- Semantic keys and finder conventions require discipline in the UI, but they are more stable than selectors based on layout or incidental text.
- Gherkin and scenario-world infrastructure add registration and cleanup complexity, but they make connected workflows readable and extensible.
- Hardware-free test doubles cannot prove every property of physical hardware, but they provide a repeatable process topology for application behavior and lifecycle investigation.
- Higher-level tests are slower and more expensive to diagnose, so they are reserved for cross-boundary behavior that lower layers cannot prove.

### Evidence strategy

Evidence is selected by the engineering question it answers:

- Domain and application tests show whether rules and asynchronous transitions are correct.
- Adapter tests show whether external boundaries are isolated and fallback behavior is explicit.
- Widget tests show whether user-facing interaction contracts remain stable.
- Gherkin workflows show whether selected product behaviors compose across units.
- The hardware-free lifecycle demonstrates that connected development can be repeated without requiring each developer to own physical devices.

The public evidence remains intentionally generalized: illustrative diagrams and pseudocode can explain the seams, while private commands, source paths, schemas, device identifiers, and production code are omitted.

### Linked story

See the fuller project-specific [Testing Infrastructure story](../stories-content-dossier/testing-infrastructure.md) for the underlying layered testing, BDD, and hardware-free workflow evidence.

### Confidentiality note

Internal test commands, infrastructure details, private reports, production code, device identifiers, and environment-specific configuration are not published. The code example and diagrams above are illustrative and generalized.
