---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Active
Status-Detail: "M4 (F-16, F-17, F-18, F-27) delivered and committed on website chain/015-bug-evaluation-fixes; awaiting code review. M4-c's 'name view' reading and the second message-id site (useValidateWebhook) wait on the planner. M3 is held for a real-Chrome read; M1-c and M1-h are released and not yet rebuilt."
Handoff-At: "588d11a — repos=website"
---

# Implementation 015 — M4 (send page and webhook menu)

## Plan Reference

`agent-output/planning/015-bug-evaluation-fixes.md`, § M4, at rev 16 (`565e240`) for M4-d (D24, D25, D26) and rev 13 for M4-a to M4-c. QA Phase 1: `qa/015-bug-evaluation-fixes-qa.md` § M4. Earlier deliveries: M0 (`037935d`), M1 (`be881c9`, fix round to `6001f7f`), M2 (`7befedb`).

## Date

2026-11-08

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T07:00 | steering-hooks-015 → implementer-hooks-015 (message) | Work an unheld milestone while M3 is held | M4 taken. M4-a to M4-c at `9fe3fb9`; M4-d's strict id, failure text and ordering at `9fe3fb9`/`b25f561`; the widened shared link rule (D26) at `588d11a`. |

## Implementation Summary

- **One request per Send (F-16).** Send is disabled while a send is pending, so any number of presses produces one webhook request. A failed send leaves no unhandled rejection and re-enables Send. The failure toast is `sendWebhook`'s own and is unchanged.
- **The custom-URL error shows for a bad URL (F-17).** "Invalid URL" shows exactly when a non-empty URL has finished validating and no webhook was selected. It used to show when one was.
- **Clear works for a picked thread (F-18).** Clear is enabled whenever a thread is selected.
- **The message box takes only an id or a message link (F-27, D24–D26).** An all-digits id, or a `https://` link on one of eight hosts (`discord.com` and `discordapp.com`, each bare or with `www.`, `canary.` or `ptb.`) of the form `/channels/<digits>/<digits>/<digits>`. Anything else is refused before any fetch. Both validation effects catch a network failure; the message box shows "Could not load the message. Check your connection and try again." Of two overlapping validations, only the latest input's result is applied.
- **One shared link rule (D26).** `DISCORD_MESSAGE_LINK_REGEX` is widened once. The send page's box uses it with no copy. `NewMessageModal`'s bot link load and `message.getFromUrl` inherit it.

## Milestones Completed

M4-a, M4-b, M4-c (reading below), M4-d.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | Same start as M0 (rulings `7efd8b0`). Steering's message (no stamp recorded): "Which unheld milestone to work meanwhile is your call under the plan" | Not a test |
| QA Phase 1 covers M4 | `qa/015-bug-evaluation-fixes-qa.md` § M4 | Not a test |
| User-visible surface: flow lines recorded; decision flows asked first | Below. The two decisions (wording, link class) went to steering and were answered by the owner by selection: rulings blocks "M4-d flow questions" (`9b94838`), "M4-d link hosts" (`9f97a5f`), "OQ-J" (`7207289`) | Not a test |
| M4-d text | Rev 16 § M4-d | `WebhookProvider.validation-effects.test.tsx`, `constants.discord-message-link.test.ts`, `message.get-from-url.test.ts` |
| E-5 (no network in tests) | `fetch` is stubbed with `vi.stubGlobal` and `sendWebhook` with `vi.mock`; no test builds a real request | The provider and page tests |
| E-6, E-7, E-8 | TDD table; Test Execution Results | `verification/015/m4-*` |
| E-9 | No walk performed at M4; no Send pressed anywhere | Not a test |

**User-visible flows** (product vocabulary; pattern ladder in brackets):

| Flow | Surface and trigger | What happens next | Rung |
|---|---|---|---|
| Send pressed while a send is pending | Send page, Send button | Send is disabled until the send settles, including after a failure, then re-enabled. The success and failure toasts are unchanged | 1: `isDisabled={!allowSave}` already gates Send; `useLoading` is the repo's pending-state hook (WebhookProvider uses it) |
| Custom webhook URL that fails validation | Webhook menu, Custom Webhook field | "Invalid URL" shows under the field once validation has settled | 1: same expression, comparison corrected |
| Thread picked from the list | Webhook menu, Thread dropdown | Clear is enabled and clears the pick | 1: same `isDisabled` expression, field corrected |
| Message id or link that is not an id or a message link | Send page, Edit Previous, "Message ID or Link" | Nothing is fetched; the box shows no message | 1: the existing `else` branch of the effect |
| Network failure loading the message | Same box | "Could not load the message. Check your connection and try again." in the existing error line | 1: `oldMessageError` and its existing line |
| discordapp.com message link | New Message dialog, bot link load | Accepted where it was refused (D26; the owner accepted the change) | 1: the shared constant |

Decisions asked and answered: wording of the failure text (owner's block `9b94838`); link class and hosts (`9f97a5f`, `7207289`).

**Open reading, held for the planner.** M4-c says Clear is enabled "in both the list and the name views". Clear exists only in the list view (`!isCustomMenuOpen`); the name (custom) view has only a List button. I coded `isDisabled={isLoading || !threadId}`, which satisfies the stated property, and added no button. If the planner means a Clear in the name view, that is a new control.

## Files Modified

| Path | Changes | Lines |
|---|---|---|
| `src/app/message/m/[id]/send/page.tsx` | `useLoading` pending state; `withSending` around `sendWebhook`; `.catch(() => null)`; `&& !isSending` in `allowSave`. Lint gate: two Tailwind class orderings reordered on lines I did not write (the V2-patch warning block) | +9 −7 |
| `src/app/message/m/[id]/send/_components/WebhookMenu/index.tsx` | `selectedWebhook === null`; Clear gated on `!threadId` | +2 −2 |
| `src/providers/WebhookProvider.tsx` | `parseMessageId` over `DISCORD_MESSAGE_LINK_REGEX`; both effects restructured to hold an `isStale` flag with a cleanup, and to catch a rejected fetch; the failure text. Comment gate: the old comment `shhhhh, just let it happen` was removed | see diff |
| `src/constants/index.ts` | `DISCORD_MESSAGE_LINK_REGEX` admits `discordapp.com` and the three prefixes on both domains | +1 −1 |

## Files Created

| Path | Purpose |
|---|---|
| `src/app/message/m/[id]/send/__tests__/page.send-in-flight.test.tsx` | M4-a |
| `src/app/message/m/[id]/send/_components/WebhookMenu/__tests__/WebhookMenu.url-and-thread-controls.test.tsx` | M4-b, M4-c |
| `src/providers/__tests__/WebhookProvider.validation-effects.test.tsx` | M4-d: id and link class, failure text, overlap |
| `src/constants/__tests__/constants.discord-message-link.test.ts` | The shared rule: eight hosts admitted with captures; thirteen refusals |
| `src/server/api/routers/__tests__/message.get-from-url.test.ts` | `getFromUrl` consumer: eight hosts reach the lookup; four refusals do not |
| `agent-output/verification/015/mutators/m4-table.py`, `mutation-m4-*-b25f561.txt`, `mutation-m4e-*-588d11a.txt`, `m4-*` gate captures, `m4-enumerations-b25f561.txt`, `m3-premise-probe-6001f7f.txt`, `m3-document-root-probe-6001f7f.txt` | Mutants, gate captures and the M3 probes |

## Patterns Extended

| Surface | Pattern extended (rung) |
|---|---|
| Pending state on Send | `useLoading` (`src/utils/hooks`), used by `WebhookProvider` for the same purpose. Rung 1 |
| Shared link rule | `DISCORD_MESSAGE_LINK_REGEX`, already consumed by `NewMessageModal` and `message.getFromUrl`; the provider joined it instead of copying. Rung 1 |
| Provider test | A real `Provider` mounted with `createRoot`/`act` through `~/components/__tests__/helpers/dom` (`mountDom`); `GuildProvider` mocked. Rung 2 (the `JsonModalBody.*` tests mount a real provider) |
| Page and menu tests | `mountDom` plus provider mocks; the press sequence is `SectionEditor.auto-remove-dispatch`'s `pointerdown`/`pointerup`/`click`. Rung 2 |
| Router test | `createCaller` over `messageRouter` with the auth and Discord modules mocked. None exists for a router in this repo (`grep -rln createCaller src` returned no hit): rung "none exists" |

## TDD Compliance

Mutants run through `verification/015/mutate-run.sh` in isolated exports (`EXPORT_ROOT` under the session scratchpad), named by SHA. Controls on the unmutated export: `mutation-m4-control-b25f561.txt` (37 of 37) and `mutation-m4e-control-588d11a.txt` (72 of 72). The mutator table is `mutators/m4-table.py`. Reds not named as a mutant were observed against the code before the fix.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| Send disabled while pending (M4-a) | `page.send-in-flight.test.tsx` | Yes | Yes | New module, first row: the first run failed on the assertions, not an import: `expected "vi.fn()" to be called 1 times, but got 3 times`, and `expected false to be true` (button not disabled). Mutant `m4a-disable-dropped` re-creates it at head (2 failed) | Yes |
| Failed send handled (M4-a) | same | Yes | Yes | At base the case stopped at its first assertion (Send not disabled), so the rejection was not reached. Red for the rejection is the intermediate tree with the disable guard and no catch: 3 passed, `Unhandled Rejection`, vitest exit 1. Mutant `m4a-catch-dropped` re-creates it at head (72 passed, exit 1) | Yes |
| Re-press after settle (M4-a) | same | Yes | No | Green at base (nothing blocked a second press). It is a control for the guard: a guard that never reopens would fail it. No mutant reddens it: I did not write one for a stuck-disabled guard | Yes |
| `WebhookMenu` custom-URL error (M4-b) | `WebhookMenu.url-and-thread-controls.test.tsx` | Yes | Yes | New module: the cells first failed on `useIsMobile must be used within a IsMobileProvider` (harness, fixed by mocking). Then `expected false to be true` for (non-empty, settled, no webhook). Mutants: `m4b-url-error-inverted`, `m4b-loading-conjunct-dropped`, `m4b-url-conjunct-dropped` each redden exactly one cell | Yes |
| The three "webhook selected" cells (M4-b) | same | Yes | No | Green at base and under the inversion: when a webhook is selected the field is not mounted, so the message cannot show. Controls, no mutant can redden them | Yes |
| Clear gate (M4-c) | same | Yes | Yes | `expected true to be false`. Mutants `m4c-clear-on-name`, `m4c-clear-loading-dropped` (1 failed each) | Yes |
| Message id class (M4-d) | `WebhookProvider.validation-effects.test.tsx` | Yes | Yes | At base, `expected "vi.fn()" to not be called at all, but actually been called 1 times` for `see 12345 here`, `abc1`, `12 34`. Mutant `m4d-id-unanchored` (20 failed). The link-form refusals were first run on a tree that already held the anchored id: their reds are the later stand-ins: `m4d-regex-end-unanchored` (6), `m4d-regex-start-unanchored` (2), `m4d-regex-http` (3), `m4d-regex-prefix-dropped` (18), `m4d-regex-narrow` (12) | Yes |
| Overlap, webhook URL (M4-d) | same | Yes | Yes | `expected '111' to be '222'`. Mutant `m4d-stale-webhook-guard-dropped` (1 failed) | Yes |
| Overlap, message (M4-d) | same | Yes | Yes | `expected 'one' to be 'two'`. Mutant `m4d-stale-message-guard-dropped` (1 failed) | Yes |
| Webhook fetch rejected (M4-d) | same | Yes | Yes | `Unhandled Rejection: Error: network down`, vitest exit 1 at base. Mutant `m4d-webhook-catch-dropped` (72 passed, exit 1) | Yes |
| Message fetch rejected (M4-d) | same | Yes | Yes | `expected '' to be 'Could not load the message…'` plus an unhandled rejection. Mutants `m4d-message-catch-dropped` and `m4d-message-text` (1 failed each) | Yes |
| `parseMessageId` group | same | Yes | Yes | Mutant `m4d-provider-wrong-group` (`[3]` → `[2]`): 8 failed | Yes |
| `DISCORD_MESSAGE_LINK_REGEX` eight hosts, thirteen refusals | `constants.discord-message-link.test.ts` | Yes | Yes | New module, first row: ran after the file existed, before the widening: `expected undefined to deeply equal ['111','222','333']` for the four `discordapp.com` hosts (4 failed, 17 passed). The thirteen refusals are green at base: they are the controls for "everything refused before is still refused", reddened by the five regex mutants above | Yes |
| `message.getFromUrl` consumer | `message.get-from-url.test.ts` | Yes | Yes | New module. First run was after the widening, so the red is the stand-in `m4d-regex-narrow` (12 failed across the three files, including the four `discordapp.com` cells here) | Yes |

**Ordering disclosure (TDD).** `message.get-from-url.test.ts` and the link-form refusals in the provider test were written after the code they exercise (the widening, the anchored id); their reds are the named mutants. The `NewMessageModal` consumer has no DOM cell: its use is one expression, `DISCORD_MESSAGE_LINK_REGEX.test(messageIdOrUrl)`, in an `enabled` option, and driving it needs the dialog's load-option state and the tRPC query mock. That consumer is covered through the shared constant's test and walked by UAT (rev 16's human-observable limb). I list it as outstanding.

## Class Sweep

Enumerations run once (`verification/015/m4-enumerations-b25f561.txt`). Not a review fix round; these are the gaps my instruments exposed (the F-27 class).

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| F-27: `voided(async …)` effects with no catch | `grep -rn "voided(async" src --include=*.ts --include=*.tsx \| grep -v __tests__` (E16) | 8 hits: `NavMenu.tsx:138`, `useApiMethods.ts:23`, `ImageUploader.tsx:74`, `WebhookProvider.tsx:71` and `:111`, `useValidateWebhook.ts:22` and `:35`, `redis/index.ts:58` | `WebhookProvider.tsx:71`, `:111`: fixed. The other six are outside M4's named surface (`WebhookProvider.useValue`). `useValidateWebhook.ts:22`, `:35` are the New Message dialog's copy of the same two effects: reported to the planner (critic M-C4-1 names the same site). The rest are unread for their rejection behaviour and are not claimed |
| F-27: an unanchored digit test on user text | `grep -rnE '/\\d\+/\.test\|/\\d\+/\.exec' src \| grep -v __tests__` (E17) | 1 hit: `src/utils/hooks/useValidateWebhook.ts:40` | Not fixed: outside M4-d's named surface and the New Message dialog; the planner's fold of M-C4-1 decides. Re-run after the fix: `WebhookProvider.tsx` no longer matches (base had 2: this one and the provider's `:100`) |
| F-18: a disabled gate on the field the handler does not write | `grep -rn "threadName" src --include=*.tsx \| grep -v __tests__ \| grep -n isDisabled` (E18) | 1 hit: `WebhookMenu/index.tsx:335` (`isDisabled={!!threadName}` on the thread id input) | Correct there: the id input is disabled when a name is typed, and the reverse. Not applicable |
| F-17: the inverted URL error | `grep -rn "selectedWebhook !== null\|selectedWebhook === null" src \| grep -v __tests__` (E19) | 1 hit: `WebhookMenu/index.tsx:216`, now `=== null` | Fixed. Residual 0 for `!== null` (base had 1) |

## Test Execution Results

Raw outputs: `agent-output/verification/015/m4-testresults-paths-588d11a.txt`, `m4-testresults-588d11a.json`, `m4-vitest-stdout-588d11a.txt`, `m4-typecheck-588d11a.txt`, `m4-convention-check-588d11a.txt`. Counts from the vitest JSON reporter.

| Command | Result | Exit |
|---|---|---|
| `npx vitest run --reporter=json` at `588d11a` | 802 tests, 802 passed, 0 failed, 77 files (this includes the uncommitted M3 work-in-progress file `dialogs.enter-key.test.tsx`, 10 tests, untracked and not part of this handoff) | 0 |
| Path membership vs `m2-testresults-paths-6001f7f.txt` | 0 gone; 6 added: the five M4 files above and the untracked M3 file | — |
| `pnpm run typecheck` at `588d11a` | 0 errors | 0 |
| `git diff --numstat 6001f7f -- pnpm-lock.yaml package-lock.json` | empty | — |
| `node ~/.claude/tools/convention-check.js website --since=6001f7f` | 7 FAIL, all in the untracked M3 file `dialogs.enter-key.test.tsx` (not part of this handoff); 0 FAIL in the M4 files; 0 CANDIDATE; 1 SKIP | 1 |
| Mutation runs on the M4 test files | Control green (72 of 72); 19 mutants, each reddened its named cases (outputs `mutation-m4e-*-588d11a.txt`; the first set at `b25f561` is `mutation-m4-*-b25f561.txt`) | — |

- **Gate satisfaction, disclosed.** The convention-check's lint pass is whole-file. It flagged two Tailwind class orderings in `page.tsx` that I did not write; I reordered them. It rejected the comment `// shhhhh, just let it happen` in `WebhookProvider.tsx` (moved by my restructure); I removed it. My new test files were fixed with `eslint --fix` (import order, brace newlines) and the `vi.mock` calls kept above the imports they hoist over by moving the imports up.
- **SKIP.** The id-token basename check is unchecked by the tool (as at M1 and M2); I ran the CLAUDE.md negative form by hand over the new files: 0 hits.

## Outstanding Items

1. **M4-c "name view".** Reading above; with the planner.
2. **`useValidateWebhook` (the New Message dialog's webhook load).** It has the same permissive id test (`:40`) and the same two uncaught effects (`:22`, `:35`) with no stale guard. Critic M-C4-1 names the same site. Not changed; the planner's fold decides whether M4-d grows to cover it.
3. **`NewMessageModal`'s link-load `enabled` expression has no DOM cell** (reason in the ordering disclosure). UAT's walk covers it.
4. **A stuck-disabled Send guard is unmutated.** The re-press-after-settle case is a control without a mutant.
5. **A late response after unmount.** The `isStale` flag also covers it; I wrote no case for it.
6. **Self-diagnosis (method).** My first M4-b table had four "webhook selected" cells that I expected to discriminate the fix. They cannot: the field is unmounted when a webhook is selected. I found it by running the inversion mutant and seeing those cells stay green. Had I stopped at "the table has 8 cells", I would have claimed coverage that the DOM does not support.
7. **Self-diagnosis (method), M4-a failure case.** At base the failed-send case failed on its first assertion and never reached the rejection, so its first red said nothing about the unhandled rejection. I produced the rejection's red on an intermediate tree instead. A test that asserts two properties in sequence hides the second one's red behind the first.

## Next Steps

Code review of `588d11a`, then QA Phase 2 for M4. M4's review waits on the plan revision (rev 16) gate round, per steering. The planner's answers on M4-c and M-C4-1 may add a follow-up delivery.
