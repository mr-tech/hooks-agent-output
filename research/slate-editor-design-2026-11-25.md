---
UUID: 416ecf54
Parent: slate-formatting-discord-oracle-2026-11-23
Status: Active
Status-Detail: "All four parts are written and the owner has answered OQ-1 to OQ-3: a rebuild is sized first by planner-019 and would be its own effort, never part of plan 019; for a rebuild, emoji are decided per line and the quote marker is hidden. OQ-4 and G-8 go to the sizing. Stays Active until the sizing lands; the close is on steering's cue. Checkpointed, no unit in flight."
---

# Is there a better design for the website's message editor, and what would adopting it change for plan 019?

## Changelog

| Date (UTC) | Agent | Change | Notes |
|---|---|---|---|
| 2026-11-25T11:47 | researcher-slate-editor-design | Document created; Part 1 written | Brief `steering/slate-editor-design-brief-researcher.md`; the owner's question and its sharpening are effort rulings blocks "2026-11-25T11:38Z" and "2026-11-25T11:40Z" (`steering/fixer-queue-2026-11-21-rulings.md`), both read at this write. Two helpers are running (open-source survey; plan 019 defect extraction); nothing of theirs is in this revision. |
| 2026-11-25T11:59 | researcher-slate-editor-design | Parts 2 to 4, System Weaknesses, Open Questions, Remaining Gaps, Recommendations and two appendices written; P1-4's caller sentence corrected; first commit | The 11:47 text was never committed. Its P1-4 said the inline-object pass had one caller; a second module calls one of its helpers, and the sentence now says so. The defect-extraction helper's table is used in P3-5 and P4-2 and marked there. The survey helper's table is used in P2-4 and marked there; the six rows of Part 2's table are this session's reads. A proof-of-concept was run once (P3-2 to P3-4, Appendices A and B). Record check at session start: exit 1, 41 failures outside the baseline, none in a research document. |
| 2026-11-25T15:27 | researcher-slate-editor-design | Owner's answers recorded; OQ-1 and OQ-2 resolved, OQ-3 deferred, OQ-4 and G-8 routed; Resumption State written; checkpoint at steering's ask | Effort rulings block "2026-11-25T15:25Z" (record commit `903a6252`), read whole at this write, at `steering-hooks-fixer`'s message. Nothing in § Findings was re-run. G-3 gains steering's helper's undo reading, marked as not made here. Record check after the first commit: exit 1, the same 41 failures as at session start, none in this document. Cache-warm wake deleted at this checkpoint. |
| 2026-11-25T15:29 | researcher-slate-editor-design | OQ-3 resolved on the owner's words; Resumption State rewritten | Effort rulings block "2026-11-25T15:28Z" (record commit `f3096590`), read whole at this write, at `steering-hooks-fixer`'s message, which arrived after the 15:27 checkpoint was committed (record `dc9da4cd`). Nothing in § Findings was re-run. No wake was armed for this turn. |

## Resumption State

Checkpoint written 2026-11-25T15:27Z at `steering-hooks-fixer`'s ask and rewritten 2026-11-25T15:29Z when OQ-3's answer arrived after
it; the session is cleared after this commit. Later documents are authoritative on the state of every item named here.

- **Done.** The research: first committed revision at record `0f8b22cf`, delivered to `steering-hooks-fixer`. The owner's
  answers are recorded at this revision (Open Questions). Nothing in § Findings was re-run or re-read after the first revision.
- **Next act.** The close, on `steering-hooks-fixer`'s cue once `planner-019`'s sizing lands: the Close Procedure, with OQ-4
  and every row of Remaining Gaps given a carrier by path or a stated lapse. Until then the document stays Active.
- **Approach in flight.** None; no research unit is open.
- **Trees.** The record, `agent-output` on `master`, HEAD `f3096590` before this commit. The website tree was not touched: it
  was read from `git archive` exports of `5ec0621` and `2c0b182`, since deleted.
- **Uncommitted.** One entry of this session's in `INBOX.md`, headed "2026-11-25 — researcher-slate-editor-design — FYI", left
  for the record's owning session by the inbox's convention. Nothing else, and nothing locally mutated.
- **Evidence run but not recorded.** None. The proof-of-concept's readings are Appendix A and its script is Appendix B.
- **Questions sent, and to whom.** Two messages to `steering-hooks-fixer`: one reporting a read that was not completed (id
  `21796324-fc3e-41d8-a9ae-530ce13ef1e6`), one delivering this document with OQ-1 to OQ-3 (id
  `80e87694-b25e-4938-8e6e-edd7608214e6`), answered by rulings blocks "2026-11-25T15:25Z" and "15:28Z". None awaits an answer. Nothing was
  put to the owner directly, and no plan 019 session was messaged.
- **Processes and scratch.** `pstree -ap` of this session at the checkpoint shows the harness's browser tool server and no
  process this session's work started. Its scratch directory holds the scripts, the proof-of-concept's output and the two
  helpers' tables (§ Scratch instruments), and no clone, export or copy of Discord's scripts.
- **Standing bounds.** The brief's: read-only on the website tree; no message to a plan 019 session and no write to a plan 019
  document; Discord's test server only; Discord's code is never committed; no `.env*` value is read; the bare word `none` is
  not used in a command; a stopped call goes to `steering-hooks-fixer` and is not re-issued.
- **Wake.** The cache-warm wake was deleted at the 15:27Z checkpoint and was not armed for this rewrite; it is armed again at
  the next briefed turn.

## Question

The owner asked (rulings block "2026-11-25T11:38Z"): "A lot of work is being put into extending my Slate implementation. One thing I
have to wonder is if there is just a better implementation out there. The reason I ask this is because I really wasn't referencing
anything specific other than just Discord's DOM output when creating functions like with normalization." He sharpened it (block
"2026-11-25T11:40Z"): "My main point is that it might be better to like rebuild the implementation from the ground up rather than
trying to reuse my own functions and hooks. But I don't know."

So: is there a better design for the website's message editor than its hand-written Slate structure and normalisation, and what
would adopting it change for the work left in plan 019? In four parts:

1. How Discord's own message box is built.
2. What open-source editors already do Discord-style markdown-as-you-type.
3. Where the website's design differs, and which of plan 019's defect classes come from a design choice the others avoid.
4. A ground-up rebuild against continuing to extend the current functions and hooks: what each removes from and adds to plan
   019's remaining work, and which of the site's current pieces a rebuild would still keep.

Findings only. This document proposes no plan and no solution.

## Context

- Rulings read whole at this write, in `steering/fixer-queue-2026-11-21-rulings.md`: blocks "2026-11-23T09:07Z" to "09:18Z"
  (the effort, its standard and its scope: "render every input the way Discord does and lose no character"), "09:17Z" (Discord's
  own code may run in tests only, never committed, never shipped), "13:09Z" (the site is held to Discord only where Discord's
  two formatters agree), "15:23Z" (the site uses Discord's published formatter), "17:04Z" (embeds are matched by how they look;
  the editor styles across line breaks, like Discord's native box), and "2026-11-25T11:38Z" and "11:40Z" (this question).
- Architecture: `architecture/website.md` W-3 and `architecture/system-architecture.md` D-001 (one component tree serves editing
  and preview) and the Problem Area row "Slate block structure is recognised by hand regexes, not from a lossless parse", read
  at this write. No roadmap document was read; none is cited.
- Prior research: `research/closed/slate-formatting-discord-oracle-2026-11-23.md` (closed). Its V-1, V-11, V-21 and V-22 are the
  starting point for Part 1 and are not repeated here: V-21 is the observed behaviour of the box on the test server, and this
  document adds the design behind it, read from the code.

## Methodology

- **Discord's client.** `curl` of `https://discord.com/app` on 2026-11-25, then every script the page names: 364 files
  (`grep -o '/assets/[A-Za-z0-9._-]*\.js' app.html | sort -u`, counted with `grep -c .`), 17,634,551 bytes (`du -sb`). Build
  number 679963 (`BUILD_NUMBER` in the page). Public assets only, fetched into this session's scratch directory inside a
  `systemd-run --user --scope` with memory and time caps. Modules were split out with the earlier research's indexer (`mods.py`),
  reformatted for reading, and read as text. Nothing was executed. Nothing of Discord's is in this record: the design is
  described in this document's own words, and a module is named by its id at this build and by a content predicate that finds
  it.
- **Limit of that read.** Only the scripts the page preloads were fetched. A chunk the client loads later was not read. The
  test account is served Discord's older formatter (earlier research, V-21), so the newer ("native") path below is known from
  the code alone and has not been seen running.
- **The website.** Read from `git archive` exports under scratch at two refs: `origin/master` `5ec0621` and the tip of
  `chain/019-slate-formatting-discord-engine`, `2c0b182` (2026-11-25T10:13Z). `git merge-base` of the two is `5ec0621`, so every
  difference between them is plan 019's own chain. The shared website tree was not built, tested or switched. The chain is mid
  fix round; uncommitted work in that tree was not read.
- **Open-source candidates.** Shallow clones under scratch, made by a `general-purpose` helper, which also gathered registry
  and GitHub metadata for 23 candidates; nothing was installed, built or run from them. The six rows of Part 2's table are
  this session's own reads of the files named there. A cell taken from the helper says "helper".
- **Plan 019's record.** A `general-purpose-sonnet` helper extracted the recorded editor defects and grouped them by the
  mechanism the record states; its table is in scratch, and its limits are stated where it is used (P3-5, G-9). This session
  read analysis 019's AN-9 section whole, the plan's Decisions Register rows and AC-6.5, and the rulings blocks named in
  Context.
- **Proof-of-concept.** One script written here (`poc-passes.cjs`) against the Slate core the website installs, loaded
  read-only from the website's `node_modules`, run once inside `systemd-run --user --scope -p MemoryMax=4G` with `unshare -rn`.
  It models neither editor; it isolates two mechanisms (P3-2 to P3-4). Its output is in scratch and its numbers are in the
  findings.
- **Not done.** Nothing was typed into Discord and nothing was sent anywhere; the test-account browser was not used. One
  read of the candidates' dependency manifests was not completed, so no candidate's framework version is stated.

## Findings

Labels: **Verified** (read in the code or run here; each says which), **High-confidence inference**, **Hypothesis**.

### Part 1 — How Discord's own message box is built

All of Part 1 is **verified by reading** the served code at build 679963, and not by running it, unless a line says otherwise.

**P1-1. It is a Slate editor assembled from small wrappers.** The Slate core and its React binding are bundled as two modules
(719442, found by `getDirtyPaths`; 235599, found by `data-slate-editor`). One module builds the editor (68059; found by
`nativeMarkdownSyntax` together with `insertFragmentData`). It wraps the bare editor in a chain of functions, each replacing a
few editor methods: text and line-break insertion, deletion around inline objects, slash commands, inline objects, block
quotes, code blocks, undo history, selection repair. Module ids 339200, 818948 and 68059 are the ids the earlier research
recorded at build 679055.

**P1-2. The document is a flat list of lines, and very little is a node.**

| Construct | What it is in Discord's box |
|---|---|
| A line of text | A block element of type `line`, holding text and inline objects |
| A quoted line | The same block with its type set to `blockQuote`. The `> ` or `>>> ` marker is deleted from the text and stored nowhere |
| A line inside a code block | Still a `line`. It carries one attribute, `codeBlockState` (language, whether it is inside a block, whether it is a styled code line, highlight spans). The fences stay as ordinary text on ordinary lines. There is no code-block element |
| Emoji, custom emoji, user, role and channel mentions, `@everyone`-style mentions, timestamps, a few others | Inline void elements carrying their data (an id, a name, a parsed time) |
| Bold, italic, underline, strikethrough, spoiler, inline code, links, subtext, escapes, code fences and their language | Not nodes. The markers stay in the text; the styling is a decoration computed at render time |
| Headings, lists | Nothing. Plain text, unstyled (earlier research, V-21) |

So a line's stored text and its node text are the same string, except for the quote marker and the source of inline objects.

**P1-3. Discord does not override Slate's `normalizeNode` at all.** The string `normalizeNode` occurs in exactly one of the 364
fetched scripts, the Slate library chunk (`grep -c normalizeNode` over every file: one file non-zero). All upkeep of the
structure is done in three passes hung on the editor's `onChange`, which Slate calls once after a batch of operations has been
applied and Slate's own built-in normalisation has finished. Each pass:

- does nothing unless the document object changed since it last ran;
- runs with normalisation suspended, then lets Slate normalise once;
- is folded into the undo entry of the edit that caused it (quotes, inline objects) or kept out of undo altogether (code state).

A wrapper stops the passes re-entering themselves and gives up after five rounds. The passes run in this order: code-block
state, block quotes, inline objects.

**P1-4. What the three passes do.**

- *Code-block state* (module 277683; found by `withCodeBlocks`). Walks the lines once, carrying "inside a fence or not" forward.
  On the older path it counts unescaped triple backticks in each line's text; on the native path it takes each code block's
  opening and closing line from the document parse (P1-5). It writes only the `codeBlockState` attribute, and only on lines
  where it changed. It never changes a line's text or type. Syntax highlighting spans are stored in the same attribute.
- *Block quotes* (inside module 68059). For each `line`: if its first text starts with optional spaces and `> ` or `>>> `, or an
  earlier line in the same pass started with `>>> `, the line's type becomes `blockQuote` and the marker, where there is one, is
  deleted from that line. A quote whose start is inside a code block is turned back into a `line` with `> ` put back. Backspace
  at the start of a quote turns it back into a line; Enter on an empty quote that follows an empty quote leaves the quote.
- *Inline objects* (module 2368; found by `Failed to find valid start position for raw mention replace`). For each line that is
  not a code line: an inline object that now sits inside code, or after a trailing backslash, is turned back into its source
  text; then the line is parsed and each emoji, mention and timestamp range is replaced by an inline void, last to first. Every
  replacement moves the caret by rule, according to whether it was at the start of, inside, or at the end of the replaced range
  (module 35277; found by `textToVoid`). **The decision uses that one line's text and its code state, never another line's
  text**: the parse this pass uses is the older, per-line one, on both formatter paths. Among the fetched scripts the pass is
  installed in one place, module 68059; module 84046 also calls one of its helpers when a slash-command option is filled; and
  the pass's only parse is the per-line function in module 339200.

**P1-5. Colouring is decoration only, and that is how a style crosses lines without any line being rewritten.**

- Older path (modules 339200 and 490682): each line is parsed alone, from its own text with every inline object replaced by one
  placeholder character. Block rules are skipped, which is why headings and lists get no styling. Results are cached by the
  line's text (250 entries).
- Native path (module 818948; found by `subtext_marker` with `codeBlockSyntax`): each run of consecutive `line` and `blockQuote`
  blocks is joined with newlines, `> ` put back in front of quote lines and inline objects replaced by a placeholder, and parsed
  once with the published parser's lossless mode. Where the text holds a fence, a second parse with a closing fence appended is
  preferred if its code block runs to the end, so an unclosed fence colours as an open block. The token list is then cut per
  line. The result is cached against the document object, so one keystroke costs one parse of each run.
- In both, the output is a list of ranges handed to Slate's `decorate`. A bold run that starts on one line and ends on another
  is two ranges. When a marker is typed or deleted, the ranges on other lines change and their nodes do not.

**P1-6. Between stored text and nodes.**

- *Load* (module 408018): split the text on newlines; each piece becomes a `line` with one text child. Nothing else. Quotes,
  code state and inline objects then appear through the same three passes that run while typing. There is no second
  implementation of the structure for loading.
- *Save* (module 323350): lines joined by newlines; a `blockQuote` line gets `> ` in front; an inline object writes its source
  form (the emoji character, `<:name:id>`, `<@id>`, `<t:…>`).
- *Copy and paste* (module 68059): copy writes that same serialised text for the selected range as plain text. Paste takes plain
  text only (Slate's rich fragment paste is switched off), splitting on newlines inside one undo entry. A URL pasted over
  selected text becomes a masked link.

**P1-7. Discord's box does not keep the stored text exactly.** A quote line always saves with `> `. So `   > q` (leading
spaces) and `>>> q` both come back as `> q`, and a `>>> ` block of three lines comes back as three `> ` lines. The earlier
research saw the marker leave the text (V-21); the save side is read here from module 323350 and was not run.

**P1-8. Undo is by snapshot, not by reversing operations.** The history wrapper (in module 68059, with helpers in 186306)
keeps up to 250 entries, each the whole document value and the selection, merged by kind of edit and a four-second window.
Undo puts a snapshot back. The structure passes therefore never have to produce operations that can be reversed one by one.

**P1-9. Selection is repaired after the fact.** After every operation the wrapper remembers the last selection that pointed at
real text. On change, a selection that no longer does is replaced by the remembered one, or by the end of the document, and a
caret that landed inside an inline object is moved out.

### Part 2 — What else exists

Read by this session in shallow clones (each row's licence is the first line of the repository's licence file, and its date is
`git log -1 --format=%cs` in the clone on 2026-11-25). Fluxer was too large to clone; its row was read from single files the
helper fetched through GitHub's API, and its licence is the SPDX line heading the file read. The designs were read in the
source named; none was run.

| Candidate | Licence; last commit | What its message input is | How close to Discord's box |
|---|---|---|---|
| Fluxer, a Discord-like chat app (`fluxerapp/fluxer`, `fluxer_app/src/features/lexical/composer/ComposerMarkdownHighlight.ts`) | AGPL-3.0-or-later; 2026-11-25 (helper, GitHub API) | Lexical. **The nodes are rebuilt from the text on every update.** One transform on the root reads each paragraph's source text, parses it with the app's own span parser (`markdownSpans.ts`, 1,270 lines), and compares the nodes it wants with the nodes it has: marker nodes for the delimiters, formatted text nodes for the content, a quote-marker node, and the existing emoji and mention nodes kept in place and flagged "literal" when the parse puts them inside code. A line whose nodes already match is left alone; one that does not is replaced, with the selection saved as text offsets and put back. The value handed to the app is the source text (`LexicalComposerInput.tsx`, `$projectComposer().wire`) | The closest in coverage that was found: markers stay visible, quotes, code, spoilers, subtext, masked links, emoji and mentions are handled. Its rules are its own parser's, not Discord's, and it styles headings, which Discord's box does not |
| Slate's own `markdown-preview` example (`ianstormtaylor/slate`, `site/examples/ts/markdown-preview.tsx`) | MIT; 2026-11-20 | Slate. Every paragraph is plain text. `decorate` tokenises each text node with a generic markdown grammar and `renderLeaf` styles the ranges. 167 lines. No construct is a node, there is no normaliser, and there are no inline objects | Same idea as Discord's colouring (P1-5), with none of the rest: no quotes, code lines, emoji or mentions, a generic grammar, and each text node styled alone |
| Stoat (formerly Revolt) web client (`stoatchat/for-web`, `packages/client/components/ui/components/features/texteditor/`) | AGPL-3.0; 2026-11-25 | CodeMirror 6. **The document is the message string.** Styling comes from the library's markdown syntax tree and a few regex marks (spoilers, timestamps). Emoji and mentions are widgets drawn over their source text and registered as atomic ranges, so the caret steps over them while the text underneath is unchanged; a match inside code (asked of the syntax tree) gets no widget. The value handed to the app is the document's text | Close in behaviour: markers stay visible, text is styled in place, emoji and mentions show as objects. Not Discord's rules (the library's CommonMark-style grammar), quote markers stay visible where Discord hides them, and headings are styled where Discord's box leaves them plain |
| Cinny (`cinnyapp/cinny`, `src/app/components/editor/`) | AGPL-3.0; 2026-11-24 | Slate, as a rich-text editor: bold, italic, code and quote are properties and block types on nodes, converted to HTML on send (`output.ts`). Markers do not stay as text | A different model (formatting is stored in nodes), so not comparable |
| Discohook (`discohook/discohook`, `packages/site/app/components/TextArea.tsx`) | AGPL-3.0; 2026-11-24 | A plain `<textarea>`, with a separate rendered preview | No in-place styling at all |
| Embed Generator, message.style (`merlinfuchs/embed-generator`, `embedg-app/src/components/EditorInput.tsx`) | MIT; 2026-11-24 | A plain auto-sizing `<textarea>` or `<input>`, with a separate preview | No in-place styling at all |

**P2-1 (verified by reading). Three designs that keep markers visible exist in open source, and none is Discord's box.**
Slate with decorations over plain text (the Slate example). A flat-text editor where the document is the stored string and
everything visible, objects included, is a decoration or a widget over it (Stoat on CodeMirror 6). And nodes rebuilt from the
text on every update, so that the text is the authority and the nodes are only its current drawing (Fluxer on Lexical). In
the second and third, nothing but the text is ever trusted; the website and Discord's box both keep structure in the nodes
and maintain it.

**P2-2 (verified by reading). In the flat-text design there is nothing to normalise and nothing to convert.** Stoat's editor
has no step between stored text and editor state in either direction, no per-line structure, and no rule that could disagree
with another rule about what a line is. Offsets from a parser are offsets into the document. Its cost is that anything Discord
draws by changing the text (hiding a quote's `> `) has to be done as a decoration over text that is still there.

**P2-3 (verified by reading). The two open-source products nearest to the website do not attempt this.** Discohook and Embed
Generator both use a plain text field beside a preview. An editor that styles as you type is something the website has and
they do not, so there is no peer implementation to adopt.

**P2-4 (helper's sweep; rows other than the six above were not read by this session). Nothing ready-made was found.** The
helper's table has 23 candidates. By its reads: the general editor kits (Lexical's markdown shortcuts, Plate, Tiptap, Milkdown)
delete the markers as they are typed and store formatting in nodes, which is a different product; Element, Spacebar, YepCord,
Zulip, Mattermost and Rocket.Chat use a plain or unstyled input; two CodeMirror live-preview editors (Atomic Editor and Ink
MDE, both MIT) style markdown in place for note-taking, one of them hiding markers away from the caret line. No package named
for Discord-style editing exists on npm under the five names tried, and its GitHub searches for such an editor on Slate
returned no repository that is one. Its three code-search zeros are unverified by its own note. So an adoptable editor with
Discord's rules was not found; that is weaker than "does not exist" (G-6).

**P2-5 (verified by reading). Slate itself has moved on from the website's version.** The Slate repository's core is at 0.147.4
(`packages/slate/package.json` in the clone); the website installs 0.123.0. What changed between them was not read.

### Part 3 — Where the website's design differs

**P3-1 (verified by reading both refs). The website's editor, choice by choice.**

| Choice | Discord's box | Website at `origin/master` `5ec0621` | Website at the chain tip `2c0b182` | Flat-text editor (Stoat) |
|---|---|---|---|---|
| Where the structure is kept up | Three passes after each change, normalising suspended (P1-3) | Inside Slate's `normalizeNode`: the root visit re-derives every line's type (`withNormalizeNode.ts` `handleEditor`), each element visit lifts emoji (`handleElement`) | Still `normalizeNode`, plus an override of `editor.normalize` that retypes before Slate's loop starts (`linesAgree`, `retypeLines`), plus whole-line replacement by raw `remove_node` and `insert_node` with Slate's dirty-path tracking switched off for the duration (`rebuildLines`, `rebuilding`, the `getDirtyPaths` override) | Nothing to keep up |
| A code line | A plain line with one attribute | A separate element type `codeBlock`, and `lang` and `startCodeBlock` on every line | The same | A range in the syntax tree |
| A quote line | Type flag; marker deleted and not kept | Type `blockQuote`; marker deleted from the text and kept in a `quotePrefix` attribute so it can be saved back | The same, plus a `carried` flag for a marker continued by Enter | Marker stays in the text |
| Emoji | Inline void, decided per line by the older per-line parser on both formatter paths (P1-4) | Inline void, decided per text node by the site's own rules | Inline void, decided by the published parser's parse of a whole run of adjacent lines (`emojiLift.ts` `emojiLayout` over `runUnit.ts` `unitAround`) | Widget over the source text |
| Colouring | Decoration; per line (older) or per run of lines (native) | Decoration per text node, marker widths inferred from the parse tree (`decorator.tsx`) | Decoration per run of lines from the published parser's lossless tokens (`unitStyles.ts` `styleUnit`), the same arrangement as Discord's native path | Decoration |
| Loading stored text | Split into lines; the same passes do the rest | A second implementation of the structure (`getInitialValue.ts`) beside the normaliser's | Partly shared: `rebuildLines` calls the loader's `buildLines` and `liftLoaded`; `retypeLines` and `resolveLine` remain a second route to the same state | The text is the document |
| Which lines are code | One answer per path (a fence count on the older path, the parse on the native path) | A fence parity count (`codeFence.ts`) | The fence parity count for the structure and the published parser for emoji and colour: two answers | The syntax tree |
| Saved text | Not exact (P1-7) | The quote marker is saved back from `quotePrefix`; an emoji is saved as its parse node's content (`flattenNodeText.ts`), which the plan's S-07 records as the `:name:` form | The quote marker likewise; an emoji is saved as the source text it was typed as (`flattenNodeText.ts`, `source`) | Exact by construction |
| Undo | Whole-document snapshots (P1-8) | `slate-history`, which reverses operations | The same | The framework's own, over text |

The chain has moved the editor toward Discord's box in two places (colouring; retyping ahead of Slate's loop) and away from it
in one (emoji decided across lines). `withNormalizeNode.ts` grew from 240 lines to 600 (`wc -l` on the two exports;
`git diff --numstat origin/master chain/019-slate-formatting-discord-engine`: 414 added, 54 deleted), and 25 of the chain's 96
commits touch it (`git log --oneline origin/master..chain/019-slate-formatting-discord-engine -- <file>` written to a file and
counted with `grep -c .`; `git rev-list --count` for the 96).

**P3-2 (verified by a run). Upkeep inside `normalizeNode` hits Slate's iteration cap; the same upkeep after the change does
not.** A proof-of-concept written for this research (`poc-passes.cjs`, 143 lines, neither Discord's code nor the
website's) drives the Slate core the website installs (0.123.0, loaded read-only from the website's `node_modules`, no React,
no history), offline in a capped scope. It keeps a per-line "inside a code block" attribute in one of two places and types a
third backtick at the end of line 0:

| Where the attribute is kept up | 5 lines | 100 lines | 200 lines | 1,000 lines |
|---|---|---|---|---|
| Inside `normalizeNode`'s root visit | settles | settles | **throws** "Could not completely normalize the editor after 126 iterations" | **throws** the same |
| In a pass after the change, normalising suspended | settles | settles | settles | settles |

Each cell was run with plain `a` lines and with `a🙂` lines; both fills gave the cell's result. The same pass form also settles
`>>> ` typed at the start of line 0 at every size. This is the mechanism plan 019 records as CF-30 (the budget is 42 times the
dirty paths at the start of the loop), reproduced outside the website's code. A second run of the pass applied no operation in
any cell of the pass form.

**P3-3 (verified by a run, same proof-of-concept). With emoji decided per line, a backtick on line 0 touches no other line.**
With a partner backtick ending the last line, typing a backtick at the end of line 0 applied 2 operations and changed 0 other
lines at 5, 100, 200 and 1,000 lines of `a🙂`. In plan 019's chain the same keystroke changes every other line and threw from
100 lines until Fix Round 5 (analysis 019, AN-9, members A1 to A6, read at this write).

**P3-4 (verified by a run, same proof-of-concept). Discord's design does not make the worst keystroke cheap.** Opening a fence
above 1,000 `a🙂` lines turns 999 emoji back into text: 4,000 operations and 672 ms in the proof-of-concept (200 lines: 800
operations, 59 ms; 100 lines: 400, 27 ms). The time is one reading on this box, headless, and says nothing about a mounted
editor; the operation count is the point. While emoji are nodes, a keystroke that changes what a thousand lines are costs
thousands of operations in any Slate design.

**P3-5. Plan 019's defect classes against the design choices.** The classes are a helper's grouping of the record's own rows
(45 defect rows from the plan's batch table, the M6 implementation document's six fix rounds and analysis AN-9; 39 placed in
seven classes, 6 not placed). This session read AN-9 whole and the plan's Decisions Register rows; the rows of the batch table
and the implementation document were not re-read one by one, so the class sizes are the helper's and are marked so.

| Class (helper's count of rows) | The record's mechanism | Does it come from a design choice the others avoid? |
|---|---|---|
| C1. Slate's iteration cap thrown by one keystroke (8) | One edit retypes, or re-lifts the emoji of, every line below inside one normalise loop (plan CF-30; AN-9) | **Yes, from two choices.** (i) Upkeep inside `normalizeNode`. It is in the owner's original design: AN-9's fence and `>>>` members throw at `5ec0621`, and P3-2 reproduces it. Discord's box avoids it by running after the change (P1-3). (ii) Emoji decided from a parse across lines. That is plan 019's own (D-13, by the owner's selection "Agent: engine decides emoji (Recommended)"): AN-9 calls members A1 to A6 "the class the release adds", with 0 lines changed at `5ec0621`. Discord's box decides per line and has no such member (P1-4, P3-3) |
| C2. Cost that grows with the number of lines (7) | Whole-run work repeated per dirty line or per operation | **Partly.** The repetition comes from doing run-wide work in per-element visits; a pass after the change runs once. The worst case is not avoided by Discord's design (P3-4). Only a design where emoji are not nodes avoids it |
| C3. The editor's state differs from a fresh load of the same text (5) | Two builders of the structure (load, edit) and two readings of "this line is code" (fence count, parser) | **Yes.** Discord's box has one builder (P1-6) and, on the native path, takes code lines from the parse that colours them (P1-4). A flat-text editor has no state to differ. The architecture record already names this ("Slate block structure is recognised by hand regexes, not from a lossless parse") |
| C4. A quote marker ends up in the wrong place (5) | The marker lives in the text on one route and in `quotePrefix` on another | **Partly.** It comes from taking the marker out of the text, as Discord's DOM shows, while having to save it back exactly, which Discord does not do (P1-7). A design that copied Discord fully would lose characters; a design that leaves the marker in the text has no placement to get wrong |
| C5. The caret lands in the wrong place (5) | Three separate causes, each where a node's text or an emoji node is swapped | **Partly.** Any design that swaps text for nodes must move the caret. Discord's box does it by one rule for every swap and repairs an invalid selection afterwards (P1-4, P1-9). A flat-text editor maps positions through text changes itself |
| C6. The emoji decision and the colouring read different text (2) | The lift parses emoji as their source; the colouring parses them as a placeholder | **Yes.** It exists because one parse is required to drive both. Discord's box does not require that: objects and colours come from separate parses |
| C7. Colouring (7) | The old decorator inferred marker widths | **Already removed** by the chain's M5, which is Discord's native arrangement (P3-1) |
| Not placed (6) | No cause recorded for four of them | Cannot be attributed (G-4) |

**P3-6 (high-confidence inference). The requirement behind C1's second half is stricter than Discord's own box.** Plan 019's
AC-6.5 has the editor's emoji equal the published parser's emoji over a run of lines, so that the box shows what the preview
shows (read at this write). Discord's box, by the code, turns an emoji into an object from its own line alone, even where the
native colouring on the same screen treats it as inside an inline-code span opened on another line (P1-4, P1-5). So in that one
case Discord's box would show an emoji object inside code colouring. This has not been seen: the test account is on the older
path, where code spans do not cross lines either. Fastest disconfirming test: an account on the native path, typing
`` `a ``, Enter, `` 🙂` `` and reading the second line's nodes.

### Part 4 — Rebuild from the ground up, or keep extending

**P4-1 (restated from the record; the plan and its stage documents are the authority and are still moving). What is left of
plan 019.** M1 to M5 are complete (analysis; the published parser behind the preview and behind the editor's colouring). M6,
the Slate layer, is in its sixth fix round, at website `2c0b182`, not yet handed to code review. After it, as the plan states
them: code review of that round, QA Phase 2 on M6, a critic-gated revision that folds the open rows, UAT, then M7 with devops
and QA Phase 3. Everything left is verification and release of code that already exists, except what a failed gate sends back.

**P4-2 (restated from the record). What "keep extending" has cost and what it leaves open.**

- Code review rejected an M6 fix round on a HIGH finding three times (the headings of rulings blocks "2026-11-24T19:43Z",
  "2026-11-25T05:30Z" and "2026-11-25T09:50Z", read at this write; the blocks' bodies were not).
- By the helper's count, class C1 was worked in four of the six fix rounds and five plan revisions, and class C2 in all six.
- Open at the tip, by the helper's extraction of the record's lists: three C3 rows as stated limits and a handoff
  (`handoff/slate-code-line-emoji-load-normaliser-disagree-2026-11-25.md`), one caret row not probed, and three rows with no
  recorded cause (shared paste failures against a fresh load; paste caret disagreements; a 20-case fuzz difference).
- Not reached by any probe, in AN-9's and the implementation document's words: drag and drop, undo and redo, partial mode,
  the browser's native input path, and keystrokes away from the positions measured. AN-9 expects more C1 members there: "any
  single edit that changes whether an emoji on another line of the same unit lies inside inline code is a member".
- Steering's figure for the chain's spend, not re-derived here: "$735.26 over 8,402 requests" (rulings block
  "2026-11-25T11:38Z").

**P4-3 (high-confidence inference from Parts 1 to 3). What a rebuild would and would not remove.**

| | (a) Rebuild on Discord's model (Slate, flat lines, passes after the change) | (a′) Rebuild as a flat-text editor (the Stoat model) | (b) Keep extending |
|---|---|---|---|
| C1, cap throws | Removed for fences and `>>>` (P3-2). Removed for the inline-code family only if emoji are decided per line, which D-13 and AC-6.5 do not allow today (OQ-1) | Removed: no normalise loop | Fixed for every member found so far; more are expected where no probe has reached (P4-2) |
| C2, cost | Per-line repetition removed; the worst case stays (P3-4) | Removed with the nodes | Fixed to the plan's timing lines; QA's own timed readings still owed |
| C3, state differs from a fresh load | Removed by one builder; a code-line disagreement stays possible only for the emoji decision | Removed | Stays, as stated limits and a handoff |
| C4, quote marker | Stays in some form: the marker must be saved back exactly (ruling "2026-11-23T09:18Z": "lose no character"), which Discord's own design does not do | Removed if the marker may stay visible in the text; if it must be hidden as Discord hides it, that becomes a rendering question (OQ-2) | Fixed for the rows found |
| C5, caret | One rule instead of three sites; not removed | Removed with the node swaps | One row open, not probed |
| Remaining stages of 019 | None removed: they would run again on the new code | None removed | Run once more on the current code |
| New work | A new M6: the Slate layer, its tests, its acceptance criteria, its review and QA | The same, plus a second editor framework in the site, its phone and IME behaviour unmeasured here (G-5), and every Slate-specific piece replaced | None beyond the rounds the gates send back |

Fluxer's model (P2-1) is a third rebuild shape and is not given a column: by its design it would remove C3 and C4 as the
flat-text model does and keep emoji as nodes, so C2's worst case would stay; it was read in one file and not measured, and it
would bring a third framework. Chain tip `rebuildLines` already rebuilds a line from its text for the lines it replaces, which
is the same idea used as one of several routes.

**P4-4 (verified by reading the chain tip). Which of the site's pieces a rebuild would still use.**

- *The component's contract.* The product mounts the editor in two files (`DiscordContentEditor/Desktop.tsx` and `Mobile.tsx`)
  and hands it a string and takes a string back (`initialValue`, `onChange`, `surface`, `partialMarkdown`, `isEmbed`). Outside
  `src/components/SlateEditor/`, one file imports Slate, the type declarations `src/@types/slate.d.ts`
  (`git grep -l` over `src` at the tip). Nothing else in the product knows the node structure.
- *Untouched by either rebuild:* the published parser's adapter (`src/utils/markdown/engine.ts`), the preview
  (`src/utils/markdown/preview.tsx`, which does not reference the editor: `git grep -l SlateEditor` over it exits 1), and the
  41 test files under `src/utils/markdown/` that hold the Discord oracle, the generator and the preview's expected values.
- *Reusable in either rebuild:* the mapping from lossless tokens to per-character styles (`unitStyles.ts` `styleUnit`,
  `unitParse.ts`), a pure function of text; code highlighting (`highlightScan.ts`); the nine component-level test files
  (`SlateEditor.*.test.tsx`), which drive the mounted editor and read the text it reports, and of which none names a
  node-structure field.
- *Replaced by either rebuild:* `withNormalizeNode.ts` (600 lines), `emojiLift.ts` (169), `getInitialValue.ts` (65),
  `quoteMarker.ts`, `codeFence.ts`, and in the flat-text case also `runUnit.ts`, `decorator.tsx`, `renderElementFactory.tsx`,
  `onKeyDown.ts`, `onChange.ts` and `onCopy.ts`. Of the 32 editor test files, 12 name a node-structure field (`quotePrefix`,
  `startCodeBlock`, `carried`, or a block type) and 16 import an internal module; those are rewritten or retired with the
  structure (counted by a script reading each file; the 159 static test call sites in the 32 files were not classified one by
  one).
- *Written against the current mechanism in the plan:* AC-6.5 (the lift reads the run unit and re-decides in the normalise
  pass), AC-6.8 (run-unit builds per keystroke) and AC-6.9 (a line's state equals a fresh load's, and a forced normalise
  applies nothing). A rebuild changes what those criteria measure. Only AC-6.5's text was read here; the other two are
  described from AN-9 and the plan's headings.

**P4-5. Standing rulings that bear on a switch.**

- "2026-11-23T09:18Z", the scope ("lose no character"): rules out Discord's quote handling as it is (P1-7). Any design needs
  the marker kept, in the text or beside it.
- "2026-11-23T09:17Z": Discord's code is a model only. Stoat's and Discohook's code is AGPL-3.0, so it too is a model only
  unless the owner decides otherwise. Slate and CodeMirror 6 themselves are MIT (Slate's `License.md` read; CodeMirror's
  licence was not read here).
- "2026-11-23T13:09Z" and "15:23Z": the standard and the parser. Neither design changes them; both rebuilds keep the parser
  and its tests.
- "2026-11-23T16:29Z" (D-13, emoji come from the parser): the one ruling that conflicts with copying Discord's box (OQ-1).
- "2026-11-23T17:04Z" (style across line breaks): met by decorations in every design, with no change to other lines' nodes
  (P1-5).
- Plan 019 D-19 (the preview and the editor ship in one release, once M6 is done): a rebuild inside 019 holds the finished
  preview back with it; a rebuild after 019's release does not, and leaves 019's editor in production meanwhile (OQ-3).
- `architecture/website.md` W-3 (one component tree for editing and preview): the editor is the edit-mode leaf of that tree,
  so replacing it stays inside W-3. Whether the read-only side needs any change under a rebuild is not concluded here (OQ-4).

## System Weaknesses

Each is a mechanism that can produce the observed defects again, whichever path is taken.

1. **Whole-document work inside Slate's per-node normalise loop.** Risk: the loop's budget is fixed when it starts, so work
   that dirties more nodes than the edit did can exhaust it (P3-2). Detection: a probe that applies one keystroke to a message
   of several hundred lines and reads the throw, which the chain's suite now has for the members found.
2. **More than one builder of the same structure.** Risk: the builders disagree on some input and the editor's state depends on
   how the text arrived (C3, C4). Detection: the chain's fresh-load comparison, over texts that keystrokes produce and not only
   texts a corpus lists (AN-9 B1 found its 12 only there).
3. **More than one reading of "inside code".** Risk: an emoji is an object where the preview shows text, or the reverse.
   Detection: compare the editor's emoji set with the parser's over fences that are escaped or sit inside inline code.
4. **Objects as nodes when one keystroke can change a thousand of them.** Risk: cost, in any Slate design (P3-4).
5. **Undo by reversing operations, under a normaliser that issues its own.** Not examined here or, by its own lists, by the
   chain (G-3).

## Instrumentation Gaps

- **Normal:** none proposed. The editor has no always-on signal for a normalise throw in production; whether it should is the
  planner's and the owner's question, not answered here.
- **Debug:** an operation count per keystroke by type (the proof-of-concept's and AN-9's instrument) is what separated
  "changes other lines" from "does not" in every finding above. It exists only in probes.

## Open Questions

The owner answered on 2026-11-25 (effort rulings block "2026-11-25T15:25Z" in `steering/fixer-queue-2026-11-21-rulings.md`, read
whole at this write). Each question's argument is in this document's first committed revision (record `0f8b22cf`).

- OQ-1 RESOLVED — for a rebuild, an emoji becomes an object from its own line alone: his selection "Agent: per line, like
  Discord (Recommended)". It binds a rebuild only; D-13 stands for the current editor. Rulings block "2026-11-25T15:25Z".
- OQ-2 RESOLVED — for a rebuild, a quote line's marker is hidden, the site still storing it beside the text: his selection
  "Agent: hidden, like Discord (Recommended)". It binds a rebuild only. Same block.
- OQ-3 RESOLVED — plan 019 does not carry a rebuild. His words: "019 will not carry the new work." Any rebuild is its own
  effort, and 019 goes to its release on the current editor under D-19; whether a rebuild happens at all he has not said
  (the reading is `steering-hooks-fixer`'s). Rulings block "2026-11-25T15:28Z".
- OQ-4 ROUTED — to `planner-019`'s sizing of a rebuild, by `steering-hooks-fixer`'s message to this session after that block.
  The block records the commission and does not name OQ-4, and no sizing document exists yet, so the item's text stays here
  until one does: whether the colouring and the preview need any change under a rebuild is not concluded. The preview does not
  reference the editor (P4-4) and the colouring's mapping is a pure function, but the colouring's line-to-offset step
  (`decorator.tsx`, `runUnit.ts`) belongs to the current line structure; the scope statement's sibling surfaces are typing,
  paste, load and save, all of which a rebuild replaces.

## Remaining Gaps

| # | Unknown | Why not resolved | What would close it |
|---|---|---|---|
| G-1 | Discord's native path, running | The test account is on the older path; the native path is read from code only | An account in the native experiment; read the box's nodes for a cross-line bold, a cross-line inline code with an emoji, and a fence |
| G-2 | Whether Discord's box saves `   > q` and `>>> q` as `> q` | Read in the serialiser, not run (P1-7) | Type both in the test server's box and read the draft text, or send to the test channel and read the stored content |
| G-3 | How `slate-history` behaves under passes that run after a change | Discord uses its own snapshot history (P1-8); the proof-of-concept has no history. Since the first revision, steering's refutation helper reports that three undos under `slate-history` 0.113.1 after the after-change pass leave every line right (rulings block "2026-11-25T15:25Z", Premises); that run was not made or read here, and three undos are not the keystroke set | The proof-of-concept with `withHistory`, undoing each keystroke of P3-2 |
| G-4 | The cause of the three open rows with none recorded (paste against a fresh load; paste caret; the fuzz's 20 cases) | Not probed by the chain; out of this question's reach without running the chain's suite, which the brief forbids in the shared tree | The chain's own probes on those rows |
| G-5 | A flat-text editor's behaviour on the site's phones, with IME, with the emoji picker and in partial mode | No candidate was run | A throwaway mount of the candidate beside the current editor, walked on the devices the site supports |
| G-6 | Whether an adoptable open-source editor with Discord's rules exists that the sweep missed | The sweep is a helper's, over GitHub's and npm's search, with three code searches it could not verify; 17 of its 23 rows were not read here | A second sweep by a different route (code search for `-# ` subtext and `\|\|` spoiler handling inside editor plugins) |
| G-10 | What Slate changed between 0.123.0 and 0.147.4, and whether any of it bears on the iteration cap or on decorations | Not read | The Slate changelog over that range |
| G-7 | Lazily loaded Discord scripts | Only the 364 preloaded scripts were fetched | Fetch the chunk map and search it for a second caller of the inline-object pass |
| G-8 | The size of either rebuild | Sizing is planning | ROUTED — `planner-019` is commissioned to size a rebuild on Discord's model (rulings block "2026-11-25T15:25Z", "Acted") |
| G-9 | Class sizes in P3-5 and counts in P4-2 | The helper's enumeration over the plan and the implementation document, not re-counted here | Re-count from the plan's batch table |

## Recommendations (investigation only)

The smallest set of reads that would settle the choice fastest:

1. Done: OQ-1 to OQ-3 went to the owner through steering and were answered (Open Questions).
2. Close G-3 with the existing proof-of-concept plus `withHistory`: one short run.
3. Close G-1 and G-2 on the test server if an account on the native path can be had.
4. If the flat-text model is of interest, G-5 before anything else: its unknowns are all on devices.

## Scratch instruments (perishable)

Under this session's scratch directory,
`/tmp/claude-1000/-usr-local-bin-hooks/09282d4d-6df4-4d63-b2a1-4c43b88db9a1/scratchpad/`, and not part of the record; a reboot
removes them. None of the names below is a path in this repository. Its tools folder holds `fetch-discord.sh` (fetches the
page and its scripts), `mods.py` (the earlier research's module indexer), which together remake Part 1's reading copy, and
`poc-passes.cjs`, the script of Appendix B, whose raw output is `poc-passes.out`. Its helpers folder holds
`019-defect-classes.md`, the defect extraction P3-5 uses, remade from the plan, the M6 implementation document and AN-9, and
`alternatives-table.md`, the survey helper's 23-row table with its search log. The candidates' clones and
fetched files, the copies of Discord's scripts and the two website exports are deleted at this run's end; each is fetched
again from its public source or by `git archive`.

## Appendix A — the proof-of-concept's readings

`poc-passes.cjs`, run once on 2026-11-25 against `slate` 0.123.0. "In normalise" keeps the code-line attribute inside
`normalizeNode`'s root visit; "after change" runs three passes (code-line attribute; `>>> ` type flip; per-line emoji objects)
after the edit with normalising suspended. "Other lines changed" compares each line's type, code flag and emoji count before
and after, line 0 left out. Times are single readings.

| Edit on line 0 | Mode | Fill | Lines | Throw | Other lines changed | Operations | ms |
|---|---|---|---|---|---|---|---|
| third backtick at the end | in normalise | `a` | 5 / 100 / 200 / 1,000 | no / no / **yes** / **yes** | 4 / 99 / 199 / 999 | 8 / 103 / 203 / 1,003 | 4.1 / 4.6 / 4.4 / 24.5 |
| third backtick at the end | in normalise | `a🙂` | 5 / 100 / 200 / 1,000 | no / no / **yes** / **yes** | 4 / 99 / 199 / 999 | 8 / 103 / 203 / 1,003 | 0.7 / 3.8 / 3.9 / 19.6 |
| third backtick at the end | after change | `a` | 5 / 100 / 200 / 1,000 | no at each | 4 / 99 / 199 / 999 | 8 / 103 / 203 / 1,003 | 1.2 / 3.8 / 5.3 / 36.8 |
| third backtick at the end | after change | `a🙂` | 5 / 100 / 200 / 1,000 | no at each | 4 / 99 / 199 / 999 | 20 / 400 / 800 / 4,000 | 4.8 / 27.2 / 58.8 / 672.1 |
| `>>> ` typed at the start | after change | `a` | 5 / 100 / 200 / 1,000 | no at each | 4 / 99 / 199 / 999 | 10 / 105 / 205 / 1,005 | 1.6 / 4.0 / 4.3 / 30.1 |
| `>>> ` typed at the start | after change | `a🙂` | 5 / 100 / 200 / 1,000 | no at each | 4 / 99 / 199 / 999 | 10 / 105 / 205 / 1,005 | 0.8 / 3.2 / 4.7 / 25.0 |
| backtick at the end, a partner backtick ending the last line | after change | `a` | 5 / 100 / 200 / 1,000 | no at each | 0 at each | 2 at each | 0.4 / 0.4 / 0.5 / 2.7 |
| backtick at the end, a partner backtick ending the last line | after change | `a🙂` | 5 / 100 / 200 / 1,000 | no at each | 0 at each | 2 at each | 0.3 / 1.0 / 1.6 / 3.8 |

The throw's text in every throwing cell is "Could not completely normalize the editor after 126 iterations". In a throwing
cell the operations listed are those applied before the throw. What the script does not model: React, the DOM, undo history,
the website's quote marker storage, or Discord's parser; its emoji test is a single character and its inline-code test is
backtick pairs on one line.

## Appendix B — the proof-of-concept script

Written for this research. It is neither Discord's code nor the website's. Run as `node poc-passes.cjs <path to slate/dist/index.js>`.

```js
// Proof-of-concept, written for this research (not Discord's code, not the website's).
// Question: on the Slate version the website installs, does whole-document upkeep
//   (a) done inside normalizeNode's root visit hit Slate's iteration cap, and
//   (b) done in a pass after the change, with normalising suspended, not hit it?
// And: with emoji decided per line, does a backtick on line 0 touch any other line?
// usage: node poc-passes.cjs <path-to-slate-dist-index.js>
const { createEditor, Editor, Transforms, Text, Element } = require(process.argv[2]);

const EMOJI = /🙂/g;
const fenceCount = (text) => text.split('```').length - 1;
const lineText = (line) => line.children.map((c) => (Text.isText(c) ? c.text : c.source)).join('');
const docText = (editor) => editor.children.map(lineText).join('\n');

function make(n, fill, mode) {
  const editor = createEditor();
  const { isInline, isVoid, normalizeNode, apply } = editor;
  editor.isInline = (el) => el.type === 'emoji' || isInline(el);
  editor.isVoid = (el) => el.type === 'emoji' || isVoid(el);
  editor.ops = [];
  editor.apply = (op) => { editor.ops.push(op); apply(op); };
  editor.children = Array.from({ length: n }, () => ({ type: 'line', children: [{ text: fill }] }));
  if (mode === 'in-normalize') {
    editor.normalizeNode = (entry) => {
      if (Editor.isEditor(entry[0])) { if (codeState(editor)) return; }
      normalizeNode(entry);
    };
  }
  return editor;
}

// Pass 1: mark each line as inside a code block or not. Attribute only; text and type untouched.
function codeState(editor) {
  let open = false;
  let changed = false;
  editor.children.forEach((line, index) => {
    const inCode = open && fenceCount(lineText(line)) === 0;
    if ((line.inCode ?? false) !== inCode) {
      Transforms.setNodes(editor, { inCode }, { at: [index] });
      changed = true;
    }
    if (fenceCount(lineText(line)) % 2 === 1) open = !open;
  });
  return changed;
}

// Pass 2: a line starting with ">>> " quotes itself and every line below; type flip only.
function quotes(editor) {
  let multi = false;
  editor.children.forEach((line, index) => {
    const first = line.children[0];
    const opens = !line.inCode && Text.isText(first) && /^ *>>> /.test(first.text);
    const quoted = !line.inCode && (multi || opens || line.type === 'quote');
    multi = multi || opens;
    const type = quoted ? 'quote' : 'line';
    if (line.type !== type) Transforms.setNodes(editor, { type }, { at: [index] });
  });
}

// Pass 3: emoji decided per line, from that line's own text and its code flag.
function emoji(editor) {
  for (let index = 0; index < editor.children.length; index += 1) {
    let line = editor.children[index];
    if (line.inCode) {
      for (let c = line.children.length - 1; c >= 0; c -= 1) {
        const child = line.children[c];
        if (Element.isElement(child)) {
          const at = Editor.before(editor, [index, c]) ?? Editor.start(editor, [index]);
          Transforms.removeNodes(editor, { at: [index, c], voids: true });
          Transforms.insertText(editor, child.source, { at });
        }
      }
      continue;
    }
    const text = lineText(line);
    const ticks = [];
    for (let i = 0; i < text.length; i += 1) if (text[i] === '`') ticks.push(i);
    const inInlineCode = (offset) => {
      for (let t = 0; t + 1 < ticks.length; t += 2) if (offset > ticks[t] && offset < ticks[t + 1]) return true;
      return false;
    };
    for (let c = line.children.length - 1; c >= 0; c -= 1) {
      const child = line.children[c];
      if (!Text.isText(child)) continue;
      const before = line.children.slice(0, c).map((x) => (Text.isText(x) ? x.text : x.source)).join('').length;
      const found = [...child.text.matchAll(EMOJI)].filter((m) => !inInlineCode(before + m.index)).reverse();
      for (const m of found) {
        const range = { anchor: { path: [index, c], offset: m.index }, focus: { path: [index, c], offset: m.index + m[0].length } };
        Transforms.delete(editor, { at: range });
        Transforms.insertNodes(editor, { type: 'emoji', source: m[0], children: [{ text: '' }] }, { at: range.anchor });
      }
    }
    line = editor.children[index];
  }
}

function settle(editor) {
  Editor.withoutNormalizing(editor, () => { codeState(editor); quotes(editor); emoji(editor); });
}

const otherLinesState = (editor) => editor.children.slice(1).map((l) => JSON.stringify([l.type, l.inCode ?? false, l.children.filter(Element.isElement).length]));

function run(label, n, fill, mode, edit) {
  const editor = make(n, fill, mode);
  if (mode === 'after-change') settle(editor); else Editor.normalize(editor, { force: true });
  const before = otherLinesState(editor);
  editor.ops = [];
  let threw = null;
  const started = process.hrtime.bigint();
  try {
    edit(editor);
    if (mode === 'after-change') settle(editor);
  } catch (error) { threw = String(error.message).slice(0, 70); }
  const ms = Number(process.hrtime.bigint() - started) / 1e6;
  const after = otherLinesState(editor);
  const changed = after.filter((s, i) => s !== before[i]).length;
  const byType = {};
  editor.ops.forEach((op) => { byType[op.type] = (byType[op.type] ?? 0) + 1; });
  let again = 0;
  if (!threw && mode === 'after-change') { editor.ops = []; settle(editor); again = editor.ops.length; }
  console.log(JSON.stringify({ label, mode, n, fill, threw, otherLinesChanged: changed, ops: editor.ops.length && !again ? undefined : undefined, opCount: Object.values(byType).reduce((a, b) => a + b, 0), byType, secondPassOps: again, ms: Math.round(ms * 10) / 10 }));
  return editor;
}

const endOfLine0 = (editor) => Editor.end(editor, [0]);
const typeAtEnd0 = (chars) => (editor) => { Transforms.select(editor, endOfLine0(editor)); for (const ch of chars) editor.insertText(ch); };
const typeAtStart0 = (chars) => (editor) => { Transforms.select(editor, Editor.start(editor, [0])); for (const ch of chars) editor.insertText(ch); };

for (const n of [5, 100, 200, 1000]) {
  for (const fill of ['a', 'a🙂']) {
    // Control for (a): the fence state kept inside normalizeNode's root visit.
    run('third backtick typed at end of line 0 (opens a fence)', n, fill, 'in-normalize', typeAtEnd0('```'));
    // (b): the same upkeep in a pass after the change.
    run('third backtick typed at end of line 0 (opens a fence)', n, fill, 'after-change', typeAtEnd0('```'));
    run('">>> " typed at start of line 0', n, fill, 'after-change', typeAtStart0('>>> '));
    // Inline-code backtick on line 0 with a partner backtick ending the last line.
    run('backtick at end of line 0, partner on last line', n, fill, 'after-change', (editor) => {
      Transforms.insertText(editor, '`', { at: Editor.end(editor, [n - 1]) });
      settle(editor);
      editor.ops = [];
      typeAtEnd0('`')(editor);
    });
  }
}
```
