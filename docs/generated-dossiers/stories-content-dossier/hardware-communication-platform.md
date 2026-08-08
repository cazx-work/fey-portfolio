---
type: story
slug: hardware-communication-platform
title: Hardware Communication Platform
project: SEPIA
visibility: public
status: published
featured: false
tags: Hardware, Communication, Integration
homepageTitle: Making hardware communication safer to extend
homepageSummary: I separated transport, protocol, and application concerns so hardware integration stayed typed, testable, and easier to evolve.
---

# Hardware Communication Platform

## Executive Content

### Overview

SEPIA needed product features to control specialized hardware without making every feature understand message framing, response status, correlation, or payload encoding. I shaped a typed communication boundary that turned those protocol mechanics into predictable capabilities, while keeping connection lifecycle decisions with the host application.

### Problem

The difficult part was coordinating two different kinds of asynchronous input: a response to a command and an unsolicited notification from the device. Without an explicit boundary, protocol details spread into feature code, failures were interpreted inconsistently, and a notification could be mistaken for completion of the wrong operation.

### What changed

- Centralized request construction, correlation, response validation, and typed decoding.
- Separated command responses from device-originated notifications.
- Mapped communication results into application-facing capability models.
- Injected transport behavior so asynchronous paths could be tested without live hardware.
- Kept discovery, reconnection, and disposal with the application lifecycle owner.

### Why it matters

The result was a reusable foundation for extending hardware features safely. Product code could work with typed capabilities and explicit failures instead of wire-format details, while the communication layer provided consistent behavior across commands, notifications, and tests.

## Technical Deep-Dive

### Investigation focus

The engineering problem was not simply moving bytes between an application and a device. A feature intent had to become a valid command, travel through an asynchronous session, be matched to the correct response, and return as a useful application state change. At the same time, the device could emit updates that were not caused by the feature's command. Treating both paths as one response stream would make state appear successful when the device had reported something else.

The investigation followed representative operations end to end rather than starting with folders or class names:

1. Start with an application intent such as reading or changing a capability.
2. Identify which information belongs to the typed capability API and which belongs to communication infrastructure.
3. Trace encoding, transport delivery, correlation, response status, and payload decoding.
4. Trace a device-originated notification separately from a command response.
5. Check where mapped state is published and who owns connection, retry, and disposal behavior.
6. Turn each boundary into a test seam so the behavior could be checked without relying on live hardware.

This exposed the central design decision: the SDK should explain device behavior to feature code, but it should not become the owner of the connection lifecycle.

### Before-and-after scenario

**Before:** A feature that needed a device value could become responsible for assembling protocol data, sending it through a session, interpreting a status, and decoding a payload. If a device notification arrived at the same time, the feature had to decide whether it represented command completion or an independent state change. That duplicated protocol knowledge and made failure behavior inconsistent between features.

**After:** The feature calls a typed capability operation and receives either a mapped result or an explicit failure. The shared command path constructs and correlates the request, validates the returned status, and decodes the expected payload. A separate notification path converts unsolicited device events into application-facing updates. The host still owns discovery, reconnection, and session disposal, so the communication boundary can be tested with a substitute transport.

The improvement is not that the protocol disappeared; it is that protocol responsibility moved to one place. A new feature can use the same command, status, notification, and mapping rules instead of reimplementing them.

### Boundary model and state flow

The story's boundaries are deliberately narrower than the product's full device lifecycle. Lifecycle coordination belongs to the related [Device Lifecycle Management](device-lifecycle-management.md) story; this dossier focuses on the communication contract used inside that lifecycle.

```text
Feature intent
			|
			v
Typed capability API
			|
			v
Command orchestration ── status validation ── typed response decoding
			|                                      |
			v                                      v
Codec / serialization                    Mapped application result
			|
			v
Injected transport session
			|
			v
External hardware
			|
			+── command response ──> correlation ──> result or failure
			|
			+── unsolicited event ─> notification mapping ──> state update
```

The important ownership rules are:

- **Capability API:** exposes operations in application language rather than wire-format language.
- **Command orchestration:** owns request construction, correlation, status interpretation, and typed decoding.
- **Codec layer:** owns framing and serialization concerns; it does not decide what a feature means.
- **Notification path:** treats device-originated events as state input, not as implicit completion of the latest command.
- **Mapping layer:** converts communication models into application-facing models at one explicit boundary.
- **Host lifecycle:** owns the injected session, discovery, reconnection, and disposal policy.

### Illustrative command and notification separation

“Illustrative Dart pseudocode. This is a generalized example and does not represent the production implementation.”

```dart
sealed class DeviceInput {}

final class CommandReply extends DeviceInput {
	CommandReply(this.requestKey, this.ok, this.value);

	final String requestKey;
	final bool ok;
	final int? value;
}

final class DeviceNotice extends DeviceInput {
	DeviceNotice(this.kind, this.value);

	final String kind;
	final int value;
}

void handleInput(DeviceInput input, String waitingFor) {
	switch (input) {
		case CommandReply(:final requestKey, :final ok, :final value):
			if (requestKey == waitingFor) {
				// Complete the pending operation only after validating its status.
				recordCommandResult(ok, value);
			}
		case DeviceNotice(:final kind, :final value):
			// Publish independent device state without completing a command.
			publishDeviceState(kind, value);
	}
}
```

This small model demonstrates the invariant that a response completes only its own pending operation, while a notification updates observed state independently. The production implementation uses different names and protocol-specific types; those details are intentionally omitted.

### Implementation decisions

#### Centralized command orchestration

Request construction, correlation, response decoding, and status checks were treated as one reusable path. This prevents each capability abstraction from inventing its own interpretation of success, failure, or malformed data. It also gives future capabilities a stable extension point: add the capability-specific model and mapping without copying the communication pipeline.

#### Explicit response and notification channels

Responses answer a request; notifications report an external change. Keeping those concepts separate prevents a notification from resolving the wrong pending operation and makes externally initiated state changes visible to application consumers. It also makes late or duplicated input something the boundary can classify rather than something every feature must guess about.

#### Transport injection and lifecycle ownership

The communication layer accepts transport behavior from its host instead of owning discovery, reconnection, or shutdown. This keeps the SDK useful across different connection environments and avoids hiding lifecycle policy inside a capability object. It also creates a deterministic seam for tests: the transport can provide controlled replies, failures, delays, and notifications.

#### Protocol-to-application mapping

Wire-level identifiers, statuses, and payload shapes are converted before they reach feature code. The mapping is intentionally explicit even though it introduces some duplication. That cost protects the application from changes in serialization details and gives the product a vocabulary based on capabilities rather than protocol mechanics.

### Failure modes and recovery boundaries

- **Late response:** If a response no longer matches an active request, it must not complete a newer operation. Correlation state provides the rejection boundary; lifecycle recovery remains with the host.
- **Unsolicited notification:** A device event must update observed state without being interpreted as command success. The separate notification path preserves that distinction.
- **Reported status failure:** A transport delivery can succeed while the device operation fails. Status validation keeps transport success from becoming application success.
- **Malformed or unexpected payload:** Typed decoding should fail at the communication boundary rather than leaking weakly typed values into feature code.
- **Transport loss:** The capability layer should not invent optimistic state after the session disappears. Connection and reconnection policy belongs to the lifecycle owner, which can publish the resulting availability change.
- **State drift after missed events:** Reconnection or resynchronization is a lifecycle concern; the communication boundary supplies typed results and notifications without claiming that one event stream is a complete state snapshot.

These boundaries complement, rather than duplicate, the recovery and state-ownership decisions documented in [Device Lifecycle Management](device-lifecycle-management.md) and [Configuration Recovery](configuration-recovery.md).

### Testing strategy and evidence

The test strategy follows the data flow and replaces external dependencies at the narrowest useful seam:

- **Codec fixtures** verify framing, serialization, deserialization, and representative round trips without requiring a connected device.
- **Correlation tests** provide multiple pending operations, out-of-order input, late input, and status failures to verify that only the matching operation completes.
- **Notification tests** send device-originated events independently of command replies and assert that application state changes without resolving a request.
- **Transport substitution tests** inject deterministic transport behavior to exercise replies, failures, delays, and event delivery.
- **Mapping tests** verify that communication models become stable application-facing values and that invalid input fails at the intended boundary.

This is deliberately narrower than the full application testing story. The related [Testing Infrastructure](testing-infrastructure.md) dossier covers the broader layered test architecture and connected workflows; the evidence here is the communication-specific slice of that strategy.

### Tradeoffs

The design accepts more explicit types, mapping code, and boundary objects than direct feature-to-transport calls would require. It also makes correlation and notification semantics visible instead of relying on a single generic event stream. Those costs are justified because they localize protocol change, make ownership reviewable, and allow deterministic tests of asynchronous behavior.

The main remaining complexity is orchestration: a shared command path becomes an important piece of infrastructure and must preserve consistent semantics as capabilities grow. A future refinement would be to formalize timeout, cancellation, and resynchronization policies at the host/lifecycle boundary, where they can be coordinated with connection state rather than hidden inside individual commands.

### Evidence

Verified evidence for this story includes the AES70 SDK design material describing typed protocol models, reusable codec components, shared command handling, response correlation, status validation, notification modeling, capability abstractions, application mapping, and injected transport. Supporting evidence comes from the testing architecture's codec, infrastructure, controlled-stream, and deterministic-fake testing patterns. The lifecycle and recovery stories provide adjacent evidence for connection ownership and state restoration without being repeated here.

### Confidentiality note

Protocol schemas, command sets, binary layouts, proprietary identifiers, production class names, source paths, and device-specific implementation details are intentionally omitted. The Dart example is generalized pseudocode for the boundary principle only; it is not extracted from or structurally representative of the production implementation.
