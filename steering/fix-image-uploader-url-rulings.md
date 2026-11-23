# Rulings — fixer chain `fix-image-uploader-url` (website: the image URL dialog can save an address other than the one shown)

Steered by `steering-hooks`, item 9 (R-H7) of effort `fixer-queue-2026-11-21` (effort rulings blocks "2026-11-21T05:38Z" item 6,
"05:50Z"). tmux category: `fix-image-uploader-url`. Source: `research/codebase-bug-evaluation-2026-11-08.md:174`.

## 2026-11-22T04:44 — selection: fix all three

Selection prompt put 04:4xZ, answered 04:4xZ (ledger `steering/selection-ledger/2026-11-22.md`, this thread's block of that minute);
wording this thread's, in his 18:37Z form. Premises: the sweep `verification/fix-image-uploader-url/scoping/sweep.md` (`724b0e4`, at
website `132a7ab`, read): `src/components/ImageUploader.tsx` — Save commits `localImage` (L54-57), not `imageInput`; the URL check effect
(L68-79) has no stale-response guard; an invalid input only sets the error (L73-75); Cancel (L63-66) clears `localImage` only when
`image === ''` and never resets `imageInput`; `PresetDialog unmount={false}` (L92) keeps state across reopen. Render sites: `Author.tsx:158`
(`avatar_url`), `EmbedAuthor.tsx:186`, `EmbedFooter.tsx:151`, `EmbedImage.tsx:126`, `EmbedThumbnail.tsx:58`. Existing tests
(`ImageUploader.enter-scope`, `…url-validation`) cover none of the three sequences. The refutation helper (export, run, hand-resolved fake
`Image`, 7 cases, exit 0): (a) A then B, B resolves first — box B, preview A, Save → `setImage(A)`; (b) A loaded then invalid text — error
shown, Save enabled, Save/Enter → A; (c) saved X, type Y, Cancel, reopen — box Y, Save → Y; control as expected.
- Q: A "Agent: fix all three (Recommended)" — "Save always saves exactly what the box shows and only once it has loaded; a bad address
  can't be saved; Cancel puts the box back to the saved image. Tests for each case and normal use. Queued after the other website
  fixes."; B "Agent: fix 1 and 2 only"; C "Agent: don't fix". Chosen: **A**.

Determination, stage set and branch cut: when the website tree is free (after chains 7, 8, 9a-9d), from that tip.

## 2026-11-23T15:54Z — re-sweep, refutation and determination at `af3d95a` (steered now by `steering-hooks-fixer`)

Steering moved to `steering-hooks-fixer` (the thread's rename, effort rulings header). 9d left the fixer queue for plan 019 (effort block
09:07Z), so 9e is next on the tree. `src/components/ImageUploader.tsx` is unchanged from `132a7ab` to `af3d95a` (`git diff --stat`, empty).
- **Sweep** (helper, briefed with the property alone): `verification/fix-image-uploader-url/scoping/sweep-af3d95a.md`. One shared
  component, `ImageUploader.tsx`, serves five consumers (author avatar, embed author icon, embed footer icon, embed image, embed thumbnail).
  Save and Enter commit `localImage` (L56), never the box's `imageInput`. Four failure modes read from code: F1, an invalid box leaves the
  last checked address committed (L74, L84, L146); F2, an out-of-order check overwrites the newer result (L68-79, no staleness guard); **F3
  (new), Clear can be undone by a pending check** (L58-62, L71); F4, with an existing image, Cancel keeps the last checked address (L65).
  The existing tests stub `Image` with `queueMicrotask`, so they never reach these paths. `project-utils` has no image-input component.
- **Refutation** (helper, briefed with the claims alone, run through the real component): `verification/fix-image-uploader-url/scoping/
  refutation-af3d95a.md`. (a), (b) and (c) NOT REFUTED; the control holds; exit 0.
**Determination.** Shape: one defect class in one component, with cause proven by run for (a) to (c) and read from code for F3. Blast
radius: the five image-address dialogs. No dated event. Specification: his 04:44 selection, "Save always saves exactly what the box shows
and only once it has loaded; a bad address can't be saved; Cancel puts the box back to the saved image." End step: website `master`, Vercel
production (needs his word). `release-move.js --dry-run` on `master` `af3d95a` (15:5xZ): every check passed; no workflows; no sibling
serving refs. Pipeline: the `fixer` agent.
**Scope statement** (website, from `af3d95a`): in the image address dialog, (1) Save and Enter commit exactly the address the box shows,
and only once that address has loaded; (2) an address that fails the check, by format or by load, cannot be saved; (3) a slower, earlier
check never overwrites a later one, and none lands after Clear (F3, in scope under "fix everything", effort block 04:50); (4) Cancel puts
the box and the preview back to the saved image, with or without one saved, and reopening shows the saved image. Tests per Test Conventions
mount the real component, drive load order with a hand-resolved `Image`, and assert the committed value with literal expectations, red
first. Write set: `src/components/ImageUploader.tsx`, any helper beside it, its tests under `src/components/__tests__/`, the fixer's
document and `verification/fix-image-uploader-url/`. **Not covered by the sweeps:** the parents' `set` wiring, server-side validation,
behaviour on a real remount, and real image load times.
**Stage set:** `fixer-fix-image-uploader-url` → `code-reviewer-fix-image-uploader-url` (under 20 production lines: the reviewer also runs
the suite, typecheck, red test) → QA Phase 2 at 20 or more → devops for website `master` (his word). No plan, critic, Phase 1 or UAT.
Coordinator's go for the tree: received 15:5xZ (item 10), naming base `af3d95a`. Usage: weekly_all 14% (live, 15:26Z).

## 2026-11-23T17:05Z — CR-3 (limb 1's reach), this thread's ruling; QA Phase 2 started

The code review (`code-review/fix-image-uploader-url-code-review.md`, record `c559d303`) is APPROVED at `e94baf7` after Round 1's
rejection (`abdbd832`: CR-1 MEDIUM, CR-2 LOW, both fixed at `e94baf7`, implementation record `9a33daa2`). `git diff --numstat af3d95a
e94baf7` gives 27 production lines added, so Phase 2 is owed. CR-3 INFO: with an image saved and the box emptied by hand, Save removes
the image but Enter does nothing. Ruling: inside limb 1, no change. His words (block 04:44) bind Save ("Save always saves exactly what
the box shows"). Enter doing nothing commits no wrong value. The Enter half of limb 1 is this thread's scope wording, and it narrows
nothing he said.

## 2026-11-23T17:22Z — QAF-3 ruled in scope (limb 4, inside the region); QAF-2 held for him

QA Phase 2 at `e94baf7` is QA Failed on QAF-1 MEDIUM, a missing test (`qa/fix-image-uploader-url-qa.md`, record `8dfa68f9`), routed to
the fixer.
**QAF-3, ruled in scope by this thread.** The always-mounted dialog does not re-read a saved image that changed while it was closed. QA
ran this with probe P3, at base and at the tip. A `general-purpose-sonnet` helper read reachability from code at `e94baf7`, without
running it. The JSON modal's load (`JsonModalBody.tsx:78-88`) and the reload after "Message Update Detected" (`usePusher.ts:68-73`)
change `avatar_url` while the Author `ImageUploader` stays mounted (`index.tsx:284`; `ImageUploader.tsx:50-51` seeds `imageInput`
once). Reopening then shows the old address, and Save (`:59-63`) writes it back over the new one. Embed uploaders remount, because
fresh `_key`s are assigned, so they are unaffected. It is inside the swept region (`ImageUploader.tsx`) and within limb 4's words,
"reopening shows the saved image". So it is in this round, with a red test through the real component.
**QAF-2, held for him.** Pressing Enter inside the address box does nothing, at base and at the tip. His words (block 04:44) name Save
only. Whether Enter should save is a product choice, put to him by selection.

## 2026-11-23T17:40Z — selection: Enter in the address box (QAF-2) (put 17:3xZ, answered 17:40Z)

Ledger: `steering/selection-ledger/2026-11-23.md`, block `2026-11-23T17:40Z — steering-hooks-fixer`. The wording is this thread's.
Options: *Agent: Enter in the box saves* ("Once the address has loaded, Enter in the box saves it, like clicking Save. A bad or
still-loading address still can't be saved. It goes into this fix round: a small change to the image dialog only, plus updating one
existing test that records today's behaviour. Other dialogs don't change.") / *Agent: leave Enter as it is*. **Chosen by selection:
Enter in the box saves.** This adds a limb 5 to the scope statement: in the image address dialog, Enter with focus in the address box
commits as Save does, under limbs 1 and 2's conditions. The write set is unchanged (`ImageUploader.tsx`, its helper, its tests);
`useDialogEnter.ts` is shared with the other dialog, so any change there must leave that dialog's behaviour as it is.
Premises read this turn: a `general-purpose-sonnet` refutation helper mounted the real component in exports of `af3d95a` and
`e94baf7`. Enter in the box gave 0 `setImage` calls at both SHAs, and the claim was confirmed. The cause read from code is that
react-hotkeys-hook ignores a keydown from a form field unless `enableOnFormTags` is set (`useDialogEnter.ts`;
`ImageUploader.tsx:95`). Plan 017 kept this behaviour as it already was, before and after
(`planning/closed/017-existing-items-backlog.md:1154`); it was not his choice. The existing test
`ImageUploader.enter-scope.test.tsx` expects no call for the URL field, and that expectation changes under this ruling.
Sequence: code review Round 2 APPROVED at `cae7472` (`7e426a06`) before this answer. That approval and the QA re-run apply to the
next hand-off instead.
