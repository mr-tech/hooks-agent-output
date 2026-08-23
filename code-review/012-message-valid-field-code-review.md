---
ID: 012
Origin: 012
UUID: 12a4fe3c
Parent: message-valid-field-for-statbot-2026-08-23.md
Reviewed-At: "Round 2: project-utils `749606d`; website `681c353` — both on `chain/012-message-valid-field`. Plus one uncommitted in-scope file (QA's R6 instrument, held untracked deliberately): `website/src/utils/__tests__/012-json-editor-repair-path.test.ts`, sha256 `cf2066a07e9e921ba224c7cf190b2fa6ff132c4435eedd5d418815f51260c5b7` — byte-identical to round 1, so R6's instrument is unmoved. Base SHAs: project-utils `eb38a15`, website `72dc7de`. Exclusion list: no other foreign or uncommitted file was present in either tree at review start or end (`git status --short` clean apart from that one untracked path). SHAs and the hash re-verified at review end, unmoved. Round 1 was conducted against website `bc5ee2b`; that verdict does not travel to this tree and was not inherited."
Status: In Review
---

# Code Review: Plan 012 — `valid` field on stored messages

**Plan Reference**: `agent-output/planning/012-message-valid-field.md` (rev 13, `3375d7c`)
**Implementation Reference**: `agent-output/implementation/012-message-valid-field-implementation.md` (`d6c1eda`)
**QA Reference**: `agent-output/qa/012-message-valid-field-qa.md` (Phase 1, rev 5c, `2fd03a5`)
**Critique Reference**: `agent-output/critiques/closed/012-message-valid-field-critique.md` (`f61938a`, Resolved)
**Implementer fix-round transcript**: `agent-output/verification/012/probe-fix-round-h1-h2/README.md` (`52b2c3c`)
**Date**: 2026-08-23
**Reviewer**: Code Reviewer

## Changelog

| Date | Agent Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-23 | steering-hooks-012 | Review chain 012's implementation before QA Phase 2; close the three assumptions the critique routed to this stage | REJECTED (round 1, website `bc5ee2b`, this document at `24b8af1`). Two HIGH findings, both in `backfillValid.ts`'s untested execution shell. The shipped backfill command could not execute at all — proven by driving it. All three routed assumptions closed. |
| 2026-08-23 | steering-hooks-012 | Re-review the fix round against website `681c353` | REJECTED. H1 **closed** — verified independently, including the second blocker the implementer found past my own probe's stopping point. M1 **closed structurally**. H2 **not closed**: three of four loss paths are gone, but the class survives on the *primary* path (H3, HIGH). One new MEDIUM on gate-evidence provenance (M1-r2), one MEDIUM correcting an overstated closure claim (M2), plus LOW/INFO. The remaining work is small. |

---

## Scope and Method

Files reviewed via `git show 681c353:<path>`, never from the working tree. Every count and sweep the
implementation document states was **re-run**, not accepted. Round 1's enumerations were re-run in
full and their predicates probed for blind spots, per the re-review rule — I did not re-check only
the flagged sites.

**Re-attack, not re-read.** Every finding this round touched an instrument or a guard (a module
loader, an error path, a report writer, a mutation dispatcher), so each was re-attacked from first
principles rather than read-and-agreed-with. Where the implementer's transcript states a result, I
reproduced it with my own instrument and my own controls before recording it as closed.

**Adversarial execution.** M6 is an irreversible mass write against the production dataset, which
triggers the mandatory drive-it-yourself rule. I did not run the backfill — no database was touched
— but I drove its shipped entry point twice with `DATABASE_URL` forced to a dead local port
(`127.0.0.1:1`), having re-confirmed at source that `getPostgres()` builds its pool lazily inside
the function (`project-utils/src/postgres.ts`).

**Captured instruments** (per `agent-output/verification/README.md`):

| Instrument | Path | Backs |
|---|---|---|
| Round 1 — alias-resolution probe, positive control | `agent-output/verification/012/probe-alias-resolution/` | H1 (round 1) |
| Round 1 — report-truncation probe, causation control | `agent-output/verification/012/probe-report-truncation/` | H2 (round 1) |
| Round 2 — H1 closure: 4 runs, 3 controls, 6 re-run enumerations | `agent-output/verification/012/probe-cr2-require-esm/` | H1 closure, E1–E5 |
| Round 2 — mode-switch dispatch differential, 5,000 cases, positive control | `agent-output/verification/012/probe-cr2-modeswitch-differential/` | `applyModeSwitch` behaviour preservation; M2 |
| Round 2 — `main()` throw-site disposition + executed `persistReport` premise | `agent-output/verification/012/probe-cr2-h3-persist-ordering/` | H3 |

**A probe artifact I created and removed, disclosed.** My dead-DB drive caused the shipped script to
write `agent-output/verification/012/backfill-report.md` — an all-zero, `interrupted: true` report
at the exact path the owner's R9 gate reads. I copied it to
`agent-output/verification/012/probe-cr2-require-esm/observed-interrupted-report.json` and deleted
the artifact from the gate's path. The implementer's fix round did the same thing for the same reason. That two agents
independently wrote a fake report to the gate's own filename inside one round is the evidence
behind finding M1-r2.

**On running the suite.** My definition reserves test authorship and execution to QA. I ran
`npm test` for one purpose — reproducing the counts the implementation document asserts (Core
Responsibility 6). No judgement of coverage adequacy is offered; that is QA Phase 2's.

**Blocked actions**: none. No permission control, classifier, or hook blocked anything this round.
One action was **declined by me, not blocked**: I did not drive `push-commands`
(`bot/scripts/publishAppCommands.ts`), because it PUTs application commands to Discord — an
outbound side effect no agent here may cause. Its behaviour under the newly added
`-r tsconfig-paths/register` is therefore unverified by execution; see Next Steps.

---

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md`
**Existence re-derived by this stage, not inherited from round 1**:
`ls -d /usr/local/bin/hooks/agent-output/architecture/system-architecture.md` → present, 20.2K,
resolved workspace-absolute.

**Alignment Status**: ALIGNED

- *Schema owned by project-utils; all access through its generated Kysely types and `getPostgres()`*
  — unchanged this round; the backfill still goes through the generated types and `getPostgres()`. ✅
- The new `src/constants/messageLimits.ts` is a **structural** improvement on the architecture's
  own terms: it separates env-coupled configuration from pure literals, which is what made the
  module loadable outside Next's runtime. It follows the pattern this chain already established at
  M3-a (`~/utils/limits` imported directly rather than through the `~/utils` barrel). ✅
- `export * from './messageLimits'` in `~/constants/index.ts` keeps every existing barrel consumer
  working, so the split is additive rather than a breaking rename. ✅

---

## Verification of the Fix Round's Claims

Each claim was attacked, not accepted.

### H1 — "closed by execution" → **CONFIRMED, and the second blocker is real**

Instrument: `agent-output/verification/012/probe-cr2-require-esm/`.

- **Shipped command verbatim** → exit 1, 3 × TS2345/TS2769 `'valid' does not exist`. The declared,
  pin-gated expected-RED state, unchanged by this round. Recorded explicitly as carrying **no**
  information about runtime resolution, so the next reader does not mistake it for a closure.
- **`--transpile-only`, simulating the post-pin-refresh state** → reaches
  `Error: connect ECONNREFUSED 127.0.0.1:1` at `async runBackfill (backfillValid.ts:132:19)`.
  Module resolution and the ESM load are both clear. **This is the verification round 1 demanded,
  and it passes.**
- **The second blocker, reproduced from first principles with two controls.** A throwaway subject
  importing `~/constants` throws `ERR_REQUIRE_ESM` from ts-node's *vendored*
  `dist-raw/node-internal-errors.js`. Control 1 (`~/constants/messageLimits`) loads clean —
  discriminating the barrel from alias resolution generally. Control 2 (`node -e
  "require('./src/env.mjs')"`) loads and reaches env.mjs's own zod validation — discriminating
  ts-node's loader from the installed Node v24.14.0, which *does* support `require(esm)`. The
  diagnosis is correct in both directions and the constants split is a justified fix, not churn.
- **Widened fix does not regress.** `-r tsconfig-paths/register` was added to all three ts-node
  entry points. A throwaway probe under `lang/` importing only relative and `node_modules`
  specifiers ran clean under the register.

**Credit where it is due**: the implementer drove past my own instrument's stopping point and found
a blocker I did not reach. My round-1 probe answered "does the alias resolve"; it was never valid
for "is the transitive graph loadable", and the transcript says so plainly rather than smoothing it
over. That is the discipline working.

### M1 (round 1) — "closed structurally" → **CONFIRMED**

`interface Category { count: number, rowIds: string[] }` with every breakout category typed as
`Category` makes an id-less category **unrepresentable** — the Preferred (structural) action, not
the Minimum. `flagStructureDisagreementValidTrue` is its own named category, and `accumulate`
populates it only when `flagStructureDisagreement && valid`. The four new spec cases in
`012-backfill-report.test.ts` use **literal** expected values, not values computed from the code
under test, so they can fail under the defect they name. Independence checked and satisfied.

### `applyModeSwitch` extraction — "behaviour-preserving" → **CONFIRMED BY EXECUTION**

A behaviour-preservation claim is not settled by reading a diff, and the shipped delegation tests do
not settle it either (see M2 below). Instrument:
`agent-output/verification/012/probe-cr2-modeswitch-differential/`. Two independently written
dispatchers — `bc5ee2b`'s inline `switchMode` branch and the shipped `applyModeSwitch` — run over a
seeded randomized corpus of 5,000 `(targetMode, draft)` pairs varying content (empty / text /
whitespace-only / long), embeds, 0–4 components across all eight type values, and flags across
`0`, `4`, `IS_COMPONENTS_V2_FLAG`, `IS_COMPONENTS_V2_FLAG | 4`:

    corpus=5000  subject_diffs=0  control_diffs=4947
    RESULT: equivalent, control live

The positive control (branch-inverted dispatcher) fired on 4,947 cases, so a differential that
found nothing was capable of finding something.

### Round-1 findings previously declined or deferred — re-read first, per the re-review rule

| Round-1 finding | Disposition claimed | Verified | Check that fails if the class returns |
|---|---|---|---|
| H1 — backfill cannot execute | closed | **Yes**, by my own drive | `probe-cr2-require-esm/` Run B; `no test` in the project suite — a module-resolution failure is invisible to vitest's own alias config |
| H2 — single-shot unreconstructible gate evidence | closed | **Partially** — 3 of 4 loss paths gone; see H3 | `012-backfill-report.test.ts` covers `formatReport`/`persistReport`; **no check covers `main`'s ordering** |
| M1 — `flagStructureDisagreement` lacks ids and a `valid === true` split | closed structurally | **Yes** | `012-backfill-report.test.ts`, 4 cases, independent fixtures |
| M2 — 2 of 3 extraction seams wired by reading | "partially closed" | **No** — see M2 below | `no test`; harness cannot render components |
| L1 — stale D11 comments | closed | **Yes** — both comment lines deleted at `switchMode` | `no test` (comment removal) |
| L2 — 2 × redundant `as boolean` | left at Minimum (bundle with pin refresh) | **Yes**, still 2 in route source | `no test` |
| L3 — `a7ebe4d` states 4/20 where the file has 36 tests | reconciled in the doc, commit message not rewritten | **Yes**, correct call — rewriting a pushed-adjacent commit message on a shared branch is worse than the discrepancy | `no test` |

No defect appeared this round in the half of any recommendation that was declined.

---

## TDD Compliance Check

The fix round adds four rows to the implementation document's TDD table (`applyModeSwitch`,
`emptyReport`/`accumulate`, `formatReport`, `persistReport`) — all "Yes / Yes", none claiming an
exemption, so there is no exemption claim to verify this round.

**Verified rather than accepted:**

- All four functions exist and are exported at `681c353`; the named expected failures
  (`applyModeSwitch is not a function`, `report.rowsClassifiedThisRun` undefined,
  `flagStructureDisagreementValidTrue` undefined, `formatReport`/`persistReport` not exported) are
  each mechanically what a pre-change tree would produce.
- **Independence checked.** `012-backfill-report.test.ts` uses literal fixtures throughout —
  independent, can fail under the defects it names. `012-message-mode.test.ts`'s two new cases are
  **not** independent: see L5.
- Suite reproduced: `npm test` → **21 files, 385 passed**, exactly as stated. Arithmetic checks
  against round 1 (20 files / 376 at `bc5ee2b`): +1 file, +9 tests = 7 new cases in
  `012-backfill-report.test.ts` plus 2 in `012-message-mode.test.ts`. ✅
- **Caveat on that figure, and it is not a nitpick**: the run includes QA's untracked
  `012-json-editor-repair-path.test.ts`. **21/385 is not reproducible from `681c353` alone.** The
  figure is correct for the tree as it stands; it is not correct for the committed tree.

---

## Findings

### Critical

None.

### High

#### H3 — the backfill's success path loses the whole run's gate evidence behind an unguarded `await`

**Location**: `website/src/scripts/backfillValid.ts`, `main()` — the statements between
`runBackfill`'s return and `persistReport`.

**Class**: a throw site that lies between the completion of an unrepeatable operation and the
persistence of that operation's only evidence, with no path that persists first. This is round 1's
H2 class, not a new one: *the M6-b report is single-shot, unregeneratable gate evidence with loss
paths*. Three members were eliminated; two survive, and they are on the **primary** path.

**Enumeration**: every throw site in `main()`, dispositioned in
`agent-output/verification/012/probe-cr2-h3-persist-ordering/README.md` — **7 sites, 5 safe, 2
lossy**. Predicate: manual control-flow walk of `main`'s body, which is 25 lines and fully visible.
What it does **not** cover: throw sites reached *inside* `runBackfill` (guarded by the `try`, so out
of the class) and any future `await` added to `main` — the walk is a point-in-time enumeration, not
a standing check, which is exactly why the structural action below matters more than the point fix.

The two surviving members:

- `const content = formatReport(report, { tableWideRowCount: await tableWideRowCount(database) });`
  — **unguarded**, and nothing has been persisted yet. The *identical* call is
  `.catch(() => -1)`-guarded three lines above on the error path. That asymmetry reads as an
  oversight rather than a decision.
- `persistReport(content, REPORT_PATH);` — precedes the `process.stdout.write` on the next line, so
  a throw here loses **both** evidence channels at once. `persistReport` throwing is not
  hypothetical: executed against the shipped export with a positive control →
  `EACCES: permission denied` on an unwritable target, control wrote clean.

`void main()` still carries no `.catch()`, so either loss surfaces as an unhandled rejection rather
than as a handled failure with a message naming what was lost.

**Why this is HIGH and not MEDIUM.** After either site fires, the evidence is unregeneratable by
anything that exists: the rows are already written non-NULL, so a re-run's `WHERE valid IS NULL`
selects nothing and the report reads `rowsClassifiedThisRun: 0`. The plan makes the owner's review
of this distribution **the** gate on the live declaration (M6-b, D6, Validation item 4), and R2's
falsifier is read from it. A late connection drop is not exotic here — the commit immediately
preceding this chain's base is literally *"fix: reuse Kysely singleton to prevent ECONNRESET"*, and
by the time the final `COUNT(*)` runs the connection has been in continuous use for the length of a
full-table walk.

**Magnitude**: this is an **unmeasured hypothesis** as to *frequency* — I did not measure how often
a connection drops at that point, and could not (no database). What is measured is that
`persistReport` can throw (executed, with control) and that the ordering permits total loss (read
from a 25-line function). The severity rests on consequence and unregeneratability, not on rate.

**Required Action — Preferred (structural)**: make the loss unrepresentable rather than guarded.
Persist and print the classification report **before** enriching it with anything that requires a
further database round-trip — the classification is complete the moment `runBackfill` returns, and
the table-wide count is a label on it, not part of it. Concretely: persist a report on both paths
from a single exit point (a `finally`, or a small `emit(report, meta)` called once), with the
stdout write ordered *before* the disk write so a failure of either still leaves one channel.
**Minimum**: `.catch(() => -1)` on the success-path `tableWideRowCount` to match the error path,
move `process.stdout.write` above `persistReport`, and attach `.catch()` to `void main()` so a
failure names what was lost.

**Risks row**: not a member of R2's class (R2 is about the *distribution*, not the instrument's
survival), but it is the same instrument R2's rev-13 prediction record judged *repaired before
first use*. That judgement holds for M1; it does not yet hold for H2's class, which is why this
round cannot confirm the instrument as repaired.

### Medium

#### M1-r2 — gate evidence is written to a fixed path with no provenance and no overwrite protection

**Location**: `website/src/scripts/backfillValid.ts`, `REPORT_PATH` and `persistReport`'s call
sites.

**Class**: an artifact that a human decision gates on, written to a constant filename with nothing
in it identifying which run produced it. Two consequences, both demonstrated this round rather than
imagined:

1. **Any drive overwrites the gate's file.** `REPORT_PATH` is
   `resolve(__dirname, '../../../agent-output/verification/012/backfill-report.md')` — a fixed path
   in a sibling documentation repo. Both the implementer's dead-DB drive and mine wrote an
   all-zero `interrupted: true` report to it. Both of us noticed and deleted it. The third time,
   nobody notices.
2. **A fake report is nearly indistinguishable from a real one.** The JSON carries no run id, no
   timestamp, no database identity, no start/end. An all-zero `interrupted: true` report differs
   from a real run against an empty table only by `tableWideRowCount`, and from a *successful*
   partial resume not at all except by comparing `rowsClassifiedThisRun` against
   `tableWideRowCount` — an invariant nothing states and nothing checks.

There is a third, quieter consequence: shipped application source now addresses the
process-documentation repo by relative path, non-overridable, with the plan number `012` baked in.
In any context where `__dirname` resolves elsewhere, `mkdirSync(…, { recursive: true })` will
silently create an `agent-output/verification/012/` tree wherever it lands.

**Enumeration**: `grep -c "REPORT_PATH" src/scripts/backfillValid.ts` → **3** (one definition, two
call sites); `grep -rc "agent-output" src --include=*.ts --include=*.tsx` → this is the only shipped
source file in `website/src` that names the documentation repo. The predicate cannot see a path
assembled from fragments or from an env var, and there are none.

**Required Action — Preferred (structural)**: take the destination out of the source. Accept the
report path from `argv`/env with a default that is *not* inside `agent-output`, and stamp the
report with provenance the reader can check — a run id, start and end timestamps passed in (not
`Date.now()` inside a resumable script), the database host, and an explicit
`coverage: "whole-table" | "remainder"` derived from `rowsClassifiedThisRun` vs
`tableWideRowCount`. The operator then redirects it into `agent-output/verification/012/` as a
named, dated artifact. **Minimum**: refuse to overwrite an existing report (write
`backfill-report-<runId>.md` and fail if it exists), so a rehearsal cannot silently replace the
gate's evidence.

**Magnitude**: measured only as *demonstrated occurrence* — two writes of a fake report to the
gate's filename in one review round, by two different agents. The probability that an owner reads a
stale one is an unmeasured hypothesis.

#### M2 — the `handleModeSwitch` wiring seam is **not** closed, and the record says it is

**Location**: `website/src/components/DiscordMessageEditor/index.tsx`, `handleModeSwitch` →
`switchMode`; `website/src/utils/__tests__/012-message-mode.test.ts`, the `applyModeSwitch`
describe block.

**Class**: a claim in the implementation record that an extraction seam is *tested* when what is
tested is the extracted function, not the wiring to it. Extraction moves the reading boundary; it
does not remove it.

The implementation document (Files Created table, and the changelog row) states `applyModeSwitch`
"clos[es] the M2 wiring seam for `handleModeSwitch`". It does not. The new spec's describe block is
titled *"the wiring `handleModeSwitch` dispatches through"*, and its two cases exercise
`applyModeSwitch` in isolation. Nothing establishes that `handleModeSwitch` calls it, or calls it
with the correct `targetMode`. If a future edit passes the wrong mode, or stops calling it, the
suite is silent — which is the same sentence round 1 wrote about this seam.

**Enumeration**: tests that render a component and drive `handleModeSwitch` → **0**. Predicate:
`grep -rc "@testing-library\|render("` over `src/**/*.test.ts` → 1 hit, and it is QA's untracked R6
instrument, not a component render of this editor. The predicate cannot see a hand-rolled renderer
that avoids both strings; I checked `vitest.config.ts` instead, which settles it structurally:
`environment: 'node'`, `include: ['src/**/*.test.ts']`, and no testing-library dependency in
`package.json`. (`*.test.tsx` files: **0** — nothing is being silently excluded by that `include`
today, but the pattern would exclude them if added.)

**This is why it does not hold the tree.** Closing the seam needs a DOM environment and a component
testing library — a test-infrastructure change, which is a plan-scope decision and not a fix
round's to make. The implementer's underlying judgement (extract, unit-test the data effect, accept
the wiring at Minimum) is the right call given the harness; my differential above confirms the data
effect is preserved by execution.

**Required Action — Preferred (structural)**: none this round. Route the harness question to the
planner (see Next Steps). **Minimum, and it is required**: correct the implementation document so
the record does not carry a closure that did not happen — the seam is accepted at Minimum, exactly
as its `upsertMessage` sibling is, and the describe block's title should say what it tests.

### Low / Info

#### L4 — the fix round left a review thread in a source file

**Location**: `website/src/scripts/__tests__/012-backfill-report.test.ts`, the file header comment
and the inline comment in the `flagStructureDisagreementValidTrue` case.

The header reads *"Plan 012 / M6-b, code-review fix round (H2, M1)"* and an inline comment reads
*"(M1's finding)"* — prose addressed to the review process, in the file, explaining the fix to the
reviewer. That explanation belongs in the round's document, which already carries it well. Per the
standing rule, a comment addressed to the review process is itself a finding.

**Enumeration**: `grep -rn "code-review\|reviewer\|M1's finding" src --include=*.test.ts` → **2**
lines, both in this file. The predicate cannot see a review reference phrased without those tokens
(e.g. "as requested in round 1"); I read the file in full and there are none.

**Not flagged, deliberately, for consistency**: the `TDD Gate: … Expected failures: …` header block
appears in all **6** of this plan's spec files, including the five I reviewed and accepted at round
1. It is a plan-wide convention, and reopening it now would be a moving target. If the owner wants
it gone, that is a plan-level decision, not a fix-round finding.

**Required Action (Minimum)**: delete the two review-referencing fragments. Leave the TDD Gate
header alone.

#### L5 — the `applyModeSwitch` cases are tautological as written

**Location**: `website/src/utils/__tests__/012-message-mode.test.ts`, the two new cases.

`expect(applyModeSwitch('v2', prev)).toEqual(switchToV2(prev))` computes its expected value by
calling the function the implementation delegates to, and `applyModeSwitch` *is* that call behind a
ternary. The assertion reduces to `switchToV2(prev) === switchToV2(prev)`. It cannot fail under any
defect in `switchToV2`/`switchToClassic`.

It is not worthless — it discriminates an inverted ternary, which is the one thing it names, and my
differential's positive control confirms an inverted dispatcher is detectable. But it should not be
read as covering the branch functions, and the describe block's title invites exactly that reading.

**Enumeration**: assertions in this plan's spec files whose expected value is produced by calling
production code → **2**, both here. Predicate: `grep -rn "toEqual(switch\|toBe(switch\|toEqual(validate\|toEqual(isMessageValid"` over `src/**/*.test.ts`. It cannot see an expected value bound to a
variable first (`const expected = switchToV2(prev)`); I read all six of this plan's spec files and
there are none.

**Required Action (Minimum)**: none required — this is QA Phase 2's call on coverage, and I am
flagging it as an independence observation, not demanding a rewrite. If it is rewritten, literal
expected objects (as `012-backfill-report.test.ts` uses throughout) are the fix.

#### L6 — the declared residual on `~/constants` is real but **mis-scoped in the record**

**Location**: `website/src/constants/index.ts`; the residual paragraph in
`agent-output/verification/012/probe-fix-round-h1-h2/README.md`.

The transcript declares the residual as *"a hypothetical future ts-node script needing an
env-**dependent** export of `~/constants` (e.g. `INVITE_URL`)"*. That framing understates it. The
class is *an **env-independent** constant reachable only through an env-importing barrel*, and the
split moved 11 of its members while leaving the rest behind the same `import { env } from
'~/env.mjs'`.

**Enumeration**: `git show 681c353:src/constants/index.ts | grep -c '^export'` → **30** export
lines, of which 1 is the `export *` re-export. Of the remaining 29, exactly **2** are genuinely
env- or url-coupled (`INVITE_URL`, `LOGO_IMAGE_URL` via `getBaseUrl()`) and 1 is browser-coupled but
node-safe (`IS_MOBILE`, guarded by `typeof window`). **26 env-independent exports remain trapped**
— including `MAX_EMBED_AUTHOR_NAME_LENGTH` and `MAX_EMBED_FOOTER_TEXT_LENGTH`, whose 256-limit
siblings *did* move, so the split line is drawn at "what `limits.tsx` imports" rather than at "what
is env-independent". The predicate counts `^export` lines and cannot see exports declared on a
later line of a multi-line statement or re-exported from a third module; I read the file and there
are none.

**Required Action — Preferred (structural)**: invert the barrel so the class becomes
unrepresentable — leave `INVITE_URL` and `LOGO_IMAGE_URL` as the only definitions in
`~/constants/index.ts` and move every env-independent constant beside `messageLimits.ts`, with
`export *` preserving the public surface. Then no ts-node script can reach a pure literal through
an ESM import. **Minimum**: keep the on-next-touch note but correct its wording, so the next reader
does not conclude only env-dependent exports are affected.

**Does not hold the tree.** No current consumer is broken and the fix round's own graph is clean.

#### INFO — lockfile movement is wider than the intended addition

`pnpm-lock.yaml` picked up two changes beyond adding `tsconfig-paths@4.2.0`: `eslint-plugin-import`'s
transitive `tsconfig-paths` moved `3.14.2 → 3.15.0` (the 3.14.2 entry is dropped entirely), and
`@pm2/pm2-version-check`'s `debug` moved `4.3.4 → 4.4.3`. Ordinary install-time dedupe, both
dev/tooling-only, neither reviewed by anyone. **The `project-utils` entry is untouched**, as
sequencing required — verified: the lockfile diff contains no `project-utils` hunk. Worth naming so
that if something breaks in lint or pm2 tooling, this is where to look first.

#### INFO — `npm run lint` is red at `681c353`, and was red before this chain

`npx eslint` over the eight changed files reports 7 errors and 3 warnings, **all** in
`src/utils/limits.tsx` at lines the chain never touched (member-delimiter-style and `max-len` at
lines 42/55/144, and `'validateEmbed' is defined but never used` at 106; the chain's hunks are the
import block and the two function bodies). Two test files fail to parse at all because
`tsconfig.json` does not include `__tests__` — so **this repo's spec files are not linted**,
pre-existing and not this chain's. Recorded for one reason: `npm run lint` cannot serve as a gate
for this round, and I confirmed the chain **added nothing** to the pre-existing count rather than
assuming it.

---

## Routed to Follow-Up, Not Held Against This Tree

#### F1 — `validateEmbed` is dead code, so `valid: true` does not check per-embed limits

**Owner of the question: the planner.** This is a D1 contract question, not a defect in this tree.

`src/utils/limits.tsx` defines `validateEmbed` (author name/url, title/url pairing, per-field
name and value limits) and **nothing calls it** — confirmed by enumeration:
`grep -rn "validateEmbed"` → 23 hits, every one either a *different* function whose name shares the
prefix (`validateEmbedCharacterCount`, `validateEmbedTitle`, `validateEmbedField`, …, called
directly by the per-field editor components for inline errors) or `validateEmbed`'s own definition
and body. `validateMessage` calls only `validateEmbedCharacterCount` (the 6,000-character
aggregate). So an embed whose title exceeds 256 characters, or whose field value exceeds 1,024,
passes `validateMessage`.

**Why it is not a finding against 012.** D1's truth condition is *"hooks.gg's existing composer
send-checks"*, and the send page's gate is literally `!validateMessage(message.data)`
(`src/app/message/m/[id]/send/page.tsx`, `isMessageValid`). The stored predicate is byte-for-byte
the send gate. The plan anticipated exactly this at M3-c: *"The predicate inherits `validateMessage`'s
own behaviour … This is parity, not a defect."* Parity holds, and it holds for a reason the owner
ratified.

**Why it is still worth routing.** Before 012 this gap only meant the send button was permissive.
After 012 it becomes a **persisted vouch that Statbot gates on**: `valid: true` will be stored for
records Discord would reject on embed limits. That is the same family as R5's whitespace class and
D14's bound — *a measured absence is not a Discord determination* — but it is a **different class**
with no instrument, because M6-b's distribution report is computed by the very predicate that misses
it, so the count would read zero regardless. It should be an explicit, recorded consequence of D1's
"parity" ruling rather than something discovered after the field is live.

---

## Positive Observations

- **The transcript records the confounded path rather than the tidy one.** The implementer's
  Step 1 states plainly that driving past my finding surfaced a second blocker, and says which
  stack frames distinguish it from my finding reproducing. That is what let me verify it in three
  legs instead of taking it on trust.
- **The M1 fix took the Preferred action, not the Minimum.** Typing the categories so an id-less
  one is unrepresentable eliminates the class rather than the instance. That is the right instinct
  and it is uncommon.
- **The constants split follows a pattern this chain already established** (M3-a) rather than
  inventing a new one, and the `export *` re-export means no consumer had to change.
- **`process.exitCode` throughout, `process.exit()` nowhere** — verified,
  `grep -c "process\.exit("` → **0**. The truncation mechanism round 1 measured cannot fire.
- **The atomic guard survives the rewrite.** `runBackfill` still writes
  `UPDATE … WHERE id = $1 AND valid IS NULL` with the guard *inside* the write. The rewrite around
  it did not quietly turn it into a check-then-write, which is the failure mode round 1's
  assumption 1 existed to catch.
- **R6's mechanism is untouched and its instrument is unmoved.** `useApiMethods.ts` is not in the
  diff (`git diff --stat` → 0 lines) and still spreads `...oldMessage, ...newMessage` wholesale;
  QA's R6 instrument is byte-identical to round 1 (same sha256). The brief's standing instruction —
  *treat any change in that direction as a defect regardless of how it is motivated* — had nothing
  to catch.
- **Plan rev 13's R2 prediction record is exemplary.** Judging the review's MEDIUM as an *instrument
  defect caught before first use* rather than as the falsifier firing is correct: no data exists
  until backfill, so no member of the class could have been observed. The row says so, and says why,
  and does not claim more.

---

## Verdict

**REJECTED**

Narrowly, and for one finding.

Round 1's two HIGH findings were both in `backfillValid.ts`'s untested execution shell. H1 is now
closed — properly, verified independently, and with a second blocker found past my own instrument's
stopping point. M1 is closed structurally. The mode-switch extraction is behaviour-preserving by
execution. Everything the fix round claimed, it did, and its record is honest about what it did not.

But H2's class is not eliminated. Three of its four loss paths are gone; the surviving two sit on
the **success** path — the path that will actually run — where the identical guard applied three
lines above on the error path is simply absent. After either fires, the owner's gate evidence is
unregeneratable by anything that exists, because the rows are already non-NULL. A HIGH finding is
not on the rounds-stop ladder, and reject authority is not either.

The remaining work is small: guard one `await`, swap two lines, attach one `.catch()`, and correct
one sentence in the implementation record. I would expect the next round to be short, and the
re-review shorter.

**Not grounds for rejection, stated so the next stage does not re-litigate them**: the RED typecheck
(pin-gated, verified unchanged in shape and origin), the un-driven `push-commands` entry point
(declined by me on the outbound-message prohibition, not blocked), the `upsertMessage` seam and the
two `as boolean` casts (both left at my own stated Minimum, correctly), and the `a7ebe4d` commit
message (reconciled in the document — the right call; rewriting a commit message on a shared branch
is worse than the discrepancy).

---

## Required Actions

**Before QA Phase 2 — blocking:**

1. **H3** — eliminate the loss class on the success path. Preferred: single exit point that persists
   and prints the classification report before any further database round-trip. Minimum:
   `.catch(() => -1)` on the success-path `tableWideRowCount`, `process.stdout.write` moved above
   `persistReport`, `.catch()` attached to `void main()`.
2. **M2 (Minimum)** — correct the implementation document: the `handleModeSwitch` seam is accepted
   at Minimum, not closed. Retitle the spec's describe block to what it tests.

**Strongly recommended, same round (cheap, and each closes a class rather than a site):**

3. **M1-r2** — parameterise the report destination and stamp the report with provenance and an
   explicit coverage label; at minimum, refuse to overwrite an existing report.
4. **L4** — delete the two review-referencing comment fragments from
   `012-backfill-report.test.ts`.
5. **L6** — correct the residual's wording in the fix-round transcript (26 env-independent exports
   remain trapped, not zero), or take the structural action and remove the residual entirely.

**On return**, this review re-runs against the new SHA. Per my definition I re-attack instrument and
guard fixes from first principles and re-run every enumeration myself, including breaking the
predicates. The H3 verification I will ask for: drive the shipped command against a dead
`DATABASE_URL` and show the report persisted **and** printed with the connection failure named — and
separately show that a failure of the report writer itself does not swallow the connection error.
Both are reachable with no database.

---

## Assumption Not Checked

**This review assumes the fix round's `pnpm install` produced a `node_modules` tree that matches
`pnpm-lock.yaml` at `681c353`, and does not test it.** Every execution result in this document —
the ECONNREFUSED drive, the ERR_REQUIRE_ESM subject and both its controls, the 5,000-case
differential, the `persistReport` EACCES probe, and the 21-file/385-test suite run — was produced
against the installed tree, not against a tree rebuilt from the lockfile. The lockfile moved two
transitive versions beyond the intended addition (INFO above), so "installed" and "locked" are not
obviously the same thing here.

**Falsity signature**: a clean `pnpm install --frozen-lockfile` in a fresh tree at `681c353`
produces a different `tsconfig-paths` resolution — or none — and `npm run backfill-valid` fails at
module resolution again on a machine that is not this one. The observable is the round-1 H1 error
text (`Cannot find module '~/server/api/utils/messageValidity'`) reappearing on a fresh checkout
after this round declared it closed.

**Owning stage**: **devops**, at the pin-refresh commit. That commit already has to run a clean
install to pick up the new `project-utils` pin, so the discriminating check costs nothing extra
there: `pnpm install --frozen-lockfile`, then drive `npm run backfill-valid` against a dead
`DATABASE_URL` and confirm it reaches `ECONNREFUSED` rather than a module-resolution error. I cannot
close it here — a clean reinstall would move `node_modules` under the other sessions working in this
shared tree, which is not mine to do.

---

## Next Steps

1. **implementer** — H3 (blocking), M2's record correction (blocking), then M1-r2, L4, L6.
2. **code-reviewer** (this stage) — re-review at the new SHA; re-attack H3's fix from first
   principles, re-run E1–E5 and break their predicates.
3. **qa** — Phase 2 once approved. Carries round 1's Assumption Not Checked unchanged (the eight
   TDD rows in `bc5ee2b` assumed red-before-green; falsity signature is any of the five new specs
   *passing* against `72dc7de`). Also carries M2: the `handleModeSwitch` and `upsertMessage` seams
   are both accepted at Minimum and neither has an instrument.
4. **planner** — two routed questions, neither holding this tree:
   - **F1**: record, as an explicit consequence of D1's parity ruling, that `valid: true` does not
     check per-embed field limits (`validateEmbed` is dead code), that this is the same family as
     R5/D14 but a **different class**, and that M6-b's report cannot measure it because the report
     is computed by the predicate that misses it.
   - **M2's harness question**: whether closing component-wiring seams is worth a DOM environment
     and a component testing library. Today `vitest.config.ts` is `environment: 'node'` with no
     testing-library dependency, so no wiring seam in this repo can be closed by a test.
5. **devops** — at the pin refresh, close this round's Assumption Not Checked with the
   `--frozen-lockfile` + dead-`DATABASE_URL` drive described above; also fold in L2's two
   `as boolean` casts, which round 1 left to that commit.
