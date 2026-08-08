# Portfolio v3 Evidence Plan

Each Tier 1 story should have one primary artifact and one supporting artifact. Captions should describe what the visitor should notice, not merely name the technology.

| Story | Primary artifact | Supporting artifact | Evidence to verify before publishing |
|---|---|---|---|
| Safe configuration recovery | Save → hardware change → conflict review → recovery recording | Original snapshot versus resolved runtime diagram | Identity types, conflict categories, recovery scenarios |
| Reliable device state | Disconnect → rediscover → reconnect recording | Lifecycle and resource ownership flow | Connect/disconnect/reconnect/disposal test coverage |
| Hardware communication platform | Intent → command → response → domain result trace | Protocol-to-domain mapping | Supported capability families and codec scenarios |
| Visual routing to safe hardware | Visual path → matrix update recording | Topology validation and mutation sequence | Footprint types, topology sizes, round-trip scenarios |
| Safer workflows | Focused BDD run and failure localization | Hardware-free bootstrap/run/cleanup capture | Test counts, execution times, reusable steps, setup time |
| Responsive controls | Representative interaction or profiling capture | Rebuild/update-scope diagram | Frame timing, rebuild counts, workload scale |

## Evidence rules

- Do not invent metrics.
- Prefer a qualitative before/after recording to an unsupported numerical claim.
- Generalize proprietary source code, internal APIs, infrastructure, and confidential business logic.
- Add a short caption stating the problem, behavior, and outcome visible in each artifact.
- Distinguish verified measurements from planned evidence collection.
