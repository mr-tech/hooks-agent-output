# Brief, common part — fixer chain `fix-middleware-dead-matcher`

From `steering-hooks-fixer`, written 2026-11-22T17:15Z at the determination. Every brief of this chain names this file second, after its
`Duties negated:` line, and adds only what is its stage's own. tmux category: `fix-middleware-dead-matcher`.

## Determination and stage set

- His words and the determination (scope statement, write set, exclusions, what the sweeps did not cover):
  `/usr/local/bin/hooks/agent-output/steering/fix-middleware-dead-matcher-rulings.md`, blocks "2026-11-22T01:49", "2026-11-22T16:59" and
  "2026-11-22T17:15" (the determination). The blocks govern.
- Stage set, quoted: "`fixer-fix-middleware-dead-matcher` → `code-reviewer-fix-middleware-dead-matcher` (under 20 production lines: the
  reviewer also runs the suite, typecheck and the red test) → devops for website `master` (his word, asked by devops in its own
  session). No plan, critic, Phase 1, QA or UAT; a production count of 20 or more restores QA Phase 2."
- End step: website `master`, which Vercel deploys to production (no `.github/workflows`).
- Sweeps: `/usr/local/bin/hooks/agent-output/verification/fix-middleware-dead-matcher/scoping/sweep.md` (the dead entry) and
  `.../scoping/sweep-proxy.md` (the file convention; installed and locked Next 16.4.6), both at `origin/master` `3859c29`.

Repositories: `/usr/local/bin/hooks/website` (branch `chain/fix-middleware-dead-matcher`, cut by steering from `origin/master` `3859c29`,
no upstream) and `/usr/local/bin/hooks/agent-output` (the record). `/usr/local/bin/hooks` is not a repository: use `git -C <repo>`.

## Standing prohibitions relied on (quoted whole)

From `/home/dev/.claude/CLAUDE.md`, "Outbound messages":

> **A message that reaches a real person is mine to send.** Customers, users, staff and the public — any other Discord server, a DM,
> modmail, a support thread, a forum, email, a ticket reply — get nothing from an agent.

His rule on the record (`/home/dev/.claude/projects/-usr-local-bin-hooks/memory/no-security-blocks-in-record.md`), his words:

> agents are never to lodge in agent-output safeguard and other security blocks. if they need to note a failure, they must just say
> that the action was not completed without stating why

His standard for questions put to him (effort rulings `steering/fixer-queue-2026-11-21-rulings.md` block "2026-11-21T18:37Z"): context
first, then the decision, plain English, no commit IDs or technical detail he would have to look up.

Never read a `.env*` value. Never use the bare word `none` (or a path ending `/none`) as a command operand. Any call not completed: stop,
message `steering-hooks-fixer`, never re-issue it in another form; the record says only "not completed". Record documents are written
with Write/Edit or `record-edit.js`, never a shell heredoc. Test Conventions: `/usr/local/bin/hooks/agent-output/CLAUDE.md`. Suite runs
are memory-capped (`systemd-run --user --scope -p MemoryMax=8G …`; `ulimit -v` breaks vitest). A local build saves nothing (no save
event is exercised by this chain; if one ever is, the CLAUDE.md id-range rule applies first).

## Architecture

Record passages describing the older middleware are history. No stage edits `architecture/`; steering lodges one entry at closure.

## Hazard-bearing analysis (each a candidate to re-derive)

1. Next 16 runs a proxy on Node.js only; the edge runtime is unsupported and a runtime export throws. The current file sets none. On
   Vercel the deployed `_middleware` today lists 19 regions (steering's `vercel inspect`, 07:28Z); after the rename its placement and
   latency are unmeasured.
2. A tree holding both `middleware.ts` and `proxy.ts` fails the build: the rename must leave no `middleware.*` convention file.
3. The header `x-pathname` has one consumer, `src/app/_navigation/Redirects/Server.tsx:5`; its pages (`/message`, `/message/*`,
   `/preview`) must still receive it.
4. `/api/guilds/(.*)` matches no route (the API sits under `/api/v1/guilds/`); its removal changes no status code (sweep's refutation:
   dev server with and without the entry).

## What this brief did not check

A real `next build` or `next dev` of the change; Vercel's handling of a Node proxy; Turbopack vs webpack on Vercel; the codemod's diff.
