# Scope sweep — signed-out users and unsaved edits (item 4)

Written by `steering-roadmap` before 2026-11-18T21:59Z from a `general-purpose` helper's reply, which
declined to write this file itself. The content below is the helper's report, condensed only in
layout; it read code and ran nothing. **Not this thread's reads.** A stage re-derives anything here
before relying on it.

Property briefed: a user who is not signed in can lose edits they have not saved without being
warned.

## Refs read

After `git -C <repo> fetch origin`: website `origin/master` `395510e97f82a5177d5edbb38b5d44858f745f3d`;
project-utils `origin/master` `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f`; preview-image-generator
`origin/prod` `8de2b5337179623f7fbd82904221078c2930214a` (not swept, below).

## Gate refusals (helper's disclosure)

The secret-file gate refused, and the helper did not retry: `git -C preview-image-generator grep` at
`origin/prod`; `grep -rl` over `website/node_modules/next/dist`; a `grep` over the agent-output
record. So step 3 (record hits) was not done, and preview-image-generator was not swept.

## Counts (helper's commands)

website 511 tracked files (`ls-tree -r --name-only | wc -l` — a piped count, unsound under rtk;
not relied on); guard-pattern grep matched 9 files; `hasChanged` in 6 files, 19 lines (`grep -c -F`).
project-utils: 27 files, a library, no UI guard hits.

## Guard table (website `origin/master`)

| Site | Trigger | Enabling condition | Depends on sign-in? | Can it work? |
|---|---|---|---|---|
| `src/utils/hooks/useUnloadAlert.ts:8` | tab close / reload | `block` = `hasChanged` (`edit/page.tsx:100`) = `status === 'authenticated' && !typedDeepEqual(...)` (`MessageProvider/index.tsx:112-115`) | Yes | Signed-in only |
| `useUnloadAlert.ts:10-16` | in-app route change | same `block`; `Router.events.on('beforeHistoryChange')` + `window.confirm` | Yes | Unverified whether the App Router emits this event on `next/router` |
| `Navigation.tsx:161-168` Reload | menu | `enabled: hasChanged`; also `isDisabled` for a non-API message | Yes | Unreachable signed-out |
| `Navigation.tsx:130-139` Clear | menu | `enabled: true` | No | Yes |
| `JsonModalBody.tsx:51-61` Load | button | `enabled: true` | No | Yes |
| `DiscordMessageEditor/index.tsx:212-221` mode switch | toggle | `enabled: hasDepartingData` | No | Yes |
| `ComponentEditor.tsx:214`, `EmbedField.tsx:150`, `EmbedEditor/index.tsx:146` | delete | dialog `open` state | No | Yes |
| `usePusher.ts:45-51` update prompt | remote update | `enabled: true`; "changes … will be lost" text only if `hasChangedRef.current` (`:50`) | Text: yes | Signed-out never subscribes (`usePusher.ts:32-34`) |
| `NavMenu.tsx:37-41` Log out | menu | `signOut()`, no check | No | No prompt |
| `Redirects/Client.tsx:11-13` | route | `status === 'unauthenticated'` → `redirect('/message/m/0/edit', replace)`; no `hasChanged` check | Yes | Navigates away with no prompt |
| `SessionProvider.tsx:14` | cookie without session | `signOut()` | Yes | No prompt |
| `JsonMenu.tsx:28-33` | close | `disableExternalClose` only during load | No | No unsaved check |

The helper also listed `ConfirmationDialog.tsx:14-16` / `WarningDialog.tsx:19-21` (the Enter-key
`tagName` compare) as "never false, so Enter confirms from any focus, including Cancel". **Steering's
note:** that is a code read the record contradicts by measurement — `architecture/system-architecture.md`
Problem Areas, "Enter-to-confirm in dialogs rests on an unidentified mechanism" (a real-Chrome read
at website `6001f7f` shows Enter on a focused Cancel does not confirm). It is plan 015's D30 / X-18
class and is not this item's property.

Non-guard loss path (helper): `MessageProvider/index.tsx:151-159` sets
`const tmp = local.id ? copyIntroMessage() : local;` and `:165-169` writes it back to the store;
session-independent; reached by the redirect after sign-out when the local store holds an id.

## Signed-out reachable surfaces (helper)

- `/message/m/0/edit`: the Redirects target. Editable, with no save (`Navigation.tsx:144`, `:168`,
  `:150`). Edits go to localStorage key `message` (`index.tsx:165-169`, `useLocalStorage.ts:42`,
  `withLocalStorage.ts:14`). No name field (`Navigation.tsx:271`).
- `/message/m/0/send`: allowed by Redirects; shows a log-in InfoPanel (`send/page.tsx:124-139`). Not
  traced in full.
- `/preview?data=`: public; `setMessage={() => {}}`; not persisted.
- Server `getOne`, `upsert`, `getFromCode` are `protectedProcedure` (`routers/message.ts:51,125,186`):
  no server load or save signed out.
- Sign-in (`edit/page.tsx:154`) leaves the page with no guard.

## Not covered (helper)

preview-image-generator (nothing read); the record (gate refusal); Next router-event semantics;
react-use and next-auth internals; the working tree (remote refs only); `m/[id]` layout remount on
param change; `SaveChoiceModal`; send-page editing; the browser's native beforeunload during
sign-out; test contents beyond their names.
