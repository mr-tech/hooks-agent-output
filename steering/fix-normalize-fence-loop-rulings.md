# Rulings — fixer chain `fix-normalize-fence-loop` (website editor: a quote plus a bare code fence makes every edit throw)

Steered by `steering-hooks`, item 9 (R-H2) of effort `fixer-queue-2026-11-21` (effort rulings blocks "2026-11-21T05:38Z" item 6,
"05:50Z"). tmux category: `fix-normalize-fence-loop`. Source: `research/codebase-bug-evaluation-2026-11-08.md:169`.

## 2026-11-22T03:41 — selection: fix it (in queue order)

Selection prompt put 03:3xZ, answered 03:4xZ (ledger `steering/selection-ledger/2026-11-22.md`, this thread's block of that minute);
wording this thread's, in his 18:37Z form. Premises: the sweep `verification/fix-normalize-fence-loop/scoping/sweep.md` (`a125465`, at
website `132a7ab`, read): `src/components/SlateEditor/utils/withNormalizeNode.ts` compares `child.lang !== currentLang` (L33) where a bare
fence leaves `currentLang` `null` (L64 regex `+`) while `getInitialValue.ts:87-88` (regex `*`) sets `''`; the quote branch re-inserts
the line's text each pass (L45-49); one call site `SlateEditor/index.tsx:61`; surfaces without `partialMarkdown`: `ContentBody.tsx:21`,
`Embed.tsx:82`, `EmbedField.tsx:92`, `TextDisplayEditor.tsx:26`; no test covers it. The refutation helper (export, run, real parser):
`> a` + bare fence + `foo` — forced normalise threw "Could not completely normalize the editor after 378 iterations!"; inserting one
character threw after 126 iterations; text unchanged apart from the typed character; controls (```` ```js ````, no quote line, bare fence
alone) settle with 0 operations; mounted `SlateEditor` (jsdom): typing throws the same error and `onChange` is not called — the typed
character never reaches the parent state. Not checked: React's handling of the throw in a browser; a real `beforeinput` event.
- Q: A "Agent: fix it (Recommended)" — "Text with a quote and a no-language code block can be edited normally in every affected box, with
  tests for that case and the working ones. Queued after the other website fixes, released the same way."; B "Agent: fix it first"; C
  "Agent: don't fix". Chosen: **A** (queue order kept).

Determination, stage set and branch cut: when the website tree is free (after chains 7, 8, 9a, 9b), from that tip.

## 2026-11-23T08:53Z — re-sweep at 0411d3b; selection prompt put: one chain with 9f, or alone

Steered by `steering-hooks-fixer` (renamed from `steering-hooks`). The tree is free: website `master` `0411d3b` after the emoji chain
(effort block 2026-11-23T08:48Z); coordinator's go for the switch received 08:49Z. Re-sweep (helper, export of `0411d3b`, run):
`verification/fix-normalize-fence-loop/scoping/sweep-0411d3b.md`. Every limb holds: forced normalise throws after 378 iterations and one
typed character after 126; the controls settle. Limbs: `withNormalizeNode.ts:66` (`+` leaves a bare fence's `currentLang` null), `:35`
compare against `getInitialValue.ts:96`'s `''`, `:49-51` quote re-insert each pass. Refutation helper (separate export, run; report
returned as text, kept at `verification/fix-normalize-fence-loop/scoping/refutation-0411d3b.md`): claim 1 HOLDS (insert at the end of the
opening fence line settles, every other position tested throws); 9f's claim (`>>> a\nb` → `> a\n> b` on load and save) HOLDS. The two
share an input family, not lines: 9c `withNormalizeNode.ts:35,66-71,49-50`; 9f `getInitialValue.ts:32-35,47`, `flattenNodeText.ts:13`;
a 9f fix (a stored `>>>` marker) changes what `handleEditor` reads at `withNormalizeNode.ts:24,29`, so it could change 9c's loop for
`>>>` inputs (read from code, not run). Bundling moves 9f ahead of 9d and 9e: queue order, his.

## 2026-11-23T08:55Z — selection: one fix for both; determination and stage set

Selection prompt put 08:5xZ, answered 08:54Z (ledger `steering/selection-ledger/2026-11-23.md`, block "2026-11-23T08:54Z —
steering-hooks-fixer"); wording this thread's. Options: A "Agent: one fix for both (Recommended)" — "One fix, one review and one release
covers both quote problems, tested together so neither undoes the other. The timestamp-edit and image-link fixes each move back one
place."; B "Agent: loop fix alone" — "Keeps your order: the loop fix now, then the timestamp edit, the image link, then the quote fix. The
loop fix gets re-tested when the quote fix lands later." Chosen by selection: **A**. 9f `fix-blockquote-rewrite` rides this chain (its
rulings file's block 04:49 is its source: his "Agent: fix it"); order now 9c+9f, 9d, 9e (effort file).
**Determination.** Shape: two defects, causes proven by run (re-sweep and refutation above; 9f's at 132a7ab in
`verification/fix-blockquote-rewrite/scoping/sweep.md`, its mechanism re-run at `0411d3b`). Blast radius: every full-markdown editor
(`ContentBody.tsx:21`, `Embed.tsx:82`, `EmbedField.tsx:92`, `TextDisplayEditor.tsx`) loops on a quote plus a bare fence, and typing fails;
every editor rewrites `>>> ` on open (partial ones, `EmbedField.tsx:75` and `EmbedTitle.tsx:93`, delete the marker). End step: website
`master`, Vercel production. `release-move.js --dry-run` on `master` `0411d3b` (08:5xZ): every check passed; no workflows, no sibling
serving refs. Pipeline: the `fixer` agent.
**Scope statement** (website, from `0411d3b`): (1) an editor value holding a quote line and a code fence with no language settles on
normalise and accepts a typed character at every position, in every full-markdown editor; the fence's language reads the same (`''` vs
null) in load and normalise, and the quote branch writes nothing when the text is unchanged; (2) loading a stored message and saving it
with no edit returns its text unchanged where it holds `>>> ` (`>>> a\nb`, `>>> a`, `>>> a\n\nb`), in full and partial editors, and opening
or leaving a box writes no changed text (his 9f answer: "Opening and leaving a box never changes its text: >>> quotes are kept as written
everywhere, including titles and field names"); (3) together, `>>> a` + bare fence settles, and the dead `>>> ` test at
`withNormalizeNode.ts:29` is made live or removed (fix everything). Tests per Test Conventions drive the real parser, `getInitialValue`,
`withNormalizeNode` and `flattenNodeText`, with literal expectations, red first. Write set: `withNormalizeNode.ts`, `getInitialValue.ts`,
`flattenNodeText.ts`, the Slate custom-types file where a node carries a `>>>` marker, any helper beside them, new tests, the fixer's
document and `verification/fix-normalize-fence-loop/`. **Not covered by the sweeps:** React's handling of the throw in a browser, a real
`beforeinput`, Discord's rendering of `>>>` vs `>` (the site's preview renders both as one quote, read from code). **Stage set:**
`fixer-fix-normalize-fence-loop` → `code-reviewer-fix-normalize-fence-loop` (under 20 production lines: the reviewer also runs the suite,
typecheck, red test) → QA Phase 2 at 20 or more → devops for website `master` (his word). No plan, critic, Phase 1 or UAT. Usage:
weekly_all 3% (live, 08:49Z).

## 2026-11-23T09:40Z — `codeFence.ts` is inside the write set; QA Phase 2 started

The code review approved at `61e5dfe` (record `1e93f428`, Round 1 sub-entry 1b) and asked this thread to record whether the new file
`src/components/SlateEditor/utils/codeFence.ts` is inside the determination. It is: the write set above names "any helper beside them",
and the file sits in `utils/` beside `withNormalizeNode.ts`, `getInitialValue.ts` and `flattenNodeText.ts` (`git diff --name-status
0411d3b 61e5dfe`, read this turn). This thread's ruling; no re-scope. Production lines are 68 (`git diff --numstat 0411d3b 61e5dfe`:
slate.d.ts 4, codeFence.ts 20, flattenNodeText.ts 1, getInitialValue.ts 11, withNormalizeNode.ts 32), so QA Phase 2 runs. Usage:
weekly_all 6% (live).

## 2026-11-23T15:37Z — test-case scoring for the batch retrospective `fixes-2026-11-23-steering-hooks-fixer-2`

Commit scored: website `af3d95a` (the release tip). Case list from a clean export: 2,696 executed cases (vitest exit 0, `numTotalTests`
2696), 62 marked in the three test files the chain changed (`git diff --name-status 0411d3b af3d95a`, `.test.ts[x]`): SlateEditor
opening-writes-stored-text 11, getInitialValue stored-text-loads-unchanged 20, withNormalizeNode quote-and-fence-lines-settle 31. One
deweeder unit. Table: `verification/fixes-2026-11-23-steering-hooks-fixer-2/deweed/website-1.tsv`. **Scored 62; 28 below 7** (45%),
counted by this thread from the table (python `csv`). Every covering cell names a scored case of 7 or more (0 unscored, 0 below 7). Nothing
is deleted on it. The export is removed.

## 2026-11-23T15:49Z — chain close-out

Released: website `master` `0411d3b` → `af3d95a` at 15:24:07Z on his release approval in `devops-fix-normalize-fence-loop`'s session;
Vercel production deployment 567m70ejp Ready and aliased to hooks.gg; post-deploy walk PASS (devops's report; its record
`deployment/closed/fix-normalize-fence-loop-deployment.md`, commit `a9c5ea0e`). Every chain document is Released in `closed/`; the
reviewer corrected its stamp row (`0cfefc94`). Sessions stopped: fixer, QA, devops (15:3xZ) and code reviewer (15:34Z).
Carriers read: S-29 and QAF-4 go to plan 019 M6 (effort block 15:49Z); the untraced `>>>` server-side question becomes a plan 019 row
(same block). No handoffs were created or answered by the chain; QA's Phase 3 open-handoff sweep (`bc891df5`) fired none. No
architecture or roadmap entry is owed. `OWNER-QUEUE.md` is unchanged by this chain (its two Vercel reads stand).
Retrospective: `retrospectives/fixes-2026-11-23-steering-hooks-fixer-2-retrospective.md` (`b990c587`, Active), batch of one (a REJECTED
round). Box: no Docker image or `/var/tmp` capture is this chain's (mariadb and postgres images predate it). Scratch deleted:
this thread's `sweep-9c` (10,092 KB) and `refute-9cf` (10,100 KB) and `deweed-fence` (1,640 KB), `ls -d` failing after. Kept: `inv-run`,
`inv-slate`, `repro2.out` and `link-out*.json`, which the Slate inventory cites. The exited chain sessions' own scratch under the website
cwd was not deleted, because their session ids were not established.
