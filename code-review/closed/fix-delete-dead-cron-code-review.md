---
ID: n/a
Origin: fix-delete-dead-cron
UUID: af508ebe
Reviewed-At: 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 — repos=website
Status: Released
Status-Detail: "Round 1 APPROVED at website 132a7ab; released to website master at that SHA (deployment/closed/fix-delete-dead-cron-deployment.md). The Assumption Not Checked on the dashboard cron list is carried by handoff/vercel-dashboard-cron-list-after-cron-removal-2026-11-21.md."
Round: 1
Verdict: APPROVED
---

# Code Review: fix-delete-dead-cron

**Plan Reference**: none (fixer chain). Scope: `steering/fix-delete-dead-cron-rulings.md`, block "2026-11-21T20:26 — scoping determination: fixer chain, website, one handoff"
**Implementation Reference**: `agent-output/implementation/fix-delete-dead-cron-implementation.md` at record `7c99ece6`, `Handoff-At` `132a7ab6f49d8a85ead507e2221ab3c3a531fd00`
**Date**: 2026-11-21
**Reviewer**: Code Reviewer (`code-reviewer-fix-delete-dead-cron`)

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T20:48 | steering-hooks (brief `steering/fix-delete-dead-cron-brief-code-reviewer.md`) | Round 1: review of website `0c14d5b..132a7ab` | Round 1: APPROVED at `132a7ab`. Hazards 1, 2 and 5 re-derived and hold. Suite 2358/2358, exit 0. Typecheck exit 0 in an export. The fixer's red check is 6/6 FAIL at base and 6/6 PASS at fix. Raw-socket attack, 63 requests per tree: 0 handler executions at fix, 27 at base (control). No findings. |
| 2026-11-21T20:54 | devops | Stage 1: Status Committed, document moved to closed/. Stage start for devops: this verdict at `Reviewed-At` 132a7ab (no QA, no UAT in the chain's stage set). |
| 2026-11-21T23:19 | devops | Phase 2D: Status Released at website `master` `132a7ab` (read back at origin 2026-11-21T23:19Z). Assumption Not Checked, part 1 (deploy host's pnpm major): closed in the deployment record, pnpm 10.28.2 from the production build log. Part 2 (no dashboard cron): carried by `handoff/vercel-dashboard-cron-list-after-cron-removal-2026-11-21.md`. |

## Stage start and criteria

The stage starts at the implementation document committed at record `7c99ece6`, with `Handoff-At` `132a7ab`. That matches the brief and
the website branch head. `git rev-parse HEAD` read `132a7ab6f49d8a85ead507e2221ab3c3a531fd00` at the start and at the end of the review,
with porcelain `?? .playwright-mcp/` only both times. Every file under review was read with `git show` or a `git archive` export. The
shared tree was not moved.

The criteria assessed this round are the four items of the scope statement, quoted from the block above at round open:
1. `src/pages/api/cron.ts` is deleted, and `/api/cron` then answers the site's ordinary not-found.
2. The `crons` entry leaves `vercel.json`, so Vercel schedules nothing.
3. `cron.scheduled-selection.test.ts` is deleted, and the suite and `pnpm run typecheck` exit 0.
4. `cron-parser` leaves `package.json` and `pnpm-lock.yaml`, and nothing else in the lockfile changes beyond its own subtree.

## Diff reviewed

`git diff --name-status 0c14d5b 132a7ab` shows M `package.json`, M `pnpm-lock.yaml`, D `src/pages/api/cron.ts`, D
`src/server/api/__tests__/cron.scheduled-selection.test.ts` and D `vercel.json`. `--numstat` shows 0 added lines in every file, and
deletions of 1, 17, 81, 55 and 8. This is exactly the write set, and it matches the implementation document's Change table.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md`. The file is present: `git -C
/usr/local/bin/hooks/agent-output ls-files architecture/system-architecture.md` lists it, and the Read tool opened it.
**Alignment Status**: ALIGNED

The change removes the mechanism named in its "Data flows" item 6 ("**Cron**: daily `/api/cron?key=vercel` per `vercel.json`."), and
that line goes stale at release. The determination puts that line out of this chain's scope: steering lodges it for the architect at
closure. It is not a finding here. No other architectural surface is touched. The `ScheduledMessages` left joins (`guild.ts`,
`shared.ts`) are unchanged, as the scope requires (`git grep -n -i -E "cron|luxon" 132a7ab -- . ':!pnpm-lock.yaml'` returns 10 hits,
all of them `ScheduledMessages.cron` reads, a type field, test fixtures or the CSS `acronym`).

## Hazards re-derived

1. **`vercel.json` deleted rather than left as `{}`.** `git show 0c14d5b:vercel.json` shows a single key, `crons`, holding one entry
   (`/api/cron?key=vercel`, `0 0 * * *`). Deleting the file and leaving `{}` carry the same configuration content from the repo. What
   the file's absence means to Vercel is a platform fact this box cannot read (see Assumption Not Checked). Deletion is the right call:
   it leaves no empty config to maintain, and nothing in the tree reads the file (`git grep -n vercel.json 132a7ab`, outside the
   lockfile: no hit). **Holds.**
2. **Lockfile confined to `cron-parser`'s subtree.** The diff has 5 hunks. They remove the importer entry, the `cron-parser@4.8.1`
   package and snapshot, and the `luxon@3.3.0` package and snapshot. `luxon` lines number 3 at base (`git show 0c14d5b:pnpm-lock.yaml
   | grep -c luxon`), all of them `luxon@3.3.0` or `cron-parser`'s dependency line, and 0 at fix. `pnpm install --frozen-lockfile
   --lockfile-only` under pnpm 10.28.2 (the `packageManager` pin) exits 0 in the fix export and leaves the lockfile byte-identical
   (`cmp`). Capture: `verification/fix-delete-dead-cron/code-review/frozen-lockfile-132a7ab.txt`. **Holds.**
3. **A cron in Vercel's dashboard.** Not readable from this box. It is devops's to establish (Assumption Not Checked).
4. **Unsent `ScheduledMessages` rows.** These are accepted by his selection A. The code paths reading them are unchanged (above).
5. **`makeRes` helper keeps its importers.** `git grep -l "helpers/apiResponse" 132a7ab -- src` finds 7 files. The helper stays, and
   the suite and typecheck pass. **Holds.**

## Adversarial execution (removal of a key-guarded public endpoint)

The change removes an authorization gate (the `key` check) together with the endpoint it guards, so the endpoint was attacked on
running instances of both trees.

- **Module-scope check.** The exports carried no `.env*` file (`ls -a | grep -c '^\.env'` returned 0 for each), and the shell had no
  `DATABASE_URL`, `PUSHER*` or `NEXTAUTH*` variable (count 0). So no database, Pusher or Discord path was live-capable. The servers ran
  with `SKIP_ENV_VALIDATION=1` (`src/env.mjs`), and `src/middleware.ts`'s matcher does not cover `/api/*` except `/api/guilds/(.*)`.
  The base handler calls `getApi()` before its key check, and with no token that call throws `client requires a bot token`, which
  makes it a usable oracle.
- **Instance.** `next dev --webpack` ran on `git archive` exports of each tree in the scratchpad, on ports 3917 (fix) and 3918 (base).
  Turbopack refused the exports' `node_modules` symlink, which lies outside its root. A first probe run against the Turbopack servers
  answered 500 on every path and was discarded as non-discriminating. The base export was given a `node_modules` view of the shared
  tree's entries plus `cron-parser` from `.pnpm/cron-parser@4.8.1`, so its route compiles.
- **Input class.** `/api/cron` was sent under 18 request-target forms × 3 methods (GET, POST, HEAD) over a raw TCP socket. The forms
  were: bare, with right, wrong and duplicate `key`, trailing slash, upper and mixed case, percent-encoded `c`, encoded slash, dot
  segments, double leading slash, `.ts`/`.js`/`/index` suffixes, `;` path parameter, and absolute-form target. A 308 was followed once,
  raw, to its `Location`. Instrument: `verification/fix-delete-dead-cron/code-review/raw-probe.py`.
- **Oracle.** NOT_FOUND means a 404 with Next's HTML not-found body. HANDLER means a 404 with an empty body (the handler's own refusal)
  or any other status. A second, side-effect oracle counts the server-log lines `client requires a bot token`, one per handler
  execution.
- **Result.** Fix: 63 rows, with 0 HANDLER, 51 NOT_FOUND and 12 REDIRECT. Every redirect is Next's trailing-slash or double-slash
  normalisation to `/api/cron[?key=vercel]`, and each followed redirect lands NOT_FOUND. Log oracle: 0 lines before and 0 after. Base
  (positive control): 27 HANDLER, and the log went from 1 line to 28 (27 executions). The case variants, encoded forms and suffixes
  are NOT_FOUND at base as well, so the canonical and normalised forms are the ones that reach the handler. Captures: `probe-base-0c14d5b.tsv`,
  `probe-fix-132a7ab.tsv`, `probe-summary.txt`. Scope item 1 is met under this instrument for a dev server. Production routing is the
  release form's (Next Steps).

## TDD Compliance Check

**TDD Table Present**: No table by that name. The fixer route uses a single red/green check, recorded under "Test".
**All Rows Complete**: n/a
**Concerns**: None. The change removes a surface and adds no behaviour. A suite test asserting a file's absence would be a source-text
assertion, which Test Conventions bars, so the evidence is the record-side check `verification/fix-delete-dead-cron/check-cron-removed.js`.
I re-ran it: at `0c14d5b`, 6/6 limbs FAIL and exit 1 (`code-review/check-at-0c14d5b.txt`); at `132a7ab`, 6/6 PASS and exit 0
(`code-review/check-at-132a7ab.txt`). Each limb fails on its own at base. Its route limb's pattern does not match every routable form
(for example `src/pages/api/cron/[x].ts`). That gap is closed independently: `git ls-tree -r --name-only 132a7ab -- src/pages
src/app`, filtered to `api` or a catch-all, lists 7 routes, none under `cron`, and the raw attack above observes the not-found. The
deleted test is dispositioned as "Superseded implementation", and no covering test is owed for a removed surface. No test was added,
so there is no test authorship to check.

## Suite, typecheck and conventions

| Check | Where | Result |
|---|---|---|
| Suite | `git archive` export of `132a7ab`, `systemd-run --user --scope -p MemoryMax=8G npx vitest run --reporter=json` | 2358/2358 passed, 165 files, **process exit 0** (`code-review/suite-132a7ab.json`, `suite-132a7ab-exit.txt`) |
| Suite membership vs the fixer's base run | file paths made repo-relative and compared as sets | base 166, fix 165; only at base: `src/server/api/__tests__/cron.scheduled-selection.test.ts`; only at fix: nothing (`suite-membership-diff.txt`) |
| Typecheck | same export, `npx next typegen` (exit 0), then `pnpm run typecheck` (both tsc programs) | **exit 0** (`typecheck-132a7ab.txt`) |
| Convention check | `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website --since=0c14d5b` | exit 0: 0 FAIL, 0 CANDIDATE, 23 SKIP (`convention-check.txt`). The SKIPs are the deleted paths, `package.json`/`pnpm-lock.yaml` (extensions outside the set), the untracked `.playwright-mcp/*.png`, and the id-token/basename check, which did not run because the checker does not implement the record's class verbatim. This change adds no comment, no test and no basename, so none of those checks has anything to examine. |

The shared tree's `pnpm run typecheck` fails on a stale, gitignored `.next/types/validator.ts`, as the fixer recorded. That file is
local build state from an earlier build, not tree content. A fresh build or typegen regenerates it, and Vercel builds from a clean
checkout. It is not a finding on `132a7ab`.

## Findings

### Critical
None

### High
None

### Medium
None

### Low/Info
None

## Verdict

**Status**: APPROVED
**Rationale**: The diff is exactly the bounded write set and deletes 162 lines while adding none. All four scope items are verified
by instruments that ran this round. The removed endpoint is unreachable under every request form attacked, and the base control proves
the oracle discriminates. The suite and typecheck exit 0, and the lockfile change is confined to `cron-parser` and its only dependent,
`luxon`. Plan revision: none (fixer chain). Steering's determination block is the scope read.

## Required Actions

None.

## Assumption Not Checked

Round 1: This review assumes that the Vercel production deployment of `master` at this tree schedules no cron, meaning that Vercel
treats an absent `vercel.json` as no cron configuration and that the project has no cron configured in its dashboard, and does not
test it. If it is false, the project's Cron Jobs list still shows a job after the deploy, or the runtime logs show a daily
`GET /api/cron` (answered 404) near 00:00 UTC. Owner: devops, from the deployment's build output and the Vercel CLI reads his
selection allows; the dashboard cron list is the owner's read, under the release form of a Vercel production deployment of website
`master`.

## Next Steps

Approved. The spawn cue goes to `steering-hooks`, which starts devops for website `master`. Devops owns the Assumption Not Checked
above: confirm from the deployment that no cron is carried, and route the dashboard cron-list read to the owner. Devops also confirms
the deploy host's pnpm major from the build log (fixer's hand-off). No QA Phase 2 (0 production lines added).
