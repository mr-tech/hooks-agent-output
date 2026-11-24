---
ID: 019
Origin: 019
UUID: 286c730a
Verified-At: "119471f — repos=website; M6 at the code review's Round 6 Reviewed-At. Gate read only: no M6 suite has run for this verdict"
Status: QA Failed
Status-Detail: >-
  Rejected at the TDD compliance gate (Phase 2 step 2). Five new or changed production functions in M6 have a "No" under "Test
  Written First?" and no stub-tree red and green: pointAtOffset, flatOffset, startsOf, holdsSpan and emojiToImage's emoji case.
  parseUnit has a "No" too; for it, the both-trees evidence code review recorded will do in place of a stub. No M6 criterion is
  assessed yet. Blocks on implementer-019's stub-tree records.
Phase: 2
---

# QA Report: 019 — M6, the Slate layer: round trip and input (Phase 2)

**Plan Reference**: `agent-output/planning/019-slate-formatting-discord-engine.md`, Revision 15 (record `79eeced6`), registrations
to R-78, milestone M6.
**Code review**: `code-review/019-slate-formatting-discord-engine-code-review.md`, § "Round 6 at `119471f` (M6)",
APPROVED_WITH_COMMENTS at `Reviewed-At: 119471f` (record `8c2a4593`).
**Implementation**: `implementation/019-slate-formatting-discord-engine-m6-implementation.md` (`Handoff-At: 119471f`).
**Blocking-condition register**: the chain's one register, in `qa/019-slate-formatting-discord-engine-qa.md`. This pass appends no
row.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-24T06:58 | code-reviewer-019 (message: M6 APPROVED_WITH_COMMENTS at `119471f`, record `8c2a4593`) | QA Phase 2 on M6 | Phase 2, step 2: the TDD compliance gate **rejected** M6. Five new or changed production functions have a "No" under test-first and no stub-tree red and green. `parseUnit` also has a "No". No M6 suite was run for this verdict. Steering's M6 Phase 2 brief had not arrived, so this pass read the plan's D-20 to D-22, R-77 and R-78 and the code review's Round 6 itself. The export of `119471f` is installed (frozen, offline, exit 0) and kept for the pass. |

## Scope and stage start

- **Stage start.** The code review's committed Round 6 verdict, APPROVED_WITH_COMMENTS at `Reviewed-At: 119471f` (record
  `8c2a4593`), re-derived from the record.
- **Rulings.** The cap on M4 to M6 (effort rulings block 2026-11-24T00:49Z): a gap below HIGH is a stated limit with no fix
  round, and a severity floor is excepted. The cap governs findings. It does not govern this gate.
- **Tree.** Website `119471f`, exported with `git archive` into this session's scratchpad (677 tracked paths). It has its own
  `pnpm install --frozen-lockfile --offline` (exit 0, `verification/019/qa/m6/install-119471f.*`) and Next's `next-env.d.ts`
  copied in. The shared tree was not switched or written.

## TDD compliance gate

**Rejected: TDD Compliance Checklist Missing or Incomplete.** The rule (implementer.md, TDD Compliance Checklist): a "No" under
"Test Written First?" is closed by an assertion-level red against a stub-tree copy whose function holds no body, then a green at
the real code, with both recorded. This is the standard M4's gate was re-opened on (M4 document, § TDD compliance gate).

To find out which functions are new in M6, I ran `git -C website grep -q <name> 2e36107 -- src` and read the exit code: 1 means the
name is absent at M5's tip. These rows are closed:
- `resolveEmoji` and `revertToText` (stub-tree, 17 of 21 and 7 of 21 failing, green 21 of 21).
- The guard-branch rows ("No: survivors") for `emojiLayout`, `liftLoaded`, `styleUnit`, `resolveCarried` and `carriesMarker`.
  Each of these functions has its own test-first row, and each later test is red under its own mutant.
- `nativeEmojiSpans`, a test helper rather than production code.

These remain open:

| Function (website `119471f`) | New at M6? | Row | What is missing |
|---|---|---|---|
| `pointAtOffset` (`withNormalizeNode.ts`) | yes (exit 1 at `2e36107`) | `resolveEmoji, revertToText, pointAtOffset, flatOffset, startsOf`: No | No stub of its own. The row says these "run inside `revertToText` and `resolveEmoji`". Stubbing a caller does not show the callee's tests fail without the callee |
| `flatOffset` (`withNormalizeNode.ts`) | yes | same row | same |
| `startsOf` (`withNormalizeNode.ts`), with `widthOf` and `sourceWidthOf` (`emojiLift.ts`) that it reads | yes | same row | same |
| `holdsSpan` (`emojiLift.ts`, exported) | yes | `liftLoaded over several runs, holdsSpan, …`: No | This is its only row. A mutant red (`\|\|` at `:92`) is recorded, but no stub-tree red |
| `emojiToImage`, the `emoji` case of `renderElementFactory` | changed: it now reads `alt`, `title`, `src` and `custom` from the new element, not `ast` | its row: No | Five mutant reds are recorded, but no stub-tree red |
| `parseUnit` (`unitParse.ts`) | the name is new; the code moved from `styleUnit` | `… parseUnit's parity`: No | Either a stub-tree red and green, or the row cites the both-trees evidence for a behaviour-preserving extraction (implementer.md, exemptions). Code review's measurement, 0 of 36,690 nodes differing over 2,659 inputs with a planted control of 24, would serve if the row cites it |

Each stub-tree record is a red at assertion level, then a green, recorded in the TDD Compliance row. Each runs in an isolated export,
as `1aaa960`'s were. The remedy is the implementer's; a waiver is the owner's to give. Records with no change to production are
not a fix round: the gate re-opens on them, and the pass runs at `119471f`.

## Owed at the re-opened pass

Carried from the M5 document's Resumption State, unchanged:
- the whole offline suite (JSON and exit code), typecheck, the live run, `pnpm test:discord` offline and `next build`;
- m5-d2 in its M6 form at `runUnit.ts`;
- NM-68 and NM-69 on QAF-42's fixture forms (R-69);
- SL-17 and AC-6.5's control members;
- R-74's three ids;
- Outstanding 4's fence-parity narrowing;
- W8, W9 and W12;
- CR-7's exit check;
- an M4 and M5 differential;
- the Irreversible Side-Effect Register's bounded sweep over the `flattenNodeText` and save-path guards M6 changed.

Code review's CR-20 cost figures are measured again at the extreme the plan records, before they reach a decision.

## Verdict

**QA Failed**, milestone-scoped, for M6 at website `119471f`, at the TDD compliance gate. No criterion has been assessed. The plan's
Status is not moved. Rows inherited and not discharged: B-1 to B-9.

## Assumption Not Checked

This pass assumes the implementer's test-first rows marked "Yes" are true as written. It checked their captures only by name, and
did not re-run any of them. Falsity signature: a "Yes" row whose `m6-red-N.txt` shows a pass, or a failure at compile level beyond
its file's first row. **Owner: QA**, at the re-opened pass, which reads each cited red capture.

## Handoff

- To `implementer-019`: stub-tree red and green records for the five functions above, plus `parseUnit`'s record or citation, in
  the M6 implementation document's TDD Compliance table.
- Then QA re-opens the gate and runs the pass at `119471f`, provided no production path moves.
