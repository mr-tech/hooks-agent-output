---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Handoff-At: 1ab3b96 — repos=website; fix round 1 (CR-6, CR-7, CR-8), test-only
---

# Implementation 017 — M3: a stored draft survives sign-in, another tab and an expired-session sign-out (item 4, D-11)

## Plan Reference

`agent-output/planning/017-existing-items-backlog.md`, revision 4, milestone M3 (M3-a to M3-h). Website chain
branch `chain/017-existing-items-backlog`; M2 is `ec984fe` (`implementation/017-existing-items-backlog-m2-implementation.md`),
whose fix round `dd26104` is APPROVED (code review round 2 sub-entry, `fb4c5f3`) and QA Complete (`b77fb74`).

## Date

2026-11-19.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-19T01:12 | implementer-hooks-017 | Document opened with the design read from the plan and the flows below; no code yet. |
| 2026-11-19T02:17 | implementer-hooks-017 | Resumed after the checkpoint. The 14 self-check survivors dispositioned (9 closed by cases at `08124a4`, 5 stated equivalent), QA's NM-6, NM-7, NM-27 and NM-28 run against the built code, a mounted test added for the edit page's Log in (`3498ef3`), convention-check FAILs that were M3's removed, full suite and typecheck at `3498ef3`. Handed to code review at `3498ef3`; Resumption State removed. |
| 2026-11-19T02:19 | implementer-hooks-017 | Checkpoint at the hand-off seam (context 212K) before M4: Resumption State written; no change to the handed-over tree. |
| 2026-11-19T02:29 | implementer-hooks-017 | Fix round 1 on code review Round 3 (REJECTED at `3498ef3`: CR-6, CR-7, CR-8), tests only: the provider's restore cases compare name and data whole, the legacy key's form is asserted as literals, the `1ad625e` reader is run on the tip's string, CR-8 recorded as a deviation. Handoff-At moved to `1ab3b96`. |

## Implementation Summary

A draft is no longer one `message` key shared by every tab. `LocalStorage.messageDrafts` maps an entry key to
`{ data, name, editedAt }`: `0:<tab id>` for a tab's route-0 draft, the message id for unsaved edits on a saved
message. `src/utils/messageDrafts.ts` holds the rules over it (the bound of 20 entries and 1 MiB serialised, evict
the least recently edited other entry and retry on a refused write, the route-0 copy-in for a new tab, migration of
the old `message` key, the tab id in `sessionStorage`). `withLocalStorage.set` returns whether the write landed and
no longer throws on a refused `setItem`. `MessageProvider` reads and writes by those keys, so a draft survives
sign-in (route 0 restores the tab's own draft), another tab (a new tab at route 0 gets the most recently edited
route-0 draft) and an expired-session sign-out (unsaved edits on message *n* come back when *n* is opened).
`hasChanged` loses its session condition, so the browser's unload prompt now shows signed out too; the three exits
that lose nothing (`InfoPanel` Log in, `NavMenu` sign-in, the `SessionProvider` sign-out on a stale cookie) leave
through `leaveWithoutAlert`, which lowers the prompt for the act only (D-18).

## Milestones Completed

M3-a to M3-h, built in four slices: (1) shared quota behaviour (M3-g, M3-h/OQ-12) at `d9ebe97`; (2) the draft rules
module (M3-h bound, M3-c rule, M3-e migration, M3-f legacy write) at `d9ebe97`; (3) provider wiring (M3-a, M3-b, M3-c,
M3-e, M3-f) at `79144cb`; (4) `hasChanged` and the D-18 suppression (M3-d, NM-7, NM-27, NM-28) at `536b8e6`. The
self-check round is `08124a4` and `3498ef3`, tests and lint only; no production line moved after `536b8e6`.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | `steering/017-rulings.md` block 2026-11-19T00:29Z; M3 follows M2 in the plan's order; resumed on `steering-roadmap`'s message after the M2 re-verdicts | not owed |
| QA Phase 1 covering M3 | `qa/017-existing-items-backlog-qa.md` at `3af80aa`, § M3, QAF-6, NM-6, NM-7, NM-27, NM-28 | not owed |
| Open questions | none open that M3 depends on: OQ-8 (D-18), OQ-11 (D-22), OQ-12 (D-23), D-25 are answered | not owed |
| Flows holding a decision | none: each flow below is covered by a recorded decision, so no ask goes to `steering-roadmap` | not owed |
| QAF-6, shared-code reach of the storage change | `theme`, `frequentlyUsedEmojis`, `client_preferences` and the list-view keys read and write exactly as before | `withLocalStorage.stored-keys.test.tsx` ("the keys stored as before"); NM-6 killed |
| M3-d, `hasChanged` over three statuses by two cells | each status is the sole carrier in at least one cell | `MessageProvider.stored-draft.test.tsx` ("hasChanged for every session status"); NM-7 killed for each of the three statuses |
| D-18 exits, X-8 Log out keeps its prompt | sign-in and stale-cookie sign-out lower the prompt, Log out does not | `NavMenu.sign-in-and-out.test.tsx`, `SessionProvider.stale-cookie-sign-out.test.tsx`, `page.sign-in-exit.test.tsx`; NM-27 killed |
| Code review CR-4 (M2-a's eleventh member, carried to this document) | disposition recorded under Outstanding Items | not owed (the code review: "no test is owed") |

## User-visible flows (derived from the codebase, no ask owed)

M3 touches user-visible surfaces (the editor's restore of a draft; the browser's unload prompt). Every behaviour is
stated by the plan and decided: D-11 (fix at source, warnings on signed out), D-18 (sign-in exits and the expired-session
sign-out leave without the prompt), D-22/D-23 (bound and quota), D-25 (two tabs on one message share a draft).
No new view, input or trigger exists; no flow holds an undecided choice.

| Flow | Surface | Trigger | What happens next | Rung of the pattern ladder |
|---|---|---|---|---|
| Draft restored after sign-in | `/message/m/0/edit` editor | the user returns to route 0 after OAuth | the tab's own route-0 draft shows | rung 1: the route-0 effect already restores a stored draft; extended per tab |
| Unsaved edits on a saved message survive sign-out | `/message/m/<n>/edit` | session lost, redirect to route 0, sign in, open *n* | the editor shows the unsaved edits, as a reload does | rung 1: `getMessage`'s newer-local preference, now per message |
| New tab at route 0 | `/message/m/0/edit` | a tab opened with no draft of its own | the most recently edited route-0 draft is copied in and shown | none exists for per-tab drafts: the plan states the rule |
| Browser prompt on close/reload, signed out | the page unload | `hasChanged` true | "Changes you made may not be saved." | rung 1: `useUnloadAlert`, unchanged for signed in |
| Sign-in exits leave without the prompt | `InfoPanel` Log in, `NavMenu` sign-in, `SessionProvider` sign-out | the act | no prompt (D-18) | none exists; one act-keyed suppression (NM-27, NM-28) |

## Files Modified

| Path | Changes | Lines |
|---|---|---|
| `src/utils/withLocalStorage.ts` | `set` returns whether the write landed, catches a refused `setItem`, dispatches `storage` only on success | +6 −2 |
| `src/utils/hooks/useLocalStorage.ts` | the unused `useLocalMessageStore` removed | −3 |
| `src/@types/global.d.ts` | `LocalStorage.messageDrafts`, `MessageDraft`, `MessageDrafts` | +4, then a comma delimiter (+1 −1) |
| `src/providers/MessageProvider/index.tsx` | draft reads and writes by entry key; `hasChanged` without a session condition; creating-save removal | +38 −21 |
| `src/utils/hooks/useUnloadAlert.ts` | the prompt callback returns `!isLeavingWithoutAlert()` | +3 −1 |
| `src/app/_components/NavMenu.tsx` | the signed-out `signIn` goes through `leaveWithoutAlert` | +2 −1 |
| `src/app/message/m/[id]/edit/page.tsx` | `InfoPanel` `onContinue` goes through `leaveWithoutAlert` | +2 −1 |
| `src/providers/SessionProvider.tsx` | the stale-cookie `signOut` goes through `leaveWithoutAlert` | +2 −1 |
| `src/providers/MessageProvider/__tests__/helpers/messageProviderDeps.ts` | `buildApiMock` runs the latest mutation options, as react-query does | +10 −5, then −1 (a comment the gate rejects) |
| `src/providers/MessageProvider/__tests__/MessageProvider.own-save-notice.test.tsx` | `onSuccess` is given its variables | +4 −1 |
| `src/providers/MessageProvider/__tests__/MessageProvider.save-step.test.tsx` | storage cleared between cases | +1 |
| `src/utils/__tests__/messageDrafts.bound-and-recency.test.tsx`, `src/providers/MessageProvider/__tests__/MessageProvider.stored-draft.test.tsx` | cases added or tightened at `08124a4` (below) | +21 −3, +19 |

## Files Created

| Path | Purpose |
|---|---|
| `src/utils/messageDrafts.ts` | the draft rules over the store: bound, evict-and-retry, most-recent route-0 draft, migration, tab id |
| `src/utils/leaveWithoutAlert.ts` | the act-keyed suppression of the unload prompt, re-armed after the exit |
| `src/utils/__tests__/withLocalStorage.stored-keys.test.tsx` | the keys stored as before; a refused write (9 cases) |
| `src/utils/__tests__/withLocalStorage.server-render.test.ts` | no browser: reads the default, a write reports it did not land (Node environment, hence `.ts`) |
| `src/utils/__tests__/messageDrafts.bound-and-recency.test.tsx` | the draft rules (23 cases) |
| `src/providers/MessageProvider/__tests__/MessageProvider.stored-draft.test.tsx` | the provider's restore, save, reload and `hasChanged` behaviour (27 cases) |
| `src/utils/hooks/__tests__/useUnloadAlert.act-suppression.test.tsx` | the prompt, its suppression for an exit and its re-arm (6 cases) |
| `src/providers/__tests__/SessionProvider.stale-cookie-sign-out.test.tsx` | the stale-cookie sign-out leaves without the prompt; nothing else signs out (3 cases) |
| `src/app/_components/__tests__/NavMenu.sign-in-and-out.test.tsx` | sign-in leaves without the prompt, Log out keeps it (2 cases) |
| `src/app/message/m/[id]/edit/__tests__/page.sign-in-exit.test.tsx` | the edit page prompts on unload and its Log in leaves without it (2 cases) |

## Patterns Extended

| Surface | Pattern extended | Rung |
|---|---|---|
| `MessageProvider/index.tsx` `getMessage`, the route-0 effect | the newer-local preference and the route-0 restore, keyed per entry now | in-file |
| `withLocalStorage` / `useLocalStorage` | the existing `{ get, set, remove }` factory; `set` gains a return value | in-file |
| `useUnloadAlert` | `useBeforeUnload`'s function form for the flag | in-file |
| `leaveWithoutAlert`, `messageDrafts` | none exists: the plan states the rules (D-18, D-22, D-23, D-25) | none |
| `MessageProvider` tests | `mountInMessageProvider`, `buildApiMock` helpers | in-repo |
| `NavMenu`, `edit/page`, `SessionProvider` tests | none mounted these before; they mount through `mountDom` and `press` and mock `next-auth/react`, `~/env.mjs` and, for `NavMenu`, `~/components/Dropdown` (rendered as buttons for each item with an `onPress` function) | in-repo helpers, no prior test on these surfaces |

Sibling sweep (rule: a shared pattern is fixed once, in the shared code): predicate 1, text: the wrap
`leaveWithoutAlert(` over `src` excluding tests gives 3 call sites (`NavMenu.tsx:142`, `edit/page.tsx:155`,
`SessionProvider.tsx:15`; `class-sweep-leave-sites.out`), the plan's three rows. Predicate 2, reference query: the
exits that leave by `signIn(` or `signOut(` outside tests are those three plus `NavMenu.tsx:141` (`signOut`, the Log out
row, which must keep its prompt: X-8). The Serena `find_referencing_symbols` instrument is not available in this session, so the reference query
was not run; the text predicate was read at `3498ef3` and the plan's table enumerates the same four rows.

## TDD Compliance

Slices 1 to 4 were test-first; the red captures are under `verification/017/impl/m3/`. The first row of each new
module is the compile-time red (module not found); every other row is an assertion-level red against pre-change
code, or a named mutant of a single guard in the sweep below. Rows added in the self-check round (`08124a4`,
`3498ef3`) are written after the code they cover, for survivors the sweep exposed: their "Written first" cell is No,
closed by the named mutant (a one-change body-level stub of the guard) failing the case, and the green at the real code.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `withLocalStorage.set` returns the write result, no throw, no `storage` event on refusal (4 cases) | `withLocalStorage.stored-keys.test.tsx` | Yes | Yes, `m3/red-quota.out` | AssertionError (`DOMException` thrown; return value) | Yes |
| keys other than `message` read and written as before (5 cases) | same | Yes | NM-6 (`JSON.stringify` for every key) killed, `m3/08124a4-sweep/NM-6-reencode-other-keys.result.json` | AssertionError | Yes |
| `messageDrafts` module: `writeDraft`, `readDrafts`, `removeDraft`, `routeZeroDraftFor`, `writeRouteZeroDraft`, `removeRouteZeroDraft`, `tabId` (first row) | `messageDrafts.bound-and-recency.test.tsx` | Yes | Yes, `m3/red-drafts.out` | Failed to resolve import `../messageDrafts` (first row of a new module) | Yes |
| the 20-entry and 1 MiB bound; eviction by recency whatever the write order | same | Yes (order-independence added at `08124a4`) | mutants `messageDrafts.ts:44:>`, `:46:&&`, `:46:>`, `:38:walk-last` killed in the first sweep; `:38:walk-first` survived `536b8e6`, killed `08124a4` | AssertionError | Yes |
| the 1 MiB boundary pair (exactly the limit kept, one character over drops the oldest) | same | No (added at `08124a4`) | mutant `messageDrafts.ts:45:>` (`>=`) survived `536b8e6`, killed `08124a4` | AssertionError | Yes |
| evict-and-retry on a refused write; a write that no entry can make room for returns false | same | Yes | mutants `:50:===`, `:50:false`, `:53:true` killed | AssertionError | Yes |
| most recently edited route-0 draft copied in for a new tab, regardless of insertion order | same | Yes (order made non-confounding at `08124a4`) | mutant `:67:walk-first` killed; `:67:walk-last` survived `536b8e6`, killed `08124a4` | AssertionError | Yes |
| migration of the old `message` key (2 cases of legacy shapes, no migration once the map exists) | same | Yes | mutants `:28`, `:29` (4) killed | AssertionError | Yes |
| provider: route-0 restore after sign-in, per-tab drafts, saved-message edits, creating-save removal, reload discards, `hasChanged` 3×2 (8 of 25 red at first) | `MessageProvider.stored-draft.test.tsx` | Yes | Yes, `m3/red-provider.json` (8 of 25 failing at assertion level; the failing case names are in the JSON) | AssertionError | Yes |
| a stored copy exactly as new as the saved copy is not preferred | same | No (added at `08124a4`) | mutant `index.tsx:41:>` (`>=`) survived `536b8e6`, killed `08124a4` | AssertionError | Yes |
| edits typed back to the saved copy leave no stored draft | same | No (added at `08124a4`) | mutant `index.tsx:174:if-false` survived `536b8e6`, killed `08124a4` | AssertionError | Yes |
| `hasChanged` without a session condition, over three statuses | same | Yes | NM-7 killed for `loading`, `unauthenticated` and `authenticated` | AssertionError | Yes |
| `leaveWithoutAlert` / `useUnloadAlert` (first row of a new module: prompt raised, suppressed during the exit, re-armed, lowered on failure) | `useUnloadAlert.act-suppression.test.tsx` | Yes | Yes, `m3/red-unload.out` | Failed to resolve import `~/utils/leaveWithoutAlert` | Yes |
| the flag re-arms after a successful exit; is lowered at once on failure | same | Yes | NM-28 both forms killed (`NM-28-flag-never-re-armed`, `NM-28-flag-stays-after-failed-exit`) | AssertionError | Yes |
| stale cookie and no session signs out through `leaveWithoutAlert`; a session or no cookie does not | `SessionProvider.stale-cookie-sign-out.test.tsx` | No (added at `08124a4`) | mutants `SessionProvider.tsx:15:if-false`, `:&&`, `:not` survived `536b8e6`, killed `08124a4` (1, 2, 2 cases) | AssertionError | Yes |
| `NavMenu` Log in leaves without the prompt, Log out keeps it | `NavMenu.sign-in-and-out.test.tsx` | No (added at `08124a4`) | NM-27 killed | AssertionError | Yes |
| the edit page's Log in leaves without the prompt | `page.sign-in-exit.test.tsx` | No (added at `3498ef3`) | mutant `NM-InfoPanel-log-in-keeps-prompt` (drops the wrap at `edit/page.tsx`) killed, `m3/3498ef3-sweep/` | AssertionError (`leavingDuring` false) | Yes |
| `withLocalStorage` with no browser: default read, write reports false | `withLocalStorage.server-render.test.ts` | No (added at `08124a4`) | mutant `withLocalStorage.ts:13:false` (`return true`) survived `536b8e6`, killed `08124a4` | AssertionError | Yes |
| the route-0 restore shows the stored draft's own `name` and whole `data` (CR-6) | `MessageProvider.stored-draft.test.tsx` | No (tightened at `1ab3b96`) | probe mutants `p1-route-zero-restore-drops-name` and `p2-route-zero-restore-drops-embeds` survived `3498ef3` (review Round 3), killed `1ab3b96` as assertions (`m3/1ab3b96-probe-sweep/`) | AssertionError (`toEqual` of name and data) | Yes |
| the saved-message restore (`getMessage`) shows the draft's own `name` and whole `data` (CR-6) | same | No (tightened and a seeded case added at `1ab3b96`) | probe mutant `p4-saved-message-restore-drops-embeds` survived `3498ef3`, killed `1ab3b96` | AssertionError | Yes |
| migration and copy-in keep name and embeds (CR-6 class) | `messageDrafts.bound-and-recency.test.tsx`, same provider file | Yes (unchanged) | probe mutants p5, p6, p7 killed at `3498ef3` and again at `1ab3b96` | AssertionError | Yes |
| the legacy `message` key holds `{ name, updatedAt, data }` and no `id`, as literals (CR-7 part 1) | same provider file | No (tightened at `1ab3b96`) | probe mutant `p3-legacy-write-carries-an-id` survived `3498ef3`, killed `1ab3b96` | AssertionError (keys and `toEqual`) | Yes |
| the `1ad625e` provider reads the tip's legacy string at route 0 (CR-7 part 2, M3-f's named instrument) | `verification/017/impl/m3/old-reader.route-zero-legacy.probe.test.tsx`, run in a `git archive 1ad625e` export, not in the suite | not owed (an instrument run, not a suite case) | positive: passes on the string a tip run wrote (`old-reader-1ad625e.out`, exit 0); negative control: the same string with an `id` shows the intro message and fails (`old-reader-1ad625e-control-with-id.out`, exit 1) | AssertionError in the control | Yes |

`tdd-check.py` refuses JavaScript and TypeScript, so the rows above are read, not tool-checked.

## Class Sweep

First delivery: the survivors are gaps the self-check sweep exposed in the code as first delivered, so each class gets
its enumeration (the sweep's own instrument sampled one site per class; the class is stated by effect).

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| Class A, an ordering or comparison rule asserted only on an input where a wrong rule gives the same answer (`index.tsx:41`, `messageDrafts.ts:38`, `:45`, `:67`) | `grep -n -E '^\+.*(\.sort\(\| > \| < \| >= \| <= \|slice\(\|\.length\|Object\.keys\|startsWith)'` over `git diff -U0 ec984fe 3498ef3 -- src ':!**/__tests__/**'` (`m3/class-sweep-ordering-sites.out`) | 9 hits: `index.tsx` `draft.editedAt > message.updatedAt`; `messageDrafts.ts` `slice(2, 12)`; `oldestOtherThan` keys and sort; `tooBig` count and size comparisons; the `length > 1` loop guard; `newest` keys, filter, sort | `editedAt >`: equal-timestamp case, mutant `>=` killed. `slice(2, 12)`: not applicable, the tab id is an opaque key (see Outstanding Items, survivors 6 and 7). `oldestOtherThan`: write-order case, `walk-first` killed. `tooBig` count: killed in the first sweep (`:44:>`); size: boundary pair, `>=` killed; `length > 1`: `:46:>` killed in the first sweep. `newest`: insertion order against recency, `walk-last` killed. Residual unkilled mutants over these sites after the fix: 2, both `slice(2, 12)`. |
| Class B, an exit wrapped by `leaveWithoutAlert` with no mounted test (`SessionProvider.tsx:15`) | `git grep -n "leaveWithoutAlert" -- src ':!**/__tests__/**'` (`m3/class-sweep-leave-sites.out`) | 3 call sites (`NavMenu.tsx:142`, `edit/page.tsx:155`, `SessionProvider.tsx:15`), 1 definition, 1 reader (`useUnloadAlert.ts`) | Each call site has a mounted test: `NavMenu.sign-in-and-out`, `page.sign-in-exit`, `SessionProvider.stale-cookie-sign-out`; mutants dropping the wrap at each killed (NM-27 for the Log out side; `NM-InfoPanel-log-in-keeps-prompt`; `SessionProvider.tsx:15` x3). Residual: 0 |
| Class C, a branch that only a Node-environment run reaches (`withLocalStorage.ts:13`) | `git grep -n "typeof window" -- src/utils/withLocalStorage.ts` | 3 hits (`get`, `set`, `remove`) | `get` and `set` are asserted in the Node file; `remove` is unchanged base code, not claimed. `set`'s `if (false && …)` mutant survives by construction: with no `window`, `localStorage.setItem` throws a `ReferenceError` that the `catch` turns into `return false`, the same answer (probe: `m3/08124a4-sweep/surv-withLocalStorage.ts_13_if-false.out`, the Node case passes with the guard disabled). The guard is kept for symmetry with `get`; no guard is removed. Residual: 1 equivalent mutant |

## Test Execution Results

Environment: website `chain/017-existing-items-backlog`, vitest 4.1.2; network-isolated (`unshare -rn`) for every
mutation run; mutations in `git archive` exports of the named SHA under the session scratchpad (`exp-m3`, `exp-m3b`),
node_modules linked read-only from the shared install, the shared tree never mutated.

| Command | Result |
|---|---|
| `npx vitest run --reporter=json` at `3498ef3` | 1618 of 1618 passed, 133 test files, 0 failed; process exit code 0 (`m3/vitest-m3-3498ef3.{json,out,exit}`); count method: the reporter's `numTotalTests`/`numPassedTests`/`numFailedTests`, file count from `testResults` length |
| `pnpm run typecheck` at `3498ef3` (both programs) | exit 0 (`m3/typecheck-m3-final.{out,exit}`) |
| `node ~/.claude/tools/convention-check.js website --since=1ad625e` at `08124a4` (`m3/convention-check-08124a4.out`) | 65 FAIL, 0 CANDIDATE, 20 SKIP. M3's own FAIL lines: 3 (`messageProviderDeps.ts:70`, a comment outside the allowlist; `global.d.ts:166` `member-delimiter-style`, reported twice), fixed at `3498ef3`. The other 62 are base and D-9's (accept, fix none): 42 in `useApiMethods.json-editor-repair.test.ts`, 5 in `limits.import-validation.test.ts` (M1), 14 in `global.d.ts` (lines 4 to 28: 13 unused type imports and one long line, already in the base file), 1 `withLocalStorage.ts:1` max-len (the base line, unchanged); 3 + 42 + 5 + 14 + 1 = 65. The SKIPs: `.playwright-mcp/*.png` (held, not examined), two files with no added lines, and the checker's own note that it does not implement the ID-token class verbatim, so basename and title ID tokens were not checked by it; my new file names carry none by reading (`NavMenu.sign-in-and-out`, `page.sign-in-exit`, `SessionProvider.stale-cookie-sign-out`, `withLocalStorage.server-render`). After the fix `npx eslint` on the two touched M3 files and on every new test file gives 0 findings besides `global.d.ts`'s base 14. |
| Self-check sweep over `ec984fe..536b8e6` (`mutant-gen.js`, `m3/536b8e6-mutants-gen.json`, `m3/536b8e6-sweep.out`) | 58 of 72 killed; 14 survivors, dispositioned below |
| Survivors re-run at `08124a4` plus QA's NM-6, NM-7 (3 forms), NM-27, NM-28 (2 forms) (`m3/08124a4-mutants-edits.json`, `m3/08124a4-sweep.out`, `m3/mutate-edits.py`, a copy of `../mutate.py` for mutants of more than one edit) | 9 survivors killed, 5 survive and are equivalent (below); NM-6, NM-7 x3, NM-27, NM-28 x2: 7 of 7 killed |
| `NM-InfoPanel-log-in-keeps-prompt` at `3498ef3` (`m3/3498ef3-sweep.out`) | killed |

Survivor dispositions (the 14 of `536b8e6`):

| # | Mutant | Disposition |
|---|---|---|
| 1 | `index.tsx:41:>` | closed: "shows the saved copy when the stored copy is exactly as new" (`08124a4`); killed |
| 2 | `index.tsx:174:if-false` | closed: "leave no stored draft once they are typed back to the saved copy"; killed |
| 3 to 5 | `SessionProvider.tsx:15:if-false`, `&&`, `not` | closed: `SessionProvider.stale-cookie-sign-out.test.tsx`; killed (1, 2, 2 cases) |
| 6 | `leaveWithoutAlert.ts:1:num` (2000 to 2001) | equivalent under the criterion: the plan (M3-d, D-18) states the suppression is for the act and that it re-arms, not a delay; "prompts again once the exit has had time" is asserted at 5000 ms and the failure path at once. A test of the constant's value would restate the constant. Survives at `08124a4` (`surv-leaveWithoutAlert.ts_1_num.result.json`) |
| 7, 8 | `messageDrafts.ts:19:num:2`, `:num:3` (the tab id's `slice` bounds) | equivalent: the id is an opaque key; the contract is "one id for the life of the tab, a different one for a tab with no session storage" (both asserted), and a mutant that empties the id (`slice(2, 2)`) would fail the first. Survive |
| 9 | `messageDrafts.ts:38:walk-first` | closed: write-order case; killed |
| 10 | `messageDrafts.ts:45:>` | closed: the 1 MiB boundary pair; killed |
| 11 | `messageDrafts.ts:67:walk-last` | closed: insertion order against recency; killed |
| 12 | `withLocalStorage.ts:13:if-false` | equivalent by construction, see Class C. Survives |
| 13 | `withLocalStorage.ts:13:false` (`return true` with no window) | closed: `withLocalStorage.server-render.test.ts`; killed |
| 14 | `withLocalStorage.ts:19:true` (`bubbles: true` to `false`) | equivalent: the event is dispatched on `window`, which is the target, so `bubbles` has no listener to reach; no behaviour of the page reads it. Survives |

Named mutants from QA's Phase 1 (`qa/017-existing-items-backlog-qa.md`, § Named mutants), each made by hand as one
change set in the `08124a4` export (`m3/08124a4-mutants-edits.json`):

| Named mutant | Made as | Result |
|---|---|---|
| NM-6, re-encode keys other than `message` | `set` stores `JSON.stringify(value)` for every key | killed by `withLocalStorage.stored-keys` ("writes a theme as the bare string") |
| NM-7, `hasChanged` keeps a session condition for one status | `useSession().status !== '<status>' && …` (import plus use) for each of `loading`, `unauthenticated`, `authenticated` | killed in all three by "hasChanged for every session status" |
| NM-27, the suppression keyed on `NavMenu`'s button so Log out is silenced too | `signOut()` wrapped in `leaveWithoutAlert` | killed by `NavMenu.sign-in-and-out` ("signs out with the unsaved-changes prompt when signed in") |
| NM-28, the flag left lowered when the sign-in does not leave | the re-arm timer removed; and the failure path's lowering removed | both killed by `useUnloadAlert.act-suppression` |

Test classes walked on the built tip, member by member (the criterion enumerates states): the M3-d table's rows are
each a mounted case: Close/reload signed out and signed in (`useUnloadAlert` and `hasChanged` cases), `InfoPanel`
Log in (`page.sign-in-exit`), `NavMenu` sign-in and Log out (`NavMenu.sign-in-and-out`), `SessionProvider` sign-out
(`SessionProvider.stale-cookie-sign-out`); the raw anchors row has no unload and no case is owed. The M3-c decision
table (4 rows) is the "two tabs" and "restore" describe blocks of `MessageProvider.stored-draft`.

No timeout or time-based test was added to the standing suite beyond fake-timer cases (`vi.useFakeTimers`), which
are deterministic and carry no real wait.

## Fix Round 1 (code review Round 3, REJECTED at `3498ef3`; website `1ab3b96`, tests only)

No production line changed: `git diff --name-only 3498ef3 1ab3b96` lists only `MessageProvider.stored-draft.test.tsx`.

- **CR-6.** The provider's restore cases now compare the restored `message.data` and `message.name` whole (`toEqual`) with
  fixtures whose data carries an embed and whose name differs from every default: the route-0 cases (sign-in, reload,
  two tabs, a seeded `0:A` entry, the old no-id key), the saved-message cases (typed edits, a seeded entry for 42, the old
  copy of 42). The editor assigns each embed a `_key` on restore, so the expectation holds `expect.any(String)` there and
  nothing else is loosened. A route-0 draft typed in the UI keeps the loaded copy's name (`New Message`, because the
  effect writes `savedMessage?.name ?? message.name`), so the name-differs property is carried by the seeded cases. A case
  that edits `content` back to the saved copy sets the data whole, since the typing helper keeps non-content fields.
  Blind spot, as the review states it: a field the fixtures do not carry (components, flags) is covered by the same
  whole-data comparison only if a fixture carries it.
- **CR-7.** Part 1: "holds the route-0 draft last written, for the code that reads it" parses the legacy string and
  asserts its keys are exactly `data`, `name`, `updatedAt` and its value equals `{ name: 'New Message', updatedAt:
  1700000000000, data: … }` under a frozen `Date`. Part 2, the named instrument: `legacy-string-tip-1ab3b96.json` is the
  string a tip run wrote (captured by a throw-away case in a `git archive 1ab3b96` export, `legacy-capture-tip-1ab3b96.out`);
  `old-reader.route-zero-legacy.probe.test.tsx` mounts the `1ad625e` `MessageProvider` at route 0 in a `git archive 1ad625e`
  export (that tree's own helpers), seeds `localStorage.message` with that string and asserts the old reader shows the
  draft's name and content and its embed: exit 0 (`old-reader-1ad625e.out`). Negative control: the same string with an `id`
  makes the old reader show the intro message and the case fails (`old-reader-1ad625e-control-with-id.out`, exit 1), so
  the instrument discriminates what P3 changed. Both exports were removed after the runs.
- **CR-8, a deviation from the plan's Write matrix, recorded for the planner.** The plan's M3 Write matrix, row "Message *n*
  opened (fetch)", says the `Sn` cell is "nothing written". The fetch effect's branch `mostRecent === fetchedMessage`
  calls `removeDraft(fetchedMessage.id)` when the fetched copy is the one shown. Reason: at `1ad625e` the fetch
  overwrote the one `message` key, so the outcome equals base; an `Sn` older than the fetched copy is never shown again
  under `getMessage`'s rule (the newer side wins), so removing it loses nothing reachable; the Reload confirmation relies
  on it to discard edits ("discards the stored edits and shows the saved copy"); writing nothing would leave unreachable
  entries to the eviction path. Consequence for the matrix: the row "Another tab saves *n*: a diverged `Sn` stays" holds only
  until this tab next opens *n*. Code kept; no test beyond the existing reload case. For the planner to fold into the
  matrix at the next revision.

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| CR-6, a restore of a stored draft into the editor with no assertion that `data` and `name` equal the stored ones | the reviewer's predicate, re-run at the tip: `git grep -nE "draft\.data\|legacy\.data\|drafts\[newest\]" 1ab3b96 -- src ':!**/__tests__/**'` (`m3/class-sweep-restore-sites-1ab3b96.out`) | 9 hits: `index.tsx` :43 (`getMessage`), :156 (route-0 effect), :246 (removal predicate); `useApiMethods.ts` :68, :85, :97; `messageDrafts.ts` :33 (migration), :71 and :72 (copy-in). The reviewer counts 10 (6 in the class); this run gives 9 (5 in the class) over the same 4 class sites. I did not trace the one-hit difference; the sites agree | outside the class (4): `useApiMethods.ts` :68, :85, :97 (`persist`'s local payload) and `index.tsx` :246 (a removal predicate). In the class (5 lines, 4 sites): :43 `getMessage` (P4 killed), :156 route-0 effect (P1, P2 killed), :33 migration (P5, P6 killed), :71 and :72 copy-in (P7 killed). Residual unkilled probe mutants: 0 of 7 (`m3/1ab3b96-probe-sweep.out`) |
| CR-7, a revert-safety property whose stated instrument was replaced by a partial transcription | `git grep -n "legacyStore()" 1ab3b96 -- src` | `messageDrafts.ts`: `readDrafts` (read), `writeRouteZeroDraft` (the one writer), `removeRouteZeroDraft` (reads and removes) | the writer's form is asserted as literals and the old reader is run; the read and the removal do not feed the old reader. Residual: 0 |
| CR-8, a write the matrix rules out, made without a recorded deviation | `git grep -nE "removeDraft\|writeDraft\|RouteZeroDraft" 1ab3b96 -- src/providers/MessageProvider/index.tsx` compared with the matrix | the review's 7 call sites, 1 departing | the departure is recorded above; the other 6 match the matrix. Residual: 1, recorded |

Test results at `1ab3b96`: full suite 1620 of 1620 passed, 133 files, exit 0 (`m3/vitest-m3-1ab3b96.{json,out,exit}`; count
method: the reporter's `numTotalTests`, files from `testResults`); `pnpm run typecheck` exit 0
(`m3/typecheck-m3-fix-1ab3b96.{out,exit}`); `convention-check.js website --since=1ad625e` 62 FAIL, 0 CANDIDATE, all base
and D-9's (42 + 5 + 14 + 1; `m3/convention-check-1ab3b96.out`); eslint on the changed test file 0 findings. Probe mutants
P1 to P7 (`m3/1ab3b96-probe-mutants-edits.json`, run with `m3/mutate-edits.py`, network-isolated, in a `git archive 1ab3b96`
export): 7 of 7 killed, each by assertion failures (`m3/1ab3b96-probe-sweep.out`). The named mutants' last results
stand: the fix diff touches no guard (tests only).

Process fact: after committing, I ran `git reset -q src` to clear what I had added to the index; it was unnecessary,
touched no working-tree file, and the tree held no other session's staged work (the status before and after listed only the
held `.playwright-mcp/`). I do not repeat it.

## Outstanding Items

- **CR-4 (code review, M2-a's eleventh member), disposition recorded here as the review's carrier asks.** The member
  "not-valid (fails shape) / nothing changed" has no case in M2's `own-save-notice` file. A shape-failing payload is
  rejected by the router before `upsertMessage` runs, so no broadcast exists (AN-1's row: `broadcast: none`) and the
  absence of a notice holds trivially in production; the one thing M2 adds for it, the failed save's record, is
  asserted by "raises the notice for a later save of the content of a save that failed". Unobservable at the client; no
  test is owed.
- **Known design notes (no open question):** the draft entry carries `data`, `name`, `editedAt` only, as the plan states
  it, so a route-0 draft restored from the store no longer carries the `guildId` and `recent*` ids the old single key kept
  for a share-code message; the draft hook reads through `withLocalStorage` directly (`useLocalStorage` exposes no
  read-at-call-time) and `useLocalMessageStore` was removed as unused; the tab id lives in `sessionStorage` key
  `messageDraftTab` (a plan deviation the plan states); the creating-save removal uses the closure's `message`; the
  reload path removes the stored entry whenever the fetched copy is shown.
- **Five equivalent mutants survive** (survivors 6, 7, 8, 12, 14 above), each with its reason; none is a missing case
  under the plan's criteria. If the reviewer reads the re-arm delay (survivor 6) as a criterion, that is a plan question
  (a lower bound on a delay the plan does not state), not an implementation gap.
- **Unmounted, base, not claimed:** `withLocalStorage.remove`'s SSR guard (unchanged base code).
- **Instrument limits:** the three D-18 call-site tests mock `next-auth/react`, `~/env.mjs` and, for the edit page,
  every collaborator of the page (editor, dialogs, hotkeys, `MessageProvider`); `NavMenu` renders its `Dropdown` items
  as plain buttons. They assert the wrap and the suppression's lifetime, not the real OAuth redirect (`signIn` leaving
  by `window.location.href` is the dependency's, read in the plan, not run here).
- **Self-diagnosis, for the retrospective:** the first delivery asserted the behaviours and not the boundaries and
  orderings they turn on: seven of the fourteen survivors were an equal-input boundary or an insertion order that
  coincided with recency in my fixtures, and three were an exit that no test mounted. I tested the plan's example
  inputs rather than the property that separates the rule from its near-miss; the self-check sweep found them, not the
  cases. Class A and B above are the repair.
- **Process facts:** the stamp gate refused a changelog stamp I typed ahead of the clock on the M3 and M2 documents
  (corrected from `date -u`); the record-write gate refused a `sed -i` on a record document (re-issued with the editing
  tools; satisfied, not worked around). Both disclosed at the checkpoint, repeated here for the record.
- **Downstream:** the browser's unload prompt now appears signed out on the edit page (D-11, shown to the owner). M4's
  premise (links away from the editor) reads `hasChanged`; it now holds signed out as well as signed in.

## Next Steps

Code review (`code-reviewer-hooks-017`): a scoped Round 3 sub-entry on the fix at website `1ab3b96` (the M3 range is
`d9ebe97`, `79144cb`, `536b8e6`, `08124a4`, `3498ef3`, `1ab3b96`; `ec984fe..dd26104` is M2's fix round and outside it),
then QA Phase 2 for M3, then M4 (read
plan M4 and QA § M4 first). After M4: tell `steering-roadmap` that M1 to M4 are through (devops probe push for OQ-7).
M5 and M6 wait on OQ-7 and gate M5-0; M7 last.

## Resumption State

Rewritten at the M3 fix-round seam (code review Round 3 REJECTED `3498ef3`; fix `1ab3b96`). Website branch
`chain/017-existing-items-backlog`, HEAD `1ab3b96`; the tree is clean apart from the held `.playwright-mcp/`. The record
commit that carries this text is the one the hand-off message names. M3's first checkpoint (2026-11-19T02:19Z, context
212K) preceded the review message.

- Done: M3 built, handed to `code-reviewer-hooks-017` at `3498ef3`; REJECTED on CR-6, CR-7, CR-8; fixed at `1ab3b96`
  (tests only, Fix Round 1 above); the fix SHA is handed back to `code-reviewer-hooks-017` for a scoped Round 3 sub-entry,
  then QA Phase 2 for M3. Awaited: that sub-entry and QA's verdict; a further finding comes back as another fix round on
  this document. `steering-roadmap` was told M3 was built and M4 starts; it asked for no further status messages.
- Next: M4. Read plan M4 (`planning/017-existing-items-backlog.md`, § M4, M4-a to M4-d, X-14) and QA § M4 (`qa/017-existing-items-backlog-qa.md`,
  NM-8, NM-9, NM-24, NM-25) first, then open the M4 implementation document under the `-m4-implementation` name (copy ID, Origin, UUID from the
  plan; stage start is covered by the rulings block for M1 to M4, D-12 and D-20). M4 is user-visible: record one line per
  flow, and message `steering-roadmap` only the flows that hold a decision (none expected: D-12, D-20 decide the dialog and
  the layout). M4's first step is the class re-derivation from three listings (`next/link` importers, `StyledLink`
  importers, string `onPress` items) written into the document. M4-c removes `next/router` from production source
  (`useUnloadAlert.ts` keeps only `useBeforeUnload`; M3's `useUnloadAlert.act-suppression` test mocks `next/router`, which that
  removal will make unnecessary). After M4, tell `steering-roadmap` that M1 to M4 are through (the devops probe push for OQ-7).
  M5 and M6 wait on OQ-7 and gate M5-0; M7 last.
- Scratch: this session's exports and the older sessions' loose files and clones are removed. No process of mine is left
  running (`pstree` shows only the claude process). Nothing locally mutated and unrestored.
- Cache-warm wake: `d27f4c05` was deleted at the first checkpoint; `dc5b1602` (fires 03:19 local) was armed on the review
  message and stays armed while M4 work proceeds.
