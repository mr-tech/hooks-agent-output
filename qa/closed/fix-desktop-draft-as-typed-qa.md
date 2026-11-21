---
ID: n/a
Origin: fix-desktop-draft-as-typed
UUID: fa2fab0b
Verified-At: b68f94c — repos=website; walked on a `git archive b68f94c` export (tree 25ab048b), base `b663b35` (tree 774b75be) beside it
Status: Committed
Status-Detail: "Pre-release browser walk PASS at website b68f94c: flows 1-4 hold in Chrome at route 0; base b663b35 loses the same text. No findings. Committed at Stage 1 by devops; not released. Its Assumption Not Checked (the saved-message route) is row P-1 of handoff/fix-desktop-draft-as-typed-post-deploy-2026-11-21.md, run by a qa-role session after the push, not left to the owner's walk."
Phase: 2
---

# QA Report: fix-desktop-draft-as-typed

**Plan Reference**: none (fixer route). Scope and stage set: `steering/fix-desktop-draft-as-typed-rulings.md`, blocks
"2026-11-21T10:43Z" (determination) and "2026-11-21T11:14Z" (his selection A: an agent walks flows 1-4 before the release).
**Implementation Reference**: `implementation/fix-desktop-draft-as-typed-implementation.md`, § User-visible flows (rev 2, CR-1 corrected).
**Code review**: `code-review/fix-desktop-draft-as-typed-code-review.md` (record `488b209`), `APPROVED_WITH_COMMENTS`, `Reviewed-At: b68f94c`.
**Brief**: `steering/fix-desktop-draft-as-typed-brief-qa.md` (with `…-brief-common.md`).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T11:25 | steering-hooks (brief above; stage start = the review's committed approval at `Reviewed-At b68f94c`, re-derived: `git -C website log -1` = `b68f94c`, tree clean but `.playwright-mcp/` untracked) | Phase 2, narrowed by the brief to one pre-release browser walk of User-visible flows 1-4, typing and reload only | Walk PASS at `b68f94c`: typed text in the content editor, an embed description, a field name, the author name and the footer comes back after a reload with the editor still open. The caret stays at the end on every key of "a b c" and "x y z", and blur trims. Base `b663b35` loses every one of them. Leave prompt observed with a two-direction control. Flow 5's current text is consistent with the code. No findings. |
| 2026-11-21T11:28 | devops-fix-desktop-draft-as-typed (brief steering/fix-desktop-draft-as-typed-brief-devops.md) | Stage 1 closure | Status Committed, moved to qa/closed/; no body change. This document's Assumption Not Checked named the owner's own walk as its owner; steering's brief moved it to an agent-run post-deploy row: P-1 of handoff/fix-desktop-draft-as-typed-post-deploy-2026-11-21.md (UUID 4bbe68a5, Owning-Stage qa, Review-Trigger the E-WEBSITE-PUSH row). Residue (Chrome only; per-keystroke cost unmeasured) is carried by handoff/fix-desktop-draft-as-typed-residue-2026-11-21.md. Register: this document carries no blocking-condition register, so no pre-release row is unterminated. |

## Route and what this pass is

A `fixer` task with no Phase 1 or UAT, by the owner's scoping determination. QA was added by his selection A at 11:14Z, as one
pre-release walk. **Duties negated by the brief**: Phase 1, and the Phase 2 test audit. The code review ran the suite, the red
tests and the controls at `b68f94c`, and this pass does not repeat them. So no TDD table check, suite run or mutation sweep was
done here, and none is claimed. This pass discharges the review's Assumption Not Checked: Slate emits `onChange` per keystroke
in a real desktop browser, and the author and footer `ContentEditable` keep the caret under the per-keystroke round trip.

Read before acting: both briefs whole; the rulings block 11:14Z; the review's Verdict, Required Actions, Assumption Not Checked and
Next Steps; the implementation document's User-visible flows and Outstanding items; `stage-procedures/agent-browser.md`; the
production diff `b663b35..b68f94c` (3 files, +17/-6, from `git diff --stat`); `MessageProvider` `hasChanged` and the draft effect;
`useUnloadAlert`; `SlateEditor` mount `onChange`. **Not read**: `architecture/system-architecture.md`. I read
`architecture/website.md` L300-318 only (the draft store).

## Walk set-up

- **Builds**: `verification/fix-desktop-draft-as-typed/qa/serve.sh` runs a `git archive <sha>` export with `node_modules`
  copied and `next dev` on 127.0.0.1. Every variable is a dummy, and no `.env.local` was copied or read: no database, Pusher app
  or Discord credential reached either server. FIX `b68f94c` ran on :3100 and BASE `b663b35` on :3101 (`fix/meta.txt` and
  `base/meta.txt` hold the commit and tree; `dev.log` is beside them). Both were stopped and their exports deleted after the walk.
- **No database and no save.** The walk used route 0 (a new message, `/message/m/0/edit`), whose draft lives in
  `localStorage`. No local database was created, so the "before the first save" sequence move had nothing to apply to, and **no
  message id range was written**. No Save, Send or Log-in control was pressed.
- **Browser**: Chrome on the kept profile, through the Playwright MCP, with the viewport at 1440x900. The walk itself went to
  the `browser-walker` helper (its table is below). The two cells it left open I closed with my own look, after it had closed
  its browser. Input was trusted keyboard input (`page.keyboard.press`), one key at a time. Screenshots are untracked, in the
  session scratchpad.
- **Disclosure, this round**: the Playwright MCP's `browser_run_code_unsafe` refused `filename` for a probe file under
  `agent-output/verification/`, because the path was outside its allowed roots. I ran the same code by the tool's inline `code`
  parameter instead. The probe file records exactly what ran.

## Per-flow execution

Evidence paths are relative to `verification/fix-desktop-draft-as-typed/qa/`. `walk/` holds the helper's files, and
`leave-prompt-and-field-results.md` holds my look.

| Flow | Surface | Action (FIX and BASE alike) | FIX `b68f94c` observed | BASE `b663b35` observed | Result | Evidence |
|---|---|---|---|---|---|---|
| 1 | Message content (Slate) | open, Control+End, type " QA one", reload with the editor open | draft holds `… QA one` while typing; after reload content ends `help you!\n  QA one` | draft `null` while typing; after reload ends `help you!\n ` (lost) | **PASS** | `walk/fix-S2-*`, `walk/base-S2-*` |
| 1 | Leave-page prompt on reload mid-typing | type in field name, reload with the editor open | `beforeunload` dialog raised | no dialog; **control**: base after click-away raises it | **PASS** | `leave-prompt-and-field-results.md` runs A-C |
| 2 | Embed description | type " QA two", reload | after reload description ends `QA two` | lost (`…Hooks.gg.\n\n`) | **PASS** | `walk/fix-S3-*`, `walk/base-S3-*` |
| 2 | Embed field name | type " QA three", reload | rendered field `Familiar Tools QA three` after a fresh load; draft holds it | rendered `Familiar Tools` (lost) | **PASS** | `leave-prompt-and-field-results.md` runs A, B; `walk/fix-S4-after-reload.json` (draft) |
| 3 | Author name: typing, caret | keys a, Space, b, Space, c | text after each key `a`,`a `,`a b`,`a b `,`a b c` (char codes 32 for spaces), `focusOffset` 1-5, focused throughout; draft `author.name` `a b c` | same text and caret (local state only); draft `author` absent | **PASS** | `walk/fix-S5-caret.json`, `walk/fix-S5-store.json` |
| 3 | Author name: reload | reload with the field focused | `a b c` | empty (lost) | **PASS** | `walk/fix-S5-after-reload.json`, `walk/base-S5-after-reload.json` |
| 3 | Author name: trim on blur | End, two spaces, click away | element and draft `a b c` | (n/a: empty name) | **PASS** | `walk/fix-S6.json` |
| 4 | Footer: typing, caret | keys x, Space, y, Space, z | `x`…`x y z`, `focusOffset` 1-5, focused; draft footer `x y z` | same text and caret; draft footer empty | **PASS** | `walk/fix-S7-caret.json`, `walk/fix-S7-store.json` |
| 4 | Footer: reload | reload with the field focused | `x y z` | empty (lost) | **PASS** | `walk/fix-S7-after-reload.json`, `walk/base-S7-after-reload.json` |
| 4 | Footer: trim on blur | End, two spaces, click away | element and draft `x y z` | (n/a) | **PASS** | `walk/fix-S8.json` |

I read the evidence files for flows 1, 3 and 4 against the helper's table, and they agree: `grep -c "QA one"` gives 1 in
`fix-S2-after-reload.json` and 0 in `base-S2-after-reload.json`. Two of the helper's cells were superseded:
- **Its S4 rendered read.** Its selector found no element, so it recorded NOT RUN. My run A read the field.
- **Its "no leave dialog" cells.** On its first FIX pass it registered an auto-accept dialog handler on the page, and that
  handler may still have been attached when it re-ran. My run A observed the dialog with no handler registered, and runs B and
  C are the control.

Console errors were 2 React hydration-mismatch messages on `/message`, on both builds (`walk/console-errors.txt`). Neither
concerns the editor or storage.

**Flow 5 (text check, as the brief asks).** I read the current text, rev 2. It matches the code. `hasChanged` is
`!typedDeepEqual(savedMessage?.data, message?.data)` (`src/providers/MessageProvider/index.tsx`, `hasChanged`), so opening a
field that has text changes nothing and raises no prompt. The walk observed one consequence the flow does not mention. At route
0, opening the content editor without typing writes a draft holding the same text on FIX (`walk/fix-S1-store-editor.json`), and
writes none on BASE (`walk/base-S1-store-editor.json`). The route-0 branch of the draft effect writes on every new `message`
object, whether or not the data is equal. This is harmless: the text is identical, no prompt is raised, and closing the editor
did the same at base. The flow's wording "leaves the message unchanged" stays true. **No finding.** The empty-field half of
flow 5 was not walked; the brief asks only for a text check.

## Findings

None.

## Residue (not blocking; outside the criteria this walk was briefed to settle)

- The walk was Chrome only. Caret behaviour in Firefox or Safari `contenteditable` was not observed.
- Per-keystroke draft-write cost (hazard 1, the fixer's outstanding item 3) was not measured. The walk saw no lag on a short
  message, which is not a measurement.

## Assumption Not Checked

This pass assumes that the saved-message route (`/message/m/<id>/edit`) behaves as route 0 did. The fixer's diff is shared,
but the draft effect there goes through `writeDraft` / `removeDraft` by deep equality, and I did not walk it: it needs a
database and a signed-in session. Falsity signature: on an existing saved message, on desktop, text typed and reloaded before
clicking away does not come back, or the leave prompt does not fire. Owner: the owner's own walk of User-visible flows 1-4,
which devops quotes to him with the website `master` release (devops's to establish what the push deploys).

## Handoff

PASS, `Verified-At: b68f94c`, to `steering-hooks`, which starts devops. Next stage: devops for website `master`, on the owner's
word.
