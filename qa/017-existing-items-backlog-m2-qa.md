---
ID: 017
Origin: 017
UUID: 5c3e9a71
Verified-At: "ec984fe — repos=website; M2 only. The suite, the typecheck, the mutant run and the AN-1 re-run all ran in isolated git archive exports. The chain branch is at 442059d (M3, plus the QAF-16 test move), which is outside this verdict."
Status: QA Failed
Status-Detail: "M2's behaviour holds at website ec984fe, but QAF-17 MEDIUM blocks: an M2-b interleaving has no assertion, so a coupling mutant survives. The fix is test-only and is the implementer's. A scoped refresh is owed at the commit that lands it, which also re-reads QAF-16 (442059d)."
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

QAF-17 MEDIUM Phase 2 — M2-b's class has no assertion for another tab's broadcast arriving inside T's window, so the
handler's guard that only a **matching** broadcast consumes a record is never seen failing.

The mutant `qa-coupling-any-broadcast-consumes-a-record` survives the whole `MessageProvider` folder at `ec984fe`. It
replaces `if (ownSaveIndex >= 0) ownSaveRecordsRef.current.splice(ownSaveIndex, 1);` with
`ownSaveRecordsRef.current.splice(Math.max(ownSaveIndex, 0), 1);`.

In operator terms: T saves; another tab's save reaches T first; T keeps typing; then T's own broadcast arrives and T warns
about its own save. That is item 3's symptom, back by a different interleaving. The case "raises the notice when another
tab saves while this tab's own save is in flight" stops after the other tab's broadcast and never delivers T's own.

This is a behaviour M2-b claims, with no assertion that fails when it is lost, so the severity floor makes it MEDIUM and
blocking.

**Remedy (test-only, spec-form):** tighten that case, or add beside it the case QA wrote and ran:
`survivor-close/MessageProvider.own-save-notice.with-qa-case.test.tsx`, the last `it`, "raises only the other tab's notice
when its save arrives between this tab's save and that save's broadcast, and an edit follows". It is green at `ec984fe` and
red under the mutant alone.

**Owner:** `implementer-hooks-017`.

QAF-16 LOW Phase 2 — disposition, with CR-3 folded in. Duplicates: CR-3 in code-review/017-existing-items-backlog-code-review.md

This chain's part is the two new `persist` record cases, run under the `useState` stub through `useSaveWith`. A hook-style
name hides them from `rules-of-hooks`, which I reproduced (above).

**Ruling: the Preferred form.** The cases run `useApiMethods` inside a real `createRoot`/`act` render. The Minimum form,
a bare rename that keeps the stub and raises M7-b to 43, is not taken.

Website `442059d` ("the own-save record's persist cases render the hook for real …", test files only: `json-editor-repair`
−25, new `useApiMethods.own-save-record.test.tsx` +42) appears to do this. It is outside this verdict and is read at the
refresh. The refresh checks two things:
- the falsity signatures CR-3 names: under `qa-id-guard-dropped` the no-id case fails by assertion, and with the
  `recordOwnSave` call removed the id case fails;
- no hook-named helper is left in either file.

The pre-existing part, `loadAndSaveViaShippedProvider` under the same stub (its `rules-of-hooks` finding at line 48 is
visible), predates this chain. It goes to `agent-output/INBOX.md` as a test-tree item, appended in this round.

CR-4 (the 11th M2-a member) agrees with this pass. The member is unobservable through a broadcast, and the AN-1 re-run
shows `notice: false` for it at hook level. The disposition line is the implementer's, as the code review routed it.

## Verdict

**QA FAILED for M2 at website `ec984fe`**, on QAF-17 alone. Everything M2 claims holds at `ec984fe`:
- the suite passes, exit 0;
- the AN-1 instrument shows M2-b fixed and M2-a's absence kept;
- 11 of 12 discriminating mutants were killed, including every named one.

But one member of M2-b's class carries no assertion.

**Path to a pass:** the implementer lands QAF-17's case, which is test-only. QA then runs a scoped refresh at that commit:
- the suite;
- the surviving mutant and `qa-coupling-any-record-suppresses`, its sibling;
- QAF-16's two signatures at `442059d` or later.

The refresh's tree will also carry M3's production change to `MessageProvider/index.tsx` (`git diff --stat ec984fe 442059d`:
+38/−21). So the refresh re-runs the whole M2 mutant set there, not only the survivor: a production change to M2's surface
expires this verdict.

Rows inherited and not discharged: B-1 to B-11 (B-1 is M2's, UAT's). Code review round 2's Assumption Not Checked, on the
tRPC transport, is UAT's at B-1, as routed.

## Assumption Not Checked

This pass assumes that the `pusher-js` substitute, shared by the AN-1 probe and the new test file, binds one
`message-update` handler per mounted provider, as the real client does for one channel subscription. It does not test
this. If it is false, a real tab would hold two bound handlers after a re-subscribe. The first would consume the record
and the second would compare with no record, so the saving tab would warn about its own save after any id-preserving
re-subscribe. Signature: in B-1's walk, tab 1 shows "Message Update Detected" once per save even with no typing in flight.
Owner: UAT at B-1, which runs on the real Pusher client.

## Handoff

- **`implementer-hooks-017`**: QAF-17 (test-only remedy, case supplied) and CR-4's disposition line. Then QA's scoped
  refresh at the landing commit.
- **`code-reviewer-hooks-017`**: QAF-16's disposition of CR-3.
- **`agent-output/INBOX.md`**: the pre-existing stub.
