---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Released
Status-Detail: "Released at release identifier website master 787bec5 and generator prod 8512a1d (pushed 2026-11-19T20:11Z and 20:14Z by devops Stage 2); closed. Anchor fields above keep the values the document was written at. Post-deploy rows B-6 to B-11 ride handoff/017-existing-items-backlog-post-deploy-2026-11-19.md."
Handoff-At: 7293a35 — repos=website; fix round 7 (QAF-27, test-only) on 24e9be7 (CR-21, test-only) on 33e59f7 (M2-d, EC-6) on 60252be (CR-20, code review APPROVED at f5f3346)
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
| 2026-11-19T01:12 | implementer-hooks-017 | Resumed. Self-check sweep run (one survivor, closed at `53c3c58`), lint introduced by M2 removed at `ec984fe`, convention-check and full suite re-run at `ec984fe`. Handed to code review at `ec984fe`; Resumption State removed. |
| 2026-11-19T01:34 | implementer-hooks-017 | Fix round 2 on QAF-17 / CR-5 (QA's case), CR-3 (real render, `442059d`), CR-4 (disposition line), plus a class-sweep case: tests only, no production change. Handoff-At moved to `dd26104`. |
| 2026-11-19T11:05 | implementer-hooks-017 | Fix round 3 on UAT-1 (B-1 recurred in walk 6): root cause found and fixed at website `8e1ccef`, covering case tightened at `42d15de`. A production change, so QA, code review, the architect read and UAT's re-walk of B-1 follow. Handoff-At moved to `42d15de`. See § Fix Round 3. |
| 2026-11-19T17:55 | implementer-hooks-017 | Fix round 4 on CR-20 (code review Round 9), on his answer (`steering/017-rulings.md` block 2026-11-19T17:49Z, D-33): the producer sends the hash JSON-encoded, the handler compares strings exactly, `asDelivered` removed. Red first at `42d15de`, built and committed at website `60252be`. Handoff-At moved to `60252be`. M2-d (disconnect) held for QA's re-key. See § Fix Round 4. Stamp corrected on 2026-11-19T18:33 from 18:20, which was later than the commit; the time the row was written was not recorded, so it carries the commit's own time (`git log -1 --format=%cd 60252be`). |
| 2026-11-19T18:06 | implementer-hooks-017 | M2-d built on steering's word (`steering/017-rulings.md` block 2026-11-19T18:01Z; entry conditions EC-5 and EC-6 of QA's Phase 1 re-key `9e212a3`): `usePusher`'s cleanup disconnects its run's Pusher instance; the producer cases now decode the real `pusher` frame with pusher-js's own `decodeMessage`. Committed at website `33e59f7`. Handoff-At moved to `33e59f7`. See § Fix Round 5. Stamp corrected on 2026-11-19T18:33 from 18:35 (later than the commit), to the commit's own time. |
| 2026-11-19T18:14 | implementer-hooks-017 | Fix round 6 on CR-21 (code review Round 10, `cfbdb2e`): one case, two hooks mounted at once, test-only; website `24e9be7`. My disposition of `nm44` as equivalent (Fix Round 5) is withdrawn. Handoff-At moved to `24e9be7`. See § Fix Round 6. Stamp corrected on 2026-11-19T18:33 from 18:50 (later than the commit), to the commit's own time. |
| 2026-11-19T18:34 | implementer-hooks-017 | Fix round 7 on QAF-27 (QA Phase 2 for M2 at `24e9be7`, MEDIUM, test-only): two cases for a payload that is not a string, website `7293a35`. Handoff-At moved to `7293a35`. See § Fix Round 7. |
| 2026-11-19T19:13 | devops-hooks-017 | Document closed. Status: Committed. Plan 017 is committed on chain/017-existing-items-backlog (website 7293a35, generator 8512a1d) at devops Stage 1; the release is Stage 2. |
| 2026-11-19T20:18 | devops-hooks-017 | Document closed. Status: Released. Plan 017 released: website master 787bec5 (2026-11-19T20:11:47Z) and generator prod 8512a1d (20:14:17Z); release-tip verdict agent-output c09fd41. Deployment record deployment/closed/017-existing-items-backlog-deployment.md. |

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
| `src/providers/MessageProvider/__tests__/usePusher.update-prompt.test.tsx`, `useApiMethods.json-editor-repair.test.ts` | callers pass the new ref; the second file gained two cases on `persist`'s record (id, no id) at `1c07354`, moved at `442059d` to `useApiMethods.own-save-record.test.tsx` (CR-3) |

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
| coupling: a foreign broadcast between this tab's save and its broadcast must not consume the save's record (QAF-17 / CR-5) | `MessageProvider.own-save-notice.test.tsx` | Yes (QA's supplied case, added at `bce3119`) | Yes, QA's mutant `qa-coupling-any-broadcast-consumes-a-record` survived `ec984fe`, killed at `bce3119` (`m2/bce3119-fix-mutants/`) | AssertionError (notice count) | Yes |
| class member: a failure report for an already-broadcast save leaves other records alone | same | Yes (added at `dd26104`) | Yes, mutant `class-forget-consumes-when-absent` (`splice(Math.max(index, 0), 1)`) survived `bce3119` (`m2/bce3119-class-mutant/`), killed at `dd26104` (`m2/dd26104-class-mutant/`) | AssertionError | Yes |
| `persist` record, id and no-id, now a real render (CR-3) | `useApiMethods.own-save-record.test.tsx` | moved from `useApiMethods.json-editor-repair.test.ts`, same two cases | mutant `useApiMethods.ts:74:if-false` (id guard dropped) killed at `bce3119` (`m2/bce3119-fix-mutants/`) | AssertionError | Yes |

Self-check sweep (`mutant-gen.js --range 8147661..736c7bf`, 14 operator mutants over the added lines of `usePusher.ts`
and `useApiMethods.ts`; `mutation-run.py` exports of the committed SHA, network isolated, tests: the `MessageProvider`
test folder; `m2/736c7bf-mutants-gen.json`, `m2/736c7bf-sweep/`): 13 of 14 killed at `736c7bf`. Survivor
`usePusher.ts:39:num:2`: `forgetOwnSave` removing two records instead of one; no case had two identical saves with one failing.
Disposition: a spec-form case in the existing file (row above), then 14 of 14 killed at `ec984fe` (`m2/ec984fe-sweep/`).
The hand-made named mutants (NM-2 to NM-5 and the three `m2-*`) were not re-run at `ec984fe`: no production guard changed
after `1c07354` except an import's position (`ec984fe`); their last result is the one above.

## Class Sweep

First delivery: not owed; the survivor above is its own disposition: a gap the sweep exposed, closed by a
spec-form case in the existing file, the class being "a payload whose server-parsed form differs from its raw
form", one member (an unknown field); other members of the class (fields the shape defaults) are not claimed.

Fix round 2 (QAF-17 / CR-5, a test gap, not a production defect):

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---------|---------------------|----------------------------------|--------------------------|
| QAF-17: a foreign broadcast consumes a record it does not own. Class: a `splice` of `ownSaveRecordsRef` that is not tied to the record's own hash | `grep -rn "splice" src/providers/MessageProvider/*.ts src/providers/MessageProvider/*.tsx` (derived; the reviewer's mutant is the instrument, the grep locates) | 2 hits: `usePusher.ts:39` (`forgetOwnSave`, `if (index >= 0)`), `usePusher.ts:65` (broadcast handler, `if (ownSaveIndex >= 0)`) | `:65`: QA's case, mutant killed. `:39`: the same mutant shape (`Math.max(index, 0)`) survived; the class-member case above kills it. No other site removes records (`recordOwnSave` only pushes; `grep -rn "ownSaveRecordsRef\|recordsRef" src` outside tests, 11 lines, all pass-through, one `push`, two `splice`). Residual after the fix: 0 unkilled. |

## Test Execution Results

| Command | Result |
|---|---|
| Full suite at `1c07354` (before the tightening), network isolated | 1539 of 1539, 124 files, exit 0 (`m2/vitest-m2.json`). 1505 (M1) + 32 + 2 = 1539. |
| Full suite at `ec984fe` (final tip), network isolated | 1542 of 1542, 124 test files by the reporter's `testResults`, vitest exit 0 (`m2/vitest-m2-ec984fe.json`, `.exit`). 1539 + 2 (unknown-field case, both orders) + 1 (identical-save failure case) = 1542. |
| `pnpm run typecheck` at `ec984fe` | exit 0 (`m2/typecheck-ec984fe.exit`, `.out`) |
| `convention-check.js website --since=1ad625e` at `ec984fe` | 47 FAIL, 0 CANDIDATE, 19 SKIP (`m2/convention-check-ec984fe.out`). All 47 are eslint: 5 in `limits.import-validation.test.ts` (M1's, under D-9) and 42 in `useApiMethods.json-editor-repair.test.ts`, which linted 42 at `8147661` (`git show 8147661:<path> \| eslint --stdin`) and 42 now, so none is M2's. At `53c3c58` it was 58: M2 had added 4 (`MessageProvider.own-save-notice.test.tsx`: the Pusher mock as a class, one long object literal), 6 (the `saveWith` helper's `any`s and a hook called from a non-hook name) and 1 (`import/order` in `useApiMethods.ts`); all removed at `ec984fe`, which `eslint` reports clean for those two files. SKIPs: `.playwright-mcp/` images (held, not mine), `src/utils/index.ts` no added lines, and the id-token/basename check that the tool names as not run (it does not implement the ID-token class verbatim): unchecked, not passed; by hand the new file is `MessageProvider.own-save-notice.test.tsx`, titles carry no ID token. |

## Fix Round 3 — UAT-1 (B-1 recurred in walk 6)

Brief: `steering-roadmap-hooks`, 2026-11-19: diagnose and fix UAT-1 within M2's criteria, red test first, then code review.
No criterion, `forgetOwnSave`'s contract or the record's definition changed (see "Within M2").

### Diagnosis

Cause: pusher-js 8.3.0 decodes a broadcast's data with `JSON.parse` whenever it is a string, and keeps the string only when
that throws (`node_modules/pusher-js/src/core/connection/protocol/protocol.ts`, `decodeMessage`). The broadcast's data is the
hash, a hex string from `hashMessage`. A hash that reads as a JSON number (digits only, `-` and digits, digits `e` digits)
reaches the handler as a number: `JSON.parse('6286e037')` is `6.286e+40`, `JSON.parse('-5e72712')` is `-Infinity`. The
handler's `indexOf(hash)` over string records then misses, and its compare with the shown content's hash (a string) misses too,
so the saving tab raises the notice for its own save. Whether the edit is typed in flight does not matter to this path; the
shown-content clause only rescued the case where nothing was edited.

Evidence, from UAT's walk 6 captures (`verification/017/uat/walk-6/`), read by me:
- Of the 37 distinct `message-update` frames in tab A's captures, exactly two carry a number-shaped hash: `6286e037` (W3,
  10:37:33.677Z) and `-5e72712` (X5, 10:49:49.432Z). They are the two runs where A raised the notice; every other frame's hash
  reads as a string (`python3` over `W*/X*/K-A-cap.json`, `JSON.parse` per frame, 2 numeric of 37).
- `node -e "JSON.parse('6286e037'), JSON.parse('-5e72712')"` prints `6.286e+40 -Infinity`.
- The notice came at the frame, not at the response. Frame to notice in A: 84 ms (W3), 71 ms (X5). In tab B, which always raises
  it, frame to notice was 76 to 129 ms over the 15 runs (80 and 81 ms in W3 and X5). The dialog takes about 80 ms to show. In A
  that rendering held the main thread, which is why the upsert response was handled 74 to 85 ms after the frame in those two runs
  and in no other: the order "frame before response" was a consequence of the notice, not its cause. UAT's reading in Walk 6 ("the
  notice appears when the 200 response is handled") is the other way round.
- Control K (planted 500) raised no notice in A because its hash (`-7533226a`) is not number-shaped.
- Walk 3's A1 and walk 4's runs did not capture the frame, so A1's hash is not known; A1 is the same class by timing and
  by the one-frame shape, not proven.

My earlier candidates (1) `onError` forgetting the record and (2) a second binding were both wrong: neither was needed, and X5
showed no error toast. Self-diagnosis, at the level of method: I took the handler's parameter to be the string the producer sent
and reasoned about the mutation and binding layers around it; I did not read what the transport library hands the handler.
The M2 tests had the same blind spot: their `broadcast` passed a string straight to the handler.

### Change

`src/providers/MessageProvider/usePusher.ts`: `asDelivered(hash)` returns `JSON.parse(hash)` or the string when that throws, the
decode pusher-js applies. The handler compares in that form: `asDelivered(record) === hash` against each record
(`findIndex`, then the same `splice`), and `hash !== asDelivered(hashMessage(normalizeForHash(messageRef.current)))` against the
shown content. Records stay strings; `recordOwnSave`, `forgetOwnSave` and `persist` are unchanged. Producer
(`shared.ts`, `trigger(..., hashMessage(message))`) unchanged.

Commits (website, chain branch): `8e1ccef` the fix and its cases; `42d15de` the two-saves case run in both arrival orders
(sweep survivor, below).

### Within M2

M2's record is still `hashMessage(normalizeForHash(payload))` and a record still lives from the send to an equal broadcast or
the mutation's error. "Equal" is now judged in the form the library delivers, the one place the producer's string and the
consumer's value differ. Not changed: M2-a, M2-b, M2-c's wording, `forgetOwnSave`, the window. Residue, new and bounded (RK-3
class (1)'s sibling): two different hashes can read as the same number (`5e7` and `5e07`; any two whose exponent passes what
a double holds, both `Infinity`). A remote save whose hash collides with a record this tab still holds, while that save is in
flight, would be taken as the tab's own and raise no notice. It needs two number-shaped hashes in one class at once; not
asserted. The exact route is the producer: send the hash JSON-encoded (`JSON.stringify(hash)`), which pusher-js decodes back to
the same string and which an open tab on the old client decodes the same way. That edits `shared.ts` (M5's surface) and the
wire form, so it is not done here; named for steering and the planner.

### User-visible flows

| Flow | Surface | Trigger | What happens next | Rung |
|---|---|---|---|---|
| The saving tab saves | "Message Update Detected" dialog | a save whose broadcast hash reads as a number | no dialog in the saving tab (as for any other hash); the other tab still gets it | the existing handler, extended; no new view or input |

No flow holds a decision, so no ask is owed.

### Patterns Extended

| Surface | Pattern |
|---|---|
| The handler's compare | the M2 compare (`usePusher.ts`), same shape, values brought to one form |
| Tests | `MessageProvider.own-save-notice.test.tsx`, tightened: `broadcast` now delivers what pusher-js delivers (`asPusherDelivers`, a `JSON.parse` that falls back to the string), so every case in the file runs through the decode; new cases added to the same file, no sibling |

### TDD Compliance

Red run before the fix (`verification/017/uat1-fix/red-pre-fix-8e1ccef/own-save-notice.red.json`, the new and tightened test file
against the unchanged `usePusher.ts`): 13 failed, 37 passed of 50, all `AssertionError: expected true to be false // Object.is equality`
(the notice was shown).

TDD Gate: Test `raises no notice for a save whose broadcast hash is digits only, when an edit follows Save` fails as expected:
`AssertionError: expected true to be false`. Proceeding to implementation.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| handler compare, own save with hash digits only / `-` digits / digits `e` digits / exponent past a double / `-` and such an exponent, both orders (10 cases) | `MessageProvider.own-save-notice.test.tsx` | Yes | Yes (red file above); mutant `record-raw` (`record === hash`) fails the same 10 | AssertionError: notice shown | Yes |
| handler compare, existing member "after the content-loss dialog chose V2", both orders (its own hash reads as a number) | same | existing | Yes (red file above, 2 cases) | AssertionError: notice shown | Yes |
| shown-content clause, "another tab saves what this tab already shows, under a digits-only hash" | same | Yes | Yes (red file above); mutant `shown-raw` (`hash !== shownHash`) fails it alone | AssertionError | Yes |
| M2-c kept under number-shaped hashes: "another tab saves content whose broadcast hash is digits only" and "…digits and an e, beside a held record of different content" | same | Yes | The first is green before and after (the pre-fix code also showed the notice); the second red only from mutant `any-number-is-own` (`… \|\| typeof hash === 'number'`), which fails it alone | AssertionError (notice count) | Yes |
| `asDelivered` fallback to the string, every string-hash case | same | Yes | mutant `parse-failure-lost` (`catch` returns `undefined`) fails 32 of 62 | AssertionError | Yes |
| record removal after a match, "content this tab sent earlier and has already seen broadcast" | same (existing) | existing | mutant `record-kept-after-match` (the `splice` dropped) fails it alone | AssertionError | Yes |
| two saves in flight, delivered in the order sent and in reverse (tightened, `it.each`) | same | Yes (added at `42d15de` after the sweep's survivor) | Yes, sweep mutants `usePusher.ts:72:walk-first` and `walk-last`: `walk-first` survived `8e1ccef`, both killed at `42d15de` | AssertionError | Yes |

Fixtures: contents found by running the real `hashMessage` over `upsertInput.parse(...)` for `c0`…`c59999` (digits `c24` → `72358146`,
`c60` → `-30576242`, `c32` → `204263e3`, `c270` → `6900e577`, `c37` → `-112e2598`, `c79` → `442451e6`); each own-save case asserts
its fixture's hash as a literal before delivering (`expect(sentHash(0)).toBe(hash)`), so a hashing change fails the fixture, not the
property. The delivered value is `JSON.parse` of the frame string, pusher-js's documented decode read at the path above, independent of
the production function.

Mutants: isolated exports of `git archive`, one exact-once edit each, output to files, `timeout -k`, in the session scratchpad
(removed; `leftover exports: 0`). Own-named: `verification/017/uat1-fix/run-mutants.sh`, results `8e1ccef/` and `42d15de/` (`summary.txt`):
at `42d15de`, control 0 of 62 failed; `record-raw` 10, `shown-raw` 1, `any-number-is-own` 1, `parse-failure-lost` 32,
`record-kept-after-match` 1 killed.

Self-check sweep (`mutant-gen.js --range 4b8db9c..<tip>`, 8 operator mutants on the added lines of `usePusher.ts`; `mutation-run.py`,
`--dep node_modules`; `verification/017/uat1-fix/8e1ccef-sweep/`, `42d15de-sweep/`): 7 of 8 at `8e1ccef`, 8 of 8 at `42d15de`. The one survivor
(`usePusher.ts:72:walk-first`, the record search seeing only the first record) was the covering case delivering two saves only in send
order; the same mutant would also have survived against the pre-fix `indexOf`. Disposition: the existing case now runs in both orders.

QA's Named mutants for M2, re-run at `42d15de` (the fix's diff touches their guards; the lines re-pointed to the tip's line numbers,
`verification/017/uat1-fix/named-mutants-42d15de.json`, results `42d15de-named/`, driver `verification/017/impl/mutate.py`, network isolated): NM-2
killed (7 cases), NM-3 killed (2), NM-4 killed (1), NM-5 killed (2). NM-1 is M1's (not built by this diff).

### Class Sweep

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| UAT-1. Class: a consumer that compares a value the Pusher client decoded with a string it holds (the decode turns a string payload into a number when it reads as one). Derived by me; the finding carries none. | `grep -rn "\.bind(\|bind_global\|\.subscribe(" website/src --include=*.ts --include=*.tsx` (not `__tests__`), and `grep -rn "\.trigger(" website/src …` for the producers, and `grep -rl pusher project-utils preview-image-generator` over ts/tsx/js/mjs without `node_modules`, `.github`, `dist` | binds: `usePusher.ts:70` (`channel.bind('message-update', …)`); `usePusher.ts:69`, `utils/redis/index.ts:45` (`subscribe`, the Redis one, strings undecoded), `components/Drawer/index.tsx:242` (`{...bind()}`, a gesture handler, not Pusher). Triggers: `server/api/utils/shared.ts:274`, one. Other repos: 0 hits | `usePusher.ts:70`: fixed. `shared.ts:274`: the producer, unchanged, see "Within M2". `utils/redis` and `Drawer`: not applicable, not Pusher. No other consumer of a Pusher payload exists. Residual after the fix: 0 consumers comparing a decoded payload with a string without `asDelivered` |
| UAT-1, class as the instrument saw it: a case that hands the handler a string where the library hands a number | `grep -n "broadcast(\|hoisted.handler" website/src/providers/MessageProvider/__tests__/*.tsx` | `MessageProvider.own-save-notice.test.tsx`: handler set in the mock `bind`, one `broadcast` helper; `usePusher.update-prompt.test.tsx` calls the handler with its own strings (4 cases, none with a number-shaped hash) | The own-save file: `broadcast` now goes through `asPusherDelivers` for every case. `usePusher.update-prompt.test.tsx`: its cases assert the dialog's text and buttons, not the hash compare; a string handed there is a string the library would also hand. Not applicable, not changed. Residual 0 |

### Test Execution Results (fix round 3)

| Command | Result |
|---|---|
| Red, the new and tightened file against the unchanged `usePusher.ts` | 13 failed of 50 (above) |
| `src/providers/MessageProvider`, network isolated (`unshare -rn`), at `42d15de` | 105 of 105, 8 files, exit 0 |
| Full suite at `8e1ccef` | 1827 of 1827, 143 files, exit 0 (the file's 50 cases) |
| Full suite at `42d15de` | 1829 of 1829, 143 files by the reporter's `testResults`, exit 0 (`verification/017/uat1-fix/full-suite-42d15de.summary.json`); 1827 + 2 (the tightened case's second order, both delivery orders) |
| `pnpm run typecheck` at `42d15de` | exit 0 (both programs) |
| `eslint` on `usePusher.ts` and `MessageProvider.own-save-notice.test.tsx` | exit 0. The folder's other files carry findings M2 did not add (`MessageProvider.transient-toast`, `mountMessageProvider`, `useApiMethods.json-editor-repair`, `usePusher.hash-parity`) |
| `convention-check.js website --since=4b8db9c` | 0 FAIL, 0 CANDIDATE, 18 SKIP (17 `.playwright-mcp` images, held, not mine; the ID-token/basename check, which the tool says it does not implement verbatim: unchecked, not passed; by hand the file name and titles carry no ID token) |

### Hand-off

Website tip moves `4b8db9c` → `42d15de` (production: `usePusher.ts`; tests: `MessageProvider.own-save-notice.test.tsx`). This expires, at `4b8db9c`: M2's code review and QA verdicts,
and the chain's whole-range reads that include `usePusher.ts`, the architect's read, and UAT's verdict; UAT re-walks B-1.
A real-Pusher walk meets a number-shaped hash in 2 of 37 frames (walk 6), so UAT's re-walk of B-1 reaches the fixed path
only on such saves; a run is placed by its captured frame hash (does it parse as a number), as above, and the walk repeats saves
until enough of them carry one. Which typed text yields such a hash on the real message depends on the whole message and is not
predicted here. Follow-ups, not done: (1) the producer-side exact fix in "Within M2";
(2) pusher-js instances opened by `usePusher`'s effect are unsubscribed but never `disconnect()`ed (read at `usePusher.ts` cleanup; not probed; severity low:
a socket per message id visited in one tab).

## Fix Round 4 — CR-20 (distinct hashes that decode equal)

Brief: `steering-roadmap-hooks`, 2026-11-19: CR-20's exact fix, the remedy of code review Round 9 (`d8aa235`); his answer D-33 is the exact hash fix in 017.
Not in this round: the Pusher disconnect (D-34, M2-d). Plan revision 10 holds its code until QA Phase 1's re-key; the critic (`012ee2b`) and the architect (`410044e`) have read it.
No criterion changed: revision 10 states M2-c's exact equality and the JSON-encoded broadcast, which this round builds.

### Change

- `src/server/api/utils/shared.ts` (`upsertMessage`): `pusher.trigger(..., 'message-update', JSON.stringify(hashMessage(message)))`. pusher 5.1.3 sends a string as it is
  (`node_modules/pusher/lib/events.js`, `ensureJSON`), so the frame carries the hash in JSON quotes; pusher-js 8.3.0 `decodeMessage` decodes it back to the exact string.
- `src/providers/MessageProvider/usePusher.ts`: `asDelivered` removed. The handler finds a record with `record === hash` and compares the shown content with `hash !== shownHash`, both exact, `hash` still `unknown`.
  No `typeof` guard: strict equality against a string never matches a non-string, so a non-string payload is "equal to neither" and raises the notice, which is the criterion's wording. Records, `recordOwnSave`, `forgetOwnSave`, `persist` unchanged.
- `src/providers/MessageProvider/__tests__/MessageProvider.own-save-notice.test.tsx`: the `asPusherDelivers` transcription removed (`broadcast` hands the handler the producer's string; the decode is covered on the producer side, below). Six cases added.
- `src/server/api/utils/__tests__/shared.upsert-broadcast.test.ts` (new, 11 cases): the producer's broadcast, decoded as the library decodes it. No existing test asserted the `trigger` arguments (`grep -rn "trigger" src --include=*.test.ts*`: 2 hits, neither on this surface; the two files that mock `pusher` (`shared.message-cap`, `shared.upsert-preview-continuation`) use a `vi.fn` that nothing reads), so this is a new file by the surface's name (`shared.<behaviour>`), not a sibling of a case that could be tightened.

Wire form, observable outside the service's source: the `message-update` frame's data is now `"<hash>"` (JSON quotes) where it was `<hash>`. A tab on the previous client decodes it with the same `JSON.parse` and holds the same string, so no old client needs a reload. During a deploy, a new client that receives a frame from a not-yet-updated server instance gets the old raw form, and for a number-shaped hash (about 6% of saves, the planner's sample) it takes its own save for another tab's, which is the UAT-1 behaviour; bounded to the skew. Downstream: M5 touches `shared.ts` (its surfaces); its premise is untouched, the one changed line is the trigger.

### User-visible flows

| Flow | Surface | Trigger | What happens next | Rung |
|---|---|---|---|---|
| A tab saves; another tab's save arrives | "Message Update Detected" dialog | a broadcast whose hash is not this tab's own | the dialog appears for every distinct hash, including two that read as the same number; the saving tab still sees none for its own save | the M2 handler, same shape, compare made exact |

No flow holds a decision, so no ask is owed.

### Patterns Extended

| Surface | Pattern |
|---|---|
| The producer's call | the one `pusher.trigger` in `upsertMessage`; the argument only |
| The handler's compare | the M2 compare, `record === hash`, the form before Fix Round 3 minus the `indexOf` (`unknown` against string) |
| Tests | `MessageProvider.own-save-notice.test.tsx` tightened (the number-shaped own-save cases that were green only through the decode now run on strings); `shared.message-cap.test.ts`'s mock set (env proxy, capturing database, `pusher` class) as the pattern for the new producer file |

### TDD Compliance

Red run before the fix (`verification/017/cr20-fix/red-pre-fix-42d15de/red.json`, `.out`: the new and tightened files against the unchanged `shared.ts` and `usePusher.ts` of `42d15de`):
21 failed, 48 passed of 69. 13 are in the consumer file, 8 in the producer file. Verbatim firsts:
consumer `AssertionError: expected true to be false // Object.is equality`; producer `AssertionError: expected 'number' to be 'string' // Object.is equality` and `expected 51354 to be '51354e00'`.

TDD Gate: Test `reaches subscribers as the hash string when the hash has digits, an e and 00` fails as expected: `AssertionError: expected 'number' to be 'string'`. Proceeding to implementation.
TDD Gate: Test `raises no notice for a save whose broadcast hash is digits only, when an edit follows Save` fails as expected: `AssertionError: expected true to be false`. Proceeding to implementation.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| producer broadcast data, number-shaped hashes (5 shapes) reach subscribers as the hash string | `shared.upsert-broadcast.test.ts` | Yes | Yes (red file above, 5 cases); mutant `trigger-raw` (`hashMessage(message)`) fails the same 5 | AssertionError: `number` against `string` | Yes |
| producer broadcast data, two saves whose hashes read as one finite value / `Infinity` / `-Infinity` stay apart | same | Yes | Yes (red file above, 3 cases); `trigger-raw` fails the same 3 | AssertionError: `51354`, `Infinity`, `-Infinity` against the hash | Yes |
| producer broadcast, channel and event; hash that is not number-shaped; no id sends nothing | same | Yes | Green before and after: they state behaviour the fix keeps. No red claimed; no mutant of the fix reaches them. Kept as the surface's spec | not owed | Yes |
| handler compare, own save under number-shaped hashes (5 shapes, both orders, 10 cases), V2 content-loss member (2) | `MessageProvider.own-save-notice.test.tsx` | existing | Yes (red file above, 12 cases: the producer's string no longer decodes to what `42d15de` compared against) | AssertionError: notice shown | Yes |
| shown-content clause, "another tab saves what this tab already shows, under a digits-only hash" | same | existing | Yes (red file above, 1 case) | AssertionError | Yes |
| handler compare, shown content against a colliding hash (finite, `Infinity`, `-Infinity`; 3 cases) | same | Yes | **Not red at `42d15de`**: with the producer's string delivered, `42d15de` raises the notice for them (it fails the own-save cases instead). Red from mutant `shown-decoded` (both sides decoded), which fails the 3 | AssertionError (notice count) | Yes |
| handler compare, a held record against a colliding hash (3 cases) | same | Yes | **Not red at `42d15de`**, same reason. Red from mutant `record-decoded`, which fails the 3 | AssertionError (notice count) | Yes |
| record removal after a match | same (existing) | existing | mutant `record-kept-after-match` fails 1 | AssertionError | Yes |

Departure from the review's wording ("red at `42d15de`, green after") for the six colliding-pair cases: the review's probe delivers the numbers `42d15de`'s consumer was built for, i.e. the
old frame. On the new frame no consumer fed strings can show the collision except one that decodes them again, which is the mutant. The producer cases carry the class's red at `42d15de`
(8 of 8 above): two messages whose hashes read equal reach subscribers as two values at `60252be` and as one value at `42d15de`. Stated for the reviewer to accept or ask for another instrument.

Fixtures: colliding pairs found by search with the real `hashMessage` (`verification/017/cr20-fix/search-42d15de/`: `pairs.txt` 400 `Infinity`/`-Infinity` pairs and `pairs-finite.txt` 6 finite pairs
for the provider's message form, contents `p0`, `p1`, ...; `pairs-producer-form.txt`, `pairs-producer-form-finite.txt` for the producer's form; isolated export of `42d15de`, network isolated, results to files).
Each case asserts its fixtures' hashes as literals before it delivers them (`remoteHash` / `sentHash` `toBe`, and the producer's delivered value `toBe` the literal).
The decode in the producer file is `JSON.parse` over the frame string with the string kept on failure, transcribed from pusher-js 8.3.0 `decodeMessage` and pusher 5.1.3 `ensureJSON`, paths in the file's helper name and here;
it is the transport's, not the code under test's, and the expectations are literals.

Mutants (isolated exports of `git archive 60252be`, one exact-once edit each, outputs to files, `timeout -k`, network isolated; `verification/017/cr20-fix/run-mutants.sh`, results `60252be/summary.txt`, `leftover exports: 0`):
control 0 of 122 failed; `trigger-raw` 8, `record-decoded` 3, `shown-decoded` 3, `record-kept-after-match` 1 killed.

Self-check sweep (`mutant-gen.js --range 42d15de..60252be`, 6 operator mutants on the added lines of `usePusher.ts`; `mutation-run.py --dep node_modules`; `60252be-gen.json`, `60252be-sweep/`, `60252be-sweep.out`):
6 of 6 killed. The producer's changed argument has no operator mutant (a call argument); `trigger-raw` is its mutant.

QA's Named mutants for M2, re-run at `60252be` (the diff touches their guards; lines re-pointed, `named-mutants-60252be.json`, `60252be-named.summary`, driver `verification/017/impl/mutate.py`, network isolated):
NM-2 killed (7 cases), NM-3 killed (2), NM-4 killed (1), NM-5 killed (2). NM-1 is M1's.

### Class Sweep

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| CR-20. Class: a comparison, in the Pusher consumer or its producer, that lets two distinct hash strings read as one value; and a producer payload that a subscriber decodes to something other than the string sent. The reviewer's enumeration is `collision.mjs` (pairs and a model) and his two probe cases; they locate the compare and the delivered value, not every site. The grep below is derived by me. | `grep -rn "asDelivered\|asPusherDelivers" src`; `grep -rn "\.trigger(" src --include=*.ts --include=*.tsx --exclude-dir=__tests__`; `grep -rn "\.bind(\|bind_global" src --include=*.ts --include=*.tsx --exclude-dir=__tests__`; `grep -rl pusher ../project-utils/src ../preview-image-generator/src` (ts, tsx, js, mjs) | decode helpers: 0 hits. Triggers: 1 (`shared.ts:274`, now JSON-encoded). Binds: 2 (`usePusher.ts:62`, the one Pusher consumer, exact compare; `components/Drawer/index.tsx:242`, a gesture handler's `{...bind()}`, not Pusher). Other repos' `src`: 0 files listed | the trigger: fixed. the consumer: fixed. Drawer: not applicable. No other producer or consumer of a Pusher payload exists. Residual 0 (before the fix: 1 helper with 3 uses in `usePusher.ts` and 1 transcription in the test file) |
| CR-20, as the instrument saw it: a test that can only see a collision through the old frame | `grep -n "broadcast(" src/providers/MessageProvider/__tests__/MessageProvider.own-save-notice.test.tsx` and `grep -c "" ` on the producer file's case list | the consumer file's `broadcast` hands the handler the producer's string; the producer file decodes the real trigger arguments | the producer file is the instrument that sees the frame, see the departure above. Not applicable beyond that. Residual 0 |

### Test Execution Results (fix round 4)

| Command | Result |
|---|---|
| Red, new and tightened files against the unchanged production of `42d15de` | 21 failed of 69 (above) |
| `src/providers/MessageProvider` and `shared.upsert-broadcast.test.ts`, network isolated (`unshare -rn`), at `60252be` | 122 of 122, 9 files, exit 0 (`green/focus.json`, `.out`) |
| Full suite at `60252be`, network isolated | 1846 of 1846, 144 files by the reporter's `testResults`, vitest exit 0 (`green/full-suite.json`, `.exit`); 1829 + 6 consumer + 11 producer = 1846, 143 + 1 = 144 |
| `pnpm run typecheck` at `60252be` | exit 0, both programs (`green/typecheck.exit`) |
| `eslint` on the four files | exit 0 |
| `convention-check.js website --since=42d15de` | 0 FAIL, 0 CANDIDATE, 18 SKIP (17 `.playwright-mcp` images, held, not mine; the ID-token/basename check, which the tool says it does not implement verbatim: unchecked, not passed; by hand the new file is `shared.upsert-broadcast.test.ts` and its titles carry no ID token) (`convention-check-60252be.out`) |

The first comment on the new producer file was refused by the comment gate and removed; one lint rule (`class-methods-use-this`) on the first form of the `pusher` mock was met by the `vi.fn` form the sibling files use. Both disclosed in the round.

### Hand-off

Website tip moves `42d15de` to `60252be` (production: `shared.ts`, `usePusher.ts`; tests: the two files above). This expires, at `42d15de`: code review Round 9's REJECTED verdict is the one to re-read, M2's QA Phase 2 for the fix round,
the architect's read of the wire, and UAT's re-walk of B-1, which no longer needs to place runs by frame hash.
Not done: the disconnect (M2-d). QA's AF-25 (a case running pusher-js's real decode over the producer's frame) is the architect's LOW recommendation held for the planner's fold; the producer file's decode is a transcription of it.

## Fix Round 5 — M2-d (the tab's Pusher connection closes with its effect) and EC-6 (the wire case)

Brief: `steering-roadmap-hooks`, 2026-11-19: the disconnect hold lifted; all three pre-code reads of plan revision 10 have passed (critic `012ee2b`, architect `410044e`, QA Phase 1 re-key `9e212a3`).
Entry conditions: QA's EC-5 (one case per member of M2-d, each `new Pusher` with its own spies) and EC-6 (AF-25's wire case). Code review approved the hash fix at `60252be` (review `f5f3346`); this round sits on it.

### Entry Conditions (this round)

| Condition | Where satisfied | Pinned by |
|---|---|---|
| EC-5, one case per member: unmount; the id changes; the message stops being an `ApiMessage` | `usePusher.update-prompt.test.tsx`, a new `describe` of 3 cases; each `new Pusher` pushes its own instance with its own `disconnect` spy onto `hoisted.instances`, in construction order | those 3 cases; mutants `nm42`, `nm43`, `nm45` |
| EC-5, "extend `usePusher.update-prompt.test.tsx` or say why the mounted-provider file is the place" | extended. The three members are the hook's effect and its dependency, `messageRef.current`'s `id`, which the provider passes as `useLatest(message)`; the harness's `messageRef` is that ref. The mounted provider adds the pathname-to-id step (`useParsePathname`), which the criterion does not name; no harness extension (`navigationMock`) was needed | not owed |
| EC-5, all four `pusher-js` mocks gain `disconnect`, case counts and pass sets unchanged, exit 0 | `layout.navigation-guard`, `MessageProvider.stored-draft`, `MessageProvider.own-save-notice` each gained `disconnect: () => undefined`; the fourth is the spied mock above. Full suite 1850 of 1850, exit 0 | the full suite |
| EC-6, the real `pusher` with only `post` replaced, the frame decoded by pusher-js's own `Protocol.decodeMessage`; the ordinary hash and one member of each number-shaped sub-class; red against `4b8db9c`'s bare trigger line | `shared.upsert-broadcast.test.ts` rewritten on that form: 12 cases; the transcription `deliveredToSubscribers` and the `pusher` class mock are gone | mutant `nm39-producer-bare-hash` (the bare line): 9 killed; `nm40-producer-encodes-twice`: 10 killed |

The wire file imports pusher-js's protocol source through a variable specifier (`await import(PROTOCOL_MODULE)`): a static import puts the library's own TypeScript into the test program, and `pnpm run typecheck` then reports 4 errors in `node_modules/.pnpm/pusher-js@8.3.0/…/protocol.ts` and `message-types.ts` that are not this project's (measured, exit 2). The result is typed by a local interface (`SubscriberProtocol`).

### Change

`src/providers/MessageProvider/usePusher.ts`: the effect's cleanup gains `pusher.disconnect();` after `pusher.unsubscribe(...)`. Nothing else in the production code. Each effect run constructs its own instance, so the instance disconnected is the one that run created.

### User-visible flows

| Flow | Surface | Trigger | What happens next | Rung |
|---|---|---|---|---|
| Leaving a message's editor in-app | the browser's open WebSocket count, no on-screen element | an in-app link to another message's editor, or leaving the editor | the first message's Pusher socket is closed, one open socket remains | the existing effect cleanup, one line added; nothing new to see |

No flow holds a decision, so no ask is owed. M2-d's human-observable step is QA's B-15, walked by UAT beside B-1.

### Patterns Extended

| Surface | Pattern |
|---|---|
| The cleanup | the effect's own `channel.unbind()` and `pusher.unsubscribe(...)`; `disconnect` after them |
| Tests | `usePusher.update-prompt.test.tsx` (the plan's named test for the surface), its harness and mock extended: instances recorded, `messageRef` mutable and reset in `beforeEach`; `shared.upsert-broadcast.test.ts` rewritten on the real transport |

### TDD Compliance

Red run before the fix (`verification/017/m2d-fix/red-pre-fix-60252be/red.json`, `.out`: the extended `usePusher.update-prompt.test.tsx` and the rewritten `shared.upsert-broadcast.test.ts` against the unchanged `usePusher.ts` of `60252be`):
3 failed, 16 passed of 19. The 3 are the M2-d cases, `AssertionError: expected "vi.fn()" to be called 1 times, but got 0 times`. The 12 wire cases passed at `60252be` (the producer is already right there), as predicted.

TDD Gate: Test `keeps the connection open while mounted and closes it once when unmounted` fails as expected: `AssertionError: expected "vi.fn()" to be called 1 times, but got 0 times`. Proceeding to implementation.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `usePusher` cleanup, member 1: the provider unmounts | `usePusher.update-prompt.test.tsx` | Yes | Yes (red file above); mutants `nm42-no-disconnect` (3 killed), `nm45-disconnect-in-effect-body` (its "not disconnected while mounted" half) | AssertionError: 0 calls against 1 | Yes |
| `usePusher` cleanup, member 2: the id changes (instance 1 disconnected once, instance 2 open until unmount) | same | Yes | Yes (red file above); `nm42`; `nm43-disconnect-unmount-only-effect` (instance 1 never disconnected on the change) | AssertionError | Yes |
| `usePusher` cleanup, member 3: the message stops being an `ApiMessage` (one disconnect, no new instance) | same | Yes | Yes (red file above); `nm42`; `nm43` | AssertionError | Yes |
| producer broadcast on the real transport, 12 cases (the rewrite of the file's 11) | `shared.upsert-broadcast.test.ts` | rewritten | Green at `60252be` by construction; red from `nm39` (9) and `nm40` (10), the two producer mutants QA named | AssertionError: `number` against `string`; quotes in the decoded value | Yes |

Survivors, both reported, neither dispositioned away:
- `nm44-disconnect-latest-instance` (QA's mutant: disconnect the latest instance, held in a module variable, instead of this run's): **survived** (0 of 159 failed). React runs a run's cleanup before the next run's body,
  so at cleanup time the latest instance is that run's own; the two forms never differ in an order React produces. Disposition: equivalent under React's effect ordering; no case can tell them apart
  without an effect order React does not produce; the id-change case asserts the exact per-instance calls and passes under it. QA's expectation for NM-44 (instance 2 not disconnected, instance 1 disconnected) holds for both forms.
- an extra, not QA's: dropping `channel.unbind()` (line unchanged by this diff) survives; `disconnect` closes the socket the binding lives on. A pre-existing line, outside this round; named for QA.

Mutants (isolated exports of `git archive 33e59f7`, exact-once edits, network isolated, process group killed at 300 s; driver `verification/017/m2d-fix/run-mutants.py`, results `33e59f7/summary.txt`, `leftover exports: 0`):
control 0 of 159 failed; `nm39` 9, `nm40` 10, `nm42` 3, `nm43` 2, `nm45` 2 killed; `nm44` and the `unbind` extra survived. NM-41 (the consumer parses one side) is the earlier round's `record-decoded` and `shown-decoded`, whose guards this diff does not touch.

Self-check sweep (`mutant-gen.js --range 60252be..33e59f7`): 0 operator mutants (the one added production line is a statement call; the files changed under test are test files, which the tool names as skipped). The named mutants above stand in.
QA's Named mutants NM-2 to NM-5 not re-run: `git diff -U0 60252be 33e59f7` over `usePusher.ts` and `shared.ts` shows one added line, `pusher.disconnect();`; their guards (the record push, the splice, the shown-content clause) are untouched.

### Class Sweep

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| M2-d. Class: a pusher-js instance this tab constructs that its effect's cleanup does not close; and a test mock of `pusher-js` without `disconnect`. Derived by me; the criterion carries none. | `grep -rn "new Pusher(" src --include=*.ts --include=*.tsx --exclude-dir=__tests__`; `grep -rln "pusher-js" src ... --exclude-dir=__tests__`; `grep -rn "disconnect" src ... --exclude-dir=__tests__`; `grep -rc "vi.mock('pusher-js'" src` | `new Pusher(`: 2: `usePusher.ts:57` (pusher-js, the client) and `shared.ts:266` (the `pusher` server package, an HTTP client with no connection and no `disconnect`). `pusher-js` imports: 1 file, `usePusher.ts`. `disconnect` in production: 1 (`usePusher.ts:82`, new). Test mocks of `pusher-js`: 4 files, 1 each | `usePusher.ts:57`: fixed. `shared.ts:266`: not applicable, no connection. The 4 mocks: all define `disconnect` now (the file grep counts: `layout.navigation-guard` 1, `stored-draft` 1, `own-save-notice` 1, `update-prompt` 9). Residual 0 (before: 1 unclosed instance site, 3 mocks without `disconnect`) |

### Test Execution Results (fix round 5)

| Command | Result |
|---|---|
| Red, the extended and rewritten files against the unchanged production of `60252be` | 3 failed of 19 (above) |
| Full suite at `33e59f7`, network isolated | 1850 of 1850, 144 files by the reporter's `testResults`, vitest exit 0 (`m2d-fix/green/full-suite.json`, `.exit`); 1846 + 3 cases + 1 case = 1850 |
| `pnpm run typecheck` at `33e59f7` | exit 0, both programs (`m2d-fix/green/typecheck.exit`) |
| `eslint` on the six files | exit 0 |
| `convention-check.js website --since=60252be` | 0 FAIL, 0 CANDIDATE, 18 SKIP (17 `.playwright-mcp` images, held, not mine; the ID-token/basename check, which the tool says it does not implement verbatim: unchecked, not passed; by hand no new file, titles carry no ID token) (`convention-check-33e59f7.out`) |

Two gate stops this round, met by changing the work: the comment gate on a comment in the new file (removed in the first round, not re-added) and `prefer-arrow-callback`, `member-delimiter-style` and typecheck findings on the first forms of the wire file (arrow `post` spy, interfaces, the variable specifier above).

### Hand-off

Website tip moves `60252be` to `33e59f7` (production: `usePusher.ts`, one line; tests: the five files above). This expires, at `60252be`: nothing the reviewer approved, which is the hash fix. M2's QA Phase 2 is owed on the whole of `42d15de..33e59f7`;
QA's Assumption Not Checked (an in-app switch leaves the first socket open on the unfixed tree) is B-15's first run, QA's, before UAT executes it.

## Fix Round 6 — CR-21 (`nm44` is not equivalent)

Brief: code review Round 10 (`cfbdb2e`, plan R-56): REJECTED at website `33e59f7` on CR-21 MEDIUM, test-only; the production line is right. Required: one case with two hook instances live at once, the instance unmounted first not the one created last; red as an assertion under `nm44`, green at `33e59f7`.

### Reconcile note (a record's correction, dated 2026-11-19T18:50)

Fix Round 5 said of QA's `nm44` (disconnect the latest instance, held in a module variable, instead of this run's): "equivalent under React's effect ordering; no case can tell them apart", and its Outstanding Items line repeated it.
That was defensible when written only for one hook instance's own runs, where a run's cleanup precedes the next run's body, so the latest instance is the run's own. I reasoned about the effect order of one instance and not about module-level state shared by instances.
With two hook instances mounted at once (two roots), unmounting the first runs its cleanup while the module variable holds the second's instance, so the second's connection is closed and the first's is not. That is the property M2-d states ("touches no other instance"), unreachable today with one `usePusher` site but stated.
The disposition is withdrawn. Fix Round 5's two lines stay as written above as the record of what I said.

Self-diagnosis, for the retrospective: I called a surviving mutant equivalent by an argument about ordering, without a case driving the path that could separate the two forms (a second live instance). This is the same method slip as `row-warning-enabled-dropped` in the M8 document (QAF-22): an equivalence argued from the structure I had read, not from a captured case.

### Change

Test only. `src/providers/MessageProvider/__tests__/usePusher.update-prompt.test.tsx`: `Harness` takes an optional `source` ref (default the file's `messageRef`, so every earlier case is unchanged), and one case is added to the M2-d `describe`:
"closes only the connection of the hook that unmounts when two hooks are mounted at once". Two roots, hook 1 created first (id `1`) and hook 2 created last (id `2`); the first is unmounted first: only instance 0's `disconnect` fires, once and instance 1's not at all; then the second is unmounted: instance 1's fires once and instance 0's stays at one.
No production change. No existing test already pinned two live instances (the file's M2-d cases are one hook at a time), so this is a new case in the file the criterion's cases live in.

### TDD Compliance

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `usePusher` cleanup disconnects its own instance only, two hooks live at once (M2-d: "touches no other instance") | `usePusher.update-prompt.test.tsx` | Yes (the production line already exists; a test-only fix) | Yes: mutant `nm44-disconnect-latest-instance` at `24e9be7` fails exactly this case, `AssertionError: expected "vi.fn()" to be called 1 times, but got 0 times` (`verification/017/m2d-fix2/24e9be7/nm44-disconnect-latest-instance.json`); green at `33e59f7`'s production line | AssertionError | Yes |

Mutants (isolated exports of `git archive 24e9be7`, the same driver as Fix Round 5, `verification/017/m2d-fix2/run-mutants.py`, `24e9be7/summary.txt`, `leftover exports: 0`): control 0 of 160 failed; `nm39` 9, `nm40` 10, `nm42` 4, `nm43` 3, `nm44` **1** (the new case alone), `nm45` 3 killed. The extra (`channel.unbind()` dropped, an unchanged line) still survives; reviewer's point 3 accepts it as outside this round.
The ordering of the two instances is the one the review asks for: the instance created last (2) is mounted last and unmounted last, so under `nm44` the first unmount closes instance 1's connection instead of instance 0's.

### Class Sweep

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| CR-21. Class: a mutant I dispositioned as equivalent (or a guard as unreachable) by an argument, without a captured case driving the path. Derived by me (the finding carries the instance, not the class). | `grep -c -i "equivalent" implementation/017-existing-items-backlog-m*-implementation.md`; and for the M2 document `grep -n -i "equivalent" implementation/017-existing-items-backlog-m2-implementation.md` | per file: m1 0, m2 2, m3 8, m4 1, m5 1, m6 4, m7 0, m8 5. The M2 document's 2 hits are both `nm44` (Fix Round 5's disposition and its Outstanding Items line) | M2's 2 hits: withdrawn above, case added, mutant killed. The other milestones' 19 hits are not re-swept here: their documents' dispositions each passed code review and the milestone's QA Phase 2 (the plan's Status-Detail: the other seven milestones keep QA Complete verdicts), and the M8 document's QAF-22 row already swept the M8 tables for this class (1 hit, withdrawn and killed, "no other row"); the owner of any further sweep is the retrospective, named here. Residual in the M2 document: 0 standing equivalence claims |

### Test Execution Results (fix round 6)

| Command | Result |
|---|---|
| Full suite at `24e9be7`, network isolated | 1851 of 1851, 144 files by the reporter's `testResults`, vitest exit 0 (`m2d-fix2/green/full-suite.json`, `.exit`); 1850 + 1 |
| `pnpm run typecheck` at `24e9be7` | exit 0, both programs (`m2d-fix2/green/typecheck.exit`) |
| `eslint` on the test file | exit 0 (a `max-len` warning on the first form of the `Harness` line removed by an interface) |
| `convention-check.js` | not re-run: the one test file changed, no comment, a title with no ID token by hand; the round before reported 0 FAIL on the same file |

### Hand-off

Website tip moves `33e59f7` to `24e9be7` (one test file). This expires: code review Round 10's REJECTED verdict is the one to re-read; QA's reading of `nm44` as an equivalent candidate in Phase 2 (my Fix Round 5 line) is superseded by the case. Return to `code-reviewer-hooks-017` for its Round 10 sub-entry.

## Fix Round 7 — QAF-27 (a payload that is not a string)

Brief: `qa-hooks-017`, 2026-11-19: M2's QA Phase 2 at website `24e9be7` is QA Failed on QAF-27 MEDIUM (record `qa/017-existing-items-backlog-m2-qa.md` § "Phase 2 on M2's fix rounds 3 to 6", agent-output `7f758aa`; plan row R-58, `686b810`). The fix is test-only.
Finding: nothing asserts that a payload which is not a string raises the notice. Fix Round 4 and AF-26 rely on it; every consumer case hands the handler a string, so `record == hash` and `hash != shownHash` both survive.
The remedy is QA's (`verification/017/qa-m2-r4/nonstring-payload-cases.txt`); I took it as written, the two cases verbatim.

### Change

Test only. `src/providers/MessageProvider/__tests__/MessageProvider.own-save-notice.test.tsx`: two cases added at the end of the file's one `describe`, tightening the file that already holds the consumer's compare (it covers the surface; no sibling file):
1. "raises the notice when a payload that is not a string arrives while this tab holds a record of a save with the same digits": save a message whose hash is digits only, edit, hand the handler the held record's hash as a number; the notice is raised. It alone kills the loose record compare.
2. "raises the notice when a payload that is not a string arrives with the digits of the shown content's hash": the shown content's hash as a number; the notice is raised. It alone kills the loose shown compare.
Each asserts its fixture's hash against `/^[1-9][0-9]*$/` before it delivers it, so a fixture that stops being digits-only fails there and not silently. No production change.

### User-visible flows

Touches no user-visible surface (tests only).

### Patterns Extended

| Surface | Pattern |
|---|---|
| Tests | the file's own helpers (`mountStored`, `edit`, `save`, `sentHash`, `remoteHash`, `noticeShown`); the handler is driven through `hoisted.handler`, as `broadcast` does, with a number in place of the string |

### TDD Compliance

The production compare is already exact (`60252be`), so the cases are green at the tip by construction and the red is a mutant of the production line, the form a test-only fix takes (TDD rows' "mutation stands in for red against the pre-change code": here the pre-change code is the loose compare).

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| handler: a held record compares exactly (a number whose digits equal a held record's hash string is not that record) | `MessageProvider.own-save-notice.test.tsx` | Yes (the production line already exists; a test-only fix) | Yes: mutant `nonstring-loose-record` (`record === hash` to `record == hash`) at `7293a35` fails this case alone, `AssertionError: expected false to be true` (`verification/017/nonstring-fix/7293a35/nonstring-loose-record.json`) | AssertionError | Yes |
| handler: the shown content compares exactly (a number whose digits equal the shown hash string is not the shown content) | same | Yes (same) | Yes: mutant `nonstring-loose-shown` (`hash !== shownHash` to `hash != shownHash`) at `7293a35` fails this case alone, same assertion (`.../nonstring-loose-shown.json`) | AssertionError | Yes |

TDD Gate: Test `raises the notice when a payload that is not a string arrives while this tab holds a record of a save with the same digits` fails as expected under `nonstring-loose-record`: `AssertionError: expected false to be true`. Proceeding (production unchanged; the case is the spec of the existing compare).
TDD Gate: Test `raises the notice when a payload that is not a string arrives with the digits of the shown content's hash` fails as expected under `nonstring-loose-shown`: `AssertionError: expected false to be true`. Proceeding (production unchanged).

Mutants (isolated exports of `git archive 7293a35`, one exact-once edit each, vitest over `src/providers/MessageProvider`, network isolated, process group killed at 300 s; driver `verification/017/nonstring-fix/run-mutants.py`, results `7293a35/summary.txt`, `leftover exports: 0`):
control 0 of 117 failed; `nonstring-loose-record` 1 killed (the first case), `nonstring-loose-shown` 1 killed (the second case). QA's own runs of the same two mutants (`qa-m2-r4/nonstring-loose-{record,shown}.*`) agree.

Self-check sweep: `mutant-gen.js` has nothing to mutate, the diff holds no production line (`git diff -U0 24e9be7 7293a35` over `src`: one file, the test). QA's Named mutants not re-run: no guard they name is touched by this diff.

### Class Sweep

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| QAF-27. Class: a comparison in a handler of a value that arrives from outside (the Pusher payload) with no case in which the value is not the type the compare expects, so a loose compare survives. Derived by me; QA's finding carries the two compares. | `grep -n "===\|!==\|==\|!=" src/providers/MessageProvider/usePusher.ts` (production compares in the one Pusher consumer) and `grep -rn "\.bind(" src --include=*.ts --include=*.tsx --exclude-dir=__tests__` (consumers of a payload) | see Residual below | see Residual below |

Residual: the handler's compares on the payload are the two QAF-27 names (`record === hash` in the `findIndex`, `hash !== shownHash`); both now have a case that a loose form fails. The only other `bind(` hit is `components/Drawer/index.tsx`, a gesture handler's `{...bind()}`, not a payload (Fix Round 4's sweep, same result). Residual 0 compares without a non-string case.
The `ownSaveIndex < 0` and `>= 0` compares in the same function are on a number this code computes, not on the payload: not applicable.

### Test Execution Results (fix round 7)

| Command | Result |
|---|---|
| `src/providers/MessageProvider/__tests__/MessageProvider.own-save-notice.test.tsx`, network isolated, at `7293a35` | 60 of 60 |
| Full suite at `7293a35`, network isolated | 1853 of 1853, 144 files by the reporter's `testResults`, vitest exit 0 (`nonstring-fix/green/full-suite.json`, `.exit`); 1851 + 2 |
| `pnpm run typecheck` at `7293a35` | exit 0, both programs (`nonstring-fix/green/typecheck.exit`) |
| `eslint` on the test file | exit 0 |
| `convention-check.js` | not re-run: one test file, no comment, titles carry no ID token by hand (the reporter's own titles above); the round before reported 0 FAIL on the file's rules |

### Hand-off

Website tip moves `24e9be7` to `7293a35` (one test file, +22 lines). Return to `qa-hooks-017` for QAF-27's re-check (its remedy built as given); code review's Round 10 approval concerned `24e9be7`, and this diff holds no production line.

## Outstanding Items

- Fix round 3: nothing owed before hand-off. The walk of B-1 at the tip is UAT's.
- Fix round 4: the Pusher disconnect (D-34, M2-d) is owed and held for QA Phase 1's re-key of revision 10; it will be its own round on `usePusher.ts`'s cleanup. Fix Round 3's follow-up (1), the producer-side exact fix, is done here.
- Fix round 7: nothing owed; QAF-27 is QA's to re-check.
- Fix round 6: `nm44` is withdrawn as an equivalent and killed (Fix Round 6); the `channel.unbind()` survivor remains QA's to judge.
- Fix round 5: the disconnect is built (Fix Round 5). Open: `nm44` survives as an equivalent under React's effect ordering, and dropping `channel.unbind()` survives (unchanged line) — both for QA's Phase 2 judgement. The pathname-to-id step of the mounted provider is not exercised by the member-2 case; B-15 (UAT) is its observation.
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
- CR-4 LOW (code review round 2): M2-a lists 11 AN-1 members and `MessageProvider.own-save-notice.test.tsx` covers 10.
  The missing one, "not valid (fails shape) / nothing changed", is unobservable at the client: the router rejects the
  input, so nothing is broadcast; its record removal is covered by "a later save of the content of a save that failed".
  No test is owed (the reviewer's own disposition).
- CR-3 MEDIUM (code review round 2): `useSaveWith`'s `use` prefix hid a rules-of-hooks finding. Resolved with the
  reviewer's preferred form: the two `persist` cases left `useApiMethods.json-editor-repair.test.ts` and are now
  `useApiMethods.own-save-record.test.tsx`, which renders the hook for real (`createRoot`/`act`, no React stub) and reads
  the ref; the stubbed-`useState` file is back to its M1 content and the concern of QAF-16 no longer applies to M2's cases.
  Committed in the M3 sequence at website `442059d`.
- QAF-15 (M1's QA): see the M1 document's correction; the instrument for M7-b is the whole-tree capture.

## Next Steps

Fix round 7: QA Phase 2 re-check of QAF-27 at website `7293a35` (range `24e9be7..7293a35`, test-only), then UAT's B-1 and B-15 walks.
Fix round 6: code review Round 10 sub-entry at website `24e9be7` (range `33e59f7..24e9be7`, test-only), then as below.
Fix round 5: code review at website `33e59f7` (range `60252be..33e59f7`, `code-reviewer-hooks-017`), then QA Phase 2 on `42d15de..33e59f7` with B-15's first run, the architect's wire read, UAT's B-1 and B-15 walks.
Fix round 4 (approved, review `f5f3346`): code review at website `60252be` (range `42d15de..60252be`, `code-reviewer-hooks-017`, its Round 9 sub-entry; re-read M7-b at the new tip), then QA Phase 2, the architect's wire read, UAT's B-1 re-walk; the disconnect round after QA's re-key.

Fix round 3: code review at website `42d15de` (range `4b8db9c..42d15de`, `code-reviewer-hooks-017`), then QA Phase 2 for the fix, an architect delta read, and UAT's re-walk of B-1.
Earlier rounds: code review of M2 at `ec984fe`, then M3 (done).
