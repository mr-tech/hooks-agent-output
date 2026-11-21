---
ID: n/a
Origin: fix-api-secret-compare
UUID: fbe73764
Verified-At: "0c14d5b — repos=website; refresh pass, test-only over 32d10f7 (production byte-identical)"
Status: QA Complete
Status-Detail: "Phase 2 PASS at website 0c14d5b (refresh after QAF-1); QAF-1 and QAF-2 resolved; register B-1 (post-deploy, devops) open; devops for website master next."
Phase: 2
---

# QA Report: fix-api-secret-compare

**Plan Reference**: none (fixer route). Scope: `steering/fix-api-secret-compare-rulings.md` block "2026-11-21T13:42Z", items 1–5.
**Stage start**: the code review's committed verdict, `code-review/fix-api-secret-compare-code-review.md` (agent-output `48168cf3`),
`Reviewed-At` `32d10f7`, round 1 APPROVED_WITH_COMMENTS; the fixer's document `implementation/fix-api-secret-compare-implementation.md`
(agent-output `53460cfd`, `Handoff-At` `32d10f7`). Brief: `steering/fix-api-secret-compare-brief-qa.md` and its common part.
**Tree**: website `chain/fix-api-secret-compare` at `32d10f7` (`git rev-parse HEAD`, 18:04Z); base `b68f94c`. Every other SHA read from a
`git archive` export.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T18:09 | steering-hooks (brief `steering/fix-api-secret-compare-brief-qa.md`) | QA Phase 2 of website `b68f94c..32d10f7` (21 production lines) | Phase 2: QA Failed at 32d10f7 — QAF-1 MEDIUM (constant-time decision unasserted; 2 sweep survivors), QAF-2 LOW; suite 2355/2355 exit 0; sweep 39 of 43 killed; edge graph clear; id oracle 0 malformed ids reach the database |
| 2026-11-21T18:23 | code-reviewer-fix-api-secret-compare (sub-entry APPROVED_WITH_COMMENTS at `0c14d5b`, agent-output `799172ab`) | Phase 2 refresh at website `0c14d5b` | Phase 2: QA Complete at 0c14d5b — QAF-1 and QAF-2 resolved; suite 2361/2361 exit 0; survivors 3 of 4 killed, the fourth equivalent; register B-1 minted |

## Test Strategy (Pre-Implementation)

A fixer chain has no Phase 1 by the owner's selection (stage set, common part); this is a Phase 2 record only. No irreversible
effect is touched (the three sites gate a `SELECT` and the bot's `get_message` relay; fixer's Diagnosis, read and agreed), so no
Irreversible Side-Effect Register is produced.

### Named mutants

none (no Phase 1).

## Criteria this pass assesses (recorded before execution)

1. Item 1: one `secretEquals` compares by `timingSafeEqual` over SHA-256 digests, used at the three sites; v1 still refuses an unset or
   empty `STATBOT_API_KEY` and accepts exactly `Bearer <key>`.
2. Item 2: `interactions-server` refuses an empty or unset `HOOKS_API_TOKEN` (401); a matching non-empty token is accepted.
3. Item 3: `messages/[id].ts` takes `id` through `messageIdShape`; a malformed id answers 400 with no database read.
4. Item 4: the every-route test enumerates `src/pages/api/v1/` and asserts 401 with no database read.
5. Item 5: `makeRes` moved, importers updated, per-file case sets identical.
6. Hazards 3 (edge bundle) and 4 (non-string header refused, never coerced) of the common part.

Example classes: item 3 names `1e3`, `1.5`, a negative, a spaced id, an id above 2^63−1 — the class is "an id that is not a bigint
value in decimal digits"; the suite enumerates five members, so the class was run through an oracle (below). Item 1's class is "a
credential compare whose time depends on the content compared"; its members are the three sites (spy test) and `secretEquals`
itself (QAF-1).

## Implementation Review (Post-Implementation)

### Code Changes Summary

`git diff --numstat b68f94c 32d10f7`: 14 paths; production `src/server/api/utils/secretEquals.ts` (new, `secretEquals`, `digest`),
`src/pages/api/interactions-server.ts` (`handler`), `src/pages/api/v1/guilds/[guildId]/messages.ts` and `.../messages/[id].ts`
(`handler`, `queryShape`); 21 added lines over those four. Tests and the helper move as the fixer's Change section lists them. Read
whole at `32d10f7`.

### TDD compliance (fixer route)

No table is owed on a `fix-` chain; the evidence is the fixer's Test section. Re-derived from its captures, not its prose
(`fixer/red-run.json`, `fixer/green-run.json`, read with a JSON reader): red run exit 1, 27 cases collected, 11 failed, plus
`secretEquals.equality` failing at collection (`Cannot find module`) — the failing titles match the fixer's table row for row; green run
exit 0, 34 of 34. Complete.

## Test Coverage Analysis

| File | Function/Class | Test File | Test Case | Coverage Status |
|---|---|---|---|---|
| `secretEquals.ts` | `secretEquals` equality | `secretEquals.equality.test.ts` | 7 cases | COVERED |
| `secretEquals.ts` | `secretEquals` decides through `timingSafeEqual` over digests | — | — | **MISSING (QAF-1)** |
| three routes | each site calls `secretEquals(sent, configured)` | `secretEquals.credential-sites.test.ts` | 3 cases | COVERED |
| `interactions-server.ts` | token guard, empty/unset token | `interactions-server.token-required.test.ts` | 10 cases | COVERED |
| v1 routes | key guard, unset/empty key, exact `Bearer <key>` | `guildMessages.statbot-key-required.test.ts` | 24 cases | COVERED |
| `[id].ts` | `messageIdShape` on `id`, exact lookup | `guildMessages.malformed-query.test.ts` | 12 cases | COVERED |
| v1 routes | every route refuses no credential | `v1Routes.statbot-key-required.test.ts` | 2 cases | COVERED (CR-1 residue) |

### Test audit (touched surface, workspace Test Conventions)

- Names: all ten changed test paths conform to the positive form; no ID token in a basename, title or comment beyond the `'007'`
  fixture datum (the reviewer's check, re-read here on the files at `32d10f7`).
- Spec-form throughout; no bug-form test, none earned (intra-chain source). No pin, guard-framing, source-text assertion,
  transcription or hand-rolled renderer. No time-based cell. The `getPostgres` and `bot/serverCommands` doubles are named by the fixer
  (Invented values) and stand for the store only as "no row" / "a command ran"; no fixture invents a store's return a criterion rests on.
- Compound predicates: each conjunct of the three guards is the sole carrier of a decision in at least one fixture — every conjunct
  removal below is KILLED (`!key` by "fails closed when the server key is empty" with header `Bearer `; `!env.HOOKS_API_TOKEN` by
  configured `''` with an empty header).
- CR-1 (the every-route filter omits `.js`/`.jsx` and `__tests__` routes): concurred; live members 0; left with the fixer as the
  review routed it.

## Test Execution Results

All captures under `verification/fix-api-secret-compare/qa/`.

### Unit / integration suite

- `npx vitest run --reporter=json` in the shared tree at `32d10f7` (uncapped): **exit 0**, 2355 of 2355 passed, 166 files
  (`suite-32d10f7.json`, `.txt`, `.exit`). By path membership against the fixer's base capture (`fixer/suite-base-b68f94c.json`, 162
  files): the four new test files added, none removed. Per-file counts on the touched surface: 10 / 3 / 7 / 12 / 24 / 6 / 2, plus
  `cron.scheduled-selection` 3 and `messageCodes.malformed-query` 3, all passed.
- `pnpm run typecheck` (both programs): **exit 0** (`typecheck-32d10f7.txt`, `.exit`).

### Mutation sweep

- Range `b68f94c..32d10f7`, production files swept: the four above (`mutant-gen.js --range`, 20 operator mutants, every test file
  skipped by name — `mutants-gen-32d10f7.txt`) plus 23 QA mutants (`mutants-qa-32d10f7.json`: conjunct removals, self-compares, scheme
  drop, id unvalidated / base coerce restored / lookup through `Number`, and five on `secretEquals`). Merged set
  `mutants-sweep-32d10f7.json` (blob `1739c6f4`).
- Suite: the 7 test files that import a changed module (`git grep -l -E "pages/api/interactions-server|pages/api/v1|utils/secretEquals|api/v1/guilds" 32d10f7 -- 'src/**/__tests__/**' 'bot/**'`
  — 7 files; no other file imports them), run by `mutation-run.py` (blob `b26916e7`) with the fixer's transcribed config
  `fixer/vitest.config.export.ts` (blob `21325715`); runs by a helper, table read here.
- **39 of 43 mutants matching the operator set and the QA list over the four production files killed — excludes `??`, `?.`, `=>`,
  comparisons inside template substitutions (mutant-gen's stated limits)**; stillborn 0, aborted 0; control 64 cases (= 10+3+7+12+24+6+2),
  every row `tests_run` 64. Table: `mutation-32d10f7/mutation-table-32d10f7e…-20261121T180542Z-p2716153.json`.
- Survivors, dispositioned:
  - `qa-bot-coupling-type-gated-on-env` — **equivalent**: `!env.HOOKS_API_TOKEN` is evaluated first and refuses whenever the gate it
    adds is false.
  - `qa-secret-equals-md5` — equivalent to every caller (both digests fixed-length); scope item 1 names SHA-256; the proposed case
    below kills it.
  - `qa-secret-equals-plain-equality` (`return a === b;`) and `qa-secret-equals-buffer-equals` (`digest(a).equals(digest(b))`) —
    **not equivalent**: each removes the constant-time property the chain exists to add. QAF-1.

### Edge runtime (hazard 3)

Instrument `edge-import-graph.mjs` (esbuild 0.14.47 bundle, no output, bare packages external, tsconfig paths) over an export of
`32d10f7`: `interactions-edge.ts` reaches 10 project files and `discord-verify, form-data, next/server, zod` — **not**
`secretEquals.ts`, not `crypto`; positive control `interactions-server.ts` reaches both (`edge-import-graph-32d10f7.txt`, exit 0).
Planted member: an import of `secretEquals` added to the export's edge route → FAIL, exit 1 (`edge-import-graph-planted.txt`). Instrument
history: first two runs read external packages as empty (esbuild 0.14's metafile omits external imports), caught by the positive
control and fixed (`-first-run`, `-second-run` captures kept). Bound: static and literal dynamic imports only.

### Message-id oracle (item 3, the class)

Instrument `id-oracle.oracle.test.ts`, copied into exports and run contained (`systemd-run --scope`, `unshare -rn`): the real handler
over 1422 distinct ids (enumerated forms, boundaries, 16 separator characters in three positions, 1500 seeded random strings over
`0-9 +-.eEx\n`, 500 random digit strings), beside a domain oracle (ASCII decimal digits, value ≤ 9223372036854775807, lookup = the
value's canonical decimal). Summary `id-oracle-summary.txt`:

- `32d10f7`: 903 oracle-rejected ids — **0 reach the database**, all 400. 519 oracle-accepted — 511 looked up exactly; **8 disagree**,
  all ids zero-padded to 20+ characters, answered 400 with no read (QAF-2).
- `b68f94c` (discrimination control): 205 disagreements (e.g. `1e3` looked up as 1000, `9223372036854775807` as `…6000`, `''` as 0).

## Phase 2 refresh at website `0c14d5b`

- **Stage start**: the reviewer's committed sub-entry "Round 1 sub-entry — CR-2 fix round at website `0c14d5b`" (agent-output
  `799172ab`, `Reviewed-At` `0c14d5b`); fixer's document `Handoff-At` `0c14d5b`. Branch read `0c14d5b` (`git rev-parse`, 18:20Z).
- **Differential** (scopes the pass, never replaces it): `git diff --numstat 32d10f7 0c14d5b` → 2 test files only
  (`secretEquals.equality.test.ts` +38 −1, `secretEquals.credential-sites.test.ts` +29 −8); `git diff --quiet 32d10f7 0c14d5b -- src/pages
  src/server/api/utils/secretEquals.ts bot src/env.mjs` → exit 0. Production is byte-identical, so the edge graph and id oracle results at
  `32d10f7` stand for this tree; the sweep re-runs only the survivors this round closes (owner ruling on round re-runs).
- **Test audit of the diff**: spec-form; names and titles conform, no ID token; expectations are literals (SHA-256 vectors from FIPS
  180-2 and `sha256sum`), not computed by the code under test. New cases: `secretEquals decides through crypto.timingSafeEqual` ×3
  (digests once; answers what `timingSafeEqual` answers; refuses equal strings when it refuses) and, per site,
  `refuses the exact configured credential when secretEquals refuses it` ×3 — fixtures that oppose string equality in both directions.
- **Suite** at `0c14d5b` (shared tree): **exit 0**, 2361 of 2361, 166 files (`suite-0c14d5b.*`). Against `suite-32d10f7.json` by path and
  case: same files; the only changes are +3 cases in each of the two files above, all passed. `pnpm run typecheck`: exit 0
  (`typecheck-0c14d5b.*`).
- **Survivor re-run** (`mutants-survivors-0c14d5b.json`, blob `fbd3b2e6`; `mutation-run.py` at `0c14d5b`, same 7-file suite and config;
  helper run, table read here: `mutation-0c14d5b/mutation-table-0c14d5be…-20261121T182157Z-p2859270.json`): **3 of 4 mutants from the
  first sweep's survivor list killed**, count checked, control 70 cases (= 64 + 6). `a === b` and `Buffer.equals` killed by all three
  new `secretEquals` cases; md5 by the digest case. `qa-bot-coupling-type-gated-on-env` survives — equivalent, as dispositioned above.
- The reviewer's CR-2 attack (7 of 7, `code-review/mutation-0c14d5b/`) is the reviewer's instrument, read and not re-run.
- CR-1 LOW: declined by the fixer, accepted by the reviewer; this gate concurs (0 live members) and raises nothing on it.

## Findings

QAF-1 MEDIUM Phase 2 RESOLVED — the constant-time decision is asserted at website `0c14d5b`
(`secretEquals.equality.test.ts`, describe "secretEquals decides through crypto.timingSafeEqual"); survivors killed, refresh above.

QAF-2 LOW Phase 2 RESOLVED — the fixer's Diagnosis and User-visible flows narrowed to 19 characters with the padded case named
(`implementation/fix-api-secret-compare-implementation.md`, lines read at agent-output `799172ab`).

## Findings as raised at `32d10f7` (superseded by the dispositions above)

QAF-1 (as raised) — `secretEquals` (`src/server/api/utils/secretEquals.ts`, `secretEquals`) has no assertion that fails when its
decision stops going through `crypto.timingSafeEqual`: with `return a === b;` or `digest(a).equals(digest(b))` every case in the suite
passes (sweep survivors above). The constant-time compare is the property scope item 1 claims and the reason for the chain; the
credential-sites spy pins only the hop from the three sites into `secretEquals`. Severity floor: a claimed behaviour with no failing
assertion — blocks.
- **Property to check**: `secretEquals(a, b)` calls `timingSafeEqual` once, with the SHA-256 digests of `a` and `b`, and returns its answer.
- **Proposed case** (the fixer's to adopt, adapt or replace): `verification/fix-api-secret-compare/qa/proposed-secretEquals.equality.test.ts`
  — the existing file extended (Before adding a test) with a `crypto` module spy (`vi.mock('crypto', importOriginal)`) and two cases;
  expectations are the FIPS 180-2 vector for `"abc"` and `sha256sum` of `"abcd"`, literals. Seen: green at `32d10f7` (9 of 9), red under
  `a === b` (2 cases), `Buffer.equals` (2 cases) and md5 (1 case) — driver `proposed-case-red.sh`, captures `proposed-case-red-*.txt`.
  Not run through `pnpm run typecheck` or eslint (the shared tree is not this stage's to write); the fixer's gates apply.

QAF-2 (as raised) — the claim "leading zeros normalise as before" (fixer's Diagnosis, "Consumers of the resolved `id`") holds only to
19 characters: an id zero-padded to 20 or more characters (`00000000000000000001`) answers 400 at `32d10f7` where `b68f94c` looked it up
(oracle above). Fails closed; the Statbot caller sends JSON numbers re-serialised, never zero-padded (reviewer's Assumption Not
Checked, not re-read). Disposition owed: the fixer's document narrows the claim (and its User-visible flows line, if it keeps one on
this); no code change asked. Non-blocking.

## Assumption Not Checked

Phase 2: This pass assumes Vercel's Node.js runtime for the Pages API routes provides `crypto.createHash('sha256')` and
`crypto.timingSafeEqual` as Node v24.14.0 does on this box, and does not test it. Falsity signature: every request to
`/api/v1/guilds/*/messages*` and `/api/interactions-server` answers 500 after the website `master` deploy (the bot's "Get JSON" fails for
everyone). Owner: devops, its post-deploy `get_message` read.

Phase 2 refresh: This pass assumes the differential's file predicate (`src/pages`, `secretEquals.ts`, `bot`, `src/env.mjs`) covers every
production path the routes load at `0c14d5b`, and does not re-run the edge graph or the id oracle on that ground. Falsity signature: a
non-test path outside those four changed in `32d10f7..0c14d5b` — `git diff --name-only 32d10f7 0c14d5b` lists two test files only, so
the premise is checked as far as this pass can see. Owner of anything later: devops's Phase 3 tip check where the tip differs.

## Blocking-condition register

The chain's one register (fixer chain: no UAT in the stage set; there is no plan, so no plan validation line designates an
operator-observed check). Later stage documents — the deployment record and devops's handoff — are authoritative on each row's
execution state.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode | Owner | Discharging document | State |
|---|---|---|---|---|---|---|---|---|---|---|
| B-1 | post-deploy-observable | Scope item 2 and the runtime premise above: after the website `master` deploy, the bot endpoint still accepts production's configured token and the Node runtime runs `secretEquals` | One run of the hooks bot's "Get JSON" (`get_message`) on any message, after the release commit serves on production | The test account in the agents' Discord test server, if the hooks bot is there (unchecked by every stage so far); fallback the owner | Vercel production serving a deployment whose commit contains `0c14d5b` | The message JSON comes back. One failure refutes by construction: a 401-shaped "command failed" means production's `HOOKS_API_TOKEN` is empty or unset; a 500 means the runtime premise is false | If Get JSON fails after the deploy, every hooks-bot user loses it until a non-empty token is set in Vercel or the release is reverted | devops | `handoff/<name>.md`, created by devops at Stage 1 | Open |

B-1 minting limit: the instrument was not run read-only at minting — whether the hooks bot is in the agents' test server is unchecked, and
no stage here holds a production token. Devops shows it on current production at Stage 1, where a pass is expected whatever the token
holds (the old compare accepts an empty one). The reviewer's Assumption Not Checked (Statbot single-message 400s) stays the reviewer's,
routed to devops, and is not a row here.

## Verdict

**QA Complete (PASS)** at website `0c14d5b` (`Verified-At`; this tree only — any later production change expires it). Every criterion
listed above holds; QAF-1 and QAF-2 are resolved; no finding is open. B-1 is post-deploy and does not gate the release act. Next: devops
for website `master`, on the owner's word.

Earlier in this phase: **QA Failed** at website `32d10f7` (this tree only). Blocking: QAF-1. Everything else assessed holds: suite and typecheck green,
39 of 43 mutants killed with two equivalents, edge graph clear, no malformed id reaches the database. A refresh pass at the fixer's new
SHA covers QAF-1's diff (the new cases red under the two survivors, green at the tip), re-runs the suite, and mints the register.

## Process

Processes and scratch: the sweep's exports (helper: `mutwork` empty after, 0 vitest processes), the edge export, two oracle exports and
the proposed-case export — each removed (`ls -d` → no such file for the edge and proposed exports). No control or hook refused any action.
