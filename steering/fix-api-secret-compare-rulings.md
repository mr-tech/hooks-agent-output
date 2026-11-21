# Rulings — fixer chain `fix-api-secret-compare` (website: API credential checks are not constant-time; the bot endpoint admits an empty token)

Fixer chain steered by `steering-hooks` (cwd `/usr/local/bin/hooks`; coordinator `steering-coordinator`), chain 5 of effort
`fixer-queue-2026-11-21`. Commission and order: `steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-21T05:32Z", "05:38Z",
"05:50Z". tmux category: `fix-api-secret-compare`. Source: `handoff/website-api-handler-hardening-2026-10-10.md` (b1fdd41a).

## 2026-11-21T13:39Z — selection: chain 5's scope (empty token refused; id rider in; the handoff whole)

Selection prompt put 11:4xZ, answered 13:39Z (ledger `steering/selection-ledger/2026-11-21.md`, block "2026-11-21T13:39Z —
steering-hooks"); wording this thread's. Premises, read before the prompt: the sweep `verification/fix-api-secret-compare/scoping/sweep.md`
(`6be102a`, at `76da25c`); its re-read at `b68f94c` (`premises-b68f94c.md`, `dec5170`: nothing in the region changed, every cited line
the same); the refutation helper (`refutation-empty-token.md`, `0b700a4`, the real handler and `env.mjs` run under node with dummy
values): (a) `interactions-server.ts:11` plain `!==` HOLDS (read from code); (b) an empty `HOOKS_API_TOKEN` passes validation and an
empty header passes the check (run; an omitted header is refused); (c) with `SKIP_ENV_VALIDATION=1` an unset token and no header pass
(run; without the flag an unset token throws at import); (d) no repository file sets the flag (grep; the host is unread); (e) both v1
handlers refuse an unset or empty `STATBOT_API_KEY` (read from code; the bundle failed on `satisfies`).
- Q empty token: A "Agent: refuse empty token (Recommended)" — "The bot endpoint refuses when its token is empty or unset, as the
  Statbot API endpoints already do. If production's token is in fact empty, the bot's get_message command stops working until you set a
  token in Vercel (unread: production's value)."; B "Agent: constant-time only". Chosen: **A**.
- Q id rider (v1 `messages/[id].ts:19` `z.number({ coerce: true })`): A "Agent: fix it in chain 5 (Recommended)" — "the strict check the
  editor's API already uses (digits only, in range)"; B "Agent: separate chain later"; C "Agent: don't fix". Chosen: **A**.
- Q handoff rest (b1fdd41a item 3, a guard test over every v1 route; item 5, the `makeRes` helper move, 4 importers): A "Agent: include
  both (Recommended)" — "closes that handoff whole … test-file changes only"; B "Agent: guard test only"; C "Agent: neither". Chosen: **A**.
Exclusions he saw in the prompt: `cron.ts`'s check (chain 6 deletes the endpoint); the Discord signature check (`discord-verify`, a
library). The determination, the stage set and the briefs are written next, from this block.

## 2026-11-21T13:42Z — scoping determination: fixer chain, website, one handoff

**His words.** Block "2026-11-21T13:39Z" above, three selections, each the Recommended option: "Agent: refuse empty token" — "The bot
endpoint refuses when its token is empty or unset, as the Statbot API endpoints already do. If production's token is in fact empty,
the bot's get_message command stops working until you set a token in Vercel (unread: production's value)."; "Agent: fix it in chain 5"
— "The endpoint takes the message number with the strict check the editor's API already uses (digits only, in range)"; "Agent: include
both" — "Chain 5 closes that handoff whole. It adds test-file changes only, no production lines." Effort order: effort block
"2026-11-21T05:50Z" (chain 5, with the id rider). Brief common part: `steering/fix-api-secret-compare-brief-common.md`.

**Source.** `handoff/website-api-handler-hardening-2026-10-10.md` (UUID b1fdd41a, Open, Owning-Stage Unassigned): item 1 discharged
earlier; items 2, 3 and 5 IN; item 4 (put `STATBOT_API_KEY` in `env.mjs` "if `env.mjs` enters a scope") is NOT triggered —
`env.mjs` stays out of this chain (below), and his "as the Statbot API endpoints already do" names their request-time check, not a
schema entry. **This thread's error:** the 13:39Z prompt said "closes that handoff whole" without naming item 4, a conditional item;
reading the handoff's item list against the option text would have caught it. Item 4's disposition is put to him separately (block
below when answered); the chain does not wait on it.

**Shape.** Defect (hardening), not user-visible except through the bot's `get_message` command and the Statbot API's callers. No dated
outside event. Cause read from code and, for the empty token, run (refutation helper `refutation-empty-token.md`, `0b700a4`: an empty
`HOOKS_API_TOKEN` and an explicitly sent empty header pass; with `SKIP_ENV_VALIDATION` set an unset token and no header pass; no
repository file sets the flag). Timing exploitability unmeasured (the handoff's own words). Blast radius: three credential checks
(`src/pages/api/v1/guilds/[guildId]/messages.ts:22-23`, `.../messages/[id].ts:22-23`, `src/pages/api/interactions-server.ts:11`), the
single-message endpoint's id parse (`messages/[id].ts:19,32`), v1 tests and one moved test helper. No library holds the fix (Node's
`crypto.timingSafeEqual`, per the handoff's item 2). End step: website `master`, Vercel production (no `.github/workflows`); his word,
asked by devops in its own session.
**Release ref.** `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master b68f94cd… --dry-run` (13:4xZ): "DRY RUN: every
check passed; nothing moved"; "workflows none — /usr/local/bin/hooks/website/.github/workflows absent"; `--report`: "one serving ref at
origin (master); no pair". Tree: `master` `b68f94c` = `origin/master` (`git ls-remote`, 13:4xZ); porcelain `?? .playwright-mcp/` only.
Lockfile: the chain branch is cut at the tree's own commit, so nothing differs across the switch.
**Premises at `b68f94c`:** `verification/fix-api-secret-compare/scoping/premises-b68f94c.md` (`dec5170`): no file of the sweep's region
changed since `76da25c`; every cited line the same; `env.mjs:36` `HOOKS_API_TOKEN: z.string()`; the only skip switch a non-empty
`SKIP_ENV_VALIDATION` (`env.mjs:101`); no test of `interactions-server`; `secretEquals`/`timingSafeEqual` 0 hits.
**Released chains whose scope touched this route:** `fix-v1-guild-messages-auth` (the v1 guard; its handoffs closed); no open handoff
names `interactions-server`, `HOOKS_API_TOKEN`, `STATBOT_API_KEY` or `api/v1` other than the source (`grep -l` over `handoff/*.md`,
13:4xZ). No deployment record open (`ls deployment/*.md`: none).

**Scope sweep** (helper, `verification/fix-api-secret-compare/scoping/sweep.md`, commit `6be102a`, at `76da25c`; premises re-read as
above). Property A1: a client-supplied credential is compared with an ordinary string compare, not in constant time — sites: the two v1
guards, `interactions-server.ts:11`, `cron.ts:15` (a literal, not a secret); clear: the Discord signature (`discord-verify`), middleware,
`[code].ts`, `authorizeGuildAdmin.ts:17` (a type test); project-utils: no credential check. Property A2: a message number taken through
a JS number — `messages/[id].ts:19` only; `message.ts:55,222` already use `messageIdShape` (`shapes.ts:112-118`). Adjacent, not in A2:
the v1 responses' `id: Number(m.id)` (`messages.ts:40`, `[id].ts:42`), an output precision limit above 2^53.

**Stage set:** `fixer-fix-api-secret-compare` → `code-reviewer-fix-api-secret-compare` (and QA Phase 2, `qa-fix-api-secret-compare`,
only at 20 or more added production lines; under 20 the reviewer also runs the suite and the red tests) → devops for website `master`
(his word). No plan, critic, Phase 1 or UAT; the fixer's **User-visible flows** list is quoted to him with the release.

**Scope statement (bounded).** Repository `website` only, from `origin/master` `b68f94c`, on `chain/fix-api-secret-compare`:
1. One `secretEquals(a, b)` compares by `crypto.timingSafeEqual` over the SHA-256 digests of both strings (handoff item 2), used at the
   three sites; the v1 sites keep refusing an unset or empty `STATBOT_API_KEY` and accept exactly `Authorization: Bearer <key>`.
2. `interactions-server` refuses (401) when `HOOKS_API_TOKEN` is empty or unset, at request time, as the v1 handlers do; a matching
   non-empty token is still accepted.
3. `messages/[id].ts` takes `id` through `messageIdShape` (imported, unchanged); a malformed id answers 400 with no database read, as
   the existing malformed-query cases do.
4. A spec test enumerates every route file under `src/pages/api/v1/` from the filesystem, imports each default handler, and asserts 401
   with no database read for a request with no credential; shown red by an unguarded stub route, then restored (handoff item 3).
5. `makeRes` moves from `src/server/api/v1/__tests__/helpers/apiResponse.ts` to `src/server/api/__tests__/helpers/apiResponse.ts`, its 4
   importers updated; per-file case count and pass set identical before and after (handoff item 5).
Write set: website `src/pages/api/v1/guilds/[guildId]/messages.ts`, `.../messages/[id].ts`, `src/pages/api/interactions-server.ts`, one
new module for `secretEquals` under `src/server/api/utils/`, and `src/server/api/**/__tests__/**`; in the record, the fixer's document
and `verification/fix-api-secret-compare/`. A change to `src/env.mjs`, `shapes.ts`, `bot/`, `cron.ts`, `interactions-edge.ts` or any
other file is a re-scope.

**Exclusions.** `cron.ts:15`: OUT (chain 6 deletes the endpoint; his 13:39Z prompt). The Discord signature check: OUT (a library). A
`.min(1)` on `HOOKS_API_TOKEN` in `env.mjs`: OUT (turns an empty token into a site-wide failure at import, a different behaviour than
his option names). Handoff item 4: OUT, put to him. The v1 output `Number(m.id)`: OUT (not in either property; ids above 2^53 not in
the record). A lint rule or test that catches a future non-constant-time credential compare: OUT (nothing in his words; the class is
held to the three sites the sweep found, and only scope item 4's guard test catches an unguarded v1 route).

**What the sweep did not cover** (devops hazard lines): production's `HOOKS_API_TOKEN`, `STATBOT_API_KEY` and `SKIP_ENV_VALIDATION`
values (host unread); Node's handling of a repeated `x-hooks-api-token` header (not run); timing over the network (unmeasured);
`discord-verify` internals; nextauth, trpc and tRPC context beyond the grep; the Statbot caller's id form (statbot-api, outside this
workspace); whether the hooks bot is in the agents' Discord test server.

Chain started 13:44Z: website `chain/fix-api-secret-compare` cut by this thread (`git switch --no-track -c … origin/master` after
`git ls-remote` read `b68f94c`; HEAD `b68f94c`, no upstream; porcelain before and after identical, `?? .playwright-mcp/` only, `diff` of
the two captures). Briefs: `steering/fix-api-secret-compare-brief-common.md`, `…-brief-fixer.md`. `fixer-fix-api-secret-compare` is
started with `tmux-agent spawn` (category `fix-api-secret-compare`, cwd website). The reviewer is started on the fixer's spawn cue.
`fixer-fix-api-secret-compare` started 13:44Z (`tmux-agent spawn`: "effort medium").

## 2026-11-21T15:30Z — selection: the source handoff's item 4 moves to a new handoff

Selection prompt put 13:4xZ, answered 15:30Z (ledger `steering/selection-ledger/2026-11-21.md`, block "2026-11-21T15:30Z —
steering-hooks"); wording this thread's. Premises, read this turn: b1fdd41a item 4 (the handoff, read whole) — conditional on
`env.mjs` entering a scope; this chain's write set excludes `env.mjs` (block 13:42Z); a required entry throws at import when the
variable is missing (`refutation-empty-token.md` case c3, run, for `HOOKS_API_TOKEN`); production's `STATBOT_API_KEY` unread.
Options: A "Agent: new handoff (Recommended)" — "The item moves to a new handoff that fires when env.mjs is next changed; chain 5 then
closes the old handoff. One more open handoff; chain 5 unchanged."; B "Agent: do it in chain 5" — "STATBOT_API_KEY becomes a required
setting (env.mjs joins chain 5). If the key is ever missing, the site's server code fails when it loads instead of only the Statbot API
answering 401 (seen in a run for the bot token; unread: whether production has the key set)."; C "Agent: drop it". Chosen by
selection: **A**. Carrier: `handoff/statbot-api-key-env-schema-2026-11-21.md` (c07b0565).

## 2026-11-21T15:30Z — spawn cue: fixer handed off at `32d10f7`; review, then QA Phase 2

Spawn cue 15:2xZ (the fixer, by SendMessage): `implementation/fix-api-secret-compare-implementation.md` (agent-output `53460cfd`),
Handoff-At `32d10f7`. Read by this thread (`git diff --numstat b68f94c 32d10f7`): production files `interactions-server.ts` +3/-1,
`messages.ts` +3/-1, `messages/[id].ts` +6/-4, new `src/server/api/utils/secretEquals.ts` +9 — 21 added, so QA Phase 2 follows review;
every other path under `src/server/api/**/__tests__/**`; all in the write set. Premise correction (the fixer's): `makeRes` had 5
importers at `b68f94c`, not 4 — `cron.scheduled-selection.test.ts` also imported it; moved with the rest (inside the write set).
`code-reviewer-fix-api-secret-compare` started with `tmux-agent spawn`, brief `steering/fix-api-secret-compare-brief-code-reviewer.md`.
`code-reviewer-fix-api-secret-compare` started 15:3xZ ("effort medium").

## 2026-11-21T16:08Z — the review's live-attack server start: not completed

The reviewer's start of a dummy-valued dev server of website `32d10f7` (from an export, every credential a dummy, database and Redis at
a closed port) was not completed; it did not re-issue it and continues every other limb. His selection, answered 16:07Z (ledger
`steering/selection-ledger/2026-11-21.md`, block "2026-11-21T16:07Z — steering-hooks"): "Agent: I start the server" — this thread ran
the reviewer's command word for word (text from the reviewer by message, 16:0xZ); not completed. The reviewer was told (16:08Z) and
waits on his next word for that limb only.

## 2026-11-21T18:01Z — selection: the reviewer re-runs its server start with the dummy database renamed

His selection, answered 18:00Z (effort rulings block "2026-11-21T18:01Z"; ledger block "2026-11-21T18:00Z — steering-hooks"): "Agent:
re-issue without 'none' (Recommended)". Relayed verbatim to `code-reviewer-fix-api-secret-compare` 18:0xZ: re-issue with only the dummy
database name changed (`nodb`), disclosed in its round as "not completed, re-run with the dummy database name changed", no reason.
