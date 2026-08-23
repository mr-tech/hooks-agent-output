---
ID: 012
Origin: 012
UUID: 12a4fe3c
Parent: message-valid-field-for-statbot-2026-08-23.md
Status: Active
---

# Implementation: Plan 012 — `valid` field on stored messages

**Plan Reference**: `agent-output/planning/012-message-valid-field.md`, rev 8, commit `2589ee8`.
**QA Reference**: `agent-output/qa/012-message-valid-field-qa.md`, Phase 1 rev 4, commit `c1aee80`.
**Critique Reference**: `agent-output/critiques/012-message-valid-field-critique.md`, `a4bec32`, APPROVED FOR IMPLEMENTATION (cycle 2 pass 2; F10/F11 open, both scoped to UAT execution ordering, stated by the critic to gate nothing this stage builds).
**Chain branches**: `chain/012-message-valid-field` — `website` from `72dc7de`, `project-utils` from `eb38a15`. Raised by the steering thread; not created or switched by this session.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-23 | steering-hooks-012 | Chain 012 approved for implementation; execute the plan per rev 8, QA Phase 1 rev 4, critique `a4bec32` | M1–M6 implemented on the chain branch in both repos. M7 (handoff closure) left to the closing stage per the plan's own text. Reached the owner-gated push boundary at release condition 3/5 — reported back to steering rather than proceeding past it. |

## Value Statement

As carried from the plan: stored hooks.gg messages now carry a machine-readable `valid` field, computed from the composer's own send-gate checks (corrected to also read the stored `IS_COMPONENTS_V2_FLAG` bit, not structure alone), recomputed on every save, and exposed at top level on both Statbot-facing v1 endpoints. The backfill script that will populate it across existing records is written, tested, and not yet run (owner-executed against production, per Assumption 4; no database was available in this environment).

This delivers the communication gap the owner named: hooks.gg can now say a message is invalid; Statbot does not have to revalidate.

## Milestones Completed

- [x] **M1** — nullable `valid Boolean?` added to `project-utils/prisma/schema.prisma`; `npx prisma generate` then `npm run rebuild` (lint, tsc build, api-extractor) run in the repo's own ordered chain; schema + generated Kysely types + committed `dist/index.d.ts` rollup committed together. M1-a is a claim about the production table and is owner-verified at DDL time (not executable here — no database). M1-b verified: `dist/index.d.ts` declares `valid: boolean | null` on `Message`.
- [x] **M2** — the send gate (`validateContentRequirements`/`validateMessage`, `src/utils/limits.tsx`) now treats V2-ness as structural-OR-flag; D11's flag-clear extracted into `src/utils/messageMode.ts` (`switchToV2`/`switchToClassic`, masked with `& ~IS_COMPONENTS_V2_FLAG`) and wired into `DiscordMessageEditor`'s `handleModeSwitch`. All 36 cells of QA's pre-registered partition spec pass, including the D11 round-trip simulation.
- [x] **M3** — `src/server/api/utils/messageValidity.ts`: `isMessageValid`, calling `validateMessage` from `~/utils/limits` directly (not the `~/utils` barrel), adding no clause of its own; a throwing payload computes `false`.
- [x] **M4** — `src/server/api/utils/shared.ts`: `buildMessageValues` (computes `valid` via the M3 predicate on every write) and `buildUpsertMessageQuery` (`valid` named in both the insert column list and the `on conflict … do update set` list) extracted from `upsertMessage`, which now composes them. S4/S5 (preview-image POST, Pusher broadcast) call sites unchanged in count, order and payload — verified by diff inspection, not by test (no existing infra reaches them without a live process).
- [x] **M5** — both v1 endpoints (`src/pages/api/v1/guilds/[guildId]/messages.ts`, `.../messages/[id].ts`) select `Messages.valid` and emit it at top level via a conditional spread, omitting the key entirely (never `null`) when the stored value is `NULL`.
- [x] **M6** — `src/scripts/backfillValid.ts`: NULL-only, idempotent backfill (`UPDATE … WHERE id = $1 AND valid IS NULL`, the guard inside the write per S2/MS-4), reusing the M3 predicate; report carries `total`/`trueCount`/`falseCount`, per-check failure counts, the flag/structure-disagreement class (F-QA2), the whitespace-content class with row ids (D14), and the evaluation-failure class with row ids (the Assumption Not Checked closure this document owns — see below). **Not executed** — owner-executed against production per Assumption 4, and no database was reachable in this environment.
- [ ] **M7** — handoff closure. Per the plan's own text this is "executed by the closing stage per the workspace's close procedure, not by this plan." Not attempted here.

## Entry Conditions (QA's probe shapes, executed before the milestone that consumes them)

| Condition | Where satisfied | Pinned by |
|---|---|---|
| `(await import('~/utils')).validateMessage === (await import('~/utils/limits')).validateMessage` | `src/utils/__tests__/012-validity-predicate.test.ts`, describe `M3-a — parity by construction`, test `T3` | Passing assertion, verified this session |
| Kysely's `.compile()` on the actual upsert query returns SQL whose `on conflict … do update set` list is separately inspectable | `src/server/api/utils/__tests__/012-upsert-valid.test.ts`, describe `M4-b` | Passing assertions against a real (unconnected) `Kysely` instance's compiled SQL |
| `res.json` is reached through `JSON.stringify` in the installed Next version | Read at source: `node_modules/next/dist/server/api-utils/node/api-resolver.js:91-95,336` (`sendJson` → `res.send(JSON.stringify(jsonBody))`; `apiRes.json = (data) => sendJson(apiRes, data)`) | Source read, this session, Next `^16.1.6` as installed |

## Files Modified

| Path | Changes | Repo |
|---|---|---|
| `prisma/schema.prisma` | Added nullable `valid Boolean?` to `model Message` | `project-utils` |
| `src/generated/db/types.ts` | Regenerated via `npx prisma generate` | `project-utils` |
| `dist/index.d.ts` | Regenerated via `npm run rebuild` | `project-utils` |
| `src/utils/limits.tsx` | `validateContentRequirements`/`validateMessage` accept `flags`; V2-ness is structural-OR-flag | `website` |
| `src/components/DiscordMessageEditor/index.tsx` | `handleModeSwitch` delegates to `switchToV2`/`switchToClassic` | `website` |
| `src/pages/api/v1/guilds/[guildId]/messages.ts` | Selects and emits `valid` (conditional spread) | `website` |
| `src/pages/api/v1/guilds/[guildId]/messages/[id].ts` | Same, single-record endpoint | `website` |
| `src/server/api/utils/shared.ts` | `buildMessageValues`/`buildUpsertMessageQuery` extracted; `upsertMessage` composes them | `website` |
| `package.json` | Added `test`/`test:watch` scripts (QA's proposal) and `backfill-valid` script | `website` |

## Files Created

| Path | Purpose | Repo |
|---|---|---|
| `src/utils/messageMode.ts` | `switchToV2`/`switchToClassic`, the mode-switch data effects, extracted for testability without component-render infrastructure | `website` |
| `src/server/api/utils/messageValidity.ts` | `isMessageValid`, the M3 predicate | `website` |
| `src/scripts/backfillValid.ts` | `classifyRow`/`accumulate`/`emptyReport` (pure, tested) plus `runBackfill`/`main` (DB loop, not unit-tested — no database in this environment) | `website` |
| `src/utils/__tests__/012-message-mode.test.ts` | TDD spec for `messageMode.ts` | `website` |
| `src/utils/__tests__/012-validity-predicate.test.ts` | TDD spec for `messageValidity.ts` | `website` |
| `src/server/api/utils/__tests__/012-upsert-valid.test.ts` | TDD spec for `buildMessageValues`/`buildUpsertMessageQuery` | `website` |
| `src/pages/api/v1/__tests__/012-valid-exposure.test.ts` | TDD spec for M5 | `website` |
| `src/scripts/__tests__/012-backfill-classify.test.ts` | TDD spec for `classifyRow`/`accumulate` | `website` |

`website/src/utils/__tests__/012-send-gate-partition.test.ts` was written by QA at Phase 1 and committed by this session (`a7ebe4d`) before M2 was implemented — not listed above as "created" since it is QA's document, not this session's.

## Code Quality Validation

- [x] Vitest suite: 20 files, 376 tests, all passing (`npx vitest run`, `website` chain branch, after this session's commits).
- [x] Lint (`npx eslint <changed files>`): clean on every file this session created or modified, except the 5 pre-existing errors in `src/utils/limits.tsx` (member-delimiter-style at an unrelated line, one unused `validateEmbed` export) — confirmed identical on the pre-session baseline via `git stash`; not this session's to fix (not touched by this plan's scope) and not gating (`website` carries no pre-commit lint hook — confirmed: no `.githooks` in this repo, unlike `project-utils`).
- [x] **Typecheck: RED**, as QA predicted. `npx tsc --noEmit -p tsconfig.json` — 10 errors, every one a variant of "`valid` does not exist on `DatabaseSchema`/`InsertObject<DatabaseSchema,'Messages'>`", across `messages.ts`, `messages/[id].ts`, `backfillValid.ts`, `shared.ts`. Cause: `website`'s installed `project-utils` resolves the old pin `eb38a15` (no `valid` column). Stays red until the `project-utils` M1 commit (`749606d`) is pushed and `website`'s pin/lockfile is refreshed (release condition 3) — **this is the owner-gated boundary this session reached and did not cross**.
- [x] `project-utils` pre-commit hook (`npm run rebuild` + `git ls-files -m` check) passed on the M1 commit — confirmed by a clean `git status` immediately after.

## Value Statement Validation

Delivered: the composer's send gate now agrees with Discord's own rejection of flag/structure-disagreeing messages; the corrected verdict is callable server-side (M3), written on every save (M4), and exposed to Statbot (M5). Not yet delivered: the backfill has not run (owner-executed, no database available here) and the field is not yet declared live — both are explicitly gated on the owner's review of the backfill distribution (M6-b, D6), which cannot happen before the backfill runs, which cannot happen before the `project-utils` push this session could not make.

## TDD Compliance

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `validateContentRequirements`/`validateMessage` (flags-aware) | `012-send-gate-partition.test.ts` (QA's, committed before M2) | Yes | Yes | 5/36 AssertionError (B3, B5, B7, the 5712 sentinel, the M2-f "unsendable as stored" case) | Yes (36/36) |
| `switchToV2` | `012-message-mode.test.ts` | Yes | Yes | Cannot find module `~/utils/messageMode` | Yes |
| `switchToClassic` | `012-message-mode.test.ts` | Yes | Yes | Cannot find module `~/utils/messageMode` | Yes |
| `isMessageValid` | `012-validity-predicate.test.ts` | Yes | Yes | Cannot find module `~/server/api/utils/messageValidity` | Yes |
| `buildMessageValues` | `012-upsert-valid.test.ts` | Yes | Yes | `buildMessageValues is not a function` | Yes |
| `buildUpsertMessageQuery` | `012-upsert-valid.test.ts` | Yes | Yes | `buildUpsertMessageQuery is not a function` | Yes |
| v1 endpoint `valid` exposure (both handlers) | `012-valid-exposure.test.ts` | Yes | Yes | 4/6 AssertionError (`valid` absent where expected present, for both `true` and `false` stored states, both endpoints) | Yes (6/6) |
| `classifyRow` | `012-backfill-classify.test.ts` | Yes | Yes | Cannot find module `~/scripts/backfillValid` | Yes |
| `accumulate` / `emptyReport` | `012-backfill-classify.test.ts` (exercised indirectly via `classifyRow`'s consumers in the same file) | Yes | Yes | Same module-not-found failure as `classifyRow` | Yes |
| `runBackfill` / `main` (DB loop) | — | N/A | N/A | No database in this environment; not unit-tested (QA: "Suites cannot reach the production database — M6's properties are verified by the backfill's own instruments and the owner's review") | N/A |

No row shows "No" for any column. `runBackfill`/`main` are the DB-execution shell around the tested pure functions (`classifyRow`, `accumulate`, `emptyReport`) and the tested query builders (`buildUpsertMessageQuery`'s pattern reused for the per-row `UPDATE`); QA's own Testing Strategy states M6's DB-touching half is verified by the backfill's own instruments at execution time and the owner's review, not by this suite.

## Test Coverage

**Unit**: M2 (36-cell partition, QA's), M2-e/M2-f (D11 round trip, QA's, plus this session's `012-message-mode.test.ts` against the real extracted functions the production callback calls — not a transcription), M3 (parity by construction, sentinels, known asymmetry, purity, throw-handling — `012-validity-predicate.test.ts`), M6's classification (`012-backfill-classify.test.ts`).

**Integration-level**: M4 (compiled-SQL assertions over a real, unconnected `Kysely` instance — no database required, per QA's Kysely query-compilation harness), M5 (hand-rolled `NextApiRequest`/`NextApiResponse` doubles, `project-utils` mocked at the module boundary, asserting over `JSON.parse(JSON.stringify(body))` per F-QA4).

**Not executable here**: M1-a (production row count), M6-a/b/c (production backfill), all four post-deploy observable rows (R2–R7) — all owner-executed per the plan, no database available in this environment.

## Test Execution Results

```
$ npx vitest run   (website, chain/012-message-valid-field, HEAD bc5ee2b)
 Test Files  20 passed (20)
      Tests  376 passed (376)

$ npx tsc --noEmit -p tsconfig.json
 10 errors — every one "'valid' does not exist" against the old project-utils pin (eb38a15).
 RED, as predicted. See Code Quality Validation.

$ npm run rebuild   (project-utils, chain/012-message-valid-field, HEAD 749606d)
 lint, tsc build, api-extractor — all passed; pre-commit hook's own ls-files -m check passed.
```

## Class Sweep Table

Not applicable — this is a first-delivery implementation pass, not a fix round against reviewer findings or a self-found mutation gap. No class sweep is owed for this document.

## Assumption Not Checked — closure (QA's handoff to the implementer)

QA's document names this session as the closure owner: the M6-b evaluation-failure category "must carry a count and the row ids, not a count alone." `src/scripts/backfillValid.ts`'s `accumulate` function implements this: `report.evaluationFailures` is `{ count: number; rowIds: string[] }`, populated whenever `classifyRow` catches a throw from `validateMessage` (tested: `012-backfill-classify.test.ts`, describe `classifyRow — evaluation failures`). **The category itself has not been measured against production** — no database was reachable in this environment, so the falsity signature QA named (a non-empty evaluation-failure category) remains unmeasured. The mechanism is built and tested; the measurement is the owner's, at backfill execution.

## Outstanding Items

1. **Owner-gated push, reached and not crossed.** `project-utils`'s M1 commit (`749606d`) is on the chain branch, unpushed. Per this session's grant, pushing is not mine to seek by proceeding — reported to steering-hooks-012 per the brief's explicit instruction ("Tell me when you reach it"). Everything downstream of the push (typecheck green, `website`'s pin/lockfile refresh, the pinned-build proof at release condition 3, the total release order at release condition 5) is blocked on it.
2. **Backfill not executed.** `src/scripts/backfillValid.ts` is written and its pure classification logic is unit-tested; the DB-touching loop (`runBackfill`/`main`) has not run against any database — none was reachable in this environment, and execution is owner-executed per Assumption 4 regardless.
3. **M6-a/b/c, and post-deploy observables R2–R7, are all unexecuted** — each requires either a live production database or the deployed composer/API, neither available here. All are registered in the QA document's BLOCKING RELEASE CONDITIONS register as post-deploy-observable or pre-release-pending-backfill rows; none is claimed complete by this document.
4. **M4-e (S4/S5 unchanged)** was verified by reading the diff, not by an executed test — no existing infrastructure in this repo drives `upsertMessage`'s Pusher/preview-image side effects without a live process, and adding one was judged out of proportion to a two-call-site, unchanged-payload property. Recorded as a self-diagnosed gap: the property is asserted by argument, not by an instrument that would fail if the argument were wrong.
5. **Foreign, shared-tree file observed, not touched**: `src/utils/__tests__/012-json-editor-repair-path.test.ts` appeared in the working tree during this session, untracked, authored by a concurrent session (not this one — never created or edited by this session). It failed briefly during this session's work (4/4 tests in that file), then passed on a later run — resolved by its own author, not by this session. Never committed by this session, never investigated beyond confirming it wasn't mine.
6. **A pre-existing foreign hunk was seen and excluded, not committed**: `src/providers/MessageProvider/useApiMethods.ts` showed as modified in the working tree at one point during this session (`git status`, before the M2–M6 commit). It was never part of this plan's Serialised Shared Files and was excluded from the commit's pathspec; by the time of the commit it no longer showed as modified (resolved by its own author).
7. **Method-level self-diagnosis**: this session's M4 test coverage (`012-upsert-valid.test.ts`) proves the compiled SQL shape and the computed `valid` value in isolation, but does not exercise `upsertMessage` end-to-end (count query, guild upsert, preview-image POST, Pusher trigger, `getMessage` re-read) — the property the plan actually cares about (a real save recomputes and persists `valid`) is verified by construction (the extracted functions are the ones `upsertMessage` calls) rather than by an end-to-end instrument. If a future edit reconnects the pieces differently, this test suite would not catch it; only a database-backed integration test would.

## Next Steps

1. **Report to steering-hooks-012**: the M1 push boundary reached; owner approval needed to push `project-utils`, after which `website`'s pin/lockfile refresh and the pinned-build proof (release condition 3) can proceed, followed by `tsc` going green.
2. **code-reviewer**, once steering has this document, to review code quality before QA re-engages for Phase 2 (execution and verdict) per the QA document's own remit.
3. **qa** (Phase 2, same session per the owner's ruling) to verify against this implementation, execute the mutation sweep, and — once the owner has pushed and provided database access — verify M1/M6's production-dependent properties.
