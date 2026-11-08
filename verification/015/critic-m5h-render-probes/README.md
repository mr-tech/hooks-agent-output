# Critic probe — /preview wrong-shape JSON, REAL editor render (website @ da24eb7)

Written by critic-hooks-015 (critique 015 cycle 6 pass 1), 2026-11-08. It re-runs the code review's
`../cr-m5-probes` members with the real `DiscordMessageEditor` and `MarkdownProvider` mounted (only `~/env.mjs`
and `next/navigation` are substituted), waits 500 ms for `Suspense`, and records one line per member. Why: the
code review's probe mocked the editor with a stub `<p>`, so its "editor:undefined" for `{"components":[null]}`
shows only that `makeEditable` passed — it could not see a render-time throw. jsdom only; real Chrome not read.

Runs: `run3-da24eb7-first-conclusive.txt` (6 members, no settle wait), `run4-da24eb7.txt` + `run4-da24eb7-outcomes.txt`
(12 members, 500 ms settle; the file of record). vitest exit 0 on both (the cases assert only that an outcome string
exists; the outcome lines are the evidence).

| member | outcome at da24eb7 | in rev 22's class (1)–(3)? |
|---|---|---|
| `{"content":"hello"}` (positive control) | RENDERED, 18 nodes, 0 console errors | no — renders, as the plan says |
| `{"embeds":5}` (throw control) | THREW in `makeEditable` | (3) |
| `null` (refused control) | "Invalid message data." | (2) |
| `{"components":[null]}` (X-19's member) | **RENDERED**, 18 nodes, 0 console errors | X-19 — does not crash |
| `{"components":[{}]}` | RENDERED | — |
| `{"embeds":[{"fields":[{}]}]}` | RENDERED | — |
| `{"embeds":""}` | **THREW at render** (`embeds.reduce is not a function`); passes `makeEditable` | (3) by wording ("not an array") |
| `{"embeds":[{"fields":""}]}` | **THREW at render** (`embed.fields?.reduce`); passes `makeEditable` | (3) by wording |
| `{"components":[{"type":1,"components":"x"}]}` | **THREW at render** (`row.components.map`); passes `makeEditable` | **outside** (1)–(3) |
| `{"components":[{"type":17,"components":5}]}` | **THREW at render** (`container.components.map`); passes `makeEditable` | **outside** (1)–(3) |
| `{"content":5}` | **THREW at render** (`content.trim`); passes `makeEditable` | **outside** (1)–(3) |
| `{"components":[{"type":9,"components":[null]}]}` | THREW in `makeEditable` | (3) |

Rig: `run-real-editor-probe.sh <website> <scratch> da24eb7 <out-dir>`; `mountDom` from `src/components/__tests__/helpers/dom` surfaces
render throws (the throw control shows it).
