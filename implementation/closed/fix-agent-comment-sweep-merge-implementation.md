---
ID: n/a
Origin: fix-agent-comment-sweep-merge
UUID: 8f0ab0f7
Status: Released
Status-Detail: "Released 2026-11-10T10:13Z: website master = 6d78b19 on origin. Record: deployment/fix-agent-comment-sweep-merge-deployment.md."
Handoff-At: 6d78b19 — repos=website
Origin-Chain: none
---

# fix-agent-comment-sweep-merge — implementation

## Scope statement

The owner's words, "merge it" (witnessed by steering, rulings file
`steering/chore-agent-comment-sweep-rulings.md`, block "2026-11-10T09:40Z — \"merge it\""), reopen the
2026-10-10 Hold in the same file. They name the merge into `master` and not a push. The bounded
statement, relayed by `steering-cleanup-hooks` in
`steering/comment-sweep-briefs/comment-sweep-fixer-brief.md`:

> Bring `chore/agent-comment-sweep` (website `9cefc7d`: agent-authored source comments removed from 34
> files) up to `master` so that `master` can fast-forward to it. Merge `master` into the branch — no
> rebase, no amend, no history rewrite — resolving the two content conflicts
> (`src/server/api/utils/shapes.ts`, `src/server/api/v1/__tests__/guildMessages.valid-exposure.test.ts`).
> The merged tree is `master`'s code with the sweep's comment removals and nothing else. Out: any code
> change; sweeping comments in files or lines the sweep commit did not touch; `project-utils`,
> `preview-image-generator`; switching the tree; any move of `master`; any push.

The determination's In list adds "removing agent-authored comments in lines the sweep already touched".

## Entry Conditions

| # | Condition | Value |
|---|---|---|
| 1 | Scoping determination | `steering/chore-agent-comment-sweep-rulings.md`, block "2026-11-10T09:40Z", § "Scoping determination", relayed by the brief above. |
| 2 | Bounded scope statement | Quoted above. |
| 3 | Fix branch | `chore/agent-comment-sweep`, not a `fix/` name. The brief states this difference and does not override anything. Steering checked it out in `website`. At start it was read as branch `chore/agent-comment-sweep`, HEAD `9cefc7d`, `status --porcelain` 0 lines (through a file), `master` = `origin/master` = `b96e364`, merge-base `f2c85f5`, `rev-list --count HEAD..master` = 62. |

Read at start: the brief, the rulings file whole (including the 2026-10-10 Hold), the lifecycle
`SKILL.md` and its `seams`, `documents`, `claims` and `escalation` references, the workspace
`CLAUDE.md`, and `architecture/website.md` by its headings only. W-1…W-7 and A-1…A-5 are about
behaviour, and this change has none.

## Diagnosis

There is no defect. The change is a merge, and what the brief asks to prove is that the merged tree is `master`'s
code with comments removed. Below, *instrument* means the thing that establishes each fact.

- **Conflicts.** Instrument: `git merge --no-ff --no-commit master` at `9cefc7d` in an isolated
  worktree (`git worktree add --detach`, scratchpad). It exits 1 with content conflicts in the two
  files the brief names and in no others (`git diff --name-only --diff-filter=U`). Both conflicts set a
  comment the sweep removed against code `master` changed beside it:
  - `shapes.ts`, at `describeDroppedComponentTypesNotice`. The sweep removed a three-line comment above
    the signature, and `master` reflowed the signature. Resolved to `master`'s signature with the
    comment left out.
  - `guildMessages.valid-exposure.test.ts`, first hunk. The sweep removed the file's header block
    comment, and `master` changed the import list and added `import { makeRes } from
    './helpers/apiResponse'`. Resolved to `master`'s imports with the block comment left out.
  - `guildMessages.valid-exposure.test.ts`, second hunk. Both sides changed the code: the branch kept a
    local `makeRes()`, and `master` moved it to the helper and added `headers` and the env stubs.
    Resolved to `master`'s side unchanged. The branch's local `makeRes` is not a sweep change. It is the
    base's code that `master` replaced.
- **Comments the allowlist keeps.** Instrument: `grep -nE` over the sweep's removed lines (`git diff
  f2c85f5 9cefc7d`, written to a file), for every tool-directed form in `comment-gate.js`'s `ALLOW`
  (`eslint-…`, `@ts-…`, `@vitest-environment`, `escaped:`, `artefact:`, `biome-ignore`,
  `prettier-ignore`, coverage ignores, `/// <reference`, `@deprecated`, `#__PURE__`, `@type {`,
  `@typedef`, SPDX). It returns 0 matches (exit 1). The sweep removed no allowlisted comment and no
  `// escaped:` line.
- **The 14 lines the sweep added** (steering's figure, re-derived): `grep -c '^+[^+]'` over that diff
  gives 14. I read each one: each is a removed line with a trailing or inline comment taken off.
- **Lint fallout the sweep introduced.** Instrument: eslint `--format json` over the 34 changed files at
  `b96e364` and at the merge `56c4dab`, compared as multisets of (file, rule, severity, message). The
  merge has 7 findings `master` does not. Six are `no-multiple-empty-lines`, where a removed comment
  left a blank line (`helpers/components.ts`, `helpers/discord.ts`, `helpers/messageData.ts`,
  `usePusher.hash-parity.test.ts`, `utils.disposition-resolver.test.ts`,
  `utils.save-payload-and-seed.test.ts`). One is `no-empty` at `src/scripts/backfillValid.ts:95`:
  `} catch (_) { /* pass */ }` became `{ }`, and the comment was the only thing keeping the block
  non-empty for eslint. Two findings went away (`no-multi-spaces` before removed trailing comments).
  Disposition: this is a mechanism choice inside the scope (escalation.md, Standing Defaults) and
  agent-authored. I removed the six blank lines and restored `master`'s catch line
  (`git blame b96e364`: `bc5ee2b`, by lando), so the sweep leaves that one comment in place. The
  alternatives were rejected. An `// eslint-disable-next-line no-empty` adds a comment the sweep never
  had. Any statement in the block is a code change, which the scope excludes.

`Origin-Chain: none`: no chain's change introduced a defect, because none exists.

## Change

Website, branch `chore/agent-comment-sweep`, `9cefc7d` → `56c4dab` → `6d78b19`:

- `56c4dab`: merge of `master` (`b96e364`) into the branch, parents `9cefc7d` and `b96e364`. The two
  conflicts were resolved as above.
- `6d78b19` `src/scripts/backfillValid.ts`: line 95 is back to `master`'s text, so the file no longer
  differs from `master`.
- `6d78b19` the six files named above: one orphan blank line removed from each.

The merged tree against `master`: `git diff --shortstat b96e364 6d78b19` gives 33 files, +13/−449
(corroborated by summing `--numstat`: 33, 13, 449). `git merge-base --is-ancestor b96e364 6d78b19`
exits 0, so `master` fast-forwards to `6d78b19`. `--is-ancestor 9cefc7d 6d78b19` exits 0, so the
sweep commit is in the branch's history unrewritten.

Production lines added: the 13 added lines are all comment-stripped lines. The production files among
them (`shapes.ts`, `formatMutationError.ts`, `utils/index.ts`) add no new code.

## Test

There is no defect, so there is no spec-form test of a surface. The brief allows a mechanical proof in
its place. The instrument is
`verification/fix-agent-comment-sweep-merge/comments-only-diff.js <repo> <before> <after> [--sweep <base> <tip>]`.
It passes only when every path changed between `before` and `after` is a JS/TS file present on both
sides and, per file:

1. the TypeScript AST printed with `removeComments` is byte-identical;
2. the comments after are a sub-multiset of the comments before (nothing added or edited);
3. every line the line diff adds equals a line removed in the same hunk with one removed comment taken
   out (whitespace runs collapsed);
4. with `--sweep`, the path is one the sweep range changed, and each removed comment is one the sweep
   removed from that path. Any other comment is listed as `UNMATCHED`.

It mirrors `comment-gate.js`'s `commentsOf`, which uses leading and trailing comment ranges over every
node.

Its limits, stated: check 3 collapses whitespace inside a line that also lost a comment. Lines removed
with nothing added in their place are judged only by checks 1 and 2, so a removed blank line passes.
Whitespace and line breaks between tokens are invisible to check 1, and check 3 catches them only on
added lines.

| Run | Before → after | Result | Exit | Capture |
|---|---|---|---|---|
| Red, unmerged tip | `b96e364` → `9cefc7d` | 532 FAIL (62 commits of `master` code missing) | 1 | `red-unmerged-tip.txt` |
| Control: code token | `b96e364` → `1a58472` (merge + `return void 0,` in `formatMutationError.ts`) | FAIL (checks 1 and 3) | 1 | `control-C1.txt` |
| Control: added comment | `b96e364` → `07c5371` (merge + `// added prose` line 1) | FAIL (checks 2 and 3) | 1 | `control-C2.txt` |
| Control: whitespace in code | `b96e364` → `f5c69e0` (merge + `=` → `=  `) | FAIL (check 3) | 1 | `control-C3.txt` |
| Green, merge | `b96e364` → `56c4dab` | PASS: 34 files, 174 comments removed, 14 added lines, 0 unmatched | 0 | `green-merge.txt` |
| Green, handoff tip | `b96e364` → `6d78b19` | PASS: 33 files, 173 comments removed, 13 added lines, 0 unmatched | 0 | `green-6d78b19.txt` |

The control commits exist only as objects made in the isolated worktree, which was then checked out
back to the merge. None is on a branch.

## Verification

All at `6d78b19` unless stated. Captures are under `verification/fix-agent-comment-sweep-merge/`.

- **Existing tests** (`npx vitest run --reporter=json`, `suite-6d78b19.json`): 1130 total, 1130 passed, 0 failed, 0 pending, 116 `testResults` file entries, process **exit 0**. At the merge `56c4dab` the counts and exit were the same (`suite-56c4dab.json`).
- **Typecheck** (`pnpm run typecheck`, both programs): exit 0 (`typecheck-6d78b19.log`); exit 0 at `56c4dab` too.
- **Build** (`next build`, isolated worktree at `6d78b19`, `SKIP_ENV_VALIDATION=1`): "Compiled successfully", exit 0 (`build-6d78b19.log`); exit 0 at `56c4dab` likewise.
- **Lint**: the repository's `lint` script is `eslint --fix . --max-warnings=0`, and `--fix` would
  rewrite the shared tree, so I ran its config directly without `--fix`. Over the whole repo at the
  merge `56c4dab`: exit 1, 689 problems (321 errors, 368 warnings; `eslint-56c4dab.log`). Over the
  changed files at `master` and at `6d78b19` (`eslint-34-b96e364.json`, `eslint-34-6d78b19.json`, the
  same 34-path list): `master` 216 findings (180 errors), `6d78b19` 214 (178 errors). Nothing at the
  tip is absent at `master`, and two `no-multi-spaces` errors are gone. **Disposition of the remaining
  178 errors**: they are on `master`'s code, and this change leaves them unchanged. Fixing them is a
  code change, which the scope statement excludes ("Out: any code change"). They are not fixed here,
  and not routed, because they are `master`'s standing lint state and outside this effort.
- **Convention check** (`node ~/.claude/tools/convention-check.js website --since=b96e364`):
  exit 1. Its summary line: 3 files examined (the ones with added lines), 30 not examined (no added lines), 66 FAIL, 0 CANDIDATE, 31 SKIP (`convention-check-6d78b19.txt`). Every FAIL is an eslint finding, and none is from the comment gate or the test-naming rules. The eslint delta above shows each one is already on `master` (nothing at the tip that `master` lacks), so they take the same disposition: unchanged by this change and out of scope. The 31 SKIPs are files not examined because they have no added lines, and they are unchecked by convention-check. For those files, the Test instrument's check 2 is what establishes that no comment was added.
- **Package manager**: one `pnpm install --frozen-lockfile --offline` (pnpm 10.28.2, which matches
  `packageManager: pnpm@10.28.2`), run in the isolated worktree for the build. `git diff --stat` there
  was empty afterwards, so no pin moved. The change touches no dependency, so the deploy-host install
  is not exercised by it.

## Process facts (lodged in the round)

- **Secret-file gate refused one call.** A `grep -rnE` for conflict markers, run after a `cd` into the
  scratch worktree, was refused by `secret-file-gate-hook`. The record flags
  `preview-image-generator/.github/workflows/prod.yml` as holding a secret, and the hook cannot tell
  where a relative path after a `cd` resolves. I re-issued it in the form the gate names as permitted:
  `grep -c`, absolute paths, no `cd`. It printed counts only (0 and 0). This satisfies a gate by
  meeting its standard. It is not a workaround, and the owner judges whether the block was a false
  positive. The refused call could not have reached that file, which is in another repository.
- **Shared tree moved once**, by the definition's landing route. Before the move: `status --porcelain`
  read through a file (0 lines, `land-status-before.txt`) and `for-each-ref refs/heads refs/remotes`
  (`land-refs-before.txt`). Immediately before the move, the refs were re-read and `cmp` reported them
  unchanged. Then `git reset --keep 56c4dab` (exit 0). After the move: status 0 lines
  (`land-status-after.txt`), and the only ref delta is `refs/heads/chore/agent-comment-sweep`
  `9cefc7d` → `56c4dab` (`land-refs-after.txt`). `master` stayed at `b96e364`. `6d78b19` was then
  committed directly on the branch with `git commit --only` over the seven paths. The tree was clean
  before that edit.
- **Build environment.** `next build` ran in the isolated worktree, never in the shared tree. A
  symlinked `node_modules` was refused by Turbopack ("points out of the filesystem root"), so I did the
  offline frozen install above. The first build at `56c4dab` compiled and then stopped at prerender on
  `src/env.mjs`'s env validation (no `.env` in the worktree). It was re-run with
  `SKIP_ENV_VALIDATION=1`, the skip `env.mjs:101` reads.
- **Isolated worktree** `…/scratchpad/wt` (with its `node_modules` and `.next`) is removed before the
  handoff: `git worktree remove --force` exit 0, `worktree list` shows only the shared tree, and `ls -d` reports the path absent. The three control commits (`1a58472`, `07c5371`, `f5c69e0`) are now unreachable objects, and their effect is kept in the `control-*.txt` and `control-*.diffstat` captures.
- **Stamp gate fired once.** I wrote this document's first changelog row with a typed time, and `stamp-gate-hook` refused it as future-dated. I re-stamped it through `record-edit.js` `2026-11-10T09:51`. This satisfied a gate.

## User-visible flows

None. No behaviour changes (Test, check 1).

## Handoff

- **SHA**: `6d78b19` (website, branch `chore/agent-comment-sweep`, local only and not pushed).
- **Reviews**: `code-reviewer-hooks-comment-sweep`, at `6d78b19`. The reviewer also runs the suite.
  The change adds fewer than 20 production lines, so no QA Phase 2 runs.
- **Merges**: the devops session (`devops-hooks-comment-sweep`, spawned by steering when the review
  approves) fast-forwards `master` to the reviewed tip locally, under the owner's "merge it". The
  production push is a separate question that the devops session puts to him in its own session. The
  2026-10-10 push answer was "Local only". After the merge the branch is deleted.

## Changelog

| Date | Agent | Change | Notes |
|---|---|---|---|
| 2026-11-10T09:50 | fixer | Document created; merge `56c4dab`, lint-neutral follow-up `6d78b19`; handoff to code review | Status: Active |
| 2026-11-10T10:14 | devops | Document closed | Status: Released. `master` fast-forwarded to `6d78b19` and pushed to origin at 10:13:03Z; fix branch deleted. |
