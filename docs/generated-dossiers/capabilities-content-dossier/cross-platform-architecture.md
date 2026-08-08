---
type: capability
slug: cross-platform-architecture
title: Cross-Platform Architecture
project: SEPIA
visibility: public
status: published
featured: false
tags: Flutter, Cross-platform, Architecture
homepageSummary: Designing shared product architecture across Flutter, native integrations, and platform-specific constraints.
---

# Cross-Platform Architecture

## Executive Content

### Overview

Shared Flutter UI is only one part of cross-platform engineering. The deeper goal is preserving product behavior while online/offline modes, device availability, and platform integrations vary.

### The challenge

The same user action should mean the same thing on different runtime paths, even when external hardware, persistence, or connectivity differs.

### Why it was difficult

Parity is easy to claim and hard to prove. If platform differences are hidden in UI conditionals, drift accumulates silently.

### The approach

- Kept feature-facing contracts stable across online and offline implementations.
- Made runtime differences explicit at adapter boundaries.
- Preserved state ownership in application/domain layers instead of platform-specific screens.
- Tested behavior parity at contract boundaries before UI-level patching.

### Results

Behavior remained more consistent across runtime conditions, and platform-specific failures became easier to isolate.

### Key takeaways

Cross-platform quality is behavioral coherence under different operating conditions, not percentage of shared files.

## Technical Deep-Dive

### Technical thesis

Cross-platform architecture combines shared product behavior with platform-specific implementations. For SEPIA, the relevant question was not simply how much Flutter code could be reused. It was how to keep the same feature intent and state model across supported Windows, macOS, and iOS delivery paths while isolating differences in device access, transport, persistence, and platform services.

The reusable competency is separating **what the product means** from **how a platform makes it possible**. Shared application and domain contracts preserve behavior; adapters and platform boundaries absorb runtime constraints.

### Platform scope

SEPIA’s verified platform scope includes Windows, macOS, and iOS. The architecture should not imply that every capability is identical on all three platforms. Instead, it distinguishes:

- **Shared behavior:** feature intent, domain rules, state transitions, validation, and the application-facing contract.
- **Platform-specific behavior:** device communication, native services, persistence constraints, discovery, reachability, and lifecycle integration.
- **Supported variation:** a platform may expose a different implementation or capability while still returning a predictable result through the same feature boundary.

This is the difference between a shared product architecture and a claim that every platform has the same hardware or operating-system capabilities.

### Investigation process

The investigation started by tracing a feature from its UI entry point through application state, domain contracts, infrastructure, and platform integration. The useful questions were:

1. Which decisions are platform-independent product behavior?
2. Which dependencies require Windows, macOS, iOS, hardware, or a particular runtime service?
3. Where should platform differences be translated into a stable application result?
4. Can the same user action be exercised against each supported implementation?
5. Can platform-specific failures be isolated without moving platform conditionals into widgets?

This exposed a recurring risk: if platform checks and transport decisions are distributed through screens, behavior can drift even when the UI looks shared. The architecture work therefore focused on dependency direction and contract boundaries before presentation changes.

### Shared architecture and platform boundaries

The feature-first structure separates presentation, application coordination, domain contracts, and infrastructure adapters. The shared layers express the product behavior that should remain coherent across Windows, macOS, and iOS. Platform-specific code is kept behind infrastructure boundaries rather than being selected throughout the presentation layer.

The `ModuleRepository` is an example of the shared application-facing boundary. It represents module identity, capabilities, configuration, topology changes, control data, and state streams. Online and offline implementations satisfy that contract while keeping communication or simulation details private. The same architectural pattern applies when the implementation must vary by platform: consumers depend on the contract, not on the operating-system mechanism.

```text
Shared Flutter presentation
              |
              v
Application and domain contract
              |
       platform-neutral intent
        /          |          \
       v           v           v
 Windows adapter  macOS adapter  iOS adapter
       |           |           |
 platform services, transport, device access, persistence
```

The important flow is not UI → platform code. A user action enters through shared application logic, is translated at the relevant platform boundary, and returns as a shared domain result or state update. BLoCs translate that result into UI state. Presentation code does not need to know whether the underlying implementation used a Windows, macOS, or iOS service.

### Boundary decisions for cross-platform delivery

#### Keep product intent shared

User actions and domain decisions belong above platform adapters. A control change, topology transition, or state request should have one application-facing meaning even when the implementation differs by operating system or device availability.

#### Isolate platform mechanisms

Transport, discovery, persistence, native services, and hardware reachability are implementation concerns. They belong behind repositories or adapters with explicit contracts. This prevents platform checks from becoming scattered widget logic and allows a platform-specific failure to be diagnosed at the boundary that owns it.

#### Preserve one state model

Mutable feature state stays behind its repository or application owner and is exposed as immutable snapshots and streams. This keeps screen reconstruction, online/offline operation, and platform changes from creating competing state models.

#### Make lifecycle differences explicit

Connection, discovery, initialization, reconnection, and disposal may depend on the runtime. A lifecycle coordinator owns those transitions instead of allowing each platform-facing screen to invent its own rules. This is supporting infrastructure for cross-platform consistency, not the primary subject of the capability.

### Concrete before-and-after platform scenario

**Scenario:** The same module-control action is initiated from the shared Flutter feature on two supported operating-system paths, while one path has a different device or connectivity condition.

**Before the boundary was explicit:** Platform checks were spread through presentation and feature code. One path could update local state immediately while another waited for an external response; a device or service failure could also leak into widgets as a platform-specific branch. The code appeared shared, but the action no longer had one predictable meaning.

**After the boundary was explicit:** Shared application logic accepts the intent and delegates only the platform-dependent operation to the relevant adapter. Each implementation returns the contract’s defined success, unavailable, or failure state; the repository publishes the resulting state; and the BLoC renders the same product-level outcome. The internals can differ, but the platform difference is localized, testable, and visible to the application as a defined condition rather than an accidental UI behavior.

### Illustrative platform boundary

The following is **illustrative, generalized pseudocode**, not production code. It shows a shared contract with platform-specific implementations; it does not represent a confirmed SEPIA API or expose private platform details.

```dart
// Illustrative, generalized pseudocode.
abstract class PlatformModuleAdapter {
  Future<ControlResult> applyControl(ControlIntent intent);
}

class ModuleService {
  ModuleService(this.adapter);

  final PlatformModuleAdapter adapter;

  Future<ControlResult> setControl(ControlIntent intent) {
    return adapter.applyControl(intent);
  }
}

final windowsService = ModuleService(WindowsModuleAdapter());
final macosService = ModuleService(MacosModuleAdapter());
final iosService = ModuleService(IosModuleAdapter());
```

The shared service owns the application-facing operation. The platform adapters own only the mechanism required by their runtime. A real implementation would also define capability and failure results carefully; those details are intentionally omitted here.

### Cross-platform failure modes and tradeoffs

- **Platform behavior drift:** Separate adapters can return different meanings for the same intent. Shared contract tests and explicit result semantics make divergence visible.
- **Capability differences:** A platform may not expose the same device or service capability. The contract should represent unavailable or unsupported conditions rather than hiding them in UI conditionals.
- **State divergence:** Platform adapters may maintain local state differently. Repository-owned state and immutable updates keep the product state model shared.
- **Lifecycle differences:** Initialization and cleanup may follow different operating-system rules. Those differences belong in platform boundaries and lifecycle owners, not in feature widgets.
- **Over-abstraction:** A broad abstraction can hide meaningful platform constraints. Contracts should cover stable product behavior while allowing platform-specific capability information to remain explicit.

The tradeoff is deliberate indirection. Shared contracts and adapters require mapping and capability handling, but they make reuse meaningful: product behavior remains centralized while platform-specific mechanisms remain replaceable and reviewable. The goal is not to erase platform differences; it is to prevent those differences from multiplying feature logic.

### Testing strategy and evidence for parity

Testing should prove both shared behavior and legitimate platform variation:

- **Shared domain tests** verify state transitions, validation, and feature meaning without operating-system dependencies.
- **Contract tests** run equivalent intent/result scenarios against online, offline, and platform-specific implementations where those implementations exist.
- **Adapter tests** isolate Windows, macOS, and iOS service or device boundaries with deterministic mocks, fakes, and fallback paths.
- **Application tests** verify that BLoCs and repositories translate adapter results into the same UI-facing state model.
- **Selected platform workflows** validate behavior that cannot be proven by shared tests alone, especially native integration and runtime lifecycle behavior.

This makes a failure attributable to shared behavior, a platform adapter, or a legitimate capability difference instead of reporting only that “the app failed on one platform.”

### Reusable cross-platform method

For a new cross-platform feature, the method is:

1. List the supported operating systems and devices, including meaningful capability differences.
2. Separate shared product behavior from platform-specific mechanisms.
3. Define a small application-facing contract with explicit success, unavailable, and failure outcomes.
4. Keep platform selection and native integration behind adapters or composition boundaries.
5. Keep state ownership shared and expose platform results through one application state model.
6. Run equivalent contract scenarios before adding platform-specific UI behavior.

This is the transferable competency: use platform variation to clarify boundaries, not to multiply feature implementations.

### Linked stories

- [Device Lifecycle Management](../stories-content-dossier/device-lifecycle-management.md)
- [Architecture Modernization — SEPIA](../stories-content-dossier/architecture-modernization.md)

### Confidentiality note

Unverified deployment breadth and proprietary implementation details are not included.
