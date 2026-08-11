# SEPIA — Portfolio Content Dossier

This is the editorial source for the SEPIA mini-site and its full case study. It is organized into two presentation layers: an executive view for fast scanning and a technical deep dive for engineering readers.

## Publication status

- **Source basis:** `docs/contents/journals/*.md` and approved answers in `docs/content-questions.md`
- **Public posture:** high-level architecture and responsibilities only
- **Code posture:** illustrative or redacted code may be added after review; production source is not published by default
- **Media posture:** photos, videos, and diagrams are planned evidence slots and require approval before publication

# Executive content

## Title

SEPIA

## One-line positioning

A modular true-analog audio platform with a digital control plane. Authentic hardware circuitry stays in compact modules while software handles control, routing, automation, and recall. This case study focuses on making that boundary reliable as the system changes in real time.

## Product narrative

SEPIA by Karno is a modular hardware platform for live sound, studio recording, and theatrical production. It bridges the character of real analog circuitry with the control, recall, and flexibility of a modern digital workflow. Instead of emulating transformers, valves, optical elements, FETs, and other classic circuits in DSP, SEPIA houses authentic analog signal paths inside compact modules.

The system separates digital control from the audio path through a Host-and-Module architecture. Hosts such as the SEPIA L6 provide power, I/O, network connectivity, and a digitally controlled analog routing matrix. Modules are compact, knobless cartridges containing analog processing or preamp circuitry. The host can reorder stages, create inserts, and route signals without introducing A/D-D/A conversion into the analog path.

Parameters and presets are controlled through the AEQUOREA Engine, desktop and mobile interfaces, DAW integrations, and professional control protocols such as OSC, EUCON, MIDI, and HUI. This gives operators total recall and automation while preserving the sound and zero-latency behavior of analog hardware.

## The problem

Professional audio hardware is powerful but asynchronous. Devices can appear, disappear, reconnect with a different topology, or expose concepts that do not map directly to the interface. A control product must preserve the operator's intent while preventing stale or unsafe operations.

## Engineering contribution

The contribution covered the boundaries that made the product reliable:

- Designed and evolved typed application-facing abstractions over device communication.
- Worked on device lifecycle ownership, reconnect behavior, state retention, and cleanup.
- Modeled configuration recall and conflict-aware recovery when hardware changed.
- Connected visual signal-path composition to deterministic routing operations.
- Built or improved layered testing, BDD workflows, semantic UI identity, and hardware-free development paths.
- Localized interaction and animation state so complex dashboards remained understandable and responsive.

The public case study should use neutral, contribution-led language when describing the engineering work, investigation, and decisions. Use neutral system language when explaining architecture or outcomes. Use “contributed” where the work was collaborative; reserve “owned” for responsibilities confirmed for a particular release or area.

## Engineering outcomes

- Protocol complexity stayed behind a smaller, typed boundary instead of spreading across features.
- Durable user intent remained distinct from volatile runtime and hardware state.
- Recovery behavior could explain mismatches instead of silently applying an unsafe approximation.
- Lifecycle and resource cleanup had explicit ownership.
- Routing and control transformations were modeled as testable domain operations.
- Engineers could exercise important workflows with deterministic seams and hardware-free environments.

## Proof plan

The strongest showcase should combine:

1. A short product walkthrough showing the control surface and a representative workflow.
2. A conceptual architecture diagram from UI intent to native integration and hardware systems.
3. A before/after explanation of a boundary, not proprietary source code.
4. A testing or recovery walkthrough demonstrating how the system behaves when conditions change.

# Technical deep dive

## Architecture at a glance

```text
Flutter UI and feature state
          |
          v
Domain rules and durable application state
          |
          +--> Configuration recall and recovery
          |
          +--> Signal-path and routing model
          |
          v
Dart integration boundary
          |
          v
Native integration and device communication
          |
          v
Audio and hardware systems
```

The exact native library names, private APIs, message schemas, device identifiers, source paths, and commands remain outside the public case study.

## Hardware communication platform

A typed SDK boundary translated complex device communication into APIs that application features could use without knowing binary layouts, object identifiers, parameter encoding, response status details, or notification formats.

### Key design decisions

- Separate transport and connection lifecycle ownership from communication modeling.
- Centralize framing, serialization, response correlation, status validation, and typed decoding.
- Model shared and specialized device capabilities consistently.
- Map communication models into application-friendly domain objects at an explicit boundary.
- Inject transport behavior so codec, response, notification, and capability tests can run deterministically.

### Tradeoffs

The design required more explicit models and mapping code than direct byte manipulation. That cost bought clearer ownership, stronger type safety, discoverability, test isolation, and safer extension of device capabilities.

## Device lifecycle and state ownership

Discovery, initialization, reconnect, duplicate-work prevention, failure tracking, repository ownership, and disposal were treated as lifecycle concerns rather than screen concerns. Durable application state and volatile online state had separate responsibilities, allowing the interface to retain useful context while hardware conditions changed.

## Configuration recall

A saved configuration was treated as an original user-intent snapshot, not as a mutable copy of current runtime state. Identity and topology matching classified differences, exposed conflicts, and resolved only what was safe to restore. The original snapshot remained available for later revalidation.

## Visual routing and module composition

The visual editor represented user intent through modules, paths, buses, and control relationships. The hardware-facing representation required deterministic matrix operations. Composition, validation, conversion, and feedback were kept explicit so a visual action could be checked before it became an external operation.

## Synchronized control groups

Grouped controls required a distinction between user intent and echoed device updates. Absolute and relative synchronization, dynamic membership, multiple connected hosts, persisted metadata, and feedback-loop avoidance were treated as domain behavior rather than incidental widget behavior.

## Testing and developer enablement

The testing strategy combined unit, application, widget, integration, BDD, controlled stream, mock/fake, semantic identity, and Linux hardware-test-double techniques. The purpose was not merely more tests; it was to create repeatable seams around asynchronous state, protocol behavior, recovery, routing, and lifecycle cleanup.

## Illustrative code policy

Public examples may show a simplified interface or pseudocode such as a typed command boundary. Examples must be labeled illustrative and must not reproduce production schemas, proprietary commands, internal class names, credentials, hostnames, or private source paths.

## Media slots

- **Photo:** approved product or desk/system photograph; caption must identify what is safe to show.
- **Video:** short redacted workflow recording; remove customer data, private URLs, identifiers, and unreleased UI.
- **Diagram:** conceptual architecture or lifecycle flow using generalized labels.
- **Code:** illustrative Dart/C++ boundary or redacted test seam, subject to review.

## Interview prompts

- Why should transport ownership remain outside the SDK?
- How do you preserve user intent when the device topology changes?
- Which lifecycle races are prevented by explicit coordination?
- How do you validate a visual routing conversion before hardware mutation?
- What makes a hardware-free test environment useful rather than merely fake?
