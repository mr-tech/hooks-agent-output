# Scope sweep: image-address dialog, website af3d95a

Date: 2026-11-23. Read-only sweep. Nothing executed against the app; no test was run and no mutation was made. Every claim below is from reading code at `af3d95a` unless marked otherwise. Nothing was committed.

Property under sweep: in the message editor's image-address dialog, Save (or Enter, or a kept value after Cancel) can commit an address other than the one the text box shows and has checked as loadable.

Scratch count files (exact totals): `/tmp/claude-1000/-usr-local-bin-hooks/51d829bf-7736-4b00-ac78-4cafb61a3252/scratchpad/pred1.txt` through `pred6.txt`, `pred1i.txt`, `pred5i.txt`, `iu.txt`, `pu.txt`, `rec.txt` (each is the saved output of `git grep -c`, summed with awk).

Process note: my first command wrote a copy of `src/components/ImageUploader.tsx` to `/tmp/claude-1000/x`. That was outside the scratchpad. I removed it (`rm /tmp/claude-1000/x`, confirmed removed).

## 1. Predicates

Command prefix for website: `git -C /usr/local/bin/hooks/website grep -c <flags> -E '<pattern>' af3d95a -- src`. Totals are the sum of the per-file counts in the saved file.

| # | Pattern (flags) | Files / total hits | Cannot see |
|---|---|---|---|
| P1 | `avatar\|author.?icon\|footer.?icon\|thumbnail\|image.?url\|imageurl\|embed.?image` (-i) | 76 / 473 | Field names that do not contain these words (`src`, `img`, `picture`, `logo`, `banner`, `pfp`, `media`, `attachment`, bare `url`). Also counts tests, i18n JSON and comments, so 473 is not a count of inputs. |
| P2 | `new Image\(` | 2 / 2 (`EmbedImage.tsx`, `ImageUploader.tsx`) | `img.src =` assignments, other Image aliases, `document.createElement('img')`. |
| P3 | `onload` | 5 / 7 | Load checks written as `addEventListener('load')` or a promise-based loader. |
| P4 | `PresetDialog` | 15 / 35 | Dialogs built directly on a headlessui or react-aria dialog primitive. |
| P5 | `isValidUrl\|validateUrl\|isUrl\|new URL\(` (-i) | 19 / 41 | Validation written inline or with another helper name. None of these names appear in the image dialog (`ImageUploader.tsx` uses only `isValidImageUrl`). |
| P6 | `inputMode=.?'?url` | 6 / 8 | `type="url"` inputs, which P6 does not match. Two such inputs were found only by the placeholder text: `ThumbnailEditor.tsx:78` and `MediaGalleryEditor.tsx:60`. |
| P7 | `ImageUploader` (-i) | 14 / 28 | Consumers that use a different import path. |
| P8 | `git -C /usr/local/bin/hooks/project-utils grep -c -i -E 'ImageUploader\|image.?url\|avatar\|thumbnail\|new Image\(\|onload' HEAD -- .` | 0 files, 0 hits (grep exit 1, output file 0 bytes) | Any shared image-input component under a name outside the pattern. Only the predicate was run; no project-utils file was read. |
| P9 | Record: `git -C /usr/local/bin/hooks/agent-output grep -c -i -E 'ImageUploader\|image url\|image address' HEAD -- research architecture planning handoff` | 15 files / 37 lines | Hits that use other wording for the same mechanism. |

Placeholder predicate (text, not count): `placeholder="https://example.com/image.png"` is found at `ThumbnailEditor.tsx:80` and `MediaGalleryEditor.tsx:62` (from a `grep -n` listing, so not a count).

### Surfaces found

Five image-address dialogs share one component, `src/components/ImageUploader.tsx` (`dynamics/ImageUploader.tsx:3` is a `next/dynamic` wrapper around it).

| Surface | Consumer (af3d95a) | `image=` prop | Save setter chain |
|---|---|---|---|
| Author avatar | `src/components/DiscordMessageEditor/components/Author.tsx:158-165` | `avatarUrl` (`image` line 161) | `setImage` line 90 calls `setAvatarUrl` (prop); `DiscordMessageEditor/index.tsx:91` is `useStateSetter(message, 'avatar_url', _setMessage)` |
| Embed author icon | `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedAuthor.tsx:186-191` | `iconUrl` (line 188) | `setImageCallback` line 52 to `setIconUrl` line 51 to `_setIconUrl` line 47 (`useStateSetter(author, 'icon_url', setAuthor)`) |
| Embed footer icon | `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedFooter.tsx:151-156` | `iconUrl` (line 153) | `setImageCallback` line 51 to `setIconUrl` line 49 to `_setIconUrl` line 48 |
| Embed image | `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedImage.tsx:126-133` | `url` (line 128) | `setImage` line 64 calls the `set` prop. The parent was not traced. |
| Embed thumbnail | `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedThumbnail.tsx:58-64` | `url` (line 60) | Inline `useCallback` line 62 calls the `set` prop. The parent was not traced. |

Non-dialog URL fields (no `ImageUploader`, no load check):
- V2 thumbnail: `ComponentEditors/ThumbnailEditor.tsx:76-82`. The `<input type="url">` is controlled by `thumbnail.media.url` and writes every keystroke through `setUrl` (line 24).
- V2 media gallery: `ComponentEditors/MediaGalleryEditor.tsx:58-65`. Same pattern.

For these two, the text box and the stored value are always equal, so the property cannot occur on them. They store unchecked text, which is a different issue.

### Shared component: `src/components/ImageUploader.tsx` at af3d95a

- State: `imageError` line 50, `imageInput` line 51 (seeded from `image` prop), `localImage` line 52 (seeded from `image` prop). The seeds are read only at mount.
- `checkImage` lines 20-35: if `isValidImageUrl` fails (lines 21-24), it resolves `false` without loading. Otherwise it loads the image and resolves `true` only if `width > 0`.
- Check effect lines 68-79: `voided(async () => { ... })` keyed on `[imageInput]`. It has no cancel flag and no check that `imageInput` is still current. A valid result runs `setLocalImage(imageInput)` (line 71) and clears the error (line 72). A failed result runs only `setImageError(...)` (line 74: `'Image not found.'` or `'Invalid url.'`), so `localImage` is not changed. An empty text box (lines 76-78) clears the error only.
- Save: `onSetImage` lines 54-57 calls `setImage(localImage)` (line 56). The Save button is lines 144-151: `onPress={onSetImage}` (line 146), `isDisabled={!localImage && !image}` (line 147). Save never reads `imageInput`.
- Enter: `submit` is `onSetImage` when `localImage` is truthy (lines 83-84). `useDialogEnter(submit, isOpen)` at line 86 (`src/utils/hooks/useDialogEnter.ts:9-11`).
- Preview `<img>` lines 110-127 shows `localImage` (line 123), not the text box.
- Clear: `onClear` lines 58-62 resets all three state values. An in-flight check can still run `setLocalImage(...)` afterwards (see F3).
- Cancel: `onCancel` lines 63-66 calls `onClose`, then resets `localImage` only when the `image` prop is `''` (line 65). `imageInput` is never reset. The X button in `src/components/PresetDialog.tsx:58-59` calls the same `onClose`, which is `onCancel`.
- External close: `disableExternalClose={localImage !== image}` (line 94). A checked but unsaved value blocks backdrop and Escape; Cancel and X still close.
- Text field: `onChange={setImageInput}` (line 106), `value={imageInput}` (line 107). `src/components/TextField.tsx` has no debounce or timeout (grep for `debounce|setTimeout` returned none). Each keystroke starts a new check.
- Persistence: `PresetDialog` is given `unmount={false}` (`ImageUploader.tsx:92`; `PresetDialog.tsx:34-35,48` pass it to `Transition` and `Dialog`). Each consumer keeps `ImageUploader` mounted and toggles `isOpen`. So `imageInput`, `localImage` and `imageError` survive close and reopen. Changes to the `image` prop after mount do not reach `imageInput` or `localImage`. Whether any path remounts it was not checked.

### Failure modes read from the code (not executed)

- F1 (deterministic, no race). A valid A is checked, so `localImage = A`. The user types an invalid B. Line 74 sets the error, `localImage` stays A, and Save (line 146) and Enter (lines 84, 86) commit A while the text box shows B. The same holds for `'Image not found.'`. Erasing the text box (lines 76-78) also leaves A committed.
- F2 (race, out of order). The effect has no staleness guard. Type a valid A (its load is slow), then type an invalid B. B's `false` returns at once and sets `'Invalid url.'`. A's `true` returns later, runs `setLocalImage(A)` and clears the error (lines 71-72). Result: text shows B, no error, Save commits A.
- F3 (race with Clear). Type A and wait for a pending check. Click Clear (lines 58-62). The check then resolves and runs `setLocalImage(A)` (line 71). Result: the text box is empty and Save commits A.
- F4 (kept after Cancel). With a non-empty `image` prop P, Cancel does not reset `localImage` (line 65 is skipped). A checked value A stays as `localImage`. Reopening shows A in the preview, and Save or Enter commits A even though the user cancelled. Only when the `image` prop is `''` does Cancel reset `localImage`, and then the text box still shows the typed text, though Save is disabled (line 147).

### Save commit variable per consumer

All five consumers commit `localImage` through the shared `onSetImage` (line 56). The consumer's setter then stores that value. The text box `imageInput` is never committed.

## 2. Existing test files

Name-matching list (`git -C /usr/local/bin/hooks/website ls-tree -r --name-only af3d95a -- src | grep -i -E 'image|upload'`): 17 paths, counted with `grep -i -c` on the same listing. Dialog-relevant ones:

1. `src/components/__tests__/ImageUploader.enter-scope.test.tsx`: Enter answers only the focused dialog. The happy path is line 170-181: Enter with a loaded `URL_A` calls `setImage(URL_A)`. Cancel is checked only as a close count (lines 145, 187). Its `FakeImage` (lines 20-28) resolves on `queueMicrotask`, so out-of-order resolution is never exercised.
2. `src/components/__tests__/ImageUploader.url-validation.test.tsx`: `a.png.html` and `a.txt?file=b.png` are refused without loading and show `'Invalid url.'` (lines 53-62). `a.png?size=2` loads and previews (lines 64-70). The `FakeImage` (lines 14-24) resolves on `queueMicrotask`. No case checks which value Save commits after invalid text, and no case runs two checks at once.
3. `src/utils/__tests__/isValidImageUrl.extensions.test.ts`: the pure validator's accept and reject lists (`it.each` at lines 8, 12, 16, 27). It does not reach the dialog.
4. `src/components/DiscordMessageEditor/components/__tests__/Author.timer-cleanup.test.tsx` and `Author.username-error.test.tsx`: mock `~/components/dynamics/ImageUploader` to `null` (lines 13 and 12). They do not exercise the dialog.
5. `src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx:105` and `src/app/message/m/[id]/edit/__tests__/page.sign-in-exit.test.tsx:59`: mock `~/components/ImageUploader` to `null`.
6. `src/utils/__tests__/constructImageUrl.default-avatar.test.ts`: default avatar URL construction. Not an input.
7. Four `src/server/api/utils/__tests__/previewImage.*.test.ts` files and `src/server/api/utils/deleteMessagePreviewImages.ts` (not a test): server-side preview path. Classified by name only; bodies not read.

## 3. Record search

`git -C /usr/local/bin/hooks/agent-output grep -n -i -E 'ImageUploader|image url|image address' HEAD -- research architecture planning handoff` gives 37 lines in 15 files. Lines that bear on the mechanism:

- `architecture/system-architecture.md:134`: Enter in `WarningDialog`, `ConfirmationDialog` and `ImageUploader` goes through `useDialogEnter`.
- `architecture/system-architecture.md:222`: the Enter-on-focused-Cancel stopping mechanism is named as unread.
- `architecture/closed/015-bug-evaluation-fixes-architecture-findings.md:285`, `:600`: the dead `tagName` compare in `ImageUploader.tsx` (AF-5). Absent at af3d95a (lines 81 and 86 of the current file).
- `architecture/closed/017-existing-items-backlog-architecture-findings.md:25`: delta read of new `ImageUploader` enter-scope tests; no finding.
- `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md:6`, `:126`: F-7, focus after the image dialog closes; trigger is the next change to `ImageUploader.tsx`.
- `planning/closed/005-user-reported-bug-fixes.md:74-75`: clearing a thumbnail or embed image via `ImageUploader` and saving shows no error. Bears on Clear.
- `planning/closed/015-bug-evaluation-fixes.md:153`: QAF-40, no test cell at `ImageUploader`.
- `planning/closed/015-bug-evaluation-fixes.md:191`: D8, F-40 validator rule.
- `planning/closed/015-bug-evaluation-fixes.md:499`: Enter on Cancel leaves the action unrun.
- `planning/closed/016-send-check-validity.md:420`: B-6 premise on where the image URL is read (unverified in the record).
- `planning/closed/017-existing-items-backlog.md:1059`, `:1088`, `:1100`, `:1106`, `:1168`, `:1169`: M8 members and Enter answering in `ImageUploader`.
- `planning/closed/017-existing-items-backlog.md:1180`: `ImageUploader` keeps closed instances mounted (persistence fact, matches `ImageUploader.tsx:92`).
- `planning/closed/004-lazy-loading-preload-overhaul.md:103`, `:125`: `ImageUploader` preloaded via `dynamics`.
- `research/codebase-bug-evaluation-2026-11-08.md:150`: F-39, Enter guard dead compare; Enter on Cancel also saves.
- `research/codebase-bug-evaluation-2026-11-08.md:151`: F-40, validator with substring match (fixed in code at af3d95a: `isValidImageUrl.ts:4-5` uses `endsWith` on the path).
- `research/competitive-feature-landscape-2026-11-08.md:147`: V2 media is URL only; `MediaGalleryEditor`, `ThumbnailEditor` and `FileEditor` do not import `ImageUploader`.

Hits off this mechanism (listed for completeness): `architecture/closed/001-components-v2-architecture-findings.md:145`, `architecture/preview-image-generator.md:41`, `architecture/system-architecture.md:229`, `handoff/preview-image-generator-host-security-posture-2026-11-08.md:21`, `handoff/closed/send-check-validity-post-deploy-2026-11-11.md:35`, `research/competitive-feature-landscape-2026-11-08.md:145`, `:504`.

## 4. Not covered

- Predicates P1 to P8 miss inputs with other names (`src`, `img`, `picture`, `logo`, `banner`, `pfp`, `media`, `attachment`, bare `url`). P6 misses `type="url"` inputs. The two found are `ThumbnailEditor.tsx:78` and `MediaGalleryEditor.tsx:60`, found by placeholder text only.
- No test was run, no browser was used, and no mutation was made. F1 to F4 are code-read claims. Real image load times, which drive F2 and F3, were not measured.
- The `set` prop sources for `EmbedImage.tsx:52` and `EmbedThumbnail.tsx` were not traced to message state.
- Server-side validation at send (`src/server/api/utils/shapes.ts`, `sendWebhook.ts`, `previewImage.ts`) was not read. Whether a committed bad address is rejected later is unknown.
- Whether `ImageUploader` remounts when the stored image changes from outside. There is no sync from the `image` prop after mount (`ImageUploader.tsx:50-52`).
- The device-upload path is commented out (`ImageUploader.tsx:81`). The `dataURL` name in `Author.tsx:90` and `EmbedAuthor.tsx:52` suggests it was once live. Not analysed.
- `getImageDimensions` in `EmbedImage.tsx:14-27` and `:66-69` has the same unguarded out-of-order pattern for the committed preview size. It is outside the dialog and its effect was not checked.
- `project-utils` (HEAD `a47e683`): zero predicate hits. Its files were not read beyond the predicate. No shared image-input component was found under these names.
- `preview-image-generator`: not read, per instruction.
- Matched but not read: `src/components/DiscordMessageEditor/components/ComponentEditors/__tests__/ThumbnailEditor.description-limit.test.tsx`, `src/components/DiscordMessageEditor/components/EmbedEditor/__tests__/EmbedEditor.empty-embed-hidden.test.tsx`, and the `src/lang/generated/*.json` files.
- Link-URL fields (`LinkButtonEditor.tsx:57`, `EmbedTitle.tsx:136`, `EmbedAuthor.tsx:169`) are not image inputs and were not analysed.
