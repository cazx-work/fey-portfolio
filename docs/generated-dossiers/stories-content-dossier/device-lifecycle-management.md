---
type: story
slug: device-lifecycle-management
title: Device Lifecycle Management
project: SEPIA
visibility: public
status: published
featured: false
tags: Lifecycle, Devices, State
homepageTitle: Keeping the application reliable when devices disconnect
homepageSummary: I gave discovery, reconnect, and cleanup a clear owner so the application could remain stable when connected hardware changed.
---

# Device Lifecycle Management

## Executive Content

### Overview

SEPIA had to stay coherent while external devices appeared, disappeared, and reappeared asynchronously. I established a lifecycle boundary that gives discovery, connection, recovery, and disposal one coordinator, keeping device resources and application state aligned.

### Problem

Device availability is asynchronous and unstable. A discovery callback, a manual Connect action, and a reconnect timer could all target the same endpoint while an earlier initialization was still in flight. Without a single owner, that created risks such as duplicate repositories, stale listeners, failed devices disappearing from recovery, and cleanup racing with new work.

### What changed

- Moved collection-level lifecycle policy into one coordinator.
- Distinguished connecting, connected, failed, and tearing-down states.
- Serialized initialization and rejected duplicate work across discovery, user actions, and reconnect attempts.
- Preserved failed and remembered device identities so recovery could remain explicit.
- Defined ordered, repeatable cleanup for timers, listeners, repositories, subscriptions, and streams.

### Why it matters

The application gained a predictable boundary around unreliable hardware. Lifecycle transitions became observable and testable, while reconnects could restore infrastructure without forcing the UI to discard useful module context. The result is not that devices never fail; it is that failure, recovery, and disposal have clear owners and visible behavior.

## Technical Deep-Dive

### Investigation focus

The investigation started with an ownership map rather than with another retry mechanism. Discovery callbacks, manual connection requests, reconnect passes, host repositories, timers, listeners, and stream controllers were all able to affect the same device. The question was not simply whether a device could connect; it was whether the application could explain, at every point, which component was allowed to create, publish, replace, or dispose each resource.

The failure pattern was a mismatch between volatile connectivity and longer-lived application state. A device could be unreachable while its module context was still useful, or it could reappear through a new endpoint while an older asynchronous initialization was still completing. That led to three investigation boundaries:

1. **Admission:** decide whether an endpoint or remembered device identity was already connecting, connected, failed, or being torn down.
2. **Transition:** make initialization, reconnect, network reset, and failure publication occur through one coordinator.
3. **Ownership:** close timers and listeners before repositories and public streams, so no late event could target disposed state.

This deliberately complements the separate repository-ownership and state-retention stories. Those stories explain durable module state and UI translation; this story focuses on the outer boundary that decides when a host repository exists and how it enters or leaves the active set.

### Architecture and state flow

The lifecycle coordinator is the collection-level owner. It receives discovery results, explicit connection intents, reconnect signals, and network-interface changes. It does not expose transport details to the UI. Instead, it maintains distinct lifecycle information:

- **Known identities/endpoints:** devices that may be recoverable, including remembered identity where endpoint details have changed.
- **Connecting:** work that has been admitted but has not completed initialization.
- **Connected repositories:** successfully initialized host repositories and their subscriptions.
- **Unconnectable records:** failures retained as observable recovery data rather than silently discarded.
- **Teardown state:** a boundary that rejects new work once disposal or a coordinated reset has begun.

The flow is therefore:

`event source → admission/deduplication → serialized initialization → repository creation → state publication → reconnect or disposal`

Initialization is serialized through an asynchronous work boundary. On success, the coordinator moves the identity from connecting into the active repository collection and publishes the change. On failure, it removes only the in-progress marker, records the failed identity, and leaves later recovery possible. This prevents a late success from becoming an unowned repository after cancellation or reset.

At the application boundary, repository and connectivity changes are streamed to consumers. The coordinator owns the collection-level stream lifecycle; the repository owns device-specific communication and module updates. This keeps UI controllers from deciding when to create or close a connection.

### Before-and-after scenario

**Before:** A discovery callback finds a device while a user presses Connect for the same endpoint. Both paths start initialization. If both complete, the application can hold two repositories for one device, each with its own listeners. A later disconnect may close one repository while the other continues publishing stale updates. A reconnect timer can then add a third attempt during teardown.

**After:** Both events enter the coordinator. The first request claims the identity in `connecting`; the second is rejected as duplicate work. Only a successful initialization enters `connected repositories`. If initialization fails, the identity moves to `unconnectable records` and remains eligible for an explicit recovery attempt. During disposal, new admissions are rejected, background timers and listeners are canceled, repositories are closed, and streams are closed last. The same event sequence therefore produces one observable connection or one explicit failure, not several competing resource graphs.

### Illustrative implementation boundary

“Illustrative Dart pseudocode. This is a generalized example and does not represent the production implementation.”

```dart
Future<void> admit(DeviceCandidate candidate) async {
  if (_closing || _active.containsKey(candidate.identity)) return;
  if (!_pending.add(candidate.identity)) return;

  try {
    final session = await _openSession(candidate);
    if (_closing) {
      await session.close();
      return;
    }
    _active[candidate.identity] = session;
    _events.add(LifecycleReady(candidate.identity));
  } catch (error) {
    _failed[candidate.identity] = error;
    _events.add(LifecycleFailed(candidate.identity));
  } finally {
    _pending.remove(candidate.identity);
  }
}
```

The example demonstrates the principle, not a production API: admission is guarded, initialization has one completion path, late success is checked against teardown, and failure remains visible for recovery. The production implementation also coordinates discovery restart, remembered identity, repository subscriptions, and ordered disposal, none of which are reproduced here.

### Network changes and recovery boundaries

A network-interface change is treated as a coordinated reset rather than as an ordinary reconnect. The coordinator captures known recoverable endpoints or identities, stops the current discovery/listener activity, closes active host repositories, resets discovery, and then attempts reconnection from the captured set. This ordering prevents old discovery results from being mixed with the new interface and avoids leaving repositories attached to invalid reachability information.

Recovery is intentionally separated from durable module state. Reconnect restores or replaces the infrastructure session; it does not require the UI to recreate every module controller or discard user context. Online and offline repository contracts provide the application with a stable shape while transport availability changes. Detailed repository state ownership is covered by the related [**State Retention Architecture**](../../contents/journals/state-retention-architecture.md) and [**Repository Ownership Architecture**](../../contents/journals/repository-ownership-architecture.md) stories.

### Failure modes and boundaries

- **Duplicate discovery and manual intent:** separate connecting and connected collections reject duplicate initialization before external resources are created.
- **Cancellation during initialization:** completion checks the coordinator’s teardown/reset boundary before publishing a newly created session; a late session is closed rather than adopted.
- **Failure during initialization:** failed identities are recorded explicitly, allowing recovery behavior to be represented instead of losing the device from application state.
- **Reconnect during teardown:** disposal changes admission behavior first, then cancels timers and listeners so no new reconnect can race with cleanup.
- **Stale discovery after interface change:** the reset sequence closes old repositories and restarts discovery from a captured identity set.
- **Repeated disposal:** cleanup is designed to be idempotent, so a second disposal request does not repeat ownership transitions or publish into closed streams.

### Tradeoffs

A central coordinator adds explicit state, queueing, and orchestration that would be unnecessary in a single-connection application. It also makes event ordering and cleanup responsibilities visible rather than hiding them inside feature code. That cost was accepted because discovery, manual actions, reconnect timers, and network changes all target the same resource set.

The design also retains failed identities and remembered device identity, which increases lifecycle-model complexity. The benefit is that transient unavailability and endpoint changes remain recoverable states instead of being confused with permanent removal. Stream-based publication similarly requires subscription discipline, but it gives dependent application layers an observable contract without exposing transport internals.

### Testing strategy and evidence

The evidence is scenario-based and follows the ownership boundaries:

- **Race-condition coverage:** discovery and manual connection target the same identity, proving duplicate work is rejected.
- **Cancellation coverage:** initialization completes after a reset or disposal, proving late resources are not published into the active set.
- **Recovery coverage:** a failed or unreachable identity is retained, then retried through the explicit reconnect path.
- **Network-reset coverage:** known identities survive the coordinated close-and-rediscover sequence without reusing stale discovery state.
- **Cleanup coverage:** timers, discovery listeners, repository subscriptions, repositories, and streams are closed in dependency order.
- **Contract coverage:** repository and stream updates remain consumable by application layers without requiring live hardware for every test.

This follows the broader testing architecture’s use of controlled streams, deterministic fakes, and layered application tests. The important evidence here is not a coverage percentage; it is that each externally visible lifecycle transition has a corresponding observable assertion and that resource ownership can be verified without relying on nondeterministic hardware availability.

### Evidence

The primary evidence is the lifecycle design record covering duplicate guards, serialized initialization, failed-host tracking, repository-level reconnect, remembered identity across endpoint changes, coordinated network reset, stream publication, and ordered disposal. Supporting evidence comes from the repository-ownership and state-retention records, which establish the boundary between infrastructure recovery and durable module state, and from the application-testing record, which documents controlled asynchronous testing and deterministic infrastructure substitutes.

### Confidentiality note

Private endpoint identifiers, SDK details, and operational data remain generalized.
