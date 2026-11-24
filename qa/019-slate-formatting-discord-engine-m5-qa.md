---
ID: 019
Origin: 019
UUID: 286c730a
Verified-At: "2e36107 — repos=website; M5's production source at 2e36107 with cf126ea's four test paths laid over it (QAF-39's fix round, test-only), the tree code review approved (record 79f96321) and steering named (block 05:14Z). Manifest: verification/019/qa/m5-refresh-qaf39/overlay-manifest.txt (668 of 668 paths at their expected blobs). The cf126ea tip's M6 commits are outside this verdict"
Status: QA Complete
Status-Detail: >-
  Refresh over QAF-39's fix round (cf126ea, test-only), run on 2e36107 with the round's four test paths laid over it. QAF-39 is
  closed: m5-d2 is KILLED by `decorator.native-box-classes` on x8. Offline 3,280 of 3,280, typecheck exit 0, live 41 of 41.
  M5 passes, milestone-scoped; AC-5.5 is UAT's (B-3). The plan's Status is not moved.
Phase: 2
---

# QA Report: 019 — M5, the editor's colouring on `parseLossless` (Phase 2)

**Plan Reference**: `agent-output/planning/019-slate-formatting-discord-engine.md`, Revision 14 (record `2c3c8d1a`). M5's criteria
are unchanged since Revision 12. Revisions 13 and 14 move AC-6.5, AC-6.7 and AC-3.3's typed drive, which M6 delivers.
**Code review**: `code-review/019-slate-formatting-discord-engine-code-review.md`, Round 5, APPROVED_WITH_COMMENTS at
`Reviewed-At: 2e36107` (record `fdb41883`; the plan registers CR-17 to CR-19 at R-61).
**Implementation**: `implementation/019-slate-formatting-discord-engine-m5-implementation.md` (`Handoff-At: 2e36107`, record
`b9e9247c`).
**Blocking-condition register**: the chain's one register, in `qa/019-slate-formatting-discord-engine-qa.md`. This pass appends no
row. B-3 (AC-5.5) is M5's row left open for UAT.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-24T04:12 | code-reviewer-019 (message: M5 APPROVED_WITH_COMMENTS at `2e36107`, record `fdb41883`) | QA Phase 2 on M5, with the M4 differential refresh, G5, W12, W9 and the case-count drop | Phase 2 at `2e36107` in an export. The TDD gate passes. Offline 3,280 of 3,280 over 224 files, exit 0. Typecheck exit 0. Live 41 of 41, exit 0. `next build` exit 0. The M4 differential: 14,280 preview rows, 0 moved, and the planted control moves 2,356. **QAF-39 MEDIUM** (a severity floor): survivor m5-d2 is separated by `>>> a\n> _\n> _b_`. Verdict **QA Failed**, milestone-scoped. Disclosed: one read was not completed and was re-issued as exact-path reads (§ Scope); my brief to the quote-probe walker named any channel, not `#slate-oracle-walk` (reconcile line in `verification/019/qa/discord-quote-probe/walk.md`). |
| 2026-11-24T05:19 | code-reviewer-019 (message: QAF-39 fix APPROVED_WITH_COMMENTS, Round 5 sub-entry at `cf126ea`, record `79f96321`); steering-hooks-fixer (block 05:14Z, record `3184b3b5`: run on the approved tree) | Refresh pass over QAF-39's fix round | § Refresh pass — QAF-39 fix round. Overlay of `2e36107` with `cf126ea`'s four test paths, 668 of 668 blobs as expected. Frozen offline install exit 0. Offline 3,280 of 3,280 over 224 files, exit 0. Typecheck exit 0. Live 41 of 41, exit 0, with `discordBoxes.oracle-controls` 10 of 10. m5-d2 **KILLED** on x8. **QAF-39 closed.** Verdict **QA Complete**, milestone-scoped. |

## Scope and stage start

- **Stage start.** The code review's committed Round 5 verdict, APPROVED_WITH_COMMENTS at `Reviewed-At: 2e36107` (record
  `fdb41883`), re-derived from the record.
- **Rulings.** The cap on M4 to M6 (effort rulings block 2026-11-24T00:49Z): a gap below HIGH is a stated limit with no fix round,
  and a severity floor is excepted.
- **Criteria assessed, fixed before execution.** AC-5.1 to AC-5.8 (AC-5.5 is UAT's B-3 walk). Also: the M4 differential refresh
  (the M4 document's 02:09 reconcile); the M3 survivors G5, W12 and W9 named for this pass; the case drop from 3,460 to 3,268 that
  code review routed here; the implementer's `visibleForm` claim (CR-17); CR-18's unmeasured population; the self-check sweep's
  remaining survivors.
- **Tree.** Website `2e36107`, exported with `git archive` into this session's scratchpad. Its 668 tracked blobs equal the
  export's files, 668 of 668. It has its own `pnpm install --frozen-lockfile --offline` (exit 0) and Next's `next-env.d.ts`
  copied in. A second export of `2e36107` holds QA's probes, and a third export is of `e58f2ed`. Captures are under
  `verification/019/qa/m5/`. The shared tree was not switched or written.
- **Irreversible Side-Effect Register.** M5 changes no guard of E-1 to E-9. Its production diff (13 files under
  `SlateEditor/` and the six call sites) touches none of `flattenNodeText`, `messageDrafts`, `getInitialValue` or
  `withNormalizeNode`. `git diff -G` over the save, fetch, storage and Pusher forms names 0 files
  (`iser-diff-e58f2ed-2e36107.txt`). E-4 (the preview image) follows the preview render, which the differential below shows did
  not move. No register sweep is owed. The effort-final sweep stays owed over `5ec0621..<final tip>`.
- **A read not completed.** One search over the probe export, written as a relative path after a `cd`, was not completed. It was
  re-issued as reads of exact files inside the export, as the brief's standing rule allows, and steering was told.

## TDD compliance gate

**Passes.** Every new function or class has a row: `styleUnit`, `decorator`, `SlateEditor`'s `surface` prop, `scanHighlight`,
`codeLineRanges` and the parse cache. Each has a red at assertion level. The two `Cannot find module` reds are each the first row
of their file, and the later rows of those files show AssertionErrors (`m5-red-1.txt` to `m5-red-5.txt`, read). `decorator`'s
first red is a TypeError against the old signature (`m5-red-2.txt`). Its assertion-level reds are m5-d1 and m5-d3, both failing
`decorator.native-box-classes` on its offenders list (`m5-d1.txt`, `m5-d3.txt`, read).

The rows marked "No" for test-first are new test files over a function whose own row is test-first. The exceptions are the parse
cache (`stylesOf`), the pending gates and the call sites:
- The parse cache's red is the uncached form, `to have a length of 1 but got 51` (`m5-p1.txt`). AC-5.7 itself names that form as
  the red. I accept it as the cache's stub-tree equivalent.
- The pending gates and the call sites are wiring, with no function to stub. Each is red under its own mutant. That is the
  standard M4's row 3 was accepted on.
- The emoji-split row carries a stub-tree red: 4 of 19 cases failing at assertion level, green 19 of 19.

## Execution

| Command (exports as above) | Result | Capture |
|---|---|---|
| `unshare -rn` (lo up) `npx vitest run --project node --project dom --reporter=json` | **exit 0**; 224 files, 3,280 of 3,280; 0 files under `__tests__/discord/`; 71 s | `suite-offline-2e36107.*` |
| `unshare -rn` `pnpm run typecheck` (both programs) | **exit 0** | `typecheck-2e36107.*` |
| live `npx vitest run --project discord-node --project discord-dom` | **exit 0**; 6 files, 41 of 41. `discordBoxes.oracle-controls` reads `NATIVE_BOX_FROZEN`, the table `decorator.native-box-classes` freezes, against the live box | `discord-live-2e36107.*` |
| `unshare -rn` `pnpm test:discord`, whole | **exit 1**; `https://discord.com/app` on 6 lines; `grep -c -E '[0-9]+ passed'`: 0 | `discord-offline-2e36107.*` |
| `SKIP_ENV_VALIDATION=1 pnpm run build` | **exit 0** with the network. The first run was network-isolated and failed only on `next/font` fetching Inter, which M4's build at `e58f2ed` also fetched | `build-2e36107.*`, `build-2e36107-offline.*` |
| **M4 differential**: `qaPreviewDump.probe.test.tsx` (sha256 `1bd44342…f5a`, the same file in both exports) mounts `previewParser(surface)` for the 6 surfaces × (2,378 inputs + 1 control) and hashes `innerHTML` | **0 of 14,280 rows differ** between `e58f2ed` and `2e36107`. 14,274 rows are non-empty at each tree, and the keys are identical. **Positive control on the same instrument**: `preview.tsx`'s bold arm planted as `<b>` at `2e36107` moves **2,356** rows. The file was restored, and its blob equals `2e36107`'s (`22e14dd5`) | `qaPreviewDump-*.{json,log.txt,exit}` |
| QA probe, survivor m5-d2: `qaQuotePrefix.probe.test.ts` compares the real `decorator` with a copy that leaves the quote prefix out (`qaDecoratorNoPrefix.tsx`, the one-line mutant), over 6 surfaces × (28 candidates + the 2,378 inputs) through `getInitialValue` | **exit 0**; 1,852 surface-and-input rows hold a quote element; **8 rows differ**: `>>> a\n> _\n> _b_` (a QA candidate) and `gen:181`, each on content, embedDescription, fieldValue and v2Text | `qaQuotePrefix-2e36107.{json,log.txt,exit}`; the probe and the copy: `qa-probes/` (below) |
| M3's G5 and W12 (`qa-m3-carried-mutants.json`, blob `759e7932`), `mutation-run.py --sha 2e36107 --dep node_modules`, `unshare -rn`, suite `src/components` | **G5 KILLED; W12 SURVIVED** | `qa-m3-carried-mutants-*` |
| Code review's two inline-code mutants (`qa-inline-code-mutants.json`, blob `c3323b0c`), suite the two files it named | **2 of 2 KILLED**, the control passing 65 of 65: text dropped reddens one case in each of `preview.engine-tree-render` and `canonFromDom.element-map`; element not `code` reddens 1 and 2 | `qa-inline-code-mutants-*` |
| The `visibleForm` claim at `e58f2ed`: `qaVisibleFormCode.probe.test.tsx` | **Reproduced.** `visibleFromDom(drawnDom('embedDescription', '`a`'))` is `[]`. `x `ab` y` gives `x`, ` `, ` `, `y`. Control: `**a**` gives `a` styled `b` | `qaVisibleFormCode-e58f2ed.*` |
| Case counts by path membership, `e58f2ed` (M3 refresh JSON) against `2e36107` | 3,454 in 212 files to 3,280 in 224. Removed: `decorator.emphasis-syntax-ranges` (262). Added: 11 M5 files (75) and two M3 files (7). Changed: the desktop editor test 2 to 4, and `discordRouting.predicates` 8 to 12. 3,454 − 262 + 77 + 11 = 3,280. The three `bot/` rows differ only by their export prefix | `case-reconcile-e58f2ed-2e36107.txt` |
| ID-token scan, the workspace class, over the 20 test files `e58f2ed..2e36107` adds or changes | **0 hits.** Positive control on the same run: 3 of 3 planted (a basename, a title, a comment; `v2` is not a token) | `id-token-scan.py`, `id-token-scan-2e36107.txt` |

`preview.engine-not-ready` failed once, in the first inline-code mutant control, because "draws nothing while the engine is
pending" hit vitest's default 5,000 ms in `fresh()`'s `vi.resetModules()` and re-import. That control ran 117 files at once
(`qa-inline-code-mutants-out-broad/`). Run alone five times, it passed 5 of 5 (`engine-not-ready-isolated-*.log.txt`), and it
passed in the whole-suite run. It does not test a timeout. It is a load-sensitive setup, so per the resumption note's rule (raise
it only if it fails isolated) it is not raised. It is recorded here because the effort's sweeps run it under load.

## Criteria

| Criterion | How it was checked | Result |
|---|---|---|
| AC-5.1 | `decorator.native-box-classes` against the frozen box over every frozen typed and corpus input. The frozen table is read live by `discordBoxes.oracle-controls` (41 of 41). AC-5.8's limb is below | **Pass** on the frozen set. QAF-39: the frozen set has no member of the quote-prefix class |
| AC-5.2 | `decorator.emoji-split-invariance`, 19 cases; stub-tree red; m5-d4 and m5-d5 killed | **Pass.** Emoji elements are the only inline element (P-7), so they are the only way text nodes split. A decorator leaf is a range inside one text node, and its classes are cut from the unit's per-character list |
| AC-5.3 | `decorator.range-bounds`, 6 surfaces × 2,378 inputs; `decorator.code-line-scopes`, which asserts `listLanguages()` has length 193 and checks bounds over every language and snippet | **Pass.** m5-r1 to r3 killed |
| AC-5.4 | `decorator.code-line-scopes`, with the expected value from highlight.js's HTML parsed by jsdom's `DOMParser`; `_emitter` in `src` at `2e36107`: 0 files | **Pass.** c1 to c5 and c7 killed; c6's alternative removed as unreachable |
| AC-5.5 | UAT's walk, B-3 | **Open for UAT** |
| AC-5.6 | `unitStyles.char-classes` literals (markers, subtext marker and space, masked link, cross-line runs); `decorator.native-box-classes`. A `codeBlock` ends the unit (`unitAround`'s `isRun`), and d3 is killed | **Pass** |
| AC-5.7 | `decorator.one-parse-per-unit`, 5 cases; red without the cache at 51 nodes; stale limb (m5-p2) | **Pass.** Timing read: median 4.87 ms over 20 runs for a 4,160-character unit, against the option's 9.895 ms. Not a pass condition; nothing goes to the owner |
| AC-5.8 | `decorator.preview-equals`, 5 surfaces; e1 to e5 killed | **Pass on the compared inputs**: 1,138 or 1,098 of 2,378 per surface. CR-18 LOW is a stated limit (plan R-61), and its falsifier is at least 2,200 compared at M6. The m5-d2 separator `gen:181` sits inside the excluded emoji-bearing population, so that population is not inert (QAF-39) |
| M4 differential | The preview dump above, both trees; M4's own cases (`page.channel-names`, `preview.*`, `canonFromDom.*`) in the whole suite at `2e36107`, and `discordPreview.legacy-equality` live | **Zero movement.** M4's verdict re-anchors at `2e36107` for the preview surface, the five legacy surfaces and the edit page's channel names. The edit page's editing branch is M5's own surface, assessed above |
| G5, W12, W9 (M3) | Re-run at `2e36107` | G5 **KILLED** by M5's suite. W12 **survives**: with it, a partial-mode `> a` loads as a quote element. The decorator's unit text is the prefix plus the element text, which is the stored line, so AC-5.8's classes are the same by construction. It is equivalent for M5, and M6 owns `withNormalizeNode`. W9: M5 does not change `withNormalizeNode`, so it stays with M6 |
| Case drop | Path membership, above | **Reconciled.** The removed file is the superseded width-inference decorator ("Superseded implementation": delete, name and mutation-check the covering test). Its covering tests are named, and d1, d3, u1 to u6 are killed |
| CR-17 (`visibleForm`) | The claim reproduced; the two preview mutants killed | **LOW, agreed.** AC-3.6's and AC-3.1's DOM side cannot see inline code, but the preview's inline-code arm is held by two other M4 files |
| Self-check survivors | The implementer's nine remaining, Outstanding 3 | Eight agreed. **m5-d2 (line 41, the quote prefix) is not equivalent** (QAF-39) |

## Findings

QAF-39 MEDIUM Phase 2
In `SlateEditor/utils/decorator.tsx`, `unitAround` adds each quote element's `quotePrefix` to the run unit's text. The plan states
that as M5's run unit ("a quote element contributes its `> ` prefix", D-15). Leaving it out (m5-d2) survives the suite. The
implementer recorded it as "equivalent so far", and code review tried seven quote-crossing inputs. QA's probe separates it on
content, embedDescription, fieldValue and v2Text with `>>> a\n> _\n> _b_`, and with `gen:181`.

On those inputs the run is a `>>> ` quote followed by `> ` lines. Discord reads those later `> ` characters as text inside the
`>>>` block, so the prefixes take part in pairing the underscores. With the prefix the decorator parses the stored text. Without
it, the delimiters pair differently. On `gen:181` the third line's mention draws `emText` without the prefix and plain with it.
`gen:181` holds emoji, so AC-5.8 excludes it (CR-18), and `NATIVE_BOX_FROZEN` holds no member of the class. So no case fails when
the behaviour is lost. That is the severity floor, MEDIUM, excepted from the cap.

This pass does not establish that the shipped decorator agrees with the native box on these inputs. A live-derived expected
value settles that. Remedy, for the implementer: add a member of this class to the frozen native-box inputs (re-derived live by
`discordBoxes.oracle-controls`). The member is a `>>> ` line followed by `> ` lines whose delimiters pair across the prefixes;
`>>> a\n> _\n> _b_` is one. Record the new case red under m5-d2, and record which value the box gives.

## Verdict

**QA Failed**, milestone-scoped, for M5 at website `2e36107`, on QAF-39 MEDIUM, a severity floor. Every other assessed criterion
passes, and AC-5.5 is UAT's. The M4 differential shows zero movement, so M4's QA Complete re-anchors at `2e36107` for the surfaces
the dump covers. A fix round on QAF-39 is owed, then a refresh over its diff. A production change to an M5 path expires this
verdict. The plan's Status is not moved. Rows inherited and not discharged: B-1 to B-8.

## Assumption Not Checked

This pass assumes that the classes the decorator returns, applied by Slate as leaves in jsdom, are the colours Chrome shows. It
does not test that. Every M5 case reads ranges or jsdom DOM. Falsity signature: in UAT's AC-5.5 walk (B-3), a character in AN-6's
65 cases is coloured differently in Chrome from its jsdom class list. **Owner: UAT**, at B-3.

## Handoff

- To `implementer-019`: QAF-39, a fix round, red under m5-d2.
- Then code review re-verdicts, and QA refreshes over the round's diff.
- To `steering-hooks-fixer`: the verdict, the M4 re-anchor, and the disclosures above.
- Owed next by QA: the Phase 1 re-key for plan Revisions 13 and 14, as one re-key.

## Refresh pass — QAF-39 fix round (`cf126ea`), run on `2e36107` with the round's test paths

- **Stage start.** The code review's committed Round 5 sub-entry, QAF-39's fix APPROVED_WITH_COMMENTS at `Reviewed-At: cf126ea`
  (record `79f96321`, plan R-73), re-derived from the record.
- **Tree.** Steering ruled the tree in block 05:14Z (record `3184b3b5`): the one code review approved, not the `cf126ea` tip, which
  also carries M6's `8cb4d83`, `c3af0ac` and `f58a816`. The tree is a `git archive` of `2e36107` with `cf126ea`'s four test paths
  laid over it: `discordBoxes.oracle-controls`, `discordInputs.lifted-data`, `discordNativeBox.json` and `discordTypedCases.json`.
  668 of 668 paths are at their expected blobs (`overlay-manifest.txt`). It has its own frozen offline install, exit 0. The
  round's diff, `cf126ea^..cf126ea`, is those four paths, 5 lines each way. It adds typed cases x8 `>>> a
> _
> _b_` and x9
  `>>> *a
> b*`, with their frozen box values.

| Command, captures under `verification/019/qa/m5-refresh-qaf39/` | Result |
|---|---|
| `unshare -rn` (lo up) `npx vitest run --project node --project dom --reporter=json` (`suite-offline.*`) | **exit 0**; 224 files, 3,280 of 3,280 |
| `unshare -rn` `pnpm run typecheck` (`typecheck.*`) | **exit 0** |
| live `npx vitest run --project discord-node --project discord-dom` (`discord-live.*`) | **exit 0**; 41 of 41. `discordBoxes.oracle-controls` 10 of 10, including the case that re-derives every frozen entry, so x8 and x9 are the live box's values |
| m5-d2 (the quote prefix line removed from `unitAround`), applied in the export, suite `src/components/SlateEditor` and `discordInputs.lifted-data` (`m5-d2-mutant.*`) | **KILLED**: `decorator.native-box-classes`, AssertionError `expected [ '>>> a\n> _\n> _b_' ] to deeply equal []`, 1 of 204 failing. The file was restored, and its blob equals `2e36107`'s (`3f5166df`, `m5-d2-restore.txt`) |

**QAF-39.** The class member x8 is in the frozen box, its value is re-derived live, and the shipped decorator agrees with the box on
it: the unmutated suite passes. m5-d2 now reddens on it. **Closed.**

**Verdict, refreshed.** **QA Complete**, milestone-scoped, for M5: production source at website `2e36107`, verified with
`cf126ea`'s test paths. Every finding of this document is closed. AC-5.5 is UAT's (B-3). The `cf126ea` tip's M6 commits change
`decorator.tsx` (`unitAround` moves to `runUnit.ts`), `unitStyles.ts`, `SlateEditor/index.tsx` and the desktop and mobile editors.
They are M6's to verify, and the release tip takes its own verdict at Phase 3. A production change to an M5 path expires this
verdict. The plan's Status is not moved. Rows inherited and not discharged: B-1 to B-9.

**Assumption Not Checked.** This pass assumes that x8's guard of the quote prefix carries over to M6's `runUnit.ts`, where
`unitAround` moves. It does not test that, because it runs M5's source. Falsity signature: at M6's tip, the prefix line removed
from `runUnit.ts` survives the suite. **Owner: QA at M6's Phase 2**, which re-runs m5-d2 in its M6 form.
