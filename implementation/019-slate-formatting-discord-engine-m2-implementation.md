---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: >-
  M2 coded and committed on chain/019-slate-formatting-discord-engine; code review round 1 REJECTED 22f3e58 (CR-1, CR-2); fix round 1
  committed at 78c5f74 and handed back. M3 in progress (own document when handed off).
Handoff-At: 7dcedc9 — repos=website — fix round 2 (QA Phase 2 QAF-29, QAF-30) over 78c5f74; fix round 1 was 78c5f74 over 22f3e58 (the M3 commits 805fff6 and 548b16b sit between them and touch no M2 file but add one test helper that names the engine, AC-2.1's second member; review by path over src/utils/markdown/engine.ts and its engine.* tests)
---

# Implementation 019 — M2: the engine and its adapter

## Plan Reference

`agent-output/planning/019-slate-formatting-discord-engine.md`, Revision 9 (record `47348a6d`), milestone M2 and the Rider R-A.
QA Phase 1: `qa/019-slate-formatting-discord-engine-qa.md` (record `26f3a3c`). Chain branch
`chain/019-slate-formatting-discord-engine`, base `5ec0621` (website `origin/master`). Start: effort rulings block
"2026-11-23T18:48Z — 9e released and closing; website tree to plan 019; implementation start".

## Date

2026-11-23 (UTC). Session `implementer-019`.

## Changelog

| Date | Handoff | Request | Summary |
|------|---------|---------|---------|
| 2026-11-23T18:48 | steering-hooks-fixer (brief `steering/019-brief-implementer.md`) | Implement M2 to M6 | Plan Status set to In Progress (R-23, record `123448ca`). Baseline at `5ec0621`, the pinned install and build, then M2: commits `1005eec` and `22f3e58`. |
| 2026-11-23T19:40 | qa-019 (message; QA record `0b00154b`, plan row R-26) | Fix round 2: QAF-29 MEDIUM, QAF-30 LOW | Fix commit `7dcedc9`. Section "Fix Round 2" below. |
| 2026-11-23T19:24 | code-reviewer-019 (message; review record `a8588f39`) | Fix round 1: CR-1, CR-2 | Fix commit `78c5f74`. Section "Fix Round 1" below. CR-3 carried to M5. CR-4 deferred to M3's oracle round (stated below). |
| 2026-11-23T19:06 | implementer-019 | Checkpoint | Session prefix at 289,182 tokens (`cc-usage.py sessions`), past the 225K seam threshold, after M2. Resumption State written. M3 to M6 are not started. |

## Implementation Summary

M2 adds `@discord/markdown-wasm` `0.16.0` (exact) and one adapter, `src/utils/markdown/engine.ts`, which is the only product module
that names the engine. It holds the six per-surface `Syntax` masks (AN-3, with AN-8 limb 2b's `GAME_MENTION` clearing), the kind
maps, the link scheme allow-list, the init state machine (pending, resolved, rejected; one wasm load and one failure line per
document), and the licence notice. `MarkdownProvider` starts the engine on mount and exposes its state through `useEngineState`.
Nothing yet renders from the engine: M4 (preview) and M5 (editor colouring) are the consumers. So M2 changes no visible behaviour.
It delivers the value statement's foundation (one engine under both views) and nothing beside it.

## Milestones Completed

M2, at `22f3e58`, with these parts deferred to the milestones that build their consumers (each is a reading of the plan, not a
deviation from it):
- **AC-2.5 on the six surfaces and `/preview`.** The adapter's three states, the once-per-load failure line and the provider's
  state are tested (rows below). The per-surface "formatted elements appear" and "source shows unformatted" limbs need a surface
  that renders from the engine, so they are owed at M4 (preview) and M5 (editor colouring). The human-observable form is UAT's (B-1).
- **The node-kind to renderer map and the token to leaf-role map hold their keys at M2 and their consumers at M4 and M5.** The
  conjunct-rule fixtures ("one fixture per entry in which that entry alone decides the rendered element") need the renderers.
  M2's map values are stated from the plan's vocabulary and AN-6's table (analysis `aafecf1`); M5 refines `url` and `whitespace`,
  which AN-6 makes context-dependent.
- **`MarkdownProvider` still exposes `simple-markdown`'s parsers.** The plan's end state (no `parseEmoji`, no `simple-markdown`
  parser) is reached at M6 (AC-6.6). At M2 the engine's state is added beside them.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start (steering's recorded start; QA Phase 1 at a SHA) | effort rulings block 18:48Z; QA document `Phase: 1`, record `26f3a3c` | the plan's Status `In Progress` (record `123448ca`) |
| No `OPEN QUESTION` open | plan: every one `[RESOLVED]` (steering's block 18:48Z records `grep -vc` 0) | n/a |
| Premise (`PREMISE-STALE`) | none marked on M2 | n/a |
| Base re-derivation (plan § Header notes, "Base") | below | n/a |
| Pinned build first (brief; hazard 3) | below, "Pinned install and build" | n/a |
| Rider R-A (`paracord`) | `package.json` and the lockfile importer entry | AC-2.7 row below |

### Base re-derivation

`git diff --stat af3d95a 5ec0621 -- src` lists four files and no more: `src/components/ImageUploader.tsx`,
`src/components/__tests__/ImageUploader.enter-scope.test.tsx`, `src/components/__tests__/ImageUploader.saved-address.test.tsx` and
`src/utils/hooks/useDialogEnter.ts` (448 insertions, 32 deletions). None is in the region or in P-4's list, so AC-3.4, AC-6.1,
AC-6.1b, P-4 and M4's path list are unchanged by the base move.

### Baseline at `5ec0621` (before any change)

| Run | Result | Capture |
|---|---|---|
| `pnpm install --frozen-lockfile` | exit 0, lockfile unchanged | `verification/019/impl/m0-install-5ec0621.{log,exit}` |
| `pnpm test` equivalent, offline (`unshare -rn`, `lo` up) | 2718 of 2718 passed, 173 `testResults` entries, exit 0 | `m0-suite-5ec0621-offline.{json,log.txt,exit}` |
| `pnpm run typecheck` | exit 2: the stale `.next/types/validator.ts` (`Cannot find module '../../src/pages/api/cron.js'`). The base program has that one error, the test program 0 | `m0-typecheck-5ec0621.{log,exit}`, `m0-tsc-base.log`, `m0-tsc-test.log` |

The stale-validator hazard applied to me. I did not delete it. `next build` regenerated it, and typecheck then exited 0
(`m2-typecheck-postbuild.log`). Counts: `numPassedTests` and `testResults.length` from the JSON summary (`node -e`).

### Pinned install and build (hazard 3)

- `pnpm add --save-exact @discord/markdown-wasm@0.16.0`, then Rider R-A, then `pnpm install --frozen-lockfile`: exit 0
  (`m2-add.log`, `m2-lockonly.log`, `m2-install-frozen.log`).
- `next build` (`SKIP_ENV_VALIDATION=1 pnpm run build`, Turbopack, with the adapter reachable from `MarkdownProvider`): exit 0, three
  builds (`m2-build-1.log` to `m2-build-3.log`). The wasm is emitted as `.next/static/media/discord_markdown_wasm_bg.*.wasm`.
  This reads the build form only. AN-1 (Chrome, Playwright Firefox, Vercel Preview) already measured that the wasm initialises and
  is served as `application/wasm`. M2 re-ran nothing in a browser. UAT's B-1 does.

## Files Modified

| Path | Changes |
|---|---|
| `package.json` | `@discord/markdown-wasm` `0.16.0` (exact) added; `paracord` moved from `devDependencies` to `dependencies` (R-A) |
| `pnpm-lock.yaml` | see "Lockfile disposition" |
| `src/providers/MarkdownProvider.tsx` | `useEngineState`; `startEngine()` on mount. `eslint --fix` also removed the redundant `<State>` type argument and reordered the imports |

## Files Created

| Path | Purpose |
|---|---|
| `src/utils/markdown/engine.ts` | The adapter (the only product module naming the engine) |
| `src/utils/markdown/__tests__/engine.surface-masks.test.ts` | AC-2.3: 6 literals and 186 cells |
| `src/utils/markdown/__tests__/engine.kind-maps.test.ts` | AC-2.4 (declared and observed enumerators); the unmapped-kind line |
| `src/utils/markdown/__tests__/engine.link-schemes.test.ts` | The allow-list both ways; the engine returns no link for the refused schemes |
| `src/utils/markdown/__tests__/engine.init-states.test.ts` | Init states, once-per-load start and failure line, the surface mask reaching the engine |
| `src/utils/markdown/__tests__/engine.notice.test.ts` | The licence notice is carried |
| `src/utils/markdown/__tests__/engine.import-confinement.test.ts` | AC-2.1: the instrument's controls, and the real-tree confinement |
| `src/utils/markdown/__tests__/helpers/importersOf.ts` | The import scan (TypeScript `preProcessFile`) |
| `src/providers/__tests__/MarkdownProvider.engine-state.test.tsx` | The provider starts the engine and shows its state |

## Patterns Extended

| Surface | Pattern extended |
|---|---|
| `engine.ts`'s pin | `package.json` exact pins (`"zod": "3.22.4"`, `"@vercel/functions": "3.11.3"`); plan 018 M2-b's lockfile disposition |
| `MarkdownProvider` | its own `useValue` effect (the lazy `~/utils/markdown` import is kept for the old parsers) |
| Tests | `src/**/__tests__/<module>.<behaviour>.test.ts[x]`; the DOM project's `createRoot` and `act`; the hoisted-mock form of `ImageUploader.*` tests |
| The import scan | none exists in the repo; `typescript` is already a direct dependency |

User-visible surfaces: M2 touches none. The provider starts a wasm fetch, and no surface reads it yet. No flow is put to the owner.

**Decision recorded (not a plan deviation).** `MarkdownProvider` imports `engine.ts` statically, so the adapter's glue (about 12 KB
raw, the wasm package's `discord_markdown_wasm.js`) is in the provider's chunk and not behind the lazy `~/utils/markdown` import.
The wasm itself is fetched at init, as in AN-1. The plan says the loading behaviour is "as today" (hidden until ready), which holds. If
the bytes matter, M4 can move the static import behind the existing lazy boundary. Code review reads this.

## TDD Compliance

Every row's first run is under `verification/019/impl/` (`m2-red-1.txt` to `m2-red-3.txt`; `m2-green-*.txt`). A module-absent red
stands for the first row of each new module only. Every further behaviour row's assertion-level red is its named mutant against the
committed code (below), run in the isolated export `exp-1005eec` (a `git archive` of `1005eec`, `node_modules` symlinked for
vitest only), by `m2-mutants.js` (output `m2-mutants-1005eec/`, `m2-mutants-1005eec.out`).

TDD Gate, as reported: `engine.surface-masks.test.ts`, `engine.kind-maps.test.ts`, `engine.link-schemes.test.ts`,
`engine.init-states.test.ts` and `engine.import-confinement.test.ts`'s real-tree case fail as expected: `Cannot find module
'../engine'` (and `AssertionError: expected [] to include 'src/utils/markdown/engine.ts'`). `MarkdownProvider.engine-state` fails with
`TypeError: useEngineState is not a function`. `engine.notice` fails with an assertion (`notice` undefined). Proceeding to implementation.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `SURFACE_MASKS` (six literals; the 186 cells) | `engine.surface-masks.test.ts` | Yes | Yes | ModuleNotFoundError (first row of the new module) | Yes |
| each mask constant, one per guard | same | Yes | Yes | assertion, M2-01 (title 0), M2-02, M2-03, M2-04, M2-05; NM-39 variants on description, V2 and field value (addenda) | Yes |
| `NODE_RENDERERS`, `TOKEN_LEAF_ROLES`, `EMOJI_KINDS`, `MENTION_KINDS`, `STATIC_MENTION_KINDS` | `engine.kind-maps.test.ts` | Yes | Yes | ModuleNotFoundError; then assertion, M2-07, M2-08, M2-09 | Yes |
| `nodeRenderer` (one warning per kind) | same | Yes | Yes | assertion, M2-14 (every call), M2-15 (never) | Yes |
| `isAllowedLinkUrl` | `engine.link-schemes.test.ts` | Yes | Yes | ModuleNotFoundError; then assertion, M2-17, M2-18, M2-19, M2-21; M2-20 survived and the test was tightened (below) | Yes |
| `startEngine` (one load, shared) | `engine.init-states.test.ts` | Yes | Yes | ModuleNotFoundError; then assertion, M2-10 | Yes |
| `startEngine`'s failure line (one per document, fixed reason) | same | Yes | Yes | assertion, M2-11 | Yes |
| `engineState`, `subscribeEngine` (settle on resolve and reject) | same | Yes | Yes | assertion, M2-12, M2-13 | Yes |
| `parseLossless(surface, …)` (the surface's own mask) | same | Yes | Yes | assertion, M2-06 | Yes |
| `startEngine.notice` | `engine.notice.test.ts` | Yes | Yes | AssertionError (`notice` undefined, `m2-red-3.txt`); M2-16 | Yes |
| `useEngineState`; `startEngine()` on mount | `MarkdownProvider.engine-state.test.tsx` | Yes | Yes | TypeError `useEngineState is not a function` (`m2-red-2.txt`); M2-22, M2-23 | Yes |
| `importersOf` | `engine.import-confinement.test.ts` | Yes | Yes | assertion, M2-24 (subpaths), M2-25 (skips `bot/`), M2-26 (does not skip `node_modules`) | Yes |

`python3 ~/.claude/tools/tdd-check.py` refuses TypeScript: the rows above are read by hand.

## Self-check sweep (isolated export of the tip)

The export is `exp-1005eec`. The sweep is the 26 named mutants of `m2-mutants.js`, one change each. Result: 25 killed, 1 survived.
It is the implementer's self-check and decides nothing QA's sweep decides. `node ~/.claude/tools/mutant-gen.js` was not run on
`22f3e58`; M3 to M6 will run it over the whole diff.

| Mutant | Result | Disposition |
|---|---|---|
| M2-01 to M2-19, M2-21 to M2-26 | KILLED, each by the file named in `m2-mutants-1005eec.out` | none owed |
| M2-20 (the allow-list as a leading-text regex) | SURVIVED | The tests only gave inputs the regex and the URL parse judge alike. Real difference: a browser parses `' https://a.b/'` (admitted) and refuses `'https:'`. Two rows added (`22f3e58`); the mutant is now killed (`m2-mutants-1005eec-addenda.txt`) |

Named mutants of QA's list, by the guard M2 builds:

| Line | Result |
|---|---|
| NM-3 (a title mask that keeps a link bit) | Built: M2-05 (the url variant takes the plain title's bits) and the 186 cells. KILLED |
| NM-4 (a no-markdown surface passes `0`) | Unplaced. `Surface` has six members, and footer and author have no member, so the adapter has no call that could pass `0`. The test `never hands the engine a mask of 0` stands over the six. M2-01 sets a mask to 0 and is killed |
| NM-5 (`DEV_LINKS` left on the content mask) | M2-04, KILLED |
| NM-6 (the ready state never flips) | M2-13, KILLED |
| NM-7 (the failure line per surface or per render) | M2-11, KILLED |
| NM-24 (the scheme allow-list removed) | M2-17, M2-21, KILLED |
| NM-29 (an unmapped kind renders nothing) | Not yet built: the renderer is M4's. The warning line is built (M2-14, M2-15) |
| NM-39 (`GAME_MENTION` flipped on one variant) | M2-02 (title keeps it), and by hand: description, V2 and field value each clear it. KILLED, 3 failed on each (`m2-mutants-1005eec-addenda.txt`) |
| NM-1, NM-2, NM-8 to NM-23, NM-25 to NM-28, NM-30 to NM-38, NM-40 to NM-47 | Not yet built: their guards belong to M3 to M6 |

## Class Sweep

The survivor M2-20 was a gap my own mutation exposed in first delivery. Its class: a link or scheme predicate that judges text
form where a browser parses a URL.

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| M2-20 | `git grep -nE "\.protocol\|startsWith\(['\"]https?\|/\^\(?https\?\|new URL\(" -- 'src/**/*.ts' 'src/**/*.tsx' ':!src/**/__tests__/**'` | 14 hits, in `verification/019/impl/m2-class-sweep-link-predicates.txt` | 12 are `new URL(...)` calls that build or read a URL, not a predicate over engine links (not applicable). `engine.ts:164` is the predicate itself, now URL-parsed and tested. `rules.tsx:473` is a comment inside the old `simple-markdown` rule set, which leaves at M6. `src/utils/isValidUrl.tsx:1` (`/^https?:\/\/[^ ]+\.[^ ]+$/`) validates user-entered URLs for fields and is outside the region: a follow-up, not fixed here |

Residual after the fix: the same command gives the same 14 hits, with no new predicate of the class.

## Test Execution Results

| Command | Result | Capture |
|---|---|---|
| `unshare -rn` (lo up) `npx vitest run --reporter=json`, tree at `1005eec` | 2962 of 2962 passed, 180 `testResults` entries, exit 0 (the base was 2718 and 173: 244 new cases, 7 new files) | `m2-suite-offline.{json,log.txt,exit}` |
| `npx vitest run src/utils/markdown src/providers/__tests__/MarkdownProvider.engine-state.test.tsx` | 275 passed (9 files) at `1005eec`; after `22f3e58` the link file has 25 | `m2-green-4.txt` |
| `pnpm run typecheck` | exit 0 (both programs) | `m2-typecheck-2.log` |
| `npx eslint` over the 9 new and changed files, `--max-warnings=0` | clean | (console) |
| `node ~/.claude/tools/comment-gate.js … --tests` | clean | (console) |
| `node ~/.claude/tools/convention-check.js website --since=5ec0621` | 10 files examined, 0 FAIL, 0 CANDIDATE, 20 SKIP. One SKIP says the id-token basename check did not run (the checker does not implement the workspace's class verbatim). **Unchecked by tool.** By hand: the nine new basenames are `engine.<behaviour>.test.ts[x]` and `MarkdownProvider.engine-state.test.tsx`; none holds an ID token | n/a |
| `SKIP_ENV_VALIDATION=1 pnpm run build` | exit 0 | `m2-build-3.log` |

After `22f3e58` (two rows in `engine.link-schemes.test.ts`), the link file ran 25 of 25 green. The whole suite was not re-run for that
one-file test change.

### AC-2.x readings

| Criterion | Result |
|---|---|
| AC-2.1 Confinement | `engine.import-confinement.test.ts`: the scan is exercised on a planted member of each import form and on non-members (string, comment, near-miss name, `node_modules`, `.next`), then on the real tree: the adapter is the sole importer now. The oracle helper is M3's. The instrument is TypeScript's `preProcessFile`; a dynamic import with a substituted template is reported as unresolvable, never read |
| AC-2.2 Pin | `package.json` names `0.16.0`, no range operator. The lockfile resolves `@discord/markdown-wasm@0.16.0` and `@discord/markdown-types@0.14.0`, each with an integrity hash. See "Lockfile disposition" |
| AC-2.3 Mask table | `engine.surface-masks.test.ts`: six literals, 186 cells, `DEV_LINKS` off, none zero |
| AC-2.4 Total maps | declared enumerator (16 node kinds, 21 token kinds, 2 emoji, 8 mention, 5 static-mention) and observed enumerator over nine input classes. Both pass. The observed set holds `document`, `paragraph`, `text` and `list_item` |
| AC-2.5 Init states | the adapter and the provider, as above. The per-surface limbs are owed at M4 and M5 |
| AC-2.6 Notice | after `next build`, the copyright line and the first sentence of the permission text are in five client chunks (`grep -rl` over `.next/static`), among them `3kwhcdtzorl5m.js`, which the editor page's `page_client-reference-manifest.js` names (`m2-ac26-build-3.txt`). **Control:** a first attempt put the notice on `parseLossless` while no module called it, and the build carried it in none of the chunks (the minifier removed it with the unused function), and a `/* @license */` comment was removed too. So the mechanism is shown to matter: the notice now rides `startEngine`, which the provider calls |
| AC-2.7 Rider R-A | `paracord` is in `dependencies` with the same specifier and absent from `devDependencies`. The importer entry moved with it. `pnpm install --frozen-lockfile` exits 0 in the tree. **In an export:** not run (see Outstanding) |

### Lockfile disposition

From `git diff 5ec0621 -- pnpm-lock.yaml` (`m2-add.log` and the diff in this document's commit):
- `+ '@discord/markdown-wasm'` importer entry (specifier `0.16.0`), and packages `@discord/markdown-wasm@0.16.0` and
  `@discord/markdown-types@0.14.0`, with integrity hashes. Intended.
- `paracord`'s importer entry moved from devDependencies to dependencies. Intended (R-A).
- `semver@7.8.6` gained `optional: true` in the snapshots section. **Not a version or integrity change.** pnpm recomputed the optional
  flag when it rewrote the lockfile; `semver@7.8.6` is reached only through optional dependencies in the resolved graph. It appeared
  with the first `pnpm add`, before the paracord move, so it is the lockfile's recompute and not R-A's effect. Disposition: accepted,
  stated here for the reviewer; no other pin moved.

## Outstanding Items

- **AC-2.7 in an export, and AC-2.6's mechanism-removed control build, were not run in an export.** The lockfile check ran in the
  shared tree (`pnpm install --frozen-lockfile`, exit 0), and the control is the earlier build where the notice was on an unused
  function. QA or the reviewer can run the export form.
- **`pnpm run typecheck` before the first build.** The stale `.next/types/validator.ts` makes it exit 2 until a build regenerates it
  (as the brief predicted). It is build output and was not deleted.
- **The id-token basename check did not run** (convention-check SKIP).
- **M2's maps are keys with values, not consumers.** A self-diagnosis at the level of method: AC-2.4 asks for total maps before any
  renderer exists, so the "one fixture per entry" test (QA's conjunct rule) cannot yet be written. I wrote the totality tests and
  left the entry-isolating fixtures to M4 and M5 rather than invent a consumer.
- **Pre-existing, outside the region, not fixed:** `src/utils/isValidUrl.tsx` validates by a leading-text regex (above). Severity LOW:
  it validates field input, not an engine link.
- **A mutation sweep with `mutant-gen.js` over the diff, and the `/preview` capture, are not done** at M2: there is no preview path
  on the engine yet.

## Next Steps

Code review of `22f3e58` (the normal route). M3 (the fuzzer and oracle) is next in the plan's order. Its entry conditions
include the plan's AN-4 locator and the lifted corpus (`research/closed/…` Appendix C, `verification/019/qa/link-inputs.json`).

## Fix Round 1 (code review `a8588f39`, over `22f3e58`)

Fix commit `78c5f74`. Both findings took the reviewer's **Preferred (structural)** form.

- **CR-2.** `parseLossless` returns `LosslessNode | undefined`, and `undefined` unless the adapter's state is `resolved`. The
  not-ready outcome is therefore one value in every runtime, and the browser's throw is unreachable. M4 and M5 must handle
  `undefined` (the consumer renders source text). `engine.kind-maps.test.ts` and `engine.link-schemes.test.ts` now `await startEngine()`
  in a `beforeAll`.
- **CR-1.** The routing case is `it.each` over all six surfaces with the six literals written in the test (not read from the adapter),
  and the renderer case is `it.each` over all 16 node kinds with a literal table.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `parseLossless` before ready (pending, in flight, rejected) on the real engine | `engine.not-ready.test.ts` | Yes | Yes | assertion: `expected { kind: { type: 'document' }, … } to be undefined` ×3 (`verification/019/impl/m2fix-red-1.txt`) | Yes |
| `parseLossless` once resolved returns the document | same | Yes | Yes (mutants CR2-parse-without-state-check and CR2-…-after-reject keep it; the case is the control's positive limb) | n/a: passes before and after, it pins the resolved limb | Yes |
| `parseLossless` routing, six surfaces | `engine.init-states.test.ts` | Yes | Yes | assertion, CR-probe-route-constant (4 of 6 cases fail), CR-probe-route-content (embedTitle, fieldValue fail) | Yes |
| `nodeRenderer` per kind, 16 kinds | `engine.kind-maps.test.ts` | Yes | Yes | assertion, CR-probe-renderer-constant (every kind but `link` fails) | Yes |

Mutation re-run (`mutation-run.py`, each mutant in its own `git archive` export of `78c5f74`, suite `npx vitest run --project node
src/utils/markdown`): 5 of 5 KILLED, each on the routing or not-ready case itself, by an assertion and not a timeout
(`m2fix-mutants-78c5f74.json`, `m2fix-mutants-78c5f74.runner.txt`, `m2fix-mutants-78c5f74-out/`). The reviewer's anchors named
`return parseWasm(text, SURFACE_MASKS[surface]);`, which CR-2 changed, so the three CR probes are re-anchored to the same one-token change
on the new line, and two mutants for the new guard are added (the state check removed; the check weakened to `!== 'rejected'`).

### Class sweep

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| CR-1 | the reviewer's: `git grep -nE "\[[A-Za-z]+( as [A-Za-z]+)?\]" 78c5f74 -- src/utils/markdown/engine.ts` | 3 hits (`m2fix-class-sweep-78c5f74.txt`): `:9` the `LosslessChild` type index; `:148` `SURFACE_MASKS[surface]`; `:152` `NODE_RENDERERS[kind as NodeKind]` | `:9` not applicable (a type). `:148` and `:152` are covered by the table-driven cases over every key, killed by the three routing mutants. Residual after the fix: the same 3 hits, none covered by a single-key case |
| CR-2 | the reviewer's: `git grep -n "parseWasm(" 78c5f74 -- src` | 1 call site (`engine.ts`), the guarded one | Fixed. No second entry point exists |

CR-1's class also reaches the adapter's other keyed values: `isAllowedLinkUrl` is membership in a set tested with 25 cases over every
listed scheme, `TOKEN_LEAF_ROLES` is keys-only by AC-2.4 and is CR-3 (carried to M5, where the leaf role becomes one function of token
and context with AN-6's table as its literal test).

### Results

`unshare -rn` (lo up) `npx vitest run --project node --project dom --reporter=json`, tree at `78c5f74`: 3026 of 3026 passed, 185
`testResults` entries, exit 0 (`m2fix-suite-78c5f74-offline.{json,log.txt,exit}`). The 64 cases above the M2 hand-off's 2962 are M3's
first three parts (project form, lifted inputs, generator, normaliser) and this round. `pnpm run typecheck` exit 0.
`convention-check.js website --since=548b16b`: 0 FAIL, 0 CANDIDATE.

CR-4 (optional): not done this round. The AST walk for non-literal `import(...)` and `require(...)` lands with M3's oracle helper, which
becomes AC-2.1's second member (the real-tree confinement case already admits it: `helpers/discordOracle.ts`).

## Fix Round 2 (QA Phase 2 `0b00154b`, over `78c5f74`)

Fix commit `7dcedc9`.

- **QAF-29.** `engine.ts` gains `MODIFIER_KINDS` (five entries, `satisfies Record<ModifierKind, string>`) and `modifierStyle(kind)`, which
  returns the style or writes `markdown-engine-unmapped-kind kind=modifier.<kind> version=0.16.0` once per kind per document. It shares
  `warnUnmapped` with `nodeRenderer`, so the once-per-kind set is one. Values equal keys for now; M4 and M5 give them their meaning.
  `engine.kind-maps.test.ts` holds: a declared check against the literal five; an observed check that collects the `modifier` node kinds and the
  `delimiter` token kinds over the input classes, requires each in the map and requires the observed set to be exactly the five; five mapped
  cases with literal styles; and the unmapped case.
- **QAF-30.** `engine.surface-masks.test.ts` compares its `BITS` table with the pinned package's single-bit `Syntax` members by name and
  value, through `PINNED_SINGLE_BIT_SYNTAX` in the one engine-naming test helper (`helpers/discordOracle.ts`; AC-2.1 holds).

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `MODIFIER_KINDS` (declared, observed) | `engine.kind-maps.test.ts` | Yes | Yes | TypeError (the export absent, `m2fix2-red-1.txt`; first row for the symbol); then assertion, QAF29-spoiler-entry-removed and QAF29-underline-entry-removed | Yes |
| `modifierStyle` (five styles, one warning per kind) | same | Yes | Yes | TypeError (`modifierStyle is not a function`); then assertion, QAF29-unmapped-modifier-silent, -warns-every-call, -wrong-entry | Yes |
| `BITS` against the pinned package | `engine.surface-masks.test.ts` | Yes | Yes | assertion, QAF30-bit-value-changed (KILLED). QAF30-bit-removed was recorded **ABORTED** by the runner because the case count fell with the removed table row (`count: mismatch`); the case itself fails on the comparison | Yes |

Mutants: `m2fix2-mutants-7dcedc9.json`, `.runner.txt`, `-out/` (through `mutation-run.py`, isolated exports): 6 of 6 KILLED, 1 ABORTED as above.

Class sweep (QAF-29: a union nested in the types the adapter does not map):

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| QAF-29 | `grep -nE '^export type [A-Za-z]+ =\|^\s+\| "[a-z_]+"$\|Node<"[a-z_]+", "' node_modules/.pnpm/@discord+markdown-types@0.14.0/node_modules/@discord/markdown-types/index.d.ts`, then the nested payload unions read by `grep -nE '"line" \| "rest"\|LinkKind =\|ordered\|ModifierKind ='` | 46 lines (`m2fix2-class-sweep-7dcedc9.txt`); five nested payload unions: `ModifierKind` (5), `LinkKind` (4: detected, auto, contact, masked), quote `line` or `rest`, list `ordered` or `unordered`, `heading.level` | `ModifierKind`: fixed. The other four are payload variants of one node kind each (`link`, `quote`, `list`, `heading`), read by that kind's renderer, which is M4's; AC-2.4 asks for no map over them. They are named here so the M4 round maps each with a literal table and the same unmapped-kind line if the renderer branches on them. Not mapped at M2 |

Results: `unshare -rn` (lo up) `npx vitest run --project node --project dom --reporter=json`, tree at `7dcedc9`: 3041 of 3041 passed, 186 `testResults` entries,
exit 0 (`m2fix2-suite-7dcedc9-offline.{json,log.txt,exit}`). `pnpm run typecheck` exit 0. `convention-check.js website --since=1bcab7a`: 0 FAIL, 0 CANDIDATE.

## Resumption State

Written 2026-11-23 at the end of M2, for a `/clear`.

- **Done.** Plan Status `In Progress`. Baseline recorded. M2 committed: `1005eec` (adapter, tests, provider, pin, R-A) and `22f3e58`
  (two link rows). Self-check sweep recorded. This document is the M2 delivery.
- **Branch and HEAD.** `chain/019-slate-formatting-discord-engine` at `22f3e58`. The tree holds only the foreign
  `?? .playwright-mcp/`. `.next/` holds the build output of the last build and is ignored by git.
- **Next.** M3, then M4 to M6 on the plan's order (M3's `pnpm test:discord` and its vitest projects `discord-node` and
  `discord-dom`; the legacy oracle runner, AN-4; the normaliser; the seeded generator). Before code on M4, M5 or M6, send
  `steering-hooks-fixer` the flows that hold a decision (brief). Run `node ~/.claude/tools/convention-check.js website
  --since=5ec0621` before each hand-off.
- **Approach in flight.** None. No uncommitted work in the website tree.
- **Local state not restored.** None. The scratch export `exp-1005eec` was deleted (its `node_modules` was a symlink; the shared tree's is intact). No process of mine is running.
- **Evidence run but not recorded.** None: every capture is under `verification/019/impl/` (to be committed with this document).
- **Questions sent, and to whom.** None.
- **Cache-warm wake.** Armed at 18:49 (job `af676f9b`); deleted at this checkpoint.
