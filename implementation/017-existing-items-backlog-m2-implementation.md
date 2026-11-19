---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Handoff-At: ec984fe — repos=website
---

# Implementation 017 — M2: the saving tab recognises its own save (item 3)

## Plan Reference

`agent-output/planning/017-existing-items-backlog.md`, revision 4, milestone M2 (M2-a, M2-b, M2-c). Website
chain branch `chain/017-existing-items-backlog`; M1 is `8147661` (`implementation/017-existing-items-backlog-m1-implementation.md`).

## Date

2026-11-19.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-19T00:41 | implementer-hooks-017 | M2 built at website `1c07354`, tightened at `736c7bf`. Checkpoint taken at that seam (context past 225K): the self-check sweep, convention-check and the hand-off to code review are owed (Resumption State). |
| 2026-11-19T01:15 | implementer-hooks-017 | Resumed. Self-check sweep run (one survivor, closed at `53c3c58`), lint introduced by M2 removed at `ec984fe`, convention-check and full suite re-run at `ec984fe`. Handed to code review at `ec984fe`; Resumption State removed. |

## Implementation Summary

The tab keeps one record per save it sends: `hashMessage(normalizeForHash(payload))`, the form the broadcast
compare already hashes. `persist` adds it, only for a payload that has an id; an equal broadcast removes one
occurrence; a save's `onError` removes one occurrence. The broadcast handler raises "Message Update
Detected" only when its hash matches neither a record nor the tab's current content. So an edit typed while
a save is in flight no longer makes the saving tab warn about its own save (M2-b, the one live path, AN-1),
the cross-tab notice is kept (M2-c, D-5), and the pinned absence holds (M2-a). Value Statement 2.
Rollback: `git -C website revert 736c7bf 1c07354`.

## Milestones Completed

M2-a, M2-b, M2-c built and green at `ec984fe`; self-check sweep and convention-check recorded below.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | `steering/017-rulings.md` block 2026-11-19T00:29Z; M2 follows M1 in the plan's order | not owed |
| QA Phase 1 covering M2 | `qa/017-existing-items-backlog-qa.md` at `3af80aa`, § M2 and NM-2 to NM-5 | not owed |
| Open questions | none open that M2 depends on | not owed |
| M2-c's three conjuncts each carry the decision alone in a fixture (QA) | (1) "raises no notice when another tab saves what this tab already shows"; (2) the in-flight edit cases; (3) "raises the notice when another tab saves content this tab sent earlier and has already seen broadcast" | those cases in `MessageProvider.own-save-notice.test.tsx` |
| Multiplicity (QA) | two saves in flight, edits after the second, both orders; two identical saves | same file |
| Walk of B-1 (two tabs, real Pusher) | UAT's, not this stage's | QA register B-1 |

## Files Modified

| Path | Changes |
|---|---|
| `src/providers/MessageProvider/usePusher.ts` | `recordOwnSave`, `forgetOwnSave` added beside `normalizeForHash`; the hook takes the records ref and consumes a matching record before it compares to the current content |
| `src/providers/MessageProvider/useApiMethods.ts` | `persist` records the payload when it has an id; takes the ref as its last parameter |
| `src/providers/MessageProvider/index.tsx` | one `useRef<string[]>` passed to both hooks the way `messageRef` is; the mutation's `onError` forgets the failed payload |
| `src/providers/MessageProvider/__tests__/usePusher.update-prompt.test.tsx`, `useApiMethods.json-editor-repair.test.ts` | callers pass the new ref; the second file gains two cases on `persist`'s record (id, no id) |

## Files Created

`src/providers/MessageProvider/__tests__/MessageProvider.own-save-notice.test.tsx` (34 cases), mounting the
real `MessageProvider` with Pusher replaced by a captured handler, the AN-1 probe's form.

## Patterns Extended

| Surface | Pattern |
|---|---|
| The ref and where it is created | `messageRef` (`useLatest`) is created in `MessageProvider` and passed to `useApiMethods` and `usePusher`; the records ref is passed the same way. |
| The hash form | `normalizeForHash` plus `hashMessage`, already the consumer's form (Runtime Flow 1b, `website.md` A-6). |
| The error removal | the hook-level `onError` of `api.message.upsert.useMutation`, not the per-call option: React Query fires per-call callbacks only for the latest `mutate`, which would miss an earlier in-flight save. |
| Tests | `usePusher.update-prompt.test.tsx` (tightened, not duplicated, for the new parameter); the AN-1 probe `verification/017/analysis/an1/own-save-broadcast.probe.tsx` as the pattern for the mount. |

User-visible surface: the existing "Message Update Detected" dialog stops appearing in one case (the saving
tab with an in-flight edit). No new view, input or trigger; plan D-5 and M2 state the behaviour. No flow
question is owed.

## TDD Compliance

No new function in a new module, so the compile-time reason does not apply. Red run before implementation
(`verification/017/impl/m2/red-pre-impl.json`, `.out`, run at the committed M1 tip with the new test file
only): 5 failed, 27 passed of 32. Verbatim first failure: `AssertionError: expected true to be false // Object.is equality`.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `usePusher` compare, M2-b "an edit typed after Save", both orders | `MessageProvider.own-save-notice.test.tsx` | Yes | Yes | AssertionError: notice shown (`true` against `false`) | Yes |
| `usePusher` compare, two saves in flight, both orders | same | Yes | Yes | AssertionError, same | Yes |
| `usePusher` compare, two identical saves (NM-3 shape) | same | Yes | Yes | AssertionError, same | Yes |
| `usePusher` compare, cross-tab members (M2-c) and M2-a absence members | same | Yes | Green before and after by construction (carried from the AN-1 pinned absence, green at `1ad625e`); red from mutants `nm4`, `nm5`, `m2-own-clause-dropped` | AssertionError | Yes |
| `recordOwnSave` / `persist` record, "records one hash for a message that has an id" | `useApiMethods.json-editor-repair.test.ts` | Yes | Yes, mutant `m2-id-guard-dropped` for the no-id case; the id case fails with the ref unused | AssertionError | Yes |
| `forgetOwnSave` via `onError`, "a later save of the content of a save that failed" | `MessageProvider.own-save-notice.test.tsx` | Yes | Yes, mutant `m2-failed-save-record-kept` | AssertionError | Yes |
| record hashed in the server's form, "a save that carries a field the server drops" | same | Yes (added at `736c7bf` after the mutant survived) | Yes, mutant `m2-record-not-normalized` | AssertionError | Yes |

Mutants (isolated export `$SCRATCH/exp-m2`, `git archive 1c07354`, network isolated, `verification/017/impl/mutate.py`;
captures `m2/1c07354-mutants/`, summary `m2/1c07354-mutants.summary`): `nm2-latest-send-only` killed (4 cases),
`nm3-set-not-per-send` killed (1), `nm4-record-kept-after-broadcast` killed (1), `nm5-current-clause-dropped`
killed (1), `m2-own-clause-dropped` killed (5), `m2-id-guard-dropped` killed (1), `m2-failed-save-record-kept`
killed (1), `m2-record-not-normalized` **survived at `1c07354`** (exit 0), closed by the case added at `736c7bf`
and then killed (2 cases; `1c07354-mutants-after-tighten/`). QA's NM-2 to NM-5 are the first four.

| `forgetOwnSave` removes one record, "a failed save with an identical save still in flight" | `MessageProvider.own-save-notice.test.tsx` | Yes (added at `53c3c58` after the self-check sweep's survivor) | Yes, mutant `usePusher.ts:39:num:2` (`splice(index, 2)`), survived `736c7bf`, killed `53c3c58` (`53c3c58-survivor/`) | AssertionError | Yes |

Self-check sweep (`mutant-gen.js --range 8147661..736c7bf`, 14 operator mutants over the added lines of `usePusher.ts`
and `useApiMethods.ts`; `mutation-run.py` exports of the committed SHA, network isolated, tests: the `MessageProvider`
test folder; `m2/736c7bf-mutants-gen.json`, `m2/736c7bf-sweep/`): 13 of 14 killed at `736c7bf`. Survivor
`usePusher.ts:39:num:2`: `forgetOwnSave` removing two records instead of one; no case had two identical saves with one failing.
Disposition: a spec-form case in the existing file (row above), then 14 of 14 killed at `ec984fe` (`m2/ec984fe-sweep/`).
The hand-made named mutants (NM-2 to NM-5 and the three `m2-*`) were not re-run at `ec984fe`: no production guard changed
after `1c07354` except an import's position (`ec984fe`); their last result is the one above.

## Class Sweep

Not owed (first delivery). The survivor above is its own disposition: a gap the sweep exposed, closed by a
spec-form case in the existing file, the class being "a payload whose server-parsed form differs from its raw
form", one member (an unknown field); other members of the class (fields the shape defaults) are not claimed.

## Test Execution Results

| Command | Result |
|---|---|
| Full suite at `1c07354` (before the tightening), network isolated | 1539 of 1539, 124 files, exit 0 (`m2/vitest-m2.json`). 1505 (M1) + 32 + 2 = 1539. |
| Full suite at `ec984fe` (final tip), network isolated | 1542 of 1542, 124 test files by the reporter's `testResults`, vitest exit 0 (`m2/vitest-m2-ec984fe.json`, `.exit`). 1539 + 2 (unknown-field case, both orders) + 1 (identical-save failure case) = 1542. |
| `pnpm run typecheck` at `ec984fe` | exit 0 (`m2/typecheck-ec984fe.exit`, `.out`) |
| `convention-check.js website --since=1ad625e` at `ec984fe` | 47 FAIL, 0 CANDIDATE, 19 SKIP (`m2/convention-check-ec984fe.out`). All 47 are eslint: 5 in `limits.import-validation.test.ts` (M1's, under D-9) and 42 in `useApiMethods.json-editor-repair.test.ts`, which linted 42 at `8147661` (`git show 8147661:<path> \| eslint --stdin`) and 42 now, so none is M2's. At `53c3c58` it was 58: M2 had added 4 (`MessageProvider.own-save-notice.test.tsx`: the Pusher mock as a class, one long object literal), 6 (the `saveWith` helper's `any`s and a hook called from a non-hook name) and 1 (`import/order` in `useApiMethods.ts`); all removed at `ec984fe`, which `eslint` reports clean for those two files. SKIPs: `.playwright-mcp/` images (held, not mine), `src/utils/index.ts` no added lines, and the id-token/basename check that the tool names as not run (it does not implement the ID-token class verbatim): unchecked, not passed; by hand the new file is `MessageProvider.own-save-notice.test.tsx`, titles carry no ID token. |

## Outstanding Items

- Nothing owed before hand-off.
- The records are never cleared when the message id changes in a mounted provider; they are bounded by the
  plan's residue class (1) (RK-3). Not asserted.
- Walk B-1 (real Pusher delivery to the sender) is UAT's.
- QAF-16 LOW (QA, carried to M2's pass): `useApiMethods.json-editor-repair.test.ts` stubs React's `useState`
  and `useCallback`, and `1c07354` adds a `describe` of two cases to it. The stub holds one value per call
  site and cannot represent a re-render after `setPendingSaveChoice`. Neither new case reaches the dialog
  path, so they do not depend on it. Wanted: real React state (DOM harness) or the stub named here. Open;
  to be decided with QA at the M2 hand-off (moving the two cases into the `MessageProvider` file's real
  mount is the cheaper route). Status at `ec984fe`: the two cases still sit in that file, now with real types for the
  arguments (no `any`) and no lint finding of their own; the no-id case cannot move to the mount (a payload without an
  id has no channel, so the record is unobservable by a broadcast). The state stub remains the file's; decision for QA.
- QAF-15 (M1's QA): see the M1 document's correction; the instrument for M7-b is the whole-tree capture.

## Next Steps

Code review of M2 at `ec984fe` (`code-reviewer-hooks-017`), then M3.
