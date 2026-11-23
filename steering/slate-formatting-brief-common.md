# Slate formatting effort — common brief (every stage reads this whole)

Written by `steering-hooks-fixer` at 2026-11-23T15:23Z. Rewritten at each re-scope or change of the stage set. Each stage's own brief
opens with its `Duties negated:` line, names this file next, and adds only what is that stage's.

## Rulings (by pointer; read them in the file)

Effort rulings file: `/usr/local/bin/hooks/agent-output/steering/fixer-queue-2026-11-21-rulings.md`. Blocks, in order:
- 09:07Z: his words opening the effort (every Slate fix grouped into one effort, with a fuzzer or intensive check).
- 09:10Z: hyperlinks are in. 09:11Z: the standard is Discord's own formatting behaviour, and he expects many bugs.
- 09:13Z, 09:15Z: oracle sources. 09:17Z: Discord's served bundle may run as a test oracle, fetched at test time, never committed or
  shipped.
- **09:18Z: the scoping determination.** It holds the stage set, the scope statement, the region and the exclusions he sees.
- 13:09Z: where Discord's two formatters disagree, the site is held to Discord only where both agree, and the rest are listed as known
  differences.
- 15:23Z: the site uses Discord's published formatter (`@discord/markdown-wasm`, MIT) for the preview and the editor's colouring.

## Stage set (quoted from block 09:18Z)

"The planner starts on its committed document and the inventory, and mints the ID. Then come critic, architect conformance, QA Phase 1,
implementer, code-reviewer, QA Phase 2, UAT (user-visible editor surfaces) and devops; then the retrospective. Security is not in the
set: the website ships to Vercel, and nothing root executes."

## Scope statement (quoted from block 09:18Z)

"(website, the region in the inventory's region table: `src/components/SlateEditor/**`, `src/utils/markdown/**`,
`src/components/Markdown*.tsx`, and the editor surfaces that mount them). The editor (typing, paste, load, save, colouring) and the
preview render every input the way Discord does and lose no character. A fuzzer or intensive check, with a Discord-derived oracle,
enumerates the class and stays in the suite. In: S-01..S-06, S-08..S-10, S-13, S-14, S-17, S-18, LF-1..LF-6, and every defect the fuzzer
finds in the region. S-07 (emoji stored as `:name:`) is in, as a question for him through the plan."
Later members inside the region, in scope on this thread's ruling: S-29 (inventory row; its trigger widened by QAF-4 in
`qa/closed/fix-normalize-fence-loop-qa.md`). A member outside the region is a re-scope and comes back to steering.

## Inputs

- Inventory (the scope sweep): `verification/slate-formatting-effort/scoping/inventory.md`.
- Research: `research/slate-formatting-discord-oracle-2026-11-23.md` (record `17a7586` or later).
- Architecture findings: `architecture/slate-formatting-preview-architecture-findings.md` (record `86418be`).

## Architecture citations

- `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md` (evergreen record; D-001 and its Problem Areas, including the
  "hand-kept copy of Discord's rules" entry the architect lodged).
- `/usr/local/bin/hooks/agent-output/architecture/website.md`, W-3 "One component tree serves both editing and preview" (a confirmed
  inference he ratified: "Agent's inference is correct"), and W-4 (preview images are made by screenshotting the app's own `/preview`
  route). The architect reads W-3 as forbidding the preview to move to the new formatter without the editor.
- `/usr/local/bin/hooks/agent-output/architecture/preview-image-generator.md` (the screenshot service; read-only for this effort).

## Hazards (each a candidate to re-derive)

1. Every run that asserts against Discord needs both formatters, because the standard is where both agree (research section 4). The old
   one is fetched at test time, so a run that cannot fetch it has no expected values.
2. Discord's text box formats differently from its rendered message (research V-21, V-22). The editor and the preview need separate
   expected values.
3. The wasm must build and initialise under the site's `next build` and Vercel. Nobody has read this yet (architect AF-3).
4. What the preview-image generator waits for before it captures `/preview` was not read: the action was not completed. An async wasm
   start could make a capture miss the formatted text. Any change needed in `preview-image-generator` is outside the region and is a
   re-scope.
5. The package is 0.x, with six releases from 2026-10-13 to 2026-11-16. Pin it exactly, and treat its output shape as changeable.
6. Local builds of the website: before any save, move the message ids out of production's range (workspace `CLAUDE.md`, "Local builds of
   `website`").

## Not checked by this brief

The full list of standing prohibitions in `system-architecture.md` and `website.md` beyond W-3 and W-4; whether the 9d, 5b19c3e4,
nested-styles and instrument-lift items named in block 09:07Z map one-to-one onto the inventory's S-rows.

## Standing rules

- A call stopped by a control: stop and message `steering-hooks-fixer`; never re-issue it in any form, except as his selection of
  2026-11-23T15:29Z allows for website reads: shell in the record folder, exact website paths only, nothing pointing into
  `preview-image-generator`, the re-run disclosed. The record says only "not completed", with no reason.
- Record documents: Write, Edit or `record-edit.js` only. Stamps come from `date -u` in the same turn.
- Never use the bare word `none` in a command.
- The website tree is held by other chains (`chain/fix-normalize-fence-loop`, then 9e). Don't switch it. Read other SHAs from a
  `git archive` export.
