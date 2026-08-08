# BDD Integration Testing Framework

## Navigation

- Challenges
  - Gherkin-to-UI Translation
  - Connected Test State
  - Reusable Step Design
- Architecture
  - Feature Discovery
  - Step Composition
  - Scenario World
  - SDK-Like Test Infrastructure
- Contributions
  - Workflow Coverage
  - Regression Prevention
  - Developer Experience

## Portfolio Card

**Title:** BDD Integration Testing Framework

**Summary:** A reusable Gherkin-based integration testing system that turns complex application workflows into readable, repeatable, and maintainable executable specifications.

**Skills:** BDD • Flutter Integration Testing • Test Architecture

**Key Achievement:** Created a scalable test framework that allowed new workflows to be added consistently without rebuilding the runner or test infrastructure.

## Summary

The framework combines human-readable Gherkin scenarios with reusable Dart step definitions, shared scenario state, stable UI finders, feature selection, and structured reporting. It provides a consistent path from describing a workflow to executing it against the connected application.

## Problem

End-to-end workflows crossed multiple screens, state transitions, device-facing concepts, and asynchronous UI updates. Without a shared structure, new tests could become duplicated scripts that were difficult to read, slow to diagnose, and expensive to extend. The team needed regression coverage that remained approachable to both product and engineering stakeholders.

## Solution

Designed a Gherkin-driven runner that discovers feature files, selects the relevant step definitions, creates isolated scenario state, and executes each feature with consistent setup, timeouts, reporting, and cleanup. Scenarios describe user intent while Dart steps encapsulate interaction details through reusable finders and helpers.

Organized steps by feature area and application/domain responsibility. Shared contracts, common helpers, scenario-scoped models, and stable key-based lookup utilities keep new workflows composable. Command-line feature selection and coverage-oriented reporting support focused development runs without changing the test source.

## Outcome

New workflows can be added by composing existing phrases or introducing one focused, registered step. The framework improves regression protection across Grid, dashboard, module, panel, gang, and snapshot behavior while keeping scenarios readable and failures easier to localize. It also establishes a repeatable testing interface similar to an SDK: stable concepts, discoverable capabilities, and consistent extension points.

## Key Challenges

### Translating Product Behavior into Executable Specifications

Complex UI workflows needed to remain understandable without exposing widget implementation details.

**Solution:** Expressed intent in Gherkin and kept interaction mechanics inside concrete, reusable step definitions.

### Coordinating Asynchronous Connected State

The application depends on changing UI state, connected hosts, module availability, and delayed rendering.

**Solution:** Added scenario setup steps, shared world state, bounded wait helpers, and explicit compatibility expectations instead of relying on fixed sleeps.

### Preventing Step Ambiguity

As the step catalog grew, generic patterns could match unintended phrases.

**Solution:** Selected steps from the feature content and ranked matching patterns by specificity and parameter shape.

### Reusing Behavior Across Feature Areas

Copying interaction logic into every scenario would make the suite difficult to evolve.

**Solution:** Separated feature files, concrete step classes, shared helpers, domain vocabulary, finders, and runner infrastructure into clear extension boundaries.

### Running Large Suites Efficiently

Developers needed focused feedback without losing the ability to execute the complete feature set.

**Solution:** Supported path, filename, directory, substring, and multi-feature selectors while retaining full-suite fallback behavior.

## Architecture Highlights

### Gherkin as the Public Test Interface

Feature files capture workflows in a product-readable language and provide executable acceptance criteria.

**Tradeoff:** Some low-level details are intentionally hidden, so step definitions must make the abstraction reliable.

### Dynamic Step Selection

The runner discovers feature files and supplies only the step definitions relevant to each feature.

**Tradeoff:** Matching logic adds infrastructure complexity, but reduces unnecessary setup and makes undefined or ambiguous steps easier to identify.

### Scenario-Scoped World

A shared world carries the tester, selected host context, module references, labels, controllers, and feature-specific interaction state.

**Tradeoff:** Shared state must be carefully reset between scenarios, but it avoids brittle global state and enables multi-step workflows.

### Stable Finder and Helper Layer

Key-based finders and reusable wait utilities isolate UI lookup and synchronization from scenario language.

**Tradeoff:** The application must maintain stable semantic keys, but tests become less coupled to visible text and layout changes.

### SDK-Like Extension Model

New capabilities follow a predictable contract: add a feature specification, implement a focused step when needed, register it, and reuse the shared infrastructure.

**Tradeoff:** Registration and naming conventions require discipline, but make the test system discoverable and scalable.

## Senior Engineering Signals

- Designed an extensible BDD architecture instead of isolated end-to-end scripts.
- Established a clear contract between product-readable scenarios and implementation-level steps.
- Created reusable abstractions for synchronization, lookup, state, and reporting.
- Reduced test coupling to widget text and layout through semantic finders.
- Made feature execution selectable for faster development feedback.
- Protected complex connected workflows with regression-oriented scenarios.
- Encapsulated scenario state to keep multi-step behavior coherent and isolated.
- Treated test infrastructure as a developer-facing platform with stable extension points.

## Interview Talking Point

### What made this difficult?

The workflows were asynchronous, connected, and stateful, but the scenarios needed to remain simple and readable. The framework had to hide implementation details without hiding the real behavioral complexity.

### Why was this solution chosen?

BDD provided a durable language for acceptance behavior, while Dart step classes and shared helpers supplied the precision required to interact with a Flutter application. This separated intent from mechanics and made additions repeatable.

### What tradeoffs existed?

The framework introduces conventions for step naming, registration, stable keys, and scenario cleanup. That upfront discipline is offset by less duplication, easier review, focused execution, and more consistent regression coverage.

### What would you improve?

I would add stronger visual reporting for step-to-definition coverage, improve host and capability discovery, and make parallel or isolated feature execution more explicit for larger suites.

## Media Suggestions

- Gherkin scenario to step-definition architecture diagram
- Short workflow video showing a scenario executing against the application
- Before/after comparison of duplicated scripts versus reusable steps
- Feature-selection and reporting workflow
- Test coverage map organized by product area

## Diagram

```text
Gherkin Feature
      |
      v
Feature Selector
      |
      v
Step Definition Registry
      |
      v
Reusable Steps + Finders + Wait Helpers
      |
      v
Scenario World
      |
      v
Connected Flutter Application
      |
      v
Reports and Regression Signals
```

## Portfolio Callout

> Built a BDD test platform that made complex connected workflows readable, composable, and efficient to extend.

## Evidence Map

- `integration_test/features/` — Gherkin specifications organized by product workflow.
- `integration_test/test.dart` — runner initialization, feature discovery, selection, scenario execution, reporting, and cleanup.
- `integration_test/steps.dart` — central registration point for step-definition modules.
- `integration_test/steps/` — feature-first application steps, shared helpers, and test-domain vocabulary.
- `integration_test/support/sepia_world.dart` — scenario-scoped state shared across steps.
- `integration_test/support/helpers/gherkin_feature_runner_utils.dart` — feature selection, scenario-outline expansion, parameter handling, and step matching.
- `integration_test/support/finders/` — stable, reusable widget lookup abstractions.
- `integration_test/README_DEVS.md` and `integration_test/README_USERS.md` — developer and authoring guidance for extending the framework.
