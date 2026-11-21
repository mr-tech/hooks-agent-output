# Brief, common part — fixer chain `fix-message-not-found`

From `steering-hooks`, written 2026-11-21T06:46Z at the determination. Every brief of this chain names this file second, after its
`Duties negated:` line, and adds only what is its stage's own. Rulings: `steering/fix-message-not-found-rulings.md`. tmux category:
`fix-message-not-found`.

## Determination and stage set

- His words: `/usr/local/bin/hooks/agent-output/steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-21T05:50Z" (Q1) and
  "2026-11-21T05:55Z", both quoted in the determination.
- Scoping determination, the bounded scope statement, the write set, exclusions and what the sweep did not cover:
  `/usr/local/bin/hooks/agent-output/steering/fix-message-not-found-rulings.md`, block "2026-11-21T06:46Z". The block governs.
- Stage set, quoted from that block: "`fixer-fix-message-not-found` → `code-reviewer-fix-message-not-found` (and QA Phase 2,
  `qa-fix-message-not-found`, only if the fix adds 20 or more production lines; under 20 the reviewer also runs the suite and the red
  tests) → devops for website `master` (his word). No plan, critic, Phase 1 or UAT; the fixer's **User-visible flows** list is quoted
  to him with the release."
- End step: website `master`, which Vercel deploys to production (no `.github/workflows`). His word is needed, asked by devops in its
  own session.
- Sources (the chain's closure discharges all three): `handoff/get-one-absent-number-fails-without-not-found-2026-11-19.md`,
  `handoff/editor-shows-blank-shell-when-personal-message-load-is-refused-2026-11-20.md`,
  `handoff/deleted-message-url-serves-blank-editor-2026-11-20.md` (all under `/usr/local/bin/hooks/agent-output/`).

Repositories: `/usr/local/bin/hooks/website` (the change, branch `chain/fix-message-not-found`, cut by steering from `origin/master`
`6f76c6d`, no upstream) and `/usr/local/bin/hooks/agent-output` (the record). `/usr/local/bin/hooks` is not a repository: use
`git -C <repo>` on every call. The permitted write set is the determination block's; anything else is a re-scope: stop and message
`steering-hooks`.

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

- Evergreen record: `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md` (lines 136 and 213 per the sweep). A change
  to what it states goes to the architect through `agent-output/INBOX.md`.
- Per-repo record: `/usr/local/bin/hooks/agent-output/architecture/website.md`.

## Hazard-bearing analysis (each a candidate to re-derive)

1. Uniform answer: today absent → a non-TRPCError (500), another user's → NOT_FOUND, an unmanageable server's → FORBIDDEN (raised inside
   `authorizeGuildUser`/`authorizeGuildAdmin`, which also raise UNAUTHORIZED on a session or guild-fetch failure and a plain Error when
   Discord's guild list is not an array, `redis/index.ts:230`). Only the "cannot see it" answers become NOT_FOUND; a failure to reach
   Discord is not "not found" — which errors map is the fixer's design, stated in its document.
2. The message text must match across the three cases too (today "This message does not exist." at `message.ts:65`), or the text tells
   them apart.
3. `getGuild` (`guild.ts`) maps NOT_FOUND to null; `authorizeGuildAdmin` must therefore stay as it is (his 05:55Z selection).
4. Retry: react-query retries 3 times by default with backoff; the observed production page made four requests on a 404 (handoff
   "editor-shows-blank-shell…", line 17). A per-query `retry` that refuses 4xx is local to `getOne`'s queries.
5. The send page and the editor header ("New Message", `Navigation.tsx:318`) both read the message; the not-found state is the page's,
   not a "new message".

## What this brief did not check

- `useApiMethods`/`usePusher` refetch paths after a refusal; `WebhookProvider`'s Discord-message loads; behaviour signed out.
