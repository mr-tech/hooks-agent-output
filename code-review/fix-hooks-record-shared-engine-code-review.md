---
ID: n/a
Origin: fix-hooks-record-shared-engine
UUID: 2b33b8c9
Reviewed-At: d96b799 — repos=agent-output; engine ~/.claude/tools a34093d (record-engine.js sha256 9c1a94ac…, seam.js cddce599…, both clean against HEAD)
Status: In Review
Round: 1
Verdict: APPROVED_WITH_COMMENTS
---

# Code Review: fix-hooks-record-shared-engine

**Plan Reference**: none (fixer chain). Scope: `steering/record-tools-shared-engine-rulings.md` (blocks "2026-11-10T08:47Z — scoping determination", "2026-11-10T08:53Z", "2026-11-10T08:58Z") and `steering/record-engine-briefs/record-engine-fixer-brief.md`.
**Implementation Reference**: `implementation/fix-hooks-record-shared-engine-implementation.md` at b676de2 (Handoff-At d96b799)
**Date**: 2026-11-10
**Reviewer**: code-reviewer-hooks-record-engine

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-10T09:10 | fixer-hooks-record-engine (SendMessage, Handoff-At d96b799) | Review of the move onto the shared engine | Round 1: APPROVED_WITH_COMMENTS. CR-1 and CR-2 LOW, CR-3 and CR-4 INFO; none blocks QA Phase 2. The steering brief arrived before the handoff. The stamp-gate hook refused a typed stamp at the first write; the row now carries the `date -u` value. |

## Scope and identity

The criteria this round assesses come from the bounded scope statement. (1) `node tools/check-repo.js` exits 0 on this record. (2) Only the four unsuffixed documents and pre-012 legacy documents are baselined. (3) `--status` and `build-index.js --tracked` keep working. (4) No engine edit, no chain document or evidence edited to pass a check, the two `tools/uat*` files and `INDEX.md` untouched.

Files reviewed via `git show d96b799:` and in a detached worktree at d96b799: `tools/check-repo.js`, `tools/build-index.js`, `tools/check-repo-baseline.json`, `tools/recordEntrypoints.test.js` and `README.md` § `tools/`. The old tools were read in a second detached worktree at 7b4419a. `git diff --stat 7b4419a d96b799` shows that nothing outside the chain paths changed. The `tools/uat*` files, `INDEX.md` and the engine are absent from it, and `git -C ~/.claude/tools status --porcelain -- record-engine.js seam.js` is empty. HEAD was b676de2 at the start of the review. b676de2 adds only captures and document rows over d96b799.

The evidence comes from the engine's own output on the record at d96b799, a process I did not author. My classifier (below) is a second instrument of a different shape that checks the baseline's class membership.

## Architecture Alignment

**System Architecture Reference**: `architecture/system-architecture.md` exists (`ls -d` on disk; `git ls-tree d96b799 architecture/system-architecture.md` lists it, workspace path `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md`). It says nothing about record tools (`grep -ci "record-engine\|check-repo"` returns 0). The governing record is `~/.claude/agents/record-tools-architecture.md`.
**Alignment Status**: ALIGNED

The mirror claim holds. Diffed against the statbot record's entrypoints at 8eeebd49a, the only differences are this record's settings, the `REVIEW` export, the copied baseline, the two-instant case, and the `.gitignore`, full-pass and `--tracked --check` cases. Under P-6, `baselineKey` strips the line number: `LEADING_DOCUMENT` consumes `:\d+`, so an edit that shifts lines in a legacy document does not stale its entries. The settings meet the engine's required-key list (`record-engine.js` `configure`), and the run proves it.

### Brief hazards, re-derived

| Hazard | Result | Instrument |
|---|---|---|
| A baseline hides a real defect | Not found. All 256 entries fall in the two sanctioned classes, across 72 distinct files that all exist on disk. | `code-review/classify-baseline-by-prefix.js`: a basename-prefix predicate, not the fixer's `chainOf`. 0 hits outside the classes (`classify-baseline-by-prefix-at-d96b799.txt`). A planted `planning/015-x.md` entry is flagged (`classify-baseline-positive-control.txt`). Blind spot: the predicate reads only the first path of a non-basenames entry, and every non-basenames detail names one document. |
| A directory exemption wider than the probe folders | The change adds none. The 21 probe-folder names pass under the engine's built-in rule ("21 shared only across different verification/ folders (allowed)", `check-full-at-d96b799.txt`). That rule is the engine's, the same as in statbot, and it is not this change's. `.gitignore` is limited to its 2 paths. | `--full` notes line |
| Instants later than the adoption commit | No. Both are 2026-11-10T09:01:13Z, and the d96b799 commit time is 09:05:23Z (`git log -1 --format=%cI`). Moving both instants back to 2026-08-01 arms 575 failures in history (516 changelog-row-form, 27 changelog-row-vs-commit, 32 status-vocabulary). The adoption instant switches these off, as steering's guidance intends. | `check-instants-2026-08-01-at-d96b799.txt` (isolated worktree, restored, `git diff --quiet` 0) |
| Exit 0, `--status`, `--tracked` | Default run exits 0, "PASS — no new failures (256 baselined)". `--full` exits 1 with 256. `--status` exits 0, byte-identical to the old tool on the same tree (`diff` exit 0). `--tracked --check` exits 1 (stale). | `check-default-…`, `check-full-…`, `status-old-7b4419a-vs-new-d96b799.diff` |
| `INDEX.md` format change | Yes, and it is named in the implementation document. Run with both generators on the d96b799 tree, the new one removes 38 lines and adds 46. 27 of the added lines are handoff rows with `· priority`. The other 19 are statusless coordination-file rows, the `steering/` rows with stage `—`, and their name-table entries. See CR-3. | `index-old-vs-new-generator-on-d96b799.diff` |
| Engine with no remote | **The premise is false.** `~/.claude/tools` is a git repository with `origin git@github.com:mr-tech/agent-tools.git`, and `master` tracks `origin/master`. The box binding (RQ-3) stands, but the "no remote" wording does not. See CR-1. | `git -C ~/.claude/tools remote -v`, `git branch -vv` |

### Source comments

`convention-check.js <record> --since=7b4419a` exits 0 and SKIPs all 11 files (`convention-check-since-7b4419a.txt`). This reproduces the fixer's disclosure. **The comment gate, test naming and eslint are unchecked by the tool.** As a substitute I ran `grep -c -E '^\s*(//|/\*|\*)|[^:]//'` over the three `.js` files. It finds 0, 0 and 1 hits, and the one hit is a regex literal (`/verification\//`), not a comment. Blind spot: a `/* */` block that opens mid-line. The `REVIEW` constant meets the fixer rule's marker at the head of each tool (`fixer.md` "Unreviewed record deliverables are marked").

## TDD Compliance Check

**TDD Table Present**: A fixer document carries the Test section in place of a TDD table: red at 7b4419a (11/13 fail), green at d96b799 (13/13, exit 0), and a sentinel-engine control for the 2 cases that pass on both trees.
**All Rows Complete**: Yes.
**Concerns**: CR-2. I did not run the suite, because test execution is QA's. `tdd-check.py` covers Python only, so it does not apply. The test lives in the record, whose workspace table says it carries no tests (CR-4).

## Findings

### Critical
None

### High
None

### Medium
None

### Low/Info

**CR-1 LOW Round 1 Documentation**: The record tools state engine facts that the engine contradicts
- **Location**: `README.md` § `tools/` (the new paragraph and the `check-repo.js` table row); `tools/check-repo.js` `main` and `tools/build-index.js` `main` (the engine-absent `console.error`).
- **Class**: Text in this record's tools that states a mechanism fact about the engine or the box which the mechanism contradicts.
- **Enumeration**: `grep -rn "no remote" README.md tools/` at d96b799 finds 3 hits (README, both entrypoints). A read of the new README sentences against the engine finds 1 more: "each armed from this record's adoption instant" covers duplicate R-n/D-n and handoff `Priority`. Those two are armed by `documentRules` (`checkDuplicateIds` and `checkHandoffPriority` return early on `!DOCUMENT_RULES`), have no instant, and apply to all history. Total: 4. Blind spot: paraphrases such as "local only" or "not pushed". Out of scope: the 2 statbot entrypoint copies, and the same claim in steering's rulings and briefs.
- **Issue**: A reader of the stderr message or the README is told the engine cannot be recovered from anywhere, which is false. The README also tells them the document rules spare closed history, which they do not; they pass today only because nothing fails them.
- **Required Action**:
  - **Preferred (structural)**: State the binding in one place, as RQ-3 says it: "bound to this box; the remote is a backup". Have both messages say that, or drop the remote clause.
  - **Minimum**: Correct all 4 hits in scope. Route the 2 statbot copies through steering to the Agents domain's inbox. The fix touches no test and opens no round.

**CR-2 LOW Round 1 Test naming**: Two test titles name a property their assertions do not check
- **Location**: `tools/recordEntrypoints.test.js`, case "check-repo.js passes the committed record with its baseline, every baselined failure predating the move", and case "${tool} loads the engine the override names, and the live engine without it".
- **Class**: A test title that names a property no assertion in the case can fail on.
- **Enumeration**: I read all 13 executed cases (9 call sites, 4 of them in the `for (const tool of TOOLS)` loop) against their assertions. 2 hits, one case each. (a) The full-pass case asserts exit 0, PASS and no `BASELINE` warning. A baseline entry for a 015 document that matches a current failure passes it. (b) The override case's live leg asserts only that no `SENTINEL` appears. It passes when the live engine crashes or prints nothing. Hit (b) is inherited unchanged from statbot. Blind spot: a title whose claim lies in a helper the case calls (there are none here).
- **Issue**: The brief's first hazard, a baseline that hides a defect, is exactly the claim in title (a). Nothing in the suite enforces it once `make-engine-baseline.js`, a one-shot generator, has run.
- **Required Action**:
  - **Preferred (structural)**: In case (a), assert that every baseline entry's documents are pre-012 or one of the 4 named documents. The predicate must be written independently of `make-engine-baseline.js`: a literal list of the 4 plus a basename-prefix form. Falsity signature: a planted entry for a document of chain 012 or later must fail it, and so must a fifth unsuffixed document. In (b), assert that the live leg exits 0 and prints an engine-only marker (`open handoffs:` / `INDEX.md is`).
  - **Minimum**: Retitle both cases to what they assert. Test adequacy is QA Phase 2's to judge.

**CR-3 INFO Round 1 Operator-visible output**: The next `build-index.js --tracked` rebuild changes the format of `INDEX.md`
- **Location**: `tools/build-index.js` → `runIndex` (the engine's renderer). `SETTINGS` carries only `root`, so no setting can alter this.
- **Class**: An operator-read artefact whose format changes as a side effect of the move.
- **Enumeration**: `index-old-vs-new-generator-on-d96b799.diff`, both generators on one tree: 27 handoff rows gain `· priority <p>`, and 19 other lines are added (statusless rows for `INBOX.md`, `OPEN_QUESTIONS.md`, `OWNER-QUEUE.md` and `TODO.md`, and the `steering/` documents with stage `—`).
- **Issue**: This is a behaviour change to a file steering reads and commits. The implementation document names it and routes it to `~/.claude/agents/INBOX.md`. Removing the extra rows would be an engine change.
- **Required Action**: No source change. Steering checks the rebuilt `INDEX.md` against the diff above when it rebuilds; there is no UAT on this chain.

**CR-4 INFO Round 1 Convention file**: The workspace convention file says this record carries no tests
- **Location**: `/usr/local/bin/hooks/agent-output/CLAUDE.md`, the repository table ("`agent-output` | No.").
- **Class**: A convention file that disagrees with the tree it describes.
- **Enumeration**: `git ls-tree -r --name-only d96b799 tools/ | grep '\.test\.js$'` finds 2 files (`recordEntrypoints.test.js` from this chain, `uatLocalStack.test.js` from PI006).
- **Issue**: Under the workspace rule, the artefact wins and the file is wrong. The record's tests also have no stated runner or naming convention, so no convention exists for this review to check them against.
- **Required Action**: Steering, which owns `CLAUDE.md`, corrects the table row. This chain makes no change.

## Verdict

**Status**: APPROVED_WITH_COMMENTS
**Rationale**: The record check exits 0 at d96b799. A second, independently shaped instrument with a positive control confirms that the baseline holds only the two sanctioned classes. `--status` is byte-identical to the old tool's, and `--tracked` works. The instants precede the adoption commit, and the out-of-scope paths are untouched. Neither LOW finding changes a decision: CR-1 is wording, and CR-2 is a test title and adequacy question for QA.

## Required Actions

None blocking. Recommended before QA's Phase 2 verdict removes the `REVIEW` markers:
- CR-1 (fixer): correct the 4 texts in scope. The confirmation is a sub-entry of Round 1.
- CR-2 (fixer, judged by QA): the Preferred assertion, or at least the retitle.
- CR-3 and CR-4: steering.

## Assumption Not Checked

This review assumes that the engine QA runs is the one reviewed here (`~/.claude/tools` a34093d, record-engine.js sha256 9c1a94ac…) and does not test it. The entrypoints load the live engine unpinned. If it is false, `sha256sum ~/.claude/tools/record-engine.js` shows a different hash at QA's run, or the default check's output differs from `check-default-at-d96b799.txt`. Owner: QA Phase 2.

## Captured instruments

All are under `verification/fix-hooks-record-shared-engine/code-review/` and committed with this document:
- `classify-baseline-by-prefix.js`: run from the record root as `node <path> tools/check-repo-baseline.json`.
- `classify-baseline-by-prefix-at-d96b799.txt`, `classify-baseline-positive-control.txt` and `positive-control-planted-entry.json`.
- `check-default-at-d96b799.txt`, `check-full-at-d96b799.txt` and `check-instants-2026-08-01-at-d96b799.txt`.
- `status-old-7b4419a-vs-new-d96b799.diff` (empty, meaning identical), `index-old-vs-new-generator-on-d96b799.diff` and `convention-check-since-7b4419a.txt`.

The checks ran in detached worktrees in the scratchpad, never in the shared tree.

## Next Steps

- Handoff to QA (`qa-hooks-record-engine`) for Phase 2 at d96b799. QA also closes the Assumption Not Checked (the engine hash).
- To the fixer: CR-1, and CR-2 if taken.
- To steering (`steering-cleanup-hooks`): CR-3 at the `INDEX.md` rebuild, CR-4, and the statbot copies of CR-1.
