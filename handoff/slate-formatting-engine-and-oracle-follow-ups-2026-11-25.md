---
UUID: 260045f1
Status: Open
Status-Detail: "Six small items plan 019 left on the formatting engine, its Discord test oracle and the embed residue count (RK-9). None holds 019's release."
Owning-Stage: planner
Review-Trigger: "when the @discord/markdown-wasm pin is next changed, or the next chain touching the formatting region opens"
---

# Formatting engine and Discord oracle: follow-ups left by plan 019

## What is seeded

1. **RK-9, the embed residue count.** On the legacy-only surfaces (embed description, title, field name, field value, V2 text display) a
   visible difference from Discord remains, listed and frozen at M4. A later re-measure that reads a count **above M4's** on any surface
   or mask goes to the owner through steering (decision D-18; plan § Risks RK-9). A planted re-measure is not a firing. Plan 019 said
   this handoff, minted at closing, carries the clause.
2. **Import scan gap (code review CR-4).** The test that confines imports of the Discord package reports a non-literal `import()` and bare
   `require()` only. `createRequire(import.meta.url)(n)`, `module.require(n)` and an aliased `require` are not reported, and every file
   under `__tests__` is exempted. Asked: name the accepted unresolvable loads, so a new one in any directory fails; report
   `createRequire` calls and `.require(` member calls.
3. **The content mask is held twice (CR-8).** `src/utils/markdown/__tests__/helpers/discordOracle.ts` has `CONTENT_MASK_LITERAL`,
   derived from the package's `Syntax` enum, beside `SURFACE_MASK_LITERALS.content`. A pin change that moves `Syntax.ALL` would split
   them silently. Asked: `nativeParse` defaults to the literal.
4. **A test-only type declaration is in the production program (CR-9).** `src/@types/jsdom.d.ts` lets production code that imports the
   dev-only `jsdom` type-check. Asked: move it under `src/utils/markdown/__tests__/helpers/`.
5. **The oracle's fetch shim was never compared (QA, revision 4 re-key).** No record compares Discord's served box code run with and
   without the harness `fetch` shim on the same bytes. If they differ on a day the wasm hashes are equal, the frozen editor literals
   carry a harness artefact. Asked: run both on the typed cases and record equality.
6. **Two escape cells with no row (analysis G-5, very low).** The two `syntaxOverride_` escape cells (AN-6 rows 239 and 246) have no
   residue row and no reading of the class component that adds the style.

## Evidence

`code-review/closed/019-slate-formatting-discord-engine-code-review.md` (CR-4, CR-8, CR-9, as read at `f4060c5`);
`qa/closed/019-slate-formatting-discord-engine-qa.md` § Assumption Not Checked; `analysis/closed/019-slate-formatting-discord-engine-analysis.md`
gaps table; `planning/closed/019-slate-formatting-discord-engine.md` § Risks and Planner batch row F-39. Items 2 to 6 are carried as
those documents state them; none was re-read against website `48eb60a` here.

## Origin

Plan 019's closure at devops Stage 1: items whose only carrier was a chain document.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-25T16:53 | devops-019 | Written at Stage 1 closure from the chain's forward-item sweep. |
