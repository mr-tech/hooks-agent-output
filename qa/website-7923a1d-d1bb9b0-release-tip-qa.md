---
ID: n/a
Origin: "release chain/018-next-upgrade-save-size-cap -> website master 7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe -> d1bb9b0724cded3c3c303203c2cbafe5df7bbf96 (fast-forward)"
UUID: 6273a762
Verified-At: "d1bb9b0724cded3c3c303203c2cbafe5df7bbf96 — repos=website; tree 36f83a68fc6bb28cb33433d89677034b3ccb8595, the tree of the effort-final Phase 2 Verified-At (qa/closed/018-next-upgrade-save-size-cap-m4-qa.md); step 1b and the gated-set check only"
Status: Release Verified
Status-Detail: "Release Verified at website d1bb9b0, the Phase 2 tree. Step 1b: 30 open handoffs, 9 pattern matches, 1 member fires on this release's push (the 018 post-deploy carrier; it reads after the push, no pre-release act owed); the mutant-equivalence handoff's trigger did not fire. No gated time-based set exists in website."
Phase: 3
---

# QA Release-Tip Verification: chain/018-next-upgrade-save-size-cap → website master d1bb9b0

**Release identifier**: website `master` `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe` → `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96`, a
fast-forward of 18 commits with no assembling merge; the release-check commit `5677889` never reaches `master` (devops's request,
2026-11-20, message from `devops-hooks-018`).

**Bundled**: one plan, `planning/closed/018-next-upgrade-save-size-cap.md` (UUID `6273a762`). Its QA record is
`qa/closed/018-next-upgrade-save-size-cap-qa.md` (Phase 1 and the blocking-condition register B-1 to B-10) and the four milestone
documents `qa/closed/018-next-upgrade-save-size-cap-m1-qa.md` to `-m4-qa.md`; the effort-final Phase 2 verdict is the M4 document's, at
`d1bb9b0`. None of them is reopened or amended here (qa-phase-3.md step 1).

**Requested by**: `devops-hooks-018`, by message at Stage 1 (record `65f0308`).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-20T07:15 | qa-hooks-018 (devops's request, website d1bb9b0) | Phase 3. The tip is the effort-final Phase 2 `Verified-At` commit itself (tree `36f83a6`), so steps 3 and 5 have nothing to compare. Step 1b: 30 open handoffs, 9 pattern matches, 1 member fires on this release (the 018 post-deploy carrier, read after the push); the mutant-equivalence handoff's trigger did not fire. There is no gated set. **Release Verified.** |

## The tip, re-derived

Capture: `verification/018/qa/phase3-tip-reads.txt`, read at 2026-11-20T07:14Z.

| Read | Result |
|---|---|
| `git -C website rev-parse d1bb9b0^{commit} d1bb9b0^{tree}` | `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96`; tree `36f83a68fc6bb28cb33433d89677034b3ccb8595` |
| `git -C website ls-remote origin refs/heads/master` | `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe`, the base |
| `git -C website merge-base --is-ancestor 7923a1d d1bb9b0` | exit 0; `rev-list --count 7923a1d..d1bb9b0` = 18 |
| `Verified-At` of `qa/closed/018-next-upgrade-save-size-cap-m4-qa.md` | `d1bb9b0` |

The tip is the commit the effort-final Phase 2 suite ran against, so the tip's tree is that verdict's tree by identity of commit, not only
of tree. By qa-phase-3.md's preamble, only step 1b and step 2's gated time-based set run; the Phase 2 verdict covers the suite at this tree.
A fast-forward with nothing assembled bundles no second plan, so step 3 (in combination) has no interaction to examine beyond what Phase 2
ran over this same tree: `7923a1d`, the base, is the already-released fixer chain `fix-message-page-header-decode`
(`qa/closed/website-983681c-7923a1d-release-tip-qa.md`, Status `Released`), and plan 018's chain ran on top of it.

## Step 1b: open-handoff sweep

The record has no `tools/open-handoff-trigger-sweep.py`. The enumeration instrument is
`verification/018/qa/phase3-open-handoff-triggers.py` (written for this pass): it reads every `handoff/*.md` outside `closed/`, keeps those
whose frontmatter `Status` is `Open`, joins the whole `Review-Trigger` value including folded lines, and flags a match against each given
pattern. Command, from the record root:

```
python3 -I verification/018/qa/phase3-open-handoff-triggers.py . 'push' 'release' 'Phase 3' '\b018\b' 'deploy'
```

Output: `verification/018/qa/phase3-open-handoff-triggers.out` — `open=30 matched=9`. The count of open handoffs agrees with a separate
`grep -m1 '^Status:'` over the 30 files in `handoff/` (all 30 `Open`). Each match is dispositioned:

| Handoff | Matched on | Fires on this verdict or this push? | Disposition |
|---|---|---|---|
| `018-next-upgrade-save-size-cap-post-deploy-2026-11-20.md` | push, 018, deploy | **Yes**: the READY production deployment of website `master` containing `d1bb9b0` (`verification/018/devops/read-serving-deployment.sh` exit 0) | Its trigger is an event after the push, so nothing is runnable before this verdict. It carries B-6, B-7, B-8, B-10. B-8 is this stage's, read after the push through the stage browser as the test account once the serving gate exits 0. |
| `017-existing-items-backlog-post-deploy-2026-11-19.md` | release | No: it names plan 017's two releases, both live (its `Status-Detail`, E-WEBSITE-PUSH 2026-11-19T20:11Z) | Not triggered by this release. |
| `message-page-header-decode-post-deploy-2026-11-20.md` | push, deploy | No: the push it names is website `7923a1d`, pushed 2026-11-20T02:34:40Z (its `Status-Detail`) | Not triggered. Devops sequences this push after P-1's decisive read. |
| `preview-image-generator-drain-under-load-unobserved-2026-11-08.md` | deploy | No: a generator stop or deploy; this release does not touch preview-image-generator | Not triggered. |
| `preview-image-generator-host-security-posture-2026-11-08.md` | deploy | No: generator files and host only | Not triggered. |
| `pusher-message-update-channels-are-public-2026-11-19.md` | push (in `usePusher.ts`) | No: a false match on a filename; neither `src/server/api/routers/shared.ts` nor `usePusher.ts` is in the release diff | Not triggered. |
| `update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md` | 018 | No: the trigger excludes chain 018's own edit of `updatePreferences` | Not triggered. |
| `website-git-dependencies-resolve-unpinned-2026-11-20.md` | release | No: "before the next website release whose package.json or lockfile differs from d1bb9b0's". This release is `d1bb9b0`, so the lockfile does not differ | Not triggered; a later release that changes them fires it. |
| `website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md` | release, 018 | No: "After chain 018's release, when … is next edited". It needs an edit after this release | Not triggered. |

**The mutant-equivalence handoff** (`mutant-equivalence-by-argument-unverified-2026-11-19.md`; devops asked for its trigger by name). It
did not match the patterns, because its trigger is a path edit: "when the next chain's diff touches website `src/**/leaveWithoutAlert.ts`,
`messageDrafts.ts`, `withLocalStorage.ts` or `StyledLink.tsx`, or preview-image-generator `src/generateImage.ts`". The release diff's file
list (`git -C website diff --name-only 7923a1d d1bb9b0`, captured at `verification/018/qa/phase3-release-diff-files.txt`, 20 files) contains
none of them: `grep -c` of those five basenames over it is 0. **Not triggered.**

**Path-based triggers checked against the release diff.** These sit outside step 1b's scope, which covers only triggers naming this verdict
or a push. They were checked anyway because the release diff is in hand. The same `grep -c`, over the paths named by every other open
handoff's trigger, returns 0. Two triggers name `src/server/api/routers/message.ts`, which the release does change:
`deleted-message-url-serves-blank-editor-2026-11-20.md` ("message.getOne is next changed") and
`get-one-absent-number-fails-without-not-found-2026-11-19.md` ("message.ts getOne … is next edited"). The release's `message.ts` diff has
two hunks: the import list at its head, and inside `upsert`'s input. Neither falls in `getOne`. In `d1bb9b0`'s file, `getOne` is the
procedure that opens after `get` and before `getAll`, and the diff's `-U0` text contains 0 occurrences of `getOne`. **Neither fires.**

## Step 2: the gated time-based set

**Website has none.** The read is in `verification/018/qa/phase3-tip-reads.txt`. `vitest.config.ts` at `d1bb9b0` defines two projects,
`node` and `dom` (`grep -c "name:"` = 2). Neither is behind a flag. `package.json` has two test scripts, `test` (`vitest run`) and
`test:watch`. A search of `d1bb9b0`'s file names for a time-based, slow or gated config matches 0. The workspace's Test Conventions
(`agent-output/CLAUDE.md`) name no gated location. With no set, nothing runs here.

## Verdict

**Release Verified** at website `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96`, for the release `7923a1d` → `d1bb9b0`. The suite evidence is the
effort-final Phase 2 verdict, which ran against this commit. This pass ran step 1b and found one triggered handoff, the 018 post-deploy
carrier, which acts only after the push. The step 2 check found no gated set.

Register state (from devops's Stage 1 message; the deployment record and the post-deploy handoff hold the authoritative state of each row):
B-1 to B-5 and B-9 are EXECUTED. B-6, B-7, B-8 and B-10 are post-deploy and are carried by
`handoff/018-next-upgrade-save-size-cap-post-deploy-2026-11-20.md`. No post-deploy row gates the release act.

## Assumption Not Checked

This pass assumes that Vercel's production build of `d1bb9b0` installs from the frozen lockfile, so it resolves zod `3.22.4` and the
lockfile's `paracord` and `project-utils` commits. The pass does not test this. That build does not exist until the push, and plan 018's
M1-i issue count rests on zod 3.22.4. The sign that the assumption is false: the production deployment's build log shows a non-frozen
install, or resolves a zod other than `3.22.4` for website's own `zod` entry. Devops owns closing it, at the serving read for
`018-next-upgrade-save-size-cap-post-deploy-2026-11-20.md`'s E-SERVING limb. The open dependency premise is carried by
`handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md`.

## Process note

The first write of this record carried a typed changelog stamp a minute ahead of the clock; the stamp gate hook refused it, and the row was re-stamped with the `date -u` minute through `record-edit.js` (gate satisfied, not worked around).

## Handoff

Consuming stage: devops (`devops-hooks-018`). It passes this record to `release-move.js --qa-record`. B-8 is this stage's after the push.
