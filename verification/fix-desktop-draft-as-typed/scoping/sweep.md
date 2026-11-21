# Scope sweep: desktop draft as typed

Read-only sweep. Website read at `origin/master`; `git -C /usr/local/bin/hooks/website rev-parse --short origin/master` returned `76da25c`. Commands were `git show origin/master:<path> | cat -n`, `git grep -n <pat> origin/master -- src`, and `grep -rIn` over agent-output. No call was refused. No .env file was read. Nothing was run, so every verdict below is from code and is not observed behaviour.

All paths below are under website `src/` at 76da25c unless stated.

## 1. Content editor

Desktop, `components/DiscordContentEditor/Desktop.tsx`:
- L32 `const [_value, setLocalValue] = usePassedProp(value ?? '');` holds the typed text locally.
- L95 `onChange={setLocalValue}` on `SlateEditor`. A keystroke writes local state only.
- L45-48 `_onClose = () => { onClose?.(); onChange(_value); }`, wired at L49-52 as `useFocusWithin({ onBlurWithin: _onClose })`. The prop `onChange` (the message setter) is called only here, on blur-within.
- The `SlateEditor` is mounted only when `_focused` (L89).

Mobile, `Mobile.tsx`:
- L98-99 `initialValue={value ?? ''}` and `onChange={onChange}`, passing the prop straight through. It has no local copy, so the message changes on each Slate change.
- `onClose` (L45-51) is only the drawer-close hook and carries no commit.

`components/SlateEditor/index.tsx`: L53 `descendants` state, L58-59 `const string = flattenNodeText(descendants); useEffect(() => { onChange(string); }, [string]);`. `onChange` fires on every change of the flattened string and once on mount. `SlateEditor/utils/onChange.ts` L8 and L34 call `setDescendants` for every non-selection operation. Nothing is debounced.

Consumers of `DiscordContentEditor` (each inherits the property on desktop):
- message content: `DiscordMessageEditor/components/ContentBody.tsx` L21
- embed title: `EmbedEditor/EmbedTitle.tsx` L93
- embed description: `EmbedEditor/Embed.tsx` L82
- embed field name: `EmbedEditor/EmbedField.tsx` L75
- embed field value: `EmbedEditor/EmbedField.tsx` L92
- Text Display component: `ComponentEditors/TextDisplayEditor.tsx` L26. `SectionEditor` L101 and `ContainerEditor` L137 reach it through this component.

## 2. Draft write mechanism

`providers/MessageProvider/index.tsx` L182-192:
```
useEffect(() => {
  if (!message?.name || message === loadedRef.current) return;
  ...
  if (!message.id) writeRouteZeroDraft({ ...message, name });
  else if (typedDeepEqual(savedMessage?.data, message.data)) removeDraft(message.id);
  else writeDraft(message.id, { data: message.data, name, editedAt: Date.now() });
}, [message]);
```
The effect runs on every change of `message`. There is no debounce or throttle. It is the same on mobile and desktop; the only difference is when `message` changes.

`utils/messageDrafts.ts`:
- `writeDraft` L42-54 reads the whole map via `readDrafts()` (L27, `JSON.parse` through `withLocalStorage.get`), merges, and bounds it (`MAX_DRAFTS` 20, `MAX_DRAFT_CHARS` 1 MiB; `JSON.stringify(drafts)` for the size test at L45), then calls `store().set`.
- `writeRouteZeroDraft` L75-80 also does `legacyStore().set(message)`, a second `setItem` of the `message` key.
- `utils/withLocalStorage.ts` L12-21: `set` is `setItem` of `JSON.stringify` plus `window.dispatchEvent(new Event('storage'))`. The dispatch reaches every `useLocalStorage` reader in the tab (not read in detail).

## 3. Surfaces: has the property?

| Surface | Verdict | Deciding line |
|---|---|---|
| Message content (desktop) | YES | `Desktop.tsx` L95 `onChange={setLocalValue}`; commit L45-48 on blur-within |
| Embed title (desktop) | YES | `EmbedTitle.tsx` L94 `onChange={setTitle}` passed to `DiscordContentEditor`, so `Desktop.tsx` L95 and L48 apply |
| Embed description (desktop) | YES | `Embed.tsx` L83 `onChange={setDescription}`, same path |
| Embed field name and value (desktop) | YES | `EmbedField.tsx` L77 and L94, same path |
| Text Display component, including inside Section and Container (desktop) | YES | `TextDisplayEditor.tsx` L30 `onChange={setContent}`, same path |
| Embed author name | YES | `EmbedAuthor.tsx` L44 `usePassedProp`; L136 `onChange={setLocalUsername}`; L58-62 `onBlurWithin` calls `setName(newName)` (trimmed) only on blur-within |
| Embed footer text | YES | `EmbedFooter.tsx` L44 `usePassedProp`; L118 `onChange={setLocalText}`; L123 `onBlur={() => setText(localText?.trim())}` |
| Image URL dialog (author, footer, thumbnail and similar icons) | YES | `components/ImageUploader.tsx` L51-52 `imageInput` and `localImage` local state; L54-57 `setImage(localImage)` only on confirm (`onSetImage`). Typed text is lost on reload. The value is a URL that is image-checked asynchronously (L68-79), not message text, and it is only committed on explicit confirm. |
| JSON editor modal (`JsonModalBody`) | YES | `JsonModalBody.tsx` L54 `usePassedProp(jsonModalSeed(message))`; L75 `onChange: setMessageString`; `updateMessage` runs only in `commitLoad` (L88) |
| Message username (`Author.tsx`) | NO | L66 `onChange={wrappedSetUsername}` calls `setUsername` per input. `ContentEditable.tsx` L48 `onInput` calls `props.onChange`. |
| Embed author URL, embed title URL | NO | `EmbedAuthor.tsx` L170 and `EmbedTitle.tsx` L142: controlled `TextField`, `onChange={setUrl}` |
| Component editors (LinkButton label and URL; File URL; MediaGallery URL, description, alt; Thumbnail URL and description; Separator) | NO | Controlled `<input value=... onChange=...>` straight to the setter: `LinkButtonEditor.tsx` L49 and L59, `FileEditor.tsx` L79, `ThumbnailEditor.tsx` L82 and L93, `MediaGalleryEditor.tsx` L64, L77 and L90 |
| Message name (Navigation) | NO | `Navigation.tsx` L278 `onChange={updateName}` per keystroke. `onBlur` only resets an empty name. |
| Save As dialog name | not a draft input | `SaveAsMenu.tsx` L135-136 local `messageName` until submit. It names a new save and is not message content. Local until confirm, outside the message. |
| Webhook URL, thread id, thread name, message id or link | not message data | `WebhookMenu/index.tsx` L212-213, L336-337, L350-351 and `EditMessageMenu.tsx` L37-38 write `WebhookProvider` state (`providers/WebhookProvider.tsx` L58 `useState('')`), not `message`. That state is never in the draft (`MessageDraft` is `{ data, name, editedAt }`) and is lost on reload regardless of timing. Not the property as defined (not held "until blur/close/confirm"; it never reaches a stored draft at all). |
| Webhook name and avatar of the message | NO | These are message `username` and `avatar_url` (`Author.tsx` L66 per keystroke; avatar via `ImageUploader`, see above). |
| Header search, `NewMessageModal`, `NewMessageJsonInput` | out of scope | Not edits to an existing message; `NewMessageJsonInput` is local state before creating (`NewMessageJsonInput.tsx` L37) |

Other things read:
- There is no `beforeunload`, `pagehide` or `visibilitychange` handler in non-test `src` (`git grep -n -E "beforeunload|onbeforeunload|pagehide|visibilitychange" origin/master -- src`, test files excluded) returned no lines, so nothing flushes editor state on unload. I did not read `useUnloadAlert` or `leaveWithoutAlert`.
- `ContentEditable.tsx` L36-40 re-syncs `innerText` from `value`. With per-keystroke commits on author and footer, a controlled round trip would happen there; I did not assess caret behaviour.

## 4. Record

The handoff `handoff/open-content-editor-text-not-drafted-until-close-2026-11-20.md` was read whole.
- L4 Status-Detail: "Whether it is a defect or the intended draft boundary is not decided."
- L18-19: not established is whether pre-017 `1ad625e` behaved the same, whether the leave-page warning fires on that reload, and "the user-facing intent for an open editor's text".
- L20-21: "Next step, if picked up: state the intended draft boundary (on each keystroke, on a pause, or on close), then measure the current behaviour against it at the base before any fix."
- It names only the content editor. Its population is the "content editor" as a whole and does not enumerate the surfaces in section 3.

Owner ruling on the boundary:
- `steering/fixer-queue-2026-11-21-rulings.md` L82-83: "Q3 (H19, desktop content editor's text lost on reload while open): A. Agent: save the draft as he types on desktop, as mobile already does (Recommended); B. Agent: don't change." L106: "Q3 desktop draft: 'Agent: save as you type (Recommended)' — a fixer chain makes desktop save the draft as he types, as mobile does."
- `steering/selection-ledger/2026-11-21.md` L67-71: question 3 text, `answer: Agent: save as you type (Recommended)`. The question names only "text typed into an open content editor".
- Neither the question nor the answer covers embed author, footer, ImageUploader or JSON modal.

Documents stating the draft store and write times (none rules a boundary for typed text):
- `planning/closed/017-existing-items-backlog.md` L517-558 (M3 storage form and write matrix). The write matrix row "An edit at route 0 (typed, Clear, Load, mode switch) | written (`message` effect)" is stated with no boundary. L544-546 gives the rationale for the bound: "the whole map is read and written on every keystroke and re-parsed by every other tab (AF-16; 17.2 ms to serialise and 5.1 ms to parse a 7.4 MB map on this box, `verification/017/architect-delta/`), so 1 MB keeps that well under a frame". So the 017 plan assumed per-keystroke writes, which is true of mobile and of controlled inputs, not of the desktop content editor.
- D-22 and D-23 (L207-208, bound and quota) are the owner's selections on the store, not the timing.
- `architecture/website.md` L305-318 (A-7, "Consequence a change must carry": a change to the drafts goes through `messageDrafts.ts` and keeps M3's write matrix true).
- `architecture/system-architecture.md` L131 and L181.
- `uat/closed/` 017 UAT "Instrument notes" (file found by `grep` on `*017*` under `uat/closed`): text typed into the open content editor "never reaches the message or storage".
- No other document states a ruled boundary. Searched with `grep -rIn -E "messageDrafts|draft boundary|draft store|on close|commit-on-close|writeDraft|as he types|as mobile"` over planning/closed/017, architecture, uat/closed/*017*, handoff, steering, roadmap. I did not search `qa`, `code-review`, `critiques` or `verification`, other than the directory listing.

## 5. Performance hazards (from code, nothing measured)

- Slate fires `onChange(string)` on every flattened-string change (`SlateEditor/index.tsx` L59). Per keystroke it triggers a MessageProvider state update and then `writeDraft`: `JSON.parse` of the whole map, `JSON.stringify` of the whole map for the size test (`messageDrafts.ts` L45), another `JSON.stringify` inside `set` (`withLocalStorage.ts` L15), then `setItem` and a `storage` event. Route 0 adds a second `setItem` of `message` (L79). The bound is 1 MiB (L6).
- `typedDeepEqual(savedMessage?.data, message.data)` (index.tsx L187) runs per keystroke on a saved message.
- `dispatchEvent(new Event('storage'))` is synchronous. Every in-tab `useLocalStorage` reader re-reads (I did not enumerate them; `theme` and `client_preferences` are also typed keys, per `architecture/website.md` L305-306).
- The plan's own measurement (17.2 ms to serialise 7.4 MB; 5.1 ms to parse) is the source for "under a frame at 1 MB". It was taken at plan time; I did not re-measure.
- `SlateEditor` runs `onChange(string)` once on mount (an effect on first render), so opening the desktop editor will call the message setter once with the current text. With the fix, that is a no-op message identity change only if the setter bails out on equal value; I did not read the setters (`setTitle`, `setDescription`, `setContent`). If one creates a new `message` object, it writes a draft on focus alone (mobile already behaves that way). Not verified.
- `usePassedProp` (`utils/hooks/index.ts` L43-47) resets local state when its prop changes. If desktop commits per keystroke, `value` changes as the user types and the local value is reset to the same string. `SlateEditor` ignores `initialValue` changes (memo at L151 omits it), so the Slate content is not reset. Not tested.

## 6. Covering tests and gaps

Covering the draft store and provider (these exercise the effect at index.tsx L182-192 by calling the provider API, not by typing into an editor):
- `providers/MessageProvider/__tests__/MessageProvider.stored-draft.test.tsx`, describes at L114, L148, L202, L251, L269, L311, L323, L337, L352, L401, L418. Titles include "is restored after sign-in and a reload", "are shown after a reload, as before", "leave no stored draft once they are typed back to the saved copy", "of a saved message stays when an edit was typed after Save".
- `utils/__tests__/messageDrafts.bound-and-recency.test.tsx`: the bound, refused writes, reads at write time, the tab, route 0, the store from before.
- `providers/MessageProvider/__tests__/MessageProvider.save-new-number.test.tsx` imports `readDrafts` and `writeDraft`.

Not covered (no test file found; `git ls-tree -r --name-only origin/master -- src | grep __tests__ | grep -iE "ContentEditor|SlateEditor|Embed|Author|Footer|ImageUploader|ComponentEditor|stored-draft|DiscordMessageEditor|TextField|ContentEditable"`):
- No test for `DiscordContentEditor` (desktop or mobile) or `SlateEditor`. Neither the blur-within commit nor the mobile per-keystroke path is tested.
- No test for `EmbedAuthor`. `EmbedFooter` has two tests (`EmbedFooter.length-error`, `EmbedFooter.missing-text`) and `Author.username-error` exists, but none for commit timing.
- `ImageUploader.enter-scope` and `ImageUploader.url-validation` do not test commit timing.
- No test for `JsonModalBody` commit timing found in this listing (a `JsonModal*` test exists per CLAUDE.md example naming but was not in the filter).

What I did not cover:
- No run, no browser, no live check. Pre-017 behaviour at `1ad625e` was not read.
- Whether the leave-page warning fires on reload (`useUnloadAlert` / `NavigationGuardProvider` not read).
- Setter bodies for title, description, field name and value in `Embed.tsx`, `EmbedFields.tsx` and `DiscordMessageEditor/index.tsx` (whether they bail out on equal value).
- `useLocalStorage` consumers of the `storage` event.
- Caret behaviour of `ContentEditable` under controlled round trips, and mobile `BottomPortal` close behaviour.
- `verification/`, `qa/`, `code-review/` and `critiques/` for rulings.
