---
UUID: ea29cade
Status: Open
Status-Detail: "Items 1 to 3 discharged by fixer chain fix-trpc-batch-limit (website master 76da25c, pushed 2026-11-21T00:45:05Z): batching refused, the middleware sets x-pathname on bare /message and no longer writes x-query-params, the dead overrides key deleted. Item 6 discharged by fixer chain fix-website-dependency-audit (tools/website-dependency-audit.js, daily crontab line 43 6 * * * installed 2026-11-21T01:11Z; its first run carried by handoff/fix-website-dependency-audit-first-run-2026-11-21.md). Items 4, 5 and 7 wait on their own triggers."
Owning-Stage: Unassigned for items 4, 5 and 7. Implementation (fixer or implementer) once the owner routes each; steering carries the routing. Items 1 to 3 and 6 were routed on his word (steering/website-deps-review-rulings.md, block 2026-11-20T23:44Z). Item 4 is in project-utils.
Review-Trigger: After chain 018's release, when website's src/pages/api/trpc/[trpc].ts, src/middleware.ts, src/app/_navigation/Redirects/Server.tsx or a dependency entry of package.json is next edited, when a tRPC procedure with a list in its input is added, when @trpc/server or zod next changes version, or when website's hosting changes (ecosystem.config.json or vercel.json is next edited, or a deployment that runs next start is proposed), whichever comes first.
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
7. **Every security disposition assumes Vercel hosts the site (dependency review I-1).** The review decided, entry by entry,
   whether hooks.gg reaches each advisory's vulnerable code, and it decided that for a site served by the Vercel project
   `hooks-gg-website`. `ecosystem.config.json`, still in the tree at website `d1bb9b0` (`git cat-file -e`, exit 0), describes
   another way to serve it: PM2 running `next start`. Nothing read shows that path in use. Served that way, Next.js's own image
   optimiser would answer `/_next/image` for the two remote hosts `next.config.js` allows, `cdn.discordapp.com` and
   `cdn.jsdelivr.net`, and both serve files anyone can upload. Any advisory scoped to self-hosted servers would then apply. At
   website `983681c` that was 13 audit entries, two of them critical. At `d1bb9b0` the audit holds none
   (`verification/018/security/out/pnpm-audit-prod-d1bb9b0-disposition-summary.txt`), so nothing listed today would become
   live; a later audit may list new ones. Owed, if the hosting ever changes: before the change ships, security re-reads the
   audit's dispositions for a self-hosted server, with `verification/website-deps-review/security/dispositions.json` and the
   advisories' own texts. The record line that names Vercel as the assumed hosting is asked of the architect separately
   (`INBOX.md`, entry 2026-11-20, security-hooks-website-deps).

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
- Item 7: `security/closed/website-deps-review-security-audit.md`, I-1 and "How hooks.gg is served"; the 13 entries are that
  document's HOST rows at `983681c`.

## Origin

Security's pass on chain 018 at website `d1bb9b0` (`security/018-next-upgrade-save-size-cap-security-audit.md`) and the
dependency review it closes out (`security/website-deps-review-security-audit.md`). Plan 018 names that review as the carrier of
I-2 and I-5 (its Exclusions X-4 and X-5); this handoff takes them over so the review can close.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-20T06:59 | security (security-hooks-website-deps) | Created with items 1 to 6. |
| 2026-11-20T13:44 | security (security-hooks-website-deps) | Item 7 added (the hosting assumption, dependency review I-1) and the trigger extended with a hosting change, at the close of both security audits after chain 018's release. Items 1 to 6 are unchanged. Re-read at website `d1bb9b0` for this row: `package.json` still holds the `overrides` key (`grep -c`, 1) and `pnpm-lock.yaml` no `overrides:` section (0), so item 3 stands; `x-pathname` is still read in `src/app/_navigation/Redirects/Server.tsx` (`git grep -c`, 1), so item 2 stands. |
| 2026-11-21T00:52 | steering (steering-roadmap-hooks) | Items 1 to 3 discharged by fixer chain `fix-trpc-batch-limit`, released as website `master` `76da25c` (`git ls-remote origin refs/heads/master`, read 00:5xZ; `deployment/closed/fix-trpc-batch-limit-deployment.md`). Item 2's premise corrected there: `Redirects/Server.tsx` is not mounted (`steering/fix-trpc-batch-limit-rulings.md`, block 2026-11-21T00:11Z). Whether an outside caller batches is carried by `handoff/website-trpc-batching-refusal-outside-caller-read-2026-11-21.md`. Item 6 routed to fixer chain `fix-website-dependency-audit`. Items 4, 5 and 7 unchanged. |
| 2026-11-21T01:45 | steering (steering-roadmap-hooks) | Item 6 discharged by fixer chain `fix-website-dependency-audit`: `tools/website-dependency-audit.js` with `tools/website-audit-dispositions.json` (record `5d0baf8`), daily crontab line `43 6 * * *` installed 01:11Z (`crontab -l` line 83, read 01:4xZ); its documents `Released` in `closed/` (`deployment/closed/fix-website-dependency-audit-deployment.md`, `7768ec1`). The first scheduled run is carried by `handoff/fix-website-dependency-audit-first-run-2026-11-21.md` (reader R1, `--smoke` OK). Items 4, 5 and 7 unchanged. |
