---
ID: n/a
Origin: fix-normalize-fence-loop
UUID: a0de90fd
Reviewed-At: d3b98cf — repos=website
Status: In Review
Round: 1
Verdict: REJECTED
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

**CR-1 MEDIUM Round 1 Correctness**: The loader and the normaliser derive a code line's language by different rules
- **Location**: `src/components/SlateEditor/utils/withNormalizeNode.ts` `handleEditor` (the `currentLang` lines: the `/```([A-Za-z0-9-]*)$/`
  match, its `else if (res?.[0] && inCodeBlock && currentLang) currentLang = ''` branch, and the `child.lang !== currentLang` compare)
  against `src/components/SlateEditor/utils/getInitialValue.ts` default export (its `currentLang` lines and
  `lang: isCodeBlock && currentLang ? currentLang : ''`), at `d3b98cf`.
- **Class**: A code line's language is computed twice, once by the loader and once by the normaliser, under rules that disagree. Wherever
  they disagree, `handleEditor` runs a full update pass on every editor normalise, and the loop is held shut only by the quote guard.
- **Enumeration**: `git grep -cE 'currentLang' d3b98cf -- src ':!*__tests__*'` gives 2 files: `getInitialValue.ts` 4 and
  `withNormalizeNode.ts` 6. These are the only two derivations. The predicate cannot see a derivation under another name. The other fence
  readers, `git grep -nE '```' d3b98cf -- src`, are `utils/markdown/rules.tsx` (the preview renderer's own `FENCE`, a different surface
  that does not feed editor state) and docs and comments. Measured disagreements, from `fence-lang-out-*.json`:
  - (a) **Pre-existing, not closed.** An info string outside `[A-Za-z0-9-]*` matches neither regex: ` ```c++ `, ` ```c# `, `` ``` js ``,
    `` ```js `` with a trailing space, `` ```js x ``. The loader stores `''` and the normaliser compares against null. At the fix this is one
    update pass on every normalise (`updFirst` 1, `updSecond` 1). In the emoji-free corpus, all 190 inputs whose loaded value triggers an
    update pass hold such a fence. `> a\n```c++\nfoo\n```` loops at base (378 iterations). At the fix it settles **only** because of the
    quote guard. With the guard removed (`guard-removed-mutant.patch.txt`) it throws after 378 iterations again. The implementation
    document's "Either limb alone ends the loop" holds only for the bare fence.
  - (b) **New at `d3b98cf`.** With `*`, the closing-fence `else if` branch now fires on a line inside a code block that ends in ```` ``` ````
    with an even count (```` ```a``` ````, ```` x`````` ````). It resets `currentLang` to `''`, and the loader has no such branch.
    `` ```js\n```a```\nfoo\n``` ``: the loader gives `foo` `lang: 'js'`, and the normaliser rewrites it to `''` on the first normalise
    (`updFirst` 1, then settled). At base both said `'js'`. The decorator reads `line.lang` (`decorator.tsx`, `handleCodeBlockRange`), so
    that block loses its `js` highlighting on the first edit. Diagnosis states that this branch "is unchanged". That claim is refuted.
- **Issue**: Scope limb (1) requires "the fence's language reads the same (`''` vs null) in load and normalise". That holds for ```` ``` ````
  and fails for (a). (b) is a regression the fix introduced. No case in the suite fails when the language limb is lost for (a), so the loop's
  prevention for those fences rests on one limb, and the cases test that limb only through bare fences. Under the severity floor (a property
  the change claims, with no assertion that fails when it is lost), this blocks hand-off to QA. Magnitude: measured on vitest/jsdom at the
  two exports. It costs one extra full `setNodes` pass per normalise for (a) and one `set_node` for (b). It does not loop at the fix, and the
  saved text is unchanged.
- **Required Action**: eliminate the second derivation.
  - **Preferred (structural)**: one function, shared by `getInitialValue` and `handleEditor`, that takes a line's text and the running
    fence state and returns the next state and the line's stored `lang`. The loader stores what it returns, and the normaliser compares
    `child.lang` against the same return value. A disagreement then cannot be written. Callers in the enumeration: `getInitialValue` (its
    output is unchanged for every form above except as the shared rule decides) and `handleEditor` (the compare and the update's `lang`).
    Whether the shared rule keeps the `else if` reset is the fixer's choice. Whichever rule is chosen, both callers apply it.
  - **Minimum**: in `handleEditor`, compare `child.lang` against the value the update writes (`isFullCodeBlock && currentLang ?
    currentLang : ''`, the loader's form), which closes (a). Then remove the `else if` reset branch or mirror it in the loader, which closes
    (b). Apply both at the two enumerated sites.
  - **Tests**: a case asserting that the per-line `lang` after a forced normalise equals the loader's, for an input pairing a quote line
    with a fence whose info string is outside `[A-Za-z0-9-]` (the fixture property: not bare and not alphanumeric). Its falsity signature
    is an assertion mismatch on the `lang` list or on the text, or Slate's "Could not completely normalize" throw surfacing as a failed
    assertion, never a runner timeout. It must be seen red under the guard mutant alone (M2's shape) at the fixed tree, so that each limb
    alone is shown to end the loop. A second case covers a `js` block holding an even-count fence line, red at `d3b98cf`. Expected values
    are literals.

### Low/Info

**CR-2 LOW Round 1 Test fidelity**: A fixture stands in for Backspace with a `setNodes` the product does not issue
- **Location**: `withNormalizeNode.quote-and-fence-lines-settle.test.tsx`, case "makes the lines after a removed multi-line quote marker plain
  lines" (`Transforms.setNodes(editor, { type: 'div' }, { at: [0] })`).
- **Class**: An edit case drives a transform of its own instead of the product's handler for the edit it names.
- **Enumeration**: `grep -n "Transforms.setNodes" ` over the two test files gives 1 hit, this one. The predicate does not see a stand-in
  written with another transform.
- **Issue**: The product's path is `onKeyDown` `normalizeBackspace`, which runs `Transforms.setNodes(editor, { ...element, type: 'div' })`
  and so keeps the stale `quotePrefix` on the div. The outcome is the same today (the differential drives the real handler: 0 text
  differences on 1,022 inputs), but the case does not exercise the path whose output it names.
- **Required Action**: drive `onKeyDown(editor, false, undefined)` with a Backspace event at the start of line 0, as the product does.
  Falsity signature: the same `['a\nb', ['div','div']]` mismatch under M8. In the fix round, not separately.

## Verdict

**Status**: REJECTED
**Rationale**: CR-1 is at the severity floor. Scope limb (1) is met only for the bare fence. One fence form keeps the loop one limb from
returning, with no assertion that sees it. The fix also introduces a language disagreement that base did not have. Limbs (2) and (3), and
the loop limb for the stated case, hold under the differential.

## Required Actions

1. CR-1: one derivation of a code line's language for the loader and the normaliser (or the Minimum at both sites), with the two cases
   above, each seen red.
2. CR-2: drive the real Backspace handler in the removed-marker case.

## Assumption Not Checked

- Round 1: This review assumes that a mounted `SlateEditor`'s first render calls `onChange` with the loader's flattened string and
  nothing else (`index.tsx` `useEffect(() => { onChange(string) }, [string])`), and does not test it. If that is false, a box opened and
  left unedited writes a string other than `flattenNodeText(getInitialValue(text))`: an observable save diff with no edit. Owner: QA
  Phase 2, by mounting the component (the fixer's "Not covered" names the same gap).

## Next Steps

- Implementer (`fixer-fix-normalize-fence-loop`): CR-1 and CR-2. The re-review is a sub-entry of Round 1, scoped to the fix diff, with
  `Reviewed-At` moving to the fixed SHA and CR-1's enumeration re-run.
- QA Phase 2, after approval: the Assumption Not Checked above.
- Not held on: the fixer's re-scope item (a quote line taken into a new code block loses `> `), carried by steering as S-29.
