---
ID: 019
Origin: 019
UUID: 286c730a
Verified-At: "2c1590f — repos=website; M3 paths at the code review's Round 3 sub-entry Reviewed-At, run in a git-archive export with the shared tree's install linked (lockfile identical); the tree also holds M4's 93b26fd, f131f06, c32e058, outside this verdict"
Status: QA Failed
Status-Detail: >-
  M3 at website 2c1590f fails, milestone-scoped, on QAF-32 MEDIUM (AC-3.5: offline, the whole command reports a pass count) and
  QAF-33 MEDIUM (the drift alarm writes nothing to the run output). Both are severity floors, excepted from the M3 cap. Every other
  assessed criterion passes. A fix round is owed to the implementer, then a refresh pass. Register row B-8 appended.
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

QAF-32 MEDIUM Phase 2
AC-3.5 says that in the loopback-only namespace, `pnpm test:discord` "exits non-zero, naming the fetch, and reports no pass count".
Run whole at `2c1590f` (`discord-offline-2c1590f.log.txt`), it exits 1 and names `https://discord.com/app`, and it prints
`Test Files 5 failed | 1 passed (6)` and `Tests 3 passed | 35 skipped (38)`. The three passes are
`discord/discordOffline.fetch-failure.test.ts`, the case that states AC-3.5. It spawns only the controls file
(`discordLive.oracle-controls.test.ts`) in the namespace and asserts no pass count there, so it stays green while the command it
stands for reports one. It is therefore not discriminating for the criterion's subject: it cannot fail when the command prints a pass
count, because it is the source of that count. The property: a C1 run of the gate, the run devops and QA read, shows no count a reader
can take for a pass. The failure in operator terms: a Stage 1 run without network reads `3 passed` beside the failures. Remedy, for
the implementer: move the case into `pnpm test` (it already spawns its own namespace, so the offline suite can hold it) and have it
spawn the whole `pnpm test:discord`, asserting exit non-zero, the page named, and no `\d+ passed` in that output. Then
`test:discord` offline reports no pass, and the case would go red if one file came to pass offline. The planner may instead narrow the
criterion; either closes it. Seen red: the case's assertion `expect(output).not.toMatch(/\d+ passed/)`, applied to the whole
command's output, fails on `Tests 3 passed` (the capture above).

QAF-33 MEDIUM Phase 2
M3's outcome table says a drift alarm (C2) is "reported in the run output with both hashes", and devops at Stage 1 writes an upgrade
handoff from it. At `2c1590f`, `discordLive.oracle-controls.test.ts` "the drift alarm" computes `driftReport(live)` and asserts that
its `message` holds both hashes, but nothing writes the message to the run output or a report. `git grep` over the test tree finds no
writer of `report.message`, and `known-differences.md` and `coverage.md` contain no hash (`grep -ic "da7b9e5e|drift"`: 0 and 0). The
live run's whole stdout and stderr hold only the coverage line (`discord-live-2c1590f.log.txt`, 2 lines). So under drift the command
stays green and silent: "says the two are equal exactly when their hashes are" passes whichever way they compare. A served wasm that
moved would reach no one, and no upgrade handoff would be written. Discord's release interval is 2 to 12 days, by the plan's own
reading. Today the hashes are equal; a QA probe printed the report (`qaDriftProbe-2c1590f.log.txt`: served and pinned both
`da7b9e5e…57fb0`, `equal`). The property: the run output names both hashes on every run, and names a mismatch as C2. The same holds
for the native-box limbs' "not comparable under drift" report, which has no writer either. Remedy, for the implementer: write the
drift message to stderr on every run, the way `discordReports.run.test.ts` writes the unexamined cells, and add it to the
known-differences report's head. A case seen red when the write is removed, for example one that reads the report file's head for
both hashes, makes it a gate.

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
