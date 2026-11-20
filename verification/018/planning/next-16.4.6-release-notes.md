# Next.js 16.1.6 (exclusive) to 16.4.6 (inclusive): release-note review

Judged against the eight surfaces in the brief. Not committed. Nothing under `website/` was edited.

Disclosure: my first attempt to write this file through a shell heredoc was refused by the record-write-gate hook (records are written with Write or Edit). I re-issued it with the Write tool, which meets the stated standard. Content was not otherwise changed except fixing two typos I noticed.

## (a) Tags read and commands

`gh release list` rejected `--exclude-pre-releases` ("unknown flag"), so the documented fallback was used for every tag:

```
for p in 1 2 3 4 5 6; do gh api "repos/vercel/next.js/releases?per_page=100&page=$p" > p$p.json; done
```

That returned 600 releases. Stable tags matching `^v16\.\d+\.\d+$` with 16.1.6 < tag <= 16.4.6 were selected by version sort and each `.body` was read from the JSON. These 30 tags were read, one `.body` each from the same fetch:

v16.1.7, v16.2.0, v16.2.1, v16.2.2, v16.2.3, v16.2.4, v16.2.5, v16.2.6, v16.2.7, v16.2.8, v16.2.9, v16.2.10, v16.2.11, v16.2.12, v16.3.0, v16.3.1, v16.3.2, v16.3.3, v16.3.4, v16.3.5, v16.3.6, v16.3.7, v16.3.8, v16.4.0, v16.4.1, v16.4.2, v16.4.3, v16.4.4, v16.4.5, v16.4.6

Cross-check: `gh release view v16.2.0 -R vercel/next.js`, `v16.3.0`, `v16.4.0` (tag existence only).

Count of tags read: 30.

Large bodies (v16.2.0 about 72 KB, v16.3.0 about 109 KB, v16.4.0 about 61 KB, each hundreds of PR lines) were read through the blog posts in full plus keyword-filtered passes over the bodies (grep for link/router/dynamic/middleware/proxy/image/body/lint/eslint/peer/node/remove/rename/deprecat). Every other tag was read in full.

Blog posts fetched with `curl -sL`, HTML stripped, read in full: nextjs.org/blog/next-16-2, next-16-3, next-16-4, upcoming-nextjs-security-release-november-2026 (fetched, no rows needed).

Extra source, not release notes: npm registry metadata, `curl -sL https://registry.npmjs.org/next/16.1.6` and `/next/16.4.6`, plus `eslint-config-next` at the same two versions.
- `next` engines `node >=20.9.0` at both versions.
- `next` peer `react` and `react-dom` `^18.2.0 || 19.0.0-rc-... || ^19.0.0` at both versions.
- `eslint-config-next` peer `eslint >=9.0.0` at both versions.

## (b) Relevance table

Quotes are verbatim from the notes (PR numbers kept). Judgement is one of breaking, behaviour change, none. No row is judged "breaking" for this site on the notes alone.

| Tag | Change | Surface | Judgement and reason |
|---|---|---|---|
| v16.2.5 | "GHSA-8h8q-6873-q5fj: Denial of Service with Server Components" (High) | 8 | behaviour change. First of the two App Router DoS advisories. Server-side, fixed on upgrade. |
| v16.2.5 | "GHSA-mg66-mrh9-m8jx: Denial of Service via connection exhaustion in applications using Cache Components" (High) | 8 | none for this site unless `cacheComponents` is on. Second of the two. |
| v16.2.5 | Same release: GHSA-267c-6grr-h53f and GHSA-492v-c6pp-mqqv (Middleware/Proxy bypass, App Router); "GHSA-36qx-fr4f-26g5: Middleware / Proxy bypass in Pages Router applications using i18n"; GHSA-h64f-5h5j-jqjh (Image Optimization API DoS); GHSA-c4j6-fc7j-m34r, GHSA-ffhc-5mcf-pf4q, GHSA-gx5p-jg67-6x7h, GHSA-wfc6-r584-vfw7, GHSA-vfv6-92ff-j949, GHSA-3g8h-86w9-wvmq | 4, 8 | behaviour change. Middleware matching and the image API are hardened. Middleware is still honoured. 16.2.6 adds follow-up GHSA-26hh-7cqf-hhc6. |
| v16.2.6 | "GHSA-26hh-7cqf-hhc6: Middleware / Proxy bypass in App Router applications via segment-prefetch routes - **Incomplete Fix Follow-Up**" | 4, 8 | behaviour change. Middleware path matching tightened. |
| v16.1.7 | "feat(next/image): add lru disk cache and `images.maximumDiskCacheSize`" (CVE-2026-27980) | 4 | behaviour change. Image optimisation gains a bounded disk cache. No default change to qualities or TTL stated. |
| v16.1.7 | "Disallow Server Action submissions from privacy-sensitive contexts by default" (CVE-2026-27978) | 5 | behaviour change. Server Actions refused from privacy-sensitive origins. Could affect sandboxed test harnesses. |
| v16.1.7 | "ensure `maxPostponedStateSize` is always respected" | 5 | none. PPR postponed state, not the API body. |
| v16.2.0 | "Disallow javascript urls in router methods and redirects: #88185" | 1 | behaviour change. `router.push('javascript:...')` refused. Normal paths unaffected. Low risk. |
| v16.2.0 | "feat(next/image)!: add `images.maximumResponseBody` config: #88183"; "reduce maximumResponseBody from 300MB to 50MB: #88588"; 16.3.0 "ensure `images.maximumResponseBody` applies to local images too: #92920" | 4 | behaviour change. Source images over 50 MB now rejected, local ones too. The `!` marks it breaking in commit style. Matters only for huge sources. |
| v16.2.0 | "Fix: Image component ignores images.qualities in Jest environment: #89536" | 4, 3 | behaviour change for tests. `next/image` under Jest now honours `images.qualities`, so snapshot URLs can change. 16.4.0 also "Avoid mutating image qualities during validation: #99476". |
| v16.2.0 | "Add `transitionTypes` prop to `next/link`: #90701" | 1 | none. Additive. Per blog, silently ignored in Pages Router. |
| v16.2.0 | "fix: trigger MPA navigation for server action redirects with build ID mismatch: #89946" | 1 | behaviour change. Server-action redirect on a stale deploy does a full page load. Relevant to Vercel skew. |
| v16.2.0 | "Handle null history.state in client-side router popstate handler: #90083", then "Revert ... : #90268" | 1 | none. Reverted inside the same release. |
| v16.2.0 | "Fix(pages-router): restore Content-Length and ETag for /_next/data/ JSON responses: #90304" | 1 | behaviour change. Pages data responses regain the headers. |
| v16.2.0 | "[strict-route-types] Don't reject `number` in `config.api.bodyParser.sizeLimit` when validating route: #87633" | 5 | none. Type validation only. No default size change anywhere in the range. |
| v16.2.0 | "Remove sibling caches from CacheNode tree: #87991"; "Finish deleting Mutable from router implementation: #88046" | 1, 3 | none expected. Internal client-router refactors. No context-module path is named. |
| v16.2.0 | Blog: "Adapters are now stable." | 4 | none. Platform concern, handled by Vercel. |
| v16.2.0 | Blog and body: faster dev and rendering. No bundler default change in range (Turbopack default for `next build` dates from 16.0). 16.3.0 "typegen: default to Turbopack: #94952" | 4 | none. |
| v16.2.2 | "Backport: TypeScript v6 deprecations for baseUrl and moduleResolution (#92130)"; 16.3.0 "Avoid deprecated TS node10 moduleResolution defaults: #91847", "Stop using deprecated `baseUrl`: #92653" | 4 | behaviour change. Next's tsconfig handling and templates move off `baseUrl` and node10. A TS 6+ project that keeps them may see warnings. |
| v16.2.5 | "Fix double-encoding of URL pathname parts in client param parsing (#93491)" | 1 | behaviour change. Params from paths with percent-escapes can differ. |
| v16.2.7 | "[backport] Fix catch-all `router.query` corruption with `basePath` + `rewrites` (#93917)" | 1 | behaviour change. Only with `basePath` and `rewrites`. |
| v16.2.7 | "[backport] Fix server action forwarding loop with middleware rewrites (#93919)" | 4, 5 | behaviour change. Middleware rewrites plus Server Actions. |
| v16.2.11 | "Unbounded Server Action payload in Edge runtime" (GHSA-4c39-4ccg-62r3); "Denial of Service in App Router using Server Actions" (GHSA-m99w-x7hq-7vfj); GHSA-p9j2-gv94-2wf4 (SSRF in rewrites); "Denial of Service in the Image Optimization API using SVGs" (GHSA-q8wf-6r8g-63ch); GHSA-6gpp-xcg3-4w24 (middleware bypass, Turbopack, single locale) | 4, 5, 8 | behaviour change. Request-size and rewrite-destination handling tightened. See also 16.3.0 "Enforce `serverActions.bodySizeLimit` for Server Actions in Edge runtime: #96012". |
| v16.3.0 | "Add codemod command to middleware deprecation warning: #92532"; "docs: add middleware.mdx deprecation stub for discoverability: #92281" | 4 | behaviour change. `middleware.ts` still honoured, warns, and the warning names the codemod. Not removed or failing through 16.4.6. |
| v16.3.0 | "Deprecate edge runtime: #93369"; "Rename the edge runtime to the self-contained runtime: #94726" | 4 | none unless a route or middleware sets `runtime = 'edge'`. Deprecation, not removal. |
| v16.3.0 | "Rename /_next/webpack-hmr to /_next/hmr: #91415" | 4 | none for production. A custom dev proxy would need the new path. |
| v16.3.0 | "Run instrumentation for Node.js Middleware without Adapter: #95547"; "Keep the request body a plain Readable after middleware so Readable.toWeb() doesn't hang: #95607"; "fix: preserve middleware rewrite query in Pages API routes: #94905" | 4, 5 | behaviour change. Middleware and Pages API request body and query. #94905 was reverted in 16.3.1: "Revert i18n localization change for dynamic Pages API routes (#94905)". |
| v16.3.0 | "Fix: Update the URL when a client navigation redirects to a rewritten route: #95207" | 1 | behaviour change. URL now updates after a client navigation redirects to a rewritten route. |
| v16.3.0 | "Fix history push getting treated like replace when followed by refresh: #95392" | 1 | behaviour change. `router.push` then `router.refresh()` keeps a history entry. Matters for leave-page guards and back-button tests. |
| v16.3.0 | "[fragment-scroll] Enable new scroll handler by default: #95378"; "[fragment-scroll] Stop blurring on navigations: #96113"; 16.4.0 "[fragment-scroll] Remove `config.experimental.appNewScrollHandler`: #95602" | 1 | behaviour change. App Router post-navigation focus and scroll rework, now always on, no opt-out. Focus assertions after `next/link` navigation may change. Pages Router not named. |
| v16.3.0 | "router instrumentation: refactor client hook dispatch (1/7): #94755"; "add transition start context (2/7): #94766" | 1 | none expected. Not stated to alter `useRouter` or events. |
| v16.3.0 | "Prefetch links nearest the top of the document first: #95393"; blog "Fewer prefetch requests ... bundling smaller payloads" | 1 | behaviour change. App Router prefetch order and count change. Tests counting prefetch requests may differ. |
| v16.3.0 | "Remove `experimental.useNodeStreams` flag as it's enabled: #93938" (blog: Node streams replace web streams in App Router rendering) | 4 | behaviour change. Internal rendering change, no config needed. |
| v16.3.0 | "Enforce `serverActions.bodySizeLimit` for Server Actions in Edge runtime: #96012"; "docs: bodySizeLimit measures raw HTTP body: #94137" | 5 | behaviour change for Edge-runtime Server Actions only. No Pages `bodyParser.sizeLimit` default change in range. |
| v16.3.0 | "Return 200 for client-handled Server Action redirects: #96310" | 1, 5 | behaviour change. Status of Server Action redirect responses. |
| v16.3.0 | "New ESLint rule: `no-location-assign-relative-destination`: #92900"; "Enhance ESLint rule ...: #93057"; "codemod: bump eslint alongside eslint-config-next: #95314" | 6 | behaviour change. New rule in `eslint-config-next`, if that config is used. |
| v16.3.0 | "Warn that `experimental.useCache` is deprecated: #96448" | 4 | none unless that key is used. |
| v16.3.1 | "Fix: Optimistic routing bugs leading to repeated prefetch loops" | 1 | behaviour change. App Router prefetch only. |
| v16.3.3 | "Unauthenticated Remote Code Execution on windows-hosted servers" (GHSA-p293-qw3h-jr36); "Unauthenticated Remote Code Execution in Image Optimization API when AVIF files are used" (GHSA-2xp9-vwfh-vxw4) | 4 | behaviour change. v16.3.4: "re-enabling AVIF Image Optimization (#97949)", implying AVIF was off in 16.3.3. Do not stop at 16.3.3 if AVIF output matters. |
| v16.3.5 | "Add CSP nonce to script tags of loading and template files (#98403)" | 4 | none unless CSP nonces are used. |
| v16.3.8 | "Server-Side Request Forgery in Image Optimization" (GHSA-cjq9-62q9-8jv4, High) | 4 | behaviour change. Image API stricter. `images.remotePatterns` still honoured. Verify hosts that resolve to private addresses. |
| v16.4.0 | "Pages Router: Deprecate React 18 support: #97689" | 7 | none now, breaking later. React 18 still in the peer range at 16.4.6 (registry). Expect a warning or later removal. |
| v16.4.0 | "Properly disable laziness on next/dynamic: #98828" | 2 | behaviour change (title only; PR body not read). Blog: lazy compile is opt-in via `experimental.turbopackLazyDynamicImports`, "Some next/dynamic imports are still compiled eagerly". Production preload is not stated to change. |
| v16.4.0 | "Reorganize client router modules: #97402"; "[fragment-scroll] Rename `ScrollAndMaybeFocusHandler` to `ScrollHandler`: #96828"; "Remove the page/layout distinction from RouteTree: #98970" | 3 | possible. Notes do not name `router-context.shared-runtime` or `app-router-context.shared-runtime` as moved. Run the suite to confirm. |
| v16.4.0 | "Pages Router: do not return the `__appRouter` prefetch marker as route info on shallow navigation: #98187"; "Pages Router: key the client router filter prefetch marker by the `as` path: #98182" | 1 | behaviour change. Hybrid sites: Pages shallow navigation and route info for App Router targets. |
| v16.4.0 | "Fix prefetch loop when a predicted route redirects: #98998" | 1 | behaviour change. App Router prefetch only. |
| v16.4.0 | "fix: detect proxy.ts correctly with compound pageExtensions: #93246"; "Fix intercepted route params after Proxy rewrites: #97953" | 4 | none unless `proxy.ts` or compound `pageExtensions` are used. |
| v16.4.0 | "Skip ESLint migration when scripts do not use next lint: #99103"; "Allow skipping React and ESLint upgrades: #99468"; "eslint-config-next: support ESLint 10: #99628" | 6 | none. No `next lint` restoration in range. `eslint-config-next` peer is `eslint >=9.0.0` at both 16.1.6 and 16.4.6 (registry). ESLint 10 now accepted. |
| v16.4.0 | "fix(next/image): reject non-2xx internal image responses: #97957"; "skip 0-byte entries when initializing disk LRU cache: #94068"; "don't share the requester's socket with the internal image response: #98168" | 4 | behaviour change. Image optimiser edge cases. |
| v16.4.0 | Blog: "Turbopack now ships its runtime in a single chunk shared across routes."; "Turbopack generates shorter CSS Module class names in production"; "export mangling" | 4 | behaviour change. Production CSS class names are shorter, so tests or snapshots matching built class names can change. Turbopack remains the build default. No change to `turbopack.root` named; blog adds opt-in `experimental.turbopackAdditionalRoots`. |
| v16.4.0 | Blog: "Next.js 16.4 ships with React 19.3" | 7 | behaviour change. Bundled React for App Router moves to 19.3. Peer ranges unchanged. |
| v16.4.0 | Blog: "all new apps created with create-next-app will have Cache Components enabled by default" ("it will become the default in Next.js 17") | 4 | none for existing apps. `cacheComponents` stays opt-in at 16.4. |
| v16.4.0 | "Remove `true` from `agentUpgrade` option: #99461"; blog: `experimental.agentUpgrade` default `'security'` nudges during `next dev` and `next build` | 4 | behaviour change. Extra console output in dev and build. `agentUpgrade: false` silences it. |
| v16.4.1 | "Unauthenticated Remote Code Execution in `use cache` functions returning typed arrays" (GHSA-673q-mjm6-r5xr); "...in Image Optimization API when SVG files are used" (GHSA-2464-fhr4-w9xw); "Denial of Service in App Router using Server Actions" (GHSA-p3m5-59mp-jv5r) | 4, 5 | behaviour change. Image optimiser SVG handling restricted. Another App Router Server Actions DoS fixed. |
| v16.4.3 | "Don't load the app-page runtime in proxy.ts (#100423)" | 4 | none. Proxy runtime slimmed. |
| v16.4.5 | "SVG rejection bypass in Next.js image optimization" (GHSA-7qx7-33qx-rqx2); "HttpOnly cookie exposure through internal response header on Next.js Edge runtime routes" (GHSA-f3mh-rxg3-f5g2); `use cache` leak advisories | 4 | behaviour change. Image SVG rules and Edge routes. |
| v16.4.6 | "Automatically compress route handler responses if not already compressed (#101280)" | 5 | behaviour change. App Router route handler responses compressed unless already. Tests reading raw bodies, byte length or `content-length`, or relying on no `content-encoding`, may see a difference. |

Other stable tags in range (v16.2.1, .2, .3, .4, .8, .9, .10, .12, v16.3.2, .4 (besides above), .6, .7, v16.4.2, .4): bug-fix or publish-only content, judged none. v16.3.6 carries GHSA-vcvr-r3jv-pc5j (RCE in `next/og` ImageResponse). v16.2.12 adds TypeScript 7 support.

### Surface-by-surface summary

1. Client navigation: nothing named changes `next/link` `onClick` or `onNavigate`, `next/router` events or `beforeunload` handling. Behaviour changes are `router.push` plus `refresh` history (#95392), the now-default scroll and focus handler, redirect-to-rewritten URL update (#95207), and server-action redirect MPA fallback (#89946).
2. `next/dynamic`: one title-only note (#98828), tied to a new opt-in flag. No stated preload change.
3. `next/dist/...` internals: no moved or renamed path is named for `router-context.shared-runtime` or `app-router-context.shared-runtime`. "Reorganize client router modules: #97402" is a risk to check by running the suite. The notes cannot confirm it either way.
4. Middleware: `middleware.ts` still honoured, warns with a codemod hint (rename to `proxy` from 16.0); not removed or failing through 16.4.6. No stated change to `turbopack.root`, `images.remotePatterns`, `redirects`, `images.qualities` default or `minimumCacheTTL`. New image keys: `maximumResponseBody` (50 MB), `maximumDiskCacheSize`. Default bundler for `next build` unchanged (Turbopack).
5. Body limits: no default change for Pages `bodyParser.sizeLimit`, route handlers or Server Actions. Edge-runtime Server Actions now enforce `bodySizeLimit`. Route handler responses compressed from 16.4.6.
6. `next lint`: removed in 16.0, before this range; nothing in range restores it. `eslint-config-next` needs ESLint >=9, unchanged; ESLint 10 accepted from 16.4.0.
7. Peers unchanged per registry: Node >=20.9.0, React `^18.2.0 || ^19.0.0`. Pages Router React 18 deprecated in 16.4.0.
8. The two App Router DoS advisories in 16.2.5: GHSA-8h8q-6873-q5fj (Denial of Service with Server Components) and GHSA-mg66-mrh9-m8jx (Denial of Service via connection exhaustion in applications using Cache Components). The notes list both as High and do not say "App Router DoS" in those words; the pairing is my reading of the list. Later Server Actions DoS fixes: GHSA-m99w-x7hq-7vfj (16.2.11), GHSA-p3m5-59mp-jv5r (16.4.1).

## (c) What I could not read

- PR and commit bodies behind each "#NNNNN" line. Only titles were read, so effects on surfaces 1 and 3 beyond the titles are unknown (#97402, #98828, #97689 in particular).
- Security advisory bodies (GHSA pages) and vercel.com/changelog/summary-of-cve-2026-23869. Only the one-line titles from the notes were used.
- Linked deep-dive posts (Turbopack 16.2, AI improvements, Instant Navigations, React 19.3, docs pages for `ensureStatic`, `navigation()`). Only the three release blog posts and the security-notice stub were read.
- The official version-16 upgrade guide under nextjs.org/docs. No release in range links it, so it was not fetched.
- Defaults for `images.qualities`, `minimumCacheTTL`, local patterns and `bodyParser.sizeLimit`: the notes state no change, but source and docs were not read, so "no change" means "not stated in the notes".
- v16.2.0, v16.3.0 and v16.4.0 bodies were not read line by line; keyword filtering was used (see section a). A relevant line phrased without those keywords could be missed.
