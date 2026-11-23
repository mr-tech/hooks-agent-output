---
ID: n/a
Origin: fix-normalize-fence-loop
UUID: a0de90fd
Verified-At: af3d95a — repos=website; production code identical to the reviewed 61e5dfe (the delta 61e5dfe..af3d95a is QA's test files only)
Status: Released
Status-Detail: "Phase 2 PASS at website af3d95a; released at that commit. QAF-1 to QAF-3 resolved in-pass; QAF-4 routed (S-29)."
Phase: 2
---

# QA Report: fix-normalize-fence-loop

**Plan Reference**: none. This is a fixer chain (`ID: n/a`). Scope statement: `steering/fix-normalize-fence-loop-rulings.md`, block
"2026-11-23T08:55Z". `codeFence.ts` is inside the write set per block "2026-11-23T09:40Z".
**Gate documents**: `implementation/fix-normalize-fence-loop-implementation.md` (`Handoff-At: 61e5dfe — repos=website`) and
`code-review/fix-normalize-fence-loop-code-review.md` (record `1e93f428`, Round 1 sub-entry 1b APPROVED, `Reviewed-At: 61e5dfe`).
**Brief**: `steering/fix-normalize-fence-loop-brief-qa.md` with `-brief-common.md`.
**Evidence**: `verification/fix-normalize-fence-loop/qa/` (named per item below).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T09:42 | steering-hooks-fixer (brief `steering/fix-normalize-fence-loop-brief-qa.md`) | Phase 2 on website `61e5dfe` | Phase 2 opened. This fixer chain has no Phase 1 (the owner chose the fixer route; brief "Duties negated"), so this is Phase 2 alone. Criteria recorded before execution |
| 2026-11-23T10:05 | — | — | Phase 2 PASS at website `af3d95a`. Production code is identical to `61e5dfe`. Suite 2696/2696, exit 0. The code review's Assumption Not Checked was executed (DOM harness and a real browser). Mutation sweep 39/49, survivors closed by QA specs to 5 equivalent. QAF-1 to QAF-3 resolved in this pass, QAF-4 routed |
| 2026-11-23T13:11 | devops-fix-normalize-fence-loop | Document closed (Stage 1 commit) | Status: Committed. The Assumption Not Checked (production bundle against `next dev`) is carried to the deployment record's post-deploy walk |
| 2026-11-23T15:29 | devops-fix-normalize-fence-loop | Document closed at release | Status: Released. website master moved 0411d3b -> af3d95a on origin (release-move.js exit 0); Vercel production deployment Ready; record deployment/fix-normalize-fence-loop-deployment.md |

## Stage start

- Stage start: the code review's committed verdict, `Reviewed-At: 61e5dfe — repos=website`, Round 1 sub-entry 1b APPROVED (record
  `1e93f428`). Website HEAD read `61e5dfe46e36a16748ece7eae1d604df4ee86ffd` at 09:4xZ on `chain/fix-normalize-fence-loop`.
- No Phase 1: the owner chose the fixer route (rulings block "2026-11-23T08:55Z", stage set). The Irreversible Side-Effect Register
  is not produced. Read from `git diff 0411d3b 61e5dfe` over production paths, the change writes nothing irreversible: it touches the
  editor's loader, normaliser, flattener and fence rule, and the save path is unchanged and saves nothing on its own.
- TDD evidence on a `fix-` chain is the fixer document's Test section (red run, green run), not a table. That section was read. Its red
  run at `0411d3b` and its final red run of the handed-off tests are captured (`red-0411d3b.json`, `red-final-tests-at-0411d3b.json`).
  Every case passing at base has a named control. The Round 1 cases' red is captured (`round1b/red-d3b98cf.json`).
- Production lines, re-derived: `git diff --numstat 0411d3b 61e5dfe` added column over production paths gives 4 + 20 + 1 + 11 + 32 = 68.

## Criteria assessed (recorded before execution)

| ID | Criterion (source) | Input class it exemplifies | Instrument this pass |
|---|---|---|---|
| C1 | Scope (1): a quote line plus a code fence with no language settles on normalise and accepts a typed character at every position, in every full-markdown editor. The fence's language reads the same in load and normalise. The quote branch writes nothing when the text is unchanged | every caret position of every value holding a quote line and a fence (any info string) | suite; a seeded random-text differential (shaped differently from the reviewer's 20-atom corpus); mutation sweep |
| C2 | Scope (2): load plus save with no edit returns the text unchanged where it holds `>>> ` (`>>> a\nb`, `>>> a`, `>>> a\n\nb`), in full and partial editors. Opening or leaving a box writes no changed text | every stored text, full and partial (`partialMarkdown`) | the same differential, both modes; mounted `SlateEditor` (DOM harness) for the open write; real browser for open and leave |
| C3 | Scope (3): `>>> a` plus a bare fence settles; the `>>> ` test in `handleEditor` is live | `>>>` inputs in the C1 class | suite; differential; mutation sweep |
| C4 | Code review's Assumption Not Checked: opening a mounted `SlateEditor` calls `onChange` with `flattenNodeText(getInitialValue(text))` and nothing else | every stored text (C2's class) at the mount | new mounted-editor test (DOM harness); a real browser |
| C5 | Hazard 4 (brief-common): the emoji chain's two files stay green | — | suite |

Out of scope, carried elsewhere: a quote line taken into a newly opened code block loses `> ` (same at base). This is row S-29 of
`verification/slate-formatting-effort/scoping/inventory.md`.

## Implementation Review

- Code changes (`git diff 0411d3b 61e5dfe`, production paths): `codeFence.ts` (new: `NO_FENCE`, `isCodeLine`, `lineLang`,
  `afterLine`), `getInitialValue.ts` (fence state through `codeFence`; the `>>> ` marker read only outside single-line fields and code
  lines; `quotePrefix` stored per quote line), `flattenNodeText.ts` (writes the stored marker), `withNormalizeNode.ts` (`quotePrefixOf`;
  the scan uses `codeFence`; the quote branch rewrites only a line becoming a quote; a line no longer quoted becomes plain; `editor.apply`
  drops `>>> ` from a split line), `slate.d.ts` (`quotePrefix?`).
- The leave path, read: `DiscordContentEditor/Desktop.tsx` `_onClose` writes `_value`. Only the `SlateEditor`'s `onChange` sets that
  value, so leaving writes what the editor last emitted. `makeEditable` (`src/utils/index.ts`) does not read or write `content` or titles,
  so a stored message's text reaches the editor as stored.

## Test Coverage Analysis

| File | Function/Class | Test File | Test Case | Coverage Status |
|---|---|---|---|---|
| `getInitialValue.ts`, `flattenNodeText.ts` | load round trip | `getInitialValue.stored-text-loads-unchanged.test.ts` | "loads %j with its text unchanged" (14 rows, 2 added by QA: `' > a'`, `'  >>> a\nb'`); "loads %j into a single-line field with its text unchanged" | COVERED |
| `withNormalizeNode.ts`, `codeFence.ts` | settle, typing, language, markers, split, Backspace | `withNormalizeNode.quote-and-fence-lines-settle.test.tsx` | the fixer's 29 cases, plus QA's "gives the code lines the language typed onto their opening fence" and "marks which fence lines start inside a code block once a fence typed above them opens one"; "turns %j typed into a plain line into a quote line that keeps its marker" tightened by QA to assert the line's own text `x` | COVERED |
| `SlateEditor/index.tsx` (mount, unchanged) with the chain's loader and flattener | the open write | `SlateEditor/__tests__/SlateEditor.opening-writes-stored-text.test.tsx` (new, QA) | "writes %j back to the message unchanged, once, in a full-markdown box" (8); "… in a single-line box" (3) | COVERED |
| `Desktop.tsx` leave | write on blur | none in the suite (the existing `DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx` stubs the `SlateEditor`) | real-browser walk, steps 2–4 | COVERED by walk, not by the suite |

Fixture named (Iron Law 5): the mount test supplies `EmojiPickerContext` with a closed picker (`setOnInsert`, `setShowPicker` no-ops,
`showPicker: false`). The editor only registers its insert callback there, and no case opens a picker. `useMarkdown` is mocked to return
the real `~/utils/markdown` module that the provider loads.

Test-convention audit of the touched files: basenames match the positive form. The ID-token class over titles and comments
(`grep -ciP` with the CLAUDE.md class) gives 0, 0, 0 over the three files. No pin, source-text assertion, transcription or time-based cell.
The mount test uses fake timers to run the editor's 300 ms focus callback with no wall-clock wait. Every expectation is a literal.
`convention-check.js --since=0411d3b` at `af3d95a`: 0 FAIL, 0 CANDIDATE, 18 SKIP. The SKIPs are the untracked `.playwright-mcp/` captures
plus the id-token and basename checks, done by hand above (`convention-check-af3d95a.txt`).

## Test Execution Results

| Check | Command | Result |
|---|---|---|
| Whole suite at `61e5dfe` | `npx vitest run --reporter=json` (shared tree, `systemd-run … MemoryMax=8G`) | exit 0; 2681 / 2681 passed; 171 files (`suite-61e5dfe.json`, `.log.txt`). Emoji-chain files: `withNormalizeNode.emoji-keeps-line-text` 6 passed, `getInitialValue.stored-text-loads-unchanged` 18 passed (C5) |
| Whole suite at `af3d95a` | same | exit 0; 2696 / 2696 passed; 172 files (`suite-af3d95a.json`, `.log.txt`). Compared by path with `61e5dfe`: one file added (`SlateEditor.opening-writes-stored-text.test.tsx`), none removed; +15 cases = 11 + 2 + 2 |
| Typecheck | `pnpm run typecheck` (both programs) in a `git archive` export with `next-env.d.ts` copied in | exit 0 at `61e5dfe` and at `af3d95a` (`typecheck-61e5dfe-export.log.txt`, `typecheck-af3d95a-export.log.txt`) |
| Lint | `npx eslint` over the three test files | exit 0, no issues |
| Delta since review | `git diff --quiet 61e5dfe af3d95a -- ':!*__tests__*'` | exit 0, so there is no production change. Positive control: the same command from `0411d3b` exits 1. `git merge-base --is-ancestor 61e5dfe af3d95a` exits 0 |

### Mounted-editor test (C4, the code review's Assumption Not Checked)

`SlateEditor.opening-writes-stored-text.test.tsx` mounts the real `SlateEditor` with `createRoot`/`act` (the DOM harness), the real
parser, loader, normaliser and flattener. It asserts the full list of `onChange` writes after mount and the focus timer.

- Green at `61e5dfe` with the shipped code: 11 / 11 (`mount-green-61e5dfe.json`).
- Red at base `0411d3b` (export, test copied in): 7 of 11 fail. `>>> a\nb` → `['> a\n> b']`, `>>> a` → `['> a']`, `>>> a\n\nb` →
  `['> a\n> \n> b']`, `>>> a\n```\nfoo\n```` → `['> a\n> ```\nfoo\n> ```']`, `x\n>>> a\nb` → `['x\n> a\n> b']`, single-line `>>> a` →
  `['a']`, `>>> a\nb` → `['a\nb']` (`mount-red-0411d3b.json`).
- The four cases green at base (`> a\n```\nfoo\n```` , `> a\n> b`, `plain`, single-line `> a`) are seen red under QM6 (the open writes
  twice), which kills all 11 (kill table below).
- Result: the assumption holds at the tip. Opening writes the stored text, once. Copy of the test as committed:
  `SlateEditor.opening-writes-stored-text.test.tsx.txt`.

### Real-browser walk (C2, C4; the determination's "real `beforeinput`")

A local `next dev` of `git archive` exports of `58b688f` (production identical to `61e5dfe`) on `127.0.0.1:3000`, and of base `0411d3b`
on `:3001`. Each export had `pnpm install --frozen-lockfile --offline` and `.env.local` symlinked. Only key names and the hosts of
`NEXTAUTH_URL`, `DATABASE_URL` and `REDISHOST` were read, all loopback. Page `/message/m/0/edit`, signed out: a local draft, with no
database, no save and no message id. A `browser-walker` helper drove the stage browser. Its route aborted any `message.upsert`,
`message.delete` or `updateRecentMessageData` request, and none appeared in the network list on either server. The helper notes that an
aborted request might not be listed. The message was set and read through the page's own "Edit → JSON" dialog. Evidence:
`walk/walk-results.md`, `walk/evidence/*` (the JSON read files were spot-read by this stage).

| Step | TIP observed | BASE observed (control) |
|---|---|---|
| Set `{"content": ">>> a\nb", "embeds": [{"title": ">>> t", …}]}`, open and leave the content box, then the title box, without typing; read the JSON | content `>>> a\nb`, title `>>> t` | content `> a\n> b`, title `t` |
| Set `> a\n```\nfoo\n````, click `foo`, End, a real key press `x`; read the JSON; count console "Could not completely normalize" | content `> a\n```\nfoox\n````; 0 errors (`tip-console-errors-only.txt`, `grep -c` 0) | content as tip; 1 error, its stack through `insertText` and `onDOMBeforeInput` (`base-console-errors-only.txt`, `grep -c` 1) |

The tip passes every step. On the first click at the tip the caret landed on the closing fence; the helper clicked `foo` again, and only
that attempt is tabled. On base the keystroke was kept despite the throw, so the throw, not the text, is what discriminates there. The
other console error on both servers is a `dark`-class hydration mismatch, which is not this chain's. The server logs
(`walk/next-dev-*.log`) show next-auth's session lookup (a `SELECT` in `getSessionAndUser`) refused, `ECONNREFUSED 127.0.0.1:5432`.
No database was running, so nothing was read or written.

Set up and removed: four exports under this session's scratchpad (deleted), and two `next dev` servers. SIGINT and then SIGTERM to
their outer groups did not stop them; SIGTERM to the `timeout` process groups (pgid 3715509, 3715510) did. Afterwards `ps` shows no
`next dev` and both ports refuse (`curl` 000). The helper closed the browser and emptied its caches.

### Random-text differential (C1, C2, C3; second instrument)

Driver: `probe.random-differential.test.tsx.txt`, seeded (`20261123`). It builds 3000 texts of 1–6 lines, each line a lead token
(`''`, `> `, `>>> `, ` > `, `>`, `>> `, fences with `js`, `c++` or a space) plus 0–3 body tokens. The first 800 texts get one `x` typed
at every content offset of every line. Oracles: text equality, and the source string with `x` spliced at the offset. Both are string
facts, not computed by the code under test. Runs are in `git archive` exports.

| Tree | load full ≠ | load single-line ≠ | normalise throws | normalise changes text | normalise writes any op | edits | edit throws | edit text ≠ spliced | saved text reloads differently |
|---|---|---|---|---|---|---|---|---|---|
| `61e5dfe` | 0 | 0 | 0 | 0 | 0 | 15,480 | 0 | 346 | 0 |
| `61e5dfe`, quote guard removed (`guardless.patch.txt`) | 0 | 0 | 0 | 0 | 0 | 15,480 | 0 | 346 | 0 |
| `0411d3b` (positive control) | 1303 | 876 | 421 | 949 | 1 | 12,261 (636 lines skipped as not round-tripping) | 1844 | 2855 | 159 |

Files: `random-differential-exp-61e5dfe.json`, `random-differential-exp-61e5dfe-guardless.json`, `random-differential-exp-0411d3b.json`.
This is a bounded result: it covers the generator's token class, stated in the driver. The guardless row shows the language limb alone now
ends the loop on this corpus, as the reviewer found on its own. The 346 are QAF-4.

### Mutation sweep

Scope: `git diff 0411d3b..61e5dfe` over production paths, which is `codeFence.ts`, `getInitialValue.ts`, `flattenNodeText.ts` and
`withNormalizeNode.ts` (`slate.d.ts` is types only). Mutant set (`mutants-qa-58b688f.json`): 43 generated by
`node ~/.claude/tools/mutant-gen.js --repo website --range 0411d3b..61e5dfe` (operators per its header, on lines added in the range;
regex literals and `??` not mutated), plus QM1–QM5 (QA, on the same files) and QM6 (instrument check on `index.tsx`, outside the diff, not
scored). Runner: `mutation-run.py` in fresh exports, `--dep node_modules`, suite `src/components/SlateEditor` under
`verification/fix-normalize-fence-loop/vitest.mutation.config.ts` (blob `a09ec73`), runner blob `b26916e`, run by a `general-purpose`
helper. Tables: `mutation-58b688f/mutation-table-*.json`.

- At `58b688f`: the runner's table reads 39 of 49 KILLED, all with `count: checked` (330 cases, as the control), and 10 SURVIVED. Of the
  49, QM6 is the instrument check and is not scored. Over the 48 sweep mutants on the four files, 38 were KILLED and 10 SURVIVED.
- Survivors closed by QA specs, re-run at `c704cc6` (`mutation-survivors-c704cc6/`) and `0af79c2` (`mutation-startcodeblock-0af79c2/`):
  - `withNormalizeNode.ts:40:||` and `:40:!==` (the language check in the scan) → KILLED by "gives the code lines the language typed onto
    their opening fence".
  - QM2 (marker stored without its leading spaces) → KILLED by "loads `' > a'` / `'  >>> a\nb'` with its text unchanged".
  - QM5 (a typed `>>> ` read as `> ` plus text) → KILLED by the tightened "turns `>>> x` typed into a plain line …".
  - `withNormalizeNode.ts:42:||` (drops the start-of-block check alone) → KILLED by "marks which fence lines start inside a code block …".
    A first form of this spec (`a\n```\nb`) did not isolate the check, because a sibling check also fired; it was replaced at `0af79c2`.
  - Each spec passes at the shipped code: controls at 333 and 334 cases, and the whole suite at `af3d95a`.
- Equivalent, recorded (5): `withNormalizeNode.ts:40:&&`, `:42:!==`, `:44:&&` and `:44:===` turn the scan's change detection into an
  always-on trigger. The update pass then runs on more normalise calls and writes nothing where the value is already consistent: setNodes
  with equal properties is no op, and the quote rewrite is guarded. That costs a pass, with no behaviour change. `:15:if-false` (a quote
  line's prefix re-derived from its text instead of its stored marker) differs only in node shape, never in text, which is the class the
  code review recorded as text-neutral.
- Score after QA's specs: 48 mutants on lines added in `0411d3b..61e5dfe` in the four production files (generated by
  `mutant-gen.js --range`'s operators, plus QM1–QM5; regex literals and `??` are not mutated). 43 KILLED, 5 equivalent, 0 unresolved. The kills come from the suite at `0af79c2`;
  `af3d95a` differs only by one comment line removed from the mount test.

## Findings

QAF-1 MEDIUM Phase 2 RESOLVED — the open write the change relies on (scope (2): opening a box writes no changed text) had no suite
assertion. The only mount test stubs the `SlateEditor`. Closed in this pass by `SlateEditor.opening-writes-stored-text.test.tsx`: 7/11 red
at base, 11/11 red under QM6, green at the tip. Duplicates: Assumption Not Checked in code-review/fix-normalize-fence-loop-code-review.md

QAF-2 MEDIUM Phase 2 RESOLVED — the scan's language check after an edit (`:40`) and its start-of-block check (`:42`) survived the sweep.
No case checked a language typed onto a fence reaching the code lines, nor a fence line's start flag moving alone. Closed by QA's two
specs in `withNormalizeNode.quote-and-fence-lines-settle.test.tsx`, each seen red under its mutant and green at the shipped code.

QAF-3 MEDIUM Phase 2 RESOLVED — two marker forms had no assertion. A marker typed with leading spaces (QM2) is one of scope (2)'s stored
texts. A typed `>>> ` must leave the line's own text (QM5): the box shows `x`, not `>>> x`. Closed by two load rows and one tightened
assertion, each seen red under its mutant.

QAF-4 INFO Phase 2 ROUTED — 346 of 15,480 typed edits (differential above) save with a leading `> `/`>>> ` dropped from a line that typing
inside a fence turned into code. `probe.wrong-edit-replay` classifies 344 as one marker dropped and 2 as a doubled marker (`>>> > `)
dropped. None was correct at base: 225 gave the same text, 107 threw the loop, and 14 gave other wrong text, 8 of them with the
one-marker-dropped signature (`baseCorrect` 0, `wrong-edits-replay-0411d3b.json`). This is S-29's mechanism with a wider trigger. It is outside C1, since the typed character is accepted
and kept, so the verdict does not rest on it. Destination: the record `INBOX.md` entry "2026-11-23 — qa-fix-normalize-fence-loop — FYI",
asking the S-29 owner to widen the row's trigger, and the verdict message to `steering-hooks-fixer`.

## Blocking-condition register

This is the chain's register, and it has no rows. No operator-observed check is designated: there is no plan, and the scope statement's
validation is by tests. The code review's open-write assumption was executed here (QAF-1, walk). The brief's fallback, a post-deploy row
for devops if no browser was available, does not apply, because a browser was used. The source of the defect is a research row
(`research/codebase-bug-evaluation-2026-11-08.md:169`), not a user report, so no distinguishing post-deploy observable is owed. Later
stage documents (the deployment record) are authoritative on anything this list states.

## Verdict

**PASS — QA Complete at `af3d95a`** (website `chain/fix-normalize-fence-loop`; production code identical to the reviewed `61e5dfe`).
C1–C5 hold. QAF-1 to QAF-3 were closed in this pass by tests QA wrote and committed (`58b688f`, `c704cc6`, `0af79c2`, `af3d95a`, all
test-only). QAF-4 is routed and does not hold the release. A later change to production code expires this verdict. Release consequence:
devops's to establish (brief-common names Vercel's deploy of `master`; no workflow was read by this stage).

## Assumption Not Checked

This pass assumes that the production build behaves as `next dev` for the editor's open, leave and keystroke paths, and does not test it.
The walk ran a development build, where React's development behaviour differs from the minified production bundle. If that is false, on
production a message holding `>>> a\nb`, opened and left in the editor, shows `> a\n> b` in its JSON, or typing into a quote plus a
fence with no language loses keystrokes. Owner: devops at release, as a hazard line for the owner's look at the live site after the
Vercel deploy.

## Handoff

Verdict to `steering-hooks-fixer` by SendMessage (devops starts from it). Not held on: S-29 and its widened trigger (QAF-4).
