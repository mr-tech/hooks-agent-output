# Brief, common part — fixer chain `fix-recent-message-ids`

From `steering-hooks`, written 2026-11-21T05:43Z at the determination. Every brief of this chain names this file second, after its
`Duties negated:` line, and adds only what is its stage's own. Rulings: `steering/fix-recent-message-ids-rulings.md`. tmux category:
`fix-recent-message-ids`.

## Determination and stage set

- His word: `/usr/local/bin/hooks/agent-output/steering/fixer-queue-2026-11-21-rulings.md`, block "2026-11-21T05:32Z" (relayed by the
  coordinator), and the order, block "2026-11-21T05:38Z".
- Scoping determination, the bounded scope statement, the write set, exclusions and what the sweep did not cover:
  `/usr/local/bin/hooks/agent-output/steering/fix-recent-message-ids-rulings.md`, block "2026-11-21T05:43Z". The block governs.
- Stage set, quoted from that block: "`fixer-fix-recent-message-ids` → `code-reviewer-fix-recent-message-ids` (and QA Phase 2,
  `qa-fix-recent-message-ids`, only if the fix adds 20 or more production lines; under 20 the reviewer also runs the suite and the red
  test) → devops for website `master` (his word). No plan, critic, Phase 1 or UAT."
- End step: website `master`, which Vercel deploys to production (no `.github/workflows` in website). His word is needed, asked by
  devops in its own session.
- Sources: `/usr/local/bin/hooks/agent-output/handoff/hydrated-recent-list-returns-guild-message-rows-2026-11-19.md` and
  `/usr/local/bin/hooks/agent-output/handoff/update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md`. The chain's
  closure discharges both.

Repositories: `/usr/local/bin/hooks/website` (the change, branch `chain/fix-recent-message-ids`, cut by steering from `origin/master`
`76da25c`, no upstream) and `/usr/local/bin/hooks/agent-output` (the record). `/usr/local/bin/hooks` is not a repository: use
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

Never point a test or a probe at the database `website/.env.local` names: a database a test runs against is a throwaway container
(the record's `verification/fix-personal-message-access/pg/run-pg.sh` pattern) or the fake kysely driver. Screenshots and captured
media stay untracked. Test Conventions: `/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Test Conventions (`website`)".

## Architecture

- Evergreen record: `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md`. A change to what it states about session
  hydration or guild authorisation goes to the architect through `agent-output/INBOX.md`.
- Per-repo record: `/usr/local/bin/hooks/agent-output/architecture/website.md`.

## Hazard-bearing analysis (each a candidate to re-derive)

1. Authorised-for-a-guild is `authorizeGuildAdmin.ts:40` over `redis.fetchUserGuilds`' owner/Administrator-trimmed list
   (`redis/index.ts:220-243`); the hydration already fetches that list beside the message query (`auth.ts:153-156`, `Promise.all`),
   so the filter may need the guild list before or after the query — the fixer's design choice. In development `auth.ts` pushes a fake
   guild `id: '1'`.
2. `Guilds.guildId` (the Discord id) is what the row carries as `guildId`; the session's guild list carries Discord ids as `id`.
   Which column joins to which is read, not assumed.
3. `messagePromise.catch(() => {})` (`auth.ts:139`) does not stop `Promise.all` rejecting, so a refused query still fails the session
   (handoff af63220f's reviewer run).
4. `shared.in-predicates.test.ts` asserts the guild arm's present form; a fix that changes the arm changes that case, which is a test of
   the old behaviour and is re-stated, not deleted, under Test Conventions.
5. A real-postgres red test needs a throwaway container (sweep, "Postgres infrastructure"); the fake driver cannot show postgres's int8
   refusal.

## What this brief did not check

- Any production count of stored foreign or bad ids; other writers of `Users.preferences`; the guild cache's 600-second lifetime.
