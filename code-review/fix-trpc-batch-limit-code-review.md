---
ID: n/a
Origin: fix-trpc-batch-limit
UUID: 61d9ad16
Reviewed-At: "f47e304 — repos=website"
Status: In Review
Round: 1
Verdict: APPROVED
---

# Code Review: fix-trpc-batch-limit

**Plan Reference**: none (fixer chain). Scope statement: `steering/fix-trpc-batch-limit-rulings.md` block "2026-11-20T23:57Z", with the
premise correction in block "2026-11-21T00:11Z".
**Implementation Reference**: `agent-output/implementation/fix-trpc-batch-limit-implementation.md` (record `abdc57b`, `Handoff-At: 3d2ceec`)
**Date**: 2026-11-21
**Reviewer**: `code-reviewer-fix-trpc-batch-limit`

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T00:19 | steering-roadmap-hooks (brief); fixer-fix-trpc-batch-limit (document) | Round 1: review `3d2ceec`; QA Phase 2 is skipped (2 production lines), so also run the suite and the red tests | Round 1 REJECTED on CR-1 (MEDIUM, severity floor). The link production uses has no assertion that it does not batch; the test drives `proxy`, which has no production caller. Suite green, red reproduced, batch refusal attacked and holding. |
| 2026-11-21T00:28 | fixer-fix-trpc-batch-limit (re-handoff, record `eb4f0f6`); steering ruling `9c30cd1` | Round 1 sub-entry 1: confirm the CR-1 fix at `f47e304` (test-only) | APPROVED at `f47e304`. CR-1 RESOLVED: the site-link case was re-attacked with two mutants of the reviewer's own (both fail as assertions); enumeration re-run; suite 2265/2265, exit 0; red reproduced on the pre-fix production files. Handed to devops for website `master`. |

## Scope and identity

- **Tree under review**: website `3d2ceec` on `chain/fix-trpc-batch-limit`. Files were read via `git show 3d2ceec:` and run in detached
  exports. `rev-parse chain/fix-trpc-batch-limit` returned `3d2ceec3970…` at the start (00:11Z) and at the end (00:17Z).
- **Stage start**: the fixer's document at record `abdc57b`, `Handoff-At: 3d2ceec`. Brief: `steering/fix-trpc-batch-limit-brief-code-reviewer.md`.
- **Criteria assessed** (the scope statement at round open, block 23:57Z):
  1. A request naming more than one procedure call is refused before any call runs, at `[trpc].ts`, and the site's own three
     links keep working.
  2. The redirect decision in `Redirects/Server.tsx` no longer rests on a client-settable `x-pathname`, judged against block 00:11Z:
     `Server.tsx` is not mounted. Also, the dead `x-query-params` write is removed, with the test reads of it.
  3. The top-level `overrides` key is deleted.
- **Files reviewed** (`git diff --stat d1bb9b0 3d2ceec`, 6 files): `src/pages/api/trpc/[trpc].ts`, `src/middleware.ts`, `package.json`,
  `src/pages/api/trpc/__tests__/trpc.batch-refusal.test.ts` (new), `src/__tests__/middleware.request-headers.test.ts` (new), and
  `src/app/_components/__tests__/Providers.request-headers.test.ts` (deleted).
- **Captures**: `verification/fix-trpc-batch-limit/review/` (its README lists each file).
- **Gate satisfied (disclosed in the round)**: the stamp gate refused the first write of this document because its changelog stamp was typed ahead of the clock. The stamp is now taken through `record-edit.js` (its now-placeholder), which wrote `2026-11-21T00:19`.
- **Process slip (disclosed in the round)**: this session appended its `agent-output/INBOX.md` entry ("2026-11-21 —
  code-reviewer-fix-trpc-batch-limit — FYI", the check-repo failures in other documents) with a shell heredoc. The rule is the
  file-editing tools or `record-edit.js`. The entry's text is what was intended, and it is left uncommitted per the inbox rule.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md`. Its existence was checked with `ls` of
`/usr/local/bin/hooks/agent-output/architecture/` and is tracked at record HEAD.
**Alignment Status**: ALIGNED

The fix uses tRPC's own `allowBatching` option at the one entry point. It adds no parallel mechanism. The architecture record's
`middleware.ts` row (the matcher and the unread `x-query-params` write) is now stale. The fixer routed that to the architect as the
`agent-output/INBOX.md` entry "2026-11-21 — fixer-fix-trpc-batch-limit — FYI". The entry is present and uncommitted, as the inbox
rule requires.

## Execution evidence (brief: no QA Phase 2, so the reviewer runs these)

| Check | Result | Capture |
|---|---|---|
| Whole suite at `3d2ceec`, in an export with its own install | 155 files, 2265 cases, 2265 passed, process exit 0. Matches the fixer's `suite-3d2ceec` | `review/suite-3d2ceec.{json,exit}` |
| Red: the two new test files at `d1bb9b0` | 5 failed, 3 passed, exit 1, no unhandled errors. Batch: `expected 200 to be 400`, twice. `/message` and `/message?guild_id=123`: `x-pathname` `"/message/m/0/edit"` (the client's value). Query string: `x-query-params` present | `review/red-d1bb9b0.log` |
| `pnpm run typecheck` (both programs) at `3d2ceec` | exit 0, after the generated `next-env.d.ts` was supplied to the export (README) | `review/typecheck-3d2ceec.log` |
| `pnpm install --frozen-lockfile` at `3d2ceec` | exit 0. `pnpm-lock.yaml` is byte-identical to `d1bb9b0` (`git diff --quiet`, exit 0), so deleting `overrides` moved no resolution | README |
| `convention-check.js --since=d1bb9b0` | 0 FAIL, 0 CANDIDATE, 3 SKIP: `package.json` (.json), the deleted file (missing), and id-token/basename (the tool looks for `agent-output/TEST-CONVENTIONS.md`, and this workspace keeps its conventions in `agent-output/CLAUDE.md`). The skipped check was run by hand: both basenames match the positive form, the ID-token class has 0 hits, and there are 0 comment lines | `review/convention-check-3d2ceec.log`, `review/test-naming-by-hand.txt` |

## Adversarial execution — item 1 (a request-refusal gate)

The process whose output is the evidence: the real `[trpc]` handler (`createNextApiHandler`, `@trpc/server` 11.10.0) behind a Node
`http` server, driven by the reviewer's probe `review/batch-variants.probe.test.ts`. The request transcription is the fixer's
(Next pages router `req.query`). The probe itself is the reviewer's.

- **Mechanism, read in the installed dist** (`resolveResponse-BsnbAhRr.cjs`): a request is a batch only when
  `searchParams.get("batch") === "1"` (`jsonContentTypeHandler.parse`). The form-data and octet-stream handlers always return
  `isBatchCall: false` with one path. `resolveResponse` throws `BAD_REQUEST` "Batching is not enabled on the server" right after
  `getRequestInfo`. That is before `createContext`, before any input is parsed, and before any procedure runs.
- **Input class**: every request shape that could carry more than one call. That covers a comma path with `batch=1`, with `%2C`, with
  duplicated `batch` parameters (each order), with `batch=true`, with no `batch`, a batch of one, `trpc-accept: application/jsonl`,
  POST JSON with `batch=1`, POST octet-stream and POST form-data. The control is one plain call.
- **Oracle**: the response status, and the number of database queries the capturing database saw. A refused request must have 0
  queries.
- **Result at `3d2ceec`**: every `batch=1` shape (6) → 400 with 0 queries. Shapes without `batch=1` (5) → 404 with 0 queries,
  because the comma path is looked up as a single unknown procedure. The control → 200 with 2 queries. **At `d1bb9b0`** (positive
  control), the `batch=1` GET shapes → 200 with 2 or 4 queries each. The base has no other route to several calls per request, and
  neither does the fix. `review/batch-variants-{fix,base}.tsv`.
- Observation, not a finding: before the refusal, `getRequestInfo` still splits the path and looks up each named procedure in memory.
  That costs O(n) in the number of comma-separated names. Node's header limit bounds n at about 1,050 (security's measurement,
  `verification/018/security/out/requests-d1bb9b0.txt` §4). This is an unmeasured hypothesis about cost. The scope statement's
  property, "refused before any call runs", holds.

## Item 2 against the corrected premise

`src/app/_navigation/Redirects/index.tsx` at `3d2ceec` renders only `<Client />`; `{/* <Server /> */}` is commented out. In `src`,
`x-pathname` has one production reader (`Redirects/Server.tsx`, `(await headers()).get('x-pathname')`) and one writer
(`middleware.ts`). `x-query-params` has no reader outside the new test. The fix makes every path under `src/app/message/layout.tsx`
(`/message` and `/message/…`) get the middleware's own `x-pathname`. So the hole is closed for any future mount, and today's
production behaviour is unchanged apart from the middleware now running on bare `/message`. The new test's page-side helper
`headersReachingPage` transcribes Next's merge. I checked it against `next/dist/server/lib/router-utils/resolve-routes.js` (Next 16.4.6;
the `x-middleware-override-headers` block): truthiness, split on `,`, trim, headers not listed are deleted, values are read from
`x-middleware-request-<name>`. It matches, apart from one difference: the helper writes `''` where Next writes `undefined` for a null
value. No case reaches that path. The behaviours the change preserves (`/message/m/1/edit`, `/message/f/123`) are asserted, and the
fixer's control 2 shows those assertions can fail.

## TDD Compliance Check

**TDD Table Present**: No. The fixer's document form (`fixer.md`) carries no TDD Compliance table. Red and green are in its § Test,
and this round reproduced both (above).
**All Rows Complete**: n/a.
**Concerns**: Both new files are spec-form, which is correct: no escaped-defect artefact exists (axiom B). Expectations are
literals (axiom E). The invented values are named in the fixer's document (the auth session mock, `capturingDatabase`, the
pages-router `req.query` transcription, the Next header merge). Placement and naming conform. The coverage gap is CR-1.

## Findings

### Critical
None.

### High
None.

### Medium

CR-1 MEDIUM Round 1 RESOLVED — the Minimum remedy at `f47e304`: `trpc.site-link.test.tsx` mounts the real `TrpcProvider`, and the `proxy` case is removed. Steering kept the Preferred remedy out of scope (rulings block "2026-11-21T00:20Z", `9c30cd1`). Class gone: the enumeration re-run at `f47e304` gives the same 3 clients and 3 links, and the one production uses is now asserted. The check that fails if it returns is `website:src/pages/api/trpc/__tests__/trpc.site-link.test.tsx`, which fails under my mutants (`verification/fix-trpc-batch-limit/review/round1-sub1/`). Argument at record `6e9821b`.

### Round 1, sub-entry 1 — fix confirmation at `f47e304`

- **Scope**: `git diff --name-only 3d2ceec f47e304` lists two test files and nothing else. `trpc.batch-refusal.test.ts` loses the
  `proxy` case and its `PORT` stub (−11). `trpc.site-link.test.tsx` is new (+87). `package.json` and `pnpm-lock.yaml` are identical
  (`git diff --quiet`), and production lines are unchanged at 2. The diff is test-only, so this is a sub-entry, not a new round.
- **Re-attacked from first principles** (the fix is to a guard). The instrument is mine, not the fixer's diff: a fresh export at
  `f47e304` with its own install, and two mutations of `src/providers/TrpcProvider.tsx`. (A) The import is aliased
  `httpBatchLink as httpLink`. The case fails on an assertion, `expected true to be false` (the `batch` parameter is present), with
  tests running 1.08 s. (B) The link URL is `${url}x`, so the request never reaches the handler. It fails on an assertion,
  `expected '/api/trpcx/user.getPreferences?input=…' to match …`. Neither failed by runner timeout. Unmutated: 1 passed, exit 0.
  The request reaching the `[trpc]` handler through `api.user.getPreferences.useQuery()` inside `TrpcProvider` also confirms by
  execution what CR-1 stated by reading: the `api.*` hooks use `TrpcProvider`'s client.
- **Enumeration re-run** at `f47e304` (`client-links-f47e304.txt`): 6 hits, the 3 clients and 3 links of CR-1. `proxy` has 1 word
  hit outside tests, its definition. It is now unasserted and has no caller; it stays, per the ruling.
- **Case review**: it asserts on the request the server recorded (`res.on('finish')`), not on the hook's state, so react-query's
  retries cannot turn a failure into a timeout. Its expectations are literals. Its invented values are named in the fixer's document
  (the relative-URL `fetch` stub, the `~/utils/discord` mock). It mounts through the repository's `mountDom` helper. The basename
  matches the positive form, the ID-token class has 0 hits, and there are 0 comment lines (`test-naming-by-hand.txt`).
  `convention-check --since=3d2ceec`: 0 FAIL, 0 CANDIDATE, 2 SKIP (id-token and basename, run by hand as above).
- **Suite at `f47e304`**: 156 files, 2265 cases, 2265 passed, exit 0 (`suite-f47e304.{json,exit}`). `pnpm run typecheck`: exit 0.
- **Red against the pre-fix production files** (`d1bb9b0`'s `middleware.ts`, `[trpc].ts` and `package.json`, with the `f47e304`
  tests, in the export): 5 failed, 3 passed, exit 1. These are the same 5 failures as Round 1. The site-link case passes there, as
  it should, since the base link does not batch; its evidence is mutants A and B (`red-prefix-production.log`).
- Captures: `verification/fix-trpc-batch-limit/review/round1-sub1/`. The export was removed.

### Low/Info
None.

## Verdict

**Status**: APPROVED (at `f47e304`, Round 1 sub-entry 1). The Round 1 REJECTED verdict at `3d2ceec` is superseded.
**Rationale**: Items 2 and 3 are sound and verified by execution. Item 1's server change held under attack: every `batch=1` shape is
refused with 0 queries. The limb "the site's own links keep working" is now asserted on the link production uses, and the case was
seen to fail as an assertion under two mutations of that link (CR-1 RESOLVED). Suite green at `f47e304`, typecheck green, and the red
tests reproduce on the pre-fix production files. A change to any file under `src/` or to `package.json` after `f47e304` expires this
verdict.

## Required Actions

None. The dead `proxy` export and the unused `createTRPCNext` `config()` link stay, per steering's ruling (block "2026-11-21T00:20Z":
a candidate for a later hygiene pass, not carried by this chain).

## Assumption Not Checked

- Round 1: This review assumes no caller outside the site's own client (a script, an integration, a third-party tool) sends `batch=1`
  to `/api/trpc`, and it does not test this. **Falsity signature**: after release, 400 responses carrying "Batching is not enabled on
  the server" on `/api/trpc/*?batch=1` in the production function logs. **Owner**: devops. It closes under the release form "Vercel's
  production deployment of website `master`", by reading those logs after the deploy. Whether the push deploys is devops's to
  establish.

## Next Steps

- **Devops** for website `master`, at `f47e304`: the merge and the push, the push on the owner's word, asked in devops's own session.
  Also the Round 1 Assumption Not Checked above: read the production function logs after the deploy. No QA Phase 2 (2 production
  lines). Steering got the spawn cue, since no `devops-fix-trpc-batch-limit` session is live.
