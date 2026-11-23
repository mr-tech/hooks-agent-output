---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: >-
  Revision 2, for the critic (cycle 1 pass 2), the architect's delta pass and QA Phase 1's re-key. Implementation is not approved.
  M2 waits on M1's analysis (AN-1, AN-3), on the three gates passing one revision, and on the website tree, which the fixer queue
  holds (9e cut, effort rulings). OQ-5 is answered (D-13, option b) and is folded at revision 3.
Revision: 2
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
| 2026-11-23T15:52 | 1 | planner-019 | Folds his answers to OQ-1 to OQ-3 and steering's three scope additions (effort rulings block 15:49Z, record `093a7c9d`; ledger block "2026-11-23T15:48Z — steering-hooks-fixer"), plus Planner batch row G-14 (research, record `a666dbd9`). It adds D-10 to D-12 and resolves OQ-1 to OQ-3 in place; AC-5.6 and AC-6.2 are restated on the answers, and M3 takes the two-command form. G-14 enters AN-4, AN-7 and AC-3.1. Scope delta: M6 gains S-29's QAF-4 trigger and S-30 (the `>>>` server-side question, settled by a code read at `0411d3b`, with production residue his). M3 gains the fence-loop chain's three drivers as seeds, all carried. M1's AN-4 and AN-7 each gain a G-14 limb. The plan is still the original ask plus three in-region additions, with no milestone added or removed. |
| 2026-11-23T16:24 | 2 | planner-019 | Folds the three gates' verdicts on revision 1, one batch: the critique (`critiques/019-slate-formatting-discord-engine-critique.md`, record `0435794c`, F-1 to F-23), the conformance pass (`architecture/019-slate-formatting-discord-engine-architecture-findings.md`, record `78d7ec06`, CF-1 to CF-7), and QA Phase 1 (`qa/019-slate-formatting-discord-engine-qa.md`, record `75f479a1`, QAF-1 to QAF-14). The arguments live in those documents; § Finding disposition maps each finding to where it is folded. OQ-4 is resolved by CF-7. CF-2's option (b) is OQ-5, at steering as a scope delta, with option (a) written as the floor. Scope delta: M5 gains a per-element parse cache with a counted criterion (CF-1); M6 gains AC-6.5, the editor's emoji lift held equal to the engine (CF-2 a); M3 gains a red-command outcome table and the vitest project form (F-2, CF-3), and the three-class table (F-6); M2 keeps today's hidden-until-ready loading state (F-3) and gains a link scheme allow-list (QAF-5) and R-A's criterion; M7 gains the Test Conventions update. No milestone was added or removed; the plan is the original ask plus the three in-region additions of revision 1. |
| 2026-11-23T16:30 | R-2 | planner-019 | Registered D-13 (OQ-5, CF-2 option b); its words live in effort rulings block "2026-11-23T16:29Z — selection: plan 019 OQ-5" (record `213d34ec`) and the ledger block it cites. |

## Reading Order

Each role reads these sections, in this order, by heading. Every other section is reference, reached when a named section cites it.

| Role | Sections |
|---|---|
| implementer | Decisions Register; M1 — Analysis before code; M2 — The engine and its adapter; M3 — The fuzzer and oracle, in the suite; M4 to M6 (each by its heading) |
| code-reviewer | Decisions Register; M2 — The engine and its adapter; M5 — The editor's colouring on `parseLossless`; M6 — The Slate layer: round trip and input; Exclusions |
| qa | Testing Strategy; M3 — The fuzzer and oracle, in the suite; Acceptance criteria of M2 and M4 to M6; Risks; Exclusions |
| uat | Value Statement and Business Objective; Testing Strategy; M2 — The engine and its adapter (AC-2.5); M4 — The preview on the engine (AC-4.2); M6 — The Slate layer: round trip and input (AC-6.3) |
| devops | Header notes; M7 — Release; Testing Strategy (the post-deploy observable); Exclusions |

There is no Handoff Notes section; this table is the plan's one routing surface.

### Owed re-verdicts

| Limb | Decidable since | Owning gate | State |
|---|---|---|---|
| Every criterion and section revision 2 rewrote (§ Finding disposition) | revision 2 commit | critic (pass 2) | owed |
| AC-5.7 per-element cache; AC-6.5 lift equality; M3's project form; X-8 under option (a) | revision 2 commit | architect (delta pass) | owed |
| Every acceptance criterion revision 2 changed, re-keyed into QA's register | revision 2 commit | QA Phase 1 (re-key) | owed |

## Header notes

- **Plan ID** 019, minted from `.next-id` (19 → 20, record `ae3d41fb`).
- **Target Release.** The website's one serving ref is `master` on origin, and a push to it deploys to Vercel production. Read
  2026-11-23 in revision 0's pass: `git -C website ls-remote origin` lists heads `master` `af3d95a`, `backup`,
  `external-message-api`, `redesign` and `regex-refactor`; `website/.github/workflows` is absent. `node
  ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master af3d95a --dry-run` exits 0, and `--report` exits 0 ("one
  serving ref at origin (master); no pair"). The capture is `verification/019/planning/release-move-dry-af3d95a.txt`. Devops re-runs
  both at the release tip; a dry run to the current SHA shows no split. Chain 9e (`fix-image-uploader-url`) holds the tree now and
  releases on its own, before this chain cuts. The push is devops's act, under his release answer. The package has no `version`
  field (§ Version Management).
- **Base.** The chain's base is website `master` at the moment the chain branch is cut, after 9e's release. It is not `af3d95a`.
  This revision's reads were taken at `af3d95a` (released 2026-11-23T15:29Z, `qa/closed/website-af3d95a-release-tip-qa.md`).
  **Base re-derivation step**: at chain start, the implementer runs `git diff --stat af3d95a <base> -- src` over the region and over
  the files P-4 lists. For every file the diff touches, it re-reads the criteria and rows that cite that file (AC-3.4, AC-6.1,
  AC-6.1b, P-4, M4's path list) and records the result in its implementation document before M2's first commit. QA Phase 1 re-keys
  on that record. The inventory itself was taken at `0411d3b`: from there to `af3d95a`, 8 files moved, all in the Slate block layer
  (`git diff --stat`, revision 0's pass).
- **Lane: full** (not small). It adds a production dependency and a new layer, and it changes the shared preview path that
  `/preview` and the generator use.
- **Architectural surface: adds.** It adds a new layer (one adapter module over `@discord/markdown-wasm`) and a new production
  dependency, so the architect's conformance pass is a named step of the chain. Read before this line: `system-architecture.md`
  Components (website), Dependencies, Problem Areas, D-001 and D-003; `website.md` W-3 and W-4. Lines the chain closes or
  invalidates, for the deployment record to route:
  - The Problem Area "The site's markdown is a hand-kept copy of Discord's rules in two rule sets" (Medium). Whether it closes on
    landing while the emoji lift stays on `simple-markdown` (option a, X-8) is the architect's closing pass to rule. Under option b
    it closes.
  - The Problem Area "The editor reads highlight.js's private emitter tree" (Low) closes on landing (CF-7, AC-5.4).
  - The Components line "Packaging: pnpm with a patched dependency (`simple-markdown` via `patches/`)" stays true under option a
    and is removed under option b.
  - The Dependencies line gains the package and its exact pin. The Quality Attributes "Tests" line gains the two-command form (M7).
  - D-001 and W-3 are held: one engine for both views, and AC-6.5 holds the editor's emoji equal to the preview's.
- **QA sequencing.** QA Phase 1 runs before implementation, as the stage set requires (block 09:18Z).
- **Disclosure.** Two read-only website lookups made in revision 0's pass were not completed, then re-run (effort rulings block
  15:29Z).

## Value Statement and Business Objective

As a Hooks user composing a Discord message, I want the editor's colouring and the preview to format every input the way Discord
does, and to keep every character I type, paste or load, so that what I build on Hooks is what Discord shows when it is sent.

This serves his words at 09:07Z and 09:11Z (D-1, D-3): every Slate formatting fix in one effort, held to Discord's behaviour, with a
fuzzer or intensive check over the edge cases. The plan delivers the value itself. Preview and editor move together (AF-2), and the
fuzzer lands in the suite. No core part is deferred. The value statement carries no measured figure. On inputs where Discord's two
formatters disagree, "the way Discord does" means the native formatter's way (D-5, D-6). The three-class table in M3 states what is
asserted on each class.

## Decisions Register

Every row is a decision he has settled. Rulings come from `steering/fixer-queue-2026-11-21-rulings.md` (the "effort rulings"),
except D-8.

| ID | Decision (every operative clause) | Date | His words, verbatim, and route | Reopened by |
|---|---|---|---|---|
| D-1 | Every not-yet-started Slate or formatting fix goes into one effort, and that effort delivers a fuzzer or intensive check that covers the edge cases. | 2026-11-23 | "If at all possible, it'd be nice to batch any other future formatting fixes, basically any Slate related fix, into a singular effort, whether that be a fixer change or a full chain. I do not know, but I would like them all grouped into one. And then alongside that should be some kind of fuzzer and or intensive check just to try and cover every single edge case." Relayed by `steering-hooks-fixer`, block 09:07Z (said in that session). Steering's reading of which items move is agent-authored (same block). | Owner withdrawal only. Consequence: M3 is a deliverable that stays in the suite. |
| D-2 | Hyperlink formatting is in scope. | 2026-11-23 | "one thing that definitely needs to be looked at is hyperlinking, since I believe there's something off with the formatting there." Relayed, block 09:10Z. | Owner withdrawal only. Consequence: LF-1 to LF-6 and the link limbs of M3 to M5. |
| D-3 | The standard is Discord's own formatting behaviour, and many defects are expected. | 2026-11-23 | "I tried my best to get the Slate implementation to be the same as Discord's, but Slate is really difficult to use. So there's undoubtedly a ton of bugs in the implementation." Relayed, block 09:11Z. | Owner withdrawal only. |
| D-4 | Discord's own served code may run as a test oracle, in the test environment only: fetched from public assets at test time, never committed, never shipped. | 2026-11-23 | Asked: "I mean, there shouldn't be any issue in just running the code in the test environment, right? As long as we don't actually ship that code." Then: "Yeah, I mean, we're just using it in test, so I don't see any issue." Relayed, block 09:17Z. The bounds are steering's statement, which his answer accepted. | Owner withdrawal only. Consequence: the legacy oracle (M3) is fetched per run, and AC-3.1, AC-3.2 and AC-3.6 derive from this row. |
| D-5 | Where Discord's two formatters disagree, the site is held to Discord only where both agree. The disagreeing cases are listed as known differences. | 2026-11-23 | By selection: "Agent: match only where both agree (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "the fuzzer and tests hold the site to Discord only where they agree; the disagreeing cases listed as known differences until Discord's switch ends". Ledger `steering/selection-ledger/2026-11-23.md`, block "2026-11-23T13:09Z — steering-hooks-fixer"; effort rulings block 13:09Z. | Owner withdrawal, or the option's own stop condition, "until Discord's switch ends". That is observable as M3's legacy locator matching no module on a served build (outcome table, cause C3), or a read of the two experiments (research V-2) showing one parser served. The drift alarm reads the native wasm only and does not observe it. Consequence: the agree class of AC-3.1 and AC-3.2. |
| D-6 | The site uses Discord's published formatter, `@discord/markdown-wasm`, for the preview and the editor's colouring. Both switch in the same release, the plan opens with a build check, and the old formatter stays in tests only. | 2026-11-23 | By selection: "Agent: use Discord's formatter (Recommended)". Option text, agent-authored (`steering-hooks-fixer`), from the architect's findings: "one engine drives the preview and the editor's colouring; the plan opens with a build check; preview and editor switch in the same release; the old formatter stays in tests only". The option also stated that on the 33 disagreeing cases the site shows the new formatter's way. Ledger, same day file, block "2026-11-23T15:23Z — steering-hooks-fixer"; effort rulings block 15:23Z. The architect's record of his answer reads it as "option B with integration requirements 1 to 7" (findings § Owner's answer, agent-authored). | Owner withdrawal. Or M1's build check (AN-1) failing, which returns the choice to him with the architect's fallback A (findings § Verdict). |
| D-7 | A defect or leftover a stage finds in this effort's code is fixed without a fix-or-not question to him. A product-behaviour choice with more than one reasonable answer is still put to him. | 2026-11-22 | "Just fix everything you find along the way." Relayed, block "2026-11-22T04:50". It is in this effort's rulings file, so it binds here (GLOSSARY, "Ruling scope"). | Owner withdrawal only. Consequence: fuzzer finds in the region are in scope (scope statement). |
| D-8 | A timestamp edit in the preview always changes the timestamp clicked, in both cases (code-span miscount, re-render index), with tests for each and for normal editing. | 2026-11-22 | By selection, option A: "Agent: fix both (Recommended)". Option text, agent-authored (`steering-hooks`): "Editing a timestamp always changes the one you clicked, in both cases, with tests for each and for normal editing." Ledger `steering/selection-ledger/2026-11-22.md`, block of 04:0xZ. Carried from `steering/fix-timestamp-edit-target-rulings.md` block "2026-11-22T04:03", moved into this effort by effort block 09:07Z. | Owner withdrawal only. Consequence: AC-4.3. |
| D-9 | The third-party clients' per-client checks stay not done. Third-party clients are a footnote. | 2026-11-23 | By selection: "Agent: leave them not done (Recommended)". Ledger, 2026-11-23 file, block "2026-11-23T09:31Z — steering-hooks-fixer"; effort rulings block 09:32Z. | Owner withdrawal only. Consequence: Exclusions X-10. |
| D-10 | An emoji typed or pasted as a character is saved and sent as that character. Messages already saved with `:name:` stay as they are. | 2026-11-23 | By selection: "Agent: store the character (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "save and send 🙂 as typed; messages already saved as `:name:` stay". The option stated that whether Discord's own box sends the character is unchecked, and that AN-7 reads it. Ledger `steering/selection-ledger/2026-11-23.md`, block "2026-11-23T15:48Z — steering-hooks-fixer"; effort rulings block 15:49Z. | Owner withdrawal, or AN-7 finding that Discord's box sends the `:name:` form. That read is the option's stated unchecked premise; the result goes back to him. Consequence: AC-6.2. |
| D-11 | The editor follows Discord's text box. No heading or list marker is coloured, and each line is styled alone, so a run that crosses a line break is not styled across it. | 2026-11-23 | By selection: "Agent: follow Discord's box (Recommended)". Option text, agent-authored: "no heading or list marker colouring; each line styled alone". Same ledger block; effort rulings block 15:49Z. | Owner withdrawal, or AN-6 finding that Discord's native box styles one of these. That would be a premise the option rested on (research V-11, V-21) proving false. Consequence: AC-5.6. |
| D-12 | `pnpm test` stays green offline. A separate command holds every comparison against Discord; it fails loudly offline and runs at every release gate and every pin change. | 2026-11-23 | By selection: "Agent: separate Discord command (Recommended)". Option text, agent-authored: "`pnpm test` offline-green; a separate command holds every Discord comparison, fails loudly offline, run at every release gate and pin change". Same ledger block; effort rulings block 15:49Z. | Owner withdrawal only. Consequence: M3's project form and its outcome table; AC-3.5. |
| D-13 | The editor's emoji lift takes its emoji from Discord's formatter (CF-2 option b), so `simple-markdown` leaves the site. This widens D-6's reach from the preview and the editor's colouring to the editor's emoji lift. | 2026-11-23 | By selection: "Agent: engine decides emoji (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "The editor's lift takes its emoji from Discord's formatter, and the old formatter library leaves the site; the cost is the stored emoji shape, with six readers." The other option was "Agent: keep editor's own emoji check". Ledger `steering/selection-ledger/2026-11-23.md`, block "2026-11-23T16:29Z — steering-hooks-fixer"; effort rulings block "2026-11-23T16:29Z — selection: plan 019 OQ-5" (record `213d34ec`), which records the premise read (engine `parse("© ™")` is plain text; the site's lift makes © an emoji element). | Owner withdrawal only. Consequence: AC-6.5 and X-8 are re-written at the next planning pass (revision 3). |

The scope statement is quoted verbatim from block 09:18Z in § Objective. It narrows nothing that may be reconsidered beyond what it
says. It carries no expiry: a member found later inside the region is in scope on steering's ruling (same block), and a member
outside the region is a re-scope.

## Objective

The scope statement, verbatim (block 09:18Z): "(website, the region in the inventory's region table: `src/components/SlateEditor/**`,
`src/utils/markdown/**`, `src/components/Markdown*.tsx`, and the editor surfaces that mount them). The editor (typing, paste, load,
save, colouring) and the preview render every input the way Discord does and lose no character. A fuzzer or intensive check, with a
Discord-derived oracle, enumerates the class and stays in the suite. In: S-01..S-06, S-08..S-10, S-13, S-14, S-17, S-18,
LF-1..LF-6, and every defect the fuzzer finds in the region. S-07 (emoji stored as `:name:`) is in, as a question for him through
the plan." Steering added S-29 inside the region (common brief), and S-30 and two widenings at block 15:49Z.

His standard (D-3), narrowed by D-5 and reframed by this plan for criteria: the preview and the editor are judged against Discord
only on inputs where Discord's legacy and native formatters agree. On the other classes, the site's renderers are judged against
the native formatter's tree (M3's three-class table), and a generated known-differences list names each case. Original wording beside
the reframe: "the editor is meant to match Discord" (block 09:11Z heading, steering's).

### Inventory carriage (every in-scope row)

| Row | Carried by | Note |
|---|---|---|
| S-01 nested runs lose the outer style | M5 | Cause removed: width inference is deleted. Came from `TODO.md` "fix-decorator-nested-styles". |
| S-02 nested highlight.js scope in a code line | M5 (AC-5.4) | Code-line path. |
| S-03 zero-length highlight.js scopes | M5 (AC-5.3) | Code-line path. |
| S-04 ranges past a line's end | M5 (AC-5.3) | |
| S-05 the `_` inside a renamed emoji pairs | M5 | Cause removed: the parse runs over the typed text. |
| S-06 static render manufactures `:ok:` | M4 | Cause removed: the preview no longer pre-transforms. |
| S-07 emoji stored as `:name:` | M6 (D-10, AC-6.2) | |
| S-08 guild emoji from the picker | M6 (AC-6.3, UAT walk) | From handoff 5b19c3e4, item 1. |
| S-09 IME after an emoji | M6 (AC-6.4) | From handoff 5b19c3e4, item 2. The handoff stays its carrier. |
| S-10 timestamp edit target | M4 (AC-4.3) | Came from 9d; D-8. |
| S-13 lift the corpus and the walk runner into the suite | M3 | From `TODO.md` "website editor tests: lift…". |
| S-14 highlight.js private `_emitter` | M5 (AC-5.4) | CF-7: `HighlightResult.value`. |
| S-17 escape rewritten on open | M6 (AC-6.1) | |
| S-18 real-browser assumptions of the decorator | M5 (AC-5.5, UAT walk) | |
| S-29 typing turns a quote line into code and drops its `> ` | M6 (AC-6.1) | The trigger is widened by QAF-4 of the fence-loop chain (`qa/closed/fix-normalize-fence-loop-qa.md`: 346 of 15,480 random typed edits at `61e5dfe` drop a `> `/`>>> ` when typing inside a fence turns a quote line into code), per effort block 15:49Z item 1. |
| S-30 opening a box without saving stored the old `>>>` rewrite on the server | M6 (AC-6.1b), by a read | Added by effort block 15:49Z item 2 (plan-local id; from `retrospectives/fixes-2026-11-23-steering-hooks-fixer-2-retrospective.md` § 3). |
| LF-1 emoji pre-transform rewrites link targets | M4 (AC-4.2), M5 | |
| LF-2 emoji beside links stored as `:name:` | M6 (it is S-07; D-10) | |
| LF-3 bare-URL end rule | M4/M5 by the engine; AC-3.1 asserts | |
| LF-4 `<…>` scheme | M4/M5 by the engine; AC-3.1 and AC-4.6 assert | |
| LF-5 list lines uncoloured | M5 (D-11: no list-marker colouring; content styles still apply) | |
| LF-6 embed-title link behaviour | M4/M5 per surface mask (AN-3) | |
| LF-7, LF-8 | no finding | M3's corpus keeps them as agreement rows. |
| LF-9 coverage gap | M3 | |
| The fence-loop chain's three differential drivers | M3, as seeds and lifted instruments | Effort block 15:49Z item 3: the reviewer's 20-atom differential (`verification/fix-normalize-fence-loop/code-review/probe.differential.test.tsx.txt`), QA's seeded random differential (`…/qa/probe.random-differential.test.tsx.txt`, with `…/qa/probe.wrong-edit-replay.test.tsx.txt`), the fixer's loader-identity driver (`…/round1b/probe.loader-same.test.ts.txt`). All three are carried. |

The research's items left to the effort, by name (research Recommendations item 4, and G-14 added at its close):
- **Research OQ-3 / G-3** (embed and Components V2 rule sets): AN-3 and the M2 masks.
- **G-8** (module-id stability): AN-4 and M3's predicate-based locator, which fails loudly (outcome table, C3).
- **G-9** (editor and embed rule sets against the oracle): M3, over every surface.
- **G-11** (the native parser seen rendered, read as test account 2): AN-7; if not completed, Exclusions X-13.
- **G-13** (real role, command and usable emoji ids): AN-7; if not completed, Exclusions X-14.
- **G-14** (emoji inside a masked-link label on a webhook message): AN-4, AN-7, AC-3.1.

## Assumptions and open questions

Where the estate was searched: website `af3d95a` (`git grep` and `git show` over `src`, read 2026-11-23); `@discord/markdown-wasm`
0.16.0, `-types` 0.14.0 and `-react` 0.12.0 (`npm pack` into a session scratch directory, read, and for the wasm, run); and
preview-image-generator `prod` `8512a1d` (`git show 8512a1d:src/generateImage.ts`).

Premises read or run:
- **P-1 (run)**: `parse` returns no spans and no source text. It was run under Node, 0.16.0, over four inputs; the output is at
  `verification/019/planning/parse-spans-probe.out`, and no `span` key appears in any `parse` result. A bare `https://x.y🙂` comes
  back as `{type:"link", value:{url:"https://x.xn--y-bz3s/"}}`, and `[a](https://x.y/🙂)` comes back with `url`
  `https://x.y/%F0%9F%99%82`. The top level holds `paragraph` nodes, and content holds `text` nodes. The declared `Block` union names
  neither (F-5; AC-2.4 takes both enumerators). So S-10's edit target and a detected link's label come from `parseLossless` or
  from the source text, and AN-5 picks the form.
- **P-2 (read)**: the generator captures on `page.goto(url, { waitUntil: 'networkidle0' })`, then calls `page.screenshot` with no
  DOM-readiness wait (`preview-image-generator@8512a1d src/generateImage.ts:generateMessagePreviewImage`; puppeteer `^21.1.0`).
- **P-3 (read)**: the browser loader is `WebAssembly.compileStreaming(fetch(new URL("./lib/discord_markdown_wasm_bg.wasm",
  import.meta.url)))` (`@discord/markdown-wasm@0.16.0 src/compile-module.js:compileModule`). `compileStreaming` needs the response
  to be `application/wasm` (QAF-10). `initSync` takes a `WebAssembly.Module` (`src/parse.d.ts`). The wasm's SHA-256 is
  `da7b9e5e…57fb0`, equal to research V-4.
- **P-4 (read)**: the parse-engine consumers at `af3d95a`: `MarkdownProvider` (`useValue`); `DiscordMessageEditor/index.tsx`, which
  holds the loading gate (`show={!!(markdown && (onMount || mounted))}`, F-3); the `DiscordContentEditor` trio; `ContentBody`;
  `TextDisplayEditor`; `Embed` (the description); `EmbedTitle`; `EmbedField`; `SlateEditor`; `decorator`; and `getInitialValue` and
  `withNormalizeNode` (through `parseEmoji` only). The importer listing is `verification/019/planning/markdown-importers-af3d95a.txt`
  (34 lines, 25 outside `__tests__`, `grep -c`). The provider value's full reader list is the architect's CF-5, and the timestamp
  callback's readers are CF-6 (`architecture/019-slate-formatting-discord-engine-architecture-findings.md`).
- **P-5 (read)**: two refusals in the editor's paste handler at `af3d95a` (`src/components/SlateEditor/index.tsx` `onPaste`). In
  `partialMarkdown` mode (embed title and field name), a paste holding a line break is refused. In both modes, a paste over
  `MAX_PASTE_LENGTH` (6,000 characters) is refused. `partialMarkdown` also skips quote and fence recognition on load
  (`getInitialValue`).
- **P-6 (read)**: the vitest config at `af3d95a` declares two projects, `node` and `dom`, through `vitest.config.ts:project`, and
  `package.json` `test` is `vitest run`.

OPEN QUESTION [RESOLVED] OQ-1 (S-07): he chose "store the character" (D-10); M6 AC-6.2 carries it.

OPEN QUESTION [RESOLVED] OQ-2 (heading and list markers, cross-line runs): he chose "follow Discord's box" (D-11); M5 AC-5.6 carries
it.

OPEN QUESTION [RESOLVED] OQ-3 (the oracle offline): he chose "separate Discord command" (D-12); M3 carries it.

OPEN QUESTION [RESOLVED] OQ-4 (S-14): the architect's CF-7 names the public surface, `HighlightResult.value`; M5 AC-5.4 carries it.

**OPEN QUESTION OQ-5 (CF-2 option b; a scope delta, at steering).** After M4, the preview recognises emoji through the engine,
while the editor's emoji lift still recognises them through `simple-markdown` (X-8). Research Appendix B row 230 is a measured
member: `©` is an emoji in the site's rules and plain text in both Discord parsers. Option a, written in this revision as the floor,
keeps the lift and holds it equal to the engine by AC-6.5. Option b, the architect's recommendation, takes the lift's ranges from
`parseLossless` emoji nodes, and then `simple-markdown`, its patch and its type file leave the product. The cost is that every reader
of the Slate emoji element's `ast` moves (CF-2's list). The planner reads b as outside D-6's reach ("the preview and the editor's
colouring"; AF-9 kept the Slate layer the site's own). It went to steering by message on 2026-11-23. A ruling for b is folded as its
own revision; it replaces AC-6.5's form and X-8, and touches no other milestone.

Scope assumptions that a design predating the plan (the architect's findings) makes:
- **Unit**: one adapter for all six surfaces (content, embed description, embed title, field name, field value, Components V2 text
  display), distinguished by `Syntax` mask. It holds only where AN-3 finds each surface to be a mask of the native parser. The other
  result goes to him (AN-3).
- **Reach**: the read-only preview branches and `/preview` move with the editor surfaces.
- **Layer**: the Slate block layer (quote and fence recognition, `flattenNodeText`, code-line and fence-line context) stays the
  site's own (AF-9). AC-5.6 and AC-3.3 say so.
- **Emoji lift**: option a (X-8, AC-6.5) until OQ-5 is ruled.

## Plan

### M1 — Analysis before code (REQUIRES ANALYSIS; REQUIRED before the approvals named per item)

The analysis is commissioned to the analyst; its document, created under `analysis/`, is named
019-slate-formatting-discord-engine-analysis.md. It inherits ID 019. The analyst works only on the items below, with outputs under
`verification/019/analysis/`. Exports are taken from the chain base (or `af3d95a` before the cut) with a **copied** `node_modules`:
Turbopack refuses a symlinked one (`handoff/bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md` item 1). Any local save on a
build first moves message ids out of production's range (workspace `CLAUDE.md`). The research's scratch instruments
(`legacy-oracle.js`, `tbcmp.py`, `domcmp.py`, research § Scratch instruments) are perishable; AN-4 and AN-6 lift what they use into
`verification/019/analysis/` first (QAF-11).

- **AN-1 Build spike (AF-5; D-6's "build check").**
  - In an export with the package added at exact `0.16.0`, `next build` (Turbopack, the repo's `build` script) emits the wasm as a
    served asset, and the editor page and `/preview` initialise it under `next start`, in Chrome and in Playwright Firefox (QAF-10).
  - If the `new URL(…, import.meta.url)` form is not emitted, the fallback runs: `initSync` with a bundler-supplied
    `WebAssembly.Module`.
  - It records:
    - the editor page's markdown chunk bytes before and after, raw and gzip;
    - the wasm response's `content-type`, `content-encoding` and bytes;
    - the time from navigation to the first formatted render, median and p95 over 20 loads.
  - A Vercel Preview of the spike branch is devops's act. A plain push is predicted not to reach READY: plan 018's OQ-5 [RESOLVED]
    and RK-7 (`planning/closed/018-next-upgrade-save-size-cap.md`) record that a Preview builds only from a branch carrying a
    `vercel.json` build command with `SKIP_ENV_VALIDATION=1`, because `src/env.mjs` needs Production-only variables (F-11). Devops
    takes that form, re-reads the Preview variables first, and records the same numbers there, naming the build form they were taken
    on.
  - **Not completed or fail** (no form initialises under `next build`): this holds M2's approval and returns D-6 to him through
    steering (D-6's reopening class).
- **AN-2 Generator capture (P-2; RK-2).**
  - Puppeteer runs at the generator's own pinned version (`8512a1d` `package-lock.json`), with its exact `goto` options, viewport and
    screenshot, against the spike's `/preview`, with the loading state M2 specifies (hidden until ready). It takes 50 captures each of
    three messages carrying bold, a masked link and a spoiler.
  - It counts captures whose DOM at screenshot time holds the formatted elements (`page.content()` right after `screenshot()`), and
    keeps the JPEGs.
  - On every capture, **pass or fail**, it records the gap between network quiet and the first formatted render, and it reads the
    length of puppeteer's `networkidle0` quiet window at that version from its source (F-4).
  - **Pass**: 150 of 150 formatted, with the gap distribution recorded.
  - **Not completed or fail**: this holds M4's approval and goes to steering. A generator-side wait is outside the region and is a
    re-scope; the analyst states the page-side candidates and does not pick one.
- **AN-3 Surface masks (research OQ-3 / G-3; research H-3).**
  - Which syntax Discord parses in each of: embed description, title, field name, field value, footer and author (confirm they are
    not markdown), and Components V2 text display. Both parsers are read: the legacy `EMBED_TITLE_RULES` and the others in the
    served rule module, and the native mask where the embed renderer is located in the lazy chunks. Then it is confirmed on the test
    server: the test bot posts embeds and a V2 text display carrying one discriminating case per syntax bit to `slate-oracle-walk`,
    read as test account 1.
  - Output: a table, surface × each of the 31 `Syntax` bits (with `DEV_LINKS` stated explicitly, QAF-4) → allowed in legacy,
    allowed in native, rendered. Each surface is also classed: both formatters, legacy only, or native only.
  - **A surface Discord parses with the legacy formatter only** (research H-3) goes to him through steering before M2's approval. It
    carries that surface's disagree count from M3's classification over the 272 corpus (F-7). This is a question under D-5's
    premise, not a re-opening of D-5.
  - **Not completed**: this holds M2's approval. A surface AN-3 cannot settle goes to him through steering, with the proposed mask
    and its residue.
- **AN-4 Legacy oracle in the test environment (G-8; G-14; D-4).**
  - Can the legacy facade (`parseToAST`) and the legacy text-box table (rule-to-Slate, research V-1 module 339200) run under Node
    from assets fetched at test time, or is a headless browser needed? If a browser is needed, it names which driver, what it does
    at install (a browser download or a postinstall step), and whether Vercel's install would run it (F-13).
  - Locator: module content predicates (research V-1 table), failing when a predicate matches zero modules or more than one. It
    re-runs the predicate table on the stable build current at the analysis, against research V-13's build 679055.
  - It reports run time over the 272-case corpus, and the failure modes when discord.com is unreachable or the page changes.
  - **G-14**: the legacy parse state a message the site sends gets. It reads in the served code (research § 3 step 1, module
    354777) which state flags a message with a `webhookId` is parsed under, `allowEmojiLinks` included.
  - **Not completed**: this holds M3's approval.
- **AN-5 Which tree the preview renders from (P-1).**
  - For each node kind whose rendering needs source text or a span: detected and auto link labels (what Discord draws as the label
    of a bare URL, read from the research walk's DOM captures or re-posted), the timestamp edit target (S-10), and the code block's
    language as typed. It settles whether the preview renders from `parse` plus source slices or from `parseLossless` alone, naming
    the form chosen and its reason.
  - **Not completed**: this holds M4's approval.
- **AN-6 Editor token mapping (QAF-1).**
  - Discord's native token-to-decoration mapping (module 818948) as a table, token kind × node context → leaf classes. It is read
    from the served bundle as prose, and nothing is copied (D-4). The table is frozen as literals; AC-3.2 uses it to decide agree
    membership.
  - It runs the legacy text-box table over the corpus to give per-character expected styles, and reports the agree set's size over
    the 86 typed cases (research V-22: 43 of 68 under the researcher's own mapping).
  - It reports how the box treats a style crossing an inline object (emoji, mention, timestamp).
  - **Not completed**: this holds M5's approval.
- **AN-7 Real-Discord reads (G-11, G-13, G-14; D-10's premise).**
  - G-13: a role mention, a slash-command mention and a custom emoji the bot can use, posted with real test-server ids, and the DOM
    read.
  - G-11: `***bi***`, `# # nested` and `**# not head**` read in `slate-oracle-walk` as test account 2, where a session's browser holds
    that profile.
  - D-10's premise: 🙂 typed into Discord's box and sent to the test server, and the stored content read. If it is `:name:`, that goes
    back to him (D-10's reopening class).
  - G-14: a masked link whose label is a Unicode emoji, and one whose label is a custom emoji the poster can use, posted to
    `slate-oracle-walk` as the bot and through a webhook, with both DOMs read. This is the oracle check for AC-3.1's emoji-label
    class.
  - **Not completed**, per limb: G-11 becomes Exclusions X-13; G-13 becomes X-14, and AC-4.4's unresolved-kind rendering takes its
    source text; D-10 stands as chosen, its premise unread (X-15); G-14's DOM check becomes X-16, and AC-3.1 asserts that class
    against AN-4's read alone. None of these holds an approval.

Acceptance: each AN item states a result with its capture path, or is marked not completed, and the outcome written above for that
item applies. An item that holds an approval is shown as held in this plan's Status-Detail until it lands.

### M2 — The engine and its adapter

Mirrors: `website@af3d95a src/providers/MarkdownProvider.tsx:useValue` for the lazy client load, and `website@af3d95a
src/components/DiscordMessageEditor/index.tsx` for its loading gate, which is kept (F-3). The exact-pin form follows
`"@vercel/functions": "3.11.3"` and `"zod": "3.22.4"` in `package.json`, and plan 018 M2-b's lockfile disposition.

- Add `@discord/markdown-wasm` `0.16.0`, exact, in `dependencies`. `@discord/markdown-react` is taken only if AN-5 leaves the preview
  on `parse`, and then under the same rules (AC-2.1, AC-2.2).
- One adapter module under `src/utils/markdown/` owns:
  - the call to `init` (or `initSync`, per AN-1);
  - the per-surface `Syntax` masks from AN-3, one named constant per surface;
  - the node-kind → renderer map, and the token-kind → leaf-class map;
  - the link scheme allow-list (AC-4.6).
- `MarkdownProvider` exposes the adapter's ready state, plus the lift's `parseEmoji` under option a. The loading behaviour, by state:
  - **Pending**: as today. The message editor stays hidden until ready (`DiscordMessageEditor` `show`), and the surfaces that render
    `null` without the parser keep doing so (`DiscordContentEditor/index.tsx`, `EmbedField.tsx`). Not a deviation.
  - **Resolved**: every surface renders formatted.
  - **Rejected**: every surface shows its source text unformatted, never an empty block, and one line `markdown-engine-init-failure
    version=0.16.0 reason=<error name>` goes to `console.error` per document. This is a deviation from today, where a failed import
    leaves the editor hidden for good. Its reason is AF-7 and integration requirement 4, which his D-6 selection adopted (findings §
    Owner's answer).
- An engine node or token kind the maps do not hold renders its source characters unformatted, and writes one `console.warn` line
  `markdown-engine-unmapped-kind kind=<kind> version=0.16.0` per kind per document (F-5).
- The MIT notice, "Copyright 2025 Discord, Inc." with the permission text, is carried in the built client assets the editor page
  loads (AF-4). The mechanism is the implementer's.
- **Rider R-A** (handoff `handoff/website-paracord-listed-as-devdependency-but-imported-at-runtime-2026-11-22.md`, 02a4cca1, whose
  trigger this milestone's `package.json` edit fires). It moves `paracord` from `devDependencies` to `dependencies`, with the
  matching lockfile importer entry. Riders yield. Drop disposition, priced now: on any conflict, it drops to an on-next-touch note,
  and the handoff stays Open with this plan cited in its changelog.

Acceptance criteria:
- **AC-2.1 Confinement.** Over every `.ts`, `.tsx`, `.js` and `.mjs` file in the repository outside `node_modules` and `.next` (the
  unrestricted range), the modules whose import specifiers, static or dynamic, name `@discord/markdown-wasm`,
  `@discord/markdown-types` or `@discord/markdown-react` are exactly two:
  - the adapter;
  - one test oracle helper under `src/utils/markdown/__tests__/helpers/`, which calls the engine only with AN-3's literal masks and
    never imports the adapter's mask constants.
  The instrument is a module-graph read, not a path list. It is exercised on one real member and one planted non-member before any
  sweep relies on it.
- **AC-2.2 Pin.** `package.json` names `0.16.0` (and `@discord/markdown-react`'s version, if taken) with no range operator.
  `pnpm-lock.yaml` resolves each package and `@discord/markdown-types@0.14.0` with integrity hashes. Every other pin the lockfile
  moves is listed and dispositioned in the implementation document, from a diff of the base and tip lockfiles (plan 018 M2-b form).
- **AC-2.3 Mask table.** Each of the six surface masks equals AN-3's row for that surface over all 31 single-bit `Syntax` members
  (`@discord/markdown-types@0.14.0 syntax.d.ts:Syntax`), `DEV_LINKS` included. Expected values are literals from AN-3. No mask
  equals `0`, which the engine reads as `Syntax.ALL` (`syntax.d.ts`; QA P-Q3). A surface AN-3 finds is not markdown (footer, author)
  never calls the engine (QAF-4).
- **AC-2.4 Total maps.** It uses two enumerators (F-5):
  - **declared**: every member of the declared unions at the pin has exactly one map entry. These are the `Block` and `Inline`
    members with their `emoji`, `mention` and `static` sub-kinds, the 16 `LosslessNodeKind` members and the 21 `TokenKind` members
    (counted from `index.d.ts`; the critic re-counted the same);
  - **observed**: every `type` and `kind` value the engine returns over M3's input classes is a key of the map. At this pin that
    includes `paragraph` and `text`, which the declared unions omit (P-1).
  The type-check catches a newly declared kind only. A kind that is returned but undeclared is caught by the observed enumerator
  and, at run time, by the unmapped-kind line.
- **AC-2.5 Init states (QAF-3).** On each of the six surfaces, and on `/preview`:
  - **pending**: today's hidden-until-ready behaviour;
  - **resolved**: formatted elements appear (for `**a**`, a `strong` element containing `a`);
  - **rejected**: every source character shows unformatted, and exactly one init-failure line is written per document.
  "Per document" means per full page load: a client-side navigation between two editor pages does not re-initialise and writes no
  second line, with all six surfaces mounted.
  - Human-observable form: on a local production build, with the wasm request blocked in Chrome devtools, the editor and the preview
    show the plain text; unblocked and reloaded, `**a**` is bold. Walked by UAT (QA register B-1), in Chrome and Firefox. Safari is
    Exclusions X-17.
- **AC-2.6 Notice (F-21, QAF-14).** At the tip, both the copyright line and the first sentence of the MIT permission text appear in a
  JavaScript file the editor page loads, read from the page's network list or the build manifest, not only in a sourcemap
  (`grep -rc` over that file). At the base the package is absent, so the base read is not a control. The control is a tip build with
  the notice mechanism removed.
- **AC-2.7 Rider R-A.** `paracord` is in `dependencies` with the same specifier, absent from `devDependencies`, and the lockfile's
  importer entry moved with it. `pnpm install --frozen-lockfile` exits 0 in an export, and no other lockfile pin moves for it.

Rollback: revert the milestone's commits with `git revert <sha>…`, run by the implementer on the chain branch before release, or by
devops on `master` after release under his release answer. The revert restores both `package.json` and `pnpm-lock.yaml`, and the
diff is read before it is committed.

### M3 — The fuzzer and oracle, in the suite (D-1; D-4; D-12; S-13; G-9; LF-9)

Mirrors: the instruments of inventory § 3 and the fence-loop drivers, lifted rather than rewritten. Placement and naming follow the
workspace `CLAUDE.md` Test Conventions, which bind this milestone's test work. The project form mirrors `website@af3d95a
vitest.config.ts:project`.

**Form (D-12, CF-3).**
- A third vitest project, `discord`, declared through the existing `project()` factory. Its include is a path the `node` and `dom`
  projects do not collect: a `__tests__/discord/` directory that those two projects exclude. The exact glob is the implementer's.
- `package.json`: `test` becomes `vitest run --project node --project dom`, and `test:discord` is `vitest run --project discord`.
- **`pnpm test`** holds the properties (AC-3.3), the finite maps and masks (AC-2.3, AC-2.4), the frozen Discord-derived literals
  (AC-3.2's and AC-5.6's expected values from AN-6, AC-2.3's from AN-3), and the frozen inputs. It runs offline. "Offline" means a
  network namespace with only loopback up (`unshare -rn` with `lo` up; QA P-Q1, QAF-13).
- **`pnpm test:discord`** fetches the legacy oracle and holds AC-3.1, AC-3.6 and the drift alarm. It re-derives every frozen literal
  live and fails where a live value departs from the frozen one, naming both (QAF-6a).
- Who runs it: QA Phase 2 and Phase 3 of this chain, every pin change, and every later release gate whose chain touches the region,
  under the outcome table below.

**Outcome of a red `pnpm test:discord` (F-2).** The served build has moved about weekly: `npm view @discord/markdown-wasm time`
shows six releases, 0.11.0 on 2026-10-13 to 0.16.0 on 2026-11-16, at intervals of 2, 8, 3, 9 and 12 days (critic's read,
2026-11-23).

| Cause | This chain, Phase 2 or 3 | A pin change | A later chain touching the region | A later chain not touching it |
|---|---|---|---|---|
| C1 fetch fails (loopback-only namespace or a real outage) | The gate re-runs when reachable and holds until a green run. The release waits on the network, not on Discord's schedule. | Same | Same | The command is not run |
| C2 drift alarm: the served wasm ≠ the pinned wasm | Reported in the run output with both hashes. Not a failure: the site ships Discord's published 0.16.0, unchanged. The gate records it, and devops at Stage 1 writes an upgrade handoff (Owning-Stage planner, Review-Trigger "when the pin is next changed, or the next chain touching the region opens") | The upgrade itself is a deliberate change (AF-3). It re-runs the whole command and moves AC-2.2's pin, AC-2.3's and AC-2.4's counts and the `version=` lines | Recorded; the handoff is cited | — |
| C3 a locator predicate matches zero modules or several | Holds the gate. The implementer repairs the predicate in this chain. If the legacy parser is gone from the served bundle, D-5's stop condition has fired: it goes to him through steering, and AC-3.1 and AC-3.2 lose their oracle until he rules | Same | Holds that chain's gate; repair is that chain's | — |
| C4 a frozen literal departs from its live value | Holds the gate. The literal is re-derived from the live oracle in this chain, and the change is read before it is frozen | Same | Same | — |
| C5 the site differs from the oracle on the agree class | A defect: it holds the gate, and is fixed (D-7) | A defect of the new pin or of the site | A defect: it holds | — |

The gate rule for later chains is carried after this chain closes by the workspace `CLAUDE.md` Test Conventions update in M7.

**Three classes (F-6).** Each input is classified on the text Discord would store (research V-19 trimming applied), in the research's
**loose** canonical form (research § Methodology: newlines at run and code-body edges trimmed; `http(s)` URLs in Discord's stored
spelling). The strict-form disagree count is reported beside it (F-14).

| Class | What is asserted | Against what | Where it is listed |
|---|---|---|---|
| agree (legacy ≡ native) | Preview DOM (AC-3.1) and editor classes (AC-3.2) | The legacy tree, and AN-6's frozen literals | The run's counts |
| disagree | The site's rendered DOM equals the engine's own tree, the renderers' fidelity (AC-3.6) | The engine's tree through the test normaliser. The renderer is the code under test, and its expected value is computed by the engine and the normaliser, not by the renderer | The known-differences report |
| native-only (a surface AN-3 finds with no legacy rule set, such as the V2 text display) | As disagree (AC-3.6) | As disagree | The known-differences report, with the surface named |

Nothing asserts that the engine matches Discord on the disagree or native-only classes: D-5 removes that standard there. Such an
engine difference is detected by no one, and that is accepted as X-18.

What it holds besides:
- **Generator.** A seeded generator over the syntax class: every `Syntax` bit's constructs, nested to depth 3, with delimiters
  balanced and unbalanced, and the link forms of D-2 (bare, `<…>`, `<email>`, masked with a title and with angle brackets). It also
  generates:
  - emoji in, before and after links, and inside masked-link labels (G-14);
  - every emoji form AC-6.2 lists;
  - escapes, lists, headings, subtext, quotes and fences;
  - timestamps of every style letter, invalid styles included;
  - mentions of every kind.
- **Fixed inputs**: the 272-case research corpus (`research/closed/slate-formatting-discord-oracle-2026-11-23.md` Appendix C, record
  `a666dbd9`) and the inventory's link inputs, **106 distinct strings**, at `verification/019/qa/link-inputs.json` (QAF-11). Both are
  lifted into the repo as data.
- **Lifted seeds** (effort block 15:49Z item 3): the 20-atom differential's atoms; the seeded random typed-edit differential (its
  15,480 edits at its committed seed, with QAF-4's 346 wrong edits as fixed members); and the loader-identity driver's inputs. Each
  becomes a block-layer input class for AC-3.3. The decorator chain's grammar-oracle and probe instruments are lifted the same way
  (S-13). None keeps a review-round or chain name.
- **Coverage report (QAF-8).** Per (`Syntax` bit × surface), the count of agree-class members that contain that construct. A cell at
  0 is named as unexamined in the run output.
- **Known-differences report (CF-4).** Generated from the disagree and native-only classes, never hand-written. It is written to a
  website-local path that `.gitignore` excludes. The stage that runs the command copies it into `verification/019/`.
- **Drift alarm.** It fetches `discord.com/app`, locates the wasm by the glue predicate (research V-1), and compares its SHA-256
  with the pinned wasm's. A mismatch is reported (C2).
- **Normaliser.** The canonical-form normaliser is a test module. Its positive control is that it reports every Appendix A pair as
  differing, after the research's four recorded artefacts are dispositioned. Its second, differently shaped instrument is the
  research's DOM-to-canonical comparison over the posted messages, re-run on AN-7's reads (QAF-6b). A mismatch is a candidate until
  a member is read.

Acceptance criteria:
- **AC-3.1 Preview oracle (D-4, D-5).** For every input in the agree class, on every surface whose mask AN-3 settles, the preview's
  rendered DOM in loose canonical form equals the legacy tree's.
  - The expected value is the legacy tree, computed by Discord's fetched code under the parse state a webhook-sent message gets
    (AN-4's G-14 read).
  - Membership in the agree class is decided by the legacy and native parses, both run with AN-3's literal masks, never the
    adapter's constants (QAF-2).
  - The native parse decides membership only, never the expected value (axiom E).
  - Input classes: the generator's output at the committed seed and count, the 272 corpus, the 106 link inputs, and masked links
    whose label holds an emoji. Residue: X-19.
- **AC-3.2 Editor oracle (D-4, D-5; QAF-1).** For every typed-case input, membership is decided by comparing AN-6's legacy box run
  with AN-6's frozen native mapping (a mapping written from AN-6's prose read, separate from the adapter). The adapter's token map
  never enters membership or expected value. On the agree members, the editor's per-character style set and marker flag equal the
  legacy run's. Residue: X-19. Heading, list and cross-line limbs follow D-11 (AC-5.6).
- **AC-3.3 Round trip (no Discord oracle; research gap 7).** These are properties of the site over the generator, the corpus, the
  1,662-line probe corpus and the lifted block-layer seeds, in each editor mode (F-9):
  - **full mode** (content, embed description, field value, V2 text display) and **partial mode** (`partialMarkdown`: embed title,
    field name);
  - load (`getInitialValue`) then save (`flattenNodeText`) returns the input character for character, emoji included (D-10);
  - typing the input one character at a time into a mounted editor yields the same text;
  - pasting it whole yields the same text, for every input the mode's paste handler accepts. P-5's two refusals (a multi-line paste
    in partial mode; a paste over 6,000 characters in either mode) are kept as today's failure-path behaviour, and after a refused paste
    the editor's text equals its text before the paste;
  - normalisation settles, and a forced re-normalise after settling performs zero operations (QAF-9).
  The generator count that `pnpm test` runs is fixed from QA's EC-4 measurement of per-input cost, taken before implementation
  approval, and the plan records the figure and the suite's added wall time beside it (critic Q2).
- **AC-3.4 Seen red (F-10).** Each criterion is shown failing under a restored mutation of the code it exercises. For AC-3.1, AC-3.2
  and AC-3.6, that is the adapter's maps, masks and renderers. For AC-3.3, it is the function each property drives (`getInitialValue`,
  `flattenNodeText`, `withNormalizeNode`, the paste handler). Each limb also fails at the chain base on at least one named input,
  except the normalisation limb, which the base already passes: that limb is shown red by mutation only.
- **AC-3.5 Fetch failure is loud (D-12).** In the loopback-only namespace, `pnpm test:discord` exits non-zero, naming the fetch, and
  reports no pass count, while `pnpm test` exits 0. A predicate matching zero modules or more than one fails, naming the predicate.
- **AC-3.6 Renderer fidelity on the other classes (F-6).** For every disagree and native-only input on every surface, the preview's
  DOM in loose canonical form equals the engine's tree in the same form.

The decorator tests at the base (`decorator.emphasis-syntax-ranges.test.ts`) assert the width inference M5 deletes. Each case is
re-based on the token map, or retired under the Test Conventions' "superseded implementation" class with its named covering case
(integration requirement 7).

Anything M3 adds to `package.json` (a browser driver, per AN-4) takes AC-2.2's exact pin and lockfile disposition (F-13).

Rollback: revert its commits, run by the implementer before release or devops after. The production effect is none, except the
`test` script's change, which the revert restores.

### M4 — The preview on the engine (S-06, S-10, LF-1, LF-3, LF-4, LF-6 preview side; D-8)

Mirrors: the site's existing renderers, kept rather than replaced (AF-2): `MarkdownSpoiler`, `MarkdownTimestamp`, the
guild-resolved mentions, `next/image` emoji and highlight.js code blocks (`website@af3d95a
src/utils/markdown/rules.tsx:staticBaseRules`, each rule's `react` output). The tree comes from AN-5's form. Every static parse path
goes through the adapter with its surface mask: `Markdown.tsx`, `ContentBody`, `TextDisplayEditor`, `Embed`, `EmbedTitle`,
`EmbedField`, the `DiscordContentEditor` read-only branch, and `/preview`. The timestamp callback's signature change and its readers
follow the architect's CF-6.

Acceptance criteria:
- **AC-4.1 (D-5).** AC-3.1 and AC-3.6 hold for the preview, on every surface.
- **AC-4.2 Links.** For every link the engine returns, the anchor's `href` is the engine's `url`, subject to AC-4.6, and the visible
  label is the one AN-5 establishes Discord draws. The source text's emoji are never rewritten to `:name:` in a target or a label,
  over LF-1's class: every link form × an emoji before, inside and after.
  - Human-observable form: on a local production build, typing `https://x.y🙂` and `[a](https://x.y/🙂)` into the content editor
    gives two preview anchors. Each anchor exists, and neither `href` contains `:slight_smile`. Walked by UAT (QA register B-2).
    The production read is in § Testing Strategy.
- **AC-4.3 Timestamps (D-8; QAF-7).** For every message holding k ≥ 1 timestamps, editing the i-th rendered timestamp rewrites
  exactly that timestamp's source characters and no others, for every i, while the preview stays mounted. The message class
  includes:
  - timestamps inside code spans and code blocks;
  - identical duplicate timestamp strings;
  - an escaped `\<t:…>`;
  - an invalid style letter, which stays text (V-21);
  - timestamps inside a spoiler and inside a link label;
  - timestamps added before, between or after existing ones.
  `localDate` follows a re-render whose source changes that timestamp. The target comes from a span, never from a count or a search
  over the raw string.
- **AC-4.4 Mentions.** Every mention kind in AC-2.4's declared class renders something visible. A kind the site cannot resolve
  renders as Discord draws an unresolved one (research V-18: "@unknown-role", "/ping"). A kind with no Discord observation renders
  its source text (Exclusions X-14).
- **AC-4.5** The static emoji pre-transform (`utils.ts:staticParserFor`) has no caller on a preview path, read by AC-2.1's
  module-graph instrument.
- **AC-4.6 Link schemes (QAF-5).** Every rendered `href`, over the generator and the fixed inputs, has a scheme in the adapter's
  allow-list: `http`, `https`, `mailto`, `discord` (both Discord parsers link `discord://`, research Appendix B row 42), plus any
  scheme AN-3 shows Discord links on a surface. A link whose scheme is outside the list renders its label as text with no `href`.
  Controls run both ways: a planted `javascript:` url is refused, and an allowed one is kept.

Re-derivation gate: this milestone changes product behaviour (the preview's rendering of stored messages). When M4 ships on the chain
branch, every downstream milestone not yet authorised for execution is marked `PREMISE-STALE`, until one paragraph re-argues its
premise as a plan revision.

Rollback: revert M4's commits together with M5's, never one alone (AF-2). Devops after release, the implementer before it.

### M5 — The editor's colouring on `parseLossless` (S-01 to S-05, S-14, S-18, LF-1 editor side, LF-5, LF-6 editor side)

Mirrors: Discord's own native box, which decorates from `parseLossless` tokens (research V-6, V-11; module 818948 is read as prose
in AN-6, never copied). The `decorator` contract is kept: `(editor, mounted, isEmbed, parser) → ([node, path]) → Range[]`
(`website@af3d95a src/components/SlateEditor/utils/decorator.tsx` default export), with the surface mask in place of the parser.

- The decorator parses each line element's text as stored, emoji elements counted as their source text, and maps token spans onto
  the line's text nodes. The parse is cached per element per change, so a line is parsed once however many text nodes it holds
  (CF-1). The architect measured why: 2,154 ms per pass re-parsing per text node, against 5.2 ms parsing once, on a 2,000-character
  line with 401 text nodes (`verification/019/architect-conformance/split.out`). The cache form is the implementer's; a WeakMap
  keyed on the element is the architect's example.
- Width inference (`openingWidth`, `closingWidth`, `growMaskedLinkClosing`, `reduceAdjacentSyntax`), the interactive rule set's
  markdown path and `surrogateSourceOffsets` leave the colouring path.
- Code lines take highlight.js's public `HighlightResult.value` and scan its closed HTML grammar (`<span class>`, `</span>`, five
  escaped entities) with no DOM, in place of `_emitter.rootNode` (CF-7).

Acceptance criteria:
- **AC-5.1 (D-5).** AC-3.2 holds over every surface's editor.
- **AC-5.2 Split invariance.** For every line, the class set of each character is the same however the line's text is divided into
  Slate text nodes by emoji elements, mentions or timestamps. This covers S-01's class and every inline-object split.
- **AC-5.3 In range.** No decorator range ends past its text node's end, and none is zero-length (S-03, S-04). This holds over the
  generator, the corpus, and the code lines of every language `hljs.listLanguages()` returns at highlight.js 11.12.0 (193, QA's read
  at `af3d95a`).
- **AC-5.4 Code lines (S-02, S-14).** A nested highlight scope keeps its outer scope's class on every character it covers, for every
  language whose grammar nests. The expected value is highlight.js's HTML for the whole line, parsed by jsdom's `DOMParser`, never by
  the decorator's scanner. No highlight.js member outside its public typings is read.
- **AC-5.5 Real browser (S-18).** In Chrome, on a local production build, no character in AN-6's discriminating cases is coloured
  differently from its jsdom class list. Walked by UAT (QA register B-3), with captures under `verification/019/uat/`.
- **AC-5.6 (D-11; F-8).** The rule covers the inline runs: the five `ModifierKind` members, inline code, and links.
  - Each line's inline-run classes are computed from that line's text alone, so an inline run whose delimiters sit on different
    lines styles neither line.
  - No character of a heading marker (`#`, `##`, `###` and its space) or a list marker (`-`, `*`, `1.` and the like, with its space)
    carries a style class.
  - The subtext marker `-# ` carries the marker class Discord's box gives it (research V-21).
  - Code-line, fence-line and quote-line context comes from the Slate layer, as today (`ancestor.lang`, `startCodeBlock`), and keeps
    its styling.
  Expected values are AN-6's frozen literals on its agree set.
- **AC-5.7 One parse per element (CF-1).** In one decorate pass over an editor value, the engine is called at most once per line
  element, whatever the number of text nodes in it. This is counted, not timed. It is shown red against the form without the
  cache, on a line with at least 50 text nodes.

Re-derivation gate: M5 changes what the editor shows. When it ships on the chain branch, M6 and M7, if not yet authorised, are marked
`PREMISE-STALE` until re-argued.

Rollback: with M4 (AF-2).

### M6 — The Slate layer: round trip and input (S-07, S-08, S-09, S-17, S-29, S-30)

Mirrors: chain `fix-normalize-fence-loop`'s fence and quote handling at `af3d95a` (`codeFence.ts`, `withNormalizeNode.ts`
`handleElement`) and its tests (`withNormalizeNode.quote-and-fence-lines-settle.test.tsx`,
`SlateEditor.opening-writes-stored-text.test.tsx`), which this milestone extends rather than duplicates.

Acceptance criteria:
- **AC-6.1** AC-3.3 holds for every input in its classes. Illustrative members, re-read at the chain base before the change:
  - S-29 in QAF-4's widened form: any typed edit inside a fence that turns a quote line into code keeps that line's `> ` or `>>> `
    in the saved text, over the 346 recorded edits and the random differential's class;
  - S-17: escaped markdown on open.
- **AC-6.1b (S-30), a read rather than a fix.** Read at `0411d3b`: every `saveMessage()` caller is a user act. `git grep -n
  "saveMessage("` gives four sites: two in `Navigation.tsx`, and two in `edit/page.tsx` (the save hotkey and a button). So opening a
  box without saving wrote nothing to the server; a rewritten `>>>` reached it only through a later user Save, or through Send or
  Save-as from that state. The code review re-reads this at the chain base, over the five `message.upsert` writers (QA's count;
  `system-architecture.md` Persisting writers). At the tip, AC-3.3's load-then-save identity holds for every `>>>` input. Production
  residue is X-20.
- **AC-6.2 (D-10; QAF-12).** Over every emoji form, the saved and copied text equals what was typed or pasted, character for
  character, and stored text, `:name:` included, loads and saves unchanged. The forms are:
  - a Unicode character, a ZWJ sequence, a skin-tone sequence, a keycap, a flag, a tag sequence;
  - VS-16 against text presentation;
  - an emoji newer than the site's table;
  - a typed `:name:`, and `:🙂:`;
  - custom `<:n:id>` and `<a:n:id>`;
  - emoji in link labels and targets.
  The expected values are literals. Stored messages are not migrated (D-10).
- **AC-6.3 (S-08; F-18).** A guild emoji picked from the picker into a content line, a code line and a quote line keeps every
  character around the cursor, and inserts the emoji's text form. Walked by UAT (QA register B-4) on a build signed in as a test
  account that can use the test guild's emoji.
  - **Provision step, from plan time**: before the UAT walk, the analyst reads whether a local build can complete Discord sign-in.
    This checks the NextAuth Discord provider's redirect host against the OAuth application, reading key names and hosts only, never
    values. It runs alongside AN-7 with the test-account browser (block 09:05Z item 2: the `discord-test-browser` skill "may be able
    to drive the guild-emoji picker").
  - Where sign-in cannot be completed, the limit quotes that attempt, and handoff 5b19c3e4 item 1 stays its carrier.
- **AC-6.4 (S-09; F-18).** Composition events on a phone keyboard: the box has no phone or mobile IME. What would build a place to
  read it is his own phone walk on production after deploy. That is an optional owner observation, whose quoted attestation is
  complete evidence, carried by handoff 5b19c3e4 item 2. Its `Review-Trigger` fires on this chain's edit of `setOnInsert`, if M6
  makes one.
- **AC-6.5 Emoji lift equals the engine (CF-2 option a; QAF-12; F-23).** Over the generator, the corpus and the 1,662-line probe, the
  set of character ranges the Slate lift turns into emoji elements equals the set of `emoji` nodes the engine returns for the same
  text under that surface's mask. `emoji.tsx` is fixed until it holds (research Appendix B row 230's `©` is a member). Under OQ-5's
  option b, this criterion is replaced by the lift reading the engine directly.

Re-derivation gate: M6 changes a stored representation (D-10's saved emoji). When it ships on the chain branch, M7, if not yet
authorised, is marked `PREMISE-STALE` until re-argued.

Rollback: revert its commits; the implementer or devops, as above.

### M7 — Release

The same release carries M2 to M7 (AF-2). No release tree holds M4 without M5, checked by devops at Stage 1 from the chain's commit
list.
- Name what the deploy moves: website `master` from the chain base to the tip.
- Record updates, proposed in this chain and landed by their owners:
  - The workspace `CLAUDE.md` Test Conventions (canonical `agent-output/CLAUDE.md`) gain the two-command form, the definition of
    offline, and the outcome table's rule for later chains (CF-3, F-2). The sentence "runs the whole suite" changes with them. The
    implementer proposes the text in its implementation document at M3, and steering lands it in the record at release.
  - The architect's closing pass: the Problem Area rows (Header notes), the Dependencies line, and the Quality Attributes "Tests"
    line.
- The X-8 handoff (option a only) is minted by devops at Stage 1: Owning-Stage planner, Review-Trigger "when the Slate emoji lift
  (`parseEmoji`, `getInitialValue`, `withNormalizeNode` `handleElement`) is next edited".
- The tip-moving housekeeping lands in one commit before QA Phase 3.

## Testing Strategy

The binding standard is the workspace `CLAUDE.md` § Test Conventions (`agent-output/CLAUDE.md`), axioms A to E included.
- **Test types**: unit tests (Node) for the adapter's maps, masks and allow-list; DOM tests for the renderers and the mounted editor;
  property tests over the generator; the `discord` project (D-12); and real-browser walks by UAT on a local production build.
- **Hosts and instruments**: this box has Chrome through the browser-walker, Playwright Firefox, and the test-account browser (qa and
  uat). Puppeteer at the generator's pin runs in an export. Discord reads use the test-account browser on guild
  `1566742402180456559`. There is no WebKit (X-17).
- **Probe versus gate**: AN-1, AN-2 and AN-6 are pre-landing probes. AC-2.5, AC-4.2, AC-5.5 and AC-6.3 are post-landing walks (QA
  register B-1 to B-4).
- **Tools changed by this chain and used by its own gates**: the normaliser (M3), with its positive control and second instrument as
  stated there. The `test` script itself changes: QA Phase 2 runs the chain base's `vitest run` beside the tip's two commands, and
  compares the files collected by path membership.
- **Post-deploy observable** (his link report, D-2; QA register B-5). On production `hooks.gg`, in the route-0 editor, typing
  `https://x.y🙂 [a](https://x.y/🙂)` gives two preview anchors. Each must exist, and neither `href` contains `:slight_smile`. QA read
  production at 2026-11-23T16:00Z and found the hrefs `https://x.y:slight_smile` and `https://x.y/:slight_smile:` (QA document,
  B-5). Its reader is the carrier devops's Stage 1 creates, never Stage 1 itself (F-15).
- **RK-2's post-release read**: a generated preview image of a formatted message is QA's candidate E-4. QA mints it or declines it at
  the re-key after AN-2 lands. Until then, no stage reads a generated image after release (X-21).

## Validation

- The release-move dry run and report at `af3d95a`: exit 0, both (Header notes, revision 0's pass). Devops re-runs both at the tip.
- P-1's probe: exit 0, output captured.
- The suite baseline at `af3d95a`, from QA Phase 1 (`qa/019-slate-formatting-discord-engine-qa.md`, run 2026-11-23): `pnpm test`
  in a loopback-only namespace gives 2696 of 2696, exit 0, 172 files. It is re-read at the chain base by the base re-derivation step.

## Risks

- **RK-1** The wasm does not build or serve under Turbopack (AF-5). Falsifier: AN-1.
- **RK-2** The generator captures `/preview` before the formatted render (P-2). Falsifier: AN-2's count, and its gap distribution
  as the margin. After release, X-21 applies until QA mints E-4.
- **RK-3** The package's tree shape changes between releases (V-12). The exact pin, the adapter and AC-2.4's two enumerators
  catch it: the type-check catches declared kinds, and the observed enumerator plus the unmapped-kind line catch undeclared ones.
- **RK-4** Users on Discord's legacy path see the disagreeing cases drawn differently from the site (V-18: 33 of the 272 stored
  texts; D-6's option text). This is accepted, and the known-differences report lists them.
- **RK-5** Stored messages' preview images change on regeneration wherever the old rules differed from Discord (V-10). The stored
  corpus is unread (`handoff/bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md` item 7 shares the class). This is accepted
  under D-3.
- **RK-6** The oracle fetch breaks: Discord changes its page or blocks headless clients. The outcome table's C1 and C3 cover it.
- **RK-7** Bundle cost on mobile: about 451 KB gzip of lazily loaded wasm. AN-1 measures it.
- **RK-8 (standing prediction, the critic's class, cycle 1 pass 1).** The class: "a statement in M2 to M6 of what the site does
  today (a loading state, an editor mode, a refusal, an input the block layer supplies, a build target) is contradicted by the code
  at the base or by a closed plan." Falsifier: a later pass or stage finds one more member. The members so far are F-3, F-8, F-9 and
  F-11, each folded in revision 2 by a premise read at `af3d95a` (P-4, P-5, P-6, AN-1's Vercel limb). Record per review pass:
  - pass 1: four members;
  - pass 2: (to be written back when the pass reports).

## Exclusions

| Exclusion | Reason | Carrier |
|---|---|---|
| X-1 The fence-loop and blockquote defects (inventory X-1, X-2) | Chain 9c+9f, released at `af3d95a`. | `deployment/fix-normalize-fence-loop-deployment.md` |
| X-2 S-11 (draft after a typed-back edit) | Draft state, not formatting (block 09:18Z). | `handoff/typed-back-edit-leaves-saved-message-draft-2026-11-21.md`, whose "website editing effort is scoped" trigger fires on this plan and is dispositioned here. |
| X-3 S-12 | Same block. | `handoff/fix-desktop-draft-as-typed-residue-2026-11-21.md` |
| X-4 S-15 | Held for his decision (block 09:18Z). | `handoff/website-018-standing-risks-save-toast-and-lint-stack-2026-11-20.md` RK-3 |
| X-5 S-16 | Already a fixer rider (block 09:18Z). | The fixer queue in `steering/fixer-queue-2026-11-21-rulings.md` block 09:18Z |
| X-6 9e and the `/preview` matcher | Outside the region. | `TODO.md` |
| X-7 S-19 to S-28 | Fixed; their tests stand. | Stated limit (inventory § 1) |
| X-8 The Slate emoji lift stays on `simple-markdown` (option a), held equal to the engine by AC-6.5 | The lift is the Slate layer (AF-9), read as outside D-6's reach; OQ-5 is at steering. | The handoff devops mints at M7 |
| X-9 Slate block structure from `parseLossless` | A later effort (AF-9). | `system-architecture.md` Problem Areas row |
| X-10 Third-party clients | D-9. | Research G-6 |
| X-11 Generator-side changes | Outside the region; AN-2 decides whether one is needed. | Re-scope to steering |
| X-12 Open handoffs whose trigger this chain fires but that have nothing in the region: the tRPC leftovers (fire on the `package.json` dependency edit); the `qa-014-bc7` inventory (fires on "website test effort scoped"; its items are the analyst's and the record's); the 015 assumptions (fire on "next website effort scoped"; items 1 and 7 are used here as premise and risk) | Nothing in the region. | Each handoff, unchanged |
| X-13 The native parser seen rendered (G-11), if AN-7 cannot read test account 2 | No session's browser holds that profile. Under D-5 it decides nothing; the native half rests on research V-4's byte identity. | Stated limit |
| X-14 Mention kinds with no Discord observation (G-13 not completed, and any kind beyond the walk) | Discord draws an id it cannot resolve as text (V-18). | Stated limit at AC-4.4; a user report goes to this row |
| X-15 D-10's premise unread, if AN-7 does not complete it | The option stated it unchecked. | D-10's reopening class |
| X-16 The emoji-label DOM check (G-14), if AN-7 does not complete it | AC-3.1 asserts that class against AN-4's code read alone. | Stated limit |
| X-17 Safari | No WebKit on the box (QAF-10). | Stated limit; a user report goes to this row |
| X-18 The engine's differences from Discord on the disagree and native-only classes | D-5 removes Discord as the standard there; nothing detects them. | The known-differences report |
| X-19 AC-3.1 and AC-3.2 residue: rendering beyond the tree (emoji image choice, highlight colours, locale wording; research § 4 gap 4); inputs the API rewrites (whole-message edge whitespace, unusable custom emoji ids; V-19); what the loose form blurs (run-edge and code-body newlines, URL spelling); box inputs replaced by an inline object (V-21) | No Discord oracle reaches them. | Stated limit |
| X-20 Production messages already rewritten from `>>>` to `> ` | Production data, his (effort block 15:49Z). | His check, per that block |
| X-21 No post-release read of a generated preview image until QA mints E-4 | Its instrument waits on AN-2. | QA's candidate E-4 (QA document) |

## Finding disposition (revision 2)

| Finding | Folded at |
|---|---|
| F-1 | M1, a "Not completed" outcome per item |
| F-2 | M3 outcome table; D-5's instrument; M7's Test Conventions update |
| F-3 | M2 loading states; P-4 |
| F-4 | AN-2 gap on every capture; RK-2; X-21 |
| F-5 | AC-2.4's two enumerators; the unmapped-kind line; RK-3; AC-2.3's `0` rule |
| F-6 | M3's three-class table; AC-3.6; X-18 |
| F-7 | AN-3's legacy-only clause |
| F-8 | AC-5.6 |
| F-9 | AC-3.3's modes; P-5 |
| F-10 | AC-3.4 |
| F-11 | AN-1's Vercel limb |
| F-12 | Header notes, Base re-derivation step |
| F-13 | AN-4's install read; M3's pin rule and rollback |
| F-14 | M3, the loose form; X-19 |
| F-15 | Testing Strategy, post-deploy observable |
| F-16 | AC-2.7 |
| F-17 | Reading Order |
| F-18 | AC-6.3 provision step; AC-6.4 |
| F-19 | AC-3.1, AC-3.2, AC-4.1 and AC-5.1 name D-4 and D-5; D-4 and D-5's rows name the criteria |
| F-20 | X-13 to X-16, X-19, X-20 |
| F-21 | AC-2.1, AC-2.2, AC-2.6 |
| F-22 | The gates in M5 and M6; M7's minting stage |
| F-23 | AC-6.5; the Header notes Problem Area line; M2's provider sentence |
| Critic Q1 | AC-2.1's oracle helper, with literal masks |
| Critic Q2 | AC-3.3, the count fixed from EC-4 |
| Critic Q3 | The outcome table: no outcome makes a release wait on Discord's schedule except C3's legacy-gone case, which is D-5's own stop condition |
| CF-1 | M5 cache; AC-5.7 |
| CF-2 | AC-6.5 (option a); OQ-5 (option b) |
| CF-3 | M3 form; M7 |
| CF-4 | M3 known-differences report |
| CF-5, CF-6 | P-4; M4 (carried as written in the architect's document) |
| CF-7 | M5; AC-5.4; OQ-4 resolved |
| QAF-1 | AC-3.2; AN-6 |
| QAF-2 | AC-3.1; AC-2.1 |
| QAF-3 | AC-2.5 |
| QAF-4 | AC-2.3; AN-3 |
| QAF-5 | AC-4.6 |
| QAF-6 | M3 form (frozen and live literals); Normaliser |
| QAF-7 | AC-4.3 |
| QAF-8 | M3 coverage report; three-class table (V2 text display native-only) |
| QAF-9 | AC-3.3 |
| QAF-10 | AN-1; AC-2.5; X-17 |
| QAF-11 | M3 fixed inputs; M1 lift of scratch instruments |
| QAF-12 | AC-6.2; AC-6.5 |
| QAF-13 | M3, the definition of offline; AC-3.5 |
| QAF-14 | AC-2.6 |

## Planner batch

| Item | Source row | Disposition |
|---|---|---|
| G-14: which legacy parser state (`allowEmojiLinks`, a message's `webhookId`, research § 3 step 1, module 354777) AC-3.1's oracle runs under, so an emoji inside a masked-link label on a webhook-sent message has the expected value Discord draws; with the research corpus now in its Appendix C as M3's source | `research/closed/slate-formatting-discord-oracle-2026-11-23.md` Remaining gaps row G-14 (record `a666dbd9`); `INBOX.md` last entry, researcher-slate-formatting-oracle FYI | Discharged at revision 1 into AN-4, AN-7 and AC-3.1; corpus source in M3. |

## Version Management

The website `package.json` carries no `version` field, so no version or CHANGELOG milestone is written. Devops names what the deploy
moves.
