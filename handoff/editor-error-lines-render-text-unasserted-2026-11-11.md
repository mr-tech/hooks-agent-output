---
UUID: 54673438
Status: Open
Status-Detail: "No suite case asserts that DiscordMessageEditor's error lines, and the render around them, carry only their reason text. Five mutants survived plan 016's effort-final sweep on that surface (QAF-13 LOW). Plan 016 carries it as a stated limit under steering's M1 cap; this handoff carries it past that plan's closure."
Owning-Stage: planner (the next website effort that edits DiscordMessageEditor/index.tsx's error lines or their tests)
Review-Trigger: "when src/components/DiscordMessageEditor/index.tsx's error lines (noContentError, embedCharacterError, v2TextError, componentCountError, the V2 send-check reason line) or their tests are next edited; or when a user reports stray characters beside an editor error line or in a preview image"
---

# Handoff — the editor's error lines: render text is not asserted

**Raised:** 2026-11-11, by `planner-hooks-016`, from QA Phase 2 on plan 016
(`qa/016-send-check-validity-qa.md`, record `2af91e5`, finding QAF-13 LOW).

## The gap

QA's effort-final mutation sweep at website `395510e` left five generated mutants alive in
`src/components/DiscordMessageEditor/index.tsx`, each a `>` → `>=` at lines 298, 347, 348 (two)
and 349 (pinned to `395510e`). Each one puts a literal "=" into the rendered tree: inside the
accessories container (298), inside plan 016's reason line (347, 348), and after the line's
`NullableComponent` (349), so the last one would show in every editor render, preview images
included. Kill table: `verification/016/qa-sweep-395510e/kill-table-395510e.json`.

No case asserts the exact text of the reason line or of the render around it. QA states that the
sibling error lines at the base tree (`0e3d903`) have the same exposure, so the gap belongs to the
shared surface, not to plan 016's line alone.

## Why it is not fixed in plan 016

Steering capped M1 at its second post-approval revision (`steering/queue-hooks-rulings.md`, block
"2026-11-11T12:59Z", record `855adb8`): a finding below HIGH becomes a stated limit with no
round. QA judges it outside the severity-floor class: no behaviour the change claims to preserve is
left unasserted. Under the owner's mirror-the-siblings rule (plan 016 D-5), the remedy belongs once
on the shared surface, covering every error line, not plan 016's line alone.

## What would discharge it

The next effort that edits these lines adds an exact-text assertion over the error-line region,
for every line the editor renders, and shows it red against these five mutants (Test Conventions,
axiom A).
