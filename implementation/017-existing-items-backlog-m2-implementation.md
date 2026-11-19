---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Handoff-At: 42d15de — repos=website; fix round 3 (UAT-1), production change in usePusher.ts; supersedes dd26104 (fix round 2, test-only)
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

## Outstanding Items

- Fix round 3: nothing owed before hand-off. The walk of B-1 at the tip is UAT's.
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

Fix round 3: code review at website `42d15de` (range `4b8db9c..42d15de`, `code-reviewer-hooks-017`), then QA Phase 2 for the fix, an architect delta read, and UAT's re-walk of B-1.
Earlier rounds: code review of M2 at `ec984fe`, then M3 (done).

## Resumption State

Written 2026-11-19T11:28Z by implementer-hooks-017 at steering's checkpoint request (steering-roadmap-hooks). Supersedes the "Resumption State" in `implementation/017-existing-items-backlog-m5-implementation.md` (its UAT-1 item is closed by Fix Round 3 above).

- **Done:** UAT-1 diagnosed and fixed as Fix Round 3 above (website `8e1ccef`, `42d15de`; agent-output `9a950f3`). Handed to code review.
- **Review result:** Round 9 REJECTED at `42d15de` on CR-20 MEDIUM (review at agent-output `d8aa235`, plan R-49 `9aea256`, probe and model under `verification/017/code-review/m2-uat1/`): the delivered-form compare lets distinct hashes that decode equal (every ±Infinity hash, `1e10`/`10e9`, `100000`/`1e5`) suppress another tab's notice, via the shown-content compare alone. Diagnosis accepted; remedy required by the reviewer is the producer-side route.
- **HOLD (steering, 11:3xZ):** no code change and no website commit for CR-20 until steering relays the owner's answer. Reason: the remedy edits `shared.ts`, outside M2's listed surfaces; the planner holds it as a scope delta; steering's `steering/017-rulings.md` block 11:10Z puts it to the owner (owner-wait key `m2-hash-residue`): 1(a) exact fix in 017, or 1(b) a stated limit with `42d15de` standing; and 2 the pusher disconnect: (a) exclusion X-25, or (b) in 017. Reading and planning are allowed.
- **Next, if the answer is 1(a):** one round, red first.
  1. `src/server/api/utils/shared.ts` (`upsertMessage`, `pusher.trigger(genMessageChannelKey(message.id), 'message-update', …)`): send `JSON.stringify(hashMessage(message))` (pusher@5.1.3 `ensureJSON` sends a string as-is; pusher-js 8.3.0 `decodeMessage` decodes it back to the exact string). `shared.ts` has tests on the trigger: find and tighten the covering one before adding any.
  2. `usePusher.ts`: remove `asDelivered`; keep `hash: unknown` with a `typeof hash === 'string'` guard; exact string equality for the record compare and the shown-content compare. Records, `recordOwnSave`, `forgetOwnSave`, `persist` unchanged.
  3. `MessageProvider.own-save-notice.test.tsx`: `asPusherDelivers` models the new frame (stringify, then the library decode); add colliding pairs found by search, not hand-picked, for the shown-content compare and the held-record compare (the reviewer's examples: contents giving `-23e49110` and `-2337e571`, both ±Infinity, in `code-review/m2-uat1/probe-block.tsx`); red as assertions at `42d15de`, green after; keep the number-shaped own-save cases (they stay green on the new wire). Class Sweep table, mutants named per row, sweep over `4b8db9c..<tip>`'s still-changed lines, QA's NM-2 to NM-5 re-run, convention-check, full suite with exit code, typecheck. The M2 document gets a Fix Round 4 section; `Handoff-At` moves; return the fix SHA to `code-reviewer-hooks-017` (for its Round 9 sub-entry; it re-reads M7-b at the new tip).
  4. If 2(b): `pusher.disconnect()` in the effect cleanup, same file, same round.
  If 1(b): nothing owed from me beyond what steering sends.
- **Branch and HEAD:** website `chain/017-existing-items-backlog` at `42d15de`; agent-output `master`, last seen `5834a86` (steering). Nothing of mine uncommitted or mutated. The tree's other modified files are other sessions' work.
- **Evidence run and recorded:** all in `verification/017/uat1-fix/` (committed in `9a950f3`): `run-mutants.sh`, `8e1ccef/`, `42d15de/`, `*-sweep/`, `named-mutants-42d15de.json`, `42d15de-named/`, `red-pre-fix-8e1ccef/`, `full-suite-42d15de.summary.json`. Nothing run and unrecorded. The fixture search (`c0` to `c59999`, the real `hashMessage`) left no file but its result is in the Fix Round 3 TDD section; re-run through a throwaway test file with the `~/env.mjs` mock, writing to a file (console output is filtered).
- **Questions sent:** to `steering-roadmap-hooks` (11:2xZ, ready to build 1(a) on word); to `code-reviewer-hooks-017` (CR-20 accepted, holding). Pending: the owner's answer through steering.
- **Wake:** `52cf517b` deleted at this checkpoint. Re-arm on the next turn.
- **Notes for the record:** never record safeguard or security blocks in agent-output (standing owner prohibition); the gate refusals of this round were disclosed in chat only. Tools: use Edit/Write for record documents; for shell reads of the tree, absolute paths.
