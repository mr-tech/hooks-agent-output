---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Active
Status-Detail: "Delta pass on plan rev 22 (5201612, read from 3d193f9): APPROVED. Recommended, none blocking: AF-23 (M5-h class (3) as makeEditable's own throw), AF-24 (one validator for M6-l's text) and AF-25 (the over-40 chrome also shows on /preview; the D32 scope question is with steering). AF-18 is still recommended. A later revision is read on its delta."
---

# Architecture Findings — Plan 015: Bug-evaluation fixes (conformance pass)

## Changelog

| Date | Event | Summary |
|---|---|---|
| 2026-11-08T05:15 | Conformance pass, plan rev 3 (agent-output `800ca67`), briefed by steering-hooks-015 | Every concrete form the plan writes was read against website `7ce866b` and preview-image-generator `471578f`, which are the chain branches' current HEADs. Result: two required changes (AF-1, AF-2), two recommended (AF-3, AF-4), and four conforming forms recorded (AF-5 to AF-8). Two Problem Areas registered: AF-9, and the master-document correction in AF-10. `system-architecture.md` § preview-image-generator was corrected to the read mechanism. The P-3 wording was proposed, not landed. **APPROVED_WITH_CHANGES.** Process disclosure: this run changed the master document's `Last Updated` header with an in-place `sed -i`, not with `record-edit.js` or the edit tools, which breaks the record-writing rule. The diff was read afterwards (7 insertions, 2 deletions), and that change is the only one outside the `record-edit.js` edits. |
| 2026-11-08T05:18 | P-3 put to the owner (role-internal selection prompt) | He selected "Agent: record intended". `preview-image-generator.md` P-3 was rewritten in place to the build-and-copy route, with his prompt quoted verbatim, which closes AF-10's second limb. |
| 2026-11-08T05:29 | Delta pass, plan rev 4 (`f19e688`), on planner-hooks-015's request to read M8-a (1) against AF-9d | AF-1 to AF-4 are discharged as folded. AF-11 (LOW): the transition stop's stated limit gets the outage window wrong. AF-12 (INFO): the route M1-a gives for the two latent sites is wrong, though its conclusion holds. AF-9d's bearing on stop (1) was assessed as low. **APPROVED.** |
| 2026-11-08T05:34 | Delta pass, plan rev 5 (`1d0f890`, read from `f19e688`), on steering-hooks-015's request | The delta is D19 (stop (2) caused by devops' `prod.yml` re-run), AF-11 and AF-12 folded as asked, D15's consequence, run 2's reader, and X-15. No criterion changed, and nothing new conflicts with the architecture. The plan applies my AF-9d reading to stop (2). Re-checked: it holds there with more force. A re-run of the same commit writes byte-identical `dist` and dependencies, and `startOrReload` runs after the copy has finished, so the new process drains entirely against identical files. **APPROVED**, no findings. |
| 2026-11-08T05:44 | Delta pass, plan rev 6 (`5d516d9`, read from `1d0f890`), on steering-hooks-015's request (criterion text changed) | AF-13 MEDIUM is required: E-1's `unshare -rn` leaves `lo` down, shown by a run on this box. AF-14 LOW is recommended: a non-creating pool read, placed in `getPool.ts`. AF-15 LOW is recommended: M1-c's no-account cell. X-16 has been joined to AF-9a's Problem Area row. **APPROVED_WITH_CHANGES.** Process disclosure: one typo in the AF-13 heading was fixed with `sed -i`, not with the edit tools, which breaks the record-writing rule a second time this session. That was the only change it made, and the diff was read afterwards. |
| 2026-11-08T05:49 | Delta pass, plan rev 7 (`38b12e6`, read from `5d516d9`), on steering-hooks-015's request | AF-13 to AF-15 are folded as asked. AF-16 LOW is recommended: in the no-account cell, the session-row removal is the NextAuth adapter's (`signout.js` calls `deleteSession` before `events.signOut`, next-auth 4.24.5), not `removeUserSession`'s. **APPROVED.** |
| 2026-11-08T05:52 | Delta pass, plan rev 8 (`1f7715b`, read from `38b12e6`), on steering-hooks-015's request | AF-16 is folded: the session row is attributed to next-auth's adapter, and the ordering anchor is now the `Accounts` update. The run-2 reads are bounded to the stopped process's span. `Created instance` was confirmed at `471578f` `src/getPool.ts`, logged by the factory's `create`. No findings. Landed `preview-image-generator.md` A-1 (agent-designed): the four log lines the host read matches are an interface. **APPROVED.** |
| 2026-11-08T06:28 | Delta pass, plan rev 9 + rev 10 (`bceb84a`, read from rev 8 `1f7715b`, one pass on steering-hooks-015's instruction) | AF-17 MEDIUM is required. M1-c's lookup-error residue leaves `user-session-token`, `fetchAccountFromSession`'s 600 s session→account cache read by `authorizeGuildAdmin`, alive with an unrevoked token after sign-out. The two session-scoped keys must be cleared for every member of the class. The cache-invalidation class is registered as a Problem Area. Every other delta limb conforms. **APPROVED_WITH_CHANGES.** |
| 2026-11-08T06:32 | Delta pass, plan rev 11 (`14fe94f`, read from rev 10 `bceb84a`), on steering-hooks-015's request | AF-17 is discharged by D22 and M1-c's lookup-error cell: both session-scoped keys are deleted before the rejection reaches the caller, and the residue is limited to `user-guilds`, the `Accounts` update and the revoke. M1-h's eight-row decision table, with its "or returns" trigger, conforms. The run-2 span is now anchored on `pm2.log`'s stop timestamps and checked against the out log's ISO stamps. Run 1's capture shows the two clocks agree: `pm2.log` 2023-08-22T01:57:43 `online` and out log `2023-08-22T01:57:43.367Z Server running at` are the same event, so no time-zone offset separates them. RK-7's reducing predicate and the re-derivation reading conform. No findings. **APPROVED.** |
| 2026-11-08T06:42 | Delta pass, plan rev 12 + rev 13 (`9cbe755`, read from `14fe94f`, one pass on steering-hooks-015's instruction; D23's assumption not re-read) | Every limb conforms. AF-18 LOW is recommended for the M1-c rebuild: read the `Accounts` row directly in `removeUserSession` and retire `fetchUserAccount`'s now-callerless `skipUpdate` mode, which is CR-3's root, one cache key with two meanings. Two Problem Areas registered. **APPROVED.** |
| 2026-11-08T06:54 | Delta pass, plan revs 14–16 (`565e240`, read from `9cbe755`, one pass on steering-hooks-015's instruction; D23's assumption not re-read) | Every limb conforms. D26's single widening of `DISCORD_MESSAGE_LINK_REGEX` follows A-3's one-definition pattern, and its consumer list matches `git grep` at `6001f7f`. AF-19 LOW is recommended: M4-d takes the id from the constant's capture group, as `getFromUrl` does, not from `split('/').pop()`. **APPROVED.** |
| 2026-11-08T07:03 | Delta pass, plan revs 17–18 (`67cb5e7`, read from `565e240`, one pass on steering-hooks-015's instruction) | Every limb conforms. The CR-12 rider's `fetchChannel` is the right primitive: the guild channel list misses archived threads. No sibling exists under D28, since every other bot-token call is guild-scoped. AF-20 LOW is recommended: correct `fetchChannel`'s `request<Guild>` generic, and give each mapped refusal status a cell. Landed `website.md` A-5. **APPROVED.** |
| 2026-11-08T07:06 | Delta pass, plan rev 19 (`330348f`, read from `67cb5e7`), on steering-hooks-015's request | The CR-12 rider conforms. Belonging is now `guild_id` equality over the field's whole domain, so a DM or group-DM channel without `guild_id` is refused. The listed refusal texts match `fetchChannel` at `6001f7f`: 401/403 "Missing permissions…", 404 "Channel does not exist.", and any other status "An unknown error occurred…". AF-20's refusal-cell limb is folded; its type limb went to the implementer as code review CR-13. No findings. **APPROVED.** |
| 2026-11-08T07:25 | Delta pass, plan rev 20 (`e118cc3`, read from `330348f`), on steering-hooks-015's request | D29's webhook-load limb conforms. It copies the literal "Invalid URL" into the New Message dialog, which follows the current pattern: inline error literals, with no shared definition. A `git grep` at `1e12837` finds the string at 8 non-test sites in two spellings, `Invalid URL` (3) and `Invalid URL.` (4 plus the router), and an `invalidUrl` key in `src/lang/generated/*.json` that nothing outside `src/lang` consumes. Centralising it would be a preferable deviation, so under the standing default the plan follows the current pattern. AF-21 INFO is registered as a Problem Area. No plan change. **APPROVED.** |
| 2026-11-08T07:30 | Delta pass, plan rev 21 (`3d193f9`, read from `e118cc3`), on steering-hooks-015's request | CR-16 is folded as option (a). The dialog's "Invalid URL" goes on its existing shared error line, with no new field-level error. That follows the current pattern; option (b) would have been an avoidable deviation (new UI). Read at website `1e12837`: `NewMessageModal` `messageErrorString` = `discordMessageError ?? commandMessageError ?? webhookError ?? webhookMessageError`, rendered once below the load options; `errorMessage=` 0 in the file; the send page's field error is `WebhookMenu` `errorMessage` (`'Invalid URL'` on `url && !isWebhookLoading && selectedWebhook === null`). D30's removal of M3 changes no architecture. AF-22 INFO is registered as a Problem Area: the dead `tagName` compare stays at three sites, so whatever keeps Enter-on-Cancel safe is not that guard and has not been identified. **APPROVED.** |
| 2026-11-08T08:00 | Delta pass, plan rev 22 (`5201612`, read from `3d193f9`), on steering-hooks-015's request | Read at website `da24eb7`. M5-h's classes, X-19 and M6-l (vi) conform. AF-23 LOW: class (3)'s conforming form is `parseMessageData`'s existing `try` widened over `makeEditable`, not a transcribed shape check. Two listed members are wider than its throws: an empty-string `embeds`/`fields`, and array elements. AF-24 LOW: (ii) and (vi) share one text, so it belongs in a `limits.tsx` validator beside `validateDisplayableTextCount`, called by `validateMessage` and the editor. The border sibling is confirmed by read, and the Send page gets the line through `MessagePreview`. AF-25 LOW: the line and border are not gated on `isEditing`, so `/preview` and the generated image (D-003) show them too, which D32's option text does not name. The scope judgement went to steering. One Problem Area registered. **APPROVED.** |

## Verdict (rev 22, `5201612`, one pass from rev 21 `3d193f9`): APPROVED

These limbs conform: M5-h's three classes (D31, D28 under steering's call), X-19 as its residue, and M6-l (vi)'s placement (D32). AF-23, AF-24 and AF-25 are recommended and do not block. AF-25 also carries a scope question for steering. All mechanism reads below are at website `da24eb7`.

### AF-23 LOW — M5-h class (3): the conforming form is the existing `try` widened over `makeEditable`, and two listed members are wider than its throws

**Pattern.** `src/app/preview/page.tsx` `parseMessageData` already decides refusal by the parser's own failure: `try { JSON.parse(query) } catch { return null }`, then the non-object test. The conforming form for class (3) is to run `makeEditable({ data })` inside that same `try`. Then the predicate is `makeEditable`'s own throw, by construction.

A separate shape check that transcribes `makeEditable`'s field reads would be a second definition of its input domain. It would drift the first time `injectComponentKeys` learns a new component type. That makes it an avoidable deviation.

**Where the plan's list and the throws differ.** Each claim below is read from `makeEditable` and `injectComponentKeys` in `src/utils/index.ts`.

- **`embeds` or `fields` as an empty string.** The plan's member is "present, not null and not an array". But `for (const embed of casted.data.embeds ?? [])` iterates `""` zero times, so `makeEditable` returns normally. Every other non-array value throws: a number, a boolean or an object is not iterable, and a non-empty string throws on `embed._key = …` in strict module code. **Unread:** whether the editor then renders `{"embeds":""}` or crashes. `DiscordMessageEditor` reads `embeds.length` and `embeds.map`, and `"".map` is undefined. I did not run it.
- **An array as an element** (in `embeds`, in `fields`, or as a type-1/9 child or a type-12 item). The plan's member is "null or not an object". In JS an array is an object, so `[]._key = …` succeeds and `makeEditable` does not throw. The plan uses "a JSON object" to exclude arrays in class (2). Read the same way here, the plan refuses arrays where the function does not throw.

The rest of the list matches the function: `components` truthy and not an array (`.map` throws); `null` or primitive nested children (`child._key` throws); top-level elements never throw (`{ ...null }` is `{}`, as X-19 records); type-17 children recurse through `injectComponentKeys`.

**Recommendation.** State class (3) as "`makeEditable` throws on it", and keep the listed members as the cells' examples. Or keep the list and exclude the two edges. Either way the planner's "anything that renders today still renders" holds only if the predicate is the throw. Under the `try` form, X-19's boundary is exact.

### AF-24 LOW — M6-l (ii) and (vi) are one text, so it needs one definition, in the existing validator pair pattern

(ii) has `validateMessage` return an error naming the count and the limit. (vi) shows "Message has N components; the limit is 40." in the editor. The current pattern for exactly this pair is in `src/utils/limits.tsx`:

- `validateEmbedCharacterCount` and `validateDisplayableTextCount` are each called by `validateMessage`, which is the send gate and the stored `valid`.
- `DiscordMessageEditor` (`index.tsx`) calls the same two functions directly for its red lines and the border.

The conforming form is a third validator beside them, built on (iii)'s lifted counter. `validateMessage` and the editor both call it, so the disabled Send and the red line cannot disagree on the text or the threshold. A literal in the editor beside a second one in `validateMessage` would be an avoidable deviation.

**Confirmed by read** (the plan marks it the implementer's read): the border is `styles.errorBorder` on `discord-visualizer__accessories`, keyed on `embedCharacterError || v2TextError`, so the new error joins that disjunction. "On the Send page" needs no second site. The Send page renders `MessagePreview`, which renders `~/components/dynamics/DiscordMessageEditor`.

### AF-25 LOW — the over-40 line and border also render on `/preview`, which the generator screenshots (D-003)

Neither the `v2TextError` line nor the `errorBorder` class is gated on `isEditing`. `src/app/preview/page.tsx` renders the same `DiscordMessageEditor`, and D-003 makes that route the source of every stored preview image.

So under (vi), following its siblings, an over-40 message's preview image will carry the red line and the red border. A message over a text limit already does the same today.

D32's option text names "the editor and the Send page" only. Following the siblings is the conforming form. Gating the chrome off the preview route would be a deviation that also changes the two sibling errors.

**Recommendation.** (vi) states that `/preview` and the generated image show it too, as for the text-length errors. Whether that falls inside D32's selection is steering's judgement. The cross-cutting shape, validation chrome inside generated preview images, is registered as a Problem Area.

## Verdict (rev 21, `3d193f9`, one pass from rev 20 `e118cc3`): APPROVED

These limbs conform:

- **CR-16, option (a).** The webhook-load limb now places "Invalid URL" where each site already shows a webhook-load error.
  - **Send page.** The custom-URL input's field error, `WebhookMenu` `errorMessage`, at website `1e12837`. M4-b's text and condition are unchanged.
  - **New Message dialog.** Its one shared error line, `NewMessageModal` `messageErrorString`, rendered once below the load options. At `1e12837` it is `discordMessageError ?? commandMessageError ?? webhookError ?? webhookMessageError`. The new text reaches it through `useValidateWebhook`'s `webhookError`, whose `catch` sets `MESSAGE_LOAD_FAILED_ERROR` today. That is the one-site change D29 prices. The precedence stays as it is.
  - **No field-level error is added.** `grep -c "errorMessage="` over `NewMessageModal.tsx` at `1e12837` returns 0, and the plan adds none.
  - **Why (a) is the conforming form.** A dialog field error would be new UI, a second error place for one input class. That would be an avoidable deviation from the dialog's single-error-line pattern, and D29's "one small change" doesn't cover it. The cell's "fails if the text appears nowhere or anywhere else" pins the placement without reading the expected value from the code under test.
- **D30, M3 removed.** No architecture line rested on M3. The removal is the owner's selection, made on the implementer's real-Chrome read (`verification/015/m3-chrome-read/README.md`, `8996505`). X-18 states the residue: the uploader's Clear button, a production build, and other browsers.

AF-21's ninth "Invalid URL" copy, registered at rev 20, is the same copy rev 21 places. There is no tenth.

### AF-22 INFO — the Enter guard D30 leaves is inert, and the real one is unidentified

At website `1e12837`, `git grep -c "tagName !== '~/components/Button'"` returns one hit in each of `WarningDialog.tsx`, `ConfirmationDialog.tsx` and `ImageUploader.tsx`. A DOM `tagName` is an uppercase element name, never an import path, so each compare is always true. Read as written, every handler confirms on any Enter.

The Chrome read shows that does not happen for Cancel. So something upstream stops the keydown before the `useHotkeys` listener. The implementer's jsdom probe shows it stopped in the capture phase at `document`. **What stops it is unread.** This pass did not establish whether it is `@react-aria/interactions`' press handling or the dialog primitive.

**Architectural consequence.** The value statement "a Cancel key press never deletes" is carried as true (D30), and it is. But it holds through a mechanism nobody has named, it has no test, and the code carries a guard that reads as the protection while doing nothing. A dependency upgrade could remove the real mechanism without any signal.

This is not a plan change: D30 is the owner's selection, and its option text named the dead code. It is registered in `system-architecture.md` § Problem Areas.

**Fix shape for a later chain:** name the stopping mechanism, then delete the dead compare or make it a real check, under one real-browser cell.

## Verdict (revs 17–18, `67cb5e7`, one pass from rev 16 `565e240`): APPROVED

These limbs conform:

- M4-d over F-27's two predicate sites, enumerated by the defect's own predicate (D28);
- trimming, the refused-input display and the guild/channel/message groups;
- the id taken from the constant's group (AF-19);
- the CR-12 rider (D27).

AF-20 is recommended and does not block.

**The rider's design is the right primitive, and it has no siblings.**

- **Siblings.** I read every bot-token Discord call at `6001f7f` (`git grep -n "getApi()"` over `src`). Each is guild-scoped and keyed on the authorised guild: `fetchGuild`, the guild channel and active-thread lists, and the guild webhooks. Each is bound by construction. `cron.ts` posts to stored webhook URLs. `getFromUrl` is the only channel-scoped read of a user-supplied id, so D28 adds no sibling.
- **Why `fetchChannel` and not the guild's channel list.** The alternative is a membership test against the cached guild channel list that `fetchGuildChannels` builds. That list carries only *active* threads, so it would wrongly refuse a link into an archived thread. `GET /channels/<id>` returns `guild_id` for every channel kind, threads included, so `fetchChannel` is the right primitive for this check.

### AF-20 LOW — `fetchChannel` is typed as `Guild`. Fix the type in the rider, and test its refusal mapping on first use

`src/utils/redis/index.ts` `fetchChannel` is exported but has no caller at `6001f7f`. It calls `getApi().request<Guild>('GET', `/channels/${channelId}`)`. A channel object has `guild_id`, and the `Guild` type does not. So the rider must either cast or correct the type. The conforming form is to correct the generic to the channel type the module already uses (`Channel`, as in the guild-channel fetch beside it), not a cast at the call site.

Because the function has never run in production, its 401, 403 and 404 mappings and its 10 s cache are untested. The rider's third input class, "the channel's lookup is refused or fails", should have one cell per mapped status, so the refusal texts the plan relies on are exercised rather than assumed.

**Landed in `website.md` as A-5 (agent-designed):** bot-token reads of user-supplied Discord ids are bound to the authorised guild.

## Verdict (revs 14–16, `565e240`, one pass from rev 13 `9cbe755`): APPROVED

D23's assumption is not re-read. These limbs conform:

- M1-i, where "present" is what `cookies()` returns, with its two residue classes;
- M2-a's third member, sent to M6-f;
- M3 held for a real-Chrome read;
- M4-c restated;
- M6-f now covering colour 0;
- X-17.

**D26 conforms to the one-definition pattern** that `website.md` A-3 records. `git grep -n DISCORD_MESSAGE_LINK_REGEX` at `6001f7f` returns the definition (`src/constants/index.ts`) and two consumers: `NewMessageModal` and `message.ts` `getFromUrl`. These match the plan's enumeration, and no inline copy of the link pattern exists elsewhere in `src` or `bot`.

AF-19 is recommended and does not block.

### AF-19 LOW — M4-d should take the message id from the shared constant's capture group, not from `split('/').pop()`

F-27's site is `src/providers/WebhookProvider.tsx` `useValue`. At `6001f7f` it extracts the id with `messageIdOrUrl.split('/').pop()` once `isValidUrl` passes.

Once M4-d tests the input against `DISCORD_MESSAGE_LINK_REGEX`, the conforming extraction is that constant's third capture group. That is how `message.ts` `getFromUrl` already reads it: `url.match(DISCORD_MESSAGE_LINK_REGEX)`. With the anchored pattern, `split` happens to return the same value, but then two parsers define the same link. If the constant later changes, for example to admit a trailing slash, the split extraction drifts silently.

**Recommended to the implementer, through the planner:** M4-d reads the id from the constant's match groups. The widening in D26 keeps the host alternation non-capturing, so the id stays the third group, which the plan's "match groups still yield channel id and message id" limb already asserts.

## Verdict (rev 12 + rev 13, `9cbe755`, one pass from rev 11 `14fe94f`): APPROVED

D23's clock assumption is not re-read, as D23 directs. These limbs conform:

- M1-c's account decision taken from the row (CR-3) and its deletion-failure outcome (QAF-15);
- M1-h's row 6;
- QAF-16's stop line;
- M1-i restated over Next's `cookies()`;
- M2-a's colour class, whose `EmbedEditor` border mirrors `ContainerEditor`'s `accent_color != null`;
- the re-derivation after M2.

AF-18 is recommended and does not block. It shapes the M1-c rebuild.

### AF-18 LOW — CR-3's root is one cache key with two meanings. Read the row directly in sign-out, then retire the second meaning.

Read at website `6001f7f`.

- `src/utils/redis/index.ts` `fetchUserAccount(userId, skipUpdate = false)` caches under `user-access-token:<userId>` for 600 s in both modes:
  - with `skipUpdate = false` it stores a refreshed account, or `null` when there is no refresh token or the refresh is refused;
  - with `skipUpdate = true` it stores the raw row.
- Whichever caller misses first decides what every caller reads for the next 600 s. CR-3 is one instance: sign-out read the other mode's `null`.
- `git grep -n "fetchUserAccount("` over `src` and `bot` returns three callers. `removeUserSession` is the **only** `skipUpdate = true` caller; `authCallback` and `hydratedAuthCallback` use the default.

**Recommended form for the rebuild.**

- `removeUserSession` reads the `Accounts` row with a direct `getPostgres()` select. That follows the current pattern in the same function, whose `Accounts` update is already a direct `getPostgres()` call.
- `getAccount.ts` is not reusable here: it keys on `providerAccountId` and selects only `userId`.
- After that change `skipUpdate` has no caller. Remove it, so the key has one producer with one meaning.
- Adding a third mode, such as a cache-bypass flag, to `fetchUserAccount` is an avoidable deviation.

**Registered in `system-architecture.md` § Problem Areas:**

- (a) The overloaded `user-access-token` key. It closes if the recommended form is adopted.
- (b) The session cookie's name is decided in three places by two rules. `getServerSideSessionCookie.ts` picks one name by `NODE_ENV`. `getClientSessionCookie.ts` and `Redirects/Server.tsx` accept either. This is outside 015's scope.

## Verdict (rev 9 + rev 10, `bceb84a`, one pass from rev 8): APPROVED_WITH_CHANGES

This pass read only the delta from rev 8 to rev 10. These limbs conform and need no change:

- M1-c's "no account found" class (`NoResultError` or a falsy return);
- M1-f's corrected premise and RK-7;
- M1-h restated to D21's property over the three promises;
- the re-derivation after M1;
- M8-a's run-2 span, bounded only by ready lines and stop (2)'s `pm2.log` timestamp, with its reads listed;
- P3's instrument-liveness check;
- the sign-out note in Validation.

AF-17 carries one required change, on the residue M1-c now states.

### AF-17 MEDIUM — M1-c's lookup-error residue leaves a signed-out cookie able to pass the server-admin check for up to 600 s

Read at website `be881c9`.

- **What happens on a lookup error.** `removeUserSession` (`src/server/auth.ts`) first awaits `redis.fetchUserAccount(userDbId, true)`. It catches `NoResultError` only and rethrows anything else.
- **So on any other lookup error,** such as Postgres unreachable, M1-c's stated residue applies: no Redis key is cleared and no revoke is sent.
- **What the session key holds.** One of the keys left behind is `user-session-token:<sessionToken>`. It is `fetchAccountFromSession`'s 600 s cache entry (`src/utils/redis/index.ts`), which maps the session token to `{ userId, access_token, providerAccountId }`. Its one reader is `authorizeGuildAdmin` (`src/server/api/utils/authorizeGuildAdmin.ts`), which trusts the cached `access_token` and then the cached `user-guilds`.
- **The window.** next-auth has already deleted the `Sessions` row (AF-16), and the token was not revoked. So until the entry expires, the cookie of a signed-out session still passes the guild-admin authorisation.

The residue the plan states is narrower than the gap that is actually left. The plan calls it a cleanup that did not run. In effect, a signed-out session keeps its server-admin authorisation.

**The fix stays within M1-c.** The two keys that carry a session's authority, `user-access-token` (keyed on `userDbId`) and `user-session-token` (keyed on `sessionToken`), come from `removeUserSession`'s own arguments, and neither depends on the account lookup.

**Required of the planner.** M1-c's property clears those two keys for **every** member of the class, including a lookup error: before the lookup, or in a `finally` around it. The residue then shrinks to the account-keyed limbs: `user-guilds`, the `Accounts` update and the revoke. A test input for that cell is a lookup rejecting with a non-`NoResultError` error, expecting both deletions and then the rejection.

The fix reopens a delivered cell: one change, one code-review round and one QA re-run, all for M1-c. Whether that is a milestone-level scope delta needing the owner's word is steering's call. It has been sent to steering-hooks-015 as a possible owner-needing item.

**Registered in `system-architecture.md` § Problem Areas, beyond 015's scope.** `fetchAccountFromSession` caches a session-token-to-account mapping for 600 s, and nothing invalidates it except an explicit `clearUser`. Any end of a session that skips that call keeps the mapping alive until the TTL runs out, whether the session expired, was deleted by an adapter, or was removed by hand in the database. `authorizeGuildAdmin` does not re-check that the `Sessions` row still exists.

## Verdict (rev 7, `38b12e6`): APPROVED

This pass read only the delta from rev 6 (`5d516d9`). AF-13 to AF-15 are folded as asked:

- **AF-13.** E-1 brings `lo` up, runs a self-check whose remedy is never dropping `-n`, and installs inside the export before entering the namespace.
- **AF-14.** The non-creating pool read is a second export of `getPool.ts`.
- **AF-15.** The no-account cell names the two keys it clears and states the `user-guilds` residue. That checks out against `clearUser` at `7ce866b`: three `del`s, the third keyed on `discordId`.

M8-c's browser source, its compatibility check and its code-review fallback are all stated, with the unread points marked as unread. M8-c fits the architecture.

AF-16 is recommended and does not block.

### AF-16 LOW — In the no-account cell, "the session's DB rows are removed" is NextAuth's act, not `removeUserSession`'s

Read at `7ce866b`, with next-auth 4.24.5 as installed in `website/node_modules`:

- `removeUserSession` is called from `authOptions.events.signOut` (`src/server/auth.ts`).
- In `next-auth/core/routes/signout.js`, the database-session branch calls `adapter.deleteSession(sessionToken)` and **then** calls `events.signOut`.

So the session row is already gone when `removeUserSession` runs, and nothing inside that function removes it.

As the cell reads now, a unit test of `removeUserSession` would expect a session-row deletion the function never makes. The obvious way to make that test pass is to add a second deletion that duplicates the adapter's. That would be a design deviation: two owners of one row.

**Recommended to the planner:**

- At the `removeUserSession` surface, the no-account cell expects exactly the two Redis deletions, with no `Accounts` update and no revoke.
- The session-row removal is attributed to the adapter, which runs before the event, and the cell asserts nothing about it.

## Verdict (rev 6, `5d516d9`): APPROVED_WITH_CHANGES

This pass read only the delta from rev 5 (`1d0f890`): QAF-1 to QAF-5, D20 and X-16. AF-13 is a required change. AF-14 and AF-15 are recommended.

### AF-13 MEDIUM — E-1's `unshare -rn` leaves loopback down, so every local generator probe that uses HTTP fails before reaching the code

E-1 runs every local generator probe under `unshare -rn`, with `PREVIEW_ENDPOINT` set to a loopback URL. A new network namespace starts with `lo` **down**. I ran this on this box (util-linux 2.37.2, kernel 5.15.0-198, node v24.14.0), as two runs:

```
unshare -rn sh -c 'ip -brief link; node <listen 127.0.0.1:3999, then GET it>'
  → lo DOWN … ; connect err ENETUNREACH
unshare -rn sh -c 'ip link set lo up && node <same>; dns.lookup(nyc3.digitaloceanspaces.com)'
  → connect ok 200 ; dns EAI_AGAIN
```

As E-1 is written, every probe that sends a request to the locally started server fails with `ENETUNREACH`. That covers M8-b, M8-d's next-request limb and M8-c's page load of the loopback `PREVIEW_ENDPOINT`. The failure happens before the request reaches the code under test, and it looks like a failing criterion. This workspace has already paid for that confusion once (hazards: a broken rig read as a failing probe). P1's IPC-message limb and M8-e do not go through the network and are unaffected.

With `ip link set lo up` run inside the namespace (the `-r` mapping permits it), loopback works and the outside stays unreachable. That is the isolation E-1 is after.

**Required of the planner.** E-1 states `ip link set lo up` as the first step inside the namespace. It also requires a reachability self-check to pass before any criterion is read: a loopback GET answering, and an external DNS lookup failing.

### AF-14 LOW — P3's idle cell needs a read of the pool that does not create it; the pool module is where that read belongs

`src/getPool.ts` keeps the pool in the module-level singleton `globalForPool`. Its default export is the only accessor, and it **creates** the pool on first call. `shutdown()` calls that accessor, so today a stop of an idle process creates the pool, and generic-pool's `min = 2` launches two Chromiums (QAF-2).

The conforming form is a second export from `getPool.ts` that returns the pool if one exists and nothing otherwise. That keeps the singleton's state inside its module, and `shutdown()` drains only an existing pool. `server.ts` should not reach into `globalForPool`, and `shutdown()` should not keep a second "was the pool created?" flag of its own. Either would split one piece of state across two modules.

**Recommended to the planner:** name `getPool.ts` as the destination.

### AF-15 LOW — M1-c's "no account found" cell does not say what the DB clear-out acts on

At `7ce866b`, `src/server/auth.ts` `removeUserSession` works like this:

- Both halves of the clear-out are keyed on `account.providerAccountId`: `redis.clearUser(userDbId, sessionToken, account.providerAccountId)`, and the `Accounts` update `.where('providerAccountId', '=', …)`.
- With no account there is no `providerAccountId`, and no `Accounts` row to null.

So "the DB and Redis clear-out runs" has no defined object in that cell. **Recommended to the planner:** state what that cell clears. The likely reading is the session's Redis entries by `userDbId` and `sessionToken`, with the `Accounts` update skipped, because no row exists to update. The test's expected calls then follow from the plan, not from the implementation.

**Recorded, no change:** X-16, the concurrency limit, sits at the same `upsertMessage` site as AF-9a's count. It has been added to that Problem Area row so the two stay together.

## Verdict (rev 4, `f19e688`): APPROVED

This pass read only the delta from rev 3. The four rev-3 findings are folded as asked:

- AF-1 as M6-l (iv) and X-13;
- AF-2 as M1-a's four-site class;
- AF-3 as P1's log-line limb;
- AF-4 as the `limits.tsx` and `config.ts` destinations.

AF-11 is recommended and does not block. AF-12 is recorded.

### AF-11 LOW — The transition stop's stated limit gets the outage window wrong

M8-a (1) says *"the production generator is down for about 12 s at the push"*. The mechanism, read at `471578f` and in analysis V-1 and V-3, gives a different window:

- **For up to 12 s the old process keeps serving.** PM2 sends the `'shutdown'` IPC message. The old code has no `'message'` listener, so the message does nothing. `shutdown()` never runs, and the server stays listening on its port with the old code until the SIGKILL at the new `kill_timeout` of 12000 ms. Previews requested in that span are generated normally.
- **The broken-preview window is smaller.** It covers:
  - requests in flight at the SIGKILL, which are killed with Chromium;
  - the gap from the kill to the new process's `listen`. Fork-mode reload is stop-then-start (V-1), so the new process cannot bind the port earlier.
  That window is X-11's window. The cost the deploy actually adds is the 12 s **delay** before the cut-over, not 12 s of downtime.

**Recommended to the planner:** restate the limit as above. M8-a's criterion reads stop (2) only, so it does not change.

**AF-9d's bearing on stop (1), which the planner asked about: low.** During those 12 s the old process runs out of a working directory that `deploy.sh` has already deleted and re-copied. Its working directory is the deleted inode, while its `require` paths are absolute and resolve into the new copy. Three facts make that harmless at this deploy:

1. **No relative paths.** `grep` at `471578f` finds no relative-path filesystem use in `generateImage.ts` or `getPool.ts`.
2. **Same dependencies.** The plan's lockfile rule means the new copy holds byte-identical dependencies, so a lazy `require` loads the same code.
3. **Browser outside the tree.** No `.puppeteerrc` is tracked, so the browser resolves to puppeteer's default cache outside `deployed/` (**unread on the host**).

The one sharp edge is the seconds between `rm -rf` and the end of `cp`. A lazy load in that span would throw, but only inside a request the old process was serving, before the stop. That leaves AF-9d as a registered Problem Area (Low), not a limit this chain must state.

### AF-12 INFO — M1-a's route premise for the latent sites is wrong; its conclusion holds

M1-a says the latent sites' *"only route is `message.ts` `authorizeAction`"*. That is not so: `message.ts` also calls `authorizeUser` and `authorizeGuildUser` directly, with `message.id` (a scalar) or with nothing. No caller passes an array, so no empty list reaches either site at `7ce866b`, and the latency claim stands. Recorded here, not put for a revision: the class covers all four sites, so the criterion is unaffected.

## Verdict (rev 3): APPROVED_WITH_CHANGES

The plan fits the current architecture. Every fix lands at the site of its finding, and none of them adds a component, a dependency or a boundary.

- **AF-1 (required).** M6-l moves the validity predicate. The stored `valid` value, which the public v1 API serves, then holds two predicates side by side.
- **AF-2 (required).** M1-a's class leaves out two of the four `in`-over-a-list sites.
- **AF-3 (recommended).** M8-a's only criterion is a log-line count. The plan does not fix that line's text or say how many times it is emitted.
- **AF-4 (recommended).** Two forms the plan writes have no named destination.

No deviation is rated *necessary*, so none goes to the owner.

Every mechanism claim below was read at the base SHA. A claim that was not read is marked **unread**, and QA Phase 1 checks it.

---

## Required changes

### AF-1 MEDIUM — M6-l(ii) changes `validateMessage`, and stored `valid` keeps the old predicate for every row saved before the release

Read at `7ce866b`:

- `validateMessage` (`src/utils/limits.tsx`) is the one predicate behind three things:
  - the send gate;
  - the stored `valid` column, through `isMessageValid` (`src/server/api/utils/messageValidity.ts`), which `upsertMessage` writes on each save;
  - `src/scripts/backfillValid.ts`.
- `valid` is served externally. `src/pages/api/v1/guilds/[guildId]/messages.ts` and `…/messages/[id].ts` select `Messages.valid` and emit it whenever it is non-null.
- The backfill re-derives only rows where `valid` is null. Its `.where('valid', 'is', null)` appears in both the selection and the update guard.

M6-l(ii) adds a refusal: more than 40 components in total. After the release, a row stored before it with more than 40 components keeps `valid: true` until it is next saved, and the v1 API keeps serving that `true`. No instrument in the tree re-derives it.

The plan's RK-2 names the consumer side only for M2, which widens what saves. M6-l narrows what is valid, and the plan names no residue for it.

The population is unknown here, because no database is reachable from this box. It is also non-empty in principle. F-44 is itself the route by which more than 40 components entered a draft, through nested adds and container duplicates, and a JSON load is another route (**unread**: whether the load paths cap the total).

**Required of the planner.** M6-l states this residue, with one of these as its disposition:

- **(a) Stated limit.** Rows saved before the release keep their old `valid` value until they are re-saved. The carrier is the open handoff `handoff/backfill-valid-guard-has-no-db-backed-instrument-2026-08-26.md`, whose trigger reads "if a second backfill-style mass-mutation script is written". This option writes no script, so that trigger does not fire; the residue is recorded beside the handoff, not inside it.
- **(b) A re-derivation in the chain.** This would mean a new backfill mode over non-null rows, which modifies `backfillValid.ts` and does fire that handoff's trigger. It is a scope change and would go to the owner.

I recommend (a). It follows the current pattern: `valid` is a value recorded at save time, and D-005 / `website.md` W-2 say validity is recorded, never enforced. The residue only has to be visible.

### AF-2 MEDIUM — The F-2 class has four sites at `7ce866b`; M1-a names two

The plan's Testing Strategy states the class as "Kysely predicates over … a possibly-empty list". `grep -rn "'in'," src/server` at `7ce866b` returns four sites:

| Site | Guard today |
|---|---|
| `shared.ts` `getUserRecentMessages` | none (M1-a) |
| `shared.ts` `getPartialMessages` | none (M1-a) |
| `user.ts` `authorizeUser` | `if (messageIds)`. This admits `[]`, which is truthy. |
| `authorizeGuildUser.ts` `getOldMessages` | none |

The last two receive `messageIds` from `message.ts` `authorizeAction`, out of router input. **Unread:** whether any router's input schema admits an empty array. That decides whether these two sites are reachable or only latent.

**Required of the planner.** Do one of the following:

- widen M1-a's property to all four sites; or
- name the two excluded sites, giving each one's reachability as read from the router input schemas.

**Pattern.** No empty-list guard exists under `src/server`. The two `length === 0` returns in `shapes.ts` are tree pruning, not query guards. So the guard is a new form whichever way the planner goes. I recommend one form at every site: return before the query is built. `getPartialMessages` is the exception, because its list sits inside an `or`, so there the `exists` limb is dropped when `guilds` is empty, as M1-a's property already requires.

---

## Recommended changes (preferable, not blocking)

### AF-3 LOW — M8-a's criterion counts a log line whose text and multiplicity the plan does not fix

M8-a's criterion reads "the out log shows one shutdown line". The instrument that reads it is `verification/015/pig-host-read.sh` [5a] (`9b99acd`). That step counts lines matching `Server received` over the whole out log. Today the line is `shutdown()`'s first statement, `'Server received SIGINT. Closing server.'` (`src/server.ts`).

P1 sends two triggers into `shutdown()`, and PM2 can deliver both. Two consequences follow:

1. **Multiplicity.** If the idempotency guard sits after the log line, a single stop logs twice. The criterion then fails although the behaviour is correct. The line must be emitted once per drain, inside the guard.
2. **Text.** The line has to keep the `Server received` prefix the instrument anchors on. It should also say which trigger arrived, the message or SIGINT, because that is exactly what M8-0 is trying to observe.

**Observability (normal telemetry).** P3's drain time is currently inferred from timestamps in `pm2.log`. `Server closed.` covers only `server.close`, not `getPool().drain()`. I recommend one more line, logged when the drain completes, that states the elapsed milliseconds. The measurement is then read directly. That line carries no secret and no PII.

**Recommended to the planner:** add both limbs, (1) and (2), to M8-a's criterion, plus the drain-complete line.

### AF-4 LOW — Two lifted or new forms have no named destination

- **M6-l(iii), `countTotalComponents`.** The current pattern for a counter that a validator uses is `src/utils/limits.tsx`. `sumDisplayableText`, a module-private recursive counter with a structural parameter type, feeds `validateDisplayableTextCount` there. The bound `MAX_TOTAL_COMPONENTS` lives in `~/constants`. The lift therefore goes into `limits.tsx`, exported, with the editor importing it, and with a structural parameter type in place of `EditableTopLevelComponent`, because `validateMessage` receives `MessageData` components, which carry no `_key`. `website.md` A-3 is the precedent for having one definition. Its location, `shapes.ts`, is not a precedent, because A-3 is a shared notice string, not a validator.
- **M8-e, the `API_KEY` refusal.** `src/config.ts` is the generator's only reader of the environment. Today it casts `process.env` without validation and composes `API_KEY` as `` `Bearer ${process.env.API_KEY ?? ''}` ``, so an unset key makes `"Bearer "` the accepted header. The refusal belongs in `config.ts`, where every consumer reads the value, not in `server.ts`. The other values `config.ts` casts (`CDN_*`, `PREVIEW_ENDPOINT`) are in the same class and fall outside F-35. They are registered in AF-9 and not added to the plan.

---

## Conforming forms (recorded; no change)

- **AF-5 INFO — M3 per dialog.** The defect is three identical one-line guards: `document.activeElement?.tagName !== '~/components/Button'` in `ConfirmationDialog.tsx`, `WarningDialog.tsx` and `ImageUploader.tsx`. That is the signature of one replace-all edit. A shared hook would not have prevented it, so lifting one now is an avoidable deviation. Follow the current pattern, as the plan does.
- **AF-6 INFO — M5-e, two `getDateString` copies.** `Header.tsx` and `f/[id]/page.tsx` differ in output: one prefixes `Today at`, the other returns the time alone. So a lift needs a parameter, and it is a preferable deviation, not a necessary one. Follow the current pattern and fix both copies, as the plan does. This is registered in AF-9.
- **AF-7 INFO — M2-b / M2-d constants.** Both bounds come from `~/constants`, which re-exports `./messageLimits` and holds `MAX_EMBED_AUTHOR_NAME_LENGTH` and `MAX_EMBED_FOOTER_TEXT_LENGTH`. `shapes.ts` and `EmbedFooter.tsx` already read them from there. M2-b's change makes the editor read the same constant the save schema reads, in place of today's `MAX_NAME_LENGTH` (80, the username bound). That is the M2-d pattern, so it conforms.
- **AF-8 INFO — M1-j altitude.** `src/utils/redis/index.ts` `getItem` returns `null` both for a miss and for a stored `null`. That one helper serves every cached function (three `expireSeconds: 600` callers). The fix conforms when it lands in that helper, and M1-j's property is then true of every cached caller, not only the two it names. The implementer places the fix there. This is not a plan change.

---

## Cost at the record's extreme

**AF-9a INFO — `upsertMessage`'s count runs on every save.** M1-d changes only the comparator. The cost it sits beside is unchanged by the plan, and it grows with the record:

- `upsertMessage` (`shared.ts`) runs `countAll()` over `Messages` filtered on `fk_users_id` or `fk_guilds_id`.
- It runs on **every** save, including updates, whose result is then unused (`!message.id &&`).
- `project-utils/prisma/schema.prisma` declares no index on either column, and Prisma creates none for foreign keys on Postgres. So the count may be a scan of the whole table on every save.

**Unread:** the live database's actual indexes (`\d "Messages"`). No database instrument exists on this box, and `.env.local` is off limits under the workspace hazards. Not measured. Registered as a Problem Area; it does not block.

## Problem Areas registered (AF-9)

Each is recorded in `system-architecture.md` § Problem Areas:

- (a) The `Messages` count on every save, with no declared index (above).
- (b) The generator's `config.ts` casts every environment value without validation (AF-4).
- (c) The two copies of `getDateString` (AF-6).
- (d) `deploy.sh` runs `rm -rf deployed/$ENV` and copies the new tree **before** `pm2 startOrReload`. So the running process drains, once AF-3/P1 make it drain, out of a directory that has already been replaced. **Unread:** whether anything is loaded lazily from disk during `drain()`.

## AF-10 — Record lines this chain touches

- **`system-architecture.md` § preview-image-generator.** Corrected in this pass to the mechanism read from code. The SIGINT handler exists. PM2's configured stop (`shutdown_with_message: true`) sends an IPC message instead; that is read from PM2 source in the analysis and is pending the host confirmation of M8-0. Deployment is `prod.yml` on a self-hosted runner: `npm ci` (skipped when the lockfile cache hits), `npm run build`, a copy to `deployed/prod`, then `pm2 startOrReload`. After M8 lands, the line is reconciled to the implemented stop path.
- **`preview-image-generator.md` P-3 (confirmed inference).** What he ratified was *"a git checkout on the `prod` branch under PM2, with no build step — the checkout is production"*. `prod.yml` contradicts that in two parts: there is a build step, and the deployed tree is a copy of the build, not the checkout. Under that grade his "Intended." does not cover the mechanism that actually runs. **Resolved 2026-11-08T05:18Z, on the owner's selection "Agent: record intended".** P-3 was rewritten in place to the build-and-copy route. The prompt is quoted verbatim in the entry.

---

## Resumption State (checkpoint, architect-hooks-015, 2026-11-08T07:27)

- **Done.**
  - Conformance pass on plan rev 3, then a delta pass on every revision through rev 20 (`e118cc3`). The last verdict is APPROVED (commit `8affd6a`).
  - Findings AF-1 to AF-21. Folded or discharged: AF-1 to AF-4, AF-11 to AF-17 (AF-17 by D22), AF-19 and AF-20 (AF-20's type limb is with the implementer as code review CR-13).
  - **Still open as a recommendation: AF-18.** In the M1-c rebuild, read the `Accounts` row directly in `removeUserSession` and retire `fetchUserAccount`'s `skipUpdate`. Check whether it landed when M1-c's rebuild is reviewed.
  - Records written this chain:
    - `system-architecture.md`: the generator component line corrected, Problem Areas registered (AF-9a/b/c/d, X-16, the session cache, the `user-access-token` key, the session-cookie name, error-copy drift), and changelog rows.
    - `website.md`: A-4 and A-5 (agent-designed).
    - `preview-image-generator.md`: P-3 rewritten on the owner's selection "Agent: record intended" (05:18Z), and A-1 (the log-line interface).
- **Next.**
  - Rev 21 (`3d193f9`): APPROVED, AF-22 INFO registered. Rev 22 (`5201612`): APPROVED, with AF-23 to AF-25 recommended. A later revision is read on its delta from `5201612`. When it lands, check whether AF-23 to AF-25 were folded.
  - **Method, per pass:**
    1. Write `git diff <from> <to> -- planning/015-bug-evaluation-fixes.md` to the scratchpad and Read it; the rtk filter mangles piped diffs.
    2. Read the code each changed limb names, at the SHA it names.
    3. Append a changelog row with `record-edit.js`, anchored after the last row (check the row's stamp first).
    4. Add a "Verdict (rev N)" section above the previous one, and update Status-Detail.
    5. Commit by pathspec, then SendMessage the verdict to planner-hooks-015. Owner-needing items go to steering-hooks-015.
  - D23: never re-read the run-2 UTC assumption.
- **Owed at chain close** (findings-document closure, by devops Stage 1):
  - Reconcile `system-architecture.md` to the implemented state of chain 015. The generator's stop path after M8, and `getFromUrl`'s guild binding after M4, both change.
  - Collapse the resolved AF entries to one line each, then close this document as `Resolved`.
  - The reconciliation of chains 012–014 into the master document is also owed. It was outside this brief.
- **Process disclosures:** two `sed -i` writes to record files, both recorded in the changelog (rows 05:15 and 05:44).
- **Uncommitted / mutated:** none. Website tree at `chain/015-bug-evaluation-fixes` `579e8b2`; this session touched no source.
- **Questions out:** none.
