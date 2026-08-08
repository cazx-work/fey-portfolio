---
type: capability
slug: native-and-hardware-integration
title: Native and Hardware Integration
project: SEPIA
visibility: public
status: published
featured: false
tags: Native Integration, Hardware, Dart
homepageSummary: Connecting product workflows to native code, protocols, and real-world hardware without leaking boundary complexity into the UI.
---

# Native and Hardware Integration

## Executive Content

### Overview

Typed APIs, lifecycle-aware integration, and explicit mapping keep asynchronous hardware complexity from leaking into product features. This capability describes the boundary that makes wire-level behavior usable as product state.

### The challenge

Feature teams should not need to reason about binary framing, response correlation, device notification timing, or transport session mechanics for day-to-day product work.

### Why it was difficult

The abstraction had to hide low-level details without hiding meaningful device behavior or creating ambiguous error semantics.

### The approach

- Built typed capability models around external behavior.
- Centralized command orchestration, correlation, and status interpretation.
- Kept transport and session lifecycle ownership explicit.
- Mapped protocol outcomes into application-facing domain state.

### Results

Protocol complexity stayed localized, feature APIs became more discoverable, and failure behavior gained deterministic testing seams.

### Key takeaways

Integration quality is boundary quality: explicit ownership, explicit failure modes, and explicit mapping.

## Technical Deep-Dive

### Technical thesis

Hardware integration should be modeled as asynchronous collaboration, not as direct function calls against a stable endpoint. The reusable competency is turning an external system with its own timing, identity, and failure rules into application capabilities with explicit contracts.

### Engineering problem and investigation

The engineering problem was not only encoding and decoding messages. Product features needed to control specialized audio hardware while several facts remained uncertain at the same time:

- a command could complete later, fail at the device, or be overtaken by a lifecycle change;
- a device could emit a notification that was not an acknowledgement of the user's command;
- discovery, manual connection, reconnect, and shutdown could target the same endpoint concurrently;
- the hardware topology could change while saved configuration and application state still represented valid user intent;
- physical hardware was not always available for repeatable development and test workflows.

The investigation therefore followed behavior across boundaries rather than starting with individual protocol classes. I traced a representative operation from feature intent to command construction, transport handoff, response or notification handling, and domain state update. In parallel, I examined who owned discovery, connection attempts, repositories, streams, timers, and disposal. This exposed the risks that a feature-level API could not safely solve on its own: correlation, status interpretation, lifecycle races, stale state, and cleanup.

### Boundary model

The boundary is layered by responsibility. Data moves downward as an intent to operate, then upward as a validated result or device-originated event:

```text
Feature intent
	|
	v
Typed capability API
	|
	v
Command orchestration
	|  correlate, validate status, decode
	v
Codec / serialization
	|  generalized wire representation
	v
Injected transport
	|
	v
Device and session lifecycle
	|
	+--> responses and notifications
			 |
			 v
	   Protocol-to-domain mapping
			 |
			 v
	   Repository state and streams
			 |
			 v
	   Application and UI state
```

The SDK or integration boundary owns protocol models, codecs, command orchestration, response validation, and capability objects. The host application owns discovery, connection policy, reconnection, and resource lifecycle. Repositories retain application-facing state and expose snapshots or streams; presentation layers consume those updates rather than initiating transport work.

This split is important because a transport is not a device model, a response is not necessarily a state update, and a saved configuration is not the same thing as the currently resolved hardware state.

### Implementation decisions

#### Centralize command semantics

One command path handles request construction, correlation, asynchronous completion, status interpretation, and typed decoding. Capability-specific objects describe what an operation means, but do not each implement their own framing, response matching, or error rules.

#### Map protocol state explicitly

Communication models are converted into domain-facing objects at a deliberate boundary. That mapping makes identifiers, status values, heterogeneous parameters, and notification shapes useful to product code without requiring every feature to understand their wire representation.

#### Inject transport; keep lifecycle outside

The communication layer receives a transport capability instead of discovering devices or owning reconnection policy. This preserves a clear host-level owner for sessions and allows tests to substitute deterministic responses without connecting to live hardware.

#### Keep durable and volatile state separate

Repository-owned application state can remain useful across disconnects and UI reconstruction, while connection status and resolved hardware topology remain volatile. Configuration recall follows the same rule: the original saved snapshot remains distinct from the runtime-resolved version so changes can be re-evaluated instead of silently overwriting user intent.

### Before and after: one device operation

Consider a feature that needs to update a device capability. In the coupled version, the feature would need to know how to construct a protocol message, wait for a correlated response, distinguish a device-reported failure from a transport failure, and update application state. It would also be easy for a notification to be mistaken for command completion.

In the improved version, the feature requests a typed operation and receives a domain result. The integration boundary owns the protocol sequence, while the repository publishes the resulting state change separately:

```text
Before
Feature -> raw message fields -> transport -> ad hoc response parsing
		-> feature-specific status handling -> mutable UI update

After
Feature -> typed capability operation
		-> shared command/correlation/status pipeline
		-> protocol-to-domain mapping
		-> repository snapshot/stream -> focused UI state
```

The after version does not remove complexity; it gives that complexity one owner and gives the rest of the product a stable vocabulary.

### Illustrative command boundary

The following is **illustrative pseudocode**, generalized and intentionally redacted. It shows the shape of the boundary, not production code or a proprietary schema:

```dart
// Illustrative pseudocode — generalized, not production code.
Future<DomainResult> executeCapabilityOperation(Operation operation) async {
  final request = codec.encode(operation.toProtocolRequest());
  final response = await transport.send(request);
  final message = codec.decode(response);

  final correlated = correlation.validate(message, operation.requestId);
  final status = statusMapper.interpret(correlated.status);
  if (!status.isSuccess) return DomainResult.failure(status.reason);

  return mapper.toDomainResult(correlated.payload);
}
```

In the real boundary, notifications follow a separate path and are mapped into state updates rather than being treated as command completion. The transport and message details are intentionally omitted here.

### Failure patterns

The main failure modes are boundary failures, not only malformed messages:

- **Late response:** a response arrives after cancellation, reconnect, or disposal. Correlation and lifecycle state must prevent it from mutating a stale operation.
- **Wrong event meaning:** a device notification is received near a command response. Separate event handling prevents a notification from being treated as acknowledgement.
- **Device-reported failure:** transport succeeded but the device rejected the operation. Status interpretation must preserve that distinction for domain-facing error handling.
- **Initialization race:** discovery, a user action, and reconnect all target one endpoint. Separate connecting from connected state and centralize initialization to reject duplicate work.
- **Session loss:** an optimistic UI value outlives the external session. Repository state must expose availability and revalidation rather than presenting an unverified write as durable device state.
- **Topology mismatch:** saved modules, slots, or dependent paths no longer match the live system. Matching and severity-aware recovery must protect the original snapshot and block unsafe operations.
- **Resource leak:** timers, listeners, streams, or repositories outlive their owner. Lifecycle disposal must be explicit and ordered.

These failures are handled at the boundary where the relevant information exists. A feature should not need to reconstruct transport timing or device identity to decide whether an operation is safe.

### Tradeoffs

Typed models, mapping, lifecycle coordination, and repository contracts add code and require discipline around event ordering and cleanup. A centralized command path can also become a critical extension point, and long-lived repositories require explicit disposal. Those costs were accepted because distributing the same concerns across features would create inconsistent status semantics, duplicate connection work, harder-to-reproduce races, and APIs coupled to private protocol details.

The design also avoids claiming that every external state change can be reconciled automatically. When identity or topology is ambiguous, explicit conflict feedback and revalidation are safer than best-effort mutation. The transferable decision rule is to hide representation details, not meaningful uncertainty.

### Testing strategy and evidence

Each test seam corresponds to a specific boundary risk:

- **Codec and model fixtures** verify serialization, parsing, typed values, and supported representations without live devices.
- **Correlation and status tests** verify successful responses, late responses, device-reported failures, and response-to-operation matching.
- **Notification tests** verify that device-originated updates follow a state-update path distinct from command completion.
- **Lifecycle tests** exercise duplicate discovery, initialization failure, reconnect, network changes, cancellation, and ordered disposal.
- **Repository and stream tests** verify snapshot-plus-stream synchronization, online/offline contract parity, and preservation of application context.
- **Recovery tests** cover identity matching, missing modules, changed placement, dependent paths, conflict severity, and revalidation of the original saved snapshot.
- **Transport substitution and hardware-free workflows** allow connected behavior to be exercised with deterministic fakes and repeatable test doubles when physical hardware is unavailable.

The evidence should demonstrate a traceable operation or failure path rather than expose private implementation. Suitable public evidence includes a conceptual command lifecycle, a redacted API shape, a recovery state diagram, a test-boundary diagram, or a recording of disconnect and reconnect behavior. Production code, private schemas, identifiers, commands, and live configuration remain excluded.

### Evidence strategy

Prioritize a traceable command lifecycle, one notification-versus-response distinction, one lifecycle race, and one hardware-free test path. Keep any diagram, API shape, or code sample conceptual, redacted, and tied to the engineering boundary it demonstrates.

### Linked stories

- [Hardware Communication Platform](../stories-content-dossier/hardware-communication-platform.md)
- [Device Lifecycle Management](../stories-content-dossier/device-lifecycle-management.md)

### Confidentiality note

Private schemas, command sets, identifiers, and implementation details are intentionally withheld.
