---
ID: n/a
Origin: fix-trpc-batch-limit
UUID: 61d9ad16
Status: Active
Status-Detail: "Held at Phase 2A step 5 (packaging): `next build` fails at the tip f47e304 and passes at the base d1bb9b0. Nothing merged, pushed or closed. Returns to the fixer through steering; no release ask is put to the owner until a passing tip exists."
---

# Deployment — fix-trpc-batch-limit (website `master`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T00:31 | steering-roadmap-hooks (brief `steering/fix-trpc-batch-limit-brief-devops.md`; spawn cue from the code review's APPROVED at `f47e304`, record `7c91e51`) | Stage 1 and Phase 2A for `chain/fix-trpc-batch-limit` at `f47e304` | Brief, its common part, the rulings file, the fixer's document and the code review read whole. Packaging at the tip FAILS: `pnpm run build` exit 1 in an isolated export of `f47e304`; the same build at `d1bb9b0` exits 0; the tip without its two new `src/pages/api/trpc/__tests__/` files exits 0. Held. Stage 1 step 8 (closing the chain's documents) is not done: the defect returns to the fixer, so those documents stay open. Dry run of the move passed (`release-move.js … --dry-run`), nothing moved. |

## Plan Reference

No plan: a `fix-` chain (`ID: n/a`). Fixer document `implementation/fix-trpc-batch-limit-implementation.md` (`Origin: fix-trpc-batch-limit`, UUID `61d9ad16`, `Handoff-At: f47e304`). Scoping determination: `steering/fix-trpc-batch-limit-rulings.md`, block "2026-11-20T23:57Z", with blocks "2026-11-21T00:11Z" (premise correction) and "2026-11-21T00:20Z" (CR-1 Minimum remedy). Source handoff the chain answers: `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`, items 1 to 3 (closing it is steering's, at the chain's closure).

## Release Identifier

Not assigned. Planned: website `master` at the SHA of the passing tip (the SHA on the serving ref is the identifier; no tag).

## Execution Mode

Mode A (agent-executed, in this session) planned: the move is `release-move.js`, on the owner's release approval put here (Phase 2B). Not reached.

## Release Summary

- **Type:** fix, production. **Environment:** hooks.gg through Vercel: a push to `master` deploys to production. No beta, no GitHub workflow (`release-move.js` dry run: "workflows none — …/.github/workflows absent"); `vercel.json` carries a cron entry only. Not self-hosted-runner.
- **Epic:** none (the scoping determination names none).
- **What the tip ships** (`git diff --numstat d1bb9b0 f47e304`, 7 files, +198 −62): `src/pages/api/trpc/[trpc].ts` +1 (`allowBatching: false`); `src/middleware.ts` +1 −8 (matcher gains `/message`; the `x-query-params` write removed); `package.json` −3 (the `overrides` key); two new test files under `src/pages/api/trpc/__tests__/` (+66, +87), one new under `src/__tests__/` (+43); `Providers.request-headers.test.ts` deleted (−51). `pnpm-lock.yaml` byte-identical to the base.

## Repositories and SHAs shipped (planned)

| Repository | Ref | From | To |
|---|---|---|---|
| website | `master` (origin) | `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96` | the passing tip; currently `f47e304ca36efbba081456bc3e8200f97109fabe` is NOT releasable (below) |

## Serving Ref at Cutover

`master` is the one serving ref at origin (`release-move.js <website> --report`: "one serving ref at origin (master); no pair"). Other remote branches are not serving refs.

## Pre-Release Verification

| Check | Result | Source |
|---|---|---|
| QA | Not in the stage set: 2 production lines added, under the 20-line threshold (rulings block 23:57Z) | rulings file |
| UAT | Not in the stage set | rulings file |
| Stage start | Code review `Verdict: APPROVED`, `Reviewed-At: f47e304`, Round 1 sub-entry 1, record `7c91e51`. Fixer `Handoff-At: f47e304`. Both equal the chain branch tip (`git rev-parse chain/fix-trpc-batch-limit` = `f47e304ca36efbba081456bc3e8200f97109fabe`, tree `65ec5e294838ed01cad755202355094116c55b99`) and the shared tree's `HEAD`; one commit pair over `origin/master` `d1bb9b0` (`merge-base --is-ancestor d1bb9b0 f47e304` exit 0), so the tip is that tree and there is nothing to assemble | read 2026-11-21T00:30Z |
| Blocking-condition register | No QA document, so no register. The code review's one finding, CR-1, is `RESOLVED`; its Required Actions are "None". Its Assumption Not Checked is carried below | code review read whole |
| Release-tip verdict | Code review at `f47e304`, which is the tip (tree identity above). It covers suite, typecheck, red and mutants. It does NOT cover `next build` (see Packaging) | `code-review/fix-trpc-batch-limit-code-review.md` |
| Release consistency | No package `version` field. Cross-repo references: `project-utils` `github:hooks-gg/project-utils#master` pinned in the lockfile to `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f`, which `git ls-remote origin master` in project-utils returns today; `paracord` pinned to `3f203086…`. `git diff --quiet d1bb9b0 f47e304 -- pnpm-lock.yaml` exit 0: the diff touches neither pin. Consistent | read 2026-11-21T00:2xZ |
| **Packaging integrity** | **FAIL at `f47e304`.** Isolated `git archive` exports, no `.env`, `pnpm install --frozen-lockfile` exit 0 under pnpm 10.28.2 (the `packageManager` pin) in each; `SKIP_ENV_VALIDATION=1 pnpm run build` (`next build`, Next 16.4.6, Turbopack): **`f47e304` exit 1**, **`d1bb9b0` exit 0**, **`f47e304` with the two `src/pages/api/trpc/__tests__/` files deleted exit 0**. The tip's failure is in Next's type check of `.next/types/validator.ts`, after "Compiled successfully": `trpc.batch-refusal.test` and `trpc.site-link.test` "does not satisfy the constraint 'ApiRouteConfig'. Property 'default' is missing". Next treats every file under `src/pages/api/` as an API route, and a test file has no default export. At the base `src/pages/api` holds no `__tests__` directory (`git ls-tree -r d1bb9b0 -- src/pages/api`: 8 route files). Vercel runs `next build` on the pushed commit, so this would fail the production build | `verification/fix-trpc-batch-limit/devops/packaging-{install,build}-*.txt` |
| Package manager on the host | The lockfile is byte-identical and no dependency moved, so no install behaviour changes. Which pnpm major Vercel runs is not read; accepted as written, a named risk | `package.json` `packageManager` |
| Workspace cleanliness | Website: `git status --porcelain --untracked-files=no` prints nothing; the one untracked path is `.playwright-mcp/`, another session's (`release-move.js`: "untracked 17 path(s) left alone"). The one exclusion predecessor verdicts declare is that untracked path; it affects no release mechanism, since the dry run passes. Record: this chain's own paths are committed apart from this document and `verification/fix-trpc-batch-limit/devops/` | `git status` |
| History | No rewrite. `f47e304` is reachable from `chain/fix-trpc-batch-limit` | read |
| Serving refs on one line | `release-move.js --report`: one serving ref, no pair | 2026-11-21T00:2xZ |
| Dry run of the move | `release-move.js /usr/local/bin/hooks/website master f47e304… --reason "…" --dry-run`: "ff-from-remote ok; sibling serving refs (none) on one line ok"; "DRY RUN: every check passed; nothing moved". The tool does not run a build, so it does not see the failure above | run 2026-11-21T00:2xZ |

### The finding, for the fixer and for the retrospective

- **What fails:** the two new test files under `src/pages/api/trpc/__tests__/` (`trpc.batch-refusal.test.ts`, `trpc.site-link.test.tsx`). The location is the Test Conventions' "beside the code they cover, under `__tests__/`", applied to a pages-router API directory.
- **Class:** a test gap. No suite cell runs `next build` over a test file placed under `src/pages/api/`: the vitest suite and both `tsc` programs (`pnpm run typecheck`) never read `.next/types/validator.ts`, which only `next build` generates. The code review's "typecheck exit 0" and "suite green" are true and do not cover it. No plan criterion is involved (a `fix-` chain); the scope statement's write set names `src/pages/api/trpc/__tests__/` files by implication.
- **Known to the record before this chain:** 017's rulings, block "2026-11-18T23:24Z": a helper found, by a webpack build in a scratch app, that Next builds a test file under `src/pages/api/` as an API route (X-13), and 017's block records the CLAUDE.md placement exception as the record owner's to process (`INBOX.md`, "2026-11-18 — planner-hooks-017 — DECISION NEEDED"). This run reproduces it under Next 16.4.6 and Turbopack, by execution.
- **Routes out, not chosen here** (devops writes no code and does not widen a write set): (a) move the two files to a directory `next build` does not read as routes, for example beside the router tests in `src/server/api/routers/__tests__/` (the handler is imported by path, so the cases need no co-location); (b) `pageExtensions` or an equivalent in `next.config.js`, which is outside the chain's write set; (c) a record placement exception in `agent-output/CLAUDE.md`. (a) is the smallest and stays inside the write set's own words ("their `__tests__/` files"), but it is steering's to rule, and the Test Conventions' placement line is the record owner's.
- **What a re-handoff owes:** a tip whose `pnpm run build` (`SKIP_ENV_VALIDATION=1` in an export) exits 0, with the suite and `pnpm run typecheck` still green and the code review's confirmation of the moved files. If the production lines and `package.json` stay as they are, the review's verdict stands for them by its own words ("a change to any file under `src/` or to `package.json` after `f47e304` expires this verdict": a test move is a change under `src/`, so the reviewer confirms it).

## Operational text re-derived against the mechanism (before the first ref moves)

| Item | Statement | Mark |
|---|---|---|
| Deploy mechanism | A push to `master` on `origin` triggers Vercel's production deploy. No workflow files in the repository; `vercel.json` holds a cron entry only | **Accepted as written** (steering's brief, rulings block 23:57Z, and the repository's deploy practice; the Vercel project link is not read here). Named risk: which commit Vercel builds is the pushed one, by its default-ref behaviour |
| Rollback | `git diff d1bb9b0 f47e304 > rollback-f47e304-to-d1bb9b0.patch` (12,000 bytes, `verification/fix-trpc-batch-limit/devops/`), then `git apply --check -R` against the shared tree (which is at `f47e304`): exit 0. The rollback itself is a new `master` commit and a production push, so it takes his word. To be re-derived against the final tip | **Re-derived**, instrument `git apply --check -R` (no tree write); stale once the tip moves |
| Ordering | One repository, one ref; the chain branch merges by fast-forward only; nothing consumes website's `master` as a pin | **Re-derived** (dry run: "ff-from-remote ok") |
| Serving refs | `master` only | **Re-derived** (`--report`) |
| Vercel request-size limits (brief hazard) | Not read. The change only reduces what the endpoint accepts | Not established; named hazard, no verification claimed |
| External callers of `/api/trpc` that batch (brief hazard) | None known; the public API is `/api/v1`. Read from code (`allowBatching: false`, one site link asserted), not run against production | Accepted as written |
| Matcher on bare `/message` (brief hazard) | Unexercised against production. The tip's middleware test exercises it in the harness only | Accepted as written; named risk |

## Runbook (Mode A; planned; results blank; not executable until a passing tip exists)

| # | Step | Abort criterion | Result |
|---|---|---|---|
| 0 | In an export of the new tip: `pnpm install --frozen-lockfile`, then `SKIP_ENV_VALIDATION=1 pnpm run build` | exit ≠ 0 → stop, back to the fixer | |
| 1 | `git ls-remote origin refs/heads/master` | not `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96` → stop, the base moved | |
| 2 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master <tip> --reason <text naming the code review record and its Reviewed-At> --dry-run` | exit ≠ 0 | |
| 3 | The same without `--dry-run`, after the owner's release approval | exit ≠ 0 → stop and report, never retried in another form | |
| 4 | `git ls-remote origin refs/heads/master` | not the tip | |
| 5 | Tree back on `master` (over a tracked-clean tree only), then `git branch -d chain/fix-trpc-batch-limit` | dirty tracked tree → stop, route to the owner | |
| 6 | Read the production function logs (Vercel, read-only, `--scope hooks-gg`; counts, timestamps and the fixed message text only) for 400s carrying "Batching is not enabled on the server" on `/api/trpc/*?batch=1` — the code review's Assumption Not Checked | a refused read is recorded, not re-issued | |

## Open disagreements with predecessor documents

- **Code review vs this record:** the review's evidence table has no `next build` row, and its verdict ("APPROVED at `f47e304`") stands on suite, typecheck, red and mutants. This record's packaging read contradicts nothing it states; it adds a check the review did not run. The fixer's document likewise carries no build row. No predecessor figure is disputed (cases 2265, exit 0 agree between fixer and reviewer).
- No qualifier declined, no field stale otherwise.

## Assumption Not Checked, by predecessor, that this release exercises

- **Code review (Round 1):** no caller outside the site's own client sends `batch=1` to `/api/trpc`. Falsity signature: after release, 400s with "Batching is not enabled on the server" on `/api/trpc/*?batch=1` in the production function logs. Owner: devops. Read = runbook step 6, after the push; read-only Vercel reads are a standing default (`steering/017-rulings.md`, blocks 2026-11-18T23:15Z and 23:41Z, bounds in 23:41Z). A read taken minutes after a deploy sees minutes of traffic, so its result is stated with its window and does not retire the assumption beyond that window.
- **Fixer's document:** carries no such heading (`grep -c -i 'assumption not checked'` over it: 0, per the brief).

## User Confirmation

Not asked. No release ask is put while the tip fails to build.

## Release Execution

None. Nothing merged, nothing pushed. `origin/master` read `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96` at 2026-11-21T00:31Z (`git ls-remote origin refs/heads/master`).

## Post-Release Status

`Active`, held. Not released. Known issues: the packaging failure above. Rollback plan: above (applies only after a release).

## Next Actions

1. Fixer (`fixer-fix-trpc-batch-limit`), through steering: a tip whose `next build` passes; steering rules the route (a), (b) or (c) above.
2. Code reviewer: confirm the moved or changed files at the new tip.
3. Devops (this session): re-run packaging on the new tip, re-derive the rollback, then Stage 1 step 8 and Phase 2B.
