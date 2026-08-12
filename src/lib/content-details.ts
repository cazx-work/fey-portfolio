export type ContentDetail = {
  value: string;
  technical: string[];
  decisions: string[];
  evidence: string[];
  media: string[];
};

export const capabilityDetails: Record<string, ContentDetail> = {
  'native-hardware-integration': {
    value:
      'Turn specialized external systems into predictable application capabilities.',
    technical: [
      'Separate transport and lifecycle ownership from communication modeling.',
      'Centralize framing, response correlation, validation, and typed decoding.',
      'Map communication models into application-friendly domain objects.',
    ],
    decisions: [
      'Prefer a typed boundary over protocol knowledge distributed through features.',
      'Inject transport behavior so protocol and capability tests remain deterministic.',
    ],
    evidence: [
      'AES70/OCA SDK architecture',
      'Capability-oriented device models',
      'Device lifecycle and protocol-to-domain mapping',
    ],
    media: [
      'Conceptual command lifecycle diagram',
      'Illustrative API boundary',
      'Redacted response or codec test',
    ],
  },
  'cross-platform-architecture': {
    value:
      'Preserve one coherent product experience across different runtimes and operating conditions.',
    technical: [
      'Use feature and domain boundaries to isolate platform constraints.',
      'Keep online and offline implementations behind application-facing contracts.',
      'Use repository-owned state and streams to make transitions explicit.',
    ],
    decisions: [
      'Treat cross-platform architecture as behavior preservation, not only code sharing.',
      'Make platform-specific concerns visible and testable.',
    ],
    evidence: [
      'Flutter application architecture',
      'Online/offline parity',
      'State retention and repository ownership',
    ],
    media: ['Platform responsibility map', 'State flow diagram'],
  },
  'enterprise-full-stack': {
    value:
      'Work across application, backend, data, and delivery boundaries where the product requires it.',
    technical: [
      'Present additional web, backend, data, and delivery technologies only when tied to a verified project.',
      'Connect modernization decisions to maintainability and delivery rather than technology novelty.',
    ],
    decisions: [
      'Keep claims associated with the project where they were verified.',
      'Do not imply full-system ownership without corroborating evidence.',
    ],
    evidence: [
      'Project-specific journal material when approved',
      'Architecture and delivery decision records',
    ],
    media: ['Redacted system boundary diagram'],
  },
  'platform-reliability': {
    value:
      'Make complex systems safer to change and easier for teams to understand.',
    technical: [
      'Combine layered tests, BDD, semantic UI contracts, controlled fakes, and Linux hardware test doubles.',
      'Create deterministic seams around asynchronous state and external systems.',
    ],
    decisions: [
      'Optimize for repeatable evidence rather than an arbitrary coverage number.',
      'Test at the boundary where behavior becomes difficult to reproduce.',
    ],
    evidence: [
      'Application testing architecture',
      'Gherkin workflows',
      'Linux test environment automation',
    ],
    media: ['Test pyramid or workflow visualization', 'Redacted BDD example'],
  },
  'software-modernization': {
    value:
      'Improve maintainability by making ownership and change boundaries clearer.',
    technical: [
      'Introduce feature-first and domain-oriented boundaries incrementally.',
      'Separate repository ownership, state retention, UI composition, and domain rules.',
    ],
    decisions: [
      'Protect existing behavior with focused seams instead of speculative rewrites.',
      'Measure structural change by change safety and testability.',
    ],
    evidence: [
      'Feature-first architecture',
      'Repository ownership',
      'State retention journals',
    ],
    media: ['Before/after responsibility map'],
  },
  'state-recovery-resilience': {
    value:
      'Protect user intent when connectivity, topology, or external resources change.',
    technical: [
      'Keep durable snapshots separate from resolved runtime state.',
      'Use identity matching, conflict classification, partial recovery, and revalidation.',
    ],
    decisions: [
      'Treat recovery as product behavior, not an infrastructure afterthought.',
      'Prefer explicit conflict feedback over silent best-effort restoration.',
    ],
    evidence: [
      'Configuration recall',
      'Reconnect behavior',
      'Conflict-aware recovery',
    ],
    media: ['Save/change/recover walkthrough', 'Recovery state diagram'],
  },
  'visual-systems-domain-modeling': {
    value: 'Translate rich interactions into safe, deterministic operations.',
    technical: [
      'Model heterogeneous footprints, stereo/split semantics, buses, paths, and derived constraints.',
      'Convert visual/domain state into validated matrix operations.',
    ],
    decisions: [
      'Keep composition, conversion, validation, and feedback explicit.',
      'Treat gestures as domain intent before external mutation.',
    ],
    evidence: ['Dynamic module layout', 'Matrix conversion', 'Module ganging'],
    media: ['Conceptual routing diagram', 'Annotated interaction recording'],
  },
  'interaction-performance': {
    value:
      'Keep rich dashboards responsive by making update ownership deliberate.',
    technical: [
      'Localize animation state and controller synchronization.',
      'Separate drag/navigation from scrolling and panel composition.',
      'Clean up controllers and subscriptions explicitly.',
    ],
    decisions: [
      'Reduce update scope through ownership boundaries.',
      'Avoid unsupported numerical performance claims.',
    ],
    evidence: [
      'Rive interaction architecture',
      'Selective rebuild boundaries',
      'Lifecycle cleanup',
    ],
    media: ['Redacted screen recording', 'Update-boundary diagram'],
  },
};

export const storyDetails: Record<string, ContentDetail> = {
  'hardware-communication-platform':
    capabilityDetails['native-hardware-integration'],
  'configuration-recovery': capabilityDetails['state-recovery-resilience'],
  'testing-as-platform': capabilityDetails['platform-reliability'],
  'device-lifecycle-and-state-ownership': {
    value:
      'Give discovery, reconnect, cancellation, and disposal a clear owner.',
    technical: [
      'Coordinate discovery and manual connection.',
      'Guard duplicate work and ordered cleanup.',
      'Keep durable state available across online/offline implementations.',
    ],
    decisions: [
      'Do not make screens learn connection policy.',
      'Keep lifecycle and resource ownership explicit.',
    ],
    evidence: [
      'Lifecycle coordinator',
      'Repository contracts',
      'Disconnect/reconnect behavior',
    ],
    media: ['Ownership diagram', 'Cleanup test or redacted recording'],
  },
  'visual-routing-to-safe-operations':
    capabilityDetails['visual-systems-domain-modeling'],
  'sepia-architecture-modernization':
    capabilityDetails['software-modernization'],
  'responsive-dashboard-interactions':
    capabilityDetails['interaction-performance'],
};
