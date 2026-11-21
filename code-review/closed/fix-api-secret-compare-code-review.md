---
ID: n/a
Origin: fix-api-secret-compare
UUID: fbe73764
Reviewed-At: "0c14d5b — repos=website; Round 1 sub-entry (CR-2 fix round), test-only over 32d10f7"
Status: Released
Status-Detail: "Round 1 APPROVED_WITH_COMMENTS at website 0c14d5b, released to origin/master 2026-11-21T18:35Z; Assumption Not Checked carried by handoff/fix-api-secret-compare-post-deploy-2026-11-21.md."
Round: 1
Verdict: APPROVED_WITH_COMMENTS
---

# Code Review: fix-api-secret-compare

**Plan Reference**: none (fixer route); scope statement `steering/fix-api-secret-compare-rulings.md` block "2026-11-21T13:42Z"
**Implementation Reference**: `agent-output/implementation/fix-api-secret-compare-implementation.md` (agent-output `53460cfd`, Handoff-At `32d10f7`)
**Date**: 2026-11-21
**Reviewer**: code-reviewer-fix-api-secret-compare

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T18:01 | steering-hooks (brief `steering/fix-api-secret-compare-brief-code-reviewer.md`) | Round 1 review of website `b68f94c..32d10f7` | Round 1: APPROVED_WITH_COMMENTS at 32d10f7; live attack 51 of 51 as predicted; CR-1 LOW (optional); 21 production lines → QA Phase 2 |
| 2026-11-21T18:15 | fixer-fix-api-secret-compare (fix round after QA Failed, implementation at agent-output ee847ac1) | Round 1 sub-entry: QAF-1 fix at website b01ae0b | REJECTED at b01ae0b: CR-2 MEDIUM, 5 of 5 variable-time accept-on-equality probe mutants survive across the 4 decision points; production unchanged since 32d10f7 |
| 2026-11-21T18:20 | fixer-fix-api-secret-compare (CR-2 fix round, implementation at agent-output b26ebfa9) | Round 1 sub-entry: CR-2 fix at website 0c14d5b | APPROVED_WITH_COMMENTS at 0c14d5b: CR-2 RESOLVED (7 of 7 probe mutants killed, 2 of them new forms); CR-1 LOW DECLINED by the fixer, accepted; production unchanged since 32d10f7 → QA refresh pass |
| 2026-11-21T18:25 | devops-fix-api-secret-compare | Document closed | Status: Committed (Stage 1). The Assumption Not Checked (Statbot single-message ids) is item 2 of handoff/fix-api-secret-compare-post-deploy-2026-11-21.md |
| 2026-11-21T18:36 | devops-fix-api-secret-compare | Released | Status: Released. Website 0c14d5b is on origin/master (push 2026-11-21T18:35:45Z). Deployment record deployment/closed/fix-api-secret-compare-deployment.md |

## Scope and tree

- Stage start: the fixer's document at agent-output `53460cfd`, `Handoff-At` `32d10f7` (website). `chain/fix-api-secret-compare` read
  `32d10f7` at round open and at the draft (`git rev-parse`, 16:08Z). Every file read via `git show 32d10f7:<path>`.
- Criteria this round assesses: scope items 1–5 of the 13:42Z block as written there, its write set and exclusions, and the brief's
  hazards 2–5.
- Write set: `git diff --numstat b68f94c 32d10f7` lists 14 paths — the three route files, `src/server/api/utils/secretEquals.ts`, and ten
  paths under `src/server/api/**/__tests__/**` (the helper move counted once as a rename). All are inside the write set; `src/env.mjs`,
  `shapes.ts`, `bot/`, `cron.ts` and `interactions-edge.ts` are untouched.
- **Production lines** (GLOSSARY): added column over the four non-test paths = 3 + 3 + 6 + 9 = **21**, at or above 20, so QA Phase 2
  follows this review. That matches the fixer's and steering's count.
- **`makeRes` importers at `b68f94c`**: `git grep -l "helpers/apiResponse" b68f94c -- src` → **5** (`cron.scheduled-selection`,
  `messageCodes.malformed-query`, and three under `v1/__tests__/`). The fixer's premise correction holds; at `32d10f7` the same five
  plus three new files import the moved helper, and one `apiResponse.ts` exists, at `src/server/api/__tests__/helpers/`.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md` (present)
**Alignment Status**: ALIGNED

L117 (Pages Router API endpoints; `interactions-edge.ts` alone on the edge runtime), L119 and L171 (server commands forwarded to
`interactions-server` and authenticated by `HOOKS_API_TOKEN`), and L126 (the v1 API) each still hold at `32d10f7`. The change only
alters how those checks compare. No mechanism the record states changes.

**Edge runtime (hazard 3).** The only importers of `secretEquals` are the three Node API routes: 3 non-test hits from
`git grep -n secretEquals 32d10f7 -- src bot ':!**/__tests__/**'`. Nothing imports those routes. The imports of `interactions-edge.ts`
(`discord-verify`, `next/server`, `bot/constants`, `bot/edgeCommands`, `bot/utils/isCommand`, `~/env.mjs`) and of `bot/edgeCommands.ts`
do not reach it. `src/middleware.ts` (edge) imports only `next/server`, and its matcher does not cover `/api/v1` or
`/api/interactions-server`. This was read from imports; no build was run.

## Review by surface

- **`secretEquals` (`src/server/api/utils/secretEquals.ts`)**: `timingSafeEqual` over the SHA-256 digests of both strings, as scope
  item 1 requires. Both digests are 32 bytes, so it never throws on unequal lengths (hazard 2) and leaks no length. The digest is taken
  over the UTF-8 encoding, which is lossy only for lone surrogates. A header string cannot carry one: Node decodes header bytes as
  latin-1, and the probe below shows a 0xFF byte arriving as U+00FF. The contract therefore excludes that input, and no finding follows
  (disposition order, step 1).
- **The three guards**: each refuses a non-string credential with `typeof … !== 'string'` before comparing, never coercing it
  (hazard 4). The bot guard refuses an empty or unset `HOOKS_API_TOKEN` with `!env.HOOKS_API_TOKEN` (scope item 2). The v1 guards keep
  `!key` and compare against `` `Bearer ${key}` `` (scope item 1).
  - The two v1 guards are the same statement written twice; that duplication predates this chain. The scope admits one new module for
    `secretEquals` only, and the item 4 guard test catches a v1 route without the guard. No finding.
- **Id rider (`messages/[id].ts`)**: `id: messageIdShape`, imported unchanged, and `.where('Messages.id', '=', id)` takes the string.
  `messageIdShape` (`shapes.ts`) is a `^[0-9]{1,19}$` regex, a BigInt bound of 2^63−1, and a string result. A JS `$` does not match
  before a trailing newline. The parsed `id` is read only at the `where`. Leading zeros normalise as before.
- **Wire shapes** (probe `verification/fix-api-secret-compare/code-review/header-shape-probe.mjs`, output `header-shape-probe.txt`, Node
  v24.14.0, raw socket to `node:http`):
  - A repeated `X-Hooks-Api-Token` arrives as one joined string (`"other, tok"`), so it is refused.
  - A repeated `Authorization` keeps the first value.
  - Surrounding whitespace is stripped.
  - Base and fix read the same header values, so the change alters none of these.
  - The token-required test's array case `[TOKEN]` is the declared type, not a Node wire form, and is a sound check of the `typeof`
    guard.
- **Tests**: spec-form throughout, with no bug-form test and no escaped provenance claimed. That is correct: the source is a review
  handoff, so the defect is intra-chain.
  - The five extended files keep their existing cases.
  - Expected values are literals, never derived from the code under test (axiom E). The `where` spy records the handler's own
    argument.
  - Hazard 5: `secretEquals.credential-sites.test.ts` wraps the real `secretEquals` in a spy. Each site must call it once with the sent
    header and the configured credential, and the fixer's plain-`!==` control kills each site's case. The `secretEquals` cases are
    behavioural: equal, unequal, unequal lengths ×3 without throwing, both empty, and case.
  - The red run, the stub-route red run and the 13 negative controls are recorded under `verification/fix-api-secret-compare/fixer/`.
    These were read here, not re-run (QA Phase 2 owns the re-run).
  - No time-based test was added.
- **Convention check**: `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website --since=b68f94c` at `32d10f7`: exit 0,
  14 files examined, **0 FAIL, 0 CANDIDATE**, 18 SKIP (`verification/fix-api-secret-compare/code-review/convention-check-32d10f7.txt`).
  - 17 of the SKIPs are untracked `.playwright-mcp/*.png` files, outside this change.
  - The eighteenth SKIP is **the ID-token/basename check, which did not run**. In its place this round ran the workspace's ID-token
    class over the ten changed test paths' basenames, their `describe`/`it`/`test` and comment lines, and every added test line in the
    diff. The only hit is `'007'`, an id value in `guildMessages.malformed-query.test.ts`. That is fixture data under the bounded
    exemption, not a name.
  - Blind spot of the line predicate: an `it.each` title row on its own line. The predicate run over all added lines covers it.
  - No source comment is added under `src/pages` or in `secretEquals.ts`.
- **User-visible flows**: each of the fixer's three flows matches the code read here.
  - Bot `get_message`: `serverCommands` holds `get_message` only. It fails in Discord when the token is empty or unset.
  - The v1 list is unchanged for `Bearer <key>`.
  - Single message: `1e3`, `1.5`, a negative, a spaced id and ids above 2^63−1 now answer 400. Ids above 2^53 are looked up exactly.
  - No flow is found wrong.

## Adversarial execution

**Process disclosure.** The first start of the server was not completed. On the owner's word (selection 16:1xZ, relayed by
steering-hooks) it was re-run with one change, the dummy database name, from `none` to `nodb`.

**Run (17:5xZ).** `next dev --webpack` served a `git archive` export of `32d10f7` on 127.0.0.1:39417.

- Contained in `systemd-run --user --scope -p RuntimeMaxSec=1500 -p MemoryMax=6G -p TasksMax=512`, started under `env -i`.
- Settings: `SKIP_ENV_VALIDATION=1`, dummy `HOOKS_API_TOKEN` and `STATBOT_API_KEY`, `DATABASE_URL` and `REDIS_URL` at
  127.0.0.1:1 (a closed port).
- The export held no `.env` files, and `node_modules` was a symlink to the shared tree's.
- Module-scope branch: `src/env.mjs` takes `process.env` unvalidated when `SKIP_ENV_VALIDATION` is non-empty. Its live value here was
  `1`, set by this run, so every value the handlers read was a dummy.
- Middleware does not match the attacked paths.
- Server log: `verification/fix-api-secret-compare/code-review/next-dev-32d10f7.txt`.
- Teardown: the scope was stopped with `systemctl --user stop`. Afterwards `ps` showed 0 matching processes, `ss` showed 0 listeners on
  39417, and the export was removed (`ls -d` → no such file). The shared `node_modules` is intact.

**Result:** `verification/fix-api-secret-compare/code-review/attack-32d10f7.txt`: **51 cases, 0 unexpected**, exit 0.

- Every refused credential answered 401 with 0 database attempts.
- Every malformed id with the right key answered 400 with 0 attempts.
- The exact credentials passed:
  - bot: 400 from `get_message`'s body check;
  - v1: 500 with 2 `ECONNREFUSED` lines each.
  The oracle therefore fired on the pass side and discriminates.
- An exact token padded with whitespace passes, because HTTP strips optional whitespace before the handler sees the header. The same
  holds at base.
- A repeated `Authorization` header with the right key first passes, because Node keeps the first value. The same holds at base.
- **Residue** (outside the criterion's class):
  - `?id=2` beside a path id of 1 reaches the database: Next gives the path parameter precedence, and the same holds at base.
  - Unset and empty configured credentials need a server per configuration and were not run live. The unit cases in
    `interactions-server.token-required` and `guildMessages.statbot-key-required` cover them.

- **Driver**: `verification/fix-api-secret-compare/code-review/attack-driver.mjs`.
- **Input class**: 51 raw-socket requests across the bot endpoint, the v1 list and the v1 single route, covering:
  - exact credentials and missing, empty, prefix, suffix, same-length-wrong and case-changed credentials;
  - `undefined`, latin-1 bytes, and repeated and reordered headers;
  - the credential under the other route's header, and header-name case;
  - methods;
  - the id forms `1e3`, `1.5`, `-1`, a space, a newline, `0x10`, a fullwidth digit, `Infinity`, 20 digits, 2^63, 2^63−1, `007` and
    `0`;
  - query keys.
- **Oracle, fixed before the attack**:
  - Bot: 401 means refused. 400 from `get_message`'s body check means the guard passed.
  - v1: 401 or 400 with no new `ECONNREFUSED` line in the server log means no database read. 500 with one means the read was
    attempted. The database is pointed at a closed port.

## TDD Compliance Check

**TDD Table Present**: the fixer route keeps no TDD table. Its Test section plays that role: the red run per case, the green run, the
stub red run, and 13 of 13 controls killed.
**All Rows Complete**: Yes. Every added case that passed at the red run appears in a kill list.
**Concerns**: none beyond CR-1. `tdd-check.py` covers Python sources only, so it was not run.

## Findings

### Critical
None

### High
None

### Medium
None

### Low/Info

CR-1 LOW Round 1 DECLINED — decided by the fixer (implementation document, agent-output `b26ebfa9`) and accepted here as optional.

- The gap: `v1Routes.statbot-key-required.test.ts` enumerates `.ts`/`.tsx` route files only. Next also routes `.js`, `.jsx` and files
  under `__tests__`.
- 0 live members today (`route-filter-probe.mjs`/`.txt`).
- The fixer's reasons for declining: the preferred form is larger than a test-only round, and dropping the `__tests__` exclusion would
  import test files as handlers.
- The full argument is in agent-output `8214c8c`.

### Round 1 sub-entry — QAF-1 fix round at website `b01ae0b`

- **Scope**: the fix diff `32d10f7..b01ae0b` only. One commit changes
  `src/server/api/utils/__tests__/secretEquals.equality.test.ts` (+33 −1). Production is byte-identical to `32d10f7`
  (`git diff --quiet 32d10f7 b01ae0b -- src/pages bot src/env.mjs src/server/api/utils/secretEquals.ts` → exit 0). This is test-only,
  so it is a sub-entry, not a new round. The branch read `b01ae0b` at the start and at the end (18:15Z).
- **What holds**:
  - The digest literals are independent of the code under test: `printf abc | sha256sum` → `ba7816bf…15ad` and
    `printf abcd | sha256sum` → `88d4266f…1589`, both matching the test.
  - The `crypto` mock spreads the real module and wraps `timingSafeEqual`, so the seven earlier cases still run the real compare.
  - The test adds no comment and no ID token, and its name is unchanged.
  - Re-attacked from first principles (the fix touches a test guard), not taken from the fixer's 6 of 6.
- **Probe of the fix**: the instrument is `mutation-run.py` at `b01ae0b`, with the fixer's transcribed config. Mutants and predictions
  were written before the run.

  | Mutant | Predicted | Result |
  |---|---|---|
  | `timingSafeEqual(…) \|\| a === b` | survives | **SURVIVED** |
  | `a === b \|\| timingSafeEqual(…)` | survives | **SURVIVED** |
  | `a.length === b.length && timingSafeEqual(…)` | killed (my positive control) | **KILLED** by both new cases |

  Each row ran 9 of 9 tests against a 9-test control, so the counts match. Files: `verification/fix-api-secret-compare/code-review/mutants-b01ae0b.json`
  and `mutation-b01ae0b/`.

  The same accept-on-equality form was also placed at each call site:
  `!(sent === configured || secretEquals(sent, configured))`. It ran against `secretEquals.credential-sites` plus the site's own
  suites: `interactions-server.token-required` for the bot (13 tests), and all of `src/server/api/v1/__tests__/` for each v1 route
  (47 tests). **3 of 3 SURVIVED**, with the controls passing. Files: `mutants-sites-b01ae0b.json` and `mutation-sites-b01ae0b/`.
- Scratch exports were removed (`ls -d` → no such file), and `ps` showed 0 runner processes left.

CR-2 MEDIUM Round 1 raised here (accept-on-equality form unasserted at all 4 decision points; 5 of 5 probe mutants survived).
Its argument is in agent-output `8214c8c`, and its disposition is in the `0c14d5b` sub-entry below.

**Sub-entry verdict: REJECTED** at `b01ae0b`, on CR-2 (severity floor).

### Round 1 sub-entry — CR-2 fix round at website `0c14d5b`

- **Scope**: the fix diff `b01ae0b..0c14d5b` only. One commit, test-only: `secretEquals.equality.test.ts` +5, and
  `secretEquals.credential-sites.test.ts` +29 −8. Production is byte-identical to `32d10f7` (`git diff --quiet b01ae0b 0c14d5b --
  src/pages bot src/env.mjs src/server/api/utils/secretEquals.ts` → exit 0). The branch read `0c14d5b` at the start and at the end
  (18:20Z).
- **The new cases**:
  - `secretEquals` with two equal strings answers false when `timingSafeEqual` is mocked to answer false.
  - Per site (×3): the exact configured credential is refused with 401 when the `secretEquals` spy answers false once. The response
    has ended, `getPostgres` (now a `vi.fn`) is not called, and `get_message` (now a spy in the `bot/serverCommands` mock) does not
    run.
  - The fixture opposes string equality, as CR-2 required.
- **Re-attack** (`mutation-run.py` at `0c14d5b`, the fixer's transcribed config): CR-2's five mutants, plus two new forms that call
  the compare but ignore its answer (`timingSafeEqual(…); return a === b;` and, at the bot site,
  `(secretEquals(token, configured), token !== configured)`). Predicted all killed.
  - Result: **7 of 7 KILLED**, `count checked` on each (controls of 10, 16 and 50 tests).
  - Each mutant was killed by one of the new cases: the `||` forms by "refuses two equal strings…", and each site's form by its
    "refuses the exact configured credential…".
  - Files: `verification/fix-api-secret-compare/code-review/mutants-0c14d5b.json` and `mutation-0c14d5b/`. The scratch export was
    removed, and `ps` showed 0 runner processes left.
- **CR-2 sweep re-run**:
  - `git grep -c "secretEquals(" 0c14d5b -- src ':!**/__tests__/**'` → 4 decision points.
  - Fixtures opposing string equality: `mockReturnValueOnce` → 3 hits. `true`-for-unequal and `false`-for-equal cover `secretEquals`;
    `false` for the exact credential covers the three sites through `describe.each`. All 4 points are pinned in both directions.
- **Conventions**: convention check since `b68f94c` at `0c14d5b`: exit 0, 0 FAIL, 0 CANDIDATE, 18 SKIP, the same as before including
  the skipped ID-token check (`convention-check-0c14d5b.txt`). Added lines carrying an ID token: 0. Added comment lines: 0.

CR-2 MEDIUM Round 1 RESOLVED — the accept-on-equality form is pinned at all 4 decision points by fixtures that oppose string
equality; website `0c14d5b`. Check that fails if it returns: `mutants-0c14d5b.json`, 7 of 7 killed (`mutation-0c14d5b/`).
Duplicates: QAF-1 in qa/fix-api-secret-compare-qa.md

**Sub-entry verdict: APPROVED_WITH_COMMENTS** at `0c14d5b`. CR-1 LOW was declined, and the decline is accepted.

## Verdict

**Status**: APPROVED_WITH_COMMENTS at website `0c14d5b` (Round 1, latest sub-entry). Earlier in this round: APPROVED_WITH_COMMENTS
at `32d10f7`, then REJECTED at `b01ae0b` (CR-2).
**Rationale**: scope items 1–5 are met, and hazards 2–5 were re-derived and hold. The live attack at `32d10f7` found no refused
credential reaching a command or the database, and no malformed id reaching the database. Production is unchanged since then. The
constant-time decision is now pinned at every decision point. CR-1 LOW remains, declined and accepted.

## Required Actions

None.

## Assumption Not Checked

Round 1: This review assumes the Statbot API caller sends a single message's id as a plain decimal of at most 19 digits. statbot-api
is outside this workspace and was not read. A JS caller re-serialising the list endpoint's JSON numbers stays in digit form below
1e21. If the assumption is false, the Statbot caller's single-message requests start answering 400 after the website `master`
production deploy. Devops owns closing it, by reading the production request log for `/api/v1/guilds/*/messages/*` 400s once the
release serves.

## Next Steps

- QA's refresh pass of Phase 2 (`qa-fix-api-secret-compare`) at `0c14d5b`, since the change is still 21 production lines.
- The Assumption Not Checked above is routed to devops.
