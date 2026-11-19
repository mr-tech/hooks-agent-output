---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Handoff-At: f83f2ca — repos=website; M5 first delivery (9909fb3 the dependency, 72a1755 the code and its first cases, f83f2ca three cases that close sweep survivors)
---

# Implementation 017 — M5: The stored preview moves only on a confirmed new image; failures are logged (item 2, website)

## Plan Reference

`agent-output/planning/017-existing-items-backlog.md`, revision 7, milestone M5 (M5-0 met; M5-a to M5-g; the rig). Website chain branch
`chain/017-existing-items-backlog`; base for this milestone is M8's first-delivery tip `c37d41a` (M8's fix round `6555f65` sits between M5's
two code commits' base and tip in the history; it touches two test files M5 does not).
Start: `steering/017-rulings.md` block 2026-11-19T05:19Z; QA Phase 1 at `7eda138`. M6 (the generator) has its own document; the two ship in the order § Release and rollback states.

## Date

2026-11-19.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-19T06:12 | implementer-hooks-017 | M5 built: dependency at website `9909fb3`, code and 78 cases at `72a1755`, three survivor-closing cases at `f83f2ca`. Full suite 1814 of 1814 exit 0; typecheck exit 0. Real-Postgres lane 11 of 11, 3 of 3 lane mutants killed. Handed to code review at `f83f2ca`. |
| 2026-11-19T06:30 | implementer-hooks-017 | Round 6 LOWs. CR-14: the `previewWorld` line added under Files Created. CR-15: the interleavings case retitled by behaviour (`leaves the later save's image committed and present`; the chain stays the `play()` argument). Before and after, `previewImage.interleavings.test.ts` runs 38 of 38 passed, exit 0, network-isolated; the pass set differs only in that title; eslint 0. Handoff-At unchanged (a title-only commit on top of `f83f2ca`). |
| 2026-11-19T07:38 | implementer-hooks-017 (resumed) | Premises re-read at the mechanism (§ Resumption premise re-read). QAF-24 (LOW): the real-Postgres lane's P1 rewritten so the save that takes the row lock second began its transaction and its statement first; under `now()`, `statement_timestamp()` and `transaction_timestamp()` it fails, and the control is 11 of 11. Lane-only (`verification/017/m5-pg/`): website stays at `4b8db9c`, so M5's QA verdict there stands. |

## Implementation Summary

The upsert no longer decides the stored preview. `buildUpsertMessageQuery` omits `previewImageNonce` from its insert and its conflict update, and returns the message id and the
database clock beside it (`(extract(epoch from clock_timestamp()) * 1000000)::bigint::text as "savedAtMicros"`), read in the same statement and so under the row's lock. `upsertMessage`
mints the save's nonce from that clock (`mintNonce`: `v`, 16 digits of microseconds, 16 random hex characters), replies with the row as it stands (the previous committed nonce, or null),
and hands `waitUntil` (new dependency `@vercel/functions` 3.11.3) one promise, `runPreviewContinuation`, which: asks the generator (40 s limit, one failure line per failed generation,
`preview-image-failure id=<id> class=<status-500|status-404|status-other|network-error|no-answer-within-T> elapsedMs=<n>`); on a 204 runs one conditional update that moves the nonce
only where the row has none or a lower one under collation `C`, reading the nonce it replaces under the same row lock (`buildCommitPreviewNonceQuery`); then deletes the replaced object
(form 1) and sweeps objects at least 120 s older than the committed one in the bucket's own listing (form 3). A refused commit deletes its own object (form 2). A listing without the
committed object deletes nothing. `previewBucket.ts` holds the one S3 client and the one key form `[dev/]previews/<id>/<nonce>.jpeg`; the delete route's `deleteMessagePreviewImages`
calls it unchanged in behaviour. The generator side (M6) is separate.

## Milestones Completed

M5-0 (met before code), M5-a to M5-g, and the rig, in three commits: `9909fb3` (package.json, pnpm-lock.yaml), `72a1755` (production: `shared.ts`, `previewImage.ts`, `previewBucket.ts`,
`deleteMessagePreviewImages.ts`; tests below), `f83f2ca` (tests only, from the self-check sweep).

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | `steering/017-rulings.md` block 2026-11-19T05:19Z (`04a5e55`) | not owed |
| QA Phase 1 covering M5 | `qa/017-existing-items-backlog-qa.md` at `7eda138`: § M5, NM-10 to NM-17, NM-21 to NM-23, NM-26, EC-1, EC-2, E-1 to E-9, B-4 to B-7, B-11, B-14 | not owed |
| Open questions | none open (`steering/017-rulings.md` 05:19Z: 0 unresolved) | not owed |
| Premise | M5 is not `PREMISE-STALE` | not owed |
| M5-0 met, T = 40 s | limb 2 kept alive (`d61f445`), limb 3 lasts to 55 s (`8f26f37`) | not owed |
| Lockfile step (Recommendation 3): every moved pin dispositioned | see § Lockfile | not owed |
| M5-a, the stored nonce moves only on success, in save order | `buildUpsertMessageQuery` writes no nonce; `buildCommitPreviewNonceQuery` conditional update under the row lock | `previewImage.commit-statement` (all), `previewImage.continuation-outcomes` "commits the nonce…", "answer … leaves the stored nonce alone"; real Postgres: `m5-pg` P1, P3, "refuses a nonce that orders below", "on a row that is gone" |
| M5-a, order token: two properties | `mintNonce` | `previewImage.commit-statement` "the ordered nonce" (shape, padding, fresh random part, later clock above earlier, above any 32-hex nonce); `m5-pg` P1, P2 |
| M5-a, response unchanged except `previewImageNonce` (NM-17, hazard 3) | `waitUntil`, not `await` | `shared.upsert-preview-continuation` "replies while the generator has not answered, with the nonce already committed" |
| M5-b, the named image exists | commit before deletes; deletes never name the committed object | `previewImage.interleavings` (invariant B after every step, 36 rows) |
| M5-c forms 1, 2, 3; property and residue | `runPreviewContinuation`, `sweepOlderObjects` | `previewImage.deletion-forms`; `previewImage.interleavings` (E2, E3) |
| M5-c form 3, L = 120 s, bucket's `LastModified` of the committed object, boundary pair | `SWEEP_AGE_MS` | `previewImage.deletion-forms` "an object %i ms older … is deleted" (120000 true, 119999 false), "measures age by the bucket's times, not the function's clock" |
| M5-c form 3, a listing without the committed object deletes nothing (QAF-13, NM-26) | `if (!committedAt) return` | `previewImage.deletion-forms` "deletes nothing in the sweep when the committed object is not in the listing, and reports no error"; `previewImage.interleavings` "W1 C1 W2 C2 D2 D1" |
| M5-d, a new message stores no nonce until a success | the insert omits the nonce | `previewImage.commit-statement` "names no nonce column in its insert or its conflict update"; `m5-pg` "writes no preview nonce on insert or on conflict" |
| M5-e, the interleaving table: 36 rows, 3120 interleavings, the oracle's invariants B, E1, E2, E3 | the test enumerates the same chains and asserts the oracle's invariants as predicates (never production code) | `previewImage.interleavings` "covers the 3120 interleavings of the 36 class rows" and the 36 row cases |
| M5-f, one line per failure; classes; no line on 204; redaction (NM-15); timer cleared, one line on timeout (NM-16); 404 and 500 distinct (NM-10) | `requestPreview`, `logFailure` | `previewImage.continuation-outcomes` (all) |
| M5-g, key contract: trailing slash (NM-13); the `dev/` predicate (NM-14) | `previewPrefix`, `previewKey` | `previewImage.deletion-forms` "lists the message's prefix with its trailing slash", "leaves another message whose id starts with this one alone", "the development prefix" |
| EC-2, the real-Postgres lane runs the shipped statements | `verification/017/m5-pg/` imports `buildUpsertMessageQuery` and `buildCommitPreviewNonceQuery` | `m5-pg/pg-lane.test.ts`, run by `m5-pg/run.sh` |
| EC-1 (LastModified, not the Date header) | falls away: the plan reads the bucket's own listing time (AF-17) | not owed |
| The rig, handed to UAT | `verification/017/m5-rig/` | `m5-rig/self-test.mjs` (output `impl/m5/m5-rig-self-test.out`) |

## User-visible flows (derived from the codebase)

M5 changes what a saved message's preview shows (a user-visible surface) but adds no control, view or prompt. Every flow is stated by the plan (Human-observable form).

| Flow | Surface | Trigger | What happens next | Rung of the pattern ladder |
|---|---|---|---|---|
| A save while the generator is down or fails | the message list and folder list (`message/page.tsx`, `f/[id]/page.tsx`) | save, then a reload of the list | the old preview keeps showing; one failure line goes to the function log | rung 1: D-2, D-8 |
| A save while the generator works | same | save, then a reload | the new preview shows on the list's next fetch (the list learns a committed nonce only on refetch, AF-18) | rung 1: unchanged read path (`getPreviewImageUrl`) |
| A save of a brand-new message whose first render fails | same | save | the default image shows until a first success (M5-d) | rung 1: `getPreviewImageUrl` already falls back |

No flow holds a decision.

## Deviations

None. Two plan texts were read as follows: the failure-class literals the plan leaves to the implementer ("the outcome class") are `status-500`, `status-404`, `status-other`, `network-error` and
`no-answer-within-T`; an error after a 204 (the commit or a bucket call throws) is not an outcome class of the request, so it is written with no `preview-image-failure` prefix (`console.error(err)`, as the
generator does) and the continuation never rejects.

## Lockfile (Recommendation 3)

`pnpm add @vercel/functions@3.11.3 --lockfile-only` moved one pin it was not asked to: `paracord` (`github:mr-tech/paracord`, a git dependency that tracks a branch head) re-resolved from
`3f203086…` (0.0.5) to `1b7cadb9…` (0.0.9). That hunk was restored by hand to the prior pin before the commit (`pnpm-lock.yaml` now shows 80 lines added, 0 removed, `git diff --numstat 5c3d03f…`); the added entries are
`@vercel/functions` 3.11.3 and its own dependencies `@vercel/oidc` 4.0.9, `@vercel/cli-config` 0.4.0, `@vercel/cli-exec` 1.0.1, `jose` 5.10.0, `os-paths` 4.4.0, `xdg-app-paths` 5.1.0, `xdg-portable` 7.3.0 and
`zod` 4.6.7 (a second major beside `zod` 3.25.76). `pnpm install --frozen-lockfile --offline --ignore-scripts` then ran in an isolated export (`pnpm-frozen-install-export.out`, exit 0) and in the shared tree
(`pnpm-frozen-install-shared.out`, exit 0); the shared `node_modules/.pnpm` listing before and after (`nm-pnpm-before.txt`, `nm-pnpm-after.txt`) differs by nine additions and no removal. Records
under `verification/017/impl/m5/`.

## Files Modified

`git diff --numstat c37d41a f83f2ca` (the two M8 test files in that range are M8's fix round):

| Path | Changes | Lines |
|---|---|---|
| `package.json`, `pnpm-lock.yaml` | the dependency | +1, +80 −0 |
| `src/server/api/utils/shared.ts` | the upsert statement (no nonce, returns the clock), `buildMessageValues` loses its nonce argument, `postMessagePreviewImage` removed, `upsertMessage` hands `waitUntil` the continuation | +13 −29 |
| `src/server/api/utils/deleteMessagePreviewImages.ts` | uses `previewBucket`'s client and prefix | +4 −12 |
| `src/server/api/utils/__tests__/shared.message-cap.test.ts` | fixture re-derived: the insert returns the clock, `waitUntil` is a no-op, the generator never answers | +3 −2 |
| `src/server/api/utils/__tests__/shared.upsert-valid.test.ts` | the nonce argument and fixture field removed | +0 −4 |

## Files Created

| Path | Purpose |
|---|---|
| `src/server/api/utils/previewImage.ts` | `mintNonce`, `buildCommitPreviewNonceQuery`, `runPreviewContinuation` and its helpers (126 lines) |
| `src/server/api/utils/previewBucket.ts` | the one S3 client, `previewPrefix`, `previewKey` (17 lines) |
| `src/server/api/utils/__tests__/previewImage.commit-statement.test.ts` | the statements' compiled form and the nonce (13 cases) |
| `src/server/api/utils/__tests__/previewImage.continuation-outcomes.test.ts` | the request, the failure line per class, the 40 s limit (13 cases) |
| `src/server/api/utils/__tests__/previewImage.deletion-forms.test.ts` | forms 1 to 3, the age boundary, the prefix, the bucket client (15 cases) |
| `src/server/api/utils/__tests__/previewImage.interleavings.test.ts` | the M5-e table: 36 rows over 3120 interleavings (38 cases) |
| `src/server/api/utils/__tests__/shared.upsert-preview-continuation.test.ts` | `upsertMessage` around the continuation (9 cases) |
| `src/server/api/utils/__tests__/helpers/previewWorld.ts` | the in-memory bucket, row, generator and fetch the tests share |
| `verification/017/m5-pg/` | the real-Postgres lane (README, `run.sh`, `pg-lane.test.ts`, config, stub) |
| `verification/017/m5-rig/` | the local-walk rig for UAT (`rig.mjs`, `self-test.mjs`, README) |

`previewWorld` (the helper above) decides commit acceptance in its handler with a JavaScript copy of the SQL predicate (nonce null or lower) and does not model the row lock. The instruments that own the statement itself are the commit-statement shape cases (`previewImage.commit-statement.test.ts`), the real-Postgres lane (`verification/017/m5-pg/`), and the attack probes (`verification/017/code-review/m5/attack/`). No test (code review Round 6, CR-14).

## Patterns Extended

| Surface | Pattern extended | Rung |
|---|---|---|
| the continuation's S3 calls | `deleteMessagePreviewImages.ts` (list then `DeleteObjectsCommand`, the `dev/` prefix) | in-file sibling; its client and prefix lifted to `previewBucket.ts` and the sibling now calls it |
| the commit statement | `buildUpsertMessageQuery` (a Kysely builder in `shared.ts`, tested by compiling it) | in-repo |
| tests | `shared.message-cap` / `shared.upsert-valid` and `helpers/capturingDatabase` (the substituted database), M8's `enter` helper style for `helpers/` | in-repo |
| the real-Postgres lane | QA's `qa-phase1/pg-order-probe/probe.sh` (a throwaway `postgres:16`, `--network none`) | in-repo |

Sibling sweep, two instruments (`impl/m5/class-sweep-f83f2ca.out`): predicate 1, text: `git grep -n "previewImageNonce" -- src` over production: readers pass it through (`global.d.ts`, `guild.ts`, `shared.ts` selects and maps,
`getPreviewImageUrl`), the only writers are `previewImage.ts` (the commit) and none else (the upsert no longer writes it); `git grep -n "new S3(" -- src`: 1 (`previewBucket.ts`). Predicate 2, reference query: Serena
`find_referencing_symbols` is not available in this session and `typescript-language-server` is not on `PATH`, so not run; the text predicate is the only reference instrument that ran.

## TDD Compliance

Captures under `verification/017/impl/m5/`. `previewImage.ts` is a new module: the first row is the compile-time red (`red-commit-statement.json`: `Cannot find module '~/server/api/utils/previewImage'`);
every other row is an assertion-level red.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `mintNonce`, `buildCommitPreviewNonceQuery`, `buildUpsertMessageQuery`'s new statement (first rows of a new module) | `previewImage.commit-statement.test.ts` | Yes | Yes, `red-commit-statement.json` | `Cannot find module '~/server/api/utils/previewImage'` (compile-time, first row of the module only) | Yes, `green-commit-statement.json` (13 of 13) |
| `runPreviewContinuation`: request, outcome classes, one line per failure, redaction, the 40 s limit | `previewImage.continuation-outcomes.test.ts` | Yes | Yes, `red-continuation-outcomes.json` (13 of 13 failing against the module with no continuation) | `TypeError: runPreviewContinuation is not a function` (code absent) | Yes, `green-continuation-outcomes.json` (26 of 26 with the statement file) |
| `upsertMessage` replies before the generator answers, posts after the row is saved, mints from the clock, hands `waitUntil` the promise | `shared.upsert-preview-continuation.test.ts` | Yes | Yes, `red-upsert-continuation.json` (4 of 7 failing; the other 3 are controls: reply while pending, save survives a failure, new message posts once) | `AssertionError: expected 1 to be greater than 2` (posted before the insert); `expected [] to have a length of 1` (no `waitUntil` call); `expected 'df4c…' to match /^v1763509200123456[0-9a-f]{16}$/` (an unminted nonce) | Yes, `green-upsert-continuation.json` |
| forms 1, 2, 3, the age boundary, the prefix, the `dev/` predicate | `previewImage.deletion-forms.test.ts` | No (written after the continuation, which I had built whole while writing the outcomes file) | closed by an assertion-level red against a stub tree: the same tests against an export of `f83f2ca` whose `deleteObjects` and `sweepOlderObjects` return at once (`red-stub-deletions-f83f2ca.json`: 7 of 15 failing here, 21 of 38 in the interleavings file) and green at the real code | `AssertionError` (objects still present, deletes absent) | Yes (`vitest-m5-f83f2ca.json`) |
| the M5-e table: B, E1, E2, E3 over 3120 interleavings | `previewImage.interleavings.test.ts` | No (same) | same stub-tree red (21 of 38 failing) and the named mutants below | `AssertionError` (invariant violations listed) | Yes |
| the saved row's id, the sweep with no reference, the bucket client's addressing | `shared.upsert-preview-continuation`, `previewImage.deletion-forms` | No (added after the sweep, from its survivors) | closed by the three survivor mutants `shared.ts:255:if-false`, `previewImage.ts:92:if-false`, `previewBucket.ts:6:false`, each killed at `f83f2ca` by exactly one case (`f83f2ca-survivors.out`) | `AssertionError` | Yes |
| the shipped statements against a real Postgres (the lane is a run, not a standing test) | `m5-pg/pg-lane.test.ts` | Yes (written against the shipped statements before the production statements were final; the red is the three lane mutants) | Yes: unlocked read, no collation, unconditional commit each fail the lane (`pg-lane-mutant-*`: 1, 1 and 2 failing) | `AssertionError` (`prev` was n0 not n1; the byte-order case refused; a lower nonce accepted) | Yes, 11 of 11 (`pg-lane-72a1755/lane.json`) |

`tdd-check.py` refuses JavaScript and TypeScript, so the rows above are read, not tool-checked.

## Class Sweep

First delivery. The gaps my own sweep and negative controls exposed, each class stated by its effect:

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| A, a mutation driver left a mutated source in its export and the next run read it as the baseline (my first background run was killed mid-mutant; the rerun's every row was contaminated by one leftover) | `git hash-object` of each mutated production file in the export against `git rev-parse <sha>:<path>` after the run, plus a control run of the unmutated export (`72a1755-restore-check.out`, `72a1755-control.out`) | 3 files compared, 3 `restored`; control 331 of 331, exit 0 | the first sweep's results were discarded; the second ran on an export rebuilt from `72a1755` with its blobs verified; `mutate-edits.py` has no control run of its own, so one was run after (and `mutation-run.py`, which has one, ran the generated sweep). Residual 0 |
| B, a guard no case discriminates (sweep survivors) | `mutation-run.py` over `mutant-gen.js --range c37d41a..72a1755`: 34 mutants (`sweep-run-72a1755.out`) | 31 killed, 3 survived: `previewBucket.ts:6:false`, `previewImage.ts:92:if-false`, `shared.ts:255:if-false` | each is a real guard (the bucket client's addressing; the no-reference return; the client-sent id on the insert), not an equivalent; one case each at `f83f2ca`; each killed on re-run. Residual 0 |
| C, a test whose "never" assertion cannot see a thrown error (the no-reference sweep deleting nothing because it threw) | `git grep -n "toEqual(\[\])" -- src/server/api/utils/__tests__/previewImage.deletion-forms.test.ts` for the shape "nothing happened" | the no-reference case, the refused-row case, the 500 case (`world.s3Calls` empty) | the no-reference case now also asserts `console.error` was not called; the other two assert absence of a call, which a thrown error cannot fake. Residual 0 |

## Test Execution Results

Environment: website `chain/017-existing-items-backlog`, vitest 4.1.2; network-isolated (`unshare -rn`) for every run; mutation runs in `git archive` exports of the stated SHA with `node_modules` shared read-only; the
shared tree never mutated; the exports were removed at the end of the run. The real-Postgres lane ran in a `postgres:16` container (`impl017-pglane`, `--network none`) removed on every exit path, its socket
directory emptied by the container before it stopped (`docker ps -a` and `/dev/shm` showed none left).

| Command | Result |
|---|---|
| `npx vitest run --reporter=json` at `f83f2ca` (`vitest-m5-f83f2ca.{json,out,exit}`) | 1814 of 1814 passed, 143 test files (`testResults` length), 0 failed, `success` true; process exit code 0; count method: the reporter's counters. 1811 at `6555f65` (which held M5's code and its cases from `72a1755`) plus the three cases of `f83f2ca` |
| `pnpm run typecheck` (both programs) (`typecheck-f83f2ca.{out,exit}`) | exit 0 |
| `npx eslint` over every M5 file | 0 findings |
| `node ~/.claude/tools/convention-check.js website --since=c37d41a` (`convention-check-f83f2ca.out`) | 0 FAIL, 0 CANDIDATE, 21 SKIP: the held `.playwright-mcp` images and the checker's note that it does not implement the ID-token class verbatim; my names carry none by reading (`previewImage.*`, `previewWorld`, `previewBucket`) |
| `m5-pg/run.sh` at `72a1755` (`pg-lane-72a1755/`, server `PostgreSQL 16.16`) | 11 of 11 passed, exit 0 |
| lane mutants (`pg-lane-mutant-unlocked`, `-nocollate`, `-unconditional`) | 3 of 3 killed (1, 1 and 2 failing) |
| Named mutants (`72a1755-named-mutants-edits.json`, `72a1755-named-sweep.out`, `mutate-edits.py`, clean export, control after) | 26 of 26 killed; one by timeout (below) |
| Self-check sweep over `c37d41a..72a1755` (`sweep-mutants-72a1755.json`, `sweep-out-72a1755/`, `sweep-run-72a1755.out`) | 31 of 34 killed (stillborn 0, aborted 0, control-failed 0); 3 survivors, closed at `f83f2ca` (Class Sweep B) |

Named mutants (QA's list) and row mutants, each made as one change set in the `72a1755` export:

| Named mutant | Made as | Result |
|---|---|---|
| NM-10, any resolved fetch commits | the status check replaced by `null` | killed, 41 failing |
| NM-11, the commit is unconditional | the `where` predicate removed | killed, 2 failing (the shape cases); real Postgres: `unconditional` lane mutant killed |
| NM-12, delete before commit / delete includes the committed object | (a) form 1 names the new nonce's key; (b) a delete of the new object before the commit | both killed, 28 failing each |
| NM-13, the prefix loses its trailing slash | `previews/${messageId}` | killed, 29 failing |
| NM-14, the `dev/` predicate differs | `process.env.NODE_ENV` for `env.NODE_ENV` | killed, 1 failing |
| NM-15, the line carries the nonce / a line is written on 204 | (a) nonce appended; (b) a line before the commit | killed, 9 and 2 failing |
| NM-16, the timer is not cleared / a timeout writes two lines | (a) `clearTimeout` removed; (b) the timer also logs | killed, 1 failing each |
| NM-17, the continuation is awaited before the reply | `await` for `waitUntil` | killed, 14 failing |
| NM-21, the commit inserts when the row is gone | not made as one change: the commit is an `updateTable` statement, an insert form is a different statement. Covered by the shape case "updates the existing row and never inserts" and by the lane case "on a row that is gone, returns nothing and inserts nothing" | unplaced as a one-change mutant, with that reason |
| NM-22, the replaced nonce read from an unlocked snapshot | `forUpdate()` removed, run on the real-Postgres lane | killed (`unlocked`, P3 failing); the Node tests cannot see it (the database is substituted) |
| NM-23, the age from the function's clock / L below 60 s / the age guard dropped | (a) `Date.now()`; (b) 30 000 ms; (c) `>= 0` | killed, 7, 2 and 6 failing |
| NM-26, a missing reference deletes every other object | the early return replaced by a delete of the listing | killed, 6 failing |
| row mutants | refused commit keeps its own object; form 1 dropped; sweep dropped; 404 merged into 500's label; timeout labelled network; the post dropped; clock not padded; random part dropped; commit also writes `updatedAt`; the upsert writes a nonce; the upsert returns no clock | all killed. `row-refused-commit-keeps-own-object` is killed by timeout, not by an assertion (the unconsumed gate in the interleavings harness parks the next save's bucket call); a timeout counts as a kill |

Test classes walked on the built tip, member by member: the outcome classes (204, 500, 404, 200, 302, 503, a refused connection, no answer within T) each have a case; the six form-by-state rows
(accepted with a previous nonce, accepted with none, accepted and never deleting its own object; refused by a later commit, refused by a gone row, the sweep's boundary, other messages, later objects, no reference); both prefixes
(`previews/`, `dev/previews/`); the table's 36 rows; the upsert's existing and new message.

A timeout or time-based test: the 40 s cases use fake timers (no wall-clock wait) and sit in the standing suite as the repository's other fake-timer cases do (`Author.timer-cleanup`, `redis.cached-null-hit`). The real-Postgres lane
sleeps 2 s inside its transactions to hold a row lock; it is outside the standing suite, run only by `m5-pg/run.sh` for this milestone.

## Outstanding Items

- **Unbuilt by the plan's order:** the end-to-end walk (B-4) needs M6's generator on the chain tip; the rig is built and self-tested against the generator at `8512a1d` (`m5-rig-self-test.out`: put under `dev/previews/42/vrig-01.jpeg`, served 200 as `image/jpeg`, no list or delete from the generator). The website's list and delete requests appear on the stub's log only when the local website is started with the printed environment.
- **M5-g, the two variables' values:** the rig sets the generator's `ENV=development` and tells the website to run as `NODE_ENV=development` (`next dev`); the production values stay the plan's Inference (RK-10, his B-6 look).
- **Production's Postgres version** is unread (RK-9; QA's Assumption Not Checked); the lane ran on 16.16.
- **Preview's own function limit** is unread (devops's limit on limb 3); production's 60 s is D-10.
- **Pusher and `getMessage` race:** the reply's `previewImageNonce` is whatever the row holds when `getMessage` runs, which may already include a faster concurrent save's commit; the plan states "the committed nonce".
- **Self-diagnosis, for the retrospective:** I built the whole continuation while writing the outcomes tests, so the deletion forms and the interleavings arrived with no first red (closed by a stub-tree red). And my first mutation run left a mutant in its export and I read the rerun on top of it before running the control; the control run is the cheap check that would have caught it at once, and `mutate-edits.py` has none.
- **Process facts:** the secret-file hook refused one compound call that contained `git log` in the generator repository (see M6's document); the record-write gate refused no write this milestone; an `eslint --fix` I ran over a whole `__tests__` directory rewrote three test files outside M5 (formatting only); I restored those three to `HEAD` before committing (they were my own tool's output, shown by their diffs to be formatting only) and re-applied the two intended edits by hand. A leftover empty `/tmp/impl017-pgsock.*` directory (owned by the container's uid) was removed as root inside a container.
- **Downstream:** M5 changes product behaviour observable outside the service's source: a save no longer moves the stored preview until the generator confirms; with the old generator (which deletes before it renders) the window is today's (§ Release and rollback). M6 is the milestone whose premise it sets (204 must mean an object was stored).

## Resumption premise re-read (2026-11-19T07:38, session resumed after the park)

Each premise the Resumption State rested on, re-read at the mechanism this session:

| Premise | Instrument | Result |
|---|---|---|
| Website chain tip is `4b8db9c` on `chain/017-existing-items-backlog` | `git -C website branch --show-current`, `log --oneline -3`, `rev-parse` | holds: `4b8db9c`, `status` shows only the untracked `.playwright-mcp/` |
| `4b8db9c` is a title-only commit on `f83f2ca` | `git -C website diff --numstat f83f2ca 4b8db9c` | 1 file, `previewImage.interleavings.test.ts`, +1 −1 |
| The upsert reads the database clock after the row lock | `git show 4b8db9c:src/server/api/utils/shared.ts \| grep -n "clock_timestamp\|waitUntil"` | `clock_timestamp()` at the `savedAtMicros` column (line 225) and `waitUntil(runPreviewContinuation(…))` (262) |
| Generator chain tip is `8512a1d` | `git -C preview-image-generator branch --show-current`, `log --oneline -2` | holds, on the chain branch; local `origin/prod` `8de2b53`, `origin/master` `87dcb41` |
| Website remote refs unchanged since the cut | local tracking refs, `rev-parse origin/master` | `1ad625e` (a read of the local tracking ref, not a `ls-remote`) |
| The lane runs the shipped statements and exits 0 | `m5-pg/run.sh` through the driver below | control 11 of 11, exit 0 at website `4b8db9c` |

## QAF-24 fix round (LOW)

**Finding** (`qa/017-existing-items-backlog-m5-qa.md` § Findings, agent-output `10e4627`): the lane's P1 could not tell the order token's clock (`clock_timestamp()`, read after the row lock) from a clock read at the statement's or the transaction's start,
because the scenario's two statements and two transactions started in the same order as their lock acquisitions. QA's mutant `qa-clock-now` passed 11 of 11.

**Change** (`verification/017/m5-pg/pg-lane.test.ts` and its README; nothing under `website/`): P1 now has session A begin its transaction first and start its upsert statement first (it blocks), while session B, whose transaction began later, takes the row lock first with
`select … for update`, then runs its own upsert statement (a later statement start than A's) and holds the lock a further 300 ms. A takes the lock second. The case asserts A's clock above B's and A's minted nonce above B's. Under `now()` and
`transaction_timestamp()` A's clock is its transaction's start, below B's. Under `statement_timestamp()` it is A's statement start, below B's. Under `clock_timestamp()` it is read after the lock, above B's. The existing P1 is tightened, not joined by a sibling.

**Surface and flows.** No user-visible surface: a verification lane outside the standing suite.

**TDD row** (the lane is a run, not a standing test; its red is the mutants, as the milestone's lane row states):

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| P1, the shipped upsert's clock is read after the row lock | `m5-pg/pg-lane.test.ts` | Yes (the case first, then the mutants; the production statement did not change) | Yes: `clock-now`, `clock-statement-timestamp`, `clock-transaction-timestamp` each fail 1 of 11, the case P1 and no other (`impl/m5-qaf24/lane-4b8db9c-new-p1/summary.txt`); the old P1 passed 11 of 11 under `qa-clock-now` (QA's `lane-sweep/qa-clock-now/`) | `AssertionError: expected false to be true` on the clock comparison | Yes: control 11 of 11, exit 0, `PostgreSQL 16.16` (`…/control/`) |

Mutants ran in a fresh `git archive 4b8db9c` export each (`impl/m5-qaf24/run-lane-mutants.sh`, `lane-clock-mutants.json`; one exact-once edit; output to files; each run in its own process group under `timeout -k`), in the session scratchpad, never the shared tree; the exports were removed by the driver
(`leftover-containers 0` as the summary's last line; `/dev/shm` held no `pgl.*` directory after).

**Class Sweep**

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| QAF-24, a lane case on a concurrent property whose scenario orders the sessions the same way under the property and under a weaker alternative (derived by me: the finding carries one for P1 only) | `grep -n "sleep(" verification/017/m5-pg/pg-lane.test.ts` (`impl/m5-qaf24/class-sweep-sleep-sites.out`): every concurrent case has a sleep | 6 hits in 2 cases: P1 (4 sites, after the fix) and P3 (2 sites). The lane's other 9 cases hold no second session | P1: fixed above, the alternatives killed. P3 (the commit learns the nonce it replaced under a concurrent commit): its alternative is an unlocked read, which orders the same way only if the second session reads after the first commits; the scenario has the first session hold its transaction open for 2 s while the second starts at 700 ms, so the unlocked read returns the old nonce. QA's `lane-sweep` killed that mutant (`NM-22`, P3 failing) and I re-ran it at `72a1755` (`pg-lane-mutant-unlocked`, 1 failing). Not-applicable, with those two runs. Residual 0 |
| QAF-24, the same class in the Node tests (a clock-order case that substitutes the database) | `grep -n "savedAtMicros\|clock" src/server/api/utils/__tests__/previewImage.commit-statement.test.ts shared.upsert-preview-continuation.test.ts` over the website tree | 8 lines (`impl/m5-qaf24/class-sweep-node-clock-sites.out`): the statement-text case "returns the message id and the database clock, read in the same statement" (:36, :37), three mint-shape cases (:72, :76, :84), the substituted insert's fixture return (`shared.upsert-preview-continuation` :43) and the mint-from-the-clock case (:93) | each matches the compiled text, the minted shape or a fixture value, and none claims an order under a lock; the property they cannot see (order under a lock) is the lane's alone, and P1 now holds it. Not-applicable beyond that. Residual 0 |

**Handoff and expiry.** The website tip does not move, so M5's QA verdict at `4b8db9c` is not expired by this round. QA owns QAF-24's resolution; I do not mark it.

## Next Steps

Code review at website `f83f2ca` (M5 range `c37d41a..f83f2ca`), then QA Phase 2 for M5 (its pg lane re-run, EC-2). Then M6's document (generator `8512a1d`), and M7 last. After QAF-24: QA's confirmation of the lane change; the M6 fix round is in M6's document.

## Resumption State

Consumed 2026-11-19T07:38 by the resumed session (§ Resumption premise re-read); kept as written. Written 2026-11-19T07:16 by implementer-hooks-017 at steering's checkpoint request; chain 017 is parked on the owner's word (`steering/017-rulings.md` block 2026-11-19T07:15Z, `cffd802`). The shell append that first tried to write this section was refused by `record-write-gate-hook`; it is re-issued here with the Edit tool.

- **Done (M5):** dependency `9909fb3`, code `72a1755`, survivor cases `f83f2ca`, then the Round 6 fix round: CR-15 (website `4b8db9c`, the interleavings case retitled by behaviour, 38 of 38 before and after) and CR-14 (agent-output `838c571`, the `previewWorld` line under Files Created). Code review approved the Round 6 sub-entry at website `4b8db9c` (agent-output `6e4436d`); QA was told the tip is `4b8db9c`. `Handoff-At` stays `f83f2ca` (the retitle is a title-only commit on top of it).
- **Next:** QA Phase 2 for M5 (its pg lane re-run, EC-2) is QA's. M6's document (generator `8512a1d`, `4c4e948`) is already written and is in code review (Round 7). M7 comes last. Nothing is owed from me on M5; a QA or review finding on M5 would start a fix round with the Class Sweep table.
- **Branch and HEAD:** website on `chain/017-existing-items-backlog`, HEAD `4b8db9c`; agent-output on its `master`.
- **Uncommitted or locally mutated:** none of mine. The tree's other modified or untracked files (`INBOX.md`, `steering/selection-ledger/2026-11-19.md`, `verification/016/uat/...` images, `.playwright-mcp`) are other sessions' work. No export, container or process of mine is running.
- **Evidence run, not yet recorded:** none. This round's before/after runs (`previewImage.interleavings.test.ts`, 38 of 38 each) are summarised in the changelog row; their JSON sat in the session scratchpad only, not in `verification/017/`. Re-run if QA wants the files.
- **Questions sent:** none open. The full suite was not re-run for the title-only change (last full run: 1814 of 1814 exit 0 at `f83f2ca`).
- **On resuming:** read this document, then the latest rulings block in `steering/017-rulings.md` for what the owner has decided about the parked chain. Arm the cache-warm wake first (CronList, then CronCreate).
