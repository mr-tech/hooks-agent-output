---
UUID: 5b19c3e4
Status: Open
Status-Detail: "Two unverified paths of the emoji fix: a guild (custom) emoji chosen from the picker, and mobile keyboard composition (IME). Neither can be driven from the pipeline's box. Open until a signed-in guild session or a phone walk reads them."
Owning-Stage: steering (steering-hooks-fixer routes; the read is a signed-in walk or the owner's phone)
Review-Trigger: When the website message editor's emoji insert path (the picker's insert handler or SlateEditor setOnInsert) is next edited, or when a signed-in guild session walk of the editor is next run.
---

# Handoff — emoji fix paths not driven: guild emoji picker and mobile IME

## What is seeded

Two paths that chain `fix-emoji-pretransform-widths` (website `0411d3b`) did not and could not verify. Both are QA's "Assumption Not Checked"
(`qa/fix-emoji-pretransform-widths-qa.md`, now `qa/closed/`), named to steering by devops's Stage 1 hand-off as the brief asked.

1. **Guild emoji from the picker.** Picking a custom guild emoji from the picker into a code line, in a signed-in editor. QA drove the
   same insert call (`editor.insertText`, as `SlateEditor/index.tsx` `setOnInsert` makes it) with `<:pepe:123456789012345678>` and
   `<a:dance:9>`: every character kept. The picker's own click handler was not driven, and the guild emoji list needs a signed-in
   guild session.
   - Falsity signature: picking 🙂 or a guild emoji from the picker into a code line loses characters after the cursor, or inserts
     something other than the emoji's text.
2. **Mobile keyboard composition (IME).** Composition events on a phone keyboard. Not drivable on this box.
   - Falsity signature: text typed or composed after an emoji on a phone loses or duplicates characters.

The standard-emoji limb of item 1 rides the post-deploy walk (`handoff/fix-emoji-pretransform-widths-post-deploy-2026-11-23.md`, item 2)
where the picker is reachable signed out.

## Evidence

QA Phase 2 section "Assumption Not Checked" and C6 result (`qa/closed/fix-emoji-pretransform-widths-qa.md`); code review's
Assumption Not Checked (discharged for jsdom paste by QA's browser walk, 5/5 at `0411d3b`).

## Origin

QA Phase 2, `Verified-At` `0411d3b`; raised as a handoff by devops Stage 1, step 8.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-23T08:26 | `devops-fix-emoji-pretransform-widths` | Created at Stage 1; delivered to `steering-hooks-fixer` in the Stage 1 hand-off message. |
