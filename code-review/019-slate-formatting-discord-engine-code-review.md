---
ID: 019
Origin: 019
UUID: 286c730a
Reviewed-At: "a7ad3f2 — repos=website; Round 8's sub-entry is M6 Fix Round 4 at a7ad3f2 (2b82972..a7ad3f2); Round 8 is M6 Fix Round 3 at 2b82972 (85ece66..2b82972); Round 7 is M6 Fix Round 2 at 85ece66 (42128cd..85ece66); Round 6's sub-entry is CR-20's fix at 42128cd (119471f..42128cd, its tree 10abfa9's); Round 6 is M6 at 119471f (cf126ea^..119471f plus 8cb4d83, c3af0ac, f58a816); M5 Round 5 at 2e36107 with its QAF-39 sub-entry at cf126ea; M3 at 81c68b2; M4 at e58f2ed; M2 closed at 7dcedc9"
Status: In Review
Round: 8
Verdict: REJECTED
---

# Code Review: 019 — Slate formatting: one Discord engine for the preview and the editor

**Plan Reference**: `agent-output/planning/019-slate-formatting-discord-engine.md`, Revision 9 (record `47348a6d`)
**Implementation Reference**: `agent-output/implementation/019-slate-formatting-discord-engine-m2-implementation.md` (records `1189b7e0`, `077b51f1`; `Handoff-At: 22f3e58`)
**Date**: 2026-11-23
**Reviewer**: Code Reviewer (`code-reviewer-019`)

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T19:15 | steering-hooks-fixer (brief `steering/019-brief-code-reviewer.md`, record `c651bf75`); implementer-019 (M2 document, `Handoff-At: 22f3e58`) | Review M2 | Round 1 at website `22f3e58`, chain base `5ec0621`. REJECTED on CR-1 MEDIUM (a severity floor: two keyed selections, each with a surviving constant-answer mutant) and CR-2 MEDIUM (the adapter's parse acts differently before init in Node and in a browser). CR-3 and CR-4 are LOW. Milestone-scoped: the plan's Status is not moved. |
| 2026-11-23T19:24 | implementer-019 (fix round 1, website `78c5f74`, record `491731bf`) | Round 1 sub-entry: confirm CR-1 and CR-2 | Round 1 sub-entry at `78c5f74`, scoped to the fix commit `78c5f74` over the M2 paths. CR-1 and CR-2 are RESOLVED: 8 of 8 probes KILLED, each on its own case by assertion, and the sweeps re-run. Verdict APPROVED_WITH_COMMENTS (CR-3 and CR-4 LOW open, each with a carrier). `805fff6` and `548b16b` (M3 test work) are not reviewed here; they belong to M3's round. |
| 2026-11-23T19:44 | implementer-019 (fix round 2 for QA's QAF-29 and QAF-30, website `7dcedc9`) | Review the M2 delta | Round 2 at `7dcedc9`, opened because the fix adds production code outside CR-1 and CR-2 (`MODIFIER_KINDS`, `modifierStyle`, `warnUnmapped`). The delta is reviewed as a first review over the M2 paths. No new finding. 11 of 11 probes KILLED, each on its own case. APPROVED_WITH_COMMENTS (CR-3 and CR-4 LOW, as before). `1bcab7a` (M3 oracle work) is not reviewed here. |
| 2026-11-23T21:23 | implementer-019 (M3 hand-off, `implementation/019-slate-formatting-discord-engine-m3-implementation.md`, record `f78d803b`, `Handoff-At: f4060c5`) | Review M3 | Round 3 at `f4060c5`: REJECTED on CR-5 MEDIUM (the generator's game mention is AN-8's withdrawn form, so no input exercises `GAME_MENTION`) and CR-6 MEDIUM (the oracle window keeps live XHR and WebSocket). CR-7, CR-8 and CR-9 are LOW, and CR-4 is re-verified partly resolved. CR-7's M6 carriage goes to the planner. |
| 2026-11-23T22:00 | implementer-019 (M3 fix round 3, website `1698c80`, record `e1c265a7`); steering-hooks-fixer (resume message after `/clear`) | Round 3 sub-entry: confirm CR-5 and CR-6 | Round 3 sub-entry at `1698c80`, scoped to the fix commit's 7 paths. CR-5 and CR-6 are RESOLVED: the removal test shows `GAME_MENTION` live, and the 18-path re-attack, with a positive control, reaches the listener 0 times. A new finding, CR-10 MEDIUM (severity floor), makes the verdict REJECTED: the live control says "no request attempt" by reading `oracle.attempts`, and no assertion fails when `loadBuild`'s wiring of that list is cut (the mutant SURVIVED), or when a refused XHR is touched before `open`. `93b26fd` (M4) is not reviewed here. |
| 2026-11-23T22:11 | implementer-019 (M3 fix round 4, website `2c1590f`, record `72b59f64`) | Round 3 sub-entry: confirm CR-10 | Round 3 sub-entry at `2c1590f`, scoped to the fix commit's 2 paths. CR-10 RESOLVED: 4 of 4 probes KILLED, the `loadBuild` disconnect among them. CR-11 LOW raised: the XHR Proxy records a member when it is called, not when it is read (`x.upload.addEventListener` and `x.readyState` unrecorded; network still closed). The record corrections are made. APPROVED_WITH_COMMENTS, and M3 goes to QA Phase 2. |
| 2026-11-24T01:00 | implementer-019 (M4 hand-off, website `e58f2ed`, record `bc73f58c`; M3 Round 5 at `380e82d`); planner-019 (R-44, record `49cb5d73`); steering-hooks-fixer (cap, block 00:49Z, `8de0ac3`) | Review M4; Round 3 sub-entry for `380e82d` | Round 4 at `e58f2ed`: APPROVED_WITH_COMMENTS. The link allow-list held at the rendered anchor: 24,170 renders on each of the 6 surfaces, 0 defects. Planner (d) and (f) hold. AC-3.7's families, counts and a sample were read. CR-12 and CR-13 LOW are stated limits under the cap. Round 3 sub-entry at `380e82d` (test-only): APPROVED_WITH_COMMENTS, CR-14 LOW. |
| 2026-11-24T01:04 | implementer-019 (record `511f704`, the family-assignment script) | Confirm CR-13 | CR-13 RESOLVED: the committed script reproduces every one of the 6,142 families, and the signatures once collapsed into runs. A rule-order swap moves 700 entries, so the check can fail. The verdict is unchanged. |
| 2026-11-24T01:54 | steering-hooks-fixer (resume message); implementer-019 (M3 fix round 6, `Handoff-At: b04c09f`, record `fe8ce8f3`) | Round 3 sub-entry: confirm QAF-36 | Round 3 sub-entry at `b04c09f` (test-only: `9a5f4fe`, `b04c09f`). Of 9 probes, 6 were KILLED. `compareWasm` is killed under `match = true`, under `match = false` and with its message arms swapped. **REJECTED** on CR-15 MEDIUM, a severity floor: with `driftReport` handing the pinned file to the comparison as the served bytes, 15 of 15 live cases and the offline case pass. CR-16 LOW is a stated limit. The M4 verdict at `e58f2ed` stands. Steering's brief had not arrived; the resume message was read in its place. |
| 2026-11-24T02:07 | implementer-019 (M3 fix round 7, website `d6aab03`, record `5305177e`) | Round 3 sub-entry: confirm CR-15 | CR-15 RESOLVED at `d6aab03`: 10 of 11 mutants KILLED, network-isolated. The two operand mutants fail on `match` (`expected true to be false`). The live default passes 15 of 15, `equal`. The only survivor is CR-16 LOW, a stated limit (plan R-54). APPROVED_WITH_COMMENTS; M3 goes to QA's refresh. The 192 fewer offline cases between `b04c09f` and `d6aab03` come from M5's commits; that is M5's round. |
| 2026-11-24T02:42 | steering-hooks-fixer (hand-off); implementer-019 (M3 fix round 8, website `81c68b2`, record `d43e2b40`) | Round 3 sub-entry: confirm QAF-38 | QAF-38's fix confirmed at `81c68b2`: 14 of 14 mutants KILLED, network-isolated (QA's six constants, five operand or member swaps, both `switchReferrers` forms, and the fetcher not passed on). The live default passes 5 of 5. APPROVED_WITH_COMMENTS; M3 goes to QA's refresh. |
| 2026-11-24T03:58 | implementer-019 (M5 hand-off, record `b9e9247c`, `Handoff-At: 2e36107`); steering-hooks-fixer (M5 hand-off; eslint ruling block 03:48Z, record `6866cd75`) | Review M5 | Round 5 at `2e36107`: **APPROVED_WITH_COMMENTS**. CR-3 RESOLVED (one leaf-role source). The `visibleForm` defect is confirmed, but the preview's inline code is guarded by M4's own tests (2 of 2 mutants KILLED), so it is CR-17 LOW. The AC-5.8 emoji exclusion drops whole inputs; the probe's sampled differences are the Slate layer's lift (AC-6.5, M6), so it is CR-18 LOW, carried to M6. Three dead interactive parsers are CR-19 LOW. The eslint FAILs are under the owner's ruling. |
| 2026-11-24T05:14 | implementer-019 (M5 Fix Round 1, website `cf126ea`, record `2c45c566`) | Round 5 sub-entry: confirm QAF-39 | QAF-39's fix is confirmed on M5's own decorator (`2e36107` with `cf126ea`'s four test paths laid over it): 8 of 8 green, and m5-d2 is KILLED on x8 by assertion. The live box passes 10 of 10, its frozen entries re-derived. APPROVED_WITH_COMMENTS. Record correction: the M5 paths at `cf126ea` carry M6's changes (`8cb4d83`, `c3af0ac`, `f58a816`), which are M6's round. My Round 5 acceptance of m5-d2 was a miss, and QA's separating input is recorded. |
| 2026-11-24T06:54 | implementer-019 (M6 hand-off, record `128c224d`, `Handoff-At: 119471f`; steering's brief not yet arrived) | Review M6 | Round 6 at `119471f`: **APPROVED_WITH_COMMENTS**. CR-18 and CR-19 RESOLVED. AC-6.1b's read holds at `5ec0621` and the tip. The run-unit move is decision-neutral: 0 of 36,690 nodes differ, and the m5-d2 control gives 24. CR-20 MEDIUM, measured: the normaliser rebuilds the run unit per line on every operation, 71 ms per keystroke at 400 lines against 1.1 ms at the base (about 20 ms at 200 lines). It is a stated limit under the cap and goes to steering as an owner question. CR-21 LOW: `emoji-regex` has no importer. |
| 2026-11-24T09:29 | implementer-019 (M6 Fix Round 1, record `9c6bb958`, `Handoff-At: 42128cd`); planner-019 (dispositions, R-92, record `7100aab8`); steering-hooks-fixer (a finding reached outside the hand-off route: two helper measurements, effort rulings block 09:22Z, record `ed4ab9b8`); steering's brief for the round not arrived | Round 6 sub-entry: confirm CR-20 | Round 6 sub-entry at `42128cd` (tree = `10abfa9`): **APPROVED_WITH_COMMENTS**. CR-20 RESOLVED: one unit build per call, both sweeps reconciled, 2 of 2 mutants KILLED by assertion on the count test. AC-6.8's timed limb holds in its shape (5.5 ms at 2,048 lines). The residue is confirmed by a fixed-point oracle: 8 of 27,252 keystrokes, every one in an unclean-fence input, a wider family than recorded. CR-22 LOW: a failed bench median hangs the run (exit 124). CR-23 MEDIUM, steering's route, re-measured: closing a fence costs 416 ms at 2,048 lines against 166 ms at `119471f`, because of the whole-unit settle per dirty line. It is a stated limit pending the owner's word through steering. Milestone-scoped: the plan Status is not moved. |
| 2026-11-24T19:40 | implementer-019 (M6 Fix Round 2, record `0a086b41`, `Handoff-At: 85ece66`); steering's brief for the round not arrived | Review M6 Fix Round 2 (AC-6.9) | Round 7 at `85ece66`: **REJECTED** on CR-25 HIGH, whole-run work repeated per operation, because both new memories are keyed on `editor.children`. Closing a code fence above 1,000 emoji lines (3,999 characters) takes 7.6 s, where the chain base throws in 48 ms; a paste of 200 emoji lines takes 940 ms against the base's 241. CF-30's form holds (Slate 0.123.0's budget read; no `catch`, no `shouldNormalize`). The caret fix covers its class: 306 of 36,560 keystrokes differ, all in the selection, each now on the edited line. No throw, mounted or not. The bench fails by assertion (planted ceiling: exit 1, 4.7 s). CR-24 LOW: the mounted test swallows the act's error. CR-23's named member is resolved and its class carried by CR-25. D-24's words govern the fence member. Milestone-scoped: the plan Status is not moved. |
| 2026-11-24T22:55 | implementer-019 (M6 Fix Round 3, record `731ff3a1`, `Handoff-At: 2b82972`); steering-hooks-fixer (blocks 20:58Z `493aa6cc`, 22:41Z `40823e74`); planner-019 (SL-29 brief, `e241aa14`; R-111, `b1f0f60c`) | Review M6 Fix Round 3 (CR-25, D-26, CR-24) with SL-29 | Round 8 at `2b82972` (a round: `retypeLines`' marker change is outside the findings): **REJECTED** on CR-25 HIGH's time member, 7 of 8 `a🙂` fence members over SL-29's line (line-2 close 1,230.7 ms at 1,000 lines against the base's 52.2 ms throw), already sent back under D-24 by block 22:41Z. CR-25's count member RESOLVED (count limb red at `85ece66` by assertion, linear at the tip); CR-24 RESOLVED; paste within the line at both sizes and fills; 0 of 39,320 keystrokes differ; CR-26 LOW new (4 of 15,966 pastes: a fence-closing `> ` line inside `>>>` keeps its marker in its text). Evidence `verification/019/code-review/m6fix3-2b82972/`. |
| 2026-11-25T05:29 | implementer-019 (M6 Fix Round 4, record `32c4a684`, `Handoff-At: a7ad3f2`); architect-019 (CF-33, `4dfc0505`); planner-019 (R-111, `b1f0f60c`) | Round 8 sub-entry: confirm CR-25's time member and CR-26 | Round 8 sub-entry at `a7ad3f2`: **REJECTED** on CR-28 HIGH (a lone backtick at the end of line 0, paired with one ending the last line, throws Slate's iteration error from 100 `a🙂` lines at `85ece66` and the tip, and mounted the backtick never reaches the message; `af3d95a` takes 2 operations with no throw). CR-27 MEDIUM is a severity floor: 6 corpus keystrokes leave rebuilt lines that a forced normalise changes, and the no-suppression mutant restores them. CR-29 MEDIUM goes to steering (block 20:58Z): a fence close over typographic-quote lines takes 9.6 to 18.5 s at 1,000 lines. CR-25 HIGH RESOLVED (SL-29 0 of 20 over); CR-26 LOW RESOLVED; load unchanged in 0 of 13,148; no paste regressions. Evidence `verification/019/code-review/m6fix4-a7ad3f2/`. |

## Scope of this round

Milestone M2 at `22f3e58`. Criteria assessed, as Revision 9 states them at round open: AC-2.1 to AC-2.7 (§ M2 — The engine and its
adapter). M3 to M6 are not under review here. Each of them gets a round at its own document's `Handoff-At`.

Files reviewed, each read through `git show 22f3e58:<path>`, are every file in the implementation document's Files Modified and
Files Created tables: `package.json`, `pnpm-lock.yaml`, `src/providers/MarkdownProvider.tsx`, `src/utils/markdown/engine.ts`, the
seven new test files and `src/utils/markdown/__tests__/helpers/importersOf.ts`. The base-to-tip `git diff --stat 5ec0621 22f3e58`
lists those 12 paths and no others.

Process whose output is the evidence: the probes and mutants below run the implementer's committed code in a scratch clone of
`22f3e58` that has its own frozen install. The predicates and payload sets were written by me, and they are instruments over that
code, not models of it. All instruments are under `verification/019/code-review/`.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md` (present: `ls -l` and `git ls-files
--error-unmatch`, both run from `/usr/local/bin/hooks/agent-output`); `architecture/website.md` W-3.
**Alignment Status**: ALIGNED

The adapter is the single module that names the engine (D-001 and W-3: one engine for both views). It is the remedy that the
Problem Area "The site's markdown is a hand-kept copy of Discord's rules in two rule sets" recommends. At M2 no surface renders from
it yet, so W-3's "the preview does not move without the editor" is not yet engaged.

The implementer recorded one decision: `MarkdownProvider` imports `engine.ts` statically, which puts about 12 KB of wasm glue in the
provider's chunk. That is within "the mechanism is the implementer's". The provider mounts on the edit page, `/preview` and
`MessagePreview` only (`git grep MarkdownProvider 22f3e58 -- src`), so other pages do not carry the glue. I did not measure the
size.

## TDD Compliance Check

**TDD Table Present**: Yes
**All Rows Complete**: Yes. Each row has a first red (module-absent for a new module's first row) and a named mutant.
`tdd-check.py` refuses TypeScript, so the table was read by hand, as the implementer also says.
**Concerns**: Two rows claim behaviour that no assertion pins. The mutants named in the table do not reach it (CR-1):
- "`parseLossless(surface, …)` (the surface's own mask)", M2-06;
- "`nodeRenderer`", whose mapped-kind limb the "gives a mapped kind its renderer" case is meant to pin.

Bug-form tests: none (no `// escaped:` line, no defect-named title). That is correct for an intra-chain milestone.

## Checks run this round

| Check | Result | Capture |
|---|---|---|
| AC-2.7 in an export: `pnpm install --frozen-lockfile` in a `git archive` of `22f3e58`, under `systemd-run` | exit 0; lockfile sha256 identical before and after. This closes the implementer's Outstanding item "AC-2.7 in an export" | `m2-ac27-install-frozen-export.{log.txt,exit}`, `m2-export-lock-{before,after}.sha256` |
| AC-2.2: base-to-tip lockfile diff | 20 added and 4 removed lines (`--numstat`). These are the two engine packages with integrity hashes, paracord's importer entry moved, and `semver@7.8.6` gaining `optional: true`, which matches the implementation document's disposition. No other pin moved | `m2-lockfile-diff-5ec0621-22f3e58.txt` |
| `convention-check.js --files` over the 10 M2 source and test files, in the export | 0 FAIL, 0 CANDIDATE, 2 SKIP: `package.json` is not examined, and id-token and basename are skipped because there is no record above the export | `m2-convention-check-export.txt` |
| The two skipped checks, by hand: the workspace ID-token class over basenames, titles and comment lines, and the positive basename form | 0 ID-token hits. All 7 test basenames match the positive form, and the helper is not a test file | `m2-id-token-by-hand.txt` |
| Link allow-list attack (`isAllowedLinkUrl`, a security boundary at M4). Input class: 15 schemes × 3 casings, each padded with every C0 control, space, DEL, NBSP, BOM, U+2028 and U+3000 on either side, with tab, LF, CR, NUL, space, soft hyphen and ZWSP inside the scheme, plus `%3A`, a fullwidth colon, `https:` nesting, scheme-only forms and 14 relative or authority oddities: 4,834 payloads. Oracle: the scheme an anchor would navigate, `new URL(href, <document base>).protocol`. A defect is an admitted payload outside the list, or an absolute in-list payload that is refused | 1,535 admitted, 3,299 refused, 0 defects, 0 wrongful refusals. The predicate uses the WHATWG parser a browser uses, so an absolute href is judged as the browser reads it, and a relative one is refused. Residue: this attacks the predicate only. The anchor that will carry the href is M4's, and the attack is re-run against it there | `m2-link-allowlist-attack.mjs`, `.out` |
| Mutation probes for CR-1, through `mutation-run.py` on `22f3e58`, suite = the 9 M2 test files (control 280 cases, exit 0) | 3 mutants: 1 KILLED (incidentally, see CR-1), 2 SURVIVED | `m2-mutants-cr.json`, `m2-mutants-cr-2.json`, `m2-mutants-cr-out/`, `*.runner.txt` |
| Engine parse before `init()`, under Node, network-isolated (`unshare -rn`) | parses `**a**` with no `init()` call (CR-2) | `m2-parse-before-init-node.mjs`, `.out` |

## Findings

### Critical
None.

### High
None.

### Medium

CR-1 MEDIUM Round 1 RESOLVED. Both routing cases are now `it.each` over every key (6 surfaces, 16 node kinds), with literal expected values, at website `78c5f74`. The class is gone: the enumeration (`git grep -nE "\[[A-Za-z]+( as [A-Za-z]+)?\]"` over `engine.ts`) still gives the same two lookups and the type index, and each lookup is now asserted on every key. Captured check: `verification/019/code-review/m2fix-mutants-cr-78c5f74.json`, five CR-1 probes, including two mid-table swaps. All are KILLED on the routing case itself (`m2fix-mutants-cr-78c5f74-titles.txt`). Argument: record `a8588f39`.

CR-2 MEDIUM Round 1 RESOLVED. `parseLossless` returns `LosslessNode | undefined`, and `undefined` unless the adapter's state is `resolved`, in every runtime, at website `78c5f74`. There are still no product callers (`git grep -n "parseLossless("` outside `__tests__`: the definition only), and the single `parseWasm(` call sits behind the guard. `engine.not-ready.test.ts` runs the real engine through pending, in flight, rejected and resolved. Its pending and rejected cases discriminate because Node would otherwise self-initialise. Captured check: the same mutants file, three guard probes (guard removed, pending admitted, rejected admitted), each KILLED on the matching not-ready case. Argument: record `a8588f39`.

### Low/Info

CR-3 LOW Round 1
- **Category**: Maintainability
- **Title**: `TOKEN_LEAF_ROLES` is a flat token-to-role map, but AN-6 makes five of its 21 roles depend on context, and the M2
  document names two
- **Location**: `src/utils/markdown/engine.ts` `TOKEN_LEAF_ROLES` at `22f3e58`; analysis `019-…-analysis.md` AN-6 table.
- **Class**: A static map whose values are a lossy flattening of a context-dependent table and that no test asserts. The next
  milestone inherits values that look settled but are not.
- **Enumeration**: AN-6's table, row by row against the map, gives 5 of 21 entries whose role depends on position or the enclosing
  node:
  - `delimiter`: before or after, plus the stack;
  - `code_delimiter`: open if it is the node's first child, else close;
  - `code_content`: `codeBlockText` in a code block, else the stack;
  - `url`: close marker after `link_close`, else the stack;
  - `whitespace`: open marker after `subtext_marker`.
  The implementation document's "M5 refines `url` and `whitespace`" names 2. No test asserts any value: `engine.kind-maps.test.ts`
  checks keys only. That is what AC-2.4 asks for, so this is not a criterion failure.
- **Issue**: M5 needs a function of (token, context). A map whose values are kept beside it becomes a second, partly wrong source of
  the same rule. This is the Incomplete Extraction shape, deferred one milestone.
- **Required Action** (carrier: this document, read by the M5 implementer and by this review's M5 round; it holds nothing at M2):
  at M5, the leaf role is computed from (token, enclosing stack, position) in one function, with AN-6's table as its literal test.
  `TOKEN_LEAF_ROLES` is then either deleted or reduced to the context-free entries that the function reads, never kept beside it.
  The M5 round checks that one source remains (`git grep -n TOKEN_LEAF_ROLES`).

CR-4 LOW Round 1
- **Category**: Checks That Cannot Fail
- **Title**: The import scan's "unresolvable" report sees only a template with a substitution, and misses every other non-literal
  dynamic import
- **Location**: `src/utils/markdown/__tests__/helpers/importersOf.ts` `SUBSTITUTED_DYNAMIC_IMPORT` at `22f3e58`.
- **Class**: A confinement instrument that is meant to name every import it cannot resolve, but recognises one non-literal form
  only (a template with `${…}`), so `import(variable)`, `import(a + b)` and `require(variable)` are neither importers nor reported.
- **Enumeration**: `git grep -nE "\b(import|require)\(\s*[^'\"\` )]" 22f3e58 -- '*.ts' '*.tsx' '*.js' '*.mjs'` gives 6 hits, all in
  server test files: `secretEquals.credential-sites` ×2, `shared.upsert-broadcast`, `guildMessages.malformed-query`,
  `guildMessages.statbot-key-required` and `v1Routes.statbot-key-required`. The scan reports 0 of them, because they are not of the
  template form (`m2-enumerations.txt`). The predicate does not match a dynamic import split across lines after `import(`, or an
  `import` called through an alias.
- **Issue**: None of the six can name an engine package (each imports a route handler by path), so AC-2.1 holds today. But the
  instrument's own claim, "a dynamic import with a substituted template is reported as unresolvable", is narrower than the class
  of imports it cannot read. Its controls plant only the template form.
- **Required Action**: walk the TypeScript AST (`ts.createSourceFile`) for `import(...)` and `require(...)` calls whose argument is
  not a string literal or a no-substitution template, and report each as unresolvable. Add a planted `import(name)` and
  `import('@discord/' + n)` to the control. The real-tree case then names its accepted unresolvables, the six above, so that a
  seventh fails the case. Falsity signature: at `22f3e58` the planted `import(name)` file is absent from `scan.unresolvable`, and
  the case fails on that assertion. Not blocking. It may land in the CR-1 and CR-2 fix round or at M3, where the oracle helper
  becomes AC-2.1's second member.

## Round 1 sub-entry: fix confirmation at `78c5f74`

The scope is the fix commit `78c5f74`, read by path:
- `engine.ts`;
- `engine.init-states`, `engine.kind-maps` and `engine.link-schemes` tests;
- the new `engine.not-ready.test.ts`.

Not reviewed here: `805fff6` and `548b16b`, which sit between `22f3e58` and `78c5f74`. They are M3 test work (vitest projects,
the lifted corpus, the canonical form, the generator, `helpers/discordOracle.ts`) and touch no M2 product file
(`git diff --stat 22f3e58 78c5f74`). They are reviewed in M3's round. The verdict binds to the M2 paths at `78c5f74` only.

| Check | Result | Capture |
|---|---|---|
| `pnpm install --frozen-lockfile` in a scratch clone of `78c5f74` | exit 0 | `m2fix-install-frozen-78c5f74.log.txt` |
| Re-attack of the routing and the new guard: 8 probes through `mutation-run.py`. These are my three Round 1 probes re-anchored, two mid-table swaps that neither a first-key nor a last-key fixture would catch, and three guard mutants. Suite: the 8 M2 engine and provider files under `--project node --project dom` (control 270 cases, exit 0) | 8 of 8 KILLED, count `checked`. Each kill includes the routing or not-ready case that names it, by assertion, with no timeout | `m2fix-mutants-cr-78c5f74.json`, `m2fix-mutants-cr-78c5f74-out/`, `-titles.txt`, `.runner.txt` |
| Enumerations re-run at `78c5f74` | keyed lookups: the same 2 plus the type index; `parseWasm(` calls: 1, behind the guard; product callers of `parseLossless`: 0 | (commands in the CR-1 and CR-2 lines) |
| `convention-check.js --files` over the 5 fix files, and the ID-token class and basename form by hand | 0 FAIL, 0 CANDIDATE. The id-token and basename checks are skipped by the tool and pass by hand (0 hits; `engine.not-ready.test.ts` matches the positive form) | `m2fix-convention-check-78c5f74.txt` |
| Expectation independence | the routing literals and the renderer table are written in the tests, not read from the adapter. The not-ready test runs the real engine, with only `init` replaced in the rejected case | n/a |

Disclosure: my R-25 plan row was first written with a typed stamp one minute ahead of the clock. The stamp gate
(`stamp-gate-hook`) and `plan-row-commit.js` refused it. I restamped it from `date -u` through `record-edit.js` (`{now}`) and committed it as
`1de99085`. That met the gate; it was not a workaround.

I did not run the whole suite, which is QA's. The implementer reports 3026 of 3026 with exit 0 at `78c5f74`.

## Round 2 at `7dcedc9`

The trigger is the implementer's fix round 2, for QA's QAF-29 (a nested payload union with no map) and QAF-30 (the `BITS` table not
checked against the pin). It is recorded in `implementation/019-…-m2-implementation.md` § Fix Round 2, `Handoff-At: 7dcedc9`. The fix
adds production code that neither CR-1 nor CR-2 covers, so this is a new round, not a sub-entry.

The scope is the M2 paths in `git diff 78c5f74 7dcedc9`: `engine.ts` (+23 −4), `engine.kind-maps.test.ts` and
`engine.surface-masks.test.ts`. `1bcab7a` is M3 oracle work and is reviewed in M3's round. That covers `discordBuild`, `discordLive`,
their tests, `src/@types/jsdom.d.ts` and the four added lines of `helpers/discordOracle.ts`; the last is read here only as
`engine.surface-masks`'s new import. Criteria: AC-2.4, as Revision 9 states it, for the nested `modifier` kinds.

Assessment:
- `MODIFIER_KINDS` follows the existing kind-map pattern in the same file (`satisfies Record<ModifierKind, string>`, like
  `EMOJI_KINDS` and `MENTION_KINDS`).
- `modifierStyle` follows `nodeRenderer`.
- `warnUnmapped` makes the once-per-kind-per-document line one mechanism instead of a copy. Its key space is shared, and the
  modifier labels are prefixed `modifier.`. A collision would need an engine node kind containing a dot; none is declared at the pin.
- The values equal the keys, and nothing consumes them before M4 and M5. That is the same shape as CR-3 and is carried with it.
- `PINNED_SINGLE_BIT_SYNTAX` filters the package's `Syntax` enum to single-bit numeric members, which skips the numeric enum's
  reverse-mapping names and `ALL`. Comparing it with the literal `BITS` keeps the literal as the expected value and the package as
  the thing measured, so expectations stay independent.

| Check | Result | Capture |
|---|---|---|
| `pnpm install --frozen-lockfile` in a scratch clone of `7dcedc9` | exit 0 | `m2r2-install-frozen-7dcedc9.log.txt` |
| CR-1 class sweep re-run (`git grep -nE "\[[A-Za-z]+( as [A-Za-z]+)?\]"` over `engine.ts`) | 4 hits: the type index, `SURFACE_MASKS[surface]`, `NODE_RENDERERS[kind…]` and the new `MODIFIER_KINDS[kind…]`. The new lookup is asserted on all five keys with literal styles | below |
| Re-attack: the 8 Round 1 probes, plus 3 for the new lookup and line (constant style, a mid-table swap, the `modifier.` prefix dropped), through `mutation-run.py` on `7dcedc9`. Suite: the 8 M2 files under `--project node --project dom` | 11 of 11 KILLED. Each kill includes the case that names it, by assertion. The prefix probe was first NOT-APPLIED because a shell heredoc ate its backticks; it was repaired and re-run alone over `engine.kind-maps.test.ts` (control 32, exit 0), and KILLED on the unmapped-modifier case | `m2r2-mutants-cr-7dcedc9.json`, `-warn-label.json`, `-out/`, `-titles.txt`, `*.runner.txt` |
| `convention-check.js --files` over the 3 files, and the ID-token class by hand | 0 FAIL, 0 CANDIDATE; 0 ID-token hits | `m2r2-convention-check-7dcedc9.txt` |
| Product callers of `modifierStyle` and `MODIFIER_KINDS` | 0 outside `__tests__` | n/a |

The implementer's QAF-29 class sweep names four other nested payload unions: `LinkKind`, quote `line` or `rest`, list `ordered`,
and `heading.level`. It leaves them unmapped at M2 because no M2 code branches on them. I agree: AC-2.4 maps kinds the renderers
select on, and those renderers are M4's. The M4 round checks it (Assumption Not Checked, Round 2).

No new finding. I did not run the whole suite. The implementer reports 3041 of 3041 with exit 0 at `7dcedc9`.

## Round 3 at `f4060c5` (M3)

The trigger is the implementer's M3 hand-off: `implementation/019-slate-formatting-discord-engine-m3-implementation.md`, record
`f78d803b`, `Handoff-At: f4060c5`, chain base `5ec0621`.

Scope: every M3 path in `git diff 22f3e58 f4060c5`, which is 50 files (+3,366 −6, of which 3,049 lines are not data). M2's
`engine.ts` and `engine.*` files are excluded except `engine.import-confinement.test.ts` and its helper, which carry CR-4's fix.
Read through `git show f4060c5:<path>`. Probes ran in a scratch clone of `f4060c5` with its own frozen install (`pnpm install
--frozen-lockfile`, exit 0, `m3-install-frozen-f4060c5.log.txt`; the four install logs were first saved as `.log`, which the record's `.gitignore` excludes, and were renamed at this round's record so that they are committed).

Criteria assessed, as Revision 9 states them at round open: the M3 form, the outcome table, the classes, the visible form, the
generator, the fixed inputs, the lifted seeds, the reports, the drift alarm, the normaliser, AC-3.3, AC-3.4, AC-3.5 and AC-3.8 (i),
(i′) and (iii). The site-DOM limbs of AC-3.1, AC-3.6 and AC-3.7, AC-3.2's editor side and AC-3.8 (ii) are M4's and M5's, as the
implementation document says. They are not assessed here. The plan has moved since Revision 9 by registration rows only (R-23 to
R-28), which change no criterion.

Process whose output is the evidence: the implementer's committed helpers, run by my probes in the clone. The predicates and planted
files are mine. Nothing in this round drove `pnpm test:discord` or fetched Discord. Every probe ran under `unshare -rn`.

### Checks run this round

| Check | Result | Capture |
|---|---|---|
| The oracle window's network channels. The window is built through `loadBuild` exactly (its options and `installShims`), with a minimal runtime script. From inside it, `fetch`, `XMLHttpRequest`, `WebSocket` and `sendBeacon` are tried against a loopback listener the probe owns. Oracle: the listener's log | `fetch` is refused, as the shim intends. **`POST /xhr` and a WebSocket `UPGRADE /ws` reach the listener** (CR-6). `EventSource` and `sendBeacon` are absent | `m3-oracle-window-network.mjs`, `.out` |
| The removal test over the generator's first 200 inputs: for each tagged bit, does `Syntax.ALL & ~bit` change the pinned engine's parse? | In the catalogue range, `<game:1558266761101447248>` tagged `GAME_MENTION` changes nothing (CR-5). The other dead tags are a link-embedded emoji, the deliberately invalid timestamp styles `x` and `Z`, and composed inputs where a construct sits inside code or is unbalanced. Those are bookkeeping, not claims the coverage report reads (it uses the removal test itself) | `m3-generator-bit-tags.mjs`, `.out` |
| CR-4 re-attack: planted `createRequire(import.meta.url)(n)`, `module.require(n)`, an aliased `require` and a concatenated engine import under `__tests__/`, run through `importersOf` and the real-tree rule | The three non-test forms are **not reported**. The test-file concatenated engine import is reported, then **exempted** by the real-tree rule (CR-4, reopened) | `m3-importers-of-reattack.mjs`, `.out` |
| `convention-check.js --files` over the 40 M3 `.ts`, `.tsx`, `.mjs` and `.js` files, and the ID-token class by hand | 0 CANDIDATE, 0 ID-token hits. The one FAIL is pre-existing, not this change's: 3 comments in `vitest.config.ts` that are present at `22f3e58` (`git show 22f3e58:vitest.config.ts`, 3 comment lines). `--files` judges whole files, and the implementer's `--since` run judges added lines only. ESLint is clean | `m3-convention-check-f4060c5.txt` |
| The game-mention form in the inputs | `git grep` over the generator and its test: `<game:${ID}>` and `NEEDLES.GAME_MENTION = /<game:\d+>/`. The 272 corpus holds 0 inputs with `<@$` | (commands in CR-5) |

### Findings (Round 3)

CR-5 MEDIUM Round 3 RESOLVED. At website `1698c80`, the generator writes `GAME_MENTION` as `<@$<id>>` and keeps `<game:id>` as
an untagged near-miss. The generator test's needle comes from AN-8's form (`/<@\$\d+>/`), and `constructsOf` is asserted to name
`GAME_MENTION` for the real form and no bit for the near-miss. That last check runs the real engine's removal test, so its expected
value is independent of the generator. The class is gone:
- the removal test at `1698c80` (`m3fix-generator-bit-tags.out`) has no `GAME_MENTION` among the catalogue's dead tags;
- 4 of 5 tagged inputs change the parse when the bit is removed (the fifth is a composed input, bookkeeping as in Round 3);
- 5 of 5 near-misses are inert and untagged;
- `git grep -n "<game:" 1698c80 -- src` gives 3 hits, all the near-miss by design.

Captured checks that fail if the class returns: `verification/019/code-review/m3fix-mutants-cr-1698c80.json` (KILLED: the
withdrawn form put back, the real form dropped, the near-miss tagged). The preferred form (a zero cell for a carried bit fails the
coverage run) was not built. The residue measurement's re-run is carried by `implementation/019-…-m4-implementation.md` Next step 5,
ahead of M4's adjustment choice, which is where the Round 3 rejection said the cost fell. Argument: record `dd5b093d`.

CR-6 MEDIUM Round 3 RESOLVED for the network class. At website `1698c80`, `installOracleShims` replaces `fetch`,
`XMLHttpRequest`, `WebSocket`, `EventSource` and `navigator.sendBeacon` with refusals.

Re-attacked from first principles, network-isolated, with a positive control (a host-realm request that the listener logs):
- 18 paths from inside a `loadBuild` window, including the XHR through `self`, the WebSocket through `globalThis`, a Request-like
  `fetch`, a `.wasm` URL with no wasm given, `img`, `script`, `link`, `iframe`, form submit, `window.open` and `location.assign`;
- the listener saw 0 of them (`m3fix-oracle-window-network.mjs`, `.out`).

Captured checks: `discordBuild.network-refusal.test.ts`, plus `m3fix-mutants-cr-1698c80.json`. KILLED in that file: the address
not recorded, `fetch` answering, and WebSocket recording without refusing. The record half of the preferred form has a gap, which
is CR-10. Argument: record `dd5b093d`.

CR-7 LOW Round 3
- **Category**: Maintainability (held-out sets)
- **Title**: The base-red hold-outs are shared between the typed and pasted limbs and keyed by edit position, and the plan's M6
  names no deletion of them
- **Location**: `src/components/SlateEditor/__tests__/helpers/roundTripInputs.ts` `mountedInputs` and `MOUNTED_BASE_RED`;
  `helpers/blockLayerEdits.ts` `EDITS_BASE_RED`; `helpers/data/{mountedBaseRed,blockLayerEditsBaseRed}.json`, at `f4060c5`.
- **Class**: A hold-out from a property that is wider than the limb's own red set, or keyed so that its members can change meaning,
  and that has no carrier naming its removal.
- **Enumeration**: there are three hold-outs in the tree (`git grep -n "BASE_RED\|holdsEmoji" f4060c5 -- src`):
  - `MOUNTED_BASE_RED`: one set per class, applied to both the typed and pasted limbs. The implementation document says pasted
    fails on 19 atom pairs and 3 block texts that typed passes, so typed is held out of 22 inputs it passes;
  - `EDITS_BASE_RED`: 346 indices into `blockLayerEdits(800)`, an enumeration whose per-line edit count comes from the loader's
    output (`node.quotePrefix`). The 15,480 count control catches a size change, not a reorder;
  - `holdsEmoji`: 645 of 1,000 generator inputs and 549 of 769 probe inputs held out of the load and normalise limbs.
- **Issue**:
  - Outstanding 2's reading is sound. The base-red members cannot land red in a green suite, and no test pins them wrong (axiom D).
  - But a hold-out is a list that can hide a regression on its own members, and these are wider than their limbs' red sets.
  - Nothing in the plan's M6 says the three are deleted. I checked by `grep` of the plan for `held out`, `BASE_RED` and
    `mountedBaseRed`: 0 hits.
- **Required Action**:
  - Split `MOUNTED_BASE_RED` by limb, typed and pasted, each holding only its own red members.
  - Key `EDITS_BASE_RED` by `(text, line, offset)` rather than by index.
  - Carry the deletion of all three hold-outs as an M6 exit condition. This is the planner's to register, as a Planner batch row
    under the M6 cap (a stated limit, below HIGH), and is routed to `planner-019`.
  - Falsity signature for the split: with each limb's red set alone, the typed limb runs the 22 pasted-only members, and passes.
  - Not blocking.
  - **Carrier for the M6 deletion**: plan R-30 (`planner-019`, a Planner batch row under the M6 cap). The check is
    `git grep -c "BASE_RED\|holdsEmoji"`, which prints nothing at M6's tip. The split and the re-keying stay open (M3 Outstanding 11).

CR-8 LOW Round 3
- **Category**: DRY / AC-2.1 wording
- **Title**: The oracle helper's default content mask is computed from the package's `Syntax` enum beside the literal of the same
  value
- **Location**: `src/utils/markdown/__tests__/helpers/discordOracle.ts` `CONTENT_MASK_LITERAL` and `SURFACE_MASK_LITERALS.content`,
  at `f4060c5`.
- **Class**: One mask held twice in the oracle helper, once as AN-3's literal and once derived from the pinned package. At a pin
  change that moves `Syntax.ALL`, the two diverge silently. AC-2.1 says the helper "calls the engine only with AN-3's literal masks".
- **Enumeration**: `git grep -n "Syntax\.\(ALL\|DEV_LINKS\)" f4060c5 -- 'src/**/__tests__/**'` finds the helper's
  `CONTENT_MASK_LITERAL` and `SYNTAX_ALL`. `SYNTAX_ALL` is the removal test's base and is correctly derived, since the coverage
  report needs the package's full set. `CONTENT_MASK_LITERAL` is the member.
- **Required Action**: `nativeParse`'s default becomes `SURFACE_MASK_LITERALS.content`, and `CONTENT_MASK_LITERAL` is deleted or
  defined as that literal. Not blocking.

CR-9 LOW Round 3
- **Category**: Placement (Test Conventions)
- **Title**: The jsdom type declaration sits in `src/@types/`, which the production program includes, so production code
  importing the dev-only `jsdom` now type-checks
- **Location**: `src/@types/jsdom.d.ts` at `f4060c5`.
- **Class**: A test-only declaration placed where the production `tsconfig.json` (which includes `src/**/*.ts`) reads it. That
  removes the type error which, without types, stops a production import of a dev-only package. `eslint.config.mjs` sets
  `import/no-extraneous-dependencies` with `devDependencies` left at its default (allowed), so lint does not catch it either.
- **Enumeration**: `git ls-tree --name-only f4060c5 src/@types/` lists 7 files. `jsdom.d.ts` is the only one for a package used
  only under `__tests__` (`git grep -n "from 'jsdom'" f4060c5 -- src bot` gives 1 hit, `helpers/discordBuild.ts`).
- **Required Action**: move the declaration under `src/utils/markdown/__tests__/helpers/` (`tsconfig.test.json` includes
  `src/**/__tests__/**/*.ts`), keeping it free of top-level imports so it stays ambient. Falsity signature: after the move,
  `pnpm run typecheck` still exits 0, and a scratch production file importing `jsdom` fails the base program with TS7016. Not
  blocking.

CR-4 LOW Round 1, re-verified in Round 3: **partly resolved**.
- **What is fixed:** `loadsNonLiteral` now reads every `import(...)` and bare `require(...)` call whose argument is not a string
  literal. Its control plants five members and five non-members.
- **What remains, by re-attack** (`m3-importers-of-reattack.out`):
  - `createRequire(import.meta.url)(n)`, `module.require(n)` and an aliased `const r = require; r(n)` are not reported;
  - the real-tree case `has no file outside the test directories that loads a module by a specifier the scan cannot read` exempts
    every path under `__tests__`. A test file `import('@discord/markdown-' + n)` is seen, then exempted. AC-2.1's confinement
    covers test files too: one helper only.
- **Required Action** (as Round 1 asked):
  - the real-tree case names its accepted unresolvables (the six server-test loads Round 1 listed), so that a seventh, in any
    directory, fails;
  - `loadsNonLiteral` also reports a call whose callee is a call of `createRequire` and any `.require(` member call.
  - Not blocking.

INFO, Round 3, no action owed:
- **Lazy-chunk fetch (Outstanding 4).** 166 MB per live run is a standing cost of the command, not a defect, and no stable pointer is
  known. Accepted as stated.
- **The `isContentEditable` shim (Findings 6).** It is an absent API defined, not an inert one, and the `beforeinput` paste branch it
  does not reach is routed to QA Phase 2 or UAT (Outstanding 7).
- **Outstanding 5.** The AC-3.4 mutations of `getInitialValue`, `flattenNodeText`, `withNormalizeNode` and the paste handler are
  QA's Phase 2 sweep.
- **The two surviving helper mutants (Outstanding 6).** They are accepted as equivalent over the committed classes on the reasons
  given. M3-r19a's equivalence rests on the loader keeping every line, which the 15,480 count control watches.

Other surfaces I read and found sound:
- **Visible form:** `visibleForm.ts` implements each invisible class and counted dimension the plan lists (bold and italic on
  whitespace, quote-in-spoiler as `q*`, list kind, start number and depth).
- **Routing predicates:** they bind facade calls through the module alias, and the switch through the require call or the flag
  name.
- **Form:** the project form keeps `project()` and the default exclude.
- **Typed drive:** the `onChange` drive reads `writes`, never `editor.children`, except the stated line-break sanity check.
- **Pasted limb:** its refusal cases assert the toast text and the unchanged write.

Verdict, Round 3: **REJECTED** on CR-5 and CR-6.
- **CR-5:** M4 starts from the residue measurement, and both its adjustment choice and AC-3.7 have no game mention in them today.
- **CR-6:** the oracle is M3's deliverable, and its expected values must come from the build alone.

Both fixes are small. CR-4, CR-7, CR-8 and CR-9 are LOW: CR-7's carriage goes to the planner, and the rest may land in the same
fix round.

### Round 3 sub-entry: fix confirmation at `1698c80`

The trigger is the implementer's fix round 3: `implementation/019-…-m3-implementation.md`, record `e1c265a7`, `Handoff-At:
1698c80`. Steering's resume message after my `/clear` confirmed the route.

Scope: the fix commit `1698c80`. These are its 7 paths, read through `git show 1698c80`:
- `helpers/discordBuild.ts`, `helpers/markdownGenerator.ts`;
- `discordBuild.network-refusal.test.ts` (new), `discordReports.report-forms.test.ts`, `markdownGenerator.seeded-inputs.test.ts`,
  `discord/discordLive.oracle-controls.test.ts`;
- `SlateEditor/__tests__/helpers/data/mountedBaseRed.json`.

Not reviewed here: `93b26fd`, which sits between `f4060c5` and `1698c80`. It is M4 product work (`preview.tsx`, the spoiler and code
block components, the editors) and touches none of the 7 paths (`git show --stat`). It belongs to M4's round.

Re-verified at the end of the review: the chain branch had moved to `f131f06` (M4, the preview's channel mention). `git diff --stat
1698c80 f131f06` over the 7 paths is empty, so the verdict stands at `1698c80`, and what is about to run carries the same 7 files.

The fix stays inside CR-5 and CR-6, so this is a sub-entry and not Round 4. The plan is at Revision 10. Its delta from Revision 9
is AC-4.4 and D-17, both M4, so no M3 criterion moved.

Process whose output is the evidence: the implementer's committed helpers, run by my probes in a `git archive` export of
`1698c80`. The export has its own frozen install (exit 0; its lockfile sha256 equals `1698c80`'s), and every probe ran under
`unshare -rn`. The mutants ran through `mutation-run.py` on `1698c80`, with the shared tree's `node_modules` as `--dep`; that
tree's lockfile hash equals `1698c80`'s.

| Check | Result | Capture |
|---|---|---|
| CR-6 re-attack: 18 paths from inside a `loadBuild` window to a loopback listener, plus a positive control from the host realm. Oracles: the listener's log and `oracle.attempts` | The control is logged. The listener saw 0 of the 18. The record lists 10 of the 18 addresses: 3 `fetch`, 3 XHR, 2 WebSocket, `EventSource` and `sendBeacon`. Not recorded: the XHR whose first touch is `addEventListener`, which throws `x.addEventListener is not a function` before `open` (CR-10); and the 7 subresource and navigation paths, which jsdom never loads and which therefore neither reach the network nor record | `m3fix-oracle-window-network.mjs`, `.out` |
| CR-5 removal test over the generator's first 200 inputs | `GAME_MENTION` is not among the catalogue's dead tags. Of the 5 tagged inputs, 4 are live. All 5 near-misses are untagged and inert | `m3fix-generator-bit-tags.mjs`, `.out` |
| 7 probe mutants, suite = the 3 offline files the fix touches under `--project node` | 6 KILLED, each by assertion with count `checked`. **SURVIVED: `CR6-probe-loadbuild-attempts-disconnected`** (`loadBuild` hands the shims a fresh `[]`) (CR-10) | `m3fix-mutants-cr-1698c80.json`, `-out/`, `.runner.txt`, `.cmd.txt` |
| CR-5 sweep re-run: `git grep -n "<game:" 1698c80 -- src` | **3 hits, not the 4 the implementation document's Class Sweep lists.** The fourth, `mountedBaseRed.json:17`, is not in the file at `1698c80` | below |
| `mountedBaseRed.json`, by class, `f4060c5` against `1698c80` | `corpus`, `atoms` and `block` are identical. In `generator`, 8 members were removed and 9 added (10 to 11), and the new set equals `m4-base-red-generator-m3fix.json`'s typed set | below |
| `convention-check.js --files` over the 6 code files in the export, and the ID-token class by hand (`grep -c`) | 0 FAIL, 0 CANDIDATE; id-token and basename are SKIPped by the tool because there is no record above the export. By hand: 0 ID-token hits, and `discordBuild.network-refusal.test.ts` matches the positive form | `m3fix-convention-check-1698c80.txt` |

Record corrections owed by the implementer. They do not move the verdict:
- The Class Sweep's fourth `<game:` hit does not exist.
- Outstanding 11's "the earlier 10 are stale in the set" is wrong: the set was replaced, and 2 of the old members recur in the new
  one.
- `m4-discord-live-cr6.log.txt` stamps its run at 21:37, but the fix commit is stamped 21:46. The run therefore came from the
  shared tree before the commit, and "at the same code" is a claim this review does not verify (Assumption Not Checked, Round 3
  sub-entry).

CR-10 MEDIUM Round 3 RESOLVED at website `2c1590f` (severity floor met). `discordBuild.locators.test.ts` now runs a synthetic
module through `loadBuild` and asserts `oracle.attempts` before and after the module's XHR, WebSocket and `fetch`. That is the
failing assertion the live control's empty record lacked. `RefusedXMLHttpRequest` is a Proxy that refuses and records on any
member *called*.

The class is gone for the wiring and for called members. Captured check:
`verification/019/code-review/m3fix4-mutants-cr-2c1590f.json` (4 of 4 KILLED). It includes
`CR10-probe-loadbuild-attempts-disconnected`, which survived at `1698c80` and is now killed by assertion on the new case
(`expected [] to deeply equal [ …(3) ]`). A narrower member remains, an XHR member that is *read* and not called, and it is CR-11.
Argument: record `62c1ba99`.

Disclosures for this sub-entry:
- **Destructive-command check, twice.**
  - My first mutation-run line began with `rm -rf` on shell-variable paths, and the check refused it. Nothing was deleted: the
    directories did not yet exist. I dropped the removal and used a new literal work directory.
  - The second line held no removal, and the check still refused it, because it could not parse a `$CMD` expansion. Its message
    allows a non-deleting command to be re-sent in plain syntax. I wrote the mutants file with the Write tool and called the runner
    with literal arguments.
  - Neither refusal was routed around a removal.
- **Stamp gate.** It refused my estimated changelog stamp of 22:05. I restamped the row from `date -u`.

Verdict, Round 3 sub-entry at `1698c80`: **REJECTED** on CR-10 (severity floor). CR-5 and CR-6 are RESOLVED. The fix is a test
case and a few lines in `RefusedXMLHttpRequest`, and it is confirmed as a further sub-entry of Round 3.

### Round 3 sub-entry: CR-10 confirmation at `2c1590f`

The trigger is the implementer's fix round 4: `implementation/019-…-m3-implementation.md` § Class Sweep, Round 4, record
`72b59f64`, `Handoff-At: 2c1590f`.

Scope: the fix commit `2c1590f`, read through `git show 2c1590f`:
- `helpers/discordBuild.ts` (+5 −1);
- `discordBuild.locators.test.ts` (+17).

Not reviewed: `f131f06` and `c32e058` (M4), which sit between `1698c80` and `2c1590f` and touch neither path.

Process whose output is the evidence: as in the previous sub-entry. The probes ran in a `git archive` export of `2c1590f` with its
own frozen install (exit 0, lockfile sha256 equal to the SHA's), under `unshare -rn`. The mutants ran through `mutation-run.py`
on `2c1590f`.

| Check | Result | Capture |
|---|---|---|
| Re-attack: the previous 18 paths, plus 3 XHR forms that read a member rather than call it, with the positive control | The control is logged, and the listener saw 0 of the 21. `xhr addEventListener before open` is now recorded (`XMLHttpRequest.addEventListener`). **Not recorded: `x.upload.addEventListener(...)`, where `upload` is read, returns a function and has no `addEventListener` (TypeError); and `x.readyState`, read as a function, not `0`.** `onload` set, then `open`, records by address (CR-11) | `m3fix4-oracle-window-network.mjs`, `.out` |
| 4 probe mutants over `discordBuild.locators` and `discordBuild.network-refusal` (`--project node`): the disconnect, XHR open-only, WebSocket unrecorded, address constant | 4 of 4 KILLED, by assertion with count `checked`; the disconnect fails on the new case | `m3fix4-mutants-cr-2c1590f.json`, `-out/`, `.runner.txt` |
| Expectation independence of the new case | The expected list is a literal, and the module runs through the real `loadBuild`. The fixture's XHR touches `addEventListener` first, which is the fixture property CR-10 asked for | n/a |
| `convention-check.js --files` over the 2 files, and the ID-token class by hand (`grep -c`) | 0 FAIL, 0 CANDIDATE, id-token and basename SKIPped by the tool; 0 hits by hand | `m3fix4-convention-check-2c1590f.txt` |
| Record corrections | Class Sweep: 3 `<game:` hits. Outstanding 11 says the class "was replaced rather than shifted". The live-log caveat is recorded, and Handoff-At no longer claims "at the same code" | `implementation/019-…-m3-implementation.md` at `72b59f64` |

CR-11 LOW Round 3
- **Category**: Checks That Cannot Fail
- **Title**: The refused XHR records a member when it is called, not when it is read, so an XHR whose first touch is a property
  read is lost from the record
- **Location**: `src/utils/markdown/__tests__/helpers/discordBuild.ts` `installOracleShims`, the `get` trap of the
  `RefusedXMLHttpRequest` Proxy, at `2c1590f`.
- **Class**: the same as CR-10's: a record that can be empty while an attempt was made. The member left is the access that is
  not a call.
- **Enumeration**:
  - The Proxy's `get` trap returns a throwing function for every member and records only when that function is called. Every
    XHR property a client reads is therefore a member: `upload` (then `.addEventListener` or `.onprogress`), `readyState`,
    `status`, `responseType`, `withCredentials` read back.
  - By probe at `2c1590f`, 2 of 2 read forms are unrecorded (`xhr upload.addEventListener`, `xhr readyState read then open`), and
    3 of 3 call-first and set-first forms are recorded.
  - The predicate does not see a read whose result is only assigned to, such as `x.upload.onprogress = f`. That form records later
    at `open`, so it is outside the class.
- **Issue**:
  - The implementer's claim is "any member touched, `open` or not, refuses and records". That claim holds for calls only.
  - The network stays closed in every case, so CR-6 is unaffected. Only the live control's "no attempt" reading is overstated.
  - The severity is not the floor's: CR-10's Minimum accepted this XHR member gap as a stated limit, and the wiring, the part
    the floor rested on, is now asserted.
  - Whether Discord's evaluated code reads an XHR property before `open` is an unmeasured hypothesis.
- **Required Action**:
  - **Preferred**: record in the `get` trap at access (or once at construction), not inside the returned function, so a read is
    an attempt.
  - Extend the new locators case with a second XHR whose first touch is `x.upload.addEventListener`, placed neither first nor last
    among the module's attempts.
  - Falsity signature: at `2c1590f` the extended case fails by assertion, because `attempts` lacks an XHR entry for it.
  - **Minimum**: the M3 document's Class Sweep states that an XHR property read before `open` is not recorded.
  - Callers: `installOracleShims` has the same two callers as before. Only the records they see change.
  - Not blocking. Carrier: this document. The implementer may take it in the M4 fix round, and this review's M4 round checks it.

Verdict, Round 3 sub-entry at `2c1590f`: **APPROVED_WITH_COMMENTS**. CR-5, CR-6 and CR-10 are RESOLVED. CR-11 is LOW, and CR-4,
CR-7, CR-8 and CR-9 are LOW and open as before, each with its carrier. M3 goes to QA Phase 2 at `2c1590f`.

### Round 3 sub-entry: QA's QAF-32 and QAF-33 at `380e82d`

The trigger is the M3 document's Round 5, `Handoff-At` set, carried in implementer-019's M4 hand-off message.
- Scope: `380e82d`, which touches test files only: `discord/discordReports.run.test.ts`, and `discordOffline.whole-command.test.ts`
  (renamed from `discord/discordOffline.fetch-failure.test.ts`). It therefore takes the scoped check and opens no round.
- Test adequacy is QA's, at its refresh pass.
- M3 is capped (blocks 22:35Z and 00:49Z): a finding below HIGH goes to the Planner batch.

Assessment:
- **QAF-32.** The offline case now runs the whole `discord-node` and `discord-dom` projects in a loopback-only namespace. It asserts
  three things: a non-zero exit, the unfetched page named, and no `\d+ passed`.
- Those three discriminate between them. If `unshare` itself fails, the exit is still non-zero, but the "names the page" case
  fails.
- **QAF-33.** The report run writes `driftReport`'s message at the head of `known-differences.md` and on stderr, and two live cases
  read the head back.
- Expectations are independent: the served and pinned hashes come from `driftReport` and are compared with the file's text, not
  with a transcription of it.
- Placement: the file names meet the positive form.

CR-14 LOW Round 3 (M3, capped: a stated limit for the Planner batch)
- **Location**: `src/utils/markdown/__tests__/discordOffline.whole-command.test.ts`, the `spawnSync` argument, at `380e82d`.
- **Class**: a test of a named command that runs its own transcription of that command. When the command changes, the test keeps
  checking the old one.
- **Enumeration**:
  - `git grep -n "project discord-node --project discord-dom" e58f2ed -- src package.json` gives 2 hits: `package.json`
    `test:discord`, and this test's string.
  - There are no other spawns of a named script in `src/**/__tests__`: `git grep -n "spawnSync\|execSync" e58f2ed -- src` names this
    file only.
  - The predicate does not see a transcription that spells the projects in another order.
- **Required Action**: spawn `pnpm run test:discord` (or the command read from `package.json` `scripts['test:discord']`) inside
  `unshare -rn`.
- **Falsity signature**: with `test:discord` changed to drop `--project discord-dom`, the case spawns what the script says. Today
  it does not.

Verdict, Round 3 sub-entry at `380e82d`: **APPROVED_WITH_COMMENTS**. QAF-32 and QAF-33 are QA's to close at its refresh.

### Round 3 sub-entry: QA's QAF-36 at `b04c09f`

The trigger is the M3 document's Round 6, `Handoff-At: b04c09f` (record `fe8ce8f3`), carried by steering's resume message.
Steering's brief stays `steering/019-brief-code-reviewer.md`.
- Scope: `9a5f4fe` and `b04c09f`. Both touch files under `__tests__/` only:
  - `helpers/discordLive.ts`: `compareWasm` is extracted, and `driftReport` now calls it;
  - `discordLive.drift-compare.test.ts`, new;
  - `discordSurfaces.rich-rule-ids.test.ts`, new.
  The scoped check applies, and no round opens. Test adequacy is QA's, at its refresh pass.
- Tree: the files were read through `git show b04c09f:<path>`. The four paths in the shared tree equal `b04c09f`
  (`git diff --quiet b04c09f`). The mutants ran in `mutation-run.py` exports of `b04c09f`.
- Cap: M3 is capped (blocks 22:35Z and 00:49Z). A severity floor is excepted.
- Process whose output is the evidence: the suite's own cases, run against mutants of the helper. I authored the mutants, not the
  cases, so this is a probe of the cases.

Checks:
- **Expectations are independent.** The literal hashes in the drift-compare case match `sha256sum` of `01 02 03` and `01 02 04`,
  run here (`fixture-hashes.txt`).
- **The extraction preserves behaviour.** The old body of `driftReport` moved verbatim into `compareWasm`. `driftReport` passes
  `compareWasm` the fetched `bytes` and `readFileSync(PINNED_WASM)`, the same two operands the old body hashed.
- **Mutants.** The table is in `mutation-table-offline.json` and `mutation-table-live.json`, and every control passed.

| Mutant | Run against | Outcome |
|---|---|---|
| `compareWasm` `match = true` | `drift-compare` | KILLED |
| `compareWasm` `match = false` | `drift-compare` | KILLED |
| message arms swapped | `drift-compare` | KILLED |
| `driftReport` calls `compareWasm(readFileSync(PINNED_WASM), readFileSync(PINNED_WASM))` | `drift-compare` | **SURVIVED** |
| the same | live `discordLive.oracle-controls` and `discordReports.run`, 15 cases | **SURVIVED**, 15 of 15 passed |
| `richRuleIds`: the comma form dropped | `rich-rule-ids` | KILLED |
| `richRuleIds`: the shape check off | `rich-rule-ids` | KILLED |
| `richRuleIds`: `!combineId` dropped | `rich-rule-ids` | **SURVIVED** |
| `richRuleIds`: `!rulesId` dropped | `rich-rule-ids` | KILLED |

- **Conventions.** `convention-check.js --files` over the four paths: 0 FAIL, 0 CANDIDATE, 1 SKIP (`convention-check.txt`).
  - The SKIP is the id-token basename check. I checked it by hand: the basenames `discordLive.drift-compare` and
    `discordSurfaces.rich-rule-ids` and their six titles hold no ID token.
  - Both basenames meet the positive form, and each module segment is the helper's own basename.
- **TDD record.** Round 6's red run and mutants are recorded in its prose (`m3-red-drift-1.txt`, `m3-mutant-drift-match-*.txt`).
  The TDD Compliance table carries no row for the two new files. That correction is owed in CR-15's fix round.

CR-15 MEDIUM Round 3 (M3, a severity floor, excepted from the cap). It is the member of QAF-36's class that the round left.
- **Location**: `src/utils/markdown/__tests__/helpers/discordLive.ts`, `driftReport`, its `return compareWasm(…)`, at `b04c09f`.
- **Class**: the drift alarm can be wired so that it can only say "equal", and no assertion fails. The offline case covers the
  comparison, but nothing covers that the served bytes reach it. The live state today is "equal", which is exactly the outcome a
  mis-wiring forces, so the live cases cannot tell the two apart.
- **Enumeration**:
  - The mutant above: `driftReport` handing `compareWasm` the pinned file as the served operand. It SURVIVED offline and live
    (`live-drift-served-bytes-not-wired.stdout.txt`: `Tests 15 passed (15)`). Measured hits: 1.
  - Search for the class's other forms: the implementer's sweep of oracle helpers (Round 6's table) names one other live-only
    assembler, `routingReport`. Its fields feed live assertions whose expected values are literals of today's served build. A
    mis-wiring that forces a field to today's value survives in the same way. I ran no mutant there.
  - What the predicate cannot see: a mis-wiring that is not of the operand-swap form, such as `compareWasm(bytes, bytes)`, which
    survives for the same reason and was not run. Also any field of `routingReport`: not measured, so that population is QA's.
- **Required Action**:
  - **Preferred (structural)**: make the fetch part of what the offline case runs, so that served bytes not reaching the
    comparison cannot be expressed in `driftReport`. Two ways:
    - Move the fetch-and-compare into a function that takes the URL and a fetch, for example
      `compareServed(url, fetchImpl, pinnedBytes)`.
    - Or give `driftReport` an injectable fetch.
    Then add an offline case in which the stubbed fetch returns a real `Response` whose bytes differ from the pinned operand.
    - Callers: `driftReport` has three call sites, two in `discord/discordLive.oracle-controls.test.ts` and one in
      `discord/discordReports.run.test.ts`. Each passes `live` alone. With a defaulted parameter, all three keep their behaviour
      and change nothing. No caller sits outside the class.
  - **Minimum**: an offline case that runs `driftReport` itself against a stubbed `fetch`, using the smallest `Live` whose glue
    module names one wasm file.
  - **Falsity signature**: the case's `match` toBe(false) assertion fails under each of the two mutants `compareWasm(readFileSync(PINNED_WASM),
    readFileSync(PINNED_WASM))` and `compareWasm(bytes, bytes)`, as an assertion and not a timeout.
  - **Fixture property**: the stubbed served bytes differ from the pinned bytes, and the stub is the real `Response` class,
    never an invented object (Iron Law 5).
  - **Record**: the TDD Compliance rows for this round's files.
- **Risks row**: this is the falsifier of the drift alarm's C2 outcome, the property QAF-33 and QAF-36 name.

CR-16 LOW Round 3 (M3, capped: a stated limit for the Planner batch)
- **Location**: `discordSurfaces.rich-rule-ids.test.ts`, the case "names the predicate when the shape names a module the facade
  does not require", at `b04c09f`.
- **Class**: a two-operand absence check whose fixture omits only one operand, so the guard on the other operand is dead.
- **Enumeration**: `richRuleIds`'s `!combineId || !rulesId` is the one two-operand require check in the file
  (`git grep -n "if (!.* || !" b04c09f -- src/utils/markdown/__tests__/helpers` gives 1 hit). With `!combineId` dropped, the
  mutant SURVIVED (`offline-rich-combine-require-check-off.stdout.txt`). The predicate does not see absence checks spelled any
  other way.
- **Effect if lost**: live, `req(undefined)` still throws, so the run fails, but with a less legible error. It does not fail
  silently, which is why this is LOW.
- **Required Action**: a case whose omitted require is the combine module. The fixture property: the absent operand is the
  first one named, not the second.

Verdict, Round 3 sub-entry at `b04c09f`: **REJECTED**, on CR-15 MEDIUM (a severity floor).
- QAF-36's comparison limb is closed: `compareWasm` is killed under both of QA's named mutants.
- The wiring limb is open.
- CR-16 goes to the Planner batch as a stated limit.

#### Fix confirmation: CR-15 at `d6aab03`

The trigger is implementer-019's message for M3 fix round 7 (record `5305177e`, the M3 document's "Round 7").
- Scope: `d6aab03` alone. It changes `helpers/discordLive.ts` and `discordLive.drift-compare.test.ts`, both under `__tests__/`,
  read through `git show d6aab03:<path>`, and equal in the shared tree (`git diff --quiet d6aab03`).
- This is a scoped check: no round opens.
- The M5 commits that sit between (`921eeb8`, `6f4d48f`, `65b8e2c`, `3ffb2b4`) are not reviewed here; they belong to M5's round.

The fix:
- `driftReport(live, fetchImpl = fetch)`.
- The three call sites still pass `live` alone. The live run at `d6aab03` (below) shows the default reaches the network as
  before.
- The new offline case runs the real `driftReport` over a two-module `Live`, built with `node:vm` so that `sourceOf` reads the
  source verbatim. Its stubbed fetch returns a real `Response` of `09 09 09`. The case asserts:
  - the requested address;
  - `match` toBe(false);
  - the served hash.
- The fixture is the one CR-15's Minimum named. The `Response` is the real class (Iron Law 5).
- `e740a6fa…` matches `sha256sum` of `09 09 09` (`fixture-hash.txt`).

Re-attack: all 11 mutants re-ran at `d6aab03` (the 8 from `b04c09f` and 3 new ones), inside `unshare -rn`
(`cr15-d6aab03/mutation-table.json`). Every control passed, and the result is 10 of 11 KILLED:

| Mutant | Outcome | Failing assertion |
|---|---|---|
| `compareWasm(readFileSync(PINNED_WASM), readFileSync(PINNED_WASM))` | KILLED | `expected true to be false` (`mutant-4.out.txt`) |
| `compareWasm(bytes, bytes)` | KILLED | `expected true to be false` (`mutant-9.out.txt`) |
| global `fetch` in place of `fetchImpl` | KILLED | `OracleError … fetch failed`; the network was closed (`mutant-10.out.txt`) |
| the URL not built from the glue module | KILLED | the requested-address case |
| the 3 comparison mutants and 3 of the 4 rich-rule mutants | KILLED | as at `b04c09f` |
| `!combineId` dropped | SURVIVED | CR-16, a stated limit, as before |

The two operand mutants fail on the `match` assertion and not by a timeout, which meets CR-15's falsity signature.

Other checks:
- **Live default.** In an export of `d6aab03`, `discordLive.oracle-controls` and `discordReports.run` exit 0 with 15 of 15
  passed, and the hashes are `equal` (`live-d6aab03.txt`).
- **TDD rows.** The M3 document's TDD table now carries rows for `compareWasm`, for `richRuleIds` and for `driftReport` with an
  injected fetch.
- **Conventions.** `convention-check.js --files` over the two paths: 0 FAIL, 0 CANDIDATE, 1 SKIP (the id-token basename check).
  Checked by hand, the new title holds no ID token.
- **Network disclosure.** The implementer's first run of the global-fetch mutant was not isolated. It made one GET to
  `discord.com/assets/cafe01.wasm`, which returned 404. That is a read, disclosed in the round, and every run of mine was
  isolated.
- **Count discrepancy, for M5's round and QA.** The offline suite the implementer reports at `d6aab03` is 223 files and 3,268
  cases. At `b04c09f` it was 214 files and 3,460 cases. Nine more files but 192 fewer cases come from the M5 commits in
  between, not from `d6aab03`, which adds one case. That is M5's to account for.

CR-15 is **RESOLVED**:
- The class is gone. A mis-wired served operand now fails offline, and the fetch is part of what the case runs.
- Captured check: `discordLive.drift-compare.test.ts` "compares the bytes the stubbed fetch serves…", with the instrument in
  `verification/019/code-review/cr15-d6aab03/`.

Verdict, Round 3 sub-entry at `d6aab03`: **APPROVED_WITH_COMMENTS**.
- QAF-36 is closed on both limbs, and M3 goes to QA's refresh pass.
- CR-16 LOW stays a stated limit, plan R-54.

#### Fix confirmation: QA's QAF-38 at `81c68b2`

The trigger is steering's hand-off of M3 fix round 8 (the M3 document's "Round 8", record `d43e2b40`, `Handoff-At: 81c68b2`). It
answers QAF-38 MEDIUM (record `08b81933`, `Verified-At: d6aab03`).
- Scope: `81c68b2` alone. It changes `helpers/discordRouting.ts` and `discordRouting.predicates.test.ts`, both under
  `__tests__/`, read through `git show 81c68b2:<path>`, and equal in the shared tree. This is a scoped check: no round opens.
- Process whose output is the evidence: the suite's case, run against mutants I wrote. That makes it a probe of the case.

The fix:
- `routingReport(live, fetcher = fetch)` passes the fetcher on to `loadLazyChunks`. The live caller passes `live` alone.
- One `it.each` case in four shapes runs the real `routingReport` over a stub `Live`: three `node:vm` modules, a runtime naming
  one lazy chunk, and a stubbed fetcher returning a real `Response`. Each shape asserts the whole report.
- Every field takes both values across the four shapes, and today's shape gives today's values. That meets QAF-38's remedy.
- The expected values are literals derived from the stub shape, not from the code under test.

Re-attack: 14 mutants at `81c68b2`, all in `unshare -rn` (`qaf38-81c68b2/mutation-table.json`). The control passed, and **14 of 14
were KILLED**, 13 of them by `AssertionError`:
- QA's six: each AC-3.8 field forced to today's constant.
- Four operand swaps: the embed switch read from V2, the V2 switch read from the embed, `v2CallsParse` read from the embed, and
  `parseRichEmbedText` read from V2.
- One member swap: `parseEmbedTitle` asked as `parseEmbedTitleWithoutLinks`.
- `switchReferrers` forced empty, and `switchReferrers` without the self-exclusion.
- The fetcher not passed on. It fails with `OracleError … fetching https://discord.com/assets/abcd.js`, with the network closed
  (`mutant-12-fetcher-not-passed.out.txt`).

Other checks:
- **Live default.** In an export of `81c68b2`, `discordRouting.oracle-controls` exits 0 with 5 of 5 passed
  (`live-routing-81c68b2.txt`).
- **Class sweep, re-run.** `git grep -n "export \(async \)\?function [A-Za-z]*(live: Live"` over `helpers/` gives 7 hits
  (`class-enum-81c68b2.txt`). It misses `driftReport`, whose signature spans two lines, so the population is 8.
  - The M3 document's "7 exported functions" names 8. That is a count slip in the record and moves nothing.
  - I accept the disposition of the other six: each checks one input's served parse against a per-input expected value over 106
    to 2,378 inputs, so a field forced to a constant cannot match them all. QA's sweep concurs.
  - The predicate does not see a function that takes `Live` under another parameter name, or one inside a non-exported helper.
- **Conventions.** `convention-check.js --files` over the two paths: 0 FAIL, 0 CANDIDATE, 1 SKIP (the id-token basename check).
  Checked by hand, the titles hold no ID token.
- **Note.** The stub's served chunk is empty, so `loadLazyChunks`'s eval branch, which loads a wanted chunk, does not run in this
  case. That is outside QAF-38's class (field wiring), and the live run covers it.

QAF-38 is closed for review:
- The class is gone for `routingReport`.
- Captured check: `discordRouting.predicates.test.ts` "the routing report of a build", with the instrument in
  `verification/019/code-review/qaf38-81c68b2/`.
- The closure itself is QA's, at its refresh.

Verdict, Round 3 sub-entry at `81c68b2`: **APPROVED_WITH_COMMENTS**. M3 goes to QA's refresh pass. CR-16 LOW stays a stated limit
(R-54).

## Round 4 at `e58f2ed` (M4)

The trigger is implementer-019's M4 hand-off: `implementation/019-slate-formatting-discord-engine-m4-implementation.md`, record
`bc73f58c`, `Handoff-At: e58f2ed`.

Scope: the M4 commits in `f4060c5..e58f2ed`, read through `git show e58f2ed:<path>`. That is 13 commits:
- `93b26fd`, `f131f06`, `c32e058`, `36924ae`, `6379abc`, `0b9f76f`, `5ccb54d`;
- `35c4b40`, `cf605d0`, `aa728f3`, `0bc8e02`, `2149ce2`, `771c64f`, `268b9fb`, `e58f2ed`.
- Not in scope: the three M3 fix commits in the range (`1698c80`, `2c1590f`, `380e82d`), each reviewed in its own sub-entry above.
- Size: 20 product files (+436 −91) and 18 new test files.

Criteria, as the plan states them at round open (Revision 12):
- AC-4.1 to AC-4.8;
- the site-DOM limbs of AC-3.1, AC-3.6 and AC-3.7;
- AC-3.8 (ii);
- AC-4.5.

Rulings that bound this round:
- **Cap**: M4 to M6 are capped (block 00:49Z, `8de0ac3`). A finding below HIGH becomes a stated limit for the Planner batch, with
  no fix round. A severity-floor finding, and a security finding at HIGH or above, are excepted.
- **Planner R-44** (record `49cb5d73`): Outstanding 0a (c) to (h) are stated limits, and two of them are mine to check, (d) and (f).
- **SL-12 and SL-13** are in force.

Process whose output is the evidence:
- a `git archive` export of `e58f2ed` with its own frozen install (exit 0; lockfile sha256 equal to the SHA's);
- every probe ran under `unshare -rn`;
- the convention check ran on the shared tree, which equals `e58f2ed` over `src` and `package.json` (`git diff --quiet`);
- the payload sets, oracles and samples are mine.

| Check | Result | Capture |
|---|---|---|
| **Link allow-list at the rendered anchor** (security boundary; the M4 item that Round 1's attack left open). Entry point: the production `markdown.static.*`, all six, drawn through `react-dom/server` and read back by the DOM's HTML parser. Input class: M2's 4,834 payloads, each in 5 link syntaxes (`[l](P)`, `[l](<P>)`, `[l](P "t")`, `<P>`, bare after a space): 24,170 renders per surface. Oracle: for every `<a>`, `new URL(rawHref, <document base>).protocol` must be in the allow-list, and the anchor must carry no attribute but `href` and `title` | **0 defects and 0 extra attributes on all six surfaces.** 1,594 anchors per surface on 5 of them, by resolved scheme: `https:` 1,267, `http:` 237, `mailto:` 36, `tel:`, `sms:` and `discord:` 18 each. `embedTitleWithUrl` draws 0 anchors, and its positive control is 0 too, by its mask; the other five controls draw 1 | `m4-anchor-attack.probe.tsx`, `m4-anchor-attack-<surface>.out` |
| Span units: is the engine's `span` in UTF-16 code units (what `sourceOf` and the timestamp edit slice), or in UTF-8 bytes? | UTF-16. `é**a**` has its bold at 1–6, and `日本 <t:…>` has its timestamp at 3. The edit rewrites the right characters | `m4-span-units.mjs`, `.out` (at `e58f2ed`'s export) |
| Round 2's Assumption Not Checked: payload branches without a literal table | list `type` is `"unordered" \| "ordered"` (`@discord/markdown-types` 0.14.0), and the ternary covers both. `LinkKind` has 4 members: `masked`/`contact` take label nodes, `detected`/`auto` the url, by design. Quote `line`/`rest` is not branched on. `heading.level` is typed `number` and drawn as `` `h${level}` `` with no table, but the engine emits 1 to 3 only (`#### a` is text) (CR-12) | `m4-heading-levels.mjs`, `.out` |
| Planner (d): no adjustment module | `git grep -n -i adjust e58f2ed -- src` matches only CSS `text-size-adjust` and the residue list's family text | (command) |
| Planner (f): each normalisation applies to both sides | Holds at all 3 comparison sites. `looseForm` applies `drawnLanguages` and `collapseRepeatedStyles`, and `looseFormOfLegacy` is `looseForm(legacyCNodes(…))`. `visibleDifferences` applies `drawnLanguages` to both sides when either side is the DOM. The element-map case applies neither to either side | (read at `e58f2ed`: `helpers/previewDom.tsx` `looseForm`; `helpers/visibleForm.ts` `unitsFor`) |
| Revision 12's Reading Order, AC-3.7: the residue list's families, reasons, counts and sampled entries | 6,142 entries over 5 surfaces. The committed `counts` equal the entries' tally for every family and surface, and both equal the M4 document's table. In a seeded sample (2 per family, never first or last), each family's label matches the entry's minimal differing input, which `m4-dom-residue-all.json` records. Traced: `gen:112` `_\n`` F12; `gen:672` `` `p`` `` F08; `gen:1081` `#  ` F09; `gen:855` `  \n` F14. The rules that assign a family are not in any record (CR-13) | `m4-residue-sample.txt` |
| `convention-check.js website --since=f4060c5` | 1 FAIL: `GuildProvider.tsx:162` `react-hooks/use-memo`, a line from before the chain base, flagged because the chain touched the file. It is pre-existing; the implementer reports it as a follow-up. 3 CANDIDATEs: `waitFor` poll budgets (`page.channel-names`, `page.field-name-links`, `preview.timestamp-edit`), each resolving when its condition holds and none asserting a duration. ID-token and basename SKIPped by the tool. By hand, over the 18 new test files: 0 basename failures; 0 ID tokens in names, titles or comments (the one hit, `l1`, is fixture data); 0 `// escaped:` lines | `m4-convention-check-e58f2ed.txt` |

The first anchor run, all six surfaces in one process under a 900 s cap, was killed at the cap and wrote nothing. The shards each
exited 1 only because the probe's synchronous body ran past vitest's 600 s per-test limit, and vitest flags that after the body
returns. Each output records every one of its 24,170 renders.

Also read and found sound:
- **Renderer.** `preview.tsx` sends every unmapped node and modifier kind to its source text. The legacy hljs code block's
  `dangerouslySetInnerHTML` is carried over unchanged from `rules.tsx`. React children carry labels, names and emoji alts.
- **Emoji.** `emojiSrc` builds through the existing `getEmoteURL` and `getEmojiURL` helpers.
- **Mentions.** `useGuildChannels` reads the context without throwing outside the provider. The lookup compares `String(id)`,
  exact past 2^53.
- **Timestamp edit.** `Markdown.tsx` replaces the span (UTF-16, as above). The popover's `onChange` refreshes with `onEdit` on
  every render.
- **Field name.** `embedHasUrl` reaches both the static and the editing branch.
- **TDD.** Every table row has a red: a first-run failure, or a named mutant in an isolated export. The rows marked "No" are the
  implementer's named deviations, and the mutants stand as their red; the stub-tree records were not made, as the document says.
  The `0bc8e02` slip, one failing case fixed at `2149ce2`, is disclosed and intra-chain. The self-check sweep (61 of 71, with 10
  dispositioned) is the implementer's and QA's to judge at Phase 2; I did not re-run it.
- **CR-11** (M3) is not addressed at `e58f2ed`. Its carrier is the M4 document's Outstanding -1. Under the caps it goes to the
  Planner batch with the other open M3 LOWs.

CR-12 LOW Round 4 (M4, capped: a stated limit for the Planner batch)
- **Location**: `src/utils/markdown/preview.tsx` `createHeading`, at `e58f2ed`.
- **Class**: a renderer that draws an engine payload through a template rather than a literal table, so that a value outside the
  table draws a wrong element, with no `markdown-engine-unmapped-kind` line. This is Round 2's Assumption Not Checked, the one
  member that remains.
- **Enumeration**: the payload branches in `preview.tsx` are `heading.level`, list `type`, link `kind` and quote (none); the
  grep is `git grep -n "kind.value as\|kindOf(node).value as" e58f2ed -- src/utils/markdown/preview.tsx`. One member remains,
  `heading.level`, and it has no reachable value at the pin: the engine emits 1 to 3 (`m4-heading-levels.out`). The predicate does
  not see a branch on a payload read under another name.
- **Required Action**: a literal `{ 1: 'h1', 2: 'h2', 3: 'h3' }` with an unknown level drawn as source text through `warnUnmapped`.
- **Falsity signature**: a fixture tree (one that invents engine output, named so) with level 4 draws `<h4>` today, and draws its
  source plus the unmapped line after the fix.

CR-13 LOW Round 4 RESOLVED at record `511f704`. The implementer committed the family-assignment script
(`verification/019/impl/m4-build-entries.py`), and I ran it (`python3 -I`, output to the session scratchpad) and compared the
result with the list committed at `e58f2ed`. The record is `verification/019/code-review/m4-residue-family-rebuild.txt`.
- **Families:** 6,142 of 6,142 equal, in the same entry order, and the family blocks (code, name, reason, counts) are identical.
- **Signatures:** the script writes them per position. Collapsed into runs of consecutive positions with equal dimensions, they
  equal the committed run form for all 6,142 entries. That collapse step is not in the script; the signatures keep their own
  instrument, the live `discordPreview.legacy-equality` test, which re-derives them.
- **Negative control:** with rules F02 and F03 swapped in order, 700 of 6,142 families move, all of F02. An F12/F13 swap moves 0,
  because the two never overlap.
- The captured check that fails if the class returns is the rebuild comparison in that file. The planner's Planner batch row for
  CR-13 (R-47) can close.

Disclosures for Round 4:
- **My plan row is numbered R-37, which `planner-019` already holds.** I committed it as `05cc2005`, stamped 01:01. I took the
  number from the last `R-` row in file order, R-36, not the highest number in use, R-46.
- **The row tool refused the renumbering.** `plan-row-commit.js` refuses a changed second cell by design, so a committed ID stays
  fixed. I restored my uncommitted edit and left the row as committed, and I did not route around the refusal.
- **Routed to `planner-019` and steering.** The row's reference is its stamp. The numbering is the planner's to reconcile, and the
  table already holds two other repeated numbers (R-36 and R-43, not mine).

Verdict, Round 4 (M4 at `e58f2ed`): **APPROVED_WITH_COMMENTS**.
- The security boundary held under attack at the rendered anchor.
- No finding reaches MEDIUM, and none is a severity floor.
- CR-12 and CR-13 go to `planner-019` as stated limits under the 00:49Z cap.
- M4 goes to QA Phase 2 at `e58f2ed`.

## Round 5 at `2e36107` (M5)

The trigger is implementer-019's M5 hand-off (`implementation/019-slate-formatting-discord-engine-m5-implementation.md`, record
`b9e9247c`, `Handoff-At: 2e36107`), confirmed by steering's hand-off message. The brief stays `steering/019-brief-code-reviewer.md`.
The `Handoff-At` field was re-read at the record and at the end of the round. The document's later commit `294cf515` touches its
Resumption State only.

Scope: the M5 commits `921eeb8`, `6f4d48f`, `65b8e2c`, `3ffb2b4` and `2e36107`, read through `git show 2e36107:<path>`.
- 29 paths under `src/components` (+1,265 −837): `m5-2e36107/m5-files.txt` lists the 27 added or modified, and two are deleted.
- Not in scope: `d6aab03` and `81c68b2`, M3 fix rounds reviewed in their own sub-entries.

Criteria, as the plan states them at round open (Revision 12, plan record `4222fc9e`):
- AC-5.1 to AC-5.8. AC-5.5 is UAT's walk (QA register B-3), and this round does not assess it.
- CR-3, owed from M2.

Rulings that bound this round:
- **Cap**: M5 is capped (block 00:49Z). A finding below HIGH is a stated limit for the Planner batch. A severity floor is
  excepted.
- **The 8 eslint FAILs in `SlateEditor/index.tsx`**: the owner's "list them, fix later" (block 03:48Z, record `6866cd75`). They are
  carried by `handoff/slateeditor-index-preexisting-react-hooks-lint-errors-2026-11-24.md`, and are not a finding here.

Process whose output is the evidence:
- For the M5 limbs, the suite's own cases, which I attacked with mutants and probes of my own.
- For the AC-5.8 exclusion, a probe of mine. It is a model, and I calibrated it against the committed test: with the exclusion in
  place, it reproduces the test's counts exactly.

### Reading, file by file

- **`decorator.tsx`.**
  - The contract `(editor, mounted, isEmbed, surface) → ([node, path]) → Range[]` is kept, with the surface in place of the
    parser, which is the plan's Mirrors line.
  - `unitAround` joins adjacent non-`codeBlock` elements with `\n`, puts a quote's `quotePrefix` into the text but not into the
    node offsets, and counts an inline element as one `?`. `before` counts an element as 1, so the offsets and the text agree by
    construction.
  - The unit map is per pass, reset by `editor.children` identity. The style cache is per decorator, keyed on fence context plus
    text, FIFO, bounded at 512.
  - `rangesOf` is shared by the inline path and the code-line path.
- **`unitStyles.ts`.**
  - The leaf role comes from `TOKEN_LEAF_ROLES`, refined by context in one function, `paintToken` with `walkNode`: `codeContent`
    inside a code block, `url` and `stack` after `link_close`, and the whitespace after `subtext_marker`.
  - The synthetic fence framing (`OPENED`, `CLOSED`) is cut back by the `shift` and the clamp in `paint`.
- **`highlightScan.ts`.**
  - It scans highlight.js's public `HighlightResult.value` grammar: `<span class="…">`, `</span>` and the five entities that
    highlight.js's `escapeHTML` emits. No `_emitter` read remains: `git grep -n _emitter 2e36107 -- src` gives 0 hits.
  - A scope with two class names, such as `hljs-title function_`, stays one string, and `RenderLeaf`'s `classnames` call renders it
    as two classes.
- **`SlateEditor/index.tsx`.** `decorate` is a `useMemo` over `[engine, mounted, isEmbed, surface]`, so the cache resets when the
  engine settles or the surface changes.
- **`Desktop.tsx` and `Mobile.tsx`.** The gate is `engine === 'pending'` in place of `!interactiveParser`. When the engine is
  rejected the editor opens unformatted, because `styleUnit` returns `undefined` and no ranges are drawn.
- **The six call sites.** Each passes its surface, and the field name follows the embed's url. `git grep` finds no
  `contentParser`, `interactiveParser` prop or `createLeaf` left in `src`.
- **Patterns.** The decorator contract, `markdown.scss`'s leaf classes, `useEngineState` and the lifted `markdownProviderMock` (at
  its third copy) match the M5 document's Patterns Extended. The code-line path reuses the inline path's `rangesOf`, and no new
  dependency edge duplicates an in-file idiom.
- **Tests.** The 15 test files are spec-form: no `// escaped:`, and no bug-form title.
  - All the basenames meet the positive form, with 0 ID tokens by the workspace class (`m5-files.txt`, checked with `grep -E` over
    the basenames).
  - AC-5.4's expected value is highlight.js's HTML parsed by jsdom's `DOMParser`, the plan's oracle, independent of the scanner.
  - AC-5.7 counts through a pass-through mock of the adapter.
- **Conventions.** `convention-check.js --since=b04c09f` gives 9 FAIL:
  - the 8 eslint FAILs, under the owner's ruling;
  - `withNormalizeNode.ts:53` `max-len`, another session's uncommitted M6 work in the shared tree, not M5's.

  It reports 0 CANDIDATE and 20 SKIP, the SKIPs being the ID-token check (done by hand above), captures and deleted files.
  `--files` over the 27 paths adds comment FAILs on comments that predate M5 in files M5 touched. Those are not lines M5 added.
- **TDD Compliance.** The table is present, with a row for every function and test file. Its "No" rows are closed by the named
  mutants and by the stub-tree red.

### Checks run this round

- **CR-3 (owed from M2).** `git grep -n TOKEN_LEAF_ROLES 2e36107 -- src` gives:
  - the map in `engine.ts`;
  - its one production reader, `unitStyles.ts` `roleOf`;
  - the key test `engine.kind-maps`.

  The context-dependent roles are resolved in the one function that reads the map, and no second role source exists:
  `git grep -n "openMarker\|closeMarker"` outside tests gives only `engine.ts` and `unitStyles.ts`'s switch. **CR-3 RESOLVED.**
  AN-6's table as a literal test is partial: `unitStyles.char-classes` has 9 cases, and `decorator.native-box-classes` compares the
  frozen box.
- **The M4 helper defect the implementer reports (Outstanding 5)**, confirmed by reading `visibleForm.ts` `walk` at `2e36107`.
  `c` is in `STYLE_NAMES`, so the `n.name === 'c'` branch never runs. Whether it matters, measured by two mutants of
  `preview.tsx`'s `inlineCode` arm against the whole offline suite in `unshare -rn`
  (`m5-2e36107/mutation-table-inline-code.json`):
  - Dropping the code text is KILLED by M4's own `canonFromDom.element-map` "inline code" and `preview.engine-tree-render` "draws
    inline code", as well as by M5's `decorator.preview-equals`.
  - Drawing a `<span>` in place of the `<code>` is KILLED by `preview.dom-equals-engine-tree` and `canonFromDom.element-map`.

  So the preview's inline code is guarded at M4 without M5. CR-17 LOW below.
- **The AC-5.8 exclusion (the implementer's second risk).** `editorChars` returns `null` for an input with any emoji element, so
  the whole input is dropped, not only the element. Probe `crprobe.preview-equals-emoji` (copied as `.txt`), with its results in
  `probe-emoji.out.txt`, in run order:
  1. **Calibration.** With the exclusion in place, it compares 1,138 inputs on three surfaces and 1,098 on the two titles, 0
     differing. Those are the implementer's counts.
  2. **Emoji-bearing inputs only.** 1,107 on three surfaces and 1,147 on the titles, with about 549 differing.
  3. **Emoji stripped on both sides.** A first strip also removed mention atoms, which was my error. The emoji-only strip leaves
     295 of 1,107 differing on three surfaces, 310 on `embedTitle` and 182 on `embedTitleWithUrl`.

  I sampled 15 (`probe-emoji-dump.out.txt`). Each sampled difference is one of two kinds:
  - The Slate layer lifting a shortcode or an emoji into an emoji element inside a link label or inline code, where the preview
    shows the text (`corpus:224`, `` `:smile:` ``; `gen:60`, `[:smile:](https://x.y)`; `gen:218`). That is `getInitialValue`'s
    lift, which M5 does not change, and AC-6.5 (M6) re-decides it.
  - My probe's handling of emoji that the preview draws as pills.

  None was the decorator mis-styling a text character. So the stated reason holds on the sample, but the exclusion is wider than
  its reason. CR-18 LOW below.
- **Survivor m5-d2 (the quote prefix left out of the unit).** The implementer calls it equivalent "so far". I tested the input
  class I expected to separate it: an open delimiter on a plain line, closed on a quote line, over seven inputs (`*`, `**`, a
  backtick, `||`, `__`, and two mixed). Probe `crprobe.quote-prefix-unit`, with results in `probe-quote.out.txt`: the engine's
  classes on the content characters are the same with and without `> `. So no separating input was found here either. I accept
  the disposition as recorded, with the population bounded by these seven inputs and the implementer's.
- **Orphans the colouring change leaves.**
  - Width inference (`openingWidth`, `closingWidth`, `growMaskedLinkClosing`, `reduceAdjacentSyntax`) and `constructClassName`
    are gone: `git grep -c` gives 0 at `2e36107`.
  - `surrogateSourceOffsets` is still read, by `interactiveParser`, which serves `parseEmoji`. That is the lift, which is M6's.
  - `markdown.interactive.parseContent`, `parseEmbedTitle` and `parseEmbedField` have no production reader. CR-19 LOW below.

### Findings (Round 5)

CR-17 LOW Round 5 (M4, capped: a stated limit for the Planner batch)
- **Location**: `src/utils/markdown/__tests__/helpers/visibleForm.ts`, `walk`, its `STYLE_NAMES` arm before its `n.name === 'c'`
  arm, at `2e36107` (and at M4's `e58f2ed`).
- **Class**: a branch made dead by an earlier, broader arm. So a comparison built on the visible form cannot see one construct, an
  inline code node's text and style on the DOM side.
- **Enumeration**: `STYLE_NAMES` is the one set that overlaps a later named arm in `walk` (`git grep -n "STYLE_NAMES\|n.name ==="
  2e36107 -- src/utils/markdown/__tests__/helpers/visibleForm.ts`). Its readers are `preview.dom-equals-engine-tree`,
  `discordPreview.legacy-equality` and `decorator.preview-equals`, the last of which works around it with `codeWithKids`. The
  predicate does not see an arm shadowed by a condition spelled another way.
- **Effect**: the preview's inline code is still guarded, by two M4 tests (measured above). This is why it is LOW. Neither of M4's
  comparisons would see an inline-code text difference between the DOM and the engine tree.
- **Required Action**: test `n.name === 'c'` before the style arm, or take `c` out of `STYLE_NAMES`. Then delete
  `decorator.preview-equals`'s `codeWithKids`.
- **Falsity signature**: `visibleFromDom(drawnDom('embedDescription', '\`a\`'))` returns the unit `a` with style `c`, where today
  it returns `[]`.

CR-18 LOW Round 5 (M5, capped: a stated limit for the Planner batch; carrier: M6's round)
- **Location**: `decorator.preview-equals.test.tsx`, `editorChars`, its `return null` for any line with a non-text child, at
  `2e36107`.
- **Class**: a criterion exclusion whose predicate drops the whole input, where its stated reason, "an element carries no
  decoration", covers only the element's character.
- **Enumeration**: the probe above. It excludes 1,107 to 1,147 inputs per surface, out of 2,378. The hidden differences are 295,
  310 or 182 per surface after stripping emoji on both sides, and the sampled 15 are the Slate layer's lift or probe artifacts. The
  population is not measured past the sample, so that is QA's.
- **Required Action**: at M6, when AC-6.5 makes the lift read the engine's parse, AC-5.8's comparison drops only the element's
  character (on the preview side, the emoji's), not the input. Every remaining difference is then either a finding or a named
  family.
  - The instrument is `m5-2e36107/crprobe.preview-equals-emoji.test.tsx.txt`.
  - Falsity signature: the comparison counts at least 2,200 inputs per surface, and a lifted shortcode inside inline code, as in
    `corpus:224`, is either drawn as the preview draws it or named.
- **Risks row**: the falsifier of AC-5.8's "for every input".

CR-19 LOW Round 5 (M5, capped: a stated limit for the Planner batch)
- **Location**: `src/utils/markdown/index.tsx`, the `interactive` object's `parseContent`, `parseEmbedTitle` and `parseEmbedField`,
  and `interactiveWithoutLinks`, at `2e36107`.
- **Class**: production members whose last production reader this change removed, kept alive by a test.
- **Enumeration**: `git grep -n "interactive\.parse<Name>" 2e36107 -- src` for each name:
  - `parseContent`: 1 hit;
  - `parseEmbedTitle`: 1 hit;
  - `parseEmbedField`: 0 hits.

  Both hits are `rules.multi-line-code-block.test.ts`, and the call sites read them at `b04c09f`. `parseEmoji` is excluded: it is
  live, serving the lift. The predicate does not see a reader through a computed member name.
- **Required Action**: delete the three parsers and `interactiveWithoutLinks`, with the cases of `rules.multi-line-code-block`
  that drive them. Do that at M6, when the lift leaves `interactiveParser`, or with the next change to `index.tsx`. There are no
  production callers, so no caller changes. If they are kept, the test exercises code nothing ships.

### Verdict, Round 5

**APPROVED_WITH_COMMENTS** for M5 at `2e36107`.
- CR-3 is RESOLVED.
- CR-17, CR-18 and CR-19 are LOW stated limits under the cap, for the Planner batch. CR-18's carrier is M6's round.
- M5 goes to QA Phase 2.

### Round 5 sub-entry: QA's QAF-39 at `cf126ea`

The trigger is implementer-019's message for M5 Fix Round 1 (the M5 document's "Fix Round 1", record `2c45c566`,
`Handoff-At: cf126ea`). It answers QAF-39 MEDIUM, a severity floor (`qa/019-slate-formatting-discord-engine-m5-qa.md`, record
`263aa3c6`).

My miss, stated first. Round 5 accepted the implementer's "equivalent so far" for survivor m5-d2, on seven extra inputs that each
open a delimiter on a plain line and close it on a `> ` line. QA separated it with a different member of the class: a `>>> ` line
followed by `> ` lines, where Discord reads the later `> ` as text inside the block. My probe's input class did not reach that
form. The Round 5 survivor paragraph is superseded by this sub-entry.

Scope: `cf126ea` alone, which changes four test paths:
- `discordNativeBox.json` and `discordTypedCases.json`: members x8 `>>> a⏎> _⏎> _b_` and x9 `>>> *a⏎> b*`;
- the two counts, 85 to 87, in `discordBoxes.oracle-controls` and `discordInputs.lifted-data`.

This is a scoped check, test-only: no round opens.

**Record correction.** The implementer's message says "the M5 source is unchanged since `2e36107`". At `cf126ea` that does not
hold. M6's commits `8cb4d83`, `c3af0ac` and `f58a816` come before `cf126ea` on the branch, and they change M5 paths:
- `decorator.tsx` (+2 −23: `unitAround` moves to a new `runUnit.ts`);
- `unitStyles.ts` (+6 −11);
- `SlateEditor/index.tsx` (+3 −5);
- `Desktop.tsx` and `Mobile.tsx` (−1 each).

(`overlay-manifest.txt`.) The fix commit itself changes no source. The decorator its green runs ran against is M6's form, which
M6's round reviews. So I checked the fix on M5's own decorator:

Checks (captures in `verification/019/code-review/qaf39-cf126ea/`):
- **On M5's source.** An export of `2e36107` with `cf126ea`'s four test paths laid over it (blob ids in the manifest), in
  `unshare -rn`. `decorator.native-box-classes` and `discordInputs.lifted-data` pass 8 of 8 (`overlay-green.txt`).
- **m5-d2 on the same tree** (the quote-prefix line removed from `unitAround`): **KILLED** on x8, by `AssertionError: expected [
  '>>> a\n> _\n> _b_' ] to deeply equal []` (`overlay-m5-d2.txt`). The decorator was restored and compared byte for byte with
  `2e36107`.
- **Expected values are independent.** In an export of `cf126ea`, the live `discordBoxes.oracle-controls` exits 0 with 10 of 10
  passed (`live-boxes-cf126ea.txt`). That includes the case "are re-derived live on the pinned wasm, naming both values where one
  departs", which compares every `NATIVE_BOX_FROZEN` entry, x8 and x9 among them, with the box's live output. The two values are
  the box's, not the decorator's.

QAF-39 is closed for review:
- The class has a member in the frozen set that fails when the prefix is lost.
- Captured check: `decorator.native-box-classes` on x8.
- The closure itself is QA's.

Verdict, Round 5 sub-entry at `cf126ea`: **APPROVED_WITH_COMMENTS**, for the fix's four test paths. It is checked on M5's source
as at `2e36107`, and at `cf126ea` for the live box. It does not cover the M6 content of the M5 paths at `cf126ea`: that is M6's
round. CR-17, CR-18 and CR-19 stand as before.

## Round 6 at `119471f` (M6)

The trigger is implementer-019's M6 hand-off (`implementation/019-slate-formatting-discord-engine-m6-implementation.md`, record
`128c224d`, `Handoff-At: 119471f`). Steering's M6 brief had not arrived by round open, so I read the plan's M6 section, its
Decisions Register rows D-21 and D-22, and R-74 myself.

Scope: the M6 commits in `cf126ea^..119471f` plus `8cb4d83`, `c3af0ac` and `f58a816`, which sat in the tree at M5's Fix Round 1.
- This is the first review of all of them, read through `git show 119471f:<path>`.
- 29 product paths (+459 −1,092) and their tests. `cf126ea` itself was reviewed in Round 5's sub-entry.

Criteria, as the plan states them at round open (Revision 15, plan record `9fc7d011`): AC-6.1, AC-6.1b (the read the plan gives
code review), AC-6.2, AC-6.5, AC-6.6 and AC-6.7. AC-6.3 is UAT's walk (B-4), and AC-6.4 is an optional owner observation (M6 makes
no `setOnInsert` edit). Carried: CR-18 and CR-19.

Rulings that bound this round:
- the cap (block 00:49Z);
- D-20, the 8 eslint FAILs in `SlateEditor/index.tsx`, listed and not a finding;
- steering's block 04:51Z on AC-6.5's 22 hand-control members;
- R-74: the lift parses elements as their source text, the decorator as `?`. This is a stated limit, so the plan sentence "with
  existing emoji elements as one `?` each" is read through that ruling.

Process whose output is the evidence:
- the suite's own cases;
- three probes of mine, each with a control: a both-trees differential, two timing probes, and a re-read of the save callers.

### Reading, file by file

- **`runUnit.ts` and `unitParse.ts` (`8cb4d83` onward).** M5's `unitAround` and `styleUnit`'s fence framing move out verbatim.
  - `unitAround` gains `emojiAs`, which defaults to `'placeholder'` and gives `?` for any inline element, as M5 did. The decorator
    calls the default.
  - A decision-neutrality claim, so it is settled by execution (below).
- **`withNormalizeNode.ts`.**
  - **S-29**: `handleEditor` inserts a blockQuote's `quotePrefix` as text when the line becomes code.
  - **The lift and the re-decide**: `resolveEmoji` reverts first, then lifts. It makes one change per call, so Slate re-runs the
    normaliser to the fixed point. It reads the unit in source space (`sourceWidthOf`), and inserts at an offset that is the same in
    both spaces because it lies within one text child.
  - **`revertToText`'s caret mapping** after `d652d12`:
    - a caret on the reverting element maps past its source;
    - one at its start stays;
    - one on a later element lands at the start of the text after that element.
    Traced by hand on each case.
  - **The carry (AC-6.7)**: `carriesMarker` follows the table. It requires a line starting with `> `, not inside a `>>>` block, and
    not inside a fence unless the fence was opened on a `> ` line. Partial mode never carries. The `apply` override strips
    `quotePrefix` from every `split_node`, so a paste carries nothing (CF-22). `resolveCarried` takes in one typed `> ` and clears
    the flag otherwise.
- **`emojiLift.ts`.**
  - `emojiLayout` collects the engine's `emoji` nodes of a fence-framed unit parse, cached by surface, fence context and text, FIFO
    256.
  - `liftLoaded` visits each unit once (`done`). A code line's unit is the line itself, because its neighbours are `codeBlock`
    fence lines, so it parses inside the fence framing and lifts nothing.
  - `spanOf` takes `src` from M4's `emojiSrc`.
- **The readers.**
  - `common.ts`: `isEmojiElement` is `type === 'emoji'`.
  - `flattenNodeText.ts` saves `source`.
  - `renderElementFactory.tsx` draws one `<Image>` from `src`, `alt` and `title`, at 18 px for a custom emoji or in an embed,
    otherwise 22.
  - `slate.d.ts` holds the new shape.
- **`jumboable`.** The plan's reader list says `emojiToImage` reads "`src` and `jumboable`", and the tip has no `jumboable`. At
  `2e36107`, `jumboify` (`emoji.tsx`) has no caller (`git grep -n jumboify 2e36107 -- src`: the definition only), so no editor
  element was ever jumboable. The tip's sizes equal the base's for every element type. So this is behaviour-preserving, and the
  plan names a reader that never fired. No finding.
- **The `simple-markdown` removal (AC-6.6).**
  - `git grep -n -i simple-markdown 119471f -- . ':!pnpm-lock.yaml'`: only the absence test.
  - `pnpm-lock.yaml`: 0 hits.
  - `patches/` is empty, and `src/@types/simple-markdown.d.ts` is deleted.
  - `pnpm-workspace.yaml` is deleted. At `2e36107` it held only that `patchedDependencies` entry.
  - The implementer's frozen install exits 0 (`m6-frozen-install.txt`).
- **Tests.** The 12 new test files meet the positive form with 0 ID tokens (`m6-new-tests.txt`), and none is bug-form. The frozen
  `emojiSpans.json` is the oracle helper's output, as D-21 prescribes, re-derived by `discordEmojiSpans.frozen-literals`.
- **Conventions.** `convention-check.js --since=2e36107` gives 8 FAIL, all D-20's eslint lines; 0 CANDIDATE; 37 SKIP, the ID-token
  check among them, done by hand above (`convention-check-since-2e36107.txt`).
- **TDD Compliance.** The table has a row for every function. Its "No" rows are closed by named mutants and by the stub-tree reds
  at `1aaa960`: `resolveEmoji` stubbed fails 17 of 21, and `revertToText` stubbed fails 7 of 21. The sweep's 24 survivors are each
  dispositioned. Two are guards kept as unreachable (`withNormalizeNode.ts:152` and `:161`, named by line at `119471f`), which I
  accept as type fallbacks.

### Checks run this round

All captures are in `verification/019/code-review/m6-119471f/`.
- **AC-6.1b, the read the plan gives code review.** `git grep -n "saveMessage(" <ref> -- src ':!**/__tests__/**'` at the chain base
  `5ec0621` and at `119471f`: the same four sites, `Navigation.tsx:143` and `:294` and `edit/page.tsx:65` and `:221`, all user
  acts.
  - The five `message.upsert` writers are the same at both refs: `NewMessageModal.tsx`, `message/f/[id]/page.tsx`,
    `SaveAsMenu.tsx`, `message/m/new/page.tsx` and `MessageProvider/index.tsx`.
  - So opening a box still writes nothing to the server. **AC-6.1b holds.**
- **The run-unit move is decision-neutral, measured.**
  - Method: M5's `decorator.tsx` and `unitStyles.ts` from `2e36107`, placed beside the tip's in an export of `119471f`. Both
    decorate every text node of `getInitialValue`'s value, over 2,659 inputs (corpus, link inputs, the 87 frozen box cases, 2,000
    generator inputs) on all six surfaces.
  - Result: **0 of 36,690 nodes differ** (`both-trees-head.out.txt`).
  - Positive control: with m5-d2 planted in the M5 copy, 24 nodes differ, x8 among them (`both-trees-control-m5-d2.out.txt`). The
    differential can fire.
- **The normaliser's cost per keystroke.** Probe `crprobe.normalize-cost`: one `insertText` mid-unit, on an editor wrapped in
  `withNormalizeNode`, median of 20 after 2 warm-ups. Node, vitest `--project node`, this box, `unshare -rn`. Base (`2e36107`) and
  tip, same text:

  | Lines in one run unit | Characters | Base median | Tip median |
  |---|---|---|---|
  | 35 | 4,129 | 0.36 ms | 2.0 ms |
  | 400 | 4,399 | 1.1 ms | 71 ms |
  | 1,000 | 4,999 | 2.1 ms | 413 ms |

  At the tip, on `content` and `embedDescription`, the medians are 2.6 and 2.3 ms at 50 lines, 6.3 and 6.1 ms at 100, 20.6 and
  19.6 ms at 200 (2,199 characters), and 75 and 70 ms at 400. CR-20 below.
- **CR-18 and CR-19, re-run.**
  - CR-18: `decorator.preview-equals` now asserts `compared > 2200` per surface, that the six named inputs still differ, and that
    nothing else differs. The implementer reports 2,239 of 2,245 compared, and the suite run is QA's.
    `decorator.native-box-classes` compares its 12 element-holding inputs (floor 10). `git grep -c "holdsElement" 119471f -- src`
    prints nothing. **RESOLVED.**
  - CR-19: `git grep -c -i "interactiveParser\|interactiveBase\|interactiveWithoutLinks\|markdown\.interactive\|\.interactive\."
    119471f -- src` prints nothing. **RESOLVED.**

### Findings (Round 6)

CR-20 MEDIUM Round 6 (M6, capped: a stated limit for the Planner batch; sent to steering as an owner question, below)
- **Location**: `src/components/SlateEditor/utils/withNormalizeNode.ts`, `handleEditor`'s loop
  `for (let i …) if (resolveEmoji(editor, surface, i))`, and `resolveEmoji`'s `unitAround(editor.children, lineIndex, 'source')`,
  at `119471f`.
- **Class**: per-line work that rebuilds the whole run unit on every editor normalisation. On a unit of N lines, each operation
  costs O(N × unit length) in string building and cache-key hashing.
- **Magnitude**: measured, in the table above: 64 times the base at 400 lines and 190 times at 1,000. The cost passes one 16 ms
  frame at about 200 lines (2,200 characters, within content's 2,000/4,000 limit), before slate-react's render is added.
  - Node, vitest, this box. The browser cost is not measured, so that part is a hypothesis for UAT's walk.
  - The parse itself is cached (`emojiLayout`). The cost is the per-line `unitAround` and its 4 KB cache key.
- **Enumeration**: `git grep -n "unitAround(" 119471f -- src` gives 4 hits:
  - `decorator.tsx`: one unit per pass (`pass.units`), so not the class;
  - `emojiLift.ts` `liftLoaded`: once per unit (`done`), not the class;
  - `withNormalizeNode.ts` `resolveEmoji`, called from `handleEditor`'s loop over every line: **the member**;
  - the same call reached from `handleElement`, once per dirty element: not the class.

  The predicate does not see a per-line rebuild of another whole-document structure, for example `carriesMarker`'s walk from line
  0, which runs once per Enter and so is not per operation.
- **Required Action**:
  - **Preferred (structural)**: `handleEditor` resolves per unit, not per line. It walks the lines once, builds each unit once (as
    the decorator's `pass` does), and calls a unit-level resolve that returns at its first change.
  - **Minimum**: memoise `unitAround` per `editor.children` identity inside the normaliser.
  - Callers: `resolveEmoji` has two. `handleEditor` changes under both forms. `handleElement`'s single-line call keeps its
    behaviour under either.
  - **Falsity signature**: a counting case through a pass-through mock of `unitAround`, as AC-5.7 counts the engine. One
    `insertText` on a 200-line single-unit value builds the unit at most a small constant number of times per normalisation pass
    (at most 2). At the tip it builds it once per line, about 200, and the assertion fails on that count, not by a timeout.
- **Not a severity floor**: no criterion states the normaliser's cost.

CR-21 LOW Round 6 (M6, capped: a stated limit for the Planner batch)
- **Location**: `package.json` `dependencies` `"emoji-regex": "^10.2.1"`, at `119471f`.
- **Class**: a dependency with no importer, left by the change that removed its last reader. This is the implementer's own
  Outstanding 5.
- **Enumeration**: `git grep -n "emoji-regex" 119471f -- src package.json` gives `package.json` only. The predicate does not see a
  dynamic `require` by computed name.
- **Required Action**: remove it with its lockfile entries in a change that owns a lockfile move, AC-2.2's form, and disposition
  any pin it moves.

To the architect, not a finding against M6: `architecture/system-architecture.md`'s Packaging line reads "pnpm with a patched
dependency (`simple-markdown` via `patches/`)", which is stale from M6. Sent to `architect-019`.

Reconcile note, 2026-11-24T07:07Z:
- My CR-20 message to steering said "short messages are unaffected: 2 ms at 35 lines". That was wrong. This round's own table gives
  0.36 ms at the base against 2.0 ms at the tip at 35 lines, about 5.6 times, a small absolute cost but not "unaffected".
- The refutation helper's re-timing (rulings block 07:05Z, record `3ec39942`) gives 0.2 to 0.4 ms at the base and 0.9 to 1.8 ms at
  the tip.
- The owner's answer, "fix it before release", lifts the cap for CR-20 only. That turns CR-20 from a stated limit into a fix round,
  so this verdict does not move.

### Verdict, Round 6

**APPROVED_WITH_COMMENTS** for M6 at `119471f`.
- CR-18 and CR-19 are RESOLVED.
- AC-6.1b's read holds at the chain base and at the tip.
- The run-unit move is measured decision-neutral.
- CR-20 MEDIUM and CR-21 LOW are stated limits under the cap. CR-20, a measured user-visible regression on long messages, goes to
  steering for the owner's word on whether the cap holds for it.
- M6 goes to QA Phase 2.

### Round 6 sub-entry: CR-20's fix confirmation at `42128cd`

The trigger is implementer-019's hand-off of M6 Fix Round 1 (`implementation/019-slate-formatting-discord-engine-m6-implementation.md`,
section "Fix Round 1", record `9c6bb958`, `Handoff-At: 42128cd`). The planner's dispositions of its Outstanding items reached me by
message (plan R-92, record `7100aab8`). Steering's brief for this round had not arrived, so I read AC-6.8 at Revision 20 and the
Outstanding items myself.

Scope: the fix diff `119471f..42128cd`.
- `git diff --quiet 10abfa9 42128cd` exits 0, so the tip's tree is `10abfa9`'s; `acd9df8` and its revert cancel.
- Production: `withNormalizeNode.ts` only (+18 −8). `handleEditor`'s all-lines loop is gone. `resolveEmoji` builds the edited line's
  unit once and settles every line in it, or the line alone for a code line. `resolveLine` is the old per-line body.
- Tests (8 paths): the count test and `__tests__/helpers/keystrokes.ts`, the bench, QAF-50's case, QAF-46's member and the
  generator count. They are read beside the production code. Their adequacy is QA's.
- The fix stays at CR-20's site, so this is a sub-entry, not a round. It does change behaviour in one family (below).

Criteria, at round open (Revision 20, plan record `7100aab8`): AC-6.8, both limbs, and CR-20's Required Action.

Process whose output is the evidence:
- the implementer's count test, which I ran only as a mutant target;
- five instruments of mine, captured in `verification/019/code-review/m6fix-42128cd/` (`README.txt` says how each runs).

#### Checks

- **CR-20's class, re-swept.** `git grep -n "unitAround" 42128cd -- src public ':!*__tests__*'` gives 7 hits: the definition,
  three imports and three calls (`decorator.tsx` per pass, `emojiLift.ts` `liftLoaded` per unit, `withNormalizeNode.ts`
  `resolveEmoji` once per call). That is the implementer's count.
  - Second instrument: the module's importers, `git grep -n "runUnit['\"]" 42128cd -- src public ':!*__tests__*'`. It gives the
    same three files, named imports only. No alias and no namespace import exists outside tests.
  - Both instruments miss a unit built some other way than `unitAround`, for example a hand-rolled join of the lines.
  - The per-line loop predicate gives one hit, `resolveCarried`'s flag scan, which was there at the base.
  - The class is gone.
- **The count test fails if the class returns.** `mutation-run.py` at `42128cd`, against the count test file alone, network
  isolated (`cr-mutants.json`, `mutants-out/`):
  - `cr-loop-back`: `handleEditor`'s per-line `resolveEmoji` loop restored.
  - `cr-rebuild-per-shared-line`: the unit rebuilt for each line of `sharing`, which is the class inside the new structure.
  - **2 of 2 KILLED by assertion**, control 54 of 54 (`mutants-run.log.txt`). `cr-loop-back` fails 52 of 54 in 277 s, the
    count at `119471f` (`expected 2049 to be 201`). `cr-rebuild-per-shared-line` fails 36 of 54 in 139 s (`expected 2048 to
    be 200`).
- **The cases are not vacuous.** The count test keeps a case only when the keystroke leaves the other lines alone at both sizes,
  but its floor case checks only the small size. My probe runs its own `SIZED` table at both sizes. All 60 kind, place and line
  cases are alone at both, so no `it.each` case asserts nothing (`alone-both-sizes.txt`).
- **Round 6's timing probe, re-run** (bare `createEditor`, `Transforms.insertText` at a path, median of 20, node, load about 2;
  `normalize-cost-*.json`):

  | Lines | Characters | `119471f` | `42128cd` |
  |---|---|---|---|
  | 35 | 4,129 | 2.0 ms | 1.2 ms |
  | 200 | 2,199 | 19.0 ms | 2.3 ms |
  | 400 | 4,399 | 68.8 ms | 4.6 ms |
  | 1,000 | 4,999 | 406 ms | 11.3 ms |
  | 2,048 | 4,095 | 1,644 ms | 21.3 ms |

  - The probe's bare editor is not AC-6.8's shape. With the production wrapping (`withEmojis(withHistory(withReact(…)))`), the
    same insert at `42128cd` costs 1.0, 2.7 and 5.5 ms at 200, 1,000 and 2,048 lines, with or without a selection
    (`cost-variants-42128cd.json`). That agrees with the implementer's bench (6.4 ms at 2,048). I did not find why the wrapping
    cuts the cost about four times.
  - So AC-6.8's 16 ms holds in its own shape. The cost still grows about 2.7 µs per line, because every line of the unit is
    settled. The base was not timed in the wrapped shape this round.
- **The residue (Outstanding 1).** I tested a fix that settles a unit from the edited line with an oracle shaped differently from
  the implementer's. After each key, `Editor.normalize(editor, { force: true })` must leave the document and selection
  unchanged (a fixed point), and I compared both trees (`compare.py`).
  - 20 hand fixtures aimed at a line whose emoji depends on another line's text: multi-line inline code, inline code across
    fences, quotes, spoilers. Every line, three places, 8 keys: 1,584 keystrokes. 1 differs, the implementer's repro, which is
    the positive control. The other 19 fixtures give 0 (`compare-settle.out.txt`).
  - 6 unclean-fence fixtures, the 272 corpus texts and the first 1,000 generator texts, start and end, 6 keys: 27,252
    keystrokes. **8 differ, and each is a non-fixed-point at `42128cd`. `119471f` has 0 non-fixed-points.** No keystroke
    throws (`compare-fixedpoint.out.txt`).
    - Three are the generator's `gen:151`, `gen:429` and `gen:901`, which reproduces the implementer's three.
    - Five are my unclean-fence fixtures.
    - The corpus gives 0.
  - **Correction to the family's description.** The implementer describes the family as "`\` typed at the start of the
    opening fence line". It is wider. In fixture 5 (`'q\n```ts\n``a 🙂\n```\n🙂'` in `crprobe.keystroke-fixedpoint`), a
    backtick typed at the start or end of the plain line `q` leaves line 2, a `codeBlock` line, with its 🙂 as text where
    `119471f` lifts it. A `\` typed at the start of line 1, the fence line, does the same. Every member is an input whose fence the Slate
    layer types as code and the engine reads as plain text, which is QAF-48's class. The saved text does not change.
  - I agree with the planner's disposition: residue in QAF-48's class, LOW, and the neighbour step stays reverted. Nothing here
    needs it back: no clean-fence member exists in either population, and the step's own sweep left 12 of 22 mutants alive. The
    wider description goes to the planner for R-92's row. No CR is minted, because the residue is already registered.
- **The bench's red is a hang, not an assertion** (CR-22 below). The committed bench at `119471f`, run with
  `-t "plain lines, 400"`, prints a median of 69.3 ms and then idles until `timeout` kills it: 240 s, user time 0.27 s, exit 124.
  - Control: at `42128cd`, with `FRAME_MS` planted at 0.001, the same row prints 2.2 ms and also idles to exit 124.
  - At `42128cd` with the committed bound, the row exits 0 in 2.1 s.
  - So any failed median hangs the run, whatever the tree.
- **The code-line guard's survivor.** The implementer's `code-line-shares` mutant survived. `unitAround` (`runUnit.ts`) starts a
  code line's unit at that line and extends it into the non-code runs on both sides. So the guard keeps a code-line keystroke from
  settling those runs with a layout that is not their own. I accept the survivor as equivalent on every probe the implementer
  and I ran, with the guard kept.
- **Conventions.** `convention-check.js --since=119471f` at `42128cd`: 0 FAIL, 0 CANDIDATE, 18 SKIP
  (`convention-check-since-119471f.txt`). 17 SKIPs are another session's `.playwright-mcp/*.png`. The 18th is the ID-token check,
  which I ran by hand over the changed test files.
  - It has one new hit, `2,048` in a `describe` name (`\b0NN\b` matches `048`). That is a line count with a thousands separator,
    the form the suite already carries (`6,001 characters`, `1,000 generator inputs`). It is not an ID token.
  - Added comment lines: 0.
- **Test authorship.** The new cases are spec-form, and none is bug-form. `keystrokes.ts` is under `__tests__/helpers/`. The bench
  is under `__tests__/` as SL-20 fixes. QAF-50's case and QAF-46's member state behaviour, and their reds are the implementer's
  W12 and oracle-mutant records.

#### Findings (Round 6 sub-entry)

CR-20 MEDIUM Round 6: **RESOLVED** at `42128cd`.
- The class is gone: one unit build per call, and both sweeps reconciled.
- The check that fails if it returns: `withNormalizeNode.keystroke-run-unit-builds.test.tsx`, killed by both mutants above.

CR-22 LOW Round 6 (M6 fix round; AC-6.8's timed limb; a stated limit under block 07:21Z)
- **Location**: `src/components/SlateEditor/utils/__tests__/withNormalizeNode.keystroke-time.bench.ts`. The `report` passed as
  the bench's `teardown` holds `expect(median).toBeLessThanOrEqual(FRAME_MS)`. At `42128cd`.
- **Class**: an assertion inside a `vitest bench` lifecycle hook. A failure there leaves the run idle instead of failing it, so the
  instrument's red is a runner timeout, not an assertion outcome.
- **Enumeration**: `git ls-files '*.bench.*'` at `42128cd` gives 1 file, and `git grep -n "teardown:\|setup:" 42128cd --
  '*.bench.ts'` gives its one options line. The predicate does not see an assertion in the bench body itself, whose failure mode I
  did not measure, or an `expect` in a hook of a `*.test.ts` file run under `vitest bench`.
- **Magnitude**: measured. The run idles to the timeout on a miss at both trees (240 s and 120 s caps; 7 min 32 s in the
  implementer's `m6-fix-bench-red-119471f.txt`). A green run takes 2.1 s per row.
- **Required Action**:
  - **Preferred (structural)**: the bound is asserted outside the bench lifecycle. For example, `report` records each median, and
    an `afterAll` or a following `it` asserts them, or the timed limb becomes a `*.test.ts` excluded from `pnpm test` by name.
    Either way, a miss is an AssertionError and a non-zero exit.
  - **Minimum**: QA's Phase 2 reads exit 124 from this file as the timed limb's red, and says so in its record.
  - **Falsity signature for the remedy**: with `FRAME_MS` planted at 0.001, the `-t "plain lines, 400"` run exits 1 with
    `expected 2.… to be less than or equal to 0.001`, in about its green run time, not 124.
- **Not a severity floor.** CR-20's behaviour is asserted by the count limb in `pnpm test`, which fails by assertion. The timed
  limb is a second instrument outside the suite.

CR-23 MEDIUM Round 6 (M6 fix round; reached by steering's route, below; a stated limit pending the owner's word through steering)
- **Route.** Steering-hooks-fixer's message after the hand-off (effort rulings block 09:22Z, record `ed4ab9b8`). It reported
  two helper measurements: closing a fence costs 412 ms at 2,048 lines at `42128cd` against 169 ms at `119471f`. I re-ran their
  probe myself (`crprobe.fence-toggle.test.tsx.txt`, copied verbatim, `content` surface) and did not take the number on report.
- **Location**: `withNormalizeNode.ts` `resolveEmoji`, `const sharing = line.type === 'codeBlock' ? [lineIndex] :
  [...unit.lineStarts.keys()]`, reached once per dirty element from `handleElement`, at `42128cd`.
- **Class**: whole-unit work done once per dirty line. A keystroke that dirties K lines of an N-line unit costs O(K × N)
  `resolveLine` visits per drain. CR-20 removed the unit rebuild, but kept a per-line multiplier on the settle.
- **Magnitude**: measured. Node, vitest `--project dom`, this box, `unshare -rn`, median of 10 (`fence-toggle.out.txt`):

  | Keystroke, lines | `119471f` | `42128cd` | `42128cd` with `sharing = [lineIndex]` |
  |---|---|---|---|
  | close a fence (Backspace at the end of a ```` ``` ```` line, line 2), 200 | 15.8 ms | 42.1 ms | 18.1 ms |
  | close a fence, 2,048 | 165.5 ms | 415.7 ms | 170.8 ms |
  | open a fence, 2,048 | 68.9 ms | 67.7 ms | 78.6 ms |
  | plain insert (control), 2,048 | 1,627.5 ms | 5.6 ms | 3.6 ms |

  - With the shared settle cut to the edited line, close-fence returns to `119471f`'s cost. So the shared settle is the cause.
  - At 200 lines, the fix takes this keystroke past one 16 ms frame, where `119471f` was under it.
  - The browser cost is not measured, which is a hypothesis for UAT.
- **Pre-existing, not this finding.** Every open and close in this probe throws Slate's "Could not completely normalize the editor
  after 126 iterations", at both trees and the cut variant (12 of 12 each). Steering reports the same at `af3d95a` and
  `2e36107` and has taken it to the owner (QAF-51's class). CR-23 is the cost the fix adds before that throw. A fix for the
  throw changes this keystroke's whole path, so the two are decided together.
- **Enumeration**: `git grep -n "sharing\|lineStarts.keys()" 42128cd -- src ':!*__tests__*'` gives 5 hits.
  - Two are prose in `src/app/legal/privacy/page.tsx`.
  - `decorator.tsx:82` maps one unit to its lines once per pass. It is not a member.
  - The two lines of `resolveEmoji` are the member.
  The callers of `resolveEmoji` are `handleElement` alone (`git grep -n "resolveEmoji(" 42128cd -- src`: the definition and one
  call). The predicate does not see whole-document work in `handleEditor`'s retyping walk. That walk runs once per editor-level
  normalise and was there at the base.
- **Why the suite does not see it**: AC-6.8's count limb counts unit builds, not settle visits, and it leaves fence open and close
  out as residue (SL-22). The timed limb's keystroke class leaves them out too.
- **Required Action**:
  - **Preferred (structural)**: settle a unit's other lines once per distinct unit per drain, not once per dirty line of it. For
    example, memoise the settled unit by its text and layout inside the normaliser. A dirty line still settles itself every time.
  - **Minimum**: a stated limit with the owner's word through steering, beside the iteration-cap throw.
  - Callers: `handleElement` is the only caller. Under either form, a single dirty line settles as it does now, so the
    `` `a``🙂⏎b `` cases that kill `edited-line-only` stay killed.
  - **Falsity signature**: a counting case through a pass-through `vi.mock` of `./emojiLift`'s `spansInLine`, on the fence-close
    keystroke at 200 and 2,048 lines. The window ends at the throw, which is bounded at 126 iterations at both sizes. At
    `42128cd` the count grows with the line count, and the equality assertion fails on the count, not by a timeout.
- **Not a severity floor**: no criterion states fence-toggle cost. It rests on CR-20's own fix, so whether the CR-20 cap lift
  reaches it is steering's to read and the owner's to decide.

#### Gate satisfaction disclosed in the round

- The stamp gate refused my plan row R-94 (`stamp-gate-hook`), whose stamp `09:31` I had typed ahead of the clock's `09:30`.
  `plan-row-commit.js` committed nothing. I re-stamped the row with `record-edit.js`'s `{now}`, which is the form the gate names,
  and committed it (`fe71de0e`). This changelog's own sub-entry row was typed too, at `09:29` from a `date -u` call made for it.

#### Verdict, Round 6 sub-entry

**APPROVED_WITH_COMMENTS** for M6 at `42128cd`.
- CR-20 is RESOLVED.
- AC-6.8's count limb discriminates.
- AC-6.8's timed limb holds in its own shape, and its red mode is CR-22 LOW, a stated limit.
- The residue is confirmed and its family widened, within QAF-48's class.
- Outstanding 2 and 3 are the planner's dispositions (R-92), not this review's.
- M6 goes to QA Phase 2 at `42128cd`.

## Round 7 at `85ece66` (M6 Fix Round 2, AC-6.9)

The trigger is implementer-019's hand-off of M6 Fix Round 2 (`implementation/019-slate-formatting-discord-engine-m6-implementation.md`,
section "Fix Round 2", record `0a086b41`, `Handoff-At: 85ece66`). Steering's brief for the round had not arrived, so I read AC-6.9
at Revision 22 and the implementer's Outstanding items myself. Steering's message of 14:33Z said only that the fix round would
come here.

Scope: `42128cd..85ece66`, the three commits `a90ed57`, `a1037e4` and `85ece66`.
- Production: `withNormalizeNode.ts` (+45 −12). It adds an `editor.normalize` override, `retypeLines`, `linesAgree` and
  `verifiedLines`, `settledIn` and `settledLines`, and the marker's range delete.
- Tests: seven paths (two new test files, a new helper, a new bench, the count test, `mountedEditor.tsx`).
- The fix reaches past CR-23's site (the throw, the caret, a new override), so this is a new round. The whole delta is reviewed as
  a first review.

Criteria, at round open (Revision 22, plan record `960052d1`; the plan's head is `81523bd6` and later, with no AC-6.9 delta read):
AC-6.9's limbs (no throw, the write, a fresh load, the caret, cost, red mode), CF-30's admitted forms, CF-31, F-56, and CR-23's
class.

Process whose output is the evidence:
- my instruments (`verification/019/code-review/m6fix2-85ece66/`, `README.txt`);
- the committed bench and a planted control of it;
- Slate's own source at the pinned version.

### Reading, file by file

- **`editor.normalize` and `linesAgree` (CF-30).** Read against `slate@0.123.0` (`node_modules/.pnpm/slate@0.123.0/…/dist/index.js`).
  - `shouldNormalize` throws once `iteration > initialDirtyPathsLength * 42`.
  - `apply` calls `Editor.normalize(editor, { operation })` after every operation.
  - `withoutNormalizing` restores the flag and then calls `Editor.normalize`.
  - So the override runs `linesAgree` before each drain while normalizing is on. Its retype runs inside `withoutNormalizing`, so
    the retype's `set_node` paths are in the dirty set when the drain sizes its budget. The architect's mechanism holds in the code.
  - No `catch` and no `shouldNormalize` is added: `git grep -n "shouldNormalize\|catch" 85ece66 -- src/components/SlateEditor
    ':!*__tests__*'` gives only `index.tsx:81`, the focus handler. Added lines matching `catch|shouldNormalize|setNormalizing`: 0.
  - **CF-30's form holds.** One property changed: a retype that never converged used to end in Slate's bounded iteration error.
    Now it would recurse through the override until the stack overflows. That is still an error that reaches the caller, so it
    hides nothing. No probe of mine converged slowly (0 errors in 39,320 keystrokes, below).
- **The marker (CF-31, F-56).** One `isBlockQuote` arm serves `> ` and `>>> `, and it deletes the marker's range instead of
  replacing the node's text. `git grep -n "insertText(.*at: \["`: 1 hit at `42128cd`, 0 at `85ece66`. That predicate misses a
  whole-node replacement written with a `Path` variable, so I read all four `Transforms.insertText` sites at `85ece66`. Each one
  inserts at a point or a range. **The class is gone.**
- **`verifiedLines` and `settledIn` (CR-23).** Both memories are keyed on the identity of `editor.children`, which every operation
  replaces. A drain with no change settles each run once. Any change, such as an emoji lift or a split, starts both memories
  again. That is CR-25 below.
- **Tests.**
  - The settle test's expected texts are hand-written literals (`fenceAndQuoteKeystrokes.ts`).
  - The fresh-load limb compares with `getInitialValue` of the expected text, which is the limb's own oracle as AC-6.9 states it.
  - The mounted test swallows any error (`await settle().catch(() => undefined)`); that is CR-24.
  - The count test adds "builds as many run units" for the keystrokes that make no code lines, and an `afterLine` count of 200 for
    a keystroke that changes no line type. Both are literals or cross-size equalities.
  - The new bench asserts inside the bench function on its last iteration, not in a lifecycle hook.
  - Every fill in AC-6.9's text class is `a`. No case holds an emoji-bearing line.
- **Conventions.** `convention-check.js --since=42128cd` at `85ece66`: 0 FAIL, 0 CANDIDATE, 18 SKIP, the same 18 as before
  (`convention-check-since-42128cd.txt`). By hand: 0 ID tokens in the added test lines, and 0 comment lines added. Basenames are
  in the positive form, and the helper is under `__tests__/helpers/`.
- **TDD Compliance.** The table is present and has a row per function. The growth limb was never red on a tree before the fix
  (SL-28, disclosed), only against NM-76. NM-73 and NM-80 survive as forbidden forms absent from the diff, which I confirmed by
  the grep above.
- **The implementer's disclosures.**
  - The foreign SIGTERM is steering's (rulings block 18:36Z).
  - Shell heredoc writes to the record document passed `record-write-gate-hook` unrefused. That is the class already in
    `~/.claude/agents/INBOX.md` ("Record-write gate … one more pass by a shell write"). I note this sighting for steering, not as a
    finding against the code.

### Checks run this round

- **Differential against `42128cd`, with a fixed-point oracle.**
  - 1,285 inputs: quote fixtures, unclean-fence fixtures, 272 corpus and 1,000 generator texts. Start and end, 8 keys: 36,560
    keystrokes. **306 differ, every one in the selection only**: the text, line types and emoji elements are identical
    (`classify-fixedpoint.out.txt`).
    - In all 306 the fix's caret is on the line just edited (the new line for Enter); in 4 the old caret was elsewhere
      (`caret-line-check-fixedpoint.out.txt`).
    - For `>` typed at a line's start, the fix's caret is at offset 0, the start of the text, which is D-25's.
    - 143 are Enter on a quote line, where the caret now sits at the new line's start.
  - The 8 non-fixed-point residue keystrokes are the same 8 at both trees, so Outstanding 1's family is unchanged. 0 throws.
  - 28 hand fixtures, 8 of them quote lines holding fences, 10 keys, three places: 2,760 keystrokes. 87 differ, all in the
    selection. In 57 the old caret had jumped to another line, and in all 87 the fix's caret is on the edited line
    (`classify-settle.out.txt`, `caret-line-check-settle.out.txt`). 0 throws.
  - **The caret fix reaches further than its members**, to typing inside a quote line beside a fence and to Enter on quote lines.
    No regression was found.
- **Mounted, with nothing swallowed.** I removed the committed mounted test's `.catch` and asserted no window error event: 42 of 42
  at `85ece66`. Positive control at `42128cd`: 5 of 7 fail at 200 lines on content, on Slate's iteration error.
- **The bench's red mode (CR-22's class).**
  - Ceilings planted at 0.001 ms: exit 1 with `AssertionError: expected 10.03… to be less than or equal to 0.001` in 4.7 s.
  - The committed bench exits 0 in 20.5 s.
  - Line-2 fence keystrokes: 9.9 and 6.9 ms at 200 lines, and 83.8 and 75.8 ms at 2,048, against 27 and 104 (box load 0.9 to 2).
  - **CR-22's class does not recur here.** CR-22 itself, in AC-6.8's bench, is unchanged and stays a stated limit.
- **Emoji-bearing lines, outside the text class** (`fence-emoji-*.jsonl`, median of 5, `embedDescription`):

  | Keystroke, fill, lines | `af3d95a` (base) | `42128cd` | `85ece66` |
  |---|---|---|---|
  | close the fence on line 2, `a🙂`, 200 | 16.2 ms, throws | 17.0 ms, throws, 197 lines wrong | 237.6 ms, settles, 0 wrong |
  | close, `a🙂`, 1,000 (3,999 characters) | 48.1 ms, throws | 64.0 ms, throws, 997 wrong | **7,599 ms**, settles, 0 wrong |
  | open the fence on line 2, `a🙂`, 1,000 | 43.5 ms, throws | 77.8 ms, throws, 997 wrong | 404.7 ms, settles, 0 wrong |
  | close, plain `a`, 1,000 | 43.9 ms, throws | 205.3 ms, throws | 37.0 ms, settles |

  - Correctness at `85ece66` holds on every emoji row: no throw, 0 lines differ from a fresh load, and the selection is collapsed.
  - The cost does not hold. The `:smile: b` fill gives the same figures as `a🙂` (7,541 ms at 1,000).
  - Counted (`fence-emoji-count-85ece66.jsonl`): on close over `a🙂`, line settles are 2,469, 9,944, 39,894 and 159,794 at 50,
    100, 200 and 400 lines, about n². Over plain `a` they are 50, 100, 200 and 400.
- **Paste**, through slate-react's `insertData`, which the production `onPaste` lets through (`index.tsx`). Unmounted, because
  `mountEditor`'s fake timers freeze `performance.now` and `process.hrtime`. My mounted timer read 10 ms for every size, and I
  withdrew it (`paste-insertData-*.jsonl`):

  | Paste, lines | `af3d95a` | `42128cd` | `85ece66` |
  |---|---|---|---|
  | `a`, 200 | 182 ms | 491 ms | 463 ms |
  | `a`, 1,000 | 1,711 ms | 10,349 ms | 9,556 ms |
  | `a🙂`, 200 | 241 ms | 963 ms | 940 ms |
  | `a🙂`, 1,000 | 2,879 ms | 27,181 ms | 25,345 ms |

  - Counted at `85ece66` (`paste-count-85ece66.jsonl`): `afterLine` reads are 10,099, 40,199 and 160,399 at 100, 200 and 400
    lines, about n². The line scan runs once per operation (3 per pasted line).
  - So the paste is quadratic at the base too. The chain multiplies it 2.5 to 9 times, and that was already so at `42128cd`.

### Findings (Round 7)

CR-23 MEDIUM Round 6: **its named member is RESOLVED; its class is not**.
- Closing a fence over plain lines settles the run once: 37 ms at 1,000 lines, with line settles equal to the line count.
- CR-23's Required Action asked for one settle per distinct unit per drain. The fix reaches that only for drains in which no
  operation lands, and the remainder of the class is CR-25.

CR-25 HIGH Round 7 (M6; outside the AC-6.9 cap, which covers findings below HIGH)
- **Location**: `withNormalizeNode.ts` `settledIn` (`known?.children === editor.children`) and `linesAgree`
  (`verifiedLines.get(editor) === editor.children`), at `85ece66`.
- **Class**: whole-run or whole-document work repeated for every operation of a multi-operation edit. The work is remembered under
  the identity of `editor.children`, which each operation replaces, so an edit of E operations over N lines costs O(E × N). This is
  CR-20's and CR-23's property, met here only for drains in which no operation lands.
- **Magnitude**: measured in node, `embedDescription`, this box, at load 1 to 4.6.
  - Closing a code fence above lines that each hold an emoji: 238 ms at 200 lines, and **7.6 s at 1,000 lines (3,999 characters,
    inside the field's 4,096)**. The chain base throws on the same keystroke in 16 to 48 ms.
  - Pasting 200 lines: 463 ms plain and 940 ms with an emoji per line, against 182 and 241 ms at the base. At 1,000 lines: 9.6 s
    and 25 s, against 1.7 and 2.9 s.
  - The browser cost is not measured, which is a hypothesis for UAT. The owner judged CR-23's 416 ms on the same keystroke fit to
    fix before release (D-24). This member is that keystroke at 18 times that cost, inside the field limit.
- **Enumeration**: `git grep -n "=== editor.children\|editor.children ===" 85ece66 -- src ':!*__tests__*'` gives 2 hits, the two
  memories. Members by edit, measured:
  - removing a fence above emoji lines (each lift resets `settledIn`, n² settles);
  - opening one (404.7 ms at 1,000 `a🙂` lines, super-linear);
  - a paste (each split resets `verifiedLines`, n² line reads; already so at `42128cd`, so not introduced by this round).
  - The predicate does not see repeated whole-document work that is not memoised at all, such as per-operation unit builds over a
    growing run (2n builds in a paste, each over the run so far). Undo of a paste is not measured.
- **Why the suite does not see it**: AC-6.9's text class fills every line with `a`, and its residue says inputs outside the class
  carry no bound. AC-6.8's count limb has an `a🙂` text but no fence or paste keystroke over it. No limb counts work per operation.
- **Required Action**:
  - **Preferred (structural)**: the work an edit does is proportional to what it changed. Remember a line's verdict under
    something an unrelated operation does not replace. For example, key the settled state on the unit's source text, which a lift
    leaves unchanged, or on the line's own node, whose identity Slate keeps for untouched nodes. Alternatively, settle a run's
    lifts in one pass inside `Editor.withoutNormalizing`, so a run of E lifts builds and walks the run once.
  - **Minimum**: none that holds the class. A stated limit would need the owner's word, through steering, beside the D-24 ruling.
  - Callers: `settledIn` has one caller (`resolveEmoji`, called from `handleElement`). `linesAgree` has two (`handleEditor` and
    the `normalize` override). Under either form, a no-change drain behaves as now, so AC-6.8's count cases and NM-76's kill stand.
  - **Falsity signature**: counting cases through pass-through `vi.mock`s, as the count test does, of `spansInLine` (line
    settles) and `afterLine` (fence reads).
    - Case 1: Backspace on line 2's ```` ``` ```` over `a🙂` lines, at 200 and 1,000 lines.
    - Case 2: a paste of `a🙂` lines through `insertData`, at 200 and 1,000 lines.
    - Each case asserts that the count at 1,000 is at most 10 times the count at 200, where linear work gives 5.
    - At `85ece66` the ratio is about 25, so the assertion fails on the count, not by a timeout.
    - Fixture property: every line carries an emoji, and both sizes are inside the field's limit.
- **Plan gap**, for the planner: AC-6.9's text class (and AC-6.8's keystroke class) has no emoji-bearing fill for a keystroke
  that retypes lines, and no paste. The residue sentence "Inputs outside the text class carry no bound" is what let this member
  through.

CR-24 LOW Round 7 (AC-6.9; a stated limit under the cap)
- **Location**: `SlateEditor.fence-and-quote-keystrokes-reach-the-message.test.tsx`, `await settle().catch(() => undefined)`, at
  `85ece66`.
- **Class**: a test that swallows the act's exception, so a mounted-only throw (`42128cd`'s DOM-point error after the iteration
  error, which the implementer recorded) passes whenever the last write happens to be right.
- **Enumeration**: `git grep -n "\.catch(() => undefined)\|catch {}\|catch (_" 85ece66 -- 'src/**/__tests__/**'` gives 2 hits.
  - This site is the member.
  - `message.personal-ownership.test.ts`'s "takes the largest number … to the database" is not a member: its case asserts only
    that a query reached the database, so the call's own outcome is not what it tests.
  - The predicate misses a `try` whose `catch` records and ignores. The settle test's `try` records the message and asserts it.
- **Required Action**: the mounted case asserts no error, as `crprobe.mounted-no-catch.test.tsx.txt` does (42 of 42 at
  `85ece66`, 5 of 7 red at `42128cd`). Falsity signature: at `42128cd`, the case fails on the thrown error's message, not on a
  write mismatch.

### Verdict, Round 7

**REJECTED** for M6 at `85ece66`, on CR-25 HIGH.
- Everything else holds:
  - the throw's fix takes the admitted form (CF-30);
  - the caret fix covers its class (CF-31, F-56) and more, with no regression in 39,320 keystrokes;
  - no keystroke of mine throws, mounted or not;
  - AC-6.9's limbs pass on its text class, and its bench fails by assertion.
- CR-24 LOW is a stated limit.
- **A production defect's fix is held, and an existing ruling answers it.** D-24 reads: "Both code-block problems are fixed inside
  019 before its one release: … and CR-23's fence-close cost". The option he chose was set against "Bring code-block closing back
  to roughly today's speed" (effort rulings block 14:33Z, record `d7eb0a40`).
  - Closing a fence above emoji lines at 7.6 s is CR-23's fence-close cost, so D-24 already decides it is fixed before release,
    and I do not re-ask.
  - The paste member is outside D-24's words but in the same class. A HIGH is outside the cap and off the rounds-stop ladder.
  - Steering is told, so it can read the cap for paste if it reads it otherwise.

## Round 8 at `2b82972` (M6 Fix Round 3: CR-25, D-26, CR-24)

**Why a round, not a sub-entry.** `2b82972` changes `retypeLines` (`holdsMarkerInText`), which no finding named. The whole delta
`85ece66..2b82972` is therefore reviewed as a first review of that tree. The delta is 7 commits and 8 files, one of them production
(`withNormalizeNode.ts`, +36 −9).

**Identity, and the record read.**
- Website HEAD was `2b82972` at the start and at the end. Files were read through `git show`, and the probes ran in exports.
- Stage start is the hand-off: implementer-019's message and the implementation document's "Fix Round 3" at `Handoff-At: 2b82972`
  (record `731ff3a1`).
- The plan read is Revision 23, with the Decisions Register through D-27 and R-111.
- Steering's rulings read: block 20:58Z (SL-29's comparator, record `493aa6cc`) and block 22:41Z (record `40823e74`). Under 22:41Z,
  SL-29's `a🙂` fence members are already ruled over the line and go back under D-24, and this review runs without a hold.
- The planner's R-111 (record `b1f0f60c`, CF-33's form under AC-6.9's no-throw limb) is for Fix Round 4. It is not read against this
  tree.

**Criteria assessed** (as they stood at round open):
- CR-25's falsity signature: the two count cases, at most 10 times the count at 1,000 lines as at 200.
- D-26's paste members.
- CR-24's Required Action.
- SL-29: tip beside `af3d95a`, with the load, judged against block 20:58Z's line.
- AC-6.9's four limbs, on the delta's own `a🙂` and paste cases.

**Reading, file by file.**
- `withNormalizeNode.ts`:
  - `resolveEmoji` now settles every line of the run through `settleLine`, which loops until `resolveLine` reports nothing, and
    then takes the settled set for the current children.
  - `editor.apply` carries the settled memo across `insert_node` of an empty text (`keepsSourceText`).
  - `insertTextData` is wrapped in `Editor.withoutNormalizing`.
  - `retypeLines` treats a `blockQuote` with stored prefix `''` outside a multi-line quote as holding its marker in its text.
  - CF-32's form (key on line objects) is not taken. The implementer's reason holds: a lift replaces the line's object, and the
    padding replaces it again. The count limb is what decides, and it passes. The departure is disclosed in Fix Round 3.
- Tests:
  - The count limb uses pass-through `vi.mock`s of `spansInLine` and `afterLine`, with a hand literal of 10 and a positive control.
  - The settle limbs now take `a🙂` and paste cases, through `limbs()`.
  - The mounted test no longer has its `.catch`.
  - There is one `emoji-keeps-line-text` case and three paste-into-quote cases.
  - Every test is spec-form and placed beside the code it covers. No test is bug-form, and none was owed: every defect here is
    intra-chain.
  - Helpers: `pasteAtSelection`, `pasteLines` and `linesOf` are each used by two files, so the third-duplicate lift rule is not
    reached. `FENCE_KEYSTROKES` and `EMOJI_*` extend the found helper.
- No source comment is added.

### Checks run this round

All are under `verification/019/code-review/m6fix3-2b82972/` (README there). The box load was 1.4 to 3.7.

| Check | Result |
|---|---|
| SL-29, two interleaved rounds over `af3d95a`, `2b82972` and `85ece66` (`sl29-table.txt`) | **Paste, within the line at both sizes and fills.** `a`: 50.7/50.4 ms at 200 lines (line 168.0) and 718.4/934.3 ms at 1,000 (line 2,236.6). `a🙂`: 151.4/162.4 at 200 (line 321.4) and 2,316.9/2,397.0 at 1,000 (line 4,047.2). No throws, 0 mismatches. **The `a🙂` fence members: 7 of 8 are over the line** (lines 36.1 ms at 200 and 65.2 at 1,000). The line-2 close takes 96.9/99.6 ms at 200 and **1,230.7/1,301.4 ms at 1,000**. The middle close is within the line at 200 (22.3/22.7). The base throws on 7 of the 8. The tip throws on none and has 0 mismatches. This reproduces the implementer's figures (at `3d988f7`) at the tip, and steering's 22:41Z ruling already disposes of it. |
| Per-operation cost of the line-2 close over `a🙂` (the same rows) | 790 operations in 96.9 ms at 200 lines (123 µs each), and 3,990 operations in 1,230.7 ms at 1,000 (308 µs each). The growth is in the cost of each operation, not only in their number. That is an input to architect-019's lift design read. |
| Counts (`fence-emoji-count-*.jsonl`, `paste-count-*.jsonl`, Round 7's probes) | **Linear at the tip.** Close over `a🙂`: 1 build and 97/197/397/797 line settles at 50/100/200/400 lines. At `85ece66` the same keystroke made 71 to 596 builds and 2,469 to 159,794 settles. Paste of `a🙂`: 1 build and 200/400/800 fence reads at 100/200/400 lines, against 15,149 to 240,599 at `85ece66`. |
| The committed count limb, run at `85ece66` with its helpers (`red-count-limb-85ece66.log.txt`) | Exit 1, failing by assertion: 4 failed and 3 passed. The figures are 999494 ≤ 398940, 250249 ≤ 100490, 1000999 ≤ 401990 and 1501499 ≤ 602990, the same as the implementer's red log. |
| Keystroke differentials (`crprobe.keystroke-fixedpoint`, `crprobe.keystroke-settle`) | **0 of 36,560 and 0 of 2,760 differ** in document and selection. The same 8 and 1 non-fixed-point keystrokes occur at both trees, with 0 errors. caret-line-check finds nothing to classify. |
| Paste differential (mine: 15,966 pastes, 9 bases including `> q`, `>>> a` and `a\n> b\nc`; `paste-compare.out.txt`) | Text limb: 0 regressions. Caret limb (type Z after the paste, expected value from the input strings): 0 regressions. Errors: 0 at both trees. Raw selection differs in 95 pastes, and in every one the next typed character lands in the same place, so the difference is only in how the selection is stored. **Fresh-load limb: 4 regressions** (CR-26) and 7 improvements. The 246 failures shared by both trees predate this round. |
| CR-25's enumeration, re-run at `2b82972` with the identity predicate widened (`children === `) | 3 hits in `withNormalizeNode.ts`: `linesAgree`, `settledIn` and the carry. That matches the implementer's sweep. The second instrument, `new WeakMap\|useMemo\|memo` over `src/components/SlateEditor`, finds the same 2 memories and the React render memos, which are per render, not per operation. |
| CR-24's class: `git grep -n "catch("` over `src/components/SlateEditor/**/__tests__/**` | 0 hits. The settle limbs' `try` records the error and asserts that it is `''`. The implementer's red log at `42128cd` shows 23 of 42 failing on Slate's iteration error. |
| `convention-check.js website --since=85ece66` | 0 FAIL, 0 CANDIDATE, 18 SKIP (17 foreign `.playwright-mcp` captures, plus the ID-token check). By hand, the added lines hold no ID token: the one hit is "1,000" in a title, a count. They add no comment line. |

### Findings (Round 8)

CR-25 HIGH Round 7: **the count member is RESOLVED; the time member is not, and it goes to Fix Round 4 under D-24** (block 22:41Z).
- Class gone, on counts: `settledIn` resets no more than once per edit, and the paste drains once. Both counting cases fail at
  `85ece66` and pass at the tip.
  - Check that fails if it returns: `withNormalizeNode.keystroke-run-unit-builds.test.tsx`'s "in proportion to the lines" cases.
  - NM-82 survives as QAF-54's stated limit.
- Not gone, on time: 7 of SL-29's 8 `a🙂` fence members are over the line, so CR-25 stays unresolved, as F-57 placed it.
  - Per-operation cost grows 2.5 times from 200 to 1,000 lines, so fewer operations per line may not be enough on their own. The
    figures go to the architect's read.
  - Check that fails if it returns: `sl29-table.txt`'s probe, re-run at Fix Round 4's tip. It is not a suite case.

CR-24 LOW Round 7: **RESOLVED.** The `.catch(() => undefined)` is gone, and the class has 0 hits in the SlateEditor tests.
- Check that fails if it returns: `SlateEditor.fence-and-quote-keystrokes-reach-the-message.test.tsx` itself (23 of 42 red at
  `42128cd`).

CR-26 LOW Round 8 (M6; this round's `retypeLines` change)
- **Location**: `withNormalizeNode.ts` `holdsMarkerInText` and its use in `quotePrefixOf` and `retypeLines`, at `2b82972`.
- **Class**: `retypeLines`' rule for whether a quote line's `> ` lives in its text or in `quotePrefix` disagrees with the load
  path's (`getInitialValue`) for some line states. Two implementations of one rule.
  - Member: inside a `>>>` quote, a pasted fence-closing `> ```` line stays `["blockQuote","",true,"",["> ```"]]`.
  - A fresh load and `85ece66` build `["blockQuote","> ",true,"",["```"]]` (`paste-regression-shapes.out.txt`).
  - Text and caret are right at both trees, so the saved text is unchanged. What differs is the line's shape until a reload.
- **Enumeration**: the paste differential's fresh-load limb, read as "tip wrong where `85ece66` right": 4 hits of 15,966. They are
  text `> ```\n> x\n> ```` at the end of `>>> a\nb` and of `>>> a`, two of the 887 texts each.
  - The predicate does not see a keystroke that makes such a line. The keystroke differential compares trees, not fresh loads.
  - It also does not see bases outside the nine.
  - The 246 fresh-load failures shared by both trees are pre-existing members of the same broad class, not this round's.
- **Required Action**:
  - **Preferred (structural)**: `retypeLines` decides a line's marker placement with the same function the load path uses for
    that line state, so the two cannot disagree. Its callers, `linesAgree` (`!update`) and the `update` pass, take the decision
    unchanged in form.
  - **Minimum**: inside a multi-line quote, a `> `-led line that opens or closes a fence takes its marker into `quotePrefix`, as a
    fresh load does.
  - **Falsity signature**: a paste-into-quote case asserting `lineShapes` equal to a fresh load. For a paste of `> ```\n> x\n>
    ```\nc` at the end of `>>> a`, at `2b82972` the assertion fails on the fence-closing line (`""` against `"> "`).
  - Fixture property: the fence-closing line is neither the first nor the last line of the paste.
- Rides Fix Round 4 (block 22:41Z: this round's findings and the architect's read go into one round). A LOW below the cap, it
  would otherwise be a stated limit.

INFO: the implementer's SL-29 readings were taken at `3d988f7`, not at the tip. `2b82972` changes `retypeLines`, which every drain
runs, so the tip reading was owed. It is now in the record (`sl29-table.txt`) and agrees with the implementer's within noise. No
action is owed.

### Verdict, Round 8

**REJECTED** for M6 at `2b82972`, on CR-25 HIGH's time member, which steering has already sent back under D-24 (block 22:41Z).
- Everything else holds:
  - CR-25's count member and CR-24 are RESOLVED;
  - the paste is within SL-29's line at both sizes and fills, and 0.38 to 0.74 times the base;
  - no keystroke or paste of mine throws;
  - 0 of 39,320 keystrokes differ from `85ece66`.
- CR-26 LOW rides Fix Round 4.

Round 8's Assumption Not Checked is in § Assumption Not Checked.

### Round 8 sub-entry: Fix Round 4 at `a7ad3f2` (CR-25's time member, CR-26)

**Scope and identity.**
- The fix covers `2b82972..a7ad3f2`: 9 commits and 9 files, 4 of them production (`withNormalizeNode.ts`, `getInitialValue.ts`,
  `emojiLift.ts`, and the new `quoteMarker.ts`).
- It is a sub-entry, not a round, because every production change serves the two findings:
  - CF-33's rebuild and the search refactor serve CR-25's time member;
  - `splitQuote`, shared by the load path, is CR-26's Preferred form.
- Website HEAD was `a7ad3f2` at the start and the end. The hand-off is implementer-019's message, with Fix Round 4 in the
  implementation document (record `32c4a684`).
- The planner's R-111 (`b1f0f60c`) is the reading of the no-throw limb applied here.

**Reading.** In `withNormalizeNode.ts`, `retypeLines(!update)` calls `rebuildLines` inside `withoutNormalizing` when a line
disagrees.
- `rebuildLines` builds every line from its text with the load's `buildLines` and `liftLoaded`, limited to the changed lines' units.
- For each line whose type, language, fence state or prefix differs, it applies `remove_node` and then `insert_node`. While it
  does, the `rebuilding` WeakSet is set, under `try` and `finally`.
- `editor.getDirtyPaths` returns `[]` only while that flag is set. So the override covers exactly the operations the rebuild
  applies, which answers R-111's "Avoid" in the code as written.
- Three kinds of line are left to the old update pass: the selection's two lines, a carried line, and a line holding a
  typographic quote.
- `splitQuote` is the one marker rule, used by the load, `retypeLines` and `carriesMarker`. `spansInLine` and `holdsSpan` now
  search a start-sorted list.
- Tests:
  - There is a forced-normalise limb in `limbs()`, so it runs for every member at every size, with a positive control.
  - A rebuild count case bounds operations and dirty paths through a wrapper on `getDirtyPaths`.
  - There are cases for the selection elsewhere, for typographic quotes, and for a carried line.
  - All are spec-form, with no comments. The convention check gives 0 FAIL and 0 CANDIDATE, and by hand the 327 added lines hold
    0 ID tokens.

| Check (`verification/019/code-review/m6fix4-a7ad3f2/`, README there; load 1.7 to 3.1) | Result |
|---|---|
| SL-29, two interleaved rounds at `af3d95a` and `a7ad3f2` (`sl29-table.txt`) | **0 of 20 over the line**. The worst is the line-2 close over 1,000 `a🙂` lines: 40.8/44.8 ms against a line of 64.1. Paste `a🙂` at 1,000 lines: 2,160.3/2,142.3 against 3,957.2. No throws, 0 mismatches. This reproduces the implementer's figures. |
| Counts (Round 7's probes) | Close over `a🙂`: 2 builds and N line settles at 50 to 400 lines. Paste: 1 build and 2N fence reads. Linear. |
| Load differential, `getInitialValue` at `2b82972` against `a7ad3f2`, 3,287 texts (corpus, 3,000 generator texts, 15 quote edge cases) × 2 surfaces × partialMarkdown | **0 of 13,148 differ**, 0 errors. `buildLines` and `splitQuote` leave the load unchanged. |
| Paste differential against `85ece66` (15,966) | 0 regressions on any limb. Fresh-load failures drop from 249 to 85, and CR-26's 4 are among the 164 fixed. Text and caret unchanged. |
| Keystroke differentials against `85ece66`, with the selection's `classNames` dropped (`classify4.out.txt`) | Fixed-point probe: 11 of 36,560 differ. The tip equals a fresh load in all 11 and `85ece66` in none (`fresh-check-11-emoji.jsonl`). Settle probe: 0 of 2,760 (its 132 raw differences are `classNames` only). |
| Fixed points: **14 non-fixed-point keystrokes at the tip against 8 at `85ece66`**. The same probe on the tip with the override made a pass-through (`mutant-no-suppression.diff.txt`, read back) | **The mutant restores 8**: the 6 extra are caused by the suppression (CR-27). In each, a fresh load leaves an emoji in a code-block line as text. A forced normalise lifts it, in 3 to 9 operations (`fresh-check-11-emoji.jsonl`). `85ece66` had already lifted it. |
| Class members at `af3d95a`, `85ece66` and `a7ad3f2` (`class-*.jsonl`) | **A lone backtick** at the end of line 0, with a backtick ending the last line, over `a🙂` lines: **throws Slate's iteration error from 100 lines at `85ece66` and at the tip; `af3d95a` does not throw** (2 operations, 1 to 4 ms), and nor does `a` (CR-28). **Typographic-quote lines**, Backspace on line 2's ```` ``` ````: the tip takes 9,589 ms at 1,000 `a’` lines and 18,466 at `a’🙂`, against 54.4 and 52.2 ms at the base, which throws (CR-29). |
| `convention-check.js website --since=2b82972` | 0 FAIL, 0 CANDIDATE, 18 SKIP (17 foreign `.playwright-mcp` captures, plus the ID-token check, done by hand). |

**Dispositions.**
- **CR-25 HIGH: RESOLVED** at `a7ad3f2`. Its time member is 0 of 20 over SL-29's line, and its count member still holds.
  - Checks that fail if it returns: the rebuild count case ("applies two operations for each changed line and hands Slate no dirty
    path for them"), red at `2b82972` per the implementer's log. Also `sl29-table.txt`'s probe, which is not a suite case.
- **CR-26 LOW: RESOLVED.** There is one marker function, and `git grep -n -F -e '^ *>>> ' -e '^ *> ' a7ad3f2 -- src
  ':!*__tests__*'` gives 4 hits, all in `quoteMarker.ts`. The paste differential shows its 4 pastes fixed, 0 regressed, and the load
  unchanged.
  - Check that fails if it returns: `quote-and-fence-lines-settle`'s two added paste rows, red at `2b82972`.

CR-27 MEDIUM Round 8 (M6; a severity floor: R-111's admission condition)
- **Location**: `withNormalizeNode.ts` `rebuildLines`, the `editor.getDirtyPaths` override, and `resolveEmoji` and `resolveLine` (the
  lift that disagrees), at `a7ad3f2`.
- **Class**: the lines the rebuild writes under suppression are not always a normaliser fixed point, because the load path and the
  normaliser disagree on whether an emoji inside a code-block line is lifted. R-111 admits the suppression "only where the
  suppressed lines are already a normaliser fixed point", and the limb asserts that for the members only.
  - The load leaves such an emoji as text, which is what a code block shows. The normaliser lifts it when it settles the code line,
    or a unit that holds it.
  - At `85ece66` the 6 keystrokes leave emoji elements inside code lines, which a fresh load does not build.
  - At the tip they leave the fresh-load state, which the next drain that settles that unit changes.
- **Enumeration**: `crprobe.keystroke-fixedpoint` (1,285 inputs, 36,560 keystrokes), read for "not a fixed point at the tip and a
  fixed point on the no-suppression mutant". 6 hits: `599|0|end|<delete>`, `599|1|start|<backspace>`, `728|1|end|` `` ` ``,
  `941|0|end|<delete>`, `941|1|start|<backspace>` and `1190|1|end|` `` ` ``.
  - The predicate does not see a disagreement no keystroke in the corpus reaches.
  - It also does not see a fresh load that is itself not a fixed point. CF-33 records that a mount does not normalise, so a loaded
    message in this state is lifted at its first nearby edit, at every tree.
- **Required Action**:
  - **Preferred (structural)**: one lift rule. The normaliser decides an emoji's lift in a code line with the load's rule (as
    `liftLoaded` decides it), so a rebuilt line is a fixed point by construction. `resolveEmoji` has one caller, `handleElement`:
    under this form a code line keeps its emoji as text, a fresh load is unchanged, and `85ece66`'s 6 results change to the fresh
    load's.
  - **Minimum**: `rebuildLines` leaves to the normal path any line whose rebuilt form the normaliser would change. That costs time
    only on those lines.
  - Under either form, each fence member's forced-normalise limb stays at 0 operations.
- **Falsity signature**: a forced-normalise case over the texts of the four enumerated inputs after their keystrokes, asserting 0
  operations.
  - At `a7ad3f2` it fails on the count (3 to 9 operations), not by a timeout.
  - The fresh-load limb on the same cases fails at `85ece66` (emoji lifted in the code line).
  - Fixture property: the code line holding the emoji is neither the first nor the last line, and the edit is on another line.
- Whether R-111's condition binds outside the members is the planner's reading to confirm, and this finding is sent to it. The
  severity rests on the condition the change relies on, which has no assertion that fails beyond the members.

CR-28 HIGH Round 8 (M6; present at `85ece66` and the tip, absent at the chain base, so introduced by the chain and never released)
- **Location**: the emoji revert path in `withNormalizeNode.ts` (`handleElement` → `resolveEmoji` → `resolveLine` / `revertToText`)
  for an edit that changes the emoji layout of many lines without changing any line's type, at `a7ad3f2`.
- **Class**: an edit whose emoji-layout change spans more lines than Slate's iteration budget allows throws Slate's `Could not
  completely normalize the editor`.
  - The rebuild settles type, fence and marker changes only, so an inline-code span opened across lines reverts each line's emoji
    one normalise iteration at a time.
  - This is CF-30's throw class, with emoji reverts as the operations.
- **Magnitude**: measured in node, `embedDescription`, at load 1.7 to 3.1 (`class-*.jsonl`).
  - A backtick typed at the end of line 0 of a message of `a🙂` lines whose last line ends in a backtick throws at 100, 122, 123,
    200 and 1,000 lines, at `85ece66` and the tip. 40 lines does not throw.
  - At `af3d95a` the same keystroke takes 2 operations and 1 to 4 ms, with no throw.
  - Mounted (`crprobe.mounted-lone-backtick`, `mounted-lone-backtick-a7ad3f2.jsonl`): at 100 and 200 lines the keystroke throws
    the same error, and **the typed backtick never reaches the message** (one write, without it). At 40 lines it is written. The
    user loses the keystroke. A real browser is not measured.
- **Enumeration**: cannot enumerate by text predicate, because the members are edits, not sites. Members by probe:
  - a lone backtick pairing across lines: measured, throws;
  - removing such a backtick, so the emoji lift back: not measured;
  - other cross-line inline spans: not measured, QA's to measure.
  - The implementer's Outstanding 3 found the member at 200 lines. My probe finds it from 100.
- **Required Action**:
  - **Preferred (structural)**: settle an emoji-layout change across a run in one pass, as CF-33's rebuild does for line types.
    Build the changed lines' layout with the load's lift, inside the same scoped form, so the number of normalise iterations does not
    grow with the lines.
  - **Minimum**: none that holds the class. Raising Slate's budget only moves the size at which the throw appears.
  - `resolveEmoji`'s one caller is unchanged in form.
- **Falsity signature**: a case typing a lone backtick at the end of line 0 of 200 `a🙂` lines whose last line ends in a backtick,
  asserting no error and the fresh load's line shapes.
  - At `a7ad3f2` it fails on the error assertion, with Slate's message, not by a timeout.
  - Fixture property: the pairing backtick is on neither the edited line nor the one next to it.
- **Plan gap**, for the planner: AC-6.9's members are fence and quote keystrokes. No member changes the emoji layout of many lines
  without retyping them.

CR-29 MEDIUM Round 8 (M6; disposition steering's, under block 20:58Z)
- **Location**: `rebuildLines`' typographic-quote exclusion (`holdsBadCodepoint`), and `handleElement`'s per-line rewrite, at
  `a7ad3f2`.
- **Class**: a fence keystroke over lines that each hold a typographic quote still works line by line, so CR-25's time class holds
  for that fill.
- **Magnitude**: measured at `85ece66` and the tip, load 1.7 to 3.1. Backspace on line 2's ```` ``` ````:
  - over `a’` lines: 114.6 ms at 200 lines and 9,589 ms at 1,000;
  - over `a’🙂` lines: 279.6 ms at 200 lines and 18,466 ms at 1,000;
  - at `af3d95a`, 25.7 to 54.4 ms, and the base throws.
  - Against block 20:58Z's line the readings are about 3 to 270 times over (line 39.6 ms at 200, 68.0 at 1,000).
  - Reachability is narrow: the editor rewrites a typed curly quote, so these lines come from a loaded or imported message.
- **Enumeration**: `git grep -n "holdsBadCodepoint\|BAD_CODEPOINTS" a7ad3f2 -- src ':!*__tests__*'` gives the exclusion and the
  rewrite. Fills other than `’` (`‘ “ ”`) take the same path and are not measured.
- **Required Action**: under the 20:58Z ruling, a reading over the line goes to steering with its figures and load. It is not a fail
  on its own. If it is sent back, the structural form is the rewrite folded into the rebuild: the load-built line carries the
  rewritten text, so the line is a fixed point.

**Verdict, Round 8 sub-entry: REJECTED** for M6 at `a7ad3f2`, on CR-28 HIGH: typing a backtick in a 100-line emoji message throws,
where today's site does not.
- CR-27 MEDIUM is a severity floor and blocks the hand-off to QA.
- CR-29 goes to steering under 20:58Z.
- CR-25 and CR-26 are RESOLVED, with SL-29 met at the tip.

## Verdict

**Status**: M3 is **APPROVED_WITH_COMMENTS**, at the Round 3 sub-entry's fix confirmation of QAF-38 at `81c68b2`. Before that, CR-15 was RESOLVED at `d6aab03`, and the `b04c09f` sub-entry was REJECTED on CR-15.
- M6 is **REJECTED** at `a7ad3f2` (Round 8 sub-entry, Fix Round 4), on CR-28 HIGH: a lone backtick typed in a message of 100 or more emoji lines throws Slate's iteration error and loses the keystroke, where today's site does not. CR-27 MEDIUM, a severity floor on R-111's fixed-point condition, also blocks the hand-off to QA. CR-29 MEDIUM goes to steering under block 20:58Z. CR-25 HIGH and CR-26 LOW are RESOLVED, and SL-29 is met at the tip (0 of 20 over). Before that, M6 was **REJECTED** at `2b82972` (Round 8), on CR-25 HIGH's time member: 7 of SL-29's 8 `a🙂` fence members are over the line (1.2 s to close a fence above 1,000 emoji lines, against the base's 50 ms throw), and steering has already sent them back under D-24 (block 22:41Z). CR-25's count member and CR-24 are RESOLVED, the paste is within SL-29's line, and CR-26 LOW is new. Before that, M6 was **REJECTED** at `85ece66` (Round 7), on CR-25 HIGH: whole-run work repeated per operation, 7.6 s to close a code fence above 1,000 emoji lines, and paste 2.5 to 9 times the base. CR-24 LOW is a stated limit. CR-23's named member is resolved and its class carried by CR-25. CR-22 LOW stands for AC-6.8's bench. Before Round 7, M6 was APPROVED_WITH_COMMENTS at `42128cd` (Round 6 sub-entry); D-24 then reopened it.
- M5 is **APPROVED_WITH_COMMENTS** (Round 5 at `2e36107`, with its sub-entry for QAF-39 at `cf126ea`, checked on M5's source).
- M4 stays APPROVED_WITH_COMMENTS (Round 4 at `e58f2ed`). CR-17 is a LOW stated limit and does not move it.
- M3's earlier sub-entries, `2c1590f` and `380e82d`, are superseded for M3 by `b04c09f`, `d6aab03` and `81c68b2`.
- M2 stays APPROVED_WITH_COMMENTS at `7dcedc9` (Round 2).

**Rationale**: in Round 4 and in the Round 3 sub-entries above. Every MEDIUM is resolved with a captured check that fails if it
returns. The LOWs are carried, those raised under the caps as stated limits.

Reconcile note, 2026-11-23T22:38: the M3 verdict read the plan at Revision 10. Revisions 11 (22:28) and 12 (`b0af4dc3`, 22:34) revise AC-3.7's
frozen residue list: its per-input entries, atom-bearing population, family check and RK-9. That list is built by M4's
residue-list commit, and Round 3 left AC-3.7 out of its criteria. No criterion this verdict verified moved, so it does not expire.

Revision 12's Reading Order row for `code-reviewer` adds "AC-3.7's families, their reasons and counts, and sampled entries". That
read is owed at the commit that lands the list, and goes to this review's M4 round.

Steering capped M3 past Revision 12 (rulings block 2026-11-23T22:35Z, `41101e7`). A further M3 gap below HIGH is therefore routed
to `planner-019` for the Planner batch as a stated limit, with no review round. A severity-floor finding is excepted. CR-11 and the
other open M3 LOWs were raised before the cap and keep the carriers named below.

## Required Actions

Blocking (Round 8 sub-entry, M6 at `a7ad3f2`):
- **CR-28 HIGH**: an emoji-layout change across many lines must settle without Slate's iteration error. Use the Preferred form: CF-33's scoped rebuild, extended to the lift. The falsity signature is the lone-backtick case at 200 `a🙂` lines.
- **CR-27 MEDIUM**: one lift rule for code lines, so the rebuilt lines are a normaliser fixed point. The falsity signature is the forced-normalise case over the four corpus inputs.
- **CR-29 MEDIUM** is steering's to send back or accept (block 20:58Z).

Blocking (Round 8, M6 at `2b82972`, superseded by the sub-entry): **CR-25 HIGH, the time member**: bring the `a🙂` fence keystrokes within SL-29's line (block 20:58Z) at 200 and 1,000 lines, keeping the count limb and D-24's throw fix, in the lift form architect-019's design read gives (block 22:41Z). Fix Round 4 also carries **CR-26 LOW** (marker placement inside a `>>>` quote).

Blocking (Round 7, M6 at `85ece66`, superseded by Round 8): **CR-25 HIGH**. Eliminate the class, whole-run or whole-document work repeated for every
operation of a multi-operation edit, by its Preferred form or another that meets its falsity signature: the two counting cases over
emoji-bearing lines, for a fence close and a paste. CR-24 LOW rides the same round if the implementer touches the mounted test; it
is otherwise a stated limit.

M3 and earlier: none blocking. CR-15 is RESOLVED at `d6aab03`.

Open LOWs, each with its carrier:
- CR-16 (M3): a stated limit in the Planner batch, plan R-54 (record `dcbde053`).
- CR-12 (M4) and CR-14 (M3): sent to `planner-019` for the Planner batch as stated limits (cap block 00:49Z).
- The pre-existing `GuildProvider.tsx:162` lint FAIL: the implementer's follow-up.
- CR-11: M4 Outstanding -1, not taken at `e58f2ed`; it is now a stated limit under the caps, sent with the batch above.
- CR-21 LOW (Round 6): sent to `planner-019` for the Planner batch as a stated limit. CR-20 is RESOLVED at `42128cd`.
- CR-22 LOW (Round 6 sub-entry): a stated limit for the Planner batch (block 07:21Z). QA reads the bench's exit 124 as the timed limb's red until it is fixed.
- CR-23 MEDIUM (Round 6 sub-entry): to steering, with the iteration-cap throw it is already putting to the owner, and to `planner-019` as a stated limit unless the owner rules otherwise.
- Outstanding 1's residue: its family is wider than the implementation document states (Round 6 sub-entry), and that goes to `planner-019` for R-92's row.
- CR-17 (Round 5): Planner batch, R-61. CR-18 and CR-19 are RESOLVED at Round 6.
- CR-4's remainder, CR-8 and CR-9: M3 Outstanding 11.
- CR-7's split and re-keying: M3 Outstanding 11. Its M6 deletion: plan R-30.
- CR-5's preferred form (a zero cell fails the coverage run): M3 Outstanding 11.

## Assumption Not Checked

Round 1: This review assumes the minifier keeps `startEngine.notice` in the editor page's client chunk at `22f3e58` (AC-2.6), and
does not test it. I built nothing. Falsity signature: `grep -c 'Copyright 2025 Discord, Inc.'` returns 0 over the chunk that the
edit page's `page_client-reference-manifest.js` names in a `next build` of `22f3e58`, or a build with the notice line removed still
carries the text, in which case the control does not discriminate. Owner: QA Phase 2 (AC-2.6, with the plan's mechanism-removed tip
control, which the implementer's earlier-attempt build only approximates).

Round 2: This review assumes that no M4 renderer will branch on `LinkKind`, quote `line`/`rest`, list `ordered` or
`heading.level` without its own literal table and the unmapped-kind line, and does not test it. No renderer exists yet. Falsity
signature: an M4 renderer `switch`/lookup over one of those four whose unknown arm renders nothing or throws, instead of source
text plus `markdown-engine-unmapped-kind`. Owner: this review's M4 round.

Round 3: This review assumes that the counts in the M3 document's Findings 4 and 5 (residue per surface; 1,116 loose disagree; box
differences 1,545 of 2,463) are what `pnpm test:discord` produces at `f4060c5`, and does not test it. I did not run the live
command. Falsity signature: a live run at `f4060c5` whose `discord-reports/` files show different counts from the document's.
Owner: QA Phase 2 on M3, which runs the command (D-12) and copies the reports into `verification/019/`.

Round 3 sub-entry: This review assumes that the live run `m4-discord-live-cr6.log.txt` (9 of 9) ran the code committed at
`1698c80`, and does not test it. The run is stamped 21:37, before the commit's 21:46, and ran in the shared tree; I did not run
the live command. Falsity signature: a live run of `discordLive.oracle-controls.test.ts` in an export of the approved SHA fails a
case, or `oracle.attempts` is non-empty once CR-10's wiring is asserted. Owner: QA Phase 2 on M3, with the same live command.

Round 3 sub-entry at `2c1590f`: This review assumes that `discord/discordLive.oracle-controls.test.ts` passes at `2c1590f`, its
attempts case included, and does not test it. Neither the implementer nor I re-ran the live file after `2c1590f`. Falsity
signature: in an export of `2c1590f`, the live file fails a case, or `oracle.attempts` names an address or an `XMLHttpRequest.`
member. Owner: QA Phase 2 on M3, which runs the live command at the approved SHA.

Round 2's Assumption Not Checked is closed at Round 4: it held for list type and link kind, and its residue is CR-12.

Round 6: This review assumes that slate-react in Chrome routes Enter and Shift+Enter in a `> ` quote line through `editor.insertBreak` and `editor.insertSoftBreak`, the two methods M6's carry overrides, as the jsdom drive does, and does not test it. The suite drives the editor's methods, not the browser's `beforeinput` path. Falsity signature: in Chrome on a local production build, `> a`, Enter, `b` saves `> a\nb` (no carried marker), or Shift+Enter carries where Enter does. Owner: UAT, at AC-6.7's human-observable walk on AC-6.3's local build.

Round 8 sub-entry at `a7ad3f2`: This review assumes that the 6 non-fixed-point states CR-27 names are reached only through the fixed-point probe's corpus texts and keystrokes, which are odd backtick constructs, and that ordinary editing reaches none of them. It does not test that. Falsity signature: a QA corpus run of ordinary texts, holding a code block with emoji beside plain lines and edited on a neighbouring line, shows an emoji element appearing inside a code block at the tip after the second edit. Owner: QA Phase 2 on the next fix round, beside CR-27's falsity case.

Round 8 at `2b82972`: This review assumes that the per-keystroke and per-paste times in Chrome, with slate-react mounted, keep the ratio to the chain base that unmounted jsdom gives, and does not test it. Every SL-29 reading here is node and jsdom, unmounted. Falsity signature: in Chrome on a local production build of Fix Round 4's tip, a paste of 1,000 `a🙂` lines into the embed description, profiled, takes more than 1.25 times the same paste at `af3d95a`, where node gives about 0.7 times. Owner: QA Phase 2 on Fix Round 4 (SL-29's entry condition), or UAT's B-11 walk if QA has no browser.

Round 7 at `85ece66`: This review assumes that a paste in Chrome reaches slate-react's `insertData` and splits into one operation set per line, as my unmounted drive of `insertData` does, and does not test it. I timed the paste unmounted, because the mounted helper's fake timers freeze the clock, so CR-25's paste magnitude rests on that path. Falsity signature: in Chrome on a local production build of `85ece66`, pasting 200 lines of `a🙂` into the embed description, profiled, shows normalise time within a few times the chain base's for the same paste (where node gives 940 ms against 241 ms). Owner: QA Phase 2 on CR-25's fix round, against the counting case's figures, or UAT's B-11 walk if QA has no browser.

Round 6 sub-entry at `42128cd`: This review assumes that in a mounted editor in Chrome, the residue's unsettled line (an emoji shown as text after a key that crosses an unclean fence) is settled by the next keystroke anywhere in its unit, and does not test it. I tested the residue against a forced `Editor.normalize` in node, not against later typing or slate-react's render. Falsity signature: in Chrome on a local production build of `42128cd`, after typing `` ` `` at the start of `q` in `q⏎```ts⏎``a 🙂⏎```⏎🙂`, the 🙂 on line 2 stays plain text after a further keystroke on line 0 or 2, or the editor throws. Owner: UAT, at B-10's human-observable walk on AC-6.3's local build.

Round 5: This review assumes that the run-unit decorator's per-edit cost in a real browser is of the same order as the node timing the implementer recorded (median 4.87 ms over a 4,160-character, 35-line unit), and does not test it. The timing was read under vitest in node, not in Chrome with slate-react's render loop. Falsity signature: in Chrome on a local production build, a decorate pass over AC-5.7's 4,096-character multi-line unit, profiled during typing, takes over 16 ms (one frame), or typing shows visible input lag. Owner: UAT, at AC-5.5's real-browser walk (QA register B-3), which runs on that build.

Round 3 sub-entry at `81c68b2`: This review assumes that the whole offline suite passes at `81c68b2` (the implementer reports 223 files, 3,272 of 3,272, exit 0, on a rerun after one load timeout in `preview.engine-not-ready`), and does not test it. I ran only `discordRouting.predicates` offline and the live routing file. Falsity signature: in an export of `81c68b2`, `npx vitest run --project node --project dom` exits non-zero or counts other than 3,272. Owner: QA's refresh pass on M3.

Round 3 sub-entry at `d6aab03` (superseded by `81c68b2`'s): This review assumes that the whole offline suite passes at `d6aab03` (the implementer reports 223 files, 3,268 cases, exit 0), and does not test it. I ran only the drift and rich-rule files offline and the two live drift files. Falsity signature: in an export of `d6aab03`, `npx vitest run --project node --project dom` exits non-zero or counts other than 3,268. Owner: QA's refresh pass on M3.

Round 3 sub-entry at `b04c09f` (superseded by `d6aab03`'s): This review assumes that the whole offline suite passes at `b04c09f`, exit 0 with 3,460 cases, and does not test it. I ran only the two new files and the two live drift files, about a minute each, under mutation-run's controls. Falsity signature: in an export of `b04c09f`, `npx vitest run --project node --project dom` exits non-zero or counts other than 3,460. Owner: QA's refresh pass on M3, which runs the offline suite at the SHA it verifies.

Round 4: This review assumes that `discord/discordPreview.legacy-equality.test.tsx` passes at `e58f2ed`, and does not test it.
The implementer ran it at `aa728f3`'s tree plus the lint-only commit, and I did not run the live command. Falsity signature: a live
run in an export of `e58f2ed` fails its unlisted, signature or stale case, or prints counts other than the list's 6,142. Owner: QA
Phase 2 on M4, which runs `pnpm test:discord` at the approved SHA.

## Next Steps

- QA (`qa-019`):
  - the M3 refresh pass at `81c68b2`: its diff and the offline suite (the `81c68b2` Assumption Not Checked), and QAF-38's closure;
- M5's round (this review): account for the 192 fewer offline cases between `b04c09f` and `d6aab03`.
  - Phase 2 on M4 at `e58f2ed`: `pnpm test:discord` at the approved SHA (Round 4's Assumption Not Checked), and the self-check
    sweep's survivors;
  - the refresh pass on M3's `380e82d` (QAF-32 and QAF-33);
  - the M3 items as before.
- Planner (`planner-019`): CR-11, CR-12, CR-14 and CR-16 as stated limits in the Planner batch (CR-13 is resolved).
- Implementer (`implementer-019`), the next fix round: **CR-28 HIGH** and **CR-27 MEDIUM** (Round 8 sub-entry, REJECTED at `a7ad3f2`), and CR-29 if steering sends it back. Evidence and probes are in `verification/019/code-review/m6fix4-a7ad3f2/`.
- Steering (`steering-hooks-fixer`): CR-29's SL-29-shaped reading (typographic-quote lines, block 20:58Z), and CR-28 as a chain-introduced throw beside D-24.
- Planner (`planner-019`): CR-27 against R-111 (does the fixed-point condition bind beyond the members?), and CR-28's plan gap (no member changes many lines' emoji layout without retyping them).
- Implementer (`implementer-019`), Fix Round 4, superseded: **CR-25 HIGH's time member** (Round 8, REJECTED at `2b82972`) with architect-019's lift design read, and **CR-26 LOW**. The SL-29 probe and the paste differential are in `verification/019/code-review/m6fix3-2b82972/`.
- Architect (`architect-019`): Round 8's per-operation cost (123 µs at 200 lines, 308 µs at 1,000, line-2 close over `a🙂`), for the lift design read.
- QA (`qa-019`): no M6 hand-off until Fix Round 4 is reviewed. Round 8's Assumption Not Checked is QA's on that round.
- Implementer (`implementer-019`), superseded: **CR-25 HIGH** (Round 7, REJECTED at `85ece66`). Its falsity signature and my probes are in `verification/019/code-review/m6fix2-85ece66/`. CR-24 LOW too if the mounted test is touched.
- Planner (`planner-019`): CR-25's plan gap (no emoji-bearing fill, and no paste, in AC-6.9's text class) and CR-24 as a stated limit.
- Steering (`steering-hooks-fixer`): Round 7's reject holds a production defect's fix. D-24's words govern the fence member; the cap reading for the paste member is steering's.
- QA (`qa-019`): no M6 hand-off until CR-25's fix is reviewed. Round 7's Assumption Not Checked is QA's on that round.
- Steering (`steering-hooks-fixer`): CR-23 MEDIUM, beside the iteration-cap throw it is putting to the owner.
- Planner (`planner-019`): CR-22 LOW and CR-23 MEDIUM as stated limits, unless the owner rules otherwise; and Outstanding 1's wider family for R-92's row.
- UAT: the Round 6 sub-entry's Assumption Not Checked, at B-10.
- Architect (`architect-019`): the stale Packaging line in `system-architecture.md`.
- QA (`qa-019`): Phase 2 on M5 at `2e36107`. That covers the offline suite (Round 5's Assumption Not Checked is UAT's) and CR-18's population past the sample.

## Resumption State

Written 2026-11-24T19:47Z for a `/clear`, at steering's ask (`steering-hooks-fixer`, 367,141 tokens). The earlier state, from
07:07Z, is kept below where it still holds.

- **Done.**
  - **Round 7 at `85ece66`** (M6 Fix Round 2, AC-6.9): **REJECTED** on CR-25 HIGH, with CR-24 LOW (record `e92137fe`; plan R-103
    at `7054250e`). Hand-back sent to implementer-019, and the plan gap to planner-019.
  - Steering ruled (effort rulings block 19:43Z, record `6507ae1e`): the cap does not carve out CR-25's paste member, and the
    verdict stands as written. The fence member rides D-24. Whether the paste joins this round's criterion is a scope question
    steering is putting to the owner.
  - M2 at `7dcedc9`, M3 at `81c68b2`, M4 at `e58f2ed`, M5 at `2e36107` (with QAF-39 at `cf126ea`) and M6 at `119471f`: all
    APPROVED_WITH_COMMENTS.
  - Plan rows: R-53, R-55, R-57, R-60, R-73 and R-77. The planner registered the findings: R-54, R-61 and R-78.
  - CR-20's short-message claim is corrected by the reconcile note in Round 6, and withdrawn to steering in the same channel.
- **Done since (2026-11-24T09:29Z).** The CR-20 fix confirmation is the Round 6 sub-entry at `42128cd`: APPROVED_WITH_COMMENTS,
  with CR-22 LOW and CR-23 MEDIUM. The fix did not touch `runUnit.ts` or `decorator.tsx`, so step 3 of the earlier plan (the
  both-trees decorator differential) was not owed.
- **Done since (Round 7).** M6 Fix Round 2 at `85ece66` is REJECTED on CR-25 HIGH, with CR-24 LOW. Probes are in
  `verification/019/code-review/m6fix2-85ece66/`.
- **Done since (Round 8, 2026-11-24T22:55Z).** M6 Fix Round 3 at `2b82972` is REJECTED on CR-25's time member (steering block 22:41Z already sends it back under D-24). CR-25's count member and CR-24 are RESOLVED, and CR-26 LOW is new. The evidence is in `verification/019/code-review/m6fix3-2b82972/`.
- **Done since (Round 8 sub-entry, 2026-11-25).** M6 Fix Round 4 at `a7ad3f2` is REJECTED on CR-28 HIGH (a lone backtick throws from 100 `a🙂` lines, mounted too, where `af3d95a` does not), with CR-27 MEDIUM (the suppression's fixed-point condition fails on 6 corpus keystrokes; the mutant restores them). CR-29 MEDIUM (typographic quotes) goes to steering. CR-25 and CR-26 are RESOLVED. The evidence is in `verification/019/code-review/m6fix4-a7ad3f2/`.
- **Next (pending).** The next fix round (CR-28, CR-27, and CR-29 if it is sent back), as a sub-entry of Round 8 unless it touches beyond them. Re-run `run-fix4.sh` and `run-fix4b.sh` (exports of af3d95a, 85ece66, the tip, and the no-suppression mutant), the load differential, the fresh-check over the keystroke differential's differences, and the mounted lone-backtick probe.
- **Superseded (Fix Round 4 plan).** Fix Round 4 (CR-25's time member with architect-019's lift design read, and CR-26), at its hand-off. It is a sub-entry of Round 8 unless it touches beyond those findings. Re-run, from `m6fix3-2b82972/`: `run-sl29.sh` (all three trees, judged against block 20:58Z's line, both fills), `run-diff.sh` (paste and keystroke differentials, counts) and the committed count limb at `85ece66`. Read R-111 (CF-33's form under the no-throw limb): where a suppression is used, a forced `Editor.normalize` after every keystroke member, at every N, applies no operation, and the suppression covers only the replacement operations built from the load path.
- **Fix Round 4's design, and what it adds to the review.**
  - CF-33 (architect-019, record `4dfc0505`, timings in `verification/019/architect-conformance/fix3-lift/`) measures the cause of
    the per-operation growth: Slate's pending dirty-path list, rebuilt on each `insert_node` and `remove_node`.
  - Its recommended form rebuilds the changed lines from the load path, with `editor.getDirtyPaths` returning `[]` for those
    operations alone.
  - Under R-111, and the planner's ruling on the no-throw clause (steering block 22:48Z, which I read first), I review that
    suppression as a guard:
    - **Scope.** A mutant that widens it to every operation, or to every `insert_node`, must fail a committed case by assertion.
      An operation from another source in the same drain must still dirty its path.
    - **Fixed point.** A forced `Editor.normalize` after every keystroke member, at every N, applies no operation.
    - **Differentials.** The keystroke and paste differentials show 0 new differences.
  - QA has taken Round 8's Assumption Not Checked into its Phase 2 on Fix Round 4, with its own browser, not B-11 (record
    `a721fd95`).
- **Superseded (Fix Round 3 plan).** Fix Round 3 (CR-25), which reaches this review at its hand-off. It is a sub-entry of Round 7 unless it
  touches beyond CR-25's scope, in which case it is Round 8. First read the owner's answer on the paste member (steering's next
  rulings block after 19:43Z), and any plan revision the planner writes for CR-25's gap.
  1. Read the fix diff at its `Handoff-At` through `git show`. Exports go by `git archive` into the scratchpad, with
     `node_modules` symlinked from the website clone. Run under `unshare -rn`.
  2. Copy the probes from `verification/019/code-review/m6fix2-85ece66/` (drop `.txt`, set `CRPROBE_OUT`):
     `crprobe.fence-emoji-count` and `crprobe.paste-count`. The ratio at 1,000 against 200 must be at most 10; it was about 25.
     Check that the implementer's counting cases are red at `85ece66`, with a mutant restoring the `editor.children` key if needed.
  3. Re-run `crprobe.keystroke-fixedpoint` and `crprobe.keystroke-settle` against `85ece66`, and classify with `classify.py` and
     `caret-line-check.py`. Expect 0 differences, or a stated family.
  4. Time `crprobe.fence-emoji` and `crprobe.paste-emoji-unmounted` against Round 7's tables (base `af3d95a` figures there).
     Re-run the planted-ceiling bench control, and the mounted no-catch probe if CR-24 is touched.
  5. Re-run CR-25's enumeration (`git grep -n "=== editor.children\|editor.children ===" <sha> -- src ':!*__tests__*'`) with a
     second instrument, and break its predicate. A memo keyed some other way that still resets per operation is a member.
  6. Then the changelog row (`record-edit.js` with `{now}`), the plan row by `plan-row-commit.js` (the next R number), and the
     hand-off to QA or back to the implementer.
  M7 is devops's. This review has no M7 round unless steering asks.
- **SL-29 brief (planner-019, 2026-11-24T20:5xZ, D-27, block 20:54Z, plan record `e241aa14`).** Step 4 is widened to every
  SL-29 member, tip beside `af3d95a` on the same probe, box load beside each: paste `a` and `a🙂` through `insertData`, and
  opening and closing a fence on the `a🙂` texts, each at 200 and 1,000 lines. CR-25 stays unresolved while any member is several
  times the base, whatever the count limbs read. Paste base medians: `verification/019/planning/paste-refute/out-af3d95a.jsonl`.
  **Premise defect, sent to planner-019 and steering at 20:58Z:** `code-review/m6fix2-85ece66/fence-emoji-af3d95a.jsonl` shows
  that all four `a🙂` fence members at 200 and 1,000 lines (and every `a` member at those sizes) carry `Error: Could not completely
  normalize` at the base. Each base median there (16.2 to 48.1 ms) times the iteration-cap throw, not a completed keystroke, so
  "several times the base" has no valid denominator for the fence members. The paste members' base runs have no errors. The fence
  members wait for steering's ruling on the comparator. Until then, the tip readings are recorded beside the base's throw time,
  and the throw is named on each row.
- **SL-29 comparator, ruled (effort rulings block 2026-11-24T20:58Z, record `493aa6cc`).** A fence tip reading compares
  against `af3d95a`'s median on the same probe, with the base's throw named beside it, built as the plain-line fence ceiling
  (plan § the fence keystrokes' ceiling) is built. The ruling's arithmetic:
  - Roughly today's speed is a tip median of at most (the larger base median at that N) × 1.25, for fence and paste alike.
  - A reading above that line goes to steering with its figures and the load. It is not a fail on its own.
  - A tip throw, or a write failure, fails on its own limb.
  - Context only: the same keystroke's plain `a` reading, at the same size, at the tip.

  How I apply it:
  - For a fence, "larger" means the larger of the open and close medians, as in the plan's ceiling.
  - A paste member has one base median per fill and N. I hold each paste member to its own median, which is the stricter
    reading, and I have told steering so.
  - I re-run the base in the same session as the tip and judge against that run. Round 7's figures are recorded beside it.

  Lines from the committed figures:

  | Member | Base medians | Line (× 1.25) |
  |---|---|---|
  | `a🙂` fence, N = 200 | close 16.2, open 16.9 ms | 21.1 ms |
  | `a🙂` fence, N = 1,000 | close 48.1, open 43.5 ms | 60.1 ms |
  | Paste `a`, N = 200 | 135.1 ms | 168.9 ms |
  | Paste `a`, N = 1,000 | 1,695 ms | 2,118.8 ms |
  | Paste `a🙂`, N = 200 | 237 ms | 296.3 ms |
  | Paste `a🙂`, N = 1,000 | 2,972.1 ms | 3,715.1 ms |

  Sources: the fence medians are from `code-review/m6fix2-85ece66/fence-emoji-af3d95a.jsonl`, and the paste medians from
  `planning/paste-refute/out-af3d95a.jsonl`.
- **Approach in flight.** None.
- **Branch and HEAD.** The website shared tree is on `chain/019-slate-formatting-discord-engine` at `a7ad3f2`. I never move it. The
  record is on `master`.
- **Uncommitted or mutated locally.** Nothing in any repository. The scratchpad holds probe copies and outputs, all disposable;
  the exports are deleted.
- **Evidence run but not recorded.** None. Everything cited is under `verification/019/code-review/`.
- **Questions sent, and to whom.** None of mine is open: the SL-29 fence comparator is ruled (block 20:58Z).
- **Cache-warm wake.** Deleted at this checkpoint. Re-arm on resume.
