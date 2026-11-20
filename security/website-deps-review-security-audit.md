---
ID: n/a
Origin: website-deps-review
UUID: f14f4445
Status: Active
Status-Detail: "BLOCKED_PENDING_REMEDIATION, a verdict bound to website 983681c. H-001 (HIGH) is CLOSED: fixed at website 7923a1d, verified (security/closed/fix-message-page-header-decode-security-audit.md, APPROVED) and released to website master at 2026-11-20T02:34:40Z (deployment/closed/fix-message-page-header-decode-deployment.md). H-002 (HIGH) and M-001 (MEDIUM) are VERIFIED fixed at website d1bb9b0 (security/018-next-upgrade-save-size-cap-security-audit.md, APPROVED) and reach production only with chain 018's website master push; they close, and this document with them, at that release. Every assumption and informational item has its carrier or its end written beside it. None of the audit's 8 critical advisories is reached on hooks.gg as hosted."
Reviewed-At: "983681ca6cd7cbacd0796ed093e094057ad7f9be — repos=website; lockfile unchanged from 787bec5 (git diff --quiet 787bec5 983681c -- pnpm-lock.yaml package.json, exit 0)"
Kind: dependency-audit
---

# Security Assessment: website — production dependency review (reachability of the audit's findings on hooks.gg)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T01:57 | steering-roadmap-hooks → security-hooks-website-deps (brief `steering/website-deps-review-brief-security.md`; owner selection recorded in `steering/fix-personal-message-access-rulings.md`, block 2026-11-20T01:34Z, question "Deps review") | Dependency-only review of website at `983681c`: for each audit finding, whether hooks.gg reaches the vulnerable code, where it ships and how it is reached. No remediation. | Initial assessment. 141 advisory entries dispositioned: 5 reached, 5 conditional, 13 self-hosting only, 56 precondition absent, 2 dev server only, 28 build time only, 32 never loaded. H-001, H-002, M-001 OPEN. Verdict BLOCKED_PENDING_REMEDIATION. |
| 2026-11-20T02:01 | steering-roadmap-hooks → security-hooks-website-deps (message 02:0xZ; `steering/website-deps-review-rulings.md`, block 2026-11-20T01:59Z, record `57c41b8`, read by this stage) | The owner's three scope answers, and where the two confirmations go | Fix routing recorded on H-001, H-002, M-001 and I-2; all three findings stay OPEN. The four owner-needing items collapsed to their dispositions. A-1's and A-4's settling reads named. One premise of mine corrected (process record). No re-review: the tree has not moved. |
| 2026-11-20T02:23 | code-reviewer-hooks-fix-message-page-header-decode → security-hooks-website-deps (message 02:1xZ; code review record `d67e7d5`) | Security on the H-001 fix, website `983681c..7923a1d` | H-001 moves OPEN → VERIFIED at `7923a1d`; the verdict on the change is in `security/fix-message-page-header-decode-security-audit.md`. A production build of the base reproduces H-001. I-2's outcome, A-1's pre-push read, A-2's static pages and a new I-6 recorded. One wording error of mine in a message recorded (process record). This document's own verdict is unchanged: it binds to `983681c`. |
| 2026-11-20T02:34 | steering-roadmap-hooks → security-hooks-website-deps (message, "run /checkpoint") | Wrap up for a clear | Checkpoint: Resumption State written at the end of this document. Nothing else changed. |
| 2026-11-20T02:39 | steering-roadmap-hooks → security-hooks-website-deps (message 02:3xZ) | Record that H-001 is closed by the release; close the fix's security audit | The session resumed after a `/clear` from the Resumption State at record `4e876a7`. H-001 moves VERIFIED → CLOSED and its block is collapsed to one disposition line. H-002 and M-001 stay OPEN. A-4 retired. A-1 corrected: the post-push image read does not settle it (an error of mine, process record). The fix's audit is closed `Review Complete` (record `cd2e816`). Read after the resume, not carried across: origin `master` (`git ls-remote`), the deployment record, the P-1 carrier handoff, the rulings blocks 01:59Z and 02:18Z to 02:36Z, and the count of `x-query-params` in the tree at `7923a1d`. Everything else in this document is carried across unchanged. The verdict and its tree are unchanged. |
| 2026-11-20T07:02 | steering-roadmap-hooks → security-hooks-website-deps (brief `steering/018-brief-security.md`, record `d9df9a9`) | Security on chain 018's change, and the close of H-002 and M-001 | H-002 and M-001 move OPEN → VERIFIED at website `d1bb9b0`; the verdict on the change is in `security/018-next-upgrade-save-size-cap-security-audit.md`. They move to CLOSED at the release, as H-001 did. A-3 settled by steering's Vercel read; A-1 and A-2 end with the release; I-1, I-2's project-utils part, I-4, I-5 and I-6 each name a carrier; I-3 ended. New carrier: `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`. This document's own verdict is unchanged: it binds to `983681c`. |

## Metadata

| Field | Value |
|-------|-------|
| Assessment Type | Dependency (Phase 3), with reachability read from the product source |
| Mode Determination | User-specified: the brief names a dependency-only review |
| Scope | `website` at `983681c`: `package.json`, `pnpm-lock.yaml`, and the source read only to decide reachability. Production dependencies (`pnpm audit --prod`). Dev dependencies, the other three repositories and remediation are out of scope. |
| Not covered | Supply-chain review of maintainers and typosquatting; dev dependencies; the live Vercel project's settings; any request to production. A follow-up is recommended for the first two only if the owner wants them. |

## Executive Summary

`pnpm audit --prod` over the lockfile at `983681c` lists 141 advisory entries in 34 packages. Five of them are reached on hooks.gg. Two of those five share one path that I exercised on a locally served build: any visitor, signed in or not, can send one request header that keeps a server process busy for many seconds (H-001). None of the 8 critical advisories is reached on hooks.gg as it is hosted today.

The other 136 entries are not reached. Their vulnerable code is either never loaded, runs only while building, runs only on a self-hosted server, or needs a feature the site does not use. Each entry has its own row and reason in `verification/website-deps-review/security/out/pnpm-audit-prod-983681c-dispositions.tsv`.

**Overall Risk Rating**: HIGH
**Verdict**: BLOCKED_PENDING_REMEDIATION

The verdict binds to website `983681c`. That tree is already released, so the verdict stops nothing in flight. It states that H-001 must be fixed and re-reviewed before this dependency set can be approved.

**State at 2026-11-20T02:39.** The summary above describes `983681c`. Website `master` has been `7923a1d` since 02:34:40Z, and H-001 is closed by that release. H-002 and M-001 are open, so the dependency set is still not approved. Later stage documents are authoritative on each finding's current state.

**State at 2026-11-20T07:02.** H-002 and M-001 are verified fixed at website `d1bb9b0`, the tip of chain 018, which is not yet released. At that tree the audit holds 81 entries where `983681c` had 141, and the one still reached is zod's, which the product now bounds (`security/018-next-upgrade-save-size-cap-security-audit.md`). The dependency set is approved at `d1bb9b0`; production still runs `7923a1d`.

## How hooks.gg is served (the facts the dispositions rest on)

Each line names the read that established it. All reads are of website `983681c` unless said otherwise.

- **Vercel hosts it.** `dig +short hooks.gg A` answered `76.76.21.21`, and `www.hooks.gg` answered `cname.vercel-dns.com.` (this session, 2026-11-20T01:4xZ). The tree carries `vercel.json` (one cron) and no workflow file. `ecosystem.config.json` describes a PM2 `next start` deployment; nothing I read shows it in use.
- **App Router pages, Pages Router API.** `src/app/` holds every page. `src/pages/` holds `api/` only. There is no `src/app/api`.
- **One middleware, and it authorises nothing.** `src/middleware.ts` matches `/message/(.*)`, `/api/guilds/(.*)` and `/preview`. It copies the path into `x-pathname` and, only when the URL has a query string, the query into `x-query-params`. It never redirects, rewrites or refuses.
- **Features the Next.js advisories depend on, counted in the source** (`usage-evidence.sh`, output `out/usage-evidence-983681c.txt`, 338 files scanned, `grep -c` sums): `use server` 0, `use cache` 0, `cacheComponents` or `experimental.ppr` 0, `rewrites(` 0, `i18n:` 0, `next/script` 0, Content-Security-Policy or script nonce 0, metadata image routes 0, `new Request(` 0, ISR and cache APIs 0, `NextResponse.redirect(` 0. Edge runtime declarations: 1 (`src/pages/api/interactions-edge.ts`, which sets no cookie).
- **Images.** `next.config.js` allows `cdn.discordapp.com` and `cdn.jsdelivr.net` as remote image hosts. Most `next/image` uses pass `unoptimized`; some do not (for example the three in `src/utils/markdown/rules.tsx`), so `/_next/image` is in use.
- **Sign-in.** `src/server/auth.ts` configures one provider, Discord, with a database adapter and no JWT strategy. The source never calls `getToken` (count 0).
- **Database.** Postgres through Kysely (`project-utils` `dist/postgres.js`, `PostgresDialect`). The website's raw SQL is three `sql` template literals; the one interpolated value is a bound parameter. `sql.lit`, `sql.raw` and the JSON-path builder: count 0.

## Threat Model Summary

Dependency code matters where it meets input an attacker chooses. On this site that happens at four places: request headers and URLs on page renders (unauthenticated), tRPC inputs (signed-in; signing in needs only a Discord account), Discord interaction bodies (signature-checked), and Next.js's own request handling (unauthenticated). STRIDE over those: the reached findings are all denial of service. I found no reached advisory that discloses data, forges identity or runs code.

## Findings

Finding IDs are this document's own. Severity is the finding's severity on hooks.gg, which can differ from the advisory's rating.

### High Findings

| ID | Severity | Title | Category | Location | CVSS |
|----|----------|-------|----------|----------|------|
| H-002 | HIGH | Next.js 16.1.6 carries two App Router denial-of-service advisories with no precondition the site lacks | Denial of service in React Server Components handling (GHSA-q4gf-8mx6-v5v3, GHSA-8h8q-6873-q5fj; CWE-770) | `package.json` `next` (lockfile 16.1.6) | 7.5 (the advisories' own) |

H-001 HIGH CLOSED — an unauthenticated request header made a `/message` page render burn CPU for seconds to minutes, through `decode-uri-component` 0.4.1 under `query-string` (GHSA-vcc3-ghjq-m6fr, GHSA-qr28-fpjm-wq7f; `src/app/_components/Providers.tsx` `getMessage`). Fixed at website `7923a1d`, which removed the header's reader and `query-string`. Verified by this stage on production builds of base and fix: `security/closed/fix-message-page-header-decode-security-audit.md`, APPROVED. Released to website `master` at 2026-11-20T02:34:40Z: `deployment/closed/fix-message-page-header-decode-deployment.md`; origin `master` read `7923a1d9…` by `git ls-remote` in this session. That hooks.gg serves that commit rests on the push deploying through Vercel, which the deployment record accepts as written; no host was read. The finding's argument is in this document at record `4e876a7`.

**H-002 — status VERIFIED at website `d1bb9b0`; not on production until the `master` push.** Verified by this stage in `security/018-next-upgrade-save-size-cap-security-audit.md` (APPROVED): the chain lockfile resolves `next` 16.4.6 alone, and the audit at that lockfile holds none of the 42 Next.js entries. As at the first pass, no request was exercised, because the advisories publish none. Routed by the owner's selection, `steering/website-deps-review-rulings.md`, block 2026-11-20T01:59Z, question "H-002/M-001", option chosen "Agent: separate chain after H-001 (Recommended)": the Next.js upgrade gets its own chain, opened by steering once H-001 ships. H-001 shipped at 2026-11-20T02:34:40Z, and the chain is 018 (`planning/018-next-upgrade-save-size-cap.md`).

- **How it is reached.** Both advisories say a crafted request to "any App Router Server Function endpoint" costs excessive CPU while it is deserialised, and name one precondition: the App Router. The site's pages are App Router pages. Unlike the Server Action advisories beside them (GHSA-m99w-x7hq-7vfj, GHSA-p3m5-59mp-jv5r), these two do not say that an application without Server Actions is safe, so I do not assume it, although the source has no `use server` directive.
- **Not exercised.** The advisories publish no request, so reachability rests on their text.
- **Platform mitigation, partial.** Vercel's own page on the first of the two (CVE-2026-23869, `https://vercel.com/changelog/summary-of-cve-2026-23869`, fetched this session by a helper, sentences quoted as it returned them) says rules were "deployed … to the Vercel WAF to automatically protect all projects hosted on Vercel at no cost" and also "do not rely on the WAF for full protection". The page does not mention the second (CVE-2026-23870, GHSA-8h8q-6873-q5fj).
- **Remediation path** (not done): `next` 16.2.5 or later is the first version both advisories call patched (GHSA-q4gf-8mx6-v5v3 from 16.2.3, GHSA-8h8q-6873-q5fj from 16.2.5). `next` 16.4.5 or later clears all 42 Next.js entries in this audit.

### Medium Findings

| ID | Severity | Title | Category | Location | CVSS |
|----|----------|-------|----------|----------|------|
| M-001 | MEDIUM | A signed-in user's 1 MB save request makes the server build a validation error of more than 100 MB | Resource exhaustion in `zod` 3.22.4 (GHSA-mrhx-c7xc-m3w5; CWE-770) | `src/server/api/routers/message.ts` `upsert`; `src/server/api/utils/shapes.ts` `optionalIdMessageShape` | 6.5 (AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H) |

**M-001 — status VERIFIED at website `d1bb9b0`; not on production until the `master` push.** Verified by this stage in `security/018-next-upgrade-save-size-cap-security-audit.md`, run 3: each of the four bodies in the table below, sent through the procedure's own caller, is now refused with 1 issue and 159 to 192 characters of text in 50 to 64 ms, and no save is refused with more than 21 issues. zod stays at 3.22.4, pinned exactly, so its advisory stays in the audit; the product now bounds what reaches it. What the cap leaves is that document's L-001 (LOW): one request can carry about 1,050 saves. Routed by the owner's selection, same block and option as H-002: the save-size cap rode chain 018.

- **How it is reached.** `message.upsert` is a `protectedProcedure`, so the caller must be signed in; any Discord account can sign in. Its input is parsed by `optionalIdMessageShape`. zod 3.22.4 records one issue for every failing array element and does not stop early, with or without a `.max()` on the array. The Pages Router's body parser accepts up to 1 MB by default (`next/dist/server/api-utils/node/api-resolver.js`: `'1mb'`), and no route in the source sets `sizeLimit`.
- **What it costs.** Measured against the site's own schema in the isolated export (`zodSaveSchema.cost-probe.test.ts`, output `out/probe-zod-save-schema-983681c.txt`). A 1 MB body whose array holds about 524,000 failing elements:

  | Array filled | Issues | Parse | `ZodError.message` | Heap growth |
  |---|---|---|---|---|
  | `allowed_mentions.users` | 524,255 | 0.6 s | 119 MB, 1.0 s to build | 336 MB |
  | `embeds` | 524,266 | 0.5 s | 106 MB, 1.1 s | 187 MB |
  | `components` | 524,264 | 0.6 s | 108 MB, 0.9 s | 164 MB |
  | a container's `components` | 524,250 | 0.7 s | 124 MB, 1.1 s | not read (a collection ran mid-measure) |

- **Why the message size matters.** tRPC 11.10.0's `TRPCError` takes its message from its cause when none is given, and its error shape returns `message: error.message`; the site's `errorFormatter` returns the shape unchanged (`src/server/api/trpc.ts`). `ZodError.message` is the JSON of every issue. So the server builds that string to answer. This step is read from code, not run: I did not send the request over HTTP, which needs a session and a database.
- **Risk.** Each such request costs about 1.5 s of CPU and several hundred megabytes in one function instance. It needs an account, and it affects one instance at a time.
- **Remediation paths** (not done): the advisory's patched version is zod 4.6.6, a major version above 3.22.4. The lighter route is in the product: refuse an oversized array before the element schemas run, or lower the body limit on the tRPC route. Either is a code change with its own tests.

### Critical and Low Findings

None. The 8 critical advisories are dispositioned below; none is reached.

## Disposition of every advisory

This section is the state at `983681c`. At `7923a1d` the audit holds 127 entries, 3 of them reached; that table is `verification/fix-message-page-header-decode/security/out/pnpm-audit-prod-7923a1d-disposition-summary.txt`, and later stage documents are authoritative on each finding's current state.

**What was counted.** `pnpm audit --prod --json`, run in `website` at `983681c` on 2026-11-20T01:37:31Z, exit 1, raw output `out/pnpm-audit-prod-983681c.json`. It holds 141 advisory entries with 119 distinct GHSA ids, in 34 packages. Its own summary says 8 critical, 76 high, 50 moderate, 12 low, which sums to 146: that summary counts an entry once per installed version it matches. By entry the figures are 8, 72, 49 and 12. The brief's counts are the summary's and match. Both countings are in `out/pnpm-audit-prod-983681c-disposition-summary.txt`, produced by `apply-dispositions.js` from `dispositions.json`, which fails if any entry lacks a disposition.

**The seven dispositions.**

| Disposition | Meaning | Critical | High | Moderate | Low | Entries |
|---|---|---|---|---|---|---|
| REACHED | Vulnerable code runs on hooks.gg on input an attacker chooses | 0 | 4 | 1 | 0 | 5 |
| CONDITIONAL | The code runs, but harm needs a condition that is absent or that I could not establish | 0 | 3 | 1 | 1 | 5 |
| HOST | Reached only where Next.js serves itself (`next start`); hooks.gg is on Vercel | 2 | 5 | 6 | 0 | 13 |
| ABSENT | Shipped, but the feature, function or input the advisory needs is not there | 5 | 23 | 23 | 5 | 56 |
| DEV | The `next dev` server only | 0 | 0 | 0 | 2 | 2 |
| BUILD | Runs only during install or build, over the repository's own files | 0 | 19 | 8 | 1 | 28 |
| UNLOADED | Installed, never loaded by the website | 1 | 18 | 10 | 3 | 32 |
| All | | 8 | 72 | 49 | 12 | 141 |

**The 8 critical advisories.**

| Package | Advisory | Disposition | Why |
|---|---|---|---|
| `next` 16.1.6 | GHSA-2464-fhr4-w9xw, remote code execution in image optimisation of SVG | HOST | Next's own optimiser runs only where Next serves `/_next/image`. On Vercel the platform's image service answers that path. The advisory is silent on managed hosting (A-1). |
| `next` 16.1.6 | GHSA-2xp9-vwfh-vxw4, remote code execution in image optimisation of AVIF | HOST | Same as above (A-1). |
| `next` 16.1.6 | GHSA-673q-mjm6-r5xr, remote code execution in `use cache` functions | ABSENT | Needs Cache Components and a `use cache` function; the source has neither. The advisory adds "upgrade immediately even if your application does not have similar functions". |
| `next` 16.1.6 | GHSA-p293-qw3h-jr36, remote code execution on Windows-hosted servers | ABSENT | Needs a Windows filesystem. |
| `next-auth` 4.24.5 | GHSA-7rqj-j65f-68wh, email sign-in homoglyph bypass | ABSENT | Needs the email provider; only Discord is configured. |
| `fast-xml-parser` 4.2.5 | GHSA-m7jm-9gc2-mpf2, entity encoding bypass | ABSENT | The parser reads only the object store's answers; an attacker would have to control the storage provider. |
| `form-data` 4.0.0 | GHSA-fjxv-7rqg-78g4, predictable multipart boundary | ABSENT | A form is built only after `addFile`, which has no caller. |
| `form-data` 3.0.1 | GHSA-fjxv-7rqg-78g4, same | UNLOADED | Installed under `pusher > @types/node-fetch`, which is type declarations only. |

**By package.** "Ships to" says where the package's code runs for hooks.gg. Counts are entries, from `out/pnpm-audit-prod-983681c-module-by-disposition.tsv`.

| Package (installed) | Entries | Ships to | Disposition | How it is reached, or why not |
|---|---|---|---|---|
| `decode-uri-component` 0.4.1, via `query-string` | 2 | Server | REACHED | H-001. |
| `zod` 3.22.4, direct | 1 | Server and browser | REACHED | M-001. In the browser a user can only slow their own tab. |
| `next` 16.1.6, direct | 42 | Server | 2 REACHED, 5 CONDITIONAL, 10 HOST, 23 ABSENT, 2 DEV | See the Next.js table below. |
| `next-auth` 4.24.5, direct | 4 | Server | ABSENT | Two need the email provider, one needs the app to call `getToken()`, one needs several OAuth providers with account linking. One provider, Discord; `getToken` count 0. |
| `jose` 4.12.2, via `next-auth` | 1 | Server | ABSENT | Needs a JWE that decrypts. Sessions are database sessions; the only encrypted tokens are next-auth's own sign-in check cookies, unforgeable without the server secret. |
| `cookie` 0.5.0, via `next-auth` | 1 | Server | ABSENT | Cookie names, paths and domains are fixed by configuration. |
| `kysely` 0.26.1, direct | 3 | Server | ABSENT | One advisory is MySQL-only; two need the JSON-path builder or `sql.lit`. The dialect is Postgres and neither API is used. |
| `fast-xml-parser` 4.2.5, via `@aws-sdk/client-s3` | 7 | Server | ABSENT | The SDK uses `XMLParser` only, over the storage provider's answers. Two of the seven concern `XMLBuilder`, which nothing calls. |
| `@smithy/config-resolver` 2.0.1, via `@aws-sdk/client-s3` | 1 | Server | ABSENT | The region is the literal `'us-east-1'`. |
| `uuid` 8.3.2 and 9.0.0 | 1 | Server | ABSENT | The AWS retry middleware calls `v4()` with no buffer; the advisory needs v3, v5 or v6 with one. The 9.0.0 copy is in the unloaded Prisma generator chain. |
| `form-data` 4.0.0, direct | 2 | Server | ABSENT | Never constructed: `addFile` has no caller. |
| `form-data` 3.0.1, via `pusher > @types/node-fetch` | 2 | Nowhere | UNLOADED | Type declarations only. |
| `nanoid` 4.0.2, direct | 4 | Server | ABSENT | `customAlphabet(alphabet, 7)`: the size is a literal. |
| `nanoid` 3.3.6, via Tailwind's PostCSS | 4 | Build | BUILD | Build tooling. |
| `ws` 8.13.0, via `@vercel/functions` | 3 | Server | ABSENT | Loaded by a dynamic import inside the package's websocket helper; the site calls only `waitUntil`. |
| `ws` 7.5.9, via `@next/bundle-analyzer` | 2 | Build | BUILD | Required only when `ANALYZE=true` on a webpack build. |
| `cross-spawn` 7.0.3, via `@vercel/functions > @vercel/oidc` | 1 | Server | ABSENT | The package's main entry does not load its `oidc` entry. |
| `sharp` 0.32.6 (direct) and 0.34.5 (via `next`) | 3 | Server | HOST | The site imports `sharp` nowhere. Next's optimiser uses 0.34.5, on a self-hosted server only. The direct 0.32.6 is used by nothing. |
| `tar-fs` 2.1.1 and 3.0.4, via `sharp` 0.32.6 | 6 | Build | BUILD | Unpacks sharp's prebuilt binary during install. |
| `js-cookie` 3.0.5 (direct) and 2.2.1 (via `react-use`) | 1 | Browser | ABSENT | Only `Cookies.get` is called; the advisory needs an attributes object passed to `set` or `remove`. |
| `lodash` 4.17.21, via `@hello-pangea/color-picker` | 2 | Browser and server render | ABSENT | The picker imports `debounce`, `each`, `isEqual`, `merge`; the advisories concern `template`, `unset`, `omit`, `pullAt`. |
| `@babel/runtime` 7.23.4, via `@hello-pangea/color-picker` | 1 | Browser and server render | ABSENT | Only the `defineProperty` and `extends` helpers are imported. |
| `fast-loops` 1.1.3, via `react-use > nano-css` | 1 | Browser | ABSENT | None of the twelve `react-use` hooks the site imports uses `nano-css`. |
| `sanitize-html` 2.10.0, direct | 6 | Nowhere | UNLOADED | Imported nowhere; its one mention is in a commented-out block of `JsonModalBody.tsx`. |
| `brace-expansion` 1.1.11 and 2.0.1; `minimatch` 3.1.2 and 5.1.6; `tmp` 0.2.1 — via `project-utils > prisma-kysely` | 16, 6, 2 | Nowhere | UNLOADED | `prisma-kysely` is a code generator. `project-utils`' committed `dist` requires only `pg`, `kysely`, `zod` and its own files. |
| `braces`, `micromatch`, `picomatch`, `postcss`, `postcss-selector-parser`, `source-map-js`, `yaml`, `diff` — via `@headlessui/tailwindcss > tailwindcss` | 1, 1, 2, 4, 1, 1, 1, 1 | Build | BUILD | Tailwind runs while building, over the repository's own files. |
| `immutable` 4.1.0, via `sass` | 3 | Build | BUILD | Sass compiles the repository's own stylesheets. |
| `baseline-browser-mapping` 2.10.0, via `next` | 1 | Build | BUILD | Browser-support data read while building. |

**Next.js 16.1.6, its 42 entries.**

| Disposition | Advisories | Reason |
|---|---|---|
| REACHED (2) | GHSA-q4gf-8mx6-v5v3, GHSA-8h8q-6873-q5fj | H-002. |
| CONDITIONAL (5) | GHSA-267c-6grr-h53f, GHSA-26hh-7cqf-hhc6, GHSA-492v-c6pp-mqqv (middleware bypasses) | The middleware can be skipped, and it authorises nothing. Access to a message is decided in the tRPC procedures. Skipping it has one effect worth knowing: it is another way for `x-query-params` to arrive unset by the server, which H-001 already covers. |
| | GHSA-wfc6-r584-vfw7, GHSA-vfv6-92ff-j949 (Server Component cache poisoning) | Needs a shared cache in front that does not separate Server Component responses from HTML. The only cache in front is Vercel's own (A-2). |
| HOST (10) | GHSA-2464-fhr4-w9xw, GHSA-2xp9-vwfh-vxw4, GHSA-cjq9-62q9-8jv4, GHSA-3x4c-7xq6-9pq8, GHSA-7qx7-33qx-rqx2, GHSA-h64f-5h5j-jqjh, GHSA-q8wf-6r8g-63ch (image optimiser) | Next's optimiser runs only on a self-hosted server. Four of the seven say so in their own text; the two critical ones and the request-forgery one are silent (A-1). |
| | GHSA-c4j6-fc7j-m34r, GHSA-4jqv-mc3x-m676, GHSA-pc58-hwjq-p385 | Each is scoped by its own text to self-hosted servers. |
| DEV (2) | GHSA-39w2-rjm5-chcv, GHSA-jcc7-9wpm-mj36 | `next dev` only. The first applies to this box while a local dev server runs (I-3). The second also needs `allowedDevOrigins`, which is not set. |
| ABSENT (23) | Server Actions: GHSA-m99w-x7hq-7vfj, GHSA-p3m5-59mp-jv5r, GHSA-89xv-2m56-2m9x, GHSA-4c39-4ccg-62r3, GHSA-mq59-m269-xvcx, GHSA-955p-x3mx-jcvp | No `use server` directive. |
| | Cache Components and `use cache`: GHSA-673q-mjm6-r5xr, GHSA-mg66-mrh9-m8jx, GHSA-h27x-g6w4-24gq, GHSA-rhh4-g77r-r9qj | Not enabled; no `use cache`. |
| | Internationalisation: GHSA-36qx-fr4f-26g5, GHSA-6gpp-xcg3-4w24 | No `i18n` key. |
| | Rewrites and redirects: GHSA-p9j2-gv94-2wf4, GHSA-ggv3-7p47-pfv8, GHSA-3g8h-86w9-wvmq | No rewrites; both config redirects have fixed hosts; the middleware never redirects. |
| | Cached server fetch: GHSA-4633-3j49-mh5q, GHSA-68g3-v927-f742 | No fetch opts into caching; no `new Request(`. |
| | Other features: GHSA-f3mh-rxg3-f5g2 (cookie on an Edge route), GHSA-f87g-xv8r-7p7x (metadata image routes), GHSA-ffhc-5mcf-pf4q (CSP nonces), GHSA-gx5p-jg67-6x7h (`next/script`), GHSA-mcj8-r9mp-w47p (root catch-all page), GHSA-p293-qw3h-jr36 (Windows host) | Each feature is absent. |

## Assumptions Not Checked

Each names the check that would settle it and who can make it.

- **A-1. Vercel's image service, not the site's Next.js, answers `/_next/image` on hooks.gg.** It rests on DNS pointing at Vercel and on three sibling advisories that say Vercel is not impacted for the same endpoint. Thirteen HOST dispositions, two of them critical, depend on it. Settled by one image response's headers from hooks.gg, which is a request to production, or by a read-only read of the Vercel project. Steering makes that read with `vercel api` (`steering/website-deps-review-rulings.md`, block 2026-11-20T01:59Z, "Next"); the HOST dispositions are re-read against its result when it is recorded. Steering's read at 2026-11-20T02:18Z was one image request to hooks.gg at `983681c`, not `vercel api`: 200, `server: Vercel`, a single-hop id and no matched path. Steering reads that as consistent with Vercel's image service and not as proof (rulings block 2026-11-20T02:18Z). The deciding read is the same request after the push; the HOST dispositions stand on their first basis until then.
  **Corrected 2026-11-20T02:39.** The sentence before this note is wrong for this assumption, and the error is mine. The request after the push is row P-1 of `handoff/message-page-header-decode-post-deploy-2026-11-20.md`, and it decides a different question: whether images still answer once the direct `sharp` is gone. Vercel's image service and Next.js's own optimiser would both answer it 200, the second from its own `sharp` 0.34.5 as it did on this box (`security/closed/fix-message-page-header-decode-security-audit.md`, run 6). So a 200 does not say which of the two answered. The sentence was defensible only as a copy of steering's wording for its confirmation (a) at rulings block 2026-11-20T02:18Z, where the question was the removed `sharp`; I wrote it under this question without checking that the read could tell the two apart. A-1 is still not settled. What settles it is a read of the Vercel project, the `vercel api` read that rulings block 2026-11-20T01:59Z names; no later block of that file records it made (`grep -c "vercel api"` over the file: 1, that block's line). It becomes moot for the ten Next.js HOST entries, both critical ones among them, if the H-002 chain raises `next` to 16.4.5 or later (H-002, remediation path). The 13 HOST dispositions stand on their first basis.
  **2026-11-20T07:02: the read is made, and the assumption ends with chain 018's release.** Steering read the Vercel project and its production deployment at 02:46Z (`verification/website-deps-review/scoping/a1-vercel-image-config.json`; rulings block 2026-11-20T02:53Z). The deployment record carries a platform `images` block with the two remote patterns of `next.config.js`. Steering reads that as Vercel's image service answering `/_next/image`, and I read it the same way; it is an inference from the deployment record, not a request trace. At website `d1bb9b0` the audit holds no HOST entry at all: the ten Next.js ones and the three `sharp` ones are gone (`security/018-next-upgrade-save-size-cap-security-audit.md`, run 2). So once `d1bb9b0` is released nothing in the audit rests on A-1, and it ends there. If 018 is not released, A-1 stays as this note leaves it: supported by the read, not proved.
- **A-2. Vercel's cache keeps Server Component responses apart from HTML.** Two CONDITIONAL dispositions depend on it. I attempted no check and know of none. The production build lists `/`, `/legal/privacy`, `/legal/terms` and `/preview` as static pages (`verification/fix-message-page-header-decode/security/out/next-build-983681c.txt`), so cached pages exist for such an attack to aim at. **2026-11-20T07:02: ends with chain 018's release.** The two entries that depend on it (GHSA-wfc6-r584-vfw7, GHSA-vfv6-92ff-j949) are not in the audit at website `d1bb9b0`, where Next.js is 16.4.6. No check of Vercel's cache was ever made. If 018 is not released, A-2 stays unchecked as written.
- A-3 SETTLED — production is the Vercel project. Steering's read of 02:46Z shows the project `hooks-gg-website` (framework `nextjs`) with its production target a READY deployment of website `7923a1d9…` (`verification/website-deps-review/scoping/a1-vercel-image-config.json`), and DNS points at Vercel. Nothing read shows the PM2 path of `ecosystem.config.json` in use.
- A-4 RETIRED — whether Vercel passes a client's `x-query-params` header through to the function was never read, and no longer decides anything: at website `7923a1d` the header has no reader (`git grep -c "x-query-params" 7923a1d`: 1 in `src/middleware.ts`, the writer, and 3 in the fix's test file). Steering dropped the post-deploy read on that ground (`steering/website-deps-review-rulings.md`, block 2026-11-20T02:30Z). So H-001's reach on production at `983681c` stays read from code, not observed.

## Informational

- **I-1. The PM2 path would change the picture.** If the site were ever served by `next start` as `ecosystem.config.json` describes, the 13 HOST entries become live, including both critical image-optimiser advisories. The allowed image hosts make that worse: `cdn.discordapp.com` serves files any Discord user uploads, and `cdn.jsdelivr.net` serves any published package file. **2026-11-20T07:02: carried.** At website `d1bb9b0` no HOST entry remains, so nothing listed today would become live. The standing point, that every disposition here assumes Vercel hosting, is routed to the architect by one `INBOX.md` entry (2026-11-20, security-hooks-website-deps).
- **I-2. Three declared dependencies are not used.** `sanitize-html` (6 entries) is imported nowhere. The direct `sharp` 0.32.6 is imported nowhere and brings `tar-fs` (6 entries; sharp's own 3 entries stay, because Next.js brings its own copy). The direct `form-data` backs a file-attachment path with no caller (2 entries). `project-utils` declares the generator `prisma-kysely` as a runtime dependency, which brings 24 entries into the website's production graph. Routed: the owner's selection (`steering/website-deps-review-rulings.md`, block 2026-11-20T01:59Z, question "Unused deps", option chosen "Agent: remove in H-001's chain (Recommended)") has the H-001 fixer drop the three from `package.json`. The `prisma-kysely` declaration is in `project-utils` and is not part of that selection; it is carried by item 4 of `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md` (2026-11-20T07:02; plan 018's exclusion X-4 had named this document as its carrier). Outcome at website `7923a1d`: `sanitize-html`, `@types/sanitize-html`, the direct `sharp` and `query-string` are removed. `form-data` is kept by his second selection (rulings block 2026-11-20T02:03Z): it is imported by `bot/utils/DiscordMessage.ts`, though the form it builds has no caller.
- **I-3. A dev-server advisory applies to this box.** GHSA-39w2-rjm5-chcv lets a hostile page, opened in a browser on a machine running `next dev`, read the project path, source snippets and logs. Agents here run `next dev` and drive browsers. **2026-11-20T07:02: ended for the chain tree.** The advisory is not in the audit at website `d1bb9b0`, and the shared tree's `node_modules` already follows that lockfile (`steering/018-rulings.md`, block 2026-11-20T04:51Z). An export of an older commit served with `next dev` still carries it.
- **I-4. The audit's counts will move.** They are the registry's answer at 2026-11-20T01:37:31Z. The same lockfile will list more entries later with no change on our side. **2026-11-20T07:02:** a stated limit, with no end. The scheduled audit that would notice a new entry is item 6 of `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`.
- **I-5. The same header is trusted for routing.** `src/app/_navigation/Redirects/Server.tsx` reads `x-pathname` to decide a redirect for visitors with no session. A client can set it on paths the middleware does not match. It decides only a redirect, not access. **2026-11-20T07:02: carried** by item 2 of `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`. Plan 018 left it out (its exclusion X-5) and named this document as the carrier; the handoff takes it over.
- **I-6. `package.json`'s `overrides` key is not honoured by pnpm.** The key pins `semver`, and `pnpm-lock.yaml` has no `overrides:` section at `983681c` or `7923a1d`, so the pin has no effect. Found by the code reviewer of `fix-message-page-header-decode` and confirmed by this stage (`verification/fix-message-page-header-decode/security/out/static-checks-7923a1d.txt`). It is not a vulnerability. It matters to the chain that takes H-002 and M-001 if that chain pins a transitive version: the pin must be written where pnpm reads it, and proved from the lockfile. **2026-11-20T07:02: carried** by item 3 of the same handoff. Chain 018 pinned `zod` as a direct dependency and added no override; the dead key is still in `package.json` at `d1bb9b0`.

## Required Controls

This review imposes none on a release: `983681c` is already out. For the dependency set to be approved, H-001 must be fixed and re-reviewed. H-002 and M-001 are to be fixed in the chain that follows it. This review edits nothing.

2026-11-20T02:39: the H-001 part is discharged by `security/closed/fix-message-page-header-decode-security-audit.md` and the release at website `7923a1d`. What remains for approval is H-002 and M-001.

## Owner-needing items

All four were answered or routed on 2026-11-20T01:59Z; the record is `steering/website-deps-review-rulings.md`, that block. The questions as put are in this document at record `1248690`.

1. H-001's fix: ANSWERED — a fixer chain now, `fix-message-page-header-decode`, with the function change and the override.
2. H-002 and M-001: ANSWERED — a separate chain after H-001 ships.
3. Confirming A-1 and A-4: ROUTED, not asked of him — A-1 is steering's read-only `vercel api` read; A-4 goes into the H-001 chain's post-deploy reads. Since then (2026-11-20T02:39): A-4 is retired, and A-1's `vercel api` read is not recorded as made (see each under Assumptions Not Checked).
4. The unused dependencies in I-2: ANSWERED — `sanitize-html` and the direct `sharp` removed in H-001's chain; `form-data` kept, on a question re-put and answered at 02:03Z. Reconciled at the fix's security pass: this line first counted the direct `form-data`'s 2 entries among 14 leaving, which was right when the first answer covered all three packages. At `7923a1d` 14 entries did leave, a different 14: `tar-fs` 6, `sanitize-html` 6 and `decode-uri-component` 2.

## Testing Recommendations

- H-001: delivered at website `7923a1d` as `src/app/_components/__tests__/Providers.request-headers.test.ts`, seen to fail 4 of 4 with the test placed on `983681c` (`security/closed/fix-message-page-header-decode-security-audit.md`, run 3). It asserts that the providers render for a malformed header value and make no request from a `code` value. It holds no time bound, which this line first asked for: the timing was checked once, on production builds (that document, run 1), and the decoding library is out of the lockfile.
- M-001: a test that `message.upsert`'s input refuses an array of hundreds of thousands of elements without recording an issue per element. Delivered by chain 018 at website `d1bb9b0` (`src/server/api/routers/__tests__/message.save-limits.test.ts` and `user.save-limits.test.ts`, judged by its code review and QA, not by me); my own measurement at that tree is `security/018-next-upgrade-save-size-cap-security-audit.md`, run 3.
- A scheduled `pnpm audit --prod` whose new entries are read against this document's dispositions, so a new entry in a REACHED or CONDITIONAL package is noticed. Not built; carried by item 6 of `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`.

## Compliance Mapping

| Requirement | Standard | Status | Notes |
|-------------|----------|--------|-------|
| Vulnerable and outdated components | OWASP Top 10 2021, A06 | ❌ | 141 advisory entries in production dependencies; 5 reached. |
| Components are up to date | OWASP ASVS 4.0.3, V14.2.1 | ❌ | `next`, `next-auth`, `kysely`, `zod`, `decode-uri-component` and others are behind their patched versions. |
| Unneeded components are removed | OWASP ASVS 4.0.3, V14.2.2 | ❌ | I-2. |
| Flaw remediation; vulnerability scanning | NIST SP 800-53, SI-2 and RA-5 | Partial | This is the first recorded audit of the website's dependencies; nothing runs one on a schedule. |
| Continuous vulnerability management | CIS Controls v8, Control 7 | Partial | As above. |

## Process record

- **Set up and removed on this box.** An isolated export of `983681c` (`git archive`) under this session's scratchpad, installed with `pnpm install --frozen-lockfile --offline --ignore-scripts` (exit 0, log `out/isolated-install-983681c.log`). A `next dev` server on `127.0.0.1:39417` inside the systemd scope `deps-review-next-dev-983681c`, with `SKIP_ENV_VALIDATION=1` and no `.env` file present (count 0). The scope was stopped; afterwards `ps -eo pid,ppid,lstart,args` matched no `next dev` or `next-server` process, `ss -ltn` showed no listener on 39417, and the scope read `inactive`. The export and its logs were then deleted. The probes ran in capped scopes (`systemd-run --user --scope` with `RuntimeMaxSec`, `MemoryMax`, `TasksMax`).
- **Nothing written to the website tree.** `git -C website status --short` read `?? .playwright-mcp/` before and after, and `HEAD` stayed `983681c`. `package.json` and the lockfile were not edited. No `.env.local` value was read.
- **No request reached production.** The only network reads were the audit's registry query, two DNS lookups, and one fetch of a public Vercel changelog page by a helper.
- **Errors of mine, fixed in the round.** The first query-string probe had a syntax error and produced no figures; it was corrected and re-run. A first form of the zod probe used ts-node, which cannot load the schema because the schema's constants import an ES module; it produced no figures, was deleted, and was rewritten as a vitest file run inside the export only. `usage-evidence.sh` first carried a mis-quoted pattern for the Kysely JSON-path count; it was corrected and the whole script re-run, and the output file is the re-run's.
- **Instrument notes.** Every count in this document comes from a script that writes to a file under `verification/website-deps-review/security/`, read there; none is taken from filtered terminal output. Heap figures in M-001 are differences of `process.memoryUsage().heapUsed` without a forced collection, so they are rough; the issue counts and message sizes are exact.
- **A premise of mine was wrong, corrected 2026-11-20 after the owner's selection.** This document and my message to steering said A-1 could be read only from the Vercel dashboard, "which only the owner can open". Steering holds a read-only `vercel api` path (`steering/017-standing.md`, "Vercel reads"), so the read is an agent's and was never his to make. It changed nothing he chose: steering routed the read itself and did not put it to him. The check that would have caught it: a search of the record for a Vercel read path before I wrote who could make the read. Swept as a class with `grep -n "only the owner\|is the owner's\.\|No check is available"` over this document: 3 lines before; 1 after, which is this line quoting the old words. A-1 and owner item 3 are corrected to name steering's read. A-2 said no check was available from this box; no attempt had been made, and it now says so.
- **The four owner-needing items were collapsed to dispositions in the same write.** What the removed text carried: each question's premises. They live on in the finding blocks (H-001, H-002, M-001), in I-2 and in the rulings block's quoted options.
- **My message to steering mis-stated I-2, recorded at the fix's security pass.** The message of 01:5xZ said `sanitize-html`, the direct `sharp` and the direct `form-data` "are declared and unused". This document said, correctly, that `form-data` backs a file-attachment path with no caller, which means it is imported. Steering put the message's wording to the owner, its scope sweep found the import, and the question was re-put at 02:03Z (rulings block of that time, which records the error as steering's for not marking the premise unread). The wording was mine. The check that would have caught it: reading I-2's own sentence against the message before sending it.
- **H-001's block was collapsed to its disposition line on 2026-11-20T02:39, with its table row.** What the removed text carried, and where each piece lives now: how the header was reached, the library and dev-server timings, the risk and the three remediation paths are in this document at record `4e876a7` (that revision written to a file with `git cat-file -p`, then `grep -c "Exercised end to end, locally"` over the file: 1), and the measurements' files are still listed in the appendix. The CVSS vector and CWE numbers are in that revision's table row. Remediation path 3's standing point, that `x-pathname` is client-controlled on paths the middleware does not match, is I-5. The dead `x-query-params` write left in the middleware is carried at `steering/website-deps-review-rulings.md`, block 2026-11-20T02:11Z. The owner's routing of the fix is item 1 under Owner-needing items.
- **A-4 was collapsed to a disposition line in the same write.** What the removed text carried: the read that would have settled it, one harmless request to production with a short well-formed header, and its routing into the fix chain's post-deploy reads. Both are in this document at record `4e876a7`; the routing ended with steering's ruling at block 2026-11-20T02:30Z.
- **A wrong sentence of mine under A-1, corrected 2026-11-20T02:39.** At the 02:23 round I wrote that the image request after the push is A-1's deciding read. It cannot decide A-1 (the note under A-1 says why). The check that would have caught it: asking what each of the two answers predicts for that request before calling it deciding. Swept as a class with `grep -n "deciding read\|post-deploy read\|after the push"` over this document before the correction: 5 lines. Dispositions: the A-1 line, corrected in place by a dated note; the A-4 line, retired; owner item 3, given a dated line; two lines of the old Resumption State, replaced. The closed fix audit uses the same phrase for the removed-`sharp` question, where it is right, so it is not changed. Steering's rulings file was not swept; it is steering's document, and the correction is in my report to steering.
- **Session start after the `/clear`, 2026-11-20T02:36.** Orphan check over `security/`: two open documents, both `Active`, none terminal, nothing moved. `node tools/check-repo.js` exited 0 (PASS) before my first write.
- **Seen at session start, not acted on.** `security/` held one other open document, `fix-personal-message-access-security-audit.md`, at Status `Active`; it was not terminal, so the orphan check moved nothing. It had left that path by the time this document was written.

## Appendix: evidence

All under `verification/website-deps-review/security/`.

| File | What it is |
|---|---|
| `out/pnpm-audit-prod-983681c.json`, `.exit`, `.stamp`, `.stderr` | The audit's raw output, exit status and time. |
| `tabulate-audit.js` → `out/…-advisories.tsv`, `…-packages.tsv`, `…-paths.tsv` | One row per entry, per package, per dependency path. |
| `dump-overviews.js` → `out/overviews-983681c/` | Each advisory's own text, one file per package. |
| `dispositions.json`, `apply-dispositions.js` → `out/…-dispositions.tsv`, `…-disposition-summary.txt`, `…-module-by-disposition.tsv` | The disposition of every entry, with its reason, and the counts. |
| `usage-evidence.sh` → `out/usage-evidence-983681c.txt` | Counts of each advisory precondition in the source, and the dependency-internal reads. |
| `out/import-sites-983681c.txt` | Which source files import each vulnerable package. |
| `probe-query-string-decode.mjs` → `out/probe-query-string-decode-983681c.txt` | H-001, library timing. |
| `request-x-query-params.sh` → `out/request-x-query-params-983681c.txt`, `out/next-dev-983681c.log` | H-001, end to end on a local dev server. |
| `zodSaveSchema.cost-probe.test.ts` → `out/probe-zod-save-schema-983681c.txt` | M-001, cost against the site's schema. |

## Resumption State

Rewritten 2026-11-20T07:02, after the pass on chain 018; the earlier texts are in this document at records `4e876a7` and `4bccf05`. Session `security-hooks-website-deps`, launched `--agent security`, cwd `/usr/local/bin/hooks/website`.

**Done.**
- The dependency review at website `983681c`: this document, first committed at agent-output `1248690`. All 141 advisory entries are dispositioned.
- The owner's routing recorded (`8fd74ff`): rulings in `steering/website-deps-review-rulings.md`, blocks 2026-11-20T01:59Z and 02:03Z.
- Security on the H-001 fix: `security/closed/fix-message-page-header-decode-security-audit.md`, APPROVED at website `7923a1d`, closed `Review Complete` at agent-output `cd2e816`.
- H-001 CLOSED here by the release of website `7923a1d` (2026-11-20T02:34:40Z).
- Security on chain 018's change: `security/018-next-upgrade-save-size-cap-security-audit.md`, APPROVED at website `d1bb9b0`. H-002 and M-001 VERIFIED here. Leftovers carried by `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`.

**Open in this document.**
- H-002 HIGH and M-001 MEDIUM: VERIFIED at `d1bb9b0`, not yet released.
- Nothing else is open: each assumption and informational item has its carrier or its end beside it.

**Next, when a brief arrives.**
1. If website `master` has moved to `d1bb9b0` (read `git ls-remote origin refs/heads/master` and chain 018's deployment record): set H-002 and M-001 to CLOSED here, collapse each block to one disposition line citing the release record, and state what each removed block carried. Then close this document and `security/018-next-upgrade-save-size-cap-security-audit.md`, one at a time (`Review Complete`, the record-closure skill). The 018 audit's L-001 and I-2 keep the handoff as carrier; its I-1 and I-4 are stated limits.
2. If the tip moves past `d1bb9b0` before the release, the 018 verdict has expired: re-review the delta. The instruments are under `verification/018/security/` and each carries its usage in its header.
3. If the release is abandoned: H-002 and M-001 go back to OPEN, A-1 and A-2 stay as their notes leave them, and this document stays `Active`.

**Approach that worked, for the next pass.** An isolated `git archive` export under the session scratchpad with `pnpm install --frozen-lockfile --offline --ignore-scripts`, no `.env` file and `SKIP_ENV_VALIDATION=1`; `next build` and `next start` on loopback inside `systemd-run --user --scope` caps; requests by `verification/website-deps-review/security/request-x-query-params.sh`.

**Tree at this write.** website branch `chain/018-next-upgrade-save-size-cap`, HEAD `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96`; origin `master` is `7923a1d9…`. This session wrote nothing there. agent-output `master`.

**Uncommitted or locally mutated:** one `INBOX.md` entry of mine for the architect, left uncommitted as the inbox rule has it. **Evidence run but not recorded:** none. **Processes and scratch:** no server, scope or export is left; the scratchpad is empty. **Questions awaiting an answer:** none. **Sessions messaged:** `steering-roadmap-hooks`; `devops-hooks-018` (the 018 report).
