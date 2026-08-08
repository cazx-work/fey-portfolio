# Portfolio Navigation

## Curated navigation hierarchy

```text
Sepia Client — Engineering Case Study
├── Overview
│   ├── Product Vision
│   ├── Technical Scope
│   └── Engineering Highlights
├── System Architecture
│   ├── Ownership and State
│   │   ├── Repository Ownership
│   │   └── State Retention and Lifecycle
│   ├── Device and Protocol Platform
│   │   ├── AES70 SDK
│   │   └── Device Lifecycle Management
│   └── Signal-Path Domain
│       ├── Grid Layout Engine
│       ├── Matrix Conversion Engine
│       └── Configuration Recall
├── Engineering Challenges
│   ├── Dynamic Hardware and Recovery
│   ├── Complex Routing and Composition
│   ├── Multi-Module Synchronization
│   └── UI Responsiveness at Scale
├── Quality and Developer Experience
│   ├── Application Testing Architecture
│   ├── BDD Integration Platform
│   ├── Structured KeyService
│   └── Linux Test Environment Automation
├── Performance
│   ├── Rive Rendering Boundaries
│   ├── State and Rebuild Optimization
│   └── Interaction Coordination
├── Contributions and Ownership
│   ├── Architecture Decisions
│   ├── Testing Strategy
│   ├── Performance Engineering
│   └── Developer Enablement
├── Media
│   ├── Architecture Diagrams
│   ├── Workflow Videos
│   ├── State and Data Visualizations
│   └── Before-and-After Comparisons
└── Lessons and Tradeoffs
    ├── Design Tradeoffs
    ├── What I Would Improve
    └── Transferable Engineering Lessons
```

## Navigation rationale

- **Overview comes first** so recruiters can understand the product and engineering scope before encountering implementation detail.
- **System Architecture is the primary path** because repository ownership, lifecycle coordination, protocol abstraction, and signal-path transformation form the strongest technical narrative.
- **Related documents are merged conceptually rather than duplicated.** Repository Ownership, State Retention, and Device Lifecycle should appear as one ownership/lifecycle story with links to deeper evidence.
- **Grid, Matrix Conversion, Configuration Recall, and Ganging belong to the signal-path domain** because together they show how user intent becomes validated hardware state.
- **Testing and Developer Experience are grouped** to show quality engineering as part of architecture, not as an afterthought.
- **Performance is separate but short.** It should support the architecture story with measured constraints and before/after evidence rather than become a generic Flutter optimization page.
- **Contributions makes ownership explicit.** Each item should state the decision made, the problem owned, and the resulting improvement.
- **Media is evidence, not the main narrative.** Diagrams and recordings should be attached to the relevant sections and indexed here for visitors who prefer visual exploration.
- **Lessons and Tradeoffs closes the case study** with senior-level reflection rather than a generic conclusion.

## Hidden detail policy

Use `Read more` for implementation-level evidence: file paths, class names, edge-case inventories, exact test tags, and detailed API mechanics. Keep architectural decisions, constraints, outcomes, and representative examples visible in the first view of each section.
