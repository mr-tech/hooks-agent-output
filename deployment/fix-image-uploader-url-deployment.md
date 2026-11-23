---
ID: n/a
Origin: fix-image-uploader-url
UUID: 5d9aefc4
Status: Active
Status-Detail: "Stage 1 done (chain committed on the chain branch at website 5ec0621, documents closed). Phase 2A readiness written; the release ask is put to the owner in this session. Nothing pushed."
---

# Deployment Record: fix-image-uploader-url

**Plan Reference**: none (fixer route; his selection "fix all three", `steering/fix-image-uploader-url-rulings.md` block "2026-11-22T04:44", and the determination, block "2026-11-23T15:54Z").
**Stage start** (re-derived at the record, `git log -1` per document): no UAT in the stage set.
- QA Phase 2: `qa/closed/fix-image-uploader-url-qa.md`, `QA Complete`, `Verified-At: 5ec0621 — repos=website`, record `c70dddfc`.
- Code review: `code-review/closed/fix-image-uploader-url-code-review.md`, `Reviewed-At: 5ec0621`, `Round: 3`, `Verdict: APPROVED`, record `2240623c`.
- Fixer: `implementation/closed/fix-image-uploader-url-implementation.md`, `Handoff-At: 5ec0621`, record `a9614a7f`.

**Roadmap**: `agent-output/roadmap/` holds only `.gitkeep` (`ls`), so there is no roadmap to read; proceeding with reduced context, nothing cited.
**Release Identifier**: website `master` → `5ec06212d73073ab556e46582c3b23e3468da3a3` (no `version` field in `package.json`, no `CHANGELOG.md` at the tip, `git tag` 0 lines; none synthesised).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T18:32 | steering-hooks-fixer (brief `steering/fix-image-uploader-url-brief-devops.md`, 18:26Z, with `-brief-common.md`) | Stage 1, then Phase 2A for the release to website `master` | Brief and rulings file read whole; steering's brief arrived. Stage 1 verified at website `5ec0621` (table below). Tip packaged by a build re-run: install and `next build` exit 0. Release-move dry run exit 0. Nothing pushed; the release ask follows in this session. |

## Stage 1 verification (website, at 5ec0621)

| Check | Result | Instrument |
|---|---|---|
| Tree on the chain branch at the head under release | `chain/fix-image-uploader-url`, HEAD `5ec06212d73073ab556e46582c3b23e3468da3a3`, no upstream | `git branch --show-current`; `git rev-parse HEAD` (18:31Z) |
| Nothing in scope uncommitted | website `git status --porcelain`: one line, `?? .playwright-mcp/` (untracked screenshots, not this chain's, never committed). Record: `git status --porcelain -- verification/fix-image-uploader-url`: 0 lines | `git status --porcelain` |
| Chain range | 13 commits `af3d95a..5ec0621`; four paths. Production: `src/components/ImageUploader.tsx` 33 added / 19 removed, `src/utils/hooks/useDialogEnter.ts` 8 / 2 (41 added). Tests: `ImageUploader.saved-address.test.tsx` 394 / 0 (new), `ImageUploader.enter-scope.test.tsx` 13 / 11 | `git log --format='%h %s' af3d95a..5ec0621`; `git diff --numstat af3d95a 5ec0621` |
| Fast-forward onto production | remote `master` = `af3d95acc4f4b1b25f78b71bd2baa555c0724a72` (`git ls-remote origin master`, 18:31Z), the chain's base; `git merge-base --is-ancestor origin/master HEAD` exit 0 | `ls-remote`; exit status |
| QA binds the tip | `Verified-At: 5ec0621`, the tip itself. Tip tree `e29ea947a7eaa3bd6071339a10626266d5e1bb0b`, base tree `1b9682356f1897435fab391f6a4e64768dbb2303` | `git rev-parse <sha>^{tree}` |
| Release consistency | `package.json` has no `version`; no `CHANGELOG.md` (`git cat-file -e` exit 128); `git tag` 0 lines. Cross-repo references (`project-utils` pinned `40ba5d3a…`, `paracord` pinned `3f203086…`) and the lockfile are unchanged in the range: `git diff --quiet af3d95a 5ec0621 -- package.json pnpm-lock.yaml pnpm-workspace.yaml next.config.js .gitignore` exit 0. No pinned reference is stale for this release, because none moves | exit status; `grep -n` over `package.json` |
| Open disagreements with predecessor documents | none. QAF-1 to QAF-4, CR-1 to CR-5 are each terminal in their documents (QAF-1 to QAF-4 `RESOLVED`; CR-1 and CR-2 fixed, CR-3 ruled inside limb 1, CR-4 and CR-5 INFO) | the three documents, read this turn |

## Blocking-condition register

Authority: `qa/closed/fix-image-uploader-url-qa.md`, "Blocking-condition register": **no rows** (stated at `e94baf7`, `48c5e87` and `5ec0621`). The code review's document names none either. No pre-release row is unterminated and no post-deploy-observable row exists, so no carrier handoff is created at Stage 1 step 8. Not a register row: QA's Assumption Not Checked at `5ec0621` (the production build runs this client code as `next dev` did), which QA routed to this stage. It is the post-release walk below, run at the deploy.

## Stage 2 readiness (Phase 2A, 2026-11-23T18:32Z)

Included: chain `fix-image-uploader-url` only. Execution mode: **Mode A, agent-executed**, the move run in this session on his answer to the ask put in this session (a role session, not a subagent).

| Step | Result | Instrument |
|---|---|---|
| All chains committed | 1 of 1 | — |
| Tip assembled | the chain branch itself: a fast-forward of remote `master`, no merge commit | dry run, "ff-from-remote ok" |
| Release-tip verdict | the Phase 2 verdict covers the tip: the tip **is** the `Verified-At` commit, so `5ec0621^{tree}` equals `5ec0621^{tree}` (`e29ea947…`). No separate Phase 3 record is asked for | `git rev-parse` |
| Open-handoff sweep (`qa-phase-3.md` step 1b) | The record has no `tools/open-handoff-trigger-sweep.py` (`ls tools`). I ran an equivalent over `handoff/*.md` with a python script: 34 records with `Status: Open`; the 19 whose whole `Review-Trigger` mentions a push, a release, a verdict or the website were read. **One fires:** `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`, item F-7 ("the next change to `ImageUploader.tsx`"; Owner: UAT). This chain changes `ImageUploader.tsx`. Disposition below. `fix-api-secret-compare-post-deploy` and `vercel-dashboard-cron-list-after-cron-removal` name other chains' pushes (their own commit), not this one. The rest name other files (`cron.ts`, `usePusher.ts`, `env.mjs`, `leaveWithoutAlert.ts` and so on): none is in this diff | python over `handoff/*.md`; `git diff --numstat` |
| Consistency (Core 3, Phase 2A step 4) | see Stage 1 table | |
| Populations (4b) | The release has no consumer or pin population of its own: website is a leaf deployment and no package, pin or subscriber moves. Re-derived at the mechanism: the importers of the image dialog were read by `git grep -l "ImageUploader" 5ec0621 -- src ':!src/**/__tests__/**'`: eight files. Five render it through the lazy wrapper `src/components/dynamics/ImageUploader.tsx`: `Author.tsx`, `EmbedAuthor.tsx`, `EmbedFooter.tsx`, `EmbedImage.tsx`, `EmbedThumbnail.tsx`. The other two are the component itself and `src/app/message/m/[id]/edit/page.tsx:122`, which only prefetches it (`void import(...)`). The prop contract is unchanged (code review and QA read each call site), and QA's browser walk exercised the avatar | `git grep -l`; `git grep -n` |
| Packaging (build at the tip) | `pnpm install --frozen-lockfile --offline` (exit 0) then `pnpm run build` (`next build`, exit 0, "Compiled successfully", the route table printed) in a `git archive` export of `5ec0621` (pnpm 10.28.2 from `packageManager`, node v24.14.0), 18:27:45Z to 18:28:17Z. Env from `.env.local` by symlink (values never read). No lockfile or package-manager change, so the host-major install check does not apply. The export `node_modules` was installed fresh, not symlinked from the tree. Typecheck, both programs, exit 0 at this tip in the fixer's export and QA's | `verification/fix-image-uploader-url/devops/packaging-build-5ec0621.txt` |
| Workspace | website `git status --porcelain` shows only `?? .playwright-mcp/`. Predecessor exclusions (QA's gitignored `next-env.d.ts`, `.env.local*`, `.playwright-mcp/`) do not affect the move: `release-move.js` reports "untracked 17 path(s) left alone" and a dirty-tree check over tracked files only | dry-run output |
| History rewritten | no; the verified commit is the tip and every chain commit is reachable from the branch | `git cat-file -e`; `git log` |
| Serving refs | `git ls-remote --heads origin`: `backup`, `external-message-api`, `master`, `redesign`, `regex-refactor` (18:31Z). Only `master` is in `release-move.js`'s serving list: `--report` prints "one serving ref at origin (master); no pair", and the dry run says "sibling serving refs (none) on one line ok" | `release-move.js --report`; `--dry-run` |

**Phase 2C block (re-derived against the mechanism, repository: website):**
- **Deploy mechanism.** Re-derived: `.github/` holds only `prompts/` (`ls`), so `.github/workflows` is absent, `release-move.js` prints "workflows none … a push to master triggers no GitHub Actions workflow", and `vercel.json` is absent at the tip. **Accepted as written, a named risk**: that a push of `master` builds and serves hooks.gg through Vercel's git integration. The integration is outside the repo and not read. Evidence on record: `architecture/system-architecture.md` line 168 (the website deploys on Vercel), `vercel ls --prod` at 18:30Z (after two hangs at the 60 s timeout, the third try returned) shows production deployments by the account's owner, the latest created 15:24:13Z and Ready, aliased to `hooks.gg` and to `hooks-gg-website-git-master-hooks-gg.vercel.app` (a git-branch alias for `master`), and the prior chains' deploys of `master`.
- **Rollback.** The reversing patch was written to a file and checked: `git diff af3d95a 5ec0621 > rollback-reverse-patch-5ec0621.diff`, then `git apply --check -R` against the tree at `5ec0621`, **exit 0** (599 diff lines; it applies in reverse). The owner's established fast path is Vercel's promote of the previous deployment (`567m70ejp`, created 15:24:13Z, Ready), which this stage does not exercise and accepts as written. A git rollback would be a new revert commit pushed as a fast-forward, which is a new ask.
- **Ordering.** Dry run → his yes → move → `ls-remote` → Vercel look → walk. Nothing interleaves with the move.
- **Serving refs.** As in the table.

**Runbook (one artifact; the results fill in at execution):**

| # | Step | Abort criterion | Result |
|---|---|---|---|
| 1 | `git -C /usr/local/bin/hooks/website ls-remote origin master` | not `af3d95acc4f4b1b25f78b71bd2baa555c0724a72` → stop; the tip is no longer a fast-forward and the verdict must be re-taken | `af3d95a…` at 18:31Z |
| 2 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 5ec06212d73073ab556e46582c3b23e3468da3a3 --dry-run --reason <text>` | exit ≠ 0 → stop | exit 0, 18:31Z ("every check passed; nothing moved"), `verification/fix-image-uploader-url/devops/release-move-dry-run-5ec0621.txt` |
| 3 | his yes to the release, in this session | no yes → Aborted; nothing moved | (pending) |
| 4 | the same command without `--dry-run`, with `--reason` naming the Phase 2 record and its `Verified-At` (moves local `master`, pushes, switches the tree to `master`) | exit 2 → nothing moved, stop; exit 1 → read the report for the ref state, route to the owner | (pending) |
| 5 | `git ls-remote origin refs/heads/master` equals `5ec0621…`; tree on `master`, `git status --porcelain` shows only `.playwright-mcp/` | any difference → route to the owner | (pending) |
| 6 | `timeout 60 vercel ls --prod`, `vercel inspect <url>` (look only, stdin closed, up to two retries on a hang): a production deployment created after the push, Ready, aliased to hooks.gg | a deployment in Error → name it to the owner, with the previous deployment (`567m70ejp`) as the promote target; never deploy or change settings from here | (pending) |
| 7 | the post-release walk (below) | a falsifier seen → the same promote target, his call | (pending) |
| 8 | `git branch -d chain/fix-image-uploader-url` (merged); no such branch at origin | `-d` refuses → name it to the owner; do not force | (pending) |

## Post-release walk (QA's Assumption Not Checked at `5ec0621`; carrier: this record, which stays open until it is run)

QA's last section assumes the Vercel production build runs this client component as `next dev` did, and tests nothing about it. Signature of falsity (QA's): on the deployed site, Enter with the cursor in the image box does nothing, or the dialog reopens on the old address after a JSON load. Steering's guidance names the walk. It runs on hooks.gg's production message editor, signed out, saving nothing, by a `browser-walker` helper, after the deployment is Ready:
1. Open the author avatar's image dialog and paste a well-formed image address. When the preview shows, press Enter with the cursor still in the box: the dialog takes the address. After it closes, read `document.activeElement` (the open question of F-7, below).
2. Paste an address that returns a 404: "Image not found." shows, and Save stays off.

Captures go under `verification/fix-image-uploader-url/devops/` (screenshots uncommitted). If the dialog is not reachable signed out without a save, or no real browser is available, the walk is recorded as not run and says so. It is not a reason to hold the record open past the deploy's own evidence; if it cannot run, the Assumption stays an item for the retrospective and for steering's closure, and the record says so.

**F-7, `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`.** Its `Review-Trigger` includes "the next change to `ImageUploader.tsx`". This release is that change, so the trigger has fired. Its Owner is UAT, and the stage set has no UAT. The cheapest read of its question (is `document.activeElement` outside the dialog before the leave ends, after Enter closes the image dialog) is step 1's last act, so I fold it into the walk. The handoff stays `Open` and is not edited by this stage beyond one changelog row naming the result, as QA did for plan 018.

## Disagreements and assumptions carried (Phase 2A step 9b)

- Open disagreements with predecessor documents: none (Stage 1 table).
- Predecessor Assumptions Not Checked that the release form exercises:
  - Code review Rounds 1 to 3 and QA's earlier ones (a real browser's `Image`, the reload and JSON load changing the saved image, Enter reaching the hotkey listener from the box): each was closed by QA's real-browser walks against a local `next dev` build (`qa/closed/fix-image-uploader-url-qa.md`, flows 1, 3, 8, 9, the 404 JSON load and Reload with the dialog open).
  - QA's last one, the production build: closed by the walk above, or recorded as not run.
- No live session could run the walk before the first ref moves, because it needs the deployed site.

## User-visible flows (the fixer's list, quoted in the release ask; implementation document § "User-visible flows")

These are for his check. They cover the image address dialog behind the author avatar, the embed author icon, the embed footer icon, the embed image and the embed thumbnail.

1. Type or paste an image address. Once the preview appears, Save, or Enter (including with the cursor still in the address box), saves that address. While it is still loading, or if it fails, Enter in the box does nothing. Enter in the other dialogs (the warning and confirmation prompts) works as before.
2. Type one address, then quickly another. Whatever order they load in, the preview and Save follow the second one.
3. Change a loaded address to something that isn't an image address, or one that doesn't load. The error shows, the preview goes, and Save and Enter do nothing. Typing another address takes the error away while that address loads.
4. Delete the address from the box by hand, then Save. The image is removed, the same as Clear then Save.
5. Press Clear while an address is still loading. The box stays empty and no preview comes back.
6. With an image saved, change the address, then Cancel (or click outside or press Escape, where allowed). Reopen the dialog: it shows the saved image, and Save keeps it.
7. With no image saved, type an address, then Cancel. Reopen the dialog: the box is empty and Save is off.
8. An image saved earlier that no longer loads: the dialog shows "Image not found.", Save is off, and Clear is available. That still holds after Cancel and reopening.
9. Load a message from JSON, or press Reload on "Message Update Detected", so that the avatar changes. Then open the avatar's image dialog: it shows the new avatar address, and Save keeps it.

## Residue (from the fixer's diagnosis, quoted as a limit of this release)

The defect has shipped: `master` `af3d95a` carries it and Vercel serves it. The release repairs nothing already saved. The affected values are stored messages whose author, avatar, footer, image or thumbnail address was not the one the box showed at Save (an earlier address that loaded after a later one; the last loaded address where an invalid one was in the box; a cancelled address saved on a later Save; the old address where the box had been emptied by hand). Each such value was an address that loaded at save time and nothing in the data tells it from an intended one. A tab already open on the old bundle keeps the old behaviour until it reloads. Who checks the live state: the owner, since it is production data.

## User Confirmation

(pending: the ask is put to him in this session as a selection prompt, Phase 2B.)

## Release Execution

(pending)

## Post-Release Status

(pending)
