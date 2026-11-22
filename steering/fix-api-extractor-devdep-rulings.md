# Rulings — fixer chain `fix-api-extractor-devdep` (project-utils: its type build uses an undeclared tool)

Fixer chain steered by `steering-hooks`, effort `fixer-queue-2026-11-21`, opened under his ruling "Just fix everything you find along the
way." (effort rulings block "2026-11-22T04:50"). tmux category: `fix-api-extractor-devdep`. Found by chain 7's sweep
(`verification/fix-git-dependency-pins/scoping/sweep.md`, P2 observation).

## 2026-11-22T04:58 — scoping determination: fixer chain, project-utils only

**His words.** Effort block 04:50 (fix what is found; no fix-or-not question). No scope question: one undeclared build tool, one obvious
remedy.

**Shape.** Hygiene. Defect read: project-utils `package.json:8` `build:types` runs `api-extractor run` (`git show 40ba5d3:package.json`),
and `@microsoft/api-extractor` is in neither `dependencies` nor `devDependencies`; it resolves on this box only through a global install
(`command -v api-extractor` → `/usr/local/bin/api-extractor`, `api-extractor --version` → 7.49.2; `project-utils/node_modules/.bin` holds
no `api-extractor`). Blast radius: project-utils `package.json` and `package-lock.json`. A devDependency is not installed by consumers, so
website's pin (`40ba5d3`, chain 7) needs no change. End step: project-utils `master` — no `.github/` (`release-move.js … 40ba5d3 --dry-run`
04:58Z: "DRY RUN: every check passed"; "workflows none"); deploys nothing, no approval. Tree: project-utils `master` `40ba5d3` =
`origin/master` (`git ls-remote`, 04:58Z), porcelain empty.

**Stage set:** `fixer-fix-api-extractor-devdep` → `code-reviewer-fix-api-extractor-devdep` (no production lines; the reviewer also runs
`npm run rebuild` with the global tool off the PATH) → devops pushes project-utils `master` (no approval). No QA, UAT or plan.

**Scope statement (bounded).** Project-utils only, on `chain/fix-api-extractor-devdep` from `origin/master` `40ba5d3`:
1. `@microsoft/api-extractor` joins `devDependencies` at a version compatible with `api-extractor.json` (the box's global is 7.49.2;
   the fixer records why the version it picks); `package-lock.json` changes only by that package's own subtree.
2. `npm run rebuild` (or `build` + `build:types`) succeeds with the global `api-extractor` removed from `PATH`, and leaves `dist/` byte-
   identical to the committed tree (no output change).
Write set: `package.json`, `package-lock.json`; in the record, the fixer's document and `verification/fix-api-extractor-devdep/`. Any other
file is a re-scope.

**Not covered:** whether other build tools are similarly undeclared (only `api-extractor` was read); consumers outside the workspace.

## 2026-11-22T04:58 — chain started

Project-utils `chain/fix-api-extractor-devdep` cut by this thread (below, same minute). `fixer-fix-api-extractor-devdep` started with
`tmux-agent spawn` (cwd `/usr/local/bin/hooks/project-utils`), brief `steering/fix-api-extractor-devdep-brief-fixer.md`.
The session sat on Claude Code's folder-trust prompt from 04:58Z until it was answered at the pane (not by this thread) before 07:10Z.

## 2026-11-22T07:10 — the fixer's BLOCKED: two in-range hoisted bumps are admitted (this thread's ruling)

The fixer by message 07:0xZ (record `5168a95`, Status Blocked): red at `40ba5d3` (`npm run rebuild` with the global tool off `PATH` →
`api-extractor: not found`, exit 127); green candidate `npm install --save-dev @microsoft/api-extractor@7.49.2 typescript@5.1.6`
(`package.json` gains only `"@microsoft/api-extractor": "^7.49.2"`; rebuild passes; `dist/` byte-identical, `diff -r` exit 0; top-level
`typescript` keeps 5.1.6). Outside the new package's subtree, two shared hoisted copies move: `function-bind` 1.1.1→1.1.2 and
`is-core-module` 2.11.0→2.18.0, each required by the new subtree and still in range for their existing dependents (eslint tooling only);
lint passes. **Ruling (this thread's; scope item 1's "only by that package's own subtree" was its own over-tight wording; the write set is
unchanged):** option 1 — commit the green candidate as it stands; the two in-range hoisted bumps of dev-only tooling are part of placing the
subtree. Not option 2 (a hand-placed nested lock the next `npm install` undoes). Not put to him: a technical bound inside the write set
under his "fix everything you find" (effort block 04:50); no product behaviour and no consumer install changes (devDependencies).

## 2026-11-22T07:11 — the fixer's second BLOCKED: the pre-commit hook's rebuild in the shared tree is admitted (this thread's ruling)

The fixer by message 07:1xZ: the commit was not made — project-utils' pre-commit hook (`core.hooksPath=.githooks/`, read: `npm run rebuild`
then refuse if `git ls-files -m` is non-empty) stopped at lint (`eslint: not found`) because the shared tree has no `node_modules`
(`ls -d` fails, 07:11Z); passing it needs `npm ci` in the tree and a rebuild that rewrites gitignored `build/js`, `build/types` and `dist/`.
This thread's read: `build/` was created 2023-03-02 but `build/js` was last written 2026-11-21 (`ls -la`) — chain 7's own hooked commit
rewrote it; it is regenerated build output, owned by no live session. **Ruling: option 1** — `npm ci` in the shared tree (its gitignored
`node_modules/` is the intended steady state for a tree whose hook needs it) and the hook's rewrite of `build/`; commit with the hook active
(never `--no-verify`), then show `git diff --quiet HEAD -- dist` and `git status` clean. The brief's "leave anything in `build/` you did not
create" was this thread's guidance for the stale prisma cache, now superseded for regenerated output. The hook is a build gate whose remedy
is the rebuild — satisfying it, disclosed here.

## 2026-11-22T07:13 — handed off at `a47e683`; review

Spawn cue 07:1xZ (the fixer): record `1168acc`, `Handoff-At: a47e683 — repos=project-utils; base 40ba5d3` (read by this thread).
`git diff --numstat 40ba5d3 a47e683`: `package.json` 1/0, `package-lock.json` 745/15; in the write set. The fixer: hook active and passing;
`git diff --quiet HEAD -- dist` exit 0; porcelain empty. `code-reviewer-fix-api-extractor-devdep` started with `tmux-agent spawn` (cwd
`/usr/local/bin/hooks/project-utils`, a folder Claude Code now trusts), brief `steering/fix-api-extractor-devdep-brief-code-reviewer.md`.

## 2026-11-22T07:19 — review approved at `a47e683`; devops started

Spawn cue 07:1xZ (the reviewer): record `f23a0fe`, `Reviewed-At: "a47e683 — repos=project-utils; base 40ba5d3"`, round 1
APPROVED_WITH_COMMENTS (read: anchor line, commit subject). Red at `40ba5d3` exit 127; green at `a47e683` exit 0, `dist/` byte-identical (11
files, sha256 manifests). CR-1 LOW: `/usr/local/bin/statbot/statbot-utils` has the same undeclared `api-extractor` — outside this workspace;
lodged in `/usr/local/bin/statbot/agent-output/INBOX.md` for that record's owner. The reviewer disclosed an in-place python edit of its own
document (recorded in its changelog) and an uncommitted `INBOX.md` entry of its own. `devops-fix-api-extractor-devdep` started with
`tmux-agent spawn` (cwd `/usr/local/bin/hooks/project-utils`), brief `steering/fix-api-extractor-devdep-brief-devops.md`.
