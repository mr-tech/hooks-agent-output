---
ID: n/a
Origin: fix-decorator-offsets
UUID: 12ef2086
Status: Active
Status-Detail: "Stage 2 readiness at website febf20e (Phase 2A complete, execution mode A). Awaiting the owner's release approval; nothing pushed. Release identifier will be the SHA on website master."
---

# Deployment: fix-decorator-offsets (website, fixer chain)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-22T22:36 | `steering-hooks-fixer` (brief `steering/fix-decorator-offsets-brief-devops.md`) | Stage 1, then Stage 2 readiness | Stage 1 committed (record `bb2660a`): implementation, code-review and QA documents closed `Committed`; B-1 carried by `handoff/fix-decorator-offsets-post-deploy-browser-look-2026-11-22.md`. Phase 2A complete at website `febf20e`: tip tree equals QA's `Verified-At` tree; build re-run exit 0; release-move dry-run passed; rollback form checked. Awaiting the owner's release approval. |

## Plan Reference

Fixer chain `fix-decorator-offsets` (no plan, no UAT; stage set: fixer → code review → QA Phase 2 (128 production lines) → devops).
Roadmap: not read (a fixer chain with no epic or criterion named by its determination; the roadmap owes this chain no row). Scope:
`steering/fix-decorator-offsets-rulings.md` blocks "2026-11-22T20:44" and "2026-11-22T21:21". Source handoffs: none named by the scoping
block (source `research/codebase-bug-evaluation-2026-11-08.md:171`, H-4).

## Release Identifier

The commit on website `master` after the move (expected `febf20e39905c977b0d42081137817cb7b704478`, a fast-forward of `8845b7e`). No tag.
This record is the only deployment document of the release.

## Release Date

Pending.

## Execution Mode

**Mode A, agent-executed**: the move is `release-move.js` on website `master` from this role session, run only after the owner's explicit yes
(Phase 2B). Operator: `devops-fix-decorator-offsets`.

## Release Summary

Type: fix. Environment: production (website `master` is deployed by Vercel). Epic: none.

What the release changes for users: the message editor's syntax colouring (message content, embed titles and fields) follows each piece of
formatting's real width in the text. `***bold italic***` no longer colours characters after it; links, bare URLs, escapes, mentions and
heading markers inside bold or italic sit correctly; lines inside a fenced code block with a language are highlighted as whole lines. The
decorator only colours; it changes no stored text.

## Repositories and SHAs shipped

| Repository | Ref | From | To | Commits |
|---|---|---|---|---|
| website | `master` | `8845b7e3409782e0f07ecd36a818f48f4ebcc721` (`git ls-remote origin master`, 22:36Z) | `febf20e39905c977b0d42081137817cb7b704478` | 10 (`99fd3c3`..`febf20e` on `chain/fix-decorator-offsets`) |

`git diff --numstat origin/master febf20e`: `decorator.tsx` 111/41, `rules.tsx` 17/1, `decorator.emphasis-syntax-ranges.test.ts` 468/0.
No `package.json`, lockfile, workspace or patch file changed.

## Serving Ref at Cutover

Website `master` only. `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website --report` (22:36Z): "one serving ref at origin
(master); no pair", exit 0. Ordering: `git merge-base --is-ancestor origin/master febf20e` exit 0 (fast-forward).

## Pre-Release Verification

| Check | Result | Instrument / evidence |
|---|---|---|
| QA Phase 2 | `QA Complete`, `Verified-At: febf20e39905c977b0d42081137817cb7b704478` (record `b2a0bd6b`); suite 2614/2614 exit 0, typecheck exit 0, mutation sweep 18 of 18 over the final diff | `qa/closed/fix-decorator-offsets-qa.md` |
| Code review | `APPROVED`, `Reviewed-At: febf20e39905c977b0d42081137817cb7b704478` (record `4dfe5b40`); production files byte-identical to the approved `24eda1c` | `code-review/closed/fix-decorator-offsets-code-review.md` |
| UAT | none in the stage set | stage set quoted in the common brief |
| Release-tip verdict | The assembled tip is the chain tip itself (a fast-forward of `master`), so no merge was assembled. `git rev-parse febf20e^{tree}` = `8020a5d13697c099c206d16be619138792903801`, the tree of QA's `Verified-At` (same SHA). The Phase 2 verdict covers the tip; the move takes `--reason` naming that record. | `git rev-parse` |
| Release consistency | The website carries no release `version` field and no CHANGELOG. Cross-repo references re-derived: `package.json` pins `project-utils` (`github:hooks-gg/project-utils#40ba5d3…`) and `paracord` (`github:mr-tech/paracord#3f20308…`) by SHA; `git diff --stat origin/master febf20e -- package.json pnpm-lock.yaml pnpm-workspace.yaml patches` is empty, so the pins are the ones already in production. | git |
| Packaging integrity | `next build` on a `git archive` export of `febf20e` (hardlinked copy of the installed `node_modules`, `SKIP_ENV_VALIDATION=1`, memory-capped): exit 0, all 9 app routes and 7 pages routes built. A first attempt with a symlinked `node_modules` failed on a Turbopack root rule (the build tool, not the code) and is replaced by this one. No package-manager or lockfile change, so no install check under another pnpm major is owed. | `verification/fix-decorator-offsets/devops/build-tip-febf20e.txt` |
| Workspace cleanliness | website: `git status --porcelain` shows only `?? .playwright-mcp/` (not this chain's); every chain commit present on `chain/fix-decorator-offsets`; `verification/fix-decorator-offsets/` has no uncommitted entry at Stage 1 (before this record's own evidence files, committed with it). Exclusions declared by predecessors: the shared tree's gitignored `.next/types` is stale and an in-tree typecheck exits 2; it affects no release mechanism (Vercel builds from the pushed commit, and QA's and the reviewer's typechecks ran in clean exports, exit 0). | git |
| Blocking checklist (pre-release rows) | QA's register holds one row, B-1, class post-deploy-observable; it blocks neither the commit nor the release and is carried by the handoff above. No pre-release row exists. | QA register |
| History rewrite | None between verification and release: the tip is the verified SHA, on `chain/fix-decorator-offsets` (no upstream). | git |

## Operational re-derivation (before the first ref moves)

| Line | Statement | Marked | Instrument |
|---|---|---|---|
| Deploy mechanism | A push to website `master` is built and deployed to production by Vercel's git integration; no GitHub workflow exists. | re-derived | `release-move.js --dry-run`: "`.github/workflows` absent: a push to master triggers no GitHub Actions workflow"; `vercel ls --prod` (22:36Z) lists four Ready production deployments of `hooks-gg-website` in the last six hours, 20–38 s builds, alias `hooks-gg-website-git-master-hooks-gg.vercel.app` on the serving one; `vercel inspect https://hooks.gg` names the serving deployment `dpl_3JEEF7Vs4MaWBa3Gk82TsxdbDpud`, created 20:13Z (the previous release, `8845b7e`). |
| Rollback | Reverse the release's diff as one new commit on `master`, pushed through `release-move.js` like any release; or re-promote the previous production deployment in Vercel (the owner's console act). | re-derived (git form); accepted as written (console form: named risk, not run) | `git diff origin/master febf20e > verification/fix-decorator-offsets/devops/release-diff.patch` (43,302 bytes); `git apply --check -R` on it exits 0 against the tree. |
| Ordering | One repository, one serving ref, no consumer, no registry, no migration: no ordering constraint. | re-derived | the diff touches three files under `src/`; `--report` above. |
| Serving refs | `master` only. | re-derived | `release-move.js --report`. |
| Self-hosted runner | None involved. | re-derived | no workflow exists. |

## Release Move: dry run (recorded before approval)

`node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master febf20e39905c977b0d42081137817cb7b704478 --dry-run --reason "Phase 2 QA verdict at Verified-At febf20e covers the tip: qa/closed/fix-decorator-offsets-qa.md"`
(22:36Z), exit 0: remote `master` `8845b7e`, local `master` `8845b7e`, "ff-from-remote ok; sibling serving refs ok", workflows none,
"DRY RUN: every check passed; nothing moved". The real move re-reads the remote ref and the porcelain first.

## Disagreements and assumptions (Phase 2A 9b)

- Open disagreements with predecessor documents: none.
- Assumptions Not Checked that this release form exercises: (1) real-browser leaf splitting ignores a decoration range past its text (QA
  Phase 2); (2) a leaf with two highlight classes is coloured by the site stylesheet as the inner scope (QA refresh at `febf20e`); (3) real
  browsers split leaves at the ranges the decorator returns (code review round 1). All three close at one read: row B-1, after the deploy
  (handoff above). No live session can run them before the first ref moves: they are about the production build in a browser. The
  custom-emoji assumption (QA refresh at `24eda1c`) belongs to `fix-emoji-pretransform-widths`.
- Risk named: the Vercel project builds whatever commit the push names; the production build's output was not built here with the
  production environment (the local build used `SKIP_ENV_VALIDATION=1`); accepted as written.

## User Confirmation

Pending. The ask is put to the owner in this session as a role-internal selection prompt (or plain text where prompts are off), in plain
language, with the fixer's user-visible flows in its own words; the way it was put, and when, is recorded here with his answer.

## Release Execution

Pending.

## Post-Release Status

Pending. Post-deploy row B-1: carried by `handoff/fix-decorator-offsets-post-deploy-browser-look-2026-11-22.md`.

## Next Actions

- B-1 browser look: the handoff above (trigger: the deployment is Ready and serving hooks.gg).
- `fix-decorator-nested-styles` (CR-4, CR-6, the nested-scope rows) and `fix-emoji-pretransform-widths` (the pre-transform widths, the
  code-line emoji text loss, the custom-emoji assumption) are queued chains of `steering-hooks-fixer`; carriers are its rulings blocks
  21:21, 22:13, 22:19 and 22:30.
