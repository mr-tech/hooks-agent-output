---
ID: 019
Origin: 019
UUID: 286c730a
Verified-At: "7dcedc9 — repos=website; M2 paths at the code review's Round 2 Reviewed-At, run in a git-archive export with its own frozen install; refresh over fix round 2 (78c5f74..7dcedc9)"
Status: QA Complete
Status-Detail: >-
  M2 at website 7dcedc9 passes, milestone-scoped. QAF-29 and QAF-30 are closed by fix round 2, each seen red under a QA mutant.
  AC-2.1 to AC-2.4, AC-2.6 and AC-2.7 pass. AC-2.5 passes on its adapter and provider limbs; its surface limbs belong to the M4
  and M5 passes. The effort-final mutation sweep stays owed. A later production change to an M2 path expires this verdict.
Phase: 2
---

# QA Report: 019 — M2, the engine and its adapter (Phase 2)

**Plan Reference**: `agent-output/planning/019-slate-formatting-discord-engine.md`, Revision 9 (record `47348a6d`), milestone M2 and
Rider R-A. Implementation: `implementation/019-slate-formatting-discord-engine-m2-implementation.md`, `Handoff-At: 78c5f74`.
Code review: `code-review/019-slate-formatting-discord-engine-code-review.md` (record `1b351f50`), APPROVED_WITH_COMMENTS at
`Reviewed-At: 78c5f74`, M2 paths only. Phase 1 and the chain's one blocking-condition register:
`qa/019-slate-formatting-discord-engine-qa.md`. This pass appends no register row.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T19:35 | code-reviewer-019 (message: M2 APPROVED_WITH_COMMENTS, record `1b351f50`, Reviewed-At website `78c5f74`) | QA Phase 2 on M2 | Phase 2: milestone-scoped pass on M2 at `78c5f74`. Steering's Phase 2 brief has not arrived. So this pass read the plan's Decisions Register, the cap and the 18:02Z ruling, and the code review's Assumption Not Checked (AC-2.6) itself. The stage start is the review's committed verdict, re-derived at the record. The verdict is **QA Failed** on QAF-29 MEDIUM (AC-2.4). QAF-30 LOW is also raised. AC-2.6's mechanism-removed control is built and discriminates. The plan's Status is not moved (milestone-scoped). |
| 2026-11-23T19:49 | code-reviewer-019 (message: M2 Round 2 APPROVED_WITH_COMMENTS, record `86ba88f4`, Reviewed-At website `7dcedc9`) | Refresh after QA Failed | Refresh pass over fix round 2's M2 paths (`78c5f74..7dcedc9`: `engine.ts`, `engine.kind-maps`, `engine.surface-masks`). It ran in an export of `7dcedc9`: frozen install, 3041 of 3041 offline with exit 0, build and typecheck exit 0, and the notice re-read. QM-1 and QM-2 were seen red. QAF-29 and QAF-30 are closed. Verdict: **QA Complete** for M2, milestone-scoped. |

## Scope and stage start

- **Tree.** Website `78c5f74`, the code review's `Reviewed-At`. Everything ran in `git archive 78c5f74` in this session's scratchpad,
  with its own `pnpm install --frozen-lockfile`. The shared tree was not switched or written. It was at `78c5f74` when the export
  was taken, and at `1bcab7a`, M3 work, later in the pass.
- **Paths under verdict.** These are the M2 product files, `src/utils/markdown/engine.ts` and `src/providers/MarkdownProvider.tsx`,
  plus the pin, the lockfile, and the M2 test files with `helpers/importersOf.ts`. `805fff6` and `548b16b` are M3 work. They are
  outside this verdict, except where AC-2.1 counts M3's oracle helper as its second member.
- **Criteria assessed, fixed before execution.** AC-2.1 to AC-2.7, as Revision 9 states them.
- **Irreversible Side-Effect Register.** M2 changes no guard of E-1 to E-9: no save, send, draft, deploy or fetch-and-commit path.
  So this milestone owes no register sweep. **The effort-final mutation sweep stays owed**, over `git diff 5ec0621..<final tip>`
  production paths.
- **Rows inherited and not discharged:** B-1 to B-6, all open. B-1 is AC-2.5's human-observable form.

## TDD compliance gate

The table is present and complete. Every new function or class has a row, with Yes in all three columns:
- each new module's first row cites a module-absent red;
- each later row cites an assertion-level red under a named mutant (`verification/019/impl/m2-mutants-1005eec*`,
  `m2fix-mutants-78c5f74*`).

One fix-round row, "`parseLossless` once resolved returns the document", was never red, by design. It is the positive limb of the
not-ready control, and the guard mutants keep it green. It describes no new function, so the gate passes.

## Criteria: what each was checked against

| Criterion | Class it exemplifies, and how it was checked | Result |
|---|---|---|
| AC-2.1 Confinement | Every module in the repo naming the three engine packages. Two instruments: the implementer's `preProcessFile` scan, green in the suite, and a text grep, `git grep -c -E "@discord/markdown-(wasm\|types\|react)" 78c5f74 -- '*.ts' '*.tsx' '*.js' '*.mjs'`. | **Pass.** The grep finds five files. Of them, `engine.ts` imports the package, and so does `helpers/discordOracle.ts`, M3's member. `engine.import-confinement.test.ts` holds the names as fixture text. `engine.init-states` and `engine.not-ready` name the package in `vi.mock`, which is not an import specifier; `not-ready` reaches the real module through `importOriginal`. Residue for M3: the oracle helper derives its mask from `Syntax` (`Syntax.ALL & ~Syntax.DEV_LINKS`). AC-2.1 asks for AN-3's literal masks, so this is the code review's M3 item. |
| AC-2.2 Pin | Against the base and the registry | **Pass.** `package.json` has `"@discord/markdown-wasm": "0.16.0"`. The lockfile resolves `0.16.0` and `@discord/markdown-types@0.14.0` with integrity hashes. The `npm pack` tarballs in this session hash to those same sha512 values, which is a second instrument. Other moves: `semver@7.8.6` gains `optional: true`, as the implementation document dispositions. (`m2/pin-and-rider.txt`) |
| AC-2.3 Masks | Six literals over 31 bits | **Pass.** `engine.ts`'s six constants equal the plan's literals, which Phase 1's r6 probe checked against AN-3 and limb 2b (0 of 248). The suite's 186 cells are green. |
| AC-2.4 Total maps | Declared: every member of the declared unions. Observed: every kind the engine returns over M3's input classes. | **Fail on the declared clause (QAF-29).** Observed: a second instrument, `m2/probe-observed-kinds.mjs`, ran 472 inputs (M3's lifted corpus of 272, 85 typed cases, 106 link inputs and the test's nine) under four distinct masks, network-isolated. Every lossless node, token, emoji, mention and static-mention kind returned is a map key, and every key is returned. The planted control is reported. Declared: see QAF-29. |
| AC-2.5 Init states | Pending, resolved, rejected; one line per document | **Pass on the adapter and provider limbs**: `engine.init-states`, `engine.not-ready` and `MarkdownProvider.engine-state`, green. **Not verified at M2** on the six surfaces and `/preview`, because no surface renders from the engine yet. Those limbs are the M4 and M5 Phase 2 passes', and B-1 is the walk. This scopes the pass, not a finding. |
| AC-2.6 Notice | A JS file the editor page loads, by the build manifest, with a mechanism-removed tip control | **Pass, control discriminating.** In the tip build, `server/app/message/m/[id]/edit/page_client-reference-manifest.js` names `static/chunks/3kwhcdtzorl5m.js`. That chunk holds the copyright line once and the permission sentence once (`grep -c`). The control is the same export with only `startEngine.notice = ENGINE_NOTICE;` removed (1 line before, 0 after). It holds neither string in the edit page's chunks, nor in any of the 94 `.js` files under `.next/static` (5 at the tip). This discharges the code review's Assumption Not Checked. (`m2/notice-in-chunks.out`, `m2/run-m2.sh`) |
| AC-2.7 Rider R-A | `paracord` placement and the frozen install | **Pass.** `paracord` is in `dependencies` with the same specifier and absent from `devDependencies`. The importer entry moved. `pnpm install --frozen-lockfile` exits 0 in the export, and the lockfile's sha256 is identical before and after. |

## Execution

| Run | Result | Capture (`verification/019/qa/m2/`) |
|---|---|---|
| `pnpm install --frozen-lockfile` in the export | exit 0; lockfile unchanged | `install-frozen.{log,exit}`, `export-lock-{before,after}.sha256` |
| `pnpm test`'s projects (`--project node --project dom`), offline (`unshare -rn`, `lo` up) | **3026 of 3026 passed, 185 `testResults` entries, exit 0**, re-derived from the JSON. This equals the implementer's figures. | `suite-78c5f74-offline.{json,log,exit}` |
| `pnpm run typecheck` before any build | exit 2, one error: `src/app/page.tsx` cannot find `~/assets/img/product_image.png`. A fresh export has no `next-env.d.ts`, which `next build` generates. This is not an M2 change. | `typecheck-78c5f74.{log,exit}` |
| `pnpm run typecheck` after the build | exit 0, 0 errors | `typecheck-78c5f74-postbuild.{log,exit}` |
| `next build`, tip and control (`SKIP_ENV_VALIDATION=1`, no `.env*` in the export) | both exit 0 | `build-tip.log`, `build-control.{log,exit}` |
| Convention checks by hand on the export's nine M2 test and helper files | The 8 test basenames match the positive form. 0 ID-token hits over titles and comments, and the predicate's planted control gives 2. 0 time-based cells. `convention-check.js` read the shared tree at `1bcab7a`, not `78c5f74`, so it is not cited for this tree. | `conventions-by-hand-78c5f74.txt` |

No mutation sweep was run at this milestone, because the register's guards are unchanged (above). The adequacy of the M2 tests rests
on two runs:
- the implementer's 26 named mutants, 25 killed and M2-20 closed by tightening;
- the review's 8 probes, all killed on their own case.

This pass read both records, and did not re-run them.

## Test audit (the touched surface)

- **Mocks.** `engine.init-states` mocks the wasm's `init` and `parseLossless`. The mocked `parseLossless` result is checked only for
  its call arguments. The mocked rejection is a `TypeError`, and the asserted line reads `error.name`, so the test states the
  mapping, not what a browser throws. B-1 reads the real line. `MarkdownProvider.engine-state` mocks the adapter's store with the
  adapter's own subscribe and snapshot contract. No test runs the provider with the real adapter. That is residue, read at M4,
  where a surface renders from it.
- **A secret in a failure path.** The rejected case plants a URL in the error message, and asserts the exact line, which holds only
  the error's name. So a leaked message would fail the case.
- **Non-discriminating case: QAF-30.**

## Findings

QAF-29 MEDIUM Phase 2
AC-2.4's declared enumerator asks for one map entry for "every member of the declared unions at the pin. These are the `Block` and
`Inline` members with their `emoji`, `mention` and `static` sub-kinds, the 16 `LosslessNodeKind` members and the 21 `TokenKind`
members". At `@discord/markdown-types@0.14.0`, `Inline` includes `Modifier = Bold | Italic | Spoiler | Strikethrough | Underline`
(`index.d.ts`). The lossless tree carries the same five as `modifier` nodes and delimiter tokens of `kind: ModifierKind`.
- `engine.ts` holds no map over these five. `NODE_RENDERERS` maps the single `modifier` kind, and `engine.kind-maps.test.ts`'s
  declared lists hold no modifier kind.
- `parse()` returned all five over the probe's inputs (`m2/probe-observed-kinds.out`).
- So five members of the declared unions have no entry, and the criterion is unmet for them.
- The consequence is the one F-5 exists to prevent. A modifier kind added at a pin change renders through the generic `modifier`
  entry, with no type error and no `markdown-engine-unmapped-kind` line.

*Asked*: a map over `ModifierKind` (five entries) in the adapter. Its declared check uses a literal list of the five, and its observed
check collects the `modifier` nodes' and `delimiter` tokens' `kind` values from the lossless tree. An unmapped modifier kind writes
the unmapped-kind line, as `nodeRenderer` does. Each check needs a mutant, a removed entry, shown red. `LinkKind` (four) is not named
by AC-2.4 and is not asked.

QAF-30 LOW Phase 2
`engine.surface-masks.test.ts` "counts 31 single-bit syntax members at the pin" asserts the length of the test's own `BITS` literal,
so no change to production code or to the pin can make it fail. The `BITS` values are independent of the adapter, as axiom E asks.
But nothing ties them to the pinned package, so a pin change that renumbers a bit would leave all 186 cells green against a stale
table.
*Asked*: the case compares `BITS` with the pinned package's single-bit `Syntax` members, by name and value. The dependency's declared
enum is the fact under test here, not the adapter. The case is then shown red by changing one `BITS` value.

## Refresh at `7dcedc9` (fix round 2)

The stage start is code review Round 2, APPROVED_WITH_COMMENTS at `Reviewed-At: 7dcedc9` (record `86ba88f4`), re-derived at the
record. The scope is the M2 paths in `git diff 78c5f74 7dcedc9`:
- `engine.ts`: `ModifierKind`, `MODIFIER_KINDS`, `modifierStyle`, and the shared `warnUnmapped`;
- `engine.kind-maps.test.ts`;
- `engine.surface-masks.test.ts`, with the four lines it imports from `helpers/discordOracle.ts`.

The rest of `1bcab7a` is M3's. The export was `git archive 7dcedc9`, with its own frozen install, and the shared tree was not
written. Captures are in `verification/019/qa/m2/refresh-7dcedc9/`.

| Run | Result |
|---|---|
| `pnpm install --frozen-lockfile` | exit 0; lockfile sha256 unchanged |
| `pnpm test`'s projects, offline (`unshare -rn`, `lo` up) | **3041 of 3041, 186 `testResults` entries, exit 0**, re-derived from the JSON. That is 15 cases and one file above `78c5f74`; the extra file is M3's. |
| `next build`, then `pnpm run typecheck` | both exit 0 |
| AC-2.6 re-read | The edit page's manifest still names `static/chunks/3kwhcdtzorl5m.js`, with the copyright line 1 and the permission sentence 1. The fix diff touches no notice line (`grep -c notice` over it: 0), so the mechanism-removed control at `78c5f74` still applies. |
| **QM-1**, production: `spoiler` removed from `MODIFIER_KINDS` | **Red** on 3 cases: the declared check, the observed check over nodes and delimiter tokens, and the spoiler style case. exit 1. Restore verified by sha256. Uniqueness came from the script's single-occurrence assert; the `grep -cF` count of 2 counts the two lines of the pattern. |
| **QM-2**, QAF-30's table: `BITS.SPOILER` changed to `0x2000000` | **Red** on the pinned-members case, exit 1. Restore verified. |

The code review's 11 probes and the implementer's 6 mutants (`m2r2-*`, `m2fix2-*`) were read, not re-run. This pass's own two
mutants carry its verdict on the two findings.

- **QAF-29 closed.** The modifier map is total over `ModifierKind`'s five members. It is checked declared and observed, with literal
  styles, and the unmapped line is prefixed `modifier.`. The four other nested payload unions the implementer's class sweep names
  (`LinkKind`, quote `line`/`rest`, list `ordered`/`unordered`, `heading.level`) are variants read by M4's renderers. AC-2.4 does
  not list them, so they are not M2's. The code review's Round 2 Assumption Not Checked carries them to M4.
- **QAF-30 closed.** `BITS` is compared with the pinned package's single-bit `Syntax` members by name and value. The import goes
  through the oracle helper, so the package is still named by two modules only (AC-2.1). The literal stays the expected value, and
  the package is what the case measures.

## Verdict

2026-11-23T19:35 reconcile: the verdict below was QA Failed at `78c5f74`, on QAF-29. Fix round 2 and the refresh above supersede
it for M2. Current verdict: **QA Complete**, M2 at website `7dcedc9`, milestone-scoped. The plan's Status is not moved. Any later
production change to an M2 path expires this verdict.


**QA Failed**, M2 at website `78c5f74`, on QAF-29. It goes to the implementer. A fix round's production change expires this verdict,
and the refresh covers that round's diff and re-runs AC-2.4's two checks with its mutants. QAF-30 may land in the same round.

## Assumption Not Checked

This pass assumes Vercel's production build keeps the notice in the edit page's client chunk, as the local `next build` of the
export does, and it does not test that. No Vercel build was read. Falsity signature: the edit page's JavaScript on the chain's
Vercel Preview has no `Copyright 2025 Discord, Inc.` (`grep -c` over the chunks its network list names). **Owner: devops**, at
Stage 1's Preview read, beside AN-8's `pageerror` read on the same Preview.

## Handoff

- **implementer-019**: QAF-29, required. QAF-30, optional in the same round.
- **Code review M3 round**: AC-2.1's oracle-helper mask clause (already its item).
- **M4 and M5 Phase 2**: AC-2.5's surface limbs.
