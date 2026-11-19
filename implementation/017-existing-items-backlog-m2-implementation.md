---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Handoff-At: 736c7bf — repos=website; built and committed, self-check sweep and convention-check owed, not yet handed to code review
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

## Implementation Summary

The tab keeps one record per save it sends: `hashMessage(normalizeForHash(payload))`, the form the broadcast
compare already hashes. `persist` adds it, only for a payload that has an id; an equal broadcast removes one
occurrence; a save's `onError` removes one occurrence. The broadcast handler raises "Message Update
Detected" only when its hash matches neither a record nor the tab's current content. So an edit typed while
a save is in flight no longer makes the saving tab warn about its own save (M2-b, the one live path, AN-1),
the cross-tab notice is kept (M2-c, D-5), and the pinned absence holds (M2-a). Value Statement 2.
Rollback: `git -C website revert 736c7bf 1c07354`.

## Milestones Completed

M2-a, M2-b, M2-c built and green. Owed before hand-off: self-check sweep, convention-check, class evidence below.

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

## Class Sweep

Not owed (first delivery). The survivor above is its own disposition: a gap the sweep exposed, closed by a
spec-form case in the existing file, the class being "a payload whose server-parsed form differs from its raw
form", one member (an unknown field); other members of the class (fields the shape defaults) are not claimed.

## Test Execution Results

| Command | Result |
|---|---|
| Full suite at `1c07354` (before the tightening), network isolated | 1539 of 1539, 124 files, exit 0 (`m2/vitest-m2.json`). 1505 (M1) + 32 + 2 = 1539. |
| `pnpm run typecheck` | exit 0 (`m2/typecheck.out`) |
| The own-save file at `736c7bf` | 34 of 34 (adds the unknown-field case in both orders) |

The full suite and typecheck are to be re-run at the final tip of M2 before hand-off (Resumption State).

## Outstanding Items

- Owed before hand-off: `mutant-gen.js --range 8147661..<tip>` in a git clone; `convention-check.js --since=1ad625e`
  with each CANDIDATE dispositioned; full suite and typecheck at the final tip; `Handoff-At` moved to that tip.
- The records are never cleared when the message id changes in a mounted provider; they are bounded by the
  plan's residue class (1) (RK-3). Not asserted.
- Walk B-1 (real Pusher delivery to the sender) is UAT's.
- QAF-16 LOW (QA, carried to M2's pass): `useApiMethods.json-editor-repair.test.ts` stubs React's `useState`
  and `useCallback`, and `1c07354` adds a `describe` of two cases to it. The stub holds one value per call
  site and cannot represent a re-render after `setPendingSaveChoice`. Neither new case reaches the dialog
  path, so they do not depend on it. Wanted: real React state (DOM harness) or the stub named here. Open;
  to be decided with QA at the M2 hand-off (moving the two cases into the `MessageProvider` file's real
  mount is the cheaper route).
- QAF-15 (M1's QA): see the M1 document's correction; the instrument for M7-b is the whole-tree capture.

## Next Steps

Hand-off to code review at the final M2 tip, then M3.

## Resumption State

Written 2026-11-19T00:41Z at the M2 commit seam (context past 225K). Branch `chain/017-existing-items-backlog`,
HEAD `736c7bf` (M1 `8147661`, M2 `1c07354`, tighten `736c7bf`); website tree clean apart from the held
`.playwright-mcp/`. Record repo: M1 document and evidence committed (`2bace82`); this document and
`verification/017/impl/m2/` are committed with the checkpoint.

- Done: M1 handed to steering (spawn cue sent; steering wrote the reviewer brief `7655982`; planner fixed R-7's
  order `9d4f3e1`). M2 code, tests, mutants.
- Next: the M2 items under Outstanding Items, then hand M2 to `code-reviewer-hooks-017` if live (else
  `steering-roadmap`). Then M3 (read the plan's M3 and the QA § M3 first; M3 has a user-visible surface: send
  `steering-roadmap` only flows that hold a decision), M4. After M4: tell `steering-roadmap` that M1 to M4 are
  through (devops starts for the OQ-7 probe push). M5/M6 wait on OQ-7 and gate M5-0. M7 last.
- Scratch to remove at run end: `$SCRATCH/exp-m1`, `exp-m2`, `clone-m1` under
  `/tmp/claude-1000/-usr-local-bin-hooks/4fc9969e-4c4a-48ea-8512-e0b69da51295/scratchpad/`; no process left running.
- Messages: M1 hand-off and the R-7 ordering block to `steering-roadmap` (answered by the fix). Nothing awaited.
- Process facts for the final report: stamp-gate refusals (two, corrected); comment-gate refused a `/* none */`
  comment in the new test, removed (satisfied, not worked around); convention-check eslint FAILs on M1 left under
  D-9 (disclosed in the M1 document).
- Cache-warm wake `be5e9b57` deleted at this checkpoint; re-arm on the next briefed turn.
