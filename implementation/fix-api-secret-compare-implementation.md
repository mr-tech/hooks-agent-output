---
ID: n/a
Origin: fix-api-secret-compare
UUID: fbe73764
Status: Active
Status-Detail: "Fix handed off at website 32d10f7; code review next, then QA Phase 2 (21 added production lines), then devops for website master on the owner's word."
Handoff-At: 32d10f7 — repos=website
Origin-Chain: "fix-v1-guild-messages-auth — the two v1 compares come from website 1acffee; interactions-server.ts:11 (f0f427b) and [id].ts:19 (3468587) are 2023 commits no chain made"
---

# Fix — API credential checks compare in constant time; the bot endpoint refuses an empty token; the v1 message number is read strictly

## Scope statement

Route: the owner's selections in `steering/fix-api-secret-compare-rulings.md` block "2026-11-21T13:39Z" (refuse an empty token; the
id rider; the handoff's items 3 and 5), and steering's scoping determination in block "2026-11-21T13:42Z", which names this agent.
The bounded scope statement, as the block gives it (re-read at write time, 13:55Z):

1. One `secretEquals(a, b)` compares by `crypto.timingSafeEqual` over the SHA-256 digests of both strings (handoff item 2), used at the
   three sites; the v1 sites keep refusing an unset or empty `STATBOT_API_KEY` and accept exactly `Authorization: Bearer <key>`.
2. `interactions-server` refuses (401) when `HOOKS_API_TOKEN` is empty or unset, at request time, as the v1 handlers do; a matching
   non-empty token is still accepted.
3. `messages/[id].ts` takes `id` through `messageIdShape` (imported, unchanged); a malformed id answers 400 with no database read.
4. A spec test enumerates every route file under `src/pages/api/v1/` from the filesystem, imports each default handler, and asserts 401
   with no database read for a request with no credential; shown red by an unguarded stub route, then restored (handoff item 3).
5. `makeRes` moves from `src/server/api/v1/__tests__/helpers/apiResponse.ts` to `src/server/api/__tests__/helpers/apiResponse.ts`, its
   importers updated; per-file case count and pass set identical before and after (handoff item 5).

Write set: website `src/pages/api/v1/guilds/[guildId]/messages.ts`, `.../messages/[id].ts`, `src/pages/api/interactions-server.ts`, one
new module under `src/server/api/utils/`, and `src/server/api/**/__tests__/**`; in the record, this document and
`verification/fix-api-secret-compare/`. Every path this chain changed is inside it (`git diff --name-only b68f94c..32d10f7`, 14 paths, the helper move counted once as a rename, `grep -c .` over the listing saved to a file).

## Entry Conditions

| # | Condition | Read |
|---|---|---|
| 1 | Scoping determination | `steering/fix-api-secret-compare-rulings.md` block "2026-11-21T13:42Z" names `fixer-fix-api-secret-compare`; relayed by the brief `steering/fix-api-secret-compare-brief-fixer.md` and its common part. |
| 2 | Bounded scope statement | The same block, items 1-5 above, with the write set, the exclusions and the sweep's properties A1 and A2. |
| 3 | Fix branch | `git -C website branch --show-current` → `chain/fix-api-secret-compare` (13:44Z), HEAD `b68f94c`, cut by steering; never switched here. |
| 4 | Record on the mechanism | `architecture/system-architecture.md` L117, L119, L126, L171 (cited by the common part; this chain changes none of what they state); the scope sweep `verification/fix-api-secret-compare/scoping/sweep.md`, its re-read `premises-b68f94c.md`, the refutation `refutation-empty-token.md`; source handoff `handoff/website-api-handler-hardening-2026-10-10.md` (b1fdd41a). No `research/` entry names these handlers (the sweep's finding, not re-run). |

**Premise correction (brief and block):** both say `makeRes` has 4 importers. At `b68f94c` it has **5**:
`grep -rn "apiResponse" src` lists the 3 under `v1/__tests__/`, `messages/__tests__/messageCodes.malformed-query.test.ts`, and
`src/server/api/__tests__/cron.scheduled-selection.test.ts` (which arrived after the handoff's count at `7606149`). The fifth is inside
the write set (`src/server/api/**/__tests__/**`) and the move cannot land without updating it, so it was updated with the other four and
carries the same before/after evidence. Not a widening: no file outside the write set.

## Diagnosis

Instrument for every cause: a read of the code path at `b68f94c`, then the red run (Test, below).

- **A1, non-constant-time compare** — `messages.ts:23` and `[id].ts:23`: `req.headers.authorization !== \`Bearer ${key}\``;
  `interactions-server.ts:11`: `req.headers['x-hooks-api-token'] !== env.HOOKS_API_TOKEN`. JavaScript string `!==` returns at the first
  differing code unit. Timing exploitability over the network is unmeasured (the handoff's words); the constant-time property is not
  observable by a functional test, so the evidence that the three sites go through `secretEquals` is a spy on the real module
  (`secretEquals.credential-sites.test.ts`), red at base because the module is absent and red at the fix under a plain-compare control
  at each site (Negative controls).
- **Empty / unset `HOOKS_API_TOKEN`** — `interactions-server.ts:11` has no emptiness guard. Red run output: configured token `''` with
  an empty header → **200** (the command runs); configured token unset with no header → **200** (`undefined !== undefined` is false).
  Matches the refutation helper's runs (b) and (c).
- **A2, id through a JS number** — `[id].ts:19` `z.number({ coerce: true })` accepts `1e3`, `1.5`, `-1`, `' 1'` and
  `9223372036854775808`, which then reach `getPostgres()` (red run: each answered **500** on the test's bare database double, i.e. the
  read was attempted, where 400 is owed). Numbers above 2^53 lose precision: `9223372036854775807` was looked up as
  `9223372036854776000` (red run, the `where` spy's received value).
- **Consumers of the resolved `id`** (the fix changes how it resolves): one — `.where('Messages.id', '=', id)` at `[id].ts:34`. The
  ownership guard `message?.guildId !== guildId` compares `guildId`, not `id`; the response's `id: Number(message.id)` reads the row,
  not the parsed value (and is the excluded output-precision item). No guard compares the raw `req.query.id`
  (`grep -n "query.id\|\bid\b"` over the file at `32d10f7`: the parsed `id` appears at L28, its destructuring, and L34, the `where`; the
  other hits are the type, the join, the select, a dead comment and `message.id`). Behaviour base vs fix: leading zeros
  normalise the same way (`007` → `'7'` at both; at base via `Number`, at the fix via `messageIdShape`'s BigInt round-trip).
- **Residue in production:** none. All three sites are reads; the only state they gate is a database `SELECT` and the bot's
  `get_message` relay, neither of which writes. Vercel's release replaces the functions whole, so the fix reaches every request after
  deploy. Production's `HOOKS_API_TOKEN` value is unread (hazard 1 of the common part): if it is empty or unset, `get_message` stops
  working at deploy until he sets a token in Vercel; checking the live value is his.
- **Edge runtime (common part hazard 3):** `secretEquals` imports `crypto` and is imported only by the three Node API routes
  (`grep -rn "secretEquals'" src bot`, non-test: 3 hits); nothing imports those routes; `interactions-edge.ts`'s imports
  (`discord-verify`, `next/server`, `bot/constants`, `bot/edgeCommands`, `bot/utils/isCommand`, `~/env.mjs`) and `bot/edgeCommands.ts`'s
  do not reach it. Read from imports; `next build` not run (Verification).
- **Header types (hazard 4):** a missing or non-string header is refused by `typeof … !== 'string'` before the compare, never coerced.
- **Lifetimes:** the change adds none. **Irreversible side effects:** none added. **Declined work:** a refused request (401 or 400)
  goes back to its caller and runs nowhere later — the Statbot API caller gets the status; the bot's `get_message` relays the status
  to Discord (`bot/edgeCommands.ts:58-66`), where the user sees the command fail. Nothing is queued.

## Change

Production (`git diff --numstat b68f94c..32d10f7` over production paths: **21 added lines**, 6 removed):

- `src/server/api/utils/secretEquals.ts` (new, +9): `timingSafeEqual` over the SHA-256 digests of both strings.
- `src/pages/api/v1/guilds/[guildId]/messages.ts` (+3 −1): the guard reads `authorization`, refuses a non-string, compares through `secretEquals`.
- `src/pages/api/v1/guilds/[guildId]/messages/[id].ts` (+6 −4): the same guard; `id: messageIdShape`; `.where(…, id)` takes the string.
- `src/pages/api/interactions-server.ts` (+3 −1): refuses an empty or unset configured token and a non-string header; compares through `secretEquals`.

Tests:

- `src/server/api/utils/__tests__/secretEquals.equality.test.ts` (new, 7 cases): equal, unequal same length, unequal lengths ×3 without throwing, both empty, case.
- `src/server/api/utils/__tests__/secretEquals.credential-sites.test.ts` (new, 3 cases): each site passes the header as sent and the configured credential to the real `secretEquals` (spy).
- `src/server/api/__tests__/interactions-server.token-required.test.ts` (new, 10 cases): the bot endpoint's token check; no prior test of `interactions-server` existed (premises file).
- `src/server/api/v1/__tests__/v1Routes.statbot-key-required.test.ts` (new, 2 cases at head): every route file under `src/pages/api/v1/`, enumerated from the filesystem.
- `src/server/api/v1/__tests__/guildMessages.malformed-query.test.ts` (+7 cases): five malformed ids; two lookups (largest id digit for digit; leading zeros).
- Helper move (item 5): `src/server/api/__tests__/helpers/apiResponse.ts` (moved, content identical — git records a 100% rename) and 5 importers' import lines.
- `src/server/api/v1/__tests__/guildMessages.valid-exposure.test.ts`: import line (item 5) and a typed `serialized<T>` helper (see Verification, convention check).
- `src/server/api/__tests__/cron.scheduled-selection.test.ts`: import line (item 5) and the blank line eslint's `import/order` asks for.

Commits on `chain/fix-api-secret-compare`: `3a54c2f` (helper move), `66699c5` (tests, red), `1054bbc` (fix), `32d10f7` (typed helper).

## Test

Spec-form throughout: the source is a code-review handoff carried forward, not an escaped defect, so no bug-form test is earned (brief).

**Red run** — the 5 new or extended files at `66699c5`, whose production paths are byte-identical to `b68f94c`
(`git diff --quiet b68f94c 3a54c2f -- src/pages bot src/env.mjs` exit 0; `66699c5` changes test files only):
`npx vitest run <5 files> --reporter=json` → **exit 1**. Capture: `verification/fix-api-secret-compare/fixer/red-run.json`, `.txt`,
`.exit`; file list `red-files.txt`. Failing, each for the reason named:

| Case | Base result |
|---|---|
| `secretEquals.equality` (file) | `Cannot find module '~/server/api/utils/secretEquals'` |
| `secretEquals.credential-sites` ×3 | `Cannot find module '~/server/api/utils/secretEquals'` |
| bot endpoint, configured `''`, empty header | expected 401, got **200** |
| bot endpoint, configured unset, no header | expected 401, got **200** |
| single, id `1e3` / `1.5` / `-1` / `' 1'` / `9223372036854775808` | expected 400, got **500** (database read attempted) |
| single, looks up the largest message number digit for digit | `where` received `9223372036854776000` |

**Green run** — the same 5 files at `1054bbc`: exit 0, 34 of 34 passed (`green-run.json`); after the lint edits, the 5 plus
`cron.scheduled-selection` at the working tree that became `1054bbc`: exit 0, 37 of 37 (`green-run-postlint.json`).

**Item 4 red (stub route)** — a `git archive` export of `1054bbc` under the session scratchpad, `node_modules` symlinked, the stub
`src/pages/api/v1/guilds/[guildId]/unguarded.ts` added (it reads `getPostgres()` with no guard; copy at `stub-route/unguarded.ts.txt`),
`npx vitest run --no-cache --configLoader runner --config <transcribed config> v1Routes.statbot-key-required.test.ts` under
`systemd-run --user --scope -p RuntimeMaxSec=280 -p MemoryMax=6G -p TasksMax=512`: **exit 1**, "1 failed | 2 passed (3)", the stub's case
failing (`stub-route/with-stub.txt`). Stub removed, same command: exit 0, "2 passed (2)" (`stub-removed.txt`). **Non-vacuity:** the test
pointed at an empty directory in the same export → exit 1, "No test found in suite" (`empty-enumeration.txt`), so an enumeration that
finds nothing fails rather than passes. The export was removed after (`ls -d` → no such file). The stub never entered the shared tree
or a commit.

**Negative controls** — every case added that passed at the red run, each guard clause the diff adds, and each value a call site
chooses, through `python3 ~/.claude/tools/mutation-run.py --repo website --sha 1054bbc --dep node_modules --timeout 240 -- npx vitest run
--no-cache --configLoader runner --config verification/fix-api-secret-compare/fixer/vitest.config.export.ts` (the repo's
`vitest.config.ts` uses `__dirname`, which the runner loader lacks; the transcription uses `process.cwd()` and exports the plain object
so it resolves no package from outside the export). Each control's `tests_run` equals the original config's per-file count at the
green run (24 / 10 / 3 / 12 / 7), so the transcription ran the same cases. Mutants `mutants-1054bbc.json`, table and per-run streams
`mutation-1054bbc/`; the combined control `mutants-1054bbc-combined.json`, `mutation-1054bbc-combined/`. **13 of 13 KILLED**, count
`checked` on every row:

| Control | Killed by |
|---|---|
| list: `typeof authorization` guard removed | statbot-key-required: no authorization header; unauthenticated non-GET |
| single: `typeof authorization` guard removed | the same two |
| bot: `typeof token` guard removed | no token header; a repeated token header |
| bot: `!env.HOOKS_API_TOKEN` guard removed | configured empty with empty header; configured unset with header "undefined" |
| bot: both guards above removed together | adds configured empty with no header (each single guard covers that case alone) |
| bot: `secretEquals` compare removed | wrong token same length; trailing characters; empty token header |
| bot: compare always refuses | runs the command for exactly the configured token |
| bot: reads `x-hooks-token` instead | runs the command for exactly the configured token |
| bot / list / single: plain `!==` in place of `secretEquals` (3 controls) | credential-sites, each site's case |
| single: `messageIdShape` → `z.string().regex(/^[0-9]{1,19}$/)` | id above the largest message number; leading zeros |
| `secretEquals` over raw buffers instead of digests | unequal lengths ×3 (`timingSafeEqual` throws) |

Every red-run-passing added case is in a kill list above; the two v1Routes cases are killed by the stub. No time-based test is added.
Invented values: header and token strings, ids and rows are dummies; `getPostgres` is a double (the brief bars the real database); the
`where` spy's received value is the handler's own argument, not invented.

**Item 5 evidence** — per-file case set (title + status) for the 5 importers, base suite capture vs a run after the move at `3a54c2f`:
identical for all five (3, 3, 5, 24, 6 cases), all passed, exit 0 (`helper-move-compare.txt`, instrument `perfile.py`, inputs
`suite-base-b68f94c.json`, `helper-move-after.json`). `valid-exposure` re-compared after its typing change at `32d10f7`: identical, 6
of 6 (`valid-exposure-after-typing-compare.txt`).

## Verification

- **Existing suite** — `npx vitest run --reporter=json` from `website/` (uncapped: no `ulimit` or cgroup on these three runs):
  base `b68f94c` 2326 of 2326 passed, 162 files, exit 0 (`suite-base-b68f94c.*`); tip `32d10f7` **2355 of 2355**, 166 files,
  **exit 0** (`suite-32d10f7.*`). 2355 − 2326 = 29 = 7 + 3 + 10 + 2 + 7 added cases. By path membership the tip's files are the base's
  plus the four new test files, none missing.
- **Build** — `pnpm run typecheck` (both programs): exit 0 at the tree that became `32d10f7` (`typecheck-final.txt`, `.exit`). The
  workspace `CLAUDE.md` names no other build verification. `next build` **not run**: in an export it would write caches into the shared
  tree's `node_modules` through the symlink; Vercel's build at release is the first full build of this tip.
- **Lint** — `npx eslint --max-warnings=0` over the 14 touched files (`lint-files.txt`): exit 0 (`eslint-touched-final.txt`). The
  repository-wide `npx eslint . --max-warnings=0` at `32d10f7` exits 1 with 812 problems, none naming any of the 14 touched files
  (`grep -cF` of each path over `eslint-repo-32d10f7.txt`: 0 for all 14). Its first run, before the touched-file fixes, read 817
  (`eslint-fix.txt`); the 5 between are the touched-file problems fixed this round (import order ×3, a type-annotation import, a long
  line) — the base's own count was not taken. The lint script itself (`eslint --fix`) was not run, since it rewrites files.
- **Convention check** — `node ~/.claude/tools/convention-check.js website --since=b68f94c` at `32d10f7`: **0 FAIL, 0 CANDIDATE**, exit
  0 (`convention-check-32d10f7.txt`). The first run (`convention-check.txt`) FAILed `guildMessages.valid-exposure.test.ts:38`
  (`@typescript-eslint/no-unsafe-return`), a line this chain did not write that entered the check's set because item 5 changed the file's
  import; fixed at `32d10f7` with a typed `serialized<T>` helper, case set unchanged. SKIPs: 17 `.playwright-mcp/*.png` (untracked,
  another session's, outside the examined set); **the ID-token check did not run** ("states an ID-token class this checker does not
  implement verbatim"). In its place: the workspace's ID-token regex over the changed test files' basenames (0) and their
  `describe`/`it`/`test` and comment lines (0 hits, `grep` exit 1), and added comment lines in `git diff b68f94c..HEAD -- src` (0)
  (`id-token-check.txt`).
- **Package manager:** no install or lockfile change.

## User-visible flows

- **Discord, the hooks bot's "Get JSON" message command (`get_message`):** works as before where production's `HOOKS_API_TOKEN` is
  set and non-empty. If it is empty or unset, the command now fails in Discord until a token is set in Vercel (production's value is
  unread).
- **Statbot API, `GET /api/v1/guilds/{guildId}/messages`:** unchanged for `Authorization: Bearer <key>`; every other credential still
  answers 401.
- **Statbot API, `GET /api/v1/guilds/{guildId}/messages/{id}`:** unchanged for a plain message number. A number written as `1e3`,
  `1.5`, a negative, one with spaces or one above 9223372036854775807 now answers 400 instead of reaching the database. A number above
  2^53 now finds that exact message instead of a rounded neighbour (the response's `id` field still goes through a JS number — excluded,
  not in this scope). The Statbot caller's id form is unread.

## Handoff

- **SHA:** website `32d10f7` (`chain/fix-api-secret-compare`, no upstream; not pushed).
- **Reviews:** `code-reviewer-fix-api-secret-compare`, then **QA Phase 2** (`qa-fix-api-secret-compare`): the fix adds **21**
  production lines (GLOSSARY, "Production line"), at or above 20.
- **Merges:** devops, into website `master` on the owner's word (Vercel production; no `.github/workflows`).
- Process facts this round: the record ignores `*.log` (`.gitignore:21`; 0 tracked `.log` under `verification/`, 2845 `.txt`), so
  every capture here was renamed from `.log` to `.txt` before the commit, contents unchanged; the mutation runner's own per-run
  streams are `.stdout`/`.stderr` as it wrote them. Helper files for evidence (`perfile.py`, the stub copy) were written to the scratchpad and copied into
  `verification/` with `cp`, not the Write tool; they are instruments and a fixture, not record documents. No control or hook refused
  any action.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T13:55 | fixer-fix-api-secret-compare | Created at hand-off: items 1-5 done at website 3a54c2f, 66699c5, 1054bbc, 32d10f7; red, green, stub, 13 controls and suite recorded under verification/fix-api-secret-compare/fixer/; Handoff-At 32d10f7 |
