---
ID: n/a
Origin: fix-cut-collapsed-caret
UUID: 22b61dde
Reviewed-At: 8845b7e3409782e0f07ecd36a818f48f4ebcc721 — repos=website
Status: Committed
Status-Detail: "Verdict APPROVED at 8845b7e; the chain is committed on website chain/fix-cut-collapsed-caret, release awaits the owner's approval (deployment/fix-cut-collapsed-caret-deployment.md)."
Round: 1
Verdict: APPROVED
---

# Code Review: fix-cut-collapsed-caret

**Plan Reference**: none (fixer route). Scope: `steering/fix-cut-collapsed-caret-rulings.md` blocks "2026-11-22T18:49" and, governing,
"2026-11-22T18:53" (corrected statement).
**Implementation Reference**: `agent-output/implementation/fix-cut-collapsed-caret-implementation.md` at record `083260a4`, `Handoff-At: 329cc20`.
**Date**: 2026-11-22
**Reviewer**: `code-reviewer-fix-cut-collapsed-caret`

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-22T19:10 | steering-hooks-fixer (brief `steering/fix-cut-collapsed-caret-brief-code-reviewer.md`) | Round 1: review website `453de76..329cc20`; under 20 production lines, so also the suite, typecheck and red test | REJECTED: CR-1 MEDIUM (severity floor) — no assertion fails when Copy starts deleting; the rest holds. Back to the fixer. |
| 2026-11-22T19:14 | fixer-fix-cut-collapsed-caret (message, test-only commit `8845b7e`) | Round 1 sub-entry 1a: re-verify CR-1 | APPROVED at `8845b7e`: CR-1 fixed, its mutant KILLED by the new Copy case; suite 2366/2366, typecheck exit 0. Two evidence paths written relative (`code-review/…`), flagged by the fixer from check-repo, written out in full. The record-write hook refused a shell edit of this document; re-issued with the Edit tool. |
| 2026-11-22T19:16 | devops-fix-cut-collapsed-caret (Stage 1) | Document closed | Status: Committed; moved to `code-review/closed/`. The Assumption Not Checked below is carried by the deployment record's post-deploy walk (brief `steering/fix-cut-collapsed-caret-brief-devops.md`), not left to this document. |

## Round 1

**Tree.** `git -C website rev-parse HEAD` = `329cc20714c8b956a79ed2459f67d2fb13657ada` at start and end of the round. Files read with
`git show 329cc20:<path>`; runs in `git archive` exports (scratchpad), `node_modules` symlinked from the tree.

**Criteria assessed (recorded before reading the diff)** — rulings block 18:53, corrected statement: (1) Cut with a collapsed caret not
inside an emoji (inline void) deletes nothing; (2) Cut on an expanded selection behaves as at base; (3) Cut on a clicked emoji behaves
as at base; the test asserts all three. From block 18:49, standing: Copy is unchanged; write set `onCopy.ts` + one test file.

**Production lines.** `git diff --numstat 453de76 329cc20`: `src/components/SlateEditor/utils/onCopy.ts` 5 added / 4 removed;
`__tests__/onCopy.cut.test.tsx` 84/0 (test lines, not production under GLOSSARY "Production line"). **5 production lines** — under 20, so
code review alone, with the suite, typecheck and red test run here.

### Re-derived (brief's hazards and the corrected statement's three cases)

| Item | Result | Instrument |
|---|---|---|
| Hazard 1 — base cut deletes at any selection shape | Holds at base: red run deletes "b" from "abc" at offset 1 | `verification/fix-cut-collapsed-caret/code-review/red-run.txt` (export at `329cc20` with `onCopy.ts` from `453de76`): exit 1, `1 failed \| 2 passed (3)`, `Expected "abc" Received "ac"` |
| Case 1 — plain caret cuts nothing | Holds at fix | `verification/fix-cut-collapsed-caret/code-review/green-run.txt`: exit 0, `3 passed (3)` |
| Cases 2, 3 — expanded range and clicked emoji removed as at base | Hold at fix (same run); fixer's mutants `expanded-limb-false`, `emoji-limb-false`, `delete-removed` KILLED (`negative-controls/driver.txt`) | green run; fixer's table |
| Mirror claim — "the guard is slate-react's own rule" | Holds. slate-react 0.123.0 `onCut` (`node_modules/slate-react/dist/index.js`, `onCut` callback in `useEditable`'s handlers): `Range.isExpanded(selection)` → `deleteFragment`; else `Editor.isVoid(Node.parent(anchor.path))` → `Transforms.delete`; collapsed text → nothing. The fix uses `Editor.void(editor, { at: selection.anchor })`, which also matches void ancestors above the parent; in this editor the only void is the emoji (`withEmojis`, `isVoid` for `isEmojiElement`), whose child is a text leaf, so the two predicates select the same points. | read at `329cc20` |
| Hazard 2 — a collapsed plain caret leaves the event to the browser | Holds and is the remaining unexecuted premise (Assumption Not Checked) | slate-dom `setFragmentData` returns before writing when `Range.isCollapsed(selection) && !startVoid`, so no fragment, no `preventDefault`; slate-react's `onCut` then runs and deletes nothing |
| Hazard 3 — environment fidelity | Complied: the test calls the handler directly against `withEmojis(withReact(createEditor()))`; nothing mounts `Editable` | test file read |
| Hazard 4 — one shared handler, six surfaces | Holds: `git grep -c "onCopy(" 329cc20 -- src bot` → `SlateEditor/index.tsx` 2 (`onCopy={…onCopy(editor)}`, `onCut={…onCopy(editor, true)}`), test file 3; the only export path is `utils/index.tsx` `export { default as onCopy }` | grep |
| Sibling sweep — other user-selection deletes in the editor | `git grep -n -E 'onCut\|Transforms\.delete\(\|deleteFragment\|deleteBackward\|deleteForward' 329cc20 -- src bot` → 6 hits: `onCopy.ts` (this fix); `onKeyDown.ts` `normalizeBackspace` (`Transforms.delete` at `editor.selection` guarded by `!collapsed`, not a member); `withNormalizeNode.ts` (delete at a node path, not a selection); three commented-out lines in `utils/index.tsx`. No sibling carries the defect. Blind spot: a delete reached through another slate API (`Transforms.removeNodes`, `insertText` over a range) is not matched. | grep |

### Suite, typecheck, conventions (fix tree `329cc20`)

| Check | Result | Evidence (`verification/fix-cut-collapsed-caret/code-review/`) |
|---|---|---|
| `npx vitest run --reporter=json` (memory-capped) | exit 0; `numTotalTests` 2365, passed 2365, failed 0; 167 `testResults` files, `onCopy.cut.test.tsx` among them | `suite-fix.txt`, `suite-fix-summary.txt` — matches the fixer's 2365 / 167 |
| `npx next typegen`, then `pnpm run typecheck` (both tsc programs) | exit 0, exit 0 | `typegen-fix.txt`, `typecheck-fix.txt` |
| `node ~/.claude/tools/convention-check.js website --since=453de76` | exit 0; 0 FAIL, 0 CANDIDATE; 18 SKIP: 17 untracked `.playwright-mcp/*.png` (not this chain's) and "id-token, basename … the checks did not run" — **unchecked by the tool**. By read: basename `onCopy.cut.test.tsx` is module `onCopy` + behaviour `cut`, positive form; titles carry no ID token. | `convention-check.txt` |
| Source comments | The diff adds none (`onCopy.ts` hunks are code only) | diff |

**Test authorship.** Spec-form throughout (no `// escaped:` line, none owed: the defect predates the pipeline and the titles state
behaviour). Placement `utils/__tests__/` beside `onCopy.ts`; `.tsx` for jsdom's `window.atob`/`btoa`, stated in the document. Expected
values are literals (`'abc'`, `'ac'`, `'b'`, `'🙂'`, `['div']`) — independent of the code under test (axiom E).

**Invented fixture value.** `writeFragmentLikeSlateDom` replaces `editor.setFragmentData` for the expanded and emoji cases. The document
names it as invented and states its falsity signature (Iron Law 5 is met by naming). Read against slate-dom 0.123.0 `setFragmentData`:
the real encoder takes `e.getFragment()` (slate's default: `Node.fragment(editor, selection)`), JSON-stringifies, and writes
`btoa(encodeURIComponent(…))` under `application/x-slate-fragment` — the transcription computes the same value; only the DOM range half is
skipped. No finding.

### Findings

#### Critical
None.

#### High
None.

#### Medium

**CR-1 MEDIUM Round 1 Checks That Cannot Fail**: no assertion fails when Copy starts deleting
- **Location**: `src/components/SlateEditor/utils/onCopy.ts`, default export, the `cut && (Range.isExpanded(selection) || Editor.void(…))`
  guard; `__tests__/onCopy.cut.test.tsx` `describe('editor cut handler')`.
- **Class**: The handler serves Copy and Cut through one flag, and the change rewrote the line carrying that flag, yet no case calls the
  handler with `cut` false — "Copy is unchanged" (block 18:49; the document's "Ctrl+C is unchanged in all three") has no assertion that
  fails when it is lost. Severity floor (behaviour the change claims to preserve with no failing assertion): MEDIUM, blocks hand-off.
- **Enumeration**: `git grep -c "onCopy(" 329cc20 -- src bot` → 5 calls: `SlateEditor/index.tsx` 2 (Copy, Cut wiring — no assertion), the
  test file 3, every one `onCopy(editor, true)`. Calls with `cut` false under test: 0. Probe: mutant `cut-conjunct-dropped`
  (`if (cut && (` → `if (true && (`) through `mutation-run.py` at `329cc20` against the test file → **SURVIVED** (control passed, 0 of 1
  killed): `verification/fix-cut-collapsed-caret/code-review/mutants.json`, `probe-driver.txt` and `probe/` beside it. No other suite file imports the handler (the
  import grep `onCopy['"]|/onCopy|onCopy,` finds only `utils/index.tsx`'s re-export, `SlateEditor/index.tsx` and the test), so the whole
  suite cannot kill it either. Blind spot: the grep matches the identifier `onCopy`; the default export imported under another name would
  be missed — the import grep found none.
- **Issue**: Under that mutant, Ctrl+C on highlighted text or a clicked emoji removes it from the editor, and the suite stays green.
- **Required Action**:
  - **Preferred (structural)**: none smaller than the case below; splitting Copy and Cut into two handlers is outside the write set.
  - **Minimum**: add a case to the existing `onCopy.cut.test.tsx` (extend, do not add a file) that calls `onCopy(editor)` (no `cut`) on a
    selection the cut guard admits — an expanded range or a clicked emoji, never a plain caret, on which the mutant is inert — and asserts
    the text is unchanged (and, as the cut cases do, that `copy` received the selected text). Falsity signature: under
    `cut-conjunct-dropped` the case fails as an assertion (`Expected "abc" Received "ac"` for a range over "b"), not a timeout; record
    that kill. The title names the behaviour (Copy leaves the text in place), and the `describe` may be widened from "editor cut handler"
    accordingly; the basename may stay or become `onCopy.clipboard.test.tsx` — either meets the positive form.
  - **Callers**: the test-only change touches no production caller.

#### Low/Info
None.

### Sub-entry 1a — CR-1 fix confirmation at `8845b7e` (2026-11-22T19:14)

**Tree.** `git -C website rev-parse HEAD` = `8845b7e3409782e0f07ecd36a818f48f4ebcc721` at start and end. `git log 329cc20..8845b7e`: one
commit; `git diff --numstat 329cc20 8845b7e`: `__tests__/onCopy.cut.test.tsx` 12/1, no production path — test-only, so a sub-entry
(scope: the fix diff), no new round. Production lines `453de76..8845b7e` stay 5.

**CR-1 disposition.** Class gone: the sweep re-run, `git grep -n "onCopy(" 8845b7e -- src bot` → 6 calls; under test, one now passes no
`cut` (`copies a selected range without removing it when the event is a copy`, `onCopy(editor)` on a range over "b", asserting text
`'abc'` and `copy` called with `'b'` — literals, axiom E). The fixture meets the required property: an expanded range, which the cut guard
admits, so the mutant is live there. Captured check that fails if it returns: `verification/fix-cut-collapsed-caret/code-review/mutants.json`
(`cut-conjunct-dropped`), re-run by me through `mutation-run.py` at `8845b7e` → **KILLED**, count checked; failing title the new case
alone, by assertion `Expected "abc" Received "ac"`, not a timeout (`code-review/sub1/probe-driver.txt`, `sub1/probe/`). The `describe`
title widened to "editor copy and cut handler"; basename unchanged (positive form).

| Check at `8845b7e` (exports; memory-capped) | Result | Evidence (`verification/fix-cut-collapsed-caret/code-review/sub1/`) |
|---|---|---|
| Red: test file against `onCopy.ts` from `453de76` | exit 1, `1 failed \| 3 passed (4)`, the plain-caret case | `red-run.txt` |
| Suite, `npx vitest run --reporter=json` | exit 0; 2366 / 2366 passed, 0 failed, 167 files | `suite.txt`, `suite-summary.txt` |
| `npx next typegen`, `pnpm run typecheck` | exit 0, exit 0 | `typegen.txt`, `typecheck.txt` |
| `convention-check.js --since=453de76` | exit 0; 0 FAIL, 0 CANDIDATE, 18 SKIP (as Round 1: untracked images, id-token check not run; title and basename read by hand: no ID token) | `convention-check.txt` |

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md` (exists: `git -C agent-output ls-files architecture`
lists it; read from the workspace clone `/usr/local/bin/hooks/agent-output`).
**Alignment Status**: ALIGNED — `grep -c -i -E 'onCopy|onCut|SlateEditor|clipboard'` → 1 hit in `system-architecture.md` (the editor's
highlight.js `_emitter` risk row, unrelated), 0 in `architecture/website.md`. No passage names the cut handler; the fix stays inside it.

## TDD Compliance Check

**TDD Table Present**: Yes, in the fixer's form (red / red-final / green runs, negative-control table).
**All Rows Complete**: Yes. Red reproduced here (`red-run.txt`, exit 1, the plain-caret case), green reproduced (`green-run.txt`, exit 0).
**Concerns**: CR-1 — the controls kill every mutant on the guard's limbs, none on its `cut` conjunct.

## Verdict

**Status**: APPROVED at `8845b7e` (sub-entry 1a). CR-1 fixed and its mutant killed; no finding open. Round 1's verdict below was
REJECTED at `329cc20`.
**Rationale (Round 1, at 329cc20)**: The fix is correct, minimal and matches slate-react's own cut rule; all three cases of the corrected statement are
asserted and seen red; suite and typecheck pass. One severity-floor finding blocks: the Copy half the change claims unchanged has no
failing assertion, and a one-token mutation of the rewritten line survives.

## Required Actions

1. CR-1 Minimum: one Copy case in the existing test file, shown red under `cut-conjunct-dropped` (the mutants file is
   `verification/fix-cut-collapsed-caret/code-review/mutants.json`) and green at the new SHA. Test-only change: re-verified here as a
   sub-entry of Round 1, not a new round.

## Assumption Not Checked

- Round 1: This review assumes a real browser's native cut on a collapsed plain caret in a `contenteditable` removes nothing, and does not
  test it (jsdom cannot; slate's handler and the project's now both leave the event unhandled there). Falsity signature: in a real browser,
  Ctrl+X with a plain caret in a message editor still removes a character or a word. Owner: no UAT in this stage set — routed to
  `steering-hooks-fixer` as the owner's check, the document's first "User-visible flows" bullet, on the production deploy after release
  (or on a local build that saves nothing).

## Next Steps

- Round 1 REJECTED → `fixer-fix-cut-collapsed-caret` for CR-1, copied to `steering-hooks-fixer` (done).
- Sub-entry 1a APPROVED at `8845b7e` → spawn cue to `steering-hooks-fixer`, which starts devops for website `master` (5 production lines,
  under 20: no QA).
- The Assumption Not Checked above → `steering-hooks-fixer`, for the owner's check after release.
