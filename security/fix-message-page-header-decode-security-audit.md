---
ID: n/a
Origin: fix-message-page-header-decode
UUID: c8a9f0ca
Status: Active
Status-Detail: "APPROVED at website 7923a1d. The change closes H-001 of security/website-deps-review-security-audit.md: exercised on production builds of base and fix on this box. No finding against the change and no control owed before the website master push. Two post-deploy reads already carried by steering are relied on: one /_next/image request, and the harmless header request. The document closes when the chain closes."
Reviewed-At: "7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe — repos=website; base 983681c (origin/master)"
Kind: code-audit
---

# Security Assessment: website — the message-page providers no longer decode a client-sent header (fixer chain fix-message-page-header-decode)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T02:22 | code-reviewer-hooks-fix-message-page-header-decode → security-hooks-website-deps (message 02:1xZ; code review record `d67e7d5`, APPROVED at `7923a1d`; stage set in `steering/website-deps-review-rulings.md`, block 2026-11-20T02:03Z) | Security on the change `983681c..7923a1d` | Initial assessment. Verdict APPROVED. H-001 exercised on production builds: base slow, fix flat. Audit at the fix lockfile: 127 entries, 14 fewer, none new. No finding against the change. |
| 2026-11-20T02:34 | steering-roadmap-hooks → security-hooks-website-deps (message, "run /checkpoint") | Wrap up for a clear | Checkpoint: Resumption State written at the end of this document. The verdict and its tree are unchanged. |

## Metadata

| Field | Value |
|-------|-------|
| Assessment Type | Targeted code review of one change, with its dependency delta (Phases 2 and 3) |
| Mode Determination | User-specified: the stage set names "security on the change" |
| Scope | website `983681c..7923a1d`: `src/app/_components/Providers.tsx`, its new test, `package.json`, `pnpm-lock.yaml`. Read for reach, unchanged by the diff: `src/middleware.ts`, `src/utils/getBaseUrl.ts`, `src/app/message/layout.tsx`. |
| Not covered | Vercel's own handling of headers and of `/_next/image`; the full suite and typecheck, which the code reviewer ran (1913 of 1913, exit 0; typecheck 0); H-002 and M-001 of the dependency review, which a later chain takes. |

## Executive Summary

The change removes the one place where a header a visitor sends was decoded by an outdated library. I built the base and the fix for production in isolated exports and sent both the same requests on this box. The base took 0.84 s for a 1 KB header and 3.2 s for 2 KB. The fix answered in 0.02 s for every size up to 8 KB. The change only deletes: it adds no input handling, no request and no dependency.

**Overall Risk Rating**: LOW
**Verdict**: APPROVED

The verdict binds to website `7923a1d`. A change to any file under review expires it.

## What the change is

`git diff --numstat 983681c 7923a1d`: `Providers.tsx` 1 added and 15 removed, the new test 51 added, `package.json` 4 removed, `pnpm-lock.yaml` 338 removed and 0 added. One commit, `7923a1d`, on `chain/fix-message-page-header-decode`; `983681c` is its ancestor (`git merge-base --is-ancestor`, exit 0) and is `origin/master`.

- `Providers.tsx`: the function `getMessage`, the `query-string` import and the read of `x-query-params` are gone. `Providers` now awaits the session alone.
- `package.json`: `query-string`, `sanitize-html`, the direct `sharp` and `@types/sanitize-html` are removed. `form-data` stays, by the owner's selection (rulings block 2026-11-20T02:03Z).

## The property, applied to every act of the changed component

**Property.** `Providers` takes nothing from the request except the `cookie` header, and uses it for one thing: a request to the site's own session endpoint. It decodes, parses and builds a request from no other client value.

Every act of `Providers.tsx` at `7923a1d`, by name (`out/static-checks-7923a1d.txt`):

| Act | Input | Holds? |
|---|---|---|
| `headers()` | the request's headers | Read only. |
| `hdrs.get('cookie')` | the visitor's own cookie | Passed unparsed to `getSession`. An empty value returns before any request. |
| `fetch` in `getSession` | `${getBaseUrl()}/api/auth/session?hydrate=true`, with the cookie as a header | The origin comes from the environment (`VERCEL_URL`, a fixed preview host, or localhost), never from the request (`src/utils/getBaseUrl.ts`, unchanged by the diff). The path is a literal. |
| `response.json()` | the session endpoint's own answer | Not client-chosen. A failure is caught and yields no session. |
| render | `children` and the session | No client header reaches it. |

`x-query-params` now has no reader anywhere outside tests (`git grep` at `7923a1d`: one writer, `src/middleware.ts`, no reader). No file imports a removed package, statically, dynamically or by `require` (0 matches over every tracked file but the lockfile).

## What was run

All on this box, in two `git archive` exports under the session scratchpad, each with its own `pnpm install --frozen-lockfile --offline --ignore-scripts` (both exit 0) and no `.env` file. Nothing was sent to hooks.gg. Captures are under `verification/fix-message-page-header-decode/security/out/`.

**1. The header requests, on production builds.** `next build` exited 0 for both trees (`next-build-983681c.txt`, `next-build-7923a1d.txt`), and both list `/message/m/[id]/edit` as a dynamic route behind the middleware. Each was served by `next start` on loopback and sent the same requests to `/message/m/0/edit` by `verification/website-deps-review/security/request-x-query-params.sh`:

| Request | Base `983681c` | Fix `7923a1d` |
|---|---|---|
| No header | 0.02 s | 0.02 s |
| 1 KB header, no query string | 0.84 s | 0.02 s |
| 2 KB header, no query string | 3.20 s | 0.02 s |
| 4 KB header, no query string | not sent | 0.02 s |
| 8 KB header, no query string | not sent | 0.02 s |
| 2 KB header with `?a=1` (the middleware overwrites it) | 0.02 s | 0.02 s |

Every answer was 200. This is the production-build check the chain's scoping recorded as not completed. The base figures match the library timings in the dependency review (0.7 s and 3.3 s), so the dev-server figures there overstated the cost by the dev server's own overhead, not the defect.

**2. A malformed value.** `x-query-params: %E0%A4%A` on the base logged `URIError: URI malformed` in the server log (`next-start-983681c.txt`, 1 line); the fix logged none. Both answered 200, because the page's status is sent before the failing part renders, so the status alone does not show this.

**3. The change's own test.** `Providers.request-headers.test.ts` at the base plus the test: exit 1, 4 of 4 failed (two `URIError: URI malformed`, two `expected [ Array(1) ] to deeply equal []`). At the fix: exit 0, 4 of 4 passed (`providers-test-983681c.json`, `providers-test-7923a1d.json`).

**4. The lockfile.** By key set, with my own instrument (`lockfile-key-sets.js`): 4 direct dependencies removed, 43 `packages` keys and 43 `snapshots` keys removed, 0 added in each, so no version moved. `decode-uri-component`, `query-string`, `sanitize-html`, `sharp@0.32`, `tar-fs` and `prebuild-install` each count 0 lines in the fix lockfile; `sharp@0.34.5`, Next.js's own copy, counts 2 in both.

**5. The audit at the fix lockfile.** `pnpm audit --prod --json` (time in `pnpm-audit-prod-7923a1d.stamp`), exit 1: 127 entries, against 141 at the base. The 14 that left are `tar-fs` 6, `sanitize-html` 6 and `decode-uri-component` 2. No entry is new (`audit-entry-delta-983681c-7923a1d.txt`). By the dependency review's dispositions, 3 entries remain reached, where there were 5: the two Next.js ones (H-002) and zod (M-001).

**6. Images without the direct `sharp`.** `/_next/image?url=%2Fassets%2Fcolor_circle.png&w=64&q=75` answered 200, `image/png`, 2948 bytes on both builds. So Next.js's own optimiser works from its own `sharp` 0.34.5 where Next.js serves itself. What Vercel does is not shown by this (below).

## Findings

None against the change, at any severity.

### Informational

| ID | Severity | Title | Location | Note |
|----|----------|-------|----------|------|
| I-1 | INFO | The removed function also built a server-side request from the visitor's value | `src/app/_components/Providers.tsx` `getMessage`, at `983681c` only | With `code=…` in the header, the base requested `${getBaseUrl()}/api/messages/codes/<code>` from the server and discarded the answer. The code was placed in the path unescaped, so a value such as `../auth/session` chose another path on the site's own origin. The request went only to the site itself and nothing came back to the visitor. The fixer's test found it; the dependency review's H-001 did not name it. The same deletion closes it, and the test's last two cases hold it closed. |
| I-2 | INFO | The middleware still writes a header nothing reads | `src/middleware.ts` `middleware` | The write of `x-query-params` is dead. It is harmless. Carrier: `steering/website-deps-review-rulings.md`, block 2026-11-20T02:11Z, which leaves it. |
| I-3 | INFO | `package.json`'s `overrides` key does nothing under pnpm | `package.json` `overrides`; `pnpm-lock.yaml` has no `overrides:` section | Found by the code reviewer and confirmed here (`grep` of the fix lockfile: `patchedDependencies:` only). This change adds no override, so nothing in it depends on the key. It matters to the next chain if that chain pins a transitive version. Carrier: `security/website-deps-review-security-audit.md`, I-6. |

## Required Controls

None before the push.

## Relied on, not checked here

- **Vercel serves `/_next/image` without the site's direct `sharp`.** If that were false, images drawn through `next/image` would fail after the deploy; that is an availability fault, not an exposure. Steering read one image request on production before the push (rulings block 2026-11-20T02:18Z: 200, `server: Vercel`) and carries the same read after the push into the devops brief as a post-deploy row. That row is the deciding read.
- **The fix reaches production only by the push.** Until then hooks.gg runs `983681c`, and H-001 is live there.
- **Whether a visitor's header reaches the function on Vercel.** It no longer matters to the fix, which reads no such header. Steering's harmless post-deploy request records it for the record's sake.

## Testing Recommendations

None owed. The change's test drives the composed component with the header and holds both acts closed. A request through the real middleware is covered by run 1 above, which is a one-time check and not a suite test.

## Compliance Mapping

| Requirement | Standard | Status | Notes |
|-------------|----------|--------|-------|
| Vulnerable and outdated components | OWASP Top 10 2021, A06 | Improved | The one reached outdated parser is out of the tree; 127 entries remain, 3 reached. |
| Unneeded components are removed | OWASP ASVS 4.0.3, V14.2.2 | Improved | Three unused packages removed. |
| Server-side request forgery | OWASP Top 10 2021, A10 | ✅ for this component | I-1's path is deleted; the one remaining server-side request has a fixed path and an environment origin. |

## Process record

- **Set up and removed on this box.** Two exports under the session scratchpad; two `next build` runs in capped scopes; two `next start` servers on `127.0.0.1:39417` and `:39418` in the scopes `hdr-fix-security-next-start-983681c` and `-7923a1d`. Both were stopped; `out/servers-stopped.txt` holds the `ps` listing with no match, 0 listeners and both scopes `inactive`. The exports were then deleted.
- **The shared tree was not moved or written.** `git rev-parse HEAD` and `git status --short` were captured before and after and compare equal (`tree-identity-start.txt`, `tree-identity-end.txt`): `7923a1d`, with `?? .playwright-mcp/`, which is another session's.
- **An instrument error of mine, fixed in the round.** My first lockfile comparison missed `snapshots` keys written `key: {}` and reported 22 removed. The corrected instrument reports 43, and the output file is the corrected run's.
- **An instrument extended.** `verification/website-deps-review/security/apply-dispositions.js` gained an `--allow-unused` argument, for a tree where a fix removed packages. Without the argument it reproduces the base table byte for byte (`cmp` exit 0).
- **Builds and the production rule.** The code reviewer did not build, because a build in the shared tree runs beside `.env.local`. My exports hold no `.env` file, so the builds had no configured host to reach. I did not check what a build fetches on its own, such as the web font the layout declares.

## Resumption State

Written 2026-11-20T02:34 at a checkpoint steering asked for. The full state of this session is in `security/website-deps-review-security-audit.md`, Resumption State.

- **Done:** the verdict above, APPROVED at website `7923a1d`, committed at agent-output `5640deb`; the devops spawn cue sent to steering.
- **Next:** nothing is owed before the push. If the tree under review moves past `7923a1d` before release, the verdict has expired and the delta is re-reviewed. When the chain closes, set `Status: Review Complete`, name the carrier of each relied-on post-deploy read, and move this file to `security/closed/`.
- **Nothing uncommitted, nothing running, no question open.**
