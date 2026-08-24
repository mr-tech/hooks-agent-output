# probe-cr20 — held planner item 7, re-derived at `4e9da96`

**Built at**: `4e9da96` (website, `chain/013-components-v2-editing-surfaces`). Every function under test
is the **real** one (imported), so this reads the tree.

**Built for one changed question** (per the instrument-validity rule, this is NOT a re-run of
`probe-cr9`, which was built for the *old* ordering at `ee3bc3e`): does the delivered M4 — with **M4-b**
built (`describeUnsupportedComponentTypes`) — discharge item 7's substance?

```bash
cd /usr/local/bin/hooks/agent-output/verification/013/probe-cr20-item7-discharge
npx vitest run --config vitest.cr20.config.ts     # 10/10 at 4e9da96
```

## Item 7 (round 9, `probe-cr9` 24/24 at `ee3bc3e`)

The disposition is computed on the **post-`z.preprocess`** object, so `filterSupportedComponents`
deletes a V2 component before `resolveContentLoss` sees it → **row E flips to a settled row** (M8-E
"nothing lands until you choose" bypassed) **and the notice named only the flag**. Silent-flip class
from the cr9 child sweep: `[2,3,4,11,17]`. Recorded remedy: **M4-b under D18/D9** — "drop them, *say what
was dropped*" — then undelivered at round 9.

## What cr20 establishes

| block | claim | result |
|---|---|---|
| CR20-A | **DISCHARGE.** Every silent-flip member — top-level (Select Menu, Text Input, User Select) and container-child (Button, Thumbnail, Select Menu) — is **NAMED** by `describeUnsupportedComponentTypes` and stripped from the parse. The container-child case names the child even though the container vanishes whole. | 6/6 |
| CR20-B | The **flip still happens** (structural fact, unchanged: the disposition runs on the filtered object) but is now the **D9 drop-with-disclosure** outcome — a Thumbnail-only container flips away from E AND names "Thumbnail". | 1/1 |
| CR20-C | **RESIDUAL.** A container **empty as pasted** (`{type:17, components:[]}`) flips silently — `describeUnsupportedComponentTypes = []`. It carries no renderable content, so the residual loses nothing visible, but the mechanism technically survives for this degenerate input. | 1/1 |
| CR20-D | **CONTROL.** A **supported** V2 container (`{type:17,[TextDisplay]}`) correctly **HOLDS** row E — `requiresChoice` stays true, the choice IS offered, nothing dropped. Distinguishes correct-hold from the residual flip. | 1/1 |
| CR20-E | The naming shares the filter recursion (`filterTopLevelComponent`), so disclosure cannot drift from the drop: ActionRow non-link button and Section unsupported accessory are both named. | 1/1 |

## Determination

**Item 7's substance is DISCHARGED by the delivered M4-b** for the enumerated silent-flip class:
`describeUnsupportedComponentTypes` shares `filterSupportedComponents`' exact recursion and threads a
`dropped` Set that accumulates a label at **every** drop point, so every type the filter removes is
named, on both paste surfaces (`NewMessageJsonInput` and `JsonModalBody`) via the "Not carried: …"
notice. The row-E→settled flip still occurs but is now D9's prescribed drop-with-disclosure, not the
round-9 silent loss.

**One narrow residual** (CR20-C): a top-level container empty as pasted is dropped whole with no named
type and still flips silently. Degenerate (no visible content lost); the mechanism survives for it only.
A far narrower observation than item 7's original class — surfaced for the held queue, not a reopening.

## Blind spots — stated at authoring time

- Tests the module-level functions, not the mounted surfaces; that both surfaces render the notice is
  established by reading (`describeUnsupportedComponentTypes` called on raw components + a
  `droppedComponentTypes.length > 0` banner in each) — routed to QA's mount check, not asserted here.
- Does not vary nesting beyond one container level, nor multiple unsupported components at once (the
  shared recursion makes drift unlikely, but it is not swept exhaustively here).
- The residual's reachability assumes a user can paste `components:[]` inside a container; not tested
  against an upstream producer that might never emit it.
