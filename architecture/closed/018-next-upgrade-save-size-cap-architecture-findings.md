---
ID: 018
Origin: 018
UUID: 6273a762
Status: Resolved
Status-Detail: "Closing pass on plan revision 8 (record 2dc79a3) and website 969d92a: APPROVED, no finding. AF-1 to AF-4 and AF-8 to AF-11 are resolved; AF-5 to AF-7 and AF-12 are Problem Areas in system-architecture.md. Open items 1, 2 and 4 are discharged. Item 3's R3 is carried by handoff/018-m4-r3-navigation-limit-to-architecture-record-2026-11-20.md. The zod pin commit after 969d92a was not read by this pass."
---

# Architecture Findings — Plan 018: Next.js 16.4.6 and the save-list cap (conformance pass)

## Changelog

| Date | Event | Summary |
|---|---|---|
| 2026-11-20T03:39 | Conformance pass, plan rev 1 (record `c2a6b85`), briefed by steering-roadmap-hooks (`steering/018-brief-architect.md`). Rulings read: `steering/018-rulings.md` block 2026-11-20T03:25Z. | Every concrete form the plan writes was read against website `origin/master` `7923a1d` (`git show`; nothing run in the shared tree). The length-first cap was run against the real save schema in a scratch copy (`verification/018/architect-conformance/`). Two changes are required (AF-1, AF-2), two are recommended (AF-3, AF-4), two Problem Areas are registered (AF-5, AF-6), and the forms in "Conforming forms" conform. The master document's direct-`sharp` line is reconciled (the `INBOX.md` entry of `devops-hooks-fix-message-page-header-decode`). **APPROVED_WITH_CHANGES.** |
| 2026-11-20T04:08 | Delta read, plan rev 2 (record `7a1bd46`; diff `c2a6b85..7a1bd46`), on the planner's word (`planner-hooks-018`, by message). | AF-1 to AF-4 are folded and retired to disposition lines. The cap moved from a dirty pipe to a fatal length issue that aborts the parse. Its mechanism was re-read in zod 3.22.4 source, and the planner's run was read (`abort-form-probe/`: `export.diff`, `README.md`, `table.md`, `typecheck.log`). AF-2's claim that `sumDisplayableText` "takes no harm" over raw elements was wrong, and this architect corrects it in place (QAF-1 found the `null` throw). The other forms of the delta conform: the M1-a to M1-h restatements, M4's enumerated class, and M5 under OQ-5's recommended option. AF-7 INFO registers the editor's reason-less Save toast (X-18) as a Problem Area. **APPROVED.** |
| 2026-11-20T04:16 | Delta read, plan rev 3 (record `428090e`; diff `7a1bd46..428090e`), on the planner's word. His D-8 to D-10 read in the plan's register. | M5 under D-8 conforms; it is the form this pass read at revision 2. R7 leaving M4's class is accepted (no consumer, 015 D30). M1-i (D-9) leaves its wiring to the implementer. tRPC 11.10 calls the schema's `parseAsync(value)` with no parse options (`getParseFn`), so a contextual error map cannot be passed to the procedures' parse as they are built today. The route that needs no new form, zod's global `setErrorMap`, puts one counter under every parse in the process. AF-8 MEDIUM asks M1-i to state the wiring's constraints. A per-call wrapper meeting them was run through a real tRPC caller (`verification/018/architect-conformance/error-cap-wiring/`). The premise that the error map sees every issue holds: zod 3.22.4's `makeIssue` runs each map for every issue, explicit messages included. **APPROVED_WITH_CHANGES.** Process fact: the stamp gate refused this row's first write, which carried a typed, future-dated minute; it was rewritten with the `date -u` minute. |
| 2026-11-20T04:27 | Delta read, plan rev 4 (record `29277d3`; diff `428090e..29277d3`), on the planner's word. Runs read: `verification/018/planning/union-cap-probe/` (`README.md`, `isolated-union.diff`) and `strip-cap-probe/` (by the plan's account). | AF-8 is folded as asked, and adds two constraints that are stricter than AF-8: the stopping parse is synchronous, and a stopped parse leaves no unhandled rejection. M1-i now counts issues as they appear in the result. The plan's illustrative way of reaching that is to parse the three plain-union sites outside the caller's error map, which works: created issues equal returned issues on all 50 rows, and nothing else moves. Keeping each issue to `code`, `path` and `message` matches the only reader, `formatMutationError` with zod-error. Choosing z.enum or `z.discriminatedUnion` at those sites was considered and not preferred. Both change a refused line that M1-b holds fixed, and z.enum's message carries the received value, which reopens QAF-8. AF-9 LOW recommends one shared, honestly typed union helper, and the record will carry its rule for future unions. **APPROVED.** |
| 2026-11-20T04:31 | Delta read, plan rev 5 (record `e45e8cf`; diff `29277d3..e45e8cf`), on the planner's word. | AF-9 is folded as asked: in M1-i *wiring*, one union-isolation helper in `shapes.ts`, used at all three sites, declared as `z.ZodType<…>` of the union's output and input. The rest of the delta is wording, and none of it changes a form: F-19's unit (the M1 parse's own uncapped result), F-20, and QAF-9's added long-value position (`textDisplayShape.type` inside a section). No finding. **APPROVED.** |
| 2026-11-20T05:13 | Delta read, plan rev 6 (record `8277b08`; diff `e45e8cf..8277b08`, M2's `tsconfig.json` keys), on the planner's word. Run read: `verification/018/planning/m2-tsconfig/`. | Two of the three keys conform. `moduleResolution` `bundler` is Next 16.4.6's mandatory rewrite. `ts-node` `moduleResolution` `node` keeps `website.md` A-4's import check runnable. The third key, a `paths` entry mapping the package name `highlight.js` to its `.d.ts`, was built in an isolated export (`verification/018/architect-conformance/hljs-paths/`). Turbopack applies tsconfig `paths` to runtime imports, so `hljs` compiles to `(void 0)`, and the bundle carries no highlight.js code where the base build carries it. AF-10 HIGH. **REQUEST REVISION** on M2. |
| 2026-11-20T05:21 | Delta read, plan rev 7 (record `af8a9d6`; diff `8277b08..af8a9d6`), on the planner's word. Runs read: `m2-tsconfig/A-final/counts.txt` and `hl-compare/` (`compare.cjs`, `output.txt`). | AF-10 is folded as recommended: no `paths` entry, highlight.js 11.12.0 under D-6, the M2-c bundle limb (form A counts 1 static and 4 server files with highlight.js runtime) and the M2-e walk. The two `tsconfig.json` keys conform. AF-11 LOW: the plan's account of what the bump changes cites the tree's structure (18 of 18) and the preview's HTML (4 of 18). It omits the comparison's own count that the editor's token tree differs in 5 of 18, one of them (`html`) in the editor only. AF-12 INFO registers the editor's reliance on highlight.js's private `_emitter`. **APPROVED.** |
| 2026-11-20T05:50 | Carried results, by steering's message: M4 R6 (`implementation/018-next-upgrade-save-size-cap-m4-implementation.md`, `9774815`) and the M2 build's Edge Runtime warning (the M2 implementation document). Steering's M2 cap (`steering/018-rulings.md` block 05:26Z) was read: a further M2 gap below HIGH goes to the Planner batch as a stated limit. | R6 was re-derived from the installed sources. At both 16.1.6 and 16.4.6 the previous page is kept hidden in one `<Activity>` entry (`MAX_BF_CACHE_ENTRIES` 1 without `cacheComponents`). The browser key for a dynamic segment is `name\|value\|type` at both: at 16.4.6 `create-segment-key.browser.js` returns `createRouterCacheKey`, and only the server variant drops the value. The implementer's withdrawal of its earlier "new at 16.4.6" note is correct. Landed in the master document's Components. The Edge Runtime warning is new at 16.4.6 (`grep -rl` over `dist/build`: 0 files at 16.1.6, 2 at 16.4.6). It is registered as a Problem Area with its version scope; it is not a plan finding. R3 waits for UAT's walk (open item 3). |
| 2026-11-20T06:12 | Closing pass, plan rev 8 (record `2dc79a3`; diff `af8a9d6..2dc79a3`, the Planner batch fold; critique `5b145f0` APPROVED), briefed by steering-roadmap-hooks by message (`steering/018-rulings.md` blocks 06:06Z and 06:10Z). Landed code read at website `969d92a`: the production diff from `7923a1d` covers `shapes.ts`, `routers/message.ts`, `routers/user.ts`, `usePreferences.ts`, `constants/index.ts`, `global.d.ts`, `tsconfig.json`, `package.json` and `eslint.config.mjs`. | The delta conforms. `zod` pinned exactly follows the existing exact pin of `@vercel/functions` (Dependencies). AF-11 is folded. M2-b's movers and edge comparison, M2-d's Edge Runtime line, M2-e's runner and M3's corrected rollback line are wording and instruments, not forms. The landed forms match the plan: `boundedArray` (its issue carries no explicit message, so zod's default wording reaches the error map, per CR-1), `isolatedUnion` (private, typed as `z.ZodType`), `cappedInput` (synchronous `safeParse`, fresh map per call, a `ZodError` of reduced issues), `MAX_ALLOWED_MENTION_IDS` beside `MAX_EMBEDS`, `MAX_RECENT_MESSAGE_IDS` beside `MAX_MESSAGES`, read by the bound, the slice and the client cut, and the two `tsconfig.json` keys. The `ts-node` check's result is QA's (exit 0 for `-T` and typed; a mutant deleting the key goes red with TS5095), not re-run in the shared tree. AF-8 and AF-10's arguments are retired to disposition lines. Open items dispositioned below. **APPROVED.** Process fact: the stamp gate refused a typed, future-dated minute in `website.md`'s changelog row; it was rewritten with the `date -u` minute, and the row was moved to the end of that oldest-first table. |
| 2026-11-20T06:12 | architect-hooks-018 | Document closed | Status: Resolved |

## Scope and instrument

Read at website `7923a1d`: `src/server/api/utils/shapes.ts` (whole), `src/constants/messageLimits.ts`, `src/constants/index.ts`,
`src/server/api/routers/user.ts` (`updatePreferences`), `src/providers/MessageProvider/usePreferences.ts`,
`src/utils/hooks/useUpdatePreferences.ts`, `src/utils/api.ts` (`RouterInputs`), `src/@types/global.d.ts` (`MessageData`),
`src/middleware.ts`, `package.json`; the readers found by `git grep` named in each finding. zod 3.22.4's `ZodPipeline` and
`ZodEffects` refinement were read in the installed `node_modules/zod/lib/types.js` and `types.d.ts`. Next 16.1.6's middleware
warning was read in the installed `node_modules/next/dist/server/lib/router-utils/setup-dev-bundler.js`. Not read: Next 16.4.6's
source, the probe's `eslint.config.mjs` beyond the plan's account of it, Discord's documentation (the plan's helper read).
At revision 2 the following were also read: `MessageProvider/index.tsx`'s save `onError` (the fixed toast) and the
`formatMutationError` call sites.

## Findings

### AF-1 MEDIUM RESOLVED — The list form widened the schema's input type and broke its `satisfies` locks. Plan rev 2 M1-d: a typed helper exported from `shapes.ts`, typecheck exit 0 with every `satisfies` unchanged (`verification/018/planning/abort-form-probe/typecheck.log`). Argument at `81b0d58`.

### AF-2 MEDIUM RESOLVED — An over-limit top-level list got a second issue from `refineDisplayableText`. Plan rev 2 M1-d makes the length issue fatal, so the parse aborts and no parent refinement runs. M1-a and M1-c are restated (one issue, no displayable-text issue; the refusal set does not move). Run: `abort-form-probe/`, 182 over-limit rows with one issue each and 0 throws. The mechanism was re-read in zod 3.22.4 `lib/types.js` (`ZodEffects` `addIssue`: `fatal` → `status.abort()`; the refinement branch returns `INVALID` on an aborted inner before `executeRefinement`; `ZodPipeline` returns `INVALID` on an aborted first stage). Argument at `81b0d58`.

**Correction (2026-11-20T04:08):** AF-2 as committed at `81b0d58` said that `sumDisplayableText`, walking the raw elements of a
dirty over-limit list, "takes no harm". That is wrong. A `null` element makes it read `.type` of `null` and throw a `TypeError`,
which QA Phase 1 found (QAF-1; critique F-2). My probe tested deep nesting only, never a `null` element, and I wrote the conclusion
wider than the run. The error was mine. The abort form removes the path, so no plan change follows from the correction.

### AF-3 LOW RESOLVED — Recent-ids bound, slice and client cut as one quantity. Plan rev 2 M1 table S11: `MAX_RECENT_MESSAGE_IDS` (10) in the barrel, read by the slice, the client cut and the bound as `+ 1`, with the open-message and loaded-bundle reason stated.

### AF-4 LOW RESOLVED — Bound homes. Plan rev 2 M1 table S6–S8: the mention-id constant goes beside `MAX_EMBEDS`, and S6's bound is the length of the one tuple the element union is built from.

### AF-5 INFO — Problem Area registered: the lint stack M3 lands on

The master document's Problem Areas gain "The lint stack rests on an unsupported ESLint major behind a compatibility layer". M3 is
sound for his D-6 and needs no change. The better path is for a later chain: replace the airbnb presets with a maintained
flat-native preset, which lifts the FlatCompat layer and opens ESLint 10. The existing ESLint row's `.eslintrc.json` sentence is
restated at the closing pass, once M3 has landed (open item 1).

### AF-6 INFO — Problem Areas registered: `middleware.ts`'s deprecated convention (X-8) and `allowed_mentions.parse`'s domain (X-13)

- `middleware.ts`: the installed Next 16.1.6 already warns that "The "middleware" file convention is deprecated. Please use
  "proxy" instead" (`setup-dev-bundler.js`, `warnOnce`). So the condition exists in production today. M2-d's captured warning at
  16.4.6 is confirmation, not discovery. Registered now. The H-001 leftover `x-query-params` write (X-7) sits in the same file,
  so the rename and that removal share one natural carrier.
- `allowed_mentions.parse` admits `user`, `here` and `everyone`, in both the save schema and the `MessageData` type. Discord's
  page lists `users`, `roles` and `everyone` (the plan's helper read, not re-read here). The editor writes only `parse: []`
  (`MessageProvider/index.tsx`), so a non-empty value comes only from pasted JSON. A Discord-valid `["users"]` is refused by the
  JSON view's import shape and by Save. This is not a W-2 tension: the front end refuses it as the back end does.

### AF-7 INFO — Problem Area registered: the editor's Save shows no reason where its siblings show the server's issues (X-18)

- The editor's Save (`MessageProvider/index.tsx`, the save mutation's error path) renders a fixed toast: "Error. Failed to save
  message. Please try again."
- Save As (`SaveAsMenu.tsx`) and the new-message modal (`NewMessageModal.tsx`) render `formatMutationError(messageError)`, one line
  per issue (A-1).
- So three writers to the same procedure tell the user different amounts, and the editor's Save, the most used, tells the least.
- Plan 018 makes this reachable on a new path: a stored message over a new bound. The plan keeps it as stated limit X-18 (AD-4),
  and that is sound for the chain's scope.
- Could be better: one error presentation for every persisting writer, which is the front-end cohesion the "Persisting writers
  share a criterion" row already describes.
- Registered in the master document's Problem Areas; no plan change.

### AF-8 MEDIUM RESOLVED — M1-i's wiring constraints. Plan rev 4 M1-i *wiring*: per-parse count, never `z.setErrorMap`; one shared definition in `shapes.ts`; refusal thrown as a `ZodError`; plus a synchronous stop and no unhandled rejection (`strip-cap-probe/strip-report-async.txt`). Landed at website `969d92a` as `cappedInput` (`shapes.ts`), wrapping both procedures' inputs. Argument at `9a58650`; run `verification/018/architect-conformance/error-cap-wiring/`.

### AF-9 LOW RESOLVED — The union isolation is one shared helper in `shapes.ts`, used at all three plain-union sites and declared as `z.ZodType<…>` of the union's output and input, not `z.ZodUnion`. Plan rev 5 M1-i *wiring*. z.enum and `z.discriminatedUnion` were not preferred: both change a refused line M1-b holds fixed, and z.enum's message carries the received value (QAF-8). The rule for future unions is carried by open item 2. Argument at `29b6ff8`.

### AF-11 LOW RESOLVED — The highlight.js bump's stated consequence omitted the editor's token-tree differences. Plan rev 8 M2, "Why `highlight.js` moves", names the 5 tree differences (typescript, css, html, java, diff) beside the 4 HTML ones. Argument at `60d0a11`.

### AF-12 INFO — Problem Area registered: the editor reads highlight.js's private emitter tree

`src/components/SlateEditor/utils/decorator.tsx` reads `highlightedBlock._emitter` cast to the `Emitter` type that
`src/@types/highlight.js.d.ts` declares, then walks `rootNode.children`. `_emitter` is not part of highlight.js's public API. A
bump can change its shape or content with no type error, because of the cast, and no test fails, because vitest runs the same
library. Revision 7 measured it once, by hand (`hl-compare/`). Could be better: a decorator built on the public HTML output, or the
comparison kept as a check that runs on every highlight.js bump. This is registered in the master document's Problem Areas and
asks no plan change.

### AF-10 HIGH RESOLVED — The `paths` entry for highlight.js removed highlight.js from the bundle. Plan rev 7 M2 drops it, moves highlight.js to 11.12.0 under D-6, and adds the M2-c bundle limb (runtime-string counts, no `(void 0)` call) and the M2-e walk. Landed at website `969d92a`: `tsconfig.json` carries no `paths` entry beyond `~/*` and `bot/*`, and QA Phase 2 found the bundle markers present with 0 `(void 0)` receivers (`qa/018-next-upgrade-save-size-cap-m2-qa.md`). Argument at `2ec5f52`; run `verification/018/architect-conformance/hljs-paths/`.

## Conforming forms

- **The abort-form helper** (rev 2 M1-d; the planner's `abort-form-probe/export.diff`) lives in `shapes.ts` beside `discordIdShape`,
  is exported for `routers/user.ts`, and carries one cast. Its issue has the same `code`, `type`, `maximum` and default message text
  as zod's own `.max()`, so A-1's per-issue formatting renders it as today's first issue. That is the form AF-1 asked for, and it
  conforms. Aborting the enclosing object leaves sibling fields' issues recorded: zod parses every key before it merges the object.
  So M1-c's "may shrink, never grow" is the right statement.
- **S4's bound** reads `MAX_TOTAL_COMPONENTS`, as `discordMessageBaseShape.components` does (`shapes.ts`). It conforms.
- **The import shape's top-level list** (M1-d) keeps `z.preprocess(filterSupportedComponents, …)` around the shared form. It
  conforms, and the JSON view then refuses what Save refuses, which is W-2's direction.
- **The new refusals at Save (S4, S6, S7, S8)** were read against W-2. The editor cannot produce those lists, and the JSON view's
  import shape extends the base shape, so it refuses them first. The residue for stored messages (M1-f) is his D-4. They are not
  016 D-10's one-sided description bound, which M1 does not touch (A-4).
- **M2** writes no new form. `next.config.js`, `middleware.ts` and the Pages/App split are unchanged.
- **M3's flat config** at the repository root sits beside `next.config.js`, `postcss.config.js`, `tailwind.config.js` and
  `vitest.config.ts`. Replacing `.eslintrc.json` and `.eslintignore` is the deviation ESLint 9 makes necessary.
- **M4** adds no code. R6 is a source read of Next.js internals that a 015 premise rests on, recorded by the implementer and
  re-derived here. R7 left M4's class at revision 3.
- **M5 under OQ-5's recommended option** puts a build override (`SKIP_ENV_VALIDATION=1`) on a release-check branch only, never
  on the chain tip or `master`. So production's build keeps its environment validation, and the preview differs from production
  by that one build-time check (`git diff --name-only` shows `vercel.json` alone). It conforms. Which option holds is his.
- **Cost that grows with history:** S11's stored list is the one form whose size grows with use. M1-e bounds what the client sends,
  for any stored length. The live population is unreadable (RK-3), so the plan's extreme of 50 is a test value, not a measurement.

## Records touched in this pass

- `system-architecture.md`: Dependencies (the direct `sharp` dropped; Next's own copy named), Problem Areas (three rows: AF-5, AF-6
  twice), and a changelog row. At revision 2: one further Problem Areas row (AF-7) and a changelog row.
- `website.md` A-4: a "List bounds" paragraph stating today's form and its zod 3.22.4 consequence (agent-designed). The M1 form is
  restated at the closing pass, once it exists (open item 2).

- At the closing pass (`system-architecture.md`): the ESLint and lint-stack rows restated from the release tree `969d92a`;
  Components gains the `tsconfig.json` sentence; Dependencies gains the release tree's versions and the exact `zod` pin; a
  changelog row. `website.md` A-4 "List bounds" is restated, with changelog row 15.

## Open items, dispositioned at the closing pass (2026-11-20T06:12)

1. ESLint row: DISCHARGED. Restated from the M3 commit (`969d92a`) with the differential counts and the in-tree run, and the
   `next/dynamic` rule named in both config files.
2. A-4 "List bounds": DISCHARGED. Restated from `969d92a`: the three shared forms, the bound homes, and four consequences (lists
   through `boundedArray`, plain unions through `isolatedUnion`, synchronous input schemas, `zod` pinned at 3.22.4 per CR-2).
3. M4-c: R6 DISCHARGED at 05:50 (Components, client navigation). Version facts DISCHARGED (Dependencies, as the unreleased release
   tree beside `master`). R3 CARRIED by `handoff/018-m4-r3-navigation-limit-to-architecture-record-2026-11-20.md` (Owning-Stage
   architect; Review-Trigger: UAT's R3 walk committed, and before the release reconciliation), because UAT's walk has not run.
4. `tsconfig.json` `paths` and the `ts-node` block: DISCHARGED (Components, website, the hybrid bullet).
