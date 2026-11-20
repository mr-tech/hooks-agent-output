---
ID: n/a
Origin: fix-message-page-header-decode
UUID: c8a9f0ca
Reviewed-At: 7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe — repos=website
Status: In Review
Round: 1
Verdict: APPROVED
---

# Code Review: fix-message-page-header-decode

**Plan Reference**: none (fixer route). Scope: `steering/website-deps-review-rulings.md`, blocks "2026-11-20T01:59Z", "2026-11-20T02:03Z" (determination) and "2026-11-20T02:11Z" (two rulings).
**Implementation Reference**: `agent-output/implementation/fix-message-page-header-decode-implementation.md` (record `0c17d20`, `Handoff-At: 7923a1d`)
**Date**: 2026-11-20
**Reviewer**: Code Reviewer (session `code-reviewer-hooks-fix-message-page-header-decode`)

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T02:17 | steering-roadmap-hooks (brief `steering/fix-message-page-header-decode-brief-code-reviewer.md`) | Round 1: review website `983681c..7923a1d`; under 20 production lines, so also run the suite and the red test | Round 1, APPROVED at `7923a1d`. Red 4/4 at base, green 4/4 at fix, suite 1913/1913 exit 0, typecheck 0 both trees, lockfile loses only removed subtrees. No finding against the change; CR-1 is pre-existing INFO, routed to steering. Gates satisfied this round: the stamp gate refused an estimated changelog time (replaced with `date -u`), and the record-write gate refused a `sed` edit of this file (re-issued with the Edit tool). |

## Scope and criteria assessed (recorded before reading the diff)

From the determination ("2026-11-20T02:03Z") and his selections:
1. **Property:** a value the browser sends is no longer decoded on the server through an outdated parsing dependency (decode-uri-component 0.4.1 via `query-string`). Sweep rows S1/S2, `Providers.tsx` `getMessage`.
2. **Breach catch:** a test that `Providers` given a client-sent `x-query-params` with no URL query neither decodes it nor throws, plus a lockfile check that no `decode-uri-component` < 0.5.1 resolves.
3. **Override:** decode-uri-component ≥ 0.5.1, or its absence. Steering's 02:11Z ruling records removal of `query-string` in place of an override as a mechanism choice within scope.
4. **Removals:** `sanitize-html`, `@types/sanitize-html`, the direct `sharp`, with a production build and the suite passing. `form-data` kept.
5. **Lockfile churn:** no unrelated version moves.

Out of scope by ruling: the now-unread `x-query-params` write in `middleware.ts` (02:11Z ruling).

## Tree identity

`git -C website rev-parse HEAD chain/fix-message-page-header-decode` = `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe` at start and at end. Tracked files clean (`git diff --quiet HEAD` exit 0). Untracked `.playwright-mcp/` is another session's and was left alone. Files read with `git show 7923a1d:<path>`. Runs used two `git archive` exports (base `983681c` plus the fix's test file, and fix `7923a1d`), each with its own `pnpm install --frozen-lockfile --offline` (both exit 0). The shared tree was never moved.

## Files reviewed

`git diff --numstat 983681c 7923a1d`: `package.json` 0/4, `pnpm-lock.yaml` 0/338, `src/app/_components/Providers.tsx` 1/15, `src/app/_components/__tests__/Providers.request-headers.test.ts` 51/0. This matches the implementation document's tables.

- **`Providers.tsx` `Providers`.** `getMessage`, the `query-string` import and the `x-query-params` read are removed. The session is now awaited directly. At base, the `getMessage` result was dropped (`const [session] = await Promise.all([...])`, re-read). `/api/messages/codes/[code].ts` `handler` is a read (`messageStore.retrieve`). The share-code load users see runs client-side (`MessageProvider` `searchParams?.get('code')` → `api.message.getFromCode.useQuery`), and existing tests cover it (`MessageProvider.stored-draft`, `MessageProvider.transient-toast`, by grep only). `getBaseUrl` is still used by `getSession`. Nothing was left behind.
- **The test file.** It is spec-form. Basename `Providers.request-headers.test.ts` matches the positive form, and the ID-token class matches 0 lines in the basename and 0 in the file (by hand, since convention-check SKIPs that check). It is placed beside its module under `__tests__/`. The `~/env.mjs` mock reuses `messageProviderDeps.ENV_MOCK`, which 18 other test files already import. That reuses an existing helper, not a new duplicate. Expectations are independent: literal "resolves" and "no fetch" oracles, nothing computed from the code under test. The fixer names the `next/headers` mock as an invented framework value (Iron Law 5) and gives its falsity consequence: the defect would not reach production, the fix would still be correct, and confirmation (b) settles it. That is acceptable.
- **`package.json` / `pnpm-lock.yaml`.** Four entries are removed, none added. Lockfile `grep -c` from base to fix: `decode-uri-component` 3→0, `query-string` 3→0, `sanitize-html` 6→0, `sharp@0.32` 2→0, `sharp@0.34.5` 2→2. Added lines: 0. Next 16.1.6 declares `sharp` `^0.34.4` as an optionalDependency, and `createRequire(next/package.json).resolve('sharp')` resolves `.pnpm/sharp@0.34.5`. From the app root `sharp` does not resolve, and the sweep finds no app import of it. The lockfile has no `overrides:` section, so pnpm does not honour the npm-style `overrides.semver` key. That predates this chain and is out of scope (hazard 3); this chain adds no override that depends on it.

**Pattern claim:** the implementation document claims no mirrored pattern. The change only deletes, so there is no pattern rung or user-visible derivation to check beyond the share-code flow above.

## Re-run sweep (removed packages)

`git grep -n -E "query-string|queryString|sanitize-html|sanitizeHtml|from 'sharp'|require\(.sharp.\)|decode-uri-component|x-query-params" 7923a1d -- . ':!pnpm-lock.yaml'` gave 9 lines (`verification/fix-message-page-header-decode/code-review/removed-package-sweep.txt`):
- 3 are in the new test, where the header name is the test's subject.
- 4 are `middleware.ts`: a local variable `queryString`, the built-in `URLSearchParams`, and the `x-query-params` write, which is out of scope by the 02:11Z ruling.
- 1 is a `backfillValid` test title using "query-string" as prose about pg.
- 1 is a commented-out `sanitizeHtml(` call in `JsonModalBody.tsx` (CR-1).

**What this predicate cannot see:** a dynamic `import()` or `require` of a removed package built from a string, and any use in project-utils `dist/` or the preview-image-generator. Both are the sweep's own "not covered". The production build (fixer's `next-build.txt`, `build_rc=0`) would fail on an unresolved static import, which closes the static form.

## Runs (fixer rule: under 20 production lines)

Instrument provenance: the evidence is vitest's own result over the fixer's test file, the suite and tsc. I authored only the export-and-run driver, not the probes. Captured in `agent-output/verification/fix-message-page-header-decode/code-review/` (`run.sh`, `results.txt` and the raw outputs).

| Run | Tree | Exit | Result |
|---|---|---|---|
| Red test | `983681c` + test | 1 | 4 failed: 2× `promise rejected "URIError: URI malformed"`, 2× `expected [ Array(1) ] to deeply equal []` (`red-run.txt`) |
| Green test | `7923a1d` | 0 | 4 passed (`green-run.txt`) |
| Suite, JSON reporter | `7923a1d` | **0** | 149 `testResults` files, 1913 cases, 1913 passed, `success: true` (`suite-fix.json`). Matches the fixer's `suite-fix.json` counts. |
| `pnpm run typecheck` (both programs) | base / fix | 0 / 0 | With the generated, git-ignored `next-env.d.ts` copied in. Without it, the fix export exits 2 on a PNG module (`typecheck-fix-without-next-env.txt`), which is an export artefact and not caused by the change. |
| eslint `--max-warnings=0`, 2 changed source files | shared tree at `7923a1d` (read-only, no `--fix`) | 0 | `eslint-changed.txt` (empty) |
| `convention-check.js --since=983681c` | shared tree at `7923a1d` | 0 | 0 FAIL, 0 CANDIDATE. SKIP: `package.json`, `pnpm-lock.yaml`, `.playwright-mcp/*.png` (foreign, untracked) and the ID-token/basename check, which I did by hand (above). |

**Production build:** not re-run by this review. A build here pre-renders against `.env.local`, whose hosts this box cannot place outside production, and the rule is no request to production. The evidence is the fixer's `verification/fix-message-page-header-decode/next-build.txt` (`build_rc=0`), together with this review's independent `next`→`sharp` resolution above.

**Adversarial execution:** not triggered. The change adds no gate and no irreversible action; it deletes a server-side request path. The attack input class (a client-sent `x-query-params` header carrying malformed escapes or a `code=` path) is driven at the composed entry point `Providers` by the red test, which I ran red and green. The oracles are "resolves" and "zero outbound fetch". A live request through `middleware.ts` on a running instance was not made. The security stage reviews the change next.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md`, present: `ls -d` resolved it against `/usr/local/bin/hooks/agent-output`, and `git -C agent-output ls-files` lists it.
**Alignment Status**: ALIGNED

It holds no statement about `Providers`' server-side message fetch or `x-query-params`. Its "Key providers" line is unaffected. Deleting a server-side path whose result was discarded introduces no deviation.

## TDD Compliance Check

**TDD Table Present**: Not as a table. The fixer route's document gives the red run, the green run and the negative-control disposition in prose under "Test". It has no Python sources, so `tdd-check.py` does not apply.
**All Rows Complete**: Yes in substance. The red run at base was re-run by this review and is red for every case. Each case exercises the composed entry point.
**Concerns**: None. The bug-form question does not arise, because the test is spec-form and carries no `// escaped:` line, and H-001 is a review finding, not an escaped artefact.

## Findings

### Critical
None.

### High
None.

### Medium
None.

### Low/Info

**CR-1 INFO Round 1** (pre-existing, not introduced by this change)
- **Location:** `src/app/message/m/[id]/_components/JsonModalBody.tsx`, the commented-out `<code … dangerouslySetInnerHTML={{ __html: sanitizeHtml(hljs.highlight(…)) }}>` block inside the rendered JSX, unchanged by this diff.
- **Class:** commented-out source refers to a dependency the manifest no longer declares, so reviving it fails rather than restoring behaviour.
- **Enumeration:** the removed-package sweep above gives 1 hit in a comment. Its predicate matches only the removed packages' identifiers. It cannot see commented-out code that names other absent dependencies, or non-`//`/`{/* */}` forms.
- **Required Action:** none owed by this chain, since it is outside the change. Routed to `steering-roadmap-hooks` to drop, or to carry to a later chain that touches `JsonModalBody.tsx`. Minimum: delete the commented block.

## Verdict

**Status**: APPROVED
**Rationale**: Every criterion recorded above is met at `7923a1d`:
- The client-sent header is no longer read or decoded, shown red at base and green at fix by the composed-entry test.
- `decode-uri-component` resolves nowhere.
- The three packages are gone, with only their exclusive subtrees leaving the lockfile, and Next keeps its own `sharp` 0.34.5.
- The suite (exit 0) and typecheck pass.

The change only deletes, and nothing at base consumed what it deletes. Captures: `agent-output/verification/fix-message-page-header-decode/code-review/`.

## Required Actions

None. CR-1 is routed to steering.

## Assumption Not Checked

This review assumes that Vercel's production `/_next/image` optimisation does not depend on the app's removed direct `sharp` 0.32 and does not test it. If that is false, images served through `next/image` (avatars, icons) return errors or fail to load after the deploy. Closing it is owned by steering's confirmation (a), a read-only `vercel api` read, before devops' website `master` push, and by a post-deploy look at one `next/image` URL under the production release of that push.

## Next Steps

- Verdict to `security-hooks-website-deps` (security on the change), by SendMessage. No QA Phase 2: 1 production line added.
- Steering: confirmation (a) closes the Assumption Not Checked before the master push. CR-1 is for routing or dropping.
- Then devops for website `master`. That push deploys to production on Vercel and needs the owner's word.
