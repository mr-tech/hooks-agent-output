---
UUID: 81699538
Status: Open
Status-Detail: "Website master 76da25c (pushed 2026-11-21T00:45:05Z) refuses any /api/trpc request naming more than one call, with a 400. Whether any caller outside the site's own client sends one is unknown: the one post-deploy read taken (a 5-minute window) could not decide it. Owed: a read that can see it, when one of the triggers fires."
Owning-Stage: steering
Review-Trigger: "when a caller of /api/trpc outside the site's own client is reported or identified as failing (a script, an integration or a third-party tool whose batched request now gets a 400), or when a production request-level read of /api/trpc status codes is next made for any reason"
---

# Handoff — website: does anything outside the site's client send a batched /api/trpc request?

## What is seeded

Chain `fix-trpc-batch-limit` set `allowBatching: false` at `src/pages/api/trpc/[trpc].ts` (website `76da25c`, on `master` since 2026-11-21T00:45:05Z). A request naming several calls (`batch=1`, comma-separated paths) is now answered 400 "Batching is not enabled on the server" before any call runs. The site's own three links never batch (read from code; the production link is asserted by `src/server/api/__tests__/trpc.site-link.test.tsx`). The code review's Assumption Not Checked: no caller outside the site's own client (a script, an integration, a third-party tool) sends `batch=1` to `/api/trpc`. Falsity signature as written: production function logs carrying 400s with "Batching is not enabled on the server" on `/api/trpc/*?batch=1`. Owner as written: devops, closing by one read after the deploy.

**The read taken could not decide it, and the signature as written cannot appear.** In production the handler's `onError` writes a `console.error` only when `env.NODE_ENV === 'development'` (`git show 76da25c:'src/pages/api/trpc/[trpc].ts'`, lines 12-15), so a production 400 from `allowBatching: false` writes no function stderr line, and the function-log instrument (`vercel logs`, runtime stderr) cannot carry that text. What can show a batch is the request path (a comma in `/api/trpc/…`) or a 400 status on `/api/trpc`, seen by a request-level read; the CLI read used here returned only stderr records. The read taken (window 2026-11-21T00:44:53Z to 00:50:06Z, about five minutes after the push, over the old and new deployment): 35 stderr records, 14 on `/api/trpc` paths, 0 on a comma path, 0 containing the message text. That is a count of stderr lines, not of requests, over five minutes. It does not retire the assumption.

Owed, by the owning stage when a trigger fires: (1) if a caller is reported, confirm it by its request (a comma path or `batch=1`), and route its fix: the caller sends one call per request (what every site link already does); (2) if a request-level read of `/api/trpc` status codes is made for any reason, count 400s and comma paths in it. Retention is under one day on this plan (`verification/017/qa-phase1/vercel-runtime-logs/README.md`: 1d refused, 23h served), so a later read sees only its own last 23 hours. No scheduled reader is installed: the instrument that could see the signal is not established, so a cron reader would count nothing.

Rollback if a caller is found and cannot change: `verification/fix-trpc-batch-limit/devops/rollback-76da25c-to-d1bb9b0.patch` reverses the whole change (it applies, `git apply --check -R` exit 0 at the tip); a narrower one-line revert of `allowBatching: false` is the same push gate (production), his word.

## Evidence

- `verification/fix-trpc-batch-limit/devops/prod-log-read-76da25c.txt` (the reads and their counts; raw records deleted after counting, since they carry request text).
- `verification/017/qa-phase1/vercel-runtime-logs/README.md` (CLI 29.1.1 returns build logs only; `npx vercel@66.2.0 logs` returns runtime stderr; retention under a day; the `onError` finding).
- `code-review/closed/fix-trpc-batch-limit-code-review.md`, "## Assumption Not Checked" (Round 1).
- `deployment/fix-trpc-batch-limit-deployment.md`, runbook step 6.

## Origin

Chain `fix-trpc-batch-limit`, code review Round 1 Assumption Not Checked; devops's post-deploy read at runbook step 6 (deployment record). Source handoff: `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`, item 1.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T00:50 | devops (devops-fix-trpc-batch-limit) | Created at the release's closure, from the one post-deploy read and its limits. |
