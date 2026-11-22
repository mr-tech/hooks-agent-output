Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-cut-collapsed-caret-brief-common.md` — read it whole first. Its scope
statement is corrected by rulings block "2026-11-22T18:53": Cut with a collapsed caret that is not inside an emoji (inline void) deletes
nothing; Cut on an expanded selection, and on a clicked emoji, behaves as at base.

From `steering-hooks-fixer`, 2026-11-22T19:15Z. You are `devops-fix-cut-collapsed-caret`. Release fixer chain `fix-cut-collapsed-caret`
(website) per your definition: Stage 1 now; Stage 2 only on the owner's release approval, which you ask him for in this session (the push
to website `master` deploys to Vercel production).

## Gate documents (anchors copied at compose time)

- Fixer: `implementation/fix-cut-collapsed-caret-implementation.md`, `Handoff-At: 8845b7e — repos=website` (read 19:15Z).
- Code review: `code-review/fix-cut-collapsed-caret-code-review.md`, `Reviewed-At: 8845b7e3409782e0f07ecd36a818f48f4ebcc721 —
  repos=website` (record `de261824`, Round 1 sub-entry 1a, APPROVED; round 1 was REJECTED on CR-1, fixed). No QA in this stage set (5
  production lines): the reviewer ran the suite (2366/2366, exit 0), typegen + typecheck (exit 0) and the red test in exports.

## Trees and refs (read by steering 19:15Z)

- Website `/usr/local/bin/hooks/website` on `chain/fix-cut-collapsed-caret` (head `8845b7e`, no upstream), cut from `origin/master`
  `453de76`; `git ls-remote origin master` read `453de76187c5…` at 19:15Z. Porcelain `?? .playwright-mcp/` only (not this chain's).
- No `.github/workflows`. The determination's `release-move.js … --dry-run` on `master` `453de76` passed (18:49Z); re-run it at your tip.
- The shared tree's gitignored `.next/types/validator.ts` is stale: an in-tree `pnpm run typecheck` exits 2; Vercel builds clean. Leave it.

## Decisions and carriers for your forward-item sweep

- Rulings: `/usr/local/bin/hooks/agent-output/steering/fix-cut-collapsed-caret-rulings.md` — blocks 02:09 (his selection), 18:49 (the
  determination), 18:53 (the clicked-emoji correction), the hand-off block and the round-1 block (its last paragraph disposes the
  reviewer's Assumption Not Checked).
- Assumption Not Checked: the code review's § "Assumption Not Checked" (a real browser's Ctrl+X on a plain caret removes nothing). It is
  not queued for the owner: an agent performs it. **Post-deploy row:** on hooks.gg, signed out, in the blank message editor, a
  `browser-walker` helper (your subagent) types a short text, places a plain caret mid-word with nothing highlighted, presses Ctrl+X, and
  reads the text back — pass: unchanged; then highlights one word, presses Ctrl+X — pass: the word is gone. Nothing is saved. Record its
  table and captures under `verification/fix-cut-collapsed-caret/devops/`. If a real browser is not available to the helper, record the
  row as not run and say so to `steering-hooks-fixer`.
- The fixer's **User-visible flows** list (its document § "User-visible flows") is quoted to him with the release, in his words.
- Architecture: steering lodges any entry at closure.

## Instruments you hold

- Vercel CLI, look-only (his selection, effort rulings `steering/fixer-queue-2026-11-21-rulings.md` block "2026-11-21T19:02"): from the
  website dir with stdin closed, `vercel ls --prod`, `vercel inspect <url>`, `vercel logs <url>` (CLI 29.1.1 returns the build log). The
  CLI hangs intermittently: `timeout 60`; a hang is not a control — retry up to twice. `vercel inspect https://hooks.gg` gives the
  serving deployment's URL directly. Never deploy, change settings or read secret values.
- Public signed-out requests and the browser walk above, on hooks.gg, read-only.

## Hazards (each a candidate to re-derive)

1. Deploy evidence is the production deployment itself (Ready, built from your tip, serving hooks.gg), not the push.
2. His standard for questions to him (effort block "2026-11-21T18:37Z"): your release ask opens with the context, then the decision, in
   plain English, with no commit IDs, tool or branch names; the flows in his words. The verbatim detail goes in your record.
3. Never use the bare word `none` anywhere in a command. A call stopped by a control: stop and message `steering-hooks-fixer`, never
   re-issue; the record says only "not completed".

## Routing

- Owner-needing items you are not asking him yourself, and spawn cues: SendMessage to `steering-hooks-fixer`.
- Stage 1 completion and the Stage 2 / post-deploy outcome: to `steering-hooks-fixer` by SendMessage.
- Your document under `deployment/`; evidence under `verification/fix-cut-collapsed-caret/devops/`.
