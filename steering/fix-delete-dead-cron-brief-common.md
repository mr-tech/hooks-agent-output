# Brief, common part — fixer chain `fix-delete-dead-cron`

From `steering-hooks`, written 2026-11-21T20:26Z at the determination. Every brief of this chain names this file second, after its
`Duties negated:` line, and adds only what is its stage's own. tmux category: `fix-delete-dead-cron`.

## Determination and stage set

- His words and the determination (scope statement, write set, exclusions, what the sweep did not cover):
  `/usr/local/bin/hooks/agent-output/steering/fix-delete-dead-cron-rulings.md`, blocks "2026-11-21T20:26" (both). The blocks govern.
- Stage set, quoted: "`fixer-fix-delete-dead-cron` → `code-reviewer-fix-delete-dead-cron` (the change adds no production lines, under 20:
  the reviewer also runs the suite and typecheck) → devops for website `master` (his word). No plan, critic, Phase 1, QA or UAT."
- End step: website `master`, which Vercel deploys to production (no `.github/workflows`). His word, asked by devops in its own session.
- Source: `/usr/local/bin/hooks/agent-output/handoff/cron-endpoint-key-is-a-fixed-value-2026-11-19.md` (4bc9b626).
- Sweep: `/usr/local/bin/hooks/agent-output/verification/fix-delete-dead-cron/scoping/sweep-origin-0c14d5b.md` (at `0c14d5b`); the
  older `scoping/sweep.md` is the morning's inventory read at `76da25c`.

Repositories: `/usr/local/bin/hooks/website` (branch `chain/fix-delete-dead-cron`, cut by steering from `origin/master` `0c14d5b`, no
upstream) and `/usr/local/bin/hooks/agent-output` (the record). `/usr/local/bin/hooks` is not a repository: use `git -C <repo>`.

## Standing prohibitions relied on (quoted whole)

From `/home/dev/.claude/CLAUDE.md`, "Outbound messages":

> **A message that reaches a real person is mine to send.** Customers, users, staff and the public — any other Discord server, a DM,
> modmail, a support thread, a forum, email, a ticket reply — get nothing from an agent.

His rule on the record (`/home/dev/.claude/projects/-usr-local-bin-hooks/memory/no-security-blocks-in-record.md`), his words:

> agents are never to lodge in agent-output safeguard and other security blocks. if they need to note a failure, they must just say
> that the action was not completed without stating why

His standard for questions put to him (effort rulings `steering/fixer-queue-2026-11-21-rulings.md` block "2026-11-21T18:37Z"): context
first, then the decision, plain English, no commit IDs or technical detail he would have to look up.

Secret files: preview-image-generator's `.github/` is guarded by the secret-file gate; this chain needs nothing there. Never read a
`.env*` value. Never use the bare word `none` (or a path ending `/none`) as a command operand — a hook refuses it. Any refused call: stop,
message `steering-hooks`, never re-issue it in another form; the record says only "not completed". Record documents are written with
Write/Edit or `record-edit.js`, never a shell heredoc. Test Conventions: `/usr/local/bin/hooks/agent-output/CLAUDE.md`. Suite runs are
memory-capped (`systemd-run --user --scope -p MemoryMax=8G …`; `ulimit -v` breaks vitest).

## Architecture

`/usr/local/bin/hooks/agent-output/architecture/system-architecture.md` L172 names the cron; the chain makes it stale. Not edited by any
stage: steering lodges it for the architect at closure.

## Hazard-bearing analysis (each a candidate to re-derive)

1. `vercel.json` holds only the `crons` key at `0c14d5b`: removing the key leaves `{}`; deleting the file changes Vercel's project
   defaults only if the file set any other — it sets none. Record which, and why.
2. `pnpm remove cron-parser` may re-resolve other lockfile entries; the lockfile diff should touch only `cron-parser`'s subtree. Run with
   the repo's pinned pnpm.
3. A cron may also be configured in Vercel's dashboard, outside `vercel.json` (unread). Devops can list deployments and read build logs
   with the Vercel CLI, look-only (his selection, effort block "2026-11-21T19:02"); the dashboard cron list is not one of those reads.
4. Any `ScheduledMessages` row still unsent in production never sends after the deploy (his selection A, block 20:26). The message
   pages keep showing such rows' stored `sent`/`sendAt` values.
5. The deleted test imports `makeRes` from `src/server/api/__tests__/helpers/apiResponse.ts`; the helper keeps other importers.

## What this brief did not check

Production rows; Vercel dashboard cron settings; writers outside the four repos; the preview-image-generator zero.
