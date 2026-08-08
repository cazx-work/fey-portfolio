# Configuration Recall System

## Navigation

Challenges
└─ Configuration Recall System

Architecture
├─ JSON Persistence
├─ Configuration Modeling
├─ Host Matching
├─ Conflict Resolution
└─ State Synchronization

Contributions
├─ Architecture
├─ Validation and Recovery
├─ Dynamic Hardware Handling
└─ Testability

## Portfolio Card

**Title:** Configuration Recall System

**Summary:** A resilient snapshot workflow for saving and restoring complex configurations across changing hardware environments.

**Skills:** State modeling • JSON persistence • Conflict resolution

**Key Achievement:** Designed a recovery-oriented restoration pipeline that preserves saved intent while safely adapting to the devices currently available.

## Content

### Title

Configuration Recall System

### Summary

A file-backed configuration recall workflow that serializes the current system into a structured snapshot, validates it against the live hardware topology, and restores only when device and module relationships can be resolved safely.

### Problem

Users needed to preserve a working hardware configuration and return to it later, but the environment was dynamic: hosts could be missing, modules could be replaced, and devices could move between slots. A simple file import could silently apply the wrong state or leave paths referencing unavailable components. Recall therefore required persistence, identity matching, validation, and explicit recovery behavior.

### Solution

The feature models a configuration as a snapshot composed of hosts, paths, ports, buses, modules, control groups, and optional routing data. Models provide JSON serialization and tolerant parsing for supported legacy shapes, allowing snapshots to be saved as portable files and loaded from automatic or user-selected sources.

Restoration runs through a staged pipeline. The current system is converted to the same snapshot representation, saved hosts are matched to live hosts using module identity overlap, and conflicts are classified by severity. Slot-level checks compare module identity, serial identity, placement, and availability. When a selected module is absent, affected paths can be cleared and related stereo relationships handled rather than applying invalid references. The original snapshot remains separate from its resolved presentation, so changing hardware can trigger re-evaluation without losing the user's saved configuration.

### Outcome

The system makes configuration recall safer in a hardware environment that cannot be assumed to remain stable. Users receive actionable conflict feedback instead of silent corruption, while the separation between persisted intent and resolved state supports repeatable revalidation as devices appear, disappear, or change.

## Key Challenges

### Dynamic Host Identity

Saved host order and live host order could differ, making positional matching unreliable.

**Solution:** Matched hosts using module-identity overlap and produced an alignment that represents unmatched live hosts explicitly.

### Device Mismatch

A slot could contain a different module, the same model with a different serial, or a module moved to another slot.

**Solution:** Compared stable module identity, serial identity, and slot placement separately, then classified each mismatch with an appropriate conflict severity.

### Missing Devices and Paths

A saved configuration could reference modules that were no longer present in the current system.

**Solution:** Blocked high-risk restorations and used targeted path clearing for unavailable modules, including related stereo-path handling.

### Preserving Saved Intent

Conflict resolution could otherwise overwrite the persisted configuration with a temporary adaptation.

**Solution:** Kept original snapshots separate from resolved snapshots and recomputed the resolved state when the live module repository changed.

### Robust File Recovery

Files could be malformed, canceled during selection, duplicated, or expressed in older JSON layouts.

**Solution:** Added guarded parsing, duplicate-name checks, user-facing failure prompts, and compatibility handling for multiple supported JSON representations.

## Architecture Highlights

### Canonical Snapshot Model

Hosts and their configuration are represented in a domain model shared by persistence, comparison, and restoration.

**Tradeoff:** The model is more detailed than a UI-only representation, but it makes validation deterministic and keeps serialization boundaries explicit.

### Separate Original and Resolved State

Persisted configuration remains immutable while a derived version reflects the current hardware.

**Tradeoff:** State management is more involved, but revalidation becomes safe and repeatable.

### Identity-Based Host Matching

Hosts are aligned by meaningful module overlap rather than relying only on list position.

**Tradeoff:** Matching requires a scoring and assignment step, but it tolerates reordered and partially changed systems.

### Severity-Aware Conflict Resolution

Conflicts distinguish recoverable differences from conditions that make restoration unsafe.

**Tradeoff:** The user interface must communicate more states, but the system avoids treating every mismatch as an all-or-nothing failure.

### Repository-Driven Revalidation

Changes in the live module repository trigger conflict recalculation.

**Tradeoff:** The feature performs additional resolution work, but saved configurations stay synchronized with a changing environment.

## Senior Engineering Signals

- Designed a portable JSON persistence boundary for complex nested state
- Separated persisted intent from runtime-resolved state
- Established explicit identity and ownership rules for dynamic hardware
- Added severity-based validation instead of silent best-effort mutation
- Built recovery paths for missing devices and invalid references
- Preserved compatibility with multiple input JSON shapes
- Revalidated saved state as the live system changed
- Encapsulated conflict detection behind focused domain and application services

## Interview Talking Point

### What made this difficult?

The difficult part was not writing a file; it was restoring a meaningful configuration when the hardware topology could change between save and restore. Host ordering, slot placement, serial identity, missing modules, and dependent paths all had to be evaluated without corrupting the original saved intent.

### Why was this solution chosen?

A canonical snapshot model allowed persistence and live state to be compared using the same structure. Separating original and resolved snapshots made the workflow reversible and allowed conflicts to be recalculated whenever the current hardware changed.

### What tradeoffs existed?

The design introduces richer models, matching logic, conflict states, and additional revalidation work. That complexity is deliberate: it favors explicit user feedback and safe recovery over a simpler restore operation that could silently apply an invalid configuration.

### What would you improve?

I would expand schema versioning and migration, add stronger structural validation before model construction, and make conflict resolution policies more configurable so teams can choose between blocking, partial restore, and guided repair for different configuration types.

## Media Suggestions

- Architecture diagram showing saved state, resolver, live system, and recovery paths
- Before/after comparison of a configuration restored with missing or reordered devices
- Short workflow video covering save, load, conflict review, and revalidation
- State flow diagram for original snapshot versus resolved snapshot
- Interactive conflict matrix for host, slot, serial, and path mismatches

## Diagram

```text
Current System ──┐
                 ├─> Canonical Snapshot Model ─> JSON File
Saved Snapshot ──┘              │
                                ▼
                         Host and Module Matcher
                                │
                                ▼
                         Conflict Classification
                         ┌──────┴──────┐
                         │             │
                   Safe Resolution   Recovery / Feedback
                         │             │
                         └──────┬──────┘
                                ▼
                         Resolved Runtime State
                                │
                                └─< Revalidate when hardware changes
```

## Portfolio Callout

> Designed a recovery-oriented state restoration pipeline that preserves saved configuration intent while adapting safely to changing hardware.
