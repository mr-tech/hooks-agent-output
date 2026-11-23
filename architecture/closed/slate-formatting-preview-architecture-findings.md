---
ID: n/a
Origin: slate-formatting-effort
UUID: c7a4b482
Status: Resolved
Status-Detail: >-
  Carried whole by plan 019 (AF-2 M7, AF-3 M2, AF-4 AC-2.6, AF-5 AN-1, AF-7 P-2/AN-2, AF-8 D-11, AF-9 X-9); its conformance
  findings continue in `architecture/019-slate-formatting-discord-engine-architecture-findings.md`. Pre-planning review of OQ-4 (use Discord's published formatter in the product, or keep the site's own rules and test
  them against it). Verdict APPROVED_WITH_CHANGES for adoption: one parse engine (`@discord/markdown-wasm`, exact pin)
  behind a site-owned adapter, for the preview and the editor's colouring, in one release; the site's own renderers stay;
  the old formatter stays test-only. The owner chose B by selection at 2026-11-23T15:23Z (effort rulings, record
  `5d7fbf5e`); `planner-slate-formatting` plans from it. The planner inherits this document when it mints the effort's ID;
  it closes when the plan's conformance pass has read the adopted option.
---

# Slate formatting effort — use Discord's formatter, or test against it (OQ-4)

## Changelog

| Date (UTC) | Agent | Change | Notes |
|---|---|---|---|
| 2026-11-23T15:59 | architect-019 | Closed Resolved and moved to `closed/` | Plan 019 revision 1 (record `103687b4`) carries every AF item; its conformance pass read the adopted option, which was this document's stated closing condition. The plan's own findings document is `architecture/019-slate-formatting-discord-engine-architecture-findings.md`. |
| 2026-11-23T15:25 | architect-slate-formatting-preview | Owner's answer recorded (§ Owner's answer) | From effort rulings block "2026-11-23T15:23Z" (record `5d7fbf5e`), relayed by `steering-hooks-fixer`. Status stays Active until the conformance pass. |
| 2026-11-23T13:13 | architect-slate-formatting-preview | Document created; pre-planning review of OQ-4 | Brief `steering/slate-formatting-preview-brief-architect.md` from `steering-hooks-fixer`. Read whole: the brief, research `research/slate-formatting-discord-oracle-2026-11-23.md` (record `2db3cc2f`), rulings blocks 09:07Z to 09:18Z, 09:32Z and 13:09Z, the scoping inventory, `architecture/website.md`. Read in part: the master document's Components, Dependencies and Problem Areas. Website read at `origin/master` `0411d3b` from a `git archive` export (the shared tree was not touched). The three npm packages were downloaded with `npm pack` and read, not run. One read was not completed: what the preview-image generator waits for before it captures (AF-7). |

## Question

His selection at 13:09Z sends OQ-4 here before the planner sizes the effort. The question: should the website's preview
use `@discord/markdown-wasm` and `@discord/markdown-react` in the product, or keep its own `simple-markdown` rules and
use Discord's formatter only as the test reference? The standard he set at 13:09Z governs both options. The site is
held to Discord only where Discord's old and new formatters agree, and the cases where they disagree are listed as
known differences.

## What the site has today (read at `0411d3b`)

- **One parse library, two rule sets, three surfaces each.** `src/utils/markdown/rules.tsx` (551 lines) defines
  `staticBaseRules` (the preview, which renders React) and `interactiveBaseRules` (the editor's colouring, which returns
  an AST). `src/utils/markdown/index.tsx` builds `parseContent`, `parseEmbedTitle` (links, code blocks, headings and
  lists removed) and `parseEmbedField` (headings removed) from each set, and adds `interactive.parseEmoji`.
- **The engine is `simple-markdown` `^0.7.3`** (last published 2022), patched under `patches/` so that its elements
  carry React 19's `react.transitional.element` symbol and no `ref`.
- **The emoji pre-transform.** `src/utils/markdown/utils.ts` `staticParserFor` and `interactiveParser` run
  `translateSurrogatesToInlineEmoji` before any rule. The interactive parser then attaches `surrogateSourceOffsets`, so
  that the decorator can map parsed widths back to the typed text. The pre-transform is the cause of LF-1 and S-06 (the
  preview rewrites a link target), and the offset map exists only because the parse runs over different text from the
  text the user typed.
- **The editor's colouring** is `src/components/SlateEditor/utils/decorator.tsx` `decorator`, which walks the
  interactive AST. It infers each delimiter's width from the node type and the source text (`openingWidth`,
  `closingWidth`, `growMaskedLinkClosing`, `reduceAdjacentSyntax`), with `createLeaf.ts` assigning classes. That
  inference is where the largest open defect class sits: S-01 (3,641 of 7,137 grammar-oracle rows wrong) and S-04. The
  class S-26 fixed was in the same place.
- **The preview's rendering components are the site's own**: `MarkdownSpoiler`, `MarkdownTimestamp` (editable in
  place: `src/components/Markdown.tsx` rewrites the n-th `<t:…>` match of the raw string, which is S-10), mentions
  resolved through the guild, emoji images through `next/image`, and code highlighted with highlight.js.
- **The load and save paths do not use the markdown rules.** What is saved is `flattenNodeText` over the Slate nodes.
  `getInitialValue` and `withNormalizeNode` call only `parseEmoji`, to lift emoji into inline elements. Quote and
  code-fence blocks are recognised by the Slate layer's own regexes (X-1, X-2, S-29). S-07, the emoji stored as
  `:name:`, comes from the emoji element's serialisation, not from the parser.
- **The parser module loads late, on the client only.** `src/providers/MarkdownProvider.tsx` `useValue` imports
  `~/utils/markdown` in a `useEffect`, and `DiscordContentEditor` renders no markdown until that import resolves. So
  markdown is never rendered on the server today, and an asynchronous initialisation step fits where the module already
  loads.

## What the published packages are (read from the `npm pack` tarballs, 2026-11-23)

- `@discord/markdown-wasm` 0.16.0, MIT. Its only dependency is `@discord/markdown-types` 0.14.0 (MIT). It unpacks to
  1,255,295 bytes in 16 files, and the `.wasm` is 450,861 bytes after `gzip -9`. Outside Node it needs `await init()`.
  The browser loader is `WebAssembly.compileStreaming(fetch(new URL("./lib/discord_markdown_wasm_bg.wasm",
  import.meta.url)))`. `parse` returns the message tree, `parseLossless` returns the token tree with UTF-16 spans over
  the original text, and both take a `Syntax` flag mask.
- `@discord/markdown-react` 0.12.0, MIT. It unpacks to 7,746 bytes, has a `react` peer range of 17 to 19, and has no
  dependencies. It is only a tree walker: `NodeList` takes the tree and a `renderers` map with one React component per
  node type, and it fails on any node type that has no renderer. It brings no rendering of its own. Its `SpoilerProps`
  carries an `id` that is shared by the pieces of one spoiler the parser has split across lines.

## Critical review

### AF-1 MEDIUM — "Keep own rules, test against Discord" fixes the symptoms in the layer that produces them

Under this option the effort hand-edits regex rules in an unmaintained 2022 library until they match the output of a
Rust parser, and it does that three times over: the static set, the interactive set, and the decorator's
width inference. The research measured the static content set alone at 37 cases that differ from both Discord parsers
where those two agree (33 after its four normaliser artefacts; V-10, Appendix B). The editor set and the embed sets
were not run (G-9). Much of the difference is grammar rather than edge cases: there is no subtext rule, the heading rule
matches mid-line, `+` counts as a list bullet, and three timestamp styles and two mention kinds are missing. Each fix
then has to be carried into the interactive set and checked against the decorator's width inference. After the effort
ends, every change Discord makes is a silent divergence. It is caught only when someone bumps the test-only pin and the
fuzzer reports it. This option works, but it is not the best architecture for the product. Its one real advantage is
zero shipping risk.

### AF-2 MEDIUM — Adoption removes the defect classes instead of fixing them, but only as one engine for both views

With `parse` behind the preview and `parseLossless` behind the decorator, the following are removed rather than
repaired:
- the two-rule-set divergence (research § System weaknesses, bullet 2), because there is one engine with two views of
  one parse, which is W-3's intent ("preview must match the editor") carried down to the parser;
- the emoji pre-transform and its offset map, because the engine parses the typed text itself and its spans index that
  text (V-6), so LF-1, S-05 and S-06 lose their cause;
- delimiter-width inference in `decorator.tsx`, because `parseLossless` gives every delimiter as a token with a span
  (V-6). That removes the mechanism behind S-01, S-04 and the S-26 class, which is the effort's largest single defect
  class;
- the in-preview timestamp's "n-th regex match" targeting (S-10 causes 1 and 2), provided the edit target is taken from
  a node's span. `parseLossless` spans are read (V-6). Whether `parse` nodes carry spans is **unread**, so the plan
  reads it.

**Required change, and the reason the verdict is APPROVED_WITH_CHANGES:** the preview and the editor move in the
**same release**. If the preview moved first, it would follow the new engine while the editor still coloured by
`simple-markdown`, and the two would disagree more than they do today. That breaks W-3's "no drift between edit and
preview" during the gap. The milestones can be ordered inside the chain, but neither ships alone.

### AF-3 MEDIUM — The tree shape changes between releases, so it must stop at one site-owned module

V-12 found a node rename (`small` → `subtext`) between 0.15.0 and 0.16.0, nine days apart, and 28 releases since
May 2025. Shipping the package is acceptable only under these conditions:
- an **exact** version pin (no range), with the lockfile's integrity hash;
- **one adapter module** under `src/utils/markdown/` owning three things: the per-surface `Syntax` masks (content,
  embed title, embed field, Components V2 text), the call to `init`, and the mapping from Discord's node types to the
  site's renderers and leaf classes. No other module imports `@discord/markdown-wasm` or `@discord/markdown-types`. A
  shape change then touches one file and is found by the type-check;
- **an upgrade is a deliberate change**, run through the fuzzer and the known-differences report, never a bump done in
  passing.

`@discord/markdown-react` is optional. A local `NodeList` is about 40 lines and drops a second 0.x package. Taking the
package is acceptable if its pin and adapter rule are the same. Which one to use is a planner detail, not an
architecture decision.

The release churn also has a benefit under this option: upgrading the pin moves the site to Discord's new behaviour,
which under AF-1 would be hand work.

### AF-4 LOW — Licence and terms: shipping is acceptable

The package is MIT, and Discord, Inc. is the copyright holder and the publisher (V-3). That grant is a different object
from the extracted bundle module his 09:17Z ruling confined to tests. The extracted old formatter **stays under that
ruling**: fetched at test time, never committed, never shipped. Neither option changes that. MIT's one obligation is to
keep the copyright and permission notice with copies. The wasm reaches users' browsers, so the plan names where the
notice is carried (the package's own `LICENSE`, kept in the deployed asset set, or a third-party notices page). Whether
the product may ship a Discord-published MIT package is a product question, so it is put to him (§ Recommendation).
Architecture sees no obstacle.

### AF-5 MEDIUM — Bundle size and loading: acceptable, with two premises the plan must prove before it commits

- **Size**: 450,861 bytes gzip of wasm (measured `gzip -9`; Vercel's own compression of a `.wasm` asset was not read).
  It loads in the same lazy client step that already loads the markdown module, and only on pages that render markdown.
  What `simple-markdown` and the rule code weigh today was not measured, so the net change is not stated here. The plan
  measures both: the size of the editor page's markdown chunk before and after, recorded as a number.
- **Premise unread — bundling**: production builds run `next build`, which is Turbopack by default at Next 16. Whether
  Turbopack emits the package's wasm through `new URL("./lib/….wasm", import.meta.url)` from inside `node_modules` was
  not read. The plan's first milestone is a spike that builds and serves it, with `initSync` and a bundler-supplied
  `WebAssembly.Module` as the documented fallback. Under the premise rule this is marked unread for QA Phase 1.
- **Server rendering** is not needed today, because `MarkdownProvider` loads on the client only (read). The Node loader
  path therefore does not reach Vercel functions unless a later change renders markdown on the server.

### AF-6 MEDIUM — "Agree-only" under adoption: determinate where Discord disagrees, and the list is generated

Under his 13:09Z standard both options pass on the cases where the formatters agree. They differ on the 33 stored texts
where the formatters disagree:
- **Adopt**: the site renders those cases the way the new formatter does. That is one stated behaviour, and the
  known-differences list is generated mechanically by the old-vs-new diff ("the site follows the new formatter; an
  account on the old one sees X"). Most rows are not visible as different. Bold-in-italic against italic-in-bold looks
  the same. A spoiler that the new formatter splits across lines reveals as one piece (`SpoilerProps.id`, above).
  Leading-space headings and quotes need a space at the start of a line after the first, because the API strips the
  message's own leading whitespace (V-17, V-19).
- **Own rules**: the site's behaviour on those cases is whatever the hand rules happen to do, which may match neither
  formatter, and that is allowed under his rule. The list needs a third column (the site's own behaviour), and it
  changes whenever a rule is edited.

The one account observed sees the old formatter (V-18). That is a reason to keep the old formatter as a test oracle,
and both options keep it. It is not a reason to ship the old formatter's behaviour, because his standard does not ask
for it.

### AF-7 MEDIUM — The preview image path depends on when rendering finishes (read not completed)

Preview images are screenshots of `/preview` (D-003, W-4). Adoption adds an asynchronous wasm fetch and compile before
the first parse. Today the markdown module's dynamic import already delays rendering, so the question is not new, but
it gets heavier. What the generator waits for before it captures was **not completed** in this session. The plan
therefore reads it. If the generator does not already wait for the lazy markdown render, a page-side readiness signal
covers the wasm step too, and it is not a new mechanism for the wasm alone. Telemetry: a failed `init` in the browser is
reported as a normal-level client error, with the pinned version, and the preview falls back to plain text (the
characters stay, nothing is formatted), never to an empty block.

### AF-8 LOW — The editor's specification is the weakest part under either option

Discord's text box does not format like its rendered message (V-11, V-21). The one text box observed, on the old path,
leaves headings and lists unstyled and styles each line on its own. The new path's text box has not been seen (G-11).
What adoption gives is a token tree that Discord's own new-path text box is driven from (V-6, module 818948). That is
the closest thing to "Discord's editor by construction" that exists, and own rules have nothing like it. Two questions
stay the effort's under either option, and AF-2 does not settle them:
- **(a)** Should the editor colour `# ` and list markers (it does today; LF-7), or leave them plain the way Discord's
  box does?
- **(b)** Does a run that crosses a line break colour as one run?

Under "agree-only", the editor's expected values are the cases where the old text box (observed) and `parseLossless`
under a stated mapping (V-22: 43 of 68 identical) agree. The rest is a second known-differences list.

### AF-9 LOW — The Slate block layer stays the site's own under both options

Quote and code-fence recognition in `getInitialValue` and `withNormalizeNode`, and the serialisation in
`flattenNodeText`, are not markdown rules. Neither option removes them, and X-1, X-2, S-29 and S-07 stay as they are.
A later stage could derive block structure on load from `parseLossless`, whose tokens rejoin to the exact input (its
README), which is the round-trip property this layer keeps losing. That is recorded as a Problem Area candidate, not as
part of this decision. The effort's fuzzer covers this layer with properties under both options (§ Fuzzer).

## Alternatives weighed

| | A. Own rules, Discord as test reference | B. Adopt `@discord/markdown-wasm` (recommended) | C. Adopt for the preview only |
|---|---|---|---|
| Preview parse | `staticBaseRules` hand-fixed toward the agreed set | `parse` behind the adapter; the site's renderers kept | `parse` |
| Editor colouring | `interactiveBaseRules` + `decorator` width inference, hand-fixed | `parseLossless` tokens → leaf classes; width inference and offset map deleted | unchanged |
| Emoji pre-transform | kept; LF-1, S-05, S-06 fixed in place | deleted for parsing (the Slate emoji element stays) | split: deleted in the preview, kept in the editor |
| Removed from the product | nothing | `simple-markdown` and its patch (once the decorator moves), most of `rules.tsx` matching, `utils.ts` pre-transform, `decorator.tsx` width inference | part of the static set |
| Added to the product | nothing | 0.x MIT package, ~451 KB gzip of lazy wasm, one adapter module, an upgrade discipline | the same package |
| Divergence from Discord over time | silent until a test-pin bump | moves with each deliberate pin upgrade | moves in the preview, silent in the editor |
| W-3 (editor matches preview) | held by keeping two rule sets in step by hand | held by one engine | **broken**: two engines |
| Ship risk | none | bundling premise (AF-5), init failure (AF-7), churn (AF-3) | the same |

C is rejected on W-3. A is not rejected: it is the safe option and it is acceptable, but it is the costlier option
over time, for a smaller result.

## The fuzzer under each option

Both options need:
- the old formatter fetched at test time (his 09:17Z ruling);
- the new formatter pinned as a development or production dependency;
- the drift alarm (research § 4);
- **properties** over the Slate layer: text survives load → save unchanged, no normalisation loop, and a paste or type
  loses no character. No Discord oracle exists for these (research gap 7).

On top of that:
- **A** compares the site's static and interactive trees, for each of the three surfaces, against both Discord parsers
  through a canonical-form normaliser. It asserts on the agreed cases and reports the disagreeing ones, and it compares
  the decorator's per-character classes against expected styling derived from the same oracle. The parser grammar is
  the fuzzed space, and it is unbounded.
- **B** does not compare the site's parse with Discord's, because they are the same parse by identity (V-4, V-5). What
  is left is smaller and largely enumerable:
  1. the adapter's mapping from each node type to an element and from each token to a leaf class, which is finite and
     covered exhaustively;
  2. renderer DOM shape against the old renderer's tags (V-20) on the agreed cases;
  3. editor leaf classes from `parseLossless` against the observed text box on the agreed cases (AF-8);
  4. the old-vs-new diff, run as a report that generates the known-differences list rather than as an assertion on the
     site;
  5. the per-surface `Syntax` masks against whatever OQ-3 settles for embeds.

  The fuzzed space moves from a grammar to properties and a finite mapping.

## Integration requirements (if B is adopted)

1. An exact pin and a single adapter module (AF-3). Nothing else imports the package.
2. The preview and the editor ship in one release (AF-2).
3. Spike first: a Turbopack production build serves and initialises the wasm (AF-5). The editor chunk's size is
   measured before and after.
4. The generator's readiness covers the wasm `init` (AF-7). Init failure renders plain text and is logged at normal
   level with the version.
5. The MIT notice is carried with the shipped asset (AF-4).
6. The old formatter stays test-only, fetched at test time and never committed (09:17Z). The drift alarm compares the
   pinned wasm's SHA-256 with the one discord.com serves.
7. The existing decorator tests (`decorator.emphasis-syntax-ranges.test.ts`) assert the current inference's ranges.
   Under B they are re-based on the adapter's token mapping or retired under the Test Conventions' "superseded
   implementation" class, each with its named covering test.

Telemetry: the **normal** level carries the pinned version and init failures from the client, and the fuzzer report's
counts in its three classes (agree, disagree, native only). The **debug** level carries per-case trees. Neither carries
message content from users.

## Verdict

**APPROVED_WITH_CHANGES — recommend B, adopt.** `@discord/markdown-wasm` becomes the site's one parse engine for the
preview (`parse`) and the editor's colouring (`parseLossless`), pinned exactly, behind one site-owned adapter. The site
keeps its own renderers and its Slate block layer, both ship in the same release, and the old formatter stays test-only.
The changes this verdict requires are integration requirements 1 to 7.

**What the owner decides** (a product question, not an architecture one): whether the product may ship a package that
Discord publishes under MIT. If he declines, A is the fallback, and this review accepts it with AF-1 recorded as debt.

## Recommendation for steering's prompt

Context: his 13:09Z standard holds the site to Discord only where Discord's two formatters agree. Today the site keeps
its own copy of the formatting rules, in a 2022 library, as two hand-kept sets: one for the preview and one for the
editor's colouring. Discord publishes its new formatter on npm under the MIT licence, so it is the same code Discord's
web client runs.
- **Agent: use Discord's formatter in the site (Recommended).** One engine drives the preview and the editor's colouring.
  Many of the effort's bug classes go away instead of being fixed one by one, and the fuzzer gets smaller. Cost: about
  450 KB of extra download, loaded lazily with the editor; a pinned 0.x package that changes monthly, upgraded
  deliberately; and a build check first. The old formatter stays in tests only.
- **Agent: keep the site's rules, test them against it.** Nothing new ships. Every rule is fixed by hand to match
  Discord, in both rule sets, and later changes at Discord are found only by the tests.

## Owner's answer

By selection, effort rulings block "2026-11-23T15:23Z" (ledger `steering/selection-ledger/2026-11-23.md`, same block;
record `5d7fbf5e`). Options as put: *Agent: use Discord's formatter (Recommended)* / *Agent: keep the site's rules* /
*Agent: don't change either yet*. **Chosen: use Discord's formatter.** This is option B with integration requirements 1
to 7, an option agents composed; it is his choice among them, not his stated intent. Steering's reading of how it binds
with his 09:17Z ruling, from the same block: that ruling bars shipping code extracted from Discord's served bundle; the
published npm package is a different object, and this selection admits it to the product; the old formatter stays
fetched at test time, never shipped. The option text stated that on the 33 disagreeing cases the site shows the new
formatter's way, which the test account does not see today.

## Problem Areas lodged (master document)

- "The site's markdown is a hand-kept copy of Discord's rules in two rule sets" (Medium): added to `system-architecture.md`
  Problem Areas with this document as its reference. It is resolved if B lands, and stands as recorded debt if A is
  chosen.
- "Slate block structure is recognised by hand regexes, not from a lossless parse" (Low, AF-9): a candidate for a later
  effort, not this decision.
