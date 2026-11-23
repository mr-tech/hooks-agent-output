---
ID: n/a
Origin: fix-image-uploader-url
UUID: 5d9aefc4
Status: Active
Status-Detail: "Limb 5 (Enter in the box, his 17:40Z selection) with the QA fix round handed off at website 48c5e87 to code review (code-reviewer-fix-image-uploader-url), then QA Phase 2's re-run; 41 production lines added; merge is devops's at release, under the owner's release approval."
Handoff-At: 48c5e87 — repos=website
Origin-Chain: none
---

# fix-image-uploader-url — implementation

## Scope statement

From `steering/fix-image-uploader-url-rulings.md`, block "2026-11-23T15:54Z". Behind it are his selection in block "2026-11-22T04:44" ("Agent:
fix all three": "Save always saves exactly what the box shows and only once it has loaded; a bad address can't be saved; Cancel puts the box
back to the saved image") and "fix everything found along the way" (effort block 04:50, which brings F3 in). The route is the fixer, then
`code-reviewer-fix-image-uploader-url`, then QA Phase 2 at 20 or more production lines, then devops for website `master` (his word). The
statement, quoted:

> in the image address dialog, (1) Save and Enter commit exactly the address the box shows, and only once that address has loaded; (2) an
> address that fails the check, by format or by load, cannot be saved; (3) a slower, earlier check never overwrites a later one, and none
> lands after Clear (F3, in scope under "fix everything", effort block 04:50); (4) Cancel puts the box and the preview back to the saved
> image, with or without one saved, and reopening shows the saved image.

Write set: `src/components/ImageUploader.tsx`, any helper beside it, its tests under `src/components/__tests__/`, this document and
`verification/fix-image-uploader-url/`. Not covered by the sweeps, and not covered here: the parents' `set` wiring, server-side
validation, behaviour on a real remount, and real image load times.

## Entry Conditions

| Condition | Value |
|---|---|
| Scoping determination | `steering/fix-image-uploader-url-rulings.md` block "2026-11-23T15:54Z", relayed by brief `steering/fix-image-uploader-url-brief-fixer.md` (with `-brief-common.md`) |
| Bounded scope statement | Quoted above. Not to touch: anything outside the write set |
| Fix branch | website `chain/fix-image-uploader-url`, checked out by steering at `af3d95a`. `git branch --show-current` was read first (15:56Z) and printed `chain/fix-image-uploader-url` |
| Record on the mechanism | `architecture/website.md` W-2 (read: a bad address is stopped in the dialog, not by a server gate, which is where this fix acts). `research/codebase-bug-evaluation-2026-11-08.md:174` (row H-7). The sweeps `verification/fix-image-uploader-url/scoping/sweep.md` and `sweep-af3d95a.md`, and the refutation `scoping/refutation-af3d95a.md`, were read at the file. No `architecture/` entry names `ImageUploader.tsx` |

## Diagnosis

**Cause.** At `af3d95a`, `ImageUploader.tsx` keeps two values: the box (`imageInput`) and the last address that loaded (`localImage`). Save
and Enter commit `localImage` (L56, L84), never the box. Four ways follow from that:
- F1: after a loaded address, an invalid or unloadable one only sets the error (L74). `localImage` keeps the old address, and Save stays
  enabled (L147).
- F2: the check effect (L68-79) has no staleness guard, so an earlier, slower check that lands last overwrites `localImage`.
- F3: Clear (L58-62) empties both values, but a check still pending writes its address back into `localImage` (L71).
- F4: Cancel (L63-66) never resets the box, and with an image saved it keeps `localImage`. `PresetDialog unmount={false}` (L92) carries both
  across close and reopen.

Instruments: the refutation run (claims a to c, at `af3d95a`), and the red run below (11 of 14 cases fail at `af3d95a`, each on its
literal expectation). F3 is shown by "stays cleared when the address it cleared finishes loading afterwards", which fails at base with
`expected 'https://example.com/a.png' to be null` on the preview.

A fifth path, found while writing the red tests, is a site of limb 1 in the same component and lines. Deleting the box's text by hand
leaves `localImage` set, so Save commits the old address, not the empty box. Red at base: "saves no image when the saved address is deleted
from the box" fails with `expected [ 'https://example.com/x.png' ] to deeply equal [ '' ]`.

**The change resolves the committed value differently.** Save now commits the box (`imageInput`) and is enabled only where `loaded` holds,
or where the box is empty and an image is saved. Here is every consumer of the committed value, and every guard that reads `localImage`:
- `setImage`, passed by the five consumers: `Author.tsx:158` (`setImage`), `EmbedThumbnail.tsx:58` (`set(img)`), `EmbedImage.tsx:126`
  (`setImage`), `EmbedAuthor.tsx:186` and `EmbedFooter.tsx:151` (`setImageCallback`). Each was read at the call site. The prop contract is
  unchanged: the same props and the same `(url: string) => void`. The values reaching them are an address that loaded, as before, or `''`,
  which base already sent on Clear then Save. No new value class reaches them.
- Enter: `submit` is gated on `loaded`, not on `localImage`.
- Preview: rendered on `loaded`, so it shows only an address that can be saved.
- Clear `isDisabled={!localImage}` and `disableExternalClose={localImage !== image}`: both are unchanged and still read `localImage`.
  `localImage` now differs from base in two places only. A stale check no longer writes it (limb 3), and Cancel resets it to the saved
  image (limb 4).

**Base compared with fix for what is routed out.**
- My first fix (`cfd3b7f`) cleared `localImage` when the box's address failed to load. For a saved address that fails at open, that
  disabled Clear and lifted the outside-click block. At base, Clear stayed available there and outside clicks were not blocked, so the
  change was a regression of this chain's own making, and in scope. `ee87897` records the failed address in its own state
  (`failedImage`) and leaves `localImage` alone. "stays available for a saved address that fails to load when the dialog opens" holds the
  base behaviour. It passes at base, and the control `failed-load-clears-preview` turns it red.
- Outside-click close after Cancel: at base, Cancel left `localImage` on the cancelled address, so on reopen the dialog blocked outside
  clicks. Now `localImage` equals the saved image after Cancel, so they are not blocked. That is limb 4's intended state, read from code,
  with no case of its own.
- Clear's enabled rule with an unloaded address typed and nothing loaded: disabled at base, disabled now (unchanged expression and
  inputs).

**Residue in production.** The defect has shipped: website `master` `af3d95a` carries it, and Vercel serves it. The component writes
nothing itself. Its only effect is the value it hands `setImage`, which the editor then saves with the message. So the residue is
stored messages whose author, avatar, footer, image or thumbnail address is not the one the box showed at Save:
- an earlier address that loaded after a later one (F2);
- the last loaded address, where an invalid or unloadable one was in the box (F1);
- a cancelled address saved on a later Save (F4);
- the old address, where the box had been emptied by hand.

Each such value was an address that loaded at save time. Nothing in the data tells it from an intended one. The release (a Vercel deploy
of `master`) applies the fix to every page load after it. A tab already open on the old bundle keeps the old behaviour until it reloads.
It repairs nothing already saved. Who checks the live state: the owner, since it is production data.

**Origin-Chain.** `git blame -L 54,79 af3d95a` gives `a96619c` (2022-12-16), `3a1e066` and `a883e89` (2022-12-26), `3259c86` (2023-01-13)
and `775984c` (2023-05-12). All were made before the pipeline existed, so no chain's change introduced the defect.

**Lifetime: the address check.** Each run of the effect starts one check (an `Image` load) with a `current` flag. The cleanup releases the
flag. The load itself is not aborted, and its result is ignored. There is one `await` between the read of `imageInput` and the guarded
writes (`checkImage`), and the guard is read after it.

| Exit between start and release | Disposition | Case shown red with the release removed |
|---|---|---|
| The check lands while its address is still in the box | It writes `localImage`/`failedImage` and the error | (normal path) |
| The box changes first (typing) | The cleanup drops the result | "saves the address the box shows when an earlier address finishes loading after it" (`stale-guard-removed`, `cleanup-removed`) |
| Cancel changes the box back to the saved image first | The cleanup drops the result | "keeps the saved image when the cancelled address finishes loading afterwards" (same two controls) |
| Clear empties the box first | The cleanup drops the result | "stays cleared when the address it cleared finishes loading afterwards" is red at base. With the guard removed it stays green, because `loaded` also needs the box to match, so that case does not discriminate the guard. The guard is discriminated by the two rows above |
| The component unmounts | The cleanup drops the result | No case. Unmount runs the same cleanup as the rows above, and React ignores a set after unmount. Not separately discriminable |
| Cancel with the box already on the saved image | No release (the box does not change), and the check of that same address lands | Not a stale write: it is the box's own address |

**Declined work.** Save and Enter are refused while the box's address is still loading or has failed. The refusal queues nothing. The
press is dropped (Save is disabled, and Enter has no handler). The address becomes saveable when its own check lands. "keeps Save and
Enter off while the address in the box is still loading, then saves it once loaded" follows one refused address (B) to its save once it
loads, and is red at base. There is no separate decision-only tree: the refusal and the later save read the same `loaded` value.

## Change

Website `af3d95a..7660259` (`cfd3b7f`, `03164d5`, `ee87897`, `7660259`):

- `src/components/ImageUploader.tsx`, five changes:
  - `loaded` is defined as: box not empty, equal to the last loaded address, and not the last failed address.
  - Save commits the box. Its enabled rule is `imageInput ? !loaded : !image`. Enter and the preview are gated on `loaded`.
  - The check effect drops a result whose box has moved on (the `current` flag, released in the cleanup), and records a failed address in
    `failedImage`.
  - Cancel resets the box, the loaded address and the error to the saved image.
  - The empty-box branch moved inside the async callback, so no setState runs synchronously in the effect (eslint
    `react-hooks/set-state-in-effect`).
- `src/components/__tests__/ImageUploader.saved-address.test.tsx` (new, 14 cases). Before adding it I checked the existing tests on this
  surface. `ImageUploader.enter-scope` (Enter routing) and `ImageUploader.url-validation` (the format check) both resolve `Image` in a
  microtask, so neither can drive load order. The new file mounts the real component under a host that keeps `image` and `isOpen` the way
  a parent does, with an `Image` resolved by hand.

`git diff --numstat af3d95a 7660259`, production paths, added column: **26** (`ImageUploader.tsx`). That is 20 or more, so QA Phase 2 is
owed. The test file adds 289 lines, none of them production.

No irreversible action is added. No source comment is added.

## Test

All evidence is under `verification/fix-image-uploader-url/`. The captured command logs are stored as `.txt`, because the record's
`.gitignore` excludes `*.log`.

- **Red run** at `af3d95a`: a `git worktree add --detach` export at `af3d95a` with the 14-case file copied in, then
  `npx vitest run src/components/__tests__/ImageUploader.saved-address.test.tsx`. Result: **11 failed, 3 passed (14), exit 1**
  (`red-run-af3d95a.txt`). Each failure is on its literal expectation. The three that pass at base hold base behaviour the fix keeps, and
  each is shown red by a control below:
  - "stays available for a saved address that fails to load…" (`failed-load-clears-preview`);
  - "saves an address that loads on a later try after failing" (`failure-never-forgotten`);
  - "shows no preview and saves nothing on Enter once a failed address is deleted from the box" (`loaded-allows-empty-box`).
- **Green run** at `7660259`: the same command, **14 passed (14), exit 0** (`green-run.txt`).
- **Negative controls**: 15 mutants, each run in its own `git archive` export of `7660259` through
  `python3 ~/.claude/tools/mutation-run.py --sha 7660259 --mutants mutants.json --dep node_modules --timeout 240`. The command ran the
  three `ImageUploader` test files under a transcribed config (`__dirname` → `process.cwd()`, per the runner's stated limit), 38 cases a
  run, the control's count equal. Result: **15 of 15 killed**, 0 stillborn, 0 aborted, exit 0 (`controls/mutation-run-7660259.out`, table
  `controls/mutation-table-7660259…json`, summary `controls/table-7660259.md`). Each guard the diff adds, each Cancel reset, and each
  choice in the Save rule has its own control: `stale-guard-removed`, `cleanup-removed`, `failed-address-not-recorded`,
  `failed-load-clears-preview`, `failure-never-forgotten`, `loaded-ignores-failure`, `loaded-allows-empty-box`,
  `save-disabled-ignores-empty-box`, `save-enabled-with-nothing-saved`, `save-commits-last-loaded`, `enter-ungated`,
  `preview-shows-last-loaded`, `cancel-keeps-box`, `cancel-keeps-preview` and `cancel-keeps-error`. Earlier runs at `cfd3b7f` (11 of 12)
  and `03164d5` (12 of 12; 14 of 15 at `ee87897`) are kept in `controls/`. Each survivor got a case, shown red at base or by its control:
  - `save-commits-last-loaded` → "saves no image when the saved address is deleted from the box";
  - `loaded-allows-empty-box` at `ee87897` → "shows no preview and saves nothing on Enter once a failed address is deleted from the box".
- **Invented value (testing-patterns Iron Law 5).** The browser's `Image` is replaced by `FakeImage`, which fires `onload` with
  `width = 1` or `onerror` when a test calls `settle`. That is an invented environment value. Two real behaviours it does not reproduce:
  - A load that fires `onload` with width 0: `checkImage` maps it to false. It is not exercised here.
  - A load that fires neither callback: the check stays pending. The signature would be Save staying disabled with no error shown.

  Real load times are outside the scope statement.
- No time-based test, and no timer.

## Verification

- **Existing tests.** At base `af3d95a` (step 2's command, `npx vitest run --reporter=json`): **2696 passed of 2696, 172 files, exit 0**
  (`suite-base-af3d95a.json`/`.txt`). At `7660259`, two runs:
  - Run 1: 2708 passed and 2 failed of 2710, 173 files, exit 1 (`suite-fix-run1.json`/`.txt`). The two failures are
    `trpc.batch-refusal.test.ts` ("refuses two calls with a bad-request status…") and `messageValidity.predicate.test.ts` ("parity by
    construction…"). Each ran about 5,000 ms, vitest's default case timeout, at load average 30 to 33 (`uptime`, 16:32Z). Neither file
    imports `ImageUploader` (`grep -c`, 0 each). Not investigated further.
  - Run 2: **2710 passed of 2710, 173 files, exit 0** (`suite-fix.json`/`.txt`). Against base that is 14 more cases and one more file.
    Compared by path membership, the one added file is `ImageUploader.saved-address.test.tsx` and no base file is missing.
- **Build verification.** The workspace names none beyond the typecheck: no `verify-pinned-build.sh`, and no package-manager operation
  was run. `pnpm run typecheck` (both `tsc` programs) in a `git worktree` export of `7660259`, with the untracked `next-env.d.ts` copied
  in: **exit 0** (`typecheck-export.txt`). In the shared tree the same script exits 2 on
  `.next/types/validator.ts(227,39): Cannot find module '../../src/pages/api/cron.js'`. That is a build artifact `.gitignore` ignores,
  pointing at a file the repository no longer has. My change does not touch it.
- **Lint.**
  - `npx eslint --max-warnings=0` (no fix) over the two changed files: **exit 0** (`lint-changed-files.txt`).
  - `node ~/.claude/tools/convention-check.js website --since=af3d95a`: **0 FAIL, 0 CANDIDATE**, exit 0 (`convention-check.txt`). It
    covers the comment gate, test naming, fixed waits and eslint `--no-fix`. It logged 18 SKIPs:
    - 17 are `.playwright-mcp/*.png`, untracked files that are not this chain's.
    - 1 is its ID-token and basename check, which did not run ("states an ID-token class this checker does not implement verbatim"). I
      checked by hand instead. The workspace's ID-token regex over the test file matched nothing (`grep` exit 1), and the basename
      matches the positive form (`grep -c` 1).
  - **Disclosed in this round: the repository's lint script is `eslint --fix . --max-warnings=0`.** I ran it once as `pnpm run lint` in
    the shared tree, before the first commit. It exited 1 (557 problems, 247 errors, repo-wide, `lint.txt`), and its autofix rewrote 75 files outside
    my write set. I checked that every one of the 75 was byte-identical to eslint's own `--fix` output from that file's `HEAD` content
    (reproduced in a detached export, 75 of 75 identical). Then I re-checked each file just before restoring it with
    `git show HEAD:<path> > <path>`: 75 restored, 0 skipped. `git status` afterwards showed only my two paths and the pre-existing
    `.playwright-mcp/`. No other session's work was in those files. The repo-wide lint count at base was not measured, so whether the
    557 are pre-existing is not established here. The two changed files are clean.
- **Exports.** I set up the worktrees `scratchpad/base` and `scratchpad/tip`, and the mutation runner's `scratchpad/mwork`. All were
  removed: `git worktree list` shows only the shared tree and one worktree belonging to another session.

## Code review Round 1 fix

Code review Round 1 (`code-review/fix-image-uploader-url-code-review.md`, record `abdbd832`) REJECTED `7660259` on CR-1 MEDIUM and
CR-2 LOW. CR-3 INFO is steering's, and nothing was owed here. Fixed at website `a8b23ce` and `e94baf7` (`7660259..e94baf7`). The diff
touches only the two files and the two findings, so this is a sub-entry of Round 1.

- **CR-1, Preferred remedy taken.** The error is no longer stored. It is derived in render from the check's own state: an error shows
  only when the box is not empty and equals `failedImage`, and the message is chosen by `isValidImageUrl`. `imageError` and its five
  setters are removed, so neither Cancel nor Clear can put the error out of step with the check. That eliminates the class the finding
  names (the enumeration's one member, `onCancel`'s `setImageError('')`, is gone). The cost the review named applies: an old address's
  error goes as soon as another is typed, not when the new check lands. A case now holds it ("saves an address that loads on a later
  try after failing", whose assertion was added after `error-shows-any-failure` survived at `a8b23ce`).
  - Case owed: "keeps the error of a saved address that fails to load when the dialog is cancelled unedited and reopened". Cancel leaves
    the box on the saved address, so the effect does not re-run.
- **CR-2.** `onSetImage` sets `localImage` to the committed value, so `localImage === image` holds after Save as it does after Cancel.
  - Case owed: "leaves nothing to clear on reopening after an emptied box is saved" (Clear disabled).
- "empties the box and the preview when no image was saved" gained `not.toContain('Invalid url.')`, which holds the new clause
  `imageInput !== ''` (control `error-on-empty-box`).

Evidence, all under `verification/fix-image-uploader-url/round1/` unless named:
- **Red** at `7660259`, from a `git worktree` export of `7660259` with the final 16-case file: **3 failed, 13 passed (16), exit 1**
  (`red-run-7660259.txt`). The three:
  - CR-1's case: `expected 'Enter Image URLImage URLCancelClearSa…' to contain 'Image not found.'`, the review's falsity signature.
  - CR-2's case: `expected false to be true`, the review's signature.
  - The retry case's new assertion.
- **Green** at `e94baf7`: the three `ImageUploader` files, **40 passed (40), exit 0** (`green-run.txt`).
- **Controls** at `e94baf7`: 18 mutants, **18 of 18 killed**, exit 0 (`controls/mutation-run-e94baf7.out`, `controls/table-e94baf7.md`).
  - `cancel-keeps-error` was retired: its target line no longer exists.
  - New controls: `error-shows-any-failure`, `error-on-empty-box`, `error-messages-swapped` and `save-keeps-last-loaded`.
  - At `a8b23ce` the count was 17 of 18 (`controls/table-a8b23ce.md`). The survivor got the assertion above.
- **Suite** at `e94baf7`: **2712 passed of 2712, 173 files, exit 0** (`suite-e94baf7.json`/`.txt`).
- **Typecheck**, both programs, in a `git worktree` export of `e94baf7`: **exit 0** (`typecheck-export.txt`).
- **Lint**: `eslint --max-warnings=0`, no fix, over the two files, exit 0 (`lint-changed-files.txt`).
- **Convention check**: `--since=af3d95a`, 0 FAIL, 0 CANDIDATE, the same 18 SKIPs as before (`convention-check.txt`).
- `git diff --numstat af3d95a e94baf7`: **27** production lines added (`ImageUploader.tsx`), so QA Phase 2 is still owed. The worktrees
  were removed (`git worktree list`: the shared tree, and one worktree belonging to another session).

Flow 3 below now reads: the error shows for the address in the box, and goes as soon as another address is typed.

## QA Phase 2 fix round

QA Phase 2 (`qa/fix-image-uploader-url-qa.md`, record `8dfa68f9`) failed `e94baf7` on QAF-1 MEDIUM. Steering then ruled QAF-3 into this
round under limb 4 (rulings block "2026-11-23T17:22Z", record `1cf6d88b`). QAF-2 is held for him by steering, and only its wording
correction is made here (flow 1, below). Fixed at website `2217a92`, `b97f79c` and `cae7472` (`e94baf7..cae7472`).

- **QAF-1, test only.** The test `Host` now passes `useCallback` callbacks, which stay the same across renders, as all five consumers'
  callbacks do. Under the old host, a new arrow on every render re-created `onCancel` and hid a lost `image` dependency. New case:
  "puts the box back to the image saved in this dialog, not the one it opened with" (Save A over a saved X, reopen, type B, Cancel,
  reopen: the box shows A, and Save commits A). At `e94baf7` it passes, because the behaviour is already correct there. QA's survivor
  `cancel-ignores-saved-change` (`[image, onClose]` → `[onClose]`) kills it, at `2217a92` and again at `cae7472`. The other 41 cases
  stay green under the new host.
- **QAF-3, production.**
  - *Re-derived by reading the code at `e94baf7`.* `Author` renders its `ImageUploader` (`Author.tsx:161`, `image={avatarUrl}`) from
    `DiscordMessageEditor/index.tsx:284` with no key, so it stays mounted. The JSON modal's load (`JsonModalBody.tsx:78-88`,
    `updateMessage`) and the reload offered by "Message Update Detected" (`usePusher.ts:64-75`, `onConfirm: reloadMessage`) replace the
    message, and with it `avatar_url`. The dialog reads `image` only as the initial value of `useState`, so its box and preview stay on
    the old address. Save then commits that address back over the new one.
  - *Red*, through the real component: "shows that image on reopening, and saves it". The host replaces the saved image while the
    dialog is closed. Run against the unchanged component at `2217a92`: `expected 'https://example.com/x.png' to be
    'https://example.com/z.png'`, 1 failed and 17 passed, exit 1 (`qa-round1/red-run-2217a92.txt`). With the final test file at
    `e94baf7` it is the only failure: 1 failed and 17 passed, exit 1 (`qa-round1/red-run-e94baf7.txt`).
  - *Fix*: the dialog remembers the saved image it last showed (`shownImage`). When `image` differs from it, during render (React's
    documented way to adjust state when a prop changes), it adopts the new image into the box and the loaded address. The check effect
    then re-runs for the new box. A change that arrives while the dialog is open replaces the box in the same way.
  - *Consumers of the newly resolved value*: the box, the preview and `loaded`, which read `imageInput`/`localImage` as before. The five
    consumers' props are unchanged. The embed dialogs remount on load (steering's reachability read), so for them the sync simply
    agrees with the initial state.
- **Simplification.** With the sync in place, CR-2's `setLocalImage(imageInput)` in `onSetImage` became indistinguishable: after Save,
  each consumer passes the committed value back as `image`, and the sync sets `localImage` from it. Control `save-keeps-last-loaded`
  survived at `b97f79c` (21 of 22). I removed the line at `cae7472` and retired the control. CR-2's case, "leaves nothing to clear on
  reopening after an emptied box is saved", still passes, and the sync's own controls hold it.

Evidence, under `verification/fix-image-uploader-url/qa-round1/` unless named:
- **Green** at `cae7472`: the three `ImageUploader` files, **42 passed (42), exit 0** (`green-run.txt`).
- **Controls** at `cae7472`: **21 of 21 killed**, exit 0 (`controls/mutation-run-cae7472.out`, `controls/table-cae7472.md`).
  - New controls: `cancel-ignores-saved-change`, `saved-change-ignored`, `saved-change-keeps-box` and `saved-change-keeps-preview`.
  - `cancel-keeps-box` and `cancel-keeps-preview` were widened to stay unique, because the sync repeats their lines.
  - `save-keeps-last-loaded` was retired with its line.
  - Earlier runs: `2217a92` 19 of 19, `b97f79c` 21 of 22.
- **Suite** at `cae7472`: **2714 passed of 2714, 173 files, exit 0** (`suite-cae7472.json`/`.txt`).
- **Typecheck**, both programs, in a `git worktree` export of `cae7472`: **exit 0** (`typecheck-export.txt`).
- **Lint**: `eslint --max-warnings=0`, no fix, over the two files, exit 0 (`lint-changed-files.txt`).
- **Convention check**: `--since=af3d95a`, 0 FAIL, 0 CANDIDATE, the same 18 SKIPs (`convention-check.txt`).
- `git diff --numstat af3d95a cae7472`: **32** production lines added (`ImageUploader.tsx`). The worktrees were removed
  (`git worktree list` shows only the shared tree).

## Limb 5: Enter in the address box

His selection, in rulings block "2026-11-23T17:40Z" (record `031db12f`): once the address has loaded, Enter with focus in the address
box commits as Save does, under limbs 1 and 2's conditions. `useDialogEnter.ts` is shared, so the other dialogs' Enter must not change.
Done from `cae7472` at website `7f0229c`, `96fb1f8` and `48c5e87` (`cae7472..48c5e87`). It supersedes the Round 2 approval at `cae7472`.

- **Cause** (the ruling's refutation, re-read in the library at 5.2.4). In `dist/index.js` the hotkey handler returns early when the
  event's target is a form tag (`Z(s)`), unless `enableOnFormTags` names it (`F(s, t?.enableOnFormTags)`). `F`'s parameter defaults
  to `false`. `useDialogEnter` passed only `{ enabled }`.
- **Change.**
  - `useDialogEnter` takes an optional third parameter, `enableOnFormTags`, typed `Options['enableOnFormTags']` from the library's own
    exported type, and passes it to `useHotkeys`.
  - `ImageUploader` passes `['input']`.
  - `WarningDialog` and `ConfirmationDialog` pass nothing, so they hand the library `undefined`, which `F` treats exactly as its
    `false` default. Their Enter behaviour is unchanged by construction. Neither renders a form field (`grep -c "<input\|TextField"`,
    0 each), and `WarningDialog.enter-scope.test.tsx` passes unchanged in every run below.
  - Enter in the box still goes through the same `submit`, which is set only when `loaded`. So limbs 1 and 2's conditions apply as
    for Save.
- **Tests.**
  - `ImageUploader.enter-scope.test.tsx`: the URL-field expectation "alone, with an image loaded" changes from nothing to
    `{ close: 1, setImage: 1 }`, per the ruling. The "with no image loaded" URL-field expectation stays nothing (limb 1).
  - New in `ImageUploader.saved-address.test.tsx`, each a real keydown on the focused input through the `enter` helper:
    - "saves the loaded address on Enter with focus in the box";
    - "saves nothing on Enter in the box while its address is still loading" and "…has failed to load".
  - The same file's two `react-hooks/globals` errors (L43 `raise = …`, L109 `setOpen = set`) were already there before this round:
    the repo-wide `lint.txt` from the first round lists `ImageUploader.enter-scope.test.tsx:43:3` and `:109:3`, from when the file was
    untouched. Touching the file brought them into the convention check as FAILs, so I fixed them the way the saved-address host does:
    the update prompt and the close are pressed through hidden buttons, not reassigned module variables. The file's 21 cases have the
    same full names and pass status before and after (JSON reporter, compared as sorted lists: `true`).
- **Red** at `cae7472`, from a `git worktree` export with the final two test files copied in, over the three `ImageUploader` files and
  `WarningDialog.enter-scope`: **2 failed, 58 passed (60), exit 1** (`limb5/red-run-cae7472.txt`).
  - "with focus on its URL field runs only what that control does" (`expected { close: +0, setImage: +0, … } to deeply equal
    { close: 1, setImage: 1, … }`).
  - "saves the loaded address on Enter with focus in the box" (`expected [] to deeply equal [ 'https://example.com/a.png' ]`).

  The two refusal cases pass there, because base also refused. The control `enter-ungated` turns them red.
- **Green** at `48c5e87`: the same files, **60 passed (60), exit 0** (`limb5/green-run.txt`).
- **Controls** at `48c5e87`: 23 mutants over the four files, **23 of 23 killed**, exit 0 (`controls/mutation-run-48c5e87.out`,
  `controls/table-48c5e87.md`). New controls:
  - `box-enter-not-requested`: `ImageUploader` passes no form tags;
  - `hook-drops-form-tags`: the hook stops passing them.

  Each kills both Enter-saves cases. The run at `7f0229c` was also 23 of 23.
- **Suite** at `48c5e87`: **2717 passed of 2717, 173 files, exit 0** (`limb5/suite-48c5e87.json`/`.txt`).
- **Typecheck**, both programs, in a `git worktree` export of `48c5e87`: **exit 0** (`limb5/typecheck-export.txt`).
- **Lint**: the four changed files, `eslint --max-warnings=0` with no fix, are clean, `enter-scope` after its fix
  (`limb5/lint-enter-scope.txt`, `limb5/lint-changed-files.txt`).
- **Convention check**: `--since=af3d95a`, **0 FAIL, 0 CANDIDATE**, the same 18 SKIPs, exit 0 (`limb5/convention-check.txt`).
- `git diff --numstat af3d95a 48c5e87`, production paths, added: `ImageUploader.tsx` 33 + `useDialogEnter.ts` 8 = **41**.
- The worktrees were removed (`git worktree list` shows only the shared tree).

## User-visible flows

These are for his check. They cover the image address dialog behind the author avatar, the embed author icon, the embed footer icon, the
embed image and the embed thumbnail.

1. Type or paste an image address. Once the preview appears, Save, or Enter (including with the cursor still in the address box),
   saves that address. While it is still loading, or if it fails, Enter in the box does nothing. Enter in the other dialogs (the
   warning and confirmation prompts) works as before.
2. Type one address, then quickly another. Whatever order they load in, the preview and Save follow the second one.
3. Change a loaded address to something that isn't an image address, or one that doesn't load. The error shows, the preview goes, and
   Save and Enter do nothing. Typing another address takes the error away while that address loads.
4. Delete the address from the box by hand, then Save. The image is removed, the same as Clear then Save.
5. Press Clear while an address is still loading. The box stays empty and no preview comes back.
6. With an image saved, change the address, then Cancel (or click outside or press Escape, where allowed). Reopen the dialog: it shows
   the saved image, and Save keeps it.
7. With no image saved, type an address, then Cancel. Reopen the dialog: the box is empty and Save is off.
8. An image saved earlier that no longer loads: the dialog shows "Image not found.", Save is off, and Clear is available. That still
   holds after Cancel and reopening.
9. Load a message from JSON, or press Reload on "Message Update Detected", so that the avatar changes. Then open the avatar's image
   dialog: it shows the new avatar address, and Save keeps it.

## Handoff

- **SHA**: website `48c5e87` (`Handoff-At`): limb 5 on top of the QA Phase 2 fix round. Earlier hand-offs: `7660259`, `e94baf7`,
  then `cae7472`, whose Round 2 approval is superseded.
- **Reviews**: `code-reviewer-fix-image-uploader-url` at `48c5e87`. Then QA Phase 2's re-run (41 added production lines).
- **Limb 5 delivery**: the code reviewer, by SendMessage, per steering's 17:40Z message and the next-act table.
- **QA fix round delivery**: per the next-act table, the code reviewer, by SendMessage.
- **Round 1 delivery**: the reviewer's rejection came to this session by SendMessage. The fix goes back to it by SendMessage, the
  consuming stage per the next-act table.
- **Delivery**: the brief routes the hand-off through steering. I cue `steering-hooks-fixer` by SendMessage once this document is
  committed, and steering starts the reviewer. Per the brief, no direct send goes to the reviewer.
- **Merge**: devops's step at release, to website `master`. That push deploys to Vercel production, so it needs his release approval.

## Changelog

| Date | Rev | Change |
|---|---|---|
| 2026-11-23T16:35 | 1 | Created. Fix committed on `chain/fix-image-uploader-url` (`cfd3b7f`, `03164d5`, `ee87897`, `7660259`). Red 11 of 14 at `af3d95a`, green 14 of 14, 15 of 15 controls killed. The `eslint --fix` rewrite of 75 files was disclosed and restored. Handed off at `7660259`. |
| 2026-11-23T16:51 | 2 | Code review Round 1 (REJECTED, CR-1, CR-2) fixed at `a8b23ce` and `e94baf7`. The error is derived from `failedImage`, and Save sets `localImage`. Red 3 of 16 at `7660259`, green 40 of 40, 18 of 18 controls killed, suite 2712 of 2712. Re-handed off at `e94baf7`. |
| 2026-11-23T17:29 | 3 | QA Phase 2 fix round. QAF-1: the test host has stable callbacks, and a Cancel-after-Save case was added. QAF-3, ruled in by steering at 17:22Z: the dialog adopts a saved image that changes while it is mounted. CR-2's Save line was made redundant by the sync and removed. Red at `2217a92` and at `e94baf7`, green 42 of 42, 21 of 21 controls killed, suite 2714 of 2714. Flow 1's wording corrected (QAF-2). Re-handed off at `cae7472`. |
| 2026-11-23T17:56 | 4 | Limb 5, his 17:40Z selection: Enter in the address box saves a loaded address. `useDialogEnter` takes an optional form-tag list, passed only by `ImageUploader`. The enter-scope URL-field expectation updated, and that file's two pre-existing `react-hooks/globals` errors fixed (same 21 cases). Red 2 of 60 at `cae7472`, green 60 of 60, 23 of 23 controls killed, suite 2717 of 2717. Re-handed off at `48c5e87`. |
