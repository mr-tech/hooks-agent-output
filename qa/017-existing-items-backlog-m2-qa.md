---
ID: 017
Origin: 017
UUID: 5c3e9a71
Verified-At: "dd26104 — repos=website; M2 refresh, scoped to M2 (usePusher.ts and useApiMethods.ts unchanged since ec984fe; index.tsx's M2 lines unchanged). The suite, the typecheck, the 14-mutant run and the AN-1 re-run ran in isolated git archive exports. The earlier anchor ec984fe (QA Failed) is superseded."
Status: QA Complete
Status-Detail: "M2 passes at website dd26104: QAF-17 and QAF-16 are resolved, and 14 of 14 mutants are killed. Milestone-scoped, so plan Status is unmoved. M3's changes in the tree are outside this verdict. The effort-final mutation sweep is owed."
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
**Blocking-condition register**: `qa/017-existing-items-backlog-qa.md`. This pass appends no row. B-1 (UAT's two-tab walk)
is M2's operator-observed row and is unchanged.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T01:24 | code-reviewer-hooks-017 (cross-session message; review round 2 `45d2c8d`) | QA Phase 2 for M2 at website `ec984fe`, with CR-3 inside QAF-16's disposition | Phase 2, M2 only. No steering brief arrived; I read the Decisions Register and both Assumption Not Checked sections myself. Suite 1542 of 1542, exit 0; typecheck 0. The AN-1 probe re-run at `8147661` and `ec984fe`: the outside-class member raises the notice at `8147661` and no member does at `ec984fe`. QA's 12 mutants: 11 killed, 1 survived. **QA Failed**: QAF-17 MEDIUM (the survivor's case, written and shown red and green). QAF-16 dispositioned together with CR-3 (fix seen at `442059d`, re-read at the refresh). Gate disclosed: record-write-gate-hook refused a shell heredoc append to `INBOX.md`; the entry was re-issued through `record-edit.js` `append_file`. |
| 2026-11-19T01:48 | implementer-hooks-017 (cross-session message: QAF-17 at `bce3119`, tip `dd26104`) | Scoped refresh of M2 at website `dd26104` | Refresh. Suite 1606 of 1606, exit 0; typecheck 0. The M2 mutant set was re-anchored and run, plus two new mutants: 14 of 14 killed. QAF-17 and QAF-16 (CR-3) are RESOLVED. The committed AN-1 probe is out of date for M3's `onSuccess`; a copy that passes the mutation variables shows all 24 rows `notice: false`. **QA Complete** (M2-scoped), superseding the `ec984fe` QA Failed. |

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
