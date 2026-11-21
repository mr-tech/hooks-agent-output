Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-delete-dead-cron-brief-common.md` — read it whole first.

From `steering-hooks`, 2026-11-21T20:48Z. You are `devops-fix-delete-dead-cron`. Release fixer chain `fix-delete-dead-cron` (website)
per your definition: Stage 1 now; Stage 2 only on the owner's release approval, which you ask him for in this session (the push to
website `master` deploys to Vercel production).

## Gate documents (anchors copied at compose time)

- Fixer: `implementation/fix-delete-dead-cron-implementation.md`, `Handoff-At: 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 — repos=website`
  (record `7c99ece6`).
- Code review: `code-review/fix-delete-dead-cron-code-review.md`, `Reviewed-At: 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 — repos=website`
  (record `0c6cd42c`, round 1 APPROVED, no findings). No QA in this chain's stage set (0 production lines added): the reviewer ran the
  suite (2358/2358, exit 0) and typecheck (exit 0) in an export of `132a7ab`.

## Trees and refs (read by steering 20:48Z)

- Website `/usr/local/bin/hooks/website` on `chain/fix-delete-dead-cron` (head `132a7ab`, no upstream), cut from `origin/master`
  `0c14d5b`; `git ls-remote origin master` read `0c14d5bed78f…` at 20:48Z. Porcelain `?? .playwright-mcp/` only (not this chain's).
- No `.github/workflows`. The determination's `release-move.js … --dry-run` (20:26Z) passed; re-run it at your tip.
- The reviewer's side note: the shared tree's `.next/types/validator.ts` (gitignored, stale) still names `cron.ts`, so a `pnpm run
  typecheck` in the live tree fails until `next typegen` or a build regenerates it; Vercel builds from a clean checkout. Whose `.next`
  it is was not read — treat it as shared-tree state another session placed.

## Decisions and carriers for your forward-item sweep

- Rulings: `/usr/local/bin/hooks/agent-output/steering/fix-delete-dead-cron-rulings.md` — blocks 20:26 (his two selections; the
  determination), 20:27, 20:41; no plan or Decisions Register.
- Assumption Not Checked: `code-review/fix-delete-dead-cron-code-review.md` § "Assumption Not Checked" (production carries no cron: an
  absent `vercel.json` gives no cron config and no dashboard cron exists; plus the deploy host's pnpm major from the build log). The fixer's
  document: read its own section, if any.
- Carriers the scoping block names: source `handoff/cron-endpoint-key-is-a-fixed-value-2026-11-19.md` (4bc9b626; its Review-Trigger fires on
  this edit of `cron.ts`) — steering closes it after the post-deploy reads, not you; the architecture record's L172 — steering lodges it.

## Instruments you hold

- Vercel CLI, look-only (his selection, effort rulings `steering/fixer-queue-2026-11-21-rulings.md` block "2026-11-21T19:02"): from the
  website dir with stdin closed, `vercel ls --prod`, `vercel inspect <url>`, and `vercel logs <url>` (CLI 29.1.1 returns the build log,
  which names the built commit and the pnpm used). Never deploy, change settings or read secret values. Whether `inspect` shows a
  deployment's crons is unread — try it; the dashboard Cron Jobs list itself is the owner's read where no command shows it.

## Hazards (each a candidate to re-derive)

1. A dashboard-configured cron, outside `vercel.json`, would keep calling `/api/cron` daily (now a not-found). Unread.
2. Any unsent `ScheduledMessages` row never sends (his selection 20:26, A). The fixer's **User-visible flows** list
   (`implementation/fix-delete-dead-cron-implementation.md` § "User-visible flows") is quoted to him with the release.
3. His standard for questions to him (effort block "2026-11-21T18:37Z"): your release ask opens with the context, then the decision, in
   plain English, with no commit IDs, tool or branch names; the flows in his words. The verbatim detail goes in your record.
4. Avoid a bare `none` operand; a call not completed → stop and message `steering-hooks`, never re-issue; the record says only "not completed".

## Routing

- Owner-needing items you are not asking him yourself, and spawn cues: SendMessage to `steering-hooks`.
- Stage 1 completion and the Stage 2 / post-deploy outcome: to `steering-hooks` by SendMessage.
- Your document under `deployment/`; evidence under `verification/fix-delete-dead-cron/devops/`.
