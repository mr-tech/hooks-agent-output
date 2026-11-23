---
ID: n/a
Origin: fix-image-uploader-url
UUID: 5d9aefc4
Status: Active
Status-Detail: "Handed off at website 7660259 for code review (code-reviewer-fix-image-uploader-url); QA Phase 2 owed (26 production lines added); merge is devops's at release, under the owner's release approval."
Handoff-At: 7660259 — repos=website
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

All evidence is under `verification/fix-image-uploader-url/`.

- **Red run** at `af3d95a`: a `git worktree add --detach` export at `af3d95a` with the 14-case file copied in, then
  `npx vitest run src/components/__tests__/ImageUploader.saved-address.test.tsx`. Result: **11 failed, 3 passed (14), exit 1**
  (`red-run-af3d95a.log`). Each failure is on its literal expectation. The three that pass at base hold base behaviour the fix keeps, and
  each is shown red by a control below:
  - "stays available for a saved address that fails to load…" (`failed-load-clears-preview`);
  - "saves an address that loads on a later try after failing" (`failure-never-forgotten`);
  - "shows no preview and saves nothing on Enter once a failed address is deleted from the box" (`loaded-allows-empty-box`).
- **Green run** at `7660259`: the same command, **14 passed (14), exit 0** (`green-run.log`).
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
  (`suite-base-af3d95a.json`/`.log`). At `7660259`, two runs:
  - Run 1: 2708 passed and 2 failed of 2710, 173 files, exit 1 (`suite-fix-run1.json`/`.log`). The two failures are
    `trpc.batch-refusal.test.ts` ("refuses two calls with a bad-request status…") and `messageValidity.predicate.test.ts` ("parity by
    construction…"). Each ran about 5,000 ms, vitest's default case timeout, at load average 30 to 33 (`uptime`, 16:32Z). Neither file
    imports `ImageUploader` (`grep -c`, 0 each). Not investigated further.
  - Run 2: **2710 passed of 2710, 173 files, exit 0** (`suite-fix.json`/`.log`). Against base that is 14 more cases and one more file.
    Compared by path membership, the one added file is `ImageUploader.saved-address.test.tsx` and no base file is missing.
- **Build verification.** The workspace names none beyond the typecheck: no `verify-pinned-build.sh`, and no package-manager operation
  was run. `pnpm run typecheck` (both `tsc` programs) in a `git worktree` export of `7660259`, with the untracked `next-env.d.ts` copied
  in: **exit 0** (`typecheck-export.log`). In the shared tree the same script exits 2 on
  `.next/types/validator.ts(227,39): Cannot find module '../../src/pages/api/cron.js'`. That is a build artifact `.gitignore` ignores,
  pointing at a file the repository no longer has. My change does not touch it.
- **Lint.**
  - `npx eslint --max-warnings=0` (no fix) over the two changed files: **exit 0** (`lint-changed-files.log`).
  - `node ~/.claude/tools/convention-check.js website --since=af3d95a`: **0 FAIL, 0 CANDIDATE**, exit 0 (`convention-check.log`). It
    covers the comment gate, test naming, fixed waits and eslint `--no-fix`. It logged 18 SKIPs:
    - 17 are `.playwright-mcp/*.png`, untracked files that are not this chain's.
    - 1 is its ID-token and basename check, which did not run ("states an ID-token class this checker does not implement verbatim"). I
      checked by hand instead. The workspace's ID-token regex over the test file matched nothing (`grep` exit 1), and the basename
      matches the positive form (`grep -c` 1).
  - **Disclosed in this round: the repository's lint script is `eslint --fix . --max-warnings=0`.** I ran it once as `pnpm run lint` in
    the shared tree, before the first commit. It exited 1 (557 problems, 247 errors, repo-wide, `lint.log`), and its autofix rewrote 75 files outside
    my write set. I checked that every one of the 75 was byte-identical to eslint's own `--fix` output from that file's `HEAD` content
    (reproduced in a detached export, 75 of 75 identical). Then I re-checked each file just before restoring it with
    `git show HEAD:<path> > <path>`: 75 restored, 0 skipped. `git status` afterwards showed only my two paths and the pre-existing
    `.playwright-mcp/`. No other session's work was in those files. The repo-wide lint count at base was not measured, so whether the
    557 are pre-existing is not established here. The two changed files are clean.
- **Exports.** I set up the worktrees `scratchpad/base` and `scratchpad/tip`, and the mutation runner's `scratchpad/mwork`. All were
  removed: `git worktree list` shows only the shared tree and one worktree belonging to another session.

## User-visible flows

These are for his check. They cover the image address dialog behind the author avatar, the embed author icon, the embed footer icon, the
embed image and the embed thumbnail.

1. Type or paste an image address. Save and Enter work once the preview appears, and they save that address.
2. Type one address, then quickly another. Whatever order they load in, the preview and Save follow the second one.
3. Change a loaded address to something that isn't an image address, or one that doesn't load. The error shows, the preview goes, and
   Save and Enter do nothing.
4. Delete the address from the box by hand, then Save. The image is removed, the same as Clear then Save.
5. Press Clear while an address is still loading. The box stays empty and no preview comes back.
6. With an image saved, change the address, then Cancel (or click outside or press Escape, where allowed). Reopen the dialog: it shows
   the saved image, and Save keeps it.
7. With no image saved, type an address, then Cancel. Reopen the dialog: the box is empty and Save is off.
8. An image saved earlier that no longer loads: the dialog shows "Image not found.", Save is off, and Clear is available.

## Handoff

- **SHA**: website `7660259` (`Handoff-At`).
- **Reviews**: `code-reviewer-fix-image-uploader-url`, at `7660259`. Then QA Phase 2, which is owed at 26 added production lines.
- **Delivery**: the brief routes the hand-off through steering. I cue `steering-hooks-fixer` by SendMessage once this document is
  committed, and steering starts the reviewer. Per the brief, no direct send goes to the reviewer.
- **Merge**: devops's step at release, to website `master`. That push deploys to Vercel production, so it needs his release approval.

## Changelog

| Date | Rev | Change |
|---|---|---|
| 2026-11-23T16:35 | 1 | Created. Fix committed on `chain/fix-image-uploader-url` (`cfd3b7f`, `03164d5`, `ee87897`, `7660259`). Red 11 of 14 at `af3d95a`, green 14 of 14, 15 of 15 controls killed. The `eslint --fix` rewrite of 75 files was disclosed and restored. Handed off at `7660259`. |
