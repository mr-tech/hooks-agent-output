---
ID: 019
Origin: 019
UUID: 286c730a
Reviewed-At: "78c5f74 — repos=website; M2 paths only (engine.ts, MarkdownProvider.tsx, the engine.* and MarkdownProvider.engine-state tests); Round 1 at 22f3e58, its fix sub-entry at 78c5f74"
Status: In Review
Round: 1
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
| AC-2.7 in an export: `pnpm install --frozen-lockfile` in a `git archive` of `22f3e58`, under `systemd-run` | exit 0; lockfile sha256 identical before and after. This closes the implementer's Outstanding item "AC-2.7 in an export" | `m2-ac27-install-frozen-export.{log,exit}`, `m2-export-lock-{before,after}.sha256` |
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
| `pnpm install --frozen-lockfile` in a scratch clone of `78c5f74` | exit 0 | `m2fix-install-frozen-78c5f74.log` |
| Re-attack of the routing and the new guard: 8 probes through `mutation-run.py`. These are my three Round 1 probes re-anchored, two mid-table swaps that neither a first-key nor a last-key fixture would catch, and three guard mutants. Suite: the 8 M2 engine and provider files under `--project node --project dom` (control 270 cases, exit 0) | 8 of 8 KILLED, count `checked`. Each kill includes the routing or not-ready case that names it, by assertion, with no timeout | `m2fix-mutants-cr-78c5f74.json`, `m2fix-mutants-cr-78c5f74-out/`, `-titles.txt`, `.runner.txt` |
| Enumerations re-run at `78c5f74` | keyed lookups: the same 2 plus the type index; `parseWasm(` calls: 1, behind the guard; product callers of `parseLossless`: 0 | (commands in the CR-1 and CR-2 lines) |
| `convention-check.js --files` over the 5 fix files, and the ID-token class and basename form by hand | 0 FAIL, 0 CANDIDATE. The id-token and basename checks are skipped by the tool and pass by hand (0 hits; `engine.not-ready.test.ts` matches the positive form) | `m2fix-convention-check-78c5f74.txt` |
| Expectation independence | the routing literals and the renderer table are written in the tests, not read from the adapter. The not-ready test runs the real engine, with only `init` replaced in the rejected case | n/a |

Disclosure: my R-25 plan row was first written with a typed stamp one minute ahead of the clock. The stamp gate
(`stamp-gate-hook`) and `plan-row-commit.js` refused it. I restamped it from `date -u` through `record-edit.js` (`{now}`) and committed it as
`1de99085`. That met the gate; it was not a workaround.

I did not run the whole suite, which is QA's. The implementer reports 3026 of 3026 with exit 0 at `78c5f74`.

## Verdict

**Status**: APPROVED_WITH_COMMENTS (Round 1 sub-entry, M2 at `78c5f74`)
**Rationale**: CR-1, the severity floor, and CR-2 are resolved in their structural form. Each is held by a captured check that fails
if it returns. Two LOW findings remain open, each with a carrier:
- CR-3 goes to M5 (the M5 implementer and this review's M5 round).
- CR-4 is deferred by the implementer to M3's oracle round. Its carrier is this document's M3 round, which checks it beside AC-2.1's
  second member, `helpers/discordOracle.ts`. If M3's round has not run when the chain closes, CR-4 moves to a handoff.

Round 1 found M2 otherwise sound on these points:
- the masks equal their independent literals on all 186 cells;
- the pin and lockfile are as dispositioned;
- R-A installs frozen in an export;
- the link allow-list held against 4,834 payloads;
- the comment and naming conventions are clean.

## Required Actions

None owed for M2. Optional: CR-4 at M3 (above). CR-3 at M5.

## Assumption Not Checked

Round 1: This review assumes the minifier keeps `startEngine.notice` in the editor page's client chunk at `22f3e58` (AC-2.6), and
does not test it. I built nothing. Falsity signature: `grep -c 'Copyright 2025 Discord, Inc.'` returns 0 over the chunk that the
edit page's `page_client-reference-manifest.js` names in a `next build` of `22f3e58`, or a build with the notice line removed still
carries the text, in which case the control does not discriminate. Owner: QA Phase 2 (AC-2.6, with the plan's mechanism-removed tip
control, which the implementer's earlier-attempt build only approximates).

## Next Steps

- QA Phase 2 (M2 at `78c5f74`): AC-2.6, per the Assumption Not Checked above. AC-2.5's per-surface limbs come at M4 and M5.
- M3 round of this review: CR-4, and AC-2.1's second member `helpers/discordOracle.ts` against "calls the engine only with AN-3's
  literal masks" (it derives its mask from the package's `Syntax` enum).
- M5 implementer and this review's M5 round: CR-3.
- M4 round of this review: the link allow-list attack re-run against the rendered anchor (residue above).
