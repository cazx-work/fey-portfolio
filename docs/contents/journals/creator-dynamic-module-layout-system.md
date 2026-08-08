# Grid — Dynamic Module Layout System

## Navigation

- **Challenges**
  - Dynamic composition
  - Multi-cell modules
  - Validation and synchronization
- **Architecture**
  - Matrix representation
  - Drag-and-drop state flow
  - Ownership boundaries
- **Contributions**
  - Layout engine
  - Constraint handling
  - Predictable UI state

## Portfolio Card

**Title:** Grid Dynamic Module Layout System
**Summary:** A matrix-based editor for composing heterogeneous modules into validated signal paths.  
**Skills:** Flutter • BLoC state management • Domain modeling • Constraint handling  
**Key Achievement:** Built a layout engine that keeps complex module placement rules understandable and synchronized across the editor and runtime-facing data.

## Content

## Grid — Dynamic Module Layout System

### Summary

The Grid is a visual matrix editor for arranging modules into ordered paths. It represents paths as columns and module positions as rows, while supporting single-width, dual-width, split, duplicated, and empty cells. The system translates drag interactions into validated domain updates rather than treating the grid as a collection of independent widgets.

### Problem

Users need to compose signal paths from multiple module types whose physical and logical footprints are not uniform. A stereo or dual-width module may span adjacent path columns; split modules may occupy separate positions; duplicated instances must remain distinguishable; and empty placeholders must remain valid drop targets. Every edit also needs to preserve ordering, host compatibility, path metadata, and a predictable UI representation.

### Solution

The layout was modeled around immutable path values containing ordered, nullable module slots. This matrix-like representation makes empty capacity explicit and allows the UI to render a consistent rectangular editor even when paths have different content. A dedicated drag object carries the source path, source slot, and split-part context into the Grid BLoC. A serialized event pipeline then delegates placement, movement, copying, stereo handling, and host synchronization to focused application helpers.

The presentation layer derives tile dimensions from module capabilities: standard modules occupy one cell, while dual-width modules occupy two. Stereo filtering prevents the second visual representation from being rendered twice. Validation runs from the current Grid paths and checks ordering, input-slot compatibility, host consistency, and split-part placement constraints. State updates then flow back through the Grid state so the grid is rebuilt from one workflow-level source of truth.

### Outcome

The editor can represent complex compositions without encoding layout rules directly into individual widgets. Explicit empty cells, split-part coordinates, and dual-width behavior make drag operations and persistence more deterministic. Centralized event sequencing reduces race conditions, while validation gives users immediate feedback before an invalid composition reaches downstream operations.

## Key Challenges

### Heterogeneous Module Footprints

Modules do not share one visual or logical width, so a simple one-cell-per-module grid could not represent the full composition.

**Solution:** Derived staggered-grid spans from module capabilities and filtered paired visual representations so dual-width modules occupy the intended matrix space once.

### Stereo and Dual-Width Placement

A stereo module can affect adjacent paths and requires coordination between its primary and secondary representation.

**Solution:** Tracked module identity, slot position, and stereo state explicitly while aligning related paths and creating placeholder capacity when required.

### Split Module Semantics

A split module is not merely a smaller module; its left and right parts have separate placement constraints and coordinates.

**Solution:** Modeled split parts as domain data with Grid, path, and slot indices, then validated first/last-position rules and updated split metadata during synchronization.

### Drag-and-Drop State Transitions

A drag can originate from a library placeholder, an existing cell, a second stereo slot, or a split part, each with different movement semantics.

**Solution:** Encapsulated drag context in a typed drag object and processed accepted drops as serialized Grid events handled by a dedicated placement coordinator.

### Layout and Runtime Synchronization

The visible matrix must remain aligned with host-facing path data, module state, labels, and output-port details after every edit.

**Solution:** Applied placement changes through feature-owned application helpers, synchronized affected host data, recalculated path details, and revalidated the resulting layout.

## Architecture Highlights

### Explicit Matrix Representation

Paths contain ordered nullable slots rather than only non-empty modules. This preserves cell positions, empty drop targets, and alignment across paths.

**Tradeoff:** The model carries placeholder values and requires careful normalization, but it makes rendering, persistence, and placement calculations substantially more predictable.

### Capability-Driven Rendering

The grid derives a tile span from module capabilities such as stereo or dual-width behavior instead of hard-coding one layout for every module.

**Tradeoff:** The renderer must understand a small amount of domain capability, but new module forms can be introduced without rewriting the whole grid.

### Serialized Application Events

Grid operations are processed sequentially through the BLoC, with focused handlers for drag placement, path removal, stereo transitions, snapshots, and synchronization.

**Tradeoff:** Operations are less concurrent, but deterministic ordering prevents overlapping edits from producing contradictory layouts.

### Domain-Level Split Coordinates

Split parts retain their semantic side and current Grid/path/slot coordinates.

**Tradeoff:** Coordinates need maintenance after reordering, but constraints remain inspectable and validation does not depend on widget positions.

### Derived Validation

Validation is recalculated from the current path matrix and module state after updates.

**Tradeoff:** Revalidation adds work after mutations, but avoids stale error state and keeps user feedback tied to the actual composition.

## Senior Engineering Signals

- Designed a domain representation for a non-uniform visual matrix.
- Converted ambiguous drag gestures into typed, intent-rich events.
- Isolated placement orchestration from presentational widgets.
- Handled multi-cell, stereo, split, and duplicated module cases.
- Preserved empty capacity as meaningful layout data.
- Added constraint validation at the composition boundary.
- Sequenced state transitions to reduce synchronization races.
- Maintained compatibility between editor state and host-facing projections.

## Interview Talking Point

### What made this difficult?

The challenge was not rendering a grid; it was preserving the meaning of a layout when modules have different widths, paired identities, split parts, and host constraints. A single drag could change multiple paths and derived metadata, so the operation needed transactional sequencing and explicit context.

### Why was this solution chosen?

A nullable matrix representation exposes occupancy and alignment directly, while BLoC events provide a stable boundary for user intent. This combination lets the UI remain mostly declarative and keeps placement rules testable outside the widget tree.

### What tradeoffs existed?

The model is more explicit than a flat list and therefore requires placeholder management, index maintenance, and synchronization steps. That complexity is intentional: it makes edge cases visible and gives validation enough information to explain invalid compositions.

### What would you improve?

I would further separate Grid-owned placement facts from module-owned intrinsic state, then expose read-only projections to other consumers. I would also formalize layout constraints as pure domain rules so placement and validation can share the same rule engine and receive broader property-based coverage.

## Media Suggestions

- Interactive workflow video showing a module moving across paths.
- Architecture diagram of drag intent through BLoC, layout handlers, and synchronized path data.
- Before/after comparison of a standard module versus a dual-width module.
- State-flow animation for split-module placement and validation.
- Matrix visualization showing nullable cells, paired stereo positions, and occupied spans.

## Diagram

```text
Drag Source
    ↓
Typed Drag Intent
    ↓
Grid BLoC
    ↓
Placement Coordinator
    ↓
Path Matrix + Constraints
    ↓
Validated Grid State
    ↓
Grid Projection / Runtime Projection
```

## Portfolio Callout

> Designed a constraint-aware layout engine that turns complex module composition rules into predictable, editable matrix state.
