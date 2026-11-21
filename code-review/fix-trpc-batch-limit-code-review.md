---
ID: n/a
Origin: fix-trpc-batch-limit
UUID: 61d9ad16
Reviewed-At: "3d2ceec — repos=website"
Status: In Review
Round: 1
Verdict: REJECTED
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
- **Gate satisfied (disclosed in the round)**: the stamp gate refused the first write of this document because its changelog stamp was typed ahead of the clock. The stamp is now taken through `record-edit.js` `2026-11-21T00:19`.

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

CR-1 MEDIUM Round 1
**Test coverage**: The rule that no site link batches is asserted only on `proxy`, which no production code calls. The link
production uses has no assertion.
- **Location**: `src/pages/api/trpc/__tests__/trpc.batch-refusal.test.ts`, describe "the tRPC endpoint given the site's own link" →
  `it('answers a single call')`, at `3d2ceec`. The live link is `src/providers/TrpcProvider.tsx` `TrpcProvider` (`trpc.createClient({ links: [httpLink(…)] })`).
- **Class**: The change relies on "no site tRPC client sends `batch=1`", and that reliance has no assertion that fails when a client
  production uses starts to batch.
- **Enumeration**: `git grep -nE 'httpLink\(|httpBatchLink|httpBatchStreamLink|splitLink|createTRPCProxyClient<|createTRPCReact<|createTRPCNext<|api/trpc' 3d2ceec -- src public ':!**/__tests__/**'`
  gives 12 hits: 3 link constructions, 3 client constructions, `url`, and 5 imports of `~/server/api/trpc` (noise). The three clients:
  (a) `api.ts` `proxy` (`createTRPCProxyClient`). It has no production caller: `git grep -cw proxy 3d2ceec -- src ':!**/__tests__/**'`
  gives 1, its own definition. (b) `api.ts` `api` (`createTRPCNext`). Its `config().links` reach the wire only through `withTRPC`, which
  has 0 calls in `src`. Its hooks (9 importers of `{ api }`) resolve their client from the shared `TRPCContext`. I read this in
  `@trpc/next` 11.10.0 `dist/index.cjs` (`createRootHooks(opts)`) and `@trpc/react-query` `shared-*.cjs` (`config?.context ??
  TRPCContext`), and both packages resolve the same `@trpc/react-query/shared` instance. This is by reading, not execution.
  (c) `TrpcProvider`, mounted by `Providers.tsx`. It supplies that context, so it is the link production uses. Only (a) is driven by
  the test, and the fixer's control 1 mutated only (a). Blind spot of the predicate: a client built outside `src`/`public`, a
  hand-written `fetch` to a variable URL with `batch=1`, and an external caller. None of those can be seen by a text search.
- **Issue**: The fix couples the server's `allowBatching: false` to the client's choice of link. Switching `TrpcProvider` to
  `httpBatchLink` or `httpBatchStreamLink`, a one-word edit and the stock tRPC template, would make every `api.*` query and mutation
  on the site answer 400 in production, and the suite would stay green. The test title "the site's own link" claims coverage the
  test does not give. A behaviour the change relies on, with no assertion that fails when it is lost, is MEDIUM at least and blocks the
  hand-off (severity floor).
- **Required Action**: eliminate the class, meaning every site client production uses carries an assertion that fails when it batches.
  - **Preferred (structural)**: one site-link factory in `src/utils/api.ts` (e.g. `siteLinks()`), used by `TrpcProvider`, with the
    dead `proxy` and the unused `config()` link deleted. The test then drives that factory, so a batching link cannot be added in one
    place and missed by the test. Callers under each form: `TrpcProvider` changes to call the factory. The 9 `api` importers do not
    change. `proxy` has 0 callers, so deleting it moves nothing. **Cost**: `src/utils/api.ts` and `src/providers/TrpcProvider.tsx` are
    outside this chain's write set. That is steering's ruling (put to it in this round), not the fixer's to take.
  - **Minimum (inside the write set)**: replace or extend `answers a single call` with a `.tsx` case beside it, under
    `src/pages/api/trpc/__tests__/`. The case mounts the real `TrpcProvider` (`createRoot` + `act`, per Test Conventions § DOM
    component tests) around a component that calls an `api.*` hook, against the same socket harness. The assertion is made on the
    harness's record of the request the provider sent: its status is 200 and it carries no `batch=1`. It is not made on the hook's
    eventual state. **Falsity signature**: with `TrpcProvider`'s link switched to `httpBatchLink` in an export, the case fails on an
    assertion (`expected 400 to be 200`, or a recorded `batch=1`) within the default test timeout. It must not fail as a runner
    timeout. The `QueryClient` inside `TrpcProvider` retries a failed query three times with backoff (react-query default), so an
    assertion that waits for the hook to settle would time out instead of failing. Record that mutation as the case's control, as
    the fixer did for `proxy`. If `proxy` is kept, keep or drop its case on its own merits, and retitle it so it no longer claims to
    be "the site's own link".

### Low/Info
None.

## Verdict

**Status**: REJECTED
**Rationale**: Items 2 and 3 are sound and verified by execution. Item 1's server change is correct and held under attack: every
`batch=1` shape is refused with 0 queries. But the scope statement's other limb, "the site's own three links keep working", is
asserted only on a link with no production caller, and the link the site actually uses has no assertion (CR-1). That is a severity-floor
MEDIUM, and it blocks the hand-off to devops.

## Required Actions

1. CR-1: the Minimum remedy inside the write set, with its control recorded. The Preferred remedy only if steering rules the two
   client files into scope.

## Assumption Not Checked

- Round 1: This review assumes no caller outside the site's own client (a script, an integration, a third-party tool) sends `batch=1`
  to `/api/trpc`, and it does not test this. **Falsity signature**: after release, 400 responses carrying "Batching is not enabled on
  the server" on `/api/trpc/*?batch=1` in the production function logs. **Owner**: devops. It closes under the release form "Vercel's
  production deployment of website `master`", by reading those logs after the deploy. Whether the push deploys is devops's to
  establish.

## Next Steps

- **Fixer** (`fixer-fix-trpc-batch-limit`): CR-1, then re-handoff. The fix confirmation is a sub-entry of Round 1, and it re-runs the
  enumeration above and the control.
- **Steering** (`steering-roadmap-hooks`): to rule whether CR-1's Preferred remedy (`src/utils/api.ts`, `src/providers/TrpcProvider.tsx`,
  deleting dead `proxy`) enters the write set.
- **Devops**, after approval: the Round 1 Assumption Not Checked above, the post-deploy log read.
