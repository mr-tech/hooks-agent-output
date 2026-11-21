---
ID: n/a
Origin: fix-git-dependency-pins
UUID: 84f208f7
Status: Active
Status-Detail: "Project-utils half committed at 40ba5d3 on chain/fix-git-dependency-pins and handed to code review; the project-utils master push (devops, no approval) follows. The website half (scope items 3-4) has not started: it waits for steering-hooks to switch the website tree and name the pushed project-utils commit."
Handoff-At: 40ba5d3 — repos=project-utils; website half not started
Origin-Chain: none
---

# fix-git-dependency-pins — implementation

## Scope statement

The scoping determination is `steering/fix-git-dependency-pins-rulings.md`, block "2026-11-21T22:58 — scoping determination", with
the owner's selections in block "2026-11-21T22:28" (pin by hand; both library tidy-ups in). It was relayed by `steering-hooks` in
`steering/fix-git-dependency-pins-brief-fixer.md` and the common part `steering/fix-git-dependency-pins-brief-common.md`. The block
governs; its scope statement, quoted:

> Project-utils half, on `chain/fix-git-dependency-pins` cut from `origin/master` `749606d`:
> 1. `prisma-kysely` moves from `dependencies` to `devDependencies` in `package.json`; `package-lock.json` changes only in that
>    package's `dev` flags/placement.
> 2. `dist/prisma.js` and `dist/prisma.js.map` are deleted; a `npm run rebuild` (or `build` + `build:types`) leaves `dist/`
>    byte-identical to the committed tree apart from those two deletions — any other `dist/` difference is a stop-and-ask, not a fix.
>
> Website half, on `chain/fix-git-dependency-pins` cut from `origin/master` after chain 6's release:
> 3. `package.json:69` `project-utils` names the new project-utils commit (the one devops pushed); `:126` `paracord` names
>    `3f203086…` (the lockfile's commit). Both by full SHA.
> 4. `pnpm-lock.yaml` is edited by hand to match (his selection A): the two specifier lines, project-utils' resolved commit and its own
>    dependency list (`prisma-kysely` leaves its runtime set, with whatever subtree only it held); no other package version moves.
>    `pnpm install --frozen-lockfile` exits 0; suite and `pnpm run typecheck` exit 0.
>
> Write set: those paths; in the record, the fixer's document and `verification/fix-git-dependency-pins/`. Any other file is a re-scope.

The block's note under 22:28 reads item 1's "only in that package's dev flags" as "no unrelated package moves", bounded to the
package's own subtree. This document reads it the same way and proves it under Test (classifier).

## Entry Conditions

| Condition | Value |
|---|---|
| Scoping determination | `steering/fix-git-dependency-pins-rulings.md` block "2026-11-21T22:58", relayed in the fixer brief with its route |
| Bounded scope statement | Quoted above: items 1-2 (project-utils) now, items 3-4 (website) later; write set and stop conditions as quoted |
| Fix branch | project-utils `chain/fix-git-dependency-pins`, cut by steering from `749606d` (`git -C … branch --show-current` read at session start: `chain/fix-git-dependency-pins`; HEAD `749606d`; porcelain empty). Website: not yet this chain's |
| Record on the mechanism | `architecture/system-architecture.md` L121, L166, L236-237 (the project-utils pin and the 13 `dist/` files), cited by the common brief and not edited. The sweep `verification/fix-git-dependency-pins/scoping/sweep.md`. The `pinned-dep-shipping` skill (`~/.claude/skills/pinned-dep-shipping/SKILL.md`) for the build-in-tree shape. No `research/` entry covers project-utils' manifest beyond F-36 in `research/codebase-bug-evaluation-2026-11-08.md` |

## Diagnosis

**Cause, item 1.** `prisma-kysely` is the Prisma generator named by `prisma/schema.prisma:5` (`provider = "prisma-kysely"`). It
writes `src/generated/db/types.ts` at development time. Nothing in `src/` or `dist/` names it at `40ba5d3`: `git grep` for
`prisma-kysely`, `prisma'` and `prisma"` over `src dist` returns nothing. It was nonetheless in `dependencies`, so every consumer's
runtime install carried it and its subtree. *Instrument:* the check script's A3 at `749606d`, where `npm ci --omit=dev` installs
`node_modules/prisma-kysely`, `@prisma/internals` and `@mrleebo/prisma-ast` (`red-749606d/a3-presence.txt`).

**Cause, item 2.** `dist/prisma.js(.map)` is the build of a `src/prisma.ts` that no longer exists. It last changed in `248663d`
(2023-08-02) and `9a7079f` (2023-07-26, "replace prisma connector with kysely"), both before the pipeline. A clean build does not
produce it. *Instrument:* the check script's A2 at `749606d`, where a clean rebuild differs from the committed `dist/` in exactly two
lines, `Only in committed/dist: prisma.js` and `Only in committed/dist: prisma.js.map` (`red-749606d/a2-dist.diff`, `grep -c ''` = 2).
So the committed `dist/` is **not** otherwise stale, and the brief's stop condition (hazard 1) did not fire.

**Why the shared tree kept it.** The shared tree's gitignored `build/js/` holds `prisma.js` and `prisma.js.map` dated 2023-07-26.
They are byte-identical to the old committed `dist/prisma.js` (`cmp` exit 0). `tsc -b` does not delete outputs of removed sources, and
the `build` script's `cp -r build/js dist` copies them back. A clean export has no such cache, which is why A2 differs there. This is
the mechanism behind item 2, and it bears on the hand-off (below): any rebuild in the shared tree recreates the two files as untracked.

**Origin-Chain: `none`.** The faulty lines are `package.json:14` (in project-utils history since before the pipeline) and the two
`dist/` files from `248663d`/`9a7079f` (2023).

**Consumers of the changed install set.** This change alters what a consumer installs at runtime. Inside this workspace the only
consumer is `website` (sweep). At website `origin/master` `0c14d5b`, `git grep` for `prisma-kysely`, `project-utils/dist` and
`project-utils/` outside `pnpm-lock.yaml` returns nothing (exit 1). Website imports project-utils only through the package root,
which resolves to `dist/index.js` (A4: loads under a runtime-only install, exports `getPostgres`). Consumers outside the workspace were
not read (the determination's "what the sweep did not cover").

**Residue in production.** No write runs, so there is no data residue. The residue is install state: website's `pnpm-lock.yaml`
still pins project-utils `749606d` with `prisma-kysely` and its subtree in its runtime set. This half's release (the project-utils
`master` push) delivers nothing to any consumer by itself; each consumer changes only when it re-pins. That is item 3-4 for website,
and unknown for consumers outside the workspace.

## Change

project-utils, commit `40ba5d3` on `chain/fix-git-dependency-pins` (parent `749606d`); `git show --numstat`:

| Path | + | − | Change |
|---|---|---|---|
| `package.json` | 1 | 1 | `prisma-kysely` `^1.5.0` from `dependencies` to `devDependencies` (same range) |
| `package-lock.json` | 760 | 194 | Root `dependencies`/`devDependencies` move; `"dev": true` gained by 283 entries in each of `packages` and the legacy `dependencies` section. Nothing else (Test, classifier) |
| `dist/prisma.js` | 0 | 21 | Deleted |
| `dist/prisma.js.map` | 0 | 1 | Deleted |

Production lines added: 1 (`package.json`). A lockfile is generated, not authored, and is not counted.

**Lockfile.** The lockfile was produced by `npm install --package-lock-only` (npm 11.9.0, node v24.14.0) in an export at `749606d`
after the `package.json` edit, then copied into the shared tree. It stays `lockfileVersion: 2`. Every change is dispositioned by the
classifier below: no entry added, removed or re-versioned; no `resolved`, `integrity` or dependency list changed. Project-utils is not
deployed by any host. Its consumers install it with pnpm, which reads the website lockfile, not this one, so the deploy-host
package-manager check belongs to the website half.

## Test

The surface is the package as a consumer installs and loads it; project-utils carries no test suite (workspace `CLAUDE.md`). The
red/green instrument is the committed spec check `verification/fix-git-dependency-pins/check-project-utils.sh <repo> <rev> <out>`.
It runs on a committed SHA in a `git archive` export under the session scratch directory, never the shared tree, with output to files,
per-step `timeout`, and a `systemd-run --user --scope` cap (`RuntimeMaxSec=1500`, `MemoryMax=8G`, `TasksMax=512`). Its assertions:

- **A1** `prisma-kysely` is in `devDependencies` and not in `dependencies`, in `package.json` and in the lockfile root, and
  `node_modules/prisma-kysely` is `dev: true`.
- **A2** `npm ci`, then `npm run build && npm run build:types`, reproduces the committed `dist/` byte for byte (`diff -r`) and leaves
  `src/` untouched; `eslint . --max-warnings=0` (without `--fix`) exits 0.
- **A3** `npm ci --omit=dev` installs no `node_modules/prisma-kysely`.
- **A4** `require('./dist/index.js')` under that runtime-only install exposes `getPostgres`.

**Red run, at `749606d`:** exit 1. A1 FAIL (`pkgDeps "^1.5.0"`, `pkgDev null`, `lockEntryDev false`). A2 FAIL (`distdiff=1`: exactly
the two prisma files). A3 FAIL (present). A4 PASS. A4 states behaviour that must not regress; it passes at the base by design and is
the guard, not the red case. Capture: `verification/fix-git-dependency-pins/red-749606d.stdout` and `red-749606d/`.

**Green run, at `40ba5d3`:** exit 0, A1-A4 PASS. `a2-dist.diff` empty (`grep -c ''` = 0), lint 0, build 0. Capture:
`green-40ba5d3.stdout` and `green-40ba5d3/`. **Disclosed:** the record repository's `.gitignore` excludes `*.log`, so the
script's five step-log captures were renamed to `.txt` after the first red and green runs. Both runs were then repeated with the
script as committed, with the same four results each, and the committed captures are from those repeats. The runtime-only install's top-level `node_modules` entries fell from 232 to 19, with 213
removed and 0 added (`runtime-dirs-removed.txt`, `runtime-dirs-added.txt`, by `comm` over the two captures; counts by `grep -c ''`).

**Lockfile classifier**, `verification/fix-git-dependency-pins/classify-lock-diff.js <base lock> <new lock>`, exit 0 only when every
difference is the root move plus `dev: true` gains, and the entries gaining it are exactly the base lock's runtime entries reachable
from `prisma-kysely` and from no other runtime root dependency (node's nearest-`node_modules` lookup). Result over `749606d` → the new
lock (`lock-classify.json`): `ok: true`, 0 added, 0 removed, `devGained` 283 in each section, `baseRuntimeOnlyViaPrismaKysely` 283,
both mismatch lists empty. The committed lock is the one classified: `git diff --quiet HEAD -- package-lock.json` passed after the
copy and commit.

**Negative controls (classifier).** (1) `node_modules/zod`'s version altered in the new lock: exit 1
(`lock-classify-control-version.json`). (2) `node_modules/kysely`, a runtime package `prisma-kysely` does not reach, given `dev: true`:
exit 1, `devGainedNotOnlyViaPrismaKysely: ["node_modules/kysely"]` (`lock-classify-control-dev.json`). The check script's own control
is the red run: the same script, the same steps, the unfixed tree.

No lifetime is added, no work is declined, and no irreversible action is added by the fix (the push is devops's).

## Verification

| Check | Command | Result |
|---|---|---|
| Existing tests | none: project-utils carries no tests (workspace `CLAUDE.md`) | not applicable |
| Build | A2: `npm ci && npm run build && npm run build:types` in an export at `40ba5d3` | exit 0; `dist/` byte-identical to `40ba5d3` |
| Lint | A2: `npx eslint . --max-warnings=0` (no `--fix`) in that export; also `npm run rebuild` in the pre-commit hook | exit 0 |
| Workspace build verification | the workspace `CLAUDE.md` names none for project-utils (`verify-pinned-build.sh` is statbot's) | not applicable |
| Convention check | `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/project-utils --since=749606d` | exit 0; 0 FAIL, 0 CANDIDATE, 5 SKIP. Unchecked: the two deleted `dist/` files ("missing file"), `package.json` and `package-lock.json` (".json is outside the examined set"), and the id-token/basename rule ("checker does not implement verbatim"). No source file changed (`convention-check-40ba5d3.txt`) |

**Disclosed, the commit gate.** project-utils sets `core.hooksPath=.githooks/`. Its `pre-commit` runs `npm run rebuild` (`eslint --fix`,
`build`, `build:types`) in the shared tree and refuses the commit when `git ls-files -m` is non-empty. The shared tree had no
`node_modules`, so this session ran `npm ci` there (exit 0, lockfile unchanged: `git diff --numstat` identical before and after) to
satisfy the gate, and did not bypass it. The hook's rebuild then recreated `dist/prisma.js(.map)` as untracked files from the stale
`build/js/` cache (Diagnosis). This session removed both files by literal path and removed `node_modules` by literal path. Porcelain
was empty before the change and is empty after (`git -C project-utils status --porcelain`). The hook also rewrote the gitignored
`build/` outputs (`build/js/*`, `build/types/`, `tsconfig.tsbuildinfo`) as any build does. `build/js/prisma.js(.map)` was left as found:
it is outside the write set (Handoff, item for steering).

## Handoff

- **Project-utils half:** `Handoff-At` `40ba5d3` on project-utils `chain/fix-git-dependency-pins`, branch not pushed (no upstream).
  Code review by `code-reviewer-fix-git-dependency-pins` at `40ba5d3`, which also re-runs the red evidence: the same script at
  `749606d` and at `40ba5d3`. QA Phase 2 is not in the stage set (1 production line). Merge and push: devops brings `40ba5d3` onto
  project-utils `master` and pushes it mid-chain. No approval is needed: there is no `.github/` and the push deploys nothing (block
  22:58). The fix branch is merged into `master` at that push and deleted after.
- **For steering (not blocking):** the shared tree's gitignored `build/js/prisma.js` and `build/js/prisma.js.map` (2023-07-26) make
  every rebuild in `/usr/local/bin/hooks/project-utils` recreate `dist/prisma.js(.map)` as untracked files. A later
  `git add .`-style commit there would bring them back. Deleting the two cache files is outside this chain's write set; this session
  has not touched them.
- **Website half:** not started. It begins when `steering-hooks` says the website tree is on `chain/fix-git-dependency-pins` and names
  the pushed project-utils commit.

## User-visible flows

None for this half. project-utils is a library: nothing a website visitor sees changes until the website half pins it. The website
half adds the flows for the owner's check.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-21T23:04 | fixer-fix-git-dependency-pins | Document created. Project-utils half: red at `749606d`, fix committed `40ba5d3`, green at `40ba5d3`; handed to code review |
