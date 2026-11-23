---
UUID: 91e0e83a
Status: Active
Status-Detail: >-
  The oracle question has a determination: Discord publishes its own message parser on npm under an
  MIT licence (`@discord/markdown-wasm`), byte-identical to what the web client serves, and it runs
  under plain Node. Discord's older parser runs from the logged-out public page. Both were run over a
  272-case corpus here. The test account is served the older parser for rendered messages (V-15).
  Stays Active on two things: the corpus comparison against rendered Discord and the text-box read
  on the test server are in progress (Resumption State, next acts 3 and 4), and the owner has not
  said which of Discord's two parsers is the standard where they disagree (37 of 272 cases). The
  per-client checks of third-party clients stay not done by his selection of 2026-11-23T09:31Z.
---

# Which oracle can tell the Slate formatting effort "what Discord does"?

## Changelog

| Date (UTC) | Agent | Change | Notes |
|---|---|---|---|
| 2026-11-23T09:32 | researcher-slate-formatting-oracle | Document created | Brief `steering/slate-formatting-oracle-brief-researcher.md`; two addenda from `steering-hooks-fixer` (effort rulings blocks "2026-11-23T09:15Z" and "09:18Z") |
| 2026-11-23T09:35 | researcher-slate-formatting-oracle | Checkpoint at steering's ask; Resumption State written | Owner's selections recorded from effort rulings block "2026-11-23T09:32Z": client checks stay not done; the session restarts with the test-account browser. OQ-5 and G-6 retired on that selection. |
| 2026-11-23T10:33 | researcher-slate-formatting-oracle | Resumed from the Resumption State (record commit `ef9c9dd4`) in a fresh session with the test-account browser; check (c) recorded as V-15 to V-17; H-1 and H-2 closed | Brief `steering/slate-formatting-oracle-brief-researcher-resume.md`. Nothing written before the resume was re-verified except what V-15 to V-17 test (H-1, H-2, and the build number of V-1, read again from the signed-in page). Check (c) ran 09:39Z to 09:40Z and was sent to `steering-hooks-fixer` before 09:45Z (message id `1f0a6563-4bbf-4bd8-977c-7dc0f9b8d99f`); this session then made no tool call from 09:45Z to 10:33Z (its turn had ended; the cache-warm wake restarted it), so this row and the findings were written 52 minutes after the result. The walk added channel `slate-oracle-walk` to the test server; `test-estate.json` updated in the same turn. |

## Resumption State

Written 2026-11-23T09:35Z at steering's `/checkpoint`. A fresh session under the same name, launched
with the test-account browser, resumes from here.

**Done.** Everything in § Findings through § Appendix B: both Discord parsers located, run and
compared over the 272-case corpus; candidate libraries scored; the website's static rules compared;
the published MIT package found and shown byte-identical to the served wasm.

**Next acts, in order** (the owner's word, effort rulings block "2026-11-23T09:32Z"; method in
§ "3. How to verify against real Discord"):
1. Read `~/.claude/skills/discord-test-browser/SKILL.md`, `test-estate.json` beside it, and
   `~/.claude/agent-skills/stage-procedures/agent-browser.md`. The grant file exists, so no ask.
2. **(c) Which parser the test account is served.** Post the three discriminating cases of H-1 first;
   one DOM read settles H-1 and H-2 before the full corpus is posted.
3. **(a) Post the corpus and read the rendered DOM.** As the test bot, in a new channel of guild
   `1566742402180456559`, one case per message, `allowed_mentions: {"parse": []}`. Start with
   Appendix A's 37 cases plus about thirty agreeing ones; the whole 272 only if those match. Then the
   same set through a webhook. Rewrite the DOM to the canonical form and compare with the parser the
   account is served. A walk that adds a channel or a webhook updates `test-estate.json` in the same
   turn.
4. **(b) The text box's DOM while typing.** Type, do not send; read `[data-slate-leaf]` text and
   classes (prefixes in V-11); compare with `parseLossless` spans.
5. Record results here as new Verified findings; close OQ-2, G-1, H-1, H-2; add a changelog row
   naming this resume and which earlier claims were re-verified.
6. Deliver to `steering-hooks-fixer` by SendMessage, then delete the scratch directory's Discord
   assets and exports (below).

**Approach in flight.** None mid-edit. The DOM-to-canonical rewriter is not written; the scratch
script `norm.py` has the target form.

**Refs.** Record repository `master`, HEAD `0b23f9c7` before this document's first commit. Website
read at `origin/master` `0411d3b`; the shared website tree was not touched.

**Uncommitted or locally mutated.** Nothing in any repository beyond this document. Scratch only, at
`/tmp/claude-1000/-usr-local-bin-hooks/9aa102b9-a7a1-4106-ba3f-996decade255/scratchpad/` (a new
session has a different scratch directory; read these by absolute path, and re-create them from this
document's § Methodology if a reboot has removed them): `corpus/`, `tools/`, `runs/`, `official/`
(the npm package, installed with `--ignore-scripts`), `official-old/`, `cands/`, `discord-assets/`,
`discord-assets-canary/`, `discord-assets-ptb/`, `discord-mods/`, `helpers/`, and `site-export/`
(an export of website `0411d3b` whose `node_modules` is a symlink to the shared tree's; remove the
link, never its target). `clones/` was deleted at this checkpoint.

**Evidence run but not recorded.** None; every output cited is under `runs/` and its figures are in
this document.

**Questions sent, and to whom.** To `steering-hooks-fixer`: OQ-1 (which Discord parser is the
standard) and OQ-4 (adopt the published parser in the product; an architect question), sent with this
document's path after this commit. No reply yet. Nothing was put to the owner directly.

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
construction, a rendering-stage check).

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

Not run: this session has no `mcp__playwright__*` tools. The method, for a session that has the
test-account browser:

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

### 4. Recommended oracle arrangement, with its gaps

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
- **(a) Reading as specification.** The rule modules of V-1 are readable in the served bundle and are
  the written specification of the legacy path; the native path has no readable source, only behaviour.

Known gaps of this arrangement:
1. It has not been checked against rendered Discord (§ 3 not run).
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
| OQ-2 | Does the oracle agree with what Discord actually renders, and which parser is the test account served? | This researcher, resumed with the test-account browser | The walk of § 3 on the 37 cases plus a sample of the rest (Resumption State, next acts 2 to 4). |
| OQ-3 | Which parser and which syntax set does Discord use for embed description, embed title, field name, field value, footer and Components V2 text? | Analyst or the effort's first stage | Fetch the lazy chunks, read the embed renderer; or read the DOM of posted embeds in the walk. |
| OQ-4 | Should the product adopt Discord's published parser for its preview instead of testing its own rules against it? The licence allows it; `@discord/markdown-react` exists for the rendering step. | Architect, then the owner | An architecture finding. Raised because it changes what the fuzzer has to cover; not answered here. |
| OQ-5 | Which constructs does each independent third-party client implement, and does any format in its text box? | Retired 2026-11-23 | The owner's selection "Agent: leave them not done" (effort rulings block "2026-11-23T09:32Z"): the per-client checks stay not done and third-party clients are a footnote. |

## Remaining gaps

| # | Unknown | Blocker | Required action | Owner |
|---|---|---|---|---|
| G-1 | Fidelity of either parser to rendered Discord | No browser tools in the session that wrote this | Run § 3 after the restart with the browser (Resumption State) | this researcher, resumed |
| G-2 | The share of users on each parser | Server-side experiment assignment | None available from public assets; the walk answers it for the test accounts only | — |
| G-3 | Embed and Components V2 rule sets (H-3) | Embed renderer is in a lazy chunk not fetched | OQ-3 | effort |
| G-4 | Legacy text-box styling of links, quotes, code blocks, lists and headings (the `skip` rows of V-11) | Not traced past the table | Read the rest of module 339200 and its callers, or read the text box DOM in the walk | effort |
| G-5 | Legacy React output (which tags the old renderer emits) | Module 862316 not read | Read it, or take it from the DOM in the walk | effort |
| G-6 | Per-client construct, text-box and test checks for 25 of 26 cloned clients; four library cells (masked link, underline, escape, list) for four libraries | Not completed | Deferred: stays not done by the owner's selection (OQ-5) | — |
| G-7 | Older parser versions (0.12.0 and earlier) | Different API | Not needed unless the pin goes backwards | — |
| G-8 | Module-id stability beyond 13 hours | Only three same-day builds observed | Re-run the predicate table on a later build; the drift alarm does this as a side effect | effort |
| G-9 | The site's interactive (editor) rule set and embed rule sets against the oracle | Only the static content set was run | The effort's fuzzer | effort |
| G-10 | The January 2025 post on Discord's Rust markdown rewrite | Host did not resolve | Fetch from another network or find the canonical URL | — |

## Scratch instruments (perishable)

These live in this session's scratch directory and are not part of the record; a reboot removes them.
They are named so the effort can lift what it wants before then.
`/tmp/claude-1000/-usr-local-bin-hooks/9aa102b9-a7a1-4106-ba3f-996decade255/scratchpad/` holds:
a `corpus` folder (`corpus.js`, the 272 cases); a `tools` folder of scripts written in this session
(`wasm-oracle.js`, loader for the served wasm; `legacy-oracle.js`, headless legacy probe with the
request filter; `norm.py` and `compare.py`, canonical form and scoring; `mods.py` and `buildcmp.py`,
module indexer and cross-build comparison); a `runs` folder (every output cited above); and a
`helpers` folder (`libraries-table.md` and `clients-table.md`, the helpers' tables). None of these
is a path in this repository. The directories `discord-assets*` and
`discord-mods` hold Discord's code and must not be copied into any repository. The third-party
`clones/` directory was deleted at the 09:35Z checkpoint.

## Recommendations (investigation only)

1. Put OQ-1 to the owner before the plan fixes acceptance criteria; it decides what "matches Discord"
   means for 14% of this corpus.
2. Run the § 3 walk once, on Appendix A plus about thirty agreeing cases, before the fuzzer's results
   are trusted.
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
