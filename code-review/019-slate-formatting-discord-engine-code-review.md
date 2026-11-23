---
ID: 019
Origin: 019
UUID: 286c730a
Reviewed-At: "22f3e58 — repos=website; M2 only, the chain branch's commit at the implementation document's Handoff-At"
Status: In Review
Round: 1
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

CR-1 MEDIUM Round 1
- **Category**: Checks That Cannot Fail (severity floor)
- **Title**: The adapter's two keyed lookups are each asserted on one key, so a lookup that always gives that key's answer passes
- **Location**: `src/utils/markdown/engine.ts` `parseLossless` and `nodeRenderer`. Tests: `engine.init-states.test.ts` "parses a
  surface under that surface's mask" and `engine.kind-maps.test.ts` "gives a mapped kind its renderer without a warning", at
  `22f3e58`.
- **Class**: A selection by key whose test asks for a single key cannot tell the selection apart from a constant. The behaviour the
  adapter relies on, "each surface reaches the engine with its own mask" and "each mapped kind gets its own renderer", then has no
  assertion that fails when it is lost.
- **Enumeration**: `git grep -nE "\[[A-Za-z]+( as [A-Za-z]+)?\]" 22f3e58 -- src/utils/markdown/engine.ts` gives 3 hits:
  - `parseLossless`'s `SURFACE_MASKS[surface]`, a member;
  - `nodeRenderer`'s `NODE_RENDERERS[kind as NodeKind]`, a member;
  - the `LosslessChild` type index, not a value lookup.
  The predicate does not match a lookup written as `.get(key)`, a `switch`, or a lookup in another module. For `engine.ts` all three
  are absent by read, and the adapter is the only module that holds these tables (AC-2.1).
- **Issue**: Mutants run on `22f3e58` (`m2-mutants-cr-out/`):
  - `CR-probe-route-content` makes every surface except `embedTitleWithUrl` parse under the content mask. It **SURVIVED** all 280
    cases. The title would then parse a game mention that AN-8 limb 2b says Discord's legacy formatter does not, and the field value
    would lose its own mask.
  - `CR-probe-renderer-constant` makes every mapped kind get `link`'s renderer. It **SURVIVED**.
  - `CR-probe-route-constant` puts every surface on the `embedTitleWithUrl` mask. It was KILLED, but only by the kind-maps and
    link-scheme cases, whose `content` parse lost its link bits. The routing case itself passed.

  AC-2.3's literals reach the engine only through this routing, and M4 and M5 will consume `nodeRenderer`. So both behaviours are
  relied on, and the severity floor applies: this finding holds the hand-off to QA. The implementation document reports M2-06 as
  killing a routing mutant. Its mutant form (the selected mask changed for the tested surface) is the one form a single-key case
  does catch.
- **Required Action**:
  - **Preferred (structural)**: make both routing tests table-driven over every key: `it.each` over the six surfaces and over the
    16 node kinds. Each expected value is a literal written in the test, independent of the adapter. For the masks, the literals
    are the `EXPECTED` table already in `engine.surface-masks.test.ts` (AN-3/QA-derived), never `engine.SURFACE_MASKS[...]`. For
    the renderers, write a literal table.
  - **Minimum**: each routing case asks for at least two keys whose answers differ. The asked key must be neither the first nor the
    last key of its table in declaration order, so neither a fixed first-key nor a fixed last-key answer passes.
  - **Falsity signature**: with each of `CR-probe-route-content`, `CR-probe-route-constant` and `CR-probe-renderer-constant`
    applied, the rewritten routing case itself fails on an assertion (`toHaveBeenCalledWith` or `toBe` mismatch), not on a timeout
    and not only through a neighbouring case. The fix round re-runs `m2-mutants-cr.json` and `m2-mutants-cr-2.json` through
    `mutation-run.py` and records each kill's `failing_titles`.
  - **Callers**: both functions have no product caller at `22f3e58`. The remedy is test-only and changes no caller.

CR-2 MEDIUM Round 1
- **Category**: Architecture alignment / error handling
- **Title**: Before the engine is ready, `parseLossless` parses under Node and throws in a browser, and the adapter passes that
  difference to every consumer
- **Location**: `src/utils/markdown/engine.ts` `parseLossless` at `22f3e58`, over `@discord/markdown-wasm@0.16.0`
  `src/parse.js:ensureReady`.
- **Class**: An adapter entry point whose behaviour in the not-ready states (pending, rejected) depends on the runtime. The test
  runtime then cannot see the outcome the browser produces.
- **Enumeration**: There is one value entry point into the engine, `engine.ts` `parseLossless`
  (`git grep -n "parseWasm(" 22f3e58 -- src` gives 1 hit outside the import line). It is the "one `parseLossless` call that the
  preview, the colouring and the emoji lift all read" (plan M2). The predicate does not see a future second entry point that
  imports `parse` (non-lossless), which AC-2.1's confinement would surface as a change to the adapter.
- **Issue**: The package's `ensureReady` compiles the wasm synchronously when `#compile-module-sync` resolves to its `node` file.
  Otherwise it throws `@discord/markdown-wasm is not initialised. Await init() once before parsing…`. Evidence:
  - **Node (run):** `m2-parse-before-init-node.out` shows a parse of `**a**` with no `init()` returning a document.
  - **Browser (read only, not run):** the `default` `compile-module-sync.js` returns `null`, so `ensureReady` throws.
  - **vitest (read):** both of the site's projects, `node` and `dom` (jsdom), run under Node and inline no dependencies
    (`vitest.config.ts` at `22f3e58`). So, read but not run, both resolve the `node` condition.

  Consequences:
  - In the suite, a consumer that parses while the adapter's state is `pending` or `rejected` gets a formatted tree. In Chrome it
    gets a thrown error, and a render that throws does not show "every source character unformatted" (AC-2.5 rejected limb).
  - The fault is invisible to every M4, M5 and M6 test that uses the real engine. `engine.kind-maps.test.ts` and
    `engine.link-schemes.test.ts` already call `parseLossless` with no `startEngine()`, and they pass only because of the Node
    self-init.
  - The adapter is the one module that names the engine. It is the one place where the not-ready outcome can be made the same
    in every runtime.
- **Required Action**:
  - **Preferred (structural)**: `parseLossless` reads the adapter's own `state`. Unless it is `resolved`, it returns one stated
    not-ready outcome, the same in every runtime, without calling the engine. For example, `undefined` (the consumer renders source
    text) or a plain-text document; the implementer picks one and states it in the adapter's type. The browser's throw is then
    unreachable, and the "unformatted when not ready" contract is a typed value M4 and M5 must handle.
  - **Minimum**: none weaker is acceptable. A consumer-side check on `useEngineState` at each M4 and M5 call site leaves the class
    representable at every new caller.
  - **Callers under the preferred form**:
    - product callers: none at `22f3e58`;
    - `engine.kind-maps.test.ts` (`observedKinds`) and `engine.link-schemes.test.ts` (`linkUrls`) must `await startEngine()` first.
      That is the remedy's cost, and it makes them state the precondition they now get for free;
    - `engine.init-states.test.ts` "parses a surface…" already awaits `startEngine()` and is unchanged.
  - **Falsity signature**: with the real engine and `startEngine()` never called (state `pending`), and again with `init` rejected,
    `parseLossless('content', '**a**')` returns the not-ready outcome. The case fails on an assertion at `22f3e58`, where it returns
    a formatted document.

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

## Verdict

**Status**: REJECTED
**Rationale**:
- CR-1 is a severity-floor finding. The adapter relies on per-surface mask routing and per-kind renderer lookup, and a
  constant-answer mutant of each survives the whole M2 suite. Under the floor it blocks hand-off to QA.
- CR-2 is a contract defect in the one module that owns the engine. It is cheapest to fix now, before M4, M5 and M6 build three
  consumers on a parse that behaves differently under test.

Otherwise M2 is sound:
- the masks equal their independent literals on all 186 cells;
- the pin and lockfile are as dispositioned;
- R-A installs frozen in an export;
- the link allow-list held against 4,834 payloads;
- the init state machine's tests are discriminating (M2-10 to M2-13);
- the comment and naming conventions are clean.

## Required Actions

1. CR-1: make the routing tests for `parseLossless` and `nodeRenderer` cover every key, with literal expected values. Re-run the
   three probes and record each kill on the routing case itself.
2. CR-2: `parseLossless` returns one stated not-ready outcome unless the state is `resolved`. Add a real-engine test for pending and
   for rejected. The two tests that parse without `startEngine()` await it.
3. Optional in this round: CR-4. CR-3 is carried to M5 and is not owed now.

The re-verification is a sub-entry of Round 1, scoped to the fix diff: the sweeps above re-run, and the probes re-run against the
fixed SHA.

## Assumption Not Checked

Round 1: This review assumes the minifier keeps `startEngine.notice` in the editor page's client chunk at `22f3e58` (AC-2.6), and
does not test it. I built nothing. Falsity signature: `grep -c 'Copyright 2025 Discord, Inc.'` returns 0 over the chunk that the
edit page's `page_client-reference-manifest.js` names in a `next build` of `22f3e58`, or a build with the notice line removed still
carries the text, in which case the control does not discriminate. Owner: QA Phase 2 (AC-2.6, with the plan's mechanism-removed tip
control, which the implementer's earlier-attempt build only approximates).

## Next Steps

- Implementer: CR-1 and CR-2, then a fix hand-off for this document's Round 1 sub-entry.
- QA Phase 2 (after approval): AC-2.6 per the Assumption Not Checked above, and AC-2.5's per-surface limbs at M4 and M5.
- M5 implementer and this review's M5 round: CR-3.
- M4 round of this review: the link-allow-list attack re-run against the rendered anchor (residue above).
