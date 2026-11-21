---
ID: n/a
Origin: fix-recent-message-ids
UUID: c304ae49
Status: Active
Status-Detail: "Fix committed at website 8f24e65 on chain/fix-recent-message-ids; owed: code review at that SHA, then QA Phase 2 (30 added production lines), then devops for website master (his word)."
Handoff-At: 8f24e65 — repos=website
Origin-Chain: none
---

# fix-recent-message-ids — implementation

## Scope statement

The owner's word reached this chain through `steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-21T05:32Z" and
"2026-11-21T05:38Z". The scoping determination and the bounded statement are in
`steering/fix-recent-message-ids-rulings.md`, block "2026-11-21T05:43Z". They were relayed by `steering-hooks` in
`steering/fix-recent-message-ids-brief-fixer.md` and `steering/fix-recent-message-ids-brief-common.md`. Quoted from the block:

> Repository `website` only, from `origin/master` `76da25c`, on `chain/fix-recent-message-ids`:
> 1. The hydrated session returns a server (guild) message row only where the caller is owner or Administrator of that server — the
>    same rule `authorizeGuildAdmin` applies — and still returns the caller's own personal rows as today.
> 2. `user.updatePreferences` refuses a `recentMessageIds` element that is not a valid message number, by `messageIdShape`'s contract.
> 3. The hydration does not fail the user's session on a stored element that is not a valid message number (values stored before item 2
>    lands): such an element is dropped before the query.
> Write set: website `src/server/api/utils/shared.ts`, `src/server/auth.ts`, `src/server/api/routers/user.ts`,
> `src/server/api/utils/shapes.ts` (reuse only; a change to `messageIdShape` itself is a re-scope), their `__tests__/` files; in the
> record, the fixer's document and `verification/fix-recent-message-ids/`.

Exclusions (same block): the v1 coerced id at `messages/[id].ts:19`; `partialMessageShape.id` / `idMessageShape.id`; rewriting stored
ids in production `Users.preferences`.

## Entry Conditions

| # | Condition | Value |
|---|---|---|
| 1 | Scoping determination | `steering/fix-recent-message-ids-rulings.md`, block "2026-11-21T05:43Z", relayed by the brief above. |
| 2 | Bounded scope statement | Quoted above. The property and swept region are those of the block's "Scope sweep" (P1, P2), in `verification/fix-recent-message-ids/scoping/sweep.md`. |
| 3 | Fix branch | `chain/fix-recent-message-ids`, cut by steering from `origin/master` `76da25c` and checked out in `website`. At start `branch --show-current` returned that name and HEAD = `origin/master` = `76da25c`. `status --porcelain`, read through a file, held one line: `?? .playwright-mcp/`. |
| 4 | Record on the mechanism | `architecture/system-architecture.md:136` (the hydrated recent list "returns the user's own rows and guild rows", which this change makes untrue; see Changelog and INBOX). `architecture/website.md:258` (`recentMessageIds` length bound, `usePreferences.ts` cut). `research/`: a filename listing for recent/hydrat/session matched nothing. |

Read at start: both briefs, the rulings block, the lifecycle `SKILL.md` and its `seams` reference, the workspace `CLAUDE.md`, and the
two source handoffs as quoted in the block.

## Diagnosis

Instrument: the code path, read at `76da25c`, and the red run below.

- **Item 1, server rows.** `getUserRecentMessages` (`shared.ts:109-130`) selects every listed id that is the caller's personal row
  **or any server's row** (`fk_guilds_id is not null`). `hydratedAuthCallback` (`auth.ts:132-180`) puts the result into
  `session.hydration.messages` unfiltered. So a signed-in user whose stored `recentMessageIds` names another server's message receives
  its id, name, timestamps, preview nonce and Discord server id. Red-run signature: "leaves out a recent server message of a server the
  signed-in user is not owner or Administrator of" fails at base.
- **Item 2, input.** `user.ts:32` admits `boundedArray(z.string(), …)`, so any string is stored. Red-run signature: `'abc'` and the
  other four cases reach the database.
- **Item 3, stored bad ids.** `getUserRecentMessages` binds the stored list into `"Messages"."id" in (…)` as it is. Postgres refuses a
  non-int8 value for the whole query; the code reviewer of `fix-personal-message-access` ran that refusal (handoff af63220f, Evidence).
  `Promise.all` then rejects and the session fails (`auth.ts:139`, hazard 3 of the brief).
- **Consumers of the resolved value.** The list changes in three places: the elements the query binds, the rows the session returns,
  and the session's `user.preferences.recentMessageIds`. Their consumers are:
  - `src/app/message/page.tsx:72-80` matches `session.user.preferences.recentMessageIds` against `session.hydration.messages`.
  - `src/providers/MessageProvider/usePreferences.ts:10-24` builds the next `updatePreferences` save from
    `session.user.preferences.recentMessageIds` plus the open message's id.
  - `useUpdatePreferences.ts` sends that save. It has no `onError`, and `onSuccess` refreshes the session.
  - No guard compares the raw value.
- **Base against fix, a regression found and fixed in this chain.** With item 2 alone (commit `408702d`), a user whose stored list
  already held a bad element would have every later save refused. `usePreferences` re-sends the stored list, `updatePreferences` now
  refuses it, and nothing clears it. At base that save is accepted, so this is a regression this chain introduces, and it is in scope
  under the definition's base-against-fix rule. The fix is in `b766367`. The hydration drops bad elements once
  (`keepMessageNumbers`), uses that list for the query, and gives the session the same list. The client's next save is then built
  from a clean list and rewrites the stored one.
- **Where the server filter sits (design choice; the brief's hazard 1 names it as the fixer's).** `auth.ts` keeps rows after
  `Promise.all`. It keeps a row with no `guildId` (personal; the query already restricts personal rows to the caller), and a row whose
  `guildId` is in the session's guild list, read before the development-only fake guild `'1'` is pushed. That list is
  `redis.fetchUserGuilds`' owner/Administrator-trimmed list, the one `authorizeGuildAdmin.ts:40` matches by `id`. The filter could
  instead have been a SQL arm like the sibling `getPartialMessages`, but the query would then wait on the guild fetch. That would undo
  the concurrent start that `auth.hydrated-session.test.ts` specifies, and its error-ordering cases with it.
  - The post-filter is sound because `Messages.fk_guilds_id` references `Guilds.id` with cascade, and `Guilds.guildId` is non-null
    (`project-utils/prisma/schema.prisma`: `guildId String`, relation `onDelete: Cascade`). So a server row always carries its
    `guildId`.
  - Rows for servers the user doesn't administer still reach the server process. They are dropped before the session is returned.
  - `Guilds` is unique on `(provider, guildId)`, so the match is on the Discord id alone, as in `getPartialMessages` and
    `authorizeGuildAdmin`.
- **Residue in production.** Stored lists may hold other servers' ids and bad elements. From the first session after release:
  - Other servers' rows are filtered at every hydration. Their ids stay stored, and the client re-saves them as valid numbers, inert.
  - Bad elements are dropped from the session, so the user's next message-page save writes the list without them.
  - No count of either is read (excluded by the block). Release form: Vercel deploys `master`, and the session callback runs on every
    session request. Every hydration after the deploy therefore runs the new code, and no state carries from the old build. The live
    state is the owner's to check where he wants a count.
- **Origin-Chain.** The guild arm's predecessor (no owner filter at all) is from `4fe53b6` (2023). `fix-personal-message-access`
  (`2e50cd9`) narrowed it and kept guild rows by his word "personal". The bare `z.string()` elements date from `e3089a4` / `66250f4`
  (2023); `532c0ee` (018) bounded the length only. No chain introduced either defect: `none`.

## Change

Website, `76da25c..8f24e65`, three commits:

- `408702d`:
  - `src/server/api/utils/shared.ts`: `getUserRecentMessages` binds only the elements `messageIdShape` accepts, and issues no query
    when none are left.
  - `src/server/auth.ts`: the session's messages keep a server row only when its server is in the user's guild list.
  - `src/server/api/routers/user.ts`: `recentMessageIds` elements are `messageIdShape`.
- `b766367`:
  - `src/server/api/utils/shared.ts`: adds the `keepMessageNumbers(ids)` export, used by the query and by the hydration.
  - `src/server/auth.ts`: the hydration drops bad elements once; the query and `session.user.preferences` both get the dropped list.
- `8f24e65`, `src/server/api/utils/shared.ts`: the two `where` callbacks (`getUserRecentMessages`, and the sibling
  `getPartialMessages`) call `eb.or` / `eb.exists` / `eb.selectFrom`. This satisfies the 4 `@typescript-eslint/unbound-method` FAILs
  the convention check reported on those lines, which are also present at base (`base-shared-lint.txt`, lines 123/178). The compiled
  SQL and parameters of all three queries are byte-identical before and after (`verification/fix-recent-message-ids/sql-identity/`,
  `cmp` over `before.json` / `after.json`; the probe `shared.sql-dump.test.ts` is a record instrument, not a suite file).

Production lines added, `git diff --numstat 76da25c..8f24e65` over the three production paths: 4 + 11 + 15 = **30**, so QA Phase 2
runs.

Test files:

- `auth.hydrated-recent-messages.test.ts`:
  - 4 server-row, preferences and fixture cases, plus 5 `it.each` drop cases.
  - The fake responder now applies the SQL's server arm and refuses a non-int8 bound id (see Test).
- `shared.in-predicates.test.ts`: 2 cases. The existing in-list case's ids were `'m1'`/`'m2'`, which the fix now drops; they are
  re-stated as message numbers with the same assertions.
- `user.save-limits.test.ts`: 5 `it.each` refusal cases.
- `auth.hydrated-session.test.ts`:
  - Its `shared` mock passes the real `keepMessageNumbers` through `importOriginal`.
  - The default fixture id `'m1'` is re-stated as `'900000000000001'`, which the hydration would otherwise drop before the mocked
    query.

## Test

Spec-form throughout; no escaped artefact earns a bug-form name.

- **Red run** (final test files over base production code, a `git worktree add --detach` export of `76da25c` in the scratchpad, since
  removed): `npx vitest run` over the three files, 178 cases, 164 passed, **14 failed**, exit 1.
  - Capture: `verification/fix-recent-message-ids/red-run.json`, `red-run.log`, `red-run-failures.txt`.
  - The drop cases fail at base on `invalid input syntax for type bigint: "abc"` (and `""`, `"9223372036854775808"`,
    `"[object Object]"`). `-1` fails because it is bound into the query.
- **Red run, session preferences** (the case added with `b766367`), at the shared tree's `408702d` code: 11 cases, 1 failed, exit 1.
  Capture: `red-run-session-preferences.json`. That case's subject is untouched between base and `408702d`.
- **Green run** at `8f24e65`: the whole suite, below.
- **Passing at red, with its negative control.** "lists a recent server message of a server the signed-in user is owner or
  Administrator of" passes at base. It is killed by `auth-filter-drops-every-server-row`.
- **Negative controls**, 9, run by `~/.claude/tools/mutation-run.py` on `8f24e65`, each in a `git archive` export with
  `node_modules` bound read-only. Mutants: `verification/fix-recent-message-ids/controls-mutants.json`; table and per-run streams:
  `verification/fix-recent-message-ids/controls/`. 8 KILLED (count `checked`), 1 SURVIVED:

  | Control | Outcome | Cases that failed |
  |---|---|---|
  | `auth-filter-removed` | KILLED | the two "leaves out … server" cases |
  | `auth-filter-drops-every-server-row` | KILLED | "lists a recent server message …" |
  | `auth-filter-drops-personal-rows` | KILLED | 10 hydration cases |
  | `query-guard-on-raw-list` (the added guard) | KILLED | "issues no query … when no element is a message number" |
  | `query-binds-raw-list` | KILLED | "binds only the elements that are message numbers" |
  | `input-element-bare-string` | KILLED | the 5 refusal cases |
  | `session-preferences-as-stored` | KILLED | "gives the session's preferences only …" |
  | `session-preferences-cleaned-list-unused` | KILLED | the same |
  | `query-given-stored-list` (the call site's choice of list) | SURVIVED | none: equivalent, since `getUserRecentMessages` applies the same `keepMessageNumbers` to whatever it is given, so the two lists bind the same ids |

- **Invented values (Iron Law 5).** The DB reader in the hydration test is the fake kysely driver. Postgres's int8 refusal is
  simulated by `refuseNonInt8`: a bound `Messages.id` that is not an optionally signed decimal string ≤ 2^63−1 throws
  `invalid input syntax for type bigint: "<value>"`. If that is false (postgres accepts a value the fake refuses), the drop cases would
  still pass on their `boundIds` assertion but would overstate the base failure. The real refusal of `'abc'` is the af63220f
  reviewer's run. The server arm is simulated by matching the compiled SQL's `"Messages"."fk_guilds_id" is not null`. If that is
  false, the fake would return no server rows and "lists a recent server message …" would fail, a visible signature.
- **Time-based tests:** none.
- **Lifetime / exit enumeration:** the change adds nothing with a lifetime, and no `await` is added between a read and a guarded
  write.
- **Declined work.** Two kinds:
  - An element that is not a message number is **dropped, and never runs by design**: it is not queried and not shown, and after
    `b766367` it is not re-sent.
  - A refused `updatePreferences` save goes nowhere: `useUpdatePreferences` has no `onError`, and the stored list stays as it was. The
    only client sources of elements are the session's list, now cleaned, and the open message's id, a database id. So no save in the
    normal flow is refused. The suite follows a dropped element from the stored list to the session's list, the next save's source
    (the session-preferences case). It does not drive the client hook into the router; that composed client-to-server path is not
    asserted.
- **Not covered:**
  - A stored `recentMessageIds` that is not an array. `keepMessageNumbers` would throw where base's query would also have failed.
  - The 600-second guild cache. A user who loses Administrator keeps the server's rows for up to that long, as with every other read
    of the list.

## Verification

The record's `.gitignore` excludes `*.log`, so every `<name>.log` cited here is committed as `<name>-log.txt` beside it.

- **Existing suite** (`npx vitest run --reporter=json`, whole repo):
  - At `8f24e65`: 2281 cases, 2281 passed, 156 files, **exit 0** (`verification/fix-recent-message-ids/suite-fix.json`).
  - At base, in the export: 2265 cases, 2264 passed, 1 failed, exit 1 (`suite-base.json`). The one failure,
    `trpc.batch-refusal.test.ts` "refuses two calls with a bad-request status …", is `STACK_TRACE_ERROR` under the full run. Re-run
    alone in the same export it passed, 2/2, exit 0 (`base-batch-refusal-rerun.log`), and it passes in the fix-tree run. It is a load
    flake, not on this surface.
  - The difference of 16 cases is the 16 added: 9 + 2 + 5. The `it.each` expansion is counted by the reporter.
- **Build verification:** `pnpm run typecheck` (both `tsc` programs) exit 0 at the final tree (`typecheck.log`). The workspace
  `CLAUDE.md` names no other build verification for `website`.
- **Lint:**
  - The repo's script is `eslint --fix . --max-warnings=0`. Run once under `timeout 300`, it exited 124, a kill. No autofix landed:
    `git diff --numstat` was unchanged and no eslint process was left (`ps`). Disclosed: the script edits the shared tree, so it was
    not run again.
  - `npx eslint . --max-warnings=0` without `--fix`: exit 1 over 333 file/rule pairs in untouched files, `.archive/` and others
    (`lint-all-summary.txt`).
  - Over the 7 changed files at `8f24e65`: **0 findings** (`lint-changed-files.txt` was taken before `8f24e65` and lists the 4 base
    findings; `npx eslint shared.ts` after the rewrite returned none).
- **Convention check** (`node ~/.claude/tools/convention-check.js website --since=76da25c`, `convention-check.log`): exit 0, 0 FAIL,
  0 CANDIDATE.
  - SKIPs: 17 `.playwright-mcp/*.png` files (outside the examined set), and "id-token, basename … the checks did not run". **Unchecked
    by the tool.**
  - Run by hand instead over `fix.diff` (`git diff 76da25c 8f24e65 -- src` to a file): `grep -ciE` with the CLAUDE.md ID-token class
    over the added lines, 0. Added comment lines (`grep -cE '^\+ *(//|/\*|\*)'`), 0.
- **No package-manager operation:** the lockfile is unchanged.

## User-visible flows

- Message page, recent messages strip:
  - A server message you opened while you were owner or Administrator of that server is still listed.
  - A message of a server you are not owner or Administrator of is no longer listed.
  - Your own personal messages are listed as before.
- Signing in with a recent list that holds a malformed entry: the session loads, the malformed entry is not shown, and it is gone from
  the stored list after the next message you open.
- Opening a message records it in the recent list as before.

## Handoff

- SHA: website `8f24e65` on `chain/fix-recent-message-ids` (no upstream).
- Reviews: `code-reviewer-fix-recent-message-ids`, then QA Phase 2 (`qa-fix-recent-message-ids`): 30 added production lines, ≥ 20.
- Merges: devops, into website `master`, which Vercel deploys to production, under the owner's release approval (his word, asked by
  devops in its own session).
- Points for the reviewer:
  - The post-query filter, chosen over a SQL arm (Diagnosis).
  - The session-preferences change in `b766367`, found by the base-against-fix comparison.
  - The behaviour-neutral rewrite of the sibling `getPartialMessages` callback in `8f24e65`, made to clear the convention check's
    FAILs.
- The record's statement at `architecture/system-architecture.md:136` goes to the architect through `INBOX.md`. The entry is
  "2026-11-21 — fixer-fix-recent-message-ids — FYI", appended and left uncommitted because the file carries other sessions'
  uncommitted hunks (261 lines at the write).
- Exports set up and removed in this run: the base worktree and the `8f24e65`-parent worktree (`git worktree add --detach`, removed
  with `git worktree remove --force`, `git worktree list` showing the main tree only), and `mutation-run.py`'s `--work` directory.
  `git checkout -- src` ran once, inside the base export only, to restore its test files before the base suite run. It never ran over
  the shared tree.

## Changelog

| Date (UTC) | Change |
|---|---|
| 2026-11-21T06:07 | Document created. Fix committed at website `408702d`, `b766367` and `8f24e65`. Red run, controls and verification are recorded under `verification/fix-recent-message-ids/`. Handed off to code review at `8f24e65`. |
