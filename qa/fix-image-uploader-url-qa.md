---
ID: n/a
Origin: fix-image-uploader-url
UUID: 5d9aefc4
Verified-At: e94baf7 — repos=website
Status: QA Failed
Status-Detail: "Phase 2 at website e94baf7: QA Failed on QAF-1 MEDIUM (a test gap: no assertion holds Cancel's reset to the current saved image under stable callbacks). The fix is test-only and goes to fixer-fix-image-uploader-url. Shipped code is correct on every criterion run here."
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

QAF-1 MEDIUM Phase 2
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

## Verdict

**QA Failed** at website `e94baf7`, on QAF-1. The shipped behaviour is correct on every criterion this pass ran: limbs 1 to 4 in the suite
and the probe, and flows 3 and 8 in a real browser. The failure is a missing assertion. The remedy is test-only, so it adds no production
lines. The re-run after it covers that round's diff alone: the new case seen red under `qa-cancel-deps-stale` and green at the new tip, the
survivor re-run, and the suite.
Recommended next: the fixer (`fixer-fix-image-uploader-url`) for QAF-1 and QAF-2's document correction, then QA Phase 2 again on the new SHA.
