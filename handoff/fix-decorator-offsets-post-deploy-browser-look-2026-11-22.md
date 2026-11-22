---
UUID: 4b3c98a7
Status: Open
Status-Detail: "Carrier of QA's blocking-condition row B-1 (post-deploy-observable) for fixer chain fix-decorator-offsets, with the two browser-side Assumptions Not Checked that row discharges. Opened at devops Stage 1; the release is not pushed yet, so nothing is decidable. Read by devops in its own session with a browser-walker helper after the production deploy is evidenced; blocks neither the release act nor the commit."
Owning-Stage: devops
Review-Trigger: "the Vercel production deployment of website master that carries this chain's commits is Ready and serving hooks.gg (devops reads it with vercel inspect https://hooks.gg after the push)"
---

# Handoff: fix-decorator-offsets post-deploy browser look (QA row B-1)

## What is seeded

Chain `fix-decorator-offsets` (website, fixer route) changes `src/components/SlateEditor/utils/decorator.tsx` and
`src/utils/markdown/rules.tsx`: the editor's syntax colouring now follows each node's source width. Every measurement so far ran in
jsdom (`Text.decorations`); no real browser has looked. The carried rows, copied in full from `qa/fix-decorator-offsets-qa.md`
(Verified-At `febf20e`, record `b2a0bd6b`; the register is point-in-time and this record's `Result` lines are authoritative on execution
state):

| ID | Class | Condition | Primary instrument | Earliest-decidable condition | Predicted value | Failure mode | Owner | State |
|---|---|---|---|---|---|---|---|---|
| B-1 | post-deploy-observable | Slate-react's leaf splitting in a real browser shows the colours `Text.decorations` gives in jsdom (the reviewer's round-1 assumption) | on hooks.gg, signed out, in the blank message editor, a `browser-walker` helper enters four lines — `***ab*** cd`, `# **a**`, `**a https://x.y**`, and a ```` ```js ```` block holding the line `const a = 1;` — and captures the editor; nothing is saved | website `master` deployed with this chain's commits | `***`/`**` syntax-coloured only at the delimiters; ` cd` plain; heading marker `# ` syntax-coloured; the URL link-coloured inside the bold; `const` keyword-coloured; no console error | if a browser splits leaves differently, users see delimiters or prose mis-coloured although every jsdom instrument passes | devops (fallback: the owner's look at the same lines) | open |

Two Assumptions Not Checked that this row discharges, each with the signature that would falsify it:

- **Range past the text** (QA Phase 2): slate-react in a real browser ignores a decoration range ending past its text, as `Text.decorations`
  does in jsdom. Inner code-block lines carry such ranges on 492 of the tip's reachable rows (22 at base). Falsified by a console error or a
  mis-split leaf on the inner line of the ```` ```js ```` block.
- **Two-class leaf** (QA refresh at `febf20e`): a leaf carrying two highlight classes (`hljs-string hljs-subst`) is coloured by the site's
  stylesheet as the inner scope inside a string. Falsified by a `{b}` in a Python f-string, or a `${y}` in a JS template, shown in a colour that
  is neither the string's nor the substitution's. The ```` ```js ```` line of the walk is the look at this; QA's named line `const a = 1;`
  has no nested scope, so a template-string line is added to the walk (`` const b = `x ${a}`; ``), nothing saved.

Pass conditions are the predicted values above. A fail is reported with the capture, to `steering-hooks-fixer`, not fixed here.

## Evidence

Captures go under `verification/fix-decorator-offsets/devops/` (screenshots stay uncommitted). If a real browser is not available, the
row is recorded not run and says so.

## Origin

`qa/fix-decorator-offsets-qa.md` § "Blocking-condition register (this chain's; first QA document)" row B-1, and its two Assumption Not
Checked paragraphs; `code-review/fix-decorator-offsets-code-review.md` § "Assumption Not Checked", Round 1 (the same browser premise).
Raised by devops Stage 1 as the carrier the stage set owes a post-deploy-observable row.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-22T22:34 | `devops-fix-decorator-offsets` | Created at Stage 1; B-1 carried in full; no timed reader (devops reads it in-session after the deploy), so no crontab line. |
