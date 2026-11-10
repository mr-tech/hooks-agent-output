---
ID: n/a
Origin: fix-agent-comment-sweep-merge
UUID: 8f0ab0f7
Reviewed-At: 6d78b19269408447f2b089ba64c90db05518b6ce — repos=website
Status: Released
Status-Detail: "Released 2026-11-10T10:13Z: website master = 6d78b19 on origin, the reviewed commit. Record: deployment/fix-agent-comment-sweep-merge-deployment.md."
Round: 1
Verdict: APPROVED
---

# Code Review: fix-agent-comment-sweep-merge

**Plan Reference**: none (fixer chain). Scope is held to `agent-output/steering/chore-agent-comment-sweep-rulings.md`, block "2026-11-10T09:40Z — \"merge it\"" and its scoping determination, and `agent-output/steering/comment-sweep-briefs/comment-sweep-fixer-brief.md`.
**Implementation Reference**: `agent-output/implementation/fix-agent-comment-sweep-merge-implementation.md` at record commit `00cdde0`, `Handoff-At: 6d78b19`.
**Date**: 2026-11-10
**Reviewer**: Code Reviewer (`code-reviewer-hooks-comment-sweep`)

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-10T10:05 | fixer-hooks-comment-sweep | Round 1: review the merge of `master` into `chore/agent-comment-sweep` at website `6d78b19` | Round 1. Steering's brief had arrived (`comment-sweep-code-reviewer-brief.md`). The stage start was re-derived as `00cdde0:implementation/…` with `Handoff-At: 6d78b19`. The branch tip at the start and at the end of the review was `6d78b19`. Result: APPROVED, no findings. |
| 2026-11-10T10:14 | devops | Document closed | Status: Released. The reviewed commit `6d78b19` is website `master` on origin as of 10:13:03Z; the Assumption Not Checked is carried in the deployment record's Post-Release Status. |

## Scope and criteria assessed (recorded at round open)

From the brief, in sweep form, each assessed against `master` = `b96e364`:

1. The reviewed tip changes no code: only comment lines are removed, and every added line is accounted for.
2. No file outside the sweep commit's 34.
3. No rebase and no amended history: `9cefc7d` is an ancestor of the tip.
4. `master` is not moved, and nothing is pushed.
5. The hazards are candidates to re-derive: a directive, a `// escaped:` line or a URL deleted as if it were a comment; a conflict resolution that drops code; the 14 lines the sweep added.
6. The suite and typecheck at the tip, with exit codes, and the fixer's red-test evidence. The change adds fewer than 20 production lines, so no QA Phase 2 runs.

## Evidence (process named, instruments captured)

The claim under review is that the tree at `6d78b19` is `master`'s code with comments removed. The process whose output is the evidence is the TypeScript parser over both trees' blobs, read by `git show`. I authored the reviewer instrument below. It is a second, differently shaped check beside the fixer's `comments-only-diff.js`, which compares printed ASTs with comments removed. Mine compares leaf-token sequences and the multisets of attached comments. Captures are in `agent-output/verification/fix-agent-comment-sweep-merge/code-review/`.

| # | Check | Instrument | Result | Capture |
|---|---|---|---|---|
| E1 | Refs and ancestry | `rev-parse`; `merge-base --is-ancestor 9cefc7d 6d78b19` and `b96e364 6d78b19` | Tip `6d78b19`. Parents: `6d78b19`←`56c4dab`, and `56c4dab` = merge(`9cefc7d`, `b96e364`). Both ancestry checks exit 0. `master` = `origin/master` = `b96e364`. `ls-remote origin 'refs/heads/*'` returns 0 comment-sweep refs, so nothing was pushed. The shared tree's `status --porcelain` was 0 lines, read through a file. | — (command output above) |
| E2 | File set | `comm` of sorted `diff --name-only b96e364 6d78b19` against `f2c85f5 9cefc7d` | 33 paths, all `M`. 0 paths outside the sweep's 34. The one sweep path absent from the diff is `src/scripts/backfillValid.ts`, which is restored to `master` (see E7). | `files33.txt` |
| E3 | No code change; no comment added; every removal is a sweep removal; no directive removed | `token-stream-diff.js website b96e364 6d78b19 f2c85f5 9cefc7d` | **PASS: 33 paths, 0 failing, 173 comments removed**, exit 0. This reproduces the fixer's 173 with a differently shaped instrument. | `green-6d78b19.txt` |
| E3r | Red: unmerged tip | same, `b96e364 → 9cefc7d` | FAIL: 129 of 161 paths, exit 1 | `red-9cefc7d.txt` |
| E3c | Positive controls (in-memory mutations of `shapes.ts`) | `--control=token`, `comment`, `directive` | Each one exits 1. `TOKENS differ at leaf 2941`; `ADDED comments: ["// added prose"]`; `DIRECTIVE removed: "// @ts-expect-error"` plus UNMATCHED | `control-{token,comment,directive}.txt` |
| E4 | Fixer's evidence re-run | `comments-only-diff.js` green at `6d78b19`, red at `9cefc7d` | `RESULT PASS` exit 0; `RESULT FAIL (532)` exit 1. Both match the implementation document. | `fixer-instr-green-6d78b19.txt`, `fixer-instr-red-9cefc7d.txt` |
| E5 | Hazard: directive, `escaped:`, URL or magic comment deleted | `grep -ciE` over the removed lines of `git diff -U0 b96e364 6d78b19` for directive and bundler forms (`webpack…`, `@vite-ignore`, `@jsx`, `@refresh`, `@__PURE__`, `sourceMappingURL`, `@ts-`, `eslint`, `escaped:`, `artefact:`, coverage, prettier, biome), and separately for `://` | 0 and 0. The pattern's positive control (two planted lines) gives 2. The predicate cannot see a directive spelled outside these forms. E3's ALLOW check covers comment-gate's forms structurally. | — |
| E6 | The 14 lines the sweep added, and the 13 the tip adds | `grep -c '^+[^+]'` over `f2c85f5..9cefc7d`, read one by one; `diff --numstat b96e364 6d78b19` | 14 in the sweep. Each one keeps the line's code and drops only a trailing or inline comment (for example `} catch (_) { /* pass */ }` → `{ }`, and the `// type N` notes in `limits.import-validation.test.ts`). At the tip, added lines appear only in 3 test files (7, 2 and 4 lines), so **0 production lines are added**. E3 shows token identity for all of them. | — |
| E7 | Conflict resolution | `diff b96e364 6d78b19 --` the two conflicted files | `shapes.ts` −3/+0 and `guildMessages.valid-exposure.test.ts` −9/+0, deletion only. The test file loses only its header block comment. Nothing from either side's code is dropped (E3). `backfillValid.ts` is byte-equal to `master`. | — |
| E8 | Lint fallout | eslint `--no-fix --stdin` over each of the 33 paths' blobs at `b96e364` and `6d78b19`, compared as (file, rule, severity, message) | 216 findings at `b96e364` and 214 at `6d78b19`. 0 new at the tip. The 2 that go away are `no-multi-spaces` before removed trailing comments. This reproduces the fixer's 216/214. Note that `sort`/`comm` compares sets, but the 216−2=214 arithmetic shows the multiplicity agrees. | `eslint-33-b96e364.txt`, `eslint-33-6d78b19.txt`, `eslint-33-new-at-tip.txt`, `eslint-33-gone-at-tip.txt` |
| E9 | Convention check | `node ~/.claude/tools/convention-check.js website --since=b96e364` | Exit 1: 3 files examined, 66 FAIL, 0 CANDIDATE, 31 SKIP. `grep -c '^FAIL eslint'` = 66 and `'^FAIL comment'` = 0, so every FAIL is eslint. E8 shows each of those predates the tip on `master` (0 new). **SKIP, named as unchecked**: the id-token and basename checks did not run ("checker does not implement verbatim" the workspace's class). This change renames no file and adds no title (all paths `M`, E3 token identity), so the unchecked rules cannot have been violated *by this change*. The 30 files with no added lines were not examined by comment-gate. E3 is what establishes that no comment was added to them. | `convention-check-6d78b19.txt` |
| E10 | Suite | `npx vitest run --reporter=json` in `website/` at HEAD `6d78b19` | 1130 total, 1130 passed, 0 failed, 0 pending, 116 `testResults` entries, `success: true`, **process exit 0** | `suite-6d78b19.json`, `suite-6d78b19.log`, `suite-head.txt` |
| E11 | Typecheck | `pnpm run typecheck` (both programs) | **exit 0** | `typecheck-6d78b19.log` |

Predicate bounds of `token-stream-diff.js` (also in its header):
- It cannot see whitespace and line breaks between tokens, so a pure reformat passes. Whitespace inside string, template and JSX text is a token's text and is compared.
- Comments are compared as raw text.
- Its ALLOW list is copied from `comment-gate.js` as it stood at review.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md` and `agent-output/architecture/website.md` (both present, `ls -d`).
**Alignment Status**: ALIGNED. At the token level, the change does not alter code (E3), so it moves no architectural mechanism.

## TDD Compliance Check

**TDD Table Present**: No. This is a fixer chain with no defect. The fixer's brief permits a mechanical proof in place of a red test, and the implementation document's Test section carries it.
**All Rows Complete**: n/a. The red/green/control table in the Test section is complete. Its red and green rows were re-run (E4), and a second instrument reproduces them (E3, E3r, E3c).
**Concerns**: None. The "behaviour-preserving" claim is settled by execution: token identity over both trees (E3), the suite green at the tip (E10), and the fixer's suite at `56c4dab`/`6d78b19`. It is not settled by argument. No test file is added or renamed, so no test-authorship or naming question arises.

## Findings

### Critical
None.

### High
None.

### Medium
None.

### Low/Info
None.

Observations that are not findings:
- **Shared-tree move.** The fixer moved the shared tree once, with `git reset --keep 56c4dab`. That is the landing route its own definition prescribes (`fixer.md`, "Instruments and the shared tree"), and it was disclosed in its round with the before and after captures.
- **Standing lint state.** `master` carries 180 eslint errors on these 33 paths and fails the repository-wide lint. This change does not alter that state (E8), and it is outside the bounded scope.

## Verdict

**Status**: APPROVED
**Rationale**: Every criterion holds on two independent instruments:
- The tip is `master`'s token stream with 173 comments removed. No comment is added, every removal is one the sweep made, and no directive is removed.
- The file set stays inside the sweep's 34.
- History is unrewritten.
- `master` is unmoved and nothing is pushed.
- The suite (1130/1130) and typecheck both exit 0.
- 0 production lines are added.

## Required Actions

None.

## Assumption Not Checked

Round 1. This review assumes that the production build host (Vercel) builds `6d78b19` from the same token stream that the local suite and typecheck exercised, so that no deploy-time step reads comment text by a form outside E5's predicate. Falsity signature: a Vercel build of `6d78b19` that fails, or deploys output that differs in behaviour, where `b96e364` built cleanly. Owner: devops, at the production push. What a push of `master` deploys is devops's to establish; I read no workflow or `vercel.json` for it.

## Next Steps

- APPROVED, and the change adds fewer than 20 production lines (0), so it skips QA. The verdict goes to `steering-cleanup-hooks` per the brief, which starts `devops-hooks-comment-sweep`.
- devops fast-forwards `master` to `6d78b19` locally, puts the production-push question to the owner, and owns closing the Assumption Not Checked above at that push.
