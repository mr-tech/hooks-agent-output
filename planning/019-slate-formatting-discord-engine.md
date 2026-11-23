---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: >-
  Revision 0, ready for critique. Implementation is not approved. Before M2 can start, the analysis M1 commissions must land,
  four OPEN QUESTIONs (OQ-1 to OQ-4) need his answers, and the critic, the architect's conformance pass and QA Phase 1 must
  pass this revision. The website tree is held by the fixer queue (9e next) in his order (effort rulings block 09:18Z).
Revision: 0
Target-Release: "website master → Vercel production, one release carrying M2 to M7 (preview and editor together, AF-2)"
Epic-Alignment: "Slate formatting effort (effort rulings `steering/fixer-queue-2026-11-21-rulings.md` blocks 09:07Z, 09:18Z); no roadmap epic"
Lane: full
---

# 019 — Slate formatting: one Discord engine for the preview and the editor, with a Discord-derived fuzzer

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-11-23T15:33 | 0 | planner-slate-formatting | Plan created from brief `steering/slate-formatting-brief-planner.md`, common brief `steering/slate-formatting-brief-common.md`, effort rulings blocks 09:07Z to 15:29Z, inventory `verification/slate-formatting-effort/scoping/inventory.md`, research `research/slate-formatting-discord-oracle-2026-11-23.md` (read at record `b668ea1d` content), architect findings `architecture/slate-formatting-preview-architecture-findings.md` (`86418be`). Scope delta: none (first revision). Size against the original ask: every in-scope inventory row is carried by a milestone or declined in Exclusions; the fuzzer is a suite deliverable (M3). |
| 2026-11-23T15:47 | R-1 | planner-019 | Registered research G-14 as a Planner batch row; its words live in `research/closed/slate-formatting-discord-oracle-2026-11-23.md` (record `a666dbd9`), Remaining gaps G-14. |

## Header notes

- **Plan ID** 019, minted from `.next-id` (19 → 20, record `ae3d41fb`).
- **Target Release.** The website's one serving ref is `master` on origin. A push to it deploys to Vercel production. Read in this
  pass, 2026-11-23: `git -C website ls-remote origin` lists heads `master` `af3d95a`, `backup`, `external-message-api`, `redesign`
  and `regex-refactor`. `website/.github/workflows` is absent. `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website
  master af3d95a --dry-run` exits 0 ("workflows none … DRY RUN: every check passed"). `--report` exits 0 ("one serving ref at origin
  (master); no pair"). The capture is `verification/019/planning/release-move-dry-af3d95a.txt`. No other chain's push to `master`
  is queued with this one. The fixer queue's 9e takes the tree first and releases on its own (block 08:55Z order). The push is
  devops's act, under his release answer. The package has no `version` field, so no version artefact moves; the release work is
  naming what the deploy moves (§ Version Management).
- **Base.** website `master` `af3d95a`, released to production at 2026-11-23T15:29Z (`qa/closed/website-af3d95a-release-tip-qa.md`,
  changelog row 15:29). The inventory was taken at `0411d3b`. Between the two, `git diff --stat 0411d3b af3d95a -- src` touches 8
  files, all inside the Slate block layer: `withNormalizeNode.ts`, `getInitialValue.ts`, `flattenNodeText.ts`, the new
  `codeFence.ts`, `@types/slate.d.ts`, and three test files. The inventory's rows for `decorator.tsx`, `rules.tsx`, `utils.ts` and
  `Markdown.tsx` are therefore unmoved. Its Slate-layer rows (S-17, S-29) are re-read at `af3d95a` in M6.
- **Lane: full** (not small). It adds a production dependency and a new layer, and it changes the shared preview path that
  `/preview` and the generator use.
- **Architectural surface: adds.** It adds a new layer (one adapter module over `@discord/markdown-wasm`) and a new production
  dependency. The architect's conformance pass is a named step of the chain, and the architect's findings are its pre-planning
  input. Read before this line: `system-architecture.md` Components (website), Dependencies, the Problem Areas rows at lines
  239-241, D-001 and D-003; `website.md` W-3 and W-4. Lines the chain will close or invalidate, for the deployment record to route:
  - The Problem Area "The site's markdown is a hand-kept copy of Discord's rules in two rule sets" (Medium) closes on landing.
  - The Problem Area "The editor reads highlight.js's private emitter tree" (Low) closes only if M5's S-14 limb lands (OQ-4 below).
  - The Components line "Packaging: pnpm with a patched dependency (`simple-markdown` via `patches/`)" stays true, because the Slate
    emoji lift keeps it (X-8).
  - The Dependencies line gains the package and its exact pin.
  - D-001 and W-3 are held, not changed: one engine for both views.
- **QA sequencing.** QA Phase 1 runs before implementation, as the stage set requires (block 09:18Z).
- **Disclosure.** Two read-only website lookups made in this pass were not completed, then re-run (effort rulings block 15:29Z).

## Value Statement and Business Objective

As a Hooks user composing a Discord message, I want the editor's colouring and the preview to format every input the way Discord
does, and to keep every character I type, paste or load, so that what I build on Hooks is what Discord shows when it is sent.

This serves his words at 09:07Z and 09:11Z (D-1, D-3): every Slate formatting fix in one effort, held to Discord's behaviour, with a
fuzzer or intensive check over the edge cases. The plan delivers the value itself. Preview and editor move together (AF-2), and the
fuzzer lands in the suite. No core part is deferred. The value statement carries no measured figure.

## Decisions Register

Every row is a decision he has settled. Rulings come from `steering/fixer-queue-2026-11-21-rulings.md` (the "effort rulings"),
except D-8.

| ID | Decision (every operative clause) | Date | His words, verbatim, and route | Reopened by |
|---|---|---|---|---|
| D-1 | Every not-yet-started Slate or formatting fix goes into one effort, and that effort delivers a fuzzer or intensive check that covers the edge cases. | 2026-11-23 | "If at all possible, it'd be nice to batch any other future formatting fixes, basically any Slate related fix, into a singular effort, whether that be a fixer change or a full chain. I do not know, but I would like them all grouped into one. And then alongside that should be some kind of fuzzer and or intensive check just to try and cover every single edge case." Relayed by `steering-hooks-fixer`, block 09:07Z (said in that session). Steering's reading of which items move is agent-authored (same block). | Owner withdrawal only. Consequence: M3 is a deliverable that stays in the suite. |
| D-2 | Hyperlink formatting is in scope. | 2026-11-23 | "one thing that definitely needs to be looked at is hyperlinking, since I believe there's something off with the formatting there." Relayed, block 09:10Z. | Owner withdrawal only. Consequence: LF-1 to LF-6 and the link limbs of M3 to M5. |
| D-3 | The standard is Discord's own formatting behaviour, and many defects are expected. | 2026-11-23 | "I tried my best to get the Slate implementation to be the same as Discord's, but Slate is really difficult to use. So there's undoubtedly a ton of bugs in the implementation." Relayed, block 09:11Z. | Owner withdrawal only. |
| D-4 | Discord's own served code may run as a test oracle, in the test environment only: fetched from public assets at test time, never committed, never shipped. | 2026-11-23 | Asked: "I mean, there shouldn't be any issue in just running the code in the test environment, right? As long as we don't actually ship that code." Then: "Yeah, I mean, we're just using it in test, so I don't see any issue." Relayed, block 09:17Z. The bounds are steering's statement, which his answer accepted. | Owner withdrawal only. Consequence: the legacy oracle (M3) is fetched per run, and a run that cannot fetch it has no expected values (OQ-3). |
| D-5 | Where Discord's two formatters disagree, the site is held to Discord only where both agree. The disagreeing cases are listed as known differences. | 2026-11-23 | By selection: "Agent: match only where both agree (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "the fuzzer and tests hold the site to Discord only where they agree; the disagreeing cases listed as known differences until Discord's switch ends". Ledger `steering/selection-ledger/2026-11-23.md`, block "2026-11-23T13:09Z — steering-hooks-fixer"; effort rulings block 13:09Z. | Owner withdrawal, or the option's own stop condition: "until Discord's switch ends". That is observable as M3's drift alarm, plus a read of the two experiments (research V-2) showing one parser served. |
| D-6 | The site uses Discord's published formatter, `@discord/markdown-wasm`, for the preview and the editor's colouring. Both switch in the same release, the plan opens with a build check, and the old formatter stays in tests only. | 2026-11-23 | By selection: "Agent: use Discord's formatter (Recommended)". Option text, agent-authored (`steering-hooks-fixer`), from the architect's findings: "one engine drives the preview and the editor's colouring; the plan opens with a build check; preview and editor switch in the same release; the old formatter stays in tests only". The option also stated that on the 33 disagreeing cases the site shows the new formatter's way. Ledger, same day file, block "2026-11-23T15:23Z — steering-hooks-fixer"; effort rulings block 15:23Z. | Owner withdrawal. Or M1's build check (AN-1) failing, which returns the choice to him with the architect's fallback A (findings § Verdict). |
| D-7 | A defect or leftover a stage finds in this effort's code is fixed without a fix-or-not question to him. A product-behaviour choice with more than one reasonable answer is still put to him. | 2026-11-22 | "Just fix everything you find along the way." Relayed, block "2026-11-22T04:50". It is in this effort's rulings file, so it binds here (GLOSSARY, "Ruling scope"). | Owner withdrawal only. Consequence: fuzzer finds in the region are in scope (scope statement). OQ-1 and OQ-2 go to him as behaviour choices. |
| D-8 | A timestamp edit in the preview always changes the timestamp clicked, in both cases (code-span miscount, re-render index), with tests for each and for normal editing. | 2026-11-22 | By selection, option A: "Agent: fix both (Recommended)". Option text, agent-authored (`steering-hooks`): "Editing a timestamp always changes the one you clicked, in both cases, with tests for each and for normal editing." Ledger `steering/selection-ledger/2026-11-22.md`, block of 04:0xZ. Carried from `steering/fix-timestamp-edit-target-rulings.md` block "2026-11-22T04:03", moved into this effort by effort block 09:07Z. | Owner withdrawal only. Consequence: S-10 in M4. |
| D-9 | The third-party clients' per-client checks stay not done. Third-party clients are a footnote. | 2026-11-23 | By selection: "Agent: leave them not done (Recommended)". Ledger, 2026-11-23 file, block "2026-11-23T09:31Z — steering-hooks-fixer"; effort rulings block 09:32Z. | Owner withdrawal only. Consequence: Exclusions X-10. |

The scope statement is quoted verbatim from block 09:18Z in § Objective. It narrows nothing that may be reconsidered beyond what it
says. It carries no expiry: a member found later inside the region is in scope on steering's ruling (same block), and a member
outside the region is a re-scope.

## Objective

The scope statement, verbatim (block 09:18Z): "(website, the region in the inventory's region table: `src/components/SlateEditor/**`,
`src/utils/markdown/**`, `src/components/Markdown*.tsx`, and the editor surfaces that mount them). The editor (typing, paste, load,
save, colouring) and the preview render every input the way Discord does and lose no character. A fuzzer or intensive check, with a
Discord-derived oracle, enumerates the class and stays in the suite. In: S-01..S-06, S-08..S-10, S-13, S-14, S-17, S-18,
LF-1..LF-6, and every defect the fuzzer finds in the region. S-07 (emoji stored as `:name:`) is in, as a question for him through
the plan." Steering added S-29 inside the region (common brief).

His standard (D-3), narrowed by D-5 and reframed by this plan for criteria: the preview and the editor are judged against Discord
only on inputs where Discord's legacy and native formatters agree. Everywhere else, the site follows the native formatter (D-6), and
a generated known-differences list names the case. Original wording beside the reframe: "the editor is meant to match Discord" (block
09:11Z heading, steering's).

### Inventory carriage (every in-scope row)

| Row | Carried by | Note |
|---|---|---|
| S-01 nested runs lose the outer style | M5 | Cause removed: width inference is deleted. Came from `TODO.md` "fix-decorator-nested-styles". |
| S-02 nested highlight.js scope in a code line | M5 | Code-line path. |
| S-03 zero-length highlight.js scopes | M5 | Code-line path. |
| S-04 ranges past a line's end | M5 | |
| S-05 the `_` inside a renamed emoji pairs | M5 | Cause removed: the parse runs over the typed text. |
| S-06 static render manufactures `:ok:` | M4 | Cause removed: the preview no longer pre-transforms. |
| S-07 emoji stored as `:name:` | OQ-1, then M6 | |
| S-08 guild emoji from the picker | M6 (UAT walk) | From handoff 5b19c3e4, item 1. |
| S-09 IME after an emoji | M6, stated limit | From handoff 5b19c3e4, item 2. The handoff stays its carrier. |
| S-10 timestamp edit target | M4 | Came from 9d; D-8. |
| S-13 lift the corpus and the walk runner into the suite | M3 | From `TODO.md` "website editor tests: lift…". |
| S-14 highlight.js private `_emitter` | M5, OQ-4 | |
| S-17 escape rewritten on open | M6 | |
| S-18 real-browser assumptions of the decorator | M5 (UAT walk) | |
| S-29 a fence typed above a quote drops `> ` | M6 | Re-read at `af3d95a`. |
| LF-1 emoji pre-transform rewrites link targets | M4 (preview), M5 (editor) | |
| LF-2 emoji beside links stored as `:name:` | OQ-1 (it is S-07) | |
| LF-3 bare-URL end rule | M4/M5 by the engine, M3 asserts | |
| LF-4 `<…>` scheme | M4/M5 by the engine, M3 asserts | |
| LF-5 list lines uncoloured | M5, subject to OQ-2 | |
| LF-6 embed-title link behaviour | M4/M5 per surface mask (AN-3) | |
| LF-7, LF-8 | no finding | M3's corpus keeps them as agreement rows. |
| LF-9 coverage gap | M3 | |

The research's five items (Recommendations item 4), by name:
- **OQ-3 / G-3** (embed and Components V2 rule sets): carried by AN-3 and the M2 masks.
- **G-8** (module-id stability): carried by AN-4 and M3's predicate-based locator, which fails loudly.
- **G-9** (editor and embed rule sets against the oracle): carried by M3, over every surface.
- **G-11** (the native parser seen rendered, read as test account 2): carried by AN-7, with the stated limit there.
- **G-13** (real role, command and usable emoji ids): carried by AN-7.

## Assumptions and open questions

Where the estate was searched: website `af3d95a` (`git grep` over `src`, read 2026-11-23); `@discord/markdown-wasm` 0.16.0,
`-types` 0.14.0 and `-react` 0.12.0 (`npm pack` into this session's scratch, read and, for the wasm, run); preview-image-generator
`prod` `8512a1d` (`git show 8512a1d:src/generateImage.ts`).

Premises read or run in this pass:
- **P-1 (run)**: `parse` returns no spans and no source text. Run under Node 0.16.0 over four inputs, with the output kept at
  `verification/019/planning/parse-spans-probe.out`. No `span` key appears in any `parse` result. A bare `https://x.y🙂` comes back as
  `{type:"link", value:{url:"https://x.xn--y-bz3s/"}}` (punycoded host, `/` added, no text). `[a](https://x.y/🙂)` comes back with
  `url` `https://x.y/%F0%9F%99%82`. This settles the architect's unread "whether `parse` nodes carry spans" (AF-2): **they do not.**
  So S-10's edit target and a detected link's label cannot come from `parse`. They come from `parseLossless`, or from the source
  text. AN-5 picks the form.
- **P-2 (read)**: the generator captures on `page.goto(url, { waitUntil: 'networkidle0' })`, then calls `page.screenshot` with no
  DOM-readiness wait (`preview-image-generator@8512a1d src/generateImage.ts:generateMessagePreviewImage`; puppeteer `^21.1.0`).
  This settles the architect's "not completed" read (AF-7): there is no page-side readiness signal, only network quiet. A wasm
  compile and the first parse that finish after the network goes quiet are a race (RK-2, AN-2).
- **P-3 (read)**: the browser loader is `WebAssembly.compileStreaming(fetch(new URL("./lib/discord_markdown_wasm_bg.wasm",
  import.meta.url)))` (`@discord/markdown-wasm@0.16.0 src/compile-module.js:compileModule`), selected by the `#compile-module`
  import condition. `initSync` takes a `WebAssembly.Module` (`src/parse.d.ts`). The package is `"type": "module"` and depends only on
  `@discord/markdown-types` 0.14.0. The wasm's SHA-256 is `da7b9e5e…57fb0`, equal to research V-4.
- **P-4 (read)**: the parse-engine consumers at `af3d95a` are `MarkdownProvider` (`useValue`, the lazy client import), the
  `DiscordContentEditor` trio, `ContentBody`, `TextDisplayEditor`, `Embed` (description), `EmbedTitle`, `EmbedField`, `SlateEditor`,
  `decorator`, `getInitialValue` and `withNormalizeNode` (the last two through `parseEmoji` only). Taken from `git grep -n` over
  `src` at `af3d95a` for the import specifiers of `simple-markdown`, `~/utils/markdown`, `dynamics/Markdown` and
  `dynamics/SlateEditor`: 34 lines, 25 of them outside `__tests__` (`grep -c` over the saved listing
  `verification/019/planning/markdown-importers-af3d95a.txt`, 2026-11-23), plus the `useMarkdown()` consumers read in the same pass.

**OPEN QUESTION OQ-1 (S-07, his; blocks M6's emoji limb only).** Today an emoji typed as a character is stored and sent as its
`:name:` form. For example, 🙂 next to text reaches Discord as `:slight_smile:` (inventory S-07, run). Discord draws a typed
`:name:` as the same emoji image, with `alt` set to the `:name:` (research V-20), so in a rendered message the two look alike. They
differ in three places: the stored and sent text differs from what was typed; inside inline code or a code block, the name shows as
text; and copying from Discord gives the name. Options for him:
- *Agent: keep storing `:name:` (today's behaviour)*.
- *Agent: store the character as typed (Recommended)*. This matches what Discord's own box sends, and the editor already shows the
  image.
- *You: say how*.

The cost of the recommended option, as one M6 limb: the serialiser (`flattenNodeText.ts`, `onCopy.ts`) writes the character. Stored
messages already holding `:name:` are unchanged. Not re-derived: whether Discord's own box sends the character. AN-7 reads it in the
text box walk.

**OPEN QUESTION OQ-2 (his; blocks M5's heading and list limb).** Discord's text box leaves `# ` headings and `- ` / `1. ` list
markers unstyled. It also styles each line on its own, so a run that crosses a line break is plain in the box (research V-21, legacy,
observed). The native token mapping gives heading and list markers nothing too (V-11, module 818948), so both Discord paths agree.
Today the site colours `# ` (LF-7) and, by LF-5's fault, leaves list lines entirely uncoloured. Options:
- *Agent: follow Discord's box (Recommended)*. No marker styling for headings and lists, and each line styled alone. This is what his
  agree-only standard (D-5) gives when it is applied to the box.
- *Agent: keep colouring heading markers*. A known difference from Discord.

**OPEN QUESTION OQ-3 (his; blocks M3's form).** The Discord oracle needs discord.com at test time (D-4). Options:
- *Agent: a separate suite command that fails loudly offline (Recommended)*. The standing `pnpm test` holds every property, the
  finite mapping tables and the stored corpus's frozen inputs. It runs offline and stays green with no network. `pnpm
  test:discord` holds every case whose expected value comes from Discord, and it fails, not skips, when the oracle cannot be fetched.
  It runs at every release gate (QA Phase 2 and 3) and on each pin change.
- *Agent: one suite, oracle cases fail offline*. `pnpm test` goes red with no network.
- *Agent: one suite, oracle cases skip offline*. A run with no network reports no Discord comparison and passes.

The cost of the recommended option: "stays in the suite" (D-1) is met by a committed vitest project that release gates run, not by
the default command. The option says so.

**OPEN QUESTION OQ-4 (S-14; the planner's, put to the architect at conformance; not his).** Which public highlight.js 11.12.0
surface gives the token tree, if any, in place of `_emitter.rootNode`. Read owed in AN-6. If none exists, S-14 is a stated limit
carried by the existing Problem Areas row, and that row stays open.

Scope assumptions that a design predating the plan (the architect's findings) makes, listed so the critic can test them:
- **Unit**: one adapter for all five surfaces (content, embed description, embed title, field name, field value), with Components V2
  text display as a sixth, distinguished only by `Syntax` mask.
- **Reach**: the read-only preview branches and `/preview` (the generator's route) move with the editor surfaces.
- **Layer**: the Slate block layer (quote and fence recognition, `flattenNodeText`) stays the site's own (AF-9).
- **Emoji lift**: the Slate emoji element (`parseEmoji`) stays on `simple-markdown`. This is the planner's choice, not the
  architect's (X-8).

## Plan

### M1 — Analysis before code (REQUIRES ANALYSIS; REQUIRED before M2's implementation approval)

Commissioned to the analyst; its document, to be created under `analysis/`, is named 019-slate-formatting-discord-engine-analysis.md. It inherits ID 019. The analyst works
only on the items below. Its outputs are captured under `verification/019/analysis/`. Exports are taken with `git archive af3d95a`
with a **copied** `node_modules`, never a symlinked one: Turbopack refuses a symlinked `node_modules`
(`handoff/bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md` item 1). Any local save on a build first moves message ids out
of production's range (workspace `CLAUDE.md`).

- **AN-1 Build spike (AF-5; first act, D-6's "build check").**
  - In an export with the package added at exact `0.16.0`, `next build` (Turbopack, the repo's `build` script) emits the wasm as a
    served asset, and the editor page and `/preview` initialise it in Chrome under `next start`.
  - If the `new URL(…, import.meta.url)` form is not emitted, the fallback runs: `initSync` with a bundler-supplied
    `WebAssembly.Module`.
  - Records: the editor page's markdown chunk bytes before and after, raw and gzip; the wasm response's `content-encoding` and
    bytes under `next start`; time from navigation to the first formatted render, median and p95 over 20 loads.
  - A Vercel Preview deployment of the spike branch is devops's act, if the project builds branch previews. That is unread: devops
    reads the project's Git settings with the look-only CLI (block "2026-11-21T19:02"). Where previews exist, it records the same
    three numbers there.
  - **Fail**: no form initialises under `next build`. That returns D-6 to him (its reopening class).
- **AN-2 Generator capture (P-2).**
  - Drive puppeteer at the generator's own pinned version (`8512a1d` `package-lock.json`), with its exact `goto` options, viewport
    and screenshot, against the spike's `/preview`. Use 50 captures each of three messages carrying bold, a masked link and a
    spoiler.
  - Count captures whose DOM at screenshot time holds the formatted elements. Read with `page.content()` right after
    `screenshot()`, and save the JPEGs.
  - **Pass**: 150 of 150 formatted. Otherwise, measure the gap between network quiet and the first formatted render.
  - The remedy is outside the region: a generator wait is a re-scope to steering. The other candidate, a page that holds a
    request open until formatted, is the analyst's to state, not to pick.
- **AN-3 Surface masks (OQ-3 / G-3; research H-3).**
  - Which syntax Discord parses in each of: embed description, title, field name, field value, footer and author (the last two are
    not markdown on the site today; confirm), and Components V2 text display.
  - Read both parsers: legacy `EMBED_TITLE_RULES` and the others in the served rule module, and the native mask if the embed
    renderer is located in the lazy chunks.
  - Then confirm on the test server. The test bot posts embeds and a V2 text display carrying one discriminating case per syntax bit
    to `slate-oracle-walk`, read as test account 1.
  - Output: a table, surface × `Syntax` bit → allowed, legacy, native, rendered.
- **AN-4 Legacy oracle in the test environment (G-8; D-4).**
  - Can the legacy facade (`parseToAST`) and the legacy text-box table (rule-to-Slate, research V-1 module 339200) run under Node
    from assets fetched at test time, or is a headless browser needed?
  - If a browser is needed, which driver (a new devDependency) and what it costs per run.
  - Locator: module content predicates (research V-1 table), failing when a predicate matches zero modules or more than one.
  - Re-run the predicate table on the stable build current at the analysis, against research V-13's build 679055.
  - Report: run time over the 272-case corpus, and the failure modes when discord.com is unreachable or the page changes.
- **AN-5 Which tree the preview renders from (P-1).**
  - For each node kind whose rendering needs source text or a span: detected and auto link labels (what Discord draws as the label
    of a bare URL — read from the research walk's DOM captures, or re-posted), the timestamp edit target (S-10), the code block's
    language as typed.
  - Settle whether the preview renders from `parse` plus source slices, or from `parseLossless` alone. Name the form chosen, with its
    reason.
- **AN-6 Editor token mapping.**
  - Discord's native token-to-decoration mapping (module 818948) as a table, token kind × node context → leaf classes. Read from the
    served bundle as prose; nothing is copied (D-4).
  - Run the legacy text-box table over the corpus to give per-character expected styles.
  - Report the agree set's size between the two over the 86 typed cases, against research V-22's 43 of 68 under the researcher's own
    mapping.
  - How the box treats a style crossing an inline object (emoji, mention, timestamp).
  - OQ-4's highlight.js read.
- **AN-7 Real-Discord reads (G-11, G-13; OQ-1 premise).**
  - G-13: post a role mention, a slash-command mention and a custom emoji the bot can use, with real ids from the test server, and
    read the DOM.
  - G-11: read `***bi***`, `# # nested` and `**# not head**` in `slate-oracle-walk` as test account 2, if a session's browser holds
    that profile. If none does, the native parser's render stays unseen, and that is the stated limit: it rests on research V-4's
    byte identity, and under D-5 it decides nothing.
  - OQ-1 premise: type 🙂 into Discord's box and read the stored content after sending to the test server.

Acceptance: the analysis document states a result, with its capture path, for every AN item, or marks the item not completed. AN-1
and AN-2 are pass/fail as written above. A failed AN-1 stops the chain at the owner (D-6). A failed AN-2 goes to steering as a
re-scope before M4's approval.

### M2 — The engine and its adapter

Mirrors: `website@af3d95a src/providers/MarkdownProvider.tsx:useValue`, for the lazy client load. The exact-pin form of
`"@vercel/functions": "3.11.3"` and `"zod": "3.22.4"` in `package.json`. Plan 018 M2-b's lockfile disposition (every moved pin
listed and dispositioned).

- Add `@discord/markdown-wasm` `0.16.0`, exact, in `dependencies`. Take `@discord/markdown-react` only if AN-5 leaves the preview on
  `parse`; the architect calls a local `NodeList` "about 40 lines", and the choice is the implementer's, under the same pin rule.
- One adapter module under `src/utils/markdown/` owns four things:
  - the call to `init` (or `initSync`, per AN-1);
  - the per-surface `Syntax` masks from AN-3, one named constant per surface: content, embed description, embed title, field name,
    field value, V2 text display;
  - the node-kind → renderer map;
  - the token-kind → leaf-class map.
- `MarkdownProvider` exposes the adapter's ready state where today it exposes the `simple-markdown` parser map. Until init resolves,
  consumers render the plain text, never an empty block (AF-7). On init failure, one `console.error` line `markdown-engine-init-failure
  version=0.16.0 reason=<error name>` is written and the plain text stays.
- The MIT notice ("Copyright 2025 Discord, Inc." and the permission text) is carried in the built client assets beside the shipped
  glue (AF-4). The mechanism is the implementer's.
- **Rider R-A (handoff `handoff/website-paracord-listed-as-devdependency-but-imported-at-runtime-2026-11-22.md`, 02a4cca1, whose
  trigger this milestone's `package.json` edit fires).** Move `paracord` from `devDependencies` to `dependencies`, with the matching
  lockfile importer entry. Riders yield. Drop disposition, priced now: on any conflict, it drops to an on-next-touch note, and the
  handoff stays Open with this plan cited in its changelog.

Acceptance criteria:
- **AC-2.1 Confinement.** Over every file under `website/src`, `bot` and `lang` at the milestone's tip, the only module whose import
  specifiers name `@discord/markdown-wasm` or `@discord/markdown-types`, static or dynamic, is the adapter. The unrestricted range
  is every `.ts`/`.tsx`/`.js`/`.mjs` file in the repo outside `node_modules` and `.next`. The instrument is a module-graph read, not a
  path list. It is exercised on one real member (the adapter) and one planted non-member (a test-only import in an export), both
  run before the sweep relies on it.
- **AC-2.2 Pin.** `package.json` names `0.16.0` with no range operator. `pnpm-lock.yaml` resolves `@discord/markdown-wasm@0.16.0`
  and `@discord/markdown-types@0.14.0` with their integrity hashes. Every other pin the lockfile moves is listed in the
  implementation document and dispositioned, from a diff of the base and tip lockfiles (plan 018 M2-b form).
- **AC-2.3 Mask table.** Each of the six surface masks equals AN-3's table row for that surface, bit for bit, over all 31 named
  `Syntax` bits (the class enumerated from `@discord/markdown-types@0.14.0 syntax.d.ts:Syntax`). Expected values are literals from
  AN-3, never computed from the adapter's constants (expectations independence).
- **AC-2.4 Total maps.** Every node kind of `@discord/markdown-types@0.14.0` has exactly one renderer. Every token kind has exactly
  one class entry (possibly empty). The classes, enumerated from that file at the pin:
  - Block: `empty`, `heading`, `list`, `quote`, `subtext`, plus `paragraph` and `text` as observed in P-1.
  - Inline: `code`, `code_block`, `emoji` (`custom`, `unicode`), `link`, `mention` (`user`, `channel`, `role`, `game`, `command`,
    `everyone`, `here`, `static` with `home` / `browse` / `customize` / `guide` / `linked_roles`), `bold`, `italic`, `underline`,
    `strikethrough`, `spoiler`, `timestamp`.
  - Lossless node kinds: 16. Token kinds: 21. Both are counted by hand from `LosslessNodeKind` and `TokenKind` in that file,
    2026-11-23; the implementer re-counts them from the union types.
  - A kind added by a later pin fails the type-check, because the maps are exhaustive over the union.
- **AC-2.5 Init states.** For each of the three states — pending, resolved, rejected — every markdown-rendering surface shows every
  character of the source text. Pending and rejected show it unformatted. The rejected state writes exactly one init-failure line per
  page load.
  - Human-observable form: on a local production build with the wasm request blocked in Chrome devtools, the editor and the preview
    show the plain text. Walked by UAT before release.
- **AC-2.6 Notice.** The built client output of `next build` contains the copyright line. Instrument: `grep -c` over `.next/static`
  in the build export, which reads 0 at the base.

Rollback: revert the milestone's commits (`git revert <sha>…` on the chain branch, by the implementer before release; by devops on
`master` after release, under his release answer). Lockfile disposition: the revert restores both files, and the diff is read
before it is committed.

### M3 — The fuzzer and oracle, in the suite (D-1; S-13; G-9; LF-9)

Mirrors: the instruments of inventory § 3, which are lifted rather than rewritten: the grammar-oracle generator, the
sentinel-oracle, the strict round-trip probe and the 1,662-line probe corpus. The suite's placement and naming follow the workspace
`CLAUDE.md` Test Conventions, which bind this milestone's test work. Its form follows OQ-3's answer.

What it holds:
- **Generator.** A seeded generator over the syntax class: every `Syntax` bit's constructs, nested to depth 3, with delimiters
  balanced and unbalanced. It adds the link forms of D-2 (bare, `<…>`, `<email>`, masked with a title and with angle brackets), emoji
  in, before and after links, escapes, lists, headings, subtext, quotes, fences, timestamps of every style letter, and mentions of
  every kind. Fixed inputs: the 272-case research corpus and the inventory's 107 link inputs, both lifted into the repo as data.
- **Three-way classification**, per input, of the text Discord would store (research V-19 trimming applied):
  - *agree* — the legacy tree equals the native tree in canonical form;
  - *disagree*;
  - *native-only* — a surface where AN-3 shows legacy has no rule set.
- **Known-differences report.** Generated by the command from the disagree class, never hand-written. It is written to a path under
  `verification/019/`, one row per input: the native form, the legacy form, and "the site follows native".
- **Drift alarm.** It fetches `discord.com/app`, locates the wasm by the glue predicate (research V-1), and compares its SHA-256
  with the pinned package's wasm. A mismatch fails, naming both hashes.
- **Normaliser.** The canonical-form normaliser is a module with its own tests. A mismatch it reports is a candidate until a member is
  read (research § 4 gap 3).

Acceptance criteria:
- **AC-3.1 Preview oracle.** For every input in the agree class, on every surface whose mask AN-3 settles, the preview's rendered DOM,
  rewritten to canonical form, equals the legacy tree's canonical form. The expected value is the legacy tree, computed by Discord's
  fetched code. The native parse decides only membership in the agree class, never the expected value (expectations independence;
  axiom E).
  - Input classes covered: the generator's output at the committed seed and count (≥ 4,000 unique strings), the 272 corpus, the 107
    link inputs.
  - Residue, named: rendering beyond the tree (emoji image choice, highlight colours, locale wording; research § 4 gap 4) and inputs
    the API rewrites (whole-message leading and trailing whitespace, unusable custom emoji ids; V-19).
- **AC-3.2 Editor oracle.** For every typed-case input where AN-6's legacy text-box table and Discord's native mapping agree, the
  editor's per-character style set and marker flag equal that expected value. The expected value comes from AN-6's legacy run, never
  from the adapter's token map. Residue: inputs where the box replaces text with an inline object (V-21), and OQ-2's limb until he
  answers.
- **AC-3.3 Round trip (no Discord oracle; research gap 7).** These are properties of the site, enumerated over the generator, the
  corpus and the 1,662-line probe corpus:
  - load (`getInitialValue`) then save (`flattenNodeText`) returns the input character for character, with OQ-1's answer
    deciding the emoji class;
  - typing the input one character at a time into a mounted editor yields the same text;
  - pasting it whole yields the same text;
  - normalisation settles in fewer passes than Slate's iteration limit for every input.
- **AC-3.4 Seen red.** Each criterion above is shown failing at the base `af3d95a` on at least one named input, and failing under a
  restored one-token mutation of the adapter's maps (axiom A). The run's counts, by class, are recorded with the pinned version (the
  normal-level telemetry the architect names).
- **AC-3.5 Fetch failure is loud** (under OQ-3's recommended answer). With discord.com unreachable, the Discord command exits
  non-zero, naming the fetch, and reports no pass count. A predicate matching zero modules or more than one fails, naming the
  predicate.

The decorator tests at the base (`decorator.emphasis-syntax-ranges.test.ts`) assert the width inference M5 deletes. Each case is
re-based on the token map, or retired under the Test Conventions' "superseded implementation" class with its named covering
case (integration requirement 7).

Rollback: revert its commits. It is test-only, with no production effect.

### M4 — The preview on the engine (S-06, S-10, LF-1, LF-3, LF-4, LF-6 preview side; D-8)

Mirrors: the site's existing renderers, which are kept, not replaced (AF-2 "the site's own renderers stay"): `MarkdownSpoiler`,
`MarkdownTimestamp`, the guild-resolved mentions, `next/image` emoji and highlight.js code blocks (`website@af3d95a
src/utils/markdown/rules.tsx:staticBaseRules`, each rule's `react` output). The tree comes from AN-5's chosen form. Every static
parse path (`Markdown.tsx`, `ContentBody`, `TextDisplayEditor`, `Embed`, `EmbedTitle`, `EmbedField`, the `DiscordContentEditor`
read-only branch, `/preview`) goes through the adapter with its surface mask.

Acceptance criteria:
- **AC-4.1** AC-3.1 holds for the preview, on every surface.
- **AC-4.2 Links.** For every link the engine returns, the anchor's `href` is the engine's `url`, and the visible label is the
  label AN-5 establishes Discord draws. The source text's emoji are never rewritten to `:name:` in a target or a label (LF-1's
  class: every link form × emoji before, inside, after). Human-observable form: on a local production build, typing
  `https://x.y🙂` and `[a](https://x.y/🙂)` into the content editor gives a preview anchor whose target is not
  `https://x.y:slight_smile`. Walked by UAT, then observed after deploy (§ Testing Strategy, post-deploy).
- **AC-4.3 Timestamps (D-8).** For every message holding k ≥ 1 timestamps — some inside code spans or code blocks, and with
  timestamps added before, between or after existing ones while the preview stays mounted — editing the i-th rendered timestamp
  rewrites exactly the source characters of that timestamp and no others, for every i. `localDate` follows a re-render whose source
  changes that timestamp. The target comes from a span, never from a count of regex matches over the raw string.
- **AC-4.4 Mentions.** Every mention kind in AC-2.4's class renders something visible: user, channel, role, game, command,
  everyone, here, and every static kind. Kinds the site cannot resolve render as Discord draws an unresolved one (research V-18:
  "@unknown-role", "/ping"). A kind with no Discord observation renders its source text, listed as residue.
- **AC-4.5** The static emoji pre-transform (`utils.ts:staticParserFor`) has no caller on a preview path. Instrument: the module
  graph read of AC-2.1.

Re-derivation gate: this milestone changes product behaviour (the preview's rendering of stored messages). Every downstream milestone
not yet authorised for execution (M5 to M7) is marked `PREMISE-STALE` when M4 ships on the chain branch, until one paragraph per
milestone re-argues its premise as a plan revision.

Rollback: revert M4's commits together with M5's, never one alone (AF-2). Devops, after release.

### M5 — The editor's colouring on `parseLossless` (S-01 to S-05, S-14, S-18, LF-1 editor side, LF-5, LF-6 editor side)

Mirrors: Discord's own native box, which decorates from `parseLossless` tokens (research V-6, V-11; module 818948 is read as prose
in AN-6, never copied). The existing `decorator` contract is kept: `(editor, mounted, isEmbed, parser) → ([node, path]) → Range[]`
(`website@af3d95a src/components/SlateEditor/utils/decorator.tsx` default export). The surface mask replaces the parser argument.

- The decorator parses the line's text as stored, with each emoji element counted as its source text, not each Slate text node
  alone. It maps token spans onto the line's text nodes. Width inference (`openingWidth`, `closingWidth`, `growMaskedLinkClosing`,
  `reduceAdjacentSyntax`), the interactive rule set's markdown path and `surrogateSourceOffsets` leave the colouring path.
- Code lines keep highlight.js, read through OQ-4's public surface if AN-6 finds one.

Acceptance criteria:
- **AC-5.1** AC-3.2 holds over every surface's editor.
- **AC-5.2 Split invariance.** For every line, the class set of each character is the same however the line's text is divided into
  Slate text nodes by emoji elements, mentions or timestamps. This covers S-01's class and every inline-object split.
- **AC-5.3 In range.** No decorator range ends past its text node's end, and none is zero-length (S-03, S-04), over the generator,
  the corpus and the code lines of every language `hljs.listLanguages()` returns at
  highlight.js 11.12.0. The inventory's records give 193 and 195; the count is taken from the call at the milestone.
- **AC-5.4 Code lines.** A nested highlight scope keeps its outer scope's class on every character it covers, for every language
  whose grammar nests (S-02). The expected value is highlight.js's own HTML for the whole line, parsed independently of the
  decorator.
- **AC-5.5 Real browser (S-18).** In Chrome, on a local production build, none of AN-6's discriminating cases shows a character
  coloured differently from the jsdom class list. Walked by UAT, with captures under `verification/019/uat/`.
- **AC-5.6** OQ-2's answer, stated over the heading, subtext and list marker class, and over runs crossing a line break.

Rollback: with M4 (AF-2).

### M6 — The Slate layer: round trip and input (S-07 per OQ-1, S-08, S-09, S-17, S-29)

Mirrors: chain `fix-normalize-fence-loop`'s fence and quote handling at `af3d95a` (`codeFence.ts`, `withNormalizeNode.ts`
`handleElement`) and its tests (`withNormalizeNode.quote-and-fence-lines-settle.test.tsx`,
`SlateEditor.opening-writes-stored-text.test.tsx`), which this milestone extends rather than duplicates.

Acceptance criteria:
- **AC-6.1** AC-3.3 holds for every input in its classes. S-29's form (a fence typed above a quote line) and S-17's (escaped
  markdown on open) are illustrative members, re-read at `af3d95a` before the change.
- **AC-6.2 (OQ-1).** Over every emoji form — a Unicode character, a ZWJ sequence, a skin-tone sequence, a keycap, a `:name:` typed,
  and a custom `<:n:id>` or `<a:n:id>` — the saved text is what OQ-1's answer states.
- **AC-6.3 (S-08).** A guild emoji picked from the picker into a content line, a code line and a quote line keeps every character
  around the cursor, and inserts the emoji's text form. Walked by UAT, signed in on the site as a test account with access to the test
  guild's emoji, where a build can be signed into. Otherwise this is a stated limit, and handoff 5b19c3e4 item 1 stays its carrier.
- **AC-6.4 (S-09).** Stated limit: composition events on a phone keyboard cannot be driven from this box. Handoff 5b19c3e4 item 2
  stays its carrier, and its `Review-Trigger` fires on this chain's edit of `setOnInsert`, if M6 makes one.

Rollback: revert its commits; implementer or devops as above.

### M7 — Release

The same release carries M2 to M7 (AF-2). No release tree holds M4 without M5: checked by devops at Stage 1 from the chain's commit
list.
- Name what the deploy moves: website `master` from `af3d95a` to the tip.
- Architecture record updates are proposed for the architect's closing pass: the Problem Area row closes, the Dependencies line is
  added.
- Handoff for X-8, minted at closure: Owning-Stage planner, Review-Trigger "when the Slate emoji lift (`parseEmoji`,
  `getInitialValue`, `withNormalizeNode` `handleElement`) is next edited".
- The tip-moving housekeeping lands in one commit before QA Phase 3.

## Testing Strategy

The binding standard is the workspace `CLAUDE.md` § Test Conventions (`agent-output/CLAUDE.md`), axioms A to E included.
- **Test types**:
  - unit tests (Node) for the adapter's maps and masks;
  - DOM tests for the renderers and the mounted editor;
  - property tests over the generator (M3);
  - the Discord-oracle command, per OQ-3;
  - real-browser walks by UAT on a local production build.
- **Hosts and instruments**: this box has Chrome via the browser-walker and the test-account browser (qa/uat). Puppeteer at the
  generator's pin runs in an export. Discord reads use the test-account browser on guild `1566742402180456559`.
- **Probe versus gate**: AN-1, AN-2 and AN-6 are pre-landing probes. AC-2.5, AC-4.2, AC-5.5 and AC-6.3 are the post-landing walks.
- **Tool changed by this chain and used by its own gate**: the normaliser (M3) is built by the chain and used by AC-3.1. Its own
  tests run first. A mismatch is a candidate until read (above).
- **Post-deploy observable** (his link report, D-2): on production `hooks.gg`, in the route-0 editor, `https://x.y🙂` and
  `[a](https://x.y/🙂)` give a preview anchor whose `href` is not `…:slight_smile…`. That is false at `af3d95a`. QA registers it as a
  post-deploy row. Its reader is devops at Stage 1.

## Validation

- The release-move dry run and report at `af3d95a`: exit 0, both (header).
- P-1's probe: exit 0, output captured.
- Suite baseline, carried from the release-tip record (`qa/closed/website-af3d95a-release-tip-qa.md`, Phase 2 run read 2026-11-23):
  2696 of 2696, exit 0. It was not re-run in this pass. QA Phase 1 re-reads it at the chain base.

## Risks

- **RK-1** The wasm does not build or serve under Turbopack (AF-5). Falsifier: AN-1.
- **RK-2** The generator captures `/preview` before the formatted render (P-2). Falsifier: AN-2's count.
- **RK-3** The package's tree shape changes between releases (V-12). The exact pin, the adapter and the exhaustive maps (AC-2.4)
  turn a shape change into a type error.
- **RK-4** Users on Discord's legacy path see the 33 disagreeing cases drawn differently from the site (V-18; D-6's option text).
  This is accepted; the known-differences report lists them.
- **RK-5** Stored messages' preview images change on regeneration wherever the old rules differed from Discord (V-10's 33 static
  differences). The stored corpus is unread (`handoff/bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md` item 7, whose class
  this shares). This is accepted under D-3.
- **RK-6** The oracle fetch breaks: Discord changes its page or blocks headless clients. AC-3.5 makes this loud.
- **RK-7** Bundle cost on mobile: about 451 KB gzip of lazily loaded wasm (research, architect AF-5). AN-1 measures it.

## Exclusions

| Exclusion | Reason | Carrier |
|---|---|---|
| X-1 The fence-loop and blockquote defects (inventory X-1, X-2) | Chain 9c+9f, released at `af3d95a`. | `deployment/fix-normalize-fence-loop-deployment.md` |
| X-2 S-11 (draft after a typed-back edit) | Draft state, not formatting (block 09:18Z). | `handoff/typed-back-edit-leaves-saved-message-draft-2026-11-21.md`, whose "website editing effort is scoped" trigger fires on this plan and is dispositioned here. |
| X-3 S-12 | Same block. | `handoff/fix-desktop-draft-as-typed-residue-2026-11-21.md` |
| X-4 S-15 | Held for his decision (block 09:18Z). | `handoff/website-018-standing-risks-save-toast-and-lint-stack-2026-11-20.md` RK-3 |
| X-5 S-16 | Already a fixer rider (block 09:18Z). | The fixer queue in `steering/fixer-queue-2026-11-21-rulings.md` block 09:18Z |
| X-6 9e and the `/preview` matcher | Outside the region. | `TODO.md` |
| X-7 S-19 to S-28 | Fixed. Their tests stand. | Stated limit (inventory § 1) |
| X-8 Removing `simple-markdown` and the emoji pre-transform from the Slate emoji lift | The lift is the Slate layer (AF-9), outside D-6's preview-and-colouring reach. | The handoff minted at M7 |
| X-9 Slate block structure from `parseLossless` | A later effort (AF-9). | `system-architecture.md` Problem Areas row |
| X-10 Third-party clients | D-9. | Research G-6 |
| X-11 Generator-side changes | Outside the region; AN-2 decides whether one is needed. | Re-scope to steering |
| X-12 Open handoffs whose trigger this chain fires, and that have nothing in the region: tRPC leftovers (fires on the `package.json` dependency edit), the `qa-014-bc7` inventory (fires on "website test effort scoped"; its items are the analyst's and the record's), the 015 assumptions (fire on "next website effort scoped"; items 1 and 7 are used here as premise and risk) | Nothing in the region. | Each handoff, unchanged |

## Planner batch

| Item | Source row | Disposition |
|---|---|---|
| G-14: which legacy parser state (`allowEmojiLinks`, a message's `webhookId`, research § 3 step 1, module 354777) AC-3.1's oracle runs under, so an emoji inside a masked-link label on a webhook-sent message has the expected value Discord draws; with the research corpus now in its Appendix C as M3's source | `research/closed/slate-formatting-discord-oracle-2026-11-23.md` Remaining gaps row G-14 (record `a666dbd9`); `INBOX.md` last entry, researcher-slate-formatting-oracle FYI | Open: folded at the next planning pass (revision 1, batched with the critique) into AN-4/AN-7 and AC-3.1. Severity: none stated at source; it bears on an expected value, so it is treated as a criterion change. |

## Version Management

The website `package.json` carries no `version` field. No version or CHANGELOG milestone is written. Devops names what the deploy
moves.
