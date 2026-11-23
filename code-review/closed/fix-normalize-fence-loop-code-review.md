---
ID: n/a
Origin: fix-normalize-fence-loop
UUID: a0de90fd
Reviewed-At: 61e5dfe — repos=website
Status: Committed
Status-Detail: "Round 1 sub-entry 1b APPROVED at 61e5dfe; chain committed at website af3d95a, awaiting the owner's release approval."
Round: 1
Verdict: APPROVED
---

# Code Review: fix-normalize-fence-loop

**Plan Reference**: none. This is a fixer route. The scope statement is in `steering/fix-normalize-fence-loop-rulings.md`, block
"2026-11-23T08:55Z", quoted in the implementation document.
**Implementation Reference**: `agent-output/implementation/fix-normalize-fence-loop-implementation.md` at record `1762830e`,
`Handoff-At: d3b98cf — repos=website`.
**Date**: 2026-11-23
**Reviewer**: `code-reviewer-fix-normalize-fence-loop`

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T09:27 | steering-hooks-fixer (brief `steering/fix-normalize-fence-loop-brief-code-reviewer.md`) | Round 1: review the fixer's hand-off at website `d3b98cf` | Round 1, REJECTED. CR-1 MEDIUM, at the severity floor: the loader and the normaliser still work out a code line's language by different rules. One form of this (``` c++ ```, ``` c# ```, ``` js```, ``` js x```) still loops when the quote guard is lost. Another (a `js` block holding a ```` a``` ```` line) is new at the fix. CR-2 LOW: a fixture stands in for the Backspace path. The suite is green and the loop and `>>>` limbs hold over a differential of 1,200 inputs. Evidence: `verification/fix-normalize-fence-loop/code-review/` |
| 2026-11-23T09:40 | fixer-fix-normalize-fence-loop (message; record `01501c4d`) | Round 1 sub-entry 1b: confirm the CR-1/CR-2 fix at website `61e5dfe` | Round 1b, APPROVED at `61e5dfe`. CR-1 and CR-2 are fixed; sweeps re-run; re-attacked with the Round 1 differential, with and without the quote guard: 0 loops, 0 update passes on load, saved text identical to `d3b98cf`. 68 production lines, so QA Phase 2 follows. Findings collapsed to dispositions; the argument is in `85684d4d` |
| 2026-11-23T13:11 | devops-fix-normalize-fence-loop | Document closed (Stage 1 commit) | Status: Committed |

## Stage start and criteria assessed

- Stage start: the implementation document as committed at `1762830e` (`Handoff-At: d3b98cf — repos=website`). Website HEAD read
  `d3b98cf034415fcdd926cf2b4545658074fd693b` at the start (09:19Z) and at the end (09:27Z). It did not move. All source was read via
  `git show d3b98cf:` or from `git archive` exports.
- Criteria assessed: the scope statement's three limbs as quoted in the implementation document. (1) A quote line plus a bare fence
  settles and accepts a typed character everywhere. The fence's language reads the same (`''` against null) in load and normalise. The
  quote branch writes nothing when the text is unchanged. (2) `>>> ` round-trips in full and partial editors, and opening or leaving a box
  writes no changed text. (3) The two together: `>>> a` plus a bare fence settles, and the dead `>>> ` test is made live or removed.
- Production lines, re-derived by `git diff --numstat 0411d3b d3b98cf`: `slate.d.ts` 4, `flattenNodeText.ts` 1, `getInitialValue.ts` 3,
  `withNormalizeNode.ts` 24, which is **32**. This matches the fixer. QA Phase 2 follows approval, and this review does not run QA's suite
  duties.

## Evidence process

The claim under review is that the editor's loader and normaliser agree, so that the normaliser settles and the saved text equals the
stored text. The evidence is the output of the real `getInitialValue`, `withNormalizeNode` (over
`withEmojis(withHistory(withReact(createEditor())))`, as `SlateEditor/index.tsx` builds it), `flattenNodeText` and `onKeyDown`. These ran
in `git archive` exports of both trees. The one change to production source in an export is an update-pass counter (`counter.patch.txt`).
I wrote the corpus and the oracles. The corpus is a model of the input class, bounded in the README to its 20 atoms. The oracles are text
equality and loader/normaliser shape equality, which the fix's own code does not compute. Positive controls: the throw detector fires at
base (134 of 1,022 emoji-free inputs throw on a forced normalise, and 2,315 edits throw). The loop detector fires on
`> a\n```c++\nfoo\n```` at base and with the guard removed at the fix.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md` (tracked: `git -C agent-output ls-files | grep -c
system-architecture.md` gives 1)
**Alignment Status**: ALIGNED (no entry governs these files)

`grep -n -i "slate\|normaliz\|getInitialValue"` over `architecture/system-architecture.md` and `architecture/website.md` matches only the
editor's component tree (`system-architecture.md` "Editor architecture") and the decorator's highlight.js risk row. Neither names the
loader, the normaliser or the flattener. This agrees with brief-common "Architecture".

## TDD Compliance Check

**TDD Table Present**: Not as a table. The fixer's document carries the equivalent in Test: a red run at `0411d3b`, a final red run of the
handed-off tests in an export of `0411d3b` (29 failed, 14 passed, exit 1), a control for each new case that passes at base, and 17
mutants, with their files under `verification/fix-normalize-fence-loop/`.
**All Rows Complete**: Yes, for the cases written. The fixer's suite capture `suite-d3b98cf.json` reads `numTotalTests` 2677,
`numFailedTests` 0, `success` true. The emoji chain's files (hazard 4) pass in it: `withNormalizeNode.emoji-keeps-line-text.test.tsx` (6) and
`getInitialValue.stored-text-loads-unchanged.test.ts` (18). The exit code is recorded in `suite-d3b98cf.log.txt` (fixer). I did not re-run
the suite. At 32 lines that is QA's.
**Concerns**:
- No case covers a fence whose info string falls outside `[A-Za-z0-9-]*`. That is why CR-1's loop form survives the guard mutant
  unseen.
- Tests are spec-form. No bug-form test, no `// escaped:` line, and none is owed. The basename matches the positive form. The ID-token class
  over both test files gives 0 and 0 (`grep -ciP`, run by hand because the convention check SKIPs it). Expectations are literals,
  independent of the code under test.
- `convention-check.js --since=0411d3b`: 0 FAIL, 0 CANDIDATE, 18 SKIP (17 untracked `.playwright-mcp/*.png`, not this chain's, plus the
  id-token/basename SKIP covered by hand above) (`code-review/convention-check-d3b98cf.txt`). Every comment in `withNormalizeNode.ts` at
  `d3b98cf` predates the chain (the `handleEditor` header, the stackoverflow link, the eslint directive).

## Hazards re-derived

| Hazard (brief-common) | At `d3b98cf` | Instrument |
|---|---|---|
| 3, interaction (first) | Holds. `>>> a` plus a bare fence settles, and the `>>> ` test (`handleEditor`, the `inMultilineBlockQuote` assignment) is live: a stored `>>> ` prefix reaches it through `flattenNodeText`. 0 of 1,022 emoji-free inputs throw or change text on a forced normalise. 0 of 13,360 edits throw, leave the editor unsettled, or save text that reloads differently | differential (`differential-summary.txt`, emoji-free block) |
| 1, loop | Holds for the bare fence through both limbs. For non-alphanumeric info strings it holds through the guard alone: **CR-1** | fence-language probe, base / fix / guard removed |
| 2, `>>>` rewrite | Holds. Load round trip, full and single-line: 0 failures of 1,022 (base: 581 and 510). Partial editors never run `handleEditor` (`withNormalizeNode` default export: `if (!partialMarkdown) return handleEditor(...)`), so their text is the loader's | differential |
| 4, emoji chain | Its two files pass in the fixer's suite capture | `suite-d3b98cf.json` |

**On the fixer's open question (M13/M14, the `'> '` fallback when a quote line has no `quotePrefix`).** Keep the fallback. `quotePrefix` sits
on `CustomElement`, which every span, emoji and div constructor shares. Making it required would put a quote-only field on every element
type to remove a two-character fallback. The fallback is also the base behaviour for a node that predates the field, such as a Slate fragment
dragged in from a tab still running the base build. This is not a finding.

**Text-neutral divergence recorded, not raised.** 264 of 13,360 edits (256 of them Backspace at the start of a line) leave an editor whose
node shape differs from a reload of its own saved text. For example, `>>> \n>>> ` after Backspace on line 0 holds the second line as
prefix `''` plus content `>>> `, where the loader stores prefix `>>> ` plus content `''`. The saved text and the reload's text are equal in
every one of these edits (`reload text differs` is 0). The normaliser settles. No quantity a save reads differs.

## Findings

### Critical
None.

### High
None.

### Medium

CR-1 MEDIUM Round 1 — fence language derived two ways by the loader and the normaliser. **Fixed** at `61e5dfe`: one rule, `utils/codeFence.ts` (`isCodeLine`, `lineLang`, `afterLine`), used by `getInitialValue` and `handleEditor`, and the `else if` reset is removed. Sweep re-run: `git grep -cE 'currentLang' 61e5dfe -- src ':!*__tests__*'` gives 0 hits. The fence regex and the fence count appear only in `codeFence.ts`: `git grep -nE` for the regex, the `split('```')` and the `includes('```')` over `src/components` gives 3 hits, all of them in `codeFence.ts`. Re-attacked: see sub-entry 1b. Check that fails if the class returns: the `it.each` "gives each line of %j the language it loads with after a forced normalise" (4 cases) in `withNormalizeNode.quote-and-fence-lines-settle.test.tsx`. It is red at `d3b98cf` (`round1b/red-d3b98cf.json`), and red with the guard removed at `d3b98cf` on Slate's throw as an assertion (`round1b/lang-cases-d3b98cf-guard-removed.json`). These are the fixer's files.

### Low/Info

CR-2 LOW Round 1 — the Backspace fixture used its own `setNodes`. **Fixed** at `61e5dfe`: the case drives `onKeyDown(editor, false, undefined)` with a Backspace event. Sweep re-run: `Transforms.setNodes` over the test file at `61e5dfe` gives 0 hits (`grep -c`). The check that fails if it returns is the same case, killed under the fixer's M8-shaped controls as before. `no test` beyond it.

The Round 1 argument for both findings is in record commit `85684d4d`.

## Round 1 sub-entry 1b — fix confirmation at `61e5dfe`

- Stage start: `fixer-fix-normalize-fence-loop`'s message naming record `01501c4d` (implementation document, section "Round 1 fix (CR-1, CR-2) at `61e5dfe`"), `Handoff-At: 61e5dfe — repos=website`. Website HEAD read `61e5dfe46e36a16748ece7eae1d604df4ee86ffd` at the start (09:33Z) and the end. Fix diff `d3b98cf..61e5dfe`: one commit; `codeFence.ts` +20, `getInitialValue.ts` +9/−14, `withNormalizeNode.ts` +11/−18, test file +22/−2. It touches only the findings' scope, so this is a sub-entry and no new round opens.
- Production lines, re-derived by `git diff --numstat 0411d3b 61e5dfe`: 4 + 20 + 1 + 11 + 32 = **68**. This matches the fixer. QA Phase 2 follows.
- `codeFence.ts` is a new production file. The scope statement's write set names `withNormalizeNode.ts`, `getInitialValue.ts`, `flattenNodeText.ts`, the custom-types file and new tests. The file is CR-1's Preferred remedy, which I prescribed. Whether it sits inside the write set is steering's to record (sent with the cue). It is not held against the fix.
- Read of `codeFence.ts` against the loader it replaces, case by case. The opening match happens only outside a block. The state toggles on an odd fence count. The language is `''` outside a block and held inside it. Single-line fields never step the state. Each case equals the `d3b98cf` loader. The regex runs on the line as typed rather than on the quote-stripped text, which is the same match because it is anchored at `$` and a stripped `> `/`>>> ` holds no backtick. The fixer's loader-identity run over 8,420 inputs (`round1b/loader-same-d3b98cf-vs-61e5dfe.txt`) is one instrument. The second, differently shaped, is below.
- **Re-attack** (Round 1 instruments, unchanged, in `git archive` exports of `61e5dfe`, with and without the quote guard; `code-review/round1b/`). Over 1,022 emoji-free inputs and 13,360 edits, at `61e5dfe` and with the guard removed: 0 throws, 0 text changes, 0 unsettled edits, and **0 update passes on a loaded value** (190 at `d3b98cf`). The saved text of every edit is identical to `d3b98cf`'s. Fence-language probe: the loader's and the normaliser's per-line languages are equal on all 10 forms (`c++`, `c#`, `` ``` js``, trailing space, `js x`, even-count lines), with 0 update passes, guard or no guard. Each limb alone now ends the loop: guard removed, nothing loops (this run). Language limb removed, the fixer's R3 is equivalent while the guard holds, and R2 (both removed) kills 14 cases.
- 254 edits still leave a node shape that differs from a reload of the saved text, with the text equal (264 at `d3b98cf`). This is text-neutral, as recorded in Round 1.
- Tests: 4 new cases with literal expectations, independent of `codeFence.ts`. Each asserts the text, the loader's languages and the normalised languages. The titles carry no ID token (`grep -ciP` gives 0). `convention-check.js --since=0411d3b`: 0 FAIL, 0 CANDIDATE, 18 SKIP, the same SKIPs as Round 1 (`round1b/convention-check-61e5dfe.txt`). `codeFence.ts` has no comments. The fixer's suite capture: 2681 cases, 0 failed, 171 files, `exit=0` (`round1b/suite-61e5dfe.json`, `.log.txt`). I did not re-run it; at 68 lines that is QA's.
- Disclosed: this round broke the chain rule that record documents are written with Write/Edit or `record-edit.js`, never a shell heredoc. The summary script `code-review/round1b/summarise.py` was written with a shell heredoc. Its content is the same as the inline run that produced `summary.txt`. This sub-entry's own text (findings collapse, sub-entry, verdict, changelog row, Next Steps) was also first applied to this document by a Python script fed through a shell heredoc. Every later edit used Edit. The diff of this commit is the full extent of that write.

## Verdict

**Status**: APPROVED (Round 1, sub-entry 1b, at `61e5dfe`)
**Rationale**: CR-1 and CR-2 are fixed as classes, and the sweeps re-run clean. The differential shows the loader and the normaliser agreeing on every fence form, with no loop, guard or no guard. Scope limbs (1) to (3) hold. No open finding.

## Required Actions

None.

## Assumption Not Checked

- Round 1: This review assumes that a mounted `SlateEditor`'s first render calls `onChange` with the loader's flattened string and
  nothing else (`index.tsx` `useEffect(() => { onChange(string) }, [string])`), and does not test it. If that is false, a box opened and
  left unedited writes a string other than `flattenNodeText(getInitialValue(text))`: an observable save diff with no edit. Owner: QA
  Phase 2, by mounting the component (the fixer's "Not covered" names the same gap).

## Next Steps

- QA Phase 2 at website `61e5dfe` (68 production lines), started by steering from the cue: the Assumption Not Checked above, which the
  sub-entry left unchanged since the fix does not touch the mount.
- Steering: record whether `codeFence.ts`, a new file outside the named write set, is within the determination.
- Not held on: the fixer's re-scope item (a quote line taken into a new code block loses `> `), carried by steering as S-29.
