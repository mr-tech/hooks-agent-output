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
| 2026-08-23 | steering-hooks-012 | Owner approved the push ("Approve the push"); push `project-utils`' M1 commit, then hold — no pin refresh | `749606d` pushed to `origin/chain/012-message-valid-field` on `project-utils`. Held as instructed: no pin refresh, no reinstall, no rebuild. |
| 2026-08-23 | steering-hooks-012 | Code review verdict REJECTED (`agent-output/code-review/012-message-valid-field-code-review.md`, `24b8af1`); fix round for H1, H2, and (strongly recommended) M1 | Fix round committed (`681c353`). H1 closed — a second, independent blocker (ts-node's vendored CJS loader rejecting `require()` of `~/env.mjs`) was found while driving the fix past the reviewer's own stopping point, and closed by extracting the env-independent constants `~/utils/limits.tsx` needs into `src/constants/messageLimits.ts`. H2 closed — report persisted to disk, `process.exit()` removed, partial-run reporting on interruption, coverage-labelled fields. M1 closed structurally — every M6-b category is now `{ count, rowIds }`. M2 (recommended) partially closed: `applyModeSwitch` extracted and tested; the `upsertMessage` seam kept at the reviewer's Minimum disposition. L1 (recommended) closed: stale comments deleted. L2, L3 recorded, not actioned this round (see Outstanding Items). Full record: `agent-output/verification/012/probe-fix-round-h1-h2/README.md`. |
| 2026-08-23 | steering-hooks-012 | Code review round 2 verdict REJECTED, narrowly, on H3 (`agent-output/code-review/012-message-valid-field-code-review.md`, `66ddcf6`); H1/M1/`applyModeSwitch` all CONFIRMED closed. Fix round for H3 (blocking), M2's record correction (blocking), and (strongly recommended) M1-r2, L4, L6 | H3 closed structurally: `main()`'s two success-path loss members (unguarded `tableWideRowCount`, persist-before-print) collapsed into a single `emit()` function used on both the success and interrupted paths, so the asymmetry the reviewer named is unrepresentable rather than patched — stdout now precedes disk, `persistReport` failures are caught inside `emit` and logged rather than propagated, `void main()` now carries `.catch()`. Verified live against a dead `DATABASE_URL`, both legs the reviewer named for return (persisted+printed; persist-failure does not swallow the connection error) — `agent-output/verification/012/probe-fixround2-h3/README.md`. M2 (blocking) — implementation doc corrected: the `handleModeSwitch` seam is accepted at Minimum, not closed; `applyModeSwitch`'s test describe block retitled to stop claiming wiring coverage. M1-r2 (recommended) addressed: `persistReport` refuses to overwrite (`wx` flag), and a new `reportPath(runId)` gives every run its own filename so refusal protects prior evidence rather than blocking the next run; report now carries `runId`/`startedAt`/`endedAt` provenance. L4 (recommended) addressed: the two review-thread comment fragments deleted from `012-backfill-report.test.ts`. L6 (recommended) addressed: the fix-round transcript's residual wording corrected — 26 env-independent exports remain trapped behind `~/env.mjs`, not the narrower "env-dependent" framing originally stated. |
| 2026-08-23 | steering-hooks-012 | Code review round 3 verdict APPROVED_WITH_COMMENTS (`agent-output/code-review/012-message-valid-field-code-review.md`, `8e87ddf`) — H3 fully closed, no HIGH/CRITICAL survives. M4 (MEDIUM), owner-directed via steering ("Guard it before the pin refresh"): the shipped `backfill-valid` script defaults to the live production `DATABASE_URL` with no guard, inert today only because the held stale pin makes it die before executing — a hazard that arms the moment the pin refresh (queued next) lands. M5 (record correction, not blocking); L7 (LOW, mine to judge for proportionality) | M4 closed at the Preferred/structural action, which also closes L8 in the same change: `main()` now calls `assertConfirmedTarget(resolveTargetHost(DATABASE_URL), BACKFILL_CONFIRM)` before `getPostgres()` is even called, so no bare invocation — against any host, production included — makes a connection attempt; `BACKFILL_REPORT_DIR` gives the report destination an env override, so a verification drive no longer has to write into and clean up after itself in the owner's gate directory. Verified live against the reviewer's exact measured hazard (the real `.env.local` production host) — refuses identically to the dead-host case. M5 closed: the Files Created table's stale `applyModeSwitch`/`backfillValid.ts` rows corrected to match Outstanding Item 9's disposition and the current export list. L7 judged proportional to address given the file was already open this round: `formatReport`'s meta type widened to declare the provenance fields (`interface ReportMeta`, shared with `emit` via `Omit<>`), plus a regression-guard test. 399/399 tests passing (was 390), eslint clean, typecheck unchanged (8 pin-gated errors, same class). Full record: `agent-output/verification/012/probe-fixround3-m4-and-m5/README.md`. |
| 2026-08-23 | steering-hooks-012 | Code review round 4 verdict APPROVED_WITH_COMMENTS (`agent-output/code-review/012-message-valid-field-code-review.md`, `02125eb`) — D17 satisfied, guard adversarially attacked (11 inputs, oracle fixed in advance) and held. New M6 (MEDIUM, latent): the guard's WHATWG `new URL()` and `pg`'s own connection-string parser disagree on a `host=`/`port=` query override — demonstrated end-to-end, a decoy authority host satisfied `BACKFILL_CONFIRM` while the process connected elsewhere. Owner ruling relayed by steering, verbatim: "Close the hole first" — implement the reviewer's Minimum only, explicitly not the Preferred (declined by the owner: it changes `project-utils` itself and tangles with the pin refresh). L10 (LOW, mine to judge) | M6 closed at the ruled Minimum: `assertNoHostOverride(databaseUrl)` runs as `main`'s first statement, ahead of the M4 guard, and throws unconditionally when `DATABASE_URL` carries a `host` or `port` search parameter — no confirmation value, correct or not, can get past a URL the guard cannot trust its own parse of. Verified live by reproducing the reviewer's exact decoy-host attack (now refused, zero connection attempts) and confirming a plain `DATABASE_URL` still proceeds (no over-block). L10 closed at its own Minimum, judged proportional: `assertConfirmedTarget` now rejects any confirmation value starting with `"("` before comparing it to the resolved host, so the guard's own `(unset)`/`(unparseable)` sentinels can no longer be confirmed as if they were real targets. 408/408 tests passing (was 399), eslint clean, typecheck unchanged (8 pin-gated errors, same class). Not done, by explicit ruling not oversight: deriving the guarded host from `pg`'s own parser (the Preferred action) — routed to the post-refresh review pass, as steering specified; `pg`'s `PGHOST`-family env fallbacks and `service=` file lookups remain untested (the reviewer's own disclosed residual, not closed by this Minimum). Full record: `agent-output/verification/012/probe-fixround4-m6-l10/README.md`. |

## Value Statement

As carried from the plan: stored hooks.gg messages now carry a machine-readable `valid` field, computed from the composer's own send-gate checks (corrected to also read the stored `IS_COMPONENTS_V2_FLAG` bit, not structure alone), recomputed on every save, and exposed at top level on both Statbot-facing v1 endpoints. The backfill script that will populate it across existing records is written, tested, and not yet run (owner-executed against production, per Assumption 4; no database was available in this environment).

This delivers the communication gap the owner named: hooks.gg can now say a message is invalid; Statbot does not have to revalidate.

## Milestones Completed

- [x] **M1** — nullable `valid Boolean?` added to `project-utils/prisma/schema.prisma`; `npx prisma generate` then `npm run rebuild` (lint, tsc build, api-extractor) run in the repo's own ordered chain; schema + generated Kysely types + committed `dist/index.d.ts` rollup committed together. M1-a is a claim about the production table and is owner-verified at DDL time (not executable here — no database). M1-b verified: `dist/index.d.ts` declares `valid: boolean | null` on `Message`.
- [x] **M2** — the send gate (`validateContentRequirements`/`validateMessage`, `src/utils/limits.tsx`) now treats V2-ness as structural-OR-flag; D11's flag-clear extracted into `src/utils/messageMode.ts` (`switchToV2`/`switchToClassic`, masked with `& ~IS_COMPONENTS_V2_FLAG`) and wired into `DiscordMessageEditor`'s `handleModeSwitch`. All 36 cells of QA's pre-registered partition spec pass, including the D11 round-trip simulation.
- [x] **M3** — `src/server/api/utils/messageValidity.ts`: `isMessageValid`, calling `validateMessage` from `~/utils/limits` directly (not the `~/utils` barrel), adding no clause of its own; a throwing payload computes `false`.
- [x] **M4** — `src/server/api/utils/shared.ts`: `buildMessageValues` (computes `valid` via the M3 predicate on every write) and `buildUpsertMessageQuery` (`valid` named in both the insert column list and the `on conflict … do update set` list) extracted from `upsertMessage`, which now composes them. S4/S5 (preview-image POST, Pusher broadcast) call sites unchanged in count, order and payload — verified by diff inspection, not by test (no existing infra reaches them without a live process).
- [x] **M5** — both v1 endpoints (`src/pages/api/v1/guilds/[guildId]/messages.ts`, `.../messages/[id].ts`) select `Messages.valid` and emit it at top level via a conditional spread, omitting the key entirely (never `null`) when the stored value is `NULL`.
- [x] **M6** — `src/scripts/backfillValid.ts`: NULL-only, idempotent backfill (`UPDATE … WHERE id = $1 AND valid IS NULL`, the guard inside the write per S2/MS-4), reusing the M3 predicate; report carries `rowsClassifiedThisRun`/`trueCount`/`falseCount`, per-check failure counts, and four `{ count, rowIds }` categories: flag/structure-disagreement (F-QA2), its `valid === true` sub-class (code-review M1), whitespace-content (D14), and evaluation-failure (the Assumption Not Checked closure this document owns — see below). The report is persisted to `agent-output/verification/012/backfill-report.md`, labelled with a table-wide row count distinct from the run's own count, and marked `interrupted: true` with a partial dump on any mid-run failure (code-review H2). **Not executed against production** — owner-executed per Assumption 4, and no production database was reachable in this environment; the persistence/interruption mechanism was demonstrated live against a deliberately dead database during the fix round (see `agent-output/verification/012/probe-fix-round-h1-h2/README.md`).
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
| `package.json` | Added `test`/`test:watch` scripts (QA's proposal) and `backfill-valid` script; fix round: added `-r tsconfig-paths/register` to all three `ts-node` scripts, `tsconfig-paths` devDependency (H1) | `website` |
| `pnpm-lock.yaml` | Fix round: `tsconfig-paths` and its own transitive deps added; `project-utils` entry untouched (verified by diff) | `website` |
| `src/constants/index.ts` | Fix round (H1): the eleven env-independent constants `~/utils/limits.tsx` needs moved to `src/constants/messageLimits.ts`, re-exported (`export * from './messageLimits'`) so the barrel's public surface is unchanged | `website` |

## Files Created

| Path | Purpose | Repo |
|---|---|---|
| `src/utils/messageMode.ts` | `switchToV2`/`switchToClassic`, the mode-switch data effects, extracted for testability without component-render infrastructure. Fix round: `applyModeSwitch(targetMode, prev)` added — its extraction is behaviour-preserving (code review round 2, 5,000-case differential), but the `handleModeSwitch` wiring seam to it remains accepted at Minimum, not closed (code review round 2 M2; see Outstanding Item 9) | `website` |
| `src/server/api/utils/messageValidity.ts` | `isMessageValid`, the M3 predicate | `website` |
| `src/scripts/backfillValid.ts` | `classifyRow` (pure, tested); `emptyReport`/`accumulate`/`formatReport`/`persistReport` (pure, tested — report shape, coverage labelling, disk persistence, all added or reshaped in fix round 1 for H2/M1); `emit`/`reportPath` (pure/near-pure, tested — the single exit point that closed H3 in fix round 2, and the per-run overwrite-safe path from M1-r2); `resolveTargetHost`/`assertConfirmedTarget` (pure, tested — the production-default guard from M4, fix round 3, which also gives the report destination an env override, closing L8) plus `runBackfill`/`tableWideRowCount`/`main` (DB loop, not unit-tested — no database in this environment, demonstrated live instead) | `website` |
| `src/constants/messageLimits.ts` | Fix round (H1): the env-independent constants `limits.tsx`/`messageMode.ts`/`backfillValid.ts` need, with no transitive import of `~/env.mjs` | `website` |
| `src/utils/__tests__/012-message-mode.test.ts` | TDD spec for `messageMode.ts`, extended in the fix round for `applyModeSwitch` | `website` |
| `src/utils/__tests__/012-validity-predicate.test.ts` | TDD spec for `messageValidity.ts` | `website` |
| `src/server/api/utils/__tests__/012-upsert-valid.test.ts` | TDD spec for `buildMessageValues`/`buildUpsertMessageQuery` | `website` |
| `src/pages/api/v1/__tests__/012-valid-exposure.test.ts` | TDD spec for M5 | `website` |
| `src/scripts/__tests__/012-backfill-classify.test.ts` | TDD spec for `classifyRow` | `website` |
| `src/scripts/__tests__/012-backfill-report.test.ts` | Fix round: TDD spec for `emptyReport`/`accumulate`'s new shape, `formatReport`, `persistReport` (H2, M1) | `website` |

`website/src/utils/__tests__/012-send-gate-partition.test.ts` was written by QA at Phase 1 and committed by this session (`a7ebe4d`) before M2 was implemented — not listed above as "created" since it is QA's document, not this session's.

## Code Quality Validation

- [x] Vitest suite: 21 files, 385 tests, all passing (`npx vitest run`, `website` chain branch, after the fix-round commit).
- [x] Lint (`npx eslint <changed files>`): clean on every file this session created or modified, except the 5 pre-existing errors in `src/utils/limits.tsx` (member-delimiter-style at an unrelated line, one unused `validateEmbed` export) — confirmed identical on the pre-session baseline via `git stash`; not this session's to fix (not touched by this plan's scope) and not gating (`website` carries no pre-commit lint hook — confirmed: no `.githooks` in this repo, unlike `project-utils`). **False-signal note**: `npx eslint package.json` run directly reports ~320 errors (quote style, etc.) on both the pre- and post-fix-round tree — confirmed pre-existing and confirmed not real: `npm run lint`'s actual invocation (`eslint --fix .`) only traverses `.js`/`.ts`/`.tsx` by extension and never reaches `package.json`; naming the file directly on the CLI bypasses that filter and lints it as loose JS. Recorded so a future reader does not mistake this diagnostic artifact for a real lint failure.
- [x] **Typecheck: RED, unchanged in class** (8 errors, all "`valid` does not exist" against the stale `project-utils` pin `eb38a15` — same defect class as the 10 originally reported; the count differs only because line numbers shifted). `website`'s installed dependency still resolves the old pin. Stays red until `website`'s pin/lockfile is refreshed (release condition 3) — **explicitly deferred this round on steering's sequencing instruction** ("still no pin refresh... do not stack a lockfile change on top of the fix round"), not because it could not be attempted.
- [x] `project-utils` pre-commit hook (`npm run rebuild` + `git ls-files -m` check) passed on the M1 commit — confirmed by a clean `git status` immediately after.
- [x] **`project-utils`'s M1 commit (`749606d`) pushed** to `origin/chain/012-message-valid-field`, owner-approved ("Approve the push", verbatim, relayed by steering). Verified after push: `git log --oneline origin/chain/012-message-valid-field` shows exactly `749606d` → `eb38a15` → `565ade5`; working tree clean.
- [x] **H1 (code review) verified by execution, not by reasoning**, per the reviewer's own required verification: `DATABASE_URL=<dead> npx ts-node --transpile-only -r tsconfig-paths/register -r dotenv/config src/scripts/backfillValid.ts` now fails with `Error: connect ECONNREFUSED 127.0.0.1:1` — module resolution and the `~/env.mjs` ESM-interop blocker (found while driving this verification, not in the reviewer's own probe) are both clear. Full transcript: `agent-output/verification/012/probe-fix-round-h1-h2/README.md`.
- [x] **H2 demonstrated live on the same drive**: the interrupted report was persisted to disk (`agent-output/verification/012/backfill-report.md`, verified present then deleted — a dead-DB test artifact, not real backfill evidence) and printed to stdout, carrying `"interrupted": true` and `"tableWideRowCount": -1`; `process.exitCode` (not `process.exit()`) was used throughout.

## Value Statement Validation

Delivered: the composer's send gate now agrees with Discord's own rejection of flag/structure-disagreeing messages; the corrected verdict is callable server-side (M3), written on every save (M4), and exposed to Statbot (M5). Not yet delivered: the backfill has not run against production (owner-executed; its execution shell was code-review-rejected once for not running at all, fixed, and re-demonstrated live against a dead database this round) and the field is not yet declared live — both are explicitly gated on the owner's review of the backfill distribution (M6-b, D6), which follows the website pin refresh and pinned-build proof, both held this round pending a clean code-review verdict.

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
| `runBackfill` / `main` (DB loop) | — | N/A | N/A | No database in this environment; not unit-tested (QA: "Suites cannot reach the production database — M6's properties are verified by the backfill's own instruments and the owner's review"); demonstrated live instead (Code Quality Validation) | N/A |
| **Fix round (H1/H2/M1), code review `24b8af1`:** |
| `applyModeSwitch` | `012-message-mode.test.ts` | Yes | Yes | `applyModeSwitch is not a function` | Yes |
| `emptyReport`/`accumulate` (new shape: `rowsClassifiedThisRun`, `flagStructureDisagreementValidTrue`) | `012-backfill-report.test.ts` | Yes | Yes | `report.rowsClassifiedThisRun` `undefined`; `flagStructureDisagreement.rowIds` `undefined`; `flagStructureDisagreementValidTrue` `undefined` | Yes |
| `formatReport` | `012-backfill-report.test.ts` | Yes | Yes | `formatReport is not a function` | Yes |
| `persistReport` | `012-backfill-report.test.ts` | Yes | Yes | `persistReport is not a function` | Yes |
| **Fix round 2 (H3/M1-r2), code review `66ddcf6`:** |
| `emit` | `012-backfill-report.test.ts` | Yes | Yes | `TypeError: emit is not a function` (2 cases: symmetric-guard, stdout-before-persist) | Yes |
| `persistReport` (overwrite-refusal, new behaviour) | `012-backfill-report.test.ts` | Yes | Yes | `AssertionError: expected [Function] to throw an error` — second `persistReport` call to the same path did not throw | Yes |
| `reportPath` | `012-backfill-report.test.ts` | Yes | Yes | `TypeError: reportPath is not a function` (2 cases) | Yes |
| **Fix round 3 (M4/L7), code review `8e87ddf`:** |
| `reportPath` (2nd param, dir override — new behaviour) | `012-backfill-report.test.ts` | Yes | Yes | Override arg silently ignored — path did not honour it | Yes |
| `resolveTargetHost` | `012-backfill-report.test.ts` | Yes | Yes | `TypeError: resolveTargetHost is not a function` (4 cases) | Yes |
| `assertConfirmedTarget` | `012-backfill-report.test.ts` | Yes | Yes | `TypeError: assertConfirmedTarget is not a function` (3 cases) | Yes |
| `formatReport` (provenance fields — regression guard, not red/green) | `012-backfill-report.test.ts` | N/A | N/A | Not a new function or behaviour change — the fields already reached the body through the untyped spread at HEAD, so this case passed immediately; added to catch a *future* regression, per L7's own framing (widening the type does not by itself force the field's presence, since the fields stay optional) | Yes |
| **Fix round 4 (code-review-M6/L10, disambiguated from plan milestone M6), code review `02125eb`:** |
| `hasConnectionOverrideParams` | `012-backfill-report.test.ts` | Yes | Yes | `TypeError: hasConnectionOverrideParams is not a function` (4 cases) | Yes |
| `assertNoHostOverride` | `012-backfill-report.test.ts` | Yes | Yes | `TypeError: assertNoHostOverride is not a function` (4 cases) | Yes |
| `assertConfirmedTarget` (sentinel-rejection — new behaviour) | `012-backfill-report.test.ts` | Yes | Yes | Sentinel confirmation did not throw (no `sentinel` message) | Yes |

No row shows "No" for any column that applies. `runBackfill`/`main` are the DB-execution shell around the tested pure functions; QA's own Testing Strategy states M6's DB-touching half is verified by the backfill's own instruments at execution time and the owner's review, not by this suite — all three fix rounds additionally demonstrated that shell live against a deliberately dead database, and round 3 additionally against the real (but unreachable in this environment except via the guard's own refusal) production host (Code Quality Validation, H1/H2/H3/M4 rows).

## Test Coverage

**Unit**: M2 (36-cell partition, QA's), M2-e/M2-f (D11 round trip, QA's, plus this session's `012-message-mode.test.ts` against the real extracted functions the production callback calls — not a transcription), M3 (parity by construction, sentinels, known asymmetry, purity, throw-handling — `012-validity-predicate.test.ts`), M6's classification (`012-backfill-classify.test.ts`).

**Integration-level**: M4 (compiled-SQL assertions over a real, unconnected `Kysely` instance — no database required, per QA's Kysely query-compilation harness), M5 (hand-rolled `NextApiRequest`/`NextApiResponse` doubles, `project-utils` mocked at the module boundary, asserting over `JSON.parse(JSON.stringify(body))` per F-QA4).

**Not executable here**: M1-a (production row count), M6-a/b/c (production backfill), all four post-deploy observable rows (R2–R7) — all owner-executed per the plan, no database available in this environment.

## Test Execution Results

```
$ npx vitest run   (website, chain/012-message-valid-field, HEAD 681c353)
 Test Files  21 passed (21)
      Tests  385 passed (385)

$ npx tsc --noEmit -p tsconfig.json
 8 errors — every one "'valid' does not exist" against the old project-utils pin (eb38a15).
 RED, unchanged in class from the first round. See Code Quality Validation.

$ npm run rebuild   (project-utils, chain/012-message-valid-field, HEAD 749606d)
 lint, tsc build, api-extractor — all passed; pre-commit hook's own ls-files -m check passed.

$ git push origin chain/012-message-valid-field   (project-utils)
 * [new branch]  chain/012-message-valid-field -> chain/012-message-valid-field

$ DATABASE_URL=<dead> npx ts-node --transpile-only -r tsconfig-paths/register \
    -r dotenv/config src/scripts/backfillValid.ts dotenv_config_path=.env.local
 Error: connect ECONNREFUSED 127.0.0.1:1   (exit 1 — H1's required verification, met)

--- Fix round 2 (H3/M1-r2), against website 66ddcf6's review ---

$ npx vitest run   (website, working tree at fix round 2, pre-push)
 Test Files  21 passed (21)
      Tests  390 passed (390)   (+5 over 681c353: 2 `emit` cases, 1 overwrite-refusal case,
                                  2 `reportPath` cases)

$ npx eslint src/scripts/backfillValid.ts
 No issues found.

$ npx tsc --noEmit -p tsconfig.json
 8 errors — same 8 sites (2 route selects, 3 backfillValid.ts, 3 shared.ts), same class, unchanged
 by this round's edits. RED, pin-gated, as before.

$ DATABASE_URL="postgresql://postgres:pw@127.0.0.1:1/db" \
    node -r ts-node/register/transpile-only -r tsconfig-paths/register -r dotenv/config \
    src/scripts/backfillValid.ts dotenv_config_path=.env.local
 report printed to stdout (tableWideRowCount: -1, interrupted: true, runId/startedAt/endedAt
 stamped) followed by the named `ECONNREFUSED 127.0.0.1:1`; report also persisted to
 agent-output/verification/012/backfill-report-<runId>.md (captured, then deleted — H3's required
 verification, met). Separately: emit() called directly against an unwritable target (ENOTDIR)
 resolved without throwing, stdout already written, ENOTDIR logged via console.error — the persist
 failure does not swallow the connection-error evidence. Full transcript:
 agent-output/verification/012/probe-fixround2-h3/README.md.

--- Fix round 3 (M4/L7), against website 8e87ddf's review, owner-directed on M4's sequencing ---

$ npx vitest run   (website, working tree at fix round 3)
 Test Files  21 passed (21)
      Tests  399 passed (399)   (+9 over eb28ae6: reportPath dir-override, resolveTargetHost x4,
                                  assertConfirmedTarget x3, formatReport provenance regression guard)

$ npx eslint src/scripts/backfillValid.ts
 No issues found.

$ npx tsc --noEmit -p tsconfig.json
 8 errors — same 8 sites, same class, unchanged by this round's edits. RED, pin-gated, as before.

$ DATABASE_URL="postgresql://postgres:pw@127.0.0.1:1/db" \
    node -r ts-node/register/transpile-only -r tsconfig-paths/register -r dotenv/config \
    src/scripts/backfillValid.ts dotenv_config_path=.env.local
 Error: Refusing to run: DATABASE_URL resolves to "127.0.0.1:1", but BACKFILL_CONFIRM was not set.
 Exit 1. Zero connection attempt — no ECONNREFUSED, refused before getPostgres() ran.

$ DATABASE_URL="postgresql://postgres:pw@127.0.0.1:1/db" BACKFILL_CONFIRM="127.0.0.1:1" \
    BACKFILL_REPORT_DIR="/tmp/012-m4-report-dir" \
    node -r ts-node/register/transpile-only -r tsconfig-paths/register -r dotenv/config \
    src/scripts/backfillValid.ts dotenv_config_path=.env.local
 Reaches ECONNREFUSED as before; report printed and persisted to /tmp/012-m4-report-dir/, NOT
 agent-output/verification/012/ — nothing left in the gate directory to clean up (L8).

$ node -r ts-node/register/transpile-only -r tsconfig-paths/register -r dotenv/config \
    src/scripts/backfillValid.ts dotenv_config_path=.env.local   (bare invocation, real .env.local)
 Error: Refusing to run: DATABASE_URL resolves to "viaduct.proxy.rlwy.net:12394", but
 BACKFILL_CONFIRM was not set.   — the reviewer's exact measured production hazard, refused
 identically. Full transcript: agent-output/verification/012/probe-fixround3-m4-and-m5/README.md.

--- Fix round 4 (code-review-M6/L10), against website 02125eb's review, owner-directed: Minimum only ---

$ npx vitest run   (website, working tree at fix round 4)
 Test Files  21 passed (21)
      Tests  408 passed (408)   (+9 over ff753a6: hasConnectionOverrideParams x4,
                                  assertNoHostOverride x4, assertConfirmedTarget sentinel-rejection)

$ npx eslint src/scripts/backfillValid.ts
 No issues found.

$ npx tsc --noEmit -p tsconfig.json
 8 errors — same 8 sites, same class, unchanged by this round's edits. RED, pin-gated, as before.

$ DATABASE_URL="postgresql://postgres:pw@decoy.invalid:1/db?host=127.0.0.1" \
    BACKFILL_CONFIRM="decoy.invalid:1" \
    node -r ts-node/register/transpile-only -r tsconfig-paths/register -r dotenv/config \
    src/scripts/backfillValid.ts dotenv_config_path=.env.local
 Error: Refusing to run: DATABASE_URL carries a "host" or "port" query parameter. [...]
 Exit 1. Zero connection attempt — the reviewer's exact sweep-case-11 attack, refused before the
 M4 guard even runs, regardless of the (matching) BACKFILL_CONFIRM.

$ BACKFILL_CONFIRM="(unset)" \
    node -r ts-node/register/transpile-only -r tsconfig-paths/register -r dotenv/config \
    src/scripts/backfillValid.ts dotenv_config_path=/dev/null
 Error: Refusing to run: BACKFILL_CONFIRM="(unset)" looks like a guard sentinel [...]
 Exit 1 — L10's attack, refused.

$ DATABASE_URL="postgresql://postgres:pw@127.0.0.1:1/db" BACKFILL_CONFIRM="127.0.0.1:1" \
    BACKFILL_REPORT_DIR="/tmp/012-m6-report" \
    node -r ts-node/register/transpile-only -r tsconfig-paths/register -r dotenv/config \
    src/scripts/backfillValid.ts dotenv_config_path=.env.local
 Reaches ECONNREFUSED as before — a plain URL with no override is not over-blocked. Full
 transcript: agent-output/verification/012/probe-fixround4-m6-l10/README.md.
```

## Class Sweep Table

Fix round against code review `agent-output/code-review/012-message-valid-field-code-review.md`
(`24b8af1`), verdict REJECTED. Two findings carry an enumeration in the reviewer's own document
(H1, M1); H2 has none named (a shape/behaviour defect, not a population to enumerate over) and is
recorded with its own before/after evidence instead. One additional class-sweep row is owed under
this session's own definition (Core Responsibility, Fix Round Class Sweep) for the ESM-interop
blocker this session found while executing H1's required verification — a gap exposed by the
verification instrument itself, not by the reviewer, and the same rule applies: the class the
instrument was sampling gets swept, not just the coordinate it hit.

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| **H1** — `ts-node` entry points lacking `tsconfig-paths/register` | `grep -c '"ts-node ' package.json` (entry-point count); `grep -n "from '~" lang/build.ts bot/scripts/publishAppCommands.ts src/scripts/backfillValid.ts` (alias imports per entry, direct) | Pre-fix: 3 entry points (`lang`, `push-commands`, `backfill-valid`), 0 registered `tsconfig-paths`; alias imports: `lang/build.ts` 0, `publishAppCommands.ts` 0, `backfillValid.ts` 3 (`~/server/api/utils/messageValidity`, `~/constants/messageLimits`, `~/utils/limits`). Post-fix: 3 entry points, all 3 registered (`grep -c "tsconfig-paths" package.json` → 4, one dependency line + 3 script flags). | All 3 scripts fixed identically (Preferred/structural, not just the affected one) — `lang` and `push-commands` had no alias imports to exercise today, but the fix makes the class unrepresentable for any of the three regardless of what they import in future. Re-run post-fix: 3/3 registered, 0 residual. |
| **H1-b (self-found during H1's verification)** — `ts-node` entry points whose reachable import graph crosses into `~/env.mjs` | `grep -rln "from '~/env.mjs'\|from '~/utils/getBaseUrl'" src/constants/*.ts` (direct env-dependent exports); manual trace of `backfillValid.ts`'s import graph before/after the split | Pre-fix: `~/constants/index.ts` imports `~/env.mjs` for `INVITE_URL` and `~/utils/getBaseUrl` for `LOGO_IMAGE_URL`/`INVITE_URL` — both reachable from `backfillValid.ts` transitively via `~/utils/limits` → `~/constants`. Post-fix: `src/constants/messageLimits.ts` (the 11 constants `limits.tsx`/`messageMode.ts`/`backfillValid.ts` actually need) imports neither. | `backfillValid.ts`'s reachable graph fixed (verified: `ECONNREFUSED`, not `ERR_REQUIRE_ESM`). **Residual, stated not hidden**: `~/constants/index.ts` itself (the barrel) still imports both, so a *future* `ts-node` script needing `INVITE_URL` or another env-derived export would still hit this — that population is real and unswept, because closing it generally is a larger, unscoped change (making `env.mjs` itself require-safe, or moving to dynamic `import()` throughout) that this milestone does not own. Named in the verification transcript (`probe-fix-round-h1-h2/README.md`) so it is not rediscovered as a surprise. |
| **M1** — `BackfillReport` categories lacking `rowIds` | `grep -n "count: number" src/scripts/backfillValid.ts` (pre-fix, categories with a bare count shape) | Pre-fix: 1 hit (`flagStructureDisagreement: { count: number }`); the other two categories (`whitespaceContent`, `evaluationFailures`) already carried `rowIds`. Post-fix: 0 hits — `Category` is one shape (`{ count, rowIds }`) used by all four fields, including the new `flagStructureDisagreementValidTrue`. | Fixed structurally: the type itself makes an id-less category unrepresentable, so no per-instance disposition is needed — re-run post-fix: 0/4 categories lack `rowIds`. |

**H2** has no enumeration predicate (it is a control-flow/persistence defect in two functions,
`main`/`runBackfill`, not a population of sites) and is closed with before/after execution evidence
instead: pre-fix, `process.exit(0)` truncated piped output above ~64KB (reviewer's measurement) and
a thrown error inside `runBackfill` discarded the whole report (no `.catch()`); post-fix, both
mechanisms are removed (`process.exitCode`, `try`/`catch` around `runBackfill` with the partial
report persisted and printed) and demonstrated live on the dead-DB drive (`interrupted: true`,
report present on disk before being deleted as test residue). See
`agent-output/verification/012/probe-fix-round-h1-h2/README.md` for the full transcript.

### Round 2 (H3, M1-r2), against code review `66ddcf6`

The reviewer's own H3 enumeration (`agent-output/verification/012/probe-cr2-h3-persist-ordering/README.md`)
is a manual control-flow walk of `main`'s 25-line body: **7 throw sites, 5 safe, 2 lossy** — both
lossy sites on the success path (`tableWideRowCount` unguarded; `persistReport` before
`process.stdout.write`). Re-run of the same walk against this round's `main`/`emit`:

| Finding | Enumeration | Full output | Disposition |
|---|---|---|---|
| **H3** — throw sites in `main` between the completion of `runBackfill` and the persistence of its evidence | Manual control-flow walk of `main`'s body (same method the reviewer used; `main` is now 12 lines after the extraction, fully visible) | Pre-fix: 2 lossy sites, both on the success path (as the reviewer found). Post-fix: **0** — both call sites (success and interrupted) now go through the single `emit()` function, which (a) guards `tableWideRowCount` with `.catch(() => -1)` unconditionally, (b) writes stdout before attempting `persistReport`, and (c) catches `persistReport`'s own throw internally so it cannot propagate past `emit`. `void main()` now carries `.catch()`, so no residual throw in `main` itself can surface as an unhandled rejection. | Structural (Preferred): the two-path asymmetry the reviewer named is unrepresentable now that there is only one path. Verified live twice — dead-DB drive (persisted+printed, `agent-output/verification/012/probe-fixround2-h3/README.md` Run 1) and a direct `emit()` call against an unwritable target (Run 2) — both matching the reviewer's own required verification shape. |
| **M1-r2** — gate evidence written to a constant filename, no provenance, no overwrite protection | `grep -c "REPORT_PATH" src/scripts/backfillValid.ts` (reviewer's own predicate; the constant no longer exists post-fix) | Pre-fix: 3 hits (1 definition, 2 call sites). Post-fix: **0** — `REPORT_PATH` removed; `reportPath(runId)` derives a per-run filename, and `persistReport` writes with `wx` (create-exclusive). | Minimum action taken: `persistReport` throws `EEXIST` on an existing target (TDD'd); every run gets its own filename via `runId`, so refusal protects a prior run's evidence rather than blocking the next legitimate run; the report body now carries `runId`/`startedAt`/`endedAt`. **Not done** (stated, not hidden): taking the destination out of source via argv/env override, and stamping database host identity — left as an on-next-touch note (`probe-fixround2-h3/README.md`), since the Preferred structural fix here is a larger, unscoped change for a strongly-recommended (non-blocking) item. |

**M2** (record-correction only, no enumeration — a claim in this document was wrong, not a code
defect) is closed by editing Outstanding Item 9 (below) to state the `handleModeSwitch` seam is
accepted at Minimum, matching its `upsertMessage` sibling, and by retitling
`012-message-mode.test.ts`'s `applyModeSwitch` describe block so it no longer claims wiring
coverage. **L4** (2 review-thread comment fragments in `012-backfill-report.test.ts`) — enumeration
`grep -rn "code-review\|reviewer\|M1's finding" src --include=*.test.ts` → pre-fix 2, post-fix
**0**; both deleted. **L6** (residual wording) — corrected in Outstanding Item 10 (below) and in
`probe-fix-round-h1-h2/README.md`'s appended correction note; the historical probe text above it is
left unedited as the record of what that drive actually said at the time.

### Round 3 (M4, M5, L7), against code review `8e87ddf` — M4's sequencing owner-directed

| Finding | Enumeration | Full output | Disposition |
|---|---|---|---|
| **M4** — production-database default with no guard of any kind | `grep -c "process\.argv\|NODE_ENV\|confirm\|dry\|readline\|prompt" src/scripts/backfillValid.ts` (reviewer's own predicate) | Pre-fix: **0** hits. Post-fix: **3** — the `assertConfirmedTarget` function name and body, all matched by the predicate's own `confirm` token. | Preferred/structural: `assertConfirmedTarget(resolveTargetHost(DATABASE_URL), BACKFILL_CONFIRM)` runs as `main`'s first statement, before `getPostgres()`, so no bare invocation against any host reaches a connection attempt. Verified live against the reviewer's exact measured production hazard (`viaduct.proxy.rlwy.net:12394`, the real `.env.local` value) — refused identically to a dead-host drive, zero connection attempts either way. `agent-output/verification/012/probe-fixround3-m4-and-m5/README.md`, Legs 1 and 3. |
| **L8** — report destination not overridable, 3/3 rounds contaminated the gate directory | `grep -rl "agent-output" src` (reviewer's own predicate) | Pre-fix: **1** file (`backfillValid.ts`, the hardcoded `DEFAULT_REPORT_DIR`/former `REPORT_DIR`). Post-fix: **1** file still — the hardcoded path remains as the *default*, which is correct (the owner-executed run still wants the gate directory by default); what changed is that `BACKFILL_REPORT_DIR` now overrides it. | Closed in the same M4 change, as the reviewer predicted. Verified live: a drive with the override set left nothing under `agent-output/verification/012/` — the first of four rounds' drives not to. `probe-fixround3-m4-and-m5/README.md`, Leg 2. |

**M5** (record correction only, no enumeration owed beyond the reviewer's own two predicates, already
re-run and matching — see below) is closed by editing the Files Created table's `messageMode.ts` and
`backfillValid.ts` rows to state the `handleModeSwitch` seam's correct disposition (accepted at
Minimum, not closed) and to list `emit`/`reportPath`/`resolveTargetHost`/`assertConfirmedTarget`
among the tested exports. Re-run of the reviewer's own predicates
(`"closing the M2 wiring seam|wiring seam.*clos|seam.*closed"` and `"handleModeSwitch"` across
`agent-output/*.md`) post-fix: the only remaining hits are the frozen changelog row (a record area,
correctly not rewritten — the reviewer's own stated exclusion), Outstanding Item 9's correction text
(a negation, not a claim), and the code-review document itself (not this stage's to edit). No live
stale "closed" claim remains.

**L7** (LOW, judged proportional to address given the file was already open this round, per the
reviewer's explicit hand-off of that judgement) — `formatReport`'s `meta` parameter widened from an
inline `{ tableWideRowCount: number, interrupted?: boolean }` to a named `interface ReportMeta`
declaring `runId?`/`startedAt?`/`endedAt?`, shared with `emit`'s `extra` parameter via
`Omit<ReportMeta, 'tableWideRowCount'>` rather than duplicated. **Disposition, stated plainly**: this
is the Preferred action's *declaration* half, not its *enforcement* half — the fields stay optional,
so a future refactor that stops passing `runId` would still not be a type error (only an *undeclared*
field vanishing silently would have been prevented if that were the only gap; declaring the field as
optional removes the "not declared at all" defect L7 named, but does not make omission a compile
error). Enforcement would require making the fields non-optional on `emit`'s boundary, which was not
done: `emit` is called from exactly one production site (`main`), which always supplies all three, so
there is no live gap today — the residual is a *future* one. Added the assertion the reviewer named
at Minimum (`formatReport` case asserting `runId`/`startedAt`/`endedAt` reach the parsed body) as a
regression guard, explicitly labelled in the TDD table as not a red/green case since the behaviour
already existed. On-next-touch note: promoting `emit`'s `extra` fields to required, the moment a
second call site with materially different provenance needs is introduced, would close the
enforcement gap fully.

### Round 4 (code-review-M6, L10), against code review `02125eb` — owner-directed: Minimum only

The reviewer's own M6 enumeration (`agent-output/verification/012/probe-cr4-guard-attack/`) put five
connection-string forms to both the guard's `URL` parser and the connecting `pg` `Client`: **2 of 5
diverge**, both via a `host=`/`port=` query override, demonstrated end-to-end (sweep case 11) with a
decoy authority host satisfying `BACKFILL_CONFIRM` while the process connected to `127.0.0.1:1`.

| Finding | Enumeration | Full output | Disposition |
|---|---|---|---|
| **code-review-M6** — guard/connector parser disagreement via a `host`/`port` query override | Manual re-derivation of the reviewer's own 5-form differential (loopback target, no production credentials touched); live reproduction of sweep case 11 | Pre-fix: the decoy-host attack (`DATABASE_URL` authority = `decoy.invalid:1`, `?host=127.0.0.1`, `BACKFILL_CONFIRM="decoy.invalid:1"`) proceeded past the guard. Post-fix: **refused**, before the guard's own `resolveTargetHost`/`assertConfirmedTarget` even run — `assertNoHostOverride` is `main`'s first statement now. | Minimum, as explicitly ruled by the owner (verbatim: "Close the hole first"; the Preferred — deriving the guarded host from `pg`'s own parser via `project-utils` — was on the ballot and declined, since it changes the pinned package and tangles with the refresh). Verified live against the reviewer's exact attack shape; re-verified a plain URL with no query string is not over-blocked. **Not closed by this fix, stated not hidden**: `pg`'s `PGHOST`-family environment fallbacks and `service=` file lookups, which the reviewer's own enumeration disclosed as untested and this Minimum (a query-parameter check) does not reach — routed with the Preferred action to the post-refresh review pass, as steering specified. |
| **L10** — guard sentinels (`(unset)`/`(unparseable)`) themselves confirmable | `grep -n "startsWith\|(unset)\|(unparseable)"` re-derivation of the reviewer's own 2-member sentinel enumeration; live reproduction of sweep cases 9/10's shape | Pre-fix: `BACKFILL_CONFIRM='(unset)'` satisfied `assertConfirmedTarget` when the host also resolved to `(unset)` (protected only incidentally by `project-utils`' downstream zod validation). Post-fix: **refused** — any confirmation value starting with `"("` is rejected before the host comparison runs. | Minimum, judged proportional (file already open, reviewer left the judgement to this stage). Not done: the reviewer's Preferred (a distinct, unconfirmable type for "undetermined" rather than a string comparison) — a larger refactor of `resolveTargetHost`'s return type for a LOW, non-blocking finding; left as on-next-touch if the sentinel set ever grows past its current two members, at which point a string-prefix check stops being self-evidently exhaustive. |

## Assumption Not Checked — closure (QA's handoff to the implementer)

QA's document names this session as the closure owner: the M6-b evaluation-failure category "must carry a count and the row ids, not a count alone." `src/scripts/backfillValid.ts`'s `accumulate` function implements this: `report.evaluationFailures` is `{ count: number; rowIds: string[] }`, populated whenever `classifyRow` catches a throw from `validateMessage` (tested: `012-backfill-classify.test.ts`, describe `classifyRow — evaluation failures`). **The category itself has not been measured against production** — no database was reachable in this environment, so the falsity signature QA named (a non-empty evaluation-failure category) remains unmeasured. The mechanism is built and tested; the measurement is the owner's, at backfill execution.

## Outstanding Items

1. **Push done; pin refresh explicitly deferred.** `project-utils`'s M1 commit (`749606d`) was owner-approved and pushed to `origin/chain/012-message-valid-field`. Per steering's sequencing call, `website`'s pin/lockfile refresh, the pinned-build proof (release condition 3), and `tsc` going green all wait for a clean code-review verdict — not attempted this round, on instruction, not because they could not be.
2. **Backfill not executed against production.** `src/scripts/backfillValid.ts` is written, its pure classification and reporting logic is unit-tested, and its DB-touching shell (`runBackfill`/`main`, persistence, interruption handling) was demonstrated live against a deliberately dead database during the fix round — but no production database was reachable in this environment, and execution is owner-executed per Assumption 4 regardless.
3. **L2 (code review, low) deferred by the reviewer's own disposition.** The two `as boolean` casts in the v1 endpoints are not load-bearing today (the typecheck is RED on those lines for the unrelated pin reason) and the reviewer's Required Action names removing them as part of the pin-refresh commit specifically — left in place this round.
4. **L3 (code review, low) reconciled here, not by rewriting history.** Commit `a7ebe4d`'s message states *"4/20 partition cells... currently fail"*; the file it commits has 36 tests, and the correct pre-M2 Red count is **5/36** (B3, B5, B7, the 5712 sentinel, and the M2-f "unsendable as stored" case) — matching this document's own TDD Compliance table, not the commit message. The commit message's counts are wrong; the spec file and the TDD table are the record to trust. Commit messages are immutable and are not rewritten.
5. **M6-a/b/c, and post-deploy observables R2–R7, are all unexecuted** — each requires either a live production database or the deployed composer/API, neither available here. All are registered in the QA document's BLOCKING RELEASE CONDITIONS register as post-deploy-observable or pre-release-pending-backfill rows; none is claimed complete by this document.
6. **M4-e (S4/S5 unchanged)** was verified by reading the diff, not by an executed test — no existing infrastructure in this repo drives `upsertMessage`'s Pusher/preview-image side effects without a live process, and adding one was judged out of proportion to a two-call-site, unchanged-payload property. Recorded as a self-diagnosed gap: the property is asserted by argument, not by an instrument that would fail if the argument were wrong.
7. **Foreign, shared-tree file observed, not touched**: `src/utils/__tests__/012-json-editor-repair-path.test.ts` appeared in the working tree during this session, untracked, authored by a concurrent session (not this one — never created or edited by this session). It failed briefly during this session's work (4/4 tests in that file), then passed on a later run — resolved by its own author, not by this session. Never committed by this session, never investigated beyond confirming it wasn't mine.
8. **A pre-existing foreign hunk was seen and excluded, not committed**: `src/providers/MessageProvider/useApiMethods.ts` showed as modified in the working tree at one point during this session (`git status`, before the M2–M6 commit). It was never part of this plan's Serialised Shared Files and was excluded from the commit's pathspec; by the time of the commit it no longer showed as modified (resolved by its own author).
9. **Method-level self-diagnosis, updated by the fix round, then corrected by code review round 2 (M2).** M4's original gap stands as recorded: `012-upsert-valid.test.ts` proves the compiled SQL shape and the computed `valid` value in isolation, but does not exercise `upsertMessage` end-to-end — the property is verified by construction (the extracted functions are the ones `upsertMessage` calls), not by an end-to-end instrument. The code review named this as its own finding (round 1 Medium: "two extraction seams... their wiring is asserted by reading") and the fix round split it in two, but overstated the `handleModeSwitch` half's disposition: round 2's M2 correctly found the new `applyModeSwitch` cases test the extracted function in isolation, not the wiring from `handleModeSwitch` to it — no test in this repo can, because `vitest.config.ts` is `environment: 'node'` with no component-testing-library dependency (M2's harness question is routed to the planner). **Corrected disposition**: both the `handleModeSwitch` half and the `upsertMessage` half are accepted at the reviewer's own Minimum — "accept as-is for this release on the strength of the registered post-deploy observables" (Validation 4(c)) — not closed. What round 2 *did* independently verify by execution is a narrower, honest claim: the `applyModeSwitch` extraction is behaviour-preserving relative to the pre-extraction inline dispatch (5,000-case differential with a live positive control, `agent-output/verification/012/probe-cr2-modeswitch-differential/`). That is a correctness claim about the extracted function, not a wiring-seam closure. If a future edit stops `handleModeSwitch` or `upsertMessage` from calling their extracted functions, or calls them with the wrong arguments, no suite in this repo would catch it; only a database-backed integration test (`upsertMessage`) or a component-rendering test (`handleModeSwitch`) would.
10. **ESM-interop residual, named in the fix round's class sweep, not closed — wording corrected by code review round 2 (L6).** `src/constants/index.ts` (the barrel) still imports `~/env.mjs` and `~/utils/getBaseUrl`. The residual was originally stated as scoped to *env-dependent* exports (`INVITE_URL`, `LOGO_IMAGE_URL`); round 2 correctly found that framing too narrow. The class is **any env-independent constant reachable only through the env-importing barrel**, not only the two genuinely env-coupled ones. Enumeration: `grep -c '^export' src/constants/index.ts` → 30 export lines (1 is `export * from './messageLimits'`); of the remaining 29, 2 are genuinely env/URL-coupled (`INVITE_URL`, `LOGO_IMAGE_URL`) and 1 is browser-coupled but node-safe (`IS_MOBILE`, guarded by `typeof window`) — **26 env-independent exports remain trapped** behind `~/env.mjs`, including `MAX_EMBED_AUTHOR_NAME_LENGTH` and `MAX_EMBED_FOOTER_TEXT_LENGTH`, whose 256-character-limit siblings did move to `messageLimits.ts`. The split line was drawn at "what `limits.tsx`/`messageMode.ts`/`backfillValid.ts` import today", not at "what is env-independent" — so any *future* `ts-node` script needing one of those 26 would hit the same `ERR_REQUIRE_ESM` this round found and closed for the 11 constants it did move. Closing the class generally (inverting the barrel so only `INVITE_URL`/`LOGO_IMAGE_URL` remain env-coupled, moving the other 26 beside `messageLimits.ts`) is a larger, unscoped change this milestone does not own — on-next-touch note for whichever chain next adds a `ts-node` script that needs one of the 26.

## Next Steps

1. **code-reviewer**, re-running against `681c353` per its own stated intent ("every enumeration above is re-run by me — including breaking the predicates, not merely re-executing them"). Reported to steering-hooks-012; awaiting the re-review verdict.
2. On a clean verdict: **the website pin/lockfile refresh** (release condition 3) — explicitly held this round on steering's sequencing instruction, not attempted.
3. **qa** (Phase 2, same session per the owner's ruling) to verify against this implementation, execute the mutation sweep, and — once the owner has pushed and provided database access — verify M1/M6's production-dependent properties. Carries two items from the code review: the Assumption Not Checked (red-before-green reconstruction for the 8 rows that landed inside a single commit) and confirmation that R6's instrument remains sound.
