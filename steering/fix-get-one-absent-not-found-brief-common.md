# Brief, common part — fixer chain `fix-get-one-absent-not-found`

From `steering-hooks`, written 2026-11-21T08:57Z at the determination. Every brief of this chain names this file second, after its
`Duties negated:` line, and adds only what is its stage's own. Rulings: `steering/fix-get-one-absent-not-found-rulings.md`. tmux
category: `fix-get-one-absent-not-found`.

## Determination and stage set

- His words: `/usr/local/bin/hooks/agent-output/steering/fixer-queue-2026-11-21-rulings.md`, block "2026-11-21T07:59Z", quoted in the
  determination.
- Scoping determination, the bounded scope statement, the write set, exclusions, the post-deploy row and what the sweep did not cover:
  `/usr/local/bin/hooks/agent-output/steering/fix-get-one-absent-not-found-rulings.md`, block "2026-11-21T08:57Z". The block governs.
- Stage set, quoted from that block: "`fixer-fix-get-one-absent-not-found` → `code-reviewer-fix-get-one-absent-not-found` (and QA Phase
  2, `qa-fix-get-one-absent-not-found`, at 20 or more added production lines; under 20 the reviewer also runs the suite and the red
  tests) → devops for website `master` (his word). No plan, critic, Phase 1 or UAT; the fixer's **User-visible flows**, each with its
  evidence, are quoted to him with the release."
- End step: website `master`, which Vercel deploys to production (no `.github/workflows`). His word is needed, asked by devops in its
  own session.
- Sources: `/usr/local/bin/hooks/agent-output/handoff/get-one-absent-number-still-500-in-production-2026-11-21.md` (UUID 7c3e91a4) and
  post-deploy B-1 in `/usr/local/bin/hooks/agent-output/handoff/fix-message-not-found-post-deploy-2026-11-21.md`; both close only
  after the post-deploy re-read.

Repositories: `/usr/local/bin/hooks/website` (the change, branch `chain/fix-get-one-absent-not-found`, cut by steering from
`origin/master` `b829314`, no upstream) and `/usr/local/bin/hooks/agent-output` (the record). `/usr/local/bin/hooks` is not a
repository: use `git -C <repo>` on every call. The permitted write set is the determination block's; anything else is a re-scope:
stop and message `steering-hooks`.

## Standing prohibitions relied on (quoted whole)

From `/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Local builds of `website` — before the first save":

> A locally served build publishes its save event to the Pusher app named in `website/.env.local`, on the channel
> `message-update-<message id>`, and a fresh local database numbers messages from 1. Whether that Pusher app is production's is not
> established on this box, so treat it as production's: a local save on a low id can raise "Message Update Detected" for a real user
> editing the production message with the same id.
>
> **Before any save on a local build, move the local message ids out of production's range**:
>
> ```sql
> ALTER SEQUENCE "Messages_id_seq" RESTART WITH 900000000000001;
> ```
>
> Run it after the schema is pushed and before the first save, and record in the stage document the id range the walk wrote. A local
> database that already holds low-numbered messages is recreated, not reused. `.env.local` holds credentials: read key names, hosts and
> ports only, never a value.

From `/home/dev/.claude/CLAUDE.md`, "Outbound messages":

> **A message that reaches a real person is mine to send.** Customers, users, staff and the public — any other Discord server, a DM,
> modmail, a support thread, a forum, email, a ticket reply — get nothing from an agent.

His standing rule on the record (`/home/dev/.claude/projects/-usr-local-bin-hooks/memory/no-security-blocks-in-record.md`), his words:

> agents are never to lodge in agent-output safeguard and other security blocks. if they need to note a failure, they must just say
> that the action was not completed without stating why

Secret files: preview-image-generator's `.github/workflows/prod.yml` is flagged by the secret-file gate, which refuses line-printing
`grep`/`git grep` calls that could reach it. This chain needs nothing in preview-image-generator: keep every search to `website` by
explicit path, report any refusal to steering by message, and never re-issue a refused call in another form.

Record documents are written with the Write or Edit tool (or `record-edit.js`), never a shell heredoc (the record-write gate). Never
point a test or a probe at the database `website/.env.local` names: a test database is a throwaway container or the fake kysely
driver. Screenshots and captured media stay untracked. Test Conventions: `/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Test
Conventions (`website`)" — component tests mount with `createRoot`/`act` under the DOM project.

## Architecture

- Evergreen record: `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md`. A change to what it states goes to the
  architect through `agent-output/INBOX.md`.
- Per-repo record: `/usr/local/bin/hooks/agent-output/architecture/website.md`.

## Hazard-bearing analysis (each a candidate to re-derive)

1. **The escaped method failure (batch retrospective `retrospectives/fixer-batch-2026-11-21-b-retrospective.md`, lesson 1):** chain 2's
   fixer, reviewer and QA all faked `getPostgres` with the ESM kysely, so all three agreed by construction. No stage of this chain
   accepts a red test whose error is raised by the same kysely build the code under test imports. Reuse the real-postgres probe
   (`verification/fix-recent-message-ids/code-review/recent.pg.test.ts` imports project-utils' real `getPostgres`; `run-probe.sh`).
2. The Node-level cause is established (effort block 07:59Z; probe files in steering-hooks' scratchpad `refute-noresult/`); whether
   the Next server bundle resolves both imports to one build was not shown. The fix must hold under either.
3. Chain 2's text and code must stay uniform across the three cases (its hazard 2); a fix that answers "no row" through a different
   path must keep the one text.
4. The header (`_layout/Navigation.tsx:418-429`) decides by path alone; the not-found state lives in `MessageProvider`. `Send` falls
   back to `message?.id ?? 0` (`/message/m/0/send`).

## What this brief did not check

- The outer `/message` header; `SendMenuTitle`; how `isNotFound` is set; the Next bundle's module resolution.
