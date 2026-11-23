Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-image-uploader-url-brief-common.md`. Read it whole first.

From `steering-hooks-fixer`, 2026-11-23T18:26Z. You are `devops-fix-image-uploader-url`. Release fixer chain `fix-image-uploader-url`
(website) per your definition. Run Stage 1 now. Run Stage 2 only on the owner's release approval, which you ask him for in this
session: the push to website `master` deploys to Vercel production.

Stage set, quoted from the determination (`steering/fix-image-uploader-url-rulings.md`, block "2026-11-23T15:54Z"):
"`fixer-fix-image-uploader-url` → `code-reviewer-fix-image-uploader-url` (under 20 production lines: the reviewer also runs the suite,
typecheck, red test) → QA Phase 2 at 20 or more → devops for website `master` (his word). No plan, critic, Phase 1 or UAT."

## Gate documents (take each anchor from its document at your start)

- Fixer: `implementation/fix-image-uploader-url-implementation.md` (`Handoff-At: 5ec0621 — repos=website`, record `a9614a7f`).
- Code review: `code-review/fix-image-uploader-url-code-review.md`, the Round 3 sub-entry APPROVED,
  `Reviewed-At: 5ec0621 — repos=website` (record `2240623c`).
- QA Phase 2: `qa/fix-image-uploader-url-qa.md`, QA Complete, `Verified-At: 5ec0621 — repos=website` (record `c70dddfc`, read by this
  thread 18:26Z). Re-read it there.

## Trees and refs

- Website `/usr/local/bin/hooks/website` on `chain/fix-image-uploader-url`, cut from `origin/master` `af3d95a` with no upstream. HEAD
  was `5ec0621` by `git rev-parse` at this brief's compose time. Re-read `git ls-remote origin master` and the porcelain at your start.
- `.github/workflows` does not exist (`ls`, 18:26Z this turn). Run `release-move.js … --dry-run` at your tip.
- After the release, the website tree passes to plan 019's chain on the coordinator's go. That switch is steering's, not yours.

## Decisions and carriers for your forward-item sweep

- Rulings: `/usr/local/bin/hooks/agent-output/steering/fix-image-uploader-url-rulings.md`, every block. They include:
  - his "fix all three" (04:44);
  - the determination (15:54Z);
  - CR-3 inside limb 1 (17:05Z);
  - QAF-3 in scope (17:22Z);
  - his selection "Enter in the box saves", limb 5 (17:40Z).
  The effort-wide file is `steering/fixer-queue-2026-11-21-rulings.md`.
- Assumptions Not Checked:
  - The code review's section, Rounds 1 to 3.
  - QA's section: every walk ran on `next dev`, not on Vercel's production build. QA routed it to you as a possible post-release look.
- **Post-deploy walk** (this thread's guidance; you decide whether it becomes a post-deploy row). On hooks.gg production's message
  editor, signed out and saving nothing, have a `browser-walker` helper (your subagent) open the author avatar's image dialog and do two
  things:
  1. Paste a well-formed image address. Once the preview shows, press Enter with the cursor still in the box: the dialog takes it.
  2. Paste an address that 404s: "Image not found." shows, and Save stays off.
  Captures go under `verification/fix-image-uploader-url/devops/` (screenshots uncommitted). If the dialog is not reachable signed out
  without a save, or no real browser is available, record the walk as not run and say so.
- The fixer's **User-visible flows** list (implementation document, § "User-visible flows") is quoted to him with the release.
- Architecture: steering lodges any entry at closure.

## Instruments you hold

- The Vercel CLI, look-only (his selection, effort rulings block "2026-11-21T19:02"). From the website dir with stdin closed, run
  `vercel ls --prod`, `vercel inspect <url>` and `vercel logs <url>`, each under `timeout 60`. The CLI hangs intermittently, and a hang is
  not a control, so retry up to twice. Never deploy, change settings or read secret values.
- Public signed-out requests and the browser walk above, on hooks.gg, read-only.

## Hazards (each a candidate to re-derive)

1. The deploy evidence is the production deployment itself (Ready, built from your tip, serving hooks.gg), not the push.
2. His standard for questions to him is effort block "2026-11-21T18:37Z". Your release ask opens with the context, then the decision,
   in plain English, with no commit IDs, tool names or branch names, and the flows in his words. The verbatim detail goes in your record.
3. The tip changes the shared `src/utils/hooks/useDialogEnter.ts` (8 lines added, 2 removed). QA's two-tree differential shows the
   warning and confirmation dialogs unchanged. Re-derive it if your release check reads behaviour.
4. Never use the bare word `none` anywhere in a command. On a call stopped by a control, stop and message `steering-hooks-fixer`, and
   never re-issue it. The record says only "not completed".
5. Usage: `weekly_all` was 28% (live, 18:26Z). The 98% weekly gate stands.

## Routing

- Owner-needing items you are not asking him yourself, and spawn cues: SendMessage to `steering-hooks-fixer`.
- Stage 1 completion and the Stage 2 or post-deploy outcome: to `steering-hooks-fixer` by SendMessage.
- Your document goes under `deployment/`. Evidence goes under `verification/fix-image-uploader-url/devops/`.
