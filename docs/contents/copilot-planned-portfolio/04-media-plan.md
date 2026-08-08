# Portfolio Media Plan

## Media principles

Use media to prove engineering decisions. Each artifact should answer one question, show one workflow, or clarify one boundary. Avoid decorative screenshots and avoid recording long sessions without a narrated objective.

## 1. AES70 SDK and protocol boundary

### Recording Needed
Record a typed device operation from application intent through command encoding, transport, response correlation, status validation, and domain result. Show one successful command and one device-reported failure.

### Screenshots Needed
- Typed application-facing API versus raw protocol representation
- Protocol/domain layer architecture
- Response or notification mapping example

### Diagrams Needed
- Application → domain mapping → device capabilities → command pipeline → codec → transport → hardware
- Command lifecycle with correlation and error handling

### Best Presentation Format
**Diagram plus short animation.** The architecture is the point; animation makes the hidden command lifecycle understandable.

## 2. Device lifecycle and state retention

### Recording Needed
Show a device connecting, disappearing, being rediscovered or reconnected, and the UI retaining meaningful module context. Include shutdown/disposal if it can be demonstrated safely.

### Screenshots Needed
- Connected host/module state
- Offline or unconnectable state with recovery affordance
- State retained across a screen transition or reconnect

### Diagrams Needed
- Discovery/user action/reconnect timer into lifecycle coordinator
- Resource ownership map for repositories, listeners, timers, streams, and transport
- Durable state versus volatile connection state

### Best Presentation Format
**State-flow diagram plus narrated workflow video.** Lifecycle correctness is temporal and difficult to communicate with static screens alone.

## 3. Grid dynamic module layout

### Recording Needed
Record: add a module from the library; drag it between paths; place a dual-width or stereo module; move a split part; duplicate a module; create an invalid placement; correct it; save the valid composition.

### Screenshots Needed
- Empty matrix with explicit drop cells
- Standard module layout
- Dual-width/stereo representation
- Split module with semantic positions
- Validation feedback after an invalid drop

### Diagrams Needed
- Typed drag intent → BLoC → placement coordinator → path matrix → validated state
- Matrix occupancy showing nullable cells and multi-cell spans

### Best Presentation Format
**Interactive visualization plus a 60–90 second workflow video.** The layout rules are spatial and benefit from direct manipulation.

## 4. Matrix conversion engine

### Recording Needed
Record a visual path being converted into matrix connections, including one stereo or split case and one bus/side-chain dependency. Show the safe update sequence when routes change.

### Screenshots Needed
- Visual path representation
- Boolean matrix heatmap with source/sink labels
- Before/after route change
- Validation rejection for an invalid topology

### Diagrams Needed
- Domain path → matrix intermediate representation → object coordinates → validated protocol mutation
- Round-trip conversion from hardware matrix back to domain paths

### Best Presentation Format
**Animated data transformation and matrix heatmap.** This is algorithmic content, not primarily a UI showcase.

## 5. Configuration recall

### Recording Needed
Record: save a configuration; change host order or module placement; remove a module; load the snapshot; inspect severity-classified conflicts; resolve or partially clear affected paths; reconnect the missing device; revalidate without overwriting the original snapshot.

### Screenshots Needed
- Saved configuration overview
- Conflict matrix showing host, slot, serial, and path mismatches
- Safe resolved state with unavailable paths clearly handled
- Original snapshot versus resolved runtime state

### Diagrams Needed
- Canonical snapshot, matcher, conflict classifier, resolver, and revalidation loop
- Identity matching decision flow

### Best Presentation Format
**Narrated workflow video plus conflict visualization.** The key value is safe recovery under change.

## 6. Module ganging

### Recording Needed
Record: create a compatible group; add/remove a module; demonstrate absolute control; demonstrate relative control preserving offsets; disconnect a member; reconnect it; show that propagated updates do not create a feedback loop.

### Screenshots Needed
- Ungrouped modules with different values
- Absolute gang result
- Relative gang result with preserved offsets
- Multi-host membership view

### Diagrams Needed
- Direct user intent versus propagated update
- Absolute assignment versus delta-based propagation
- Group membership reconciliation across hosts

### Best Presentation Format
**Animation for value propagation plus a concise video.** The mathematical difference between absolute and relative control is easiest to see over time.

## 7. Testing architecture and BDD platform

### Recording Needed
Record: run a focused Gherkin feature; show feature selection; execute a scenario through reusable steps; show a failure localized to a step; run a unit/application test for the same behavior; show reporting.

### Screenshots Needed
- Test pyramid by architectural layer
- Gherkin scenario and corresponding step abstraction
- Feature-folder organization
- Focused test output/report

### Diagrams Needed
- Domain/application/infrastructure/widget/integration test layers
- Gherkin → selector → step registry → scenario world → application → report
- Regression workflow from defect to focused test

### Best Presentation Format
**Diagram plus terminal/report capture.** The value is the developer workflow and architecture, not a UI demo.

## 8. Structured KeyService

### Recording Needed
Record one dynamic finder locating a path slot or port using a typed semantic key, then show the same identifier used by widget and integration tests.

### Screenshots Needed
- Hierarchical key registry
- Typed dynamic key example
- Key contract test result

### Diagrams Needed
- Widget → KeyService → KeyFinder → widget/integration tests

### Best Presentation Format
**Architecture card with a small before/after comparison.** Keep this supporting story concise.

## 9. Rive performance and interaction coordination

### Recording Needed
Record: multiple module panels visible; hover a control; drag a control while scrolling is available; change artboard or meter state; reorder or zoom the dashboard; repeat with several panels.

### Screenshots Needed
- Multiple animated panels at representative scale
- Before/after rebuild scope or frame-timing evidence
- Interaction mode state during a drag
- Nested scroll layout

### Diagrams Needed
- Dashboard/path/module/Rive controller/repository boundaries
- High-frequency controller updates versus structural Flutter rebuilds

### Best Presentation Format
**Before/after performance visualization plus a short interaction video.** Performance claims need evidence, not only visual polish.

## 10. Linux test environment automation

### Recording Needed
Record: bootstrap or validate the environment; launch host and module test doubles; show preset and override selection; inspect tracked processes; stop the environment; demonstrate graceful cleanup and repeatability.

### Screenshots Needed
- Terminal startup summary
- Preset configuration with sensitive values removed
- Process ownership/tracking output
- Cleanup result with no stale services

### Diagrams Needed
- Bootstrap → run → tracked runtime → stop lifecycle
- Process-group ownership and shutdown escalation

### Best Presentation Format
**Short terminal recording and lifecycle diagram.** This is operational engineering and should not be presented as a product UI feature.

## Recording standards

- Keep flagship workflow videos between 45 and 120 seconds.
- Narrate the constraint and the engineering decision, not every click.
- Show a failure or recovery path where it demonstrates the design.
- Blur credentials, device identifiers, private network details, and commercial data.
- Caption each artifact with the specific engineering point it proves.
