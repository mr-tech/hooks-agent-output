---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: >-
  M3 (the fuzzer and oracle) in progress on chain/019-slate-formatting-discord-engine: project form, lifted inputs, seeded generator,
  canonical-form normaliser, the live oracle, the webhook-state trees, the visible form, the per-surface legacy calls, the residue measurement
  and the two text boxes are committed. Not yet handed to code review. The remaining parts are in the Resumption State.
Handoff-At: c113084 — repos=website — M3 in progress, not handed to review; this is the chain-branch tip at the second checkpoint
---

# Implementation 019 — M3: the fuzzer and oracle, in the suite

## Plan Reference

`agent-output/planning/019-slate-formatting-discord-engine.md`, Revision 9 (record `47348a6d`), milestone M3. QA Phase 1:
`qa/019-slate-formatting-discord-engine-qa.md` (record `26f3a3c`). Chain branch `chain/019-slate-formatting-discord-engine`, base `5ec0621`.
M2 is in `implementation/019-slate-formatting-discord-engine-m2-implementation.md` (round 1 fix `78c5f74`).

## Date

2026-11-23 (UTC). Session `implementer-019`.

## Changelog

| Date | Handoff | Request | Summary |
|------|---------|---------|---------|
| 2026-11-23T20:08 | steering-hooks-fixer (message, session `2581957`) | Continue plan 019 with M3 | Outstanding items 3, 1, 2 (surface calls and measurement) and 4 (boxes, frozen native literals), commits `9ad0939`, `dff2f0d`, `00148c8`, `492b813`, `c113084`. Checkpoint at 231K tokens. |
| 2026-11-23T19:08 | steering-hooks-fixer (message, record `1189b7e0`) | Continue with M3 | Parts 1 to 5 below, commits `805fff6`, `548b16b`, `78c5f74` (M2 fix), `1bcab7a`. Checkpoint at 293K tokens (`cc-usage.py sessions`). |

## Implementation Summary

M3 makes the comparison against Discord a standing instrument. So far:
1. The two vitest projects `discord-node` and `discord-dom`, and `pnpm test:discord` (D-12). `pnpm test` runs `--project node --project dom`,
   and those two projects exclude `__tests__/discord/`.
2. The lifted inputs: the 272-case corpus with categories, the 106 link inputs, the 85 typed cases, and the 272 frozen legacy trees (as data under
   `src/utils/markdown/__tests__/helpers/data/`).
3. A seeded generator over the 31 `Syntax` bits (depth 3, balanced and unbalanced, every link form, emoji placement, emoji form, timestamp style,
   mention kind and block kind of the plan), prefix-stable per index.
4. The canonical-form normaliser (a TypeScript port of the research's `norm.py`). Its positive control is the research's Appendix A: over the
   272 corpus, the loose form reports exactly the 37 Appendix A ids as different and no other. The strict form reports 13 more (edge newlines).
5. The live oracle: fetch of `discord.com/app` and its scripts into memory (nothing written to disk, so nothing under the tree), jsdom load, content
   locators for seven modules (exactly one match or a named failure), the legacy facade, and the drift alarm. Run live, it re-derives all 272 frozen
   legacy trees (JSON-equal) and finds the served wasm's SHA-256 equal to the pinned one (`da7b9e5e…57fb0`).

Nothing here changes product behaviour. The only product-tree change is the type declaration `src/@types/jsdom.d.ts` (jsdom ships none; no
dependency was added).

## Milestones Completed

None complete. M3 parts done: 1 to 5 above. See Resumption State for what is owed.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | effort rulings block 18:48Z; QA Phase 1 `26f3a3c`; steering message `1189b7e0` to continue with M3 | n/a |
| AN-4 locator and lifted corpus | `verification/019/analysis/an4/`, `verification/019/qa/{corpus-272,link-inputs}.json` | `discordInputs.lifted-data.test.ts`, `discordBuild.locators.test.ts`, `discordLive.oracle-controls.test.ts` |
| EC-1 (the comparand exists on the live path; one agree member, one non-member) | `discordLive.oracle-controls.test.ts` | the agree case (corpus 1) and the Appendix A case (corpus 83) |
| EC-3 (offline form) | `m3-offline-discord.txt`: `unshare -rn` with `lo` up, `test:discord` exit 1, naming `https://discord.com/app`, 5 skipped, no pass count | AC-3.5's live limb is the named test run, not yet a test file (see Outstanding) |

## Files Modified

| Path | Changes |
|---|---|
| `vitest.config.ts` | two Discord projects; `node` and `dom` exclude `__tests__/discord/`; `configDefaults.exclude` kept in every project |
| `package.json` | `test` runs `--project node --project dom`; `test:discord` added |

## Files Created

| Path | Purpose |
|---|---|
| `src/__tests__/vitest.config.discord-projects.test.ts` | the project form and the two scripts |
| `src/utils/markdown/__tests__/discordInputs.lifted-data.test.ts`, `helpers/discordInputs.ts`, `helpers/data/discord{Corpus,LinkInputs,TypedCases,LegacyTrees}.json` | lifted inputs |
| `src/utils/markdown/__tests__/markdownGenerator.seeded-inputs.test.ts`, `helpers/markdownGenerator.ts` | seeded generator and `mulberry32` |
| `src/utils/markdown/__tests__/canonicalForm.appendix-a.test.ts`, `helpers/canonicalForm.ts`, `helpers/discordOracle.ts` | normaliser; the engine-naming oracle helper (AC-2.1's one allowed second member) |
| `src/utils/markdown/__tests__/discordBuild.locators.test.ts`, `helpers/discordBuild.ts` | fetch, load, locate; failure kinds `fetch`, `startup`, `predicate`, `wasm` |
| `src/utils/markdown/__tests__/discord/discordLive.oracle-controls.test.ts`, `helpers/discordLive.ts` | the live oracle controls and the drift alarm |
| `src/@types/jsdom.d.ts` | a minimal declaration for jsdom |

## Patterns Extended

| Surface | Pattern extended |
|---|---|
| Project form | `vitest.config.ts:project()` (the factory is kept; it now also carries the default exclude) |
| Test helpers | `src/**/__tests__/helpers/` (the M2 `importersOf.ts` precedent); the single engine-naming helper `discordOracle.ts` |
| Config test | `src/__tests__/proxy.matcher-routes.test.ts`, a test of a root-level file placed in `src/__tests__/` |
| RNG | none exists in the repo; `mulberry32` is written once in `helpers/markdownGenerator.ts` (the probes' copies are not in the tree) |

User-visible surfaces: M3 touches none. No flow is put to the owner.

## TDD Compliance

First reds are under `verification/019/impl/` (`m3-red-1.txt` to `m3-red-6.txt`). Each is the module-absent or assertion red of the first row of its module.

TDD Gate, as reported: `vitest.config.discord-projects.test.ts` fails as expected (four assertion failures: `[ 'dom', 'node' ]` for four names;
`'vitest run'` for the new script). `discordInputs.lifted-data` fails with `Cannot find module './helpers/discordInputs'`. `markdownGenerator.seeded-inputs`
fails with `Cannot find module './helpers/markdownGenerator'`. `canonicalForm.appendix-a` fails with `Cannot find module './helpers/canonicalForm'`.
`discordBuild.locators` fails with `Cannot find module './helpers/discordBuild'`. `discordLive.oracle-controls` fails with
`Cannot find module '../helpers/discordLive'`. Proceeding to implementation, each.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `project()` + the two Discord projects and scripts | `vitest.config.discord-projects.test.ts` | Yes | Yes | AssertionError (`m3-red-1.txt`) | Yes |
| `CORPUS`, `LINK_INPUTS`, `TYPED_CASES` | `discordInputs.lifted-data.test.ts` | Yes | Yes | ModuleNotFoundError (first row of the module; `m3-red-2.txt`) | Yes |
| `mulberry32`, `generateInputs`, `SYNTAX_BITS` | `markdownGenerator.seeded-inputs.test.ts` | Yes | Yes | ModuleNotFoundError (`m3-red-3.txt`). **Per-behaviour assertion reds are owed** (a mutant per row; see Outstanding) | Yes |
| `canonFromNative`, `canonFromLegacy`, `nativeParse` | `canonicalForm.appendix-a.test.ts` | Yes | Yes | ModuleNotFoundError (`m3-red-4.txt`). **Per-behaviour assertion reds are owed** | Yes |
| `fetchBuild`, `loadBuild`, `locate`, `OracleError` | `discordBuild.locators.test.ts` | Yes | Yes | ModuleNotFoundError (`m3-red-5.txt`). **Per-behaviour assertion reds are owed** | Yes |
| `openLive`, `legacyParse`, `driftReport` | `discord/discordLive.oracle-controls.test.ts` | Yes | Yes | ModuleNotFoundError (`m3-red-6.txt`). **Per-behaviour assertion reds are owed** | Yes |
| `LEGACY_TREES_WEBHOOK` + the live webhook limbs | `discordInputs.lifted-data.test.ts`, `discord/discordLive.oracle-controls.test.ts` | Yes | Yes | TypeError reading `corpus` of undefined (`m3-red-7.txt`); mutant: webhook state with `allowEmojiLinks: false` fails both live cases (`m3-mutant-webhook-state.txt`) | Yes |
| `visibleFromNative`, `visibleFromLegacy`, `visibleDifferences` | `visibleForm.controls.test.ts` | Yes | Yes | ModuleNotFoundError (`m3-red-8.txt`); assertion reds by one mutant per behaviour, run in place and restored (whitespace-drop, style sort, quote-in-spoiler bar, leading and trailing edge trim, list item index, stored href, code body trim, list item block, label-less link display): each fails a named case (console, recorded in this table only; the driver was inline `sed`) | Yes |
| `LEGACY_SURFACES`, `legacySurfaceParse`, `richRuleIds` | `discord/discordSurfaces.oracle-controls.test.ts` | Yes | Yes | ModuleNotFoundError (`m3-red-9.txt`); assertion reds, six mutants (`m3-mutants-surfaces.txt`), one equivalent edit as the driver's control | Yes |
| `SURFACE_MASK_LITERALS`, `nativeSurfaceParse` | `discordOracle.surface-masks.test.ts` | Yes | Yes | AssertionError and TypeError, `nativeSurfaceParse is not a function` (`m3-red-10.txt`) | Yes |
| `openBoxes`, `legacyBox`, `nativeBox` | `discord/discordBoxes.oracle-controls.test.ts` | Yes | Yes | ModuleNotFoundError (`m3-red-11.txt`); three mutants (`m3-mutants-boxes.txt`) | Yes |
| `NATIVE_BOX_FROZEN` | `discordInputs.lifted-data.test.ts` | Yes | Yes | TypeError reading `map` of undefined (`m3-red-12.txt`) | Yes |

Premise corrections made while writing (each fixed in the test, recorded for the reviewer): the legacy box names its styles `strong`, `em` and `link` (native `strong`, `em`, `link`), not `bold`, `italic`, `url`; the legacy box writes a tab as one space and ends a line holding an inline object with a newline-only entry; the native box has no entry for a body line inside a fence (a `null` or empty block); a native label-less link carries the engine's normalised url, whose display text is not in the lossy tree (the visible form strips the slash a host-only url gains); the typed cases include `x<n>`-keyed extras beyond corpus ids;
Appendix A is the **loose**-form disagreement set (the strict form adds 13 cases); several generator needles were narrower than the constructs they name.

## Class Sweep

No reviewer finding in this milestone yet.

## Test Execution Results

| Command | Result | Capture |
|---|---|---|
| `unshare -rn` (lo up) `npx vitest run --project node --project dom`, tree at `78c5f74` | 3026 of 3026 passed, 185 `testResults` entries, exit 0 | `m2fix-suite-78c5f74-offline.{json,log.txt,exit}` |
| `npx vitest run --project node src/utils/markdown`, tree at `1bcab7a` | 340 passed | console |
| `npx vitest run --project discord-node` (network), tree at `1bcab7a` | 5 of 5 passed | `m3-green-1.txt` |
| the same inside `unshare -rn` (lo up) | exit 1, `OracleError: discord-oracle: fetching https://discord.com/app failed: fetch failed`, 5 skipped | `m3-offline-discord.txt` |
| `npx tsc --noEmit -p tsconfig.test.json` | clean | console |
| `node ~/.claude/tools/convention-check.js website --since=78c5f74` | 0 FAIL, 0 CANDIDATE at `1bcab7a`. The id-token basename check is SKIPPED by the tool (unchecked by tool; by hand, no basename or title holds an ID token) | console |
| `npx vitest run --project discord-node` (network), tree at `c113084` | discordLive 7, discordSurfaces 7, discordBoxes 10 and the earlier files, all passed when last run per file; the whole `test:discord` was not re-run as one command at `c113084` | console |
| `npx vitest run --project node` per file: `visibleForm.controls` 36, `discordInputs.lifted-data` 6, `discordOracle.surface-masks` 3 | passed | console |

The whole offline suite was not re-run at `c113084`, and `tsc --noEmit -p tsconfig.test.json` printed nothing after the box commit (earlier runs printed "No errors found"); both are owed before hand-off.

## Outstanding Items

Owed at M3 (the plan's list). Status at `c113084`: item 3 done; item 1 done; item 2's legacy calls and measurement done, its frozen residue list is data committed at M4; item 4's boxes, 85 typed cases and frozen native literals done, its legacy-box differences report waits on item 6; items 5, 6, 7, 9, 10, 11 not started:
1. **Visible-form normaliser** (D-14) with its positive controls (one member of each invisible class equal, one of each counted dimension different).
2. **The legacy calls per legacy-only surface** (`parseEmbedTitle`, `parseRichEmbedText`, the V2 `parse`; AN-3) in the live oracle, then **residue measurement** per surface (engine vs legacy, visible form), the count recorded here, and the **frozen residue list** data. The adjustments belong to M4.
3. **Legacy trees under the webhook state** (`LEGACY_STATE_WEBHOOK`, `allowEmojiLinks: true`, G-14). The frozen file `discordLegacyTrees.json` is under the probe state (`allowEmojiLinks: false`, the AN-4 capture). AC-3.1's membership uses the webhook state: regenerate and freeze, and read the difference (expected: the emoji-in-link-label class only).
4. **The native box and the legacy box in the live oracle** (module `nativeBox` `p0`; `textBox` `.markdown`), the 85 typed cases, **frozen native-box literals** for `pnpm test` (AC-3.2), and the legacy-box differences for the known-differences report. The site's editor side of AC-3.2 is M5's.
5. **AC-3.8** (routing, legacy calls, per-adjustment, surface class), including the (i) predicate run on a real member and a non-member (`gate` module 146849's predicate `native-markdown"` + `enable_native_markdown`), recorded here.
6. **The coverage report** (Syntax bit × surface, agree-class members) and the **known-differences report** (generated, written to a website-local path that `.gitignore` excludes; add the ignore entry).
7. **AC-3.3 round trip** over the generator, corpus, the 1,662-line probe and the lifted block-layer seeds, in full and partial mode (load-save, typed, pasted, normalisation settles, forced re-normalise performs zero operations), reading the value `onChange` hands the message; the `onChange` drive with its positive control (typing `a` yields a write of `a`); the timing against the 60 s cap (`EC-4`); the base-red limbs shown red on named inputs (EC-4's rows 143, 144, 153, 159, 219, 220, 258, 262). **Decision for the reviewer and QA:** limbs that fail at the chain base cannot land red in a green suite, and a known-wrong expected value is not admitted (axiom D). I plan to land the property tests with the classes that hold at the base, record each base-red limb as a captured red run on its named inputs, and land the failing members with the milestone that fixes them (M6, AC-6.1). This is a reading, not a plan deviation; it goes to the planner if QA disagrees.
8. **AC-3.1, AC-3.6, AC-3.7 limbs that read the site's preview DOM** are owed at M4, where the renderers exist (AC-4.1 states it). M3 builds the instrument and the oracle side. Same for AC-3.2's editor side at M5.
9. **Per-behaviour assertion reds** for rows 3 to 6 of the TDD table (a named mutant per row, run in an isolated export through `mutation-run.py`; the M2 driver `m2-mutants.js` and `m2fix-mutants-78c5f74.json` are the forms), and the **self-check sweep** `mutant-gen.js` over the M3 diff.
10. **CR-4** (the import scan's AST walk for non-literal `import()`/`require()`, planted `import(name)` and `import('@discord/' + n)` in the control) is deferred to here, since `discordOracle.ts` is now AC-2.1's second member.
11. **AC-3.5 as a test file**: the offline exit and naming is shown by a run; add a case that runs `test:discord`'s fetch in a loopback namespace, or state it as a run only.
12. **Measurement recorded** (item 2). Instrument: the visible form over the engine's `parse` under each surface's literal mask against Discord's legacy call for that surface, over 2,378 inputs (272 corpus, 106 link inputs, 2,000 generator inputs at seed 20261123). Differing inputs: description 1,181, field value 1,191, title 1,380, title with embed url 642, V2 text display 1,181. Over the 272 corpus alone: 37, 33, 53, 36, 37 (the loose-form counts of AN-3 are 37, 32, 54, 37, 37). Each differing input is shrunk by delta-debugging to a minimal differing input, 232, 234, 210, 169 and 232 distinct minimal inputs per surface: `verification/019/impl/m3-residue-measurement-492b813.json` (driver `m3-residue-driver-492b813.test.ts.txt`). The largest classes on the description: a host with no dot linked by the engine and not by legacy (`http://x`, 171 inputs), an emoji in a link label (148), an empty quote marker (`>`, 63), `<id:linked-roles>` (35), unbalanced emphasis runs (`****`, `a_b_`, `____`), an empty heading (`#  `), spoiler runs (`|||||`), list items with a lone escape. They are not yet grouped into structural classes with predicates and signatures: that grouping, and the choice of which classes get an adjustment under (a), (b), (c), is M4's start. **Known limit of the visible form:** a native label-less link's display text is the engine's normalised url, so a source spelled with a path-only slash difference cannot be told from the url; the form strips only the slash a host-only url gains.
13. Self-diagnosis, method level: I began item 2 by comparing visible forms on the generator and read the 50% difference as signal before reading ten minimal examples; the first reading showed one artefact of my own form (the label-less link display text), found only because I shrank the inputs and printed units. Shrink and print first, count after.
14. The `.next` stale validator hazard did not arise this session (typecheck was clean).

## Next Steps

Finish the M3 parts above, record them, run `convention-check.js website --since=5ec0621`, commit, set `Handoff-At`, hand M3 to code review. M2's fix round (`78c5f74`) is with `code-reviewer-019` for its Round 1 sub-entry.

## Resumption State

Written 2026-11-23T20:1x UTC at 231K tokens, for a `/clear`, at the second checkpoint.

- **Done since the first checkpoint.** Item 3 (`9ad0939`: `LEGACY_TREES_WEBHOOK`, 272 corpus and 106 link trees under the webhook state; the webhook state differs from the probe state on exactly one link input, `[🙂](https://x.y)`, and on no corpus input; the difference class is an emoji in a link label), item 1 (`dff2f0d`, `492b813`: `helpers/visibleForm.ts` with its controls), item 2's calls (`00148c8`: `helpers/discordSurfaces.ts`, the rich rule set read from the facade module's own source, `SURFACE_MASK_LITERALS` and `nativeSurfaceParse` in `discordOracle.ts`) and measurement (Outstanding 12), item 4's boxes (`c113084`: `helpers/discordBoxes.ts`, `data/discordNativeBox.json` for 272 corpus plus 7 `x<n>` typed extras, re-derived live in `discordBoxes.oracle-controls.test.ts`).
- **Branch and HEAD.** `chain/019-slate-formatting-discord-engine` at `c113084`. The website tree holds only the foreign `?? .playwright-mcp/`. The record repository holds my uncommitted `verification/019/impl/m3-*` files, committed with this document.
- **Next, in order.**
  1. Group the measurement's minimal inputs into structural classes per surface (read `m3-residue-measurement-492b813.json`), and record the grouping here. The frozen residue list as test data is M4's.
  2. Item 4's remainder: the legacy-box differences for the known-differences report (both boxes over the 85 typed cases and the corpus; AN-6 gives 26 of 65 comparable disagree).
  3. Item 5 (AC-3.8): routing, legacy calls, per adjustment and surface class. Part (iii) is already a test (description and V2 trees equal content's over the 272 corpus, in `discordSurfaces.oracle-controls.test.ts`). Part (i) needs the predicate `native-markdown"` + `enable_native_markdown` run on one real member and one real non-member, and the V2 and embed renderer chunks located by AN-3's content predicates (the chunk is lazy: check whether `fetchBuild` must also fetch lazy chunks; the first lazy chunk names are in `verification/019/analysis/an3/`).
  4. Item 6: coverage report and known-differences report, written to a website-local path that `.gitignore` excludes (add the ignore entry).
  5. Item 7: AC-3.3 round trip with the `onChange` drive and its positive control, timing against 60 s, base-red limbs.
  6. Items 9 (self-check sweep `mutant-gen.js` over the M3 diff in an isolated export; per-row mutants for rows 3 to 6 of the first TDD table, which are only partly done), 10 (CR-4), 11 (AC-3.5 as a case).
  7. Before hand-off: `pnpm test` offline whole suite, `tsc --noEmit -p tsconfig.test.json` (and `pnpm run typecheck`), `node ~/.claude/tools/convention-check.js website --since=5ec0621`, set `Handoff-At`, hand to code review.
- **Approach in flight.** None. No uncommitted source work. Scratch files only under the session scratchpad; the driver tests `zzDriver.*` were removed from the tree.
- **Local state not restored.** None. No process of mine runs.
- **Evidence run but not recorded.** Per-behaviour mutant runs for `visibleForm.ts` were run in place and restored with output to the console only (rows in the TDD table name them); `m3-mutants-surfaces.txt`, `m3-mutants-boxes.txt`, `m3-mutant-webhook-state.txt` and `m3-red-7` to `m3-red-12` are committed with this document.
- **Questions sent, and to whom.** None open. A question for QA at hand-off: item 7's landing of base-red limbs (Outstanding 7). No flow ask is owed until M4 code starts.
- **Cache-warm wake.** Job `204e1e48` (armed 19:54) deleted at this checkpoint. Arm a new one on the next turn.
