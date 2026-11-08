---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Active
Status-Detail: "M4 (F-16, F-17, F-18, F-27, with both F-27 sites and the D27 cross-guild rider) delivered and committed on website chain/015-bug-evaluation-fixes at 1e12837; awaiting code review Round 7. M3 is held for a real-Chrome read (a helper is running it); M1-c and M1-h are released and not yet rebuilt."
Handoff-At: "1e12837 — repos=website"
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
| 2026-11-08T07:15 | steering-hooks-015 → implementer-hooks-015 (messages: rulings `3d7af67`, plan revs 17–19) | M4-d over both F-27 sites; D27 rider; CR-11, CR-13 | `useValidateWebhook` brought to the same class, one shared parser, named capture groups; `getFromUrl` bound to the authorized guild. Tip `1e12837`. |

## Implementation Summary

- **Both F-27 sites (rev 17, D28).** The send page's box (`WebhookProvider`) and the New Message dialog's webhook load (`useValidateWebhook`) now share one parser, `src/utils/parseMessageId.ts`, over the shared link rule. Both catch a failed fetch, show the one failure text and apply only the latest input's result.
- **The cross-server read is closed (D27, rev 19).** `getFromUrl` looks the link's channel up (`redis.fetchChannel`, retyped as `Channel` for CR-13) and returns the message only when the channel's `guild_id` equals the guild that passed `authorizeGuildAdmin`. A different guild, or no `guild_id` (a DM or group-DM channel), is refused with the same answer as a missing message and no content. The check runs before the message request and after the authorization gate. The lookup's own refusals keep their texts.
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
| M4-d text and the D27 rider | Rev 19 § M4-d (gate round: critic `f8d564c`, architect `4002dc7`, QA, code review `7d26b77`); owner rulings `3d7af67` (F-27's second site; CR-12 rides M4-d); CR-11, CR-13 (code review `430c277`) | `WebhookProvider.validation-effects.test.tsx`, `useValidateWebhook.validation-effects.test.tsx`, `constants.discord-message-link.test.ts`, `message.get-from-url.test.ts`, `redis.fetch-channel.test.ts` |
| E-5 (no network in tests) | `fetch` is stubbed with `vi.stubGlobal`; `sendWebhook`, `getApi`, `redis` and the Redis client are mocked; no test builds a real request | The provider, hook, page, router and redis tests |
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
| New Message dialog's webhook load, message box | New Message dialog, "Message ID or Link" with a webhook URL | Same input class, same failure text and same ordering as the send page (D28) | 1: `useValidateWebhook`, same effects |
| A link into a channel of another server | New Message dialog bot load, or `getFromUrl` called directly | Answers "Message not found. Is the bot in this guild?", the same as a missing message, with no content (D27) | 1: the existing `NOT_FOUND` case in `getFromUrl` |

Decisions asked and answered: wording of the failure text (owner's block `9b94838`); link class and hosts (`9f97a5f`, `7207289`).

**Open reading, held for the planner.** M4-c says Clear is enabled "in both the list and the name views". Clear exists only in the list view (`!isCustomMenuOpen`); the name (custom) view has only a List button. I coded `isDisabled={isLoading || !threadId}`, which satisfies the stated property, and added no button. If the planner means a Clear in the name view, that is a new control.

## Files Modified

| Path | Changes | Lines |
|---|---|---|
| `src/app/message/m/[id]/send/page.tsx` | `useLoading` pending state; `withSending` around `sendWebhook`; `.catch(() => null)`; `&& !isSending` in `allowSave`. Lint gate: two Tailwind class orderings reordered on lines I did not write (the V2-patch warning block) | +9 −7 |
| `src/app/message/m/[id]/send/_components/WebhookMenu/index.tsx` | `selectedWebhook === null`; Clear gated on `!threadId` | +2 −2 |
| `src/providers/WebhookProvider.tsx` | `parseMessageId` over `DISCORD_MESSAGE_LINK_REGEX`; both effects restructured to hold an `isStale` flag with a cleanup, and to catch a rejected fetch; the failure text. Comment gate: the old comment `shhhhh, just let it happen` was removed | see diff |
| `src/constants/index.ts` | `DISCORD_MESSAGE_LINK_REGEX` admits `discordapp.com` and the three prefixes on both domains, with named groups `guildId`, `channelId`, `messageId`; `MESSAGE_LOAD_FAILED_ERROR` | +2 −1 |
| `src/utils/hooks/useValidateWebhook.ts` | Both effects: `isStale` flag with cleanup, try/catch with the failure text, the id from `parseMessageId` | see diff |
| `src/server/api/routers/message.ts` | `getFromUrl`: named groups; `redis.fetchChannel` then a `guild_id` equality check before the message request | +10 −1 |
| `src/utils/redis/index.ts` | `fetchChannel` types the response as `Channel` (CR-13) | +1 −1 |

## Files Created

| Path | Purpose |
|---|---|
| `src/app/message/m/[id]/send/__tests__/page.send-in-flight.test.tsx` | M4-a |
| `src/app/message/m/[id]/send/_components/WebhookMenu/__tests__/WebhookMenu.url-and-thread-controls.test.tsx` | M4-b, M4-c |
| `src/providers/__tests__/WebhookProvider.validation-effects.test.tsx` | M4-d: id and link class, failure text, overlap |
| `src/constants/__tests__/constants.discord-message-link.test.ts` | The shared rule: eight hosts admitted with captures; thirteen refusals |
| `src/server/api/routers/__tests__/message.get-from-url.test.ts` | `getFromUrl`: eight hosts reach the lookup with the link's own guild, channel and message literals; four refusals do not; the D27 cells (same guild returned; other guild, DM and group-DM refused with no content; lookup refused; no lookup for an unauthorized caller) |
| `src/utils/parseMessageId.ts` | The one id parser both F-27 sites use |
| `src/utils/hooks/__tests__/useValidateWebhook.validation-effects.test.tsx` | M4-d at the dialog's site |
| `src/utils/redis/__tests__/redis.fetch-channel.test.ts` | `fetchChannel`'s 200 and its four mapped refusals, texts as literals |
| `agent-output/verification/015/mutators/m4-table.py`, `mutation-m4-*-b25f561.txt`, `mutation-m4e-*-588d11a.txt`, `m4-*` gate captures, `m4-enumerations-b25f561.txt`, `m3-premise-probe-6001f7f.txt`, `m3-document-root-probe-6001f7f.txt` | Mutants, gate captures and the M3 probes |

## Patterns Extended

| Surface | Pattern extended (rung) |
|---|---|
| Pending state on Send | `useLoading` (`src/utils/hooks`), used by `WebhookProvider` for the same purpose. Rung 1 |
| Shared link rule | `DISCORD_MESSAGE_LINK_REGEX`, already consumed by `NewMessageModal` and `message.getFromUrl`; the provider joined it instead of copying. Rung 1 |
| Provider test | A real `Provider` mounted with `createRoot`/`act` through `~/components/__tests__/helpers/dom` (`mountDom`); `GuildProvider` mocked. Rung 2 (the `JsonModalBody.*` tests mount a real provider) |
| Page and menu tests | `mountDom` plus provider mocks; the press sequence is `SectionEditor.auto-remove-dispatch`'s `pointerdown`/`pointerup`/`click`. Rung 2 |
| Parser | `parseMessageId` is the new shared home for both sites' id test (AF-19). Rung 1 for the constant it reads |
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
| `useValidateWebhook` input class (rev 17) | `useValidateWebhook.validation-effects.test.tsx` | Yes | Yes | New module, first row. Against the real base: `expected [ Array(1) ] to deeply equal []` for `abc123`, `see 12345 here`, an other-host link, a trailing-path link and an `http://` link (5 failed). Mutants `m4d-parse-unanchored-id` (33 across the files), `hook-uses-own-id-test` (13) | Yes |
| `useValidateWebhook` fetch failure and ordering | same | Yes | Yes | Against base: `expected null to be 'Could not load the message…'` (webhook and message effects), unhandled `Error: network down`, `expected '111' to be '222'`, `expected 'one' to be 'two'`. Mutants `hook-webhook-catch-dropped`, `hook-message-catch-dropped`, `hook-stale-webhook-guard-dropped`, `hook-stale-message-guard-dropped` (1 failed each) | Yes |
| `parseMessageId` trim and group | via the two consumers' tests | Yes | Yes | Mutants `m4d-parse-untrimmed` (1), `m4d-parse-wrong-group` (16), `m4d-parse-unanchored-id` (33) | Yes |
| `getFromUrl` link's own guild, channel and message (CR-11) | `message.get-from-url.test.ts` | Yes | Yes | Mutant `rider-group-swap` (guild and channel swapped): 9 failed, from the literal `'111'` expected at `authorizeGuildAdmin` and the literal `/channels/222/messages/333` path | Yes |
| `getFromUrl` D27: channel bound to the guild | same | Yes | Yes | Against the real base: `expected "vi.fn()" to be called with arguments: [ '222' ]`; `expected { value: … } to have property "error"`; `promise resolved … instead of rejecting` (DM channel); `expected TRPCError … to match object { code: 'FORBIDDEN' }` — 4 failed, 14 passed. Mutants: `rider-guild-check-dropped` (3), `rider-compares-channel-id` (9), `rider-refuses-only-when-set-and-differs` (2: the DM and group-DM cells), `rider-check-after-message-fetch` (5) | Yes |
| `getFromUrl`: same answer as a missing message; no lookup when unauthorized | same | Yes | No | Both green once the rider exists and were written with it: the answer text is the router's existing `NOT_FOUND`; the unauthorized cell guards the order of the gate and the lookup. Controls; `rider-check-after-message-fetch` reddens the order cells | Yes |
| `redis.fetchChannel` (CR-13 retype; refusals keep their texts) | `redis.fetch-channel.test.ts` | Yes | No | New module. Green at base: the retype is type-only and the four mapped refusals are unchanged, so these are regression controls with literal texts. They run the real `fetchChannel` with the Redis client stubbed in memory. No mutant of the retype exists: it is a type, checked by `pnpm run typecheck` (the router's `guild_id` access failed to compile on `APIChannel` until narrowed) | Yes |

**Ordering disclosure (TDD).** `message.get-from-url.test.ts` and the link-form refusals in the provider test were written after the code they exercise (the widening, the anchored id); their reds are the named mutants. The `NewMessageModal` consumer has no DOM cell: its use is one expression, `DISCORD_MESSAGE_LINK_REGEX.test(messageIdOrUrl)`, in an `enabled` option, and driving it needs the dialog's load-option state and the tRPC query mock. That consumer is covered through the shared constant's test and walked by UAT (rev 16's human-observable limb). I list it as outstanding.

## Class Sweep

Enumerations run once (`verification/015/m4-enumerations-b25f561.txt`). Not a review fix round; these are the gaps my instruments exposed (the F-27 class).

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| F-27: `voided(async …)` effects with no catch | `grep -rn "voided(async" src --include=*.ts --include=*.tsx \| grep -v __tests__` (E16) | 8 hits at `588d11a`: `NavMenu.tsx:138`, `useApiMethods.ts:23`, `ImageUploader.tsx:74`, `WebhookProvider.tsx:71` and `:111`, `useValidateWebhook.ts:22` and `:35`, `redis/index.ts:58` | The four in `WebhookProvider.tsx` and `useValidateWebhook.ts` (the two F-27 sites, D28): fixed, each now with a stale flag and a catch (re-run `m4-enumerations-1e12837.txt`). The other four (`NavMenu`, `useApiMethods`, `ImageUploader`, `redis/index.ts`) are outside F-27's named surface and unread for their rejection behaviour; I do not claim them |
| F-27: an unanchored digit test on user text | `git grep -nE '\\d\+/\.test' 6001f7f -- src` (the critic's enumeration, M-C4-1), re-run at `1e12837` | 2 hits at the base (`WebhookProvider.tsx:100`, `useValidateWebhook.ts:40`); 0 at `1e12837` | Both fixed. Residual 0 |
| CR-12: a guild-authorized read that is not bound to the guild | `git grep -c guild_id <sha> -- src/server` | 0 files at `6001f7f`; at `1e12837`, `message.ts` (1) and the new test | Fixed at the one reader of a link's channel (`getFromUrl`); no other reader in `src/server` takes a channel id from a link |
| F-18: a disabled gate on the field the handler does not write | `grep -rn "threadName" src --include=*.tsx \| grep -v __tests__ \| grep -n isDisabled` (E18) | 1 hit: `WebhookMenu/index.tsx:335` (`isDisabled={!!threadName}` on the thread id input) | Correct there: the id input is disabled when a name is typed, and the reverse. Not applicable |
| F-17: the inverted URL error | `grep -rn "selectedWebhook !== null\|selectedWebhook === null" src \| grep -v __tests__` (E19) | 1 hit: `WebhookMenu/index.tsx:216`, now `=== null` | Fixed. Residual 0 for `!== null` (base had 1) |

## Test Execution Results

Raw outputs: `agent-output/verification/015/m4-testresults-paths-1e12837.txt`, `m4-testresults-1e12837.json`, `m4-vitest-stdout-1e12837.txt`, `m4-typecheck-1e12837.txt`, `m4-convention-check-1e12837.txt`. Counts from the vitest JSON reporter.

| Command | Result | Exit |
|---|---|---|
| `npx vitest run --reporter=json` at `1e12837` | 835 tests, 835 passed, 0 failed, 79 files (this includes the uncommitted M3 work-in-progress file `dialogs.enter-key.test.tsx`, 10 tests, untracked and not part of this handoff) | 0 |
| Path membership vs `m2-testresults-paths-6001f7f.txt` | 0 gone; 8 added: the seven M4 files and the untracked M3 file | — |
| `pnpm run typecheck` at `1e12837` | 0 errors | 0 |
| `git diff --numstat 6001f7f -- pnpm-lock.yaml package-lock.json` | empty | — |
| `node ~/.claude/tools/convention-check.js website --since=6001f7f` | 7 FAIL, all in the untracked M3 file `dialogs.enter-key.test.tsx` (not part of this handoff); 0 FAIL in the M4 files; 0 CANDIDATE; 1 SKIP | 1 |
| Mutation runs on the M4 test files | Control green (105 of 105 across the seven M4 files, `mutation-m4f-control-1e12837.txt`); 34 mutants (the table `mutators/m4-table.py`), each reddened its named cases (`mutation-m4f-*-1e12837.txt`). Earlier sets: `mutation-m4e-*-588d11a.txt`, `mutation-m4-*-b25f561.txt` (their targets moved with later commits; kept as records) | — |

- **Gate satisfaction, disclosed.** The convention-check's lint pass is whole-file. It flagged two Tailwind class orderings in `page.tsx` that I did not write; I reordered them. It rejected the comment `// shhhhh, just let it happen` in `WebhookProvider.tsx` (moved by my restructure); I removed it. My new test files were fixed with `eslint --fix` (import order, brace newlines) and the `vi.mock` calls kept above the imports they hoist over by moving the imports up.
- **SKIP.** The id-token basename check is unchecked by the tool (as at M1 and M2); I ran the CLAUDE.md negative form by hand over the new files: 0 hits.

## Outstanding Items

1. **M4-c "name view".** Rev 14 restated M4-c without a name-view button (the plan log's row 14 says it "drops the non-existent name-view button"), which matches what I coded: `isDisabled={isLoading || !threadId}`, no new control. Closed unless review reads otherwise.
2. **`NewMessageModal`'s link-load `enabled` expression has no DOM cell.** The use is one expression, `DISCORD_MESSAGE_LINK_REGEX.test(messageIdOrUrl)`, in an `enabled` option, and driving it needs the dialog's load-option state and the tRPC query mock. It is covered through the shared constant's test and walked by UAT.
3. **The send page's webhook-URL effect shows "Invalid URL" on a network failure, not the message-load text.** The plan's "at both sites a fetch that fails with no response shows exactly …" is a sentence about the message box; the send page has no error line for the webhook field other than "Invalid URL" (M4-b). In the New Message dialog the webhook effect's failure uses the same text in its existing error line. Review may read the plan more widely.
4. **A stuck-disabled Send guard is unmutated.** The re-press-after-settle case is a control without a mutant.
5. **The Discord leg of the rider is unexecuted** (the plan says so): the tests supply the channel object. A real Discord response for a DM or a group DM is not read.
6. **`eslint --fix` over directories (disclosure).** I ran `eslint --fix` on `src/utils`, `src/providers` and `src/constants` once; it reformatted 23 unrelated test files. I had written none of those changes and they were mine to undo: I reverted exactly those 23 paths with `git checkout --` before the next commit (the tree held no other uncommitted change besides the untracked M3 file; `git status` before and after is in the session log, not a capture). Later `--fix` runs named files only.
7. **Self-diagnosis (method), M4-b.** My first M4-b table had four "webhook selected" cells that I expected to discriminate the fix. They cannot: the field is unmounted when a webhook is selected. I found it by running the inversion mutant and seeing those cells stay green. Had I stopped at "the table has 8 cells", I would have claimed coverage that the DOM does not support.
8. **Self-diagnosis (method), M4-a.** At base the failed-send case failed on its first assertion and never reached the rejection, so its first red said nothing about the unhandled rejection. I produced the rejection's red on an intermediate tree instead. A test that asserts two properties in sequence hides the second one's red behind the first.
9. **Self-diagnosis (method), the second site.** I coded M4-d to the plan's one named site and found the sibling (`useValidateWebhook`) in my own class sweep, but wrote it down as a follow-up rather than as a miss in the plan's enumeration; the critic found the same site independently. The sweep's value was the finding, not the disposition: a sibling the sweep turns up inside the criterion's own predicate is a scope question to raise the same hour, not a line in an outstanding-items table.
10. **Review items owed in the M1 round.** CR-9 (delete the unreferenced `validateEmbed` and its `eslint-disable`) and CR-6 (correct my CR-4 sweep line on `x-query-params`) are taken in the M1 rebuild round.

## Next Steps

Code review Round 7 on `1e12837` (one tree: both F-27 sites and the rider), then QA Phase 2 for M4.
