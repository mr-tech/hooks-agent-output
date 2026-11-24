---
ID: 019
Origin: 019
UUID: 286c730a
Reviewed-At: "d6aab03 — repos=website; the latest verdict is the M3 Round 3 sub-entry at d6aab03 (CR-15 confirmed, APPROVED_WITH_COMMENTS), after b04c09f (QAF-36, REJECTED on CR-15); Round 4 is M4 at e58f2ed (its 13 commits in f4060c5..e58f2ed); M3's Round 3 sub-entries at 380e82d (test-only), 2c1590f and 1698c80; Round 3 itself at f4060c5; M2 closed at Round 2, 7dcedc9"
Status: In Review
Round: 4
Verdict: APPROVED_WITH_COMMENTS
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

## Verdict

**Status**: M3 is **APPROVED_WITH_COMMENTS**, at the Round 3 sub-entry's fix confirmation at `d6aab03` (CR-15 RESOLVED), after the `b04c09f` sub-entry was REJECTED on CR-15.
- M4 stays APPROVED_WITH_COMMENTS (Round 4 at `e58f2ed`).
- M3's earlier sub-entries, `2c1590f` and `380e82d`, are superseded for M3 by `b04c09f` and `d6aab03`.
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

None blocking. CR-15 is RESOLVED at `d6aab03`.

Open LOWs, each with its carrier:
- CR-16 (M3): a stated limit in the Planner batch, plan R-54 (record `dcbde053`).
- CR-12 (M4) and CR-14 (M3): sent to `planner-019` for the Planner batch as stated limits (cap block 00:49Z).
- The pre-existing `GuildProvider.tsx:162` lint FAIL: the implementer's follow-up.
- CR-11: M4 Outstanding -1, not taken at `e58f2ed`; it is now a stated limit under the caps, sent with the batch above.
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

Round 3 sub-entry at `d6aab03`: This review assumes that the whole offline suite passes at `d6aab03` (the implementer reports 223 files, 3,268 cases, exit 0), and does not test it. I ran only the drift and rich-rule files offline and the two live drift files. Falsity signature: in an export of `d6aab03`, `npx vitest run --project node --project dom` exits non-zero or counts other than 3,268. Owner: QA's refresh pass on M3.

Round 3 sub-entry at `b04c09f` (superseded by `d6aab03`'s): This review assumes that the whole offline suite passes at `b04c09f`, exit 0 with 3,460 cases, and does not test it. I ran only the two new files and the two live drift files, about a minute each, under mutation-run's controls. Falsity signature: in an export of `b04c09f`, `npx vitest run --project node --project dom` exits non-zero or counts other than 3,460. Owner: QA's refresh pass on M3, which runs the offline suite at the SHA it verifies.

Round 4: This review assumes that `discord/discordPreview.legacy-equality.test.tsx` passes at `e58f2ed`, and does not test it.
The implementer ran it at `aa728f3`'s tree plus the lint-only commit, and I did not run the live command. Falsity signature: a live
run in an export of `e58f2ed` fails its unlisted, signature or stale case, or prints counts other than the list's 6,142. Owner: QA
Phase 2 on M4, which runs `pnpm test:discord` at the approved SHA.

## Next Steps

- QA (`qa-019`):
  - the M3 refresh pass at `d6aab03`: its diff and the offline suite (the `d6aab03` Assumption Not Checked); `routingReport`'s fields are not measured;
- M5's round (this review): account for the 192 fewer offline cases between `b04c09f` and `d6aab03`.
  - Phase 2 on M4 at `e58f2ed`: `pnpm test:discord` at the approved SHA (Round 4's Assumption Not Checked), and the self-check
    sweep's survivors;
  - the refresh pass on M3's `380e82d` (QAF-32 and QAF-33);
  - the M3 items as before.
- Planner (`planner-019`): CR-11, CR-12, CR-14 and CR-16 as stated limits in the Planner batch (CR-13 is resolved).
- M5 implementer and this review's M5 round: CR-3.

## Resumption State

Updated 2026-11-24T02:07Z, after the CR-15 confirmation at `d6aab03`.

- **Done.**
  - **M2:** closed, APPROVED_WITH_COMMENTS at `7dcedc9`.
  - **M3:** APPROVED_WITH_COMMENTS at `d6aab03`. CR-15 is RESOLVED; CR-16 LOW is a stated limit (R-54). It is with `qa-019`
    for the refresh pass.
  - **M4:** APPROVED_WITH_COMMENTS at `e58f2ed`.
- **Next.**
  - M5 at its document's `Handoff-At`, after steering's hand-off. It owes:
    - CR-3: one leaf-role source, `git grep -n TOKEN_LEAF_ROLES`;
    - an account of the offline case count, 3,460 at `b04c09f` against 3,268 at `d6aab03`.
  - M6 after that.
  - All are capped. A severity floor is excepted.
- **Approach in flight.** None.
- **Branch and HEAD.** The website shared tree is on `chain/019-slate-formatting-discord-engine`, past `d6aab03`, and I never move
  it.
- **Local state.** The scratchpad `qaf36/` holds work and output folders and the export `xd6/`, all disposable. Everything cited is
  in `verification/019/code-review/qaf36-b04c09f/` and `cr15-d6aab03/`.
- **Questions sent, and to whom.** None open.
- **Cache-warm wake.** Armed: a one-shot for 02:42 local.
