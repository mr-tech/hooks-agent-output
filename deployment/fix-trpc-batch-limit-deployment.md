---
ID: n/a
Origin: fix-trpc-batch-limit
UUID: 61d9ad16
Status: Active
Status-Detail: "Phase 2A complete at website 76da25c (build, rollback check and dry run pass); awaiting the owner's release approval (Phase 2B). Nothing merged or pushed."
---

# Deployment — fix-trpc-batch-limit (website `master`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T00:31 | steering-roadmap-hooks (brief `steering/fix-trpc-batch-limit-brief-devops.md`; spawn cue from the code review's APPROVED at `f47e304`, record `7c91e51`) | Stage 1 and Phase 2A for `chain/fix-trpc-batch-limit` at `f47e304` | Packaging at `f47e304` FAILED: `next build` exit 1 (two test files under `src/pages/api/trpc/__tests__/` are compiled as API routes); `d1bb9b0` exit 0; the tip without those two files exit 0. Held; steering notified; record `1320e9b`. |
| 2026-11-21T00:41 | steering-roadmap-hooks (ruling block 2026-11-21T00:32Z, `c12a6c2`: move the tests to `src/server/api/__tests__/`); code-reviewer-fix-trpc-batch-limit (message; record `1dc6670`, Round 1 sub-entry 3) | Resume at website `76da25c` | Re-derived here, not taken from the reviewer: tip, diff, tree identity, packaging build at the tip (exit 0), rollback check (exit 0), dry run of the move (exit 0). Stage 1 step 8 done: implementation and code-review documents set `Committed` and moved to `closed/`. Phase 2A complete; the Phase 2B ask follows. Nothing pushed. |

## Plan Reference

No plan: a `fix-` chain (`ID: n/a`). Fixer document `implementation/closed/fix-trpc-batch-limit-implementation.md` (`Origin: fix-trpc-batch-limit`, UUID `61d9ad16`, `Handoff-At: 76da25c`). Scoping determination: `steering/fix-trpc-batch-limit-rulings.md`, block "2026-11-20T23:57Z", with blocks "2026-11-21T00:11Z" (premise correction), "2026-11-21T00:20Z" (CR-1 Minimum remedy) and "2026-11-21T00:32Z" (build break: tests moved). Source handoff the chain answers: `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`, items 1 to 3 (closing it is steering's, at the chain's closure; items 4 to 7 stay).

## Release Identifier

Website `master` at `76da25ccd8fbd063803d4896b9eda3c3759d7221` (no tag; the SHA on the serving ref is the identifier). Planned, until the move.

## Execution Mode

Mode A, agent-executed, in this session, on the owner's sanction put here (Phase 2B). The move is `release-move.js`.

## Release Summary

- **Type:** fix, production. **Environment:** hooks.gg through Vercel: a push to `master` deploys to production. No beta, no GitHub workflow (`release-move.js`: "workflows none — …/.github/workflows absent"); `vercel.json` carries a cron entry only. Not a self-hosted runner.
- **Epic:** none (the scoping determination names none).
- **What ships** (`git diff --numstat d1bb9b0 76da25c`, 7 files, +198 −62): `src/pages/api/trpc/[trpc].ts` +1 (`allowBatching: false`: a request naming more than one call is refused with 400 before any call runs); `src/middleware.ts` +1 −8 (the matcher gains bare `/message`, so the middleware sets `x-pathname` there too; the unread `x-query-params` write is removed); `package.json` −3 (the `overrides` key, which pnpm never read); new tests `src/server/api/__tests__/trpc.batch-refusal.test.ts` (+66) and `trpc.site-link.test.tsx` (+87) and `src/__tests__/middleware.request-headers.test.ts` (+43); `src/app/_components/__tests__/Providers.request-headers.test.ts` deleted (−51). `pnpm-lock.yaml` byte-identical to the base.

## Repositories and SHAs shipped

| Repository | Ref | From | To |
|---|---|---|---|
| website | `master` (origin) | `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96` | `76da25ccd8fbd063803d4896b9eda3c3759d7221` (three commits `3d2ceec`, `f47e304`, `76da25c`; a fast-forward) |

No other repository ships. The record repository is not a release.

## Serving Ref at Cutover

`master` is the one serving ref at origin (`release-move.js <website> --report`: "one serving ref at origin (master); no pair"). Other remote branches (`backup`, `external-message-api`, `redesign`, `regex-refactor`) are not serving refs.

## Pre-Release Verification

| Check | Result | Source |
|---|---|---|
| QA | Not in the stage set: 2 production lines added, under the 20-line threshold (rulings block 23:57Z) | rulings file |
| UAT | Not in the stage set | rulings file |
| Stage start | Code review `Verdict: APPROVED`, `Reviewed-At: 76da25c`, Round 1 sub-entry 3, record `1dc6670`. Fixer `Handoff-At: 76da25c`. Both equal the chain branch tip (`git rev-parse chain/fix-trpc-batch-limit` = `76da25ccd8fbd063803d4896b9eda3c3759d7221`) and the shared tree's `HEAD` | read 2026-11-21T00:40Z |
| Blocking-condition register | No QA document, so no register. The code review's one finding, CR-1, is `RESOLVED`; sub-entry 2's rejection at `f47e304` (the build break, raised by this record at `1320e9b`) is superseded by sub-entry 3; Required Actions: "None". Its Assumption Not Checked is carried below | code review read whole |
| **Release-Tip Verdict** | Code review at `76da25c`, which is the tip: nothing to assemble (`origin/master` `d1bb9b0` is an ancestor, `merge-base --is-ancestor` exit 0; the three commits are linear). Tree `7570463ce4f72aac935230472a5b0835b77c630a` (`git rev-parse 76da25c^{tree}`) is the tree reviewed, because the reviewed SHA is the shipped SHA. The review ran the suite (156 files, 2265 cases, exit 0), typecheck (exit 0), red on `d1bb9b0`'s production files (5 failed, 3 passed), mutants A, B and C, and `next build` with a positive control. This record re-ran the build itself (Packaging, below) | `code-review/closed/fix-trpc-batch-limit-code-review.md` |
| Diff since the previous record's state | `git diff --name-status f47e304 76da25c`: two renames of the tests, each changing only its handler import (+3 −3); `git diff --quiet f47e304 76da25c -- package.json pnpm-lock.yaml src/middleware.ts 'src/pages/api/trpc/[trpc].ts'` exit 0: no production file changed | read |
| Release consistency | No package `version` field. Cross-repo references: `project-utils` `github:hooks-gg/project-utils#master` pinned in the lockfile to `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f`, which project-utils' `git ls-remote origin master` returned at 2026-11-21T00:2xZ; `paracord` pinned to `3f203086ae38699f26dbee90dadbb395a96be227`. `pnpm-lock.yaml` is byte-identical at `76da25c` and `d1bb9b0` (`git diff --quiet`, exit 0), so neither pin moved | read |
| **Packaging integrity** | Isolated `git archive 76da25c` export, no `.env`: `pnpm install --frozen-lockfile` exit 0 under pnpm 10.28.2 (the `packageManager` pin); `SKIP_ENV_VALIDATION=1 pnpm run build` (`next build`, Next 16.4.6, Turbopack) **exit 0**, `/api/trpc/[trpc]` listed as the route and no test file listed as one. For the record, the same build at `f47e304` exited 1 and at `d1bb9b0` exited 0 (captures kept). The reviewer's positive control (a test copied back under `src/pages/api/`) exits 1, so the check can fail. The export was deleted | `verification/fix-trpc-batch-limit/devops/packaging-{install,build}-{76da25c,f47e304,d1bb9b0}.txt` |
| Package manager on the host | The lockfile is byte-identical and no dependency moved, so no install behaviour changes. Which pnpm major Vercel runs is not read; accepted as written, a named risk | `package.json` `packageManager` |
| Workspace cleanliness | Website: `git diff --quiet HEAD` exit 0 over tracked files; the one untracked path is `.playwright-mcp/`, another session's (`release-move.js`: "untracked 17 path(s) left alone"). It is the one exclusion predecessor verdicts declare; it affects no release mechanism, since the dry run passes. Record: this chain's own paths are committed at the record commit named in the changelog | `git status` |
| History | No rewrite: `76da25c` is three linear commits over `d1bb9b0`, reachable from `chain/fix-trpc-batch-limit`; the verified SHA is the shipped SHA | read |
| Serving refs on one line | `release-move.js --report`: one serving ref, no pair | 2026-11-21T00:2xZ |
| Dry run of the move | `release-move.js /usr/local/bin/hooks/website master 76da25ccd8fbd063803d4896b9eda3c3759d7221 --reason "…" --dry-run`: "ff-from-remote ok; sibling serving refs (none) on one line ok"; "DRY RUN: every check passed; nothing moved" (the `--reason` form, since no QA record exists: the code review at the tip is the verdict, named in the reason) | `verification/fix-trpc-batch-limit/devops/release-move-dry-run-76da25c.txt` |

### The build break found at this stage (kept for the retrospective)

At `f47e304` the two endpoint tests sat under `src/pages/api/trpc/__tests__/`, and `next build` compiled them as API routes and failed its type check (`ApiRouteConfig`: "Property 'default' is missing"). Class: a **test gap**. No suite cell runs `next build` over a test file under `src/pages/api/`, and neither vitest nor the two `tsc` programs read `.next/types/validator.ts`, which only `next build` writes. No plan criterion is involved (a `fix-` chain). The record already knew the behaviour (plan 017 X-13; `steering/017-rulings.md`, block 2026-11-18T23:24Z, by a webpack build in a scratch app); this run reproduced it under Next 16.4.6 and Turbopack. Resolved by ruling (a) (block 2026-11-21T00:32Z, `c12a6c2`) and the fixer's move at `76da25c`. Placement follows X-13 beside the existing `src/server/api/__tests__/interactions-edge.*` and `cron.*` tests.

## Operational text re-derived against the mechanism (before the first ref moves)

| Item | Statement | Mark |
|---|---|---|
| Deploy mechanism | A push to `master` on `origin` triggers Vercel's production deploy. No workflow files; `vercel.json` holds a cron entry only | **Accepted as written** (steering's brief, rulings block 23:57Z, and the repository's deploy practice; the Vercel project link is not read here). Named risk: which commit Vercel builds is the pushed one, by its default-ref behaviour |
| Rollback | `git diff d1bb9b0 76da25c > rollback-76da25c-to-d1bb9b0.patch` (12,018 bytes), then `git apply --check -R` against the shared tree (at `76da25c`): exit 0. The rollback itself is a new `master` commit and a production push, so it takes his word | **Re-derived**, instrument `git apply --check -R` (no tree write): `verification/fix-trpc-batch-limit/devops/rollback-76da25c-to-d1bb9b0.patch` |
| Ordering | One repository, one ref; the chain branch merges by fast-forward only; nothing consumes website's `master` as a pin | **Re-derived** (dry run: "ff-from-remote ok") |
| Serving refs | `master` only | **Re-derived** (`--report`) |
| Vercel request-size limits (brief hazard) | Not read. The change only reduces what the endpoint accepts | Not established; named hazard, no verification claimed |
| External callers of `/api/trpc` that batch (brief hazard) | None known; the public API is `/api/v1`. After release any such caller is refused with 400. Read from code, not run against production | Accepted as written; read after the push (runbook 6) |
| Matcher on bare `/message` (brief hazard) | Unexercised against production; exercised in the harness by the new middleware test only. Today's production behaviour is unchanged apart from the middleware running on bare `/message` (the one `x-pathname` reader, `Redirects/Server.tsx`, is not mounted: rulings block 00:11Z) | Accepted as written; named risk |

## Runbook (Mode A; results blank until run)

| # | Step | Abort criterion | Result |
|---|---|---|---|
| 1 | `git ls-remote origin refs/heads/master` | not `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96` → stop, the base moved | |
| 2 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 76da25ccd8fbd063803d4896b9eda3c3759d7221 --reason <text naming the code review record and its Reviewed-At> --dry-run` | exit ≠ 0 | |
| 3 | The same without `--dry-run` | exit ≠ 0 → stop and report, never retried in another form | |
| 4 | `git ls-remote origin refs/heads/master` | not `76da25cc…` | |
| 5 | Tree back on `master` (the tool's switch, over a tracked-clean tree only), then `git branch -d chain/fix-trpc-batch-limit` | dirty tracked tree → stop, route to the owner | |
| 6 | Read the production function logs (Vercel, read-only, `--scope hooks-gg`; counts, timestamps and the fixed message text only; no bodies, ids or tokens; bounds from `steering/017-rulings.md` block 2026-11-18T23:41Z) for 400s carrying "Batching is not enabled on the server" on `/api/trpc/*?batch=1` | a refused read is recorded, not re-issued | |

## Open disagreements with predecessor documents

None open. The one gap (no `next build` row in the review's first two rounds) was raised by this record at `1320e9b`, accepted by the reviewer in sub-entries 2 and 3, and closed. Counts agree between fixer and reviewer (156 files, 2265 cases, exit 0).

## Assumption Not Checked, by predecessor, that this release exercises

- **Code review (Round 1):** no caller outside the site's own client sends `batch=1` to `/api/trpc`. Falsity signature: after release, 400s with "Batching is not enabled on the server" on `/api/trpc/*?batch=1` in the production function logs. Owner: devops. Read = runbook step 6, after the push. It is a read of whether an external caller exists, never a confirmation of serving state (that is the push). A read taken soon after a deploy sees only that window's traffic, so its result is stated with its window and does not retire the assumption beyond it.
- **Fixer's document:** carries no such heading (`grep -n -i 'assumption not checked'`: 0 lines, per the brief).

## User Confirmation

To be put to the owner directly by this session (Phase 2B), after this record is committed.

## Release Execution

None yet. `origin/master` read `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96` at 2026-11-21T00:40Z (`git ls-remote origin refs/heads/master`).

## Post-Release Status

`Active`. Not released. Known issues: none known. Rollback Plan: above.

## Next Actions

The Phase 2B ask; then the runbook; then Phase 2D.
