# Sweep: image URL dialog can save a URL other than the one shown (H-7)

Scope: sweep helper for steering-hooks, chain `fix-image-uploader-url`. Read only; no tree changed, nothing committed or installed.

**SHA read:** `132a7ab6f49d8a85ead507e2221ab3c3a531fd00` (`git -C /usr/local/bin/hooks/website ls-remote origin master`). All website code below is from `git show` / `git grep` at that SHA, not the working tree. Hypothesis source: `/usr/local/bin/hooks/agent-output/research/codebase-bug-evaluation-2026-11-08.md` row H-7 (line 174).

Nothing was run: no test, no browser, no mutation. Every verdict below is from reading the code at the SHA.

## 1. The dialog and its state

File: `src/components/ImageUploader.tsx` (`git show 132a7ab…:src/components/ImageUploader.tsx`).

State (lines 50–52):

```ts
const [imageError, setImageError] = useState('');
const [imageInput, setImageInput] = useState(image);
const [localImage, setLocalImage] = useState(image);
```

`image` is the prop (line 39, default `''` at line 47). The state is initialised once from the prop; there is no effect that re-syncs it to a later `image` change.

Save (lines 54–57, 84, 146):

```ts
const onSetImage = useCallback(() => {
  onClose();
  setImage(localImage);
}, [setImage, onClose, localImage]);
...
let submit: (() => void) | undefined;
if (localImage) submit = onSetImage;
...
onPress={onSetImage}   // line 146, Save button, isDisabled={!localImage && !image} (line 147)
```

Save commits `localImage`, never `imageInput`. The Enter path (`useDialogEnter(submit, isOpen)`, line 86) also commits `localImage`.

Clear (lines 58–62) resets all three state values.

Cancel (lines 63–66):

```ts
const onCancel = useCallback(() => {
  onClose();
  if (image === '' && localImage) setLocalImage('');
}, [image, localImage, setLocalImage, onClose]);
```

Cancel never resets `imageInput` or `imageError`. It clears `localImage` only when the prop `image` is `''`. The dialog's outside-click and Escape path also goes to `onCancel` (`PresetDialog onClose`, line 93), but `disableExternalClose={localImage !== image}` (line 94) blocks that path while a pending change exists. The Cancel button (line 132) and the header X (`PresetDialog.tsx` line 59) still call `onCancel`.

The async URL check (lines 68–79):

```ts
useEffect(voided(async () => {
  if (imageInput) {
    if (await checkImage(imageInput)) {
      setLocalImage(imageInput);
      setImageError('');
    } else {
      setImageError(isValidImageUrl(imageInput) ? 'Image not found.' : 'Invalid url.');
    }
  } else {
    setImageError('');
  }
}), [imageInput]);
```

`voided` (`src/utils/voided.ts` lines 1–3) is a plain wrapper: `return (...args) => { void func(...args); };`. There is no cancellation flag, no `AbortController`, no request id, and no check at resolution time that `imageInput` still equals the URL that was checked. `checkImage` (lines 20–35) wraps `new Image()` with `onload` / `onerror`. A `grep -c tagName` and a `grep -c` over `AbortController|cancelled|ignore|latest|requestId|useRef` on this file both return exit 1 (zero hits).

`checkImage` also resolves `false` without loading when `isValidImageUrl` is false (lines 21–23). `src/utils/isValidImageUrl.ts` lines 3–5 test whether the path (before `?`/`#`) `endsWith` one of `.png .jpg .jpeg .webp .gif .apng .tiff .webm`.

The `TextField` (lines 98–109) calls `onChange={setImageInput}`, so every keystroke changes `imageInput` and re-runs the effect.

### Per-mechanism verdicts

**(a) Late response from an earlier check overwrites a newer one: ALLOWED by the code.**

Sequence:
1. Dialog open, `image` is `''`.
2. Type URL A on a slow host. Effect E1 starts `checkImage(A)`; its `Image.onload` is pending.
3. Type URL B on a fast host. `imageInput` = B; effect E2 starts `checkImage(B)`. E1 is not cancelled (no cleanup is returned from the effect).
4. B loads. E2 runs `setLocalImage(B)`, `setImageError('')`. The box shows B and the preview shows B.
5. A loads late. E1 runs `setLocalImage(A)`, `setImageError('')`. The box still shows B; the preview shows A.
6. Save → `setImage(A)`. The commit is A, which is not the text in the box.

Variant (error clears under invalid text): type valid A (slow), then type an invalid suffix such as `x`. E2 resolves false immediately and sets `'Invalid url.'`. Then A loads and E1 sets `localImage` to A and clears the error. The box shows the invalid text with no error; Save commits A.

**(b) `localImage` kept after an invalid or empty input: ALLOWED by the code.**

Else branch (lines 73–75) only calls `setImageError`. It never clears `localImage`. The empty branch (lines 76–78) only clears the error.

Sequence: valid A loads (`localImage` = A, preview A). Edit the box to `https://example.com/b.html` (or any URL that fails `isValidImageUrl`, or a 404, or an empty string). E2 sets `'Invalid url.'` / `'Image not found.'` (or clears the error for empty). The preview still shows A and Save is enabled (`isDisabled={!localImage && !image}` is false). Save → `setImage(A)`. Enter does the same, since `submit` is defined while `localImage` is set. This is the H-7 "Paste a valid URL, then an invalid one, press Save" sequence, and it reproduces without any race.

**(c) Cancel does not reset `imageInput`: ALLOWED by the code, and it carries (b) or (a) into the next open.**

Cancel leaves `imageInput`, `imageError` and (when `image !== ''`) `localImage` untouched. The dialog is not unmounted: `PresetDialog` is passed `unmount={false}` (line 92), so the component and its state persist across open and close. The effect of this on its own:

- With `image` non-empty (a saved URL X), type valid Y, press Cancel, reopen. `localImage` is still Y, the box shows Y, and Save commits Y. The user cancelled and the next Save still commits the cancelled value. The box and the commit agree, so this is a "Cancel does not cancel" defect, not a box-versus-commit mismatch by itself.
- With `image === ''`, type valid Y, press Cancel. `localImage` is cleared (line 65), so Save is disabled, but the box still shows Y with no preview. No commit mismatch.
- If the box held invalid text when Cancel was pressed (sequence (b)), reopening shows the invalid text with its error and the preview of the earlier A, and Save commits A. Here Cancel is the carrier of the mismatch.

## 2. Render sites (origin master)

`ImageUploader` is imported via `~/components/dynamics/ImageUploader` (a `next/dynamic` wrapper, `src/components/dynamics/ImageUploader.tsx` line 3). Found with `git -C /usr/local/bin/hooks/website grep -n -E 'ImageUploader|imageInput|localImage' 132a7ab… -- src`. Five production render sites; the `dynamics/ImageUploader` import count in production code is 5 (`grep -n 'dynamics/ImageUploader'`, non-test files).

| Site (file:line of `<ImageUploader`) | `image=` prop (read at mount) | `setImage` writes to | Message field, the value that is saved |
|---|---|---|---|
| `src/components/DiscordMessageEditor/components/Author.tsx:158` | `avatarUrl` (line 161) | `setImage` (line 90) → `setAvatarUrl` (prop) | `avatar_url` of the message, via `useStateSetter<EditableMessageData,'avatar_url'>` in `src/components/DiscordMessageEditor/index.tsx:91` (`setAvatarUrl` passed at lines 278 and 291) |
| `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedAuthor.tsx:186` | `iconUrl` (line 188) | `setImageCallback` (line 52) → `setIconUrl` → `useStateSetter(author ?? …, 'icon_url', setAuthor)` (line 47) | `embed.author.icon_url` |
| `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedFooter.tsx:151` | `iconUrl` (line 153) | `setImageCallback` (line 51) → `setIconUrl` (line 49, `''` → undefined) → `useStateSetter(footer ?? …, 'icon_url', setFooter)` (line 48) | `embed.footer.icon_url` |
| `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedImage.tsx:126` | `url` (line 128, prop from `Embed.tsx` line 50 `image?.url`) | `setImage` (line 64) → `set` (prop, from `Embed.tsx` line 52 `set={setImage}`) → `EmbedEditor/index.tsx` line 73 `setImage` → `setEmbed({ image: { url: val } })` | `embed.image.url` |
| `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedThumbnail.tsx:58` | `url` (line 60, prop from `Embed.tsx` line 57 `thumbnail?.url`) | inline `set(img)` (line 62) → `set` = `setThumbnail` (`Embed.tsx` line 59) → `EmbedEditor/index.tsx` line 70 `setThumbnail` → `setEmbed({ thumbnail: { url: val } })` | `embed.thumbnail.url` |

`Embed.tsx` renders `EmbedImage` / `EmbedThumbnail` / `EmbedFooter` / `EmbedAuthor` with `showEdit` and the `editableState` gates (lines 43–66 of the Embed body; grep lines 43–65 of `Embed.tsx`). Embeds are keyed by `embed._key` (`src/components/DiscordMessageEditor/index.tsx:302`), so an uploader instance belongs to one embed; the other keyed lists in the editor are not relevant to this dialog.

**Component media: no render site.** `git -C /usr/local/bin/hooks/website grep -n -E 'TextField|ImageUploader|Uploader|dynamics/' 132a7ab… -- src/components/DiscordMessageEditor/components/ComponentEditors` returns only two `Tooltip` imports. `ThumbnailEditor.tsx` writes `media: { url: val }` directly from its own input (lines 24, 29). The record already says the same (`research/competitive-feature-landscape-2026-11-08.md` line 147: "`MediaGalleryEditor`, `ThumbnailEditor`, `FileEditor` import `ImageUploader` 0 times each").

## 3. Tests

Test files at the SHA that name the uploader (`git grep -l -i -E 'ImageUploader|imageInput|localImage' 132a7ab… -- 'src/**/__tests__/**'`):

- `src/components/__tests__/ImageUploader.enter-scope.test.tsx`: the only test that mounts the real component across Enter-key routing.
- `src/components/__tests__/ImageUploader.url-validation.test.tsx`: the only test of the URL check.
- Four other files mock the module out (`vi.mock('~/components/ImageUploader' | '~/components/dynamics/ImageUploader', () => ({ default: () => null }))`), so they test nothing of the uploader: `src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx:105`, `src/app/message/m/[id]/edit/__tests__/page.sign-in-exit.test.tsx:59`, `src/components/DiscordMessageEditor/components/__tests__/Author.timer-cleanup.test.tsx:13`, `src/components/DiscordMessageEditor/components/__tests__/Author.username-error.test.tsx:12`.

Case counts (static `it(` / `it.each(` call sites, `git grep -c -E '^[[:space:]]*(it|test)(\.each)?\(' 132a7ab… -- <file>`):

- `ImageUploader.enter-scope.test.tsx`: 11 call sites (7 `describe` blocks by `grep -c '^\s*describe\('`). Executed cases, derived from the source by reading, not run: 6 + 4 + 2 + 2 `it.each` rows (lines 141, 183, 214, 284) plus 7 plain `it`s = 21.
- `ImageUploader.url-validation.test.tsx`: 2 call sites (`it.each` at line 53 with 2 rows, plus `it` at line 64), 3 executed cases by reading.

Sequences covered:

- Enter key routing across focus targets, with one image loaded or none; the update-prompt dialog beside it; two mounted instances. Its `FakeImage` (lines 20–30) has `width = 1` and resolves on a microtask, so the check always succeeds immediately.
- `url-validation`: a path ending in `.html` or a query-only `.png` is refused without loading and shows `Invalid url.`; `https://example.com/a.png?size=2` loads and previews. Its `FakeImage` (lines 14–26) also resolves on a microtask, in call order.

Sequences **not** covered by any test at the SHA (checked: `grep -l -E 'Enter Image URL|upload preview|Image URL|checkImage|Image not found|Invalid url'` over `src/**/__tests__/**`, which only hit the two uploader files and two unrelated schema-message helpers `saveErrorCapSpecs.ts` and `listBoundSites.ts`):

- Two URL checks in flight at once, with out-of-order resolution (mechanism a). Neither fake gives a deferred control over resolution order.
- Valid URL followed by an invalid one, with Save (mechanism b). `url-validation` covers only an invalid URL from an empty start, with no prior `localImage`.
- Cancel and reopen (mechanism c); Cancel with a pending `imageInput`.
- Clear behaviour beyond the Enter-key cell (`'Clear'` in the enter-scope `it.each`, which expects no `setImage`/`close` call).
- A change of the `image` prop while mounted.

## 4. Record hits (`git -C /usr/local/bin/hooks/agent-output grep -n -i -e ImageUploader -e localImage HEAD -- architecture research handoff planning`, exit 0)

Hit files and lines:

- `research/codebase-bug-evaluation-2026-11-08.md:150` (F-39, Enter guard `tagName !== '~/components/Button'`), `:151` (F-40, `isValidImageUrl` substring match), `:174` (H-7, this hypothesis).
- `research/competitive-feature-landscape-2026-11-08.md:145`, `:147`, `:504`.
- `architecture/closed/015-bug-evaluation-fixes-architecture-findings.md:285`, `:600`.
- `architecture/closed/017-existing-items-backlog-architecture-findings.md:25`.
- `architecture/system-architecture.md:133` (Enter through `useDialogEnter`), `:221` (Enter-to-confirm row).
- `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md:6`, `:126` (F-7: focus after the image dialog closes; review trigger "the next change to ImageUploader.tsx").
- `planning/closed/004-lazy-loading-preload-overhaul.md:88`, `:103`, `:125`, `:156`.
- `planning/closed/005-user-reported-bug-fixes.md:74`, `:75` (clearing a thumbnail or embed image via ImageUploader and saving raises no error).
- `planning/closed/015-bug-evaluation-fixes.md:153`, `:239`, `:499`.
- `planning/closed/017-existing-items-backlog.md:49`, `:1059`, `:1088`, `:1100`, `:1106`, `:1168`, `:1169`, `:1180` (`ImageUploader` keeps closed instances mounted), `:1356`.

Notes from the hits that bear on this sweep:

- F-39 (`research/…:150`) and the 015 architecture lines (`:285`, `:600`) describe the `tagName` compare. At the SHA it is gone: `git grep -c tagName 132a7ab… -- src/components/ImageUploader.tsx` returns exit 1. The record's own line `architecture/closed/017…:25` and `architecture/system-architecture.md:221` say the same for release `787bec5`.
- F-40 (`research/…:151`) describes an older validator (`includes`, no `.jpeg`). At the SHA the validator is `endsWith` over a path with `.jpeg` and `.webp` present (`src/utils/isValidImageUrl.ts` lines 1–5). Not re-rated here.
- `planning/closed/017…:1180` says the component keeps closed instances mounted; this is what makes state survive Cancel (mechanism c).

## 5. What no instrument here sees

- No browser or running dev server. The race in (a) depends on real network response order from `Image` loads; no test here controls that order (both fakes resolve in call order on microtasks).
- No test run, no mutation run, and no `pnpm run typecheck`. Test counts above are from source reading, not vitest; the JSON exit code was not recorded because no vitest run was made.
- The working tree was not read, by instruction. A dirty tree may differ from the SHA.
- Whether any real path changes the `image` prop while the uploader is mounted was not traced beyond the render sites. The code permits a stale-state save (state is initialised once from the prop, and Save writes `localImage`), but the trigger was not found.
- The Escape, outside-click and Cancel focus behaviour of the headless `Dialog`/`Transition` in a real browser (record F-7, `handoff/017…:126`) is not checked here.
- Whether a saved message field re-renders the dialog's `image` prop with a different value between two openings was not checked.
- Production behaviour of the Pusher-backed message update path was not read and is not relevant to the uploader's local state.
- The dialog's commits are only the local editor state; whether a later Save of the message persists exactly what was committed was not traced.
