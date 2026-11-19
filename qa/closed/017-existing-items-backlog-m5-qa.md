---
ID: 017
Origin: 017
UUID: 5c3e9a71
Verified-At: "4b8db9c — repos=website; M5 only. Suite, typecheck, Node sweep, shape set and the real-Postgres lane each ran in an isolated git archive export of 4b8db9c (blobs checked), network-isolated. 4b8db9c is f83f2ca plus one test title (code review Round 6 sub-entry)."
Status: Released
Status-Detail: "Released at release identifier website master 787bec5 and generator prod 8512a1d (pushed 2026-11-19T20:11Z and 20:14Z by devops Stage 2); closed. Anchor fields above keep the values the document was written at. Post-deploy rows B-6 to B-11 ride handoff/017-existing-items-backlog-post-deploy-2026-11-19.md."
Phase: 2
---

# QA Report: Plan 017 — M5 (the stored preview moves only on a confirmed new image; failures are logged)

**Plan Reference**: `agent-output/planning/017-existing-items-backlog.md`, revision 7. The plan's diff since my revision 7
re-key (`6ade256..3e47387`) is changelog rows R-27 to R-36 and the planner's Resumption State (`b2eefcd`, one hunk inside
§ Resumption State). No criterion moved.
**Implementation Reference**: `implementation/017-existing-items-backlog-m5-implementation.md`, `Handoff-At: f83f2ca`.
**Stage start**: code review Round 6 sub-entry, APPROVED at `Reviewed-At: 4b8db9c`
(`code-review/017-existing-items-backlog-code-review.md`, agent-output `6e4436d`; plan R-36 `3c36764`), re-derived at the
record. Steering's brief: `steering/backlog-2026-11-18-briefs/qa-hooks-017-resume.md`.
**Blocking-condition register**: `qa/017-existing-items-backlog-qa.md`. This pass appends no row. B-4, B-6, B-7 and B-11
are inherited.
**Captures**: `verification/017/qa-m5/` (measured before the chain's park, 07:15Z) and `verification/017/qa-m5/resume/`
(this session, after the resume).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T07:31 | steering-roadmap-hooks (brief `qa-hooks-017-resume.md`, after the park and resume) | QA Phase 2 for M5 at website `4b8db9c` | Phase 2, M5 only. Premises re-read and holding. Suite 1814 of 1814, exit 0, reproduced this session. Node sweep 66 of 67 killed, with the one survivor equivalent. A shape set of 8 written this session: 8 of 8 killed. Lane 11 of 11, its sweep 3 of 4 killed. Oracle 0 of 3120. **QA Complete**, milestone-scoped. QAF-24 LOW. Process fact: my first write of plan row R-37 carried a typed stamp (07:36). `stamp-gate-hook` refused it as future-dated. I re-stamped it with `record-edit.js` `2026-11-19T07:55` (07:33), which is the gate's stated remedy. Process fact: `record-write-gate-hook` refused my shell append of an `INBOX.md` entry (the code-review link failure from `check-repo.js`). I re-issued it as `record-edit.js` `append_file`, which is the gate's stated remedy. |
| 2026-11-19T07:55 | code-reviewer-hooks-017 (cross-session message; `c3fa457`, R-40) | QAF-24 closure | QAF-24 RESOLVED by QA's own lane run over the fixed P1 (`verification/017/qa-m5/qaf24-closure/`): control 11 of 11; the three statement- and transaction-start clocks each fail P1 alone; the other lane mutants still killed. Verdict unmoved. |
| 2026-11-19T19:13 | devops-hooks-017 (Stage 1) | Document closed | Document closed. Status: Committed. Plan 017 is committed on chain/017-existing-items-backlog (website 7293a35, generator 8512a1d) at devops Stage 1; the release is Stage 2. |
| 2026-11-19T20:18 | devops-hooks-017 (Stage 2) | Document closed | Document closed. Status: Released. Plan 017 released: website master 787bec5 (2026-11-19T20:11:47Z) and generator prod 8512a1d (20:14:17Z); release-tip verdict agent-output c09fd41. Deployment record deployment/closed/017-existing-items-backlog-deployment.md. |

## Premise re-read (the brief's first deliverable)

Each premise my Resumption State (`qa/017-existing-items-backlog-qa.md`, agent-output `70988fa`) rests on, read at the
mechanism at 07:2xZ:

| Premise | Read | Holds? |
|---|---|---|
| Website chain tip `4b8db9c` | `git -C website branch --show-current` gives `chain/017-existing-items-backlog`; `log -1` gives `4b8db9c` (06:30:37Z). The generator is on its chain branch at `8512a1d`. | Yes |
| Plan revision 7 (`6ade256`) | The header reads `Revision: 7`. `git log 6ade256..HEAD` on the plan shows only rows R-27 to R-36 and `b2eefcd`. The single hunk in `b2eefcd` starts at line 1308, inside § Resumption State. | Yes |
| Code review M5 `Reviewed-At` | The header reads `Reviewed-At: "4b8db9c — …Round 6 sub-entry…"`, last commit `225352a` (checkpoint, Round 7 not opened) | Yes |
| Captures committed | `git status --porcelain verification/017/qa-m5/` printed nothing, with 189 tracked files | Yes |

Whether the captures reproduce (the brief's "not checked"): the suite was re-run in a fresh export of `4b8db9c`
(`resume/vitest-4b8db9c-rerun.{json,out,exit}`). Compared with the committed run by `qa-m1/suite-compare.mjs`
(`resume/compare-qa4b8db9c-vs-rerun.out`), it gives 1814 of 1814, 143 files, exit 0, with no path only in either run and no
changed file. The seen-red instrument, re-run over the committed kill table, prints a file byte-identical to the
committed `seen-red-coverage.out` (`resume/seen-red-check-original.out`, `cmp` exit 0). No premise moved, so nothing went
to steering.

## Criteria assessed

I recorded these before running anything:
- M5-a (both order-token properties, the upsert no longer writing the nonce, the commit, the property);
- M5-b, M5-c (forms 1 to 3, L, the absent-reference rule, the property and residue), M5-d, M5-e (the oracle), M5-f (per
  outcome class, the line's fields and redactions, T) and M5-g;
- the lockfile disposition;
- Phase 1's obligations for M5: NM-10 to NM-17, NM-21, NM-22, NM-23 and NM-26, the E-1 and E-2 guards' sweep, and the
  M5-f telemetry validation.

The human-observable form is UAT's B-4. M5-0 is closed (B-5 and B-14, executed).

**Example classes.**
- **The outcome classes** (204; 500; 404; any other status; a network error; no answer within T; ended by the platform)
  are listed, so each is verified per member below.
  - "Any other status" is exemplified by 200, 302 and 503. `failureClassOf` decides it by two equalities, and both are
    swept (`previewImage.ts` lines 46 and 47 at `4b8db9c`, `===` and `num`, all KILLED).
  - "A network error" is exemplified by a refused connection. Every rejection reaches the one `catch`, which separates
    only on `timedOut`, so the class is decided by one branch, swept by `previewImage.ts:57:false` and `58:true`.
- **M5-e** names its dimensions, and the test enumerates the oracle's whole space: the same 3120 (row, sequence) pairs by
  membership (below).
- **M5-c's L** is a decision constant, swept in both directions (`qa-L-plus-one`, `qa-L-minus-one`). So is T
  (`qa-T-minus-one`, `qa-T-plus-one`).

## Implementation Review (Post-Implementation)

- **TDD gate: passes.**
  - The table has 7 rows. The first (`previewImage.commit-statement.test.ts`) cites "Cannot find module" as the first
    row of a new module. That is the only compile-time row for that file.
  - Three rows answer "No" to written-first: deletion forms, interleavings, and the survivor cases. Each is closed by
    implementer.md's own remedy: an assertion-level red against a stub tree (`impl/m5/red-stub-deletions-f83f2ca.json`)
    and the named mutants, then green.
- **Production diff**, `git diff --numstat 72a1755^ 4b8db9c` outside `__tests__` (`72a1755^` is `9909fb3`, the dependency
  commit), plus `9909fb3` itself:
  - `previewImage.ts` (new, 126 lines) and `previewBucket.ts` (new, 17);
  - `shared.ts` (+13 −29) and `deleteMessagePreviewImages.ts` (+4 −12, now built on `previewBucket`);
  - from `9909fb3`, `package.json` (+1) and `pnpm-lock.yaml` (+80).

  These are the plan's surfaces. No overreach.
- **Lockfile** (`qa-m5/lockfile-check.out`):
  - `pnpm-lock.yaml` +80 −0, with no removed line;
  - `paracord` is pinned at `3f20308…` in both trees;
  - the added keys are `@vercel/functions@3.11.3` and its own dependencies (`@vercel/oidc`, `@vercel/cli-config`,
    `@vercel/cli-exec`, `jose`, `os-paths`, `xdg-app-paths`, `xdg-portable`, `zod@4.6.7`).
- **E-1's ordering.** One `upsertMessage` sits behind both tRPC branches, so every save route runs one continuation, in
  one order: upsert, reply, then the continuation under `waitUntil`.
- **Schema.** `project-utils/prisma/schema.prisma` (`749606d`) declares `previewImageNonce String?`, which is `text` in
  Postgres, so the 33-character nonce fits.
  - project-utils carries no migration and no SQL file (`git ls-files` matched none). The schema is pushed, and
    production's DDL cannot be read from this box. That is this pass's Assumption Not Checked.
- **M5-f's line** (`logFailure`) is
  ``console.error(`preview-image-failure id=… class=… elapsedMs=…`)``. The cases assert the exact class literal, an
  integer number of milliseconds, one line per save, and booleans for a planted nonce, content, key and credential, never
  the values. That is the secret-test rule.

## Test Coverage Analysis

**Per criterion member**, each with its cases (seven files: `previewImage.{commit-statement,continuation-outcomes,
deletion-forms,interleavings}` and `shared.{upsert-preview-continuation,message-cap,upsert-valid}`) and the mutants that
redden it. Kill tables: `qa-m5/sweep/mutation-table-…063853Z….json` (the Node set, `m5-mutants-all.json` blob `0d2f23e`)
and `qa-m5/resume/shape-sweep/mutation-table-…072928Z….json` (the shape set, `shape-mutants.json` blob `34bcd23`).

| Member | Cases | Reddened by |
|---|---|---|
| M5-a (1), lock order, the database's clock | "returns the message id and the database clock, read in the same statement"; lane P1 | `qa-clock-now` (Node shape case only at 4b8db9c's lane; since the P1 fix, also the lane's P1 with `statement_timestamp()` and `transaction_timestamp()`: QAF-24 RESOLVED) |
| M5-a (2), new above old, collation-independent | "sorts above every 32-character hex nonce…", "sorts a later clock above…", "pads a short clock…"; lane P2 and the nB/na case | `qa-nonce-leads-0`, `qa-nonce-pad-15`, `qa-nonce-random-4-bytes`; lane `qa-collate-dropped` |
| The upsert writes no nonce | "names no nonce column in its insert or its conflict update"; lane "writes no preview nonce…" | `sr-upsert-writes-nonce-on-conflict` |
| The commit: conditional, null or below | "moves the nonce only where the row has none or one that orders below, under collation C" | NM-11, `qa-commit-null-disjunct-dropped`, `qa-commit-order-disjunct-dropped`; lane NM-11 (2 cases) |
| The commit: replaced nonce read under the row lock | "reads the nonce it replaces under the row lock"; lane P3 | `sr-commit-read-unlocked`; lane NM-22 (P3) |
| The commit never inserts, writes no other column, hands back the replaced nonce | the three shape cases | `sr-commit-sets-another-column` (3 cases), `sr-commit-returns-new-nonce`. NM-21: see below. |
| The response does not wait for the generator | "replies while the generator has not answered…", "hands the platform one promise…" | NM-17 (60 s) |
| 204 | "a generator answer of 204 commits the nonce and writes no failure line" | `previewImage.ts:70:num`, NM-15b |
| 500; 404 | "answer 500…", "answer 404…" | lines 46 and 47, NM-10, NM-15a/c/d, `qa-line-dropped` |
| Any other status | "answer 200…", "302", "503" | line 46 and 47 `===`, NM-10 |
| A network error | "answer a refused connection…" | `previewImage.ts:57:false` |
| No answer within T | "writes exactly one line of class no-answer-within-T at 40 seconds, and no commit"; "stops waiting once … 204" and "… 500" | `58:true`, NM-16a/b, `qa-timeout-labelled-network`, `qa-T-minus-one`, `qa-T-plus-one` |
| Ended by the platform | none | Not expressible in a suite. RK-2's residue; no instrument in this chain. |
| M5-b and M5-c's property | the 36 interleaving rows (below) | the form and sweep mutants, `qa-form1-dropped`, `qa-sweep-dropped`, NM-26 |
| M5-c form 1 | "deletes the object of the nonce it replaced", "deletes nothing for a replaced nonce of none…", "never deletes the object it committed" | NM-12a, NM-12b, line 79, `qa-form1-dropped` |
| M5-c form 2 | "a refused commit deletes its own object…" (both) | `qa-form2-dropped` (by the runner's per-run timeout, which counts as a kill), line 79 |
| M5-c form 3 and L | "an object 120000 ms older … deleted: true", "119999 … false", "measures age by the bucket's times", "keeps an object written after the committed one" | NM-23a/b/c, `qa-L-plus-one`, `qa-L-minus-one`, lines 91 to 97 |
| An absent reference deletes nothing | "deletes nothing in the sweep when the committed object is not in the listing, and reports no error" | NM-26, `92:if-false` |
| M5-d, a new message | "a save of a new message asks the generator once, after the insert…"; "the saved row's id is left to the database for a new message" | NM-10 family on the commit; the id case: none (below) |
| M5-f, the fields and redactions | "names no nonce, no message content, no object key and no credential" | NM-15a, NM-15c, NM-15d, `qa-line-dropped` |
| M5-g, the trailing `/`, the `dev/` predicate, literal keys | "lists the message's prefix with its trailing slash", "leaves another message whose id starts with this one alone", "lists and deletes under dev/…", "does not use dev/ in production" | NM-13, NM-14, `sr-prefix-always-dev` |
| The request (id, nonce, message, bearer) | "posts the id, the nonce and the message, with a bearer credential" | `sr-request-no-bearer`, `sr-request-body-drops-message` |
| The bucket client's addressing | "talks to the configured endpoint, without forcing path-style addressing" | `previewBucket.ts:6:false` |

**M5-e, the oracle over the whole input space.**
- The oracle at blob `30dc18a` reports 0 of 3120 interleavings violating, over 36 rows, with 736 carrying late-write
  residue (`oracle-run-30dc18a.txt`). That is identical to its committed run.
- `enum-compare/compare.{cjs,out}` compares the test's and the oracle's (row, sequence) pairs by membership: 3120 and 3120,
  none only in either.
- Its planted control (`plant=true`) drops 472 from the test side, and the comparison reports exactly those 472.
- The test's blob is `6de5ed7`, from website `4b8db9c`.

**NM-21** (the commit as an insert-or-update) is not placed as a one-change mutant. The commit is one `UPDATE … FROM`
statement with no insert path to flip (`build-qa-mutants.py`'s docstring). The class is held twice:
- by the shape case "updates the existing row and never inserts", whose `not.toMatch(/insert/)` is the half NM-21 would
  break. The case is seen red under `sr-commit-sets-another-column` through its first assertion, so the second assertion
  stays unseen-red. Its predicate is a literal absence over compiled SQL.
- by the lane's "a refused commit … recreates no row" case on a real Postgres.

This is recorded as a fixture limit, not a finding: `previewWorld` cannot express an extra INSERT.

**Seen-red coverage**, measured by `seen-red-coverage.py` over the 7 files' cases in `vitest-4b8db9c.json`, crossed with
every KILLED row's `failing_titles` in the two Node kill tables (`resume/seen-red-coverage-with-shape.out`):
- **104 cases, 93 reddened, 11 never reddened.**
- The instrument's first form, over the Node set alone, gave 85 and 19. It reproduces byte-identically.
- The shape set reddened 8 of those 19, each by its target case. Those 8 are the 6 shape cases, the fresh-random case and
  the production-prefix direction.
- The 11 still never reddened:
  - **The enumeration-count case** is an instrument by design. Its failure mode is the enumeration drifting, which
    `enum-compare` checks.
  - **"the saved row's id is left to the database for a new message"** is non-discriminating against every mutant of
    its guard.
    - The `if (true)` form of `if (message.id) values.id = message.id;` survives (`resume/mutant-shared-255-if-true.*`).
      It is **equivalent**: Kysely 0.26.1 drops an `undefined` column from an INSERT (`resume/kysely-undefined-column.
      {cjs,out}`). With `id` absent or `undefined`, the compiled SQL is identical. The positive control, `id: 'x'`,
      carries the column.
    - The `if-false` and `not` forms redden its sibling ("is the id the client sent").
    - The property holds by construction. This is residue, not a finding.
  - **3 per-owner cap cases and 6 `valid` cases.** Their surfaces lie outside M5's production diff: the `valid` lines are
    unchanged context in `git diff 1ad625e 4b8db9c -- shared.ts`. M5 touched these files only to adapt fixtures (the
    insert now returns `savedAtMicros`, `@vercel/functions` is mocked, `buildMessageValues` lost its nonce argument).

**Fixtures** (Iron Law 5):
- The `message-cap` fixture's insert returns `{ id, savedAtMicros }`. That mirrors the real statement's `RETURNING`, which
  the lane runs on Postgres 16.16.
- `previewWorld`, the fake bucket and table, cannot express:
  - an extra INSERT (NM-21's class);
  - an object with no `LastModified`;
  - S3 refusing an empty `DeleteObjects`.

  Also, `ListObjects` is not paginated. A prefix holding more than 1000 objects lists without the committed object, so
  the sweep deletes nothing. That is the safe direction.

  Each is stated as a fixture limit. None is a criterion's member.

**Conventions** (`qa-m5/audit-predicates-m5.sh`, `audit-predicates.out`, at `4b8db9c`, over the 7 files and
`helpers/previewWorld.ts`):
- ID tokens: 0 in titles, comments and basenames, and the positive control fires 2 of 2;
- every basename takes the positive form, and the helper sits under `__tests__/helpers/`;
- no source-text read and no hand-rolled renderer;
- the 7 timer hits in `continuation-outcomes` are vitest fake timers. They spend no wall-clock time, so they are not a
  time-based test (testing-patterns, "Time-Based Tests").

## Test Execution Results

Every run was network-isolated (`unshare -rn`) in a `git archive` export of `4b8db9c`, with `node_modules` linked and the
mutated files' blobs checked against `4b8db9c` by `git hash-object`.

| Command | Result |
|---|---|
| `npx vitest run --reporter=json` (`qa-m5/vitest-4b8db9c.{json,out,exit}`) | 1814 of 1814 passed, 143 `testResults`, `success` true, process exit 0 |
| The same, re-run this session (`resume/vitest-4b8db9c-rerun.*`) | 1814 of 1814, exit 0; identical per-file (title, status) sets |
| `pnpm run typecheck`, both programs (`typecheck-4b8db9c.{out,exit}`) | exit 0 |
| `suite-compare.mjs` against `qa-m8-refresh/vitest-6555f65.json` (`compare-qa6555f65-vs-qa4b8db9c.out`) | No path only in either run. Three files change: `deletion-forms` 14 → 15 (one retitle, one new), `interleavings` 38 → 38 (one retitle), `upsert-preview-continuation` 7 → 9. That is `f83f2ca`'s 3 cases and 2 retitles. Every other file keeps its set. |
| The Node sweep, `mutation-run.py --sha 4b8db9c`, whole suite (`m5-mutants-all.json` blob `0d2f23e`: 34 from `mutant-gen.js --range c37d41a..4b8db9c` plus 33 of QA's; `sweep/`, `sweep-run.{out,err,exit}`) | Control 1814, exit 0. **66 of 67 KILLED** (denominator: mutants whose suite started under a passing control; stillborn 0, aborted 0). Two kills came by the per-run timeout (`previewImage.ts:70:===`, `qa-form2-dropped`). The one survivor is below. |
| The shape set, `mutation-run.py --sha 4b8db9c`, scoped to `src/server/api/utils/__tests__` (`resume/shape-mutants.json` blob `34bcd23`; `resume/shape-sweep/`, `shape-sweep-run.{out,err,exit}`; run by a `general-purpose` helper, table read here) | Control 234, exit 0. **8 of 8 KILLED**, each count-checked at 234 |
| The `if (true)` saved-id mutant, one file (`resume/mutant-shared-255-if-true.{diff,json,out,exit}`) | SURVIVED: equivalent (above) |
| The real-Postgres lane, QA's runner `pg-lane/run-qa.sh` (container `qa017-pglane`, `--network none`) | 11 of 11, PostgreSQL 16.16 (`pg-lane/out-4b8db9c/`). The container, socket and link were removed. |
| The lane sweep, `lane-mutants.sh` (`lane-sweep/summary.txt`) | Control 11 of 11. NM-22 KILLED (P3), `qa-collate-dropped` KILLED (nB/na), NM-11 KILLED (2 cases), **`qa-clock-now` SURVIVED** (QAF-24). The script's exit 1 is its last `grep -c` counting 0 containers, not a lane failure. |

**Scope of the sweep.** This is the milestone's sweep of the Irreversible Side-Effect Register guards M5 changed: E-1
(the website's bucket deletes) and E-2 (the nonce commit). It is seeded at their branch conditions and decision constants:
- the generated set over `c37d41a..4b8db9c`'s production files: `previewImage.ts`, `previewBucket.ts`, `shared.ts` and
  `deleteMessagePreviewImages.ts`;
- QA's named and coupling mutants: each disjunct of the commit's `or`, each conjunct of the sweep's filter, and L and T
  in both directions;
- the shape set for statement text the generator does not mutate.

The whole-chain sweep over `1ad625e..<last tip>` is the effort-final sweep, still owed. Every instrument is a committed
blob in its kill table's `instruments`, and no kill rests on an uncommitted test file.

**The one Node survivor**, `qa-sweep-committed-key-conjunct-dropped`, is **equivalent**. The committed object's age
against itself is 0, which `>= SWEEP_AGE_MS` excludes while L > 0. So dropping the "not the committed key" conjunct cannot
delete the committed object.

## Findings

QAF-24 LOW Phase 2 RESOLVED — the lane's P1 now has A's transaction and statement begin first and take the row lock second (agent-output `008468b`, `pg-lane.test.ts` blob `d741220`). QA's closure run `qaf24-closure/` (driver copy blob `29c5e34`, set `6ec8785`): control 11 of 11; `now()`, `statement_timestamp()` and `transaction_timestamp()` each fail exactly P1; NM-22, `qa-collate-dropped` and NM-11 are still killed. Code review's scoped check agrees (`c3fa457`, R-40). Website unchanged at `4b8db9c`; the verdict is unmoved. Argument at agent-output `10e4627`.

## Verdict

**QA Complete** for M5 at website `4b8db9c`, milestone-scoped.
- Every M5 criterion member has a case or a stated reason it cannot have one (the platform cut, RK-2).
- Every guard in E-1 and E-2 is reddened by a mutant, or its survivor is shown equivalent.
- The M5-e oracle and the test agree on all 3120 interleavings by membership, with 0 violating.
- The suite is 1814 of 1814, exit 0. The typecheck exits 0.
- QAF-24 LOW was a comment, not a blocker; RESOLVED since (Findings).

The plan's Status is unmoved. The effort-final sweep is owed. Rows inherited and not discharged: B-4 (UAT); B-6, B-7 and
B-11 (post-deploy, carrier handoff created by devops at Stage 1).

## Assumption Not Checked

This pass assumes that production's `Messages."previewImageNonce"` column is `text`, as the Prisma schema declares, and
does not test it.
- **No migration exists** to read: the schema is pushed. No read-only access to Hooks.gg's production database exists
  from this box.
- **Signature if false.** For example, a `varchar(32)` sized to today's 32-character nonces. Every commit of a
  33-character nonce fails with "value too long". The continuation's error is not a generator outcome, so it is not
  among M5-f's classes. Previews never move after the deploy.
- **Owner.** devops at Stage 1, through B-6's look ("the preview shows the new edit within a minute"). A frozen preview
  on that look names this or RK-1. Named again in the hand-off.

## Handoff

- **QAF-24** went to `steering-roadmap-hooks` for the implementer's next write. It was fixed (`008468b`) and is RESOLVED by QA's closure run.
- **To devops (Stage 1)**: this pass's assumption, with B-6.
- **To UAT**, when the chain reaches it: B-4, with the rig at `verification/017/m5-rig/`.
- **Next for QA**: M6 Phase 2 when code review's Round 7 delivers it, then M7, then the effort-final sweep.
