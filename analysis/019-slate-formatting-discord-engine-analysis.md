---
ID: 019
Origin: 019
UUID: 286c730a
Parent: slate-formatting-discord-oracle-2026-11-23.md
Status: Active
Status-Detail: >-
  M1 items AN-1 to AN-7 run against plan 019 Revision 2. Every item has a result, except two limbs: G-11 is not completed (no session
  holds test account 2's profile, so it falls to X-13), and GAME_MENTION's written form. AN-1's Preview limb is devops's, landed
  (record 2531c04a). Two items for him go through
  steering: AN-3 (every embed surface and the V2 text display are legacy-only) and AN-6 (the native box styles a run across a line
  break, D-11's reopening class).
---

# 019 — Analysis: Slate formatting on Discord's published engine (plan M1, AN-1 to AN-7)

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-11-23T16:36 | 1 | analyst-019 | Created from brief `steering/019-brief-analyst.md` and common brief `steering/slate-formatting-brief-common.md`, commissioned by plan 019. Work began on Revision 0 (record `09170dd0`). The plan moved to Revision 2 (`8dfd4659`) during the run, and M1 was re-read there before writing. Changes under me, all followed: AN-1 adds Playwright Firefox and the wasm's `content-type`. AN-2 adds the loading state and the puppeteer quiet window. AN-3 adds per-surface classes and the disagree counts for legacy-only surfaces. AN-4 adds G-14's state read. AN-7 adds G-14's emoji-label DOM read and D-10's premise. M1 adds lifting the research instruments (QAF-11). |

## Value Statement and Business Objective

Plan 019's value statement, quoted: "As a Hooks user composing a Discord message, I want the editor's colouring and the preview to
format every input the way Discord does, and to keep every character I type, paste or load, so that what I build on Hooks is what
Discord shows when it is sent." M1 turns the plan's unknowns into determinations before M2 to M5 are approved: whether the engine
builds and serves, whether preview images capture it, what each surface parses, whether the oracle runs without a browser, which
tree the preview reads, and how Discord's box styles text.

No roadmap or architecture document was read in this run. The plan's own alignment (its header and Decisions Register) is the
context used, and no Master Product Objective is cited here.

## Methodology and provenance

- **Website exports.** `git archive af3d95a` into this session's scratch, with the shared tree's `node_modules` **copied** (`cp -a`,
  1.3 GB; the top-level directory is real and pnpm's internal links are relative). The shared website tree was not switched or
  written. Its HEAD read `7660259` at 16:35Z, moved by another chain; every export here is `af3d95a`.
- **Build environment.** `src/env.mjs` refuses a build without its variables, so the build and the server used placeholder values
  (`verification/019/analysis/an1/spike.env`). No credential and no `.env*` file was read or copied. The database URL points at a dead
  local port, and the Pusher key is a placeholder string, so no save could reach production's Pusher app. No save was made.
- **Network isolation.** Every probe that served or loaded a page, or ran Discord's code, ran inside `unshare -rn` (loopback only).
  Probes that executed Discord's fetched code also ran inside a capped `systemd-run --user --scope`. One deviation, disclosed here:
  `next build` itself ran with network. The first isolated build failed fetching Google Fonts (`next/font/google` in
  `src/app/layout.tsx`; `an1/build-base-isolated.txt`), and the build is not a page probe. Posting to and reading from Discord are
  the acts AN-3 and AN-7 name, and ran with network.
- **Discord's code.** Fetched from public assets at analysis time (stable `discord.com/app` and its 364 scripts, canary, and 6,600
  lazy chunks named by the stable runtime) into scratch only. It was read as prose and run only under Node in jsdom. Nothing of it
  is committed (D-4): the record holds our probes and their outputs, never a module's text.
- **Provenance labels** used below: **[run]** a determination executed this session; **[read]** read from source (Discord's served
  bundle, a package, or the website) and not executed; **[observed]** a DOM or API read on the test server.
- **Instruments lifted** (QAF-11): the research's scratch tools, corpus and walk captures are copied to
  `verification/019/analysis/instruments/research-lifted/`.

## Findings

### Verified

**AN-1 Build spike: PASS.** Captures: `verification/019/analysis/an1/`.
- [run] With `@discord/markdown-wasm` 0.16.0 and `@discord/markdown-types` 0.14.0 placed in the export's `node_modules`, `next
  build` (Next 16.4.6, Turbopack) exits 0 (`an1/build-spike.txt`). The build emits the wasm as a static asset:
  `.next/static/media/discord_markdown_wasm_bg.2658mkht2lx08.wasm`, 1,230,190 bytes, SHA-256 `da7b9e5e…57fb0`. That equals research
  V-4 and the served Discord asset (`an1/chunk-sizes.txt`, `sha256sum`).
- [run] Turbopack bundled the browser loader (`compile-module.js`, `WebAssembly.compileStreaming(fetch(new URL(…,
  import.meta.url)))`) into chunk `43c3agrp2xheg.js`. That chunk carries `compileStreaming` and the `/_next/static/media/…wasm` URL,
  and no `readFile` (`grep -c readFile` = 0). The `initSync` fallback was not needed.
- The spike is a two-file change over `af3d95a`, not a design:
  - `src/utils/markdown/wasmSpike.tsx` (`an1/wasmSpike.tsx.txt`): a minimal renderer over `parse`.
  - `MarkdownProvider` `useValue` (`an1/MarkdownProvider.spike.diff`): it awaits `init()`, then swaps `static.parseContent`.
- [run] Under `next start`, loopback only, 20 loads of each page in a fresh browser context per load (`an1/an1-load-20.json`,
  `an1/an1-load-20-firefox.json`):

| Measure | Chrome 157.0.8103.38 | Playwright Firefox 144.0.2 |
|---|---|---|
| `/preview`: formatted render seen (bold, link and spoiler in the engine's output) | 20 of 20 | 20 of 20 |
| `/preview`: navigation to first formatted render, median / p95 | 1,258 ms / 2,221 ms | 2,938 ms / 6,199 ms |
| `/preview`: `init()` duration, median / p95 | 297 ms / 692 ms | 721 ms / 1,248 ms |
| editor page (`/message/m/new`): engine initialised | 20 of 20 | 20 of 20 |
| editor page: navigation to engine ready, median / p95 | 996 ms / 2,238 ms | 3,395 ms / 5,216 ms |
| wasm response | 200, `application/wasm`, `content-encoding: gzip`, 459,029 B encoded, 1,230,190 B decoded | 200, `application/wasm`, gzip, 1,230,190 B decoded |

- [run] Chunk bytes (`an1/chunk-sizes.txt`; raw from the file size, gzip from `gzip -c | wc -c`):
  - The editor page's markdown chunk at the base, `38akicj0z-tc7.js` (`simple-markdown` and the site's rules): 42,672 raw, 12,656 gzip.
  - The spike leaves that chunk byte-identical, because the spike keeps the old engine beside the new one.
  - The spike adds the loader chunk, 6,822 raw and 2,857 gzip, plus the wasm: 1,230,190 raw, 450,875 at `gzip -9`, 459,029 as
    served.
  - A real M2 removes most of `38akicj0z` (X-8 keeps only the emoji lift), so these figures bound M2's cost from above.
- [run] Noise on this box: 17 cores shared with other sessions, so the timings are this box's, not a user's device. Each load also
  logged two unattributed 404s and `ERR_INTERNET_DISCONNECTED`, both expected in a namespace with no network. The 404 URLs were not
  read.
- **Vercel Preview limb: done by devops**, cited here from `deployment/019-slate-formatting-discord-engine-deployment.md` (record
  `2531c04a`, read at 16:37Z; captures `verification/019/devops/`):
  - The plain spike push `5ac2dd1` ended **Error** on environment validation: the Preview target lacks `DATABASE_URL` and the four
    Redis names.
  - Head `c90a3a2`, which adds the plan 018 form (`vercel.json` `SKIP_ENV_VALIDATION=1 next build`), reached **Ready**.
  - On that deployment, Chrome 116, 20 loads: `/preview` first formatted render median 1,214.4 ms, p95 1,893.8 ms, 20 of 20
    formatted. The wasm: 200, `application/wasm`, `content-encoding: br`, 447,426 bytes encoded, 1,230,190 decoded.
  - Devops's stated limits: no Vercel base build, so no before-and-after pair; and 3 of 20 editor loads raised an undiagnosed
    `pageerror`, though the engine still initialised.
  - Those are devops's measurements, restated from its record, not re-run here.

**AN-2 Generator capture: PASS, 150 of 150 in each of two modes.** Captures: `verification/019/analysis/an2/` (`rows-warm.json`,
`rows-cold.json`, `an2-capture.js`).
- [run] The probe used puppeteer 21.1.0 with `@puppeteer/browsers` 1.7.0, both equal to `preview-image-generator@8512a1d`
  `package-lock.json`, and its bundled Chrome for Testing 116.0.5845.96. It used `getPool.ts`'s launch options verbatim (`headless:
  'new'`, the 35 `minimal_args`), then `generateMessagePreviewImage`'s steps: viewport 720×840 at `deviceScaleFactor` 1/3.75,
  `goto(…, { waitUntil: 'networkidle0' })`, and `screenshot({ type: 'jpeg', quality: 90 })`. It ran against the spike's `/preview`
  under `next start`, loopback only.
- [read] The loading state is M2's. The existing `DiscordMessageEditor` renders behind `show={!!(markdown && (onMount ||
  mounted))}`, and the spike sets `markdown` only after `init()` resolves, so the editor is hidden until ready. That is M2's
  "Pending" state.
- [run] Three messages, each holding bold, a masked link and a spoiler, 50 captures each. `page.content()` was read right after
  `screenshot()`:
  - Pool-like (one browser, a new page per capture, as `getPool` reuses up to 50 times): 150 of 150 formatted.
  - Cold (a new browser per capture): 150 of 150 formatted.
- [run] The gap was taken on every capture, as `goto` resolving minus the first formatted render, read from `performance.now()` in
  the page:
  - pool-like: min 519.7 ms, median 603.3 ms, max 728.8 ms;
  - cold: min 552.8 ms, median 587.2 ms, max 1,009.6 ms.
- [read] The quiet window: puppeteer-core 21.1.0 `lib/cjs/puppeteer/common/LifecycleWatcher.js` maps `networkidle0` to Chrome's
  `networkIdle` lifecycle event. The window length is Chrome's, not puppeteer's, and is not set in puppeteer's source. That Chrome
  defines it as 500 ms with no connections is documentation, not read in Chromium's source here. The measured minimum margin of
  519.7 ms is consistent with a 500 ms window.
- The JPEGs (300) are kept outside every repository at `~/.cache/analysis-019-an2-jpegs/`. Captured media stays out of commits by
  the owner's standing rule.
- **Side observation, outside the region; for steering.** [observed] In pool-like mode, 147 of 150 `goto` responses were 304
  (`rows-warm.json`, `status`), because the same URL repeated in one browser. The generator's check `if (status < 200 || status >
  299) throw new PreviewFailure('error-status')` would fail those captures. The probe did not throw. See H-2.

**AN-3 Surface masks.** Captures: `verification/019/analysis/an3/`.
- [read] **Embeds and the V2 text display are parsed by the legacy formatter only, in build 679055.**
  - The embed renderer (lazy chunk `2420b0c09d1ff9a5.js`) calls the legacy facade (module 46054) for every embed field:
    - `renderEmbedTitle` calls `parseEmbedTitle`, or `parseEmbedTitleWithoutLinks` when the embed has a `url`;
    - `renderEmbedDescription` calls `parseRichEmbedText` with `allowLinks`, `allowEmojiLinks`, `allowList` and `allowHeading` set,
      but `allowHeading` is false for a field value;
    - the field loop calls `renderTitle` for a field name and `renderDescription(…, true)` for a field value.
  - The V2 text display (`nZ` in lazy chunk `e940c8e032f54075.js`) calls the facade's `parse` with options `{allowList, allowHeading,
    allowLinks, allowGameMentions, previewLinkTarget}`, and the message state from module 354777.
  - Neither chunk references the native switch (`grep -c "146849\|enable_native_markdown"` = 0 in both).
  - The native parser is reached only from message content (module 538355, mask `ALL & ~DEV_LINKS`, minus `QUOTES` under
    `formatInline`; modules 997141 and 538355).
  - This confirms research H-3.
- [read] Author name and footer text are drawn as plain text (`renderAuthor` and `renderFooter` emit `t.name` and `t.text`).
- [read] Lists, headings and masked links in an embed description are gated by `showListsAndHeaders`. That flag is module 384231's
  `S(message timestamp)`: true for a message newer than snowflake 1088216706570268682, which is 2023-03-22T21:44:40Z. Every new
  message passes it.
- [run] The legacy table was built per surface, under Node, with that surface's own call and state, over one discriminating case per
  `Syntax` bit (`an3-bits.json`; `an3-legacy-surfaces.json`).
- [observed] The same cases were posted as test-bot embeds, without an embed URL and with distinct embed URLs, and as one V2 message
  of 31 text displays, then read as test account 1 on build 679055 (`an3-dom2.json`). A first post put five embeds with one shared
  URL in each message, and Discord merged them; it was reposted with distinct URLs (messages `1574459339…` to `1574459381…` are the
  first attempt).
- The table: L is legacy parses it, R is rendered, - is no. Native is "no path" on every column but content.

| Bit | content (webhook; research V-18, V-23) | description | field value | title | title, embed has url | field name | field name, embed has url | footer | author | V2 text display |
|---|---|---|---|---|---|---|---|---|---|---|
| CUSTOM_EMOJI | L | L / R in AN-7 | L / R in AN-7 | L | L | L | L | - | - | L |
| COLON_EMOJI, UNICODE_EMOJI | L | L/R | L/R | L/R | L/R | L/R | L/R | - | - | L/R |
| MASKED, DETECTED, AUTO, CONTACT_LINK | L | L/R | L/R | L/R | - | L/R | - | - | - | L/R |
| USER, ROLE, EVERYONE, HERE_MENTION | L | L/R | L/R | - | - | - | - | - | - | L/R |
| CHANNEL, STATIC_MENTION, TIMESTAMP | L | L/R | L/R | L/R | L/R | L/R | L/R | - | - | L/R |
| COMMAND_MENTION | L | L / R in AN-7 | L | L | L | L | L | - | - | L |
| GAME_MENTION | not established (G-1) | | | | | | | - | - | |
| CODE_BLOCK | L | L/R | L/R | - (``` becomes inline code) | - | - | - | - | - | L/R |
| CODE, DOUBLE_CODE, BOLD, both ITALICs, UNDERLINE, STRIKETHROUGH, SPOILER | L | L/R | L/R | L/R | L/R | L/R | L/R | - | - | L/R |
| HEADING | L | L/R | - | - | - | - | - | - | - | L/R |
| LIST, SUBTEXT | L | L/R | L/R | - | - | - | - | - | - | L/R |
| QUOTE, MULTILINE_QUOTE | L | L/R | L/R | L/R | L/R | L/R | L/R | - | - | L/R |
| DEV_LINKS | - | - | - | - | - | - | - | - | - | - |

- Rendered equals legacy in every cell read, with three exceptions, all explained:
  - CUSTOM_EMOJI: the posted id was not a usable emoji, and the API stored `:hooks:`. Re-read with a real emoji in AN-7: rendered.
  - COMMAND_MENTION: an unknown command id is drawn as text (research V-18). Re-read with a real command in AN-7: rendered.
  - A title in an embed with a URL is itself an `<a>`, so the reader counted a second `<a>` as a parsed link.
- **Class of each surface:** content: both formatters. Embed description, field value, title, field name, footer and author (plain),
  and the V2 text display: **legacy only.**
- [run] Disagree counts for the legacy-only surfaces (F-7). The 272 corpus was parsed with each surface's legacy call, and with
  native `parse` under the mask the table gives that surface (`an3-masks.mjs`; masks in `corpus-compare/masks.json`). Scored by the
  research's own `compare.py` and `norm.py`, loose form:

| Surface | Native mask | Agree / 272 | Disagree (candidates, an upper bound: research § 4 gap 3) |
|---|---|---|---|
| content (webhook) | `0x3fffffff` | 235 | 37 (equals research V-8, which checks the harness) |
| embed description | `0x3fffffff` | 235 | 37 |
| embed field value | `0x3dffffff` | 240 | 32 |
| embed title, field name | `0x19fecd7f` | 218 | 54 |
| embed title or field name, embed has url | `0x19fecd07` | 235 | 37 |
| V2 text display | `0x3fffffff` | 235 | 37 |

- **Not completed in AN-3:** GAME_MENTION. Its written form is not established: `<game:id>` is plain text in both parsers (`bits.mjs`
  output: "NOT DISCRIMINATING"), and the regex export of module 856896 was not read out.

**AN-4 Legacy oracle in the test environment: Node suffices; no browser is needed.** Captures: `verification/019/analysis/an4/`.
- [run] `legacy-node.js` runs under Node 24 in jsdom 30.0.1, which is already in the website's `node_modules`. It evaluates the page's
  inline scripts, then its 364 `<script src>` files in page order. It swaps the entry's one startup call (`()=>p(<id>));N=p.O(N)`)
  for one that exposes webpack's require; the probe exits 4 unless exactly one such call exists. Inert shims are listed in the
  probe: `matchMedia`, two observers, `requestIdleCallback`, `AudioContext`, `Worker`, `BroadcastChannel`, and a `fetch` that
  refuses everything except the wasm. Then:
  - Module count: 11,292. The facade, rules and text-box predicates each match exactly one module (46054, 605275, 339200).
  - `parseToAST` over the 272 corpus: 272 rows, 0 errors. Parse 73 ms on stable and 81 ms on canary; total, load included, 1.5 s
    and 1.4 s.
  - Against the research's headless-browser output (`runs/legacy.json`, build 679055), 270 of 272 rows are JSON-identical. The two
    that differ, `<id:customize>` and `<id:browse>`, differ only in a locale label string that Node does not load ("" against
    "Channels & Roles"). Their tree shape is equal.
  - The fetch of `discord.com/app` and 364 scripts took 1.80 s wall time (`/usr/bin/time`), once.
- [run] The text-box table (339200 `cv.markdown`) and the native box mapping (818948 `p0`) also run under Node: 85 cases, 0 errors
  (AN-6). For the native one, `fetch` serves the served wasm's bytes, and module 152959's `initNativeMarkdown()` is awaited.
- [run] Locator stability (G-8): the 13 predicates of research V-1 (`buildcmp.py`) were re-run on **stable 679055**, still the
  current stable at 15:58Z, and on **canary 679159**, newer than any build the research saw. Every predicate matches exactly one
  module, with the same id in both (`an4/an4-predicates.txt`). Twelve modules are text-identical; module 694403 (links) differs only
  in required ids (its id-stripped hash is equal). Stable and canary give the same 272 trees (`an4-legacy-node-*.json`).
- [run] The drift alarm's locator works as M3 states: glue module 905779 requires module 775702, whose body is `r.p+"<hash>.wasm"`.
  On both builds that file is `e933c74869ad2e0d.wasm`, 1,230,190 bytes, SHA-256 `da7b9e5e…` (`an4-wasm-hashes.txt`;
  `grep -c e933c74869ad2e0d` = 2). The bundle names 200+ other `.wasm` files, so the alarm must follow the glue's require, not a
  file-name pattern.
- [run] Failure modes:
  - Unreachable: inside `unshare -rn`, `curl -sS -f https://discord.com/app` exits 6 ("Could not resolve host").
  - The page changes: a predicate that matches 0 or more than 1 module exits 5, naming the predicate. A startup shape that is not
    unique exits 4. A missing state builder exits 6.
- [read] G-14, the state a message the site sends is parsed under: module 354777 `ko(message, renderOptions)` returns
  `allowLinks: webhookId != null || renderOptions.allowLinks` and `allowEmojiLinks: webhookId != null`, on top of `Le`'s defaults
  (`allowEmojiLinks: false`, `disableAutoBlockNewlines: true`, `unknownUserMentionPlaceholder: true`).
- F-13 does not arise: no browser driver is needed, and jsdom adds no install step.

**AN-5 Which tree the preview renders from: `parseLossless` alone.** Captures: `verification/019/analysis/an5/`.
- [observed] Bare and `<…>` link labels: Discord draws the **normalised URL**, not the typed text.
  - In the research's captures, the label equals the parser's `url` on all 16 bare and angle-bracket rows; none equals the typed text
    where the two differ (`an5-link-labels.txt`). For example, `https://example.com` is drawn `https://example.com/`.
  - Re-posted this run: `https://x.y🙂` is drawn `https://x.xn--y-bz3s/` (punycoded host); `https://EXAMPLE.com/Path` is drawn
    `https://example.com/Path`.
  - `<https://example.com/🙂>` is drawn with the emoji unencoded, while native `url` percent-encodes it. That is the
    legacy/native disagreement the research link table lists.
  - So a link's label is its `url`: both trees carry it.
- [run] The code block's language as typed is in both trees: `JS` stays `JS` and `C++` stays `C++` (`an5-native.txt`).
- [run] The timestamp edit target (S-10): `parse`'s timestamp node has no span. `parseLossless` gives it an `atom` token with its span
  (`<t:1700000000:f>` at 0–16), and a code span's content is a separate `code_content` token (21–30). That is the span AC-4.3 needs.
- [run] Equivalence: `parseLossless`'s node kinds, ignoring tokens, rebuild `parse`'s tree on 271 of 272 corpus cases
  (`an5-equiv.json`). The one difference, `snake_case_word`, is a split of one text run into two text nodes, which the comparer's
  merge missed; the text is the same.
- [run] Cost: on a 2,000-character message, `parseLossless` takes 3.25 ms and `parse` 1.58 ms. Over the whole corpus (272 strings,
  3,637 characters) they take 9.1 ms and 9.3 ms. Node 24, means over 200 and 20 repetitions (`an5-time.json`).
- **Form chosen: `parseLossless` alone.** Reason: S-10 needs a span, and `parse` has none. `parseLossless` carries every value `parse`
  returns (271 of 272, the remaining row a text-node split). It also carries the source text of each link's `url` token, should a
  label ever need it. `parse` plus source slices would need a second locator for every node kind.

**AN-6 Editor token mapping.** Captures: `verification/019/analysis/an6/`.
- [read] Discord's native box (module 818948 export `p0`), read as prose:
  - **One parse per run of adjacent `line` and quote elements, joined by `\n`** (a quote element is prefixed `> `). The entries are
    then split back per line, so **a run that crosses a line break is styled across it.**
  - When the joined text holds a fence, the box re-parses with `\n` and a closing fence appended. It keeps that parse if it yields a
    code block ending at the end, so an unclosed fence is a code block while typing.
  - Leaf attributes by token, with the node context as a stack of the enclosing modifier, `inlineCode`, `link` and `subtext`:

| Token | Attributes |
|---|---|
| `delimiter` | `syntaxBefore` or `syntaxAfter`, plus `before_<s>` or `after_<s>` for every style on the stack |
| `code_delimiter` | open if it is the node's first child, else close (same marker form) |
| `escape` | `syntaxBefore` with no styles |
| `code_fence` | `codeBlockSyntax` |
| `language` | `codeBlockLang` |
| `code_content` | `codeBlockText` in a code block, else the stack (with `inlineCode`) |
| `subtext_marker`, and the whitespace after it | open marker |
| `link_open` | open marker |
| `link_close`, `destination_open`, `destination_close`, `title`, and the `url` after a `link_close` | close marker |
| a bare link's `url`, `text`, `atom` | the stack (`link` for a link) |
| `line_ending`, `indent`, `quote_prefix`, `list_marker`, `heading_marker` | none |

  - Body lines inside a fence take no `codeBlockText` entry. The first block gets `silentPrefix` when it starts `@silent`.
  - So in the native box a masked link's **label** is styled `link` and its URL is syntax, which is the reverse of the legacy box.
    Headings and lists add no style.
- [read] Discord's legacy box (module 339200 `cv.markdown`):
  - **Each line element is parsed alone.** Text is split at unescaped fences, and each segment is parsed by the legacy rules with
    `link`, `blockQuote`, `codeBlock`, `list` and `heading` skipped.
  - Inline styles keep their markers (`syntaxBefore` and `syntaxAfter`, with `before_` and `after_` classes). Strong, inline code,
    spoiler, `s`, `u` and subtext omit the marker classes at a boundary (the map `T`).
  - A bare URL, and the URL inside a masked link, get `url`.
- [run] **Inline objects, in both boxes:** `serializeMarkdownChildren` writes every non-text child (emoji, mention, timestamp) as **one
  `?`** before parsing (`an6-inline.json`). Run under Node:
  - `**a <emoji> b**` parses as `**a ? b**`, and the bold covers it in both boxes.
  - `_a<emoji :slight_smile:>b_` parses as `_a?b_`, italic in both. The emoji's name never reaches the parser.
  - The same text typed as text, `_a:slight_smile:b_`, gives legacy an `emoji` node, and native italic.
  - Spoiler across a mention, and inline code across a timestamp: styled across the object in both.
- [run] Per-character agreement over the research's 85 captured typed cases (`tb-all-clean.json`; research says 86, the file holds 85).
  Of these, 65 are comparable: 20 are set aside for a quote or code-line element (11) or an inline object (9) in the box
  (`an6-score.txt`, `skipped`).
  - Legacy table against the captured box DOM: **63 of 65 equal**. The two differences, 239 `\||sp\||` and 246
    `\https://example.com`, are escape characters the DOM marks `syntaxOverride_` where the table marks no marker, from a layer the
    table does not show.
  - **Native box against legacy box: 39 of 65 agree** (research V-22: 43 of 68 under the researcher's own mapping).
  - Native box against the DOM: 37 of 65 (the account is on the legacy box).
  - The 26 disagreements include every line-crossing run (104 `*a\nb*`, 105, 67), masked links (40, x2: label against URL styling),
    `-# -# nested` (18), and the unbalanced-delimiter class.
- The AC-3.2 literal table is the 818948 table above. Freezing it as test literals is M3's.

**AN-7 Real-Discord reads.** Captures: `verification/019/analysis/an7/`.
- [observed] **G-13** (`an7-g13-dom.json`). The run created one custom emoji (`slate_oracle`, `1574460051593240606`) and one guild
  command (`/slateping`, `1574460053359034581`, no handler) as the test bot, recorded in `test-estate.json`. Read as test account 1,
  identically in message content and in an embed description:
  - a real role draws as `span.roleMention_.wrapper_` reading "@Streamers";
  - a real command draws as `span.wrapper_` reading "/slateping";
  - a usable custom emoji draws as `span.emojiContainer_ > img.emoji[alt=":slate_oracle:"]`;
  - `**b <emoji> b**` draws the emoji inside `strong`.
- [observed] **D-10's premise holds.** As test account 1, `oq1 typed 🙂 end` was written into Discord's own message box (Playwright
  `fill`, then Enter) and sent. The API returned stored content `oq1 typed 🙂 end`, carrying U+1F642, not `:slight_smile:`
  (`oq1-stored.json`). Limit: text was inserted, not picked from the emoji picker or autocomplete. D-10's reopening class does not fire.
- [observed] **G-14** (`g14-dom.json`). Three masked links with an emoji in the label were posted as the bot and through a webhook
  `slate-019-g14`, which was created and deleted (HTTP 204) in the run. Stored content was unchanged in all six.
  - **Bot:** none of the three is a link. Each is drawn as plain text, the brackets included.
  - **Webhook:** all three are links. The label emoji is drawn as an image, for Unicode and custom alike; `[go 🙂 now]` gives
    `go `, `img`, ` now` inside the `a`.
  - [run] Native `parse` makes all three links, but leaves the label's emoji as text, including the literal
    `<:slate_oracle:1574460051593240606>` (`g14-native.txt`).
  - So the emoji-label class is a legacy/native disagreement on the sending path the site uses (webhooks). Under D-5 it has no
    expected value, and it belongs in the known-differences list.

**OQ-4 highlight.js 11.12.0.** Captures: `verification/019/analysis/oq4/`.
- [read] The only fully public output is `HighlightResult.value`, an HTML string. `_emitter` is typed in `HighlightResult`'s
  "private" block, and `rootNode` is not in the typed `Emitter` interface.
- [read] `HLJSOptions.__emitter` takes an `EmitterConstructor`. The types describe `Emitter` as "technically private, but exported for
  convenience as this has been a pretty stable API".
- [run] A recording emitter passed through `hljs.newInstance().configure({ __emitter })` yields the nested scope tree. For `const x =
  \`a${b}c\`; // n` it gives `string>subst` for `${b}`, and it leaves the shared `hljs` instance's output unchanged
  (`oq4-emitter.out`). Two costs:
  - core also calls `openNode` and `closeNode`, which the typed interface omits;
  - a new instance starts with no languages, so each must be registered.
- Which surface to use is the architect's (OQ-4 is put to it at conformance). The options are the public HTML re-parsed, or the
  typed-but-private `__emitter` on its own instance.

### High-confidence inference

- **I-1.** M2's real bundle cost is bounded above by the spike's figures, because the spike carries both engines.
- **I-2.** The editor page also pays the wasm fetch: the engine initialised there in 20 of 20 loads.

### Hypotheses

- **H-1 (Medium).** On a slower host CPU than this box's, compile plus first render could exceed Chrome's quiet window, so the
  generator would capture plain text.
  - Fastest disconfirming test: rerun `an2-capture.js` with CPU throttling (`Emulation.setCPUThrottlingRate`, 4×) and count.
  - Missing telemetry: a page-side "formatted" mark the generator could log.
- **H-2 (Medium; outside the region).** The production generator fails `error-status` when one pooled browser renders the same
  `/preview` URL twice, as a 304.
  - Fastest disconfirming test: two identical `generateMessagePreviewImage` calls on one pooled browser at `8512a1d`.
  - Missing telemetry: the generator's per-capture status code. A generator change is a re-scope (X-11), so this goes to steering.

## Determinations that bear on the plan's text (for the planner; not plan items)

1. **M5's "each emoji element counted as its source text"** does not match Discord. Both of Discord's boxes count an inline object as
   one opaque `?` (AN-6 [run]). Under D-3, Discord's behaviour is the standard, so the plan text is the side to reconcile.
2. **D-11's "each line styled alone"** matches the legacy box only. The native box styles a run across a line break within adjacent
   lines and quotes (AN-6 [read], and `*a\nb*` [run]). D-11's reopening class names this finding. It goes to the owner through
   steering. The heading and list limb of D-11 holds in both boxes.
3. **AN-3:** every embed surface and the V2 text display are legacy-only. Plan M1 AN-3 sends that to the owner through steering
   before M2's approval, with the disagree counts above.
4. **The masked-link styling is reversed between the boxes** (native: label `link`, URL syntax; legacy: label plain, URL `url`).
   This is a disagree class for AC-3.2.

## Open Questions and remaining gaps

| # | Unknown | Blocker | Required action | Owner |
|---|---|---|---|---|
| G-1 | GAME_MENTION's written form, and its rendering on any surface | Not read out of module 856896; `<game:id>` parses as text in both | Read the regex export in the Node oracle, then post one case | analyst, on the planner's ask |
| G-2 | G-11: the native parser seen rendered, as test account 2 | Not completed: no session's browser holds test account 2's profile (`test-estate.json`: `chrome-test-account-2`; this session's browser is test account 1's) | A session launched with that profile reads `***bi***`, `# # nested`, `**# not head**`. Per plan Revision 2, this falls to Exclusions X-13 | steering |
| G-3 | RESOLVED: AN-1 on a Vercel Preview, by devops (record `2531c04a`; AN-1 above). What stays open: the 3 editor-load `pageerror`s it did not diagnose | Devops's record | Read the page error on one Preview load | devops or M2's implementer |
| G-4 | H-1 and H-2 | Not run | The tests named in each | analyst, or a re-scope for H-2 |
| G-5 | The two `syntaxOverride_` escape cells (AN-6 rows 239 and 246) | The leaf renderer was not read | Read the leaf class component that adds `syntaxOverride_` | M3's implementer, as a residue row |
| G-6 | The 404 URLs in the AN-1 page loads | Not read | Log response URLs on one load | low; nothing rests on it |

## Test infrastructure set up and removed

- Set up:
  - two website builds in one scratch export (base, then spike) with a copied `node_modules`;
  - `next start` on 127.0.0.1:3900 inside network namespaces, one per probe run, each stopped by the wrapper's `trap … EXIT`;
  - puppeteer 21.1.0 with Chrome 116 in scratch;
  - the Discord bundle, canary and lazy chunks in scratch.
- On the test server:
  - one emoji and one guild command, kept and recorded in `test-estate.json`;
  - 19 test-bot messages and 3 webhook messages in `#slate-oracle-walk`;
  - one message as test account 1;
  - webhook `slate-019-g14`, deleted.
- Removal of the scratch export, the downloaded bundle and the package unpacks is recorded at the run's close in the hand-back.
