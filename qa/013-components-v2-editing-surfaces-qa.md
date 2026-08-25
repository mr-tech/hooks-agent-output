---
ID: 013
Origin: 013
UUID: 22d69e06
Parent: components-v2-editing-support-2026-08-23.md
Status: QA Complete
Verified-At: "4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f"
Verified-At-Note: "re-issued 2026-08-25 at 4a7126b after F-QA28 adoption — QA COMPLETE. Supersedes the 664e0c0 verdict, which stands for its own tree. CORRECTED 2026-08-25 (F-9, devops): this field previously read 'Every commit since live master a151fb4 is test-only' — FALSE for a151fb4..4a7126b, which carries abcf585 and its 4 production files (NewMessageJsonInput.tsx, MessageProvider/index.tsx, layout.tsx, CodeMessageNotice.tsx). TRUE only of abcf585..4a7126b. The release delta a151fb4..4a7126b IS production-bearing and needs production-side scrutiny; abcf585 is the commit BC-18/BC-19/BC-21 examine. Plain SHA."
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
  killed, captured beside the original probe. **BC-11 is SPLIT** into BC-11a (**DROPPED under D44** —
  owner ruling, plan rev 39, `13a6e66`) and BC-11b (the ask — **NOT EXECUTED**,
  non-terminal, still blocking); BC-11 is retained as a pointer and nothing was withdrawn. **D20's
  re-derivation clause is resolved on the substance by UAT, not by this instrument.** Two new findings:
  **F-QA11** (New Message's Save is enabled at `guildId: '0'`, which the boundary refuses — pre-existing,
  outside 013) and **F-QA12** (QA's own probe was scoped one layer inside the real boundary). No criterion
  moved; Phase 2 has not run.
  **Third-digest round, 2026-08-24 (rev 3).** F-QA11 **bounded by execution** to 1 of 4 sites matching a
  predicate derived from the class definition; two siblings guard the same `'0'` sentinel, so it is a
  single-site oversight. `uat-hooks-013`'s deliberately-unexecuted inference on R7's first limb **executed and
  confirmed**, with the correction that the boolean alone does not
  discriminate and the reason string must be keyed on. **F-QA13** (since **DROPPED under D44**) recorded UAT's finding U-1 as a Phase 2
  constraint on detector selection. Instrument now **36 assertions, nine mutants, nine killed**.
  **Phase 2, 2026-08-24 (rev 4) — EXECUTED at `4e9da96`. Verdict: QA FAILED.** The block above is
  retained verbatim as the Phase 1 record; this paragraph is recorded beside it, not over it.
  One blocking defect, **F-QA15**: the Message JSON modal floors the *unresolved* draft, so every
  member of disposition row D is refused and M2-a's repair path for 5712/5842 is closed.
  Confirmed end to end on record 5712 through the shipped pipeline; regression against base
  `c85945f`, where the same records loaded. **TDD gate PASSES** on re-derivation, and this pass
  **withdraws** its own earlier claim that `SaveChoiceModal.tsx` lacked a TDD exemption — it has
  one, stated and classed. **INFO-2 falsified**: `NewMessageModal`'s gate branch is live, not dead,
  though exercised by no spec (F-QA19). Suite re-run and re-counted: 517 tracked tests, 6 failed,
  both failing files in Phase 1's declared red-test domain. Four new findings, F-QA15–F-QA19;
  register appended at BC-16/BC-17. Not handed to UAT — the chain returns to the implementer.
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
| 2026-08-24 | uat-hooks-013 (direct, under D27, second digest) | Correction to the digest above, plus two defects in BC-11 as written | **Recorded beside the row above, not over it.** Two claims in that row are now **superseded**: (1) BC-11 Half A — **DROPPED under D44** (owner ruling, plan rev 39, `13a6e66`); (2) **D20's re-derivation clause is RESOLVED on the substance**, not outstanding — mintability is now established *by execution in production*, a stronger derivation than the module-level probe D20 contemplated, and UAT's classifier-blocked probe is retired for that purpose. UAT's two defects in BC-11 are **accepted and fixed here**: the Subject cell named a party who can execute neither half, and the Earliest-decidable cell was silent on Half B's environment precondition — both now carried by BC-11a/BC-11b. UAT's `publicProcedure` count re-derived here rather than repeated: **8 procedure definitions in `message.ts` at `c85945f`, 8 protected, 0 public**. |
| 2026-08-24 | uat-hooks-013 (direct, under D27, third digest) | UAT reports F-QA11 does not generalise to Save As (read-level, asked to be recorded as such), and hands over **finding U-1** plus one inference it deliberately left unexecuted about `valid` and R7 | **Executed rather than recorded at read level.** **F-QA11 is bounded by execution to 1 of 4** sites matching the sweep predicate — *builds `message.upsert`'s `guildId` from a value the user picked this session* — and the load-bearing result is that **two siblings guard the exact `'0'` sentinel**, so it is a single-site oversight, not a design. **UAT's unexecuted inference EXECUTED**; its subject is **struck under D44** and is not restated, with one correction UAT's reasoning did not carry — that a username-less message is *also* refused for an unrelated reason, so **anything keying on `valid = false` must key on the reason, not the boolean**. **U-1 was recorded as a Phase 2 constraint** on detector selection, **since DROPPED under D44** with F-QA13. Four more mutants; **nine across the pass, nine killed**. Instrument now 36 assertions. |
| 2026-08-24 | steering-hooks-013-2 | Run QA Phase 2 at chain tip `4e9da96` | **Phase 2 executed. Verdict: QA FAILED on F-QA15** — the Message JSON modal's Load button is gated on a content floor computed over the *unresolved* draft, so **every** member of disposition row D is refused, closing M2-a's stated repair path for records 5712/5842. Confirmed end to end on record 5712 through the shipped pipeline, captured at `verification/013/probe-qa-p2-rowd-load-gate/` (29 assertions, mutants R1-R3 killed). Regression vs base `c85945f`, where Load was gated only on "does it parse". **TDD gate: PASS** — re-derived against the current implementation document; this pass **withdraws** its own earlier working claim that `SaveChoiceModal.tsx` lacked an exemption. **INFO-2 falsified** by execution. Suite re-run and re-counted. |
| 2026-08-24 | steering-hooks-013-2 | Refresh pass at `164d720` after the F-QA15 fix | **QA COMPLETE.** F-QA15 **closed** — verified against the pristine tip by QA's own instrument (`verification/013/probe-qa-p3-fixverify/`, 25 assertions, mutants F1/F2 killed), including five **over-permission** controls the fix could plausibly have broken. **F-QA16 discharged** — both 012 specs re-anchored; the *"flag never reaches the textarea"* assertion **replaced, not restored**, per the relayed round-19 constraint. **013 makes the B3 class lossless**, superseding 012's R19 *"no lossless path"* conclusion. **F-QA19 discharged** with permanent coverage. Probe-file **dispositioned** (deleted; captured copy retained). Suite **green: 37 files / 549 tests / exit 0** — Validation item 1 met. New: **F-QA21** (a type-assertion masquerading as a bitmask in the implementer's spec), **F-QA22** (`enforceImportMutualExclusivity` has zero production callers). **D28 honoured — no DOM harness added.** |
| 2026-08-24 | implementer-hooks-013-3 (direct, under D27) | F-QA21 fixed in the shared tree; asks when QA's files are clear to land | **F-QA21 CLOSED, and its severity corrected UPWARD on execution.** The fix is verified, not accepted: 16/16 green, and mutant **Q1** (`switchToClassic` wiping *all* flag bits) is **killed**. Decisively, Q1 **SURVIVED the pre-fix spec** (15/15 green) — so the old type-assertion was blind to a live regression class that would drop `SUPPRESS_EMBEDS`/`EPHEMERAL` on every classic repair. Not cosmetic. Verdict's content identity **re-derived to four paths**; suite 550/37/exit 0. **QA declined the offer to have the implementer commit QA's three files** — an approval is pending with the owner, and routing it through a peer's standing grant would settle it without him. |
| 2026-08-25 | steering-hooks-013-2 [019315] (owner-directed edit; **not** the QA session) | Owner ruling **D44** — strike the ruled subject from this document and drop its dependents | **STRIKE PASS — rev 5.** Performed under **owner ruling D44**, registered in the plan's Decisions Register at **rev 39** (`13a6e66`), and written by `steering-hooks-013-2` [019315] acting on the owner's direction rather than by the QA session. Every mention of the ruled subject is removed, and every dependent item — one register row, one finding, one falsifier limb, one handoff bullet, and their carry-forwards — is **marked DROPPED under D44**: not re-argued, not re-based onto a substitute, not preserved for the record. **No verdict, status or gate state is changed by this pass** — the QA verdicts, the register's other rows and the Final QA state table stand exactly as they were. |

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

> ### ID COLLISION — corrected 2026-08-24, raised by `uat-hooks-013` (U-2)
>
> **This append originally restarted at BC-13, while Phase 1's register had already run to BC-14.**
> The register therefore carried two distinct `BC-13`s and two distinct `BC-14`s. The sentence
> immediately above once read *"No parallel ID space minted; continuing at BC-13"* — which minted
> exactly the parallel ID space it denied minting. The defect is mine; it is the failure the
> one-register rule exists to prevent, and I wrote the denial into the same sentence as the breach.
>
> **Phase 1 keeps the original numbers** (older, and more widely cited). **Phase 2's two rows are
> renumbered** to the register's true high-water mark:
>
> | Was | Now | Row | Class | Owner |
> |---|---|---|---|---|
> | BC-13 *(P1)* | **BC-13** — unchanged | `bot-code-ttl-residue` | POST | devops |
> | BC-14 *(P1)* | **BC-14** — unchanged | `user-defect-fixed-in-prod` | POST | uat |
> | BC-13 *(P2)* | **BC-16** | `p2-rowd-load-gate` | PRE | discharged |
> | BC-14 *(P2)* | **BC-17** | `discord-returns-row-e` | POST | uat |
>
> **Every row now carries a stable name as well as a number**, and citations should prefer the
> name: a name survives renumbering, a number does not. UAT already keeps its ledger this way, and
> that is the only reason this collision was caught rather than silently propagated.
>
> **The consequential one is BC-14.** Both `BC-14`s are POST/uat, so a reader resolving the
> collision by class or owner gets no signal that anything is wrong — and the row at risk of being
> displaced is *"the user-reported defect is fixed in production"*, the observation this entire
> chain was commissioned to make possible. A collision that is invisible to every disambiguator
> except the text itself is worse than one that throws.
>
> **Four documents cite these numbers.** This table is the mapping; QA does not edit other stages'
> documents. Any citation of `BC-13`/`BC-14` written before 2026-08-24 must be resolved against
> **which phase raised it**, not against the number alone.

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
| **BC-11** | — | **SPLIT 2026-08-24 into BC-11a (DROPPED under D44) and BC-11b (the ask). This row is not executable as written — read BC-11b.** The condition spanned two instants with opposite timing: one half was decidable *only before deploy* and the ask *only after the chain tip is up*, so one row made the first look reschedulable when it is not. Raised by `uat-hooks-013` (`b6e9662`); the split is QA's, the register being QA's. Nothing about the condition was withdrawn at the split; **BC-11a has since been dropped under D44** and BC-11b survives verbatim below | — | — | — | — | — | qa | **SUPERSEDED by BC-11a + BC-11b** |
| **BC-11a** | — | **DROPPED under D44** (owner ruling, registered at plan rev 39, `13a6e66`). This row's subject is struck from chain 013. The row is not re-argued, not re-based onto a substitute, and its content is not restated here. | — | — | — | — | — | — | **DROPPED — D44** |
| **BC-11b** | PRE | **The ask fires on save over a seed** (supersedes the observation half of BC-11): open a **5712-shaped** record (V2 mode, V2 error visible, components section shown), add one container, press **Save** → the ask appears naming both drops and **nothing is written** until one is taken. Same at **Save As**. Repeat on the **5842-shaped** record | operator observation of a **UI event**, **paired with** the suite's `requiresChoice` assertion (EC-3). The oracle is *"the ask appears"*, so the primary needs a browser — which decides the subject on its own, at any SHA and in any environment | **subject**: any party holding a **browser** and a **chain-tip environment carrying the shape**. Today that is the owner *because no session on this box holds browser tooling* — **a fact about tooling, not a plan requirement**, and it must not harden into the latter. `uat-hooks-013` re-derived (not adopted) that it cannot be the subject: empty `DISPLAY`, no browser, no automation. **Fallback**, written by the planner and **conjunctive**: *"Where the repair has already run **and** no seeded environment is available, the suite is the evidence and UAT records the reason — the D19 repair preceded the deploy — not 'no member to observe'."* The repair has not run, so the fallback's conjunction is unmet, it is **not currently available**, and this row is still owed | **the chain tip deployed to any environment carrying a 5712-/5842-shaped record** (BC-1's convention). Not decidable before both | the ask appears; nothing written before a choice; both outcomes verified by repeating with the other option. The save leg is a **conflict-update**, and `data` is written verbatim there as well as on insert (executed, EXT-B) | *This is the whole of D18. If the ask does not appear, the save path is still silently destroying the user's classic body — the defect the owner folded into 013 — and the suite alone cannot show it working for a real user.* | uat (records and drives; the observation needs a browser-holder) | **NOT EXECUTED** — non-terminal, blocks an unconditional approval (`uat-hooks-013`, `838b180`, whose Appendix A holds a one-shot observation script, not executed and not evidence). **Precondition, re-stated from Phase 1's read and carried in that script**: `showComponentButton` requires `isEditing && isV2Mode && showComponentsEditable && canAddComponent`; an observer who has collapsed the components section will see no add-component control and wrongly report the ask as unreachable |
| **BC-12** | POST | M8-G's send-path form is accepted by Discord: a V2 message that sent at `c85945f` still sends after deploy | the existing post-deploy observable *"Save As on a V2 message yields a V2 copy that sends"* (Validation item 6), and M3-a's send form | UAT agent, then owner in normal use | the deploy is live | **the send succeeds. A single 4xx refutes by construction** — this is not a rate to accumulate; one failure closes the critic's pass-4 assumption negatively and is a hotfix trigger | *Every V2 send starts failing at Discord because the wire form gained `content:""`. Users cannot send, and the cause is invisible in the app.* | implementer owns the decision (M8-G send path); uat owns the observation | Not started |
| **BC-13** *(name: `bot-code-ttl-residue`)* | POST | M3-b's pre-deploy-code residue: bot codes stored **before** go-live carry no dropped set, so the notice cannot render for them | elapsed time against the store's 1h TTL | no human subject — decided by the clock | one hour after the deploy SHA is live | the residue is empty | *For one hour after deploy, a code import can drop components silently — the exact behaviour M3-b fixes. Nobody will connect the two.* | devops (records the window in the deployment record) | Not started |
| **BC-14** *(name: `user-defect-fixed-in-prod`)* | POST | **The user-reported defect is fixed in production** (handoff `8f3fa8c3`, observations 1/2/5/6/7): Save As on a V2 message yields a V2 copy with every component; Message JSON shows the components; a component-only edit in one tab raises *"Message Update Detected"* in another and a no-op save raises nothing | operator observation in production | owner, in normal use; fallback UAT agent | the deploy is live | all four observed | *A deploy having happened says nothing about the fix having worked. The failure's signature here is **absence** — a copy that is empty, a prompt that never fires — and absence is what nobody reports.* | uat | Not started |

### Register maintenance log

One dated line per change of state or structure, naming the discharging document.

- **2026-08-24 — BC-11 SPLIT into BC-11a and BC-11b** (qa, this pass). Raised by `uat-hooks-013`
  (`b6e9662`): the condition spanned two instants with opposite timing, which made the first half look
  reschedulable when it was not. BC-11 is retained as a pointer, not deleted; **no requirement was withdrawn
  at the split** — **BC-11a has since been dropped under D44**, and BC-11b survives verbatim. This is an
  **append within the same ID space**, not a parallel register.
- **2026-08-25 — BC-11a DROPPED under D44.** Owner ruling, registered at plan rev 39 (`13a6e66`). The row's
  subject is struck from chain 013; the row is not re-argued, not re-based onto a substitute, and its content
  is not restated. Recorded by `steering-hooks-013-2` [019315] on the owner's direction, not by the QA session.
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

**This pass assumes that a record whose `data` reaches `buildMessageValues` verbatim is also read back verbatim — and it does not examine the read path at all.** Every assertion here stops at the values handed to the insert/update statement. `getMessage` and whatever `MessageProvider` runs on load could normalise, coerce or default `flags` on the way *out* of the database, in which case a record stored as a row-D member could still open as something else — and BC-11b's observer would find the components section, or V2 mode, simply absent, with no way to tell a read-path defect from the ask not firing. **Falsity signature**: **DROPPED under D44** — its subject is struck and is not restated. **Stage that owns closing it**: **QA at Phase 2**, in the M7-a mode-derivation coverage — the extracted `detectMode` predicate must be exercised over a fixture built the way the read path delivers it (`flags` as it comes back from storage), not only over a literal. Named again in the handoff so it is routed, not shelved.

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

| **F-QA13** | — | **DROPPED under D44** (owner ruling, registered at plan rev 39, `13a6e66`). This finding's subject is struck from chain 013. It is not re-argued, not re-based onto a substitute, and its content is not restated here. | **DROPPED — D44** |

| **F-QA14** | Low | **For the retrospective — a lesson from this chain's QA↔UAT exchange, not a defect in the work.** `uat-hooks-013` reached a **sound** conclusion — its subject is struck under **D44** and is not restated — by reasoning that carried a trap: the boolean does not discriminate, a username-less message being refused for an unrelated reason. It **declined to send it as an inference** and handed over a stated gap instead, asking that it be executed. Had it sent the inference, **the conclusion would have been adopted and the trap would have travelled with it, invisibly, attached to a correct answer** — the worst case, because nothing downstream would ever have contradicted it. **A stated gap survives being right; a comfortable inference does not.** Generalises this cwd's standing pattern that every instrument defect so far was caught by a *contradiction against a second instrument*, never by re-running the first — here it was caught instead by the originator refusing to let the first instrument stand alone. **The cheapest of the three, and the part the retrospective should keep**, in UAT's sharpening: this is the only one that costs **one sentence at handover** instead of a second instrument later. | retrospective. **Correction, 2026-08-24, mine**: I first wrote this cell as *"both stages concur; recorded in QA's document and in UAT's"* when it was recorded in **mine only** — I asserted a concurrence in a document I do not own and had not read at that revision, which is the same family as citing a document one did not read. `uat-hooks-013` caught it and recorded it at its rev 8 (`831d053`, verified here by `git log` on that path before restating it). **A concurrence present in one document is not one.** The claim is now true; it was not when written. |

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
> **BC-11a** (**DROPPED under D44**) and **BC-11b** (the ask —
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
> - **A bullet stood here and is DROPPED under D44** (owner ruling, plan rev 39, `13a6e66`); its subject is
>   struck and is not restated.
>
> **Third-digest addendum, same day.** **F-QA11 is bounded** — 1 of 4 sites in its class, two siblings
> guarding the same sentinel; the held item steering carries should be scoped to `NewMessageModal` alone, not
> to the guild control generally. **F-QA13 — DROPPED under D44** (owner ruling, plan rev 39, `13a6e66`); its
> subject is struck and is not restated.


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

M2-a names the Load as the repair path for the flag-conflict records **5712 / 5842**:
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
**BC-17**, not answered by reading.

## 7. Findings raised by this pass

| ID | Finding | Severity | Routed to |
|---|---|---|---|
| **F-QA15** | Row D unreachable at the Message JSON modal; M2-a's repair path closed for 5712/5842; M8-F parity observably false. Regression vs `c85945f`. | **BLOCKING** | **implementer**, immediately |
| **F-QA16** | `012-json-editor-repair-path.test.ts` re-anchoring is **blocked on F-QA15** and is owed by **QA** the moment it is fixed; its third assertion must be rewritten, not restored, because D18 made it substantively false. `012-message-mode.test.ts` is a clean D16 re-anchor, owed by QA, not blocked. | High | **QA** (self), after the fix |
| **F-QA17** | `SUPPORTED_TOP_LEVEL_TYPES` exists **twice** — `server/api/utils/shapes.ts` (pinned set-equal to the schema union by M4-b) and a private duplicate in `utils/discordResponseToMessage.ts`. They agree today; **nothing asserts they stay equal**. Adding a type to the schema side alone silently makes the ingress converter drop-and-report a type the JSON surfaces accept. M3-b states its class as if there were one set. | Medium | **implementer** (a set-equality spec, cheap) |
| **F-QA18** | Type-11 (Thumbnail) — the one member that is a V2 type *and* outside `SUPPORTED_TOP_LEVEL_TYPES` — has no coverage into `gateBeforePersist`, which receives the **unfiltered** draft. At the JSON surfaces the lenient filter strips it first, so the gap is reachable only through the persist gate. | Medium | **implementer** |
| **F-QA19** | `NewMessageModal`'s `gateBeforePersist` branch is **live** (F-QA15's sibling finding, §6) but **exercised by no spec**. INFO-2's "dead today" is withdrawn on QA's evidence. | Medium | **steering** — R9's closure basis is affected |

**Carried from Phase 1, unchanged**: F-QA11 (bounded to `NewMessageModal` alone; pre-existing at
`c85945f`, held item, not a fix round), F-QA12 (QA's own probe defect, retrospective), F-QA13
(**DROPPED under D44**).

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
continuing after the register's true high-water mark. **Corrected 2026-08-24 — see the
collision note below: this pass originally wrote "continuing at BC-13", which was false and
minted exactly the parallel ID space the sentence denied minting.**

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode (operator terms) | Owner | State |
|---|---|---|---|---|---|---|---|---|---|
| **BC-16** *(name: `p2-rowd-load-gate`)* | PRE | **F-QA15**: open record 5712's Message JSON modal and confirm the **Load button is enabled**, and that pressing it with zero edits clears the flag and preserves the content | `verification/013/probe-qa-p2-rowd-load-gate/` re-run green after the fix (**settles it without a human**) | fallback only: operator observation, since no mounted render exists here | the F-QA15 fix is committed | probe green; then 5712 loads and saves with content intact and the bit cleared | *The user sees a correct diagnosis of their broken record and a dead button. The repair 013 exists to deliver is computed and then withheld.* | **implementer** (primary needs no human) | **Not started — BLOCKING** |
| **BC-17** *(name: `discord-returns-row-e`)* | POST | Can Discord's API **return** a message carrying both classic content and V2 components? (§6's residue — it refuses to *send* one, but the import path reads pre-existing messages) | production observation of the URL-import path | UAT agent | chain tip deployed **and** an import attempted against a message known to predate V2 enforcement | if such a message exists, the row-E choice appears rather than silent loss | *If Discord can return one and the branch is wrong, the user loses half their message on import with no prompt — and the branch is exercised by no spec (F-QA19), so nothing else would catch it.* | uat | Not started |

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
(`enforceImportMutualExclusivity`) has **zero production callers** at the tip; and a fourth ground it
carried is **dropped under D44**, its subject struck with it. It was
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
(both retrospective), F-QA13 (**DROPPED under D44**), F-QA17/F-QA18 (closed by `53beb37`'s specs, re-run green this pass).

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
| **BC-16** *(name: `p2-rowd-load-gate`)* | PRE | *(from Phase 2; renumbered from BC-13)* F-QA15: 5712's Load button is enabled and the repair completes | `verification/013/probe-qa-p3-fixverify/` | — | fix committed | probe green | — | implementer | **DISCHARGED 2026-08-24** at `164d720` — probe green, 25 assertions, F1/F2 killed. The mounted-render half moved to BC-15 under D28. |
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

---

## Final re-anchor — `821330d` → `a151fb4` (fully committed)

QA's three test paths were committed as `a151fb4` on the owner's approval, given directly in this
session. **This anchor differs in kind from the two before it**: `164d720` and `821330d` both
depended on a content-identity manifest because the files backing the verdict existed only in the
working tree. They no longer do.

**`Verified-At: a151fb4` is a plain SHA and the manifest fallback is out of force.** Per the
precedence rule — a committed tree takes the SHA, the manifest covers only what is uncommitted —
there is now nothing for it to cover. Anyone re-deriving this verdict checks out one commit and
runs one command; no digests to reproduce, no working-tree state to reconstruct.

| At `a151fb4`, nothing uncommitted | **550 tests / 37 files / exit 0** |

What landed, all test-only, no production code:

    012-json-editor-repair-path.test.ts          +104   F-QA16 re-anchors
    012-message-mode.test.ts                      +13   F-QA16, D16
    013-fqa19-ingress-gate-reachability.test.ts  +130   F-QA19 coverage (new)

**Verdict unchanged throughout: QA Complete.** The three re-anchors moved the SHA, never the
verdict — each was verified by execution at its own anchor rather than carried forward.

### Approval provenance, recorded because it was contested

`steering-hooks-013-2` relayed the owner's approval, given by selection prompt in the steering
session. QA did **not** commit on that relay. A peer's report of the owner's consent is not the
owner's consent arriving here, and this pass had already declined the implementer's offer to land
these same three files on the adjacent principle. Confirmation was sought and given **directly in
QA's own session** before anything was committed. The relay was accurate — that is not the point;
it was not verifiable from here, and a gate honoured only when the relay might be wrong is not a
gate.

### Note for the release path — this does NOT discharge U-C1

`code-reviewer-hooks-013-3`'s round 19 verdict is δ-cleared to `164d720`. It is now **two commits
behind**: `821330d` (the implementer's F-QA21 fix) and `a151fb4` (these three). QA re-deriving the
delta is **evidence for the reviewer's ruling, not the ruling** — UAT declined to take that
argument itself and was right to. The reviewer re-verifies against `a151fb4`, or U-C1 stays open.
QA does not clear another gate's condition by arriving at a green suite.

---

# Gate-scoped QA pass — owner ruling 2026-08-25 (toast vessel)

**Tree**: `chain/013-toast-vessel`, tip **`abcf585`**, one commit atop `a151fb4`.
**Verified-At (this section)**: `abcf585707b11e331d3c5fa0ad575dfee760e516`
**Suite at the shipped tree**: **559 tests / 38 files / exit 0** (550 at `a151fb4` + the 9 new).
**Verdict**: **QA FAILED** — see "Verdict" for what that does and does not mean, and read the
release note there before treating it as a reason to hold a live fix.

## 0. This is a post-implementation audit, not the two-phase record

QA was first invoked after implementation and commit. There was **no Phase 1**, so the entry
conditions Phase 1 exists to hand the implementer were never handed over. Stated explicitly rather
than collapsed into a single audit that reads like the prescribed process. The
Irreversible Side-Effect Register is produced anyway (§2), and §2 records what it would have
changed had it existed.

## 1. Authority — thin, and scoped accordingly

Re-derived, not taken from the relay: **`grep -ic toast` over `planning/013-…md` returns 0**, and
over the critique returns **0**; **`planner-hooks-013-2` appears 0 times** in the plan. There is no
plan revision and no planner run. The authority for this work is an **owner ruling given in
conversation**, quoted verbatim in the implementation document, in two parts where the second
refines the first.

**I do not judge that insufficient, and I did not stop.** The owner directs the product; what is
missing is a *plan revision*, which is a traceability defect, not an authority defect. I adopt
`code-reviewer-hooks-013-3`'s scoping: this pass tests **conformance to his words**, and does
**not** ratify the product decision. One consequence is load-bearing and stated plainly: with no
plan there are **no acceptance criteria**, so the property audit below enumerates against his
sentences and nothing else. A criterion nobody wrote is a criterion nobody can be measured against.

## 2. Irreversible Side-Effect Register

A notice-vessel change looks side-effect-free. It is not, and this is what a Phase 1 would have
handed the implementer as its entry condition:

| ID | Irreversible act | Route | Ordering that must hold | Enforced identically on every route? |
|---|---|---|---|---|
| **IS-T1** | **A message is published to Discord** (`sendWebhook`) missing components the import silently dropped | `send/page.tsx` | The user must **see** the dropped-components fact *before* sending. 013 moved that fact from a toast to a persistent surface — so the notice **rendering** is now the only thing standing between a silent drop and an irreversible publish | **NO — and this is the finding.** The code-import route now renders via `CodeMessageNotice`; the URL and webhook routes already rendered it persistently; the **paste** route renders `settledNotice`, whose render path is verified **only as source text** (§5). Three routes, three different mechanisms, one of them unverified |

**What this register would have changed had it existed before implementation**: it makes the render
property a *gate*, not a nice-to-have — because the notice is an upstream guard on an irreversible
publish. The shipped spec would then never have been accepted as text-pinning, since a text
assertion cannot guard an irreversible act. The reviewer reached the same place from a different
direction (its routed Assumption Not Checked); the register would have reached it *before* the code
was written.

## 3. Class sweep — the ruling names a class, so it closes on a predicate

The owner's words: *"changed **everywhere** that 013 decided to use a toast for a stateful
message."* That is a class. Per "A Class Correction Closes on Its Predicate, Not Its Instances",
the predicate is derived from the class definition and the enumeration re-run — **not taken from
the implementer's list**.

**Predicate**: `toast.*` call sites in `src/` (excluding `__tests__`) **added by chain 013**,
measured as additions in `git diff c85945f..a151fb4` — `c85945f` confirmed the 013 base by
`git merge-base --is-ancestor`, `a151fb4` being the tree as it stood when the owner ruled.

**The class has exactly three members**, and all three are dispositioned:

| # | Site | Disposition | Status |
|---|---|---|---|
| 1 | `NewMessageJsonInput.tsx` — settled-disposition notice | **converted** to `settledNotice` state | ✅ |
| 2 | `MessageProvider/index.tsx` — code-import dropped-components fact | **converted** to `codeMessageDroppedNotice` + new `CodeMessageNotice` | ✅ |
| 3 | `JsonModalBody.tsx` — Load notice | **deliberately retained** as a toast; owner has ratified | ✅ (settled, not reopened here) |

**The sweep is COMPLETE and correctly scoped.** The 22 other `toast.*` sites in `src/` are
pre-existing and outside the ruling's own predicate ("that **013** decided"). This is the hardest
obligation in the pass and the implementer met it — recorded as a pass, not passed over in silence
because the rest of this section is critical.

## 4. TDD Compliance gate — FAILED on the stated criterion

The table exists with the required columns and **two rows** for this round. Both answer
**`Test Written First?` = No** — a self-diagnosed ordering lapse, disclosed in full, twice, with a
compensating-evidence procedure (`git stash` the three tracked files + `mv` the untracked new
component to `/tmp`, re-run against the genuinely reverted tree: 7/9 red, 2/9 green; restore, 9/9
green). The 2 green assertions target *retained* toasts — unchanged behaviour that can never go red
for this change — and **the document says so itself** rather than hiding it.

**The disclosure is exemplary and is not what fails this gate.** Three things do:

1. **The stated criterion is "all Yes".** Two rows answer No. That is a straightforward fail, and
   softening it because the disclosure was honest would make the gate mean nothing.
2. **`CodeMessageNotice.tsx` is a NEW component with no row of its own and no stated exemption** —
   it survives in the table only as a trailing clause inside another row's subject. New feature code
   needs a row or a classed exemption; a clause is neither.
3. **`layout.tsx` has neither a row nor an exemption** — it is two lines of wiring, the least of the
   three, but it is the mount point on which the whole render property depends.

### The compensating evidence proves less than it claims

Its stated conclusion is that the run *"confirms the tests are coupled to the actual code paths they
name, not vacuously true."* **That claim does not survive execution.** Every assertion in the
shipped spec is `readFileSync` + `toContain`/`not.toContain`. A source-text assertion is
**tautologically red on a reverted tree** — of course `not.toContain('toast.warn')` fails while the
toast is still there. Reverting the source and observing red establishes coupling to the *text*, and
nothing whatever about coupling to *behaviour*. §5 measures the difference.

## 5. The reviewer's routed assumption — converted from suspicion to measured fact

Instrument captured at **`verification/013/probe-qa-toast-vessel-render/`** (13 assertions, README,
manifest, every run log). It calls React components as plain functions and inspects the returned
element objects — **no jsdom, no happy-dom, no testing-library, no `vitest.config.ts` change**, so
D28 holds.

| Mutant | What the user gets | Shipped spec | QA instrument |
|---|---|---|---|
| **R1** — `show={codeMessageDroppedNotice}` → `show={false}` | the notice **never renders, ever** | **9/9 GREEN, survives** | **3 failed — killed** |
| **R4** — notice body → `{''}` | an **empty warning box** | **9/9 GREEN, survives** | **1 failed — killed** |
| **R2** — `show={true}` | notice shows with nothing to say | — | **2 failed — killed** |
| **R3** — drop `text-warning` | renders unstyled | — | **1 failed — killed** |

**The shipped spec is vacuous for the entire substance of the change.** Under R1 the converted
notice never appears and the suite reports success. That is the reviewer's assumption, measured.

**Instrument score with its predicate**: 4 mutants seeded at `CodeMessageNotice.tsx`'s render
expression, `show` prop and styling hook — 4/4 killed by the QA instrument; of the 2 also run
against the shipped spec, 2/2 survived. **Excludes** the paste surface entirely and the provider's
effect body.

**One mutant did not apply and is recorded, not dropped.** R4's first anchor never matched; the run
reported `9 passed, exit 0` — indistinguishable from a survivor. The harness asserts anchor presence
before mutating and raised `MUTANT DID NOT APPLY`. Without that guard this pass would have recorded
a false survivor.

### What the instrument establishes, and what it cannot

**Established by execution**: `CodeMessageNotice` returns `null` with no fact and the notice text
with one; it **clears** when the fact goes away; it carries a real styling hook; `NullableComponent`'s
truthiness contract holds across all five input classes including `''` and `false`. Separately,
`bg-quaternary` and `text-warning` **do resolve** in `tailwind.config.js` (lines 40 and 53), so the
notice cannot render invisibly for a missing-theme-token reason, and the claimed `send/page.tsx`
styling precedent is real.

**Not established, and unreachable from here — the paste surface.** `NewMessageJsonInput`'s
`settledNotice` render path is asserted **only as source text**. I tried to reach it and failed for a
specific, nameable reason, captured in `trace-paste-surface-unreachable.txt`: `useCopyToClipboard`
calls `useRef` before `settledNotice` is reached and React's dispatcher is null outside a renderer,
so the component function throws at its second hook. Reaching it needs the harness D28 forbids.
**This is the larger of the two gaps and it is the site the owner's ruling actually named** — *"when
inserting the conflicting payload into the new message JSON modal"*.

The four `paste surface guard` cases close that guard's *logic* — `!error && settledNotice`, each
conjunct the sole carrier of the decision in some fixture — through the real `NullableComponent`.
But that fixture **supplies the expression** instead of reading it from source, so it measures the
semantics and not the wiring. Stated rather than smoothed over.

## 6. Property audit — each criterion's class, enumerated

No plan means no acceptance criteria, so the audit runs against the ruling's sentences.

| The owner's words | Class it names | Does the suite enumerate the class? |
|---|---|---|
| *"a permanent state warning… needs to be a message in the modal itself"* | every 013 toast carrying durable state | **Membership: YES** (§3, 3/3). **Behaviour: NO** — the "is a message in the modal" half is text-pinned at both converted sites and render-verified at only one (§5) |
| *"Toasts are for transient states, like a request firing and/or failing"* | the retained transient toasts | **YES** — asserted positively (`toast.error`, `toast.loading` retained), a real both-directions control rather than a blanket removal |
| *"changed everywhere that 013 decided…"* | the class predicate | **YES** — re-derived here from the diff, 3 members, all dispositioned |
| *"if the action is not transient then the message should be persistent"* (refinement) | the per-site test | **YES for site 3's retention**, which is argued against the test rather than asserted, and the owner has ratified it |

## 7. Findings

| ID | Finding | Severity | Owner |
|---|---|---|---|
| **F-QA23** | **The shipped spec is vacuous for the change's substance.** Mutants R1/R4 break the user-visible behaviour entirely and leave it 9/9 green. Its assertions pin source text, so no behavioural defect can fail them | **HIGH** — blocking | implementer |
| **F-QA24** | **TDD gate fails as stated**: two rows answer `Test Written First? = No`; `CodeMessageNotice.tsx` (new component) has no row and no exemption; `layout.tsx` has neither | **Medium** | implementer |
| **F-QA25** | **The compensating-evidence claim overstates.** Red-on-reverted-tree is tautological for text assertions and establishes text coupling only, not the behavioural coupling it claims to close | **Medium** — method, not code | implementer |
| **F-QA26** | **The paste surface's render path is unverified and unreachable** without a harness D28 forbids — and it is the site the ruling named. Upstream guard on IS-T1 | **Medium** — routed, not closable here | owner (observation) |
| **F-QA27** | **The implementation document contradicts the committed tree in five places**: it states the round's files are *"uncommitted, pending steering's go-ahead"*, names tip `821330d`, names branch `chain/013-components-v2-editing-surfaces`, repeats a "four files" count its own line 67 corrects to five, and its Next Steps still asserts QA Complete at `164d720`. Only one changelog line records the commit | **Low** | implementer |

**Not a finding, recorded as a pass**: the class sweep (§3), the both-directions transient-toast
control, the theme-token resolution, and the disclosure quality of the ordering lapse.

## 8. Blocking Release Condition Register — appends

Appended to **chain 013's single register**, continuing after its true high-water mark of **BC-17**
(see the ID Collision note earlier in this document — that is the mistake this append avoids
repeating). Every row carries a stable **name**.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable | Predicted value | Failure mode (operator terms) | Owner | State |
|---|---|---|---|---|---|---|---|---|---|
| **BC-18** *(`paste-notice-renders`)* | PRE | Pasting a rows-B/D payload into **New Message** shows a **persistent** warning in the modal that stays put, and **clears** when the JSON is corrected | none available — the render path is unreachable without a harness D28 forbids (`trace-paste-surface-unreachable.txt`) | **subject**: the owner, at a browser. No non-human primary exists | now — the code is committed | a warning appears and persists; correcting the JSON removes it | *This is the exact site the ruling named. If it does not render, the round changed nothing where he asked, and the suite says it did.* | owner | **Not started** |
| **BC-19** *(`code-import-notice-visible`)* | PRE | A code-import that drops components shows the persistent notice **in the layout**, visible and legibly placed | `verification/013/probe-qa-toast-vessel-render/` closes returns-an-element, clears, and styling; **visibility and placement are not instrument-closable** | primary settles the logic; **subject** for the eye: the owner | now | notice visible above the fold, not hidden behind nav | *A notice that renders into a hidden or overlapped box is indistinguishable from the toast bug it replaced.* | qa (logic) + owner (eye) | **Logic PASSED; visual not started** |
| **BC-20** *(`dropped-notice-guards-send`)* | POST | A user who imports a message with dropped components **does not publish it to Discord unaware** — IS-T1's upstream guard actually guards | production observation | uat | chain tip deployed | no report of a sent message missing components the importer dropped | *The publish is irreversible. If the notice fails, the loss is silent and permanent.* | uat | **Not started** |

**Standing note, as on every list here**: this register is point-in-time. Later stage documents —
the UAT document, then the deployment record — are authoritative on each row's execution state.

## 9. Verdict

**QA FAILED**, at `abcf585`, on **F-QA23** (blocking) with F-QA24–F-QA27 attached.

**What this failure is NOT.** It is not a claim that the fix is broken. Everywhere my instruments
reach, the code behaves correctly: the class sweep is complete and right, the converted component
renders and clears, the retained site is argued against the owner's own test and ratified, the theme
tokens resolve, and the suite is green at 559/38. It is not a penalty for the ordering lapse, which
was disclosed better than most passes disclose anything.

**What it is.** The suite does not test the change. Two mutants that destroy the entire user-visible
substance leave it fully green, so its green carries no information about the property the owner
actually asked for. Accepting that would ratify a spec I have measured to be vacuous, and would put
a text assertion in front of an irreversible publish (IS-T1).

**Release note, and I want this read before the failure is used to hold anything.** This is a
**post-release fix to code already live** — `git ls-remote origin master` → `a151fb4`, established
at the remote. **A QA failure over test coverage must never be the reason a live UX fix waits.** The
code evidence above supports the change being sound; the gap is in what guards it. If the owner
wants this shipped now and the coverage closed behind it, that is a defensible call and this document
supports it — the decision is his, not mine, and I would rather say so than let a procedural FAIL
quietly become a release block.

**Cheapest path to PASS** — the instrument already exists and is captured:
1. Adopt `verification/013/probe-qa-toast-vessel-render/013-qa-toast-vessel-render.test.ts` into
   `src/utils/__tests__/` (13 assertions, D28-clean, green at this tree; +13 → 572/39).
2. Add a TDD row for `CodeMessageNotice.tsx` and a row or classed exemption for `layout.tsx`.
3. Correct the five document/tree contradictions in F-QA27.
4. BC-18 remains the owner's regardless — no test closes it.

**Assumption Not Checked (mandatory).** *This pass assumes `CodeMessageNotice` is handed a live
`MessageProvider` context at runtime, and does not test it.* It is a `'use client'` component
mounted inside an **async server layout**; my instrument mocks `useMessage`, so a null context —
the classic server/client boundary failure — would **throw in production and pass here**. Falsity
signature: the `/message/m/[id]` route renders a client-side error boundary or a blank region where
the notice should sit, on **every** load rather than only when a notice exists. **Owner: the owner's
own browser sitting (BC-19)**, since no instrument in this chain mounts a Next.js route — named
again in the handoff so it is routed rather than shelved.

## 10. Handoff

**To the implementer** — F-QA23 (blocking), F-QA24, F-QA25, F-QA27; the remedy for F-QA23 is
capture-and-adopt, not new authorship.
**To the owner** — BC-18 and the Assumption Not Checked above; neither is closable by any instrument
this chain permits.
**Not to UAT yet** — a UAT pass over a suite measured vacuous for its own subject would inherit the
vacuity.

---

# Fix-round verdict — toast vessel, at `664e0c0`

**Tree**: `chain/013-toast-vessel`, tip **`664e0c0`**, two commits past live `master`, working tree clean.
**Verified-At (this section)**: `664e0c0f515ea553aa82a1697016d36507ded7d0` — a plain SHA; nothing
uncommitted backs this verdict.
**Suite**: **572 tests / 39 files / exit 0**. `tsc --noEmit`: **0 errors**.
**Verdict**: **QA COMPLETE — the blocking finding is discharged.**

## 1. F-QA23 — CLOSED by execution, not by inspection

The delta was measured, not read from the handoff: `git diff --numstat abcf585..664e0c0` is one path,
test-only; the same command with `':(exclude)*__tests__*'` is **empty**, so **no production code
moved**. My instrument was adopted **byte-identical** — `sha256 ca85911d…` on both the repository
copy and the capture, `diff -q` clean.

Byte-identity plus zero production movement would let the earlier mutation results be inferred. They
were **re-executed instead**, because zero movement licenses a scoped pass and never a
carried-forward verdict:

| Mutant | At `abcf585` (shipped spec alone) | At `664e0c0` (full suite) |
|---|---|---|
| **R1** — the notice never renders | **9/9 GREEN, survived** | **3 failed / 569 — KILLED** |
| **R4** — the notice renders empty | **9/9 GREEN, survived** | **1 failed / 571 — KILLED** |

The defect class that previously passed unseen now fails the shipped suite. **F-QA23 is closed.**

**Chain of custody, stated because it is the interesting part.** The implementer disclosed — in
three separate places — that it **read my captured mutation logs rather than re-executing the
mutants**. Read-as-evidence would normally be weak. It is not weak here, and the reason is not that
reading logs is acceptable: it is that **two other parties executed independently**.
`code-reviewer-hooks-013-3` built `probe-cr22-render-instrument-nonvacuity/` specifically without
trusting my capture — importing the real component, replaying a byte-copy of the helpers, running
its own inline mutants — and **I re-ran that probe myself rather than citing its reported figure:
4/4, exit 0**. Its directory contains zero references to jsdom, happy-dom or testing-library,
corroborating D28 compliance from a second hand. The disclosure was the right call and the
underlying claim is backed by execution twice over.

## 2. F-QA26 / BC-18 — QA WITHDRAWS ITS OWN "UNREACHABLE" FINDING

**This is a correction against the previous section of this document, and it is mine.**

That section recorded the paste surface — `NewMessageJsonInput`'s `settledNotice`, **the site the
owner's ruling actually named** — as unreachable without a harness D28 forbids, and routed the whole
of BC-18 to the owner's eyes. **That was wrong.**

The evidence behind it was real: the component throws at its second hook, because
`useCopyToClipboard` calls `useRef` and React's dispatcher is null outside a renderer. The **inference
was too strong.** "Throws at hook 2" is not "unreachable" — mocking the three custom hooks makes the
`useState` order deterministic and the component plainly callable. Withdrawn by execution, not by
argument: `trace-reachability-PROVEN.txt` is the rendered text of the real component carrying an
injected notice.

New instrument at **`verification/013/probe-qa-paste-surface-render/`** — 5 assertions against the
real component, 4 mutants seeded at the notice's render site, **4/4 killed**:

| Mutant | What the user gets | Result |
|---|---|---|
| **P1** `show={!error && settledNotice}` → `show={false}` | notice never renders | **3 failed — killed** |
| **P2** → `show={settledNotice}` (drops the `!error` conjunct) | notice shows *over* an error | **1 failed — killed** |
| **P3** notice body → `{null}` | empty warning box | **2 failed — killed** |
| **P4** drop `text-warning` | renders unstyled | **1 failed — killed** |

**P2 is the one that matters.** It removes exactly one conjunct and leaves the sibling to cover for
it — and it fails. That establishes the `!error` conjunct as the **sole carrier of the decision** in
at least one fixture, against the **real wiring**. The earlier probe's guard cases could only
replicate the expression and said so; this supersedes them.

**BC-18 shrinks rather than closes.** Still the owner's: **visibility** (CSS cascade, `z-index`,
`overflow`, contrast), **placement**, and the **real Next.js mount**. No longer his: whether the
notice renders at all, suppresses under an error, clears, and is styled.

**The method failure, named because it is the transferable part.** I stopped at the first mechanism
that resisted, generalised from a single attempt, wrote the boundary into a verdict, and routed a
closable property to a human. **A boundary claimed after one attempt is a hypothesis.** This one
held less than a day. Had nobody re-tried it, the owner would have been asked to eyeball a property
an instrument could have guarded permanently.

## 3. F-QA24 — CLOSED

Two rows added. `CodeMessageNotice` now has its own row, gated **behaviourally by mutation** rather
than by a stash-revert — the right instrument for a component with real conditional logic.
`layout.tsx` has a **stated exemption** in a named class (wiring-only: one line of JSX, no branch,
no prop-derived behaviour), with its visibility/placement half explicitly routed to BC-19 rather
than claimed as verified. An exemption stated and classed is what the gate asks for; this is one.

**Three rows still answer `Test Written First? = No`, and I am not pretending otherwise.** The
ordering lapse is a historical fact about work already done and cannot be retroactively made Yes.
I pass the gate on the substantive ground that its **purpose — coupling — is now met by stronger
evidence than Red→Green ordering would ever have produced**: mutation kills, independently
reproduced. Passing on that basis is a judgement, and it is recorded as one rather than smuggled in
by reading the table charitably.

The lapse is now **twice recorded in this document** (here and `messageStore.store`) with the
implementer naming it as a pattern rather than a one-off. That belongs to the retrospective, not to
this gate.

## 4. F-QA25 — CLOSED on substance; one method note against the correction itself

The overstated claim is corrected **in place, where it was made**, and correctly **narrowed rather
than abandoned**: the stash-revert procedure remains right for source-text specs, and stops being
sufficient the moment the property is behavioural. That is exactly the distinction, in the terms
raised.

**Method note, minor and slightly ironic.** The original sentence was **overwritten, not restated
beside** — its trailing clause (*"closing the gap the ordering lapse opened"*) survives nowhere in
the document, not even inside the correction's own quotation. Restating beside rather than over is
the rule that keeps a correction auditable. Recorded, not escalated.

## 5. F-QA27 — SUBSTANTIALLY closed, one of my five still standing

Six locations corrected in place, each stating what changed and why, and the audit was run against
the class rather than patched at the instances — the right method.

**Not closed: line 66**, the toast-vessel changelog row, still reads *"Not committed to `website`…
remain uncommitted in the working tree pending steering's go-ahead"* and still carries the "four
files" count. It is unmarked at that location. Two later locations mark the claim stale and the
adjacent row corrects the count, so a reader who continues is not misled — but a reader who stops
there is. **Low severity, not blocking**, carried as F-QA27-residue.

**Two further stale fields the sweep did not reach**, offered rather than charged: line 12 still
cites this QA document at `98f978e` with Status `Awaiting Implementation`, and line 14 still names
`implementer-hooks-013` where recent rows are `implementer-hooks-013-3`.

## 6. New findings

| ID | Finding | Severity | Owner |
|---|---|---|---|
| **F-QA28** | **The paste-surface instrument is not in the repository.** The property is *verified* at this tree (§2) but not *guarded* against future change — the same argument that made F-QA23 blocking applies to its future, not its present. Captured at `verification/013/probe-qa-paste-surface-render/`; adoption is a copy, +5 → **577/40** | **Medium** — not blocking | implementer (adopt); the commit itself needs the owner |
| **F-QA29** | **A TDD row asserts `Yes` while its own prose says otherwise.** The `messageStore.store` row answers `Test Written First? = Yes` / `Failure Verified? = Yes`, but its Failure Reason column opens *"Implemented before the test was authored (ordering lapse…)"*. **This is the one row-shape that defeats the gate silently** — the disclosed `No`s are honest and auditable; a false `Yes` is neither. Earlier round, untouched by this one | **Medium** | implementer |
| **F-QA30** | F-QA25's correction overwrote the original claim rather than restating beside it (§4) | **Low** | implementer |

## 7. Verdict

**QA COMPLETE** at `664e0c0`. The blocking finding is discharged by execution; F-QA24, F-QA25 and
the bulk of F-QA27 are closed; F-QA28/F-QA29/F-QA30 and the F-QA27 residue are open and
**none of them blocks a release**.

**The release note from the previous section still stands and has not been answered.** 013 is live
at `a151fb4`; this chain branch is two commits ahead and unpushed. Nothing in this verdict depends
on how the owner answers it.

**Assumption Not Checked (mandatory).** *This pass assumes the `useState` call order I inject into
`NewMessageJsonInput` matches the order React actually assigns at runtime, and does not test it.*
The instrument mocks `useState` and feeds values positionally — json, error, dropped, pending,
dismissed, settled — derived by reading the source. If a future edit reorders those declarations or
inserts one, the fixture will silently address the **wrong** state slot: the notice assertions would
then be exercising, say, `dismissedChoice`, and could stay green while the real notice broke.
Falsity signature: the paste-surface spec passes while the owner sees no in-modal warning — the
exact symptom BC-18 exists to catch, which is why that row is **not** closed by this instrument.
**Owner: implementer**, at the next edit to that component's hook block — named again in the handoff
so it is routed rather than shelved.

## 8. Handoff

**To the implementer** — F-QA28 (adopt the paste instrument), F-QA29 (the false `Yes` row), F-QA30,
the F-QA27 residue at line 66, and the Assumption Not Checked above.
**To the owner** — BC-18's remaining half (visibility, placement, real mount) and BC-19; plus the
unanswered release note.
**To UAT** — clear to proceed. The suite is no longer vacuous for its own subject, and that is
established by mutation reproduced independently by two other stages.

---

# Re-issued verdict at `4a7126b`

The `664e0c0` verdict expired with the tree; this replaces it rather than extending it. The earlier
record stands for its own tree and is not withdrawn.

**Tree**: `chain/013-toast-vessel`, tip **`4a7126b`**, working tree clean.
**Verified-At**: `4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f` — plain SHA, nothing uncommitted.
**Suite**: **577 tests / 40 files / exit 0**.
**Verdict**: **QA COMPLETE.**

## 1. Delta, re-derived

`git diff --numstat 664e0c0..4a7126b` — one path, test-only. The same range excluding `__tests__` is
**empty**. Against **live master**, `git diff --numstat a151fb4..4a7126b -- ':(exclude)*__tests__*'`
returns exactly the four source files unchanged since `abcf585` — so **every commit since the
release is test-only**, and the production surface under this verdict is the same one `abcf585`
introduced. My paste instrument was adopted **byte-identical** (`sha256 bf74ce77…`, `diff -q` clean).

**F-QA28 closed.** The suite reached **577/40** — the figure this document predicted before adoption,
which is a small but real cross-check that the adopted file is the one that was measured.

## 2. My own Assumption Not Checked — CLOSED, and the reasoning under it corrected

The `664e0c0` verdict raised an assumption against my own instrument: it mocks `useState` and feeds
values **positionally**, an order derived by *reading* source. Drift would let it address the wrong
slot and stay green while the notice broke.

**The relayed justification for why it is aligned is wrong, and the correction matters more than the
conclusion.** It is not the case that the mocked hooks consume no `useState` slot. Read from real
source: `useCopyToClipboard` calls `useState` **once**, `useCodeMirror` **twice**, and
`useCopyToClipboard` is invoked *between* `jsonMessageString` and `error`. In a genuine render the
order is `[json, copyState, error, …]` and my injection would be **misaligned by one**. Alignment
holds **because those hooks are mocked** — the mocks are **load-bearing for correctness**, not just
for callability. The conclusion (aligned) is right; the stated reason is not, and a future reader
who inherits the reason rather than the mechanism would mis-maintain this file.

**So I tested the assumption instead of arguing it.** Every drift path executed:

| Drift | Simulates | Result |
|---|---|---|
| **A1** remove `useCopyToClipboard` mock | someone prunes a "redundant" mock | **5/5 FAIL**, hard module error |
| **A2** remove `useCodeMirror` mock | same | **5/5 FAIL**, `TypeError … 'useCallback'` |
| **A3** insert a `useState` before `settledNotice` | ordinary edit to the hook block | **3/5 FAIL** |

**Every drift path fails loudly; none fails silently.** The mocks pass `useCallback`/`useEffect`
through to real React, which throws outside a renderer, so a removed mock is a hard error rather
than a quiet slot shift; and a shifted slot feeds `settledNotice` its initial `null`, which the
render assertions catch. **The assumption is closed, not narrowed.** Captured at
`verification/013/probe-qa-paste-surface-render/`.

## 3. Independent confirmation of a withdrawal, recorded because of its direction

`code-reviewer-hooks-013-3` did not merely run my adopted instrument — it attacked the novel part,
the positional mock, and re-ran my oracle against the real component plus real-source mutants: 3/3,
control passing, never-render and drop-the-`!error`-conjunct both killed. That independently
confirms **the withdrawal of my own F-QA26** — a finding I had raised, and then had to retract. The
retraction is now the better-evidenced of the two positions, which is the right outcome and worth
recording as such rather than quietly leaving the withdrawal to stand on my word.

## 4. Prior findings

| ID | State |
|---|---|
| **F-QA28** | **CLOSED** — instrument adopted byte-identical, 577/40 |
| **F-QA29** | **CLOSED** — reported fixed, and the implementer swept the whole TDD table for the same contradiction rather than trusting mine was the only instance. Sweeping on the predicate instead of the reported instance is the correct method and is noted as a pass |
| **F-QA30** | **CLOSED** — original claim restored with the correction beside it |
| **F-QA27 residue** | **CLOSED** — line 66 marked in place with a pointer to where it is corrected |
| **BC-18 / BC-19 residue** | **OPEN, owner** — visibility, placement, real Next.js server/client mount |

## 5. Residue scoping — I align with the reviewer

Steering offered to carry a differing disposition. There is none to carry: the reviewer's residue —
**visibility, placement, and the real server/client mount, owner-observation only under D28** — is
exactly the residue this document reached independently after withdrawing F-QA26. Two stages
arriving at the same boundary from different directions is worth more than either statement alone.

## 6. Verdict

**QA COMPLETE** at `4a7126b`. No open finding of mine blocks a release.

**On whether this is the last round** — steering's reading is correct as far as QA is concerned.
Every captured instrument is now adopted, so the adopt-a-test/move-the-SHA/re-verify loop has no
remaining input from this stage. This pass turned up new *evidence* (§2) but required **no code
change**, which is precisely why it does not start another round. Should QA be woken again on this
chain, it should be for something other than its own backlog.

**Assumption Not Checked (mandatory).** *This pass assumes the four production files are byte-for-byte
what `abcf585` introduced, and verifies that only by `git diff --numstat` over the range* —
a path-and-count instrument, not a content hash of each file at each tip. A rebase, an amend, or a
force-push that reconstructed the range with altered content while preserving the same per-path
add/delete counts would be invisible to it. Falsity signature: the production surface behaves
differently in the owner's browser from what this suite asserts, while every SHA and every count in
this document still reconciles. **Owner: devops**, at release assembly, where the tip is verified
independently under Phase 3 — named again in the handoff so it is routed rather than shelved.

## 7. Handoff

**To devops** — a release-tip verdict (Phase 3) is still owed and is not inferable from this record;
plus the Assumption Not Checked above.
**To the owner** — BC-18/BC-19's residue; the unanswered questions about the 00:56 push and the
deploy; and the release note, which has **softened but not lapsed**: the coverage now exists rather
than being promised, so shipping is no longer a trade against absent verification.
**To UAT** — clear. The prior UAT session retired at its ceiling; a fresh one is the owner's to
authorise, not a stage's to spawn.

---

# Register dispositions — owner's release decision, 2026-08-25

Three items reached this register via `steering-hooks-013-2`. All three are QA's to judge because
the row definitions are QA's. Recorded beside the rows, not over them.

## 1. BC-18 / BC-19 — reclassification request DECLINED, and the rows re-dated instead

`uat-hooks-013-3` was right that it could not perform this itself, and right to route it. The
request is declined, but **not** on the ground that the owner's choice is illegitimate — it is his
to make, and a shipped-first decision is a normal one.

**Why declined.** The `PRE`/`POST` split in this register is a statement about **what can observe a
condition**, never about what anyone intends to do. BC-18 asks whether a persistent notice renders
in the New Message modal. That is observable from a local dev server and always was. Marking it
`POST` would assert *"nothing pre-release could observe this"*, which is **false**. A row does not
become post-deploy-observable because the pre-deploy observation was skipped.

**Why the reclassification is also unnecessary — the point that dissolves the conflict.** BC-18 and
BC-19 **do not expire at deploy**. Unlike BC-11a, whose mint route closed at go-live, the paste and
code-import observations are available before release *and* after it, unchanged. Nothing is lost by
the owner shipping first except the ordering. So the rows need **re-dating, not reclassifying**:

- **BC-18**, **BC-19** — remain **`PRE` by decidability**. Recorded as **NOT MET AT THE RELEASE ACT**,
  by the owner's informed choice to release ahead of them. **Earliest-decidable
  amended**: *decidable now, and equally decidable after deploy — this condition does not expire.*
  State: **OPEN, owner, executable at any time.**

This keeps the record truthful in both directions: it does not pretend a skipped pre-release check
was never available, and it does not treat the owner's decision as an error. **A `PRE` row that
the owner has decided to carry past the release act is exactly what happened, and that is what the
register should say.**

**Amplifying steering's argument, because it is the strongest thing said about these rows and it
belongs in the register rather than in a message.** The new failure mode is **silent**. Before 013,
a badly-vesseled notice still *appeared* — a toast flashed past. If the converted notice fails to
render, the user sees **nothing at all**. Absence is the failure signature.

That has a consequence for classification which cuts against the requested change: **a
post-deploy-observable row whose failure signature is absence is the weakest kind of row in this
register**, because nobody reports a warning they never saw. Reclassifying BC-18/BC-19 to `POST`
would therefore not merely mislabel them — it would move them into the class where they are *least
likely ever to be settled*. Declining the reclassification protects the rows.

## 2. BC-18-SILENCE — a new `POST` row, since the owner has decided to release ahead

The register should now carry a genuine post-deploy detector, because one is owed and because the
existing rows are ill-suited to the job. This does **not** substitute for BC-18.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable | Predicted value | Failure mode (operator terms) | Owner | State |
|---|---|---|---|---|---|---|---|---|---|
| **BC-21** *(`notice-silence-detector`)* | POST | The converted notices are **not silently absent** in production: one deliberate paste of a rows-B/D payload into New Message on the live site produces a visible persistent warning | a single deliberate observation — **not** a wait for user reports, which cannot detect an absence | **subject**: the owner, on the live site. No non-human primary exists under D28 | now — `a151fb4` is live; re-decidable whenever `4a7126b` deploys | **one successful observation refutes "the notice is silently absent" by construction** — this is not a rate and needs no sample | *If the notice does not render, the user sees nothing where they previously at least saw a toast flash past — strictly worse than the defect 013 set out to fix, and nobody will report it, because absence generates no complaint.* | owner | **Not started** |

## 3. BC-11b — marked TERMINAL: CANNOT BE EXECUTED

The owner confirmed in his own words, by selection, that the push was his and the site is live —
so `a151fb4` has been serving since ~00:56 on 2026-08-25.

BC-11b's condition required **both outcomes** to be exercised, which needed a further record carrying
the shape. The mint route closed at deploy: after 013, no surface writes the row-D shape — the JSON
modal now repairs it on Load, and the paste surface disposes it before write. **The shape can no
longer be created, so no such record can be obtained, and no re-run recovers this.**

- **BC-11b** — **TERMINAL: CANNOT BE EXECUTED.** Not "failed", not "deferred", and explicitly not
  left open to lapse quietly. Evidence for its both-outcomes clause is **permanently unavailable**;
  the shape is unreachable through any surviving surface, so no substitute seed can be minted.
  **This is `devops-hooks-013`'s F-7 realised**, and it is recorded as a realised risk rather than
  as a new discovery.
- **What is actually lost**: only the both-outcomes half. The other half of the split (**BC-11a**) is
  **DROPPED under D44**. What BC-11b would have added is confirmation that the
  *second* disposition path behaves on a real production record. That is now unevidenced and will
  stay so.
- **Blocks nothing**, and is not a reason to hold anything.

**One-way-door note, recorded because it is the transferable lesson.** When a register row's evidence
has an expiry, **every row drawing on that evidence expires with it**, and the dependency should be
recorded on each row rather than inferred once. The instance it was drawn from is **struck under
D44** and is not restated.

## 4. QA's own Assumption Not Checked — CLOSED, re-derived here

The `4a7126b` verdict recorded that its "unchanged since `abcf585`" claim rested on
`git diff --numstat`, a path-and-count instrument blind to a range reconstructed with identical
counts. `uat-hooks-013-3` closed it on the substance with per-file blob SHAs. **Re-derived here
rather than accepted** — `git rev-parse <tip>:<path>`, all four files:

    f63b95df…  NewMessageJsonInput.tsx      MATCH at abcf585 and 4a7126b
    75dafce9…  CodeMessageNotice.tsx        MATCH
    d50a1992…  [id]/layout.tsx              MATCH
    955fc0ea…  MessageProvider/index.tsx    MATCH

**With the positive control UAT's report did not state**: the same instrument run against live
`master` (`a151fb4`) returns **DIFFER** for the two changed files. That matters — an instrument that
returned MATCH for everything would be indistinguishable from one that works, and the control shows
it discriminates. **Assumption closed.** The routing to devops at release assembly stands as the
independent second check, unchanged.

## 5. Verdict — unchanged

**QA COMPLETE at `4a7126b`** stands. Nothing in these dispositions moves the tree, and none of them
alters the verdict. **The Phase 3 release-tip verdict remains owed**: devops commissions it, QA
performs it at the assembled tip, and per-plan verdicts do not substitute for it. It has not been
discharged and cannot be discharged by default.

---

# Phase 3 — NOT PERFORMED, and a collision recorded

`devops-hooks-013` reports it has already commissioned Phase 3 against the assembled tip, while this
session was holding the same verdict. **Two QA instances believed they owned one release-scoped
record.** Commissioning is devops's, so this session **stands off** rather than resolving it — but
restraint here is the action, not the absence of one, and the reason is specific.

## Why running it unilaterally would have been the wrong move

A Phase 3 record **takes no ID**; it is named by release identifier (see this stage's Phase 3
definition). ID'd documents survive duplication because the ID distinguishes them. **A record with
no ID does not** — two Phase 3 documents for one release compete for the same name, and nothing in
the naming scheme separates them.

**This is the second collision of exactly this shape in this chain.** The first was the
BC-13/BC-14 duplication recorded earlier in this document, which survived long enough to be
propagated into four documents and was caught only because UAT checked every numbered reference
against the register rather than following the numbers. The lesson from that one applies directly
here: **a namespace that cannot express a duplicate does not prevent duplicates, it hides them.**
So the right response to a suspected collision is to stop and have it resolved deliberately, which
is what steering has asked devops to do.

## What this session re-derived, held ready rather than acted on

Devops's measurements confirmed independently here:

    git merge-base --is-ancestor a151fb4 4a7126b   -> TRUE
    merge-base(a151fb4, 4a7126b)                   -> a151fb4  (== master; no divergence)
    tree(4a7126b)                                  -> 189d9d60a595057027bee08ccf2731280e7ac04d
    git ls-remote origin                           -> chain/013-toast-vessel ABSENT; master = a151fb4

**So there is no assembly step.** Integration is a fast-forward and the assembled tip is `4a7126b`
byte-for-byte — the exact tree this document already carries a QA COMPLETE for. No SHA is coming
that differs from the one already held.

Three commits would ship, and the split matters: **`abcf585` is the only one carrying a production
change**; `664e0c0` and `4a7126b` are test-only adoptions of QA's own instruments.

## A Phase 3 observation offered to whoever performs it

Phase 3's substance is the clause that *"a plan that passed alone can fail beside another"*. **That
clause has no work to do in this release, and the reason should be stated rather than assumed**: only
one lineage is being released. `master` is a strict ancestor, nothing else merges in, and the other
remote branches (`backup`, `external-message-api`, `redesign`, `regex-refactor`) are unrelated and
not part of it. There is no second plan to combine with.

**That is a finding, not a formality** — it means a Phase 3 pass here reduces to verifying the tip
itself, and should say so explicitly rather than implying a combination check was performed on a
bundle of one. Whoever runs it should reach that conclusion by their own measurement; it is recorded
here so it can be *checked*, not inherited.

## Even-handed note on who should perform it

Stated as information for devops's decision, not as a bid to keep the work.

- **A fresh agent brings independence**, which Phase 3 genuinely wants — a release-tip verdict issued
  by the same session that issued every plan-level verdict inherits that session's assumptions, and
  this session has already had to withdraw one finding of its own (F-QA26) on this chain.
- **A fresh agent will not know** what this chain established: BC-11b is terminal and unrecoverable,
  F-QA26 was withdrawn and its replacement independently confirmed, BC-18/BC-19 are `PRE`-and-not-met
  by the owner's informed choice, and BC-21 exists because absence is this change's failure
  signature. None of that is inferable from the tree.

Both are real. The decision is devops's and this session does not contest it either way.

**State: Phase 3 NOT PERFORMED by this session.** No release-tip verdict has been issued here, and
the plan-level `QA COMPLETE at 4a7126b` **does not substitute for one**.

---

# SUPERSEDED ABOVE: Phase 3 collision resolved, and Phase 3 performed

**The section above headed "Phase 3 — NOT PERFORMED" is point-in-time and is now superseded.** It
stands as the record of the standoff and of why restraint was correct while ownership was contested;
it is **no longer current** on whether Phase 3 happened.

`devops-hooks-013` resolved the collision and **stood its fresh agent down** — it wrote nothing to
`agent-output/qa/` and reached only a build — then commissioned Phase 3 here directly. Devops
disclosed the duplicate spawn unprompted rather than letting two verdicts appear; that disclosure is
what made the collision cheap, and it is recorded as such.

**Phase 3 was performed and is written to `agent-output/qa/release-4a7126b-tip-verification.md`** —
**RELEASE VERIFIED** at `4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f`. That record takes **no ID**, per
this stage's definition, and does not amend this document. Full suite **577/577, exit 0**; build
**exit 0**; no assembly step; combination risk nil because the bundle is of one.

**Ruled, because devops asked rather than assumed:** the plan-level `4a7126b` verdict in *this*
document does **not** constitute the release-tip verdict, despite the matching SHA. A matching SHA
makes the subject identical, not the act — the plan-level pass was gate-scoped, ran no full suite and
no build. Cite the release document, not this one, as the release-tip verdict.

## U-5 — accepted, and my error corrected in place

`uat-hooks-013-3` found that this document's **prose** asserted `4a7126b` was released. **It is not,
and UAT is right.** Re-derived here at the remote before accepting: `git ls-remote origin master` →
`a151fb4`, and `refs/heads/chain/013-toast-vessel` returns **0 lines** — the branch does not exist at
the remote. Nothing from the toast round has reached production.

**A decision to ship is not a shipment.** Three passages corrected in place — "with `4a7126b`
shipped ahead of them" → "to release ahead of them"; the BC-18-SILENCE heading; and "a `PRE` row that
outlived the release act". **The reasoning is untouched; only the false premise is gone.**

**My own BC-21 row was right where the prose was wrong** — its earliest-decidable already read
*"re-decidable whenever `4a7126b` deploys"*, future tense. That is worth naming as a method fact: the
**structured row survived an error the surrounding prose did not**, because the row has a field that
forced the tense to be stated. Prose is what travels in relays; the register is what held.

**Consequence, which is the part that matters:** rev 13's approval is conditional on BC-18/BC-19
preceding the release act, and because nothing shipped that condition **has not been overtaken**.
Both remain executable today, before devops cuts anything, in rev 13's order. My finding that these
rows do not expire is what keeps that window open.

## A control instrument defect, verified here and worse than reported

UAT reports that `git rev-parse <tree>:<path>` on an **absent** path echoes its argument to stdout
while writing `fatal:` to stderr, so a stdout-only compare reports **DIFFER** where the truth is
**ABSENT**. **Verified here, and it is worse than that: it also exits 0.**

    $ out=$(git rev-parse a151fb4:…/CodeMessageNotice.tsx 2>/dev/null); echo "[$out]"; echo $?
    [a151fb4:src/app/message/m/[id]/_layout/CodeMessageNotice.tsx]
    0

**Exit 0 means an `|| echo MISSING` fallback never fires** — the guard silently does nothing. This
pass used that unsound form earlier when comparing blobs; it was safe only because all three paths
happened to exist. **Sound instrument: `git cat-file -e <tree>:<path>`**, which exits non-zero and
prints nothing. Confirmed both ways: `CodeMessageNotice.tsx` ABSENT at `a151fb4`, PRESENT at
`4a7126b`.

This is the **fourth** member of one class in this chain — piped `grep -c`, `ls -a | grep -x`,
`git diff --name-only | grep -c .`, and now `rev-parse` on an absent path. The class predicate is
**an existence or count predicate that cannot fail loudly**, and the standing remedy is to use an
instrument that computes before any output filter and signals failure through its exit code.

## BC-11b — UAT's caveat adopted

UAT adopts `CANNOT BE EXECUTED` as terminal with one correction: its definition fixes three terminal
states (`EXECUTED`, `WITHDRAWN`, `SUPERSEDED`) and this is a **fourth**, synonymous with none of
them. Nobody ruled BC-11b unnecessary — **only the owner could** — and nothing replaced it. It is
terminal **only** in the sense that no future act can change it. **It must never be read as
"closed": what it records is a permanent absence of evidence.** Adopted as stated.

## Register state at this verdict

| Row | State |
|---|---|
| **BC-18**, **BC-19** | **OPEN**, owner, `PRE`, executable **now** — not overtaken, since nothing shipped |
| **BC-21** | **OPEN**, owner, `POST` — earliest-decidable on deploy of `4a7126b` |
| **BC-11b** | **TERMINAL: CANNOT BE EXECUTED** — a permanent absence of evidence, not a closure |

**Standing note:** this list is point-in-time. The UAT document, and then the deployment record, are
authoritative on each row's execution state.

---

## F-9 — frontmatter reconcile, 2026-08-25 (raised by `devops-hooks-013`)

**Accepted. The claim was false as written, and the field it sat in is the worst place for it.**

`Verified-At-Note` read: *"Every commit since live master `a151fb4` is test-only."*

| Range | Production files changed | The claim |
|---|---|---|
| `abcf585..4a7126b` | **0** | **TRUE** |
| `a151fb4..4a7126b` | **4** | **FALSE** |

Re-measured independently here during Phase 3, per-commit and before the correction was requested —
`abcf585` changes **4** non-test files (`NewMessageJsonInput.tsx`, `MessageProvider/index.tsx`,
`layout.tsx`, and the new `CodeMessageNotice.tsx`); `664e0c0` and `4a7126b` change **0**. Devops's
figures confirmed exactly.

**What it said and why it was defensible** — preserved, not overwritten. The range in hand when the
note was written was the **fix-round delta**, and the note is precisely true of that range. Both
adoption commits genuinely are test-only, and the body of this document anchors the production change
correctly at `abcf585` (559 tests / 38 files / exit 0, against 550 / 37 at `a151fb4`). **The
production change was verified; nothing needed re-running.** The defect is one of *scope naming*: a
claim true of `abcf585..` was written under the label `a151fb4..`.

**Why it mattered more than a mislabel.** `Verified-At` and `Verified-At-Note` are the first pair a
release gate reads. A gate reading `4a7126b` beside *"every commit since live master is test-only"*
concludes the release delta needs no production-side scrutiny — and that delta is `abcf585`, which
converts permanent-state notices from transient `toast.warn` to persistent inline DOM across the
paste surface and the message layout. **That is the exact surface BC-18, BC-19 and BC-21 examine.**
Inheriting the claim would have skipped the one commit most relevant to every outstanding row.

**This claim also travelled.** It was stated to `steering-hooks-013-2` in this form during the Phase 3
hand-off discussion. Correcting the field is therefore not sufficient on its own; the correction has
been sent to the peers that received it.

**Transferable lesson, which is the reason this is written up rather than just fixed.** *A range
claim is only as good as its stated endpoints, and a summary field is where endpoints go missing* —
the body had the right range throughout, and only the compressed one-liner lost it. This is the same
failure the chain has now seen four times in its **instruments** (piped `grep -c`, `ls -a | grep -x`,
`git diff --name-only | grep -c .`, `rev-parse` on an absent path) and once in its **prose** (U-5,
tense). Devops's standing rule — *state both endpoints whenever asserting a count or identity,
`A..B`, never a bare count* — is the correct generalisation, and it now applies to **summary fields,
not only to commands**. Adopted here.

**Not a verdict defect.** The Phase 3 record `release-4a7126b-tip-verification.md` was written from
per-commit measurement and states the split correctly (*"`abcf585` is the only commit carrying
production change"*). **RELEASE VERIFIED at `4a7126b` stands.**

---

# BC-19 split — performed, with one of UAT's three failure modes retired on evidence

`uat-hooks-013-3` (rev 15, `1b65e3f`) routed a recommendation to split **BC-19**, correctly noting
the row is mine to write. **Split performed. Two of the three proposed failure modes are adopted; the
third is retired, with the control recorded.**

## UAT's composed finding — adopted, and it is the strongest statement of the gap yet

Re-derived here rather than taken: `git cat-file -e a151fb4:…/CodeMessageNotice.tsx` → **ABSENT**;
at `4a7126b` → **PRESENT**. The file is new at `abcf585`. Combined with this pass's own coverage
finding:

> **The code-import notice surface has never executed in production, and has no executing test of
> either its producer or its mount.** The component is proven to render in isolation; the layout is
> proven to *contain the tag* as source text. **Nothing proves the notice appears on the page, and
> nothing ever has.**

That framing is better than the one this document carried and is adopted verbatim as the rationale
for BC-19a.

## Failure mode (b) — "the page throws on a null context" — **DECLINED, with a live control**

UAT drew this from a comment in **this pass's own instrument** (`013-qa-toast-vessel-render.test.ts`,
the THE REAL MOUNT note): *"A null context would throw in production and pass here."* **That comment
is true about the test and does not establish a live failure mode**, and the difference matters
because BC-19 is blocking a release.

Applying this stage's input-robustness disposition order — *can the caller send X?*

`useMessage()` does throw on a null context. But **`CodeMessageNotice` has exactly one mount site**
(`grep -rc` over `src/`: `layout.tsx` and its own definition, nothing else), and that site is
**inside `<MessageProvider>`**. So the null-context state cannot arise at the shipped mount.

**The positive control, which is live in production and not merely a build result:**

| Property | `Navigation.tsx` | `CodeMessageNotice.tsx` |
|---|---|---|
| `'use client'` | yes | yes |
| consumes `useMessage()` | yes (line 83) | yes |
| mounted inside `<MessageProvider>` in the same async server layout | yes | yes — the sibling slot immediately below |
| present at live master `a151fb4` | **yes**, and **byte-identical** across the delta (`339ed84`) | **no** — new at `abcf585` |

**`Navigation` occupies the identical position and has been running in production continuously.** The
server-layout → client-component → live-`MessageProvider`-context boundary that (b) posits as
unproven is therefore **proven in production**, by a component that is unchanged across this release.
`MessageProvider` is itself `'use client'`. The build (exit 0, all routes emitted) is corroboration;
the live sibling is the actual control.

**Per the disposition order, an unreachable failure is not a reason, and this one is unreachable at
the shipped mount. (b) does not enter the register.** Carrying it would have made a blocking row
harder to settle while adding nothing an observation could discharge.

**What (b) leaves behind is a latent contract hazard, recorded not as a blocker:** if
`CodeMessageNotice` is ever mounted outside `MessageProvider`, it throws — and **the error message
names the wrong component**. Verbatim from `MessageProvider/index.tsx`:

    throw new Error('UnsavedWarning components must be wrapped in <UnsavedWarning />');

**This is pre-existing** — `src/providers/MessageProvider/index.tsx`'s `useMessage` guard is outside
the `a151fb4..4a7126b` delta on this line — so it is **not** a release finding and does not gate
`4a7126b`. It is a **diagnosability** defect: a developer who trips it is sent to the wrong component
entirely. Routed to the implementer as a standalone fix, not attached to this release.

## The split — BC-19 retired and replaced

**BC-19 is SUPERSEDED** (not withdrawn — its subject survives, its wording does not). Its recorded
condition, *"is the notice visible and legibly placed"*, **bundled a silent mode with an eye check**,
settled by different observations, which is precisely UAT's objection and it is correct.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable | Predicted value | Failure mode (operator terms) | Owner | State |
|---|---|---|---|---|---|---|---|---|---|
| **BC-19a** *(appears-at-all)* | PRE | Perform a **real code import that drops components** on `m/[id]`. A persistent notice naming the dropped types **appears**, and **clears** when the fact goes away | the import itself — no automated instrument exists: the producer effect and the mount are both unexecuted by the suite | **subject**: the owner, local dev server. No non-human primary exists under D28 (no jsdom, no mounted render) | **now** — local, before anything is cut | **one successful import refutes "the notice never appears" by construction**; not a rate, no sample needed | *If nothing appears, the user is told nothing where 013 promised a persistent warning — and this surface has never run in production, so there is no prior evidence it works at all. Absence generates no complaint, so this will not be reported.* | owner | **Not started** |
| **BC-19b** *(legible-and-placed)* | PRE | Given a notice that appeared under BC-19a, it is **legible and not obscured** — not hidden behind the sticky nav, overlapped, clipped by `overflow`, or colour-on-colour | eye check on the same import | **subject**: the owner. Untestable under D28: CSS cascade, z-index and contrast are invisible to an element-tree instrument | **after BC-19a passes** — it presupposes a notice to look at | a single look settles it | *The warning renders but the user never reads it — indistinguishable in outcome from BC-19a failing, and equally silent.* | owner | **Not started** |

**BC-19b's earliest-decidable is a genuine dependency, not a formality**: it cannot be observed until
BC-19a produces something to look at. That ordering is exactly what the unsplit row obscured — it
read as one observation when it is two, the second conditional on the first.

**BC-18 is unchanged** — it covers the paste surface, which has an executing instrument
(`013-qa-paste-surface-render.test.ts`) and is the smaller gap.

**Neither new row is discharged by the Phase 3 verdict**, and `release-4a7126b-tip-verification.md`
§5 already says so. Both remain executable **now**, before anything is cut, because nothing has
shipped and these rows do not expire.

**Standing note:** the UAT document, then the deployment record, are authoritative on execution state.

---

# Stage close — UAT Complete, and the instrument-class register at six

`uat-hooks-013-3` rev 17 (`e4c37af`) records **UAT Complete**: *APPROVED FOR RELEASE, conditional on
the human click-through of BC-18, BC-19a and BC-19b*, anchored at `4a7126b`. It has reached its
run-length ceiling; further UAT work needs a fresh session.

**F-9 did not propagate, and the reason is evidence rather than luck.** UAT measured its own document
rather than recalling: zero lines pair `a151fb4` with `test-only`; the sole occurrence is anchored at
`abcf585`. **It had read the document carrying the false note and did not inherit it, because at rev
13 it derived the delta from the tree — `git diff --numstat` plus per-path blob identity at both
tips — instead of restating my `Verified-At-Note`.** That is a concrete instance of the
re-derive-don't-adopt predicate producing a measurable outcome, and it belongs in the retrospective
as evidence, not as another assertion of the principle.

**The (b) retirement is settled by both stages.** UAT re-derived rather than accepted — confirming
`Navigation.tsx` at blob `339ed840` across all three tips, `git diff --name-only` empty over it, and
the `_layout` directory holding exactly two files, so *"the sibling slot"* is literal. Its own
statement of the lesson is better than mine and is adopted: **a widened falsity signature is not
automatically a better one.** Nothing was withdrawn — a row's owner retired a proposed failure mode
on evidence, which is the register working as designed.

## Instrument class — six members, predicate unchanged

**Predicate: an existence or count predicate that cannot fail loudly.** Stated on its own terms so it
outlives its instances; the members are how it was found, not what it is.

| # | Instrument | Failure |
|---|---|---|
| 1 | piped `grep -c` over filtered output | undercount (46 vs 51) |
| 2 | `ls -a \| grep -x ".github"` | false absence, non-deterministic |
| 3 | `git diff --name-only \| grep -c .` | 8 against a true 7 — **this chain, today** |
| 4 | `git rev-parse <tree>:<path>` on an **absent** path | echoes its argument to stdout **and exits 0** — an `\|\| echo MISSING` fallback never fires |
| 5 | `git cat-file -e` on a **mis-typed** path | ABSENT is indistinguishable from absent-because-not-there |
| 6 | `git rev-parse "<tree>:$P"` with **`$P` empty** | returns the **root tree SHA**, exit 0 |

**#6 is the sharpest member and is verified here.** It does not fail, does not return null, and does
not repeat — it returns **three differing plausible 8-char hashes**, which is exactly what a real
per-file difference looks like:

    a151fb4:  -> f819aca2      root tree a151fb4 = f819aca2
    abcf585:  -> c24375ff      root tree abcf585 = c24375ff
    4a7126b:  -> 189d9d60      root tree 4a7126b = 189d9d60
    exit = 0

**And it is worse than a bare false positive in this chain specifically**: `189d9d60` is the root tree
SHA **recorded in `release-4a7126b-tip-verification.md` §1**. A reader comparing per-file blobs could
match an empty-path result against a genuinely recorded value and conclude the comparison was sound.
**The wrong question returns a right-looking answer that cross-checks against the record.**

**Remedy for #5 and #6, and the general form:** name the path from `git ls-tree` rather than typing
it, assert existence with `git cat-file -e` **before** comparing, and never interpolate a path
variable into `rev-parse` without checking it is non-empty. Verified: `git ls-tree -r --name-only
4a7126b -- 'src/app/message/m/[id]/_layout/'` returns exactly the two files.

**All six were caught by contradiction against a second instrument, never by re-running the first** —
each reproduces stably, so repetition reads as confirmation. That is the transferable finding and it
is the one the retrospective should carry.

## Final QA state

| Item | State |
|---|---|
| **Phase 2** — plan-level | **QA Complete** at `4a7126b` |
| **Phase 3** — release tip | **Release Verified** at `4a7126b` (`release-4a7126b-tip-verification.md`, no ID) |
| **BC-18** | OPEN — PRE, owner, executable now |
| **BC-19a** *(appears-at-all)* | OPEN — PRE, owner, executable now |
| **BC-19b** *(legible-and-placed)* | OPEN — PRE, owner, decidable only after 19a |
| **BC-21** | OPEN — POST, owner, decidable on deploy |
| **BC-11b** | TERMINAL: **CANNOT BE EXECUTED** — a permanent absence of evidence, never "closed" |

**Nothing has shipped.** `4a7126b` is not at the remote; releasing requires a push, and the push
requires the owner's approval, which no verdict in this document grants.

**Standing note:** this table is point-in-time. The UAT document, then the deployment record, are
authoritative on each row's execution state.

---

# Phase 3 pass, 2026-08-25 — the STALE predictions re-derived by execution

**Session**: `qa-hooks-013-3` [ab2af3]. **Trigger**: `steering-hooks-013-3` [b04529], carrying owner
ruling **D45** (plan rev 42, `491a540`, read at the plan). **Register maintenance only — no verdict
moves in this pass**, and none was asked for. The QA limb of the D37/D39 review debt is a separate
pass and waits on `code-reviewer-013-4`'s verdict, which had not landed when this was written.

**Read at the file, not from the relay**: `uat/013-components-v2-editing-surfaces-uat.md` at
**`0128763`** (rev 25) for the open set, after being told twice that it had moved. §R22.2 as amended
by rev 25 is the authoritative open set: **17 items**, BC-21 having terminalised.

## P3.1 — What was owed, and why nobody could execute a row until it was done

`uat` rev 18 marked eight rows **PREDICTION STALE** — BC-1, BC-7, BC-8, BC-9, BC-10, BC-18, BC-21,
and BC-6 as *possibly* — because the surfaces beneath them were touched at `e343927` and `2d90e8a`.
**That marking was derived from those two commits' file lists.** A file list establishes that a
surface *was edited*; it does not establish that anything a row *predicts* changed. Row definitions
are QA's, so settling it is QA's, and the standing rule in this document's own Verdict Freshness
section says how: **execute both trees over the surface; never read the diff's file list.**

## P3.2 — The instrument

`verification/013/probe-qa-p3-stale-prediction-differential/`. It **dumps, it does not judge**: for
every register row that predicts a user-visible string or a disposition, it computes that value from
the real product functions and the real surface source and writes a deterministic report. The same
spec, unchanged, is run at three trees and the reports diffed.

| Tree | Why it is in the differential |
|---|---|
| **`2d90e8a`** | the live tip — `origin/master` |
| **`d7c4836`** | the commit immediately **before** the two the marking cited. `d7c4836..2d90e8a` is therefore *exactly* the marking's own basis |
| **`4a7126b`** | the tree this document's verdict is anchored to. `4a7126b..2d90e8a` is the wider question — what moved since QA last looked |

Non-vacuity is asserted inside the instrument (section Z): every stale row id must appear in the
report, exactly eight disposition cells must be dumped, and the report must exceed a length floor.
A dump that silently produced nothing would otherwise diff clean against another empty dump and read
as *"no movement"* — which is the failure mode this whole pass exists to avoid.

**The instrument was observed moving.** Sections B, D, E and F each show differences in at least one
of the two diffs, so a clean section is a measured absence of movement rather than an inert probe.

## P3.3 — Result

**`d7c4836..2d90e8a` — the marking's own basis — moves 28 report lines** (`grep -c '^[+-][^+-]'` over
`diff-d7c4836-to-2d90e8a.txt`; the diff was written to a file and read whole, see P3.7). All 28 fall
in three places:

1. the dropped-types notice **wording**, at all three surfaces:
   `Not carried: ${types}. Discord does not support these on hooks.gg.`
   → `Not supported on Hooks.gg: ${types}` (and `…: ${types}.` at `JsonModalBody`);
2. the **code-path notice removed from the product** — `CodeMessageNotice.tsx` deleted,
   `codeMessageDroppedNotice` gone from `MessageProvider` and from `layout.tsx`;
3. three empty-child payloads moving from **rejected** to **accepted as row B with the flag-added
   warning** — the D34 floor relaxation at `e343927`.

**Sections A, C, D and F are byte-identical across `d7c4836..2d90e8a`.** The dispositions over all
eight cells, every settled-notice string, the Load confirmation, and the row-E resting state **did
not move at all** at the two commits the staleness marking named.

**`4a7126b..2d90e8a` moves 48 lines**: the above, plus the row-E **resting state** at both JSON
surfaces — `pendingChoice` → `dismissedChoice`, which is **D31 at `d7c4836`**. That commit is *not*
one of the two the marking cited, and it is the only change in the whole delta that reaches a row's
predicted value.

## P3.4 — Per-row disposition. Eight rows in, eight rows dispositioned

**Predicate for this enumeration**: every row carrying a `PREDICTION STALE` marking in `uat` rev 18
as listed at R22.4.2, plus BC-6 which that section marked *possibly*. **Excludes** every row never so
marked (BC-2, BC-3, BC-4, BC-5, BC-11*, BC-12–BC-17, BC-19, BC-20) — none of them is re-derived here
and none should be read as re-derived.

| Row | Marking | **Disposition** | Basis |
|---|---|---|---|
| **BC-1** *(load-confirmation-names-changes)* | STALE | **LIFTED — prediction unmoved.** But see F-QA29: **the row now FAILS as the code stands, and must not be put in front of an operator until it is fixed** | Section C byte-identical at all three trees. Predicted value restated literally below |
| **BC-6** *(lenient-filter-names-drops)* | possibly STALE | **RE-DERIVED — the notice text changed, the predicate did not.** Row stays executable | `describeUnsupportedComponentTypes([Thumbnail-11]) = ["Thumbnail"]` unchanged; only the surrounding sentence moved. See F-QA30 for a member of this row's class the row does not reach |
| **BC-7** *(M8-B: components, no flag)* | STALE | **LIFTED — prediction unmoved** | Section A cell `bit=0 v2comp=1 classic=0` identical at all three trees |
| **BC-8** *(M8-D: content + flag)* | STALE | **LIFTED — prediction unmoved** | Section A cell `bit=1 v2comp=0 classic=1` identical at all three trees |
| **BC-9** *(M8-E: content + components)* | STALE | **STALE CONFIRMED, on a different commit than the one cited — RE-DERIVED below** | The disposition is unmoved, but **D31 at `d7c4836`** changed what the user sees *first*. The row predicts "two options"; today the paste rests on a notice and a **Resolve** link, and the options appear only after clicking it |
| **BC-10** *(M8-F parity)* | STALE (both limbs) | **suite limb LIFTED** (parity holds — both surfaces changed identically). **spot-observation limb RE-DERIVED** for the two row-E cells, per BC-9 | Section D shows the same change at both surfaces; sections A/F show no divergence between them |
| **BC-18** *(paste-notice-renders)* | STALE (derived, R23.4) | **PARTIALLY LIFTED — and now decidable.** Limb 1 unmoved. Limb 2 unmoved along **every direct correction**; moved **only** where the correction traverses row E. Re-derived below | Section F, six executed edit sequences |
| **BC-21** *(notice-silence-detector)* | STALE by inheritance | **MARKING LIFTED for the record.** `uat` rev 25 already terminalised the row on other grounds; this changes nothing about that | R23.3 ruling, P3.6 |

### BC-1 — predicted value, re-derived and stated literally

Replaces *"the confirmation names both differences before anything is committed"*, which was a
paraphrase nobody could fail an observation against. The dialog is `title: 'Are you sure?'` / body /
button `'Load'`, and the body is the whole of it:

| Load | The body must read |
|---|---|
| no structural or mode change | `This will overwrite the current message.` |
| adds a Container over a Classic message | `This will overwrite the current message. It will add Container; switch from Classic to Components V2.` |
| swaps Container for Action Row inside V2 | `This will overwrite the current message. It will remove Container; add Action Row.` |
| a **row D** draft over a V2 message | must name the **switch to Classic**. **It does not. See F-QA29** |

### BC-9 / BC-10 — predicted value, re-derived for row E

**Was**: *paste `{"content":"hi","components":[<container>]}` → two options, each naming its drop;
nothing created until one is taken; dismissal leaves message and pasted text unchanged.*

**Is, at `2d90e8a`** — the *resting* state after D31, at **both** JSON surfaces:

1. the editor stays put; the options do **not** appear on their own;
2. a persistent notice appears —
   *"This message has both Components V2 and classic content — nothing was created."* at New Message,
   *"…nothing was loaded."* at the Message JSON modal — carrying a **Resolve** link;
3. **Resolve** opens the two options, each labelled
   `Save as Components V2 — This will drop your message content.` and
   `Save as Classic — This will drop your Components V2 components.`;
4. nothing is created or loaded until one is taken; **Cancel** returns to the resting notice.

**Why the re-derivation is load-bearing rather than cosmetic**: an operator handed the old wording
pastes the payload, sees no options, and correctly reports the row FAILED. That is precisely the
**false failure** rev 18 warned about, and it was one sitting away.

### BC-18 — predicted value, re-derived. **The row is decidable today**

Executed as six edit sequences over the paste surface's effect (section F). The reducer reads the
row-E branch target **from the source**, so the one transcription models the baseline and the tip
correctly and cannot silently mis-model whichever tree it was not written against.

| Limb | Disposition |
|---|---|
| **appears and stays put** | **unmoved** at all three trees. Row B → *"This message has Components V2 content but the Components V2 flag was not set — it has been set to match."*; row D → *"This message has the Components V2 flag but also has content or embeds, which cannot be combined — it has been saved as Classic and the flag cleared."* Re-editing the same JSON re-renders it; it is state, not a toast |
| **clears when the JSON is corrected** | **unmoved along every direct correction** — remove the flag, add the flag, delete the content, or pass through broken JSON and back. In all six sequences the warning is gone once the JSON is corrected |
| **the one moved case** | a correction that **traverses row E** (adding content to a row-B draft, or components to a row-D draft). At `4a7126b` the entire editor was replaced by the choice UI; at `2d90e8a` the editor stays and the resting conflict notice + **Resolve** appears. **The warning still clears; what replaces it changed** |

**So BC-18's prediction is restated as**: *a rows-B/D paste shows the matching persistent warning in
the modal; it survives further edits that leave the row unchanged; and it clears when the JSON is
corrected — with the note that if the correction passes through "both V2 components and classic
content", the warning is replaced by the conflict notice and its Resolve link rather than by nothing.*

**Nothing else about BC-18 changes.** Its residue is unchanged and remains the owner's: this
instrument executes the **state machine** and pins the render guards as source text; it does not
establish that React renders them. The paste surface's component function is not reachable without
the hook driver **D28** rules out (`probe-qa-paste-surface-render/trace-paste-surface-unreachable.txt`).

## P3.5 — Two findings the re-derivation turned up. **Both pre-existing at `4a7126b`**

Neither is a movement, and neither is a regression from the post-release round: both are **identical
at all three trees**. They were found because re-deriving a prediction means computing what the
surface actually does, and nobody had done that for these two paths.

Both are **inputs to the owed verdict at `2d90e8a`**, not verdicts themselves. Pre-registered failing
specs are captured at `verification/013/probe-qa-p3-stale-prediction-differential/`; each is red on
its defect assertions and **green on every positive control**, so a fix that over-reaches breaks the
controls rather than passing quietly.

### F-QA29 — the Load confirmation names a mode change that does not happen, and omits one that does

**BLOCKING for BC-1. This is BC-1's own clause 2 failing.**

`JsonModalBody` computes the confirmation as
`describeLoadDiff(computeLoadDiff(message?.data ?? {}, validatedDraft))` — over the **raw** validated
draft — while `commitLoad` applies `applyDisposition(validatedDraft)` and sets the editor mode from
`disposition.mode`. For **disposition row D** (V2 flag set, classic content present, no V2
components) those disagree, and it has two faces:

| Current message | Dialog says | Load actually does |
|---|---|---|
| **Classic** | `It will switch from Classic to Components V2.` | stays **Classic**, flag cleared — a **false statement** |
| **Components V2** | `It will remove Container.` — and nothing about the mode | switches **V2 → Classic**, flag cleared — an **omission**, of exactly the thing BC-1 clause 2 asks for |

**Who this reaches.** Row D is the shape of records **5712/5842** — the repair path this chain exists
to make safe (F-QA15 was about reaching it at all). The second face is the repair sitting itself: the
record *is* V2-flagged, the operator is repairing it to Classic, and the dialog standing between them
and an irreversible overwrite does not say the message type changes.

**Why the suite is green over it.** `013-m2c-load-diff.test.ts` (13 tests) asserts `computeLoadDiff`
**in isolation**, over fixtures that never carry `content` — so **no fixture in it can express row
D**, and the disagreement is not merely unasserted but *unobservable*. Its flag-only case
(`{flags: 32768, components: [ACTION_ROW]}`) is row **C**, which agrees. This is the property-audit
failure named in this document's own method: the criterion named an example, the test discriminated
for that example perfectly, and the rest of the class went unexamined.

**Spec**: `013-fqa29-load-confirmation-names-actual-mode.test.ts` — **3 failed / 5 passed** at
`2d90e8a`; the three failures are the three row-D assertions and all four controls (rows B, C, an
add/remove pair, and an identical draft) pass.

**Disposition order** (this document's Input Robustness rule): the caller *can* send row D — the
whole chain exists because real stored records are that shape — so it does not stop at step 1, and
the defect is in the **surface's own contract with the user**, not a missing runtime guard.

### F-QA30 — a component emptied by the lenient filter is removed with nothing said

**A member of BC-6's class that BC-6's stated example does not reach.**

`filterTopLevelComponent` (`src/server/api/utils/shapes.ts`) drops a **Container left with no
surviving children** by returning `null` **without calling `dropped?.add(...)`** — and the same for an
**Action Row left with no buttons**. `describeUnsupportedComponentTypes` therefore returns `[]` and no
surface renders a notice.

Executed outcome (section E2), pasting `{"content":"hi","components":[{"type":17,"components":[]}]}`:

> disposition **row A**, `settledNotice = null`, `contentFloorError = null`, dropped-types notice `[]`
> — a **green state** over a component that was silently deleted.

That is verbatim the failure BC-5's operator-terms cell names: *"Green means safe. A green state over
an empty object teaches the user to trust it."*

**Both directions are in the instrument's own table**, which is why this is a finding and not a
guess: a top-level Thumbnail-11 **is** named (`["Thumbnail"]`), a Container emptied *by* an
unsupported child **is** named (`["Select Menu"]`), and a Container that keeps a child is correctly
not a drop at all. Only the emptied-by-emptiness member is silent.

**D34's relation to it, stated precisely because it is easy to overstate**: `e343927` did **not**
create this — the filter runs as a `z.preprocess` *before* the shapes, so the `.min(1)` floors never
saw an emptied container. What D34 changed is the **reachability of the surrounding class**: three
empty-child payloads that previously failed the import shape loudly now parse. More payloads reach
this path than before; the silence at the end of it is older.

**Spec**: `013-fqa30-emptied-container-drop-is-named.test.ts` — **3 failed / 4 passed** at `2d90e8a`;
all four controls green.

## P3.6 — Ruling on `uat`'s R23.3 query: **the inheritance marking was over-broad. Lifted**

`uat` rev 18 marked BC-21 *"PREDICTION STALE by inheritance"* from BC-18 because the two share a
surface. Rev 23 judged the inheritance does not hold and **correctly declined to remove the marking
itself** — a marking removed by the wrong stage is the same defect as one applied by the wrong stage.
It is QA's, and QA agrees, on two independent grounds:

1. **`uat`'s ground, which is sufficient on its own.** BC-21's predicate is **presence** and its
   failure signature is **absence**. Staleness can only bite where an observation could *diverge*
   from its prediction, and a presence predicate observed as present cannot diverge from itself.
   Sharing a surface is not sharing a predicate.
2. **The measured ground, which QA owed and `uat` could not produce.** Even taking the inheritance at
   face value, **there was nothing to inherit**: section A shows every settled-notice string
   byte-identical across `d7c4836..2d90e8a`. BC-18's own staleness was **derived** (R23.4), not a
   property of those two commits — and this pass finds even that limb unmoved except along a
   row-E-traversing correction, which BC-21's predicate does not touch.

**BC-21's `PREDICTION STALE by inheritance` marking is LIFTED.** This is recorded for the register's
correctness and **gates nothing**: `uat` rev 25 terminalised BC-21 as `EXECUTED` on the owner's
answer, on grounds that never depended on this query. **Nothing about that row's state moves here,
and this must not be read as reopening it.**

`uat` was right to route it rather than perform it, and right again that it should not have been
prioritised over BC-18. It was not.

## P3.7 — Instrument note, paid for during this pass

`diff … | sed -n '/## E —/,$p'` returned an **empty region** for a diff that did contain hunks there,
and read as *"no movement in section E"*. It is the class `RTK.md` names — a **positional predicate
over filtered output** — and it very nearly cost this pass the D34 result, which is one of the three
things that actually moved. Every differential above was taken by writing the diff to a file and
reading the whole file, and every count by `grep -c`, which computes before the filter.

Recorded because it is the seventh sighting of this chain's recurring instrument-lie class, and the
second where the instrument was sound and the **predicate** was the wrong one.

## P3.8 — Register maintenance log — appended, not restated

- **2026-08-25 — BC-1, BC-7, BC-8, BC-21: `PREDICTION STALE` LIFTED** (qa, this pass). Settled by
  execution across `d7c4836..2d90e8a`, not by reading the two commits' file lists.
  Evidence: `verification/013/probe-qa-p3-stale-prediction-differential/`.
- **2026-08-25 — BC-6, BC-9, BC-10, BC-18: predictions RE-DERIVED** (qa, this pass), each to the
  literal value the surface produces at `2d90e8a`. **BC-9's staleness is real but was attributed to
  the wrong commit** — its cause is D31 at `d7c4836`, which rev 18 did not cite.
- **2026-08-25 — BC-1 is NOT executable until F-QA29 is fixed** (qa, this pass). The prediction is
  sound; the surface fails it. Executing the row now would produce a true failure, not a false one —
  which is why it is recorded here rather than left for the sitting to discover.
- **2026-08-25 — BC-6's class has an uncovered member, F-QA30** (qa, this pass). **No new row is
  minted**: BC-6's condition already covers it and the code fails that condition. Adding an ID would
  inflate the register to describe a defect the register already names.

**No row's `State` column is changed by this pass**, and none is QA's to change: state is the UAT
document's. What changed is what the rows **say**, which is QA's.

## P3.9 — Correction to this document's own tail

The **Final QA state** section closes with *"Nothing has shipped. `4a7126b` is not at the remote."*
**That was true when written and is now false.** `a151fb4` was released, and `origin/master` is
`2d90e8a` with four owner commits past the release. The sentence is left in place as the dated
statement it was; this line is the correction, recorded beside it rather than over it.

**`2d90e8a` carries no QA verdict.** The refresh at `4a7126b` stands for its own tree and for nothing
past it, and **F-QA29 and F-QA30 were both present at `4a7126b` and were not caught there** — stated
plainly because a reader comparing the two would otherwise have to work it out.

## P3.10 — Assumption Not Checked

**This pass assumes the eight rows it re-derived are the whole of what moved, and it does not test
that.** The differential enumerates *rows that predict a user-visible string or a disposition*; a
register row whose prediction turns on something the report does not compute — a timing, a network
form, a database write — would diff clean here while having moved underneath. Concretely: **BC-12**
(the send-path wire form) and **BC-17** (whether Discord returns row E) both predict over Discord's
API, which this instrument never contacts, and **BC-13** predicts over a clock.

**Observable signature of its falsity**: an operator executes a row this pass declared unmoved and
gets a mismatch that is neither of the two faces of F-QA29 nor a rendering absence — i.e. a failure
in a dimension the report has no column for.

**Owner of closing it**: the **QA limb of the D37/D39 review debt** — the pass that runs at
`2d90e8a` after `code-reviewer-013-4` reports — which executes the suite rather than a dump and is
where a wire-form or persistence movement would surface. It is named again in the handoff below so
the assumption is routed rather than shelved.

## P3.11 — State

**No verdict moved. `QA Complete` at `4a7126b` stands for that tree, and reaches no other.**

**BLOCKING RELEASE CONDITION — carried to UAT by name**, as additions to chain 013's single register's
standing obligations rather than as new IDs:

> **BC-1 must not be executed until F-QA29 is fixed.** *If an operator is sat in front of the Load
> confirmation as the code stands, the dialog will tell him the message type changes when it does
> not, or stay silent when it does — on the 5712/5842 repair path, immediately before an irreversible
> overwrite.*
>
> **BC-6 cannot pass while F-QA30 stands.** *A Container emptied by the filter is deleted from the
> user's message with nothing shown anywhere, beside a green state — which is the defect this
> milestone exists to close, in the surface it exists to close it in.*

**Standing note, as on every list in this document**: point-in-time. The UAT document, then the
deployment record, are authoritative on each row's execution state.
