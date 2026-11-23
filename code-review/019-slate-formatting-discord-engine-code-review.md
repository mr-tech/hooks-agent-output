---
ID: 019
Origin: 019
UUID: 286c730a
Reviewed-At: "f4060c5 — repos=website; Round 3 is M3 at f4060c5 (every M3 path in 22f3e58..f4060c5); M2 closed at Round 2, 7dcedc9"
Status: In Review
Round: 3
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
| `pnpm install --frozen-lockfile` in a scratch clone of `7dcedc9` | exit 0 | `m2r2-install-frozen-7dcedc9.log` |
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
--frozen-lockfile`, exit 0, `m3-install-frozen-f4060c5.log`).

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

CR-5 MEDIUM Round 3
- **Category**: Checks That Cannot Fail
- **Title**: The generator writes a game mention in the form AN-8 withdrew, so no input in any class exercises `GAME_MENTION`
- **Location**: `src/utils/markdown/__tests__/helpers/markdownGenerator.ts` `MENTIONS` (the `GAME_MENTION` piece);
  `markdownGenerator.seeded-inputs.test.ts` `NEEDLES.GAME_MENTION` and the needle list; `discordReports` coverage cells, at `f4060c5`.
- **Class**: An input-class construct written from a superseded premise. The input carries the bit's tag but not the bit's
  construct, so a criterion's coverage of that bit is zero while the generator's own test passes.
- **Enumeration**:
  - **Run:** the removal test over the generator's first 200 inputs (`m3-generator-bit-tags.out`) finds, in the catalogue, one
    construct tag that is dead and not by design: `GAME_MENTION` on `<game:id>`.
  - **Implementer's count:** the coverage report finds 7 zero cells (Findings 5): `GAME_MENTION` on all six surfaces, and
    `CODE_BLOCK` on `embedTitle`. The latter is legitimate, because the title mask clears the bit.
  - **Corpus:** 0 inputs hold `<@$` (`grep -c '<@\$'` over `discordCorpus.json`).
  - **Blind spot:** the predicate does not see a construct whose form is right but which is always swallowed by its context, such
    as one only ever generated inside code. It also does not run on the 106 link inputs.
- **Issue**:
  - AN-8 limb 2 established the game mention's written form as `<@$<id>>`, and showed that `<game:id>` "stay[s] text" (analysis,
    § Findings, limb 2). M2's `engine.kind-maps.test.ts` already uses `<@$4>`.
  - The generator kept the research's withdrawn guess, and its test transcribes the same premise (`/<game:\d+>/`). The test checks
    the generator against itself, not against the parser.
  - Consequences: AC-3.7 and the residue measurement (Findings 4, which M4 starts from) contain no game mention on any surface.
    That includes the description, field value and V2 surfaces, where AN-8 limb 2b says legacy draws a pill. It also includes the
    title and field-name masks, whose one distinguishing bit from AN-3 is exactly `GAME_MENTION`. The coverage report calls the
    cell unexamined and gives the withdrawn form as the reason.
- **Required Action**:
  - **Preferred (structural)**: the coverage report fails the run on a zero cell for a bit that the surface's literal mask carries.
    It names cells whose bit the mask clears as "masked off", the way `CODE_BLOCK` on `embedTitle` already is. A construct then
    cannot silently fall out of coverage.
  - **Minimum**:
    - The generator writes `<@$<id>>` for `GAME_MENTION`, and keeps `<game:id>` as an untagged near-miss.
    - The generator test's needle comes from AN-8's form, not from the generator.
    - The residue measurement (Findings 4) is re-run, and the M3 document's counts are updated.
  - **Falsity signature**: at `f4060c5`, a report-form case asserting that no carried bit has a zero cell fails by assertion on
    `GAME_MENTION` × content. After the fix it passes, and a planted generator that drops the game-mention piece makes it fail
    again.

CR-6 MEDIUM Round 3
- **Category**: Architecture / test isolation
- **Title**: The oracle window refuses `fetch` but keeps jsdom's live `XMLHttpRequest` and `WebSocket`, so Discord's evaluated code
  can reach the network during `pnpm test:discord`
- **Location**: `src/utils/markdown/__tests__/helpers/discordBuild.ts` `installShims` and `loadBuild` at `f4060c5`.
- **Class**: A sandbox shim that closes one network API of the window and leaves others live. The oracle's output can then depend
  on live server responses as well as the served build, and the window can send requests that no test intends.
- **Enumeration**: the window's network-capable globals at jsdom 30.0.1, by probe (`m3-oracle-window-network.out`):
  - `fetch`: refused, except the pinned wasm;
  - `XMLHttpRequest`: **live**;
  - `WebSocket`: **live**;
  - `EventSource` and `navigator.sendBeacon`: absent.
  - Subresource loading (`<img>`, `<script src>`, `<link>`) is off by jsdom's default `resources` option and is not set by `loadBuild`.
  - The predicate does not cover a network path reached through a host-realm object the shims hand in (`crypto`, `WebAssembly`,
    `TextEncoder`). jsdom is not a security sandbox, and D-4 accepts running Discord's code in tests.
- **Issue**:
  - The shim's refusal message says "oracle: network disabled", and the plan's model is that the expected values come from the
    fetched build alone.
  - At `f4060c5`, any XHR or WebSocket that Discord's evaluated modules open goes to the network. That includes the facade's
    dependencies, the boxes, and the lazy chunks `loadLazyChunks` evaluates.
  - Whether they do is an **unmeasured hypothesis**. The probe shows the channel is open, not that Discord's code uses it. If any
    module does (experiments, telemetry, the gateway), the oracle's values and its request footprint depend on Discord's servers
    and not on the build.
- **Required Action**:
  - **Preferred (structural)**: `installShims` replaces every network-capable constructor in the window (`XMLHttpRequest`,
    `WebSocket`, and `EventSource` and `sendBeacon` should a jsdom upgrade add them) with one that records the attempted URL and
    throws. The `Oracle` exposes the recorded attempts, and the live controls assert that the list is empty, or name its members
    as known.
  - **Minimum**: the same replacement for `XMLHttpRequest` and `WebSocket`.
  - **Falsity signature**: an offline case that builds the window through `loadBuild`, and attempts XHR and WebSocket to a loopback
    listener from inside it. At `f4060c5` it fails by assertion: the listener saw `POST /xhr` and `UPGRADE /ws`. After the fix the
    listener sees nothing and the attempts are recorded. `m3-oracle-window-network.mjs` is the instrument to adapt.

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

## Verdict

**Status**: REJECTED (Round 3, M3 at `f4060c5`). M2 stays APPROVED_WITH_COMMENTS at `7dcedc9` (Round 2).
**Rationale**: in Round 3 above. CR-5 and CR-6 are cheap to fix and change what M4 starts from.

## Required Actions

Round 3, for the M3 fix round:
1. CR-5: the generator's game mention takes AN-8's form, and the coverage report fails on a zero cell for a bit the surface's mask
   carries (preferred). Re-run the residue measurement.
2. CR-6: close `XMLHttpRequest` and `WebSocket` in the oracle window, with a recording refusal and an offline loopback case.
3. Optional in the same round: CR-4's remainder, CR-7's split and re-keying, CR-8 and CR-9. CR-7's M6 deletion is the planner's to
   register.

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

## Next Steps

- Implementer: the M3 fix round for CR-5 and CR-6 (optionally CR-4, CR-7, CR-8 and CR-9), then a hand-off for Round 3's sub-entry.
- Planner (`planner-019`): CR-7's deletion of the three hold-outs as an M6 exit condition, a Planner batch row under the M6 cap.
- QA Phase 2 on M3, after approval: the live command and its reports (Round 3's Assumption Not Checked); the AC-3.4 product-function
  mutations (Outstanding 5); the `beforeinput` paste branch (Outstanding 7, or UAT).
- M4 round of this review: the link allow-list attack re-run against the rendered anchor, and Round 2's Assumption Not Checked.
- M5 implementer and this review's M5 round: CR-3.
