---
UUID: ea29cade
Status: Open
Status-Detail: "Six LOW or informational items in website's request handling and dependency upkeep, left by the dependency review and by security's pass on chain 018. None blocks 018's release. Item 1 (a limit on how many calls one tRPC request may carry) is the only one with a measured cost."
Owning-Stage: Unassigned. Implementation (fixer or implementer) once the owner routes it; steering carries the routing. Item 4 is in project-utils.
Review-Trigger: After chain 018's release, when website's src/pages/api/trpc/[trpc].ts, src/middleware.ts, src/app/_navigation/Redirects/Server.tsx or a dependency entry of package.json is next edited, when a tRPC procedure with a list in its input is added, or when @trpc/server or zod next changes version, whichever comes first.
---

# Handoff — website: tRPC batch size, and what the dependency review leaves behind

## What is seeded

1. **One request can carry about a thousand saves (security audit of 018, L-001 LOW).** tRPC accepts a batch: one HTTP request
   naming many procedure calls in its URL. `src/pages/api/trpc/[trpc].ts` passes `createNextApiHandler` no `allowBatching` option and
   counts nothing itself, so the only limit is the URL's length. Chain 018 caps what one save's refusal can cost (21 issues). A batch
   multiplies that cap by the number of calls. Measured on a local production build of website `d1bb9b0`: a batch of 1,050
   `message.upsert` calls is accepted (URL 15,789 bytes) and one of 1,100 is refused with 431 (URL 16,539 bytes), which is Node's
   16 KB header limit. What Vercel accepts was not read. Modelled through the procedure's own caller, 1,000 small saves that each
   fill the cap (90 bytes each) give 21,000 issues and 3,449,000 characters of refusal text in 161 ms. It needs a signed-in
   session, and any Discord account can sign in.
   Owed: a limit on the calls one request may carry, set from what the site's own client sends in one batch (read
   `src/utils/api.ts` for that; this handoff did not), with a test that a batch over the limit is refused before any call runs.
   The installed `@trpc/server` 11.10.0 has `allowBatching` (on or off) and no batch-size option (`grep -c maxBatchSize` over
   its `dist/resolveResponse-*.mjs` and its handler type declarations: 0; `allowBatching`: 3 and 2). So the limit is either
   `allowBatching: false`, if the client can do without batches, or a count of the comma-separated paths in the handler before
   it calls tRPC.
2. **`x-pathname` is trusted for a redirect (dependency review I-5).** `src/app/_navigation/Redirects/Server.tsx` reads the request
   header `x-pathname` to decide a redirect for visitors with no session. `src/middleware.ts` sets it only on the paths its matcher
   names, so on any other path a client's own value arrives. It decides a redirect, never access. Owed: read the path from a
   source the client cannot set, or have the middleware set the header on every path that reads it. The same middleware still
   writes `x-query-params`, which nothing reads since website `7923a1d`; removing that write belongs with this item.
3. **`package.json`'s `overrides` key does nothing under pnpm (dependency review I-6).** The key pins `semver` to `^7.5.3`.
   `pnpm-lock.yaml` has no `overrides:` section at `7923a1d` or `d1bb9b0`, so the pin has no effect. Owed: delete the key, or write
   the pin where pnpm reads it (`pnpm.overrides`) and prove it from the lockfile.
4. **project-utils declares a code generator as a runtime dependency (dependency review I-2).** `project-utils` lists
   `prisma-kysely` under `dependencies`. Its committed `dist` requires only `pg`, `kysely`, `zod` and its own files. The declaration
   brings `brace-expansion`, `minimatch` and `tmp` into website's production graph: 24 advisory entries at website `983681c`, all
   never loaded. Owed, in project-utils: move `prisma-kysely` to `devDependencies`; website then takes the new commit and its
   audit loses those entries.
5. **Nothing makes a new server input list use the cap (security audit of 018, I-2).** At `d1bb9b0` every list a tRPC input
   admits is built with `boundedArray`, and both procedures that take one wrap their input in `cappedInput`
   (`src/server/api/utils/shapes.ts`). The chain's tests name the 11 sites in a fixed list
   (`src/server/api/utils/__tests__/helpers/listBoundSites.ts` `MESSAGE_LIST_SITES`). A plain `z.array(` added later to a
   procedure's input would bring M-001 back at that site and no test would fail. Owed, when a procedure with a list in its input
   is next added: use both helpers there, and extend the fixed list.
6. **No dependency audit runs on a schedule (dependency review, Testing Recommendations).** The review's dispositions are in
   `verification/website-deps-review/security/dispositions.json`, and `apply-dispositions.js` beside it fails when an audit entry
   has none. Owed: a scheduled `pnpm audit --prod --json` over the released lockfile, joined with that file, so that a new entry
   is read by someone. Whether to build it is the owner's call; it is listed here so the recommendation outlives the review.

zod stays at 3.22.4, pinned exactly, and its advisory (GHSA-mrhx-c7xc-m3w5) stays in the audit. The cap's count rests on that
version's behaviour: under 3.25.76 the code reviewer measured 1,600 issues where 3.22.4 gives 21 (018 code review, CR-2). So a
zod version change fires this handoff's trigger, and the change re-runs
`verification/018/security/saveCap.cost-probe.test.ts` before it ships.

## Evidence

- Item 1: `verification/018/security/out/requests-d1bb9b0.txt`, section 4 (the batch requests, sent with no session, each call
  answering 401), and `verification/018/security/out/probe-save-cap-d1bb9b0.txt`, its last three lines (the modelled saves).
  Instruments: `verification/018/security/requests-tip.sh`, `saveCap.cost-probe.test.ts`.
- Items 2 to 4 and 6: `security/website-deps-review-security-audit.md` (I-5, I-6, I-2, Testing Recommendations), read at website
  `983681c`; item 3 re-read at `d1bb9b0` (`package.json` `overrides`).
- Item 5: `security/018-next-upgrade-save-size-cap-security-audit.md`, the enumeration of server input schemas at `d1bb9b0`.

## Origin

Security's pass on chain 018 at website `d1bb9b0` (`security/018-next-upgrade-save-size-cap-security-audit.md`) and the
dependency review it closes out (`security/website-deps-review-security-audit.md`). Plan 018 names that review as the carrier of
I-2 and I-5 (its Exclusions X-4 and X-5); this handoff takes them over so the review can close.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-20T06:59 | security (security-hooks-website-deps) | Created with items 1 to 6. |
