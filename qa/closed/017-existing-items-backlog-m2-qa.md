---
ID: 017
Origin: 017
UUID: 5c3e9a71
Verified-At: "7293a35 — repos=website; refresh of M2 on QAF-27's test-only round (24e9be7..7293a35: one test file). The 24e9be7 pass (suites, sweeps, B-15 on dev servers of 60252be and 24e9be7) carries: no production line changed since."
Status: Committed
Status-Detail: "Committed at release identifier chain/017-existing-items-backlog (website 7293a35, generator 8512a1d) by devops Stage 1 at 2026-11-19T19:13Z; closed. Anchor fields above keep the values the document was written at. Post-deploy rows B-6 to B-11 ride handoff/017-existing-items-backlog-post-deploy-2026-11-19.md."
Phase: 2
---

# QA Report: Plan 017 — M2 (the saving tab recognises its own save)

**Plan Reference**: `agent-output/planning/017-existing-items-backlog.md`, revision 4. The diff from `a97628d` to HEAD adds
changelog rows only: no hunk lands in `### M2`, the Testing Strategy, Validation or Risks.
**Implementation Reference**: `implementation/017-existing-items-backlog-m2-implementation.md` (agent-output `057109c`;
`ef2adee` corrects one stamp), `Handoff-At: ec984fe`.
**Stage start**: code review round 2, APPROVED_WITH_COMMENTS, `Reviewed-At: ec984fe`
(`code-review/017-existing-items-backlog-code-review.md`, agent-output `45d2c8d`; plan row R-10 `3203afa`). Re-derived at
the record.
**Blocking-condition register**: `qa/017-existing-items-backlog-qa.md`. The first pass appended no row; the fix-round pass below executes and reconciles B-15 there. B-1 (UAT's two-tab walk)
is M2's operator-observed row and is unchanged.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T01:24 | code-reviewer-hooks-017 (cross-session message; review round 2 `45d2c8d`) | QA Phase 2 for M2 at website `ec984fe`, with CR-3 inside QAF-16's disposition | Phase 2, M2 only. No steering brief arrived; I read the Decisions Register and both Assumption Not Checked sections myself. Suite 1542 of 1542, exit 0; typecheck 0. The AN-1 probe re-run at `8147661` and `ec984fe`: the outside-class member raises the notice at `8147661` and no member does at `ec984fe`. QA's 12 mutants: 11 killed, 1 survived. **QA Failed**: QAF-17 MEDIUM (the survivor's case, written and shown red and green). QAF-16 dispositioned together with CR-3 (fix seen at `442059d`, re-read at the refresh). Gate disclosed: record-write-gate-hook refused a shell heredoc append to `INBOX.md`; the entry was re-issued through `record-edit.js` `append_file`. |
| 2026-11-19T01:48 | implementer-hooks-017 (cross-session message: QAF-17 at `bce3119`, tip `dd26104`) | Scoped refresh of M2 at website `dd26104` | Refresh. Suite 1606 of 1606, exit 0; typecheck 0. The M2 mutant set was re-anchored and run, plus two new mutants: 14 of 14 killed. QAF-17 and QAF-16 (CR-3) are RESOLVED. The committed AN-1 probe is out of date for M3's `onSuccess`; a copy that passes the mutation variables shows all 24 rows `notice: false`. **QA Complete** (M2-scoped), superseding the `ec984fe` QA Failed. |
| 2026-11-19T18:30 | code-reviewer-hooks-017 (Round 9 sub-entry `f5f3346` at `60252be`; Round 10 sub-entry `4e1b43b` at `24e9be7`); steering-roadmap-hooks (tip moved; M2 cap, 18:13Z) | QA Phase 2 for M2's fix rounds 3 to 6, with M7-b re-read | Phase 2, M2-scoped, range `4b8db9c..24e9be7`. Sweeps: 17 of 19 at `60252be` and 5 of 8 at `24e9be7`; survivors are the two loose compares (QAF-27 MEDIUM, severity floor) and `channel.unbind()` (equivalent, an unchanged line). B-15 walked on both trees: 2 open sockets unfixed, 1 open and 1 closed fixed. Suite 1851/1851 with exit 0 on a quiet re-run (the first run's one failure was a load timeout in M1's file); typecheck 0; M7-b 0 above base. **QA Failed** on QAF-27. |
| 2026-11-19T18:40 | code-reviewer-hooks-017 (Round 10 sub-entry continued, `e324582`, APPROVED at `7293a35`) | Refresh on QAF-27's fix | Refresh, test-only diff. 2 of 2 survivors killed, each by its own case; suite 1853/1853, exit 0; typecheck 0; M7-b 0 above base. QAF-27 RESOLVED. **QA Complete** at `7293a35`. |
| 2026-11-19T19:13 | devops-hooks-017 (Stage 1) | Document closed | Document closed. Status: Committed. Plan 017 is committed on chain/017-existing-items-backlog (website 7293a35, generator 8512a1d) at devops Stage 1; the release is Stage 2. |

## Criteria assessed (recorded before execution)

These are M2-a, M2-b, M2-c and the Window paragraph as revision 4 states them, plus the Phase 1 coverage obligations
(§ M2: three conjuncts, multiplicity). Class per criterion:

- **M2-a** lists 11 members, each in two orders, and is verified member by member. 10 have a case in the suite. The 11th,
  "not-valid (fails shape) / nothing changed", has none (CR-4). It is covered by this pass's AN-1 re-run, which drives the
  real `MessageProvider`: `notice: false` in both orders at `ec984fe` (`an1-rerun/rows-ec984fe.json`). Its record removal
  is asserted by the failed-save case.
- **M2-b**'s class is "every save from T followed by one or more edits before T receives that save's broadcast, in both
  orders". The suite covers:
  - one save;
  - a save whose server form differs (an unknown field);
  - two saves in flight;
  - two identical saves;
  - one failed of two identical saves.

  Not covered: **another tab's broadcast arriving inside T's window**. That is QAF-17.
- **M2-c** has six named members. All are present: component-only, field, name, with and without unsaved edits,
  another tab's save during T's in-flight save, and content T sent and has seen broadcast. Each conjunct carries the
  decision alone in one fixture, as Phase 1 asked:
  1. "raises no notice when another tab saves what this tab already shows", red under NM-5;
  2. the in-flight edit cases, red under `qa-own-clause-dropped`;
  3. "… sent earlier and has already seen broadcast", red under NM-4.

## Implementation Review (Post-Implementation)

### Code Changes Summary

`git diff 8147661 ec984fe`, production files:
- **`usePusher.ts`**, +23/−1: `hashOf`, `recordOwnSave` and `forgetOwnSave` added. The `message-update` handler now
  consumes a matching record before it compares with the current content.
- **`useApiMethods.ts`**, +6/−1: `persist` records the payload when it has an id.
- **`index.tsx`**, +6/−3: one `useRef<string[]>`, and the hook-level `onError` forgets the failed payload.

Tests:
- new `MessageProvider.own-save-notice.test.tsx`, 35 cases;
- `useApiMethods.json-editor-repair.test.ts` gains 2;
- `usePusher.update-prompt.test.tsx` passes the new parameter, with no change in its cases.

### TDD compliance gate

The table is present, and every behaviour row names its red:
- the pre-implementation red: 5 of 32 failed at the M1 tip, AssertionError;
- the named and `m2-*` mutants;
- the sweep survivor's closing case at `53c3c58`.

M2-a and M2-c are a pinned absence and a kept behaviour. They are green before and after by construction, and red only
under mutants, which the table says. The gate passes.

## Test Coverage Analysis

| Surface | Guard | Covering case(s) | Red in this run (`m2-run/`) |
|---|---|---|---|
| `recordOwnSave` per send | NM-2, NM-3 | two in flight (both orders); two identical; one failed of two; the id record case | KILLED (5 and 2 cases) |
| handler consumes the record | NM-4 | "… sent earlier and has already seen broadcast" | KILLED (1) |
| current-content clause | NM-5 | "… saves what this tab already shows" | KILLED (1) |
| record clause | `qa-own-clause-dropped` | every in-flight edit case | KILLED (8) |
| id guard in `persist` | `qa-id-guard-dropped` | "records nothing for a message that has no id yet" | KILLED (1) |
| `onError` forgets | `qa-failed-save-record-kept` | "… a later save of the content of a save that failed" | KILLED (1) |
| record in the server's form | `qa-record-not-normalized` | "… a field the server drops …" (both orders) | KILLED (2) |
| forget removes exactly one | `qa-forget-removes-two`, `qa-forget-clears-all` | "… identical save still in flight when one of two failed" | KILLED (1 each) |
| a non-matching broadcast suppresses nothing | `qa-coupling-any-record-suppresses` | "… another tab saves while this tab's own save is in flight" | KILLED (1) |
| **a non-matching broadcast consumes no record** | `qa-coupling-any-broadcast-consumes-a-record` | **none** | **SURVIVED** (QAF-17) |

**Mutant score.** 11 of 12 killed, count-checked against a passing control (59 tests). The set is every mutant in
`m2-mutants-qa.json` (blob `4748f2a`), with nothing excluded; stillborn, aborted and not-applied were all 0.

The 12 are:
- QA's NM-2 to NM-5;
- the implementer's five `m2-*` guards, rewritten as exact-once anchors;
- the sweep survivor's two forms;
- two coupling mutants, each of which gates one branch of the handler on the other's movement.

The run used `mutation-run.py` (blob `b26916e`), with a fresh export of `ec984fe` per mutant, `--dep node_modules`, the
suite `unshare -rn npx vitest run src/providers/MessageProvider/__tests__`, and each suite file committed at `ec984fe`
(`MessageProvider.own-save-notice.test.tsx` blob `0c959a4`). Two instruments now agree on the named mutants: the
implementer's `mutate.py` at `1c07354`, and this runner at `ec984fe`.

Not a register-guard sweep: M2 changes none of E-1 to E-9. The effort-final sweep stays owed.

### Audit of the touched surface against Test Conventions

The new file, `MessageProvider.own-save-notice.test.tsx`:
- **Basename**: positive form. Its module segment is the folder module `MessageProvider/index.tsx`.
- **Titles and comments**: no ID tokens. The code review recorded 0 hits over 283 added lines, and its predicate is the
  same one as `qa-m1/audit-predicates.sh`.
- **Mounting**: through the project harness (`mountInMessageProvider`, `createRoot`).
- **Pusher and confirmation substitutes**: they are the AN-1 probe's.
- **The expected broadcast hash** is the router's own input schema plus the production `hashMessage` over the captured
  input. That is the real reader, which the code review also recorded, so the expectation is independent of
  `normalizeForHash` (axiom E).
- **Time-based cells**: none. `grep -cE 'setTimeout|useFakeTimers|Date\.now|advanceTimers'` over the `ec984fe` blob
  gives 0.

## Test Execution Results

All runs below used exports `$SCRATCH/exp-ec984fe` and `$SCRATCH/exp-8147661`:
- built with `git archive`;
- `node_modules` linked to the shared install, held;
- no `.env*` file;
- the changed blobs checked against `git rev-parse` (`export-blob-check.txt`);
- Next's generated `next-env.d.ts` and `.next/types/` copied for the typecheck (hashes in `typecheck-generated-inputs.sha256`);
- every run with `unshare -rn`.

Captures are in `verification/017/qa-m2/`.

| Command | Result | Capture |
|---|---|---|
| `npx vitest run --reporter=json` | 1542 of 1542, 124 files, `success` true, **exit 0** | `vitest-ec984fe.{json,exit,stdout,stderr}` |
| `pnpm run typecheck` | **exit 0** | `typecheck-ec984fe.{out,exit}` |
| `suite-compare.mjs`, QA's M1 run against this run | 1505 → 1542. One tip-only path (the new file, 35 cases). `json-editor-repair` 7 → 9 (2 added, 0 removed). No other file changed, and nothing was removed. | `compare-qa8147661-vs-qaec984fe.out` |
| Implementer's capture `impl/m2/vitest-m2-ec984fe.json` against this run | identical by path membership and per-file multisets | `compare-impl-vs-qa-ec984fe.out` |
| AN-1 probe (`analysis/an1/own-save-broadcast.probe.tsx`, committed `probe-source.txt`), copied in as a test file and removed after | see below | `an1-rerun/rows-{8147661,ec984fe}.json`, `vitest-*.{out,exit}` |
| QAF-17's case (`survivor-close/MessageProvider.own-save-notice.with-qa-case.test.tsx`) in the `ec984fe` export | see below | `survivor-close/{green-ec984fe,red-mutant}.{json,out,exit}`, `restore-check.txt` |
| CR-3's control, reproduced | `rules-of-hooks` reported at line 48 only, as committed. With `useSaveWith` renamed `saveWith`: lines 48 and 160 (42 → 43) | `cr3/{as-is,renamed}.json` |

**AN-1 probe, row by row.** Each tree ran 25 of 25, exit 0, and wrote 24 rows:
- **At `8147661`**: `notice: true` for the outside-class member in both orders, and for no other row. This is M2-b's red,
  from an instrument the implementer did not write.
- **At `ec984fe`**: `notice: false` for all 24 rows, including the fails-shape member.
- **At `a74b9e2`**: not re-run. The probe imports `./helpers/mountMessageProvider`, which that tree does not have (`git
  ls-tree` printed nothing; the copy failed). M2-a's red is read from the analyst's committed `rows-a74b9e2.json`: the
  dialog members raise the notice there.

**QAF-17's case, green and red.** At the shipped code, 36 of 36 pass (exit 0). Under the surviving mutant, 35 of 36 pass
(exit 1): only the new case fails. `usePusher.ts` was then restored by hash (`sha256sum -c`: OK).

**Lint (M7-b partial).** The tip lint by stdin (`lint/summary.txt`) is **not** a measurement of `ec984fe`. The shared tree
was at `442059d`, whose `index.tsx` M3 has changed, and stdin of `ec984fe`'s `index.tsx` reads 8 typed findings against it.
That is QAF-15's artifact again (`verification/017/README.md`). The measurement of record for M2's files is the code
review's, made while the shared tree held `ec984fe` (`code-review/m2/convention-check-since-8147661.out`): 0 in each
production file and in the new test, and 42 = 42 rule by rule in `json-editor-repair`. I did not re-derive it; there is no
exact-tree lint instrument short of an export with its own install. M7-b's chain-tip run is owed.

## Findings

QAF-17 MEDIUM Phase 2 RESOLVED. QA's case landed verbatim at website `bce3119`. The mutant
`qa-coupling-any-broadcast-consumes-a-record` is KILLED at `dd26104`, by that case alone (`qa-m2-refresh/m2-run/`).

QAF-16 LOW Phase 2 RESOLVED (Preferred form) — Duplicates: CR-3 in code-review/017-existing-items-backlog-code-review.md
- The chain's two `persist` record cases now render `useApiMethods` inside `createRoot`/`act`, in
  `useApiMethods.own-save-record.test.tsx` (`442059d`). Its harness is `saveRecords` with an inner `Harness` component.
- No hook-named helper remains in `MessageProvider/__tests__/`: `git grep -nE "function use[A-Z]|const use[A-Z][A-Za-z]* = "
  dd26104` gives no line.
- CR-3's two falsity signatures hold at `dd26104`, both as AssertionError with no timeout:
  - `qa-id-guard-dropped`: "expected [ '-6d44f0da' ] to deeply equal []";
  - `qa-record-call-removed`: "expected [] to have a length of 1 but got +0".
- The pre-existing stub in `json-editor-repair` is the `INBOX.md` entry of this pass's first round.

CR-4: the disposition line is in the M2 implementation document (implementer, per its message). This pass's AN-1 re-runs
show `notice: false` for the member at both `ec984fe` and `dd26104`.

## Refresh at website `dd26104` (scoped to M2)

**Stage start**: code review round 2 sub-entry, APPROVED at `Reviewed-At: dd26104` (`code-review/017-existing-items-backlog-code-review.md`, agent-output `fb4c5f3`; plan row R-13 `d55890e`), re-derived at the record. It arrived while this pass was running, after the implementer's hand-off message. The reviewer re-attacked four mutants of its own, all killed, in `code-review/m2-fix/run/`. That is a third driver, and it agrees with this run on the coupling mutant and on CR-3's signatures.

The tree adds commits beyond `ec984fe`:
- `442059d`, `bce3119` and `dd26104` are test-only (`git show --stat`).
- `d9ebe97`, `79144cb` and `536b8e6` are M3. They change `MessageProvider/index.tsx` and are not yet code-reviewed; they
  are outside this verdict except where they touch M2's surface.

M2's production lines were checked:
- `git diff ec984fe dd26104` over `usePusher.ts` and `useApiMethods.ts` is empty.
- In `index.tsx`, no changed line touches `ownSaveRecordsRef`, `forgetOwnSave`, `usePusher(`, `onError` or `upsert`.
  That was a `grep` over the diff's +/− lines, which printed none.
- M3 did change `onSuccess`, which now reads the mutation variables. Because of that change and the line above, the
  whole M2 mutant set was re-run, not only the survivor.

The export `$SCRATCH/exp-dd26104` was built as before (generated type inputs hashed, no `.env*`, `unshare -rn`). Captures
are in `verification/017/qa-m2-refresh/`.

| Command | Result | Capture |
|---|---|---|
| `npx vitest run --reporter=json` | 1606 of 1606, 129 files, `success` true, **exit 0** | `vitest-dd26104.*` |
| `pnpm run typecheck` | **exit 0** | `typecheck-dd26104.*` |
| `suite-compare.mjs`, QA's `ec984fe` run against this run | 1542 → 1606. Five tip-only files (the M3 tests and `useApiMethods.own-save-record`). `own-save-notice` went 35 → 37, adding QAF-17's case and the implementer's case for a failure after broadcast. `json-editor-repair` went 9 → 7, the two cases moved to the real render. Nothing else was removed. | `compare-qaec984fe-vs-qadd26104.out` |
| M2 mutant set, re-anchored at `dd26104`, plus two new mutants (`mutation-run.py` blob `b26916e`, the `MessageProvider/__tests__` folder, control 86 tests) | see the score below | `m2-mutants-qa-dd26104.json`, `m2-run/mutation-table-…-20261119T014624Z-p435612.json` |
| AN-1 probe | The committed probe errors at `dd26104`: 22 of 25 fail with `TypeError: Cannot destructure property 'message' of 'undefined'` at `index.tsx` `onSuccess`. The probe calls `onSuccess(msg)` without the variables, which react-query always passes and which M3's `onSuccess` now reads. That is an instrument gap, not a product fault. A copy with that one change, `an1-rerun/own-save-broadcast.probe.variables.tsx`, passes 25 of 25 (exit 0), and all 24 rows show `notice: false`. | `an1-rerun/` (both runs) |

**Mutant score.** 14 of 14 KILLED, count-checked, over every mutant in `m2-mutants-qa-dd26104.json` (blob `f90f78d`); stillborn,
aborted and not-applied were all 0. The 14 are the 12 from the `ec984fe` pass plus two new ones:
- `qa-record-call-removed`, the `recordOwnSave` call deleted from `persist`;
- `qa-coupling-forget-consumes-any-record`, where `forgetOwnSave` splices index 0 when there is no match.

**Seen-red, for the new cases:**
- QAF-17's case is reddened by `qa-coupling-any-broadcast-consumes-a-record` (alone), `qa-coupling-any-record-suppresses`
  and `qa-record-call-removed`.
- The implementer's `dd26104` case is reddened by `qa-coupling-forget-consumes-any-record` (alone) and
  `qa-record-call-removed`.
- `own-save-record`'s id case is reddened by `qa-record-call-removed` and `nm2`; its no-id case by `qa-id-guard-dropped`.

The implementer's own capture (`impl/m2/bce3119-fix-mutants/`) agrees on the first survivor. These are two different
drivers, run by two different sessions.

**Lint for the new test file:** not measured here. It is M3's code review's, and M7-b's at the chain tip (QAF-15's
instrument note).

## Verdict

**PASS. M2 is `QA Complete` at website `dd26104`**, scoped to M2's surface:
- M2-a: 10 members by case and the 11th by the AN-1 re-run, both orders;
- M2-b: the class members, now including another tab's broadcast inside T's window, and a failure after broadcast;
- M2-c: every member, each conjunct carrying the decision alone;
- the Window paragraph: records are per send, removed once by an equal broadcast or by the mutation's error.

All 14 discriminating mutants are killed. The `ec984fe` verdict, QA Failed, is superseded by this pass, as dated in the
changelog.

M3's changes in this tree are judged by M3's code review and QA pass, not here. A later production change to
`usePusher.ts`, `useApiMethods.ts`, or `index.tsx`'s M2 lines expires this verdict. The effort-final sweep stays owed.

Rows inherited and not discharged: B-1 to B-11 (B-1 is M2's, UAT's). Code review round 2's Assumption Not Checked, on the
tRPC transport, is UAT's at B-1.

## Assumption Not Checked

This pass assumes that the `pusher-js` substitute, shared by the AN-1 probe and the new test file, binds one
`message-update` handler per mounted provider, as the real client does for one channel subscription. It does not test
this. If it is false, a real tab would hold two bound handlers after a re-subscribe. The first would consume the record
and the second would compare with no record, so the saving tab would warn about its own save after any id-preserving
re-subscribe. Signature: in B-1's walk, tab 1 shows "Message Update Detected" once per save even with no typing in flight.
Owner: UAT at B-1, which runs on the real Pusher client.

## Handoff

- **UAT**: M2 is ready for B-1 once the chain reaches UAT. Its brief comes from steering.
- **`implementer-hooks-017`**: nothing owed for M2.
- **Steering**: no owner-needing item.

## Phase 2 on M2's fix rounds 3 to 6 at website `24e9be7` (D-33, M2-d)

**Stage start**: code review Round 10 sub-entry, APPROVED, `Reviewed-At` website `24e9be7`
(`code-review/017-existing-items-backlog-code-review.md`, agent-output `4e1b43b`; plan row R-57 `ce22822`). I re-derived it
at the record. The earlier sub-entry at `60252be` (`f5f3346`, R-54) began this pass. Steering then reported the tip had
moved, so no verdict was written at `60252be`, and the work done there carries into this one. Steering's brief is this
session's 17:5xZ message. Since 18:13Z M2 is capped: a gap below HIGH goes to the Planner batch, and a severity-floor finding
keeps its round (`steering/017-rulings.md` block 2026-11-19T18:13Z, `54f62fe`).
**Plan**: revision 11 (agent-output `a971ed8`). Its delta over revision 10 changes only the wording of M2-d's walk step
and RK-3's record cell; it moves no criterion this pass verifies.
**Implementation**: M2 § Fix Rounds 3 to 6 (`implementation/017-existing-items-backlog-m2-implementation.md`, `b7d0a2a`).
`Handoff-At` is `24e9be7`.
**Range**: website `4b8db9c..24e9be7`. QA's last sweep was the effort-final one at `4b8db9c`, and fix round 3 never reached
QA. Production paths: `usePusher.ts` (the compare and the cleanup's `disconnect`) and `shared.ts` (the one trigger line).
**Register**: `qa/017-existing-items-backlog-qa.md`. B-15 is executed and reconciled there.

### Criteria assessed (recorded before execution)

- M2-c with revision 10's exact string equality. Its class is number-shaped hashes, in four sub-classes: digits only; a
  minus sign and digits; an exponent that stays finite; an exponent that overflows to ±Infinity (the Phase 1 re-key's
  predicate). Each sub-class is verified on the producer's wire, and the consumer is verified on exact strings, including a
  payload that is not a string.
- M2-d's three members (unmount; the id changes; the message stops being an `ApiMessage`), and its "touches no other
  instance". Each member is verified by case and by mutant.
- M2-d's human-observable form (B-15), on the unfixed and on the fixed tree.
- M2-a and M2-b: re-run through the suite only. Their guards are untouched since `dd26104`, apart from the compare
  (M2-c's).
- M7-b re-read at `24e9be7` (steering's brief).

### TDD compliance gate

Passed. The Fix Round 4, 5 and 6 tables give a row per case. Each guard was seen red, either in the red run against the
prior tree or under a named mutant (`trigger-raw`, `record-decoded`, `shown-decoded`, `nm39` to `nm45`). Code review
accepted Round 4's departure for the six colliding-pair cases (R-54). Round 5's "equivalent" disposition of `nm44` was
withdrawn in Round 6 and killed by a case.

### Test Execution Results

| Command (`git archive` exports, `unshare -rn`) | Result |
|---|---|
| Full suite at `60252be` | 1846 of 1846, 144 files, exit 0 (`verification/017/qa-m2-r4/full-suite.{json,exit}`) |
| `pnpm run typecheck` at `60252be` | exit 0, both programs (`typecheck.exit`) |
| Full suite at `24e9be7`, first run | 1850 of 1851, exit 1 (`m2d/full-suite-24e9be7.*`). The one failure is `messageValidity.predicate`'s "parity by construction imports the gate directly…", which reached the 5 s default timeout (5006 ms) at a load average of 23, while this pass's sweep and a walk ran beside it. Alone it passes 11 of 11, exit 0 (`m2d/rerun-messageValidity.*`). The file is M1's and outside this range. |
| Full suite at `24e9be7`, re-run at load 4 | **1851 of 1851, 144 files, exit 0** (`m2d/full-suite-24e9be7-quiet.*`) |
| `pnpm run typecheck` at `24e9be7` (the reviewer's routed assumption: `Harness`'s `source` prop) | **exit 0**, both programs (`m2d/typecheck-24e9be7.exit`) |
| M7-b at `24e9be7`: `eslint . -f json` in an export with its own offline install, then QA's `qa-m7/m7b-check.py` against `nofix-1ad625e-export.json` | 60 changed lintable files (M 25, A 31, R 4), **0** rule counts above `1ad625e`. `--plant`: 3 of 3 plants found (`m7b/`) |

### Mutation sweep: range `4b8db9c..24e9be7`, production paths `usePusher.ts` and `shared.ts`

Two runs of `mutation-run.py`, each a `general-purpose` helper over `git archive` exports. The full suite ran, with the
control passing on the same run.
- **At `60252be`** (`verification/017/qa-m2-r4/mutants.json`, kill table
  `sweep/mutation-table-60252be…-20261119T180324Z-p1417110.json`; control 1846, exit 0). `mutant-gen.js --range 4b8db9c..60252be`
  generated 8 operator mutants on `usePusher.ts`. QA added 11 of its own: NM-39, NM-40, a producer object, the event name,
  the channel, NM-41a and NM-41b, two loose compares and two coupling mutants. **17 of 19 killed**, every count checked.
- **At `24e9be7`**, for fix rounds 5 and 6, whose one production line has no operator mutant (`m2d/mutants-24e9be7.json`,
  kill table `m2d/sweep/mutation-table-24e9be7…-20261119T182312Z-p1678828.json`; control 1851, exit 0). The set was
  NM-42 to NM-45, the `channel.unbind()` drop, the class-gap mutant and the two loose compares. **5 of 8 killed**, every
  count checked.
  - NM-44 (disconnect the latest instance) is killed by "closes only the connection of the hook that unmounts when two
    hooks are mounted at once" alone.
  - NM-43 by 3 cases; NM-42 and NM-45 by 4 each.
  - The class-gap mutant (the producer encodes only hashes containing `e`) is killed by the digits-only and minus-digits
    members alone. At `60252be` it survived 122 of 122 (`class-gap-mutant.*`), and the extended wire probe showed exactly
    those two members red under it (`probe-all-class-gap.*`). `24e9be7`'s rewrite of the wire file added both members.

Survivors, each dispositioned:
- **Loose record compare (`record == hash`) and loose shown compare (`hash != shownHash`)**, in both runs. They are not
  equivalent. They differ from the shipped compares whenever the payload is not a string. AF-26 names a live member: during
  a deploy, a new tab can receive the old build's bare frame, which pusher-js decodes to a number, and `'51354e00' == 51354`
  is true. **QAF-27.**
- **`channel.unbind()` dropped.** Equivalent at `24e9be7`: the same cleanup disconnects the instance the binding lives on,
  so no event reaches a dropped binding. The line also predates the effort (`1ad625e`) and lies outside the sweep's
  production diff. No finding.

### B-15, QA's runs (`verification/017/qa-m2-r4/b15-unfixed/`, `b15-fixed/`)

Local stack from `tools/uat-local-stack.sh` (next id 900000000000001). Messages A = 900000000000001 and
B = 900000000000002 were seeded by SQL insert (`seed.sql`, `seed.out`), so no save ran and nothing was published to Pusher.
**Ids written: 900000000000001 and 900000000000002, none below 900000000000001.** Sign-in went through Discord's authorize
screen on the kept profile, and `/api/auth/session` returned `signedIn: true`. A `next dev` server ran from each tree's
export. The walks were driven by `browser-walker`, with the socket recorder `ws-recorder.js` injected before load. The
drivers are copied beside the evidence.
- **Route.** No link leads from A's editor straight to B (walk 1). The header has no search control, and `/message` lists
  only A (walk 2). The in-app route is: user menu → Servers (`/message`) → My Account (`/message/f/0`) → B. B-15 is
  re-specified to it in the register.
- **Readings** (`b15-reads.out`; `__qaDoc` stayed 1 at every hop, so the document was never replaced):

  | Read | Unfixed `60252be`: open / closed | Fixed `24e9be7`: open / closed |
  |---|---|---|
  | A's editor | 1 / 0 | 1 / 0 |
  | `/message` | 1 / 0 | 0 / 1 |
  | `/message/f/0` | 1 / 0 | 0 / 1 |
  | B's editor, +10 s | **2 / 0** | **1 / 1** |
  | B's editor, +30 s | 2 / 0 | 1 / 1 |

  The prediction holds on both trees, and one run separates them. This discharges the re-key's Assumption Not Checked: on
  the unfixed tree the first socket stays open across in-app moves. Revision 11's "two open: a code read, not observed" is
  now observed.
- **Torn down.** Both dev servers' process groups were killed: `:3000` has no listener, and `ps -g` shows nothing.
  `uat-local-stack.sh down` removed the container. The exports are deleted. The `browser-walker` closed each context and
  emptied the profile caches.
- **Seeding.** The first seed command was not completed; it was re-issued with the SQL in a file (`seed.sql`). *Reconcile 2026-11-19T18:58:* this bullet was reduced under the owner's standing rule on what this record names.

### Findings

QAF-27 MEDIUM Phase 2 (severity floor: a behaviour the change relies on, with no assertion that fails when it is lost)
- **What is missing.** Nothing asserts that a payload which is not a string raises the notice.
  - Fix Round 4 states the behaviour: "a non-string payload is 'equal to neither' and raises the notice, which is the
    criterion's wording".
  - AF-26's deploy-order argument relies on it: the exact compare "fails toward raising the notice … never toward
    suppressing another tab's".
  - Every consumer case hands the handler a string, so `==` and `!=` survive.
- **Consequence if it is lost.** A loose compare would make a tab on the new build treat an old-build frame `51354` as
  the record `'51354e00'` and suppress another tab's notice. That is CR-20's direction, for the length of a deploy.
- **Remedy, shown to work.** I appended two cases to `MessageProvider.own-save-notice.test.tsx` in an export of `33e59f7`;
  the file is unchanged at `24e9be7` apart from the mock's `disconnect`. The text is in
  `verification/017/qa-m2-r4/nonstring-payload-cases.txt`.
  - Case 1: a held record whose hash is digits only. After an edit, the payload is that hash as a number, and the notice is
    raised.
  - Case 2: the shown content's digits-only hash, delivered as a number, and the notice is raised.
  - Both pass at the tree (`nonstring-tip.*`). The loose record mutant fails case 1 alone, and the loose shown mutant fails
    case 2 alone (`nonstring-loose-{record,shown}.*`). The file was restored to blob `fc510f7` afterwards.
- **Owner.** `implementer-hooks-017`: a test-only round. Under the 18:13Z cap it keeps its round, as a severity-floor finding.

### Verdict

**QA Failed at website `24e9be7`**, M2-scoped, on QAF-27 alone. Everything else this pass assessed holds:
- M2-c's four sub-classes on the real wire;
- M2-d's three members and its no-other-instance property, by case and by mutant;
- B-15 on both trees;
- the suite (1851 of 1851, exit 0) and the typecheck (exit 0);
- M7-b (0 above the base).

The fix round is test-only. Its refresh re-runs the two loose-compare mutants it closes, the suite and the typecheck. It
re-reads M7-b at the new tip and re-issues the plan-level verdict there (R-47 is expired). B-15's readings carry over,
because no production line changes. A later production change to `usePusher.ts` or `shared.ts` expires this pass.

Rows inherited and not discharged: B-1 and B-12 (UAT's); B-15's execution by UAT.

### Assumption Not Checked (this pass)

This pass assumes something it does not test: that a production build (`next build`, then `next start`) opens and closes
the editor's Pusher sockets as the `next dev` builds here did. React's development-only behaviours, such as Strict Mode's
second effect run, could change the count in either direction, and B-15 ran on dev servers only.
- **Falsifier.** On a production build, B-15 reads differently on the fixed tree: more than one open socket at B, or A's
  socket still open on `/message`.
- **Owner.** UAT, which executes B-15. It runs it on a production build if its local build is one; otherwise it states the
  build kind. Named again in the hand-off.

### Handoff

- **`implementer-hooks-017`**: QAF-27, a test-only round. The two cases' text and both runs are under
  `verification/017/qa-m2-r4/`.
- **UAT**: B-15 is re-specified to the route above, with this pass's readings as the reference. It also carries the
  build-kind assumption.

## Refresh at website `7293a35` (QAF-27's test-only round)

**Stage start**: code review Round 10 sub-entry (continued), APPROVED at website `7293a35` (agent-output `e324582`; its plan
row is `489b4d8`). I re-derived it at the record. **Implementation**: M2 § Fix Round 7 (`57df990`), `Handoff-At: 7293a35`.
The diff `24e9be7..7293a35` changes one file, `MessageProvider.own-save-notice.test.tsx` (22 added lines, no production
path; `git diff --numstat`). So this refresh re-runs only the survivors the round closes, plus the suite, the typecheck
and M7-b.

| Command (export of `7293a35` with its own offline install, `unshare -rn`; `verification/017/qa-m2-r4/refresh-7293a35/`) | Result |
|---|---|
| `mutation-run.py`, the two loose compares (`mutants.json`; kill table `sweep/mutation-table-7293a35…-20261119T183750Z-p1880809.json`) | **2 of 2 killed**, count checked; control 1853, exit 0. `record == hash` is killed by "raises the notice when a payload that is not a string arrives while this tab holds a record of a save with the same digits" alone. `hash != shownHash` is killed by "… arrives with the digits of the shown content's hash" alone. |
| Full suite | **1853 of 1853, 144 files, exit 0** (`full-suite.{json,exit}`); 1851 + 2 |
| `pnpm run typecheck` | **exit 0**, both programs |
| M7-b: `eslint . -f json`, then `qa-m7/m7b-check.py` against `nofix-1ad625e-export.json` | 60 changed lintable files, **0** above the base; `--plant` 3 of 3 |

QAF-27 MEDIUM Phase 2 RESOLVED — two cases added at `7293a35`; each kills its loose-compare mutant alone (above).

**Verdict: QA Complete for M2 at website `7293a35`**, superseding the `24e9be7` QA Failed. The `24e9be7` pass's findings
on everything else carry, because no production line has changed since. B-15's readings carry for the same reason.
Code review's new routed assumption, that a bare number-shaped frame reaches the bind callback as a number in a browser, is
UAT's at B-1. Rows inherited and not discharged: B-1, B-12, B-15 (UAT's). This pass's Assumption Not Checked is the
`24e9be7` pass's (the build kind of B-15), unchanged.
