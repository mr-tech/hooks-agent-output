# Rulings — fixer chain `fix-recent-message-ids` (website: session hydration's guild rows; the stored recent-message list's elements)

Fixer chain steered by `steering-hooks` (cwd `/usr/local/bin/hooks`; coordinator `steering-coordinator`), chain 1 of effort
`fixer-queue-2026-11-21`. The commission and the order: `steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-21T05:32Z"
and "2026-11-21T05:38Z". Brief common part: `steering/fix-recent-message-ids-brief-common.md`. tmux category: `fix-recent-message-ids`.

## 2026-11-21T05:43Z — scoping determination: fixer chain, website, two handoffs

**Source.** `handoff/hydrated-recent-list-returns-guild-message-rows-2026-11-19.md` (UUID 98f075f4) and
`handoff/update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md` (UUID af63220f), both read whole 05:3xZ. Neither states
a remedy; both are IN whole. Earlier ruling, as history and not a bar: chain `fix-personal-message-access` left guild messages out under
his word "personal" (`steering/fix-personal-message-access-rulings.md`, 2026-11-19T22:59Z); this effort's commission is his later word.

**Shape.** Defect. No dated outside event. Cause read from code, not run: the guild arm at `shared.ts:123-126` and the bare
`z.string()` at `user.ts:32`, both read by this thread at website `origin/master` `76da25c` (`git show origin/master:<path>`,
05:4xZ); the int8 refusal was run by the code reviewer of `fix-personal-message-access` (handoff af63220f, Evidence). Blast radius: the
signed-in session callback (`auth.ts` `hydratedAuthCallback`), `getUserRecentMessages`, and `user.updatePreferences`' input; every
signed-in page load hydrates. Specification uncertainty: low — "authorized for a guild message" is the product's own rule,
`authorizeGuildAdmin.ts:40` over the owner/Administrator-trimmed `redis.fetchUserGuilds` list (`redis/index.ts:220-243`) (sweep P1).
No library holds the fix. End step: website `master`, which Vercel deploys to production; his word needed (CLAUDE.md, Git), asked by
devops in its own session.
**Release ref.** `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 76da25cc… --dry-run` (05:4xZ): "DRY RUN:
every check passed; nothing moved"; workflows "none — /usr/local/bin/hooks/website/.github/workflows absent"; `--report`: "one serving
ref at origin (master); no pair". Tree: `master` `76da25c` = `origin/master` after `git fetch`; `git status --porcelain` to a file:
one line, `?? .playwright-mcp/`.
**Released chains whose scope touched these routes:** `fix-personal-message-access` (the owner filter on the personal arm; closed);
018 (bounded `recentMessageIds`' length at `532c0ee`, excluded its elements as X-10). No open post-deploy carrier on these routes
(`handoff/` listing, 05:3xZ).

**Scope sweep** (helper, `verification/fix-recent-message-ids/scoping/sweep.md`, raw output in `raw/`; instruments, regions and
limits there), at website `76da25c`, project-utils `749606d`, preview-image-generator `8512a1d`:
- P1 "a signed-in user receives data of a message of a server he is not owner or Administrator of": one site has it —
  `getUserRecentMessages` (`shared.ts:122-126`), delivered as `session.hydration` by `hydratedAuthCallback` (`auth.ts:138-140,172`),
  ids from the caller's own stored `recentMessageIds`. Fields: id, createdAt, updatedAt, name, previewImageNonce, guildId (not `data`).
  Every other read path is gated (`getOne`, `get`, `getAll`, `upsert`, `updateRecentMessageData`, `delete`); v1 routes are key-gated.
- P2 "a message-number input admits a value the column cannot hold": `user.ts:32` (elements bare `z.string()`); `shared.ts:109`
  (the read-side sink, no validation, which also meets values already stored); v1 `pages/api/v1/guilds/[guildId]/messages/[id].ts:19`
  (`z.number({coerce:true})` then `.toString()`; key-gated, not a signed-in user; derived from JS number semantics, not run);
  `partialMessageShape.id` / `idMessageShape.id` loose but never run against the column at `76da25c`.
- Shapes to reuse: `messageIdShape` (`shapes.ts:114-118`); `boundedArray`, `cappedInput`.
- Covering tests: `shared.in-predicates.test.ts` (two `getUserRecentMessages` cases, one asserting the guild arm),
  `auth.hydrated-recent-messages.test.ts` (two, personal rows only), `user.save-limits.test.ts` (length only),
  `shapes.message-id.test.ts`. No `*.pg.test.ts` in the suite; record harnesses `verification/fix-personal-message-access/pg/run-pg.sh`
  and `security/run-security.sh` run a throwaway `postgres:16` container.

**Stage set:** `fixer-fix-recent-message-ids` → `code-reviewer-fix-recent-message-ids` (and QA Phase 2, `qa-fix-recent-message-ids`,
only if the fix adds 20 or more production lines; under 20 the reviewer also runs the suite and the red test) → devops for website
`master` (his word). No plan, critic, Phase 1 or UAT. Security not in the set: the change ships nothing root executes, and it narrows
an access path rather than adding one. Retrospective: joins the next fixer batch.

**Scope statement (bounded).** Repository `website` only, from `origin/master` `76da25c`, on `chain/fix-recent-message-ids`:
1. The hydrated session returns a server (guild) message row only where the caller is owner or Administrator of that server — the
   same rule `authorizeGuildAdmin` applies — and still returns the caller's own personal rows as today.
2. `user.updatePreferences` refuses a `recentMessageIds` element that is not a valid message number, by `messageIdShape`'s contract.
3. The hydration does not fail the user's session on a stored element that is not a valid message number (values stored before item 2
   lands): such an element is dropped before the query.
Write set: website `src/server/api/utils/shared.ts`, `src/server/auth.ts`, `src/server/api/routers/user.ts`,
`src/server/api/utils/shapes.ts` (reuse only; a change to `messageIdShape` itself is a re-scope), their `__tests__/` files; in the
record, the fixer's document and `verification/fix-recent-message-ids/`.

**Exclusions.**
- v1 `messages/[id].ts:19` coerced number id (P2, key-gated): OUT of this chain; carried as a named rider on chain 3
  `fix-api-secret-compare`, which edits the same v1 files (recorded in the effort file's order when chain 3 is scoped).
- `partialMessageShape.id` / `idMessageShape.id`: OUT — no site runs them against the column at `76da25c`; a breach would show as a new
  P2 site in a later sweep.
- Rewriting stored bad or foreign ids in production `Users.preferences`: OUT; item 3 makes them inert. A production count is unread.

**What the sweep did not cover** (devops hazard lines): no production count of bad or foreign stored ids; other writers of
`Users.preferences` not enumerated; NextAuth internals and the 600-second guild cache not exercised; the `bot/` tree not read.
