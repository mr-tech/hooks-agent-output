---
ID: 018
Origin: 018
UUID: 6273a762
Verified-At: "d1bb9b0 — repos=website; the chain tip carrying the zod pin; M4, the M1 to M3 refresh and the effort-final sweep; isolated exports with their own install"
Status: Committed
Status-Detail: "Effort-final Phase 2 PASS at website d1bb9b0 (62703f1); the release tip is d1bb9b0's tree. Register rows executed by UAT and devops (B-1 to B-5, B-9); B-6, B-7, B-8, B-10 ride the post-deploy handoff. Committed for release website master d1bb9b0."
Phase: 2
---

# QA Report: Plan 018 — M4 and the effort-final Phase 2 at the release candidate

**Plan Reference**: `agent-output/planning/018-next-upgrade-save-size-cap.md`, revision 8 (`2dc79a3`). It is re-keyed from revision
7 by reading `git diff af8a9d6 2dc79a3` whole (75 lines added, 27 removed). Revision 8 moves:
- M2's steps (`zod` pinned at 3.22.4);
- M2-b (`sharp` and its declarations, the 6 `@emnapi/runtime` snapshot keys, and an edge-level production-closure comparison on
  which a "no runtime move" claim rests);
- M2-d (M2-I3);
- M2-e (UAT runs the after-deploy look: B-10 as minted);
- M3's rollback line (QAF-11).
M2-b's new edge limb is verified below. No other criterion this chain's QA verdicts rest on moved. The register is in
`qa/018-next-upgrade-save-size-cap-qa.md`; this pass appends no row.
**Stage start:** the code review's committed verdict, Round 1 sub-entry 2 (CR-2's pin) APPROVED at `d1bb9b0` (agent-output `7804862`),
re-read at the record (`Reviewed-At` `d1bb9b0`). It follows steering's sequence, block 2026-11-20T06:06Z (`409f120`): the last Phase 2
runs at the tip that carries the pin. `d1bb9b0`'s parent is `969d92a`, and its diff is `package.json` (`zod` `^3.20.6` → `3.22.4`) and
the lockfile's specifier line.
**Implementation:** `implementation/018-next-upgrade-save-size-cap-m4-implementation.md` (`Handoff-At` `969d92a`, no website commit).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T06:18 | code-reviewer-hooks-018 (CR-2 pin, `7804862`) | QA's last Phase 2 at `d1bb9b0` (M4, effort-final sweep) | Re-keyed to revision 8. **M4:** R1/R2 tests pass at the tip; R5's six wrappers are in place; QA re-read R6 in the installed `next` 16.4.6 and agrees with the implementer. **Refresh of M1 to M3 at `d1bb9b0`:** suite 2261/2261, exit 0; differential 0 violations; lint, build, traces, bundle, `tsconfig.json`, typecheck and `ts-node` identical to `969d92a` or passing. **M2-b (rev 8) edge limb:** 158 changed production edges against `7923a1d`, all in class. **Effort-final sweep:** M1's sweep stands, with the production and test JS byte-identical. `zod` resolves 3.22.4. No new finding. **PASS; plan Status QA Complete.** |
| 2026-11-20T07:12 | devops-hooks-018 (Stage 1, brief steering/018-brief-devops.md) | Close at Committed | Status: Committed. Closed to closed/ at Stage 1 of release website master d1bb9b0 (deployment/018-next-upgrade-save-size-cap-deployment.md); the document's anchor is unchanged. |

## Criteria this pass assesses (listed before execution)

- **M4-a** (QA's limbs): R1 and R2 tests at the tip; R5's wrappers; R6, QA's re-read against the installed `next` 16.4.6. R1, R2, R3
  and R5 walks are B-3 (UAT).
- **Refresh at `d1bb9b0`** of every verdict this chain issued, because the pin changed `package.json` after them:
  - M1: suite and differential;
  - M2: build, `tsconfig.json`, bundle, typecheck, `ts-node`;
  - M3: lint, build output and traces.
- **M2-b, revision 8's limb:** the production closure compared edge by edge, `7923a1d` against the tip, with every changed edge in
  M2-b's classes or M3's dispositioned edges. Also the `package.json` pin and that `zod` resolves 3.22.4.
- **Effort-final sweep** over `7923a1d..d1bb9b0` production paths.

## Test Execution Results

Driver: `verification/018/qa/final-phase2/run.sh`, under `systemd-run --user --scope`. It ran on `git archive` exports of `7923a1d`
and `d1bb9b0`, each with its own install: `--frozen-lockfile`, and at the tip also `--offline`, exit 0. No `.env`;
`SKIP_ENV_VALIDATION=1`. Suite, lint and differential ran under `unshare -rn`. Exit codes are in `exits.txt`, and the comparisons in
`final-compare.txt`. Exports are deleted. Instruments by sha256 are in `instrument.sha256`: the differential's test file
`d597c91a…`, `compare.py` `6dd66ac7…`, and code review's `prod-edges.py` `20bb1e0f…`, referenced by path.

| Criterion | Instrument | Result at `d1bb9b0` |
|---|---|---|
| Suite | `vitest --reporter=json` | **2261 of 2261, 0 failed, 154 files, `success` true, process exit 0**; path membership and per-file counts identical to `969d92a` |
| M1-a/b/c, M1-i over the callers | differential v3 against `base-7923a1d.json` | **0 violations over 1224 labels** (`tip-vs-base.txt`). The instrument's planted control was run at `a558f2d` (1 violation) and is unchanged since |
| `zod` | `require.resolve` from `src/server/api/utils` | **3.22.4** (`zod-resolved.txt`); `package.json` pins `3.22.4` |
| M2-c | build; `cmp` of `tsconfig.json`; markers; `(void 0)` receivers; typecheck after build; `ts-node -T` and typed | build exit 0; `tsconfig.json` identical to the commit; `highlightAuto` and `registerLanguage` in 1 static and 2 server files; **0** receivers; typecheck 0; `ts-node` 0 and 0 |
| M3 | lint JSON; build manifest and traces, against `969d92a` and the noise floor measured at M3 | lint exit 1, same 497 files, same per-rule counts (774). Build: 6 files differ from `969d92a`, **0 outside the noise set**. Trace paths **identical** to `969d92a`'s |
| M2-b (rev 8): production edges | `prod-edges.py` over `pnpm list --prod --depth Infinity --json` of `7923a1d` and `d1bb9b0`; `edge-classes.py` (QA's, by package name of parent or child) | 2178 → 2192 edges, **72 removed and 86 added** (`prod-edges-7923a1d-d1bb9b0.txt`). That equals code review's M2 (68/76) plus M3 (4/10). Classified: **143 in M2-b's named movers, 11 in M3's CR-5 edges**. 4 unclassified by the name predicate (`edge-classes.txt`): `webpack-bundle-analyzer@4.10.1`'s `acorn` 8.8.1 → 8.16.0 and `picocolors` 1.0.0 → 1.1.1, both re-pointed. `webpack-bundle-analyzer` is `@next/bundle-analyzer`'s own dependency, which M2-b's class names. The predicate checks only the edge's own parent and child, not the subtree, so it missed them. The package runs only when `ANALYZE=true` (`next.config.js` line 2). **All 158 are in class.** The pin moves no edge |
| M4 R1, R2 | `layout.navigation-guard.test.tsx`, `NavigationGuardProvider.link-confirmation.test.tsx` | in the 2261 passes (unchanged files since `7923a1d`, outside the chain's diff) |
| M4 R5 | `git grep -c -E "loading: \(\) => null" d1bb9b0 -- src/components/dynamics` | 6 files, 1 each (unchanged since `7923a1d`) |
| M4 R6 | QA's re-read in the export's installed `next` 16.4.6 (`r6-reread2.txt`) | `dist/client/components/router-reducer/create-segment-key.browser.js` exports `createSegmentKey` as `createRouterCacheKey`, and `dist/build/browser-variant-modules.js` lists that module. `layout-router.js` keys `activeStateKey` by `createSegmentKey(activeSegment)` and hides the previous entry (`mode: stateKey === activeStateKey ? 'visible' : 'hidden'`). `MAX_BF_CACHE_ENTRIES` is `process.env.__NEXT_CACHE_COMPONENTS ? 3 : 1` (`bfcache-state-manager.js`), and the site's `next.config.js` has 0 `cacheComponents`. **This agrees with the implementer's read**, so no R6 walk is owed by the plan's "if the read differs" |

## Effort-final mutation sweep

The sweep covers the production code this effort changed, `git diff 7923a1d..d1bb9b0`. That code has 15 JS/TS files
(`chain-jsts-files.txt`). 13 are byte-identical between `a558f2d`, where M1's sweep ran, and `d1bb9b0`
(`blob-identity-a558f2d-d1bb9b0.txt`). That includes the five production files the sweep mutated (`src/constants/index.ts`,
`usePreferences.ts`, `routers/message.ts`, `routers/user.ts`, `utils/shapes.ts`) and every test file and helper the sweep ran. The two
that differ are M3's: `eslint.config.mjs` (lint configuration, outside production) and `src/@types/global.d.ts` (one
`eslint-disable` directive comment, with no executable or type change). By the sweep rule (owner ruling, qa.md), a round with no
production change re-runs only the survivors it closes, and none is open. **So the effort-final sweep is M1's sweep at `a558f2d`
(`qa/018-next-upgrade-save-size-cap-m1-qa.md`):** 66 of 69 applied mutants killed, NM-4 re-targeted and killed, 3 survivors
equivalent. The zod pin strengthens F-3's equivalence argument: it rested on zod 3.22.4's `makeIssue`, and 3.22.4 is now the only
version the specifier admits.

**Verdict: PASS, effort-final at `d1bb9b0`.** M1, M2 and M3 are re-verified at this tip. M4's QA limbs hold, and its walks are UAT's
(B-3). No new QAF finding. QAF-1 to QAF-11 are resolved or folded (QAF-11 at revision 8). The plan's Status is set to `QA Complete`.

**Handed to UAT (register, `qa/018-next-upgrade-save-size-cap-qa.md`):**
- pre-release on a local build at this tip: B-1, B-2 (both limbs, the second carrying the capped refusal over HTTP), B-3 and B-9;
- the preview: B-4 and B-5;
- post-deploy, in devops's Stage-1 handoff: B-6, B-7, B-8 and B-10.

**Rows inherited and not discharged:** B-1 to B-10, all.

## Assumption Not Checked

This pass assumes, and does not test, that the release tip devops assembles is this tree. Any later commit, a rebase or a squash
makes the tree differ. The signature of its falsity: `git diff d1bb9b0 <release tip>` non-empty over production paths. Owner: devops,
whose release-tip verdict is Phase 3 (or this verdict, where the trees are equal).
