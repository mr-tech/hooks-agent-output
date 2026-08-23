---
ID: 012
Origin: 012
UUID: 12a4fe3c
Status: OPEN
Status-Detail: >-
  Cycle 2, pass 2 (rev 7, commit 23e6b58): F5–F9 all verified RESOLVED against the diff and at
  source; D13/D14/R19/R20/R5 reviewed sound (D13's cost table re-derived at source, including
  updateMessage's wholesale data replacement); the F6×D13 no-conflict claim tested and holds.
  Verdict: APPROVED FOR IMPLEMENTATION. Two new LOW residuals (F10 sentinel-observation
  ordering; F11 Validation 4(e) lags rev-7 M2-f) stay OPEN with a named landing trigger —
  fold at the next plan touch, before the uat stage executes the 5712-keyed observables; no
  implementation dependency.
---

# Critique — Plan 012: `valid` field on stored messages

| Field | Value |
|---|---|
| Artifact | `agent-output/planning/012-message-valid-field.md`, revision 7, commit `23e6b58` (rev 5 `5831de0`, rev 6 `7af8936`) |
| Analysis | None commissioned (per plan D3). QA Phase 1 (`agent-output/qa/012-message-valid-field-qa.md`, rev 4 at `c1aee80`) read as the source of the traces the deltas enact — citations verified, test design not reviewed (qa's domain) |
| Date | 2026-08-23 |
| Status | Cycle 2, pass 2 (ladder rung: passes 1–5, normal; cycle-1 count reset on that cycle's resolution) |

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-23 | steering-hooks-012 brief | Critique plan 012 rev 3 | Initial critique (cycle 1, pass 1). Code-level premise verification against both chain branches. 1 HIGH, 2 MEDIUM, 1 LOW. REQUEST REVISION. |
| 2026-08-23 | steering-hooks-012 | Re-verify rev 4 (`13b4d4c`) | Cycle 1, pass 2: all four findings verified RESOLVED against the diff. Verdict APPROVED. Critique closed, moved to `closed/`. |
| 2026-08-23 | steering-hooks-012 | Delta-scoped re-review of rev 5/6 (D11, D12, F-QA2 enactment): M2 + M2-e/M2-f, release condition 5, M6-b, R2, register D11/D12 | Cycle 2, pass 1. Critique re-opened from `closed/` (same document, new cycle — new scope on the same artifact). Code-level verification of the M2-e whole-class claim and M2-f's failure semantics. F5–F6 (MEDIUM), F7–F9 (LOW). REQUEST REVISION, scoped to criterion wording. |
| 2026-08-23 | steering-hooks-012 | Re-verify rev 7 (`23e6b58`); test the F6×D13 no-conflict claim rather than accept it; R19/R20 in scope at my judgement | Cycle 2, pass 2. F5–F9 verified RESOLVED against the diff and at source. D13's shape-dependent cost table re-derived at source (standardizeMessage whitelist; updateMessage wholesale `data` replacement); F6×D13 no-conflict claim tested — holds. D14/Validation 8/R5 sound. Two new LOW residuals (F10, F11) with a pre-UAT landing trigger. **APPROVED FOR IMPLEMENTATION.** |

## Assumption Not Checked

**Cycle 2, pass 2**: This pass assumes the JSON-modal Load path behaves at runtime as its static
composition reads — seed via `standardizeMessage` (whitelist omits `flags` and `components`),
validation via `discordMessageImportShape`, state write via `updateMessage`'s top-level spread
replacing `data` wholesale — and does not execute it: my verification of D13's cost table (the
basis of Validation item 7 / QA row R19) is source reading, not a run. Falsity signature: a
5712-shaped record still carrying `flags: 32768` after a JSON-modal Load and save — i.e. the
D13-guided "lossless" repair failing to repair, observable as the record remaining
`valid: false` after its owner follows the guidance exactly. Owner of closure: the qa stage at
Phase 2 — its pre-registered spec already carries the JSON-modal/D11 round-trip simulation
cells, whose execution against the implementation is the discriminating check (named again in
this pass's handoff report).

**Cycle 2, pass 1** — open, unchanged: the `messageMode` writer enumeration rests on a
literal-text search; closure owned by the code-reviewer at M2 implementation review. Restated
in full below; rev 7 changes nothing about it (M2-e now cites the same three writers, which
makes the enumeration verdict-bearing for the plan too). Original statement: This pass assumes its enumeration of `messageMode` writers is complete —
it rests on a literal-text search for `setMessageMode` in non-test `src/` (three call sites:
`detectMode` in `src/providers/MessageProvider/index.tsx`, `handleModeSwitch` in
`src/components/DiscordMessageEditor/index.tsx`, and the JSON modal Load handler in
`src/app/message/m/[id]/_components/JsonModalBody.tsx`) — and does not test it against the
running UI: a dynamically-accessed or destructured writer would not appear under that predicate.
Falsity signature: a mode transition observable in the composer with no corresponding call site
in this enumeration — concretely, `messageMode` changing without the toggle, a record load, or a
JSON Load having occurred. Owner of closure: the code-reviewer stage at M2 implementation review,
which reads `handleModeSwitch` and its surroundings in full (named again in this pass's handoff
report).

**Cycle 1, pass 2** — open, unchanged: the NULL-only backfill write must be an atomic guarded
write (condition inside the write), owned by the code-reviewer at M6 review. Falsity signature
and routing recorded in cycle 1 below; QA has independently instrumented the same property
(mutation MS-4), which corroborates the routing without closing it — MS-4 is an instrument, not
yet an executed check.

**Cycle 1, pass 1** — CLOSED, holds (steering read-only comparison; statbot 023 D9/D10 match
handoff 61f24e56 on every clause chain 012 implements; details in cycle-1 record below).

## Value Statement Assessment

Unchanged through rev 7; cycle-1 assessment stands: **PASS**.

## Overview — cycle 2 scope and method

Rev 5 (`5831de0`) enacts two owner rulings from QA Phase 1 — D11 (V2 flag cleared in the
mode-switch V2→classic branch, folded into M2; M2-d revised, M2-e/M2-f added) and D12 (statbot
chain 023's gate deploy ordered after the live declaration; release condition 5 extended to five
components) — and accepts F-QA2 (M6-b flag-residue breakout; R2's "~1 in 1,976" retired as a
threshold). Rev 6 (`7af8936`) is wording only: D12 and condition 5 restated to stand alone as
the sole planning-register record of the ordering constraint on either side.

Scope per the planner's own recommendation, adopted by steering: the delta. M1, M3 (except one
M3-d clause), M4, M5, M7 verified byte-unchanged in the diff `cd742f7..7af8936` and carry the
cycle-1 approval; the cycle-1 Verification Record remains current for them. `PREMISE-STALE`
scan: none marked (see F7 for the gate-discipline gap this leaves).

**Pricing line**: the delta is sized to its rulings. D11 lands as the one line the owner priced
(register row + M2 fold-in + two criteria + one post-deploy row); D12 as an ordering clause and
its register row; the M6-b breakout is F-QA2's accepted cost. No unrequested machinery; no scope
growth beyond what the owner ratified ("Confirm the expanded scope").

**Moving premise, closed during this pass** (steering message, 2026-08-23): whether a payload
could carry V2 elements only nested under a top-level Action Row. Re-derived here rather than
inherited: `topLevelComponentShape` (`website src/server/api/utils/shapes.ts`) is a
discriminated union whose every member except `actionRowShape` is itself a V2 type, and
`actionRowShape.components` admits only `linkButtonShape` — no V2 children are representable. The
hazard does not exist. The residue this leaves is F9.

## Verification Record — cycle 2, pass 1 (receiving-end checks)

Against `website` chain branch `chain/012-message-valid-field`:

1. **F-QA1's three code facts, re-derived** (the premise under D11 and the M2 rewrite): the
   V2→classic branch of `handleModeSwitch` (`src/components/DiscordMessageEditor/index.tsx`)
   filters components to type 1 and calls `setMessageMode` — no `flags` touch; `detectMode`
   (`src/providers/MessageProvider/index.tsx`) derives mode from `hasV2Components` — structure
   only; `stripKeys` remains the only `.flags` write in non-test `src/` and only ever sets the
   bit. All three confirmed at source. `messageMode` is a state variable
   (`useEditableState.ts`), set only on loads (`detectMode`), the toggle
   (`handleModeSwitch`), and JSON Load — it is **not** continuously re-derived from structure,
   so deleting the last V2 component in V2 mode does not silently flip mode around D11's branch.
2. **The classic→V2 leg's unconditional data destruction** (F-QA8's premise): `switchMode` sets
   `content: ''`, `embeds: []` unconditionally; `hasDepartingData` gates only the confirmation
   modal. Confirmed — QA's trace is accurate.
3. **The third mode writer** (basis of F5): the JSON modal's Load handler calls
   `editableState.setMessageMode(detectedMode)` after `enforceImportMutualExclusivity`
   (`src/utils/index.ts`), which spreads the parsed object and, for classic-structured input,
   **preserves** a `flags` key; `discordMessageImportShape`
   (`src/server/api/utils/shapes.ts`) declares `flags: z.number().int().nonnegative().optional()`,
   so pasted JSON carrying `flags: 32768` with classic structure survives validation into the
   editor state. Confirmed.
4. **Pre-D11 reachability of Send-enabled for 5712 via supported controls** (basis of F6):
   load (classic mode per `detectMode`) → toggle classic→V2 (supported; content/embeds cleared)
   → add V2 components (supported in V2 mode) → save (`stripKeys` keeps the flag; structure now
   V2) → the corrected M2 gate reads a consistent V2 message → Send enabled. Every step exists
   on the current tree plus M2 alone, with no JSON modal and no D11. Confirmed at source.
5. **Steering's Action-Row determination** — re-derived, holds (Overview above).
6. **Plan citations of QA** — the F-QA1 quotation in M2's "Second component" paragraph, the
   Rev-5 note under Known Consequence, and the M6-b breakout's F-QA2 reasoning all match the QA
   document. Confirmed.

## Architectural Alignment

Unchanged. D11 adds no architectural surface (one branch of an existing handler); D12 is release
sequencing. The contract (61f24e56) is not amended by either: D11 is composer behaviour, D12 is
deploy ordering — the six-point shape is untouched, consistent with the plan's R4 record.

## Scope Assessment

Sized to the ask (Pricing line above). The one scope-shaped observation: the owner ratified the
delta's two consequences explicitly (every V2→classic switch now writes flags; repair bound by
an observable criterion), so the expansion is owner-priced, not review-loop growth.

## Technical Debt Risks

Low, unchanged. D11's one line lands in a branch that already owns the departing-data
transformation — no new pattern. The M6-b breakout adds a reporting axis, not a subsystem.

## Verification Record — cycle 2, pass 2 (rev 7 checks)

1. **F5–F9 enactments** verified against the diff `d9c9e35..23e6b58`: M2-e bounded to
   `handleModeSwitch` with the JSON-Load residue named/routed (D9/cb83fd7b) and record-loads
   excluded with reason; M2-f carries the flag-free persisted end-state clause with the
   discrimination rationale; the 8b discharge sits at M2's tail; D12's title carries the
   sole-record clause; R1's mitigation carries the F9 dependency with falsifier and QA's EXT-2
   tripwire. M1, M4, M5, M7 carry no hunks; M3 changed only in M3-d's cost clause.
2. **D13's cost table** — re-derived at source, not taken from QA's measurement:
   `standardizeMessage` (`src/utils/index.ts`) whitelists `username`/`avatar_url`/`content`/
   `allowed_mentions`/`embeds` and never copies `components` or `flags`, so the JSON-modal seed
   is lossless exactly for component-free shapes (5712's) and component-destroying otherwise;
   `updateMessage` (`useApiMethods.ts`) spreads at the message level — `{...oldMessage,
   ...newMessage}` — so Load replaces `data` wholesale and a stale flag cannot survive; the
   toggle route's complementary costs (content/embeds destroyed classic→V2, type-1 components
   preserved) were verified at source at pass 1. The table's "loses one side either way" row
   follows. Confirmed.
3. **F6×D13 no-conflict claim** (steering-flagged) — tested, holds. The two clauses bind
   different things: M2-f's JSON-modal exclusion is the instrument's discrimination requirement
   (the modal drops the flag via the whitelist with or without D11 — verified — so an
   observation through it cannot distinguish fixed from unfixed), while D13's guidance names
   what users are told per shape. The exclusion does not forbid users the modal; the guidance
   does not change what the criterion measures. No clause of either weakens the other. One
   residue of the pairing is real and is F10 (ordering, not conflict).
4. **D14 / Validation item 8 / risk R5** — sound. The whitespace category is computable from
   stored data by the run itself; sufficiency is bounded with the window stated ("this corpus,
   at this time"; the class on a zero is "empty **and unguarded**, never safe"); the live-POST
   prohibition is stated with no approval path, consistent with workspace rules; D14's
   reopening class is named (a non-zero count, as a new owner question, never a silent gate
   change); the statbot-side zero is kept as context, not a bound. R5 opens with falsifier,
   instrument and a rev-7 record entry.
5. **Register rows D13/D14** — titles carry their operative clauses; D13's route records the
   superseded first ruling and steering's basis correction rather than papering over it — the
   re-put on corrected facts is exactly what the register's route column exists to show.
   Contract check: neither touches a D1 clause (composer guidance; a report category) — the
   plan's R4 rev-7 record is accurate.

## Findings — cycle 2

Findings F5–F9 resolved at rev 7 (`23e6b58`); full arguments in the pass-1 text at commit
`d9c9e35`.

- **F5 (MEDIUM) RESOLVED** — M2-e bounded to the mode-switch control; JSON-Load and record-load
  residues named and routed (D9/cb83fd7b). Verified in the rev-7 diff.
- **F6 (MEDIUM) RESOLVED** — M2-f pinned to a flag-free persisted end state; the pass now
  discriminates D11 (pre-D11 the only flag-free path is the excluded JSON modal). Verified.
- **F7 (LOW) RESOLVED** — 8b-gate discharge recorded at M2's tail. Verified.
- **F8 (LOW) RESOLVED** — D12 title extended with the sole-planning-record clause. Verified.
- **F9 (LOW) RESOLVED** — detection-completeness dependency recorded in R1's row with falsifier
  and QA's EXT-2 as tripwire. Verified.

### F10 (LOW, OPEN) — the 5712-keyed observables interfere, and no order is stated

**Description.** Four observables key on the same singleton production record: M6-c (5712
carries `false` in the backfilled table), Validation 4(a)/QA R2 (GET shows `valid: false`),
4(d)/R4 (composer shows the notification, Send disabled), and 4(e)/R15 (the repair
observation). Rev-7's M2-f makes 4(e) a *persisting* act — the flag-free end state must be
saved to be observed — and any save recomputes `valid` (M4), so executing 4(e) flips 5712 to
`valid: true` and destroys the precondition of the other three. Executed before the backfill,
it also fails M6-c's sentinel expectation — a false red on a release gate. D13's guidance
(Validation 7) reaching the affected guild owner creates the same race from outside: his repair
is the intended outcome, and it has the same effect on the sentinels. No ordering among these
observations is stated anywhere in the plan.

**Impact.** A naive execution order produces either a false release-gate red (M6-c) or a
meaningless/ambiguous pass on 4(a)/4(d) — after a legitimate repair, `valid: true` is correct,
not a failure, and the rows' stated failure modes ("if it shows `true`…") misread it.

**Recommendation.** One sentence in Validation item 4: the 5712-keyed observables are read in
order — M6-c and 4(a)/4(d) before 4(e), and 4(e) last; after 4(e) (or the guild owner's
D13-guided repair), 4(a)'s expected value legitimately becomes `true` via M4. Guidance send
(item 7) follows the sentinel reads or the flip is noted. Sequencing *within* a stage's
execution remains qa/uat's; the plan owes only the constraint and the flip's meaning.

### F11 (LOW, OPEN) — Validation item 4(e) still states the pre-F6 criterion, and the uat Reading Order routes there

**Description.** M2-f gained the flag-free persisted end-state clause at rev 7, but Validation
item 4(e) still reads "brought to a Send-enabled state through supported composer controls
alone, no JSON modal (M2-f, D11…)" — the pre-F6, non-discriminating form. The uat Reading
Order row routes to "Validation and Release Conditions", not to M2, so the text the executing
stage reads omits exactly the clause that makes the observation discriminate D11 (QA's R15 row
has the same lag; that document's update is qa's, noted in the handoff). Per the plan's own
Reading Order discipline, rows route to current text.

**Impact.** The F6 fix's value evaporates at execution: an observer following 4(e) as written
can pass it via the rebuild-as-V2 path on a build where D11 failed.

**Recommendation.** Add the clause to 4(e): "…and the persisted record carries no
`IS_COMPONENTS_V2_FLAG` (M2-f's discriminating end state)". One clause.

**Disposition for F10/F11 (landing trigger, not "whenever convenient")**: fold at the next plan
touch, and in any case before the uat stage executes the 5712-keyed observables. Neither
touches M1–M5 build work — no implementation dependency, so they do not gate the implementer's
start.


## Questions

None requiring the owner at pass 2 — D13 answered pass 1's R16 note (the flag-free clause landed
alongside the ruling, compatibly). Two clerical items for steering, neither a plan finding: (a)
the owner's assembled-delta ratification ("Ratify it and let the chain run", relayed 2026-08-23)
post-dates commit `23e6b58` and is recorded nowhere in the repo — it wants a registration write
(register row or Status-Detail, steering's grant under planner.md Registration Passes) so the
plan's "Awaiting: owner approval of the rev-5+7 delta" line stops contradicting the fact; (b)
QA row R19 describes its guidance class as "records carrying **V2** components and a stranded
flag" — that shape is consistent V2 and needs no repair; the intended class is flag-stranded
records carrying **type-1 (legacy)** components (spec cell B3), as the plan's Validation item 7
correctly states. QA's document is qa's to fix.

## Risk Assessment

- **R2's threshold retirement — verified sound.** F-QA2's two reasons check out independently:
  the sweep's predicate was cell B5 only, while the corrected gate flips {B3, B5, B7}; and the
  sweep's population (1,976 records across Statbot-configuring guilds) is a differently-selected
  subset of `Messages`. A rate over a narrower predicate and narrower population cannot bound
  the class; keeping it as context, not threshold, is correct. The falsifier's residual
  magnitude-free wording ("an unexpected `false` population") is acceptable **only because** the
  gate is constitutionally the owner's judgement over the report's named per-class counts (D6) —
  the instrument and reader are both named, so the criterion stays decidable.
- **M6-b breakout — sound.** The class ("`data.flags` carry the V2 bit while components are not
  structurally V2") is computable from stored data by the backfill run itself; it is an
  orthogonal axis to the first-failing-check counts, which is fine — it exists to answer R2, not
  to partition failures.
- **Release condition 5 / D12 — stands alone as required.** The five-component order is
  intelligible without any chain-023 document; the hooks.gg devops agent's obligation is
  correctly bounded to recording that the instruction was relayed, never statbot's compliance.
  QA row R17 gives it an executable trace.
- Plan risk rows R1–R4 rev-5 records are accurate transcriptions; no new member of any
  registered class observed this pass. F9 proposes one addition to R1's row.
- **Pass 2**: rev-7 records for R1–R4 accurate; R5 (whitespace misvouching) opens correctly
  (falsifier = the M6-b category count; the general Discord fact marked undeterminable here;
  statbot-side zero held as context, not bound). No member of any registered class observed.

## Recommendations

1. **APPROVED FOR IMPLEMENTATION** — all cycle-2 substantive findings (F5–F9) verified enacted
   at rev 7; the two new LOW residuals (F10, F11) are validation-choreography text with no
   implementation dependency, held OPEN against a named landing trigger (next plan touch, and
   before the uat stage executes the 5712-keyed observables). The implementer may start.
2. Steering: carry the two clerical items in Questions (ratification registration write; QA's
   R19 class wording) to their owners.
3. Assumption closures now distributed: code-reviewer at implementation review — atomic guarded
   backfill write (cycle 1) and mode-writer enumeration (cycle 2 pass 1, now verdict-bearing
   for M2-e's own residue statement); qa at Phase 2 — runtime execution of the JSON-modal
   round-trip cells (cycle 2 pass 2, the check that makes D13's guidance table more than static
   reading).

**Verdict: APPROVED FOR IMPLEMENTATION** — cycle 2, pass 2, rung 1–5 (normal; no ladder
requirement binds; stop authority not fired — F10 and F11 are first instances of their shapes
this cycle). The critique stays OPEN solely for F10/F11's landing; their trigger is pre-UAT,
not pre-implementation.

**Pass-1 verdict (superseded)**: REQUEST REVISION on F5/F6 (MEDIUM) + F7–F9 (LOW), all now
resolved above.

---

## Cycle 1 record (rev 3 → rev 4, APPROVED; retained as disposition record)

**Findings** — all RESOLVED at rev 4 (`13b4d4c`); full arguments recoverable at commit `235f294`:

- **F1 (HIGH) RESOLVED** — total release order in condition 5 with named misordering failures
  and NULL-only idempotent recovery.
- **F2 (MEDIUM) RESOLVED** — backfill script placement subordinated to the reuse property.
- **F3 (MEDIUM) RESOLVED** — evaluation-failure residue named (count + row ids, owner-reviewed,
  `valid: false`), judged contract-derived, not an amendment (cycle-1 pass-2 judgement #2:
  clause 2's biconditional plus clause 3 leave `false` as the only permitted value).
- **F4 (LOW) RESOLVED** — register parenthetical rephrased.

**Cycle-1 pass-2 judgements** (steering-flagged, made by this stage): the NULL-only/idempotent
backfill is a sound narrowing serving F1's recovery clause (M6-a totality holds; the guarded
write closes the race in the correct direction; contract clause 3 satisfied by the union of M4-
and backfill-computed rows; one negligible residual recorded — M6-b's distribution excludes rows
save-computed in the deploy→backfill window); F3's `false` disposition derives from handoff
61f24e56 rather than amending it — no owner escalation.

**Cycle-1 Verification Record** (receiving-end checks, still current for the byte-unchanged
milestones): gate reads no `flags` (grep -c = 0) and derives V2-ness structurally; `flags`
reaches both gate consumers (`mapMessage` wholesale pass-through; `makeEditable` preserves);
`limits.tsx` pure/node-safe; exactly three `Messages` writers (`upsertMessage` with the genuine
two-branch conflict clause, `updateRecentMessageData`, the delete procedure); username asymmetry
confirmed; both v1 endpoints structured as M5 describes; M1 toolchain claims confirmed
(`rebuild` omits `prisma generate`; orphan `src/generated/Database/` exists); pin facts per the
architecture record (`eb38a15` = master HEAD); error copy verbatim; `check-repo` baseline 255
with zero 012 mentions.

**Cycle-1 pass-1 Assumption** — CLOSED, holds: statbot plan 023 rows D9/D10 match handoff
61f24e56 on every clause chain 012 implements (steering read-only comparison, 2026-08-23);
neither falsity signature occurred; the one substantive divergence (worker-path log line) is a
statbot-side gap routed by steering to that domain — not a 012 finding.

## Revision History

| Date | Artifact rev | Findings addressed | New findings | Status changes |
|---|---|---|---|---|
| 2026-08-23 | rev 3 (`c4cf783`) | — (initial) | F1 (HIGH), F2 (MEDIUM), F3 (MEDIUM), F4 (LOW) | Critique opened, Status OPEN |
| 2026-08-23 | rev 4 (`13b4d4c`) | F1, F2, F3, F4 → RESOLVED (verified against diff) | None | Critique Status → Resolved; moved to `closed/` |
| 2026-08-23 | rev 6 (`7af8936`, delta from `5831de0`) | — (new cycle) | F5 (MEDIUM), F6 (MEDIUM), F7 (LOW), F8 (LOW), F9 (LOW) | Critique re-opened from `closed/`, Status → OPEN; cycle 2 pass 1; REQUEST REVISION |
| 2026-08-23 | rev 7 (`23e6b58`) | F5–F9 → RESOLVED (verified against diff and at source) | F10 (LOW), F11 (LOW) — OPEN, landing trigger: next plan touch, pre-UAT | Verdict APPROVED FOR IMPLEMENTATION; critique stays OPEN for F10/F11 only |
