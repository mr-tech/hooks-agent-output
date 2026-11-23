---
UUID: 91e0e83a
Status: Active
Status-Detail: >-
  The oracle question has a determination: Discord publishes its own message parser on npm under an
  MIT licence (`@discord/markdown-wasm`), byte-identical to what the web client serves, and it runs
  under plain Node. Discord's older parser runs from the logged-out public page. Both were run over a
  272-case corpus here, and the corpus was then checked against real Discord on the test server:
  the one account observed is drawn by the older parser, in messages and in the text box, on every
  case (V-15, V-18, V-21, V-23). Stays Active on one thing: the owner has not said which of
  Discord's two parsers is the standard where they disagree (OQ-1; 37 of 272 cases), and the
  recommended arrangement's "primary" depends on it. His answer closes this document. The published
  parser has not been seen rendered (G-11). The per-client checks of third-party clients stay not
  done by his selection of 2026-11-23T09:31Z.
---

# Which oracle can tell the Slate formatting effort "what Discord does"?

## Changelog

| Date (UTC) | Agent | Change | Notes |
|---|---|---|---|
| 2026-11-23T09:32 | researcher-slate-formatting-oracle | Document created | Brief `steering/slate-formatting-oracle-brief-researcher.md`; two addenda from `steering-hooks-fixer` (effort rulings blocks "2026-11-23T09:15Z" and "09:18Z") |
| 2026-11-23T09:35 | researcher-slate-formatting-oracle | Checkpoint at steering's ask; Resumption State written | Owner's selections recorded from effort rulings block "2026-11-23T09:32Z": client checks stay not done; the session restarts with the test-account browser. OQ-5 and G-6 retired on that selection. |
| 2026-11-23T10:33 | researcher-slate-formatting-oracle | Resumed from the Resumption State (record commit `ef9c9dd4`) in a fresh session with the test-account browser; check (c) recorded as V-15 to V-17; H-1 and H-2 closed | Brief `steering/slate-formatting-oracle-brief-researcher-resume.md`. Nothing written before the resume was re-verified except what V-15 to V-17 test (H-1, H-2, and the build number of V-1, read again from the signed-in page). Check (c) ran 09:39Z to 09:40Z and was sent to `steering-hooks-fixer` before 09:45Z (message id `1f0a6563-4bbf-4bd8-977c-7dc0f9b8d99f`); this session then made no tool call from 09:45Z to 10:33Z (its turn had ended; the cache-warm wake restarted it), so this row and the findings were written 52 minutes after the result. The walk added channel `slate-oracle-walk` to the test server; `test-estate.json` updated in the same turn. |
| 2026-11-23T10:54 | researcher-slate-formatting-oracle | Walk against real Discord recorded: V-18 to V-23 added; OQ-2, G-1, G-4, G-5 closed; G-11 to G-13 opened; § 3 rewritten as run; § 4 and Recommendations 1 and 2 revised; Resumption State rewritten; Short answer items 6 and 7 added | Of the pre-resume claims, the walk re-tested V-8's two probe artefacts and V-11's legacy text-box table (both borne out, V-18 and V-21) and V-2's "same switch for message and text box" for one account; no other earlier finding was re-run. One capture was redone: the first text-box pass carried a quote element from one case into the next, found when `>>>a` showed as a quote, and the quote cases were typed again with a check for an empty, class-less line (V-21). The first three text-box inputs went into the server search box, not the message box, and were removed without being submitted. A webhook was created and deleted in the walk channel; old scratch directories holding Discord's code and the website export were deleted. |

## Resumption State

Rewritten 2026-11-23 at the end of the resumed run. The next acts the 09:35Z checkpoint listed (the
three test-server checks) are done and recorded as V-15 to V-23; the checkpoint's own text is in
record commit `ef9c9dd4`.

**Done.** Everything in § Findings through § Appendix B, and the walk against real Discord: which
parser the test account is served, the whole corpus as bot posts and as webhook posts against the
rendered DOM, and the text box.

**Next acts.** None of this researcher's. What is left is the owner's (OQ-1), the architect's
(OQ-4) and the effort's (OQ-3, G-3, G-8, G-9, G-11, G-13).

**Approach in flight.** None.

**Refs.** Record repository `master`. Website read at `origin/master` `0411d3b`; the shared website
tree was not touched.

**Left on the test server.** Channel `slate-oracle-walk` (id `1574358729577599086`) in guild
`1566742402180456559`, holding the corpus as 278 bot messages and 272 webhook messages, kept so a
later walk (G-11) can read the same messages from another account without posting again. The
webhook that posted the second set was deleted at the end of the run. `test-estate.json` names the
channel.

**Scratch.** § Scratch instruments lists what was kept and what was deleted.

**Questions sent, and to whom.** To `steering-hooks-fixer`: OQ-1 and OQ-4 (before the checkpoint),
the check (c) result (between 09:40Z and 09:45Z, for OQ-1), and this document's path at delivery. Nothing was put to
the owner directly.

**Standing bounds.** Test server only; nothing to any other server, DM or person. Discord's code is
fetched from public assets, never committed, never shipped. The search over the cloned clients is not
re-issued in any form. No `.env*` value is read. The bare word `none` is not used in a command.

## Question

The owner is opening one effort for every formatting fix in the website's message editor (Slate) and
its preview, with a fuzzer meant to cover every edge case. The standard is Discord's own behaviour. A
fuzzer can only report "differs from Discord" if something tells it what Discord does. Which
implementations of Discord's message markdown exist, how faithful is each, how is fidelity checked
against real Discord, and which arrangement should the fuzzer use?

## Short answer

1. **Use Discord's own parser.** Discord publishes it: `@discord/markdown-wasm` on npm, MIT licence,
   copyright Discord, Inc. Its `.wasm` is byte-identical to the one the stable web client serves today.
   It runs under plain Node with no setup and returns a message tree (`parse`) and a token tree with
   character spans (`parseLossless`), which is what Discord's own text box uses for its highlighting.
2. **Discord is mid-migration between two parsers**, and they disagree on 37 of 272 corpus cases. The
   older one (a modified `simple-markdown` plus Discord's rule module) is still in the served bundle
   and is chosen per user by two experiments. It is not published, but it runs from the logged-out
   public page in a headless browser.
3. **No third-party library is close enough to be the oracle.** The best one agrees with Discord's
   parsers on 197 and 213 of 272 cases; Discord's two parsers agree with each other on 235.
4. **Third-party clients do not share Discord's markdown logic, except the ones that are Discord's own
   client** (client mods and wrappers). The owner's suggestion holds only for those.
5. **The comparison finds real differences in the website today**: its preview rules differ from both
   Discord parsers on 37 cases where the two Discord parsers agree with each other.
6. **The one signed-in account that could be observed sees the older parser.** Checked against real
   Discord on the test server on 2026-11-23: all 272 corpus cases, posted by the test bot and read
   back from the rendered page as test account 1, are drawn as the older parser parses them, and the
   message box styles what is typed the older way too (V-15, V-18, V-21). So the published parser,
   which is the practical oracle, does not describe what this account sees on 32 of 272 cases, and
   it has not itself been seen rendered (G-11).
7. **Discord's own text box does not format like its rendered message.** It leaves headings and
   lists unstyled, styles each line alone, and turns `> ` into a quote block as it is typed (V-21).
   "Same as Discord" therefore needs saying twice: once for the preview, once for the editor.

## Context

- Owner's words and steering's readings: `steering/fixer-queue-2026-11-21-rulings.md`, blocks
  "2026-11-23T09:07Z" to "09:18Z", read whole this session. Block 09:18Z is his ruling that an
  extracted Discord module may run as a test oracle if it is fetched from public assets at test time,
  never committed and never shipped.
- Architecture: `architecture/website.md` W-3 read (one component tree for edit and preview; preview
  must match the editor). No roadmap document was read; none is cited.
- Website code read at `origin/master` `0411d3b` (`git -C website rev-parse origin/master` after a
  fetch): `src/utils/markdown/rules.tsx`, `index.tsx`, `utils.ts`, and
  `src/components/SlateEditor/utils/decorator.tsx`. The site has two `simple-markdown` rule sets:
  `staticBaseRules` (preview) and `interactiveBaseRules` (editor colouring).
- Defect inventory `verification/slate-formatting-effort/scoping/inventory.md` read whole. It lists
  every Discord comparison as "unverified" for lack of access (its section 5 item 1). This document
  does not repeat its rows; § "The inventory's unverified link rows" answers eighteen of them.

## Methodology

Everything below was run or read this session unless a finding says otherwise. Discord's code was
fetched from public URLs only (`discord.com/app`, `/login`, `/assets/*`, and the canary and PTB
equivalents) and run only in this session's scratch directory, each run inside
`systemd-run --user --scope` with time, memory and task caps. Nothing of Discord's is committed here:
this document describes rules in prose and names modules by id and by a content predicate.

- **Bundle read.** `curl` of `https://discord.com/app` on 2026-11-23, then every script it names:
  364 files (`grep -o '/assets/[A-Za-z0-9._-]*\.js' app.html | sort -u`, counted with `grep -c .`),
  18 MB. Modules were split out by a small indexer and read as text.
- **Native parser run.** The wasm was loaded under Node twice: through a loader written here that
  evaluates the served glue chunk in a `vm` context, and through the npm package's own entry point.
- **Legacy parser run.** A throwaway headless Chromium (no profile, no sign-in) opened
  `https://discord.com/login`. A request filter allowed only `GET` of that page and of `/assets/*`
  and aborted everything else; every other host was made unresolvable. The page's own module loader
  was then asked for the parser module, found by its content.
- **Corpus.** 272 hand-written cases in 14 categories (headings 14, subtext 9, masked links 20, bare
  and angle links 22, spoilers 12, emphasis 38, code 25, quotes 20, lists 25, timestamps 12, mentions
  17, emoji 17, escapes 20, mixed 21; counted by a Python `Counter` over the corpus file).
- **Comparison.** Each implementation's tree is rewritten to one canonical string form
  (`b()`, `i()`, `u()`, `s()`, `sp()`, `c()`, `a(url|label)`, `h1()`, `sub()`, `q()`, `ul()`, `ol<n>()`,
  `cb(lang|text)`, `ts()`, `m()`, `e()`), then compared. Two forms: strict, and "loose", which trims
  newlines at the edges of text runs and of code-block bodies and serialises `http(s)` URLs the way
  Discord stores them (lower-cased scheme and host, `/` added to a host-only URL). **Every count below
  is the loose form.** The normaliser was written here and is the weakest instrument in the chain: a
  mismatch can be a normaliser artefact, so the counts are upper bounds on real differences, and the
  rows I recognised as artefacts are named where they occur.
- **Helpers.** Two `general-purpose` helpers gathered registry and GitHub metadata and shallow-cloned
  candidates; their tables were read here. Cells this document cites from them are marked "helper".
- **Walk against real Discord** (the resumed session, 2026-11-23). Posts were made as the test bot
  over Discord's REST API by a script written here (`drest.py`; the token read from its file and
  never printed), to a channel it created in the test server, and then through a webhook it created
  there. The rendered page was read in the test-account browser (Chrome on the kept profile, signed
  in as test account 1). Details and what the run corrected are in § "3. How to verify against real
  Discord". No helper was used for the walk. Nothing was sent as the test account; nothing went
  outside the test server.

## Findings

### Verified

**V-1. Discord's served web bundle carries two markdown implementations.** Stable build 679055
(version hash `c23d44ea…`, from `GLOBAL_ENV` in the fetched page).

| Role | Module id at this build | Found by (content predicate) |
|---|---|---|
| `simple-markdown` library, modified | 478676 | the error string `simple-markdown: outputFor` |
| Discord's rule sets (`RULES`, `EMBED_TITLE_RULES`, `INLINE_REPLY_RULES`, topic, poll, …) | 605275 | `EMBED_TITLE_RULES` + `INLINE_REPLY_RULES` + `looseEm` |
| Parser facade (`parse`, `parseToAST`, `parseTopic`, `parseEmbedTitle`, …) | 46054 | `parseEmbedTitle` + `parseTopic` + `parseInlineReply` + `parseToAST` |
| Heading, subtext, list, masked-link rules | 223637, 683412, 873879, 694403 | `allowHeading&&`; `allowSubtext`; `%INDENT_CAPTURE_PATTERN%`; `foundNestedMaskedLink` |
| Text box: rule-to-Slate table ("MarkdownToSlate") | 339200 | `Slate: Unknown markdown rule` |
| Native parser API (`@discord/markdown-wasm`) | 359787 | `@discord/markdown-wasm is not initialised` |
| Native parser wasm-bindgen glue | 905779 | `./discord_markdown_wasm_bg.js` |
| Native syntax flags | 593034 | `MULTILINE_QUOTE:` + `ASTERISK_ITALIC:` |
| Native message renderer | 647660 | imports the API module and defines per-node React renderers |
| Text box: native token-to-decoration mapping | 818948 | `subtext_marker` + `codeBlockSyntax` |
| The switch between the two | 146849 | `native-markdown"` + `enable_native_markdown` |

The library is modified from upstream: every rule carries a `requiredFirstCharacters` list, which
upstream `simple-markdown` 0.7.3 does not have.

**V-2. Which parser a user gets is decided per user, for the message and for the text box alike.**
Module 146849 defines two user experiments, `2025-04-native-markdown` and
`2026-10-native-markdown-setting`, and a lab toggle `enable_native_markdown` whose default is on
(module 813645). When the second experiment is on, the toggle decides; otherwise the first experiment
decides. The same function is called from the message renderer (`MessageRenderedContent`,
`useMessageRenderedContent`, modules 88484 and 538355) and from the text box (`useEditor`, module
68059). How many users are in either experiment is not in the bundle.

**V-3. Discord publishes the native parser on npm under MIT.** `npm view` on 2026-11-23:
`@discord/markdown-wasm` 0.16.0, licence MIT, maintainer `discord_npmjs <npmjs@discordapp.com>`,
created 2025-05-12, last published 2026-11-16, 28 versions (0.1.1 to 0.16.0; `len()` of the
`versions` array). Its `LICENSE` file reads "Copyright 2025 Discord, Inc." followed by the MIT text.
Sibling packages: `@discord/markdown-types` 0.14.0 (types and the syntax flags),
`@discord/markdown-react` 0.12.0 (turns the tree into React elements; you supply one renderer per node
type), `@discord/markdown-react-native` 0.15.0. No source repository is named in the metadata.

**V-4. The published wasm is the one the web client serves.** The served asset
`/assets/e933c74869ad2e0d.wasm` and the package's `src/lib/discord_markdown_wasm_bg.wasm` are both
1,230,190 bytes with SHA-256 `da7b9e5e0d7d7eb610127d15cc5e81b51c0bcbcbc166d0a0ffcda16e8dd57fb0`
(`sha256sum`), and `cmp` reports no difference.

**V-5. The native parser runs under plain Node and is a pure function.** `require('@discord/markdown-wasm')`
exposes `parse`, `parseLossless`, `Syntax`, `init`, `initSync`, `iter`; under Node it compiles the
wasm itself on first use (its README, and the run). Over the 272 cases the package's output is
byte-identical to the output of the wasm extracted from the served bundle, in both modes (`cmp` on the
two output files for `parse` and for `parseLossless`). The wasm exports `parse`, `parseLossless` and
memory helpers; it needs no stores, channel or guild: a mention comes back as
`{type:"mention", value:{type:"user", value:<id>}}` and the client's React layer resolves the name.
`parse(text, flags)` takes a bit mask of syntax to allow (`Syntax.ALL` = `0x7fffffff`; 31 named bits
including `MASKED_LINK`, `HEADING`, `LIST`, `QUOTE`, `MULTILINE_QUOTE`, `SUBTEXT`, `SPOILER`).

**V-6. `parseLossless` gives every character a token and a span.** Example, input
`**b** [t](https://e.com)` then a line `-# s`: a `document` node spanning 0 to 29; a `modifier`
(bold) node with `delimiter` tokens at 0–2 and 3–5; a `link` node (kind `masked`) with `link_open`,
`link_close`, `destination_open`, `url`, `destination_close` tokens; a `subtext` node with a
`subtext_marker` token at 25–27. Spans are UTF-16 code units (README), so they index a JavaScript
string directly. Module 818948 is Discord's own mapping from these tokens to its text box's leaf
attributes, so the token tree is the text-box specification under the native path.

**V-7. The legacy parser runs from the logged-out public page.** One run: 1,129 requests allowed
(the page and `/assets/*`), the rest aborted (`/api/v9/experiments`, `/api/v9/auth`, a
`cdn-cgi/challenge-platform` script). The page holds four module runtimes; the main one had 11,628
module factories and 6,977 instantiated. Exactly one factory matched the facade predicate and one the
rules predicate (ids 46054 and 605275). `parseToAST(text, true, state)` returned a tree for all 272
cases with no error. State used: `allowLinks`, `allowHeading`, `allowList`, `allowGameMentions` true;
`allowEmojiLinks`, `allowDevLinks`, `formatInline` false; `returnMentionIds` true, which makes mention
rules return ids instead of reading the (empty) stores.

**V-8. Discord's two parsers disagree on 37 of 272 cases** (strict form: 50). All 37 are in
Appendix A. By category, agreeing cases out of the category total: heading 11/14, subtext 6/9, masked
18/20, link 22/22, spoiler 10/12, emphasis 28/38, code 21/25, quote 17/20, list 24/25, timestamp 11/12,
mention 16/17, emoji 17/17, escape 18/20, mixed 16/21. The larger classes:
- emphasis and spoilers that span a newline: legacy keeps one run, native splits per line;
- nesting order: `***x***` is bold-outside in native and italic-outside in legacy, and a block marker
  inside an inline run (`**# x**`, `*- x*`, `||> q||`) is block-outside in native and inline-outside
  in legacy;
- a leading space before `#` or `>` makes a heading or quote in legacy and plain text in native;
- subtext and heading no longer nest in native;
- several unbalanced-delimiter cases (`_a_b_`, `*a**`, `****`, `_a__`).
Two rows are probe artefacts rather than parser differences: `@silent hi` (legacy has a text-box-only
`silentPrefix` rule in the set I called) and `<t:99999999999999999>` (legacy rejects it at date
construction, a rendering-stage check). The walk bears both out: `@silent hi` is drawn as plain text
in a message and carries `silentPrefix_` only in the text box, and the out-of-range timestamp is
drawn as plain text (V-18, V-21).

**V-9. No candidate library reproduces either Discord parser.** Agreement out of 272, loose form:

| Implementation | vs native | vs legacy |
|---|---|---|
| Discord legacy | 235 | — |
| Discord native | — | 235 |
| `discord-markdown-parser` 1.3.1, `extended` mode | 197 | 213 |
| `discord-markdown-parser` 1.3.1, `normal` mode | 188 | 199 |
| `discord-markdown` 2.5.1 | 157 | 170 |
| `simple-markdown` 0.7.3 default rules (what the site builds on) | 130 | 144 |

Whole features are absent, not edge cases: `discord-markdown-parser` scores 5 of 25 on lists (it has
no list rule; helper's read of the clone agrees), does not parse masked links in `normal` mode, and
does not resolve `:name:` emoji; `discord-markdown` has no headings, subtext, spoilers, timestamps or
lists (helper) and scores 4/14 headings, 5/25 lists.

**V-10. The comparison finds real differences in the website today.** The site's static rule set
(`staticBaseRules`, driven with the site's own emoji pre-transform, in an export of `0411d3b`) agrees
with native on 202 of 272 and with legacy on 222. It differs from **both** Discord parsers on 37 cases
where the two Discord parsers agree with each other (Appendix B). Four of those 37 are artefacts of my
normaliser (rows 186, 195: the site fills in the default timestamp style; rows 253, 254: paragraph
newlines counted twice). Examples of the rest: `-# sub` renders as a hyphen followed by a heading (the
site has no subtext rule and its heading rule matches mid-line); `text # mid line` becomes a heading;
`[](https://example.com)` and a masked link whose label is itself a URL are links on the site and
plain text in Discord; `+ a` is a list on the site only; `<t:…:s>` and `<t:…:S>`, slash-command and
`<id:…>` mentions are plain text on the site. This is a proof that the method yields, not a defect
list: the effort's fuzzer should produce the list, over the editor's rule set and the embed rule sets
as well, none of which I ran.

**V-11. The text box formats differently from the rendered message, in both generations.**
- Legacy: module 339200 walks the same `RULES` with a per-rule table. `link`, `blockQuote`,
  `codeBlock`, `list` and `heading` are `skip` (no inline styling from this table); `strong`, `em`,
  `u`, `s`, `spoiler`, `inlineCode`, `subtext`, `autolink`, `escape` are inline styles with fixed
  before and after markers that stay visible; mentions, emoji and timestamps become inline objects.
- Native: decorations come from `parseLossless` tokens (module 818948): delimiters become
  `syntaxBefore` / `syntaxAfter` leaves carrying `before_<style>` / `after_<style>`; content carries
  `strong`, `em`, `u`, `s`, `spoiler`, `inlineCode`, `link`, `subtext`; code fences carry
  `codeBlockSyntax`, `codeBlockLang`, `codeBlockText`; `heading_marker`, `list_marker`, `quote_prefix`
  and `line_ending` tokens carry nothing.
- The leaf classes are CSS-module names with a stable prefix (module 891031 at this build):
  `bold_`, `italics_`, `underline_`, `strikethrough_`, `inlineCode_`, `fakeLink_`, `spoiler_`,
  `subtext_`, `syntaxBefore_`, `syntaxAfter_`, `codeBlockSyntax_`, `codeBlockLang_`, `codeBlockText_`,
  `before_<style>_`, `after_<style>_`. The editor is Slate, so its leaves are `[data-slate-leaf]`
  spans (attribute names present in chunk 564996).

**V-12. The native parser is still changing.** Corpus outputs that differ from 0.16.0 (published
2026-11-16): 8 of 272 for 0.15.0 (2026-11-04), 11 of 272 for 0.14.0 (2026-10-26). Seven of the eight
are a node rename (`small` became `subtext`), which is a breaking change to the tree's shape; the
eighth is a behaviour change (`https://example.com/**bold**`). The three further rows for 0.14.0 are
masked-link edge cases that moved to match the legacy parser. Versions 0.12.0 and earlier export a
different API (`iter` only) and were not compared.

**V-13. The markdown modules were identical across three public builds 13 hours apart.** Stable
679055, canary 679107 and PTB 679109: all 13 modules of V-1 have the same id, chunk and SHA-256 of
their text in each build, and each build references the same wasm file name, while the entry bundle's
name differs in each and `comm -3` of the stable and canary script lists shows 12 differing lines.
Source maps are not served (`.js.map` returns 404).

**V-14. One client mod reaches Discord's parser by a finder, not by an id.** Vencord,
`src/webpack/common/utils.ts`: `waitFor("parseTopic", m => Parser = m)` (helper's quote from its
clone, read before its sweep stopped). That is the same facade as V-1's module 46054.

**V-15. Test account 1 is served the legacy parser for rendered messages.** Read 2026-11-23T09:40Z
in the test-account browser, signed in as test account 1, stable web build 679055 (`GLOBAL_ENV` of
the signed-in page; the build of V-1). The test bot posted six cases to a new channel
`slate-oracle-walk` (id `1574358729577599086`) in guild `1566742402180456559`; the `innerHTML` of each
message's content element was read. Five cases are ones on which the two parsers disagree
(Appendix A), and all five rendered as the legacy parser parses them:

| Input | Rendered DOM (tags only) | Matches |
|---|---|---|
| `***bi***` | `em` > `strong` > "bi" | legacy i(b()); native is b(i()) |
| `*a\nb*` | one `em` holding "a\nb" | legacy; native is two runs |
| `# # nested` | plain text "# # nested" | legacy; native is a heading |
| `**# not head**` | `strong` > `h1` > "not head" | legacy b(h1()); native is h1(b()) |
| `\|\|a\nb\|\|` | one spoiler element holding "a\nb" | legacy; native is two spoilers |

Scope: one account, one build, bot-posted messages, the rendered message only. It says nothing about
what share of Discord's users see which parser (G-2).

**V-16. A rendered message's content element has the id `message-content-<message id>`.** Six
elements matched `[id^="message-content-"]` in that channel, and their id suffixes were the six
message ids the API returned on posting.

**V-17. Discord's API strips leading whitespace from a message before storing it.** The case
` # leading space` was returned by the create-message call with content `# leading space`, and it
rendered as a heading. So a case that differs only by leading whitespace of the whole message cannot be checked
by posting it, and any posted comparison must run the parser over the stored content the API
returns, not over the corpus text. Of Appendix A, rows 6 and 152 open with a space; whether trailing
whitespace and leading tabs (rows 157, 158, 272) are stripped the same way was not read in this check.
V-19 reads them.

**V-18. Over the whole corpus, rendered Discord is the legacy parser.** All 272 cases were posted by
the test bot to `slate-oracle-walk`, one per message, with `allowed_mentions: {"parse": []}`
(2026-11-23, 10:34Z to 10:44Z by the message ids' timestamps; 79 first, then the other 193). Every message's content element was
read in the test-account browser as test account 1 on build 679055 (272 of 272 ids captured, by
opening message links in steps of thirty, because scrolling did not load history reliably). Both
parsers were then run again over the **stored** content the API returned (V-19), and the DOM was
rewritten to the canonical form by a rewriter written in this session (`domcmp.py`). Scored in the
loose form with four things blurred on both sides because the DOM does not carry them (a timestamp's
value and style, a mention's id and kind, which character a `:name:` emoji is, a code block's
language as typed):

| DOM equals | Cases |
|---|---|
| both parsers | 236 |
| the legacy parser only | 32 |
| the native parser only | 1 |
| neither | 3 |

The 32 are exactly the cases on which the two parsers still disagree over the stored text, apart
from `@silent hi`. The four rows that do not equal the legacy parser are not parser differences:
- `@silent hi` (native only): Discord draws it as two adjacent plain-text elements, "@silent" and
  " hi", which is the legacy tree (a `silentPrefix` node, then text) drawn as text. The normaliser
  gives that node its own name, so it scores as a mismatch.
- `<@&123456789012345678>`, `</ping:123456789012345678>`, `</a b c:123456789012345678>` (neither):
  both parsers return a mention; the renderer cannot resolve the id and draws plain text
  ("@unknown-role", "/ping", "/a b c"). An unknown user id is drawn as a mention element reading
  "@unknown-user", and an unknown channel id as a channel mention reading "unknown".

So no case shows rendered Discord departing from the legacy parser's tree for this account. The two
parsers disagree on 33 of the 272 stored texts (37 before the API's trimming, V-19), and on 32 of the
33 the DOM is the legacy form; the 33rd is `@silent hi`. Scope: one account, one build, bot-posted
message content. The comparison has been seen to discriminate: its first run over the 272 reported
15 rows equal to neither parser; 12 were traced to what the DOM does not carry (the emoji's
character, the language as typed) and blurred as said above, and 3 are the unresolved mentions.

**V-19. What the API changes before it stores a message.** 12 of the 272 bot posts came back with
content different from what was sent (compared in the posting script, per message):
- leading and trailing whitespace of the whole message is stripped, tabs included: rows 6, 17, 152,
  256, 272 (leading), 157, 158, 185, 257 (trailing; `> ` is stored as `>`, `- ` as `-`);
- a custom emoji the bot cannot use is rewritten to its name: `<:name:123456789012345678>` and
  `<a:name:123456789012345678>` are stored as `:name:`, and `<:a:1><:b:2>` as `:a::b:` (rows 215,
  216, 229), which Discord then draws as the Unicode emoji of that name where one exists.
A posted comparison therefore cannot test leading or trailing whitespace of a whole message or an
emoji id the poster has no access to; those inputs can only be tested against the parsers directly.

**V-20. The tags Discord's legacy renderer emits** (read from the 272 captures; class names are
CSS-module names, shown by their stable prefix):

| Construct | DOM |
|---|---|
| text | `span` |
| bold, italic, underline, strikethrough | `strong`, `em`, `u`, `s` |
| spoiler | `span.spoilerContent_` wrapping `span.obscuredTextContent_` > `span.obscuredTextContentInner_` |
| inline code | `code.inline` |
| code block | `pre` > `div.codeContainer_` > `code.hljs`, plus `language-<name>` when the highlighter knows the language (`js` and `JS` become `language-javascript`, `c++` becomes `language-cpp`, an unknown name adds no class); highlighted tokens are custom elements (`a-k`, `a-v`, `a-o`, `a-n`, `a-p`) |
| quote | `div.blockquoteContainer_` > `div.blockquoteDivider_` + `blockquote` |
| heading | `h1` to `h3`, with a visually hidden "," appended for screen readers |
| subtext | `small` |
| list | `ul` / `ol[start]` > `li`; a nested list sits inside the parent `li` |
| link | `a[href][title]`; a masked link's `title` is `<label or given title>`, a blank line, then `(<url>)` |
| timestamp | `span.timestamp_` holding the formatted date (no value or style attribute) |
| user and channel mention | `span.mention.wrapper_` / `span.channelMention.wrapper_`; `@everyone` and `@here` are `span.roleMention_.wrapper_`. A role that exists was not posted |
| Unicode emoji | `span.emojiContainer_` > `img.emoji[data-type="emoji"][data-name][alt]`; `alt` is the character when one was typed and the `:name:` when a name was typed |
| a line break made by two trailing spaces | `br` |

**V-21. The text box is on the legacy path for this account too, and it formats differently from
the rendered message.** 86 inputs (the 79-case subset and seven more) were typed into the message
box of `slate-oracle-walk` as test account 1 with `keyboard.insertText` and never sent (no Enter key
event was issued; the box was emptied after each case and confirmed empty at the end). Each line's
`[data-slate-leaf]` spans and inline objects were read. Legacy markers: `@silent` carries a
`silentPrefix_` class (a rule only the legacy set has, V-8); `_a_b_`, `*a**`, `****`, `_a__`,
`` `a``b` `` and `*loose *` are styled as the legacy parser parses them; a spoiler inside a masked
link's label is styled. What the box does, by construct:

| Construct | In the text box |
|---|---|
| bold, italic, underline, strikethrough, spoiler, inline code | markers stay, in `syntaxBefore_` / `syntaxAfter_` leaves (with `before_em_`, `before_u_`, `before_s_`, `before_spoiler_`, `before_inlineCode_` and the `after_` forms; bold's markers carry no `before_` class); content carries `bold_`, `italics_`, `underline_`, `strikethrough_`, `spoiler_`, `inlineCode_`, stacked when nested |
| the same across a line break | **not styled.** Each line is its own Slate element and is styled alone: `*a` / `b*` and `\|\|a` / `b\|\|` are plain in the box and one italic run or one spoiler when sent |
| heading, list | no styling at all; the text stays as typed |
| subtext | `-# ` is a `syntaxBefore_ before_subtext_` leaf and the rest carries `subtext_` |
| quote | `> ` or `>>> ` at a line start (after optional leading spaces) turns the line into a quote element (`blockquoteContainer_ slateBlockquoteContainer_`) and removes the marker from the text; `>q`, `>>>a` and a `>` in mid-line stay plain text. Read in a second pass that confirmed an empty, class-less line before each case: in the first pass a quote element left by one case survived the clear and coloured the quote cases typed after it |
| code block | fences are `codeBlockSyntax_` leaves; each body line is an element with class `codeLine_`, highlighted when a language is given; a one-line block's body is `codeBlockText_` |
| bare URL, and the URL of a masked link | `fakeLink_`; the label, brackets and title of a masked link are plain. Two masked links with nothing between them got no `fakeLink_` at all |
| escape | the backslash is a `syntaxBefore_ syntaxOverride_` leaf |
| timestamp, mention, `@everyone`, `@here`, emoji (typed as a character, a `:name:` or `<:name:id>`) | replaced by an inline object (`inlineElement_ inlineVoid_`) showing the resolved text or image; an invalid timestamp style stays text |
| `@silent` at the start | `silentPrefix_` |

**V-22. The published parser's token view predicts the legacy text box on 43 of 68 comparable
cases.** Of the 86 typed cases, 68 kept their text unchanged in the box and held no inline object;
18 were set aside (quotes, timestamps, mentions and emoji, whose text the box changes, and `>>> `,
whose first-pass capture was contaminated as V-21 says). For the 68, each character's style set and
"is a marker" flag from the box was compared with what `parseLossless` tokens imply under a mapping
written here (`tbcmp.py`; it is mine, not Discord's module 818948). 43 are identical. Of the 25 that
differ, 19 are cases where the two parsers disagree anyway (Appendix A), and 6 are not: a space
between two styled runs loses the enclosing style in the box (`**b *bi* b**`, `***a** b*`,
`-# **b** *i*`), two adjacent masked links lose their link styling, and two escape cases differ by
one marker flag. Fourteen Appendix A cases look the same in the box under either parser because the
box does not style what they differ in (headings, lists). `silentPrefix_` is not in the mapping, so
`@silent hi` counts as identical when it is not.

**V-23. A webhook's messages are stored and drawn exactly as the bot's.** The 272 cases were posted
again through a webhook created in the same channel (10:44Z to 10:52Z, `allowed_mentions` as
before). The stored content of every case equals the bot post's stored content (the same 12 changed,
the same way), and the content element's `innerHTML` equals the bot post's for all 272 once a
per-render counter attribute (`data-focus-blocked-<n>`) is dropped. The three-way comparison gives
the same partition: 236, 32, 1, 3. So on this account, for message content, nothing in the corpus
is granted to a webhook and withheld from a bot, masked links included. The corpus has no emoji
inside a link label, which is one of the two things the legacy code's webhook allowance names
(module 354777, § 3 step 1), so that one is untested. Embeds were not posted (OQ-3).

### High-confidence inference

**I-1. Client mods and wrappers run Discord's own markdown code; independent clients each have their
own.** Verified for Vencord (V-14). For the other mods (BetterDiscord, moonlight, Equicord, Aliucord,
revenge) and the wrappers (Vesktop, WebCord, Legcord, Dorion, GoofCord) it follows from what they are:
they load Discord's client. For independent clients the helper found markdown-named source files of
their own in dissent/ningen (Go, on goldmark), endcord (Python), Discord Messenger (C++), purple-discord
(C), OpenCord (Kotlin, SimpleAST), Serein and concord (Rust), cordless (Go). Their contents were not
read (see Remaining Gaps), so which constructs each handles is not established.

**I-2. Module ids are path hashes that survive ordinary builds but not a move or rename of the source
file.** Supported by V-13 (ids unchanged across three builds while chunks changed) and V-14 (a
maintained mod chooses a content finder over an id). The window observed is 13 hours.

**I-3. The native parser is where Discord is heading.** The package has had 28 releases since May
2025, the newer experiment adds a user-facing toggle whose default is on, and recent releases move
edge cases toward legacy behaviour (V-12). A web search surfaced a January 2025 post describing a Rust
rewrite of Discord's markdown; the page did not resolve when fetched, so it is not relied on.

### Hypotheses

H-1 CONFIRMED — the test account is served the legacy parser for rendered messages. V-15.

H-2 CONFIRMED — the content element's id is `message-content-<message id>`. V-16.

**H-3. Embed text is still parsed by the legacy rule sets even where the native parser is on.**
Confidence: low to medium. The native renderer's only importers in the preloaded chunks are the two
message-content modules; the embed renderer is in a lazily loaded chunk I did not fetch. Disconfirming
test: locate the embed renderer (search the lazy chunks for a call of `parseEmbedTitle`) and read
whether it consults the same switch. This matters to the product more than to Discord's chat: embeds
are a core surface of the site.

## The inventory's unverified link rows

The scoping inventory marks its Discord link comparisons unverified. Both Discord parsers were run on
eighteen link inputs taken from its findings LF-1 to LF-8. Where one value is shown, both agree.

| Input | Discord |
|---|---|
| `https://x.y!` | link, `!` included |
| `https://x.y?` | link; `?` kept by native, dropped by legacy |
| `https://x.y>` | not a link |
| `https://x.y\` | native: not a link; legacy: link without the backslash |
| `https://x.y/(a)` | link including `(a)` |
| `https://x.y/a(b)c` | link, whole |
| `<ftp://x.y>`, `<foo:/bar>` | not a link (native keeps the angle brackets as text, legacy drops them) |
| `<[a](https://x.y)>` | native: masked link between literal `<` and `>`; legacy: plain text |
| `<mailto:a@b.c>` | link |
| `https://x.y🙂` | link; the emoji is taken into the host and punycoded |
| `[a](https://x.y/🙂)` | masked link; native percent-encodes the emoji in the URL, legacy keeps it |
| `[a](https://x.y)b` | masked link, then `b` |
| `[a](x.y)`, `[a](javascript:alert(1))`, `www.x.y` | not links |
| `https://x.y/a_b*c*` | link, whole |
| `[a](https://x.y "t")` | masked link with title `t` |

So the inventory's LF-3 belief that Discord excludes a trailing `!` is wrong for both parsers, its
belief that Discord keeps balanced parentheses is right, and LF-4's belief that `<…>` needs http(s) is
right except for `mailto:`. These rows are for the message-content rule set; embed titles and fields
were not run.

## Answers to the brief

### 1. Which implementations exist

**Discord's own** (ahead of everything else):

| Implementation | Source | Licence | Last activity | Formats in |
|---|---|---|---|---|
| Native parser, `@discord/markdown-wasm` | npm; also served as a public `.wasm` | MIT | 0.16.0, 2026-11-16 | message (`parse`) and text box (`parseLossless`) |
| Legacy rules on modified `simple-markdown` | served web bundle only | proprietary; usable under the owner's ruling of 09:18Z | in stable build 679055 | message; text box via the rule-to-Slate table |
| `discord/SimpleAST` (Android) | GitHub | LICENSE file present, type not asserted by GitHub (helper) | pushed 2026-08-25 (helper) | message; core rules only (no heading, subtext, spoiler, masked link in the core module per the helper's read) |

**Libraries** (helper's metadata; fidelity from my runs where a number is given):

| Library | Licence | Last publish | Built on | Note |
|---|---|---|---|---|
| `discord-markdown-parser` (ItzDerock) | Apache-2.0 | 2025-12-23 | vendored `simple-markdown` | best third-party score (V-9); no lists |
| `discord-markdown` (brussell98) | MIT | 2022-06-15 | `simple-markdown` ^0.7.3 | no headings, subtext, spoilers, timestamps, lists |
| `@odiffey/discord-markdown` | MIT | 2024-09-08 | `@khanacademy/simple-markdown` | not run |
| `@cloudrac3r/discord-markdown` | MIT | 2026-10-13 | `simple-markdown` ^0.7.3 | not run |
| `discomd` | MIT | 2026-08-30 | hand-written tokenizer | not run; no bare-URL rule (helper) |
| `parse-discord` (Python) | MIT | pushed 2026-05-01 | own regex grammar | not run; 174 test call sites (helper) |
| `discord-md` (Rust crate) | Apache-2.0 / MIT files | crate 2023-11-12 | nom | inline styles and code only (helper) |
| `diamondburned/ningen` `discordmd` (Go) | ISC | pushed 2026-07-10 | goldmark | no subtext, `>>>`, timestamps (helper) |
| `simple-markdown` 0.7.3; `@khanacademy/simple-markdown` 4.0.3 | MIT | 2022-06-26; 2026-11-02 | — | generic base, not Discord's rules |
| `@discordjs/formatters` | Apache-2.0 | 2026-11-23 | — | builds strings; parses nothing |

All of these format rendered messages only; none formats a text box.

**Clients**: see I-1. Metadata for 26 repositories is in the helper's table (perishable, § Scratch).

### 2. How faithful is each

V-8, V-9, V-10 and the two appendices. In one line each: Discord native is the reference for the
native path by identity (V-4); Discord legacy is the reference for the legacy path by being the code
(V-7); the best library is 59 to 75 cases short on a 272-case corpus; plain `simple-markdown` defaults,
which the site builds on, are 128 to 142 short.

### 3. How to verify against real Discord

Run on 2026-11-23 in the resumed session, for rendered messages and for the text box (V-15 to
V-22). The steps below are the method as first written; what the run changed is listed after them.

1. **Post.** The test bot (`~/.claude-credentials/test_bot_token`, never printed) creates a channel
   in guild `1566742402180456559` and posts one corpus case per message with
   `allowed_mentions: {"parse": []}` so nothing pings. Record `{case id → message id}`. Post the same
   corpus once more through a webhook: the legacy path grants masked links and emoji-in-link-labels
   by `webhookId` (module 354777), and the product sends through webhooks.
2. **Read the message DOM.** In the test-account browser, open the channel and for each message id
   take the content element's `innerHTML` (H-2), scrolling as the list is virtualised. Rewrite the
   DOM to the same canonical form: `strong`, `em`, `u`, `s`, `code` (inline), `pre` (block, with its
   `hljs` language class), `blockquote`, `h1`–`h3`, `small` (subtext), `ul` / `ol[start]` / `li`,
   `a[href][title]`, the spoiler wrapper, `time`, mention and emoji elements. These tags are what the
   native renderer emits (module 647660); the legacy React output rules (module 862316) were not read.
3. **Identify the served parser.** Compare the DOM form with both parsers' outputs on the 37 cases of
   Appendix A (H-1).
4. **Compare.** The DOM is the ground truth for that account; a mismatch against the parser it is
   served is a defect in the extraction or the normaliser, not in Discord.
5. **Read the text box.** Type each case into the message box (`[data-slate-editor]`) without sending,
   and read each `[data-slate-leaf]` span's text and class list (prefixes in V-11). Clear the box
   between cases. Compare with `parseLossless` spans mapped as module 818948 maps them. The setting
   that previews markdown while typing must be on, and whether the account's text box is on the native
   path follows from the same switch (V-2).
6. **Keep it small and periodic.** The DOM walk is slow and rate-limited (one message per case), so
   it checks the oracle on a discriminating subset; the fuzzer itself runs against the parser.

What the run changed or added:
- **Compare over stored content.** The API rewrites some content before storing it (V-19), so the
  parser runs over the `content` the create-message call returns, never over the corpus text.
- **Open message links; do not scroll.** Setting the scroller's position, and wheel events, both
  stopped loading history after about 100 messages. Opening
  `/channels/<guild>/<channel>/<message id>` for every thirtieth message and reading every content
  element present captured 272 of 272 in seven page loads.
- **Blur what the DOM does not carry** on both sides before comparing: a timestamp's value and
  style, a mention's id and kind, the character behind a `:name:` emoji, a code block's language as
  typed. An id that resolves to nothing is drawn as text for roles and commands (V-18), so such a
  case needs a real role or command, or is set aside.
- **The message box is `[data-slate-editor="true"][role="textbox"]`.** The first
  `[data-slate-editor]` on the page is the server's search box (`role="combobox"`); the first
  attempt typed three cases there before the selector was corrected. Nothing was submitted.
- **Type with `keyboard.insertText`, which issues no key events, and never Enter.** Before each case
  require one empty line with no class: an emptied quote or code line keeps its element type and
  colours the next case (V-21).
- **Captures and generated capture scripts pass through the browser tool's output directory**
  (`.playwright-mcp/` in the workspace root) and were moved to scratch in the same step.
- Rate: 272 bot posts took ten minutes at one post per 1.1 s plus Discord's limits; webhook posts
  ran at about one per 2.2 s.

### 4. Recommended oracle arrangement, with its gaps

**What the walk changes.** This arrangement was written before the walk and named the published
parser "primary" because it is the one that can be pinned and run anywhere. The walk shows the only
account observed is drawn by the other parser (V-18). Which of the two is the standard is OQ-1 and
is not decided here; until it is, "primary" below means "cheapest to run", not "what Discord shows",
and the three-way split in the second bullet is the part of the arrangement that holds either way:
on this corpus 235 of 272 expected values are the same under both parsers.

- **Primary: `@discord/markdown-wasm`, exact version pinned, as a development dependency.** `parse`
  for the preview's tree; `parseLossless` for the editor's marker and style ranges. Runs in the
  existing vitest Node project with no browser. No licence question (MIT).
- **Drift alarm.** A check that fetches `discord.com/app`, finds the wasm file name by the glue
  predicate of V-1, and compares its SHA-256 with the pinned package's wasm. A mismatch means Discord
  moved; `npm view @discord/markdown-wasm version` says whether a release exists to move to.
- **Secondary: the legacy parser in the logged-out headless page**, fetched at test time, never
  committed, never shipped (the owner's ruling). Use it to split fuzz results three ways: both Discord
  parsers agree (the expected value is unambiguous, 235 of 272 here), they disagree (needs the owner's
  answer below), and contexts the native path may not cover (H-3). Locate modules by the content
  predicates of V-1 and fail loudly when a predicate matches zero or more than one module.
- **Ground truth: the test-server DOM walk** of § 3, run when the pin moves and at the effort's start.
  As run here it checks the legacy extraction only, because that is the parser the test account is
  served; it becomes a check of the primary oracle when an account on the native path exists (G-11).
- **The editor needs its own expected values.** Discord's text box is not its renderer (V-21), so a
  preview oracle says nothing about how the editor should colour a heading, a list or a formatting
  run that crosses a line. For the native path the token tree of `parseLossless` is that
  specification (V-6); for the legacy path it is the text box's DOM as read in V-21 and the
  rule-to-Slate table of V-11.
- **(a) Reading as specification.** The rule modules of V-1 are readable in the served bundle and are
  the written specification of the legacy path; the native path has no readable source, only behaviour.

Known gaps of this arrangement:
1. The primary oracle has not been seen in rendered Discord. The one account available renders with
   the legacy parser (V-15, V-18), so the walk confirmed the legacy extraction against the DOM and
   could not do the same for the native parser. What stands for the native one is identity of the
   binary (V-4), not an observed render. An account that Discord has placed on the native path
   would close it.
2. Where the two parsers disagree there is no single right answer until the owner chooses.
3. The oracle's tree is not the site's tree; a normaliser sits between them and is itself fallible.
   The effort needs its own, with its own tests, and should treat a mismatch as "candidate" until read.
4. Rendering beyond the tree is outside any parser oracle: emoji image choice, code highlighting,
   jumbo emoji, link trust prompts, spoiler reveal, timestamp wording by locale.
5. Embeds, embed titles, field names and Components V2 text displays are separate rule sets in the
   legacy code (`EMBED_TITLE_RULES` and others) and syntax masks in the native one; which mask Discord
   uses for each was not established (H-3).
6. The native parser changes between releases (V-12), including the shape of its tree.
7. Editor behaviour that is not formatting — caret movement, normalisation, paste, IME, the round trip
   from Slate nodes to stored text — has no oracle here. A fuzzer for those needs properties
   (text survives a round trip; no normalisation loop), not a Discord comparison.

## System weaknesses

- The site's two rule sets are hand-edited copies of `simple-markdown` defaults with Discord rules
  added by eye. Nothing ties them to Discord's rules, so every Discord change is a silent divergence.
- The site's preview and its editor colouring come from two rule sets (`staticBaseRules`,
  `interactiveBaseRules`) that can also diverge from each other.
- Discord's own behaviour is not a fixed point: two parsers, chosen per user, one of them changing
  monthly. A product that matches one will mismatch what some of its users see in Discord.

## Instrumentation gaps

- **Normal** (always on, cheap): the drift alarm of § 4; the pinned parser version printed in the
  fuzzer's report; the count of fuzz cases in each of the three classes (agree / disagree / native only).
- **Debug** (opt-in): per-case dumps of both Discord trees and the site's tree in canonical form;
  the DOM capture of the walk.

## Open questions

| # | Question | Whose | What would close it |
|---|---|---|---|
| OQ-1 | Where Discord's two parsers disagree (Appendix A), which one is the site's standard: the new parser, the old one, or "assert only where both agree and list the rest"? | Owner (product direction) | His answer. Sent to `steering-hooks-fixer` as an owner-needing item. |
| OQ-2 | ANSWERED — the test account is served the legacy parser, and rendered Discord equals the legacy parser's tree on the whole corpus, for the message and in the text box's styling. V-15, V-18, V-21. The native parser has not been seen rendered (G-11). | | |
| OQ-3 | Which parser and which syntax set does Discord use for embed description, embed title, field name, field value, footer and Components V2 text? | Analyst or the effort's first stage | Fetch the lazy chunks, read the embed renderer; or read the DOM of posted embeds in the walk. |
| OQ-4 | Should the product adopt Discord's published parser for its preview instead of testing its own rules against it? The licence allows it; `@discord/markdown-react` exists for the rendering step. | Architect, then the owner | An architecture finding. Raised because it changes what the fuzzer has to cover; not answered here. |
| OQ-5 | Which constructs does each independent third-party client implement, and does any format in its text box? | Retired 2026-11-23 | The owner's selection "Agent: leave them not done" (effort rulings block "2026-11-23T09:32Z"): the per-client checks stay not done and third-party clients are a footnote. |

## Remaining gaps

| # | Unknown | Blocker | Required action | Owner |
|---|---|---|---|---|
| G-1 | RESOLVED for the legacy parser — rendered Discord equals its tree on the 272-case corpus for test account 1. V-18. The native parser's part moves to G-11. | | | |
| G-2 | The share of users on each parser | Server-side experiment assignment | None available from public assets; the walk answers it for the test accounts only | — |
| G-3 | Embed and Components V2 rule sets (H-3) | Embed renderer is in a lazy chunk not fetched | OQ-3 | effort |
| G-4 | RESOLVED — read from the text box's DOM: links, quotes, code blocks, lists and headings in the legacy text box. V-21. | | | |
| G-5 | RESOLVED — the legacy renderer's tags, read from the DOM. V-20. | | | |
| G-6 | Per-client construct, text-box and test checks for 25 of 26 cloned clients; four library cells (masked link, underline, escape, list) for four libraries | Not completed | Deferred: stays not done by the owner's selection (OQ-5) | — |
| G-7 | Older parser versions (0.12.0 and earlier) | Different API | Not needed unless the pin goes backwards | — |
| G-8 | Module-id stability beyond 13 hours | Only three same-day builds observed | Re-run the predicate table on a later build; the drift alarm does this as a side effect | effort |
| G-9 | The site's interactive (editor) rule set and embed rule sets against the oracle | Only the static content set was run | The effort's fuzzer | effort |
| G-10 | The January 2025 post on Discord's Rust markdown rewrite | Host did not resolve | Fetch from another network or find the canonical URL | — |
| G-11 | The native parser against rendered Discord, and the native text box | Test account 1 is on the legacy path; whether test account 2 is was not read (its Chrome profile is not the one this session's browser holds) | Read three discriminating cases as test account 2; failing that, an account Discord has placed in the native experiment. Until then the native parser rests on V-4 | effort (QA, whose sessions carry both profiles) |
| G-12 | The account's experiment assignment itself (why it is on legacy) | Not read from the signed-in page; the DOM settled the question it would have answered | Read the two experiments of V-2 from the client's experiment store | — |
| G-13 | Rendered DOM for a role and a slash command that exist, and for a custom emoji the poster can use | The corpus used made-up ids, which Discord draws as text or rewrites (V-18, V-19) | Post those three with real ids from the test server | effort |

## Scratch instruments (perishable)

These live in this session's scratch directory and are not part of the record; a reboot removes them.
They are named so the effort can lift what it wants before then.
`/tmp/claude-1000/-usr-local-bin-hooks/9aa102b9-a7a1-4106-ba3f-996decade255/scratchpad/` holds:
a `corpus` folder (`corpus.js`, the 272 cases); a `tools` folder of scripts written in this session
(`wasm-oracle.js`, loader for the served wasm; `legacy-oracle.js`, headless legacy probe with the
request filter; `norm.py` and `compare.py`, canonical form and scoring; `mods.py` and `buildcmp.py`,
module indexer and cross-build comparison); a `runs` folder (every output cited above); and a
`helpers` folder (`libraries-table.md` and `clients-table.md`, the helpers' tables). None of these
is a path in this repository. The third-party `clones/` directory was deleted at the 09:35Z
checkpoint, and the directories that held Discord's code and the website export
(`discord-assets`, `discord-assets-canary`, `discord-assets-ptb`, `discord-mods`, `site-export`,
`site`) were deleted at the end of the resumed run; the export's `node_modules` link was removed
first and its target, the shared website tree's `node_modules`, was listed present afterwards.

The resumed session's scratch directory,
`/tmp/claude-1000/-usr-local-bin-hooks/9d755293-e6fd-4715-a2b8-b53e82c37b4b/scratchpad/`, holds
the walk: a `tools` folder (`drest.py`, posting; `domcmp.py`, DOM-to-canonical rewriter and
three-way comparison; `tbcmp.py`, text box against `parseLossless`; the generated capture scripts)
and a `walk` folder (the posted-message maps with stored content, the DOM captures, both parsers'
outputs over stored content, the text-box captures, and the comparison outputs `cmp-all-bot.txt`,
`cmp-all-webhook.txt`, `tbcmp-clean.txt`). The DOM captures are Discord's rendered markup for the
corpus and carry no account data beyond resolved names.

## Recommendations (investigation only)

1. Put OQ-1 to the owner before the plan fixes acceptance criteria; it decides what "matches Discord"
   means for 14% of this corpus. He should have V-18 in front of him when he answers: the account
   that could be observed sees the older parser, and which one his own account sees is not known.
2. The § 3 walk has been run once (V-15 to V-23). What it could not reach is in G-11 and G-13; the
   cheapest next read is three discriminating cases from `slate-oracle-walk` as test account 2.
3. Ask the architect OQ-4 before the planner sizes the effort.
4. Next: the planner (it mints the effort's ID and cites this document by name), with the architect
   first if OQ-4 is to be answered.

## Appendix A — the 37 cases where Discord's two parsers disagree

Canonical form as in § Methodology. A backtick inside a cell is shown as `ˋ`.

| # | Category | Input | Native (`@discord/markdown-wasm` 0.16.0) | Legacy (served `simple-markdown` rules) |
|---|---|---|---|---|
| 6 | heading | ` # leading space` | " # leading space" | h1("leading space") |
| 7 | heading | `# trailing hashes ##` | h1("trailing hashes ##") | h1("trailing hashes") |
| 11 | heading | `# # nested` | h1("# nested") | "# # nested" |
| 18 | subtext | `-# -# nested` | sub("-# nested") | "-# -# nested" |
| 21 | subtext | `# -# head then sub` | h1("-# head then sub") | h1(sub("head then sub")) |
| 22 | subtext | `-# # sub then head` | sub("# sub then head") | sub(h1("sub then head")) |
| 35 | masked | `[text]( https://example.com )` | "[text]( " a(https://example.com/) " )" | a(https://example.com/\|"text") |
| 40 | masked | `[\|\|sp\|\|](https://example.com)` | a(https://example.com/\|"\|\|sp\|\|") | a(https://example.com/\|sp("sp")) |
| 67 | spoiler | `\|\|a\nb\|\|` | sp("a") sp("b") | sp("a\nb") |
| 73 | spoiler | `\|\|\|a\|\|\|` | "\|" sp("a") "\|" | sp("\|a") "\|" |
| 83 | emphasis | `***bi***` | b(i("bi")) | i(b("bi")) |
| 88 | emphasis | `***__biu__***` | b(i(u("biu"))) | i(b(u("biu"))) |
| 92 | emphasis | `*loose *` | i("loose ") | i("loose") |
| 93 | emphasis | `*a * b*` | i("a ") " b*" | i("a") " b*" |
| 95 | emphasis | `_a_b_` | i("a_b") | "_a" i("b") |
| 98 | emphasis | `*a**` | i("a") "*" | "*a**" |
| 99 | emphasis | `****` | "****" | i("**") |
| 104 | emphasis | `*a\nb*` | i("a") i("b") | i("a\nb") |
| 105 | emphasis | `**a\n\nb**` | b("a") b("b") | b("a\n\nb") |
| 113 | emphasis | `_a__` | i("a") "_" | "_a__" |
| 121 | code | `ˋaˋˋbˋ` | c("a") c("b") | c("aˋˋb") |
| 135 | code | `ˋˋˋ\nˋˋˋ` | c("ˋ\n") "ˋ" | c("\n") |
| 136 | code | `ˋˋˋjs\nˋˋˋ` | c("ˋjs\n") "ˋ" | cb(\|"js") |
| 137 | code | `> ˋˋˋ\n> x\n> ˋˋˋ` | q(cb(\|"> x\n> ")) | q(cb(\|"x")) |
| 152 | quote | ` > leading space` | " > leading space" | q("leading space") |
| 157 | quote | `> ` | q() | q(" ") |
| 158 | quote | `>>> ` | q() | q(" ") |
| 177 | list | `1. a\n- b` | ol1(li("a")) ul(li("b")) | ol1(li("a") li("b")) |
| 191 | timestamp | `<t:99999999999999999>` | ts(99999999999999999:) | "<t:99999999999999999>" |
| 214 | mention | `@silent hi` | "@silent hi" | silent() " hi" |
| 233 | escape | `\\**a**` | "*" i("a") "*" | "**a**" |
| 245 | escape | `[t\\](https://example.com)` | "[t](" a(https://example.com/) ")" | a(https://example.com/\|"t\\") |
| 255 | mix | `a  \nb` | "a  \nb" | "a\nb" |
| 259 | mix | `**# not head**` | h1(b("not head")) | b(h1("not head")) |
| 260 | mix | `*- not list*` | ul(li(i("not list"))) | i(ul(li("not list"))) |
| 261 | mix | `\|\|> q\|\|` | q(sp("q")) | sp(q("q")) |
| 272 | mix | `\t\ttabs` | "\t\ttabs" | "        tabs" |

## Appendix B — the 37 cases where the website's static rules differ from both Discord parsers

Only cases on which Discord's two parsers agree. Candidates, not confirmed defects: rows 186, 195, 253
and 254 are normaliser artefacts (see V-10), and the others have not been read one by one.

| # | Input | Both Discord parsers | Website static rules |
|---|---|---|---|
| 9 | `text # mid line` | "text # mid line" | "text " h1("mid line") |
| 15 | `-# sub` | sub("sub") | "-" h1("sub") |
| 17 | ` -# leading space` | " -# leading space" | " -" h1("leading space") |
| 19 | `text\n-# after` | "text" sub("after") | "text\n-" h1("after") |
| 20 | `-# **b** *i*` | sub(b("b") " " i("i")) | "-" h1(b("b") " " i("i")) |
| 23 | `a -# mid` | "a -# mid" | "a -" h1("mid") |
| 31 | `[https://evil.com](https://example.com)` | "[https://evil.com](https://example.com)" | a(https://example.com/\|a(https://evil.com/)) |
| 33 | `[](https://example.com)` | "[](https://example.com)" | a(https://example.com/) |
| 34 | `[ ](https://example.com)` | "[ ](https://example.com)" | a(https://example.com/\|" ") |
| 42 | `[text](discord://-/channels/1/2)` | a(discord://-/channels/1/2\|"text") | "[text](discord://-/channels/1/2)" |
| 49 | `https://example.com/a(b)` | a(https://example.com/a(b)) | a(https://example.com/a(b) ")" |
| 60 | `<a@b.co>` | a(mailto:a@b.co\|"a@b.co") | "<a@b.co>" |
| 69 | `\|\|\|\|` | "\|\|\|\|" | sp() |
| 129 | `ˋˋˋc++\nx\nˋˋˋ` | cb(c++\|"x") | cb(\|"c++\nx") |
| 163 | `+ a` | "+ a" | ul(li("a")) |
| 170 | `- a\n - b` | ul(li("a") li("b")) | ul(li("a" ul(li("b")))) |
| 178 | `- # head` | ul(li("# head")) | ul(li(h1("head"))) |
| 179 | `0. a` | ol1(li("a")) | ol0(li("a")) |
| 180 | `1000000000000. a` | ol1000000000(li("a")) | ol1000000000000(li("a")) |
| 185 | `- ` | "- " | ul(li()) |
| 186 | `<t:1700000000>` | ts(1700000000:) | ts(1700000000:f) |
| 190 | `<t:-1>` | ts(-1:) | "<t:-1>" |
| 193 | `<t:1700000000:s>` | ts(1700000000:s) | "<t:1700000000:s>" |
| 194 | `<t:1700000000:S>` | ts(1700000000:S) | "<t:1700000000:S>" |
| 195 | `**<t:1700000000>**` | b(ts(1700000000:)) | b(ts(1700000000:f)) |
| 205 | `</ping:123456789012345678>` | m(command:123456789012345678) | "</ping:123456789012345678>" |
| 206 | `</a b c:123456789012345678>` | m(command:123456789012345678) | "</a b c:123456789012345678>" |
| 210 | `<id:customize>` | m(static:customize) | "<id:customize>" |
| 211 | `<id:browse>` | m(static:browse) | "<id:browse>" |
| 226 | `\\😀` | "😀" | ":grinning:" |
| 230 | `© ™` | "© ™" | e(u:©) " ™" |
| 249 | `\\-# sub` | "-# sub" | "-" h1("sub") |
| 253 | `a\n\nb` | "a\n\nb" | "a\n\n\nb" |
| 254 | `a\n\n\nb` | "a\n\n\nb" | "a\n\n\n\nb" |
| 258 | `# h\ntext\n- a\n> q\n-# s` | h1("h") "text" ul(li("a")) q("q") sub("s") | h1("h") "text" ul(li("a")) q("q") "-" h1("s") |
| 265 | `-# https://example.com` | sub(a(https://example.com/)) | "-" h1(a(https://example.com/)) |
| 270 | `¯\\_(ツ)_/¯` | "¯\\_(ツ)_/¯" | "¯_(ツ)_/¯" |
