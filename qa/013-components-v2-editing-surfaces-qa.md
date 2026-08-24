---
ID: 013
Origin: 013
UUID: 22d69e06
Parent: components-v2-editing-support-2026-08-23.md
Status: QA Complete
Verified-At: 821330d  # re-anchored 2026-08-24; supersedes 164d720 (see Re-anchor note)
Verified-At-Detail: >-
  **REFRESH PASS, 2026-08-24 — supersedes the Phase 2 anchor below for verdict purposes.**
  `website` @ `chain/013-components-v2-editing-surfaces`, HEAD = `164d720` (re-derived by
  `git rev-parse HEAD`). `c85945f` confirmed an ancestor, so integration is a fast-forward and the
  assembled release tip is byte-identical to the chain tip.
  **The production-code verdict is anchored to `164d720` clean** — the F-QA15 fix was verified
  against the pristine tip with no QA changes present.
  **The suite-green claim additionally requires four UNCOMMITTED test-file changes** (F-QA16's
  re-anchors, F-QA19's coverage, and the implementer's F-QA21 fix), so that half carries a content
  identity alongside the SHA. **Re-derived 2026-08-24 after the implementer landed F-QA21 into the
  same shared tree** — a fourth path appeared under this verdict after it was first written, and the
  manifest is restated rather than left describing a tree that no longer exists:
    `012-json-editor-repair-path.test.ts`  33af76e25e0bd5f6350c9fd398c2a135fb9db53f8be6c352eee1af4768021714
    `012-message-mode.test.ts`             94cd8738162139121c421056737edf7d1b9da53ca91dac2209288bcf2f5fe411
    `013-fqa19-ingress-gate-reachability.test.ts` 82e92af1ab7c4c6bf718f28d10c4977479b00644d538f7798ce82253de9c3fcd
    `013-fqa15-rowd-load-gate.test.ts`     39e62dcd6d969788434c4ea301404d0840ff2387f404af82b5c0782f2702c58d  (implementer's, F-QA21)
  plus one deletion: `013-qa-phase1-seed-route-probe.test.ts` (untracked; byte-identical copy
  retained under `verification/013/probe-preexisting-seed-route/`).
  Suite at this content identity: **550 tests / 37 files / exit 0**.
  **A commit approval for QA's three paths is OWED and has been requested** — they are website
  source, not agent-output, so QA's standing commit grant does not reach them.
  Phase 2 anchor, re-derived by this pass and not inherited. `website` @
  `chain/013-components-v2-editing-surfaces`, HEAD = `4e9da96` (`git rev-parse HEAD`, exact match
  to the fix commit closing MED-6). **No production source is uncommitted at this anchor** —
  `git status --porcelain src/ bot/` returns exactly one line, an untracked QA probe spec
  (`src/utils/__tests__/013-qa-phase1-seed-route-probe.test.ts`), so the SHA stands alone and no
  content-identity manifest fallback is owed. Phase 1's anchor was `c85945f` and is superseded for
  verdict purposes; it is retained below as the regression baseline.
  **The verdict at this anchor is QA FAILED.** See F-QA15.
Status-Detail: >-
  Phase 1 rev 1, written against plan rev 12 (`4906fbc`, Status `Approved`) and critique
  `d38f057` (cycle 1 pass 5, APPROVE), both read directly. Scoped per the plan's Reading Order
  row for qa, plus the Decisions Register (D1–D19) and Surfaces Without Automated Coverage.
  Ten findings (F-QA1–F-QA10); five are entry conditions the implementer needs BEFORE writing
  M7 and M8 specs, because three of the plan's stated instruments are not executable against
  `c85945f` as written. Two of the critic's four inherited Assumption-Not-Checked lines are
  CLOSED here (passes 3 and 5); pass 2's premise is CONFIRMED by execution; pass 4's stays live
  with the implementer and gains a post-deploy detector row. BQ-1 (Validation item 8's observation
  window) was routed and is **RESOLVED** — owner ruling D20, plan rev 13 (`e2495b0`): UAT mints
  its own two seed records before the release act, so the D19 repair is no longer a one-way door;
  BC-11 is released. F-QA1 is resolved by D21 (the implementer adds a `typecheck` script). Nine
  findings remain live, F-QA2/3/4 being the entry conditions. Awaiting implementation.
  **Probe-extension pass, 2026-08-24 (rev 2) — still Phase 1, still no verdict.** `uat-hooks-013` reported two
  read-level gaps in QA's seed-route probe and one structural defect in BC-11; all three are accepted. Both
  gaps **re-derived by execution** at `c85945f` in QA's own detached worktree — 24 assertions, five mutants
  killed, captured beside the original probe. **BC-11 is SPLIT** into BC-11a (the mint — **EXECUTED and
  terminal** on the owner's quoted attestation, per UAT `838b180`) and BC-11b (the ask — **NOT EXECUTED**,
  non-terminal, still blocking); BC-11 is retained as a pointer and nothing was withdrawn. **D20's
  re-derivation clause is resolved on the substance by UAT, not by this instrument.** Two new findings:
  **F-QA11** (New Message's Save is enabled at `guildId: '0'`, which the boundary refuses — pre-existing,
  outside 013) and **F-QA12** (QA's own probe was scoped one layer inside the real boundary). No criterion
  moved; Phase 2 has not run.
  **Third-digest round, 2026-08-24 (rev 3).** F-QA11 **bounded by execution** to 1 of 4 sites matching a
  predicate derived from the class definition; two siblings guard the same `'0'` sentinel, so it is a
  single-site oversight. `uat-hooks-013`'s deliberately-unexecuted inference on R7's first limb **executed and
  confirmed** — the seeds are `valid = false` — with the correction that the boolean alone does not
  discriminate and the reason string must be keyed on. **F-QA13** records UAT's finding U-1 as a Phase 2
  constraint on detector selection. Instrument now **36 assertions, nine mutants, nine killed**.
  **Phase 2, 2026-08-24 (rev 4) — EXECUTED at `4e9da96`. Verdict: QA FAILED.** The block above is
  retained verbatim as the Phase 1 record; this paragraph is recorded beside it, not over it.
  One blocking defect, **F-QA15**: the Message JSON modal floors the *unresolved* draft, so every
  member of disposition row D is refused and M2-a's repair path for 5712/5842/5855/5856 is closed.
  Confirmed end to end on record 5712 through the shipped pipeline; regression against base
  `c85945f`, where the same records loaded. **TDD gate PASSES** on re-derivation, and this pass
  **withdraws** its own earlier claim that `SaveChoiceModal.tsx` lacked a TDD exemption — it has
  one, stated and classed. **INFO-2 falsified**: `NewMessageModal`'s gate branch is live, not dead,
  though exercised by no spec (F-QA19). Suite re-run and re-counted: 517 tracked tests, 6 failed,
  both failing files in Phase 1's declared red-test domain. Four new findings, F-QA15–F-QA19;
  register appended at BC-13/BC-14. Not handed to UAT — the chain returns to the implementer.
---

# QA Report: Plan 013 — Components V2 support across the editing surfaces

**Plan Reference**: `agent-output/planning/013-components-v2-editing-surfaces.md` (rev 12, `4906fbc`, Status `Approved`)
**Critique Reference**: `agent-output/critiques/013-components-v2-editing-surfaces-critique.md` (`d38f057`, cycle 1 pass 5, APPROVE)
**QA Status**: **QA Complete** (refresh pass 2026-08-24 at `164d720`; Phase 2's FAILED verdict at `4e9da96` stands for that tree and is retained below)
**QA Specialist**: qa

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-08-24 | steering-hooks-013 (cross-session brief) | QA Phase 1: test strategy against plan rev 12 before any code exists; re-derive the critic's four transferred assumptions and M-10 from source; read Validation item 8 with M8-G's coverage entry | Phase 1 written. M-10's domain enumerated by `grep -rc` at the chain base: **7 files**, one more than plan and critique name between them. Irreversible Side-Effect Register produced. Three plan instruments found not executable at `c85945f` (F-QA2/3/4) and issued as entry conditions. Probe captured at `verification/013/probe-preexisting-seed-route/` establishing UAT can mint its own M8-G seed pre-deploy. Blocking-condition register minted (13 rows). BQ-1 routed to steering. |
| 2026-08-24 | steering-hooks-013 (rulings relay) | Register D20 and D21, read directly at plan rev 13 (`e2495b0`); release BC-11 | **Post-Phase-1 registration pass; no re-derivation, no new finding, no verdict.** BQ-1 collapsed to its disposition line with trim accounting; BC-11 released from `BLOCKED` and its Earliest-decidable condition rewritten to D20's mechanism (UAT mints its own two seeds before the release act; the route expires at deploy; UAT re-derives the mintability). F-QA1 collapsed to its D21 disposition. Nothing else in the strategy moved: the enumerations, the register, EC-1..EC-5 and the assumption closures stand as written at `98f978e`. |
| 2026-08-24 | uat-hooks-013 (direct, under D27) | Two read-level extensions to QA's seed-route probe (the real write boundary is one layer out; the persist leg is uncovered), and the observation that BC-11 spans two instants with opposite timing | **Probe-extension pass. No verdict, no Phase 2, no criterion moved.** Both of UAT's reads **re-derived by execution** at `c85945f` in QA's own detached worktree — 24 assertions green, **five mutants killed**, captured at `verification/013/probe-preexisting-seed-route/`. UAT is right on both points. The extension turned up **F-QA11**: `NewMessageModal` opens with `guildId` defaulting to `'0'`, `disableSave` does not check it, and `discordIdShape` refuses `'0'` — so an operator who presses Save without touching **Save To** gets a boundary refusal and would report the mint route as closed. **BC-11 SPLIT** into **BC-11a** (the mint — pre-deploy, expires at deploy) and **BC-11b** (the ask — needs the chain tip); BC-11 retained as a pointer. Half A recorded **NOT EXECUTED** on UAT's report; the owner's stated intent is **not** treated as attestation. **D20's re-derivation clause remains outstanding** — it is UAT's to discharge and this instrument does not discharge it. |
| 2026-08-24 | uat-hooks-013 (direct, under D27, second digest) | Correction to the digest above, plus two defects in BC-11 as written | **Recorded beside the row above, not over it.** Two claims in that row are now **superseded**: (1) BC-11 Half A is **EXECUTED and terminal** — the owner minted both seeds himself and named them (5855, 5856), attestation quoted verbatim in BC-11a; (2) **D20's re-derivation clause is RESOLVED on the substance**, not outstanding — mintability is now established *by execution in production*, a stronger derivation than the module-level probe D20 contemplated, and UAT's classifier-blocked probe is retired for that purpose. UAT's two defects in BC-11 are **accepted and fixed here**: the Subject cell named a party who can execute neither half, and the Earliest-decidable cell was silent on Half B's environment precondition — both now carried by BC-11a/BC-11b. UAT's `publicProcedure` count re-derived here rather than repeated: **8 procedure definitions in `message.ts` at `c85945f`, 8 protected, 0 public**. |
| 2026-08-24 | uat-hooks-013 (direct, under D27, third digest) | UAT reports F-QA11 does not generalise to Save As (read-level, asked to be recorded as such), and hands over **finding U-1** plus one inference it deliberately left unexecuted about `valid` and R7 | **Executed rather than recorded at read level.** **F-QA11 is bounded by execution to 1 of 4** sites matching the sweep predicate — *builds `message.upsert`'s `guildId` from a value the user picked this session* — and the load-bearing result is that **two siblings guard the exact `'0'` sentinel**, so it is a single-site oversight, not a design. **UAT's unexecuted inference CONFIRMED**: both seeds carry `valid = false`, so they stay out of R7's `flagStructureDisagreementValidTrue` — with one correction UAT's reasoning did not carry, that a username-less message is *also* refused for an unrelated reason, so **anything keying on `valid = false` must key on the reason, not the boolean**. **U-1 recorded as a Phase 2 constraint** on detector selection. Four more mutants; **nine across the pass, nine killed**. Instrument now 36 assertions. |
| 2026-08-24 | steering-hooks-013-2 | Run QA Phase 2 at chain tip `4e9da96` | **Phase 2 executed. Verdict: QA FAILED on F-QA15** — the Message JSON modal's Load button is gated on a content floor computed over the *unresolved* draft, so **every** member of disposition row D is refused, closing M2-a's stated repair path for records 5712/5842/5855/5856. Confirmed end to end on record 5712 through the shipped pipeline, captured at `verification/013/probe-qa-p2-rowd-load-gate/` (29 assertions, mutants R1-R3 killed). Regression vs base `c85945f`, where Load was gated only on "does it parse". **TDD gate: PASS** — re-derived against the current implementation document; this pass **withdraws** its own earlier working claim that `SaveChoiceModal.tsx` lacked an exemption. **INFO-2 falsified** by execution. Suite re-run and re-counted. |
| 2026-08-24 | steering-hooks-013-2 | Refresh pass at `164d720` after the F-QA15 fix | **QA COMPLETE.** F-QA15 **closed** — verified against the pristine tip by QA's own instrument (`verification/013/probe-qa-p3-fixverify/`, 25 assertions, mutants F1/F2 killed), including five **over-permission** controls the fix could plausibly have broken. **F-QA16 discharged** — both 012 specs re-anchored; the *"flag never reaches the textarea"* assertion **replaced, not restored**, per the relayed round-19 constraint. **013 makes the B3 class lossless**, superseding 012's R19 *"no lossless path"* conclusion. **F-QA19 discharged** with permanent coverage. Probe-file **dispositioned** (deleted; captured copy retained). Suite **green: 37 files / 549 tests / exit 0** — Validation item 1 met. New: **F-QA21** (a type-assertion masquerading as a bitmask in the implementer's spec), **F-QA22** (`enforceImportMutualExclusivity` has zero production callers). **D28 honoured — no DOM harness added.** |
| 2026-08-24 | implementer-hooks-013-3 (direct, under D27) | F-QA21 fixed in the shared tree; asks when QA's files are clear to land | **F-QA21 CLOSED, and its severity corrected UPWARD on execution.** The fix is verified, not accepted: 16/16 green, and mutant **Q1** (`switchToClassic` wiping *all* flag bits) is **killed**. Decisively, Q1 **SURVIVED the pre-fix spec** (15/15 green) — so the old type-assertion was blind to a live regression class that would drop `SUPPRESS_EMBEDS`/`EPHEMERAL` on every classic repair. Not cosmetic. Verdict's content identity **re-derived to four paths**; suite 550/37/exit 0. **QA declined the offer to have the implementer commit QA's three files** — an approval is pending with the owner, and routing it through a peer's standing grant would settle it without him. |

## Timeline

- **Test Strategy Started**: 2026-08-24
- **Test Strategy Completed**: 2026-08-24
- **Implementation Received**: —
- **Testing Started**: —
- **Testing Completed**: —
- **Testing Started**: 2026-08-24
- **Testing Completed**: 2026-08-24
- **Refresh Pass (F-QA15 fix)**: 2026-08-24
- **Final Status**: **QA Complete** at `164d720` — F-QA15 closed, suite green

---

## BQ-1 — RESOLVED

`BQ-1  RESOLVED 2026-08-24 — owner ruled by selection prompt: UAT mints its own two throwaway
seed records before the release act; he holds nothing and repairs 5712/5842 on his own schedule.
Registered as D20, plan rev 13 (\`e2495b0\`). Enacted here at BC-11, which is released.`

**Trim accounting** (document-lifecycle, "A rule-driven trim states what the deleted text carried"):
the argument removed from this section on 2026-08-24 carried three things, each of which now lives
elsewhere. (i) The three enumerated options and their costs — superseded by the D20 register row,
which records what was put to the owner, the two options he did not take, and what is steering's
carriage rather than his; read the row, not a restatement. (ii) The mintability finding and its
method — carried by `agent-output/verification/013/probe-preexisting-seed-route/` (README, spec,
green run, control, two killed mutants) and cited from BC-11; D20 records that this finding is
QA's, established by execution, and that **UAT re-derives it rather than inheriting it**. (iii) The
held-fallback instruction, should no answer come — it carried nothing once answered and is gone.
The full argument remains recoverable at commit `98f978e`, which carried it while it was current.

## Method, and what this pass did not take on trust

- Plan and critique **read directly** at the SHAs named above. No criterion, count or finding in
  this document is taken from the steering brief.
- The plan's Reading Order row for `qa` was followed (Objective → Milestones → Testing Strategy →
  Validation and Release Conditions), extended by the Decisions Register D1–D19 (read in full,
  never a summary), Assumptions, Surfaces Without Automated Coverage, Serialised Shared Files,
  Risks, Out of Scope and Handoff Notes — each reached because a named section cites it.
- **Every count below was computed inside `grep -c`/`grep -rc` or by `find`, never taken through a
  piped count over filtered output** (RTK.md; document-lifecycle "Identifying the Tree Under
  Verification"). Where a count is quoted, the predicate that produced it is in the same sentence.
- The suite was **re-executed** at the chain base rather than cited from plan 012's QA record:
  22 files / 411 tests, all passed, `pnpm test`, exit 0, 2026-08-24. It agrees with 012's figure;
  agreement is recorded, not relied on — the instrument is shared, so this is reproducibility, not
  independent confirmation.
- `node tools/check-repo.js` was run from the `agent-output` root at session start. **It exits 1**
  with 9 problems, all in chain 012's artifacts (duplicate basenames under `verification/012/`,
  two repo-rooted link targets, two stage-suffix violations in `code-review/` and `deployment/`).
  None is 013's and none is in QA's domain; recorded here rather than fixed, since they are other
  stages' documents. Re-checked after this pass wrote its files: the 9 are unchanged and this pass
  adds none.

### Self-check on start

`agent-output/qa/` outside `closed/` holds one other document, `012-message-valid-field-qa.md`,
Status **`QA Complete`** — not a terminal status under document-lifecycle (the terminal set is
Committed, Released, Abandoned, Deferred, Superseded, Resolved). **Nothing moved.** DevOps closes it.

---

## Phase 1 is the two-phase record, not a post-hoc audit

Implementation has **not** begun (the owner is holding the implementer until this lands), so this
is a genuine Phase 1. The plan's own Testing Strategy asks for it in these words: *"QA Phase 1 runs
before implementation … because the properties' enumerations are the thing most likely to be
under-specified and cheaper to correct before code exists."* That is exactly what F-QA2, F-QA3 and
F-QA4 below are: three criteria whose stated instruments cannot execute against `c85945f`, found
before a line was written rather than after a red suite.

**Scoping note.** Critique cycle 1 ran five passes and reasoned over the design's properties, so
this pass is **scoped — not skipped — to the coverage-obligation half**: the input-space
enumerations, the both-directions obligations, the conjunct-isolation obligations and the
instrument-existence checks, none of which a critique can produce. The Irreversible Side-Effect
Register is produced in full regardless of any narrowing.

---

## Testing Infrastructure Requirements

### TESTING INFRASTRUCTURE NEEDED

1. **A `typecheck` script. It does not exist.** `grep -c typecheck package.json` → **0**, at
   `c85945f`. Plan Validation item 1 requires *"`pnpm typecheck` … green on the chain branch tip"*
   and names a command the repository does not have. `tsconfig.json` sets `noEmit: true`, so the
   command the item means is `npx tsc --noEmit`. **Remedy** (implementer, at M1): add
   `"typecheck": "tsc --noEmit"` to `package.json` `scripts`. Until then Validation item 1 is
   unexecutable as written and QA runs `npx tsc --noEmit` and records that substitution. — **F-QA1**
2. **A coverage provider.** No `@vitest/coverage-v8` (or `-istanbul`) in `package.json`.
   `check-coverage.sh` cannot produce a percentage; Phase 2's "Coverage Percentage" field will
   read *not instrumented* unless one is added. **Remedy**: `pnpm add -D @vitest/coverage-v8`, or
   QA reports coverage as the per-criterion mapping table only. Recommend the latter — the plan's
   criteria are property-shaped and a line-coverage number would not answer them. — **F-QA10**
3. **`bot/**` is outside the test include.** `vitest.config.ts` has
   `include: ['src/**/*.test.ts']`. M3 opens `bot/serverCommands.ts` (`get_message`'s `Pick`, which
   must request `components` and `flags`). Any spec for it is **silently not collected** today.
   **Remedy**: either widen `include` to `['src/**/*.test.ts', 'bot/**/*.test.ts']`, or assert the
   `Pick`'s shape from a spec under `src/` that imports the bot module (the `bot` alias already
   resolves in `vitest.config.ts`). QA prefers widening the include, because a spec that is never
   collected is indistinguishable from a passing one. — **F-QA5**
4. **No component/browser harness — and this pass does not ask for one.** `environment: 'node'`,
   no `jsdom`/`happy-dom`, no `@testing-library/*`, and `include` admits no `.test.tsx`. Assumption 5
   and the plan's Surfaces-Without-Automated-Coverage section make this a deliberate cost/benefit
   call and QA concurs. **Its consequence is not neutral and is issued as EC-3 below**: three of
   the plan's criteria state instruments that require observing a call inside a React component or
   hook, and cannot be satisfied without either a harness or a design change. The design change is
   the cheaper answer and is what the plan's own R9 mitigation already implies.

### Frameworks, libraries and config — no changes needed

Vitest `^4.1.2` is present and is the repo's only test framework; `src/utils/__tests__/` and
`src/server/api/utils/__tests__/` are the existing homes the plan names. Zod is already the shape
library. **No new test framework or assertion library is needed for 013.**

### Module-scope hazard every new spec must handle — **F-QA9**

Importing `~/utils` reaches `src/constants/index.ts` → `src/env.mjs`, which **validates
environment variables at module scope and throws** (`Error: Invalid environment variables`) in this
box's environment. This was found by executing, not by reading: this pass's first probe run failed
with `0 test` collected. Every existing spec in the repo already mocks it. Every new 013 spec that
imports `~/utils` (which is all of M1, M2, M4, M7-b and M8) must carry:

```ts
vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));
```

A spec that omits it fails at collection with **zero tests run**, which in a large suite reads as a
missing file rather than a failure.

---

## The red-test domain — M-10, re-derived, not taken from the plan

The critic's **M-10** (STATED LIMIT, stop authority) transfers to QA the obligation to enumerate the
existing tests a milestone turns red **by `grep -rc` at the chain base, never from the plan's list**,
because the plan's coordination list has been wrong twice in this chain by omission. Done.

**The predicate, derived from the class definition and not from the phrasing of the known instances**:

> every file under `src/**/__tests__/` whose text references a **symbol whose behaviour a milestone
> of plan 013 changes** — enumerated by `grep -rc <symbol> src --include=*.test.ts --include=*.test.tsx`
> at `c85945f`, one grep per symbol, union of the matching files.

The symbol list is derived per milestone from the plan's criteria, not from the critic's citation:
`standardizeMessage`, `hashMessage` (M1); `enforceImportMutualExclusivity` (M2/M8);
`stripKeys` (M8-G); `detectMode` (M7-a); `switchToV2`, `applyModeSwitch` (M7-b);
`messageHasV2`, `showV2PatchWarning` (M7-c); `filterSupportedComponents`,
`discordMessageImportShape`, `SUPPORTED_TOP_LEVEL_TYPES`, `topLevelComponentShape` (M4-b);
`discordResponseToMessage` (M3); `saveMessage` (M8-G's composer writer).

**Result — 7 files matching that predicate in `src/**/__tests__/` at `c85945f`; excludes `bot/**` (outside the vitest include, F-QA5) and excludes helper-mediated reachers, which the predicate cannot see.**

| # | File | Matching symbols (`grep -c` per symbol) | Named by |
|---|---|---|---|
| 1 | `src/utils/__tests__/012-json-editor-repair-path.test.ts` | `standardizeMessage` 3, `enforceImportMutualExclusivity` 3, `stripKeys` 2, `switchToV2` 3, `discordMessageImportShape` 2, `saveMessage` 4 | plan |
| 2 | `src/utils/__tests__/m7-m10-coverage-gaps.test.ts` | `enforceImportMutualExclusivity` 17 | plan |
| 3 | `src/utils/__tests__/012-message-mode.test.ts` | `switchToV2` 5, `applyModeSwitch` 4 | plan |
| 4 | `src/utils/__tests__/012-send-gate-partition.test.ts` | `switchToV2` 3, `stripKeys` 1, `detectMode` 2 | plan |
| 5 | `src/utils/__tests__/mutual-exclusivity.test.ts` | `stripKeys` 9 | critique M-10 |
| 6 | `src/utils/__tests__/components-v2-data-layer.test.ts` | `stripKeys` 15 | critique M-10 |
| 7 | `src/server/api/utils/__tests__/shapes-v2.test.ts` | `discordMessageImportShape` 16, `filterSupportedComponents` 2, `SUPPORTED_TOP_LEVEL_TYPES` 1, `topLevelComponentShape` 1 | **NEITHER — found here** |

**Predicate reconciliation.** Every known instance appears among the predicate's matches: the plan's
four (rows 1–4) and M-10's two (rows 5–6) are all present. A known instance outside the matches
would have falsified the predicate; none is. **Row 7 is a third instance of the L-7 / M-10 shape**
(*existing tests a milestone's behaviour change turns red, absent from the coordination fact*) — the
shape has now recurred three times in one chain, which is a process observation for the retrospective,
not a plan finding. — **F-QA6**

**Checked and excluded, with the reason** (an exclusion is a judgement and is recorded as one):

| File | Matched via | Why excluded |
|---|---|---|
| `src/utils/__tests__/sub-component-actions.test.ts` | `makeEditable` 22 | `makeEditable`'s **behaviour** is unchanged by every milestone. M1 changes what *calls* it (`stripKeys` over the editable message replaces `standardizeMessage`); the function itself is untouched. Not a member of the predicate. |
| `src/utils/__tests__/008-qa-validation.test.ts` | `makeEditable` 29 | as above |

Symbols deliberately **not** in the list, each with its reason: `switchToClassic` (I-D11, explicitly
untouched by M7-b), `hasV2Components` / `hasClassicContent` (read by new code, behaviour unchanged),
`IS_COMPONENTS_V2_FLAG` (a constant), `validateContentRequirements` (M8 reads it; assumption 3 keeps
`messageValidity.ts` shut), `optionalIdMessageShape` (unchanged), `makeEditable` (above).

**Two symbols have ZERO existing test coverage** — `grep -rc` over all 22 test files returns no
matching file for either:

- **`hashMessage`** — M1-d's entire subject. Change detection has never been tested. M1-d starts
  from nothing, on both directions of its property.
- **`discordResponseToMessage`** — M3's entire subject, all three ingress entry points. Likewise nothing.

That is not a red-test problem; it is the opposite, and it means M1-d and M3 carry the largest
*new* test burden in the plan while appearing in no coordination list at all. — **F-QA7**

**Residue the predicate cannot see**, named rather than left implicit: a test that reaches a changed
symbol only through an un-named helper. Bounded by the repo's 22-file test tree and found when it
goes red. The implementer records **every file that went red** in the implementation doc's
files-touched reconciliation (M6 already requires the reconciliation); re-anchoring them is QA's at
Phase 2, and none is the implementer's to delete or edit (plan, Serialised Shared Files).

---

## Irreversible Side-Effect Register (MANDATORY)

Design-time artifact, handed to the implementer as **input**. Every irreversible side effect 013's
blast radius can cause; what must be true before it fires; and whether that ordering is enforced
**identically on every route that can trigger it**. A route that is right by accident is a finding.

| # | Irreversible act | Routes that can trigger it (enumerated) | What must be true first | Enforced identically on every route? |
|---|---|---|---|---|
| **IS-1** | **A record is persisted** (`message.upsert`) — overwrites stored `data` | **5 writers**, enumerated by following the injected mutation, not by grepping the string (see the method note below): `useApiMethods.saveMessage` (composer Save + hotkey), `SaveAsMenu.onSubmit`, `NewMessageModal.onSubmit`, `m/new/page.tsx`, `f/[id]/page.tsx` | After M8-G: for a **row-E draft** (V2 components *and* a classic body), the user has chosen Classic-or-V2 and been told what the other drops. Nothing written before the choice. | **NO — this is the register's principal hazard.** M8-G names one property over five writers but leaves *"which of the writers' surfaces renders it … to the implementer"*. Three of the five are independent `.tsx` call sites. A gate written three times will diverge (this is R9's failure mode moved from two JSON surfaces to three writers). **Required**: one shared, importable, pure gate consulted by all five; the two canned-intro writers consult it and it returns *no ask* vacuously, rather than being exempted by argument. See EC-3. |
| **IS-2** | **A message is published to Discord** (`sendWebhook`) — cannot be recalled | `src/app/message/m/[id]/send/page.tsx` (2 references) | The draft passes the send gate (`allowSave` ⇐ `validateMessage` empty), and the wire form is one Discord accepts under `IS_COMPONENTS_V2_FLAG` | **NO, and knowingly so.** R10 records that the only guard is a client-side `isDisabled={!allowSave}`; `sendWebhook` posts from the browser with no server-side check. 013 does not change that (correctly — it needs a ruling). **But M8-G changes the wire form**, which is the critic's still-live pass-4 assumption. This is the one irreversible act whose new behaviour has **no pre-deploy instrument**. Register row **BC-12**. |
| **IS-3** | **A classic body is destroyed on the way to a record** (`stripKeys`' `delete casted.data.content` / `delete casted.data.embeds` inside `if (hasV2)`, `src/utils/index.ts`) | Every caller of `stripKeys` on a persist, seed or hash path | **After M8-G: never.** The deletion is retired at those paths; the serialiser's output is its input modulo `_key`s plus the V2 bit ORed in from structure | Today: **NO** — it fires identically at every path, which is precisely D18's defect. After M8-G it must fire **nowhere** on persist/seed/hash. The bit-setting line (`flags \|= IS_COMPONENTS_V2_FLAG`) is explicitly **untouched** — see the conjunct-isolation obligation for M8-G. |
| **IS-4** | **A user's chosen drop** (M8-E / M8-G) — the option not taken is gone | The row-E choice at: JSON modal Load, New Message paste, and each of IS-1's five writers | The user has been shown **both** options, each naming what it drops, and has taken one. Dismissal leaves the draft *and* the pasted text as they were | Must be — M8-F states parity as a property over all eight cells × two surfaces, and M8-G extends it to the writers. **QA runs the same fixture set through every entry point**; that is R9's own mitigation and is a Phase 2 obligation, not an aspiration. |
| **IS-5** | **A Redis `StoredMessage` write** (`messageStore.store`), 1h TTL | `src/server/api/routers/message.ts` (3 refs), `src/pages/api/messages/codes/[code].ts` (2), `bot/serverCommands.ts` (2) | After M3-b: the dropped-set report is written **alongside** `data`, so the notice can render at the code path's receiving end | Partially: the plan names the bounded residue itself — codes stored **before** the deploy carry no dropped set, so the notice cannot render for them, bounded by the 1h TTL after go-live. Register row **BC-13** records the window. |
| **IS-6** | **The mode toggle clears `content`/`embeds`** (`switchToV2`) | The composer toggle | The existing confirmation ("Your embeds and content will be removed. This cannot be undone.") | Out of scope by design (plan 001 M8). **But M7-b adds an irreversible flag write to the same act**: after M7-b the toggle also sets `IS_COMPONENTS_V2_FLAG`. The confirmation's wording is not re-examined by any criterion. Not a defect; recorded so the retrospective can see the act grew a limb without its notice growing one. |

**Method note on IS-1's enumeration — F-QA8.** `grep -rc "message\.upsert" src bot` returns **5
files**, and they are **not the 5 writers**. It returns `MessageProvider/index.tsx` (which merely
*constructs* the mutation at line 218 and passes it into `useApiMethods` at line 264) and **misses**
`useApiMethods.ts` (which *calls* it at line 63, inside `saveMessage`). The plan's reference-following
count of five writers is correct; a grep re-derivation of it is **unsound**, because the mutation
reaches its true call site by injection. **Plan Validation item 2's grep-reconciliation discipline is
right for M1-a's `standardizeMessage` class and must not be carried over to the upsert class.** Stated
here because the implementer is told to re-derive the inventory before touching it, and the obvious
re-derivation gives a wrong answer that looks right.

---

## Entry Conditions for the implementer — probe shapes, not test lists

Phase 1's output to the implementer is a set of **probe shapes**: *prove the comparand exists on the
live path before building the comparison that consumes it.* Three of the plan's criteria state
instruments that **cannot execute** against `c85945f` as written. Each is issued as a condition to be
met before that criterion's spec is written, and each is falsifiable in one line.

### EC-1 — M7-a has no importable comparand — **F-QA2**

M7-a's instrument is *"the mode state after load, asserted over the class in the suite."*
`detectMode` is a **non-exported function declared inside the `MessageProvider` component body**
(`src/providers/MessageProvider/index.tsx`, `function detectMode(msg: ActiveMessage | null)` at line
112; four internal call sites, no export, no other reference anywhere in `src/`). The two existing
tests that mention it only **comment about** it and re-implement the predicate by hand
(`012-send-gate-partition.test.ts`). There is no importable path to the value M7-a asserts over.

> **Probe**: before writing M7-a's spec, extract the mode predicate as an **exported pure function** —
> natural home `src/utils/messageMode.ts`, which M7-b already opens — and prove
> `import { <predicate> } from '~/utils/messageMode'` resolves and returns a mode for a fixture
> **with no `components` key at all** (the case research G4 and M7-a's own text single out).
>
> **Falsity signature if skipped**: M7-a ships with its assertions written against a hand-copied
> predicate rather than the product's, so the criterion passes while `detectMode` says something
> else — and the whole point of M7-a is that the composer and `validateContentRequirements` never
> disagree on one record.

### EC-2 — M7-c has no importable comparand — **F-QA3**

Same shape. `messageHasV2` (line 160) and `showV2PatchWarning` (line 163) are inline `const`s inside
`send/page.tsx`. `grep -rc` over all test files returns **no match** for either symbol. M7-c's
instrument is *"the warning's condition asserted over the class in the suite"* — that condition is
not addressable.

> **Probe**: extract the warning's condition as an importable predicate taking
> `(message, oldMessage, showEdit)` and prove it imports and returns. **Falsity signature if
> skipped**: M7-c becomes a manual checklist item that nobody added to the checklist, and the
> flag-only re-send case (a D12 import, a repaired 5712, a D16 toggle over Action Rows) silently
> keeps shipping without its warning.

### EC-3 — three negative instruments name observations no harness can make — **F-QA4**

**M3-c**: *"the suite asserts … that the create writer issues no upsert call (the mutation observed
at its call site)"*. **M8-E**: *"on the modal, no `updateMessage`/`setMessageMode` call before the
choice; on the paste, no object forwarded to `onSubmit` and no `message.upsert` call before it —
each observed at its call site in the suite"*. **M8-G**: *"the negative at each writer (no
`message.upsert` call before a choice) observed at its call site"*.

Every one of those call sites is inside a React component or hook. Vitest runs `environment: 'node'`,
`include: ['src/**/*.test.ts']`, with no `jsdom`, no `@testing-library/react` and no `.test.tsx`
collected. **None of these three instruments can be built as stated**, and the plan does not add a
harness (assumption 5 — a call QA concurs with).

> **Probe — and it is a design constraint, not a test technique**: the comparand must exist **as a
> value** before the comparison can consume it. Prove, before writing any M8 spec, that
>
> - the five-row disposition is a **pure, importable resolver** returning a decision object —
>   `{ row: 'A'|…|'E', mode, dropSet, noticeClass, requiresChoice, chosenOutcome }` — from
>   `(flagBit, components, content, embeds)`; and
> - the persist gate is a **pure, importable function** — `gateBeforePersist(draft) → { mustAsk, options }` —
>   consulted by all five IS-1 writers.
>
> Then "nothing lands before the choice" is asserted as `requiresChoice === true` / `mustAsk === true`
> over the row-E cell, and the surfaces are left to render what the resolver reports. **This is the
> plan's own R9 mitigation** — *"the disposition lives in the shared reconciler, the surfaces render
> what it reports"* — restated as an executable precondition and extended from two JSON surfaces to
> the five writers of IS-1.
>
> **Falsity signature if skipped**: the decision lives inside `JsonModalBody`, `NewMessageJsonInput`,
> `SaveAsMenu` and `useApiMethods` separately; M3-c, M8-E's negative and M8-G's negative all become
> manual checklist items; the blocking checklist UAT must execute grows by roughly a dozen rows the
> plan never budgeted for; and R9's divergence (one object, two dispositions) becomes undetectable
> by any suite.

### EC-4 — env validation at module scope

Every new spec importing `~/utils` carries the three `vi.mock` lines in F-QA9. **Falsity signature if
skipped**: the spec fails at collection with `0 test`, which in a 22-file suite reads as a missing
file rather than a failure.

### EC-5 — expectation independence, made mechanical

The plan already forbids producing a verifying expectation by running the code's own serialiser
(M1-b, M7-a, M8-F). QA's Phase 2 audit applies the sharper rule: **a fixture that supplies the
quantity under test measures the arithmetic, not the wiring.** Concretely, for 013 that means:

- M1-b/M1-c expected values are **literal stored forms authored by hand**, never
  `stripKeys(makeEditable(x))` of the fixture.
- M8-F's expected row, drop set and notice class are **stated from the cell** in the fixture table,
  never computed by calling the resolver.
- M7-a's expected mode is **stated from the fixture's own `flags`/`components`**, never by calling
  the predicate under test — and the flag literal is `32768`, not the imported constant.

**Falsity signature**: a spec that cannot fail under the defect it exists to detect. Phase 2 checks
this by mutation, per the guard-observation obligation below, not by reading.

---

## Coverage obligations — the half a critique cannot produce

For every acceptance criterion that names an example, the property audit asks: *what class is this an
example of, and does the test enumerate the class?* And for every named risk sub-class, two questions
the plan does not answer and the critique did not: **which fixture makes each conjunct carry the
decision alone**, and **does the class have a member in both directions?**

### Both-directions obligation, per named risk sub-class

A test asserting members of a class are refused must be paired with a control asserting an
authorised equivalent still succeeds — otherwise a blanket refusal passes, and so does a service
that is simply down. Owed **per sub-class**, not once per control.

| Sub-class the plan names | Negative member (refused / warned / blocked) | **Positive control the suite must also carry** |
|---|---|---|
| M8-D — flag over a classic body | `{content:"hi", flags:32768}` → warning, lands Classic, bit cleared | **M8-C** — `{flags:32768, components:[<container>]}` → V2, bit **kept**, **nothing shown**. Without it, "always warn and clear the bit" passes M8-D. |
| M8-B — V2 components, bit absent | `{components:[<container>]}` → V2, bit **set**, warning shown | **M8-A** — `{content:"hi"}` → Classic, bit stays clear, **nothing shown**. Without it, "always set the bit and warn" passes M8-B. |
| M8-E — both present, choice required | `{content:"hi", components:[<container>]}` → nothing lands until a choice | **M8-A and M8-C together** — cells where `requiresChoice` is **false** and something *does* land immediately. Without them, "always ask" passes M8-E. |
| M8-C, Action-Rows-only under the bit (D13's *"not a conflict"*) | — | `{flags:32768, components:[<action row>]}` → V2, **nothing shown**. This is the cell D13 was ruled to protect; a suite without it re-admits the predicate the owner rejected outright. |
| M8-G — the ask at the persist gate | a row-E draft at each of the five writers → `mustAsk` true, nothing written | the **two canned-intro writers** with their fixed classic message → `mustAsk` **false**, and the record **is** written. The plan calls them "never members"; a suite that never runs them cannot tell a vacuous gate from a working one. |
| M4-b — the lenient filter names its drops | a top-level Thumbnail-11 → filtered **and named** | a fully supported set → filtered set equals input, **and the notice is empty**. |
| M3-b — ingress residue is loud | a message carrying a select menu → import succeeds, notice names the select | a message whose components are all supported → import succeeds, **notice empty**. Without it, "always show a notice" passes. |
| M7-a — flag-only records open V2 | `{content:"hi", flags:32768}` → **V2** | `{content:"hi"}` → **Classic**, and `{components:[<container>]}` (no bit) → **V2**. Both directions of `hasFlagV2 \|\| hasStructuralV2`. |
| M1-d — change detection sees V2 | a component-only edit → `hashMessage` **differs** | a `_key`/key-order-only difference → `hashMessage` **equal**. The plan states both; the suite must carry both, or "hash everything differently" passes. |
| M3-c — no empty success | an import failing the floor → **no** upsert issued | a valid import → the upsert **is** issued. A gate that refuses everything passes the negative alone. |

### Conjunct-isolation obligation

Every conjunct of a compound predicate must be the **sole carrier of the decision in at least one
fixture**. A conjunct correct only because a sibling covers for it satisfies the criterion by
accident, and the accident ends at the next *"simplify the redundant check"* refactor. This is not
answerable by reading — mutually masking conjuncts are invisible to review and to a green suite.

| Compound predicate | Conjuncts | Fixture in which each is sole carrier |
|---|---|---|
| M7-a's mode predicate — `hasFlagV2 \|\| hasStructuralV2` | `hasFlagV2`; `hasStructuralV2` | flag set, **no** V2 components (5712's shape) isolates the first; V2 components, **bit clear** (M2-a's second bounded exception) isolates the second. Both must be present or the disjunction is untested as a disjunction. |
| M8's cell selection — `(bit, hasV2Components, hasClassicContent)` | three inputs, eight cells | **all eight cells**, each as its own fixture. The plan's table has eight rows; the suite must have eight fixtures, not five (one per row) — five fixtures leave three cells whose row assignment is never observed. |
| `stripKeys` after M8-G | the `flags \|= IS_COMPONENTS_V2_FLAG` line (**kept**); the two `delete` lines (**retired**) | a V2 draft **with** a classic body: the bit must still be ORed in **and** `content`/`embeds` must survive. One fixture isolates both, in opposite directions. A retirement that also drops the OR passes any fixture with no body. |
| `showComponentButton` — `isEditing && isV2Mode && showComponentsEditable && canAddComponent` | four conjuncts | see the closure of the critic's pass-5 assumption below; this one is **the checklist's**, not the suite's. |
| M8-F parity — same disposition at both surfaces | modal Load; New Message paste | the **same eight fixtures driven through both entry points**. Two fixture sets that happen to agree is not parity; one set through two doors is. |

### Guard-observation obligation (mutation), and the bounded sweep IS-1..IS-6 each owe

**Every guard and branch must be observed failing at least once** — by mutating the source or the
fixture — before its test counts as evidence. A test never seen red is not evidence that the thing
it guards is guarded. Each entry in the Irreversible Side-Effect Register carries a **bounded
mutation sweep** at Phase 2, seeded at that guard's branch conditions and decision constants:

| Register entry | Mutation seeds |
|---|---|
| IS-1 / IS-4 | `requiresChoice` forced `false`; `mustAsk` forced `false`; the row-E cell reassigned to row C; the gate omitted at each of the five writers in turn |
| IS-2 | the send gate's `allowSave` forced `true` |
| IS-3 | the `delete` lines reinstated; the `flags \|=` line removed; `hasV2` inverted |
| IS-5 | the dropped-set field dropped between converter → `store` → `getFromCode` |
| IS-6 | `switchToV2` returning without setting the bit |

Every **survivor** is recorded with a disposition; **equivalent mutants are recorded, not dropped**.
A spec written to close a survivor counts as evidence only once it has been seen **red under the
mutant it targets** and green against the shipped code.

**Instrument-score discipline.** No mutation or sweep number is reported at Phase 2 without its
enumeration predicate and exclusions **in the same sentence**. The quotable unit is *"N sites
matching `<predicate>` in `<scope>` — excludes `<forms>`"*, never *"N/N"*.

### Telemetry Validation

013 is not incident work and adds no logging. What it adds is **user-facing notices** — which are
not telemetry and must not be tested as strings. The rule that carries over: assert **structured
fields**, never message text. For 013 that means the resolver's `noticeClass` and `dropSet` are the
assertion targets (a stable, enumerable shape), and the rendered wording is the checklist's. The
plan's own M8-A/M8-C *"nothing shown"* criteria depend on this: *"the reconciler reports no notice
for the cell"* is assertable; *"no string appears"* is not.

---

## The critic's four transferred assumptions — re-derived, and their state now

All four were located in the critique at `d38f057` and re-derived here rather than taken from the
brief. **Two are closed by this pass.**

### Pass 5 — `canAddComponent` over an empty `components` array — **CLOSED, and the seed count is TWO**

The critic assumed `canAddComponent` is true over `components: []` so that **5842 is an F-1 seed as
well as 5712**, and did not read its definition. Falsity signature named: *5842 opened in V2 mode
shows no add-component control, so M8-G's production-reachable form has one seed, not two.*

**Read at `c85945f`** (`src/components/DiscordMessageEditor/index.tsx` — note the file is under
`src/components/`, not the `src/app/message/m/[id]/_components/` path the plan's inventory implies):

- `canAddComponent = totalComponentCount < MAX_TOTAL_COMPONENTS` (line 192)
- `countTotalComponents` (line 61) iterates the array; over `[]` it returns **0**
- `MAX_TOTAL_COMPONENTS = 40` (`src/constants/index.ts`)
- `const [components = [], setComponents] = useStateSetter(message, 'components', …)` (line 113) —
  a **missing** `components` key defaults to `[]` too

**0 < 40 → true.** The assumption holds. **5842 is an F-1 seed, and so is 5712** (whose absent
`components` key takes the same default). M8-G's production-reachable form has **two** seeds. The
checklist states which it exercises (BC-11) and now can name both.

**But the read turned up a conjunct neither the plan nor the critique examined.** The critique quoted
`showComponentButton = isEditing && isV2Mode && …`; the elided tail is **two** conjuncts, not one:

```
showComponentButton = isEditing && isV2Mode
  && !!editableState?.showComponentsEditable      // ← neither document names this
  && canAddComponent;
```

`showComponentsEditable` is `useToggleState(true)` in `useEditableState.ts` — **default true, and
user-toggleable**. So it does not falsify the seed, but it *is* a control the observer can switch
off. **BC-11 therefore states the precondition explicitly** ("with the components section shown"),
because an observer who has collapsed that section will report the ask as absent and file a defect
against working code. — **F-QA2 companion; recorded in BC-11, not as a plan finding.**

### Pass 3 — V2 mode has no route to `content`/`embeds` — **CLOSED**

The critic left live the assumption that *V2 mode has no route to `content`/`embeds` other than the
two `isClassicMode`-gated editors*, owner QA's M7-a checklist. **Read at `c85945f`**
(`src/components/DiscordMessageEditor/index.tsx`):

- content editor: `<NullableComponent show={isClassicMode || !isEditing}>` (line 283) wrapping
  `<ContentBody … showEdit={isEditing && isClassicMode && !!editableState?.showContentEditable} />`
- embeds: `<NullableComponent show={(isClassicMode || !isEditing) && embeds.length}>` (line 313)
- the V2-mode block, `<NullableComponent show={isV2Mode && isEditing}>` (line 297), renders
  **`<Author>` only** — `username` and `avatarUrl`, not `content` and not `embeds`

While editing in V2 mode (`isEditing && isV2Mode`), both `isClassicMode || !isEditing` guards are
false, so **neither editor renders at all**. The assumption holds, with one precision the plan does
not state: **`username` and `avatarUrl` *are* editable in V2 mode**, correctly — they are neither
`content` nor `embeds` and are not part of row E's cell. **CLOSED.** M8-G's *"the composer cannot
compose a row-E draft [except by retaining one]"* rests on solid ground.

### Pass 2 — a direct `message.upsert` can mint a row-D or row-E record — **CONFIRMED by execution, and it is mine**

The critic assumed the server's upsert input runs `discordMessageShape`, not the import shape, so a
direct `message.upsert` call can mint a shape M8 never saw; QA's tRPC-boundary test owns it.

**Confirmed by execution, not assumed**: this pass's probe asserts
`discordMessageShape.safeParse({content:'hi', flags:32768}).success === true` — the server's write
boundary admits the row-D shape, and `flags` is accepted at `src/server/api/utils/shapes.ts:199` in
the **base** shape both `discordMessageShape` and `discordMessageImportShape` extend. The residue is
real. **QA owns it**, and it is written into the Phase 2 obligation set as the **tRPC-boundary
test**: over the eight cells, `discordMessageShape` accepts what it accepts *unchanged* (013 does not
narrow the server contract), and M8-G's gate is what meets such a record at its **next** save — which
is, in the plan's words, the ruling's point.

### Pass 4 — Discord accepting `content:""` / `embeds:[]` under the V2 flag — **STILL LIVE, and correctly not mine**

The critic assumed Discord accepts, on a webhook send with `IS_COMPONENTS_V2_FLAG` set, a wire
payload carrying `content: ""` and `embeds: []` rather than omitting the keys — the form the send
path emits if the implementer retires `stripKeys`' deletion and leaves `send/page.tsx` alone. Not
tested against Discord. Falsity signature: *a V2 send from `send/page.tsx` returning a Discord 4xx
after deploy for a draft that sent at `c85945f`*.

**Owner of closing it: the implementer, at M8-G's send-path decision.** QA does not take it —
closing it requires a live Discord call, which no gate here makes, and the decision that creates or
avoids it is a design decision the plan explicitly assigns to the implementer. What QA adds is the
**detector**, as a post-deploy-observable register row (**BC-12**), so the assumption is routed to an
observation rather than shelved. IS-2 records why it matters: publishing to Discord is the one
irreversible act in 013's radius whose new behaviour has no pre-deploy instrument.

---

## Blocking Release Condition Register — chain 013

> **BLOCKING RELEASE CONDITION** — each item must be executed and recorded in the UAT document
> before merge/deploy, except the rows classified **post-deploy-observable**, which gate the
> **chain's closure** and never the release act.

This is chain 013's **single** register. Chain 012 has its own; nothing here appends to it. Any
later gate-scoped QA pass on 013 **appends** to this register rather than minting a parallel ID
space, and names this document as the register it appended to.

> **Standing note — this list is point-in-time.** Later stage documents are **authoritative** on
> each item's execution state: first the UAT document, then the deployment record. A reader landing
> here must not take a `State` column as current. A stage that discharges a row adds one dated line
> here naming the discharging document.

**Class**: `PRE` = observable pre-release, must reach a terminal state before the release act.
`POST` = post-deploy-observable, gates chain closure only.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode (operator terms) | Owner | State |
|---|---|---|---|---|---|---|---|---|---|
| **BC-1** | PRE | M2-c: the Load confirmation names what changes — which top-level types are added/removed, and whether the message type changes | operator observation (no harness, F-QA4/assumption 5) | UAT agent; fallback owner | chain tip deployed to any environment with a stored V2 message | the confirmation names both differences before anything is committed | *A user confirms a Load believing nothing is lost, and loses every component. The dialog is the only thing standing between them and it.* | uat | Not started |
| **BC-2** | PRE | M3-b (URL + webhook): the import dialog names which component types were **not** carried | operator observation | UAT agent | a Discord message carrying a select menu is reachable by URL | dialog shows supported components **and** a notice naming the select | *An import silently returns a message missing half its controls, and the user ships it that way.* | uat | Not started |
| **BC-3** | PRE | M3-b (bot code path): the **editor** shows the same notice on load | operator observation | UAT agent | bot `Get Message` run on the same message, within the 1h store TTL | editor opens with supported components and the same notice | *The code path has no dialog, so a silent drop here is invisible until the message is sent wrong.* | uat | Not started |
| **BC-4** | PRE | M3-c: an import failing the floor keeps the dialog open with the error and **does not navigate** | operator observation **paired with** the suite's no-upsert assertion (EC-3) | UAT agent | chain tip deployed | dialog stays, error shown, no new message created | *The user lands on a blank message that looks saved. This is flow 6/11/12/13 — the defect 013 exists for.* | uat | Not started |
| **BC-5** | PRE | M4-c: pasting a folder-page export shows the composer's floor error, not a green state | operator observation | UAT agent | chain tip deployed | *"Message must have content, embeds, or components."* | *Green means safe. A green state over an empty object teaches the user to trust it.* | uat | Not started |
| **BC-6** | PRE | M4-b: the lenient filter **names** the dropped types at both JSON surfaces | operator observation | UAT agent | a paste carrying a top-level Thumbnail-11 | the notice names the type | *Today it is silent; a component vanishes with no trace, at the surface users reach for when the UI cannot express something.* | uat | Not started |
| **BC-7** | PRE | M8-B: paste `{"components":[<container>]}` → V2, bit set, **visible warning** | operator observation | UAT agent | chain tip deployed | editor in V2 with the container **and** a warning | *Silent acceptance means the user never learns their JSON was incomplete; D17 row B says warn.* | uat | Not started |
| **BC-8** | PRE | M8-D: paste `{"content":"hi","flags":32768}` → **Classic**, content intact, bit cleared, **visible warning**, no V2 error | operator observation | UAT agent | chain tip deployed | Classic, `hi` present, warning shown | *This is 5712's own repair route. If the warning is missing the user cannot tell a repair from a corruption.* | uat | Not started |
| **BC-9** | PRE | M8-E: paste `{"content":"hi","components":[<container>]}` → **two options**, each naming its drop; **nothing created** until one is taken; dismissal leaves message and pasted text unchanged | operator observation **paired with** the suite's `requiresChoice` assertion (EC-3) | UAT agent | chain tip deployed | two options; nothing created before a choice; both outcomes verified by repeating with the other option | *Today this silently strips the content. If the choice does not appear, D17's governing principle is not shipped — content is still lost without asking.* | uat | Not started |
| **BC-10** | PRE | M8-F parity: **the same eight-cell fixture set** produces the same row, drop set and notice class at the modal Load **and** the New Message paste | the suite (R9's own mitigation), **plus** spot observation of two cells at both surfaces | suite is primary; UAT agent for the spot check | M8 implemented | identical dispositions, cell by cell | *One object treated two ways is exactly the hazard R9 names; a user who learns the modal's behaviour is then surprised by the paste.* | qa (suite) | Not started |
| **BC-11** | — | **SPLIT 2026-08-24 into BC-11a (the mint) and BC-11b (the ask). This row is not executable as written — read those two.** The condition spanned two instants with opposite timing: the mint is decidable *only before deploy* and the ask *only after the chain tip is up*, so one row made the first look reschedulable when it is not. Raised by `uat-hooks-013` (`b6e9662`); the split is QA's, the register being QA's. Nothing about the condition was withdrawn — both halves survive verbatim below | — | — | — | — | — | qa | **SUPERSEDED by BC-11a + BC-11b** |
| **BC-11a** | PRE | **The two M8-G seed records exist** (supersedes the mint half of BC-11). Before the release act, paste `{"content":"hi","flags":32768}` and `{"content":"hi","flags":32768,"components":[]}` into **New Message** on production `c85945f`, creating one 5712-shaped and one 5842-shaped record. **The route expires at deploy** — after 013 no surface writes the shape (M8-D, M4-a, the toggle) — so this was decidable *only* in the window that closes at go-live | an authenticated human pressing Save in New Message; there is no non-human primary — every procedure in `message.ts` is `protectedProcedure` (re-derived here at `c85945f`: **8 procedure definitions, 8 protected, `publicProcedure` count 0**), so there is no anonymous mint route | **subject**: the owner, who performed it. `uat-hooks-013` reported it could not be the subject — no session, no browser, empty `DISPLAY`, no automation — and improvised nothing | was: now, the route being open on production; **latest-decidable was the deploy**, and it was met inside that window | both records appear in the messages list. **A single successful save refutes 'the route is closed' by construction** — this is not a rate | *If the seeds had never been minted, M8-G's production-reachable form would have become permanently unobservable the moment the owner's D19 repair landed — the one-way door D20 was ruled to prevent.* | uat (records the attestation; the observation was the owner's) | **EXECUTED 2026-08-24 — TERMINAL.** Per `uat-hooks-013`, `uat/013-...-uat.md` rev 4 (`838b180`), which is authoritative on this row's state. Owner's attestation, **quoted verbatim**: *"Re: UAT's JSON message - both are created. 5855 and 5856"* — given unprompted in the steering session, 2026-08-24, after he was handed the two JSON payloads. **Two residues, recorded not asserted**: (a) the shape-to-ID mapping is **not** established — he named two IDs, not which is which, and BC-11b exercises both by its own terms, so nothing turns on it; (b) the words reached this register by citation of UAT's document, the owner having spoken in the steering session rather than written into a stage document — the plan's evidence rule makes his attestation complete evidence where he is the designated observer, and I note the route without reopening it |
| **BC-11b** | PRE | **The ask fires on save over a seed** (supersedes the observation half of BC-11): open a **5712-shaped** record (V2 mode, V2 error visible, components section shown), add one container, press **Save** → the ask appears naming both drops and **nothing is written** until one is taken. Same at **Save As**. Repeat on the **5842-shaped** record. Whether the seeds are removed afterwards is not ruled and is not a gap (D20) | operator observation of a **UI event**, **paired with** the suite's `requiresChoice` assertion (EC-3). The oracle is *"the ask appears"*, so the primary needs a browser — which decides the subject on its own, at any SHA and in any environment | **subject**: any party holding a **browser** and a **chain-tip environment carrying the shape**. Today that is the owner *because no session on this box holds browser tooling* — **a fact about tooling, not a plan requirement**, and it must not harden into the latter. `uat-hooks-013` re-derived (not adopted) that it cannot be the subject: empty `DISPLAY`, no browser, no automation. **Fallback**, written by the planner and **conjunctive**: *"Where the repair has already run **and** no seeded environment is available, the suite is the evidence and UAT records the reason — the D19 repair preceded the deploy — not 'no member to observe'."* Seeds exist and the repair has not run, so the fallback is **not currently available** and this row is still owed | **the chain tip deployed to any environment carrying a 5712-/5842-shaped record** (BC-1's convention; records 5855/5856 qualify). Not decidable before both | the ask appears; nothing written before a choice; both outcomes verified by repeating with the other option. The save leg is a **conflict-update**, and `data` is written verbatim there as well as on insert (executed, EXT-B) | *This is the whole of D18. If the ask does not appear, the save path is still silently destroying the user's classic body — the defect the owner folded into 013 — and the suite alone cannot show it working for a real user.* | uat (records and drives; the observation needs a browser-holder) | **NOT EXECUTED** — non-terminal, blocks an unconditional approval (`uat-hooks-013`, `838b180`, whose Appendix A holds a one-shot observation script, not executed and not evidence). **Precondition, re-stated from Phase 1's read and carried in that script**: `showComponentButton` requires `isEditing && isV2Mode && showComponentsEditable && canAddComponent`; an observer who has collapsed the components section will see no add-component control and wrongly report the ask as unreachable |
| **BC-12** | POST | M8-G's send-path form is accepted by Discord: a V2 message that sent at `c85945f` still sends after deploy | the existing post-deploy observable *"Save As on a V2 message yields a V2 copy that sends"* (Validation item 6), and M3-a's send form | UAT agent, then owner in normal use | the deploy is live | **the send succeeds. A single 4xx refutes by construction** — this is not a rate to accumulate; one failure closes the critic's pass-4 assumption negatively and is a hotfix trigger | *Every V2 send starts failing at Discord because the wire form gained `content:""`. Users cannot send, and the cause is invisible in the app.* | implementer owns the decision (M8-G send path); uat owns the observation | Not started |
| **BC-13** | POST | M3-b's pre-deploy-code residue: bot codes stored **before** go-live carry no dropped set, so the notice cannot render for them | elapsed time against the store's 1h TTL | no human subject — decided by the clock | one hour after the deploy SHA is live | the residue is empty | *For one hour after deploy, a code import can drop components silently — the exact behaviour M3-b fixes. Nobody will connect the two.* | devops (records the window in the deployment record) | Not started |
| **BC-14** | POST | **The user-reported defect is fixed in production** (handoff `8f3fa8c3`, observations 1/2/5/6/7): Save As on a V2 message yields a V2 copy with every component; Message JSON shows the components; a component-only edit in one tab raises *"Message Update Detected"* in another and a no-op save raises nothing | operator observation in production | owner, in normal use; fallback UAT agent | the deploy is live | all four observed | *A deploy having happened says nothing about the fix having worked. The failure's signature here is **absence** — a copy that is empty, a prompt that never fires — and absence is what nobody reports.* | uat | Not started |

### Register maintenance log

One dated line per change of state or structure, naming the discharging document.

- **2026-08-24 — BC-11 SPLIT into BC-11a and BC-11b** (qa, this pass). Raised by `uat-hooks-013`
  (`b6e9662`): the condition spanned two instants with opposite timing, which made the mint half look
  reschedulable when it was not. BC-11 is retained as a pointer, not deleted; **no requirement was withdrawn**,
  both halves survive verbatim. This is an **append within the same ID space**, not a parallel register.
- **2026-08-24 — BC-11a EXECUTED, terminal.** Discharging document: `agent-output/uat/013-components-v2-editing-surfaces-uat.md`
  rev 4 (`838b180`), `uat-hooks-013`. The owner minted both seeds and named them (5855, 5856); his attestation is
  quoted verbatim in the row. **The seeds must not be deleted — BC-11b runs against them.** That instruction
  **originated with steering, not as an owner ruling**; D20 expressly left the seeds' disposition unruled, and
  the provenance is recorded so it is not later read as his.
- **2026-08-24 — BC-11's Subject and Earliest-decidable cells corrected** (qa, this pass), on two defects
  `uat-hooks-013` reported: the Subject named a party who could execute neither half, and Earliest-decidable
  stated the mint's precondition only. Both are now carried by BC-11a/BC-11b, the second using BC-1's
  environment convention. **Neither changed what the row requires** — they changed whether it can be scheduled.
- **2026-08-24 — D20's re-derivation clause: RESOLVED on the substance**, per `838b180`. Mintability is
  established **by execution in production**, which is a stronger derivation than the module-level probe the
  clause contemplated. **QA's probe extension does not discharge that clause and is not claimed to** — the clause
  was UAT's, and a second QA instrument would still have been QA's word.
- **2026-08-24 — successor entry point for BC-11a/BC-11b state.** `uat-hooks-013` reports it is near its
  run-length ceiling and that its document is current at every revision and **resumable from itself**. Both
  registers were reconciled row by row before it said so, and agree. A successor UAT session's entry point is
  therefore `agent-output/uat/013-components-v2-editing-surfaces-uat.md` (rev 7, `92e3dbf`) — **not** this
  document, which remains point-in-time on row state per the standing note above. **Updated 2026-08-24 to rev 8
  (`831d053`)** — rev 8 moved no row state, adding only the F-QA14 concurrence and a **Run Record and
  Resumption** table. That table is why the pointer is worth moving: it records BC-11a and D20's clause as
  terminal, **BC-11b as owed and blocking** with Appendix A as its script, U-1 as steering's, and **the UAT
  gate itself — predecessor checks, value assessment, the BC-1..BC-10 walkthrough, the release decision — as
  entirely unstarted**. It also states that the session ended near its ceiling with its work **complete, not
  truncated**, so the stop is not read as an interruption.

**Why BC-14 exists**: a chain fixing a user-reported defect registers at least one post-deploy
observable that distinguishes *fixed* from *unfixed* in production. 013 is such a chain
(handoff `8f3fa8c3`, seven owner observations), and Validation item 6 lists the observations without
binding them to a row that gates closure. This is that row.

---

## Required tests, by milestone

Executable assertions the Phase 2 audit will look for. **Test cases are QA's; the TDD sequence is the
implementer's** — every one of these is a test that must be **written first and seen red at the chain
base** before its code exists, and the implementation doc's TDD Compliance table must carry a row for
each new function or class with a valid failure reason.

### Unit (Vitest, `src/utils/__tests__/`, `src/server/api/utils/__tests__/`)

**M1** — `standardizeMessage` reference list is empty at the three confined site classes (the
instrument is the reference list, captured in the implementation doc, reconciled with
`grep -rc standardizeMessage src bot`); `stripKeys(makeEditable({data: d})).data ≡ d` modulo `_key`s
and key order over the **generated** M1-b partition (classic-only; V2-only across each supported
top-level type; containers across each supported child type; classic + Action Rows; with/without
`username`/`avatar_url`/`allowed_mentions`; with/without `flags`) — expectations authored as literal
stored forms (EC-5); the JSON modal seed and Copy output parse through `discordMessageImportShape` to
`≡` the stored `data`; **`hashMessage` in both directions** (differs on any component/field/bit
change, bounded by genuine 32-bit collisions; equal modulo `_key`s and key order) — **from zero
existing coverage** (F-QA7); producer and consumer compute the same function over the same form.

**M2** — round-trip closure over the M1-b class **plus** the two production shapes, outside rows B, D
and E; the two bounded exceptions asserted **as their own expected values**, not as failures
(row-D outcome for a bit-over-classic-content record; row-B outcome for V2-components-bit-clear);
row-C records (bit over Action Rows, no classic content) round-trip losslessly with the bit kept and
nothing shown.

**M3** — `discordResponseToMessage` carries components **and** copies the flag bit **exactly when
Discord's message carried it**, over both partition halves (at least one V2 top-level type; all
Action Rows under the bit) — **from zero existing coverage** (F-QA7); the dropped set is reported
alongside `data`, and `store` → `getFromCode` carry it unchanged; the bot `Pick` requests
`components` and `flags` (see F-QA5 — this spec is not collected today).

**M4** — `SUPPORTED_TOP_LEVEL_TYPES` ≡ the discriminator values `topLevelComponentShape` accepts,
**asserted over the sets themselves** (Thumbnail-11 is the instance, the equality is the class); the
same for the container child sets; the create writer's at-rest property (V2 components ⇒ the bit is
carried) with its one-directional bound explicit; the floor's agreement over the pasted class.

**M7** — the extracted mode predicate over both disjuncts in isolation (EC-1), including the
**no-`components`-key** case; `applyModeSwitch` over the enumerated prior-draft class, with **every
non-V2 bit preserved in both directions** (D7's residue — a fixture carrying `4` and `4096` alongside
the V2 bit); the extracted V2-patch-warning condition over its class (EC-2).

**M8** — the resolver over **all eight cells** (not five), each fixture's expected row / drop set /
notice class stated from the cell; the **same eight fixtures driven through both entry points**
(BC-10); `stripKeys`' post-M8-G identity (input modulo `_key`s **plus** the bit ORed from structure,
with `content`/`embeds` **surviving** — the conjunct-isolation fixture); `gateBeforePersist` over the
five IS-1 writers including the two vacuous ones as positive controls.

### Integration (tRPC input boundary)

`optionalIdMessageShape` / `discordMessageShape` accept the eight cells unchanged (013 does not narrow
the server contract) — the pass-2 boundary residue, confirmed by this pass's probe; a record minted
directly through that boundary meets M8-G's ask at its **next** save rather than being silently
rewritten.

### No e2e

Per the plan and assumption 5. The consequence is the 14-row blocking register above, not a gap.

---

## Assumption Not Checked

**This pass assumes the extracted predicates EC-1 and EC-2 ask for can be lifted out of
`MessageProvider/index.tsx` and `send/page.tsx` without changing what those components do — and it
does not read either component's surrounding closure to check what `detectMode` and `messageHasV2`
capture from scope.** `detectMode` is declared inside the provider's body and its four call sites
pass a local `tmp`; if it closes over provider state beyond its argument, an extracted pure predicate
is a *different function* and M7-a's suite would be asserting over something the product does not run.
**Falsity signature**: the extracted predicate and the inline one disagree for some fixture — visible
as M7-a green in the suite while a record still opens in the wrong mode in the app, or as the
implementer reporting that extraction requires threading provider state through the call. **Stage that
owns closing it**: the **implementer**, at M7 — before writing M7-a's spec, by reading `detectMode`'s
closure and reporting in the implementation doc either that the extraction is faithful or that EC-1
needs a different shape. Named again in the handoff below so it is routed, not shelved.

---

### Assumption Not Checked — the probe-extension pass, 2026-08-24

**This pass assumes that a record whose `data` reaches `buildMessageValues` verbatim is also read back verbatim — and it does not examine the read path at all.** Every assertion here stops at the values handed to the insert/update statement. `getMessage` and whatever `MessageProvider` runs on load could normalise, coerce or default `flags` on the way *out* of the database, in which case seeds 5855/5856 are stored as row-D members and still open as something else — and BC-11b's observer would find the components section, or V2 mode, simply absent, with no way to tell a read-path defect from the ask not firing. **Falsity signature**: BC-11b's observer reports that record 5855 opens in **Classic** mode with no V2 error banner, while the suite's M8-G assertions are green. **Stage that owns closing it**: **QA at Phase 2**, in the M7-a mode-derivation coverage — the extracted `detectMode` predicate must be exercised over a fixture built the way the read path delivers it (`flags` as it comes back from storage), not only over a literal. Named again in the handoff so it is routed, not shelved.

---

## Findings

| ID | Severity | Finding | Routes to |
|---|---|---|---|
| **F-QA1** | Medium | **RESOLVED 2026-08-24 — D21** (plan rev 13, `e2495b0`): the implementer adds a `typecheck` script to `website/package.json`, making Validation item 1 true as written. The validation step is *not* reworded; a planner pass to reword it was put to the owner and declined with the alternative in front of him. Script body is the implementer's, not ruled. `package.json` is touched without joining the 18-file inventory. | CLOSED — implementer enacts |
| **F-QA2** | **High** | **M7-a's instrument is not executable.** `detectMode` is a non-exported function inside the `MessageProvider` component body (`src/providers/MessageProvider/index.tsx:112`); no importable path to the value M7-a asserts over. Entry condition **EC-1**. | implementer (M7, before writing the spec) |
| **F-QA3** | **High** | **M7-c's instrument is not executable.** `messageHasV2` / `showV2PatchWarning` are inline consts in `send/page.tsx` (lines 160, 163); `grep -rc` over all test files → no match for either. Entry condition **EC-2**. | implementer (M7) |
| **F-QA4** | **High** | **M3-c, M8-E's negative and M8-G's negative all name call-site observation inside React components/hooks**, which `environment: 'node'` + `include: src/**/*.test.ts` + no `@testing-library` cannot make. Entry condition **EC-3**: the disposition and the persist gate must be pure importable functions returning a decision, which is the plan's own R9 mitigation made executable. Skipping it moves ~12 criteria onto the blocking manual checklist the plan never budgeted for. | implementer (M8, before writing any M8 spec) |
| **F-QA5** | Medium | **`bot/**` is outside the vitest `include`.** M3 opens `bot/serverCommands.ts`; a spec for it is silently not collected. Remedy: widen `include`, or assert the `Pick` from a `src/` spec using the existing `bot` alias. | implementer (M3) |
| **F-QA6** | Medium | **The red-test domain is 7 files, not 4 or 6.** `src/server/api/utils/__tests__/shapes-v2.test.ts` (`discordMessageImportShape` 16, `filterSupportedComponents` 2, `SUPPORTED_TOP_LEVEL_TYPES` 1, `topLevelComponentShape` 1) is in neither the plan's list nor M-10's instances. Third recurrence of the L-7/M-10 shape in one chain. | QA (re-anchoring is mine); retrospective (the recurrence) |
| **F-QA7** | Medium | **`hashMessage` and `discordResponseToMessage` have zero existing test coverage** (`grep -rc` over all 22 test files → no matching file for either). M1-d and M3 carry the plan's largest *new* test burden while appearing in no coordination list. | implementer (TDD load); QA (Phase 2 scrutiny) |
| **F-QA8** | Medium | **`grep -rc "message\.upsert"` is unsound for IS-1's writer class** — it returns `MessageProvider/index.tsx` (constructs the mutation) and misses `useApiMethods.ts` (calls it). The plan's reference-following count of five writers is correct; Validation item 2's grep discipline must not be carried over to this class. | implementer (M8-G re-derivation) |
| **F-QA9** | Low | **`src/env.mjs` validates env at module scope and throws**, reached via `src/constants/index.ts` from `~/utils`. Every new spec needs the three `vi.mock` lines. Found by executing (first probe run: `0 test` collected). | implementer (all new specs) |
| **F-QA10** | Low | **No coverage provider** (`@vitest/coverage-v8` absent). QA will report coverage as the per-criterion mapping table rather than a percentage; the plan's criteria are property-shaped and a line number would not answer them. | QA (Phase 2 reporting form) |

| **F-QA11** | Medium | **New Message's Save is enabled in a state the write boundary refuses.** `NewMessageModal` opens with `useState(guildId ?? '0')`, `/message` passes no `guildId`, and `disableSave` checks `loadedMessage`/`isSavingMessage`/the name — **not the guild**. `'0' &#124;&#124; null` sends `guildId: '0'`, and `discordIdShape` is `/^[0-9]{17,23}$/`, so the boundary refuses it. Executed both directions at `c85945f` (EXT-A): `'0'` refused; the *My Account* item's value `''` reaches the boundary as `null` and is accepted; mutant M5 (regex widened to `{1,23}`) kills the control. **Same family as MED-6** — an enabled control that cannot do what it offers. **Pre-existing at `c85945f`, untouched by 013 and outside its scope**; recorded, not routed as a 013 fix. Its live consequence was BC-11a's precondition: an operator who pressed Save without touching **Save To** would have got a validation error and reasonably reported the mint route as *closed*. **BOUNDED 2026-08-24 by execution (EXT-C), not by read** — raised at read level by `uat-hooks-013` (`9e6b43e`) and re-derived here on a predicate taken from the class definition rather than from this instance's phrasing: **4 sites in `src/` at `c85945f` match *builds `message.upsert`'s `guildId` from a value the user picked this session* — excludes sites whose `guildId` comes from a loaded record (`useApiMethods.ts:63`) and sites feeding procedures other than `message.upsert` (`GuildProvider`, `useParsePathname`), each named in the instrument.** **This is 1 of the 4.** `SaveAsMenu` (`''`), the folder page (`folderId !== '0' ? folderId : undefined`) and `copyIntroMessage()` (omits the key) are all clear — and **two of them guard this exact sentinel explicitly**, so F-QA11 is a single-site oversight rather than a design choice. Mutants M6/M7 kill both sibling reads. | steering → owner (pre-existing, out of scope; a held item, not a 013 fix round) |
| **F-QA12** | Low | **QA's Phase 1 probe asserted the write boundary one layer inside the real one, and stopped before the persist leg.** Raised by `uat-hooks-013` at read level (`b6e9662`) and **re-derived here by execution**: `message.upsert`'s input is `z.object({ message: optionalIdMessageShape })`, so `name` and `guildId` were unexercised; and `buildMessageValues` writes `data: message.data` **by reference**, which is what makes a minted record a *member of M8-G's class at rest* rather than a request the boundary accepted. Both are now covered — 24 assertions, five killed mutants. **This is a defect in QA's own instrument, found by a peer**; recorded as such rather than absorbed. | QA (closed by the extension); retrospective (a probe scoped to the schema it could import rather than the one the procedure uses) |

| **F-QA13** | Medium | **Phase 2 constraint on detector selection, from `uat-hooks-013`'s finding U-1** (`5708a44`, routed by UAT to steering as plan-touching; recorded here, not adopted). The seeds 5855/5856 are **permanent members of `flagStructureDisagreement`**, so both limbs of the plan's assumption-7 falsifier now fire by construction: after the owner's D19 repair the classifier reads **2**, not the **0** he expects, so **a working repair will look like a failed one**; and a seed opening in V2 with the composer's V2 error is BC-11b's **precondition**, not a failure signature. **QA must not register or lean on either limb as a Phase 2 detector without naming the residual.** R7's first limb is separate and is now settled by execution (EXT-D), not inherited: the seeds carry `valid = false` and stay out of `flagStructureDisagreementValidTrue` — **but the boolean alone does not discriminate**, since a username-less message is refused for an unrelated reason; key on the reason string. Adopted no remedy: the R-5 line is devops's, the falsifier's wording is the planner's, the seeds' disposition is the owner's. | QA (Phase 2 detector selection); steering already holds U-1 from UAT |

| **F-QA14** | Low | **For the retrospective — a lesson from this chain's QA↔UAT exchange, not a defect in the work.** `uat-hooks-013` reached a **sound** conclusion (the seeds carry `valid = false`, so they stay out of R7's `flagStructureDisagreementValidTrue`) by reasoning that carried a trap: the boolean does not discriminate, a username-less message being refused for an unrelated reason. It **declined to send it as an inference** and handed over a stated gap instead, asking that it be executed. Had it sent the inference, **the conclusion would have been adopted and the trap would have travelled with it, invisibly, attached to a correct answer** — the worst case, because nothing downstream would ever have contradicted it. **A stated gap survives being right; a comfortable inference does not.** Generalises this cwd's standing pattern that every instrument defect so far was caught by a *contradiction against a second instrument*, never by re-running the first — here it was caught instead by the originator refusing to let the first instrument stand alone. **The cheapest of the three, and the part the retrospective should keep**, in UAT's sharpening: this is the only one that costs **one sentence at handover** instead of a second instrument later. | retrospective. **Correction, 2026-08-24, mine**: I first wrote this cell as *"both stages concur; recorded in QA's document and in UAT's"* when it was recorded in **mine only** — I asserted a concurrence in a document I do not own and had not read at that revision, which is the same family as citing a document one did not read. `uat-hooks-013` caught it and recorded it at its rev 8 (`831d053`, verified here by `git log` on that path before restating it). **A concurrence present in one document is not one.** The claim is now true; it was not when written. |

**Nothing above changes a criterion.** The plan is `Approved`; a criterion change now needs an owner
ruling. F-QA2/3/4 are conditions on *how* three stated instruments are built, not on what they assert —
each criterion's property is unchanged. Every finding routes through steering, never to the planner.

---

## Instruments captured by this pass

| Instrument | Path | Settles |
|---|---|---|
| Pre-existing seed-route probe | `agent-output/verification/013/probe-preexisting-seed-route/` (README, spec copy, green run, `sha256sum` manifest) | whether UAT can mint its own M8-G seed pre-deploy — **yes**. 7 assertions green at `c85945f`; one discriminating control in the opposite direction; **two mutants run and killed**, tree restored green. |
| **Seed-route extension — real boundary, persist leg, F-QA11's class, R7's first limb** | same directory: `013-qa-seed-route-envelope-and-persist.test.ts`, `run-green-envelope-persist.txt`, extended README, `sha256sum` | **36 assertions green at `c85945f`** in a detached worktree; **nine mutants run, nine killed**, tree restored green after each. **EXT-A** the real boundary (`z.object({ message: optionalIdMessageShape })`), wiring read from the router's bytes at runtime, conjunct isolation on all four envelope fields. **EXT-B** the persist leg — `data` passes through by reference; the conflict-**update** set names `data`, which is the leg BC-11b exercises. **EXT-C** F-QA11's class: 4 sites match the sweep predicate, this is 1 of them, two siblings guard the same sentinel. **EXT-D** R7's first limb: the seeds are `valid = false`, carried by the V2 conjunct alone once a username is supplied. |

**Live path of the probe spec in the `website` tree**:
`src/utils/__tests__/013-qa-phase1-seed-route-probe.test.ts` — collected by the existing vitest
`include`, runs with `pnpm test`. It is **uncommitted**. QA does not hold the chain-branch source
grant (that grant is the implementer's), so committing it is a gated act and is reported to steering
rather than performed. Its bytes are preserved in the capture directory, so nothing is lost if the
tree moves.

---

## Test Coverage Analysis

Not applicable at Phase 1 — no implementation exists. The mapping table (file → symbol → test file →
test case → COVERED/MISSING) is produced at Phase 2 against the implementation doc's files-touched
reconciliation.

## Test Execution Results

Not applicable at Phase 1. **Baseline recorded**, re-executed by this pass and not inherited:

- **Command**: `pnpm test` (`vitest run`) at `c85945f`
- **Status**: PASS — 22 test files, 411 tests, 411 passed, exit 0, 2026-08-24
- **Coverage percentage**: not instrumented (F-QA10)
- **`npx tsc --noEmit`**: not run at Phase 1; Validation item 1's command does not exist (F-QA1)

---

## Handoff

**QA Phase 1 is complete. Status: Awaiting Implementation.**

> **Update, 2026-08-24 — probe-extension pass. Read this before the numbered list below, which is
> point-in-time and partly superseded.** Item 1's *"BC-11 is released"* now reads **BC-11 is SPLIT** into
> **BC-11a** (the mint — **EXECUTED, terminal**, owner attestation quoted in the row) and **BC-11b** (the ask —
> **NOT EXECUTED**, non-terminal, still blocking). Item 1's *"D20 requires UAT to re-derive the mintability"*
> is **RESOLVED on the substance** per `uat-hooks-013` (`838b180`): mintability is established by execution in
> production. **QA's probe extension does not discharge that clause and is not offered as discharging it.**
> Nothing else in the numbered list moved; no criterion moved; this pass issues **no verdict** and Phase 2 has
> still not run.
>
> **Newly routed by this pass:**
> - **F-QA11 → steering, for the owner.** New Message's Save is enabled in a state the write boundary refuses
>   (`guildId: '0'`). **Pre-existing at `c85945f`, outside 013's scope** — a held item, not a fix round. Same
>   family as MED-6.
> - **F-QA12 → the retrospective.** QA's own Phase 1 probe was scoped to the schema it could import rather than
>   the one the procedure uses, and stopped before the persist leg. A peer found it. Recorded as QA's defect.
> - **The probe-extension pass's Assumption Not Checked → QA at Phase 2**: the read path is unexamined, so
>   `detectMode`'s M7-a coverage must be exercised over a fixture shaped the way storage returns it.
> - **To devops and UAT, carried forward**: **records 5855 and 5856 must not be deleted** — BC-11b runs against
>   them. That instruction **originated with steering, not as an owner ruling**; D20 left the seeds' disposition
>   unruled.
>
> **Third-digest addendum, same day.** **F-QA11 is bounded** — 1 of 4 sites in its class, two siblings
> guarding the same sentinel; the held item steering carries should be scoped to `NewMessageModal` alone, not
> to the guild control generally. **F-QA13 → QA at Phase 2**: U-1's residual means neither limb of the
> assumption-7 falsifier may be leaned on as a detector without naming it; R7's first limb is separately
> settled by execution, and anything keying on `valid = false` must key on the **reason**, not the boolean.


Routed, in order:

1. **BQ-1 is resolved — no longer routed.** Owner ruling **D20** (plan rev 13, `e2495b0`): UAT
   mints its own two throwaway seed records through New Message before the release act; the owner
   holds nothing. **BC-11 is released**, its instruction is D20's, and the route **expires at
   deploy** — the seeds must exist before go-live. D20 requires UAT to **re-derive** the
   mintability rather than inherit it (`verification/013/probe-preexisting-seed-route/`).
2. **To the implementer — five entry conditions, EC-1 to EC-5, before M7 and M8 specs are written.**
   Three of the plan's stated instruments (M7-a, M7-c, and the negatives of M3-c/M8-E/M8-G) cannot
   execute against `c85945f` as written. EC-3 is the load-bearing one and is a **design** condition:
   the five-row disposition and the persist gate must be pure importable functions returning a
   decision object, which is the plan's own R9 mitigation restated as a precondition.
3. **To the implementer — the routed Assumption Not Checked**: read `detectMode`'s closure in
   `MessageProvider/index.tsx` before extracting it, and report in the implementation doc either that
   the extraction is faithful or that EC-1 needs a different shape.
4. **To the implementer — the still-live pass-4 assumption** (Discord accepting `content:""` /
   `embeds:[]` under the V2 flag) is closed by **your** send-path decision at M8-G, with **BC-12** as
   its detector. Say in the implementation doc which form you chose and why.
5. **To the implementer — the red-test domain is seven files** (table above), enumerated by
   `grep -rc` at the chain base per M-10. **None is yours to delete or edit**; record every file that
   goes red in the files-touched reconciliation M6 requires, and QA re-anchors them at Phase 2.
6. **A commit approval is owed**: the probe spec at
   `src/utils/__tests__/013-qa-phase1-seed-route-probe.test.ts` is source in the `website` tree and is
   uncommitted. QA has not committed it.

**Recommended next subagent**: the **implementer**, to execute the plan under TDD with EC-1..EC-5 as
entry conditions. QA returns for Phase 2 once implementation is handed off, and the Phase 2 pass will
**re-derive** the tree identity rather than inherit it. **This is not a handoff to the uat agent** —
that line is owed at the end of Phase 2, and Phase 2 has not run.

**Roadmap**: `agent-output/roadmap/` holds only `.gitkeep` (read 2026-08-24, agreeing with the plan's
own note), so **no roadmap epic acceptance criterion changes state on this record**. Recorded here
rather than omitted, per the obligation to note where a document would have been cited.

---

# Phase 2 — Post-Implementation Test Execution

**Executed 2026-08-24 at `4e9da96`. Verdict: QA FAILED.** One blocking defect, F-QA15. Everything
else in this phase passed or is dispositioned below.

## 1. Tree identity, re-derived

Phase 1 committed this pass to re-deriving rather than inheriting, and it did:

| Fact | Instrument | Value |
|---|---|---|
| Branch | `git rev-parse --abbrev-ref HEAD` | `chain/013-components-v2-editing-surfaces` |
| Tip | `git rev-parse HEAD` | `4e9da96043a471d8eafc59c43f92d85d9a279a09` |
| Tip subject | `git log -1 --format=%s` | `fix(013): close MED-6 — dismissed-choice Load is n…` |
| Uncommitted production source | `git status --porcelain src/ bot/` | **none** — one untracked QA probe spec only |
| Regression baseline | Phase 1 anchor | `c85945f` |

Because no production source is uncommitted, `Verified-At` is the **SHA**, and the content-identity
manifest fallback is not owed. The single untracked file is a QA probe and is not product surface —
but it **is** collected by the suite's include glob, which is why §2 reports the tracked-only figure.

## 2. Suite execution — re-run and re-counted, not carried

**Command**: `DATABASE_URL=<unreachable> npx vitest run` at `4e9da96`.

> **Instrument score with its predicate.** **517 tests across 33 spec files matching
> `src/**/*.test.ts` tracked by git — 511 passed, 6 failed.** The predicate **excludes** (a) the one
> untracked QA probe spec, which the glob would otherwise collect and which is in flux on this shared
> tree, and (b) everything outside `src/`: `git ls-files 'bot/**/*.test.ts'` → **0**, so the `bot/`
> tree carries no collected specs at all under this configuration. Running *with* the untracked probe
> gives 524/518/6 — the failure count is identical either way.

**Note on a differing figure.** A subagent pass earlier the same day reported 541 tests. That is not
a contradiction to reconcile away: the untracked probe file's content changed between the two runs
(shared tree, another session's probe in flight). The tracked-only figure above is the stable one and
is the figure this verdict uses. **The six failures are in tracked files in both runs.**

### The six failures, dispositioned

| File | Count | Reason | Disposition |
|---|---|---|---|
| `012-json-editor-repair-path.test.ts` | 5 | `TypeError: standardizeMessage is not a function` | **Re-anchoring work, owned by QA** — M1-a deliberately deleted the symbol. The spec models the *old* pipeline (`standardizeMessage` → `enforceImportMutualExclusivity`), which 013 replaced. **See the sting in §5.** |
| `012-message-mode.test.ts` | 1 | `AssertionError: expected +0 to be 32768`, `switchToV2 … preserves components and flags` | **Re-anchoring work, owned by QA** — M7-b/D16 now sets the bit in `switchToV2`. The spec asserts the pre-D16 behaviour. |

Both files are in Phase 1's declared **red-test domain** (M-10), where Phase 1 recorded: *"None is
yours to delete or edit"* (to the implementer) and *"QA re-anchors them at Phase 2."* So their
redness is **expected and owned**, not a surprise. It nonetheless means the plan's **Validation item
1 ("full Vitest suite green") is not met at `4e9da96`**, and cannot be met until the re-anchoring
lands — which, per §5, cannot honestly be done while F-QA15 stands.

## 3. TDD Compliance Gate — **PASS**, with this pass withdrawing an earlier claim of its own

The implementation document carries a TDD Compliance table with rows for every new/changed pure
function, each naming a **specific** red reason (`TypeError: X is not a function`, or a quoted
`AssertionError` for behaviour changes) rather than a bare "Yes". Several rows go further than the
gate requires — `applyDisposition`'s row re-verified a tightened assertion against the pre-fix source
by `git checkout` and back, because the original `.toThrow()` was vacuously satisfied by the
pre-existence `TypeError`. That is the gate working as intended.

**Self-disclosed lapses, all recorded by the implementer rather than found by QA.** Each is disclosed
in the round it happened, which is what the disclosure rule asks:

| Lapse | Where | QA's assessment |
|---|---|---|
| `messageStore.store` — test written **after** the change (ordering lapse) | implementation doc, note under the M3 rows | **Accepted with compensating evidence**: isolated by `git stash push` on that file alone, re-run, confirmed red for the right reason (`AssertionError: expected undefined to deeply equal [...]`), restored. This is the correct remedy and it was self-reported. |
| `applyDisposition` round-5 row **overstated** its structural enforcement | implementation doc, round-6 correction | **Accepted, and the correction is the right one.** `tsconfig.json` excludes `**/__tests__` and vitest does not typecheck, so the round-5 "structurally unrepresentable" claim held only at the value level. The reviewer executed the control (re-added the deleted parameter; `tsc --noEmit` exit 0 and 32/32 green) rather than reasoning about it. Corrected classification recorded beside the original claim. |
| `gateBeforePersist` has **no** production caller enforcing its signature at the type level | implementation doc, Outstanding Items | **Accepted as disclosed.** Carried to §7 as a standing item, not a gate failure. |

**Exemptions** are claimed only for React event-handler closures over already-TDD-gated pure
functions, each naming the same stated class (*Surfaces Without Automated Coverage*, assumption 5 —
no browser/component harness in this repo). That is a real constraint of this tree, independently
re-confirmed by this pass in §6, not a convenience.

> **CORRECTION — this pass withdraws a claim it made earlier in its own working notes.** Those notes
> recorded that `src/providers/MessageProvider/SaveChoiceModal.tsx` — the chain's only new production
> file — carried **"no TDD row, no exemption"**, and that finding was one of four defects this pass
> was, at the time, heading to **REJECT** on. Re-derived against the current implementation document:
> **that is wrong.** `SaveChoiceModal.tsx` is named explicitly in the M8-G changelog row as *"New
> shared UI"*, and the same row places the three writers' wiring — `SaveChoiceModal` included — in
> the stated exemption class, with its reasoning given. The claim was made from memory of an earlier
> revision rather than from the document as it now stands. **Withdrawing it is recorded here rather
> than quietly dropped**, and the method failure that produced it is named in §8.
>
> With that withdrawn, and the remaining three items being **implementer self-disclosures already
> carrying their own compensating evidence**, the TDD gate is a **PASS**. The QA Failed verdict rests
> on F-QA15 alone — which is a cleaner and stronger position than the one this pass started from.

## 4. Property audit (mandatory step 2b) — example vs class, per criterion

The question asked in writing of every criterion that names an example: *what class is this an
example of, and does the suite enumerate the class?*

| Criterion | Class | Enumerated? |
|---|---|---|
| **M1-a** projection confinement | all `standardizeMessage` call sites | **CLASS ENUMERATED** — `grep -rc` is exhaustive over the source; 0 in product code |
| **M1-b** / **M1-c** faithful copy, whole message | every shape `optionalIdMessageShape` accepts | **EXAMPLE ONLY** — one container→TextDisplay witness |
| **M1-d** hash sees V2 | all pairs differing in any component field | **EXAMPLE ONLY, class closed by construction** — `canonicalize` recurses over every key, so field coverage is uniform. Residual: `normalizeForHash`'s `safeParse`-failure fallback is asserted only "does not throw", never for hash parity |
| **M2-a** round-trip closure | every message loadable in the composer | **NO COVERAGE** — and see F-QA15, which makes it worse than uncovered |
| **M2-b** hand-authored V2 loads as V2 | every import-accepted object with ≥1 V2 type | **EXAMPLE ONLY** — one V2 type witness, resolver only, no surface assertion |
| **M2-c** truthful confirmation | every Load differing in components or flags | **EXAMPLE ONLY, low risk** — `TOP_LEVEL_COMPONENT_LABELS` is a total lookup with a `` `type ${t}` `` fallback, so unlabelled types degrade safely |
| **M3-a** ingress preservation | supported top-level ∪ container children, **× all three entry points** | **EXAMPLE ONLY** — types 12/13/14 and 17-with-children never asserted as *carried*; `getFromUrl` and `useValidateWebhook` never exercised |
| **M3-b** residue bounded and loud | complement of the supported sets over `ComponentType` | **EXAMPLE ONLY** — types 4,5,6,7,8, top-level 11 and the `` `type ${n}` `` fallback unexercised |
| **M3-c** no empty success | every import reaching `message.upsert` failing the floor | **NO COVERAGE** — the plan names "observe the call at its call site"; nothing observes it |
| **M4-a** same object validated and forwarded | every pasteable object | **EXAMPLE ONLY** — 2 fixtures |
| **M4-b** supported set ≡ shape union | the two sets themselves | **CLASS ENUMERATED** — the model criterion of the plan; asserted over the sets, not over members. Caveat: F-QA17 |
| **M4-c** import verdict agrees with floor | every pasted object, floored after M8 resolves it | **NO COVERAGE** |
| **M7-a** mode predicate | all four (flag × structure) cells; **and** every call site | **Predicate: CLASS ENUMERATED** (8 cases, all four cells). **Call-site class: EXAMPLE ONLY.** Untested: masked non-V2 bits into `isMessageV2` |
| **M7-b** toggle sets what it shows | every switch from every prior draft state | **EXAMPLE ONLY** — 4 switches |
| **M7-c** V2-readers use the predicate | every reader in `src/` | **EXAMPLE ONLY** — reader set is a doc instrument, not a spec |
| **M8-A…E** five rows | 8 cells over (bit × hasV2Components × hasClassicContent), **at both surfaces** | **Cell partition: CLASS ENUMERATED** — all 8 cells plus mask regressions plus conjunct isolation. **Surface application: NO COVERAGE**, and row D is **dead at one surface** — F-QA15 |
| **M8-F** parity across surfaces | every accepted object × {modal, paste} | **NO COVERAGE — and observably false**, per F-QA15 |
| **M8-G** persist gate | every draft reaching a persisting writer | **EXAMPLE ONLY** — the gate *function* is enumerated over row E; the **caller set** is pinned by no spec |

**The audit's own finding about itself**: the pattern is consistent and diagnosable. Wherever the
plan's instrument is a **pure function**, the class is enumerated, often exhaustively. Wherever the
instrument is **"observe this at its call site"** (M3-c, M8-E, M8-G) or **"at both surfaces"** (M8-F,
M8-A…E), coverage is absent — because this tree has no harness that can make that observation. That
is not carelessness by the implementer; it is EC-3's residue, which Phase 1 predicted and which
§6 confirms is still unresolvable here. It is routed, not absorbed.

## 5. **F-QA15 — the blocking defect.** Row D is unreachable at the Message JSON modal

**Severity: blocking. Class: regression introduced by this chain. Confirmed by execution end to end
on the production record the plan itself names.**

**Instrument**: `agent-output/verification/013/probe-qa-p2-rowd-load-gate/` — 29 assertions green at
`4e9da96`; mutants **R1, R2, R3 all killed**; tree restored byte-identical (`diff -q`) after each.

### What is wrong

```
JsonModalBody.tsx  parse effect  setValidatedDraft(parsed)                    <- UNRESOLVED draft
JsonModalBody.tsx                contentFloorError = validateContentRequirements(validatedDraft)
JsonModalBody.tsx  Load button   isDisabled={!validatedDraft || !!contentFloorError}
limits.tsx         floor         hasV2 = hasStructuralV2 || hasFlagV2
                                 if (hasV2 && hasContent) return 'Components V2 messages cannot
                                                                 contain embeds or content.'
```

Row D's membership condition is exactly `hasFlagV2 && hasContent && !hasStructuralV2`. The floor's
first rule fires on `hasFlagV2 && hasContent`. **Row D is therefore a strict subset of the floor's
refusal set** — the refusal is total over the row, not an edge case inside it. All 8 row-D members
the probe enumerates are refused; rows A, B and C are permitted, and both conjuncts are isolated.

### Executed, on record 5712, through the shipped pipeline

```
SEEDED_FLAGS  = 32768                <- jsonModalSeed CARRIES the flag into the textarea
ROW           = requiresChoice=false   mode=classic   noticeClass=warn-v2-flag-conflict
FLOOR         = "Components V2 messages cannot contain embeds or content."
LOAD_DISABLED = true
```

**The disposition engine computes exactly the right repair — row D, classic mode, the
`warn-v2-flag-conflict` notice — and the gate then refuses to let the user apply it.** Everything
013 built for this record works. The button is disabled in front of it.

### Why it is a regression, not a pre-existing condition

`validateContentRequirements` is **byte-identical at base and tip**; the floor did not change. What
013 changed is **wiring it into the Load gate**. At `c85945f` the gate was
`isDisabled={!!error || !isValid}`, where `isValid` meant only *"parses under
`discordMessageImportShape`"* — and a row-D object parses cleanly. **Base enabled Load for row D**,
and `enforceImportMutualExclusivity` in `onConfirm` resolved the conflict on the way through. **The
repair worked at base and does not work at the tip.**

### Operator consequence

M2-a names the Load as the repair path for the flag-conflict records **5712 / 5842 / 5855 / 5856**:
open JSON, press Load with zero edits, save. *That path is closed.* The `warn-v2-flag-conflict`
notice is unreachable from this surface. A user looking at the record sees a correct diagnosis and a
dead button, with no way to act on it and no message telling them why the button is dead — the floor
error is computed but the draft it describes is not the draft they would be saving.

### It also breaks M8-F parity, which is the criterion that should have caught it

The **same object at the paste surface works**, because `NewMessageJsonInput` sets
`applyDisposition(validated)` and `NewMessageModal` floors the **resolved** object. Two surfaces,
same input, opposite outcomes. M8-F asserts exactly that this cannot happen, and has **no coverage**
(§4) — so the criterion written to catch this class is the one that was never enumerated.

### The repair this finding endorses — and the one it rejects

Floor the **resolved** draft (`applyDisposition` first), matching what the paste surface already
does. Mutant **R3** models that fix and the probe flips, so the fixer has an instrument that moves.

**Rejected repair**: making the floor stop seeing the flag (`hasV2 = hasStructuralV2`). Mutant **R2**
models it and the probe kills it in 11 places — it would fix row D by re-permitting genuinely
invalid saves everywhere else.

### The sting for §2's re-anchoring work

`012-json-editor-repair-path.test.ts`'s five failures are `standardizeMessage is not a function` — a
deleted symbol, i.e. mechanically re-anchorable. **But re-anchoring it to the new path makes it fail
again, for a real reason**: its `STORED_5712_FULL` fixture is exactly row D, and its assertions are
that the repair completes losslessly. That is F-QA15. Further, its third assertion — *"the flag never
reaches the textarea in the first place"* — is now **substantively false**, because D18 retired
`stripKeys`' deletion (executed above: `SEEDED_FLAGS = 32768`).

**QA therefore does not re-anchor that file in this pass**, and states why rather than leaving the
omission to be read as an oversight: re-anchoring it now would require either encoding the defect as
expected behaviour, or writing a spec that is red on delivery. Both are worse than leaving it red
with this explanation attached. **The re-anchoring is owed by QA immediately after F-QA15 is fixed**,
and is listed in §7. `012-message-mode.test.ts`'s single failure is genuinely just a D16 re-anchor
and is unaffected by F-QA15.

## 6. INFO-2 — **falsified by execution**

Steering closed R9 on the condition that every application site *routes* through the gate, recording
**INFO-2**: *"`NewMessageModal`'s `gateBeforePersist` branch is dead today — no M3 ingress source
produces a row-E `loadedMessage`"*, with the instruction *"routing is not reachability, and what you
need is 'exercised', not 'wired' — say so if that is what you find."*

**Executed** (`verification/013/probe-qa-p2-med6-loadgate/`, block P2-E, 29 assertions green;
mutant **P8** — a hypothetical converter that normalises content away under the flag — killed):

| Question | Answer | Evidence |
|---|---|---|
| Does `discordResponseToMessage` preserve content, components **and** the flag together? | **Yes** — it does not normalise | `content:'hi'`, `flags:32768`, 1 component all survive |
| Is that output a **row-E** record? | **Yes** — `gateBeforePersist(...).mustAsk === true`, 2 options | executed |
| Is `mustAsk` simply always true? | **No** — controls: classic-only → `false`; V2-only → `false` | executed |

**So INFO-2 is wrong: the branch is reachable, not dead.** The converter can and does emit a row-E
record, so the gate is live on the ingress path.

**What remains true, and is the sharper form of steering's concern**: the **call site is still
unexercised**. `gateBeforePersist` itself is well covered (`013-m8-ec3-resolver-gate.test.ts`), but
no spec invokes `NewMessageModal.onSubmit`, so nothing executes the branch *at* `NewMessageModal:163`.
Steering's distinction was the right one — it was simply applied to the wrong half. The finding is
**not** "one of three call sites is dead"; it is **"the branch is live and nothing exercises it"**,
which is the more concerning of the two.

**Residue not settled here**: whether Discord's API can itself *return* a message carrying both.
Discord refuses to *send* V2-with-content, but the import path reads pre-existing messages and
nothing in this code prevents it. That is an external-behaviour question, routed to the register as
**BC-14**, not answered by reading.

## 7. Findings raised by this pass

| ID | Finding | Severity | Routed to |
|---|---|---|---|
| **F-QA15** | Row D unreachable at the Message JSON modal; M2-a's repair path closed for 5712/5842/5855/5856; M8-F parity observably false. Regression vs `c85945f`. | **BLOCKING** | **implementer**, immediately |
| **F-QA16** | `012-json-editor-repair-path.test.ts` re-anchoring is **blocked on F-QA15** and is owed by **QA** the moment it is fixed; its third assertion must be rewritten, not restored, because D18 made it substantively false. `012-message-mode.test.ts` is a clean D16 re-anchor, owed by QA, not blocked. | High | **QA** (self), after the fix |
| **F-QA17** | `SUPPORTED_TOP_LEVEL_TYPES` exists **twice** — `server/api/utils/shapes.ts` (pinned set-equal to the schema union by M4-b) and a private duplicate in `utils/discordResponseToMessage.ts`. They agree today; **nothing asserts they stay equal**. Adding a type to the schema side alone silently makes the ingress converter drop-and-report a type the JSON surfaces accept. M3-b states its class as if there were one set. | Medium | **implementer** (a set-equality spec, cheap) |
| **F-QA18** | Type-11 (Thumbnail) — the one member that is a V2 type *and* outside `SUPPORTED_TOP_LEVEL_TYPES` — has no coverage into `gateBeforePersist`, which receives the **unfiltered** draft. At the JSON surfaces the lenient filter strips it first, so the gap is reachable only through the persist gate. | Medium | **implementer** |
| **F-QA19** | `NewMessageModal`'s `gateBeforePersist` branch is **live** (F-QA15's sibling finding, §6) but **exercised by no spec**. INFO-2's "dead today" is withdrawn on QA's evidence. | Medium | **steering** — R9's closure basis is affected |

**Carried from Phase 1, unchanged**: F-QA11 (bounded to `NewMessageModal` alone; pre-existing at
`c85945f`, held item, not a fix round), F-QA12 (QA's own probe defect, retrospective), F-QA13 (nothing
may key on `valid = false` as a detector without keying on the **reason** string).

## 8. Assumption Not Checked

**This pass assumes that `applyDisposition`, when applied to a row-D draft, produces a draft the
floor then accepts — and it does not test it.** The fix F-QA15 endorses (floor the *resolved* draft)
is only a fix if that composition holds; this pass executed the floor over **unresolved** drafts
throughout, and executed `applyDisposition` nowhere.

- **Observable signature of its falsity**: the implementer applies R3's shape, and Load stays
  disabled for row D — or worse, becomes enabled while `applyDisposition` has silently dropped the
  content the repair exists to preserve, turning a dead button into silent data loss.
- **Stage that owns closing it**: the **implementer**, in the F-QA15 fix round, by executing
  `validateContentRequirements(applyDisposition(draft))` over the probe's 8 row-D members before
  changing the component — the probe is already in the tree and its `loadDisabled` helper is one line
  from becoming that test.

**Method failure this pass records against itself** (per the withdrawal in §3): a TDD-gate defect
tally was carried in working notes across a context boundary and restated **from memory of an earlier
document revision** instead of being re-derived from the document as it stood. One of the four items
did not survive re-derivation. The rule this pass should have followed is the one it applies to
everyone else — reproduce the numbers you carry forward. Routed to the **retrospective**, alongside
F-QA12.

**Second, narrower method note**: during this pass `git show … | sed -n '/x/,/^}/p'` returned a
**false absence** and led to a wrong statement that `validateContentRequirements` did not exist at
base. It was caught by a contradicting `grep -c` and corrected within the same pass. This is the
documented RTK positional-predicate hazard; the sound form (`git show > file` then read the file) is
recorded in the probe README so the next reader does not repeat it.

## 9. Blocking Release Condition Register — appends

Appended to **chain 013's single register** (above, this document). No parallel ID space minted;
continuing at BC-13.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode (operator terms) | Owner | State |
|---|---|---|---|---|---|---|---|---|---|
| **BC-13** | PRE | **F-QA15**: open record 5712's Message JSON modal and confirm the **Load button is enabled**, and that pressing it with zero edits clears the flag and preserves the content | `verification/013/probe-qa-p2-rowd-load-gate/` re-run green after the fix (**settles it without a human**) | fallback only: operator observation, since no mounted render exists here | the F-QA15 fix is committed | probe green; then 5712 loads and saves with content intact and the bit cleared | *The user sees a correct diagnosis of their broken record and a dead button. The repair 013 exists to deliver is computed and then withheld.* | **implementer** (primary needs no human) | **Not started — BLOCKING** |
| **BC-14** | POST | Can Discord's API **return** a message carrying both classic content and V2 components? (§6's residue — it refuses to *send* one, but the import path reads pre-existing messages) | production observation of the URL-import path | UAT agent | chain tip deployed **and** an import attempted against a message known to predate V2 enforcement | if such a message exists, the row-E choice appears rather than silent loss | *If Discord can return one and the branch is wrong, the user loses half their message on import with no prompt — and the branch is exercised by no spec (F-QA19), so nothing else would catch it.* | uat | Not started |

**Standing note applies**: this list is point-in-time; the UAT document, then the deployment record,
are authoritative on each row's state.

## 10. Handoff

**QA Phase 2 is complete. Status: QA FAILED.**

**This is NOT a handoff to the uat agent.** That line is owed only on a pass, and this pass did not
pass. The chain does not advance to UAT until F-QA15 is fixed and this verdict is refreshed.

**Recommended next subagent: the implementer**, for a fix round scoped to:

1. **F-QA15 (blocking)** — floor the **resolved** draft at `JsonModalBody.tsx`, matching what
   `NewMessageJsonInput`/`NewMessageModal` already do. Mutant R3 in the captured probe models the
   shape; R2 records the repair that must **not** be taken. Close §8's assumption as part of it.
2. **F-QA17** — one set-equality spec pinning the two `SUPPORTED_TOP_LEVEL_TYPES` copies.
3. **F-QA18** — a type-11 draft through `gateBeforePersist`.

**Then QA, for F-QA16** — re-anchor both 012 specs, which cannot honestly be done before (1) lands.

**Verdict freshness.** This verdict is anchored to `4e9da96` **and to that tree only**. The fix round
**automatically expires it**; a refresh pass recording a new `Verified-At` is required before the
plan advances to UAT, and no other agent should be relied on to notice that.

**Roadmap**: `agent-output/roadmap/` still holds only `.gitkeep` (re-checked this pass), so **no
roadmap epic acceptance criterion changes state on this record.** Recorded rather than omitted.

---

# Refresh Pass — 2026-08-24, at `164d720`

**Verdict: QA COMPLETE.** F-QA15 is closed. Phase 2's FAILED verdict stands for `4e9da96` and is
retained above, not overwritten.

**Scope discipline.** This pass changed **no production code**. It verified the fix, discharged
F-QA16 and F-QA19, and dispositioned the probe file. Per the landing constraint, anything needing
production code changed would have been a fix round, not folded in here.

## 1. Tree identity, re-derived

| Fact | Instrument | Value |
|---|---|---|
| Tip | `git rev-parse HEAD` | `164d7209f3efde494000f97cd212470b671904d6` |
| Tip subject | `git log -1` | `test(013): port CR21-C hole-check negatives into F-QA15's spec (INFO-3)` |
| Fix commit | `git log` | `53beb37` — one line in `JsonModalBody.tsx`, plus three new specs |
| Fast-forward | `git merge-base --is-ancestor c85945f HEAD` | **true** — assembled release tip is byte-identical to the chain tip |
| Production source uncommitted | `git status --porcelain src/ bot/` | **none at the point the fix was verified** |

## 2. F-QA15 — **CLOSED**, verified against the pristine tip

The fix is exactly the repair Phase 2 endorsed (mutant R3): `contentFloorError` now floors
`applyDisposition(validatedDraft)`. **Instrument**: `verification/013/probe-qa-p3-fixverify/`.

| Block | Result |
|---|---|
| **A** — the modelled gate is the shipped gate | 3/3 |
| **B** — all 8 row-D members now load, losslessly, bit cleared | 24/24 |
| **C** — **the fix does not over-permit** | 5/5 |
| **D** — rows A/B/C unchanged, no collateral | 4/4 |
| **E** — record 5712 end to end | 4/4 |

**Block C is the block that needed writing.** Flooring the *resolved* draft means
`applyDisposition` rewrites the object the floor then judges — which is precisely how a gate fix
becomes a gate hole. The empty object, explicit empty collections, whitespace-only content, and
flag-only drafts are **all still refused**. Mutant **F2** (floor branch 2 disabled) kills exactly
those five, so they are load-bearing.

### A defect in QA's own instrument, recorded rather than quietly fixed

The first draft transcribed the gate into a helper. Reverting the fix in the component then left
**39 of 40 assertions green** — the model kept computing the fixed behaviour while the component no
longer had it. *A model that survives the defect it models is not evidence*, and it is the same
class this pass criticises elsewhere. Fixed by **coupling the model to source at module scope**: the
floor and gate expressions must be present in `JsonModalBody.tsx` or every test in the file throws.
Mutant **F1** re-run afterwards fails the whole suite, as it should.

### Audit of the implementer's own spec

`013-fqa15-rowd-load-gate.test.ts` is thorough — the row-D class, the assumption closure QA routed,
CR21-C's hole check, and 5712 end to end. Two observations:

- **It is coupled, but only by 2 assertions.** Reverting the fix fails 2 of its 15; the other 13 keep
  passing on the pure-function composition. Not blind, but weaker than structural. **INFO**, not a
  finding — the technique is the one this tree permits.
- **F-QA21 (new, low)**: `expect(x.flags as number & 32768).toBe(0)` appears twice and is a
  **TypeScript type assertion, not a bitwise AND** — it means `flags === 0`. Executed:
  `applyDisposition` correctly clears the V2 bit *and preserves other bits* (`32772 → 4`,
  `32832 → 64`). So the assertion encodes the wrong property and passes only because both uses pick
  inputs with no other bits — including from a `rowDMembers` list that *does* contain such members.
  The next person to extend it gets a confusing red and may "fix" it by making `applyDisposition`
  drop other bits. QA's own probe asserts the property correctly (`(out.flags ?? 0) & FLAG`).

## 3. F-QA16 — **DISCHARGED**. Both 012 specs re-anchored

### `012-json-editor-repair-path.test.ts`

`editorRoundTrip` modelled a pipeline that no longer exists (`standardizeMessage` deleted by M1-a;
`enforceImportMutualExclusivity` replaced by the five-row disposition). Re-anchored to the shipped
path — `jsonModalSeed` → `discordMessageImportShape` → `resolveContentLoss` / `applyDisposition` —
while `loadAndSaveViaShippedProvider` is left **untouched**, so the wholesale-replace property the
file was written to guard is intact.

Two further things had to be fixed to make it run, both consequences of 013:

- Its React mock covered only `useCallback`. `useApiMethods` gained `useState` at M8-G for the row-E
  `pendingSaveChoice`, so the factory threw. Mock extended.
- The `requiresChoice` branch is now asserted rather than assumed: a fixture drifting into row E
  throws loudly instead of silently loading.

**The constraint was honoured.** *"The flag never reaches the textarea"* is **replaced, not
restored** — under D18 the seed carries `flags: 32768` verbatim, so the old assertion is
substantively false. Two assertions pin where the repair actually moved to: the flag now **does**
reach the textarea, and row D resolving to classic is what clears it.

### `012-message-mode.test.ts`

One assertion, `switchToV2` leaving `flags` at `0`. Under **D16** the toggle sets the bit, and mode
follows the flag (D15) — so the old expectation now asserts a defect. Re-anchored, naming the ruling.
The other-bits-preserved case is left in `013-m7-mode-follows-flag.test.ts` rather than duplicated.

### The substantive finding inside the re-anchor: **013 fixes the B3 class**

Plan 012 concluded: *"B3 class has NO lossless path — neither instruction is safe alone."* Executed
at the tip (`trace-b3-class.txt`): a flag + content + Action Row draft resolves to **row D**, and
`applyDisposition` clears the bit while keeping **both** the content and the Action Row.

**That conclusion is now false for the editor instruction.** The toggle path is unchanged and still
destroys the content, so the two are no longer equal in cost — **the editor is now the strictly
safer instruction to send.** 012's guidance to the owner was chosen on the premise that neither was
safe, so this is routed rather than left inside a test file.

### Mutation evidence — both re-anchors observed failing

| Mutant | Change | Result |
|---|---|---|
| **M1** | `switchToClassic` drops all components | **KILLED** — 2 failed (B3 losslessness + the R19 restatement) |
| **M2** | `switchToV2` stops setting the bit | **KILLED** — 1 failed (the D16 re-anchor) |

> **Recorded because it nearly passed as evidence**: the first attempt at both mutants **did not
> apply** — the source text differs from the anchors used, and `sed` reported nothing. The specs
> "passed", which reads exactly like a surviving mutant. Re-run with an assertion that the mutation
> applied before the suite runs. **A mutant that did not apply is indistinguishable from one that
> was killed by nothing.**

## 4. F-QA19 — **DISCHARGED** with permanent coverage

New spec `013-fqa19-ingress-gate-reachability.test.ts` (11 assertions), covering the half INFO-2 got
wrong and the half that is executable:

- **Reachability, executed** — the converter does not normalise; its output trips the gate
  (`mustAsk`, 2 options, each naming a non-empty drop set).
- **Controls** — classic-only, V2-only, and row D all return `mustAsk: false`, so the positive is
  discriminating.
- **Wiring, structurally pinned** — exactly **one** `upsertMessage` call site, inside `submitData`,
  which neither gates nor resolves; route 1 (`onSubmit`) gates and returns before writing; route 2
  (`commitChoice`) applies the chosen disposition first; and those are the only two routes.

> **A survivor found and closed.** Mutant **N1** — deleting the early `return;` so the gate becomes
> advisory and the write proceeds anyway — **survived the first draft**, because asserting `onSubmit`
> merely *contains* `'return;'` is satisfied by the unrelated `if (!loadedMessage) return;` guard.
> The assertion now slices the span **between the gate tripping and the write** and requires the
> return inside *that*. N1 is killed. This is the single most load-bearing assertion in the file and
> it was vacuous until it was mutated.

## 5. Probe-file disposition — **CLOSED** (devops's standing item)

`src/utils/__tests__/013-qa-phase1-seed-route-probe.test.ts` is **deleted from the source tree.**

Grounds, in order: it is byte-identical to its captured copy under
`verification/013/probe-preexisting-seed-route/` (verified by `diff -q`), so nothing is lost; it is a
Phase-1 characterisation anchored to `c85945f`; its subject
(`enforceImportMutualExclusivity`) has **zero production callers** at the tip; and the question it
was built to answer — seed mintability — is closed by execution in production under BC-11a. It was
owned by no criterion and would otherwise have ridden onto `master` inflating every run.

**F-QA22 (new, low)**: `enforceImportMutualExclusivity` now has zero production callers and is
exercised only by tests. Dead code, not this chain's to remove; routed for a later cleanup.

## 6. Suite execution — re-run and re-counted

> **Instrument score with its predicate.** **549 tests across 37 spec files matching
> `src/**/*.test.ts` — 549 passed, 0 failed, exit 0.** Predicate **excludes** `bot/`
> (`git ls-files 'bot/**/*.test.ts'` → **0**, no collected specs) and the now-deleted Phase 1 probe.
> **Validation item 1 ("full Vitest suite green") is MET** — for the first time in this chain.

At the pristine tip the figure was **537 / 6 failed**; the six were the red-test domain this pass
owned and has now discharged.

**`tsc --noEmit`**: **1 error**, `src/app/page.tsx` — a missing `*.png` module declaration.
**Pre-existing by construction**: `git log c85945f..164d720 -- src/app/page.tsx` and
`-- src/assets/img` are both **empty**, so the chain touches neither. Not 013's, and not fixed here.

**`eslint`**: cannot lint any spec in this repo — `tsconfig.json` excludes `**/__tests__`
(the `8f28066` Vercel-build fix), so `parserOptions.project` rejects every test file. Verified
**repo-wide and pre-existing** by linting an untouched implementer spec, which errors identically.
No test file in this repo is linted or typechecked; recorded, not worked around.

## 7. Findings from this pass

| ID | Finding | Severity | Routed to |
|---|---|---|---|
| **F-QA21** | `expect(x.flags as number & 32768).toBe(0)` in `013-fqa15-rowd-load-gate.test.ts` is a type assertion, not a bitmask; it means `flags === 0` and contradicts the correct bit-preserving behaviour. Passes only by fixture choice. **CLOSED 2026-08-24** by `implementer-hooks-013-3` — see the severity correction below. | Low → **real** | **CLOSED**, verified by QA |
| **F-QA22** | `enforceImportMutualExclusivity` has zero production callers; exercised only by tests. | Low | later cleanup, not this chain |
| **INFO** | The implementer's F-QA15 spec is coupled to source by 2 assertions rather than structurally; reverting the fix leaves 13/15 green. | Info | noted, no action |

**Carried, unchanged**: F-QA11 (pre-existing, outside 013), F-QA12 and the Phase 2 method failure
(both retrospective), F-QA13, F-QA17/F-QA18 (closed by `53beb37`'s specs, re-run green this pass).

## 8. Assumption Not Checked

**This pass assumes the three uncommitted test files it wrote will be committed unmodified, and it
does not verify what runs on `master`.** The suite-green verdict is anchored to a working tree, not
to a commit; if the re-anchors are amended, rebased, or dropped between now and integration, the
tree that ships is not the tree that was verified.

- **Observable signature of its falsity**: CI or a post-integration run at the release tip shows the
  six original failures again, or a different count from 549 — with the QA document still asserting
  green.
- **Stage that owns closing it**: **devops**, at release-tip verification (Phase 3), by re-running
  the suite against the assembled tip and reconciling against 549/37. That is exactly what Phase 3
  exists for, and this pass does not substitute for it.

## 9. D28's residual — stated, not silently absent

**No DOM harness was added.** No `jsdom`, no `happy-dom`, no `@testing-library/react`, and vitest's
`include` is untouched. Every gate assertion in this chain is source-text plus pure-function
execution.

**What is therefore unverified**: that React actually applies `isDisabled` to the rendered Load
button, and that no other render path re-enables it.

**Falsity signature**: *an operator opens 5712's JSON, presses Load, and the button is still inert
although the gate computes `false`.*

**Owner**: the owner's own browser sitting, folded into **BC-11b** under D28. **If his observation
contradicts the gate, that is a finding, not a stale fixture** — and it reopens this verdict.

## 10. Blocking Release Condition Register — updates

Appended to chain 013's single register.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode (operator terms) | Owner | State |
|---|---|---|---|---|---|---|---|---|---|
| **BC-13** | PRE | *(from Phase 2)* F-QA15: 5712's Load button is enabled and the repair completes | `verification/013/probe-qa-p3-fixverify/` | — | fix committed | probe green | — | implementer | **DISCHARGED 2026-08-24** at `164d720` — probe green, 25 assertions, F1/F2 killed. The mounted-render half moved to BC-15 under D28. |
| **BC-15** | PRE | **D28**: the owner observes, in his BC-11b browser sitting, that 5712's Load button is genuinely **enabled** and that pressing it unedited clears the flag while keeping the content | operator observation (D28 — no DOM harness in this chain, by ruling) | the owner, in the BC-11b sitting | chain tip deployed; the sitting already scheduled | button enabled; content intact; bit cleared | *Every gate assertion in this chain is source-text plus pure functions. If React does not apply `isDisabled` as read, 5712 still shows a dead button and the whole repair is invisible to the user.* | uat (to record the owner's attestation) | Not started |

**Standing note applies**: this list is point-in-time; the UAT document, then the deployment record,
are authoritative.

## 11. Handoff

**QA is COMPLETE at `164d720`.** F-QA15 closed, F-QA16 and F-QA19 discharged, probe file
dispositioned, suite green, Validation item 1 met.

**Handing off to the uat agent for value delivery validation.**

Two things UAT and devops must carry:

1. **BC-15** — the owner's mounted-render observation, folded into his BC-11b sitting under D28. A
   contradiction there reopens this verdict.
2. **012's R19 guidance is superseded** — the editor instruction is now lossless for the B3 class
   where 012 recorded that it was not. Whoever sends that guidance should send the editor one.

**A commit approval is owed and requested** for three website source paths (below). Until they are
committed, the suite-green half of this verdict rests on a working tree, and the content identity in
the frontmatter is what pins it.

**Roadmap**: `agent-output/roadmap/` still holds only `.gitkeep` (re-checked), so **no roadmap epic
acceptance criterion changes state on this record.**

---

## Addendum — F-QA21 closed, and its severity corrected upward

Recorded beside the finding above, not over it. F-QA21 was filed **Low, "not release-blocking"**, on
the reasoning that the behaviour was correct and only the assertion was wrong. **Execution says that
under-rated it**, and the correction is the point of this addendum.

The implementer replaced both type assertions with parenthesised bit-tests and added a dedicated
preservation test. QA verified rather than accepted:

| Check | Result |
|---|---|
| The fixed spec | **16/16 green** |
| Mutant **Q1** — `switchToClassic` wipes *all* flag bits (`next.flags = 0`) — against the **fixed** spec | **KILLED**, `AssertionError: expected +0 to be 4` |
| The same mutant Q1 against the **pre-fix** spec at `164d720` | **SURVIVED — 15/15 green** |

**That last row is the finding.** The old assertion `flags as number & 32768` means `flags === 0`,
which a wipe-everything mutant satisfies *perfectly*. So the suite was blind to a regression class
that would silently drop `SUPPRESS_EMBEDS` and `EPHEMERAL` from **every** classic repair — on
records that carry them, including two members of the file's own `rowDMembers` list. This was not a
cosmetic defect in a test; it was a **hole in the guard**, and it is exactly the failure mode the
mutation obligation exists to expose: a test that has never been seen to fail is not evidence that
the thing it guards is guarded.

**QA's own instrument asserted the property correctly throughout** (`(out.flags ?? 0) & FLAG`), which
is how the discrepancy surfaced at all — the two instruments disagreed about what they were
measuring, and the disagreement was the signal.

**Verdict impact**: none adverse. The production behaviour was always correct; what changed is that
it is now guarded. Suite at the four-path content identity: **550 tests / 37 files / exit 0**.

### A process note this pass owns

QA's verdict was written against a three-path content identity, and a fourth path appeared under it
when the implementer landed F-QA21 into the same shared tree. Nothing was wrong with either action —
but a `Verified-At` that describes a tree which no longer exists is not an anchor. The manifest is
**re-derived and restated** above rather than left standing. On a shared tree, a content-identity
anchor has to be re-derived at the moment of hand-off, not at the moment it is first written.

---

## Re-anchor — `164d720` → `821330d`

`implementer-hooks-013-3` committed the F-QA21 fix as `821330d` while this verdict was being
handed off. Under Verdict Freshness a superseded SHA is not an anchor, so this is a re-anchor, not
a carried-forward verdict.

**The differential scopes the refresh; it does not replace it.** What moved:

    git diff --numstat 164d720..HEAD
    19  2  src/utils/__tests__/013-fqa15-rowd-load-gate.test.ts

One path, test-only, **no production code**. And the committed content is byte-identical to the
working-tree content this pass already verified — `sha256 39e62dcd6d96…`, the same digest recorded
in the four-path manifest above. So the *composite* tree (anchor + uncommitted files) is unchanged
across the move: what was `164d720` + 4 uncommitted is now `821330d` + 3 uncommitted, with
identical bytes on every path.

That equivalence is established by digest and by `--numstat` — both computed before any output
filter — **and then by execution anyway**, because zero movement licenses a scoped pass, never a
skipped one:

| At `821330d` + the 3 remaining uncommitted paths | **550 tests / 37 files / exit 0** |

Content identity of what remains uncommitted (QA's three; the implementer's fourth is now in-tree):

    012-json-editor-repair-path.test.ts         33af76e25e0bd5f6350c9fd398c2a135fb9db53f8be6c352eee1af4768021714
    012-message-mode.test.ts                    94cd8738162139121c421056737edf7d1b9da53ca91dac2209288bcf2f5fe411
    013-fqa19-ingress-gate-reachability.test.ts 82e92af1ab7c4c6bf718f28d10c4977479b00644d538f7798ce82253de9c3fcd

**Verdict unchanged: QA Complete, now anchored at `821330d`.**

Two notes for whoever assembles the release, neither of them a QA gate:

- This anchor expires the moment QA's three paths are committed. That is expected, not a defect —
  it is the same re-anchor performed once more, and the suite is already green on those exact
  bytes.
- A plan-level verdict does not authorise a release. The assembled release tip carries its own
  verdict (Phase 3), commissioned by devops, and it is not inferable from this record.

### Method note against this pass

The first re-run here was issued as `vitest run --reporter=basic` and died with a startup error.
That was **my bad flag** — `basic` was removed as a reporter name in vitest 4 — not a broken tree
and not a failing suite. Recording it because a startup error reads exactly like an infrastructure
fault, and a pass that reported it as one would have handed the next stage a phantom to chase.
