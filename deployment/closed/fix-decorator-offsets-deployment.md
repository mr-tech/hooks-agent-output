---
ID: n/a
Origin: fix-decorator-offsets
UUID: 12ef2086
Status: Released
Status-Detail: "Released 2026-11-22T22:44:37Z: website master febf20e39905c977b0d42081137817cb7b704478; Vercel production deployment Ready and serving hooks.gg; B-1 executed PASS. Release identifier is that SHA."
---

# Deployment: fix-decorator-offsets (website, fixer chain)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-22T22:36 | `steering-hooks-fixer` (brief `steering/fix-decorator-offsets-brief-devops.md`) | Stage 1, then Stage 2 readiness | Stage 1 committed (record `bb2660a`): implementation, code-review and QA documents closed `Committed`; B-1 carried by `handoff/fix-decorator-offsets-post-deploy-browser-look-2026-11-22.md`. Phase 2A complete at website `febf20e`: tip tree equals QA's `Verified-At` tree; build re-run exit 0; release-move dry-run passed; rollback form checked. Awaiting the owner's release approval. |
| 2026-11-22T22:55 | `steering-hooks-fixer` (owner's approval 22:44:21Z) | Stage 2 execution and Phase 2D | Released: website `master` `8845b7e` -> `febf20e` at 22:44:37Z; production deployment Ready 22:45:09Z, built from `febf20e`, serving hooks.gg; B-1 executed PASS; documents set `Released`; record closed. |

## Plan Reference

Fixer chain `fix-decorator-offsets` (no plan, no UAT; stage set: fixer → code review → QA Phase 2 (128 production lines) → devops).
Roadmap: not read (a fixer chain with no epic or criterion named by its determination; the roadmap owes this chain no row). Scope:
`steering/fix-decorator-offsets-rulings.md` blocks "2026-11-22T20:44" and "2026-11-22T21:21". Source handoffs: none named by the scoping
block (source `research/codebase-bug-evaluation-2026-11-08.md:171`, H-4).

## Release Identifier

The commit on website `master` after the move (expected `febf20e39905c977b0d42081137817cb7b704478`, a fast-forward of `8845b7e`). No tag.
This record is the only deployment document of the release.

## Release Date

2026-11-22, push at 22:44:37Z (`date -u` around the move: 22:44:32Z before, 22:44:37Z after).

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

Put as a selection prompt in this session (prompt gate on: `~/.claude/state/prompt-gate-off` absent), about 22:40Z; answered 22:44:21Z
(`date -u`): **"Agent: release it now (Recommended)"**. The prompt opened with the context (finished, reviewed, QA'd, 2614 of 2614 tests,
clean build, not yet live; the post-deploy look at four lines, nothing saved), quoted the fixer's User-visible flows list in its own words,
named the two known gaps outside the release (nested-style colour inheritance; text lost on pasting an emoji), said nothing changes stored
text and that a reversing change undoes it, then asked the decision; options "Agent: release it now (Recommended)" and "Agent: don't
release". Premises cited in the ask: QA and review verdicts (documents above), the build (capture above), the deploy mechanism
(`vercel ls --prod`, re-derived above). No helper refutation was run on them; they are document and mechanism reads, not inferences.

## Release Execution

Mode A, run by `devops-fix-decorator-offsets` after the owner's yes (22:44:21Z). Before it: `git ls-remote origin master` =
`8845b7e3409782e0f07ecd36a818f48f4ebcc721`; tree on `chain/fix-decorator-offsets` at `febf20e`, porcelain `?? .playwright-mcp/` only; a second
`--dry-run` (22:44Z) passed (output above).

```
node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master febf20e39905c977b0d42081137817cb7b704478 \
  --reason "Phase 2 QA verdict at Verified-At febf20e covers the tip: qa/closed/fix-decorator-offsets-qa.md"
OK moved master: 8845b7e3409782e0f07ecd36a818f48f4ebcc721 -> febf20e39905c977b0d42081137817cb7b704478 on origin; tree on master   (exit 0)
```

After: `git ls-remote origin master` = `febf20e39905c977b0d42081137817cb7b704478`; the shared tree is on `master` at `febf20e`, porcelain
`?? .playwright-mcp/` only. Fix branch: `git branch -d chain/fix-decorator-offsets` printed `ok` (rtk-filtered), exit 0; `git rev-parse --verify
--quiet refs/heads/chain/fix-decorator-offsets` exit 1 (the branch is gone; its tip is `master`). No tag, no registry publish (a branch move
has nothing to publish).

**Deploy evidence (brief hazard 1: the production deployment itself).** `vercel inspect https://hooks.gg` (CLI 29.1.1, look-only, 22:47Z;
three earlier calls — two `ls --prod` and one `inspect` — hit the CLI's known hang under `timeout 60` and were retried, not a control):
deployment `dpl_7khAExbcAo1i9oupzJRKqyxxm5Xw`, `hooks-gg-website-jibbsnk91-hooks-gg.vercel.app`, status **Ready**, created 22:44:38Z, aliases
include `https://hooks.gg` and `https://www.hooks.gg` (the previous serving deployment was `dpl_3JEEF7Vs4MaWBa3Gk82TsxdbDpud`, created 20:13Z).
`vercel logs` of that URL: "Cloning github.com/hooks-gg/website (Branch: master, Commit: febf20e)" 22:44:39Z; "Build Completed in
/vercel/output [21s]" 22:45:02Z; "Deployment completed" 22:45:09Z. Captures: `verification/fix-decorator-offsets/devops/vercel-inspect-hooks-gg-post-release.txt`,
`vercel-build-log-post-release.txt` (one line of the install command omitted). Public `GET https://hooks.gg/` returned 200 after the deploy (one request; the earlier request to `/message/m/new` timed out at 30 s and was not retried by curl; the walk below loads that page).

**Deployed against verified.** Deployed ref `master` at `febf20e39905c977b0d42081137817cb7b704478`, the commit the Vercel build cloned
(`Commit: febf20e`, a seven-character abbreviation, read against the pushed SHA from local git). The verdict SHAs are the same commit:
QA `Verified-At` and the code review's `Reviewed-At` both `febf20e39905…`. No diff owed between two different commits.

No `NOT VERIFIED` marks: no artifact-side check in this release was unperformable.

## Post-Release Status

**Deployed: Complete** (deploy evidence above, 22:45:09Z). Environment: production, serving ref website `master` at `febf20e39905c977b0d42081137817cb7b704478`. Authorizer: the owner, "Agent: release it now (Recommended)", 22:44:21Z.

**Post-deploy row B-1: executed PASS** (record `handoff/closed/fix-decorator-offsets-post-deploy-browser-look-2026-11-22.md`, `Addressed`; results `verification/fix-decorator-offsets/devops/walk/results.json`). A `browser-walker` helper drove headless Chromium on production, signed out, nothing saved: `***ab*** cd` markers syntax-coloured, ` cd` plain; `# **a**` marker syntax-coloured; `**a https://x.y**` link-coloured with no grey first letter; `const` keyword-coloured and `1` number-coloured in a js block with no console error; and the added template-string line's `${a}` leaf `hljs-subst hljs-string` in `#c9d1d9`, the stylesheet's `.hljs-subst` colour. Both browser-side assumptions are answered true. Console: two font-preload warnings, no errors.

**Known issues:** no new ones. Limits carried elsewhere: nested-style colour inheritance (CR-4, CR-6, the first-range nested scope) by queued chain `fix-decorator-nested-styles`; the pre-transform emoji widths, the code-line emoji text loss and the custom-emoji assumption by queued chain `fix-emoji-pretransform-widths`; carriers are `steering/fix-decorator-offsets-rulings.md` blocks 21:21, 22:13, 22:19 and 22:30.

**Rollback plan:** a new commit on `master` reversing `verification/fix-decorator-offsets/devops/release-diff.patch` (`git apply --check -R` exit 0 at Stage 2), pushed with `release-move.js`; or re-promote the previous production deployment `dpl_3JEEF7Vs4MaWBa3Gk82TsxdbDpud` in Vercel (the owner's console act, not run).

## Phase 2D

- Documents of this chain, by enumeration (no plan, no `ID`; chain `Origin: fix-decorator-offsets`, UUID `12ef2086`): implementation, code review, QA (all `Released`, in `closed/`), this deployment record, the B-1 handoff (`Addressed`, `handoff/closed/`). No UAT, plan, critique or architecture findings document carries the chain.
- Release-tip QA record: the Phase 2 QA document served as the release-tip verdict (tip tree = its `Verified-At` tree); set `Released`.
- Fix branch `chain/fix-decorator-offsets` merged (tip = `master`) and deleted with `git branch -d`.
- Other `fix-` chains whose `Handoff-At` is an ancestor of `febf20e`: enumerated by `git merge-base --is-ancestor` over `implementation/closed/fix-*`; every one is `Released` except `fix-v1-guild-messages-auth` (`Committed`, `Handoff-At ddbd750c1`), which was already an ancestor of the previous production `master` `8845b7e`: it shipped in an earlier release (its deployment record is `deployment/closed/fix-v1-guild-messages-auth-deployment.md`), not in this one, and its document's token is that chain's own lag, not touched here. (`fix-uat-local-stack-id-sequence` is also `Committed`; its repository is agent-output, not website.)
- Source handoffs the chain answered: none named by the scoping block (source `research/codebase-bug-evaluation-2026-11-08.md:171`).
- Forward items beyond the register, found by `grep -c 'Assumption Not Checked'` over the chain's documents: code review (2) — round 1 browser premise, answered by B-1; the emoji-in-text-leaf premise, answered by QA (false for an escaped emoji only; reachable through it, carried by `fix-emoji-pretransform-widths` and `TODO.md` "website editor: an emoji before formatting…"); QA (3) — the range-past-text premise and the two-class leaf premise, both answered true by B-1; the custom-emoji premise, carried by `fix-emoji-pretransform-widths` (rulings block 22:19). The implementation and rulings carry none. The withdrawn chain `fix-decorator-headings` was folded into this one (rulings block 20:44).
- Architecture: no passage names the decorator (common brief; reviewer; QA); steering lodges any entry at closure (brief). Roadmap: a `fix-` chain owes none (the determination names no epic or criterion).
- Retrospective spawn cue: sent to `steering-hooks-fixer` with this closure.

## Next Actions

- B-1 browser look: done (PASS), see Post-Release Status; the handoff is closed `Addressed`.
- `fix-decorator-nested-styles` (CR-4, CR-6, the nested-scope rows) and `fix-emoji-pretransform-widths` (the pre-transform widths, the
  code-line emoji text loss, the custom-emoji assumption) are queued chains of `steering-hooks-fixer`; carriers are its rulings blocks
  21:21, 22:13, 22:19 and 22:30.
