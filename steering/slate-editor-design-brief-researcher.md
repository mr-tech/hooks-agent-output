Duties negated: none.

From `steering-hooks-fixer`. You are `researcher-slate-editor-design`. Run a research pass per your definition. Your document is ID-less,
under `/usr/local/bin/hooks/agent-output/research/`, named for the question. Read
`/usr/local/bin/hooks/agent-output/steering/slate-formatting-brief-common.md` for the effort's rulings by pointer; you are outside its
stage set, and nothing in this brief makes you a stage of plan 019.

## Why

His question and his choice are in `/usr/local/bin/hooks/agent-output/steering/fixer-queue-2026-11-21-rulings.md`, block
"2026-11-25T11:38Z". In his words: "I really wasn't referencing anything specific other than just Discord's DOM output when creating
functions like with normalization." Plan 019 (`planning/019-slate-formatting-discord-engine.md`) is fixing the website's Slate editor to
match Discord, and much of its later work has gone into crashes and cross-line rewrites in the editor's own normalising layer. He wants to
know whether a better design exists, and whether adopting it would cut the remaining work. 019 keeps going while you research.

## The question

Is there a better design for the website's message editor than its hand-written Slate structure and normalisation, and what would
adopting it change for the work left in plan 019?
1. **How Discord's own message box is built.** It is a Slate editor (the oracle research, below, V-21). Read its design from Discord's
   served web client: which constructs are Slate nodes (quote, code line, inline objects for emoji, mentions, timestamps) and which are
   decorations or leaves; what its normalisers do and when they run; how it restyles a run across lines without rewriting other lines;
   how it moves between stored text and Slate nodes. The oracle research located the modules by content predicate (rule-to-Slate 339200,
   native token-to-decoration 818948; ids may have moved, so find them by content). Discord's client code is proprietary: study it as a
   model and describe it in your own words, never copy it into the record or the website (block "2026-11-23T09:17Z": tests only, never
   shipped).
2. **What else exists.** Open-source editors that already do Discord-style markdown-as-you-type, in Slate or another framework, with
   source, licence, last activity, and how close each comes to Discord's box. Evidence over claims.
3. **Where the website's design differs.** Compare (1) and (2) with the website's editor (`src/components/SlateEditor/**`,
   `src/utils/markdown/**`) on the chain branch `chain/019-slate-formatting-discord-engine` and at `origin/master`. For each defect class
   plan 019 has worked (the plan's Decisions Register, the M6 implementation document's fix rounds, analysis AN-9 under
   `verification/019/analysis/an9/`), say whether it comes from a design choice that Discord's box or an alternative avoids.
4. **What a switch would change**, as findings a planner could use: what of 019's remaining work it removes, what it adds, and what in the
   owner's standing rulings bears on it (blocks "2026-11-23T13:09Z", "15:23Z", "17:04Z"). No plan and no solution; Recommendations are
   investigation only.

## Prior work

`/usr/local/bin/hooks/agent-output/research/closed/slate-formatting-discord-oracle-2026-11-23.md` (closed). Its § Findings V-11, V-21, V-22
and § Scratch instruments say how Discord's bundle was fetched and read. Do not repeat its oracle question.

## Bounds

- Read-only on `/usr/local/bin/hooks/website`. The tree is the implementer's, mid fix round: never build, install, test or switch branches
  in it. Read code with `git -C /usr/local/bin/hooks/website show <ref>:<path>` or an export under your scratch directory.
- Any run is capped: a `systemd-run --user --scope -p MemoryMax=4G` scope, one worker, `unshare -rn` where no network is needed. The box
  has had out-of-memory kills today.
- Never message or brief a plan 019 session, and never write to 019's documents. Anything for 019 comes to `steering-hooks-fixer`.
- Discord: the test server only (guild `1566742402180456559`; `discord-test-browser` skill). Nothing goes to any other server, DM or
  person (`/home/dev/.claude/CLAUDE.md`, "Outbound messages", quoted: "A message that reaches a real person is mine to send."). Never
  read a `.env*` value. Never use the bare word `none` in a command.
- A call stopped by a control: stop, message `steering-hooks-fixer`, and never re-issue it in another form. The record says only "not
  completed".
- Record documents are written with Write/Edit, never a shell heredoc or `sed`.

## Routing

Your document goes to `steering-hooks-fixer` by SendMessage once it is committed; this thread puts what it means to the owner.
Owner-needing items also go to `steering-hooks-fixer`. If you put a question to him yourself, use his standard: context first, then the
decision, in plain English, with no commit IDs (block "2026-11-21T18:37Z").
