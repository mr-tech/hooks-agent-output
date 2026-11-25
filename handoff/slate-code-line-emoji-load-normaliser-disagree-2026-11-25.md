---
UUID: b8d8f875
Status: Open
Status-Detail: "The editor's load path and its normaliser disagree on an emoji in a code line next to a plain line, so a fresh load is not a normaliser fixed point for such a text. Owed: one rule for both. Blocks nothing in plan 019, where it is a stated limit."
Owning-Stage: implementer
Review-Trigger: when `src/components/SlateEditor/utils/withNormalizeNode.ts` `resolveLine`, or `getInitialValue.ts` `buildLines` / `emojiLift.ts` `liftLoaded`, is next edited after plan 019's release
---

# The editor's load and normaliser disagree on an emoji in a code line

## What is seeded

For some texts whose last line is a code line holding an emoji, next to a plain line, the website editor builds two different
line states:
- **the load** (`getInitialValue.ts` `buildLines`, then `emojiLift.ts` `liftLoaded`) leaves the code line's emoji as text;
- **the normaliser** (`withNormalizeNode.ts` `resolveLine`, over a run unit that includes the code line's neighbours) lifts it
  into an emoji element.

So a freshly loaded state is not a normaliser fixed point for these texts: a forced `Editor.normalize` changes it. Plan 019's
architecture record states the intended invariant, that stored line structure always equals `getInitialValue` of the saved text
(architect findings, § Delta pass, revision 21). Here the normaliser is the side that departs from it.

The work owed: one rule for whether an emoji in a code line is lifted, used by both paths, so the load is a fixed point for every
text. Which rule matches Discord (an emoji inside code shown as text or as an image) is unread here and is read first.

Members observed, from code review's 36,560-keystroke fixed-point corpus, are keystrokes after which a second forced normalise
changes the state: `599|0|end|<delete>`, `599|1|start|<backspace>`, `728|1|end|\``, `941|0|end|<delete>`, `941|1|start|<backspace>`,
`1190|1|end|\``, and 8 further keystrokes present at website `85ece66` as well (14 at `a7ad3f2` against 8 at `85ece66`).

At `a7ad3f2` the six end in the load's state, equal to a fresh load of the final text, where `85ece66` left the normaliser's
state. The saved text is the same either way. This is an inference from the fresh-load equality, not run here.

## Evidence

- `agent-output` `implementation/019-slate-formatting-discord-engine-m6-implementation.md` at record `32c4a684`, § Fix Round 4,
  "Differentials" (keystrokes, fixed-point probe) and Outstanding Items (Fix Round 4) item 1. Capture:
  `verification/019/impl/m6-fix4-differentials/keystroke-11-differing-vs-fresh-load.jsonl`.
- The probe is code review's, under `verification/019/code-review/m6fix3-2b82972/`.
- Not read at the chain base `af3d95a`.

## Origin

Plan 019 (`planning/019-slate-formatting-discord-engine.md`), M6 Fix Round 4, Outstanding 1. The planner disposed of it as a
stated limit under the M4 to M6 cap (Planner batch row "Fix Round 4's Outstanding 1"; effort rulings block 2026-11-25T05:19Z routed it).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-25T05:22 | planner-019 | Opened from M6 Fix Round 4's Outstanding 1. |
