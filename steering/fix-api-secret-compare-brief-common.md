# Brief, common part — fixer chain `fix-api-secret-compare`

From `steering-hooks`, written 2026-11-21T13:42Z at the determination. Every brief of this chain names this file second, after its
`Duties negated:` line, and adds only what is its stage's own. Rulings: `steering/fix-api-secret-compare-rulings.md`. tmux category:
`fix-api-secret-compare`.

## Determination and stage set

- His words: `/usr/local/bin/hooks/agent-output/steering/fix-api-secret-compare-rulings.md`, block "2026-11-21T13:39Z" (three
  selections: refuse an empty or unset bot token; the id rider; the handoff's items 3 and 5). Effort order:
  `/usr/local/bin/hooks/agent-output/steering/fixer-queue-2026-11-21-rulings.md`, block "2026-11-21T05:50Z".
- Scoping determination, the bounded scope statement (five items), the write set, exclusions and what the sweep did not cover: the
  same rulings file, block "2026-11-21T13:42Z". The block governs.
- Stage set, quoted from that block: "`fixer-fix-api-secret-compare` → `code-reviewer-fix-api-secret-compare` (and QA Phase 2,
  `qa-fix-api-secret-compare`, only at 20 or more added production lines; under 20 the reviewer also runs the suite and the red tests)
  → devops for website `master` (his word). No plan, critic, Phase 1 or UAT; the fixer's **User-visible flows** list is quoted to him
  with the release."
- End step: website `master`, which Vercel deploys to production (no `.github/workflows`). His word is needed, asked by devops in its
  own session.
- Source (items 2, 3 and 5 discharged by this chain; item 4 not triggered, its disposition his):
  `/usr/local/bin/hooks/agent-output/handoff/website-api-handler-hardening-2026-10-10.md` (b1fdd41a).
- Scope sweep: `/usr/local/bin/hooks/agent-output/verification/fix-api-secret-compare/scoping/sweep.md` (at `76da25c`); its region
  re-read at `b68f94c`: `.../scoping/premises-b68f94c.md`; the empty-token runs: `.../scoping/refutation-empty-token.md`.

Repositories: `/usr/local/bin/hooks/website` (the change, branch `chain/fix-api-secret-compare`, cut by steering from `origin/master`
`b68f94c`, no upstream) and `/usr/local/bin/hooks/agent-output` (the record). `/usr/local/bin/hooks` is not a repository: use
`git -C <repo>` on every call. The permitted write set is the determination block's; anything else — `src/env.mjs` above all — is a
re-scope: stop and message `steering-hooks`.

## Standing prohibitions relied on (quoted whole)

From `/home/dev/.claude/CLAUDE.md`, "Outbound messages":

> **A message that reaches a real person is mine to send.** Customers, users, staff and the public — any other Discord server, a DM,
> modmail, a support thread, a forum, email, a ticket reply — get nothing from an agent.

His standing rule on the record (`/home/dev/.claude/projects/-usr-local-bin-hooks/memory/no-security-blocks-in-record.md`), his words:

> agents are never to lodge in agent-output safeguard and other security blocks. if they need to note a failure, they must just say
> that the action was not completed without stating why

From `/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Local builds of `website` — before the first save" (binds only if a stage serves
a local build and saves):

> `.env.local` holds credentials: read key names, hosts and ports only, never a value.

Secret files: preview-image-generator's `.github/workflows/prod.yml` is flagged by the secret-file gate, which refuses line-printing
`grep`/`git grep` calls that could reach it. This chain needs nothing in preview-image-generator: keep every search to `website` by
explicit path, report any refusal to steering by message, and never re-issue a refused call in another form. No stage reads a value of
`HOOKS_API_TOKEN`, `STATBOT_API_KEY` or any other secret from any file or host; tests use dummy values.

Record documents are written with the Write or Edit tool (or `record-edit.js`), never a shell heredoc (the record-write gate). Never
point a test or a probe at the database `website/.env.local` names. Test Conventions: `/usr/local/bin/hooks/agent-output/CLAUDE.md`,
"Test Conventions (`website`)" — including "Before adding a test" (extend `guildMessages.statbot-key-required.test.ts` and
`guildMessages.malformed-query.test.ts` before writing new files) and the Helper policy (item 5's move). A run that loads the suite
under a memory cap: vitest failed to start under `ulimit -v 4000000` (refutation helper); cap with a cgroup or a higher limit, and say
which.

## Architecture

- Evergreen record: `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md` L117 (Pages Router API endpoints;
  `interactions-edge.ts` alone on the edge runtime), L119 and L171 (server commands forwarded to `interactions-server` authenticated by
  `HOOKS_API_TOKEN`), L126 (the v1 API). This chain changes none of what they state; a change to them goes to the architect through
  `agent-output/INBOX.md`.

## Hazard-bearing analysis (each a candidate to re-derive)

1. Empty token: if production's `HOOKS_API_TOKEN` is empty, today the bot's `get_message` works (the edge side sends the same empty value,
   `bot/edgeCommands.ts:55`, and an empty header equals it); after the fix it answers 401 until he sets a token in Vercel. His selection
   accepted this; production's value is unread. Devops's post-deploy row reads `get_message`.
2. `crypto.timingSafeEqual` throws on buffers of unequal length; digesting both sides with SHA-256 first (handoff item 2) makes the
   lengths equal and keeps length from leaking. A raw-buffer compare guarded by a length check leaks the length.
3. Runtime: `interactions-edge.ts` runs on the edge runtime (`config.runtime: 'edge'`), where `node:crypto` `timingSafeEqual` is not
   available. `secretEquals` must not enter the edge bundle's import graph; the three call sites are Node API routes.
4. Header types: Next types `req.headers[x]` as `string | string[] | undefined`. A missing or non-string header is refused, never coerced
   (`String(undefined)` is "undefined"). The refutation runs found an omitted header refused today only because `undefined !== ''`.
5. The constant-time property is not observable by a functional test. Name how the evidence shows the three sites go through
   `secretEquals` (e.g. a spy on the real module, or its absence stated) and keep `secretEquals`'s own cases behavioural (equal, unequal,
   unequal lengths, empty).
6. Id rider: `messageIdShape` is a `z.string()` (regex `^[0-9]{1,19}$`, BigInt range check, returns a string). `1e3`, `1.5`, an id above
   2^63-1 and a negative number now answer 400 where they reached the database before; leading zeros normalise as before. The Statbot
   caller's id form is unread (statbot-api is outside this workspace); it reads ids from the list endpoint's JSON numbers.
7. Guard test: it imports every v1 handler; their module mocks (`~/env.mjs`, `project-utils`) follow the existing v1 tests. Its red
   evidence adds an unguarded stub route under `src/pages/api/v1/` and removes it; the stub never reaches a commit.
8. Helper move: 4 importers, one outside `v1/` (`src/server/api/messages/__tests__/messageCodes.malformed-query.test.ts`).

## What this brief did not check

- Production env values; Node's handling of a repeated custom header; network timing; whether the hooks bot is in the agents' Discord
  test server; the Statbot caller's request form.
