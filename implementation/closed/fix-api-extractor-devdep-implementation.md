---
ID: n/a
Origin: fix-api-extractor-devdep
UUID: 3c9e71a4
Status: Released
Status-Detail: "Released: project-utils master a47e683 pushed 2026-11-22T07:22Z (deployment/fix-api-extractor-devdep-deployment.md). The Change section's lockfile sentence 'the work stops here for steering's ruling' is superseded by the 07:10 ruling (agent-output 832632c) and the two hoisted bumps are admitted; the body sentence is left as written (review CR-2)."
Handoff-At: a47e683 — repos=project-utils; base 40ba5d3
Origin-Chain: none
---

# fix-api-extractor-devdep — implementation

## Scope statement

Steering's scoping determination, `steering/fix-api-extractor-devdep-rulings.md`, block
"2026-11-22T04:58 — scoping determination: fixer chain, project-utils only", relayed in
`steering/fix-api-extractor-devdep-brief-fixer.md` by `steering-hooks`:

1. `@microsoft/api-extractor` joins `devDependencies` at a version compatible with `api-extractor.json`;
   `package-lock.json` changes only by that package's own subtree.
2. `npm run rebuild` succeeds with the global `api-extractor` removed from `PATH`, and leaves `dist/`
   byte-identical to the committed tree.

Write set: project-utils `package.json` and `package-lock.json`; this document and
`verification/fix-api-extractor-devdep/`.

## Entry Conditions

| Condition | Value |
|---|---|
| Scoping determination | rulings block "2026-11-22T04:58", brief from `steering-hooks` |
| Bounded scope statement | above; project-utils only |
| Fix branch | `chain/fix-api-extractor-devdep` (`git branch --show-current`, 07:06Z), at `40ba5d3` |
| Record on the mechanism | `ls agent-output/architecture agent-output/research` filtered for `project-utils` or `api-extract`: no entries |

## Diagnosis

- **Cause.** `package.json` `build:types` runs `api-extractor run`, and no `dependencies` or
  `devDependencies` entry provides it. It resolves only through the global `/usr/local/bin/api-extractor`
  (7.49.2). It came in with project-utils' `6a6bf1d` "init commit" (2023-03-01, `git log -S`), from
  before the pipeline, so `Origin-Chain: none`.
- **Instrument.** An export of `40ba5d3` (`git archive`), `npm ci`, then a run with
  `PATH=<shim of node/npm/npx>:/usr/bin:/bin` (`verification/…/run.sh`; 600 s group-kill timeout,
  `MemoryMax=8G`). Nothing ran in the shared tree, and the shared `build/` was not touched.
- **Output.** `command -v api-extractor` printed nothing, with exit 1 (`base-which.log`). The rebuild ended
  `sh: 1: api-extractor: not found`, `exit=127` (`red-rebuild.log`). By that point `build` had already run
  `rimraf dist && cp -r build/js dist`, so a failed `build:types` leaves `dist/` without `index.d.ts`.
- **Residue.** This is a build-time defect only. Consumers install `dist/` from the commit, and a
  devDependency never reaches them. There is no production state.

## Change (committed at `a47e683`; `git diff --numstat 40ba5d3 a47e683`: package.json 1/0, package-lock.json 745/15)

- `package.json`: `"@microsoft/api-extractor": "^7.49.2"` added to `devDependencies` (the only line that
  differs).
- `package-lock.json`: see the lockfile disposition below.

**Version.** I chose 7.49.2 because it is the global build that already resolves on this box, which is the
build that has been producing the committed `dist/index.d.ts` from this `api-extractor.json`. The green run
below shows it reproduces `dist/` byte for byte. Its run logs "Analysis will use the bundled TypeScript
version 5.7.2".

**Lockfile disposition** (`lockdiff.js`, which compares the lockfile's `packages` entries one by one):

| Attempt | Command (in the export) | Outside api-extractor's subtree |
|---|---|---|
| 1 | `npm install --save-dev @microsoft/api-extractor@7.49.2` | top-level `typescript` 5.1.6 → 5.7.2, which hoists api-extractor's exact pin over the project's own compiler; `function-bind` 1.1.1 → 1.1.2; `is-core-module` 2.11.0 → 2.18.0 (`lock-diff.txt`) |
| 2 | same, plus `typescript@5.1.6` (`package.json`'s typescript string stays `^5.1.6`) | top-level `typescript` keeps version, resolved URL and integrity and gains only a `license` field, while 5.7.2 nests at `@microsoft/api-extractor/node_modules/typescript`. Still moved: `function-bind` 1.1.1 → 1.1.2 and `is-core-module` 2.11.0 → 2.18.0 (`lock-diff2.txt`) |

In attempt 2 there are 32 added entries, all reached from api-extractor (including `hasown`, `es-errors`
and nested `resolve`). The two moved pins are shared, hoisted copies. Their new versions are needed by
api-extractor's subtree: `hasown` needs `function-bind ^1.1.2`, and the nested `resolve` 1.22.14 needs
`is-core-module ^2.18.0`. They also stay in range for their existing dependents: `call-bind`,
`es-abstract`, `get-intrinsic` and `has` (`^1.1.1`), and `resolve`, `eslint-plugin-import` and
`eslint-import-resolver-node` (`^2.9.0`/`^2.11.0`), all eslint tooling. npm hoisted the upgrade instead of
nesting it, so the lockfile no longer changes only by api-extractor's subtree. That is outside the
statement, and the work stops here for steering's ruling.

## Test

There is no suite; project-utils carries no tests (workspace `CLAUDE.md`). The determination names the
check, which ran as a red/green pair over the same driver:

- **Red** (`40ba5d3`, declaration absent, global off `PATH`): `npm run rebuild` → exit 127,
  `api-extractor: not found` (`red-rebuild.log`).
- **Green** (attempt-2 candidate, global off `PATH`): `npm run rebuild` → lint, build and `build:types`
  passed, "API Extractor completed successfully", exit 0 (`green-rebuild.log`).
- **`dist/` identity:** `diff -r` of the committed `40ba5d3:dist` against the rebuilt `dist/` → exit 0,
  no output (`dist-diff.txt`, 0 bytes), and the sorted file lists are identical. `src/` was unchanged by
  `eslint --fix`.

The red run is the negative control: the same driver over the tree without the declaration fails.

## Verification

- Existing tests: none in this repository.
- Build: green run above, under npm 11.9.0 / node v24.14.0 on this box. The deploy host's npm major is
  not applicable, because this release deploys nothing (`release-move.js … --dry-run`: "workflows none").
- Lint: `npm run lint` ran inside `rebuild` and passed (`--max-warnings=0`).
- `convention-check.js --since=40ba5d3` exited 0 with 0 FAIL and 0 CANDIDATE. It reported 3 SKIP: `package.json` and
  `package-lock.json` were not examined (`.json` is outside its examined set), and the ID-token and basename checks did not run
  (`convention-check.txt`). Nothing was checked by it, and the diff touches no source file.
- Shared-tree commit (rulings block "2026-11-22T07:11"): `npm ci` (exit 0), then `git commit --only` with the
  `.githooks/pre-commit` rebuild active, which passed. After it, `git diff --quiet HEAD -- dist` exited 0 and
  `git status --porcelain` was empty (0 bytes). The hook rewrote the gitignored `build/js` and `build/types`, as ruled.

## User-visible flows

None visible. This changes only which tools a developer needs installed to rebuild project-utils. What
consumers install and run is byte-identical.

## Handoff

SHA `a47e683` (project-utils, `chain/fix-api-extractor-devdep`). Reviewer: `code-reviewer-fix-api-extractor-devdep`,
which also runs `npm run rebuild` with the global tool off `PATH`. No QA: no production lines. Merge and push:
devops, to project-utils `master`, with no approval needed, because nothing deploys. Spawn cue sent to `steering-hooks`.

## Changelog

| Date | Change |
|---|---|
| 2026-11-22T07:09 | Created. Diagnosis, red and green runs recorded. Blocked on the lockfile-scope ruling. |
| 2026-11-22T07:11 | Steering ruled option 1 (rulings block "2026-11-22T07:10", agent-output `832632c`). Candidate applied to the shared tree (`git diff --numstat`: package.json 1/0, package-lock.json 745/15). The fix commit was not made: the `.githooks/pre-commit` hook (`core.hooksPath`) runs `npm run rebuild`, the shared tree has no `node_modules`, and the hook stopped at lint before build. Blocked on steering's ruling over running the hook's rebuild in the shared tree, which writes `build/`. |
| 2026-11-22T07:12 | Steering ruled option 1 on the hook (rulings block "2026-11-22T07:11", agent-output `f439e11`). `npm ci` ran in the shared tree, and the fix was committed as project-utils `a47e683` with the hook active. dist/ is unchanged and the tree is clean. Handed off to code review. |
| 2026-11-22T07:23 | Document closed (devops). Status: Released. project-utils `master` moved `40ba5d3` to `a47e683` at 07:22Z; `Status-Detail` brought into agreement with the 07:10 ruling (review CR-2). |
