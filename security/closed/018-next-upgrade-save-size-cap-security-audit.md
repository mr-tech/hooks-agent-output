---
ID: 018
Origin: 018
UUID: 6273a762
Status: Review Complete
Status-Detail: "APPROVED at website d1bb9b0, which is the released commit: website master moved to d1bb9b0 at 2026-11-20T08:07:52Z (deployment/closed/018-next-upgrade-save-size-cap-deployment.md). H-002 and M-001 are CLOSED in security/closed/website-deps-review-security-audit.md. On production, devops read Next.js 16.4.6 (B-7 PASS) and UAT read an over-limit save refused with 1 issue (B-6 PASS); security made no request to production. L-001 LOW stays OPEN, not blocking: a tRPC batch lets one request carry about 1,050 capped saves; carried by item 1 of handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md, with I-2 (item 5) and I-3 (its closing paragraph). I-1 and I-4 are stated limits."
Reviewed-At: "d1bb9b0724cded3c3c303203c2cbafe5df7bbf96 — repos=website; base 7923a1d (origin/master)"
Kind: code-audit
---

# Security Assessment: website — Next.js 16.4.6 and the save-size cap (chain 018)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T07:00 | steering-roadmap-hooks → security-hooks-website-deps (brief `steering/018-brief-security.md`, record `d9df9a9`; stage set in `steering/website-deps-review-rulings.md`, block 2026-11-20T02:53Z) | Security on the change website `7923a1d..d1bb9b0`, and the close of H-002 and M-001 | Initial assessment. Verdict APPROVED. Audit at the chain lockfile: 81 entries, 46 fewer, none new, no Next.js entry. The save cap measured through both procedures: the review's 1 MB bodies now give 1 issue each. L-001 LOW raised (tRPC batches), with its carrier. Four informational items. |
| 2026-11-20T07:18 | steering-roadmap-hooks → security-hooks-website-deps (message, "run /checkpoint") | Wrap up for a clear | Checkpoint: Resumption State written at the end of this document. The verdict and its tree are unchanged. |
| 2026-11-20T13:48 | steering-roadmap-hooks → security-hooks-website-deps (message 13:4xZ; `steering/018-rulings.md`, block 2026-11-20T13:41Z); devops-hooks-018 (`INBOX.md` entry, 2026-11-20) | Close this audit: chain 018 is released | The session resumed after a `/clear` from the Resumption State at record `2ca9e96`. The verdict is unchanged and no new review was made: the released commit is the reviewed one. "Relied on, not checked here" is reconciled against the release record. Read after the resume, not carried across: origin `master` (`git ls-remote`, `d1bb9b0…`), the deployment record, the release-tip QA record's header, the post-deploy handoff's four Result lines, and the leftovers handoff. Everything else is carried across unchanged. |
| 2026-11-20T13:48 | security (security-hooks-website-deps) | Document closed | Status: Review Complete. The chain is released at the reviewed commit; L-001, I-2 and I-3 name their carrier. |

## Metadata

| Field | Value |
|-------|-------|
| Assessment Type | Targeted code review of one change, with its dependency delta (Phases 2 and 3) |
| Mode Determination | User-specified: the brief names the diff and the two findings it must close |
| Scope | website `7923a1d..d1bb9b0` on `chain/018-next-upgrade-save-size-cap`: 20 files, 1,909 lines added and 1,480 removed (`git diff --numstat`). Read as code: `src/server/api/utils/shapes.ts`, `routers/message.ts`, `routers/user.ts`, `src/constants/index.ts`, `usePreferences.ts`, `package.json`, `tsconfig.json`. Read for reach, unchanged by the diff: every `.input(` of `src/server/api/routers/`, `src/pages/api/trpc/[trpc].ts`, `src/server/api/trpc.ts`. |
| Not covered | The lint move (`eslint.config.mjs`, ESLint 9 and its packages): development tooling that does not run on a request. The chain's own tests as tests: code review and QA judged them. Next.js's changes between 16.1.6 and 16.4.6 beyond what the build, the requests below and the audit show. Vercel's own limits. The release-check branch `release-check/018-next-upgrade-save-size-cap`, which is not the review's object. |

## Executive Summary

The change does what the dependency review asked of it. The site now builds on Next.js 16.4.6, and the dependency audit lists no Next.js advisory at all, where it listed 42. A save that sends an oversized list is refused with one error for that list. The four 1 MB requests that built errors of more than 100 MB before now build errors under 200 characters. No save can be refused with more than 21 errors.

I found one weakness the change does not introduce and does not remove. One HTTP request can carry about 1,050 saves, so the limit of 21 errors applies about 1,050 times per request. That is small beside what the cap removed, and it does not block the release.

**Overall Risk Rating**: LOW
**Verdict**: APPROVED

The verdict binds to website `d1bb9b0`. A change to any file under review expires it.

**State at 2026-11-20T13:48.** Website `master` moved from `7923a1d` to `d1bb9b0` at 08:07:52Z (`deployment/closed/018-next-upgrade-save-size-cap-deployment.md`; origin `master` read `d1bb9b0…` by `git ls-remote` in this session). The released commit is the reviewed one, so the verdict covers what production runs and no delta is owed a review.

## What the change is

Eighteen commits over `7923a1d` (`git rev-list --count 7923a1d..d1bb9b0`), which is `origin/master` (`git ls-remote`, this session) and an ancestor of `d1bb9b0` (`git merge-base --is-ancestor`, exit 0).

- **Dependencies.** `next`, `@next/bundle-analyzer` and `@next/eslint-plugin-next` to 16.4.6. `highlight.js` to 11.12.0. `zod` pinned exactly at 3.22.4, where it was `^3.20.6`. ESLint 9 and its packages under `devDependencies`.
- **`boundedArray`** (`shapes.ts`). It first reads the value as a list of unknowns, checks the length, and on an over-limit list records one issue marked fatal, so the elements are never validated. Only a list within its bound goes on to the element schema. All 11 list sites of the two save procedures use it, and so does the import schema's top-level list.
- **`cappedInput`** (`shapes.ts`). It wraps the input of `message.upsert` and `user.updatePreferences`. It counts issues as zod creates them, per call, and stops the parse at the 21st by throwing out of it. The refusal carries the first 20 issues and one summary line. Every issue of every refusal is reduced to `code`, `path` and `message`.
- **`isolatedUnion`** (`shapes.ts`). The three plain unions are parsed apart, so the issues zod creates for losing branches are not counted.

## The property, applied to every server input

**Property.** Every list a tRPC input admits is refused when over its bound before any of its elements is validated. No refusal of a save carries more than 21 issues, and no issue carries the input.

Every live `.input(` under `src/server/api/routers/` at `d1bb9b0` (`out/static-checks-d1bb9b0.txt` holds the lockfile reads; the enumeration is a `grep -rn "\.input("` over `src`, tests excluded: 11 live sites and 2 inside comments):

| Procedure input | Holds a list? | Holds? |
|---|---|---|
| `user.updatePreferences` | `recentMessageIds`, and the message's 10 lists | `cappedInput` over `boundedArray` at every list. |
| `message.upsert` | the message's 10 lists | `cappedInput` over `boundedArray` at every list. |
| `guild` router, three procedures: `discordIdShape` | No | One string; at most one issue. |
| `message` router: `userOrDiscordIdShape`, `messageIdShape` | No | One string each. |
| `message` router: `z.object({ url })`, `z.object({ code })`, `z.object({ id })` | No | One string each. |
| `message.updateRecentMessageData`: `recentMessageDataShape` | No | Four strings. |

Outside tests, `z.array(` appears in `src/server`, `src/pages` and `bot` only inside `boundedArray` itself, and `z.record`, `z.set`, `z.map`, `z.tuple` and `z.enum` appear nowhere there (one `grep -rnE` over those directories). The three Pages Router handlers that parse with zod read `req.query` only, which the URL's length bounds. Both save procedures are `protectedProcedure`, and the session check runs before the input is parsed: a 1 MB save with no session answered 401 in 0.04 s with 145 bytes (run 4).

## What was run

All on this box, in one `git archive` export of `d1bb9b0` under the session scratchpad, installed with `pnpm install --frozen-lockfile --offline --ignore-scripts` (exit 0) and holding no `.env` file (count 0). Nothing was sent to hooks.gg. Instruments are under `verification/018/security/`, captures under its `out/`.

**1. The lockfile.** `next@16.4.6` is the only `next` it resolves: 0 lines hold `next@16.1.6`, and the installed package reads 16.4.6. The website's own `zod` is 3.22.4 (importer entry `specifier: 3.22.4`, `version: 3.22.4`; installed 3.22.4), and so is project-utils'. Two other zod versions sit in the lockfile, each resolved only for another package: 3.25.76 for `eslint-plugin-react-hooks` and `zod-validation-error`, and 4.6.7 for `@vercel/cli-config`. The site's own imports of `zod` resolve 3.22.4. By key set against the base (`lockfile-key-sets-7923a1d-d1bb9b0.txt`), 13 package names are new: nine of ESLint 9's own (`@eslint/*`, `@humanfs/*`, `@humanwhocodes/retry`), `json-buffer` and `keyv` beneath it, and two optional platform builds of `sharp` 0.35.5, which Next.js 16.4.6 brings. No `overrides:` section; `patchedDependencies:` as before.

**2. The audit at the chain lockfile.** `pnpm audit --prod --json`, 2026-11-20T06:52:37Z, exit 1: 81 entries, against 127 at `7923a1d`. The 46 that left are `next` 42, `sharp` 3 and `baseline-browser-mapping` 1. No entry is new (`audit-entry-delta-7923a1d-d1bb9b0.txt`, keyed by module, GHSA id and advisory id). One existing entry gained an installed version: `source-map-js` 1.2.1 under `next > postcss` (I-4). Joined with the dependency review's dispositions, every entry has one: 33 precondition absent, 21 build time only, 26 never loaded, and 1 reached, which is zod's (M-001, below). None of the 4 remaining critical entries is reached: 3 absent, 1 never loaded.

**3. The save cap, through each procedure's own caller** (`saveCap.cost-probe.test.ts`, output `probe-save-cap-d1bb9b0.txt`; zod 3.22.4, tRPC 11.10.0, Node 24.14.0). The database stand-in was touched 0 times in every row.

| Input | Body | Issues | Refusal text | Time |
|---|---|---|---|---|
| The review's four M-001 bodies (users, embeds, components, a container's components filled with failing elements) | 1 MB each | 1 each | 159 to 192 characters | 50 to 64 ms |
| The same fill at the other seven list sites, and the users body through `user.updatePreferences` | 1 MB each | 1 each (2 where my body also carried an invalid accessory) | 138 to 359 characters | 33 to 67 ms |
| Steering's seven worst bodies with every list within its bound | 67 KB to 708 KB | 21 each | 3,669 to 5,011 characters | 0.3 to 1.5 ms |
| 100 invalid user ids of 10,000 characters each, within the bound | 1 MB | 21 | 3,409 characters | 0.3 ms |
| One value of 891,000 characters at each of five places where a failure used to carry the input, in place of a list, and as the message name | 891 KB each | 1 each | 146 to 234 characters | 0.2 to 0.3 ms |
| 60,000 unknown keys and one error | 649 KB | 1 | 140 characters | 0.3 ms |
| 40 containers of 40 over-limit rows; a list holding lists | 62 KB, 120 KB | 21 each | 4,469 and 3,429 characters | 0.6 and 0.3 ms |

At `983681c` the first row was 524,250 to 524,266 issues, 106 to 124 MB of text and about 1.5 s each (`security/website-deps-review-security-audit.md`, M-001). Every issue in every refusal carries exactly `code`, `message` and `path`. Every refusal is `BAD_REQUEST`. The heap grew by up to 63 MB on the 1 MB rows; it was measured without a forced collection, and two rows read negative because a collection ran, so the figure is rough (I-1).

**4. Requests to a production build.** `next build` exited 0 (`next-build-d1bb9b0.txt`). Its route table lists the same 10 app routes and 8 API routes as the build of `7923a1d`, each with the same static or dynamic mark, and the middleware (read side by side with `verification/fix-message-page-header-decode/security/out/next-build-7923a1d.txt`). Served by `next start` on `127.0.0.1:39419` (`requests-tip.sh`, output `requests-d1bb9b0.txt`):

| Request | Answer |
|---|---|
| `/message/m/0/edit` with a malformed `x-query-params` header of 1, 2, 4 and 8 KB (H-001's request) | 200 in 0.015 to 0.018 s each; 0.020 s with no header |
| One image through `/_next/image` | 200, `image/png`, 2,948 bytes, as at `7923a1d` |
| A 1 MB save with no session | 401 in 0.04 s, 145 bytes |
| A 1.2 MB save | 413, "Body exceeded 1mb limit" |
| A batch of 1,050 saves with no session (URL 15,789 bytes) | 401 for each call, 0.08 s, 153 KB |
| A batch of 1,100 saves (URL 16,539 bytes) | 431, refused before the handler |

**5. `highlight.js` 11.12.0.** Its output is placed in the page as HTML at two sites (`JsonModalBody.tsx` and `src/utils/markdown/rules.tsx`). A JSON string holding an `<img onerror>` tag and a closing `</script>` came back with neither tag raw, through `highlight` and `highlightAuto` (`static-checks-d1bb9b0.txt`).

## Findings

Finding IDs are this document's own.

### Low Findings

| ID | Severity | Title | Category | Location | CVSS |
|----|----------|-------|----------|----------|------|
| L-001 | LOW | One request can carry about 1,050 saves, so the cap of 21 issues applies that many times | Resource consumption without a limit (CWE-770); OWASP API4:2023 | `src/pages/api/trpc/[trpc].ts` (the handler's options) | 4.3 by the base formula (AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:L) |

**L-001 — status OPEN; not blocking; carried.**

- **What it is.** tRPC accepts a batch: one request whose URL names many calls. The handler turns batching neither off nor down, and the installed `@trpc/server` 11.10.0 has no batch-size option. The chain's cap is per save. So the number of saves one request can hold is limited only by the URL's length.
- **Measured.** On the local build, 1,050 calls in one request are accepted and 1,100 are refused with 431, which is Node's 16 KB header limit (run 4). Those requests had no session, so each call stopped at the session check. With a session each call would reach the cap. Modelled through the procedure's own caller, not sent over HTTP: 1,000 saves of 90 bytes that each fill the cap give 21,000 issues and 3,449,000 characters of refusal text in 161 ms (run 3, last lines of the output).
- **Not established.** What URL length Vercel accepts. If it accepts more than Node's default, the figures grow in proportion: the same model at 10,000 saves gives 210,000 issues, 34 MB and 1.6 s.
- **Why LOW.** It needs a session. The change did not introduce it: batching was there at `7923a1d`, where one call alone cost more than this whole batch. At the measured limit one request costs about what a thousand ordinary requests cost, and nothing rate-limits those either. The base formula gives 4.3; I rate it LOW on that comparison.
- **Remediation** (not done; a code change with its own test): limit the calls one request may carry, from what the site's own client sends. The options are in the handoff.
- **Carrier.** `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`, item 1. No document of chain 018 mentions batching (`grep -c -i` for six spellings over the plan, the code review, the five QA documents, the UAT document, the four implementation documents and the chain's rulings: 0 in each), so this repeats no earlier gate's finding.

### Informational

I-1 INFO — An over-limit list is still walked once before it is refused. `boundedArray`'s first stage reads the whole list as unknowns, and only then checks the length. A 1 MB list of 524,000 elements costs 33 to 67 ms and a few tens of megabytes on its way to one issue. That is bounded by the 1 MB body limit, and is more than 20 times quicker than the 1.5 s the same body cost before. A length check ahead of the first stage would remove it. No carrier: it is a stated limit of the mechanism.

I-2 INFO — Nothing makes a new server input list use the two helpers. The chain's tests name the 11 sites in a fixed list (`listBoundSites.ts` `MESSAGE_LIST_SITES`), so a plain `z.array(` added to a procedure's input later would bring M-001 back at that site with every test green. Carrier: the handoff, item 5.

I-3 INFO — The cap's count rests on zod 3.22.4's behaviour. The pin is exact in `package.json` and in the lockfile (run 1), and my figures are from that version. A zod version change must re-run the probe. Carrier: the handoff's closing paragraph. Duplicates: CR-2 in code-review/018-next-upgrade-save-size-cap-code-review.md

I-4 INFO — `source-map-js` 1.2.1 is new in the tree, under `next > postcss`, and falls under an advisory entry the audit already held for 1.0.2 (GHSA-68fv-2mgg-jv7q). Its disposition is the entry's: build time only. PostCSS runs while Next.js compiles the site's own stylesheets, not on a request. I did not trace Next.js's server bundle to prove it never loads the module at run time; the claim rests on what PostCSS is for.

## Required Controls

None before the push.

## The dependency review's two findings at this tree

Their home is `security/website-deps-review-security-audit.md`; this section is the evidence that document cites.

- **H-002 (HIGH): bar met.** The bar was `next` 16.2.5 or later resolved in the lockfile. It resolves 16.4.6 alone (run 1), and the audit holds none of the 42 Next.js entries, the two H-002 advisories among them (run 2). The advisories publish no request, so, as at the review, nothing was exercised: the fix is verified by version.
- **M-001 (MEDIUM): bar met.** The bar was a save whose lists are refused before one issue is recorded per element. All 11 sites refuse a filled 1 MB list with one issue, through both procedures (run 3). Beyond the bar, the error cap holds the within-bound worst case to 21 issues. zod itself stays at 3.22.4, and its advisory stays in the audit as the one reached entry: the vulnerable code still runs, and the product now bounds what reaches it. The plan's exclusion X-1 (no move to zod 4) stands on that. What is left is L-001, I-1 and I-2.

Both move to VERIFIED at `d1bb9b0` in that document, and to CLOSED when the release is made, as H-001 did.

2026-11-20T13:48: the release is made, and both are CLOSED in `security/closed/website-deps-review-security-audit.md` (record `c424340`, corrected at `c598dbe`).

## Relied on, not checked here

- **The suite, the typecheck and the walks.** Code review, QA and UAT ran them at `d1bb9b0` (anchors re-read in this session: code review `Reviewed-At` `d1bb9b0`, QA `Verified-At` `d1bb9b0` in `qa/018-next-upgrade-save-size-cap-m4-qa.md`, UAT `Verified-At` `d1bb9b0`, APPROVED FOR RELEASE). I re-ran none of them.
- **A signed-in save over HTTP.** My figures come from each procedure's own caller. UAT walked the signed-in save on a local build (plan M1-g), and the plan's post-deploy row M1-h reads it on production after the push.
- **Vercel.** Its URL and header limits, and its build of this tree. The release-check preview is devops's and UAT's (plan M5).

**Reconciled against the release record, 2026-11-20T13:48.** Each line names the document that holds the read; none of these reads is mine.

- **The suite, the typecheck and the walks.** QA's release-tip record reads `Verified-At` `d1bb9b0` (`qa/closed/website-7923a1d-d1bb9b0-release-tip-qa.md`). Devops built the tip in an isolated export, with the install, the build and both typechecks at exit 0 (the deployment record, Packaging integrity). I still re-ran none of them.
- **A signed-in save over HTTP.** Read on production by UAT at 13:45Z: a save carrying 50 invalid embeds, sent as the signed-in test account, was refused with HTTP 400 and 1 issue, where the same payload gave 51 before the release (`handoff/018-next-upgrade-save-size-cap-post-deploy-2026-11-20.md`, row B-6 PASS, record `6ce5f7f`). That is one list site through one procedure. The other ten sites and the 21-issue ceiling rest on my run 3, which did not go over HTTP.
- **Vercel's build of this tree.** The production deployment is READY at `d1bb9b0`, and hooks.gg serves a script carrying Next.js 16.4.6 and none carrying 16.1.6 (the same handoff, E-SERVING and row B-7 PASS). The build log does not show the install, so whether Vercel installed from the frozen lockfile is not verified (the deployment record, runbook step 7b). Two things I rely on do not depend on it: the served Next.js version is read from production, and `zod` is an exact `3.22.4` in `package.json`, which no install can resolve otherwise. Every other package's version on production rests on the lockfile being honoured.
- **Vercel's URL and header limits.** Still not read. It is L-001's "Not established" line, and the handoff's item 1 carries it.
- **The other two post-deploy rows.** B-8, the recent-messages list, and B-10, highlighted code blocks, both read PASS on production (the same handoff; QA's record `6571247` and UAT's `6ce5f7f`). All four rows of that handoff carry a PASS at this write. B-8 and B-10 are reads of features and decide nothing in this audit.

## Testing Recommendations

None owed before the release. For later, with the handoff: a test that a batch over the chosen limit is refused before any call runs (item 1).

## Compliance Mapping

| Requirement | Standard | Status | Notes |
|-------------|----------|--------|-------|
| Vulnerable and outdated components | OWASP Top 10 2021, A06 | Improved | 81 audit entries where there were 127; one reached, and bounded in the product. |
| Components are up to date | OWASP ASVS 4.0.3, V14.2.1 | Improved | `next` is on a release with no listed advisory. `zod`, `next-auth` and `kysely` are behind their patched versions, each with its disposition in the dependency review. |
| Input validation limits on size and number | OWASP ASVS 4.0.3, V5.1.3; OWASP API4:2023 | Met for one save; partial for one request | The cap; L-001. |

## Process record

- **Set up and removed on this box.** One export under the session scratchpad; one `next build` in a capped scope; one `next start` on `127.0.0.1:39419` in the scope `sec018-next-start-d1bb9b0`, given dummy values for `NEXTAUTH_SECRET`, `NEXTAUTH_URL` and `DATABASE_URL` and a Redis port with nothing listening (`127.0.0.1:39431`). This box has a Redis on its default port that is not mine; the server's log shows 28 refused connections to 39431 and no line naming 6379. The server was stopped: `out/servers-stopped.txt` holds the `ps` listing with no match, 0 listeners on 39419 and the scope `inactive`. The export and the request work files were then deleted.
- **The shared tree was not moved or written.** `git -C website rev-parse HEAD` read `d1bb9b0…` and `git status --short` read `?? .playwright-mcp/` (another session's) when I began and when I finished.
- **Errors of mine, fixed in the round.** My first audit comparison keyed entries by module and GHSA id and counted 108 and 62; one GHSA id can hold several entries, so the key now includes the advisory id and the counts are 127 and 81, equal to the audit's own. The batch request of 10,000 calls was never sent: curl would not take a URL that long from its config file, and the 1,100 and 2,000 requests had already been refused. The handoff first named a `maxBatchSize` option of tRPC; the installed version has none (`grep -c`, 0), and the text was corrected before the first commit.
- **A rule of the record I broke, disclosed.** I appended my `INBOX.md` entry for the architect (hosting assumed by the dependency dispositions) with a shell heredoc. The record's rule is that its documents are written with the file-editing tools. The entry's text is as intended (read back from the file's tail); I left it in place and uncommitted, as the inbox rule has it.
- **Instruments added** under `verification/018/security/`: `isolated-export.sh`, `run-audit.sh`, `audit-entry-delta.js`, `saveCap.cost-probe.test.ts`, `requests-tip.sh`. Reused from the review and the fix chain: `tabulate-audit.js`, `apply-dispositions.js --allow-unused`, `dispositions.json`, `lockfile-key-sets.js`, `request-x-query-params.sh`.
- **Network.** The audit's registry query was the only request that left this box.
- **The closing pass, 2026-11-20T13:41 to 13:48.** It ran nothing against the website: no install, build, server or request, and one `git ls-remote`. It set up nothing on this box. Its session-start checks, and an error of mine in the dependency review's closing commit (a stale sentence about row B-6, corrected at record `c598dbe`), are in `security/closed/website-deps-review-security-audit.md`, Process record. This document was written after the row was re-read and never carried that sentence. A near-miss of the same kind here, caught before the commit: my draft said row B-8 was still open, and the re-read made immediately before the move showed QA's PASS of 13:47Z. The line was rewritten before anything was committed.
- **The Resumption State was replaced by its closing line at this close.** It carried the commits of the first pass (`fa2ce9f`, plan row R-23 at `97fa48b`), the report's message id, and three instructions: re-review if the tip moved, close when the chain closed, and keep the handoff as carrier. The tip did not move, the second is this pass, and the third is in the `Status-Detail`. The text is in this document at record `2ca9e96` (`grep -c -F "Written 2026-11-20T07:18 at a checkpoint"` over that revision: 1).

## Resumption State

Closed 2026-11-20T13:48 at `Review Complete`. Nothing is in flight and no question is open. L-001, I-2 and I-3 are carried by `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`.
