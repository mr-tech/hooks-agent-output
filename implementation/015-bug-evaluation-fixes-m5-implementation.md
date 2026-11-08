---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Active
Status-Detail: "M5 (editor pages and providers, F-19 to F-26) delivered at da24eb7 on the chain branch. Awaiting code review, then QA Phase 2. The two flow decisions (M5-h's error line, M5-f's reset) were answered by the owner by selection."
Handoff-At: "da24eb7 — repos=website"
---

# Implementation 015 — M5 (editor pages and providers)

## Plan Reference

`agent-output/planning/015-bug-evaluation-fixes.md` § M5 at rev 21 (`3d193f9`); Decisions Register D1 to D30 read. QA Phase 1: `qa/015-bug-evaluation-fixes-qa.md` § M5 (last commit of that file when read: `c4e82b3`). Earlier deliveries: M0 (`037935d`), M1, M2 (`7befedb`), M4 (`46a9cab`, cleanup `6c42032`). M3 is removed (D30); no M3 code exists.

## Date

2026-11-08

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T07:47 | steering-hooks-015 → implementer-hooks-015 (messages: "Released: M5 onward"; owner's answers, rulings block "M5 flow questions", `a49da66`) | Implement M5 | M5-a to M5-h delivered in `23a621e`; one unreachable guard removed in `da24eb7` after a mutant showed it. Gate run on `da24eb7`. |

## Implementation Summary

Each fix lands at its finding's site; the property, not the example, is what the cells assert.

- **M5-a (F-19).** After a confirmed Load, the JSON dialog may close on Esc and an outside click again. `commitLoad` now hands the menu its close ability back before closing, as the cancel path already did.
- **M5-b (F-20).** Copy to Clipboard is enabled only when the draft parses and conforms to the import shape; the text it copies is computed once from the draft, so pressing it cannot throw. Pretty print's own gate (parsable) is unchanged; a draft that is JSON but does not conform disables Copy only.
- **M5-c (F-21).** The "Message Update Detected" prompt reads the latest unsaved-changes flag at the moment the event arrives (a ref), not the one the subscription closed over. The Pusher subscription itself still re-subscribes only on the message id. The hash comparison is untouched (X-10).
- **M5-d (F-22).** The guild dropdown's items follow the session (and the setter) instead of being computed once.
- **M5-e (F-23).** "Today" is shown when the year, month and day match today's. Both copies of `getDateString` (the header's search results and the folder page) call one shared formatter, `src/utils/formatMessageDate.ts`; the folder page passes the "Today at " prefix, the header none, as before.
- **M5-f (F-24).** Save As refills the message name and server from the message each time it opens. A name typed before cancelling is dropped on the next open (owner's selection).
- **M5-g (F-25).** The folder page's delete failure toast reads "Error. Failed to delete message. Please try again."
- **M5-h (F-26).** `/preview?data=` with data that is not a JSON object shows one line of red text, "Invalid message data.", on the existing dark background, and no editor. A missing `data` still renders nothing.

## Milestones Completed

M5-a to M5-h.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | Steering's message at session resume: "Released: M5 onward, in plan order." (no stamp recorded). The pre-code gates for M5 text are the same round as M4's (rev 21 passed all four gates, rulings `7e95151`) | Not a test |
| QA Phase 1 covers M5 | `qa/015-bug-evaluation-fixes-qa.md` § M5: one cell family per sub-milestone; M5-e under fake timers with four members; both date copies covered | The nine M5 test files below |
| User-visible surface: flows recorded; decision flows asked first | Below. Two flows held a decision and went to steering; answered by the owner by selection: M5-h "Agent: short error line", M5-f "Agent: reset on open" (rulings block "M5 flow questions", `a49da66`) | `page.invalid-data.test.tsx`, `SaveAsMenu.opens-with-current-values.test.tsx` |
| Wrong-shape `/preview` data (steering's call in the same block: rides M5-h under D28 if the probe shows a crash) | Probed: `verification/015/m5h-preview-data-probe-6c42032.txt`. `null` crashes the page (`Cannot read properties of null (reading 'embeds')`); `5`, `"x"`, `[]` and `{}` do not throw under jsdom. Any value that is not a JSON object is refused | `page.invalid-data.test.tsx` (the null, number, string, array cells) |
| E-5 (no network in tests) | No test builds a real request: `fetch` is not used by any M5 surface; `pusher-js` is faked; `next-auth`, `next/navigation` and the api module are mocked | The M5 tests |
| E-6, E-7, E-8 | TDD table; Test Execution Results | `verification/015/m5-*` |
| E-9 | No walk performed at M5; nothing sent | Not a test |

**User-visible flows** (product vocabulary; pattern ladder in brackets):

| Flow | Surface and trigger | What happens next | Rung |
|---|---|---|---|
| JSON dialog after a confirmed Load | Editor, Message JSON dialog; the user confirms Load, then later opens the dialog again and presses Esc or clicks outside | The dialog closes | 1: the cancel path of the same Load button already restores close ability |
| Copy with a draft that is not valid | Message JSON dialog, Copy to Clipboard | The button is disabled, as Pretty print is for unparsable text; a JSON draft that does not conform disables Copy only | 1: Pretty print's `isDisabled` on the same line group |
| Update prompt with unsaved changes | Editor, a saved message updated from another tab | "Any changes you have made will be lost." is part of the prompt exactly when there are unsaved changes at that moment | 1: the existing prompt text |
| Guild dropdown after the session changes | Save As and New Message, "Save To" dropdown | Lists the guilds of the current session | 1: same hook, dependencies corrected |
| "Today" labels | Header search results; folder page rows | A message from today shows the time ("Today at …" on the folder page); any other day shows its date | 1: the existing text |
| Save As opened again | Editor, File menu, Save As | The name field shows the message's current name (plus " Copy", or "New Message" for an unnamed one) and the dropdown its current server | 3 (departure, asked): NewMessageModal resets in `afterLeave`, which cannot serve here, because a rename happens while the dialog is closed; reset on open. Owner chose it |
| Delete failure | Folder page, message row, Delete | The error toast says the delete failed | 1: the sibling success toast's phrasing ("Message deleted.") |
| Hand-made preview link with bad data | `/preview?data=…` | One line, "Invalid message data.", in red on the dark background | 2 (class: inline `text-error` line, as NewMessageModal and EditMessageMenu). Owner chose it |

## Files Modified

| Path | Changes | Lines |
|---|---|---|
| `src/app/message/m/[id]/_components/JsonModalBody.tsx` | `commitLoad` re-enables menu close; `toCopyText` and `copyText` (memo) gate and feed Copy | +13 −5 |
| `src/providers/MessageProvider/usePusher.ts` | `hasChangedRef` | +4 −2 |
| `src/utils/hooks/useGuildDropdownItems.tsx` | memo dependencies `[session, setSelectedGuildId]` | +1 −1 |
| `src/app/message/_layout/Header.tsx`, `src/app/message/f/[id]/page.tsx` | the local `getDateString` deleted; calls to the shared formatter; the folder page's delete toast text. Lint gate: one pre-existing over-long line in the folder page wrapped (see Test Execution Results, gate satisfaction) | Header +3 −14; page +7 −16 |
| `src/app/message/m/[id]/_components/SaveAsMenu.tsx` | effect refilling name and server on open | +11 −2 |
| `src/app/preview/page.tsx` | `parseMessageData`; error line | +20 −1 |

## Files Created

| Path | Purpose |
|---|---|
| `src/utils/formatMessageDate.ts` | The one date label both date sites use |
| `src/app/message/m/[id]/_components/__tests__/JsonModalBody.menu-close-after-load.test.tsx` | M5-a |
| `src/app/message/m/[id]/_components/__tests__/JsonModalBody.copy-needs-valid-draft.test.tsx` | M5-b |
| `src/providers/MessageProvider/__tests__/usePusher.update-prompt.test.tsx` | M5-c |
| `src/utils/hooks/__tests__/useGuildDropdownItems.session-update.test.tsx` | M5-d |
| `src/utils/__tests__/formatMessageDate.same-day.test.ts` | M5-e (fake timers, fixed instant) |
| `src/app/message/_layout/__tests__/Header.search-result-dates.test.tsx`, `src/app/message/f/[id]/__tests__/page.message-list.test.tsx` | M5-e wiring at each copy; M5-g |
| `src/app/message/m/[id]/_components/__tests__/SaveAsMenu.opens-with-current-values.test.tsx` | M5-f |
| `src/app/preview/__tests__/page.invalid-data.test.tsx` | M5-h |
| `agent-output/verification/015/m5-sweep.sh`, `mutators/m5-table.py`, `mutation-*-6c42032.txt`, `mutation-*-da24eb7.txt`, `m5-sweep-summary-*.txt`, `m5-*-first-run.txt`, `m5-enumerations-6c42032.txt`, `m5h-preview-data-probe-6c42032.txt`, `m5-*da24eb7*`, `impl-suite-run.sh` | Mutants, red runs, enumerations, probe and gate captures |

## Patterns Extended

| Surface | Pattern extended (rung) |
|---|---|
| Existing tests named before adding | M5-a, M5-b: `JsonModalBody.conflict-resting-state.test.tsx` already holds the one `setAllowMenuClose` assertion and uses a mocked confirmation whose `withConfirmation` returns its options object, so it cannot run a confirm; the new files use the real `ConfirmationProvider` for M5-a and the same mocks otherwise. M5-f: `SaveAsMenu.readable-mutation-error.test.tsx` covers only the error text. M5-e: no test existed for either `getDateString`. M5-c: `usePusher.hash-parity.test.ts` covers the hash only |
| Mount recipe | `createRoot` and `act` through the shared `dom.ts` helper, or a local root where the test re-renders (the helper has no re-render). Rung 2 |
| Date wiring tests | Mock `usePartialMessages` and `useMessages` (providers), real components. Rung 2 |
| Error line | Inline `text-error` (rung 2, flows table) |
| Shared formatter | `~/utils` module beside `formatMutationError.ts` etc. Rung 1 |

## TDD Compliance

Mutants run through `verification/015/mutate-run.sh` in isolated exports (`EXPORT_ROOT` under the session scratchpad), network-isolated (`unshare -rn`, lo up, isolation counts checked), named by SHA. Mutator table `mutators/m5-table.py`; driver `m5-sweep.sh`; summaries `m5-sweep-summary-6c42032.txt` (all but the preview limb) and `m5-sweep-summary-da24eb7.txt` (the preview limb, after the guard simplification). First red runs against the unchanged code are `m5<letter>-red-first-run.txt` (letters a to h; g is `m5g-red-first-run.txt`).

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `commitLoad` close ability (M5-a) | `JsonModalBody.menu-close-after-load.test.tsx` | Yes | Yes | New module, first row, but the first run failed on the assertion, not an import: `expected false to be true` at the confirmed-Load cell; the other two cells green (controls). Mutant `m5a-allow-close-not-reset`: 1 failed of 3 | Yes |
| Copy gate and text (M5-b) | `JsonModalBody.copy-needs-valid-draft.test.tsx` | Yes | Yes | `expected false to be true` at the not-JSON and non-conforming cells, plus two unhandled errors (`SyntaxError`, `ZodError`) from the presses (exit 1). Mutants: `m5b-copy-always-enabled` (2 failed), `m5b-copy-disabled-only-when-unparsable` (1), `m5b-copy-copies-raw-draft` (1) | Yes |
| Update prompt flag (M5-c) | `usePusher.update-prompt.test.tsx` | Yes | Yes | `expected 'The message you are viewing has been …' to contain 'Any changes you have made will be los…'` and its negation (2 failed of 4). Mutants `m5c-pusher-reads-render-flag` (2), `m5c-pusher-ref-never-updated` (2) | Yes |
| Dropdown follows the session (M5-d) | `useGuildDropdownItems.session-update.test.tsx` | Yes | Yes | `expected 'user,1' to be 'user,1,2'`, `expected 'user,1,2' to be 'user,2'`, `expected 'user,1' to be ''` (3 failed of 4). Mutant `m5d-dropdown-memo-once` (3) | Yes |
| `formatMessageDate` (M5-e) | `formatMessageDate.same-day.test.ts` | Yes | Yes | New module, first row: `Cannot find module '../formatMessageDate'`. Behaviour rows (assertion level, the pre-change formula as mutant `m5e-day-of-month-only`): 5 failed of 9 across the pure, folder-page and header files. `m5e-month-dropped` (3), `m5e-year-dropped` (2), `m5e-prefix-ignored` (2) | Yes |
| Header wiring (M5-e) | `Header.search-result-dates.test.tsx` | No | Yes | Written after the rewiring. Closed by the stand-in: `m5e-header-bypasses-formatter` (the two call sites show a plain date): 1 failed, `today` row contains the year; green at the real code | Yes |
| Folder page wiring (M5-e) | `page.message-list.test.tsx` (dates) | No | Yes | Written after the rewiring. `m5e-folder-bypasses-formatter` (1 failed), `m5e-folder-drops-prefix` (1 failed); green at the real code | Yes |
| Delete failure toast (M5-g) | `page.message-list.test.tsx` (toast) | Yes | Yes | `expected "Mock" to be called with arguments: [ 7, ObjectContaining{…} ]`, received render `'Error. Failed to refresh message. Please try again.'`. Mutant `m5g-delete-toast-says-refresh`: 1 failed | Yes |
| Save As refill (M5-f) | `SaveAsMenu.opens-with-current-values.test.tsx` | Yes | Yes | `expected 'First Copy' to be 'Renamed Copy'`; `expected 'Save AsMessage Name…' to contain 'Guild Five'`; `expected 'Old Copy' to be 'New Message'`; `expected 'Something typed' to be 'First Copy'` (4 failed of 5; the first cell is a control). Mutants `m5f-save-as-name-not-refilled` (3), `m5f-save-as-server-not-refilled` (1), `m5f-save-as-refills-only-at-mount` (4). **Survivor: `m5f-save-as-refills-on-close-too` (5 passed)**: see Outstanding Items | Yes |
| `parseMessageData` and the error line (M5-h) | `page.invalid-data.test.tsx` | Yes | Yes | New module, first row, assertion level: `SyntaxError: Expected property name or '}'…`, `TypeError: Cannot read properties of null (reading 'embeds')`, `expected <p data-testid="editor"></p> to be null` (5 failed of 7; the object and missing-data cells are controls). Mutants: `m5h-array-passes` (1), `m5h-primitive-passes` (2), `m5h-parse-error-uncaught` (1), `m5h-error-text-changed` (5), `m5h-error-not-text-error` (5), all at `da24eb7`. **`m5h-null-passes` (7 passed at `6c42032`) showed the null conjunct unreachable** (the caller treats a null result as invalid): removed in `da24eb7`, whose cell for null stays | Yes |
| `toCopyText` (private to M5-b) | via `JsonModalBody.copy-needs-valid-draft.test.tsx` | Yes | Yes | See the M5-b row. Its `catch` is covered by the not-JSON and non-conforming cells; the `copyText !== null` guard in `onPress` is a type narrowing: a disabled Copy cannot be pressed, so the guard is only reachable at the type level. Kept for the compiler, not a behavioural guard | Yes |

## Class Sweep

First delivery; the sweep is of the classes M5's findings name, plus the gaps my mutants exposed. Enumerations: `verification/015/m5-enumerations-6c42032.txt` (`git grep` at `6c42032`).

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| F-19: a held-open flag set by a confirmation | `git grep -n 'setAllowMenuClose\|disableExternalClose\|setAllowExternalClose' 6c42032 -- src ':!*__tests__*'` | 17 lines in 6 files | `JsonMenu`/`JsonModalBody`: the subject (fixed at the `commitLoad` hit, line 90). `NewMessageModal` `page > 0` and `ImageUploader` `localImage !== image`: derived from state each render, never latched: not applicable. `PresetDialog`: the consumer. Residual 0 |
| F-20/F-26: `JSON.parse` in a handler or render | `git grep -n 'JSON.parse' 6c42032 -- 'src/**/*.tsx' ':!*__tests__*'` | 10 hits | `JsonModalBody:30,39` guarded (`isJSONParsable`, `toCopyText`); `:139` inside the parsing effect's try; `:225` Pretty print behind `isJSONParsable`; `NewMessageJsonInput:25,93,194` guarded the same way (its Pretty print is `isDisabled` on the same test; it has no Copy); `preview/page.tsx:13` inside the new try; `DiscordMessageEditor/index.tsx:118` clones an object we built: not applicable. Residual 0 |
| F-21: closed-over flag in a once-subscribed handler | `git grep -n 'hasChanged' 6c42032 -- src ':!*__tests__*'` | 16 lines | `usePusher` fixed. `Navigation:162,177`: the memo lists `hasChanged` in its dependencies. `edit/page.tsx:100`: `useUnloadAlert(hasChanged)` reads the argument per render. Others are declarations. Residual 0 |
| F-22: memo over the session with empty dependencies | `for f in <files that import useSession>; do git grep -n '}, \[\]);' 6c42032 -- $f; done` | 3 hits | `edit/page.tsx:122` an idle-time preload effect; `WebhookMenu:116` a `useCallback` reading a ref (`useLatest`); `message/page.tsx:56` a redirect effect: none computes from the session. `useGuildDropdownItems` was the only one and is fixed. Residual 0 |
| F-23: day-of-month comparison | `git grep -n 'getDate()' <sha> -- src ':!*__tests__*'` | base `7ce866b`: 2 hits (`Header.tsx:33`, `f/[id]/page.tsx:56`); `6c42032`: 1 hit (`formatMessageDate.ts:4`, the intended one beside year and month) | Both fixed by one helper. Residual 0 outside the helper |
| F-24: state seeded from a prop at mount in a persistent dialog | `git grep -n 'useState(guildId\|useState(props\.\|useState(.*Id ??\|useState(.*\.name' 6c42032 -- src ':!*__tests__*'` | 2 hits | `SaveAsMenu:34` (the subject, fixed). `NewMessageModal:74` `useState(guildId ?? '0')`: its own effect on the loaded guild updates it, and a mount-time guild prop is the page's own folder; I did not probe a folder switch while mounted: reported as a follow-up, not changed |
| F-25: delete/refresh toast confusion | `git grep -n 'Failed to refresh' 6c42032 -- src ':!*__tests__*'` | 1 hit (`useApiMethods.ts:39`) | That is the real reload failure toast: not applicable. Residual 0 |
| Mutant gap: an unreachable guard (`m5h-null-passes`, 7 of 7 green) | Re-run of the mutant at `da24eb7` is not possible (the guard is gone); the edited line and the control `control-m5h` (7 of 7) are in `m5-sweep-summary-da24eb7.txt` | 1 guard | Removed as unreachable by construction: the caller turns a null result into the error line, so letting null through the object test changes nothing; the null cell stays green at the shorter test. Captured case: `mutation-m5h-null-passes-6c42032.txt` |

## Test Execution Results

Raw outputs: `verification/015/m5-testresults-da24eb7.json`, `m5-testresults-paths-da24eb7.txt`, `m5-run-da24eb7.txt`, `m5-convention-check-da24eb7.txt`. Counts from the vitest JSON reporter.

| Command | Result | Exit |
|---|---|---|
| `impl-suite-run.sh da24eb7` (export of the commit, `unshare -rn`, lo up, isolation counts 0 and 0; export blob of `message.ts` equals the tree's `3e6b41b`) | 890 tests, 890 passed, 0 failed, 89 files; stderr 0 lines | vitest 0 |
| Path membership vs `m4r-testresults-paths-46a9cab.txt` | 0 gone; 9 added, exactly the nine M5 test files | — |
| `pnpm run typecheck` (both programs) in that export | clean | 0 |
| `git diff --numstat 7ce866b da24eb7 -- pnpm-lock.yaml package-lock.json` | empty | — |
| `node ~/.claude/tools/convention-check.js website --since=7ce866b` | 70 files examined (39 test files); 0 FAIL, 0 CANDIDATE, 3 SKIP | 0 |
| ID-token negative form, by hand, over the 11 test files added since `1e12837` (basenames, `describe`/`it` titles, comment lines) | 0 hits (the tool SKIPs this check: no `TEST-CONVENTIONS.md` above the repository) | — |
| Mutants (`m5-sweep.sh 6c42032`; the preview limb again at `da24eb7`) | 8 controls green (3, 5, 4, 4, 9, 5, 2, 7 cases; 7 again at `da24eb7`). 25 mutant runs at `6c42032`, 23 killed; **2 survivors: `m5f-save-as-refills-on-close-too` and `m5h-null-passes`** (the second dispositioned above). The 5 preview mutants re-run at `da24eb7`: 5 of 5 killed | — |

- **Gate satisfaction, disclosed.** (1) The comment gate rejected the prose header comments in my first two new test files; I removed them (the rationale is in this document). (2) The convention-check treats ESLint warnings as FAIL: it flagged 23 `no-non-null-assertion` warnings and one `max-len` in my new and touched files; I replaced every non-null assertion with a cast or optional chaining, including the two M4 test files committed earlier (`6c42032`). The `max-len` hit is a line in `f/[id]/page.tsx` that I did not write (the `getOne.useQuery` destructuring); I wrapped it to clear the whole-file check. (3) `eslint --fix` ran on the named new files only (import order); on the pusher test it first produced a stray space inside a generic, which I then rewrote away.
- **SKIP.** The id-token basename check is unchecked by the tool; I ran the negative form by hand (above).

## Outstanding Items

1. **Survivor `m5f-save-as-refills-on-close-too`.** The effect that refills Save As has a guard (`if (!isOpen) return`). Without it the refill also runs when the dialog closes; under jsdom nothing renders during the leave transition, so no case can see the difference. In a browser it would show as the field text jumping to the default while the dialog fades out. I kept the guard for that reason; it is untested. Risk: low and cosmetic. Validation: a walk, or QA's judgement. Option: delete the guard (simpler, accepts the cosmetic jump).
2. **M5-a is asserted at the flag, not at an Esc keypress.** The test checks that the menu is handed back close ability once the confirmation resolves; it does not mount `PresetDialog` and press Esc (Headless UI's dialog is not driven by the suite). Validation: the human walk (UAT).
3. **M5-g is asserted on the mutation's registered `onMutate`/`onError` callbacks**, with the page mounted over a local fake of the api module; the Delete menu item is not pressed (it sits inside a dropdown).
4. **Scope reading for M5-h.** The plan says "not parsable JSON". Steering's call (rulings `a49da66`) brought wrong-shape data in if the probe showed a crash; it does for `null` only. I refuse every value that is not a JSON object, so `5`, `"x"` and `[]` (which do not crash) also show the error line. For the planner to register. `{}` still renders the editor.
5. **Downstream premises.** M5-e and M5-h change what users see: date labels are correct on other months and years, and a bad preview link shows a line. M8 (the generator) screenshots `/preview` with valid JSON objects from its own code, so its premise is not moved; the generator's read of an invalid link was not run.
6. **Follow-ups, not in the plan, not changed.** `WebhookMenu` seeds `selectedCategory` from `hasWebhooks` at mount, and `NewMessageModal` seeds `selectedGuildId` from its `guildId` prop at mount: the same mount-time capture class as F-22 and F-24. Neither was probed (a run would need a session or a folder switch); severity unknown, likely LOW.
7. **Owed from earlier rounds.** QAF-20 (before the effort-final QA pass): the `useParsePathname` describe and the two `formatKey` self-comparison cases in `bugFixCoverage.supplemental.test.ts`, the "0000" discriminator, the split into behaviour-named files. Not started.
8. **Self-diagnosis (method).** (a) I wrote a placeholder body for the "composer changed after subscribing" cell of the pusher test (it could not re-render through the shared helper, and the body asserted nothing). I caught it on the next read, before running it, and rewrote it with a local root. The check I should apply sooner: a cell whose title names a transition has to contain the transition. (b) I added `parsed === null` to the preview guard from the probe and did not check that the caller already covers it; the mutant, not my reading, showed it. A guard added for a probe finding gets a mutant before commit.

## Next Steps

Code review of `23a621e` and `da24eb7` (M5, one tree), then QA Phase 2 for M5. Separately, M4's reopen is with code review (`46a9cab` plus `6c42032`).

## Resumption State (checkpoint 2026-11-08T07:47Z, implementer-hooks-015)

- **Branch and HEAD.** website `chain/015-bug-evaluation-fixes` at `da24eb7` (M4 reopen `46a9cab`, M4 cleanup `6c42032`, M5 `23a621e`, M5 guard removal `da24eb7`). preview-image-generator untouched at `471578f`. The working tree holds no uncommitted change of mine.
- **Done.** M0, M1 (rebuild at `579e8b2`/`3031878`), M2, M4 (reopened for D29 and QAF-25, delivered), M5. M3 is removed (D30); no M3 code.
- **With others.** Code review: M4's reopen (`1e12837..46a9cab` plus `6c42032`) and M5 (`23a621e`, `da24eb7`). QA Phase 2: M1 and M4 re-runs after review.
- **Next, in plan order.** M6 (editor components and markdown: F-37, F-38, F-40 to F-42, F-44, F-45 to F-50; user-visible, so derive the flows and ask steering before code; QAF-11 already fixed), M7 (bot), M8 (preview-image-generator: E-1 from the first run, export without `.env`, install inside the export, `unshare -rn`, `ip link set lo up`, self-check). Owed before the effort-final QA pass: QAF-20.
- **Lessons to keep.** `eslint --fix` only on named files. The convention-check counts ESLint warnings as FAIL, so no non-null assertions in new files. `mutate-run.sh` needs an absolute mutator path and a committed SHA; `EXPORT_ROOT` goes under the session scratchpad. `m5-sweep.sh` takes `ONLY=<regex>` to re-run a subset. Use `date -u +%Y-%m-%dT%H:%M` for stamps. Read a diff via a file, not a pipe.
- **Questions sent, unanswered.** None open to the owner from me.
- **Evidence run but not recorded.** None outstanding.
