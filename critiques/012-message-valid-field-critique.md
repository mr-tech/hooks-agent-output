---
ID: 012
Origin: 012
UUID: 12a4fe3c
Status: OPEN
Status-Detail: >-
  Cycle 2, pass 1 (rev 6, commit 7af8936; delta-scoped re-review of the D11/D12/F-QA2
  enactment). Cycle-1 approval of rev 4 stands for the unchanged milestones. Two MEDIUM
  findings against the new M2-e/M2-f criteria (class over-quantified; observable
  non-discriminating), three LOW. Verdict: REQUEST REVISION, scoped to criterion wording.
---

# Critique — Plan 012: `valid` field on stored messages

| Field | Value |
|---|---|
| Artifact | `agent-output/planning/012-message-valid-field.md`, revision 6, commit `7af8936` (rev 5 at `5831de0`) |
| Analysis | None commissioned (per plan D3). QA Phase 1 (`agent-output/qa/012-message-valid-field-qa.md`, rev 2 at `3810b84`) read as the source of the traces the delta enacts — citations verified, test design not reviewed (qa's domain) |
| Date | 2026-08-23 |
| Status | Cycle 2, pass 1 (ladder rung: passes 1–5, normal; cycle-1 count reset on that cycle's resolution) |

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-23 | steering-hooks-012 brief | Critique plan 012 rev 3 | Initial critique (cycle 1, pass 1). Code-level premise verification against both chain branches. 1 HIGH, 2 MEDIUM, 1 LOW. REQUEST REVISION. |
| 2026-08-23 | steering-hooks-012 | Re-verify rev 4 (`13b4d4c`) | Cycle 1, pass 2: all four findings verified RESOLVED against the diff. Verdict APPROVED. Critique closed, moved to `closed/`. |
| 2026-08-23 | steering-hooks-012 | Delta-scoped re-review of rev 5/6 (D11, D12, F-QA2 enactment): M2 + M2-e/M2-f, release condition 5, M6-b, R2, register D11/D12 | Cycle 2, pass 1. Critique re-opened from `closed/` (same document, new cycle — new scope on the same artifact). Code-level verification of the M2-e whole-class claim and M2-f's failure semantics. F5–F6 (MEDIUM), F7–F9 (LOW). REQUEST REVISION, scoped to criterion wording. |

## Assumption Not Checked

**Cycle 2, pass 1**: This pass assumes its enumeration of `messageMode` writers is complete —
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

Unchanged at rev 6; cycle-1 assessment stands: **PASS**.

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

## Findings — cycle 2

### F5 (MEDIUM, OPEN) — M2-e quantifies over transitions its fix does not govern

**Description.** M2-e states: "For every V2→classic mode switch, the resulting editor state —
and the record persisted by any subsequent save — carries no `IS_COMPONENTS_V2_FLAG`… stated
over the whole class of V2→classic switches, whatever the departing content." Verified at the
receiving end, `messageMode` has three writers (Verification #1, #3). One of them falsifies the
property as worded, by construction: a JSON-modal **Load** of classic-structured JSON that
declares `flags: 32768` moves the editor v2→classic with the flag in the resulting state, and a
subsequent save persists it — `enforceImportMutualExclusivity` preserves the key and
`discordMessageImportShape` admits it. D11's one line in `handleModeSwitch` cannot make M2-e
true over that member, and is not meant to: the JSON path is the deliberately-excluded second
origin (register D9; handoff `json-editor-bad-configurations-2026-08-23.md`, UUID cb83fd7b).
QA's own enumeration already reads the class as the toggle (register row R14: departing states
of the switch control) — so the criterion's words quantify over more than either its fix or its
instrument governs. The same over-quantification touches the parent claim "the generator is
closed": the composer-toggle generator closes; the JSON-import mint remains, deliberately.

**Impact.** A criterion falsifiable by an input its fix deliberately does not govern leaves both
readings available downstream: a QA or UAT pass that constructs the JSON member reports M2-e
failed on a correct implementation, or the class is silently narrowed at verification time —
exactly the drift acceptance criteria exist to prevent.

**Recommendation.** Bound the class to switches performed through the mode-switch control
(`handleModeSwitch`), and name the residue as bounded: mode transitions via JSON Load (routed —
D9/cb83fd7b, where this question already lives) and via record loads (`detectMode` aligns mode
to the loaded record's structure; not a switch of an existing editing state). One or two
sentences; no new machinery.

### F6 (MEDIUM, OPEN) — M2-f's pass is available on unfixed code, so the observable does not discriminate the change it binds

**Description.** M2-f: an affected stored record "can be brought to a Send-enabled state through
supported composer controls alone, with no recourse to the JSON modal," with the purpose clause
that if D11's line "turns out not to repair already-stored records… that is this criterion
failing and it routes back to the owner." Verified (Verification #4): **without D11**, 5712
reaches Send-enabled through supported controls — toggle to V2, build V2 components, save; the
stranded flag is then consistent with the structure and the corrected gate accepts it. So the
criterion's pass condition is satisfiable on pre-D11 code. Steering asked directly whether M2-f
can fail or passes trivially: it **can** fail (a state with no supported path to Send-enabled
would fail it), but its **pass does not distinguish** D11-delivered from D11-absent — and for a
post-deploy observable whose stated job is binding D11 to its purpose, a pass available either
way is the defect my instrument rule names: both readings stay available to whoever wants one.
QA's F-QA8 (register R16, with the owner) is the adjacent, distinct gap — the criterion measures
reachability, not preservation, and passes honestly over content destruction. I concur with
F-QA8 as traced (Verification #2) and do not re-raise it; F6 is the discrimination gap, which
F-QA8's disposition does not by itself close.

**Impact.** R15 (M2-f's post-deploy row) can be executed and marked green via the rebuild-as-V2
path on a build where D11 silently failed to land or work — the criterion then attests a repair
the fix did not deliver, which is precisely the outcome the owner chose D11 to avoid.

**Recommendation.** Pin the end state so the pass is unavailable without the fix: Send-enabled
**with the persisted record carrying no `IS_COMPONENTS_V2_FLAG`** (recovery as the classic
message, not conversion to a different one) — pre-D11 that state is reachable only through the
JSON modal the criterion already excludes. If the owner's R16 ruling adds a preservation clause,
fold both into one restated criterion; if he accepts content loss, the flag-free clause is still
needed on its own.

### F7 (LOW, OPEN) — rev 5's product-behaviour delta is not discharged against the planner's own re-derivation gate

**Description.** D11 changes product behaviour (the stored representation written by a supported
flow). Planner.md's re-derivation gate (Core Responsibility 8b) puts every downstream milestone
not yet authorised for execution into a `PREMISE-STALE` population, cleared by a one-paragraph
re-argument. Rev 5 neither marks nor discharges: M3-d and M6-b are revised, but M4/M5/M7 carry
only the implicit claim that rev-4 approval transfers across the delta. Discharged here so the
gap is substance-checked, not just named: M3's parity is by construction (shared symbol) and
indifferent to who writes `flags`; M4's recompute covers post-switch saves by covering all
saves; M5 exposes whatever is stored; M6's stored population is unchanged by D11 (it stops new
minting, repairs nothing in place) and the breakout instruments exactly that; M7 is clerical.
**No premise is actually stale.** The defect is the missing one-line record that the gate was
run — the next reader must re-derive what one changelog sentence would state.

**Impact.** Every downstream reader pays the re-derivation, or skips it and inherits an
unchecked transfer claim.

**Recommendation.** One line (changelog or M2 tail): the 8b gate was considered for the D11
delta; downstream premises hold for the reasons above. No `PREMISE-STALE` markings needed now —
this pass's discharge stands in the record via this finding.

### F8 (LOW, OPEN) — D12's row title carries one of its two operative clauses

**Description.** The D12 ruling as registered has two operative clauses: the ordering (in the
title) and the statbot-side ruling that no chain-023 planning record exists — which is what
makes this row the **sole** planning-register record on either side (the row's own bolded
claim). The second clause lives only in the row body. Per the register rule (a two-clause ruling
under a one-clause title gets consumed at the title), a title-level reader sees an ordering
constraint and misses that this row is its only planning-document carrier.

**Impact.** Low — release condition 5 restates both clauses in full, and QA row R17 carries the
executable half. The cost is title-scan legibility of the register itself.

**Recommendation.** Extend the title: "…ORDERED AFTER this chain's live declaration, and this
row is the sole planning-register record of the constraint on either side (statbot 023 carries
none, by owner ruling)." Or split into two rows.

### F9 (LOW, OPEN) — the detection-completeness dependency on the import shape is recorded nowhere

**Description.** The chain's V2 detection (`hasV2Components`) classifies by top-level component
type only. Its completeness over the stored domain is guaranteed not by any nesting check but by
the domain being unable to express the counterexample: `actionRowShape` admits only link
buttons, so no payload can carry V2 elements only beneath a top-level Action Row (Verification
#5; determined by steering, re-derived here). That is load-bearing on an invariant this chain
does not own: Action Row children staying buttons-only in `topLevelComponentShape`. The blast
radius is bounded by the contract — gate and predicate share one symbol (M3-a), so a future
shape change that broke completeness would move both together: parity holds, and the failure
would be a composer-bug-class event (the D5 shape), not a contract violation. But the plan
asserts whole-domain properties (M2-a "every composer state", M3-a "every payload the column can
hold") whose enumeration silently rests on this invariant, and no document records the
dependency.

**Impact.** A future editor of the component shapes has no signal that widening Action Row
children re-opens a settled detection question in another part of the system.

**Recommendation.** One sentence in Risks (R1's row is the natural home, as the truth-condition
neighbourhood): detection completeness rests on `topLevelComponentShape` admitting no V2
children under Action Rows (verified 2026-08-23); falsifier: any change to that shape admitting
one. The per-repo architecture record would be the durable home, but none exists for `website`
(recorded absence) — the risk row suffices for this chain.

## Questions

None requiring the owner this pass. F6's interaction with R16 (already with the owner via QA) is
noted inside F6 — the R16 ruling should be made knowing F6's flag-free clause is needed under
either disposition.

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

## Recommendations

1. **REQUEST REVISION** — scoped to criterion and register wording (F5, F6 the substantive
   two; F7–F9 one-liners). No structural change, no new machinery, no re-opening of any
   registered decision.
2. Route to the planner for the wording revision; F6's recommendation should be enacted in a
   form compatible with whichever R16 disposition the owner returns (or after it returns, if
   imminent).
3. The code-reviewer stage now owns two assumption closures at implementation review: the atomic
   guarded backfill write (cycle 1) and the mode-writer enumeration (this pass).

**Verdict: REQUEST REVISION** — cycle 2, pass 1, rung 1–5 (normal; no ladder requirement binds;
stop authority not fired — F5 and F6 are one defect neighbourhood but distinct shapes: class
over-quantification vs. non-discriminating observable, first instance of each this cycle).

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
