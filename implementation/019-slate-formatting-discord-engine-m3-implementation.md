---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: >-
  M3 (the fuzzer and oracle) in progress on chain/019-slate-formatting-discord-engine: project form, lifted inputs, seeded generator,
  canonical-form normaliser and the live oracle are committed. Not yet handed to code review. The remaining parts are in the Resumption State.
Handoff-At: 1bcab7a — repos=website — M3 in progress, not handed to review; this is the chain-branch tip at the checkpoint
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

Premise corrections made while writing (each fixed in the test, recorded for the reviewer): the typed cases include `x<n>`-keyed extras beyond corpus ids;
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

The whole offline suite was not re-run at `1bcab7a`.

## Outstanding Items

Owed at M3 (the plan's list), none started unless named above:
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
12. The `.next` stale validator hazard did not arise this session (typecheck was clean).

## Next Steps

Finish the M3 parts above, record them, run `convention-check.js website --since=5ec0621`, commit, set `Handoff-At`, hand M3 to code review. M2's fix round (`78c5f74`) is with `code-reviewer-019` for its Round 1 sub-entry.

## Resumption State

Written 2026-11-23T19:3x UTC at 293K tokens, for a `/clear`.

- **Done.** M2 fix round 1 (CR-1, CR-2) at `78c5f74`, recorded in the M2 document and sent to `code-reviewer-019`. M3 parts 1 to 5 committed: `805fff6`, `548b16b`, `1bcab7a`.
- **Branch and HEAD.** `chain/019-slate-formatting-discord-engine` at `1bcab7a` (before this document's commit, which is record-side). The website tree holds only the foreign `?? .playwright-mcp/`.
- **Next.** Outstanding items 1 to 11 above, in this order: (3) webhook-state legacy trees and the read of their difference; (1) the visible form; (2) per-surface legacy calls and the residue measurement; (4) boxes and frozen native literals; (5) AC-3.8; (6) reports; (7) AC-3.3 and the `onChange` drive; then (9) mutants and the sweep, (10) CR-4. Before M4, M5 or M6 code, send `steering-hooks-fixer` the flows that hold a decision (brief).
- **Approach in flight.** None. No uncommitted source work.
- **Local state not restored.** None. No process of mine is running. Live oracle runs read from the network into memory only.
- **Evidence run but not recorded.** `m3-green-1.txt`, `m3-offline-discord.txt`, `m3-red-5.txt` and `m3-red-6.txt` are committed with this document. The class-sweep and mutation captures for M2's fix are in the M2 document.
- **Questions sent, and to whom.** None open. The M2 fix hand-back went to `code-reviewer-019` (`uds:/run/user/1000/cc-socks/2675139.sock`). An open question for QA at M3's hand-off: item 7's landing of base-red limbs.
- **Cache-warm wake.** Armed at 19:08 (job `509b7e8d`, fires 20:03); deleted at this checkpoint.
