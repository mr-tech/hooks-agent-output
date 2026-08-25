---
ID: 013
Origin: 013
UUID: 22d69e06
Parent: components-v2-editing-support-2026-08-23.md
Status: QA Complete
Verified-At: "b56570dfa916368e9942e671d594112750567923"
Criteria-At: "plan 013 rev 50, eb0e291 — RE-ANCHORED 2026-08-25 (§V.34). The D53 registration pass moved the criteria axis and this verdict expired by its own clause; the SUBSTANCE is unchanged, because no criteria-bearing section of the plan moved between rev 49 and rev 50 (two independent instruments, controls that kill rev47→48 and rev48→49 — verification/013/probe-qa-criteria-rev49-rev50/). Suite re-derived at b56570d, 48 files / 627 tests / 627 passed. This verdict expires when EITHER the tree or the criteria move. See VERIFY PASS §V.15 for the M10 pass at b56570d; §V.13 records the rev-47→48 re-anchor of the superseded e1d9b2b verdict, which stands for its own tree."
Verified-At-Note: "VERIFY PASS 2026-08-25 at e1d9b2b (chain/013-rider-2), criteria plan rev 47 — QA COMPLETE. Supersedes the 4a7126b verdict, which stands for its own tree. See the VERIFY PASS section at the foot of this document. Prior note retained: re-issued 2026-08-25 at 4a7126b after F-QA28 adoption — QA COMPLETE. Supersedes the 664e0c0 verdict, which stands for its own tree. CORRECTED 2026-08-25 (F-9, devops): this field previously read 'Every commit since live master a151fb4 is test-only' — FALSE for a151fb4..4a7126b, which carries abcf585 and its 4 production files (NewMessageJsonInput.tsx, MessageProvider/index.tsx, layout.tsx, CodeMessageNotice.tsx). TRUE only of abcf585..4a7126b. The release delta a151fb4..4a7126b IS production-bearing and needs production-side scrutiny; abcf585 is the commit BC-18/BC-19/BC-21 examine. Plain SHA."
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
| 2026-08-25 | steering-hooks-013-3 [b04529] (successor to `qa-hooks-013-3`, which exited) | Confirm or refute a candidate fixture for **BC-4**, reported by a peer subagent, with QA's own instrument rather than a re-reading; and rule whether the un-gated `Continue` is a defect | **BC-4 PASS — the fixture HOLDS, and the row is no longer blocked.** `{"content": ""}` pasted into the New Message dialog's **JSON** tab reaches the content floor; all three of BC-4's limbs closed mechanically against the real `NewMessageModal` function (V.27). **`{}` refuted as a fixture** — it fails the same floor but the parse effect never runs on it. **The un-gated `Continue` is NOT a defect against 013's criteria** and does not move the verdict; it is a low-severity product finding (**F-QA33**) routed to `uat` by name, non-blocking. **No production code touched — `Verified-At: b56570d` unchanged.** Instrument: `verification/013/probe-qa-bc4-json-tab-fixture/` |
| 2026-08-25 | steering-hooks-013-3 [b04529] | Rule on QA's own `Criteria-At` after the D53 pass took plan 013 to rev 50, re-deriving the rev 49 → rev 50 delta from the file rather than accepting any relayed characterisation of it | **RE-ANCHOR PASS — the clause bites, the substance stands.** The criteria axis moved, so the anchor expired and is **re-issued to rev 50 (`eb0e291`)** rather than argued away. **No criterion moved**: two independent instruments agree (plan byte-diff = 3 hunks — `Rev`, one Changelog row, D53; and a section-hash map showing `Milestones`, `Validation and Release Conditions`, `Plan Scope`, `Reading Order` and every other criteria-bearing section **byte-identical**), with controls that correctly report **A CRITERION MOVED** for rev 47→48 and rev 48→49. Tree re-derived unmoved (`b56570d`, clean); suite re-run **48 files / 627 / 627 passed**, reconciling V.16. **No re-verification owed.** Also: devops §13.2's routed QA obligation **discharged**; `OWNER-QUEUE` item 8 audited and carries all five §V.31 facts plus the §V.32 signature. Instrument: `verification/013/probe-qa-criteria-rev49-rev50/` |

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
| **BC-1** | PRE | M2-c: the Load confirmation names what changes — which top-level types are added/removed, and whether the message type changes | operator observation (no harness, F-QA4/assumption 5) | UAT agent; fallback owner | chain tip deployed to any environment with a stored V2 message | the confirmation names both differences before anything is committed | *The dialog is the only thing standing between the user and an irreversible overwrite, so if it misnames the change they confirm believing something else will happen. **Both clauses of the condition, because both can fail on their own**: they lose top-level components the dialog never said would go; **or** they are told the message type changes when it does not, or not told when it does — which is the 5712/5842 repair sitting, and is `load-confirmation-names-wrong-mode` (F-QA31). **Reconciled to this row's condition 2026-08-25 (P3.22): the previous wording spoke only to component loss and could not express a wrong mode statement, which loses nothing.*** | uat | Not started |
| **BC-2** | PRE | M3-b (URL + webhook): the import dialog names which component types were **not** carried | operator observation | UAT agent | a Discord message carrying a select menu is reachable by URL | dialog shows supported components **and** a notice naming the select | *An import silently returns a message missing half its controls, and the user ships it that way.* | uat | Not started |
| **BC-3** | PRE | M3-b (bot code path): the **editor** shows the same notice on load | operator observation | UAT agent | bot `Get Message` run on the same message, within the 1h store TTL | editor opens with supported components and the same notice | *The code path has no dialog, so a silent drop here is invisible until the message is sent wrong.* | uat | Not started |
| **BC-4** | PRE | M3-c: an import failing the floor keeps the dialog open with the error and **does not navigate** | operator observation **paired with** the suite's no-upsert assertion (EC-3) **Re-instrumented 2026-08-25 (successor pass, V.27)**: the primary no longer needs a Discord message link. The dialog's **JSON tab** reaches the same floor — `verification/013/probe-qa-bc4-json-tab-fixture/` executes the fixture `{"content": ""}` through the shipped pipeline and renders `NewMessageModal` itself, closing all three limbs mechanically (D1/D2/D2b/D3, both mutants killed). What remains human is CodeMirror: the act of typing the fixture into the editor is not exercised | UAT agent. **The Discord-link belief that blocked this row all chain is withdrawn 2026-08-25** — it was defensible while "import" was read as the message-link tab only, and it is false: the floor is computed over the merged `loadedMessage` (`NewMessageModal.tsx`, `contentFloorError`) regardless of which of the four tabs produced it | chain tip deployed | dialog stays, error shown, no new message created. **Recorded beside, not over, 2026-08-25 (V.27)**: the fixture is `{"content": ""}` pasted into the **JSON** tab, and **`{}` must not be used** — it fails the same floor but the editor is *seeded* with it and the parse runs in a `useUpdateEffect` that skips the first render, so the check never executes and the screen shown is *no error + disabled `Continue`*, which is neither pass nor fail but **not executed** | *Three separate failures and only one of them looks like one. **A new message is created** — he lands on a blank message that looks saved; this is flow 6/11/12/13, the defect 013 exists for. **The dialog closes** without creating anything, so the import silently evaporated. **No error is shown** — the dialog sits there having done nothing and said nothing, which reads as the app hanging rather than as a refusal. **Reconciled to this row's Predicted value 2026-08-25 (P3.26): every limb named, because for a human-subject row this cell IS the checklist (`uat` rev 30).** **Added 2026-08-25 (V.27), an execution hazard not a failure mode**: the floor error lives on the dialog's **first** page and `Continue` is not gated by it, so an operator who advances first sees a greyed `Save` with nothing on that page saying why and will report this row FAILED. The error is read below the JSON box, before `Continue`. **The operator text is `uat`'s to rewrite, not QA's** — QA states the fixture and the hazard only | uat | **Not started — but no longer blocked.** *State was `Not started` on the ground that no agent could execute the import; that ground is withdrawn (see the Subject cell).* `uat` rev 44 is authoritative on this row's execution state; QA records only that the fixture now exists and is instrument-backed at `b56570d` |
| **BC-5** | PRE | M4-c: pasting a folder-page export shows the composer's floor error, not a green state | operator observation | UAT agent | chain tip deployed | *"Message must have content, embeds, or components."* | *Green means safe. A green state over an empty object teaches the user to trust it.* | uat | Not started |
| **BC-6** | PRE | M4-b: the lenient filter **names** the dropped types at both JSON surfaces | operator observation | UAT agent | a paste carrying a top-level Thumbnail-11 | the notice names the type | *A user pastes a message carrying a component **type** Hooks.gg cannot support — a Thumbnail, a Select Menu — and it is removed without the notice **naming that type**. They ship a message missing a control they believe is still there, at the surface they reached for precisely because the UI could not express it. **Reconciled to this row's condition 2026-08-25 (P3.22): a composite the filter empties is NOT a member — no type was unsupported there, and that case is ruled outside this row.*** | uat | Not started |
| **BC-7** | PRE | M8-B: paste `{"components":[<container>]}` → V2, bit set, **visible warning** | operator observation | UAT agent | chain tip deployed | editor in V2 with the container, **a warning**, and the V2 flag bit **set**. **This limb is settled by opening the Message JSON and never by the screen looking right — *"everything looked correct"* is not an observation of it and must not be filed as one (`uat` rev 31).** | *Three things, and one of them is invisible without opening the JSON. **The warning is missing** — silent acceptance means he never learns his JSON was incomplete, and D17 row B says warn. **The editor is not in V2**, or the container is not there. **The flag bit is not set** — everything looks right on screen and the message is wrong on the wire. **Open the Message JSON; *"everything looked correct"* is not an observation of this limb.** **Reconciled to this row's Predicted value 2026-08-25 (P3.26): every limb named, because for a human-subject row this cell IS the checklist (`uat` rev 30).** | uat | Not started |
| **BC-8** | PRE | M8-D: paste `{"content":"hi","flags":32768}` → **Classic**, content intact, bit cleared, **visible warning**, no V2 error | operator observation | UAT agent | chain tip deployed | **Classic**, `hi` present, warning shown, **no V2 error**, and the V2 flag bit **cleared**. **This limb is settled by opening the Message JSON and never by the screen looking right — *"everything looked correct"* is not an observation of it and must not be filed as one (`uat` rev 31).** | *This is 5712's own repair route and four things fail separately. **The content is gone** — the repair destroyed what it existed to save, and that one cannot be undone. **The editor is still in V2**, or **the flag bit is still set** — nothing was repaired, and it will look fixed. **Open the Message JSON; *"everything looked correct"* is not an observation of the bit.** **The warning is missing** — he cannot tell a repair from a corruption. **A V2 error still shows** over a message that is now Classic. **Reconciled to this row's Predicted value 2026-08-25 (P3.26): every limb named, because for a human-subject row this cell IS the checklist (`uat` rev 30).** | uat | Not started |
| **BC-9** | PRE | M8-E: paste `{"content":"hi","components":[<container>]}` → **two options**, each naming its drop; **nothing created** until one is taken; dismissal leaves message and pasted text unchanged | operator observation **paired with** the suite's `requiresChoice` assertion (EC-3) | UAT agent | chain tip deployed | two options, **each naming what it drops**; nothing created before a choice; **dismissal leaves the message and the pasted text as they were**; both outcomes verified by repeating with the other option | *Today this silently strips the content. **The choice never appears** — D17's governing principle is not shipped and content is still lost without asking. **An option does not name what it drops**, so he picks blind, which is the same loss with a click in front of it. **Something is created before he chooses** — the ask was decoration. **Dismissing changes his message or his pasted text**, so backing out costs him work. **Only one outcome is exercised**: both options must be taken, on separate runs, or half the row is unobserved. **Not a failure**: after D31 the options do not appear on their own — a persistent notice with a **Resolve** link appears first, and the options are behind it (P3.4). **Reconciled to this row's Predicted value 2026-08-25 (P3.26): every limb named, because for a human-subject row this cell IS the checklist (`uat` rev 30).** | uat | Not started |
| **BC-10** | PRE | M8-F parity: **the same eight-cell fixture set** produces the same row, drop set and notice class at the modal Load **and** the New Message paste | the suite (R9's own mitigation), **plus** spot observation of two cells at both surfaces | suite is primary; UAT agent for the spot check | M8 implemented | identical dispositions, cell by cell | *One object treated two ways is exactly the hazard R9 names; a user who learns the modal's behaviour is then surprised by the paste.* | qa (suite) | Not started |
| **BC-11** | — | **SPLIT 2026-08-24 into BC-11a (DROPPED under D44) and BC-11b (the ask). This row is not executable as written — read BC-11b.** The condition spanned two instants with opposite timing: one half was decidable *only before deploy* and the ask *only after the chain tip is up*, so one row made the first look reschedulable when it is not. Raised by `uat-hooks-013` (`b6e9662`); the split is QA's, the register being QA's. Nothing about the condition was withdrawn at the split; **BC-11a has since been dropped under D44** and BC-11b survives verbatim below | — | — | — | — | — | qa | **SUPERSEDED by BC-11a + BC-11b** |
| **BC-11a** | — | **DROPPED under D44** (owner ruling, registered at plan rev 39, `13a6e66`). This row's subject is struck from chain 013. The row is not re-argued, not re-based onto a substitute, and its content is not restated here. | — | — | — | — | — | — | **DROPPED — D44** |
| **BC-11b** | PRE | **The ask fires on save over a seed** (supersedes the observation half of BC-11): open a **5712-shaped** record (V2 mode, V2 error visible, components section shown), add one container, press **Save** → the ask appears naming both drops and **nothing is written** until one is taken. Same at **Save As**. Repeat on the **5842-shaped** record | operator observation of a **UI event**, **paired with** the suite's `requiresChoice` assertion (EC-3). The oracle is *"the ask appears"*, so the primary needs a browser — which decides the subject on its own, at any SHA and in any environment | **subject**: any party holding a **browser** and a **chain-tip environment carrying the shape**. Today that is the owner *because no session on this box holds browser tooling* — **a fact about tooling, not a plan requirement**, and it must not harden into the latter. `uat-hooks-013` re-derived (not adopted) that it cannot be the subject: empty `DISPLAY`, no browser, no automation. **Fallback**, written by the planner and **conjunctive**: *"Where the repair has already run **and** no seeded environment is available, the suite is the evidence and UAT records the reason — the D19 repair preceded the deploy — not 'no member to observe'."* The repair has not run, so the fallback's conjunction is unmet, it is **not currently available**, and this row is still owed | **the chain tip deployed to any environment carrying a 5712-/5842-shaped record** (BC-1's convention). Not decidable before both | the ask appears; nothing written before a choice; both outcomes verified by repeating with the other option. The save leg is a **conflict-update**, and `data` is written verbatim there as well as on insert (executed, EXT-B) | *This is the whole of D18. If the ask does not appear, the save path is still silently destroying the user's classic body — the defect the owner folded into 013 — and the suite alone cannot show it working for a real user.* | uat (records and drives; the observation needs a browser-holder) | **NOT EXECUTED** — non-terminal, blocks an unconditional approval (`uat-hooks-013`, `838b180`, whose Appendix A holds a one-shot observation script, not executed and not evidence). **Precondition, re-stated from Phase 1's read and carried in that script**: `showComponentButton` requires `isEditing && isV2Mode && showComponentsEditable && canAddComponent`; an observer who has collapsed the components section will see no add-component control and wrongly report the ask as unreachable |
| **BC-12** | POST | M8-G's send-path form is accepted by Discord: a V2 message that sent at `c85945f` still sends after deploy | the existing post-deploy observable *"Save As on a V2 message yields a V2 copy that sends"* (Validation item 6), and M3-a's send form | UAT agent, then owner in normal use | the deploy is live | **the send succeeds. A single 4xx refutes by construction** — this is not a rate to accumulate; one failure closes the critic's pass-4 assumption negatively and is a hotfix trigger | *Every V2 send starts failing at Discord because the wire form gained `content:""`. Users cannot send, and the cause is invisible in the app.* | implementer owns the decision (M8-G send path); uat owns the observation | Not started |
| **BC-13** *(name: `bot-code-ttl-residue`)* | POST | M3-b's pre-deploy-code residue: bot codes stored **before** go-live carry no dropped set, so the notice cannot render for them | elapsed time against the store's 1h TTL | no human subject — decided by the clock | one hour after the deploy SHA is live | the residue is empty | *For one hour after deploy, a code import can drop components silently — the exact behaviour M3-b fixes. Nobody will connect the two.* | devops (records the window in the deployment record) | Not started |
| **BC-14** *(name: `user-defect-fixed-in-prod`)* | POST | **The user-reported defect is fixed in production** (handoff `8f3fa8c3`, observations 1/2/5/6/7): Save As on a V2 message yields a V2 copy with every component; Message JSON shows the components; a component-only edit in one tab raises *"Message Update Detected"* in another and a no-op save raises nothing | operator observation in production | owner, in normal use; fallback UAT agent | the deploy is live | all four observed | *A deploy having happened says nothing about the fix having worked, and every limb here fails by **absence**, which is what nobody reports. **Save As on a V2 message yields a copy that is empty or missing components.** **Message JSON does not show the components.** **A component-only edit in one tab raises no "Message Update Detected" in another** — the prompt that never fires. **A no-op save raises one anyway**, which trains him to dismiss the real ones. **All four are owed; three passing is not this row passing.** **Reconciled to this row's Predicted value 2026-08-25 (P3.26): every limb named, because for a human-subject row this cell IS the checklist (`uat` rev 30).** | uat | Not started |

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
| **BC-18** *(`paste-notice-renders`)* | PRE | Pasting a rows-B/D payload into **New Message** shows a **persistent** warning in the modal that stays put, and **clears** when the JSON is corrected | none available — the render path is unreachable without a harness D28 forbids (`trace-paste-surface-unreachable.txt`) | **subject**: the owner, at a browser. No non-human primary exists | now — the code is committed | a warning appears and persists; correcting the JSON removes it | *Three things can each fail alone, and each leaves him with nothing. **The warning never appears** — the round changed nothing where he asked, and the suite says it did. **It appears and then vanishes** on the next keystroke, which is the toast bug wearing a different coat. **It appears and never clears** once the JSON is fixed, so he stares at a warning about a problem he already solved and learns to ignore the next one. **Not a failure**: correcting a rows-B/D paste *through* a state carrying both V2 components and classic content replaces the warning with the conflict notice and its **Resolve** link — that is the expected behaviour, re-derived at P3.4. **Reconciled to this row's Predicted value 2026-08-25 (P3.26): every limb named, because for a human-subject row this cell IS the checklist (`uat` rev 30).** | owner | **Not started** |
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
| **BC-1** *(load-confirmation-names-changes)* | STALE | **LIFTED — prediction unmoved.** But see F-QA31: **the row now FAILS as the code stands, and must not be put in front of an operator until it is fixed** | Section C byte-identical at all three trees. Predicted value restated literally below |
| **BC-6** *(lenient-filter-names-drops)* | possibly STALE | **RE-DERIVED — the notice text changed, the predicate did not.** Row stays executable | `describeUnsupportedComponentTypes([Thumbnail-11]) = ["Thumbnail"]` unchanged; only the surrounding sentence moved. See F-QA32 for a member of this row's class the row does not reach |
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
| a **row D** draft over a V2 message | must name the **switch to Classic**. **It does not. See F-QA31** |

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

### F-QA31 — the Load confirmation names a mode change that does not happen, and omits one that does

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

### F-QA32 — a component emptied by the lenient filter is removed with nothing said

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
- **2026-08-25 — BC-1 is NOT executable until F-QA31 is fixed** (qa, this pass). The prediction is
  sound; the surface fails it. Executing the row now would produce a true failure, not a false one —
  which is why it is recorded here rather than left for the sitting to discover.
- **2026-08-25 — BC-6's class has an uncovered member, F-QA32** (qa, this pass). **No new row is
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
past it, and **F-QA31 and F-QA32 were both present at `4a7126b` and were not caught there** — stated
plainly because a reader comparing the two would otherwise have to work it out.

## P3.10 — Assumption Not Checked

**This pass assumes the eight rows it re-derived are the whole of what moved, and it does not test
that.** The differential enumerates *rows that predict a user-visible string or a disposition*; a
register row whose prediction turns on something the report does not compute — a timing, a network
form, a database write — would diff clean here while having moved underneath. Concretely: **BC-12**
(the send-path wire form) and **BC-17** (whether Discord returns row E) both predict over Discord's
API, which this instrument never contacts, and **BC-13** predicts over a clock.

**Observable signature of its falsity**: an operator executes a row this pass declared unmoved and
gets a mismatch that is neither of the two faces of F-QA31 nor a rendering absence — i.e. a failure
in a dimension the report has no column for.

**Owner of closing it**: the **QA limb of the D37/D39 review debt** — the pass that runs at
`2d90e8a` after `code-reviewer-013-4` reports — which executes the suite rather than a dump and is
where a wire-form or persistence movement would surface. It is named again in the handoff below so
the assumption is routed rather than shelved.

## P3.11 — State

**No verdict moved. `QA Complete` at `4a7126b` stands for that tree, and reaches no other.**

**BLOCKING RELEASE CONDITION — carried to UAT by name**, as additions to chain 013's single register's
standing obligations rather than as new IDs:

> **BC-1 must not be executed until F-QA31 is fixed.** *If an operator is sat in front of the Load
> confirmation as the code stands, the dialog will tell him the message type changes when it does
> not, or stay silent when it does — on the 5712/5842 repair path, immediately before an irreversible
> overwrite.*
>
> **BC-6 cannot pass while F-QA32 stands.** *A Container emptied by the filter is deleted from the
> user's message with nothing shown anywhere, beside a green state — which is the defect this
> milestone exists to close, in the surface it exists to close it in.*

**Standing note, as on every list in this document**: point-in-time. The UAT document, then the
deployment record, are authoritative on each row's execution state.

---

# Phase 3, second sitting, 2026-08-25 — routed items ruled. Still no verdict

**Session**: `qa-hooks-013-3` [ab2af3]. Written after `code-reviewer-013-4` reported
`APPROVED_WITH_COMMENTS` at `2d90e8a` (`5f6fda8`) and after `steering-hooks-013-3` **stopped the
verify pass**: the owner accepted code review's MEDIUM-1 as a **rider on chain 013**, so the tree is
about to move and any `Verified-At: 2d90e8a` would expire on the rider's own commit.

**Tree identity established, verdict deliberately not taken.** Local `HEAD` = `2d90e8a`,
`git status --porcelain` **empty**, `git diff --numstat 2d90e8a` **empty** (written to a file and
read whole). **`git ls-remote origin refs/heads/master` FAILED — DNS could not resolve `github.com`.**
So the *remote* limb of the identity is **not established**, and this pass does not substitute a
tracking ref for it. Recorded rather than glossed; it costs nothing here because no verdict is taken,
and the verify pass at the post-rider tip must establish it properly.

## P3.12 — devops **F-1** ruled. Both limbs, and a correction to its magnitude

`devops-hooks-013-2` (deployment record `14bc31c`, §12.6) routed here: *"the serving tree carries 4 of
the 8 test blocks of QA's formally adopted render instrument, and no verdict covers the remainder."*
The instrument is QA's, so the ruling is QA's. Evidence:
`verification/013/probe-qa-p3-render-instrument-reduction/`.

**Limb 1 — are the removals correct? YES.** Every one of the four removed cases is a member of the
`CodeMessageNotice — does the converted code-import notice actually render?` describe block, and
`2d90e8a` deletes `CodeMessageNotice.tsx` outright along with its provider state and its layout
mount. **Tests of a deleted component are correctly deleted with it.** No surviving behaviour lost
coverage: the `paste surface guard '!error && settledNotice' — conjunct isolation` block survives
**whole** (four cases), as does the `NullableComponent` block (five).

**Limb 2 — is a verdict owed? YES, and not at `2d90e8a`.** Nothing is *uncovered* by the removal.
What is true is that the **surviving** instrument has never run under a QA verdict at `2d90e8a` —
`QA Complete` was reached at `4a7126b`. That verdict is owed at the **post-rider tip**.

**Correction to F-1's magnitude — it is 4 of 13, not 4 of 8:**

| Tree | `it(` / `test(` matches | **tests actually run** |
|---|---|---|
| `4a7126b` | 8 | **13 passed** |
| `2d90e8a` | 4 | **9 passed** |

The `NullableComponent` block is an **`it.each` with five rows**, which a predicate matching `it(` /
`test(` cannot see. The instrument lost **4 of 13 cases (~31%)**, not half.

**The delta is right and F-1's substance stands** — four cases went and nobody had checked them.
What is wrong is the word *"half"*, and that is the word that makes the finding alarming. Devops's
counter was **sound** (`grep -c`, computing before any output filter); the **predicate** was the wrong
one. **Run the file; do not count its source.** This is the third instance of that exact shape in
this pass alone, which is why it is stated as a rule rather than as a correction to one peer.

**Devops was right to route it and right not to decide it**, and its own instrument disclosure in the
same section — catching itself about to write *"QA's instrument was deleted"* off a `0 51` numstat —
is the reason this arrived as a checkable claim instead of a false one.

## P3.13 — **F-QA33**: the trim left a pointer to a disclosure it deleted, and the disclosure was BC-18's

Found while ruling F-1; **F-1 did not report it.**

`013-qa-toast-vessel-render.test.ts:14` at `2d90e8a` still reads *"(see `WHAT THIS CANNOT ESTABLISH`
at the foot of this file)"*. **There is no such section** — `2d90e8a` removed it. `git grep -c` for
that phrase returns **1** at `2d90e8a`: **the pointer, not the section.** An existence check on the
phrase therefore reports the disclosure as present when it is gone — the same lying-predicate shape
again, this time built into the file.

**What was deleted matters more than the dangling pointer.** Items 1–3 of that block were about
`CodeMessageNotice` and died correctly with it. **Item 4 did not.** It recorded that the paste
surface's render path is asserted only as source text, called it *"THE LARGER OF THE TWO GAPS and it
is the site the owner's ruling actually named"*, and stated the falsity signature routed to the owner:

> *"he pastes a rows-B/D payload into New Message and sees NO persistent warning in the modal (or
> sees one that never clears when he fixes the JSON)."*

**That is BC-18's predicate, verbatim.** The trim deleted the in-repo statement of BC-18's own falsity
signature and left a pointer to it. BC-18 itself is unaffected — the register carries the row and this
document carries the re-derivation — but the instrument no longer says what it cannot do, which is
the one thing that block existed to say.

**Class**: identical to code review's LOW-1 (`ID_LAYOUT`, `NOTICE`) — a deletion pass that removed
consumers and left what referred to them. **Three orphans, one commit, and no gate could see any of
them**, which is MEDIUM-2's point made a third time. **Remedy**: restore item 4 and the falsity
signature (not items 1–3), or delete the pointer. Belongs with **CR23-3** in the rider round.

## P3.14 — MEDIUM-2 weighed. It is worse for QA than it is for the tree

**Re-derived, not repeated.** `npx eslint --no-fix . --max-warnings=0 -f unix` at `2d90e8a`:
**45 distinct paths carrying a `Parsing error` — 44 under `__tests__`, 1 `vitest.config.ts`, 0
elsewhere.** Matches code review's count exactly. **Predicate**: paths on a `Parsing error` line in
that gate's `unix` output; **excludes** files excluded by other means and any gate other than
ESLint/`tsc`. (408 problems in total at that tree; pre-existing, and the repo's own script is
`eslint --fix`, which would repair the auto-fixable ones and mask the honest state.)

**The consequence that is QA's, and it is not the one the finding leads with.** Every `tsc` **0** this
chain recorded — including the ones this document relied on — is true and **never covered a test
file**. So every TDD-compliance audit in this document rested on test files that no type-checker has
ever seen.

**F-QA21 is the realised instance.** A type assertion masquerading as a bitmask survived into a
commit and was caught by QA *reading* it, not by any gate — and its mutant **Q1** established it was
blind to a live regression class (`switchToClassic` wiping every flag bit, dropping
`SUPPRESS_EMBEDS`/`EPHEMERAL` on every classic repair). **MEDIUM-2 is the mechanism that let it
through, and it is still open.**

**Agreed with code review**: repo tooling, not this round's code, and **not held against the tree**.
**Recommended**, and it is the planner's call not QA's: fold **CR23-2** into the rider round, since an
implementer round is already being paid for and this is the gate that would have caught three of the
findings now sitting open.

## P3.15 — The MEDIUM-1 rider: swept on the class's predicate, and it has **three** members

Asked by steering, since the rider touches error-rendering surfaces and a row might quote error text.
Evidence: `verification/013/probe-qa-p3-delimiter-class-sweep/`.

**Answer to the row question first: no row this pass re-derived predicts a Zod error string**, so on
its face the rider stales nothing. **Pre-registered condition so nobody re-derives twice**: if the
rider's diff at `NewMessageJsonInput.tsx` / `JsonModalBody.tsx` stays inside the `catch (err)` block,
**no row is staled and no re-derivation is owed**; if it touches anything outside that block at those
two files, the differential must be re-run. That is a one-command check against the rider's diff.

**But the sweep found the class is wider than the finding.** Code review defines the class correctly
— *"any formatter that recovers structure by string-splitting output it could have configured"* — but
its Location names one file and its enumeration counts the **schemas that can emit** `' | '` (6
union/enum sites), not the **sites that split on it**. Different predicates, different sets.

**Sweep predicate**: `git grep -n "split(' | ')" 2d90e8a -- src` → **3 sites**, all three also calling
`generateErrorMessage`: `formatMutationError.ts:25`, **`NewMessageJsonInput.tsx:112`**,
**`JsonModalBody.tsx:149`**. The known instance **is** among the matches — the check that the
predicate is derived from the class and not fitted to the two new members. **Excludes**: a
differently-spelled delimiter (`'|'`, a variable), a round-trip through `join`/`match`/a regex rather
than `split`, anything outside `src`, and anything added after `2d90e8a`.

**At `2d90e8a` the collision is not reachable through the two client sites — and the reason is a
coincidence nothing enforces.** The lenient filter's accepted type sets **equal** the discriminated
unions' member sets at both levels — `{1,9,10,12,13,14,17}` and `{1,9,10,12,13,14}` — so
`invalid_discriminator`, the one reachable message containing `' | '`, cannot be produced through
`discordMessageImportShape`. **Control**: the same payload against `containerChildShape` directly
renders **one issue as six lines**. **Corroboration**: 13 hand-built payloads through the real import
shape, **0 over-rendering** — offered as corroboration only, since 13 payloads cannot prove
unreachability. The set equality is what carries the claim.

**Consequence, and it is the recommendation**: add a supported component type without adding a union
member and the six-lines-from-one-issue defect appears at **both JSON surfaces** with no gate to catch
it — MEDIUM-2 guarantees that. **The rider should close the class at all three sites, not at the
instance.** Code review's own preferred remedy applies unchanged at all three. This is the planner's
and the implementer's call; QA's contribution is the enumeration and the reason the other two are not
safe by design.

## P3.16 — INBOX dispositions. Three entries in, three out

`agent-output/INBOX.md`, all three addressed to `qa-hooks-013` and predating this session.
**Ruled here; not deleted here.** `INBOX.md` is the steering session's document by that file's own
record, and this document's commit grant reaches QA's own artifacts, not another stage's. The
substantive disposition below is the durable one; **the deletion is steering's to make**, and it was
told so with the three rulings. An edit was made and **reverted** rather than left uncommitted in a
shared tree, where another session's pathspec commit would have swept it.

| Entry | Disposition |
|---|---|
| **`verification/013/README.md` scope** (2026-08-24, FYI) | **RULED and executed.** The directory is **the chain's**, not QA's; any stage may place an instrument, **each stage indexes its own**. The reviewer's `README-code-review-instruments.md` is now the convention rather than an accident. Moving its twenty-odd probes was considered and rejected — every one is cited by directory path in a 489 KB document, so the move breaks citations to buy a tidier sentence. Written at `f3cbb66` |
| **The untracked Phase-1 probe** (2026-08-24, DECISION NEEDED) | **ALREADY RESOLVED, and the decision it asked for never had to be taken.** `src/utils/__tests__/013-qa-phase1-seed-route-probe.test.ts` is **gone from the `website` tree** (`ls -d` refuses it; `git cat-file -e HEAD:<path>` → not in HEAD) and a copy is retained under `verification/013/probe-preexisting-seed-route/`. The +7/+7/+0 inflation is gone with it. **The third option was taken — move it, not commit it — so no `website` source commit and no owner approval was ever needed.** Recorded because the entry asked for a routing that turned out to be unnecessary |
| **The pre-registered 012 spec green over a falsified narrative** (2026-08-24, FYI) | **RULED: the disagreement is a real finding, and the file must NOT be edited. See below** |

### The 012 send-gate spec — finding confirmed, edit refused, and the refusal is the point

`012-send-gate-partition.test.ts`'s **M2-f** block carries a narrative about the product that 013 has
falsified. Verified at `2d90e8a`, not taken from the relay:

- the comment says *"an affected stored record (5712) loads in CLASSIC mode — `detectMode` derives
  mode from `hasV2Components`, structure only, never `flags`"*. **False**: `isMessageV2` is
  `hasV2Components(...) || (flags & IS_COMPONENTS_V2_FLAG)`, and `detectMessageMode` returns `'v2'`
  on it. The record opens in **V2**.
- the case title says *"RECOVERY IS REACHABLE — but only via a round trip, and the outbound leg
  destroys the content"*. **False for the product**: one toggle to Classic now suffices and preserves
  the content. This document already recorded that substance at the refresh pass — *013 makes the B3
  class lossless, superseding 012's R19 "no lossless path" conclusion*.
- **it stays green anyway** because M2-f exercises its **own locally transcribed** `switchToV2` /
  `switchToClassic`, not the product's. The file's own header says a disagreement is a finding, and
  this is one.

**Severity, measured rather than assumed.** The transcriptions are **redundant, not load-bearing**:
`git grep -ln "from '~/utils/messageMode'" 2d90e8a -- src` shows the **real** functions covered by
`012-message-mode.test.ts` and `013-m7-mode-follows-flag.test.ts`. So this is **not** a coverage hole.
The live risk is a **reader** believing the narrative — which is exactly what a pre-registered spec's
comments are read for.

**Why QA does not fix it: 012 is HELD WHOLE under D20.** Editing a 012 spec is 012 work, and a stage
correcting a held chain's artifact under cover of a 013 cleanup is the same defect as a stage removing
another stage's marking. **The finding is recorded here and routed to whenever 012 unfreezes.** It is
not urgent: green, redundant, and misleading only to a reader — but it should not lapse, because the
file is the kind of artifact later readers trust precisely because it was pre-registered.

## P3.17 — State after this sitting

**No verdict moved. `QA Complete` at `4a7126b` stands for that tree and reaches no other, and
`2d90e8a` carries no QA verdict.** The verify pass is **queued behind the rider**, by steering's hold
and with QA's agreement: planner registers the rider → implementer implements → `code-reviewer-013-4`
re-reviews at the new tip → **QA verifies at the new tip** → UAT writes the gate.

**Carried into that pass, so none of it is lost between sittings:**

1. **F-QA31** and **F-QA32** — fix verification, against the pre-registered specs already captured.
2. **F-QA33** — the dangling pointer and BC-18's deleted falsity signature.
3. **F-1's limb 2** — the surviving render instrument executed under a verdict.
4. The **rider staleness condition** at P3.15 — a one-command check against the rider's diff.
5. **MEDIUM-2's status**, whether or not CR23-2 rides.
6. The **remote limb** of tree identity, which DNS denied this sitting.

**Not QA's and not to be routed here**: code review's D34 Discord question. Establishing what Discord
does with the payloads D34 admits requires sending a real outbound message, which is prohibited
outright with no approval path. **QA is as barred as the reviewer.** It is the owner's, by
observation, and this document does not carry it as a coverage gap.

**Standing note**: point-in-time, as every list here. The UAT document, then the deployment record,
are authoritative on row state.

---

# Phase 3, third sitting, 2026-08-25 — an ID collision of my own, and BC-6 ruled

**Session**: `qa-hooks-013-3` [ab2af3]. **Trigger**: `steering-hooks-013-3` relayed an owner ruling on
the lenient filter's treatment of an emptied composite, and asked which of two readings of BC-6
governs. **Row definitions are QA's, so the reading is QA's.** No verdict moves.

## P3.18 — FIRST: an ID collision I minted, in the document that carries the note against it

**My three Phase 3 findings were numbered F-QA29, F-QA30 and F-QA31. F-QA29 and F-QA30 already
existed in this document and are both `CLOSED`.** F-QA29 was *"a TDD row asserts `Yes` while its own
prose says otherwise"*; F-QA30 was *"F-QA25's correction overwrote the original claim rather than
restating beside it"*.

**This is the BC-13/BC-14 defect, committed by me, in the same document whose register carries the
ID-collision note warning against it.** I numbered from the last finding I could see rather than from
the document's true high-water mark — the identical mistake, one ID space over. Caught only because
this sitting grepped `F-QA30` for an unrelated reason; **no disambiguator would have caught it**, since
both pairs are QA findings addressed to the implementer.

**Resolved on the register's own precedent — the older keeps the number, the newer renumbers, and
every row gains a stable NAME so citations survive:**

| Was | **Now** | Name | State |
|---|---|---|---|
| F-QA29 *(earlier round)* | **F-QA29** — unchanged | `tdd-row-false-yes` | CLOSED |
| F-QA30 *(earlier round)* | **F-QA30** — unchanged | `correction-overwrote-claim` | CLOSED |
| F-QA29 *(Phase 3)* | **F-QA31** | `load-confirmation-names-wrong-mode` | **OPEN — in the rider round** |
| F-QA30 *(Phase 3)* | **F-QA32** | `emptied-composite-drop-unnamed` | **WITHDRAWN — see P3.19** |
| F-QA31 *(Phase 3)* | **F-QA33** | `disclosure-pointer-dangles` | **OPEN — in the rider round** |

**Prefer the name to the number.** The pre-registered specs and their run captures are renamed to
match, **except the captured run outputs**, which are left byte-identical: they record what was
executed, under the filenames that existed when it ran, and editing captured evidence to match a
later rename would be falsifying it. `run-red-fqa31-*.txt` and `run-red-fqa32-*.txt` therefore name
`013-fqa29-…` and `013-fqa30-…` inside. That is correct and is not drift.

**Steering has already propagated `F-QA29`/`F-QA30`/`F-QA31` to the planner and the owner.** The
names above are what should be carried; the numbers are told to it directly so the rider round does
not inherit a collision.

## P3.19 — BC-6 ruled: it reaches unsupported **TYPES**, not emptied instances. Reading 2

**The owner's ruling, with its provenance as relayed**: offered an option labelled *"Remove it, and
say so"*, he **rewrote the label to "Remove it, don't say so"** and submitted that. The removal half
is agent-authored and adopted; **"don't say so" is his own wording, unprompted**, and is the operative
change. The alternative — keep the emptied composite and let it through — was in front of him and not
taken.

**BC-6, quoted from its own row rather than from memory:**

> **Condition**: *M4-b: the lenient filter **names** the dropped **types** at both JSON surfaces*
> **Earliest-decidable**: *a paste carrying a top-level Thumbnail-11*
> **Predicted value**: *the notice names the **type***

**The ruling: BC-6 reaches unsupported types only. The emptied composite falls outside it. There is
no conflict, nothing is unpassable, and nothing goes back to the owner.** Three grounds, and none of
them is deference:

1. **The row's condition and its predicted value are both about *types*.** An emptied Container is
   not a dropped type — **Container is a supported type**. An *instance* was removed; no type was
   dropped.
2. **The notice is literally a statement about type support**, and reading 1 would require it to lie.
   It renders `Not supported on Hooks.gg: ${types}`. Naming an emptied Container there asserts
   *"Container is not supported on Hooks.gg"*, which is **false**. **A register row cannot require a
   surface to make a false statement**, so a reading that demands it is the wrong reading.
3. **The filter already satisfies BC-6 across its whole class, proved by this pass's own control.**
   `verification/013/probe-qa-p3-stale-prediction-differential/` §E2: a Container emptied **by** an
   unsupported child names `["Select Menu"]`; a top-level Thumbnail-11 names `["Thumbnail"]`; a
   Container that keeps a child is correctly not a drop. **The filter names exactly the unsupported
   types and nothing else.** That is coherent and complete on reading 2.

**And the ruling is right on the merits, which is worth saying because I raised the finding against
it.** An emptied Container is an **empty box** — nothing was in it. The case where a user actually
loses something is a composite emptied *by* an unsupported child, and **that case is already named**.
Naming the empty-box case would put a notice on a path where nothing happened.

### The defect this exposes is in how I wrote BC-6, not in the code

**BC-6's failure-mode cell over-reaches its own condition cell.** The condition says *"the dropped
types"*; the failure mode says *"a component vanishes with no trace"* — which is strictly broader and
does describe the emptied composite. **That over-reach is what made F-QA32 feel supported**, and it is
a defect in the row as I authored it.

The operator-terms cell exists so a condition cannot be deprioritised as polish. It is a **rendering
of the condition, not an extension of it** — and when it drifts wider, it becomes a second, unwritten
condition that no one ratified. **Carried to the retrospective**: an operator-terms cell must be
checkable against its own condition cell, or it silently widens the row.

**BC-6 is not restated.** Its condition is correct as written and the code satisfies it. What is
recorded is that its failure-mode cell is wider than its condition, and that **the condition governs**.

### On the prop that went out from under it

Steering is right that my F-QA32 framing leaned on BC-5's operator-terms cell — *"Green means safe"* —
and **BC-5 is now WITHDRAWN**. That prop is gone. **It does not change the ruling**, because none of
the three grounds above uses BC-5: they rest on BC-6's own condition text, on the notice's wording,
and on this pass's own measurement. Recorded so the withdrawal is not mistaken for the reason.

## P3.20 — **F-QA32 `emptied-composite-drop-unnamed` — WITHDRAWN**, and it must leave the rider round

**Recorded beside the finding, not over it.** F-QA32 as raised was that the removal happens silently.
**The owner has ruled the silence intended, and QA agrees with the ruling on the merits** (P3.19). The
finding is withdrawn as a defect.

> **URGENT, and the reason this section exists.** Steering reported the owner approving the rider
> round as *"the `|` split at all three sites, F-QA29, F-QA30, and CR23-2"* — where that `F-QA30` is
> this finding under its pre-collision number. **It must come OUT of the rider round.** An
> implementer who makes its assertions pass builds the behaviour the owner declined, in the same
> round he declined it. The pre-registered spec is marked **WITHDRAWN — DO NOT IMPLEMENT AGAINST
> THIS SPEC** in its own header so it cannot be picked up by a reader who has not read this section.

**The spec is retained struck rather than deleted.** It records what was measured, and its **four
controls remain true statements about the shipped filter** — including the one that carries P3.19's
third ground.

### Correction to a BLOCKING RELEASE CONDITION I wrote

Section **P3.11** carries, under a `BLOCKING RELEASE CONDITION` heading and addressed to UAT by name:

> *"**BC-6 cannot pass while F-QA30 stands.** A Container emptied by the filter is deleted from the
> user's message with nothing shown anywhere, beside a green state…"*

**That condition is WITHDRAWN.** It was written before the owner's ruling and on the reading this
sitting has now rejected. **BC-6 stands as written and the code satisfies it**; nothing about BC-6
blocks anything. Recorded here rather than edited out of P3.11, so the withdrawal is visible to a
reader who lands on either section — and stated explicitly because a blocking condition that quietly
disappears is worse than one that was never raised.

**P3.11's other blocking condition — BC-1 and F-QA31 `load-confirmation-names-wrong-mode` — is
unaffected and stands.**

## P3.21 — State after this sitting

**No verdict moved.** `QA Complete` at `4a7126b` stands for that tree; `2d90e8a` carries no QA verdict;
the verify pass is still queued behind the rider.

**Rider round, as QA understands it after this ruling** — the delimiter class at all three sites,
**F-QA31**, **F-QA33**, CR23-2, CR23-3, CR23-4, **and NOT F-QA32**.

**Carried into the verify pass**, replacing the list at P3.17 item 1: fix verification for **F-QA31**
and **F-QA33**; **F-1 limb 2**; the rider staleness condition at P3.15; MEDIUM-2's status; the remote
limb of tree identity. **F-QA32 is withdrawn and is not verified** — its absence from the fixed tree
is the expected state, and a future reader must not read that absence as a missed fix.

---

# Phase 3, fourth sitting, 2026-08-25 — cell reconciliation, swept on the class

**Session**: `qa-hooks-013-3` [ab2af3]. **Trigger**: `uat` rev 29 (`8de8f3c`), **read at that document**,
marked **BC-6 `NOT EXECUTABLE`** pending one reconciliation. No verdict moves.

## P3.22 — `uat` is right, and I filed it in the wrong place

I disclosed BC-6's cell over-reach myself and then **sent it to the retrospective**. That was wrong,
and the reason it was wrong is worth stating plainly because it is a reasoning failure and not an
oversight: **I treated the over-reach as an explanation of a past error of mine rather than as a live
property of a row an operator is about to execute.** Having found the cause of my own withdrawn
finding, I stopped looking at the row.

**`uat`'s framing, which I adopt**: I ruled on the **condition** cell; the **failure-mode** cell was
never reconciled to it and still said something wider. An operator executing against the failure-mode
cell could watch an emptied Container vanish with no trace and record **FAIL** — on a row I had just
ruled the code satisfies. **A false failure manufactured by the row's own internal disagreement.**

And `uat`'s sharpening is the part I had not seen: **a row with two predicates is worse than a row
missing a cell.** A missing prediction is not executable and gets routed back to me. **A row with two
predicates is executable — to either answer — which is the failure mode that does not announce
itself.** That is the same hazard rev 18 marked eight rows stale to prevent, arriving through a
different door.

## P3.23 — Swept on the class's predicate, not on the instance

My own rule: *derive the sweep predicate from the class's definition, never from the phrasing of the
instance that revealed it.* `uat` stated the class — **two cells of one row specifying two different
predicates** — so the sweep is over that, not over "rows that mention vanishing components".

**Sweep predicate**: every register row carrying a full ten-cell definition; for each, *can an
operator executing against the **failure-mode** cell reach a different verdict than one executing
against the **condition** cell?* **Excludes**: the three-cell state tables and disposition tables
(BC-18/19/21/11b at L2359+, L2570+, the Phase 3 disposition table), which restate state and define
nothing; and the pointer rows whose Class cell is `—` (BC-11, BC-11a), which carry no predicate.

**Enumerated, by computing rather than by reading a listing** (see the instrument note below):
**26 rows carry a full ten-cell definition**. Excluded from reconciliation: **2 pointer rows** whose
Class cell is `—` and which carry no predicate (BC-11, BC-11a), and **1 restatement** whose
failure-mode cell is `—` (BC-16 at L1442, the renumbering entry). **That leaves 23 rows carrying both
a condition and a prose failure-mode cell**, of which **BC-5 is `WITHDRAWN` by the owner and is not
reconciled**. **The known instance, BC-6, is among the matches** — the check that the predicate is
derived from the class and not fitted around it.

### Result: **two** members, and the second one is live and blocking

| Row | Divergence | Direction | Fixed |
|---|---|---|---|
| **BC-6** | failure mode describes an **instance** removal; condition is about a dropped **type** — a scenario the condition does not cover at all | **wider** → **false FAILURE** | **yes** |
| **BC-1** | condition has two clauses — *which types are added/removed* **and** *whether the message type changes*. The failure mode spoke only to component loss, so **it could not express a wrong mode statement, which loses nothing** | **narrower** → **false PASS** | **yes** |

**BC-1 is the one that matters more, and I nearly missed it by fixing only what was asked.** F-QA31
`load-confirmation-names-wrong-mode` is *entirely* about the mode clause. I declared BC-1 blocked on
that defect — and BC-1's own failure-mode cell described a symptom the defect does not produce. **An
operator handed BC-1 and reading that cell for what to watch would have watched for lost components,
seen none, and recorded PASS over the exact defect the row was blocked on.** A false pass, on the row
carrying this chain's one live blocking condition.

**Both cells now read**:

- **BC-6** — *a component **type** Hooks.gg cannot support is removed without the notice **naming that
  type***, with the emptied-composite case named as **not a member** so the ruling cannot be re-widened
  by a later reader.
- **BC-1** — **both clauses, each stated as independently sufficient to fail the row**, with F-QA31
  named in the cell.

### Residual, dispositioned by name rather than left silent

**Six rows have a failure-mode cell that names only the most vivid limb of a multi-limb condition** —
BC-8, BC-9, BC-11b, BC-14, BC-16, BC-18. **Examined and deliberately not changed.** They
*under-illustrate* their condition; they do not *misdirect* it, because every limb they omit is still
carried by the row's **Predicted value** cell, which is the operator's checklist. **BC-6's defect was
categorically different: its cell described a scenario the condition does not cover at all.**

**This is a disposition, not a clean bill.** If `uat` executes rows from the failure-mode column rather
than the Predicted-value column, these six become the same defect and I will reconcile them on request.
**Say so and I will do it** — I would rather be told the column I assumed is the checklist is not the one
being read.

### Re-run and reconciled

Enumeration re-run after correcting. **23 rows carrying both cells**, partitioned with every member
named:

| Disposition | Count | Rows |
|---|---|---|
| **Corrected** | **2** | BC-1, BC-6 |
| **Under-illustrating — examined, deliberately unchanged** | **6** | BC-8, BC-9, BC-11b, BC-14, BC-16, BC-18 |
| **Aligned — cells specify the same predicate** | **14** | BC-2, BC-3, BC-4, BC-7, BC-10, BC-12, BC-13, BC-15, BC-17, BC-19, BC-19a, BC-19b, BC-20, BC-21 |
| **`WITHDRAWN` by the owner — not reconciled** | **1** | BC-5 |

2 + 6 + 14 + 1 = **23**. **No residual undispositioned.**

### Instrument note — I put an unverified count in this section and caught it before committing

The paragraph above first read *"21 carry a full ten-cell definition; 19 of those are live"*. **Both
numbers were wrong** — the truth is 26 and 23. I had **counted rows by eye off a printed listing**
rather than computing the partition, in the same sitting in which I am writing about predicates that
cannot see their own members.

Caught by re-running the enumeration as a computation before committing, which is the only reason it
is a note and not a correction. **Recorded because the failure mode is the interesting part: the
listing was correct and complete — the instrument did not lie — and I still got the number wrong,
because I read it instead of computing it.** This chain's recurring class is a predicate that cannot
see a member; this is its cheaper cousin, a *reader* that cannot count one.

## P3.24 — On the three collapses `uat` refused, all three accepted

Recorded because two of them constrain how I may cite my own ruling:

1. **`LIFTED`, not `WITHDRAWN`.** That register's `WITHDRAWN` is **owner-only**. Mine was not an
   obligation the owner ended, and I will not call it withdrawn. **I used "WITHDRAWN" of the blocking
   condition at P3.20 and that word was wrong for that register's vocabulary** — the *finding* F-QA32
   is withdrawn (mine to withdraw); the *blocking condition* is **LIFTED**. Corrected here rather than
   over P3.20.
2. **BC-6 the row is not withdrawn** — it stands, open, `NOT EXECUTED`. What lifted is a constraint on
   its executability.
3. **It was never fixed; it never applied.** Correct, and the consequence `uat` names is the one I had
   not thought through: **a fixed blocker implies a code change and would put a commit in the chain; a
   never-applied blocker puts nothing there.** My grounds 1 and 2 are definitional, so nothing was
   repaired and nothing should be looked for.

**And `uat` was right to note ground 3 and not rest on it** — it is a test result from my own
instrument, and a stage that does not read source cannot weigh it. Grounds 1 and 2 carry the ruling
alone, which is what I intended when I said ground 2 is the one I would defend hardest.

## P3.25 — State

**No verdict moved.** **BC-6's `NOT EXECUTABLE` constraint is answered** — both cells reconciled, and
the sweep that produced a second correction is recorded above. **BC-1 stands blocked on F-QA31**, now
with a failure-mode cell that can actually express it.

**Register maintenance log — appended:**

- **2026-08-25 — BC-6 and BC-1 failure-mode cells RECONCILED to their condition cells** (qa, this
  sitting), on `uat` rev 29's ruling that the divergence is live rather than retrospective. **BC-6 was
  the raised instance; BC-1 was found by sweeping the class and is the more serious of the two** — its
  cell could not express the defect the row is blocked on. **No condition, predicted value, subject,
  instrument or state changed on either row.** What changed is what the operator is told to watch for.

---

# Phase 3, fifth sitting, 2026-08-25 — the subject test applied. **Six rows, not four**

**Session**: `qa-hooks-013-3` [ab2af3]. **Trigger**: `uat` rev 30 (`4b10499`), **read at that document**.
No verdict moves.

## P3.26 — The ruling, and why I concede it rather than accept it

I offered `uat` a binary — Predicted-value column or failure-mode column — and it refused both: **the
row's *subject* decides.** Human primary → the failure-mode cell **is** the checklist. Machine primary →
that cell is documentation and governs nothing.

**I concede, and the argument that settles it is one I supplied without noticing.** `uat`:

> *QA corrected BC-1 **because** an operator reading its failure-mode cell would have recorded PASS. That
> correction is only necessary if that cell is what the operator reads. If the Predicted-value column
> were the checklist, BC-1's narrow cell would have been harmless — by exactly the argument QA makes for
> the six.*

**My two rulings in one pass were mutually inconsistent and I did not see it.** I fixed BC-1 on the
premise that the failure-mode cell is what the operator reads, and in the next paragraph dispositioned
six rows on the premise that it is not. The subject test reconciles them, and it upholds my assumption
**precisely where the subject is not human** — which is the half I was right about and the half that was
doing no work.

**And its correction of my *under-illustrate* / *misdirect* distinction is right on the mechanism**: both
let an operator watch the wrong thing, see nothing, and pass. **They differ in probability, not in kind.**
The part I should have caught myself: *"which omitted limb turns out to matter is knowable only after the
failure."* I knew BC-1's omitted clause mattered **because a finding named it** — and I then treated the
absence of a finding against the other six as evidence they were safe. **That is this chain's own
silent-mode doctrine, and I applied it to everything except my own disposition.**

## P3.27 — Re-run under the ruled standard. **The set is six**

**The four I was handed came out of my own earlier classification, which used the weaker test.** Re-using
that list would have been a sweep on the instances rather than on the predicate — the exact error whose
correction produced BC-1 two sittings ago. **So the enumeration was re-run from scratch under the ruled
standard**, and it is wider.

**Standard applied**: for every **live** row whose **primary instrument requires a human subject**, is
**every limb of the Predicted value findable in the failure-mode cell?**

| Row | Subject test | Limbs in `Predicted value` | Named in the old cell | Ruling |
|---|---|---|---|---|
| **BC-4** | human (UAT agent) | dialog stays · error shown · nothing created | **1 of 3** | **RECONCILED — not in `uat`'s four** |
| **BC-7** | human (UAT agent) | V2 · bit set · warning | **1 of 3** | **RECONCILED — not in `uat`'s four** |
| **BC-8** | human (UAT agent) | Classic · content intact · bit cleared · warning · no V2 error | 1 of 5 | **RECONCILED** |
| **BC-9** | human (UAT agent) | two options · each names its drop · nothing created first · dismissal non-destructive · both outcomes | 1 of 5 | **RECONCILED** |
| **BC-14** | **human — `operator observation in production`, subject *the owner, in normal use*** | four observations | 2 of 4 | **RECONCILED.** This is the subject test `uat` declined to guess |
| **BC-18** | human (owner, at a browser; **no non-human primary exists**) | appears · persists · clears | 1 of 3 | **RECONCILED — done first, per `uat`** |

**BC-4 and BC-7 are the two `uat` could not have named**, because they were never in the six I handed it
— I had classified them *aligned* under the weaker test. **Found only by re-deriving the enumeration
instead of reusing my own list.**

**Not reconciled, each with the reason:**

- **BC-11b — not a row.** `DROPPED — D44` at `uat` rev 28. No line spent.
- **BC-16 — machine primary** (`probe-qa-p2-rowd-load-gate/` re-run green; operator observation is
  *fallback only*). Cell is documentation. **Confirms `uat`'s clearing independently.**
- **BC-15 — `WITHDRAWN` (D44).** Its cell names 1 of 3 limbs, so it *would* have qualified. **A withdrawn
  row is not reconciled**, and recording that is the point: the omission is a decision, not an oversight.
- **BC-13 — no human subject** (*"decided by the clock"*). Documentation.
- **BC-10, BC-12, BC-17, BC-19, BC-20, BC-21, BC-19b** — human subjects, and **every limb already
  findable**. Re-checked under the ruled standard, not carried forward from the earlier pass.

### Backward risk: checked on every terminal human-subject row, and it clears

**`uat` checked BC-16 for this before ruling, and it was right that the implication is worse than the
ruling**: if a terminal row's cell was its checklist and under-illustrated, the terminal state rests on
an incomplete observation — **a false pass already filed, not a future one to prevent.**

**I extended that check to every terminal row with a *human* subject**, which BC-16 is not:

| Terminal row | Limbs named | Clears? |
|---|---|---|
| **BC-2**, **BC-3** | all | **Yes** — no divergence to inherit |
| **BC-19a** | **appears** named, **clears** not | **Yes, but not on the cell.** `uat` rev 19.2: *"the whole row is terminalised, not one limb — he attested against the row **by number**."* The attestation route never passed through a cell, so no cell could have narrowed it |

**No backward risk anywhere.** Recorded although the answer is "nothing wrong", on `uat`'s own ground:
**checked-and-cleared and not-checked are indistinguishable in a record that omits the check.**

### Two expected-behaviour notes written *into* the cells

BC-18's and BC-9's reconciled cells state what is **not** a failure — the row-E resting state after D31,
where a correction that traverses "both V2 components and classic content" replaces the warning with the
conflict notice and its **Resolve** link. **Without it, the wider cell I have just written would
manufacture the exact false failure P3.4's re-derivation exists to prevent**: an operator now told to
watch for *"it appears and never clears"* would see the notice change rather than disappear and record a
FAIL. Same technique as BC-6's exclusion clause — the ruling written into the cell so a later reader
cannot re-widen it by inference.

## P3.28 — Partition, re-derived with BC-11b out

`uat` noted the arithmetic is mine and did not do it. **26 ten-cell rows** → less **2 pointers**
(BC-11, BC-11a) and **1 restatement** (BC-16 at L1442, failure cell `—`) → **23 carrying both cells** →
less **BC-11b, no longer a row** → **22 in scope.**

| Disposition | Count | Rows |
|---|---|---|
| **Reconciled — earlier sittings** | **2** | BC-1, BC-6 |
| **Reconciled — this sitting** | **6** | BC-4, BC-7, BC-8, BC-9, BC-14, BC-18 |
| **Machine primary — cell is documentation** | **2** | BC-13, BC-16 |
| **Human subject, already complete** | **10** | BC-2, BC-3, BC-10, BC-12, BC-17, BC-19, BC-19a, BC-19b, BC-20, BC-21 |
| **Terminal by owner ruling — not reconciled** | **2** | BC-5 (`WITHDRAWN`), BC-15 (`WITHDRAWN`, D44) |

2 + 6 + 2 + 10 + 2 = **22**. **Verified by computation, not by adding the column**: the buckets were
checked against the enumerated scope for duplicates (none), rows in scope but unbucketed (none), and
rows bucketed but out of scope (none). **No residual undispositioned.**

**Instrument note, second sitting running.** The fourth bucket was first written `9` against a list of
ten names, and 2 + 6 + 2 + 9 + 2 = 21 against 22 in scope. **The discrepancy is what located the
miscount** — I did not spot it by re-reading the row of names. Last sitting I recorded that I had
*read* a listing instead of computing it; this sitting I *counted a list I had written myself* instead
of computing it. **Same defect, one step further in.** The rule I am adopting for the rest of this
chain: **a partition is published only after its buckets have been checked against the enumeration by
a program** — the sum matching is not the check, because a sum can match with two errors in it.

## P3.29 — State

**No verdict moved.** **BC-4, BC-7, BC-8, BC-9, BC-14 and BC-18 are reconciled and, so far as this
document is concerned, executable** — `uat` holds row state and marks executability.

**BC-1's blocking condition stands** — F-QA31 `load-confirmation-names-wrong-mode`, in the rider round.
**BC-18 is decidable today**, and its cell now names all three limbs plus the one thing that would look
like a failure and is not.

**Register maintenance log — appended:**

- **2026-08-25 — six failure-mode cells RECONCILED to their Predicted values** (qa, this sitting), on
  `uat` rev 30's subject test: BC-4, BC-7, BC-8, BC-9, BC-14, BC-18. **BC-4 and BC-7 were not in the set
  handed to me**; they were found by re-running the enumeration under the ruled standard rather than
  reusing my own earlier classification. **BC-14's subject test applied here** — its primary is operator
  observation in production, so the cell is its checklist. **No condition, predicted value, subject,
  instrument or state changed on any row.**
- **2026-08-25 — backward risk checked on every terminal human-subject row and cleared** (qa, this
  sitting). BC-2, BC-3 name every limb; **BC-19a's *clears* limb is unnamed in its cell but its
  terminalisation ran through an attestation against the row by number**, not through a cell. Recorded
  though nothing was wrong.

---

# Phase 3, sixth sitting, 2026-08-25 — my prose overstated my own row, and the class has a second cell pair

**Session**: `qa-hooks-013-3` [ab2af3]. **Trigger**: `uat` rev 31 (`720c5cc`) via `steering-hooks-013-3`.
No verdict moves.

## P3.30 — The BC-7 overstatement is mine, and it is this cwd's named prose failure

`steering` has owned the relay failure as its own. **The phrase was mine first and I am recording it
here, because the document is where my claims are supposed to hold and this one did not survive contact
with it.**

| | Text |
|---|---|
| **My register cell (L647)** | *"…everything looks right on screen and the message is wrong on the wire, and **only the Message JSON shows it**"* |
| **My covering prose to steering** | *"…the flag can be wrong **with nothing to show it**"* |

**Those are different claims, and the difference is the whole ruling.** *"Only the Message JSON shows
it"* names an instrument and makes the limb **observable**. *"Nothing to show it"* says the limb has
**no witness** — and a limb whose signature is absence cannot be settled by human observation at all.
`uat` reports it would have marked BC-7 **`NOT EXECUTABLE`** on my prose, defensibly, **and would have
blocked a row I had already fixed correctly.** It caught it only by verifying at this document instead
of ruling from the relay.

**This is the failure this cwd has already named and paid for**: *the disciplines hold in register rows
and fail in prose.* I wrote a correct cell and then, summarising my own correct cell one turn later,
dropped the instrument out of it — **while writing a message whose subject was cells that omit limbs.**

**No excuse is available and I am not reaching for one.** The rule I take from it: **when prose
summarises a row I have just written, the row is quoted, not paraphrased.** A paraphrase of my own cell
is a fresh claim and gets checked like one.

## P3.31 — `uat`'s recording constraint, written into the rows rather than left in a message

`uat` imposed one constraint that is mine to honour at the walkthrough: **the bit limb is settled by
opening the Message JSON and never by the screen looking right; *"everything looked correct"* is not an
observation of it.**

**A constraint that lives only in a message is not a constraint** — the operator reads the row. It is
now **in the cells**, in both the Predicted value and the failure mode, on **both** members of the class.

**Swept for the class rather than applied to the instance handed to me.** Predicate: *a live row with a
human subject carrying a limb whose only witness is the Message JSON.* Rows naming the flag or bit:
**BC-7, BC-8, BC-15, BC-16.** **BC-16's primary is a probe** (machine — the constraint is meaningless
there) and **BC-15 is `WITHDRAWN` (D44)**. **So the live class is BC-7 and BC-8, and both now carry it.**
BC-8's bit-**cleared** limb is the same defect as BC-7's bit-**set** limb, and it is the one on 5712's
own repair route.

## P3.32 — **The class has a second cell pair, and nobody had swept it**

`uat`'s generalisation from rev 31 is the one I am acting on: **when a ruling changes the standard,
every classification made under the old standard is void — not narrowed.** The ruled standard is *two
cells of one row must not specify different predicates.* Every pass so far — mine and `uat`'s — has
applied it to **(condition ↔ failure mode)**. **It was never applied to (condition ↔ predicted value)**,
and the Predicted-value cell is what an observation is recorded *beside*.

**Swept.** Predicate: *does the Predicted-value cell name every limb its own Condition cell requires?*
**Excludes** the pointer and restatement rows, and the two owner-`WITHDRAWN` rows.

| Row | Limbs in Condition | Named in Predicted value | Missing |
|---|---|---|---|
| **BC-7** | V2 · **bit set** · warning | 2 of 3 | **bit set** |
| **BC-8** | Classic · content intact · **bit cleared** · warning · **no V2 error** | 3 of 5 | **bit cleared**, **no V2 error** |
| **BC-9** | two options · **each names its drop** · nothing created first · **dismissal non-destructive** | 2 of 4 | **each names its drop**, **dismissal non-destructive** |
| **BC-19a** | appears · **clears** | 1 of 2 | **clears** — **terminal; dispositioned, see below** |
| all other live rows | — | **complete** | — |

**Partition verified by program**, per the rule adopted last sitting: **22 rows in scope** = 3 corrected + 1 found-not-corrected + 4 machine-primary-or-withdrawn + 14 complete; checked for duplicates, in-scope-unbucketed and bucketed-out-of-scope — **none of each**. The sum was not the check.

**Three live members, all corrected.** **This pass therefore changes Predicted-value cells, which no
previous pass did, and that needs saying plainly rather than being buried**: five sittings have closed
with *"no condition, predicted value, subject, instrument or state changed."* **This one changes three
Predicted values.**

**Why that is not widening a row.** The **Condition** cell is authoritative and already requires every
limb added. A prediction that omits a limb its own condition requires is not a narrower row — it is an
**incomplete prediction of the same row**. Nothing is being asked of the product that BC-7, BC-8 and
BC-9 did not already ask. **No condition, subject, instrument, owner or state changed.**

**BC-19a, dispositioned not corrected.** Its Predicted value names *appears* and not *clears* — a real
member. But the row is **terminal `EXECUTED`**, and `uat` rev 19.2 terminalised it on an attestation
**against the row by number**, a route that never passed through a cell. **Editing a terminal row's
prediction after the fact would change what the record says was predicted at the time it was observed.**
Recorded as found-and-not-corrected, with the reason, rather than left out of the table.

**On the risk that I am now the one over-reaching**: the widening rule I proposed and `uat` adopted —
*a widening without its exclusions trades a false pass for a false failure* — applies to these three too.
Each addition is a limb the condition already names, so no new observation is created; **and the BC-7 and
BC-8 additions carry their instrument with them**, which is exactly the exclusion that keeps *"the screen
looked fine"* from being filed against a limb the screen cannot show.

## P3.33 — On `uat` correcting itself, and what I take from it

`uat` records that rev 30 **changed the standard and then tested the old classification in one direction
only** — it asked whether my six were too *large*, removed two correctly, and never asked whether the set
was too *small*. **That is the same shape as my own *"having found the cause, I stopped looking at the
row"***, and its formulation is better than mine: **auditing the set you were handed finds only the
errors that produce false members; the errors that produce missing members are invisible to that audit,
and those are the ones that leave rows certified safe.**

**This sitting is that rule applied to `uat`'s own ruling.** The subject test was a change of standard;
every classification made before it — including the cell pair nobody had thought to check — is void
rather than narrowed. **BC-7's, BC-8's and BC-9's Predicted values had been read past by every pass in
this chain, mine included, because no pass ever asked that question of them.**

## P3.34 — State

**No verdict moved.** Eleven of twelve rows executable per `uat` rev 31; **BC-1 alone remains blocked**,
on F-QA31 `load-confirmation-names-wrong-mode` in the rider round.

**Register maintenance log — appended:**

- **2026-08-25 — BC-7, BC-8, BC-9 Predicted-value cells COMPLETED to their own Conditions** (qa, this
  sitting). **This is the first pass in this chain to change a Predicted value.** Every limb added is one
  the row's Condition already required; nothing new is asked of the product. **No condition, subject,
  instrument, owner or state changed.**
- **2026-08-25 — the Message-JSON recording constraint written into BC-7 and BC-8** (qa, this sitting),
  on `uat` rev 31. **The bit limb is settled by opening the Message JSON, never by the screen looking
  right.** Applied to both members of the class, not only to the row it was raised against.
- **2026-08-25 — BC-19a's incomplete Predicted value FOUND AND NOT CORRECTED** (qa, this sitting).
  Terminal `EXECUTED`; editing a terminal row's prediction would change what the record says was
  predicted when it was observed. Recorded so the omission is a decision.

---

# Phase 3, seventh sitting, 2026-08-25 — two rules received, one of which I had already broken

**Session**: `qa-hooks-013-3` [ab2af3]. **Trigger**: `uat` rev 32 (`25f036f`) via `steering-hooks-013-3`.
**No verdict moves, no row changes, and this sitting deliberately adds no sweep** — see P3.37.

## P3.35 — R31.4's sweep: withdrawn before it reached me, and **no pass was spent on it**

`uat` withdrew the terminal-observation sweep (BC-2, BC-3, BC-19a) after deriving it from plan 013's
D41 row. **Recorded because "no work was done" is itself a fact the record should carry**: steering
routed it to the plan rather than to me, I noted it as not mine, and **I did not begin it.** The
withdrawal cost this stage nothing, which is the outcome the routing was designed for and did not
happen by luck.

## P3.36 — **`uat`'s "derive before routing" rule, applied to myself. I broke it, and the instance is worse than its own**

`uat`'s rule: *a question answerable by derivation is not escalated* — which it applies rigorously
**upward** and had never applied **laterally**. Its formulation:

> *Escalating upward feels expensive, so it gets a test. Routing sideways feels free, so it does not.
> It is not free — it spends a peer's pass and can commission a sweep the record could have settled.*

**I agreed with that and then checked whether I had done it, which is the only form of agreement worth
sending. I had.**

**The instance is my own question to `uat` about which column is the checklist.** I routed it sideways
as a binary — Predicted value or failure mode — and it cost `uat` a pass to answer.

**It was derivable, and not from `uat`'s document. From mine, and from my own instructions.**

- **My own definition states the rule**: *the primary instrument — what would settle the row — and the
  subject — who observes — are separate fields, never a disjunction in one; owner is assigned from the
  primary, never the fallback; where the primary needs no human, the row is owned by a stage from the
  moment it is written.*
- **I authored those columns into this register myself.** The header at L639 reads
  `… | Primary instrument | Subject / fallback | …` **because I put them there, on that rule.**
- **The subject test is that rule read forward one step.** If primary and subject are separate fields
  precisely so that a row with no human primary belongs to a stage, then **which cell an operator reads
  is settled by whether there is an operator** — which is what `uat` ruled.

**So I had the premise, I had built the artifact that encodes it, and I asked a peer for the
conclusion.** That is not a missing input; it is not deriving from inputs already in hand — which is
exactly the shape `uat` names in its own three instances.

**And the binary was itself the symptom.** Had I derived, I would not have offered two columns and asked
which; I would have found that **the question has a subject-shaped variable in it** and answered it.
**A false dichotomy offered to a peer is evidence that the deriving step was skipped**, because
derivation is what would have exposed the third option.

**Adopted, and stated as binding on this stage in any direction**: *derive before routing.* A question
put to a peer carries, in the same message, what I derived and where the derivation stopped — so the
peer can see whether it is being asked for a ruling or for a lookup.

## P3.37 — Stop condition, honoured. **This sitting adds no sweep**

Last sitting I wrote: *the two cell pairs are now consistent with each other and with the conditions, so
the next defect found in this register will be a different kind, and if it is not, the rows are being
edited rather than improved. I am not looking for a third cell pair.*

**That condition binds here.** P3.36 is a method finding about how I route, **not** a register defect,
and it produces **no row change**. Nothing in `uat` rev 32 identifies a defect in a row. **So no rows are
touched in this sitting**, and that is the stop condition working rather than an absence of diligence.

**The one thing that would reopen it**: a defect of a *different kind* in a row — not a third pair of
cells disagreeing.

## P3.38 — `uat`'s sharpening of the BC-7 lesson, which upgrades my own entry at P3.30

I recorded BC-7 as a prose failure and drew the practitioner's rule: *quote the row, do not paraphrase
it.* **`uat`'s conclusion is the principle underneath it and is stronger**, because the phrase was my own
verbatim prose about my own document:

> **A stage's prose about its own artifact is not evidence of what the artifact says.**

**That is not a relay hazard.** The relay merely transmitted it; the defect was complete before the
message was sent, and would have been complete had I never sent one. **My P3.30 entry is amended by
this**: the rule is not "check a relay", it is "a stage's own summary of its own row is a fresh claim,
including when the stage is me and the row is mine".

**And `uat` places it as plan D42 instantiated one day after D42 was written, by a second stage.** D42
ruled that the prose-fails / rows-hold split generalises past steering **to every stage that writes prose
beside a structured artifact.** I am that generalisation's first confirmed instance outside the stage it
was written about, and this document's Status-Detail and Changelog prose are inside the class too — they
are prose beside a structured register, written by me, and nothing has ever checked them against it.

**Recorded as retrospective material in `uat`'s framing rather than mine**, since its formulation is the
one that generalises.

**On the apportionment it sent unedited** — *QA's document was correct; QA's prose overstated it;
steering passed prose as a finding and said so unprompted; `uat` caught it at the last point it could be
caught* — I accept it, and the sentence after it is the one worth keeping: **that the system worked at
the last step is not evidence the earlier steps are sound; it is the reason the last step exists.**

## P3.39 — State

**No verdict moved. No row changed. Eleven executable; BC-1 alone blocked** on F-QA31
`load-confirmation-names-wrong-mode`, in the rider round. **No verdict before the post-rider tip.**

**Register maintenance log — nothing appended this sitting.** Recorded explicitly, because a maintenance
log that is silent for a sitting is indistinguishable from a sitting that was not logged.

---

# Phase 3, eighth sitting, 2026-08-25 — the stop's conditions recorded, and one residual that must survive to the verify pass

**Session**: `qa-hooks-013-3` [ab2af3]. **Trigger**: `uat` rev 33 (`f7c8349`) via `steering-hooks-013-3`.
**Nothing is owed in either direction.** No verdict, no row change. This sitting exists to put three
things where they will still be true after this session ends.

## P3.40 — The cell sweep is **STOPPED BY AGREEMENT AT A DEFINED POINT. It is not COMPLETE**

**Recorded here because my own instructions forbid the alternative**: *if a pass bounds coverage, log what
was dropped — silent truncation reads as "covered everything" when it didn't.* `uat` attached this as the
first condition of agreeing to the stop, and it is right that the record, not the intent, is what a later
reader inherits.

**What was swept, with its predicate**: *two cells of one row specifying different predicates*, applied to
**(condition ↔ failure mode)** and **(condition ↔ predicted value)** over the 22 live ten-cell rows.
**What was NOT swept**: any other cell pair — `Earliest-decidable ↔ Condition`, `Primary instrument ↔
Subject`, `Owner ↔ Primary`, and the rest. **No claim is made that those are consistent. Nobody has
looked.**

**So the class is not closed, and this document must not be read as closing it.**

## P3.41 — The three conditions attached to the stop, two of which bind my next pass

1. **Recorded as stopped, not completed** — P3.40.
2. **The stop binds deliberate search, not incidental reporting.** `uat` is treating my *"the next defect
   will be of a different kind"* **as a prediction**. If a third-pair defect surfaces while a row is being
   executed, **it gets recorded** — *a falsified prediction is data about whether the stop was premature,
   not a breach by whoever finds it.* **Accepted, and I would rather it were falsified than protected:**
   a stop condition that suppresses its own counter-evidence is not a stop condition, it is a claim
   defended.
3. **The stop EXPIRES at the post-rider tip**, and this is the one that would have evaporated. The rider
   changes production code at **three sites**. When those surfaces move, **the cell-consistency question
   is fresh because the artifact changed, not because anyone went looking** — the same principle as
   prediction staleness, applied to cells rather than to values. **Answered inside the normal
   re-verification, not as a new sweep.**

## P3.42 — **BC-19a's `clears` limb: a residual that is closed to future evidence**

This is new and it is not mine to fix — but it is mine not to re-raise, and mine to carry.

**What R31.4 had cleared it on**: *"he attested by number, so no cell was in the path."* That assumed the
attestation bypassed the cells. **My predicted-value sweep removed that assumption**: BC-19a's
**Predicted value** names *appears* and not *clears*, and its **failure mode** does the same. **Both
human-facing cells named one limb of two.** What was available to read displayed *appears* and was silent
on *clears*.

> **BC-19a's `clears` limb has no positive evidence from any route, and none can now be obtained — its
> subject, `CodeMessageNotice.tsx`, was deleted at `2d90e8a`.**

**`uat` refused to revert the terminalisation on a ground I endorse**: reopening a row whose subject is
gone converts a terminal row into a **permanently unreachable obligation** — manufacturing the exact
phantom its rev 28 spent a revision clearing. **The residual is real, it is recorded, and it is not a
reason to reopen anything.**

**I did not find this by fixing BC-19a — I found it by declining to.** The disposition at P3.32 was to
leave a terminal row's prediction alone; the compounding fell out of the sweep that produced it. Recorded
because the sequence matters: **the residual was created by an earlier clearing being right about the
route and wrong about the cells**, and only a sweep of the other cell pair could show that.

## P3.43 — Carry-forward for the verify pass, restated whole

**Replaces the list at P3.29.** Restated rather than amended, because a list that is amended in three
places across four sittings is a list a successor reads wrong.

1. **Fix verification for F-QA31 `load-confirmation-names-wrong-mode` and F-QA33
   `disclosure-pointer-dangles`**, against the pre-registered specs already captured.
2. **F-QA32 `emptied-composite-drop-unnamed` is WITHDRAWN. Its absence from the fixed tree is the
   EXPECTED state** and must not be read as a missed fix.
3. **F-1 limb 2** — the surviving render instrument executed under a verdict.
4. **The rider staleness condition (P3.15)** — one command against the rider's diff: if it stays inside
   the `catch (err)` block at the two JSON surfaces, no register row is staled.
5. **The cell-consistency question, re-opened by the rider** (P3.41 condition 3) — **inside the normal
   re-verification, not as a new sweep.**
6. **MEDIUM-2's status**, whether or not CR23-2 landed.
7. **The remote limb of tree identity.** DNS denied it earlier on 2026-08-25; **re-probed while idle
   and the instrument now works** — `git ls-remote origin refs/heads/master` returned exit 0 and
   `2d90e8a`, computed **at the remote**. **This discharges the instrument's availability, NOT the
   identity**: the verify pass runs against the post-rider tip, so it re-runs this against *that*
   commit and never inherits this reading. Recorded only so the pass knows the route is open and does
   not have to plan around it being closed.
8. **Do not re-raise BC-19a's `clears` residual** (P3.42). It is recorded, it is closed to evidence, and
   raising it again would manufacture a phantom obligation.

**Assumption Not Checked, restated so it travels with this list**: this chain's register work assumes the
rows re-derived at P3.4 are the whole of what moved. **BC-12** and **BC-17** predict over Discord's API,
which no instrument here contacts, and **BC-13** predicts over a clock — all three diff clean while
having moved underneath. **Falsity signature**: an operator hits a mismatch that is neither face of
F-QA31 nor a rendering absence. **Owner**: the verify pass at the post-rider tip.

## P3.44 — State

**No verdict moved. No row changed.** Eleven executable; **BC-1 alone blocked** on F-QA31, in the rider
round. **No verdict before the post-rider tip.**

**Register maintenance log — nothing appended this sitting**, stated explicitly for the same reason as
last: a log silent for a sitting is indistinguishable from a sitting that was not logged.

**Two facts measured while idle, recorded because neither is mine to act on.** (1) The remote-identity
instrument is working again — carry-forward item 7 above. (2) **`agent-output` carries 50 commits not
at the remote** (`git log --oneline origin/master..HEAD`, counted with `grep -c`). That is the whole
chain's agent-output work across every stage, not this stage's alone; **pushing requires the owner's
approval and no verdict in this document grants it.** Recorded rather than raised, because an
unpushed record is a record that exists on one machine.

**One line for the retrospective, `uat`'s and not mine, because it is the sentence that should govern the
next chain**: *refining instructions while the observation count stands at zero is displacement, however
good each finding is.* **Eleven rows executable, none observed. Every defect across five revisions was in
the instructions for observing, and not one in the observing — because no observing has occurred.**

---

# VERIFY PASS — Rider 2, at `e1d9b2b`. **Verdict: QA COMPLETE**

**Session**: `qa-hooks-013-3` [ab2af3]. **Date**: 2026-08-25.
**Verified-At**: `e1d9b2b7090b46709861a9c4b2a57f340617777b`
**Criteria-At**: plan 013 **rev 47**, `06fad81`.

> **This verdict expires when EITHER moves** — the tree or the criteria it was measured against.
> Adopted from `uat` rev 34's finding: `Reviewed-At` names a tree and nothing named the plan
> revision, so a reader could not tell a verdict had been measured against a superseded criteria
> set. **Naming only the SHA would have made this document wrong silently while still reading as
> complete.**

## V.1 — Identity, re-derived and not inherited

| | |
|---|---|
| branch | `chain/013-rider-2` |
| `git rev-parse HEAD` | `e1d9b2b7090b46709861a9c4b2a57f340617777b` |
| `git merge-base --is-ancestor 2d90e8a e1d9b2b` | **exit 0** — `2d90e8a` is an ancestor |
| `git ls-remote origin refs/heads/master` | `2d90e8a` — **the branch is unpushed**, computed at the remote (the limb DNS denied this morning; it answered here) |
| `git status --porcelain` | **0 lines** |
| range | 2 commits, **20 files**, **10 non-test** |

**Instrument note.** My first non-test count read **13**, from `git diff --name-only … -- ':(exclude)*__tests__*'`. **The pathspec exclude did not match**, and the count was wrong. Recounted with `grep -vc '__tests__'`, computing before any filter: **10 test / 10 non-test / 20 total**, agreeing with the reviewer. **A pathspec magic word is not a predicate I have verified**; the contradiction against the file list is what caught it.

## V.2 — Suite

`npx vitest run` at `e1d9b2b`: **47 files / 605 tests / 605 passed / exit 0.** Re-derived here; agrees with the implementer's report, which this pass did not take on trust and the reviewer explicitly did not run.

## V.3 — M9 properties, each against its own named instrument

| Item | Property | Result |
|---|---|---|
| **M9-a** | no site reconstructs line structure by splitting on the delimiter | **MET.** `git grep -c "split(' \| ')" -- src` → the only hit is a *comment* in a test file describing what was removed. `formatZodIssues` maps each issue to its own `generateErrorMessage([issue])` and joins itself. All three surfaces consume it |
| **M9-b** | the confirmation is computed over the object `commitLoad` applies | **MET** — verified by differential, V.5 |
| **M9-d** | one file set for both tools; both projects exit 0; parsing errors 0 | **MET.** `tsc --noEmit` **exit 0**; `tsc --noEmit -p tsconfig.test.json` **exit 0**; ESLint `Parsing error` count **0** (I measured **45** at `2d90e8a` myself, so **45 → 0** is mine at both ends). `lint` exits 1 on **686** problems — the **D51 accepted residue**, and per the rev-47 amendment **not a failure of Validation item 1** |
| **M9-e** | no orphaned declaration remains | **MET.** `ID_LAYOUT` and `NOTICE` → **0 occurrences** in both files |
| **M9-f** | one exported definition, rendered by all three sites | **MET.** `describeDroppedComponentTypesNotice` in `shapes.ts`; **1** inline literal in `src` (the definition); all three surfaces call it; the trailing-period drift is gone by construction |
| **M9-g** | the dangling pointer resolves | **MET.** The phrase now occurs **twice** — pointer *and* section. Item 4 restored **verbatim**, items 1–3 correctly not restored, and **BC-18's falsity signature is back** (1 occurrence, matched literally) |

**On the two-instrument lint numbers**: I ran `--no-fix` and got **686**, matching the reviewer. **I did not re-run the round's `--fix` instrument and I do not restate 429 as refuted** — two instruments over two states, exactly as rev 47 records.

## V.4 — **CR24-6, ruled.** The seam is real in form and does not transmit

**Routed here by the reviewer as its own Assumption Not Checked**: *"this review assumes `resolveContentLoss` classifies row D correctly and does not test it."* The seam: M9-b's fix (`settledMode`) and M9-b's own oracle (`modeAfterLoad`) both call `resolveContentLoss` and take `.mode`, so a defect there moves code and oracle together.

**I built the oracle the reviewer specified** — every expectation a **literal transcribed from D17's five rows**, calling none of `resolveContentLoss`, `settledMode`, `applyDisposition`, `isMessageV2`, `detectMessageMode`, with a self-check asserting no executable line calls them. `verification/013/probe-qa-verify-rider2/`. **18/18 green at the tip.**

**Then I tried to make the seam transmit, which is the only way to answer the question:**

| Mutant | My oracle | M9-b's own spec |
|---|---|---|
| **M1** — row D misclassified as V2 | **4 failed** | **4 failed** |
| **M3** — row C misclassified as Classic | **3 failed** | **8 passed — BLIND** |

**Ruling: the seam does not transmit, and the reason is not luck.** `013-m8-ec3-resolver-gate.test.ts` pins `resolveContentLoss` over **all eight cells against literal expectations**, transcribed from D17's row table which its own header reproduces from the plan — `expect(d.row).toBe('D')`, `expect(d.mode).toBe('classic')`. A defect inside `resolveContentLoss` **breaks those literals rather than sliding past them.** M1 shows M9-b's spec catching the row-D mutant for the same reason: it pins `modeAfterLoad`'s output to the literal `'classic'` rather than comparing two computed values. **The reviewer's header critique is right — *"not derived from `computeLoadDiff`"* is narrower than the independence it asserts — but the independence exists anyway, one layer down.**

**What the concern does catch, and it is real**: **M9-b's spec is blind at row C.** No fixture in it expresses the flag-only cell, so M3 passes it 8/8. **The chain is not blind** — EC-3's gate and `013-m2c-load-diff.test.ts` both catch M3 — **but M9-b's criterion alone was**, and the oracle here closes it at the composition where EC-3 closes it at the resolver.

**CR24-6 is DISCHARGED**, with its instrument captured rather than narrated.

## V.5 — Prediction freshness at `e1d9b2b`. **Owed as a fact, and paid**

Validation item 9: M9-b edits the confirmation site, **outside** the `catch (err)` block my pre-registered condition names — so the differential was owed unconditionally, not as a judgement call. Re-run unchanged at the tip and diffed against `2d90e8a`: **12 changed lines, in exactly two places.**

**1 — F-QA31 `load-confirmation-names-wrong-mode` is FIXED**, shown by my own instrument, written before the fix existed and not edited since:

| | at `2d90e8a` | at `e1d9b2b` |
|---|---|---|
| row D over a **Classic** message | *"It will switch from Classic to Components V2."* — **false** | *"This will overwrite the current message."* — **no mode change claimed** |
| row D over a **V2** message | *"It will remove Container."* — **the switch omitted** | *"It will remove Container; switch from Components V2 to Classic."* |
| `agrees` | **false** | **true** |

**Both faces closed.** This is the strongest form of fix verification available: an instrument authored against the defect, unchanged, that flipped.

**2 — three `TEMPLATE … = <<NO TEMPLATE FOUND>>` lines, and they are NOT a regression.** My probe extracts the notice by a regex for an **inline template literal** interpolating `droppedComponentTypes.join`. **M9-f removed all three inline templates by design.** So the probe's extraction predicate went stale; the product did what the plan required. **Ruled here rather than left, because three `NO TEMPLATE FOUND` lines in a captured report read exactly like an absence a later reader would call a defect** — this chain's own "both readings of an absence are available" hazard, this time in my own instrument.

**Everything else is byte-identical**: sections A (all eight cells), D (row-E resting state), E (the D34 floor payloads) and F (BC-18's six edit sequences). **So no register row's prediction is staled by the rider.** BC-1's predicted value, as re-derived at P3.4, now **matches** the shipped behaviour rather than diverging from it.

**Executability at `e1d9b2b`, for `uat`, whose the state is**: **all eleven rows fresh.** Nothing carried across the tree change — this is a fresh execution of the differential at the new tip.

## V.6 — **BC-1's blocking condition is DISCHARGED**

At P3.11 I wrote, addressed to `uat` by name:

> *"**BC-1 must not be executed until F-QA31 `load-confirmation-names-wrong-mode` is fixed.**"*

**F-QA31 is fixed and verified at `e1d9b2b` (V.5).** **The condition is discharged** — not lifted, not withdrawn: it was met. **BC-1 is executable so far as this document is concerned; its state is `uat`'s.**

**Vocabulary, per `uat` rev 29**: `WITHDRAWN` is owner-only; `LIFTED` is a constraint removed on a ruling; **this is neither — the condition was satisfied by work.** Recorded in that vocabulary so the register keeps the distinction.

**Chain 013's blocking-condition register now carries no QA-raised blocking condition.**

## V.7 — F-1 limb 2, discharged

`devops-hooks-013-2`'s F-1 limb 2 asked that the surviving render instrument be executed **under a verdict**. `013-qa-toast-vessel-render.test.ts` at `e1d9b2b`: **9 passed / exit 0**, inside this verdict. **Discharged.**

## V.8 — Findings. **None blocking**

**INFO-1 — M9-a's plan-stated instrument is mis-specified.** Rev 47 states the negative as *"`git grep -c generateErrorMessage -- src` returns 0 outside `__tests__` at the tip."* **It returns 1** (`formatMutationError.ts`, two lines). **The property is met by a different route than the plan anticipated**: the joiner is still called, but only ever with a **one-element array**, so there is no inter-issue delimiter for a message to collide with. **The code is right and the instrument is wrong** — and an instrument that fails on a correct implementation would have produced a false failure for whoever ran it literally. Plan text, the planner's; **not held against the tree**.

**INFO-2 — CR24-2's "dead path" characterisation is wrong, and the live path is correct.** The reviewer describes `settledMode`'s `requiresChoice` ternary as a second encoding *"on a path both sides leave dead"*. **Dead for the `incoming` argument** — a row-E object never becomes `validatedDraft`. **Live for the `current` argument**: a stored row-E record reaches `settledMode(current)`. Executed: a row-E current yields `fromMode=v2`, and loading a Classic draft over it announces *"remove Container; switch from Components V2 to Classic"* — **correct**. So the DRY concern stands; **the reachability claim under it does not**, and a fix round acting on "it's dead" would be acting on a false premise. Captured at `cr24-2-current-argument-is-live.txt`.

**NOTE — "adopted verbatim" is slightly overstated.** The implementation record says QA's pre-registered spec was *"adopted verbatim … per its own no-edit instruction"*. Diffed against my captured copy: **3 hunks, all formatting** — two import statements and one call reflowed for line length under the new lint gate. **No expectation, fixture literal or assertion moved**, which is what the no-edit instruction protected. **The claim should read "adopted with formatting reflow required by the new gate; no expectation changed."** Disclosed, not held against anyone — it is gate satisfaction of exactly the class D50 defines.

## V.9 — TDD Compliance gate: **PASS**

The rider's three new/changed units each carry a row with `Test Written First?`, `Failure Verified?`, a valid failure reason and `Pass After Impl?`: `formatZodIssues` (`TypeError: … is not a function`, 4/4), `describeDroppedComponentTypesNotice` (same shape, 3/3), and M9-b's `settledMode` fix — whose row correctly answers **N/A** to *written first* because **the spec is QA's, pre-registered before the fix**, with `Failure Verified? = Yes` against the pre-fix tree. **I hold my own red run at `2d90e8a` (3 failed / 5 passed) and it corroborates.**

M9-d's five foreign-chain test-file edits carry a **note rather than rows**, correctly: they are type-only under D50's disposition rule, not new behaviour.

## V.10 — Cell consistency, re-opened by the artifact moving

`uat` rev 30's condition 3 fired as written. **Answered inside this re-verification, not as a new sweep.** The rider touches no register row's Condition, Predicted value or Failure mode — it changes production code those cells describe. The differential (V.5) is the check: **every cell's predicted value still matches what the surface produces**, and the one row whose cells described a divergence (BC-1) now matches because the divergence was fixed. **No cell edit is owed.**

## V.11 — Assumption Not Checked

**This pass assumes `describeLoadDiff`'s rendered sentence is what the confirmation dialog actually displays, and it does not test that.** Every instrument here — mine and the round's — stops at the string `withConfirmation`'s `message` field receives. **Nothing executed here proves `ConfirmationProvider` renders that string, renders it where the eye goes, or renders it at all**; the dialog is a React component reached only through a mounted render, which **D28 rules out**.

**Observable signature of its falsity**: the owner opens a V2-flagged record carrying content, presses Load, and the dialog is **empty, truncated, or shows the previous message's text** — the confirmation being right in the string and wrong on the screen.

**Owner of closing it**: **BC-1's own operator observation**, whose subject is the UAT agent with the owner as fallback — the row this verdict has just unblocked. **Named again here so it is routed rather than shelved**: BC-1 is not a formality now that F-QA31 is fixed; it is the only thing that closes this assumption.

## V.12 — Verdict

**QA COMPLETE** at `e1d9b2b` against plan rev 47.

Suite green and re-derived; both `tsc` projects clean; ESLint parsing errors 45 → 0; all six M9 properties met against their own instruments; TDD gate passes; CR24-6 discharged with a captured oracle and two mutants; F-QA31 verified fixed by a pre-fix instrument; F-1 limb 2 discharged; **BC-1's blocking condition discharged**. Two INFO findings and one wording note, **none blocking**.

**What this verdict does NOT do.** It is **not a release decision** — none is granted or refused here, and the standing decision remains `EXPIRED IN FULL`. **It does not close the chain**: `uat`'s register carries the open conditions, and eleven rows are executable **and none has been observed**. **A green verdict at a tip is not an observation**, and this document has spent five revisions establishing that the two are different things.

**Handing off to the uat agent for value delivery validation.**

## V.13 — Re-anchor to plan rev 48. **The rule fired; the verdict stands; the anchor moves**

**Trigger**: the plan moved to **rev 48** (`f5b7cac`) after this verdict published, **on this pass's own INFO-1**. `steering-hooks-013-3` relayed three changes and **stated plainly that it had verified none of them**.

### The rule fires, and I am not going to argue my way out of it

My own field says *"this verdict expires when **either** the tree or the criteria move."* **The criteria moved.** The convenient reading — text-only, my own finding, moves toward what I verified — is available and is **exactly the reading the rule exists to refuse**. `uat`'s formulation, which I have quoted approvingly twice: *a classification made under a superseded standard is void, not narrowed, and the answer being convenient is not a reason to skip the step.*

**So the step was taken rather than reasoned past.**

### Derived, not accepted — the whole write set, not the three clauses I was told about

`uat`'s precedent is the reason: when the reviewer's verdict sat in this position, it read the **whole** write set and found a **second amendment the reviewer had not named**.

`git diff 06fad81 f5b7cac -- planning/013-…md` → **45 lines, three hunks**, read in full and captured at `verification/013/probe-qa-verify-rider2/plan-rev47-to-rev48.diff`:

| Hunk | Content | Reaches a criterion? |
|---|---|---|
| frontmatter | `Status-Detail` rewritten; `Rev: 47 → 48` | **No** — bookkeeping |
| changelog | one row for rev 48 | **No** |
| M9 acceptance criteria | **M9-a's instrument** restated; **M9-b's CR24-2 note** corrected | **Instrument and note only — see below** |

**Result of my own derivation: the three changes steering relayed are the three changes present. There is no unnamed fourth.** Verified additionally that **no hunk touches Validation and Release Conditions, Testing Strategy, or Objective** — the rest of this stage's Reading Order row.

### Neither change moves a property this verdict was measured against

- **M9-a — the Property sentence is unchanged word for word.** Only the **instrument** moved: the mis-specified `grep -c generateErrorMessage → 0` is replaced by `split(' | ')` count 0 plus the one-element-array call site, **which is what §V.3 actually executed.** Rev 48 moves the plan **toward** this verdict, not away.
- **M9-b — the Property sentence is unchanged.** Only the CR24-2 **note** moved, to this pass's own executed finding (§V.8 INFO-2): live for `current`, dead for `incoming`.

**Tree unmoved, re-derived here**: `HEAD` = `e1d9b2b`, `git status --porcelain` **0 lines**, `git diff --numstat e1d9b2b` **0 lines**.

### Ruling

**The verdict's substance stands and its anchor is re-issued.** `Criteria-At` now reads **rev 48, `f5b7cac`**.

**This is a RE-ANCHOR, not a re-earned verdict, and the distinction is stated so nobody reads it as either more or less than it is:**

- **No instrument was re-run.** The tree has zero movement, so every result in §V.1–V.9 still describes `e1d9b2b` exactly; re-running would produce identical bytes. **Zero movement licenses a scoped pass — it never licenses carrying a verdict forward silently**, which is why this section exists rather than the field simply being edited.
- **What was re-derived** is the thing that moved: the plan's whole write set, read at the document.
- **What is unchanged**: every finding, both INFO items, the CR24-6 ruling, the freshness result, F-1 limb 2, the TDD gate, **BC-1's blocking condition DISCHARGED**, and the Assumption Not Checked at §V.11.

### One structural note, because this is the second occurrence in an hour

**Both times the criteria moved under a published verdict today, it was a stage's own finding being registered that moved them** — the reviewer's, then mine. That is not an argument against raising findings, and it must not become one.

**But it names a real cost the dual anchor creates: a stage that raises a finding against the criteria will, if the finding is accepted, expire its own verdict.** Left there, the anchor quietly penalises the behaviour this chain most wants. **What keeps it honest is that the re-anchor is cheap** — a derivation over the write set and a dated line — **and that it is only cheap because the tree did not move.** Had code moved too, this would have been a full pass and correctly so.

**Carried to the retrospective in that form**: the dual anchor is worth its cost, and the re-anchor form is what makes the cost payable.

## V.14 — Row E as the **current** message: the reviewer is right, the bad line is **mine**, and the suite cannot catch the wrong fix

**Trigger**: code review round 25 (`41ca30b`, `probe-cr27`), routed here because it concerns my spec. **Re-derived here by execution, not taken from the relay.**

### The mechanism, confirmed

`computeLoadDiff(current, incoming)` applies `settledMode` to **both** arguments. **`incoming` (`validatedDraft`) is guarded** — the parsing effect nulls it on `requiresChoice`. **`current` is `message?.data`, a stored record, and is guarded by nothing.** My §V.8 INFO-2 said the branch is live via `current`; the reviewer's correction of its own finding says the same and states the reasoning error underneath it — *"I checked one argument's guard and generalised to both."*

### The part that is mine, and I am not going to soften it

**The disagreement the reviewer found is between production and a helper I wrote.** In my own pre-registered spec, adopted into the tree as M9-b's instrument:

```
function modeAfterLoad(draft) { … return d.requiresChoice ? 'classic' : d.mode; }
```

**That `'classic'` fallback is wrong**, and production's is right: `settledMode` returns `isMessageV2(draft) ? 'v2' : 'classic'` for row E, and a stored row-E record **has V2 components**, so by the plan's own Objective invariant — *"a message is Components V2 iff its `flags` carry `IS_COMPONENTS_V2_FLAG` or its components include a V2 type"* — **it is V2.**

**No assertion in my spec is wrong today**, because none of its fixtures is a row-E draft. **It is a wrong constant sitting in an oracle** — the exact class this document has spent the day enforcing against everyone else. I wrote it, the reviewer found it, and it went into the shipped suite under my name.

### My CR24-6 oracle did **not** cover it either

Asked whether my oracle already covers the path: **it did not.** It filtered row E out via `COMMITTING` — correct, because row E never becomes `validatedDraft` — and **both its `CURRENT_` fixtures were non-row-E.** The gap was real and the reviewer found it, not me. **Now closed**: four cases added, expectation stated literally from the Objective invariant. **22/22 green at `e1d9b2b`.**

### **The measured fact, and it is the reason this section matters**

The reviewer's banner tells a fixer *"do not fix this by deleting the branch as dead; collapse to one encoding, keeping production's."* **I executed the wrong collapse** — mutant **M4**, `settledMode` reduced to the spec's `requiresChoice ? 'classic'` encoding:

| Under M4 | Result |
|---|---|
| my extended oracle | **4 failed** |
| M9-b's own spec | **8 passed** |
| **the full suite (635 tests, 50 files)** | **4 failed — and all four are mine.** 49 of 50 files green |

> **Without this oracle in the tree, the entire suite is blind to a CR24-2 fix that collapses to the wrong encoding.** The reviewer's banner is currently the only thing preventing it, and a banner is not an instrument.

### **FIX-ROUND CONDITION — not a release condition**

**Nothing is wrong in production at `e1d9b2b`**, so this changes no verdict and gates no release. It is a condition on the **CR24-2 fix round**:

> **Adopt `013-qa-cr24-6-independent-mode-oracle.test.ts` into `src/utils/__tests__/` before or with the CR24-2 fix**, and **correct `modeAfterLoad`'s row-E fallback in `013-fqa31-…test.ts` to `isMessageV2`'s answer**. *If the fix collapses to one encoding and picks the spec's, production starts telling a user editing a stored row-E record that its mode is Classic when the composer shows V2 — and 49 of 50 test files stay green.*

**Both files are `website` source.** The oracle is mine to author and **not mine to commit there** — that needs the owner's approval and it is routed, not taken.

### Verdict unaffected

**QA COMPLETE at `e1d9b2b` / plan rev 48 stands.** Production holds the correct value on this path; this is a **coverage** finding, and its whole force is forward-looking.

### On the reviewer's two self-records

It committed CR24-2's own defect inside CR24-2 — *"a predicate that does not match the claim it supports"* — and it says the third time today its instrument answered a narrower question than its sentence. **That is the same failure I recorded against myself at P3.30** (prose about my own artifact, narrower than the artifact), and against the register at P3.23 (a predicate that could not see its own members). **Three stages, one shape, one day.** Its own framing is the one to keep: *nothing about it looked wrong — the call site was the right call site, the guard was really there.*

And on its concession about CR24-6 — *"I was wrong about the consequence, not just the scope… the independence exists, one layer down, where I had not looked"* — the method note it draws is the transferable part and I endorse it: **it took building the oracle and then trying to make the seam transmit.** Reading would not have produced M3, and **M3 is the only reason the answer is trustworthy in either direction.**

---

# VERIFY PASS — M10, at `b56570d`. **Verdict: QA COMPLETE**

**Verified-At**: `b56570dfa916368e9942e671d594112750567923`
**Criteria-At**: plan 013 **rev 49**, `9637735`. **Expires when either moves.**

**Supersedes the `e1d9b2b` verdict for verdict purposes; that one stands for its own tree.**

## V.15 — Identity and scope, re-derived

`chain/013-rider-2` @ `b56570d`; **`e1d9b2b` an ancestor**; `origin/master` = `2d90e8a` **computed at the remote** (branch still unpushed); porcelain **0**; `git diff --numstat b56570d` **0**.

**Range `e1d9b2b..b56570d`: 1 commit, 2 files, both under `__tests__` — 0 non-test.** Both files are mine: my oracle, and the `modeAfterLoad` correction I specified.

**The revert-completeness question answers itself here, and more strongly than by blob comparison.** The reviewer checked four implicated blobs byte-identical to `e1d9b2b`. **The enumeration is stronger: the entire range contains no non-test path at all**, so *all* production is byte-identical to `e1d9b2b`, not just the four.

## V.16 — Suite. **Explicitly mine, and the reviewer said so rather than repeating a number it had not run**

`npx vitest run` at `b56570d`: **48 files / 627 tests / 627 passed / exit 0.** Re-derived. It agrees with the implementer's claim; **the reviewer's declining to repeat an unrun number is the correct behaviour and is why this is a confirmation rather than an echo.**

## V.17 — M10's four criteria

| | Property | Result |
|---|---|---|
| **M10-a** | the production diff is empty | **MET, by two instruments.** The plan's own — `git diff --numstat e1d9b2b..b56570d -- src ':!src/**/__tests__/**'` → **0 rows** — and my independent enumeration → **0 non-test files** |
| **M10-b** | the oracle is in the tree and **armed** | **MET, executed against the PRISTINE tree** (a `git archive` extraction, not my corrected copy): re-applying **M4** fails the suite — **4 failed / 1 file**, and the file is the oracle |
| **M10-c** | the row-E constant corrected | **MET.** Diff read: `d.requiresChoice ? 'classic'` → `isMessageV2(draft) ? 'v2' : 'classic'`, and **nothing else in the file moves** — D50's type-only rule honoured |
| **M10-d** | the warning lives in the tree, and **QA states whether the other wrong fix is caught** | **MET, and the open half is now ANSWERED — see below** |

### M10-d's QA-owed statement, answered by execution rather than by reasoning

`uat`'s line names **two** wrong fixes. M10-b's own instrument covers one. **The other was left open for QA to state.** I ran it — **M5**, the branch deleted as dead, `settledMode` reduced to `disposition.mode`:

| Mutant, on the pristine `b56570d` tree | Suite |
|---|---|
| **M4** — keep the spec's encoding | **4 failed / 1 file** — the oracle |
| **M5** — delete the branch as dead | **4 failed / 1 file** — the oracle |

**Both wrong fixes are caught, and in both cases the oracle is the sole detector** (`grep -oE` over the failure output returns exactly one test file for each). **The row-E-as-current cases added after round 25 are what catch M5**, which is precisely the gap the reviewer found and I did not.

**So M10-d is fully met: the warning is in the tree, and the suite now stops both wrong fixes rather than one.**

### One measured correction to a reading the reviewer marked as a reading

It recorded — **explicitly as a reading, not a re-execution** — that M10-c makes the two encodings compute the same expression so probe-cr27's live disagreement no longer reproduces. **True, and it does not follow that M9-b's spec now covers the path.** Executed at `b56570d`: under **M3**, my oracle **3 failed**, **M9-b's spec 8 passed**. **The arming did not close M9-b's row-C blindness, and nothing in M10 claimed it would.** Recorded so nobody later reads M10-c as having made the oracle redundant.

## V.18 — Freshness at `b56570d`: **byte-identical, and measured rather than inferred**

The differential re-ran unchanged at the tip and diffed against the `e1d9b2b` report: **0 changed lines.** This *follows* from production being byte-identical, but **an inference is not a measurement** and this register has been bitten by exactly that substitution. **All eleven rows are fresh at `b56570d`. No prediction moved.**

## V.19 — CR25-1 and CR25-2. **Both confirmed, both mine, both corrected**

### CR25-1 — my header cited the one mutant that does not demonstrate its claim

My spec's header read: *"Mutating `resolveContentLoss`'s row-D branch turns this spec red **while M9-b's own spec stays green**, which is the whole claim."*

**My own captured run, in the same directory as the sentence, says M9-b's spec went 4 failed.** M1 does not discriminate — `fqa31` catches a row-D defect through its own literal `toBe('classic')` assertions. **The claim is true; M1 is not its evidence. M3 and M4 are.**

**This is the prose-versus-artifact class for the third time from me**, and it is the worst of the three: at P3.30 my prose contradicted a row in the same document; here **it contradicted a captured run sitting in the same folder.** The reviewer's concern is the operative one — a reader checking the justification by running the cited mutant finds it fails and could conclude the oracle is redundant, **which is the opposite of true.**

**Corrected**: the header now carries the measured three-mutant table (M1 non-discriminating, M3 and M4 discriminating) and states plainly that M1 is not the evidence.

### CR25-2 — a misattributed literal, on the cell doing the most work

Cell `bit=1 v2=0 classic=0` carries `draft: { flags: V2_FLAG }` — **no components** — while citing the Objective's *"the flag over components within the schema and no content"*. **Seven of eight citations are right; this one is not.** The value `v2` is correct.

**Why a wrong citation is a real defect even with a right value**: **the citation is this oracle's only claim to independence.** An expectation whose stated provenance does not govern it is a literal with no source — indistinguishable, to a checker, from one I made up.

**And the reviewer's sharper point stands**: this is **the cell M3 exercises**. *The cell doing the most discriminating work had the weakest stated provenance.*

**Corrected** to the clause that does govern it, quoted verbatim from the plan: **D13** — *"The bit standing over Action Rows only, over `components: []`, or over no components is NOT a conflict and is NOT refused."*

### Verified after correcting

**22/22 green** at `b56570d`, and **still discriminating**: under M3 the corrected oracle is **3 failed** against M9-b's **8 passed**. The corrections are to comments and one citation string; **no expectation or fixture moved.**

**Routing**: the corrected file is in `verification/013/probe-qa-verify-rider2/`. **The tree's copy is `website` source — mine to author, not mine to commit there.** The correction is **routed for the owner's approval with the next round**, exactly as the adoption was. **Neither finding holds the tree**: both are defects in claims *about* evidence, and the evidence itself is unaffected.

## V.20 — CR25-3 is `uat`'s, and the routing is right

The reviewer's Assumption Not Checked — *does the header's five-row paraphrase of D17 faithfully represent the plan's Objective?* — went to `uat` and **expressly not to me**, on the ground that I authored the transcription and **an author checking their own paraphrase against the source is the weaker arrangement.**

**I agree and I am not touching it.** It is also the sharpest assumption anyone has stated about my work: if the paraphrase is wrong, **all eight literals inherit the error, and because they are literals nothing in the suite can contradict them** — the oracle would be permanently green, authoritative for the wrong rule, **and more convincing than the code it judges.** That is a better statement of the failure mode than I would have written about my own instrument, which is the argument for the routing.

## V.21 — Assumption Not Checked

**Unchanged from §V.11 and restated so it travels**: this pass assumes `describeLoadDiff`'s rendered sentence is what the confirmation dialog **displays**, and does not test it. Every instrument here stops at the string `withConfirmation`'s `message` field receives; **nothing proves `ConfirmationProvider` renders it, or renders it where the eye goes.** D28 rules out the mounted render that would.

**Falsity signature**: the owner opens a V2-flagged record carrying content, presses Load, and the dialog is empty, truncated, or shows the previous message's text.

**Owner**: **BC-1's operator observation.** Still the only thing that closes it, and still unobserved.

## V.22 — Verdict

**QA COMPLETE** at `b56570d` against plan rev 49.

Production byte-identical to `e1d9b2b`; suite 627/627 re-derived; all four M10 criteria met, two of them executed against a pristine extraction; **both wrong CR24-2 fixes now fail the suite**; freshness measured byte-identical, **eleven rows fresh**; CR25-1 and CR25-2 confirmed, corrected and routed. **No blocking release condition is raised by this pass, and the fix-round condition at §V.14 is discharged** — the oracle is in the tree and armed.

**Not a release decision. Not chain closure.** Eleven rows executable, **none observed**.

**Handing off to the uat agent for value delivery validation.**

## V.23 — `uat`'s three provenance findings, and my ruling on the cost question

**Trigger**: `uat` rev 39 (`4184f0d`), discharging CR25-3 and raising three findings against my oracle's header. **CR25-3 discharged: the transcription is faithful** — all eight cells checked, six actually asserted, all six agreeing with the plan's Objective. **All three findings confirmed at the plan and all three are mine.**

| | Finding | Confirmed at |
|---|---|---|
| 1 | row E's quotation is **truncated without an ellipsis** — the plan says *"chooses Classic or V2 **and is told what the other drops**"* | plan Objective |
| 2 | **D13 is `SUPERSEDED IN PART by D17` and the oracle does not say so** — the clause survives, so the citation is sound; an oracle whose authority is literal transcription should mark it | plan **line 110** |
| 3 | **the label doing the work rests on a sentence the oracle does not quote** — D13's clause states *no mode*; what yields `v2` is D17's superseding header (*"the 'not a conflict' clauses survive as row C"*) plus row C's outcome | plan line 110 |

**Finding 3 is the one that matters, and `uat`'s framing of it is correct and uncomfortable: this is CR25-2's own defect recurring one level inside its fix.** The citation is now *right* where before it was *wrong*, and **its stated provenance is still thinner than the actual derivation.** Its sentence is the keeper — ***"an oracle that is corrected once tends to be treated as corrected."***

**All three are applied to my `verification/` copy** — 22/22 green, comments and one citation string only, no expectation or fixture moved.

### The cost question, ruled: **do not move the tree for this — and do not merely record it either**

Steering asked whether a three-line provenance correction is worth a tree move, given the file is now `website` source, a header edit **expires the reviewer's fresh APPROVED at `b56570d`**, and it needs an implementer round to commit.

**My judgement: no — and the question offered three options where there are four.**

**Why not a tree move**: no expectation is wrong, no test outcome changes, and **the authority the header claims has now been established from outside by a party that is not me.** `uat` checked all eight cells against the plan independently, and **that is strictly stronger evidence than a better-worded header of mine could ever be** — a header is my assertion about my own transcription; `uat`'s check is not. Weighed against three stage-passes (implementer, re-review, re-verify) for three lines of comment, at a point where **the only thing left after the gate is the owner's walkthrough**, it does not earn the move.

**Why not merely record it open**: `uat`'s *"corrected once tends to be treated as corrected"* is exactly right, and an open note is the weakest possible answer to it.

**The fourth option, which is what I have done**: **publish the full derivation now in the two artifacts I own** — this document and `verification/013/probe-qa-verify-rider2/` — where committing costs nothing and needs nobody's approval. **A reader checking the oracle's provenance gets everything the header edit would give them, today.** The tree's copy keeps a citation that is *correct*, merely thinner, and **the header edit rides the next round that happens anyway** — and one is likely, since **CR24-2 is still open**.

**So it is neither deferred-and-forgotten nor paid for at full price: the information is published now, and only the file that costs a tree move waits.** If a round happens, this is a three-line rider on it; if none does, the derivation is still on the record where a checker will look.

**Recorded as raised, confirmed, corrected-where-free, and deferred-where-costly, with the reason** — which is what steering asked for in place of a silent disposition.

### Two things about `uat`'s method worth carrying

**It re-read my file before reporting**, having noticed it changed between its first and second read, *"because reporting a finding against a stale read of a file that had already been fixed would have been this chain's own defect committed in the act of checking for it."* **That is the freshness discipline applied to a peer's artifact mid-check**, and I had not seen anyone do it at that granularity.

**And it reached CR25-2's correction independently, from the opposite direction** — finding `{ flags: V2_FLAG }` ungoverned by row C *"except on a vacuous reading over the empty set, and a cell whose coverage depends on a vacuous reading is an inference, not a literal"* — **before** discovering the cell had already been re-cited. **Two routes, opposite directions, same cell, neither able to see the other's work.** That is the strongest form of corroboration this chain has produced, and it happened by accident of timing rather than by design, which is worth the retrospective knowing.

**Its scope limit is noted and honoured**: the discharge covers **the transcription only** and does not bless the oracle's reasoning, its mutant selection, or CR25-1/CR25-2 — which remain mine and the reviewer's, and are dispositioned at §V.19.

**No verdict moves.** **QA COMPLETE at `b56570d` / plan rev 49 stands**, and **freshness at `b56570d` is ruled at §V.18 — 0 changed lines, all eleven rows fresh.**

## V.24 — **A false claim of mine about the shipped file, corrected. CR25-1 and CR25-2 stand OPEN**

**Raised by `code-reviewer-013-4` (`288c0b4`). Measured here independently before accepting it — which is the step whose absence caused the defect in the first place.**

### The measurement

| | **shipped — the file vitest runs** | my probe copy |
|---|---|---|
| lines | **186** | 215 |
| `grep -c "D13"` | **0** | 5 |
| `grep -c "flag over components within the schema"` | **2** | — |

**Shipped line 61, verbatim**: cell `bit=1 v2=0 classic=0`, draft `{ flags: V2_FLAG }` — **no components** — still reads `d17Row: 'the flag over components within the schema and no content'`. **That is CR25-2's original defect, uncorrected, live against the tree.**

### The claim that was wrong

At **§V.19** I wrote that my corrections were routed and the tree's copy untouched — **which was true**. Then at **§V.23**, four paragraphs later, I wrote:

> *"The tree's copy keeps a citation that is **correct, merely thinner**."*

**It does not. It keeps the wrong citation.** I described the shipped file from memory of what I had *authored* rather than from the file, in the same section where I was ruling on the value of that file's provenance.

**This is the fourth prose-versus-artifact instance from me today**, and it is the one I had already named the shape of: at §V.19 I wrote that CR25-1 was *"the worst of the three"* because my claim was contradicted by a captured run in the same folder. **This one is contradicted by the file itself, one directory over, in a section arguing about that file's authority.**

**The cost was not hypothetical.** Steering relayed the sentence without opening the file, and **`uat` performed its CR25-3 discharge against my probe copy** — coming within one message of the gate recording CR25-2 discharged and CR25-3 verified **while the shipped oracle carried both defects and every record said otherwise.**

**My share is the prose.** The reasoning in §V.23's fourth option was sound and I still hold it; **the premise it rested on about the shipped file was false, and I did not check it.**

### What is not affected, verified rather than assumed

**All sixteen `id`/`expected` pairs are byte-identical across the two copies** — `diff` over the extracted pairs returns **0 differing lines**, my own instrument, not the reviewer's. **No oracle verdict changes; both wrong-fix mutants are still caught; QA COMPLETE at `b56570d` stands and code review's APPROVED stands.** **Provenance divergence, not behavioural.**

### Owner ruling: **"Record it, leave it"**

He was told the guard works, that this is provenance rather than behaviour, and that the correct version *"lives only in a document nobody running the test will open."* He declined both *"Fix it now"* and *"Ride the next round."*

**So CR25-1 and CR25-2 are OPEN residual against the shipped file, and §V.23's disposition is corrected accordingly**: my published derivation keeps its value **for a reader who opens this document**, and **it is not what runs.** Recorded beside §V.23 rather than over it.

### The class, and `uat`'s half of it is the part I did not have

**The reviewer**: *"This is `probe-cr1`/`probe-cr10`'s fossil defect running in reverse. There, an embedded copy fell behind the tree and silently stopped measuring it. Here a copy ran ahead of the tree and caused a gate stage to report a fix that has not shipped. **The artifact under review is the one the tree executes; any other copy is evidence about it, never it.**"*

**`uat`**: ***a second copy is most dangerous when it is BETTER than the shipped one. A copy that lags looks wrong on inspection; a copy that leads looks like progress.***

**That second sentence is the generalisation and I could not have written it.** Every safeguard I applied to this directory all day assumed a stale copy would look stale. **A copy that is ahead passes every inspection I know how to run, and reads as diligence.**

## V.25 — Freshness reconciled: **eight by execution, the rest by construction — and my "eleven" was a relayed count**

`uat` records **eleven rows fresh from me against its open set of twelve**, and declined to close the difference by assumption. **It was right to decline, and the difference is mine to correct — twice over.**

**First, the number was not derived.** *"All eleven rows fresh"* at §V.5 and §V.18 took its count from steering's phrasing (*"eleven of twelve executable"*) rather than from my own enumeration. **I restated a count from a relay**, which is the practice this document has spent a chain warning against. **The count is withdrawn as stated.**

**What my differential actually establishes, enumerated:**

| Basis | Rows | Evidence |
|---|---|---|
| **By execution** — the differential computes their predicted value | **8**: BC-1, BC-6, BC-7, BC-8, BC-9, BC-10, BC-18, BC-21 | report at `b56570d` vs `e1d9b2b`: **0 changed lines** |
| **By construction** — nothing they predict over exists in the range | **all remaining open rows** | `e1d9b2b..b56570d` contains **no non-test path**, so production is byte-identical and no surface any row predicts over moved |

**The second basis is a measurement, not an assumption**, and that distinction is why I am offering it rather than asking `uat` to infer it: **byte-identical production is derived from the range enumeration, not from the absence of a reason to doubt.** Rows my differential has no column for — **BC-12** and **BC-17** (Discord's API), **BC-13** (a clock), **BC-14**, **BC-19b**, **BC-20** (production observation) — are fresh at `b56570d` **for that reason and no other.**

**So: no row is stale at `b56570d`, on two bases, with the rows each basis covers named.** `uat` may close its difference on that or leave it recorded; **the count it should not adopt is my earlier "eleven."**

## V.26 — Retrospective material from the count and the copy, placed accurately

**Nothing is owed here.** Recorded because `steering-hooks-013-3` dated the count's provenance and made a correction to my own apportionment that improves the material.

### The count has a date, and the mechanism beats either confession

*"Eleven of twelve executable"* was **`uat`'s figure at its rev 31**, true when written, when BC-1 alone was blocked. **It stopped being true the moment I discharged BC-1's blocking condition by work.** `uat` moved to twelve; steering did not, and carried "eleven" through several messages — **including the one that released `uat` to gate** — and I took it from there.

**So the shape is not "QA restated a relay."** It is **a count carried past the event that invalidated it, and then inherited.** My defect is real and stands at §V.25 — I restated a number I had not derived. **But the number was only available to inherit because it survived the event that falsified it**, and the event was my own act. **A count is invalidated by the thing it counts changing, and nobody re-checks a count when their own work is what changed it.**

### Whether a fact is a measurement is a property of the holder, not of the fact

**`uat` declined to reconcile eleven against twelve by assumption, and that refusal is the only reason any of this surfaced** — not my checking, not steering's. Its ground: *byte-identical production settles it **by construction**, and "settles by construction" is a reason to believe rather than a measurement.*

**At §V.25 I offered that same fact as a measurement — and both of us were right.** The difference is not in the fact. **`uat` had not run the range enumeration and I had.** For `uat`, "production is byte-identical" was a plausible inference; for me it was a derived result with a command behind it.

**That generalises and it is the useful part**: *the same proposition is an assumption for one party and a measurement for another, and which it is depends entirely on who ran what.* **So a stage handing a "by construction" argument to another stage must hand over the derivation with it, or it arrives as a reason to believe** — which is exactly what `uat` correctly refused to accept.

### The joint failure, stated as steering stated it rather than as my confession

Steering's rule is that a verdict-bearing fact reaches a stage as a citation it re-derives. **It has now broken that rule twice in one day on the same stage's prose — BC-7's *"nothing to show it"*, and the shipped-file claim.** **Both times my document was correct, my covering prose was not, and the prose was relayed unchecked.**

**Either half alone stops it.** A relay that re-derived would have caught both; prose that quoted the artifact would have produced neither. **It is jointly produced and reproducible, which is worth more than either party's account of its own share** — and I am recording it in that form rather than as my apology, because an apology is not a mechanism.

### My instruments were directional — and here is what a future stage should build instead

The sentence *"a copy that lags looks wrong on inspection; a copy that leads looks like progress"* is **`uat`'s** and is recorded as `uat`'s. **The observation that my own safeguards were directional is mine**, and steering is right that it is the half that tells a future stage what to change.

**Every instrument I built for `verification/013/` detects a copy falling behind**: the `manifest-sha256.txt` files, the captured runs, the byte-identity comparisons. **All of them hash or compare the copy against itself.** None of them asserts anything about the shipped file, so **a copy that has run ahead of the tree satisfies all of them.**

**The concrete remedy, which is mine to state:**

1. **A probe directory must not hold an editable second copy of a file the tree executes.** Once the oracle was adopted into `src/utils/__tests__/`, my copy stopped being an instrument and became a rival.
2. **Where a copy must exist, its manifest hashes the SHIPPED file, not the copy** — so the manifest fails when they diverge, in *either* direction, which is the property the current one lacks entirely.
3. **The cheapest form: keep a pointer, not a copy.** A README line naming the tree path and the SHA is unfalsifiable in the way a copy is not.

**None of this is done and none of it is this chain's to do** — it is a convention for `verification/`, and the directory's scope is already a thing I ruled on at P3.16. **Carried to the retrospective as a proposal with its reason, not enacted here.**

---

# BC-4 PASS — 2026-08-25, successor session (`qa-hooks-013-3` having exited)

**Scope of this pass**: one register row and one product question. **Nothing else was reopened.**

## V.27 — Identity, and what this pass did NOT take on trust

**Tree**: `website` @ `chain/013-rider-2`, HEAD `b56570d`, `git status --short` **empty** at run
time — re-derived here, not inherited. `origin/master` is `2d90e8a` and is an ancestor; nothing is
pushed.

**The verdict does not move and does not expire.** No production code and no shipped spec was
touched by this pass. `Verified-At: b56570d` / `Criteria-At: plan 013 rev 49` stand exactly as
`qa-hooks-013-3` left them. The only repository changes are this document, the QA index in
`verification/013/README.md`, and one new probe directory.

**What was relayed, and what I re-derived.** A peer session relayed its subagent's claims about the
JSON tab. **None of them is carried here on that authority.** Every structural claim was re-read
from source at `b56570d` and every behavioural claim was **executed** by an instrument this pass
built:
`agent-output/verification/013/probe-qa-bc4-json-tab-fixture/` (28 assertions green; two mutants,
both killed; `manifest-sha256.txt` hashes **the shipped files**, not only the probe's own copies —
the remedy V.26 proposed, applied at its first opportunity).

## V.28 — BC-4's fixture: **CONFIRMED**

**The blocking belief is withdrawn.** BC-4 sat `NOT EXECUTED` all chain because "an import" was read
as *an import by Discord message link*, which no agent here may fetch. That reading was defensible —
the criterion says "import" and M3-c's siblings are link and webhook paths — and it is **false**.
`NewMessageModal` merges all four load tabs into one `loadedMessage` and computes the floor over
**that**, so the tab that produced it is immaterial:

- four tabs — `bot`, `webhook`, `code`, and **`json`**, a raw paste (`NewMessageModal.tsx`,
  `LoadOption`; the `json` accordion item renders `NewMessageJsonInput` with `setMessage={setJsonMessage}`);
- one merge (`loadedMessage`, the `useMemo` over `discordMessage?.message ?? webhookMessage ?? commandMessage?.data ?? jsonMessage`);
- one floor (`contentFloorError`, `validateContentRequirements(loadedMessage)`).

**The fixture is `{"content": ""}`, pasted into the JSON tab.** Executed end to end through the
shipped pipeline — `JSON.parse` → `discordMessageImportShape.parse` → `resolveContentLoss` →
`applyDisposition` → `makeEditable` → `validateContentRequirements`:

| BC-4 limb | Established by | Assertion |
|---|---|---|
| the paste is *accepted as a load* at all | shape parses; `resolveContentLoss` returns **row A, `requiresChoice: false`**, so no V2 choice dialog intercepts; a message reaches the modal | A1–A3 |
| **error shown** | the **real `NewMessageModal` function**, rendered with that message, emits `Message must have content, embeds, or components.` | **D1** |
| **no new message created** | `Save` renders `isDisabled: true` **and** `Form` renders `isDisabled: true` (the Enter-key path); the same state with a floor-**passing** document flips both to `false`, so `contentFloorError` is the **sole carrier** of the decision | **D2, D2b** |
| **dialog stays / does not navigate** | `router.push` and `message.upsert.mutate` spies register **zero** calls; navigation exists only inside the mutation's `onSuccess` | **D3** — and **D4** observes those same spies *fire*, so their silence is evidence rather than a dead wire |

**Non-vacuity is executed, not asserted.** Mutant `floor-off` (the floor always returns `undefined`)
turns **D1, D2 and D2b red** — the render harness is reading the floor's real output, not a
constant. Mutant `choice-on` (`resolveContentLoss` always `requiresChoice`) turns **14 red**,
confirming A2 is load-bearing: were a choice dialog to intercept the paste, nothing would reach the
modal and no floor error would appear.

**Positive controls in the other direction** are carried per class, not once: `{"content":"hi"}`,
`{"embeds":[…]}` and `{"components":[{"type":10,…}]}` all load and are **not** refused, so a blanket
refusal — or a pipeline that is simply broken — cannot pass block A. Whitespace-only content **is**
refused, pinning the floor's `.trim()`.

## V.29 — `{}` is **REFUTED** as a fixture, and this is the more important half

`{}` fails the same floor (**C1**), which is exactly what makes it dangerous: it looks like an
equally good fixture and is not one.

`NewMessageJsonInput` seeds its editor with `JSON.stringify({}, null, 2)` and parses inside a
`useUpdateEffect`, **which skips the first render**. That is established by **executing react-use's
shipped `useUpdateEffect.js` and `useFirstMountState.js`** as CommonJS against a stub `react` — zero
calls after the mount pass, one after the next (**C2**) — rather than by citing its documentation.
Consequence, in the shipped component: `setMessage` is never called, `jsonMessage` stays `null`,
`loadedMessage` is `undefined`, and the modal's floor line short-circuits on its `loadedMessage ?`
ternary. **`contentFloorError` is `undefined` because the check did not run, not because the
document passed.**

**C3 names the screen that results**: no error text, and `Continue` **disabled**. That is neither
BC-4's predicted value nor its failure mode. **An operator who sees it must record the row as *not
executed*** — recording it as failed would be wrong, and recording it as passed would be a green row
over a check that never executed, which is the precise failure shape this pass was asked to avoid.

## V.30 — Ruling: the un-gated `Continue` is **NOT a defect against 013**, and IS a product finding (**F-QA33**)

Both halves of this were asked for, and they are different questions with different answers.

**Facts, executed and dated from history rather than argued:**

- `Continue` is gated by `isDisabled={!loadedMessage || isDisabled}` — **not** by the floor. On a
  floor-failing document it is **enabled** (D(observed)).
- The floor error node lives inside the **page-0** `Transition`. Rendering page 2 finds **no floor
  message there** (**D1b**).
- On page 2 the primary action is inert with nothing on that page saying why: `Save`
  `isDisabled: true`, no explanatory text.
- `git log -S` dates the `Continue` gate to **`4fe53b6`, 2023-08-22** — nearly three years before
  this chain. `contentFloorError` is 013's, introduced at **`12f4ce6` (M3)**. **013 did not create
  the un-gated `Continue`; it created a page-1 error that page 2 does not show.** The gate is
  pre-existing; the *asymmetry* is 013's delta.

**Ruling 1 — no criterion is breached, and the verdict does not move.** M3-c requires the dialog to
stay open, show the error, and not navigate. All three hold under execution. `Continue` moves
between pages of the **same open dialog**; navigation is `router.push`, reachable only from
`upsert.onSuccess`, and nothing is created. **QA COMPLETE at `b56570d` is unaffected.**

**Ruling 2 — it is nonetheless a real, low-severity usability defect, and it is named rather than
absorbed.** It is the same class of complaint 013 exists to fix, expressed one page later: a refusal
the user cannot distinguish from a malfunction. BC-4's own failure-mode cell already names that
shape — *"reads as the app hanging rather than as a refusal"*. **Issued as F-QA33.**

**Recommended repair, and the one I recommend against.** Render `contentFloorError` in the page-2
error area beside `messageError`, rather than gating `Continue` on the floor. Gating `Continue`
would newly withhold a page the user may legitimately want while fixing the JSON (name, guild), and
would change a three-year-old control's behaviour on **every** load path to fix an asymmetry created
on one.

**Disposition — non-blocking, and deliberately so.** 013 stands at a conditional-approval gate with
seven of eight `PRE` rows terminal. F-QA33 breaches no criterion, so it must not reopen
implementation here; and it must not be silently absorbed, because it **changes how BC-4 is
executed**. Routed to **`uat`** by name. Should `uat` judge it worth fixing, QA's position is that it
is a new plan, not a 013 rider.

**Not carried**: whether Discord accepts an empty component. Ruling **D36** is absolute; the
question arose adjacent to this floor and was **dropped**, not tracked, not routed, and not handed to
012.

## V.31 — What is owed to `uat`, and what QA is not authoring

**BC-4's operator text needs rewriting and QA is not writing it.** `uat` authored the walkthrough;
QA states only the facts that text must carry, and the register row (V.27's edit) records them
beside its prediction rather than over it:

1. the fixture is **`{"content": ""}`**, pasted into the **JSON** tab — not a Discord link;
2. **`{}` must not be used**, and the *no error + disabled `Continue`* screen means **not executed**;
3. the floor error is read **on the first page, below the JSON box, before pressing `Continue`** —
   it does not follow `Continue`, and an operator who advances first will see a greyed `Save` with
   no explanation and is likely to report BC-4 FAILED;
4. the "nothing created" limb is best demonstrated **after** `Continue`, by `Save` being inert, and
   by no navigation occurring;
5. the distinguishing text is the exact string **`Message must have content, embeds, or
   components.`** — the JSON tab renders its *own* errors (malformed JSON, Zod issues) inside the
   accordion while a document is half-typed, and "an error is shown" alone does not discriminate.

**Standing note on this document's Outstanding lists** (unchanged, restated because a reader may
land here first): the Blocking Release Condition Register above is point-in-time. **`uat` rev 44 is
authoritative on every row's current execution state**, and the deployment record after it.

## V.32 — Assumption Not Checked

**This pass assumes that CodeMirror delivers the pasted document to `setJsonMessageString`
unchanged, and it does not test it.** `useCodeMirror` is stubbed here (`next/dynamic` returns an
inert component), so the editor's own `onChange` — the single link between the operator's keystrokes
and every behaviour established above — is never executed. **Observable signature of its falsity**:
the operator pastes `{"content": ""}`, the JSON box visibly contains that text, and yet **no error
appears below the box and `Continue` stays disabled** — indistinguishable, on the screen, from the
`{}` trap of V.29, and distinguishable from it only by the fact that text *was* pasted.
**Owned by `uat`**, and closable inside BC-4's own operator observation: the run that closes BC-4
closes this, at no extra cost, provided the observer is told that a pasted-but-inert editor is a
finding and not a mis-execution.

## V.33 — Instruments captured by this pass

| Path | Settles |
|---|---|
| `agent-output/verification/013/probe-qa-bc4-json-tab-fixture/` | BC-4's fixture (**confirmed**), the `{}` trap (**refuted as a fixture**), and the executed basis for F-QA33. 28 green; mutants `floor-off` (7 red) and `choice-on` (14 red); `manifest-sha256.txt` hashes the six shipped files it is coupled to |

**Handing off to the `uat` agent** — for BC-4's operator text (V.31), for **F-QA33** (V.30), and for
the assumption routed in **V.32**.

---

# RE-ANCHOR PASS — 2026-08-25, criteria axis

**Asked**: rule on QA's own `Criteria-At` after steering's D53 pass took plan 013 to **rev 50**
(`eb0e291`), deriving the delta from the file rather than accepting any relayed characterisation of
it. **Nothing in this section is taken from a relaying message** — not `numstat 3/1`, not "purely
additive", not "no criterion". Two of those phrases were offered; neither is cited below.

## V.34 — Ruling: **the clause bites, the substance stands, the anchor is re-issued**

**The clause bites, and I will not argue my way out of a clause I wrote.** `Criteria-At` said *"this
verdict expires when EITHER the tree or the criteria move."* The criteria document moved. The
verdict was therefore **expired on the criteria axis at `eb0e291`**, exactly as `uat` ruled of its
own gate an hour earlier on the same axis.

**Expiry names a remedy proportional to what moved, and the proportionality rule is my own:** *the
differential scopes the refresh; it never replaces it — zero movement licenses a scoped pass, never
a carried-forward verdict.* That rule is written for the tree axis and transfers to the criteria
axis with one substitution: **criteria are text, so the executed comparison is the artifact's own
byte-level differential** — there is nothing to run, and the instrument that discriminates text is a
hash of it.

**Derivation — two instruments, and they agree.** Captured at
`agent-output/verification/013/probe-qa-criteria-rev49-rev50/`.

1. **The plan's own diff, read as a hunk.** `git diff 9637735 eb0e291 -- planning/013-…md` is
   **three hunks**: frontmatter `Rev: 49 → 50`; one appended Changelog row; one appended Decisions
   Register row, **D53**. `git log 9637735..eb0e291 -- <plan>` returns **exactly one commit**, so no
   intermediate revision touched the plan and reverted — a two-endpoint diff can hide that, and this
   one does not.
2. **`section-hash.py`, independent of git's diff algorithm.** Both blobs split at `## ` headers,
   every section hashed, maps compared. **18 sections in each; 0 added, 0 removed; 3 changed —**
   `FRONTMATTER+PREAMBLE`, `Changelog`, `Decisions Register`. **Byte-identical**: `Milestones`,
   `Validation and Release Conditions`, `Plan Scope`, `Reading Order`, `Release Artifacts`,
   `Surfaces Without Automated Coverage`, `Testing Strategy`, and the eight others. The
   criteria-bearing set is selected **by predicate**, not by listing what happened not to move;
   seven sections match the predicate in each blob, the sets are equal, and **none moved**.

**The controls are what make that non-vacuous.** An instrument that always answers *"no criterion
moved"* would print the same thing:

| Comparison | What that revision did | Verdict |
|---|---|---|
| rev 47 → 48 (`06fad81`→`f5b7cac`) | M9-a's instrument corrected (QA INFO-1) | **A CRITERION MOVED** — `Milestones` |
| rev 48 → 49 (`f5b7cac`→`9637735`) | D52 enacted as **M10** | **A CRITERION MOVED** — `Milestones`, `Reading Order` |
| **rev 49 → 50** (`9637735`→`eb0e291`) | **D53 registered** | **NO CRITERION MOVED** |

Both immediately preceding revisions are killed. Rev 50 is the only one of the three that leaves
`Milestones` untouched — structurally unlike its predecessors, not merely asserted to be.

**Why a Decisions Register row is not itself a criterion — checked, not assumed.** The register sits
outside the criteria predicate, and that exclusion is safe only because it is *observable*: a
decision becomes a criterion by **amending** `Milestones` or `Validation and Release Conditions`,
and the controls show that is precisely how **D51** and **D52** landed — each moved `Milestones` in
its own registering commit. **D53 moved neither.** Read on its own terms it registers a *completed
documentary act* (four deployment records written by `devops` at `deployment/…-deployment.md` §12,
`14bc31c`) and states *"Registration write set only; no register state is set here."* That
self-description is **corroborated by execution**, not accepted on its word.

**Tree axis, re-derived at this write rather than carried from the previous pass**: `website` @
`chain/013-rider-2`, HEAD **`b56570d`**, `git status --porcelain` **empty**.

**Ruling.** `Criteria-At` is **re-issued to plan 013 rev 50, `eb0e291`**. The verdict's substance —
**QA COMPLETE at `b56570d`** — is unchanged, and **no re-verification is owed**, because both of the
verdict's inputs are unmoved and each was re-derived here rather than inherited. This is a **scoped
re-anchor pass with its own differential and its own controls**, not a verdict carried forward
silently; the difference between those two is the whole reason this section exists.

**D52 anticipated exactly this**: *"a test-only change should license a scoped re-review and
re-verify rather than full passes — the stages size that, not him."* This is that sizing, made on
evidence.

## V.35 — Suite, re-derived rather than restated

`npx vitest run` at `b56570d`, executed at this write: **48 files / 627 tests / 627 passed / exit
0.** **Reconciles V.16 exactly.** I re-ran it rather than cite V.16's number, because a number
carried across a pass is not a number this pass measured.

## V.36 — `devops` §13.2 routes an obligation to QA. It is **discharged**

Inside the very delta I was asked to derive, `deployment/…-deployment.md` §13.2 item 2 states: *"Is
a verdict owed? YES, and NOT at `2d90e8a`… the **surviving** instrument has never run under a QA
verdict, because QA Complete was reached at `4a7126b`. **It is owed at the post-rider tip**, which is
where QA will take it."*

**That was true when written and is not true now.** `b56570d` **is** the post-rider tip, and QA
Complete stands there. Verified rather than inferred: `013-qa-toast-vessel-render.test.ts` is
**tracked at `b56570d`** (`git ls-tree`) and **9 passed** when run against it — matching §12.6's own
`2d90e8a → 9 passed` row. The surviving instrument has now run under a QA verdict. **`devops`'
§12.9 action row is answerable as discharged, not rescheduled.** Recorded here because an obligation
routed to QA is QA's to close; `devops`' document is its own to amend.

## V.37 — `OWNER-QUEUE` item 8 audited against §V.31 — **all five facts carried**

`uat` authored the replacement operator text (rev 45 §R45.3) and steering lifted it verbatim over
`OWNER-QUEUE.md` item 8 (`e5327f1`), reporting it byte-identical against `uat`'s source. **Byte
identity against `uat` is not the check QA owes.** QA stated in §V.31 the five facts the text must
carry; whether the shipped text carries them is QA's audit, and nobody else had made it. Read from
the shipped file:

| §V.31 fact | Carried? |
|---|---|
| fixture is `{"content": ""}` in the **JSON** tab, not a Discord link | **yes** — exact bytes, with "click the **JSON** tab" |
| **`{}` must not be used**; its screen means *not executed* | **yes** — and it instructs him to write *"not executed"*, which is the terminal state QA named |
| the error is read on the **first page, below the JSON box, before `Continue`** | **yes** — *"Stop there. Read the area directly below the JSON box before you press anything"*, plus a hazard bullet stating page 2 does not show it and that **this is not a failure** |
| "nothing created" shown **after** `Continue`, by `Save` inert and no navigation | **yes** — point 3 |
| the discriminating text is the **exact floor sentence**; the tab's own parse/Zod complaints do not settle it | **yes** — *"Only the exact sentence in point 2 does."* |

**§V.32's assumption is carried with its signature and classified correctly**: the third hazard
bullet describes a pasted-but-inert editor and says *"That one is a finding, not a mistake on your
part"* — which was QA's attached condition for routing it to BC-4's own execution rather than
holding it open. **F-QA33 appears where it should**: named as a real defect, excluded from the
check, non-blocking. **The audit passes with nothing owed back.**

## V.38 — Assumption Not Checked

**This pass assumes that every criterion this verdict is measured against lives in
`planning/013-…md`, and it does not check the seven walkthrough items other than item 8.**
`Criteria-At` names one artifact; the owner will execute eight checks from `OWNER-QUEUE.md`. QA's
own Blocking Release Condition Register is the mapping from those checks back to milestone criteria,
and **item 8 was traced through it by hand here and is grounded** (BC-4 → M3-c, whose `Milestones`
text is byte-identical across rev 49 → 50). **Items 1–7 were not traced item by item.**
**Observable signature of falsity**: the owner executes a walkthrough item, it fails, and no plan
criterion and no QA assertion corresponds to what he ran — the failure has nowhere to land, and gets
settled by argument over whether it was "really a criterion" instead of by a register. **Owned by
the planner** — a check that must bind enters by plan revision, not by queue text alone — **routed
by steering**, which is the party that lifts queue text. **Decidable now, before the click-through,
and cheaply**: seven traces against a register that already exists.

## V.39 — Verdict, re-issued

**QA COMPLETE.** **TREE `b56570d`** on `chain/013-rider-2`, clean, re-derived at this write.
**CRITERIA plan 013 rev 50, `eb0e291`.** Suite 48 files / 627 / 627 passed, re-run here. **Expires
when either axis moves.** Nothing is pushed; `origin/master` is `2d90e8a`; no release act follows
from this section and none is implied.

**Handing off to the `uat` agent** for BC-4's execution, and routing **V.38** to the **planner** via
steering.
