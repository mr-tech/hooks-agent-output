---
ID: n/a
Origin: fix-image-uploader-url
UUID: 5d9aefc4
Verified-At: 5ec0621 — repos=website
Status: Committed
Status-Detail: "Phase 2 PASS at website 5ec0621 (limbs 1 to 5) carried to the commit: chain committed on chain/fix-image-uploader-url at 5ec0621 (Stage 1, 2026-11-23T18:33Z). No open finding, no register rows. Its last Assumption Not Checked (the production build) is carried by deployment/fix-image-uploader-url-deployment.md, the post-release walk."
Phase: 2
---

# QA Report: fix-image-uploader-url

**Plan Reference**: none (fixer route). Scope: `steering/fix-image-uploader-url-rulings.md`, block "2026-11-23T15:54Z" (Scope statement), with
block "2026-11-23T17:05Z" (CR-3 ruled inside limb 1). Brief: `steering/fix-image-uploader-url-brief-qa.md`, with `-brief-common.md`.
**Gate documents**: `implementation/fix-image-uploader-url-implementation.md` (record `9a33daa2`, `Handoff-At: e94baf7`);
`code-review/fix-image-uploader-url-code-review.md` (record `c559d303`, Round 1 sub-entry APPROVED, `Reviewed-At: e94baf7`).
**Evidence**: `verification/fix-image-uploader-url/qa/`.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T17:19 | steering-hooks-fixer (brief 17:05Z) | Phase 2 at website `e94baf7` | Phase 2. QA Failed. Red re-run at `af3d95a`: 14 of 16 cases failed. Green at the tip: 40 of 40. Suite: 2712 of 2712, exit 0 (second run). Typecheck exit 0. Sweep: 36 of 38 killed. QAF-1 MEDIUM: a Cancel mutant survives the suite and is killed by a QA probe. Browser walk of flows 1, 3 and 8 on a local build: flows 3 and 8 hold. Flow 1's Enter step fails (QAF-2 LOW, the behaviour was already so at base). QAF-3 INFO is pre-existing residue. |
| 2026-11-23T18:12 | steering-hooks-fixer (message of 18:0xZ) | Phase 2 re-run at website `48c5e87` (limbs 1 to 4 plus limb 5) | Phase 2. QA Failed on QAF-4 MEDIUM, a test gap on a saved image that changes while the dialog is open. QAF-1, QAF-2 and QAF-3 are resolved. Red at `e94baf7` with the tip's tests: 3 of 60 failed. Green: 60 of 60. Suite: 2717 of 2717, exit 0. Typecheck exit 0. Sweep of this round: 10 of 13 killed; two survivors are equivalent and one is QAF-4. The shared-hook differential is unchanged for the other two dialogs. Walk of flows 1 and 9: every step passes. See "Phase 2 re-run at `48c5e87`". |
| 2026-11-23T18:24 | steering-hooks-fixer (message of 18:2xZ) | Phase 2 re-run at website `5ec0621` (QAF-4, test-only) | Phase 2. **QA Complete (PASS).** Production is byte-identical to `48c5e87`. The new case kills `qa-sync-only-when-closed` and is the only case it reddens. Green: 61 of 61. Suite: 2718 of 2718, exit 0. Typecheck exit 0. The owed walk passes: a JSON load to a 404 address, and Reload while the dialog is open. See "Phase 2 re-run at `5ec0621`". |
| 2026-11-23T18:33 | devops-fix-image-uploader-url (Stage 1) | Close at the chain's commit | Status Committed; `Verified-At: 5ec0621` carried into the commit record. The Phase 2 verdict covers the release tip (the tip is the verified commit). Document closed. |

## Scope of this pass

This is a fixer chain, so there is no Phase 1 and no plan (the owner's selection: brief, `Duties negated: Phase 1`). No UAT follows, so an item
for UAT would go to steering as a block. No irreversible effect is touched (the component writes nothing; its only output is the value it
hands `setImage`, read at `ImageUploader.tsx` `onSetImage`), so no Irreversible Side-Effect Register is owed.

**Criteria this pass assesses**, fixed before executing anything. The scope statement's four limbs:
1. Save and Enter commit exactly the address the box shows, and only once that address has loaded. CR-3 is ruled inside this limb: Enter
   on an emptied box does nothing.
2. An address that fails the check, by format or by load, cannot be saved.
3. A slower, earlier check never overwrites a later one, and none lands after Clear.
4. Cancel puts the box and the preview back to the saved image, with or without one saved, and reopening shows the saved image.

**Input classes.** Each limb names a class, not an example. This is how the class was enumerated:
- Limb 1, "the address the box shows": a loaded address; a loading one; an invalid one; one that failed to load; an empty box with and without
  a saved image; a box whose earlier check lands late. Each has a case in `ImageUploader.saved-address.test.tsx`.
- Limb 2, "by format or by load": both members. One `it.each` covers both, and walk steps 3a and 3b cover both in a real browser.
- Limb 3, the events that move the box during a check: typing (F2), Clear (F3) and Cancel. Each has a case.
- Limb 4, "with or without one saved": both members have cases. "The saved image" is whatever was saved last, and that includes a Save made
  earlier in the same mounted lifetime. That member has no case under the consumers' callback shape: **QAF-1**.

**TDD gate.** On a fixer chain the evidence is the fixer document's Test section, which carries a red run (`red-run-af3d95a.txt`,
`round1/red-run-7660259.txt`) and a green run. It is present, so the gate passes. I re-ran both myself (below).

## Implementation Review

`git diff --numstat af3d95a e94baf7`: `src/components/ImageUploader.tsx` 27 added and 18 removed. The new test file is
`src/components/__tests__/ImageUploader.saved-address.test.tsx`. The diff touches no other path.
Blobs at `e94baf7`: `ImageUploader.tsx` `24095be4`, the test file `9bb50ca7`. Each export was checked with `git hash-object` against
`git rev-parse e94baf7:<path>`.

**Test audit against the workspace conventions.**
- The basename is in the positive form.
- Titles are spec-form, and none carries an ID token.
- Expectations are literals.
- No timer, no source-text read and no hand-rolled renderer. The DOM harness is used.
- `FakeImage` is an invented environment value, named by the fixer under Iron Law 5 with its two blind spots: width 0, and a load that never
  settles. Real loads are covered here by the walk.
- One fidelity gap: the test `Host` builds `onClose` and `setImage` as new arrow functions on every render. All five consumers pass stable
  callbacks:
  - `Author.tsx`: `setImage` is a `useCallback`, and `unsetShowImageUpload` comes from `useToggleState`.
  - `EmbedThumbnail.tsx`: an inline `useCallback`.
  - The other three pass `setImageCallback` or `setImage` with `setHideImageUpload`.
  
  `react-hooks/exhaustive-deps` is `'off'` in `eslint.config.mjs`. So the dependency arrays of `onSetImage` and `onCancel` matter in
  production, and the saved-address file cannot see them. That gap is QAF-1.

## Test Execution Results

Every run below was network-isolated (`unshare -rn`) in a `git archive` export of its SHA, with `node_modules` symlinked and
`next-env.d.ts` copied in.

| Run | Command | Result | Capture |
|---|---|---|---|
| Red at `af3d95a`, with the tip's 16-case file copied in | `npx vitest run src/components/__tests__/ImageUploader.saved-address.test.tsx` | 14 failed, 2 passed (16), exit 1. Each failure is an `AssertionError` on a literal: 13 blocks, and the `it.each` pair shares one | `verification/fix-image-uploader-url/qa/red-run-af3d95a.txt` |
| Green at `e94baf7`, the three `ImageUploader` files | `npx vitest run` on the three | 40 passed (40), exit 0 | `verification/fix-image-uploader-url/qa/green-run-e94baf7.txt` |
| Suite at `e94baf7`, loopback down | `npx vitest run --reporter=json` | 2697 of 2712 passed, exit 1. **Instrument fault, not a result**: three files that open loopback listeners failed because `unshare -rn` leaves `lo` down | `verification/fix-image-uploader-url/qa/suite-e94baf7-lo-down.json`/`.txt` |
| Suite at `e94baf7`, run 1, with `ip link set lo up` | the same | 2711 of 2712 passed, exit 1. The failure: `trpc.batch-refusal.test.ts` "refuses two calls…" timed out at 5007 ms with load average 33. The diff has no `src/server` path. The file passed 2 of 2, exit 0, three times alone | `verification/fix-image-uploader-url/qa/suite-e94baf7.json`/`.txt`, `verification/fix-image-uploader-url/qa/batch-refusal-rerun-{1,2,3}.txt` |
| Suite at `e94baf7`, run 2 | the same | **2712 of 2712 passed, 173 files, exit 0** | `verification/fix-image-uploader-url/qa/suite-e94baf7-run2.json`/`.txt` |
| Typecheck at `e94baf7` | `pnpm run typecheck` (both `tsc` programs) | exit 0 | `verification/fix-image-uploader-url/qa/typecheck-e94baf7.txt` |

**File membership.** Compared by path, the suite's 173 `testResults` against base's 172 (`suite-base-af3d95a.json`) add only
`src/components/__tests__/ImageUploader.saved-address.test.tsx`, and none is missing.

### Mutation sweep

- **Range and files.** `af3d95a..e94baf7`, production paths only, which is `src/components/ImageUploader.tsx`. The test file was skipped by
  the generator.
- **Set.** 38 mutants in `verification/fix-image-uploader-url/qa/sweep/mutants.json` (blob `21266cb3`):
  - 20 are from `node ~/.claude/tools/mutant-gen.js --range af3d95a..e94baf7`, which uses operator mutants on added lines and excludes `??`,
    `?.` and `=>` (`verification/fix-image-uploader-url/qa/sweep/mutants-gen.json`).
  - 18 are mine (`verification/fix-image-uploader-url/qa/sweep/mutants-qa.json`): conjunct drops for `loaded` and the error condition, so each conjunct carries the decision
    alone; both arms of the Save rule; each state write in Save, Cancel and the check effect; the effect's dependency; both `useCallback`
    dependency arrays; Enter never armed; and the preview on `localImage`.
  - A 19th mutant of mine, on the `current` guard, was dropped before the run because it is equivalent by construction: the closure's
    `imageInput` is never empty there.
- **Run.** A helper ran `mutation-run.py --sha e94baf7 --dep node_modules --timeout 240` over the three `ImageUploader` files, with the
  `__dirname` config transcribed per the runner's stated limit. The control passed with 40 tests.
- **Result.** 36 of 38 mutants killed, stillborn 0, aborted 0, exit 0 (`verification/fix-image-uploader-url/qa/sweep/mutation-run-e94baf7.out`, table
  `verification/fix-image-uploader-url/qa/sweep/mutation-table-e94baf7…-p933117.json`, summary `verification/fix-image-uploader-url/qa/sweep/table-e94baf7.md`).

Survivors:
- `ImageUploader.tsx:77:if-false` (an empty box still runs the check, which resolves false and sets `failedImage` to `''`): **equivalent
  for every limb**. The only reachable difference is this: a failed address is deleted and then typed again, and while its re-check is
  pending, "Image not found." is missing. `loaded` and the Save rule both still read `imageInput !== ''`, and the re-check restores the same
  state. No committed value moves. No change is owed.
- `qa-cancel-deps-stale` (`}, [image, onClose]);` → `}, [onClose]);`): **QAF-1**. Probe P2 kills it.

## Browser walk (the review's Assumption Not Checked)

- **Build.**
  - A `git archive` export of `e94baf7` (component blob `24095be4`).
  - `pnpm install --frozen-lockfile --offline`, exit 0 (`verification/fix-image-uploader-url/qa/walk/install.txt`).
  - `.env.local` symlinked. I read only key names and URL hosts: `NEXTAUTH_URL` and `DATABASE_URL` are loopback.
  - `next dev -H 127.0.0.1 -p 3000`.
- **Database.** `tools/uat-local-stack.sh up` reported next message id 900000000000001 (`verification/fix-image-uploader-url/qa/walk/local-stack-up.txt`). The walk wrote
  message **900000000000001** only, through `/message/m/new` and the editor's save. Its Pusher channel is outside production's id range.
- **Images.** A loopback image server on 127.0.0.1:8765 with `Cache-Control: no-store` served three 96×96 PNGs. Any other path answered
  404.
- **Who walked it.** A `browser-walker` helper signed in as the test account (consent page only, no challenge). This session's browser
  stayed closed. Evidence: `verification/fix-image-uploader-url/qa/walk/evidence/*.json`, 21 files.

| Flow | Steps | Result |
|---|---|---|
| 1 | 1a: typing `red.png` gives the preview and enables Save. 1c: `blue.png` then Save sets the avatar to `blue.png` | PASS |
| 1 | 1b: **Enter with focus in the box** | **FAIL against flow 1's wording**: the dialog stays open and the avatar is unchanged. This is QAF-2, and it was already so at base |
| 3 | 3a: `not an image` shows "Invalid url.", with no preview and Save off; Enter does nothing. 3b: `missing.png` shows "Image not found.", Save off; Enter does nothing. 3c: `red.png` clears the error; Cancel keeps the avatar on `blue.png`; reopening shows `blue.png` | PASS |
| 8 | Save `saved.png` and save the message; rename the file (curl gives 404); reload. The dialog shows `saved.png`, "Image not found.", no preview, Save off, Clear on. Cancel unedited and reopen: the same. Escape closes the dialog | PASS |

Not run: 1c's reopen, because 1b left the dialog open. 3a covers the same reopen. 8b's "saved" indication was not observed, but the reload at
8d read the stored `saved.png`, so the save happened.

**Set up and removed.**
- `next dev` (process group 972705) and the image server (process group 985895) were stopped. `ps` shows neither pid, and 3000 and 8765
  are not listening.
- The container `hooks-postgres-local` was removed (`verification/fix-image-uploader-url/qa/walk/local-stack-down.txt`, exit 0).
- The exports `tip`, `base` and `walk`, the image folder and the runner's empty `mwork` were deleted after a `/proc` cwd check.
- The helper closed the browser and emptied its caches.
- The shared tree is still at `e94baf7`, with nothing added under `.playwright-mcp/` since 17:05Z.

## Probe

`verification/fix-image-uploader-url/qa/probes/ImageUploader.qa-probe.test.tsx` is a probe, not a suite file. It mounts the real component under a host with **stable**
`onClose` and `setImage`, as the consumers have. Runs: `probe-run-tip.txt`, `probe-run-base.txt` and `probe-run-cancel-deps-mutant.txt`.

| Case | `af3d95a` | `e94baf7` | `e94baf7` + `qa-cancel-deps-stale` |
|---|---|---|---|
| P1: Save commits the address typed last | pass | pass | pass |
| P2: Cancel after a Save puts the box back to the address saved last | fail (`b.png`, expected `a.png`) | pass | **fail** (`x.png`, expected `a.png`) |
| P3: a saved image changed elsewhere while the dialog is closed is shown on reopen | fail | fail | fail |

Under the mutant, the 40 suite cases all pass (the same run: 41 passed of 43, and the two failures are P2 and P3).

## Findings

Dispositions at the `48c5e87` re-run:

QAF-1 MEDIUM Phase 2 RESOLVED — the case "puts the box back to the image saved in this dialog, not the one it opened with" uses a stable-callback host and kills `qa-cancel-deps-stale` at `48c5e87` (`verification/fix-image-uploader-url/qa/rerun-48c5e87/sweep/table-48c5e87.md`).
QAF-2 LOW Phase 2 RESOLVED — his selection made it limb 5 (rulings block "2026-11-23T17:40Z"). Enter in the box saves, at `48c5e87`. Flow 1 is reworded, and walk steps 1a to 1e pass.
QAF-3 INFO Phase 2 RESOLVED — ruled in scope under limb 4 (rulings block "2026-11-23T17:22Z") and fixed by the `shownImage` sync. Probe P3 passes at `48c5e87`, and walk steps 9a and 9b pass.

The argument below is this pass's record at `e94baf7`, kept so its own verdict can still be read.

QAF-1 MEDIUM Phase 2 (at e94baf7)
- **What**: Cancel's reset to the current saved image (`onCancel`, `setImageInput(image)` / `setLocalImage(image)` with dependencies
  `[image, onClose]`) has no assertion that fails when the dependency on `image` is lost.
- **Failure scenario**: suppose `image` is dropped from `onCancel`'s dependencies. The consumers' callbacks are stable, so `onCancel` keeps
  the `image` of its first render. Save A over a saved X, reopen, type B, Cancel, reopen: the box shows X, not A, and Save re-commits X. That
  breaks limb 4 and, through it, limb 1's "the address the box shows" as the user last saved it. The suite stays 40 of 40 green, and P2
  fails.
- **Why it blocks**: limb 4 relies on this behaviour, and nothing fails when it is lost (severity floor, qa.md). Lint does not hold it:
  `react-hooks/exhaustive-deps` is `'off'`.
- **Required** (test-only; the shipped code is correct): a spec-form case on the Cancel surface in
  `ImageUploader.saved-address.test.tsx`, for example "puts the box back to the address saved last when cancelled after a Save", mounted
  under a host whose `onClose` and `setImage` are stable, as all five consumers' are. The simplest form makes the existing `Host`'s
  callbacks `useCallback`s. It is seen red under `}, [image, onClose]);` → `}, [onClose]);` and green at the tip. Every existing case stays
  green under the stable host. The sibling `qa-save-deps-stale` is killed today only by `ImageUploader.enter-scope` (stable `vi.fn`s).

QAF-2 LOW Phase 2
- **What**: User-visible flow 1 in the implementation document says "Save and Enter work once the preview appears". With focus in the box,
  which is the ordinary case, Enter does nothing.
- **Mechanism**: `useDialogEnter` uses `useHotkeys(['enter'], …, { enabled })`. react-hotkeys-hook 5.2.4 drops a key event from a form
  tag unless `enableOnFormTags` is set (`dist/index.js`, the `p` handler's form-tag check). `useDialogEnter.ts` and the lockfile are
  unchanged between `af3d95a` and `e94baf7` (`git diff --stat`, empty), so base behaved the same.
- **Effect**: no wrong value is committed, so limbs 1 and 2 hold. Enter works with focus on the dialog element, which is what
  `ImageUploader.enter-scope` drives.
- **Required**: correct flow 1's wording in the implementation document (the fixer's). Whether Enter in the box should save is a product
  question and outside this scope. It goes to steering as information, not as a block.

QAF-3 INFO Phase 2
- **What**: the dialog is always mounted, and it does not pick up a saved image that changes by another path while it is closed. Reopening
  shows the old address (probe P3).
- **Scope**: this fails at base and at the tip. It is outside the scope statement: "behaviour on a real remount" and the parents' wiring
  are listed as not covered.
- **Carrier**: steering, as a candidate (see Assumption Not Checked).

## Blocking-condition register

No rows. The fixer route has no plan validation lines. The one operator-free check routed here, the review's browser walk, was executed in
this pass, not handed on. The defect's source is an internal evaluation (`research/codebase-bug-evaluation-2026-11-08.md:174`), not a user
report, so no post-deploy distinguishing row is owed. Later stage documents are authoritative on anything added after this pass.

## Assumption Not Checked

This pass assumes that no path in the editor changes a consumer's saved image (avatar, author icon, footer icon, embed image, thumbnail)
while that consumer's dialog stays mounted, other than the dialog's own Save, and it does not test this. Candidate paths are a JSON edit, an
import, or a reload after "Message Update Detected".
- **Signature of falsity**: after such a change, reopening the dialog shows the previous address, and Save re-commits it. Probe P3 shows
  the component does this whenever `image` moves underneath it.
- **Owner**: `steering-hooks-fixer`. Whether it opens work is a scope decision.

## Verdict at `e94baf7` (superseded by the re-run below)

**QA Failed** at website `e94baf7`, on QAF-1. The shipped behaviour is correct on every criterion this pass ran: limbs 1 to 4 in the suite
and the probe, and flows 3 and 8 in a real browser. The failure is a missing assertion. The remedy is test-only, so it adds no production
lines. The re-run after it covers that round's diff alone: the new case seen red under `qa-cancel-deps-stale` and green at the new tip, the
survivor re-run, and the suite.
Recommended next: the fixer (`fixer-fix-image-uploader-url`) for QAF-1 and QAF-2's document correction, then QA Phase 2 again on the new SHA.

## Phase 2 re-run at `48c5e87`

**Start.** Steering's message (18:0xZ) names the gate anchors. I re-derived them at the record:
- the implementation document's `Handoff-At: 48c5e87` (record `74ffd334`);
- the code review's `Reviewed-At: 48c5e87`, `Round: 3`, `Verdict: APPROVED` (record `7a09246a`, read from its header).

The shared tree's `git rev-parse HEAD` printed `48c5e87eda2b…` at the start and at the end.
Rulings read: block "2026-11-23T17:22Z" (QAF-3 in scope under limb 4) and block "2026-11-23T17:40Z" (his selection, limb 5).

**Criteria this pass assesses**, fixed before executing anything: limbs 1 to 4 (above), with limb 4 now including a saved image that changed
while the dialog was closed (QAF-3's ruling), and limb 5: in the image address dialog, Enter with focus in the address box commits as Save
does, under limbs 1 and 2's conditions; `useDialogEnter` is shared, and the other dialogs' behaviour stays as it is.
- Limb 5's members: loaded saves; still loading, failed by load, failed by format and emptied box do nothing. The suite cases loaded,
  loading and failed-by-load. Walk steps 1a to 1e cover all five in a real browser.
- The other callers: `git grep -n useDialogEnter 48c5e87 -- src`, excluding tests, gives `ConfirmationDialog` and `WarningDialog`, plus
  `ImageUploader`. Each is in the differential below.

**Round diff.** `e94baf7..48c5e87` (`2217a92`, `b97f79c`, `cae7472`, `7f0229c`, `96fb1f8`, `48c5e87`), production paths only:
`src/components/ImageUploader.tsx` (the `shownImage` sync during render, `onSetImage`'s `setLocalImage` removed, `['input']` passed to the
hook) and `src/utils/hooks/useDialogEnter.ts` (an optional `enableOnFormTags` passed to `useHotkeys`). `git diff --numstat af3d95a
48c5e87` gives 33 + 8 production lines added. Blobs at `48c5e87`: `ImageUploader.tsx` `709efa13`, `useDialogEnter.ts` `928469c4`,
`ImageUploader.saved-address.test.tsx` `2be20678`, `ImageUploader.enter-scope.test.tsx` `44051b35`. Each export was checked against
`git rev-parse`.

**TDD gate.** The fixer document's "QA Phase 2 fix round" and "Limb 5" sections carry red runs (`qa-round1/red-run-2217a92.txt`,
`limb5/red-run-cae7472.txt`) and green runs. The gate passes, and I re-ran both below.

**Test audit of the round's test changes.**
- `saved-address`: the `Host` now passes `useCallback` callbacks (QAF-1's remedy). New cases:
  - "puts the box back to the image saved in this dialog, not the one it opened with";
  - "shows that image on reopening, and saves it", whose host replaces `image` through a hidden button;
  - "saves the loaded address on Enter with focus in the box";
  - an `it.each`, "saves nothing on Enter in the box while its address %s".
  
  Each Enter case asserts that focus is in the box before a real `keydown`. Expectations are literals.
- `enter-scope`: the URL-field row changes from nothing to `{ close: 1, setImage: 1 }`, as the ruling names. The module-level
  reassignments became hidden host buttons.
- A naming check over the round's added titles: no ID token and no comment lines (the reviewer's `grep -c`, both 0; the convention check,
  0 FAIL). No time-based cell.
- The Enter-in-box refusal for a format failure has no suite case. It goes through the same `loaded` gate as the load failure (no
  expression in the component tells format from load: `failedImage` records both). Walk step 1b covers it in a real browser.
- One gap: QAF-4.

Every run below was network-isolated (`unshare -rn`, loopback brought up for the full suite) in a `git archive` export, under
`verification/fix-image-uploader-url/qa/rerun-48c5e87/`.

| Run | Result | Capture |
|---|---|---|
| Red: `e94baf7` with the tip's two `ImageUploader` test files, over the three `ImageUploader` files and `WarningDialog.enter-scope` | 3 failed, 57 passed (60), exit 1. Each failure is an `AssertionError` on a literal: the URL-field Enter row (`{ close: +0, setImage: +0 … }` against `{ close: 1, setImage: 1 … }`); Enter in the box (`[]` against `[ a.png ]`); and the replaced image on reopen (`x.png` against `z.png`). The QAF-1 case passes there, because the behaviour was already right; the sweep shows it red under its mutant | `red-run-e94baf7.txt` |
| Green at `48c5e87`, the same four files | 60 passed (60), exit 0 | `green-run-48c5e87.txt` |
| Full suite at `48c5e87` | **2717 of 2717 passed, 173 files, exit 0** | `suite-48c5e87.json`/`.txt` |
| Typecheck at `48c5e87` (both programs) | exit 0 | `typecheck-48c5e87.txt` |
| My `e94baf7` probe (P1 to P3, stable host) at `48c5e87` | 3 passed, exit 0. P3, QAF-3's case, now passes | `probes/probe-run-48c5e87.txt` |

**Shared-hook differential** (`probes/dialog-enter.qa-differential.test.tsx`, not a suite file). It mounts the real `WarningDialog`, the
real `ConfirmationDialog` (through `ConfirmationProvider`) and the real `ImageUploader`, and records per scenario how often each answered.
The same file ran at `e94baf7` and at `48c5e87`. Outputs: `probes/differential-prev.json` and `probes/differential-tip.json`. Runs:
`probes/differential-run-{prev,tip}.txt`, both exit 0.

| Scenario | `e94baf7` | `48c5e87` |
|---|---|---|
| Warning: Enter with focus on the dialog's text | confirm 1 | confirm 1 |
| Warning: Enter in an `<input>` injected into the dialog | 0 | 0 |
| Warning: Enter on Cancel | close 1, confirm 0 | close 1, confirm 0 |
| Confirmation: Enter with focus on the dialog's text | confirm 1 | confirm 1 |
| Confirmation: Enter in an injected `<input>` | 0 | 0 |
| Image dialog, Enter in the box with a loaded address (positive control) | close 0, setImage 0 | **close 1, setImage 1** |

`diff` of the two outputs differs only in the positive control's row. So the instrument sees a difference where one exists, and the other
two dialogs are unchanged, including the form-field path that the new option governs.

**Mutation sweep, this round only.**
- **Range and files.** `e94baf7..48c5e87`, production paths: `src/components/ImageUploader.tsx` and `src/utils/hooks/useDialogEnter.ts`.
- **Set.** 13 mutants in `rerun-48c5e87/sweep/mutants.json` (blob `c9847d9f`):
  - 3 from `mutant-gen.js --range e94baf7..48c5e87`, which uses operator mutants on added lines (`mutants-gen.json`);
  - 9 of mine (`mutants-qa.json`): each write of the sync, the sync never recording, the sync only when closed (coupling with `isOpen`),
    the box not asking for form tags, asking for every tag, the hook dropping the option, and the hook defaulting it on for every caller;
  - the round's closing survivor, `qa-cancel-deps-stale`, re-run.
- **Run.** A helper ran `mutation-run.py --sha 48c5e87 --dep node_modules --timeout 240` over the three `ImageUploader` files and
  `WarningDialog.enter-scope`. The control passed with 60 tests.
- **Result.** 10 of 13 mutants killed, stillborn 0, aborted 0, exit 0 (`sweep/mutation-run-48c5e87.out`, table `sweep/table-48c5e87.md`).
  `qa-cancel-deps-stale` is KILLED, which closes QAF-1.

Survivors:
- `qa-enter-tags-all` (`['input']` → `true`): **equivalent**. The dialog renders one form field, an `<input>`, and no `<textarea>` or
  `<select>` (`grep -c -E "<textarea|<select"` over `ImageUploader.tsx`, `TextField.tsx` and `PresetDialog.tsx` at `48c5e87`: 0 each).
- `qa-hook-tags-default-on` (the hook passes `enableOnFormTags ?? true` for every caller): **equivalent for the callers that exist**.
  Neither `WarningDialog` nor `ConfirmationDialog` renders a form field, and `ConfirmationProps.message` is a `string`. The differential's
  injected-input rows are the instrument that would see it, and they read 0 at both trees.
- `qa-sync-only-when-closed` (`if (shownImage !== image && !isOpen)`): **QAF-4**.

**Browser walk** (Assumptions Not Checked of review Rounds 2 and 3: flows 1 and 9).
- **Build.**
  - A `git archive` export of `48c5e87` (blobs as above).
  - `pnpm install --frozen-lockfile --offline`, exit 0 (`walk/install.txt`).
  - `.env.local` symlinked (key names and hosts only).
  - `next dev -H 127.0.0.1 -p 3000`.
- **Database.** `tools/uat-local-stack.sh up` reported next message id 900000000000001 (`walk/local-stack-up.txt`). The walk wrote only
  message **900000000000001**, in two tabs. Its Pusher channel is outside production's id range.
- **Images.** A loopback `no-store` image server on port 8765.
- **Who walked it.** A `browser-walker` helper signed in as the test account (consent page only). It waited a minute for another session
  to release the profile. Evidence: `walk/evidence/*.json`, 24 files.

| Step | Observed | Result |
|---|---|---|
| 1a | Focus in the box, `red.png` loaded: Enter closes the dialog, and the avatar is `red.png` | PASS |
| 1b, 1c | `not an image` ("Invalid url.") and `missing.png` ("Image not found."): focus in the box, Enter leaves the dialog open, and the avatar is unchanged | PASS |
| 1d | Emptied box with an image saved: Save is enabled, Enter in the box does nothing (CR-3's ruling), and the avatar is unchanged | PASS |
| 1e | `blue.png`: Enter in the box saves it | PASS |
| 9a | Edit, then JSON: `avatar_url` set to `json.png`, then Load, then "Are you sure?", then Load. The avatar is `json.png`; the dialog opens on `json.png` with its preview, and Save keeps it | PASS |
| 9b | Message saved; tab B sets `pusher.png` and saves. Tab A shows "Message Update Detected", then Reload; the avatar is `pusher.png`. The dialog opens on `pusher.png`, and Save keeps it | PASS |

The walk never had the dialog open while the update arrived. That case is QAF-4, run in the probe below.

**Probe P4** (`rerun-48c5e87/probes/ImageUploader.qa-probe-open.test.tsx`, the stable host of the first probe plus one case). With the
dialog open on a loaded X, the saved image becomes Z. The case asserts that the box shows Z and that Save commits Z.
- At `48c5e87`: 1 passed, exit 0 (`probe-open-run-48c5e87.txt`).
- Under `qa-sync-only-when-closed`: 1 failed, `expected 'https://example.com/x.png' to be 'https://example.com/z.png'`, exit 1
  (`probe-open-run-sync-only-when-closed.txt`).

**Findings.**

QAF-4 MEDIUM Phase 2
- **What**: the sync's reach to a dialog that is **open** when the saved image changes has no assertion that fails when it is lost. The
  implementation document claims the behaviour (Limb 4 fix, QAF-3: "A change that arrives while the dialog is open replaces the box in
  the same way").
- **Reachability** (read at `48c5e87`): `usePusher.ts`'s `message-update` handler calls `showConfirmation` with nothing that checks for an
  open dialog. The prompt therefore opens over the avatar dialog, which `ImageUploader.enter-scope` itself raises in that overlap. Its
  Reload replaces `avatar_url` while the dialog is open.
- **Failure scenario under the surviving mutant**: the box keeps the pre-reload address, and Save writes it back over the reloaded message.
  That is the class QAF-3's ruling put in limb 4. The suite stays 60 of 60 green, and P4 fails.
- **Required** (test-only; the shipped code is correct): a spec-form case in `ImageUploader.saved-address.test.tsx`, for example "follows
  an image saved by another path while the dialog is open, and saves it", using the existing `data-replace` host button with the dialog
  left open. It is seen red under `if (shownImage !== image) {` → `if (shownImage !== image && !isOpen) {` and green at the tip.

**Blocking-condition register.** No rows, for the same reason as at `e94baf7`. Flows 1 and 9, which the reviews routed here, were walked in
this pass and not handed on.

**Set up and removed.**
- `next dev` (process group 1792401) and the image server (process group 1792406) were stopped. `ps` shows none of their pids, and 3000
  and 8765 are not listening.
- The container `hooks-postgres-local` was removed (`walk/local-stack-down.txt`, exit 0).
- The exports `tip`, `prev` and `walk`, the image folder, the runner's `mwork` (empty) and the helper's launcher files were deleted after
  a `/proc` cwd check.
- The helper closed the browser and emptied its caches.
- The shared tree is still at `48c5e87`, with no `vitest.transcribed.config.ts` left behind.

**Disclosed in this round.** The stamp gate (a PostToolUse hook) refused my first write of this pass's changelog row, because I typed
18:12 while the clock read 18:11Z. I re-read `date -u` (18:12) before the row stood, and the gate accepted it. I changed no other text for
it.

**Assumption Not Checked.** This pass assumes that a real image load started by the sync, when the saved image changes underneath an open
or closed dialog, settles the same way as one started by typing, and it does not test this (the walk's 9a and 9b loaded fast, local, good
images only). Signature of falsity: after a JSON load or a Reload that sets an address that no longer loads, the reopened dialog shows the
preview and enables Save instead of "Image not found.". Owner: QA, at the next pass, by walking a JSON load to a 404 address. That takes a
build, so it is not a run of under a minute.

**Verdict.** **QA Failed** at website `48c5e87`, on QAF-4. Limbs 1 to 5 hold on every instrument run: suite, probes, differential and
walk. The failure is a missing assertion on a behaviour the change claims. The remedy is test-only. The re-run after it covers that round
alone: the new case seen red under `qa-sync-only-when-closed` and green at the new tip, that survivor re-run, the suite, and the next
pass's Assumption Not Checked walk (above).
Recommended next: the fixer (`fixer-fix-image-uploader-url`) for QAF-4.

## Phase 2 re-run at `5ec0621`

**Start.** Steering's message (18:2xZ) names the gate anchors. I re-derived them at the record:
- the implementation document's `Handoff-At: 5ec0621` (record `a9614a7f`);
- the code review's header `Reviewed-At: 5ec0621`, `Round: 3`, `Verdict: APPROVED` (record `2240623c`).

The shared tree's `git rev-parse HEAD` printed `5ec06212d730…`. Criteria assessed: limbs 1 to 5, as in the pass above, and QAF-4's
required case.

**Round diff.** `48c5e87..5ec0621` is one commit, `5ec0621`. `git diff --numstat` gives only
`src/components/__tests__/ImageUploader.saved-address.test.tsx`, 16 added and 0 removed.
`git diff --quiet 48c5e87 5ec0621 -- . ':!src/**/__tests__/**'` exits 0, so production is byte-identical to `48c5e87`: `ImageUploader.tsx`
blob `709efa13` in the export, and `useDialogEnter.ts` unchanged. The round has no production change, so per qa.md the sweep re-runs only
the survivor the round closes. The differential and the `48c5e87` sweep stand on that identity.

**The new case** is "follows that image in the box and the preview, and saves it", under the describe "…while the dialog is open". With
the dialog open on X, it types A, presses the host's `data-replace` (Z), and asserts that the box and the preview show Z and that Save
commits `[Z]`. The expectations are literals, and the dialog is left open with an edit in progress, which is the property QAF-4 named. The
title carries no ID token.

Runs, in a `git archive` export of `5ec0621` (test-file blob `a138fda8`, checked against `git rev-parse`), network-isolated. Captures are
under `verification/fix-image-uploader-url/qa/rerun-5ec0621/`.

| Run | Result | Capture |
|---|---|---|
| Green: the three `ImageUploader` files and `WarningDialog.enter-scope` | 61 passed (61), exit 0 | `green-run-5ec0621.txt` |
| The survivor `qa-sync-only-when-closed` applied in the export (exact-once replacement; restored, blob `709efa13` re-checked), same files | **1 failed, 60 passed (61), exit 1**. The only failing case is the new one: `expected 'https://example.com/a.png' to be 'https://example.com/z.png'` | `red-run-sync-only-when-closed.txt` |
| Full suite (loopback up) | **2718 of 2718 passed, 173 files, exit 0** | `suite-5ec0621.json`/`.txt` |
| Typecheck (both programs) | exit 0 | `typecheck-5ec0621.txt` |

So the survivor is killed by the committed case alone, which closes QAF-4. I applied this mutant by hand in the export and did not use
`mutation-run.py`. The mutant is the same exact-once replacement as `rerun-48c5e87/sweep/mutants-qa.json`'s `qa-sync-only-when-closed`.

**Walk** (the `48c5e87` pass's Assumption Not Checked, plus QAF-4's path in a real browser).
- **Build.** A `git archive` export of `5ec0621`, `pnpm install --frozen-lockfile --offline` (exit 0, `walk/install.txt`), and
  `next dev -H 127.0.0.1 -p 3000`.
- **Database.** `tools/uat-local-stack.sh up` reported next id 900000000000001 (`walk/local-stack-up.txt`). The walk wrote only message
  **900000000000001**, in two tabs.
- **Images.** A `no-store` image server on 127.0.0.1:8765.
- **Who walked it.** A `browser-walker` helper, as the test account. Evidence: `walk/evidence/*.json`, 10 files.

Flows 1 and 9 were walked at `48c5e87` on production byte-identical to this tip (above). That walk stands on that stated basis and was not
repeated.

| Step | Observed | Result |
|---|---|---|
| A1, A2 | JSON load sets `avatar_url` to a 404 address (`gone.png`). The dialog opens on `gone.png`, and after 3 s: "Image not found.", no preview, Save disabled, Clear enabled | PASS |
| A3 | Clear, then `blue.png`, then Save: the avatar is `blue.png` | PASS |
| B2 to B4 | Tab A's avatar dialog is open with `red.png` typed. Tab B saves `pusher.png`. Tab A shows "Message Update Detected" **over the still-open image dialog**, then Reload | PASS |
| B5 | The image dialog is still open, and its box and preview are `pusher.png` with Save enabled. Save gives the avatar `pusher.png` | PASS |

**Set up and removed.**
- `next dev` (process group 2022785) and the image server (process group 2022786) were stopped. `ps` shows none of their pids, and 3000
  and 8765 are not listening.
- The container `hooks-postgres-local` was removed (`walk/local-stack-down.txt`, exit 0).
- The exports and the image folder were deleted after a `/proc` cwd check.
- The helper closed the browser and emptied its caches.

**Findings.** QAF-4 MEDIUM Phase 2 RESOLVED: the case "follows that image in the box and the preview, and saves it" kills
`qa-sync-only-when-closed` at `5ec0621` (`rerun-5ec0621/red-run-sync-only-when-closed.txt`). There is no new finding and no open finding.

**Blocking-condition register.** No rows (as above). Later stage documents are authoritative.

**Assumption Not Checked.** This pass assumes that the production build Vercel makes of `master` runs this client component as
`next dev` does, and it does not test that: every walk ran on `next dev` against a local stack. Signature of falsity: on the deployed site,
Enter with the cursor in the image box does nothing, or the avatar dialog reopens on the old address after a JSON load. Owner: devops at
release, through the deploy record's post-release look, or `steering-hooks-fixer` if devops's stage set has none.

**Verdict.** **QA Complete (PASS)** at website `5ec0621` (`Verified-At`). Limbs 1 to 5 hold on every instrument run:
- the suite, 2718 of 2718, exit 0;
- this chain's mutation sweeps, with every survivor dispositioned as equivalent or killed;
- the probes and the shared-hook differential;
- real-browser walks of flows 1, 3, 8 and 9, the 404 JSON load, and Reload while the dialog is open.

A later change to production code expires this verdict. It does not authorise the release, which is devops's step to website `master` under
the owner's release approval.
Recommended next: devops (release, via `steering-hooks-fixer`).
