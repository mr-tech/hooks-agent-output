---
ID: n/a
Origin: fix-image-uploader-url
UUID: 5d9aefc4
Status: Released
Status-Detail: "Released 2026-11-23T18:36Z: website master af3d95a -> 5ec0621 on origin (release-move.js exit 0; ls-remote read back). Vercel built master at 5ec0621; the deployment is Ready and aliased to hooks.gg; the post-release walk passed on production. Chain branch merged and deleted. F-7 (handoff 017) and the architecture notice ride the carriers named under Next Actions; they do not hold this record open."
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
| 2026-11-23T18:39 | devops (Phase 2B and 2C) | Release ask answered; release executed | He answered the selection prompt put in this session with "Agent: release it now (Recommended)". Move run in this session: `release-move.js` exit 0, 18:35:47Z to 18:36:07Z. Origin `master` read back as `5ec0621`. Vercel built `master` at `5ec0621` and the deployment is Ready (details under Release Execution). Chain branch deleted. The post-release walk was handed to a `browser-walker` helper. **Disclosed in this round:** I filled the runbook's result cells and the two sections below it with a `python3` replace script (one `str.replace` per cell, each asserted to match exactly once), when the standing rule allows only Write, Edit or `record-edit.js` for a record document. The text it wrote is what the evidence files show. I made no further script edit to a record document. |
| 2026-11-23T18:44 | devops (Phase 2D) | Post-release walk and Phase 2D | The helper's walk failed on a signed-in profile; I ran it signed out with a clean Chrome: W1 to W9 PASS on production, 0 write requests. Phase 2D worked in order (sections above): implementation document Released, code review and QA Committed, fix branch deleted, architecture notice drafted for steering to lodge, no roadmap obligation, forward items listed with carriers. F-7's trigger fired; one row added to handoff 017. Record closed `Released`. |

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
| 1 | `git -C /usr/local/bin/hooks/website ls-remote origin master` | not `af3d95acc4f4b1b25f78b71bd2baa555c0724a72` → stop; the tip is no longer a fast-forward and the verdict must be re-taken | `af3d95a…` at 18:31Z and again at 18:35:40Z, just before the move. Abort criterion not met |
| 2 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 5ec06212d73073ab556e46582c3b23e3468da3a3 --dry-run --reason <text>` | exit ≠ 0 → stop | exit 0, 18:31Z ("every check passed; nothing moved"), `verification/fix-image-uploader-url/devops/release-move-dry-run-5ec0621.txt`; exit 0 again at 18:35:40Z |
| 3 | his yes to the release, in this session | no yes → Aborted; nothing moved | Yes, by selection ("Agent: release it now (Recommended)"), given before 18:35:40Z |
| 4 | the same command without `--dry-run`, with `--reason` naming the Phase 2 record and its `Verified-At` (moves local `master`, pushes, switches the tree to `master`) | exit 2 → nothing moved, stop; exit 1 → read the report for the ref state, route to the owner | exit 0, 18:35:47Z to 18:36:07Z: "OK moved master: af3d95acc4f4b1b25f78b71bd2baa555c0724a72 -> 5ec06212d73073ab556e46582c3b23e3468da3a3 on origin; tree on master" (`release-move-5ec0621.txt`) |
| 5 | `git ls-remote origin refs/heads/master` equals `5ec0621…`; tree on `master`, `git status --porcelain` shows only `.playwright-mcp/` | any difference → route to the owner | `ls-remote origin refs/heads/master` = `5ec06212d73073ab556e46582c3b23e3468da3a3` (18:36:12Z); `branch --show-current` = `master`; `rev-parse HEAD master` both `5ec0621…`; porcelain shows only `.playwright-mcp/`. Pass |
| 6 | `timeout 60 vercel ls --prod`, `vercel inspect <url>` (look only, stdin closed, up to two retries on a hang): a production deployment created after the push, Ready, aliased to hooks.gg | a deployment in Error → name it to the owner, with the previous deployment (`567m70ejp`) as the promote target; never deploy or change settings from here | At 18:36:33Z `vercel ls --prod` showed `hooks-gg-website-fh9ge0169` Building, 23 s old. `vercel inspect` (18:36:43Z): `dpl_45ocUDV5PtYtxBUUhBTc2CBMyWZp`, **Ready**, created 18:36:10Z, aliased to `hooks.gg`, `www.hooks.gg` and `hooks-gg-website-git-master-hooks-gg.vercel.app`. `vercel logs`: "Cloning github.com/hooks-gg/website (Branch: master, Commit: 5ec0621)", "Compiled successfully", "Build Completed in /vercel/output [16s]". `curl -sI https://hooks.gg` 18:38Z: HTTP/2 200. Pass (`vercel-inspect-fh9ge0169.txt`, `vercel-logs-fh9ge0169.txt`). The CLI hung at 60 s on later calls and was retried within the brief's two retries |
| 7 | the post-release walk (below) | a falsifier seen → the same promote target, his call | W1 to W9 run 18:42:34Z to 18:42:57Z on hooks.gg, signed out, in a clean Chrome: every step PASS, 0 write requests. No falsifier. See "Post-release walk: result" |
| 8 | `git branch -d chain/fix-image-uploader-url` (merged); no such branch at origin | `-d` refuses → name it to the owner; do not force | `git branch -d chain/fix-image-uploader-url` exit 0 (the output the filter passes is `ok`), `git show-ref --verify refs/heads/chain/fix-image-uploader-url` exit 1; `git ls-remote --heads origin 'chain/*'` 0 lines (the branch was never pushed). Pass |

## Post-release walk (QA's Assumption Not Checked at `5ec0621`; carrier: this record; run at the deploy, result below)

QA's last section assumes the Vercel production build runs this client component as `next dev` did, and tests nothing about it. Signature of falsity (QA's): on the deployed site, Enter with the cursor in the image box does nothing, or the dialog reopens on the old address after a JSON load. Steering's guidance names the walk. It runs on hooks.gg's production message editor, signed out, saving nothing, by a `browser-walker` helper, after the deployment is Ready:
1. Open the author avatar's image dialog and paste a well-formed image address. When the preview shows, press Enter with the cursor still in the box: the dialog takes the address. After it closes, read `document.activeElement` (the open question of F-7, below).
2. Paste an address that returns a 404: "Image not found." shows, and Save stays off.

Captures go under `verification/fix-image-uploader-url/devops/` (screenshots uncommitted). If the dialog is not reachable signed out without a save, or no real browser is available, the walk is recorded as not run and says so. It is not a reason to hold the record open past the deploy's own evidence; if it cannot run, the Assumption stays an item for the retrospective and for steering's closure, and the record says so.

**F-7, `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`.** Its `Review-Trigger` includes "the next change to `ImageUploader.tsx`". This release is that change, so the trigger has fired. Its Owner is UAT, and the stage set has no UAT. The cheapest read of its question (is `document.activeElement` outside the dialog before the leave ends, after Enter closes the image dialog) is step 1's last act, so I fold it into the walk. The handoff stays `Open` and is not edited by this stage beyond one changelog row naming the result, as QA did for plan 018.

## Post-release walk: result (hooks.gg production, deployment `dpl_45ocUDV5PtYtxBUUhBTc2CBMyWZp`, 2026-11-23T18:42Z)

**How it ran.** The first run was by a `browser-walker` helper (spawned 18:39Z). It found the shared browser profile **signed in** to hooks.gg as the test account, and `/message/m/new` showed a server picker, not the editor. It recorded W1 FAIL and W2 to W9 NOT RUN, did not pick a server, and saved nothing (`walk/W1-hooks.gg_message_m_new.json`, kept uncommitted: it lists the test account's server names). The brief's walk is signed out, so I read the signed-out routes with a clean Chrome (`walk/signed-out-probe-routes.json`): `/message/m/new` redirects to `/message/m/0/edit`, which shows the editor with a "You're not logged in" panel ("I'll do it later" dismisses it) and an "edit avatar icon" control. I then ran the same nine steps myself with a scripted clean headless Chrome (`walk/walk-signedout.js`, run 18:42:34Z to 18:42:57Z, exit 0; `walk/walk-signed-out-results.json`; screenshots in `walk/*.png`, uncommitted). It is a deviation from "a `browser-walker` helper does it", forced by the helper's profile being signed in. It issues GETs and local typing only: **0 POST, PUT, PATCH or DELETE requests to hooks.gg** (the results file's `writeRequests` is empty), nothing was saved, and no Chrome was left running (`ps`). The scripts are under `walk/` and each took two edits to find the visible dialog (the page keeps nine mounted dialogs, and a `role="dialog"` wrapper does not hold the box).

| Step | Observed (literal, from the results file) | Result |
|---|---|---|
| W1 editor loads signed out | `https://hooks.gg/message/m/0/edit`, the editor with an author avatar edit control | PASS |
| W2 click the avatar edit control | dialog text `Enter Image URL / Image URL / Cancel / Clear / Save`, 1 input | PASS |
| W3 type GOOD (`…/embed/avatars/0.png`) | preview `src` = GOOD, Save enabled | PASS |
| W4 Enter with the cursor in the box | focus was on the `INPUT` before the key; the dialog closed; the avatar `src` = GOOD | PASS (flow 1, QAF-2 and limb 5, on the production build) |
| W5 focus after the close | at the press: still the input, dialog still in the DOM; at 400 ms: a `BUTTON` outside the dialog | RECORD (F-7, below) |
| W6 reopen | box = GOOD, preview = GOOD | PASS (flow 6) |
| W7 type BAD (404) | text includes "Image not found.", no preview image, Save disabled | PASS (flow 3 and limb 2, by load) |
| W8 Enter with BAD in the box | dialog stayed open, avatar still GOOD | PASS (limb 1: a failed address cannot be saved) |
| W9 Cancel | dialog closed, avatar still GOOD | PASS (flow 6) |

**QA's Assumption Not Checked is closed**: the production build runs the component as `next dev` did on these paths (Enter in the box saves; a 404 address is refused and shows "Image not found."). Not walked on production: flows 2, 4, 5, 7, 8 and 9 (each was walked, or covered by cases, at QA; 9 needs a JSON load or a second tab), and the other four dialogs. Those are not owed here.

**F-7.** W5 read focus only at the press and at 400 ms, so the leave's 75 ms window was not sampled, and the walk drove Enter only. It agrees with F-7's premise that focus stays inside the closing panel through its leave. One changelog row records it in the handoff (`handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`, 2026-11-23T18:43); the handoff stays `Open`.

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

Put to him directly by this session as a selection prompt (Phase 2B), after the Stage 1 checks, the tip build and the dry run. The prompt opened with the context (the fix, the five dialogs, what the live site does today), then quoted his nine flows as the fixer wrote them, then said what was not tested (the production build; every walk ran on a local development copy), what I would check on the live site, that Vercel's link to the repository was read from earlier releases and not read itself, that the release repairs no stored message, and the rollback (promote this afternoon's live version in Vercel). It stated no commit ID or branch name. Options: release now (Recommended), hold, abort. **Response: "Agent: release it now (Recommended)"**, by selection, before 18:35:40Z. Declined: no.

## Release Execution

Mode A, in this session. `release-move.js` exit 0, 18:35:47Z to 18:36:07Z; origin `master` = `5ec06212d73073ab556e46582c3b23e3468da3a3`, read by `git ls-remote origin refs/heads/master` at 18:36:12Z. Push ref `master`, SHA `5ec0621`, timestamp 18:36:07Z.

**Deploy evidence.** The production deployment itself, as the brief asks: Vercel created `dpl_45ocUDV5PtYtxBUUhBTc2CBMyWZp` at 18:36:10Z, 3 s after the push, built from `master` at commit `5ec0621` (its own build log), Ready, aliased to hooks.gg, which answered HTTP 200 at 18:38Z. The push is the deployment evidence in any case; the Vercel read adds the commit and the Ready state. Serving state is not marked NOT VERIFIED anywhere.

## Phase 2D: release metadata and reconciliation

Standing note: point-in-time as of 2026-11-23T18:44Z; the serving line may have moved since, and later records are authoritative on their own refs.

| Field | Value |
|---|---|
| Release identifier | website `master` → `5ec06212d73073ab556e46582c3b23e3468da3a3` (no version field, no tags; none created) |
| Environment / serving ref | production: Vercel project `hooks-gg-website`, deployment `dpl_45ocUDV5PtYtxBUUhBTc2CBMyWZp` (`hooks-gg-website-fh9ge0169-hooks-gg.vercel.app`), aliased to hooks.gg; serving ref `master`, the sole serving ref (`release-move.js --report`: one serving ref, no pair) |
| Release date | 2026-11-23, pushed 18:36:07Z; deployment created 18:36:10Z, Ready by 18:36:43Z |
| Execution mode | Mode A, agent-executed, in this session |
| Authorizer | the owner, by selection at the Phase 2B prompt, before 18:35:40Z |
| Included plans | none; chain `fix-image-uploader-url` only (fixer route, `ID: n/a`) |
| Repositories and SHAs shipped | `website` only: `af3d95a` → `5ec0621` (13 commits: `cfd3b7f`, `03164d5`, `ee87897`, `7660259`, `a8b23ce`, `e94baf7`, `2217a92`, `b97f79c`, `cae7472`, `7f0229c`, `96fb1f8`, `48c5e87`, `5ec0621`). `agent-output` is the record, not a shipped repository |

**Deployed against verified, per repository (website).** Deployed ref `master`; the pushed commit is `5ec0621`, read from `ls-remote` after the move (18:36:12Z) and again by `git merge-base --is-ancestor 5ec0621 origin/master` exit 0 (fetched 18:44Z, `origin/master` = `5ec06212…`). Vercel's own build log names the same commit ("Cloning github.com/hooks-gg/website (Branch: master, Commit: 5ec0621)"). QA Phase 2's `Verified-At` is `5ec0621`, and so is the code review's `Reviewed-At`. **The same commit**, so no diff of the surface is owed.

**Fix branch.** `chain/fix-image-uploader-url` was merged (`git branch -d` exit 0, which refuses an unmerged branch) and is gone (`git show-ref --verify` exit 1). It was never pushed (`ls-remote --heads origin 'chain/*'`: 0 lines).

**Architecture line (routed to the architect; steering lodges it at closure, per the brief).** `architecture/system-architecture.md` line 134 ("Dialog Enter (plan 017 M8)") and the risk row at line 222 ("Enter-to-confirm in dialogs rests on an unidentified mechanism") describe `useDialogEnter`. This release changes it: a new optional third parameter, `enableOnFormTags` (typed from `react-hotkeys-hook`'s `Options['enableOnFormTags']`), passed to the library. `ImageUploader` passes `['input']`; `WarningDialog` and `ConfirmationDialog` pass nothing and behave as before (QA's two-tree differential, `qa/closed/fix-image-uploader-url-qa.md`, "Shared-hook differential"). So Enter in the image dialog's address box now answers, and line 134's "answers only while enabled and only when focus sits inside the dialog" still holds. The library's form-field filter (5.2.4: the handler returns early when the event's target is a form tag unless `enableOnFormTags` names it) is a mechanism the risk row had not named, for the "Enter in a form field" part only; its open part ("Enter on a focused Cancel does not run confirm", the code that stops it unread) is unchanged. The notice is mine; whether either line is edited is the architect's.

**Roadmap.** `agent-output/roadmap/` holds only `.gitkeep`, and the determination names no epic or criterion, so a `fix-` chain owes no roadmap entry (Phase 2D step 6).

## Chain documents and terminal tokens (Phase 2D steps 2b, 5b, 5c)

Enumerated by `grep -rl "^Origin: fix-image-uploader-url" --include=*.md` over the record (excluding `verification/` and `steering/`): four documents. No release-tip QA record exists (the Phase 2 verdict covers the tip, as above), so step 2b has none to close.

| Document | Terminal token | Where |
|---|---|---|
| `implementation/fix-image-uploader-url-implementation.md` | Released | `implementation/closed/` |
| `code-review/fix-image-uploader-url-code-review.md` | Committed | `code-review/closed/` |
| `qa/fix-image-uploader-url-qa.md` (Phase 2) | Committed | `qa/closed/` |
| this deployment record | Released | `deployment/closed/` |
| `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md` | Open (not this chain's; one changelog row added for F-7) | `handoff/` |

**Other `fix-` chains carried by this tip.** A python read over `implementation/**` documents whose `Handoff-At` names a website SHA that is an ancestor of `5ec0621` and whose `Status` is not `Released` lists nine plan-015 milestone documents (`015-bug-evaluation-fixes-*`, `Committed`, released earlier by their own plan chain, not `fix-` chains) and this chain. No other `fix-` chain is open. The handoffs this chain answered: its scoping block names none (its source is `research/codebase-bug-evaluation-2026-11-08.md:174`, a research document, not a handoff), so there is no source handoff to list. The two `Resumption State` sections: none in any chain document (`grep -c "## Resumption State"` over the three, 0).

**Forward items beyond the register**, by `grep -l 'Assumption Not Checked'` over the chain's documents (the code review and the QA document; the implementation document has 0):
- Code review Round 1 (a real `Image` fires one of `onload` or `onerror`): discharged by QA's browser walks (flows 3 and 8, then 1 and 9) and by this release's walk (W3, W7).
- Code review Round 2 (the reload and JSON load change the dialog's `image` prop while it stays mounted): discharged by QA (flow 9, and the open-dialog case at `5ec0621`).
- Code review Round 3 (Enter in the box reaches the hotkey listener): discharged by QA flow 1 on a local build and by W4 on production.
- QA, first section (no path changes a consumer's saved image while its dialog is mounted, other than Save): the reachable paths were found and fixed in-chain (QAF-3, QAF-4); the walk covered the JSON load and Reload.
- QA, `48c5e87` section (a real image load started by the sync settles like one started by typing): walked at `5ec0621` (JSON load to a 404 address: "Image not found.", Save off, Clear on).
- QA, `5ec0621` section (the production build): closed by this record's walk.
- Routing phrases ("routed to", "rides", "later") over the three documents: the only carried items are F-7 (above) and the architecture notice (above). QAF-2's product question was ruled by him (limb 5). No Risks table or Planner batch exists (fixer chain).

## Post-Release Status

**Status:** Deployment Complete, 2026-11-23T18:44Z (record written to that minute). Production serves hooks.gg from deployment `dpl_45ocUDV5PtYtxBUUhBTc2CBMyWZp`, built from `master` at `5ec0621`, Ready; the post-release walk passed on production.

**Known issues / limits:**
- The release repairs nothing already saved (the fixer's Residue section, above). Stored messages whose avatar, author icon, footer, image or thumbnail address was not the one the box showed at Save keep the saved address, and nothing in the data tells them from an intended one. Whether any matter is his to judge, since it is production data.
- A browser tab opened before the deploy keeps the old behaviour until it reloads.
- Not walked on production: flows 2, 4, 5, 7, 8 and 9 and the four other dialogs (each was walked or covered by cases at QA).
- F-7 (handoff 017) stays open with a partial read.
- A mechanism accepted as written: that a push of `master` deploys through Vercel's git integration. The build log read in this release ("Cloning github.com/hooks-gg/website (Branch: master, Commit: 5ec0621)") evidences it for this push.

**Rollback plan.** The reversing patch applies (`git apply --check -R`, exit 0, `rollback-reverse-patch-5ec0621.diff`). The first move is the owner's in Vercel: promote the previous production deployment `hooks-gg-website-567m70ejp-hooks-gg.vercel.app` (`dpl_5KTYPBL5YPCGZxvcobtAAcbQCBw5`, created 15:24:13Z, the production deployment before this release; its source commit was not read), which takes effect without a code change; the next push of `master` would deploy over it again. A code rollback is a new revert commit pushed as a fast-forward, a new ask. Nothing is sent to anyone by an agent; whom to tell is his.

## Next Actions

| Item | Carrier |
|---|---|
| The architecture notice above (lines 134 and 222) | steering lodges it at closure (the brief); the text is in this record and in the closing message to `steering-hooks-fixer` |
| F-7's remaining read (the 75 ms leave window; Escape or Cancel on a delete warning) | `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`, `Open`, `Owning-Stage` UAT; trigger text unchanged |
| His own check of the live data for messages saved wrong before this release | his; no row, no schedule (the fixer's Residue section, "Who checks the live state: the owner") |
| Post-deploy rows | none were registered (QA register: no rows), so no carrier handoff was created at Stage 1 and no timed read is scheduled |

## Disclosed in this round

- The `python3` replace script used for the runbook cells (changelog row, 18:39).
- The stamp gate refused my first row in handoff 017 (I typed 18:44 against a clock of 18:43Z). I corrected the stamp from `date -u` (18:43), which satisfies the gate, and changed no other text.
- The helper's walk failed on a signed-in profile; I ran the signed-out walk myself (under "Post-release walk: result").
- Vercel's CLI hung at the 60 s timeout several times across the round: the first two production listings returned nothing and the third returned (three tries, the brief's two retries); later `vercel ls --prod` and one `vercel inspect` also hung once each and the inspect was re-run once. No hang was treated as a control. `vercel inspect --logs` is not an option of CLI 29.1.1 ("unknown or unexpected option"), so the build log was read with `vercel logs`.
