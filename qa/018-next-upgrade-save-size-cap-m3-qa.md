---
ID: 018
Origin: 018
UUID: 6273a762
Verified-At: "969d92a — repos=website; M3 only, beside its parent a558f2d; isolated exports with their own install"
Status: QA Complete
Status-Detail: "M3 PASS at website 969d92a: M3-a to M3-e hold; suite 2261/2261 exit 0, identical to a558f2d; built JS identical beyond a measured noise floor. QAF-11 LOW (the build's function traces gain 4 package-metadata entries) to the Planner batch beside CR-5."
Phase: 2
---

# QA Report: Plan 018 — M3, lint on ESLint 9 and a flat config (D-6)

**Plan Reference**: `agent-output/planning/018-next-upgrade-save-size-cap.md`, revision 7 (`af8a9d6`), § M3. The chain's register is
in `qa/018-next-upgrade-save-size-cap-qa.md`. M3 has no register row.
**Stage start:** the code review's committed verdict, Round 3, APPROVED_WITH_COMMENTS at `969d92a` (agent-output `a05fb21`; plan row
R-14 `56d5f83`), re-read at the record. `969d92a`'s parent is `a558f2d`. Its diff is `.eslintrc.json` (deleted), `.eslintignore`
(deleted), `eslint.config.mjs` (new), `package.json`, `pnpm-lock.yaml`, and one directive line in `src/@types/global.d.ts`.
**Implementation:** `implementation/018-next-upgrade-save-size-cap-m3-implementation.md`.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T06:05 | code-reviewer-hooks-018 (Round 3, `a05fb21`) | QA Phase 2 on M3 at `969d92a` | Phase 2 on M3. M3-a to M3-e were checked. Suite 2261/2261, exit 0, identical per file to `a558f2d`. Built output against a second build of the parent: no JS or manifest difference beyond the noise floor. Five function traces gain the `package.json` and directory of `cross-spawn@7.0.6` and `semver@6.3.1`. This closes code review Round 3's Assumption Not Checked as falsified in its letter, with no code member. **QAF-11 LOW** goes to the Planner batch. **PASS (M3).** |

## Criteria this pass assesses (listed before execution)

- **M3-a:** lint exit at the tip; the old configs absent.
- **M3-b:** every base entry and ignore line has a ledger row.
- **M3-c:** QA's own lint differential, by file membership and per-rule counts, with every differing id carrying a cause row.
- **M3-d:** the defaults rows; the config restores the base behaviour; the `ban-types` directive is gone.
- **M3-e:** lint stays unenforced.
- **Code review's Assumption Not Checked:** `next build` output is unchanged.
- **CR-5's edges:** do they reach what ships?
- **The suite and typecheck at the tip.**
- **TDD gate:** the exemption "not feature code" is checked by execution.
- **Sweep:** none owed. The M3 diff has no production logic; its one source line is a lint directive comment. No Irreversible
  Side-Effect Register guard changes.

## Test Execution Results

Driver: `verification/018/qa/m3-phase2/run.sh`, under `systemd-run --user --scope`. It ran on `git archive` exports of `a558f2d` and
`969d92a`, each with its own `pnpm install --frozen-lockfile` (exit 0), no `.env` and `SKIP_ENV_VALIDATION=1`. Lint and the suite
ran under `unshare -rn`. Builds had network (`next/font`). Lint ran before any build in each export. Exit codes are in `exits.txt`,
and the comparisons are in `compare.py` → `compare.txt`. Exports are deleted.

| Criterion | Instrument | Result |
|---|---|---|
| M3-a | `pnpm exec eslint . --max-warnings=0 --format json` (never `--fix`); `ls -d` of the configs | exit **1** at `969d92a` (and 1 at `a558f2d`). `.eslintrc.json` and `.eslintignore` are absent at the tip; `eslint.config.mjs` is absent at the parent (`*-lint-configs.txt`) |
| M3-b | base `.eslintrc.json` evaluated by `node` (it carries comments), every rule id in it (45 top-level, 32 override) and the 9 `.eslintignore` lines searched in the ledger section | **77 of 77** rule entries, 9 of 9 ignore lines, and every named key and removed rule (`semi`, `no-throw-literal`, `space-before-blocks`, `type-annotation-spacing`, `member-delimiter-style`, `no-restricted-syntax`) found |
| M3-c | QA's tally of both JSON outputs (`compare.py`), a third run beside the implementer's and code review's | files **497 → 497**, identical membership. Findings **665 → 774**. **19** rule ids differ (`rule-diff-ids.txt`). Each has a cause row in the implementation's M3-c table (`m3c-cause-rows.txt`: 0 missing). The implementer's table has 21 ids and its base 498 files, because its exports carried `next-env.d.ts`: the extra ids `import/extensions` and `quotes` are both in that file, and code review's 498 is the same file. Lint before any build has no such file, which reconciles all three |
| M3-d | config read at `969d92a`; `git grep ban-types` | `linterOptions.reportUnusedDisableDirectives: 'off'`; `caughtErrors: 'none'`; the TypeScript blocks scoped to `**/*.ts`/`**/*.tsx`; the directive in `global.d.ts` renamed to `@typescript-eslint/no-empty-object-type`; 0 `ban-types` in `src` |
| M3-e | `package.json`'s `lint` script; no CI or hook runs it | form kept (code review's diff read); lint stays red (exit 1) |
| Suite | `vitest --reporter=json` at `969d92a` | **2261 of 2261, 0 failed, 154 files, `success` true, process exit 0**. Path membership and per-file (cases, passed) are identical to `a558f2d` (`suite-compare.txt`) |
| Typecheck | `pnpm run typecheck` after the build | exit 0 at both trees |
| Build output (code review's Assumption Not Checked) | sha256 of every file under `.next/server` and `.next/static`, with the build id replaced (`*.manifest`), over three builds: parent ×2 and tip ×1 | parent build 1 against build 2 (**noise floor**): 6 of 717 files differ (middleware and server-reference manifests, `preview-props.json`). Parent against tip: 11 differ, of which **5 are outside the noise set, all `*.nft.json` traces** (`server/pages/api/trpc/[trpc]`, `auth/[...nextauth]`, `cron`, `interactions-server`, `messages/codes/[code]`). No JS chunk differs |
| CR-5's packages in what ships | `grep -rlE 'fast-glob\|is-core-module\|@prisma/internals'` over built JS; the union of trace paths (`*.nft-paths`, `nft-paths.diff`) | **0** built JS files at either tree. Traces gain exactly 4 paths: `cross-spawn@7.0.6/node_modules/cross-spawn` and its `package.json`, and `semver@6.3.1/node_modules/semver` and its `package.json`. No JS file of either package is traced |

## Findings

QAF-11 LOW Phase 2 — the plan's M3 rollback line says lint "affects no build or runtime output", and code review's Round 3 premise
expected the built `.next` to be unchanged. At `969d92a`, five API functions' file traces (what Vercel packages for each function)
each gain package metadata for `cross-spawn@7.0.6` and `semver@6.3.1`, compared against two builds of the parent. Only the package
directory and `package.json` are traced; no JS of either package is traced or bundled. These come from M3's lockfile re-pointing,
CR-5's class. **Property to check:** the deployed function file set at the release tip, read from the `.nft.json` traces, against
the parent's, with every added path dispositioned. This pass did that for M3: 4 paths, all metadata. No runtime member exists, so
the finding is a record correction. **To the planner,** for the batch beside CR-5: correct the M3 statement to "M3 changes no
built JS; it adds 4 package-metadata paths to five functions' traces". The instrument is `m3-phase2/compare.py` and its manifests.

## TDD gate and sweep

The implementation states the exemption "not feature code". It is established above by execution: both configs over the same
sources, and the suite and build on both trees. Accepted. No sweep is owed; the effort-final sweep stays owed at the chain's last
Phase 2.

**Verdict: PASS (M3 only, at `969d92a`).** QAF-11 LOW does not block. Code review Round 3's Assumption Not Checked is closed: the
premise is false in its letter (5 trace files), and no code differs. M1 and M2 were verified at `a558f2d`. M3's diff changes no
production logic, and this pass's suite and build run at `969d92a` carry them unchanged (identical suite; no JS difference).

**Rows inherited and not discharged:** B-1 to B-10.

## Assumption Not Checked

This pass assumes, and does not test, that Vercel's install resolves the same versions this export's `pnpm install
--frozen-lockfile` did, so that its traces gain the same 4 metadata paths and nothing else. The signature of its falsity: the
preview deployment's function bundles list a JS file under `cross-spawn@7.0.6`, `semver@6.3.1`, `fast-glob`, `is-core-module`,
`hasown` or `@prisma/internals` that the parent's did not. Owner: devops at B-5 (the preview deployment's build read).
