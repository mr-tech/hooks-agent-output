---
ID: n/a
Origin: fix-normalize-fence-loop
UUID: a0de90fd
Status: Active
Status-Detail: "Handed off at website d3b98cf for code review; QA Phase 2 is owed after it (32 production lines added)."
Handoff-At: d3b98cf — repos=website
Origin-Chain: none
---

# fix-normalize-fence-loop — implementation

## Scope statement

From `steering/fix-normalize-fence-loop-rulings.md`, block "2026-11-23T08:55Z" (the owner chose "Agent: one fix for both" by selection;
9f `fix-blockquote-rewrite` rides this chain, its source `steering/fix-blockquote-rewrite-rulings.md` block "2026-11-22T04:49"). The route
is the fixer agent, then the code reviewer, then QA Phase 2 at 20 or more production lines, then devops for website `master`. The scope
statement, quoted:

> (1) an editor value holding a quote line and a code fence with no language settles on normalise and accepts a typed character at every
> position, in every full-markdown editor; the fence's language reads the same (`''` vs null) in load and normalise, and the quote branch
> writes nothing when the text is unchanged; (2) loading a stored message and saving it with no edit returns its text unchanged where it
> holds `>>> ` (`>>> a\nb`, `>>> a`, `>>> a\n\nb`), in full and partial editors, and opening or leaving a box writes no changed text (his
> 9f answer: "Opening and leaving a box never changes its text: >>> quotes are kept as written everywhere, including titles and field
> names"); (3) together, `>>> a` + bare fence settles, and the dead `>>> ` test at `withNormalizeNode.ts:29` is made live or removed (fix
> everything).

Write set: `withNormalizeNode.ts`, `getInitialValue.ts`, `flattenNodeText.ts`, the Slate custom-types file, new tests, this document and
`verification/fix-normalize-fence-loop/`.

## Entry Conditions

| Condition | Value |
|---|---|
| Scoping determination | `steering/fix-normalize-fence-loop-rulings.md` block "2026-11-23T08:55Z", relayed by brief `steering/fix-normalize-fence-loop-brief-fixer.md` (with `-brief-common.md`) |
| Bounded scope statement | Quoted above. Not to touch: anything outside the write set |
| Fix branch | website `chain/fix-normalize-fence-loop`, checked out by steering at `0411d3b` (`git branch --show-current` read first, 08:56Z) |
| Record on the mechanism | No `architecture/` entry names these files (brief-common, "Architecture"). `research/codebase-bug-evaluation-2026-11-08.md:169,175` (rows H-2 and H-8), the sweeps `verification/fix-normalize-fence-loop/scoping/sweep.md`, `sweep-0411d3b.md`, `verification/fix-blockquote-rewrite/scoping/sweep.md` and the refutation `verification/fix-normalize-fence-loop/scoping/refutation-0411d3b.md` were read at the file |

## Diagnosis

**Cause 1, the loop.** In `withNormalizeNode.ts` at `0411d3b`, `handleEditor` reads a fence's language with `/```([A-Za-z0-9-]+)$/` (L66),
so a fence with no language leaves `currentLang` null. `getInitialValue.ts:96` uses `*` and stores `''`. The check at L35
(`child.lang !== currentLang`) is therefore always true for a bare fence's code lines, and `handleEditor(update=true)` runs on every
normalise pass. The update branch's `Transforms.insertText` (L49-51) rewrites every quote line with text equal to its own, and each
rewrite dirties the editor again. Either limb alone ends the loop. Instrument: the red run below (forced normalise throws after 378
iterations, and 462 with two quote lines; a typed character throws after 126). The controls: M1 and M2 (each limb removed alone) survive the
suite, and M17 (both removed together) kills 12 cases.

**Cause 2, the `>>> ` rewrite.** `getInitialValue.ts:32-33` drops the `>>> ` marker and keeps no record of it. `:47` drops `> `. Then
`flattenNodeText.ts:13` writes `> ` before every quote line. So `>>> a\nb` saves as `> a\n> b`. In single-line fields
(`partialMarkdown`), L32-33 are not gated, so the marker is deleted and `>>> a` saves as `a`. Also not gated: a `>>> ` line inside a code
block opens a quote and loses its marker (`` ```\n>>> a\n``` `` loads as `` ```\na\n``` ``). That is a site of the statement's property, read
from code and turned red below. Instrument: the red run below (`>>> a\nb` → `> a\n> b`; single-line `>>> a` → `a`).

**Cause 3, the interaction.** `handleEditor` reads `flattenNodeText(child)` (L24), which writes `> ` before every quote line. Its `>>> `
test at L29 therefore never matches after load. Once the marker is stored, L29 is live. Mutant M12, which makes it dead again, kills 10
cases.

**The change resolves two values differently.** Here is every place that reads them.
- *A bare fence's language* (`currentLang`, now `''` instead of null): the compare at L35 (the fix); the update's
  `lang: isFullCodeBlock && currentLang ? currentLang : ''` (gives `''` either way); and the closing-fence branch
  `else if (res?.[0] && inCodeBlock && currentLang)` (`''` and null are both falsy, so this is unchanged). The stored `lang` that
  `decorator.tsx:216-217` reads is unchanged.
- *A quote line's flattened text* (`flattenNodeText`, now each line's stored marker instead of a fixed `> `). Its readers:
  - `SlateEditor/index.tsx:58-59`: the string written to the parent on open and on every edit. This is the fix.
  - `withNormalizeNode.ts`, `handleEditor` (L33): the scan. It is made live by design.
  - `handleElement`'s `nodeText` (`!nodeText && !node.empty`). A line inside a `>>> ` quote that is empty now reads `''`, so it gets
    `empty: true`. Before the fix it read `> ` and never did. The only other reader of `empty` is `onKeyDown.ts:25`, whose condition
    already holds for every quote line (`|| element.type === 'blockQuote'`), so behaviour does not change.
  - `handleElement`'s per-child text (L150, spans and emoji only, never a quote element): unaffected.
  - `decorator.tsx:198-199`: code lines only, unaffected.
  - `onCopy.ts:29`: copying now gives the lines as written. A copied `>>> ` line keeps `>>> `, and a copied line from inside the quote has
    no `> `. Before the fix every copied quote line began `> `. This is listed under User-visible flows.

**Base compared with fix for what is routed out.**
- Probe `verification/fix-normalize-fence-loop/probes/` (`probe-out-base.txt`, `probe-out-fix.txt`, `probe-out-pair.txt`; the driver is
  `probe.quote-into-code.test.tsx.txt`, run in `git archive` exports). Typing a fence above a quote line, so that the line becomes code,
  drops that line's `> ` (`z\n> a\n```` + "```" → ``z```\na\n````). The result is identical at base and at the fix, so the defect is
  pre-existing and this chain did not cause it. It is outside the statement (a quote line taken into code, not opening or leaving a
  box), so it went to steering for re-scoping (Handoff). It is not absorbed.
- One behaviour changes on purpose. Removing the `>>> ` marker (Backspace at the start of that line) now turns the lines after it into
  plain lines. At base they stayed quote lines and saved as `> b`. With the marker stored, those lines have no marker of their own, and
  the re-enabled check `(!isBlockQuote && child.type === 'blockQuote')` (commented out at base L39) makes them plain. Otherwise the box
  would show them as quoted and save them unquoted.

**Residue in production.** The `>>> ` rewrite has shipped: website `master` (`0411d3b`) carries it, and Vercel serves it. Any message whose
box was opened in the editor since then and then saved carries the rewritten text: `> a\n> b` for `>>> a\nb`, and in titles and field
names the marker is deleted. The release (a Vercel deploy of `master`) applies the fix to every later open and save. It restores nothing
that has already been saved: the original text is not recoverable from the rewritten form. Not traced (9f sweep §2): whether opening a box
without saving persists the rewrite on the server. The loop leaves no residue: the throw stops `onChange` from being called (sweep
`sweep.md` §1, mounted editor). Who checks the live state: the owner, since it is production data.

**Origin-Chain.** `git blame` at `0411d3b` of the lines at fault: `withNormalizeNode.ts:29,66` (`86df55d`, 2022-11-24), `:35`
(`8c05610`, 2023-01-12), `:49-50` (`1842bdc`, 2022-12-18), `getInitialValue.ts:32` (`602e38e`, 2022-11-14), `:33` (`a8bc58a`,
2022-11-28), `flattenNodeText.ts:13` (`0bc2ab0`, 2023-05-13). All of these were made before the pipeline existed, so no chain's change
introduced them.

## Change

Website `0411d3b..d3b98cf` (`9b02f38`, `f9b16de`, `d3b98cf`):

- `src/@types/slate.d.ts`: `quotePrefix?: string` on an element. `CustomRange` is wrapped across lines to meet `max-len` (the type is
  unchanged; see Verification).
- `src/components/SlateEditor/utils/getInitialValue.ts`: the `>>> ` marker is read only outside single-line fields and code lines. Each quote
  line stores the marker it was typed with (`quotePrefix`).
- `src/components/SlateEditor/utils/flattenNodeText.ts`: a quote line is written back with its stored marker (`> ` where it has none).
- `src/components/SlateEditor/utils/withNormalizeNode.ts`, in four parts:
  - A bare fence's language is read with `*`, as on load.
  - The quote branch rewrites a line only when the line becomes a quote, and only by the marker it strips.
  - A line no longer quoted becomes plain.
  - The `>>> ` test ignores code lines.
  - Splitting a line (Enter, or a multi-line paste) gives the new line no `>>> ` marker. This is `editor.apply`, on `split_node`.
- Tests: `utils/__tests__/withNormalizeNode.quote-and-fence-lines-settle.test.tsx` (new, 25 cases). The existing
  `utils/__tests__/getInitialValue.stored-text-loads-unchanged.test.ts` gained 9 cases. That is the found pattern on this surface, extended.

`git diff --numstat 0411d3b d3b98cf`, production paths, added column: 4 + 1 + 3 + 24 = **32**. That is 20 or more, so QA Phase 2 is owed.

## Test

**Red run**, at the unchanged source, website `0411d3b`, in the shared tree before any source edit:
`npx vitest run <the two test files> --reporter=json`, exit 1, 39 cases at that point. Every loop case threw ("Could not completely
normalize the editor after 378 / 462 / 126 iterations!"), and every `>>> ` round trip rewrote. Captured in
`verification/fix-normalize-fence-loop/red-0411d3b.json` and `red-0411d3b.log.txt`. **Final red run**: the test files as handed off (`f9b16de`), copied into a
`git archive` export of `0411d3b`. 43 cases: 29 failed, 14 passed, exit 1. Captured in `red-final-tests-at-0411d3b.json` and `.log.txt`. Nine of the
14 are existing cases. The five new cases that pass at base each have a control:

| Case passing at base | Seen red under |
|---|---|
| forced normalise of `> a\n```js\nfoo\n```` | M11 |
| a character typed at the end of the opening fence | M10, M11 |
| every line after a multi-line quote marker stays a quote line | M11, M12 |
| `> x` typed into a plain line keeps its marker | M4 |
| `> a\n> b` loads unchanged | M11 |

A single-line field `> a` case passed at the red run, and no control turned it red, so it was **dropped**.

**Green run**: the whole suite at `d3b98cf` (below).

**Negative controls.** These ran with `~/.claude/tools/mutation-run.py`, each in a fresh `git archive` export, with `--dep node_modules`
and the editor's test directory as the suite. The vitest config was transcribed with `process.cwd()` for `__dirname`
(`verification/fix-normalize-fence-loop/vitest.mutation.config.ts`). Each control ran 314 or 315 cases, the same count as its mutants.
Mutants are in `mutants-9b02f38.json` and `mutants-f9b16de.json`; tables and streams are in `mutation-9b02f38/` and `mutation-f9b16de/`.

| Mutant | Outcome | Killed by |
|---|---|---|
| M1 fence regex back to `+`, alone | SURVIVED (both SHAs) | Equivalent while the quote guard holds: the language mismatch triggers an update pass that writes no operation. Killed together with M2 as M17 |
| M2 quote guard: existing quote lines rewritten | SURVIVED at `9b02f38`; KILLED at `f9b16de` | the case that checks a typed multi-line marker writes no text to the lines it takes in |
| M3 quote guard: rewrite where no marker is stripped | SURVIVED at `9b02f38`; KILLED at `f9b16de` | the same case |
| M17 M1 and M2 together | KILLED | 12 loop cases (forced normalise and typed characters) |
| M4 typed marker left in the line text | KILLED | typed `>>> x` and `> x`; a later marker opened above |
| M5 single-line gate removed | KILLED | both single-line `>>> ` cases |
| M6 code-line gate removed (load) | KILLED | `` ```\n>>> a\n``` `` loads unchanged |
| M7 code-line gate removed (normalise) | KILLED | lines after a code block holding `>>> ` stay plain |
| M8 check for a line no longer quoted removed | KILLED | lines after a removed multi-line marker become plain |
| M9 split keeps `>>> ` on the new line | KILLED | a split line of a multi-line quote has no marker |
| M10 normaliser drops a stored marker | KILLED | typed at the end of the opening fence; a later marker opened above |
| M11 loader stores no marker | KILLED | 27 cases |
| M12 the normaliser's `>>> ` test dead again | KILLED | 10 cases |
| M15 save writes a fixed `> ` (the base form) | KILLED | 15 cases |
| M16 split rule's top-level guard | SURVIVED | The guard had no effect, so it was **removed** at `f9b16de` |
| M13 / M14 the `> ` fallback where a quote line has no stored marker (save / normaliser) | SURVIVED (both SHAs) | Not reachable: every production path that makes a quote line stores the field. These are the load (`getInitialValue`), the normaliser's update, a split (Slate copies the properties) and Backspace (`onKeyDown.ts:29` spreads the element). The fallback exists because the field is optional in the type. **Open to the reviewer**: keep the fallback, or make the field required on every element constructor |

**Each limb removed alone.** M1 and M2 both survive, and M17 kills. Separately, the probe at a `git archive` export with both limbs reverted
(`probes/probe-out-pair.txt`) throws after 126 iterations, the same as at base.

Test values come from the real readers: `getInitialValue` with the real parser (`markdown.interactive.parseEmoji`), `withNormalizeNode`
over `withEmojis(withHistory(withReact(createEditor())))` as `SlateEditor/index.tsx:61` builds it, and `flattenNodeText`. No value is
invented. No test is time-based. No lifetime is added, and no work is declined.

**Not covered** (as in the determination): React's handling of the throw in a browser, a real `beforeinput` event, Discord's own
rendering of `>>> ` against `> `, and the mounted `SlateEditor`'s `onChange` on open. The composed load-and-flatten path at
`index.tsx:53,58` is what these tests drive. The mount itself is not driven.

## Verification

| Check | Command | Result |
|---|---|---|
| Existing suite, base | `npx vitest run --reporter=json` at `0411d3b`, shared tree, `systemd-run … MemoryMax=8G` | exit 0; 2643 cases, all passed, 170 files (`suite-base-0411d3b.json`) |
| Suite, handoff | same command at `d3b98cf` | exit 0; 2677 cases, all passed, 171 files (`suite-d3b98cf.json`, `suite-d3b98cf.log.txt`). That is +34: 25 + 9 new cases. By path, the only file added is the new test file, and none was removed |
| Typecheck | `pnpm run typecheck` in `git archive` exports of `d3b98cf` and `0411d3b`, with the untracked, ignored `next-env.d.ts` copied in | both exit 0, 0 errors (`typecheck-fix-export.log.txt`, `typecheck-base-export.log.txt`). In the shared tree it fails only on `.next/types/validator.ts(227,39)`, an ignored build output that names `src/pages/api/cron.js`. The export, which has no `.next/`, does not fail |
| Lint | `npx eslint src/components/SlateEditor/utils src/@types/slate.d.ts` | exit 0, 0 errors. Four warnings remain, all in files this change does not touch (`createLeaf.ts:85`, `onChange.ts:7`, `onKeyDown.ts:6,18`) (`lint-d3b98cf.txt`) |
| Convention check | `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website --since=0411d3b` | 0 FAIL, 0 CANDIDATE (`convention-check-d3b98cf.txt`). The **SKIP** for id-token and basename means those checks did not run. Checked by hand: the ID-token class with `grep -ciP` over both test files gives 0 and 0, and the new basename matches the positive form |

No package-manager operation ran, so the lockfile did not move. No irreversible action is added.

**Gates satisfied in this run (disclosed):**
- The post-edit comment gate flagged `withNormalizeNode.ts` L24 ("does a quick pass checking…"), because my insertion of `quotePrefixOf`
  overlapped that existing comment. The comment is unchanged from base. The since-base convention check passes it.
- The convention check's FAIL on `slate.d.ts:26` (`max-len`, a line that already existed and that my added field moved down one) was
  met by wrapping the type (`d3b98cf`).

## User-visible flows

For the owner's own check, in every message box except titles and field names unless stated otherwise:

1. A message with a quote line and a code block with no language opens, and you can type anywhere in it. Before the fix every keystroke
   was lost.
2. A message with a `>>>` quote, opened and closed without editing, keeps its text exactly. This holds in titles and field names too.
3. Typing `>>> ` at the start of a line makes the rest of the message a quote, and the saved text keeps `>>> `.
4. Pressing Enter inside a `>>>` quote starts a new quoted line with no marker of its own.
5. Pressing Backspace at the start of a `>>>` line removes the quote from that line and the lines after it.
6. Copying quoted lines from the editor copies them as they are written (`>>> ` kept, the lines after it without `> `).

## Handoff

- **SHA**: website `d3b98cf` on `chain/fix-normalize-fence-loop`.
- **Who reviews**: `code-reviewer-fix-normalize-fence-loop`, started by steering on this thread's cue. Then QA Phase 2, since 32
  production lines were added.
- **Who merges**: devops, at release to website `master` (Vercel production), under the owner's release approval.
- **Routed to steering** (`steering-hooks-fixer`, at this seam): the pre-existing defect where a quote line taken into a newly opened code
  block loses its `> `. The evidence is in Diagnosis. It is identical at base and fix, outside the statement, and not absorbed.
  Carrier: row S-29 of `verification/slate-formatting-effort/scoping/inventory.md` (record `21c0abc8`), the scope sweep of the Slate and
  formatting effort, named by steering; that effort owns it, not this fix.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-23T09:15 | fixer-fix-normalize-fence-loop | Created. Fix at website `9b02f38`, `f9b16de`, `d3b98cf`. Red runs, controls, verification and handoff at `d3b98cf` recorded |
| 2026-11-23T09:19 | fixer-fix-normalize-fence-loop | The routed re-scope item's carrier recorded: S-29 of `verification/slate-formatting-effort/scoping/inventory.md`, per steering's message (reviewer started 09:19Z) |
