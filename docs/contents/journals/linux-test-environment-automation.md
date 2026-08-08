# Linux Test Environment Automation

## Navigation

- Challenges
  - Hardware-Free Development
  - Process Lifecycle Coordination
  - Reproducible Environment Setup
- Architecture
  - Environment Bootstrap
  - Service Orchestration
  - Tracked Process Ownership
  - Configuration Presets
- Contributions
  - Developer Productivity
  - Reliability
  - Linux Systems Automation

## Portfolio Card

**Title:** Linux Test Environment Automation

**Summary:** A Linux-based automation workflow that replaced unavailable physical hardware with reliable test doubles and repeatable developer environments.

**Skills:** Bash • Linux Systems • Process Orchestration

**Key Achievement:** Used GitHub Copilot to help turn a multi-process hardware test setup into a documented bootstrap, run, and cleanup workflow while validating the behavior against the team's testing needs.

## Summary

Created a scripted Linux environment for hardware-less development and testing. The workflow provisions the virtual machine, configures networking and dependencies, builds the required components, launches host and module test doubles, and reliably cleans up tracked processes afterward.

## Problem

Physical hardware was not consistently available for development and integration testing. Manual setup required networking changes, system packages, language tooling, service configuration, process startup, and module loading. Small differences between developer environments could produce misleading failures and make onboarding or troubleshooting unnecessarily slow.

## Solution

With GitHub Copilot's assistance, designed a three-stage shell workflow around explicit lifecycle boundaries. The bootstrap script prepares the Linux environment, validates prerequisites, configures a predictable network identity, installs dependencies, initializes the toolchain, and checks out the required source revision. The run script loads shared presets, accepts targeted overrides, builds when needed, starts the host and module test doubles as tracked process groups, and optionally starts supporting services. The stop script discovers recorded process metadata, performs graceful group shutdown, escalates only when necessary, removes generated runtime artifacts, and leaves the environment ready for the next run.

Although Bash and Linux systems programming were not my primary areas of expertise, I contributed the testing context, workflow requirements, scenario decisions, and validation needed to shape the automation. The scripts support both default repeatable usage and advanced scenarios through flags for host identity, module assignments, ports, logging, build behavior, and service selection.

## Outcome

The team gained a repeatable hardware-free test path with less manual setup and faster feedback. Copilot accelerated implementation and helped surface shell-oriented approaches, while I evaluated the workflow against the actual test environment and adjusted the requirements and behavior. Consistent process ownership and cleanup reduced stale-service failures, while presets and command-line overrides supported both standard workflows and focused investigations.

## Key Challenges

### Replacing Physical Hardware with Test Doubles

The development workflow needed to exercise connected behavior without depending on scarce or unavailable devices.

**Solution:** Encapsulated the host and module test doubles behind a repeatable Linux startup workflow with configurable images and slots.

### Coordinating Multiple Processes

The environment depended on a host, modules, supporting services, and logging processes starting in the correct relationship.

**Solution:** Started related commands as tracked jobs and recorded process metadata so the lifecycle could be managed as one environment.

### Making Setup Reproducible

Networking, system packages, language tooling, source revisions, and service configuration all affected whether the environment worked.

**Solution:** Centralized provisioning in an idempotent bootstrap script with prerequisite checks, explicit defaults, and optional build behavior.

### Cleaning Up Reliably

Interrupted sessions could leave processes, generated files, or stale state that affected later runs.

**Solution:** Implemented graceful process-group termination, bounded shutdown waiting, escalation to forced termination, and runtime artifact cleanup.

### Supporting Standard and Specialist Workflows

Developers needed a simple default path without losing control over ports, modules, logging, and build settings.

**Solution:** Combined a shared preset file with validated command-line overrides and explicit opt-out flags.

## Architecture Highlights

### Lifecycle-Oriented Scripts

Provisioning, execution, and teardown are separated into focused commands with clear responsibilities.

**Tradeoff:** Users must understand the lifecycle boundaries, but each stage is easier to reason about, rerun, and troubleshoot.

### Declarative Presets with Explicit Overrides

Common host, module, and runtime settings are stored in a preset while command-line arguments support targeted changes.

**Tradeoff:** Configuration precedence requires documentation, but it avoids duplicating environment-specific commands.

### Process-Group Ownership

Related services are launched with recorded identifiers and stopped as groups rather than through fragile name matching.

**Tradeoff:** Process bookkeeping adds implementation detail, but prevents orphaned services and improves cleanup reliability.

### Idempotent Environment Preparation

The bootstrap checks current state before changing networking, installing dependencies, or updating the toolchain.

**Tradeoff:** System-level setup requires elevated privileges, but rerunning the workflow is safer and more predictable.

### Capability Through Configuration

Module images, slots, ports, logging levels, and service participation can be changed without rewriting the orchestration logic.

**Tradeoff:** More options increase the surface area to validate, but the same automation supports a wider range of test scenarios.

## Senior Engineering Signals

- Used GitHub Copilot as an implementation partner for unfamiliar Bash and Linux systems details.
- Translated hardware-free testing needs into explicit provisioning, execution, and teardown boundaries.
- Reviewed and validated generated automation against the actual Linux test environment.
- Replaced a hardware dependency with a practical software-based test environment.
- Made multi-process orchestration reproducible through presets and validated overrides.
- Reduced stale state and orphaned process failures through tracked ownership.
- Captured operational setup knowledge as executable developer tooling.
- Built confidence in Bash, Linux process management, and environment automation through applied work.

## Interview Talking Point

### What made this difficult?

The test environment was not a single executable. It combined system configuration, network identity, compiled components, supporting services, module images, logging, and cleanup. I also had limited Bash and Linux systems experience, so the challenge was understanding the workflow well enough to guide Copilot, review its suggestions, and verify that the result matched the real testing needs.

### Why was this solution chosen?

Shell scripts were available on the target Linux environment and provided direct control over networking, privileges, processes, signals, and service startup. Copilot helped with implementation details, while the lifecycle separation made the workflow understandable and gave me clear boundaries for reviewing and validating the generated behavior.

### What tradeoffs existed?

The workflow depends on Linux-specific commands and requires careful privilege handling. Copilot-assisted implementation also required active review rather than blind acceptance, especially around signals, permissions, and cleanup. That limited portability, but the target environment benefited from direct systems control and fast local iteration.

### What would you improve?

I would deepen my Bash and Linux systems knowledge, then add structured machine-readable health checks, richer startup diagnostics, stronger validation of network and port availability, and automated lifecycle tests for partial startup or interrupted teardown.

## Media Suggestions

- Environment lifecycle diagram from bootstrap through teardown
- Short terminal recording showing one-command startup and cleanup
- Before/after comparison of manual hardware setup versus the test-double workflow
- Process ownership and shutdown sequence diagram
- Configuration matrix showing standard and specialized module scenarios

## Diagram

```text
Linux VM
   |
   v
Bootstrap
   |
   +--> Network + Dependencies + Toolchain
   |
   v
Run Orchestrator
   |
   +--> Host Test Double
   +--> Module Test Doubles
   +--> Supporting Services
   |
   v
Tracked Runtime State
   |
   v
Stop Orchestrator
   |
   +--> Graceful Group Shutdown
   +--> Forced Cleanup if Needed
   +--> Runtime Reset
```

## Portfolio Callout

> With GitHub Copilot's assistance, translated hardware-free testing requirements into a reproducible Linux environment and validated the workflow against real development needs.

## Evidence Map

- `shared-utm/scripts/bootstrap.sh` — Linux provisioning, network preparation, dependency installation, toolchain setup, source checkout, and optional build support.
- `shared-utm/scripts/run.sh` — preset loading, configurable build and launch orchestration, host and module startup, process tracking, and supporting service management.
- `shared-utm/scripts/stop.sh` — tracked process discovery, group-aware shutdown, escalation, generated artifact cleanup, and runtime reset.
- `shared-utm/scripts/preset.conf` — reusable defaults for the standard test-double environment.
