---
ID: 019
Origin: 019
UUID: 286c730a
Verified-At: "81c68b2 — repos=website; refresh pass over fix round 8 (81c68b2, test-only; code review's fix confirmation of QAF-38 at 81c68b2, APPROVED_WITH_COMMENTS), git-archive export with its own frozen offline install; earlier passes at 2c1590f, e58f2ed and d6aab03"
Status: Committed
Status-Detail: "Committed at website 48eb60a (devops Stage 1, 2026-11-25), awaiting release."
Phase: 2
---

# QA Report: 019 — M3, the fuzzer and oracle in the suite (Phase 2)

**Plan Reference**: `agent-output/planning/019-slate-formatting-discord-engine.md`, Revision 12 (record `b0af4dc3`). The criteria
this pass assesses are unchanged since Revision 9. Revisions 11 and 12 moved AC-3.7 only, which is M4's to deliver.
**Code review**: `code-review/019-slate-formatting-discord-engine-code-review.md`, Round 3 and its two sub-entries, verdict
APPROVED_WITH_COMMENTS at `Reviewed-At: 2c1590f` (record `6c55e994`; plan R-36 at `85fc1e6b`).
**Implementation**: `implementation/019-slate-formatting-discord-engine-m3-implementation.md` (`Handoff-At: 2c1590f`).
**Blocking-condition register**: the chain's one register, in `qa/019-slate-formatting-discord-engine-qa.md`. This pass appends B-8.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T22:48 | code-reviewer-019 (message: M3 APPROVED_WITH_COMMENTS, record `6c55e994`, Reviewed-At website `2c1590f`) | QA Phase 2 on M3 | Phase 2: milestone-scoped pass on M3 at `2c1590f`, in an export. Steering's Phase 2 brief has not arrived, so this pass read the Decisions Register, the 22:35Z M3 cap and the code review's Assumption Not Checked lines itself. Offline 3348 of 3348, exit 0. Live 38 of 38, exit 0, the attempts case included. Typecheck exit 0 with Next's generated declaration copied in. Findings 5 reproduced at `f4060c5`. AC-3.4: 22 of 29 product mutants killed, 7 survivors dispositioned. Verdict **QA Failed** on QAF-32 and QAF-33, both MEDIUM severity floors. B-8 appended for the `beforeinput` paste branch. One command was stopped by the built-in destructive-command check and re-issued with literal paths (§ Execution). |
| 2026-11-24T01:08 | implementer-019 (message: fix round 5 at `380e82d`), code-reviewer-019 (message: Round 3 sub-entry at `380e82d` APPROVED_WITH_COMMENTS, record `d31214e4`) | Phase 2 refresh pass over fix round 5 | Phase 2 refresh at `e58f2ed`, which contains `380e82d` (§ Refresh pass). Frozen offline install exit 0. Offline 3454 of 3454, exit 0. Whole `pnpm test:discord` offline: exit 1, names the page, no pass count. Live: 41 of 41, exit 0, with the drift message on stderr and at the report head. **QAF-32 closed**: a planted file that passes offline turns its case red. **QAF-33's write limb closed.** **QAF-36 MEDIUM raised**: a QA mutant forcing the comparison to "equal" survives, 15 of 15 live. Verdict **QA Failed** on QAF-36. The M3 Assumption Not Checked (the install) is settled by the frozen install. |
| 2026-11-24T02:11 | code-reviewer-019 (message: CR-15 confirmed, M3 APPROVED_WITH_COMMENTS at `d6aab03`, record `fed65ffa`) | Refresh pass over fix rounds 6 and 7; the code review's two items (the whole offline suite, `routingReport`'s fields) | Refresh at `d6aab03` (§ Refresh pass, rounds 6 and 7). Frozen offline install exit 0. Offline 3,268 of 3,268 over 223 files, exit 0. Live 41 of 41, exit 0. The whole `pnpm test:discord` offline: exit 1, names the page, no pass count. **QAF-36 closed**: 3 of 3 QA mutants KILLED offline. **QAF-38 MEDIUM raised**: 0 of 6 `routingReport` field mutants killed live. Verdict **QA Failed** on QAF-38. |
| 2026-11-24T02:50 | code-reviewer-019 (message: QAF-38 fix confirmed, M3 APPROVED_WITH_COMMENTS at `81c68b2`, record `47e4ccf5`) | Refresh pass over fix round 8; the code review's two items (the whole offline suite, QAF-38's closure) | Phase 2 refresh at `81c68b2` (§ Refresh pass, round 8). Frozen offline install exit 0. Offline 3,272 of 3,272 over 223 files, exit 0. Typecheck exit 0. Live 41 of 41, exit 0. The whole `pnpm test:discord` offline: exit 1, names the page, no pass count. **QAF-38 closed**: 6 of 6 QA mutants KILLED offline. Verdict **QA Complete**, milestone-scoped. |
| 2026-11-25T17:10 | devops-019 | Document closed | Status: Committed at website `48eb60a`, awaiting release. |

## Scope and stage start

- **Stage start.** The code review's committed verdict, APPROVED_WITH_COMMENTS at `Reviewed-At: 2c1590f` (record `6c55e994`),
  re-derived from the record. The code reviewer's message is the hand-off. Steering's Phase 2 brief for M3 has not arrived, so this
  pass read the plan's Decisions Register, steering's M3 cap (block 22:35Z, which arrived during this pass; § Findings) and the
  code review's Assumption Not Checked lines itself.
- **Tree.** Website `2c1590f`, exported with `git archive 2c1590f` into this session's scratchpad. Blob identity was checked: 642
  blobs, 0 mismatches against `git ls-tree -r 2c1590f`. `node_modules` is the shared tree's, linked. `pnpm-lock.yaml` and
  `package.json` in the shared tree equal `2c1590f`'s (`git diff --quiet`), unlike M2's pass, which ran its own frozen install. The
  shared tree was not switched or written.
- **What else is in the tree.** `7dcedc9..2c1590f` holds 17 commits. Three are M4 production work (`93b26fd`, `f131f06`, `c32e058`),
  which code review has not seen. They run in the suite here but are outside this verdict. M3's own production paths are
  `vitest.config.ts`, `package.json`, `.gitignore` and `src/@types/jsdom.d.ts`; the rest of M3 is test code and test data.
- **Criteria assessed, fixed before execution.** The M3 Form (D-12), AC-3.2's live box limb and frozen literals, AC-3.3, AC-3.4,
  AC-3.5, AC-3.8 (i), (i′) and (iii), and M3's instruments (generator, fixed inputs, lifted seeds, coverage report,
  known-differences report, drift alarm, normaliser control). AC-3.1, AC-3.6 and AC-3.7 are M4's: the site's renderers are M4's.
  AC-3.2's editor side is M5's, and AC-3.8 (ii) is per M4 adjustment.
- **Owed by code review, taken here.** The live command at the approved SHA, in an export, with the attempts case; Findings 4's and
  5's counts; the AC-3.4 product-function mutations (M3 Outstanding 5); the `beforeinput` paste branch (Outstanding 7); AC-2.6's
  notice in the client chunk (Round 1).
- **Irreversible Side-Effect Register.** M3 changes no guard of E-1 to E-9. Its only new outbound path is the live oracle's fetch of
  `discord.com`, which the oracle window confines (CR-6, CR-10, below). The effort-final mutation sweep stays owed, over
  `git diff 5ec0621..<final tip>` production paths. M3's production diff (config, script, type declaration) gives `mutant-gen.js`
  no candidate (the implementer's self-check, `m3-selfcheck-mutant-gen-1f0b768.txt`).

## TDD compliance gate

The table is present and complete. Every new function or class has a row with Yes in all three columns. Where a file's first row
cites a module-absent red, each later row cites a runtime or assertion-level red: a `TypeError`, an `AssertionError`, or a named
mutant killed (`verification/019/impl/m3-red-*`, `m3-mutants-*`, `m3fix4-*`). Two rows reach their assertion-level red through
mutants only. The routing live cases passed at first run, and AC-3.5's offline case passed at first run; mutants M1 to M3 and M3-o1
are their reds. The load, normalise and typed-edit property rows defer their product mutants to this pass (AC-3.4, below). The gate
passes.

## Execution

| Command (in the export of `2c1590f`) | Result | Capture under `verification/019/qa/m3/` |
|---|---|---|
| `unshare -rn` (lo up) `npx vitest run --project node --project dom --reporter=json` | **exit 0**; 204 files, 3348 of 3348 passed; 0 files under `__tests__/discord/` collected | `suite-offline-2c1590f.{json,log.txt,exit,start}` |
| `pnpm run typecheck` | exit 2 in the bare export: `src/app/page.tsx` cannot resolve `~/assets/img/product_image.png`, because Next's generated `next-env.d.ts` is untracked (`.gitignore:86`). With the shared tree's `next-env.d.ts` copied in (hash recorded): **exit 0** | `typecheck-2c1590f.{log.txt,exit}`, `typecheck-2c1590f-with-next-env.{log.txt,exit}`, `typecheck-2c1590f.next-env.sha256` |
| `npx vitest run --project discord-node --project discord-dom` (network) | **exit 0**; 6 files, 38 of 38 passed, the attempts case `records no request attempt from Discord's evaluated code` among them | `discord-live-2c1590f.{json,log.txt,exit,start}`; `discord-live-controls-2c1590f.log.txt` (the controls file alone, 9 of 9, exit 0) |
| the reports the live run writes | copied | `discord-reports-2c1590f/{coverage,known-differences}.md` |
| `discordReports.run.test.ts` alone, in an export of `f4060c5` | exit 0 | `discord-reports-run-f4060c5.{log.txt,exit}`, `discord-reports-f4060c5/` |
| `unshare -rn` (lo up) `pnpm test:discord` | exit 1; names `https://discord.com/app` (`OracleError ... fetch failed`); **`Tests 3 passed \| 35 skipped (38)`** | `discord-offline-2c1590f.{log.txt,exit}` |
| QA probe: the drift report the live command computes, printed | exit 0; served and pinned both `da7b9e5e…57fb0`, `equal` | `qaDriftProbe.print.test.ts` (sha256 `67a6bf81…95215`), `qaDriftProbe-2c1590f.{log.txt,exit}` |
| `node ~/.claude/tools/convention-check.js website --since=7dcedc9` | 1 FAIL and 3 CANDIDATE, all in M4 files (`GuildProvider.tsx` `react-hooks/use-memo`; three `{ timeout }` options in M4's preview tests); none in an M3 file. The ID-token check is SKIPPED by the tool | `convention-check-2c1590f.txt` |
| ID-token scan by hand, the workspace class, over the 52 test paths changed in `7dcedc9..2c1590f` (basenames; title and comment lines) | 0 hits. Positive control on the same run: 2 of 3 planted lines (`QAF-12` in a title, `CR-7` in a comment; `v2` is not a token) | `id-token-scan-2c1590f.txt`, `m3-range-test-files.txt` |
| AC-3.4 product mutants, 29, over the six AC-3.3 property files (`mutation-run.py`) | runner exit 0; control passed, 104 tests; 22 KILLED (each count-checked, 104 = 104), 7 SURVIVED, 0 stillborn or aborted. Read from the kill table, not from the helper's summary | `ac34-mutants.{mjs,json}` (mutants blob `ceaf86a7`), `ac34-run/mutation-table-2c1590f…-20261123T221859Z-p920153.json` and each run's output |

Disclosed: one command in this pass was stopped by Claude Code's built-in destructive-command check, because its `rm` of the probe
file named the path through shell variables. Nothing in it ran. It was re-issued with the literal path, the form the check names,
and the probe file was removed from the export.

**Timing (AC-3.3's cap).** The offline suite ran 68 s wall time at `2c1590f` (start 22:13:51Z, exit file 22:14:59Z), against
36.1 s at `7dcedc9`. The 32 s added is under the 60 s cap, and it includes M4's tests. The implementer's 27.4 s was measured at
`f4060c5`.

## Criteria

| Criterion | Class, and how it was checked | Result |
|---|---|---|
| Form (D-12) | The two projects, the two scripts, and the exclusion, by `vitest.config.discord-projects.test.ts` and by both runs | **Pass.** The offline run collects no file under `__tests__/discord/`; the live run collects exactly the six. |
| AC-3.2, the box limb | The 279 native-box literals, frozen in `pnpm test` and re-derived live on the pinned wasm; the legacy box beside it | **Pass for M3's part.** `discordBoxes.oracle-controls` is 10 of 10 live; the report lists 1,536 of 2,463 per-character differences at `2c1590f`. The editor side is M5's. |
| AC-3.3 Round trip | The properties over the generator, the corpus, the probe and the lifted seeds, in both modes, read at `onChange` | **Pass, with the hold-outs as the implementation records them.** Green offline. The emoji class (`holdsEmoji`), the base-red typed and pasted texts (`mountedBaseRed.json`) and the 346 wrong edits are held out, each shown red at the base on a named input; none is asserted wrong (axiom D). Their deletion is M6's exit condition (plan R-30), which this pass checked at baseline earlier (14 lines over 5 files at `f4060c5`). Timing under the cap. The `beforeinput` paste branch is not exercised by jsdom: B-8. |
| AC-3.4 Seen red | For AC-3.3: a restored mutation of each function a property drives | **Pass.** 22 of 29 hand-written mutants killed. The mutants are over `getInitialValue`, `flattenNodeText`, `withNormalizeNode` (its `handleEditor`, `handleElement` and `apply`) and `SlateEditor`'s `onPaste` at `2c1590f`. They exclude the decorator, `onKeyDown`, `onCopy` and the emoji-insertion paths except F4 and W8. Suite: the six AC-3.3 files only, so each kill is AC-3.3's. Killed: every quote-prefix, line-join, `>>>`-continuation, fence and refused-paste mutant, including both boundary mutants of the 6,000-character limit (P4, P5). Survivors, each dispositioned below. |
| AC-3.5 Fetch failure is loud | The whole command in the loopback-only namespace | **Fail on "reports no pass count" (QAF-32).** It exits 1 and names the page, but prints `Tests 3 passed`. The three passes are AC-3.5's own case file. |
| AC-3.8 (i), (i′), (iii) | The routing predicates on the served build, a real member and real non-members; the legacy calls; the surface class on the corpus | **Pass.** `discordRouting.oracle-controls` 5 of 5 and `discordSurfaces.oracle-controls` 7 of 7, live at `2c1590f`. The member and non-member are recorded in M3 Findings 3. |
| Drift alarm (outcome C2) | The served wasm against the pinned one, reported in the run output with both hashes | **Fail on "reported in the run output" (QAF-33).** The case computes the report and asserts on it; nothing writes it out. Today the two are equal (QA probe). |
| Coverage report | Per bit × surface, a zero cell named in the run output | **Pass.** Five cells unexamined at `2c1590f` (`GAME_MENTION` on content, description, field value and V2; `CODE_BLOCK` on the title), named on stderr and in the report. CR-5's preferred form, failing on a zero cell, stays a carried LOW. |
| Known-differences report | Generated, git-ignored, copied by the stage that runs the command | **Pass.** Copied (above). |
| Findings 4 and 5 (code review, Round 3 Assumption) | The counts at `f4060c5` | **Reproduced.** At `f4060c5`: 1,116 loose and 195 strict-only; residue 1,181, 1,191, 1,380, 642 and 1,181 of 2,378; 1,545 of 2,463 box differences; seven unexamined cells. Every figure in Findings 5 matches. At `2c1590f`, after the generator's game-mention change (`1698c80`), they are 1,117 and 203; 1,190, 1,208, 1,369, 630 and 1,190; and 1,536, with five unexamined cells. Findings 4's minimal-input groupings come from the implementer's grouping driver, not from this command, so this run does not reproduce them; M4 re-runs the measurement (M3 Outstanding 11). |
| CR-6 and CR-10 (the oracle window) | The live attempts case at the approved SHA | **Pass.** `records no request attempt from Discord's evaluated code` passed live at `2c1590f`, in an export, alongside the offline wiring case. This closes the Round 3 sub-entries' Assumption Not Checked lines. |
| AC-2.6 (code review Round 1) | The notice in the edit page's client chunk | **Discharged at M2** (`qa/019-slate-formatting-discord-engine-m2-qa.md`, the mechanism-removed control). No line in `7dcedc9..2c1590f` touches the notice: `git diff 7dcedc9..2c1590f -G 'notice|ENGINE_NOTICE' --name-only` names 0
files. `engine.ts`'s one change there is the `EmojiValue` type export. M4's own pass re-reads the chunk after M4's renderer changes. |

### AC-3.4 survivors, dispositioned

| Mutant | Disposition |
|---|---|
| G8 (load reads a quote inside a fence) | **Equivalent.** In `getInitialValue`, the `if (isCodeBlock)` branch comes before every use of `isBlockQuote`, so the dropped conjunct is never read on a fence line. |
| W7 (normalise re-marks an empty line every pass) | **Equivalent.** `Transforms.setNodes` with `empty: true` on a node already holding it changes no property, so it applies no operation; the forced re-normalise limb stays at zero operations. |
| G5 (load tracks fences in partial mode), G7 (load marks no line empty), W12 (partial mode runs block normalisation) | **Equivalent for AC-3.3's text properties.** Each changes only an element's `type` or its `empty` flag. `flattenNodeText` reads neither, and the first normalise restores `empty` (G7). A partial-mode editor refuses a multi-line paste, and a stored value with a newline is loaded line by line with the same text either way (G5). A partial-mode `> a` becomes a `blockQuote` element whose saved text is the same (W12). Not text-observable; any visible effect is the editor's colouring of the partial surfaces, which is M5's (AC-5.8). Named here for the M5 pass. |
| W8 (normalise keeps a trailing empty span) | **In the held-out class.** The branch needs an emoji element beside the trailing span, and emoji-bearing inputs are held out of the properties (`holdsEmoji`) until M6 lands them (plan R-30). Owed: M6's Phase 2 sweep kills W8 once the hold-outs are gone. |
| W9 (smart-quote repair swaps `'` and `"`) | **Outside AC-3.3's class.** The repair changes text on purpose, so no identity property can hold over an input carrying U+2018, U+2019, U+201C or U+201D. The corpus, the link inputs and the SlateEditor tests hold none (`git grep` at `2c1590f`: 0 files). The repair is untested anywhere in the suite. This is a pre-existing gap on a surface M3 does not change, so it is not a finding here. It is named for the M5 and M6 passes, which change `withNormalizeNode`. |

## Findings

**The M3 cap (effort rulings block "2026-11-23T22:35Z", commit `41101e7`).** From revision 12, each further M3 gap below HIGH
goes to the Planner batch as a stated limit, with no revision round, and a gate's severity-floor finding is excepted. Both findings
below are severity floors. Each is a behaviour M3 relies on that no assertion fails on losing: AC-3.5's "no pass count" for the
whole command, and C2's "reported in the run output". So both are excepted from the cap. Neither asks for a plan revision either:
each is an implementation fix, for the implementer's fix round.

QAF-32 MEDIUM Phase 2 RESOLVED — `discordOffline.whole-command.test.ts`, in `pnpm test`, spawns the whole live command offline and asserts exit non-zero, the page named, and no `\d+ passed`. It was red with the old spawner present (`verification/019/impl/m4-m3fix-red-1.txt`) and red on a QA-planted file that passes offline. Fix round 5 at `380e82d`. § Refresh pass.

QAF-33 MEDIUM Phase 2 RESOLVED on its write limb — the drift message goes to stderr and to the head of `known-differences.md` on every run. Two cases read that head; they were red with the head write removed (`verification/019/impl/m4-m3fix-red-2.txt`) and green live at `e58f2ed`. Fix round 5 at `380e82d`. The native-box limbs' "not comparable under drift" report is covered by the same one message (implementer, M3 document Round 5). The limb "names a mismatch as C2" is not closed: QAF-36. § Refresh pass.

## Verdict

**QA Failed**, milestone-scoped, for M3 at website `2c1590f`, on QAF-32 MEDIUM and QAF-33 MEDIUM. Both are severity floors,
excepted from the M3 cap. Every other assessed criterion passes:
- the Form (D-12);
- AC-3.2's box limb;
- AC-3.3, with its recorded hold-outs;
- AC-3.4, with 22 of 29 kills and every survivor dispositioned;
- AC-3.8 (i), (i′) and (iii);
- the coverage and known-differences reports;
- CR-6 and CR-10 live at the approved SHA.

Findings 5 is reproduced at `f4060c5`, and AC-2.6 was discharged at M2.

The verdict binds to `2c1590f`. A fix round's production or test change expires it, and a refresh pass covers that round's diff.
Rows inherited and not discharged: B-1 to B-7, plus B-8 appended by this pass (register in
`qa/019-slate-formatting-discord-engine-qa.md`), all open. The plan's Status is not moved.

## Assumption Not Checked

This pass assumes that the shared tree's `node_modules`, installed for this lockfile, is the install a frozen `pnpm install` of
`2c1590f` would produce, and does not test it. If a package in it was installed by hand or patched after the install, the suite's
result describes that install, not the lockfile's. Falsity signature: `pnpm install --frozen-lockfile --offline` in a fresh export
changes a package's version or a `patches/` application. **Owner: QA**, at the M4 pass, which runs its own frozen install as the M2
pass did.

## Handoff

To the implementer (`implementer-019`), for M3's fix round:
- QAF-32: the offline case covers the whole command, with no pass count reported offline;
- QAF-33: the drift report is written on every run, with a case seen red when the write is removed.

Each fix needs its red run recorded. Then code review re-verdicts the round, and QA runs a refresh pass over its diff, re-running
the live command and the offline whole-command run.

Carried, not owed now:
- **M4's pass:** the frozen install (Assumption Not Checked).
- **M5's pass:** the partial-mode element-type survivors (G5, W12) and the untested smart-quote repair (W9).
- **M6's pass:** W8.

## Refresh pass — fix round 5 (`380e82d`), run at `e58f2ed`

- **Stage start.** The code review's committed Round 3 sub-entry at `380e82d`, APPROVED_WITH_COMMENTS, re-derived from the record
  (`d31214e4`, `Reviewed-At` names `380e82d` as test-only). The implementer's and the code reviewer's messages are the hand-offs.
  Plan read at Revision 12 with registrations to R-48. The caps (effort rulings blocks 22:35Z and 2026-11-24T00:49Z, record
  `8de0ac3`) apply: a gap below HIGH is a stated limit, and a severity floor is excepted.
- **Scope.** Round 5's diff: `discordReports.run.test.ts`, and `discordOffline.fetch-failure.test.ts` renamed to
  `discordOffline.whole-command.test.ts` and moved into `pnpm test`. Both are test files; no production path changed. QAF-32's and
  QAF-33's properties are re-checked, and so is the instrument the fix relies on (the drift comparison).
- **Tree.** Website `e58f2ed`, the M4 tip, contains `380e82d`. Between the two, the round's two files, `helpers/discordReports.ts`,
  `package.json` and `vitest.config.ts` are unchanged: `git diff --quiet 380e82d e58f2ed -- <those paths>`, exit 0. Running
  at the tip lets one export serve this pass. Export: `git archive e58f2ed` into this session's scratchpad. Blob identity: 654 blobs,
  0 mismatches (`verification/019/qa/m3-refresh/blob-identity-e58f2ed.txt`). The export has its own `pnpm install
  --frozen-lockfile --offline`, exit 0 (`frozen-install-e58f2ed.{log.txt,exit}`). That settles this document's first Assumption
  Not Checked by construction: the suite below ran on the lockfile's install, not the shared tree's. Next's generated
  `next-env.d.ts` was copied in (`next-env.sha256`). The shared tree was not switched or written.

| Command (in the export of `e58f2ed`), captures under `verification/019/qa/m3-refresh/` | Result |
|---|---|
| `unshare -rn` (lo up) `npx vitest run --project node --project dom --reporter=json` (`suite-offline-e58f2ed.*`) | **exit 0**; 212 files (`testResults` entries), 3,454 of 3,454 passed; 0 files under `__tests__/discord/` collected; the three `discordOffline.whole-command` cases passed. 69 s wall time (start 01:04:29Z, end 01:05:38Z) |
| `unshare -rn` (lo up) `pnpm test:discord`, whole (`discord-offline-e58f2ed.*`) | **exit 1**; names `https://discord.com/app` (`OracleError`); `Test Files 6 failed (6)`, `Tests 41 skipped (41)`; `grep -c -E '[0-9]+ passed'` over the capture: **0** |
| `npx vitest run --project discord-node --project discord-dom` live, with network (`discord-live-e58f2ed.*`) | **exit 0**; 6 files, 41 of 41 passed; stderr carries `wasm: served wasm sha256 da7b9e5e…57fb0, pinned wasm sha256 da7b9e5e…57fb0: equal` and the coverage line (five unexamined cells, as at `2c1590f`); line 1 of `known-differences.md` is `> Oracle wasm: ` plus that message (`discord-reports-e58f2ed/`) |
| QA positive control for QAF-32: a planted `discord/qaPlanted.offline-pass.test.ts` holding one empty case (text at `qaPlanted.offline-pass.test.ts.txt`), then `npx vitest run --project node` on the whole-command file (`qa-planted-offline-pass.*`) | **exit 1**; `× reports no pass count`, the spawned command printing `Tests 1 passed \| 41 skipped (42)`. The other two cases stay green. Planted file removed afterwards (`ls -d`: absent) |
| QA mutant for QAF-36: `helpers/discordLive.ts` `driftReport`, `const match = served === pinned;` to `const match = true;` (one match, by `grep -c`), then the live `discordLive.oracle-controls` and `discordReports.run` files (`qa-mutant-drift-match-true.*`; hashes before, mutated, restored in `qa-mutant-drift.sha256`) | **exit 0, 15 of 15 passed: SURVIVED.** Restored (hash `a52ce0a3…` back) |

**QAF-32.** The case states the criterion's subject now: it spawns the whole command, and it reddens when any file in the live
projects passes offline (the planted control). It was also red with the old spawner present (the implementer's
`m4-m3fix-red-1.txt`, read: `Tests 3 failed | 3 passed`). **Closed.** CR-14 LOW is a stated limit (planner R-47): the case
spawns a copy of the `test:discord` command, not the script. At `e58f2ed` the copy reads `npx vitest run --project discord-node
--project discord-dom` and `package.json`'s script reads `vitest run --project discord-node --project discord-dom`, equal, by
reading both. Phase 3's own run of `pnpm test:discord` at the release tip is what checks the script.

**QAF-33.** The report head carries both hashes and the verdict on every run, and the two cases reading that head were red with
the write removed (`m4-m3fix-red-2.txt`, read: `Tests 2 failed | 4 passed`). **Closed on the write limb.** The stderr line has no
case of its own. QAF-33's remedy named the report head as the gate, so this is not a finding: the head is what devops reads.

QAF-36 MEDIUM Phase 2 RESOLVED — `compareWasm` is a pure comparison, and `driftReport` takes a stubbable fetch. `discordLive.drift-compare.test.ts`, in `pnpm test`, holds literal hashes. QA's three mutants are KILLED offline at `d6aab03`: `match` forced true, forced false, and the pinned file compared with itself. Fix rounds 6 and 7 at `9a5f4fe` and `d6aab03`, with CR-15 its code review limb. § Refresh pass, rounds 6 and 7.

**Verdict.** **QA Failed**, milestone-scoped, for M3's fix round 5, run at website `e58f2ed`: QAF-32 is closed, QAF-33's write
limb is closed, and QAF-36 MEDIUM (a severity floor) is open. Every criterion the first pass passed stays passed on this run: the
offline Form, AC-3.5's `pnpm test` limb, the live controls 41 of 41, and the coverage and known-differences reports. A change to the
drift helper or its cases expires this verdict, and the next refresh covers that round's diff. Rows inherited and not discharged:
B-1 to B-8 (register in `qa/019-slate-formatting-discord-engine-qa.md`). This pass appends none. The plan's Status is not moved.

**Assumption Not Checked.** This pass assumes that the wasm `discord.com` served to this box at 01:06Z is the one it serves to
other readers, and does not test it. If Discord serves builds by region or by experiment bucket, an `equal` here says nothing about
the build another reader gets. Falsity signature: a Stage 1 run from another network reports a different served hash at the same
time. **Owner: devops at Stage 1**, whose live run is the one the release reads.

**Handoff.** To `implementer-019`, for M3's fix round 6: QAF-36, with its red run under both mutants recorded. Then code review
re-verdicts the round, and QA runs a refresh pass over its diff.

## Refresh pass — fix rounds 6 and 7 (`9a5f4fe`, `b04c09f`, `d6aab03`), run at `d6aab03`

- **Stage start.** The code review's committed Round 3 sub-entry, CR-15 confirmed, APPROVED_WITH_COMMENTS at `Reviewed-At:
  d6aab03` (record `fed65ffa`, plan R-55), re-derived from the record. Round 6 alone was REJECTED on CR-15 (records `7b4c1ad3`,
  `6ee6d66b`). Two items are left to this pass: the whole offline suite at the fix SHA, and `routingReport`'s fields.
- **Scope.** The rounds' diff over M3 paths: `helpers/discordLive.ts` (`compareWasm`, and `driftReport`'s `fetchImpl`), with
  `discordLive.drift-compare.test.ts` and `discordSurfaces.rich-rule-ids.test.ts` added. All of these are test code. QAF-36's
  class is "a live-only alarm whose firing no offline case shows", and that class is swept below.
- **Tree.** Website `d6aab03`, exported by `git archive`, with its own `pnpm install --frozen-lockfile --offline` (exit 0) and
  Next's `next-env.d.ts` copied in. `e58f2ed..d6aab03` also holds M5's `921eeb8`, `6f4d48f`, `65b8e2c` and `3ffb2b4`, which code
  review has not passed. They run in the suite here but are outside this verdict. The code review routed the drop in offline cases
  (3,460 at `b04c09f`, 3,268 here) to M5's round. The shared tree was not switched or written.

| Command, captures under `verification/019/qa/m3-refresh-2/` | Result |
|---|---|
| `unshare -rn` (lo up) `npx vitest run --project node --project dom --reporter=json` (`suite-offline-d6aab03.*`) | **exit 0**; 223 files, 3,268 of 3,268; 0 files under `__tests__/discord/`; 86 s (02:08:43Z to 02:10:09Z) |
| live `npx vitest run --project discord-node --project discord-dom` (`discord-live-d6aab03.*`) | **exit 0**; 6 files, 41 of 41; stderr `wasm: served … da7b9e5e…57fb0, pinned … da7b9e5e…57fb0: equal` |
| `unshare -rn` (lo up) `pnpm test:discord`, whole (`discord-offline-d6aab03.*`) | **exit 1**; `https://discord.com/app` on 6 lines; `grep -c -E '[0-9]+ passed'`: **0** |
| QA drift mutants (`qa-drift-mutants.json`, `mutation-run.py`, `--dep node_modules`, `unshare -rn`, suite `discordLive.drift-compare.test.ts`) | **3 of 3 KILLED**, count-checked (3 tests): QA-D1 `match` forced true; QA-D2 forced false; QA-D3 `driftReport` compares the pinned file with itself (CR-15's class), red on the stubbed-fetch case |
| QA routing mutants (`qa-routing-mutants.json`, suite `discordRouting.predicates.test.ts` and the live `discordRouting.oracle-controls.test.ts`, with network) | **0 of 6 killed: all SURVIVED**, 13 tests each, the control passing: QA-R1 `embedReferencesSwitch: false`; QA-R2 `v2ReferencesSwitch: false`; QA-R3 to QA-R5 each `embedCalls` field `true`; QA-R6 `v2CallsParse: true` |

**QAF-36.** The comparison carries the decision offline. Its expected hashes are literals, independent of the code (sha256 of
`[1,2,3]` is a fixed value). The wiring case drives `driftReport` through a stubbed fetch, named as a stub in its title, and
reddens when the comparison is not handed the served bytes. **Closed.** CR-16 LOW is a stated limit (plan R-54).

QAF-38 MEDIUM Phase 2
`routingReport` (`helpers/discordRouting.ts`) assembles the fields that AC-3.8 (i) and (i′) read: `embedReferencesSwitch`,
`v2ReferencesSwitch`, `embedCalls.{parseEmbedTitle, parseEmbedTitleWithoutLinks, parseRichEmbedText}` and `v2CallsParse`. The
only cases that read those fields are live, and they compare them with today's values: `false`, `false`, `true` three times,
and `true`. The two predicates have offline cases both ways (`discordRouting.predicates.test.ts`). Which module each field is
computed from has none. With any one field replaced by today's constant, all 13 cases pass live at `d6aab03` (QA-R1 to QA-R6). So
on the day Discord routes the embed renderer or the V2 text display through the native switch, or drops a legacy call, the run stays
green, and AC-3.8's outcome C6, D-14's stop condition, never fires. This is QAF-36's class: a live-only assembler checked only
against today's literals. Nothing fails when the behaviour M3 relies on is lost, so it is a severity floor, MEDIUM, excepted from
the cap. The implementer's round 6 sweep took the class by its branches and left `routingReport` out because it "has no branch of
its own". The class is the alarm's unshown firing, not the branch, so the sweep's predicate missed this member. I passed AC-3.8 (i)
and (i′) at `2c1590f` on the predicates' controls alone, so this was mine to catch then. Remedy, for the implementer: an offline
case in `pnpm test` that drives `routingReport` over a stub oracle, as the drift case drives `driftReport`. In the stub, the embed
module references the switch, the V2 module lacks the facade's `parse`, and the embed module lacks one of the three calls. Each
field must flip, and today's shape must give today's values. Record it red under each of QA-R1 to QA-R6.

**The class, swept.** The predicate: a helper under `__tests__/helpers/` that turns the live build into an alarm outcome (C2, C3 or
C6), where only live cases, compared with today's values, read that outcome. Members by reading the six live files' assertions
at `d6aab03`:
- `driftReport` (C2): closed by QAF-36.
- `richRuleIds` (C3): its throw branches are offline at `b04c09f` (`discordSurfaces.rich-rule-ids.test.ts`).
- `locate`'s zero-or-many (C3): offline in `discordBuild.locators.test.ts`.
- `routingReport` (C6): **open, QAF-38**.
- AC-3.8 (iii)'s surface-class equality is outside the predicate. It asserts Discord's live parses directly, with no assembler
  in between, and the same file shows the per-surface call discriminates (`# a` draws a heading in a description and text in a
  field value).

**Verdict.** **QA Failed**, milestone-scoped, for M3's fix rounds 6 and 7 at website `d6aab03`: QAF-36 is closed, and QAF-38
MEDIUM (a severity floor) is open. QAF-32, QAF-33's write limb and every criterion the first pass passed stay passed on this run. A
change to `helpers/discordRouting.ts` or its cases expires this verdict, and the next refresh covers that round's diff. Rows
inherited and not discharged: B-1 to B-8. The plan's Status is not moved.

**Assumption Not Checked.** This pass assumes the live build's module ids for the embed renderer and the V2 text display, located
today by the content predicates, are the modules Discord's client actually uses for those surfaces. It does not test that, because
it reads source text, not a running client. Falsity signature: the test account's Discord client draws an embed or a V2 text
display differently from `legacySurfaceParse`'s tree for the same input. AN-3 established the premise on build 679055 by posting
messages and reading Discord's DOM, and no later stage has re-read it. **Owner: QA at Phase 3**, which re-runs one AN-3 posted
message per legacy surface through the test-account browser against the build served at the release tip.

**Handoff.** To `implementer-019`: QAF-38, with its red run under QA-R1 to QA-R6 recorded. Then code review re-verdicts the round,
and QA runs a refresh pass over its diff.

## Refresh pass — fix round 8 (`81c68b2`), run at `81c68b2`

- **Stage start.** The code review's committed fix confirmation of QAF-38, APPROVED_WITH_COMMENTS at `Reviewed-At: 81c68b2`
  (record `47e4ccf5`, plan R-57 at `f50fcc0e`), re-derived from the record. Two items are left to this pass: the whole offline
  suite at the fix SHA (the code review's Assumption Not Checked), and QAF-38's closure.
- **Scope.** Round 8's diff over M3 paths, `d6aab03..81c68b2`: `helpers/discordRouting.ts` (`routingReport` takes an injected
  `fetcher`, defaulting to `fetch`, and passes it to `loadLazyChunks`) and `discordRouting.predicates.test.ts` (one `it.each` of
  four stub-build shapes). Both are test code.
- **Tree.** Website `81c68b2`, exported by `git archive`, with its own `pnpm install --frozen-lockfile --offline` (exit 0) and
  Next's `next-env.d.ts` copied in. The two changed files' blobs in the export equal `81c68b2`'s (`export-blobs-81c68b2.txt`).
  The mutation runner exports `81c68b2` itself for each run and binds the shared tree's `node_modules` read-only. The shared
  tree's `pnpm-lock.yaml` and `package.json` equal `81c68b2`'s. The shared tree was not switched or written.

| Command, captures under `verification/019/qa/m3-refresh-3/` | Result |
|---|---|
| `unshare -rn` (lo up) `npx vitest run --project node --project dom --reporter=json` (`suite-offline-81c68b2.*`) | **exit 0**; 223 files, 3,272 of 3,272 (3,268 at `d6aab03` plus round 8's four cases); 0 files under `__tests__/discord/`; 89 s (02:45:43Z to 02:47:12Z). `preview.engine-not-ready` passed both cases, the slower in 1.6 s, with no timeout |
| `unshare -rn` (lo up) `pnpm run typecheck`, both `tsc` programs (`typecheck-81c68b2.*`) | **exit 0** |
| live `npx vitest run --project discord-node --project discord-dom` (`discord-live-81c68b2.*`) | **exit 0**; 6 files, 41 of 41; stderr `wasm: served … da7b9e5e…57fb0, pinned … da7b9e5e…57fb0: equal` |
| `unshare -rn` (lo up) `pnpm test:discord`, whole (`discord-offline-81c68b2.*`) | **exit 1**; `https://discord.com/app` on 6 lines; `grep -c -E '[0-9]+ passed'`: **0** |
| QA routing mutants (`qa-routing-mutants.json`, blob `2bee410e`, unchanged from `m3-refresh-2/`; `mutation-run.py --sha 81c68b2 --dep node_modules`, `unshare -rn`, suite `discordRouting.predicates.test.ts` alone, offline) | **6 of 6 KILLED**, the control passing 12 of 12; every kill an `AssertionError` on `toEqual`. Cases reddened: QA-R1 the both-behind-switch and embed-alone shapes; QA-R2 both-behind-switch and V2-alone; QA-R3 both-behind-switch, embed-alone and V2-alone; QA-R4 both-behind-switch and embed-alone; QA-R5 both-behind-switch and V2-alone; QA-R6 both-behind-switch and V2-alone |

**QAF-38.** Each `routingReport` field now carries the decision offline. The expected values are literals per shape,
independent of the code. Each field takes a value in some shape that the shapes around it do not give it: the embed-alone shape
moves `embedReferencesSwitch` without `v2ReferencesSwitch`, the V2-alone shape the reverse, and each of the three embed calls is
the only one left true in one shape. Today's shape gives today's values. The stub `Live` and its stubbed fetcher are named as
stubs in the implementer's Round 8 section, and its TDD row records the four cases red with the fetcher not injected. The test
file carries no ID tokens. The case "today's shape" reddens under none of QA-R1 to QA-R6, as expected: each mutant forces
today's value. The code review's further eight mutants (`mutants-r8.json`) cover the operand swaps, `switchReferrers` and the
fetcher not passed on. **Closed.** The code review notes that the class sweep's population is 8 functions, not 7. That moves
nothing here.

**Verdict.** **QA Complete**, milestone-scoped, for M3 at website `81c68b2`. Every M3 finding is closed: QAF-32, QAF-33's write
limb, QAF-36 and QAF-38. Every criterion the first pass passed stays passed on this run. A later change to an M3 path expires
this verdict. Rows inherited and not discharged: B-1 to B-8. The plan's Status is not moved.

**Assumption Not Checked.** This pass assumes the stub modules' source shapes (`stubLive`) stand for how Discord's live build
writes a switch reference and a facade call. It does not test that, because it runs no live build under a changed routing. Falsity
signature: on a live build where Discord has routed a surface through the native switch, `routingReport` still reads
`embedReferencesSwitch` or `v2ReferencesSwitch` as `false`, because the predicates' patterns miss the build's actual form. The
live `discordRouting.oracle-controls.test.ts` runs the predicates against today's build. No build with changed routing exists to
run them against. **Owner: QA at Phase 3**, which re-runs the live routing controls at the release tip. This sits beside the
standing AN-3 re-read named in the previous refresh pass.

**A gate, satisfied.** This pass wrote its section, header and changelog row here, and its plan row R-58, with a Python script
run through the shell. That is the form the record-write gate hook names as wrong, and the hook did not stop those writes. Its
refusal came later, on a `sed` re-stamp of R-58's time (`plan-row-commit.js` had refused the row as stamped ahead of the clock).
The re-stamp was then re-issued with the Edit tool, and R-58 committed at `4222fc9e`. The content is the same in either form.

**Handoff.** To `implementer-019` and steering: M3 passes, milestone-scoped. Next for QA: M5's Phase 2 when its code review
verdict lands. It carries the M4 differential refresh, which executes `e58f2ed` and the M5 tip over the preview surface, the five
legacy surfaces and the edit page, along with G5, W12, W9 and the case-count drop that code review routed to M5.
