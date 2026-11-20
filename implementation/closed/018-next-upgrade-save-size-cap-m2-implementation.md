---
ID: 018
Origin: 018
UUID: 6273a762
Status: Committed
Status-Detail: "M2 (Next.js 16.4.6, highlight.js 11.12.0, the bundler module resolution) and the zod pin delivered at d1bb9b0 on chain/018-next-upgrade-save-size-cap; code review, QA and UAT passed at d1bb9b0. Committed for release website master d1bb9b0."
Handoff-At: d1bb9b0 — repos=website; M2 plus the zod pin (CR-2); the M2 delivery commit is b0b0158
---

# Implementation 018 — M2: Next.js 16.4.6 (H-002)

## Plan Reference

`agent-output/planning/018-next-upgrade-save-size-cap.md`, revision 7 (`af8a9d6`), milestone M2 (criteria M2-a to M2-e). QA Phase 1 re-keyed
to revision 7 (`a7394c6`). Chain branch `chain/018-next-upgrade-save-size-cap` in website; M1 tip `f9e66c2`. Plan Status In Progress since `ecffc1e`.
M2 is capped (`steering/018-rulings.md` block "2026-11-20T05:26Z"): each gap below HIGH goes to the plan's Planner batch as a stated limit.

## Date

2026-11-20 (UTC). Session `implementer-hooks-018`.

## Changelog

| Date | Handoff | Request | Summary |
|------|---------|---------|---------|
| 2026-11-20T05:31 | steering-roadmap-hooks (resume message; brief `steering/018-brief-implementer.md`) | M2 on revision 7 | M2 committed at `b0b0158` (three files); acceptance run over an isolated export of that commit, with its own install; lockfile movers dispositioned; the shared tree's `node_modules` moved to the lockfile (ruling B, block 04:51Z). |
| 2026-11-20T06:14 | steering-roadmap-hooks (resume message, rulings blocks 05:42Z and 06:06Z) | zod pin named in M2's steps by plan revision 8 (`2dc79a3`, critic APPROVED `5b145f0`) | `zod` pinned exactly at 3.22.4 in `package.json` and the one matching `pnpm-lock.yaml` specifier line; frozen install exit 0; committed at `d1bb9b0`. Section "Zod pin (CR-2)" below. |
| 2026-11-20T07:12 | devops-hooks-018 (Stage 1, brief steering/018-brief-devops.md) | Close at Committed | Status: Committed. Closed to closed/ at Stage 1 of release website master d1bb9b0 (deployment/018-next-upgrade-save-size-cap-deployment.md); the document's anchor is unchanged. |

## Implementation Summary

`next` and `@next/bundle-analyzer` move to `^16.4.6` and `highlight.js` to `^11.12.0` (`package.json`, three specifiers); `pnpm-lock.yaml` is
regenerated with pnpm 10.28.2; `tsconfig.json` gains exactly two keys: `compilerOptions.moduleResolution` `bundler` (the value Next writes on every build) and
`ts-node.compilerOptions.moduleResolution` `node` (TypeScript refuses `bundler` under the block's `module` `commonjs`). No source file changes. That delivers the plan's
Value Statement for H-002: the lockfile resolves `next` 16.4.6, which the two advisories do not list, and the build, typecheck and suite run on it.

## Milestones Completed

M2-a to M2-d in code and captures. M2-e is UAT's walk (B-9, B-10); it needs a local build and a signed-in editor, and nothing in this milestone needs code for it. M3 and M4 are in their own documents.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start for M2 on revision 7 | `steering/018-rulings.md` block "2026-11-20T05:26Z" (every gate approved revision 7: critique `15988b6`, architecture `60d0a11`, QA `a7394c6`; no OPEN QUESTION open) and steering's resume message of this session | not owed (a record fact) |
| QA Phase 1 covering M2 at a SHA | `a7394c6` | not owed |
| Read: plan § M2, the QA document's M2 instruments (§ Acceptance Criteria), the M1 document's Resumption State, rulings blocks 04:51Z and 05:26Z | this session | not owed |
| Ruling B (shared `node_modules` follows the chain lockfile) | `pnpm install --frozen-lockfile` in `/usr/local/bin/hooks/website` after the M2 commit: exit 0 (`verification/018/implementation/m2/b0b0158/shared-tree-install-frozen.out.txt`); `node_modules/next` 16.4.6, `highlight.js` 11.12.0. The state before was the `7923a1d`-era install placed by fixer chain `fix-message-page-header-decode` (ruling block 04:51Z names who placed it); the new state is the intended steady state and the old one is deliberately not restored (ruling B). | not owed |
| Open handoffs X-9, X-11 | not fired: `git diff --name-only f9e66c2..HEAD` lists `package.json`, `pnpm-lock.yaml`, `tsconfig.json` only (no file under `src/pages/api/`, not `Child.portal-inside-open-dialog.test.tsx`) | the same command |
| Roadmap, architecture | roadmap absent (plan header); `architecture/website.md` not re-read beyond the plan's citations | not owed |

## Files Modified

| Path | Changes | Lines (+/-) |
|---|---|---|
| `package.json` | specifiers `next`, `@next/bundle-analyzer` `^16.1.6` → `^16.4.6`; `highlight.js` `^11.7.0` → `^11.12.0` | +3/-3 |
| `pnpm-lock.yaml` | regenerated (`pnpm install`, then checked with `--frozen-lockfile`) | +277/-237 |
| `tsconfig.json` | `compilerOptions.moduleResolution` `node` → `bundler`; `ts-node.compilerOptions.moduleResolution` `node` added; end-of-file newline kept | +3/-2 |

(`git diff --numstat 7923a1d..HEAD` over the three paths.)

## Files Created

None in website. Captures and drivers in the record: `verification/018/implementation/m2/` (`run-m2-tip.sh`, `lockfile-movers.py`, `suite-compare.py`, and `b0b0158/` holding every output named below).

## Patterns Extended

| Surface | Pattern extended |
|---|---|
| `tsconfig.json` | in-file: the `ts-node` block already carries its own `compilerOptions` (`module` `commonjs`); the new key sits beside it. The top-level key is the value Next 16.4.6 itself writes. |
| Package specifiers | in-file: caret ranges beside each name, as before |
| User-visible surfaces | none touched by code: no source file changes. M2-e (a highlighted code block in the editor and the preview) is UAT's walk; the only flow is "open a message holding a fenced code block with a language", an existing surface. No ask is owed. |

## TDD Compliance

No new function or class: the change is a dependency and configuration move, with no behaviour of this repository's own. The "test" is the acceptance run below
(M2-a to M2-d as instruments), with real members and non-members named in the plan. Exemption stated as: not feature code.

## Class Sweep

No reviewer finding yet; first delivery. No gap from my own mutation (no mutation owed for a dependency move).

## Test Execution Results

Every output is a file under `verification/018/implementation/m2/b0b0158/`; the driver is `m2/run-m2-tip.sh b0b0158 <out> <export>` (isolated `git archive` export of `b0b0158`,
its own `pnpm install --frozen-lockfile`, no symlinked `node_modules`, no `.env`, `SKIP_ENV_VALIDATION=1`; the build had network because `next/font` fetches at build; the suites ran under `unshare -rn`).

| Criterion / command | Result | Exit |
|---|---|---|
| M2-c `pnpm install --frozen-lockfile` in the export | up to date with the lockfile | 0 |
| M2-c `next build` (Next 16.4.6, Turbopack) | built; 9 static pages; the output has 0 lines matching `mandatory` (`grep -c -i`) | 0 |
| M2-c `tsconfig.json` after the build | `cmp` with the file before the build and with `git show b0b0158:tsconfig.json`: identical | not owed |
| M2-c `pnpm run typecheck` (both programs, after the build) | no diagnostics | 0 |
| M2-c `npx ts-node -r tsconfig-paths/register -T -e "require('~/utils/limits')"` (transpile-only) | no output | 0 |
| the same without `-T` (typed) | no output | 0 |
| M2-c bundle limb: files under `.next/static` / `.next/server` containing `highlightAuto` | 1 / 2 (`grep -rl --include='*.js' -F`, into `hl-highlightAuto-*.txt`; `grep -c .`) | not owed |
| same, `registerLanguage` | 1 / 2 | not owed |
| `(void 0).getLanguage(` or `(void 0).highlight(` receivers in `.next` (`hl-void0.txt`) | 0. Regex checked against a real member (QA's `B-getLanguage-context.txt`: 1 line; `B-void-hljs-calls.txt`: 10) and a real non-member (QA's `base-marker-files.txt`: 0); never-present string `zq-never-present-marker-7731`: 0 files | not owed |
| M2-c suite at 16.4.6 in the export (`npx vitest run`, JSON) | 2259 of 2259 passed, 154 files | 0 |
| control: the same suite in the shared tree at `HEAD` with `node_modules` still on Next 16.1.6 (taken before ruling B's install) | 2259 of 2259 passed, 154 files | 0 |
| path membership and per-file counts, control vs export (`suite-compare-m1tip-vs-m2tip.txt`) | same 154 files, 0 files with a differing (cases, passed) | not owed |
| path membership against the base (`7923a1d`, `base/suite.json`, 149 files, 1913 cases) (`suite-compare-base-vs-m2tip.txt`) | the 149 base files are all present with equal counts; the 5 added files are M1's specs (`usePreferences.recent-list-bound.test.tsx`, `message.save-limits.test.ts`, `user.save-limits.test.ts`, `shapes.error-cap.test.ts`, `shapes.list-bounds.test.ts`); 0 only in base | not owed |
| `pnpm install --frozen-lockfile` in `/usr/local/bin/hooks/website` (ruling B) | `node_modules/next` 16.4.6, `highlight.js` 11.12.0 | 0 |
| `node ~/.claude/tools/convention-check.js website --since=f9e66c2` | 0 files examined (no source or test file changed), 0 FAIL, 0 CANDIDATE, 21 SKIP: the untracked `.playwright-mcp/` captures (another session's) and the id-token basename check, which the tool does not implement (nothing named here, no new test file) | 0 |

**M2-a.** `grep -c -E "^  next@"` on the lockfile: base (`git show 7923a1d:pnpm-lock.yaml`) 2, both `next@16.1.6`; at `b0b0158` 2, `  next@16.4.6:` and
`  next@16.4.6(@babel/core@7.29.7)(…):`; the importer's `next:` entry has specifier `^16.4.6`, version `16.4.6(…)`. (`  '@next/eslint-plugin-next@…'` is the plan's non-member.)
`grep -c "^  highlight.js@"`: 1 at both commits (11.7.0 → 11.12.0). The `pnpm audit --prod --json` re-run is Security's (M2-a's last sentence); not run here.

**M2-b `package.json` and `tsconfig.json`.** `package.json`'s diff is the three specifiers; `tsconfig.json`'s is the two keys (diff above in Files Modified), the end-of-file newline kept (`diff` shows no `\ No newline` line).

**M2-b lockfile movers** (`m2/lockfile-movers.py 7923a1d b0b0158` → `b0b0158/lockfile-movers.txt`): `packages:` keys 1524 → 1527; a name whose version set differs is a mover (a name that gains a
version beside the old one, or loses one another consumer also held, is listed with both sets).

| Mover | Base → new | Disposition |
|---|---|---|
| `next` | 16.1.6 → 16.4.6 | the step |
| `@next/env`, `@next/swc-darwin-arm64`, `-darwin-x64`, `-linux-arm64-gnu`, `-linux-arm64-musl`, `-linux-x64-gnu`, `-linux-x64-musl`, `-win32-arm64-msvc`, `-win32-x64-msvc` | 16.1.6 → 16.4.6 | declared by `next@16.4.6`'s snapshot (`dependencies`, `optionalDependencies`); expected |
| `@next/bundle-analyzer` | 16.1.6 → 16.4.6 | the step; expected |
| `@swc/helpers` | 0.5.15, 0.5.2 → also 0.5.23 | `next@16.4.6`'s declared dependency; a new version beside the two kept; expected |
| `postcss` | 8.4.31, 8.5.26 → also 8.5.23 | `next@16.4.6`'s declared dependency (`postcss: 8.5.23`); expected |
| `baseline-browser-mapping` | 2.10.0, 2.11.18 → 2.11.18 | `next@16.4.6` declares 2.11.18, which another consumer already held; 2.10.0 was `next@16.1.6`'s; expected |
| `caniuse-lite` | 1.0.30001439, 1.0.30001774, 1.0.30001809 → 1.0.30001439, 1.0.30001809 | `next@16.4.6` declares 1.0.30001809, already held; 1.0.30001774 was `next@16.1.6`'s; expected |
| `styled-jsx` | 5.1.6, unmoved | declared by `next`, version unchanged; its snapshot key follows `next`'s peers; expected |
| `highlight.js` | 11.7.0 → 11.12.0 | the step (D-6); no dependencies |
| `sharp` | 0.34.5 → 0.35.5 | **not in the plan's expected list.** `next@16.4.6`'s `optionalDependencies` entry `sharp: 0.35.5` (snapshot read); `next@16.1.6` carried 0.34.5. In the class "`next` and its declared dependencies", missing from the plan's parenthetical list. Finding reported (below); no action in this milestone |
| `@img/sharp-*` (16 packages, two of them added), `@img/sharp-libvips-*` (10), `@img/colour` 1.0.0 → 1.1.0 (27 `@img/` names in all; reconciled 2026-11-20T05:41, see Outstanding Items) | 0.34.5 / 1.2.4 → 0.35.5 / 1.3.4; `-freebsd-wasm32` and `-webcontainers-wasm32` added | `sharp@0.35.5`'s declared optional dependencies, the same finding; all platform binaries are optional and only the host's installs |
| `semver` | adds 7.8.6 beside 5.7.2, 6.3.0, 6.3.1, 7.5.4, 7.7.4 | `sharp@0.35.5`'s declared dependency, the same finding |
| `@emnapi/runtime` | 1.8.1 → 1.11.3 | `sharp`'s wasm32 optional chain, the same finding |

`snapshots:` keys 1526 → 1529. Snapshot keys whose package version did not move but whose key text did (`lockfile-movers.txt`, last block):
`@trpc/next@11.10.0`, `@vercel/analytics@1.6.1`, `@vercel/speed-insights@1.0.10`, `cookies-next@6.1.1`, `next-auth@4.24.5`, `next-remote-watch@2.0.0` — the six peers of `next`
the plan names, versions unmoved (expected) — **and** `@napi-rs/wasm-runtime@1.2.3`, `@rolldown/binding-wasm32-wasi@1.0.0-rc.12`, `rolldown@1.0.0-rc.12`, `vite@8.0.3`,
`vitest@4.1.2`, `@vitest/mocker@4.1.2`. These six are **not in the plan's list**: their keys carry `(@emnapi/runtime@…)` as a peer suffix (`vitest@4.1.2(…)(vite@8.0.3(@emnapi/core@1.9.1)(@emnapi/runtime@1.8.1)…)` →
`…@emnapi/runtime@1.11.3…`), which followed `@emnapi/runtime` 1.8.1 → 1.11.3 (a version the `sharp` move brought). No test-tooling version moved (vitest 4.1.2, vite 8.0.3, rolldown 1.0.0-rc.12 unchanged); the suite's result above (2259 of 2259, the same per-file counts as the M1 tip on Next 16.1.6) is the effect check.

## M2-d: build warnings

Captured in `b0b0158/build.out.txt`; against the base build (`verification/018/qa/m2-hljs-resolution/base-build.txt`, 16.1.6):
- `The "middleware" file convention is deprecated. Please use "proxy" instead.`: present at base and at the tip. **Recorded for the architect (X-8).** The tip build also prints `ƒ Proxy (Middleware)` in its route table.
- `Browserslist: caniuse-lite is outdated`: present at both (an older `caniuse-lite` 1.0.30001439 remains in the lockfile for another consumer).
- **New at the tip, not in the release-notes reading:** `The Edge Runtime is deprecated. You can use the "nodejs" runtime instead` (printed in "Collecting page data", i.e. for `/api/interactions-edge`, the one route on the edge runtime). Build exits 0; recorded as an M2-d finding for the architect. No edit made (X-9: no file under `src/pages/api/`).
- The mandatory `moduleResolution` rewrite surfaced at implementation is folded at revisions 6 and 7: the build leaves `tsconfig.json` as committed (above).

## Zod pin (CR-2)

Plan revision 8, M2 steps: pin `zod` exactly at `3.22.4`; M1-i's issue count rests on that version's error map, and `^3.20.6` admits 3.25.76, under which the cap misses issues (code review CR-2). Stage start: steering's message of this turn, rulings blocks "2026-11-20T05:42Z" (option A) and "2026-11-20T06:06Z"; revision 8 critic-approved at `5b145f0`. No open question.

| Item | Result |
|---|---|
| Diff (`git diff --numstat d1bb9b0^ d1bb9b0`) | `package.json` 1/1: `"zod": "^3.20.6"` → `"zod": "3.22.4"`; `pnpm-lock.yaml` 1/1: `importers` `.` `zod` `specifier: ^3.20.6` → `specifier: 3.22.4`. The resolved `version: 3.22.4` is unchanged, so no package, edge or integrity line moves. |
| The pin's control fires (observed) | With only `package.json` edited, `pnpm install --frozen-lockfile --offline` exits 1: "zod (lockfile: ^3.20.6, manifest: 3.22.4)". With the lockfile specifier matching, the same command exits 0. A later specifier drift fails a frozen install. |
| Frozen install at the tip | `pnpm install --frozen-lockfile --offline` exit 0; `node -p "require('zod/package.json').version"` → 3.22.4. |
| `npx vitest run` network-isolated (`unshare -rn`) | exit 0; 2261 of 2261 passed, 154 files (`testResults` entries) — the M1 fix round's count, unchanged. |
| `pnpm run typecheck` (both programs) | exit 0. |
| `SKIP_ENV_VALIDATION=1 npx next build` | exit 0; `git status` clean of build output. |
| `convention-check.js website --since=969d92a` | 0 files examined (`package.json` and the lockfile are outside its examined set), 0 FAIL, 0 CANDIDATE; the 20 SKIPs are `.playwright-mcp/*.png` (another session's captures, not mine) and the unimplemented id-token check. Unchecked, not passed; no source or test file is added. |
| TDD | Not owed: a dependency specifier, no new function, class or behaviour. The red is the frozen-install refusal above, run against the pre-change lockfile; no test is added or touched. |
| Class sweep | Not owed: no finding of a fix round. CR-2's class is the other runtime specifiers admitting a version the code's premise excludes; not enumerated here (the plan fixes this one pin). |

**Finding (not fixed, outside the plan):** `pnpm install --lockfile-only --offline` on this lockfile does not change only the zod specifier. It re-resolved the `paracord` git dependency (`"paracord": "github:mr-tech/paracord"`, no commit named) from `3f20308` (0.0.5) to `1b7cadb` (0.0.9) and moved a second zod tree (3.25.76 → 4.6.7 under `zod-validation-error`), 11 added and 15 removed lines. I discarded that regenerated lockfile (restored from `HEAD`) and edited the one specifier line by hand; the frozen install above is the check that the result is consistent. Anyone regenerating the lockfile at this tip moves `paracord`. Severity: LOW for this chain; follow-up for the planner/devops (pin `paracord` by commit or leave regeneration to a dedicated change).

## Outstanding Items

- M2-e (B-9, B-10) is UAT's and devops's walk; the suite cannot see it (vitest resolves through its own `alias`). Its instrument at this tip: the bundle holds highlight.js's runtime and no `(void 0)` receiver (above).
- `pnpm audit --prod --json` for M2-a's last sentence is Security's.
- **Reconcile note, 2026-11-20T05:41 (code review CR-4):** the first count of the `@img` movers (22 `sharp-*`, 11 libvips) did not reproduce. `grep -c -E '^@img/sharp-libvips-'` over `b0b0158/lockfile-movers.txt` gives 10; `^@img/sharp-[a-z]` gives 26, of which 16 are not libvips; `^@img/colour` 1; `^@img/` 27 (`@img/sharp-freebsd-wasm32` and `@img/sharp-webcontainers-wasm32` are the two added names). The reviewer's 16 + 10 + colour = 27 is right; the disposition is unchanged.
- **Findings against the plan, for the Planner batch** (M2 is capped; each is below HIGH and states a limit): (1) M2-b's expected-movers list omits `sharp`, its `@img/*` packages, `@img/colour`, `@emnapi/runtime` and `semver` 7.8.6, all declared by `next@16.4.6`'s optional `sharp`; (2) it omits the snapshot-key movers `vitest`, `vite`, `rolldown`, `@vitest/mocker`, `@napi-rs/wasm-runtime`, `@rolldown/binding-wasm32-wasi`, whose peer suffix follows `@emnapi/runtime`; (3) the new "Edge Runtime is deprecated" warning (M2-d). None moves a version the plan's expectation names as unmoved (`next-auth` and the other five peers keep their own versions).
- The highlight.js types are now resolved from the package's own `exports` types condition; `src/@types/highlight.js.d.ts` (a `declare module 'highlight.js'` augmentation) is untouched and typechecks.
- Self-diagnosis: none against a gate this round. One process note: the earlier-session captures under `m2/` (`suite.json`, `build*.out.txt`, `hl-*.txt`) were taken in uncommitted exports; the committed acceptance run above replaces them and sits under `m2/b0b0158/`.

## Next Steps

Code review of the zod pin at `d1bb9b0` (`code-reviewer-hooks-018`), then QA's last Phase 2 (M4 and the effort-final sweep) at the tip that carries it, then UAT. M2's own delivery (`b0b0158`) was reviewed and verified earlier.
