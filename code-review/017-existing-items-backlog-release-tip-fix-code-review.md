---
ID: 017
Origin: 017
UUID: 5c3e9a71
Reviewed-At: "787bec5,8512a1d — repos=website,preview-image-generator; release-tip fix (QAF-29, QAF-30) at website 787bec5 over 7293a35 (implementation document a05505e); generator unchanged"
Status: In Review
Round: 1
Verdict: APPROVED
---

# Code Review: 017 — the existing-items backlog, release-tip fix (QAF-29, QAF-30)

**Plan Reference**: `agent-output/planning/017-existing-items-backlog.md`
**Implementation Reference**: `agent-output/implementation/017-existing-items-backlog-release-tip-fix-implementation.md` (agent-output `a05505e`)
**Predecessor review**: `code-review/closed/017-existing-items-backlog-code-review.md`. Devops closed it at Stage 1 (`67d0a4a`, Status Committed, website `7293a35`). Its last entry, the Round 10 sub-entry continued at `7293a35`, is the base this entry reviews from.
**Date**: 2026-11-19
**Reviewer**: Code Reviewer (code-reviewer-hooks-017)

This document exists because the predecessor review is closed and the lifecycle names no reopening of a closed document. Its name follows the implementer's document for the same fix round. This is a scoped, test-only check: a diff touching only test files never opens a numbered round. `Round: 1` is the header's integer for this document's one entry. It does not count as a review round of the chain.

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T20:01 | implementer-hooks-017 (fix SHA `787bec5`, document `a05505e`); steering-roadmap-hooks (round given, `steering/017-rulings.md` block 2026-11-19T19:54Z) | Scoped check of the test-only fix for release-tip QAF-29 and QAF-30 | APPROVED at `787bec5`. The diff is test-only: 3 files, +62 −2. 5 of 5 of my mutants were killed, each by its intended case alone, as an assertion (`verification/017/code-review/qaf29-30-787bec5/`). Three of the five are phrased unlike QA's deletions. Conventions: 0 FAIL and 0 CANDIDATE, with the ID-token and basename checks run by hand: 0 hits, controls fire. M7-b holds at `787bec5` (`m7/tip-787bec5/`). Disclosed: this document is new because the predecessor was closed at Stage 1, and my first Edit calls aimed at the predecessor's old open path and wrote nothing. |

## Scope and Tree

- **Stage start**: the release-tip fix document at `Handoff-At` `787bec5` (agent-output `a05505e`), handed over by implementer-hooks-017. Steering gave the round (`steering/017-rulings.md` block 2026-11-19T19:54Z).
- **Criteria assessed** (recorded before the diff was read): QA's two remedies as release-tip Phase 3 states them (`qa/website-7293a35-generator-8512a1d-release-tip-qa.md`, agent-output `4914aaa`). Both are severity-floor MEDIUM, test-only.
  - **QAF-29** (plan M3 write matrix, "A share code opened at route 0: written (`codeMessage` effect)"): a case at route 0 with a `code` asserts this tab's route-0 entry holds that message, red under the write's deletion.
  - **QAF-30** (M8): in each dialog's DOM test, the ref-bearing wrapper's class includes `contents` and holds the message and the `DialogFooter`, each red under its mutant.
- **Tree**: website `787bec5`, two commits over `7293a35` (`391c88b`, `787bec5`). It was the shared HEAD at the start and end, and the tracked tree was clean (`git status --porcelain --untracked-files=no`, empty). `git diff --numstat 7293a35 787bec5` gives three test files and no production path:
  - `MessageProvider.stored-draft.test.tsx` +27 −2;
  - `WarningDialog.enter-scope.test.tsx` +19;
  - `ImageUploader.enter-scope.test.tsx` +16.

  The generator is unchanged at `8512a1d`.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md` (present: `ls -d`, and `git cat-file -e HEAD:` in agent-output)
**Alignment Status**: ALIGNED

No production line changes. The architecture record's reading of M3 and M8, as assessed in the predecessor review, is untouched.

## Instruments and Reproduction

- **The cases, read**:
  - **QAF-29**: the file's `useSearchParams` and `message.getFromCode` mocks gain hoisted state, reset in `beforeEach`. One case mounts at route 0 with `code=abc` and the code's message, unmounts, and remounts at route 0 with no code. It expects `{ data: { content: 'shared by code' }, name: 'New Message' }`, a literal. The remount reaches the route-0 effect (`routeZeroDraftFor(tabId())`), which reads only what the share-code effect wrote. The `message` effect returns at `message === loadedRef.current`, as QA established.
  - **QAF-30**: one case per dialog finds the footer as the Cancel button's parent and the wrapper as the footer's parent. Each asserts that the wrapper's class list holds `contents` and that the wrapper contains the message `<p>` (the URL `<input>` for `ImageUploader`).
  - At `787bec5` that wrapper is the `useDialogEnter` ref element in all three components (`<div ref={ref} className="contents">`). `contains` rather than direct-child is the right reading for the layout property, since an extra block around the message alone still leaves two flex items.
  - `bodyWrapperOf` now has 2 copies, below the helper policy's third-duplicate lift.
- **Re-attack, from first principles**: I wrote 5 mutants (`verification/017/code-review/qaf29-30-787bec5/make-mutants.py`, `mutants.json`). Three are phrased unlike QA's deletions. I ran them with `mutation-run.py` at `787bec5` over the three files. The runner was `vitest.probe.config.mjs`, `--dep node_modules`. Control: 66 of 66. Result: **5 of 5 KILLED**, count checked, no timeout, each by one AssertionError (`run/`, `mutation-run.out`, exit 0). Each is killed by its intended case alone:
  - `r0-write-deleted` (QA's `index.tsx:153:stmt`): the share-code case.
  - `r0-write-wrong-data` (the effect writes `{ ...tmp, data: { content: '' } }`): the share-code case.
  - `confirmation-box-class` (`contents` → `flex flex-col`, a box-forming class): the ConfirmationDialog row.
  - `warning-footer-outside` (the footer moved into a second, plain `<div>`): the WarningDialog row.
  - `uploader-class-dropped`: the ImageUploader case.
  - This reproduces the implementer's kills of QA's four deletions, with an instrument I wrote.
  - **Blind spot**: a class change that keeps the `contents` token but adds a box-forming one beside it (`contents flex`). Which `display` applies then depends on the generated CSS order, and the case would pass either way.
- **Premise run in the round**: the class takes effect in the build. `tailwind.config.js` `content: ['./src/**/*.{js,ts,jsx,tsx}']` scans the three components, and `contents` is a core utility (`display: contents`) in the installed `tailwindcss@3.2.4`. The rendered gap itself is a browser look (Assumption Not Checked).
- **Conventions**: `convention-check.js website --since=7293a35` (`qaf29-30-787bec5/convention-check-since-7293a35.out`, exit 0) gives 0 FAIL and 0 CANDIDATE over 3 test files. The ID-token and basename checks are SKIPped by the tool, so I ran them by hand (`id-token-check.out`).
  - The 65 added lines give 0 hits, and the 3 basenames match the positive form.
  - Controls: `it('QAF-29 share code')` and `describe('m3 r0')` both fire.
  - No comment line was added.
- **M7-b at the new tip**: I ran a no-fix lint at `787bec5` in the shared tree (read-only). The name-status is the same 61 paths as at `7293a35`. `compare.mjs` and `recheck.py` both give 60 changed lintable files and 0 rule counts above the base, and all three planted controls fire on both (`code-review/m7/tip-787bec5/`). The whole-tree eslint exits 1, as at every earlier tip, on findings that also exist at base.
- **Suite and typecheck**: the document's 1857 of 1857, exit 0, and typecheck exit 0, read and not re-run (QA's).
- **Implementer's disclosure** (the first mutant run exited 127 because the driver wrote colons into export paths, and it was re-run): noted. Its evidence is the second run, which my own run corroborates.

## TDD Compliance Check

**TDD Table Present**: Yes (`## TDD Compliance`)
**All Rows Complete**: Yes. There is a TDD Gate line per case, each naming the deletion it fails under, with production unchanged.
**Concerns**: None. Both cases are spec-form: they state the behaviour, and no ID token appears.

## Findings

### Critical
None

### High
None

### Medium
None

### Low/Info
None. The `contents flex` blind spot above is recorded as the instrument's limit, not as a finding. No such edit exists, and QA's remedy prescribed the class-token form.

## Verdict

**Status**: APPROVED
**Rationale**: the share-code route-0 write and each dialog's `contents` wrapper now have a case that fails when they are lost. QA's deletions and three further forms are killed, each by one case, as assertions. The diff is test-only, and conventions and M7-b hold at `787bec5`.

## Required Actions

None.

## Assumption Not Checked

- This review assumes that, in a browser, `display: contents` on the ref wrapper makes the message and the footer the `PresetDialog` panel's flex items, 16 px apart, as QA's reading states. I do not test it, because jsdom computes no layout and the cases assert the class only.
  - **If false**: in a browser, the update prompt, the warning dialog or the image dialog shows its footer flush against its message (or fields), with no gap, at `787bec5`.
  - **Owner**: UAT, one look at each of the three dialogs on the local stack at the release tip.

## Next Steps

- QA (`qa-hooks-017`): a fresh release-tip Phase 3 at `787bec5`.
- UAT: the three dialogs' gap (Assumption Not Checked).
- Steering (`steering-roadmap-hooks`): informed of the verdict. **No plan row was written**: the plan is closed (`planning/closed/017-existing-items-backlog.md`, Status Committed, R-62 at 19:13Z), and neither QA's release-tip Phase 3 nor the implementer's fix round added one after closure. Whether the closed plan's register takes rows for the release-tip cycle is steering's call. If it does, this verdict's row goes at the table's end after R-63.
