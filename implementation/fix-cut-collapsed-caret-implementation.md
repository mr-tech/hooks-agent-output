---
ID: n/a
Origin: fix-cut-collapsed-caret
UUID: 22b61dde
Status: Blocked
Status-Detail: "BLOCKED: re-scoping asked of steering-hooks-fixer — a fix that deletes only a highlighted range also stops Cut from removing a clicked emoji, which today's build does. Red test written and seen red; no source change made."
Handoff-At: 453de76 — repos=website; the branch base, no handoff made yet (held on the re-scope)
Origin-Chain: none
---

# fix-cut-collapsed-caret — implementation

## Scope statement

Route: `steering/fix-cut-collapsed-caret-rulings.md`, block "2026-11-22T18:49 — determination and stage set" (the owner's selection is
block "2026-11-22T02:09", option A). His words: "Cut with nothing highlighted does nothing, in every text box that uses this editor;
cutting highlighted text is unchanged. A test proves both."

Determination's scope statement (website, from `origin/master` `453de76`): "the cut branch of `src/components/SlateEditor/utils/onCopy.ts`
deletes only an expanded selection; a collapsed caret cuts nothing. Copy is unchanged. A test proves both (collapsed: text unchanged;
expanded: highlighted text removed)." Write set: `onCopy.ts`, one new test file beside it, this document, `verification/fix-cut-collapsed-caret/`.
Exclusions: slate-react's own `onCut`; the copy path's clipboard behaviour; the six surfaces' own code.

## Entry Conditions

| Condition | State |
|---|---|
| Scoping determination | `steering/fix-cut-collapsed-caret-rulings.md` block "2026-11-22T18:49"; brief `steering/fix-cut-collapsed-caret-brief-fixer.md` + `-brief-common.md` |
| Bounded scope statement | Quoted above, with write set and exclusions |
| Fix branch | `git -C website branch --show-current` → `chain/fix-cut-collapsed-caret` (at `453de76`, cut by steering) |
| Record on the mechanism | Sweep `verification/fix-cut-collapsed-caret/scoping/sweep.md`; research `research/codebase-bug-evaluation-2026-11-08.md` H-3 (L170). No `architecture/` entry names the cut handler (brief-common, Architecture) |

## Diagnosis

**Cause.** `onCopy.ts:34-38` (at `453de76`) runs `Transforms.delete(editor, { at: editor.selection })` on every cut, whatever the
selection's shape; with a collapsed caret in text slate deletes the next character.
Instrument: the new test's collapsed case run at the unfixed handler — "abc", caret at offset 1, cut → `Received: "ac"`
(`verification/fix-cut-collapsed-caret/red-run.txt`).

**Origin-Chain.** `git blame -L 34,38` on `onCopy.ts`: every line from `cbb038a` (2022-11-26), before the pipeline; no chain's change.

**Base compared with fix — a second input class the determination does not name.** The handler sees three selection shapes, not two:

| Selection | Today (base `453de76`) | Fix as the statement words it ("deletes only an expanded selection") |
|---|---|---|
| Highlighted range | copied and removed | unchanged |
| Caret in text | next character removed (the defect) | nothing happens |
| Clicked emoji (caret inside an emoji) | copied and removed | **copied, not removed — Cut acts as Copy** |

- Emojis are inline void elements (`utils/index.tsx` `withEmojis`, `isVoid` for `isEmojiElement`).
- Clicking one selects a collapsed range inside it: slate-react `onClick` (`node_modules/slate-react/dist/index.js:3748`, the
  `startVoid && endVoid` branch → `Transforms.select(editor, Editor.range(editor, start))`). Read from code, not run in a browser.
- slate-dom's `setFragmentData` writes a fragment for a collapsed caret when it is in a void (`slate-dom/dist/index.js:1889`), so the copy
  half runs and calls `preventDefault`. Read from code.
- The base handler then removes the emoji. Instrument: probe run at `453de76` in a detached export,
  `verification/fix-cut-collapsed-caret/emoji-cut-probe.test.tsx.txt` → `emoji-cut-probe-run.txt`: children `span, emoji, span` before,
  `[ 'span' ]` after the cut. (The probe's fragment writer is a stand-in for slate-dom's; the removal does not depend on it.)
- slate-react's own `onCut` (`slate-react/dist/index.js:3861-3876`) deletes when the range is expanded **or** the caret is in a void —
  but it is skipped whenever the project handler has called `preventDefault` (`isEventHandled`), which it has for an emoji.

So a fix worded as "expanded only" removes a behaviour the base has (cutting a clicked emoji) — this chain's regression by the
definition's rule, and a behaviour change beyond the named one. Keeping it means the statement's "deletes only an expanded selection"
is not met literally. Either way the statement needs steering's ruling: **BLOCKED**, see Handoff.

**Residue in production.** The defect removes one character from a draft in the editor; nothing outside the editor is written by the cut
itself. A draft saved after an unnoticed cut carries the missing character; the code cannot tell such a save from an intended edit, so no
residue is identifiable or repairable from the code path, and the fix (a client bundle) reaches every editor on the next page load after
release. No live-state check is owed.

## Change

Not made — held on the re-scope.

## Test

`website/src/components/SlateEditor/utils/__tests__/onCopy.cut.test.tsx` (new, uncommitted, in the write set). No existing test covers the
cut surface (determination block 18:49: no test under `src/components/SlateEditor/`).

- Calls the handler directly against a `withReact(createEditor())` editor, not a mounted `Editable` (environment-fidelity: jsdom lacks
  `isContentEditable`). `.tsx` so it runs under jsdom, whose `window.atob` the copy half decodes with.
- Collapsed case uses slate-dom's real `setFragmentData` (returns before any DOM read for a collapsed non-void caret).
- Expanded case: **invented value** — `editor.setFragmentData` is replaced by a writer that encodes `Node.fragment` the way slate-dom does,
  because the real one needs a mounted DOM range. Falsity signature: if the real writer produced a different fragment, the `copy` assertion
  (`'b'`) would differ in production while passing here; the text-removal assertion does not depend on it. `copy-to-clipboard` is mocked.

Red run (at the unfixed handler, shared tree, test file only): `npx vitest run src/components/SlateEditor/utils/__tests__/onCopy.cut.test.tsx`
→ exit 1, `× leaves the text unchanged when the caret is collapsed` (Expected "abc", Received "ac"), expanded case passed.
Capture: `verification/fix-cut-collapsed-caret/red-run.txt`.

Negative controls owed after the ruling: the expanded case (passes at red) red with the delete removed; the added guard red with it removed.

## Verification

Not run — held.

## Handoff

BLOCKED to `steering-hooks-fixer` (message id 0b611f5a, sent 2026-11-22T18:53Z), question and options as sent:

> Cutting with nothing highlighted is being fixed. Today, clicking an emoji in the editor and pressing Cut copies the emoji and removes it.
> A fix that only lets Cut remove highlighted text would make Cut on a clicked emoji just copy it. Which?
> - A. Agent: keep emoji cut working — Cut removes highlighted text or a clicked emoji, and with a plain caret does nothing (the same rule
>   the editor library itself uses). Still a few lines; no extra stage. **(Recommended)**
> - B. Agent: follow the statement as worded — Cut removes only highlighted text; on a clicked emoji it copies without removing.
> - C. Agent: stop the fix here.

Who reviews: `code-reviewer-fix-cut-collapsed-caret`. Who merges: devops to website `master` (determination's stage set).

## Changelog

| Date | Change |
|---|---|
| 2026-11-22T18:52 | Created; red test written and seen red; emoji-cut probe at base; Status Blocked on re-scope. |
| 2026-11-22T18:53 | Handoff message id recorded. The stamp gate refused this row's first, typed stamp; re-stamped from `date -u`. Disclosure: that one line was first written by an in-place `sed` on this file, against the record rule (file-editing tools or `record-edit.js` only); later edits by the Edit tool. `Handoff-At` set to the branch base so the anchor field carries a SHA. |
