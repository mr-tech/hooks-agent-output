---
ID: 012
Origin: 012
UUID: 12a4fe3c
Parent: message-valid-field-for-statbot-2026-08-23.md
Reviewed-At: "Round 3: website `eb28ae6`, project-utils `749606d` — both on `chain/012-message-valid-field`; agent-output `db44632`. Plus one uncommitted in-scope file (QA's R6 instrument, held untracked deliberately): `website/src/utils/__tests__/012-json-editor-repair-path.test.ts`, sha256 `cf2066a07e9e921ba224c7cf190b2fa6ff132c4435eedd5d418815f51260c5b7` — byte-identical to rounds 1 and 2, so R6's instrument is unmoved across all three. Base SHAs: project-utils `eb38a15`, website `72dc7de`. Exclusion list: no other foreign or uncommitted file was present in either tree at review start or end (`git status --porcelain` clean apart from that one untracked path). SHAs and the hash re-verified at review end, unmoved. Rounds 1 and 2 were conducted against website `bc5ee2b` and `681c353`; neither verdict travels to this tree and neither was inherited — every enumeration below was re-run here."
Status: In Review
---

# Code Review: Plan 012 — `valid` field on stored messages

**Plan Reference**: `agent-output/planning/012-message-valid-field.md` (rev 14, `38d1f16`)
**Implementation Reference**: `agent-output/implementation/012-message-valid-field-implementation.md` (`7b7f582`)
**QA Reference**: `agent-output/qa/012-message-valid-field-qa.md` (Phase 1, rev 5c, `2fd03a5`)
**Round**: 3 (re-review after fix round 2). Rounds 1 (`24b8af1`) and 2 (`66ddcf6`) both REJECTED.
**Captured instruments**: `agent-output/verification/012/probe-cr3-h3-and-default-target/`

---

## Verdict: APPROVED_WITH_COMMENTS

**H3 is closed.** Both loss members are gone — one structurally, one shown by execution to cost
nothing. No HIGH or CRITICAL finding survives this round, and no finding below changes a decision
about the code that is about to run. Per the rounds-stop discipline, the remaining findings route
to their owning stages rather than holding the tree.

**One finding carries a timing constraint that must reach whoever performs the pin refresh.**
Finding M4: `npm run backfill-valid` defaults to the production database with no guard of any
kind, and the only thing preventing that today is the held stale pin — which the pin refresh
removes. M4 does not block this verdict; it blocks *unattended* invocation, and it arms at
precisely the next step in the sequence.

---

## Scope and Method

Reviewed `git show eb28ae6:<path>` and the working tree (verified identical). The fix round is
three files, +110/−22: `src/scripts/backfillValid.ts`, its spec, and one describe-block title in
`012-message-mode.test.ts`. `DiscordMessageEditor/index.tsx`, `useApiMethods.ts`, `limits.tsx`,
`shared.ts`, `messageMode.ts` and `package.json` are untouched this round — confirmed by
`git diff --stat 681c353 eb28ae6`, not assumed.

Because this round fixes an **instrument** (the gate-evidence path), my definition requires
re-attacking from first principles rather than reading the fix and agreeing. I did that: I formed
an independent hypothesis that the fix had *inverted* rather than eliminated the ordering hazard,
built a subject/positive-control/discriminating-control differential to test it, and **my
hypothesis was refuted by the evidence**. That refutation is recorded in full at
`verification/012/probe-cr3-h3-and-default-target/README.md` §2, because a reviewer's disproved
hypothesis is part of the record, not something to quietly drop.

Every enumeration below was re-run in this tree. Counts were taken with `grep -c`/`grep -rc` or by
writing output to a file and reading it — never by counting a filtered stream.

**Disclosure — I wrote into the owner's gate directory again.** Driving the shipped entry point
necessarily writes to `agent-output/verification/012/`, because `reportPath` is a fixed `resolve()`
with no override. My drive created `backfill-report-1787475923901-y27oe6.md`. I captured it as
`observed-leg1-report.json`, deleted it, and diffed the directory listing against a baseline taken
before the run — restored. This is the **third consecutive round** in which an agent has had to do
this. That recurring cost is finding L8.

---

## Confirmed Closed

### H3 — gate evidence on the success path — **CLOSED**

Round 2 named two loss members. Both are now disposed of, by different routes:

**Member 1, the asymmetric guard — closed structurally.** `main()` now has exactly one exit:
`emit(report, database, filePath, extra)`, called on both the success and interrupted paths.
`emit` applies `.catch(() => -1)` to `tableWideRowCount` unconditionally. The asymmetry is
genuinely unrepresentable, not patched — there is no longer a second path to be asymmetric with.
Verified by reading, and by enumeration: `grep -c "emit(" src/scripts/backfillValid.ts` → **2**
(one definition, one call site). `grep -rl "REPORT_PATH" src` → **0 files**; `grep -rl
"process\.exit(" src` → **0 files**, so round 1's H2 mechanism has not crept back.

**Member 2, the ordering — inverted, and the inversion costs nothing.** The fix moved the stdout
write *before* the disk write. My hypothesis was that this simply reverses the loss: a stdout
failure would now cost the durable copy, running round 1's H2 protection backwards. I tested it
with a 247KB payload (above the 64KB pipe buffer) against a pipe whose reader exits after one
byte, with the oracle on fd 2 so a failing stdout could not hide the answer:

| Run | stdout | report on disk |
|---|---|---|
| Positive control | healthy (a file) | yes, 247358 B |
| **Subject (shipped `emit`)** | **broken pipe** | **yes, 247358 B** |
| Discriminating control (persist-first) | broken pipe | yes, 247303 B |

**Refuted.** `process.stdout.write` to a pipe on Linux is asynchronous; EPIPE arrives as a later
`uncaughtException`, after `persistReport` has already run. The durable channel survives. H3 is
closed on both members.

**The verification I named for return at round 2, independently re-derived.** Round 2 said: *drive
the shipped command against a dead `DATABASE_URL` and show the report persisted **and** printed
with the connection failure named.* Done, with the oracle fixed before the run:

- Report printed to stdout: `tableWideRowCount: -1`, `interrupted: true`, plus provenance.
- Report persisted, and `diff` against stdout shows the two are **byte-identical**.
- `Error: connect ECONNREFUSED 127.0.0.1:1`, `errno: -111`, with the `runBackfill`/`main` frames —
  **named**, not swallowed. Exit 1.

Before running a script that issues `UPDATE`s I proved it could not reach a live database
(`env-guard.ts`); that gate is what surfaced finding M4.

### M1 — id-carrying categories — **CLOSED** (re-verified, not inherited)

`interface Category { count: number, rowIds: string[] }`, and all four breakout categories
including `flagStructureDisagreementValidTrue` are typed `Category`. An id-less category is
unrepresentable. Re-read at this SHA.

### M1-r2 — provenance and overwrite protection — **ADDRESSED at Minimum**

`persistReport` writes with `wx`; `reportPath(runId)` gives each run its own filename, so refusal
protects prior evidence instead of blocking the next run — the right resolution of the tension the
implementer identified. The provenance claim I checked by execution rather than by reading: the
persisted body carries `runId`, `startedAt`, `endedAt` with the sentinel values I supplied. **It
holds.** It holds by nothing checkable — see L7.

### M2 — the record correction — **SUBSTANTIVELY DONE, one instance missed** (see M5)

Outstanding Item 9 now states the corrected disposition accurately and at length: both seams
accepted at Minimum, not closed; the reason named (`vitest.config.ts` is `environment: 'node'`
with no component-testing-library, so no test in this repo *can* close a wiring seam); and the
narrower claim my round-2 differential actually established — behaviour preservation of the
extracted function — correctly distinguished from wiring closure. The spec's describe block is
retitled to *"the mode-switch dispatch function (does not cover `handleModeSwitch`'s wiring to
it)"*, which is honest. This is a good correction. One stale instance survives elsewhere: M5.

### L4 — review-thread comments — **CLOSED**, and I broke my own predicate

The two fragments are gone. I re-ran the sweep and then deliberately widened the predicate beyond
the phrasing of the flagged instances (`code[- ]review|code-reviewer|H[0-9]\)|M[0-9]-r?[0-9]?\)|
review round|fix round`). Remaining hits in the round's file are `it`/`describe` **titles** naming
plan and finding ids — the project's established convention (`M6-b`, `D11`, `H2`), consumed as
test names, not prose addressed to a human reader. Those stay.

The widened predicate did surface one member my round-2 enumeration would have missed, in a file
outside this round: INFO-2 below. My round-2 predicate was scoped to the implementer's new spec;
that was too narrow, and the blind spot was mine.

### L6 — the declared residual — **CORRECTED, and the figure independently re-derived**

Outstanding Item 10 now states the class correctly: any env-independent constant reachable only
through the env-importing barrel, not merely the env-coupled ones. I re-derived the arithmetic
myself rather than accept it: `grep -c '^export' src/constants/index.ts` → **30**; the barrel still
carries `import { env } from '~/env.mjs'` at line 3; 2 are genuinely env/URL-coupled
(`INVITE_URL`, `LOGO_IMAGE_URL`), 1 browser-coupled but node-safe (`IS_MOBILE`), 1 is the
`export *` line — **26 env-independent exports remain trapped**. Matches. Carried as an
on-next-touch note; correctly not actioned in this milestone.

### Suite, lint, typecheck

- **390/390 across 21 files** (`npm test`), up from 385 — the +5 the implementer reported.
- **TDD table complete** for all five new cases, with distinct and plausible failure reasons. The
  overwrite-refusal row records `AssertionError: expected [Function] to throw an error` rather than
  a "not a function" — the correct signature for a behaviour change on an existing function, and
  the mark of a genuine red-first rather than a boilerplate claim. I checked the five new
  assertions for independence: each expects a literal or a constant, none computes its expected
  value by calling the code under test. (The older `applyModeSwitch` cases still do — L5, carried.)
- **`npx eslint src/scripts/backfillValid.ts` → clean.** The spec file cannot be linted at all
  (not in `tsconfig.json`'s `include`, so `parserOptions.project` rejects it) — a pre-existing
  structural property of the repo, unchanged, not a fix-round defect.
- **Typecheck RED, 8 errors — all one class, verified individually.** Every one names the `valid`
  column as absent from the pinned generated types. `project-utils` at `749606d` declares
  `valid: boolean | null`. So the pin refresh clears all eight. Held deliberately by steering;
  correctly not touched.

---

## Findings

### M4 — MEDIUM — `backfill-valid` defaults to production, unguarded, and the pin refresh arms it

**Location**: `website/package.json`, script `backfill-valid`; `website/src/scripts/backfillValid.ts`,
symbol `main`.

**Class**: A plan-designated *owner-executed* irreversible action whose entry point defaults to the
production database and carries no dry-run, no confirmation, and no environment assertion — so the
control that makes it owner-executed is procedural only, with nothing in the code enforcing it.

**Enumeration**: package.json scripts loading `.env.local` and acting irreversibly against
production — **2 members**: `push-commands` (outbound Discord `PUT`, pre-existing, out of scope)
and `backfill-valid` (**added by this plan**). Guard predicate on the shipped script,
`grep -n "process\.argv\|NODE_ENV\|confirm\|dry\|readline\|prompt" src/scripts/backfillValid.ts` →
**0 hits**. What this predicate does **not** match: a guard living outside the script (a wrapper,
a CI condition, a shell alias) — I checked package.json and found none, but the predicate itself
cannot see one.

**Evidence, executed** (`probe-cr3-h3-and-default-target/README.md` §4):

| Invocation | resolved host:port |
|---|---|
| With my override | `127.0.0.1:1` |
| **Shipped default, no override** | **`viaduct.proxy.rlwy.net:12394`** — a live remote production database |

`dotenv` does not override an existing environment variable, which is why an explicit override
wins — and equally why *forgetting* one silently selects production.

**Why it is not HIGH.** The data outcome of an accidental run is the intended one: the write is
`WHERE valid IS NULL`, idempotent, using the same M3 predicate, so nothing is corrupted or
overwritten. And the report is now durable and per-run (H2/H3/M1-r2 bought that), so the
distribution is captured rather than lost. The harm is that the owner's single controlled
execution becomes an uncontrolled one at an uncontrolled time, and the report may be discarded by
whoever triggered it — three of three agents across three rounds deleted theirs.

**Why it must not be routed as "someday".** Today `npm run backfill-valid` is inert: it dies in
`TSError` before the module executes, attempting no connection (executed — §1a). That accidental
safety net is the **held stale pin**, and it disappears the moment the pin is refreshed, which is
the next step after this verdict. The hazard arms exactly when the review that would have caught
it has finished.

**Required Action** — *eliminate the class*, not the instance:
- **Preferred (structural)**: require an explicit opt-in for a production target — e.g. refuse to
  run unless `--confirm-production` is passed, or unless `BACKFILL_TARGET` is set explicitly —
  so that no bare invocation can reach production. This also resolves L8: the same argv/env
  handling gives the report destination an override, which is the "not done" residual the
  implementer declared. One change closes both.
- **Minimum**: an assertion at the top of `main()` that fails closed when the resolved
  `DATABASE_URL` host was not explicitly acknowledged.

**Routing note for the pin refresh**: whoever performs it should know that it converts this script
from inert to live-against-production. That is the constraint, and it is the reason this finding is
named here rather than filed quietly.

### M5 — MEDIUM — M2's record correction is applied at coordinates, not to the class

**Location**: `agent-output/implementation/012-message-valid-field-implementation.md`, Files
Created table, `src/utils/messageMode.ts` row.

**Class**: Any live claim in the record that the `handleModeSwitch` wiring seam is closed or
tested — the claim M2 existed to remove.

**Enumeration**: two independent predicates, run across all of `agent-output/*.md`.
`"closing the M2 wiring seam|wiring seam.*clos|seam.*closed"` and `"handleModeSwitch"`. Both
converge on **exactly one live stale instance**: the Files Created row, which still reads *"Fix
round: `applyModeSwitch(targetMode, prev)` added, **closing the M2 wiring seam for
`handleModeSwitch`**"*. Every other hit is the correction itself, a frozen changelog row (a record
area, correctly not rewritten), this review, or a closed plan-001 document. My own round-2 probe
README appears in the hit list as a **negation** ("It does **not** settle the wiring") and needs no
change. What the predicates do **not** match: a closure claim phrased without the symbol name and
without the word "seam" — e.g. "the wiring is now covered"; I read the Files table and Outstanding
Items directly to cover that, and found none.

**Why it matters**: the substantive correction is excellent and sits in Outstanding Item 9, where a
reader looks for dispositions. But a reader consulting the summary table gets the false claim, and
a stale "closed" is precisely what M2 existed to delete. This is the shape my Class-Scoped Findings
rule anticipates — the fix inherited the scope of the coordinates it was written at.

**Required Action**: correct that row to match Outstanding Item 9 (accepted at Minimum, not
closed). While there: the `backfillValid.ts` row still describes the pure helpers as *"added or
reshaped in the fix round for H2/M1"* and lists `main`/`tableWideRowCount` as the untested shell —
it does not mention `emit` or `reportPath`, which are now exported and unit-tested. Same table,
same staleness, one edit.

**Not blocking**: the code is correct and the authoritative disposition is recorded. This is a
record defect, and the record is the implementer's to correct before closure.

### L7 — LOW — the provenance stamps are load-bearing, untyped, and untested

**Location**: `website/src/scripts/backfillValid.ts`, symbols `formatReport` and `emit`.

**Class**: A field that the M1-r2 disposition depends on, whose presence in the output is
guaranteed by neither the type system nor a test.

**Enumeration**: `grep -rn "runId\|startedAt\|endedAt"` over `src/scripts/__tests__/` → **0**;
repo-wide over `src` → **1 file** (the source itself). `formatReport`'s `meta` parameter is typed
`{ tableWideRowCount: number, interrupted?: boolean }` — the three stamps are not declared, and
reach the output only because TypeScript does not excess-property-check **spread** properties.
Blind spot: the predicate matches these three names; a fourth provenance field added later under a
different name would not be caught by it.

I confirmed by execution that they do reach the persisted body today (§3). The point is what
happens next: narrow the spread, or refactor `formatReport`, and the gate's provenance vanishes
with a green suite and a clean typecheck. The implementer disclosed this shape honestly ("no
format change to `formatReport`; the fields just flow through the existing spread") — so it is a
known property, not an oversight, which is why it is LOW.

**Required Action** — **Preferred (structural)**: widen `formatReport`'s `meta` type to declare the
provenance fields, so dropping them is a type error. **Minimum**: one assertion that a persisted
report body carries `runId`. Since a framework already reaches this code, authoring that test is
the implementer's, not mine — recorded here as **`no test`**, with the instrument location named.

### L8 — LOW — the report destination is still not overridable; third round of gate-directory contamination

**Class**: A verification-only run of the shipped entry point that cannot avoid writing into the
owner's evidence directory.

**Enumeration**: `grep -rl "agent-output" src` → **1 file** (`backfillValid.ts`), the hardcoded
`REPORT_DIR`. Rounds in which an agent wrote a stray report into `verification/012/` and had to
capture-and-delete it: **3 of 3** (implementer round 1, reviewer round 2, reviewer round 3).

Declared by the implementer as not done and left as on-next-touch, which was a defensible call for
a non-blocking item. Recording that the cost has now recurred three times, and that **M4's
Preferred fix closes this at the same time** — argv/env handling gives both the database target and
the report destination an override. Worth doing together rather than separately.

### L9 — LOW — the plan names an artifact the implementation no longer writes

**Location**: `agent-output/planning/012-message-valid-field.md`, M6 — *"the output is captured by
the executing agent as a backfill report file (**named `backfill-report.md`**) under
`agent-output/verification/012/`"*.

The implementation now writes `backfill-report-<runId>.md`. That change was correct — it is what
made overwrite-refusal workable — but the plan's stated artifact name did not move with it. A
downstream stage (devops, UAT) looking for `backfill-report.md` will not find one.

**Routed to the planner**, not held against the tree: the naming clause governs the *agent-executed*
case, and the owner-executed run's evidence is his attestation plus the printed summary, which is
unaffected.

### INFO-1 — a successful run under a broken stdout pipe exits non-zero

Observed in §2: the async EPIPE arrives after `process.exitCode = 0`, so the process exits 1 with
an EPIPE stack despite having succeeded. The durable report is already on disk and records
`interrupted: false`, which discriminates this from a real failure. Not a defect; recorded because
piping the backfill's output is the expected usage that round 1's H2 was about.

### INFO-2 — an L4-class comment outside this round, and my own predicate's blind spot

`website/src/utils/__tests__/012-send-gate-partition.test.ts` carries a "Provenance:" comment block
addressed to a human reader, explaining where the extension cells came from. Under the tool test
that is prose whose home is the agent-output record. It is QA's file, pre-existing, and untouched
by this round — **not a finding against this tree**, and routed to QA as an observation.

Recording it because my round-2 L4 enumeration was scoped to the implementer's new spec and would
never have seen it. The blind spot was in my predicate, and it is the kind I am required to state
at authoring time rather than discover later.

### Carried, unchanged, correctly not actioned

**L2** (two `as boolean` casts), **L3** (`a7ebe4d`'s count mismatch, reconciled in the document
rather than by rewriting an immutable commit message — the right call), **L5** (the older
`applyModeSwitch` assertions compute their expected value by calling `switchToV2`/`switchToClassic`,
so they cannot fail under a defect in the delegation they name; the retitle addressed the *claim*,
not the tautology), **L6 residual** (26 trapped exports), **F1/R7** (per-embed-limit misvouching —
now risk row R7, correctly recorded as a consequence of D1's ratified parity, with no instrument by
construction).

---

## Assumption Not Checked

**This review assumes the eight typecheck errors are exhaustively the stale-pin class, such that
refreshing the pin yields a clean typecheck — and it does not test that.** I verified each of the
eight names the `valid` column as absent from the pinned generated types, and that `project-utils`
at `749606d` declares `valid: boolean | null`. I did **not** run a typecheck against a refreshed
pin, because the pin refresh is deliberately held by steering so that `Reviewed-At` would not move
under me.

**Falsity signature**: after installing the refreshed pin, `npx tsc --noEmit` returns a non-empty
error set — either residual `valid`-class errors (the regenerated types differ from what I read at
`749606d`) or errors newly surfaced that the eight had been masking.

**Owner**: **devops**, at the pin-refresh commit, where a clean install and typecheck run anyway.
This matters beyond tidiness: per M4, the pin refresh is also what converts `npm run
backfill-valid` from inert to live-against-production, so the same commit is where both this
assumption and M4's guard need to be settled. Named again in Next Steps.

My round-2 Assumption Not Checked (installed `node_modules` versus `pnpm-lock.yaml`) is carried to
devops at the same commit by steering's routing, and is not re-owned here.

---

## Next Steps

1. **devops — at the pin-refresh commit** (the sequencing steering holds): run the clean install
   and typecheck that closes this round's Assumption Not Checked and round 2's. **Before or with
   that commit, ensure M4's guard is in place** — the refresh is what arms `npm run backfill-valid`
   against production.
2. **implementer** — M5 (one row in the Files Created table, plus the `backfillValid.ts` row's
   stale helper list); then M4's guard (Preferred: argv/env opt-in, which closes L8 in the same
   change); then L7's type widening.
3. **planner** — L9 (the plan's `backfill-report.md` artifact name versus the shipped
   `backfill-report-<runId>.md`). The M2 harness question (no component-testing-library in this
   repo's vitest config) remains routed from round 2.
4. **QA** — INFO-2, as an observation about a QA-owned spec file, not a defect.
5. **qa (Phase 2)** — round 1's Assumption Not Checked stays routed there per steering.

None of 2–5 blocks the tree. Item 1's M4 clause is a sequencing constraint on the next commit, not
a re-review trigger.

**Handing off to the qa subagent for test execution.**
