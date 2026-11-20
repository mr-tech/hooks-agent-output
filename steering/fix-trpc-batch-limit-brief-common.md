# Brief, common part — fixer chain `fix-trpc-batch-limit`

From `steering-roadmap-hooks`, written 2026-11-20T23:5xZ at the determination. Every brief of this chain names this file second,
after its `Duties negated:` line, and adds only what is its stage's own. Rulings: `steering/fix-trpc-batch-limit-rulings.md`. tmux
category: `fix-trpc-batch-limit`.

## Determination and stage set

- His word: `/usr/local/bin/hooks/agent-output/steering/website-deps-review-rulings.md`, block "2026-11-20T23:44Z".
- Scoping determination, the bounded scope statement, exclusions and what the sweep did not cover:
  `/usr/local/bin/hooks/agent-output/steering/fix-trpc-batch-limit-rulings.md`, block "2026-11-20T23:57Z". The block governs.
- Stage set, quoted from that block: "`fixer-fix-trpc-batch-limit` → `code-reviewer-fix-trpc-batch-limit` (and QA Phase 2,
  `qa-fix-trpc-batch-limit`, only if the fix adds 20 or more production lines; under 20 the reviewer also runs the suite and the red
  test) → devops for website `master` (his word). No plan, critic, Phase 1 or UAT."
- End step: website `master`, which Vercel deploys to production (no `.github/workflows` in website). His word is needed, asked by
  devops in its own session.
- Source: `/usr/local/bin/hooks/agent-output/handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`, items 1 to 3.
  This chain's closure discharges those three items there; items 4 to 7 stay on it.

Repositories: `/usr/local/bin/hooks/website` (the change, branch `chain/fix-trpc-batch-limit`, cut by steering from `origin/master`
`d1bb9b0`, no upstream) and `/usr/local/bin/hooks/agent-output` (the record). `/usr/local/bin/hooks` is not a repository: use
`git -C <repo>` on every call. Permitted write set: website `src/pages/api/trpc/[trpc].ts`, `src/middleware.ts`,
`src/app/_navigation/Redirects/Server.tsx` (and the layout that mounts it, where the path source needs it), `package.json`, their
`__tests__/` files (new or existing, including `src/app/_components/__tests__/Providers.request-headers.test.ts`); in the record, the
stage's own document and `verification/fix-trpc-batch-limit/`. Anything else is a re-scope: stop and message steering.

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
`grep`/`git grep` calls even where they never aim at it. Name repositories and paths explicitly, use counts or listings where a
search could reach it, report any refusal to steering by message, and never re-issue a refused call in another form.

Screenshots and captured media stay untracked (`steering/017-rulings.md` block 2026-11-19T09:01Z). Test Conventions:
`/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Test Conventions (`website`)".

## Architecture

- Evergreen record: `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md` (lines 213 and 234 name `x-query-params`
  and `[trpc].ts`, the sweep's read). A change to what those lines state goes to the architect through `agent-output/INBOX.md`.
- Per-repo record: `/usr/local/bin/hooks/agent-output/architecture/website.md`.

## Hazard-bearing analysis (each a candidate to re-derive)

1. Batch measurement: `verification/018/security/out/requests-d1bb9b0.txt` §4 (1,050 calls accepted, 1,100 refused by Node's header
   limit) and `security/018-next-upgrade-save-size-cap-security-audit.md` (L-001). The installed `@trpc/server` 11.10.0 has
   `allowBatching` and no batch-size option (handoff item 1).
2. The site's client links: `httpLink` at `src/utils/api.ts:31`, `:46`, `src/providers/TrpcProvider.tsx:19` (sweep P1). If any page
   sends a batch, turning batching off breaks it; the fixer shows which holds.
3. `x-pathname`: `security/website-deps-review-security-audit.md` I-5; matcher `['/message/(.*)', '/api/guilds/(.*)', '/preview']`
   (sweep P2); whether the matcher covers a bare `/message` is unread.
4. `overrides`: audit I-6; sweep P3 (pnpm reads only `resolutions` and `pnpm.overrides`; six `semver` versions in the lock).

## What this brief did not check

- Vercel's request-size limits; any external caller of `/api/trpc`; the installed `node_modules`; a live request against the tip.
