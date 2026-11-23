---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: >-
  M4 is in progress on chain/019-slate-formatting-discord-engine. Slice 1 (the preview renderer over the engine tree, the static parsers
  switched, subtext and shared spoiler reveal) is committed and not yet handed to review. Not built yet: mentions (held on his answer to Q1),
  emoji display helper, timestamps (AC-4.3, AC-4.7), the adjustment module and the frozen residue list (AC-3.7, AC-3.8 ii), the site-DOM limbs
  of AC-3.1 and AC-3.6, the reader sweep for AC-4.5.
Handoff-At: not yet handed over
---

# Implementation 019 — M4: the preview on the engine

## Plan Reference

`agent-output/planning/019-slate-formatting-discord-engine.md`, Revision 9 (record `47348a6d`), milestone M4, with R-30's M6 exit condition noted
(Outstanding 6). QA Phase 1: `qa/019-slate-formatting-discord-engine-qa.md` (record `26f3a3c`). Chain branch
`chain/019-slate-formatting-discord-engine`, base `5ec0621`; M3 is with code review at `f4060c5` and was REJECTED (CR-5, CR-6: a fix round
for M3 is owed before M4 is handed on, see Outstanding 1).

## Date

2026-11-23 (UTC). Session `implementer-019`.

## Changelog

| Date | Handoff | Request | Summary |
|------|---------|---------|---------|
| 2026-11-23T21:33 | steering-hooks-fixer (message, session `2581957`) | Start plan 019 M4; send the flows that hold a decision before code | Flow ask sent 21:18Z. Slice 1 coded and committed. |

## Implementation Summary

Slice 1 puts the content, embed description, field value, embed title (with and without a url) and V2 text surfaces' static parsers on the
engine: `src/utils/markdown/preview.tsx` renders the `parseLossless` tree through the adapter's maps, and `src/utils/markdown/index.tsx` builds
`markdown.static.*` from it. The editor's interactive parsers and `rules.tsx` are not touched (M5, M6). `staticParserFor` (the pre-transform
path) is deleted, which is AC-4.5's call-site limb.

## Milestones Completed

Slice 1 of M4 only. Not done: see Status-Detail and Outstanding.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | steering's message "start plan 019 M4" 21:1xZ; QA Phase 1 `26f3a3c` covers M4's criteria (AC-4.1 to AC-4.8, NM-1, NM-8 to NM-10, NM-24, NM-26, NM-27) | n/a |
| Flows that hold a decision, asked before code | message to `steering-hooks-fixer` at 21:18Z (Q1 mentions, Q2 subtext, Q3 spoiler); answered Q2 (a), Q3 (a); Q1 with him, **mention rendering is not coded** | n/a |
| Open questions | none open in the plan (all `[RESOLVED]`) | n/a |
| Premise | no `PREMISE-STALE` marking on M4 | n/a |

## Flows (user-visible work)

One line per flow: surface, trigger, what happens next, rung.

| Flow | Line |
|---|---|
| Preview of a message on all six surfaces and `/preview` | trigger: opening or editing any message, as today; draws from the engine tree; rung: the existing renderers kept (`rules.tsx` elements and CSS classes), output kept for bold, italic, underline, strike, inline code, heading, quote, lists, code block, link |
| Pending engine | hidden, as today (`DiscordMessageEditor` `show`, `DiscordContentEditor`'s null); rung: M2's gate, `Markdown` subscribes to the engine state so it redraws on resolve |
| Rejected engine | every surface shows its source text unformatted; rung: plan AC-2.5, M2's `console.error` line |
| Link outside the scheme allow-list | label as text, no anchor (AC-4.6); rung: none exists (M2 added `isAllowedLinkUrl`) |
| Subtext `-# text` | a small, muted block, marker consumed (Q2 (a)); rung: none for subtext; nearest the heading rules in `visualizer.scss`, which the new `.discord-visualizer__subtext` rule sits beside |
| Split spoiler | one click on any piece reveals or hides every piece of that spoiler (Q3 (a)); rung: `MarkdownSpoiler`'s click toggle, extended with a per-document shared reveal keyed by the engine's spoiler id; a spoiler with no shared provider (the editor's use) keeps its own state |
| Mentions | **held on Q1**; interim: the engine mention is drawn as its source text; refutation read at `5ec0621` by steering says the site holds a channel list (`GuildProvider`) the preview does not read, and a command mention has no rule today: check both before relying on them |
| Timestamp pop-over and its edit | not yet built (slice 2): trigger as today (click the timestamp), the target comes from the node's span (AC-4.3) |

Where M4 touches no user-visible surface: not applicable, it touches all.

## Files Modified

| Path | Changes |
|---|---|
| `src/utils/markdown/index.tsx` | `markdown.static` is six `previewParser(surface)` entries; `staticBaseRules` and `staticParserFor` no longer imported here |
| `src/utils/markdown/utils.ts` | `staticParserFor` deleted; `interactiveParser` is the default export (lint: single export) |
| `src/utils/markdown/components/MarkdownSpoiler.tsx` | optional `id`; `SpoilerRevealProvider` |
| `src/components/Markdown.tsx` | subscribes to the engine state |
| `src/components/DiscordMessageEditor/components/EmbedEditor/{Embed,EmbedTitle}.tsx`, `ComponentEditors/TextDisplayEditor.tsx` | each surface gets its own static parser (`parseEmbedDescription`, `parseEmbedTitleWithUrl`, `parseTextDisplay`) |
| `src/@types/simple-markdown.d.ts` | `StaticRuleType` names the three added static keys |
| `src/app/_styles/visualizer.scss` | `.discord-visualizer__subtext` |
| `src/utils/markdown/__tests__/rules.multi-line-code-block.test.ts` | tightened: starts the engine first (the static parsers are now engine-driven) |

## Files Created

| Path | Purpose |
|---|---|
| `src/utils/markdown/preview.tsx` | `previewParser(surface)`, `renderLosslessTree` |
| `src/utils/markdown/components/MarkdownCodeBlock.tsx` | the hljs code block element, as `rules.tsx` drew it |
| `src/utils/markdown/__tests__/preview.engine-tree-render.test.ts`, `preview.engine-not-ready.test.ts`, `components/__tests__/MarkdownSpoiler.pieces-reveal-together.test.tsx` | the specs |

Records under `verification/019/impl/`: `m4-red-1.txt` to `m4-red-3.txt`, `m4-mutants-slice1.txt`, `m4-suite-slice1.{log.txt,exit}`.

## Patterns Extended

| Surface | Pattern extended |
|---|---|
| Static parser per surface | `markdown.static.parseContent/parseEmbedTitle/parseEmbedField` of `utils/markdown/index.tsx`; three keys added |
| Test of the static parsers | `rules.multi-line-code-block.test.ts` (render through `renderToStaticMarkup`); the new files follow it; the spoiler cases sit beside `MarkdownSpoiler.aria-expanded.test.tsx` (that file covers aria state, not pieces) |
| Spoiler | `MarkdownSpoiler` (click toggle) |
| Kind maps | `engine.ts` `nodeRenderer` and `modifierStyle` (the renderer's switch lists every `NodeRenderer`) |

## TDD Compliance

TDD Gate: `preview.engine-tree-render` fails as expected: `Cannot find module '/src/utils/markdown/preview'` (`m4-red-1.txt`). Second spec batch: five failures, a code block that kept its trailing newline (`AssertionError`) and `renderLosslessTree is not a function` (`m4-red-2.txt`). The spoiler spec fails with the module's `SpoilerRevealProvider` absent (`m4-red-3.txt`). Proceeding to implementation, each.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `previewParser` (modifiers, heading, text, links) | `preview.engine-tree-render.test.ts` | Yes | Yes | ModuleNotFoundError (first row of the module; `m4-red-1.txt`) | Yes |
| code block body, quote, lists, blank line | same | Yes | Yes (code block: AssertionError, `m4-red-2.txt`); quote, lists, blank line: first run green (implementation preceded the case), shown red by mutants M4-m6 to M4-m8 (`m4-mutants-slice1.txt`) | AssertionError by mutation | Yes |
| `renderLosslessTree`, scheme allow-list | same | Yes | Yes | TypeError `renderLosslessTree is not a function` (`m4-red-2.txt`); mutant M4-m4 (allow-list dropped) red on two cases | Yes |
| subtext | same | No: the case was added after the code | Yes, by mutant M4-m1 (the branch removed: red) | AssertionError by mutation | Yes |
| pending and rejected states | `preview.engine-not-ready.test.ts` | No: the file was added with the renderer | Yes, by mutants M4-m2 and M4-m3 (each red on its case) | AssertionError by mutation | Yes |
| shared spoiler reveal | `MarkdownSpoiler.pieces-reveal-together.test.tsx` | Yes | Yes | `Element type is invalid` (provider absent, `m4-red-3.txt`); mutants M4-m9 (never shared, 2 red), M4-m10 (shared across ids, 1 red) | Yes |
| link label is the normalised url | `preview.engine-tree-render.test.ts` | Yes | Yes by mutant M4-m5 | AssertionError by mutation | Yes |

The two rows marked "No" under "Test Written First?" are owed an assertion-level red against a stub-tree copy with the function bodiless, then a green at the real code. The mutants above stand as the red at the pre-change behaviour for each guard; the stub-tree record is not made. This is a TDD deviation of mine, named here. The mutants ran in an isolated export (`scratchpad/export-m4a`, a `git ls-files` copy with `node_modules` linked, driver inline, output to a file).

The renderer-level scheme control uses a fixture tree that invents engine output (the engine returns no `javascript:` or `data:` link); named so, per QAF-17.

## Class Sweep

No reviewer finding on M4 yet.

Disclosed in the round it happened: twice, Claude Code's built-in removal check stopped a Bash call of mine that deleted nothing (a Python heredoc whose text held a JavaScript template string with a dollar sign pair). Both times I made the same edit with the Edit tool and ran the commands as separate plain calls. The check concerned how the shell would read that text, not an act aimed at a removal. I did not rephrase the blocked action to pass it.

## Test Execution Results

| Command | Result | Capture |
|---|---|---|
| `unshare -rn` (lo up) `npx vitest run --project node --project dom`, tree with slice 1 (the commit this document lands in) | see `m4-suite-slice1.{log.txt,exit}`; the run before the lint and spoiler changes was exit 0, 197 files, 3205 of 3205 | `m4-suite-slice1.*` |
| `pnpm run typecheck` | exit 0 | console |
| `node ~/.claude/tools/convention-check.js website --since=f4060c5` | 0 FAIL, 0 CANDIDATE (the id-token basename check is SKIPPED by the tool: unchecked by tool); by hand, no ID token in a new basename, title or comment | console |

## Outstanding Items

1. **M3 fix round is owed first** (code review REJECTED M3: CR-5, CR-6 MEDIUM; CR-4's remainder, CR-7 to CR-9 LOW). M4 slice 1 is committed on the same branch at a different set of paths; the M3 fix lands as its own commits.
2. **Q1 mentions** are with him. Until he answers, the engine mention is drawn as its source text (the interim is the plan's "no Discord observation" form).
3. **Not built yet in M4:** the emoji display helper (CF-10) and the emoji renderer (the engine's `emoji` node draws as source text for now); timestamps (AC-4.3, AC-4.7); field name with an embed url (the preview has no embed-url flag at the field; it uses the title mask, AN-8 table, row "Field name, embed has url"); the adjustment module, the frozen residue list and AC-3.8 (ii); the site-DOM limbs of AC-3.1, AC-3.6, AC-3.7 and AC-4.1; AC-4.2's UAT form; AC-4.5's module-graph instrument over the reader sites (slice 1 removes the only caller; the instrument and `staticBaseRules`' `react` functions are not yet removed).
4. The decision to render a paragraph's line ending as `\n` only between siblings (not after the last) is mine, taken from the text the engine gives and the `white-space` rules in `visualizer.scss`; the visible-form comparison against the legacy tree is the instrument that will confirm or correct it (slice 2).
5. Self-diagnosis (method): I wrote the renderer, then the not-ready cases and the subtext case after it, so two rows lack a red-first. I should have written each case before the branch it covers.
6. R-30 (planner, record `9caf57ff`): M6 does not exit while `MOUNTED_BASE_RED`, `EDITS_BASE_RED` or `holdsEmoji` is in `src`; check `git grep -c "BASE_RED\|holdsEmoji" <tip> -- src` prints nothing.

## Next Steps

M3 fix round, then M4 slice 2 (timestamps, emoji helper, then the site-DOM comparison and the adjustment measurement), after Q1's answer for mentions.

## Resumption State

Written at the checkpoint after M4 slice 1 and M3 fix round 3, for a `/clear`.

- **Done.** M4 slice 1 at website `93b26fd` (preview parsers on the engine, subtext, shared spoiler reveal; `staticParserFor` deleted). M3 fix round 3 at `1698c80`, sent to `code-reviewer-019` (CR-5, CR-6; the M3 document's `Handoff-At` is `1698c80`). Record commits `5ad6e64`, `e1c265a7`.
- **Branch and HEAD.** `chain/019-slate-formatting-discord-engine` at `1698c80`. The website tree holds only the foreign `?? .playwright-mcp/`. No uncommitted source work.
- **Rulings that bind the rest of M4.**
  - Q2 (subtext) and Q3 (spoiler) were answered by steering from the plan and his standard, option (a) each; both are coded.
  - Q1 is his selection "Agent: channel names only", now plan revision 10's AC-4.4 (D-17), approved by critic `71b981ad`, architect `b8d11f1b`, QA `f79d7f77` (R-33, record `b9dadaf0`); M4's mention code is released.
  - Build to AC-4.4's table with CF-17's form: the channel list (or a `channelName(id)` function) travels in the parser `State` and then in `preview.tsx`'s `Ctx`; a surface supplies it from a second `GuildProvider` export, `use(Context)`, which returns `null` outside the provider. Do not change `Context`'s default (eight files call `useGuild` and rely on its throw). `/preview` supplies nothing. A renderer under `src/utils/markdown` that reads the guild context itself would be a deviation for review.
  - SL-11: forum channels (type 15) are in `TEXT_CHANNEL_TYPES`, so they are on the list and render their name. Take list membership from `fetchChannels`' filter, not from the plan's residue sentence. A listed channel, or an active thread under one, renders `#<name>` in today's pill. Everything else keeps `rules.tsx`'s form: unlisted channel or no list `#<id>`; role `@&<id>`; user `@<id>` or `@!<id>` in the pill; `@everyone` and `@here`; command as plain source; game and static as source. Nothing renders "unknown".
  - QA's re-key (QA document, § Re-key on Revision 10) sets 12 kinds by 5 list states as literals, a coupling fixture and per-surface fixtures. List fixtures use `fetchChannels`' shape. Read that section before the tests.
  - The M4 and M6 revision cap (block 17:56Z) applies; AC-4.7 gaps go to steering first (block 18:02Z). R-30: M6 does not exit while `BASE_RED`/`holdsEmoji` are in `src`.
- **Next, in order.**
  1. Mentions per AC-4.4 (tests first: the 12 by 5 table, then the renderer; `Ctx` and `State` carry the channel lookup; `Markdown.tsx` is where the state is built, `onChange` and `mounted` already travel there).
  2. The emoji display helper (CF-10) and the emoji renderer: the engine's `emoji` node draws as source text now. The helper takes `src` and `jumboable` (`emoji.tsx`'s `jumboify` rule, limit 27, is the rung); the preview and M6's editor element read it.
  3. Timestamps: AC-4.3 (the target is the node's span, never a count or a search; the `onChange` callback's signature changes per CF-6; `localDate` resyncs on a re-render that changes the source) and AC-4.7 (nine style letters and the bare form; `s` and `S` by `Intl.DateTimeFormat`, `{dateStyle:'short', timeStyle:'short'|'medium'}`, UTC before mount, the locale dayjs resolves; the five fixtures in the plan; the picker stays at seven, D-16). The engine currently draws timestamps as source text.
  4. Field name with an embed url uses the `embedTitleWithUrl` mask (AN-8 table); the preview of a field name has no embed-url flag today.
  5. The M3 residue measurement re-run (the corrected game mention changed the generator; Outstanding 11 of the M3 document), then the adjustment choice by (a), (b), (c); the frozen residue list as data; AC-3.7, AC-3.8 (ii); the site-DOM limbs of AC-3.1, AC-3.6, AC-4.1 (a `canonFromDom` over the renderer's output: tags `strong`, `em`, `u`, `s`, `code.inline`, `a`, `h1` to `h3`, quote div, `ul`, `ol`, `li`, `pre>code`, `.spoiler`, `.discord-visualizer__subtext`). Findings 4 of the M3 document is a text-family grouping; M4 needs the tree predicates.
  6. AC-4.5's module-graph instrument and the removal of the now-dead `react` functions of `staticBaseRules` (they have no preview caller since `93b26fd`; `rules.tsx`'s `match` and `parse` remain for the interactive parsers until M6).
  7. Then the stage self-check (`mutant-gen.js` over the diff in an isolated export, the Named mutants NM-1, NM-8 to NM-10, NM-24, NM-26, NM-27), `convention-check.js`, the offline suite in `unshare -rn`, `pnpm run typecheck`, hand-off to `code-reviewer-019`.
- **Approach in flight.** None.
- **Local state not restored.** None. Scratch only: `scratchpad/export-m4a` (a disposable mutant export), `scratchpad/probe.mjs` (prints a lossless tree: `node probe.mjs '<text>'`, which imports the wasm by absolute path), `scratchpad/collected.json`.
- **Evidence run but not recorded.** None; every run is under `verification/019/impl/m4-*`.
- **Questions sent.** None open. For code review of M3: the held-out generator set was re-collected (Outstanding 11 of the M3 document).
- **Cache-warm wake.** Job `df8fc767` (armed 21:16) deleted at this checkpoint. Arm a new one on the next turn.
