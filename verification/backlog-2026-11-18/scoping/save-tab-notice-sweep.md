# Save-tab "Message Update Detected" sweep (read-only)

Property under test: the browser tab that saved a message is told that the message was updated elsewhere.

Status: code sweep (items 1, 2) done. Record sweep (item 3) NOT completed; blocked by a secret-file gate, see section 5.

## 0. Method and SHAs

- `git -C <repo> fetch origin` run for website, project-utils, preview-image-generator. All returned `ok fetched`.
- Remote-ref SHAs read with `git -C <repo> rev-parse <ref>`:
  - website `origin/master` = `395510e97f82a5177d5edbb38b5d44858f745f3d`
  - project-utils `origin/master` = `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f`
  - preview-image-generator `origin/prod` = `8de2b5337179623f7fbd82904221078c2930214a`
- Reads at remote ref: `git -C <repo> show <ref>:<path>` and `git -C <repo> grep -n <pattern> <ref> -- ':!.github' ':!*.env*'`. No `.github/` or `.env*` file was printed.
- agent-output HEAD (for reference) `0c9ca430a478a903edb5f80ec0f724f9bcc34f0e`, branch `master`.

## 1. Trigger sites (save -> notify other clients)

Narrow predicate, website origin/master:
`git -C website grep -n -E '\.trigger\(|\.subscribe\(|\.bind\(|\.unbind\(|genMessageChannelKey|message-update|showConfirmation\(' origin/master -- ':!.github' ':!*.env*'`

- Only Pusher trigger: `origin/master:src/server/api/utils/shared.ts:290`
  `await pusher.trigger(genMessageChannelKey(message.id), 'message-update', hashMessage(message));`
  - Guarded by `shared.ts:281` `if (message.id) {` (update path only).
  - Server constructs the client at `shared.ts:282-288` (`appId`, `key`, `secret`, `cluster`, `useTLS: true`). No `socket_id` argument; no sender exclusion anywhere in the call.
- Other Pusher constructor: `origin/master:src/providers/MessageProvider/usePusher.ts:37` (`new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, { cluster: ... })`).
- Channel key: `origin/master:src/utils/index.ts:493-494` `export function genMessageChannelKey(id: string) { return \`message-update-${id}\`; }`
- Payload is a hash only: `hashMessage(message)` (`src/utils/index.ts:512-522`), computed on the parsed input of `upsertMessage` (`shared.ts:239-294`).
- Caller chain into `upsertMessage` (`git -C website grep -n -E 'upsertMessage' origin/master`): `src/server/api/routers/message.ts:186-197` (`upsert` procedure, sole route), which is the only caller of `upsertMessage` outside tests.
- Save entry points and whether they reach the `message.id` branch:
  - Id-carrying (reach trigger): `useApiMethods.ts:64-71` `persist` -> `upsertMessage({ message: stripKeys({ ...draft, data }) })`; `saveMessage` (`useApiMethods.ts:73-87`) -> `persist`; `commitSaveChoice` (`:89-97`) -> `persist`. Callers of `saveMessage()`: `src/app/message/m/[id]/_layout/Navigation.tsx:143,293`, `src/app/message/m/[id]/edit/page.tsx:62,217`.
  - No id (do NOT reach trigger): `src/app/message/m/[id]/_components/SaveAsMenu.tsx:54-60` (`message: { data, name, guildId }`); `src/app/message/_components/NewMessageModal.tsx:155-159` (same shape); `src/app/message/f/[id]/page.tsx:342-347` (`...copyIntroMessage()` + `guildId`); `src/app/message/m/new/page.tsx:58,68`.
  - `updateMessage` (`useApiMethods.ts:47-57`) updates local state only (`setMessage` + `updatedAt`); it does not call `upsertMessage`.
- Other `Messages` writers (`git -C website grep -n -E "(insertInto|updateTable|deleteFrom)\('Messages'" origin/master ...`):
  - `shared.ts:225` insert (inside upsert), `shared.ts:298` `updateTable('Messages')` in `updateRecentMessageData` (recent webhook ids; no notify), `routers/message.ts:231` `deleteFrom` (delete; no notify), `src/scripts/backfillValid.ts:210` (script; no notify).
  - Raw SQL writes: none outside tests (`git -C website grep -n -i -E 'UPDATE "?Messages|INSERT INTO "?Messages' origin/master` returns only test strings).
  - v1 REST routes `src/pages/api/v1/guilds/[guildId]/messages*.ts` return 405 on non-GET (`req.method !== 'GET'`); read-only.
- Redis `local_updates` (`src/utils/redis/index.ts:23,45,46,132`): `getClient().publish(UPDATE_CHANNEL, ...)` inside `getFromCache`, a server-side cache fill. It carries no client notice and is not on the save path. This is the only other `.publish(` in website origin/master (`git -C website grep -n -E '\.publish\(' origin/master`).
- project-utils origin/master and preview-image-generator origin/prod: no `pusher`, `trigger`, `subscribe`, `socket` or channel code. Their only hits for the broad word set are lockfile lines (`side-channel`, `eventstream`), e.g. `origin/prod:package-lock.json:193`.

## 2. Subscriber sites (client -> notice)

- Only subscriber: `origin/master:src/providers/MessageProvider/usePusher.ts`
  - `:37-39` `new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, { cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER })`
  - `:41` `const channel = pusher.subscribe(genMessageChannelKey(messageRef.current.id));`
  - `:42` `channel.bind('message-update', (hash: string) => {`
  - `:44` `if (hash !== hashMessage(normalizeForHash(messageRef.current))) {`
  - `:47` `title: 'Message Update Detected',`
  - `:50` `message: \`The message you are viewing has been updated. Would you like to reload it?${hasChangedRef.current ? ' Any changes you have made will be lost.' : ''}\`,`
  - `:56-57` `channel.unbind(); pusher.unsubscribe(genMessageChannelKey(id));`
- Mounted once: `origin/master:src/providers/MessageProvider/index.tsx:281` `usePusher(messageRef, reloadMessage, hasChanged);` with `:171` `const messageRef = useLatest<null | ActiveMessage>(message);`. Grep `usePusher` in origin/master shows no other mount.
- Test pinning subscriber behaviour: `origin/master:src/providers/MessageProvider/__tests__/usePusher.update-prompt.test.tsx:56-57` fires `'message-update'` with `"a hash that is not the draft's"`; the notice is asserted only for the presence/absence of the loss sentence (`:75-99`). No test fires the event with the hash of the tab's own draft.
- Parity test: `origin/master:src/utils/__tests__/usePusher.hash-parity.test.ts` (titles at lines 12, 19, 36, 57) pins that whitespace-only normalization differences do not mismatch.

Self-recognition predicates:
- Socket id: `git -C website grep -n -E 'socket_?id|socketId' origin/master -- ':!.github' ':!*.env*'` -> no hits in website origin/master (the pattern does not appear anywhere).
- Broad self-id predicate: `git -C website grep -n -i -E 'socket|clientid|client_id|revision|\bversion\b|sourceId|originId|senderId|X-Socket' origin/master -- 'src' ':!*.env*' ':!*__tests__*'`. Hits are only Discord OAuth `client_id` (`src/server/auth.ts:65`, `src/utils/redis/index.ts:149`, `src/constants/index.ts:35`, `src/server/auth.ts:203`, `src/env.mjs:50,86`), a schema `version: 1` (`src/@types/global.d.ts:427`), and legal-page copy (`src/app/legal/terms/page.tsx:264-265`, `src/app/legal/privacy/page.tsx:176`). No per-tab or per-socket identifier exists.
- Consequence (predicate-level, not run): the trigger sends no exclusion, the event payload is a bare hash, and the subscriber's only self-test is `hash !== hashMessage(normalizeForHash(messageRef.current))` (`usePusher.ts:44`). The saving tab subscribes to the same channel (`index.tsx:281`), so it receives its own event; it raises the notice exactly when its current state, at delivery time, hashes differently from the server's hash of the saved input. The server hash is `shared.ts:290` `hashMessage(message)` over the parsed input; the client hash is over `normalizeForHash` (`usePusher.ts:15-21`, `stripKeys` plus `discordMessageShape.safeParse`). Those two inputs are the same only when the save and the local state agree.

## 3. Identifier occurrences (item 2)

Grep: `git -C website grep -n -E 'Message Update Detected|has been updated|Would you like to reload|message-update' origin/master -- ':!.github' ':!*.env*'`
- `src/providers/MessageProvider/__tests__/usePusher.update-prompt.test.tsx:56` `'message-update'`
- `src/providers/MessageProvider/usePusher.ts:42` `'message-update'`
- `src/providers/MessageProvider/usePusher.ts:47` `'Message Update Detected'`
- `src/providers/MessageProvider/usePusher.ts:50` `The message you are viewing has been updated. Would you like to reload it?`
- `src/server/api/utils/shared.ts:290` `'message-update'`
- `src/utils/index.ts:494` `message-update-${id}`

## 4. Not sought in code

- No SSE, polling or refetch-interval notice path was searched (`refetchInterval`, `refetchOnWindowFocus`, `EventSource`); `EventSource` returned no hit in the narrowed pass.

## 5. Record sweep (item 3): NOT COMPLETED

- Command attempted (run from `/usr/local/bin/hooks/agent-output`): `grep -rnI -E 'message-update|Message Update Detected|usePusher|genMessageChannelKey|pusher|Pusher|has been updated|updated elsewhere|Would you like to reload|BC-14|socket' architecture research analysis planning/closed handoff uat/closed deployment/closed`
- Result: refused by the PreToolUse hook `secret-file-gate-hook`. Its message: the record flags `/usr/local/bin/hooks/preview-image-generator/.github/workflows/prod.yml` as holding a plaintext secret, and the grep "can print its lines".
- Disposition: not retried in any other form (no `grep -l/-c`, no Read/other tool over the record). I do not know which record file or link led the grep toward that workflow path, and I did not investigate it with a further command. Whether this block is a false positive is the owner's call.
- Consequence: no file:line hits in architecture, research (incl. closed), analysis (incl. closed), planning/closed, handoff (incl. closed), uat/closed, deployment/closed were recorded. No owner words were quoted. The "BC-14" lookup is also outstanding.
- Directory counts (`find <dir> -type f | wc -l`, run before the block): architecture 9, research 8, research/closed 6, analysis 13, analysis/closed 12, planning/closed 14, handoff 35, handoff/closed 13, uat/closed 14, deployment/closed 19.

## 6. Not covered

- Item 3 (record) in full; see section 5.
- Branches other than website origin/master, project-utils origin/master, preview-image-generator origin/prod.
- `.github/` workflow files and `.env*` (excluded by rule), so the Pusher app identity per environment was not checked.
- Body of `postMessagePreviewImage` (`shared.ts:269,277`) and the preview-image-generator source beyond the keyword grep.
- `gateBeforePersist` / `applyDisposition` (used in `useApiMethods.ts:80-96`) and `hasChanged` memo (`MessageProvider/index.tsx:112`), which decide the data the tab holds at delivery time.
- `refetch`/`setSavedMessage` paths in `index.tsx:142-208`.
- Pusher SDK behaviour on sender delivery (`pusher` 5.1.3, `pusher-js` 8.3.0 per `package.json:69-70`); not read from `node_modules`.
- No test was run, no event was fired, no reproduction attempted.
