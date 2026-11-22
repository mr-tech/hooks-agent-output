---
ID: n/a
Origin: fix-emoji-pretransform-widths
UUID: 27c7b0a0
Verified-At: "0411d3ba146018a5a8d3e8a45398d7d04f499d18 — repos=website; suite, typecheck and strict probe run against this tree; no verdict yet"
Status: Testing In Progress
Status-Detail: "Phase 2 stopped at the usage gate (steering, 23:47Z) before the browser walk ran; no verdict. Resumes after 2026-11-25T09:00Z from the Resumption State."
Phase: 2
---

# QA Report: fix-emoji-pretransform-widths

**Plan Reference**: none (fixer chain). Scope statement: `steering/fix-emoji-pretransform-widths-rulings.md` block "2026-11-22T22:59".
**Gate documents**: `implementation/fix-emoji-pretransform-widths-implementation.md` (`Handoff-At: 0411d3b`); `code-review/fix-emoji-pretransform-widths-code-review.md` (record `83e02c84`, Round 1 sub-entry APPROVED_WITH_COMMENTS, `Reviewed-At: 0411d3ba146018a5a8d3e8a45398d7d04f499d18`).
**Brief**: `steering/fix-emoji-pretransform-widths-brief-qa.md`, with `…-brief-common.md`.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-22T23:47 | `steering-hooks-fixer` (brief above) | Phase 2 on the reviewed tip `0411d3b` | Phase 2, partial. Stage start: the review's committed sub-entry at `Reviewed-At: 0411d3b` (record `83e02c84`). Suite 2643/2643, exit 0; typecheck exit 0; a strict-oracle probe finds 0 failures at the tip and 0 rows worse than base. The browser walk (the reviewer's open assumption) has not run: the preview page does not mount the editor, a QA harness page took three fixes, and the usage gate stopped the pass before the walk ran. No verdict. |

## Scope

No Phase 1 (fixer chain, rulings block "2026-11-22T22:59"; brief: "Duties negated"). This is the Phase 2 record. No UAT follows. An item that would go to UAT goes to `steering-hooks-fixer` as a block.

**Criteria this pass assesses** (recorded before execution):
- C1 `withNormalizeNode.ts` `handleElement`: a pasted or typed line with an emoji keeps every character. This includes a fenced code line and an escape before an emoji.
- C2 `getInitialValue.ts`: a stored message loads with its text unchanged, an escaped emoji included.
- C3 `decorator.tsx`: formatting after an emoji colours at its true position. No range falls out of bounds or splits a surrogate where base's does not.
- C4 (brief's acceptance property): no character of the user's text is lost or rewritten on paste, typing or load where an emoji is involved, and no input does worse than at base. The exclusion holds: an emoji element is stored as `:name:`.
- C5 (brief): a real paste in a browser of `x🙂 abcdefghijklmnopq`, and a straddle line `wow :ok🙂 hi` that keeps 🙂 as a plain character.
- C6 (brief): a custom Discord emoji inserted by the picker into a code line.

**Class per example.** C1 and C2 name examples (`x🙂 abc…`, `\🙂 **a**`, `:ok🙂`). The class they exemplify: any line where an emoji's rename changes widths, so that a parse node's span maps back wrongly. That covers emoji before text, escape before emoji, a name token running into or out of a renamed emoji, custom emoji, multi-line messages with a fence, and insertion at any cursor position. The suite enumerates the examples only. The strict probe below enumerates the class over a generated corpus.

## Implementation Review

`git diff --numstat febf20e 0411d3b`, production paths: `common.ts` 7/0, `decorator.tsx` 9/5, `getInitialValue.ts` 15/6, `withNormalizeNode.ts` 16/7, `emoji.tsx` 31/0, `utils.ts` 5/3. That is 83 added lines, matching the fixer's and the reviewer's figure. Tests: decorator 21/0, initial value 39/0, normalizer 66/0.

**TDD compliance** (fixer chain: the evidence is the fixer document's Test section, and no table is owed). Present:
- Round-1 red at `febf20e`: 19 assertion failures, plus the non-settling normalizer case.
- Round-2 red at `c2fee5c`: 6 failures, all assertion mismatches.
- 11 + 17 hand-written controls.

Re-derived from the round-2 capture rather than re-run: `round-2/controls/mutation-table-0411d3ba…-20261122T232828Z-p450104.json` scores "17 of 17 mutants killed". That is 17 mutants named in `round-2/mutants.json` (blob `317dac1b…`) at `0411d3b`, with stillborn, not-applied and aborted at 0. A whole-diff generated sweep is not owed: Phase 1 supplied no fixture text, and no Irreversible Side-Effect Register entry exists. The load path's write-back is an `onChange` into form state, not a save.

**Test audit** (the three files on the touched surface):
- `withNormalizeNode.emoji-keeps-line-text.test.tsx`, `getInitialValue.stored-text-loads-unchanged.test.ts`, and the new `describe` in `decorator.emphasis-syntax-ranges.test.ts`.
- All three are spec-form, drive the real `markdown.interactive` parsers, and use literal expectations (axiom E holds). Basenames are in positive form, and no ID token appears in the titles read.
- The only stub is `vi.mock('~/env.mjs')`, the suite's existing pattern. It invents no store, wire or framework return.
- What the suite does not reach: insertion at a cursor in the middle of a line, char-by-char typing, custom emoji, and multi-line loads. The strict probe covers all four with 0 failures at the tip. No change-claimed behaviour lacks an assertion: the offset map does not depend on cursor position. Recorded as residue, not a finding.

## Test Execution Results

All runs below were in `git archive` exports under the session scratchpad (`exp-0411d3b`, `exp-febf20e`), with `node_modules` symlinked and `next-env.d.ts` copied in. Captures are in `verification/fix-emoji-pretransform-widths/qa/`.

| Check | Result | Capture |
|---|---|---|
| Suite, `npx vitest run --reporter=json` (MemoryMax=8G) | exit 0; `numTotalTests` 2643, passed 2643, failed 0; 170 `testResults` entries. New files: normalizer 6/6, initial value 9/9, decorator 262/262 | `suite-0411d3b.{json,txt,exit}` |
| `pnpm run typecheck` (both programs) | exit 0 | `typecheck-0411d3b.{txt,exit}` |

**Strict probe** (`strict-probe.qa.test.tsx.txt`, sha256 in `strict-probe.sha256`; comparison `strict-compare.py` → `strict-compare.txt`). This is a differently shaped instrument from the reviewer's `canon` oracle. It accepts only exact preservation:
- A text child must equal the input at its position.
- An emoji element may stand for its own source literal, or for a run whose rename equals that source (the exclusion).
- A rename of user text fails it, where `canon` passes it.

The corpus is 15 fixed lines, 1,200 seeded lines over 35 tokens, 200 two-line messages with a ```` ```js ```` fence, and 20 picker-path inserts. The tokens include `<:x:123>`, `<a:dance:9>`, the literal `:slight_smile:`, both straddle directions, `` ` ``, `||` and `**`. The picker-path inserts use `editor.insertText` at a mid-line cursor, the call `SlateEditor/index.tsx` `setOnInsert` makes, of 🙂, 👍🏻, `<:pepe:…>` and `<a:dance:9>`, into a code line, a code line after an emoji, a plain line, after `:ok`, and before `ok:`.

| Population (rows) | Fail at base `febf20e` | Fail at tip `0411d3b` | Pass at base, fail at tip |
|---|---|---|---|
| load, `getInitialValue` (1,415) | 306 | 0 | 0 |
| paste, one `insertText` (1,215) | 500 | 0 | 0 |
| typed, one insert per grapheme, cursor following (1,215) | 500 | 0 | 0 |
| picker insert mid-line (20) | 12 | 0 | 0 |
| lone surrogate left in a text child: paste / typed | 74 / 77 | 0 / 0 | — |
| decorator range out of bounds / splitting a surrogate pair (1,215) | 25 / 0 | 5 / 0 | 0 newly |

Positive control: the oracle fires on base's known defects on the same run. Base fails `x🙂 abcdefghijklmnopq` as `text "lmnopq" at 3`, `\🙂 **a**` as `:slight_smile: **a**`, and `wow :ok🙂 hi` as a `:ok:` element with no source. The probe exit was 0 at the tip. At base it exited 1 under `systemd-run` with the case passed and all 1,435 rows written; a re-run without the scope wrapper exited 0. The tip's 5 out-of-bounds decorator rows are CR-3's class (pre-existing, carried by steering).

**C6, custom emoji in a code line**: `<:pepe:123456789012345678>` and `<a:dance:9>` inserted mid-line in a code line stay as text with every character kept. This is also true after an earlier 🙂 element on the same line, where base loses `a<:pepe:1234` or `a<a`. A custom emoji is not turned into an element by the editor at base or at the tip, so that is unchanged behaviour.

**Observation (INFO, outside the write set, for steering)**: the static (unfocused) render of `wow :ok🙂 hi` reads `wow` + 🆗 image + `slight_smile: hi`. The static parser's rename manufactures `:ok:` there too. Display only, the same at base, and the stored text is unchanged. Evidence: the walk helper's first-run reading on `/preview` (since overwritten) and this session's page read at 23:40Z. It rides with the `_`-pairing and CR-3 items steering carries.

## Browser walk (C5): NOT DONE

- The `/preview` page passes no `editableState`, so the editor never mounts (`DiscordContentEditor/index.tsx`, `showEdit` false).
- A QA harness page, `qa-editor-page.tsx.txt`, was copied into the tip export only as `src/app/qa-editor/page.tsx`. It is preview plus `useEditableState`, the real tRPC/session(null)/IsMobile/Guild providers, and a `setMessage` that records to `window.__qaMessage`.
- Dev server: `next dev --webpack -p 3417` in the export with dummy env on the command line and no `.env.local`. Turbopack refused the symlinked `node_modules` (`dev-server-0411d3b-turbopack.txt`). Nothing was saved anywhere.
- After the third harness fix, the editor opened by focus + Enter (checked at 23:45Z). The walk helper was then stopped at the usage gate before reporting.
- `walk/step1.json` is from the failed second run. `walk/step2.png` and `walk/step3.png` are from the interrupted third run and are not evidence; they are not committed.
- Set up and removed: the dev server (pids 572310/572460/572461/572479, stopped at 23:47Z, port 3417 closed). The browser was closed by the helper, with holder check `no holder` and caches emptied on its earlier exits.

## Assumption Not Checked

This pass assumes that a real browser paste and keyboard input reach `handleElement` the way `Transforms.insertText` / `editor.insertText` do in jsdom, and it has not yet tested that. Falsity signature: in the harness editor, pasting `x🙂 abcdefghijklmnopq` or typing `wow :ok🙂 hi` loses or duplicates characters, or `window.__qaMessage.content` differs from the input beyond the `:name:` exclusion. Owner: this stage, at its resumed pass (the walk is the next step). IME composition on a mobile keyboard is outside what this box can drive; its owner is `steering-hooks-fixer` to route.

## Resumption State

- **Next step**: re-run the browser walk.
  - Restart the dev server in a fresh export of `0411d3b`: `git archive`, symlink `node_modules`, copy `next-env.d.ts`, and copy `qa-editor-page.tsx.txt` to `src/app/qa-editor/page.tsx`. Then run `npx next dev --webpack -p 3417` with the dummy env list (DATABASE_URL `postgresql://u:p@127.0.0.1:1/d`, every other server key `d`, `NEXT_PUBLIC_PUSHER_KEY=dummy`, `NEXT_PUBLIC_PUSHER_CLUSTER=mt1`, `NEXT_PUBLIC_DISCORD_CLIENT_ID=0`, `NEXTAUTH_URL=http://localhost:3417`, `NEXTAUTH_SECRET=dummy`).
  - Hand the 5 steps to a fresh `browser-walker`. The step text is in this session's brief to it, restated here: (1) load `wow :ok🙂 hi\n\🙂 **a**`, expect both lines kept, with no element on line 1 and the backslash kept; (2) paste `x🙂 abcdefghijklmnopq` over `a`, expect `x`, one slight_smile element, then all 17 letters; (3) paste `wow :ok🙂 hi`, expect it exactly with 🙂 plain; (4) type `wow :ok`, `🙂`, ` hi` by keyboard, expect the same as step 3; (5) in a `js` fence, paste ` // 🙂 abcdefghijklmnopq` at the end of `x = 1;`, expect every letter kept.
  - Open the editor with focus + Enter on the content button. Read `window.__qaMessage?.content` per step.
- **Then**: verdict. With the walk green: QA Complete, `Verified-At` as above, verdict to `steering-hooks-fixer` (spawn cue for devops). With it red: a QAF finding to `fixer-fix-emoji-pretransform-widths`, copied to steering. If the walk cannot run: a post-deploy row for devops per the brief.
- **Carried forward**: the suite and probe results above are at `0411d3b`. They need no re-run unless the tip moves (`git -C website rev-parse chain/fix-emoji-pretransform-widths`).
- Scratch exports `exp-0411d3b` and `exp-febf20e` stay under this session's scratchpad until the walk; a reboot may clear them, and they are rebuilt as above.
- Tree: website branch `chain/fix-emoji-pretransform-widths`, HEAD `0411d3b` at the checkpoint. Nothing in the shared tree was mutated. Uncommitted and deliberately left out: `walk/step1.png`, `walk/step2.png`, `walk/step3.png` (screenshots). Questions sent: none. Walk helper stopped (TaskStop); dev server stopped.
- Disclosure: a `pkill -f "next dev -p 3417"` also matched its own shell and killed that command (exit 144). The server was gone, and a webpack server was started fresh. Later stops used pids.
