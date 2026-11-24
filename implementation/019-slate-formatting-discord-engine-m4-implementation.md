---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: >-
  M4 is built and handed to code review at website e58f2ed on chain/019-slate-formatting-discord-engine: slices 1, 2a to 2d and 3 (the
  DOM reader, atoms from element data, the adjustment measurement (size 0), the frozen residue list of 6,142 entries, AC-3.1, AC-3.6,
  AC-3.7, AC-4.5). Open for code review and QA: the plan questions of Outstanding 0a, the stub-tree records not made (TDD Compliance),
  and three equivalent self-check survivors (Test Execution Results). The M3 fix round for QAF-32 and QAF-33 is committed at 380e82d
  and recorded in the M3 document, Round 5.
Handoff-At: e58f2ed — repos=website — M4 handed to code review; the offline suite, typecheck and convention check recorded below are the tree at this SHA
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
| 2026-11-23T23:05 | steering-hooks-fixer (message, resume M4), planner-019 (R-35, R-37, R-41/R-42, R-12), qa-019 (M3 Phase 2 QA Failed: QAF-32, QAF-33) | Resume M4 from the Resumption State; AC-3.7 per-input list; atoms read from element data (SL-12); M3 fix round | Slice 3 committed at `0b9f76f`, `5ccb54d`, `35c4b40`, `cf605d0`, `aa728f3`, `2149ce2`, `771c64f`; M3 fix at `380e82d`. |
| 2026-11-23T21:33 | steering-hooks-fixer (message, session `2581957`) | Start plan 019 M4; send the flows that hold a decision before code | Flow ask sent 21:18Z. Slice 1 coded and committed. |
| 2026-11-23T22:20 | (own order) | Slice 2c timestamps, slice 2d field name | Committed at `36924ae` and `6379abc`. |
| 2026-11-23T22:12 | code-reviewer-019 (message, Round 3 sub-entry) | M3 CR-10 | Fixed at `2c1590f` (M3 document, Round 4); M3 re-handed. Slice 2b (emoji) committed at `c32e058`. |
| 2026-11-23T22:05 | steering-hooks-fixer (message) | Continue M4 after `/clear`; Revision 10's AC-4.4 (D-17) approved by all three gates, mention code released | Slice 2a: mentions coded test-first and committed at `f131f06`. |

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
| Mentions | trigger: as today; a channel the guild's list holds (or an active thread under one) draws `#<name>` in today's channel pill; every other mention draws today's form (AC-4.4's table); the answer is his selection (D-17), so no further ask; rung: `rules.tsx` `discordChannel`/`discordRole`/`discordUser`/`discordEveryone` pills kept, and `WebhookProvider.useValue`'s read of `useGuild().channels` for the list |
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

Slice 2a (mentions), at `f131f06`:

| Path | Changes |
|---|---|
| `src/utils/markdown/preview.tsx` | `renderMention`, `channelName`; `Ctx` carries `channels`; `previewParser` reads `state.channels` |
| `src/providers/GuildProvider.tsx` | `Context` exported (as `MarkdownProvider` exports its own); `useGuildChannels()` returns the list or `null` outside the provider; `Context`'s default is unchanged |
| `src/components/Markdown.tsx` | reads `useGuildChannels()` and passes `channels` in the parser state |
| `src/@types/simple-markdown.d.ts` | `State.channels` |

Slice 2b (emoji), at `c32e058`: `src/utils/markdown/engine.ts` (type `EmojiValue` exported), `emoji.tsx` (`JUMBO_EMOJI_MAX` exported), `preview.tsx` (`renderEmoji`; `Ctx` carries `isEmbed` and `jumboable`; `renderLosslessTree` takes an options object).

Slice 2c (timestamps), at the commit whose subject starts "feat(website): the preview draws every timestamp style": `MarkdownTimestamp.tsx` (props `timestamp`, `format`, `mounted`, `onEdit`; `s` and `S` by `Intl.DateTimeFormat`; `state` and `indexes` gone), `preview.tsx` (`renderTimestamp`, keyed by span start and source text), `Markdown.tsx` (`State.onChange(span, text)` rewrites the span), `rules.tsx` (the legacy `discordTimestamp.react` passes `mounted`, and no edit: it has no caller on a preview path), `simple-markdown.d.ts` (`onChange` signature; `indexes` removed). Slice 2d (field name with an embed url): `Embed.tsx`, `EmbedFields.tsx`, `EmbedField.tsx` (`embedHasUrl` travels from the embed's `url` to the name's parser, both the static and the editing branch), and `EmbedFields.read-only-field-index.test.tsx` (the new prop).

## Files Created

| Path | Purpose |
|---|---|
| `src/utils/markdown/preview.tsx` | `previewParser(surface)`, `renderLosslessTree` |
| `src/utils/markdown/components/MarkdownCodeBlock.tsx` | the hljs code block element, as `rules.tsx` drew it |
| `src/utils/markdown/__tests__/preview.engine-tree-render.test.ts`, `preview.engine-not-ready.test.ts`, `components/__tests__/MarkdownSpoiler.pieces-reveal-together.test.tsx` | the specs |

Slice 2a: `src/utils/markdown/__tests__/preview.mention-table.test.ts`, `src/components/__tests__/Markdown.channel-names.test.tsx`, `src/app/preview/__tests__/page.channel-names.test.tsx`; records `m4-red-6.txt`, `m4-green-6.txt`, `m4-red-7.txt`, `m4-green-7.txt`, `m4-run-8.txt`, `m4-run-9.txt`, `m4-mutants-mentions-out/`.

Slice 2b: `src/utils/markdown/emojiDisplay.ts` (`emojiSrc`, `isJumboTree`: the shared helper, CF-10), `components/MarkdownEmoji.tsx`, tests `emojiDisplay.src-and-jumbo.test.ts`, `preview.emoji-draw.test.tsx`; records `m4-red-8.txt`, `m4-green-8.txt`, `m4-red-9.txt`, `m4-green-9.txt`, `m4-mutants-emoji-out/`.

Slices 2c and 2d: `preview.timestamp-styles.test.tsx`, `preview.timestamp-edit.test.tsx`, `page.field-name-links.test.tsx`; records `m4-red-10.txt`, `m4-green-10.txt`, `m4-run-11.txt`, `m4-green-11.txt`, `m4-red-12.txt`, `m4-green-12.txt`, `m4-mutants-timestamp-out/`, `m4-mutants-fieldname-out/`.

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

Slice 2a (mentions). TDD Gate: `preview.mention-table` fails as expected: 38 of 75 cases `AssertionError`, received `&lt;@111&gt;` where the table says the pill (`m4-red-6.txt`); `Markdown.channel-names` fails as expected: `TypeError: Cannot read properties of undefined (reading 'Provider')`, the context export being absent (`m4-red-7.txt`). Proceeding to implementation, each.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|----------------|-----------|---------------------|-------------------|----------------|------------------|
| `renderMention`, `channelName` (12 kinds by 5 list states, forum, forum post, category, surfaces, corpus) | `preview.mention-table.test.ts` | Yes | Yes | AssertionError (`m4-red-6.txt`) | Yes (78 of 78, `m4-green-6.txt`) |
| `useGuildChannels`, the wrapper's read of it | `Markdown.channel-names.test.tsx` | Yes | Yes | TypeError, `Context` not exported (first row of the file, `m4-red-7.txt`) | Yes (5 of 5) |
| the seven preview surfaces, with and without the provider | `page.channel-names.test.tsx` | No: written after the wiring | Yes, by mutants M4-n1, M4-n5, M4-n13 (`m4-mutants-mentions-out/`) | AssertionError by mutation | Yes (14 of 14) |
| the negative clause (no text says unknown), 60 cells and the generator corpus | `preview.mention-table.test.ts` | Yes (green at first run for the corpus: the code never emitted it) | Yes, by mutants M4-n4 and M4-n10 (6 red each on it) | AssertionError by mutation | Yes |

The `page.channel-names` row is owed the stub-tree record and is not made; the mutants stand as its red, as for the slice 1 rows. The fifteen mutants M4-n1 to M4-n14 (NM-27, NM-48 to NM-57; one per guard) each ended red (`m4-mutants-mentions-out/summary.txt`); they ran in `scratchpad/export-m4b`, driver `scratchpad/mutate.cjs`, output to files, run under `timeout -k` with `unshare -rn`. NM-57's per-surface mutants do not exist: every one of the seven surfaces draws through the one `Markdown.tsx`, so the wiring is one site (M4-n1 is red on all seven surface cases). Fixture realism: the lists carry `fetchChannels`' shape (`{ id, name, type, threads }`); the provider value is the `Context` `GuildProvider` provides, narrowed by a cast, since `GuildProvider`'s own value needs a session and trpc.

Slice 2b (emoji). TDD Gate: `emojiDisplay.src-and-jumbo` fails as expected: `Cannot find module '/src/utils/markdown/emojiDisplay'` (`m4-red-8.txt`); `preview.emoji-draw` fails as expected: 8 of 9, `TypeError: Cannot read properties of undefined (reading 'alt')`, no image drawn (`m4-red-9.txt`). Proceeding to implementation, each.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|----------------|-----------|---------------------|-------------------|----------------|------------------|
| `emojiSrc` | `emojiDisplay.src-and-jumbo.test.ts` | Yes | Yes | ModuleNotFoundError (first row of the module) | Yes; mutants M4-e5 (animated ignored), M4-e6 (id through Number, past 2^53) red |
| `isJumboTree` (26 and 27 emoji, text beside, bold, link, code, heading, quote, empty) | same | Yes | Yes by mutants M4-e1 (limit inclusive), M4-e2 (empty is jumbo), M4-e3 (any text blank), M4-e4 (other blocks ignored; the heading-above case was added after M4-e4 survived on `# 🙂`) | AssertionError by mutation | Yes |
| `MarkdownEmoji`, `renderEmoji` | `preview.emoji-draw.test.tsx`, and the fixture case in `preview.engine-tree-render.test.ts` | Yes | Yes | TypeError, no image (`m4-red-9.txt`); mutants M4-e7 to M4-e13 each red (alt, embed size, jumbo class, no-file guard, jumbo never, title, unicode alt) | Yes |

The thirteen emoji mutants M4-e1 to M4-e13 each ended red (`m4-mutants-emoji-out/summary.txt`; export `scratchpad/export-m4b`). The no-file guard (`src` empty) is not reachable through the engine at the pin: it returns `©` and `™` as text, and `©️` (with the variation selector, also `:copyright:`) as an emoji whose address is a Twemoji file. The guard stays, driven by a fixture tree that invents engine output, named so (QAF-17), and M4-e10 is red on it.

Slices 2c and 2d (timestamps, field name). TDD Gate: `preview.timestamp-styles` fails as expected: 14 of 15, `AssertionError: expected [] to deeply equal [ '10:13 PM' ]`, the timestamp drawn as source (`m4-red-10.txt`); `page.field-name-links` fails as expected: `AssertionError: expected <a href="https://z.q/"></a>` where the name should stay text (`m4-red-12.txt`). Proceeding to implementation, each.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|----------------|-----------|---------------------|-------------------|----------------|------------------|
| `renderTimestamp`, `MarkdownTimestamp` (nine letters, bare, invalid letter, the zone, mount and locale fixtures) | `preview.timestamp-styles.test.tsx` | Yes | Yes | AssertionError (`m4-red-10.txt`) | Yes (15 of 15); mutants M4-t5 (host locale), M4-t5b (hard-coded en-US), M4-t6 (mount ignored), M4-t7 (`S` short), M4-t8 (always mounted), M4-t10 (bare form `F`) each red |
| the span edit (`Markdown.tsx` `onChange(span, text)`, `renderTimestamp`) | `preview.timestamp-edit.test.tsx` | No: written after the code, the first run was green on 14 of 16 and the 2 reds were my fixture (the engine leaves a timestamp inside a link label as text; the case now says so) | Yes, by mutants M4-t1, M4-t2 (span off by one), M4-t3 (insert for replace), M4-t9 (no edit path), M4-t4 (no key: the re-render case red) | AssertionError by mutation | Yes (16 of 16) |
| `embedHasUrl` to the field name parser | `page.field-name-links.test.tsx` | Yes | Yes | AssertionError (`m4-red-12.txt`); mutants M4-f1 to M4-f3 each red | Yes |

The edit-test row is owed the stub-tree record and is not made; the mutants stand as its red. M4-t11 (`if (!mounted) date = date.utc()` removed) survived, and is equivalent: `date` is read only through `date.toDate()` for the initial state and the comparison, and `.utc()` does not move the instant. The six dayjs styles pre-mount format in the host zone through `dayjs(localDate)`, as before; I did not change them (the plan holds today's output for them). The edit tests drive the real popover in jsdom (open the trigger, choose the `R` button, close it; the commit is the popover's `afterLeave`) and change the format only: the calendar is a dynamic import and its date edit is not driven (the span, not the choice, is the property).

The two rows marked "No" under "Test Written First?" are owed an assertion-level red against a stub-tree copy with the function bodiless, then a green at the real code. The mutants above stand as the red at the pre-change behaviour for each guard; the stub-tree record is not made. This is a TDD deviation of mine, named here. The mutants ran in an isolated export (`scratchpad/export-m4a`, a `git ls-files` copy with `node_modules` linked, driver inline, output to a file).

The renderer-level scheme control uses a fixture tree that invents engine output (the engine returns no `javascript:` or `data:` link); named so, per QAF-17.

## Slice 3: the DOM reader, atoms, the adjustment measurement, the frozen residue list, AC-3.1/3.6/3.7, AC-4.5

Flows (user-visible work). Mention pills and timestamps carry `data-mention-kind`, `data-mention-id`, `data-timestamp` and
`data-timestamp-format`; no visible change (surface: the preview, trigger: as today; rung: the existing pills and
`MarkdownTimestamp`, extended by attributes). A contact link `<a@b.co>` now draws its label `a@b.co` where slice 1 drew
`mailto:a@b.co` (found by AC-3.6's test below; spec-form red `m4-red-18.txt`). No flow holds a decision.

**Reproduction of the recorded counts (steering's finding, refutation helper at `5ccb54d`).** The measurement drivers
were untracked scratch files, and `helpers/previewDom.tsx` was untracked until `cf605d0`, so no commit up to `5ccb54d` reproduced
`m4-dom-residue-*.json`. Disposition: `previewDom.tsx` is committed (`cf605d0`, with its lint fixes at `268b9fb`); the drivers'
texts are records `m4-dom-residue-driver.test.tsx.txt` and `m4-dom-residue-signatures-driver.test.tsx.txt` (placed under
`src/utils/markdown/__tests__/discord/` for a run and removed after); the list those drivers produced is committed data
(`aa728f3`), and the committed live test `discordPreview.legacy-equality.test.tsx` re-derives it and fails on any difference, so the
counts reproduce from commit `268b9fb` by `pnpm test:discord`. The one figure no commit reproduces is the adjustment's reach
(`m4-adjustment-reach-driver.test.tsx.txt`: it needed the module I deleted). The earlier file `m4-dom-residue-before.json` and
`m4-dom-residue-after.json` were taken at an intermediate tree (atom-free inputs only, before the data attributes) and are kept
as records of that round, not as the counts cited here; the cited counts are `m4-dom-residue-all.json` and
`m4-dom-residue-signatures.json` at the list's commit.

**Reader.** `helpers/canonFromDom.ts` reads a mounted preview's DOM into the canonical nodes the visible form already compares
(`canonFromDom`, `drawnLanguages`, `collapseRepeatedStyles`); `visibleForm.ts` takes a `'dom'` side. An atom's kind and id come from
the element's data attributes, never its text (SL-12; the channel's name may be shown, D-17). An emoji's id, name and animated flag
come from the image address. A code block's language is the highlighter's class where it knows it, none where it does not, and both
sides take that (the page cannot show an unknown language). A style inside the same style is one style on both sides (`_*x*_`).

**The adjustment module (D-14): size 0.** One candidate was built test-first (a bare link of a one-character host unlinked,
`adjustments.single-character-host.test.ts`, red `m4-red-14.txt`, green `m4-green-14.txt`) and then removed. Over all 2,378 inputs on the
five surfaces it reached 0 members (`m4-adjustment-reach-after.json`), so AC-3.8 (ii) ("an adjustment that reaches no member fails") and
condition (c) fail. The minimal inputs that looked like it (`http://x)`, `http://x\\`) are legacy's url-end rule over the source text
(probed: `m4-` probe lists in the session scratchpad, 33 host forms), which fails (a). The module and its hook in the adapter were my own
uncommitted work and are deleted; no commit holds them. `parseUnadjusted` was removed with them. Class decisions are in the families
below. Before and after adjustment are the same figures (RK-9, sent to steering).

**The frozen residue list (AC-3.7, plan revision 12; planner R-41/R-42, per-input entries).** `helpers/data/discordResidueList.json`:
6,142 entries over the 2,378 inputs (272 corpus, 106 link, 2,000 generator at seed 20261123) and the five surface-and-mask pairs
(description, field value, title without url, title with url, V2 text), each with its surface, input id and text, its exact signature
(runs of consecutive differing unit positions with their dimensions), and its family. The families, reasons and per-surface counts are
committed beside the entries (SL-13) and copied here; the committed data decides where they differ.

| Family | Name (a grouping label of the minimal input, not a predicate) | Reason | embedDescription | v2Text | fieldValue | embedTitle | embedTitleWithUrl |
|---|---|---|---|---|---|---|---|
| F01 | bare url the engine links and legacy does not, or links over a different extent | (c) one adjustment was tried, a bare link of a one-character host, and reached none of the 2,378 inputs; the rest is a text rule over where a url starts and ends, which fails (a) | 331 | 331 | 338 | 797 | 0 |
| F02 | emoji inside a masked link | (a) legacy reads a masked link holding an emoji by a text rule over the source (G-14); no predicate over the link node and its spans separates the class | 232 | 232 | 236 | 0 | 0 |
| F03 | empty masked link, or a destination holding markup | (a) legacy and the engine disagree on an empty masked link or a destination holding markup; the difference is in how the source is cut, not in the tree | 39 | 39 | 41 | 1 | 0 |
| F04 | quote marker with an empty or one-character body | (b) no predicate over the tree defines the class: a quote marker with an empty or one-character body is read differently by the two parsers | 60 | 60 | 61 | 60 | 84 |
| F05 | guild-navigation chip | (a) Exclusions X-14: the site draws the five static mentions (the guild-navigation chips) as their source text, where legacy draws a chip node; a rewrite of the tree cannot produce the chip | 171 | 171 | 171 | 188 | 240 |
| F06 | emoji, joiner, keycap or flag sequence | (a) legacy and the engine cut an emoji, joiner, keycap or flag sequence at different points; the cut is a text rule | 43 | 43 | 42 | 46 | 23 |
| F07 | list item with an unusual content character | (b) no predicate over the tree defines the class: a list item after a newline with an unusual content character is read differently | 58 | 58 | 70 | 0 | 0 |
| F08 | code span of backtick runs | (b) no predicate over the tree defines the class: a code span of backtick runs is paired differently by the two parsers | 23 | 23 | 26 | 81 | 121 |
| F09 | empty or odd heading | (b) no predicate over the tree defines the class: an empty or odd heading is read differently | 38 | 38 | 11 | 9 | 9 |
| F10 | spoiler runs | (b) no predicate over the tree defines the class: spoiler delimiter runs are paired differently | 15 | 15 | 14 | 14 | 25 |
| F11 | strikethrough runs | (b) no predicate over the tree defines the class: strikethrough delimiter runs are paired differently | 10 | 10 | 12 | 15 | 30 |
| F12 | unbalanced or empty emphasis run | (b) no predicate over the tree defines the class: unbalanced or empty emphasis runs are paired differently | 157 | 157 | 165 | 171 | 244 |
| F13 | timestamp, mention or special-token chip | (a) Exclusions X-14 and AC-4.4: the site draws a command or game mention as its source text where legacy has a node; legacy also cuts @silent, an out-of-range timestamp and short-code forms by a text rule | 93 | 93 | 93 | 68 | 53 |
| F14 | whitespace-only or control content | (b) whitespace-only or control content is trimmed differently | 5 | 5 | 4 | 2 | 2 |
| F99 | backtick, pipe and bracket runs no family names | (a) four minimal inputs of backtick, pipe and bracket runs that no family rule names; the engine and legacy cut them differently by a text rule | 5 | 5 | 5 | 5 | 5 |
| total | | | 1280 | 1280 | 1289 | 1457 | 836 |

Entries by input class: description and V2 text 41 corpus, 14 link, 1,225 generator; field value 37, 14, 1,238; title 57, 38, 1,362;
title with url 40, 2, 794. The generator holds about 95% because it emits unbalanced and empty delimiter runs on purpose. Family
assignment is a regex grouping of each entry's minimal differing input (`m4-dom-residue-all.json`, the build script's rules): a label,
not a class predicate; an entry's family is a claim the reason supports, not a test of its input.
Checks: offline `residueList.check.test.ts` (families agree with entries; an unknown family; a count that does not match; each
failure limb on the real list as a real member and a real non-member) and live `discord/discordPreview.legacy-equality.test.tsx`
(unlisted, signature, stale; run green, `m4-live-legacy-equality.log.txt`, exit 0). Mutants M4-r1 to M4-r7 each red.

**AC-3.1 (content, agree class), live.** For the inputs where legacy and the engine agree in the loose canonical form (more than
1,000 asserted), the DOM equals legacy's tree in the loose form with the two normalisations above (drawn language, repeated style).
Left out and named: inputs holding a command, game or static mention, which AC-4.4 draws as source text (legacy holds a node). I ask the
planner whether AC-3.1 names that exclusion (Outstanding 0 (e)).

**AC-3.6 (content, engine tree), offline.** `preview.dom-equals-engine-tree.test.tsx`: the content preview's DOM equals the engine's
tree in the visible form for every one of the 2,378 inputs (not only the disagree class, which is a subset), but the inputs holding a
command, game or static mention (402) or a timestamp past the safe integers (1: `Number(value)` rounds `99999999999999999`).

**AC-4.5.** `utils.static-pre-transform-gone.test.ts` (the export is absent). The module-graph instrument of AC-2.1 reads package
importers, not a function's callers; `git grep staticParserFor` over `src` has no hit (read by hand, a source-text read, so not a test).

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|----------------|-----------|---------------------|-------------------|----------------|------------------|
| `canonFromDom`, `drawnLanguages`, `visibleFromDom` | `canonFromDom.element-map.test.tsx` | Yes | Yes | ModuleNotFoundError (first row of the module; `m4-red-13.txt`) | Yes (27 of 27 at first; two fixtures of mine re-derived: the highlighter keeps the typed alias) |
| mention and timestamp atoms read from `data-` attributes (`preview.tsx` `atom`, `MarkdownTimestamp`) | same | Yes | Yes | AssertionError, 11 failed (`m4-red-16.txt`) | Yes; mutants M4-a1 to M4-a6 each red (kind, id, seconds and style, on the plain span and on the popover trigger) |
| `collapseRepeatedStyles`, `timestampsByPresence` (removed) | same | No: written with the helper | Yes by stand-in only (the cases' first run was green) | not owed a stub-tree record; named here | Yes |
| contact link label (`preview.tsx` `linkLabel`) | `preview.dom-equals-engine-tree.test.tsx` | Yes | Yes | AssertionError, 39 inputs differ (`m4-red-18.txt`) | Yes (`m4-green-18.txt`); mutant M4-a7 red |
| `residueList.ts` `checkResidue`, `checkFamilies`, `signatureOf` | `residueList.check.test.ts` | Yes for the two checks (ModuleNotFoundError, `m4-red-17.txt`); `signatureOf` No: its two cases were added after the function | Yes by mutants M4-r1 to M4-r7 (each red; M4-r1 survived until the fixture kept the entry measured) | AssertionError by mutation | Yes (11 of 11) |
| the residue list against the live legacy rendering | `discord/discordPreview.legacy-equality.test.tsx` | Yes (the list was cut from the measurement it checks) | Yes: the first run before the contact-label fix and the loose form failed on 176 content inputs; the list check held | AssertionError | Yes (4 of 4, exit 0) |
| the whole live command offline (M3 fix, QAF-32) | `discordOffline.whole-command.test.ts` | Yes | Yes | AssertionError: `Tests 3 failed | 3 passed` (`m4-m3fix-red-1.txt`) | Yes (3 of 3) |
| the drift message at the head of the report (M3 fix, QAF-33) | `discord/discordReports.run.test.ts` | Yes | Yes, with the head write removed in the working tree (restored) | AssertionError, 2 failed (`m4-m3fix-red-2.txt`) | Yes (live 6 of 6) |
| no export `staticParserFor` | `utils.static-pre-transform-gone.test.ts` | No: the function was deleted in slice 1 | not owed (a pure deletion with no behaviour) | n/a | Yes |

I committed `0bc8e02` with one failing case in `canonFromDom.element-map.test.tsx` (a pipeline hid the exit code); `2149ce2` fixes it. The
case's fixture had not allowed for the popover's own empty container beside the trigger. Intra-chain.

Disclosed in the round: no control blocked an action of mine this round.

## Class Sweep

No reviewer finding on M4 yet.

Disclosed in the round it happened: twice, Claude Code's built-in removal check stopped a Bash call of mine that deleted nothing (a Python heredoc whose text held a JavaScript template string with a dollar sign pair). Both times I made the same edit with the Edit tool and ran the commands as separate plain calls. The check concerned how the shell would read that text, not an act aimed at a removal. I did not rephrase the blocked action to pass it.

## Test Execution Results

Slice 2a: `unshare -rn` vitest over `src/utils/markdown src/components src/app/preview`, projects node and dom: 69 files, 1225 of 1225, exit 0 (`m4-run-9.txt`). `pnpm run typecheck` exit 0. ESLint over the touched files: the only hits are `GuildProvider.tsx` `react-hooks/use-memo` (the `Object.values(state)` dependency list, at line 160 of `5ec0621`, unchanged by me; the tool flags the file, and I did not edit shared code the plan does not name) and `MarkdownTimestamp.tsx` (untouched so far; slice 2c's file). `convention-check` CANDIDATE: `page.channel-names.test.tsx` `waitFor` `{ timeout: 5000 }` is a poll budget, the same form `page.invalid-data.test.tsx` uses, not a time-based assertion.

| Command | Result | Capture |
|---|---|---|
| `unshare -rn` (lo up) `npx vitest run --project node --project dom`, tree with slice 1 (the commit this document lands in) | see `m4-suite-slice1.{log.txt,exit}`; the run before the lint and spoiler changes was exit 0, 197 files, 3205 of 3205 | `m4-suite-slice1.*` |
| `pnpm run typecheck` | exit 0 | console |
| `node ~/.claude/tools/convention-check.js website --since=f4060c5` | 0 FAIL, 0 CANDIDATE (the id-token basename check is SKIPPED by the tool: unchecked by tool); by hand, no ID token in a new basename, title or comment | console |

Slice 3 and the tip (`e58f2ed`): `unshare -rn` (lo up) `TZ=UTC npx vitest run --project node --project dom`: 212 files, 3,454 of 3,454, exit 0
(`m4-suite-tip-e58f2ed.{log.txt,exit}`). `pnpm run typecheck` exit 0 (`m4-typecheck-e58f2ed.txt`). Live: `pnpm test:discord`'s
equality and reports files, 4 of 4 and 6 of 6, exit 0 (`m4-live-legacy-equality.*`), run at `aa728f3`'s tree plus the lint-only commit after it.
`convention-check.js website --since=1698c80` at the tip: 1 FAIL, 3 CANDIDATE, 19 SKIP. The FAIL is `GuildProvider.tsx:162`
`react-hooks/use-memo`, a line from commit `003b81f` (an ancestor of the chain base `1698c80`, `git blame`), flagged because the chain
touched the file's `Context` export; I did not edit shared code the plan does not name, and report it as a follow-up (a lint error at
base, severity LOW, shown by `npx eslint src/providers/GuildProvider.tsx`). The three CANDIDATEs are poll budgets of `waitFor`
(`page.channel-names`, `page.field-name-links`, `preview.timestamp-edit`), the form `page.invalid-data.test.tsx` already uses, not time-based
assertions. The id-token basename check is SKIPPED by the tool: unchecked by tool; by hand, no ID token in a new basename, title or comment.

**Self-check sweep** (`mutant-gen.js --range 1698c80..771c64f`, 71 mutants over the product source of the chain's range, run by
`mutation-run.py` in an isolated `git archive` export under `unshare -rn`, suite `src/utils/markdown src/components`):
61 of 71 killed (`m4-selfcheck-771c64f.log.txt`, `m4-selfcheck-mutants-771c64f.json`). Ten survivors, each dispositioned and the ones
that were not equivalent re-run at `e58f2ed` after the tests were tightened (`m4-selfcheck-survivors-e58f2ed.*`; 6 of 9 killed, the 3 left are equivalent):

| Survivor | Disposition |
|---|---|
| `Embed.tsx:98` `!!url` to `!url` | Covered by `src/app/preview/__tests__/page.field-name-links.test.tsx`, outside the sweep's command; killed when that file is in the suite. |
| `MarkdownEmoji.tsx:23` `draggable={false}` to `true` | Not asserted. `preview.emoji-draw.test.tsx` now asserts `img.draggable` is false; killed. |
| `MarkdownTimestamp.tsx:45` `if (!mounted) date = date.utc()`, two operators | Equivalent: `date` is read only as `date.toDate()`, and `.utc()` does not move the instant (M4-t11, slices 2c and 2d). |
| `MarkdownTimestamp.tsx:65` `\|\| !onEdit` to `&& !onEdit` | Equivalent: `onChange` is the popover's `afterLeave`, wired only in the branch that holds `onEdit`, so it is never called without it. The guard stays for the type narrowing. |
| `preview.tsx:42` three truncations of the thread search's receivers | The case with threads under two listed channels now fails each (`preview.mention-table.test.ts`); killed. |
| `preview.tsx:107` `&&` to `\|\|`, `>` to `>=` | The engine returns no `masked` or `contact` link without label nodes at 0.16.0 (`[](u)` is text; probed), so no input reaches the guard. A fixture tree that invents engine output now drives it (`preview.engine-tree-render.test.ts`, named so, QAF-17); both killed. |

**Named mutants** (QA document, "Named mutants"), each made as one change in an isolated export and the suite run on it:
NM-1 (the label text as `href`): red, `m4-mutants-final-rerun-out`; NM-8, NM-9, NM-10 (timestamp target by search, n-th match,
`localDate` not resynced): M4-t1 to M4-t4 and M4-t9, each red, `m4-mutants-timestamp-out/` (slice 2c); NM-24 (allow-list removed): red,
`m4-mutants-final-2149ce2-out`; NM-26 (the pre-transform export back): red, `m4-mutants-nm26-out`; NM-27 and NM-48 to NM-57 (mentions):
M4-n1 to M4-n14 each red, `m4-mutants-mentions-out/`. NM-38 to NM-47 and the plan's AC-4.7 rows (timestamp styles): NM-45 and NM-46
are the M4-t5 and M4-t5b mutants, red. Not yet built or unplaced: NM-2 to NM-7, NM-11 to NM-23 and NM-28 belong to M2, M3, M5 and M6
(guards a later milestone builds, or built and recorded in an earlier document). SL-12's atom dimensions each differ under a mutant:
kind (M4-a1), id (M4-a2), seconds and style on both the plain span and the popover trigger (M4-a3 to M4-a6); none reported unable to differ.

## Outstanding Items

0a. **For the planner (plan questions, nothing blocked).** (c) AC-3.7: per-input entries as planner ruled; the family set is a grouping, not predicates. (d) The adjustment module is size 0; if the plan keeps "its size is recorded at M4" as a gate, the figure is 0 of 0 reached. (e) AC-3.1 holds for the agree class except inputs holding a command, game or static mention: AC-4.4 draws them as source text (X-14) and legacy holds a node; the plan's AC-3.1 names no exclusion. (f) AC-3.1 and AC-3.6 are compared in the visible form with `drawnLanguages` and `collapseRepeatedStyles`, not in the plan's loose canonical form alone, since the loose form counts `i(i(x))` and an undrawn code language as differences; AC-3.1's live run uses the loose form with those two normalisations. (g) A timestamp past the safe integers (`<t:99999999999999999>`) renders from `Number(value)` rounded: one input, left out of AC-3.6, X-item owed. (h) AC-4.5's "module-graph instrument" reads package importers; a function-caller read has no instrument in the record (Outstanding 3).
-1. **CR-11 (LOW, M3, code review's note at `2c1590f`):** the XHR Proxy records when the returned function is called, so `x.upload.addEventListener` and a bare `x.readyState` read record nothing; the network stays closed. Not done this round; I take it with the next M3 touch or state the gap in the M3 Class Sweep if no round comes (code review checks it at M4's round).
0. **Emoji, decisions to read (slice 2b).** (a) Today's `jumboify` has had no caller since `fae733f` (2023), so the site's preview never drew a large emoji; the helper now does, by the rule the corpus shows: a message of only emoji and whitespace is large (`dom-all-bot.json`: `:smile:`, a skin-toned emoji, two emoji with a space, two custom side by side are large; `**:smile:**` and `a:smile:b` are not). That is a visible change from today, stated in the plan (CF-10) and not asked. The limit (27, from `jumboify`) and the multi-line, quote and embed cases have no Discord observation: X-25. In an embed the size stays 18, as `discordEmoji` had it. (b) The plan contradicts itself on the custom emoji's `alt`: AC-4.4 says `:name:`, M4's "output unchanged" would keep `<:name:id>`. I took AC-4.4's, which is also what Discord's DOM shows (`an7-g13-dom.json`); for steering to confirm with the planner.

1. **M3 fix round is owed first** (code review REJECTED M3: CR-5, CR-6 MEDIUM; CR-4's remainder, CR-7 to CR-9 LOW). M4 slice 1 is committed on the same branch at a different set of paths; the M3 fix lands as its own commits.
2. **Mentions** are built (slice 2a). Recorded limits, per AC-4.4's Residue and SL-11: the name is the list's at fetch time (5 min client, 10 s server); category, archived-thread and unlisted ids render `#<id>`. The human-observable form (UAT B-7) needs a signed-in local production build, not run here. The bigint note: the engine gives the channel id as a `bigint`, so the lookup compares `String(id)`, exact beyond 2^53.
3. **(Slice 3 update, the earlier list below is stale)** Built: the DOM site limbs of AC-3.1, AC-3.6, AC-3.7, AC-4.1; the adjustment measurement and the frozen residue list; AC-4.5's removal. Not done: removal of the now-dead `react` functions of `staticBaseRules` (no preview caller; `rules.tsx`'s interactive parsers still spread the rules, so the removal belongs with M6's removal of the package, AC-6.6); AC-4.2's UAT form; the stub-tree red records named above. **Earlier list:**  the emoji display helper (CF-10) and the emoji renderer (the engine's `emoji` node draws as source text for now); timestamps (AC-4.3, AC-4.7); field name with an embed url (the preview has no embed-url flag at the field; it uses the title mask, AN-8 table, row "Field name, embed has url"); the adjustment module, the frozen residue list and AC-3.8 (ii); the site-DOM limbs of AC-3.1, AC-3.6, AC-3.7 and AC-4.1; AC-4.2's UAT form; AC-4.5's module-graph instrument over the reader sites (slice 1 removes the only caller; the instrument and `staticBaseRules`' `react` functions are not yet removed).
4. The decision to render a paragraph's line ending as `\n` only between siblings (not after the last) is mine, taken from the text the engine gives and the `white-space` rules in `visualizer.scss`; the visible-form comparison against the legacy tree is the instrument that will confirm or correct it (slice 2).
5. Self-diagnosis (method): I wrote the renderer, then the not-ready cases and the subtext case after it, so two rows lack a red-first. I should have written each case before the branch it covers.
6. R-30 (planner, record `9caf57ff`): M6 does not exit while `MOUNTED_BASE_RED`, `EDITS_BASE_RED` or `holdsEmoji` is in `src`; check `git grep -c "BASE_RED\|holdsEmoji" <tip> -- src` prints nothing.

## Next Steps

Code review of M4 at `e58f2ed`; the M3 fix round (Round 5 in the M3 document) goes to code review and then QA's refresh pass; QA Phase 2 on M4 after review.

## Resumption State

Written at the checkpoint after M4 slices 2a to 2d and M3 fix round 4, for a `/clear` (context 302K).

- **Done.** Website chain branch `chain/019-slate-formatting-discord-engine`, HEAD `6379abc`, no uncommitted source work (`?? .playwright-mcp/` is foreign). In order: `f131f06` mentions (AC-4.4, D-17); `c32e058` emoji display helper (`emojiDisplay.ts`) and renderer; `2c1590f` M3 fix round 4 (CR-10); `36924ae` timestamps (AC-4.3 span edit, AC-4.7 nine styles); `6379abc` field name with an embed url. Every slice has its red run, green run and mutant records under `verification/019/impl/m4-*`, and its rows are in this document above (the slice 2a to 2d TDD rows, Files, Outstanding 0 and -1). Full offline suite last run at `2c1590f` (204 files, 3348 of 3348, exit 0); a partial run after `36924ae` over `src/utils/markdown src/components` was 71 files, 1216 of 1216. Not yet re-run whole at `6379abc`.
- **M3.** Approved with comments by code-reviewer-019 at `2c1590f` (record `6c55e994`, R-36), handed to qa-019. CR-11 LOW (the XHR Proxy records at call, not at read: `x.upload.addEventListener` and `readyState` reads record nothing) is mine to take or state as a limit; I carry it as Outstanding -1; reviewer checks it at M4's round.
- **Next, in order.**
  1. Whole offline suite in `unshare -rn` (`TZ=UTC`, the timestamp tests set their own zone) and `pnpm run typecheck` at the tip; `convention-check.js website --since=1698c80`, dispositioning each FAIL/CANDIDATE (known: `GuildProvider.tsx` `react-hooks/use-memo` is pre-existing at `5ec0621` line 160; the `waitFor` timeout CANDIDATEs are poll budgets).
  2. The M3 residue measurement re-run (the corrected game mention changed the generator; M3 document Outstanding 11), then the adjustment module choice by (a), (b), (c) of the plan's M4 ("The adjustment module", D-14), the frozen residue list as data, AC-3.7, AC-3.8 (ii); then the site-DOM limbs of AC-3.1, AC-3.6, AC-4.1 (a `canonFromDom` over the renderer's output: tags `strong`, `em`, `u`, `s`, `code.inline`, `a`, `h1` to `h3`, quote div, `ul`, `ol`, `li`, `pre>code`, `.spoiler`, `.discord-visualizer__subtext`; M3's Findings 4 is a text-family grouping; M4 needs the tree predicates).
  3. AC-4.5's module-graph instrument and removal of the now-dead `react` functions of `staticBaseRules` (no preview caller since `93b26fd`; `rules.tsx`'s `match` and `parse` stay for the interactive parsers until M6; `discordTimestamp.react` already passes `mounted` and no edit).
  4. Stage self-check: `mutant-gen.js --repo <export> --range 1698c80..<tip>` in an isolated export (`scratchpad/export-m4b` holds a copy; re-export the tip), the Named mutants NM-1, NM-8 to NM-10, NM-24, NM-26, NM-27 (and the plan's NM-38 to NM-57 where built) made by hand and recorded, `Handoff-At` set, hand-off to `code-reviewer-019` by SendMessage naming the document and SHA.
  5. Optionally CR-11's preferred fix (record in the Proxy's `get` trap; add a second XHR to the locators case whose first touch is `x.upload.addEventListener`, placed neither first nor last).
- **Rulings that bind.** Mentions: AC-4.4's table; list from `useGuildChannels()` (null outside provider); `Context` default unchanged. M4 and M6 revision cap (17:56Z): a gap below HIGH is a stated limit. R-30: M6 does not exit while `BASE_RED`/`holdsEmoji` are in `src`. AC-4.7 gaps go to steering first (18:02Z).
- **For steering to put to the planner (Outstanding 0 of this document).** (a) The plan contradicts itself on the custom emoji `alt`: AC-4.4 says `:name:`, M4's "output unchanged" keeps `<:name:id>`; I took AC-4.4's. (b) The preview now draws large emoji, which today's site never did (`jumboify` has had no caller since 2023); limit 27 and the multi-line, quote and embed cases are X-25.
- **Approach in flight.** None.
- **Local state not restored.** None. Scratch only: `scratchpad/export-m4b` (disposable mutant export; `mutate.cjs` driver and the mutant specs `mut-*.json` sit in the session scratchpad `13713b6c-.../scratchpad`), the older `f233c0c0-.../scratchpad/probe.mjs` and `probe2.mjs` (print a lossless tree: `node probe.mjs '<text>'`).
- **Evidence run but not recorded.** None.
- **Questions sent.** None open. M3 re-hand message sent to code-reviewer-019 (answered: approved).
- **Cache-warm wake.** Job `6ceb201a` deleted at this checkpoint. Arm a new one on the next turn.
