---
ID: 018
Origin: 018
UUID: 6273a762
Status: Active
Status-Detail: "Plan revision 4 (record 29277d3): APPROVED. AF-1 to AF-4 and AF-8 are resolved; AF-9 LOW is recommended to the planner; AF-5 to AF-7 are Problem Areas. Open items 1-3 below are discharged at the closing pass."
---

# Architecture Findings — Plan 018: Next.js 16.4.6 and the save-list cap (conformance pass)

## Changelog

| Date | Event | Summary |
|---|---|---|
| 2026-11-20T03:39 | Conformance pass, plan rev 1 (record `c2a6b85`), briefed by steering-roadmap-hooks (`steering/018-brief-architect.md`). Rulings read: `steering/018-rulings.md` block 2026-11-20T03:25Z. | Every concrete form the plan writes was read against website `origin/master` `7923a1d` (`git show`; nothing run in the shared tree). The length-first cap was run against the real save schema in a scratch copy (`verification/018/architect-conformance/`). Two changes are required (AF-1, AF-2), two are recommended (AF-3, AF-4), two Problem Areas are registered (AF-5, AF-6), and the forms in "Conforming forms" conform. The master document's direct-`sharp` line is reconciled (the `INBOX.md` entry of `devops-hooks-fix-message-page-header-decode`). **APPROVED_WITH_CHANGES.** |
| 2026-11-20T04:08 | Delta read, plan rev 2 (record `7a1bd46`; diff `c2a6b85..7a1bd46`), on the planner's word (`planner-hooks-018`, by message). | AF-1 to AF-4 are folded and retired to disposition lines. The cap moved from a dirty pipe to a fatal length issue that aborts the parse. Its mechanism was re-read in zod 3.22.4 source, and the planner's run was read (`abort-form-probe/`: `export.diff`, `README.md`, `table.md`, `typecheck.log`). AF-2's claim that `sumDisplayableText` "takes no harm" over raw elements was wrong, and this architect corrects it in place (QAF-1 found the `null` throw). The other forms of the delta conform: the M1-a to M1-h restatements, M4's enumerated class, and M5 under OQ-5's recommended option. AF-7 INFO registers the editor's reason-less Save toast (X-18) as a Problem Area. **APPROVED.** |
| 2026-11-20T04:16 | Delta read, plan rev 3 (record `428090e`; diff `7a1bd46..428090e`), on the planner's word. His D-8 to D-10 read in the plan's register. | M5 under D-8 conforms; it is the form this pass read at revision 2. R7 leaving M4's class is accepted (no consumer, 015 D30). M1-i (D-9) leaves its wiring to the implementer. tRPC 11.10 calls the schema's `parseAsync(value)` with no parse options (`getParseFn`), so a contextual error map cannot be passed to the procedures' parse as they are built today. The route that needs no new form, zod's global `setErrorMap`, puts one counter under every parse in the process. AF-8 MEDIUM asks M1-i to state the wiring's constraints. A per-call wrapper meeting them was run through a real tRPC caller (`verification/018/architect-conformance/error-cap-wiring/`). The premise that the error map sees every issue holds: zod 3.22.4's `makeIssue` runs each map for every issue, explicit messages included. **APPROVED_WITH_CHANGES.** Process fact: the stamp gate refused this row's first write, which carried a typed, future-dated minute; it was rewritten with the `date -u` minute. |
| 2026-11-20T04:27 | Delta read, plan rev 4 (record `29277d3`; diff `428090e..29277d3`), on the planner's word. Runs read: `verification/018/planning/union-cap-probe/` (`README.md`, `isolated-union.diff`) and `strip-cap-probe/` (by the plan's account). | AF-8 is folded as asked, and adds two constraints that are stricter than AF-8: the stopping parse is synchronous, and a stopped parse leaves no unhandled rejection. M1-i now counts issues as they appear in the result. The plan's illustrative way of reaching that is to parse the three plain-union sites outside the caller's error map, which works: created issues equal returned issues on all 50 rows, and nothing else moves. Keeping each issue to `code`, `path` and `message` matches the only reader, `formatMutationError` with zod-error. Choosing z.enum or `z.discriminatedUnion` at those sites was considered and not preferred. Both change a refused line that M1-b holds fixed, and z.enum's message carries the received value, which reopens QAF-8. AF-9 LOW recommends one shared, honestly typed union helper, and the record will carry its rule for future unions. **APPROVED.** |

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

### AF-8 MEDIUM RESOLVED — M1-i's wiring constraints. Plan rev 4 M1-i *wiring*: per-parse count, never `z.setErrorMap`; one shared definition in `shapes.ts`; refusal thrown as a `ZodError`; plus a synchronous stop and no unhandled rejection (`strip-cap-probe/strip-report-async.txt`). The argument below is kept until the closing pass retires it, because the delta read cites it.

### AF-9 LOW — The plain-union isolation is a third shared schema form; name its home and its type (recommended)

- **The form.** Plan rev 4 M1-i *the unit* needs the three plain-union sites (`sectionShape.accessory`, `separatorShape.spacing`,
  the `allowed_mentions.parse` element) to create no discarded issues under the caller's error map. The plan's illustrative helper
  (`union-cap-probe/isolated-union.diff`) is a `z.any().transform` declared `as unknown as z.ZodUnion<T>`.
- **What to state.** The form is the implementer's, but it is the save schema's third shared form, beside `boundedArray` and the
  cap wrapper. M1-i should state two things:
  1. It is one helper in `shapes.ts` beside the other two, used at all three sites.
  2. Its declared type is the union's input and output (`z.ZodType<…>`), as M1-d's helper is declared. It is not the `ZodUnion`
     class, which the runtime object is not. No reader of `ZodUnion` members exists at `7923a1d` (`git grep` over `src`, non-test).
- **Not preferred.** z.enum or `z.discriminatedUnion` at those sites would create no discarded issues either. Both change the line
  a refused input shows, which M1-b holds fixed. z.enum's message also carries the received value, which reopens QAF-8's size limb.
- **A consequence the record will carry (open item 2).** A plain `z.union` added to either procedure's input later, outside the
  helper, makes the cap count issues the result never shows. The suite catches it only if a case fails that union.

### AF-8 argument (retained) — M1-i's stop is a new server form, and its wiring needs stated constraints

**Form.** M1-i (his D-9): the two procedures' input checks stop after 20 issues and refuse with those issues plus one summary issue.
The premise run passes a contextual error map to `safeParse`. The plan leaves the wiring to the implementer.

**Why the wiring is not an implementation detail.**
- tRPC 11.10's `getParseFn` (`@trpc/server` `dist/initTRPC-*.cjs`) calls `parser.parseAsync(value)` on the schema handed to
  `.input()`. It passes no parse options, and zod 3.22.4 carries no `~standard` member. So the error map cannot reach the parse
  through the procedures' inputs as written today.
- The route that needs no new form, `z.setErrorMap`, is process-global. One counter would then sit under every zod parse in the
  server, and under concurrent requests whose async parses interleave. That interleaving is read from zod's source, not run.
- The refusal reaches the client only as the TRPCError's `message` (`trpc.ts` `errorFormatter` returns the shape unchanged).
  `formatMutationError` renders it as lines only when that message is JSON of an issue array. A thrown sentinel or a plain `Error`
  would show users raw text.

**Required change.** M1-i states the wiring's constraints:
1. The issue count is per parse, never in a module-level or global counter, and never through `z.setErrorMap`.
2. One shared definition wraps both procedures' inputs. It lives in `shapes.ts` beside `boundedArray` (mirror: M1-d's one helper).
3. The refusal is thrown as a `ZodError` of the kept issues plus the summary issue, so tRPC's message is the JSON that
   `formatMutationError` parses.
4. `RouterInputs` stays as at `7923a1d`; M1-i already states this.

**Run.** A wrapper in that shape works through a real tRPC 11.10 caller with zod 3.22.4 (`error-cap-wiring/probe.mjs`,
`output.txt`, exit 0). The wrapper is an object whose `parseAsync` calls `schema.safeParse(value, { errorMap })` with a fresh array
on each call, and turns the sentinel into a `ZodError`.
- 5000 bad elements are refused `BAD_REQUEST` with 21 issues, the last being the summary, in a message of 3,689 bytes.
- 3 bad elements are refused with 3 issues and no summary.
- Two concurrent refusals give 21 issues each, kept apart.
- A valid input passes.

That run's TypeScript typing of the wrapper (its `_input` and `_output`) was not checked. M1-i's typecheck line covers it.

Option pair: "state the constraints" (recommended) / "leave the wiring open" (not recommended: the global route compiles and passes
single-request tests).

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
- **M4** adds no code. R6 and R7 are source reads of Next.js internals that the 015 premises rest on, recorded by the implementer
  (open item 3).
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

## Open items (this document's, discharged no later than devops Stage 1)

1. Restate the ESLint Problem Areas row from the M3 tip (its `.eslintrc.json` sentence and the counts).
2. Restate `website.md` A-4's "List bounds" paragraph from the M1 tip: the fatal-issue helper, the issue-cap wrapper, the union
   isolation, their home and the bound homes (`MAX_RECENT_MESSAGE_IDS`, the mention-id constant, the `parse` tuple). Add the
   consequences a later change must carry: a plain union goes through the isolation helper (AF-9), and the procedures' input
   schemas stay synchronous, because the stopping parse is `safeParse`.
3. Carry M4-c's R3 and R6 results (X-14's premise, and 015's Next.js premise) into the record, and restate Components'
   "Next.js 16 hybrid" version facts from the release tree.
