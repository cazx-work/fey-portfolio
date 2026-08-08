# Portfolio Story Flow

## Core narrative

The portfolio should tell one story: **a hardware-connected application was made understandable, resilient, testable, and responsive by establishing explicit boundaries between user intent, domain state, protocol communication, and runtime resources.**

## If someone spends 3 minutes

Show only the highest-signal path:

1. **Product context:** professional audio control application with dynamic hardware and signal routing.
2. **Three achievement cards:** typed AES70 SDK, recovery-aware configuration recall, and layered testing/BDD platform.
3. **One architecture diagram:** UI intent → repository/state boundary → domain transformations → protocol/device lifecycle.
4. **One signature workflow:** Grid layout becomes validated matrix state and survives a hardware/configuration change.
5. **One ownership statement:** designed boundaries, validated behavior, and improved how the team tests and operates the system.

Avoid class names, full test inventories, generic technology lists, and long screenshot galleries.

## If someone spends 10 minutes

Use the following path:

1. Read the overview and technical scope.
2. Inspect repository ownership, state retention, and lifecycle coordination.
3. Follow the Grid → matrix conversion → configuration recall story.
4. Open the AES70 SDK command lifecycle.
5. Review the testing architecture and BDD extension model.
6. Watch the short performance or reconnect workflow video.
7. Read the tradeoff cards and future improvements.

At this depth, expose representative evidence: online/offline repository parity, identity-based matching, validation before mutation, origin-aware ganging, deterministic test seams, and explicit cleanup.

## Senior engineer path

Follow the system from boundary to boundary:

1. **Ownership:** What state is durable? Who can mutate it? Who owns cleanup?
2. **Lifecycle:** How are discovery, initialization, reconnect, failure, and disposal ordered?
3. **Domain model:** How are layouts, matrices, split/stereo semantics, and configuration identity represented?
4. **Protocol boundary:** How do typed commands become encoded messages and validated results?
5. **Consistency:** How are asynchronous updates, feedback loops, and topology changes handled?
6. **Verification:** Which layer proves each invariant, and how does BDD cover cross-boundary behavior?
7. **Tradeoffs:** What complexity was intentionally accepted, and what would be improved next?

The senior engineer should be able to inspect deep links and `Read more` evidence without interrupting the main narrative.

## Recruiter path

Use a short, outcome-oriented route:

1. Overview and product context.
2. Top 3 achievements.
3. Contributions and ownership matrix.
4. Testing and developer enablement.
5. One workflow video and one architecture diagram.
6. Lessons learned.

Emphasize scope, judgment, collaboration, reliability, and leverage. Keep protocol vocabulary explained in plain language.

## Recommended ordering of evidence

- First: architecture and outcomes.
- Second: one difficult domain workflow.
- Third: testing and operational leverage.
- Fourth: performance and visual evidence.
- Last: detailed implementation references.

## Story rules

- Every feature begins with a constraint and ends with an outcome.
- Merge duplicate source documents into a single canonical narrative.
- Show failure handling because it distinguishes engineering from feature assembly.
- Label individual contribution precisely, especially where work was collaborative or Copilot-assisted.
- Prefer “decision → tradeoff → evidence” over feature-description paragraphs.
