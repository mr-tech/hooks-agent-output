---
ID: 018
Origin: 018
UUID: 6273a762
Status: Active
Status-Detail: "M1 (save-list cap and error cap) delivered on chain/018-next-upgrade-save-size-cap; code review Round 1 REJECTED at f9e66c2 (CR-1 HIGH); fix round 1 delivered at a558f2d, awaiting the re-review. M2 is in its own document; M3 and M4 follow."
Handoff-At: a558f2d — repos=website; M1 fix round 1 (fix diff b0b0158..a558f2d, three files). Production logic of M1 last changed at b639dbe (one line group in `cappedInput`); the commit after it only wraps a spec line and satisfies one lint rule
---

# Implementation 018 — M1: every server-reachable save list refuses an over-limit length with one issue (M-001)

## Plan Reference

`agent-output/planning/018-next-upgrade-save-size-cap.md`, revision 5 (`e45e8cf`), milestone M1 (criteria M1-a to M1-i). QA Phase 1 at
`qa/018-next-upgrade-save-size-cap-qa.md` (`0160d45`). Chain branch `chain/018-next-upgrade-save-size-cap` in website, cut from
`7923a1d`. Plan Status set to In Progress at `ecffc1e` (agent-output), changelog row R-4.

## Date

2026-11-20 (UTC). Session `implementer-hooks-018`.

## Changelog

| Date | Handoff | Request | Summary |
|------|---------|---------|---------|
| 2026-11-20T05:09 | steering-roadmap-hooks (brief `steering/018-brief-implementer.md`) | Implement M1 to M4 of revision 5 | M1 implemented test-first on the chain branch: red spec `e5732b0` (and `441cc71`), production `532c0ee`, `a0239fd`, refinements `32047a2`, `bfc790d`, spec additions `e21794c`, `be35da8`. Self-check sweep and QA's named mutants run in isolated exports; survivors dispositioned below. |

## Fix Round 1

Code review Round 1 (`code-review/018-next-upgrade-save-size-cap-code-review.md`, `55fe778`; plan row R-9 `d88f07a`) REJECTED M1 at `f9e66c2`: CR-1 HIGH, CR-2 LOW, CR-3 INFO.
Fix diff `b0b0158..a558f2d` (the base of this round is the M2 commit, which is on the same branch; M1's own production logic is otherwise as at `f9e66c2`).

| Date | Handoff | Request | Summary |
|------|---------|---------|---------|
| 2026-11-20T05:41 | code-reviewer-hooks-018 (Round 1) | CR-1, CR-2, CR-3 | CR-1: red specs `c357095`, fix `b639dbe`, lint satisfaction `a558f2d`. CR-2 and CR-3 below. |

**CR-1 (the capped refusal worded an explicit-message issue with zod's default).** Reproduced before editing: a direct `cappedInput(z.object({ message: optionalIdMessageShape }))` call over the
reviewer's input (19 field issues, the displayable-text issue as the 20th, then `id: 'abc'`) gave index 19 `"String must contain at most 4000 character(s)"`. The cause is mine: I took zod 3.22.4's
`makeIssue` to run every error map (it does) and so recorded `ctx.defaultError`, but `makeIssue` keeps `issueData.message` over the maps' result, and `issue.message` (the map's first argument) carries it.
The fix is the one expression the reviewer names, in the map, used for both what `seen` records and what the map returns: `issue.message ?? ctx.defaultError` (`shapes.ts` `cappedInput`).
Disclosure: zod's own expression is `||`; `prefer-nullish-coalescing` (a lint gate the repository runs) flagged my first form with `||`, and I satisfied it with `??`. The two differ only for an
explicit empty-string message; `git grep -n -E "message: ''|message: \"\"" -- src` gives 0 hits, so no site passes one (to the gate's owner: zod's expression is `||`, which is the form a
spec of "as zod does" would name).

**A reviewer premise I did not reproduce.** CR-1 says both procedures reach the case with a trailing bad `id`. `message.upsert` does (`optionalIdMessageShape.id` is `messageIdShape.optional()`); `user.updatePreferences`'
`message` is `partialMessageShape`, whose `id` is `z.string().optional()`, so `'abc'` is valid there and nothing follows `message.data` in that input. I saw this when the first form of my spec, shared by both
procedures, gave 20 issues and no summary for `updatePreferences`. The procedure-level spec is therefore `message.upsert`'s alone; the shared-schema spec covers `cappedInput` for any caller.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? | Red run |
|---|---|---|---|---|---|---|
| `cappedInput()` message of an explicit-message issue at a kept position neither first nor last | `shapes.error-cap.test.ts` "keeps the message an issue was created with, at a kept position that is neither first nor last" | Yes (`c357095`) | Yes | `AssertionError: expected { code: 'custom', …(2) } to deeply equal { code: 'custom', …(2) }` (the actual message is `Invalid input`, the literal expected `The flag is not allowed`) | Yes | `m1-fix1/red-b0b0158.json`, `.out.txt` (run at `b0b0158`, whose `cappedInput` is that of `f9e66c2`); mutants F-1, F-2, F-4 |
| the same through `message.upsert` (M1-b over the procedure) | `message.save-limits.test.ts` "words the displayable-text issue as it does uncapped when an issue follows it" | Yes (`c357095`) | Yes | `AssertionError: expected { code: 'too_big', …(2) } to deeply equal { code: 'too_big', …(2) }` (actual message `String must contain at most 4000 character(s)`) | Yes | same capture |

`tdd-check.py` refuses TypeScript; the rows are read. The new case is added to the two files that already cover the surface (`shapes.error-cap.test.ts`, and `message.save-limits.test.ts`, the file of the `upsert` specs): no new test file.
Mutants of the fix, in an isolated export of `a558f2d` (`m1-fix1/named-mutants-a558f2d.json`, run `m1-fix1/sweep-a558f2d/`, `src/server/api` as the selector, control passed): F-1 (the default only), F-2
(recorded default, returned own), F-4 (operands swapped) KILLED; F-3 (the map returns `ctx.defaultError`) SURVIVED: equivalent, shown by zod's own source (`m1-fix1/zod-makeissue.txt`: `message: issueData.message || errorMessage`, so a message the map
returns is used only when the issue has none, and then `issue.message ?? ctx.defaultError` is `ctx.defaultError`) and by the whole `src/server/api` suite (697 cases) passing under it. `mutant-gen.js` over the fix diff produced 0 mutants (its operators do not cover `??`), so the four are mine.

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---------|---------------------|----------------------------------|--------------------------|
| CR-1 (the reviewer's) | `git grep -c -E "message:\|\.(max\|min\|length\|regex\|url\|refine\|datetime\|int\|nonnegative)\([^)]*,\s*['\`{]\|errorMap\|required_error\|invalid_type_error" <sha> -- src/server/api/utils/shapes.ts src/server/api/routers/user.ts src/server/api/routers/message.ts src/server/api/utils/user.ts src/constants` | `f9e66c2`: 19 (`message.ts` 11, `user.ts` 1, `shapes.ts` 6, `utils/user.ts` 1); `a558f2d`: 17 (`shapes.ts` 4); `m1-fix1/class-sweep-cr1.txt` | the reviewer's 15 non-schema hits stand as he dispositioned them; of the schema-issue sources, `refineDisplayableText`'s and `isolatedUnion`'s replay now pass through the one expression; the two hits that left are `cappedInput`'s own lines |
| CR-1 (mine: every place an issue's message is made or recorded) | `git grep -n -E "defaultError\|addIssue\(" <sha> -- src ':!*__tests__*'` | `f9e66c2`: 5 lines (`shapes.ts` 41 `boundedArray` too_big, 62 `isolatedUnion` replay, 82 and 84 the map, 260 `refineDisplayableText`); `a558f2d`: 4 lines (41, 62, 82 the one expression, 261) | 41: no explicit message, the default through the expression; 62: explicit message equal to the default (the inner parse ran default maps only), through the expression; 82: the one place the capped path forms a message; 261: explicit, now kept. The residual is 0 places that read `ctx.defaultError` other than as the fallback |

**CR-2 (zod `^3.20.6` admits a version that skips the map for an explicit-message issue).** Not applied in this round, with the reason: the preferred fix is a `zod` pin in `package.json` and the lockfile
importer's specifier. M2-b's text says `package.json`'s diff touches only the specifiers its steps name, so the pin changes a plan criterion; it is a plan matter (D-6 allows the move). It is viable and small; steering
puts it to the Planner batch (the reviewer allows it: "This can go to the Planner batch. It does not block alone."). The guard that would catch a version move is the "plain unions" spec's `created` count;
the reviewer inferred, not measured, its failure under 3.25.76.

**CR-3 (the `.input(` count).** Reconcile note, 2026-11-20T05:41: the figure in "Patterns Extended, Sibling sweep" (14 hits) was one too many. `git grep -c -E "\.input\(" a558f2d -- src/server` gives `guild.ts` 4, `message.ts` 7, `user.ts` 2 = 13 lines;
2 commented out (the `messages` arrays in `guild.ts` and `user.ts`), 11 live, 2 wrapped (`upsert`, `updatePreferences`). The conclusion stands.

**Self-diagnosis (method).** I derived the capped path's wording from the first argument's absence of `message` ("the map is called for every issue, so default is what zod would say") and tested the one sample the plan names, instead of reading
`makeIssue`'s last line, which states that an issue's own message wins. Reading the function's return expression, not its loop, would have shown two sources for `message`.

**Test results of the round** (files under `verification/018/implementation/m1-fix1/`): red at `b0b0158` for the two new cases (the rest of the three files pass: 317 cases, 2 failed); `src/server/api` at the fix 697 of 697, exit 0;
the whole suite at `b639dbe` 2261 of 2261 in 154 files, exit 0 (`suite.json`; 2259 + the two cases); `pnpm run typecheck` exit 0 at `a558f2d`; `convention-check.js website --since=b0b0158`: 3 files examined, 0 FAIL,
0 CANDIDATE (two FAILs fired on `b639dbe`: `max-len` in the new spec and `prefer-nullish-coalescing` in `shapes.ts`; both satisfied at `a558f2d`, the second as disclosed above); the id-token basename check is unchecked by the tool, I read my new titles (none carries a milestone, round or ticket token).
A `vitest` run of the first form of the procedure spec reported 167 cases with one failure while the file itself failed to load (`it`/`expect` not imported); I misread the count at first and corrected the import: the counters above are from the corrected run.

## Implementation Summary

A signed-in save that sends an oversized list is now refused with the one issue for that list, before any element is validated,
and no refusal carries more than 20 issues plus one summary. That delivers the plan's Value Statement for M-001: a crafted save can no
longer make the server build an error of tens of thousands of issues.

- `boundedArray(element, max)` (`src/server/api/utils/shapes.ts`) checks the length first and records the one `too_big` issue as
  fatal, so the parse of the enclosing object aborts and no parent refinement (`refineDisplayableText`) runs over unvalidated
  elements. It is used at all 11 sites: S1–S10 in `shapes.ts` (S4, S6, S7, S8 are new bounds: 40, 3, 100, 100) and S11
  (`recentMessageIds`, bound `MAX_RECENT_MESSAGE_IDS + 1` = 11) in `routers/user.ts`, and in the import schema's top-level list.
- `isolatedUnion(options)` replaces the three plain `z.union` sites (`sectionShape.accessory`, `separatorShape.spacing`, the element of
  `allowed_mentions.parse`, the last built from the one constant tuple `ALLOWED_MENTION_PARSE_TYPES`, whose length is S6's bound). Its
  losing branches are parsed outside the caller's error map and only the result's issues are replayed, so created = returned.
- `cappedInput(schema)` wraps the input of `message.upsert` and `user.updatePreferences`: a per-parse counting error map stops the
  (synchronous) parse at the 21st issue, and the refusal is a `ZodError` of the first 20 issues plus one `custom` summary at path
  `[]` ("Stopped checking after 20 errors"), every issue reduced to `code`, `path` and `message`.
- Two constants in `~/constants`: `MAX_ALLOWED_MENTION_IDS` (100, beside `MAX_EMBEDS`) and `MAX_RECENT_MESSAGE_IDS` (10, beside
  `MAX_MESSAGES`), read by the bound, the server's slice and the composer's cut.
- `usePreferences.ts` (the composer): sends the open message plus at most ten stored ids, and at most ten stored ids with no
  message open (M1-e).

## Milestones Completed

M1 (M1-a to M1-e, M1-i in code and tests). M1-f is stated by the plan (no code). M1-g and M1-h are UAT's walks (B-1, B-2, B-6); the
set-up for M1-g's server limb is in the plan and needs no code from this milestone. M2 to M4 are in their own documents.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start (steering's recorded start; every pre-code gate approved revision 5; no OPEN QUESTION open) | `steering/018-rulings.md` block "2026-11-20T04:33Z"; critique APPROVED (`e45e8cf`), architecture APPROVED (`1f78e40`), QA Phase 1 re-keyed to revision 5 (`0160d45`, Status Awaiting Implementation) | not owed (a record fact) |
| QA Phase 1 committed at a SHA covering the milestone | `0160d45` | not owed |
| Read: plan whole, QA document whole, qa.md § Test-Driven Development to § An Instrument Score Travels With Its Predicate, engineering-standards, testing-patterns, document-lifecycle (`SKILL.md`, `references/documents.md`) | this session | not owed |
| Roadmap | absent (`agent-output/roadmap/` holds none, plan header `Epic-Alignment`); the architecture record `architecture/website.md` was not re-read beyond the plan's citations (W-2, A-1, A-4); the architect's findings document was read at its Findings headings only | not owed |
| QA entry condition 1: the capped S10 holding one `null` at length 41 under the message-level refinement gives one `too_big` issue and no throw | the spec case exists before the implementation | `shapes.list-bounds.test.ts` "refuses 41 top-level components holding a null with one issue and no throw" and `message.save-limits.test.ts` S10 `null` rows. Run against the `.max()` form it gives 2 issues (the null's own and the length issue) and no throw; the throw QAF-1 describes belongs to the dirty-pipe form, not to the base. |
| QA entry condition 2: `usePreferences` with no message id and a stored list of 50 | recorded before the cut | `usePreferences.recent-list-bound.test.tsx`; red run `verification/018/implementation/m1/red-usePreferences.out.txt`: at `7923a1d`'s code the hook sends all 50 with no id open, and 51 with an id open (`AssertionError: expected [ '900000000000001', …(49) ] to deeply equal [ …(9) ]`) |
| Open handoff trigger (X-10) | fires at this M1 edit of `updatePreferences`; steering messaged at `532c0ee` | not owed (steering's disposition) |
| Handoffs X-9, X-11 | not fired: no file under `src/pages/api/` and none of `Child.portal-inside-open-dialog.test.tsx`'s file is edited in M1 | `git diff --name-only 7923a1d..be35da8` |
| `mutant-equivalence-by-argument-unverified-2026-11-19.md` trigger (`leaveWithoutAlert.ts`, `messageDrafts.ts`, `withLocalStorage.ts`, `StyledLink.tsx`, `generateImage.ts`) | not fired by M1: none of the five is in the diff | same command |

## Files Modified

| Path | Changes | Lines (+/-) |
|---|---|---|
| `src/constants/index.ts` | `MAX_ALLOWED_MENTION_IDS`, `MAX_RECENT_MESSAGE_IDS` | +2/-0 |
| `src/providers/MessageProvider/usePreferences.ts` | the composer's cut | +3/-2 |
| `src/server/api/routers/message.ts` | `upsert` input wrapped in `cappedInput` | +2/-2 |
| `src/server/api/routers/user.ts` | `updatePreferences` input wrapped; S11 bounded; the slice reads the constant | +6/-5 |
| `src/server/api/utils/shapes.ts` | `boundedArray`, `isolatedUnion`, `cappedInput`, the tuple; the 11 sites | see `git diff --numstat 7923a1d..HEAD` |

## Files Created

| Path | Purpose |
|---|---|
| `src/server/api/utils/__tests__/shapes.list-bounds.test.ts` | `boundedArray` and the strict and import schemas directly |
| `src/server/api/utils/__tests__/shapes.error-cap.test.ts` | `cappedInput` and the union isolation |
| `src/server/api/utils/__tests__/helpers/listBoundSites.ts` | the 10 message-list sites as literals (bound, path, element kinds, the one-issue invalid element) |
| `src/server/api/routers/__tests__/helpers/saveListBoundSpecs.ts`, `saveErrorCapSpecs.ts` | the specs both procedures register (21 pairs; the cap) |
| `src/server/api/routers/__tests__/message.save-limits.test.ts`, `user.save-limits.test.ts` | the specs through `createCaller` of each procedure; S11; the stored slice |
| `src/providers/MessageProvider/__tests__/usePreferences.recent-list-bound.test.tsx` | M1-e |

## Patterns Extended

| Surface | Pattern extended |
|---|---|
| `shapes.ts` list bounds | in-file: a constant per bound beside the shape and `z.array(...).max(CONST)`, deviated from at the six bounded sites because `.max()` cannot meet M-001's bar (`refute-zod-max`); the deviation and its reason belong in architecture A-4, the architect's closing line (plan header) |
| New constants | in-repo: `~/constants` barrel (`MAX_EMBEDS`, `MAX_MESSAGES`) |
| Procedure tests | in-repo: `message.personal-ownership.test.ts` (`createCaller` over `createCapturingDatabase`, `vi.mock` set) |
| Hook test | in-repo: `src/providers/MessageProvider/__tests__/*` (`mountDom`, `ENV_MOCK`) |
| User-visible surfaces | three flows, all existing patterns, none a decision: (1) JSON view paste over a bound: the paste's issue list shown by the existing A-1 formatting, now one line per list (rung: this surface); (2) Save As and the new-message modal: `formatMutationError` renders the issue lines (rung: this surface), a capped refusal renders 21 lines; (3) the editor's Save: unchanged toast (D-10, X-18). The recent list is not visible. No ask is owed. |
| Sibling sweep (shared pattern) | text predicate `git grep -n -E "z\.array\(\|\.array\(" 32047a2 -- src` outside tests: 4 hits — `boundedArray`'s two uses of `z.array` and two commented lines (`guild.ts`, `user.ts`: `updateMessages`); `\.input\(` over `src/server`: 14 hits, 2 wrapped (`upsert`, `updatePreferences`), the others take a scalar shape or a string object with no list. Reference query (Serena or language server) not available in this session; the second instrument is the typecheck's `satisfies` clauses and the QA differential's procedure labels at Phase 2. |

## TDD Compliance

Column "Red run" names the capture. "Stub-tree" means an isolated tree where the function exists with the base behaviour (a `.max()` form
or an identity wrapper) so the red is at assertion level; "parent" means the tree at the red-spec commit `e5732b0` (production as at
`7923a1d`). The Python `tdd-check.py new-names` refuses TypeScript; its rows are read.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? | Red run |
|---|---|---|---|---|---|---|
| `boundedArray()` (module row) | `shapes.list-bounds.test.ts` | Yes | Yes | `TypeError: boundedArray is not a function` | Yes | `m1/red-e5732b0-server-api.out.txt` (parent) |
| `boundedArray()` over-limit: one issue, no element validated, no parent refinement | same, "validates no element of an over-limit list", "runs no refinement of the enclosing object over an over-limit list" | Yes | Yes | `AssertionError: expected [ { code: 'too_big', …(2) }, …(3) ] to deeply equal [ { code: 'too_big', path: [], …(1) } ]`; `expected "vi.fn()" to not be called at all, but actually been called 1 times` | Yes | `m1/red-stub-shapes-list-bounds.json` (stub-tree `z.array().max()`); mutant NM-1 |
| strict and import schemas: S10 and S4 with a `null`, no displayable-text issue, S7 and S8 at 100/101, S6 at 4, import top-level 41 invalid | same | Yes | Yes | assertion level, 8 of 15 cases red in the stub-tree (`expected [ …(150) ] to deeply equal [ { code: 'too_big', …(2) } ]`, `expected null to deeply equal …`) | Yes | `m1/red-stub-shapes-list-bounds.json`; NM-5, NM-23, NM-24, NM-25, NM-26, NM-28 |
| `cappedInput()` (module row) | `shapes.error-cap.test.ts` | Yes | Yes | `TypeError: cappedInput is not a function` | Yes | `m1/red-e5732b0-server-api.out.txt` (parent) |
| `cappedInput()` behaviours: 20 issues kept, summary at the 21st, no carried count, ZodError of reduced issues | same | Yes | Yes | `AssertionError: expected [ …(30) ] …` (identity stub wraps nothing) — 6 of 7 cases red in the stub-tree; "returns the parsed output" is the stub's control and passes | Yes | `m1/red-stub-error-cap.json`; NM-9, NM-10a, NM-10b, NM-11, NM-13, NM-14, NM-15, NM-16 |
| `isolatedUnion()` (module-private; reached through the schema) | `shapes.error-cap.test.ts` "the plain unions of the message shape"; `saveErrorCapSpecs.ts` "the plain unions of the save" | Yes | Yes | `AssertionError: expected { created: 21, returned: 6 } to deeply equal { created: 6, returned: 6 }`-class (base unions create the branch issues) | Yes | `m1/red-stub-error-cap.json`; NM-18, NM-19, NM-20, NM-21 |
| Procedure input wiring, 21 pairs × kinds × lengths (S1–S11) | `message.save-limits.test.ts`, `user.save-limits.test.ts` | Yes | Yes | assertion level at the parent: `expected [ { validation: 'url', …(3) } ] to deeply equal [ { code: 'invalid_string', …(2) } ]`, over-limit rows give base issue lists; 126 of 146 and 130 of 153 cases red | Yes | `m1/red-e5732b0-server-api.json`; NM-6, NM-7, NM-12, NM-12b |
| `usePreferences` composer cut | `usePreferences.recent-list-bound.test.tsx` | Yes | Yes | `AssertionError: expected [ '900000000000999', …(50) ] to deeply equal [ '900000000000999', …(10) ]` (6 of 11 red at parent) | Yes | `m1/red-usePreferences.json`; NM-4 |
| Server slice reads `MAX_RECENT_MESSAGE_IDS` | `user.save-limits.test.ts` "keeps the first ten of the eleven ids" | Yes (added after the sweep's survivor `user.ts:39:num`, see Sweep) | Yes | `slice(0, 11)` mutant stores 11 | Yes | `m1/sweep-final-*` |

Constants (`MAX_ALLOWED_MENTION_IDS`, `MAX_RECENT_MESSAGE_IDS`): no behaviour of their own; each value is observed through the procedure
specs (S7/S8 at 100/101, S11 at 11/12) and killed by the generated `num` mutants.

## Class Sweep

No reviewer finding yet; first delivery. Gaps my own mutation exposed during delivery are dispositioned under Sweep below (NM-5, NM-21,
`user.ts:39:num`): each was closed with a test, and the class each sampled was enumerated:

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---------|---------------------|----------------------------------|--------------------------|
| NM-5: the import schema's top-level list kept `.max()` without a test failing | `git grep -n -E "boundedArray\\(\|\\.max\\(MAX_" bfc790d -- src/server/api/utils/shapes.ts` | see Sweep (list sites: 12 `boundedArray(` lines, 0 `.max(MAX_` on a list) | every list site has a spec row (S1–S11, import top-level); the import's top-level list now has one (41 invalid, 41 long text) |
| NM-21: an isolated-union failure that is not fatal let the message-level refinement run | `git grep -n "isolatedUnion(" bfc790d -- src` | 3 call sites (accessory, spacing, the `parse` element) | one spec for the accessory (displayable-text issue not added); spacing and `parse` have no parent refinement path that reads them (`sumDisplayableText` reads only `type`, `content`, `components`), so no observable member exists for them |
| `user.ts:39:num`: the server's slice was unspecified | `git grep -n -E "slice\\(0, " bfc790d -- src/server src/providers` | see Sweep | the slice has a spec; the composer's cut has one |

## Test Execution Results

Per RTK.md: counts come from vitest's JSON (`numTotalTests`), the exit code recorded beside; every run's output is a file under
`verification/018/implementation/m1/` (and `base/`).

| Command | Result | Exit |
|---|---|---|
| base `npx vitest run` at `7923a1d` (shared tree) | 1913 passed of 1913, 149 files (`base/suite.json`) | 0 |
| `npx vitest run` at `a0239fd` | 2247 of 2247, 154 files (`green-m1-suite.json`) | 0 |
| `npx vitest run` at `f9e66c2` (working tree = HEAD) | 2259 passed of 2259 (vitest summary, 05:23Z); the five route and schema spec files at the tip: `src/server/api/routers` PASS (358) FAIL (0) | 0 |
| `npx vitest run src/server/api` at the tip | 689 of 689 | 0 |
| `pnpm run typecheck` (both programs) at the tip | no diagnostics (`typecheck-m1.out.txt`); `git diff 7923a1d..HEAD -U0 -- shapes.ts` has 0 lines touching the 5 `satisfies` clauses | 0 |
| red at the parent `e5732b0` (`src/server/api`) | 659 cases, 403 passed, 256 failed; the two unit files fail to load with `TypeError` | 1 |

## Sweep (self-check, isolated exports)

Instrument: `~/.claude/tools/mutation-run.py` through `verification/018/implementation/run-mutation-sweep.sh <sha> <mutants.json> <out> <work>`
(each mutant in its own `git archive` export of the SHA, own process group, 200 s timeout, `node_modules` bound read-only with bwrap, the
whole suite `npx vitest run` as the command; control passed in every run). Outputs are under `verification/018/implementation/m1/`.

**Generated sweep.** `node ~/.claude/tools/mutant-gen.js --repo website --range 7923a1d..bfc790d` → 35 operator mutants over the production
lines the range added, in `src/constants/index.ts`, `usePreferences.ts`, `routers/user.ts`, `utils/shapes.ts` (test files skipped by the
tool: 8). Export of `bfc790d`: 27 of 35 killed (predicate: mutants whose suite started under a passing control; stillborn 0, aborted 0;
`mutants-bfc790d.json`, summary `gen-sweep-bfc790d.summary.txt`). The 8 survivors, each dispositioned:

| Survivor | Disposition |
|---|---|
| `user.ts:39:num` (server slice 10 → 11) | a real gap: the stored slice had no spec. Spec added (`user.save-limits.test.ts` "keeps the first ten of the eleven ids", `be35da8`); killed at `e2b00b8` |
| `shapes.ts:61:===` (isolated union `fatal` inverted) | a real gap: no spec where a matched dirty branch must stay non-fatal. Spec added (`f80b151`: a link-button accessory with two dirty issues keeps both and the displayable-text check still runs); killed |
| `shapes.ts:62:walk-first`, `:62:walk-last` (replay only the first / last issue) | a real gap: no accessory with two issues. Same spec; killed |
| `shapes.ts:90:if-false` (an error the schema throws is turned into a refusal) | a real gap. Spec added (`shapes.error-cap.test.ts` "lets an error thrown by the schema itself reach the caller", `f80b151`); killed |
| `shapes.ts:276:walk-first` (the parse union built from the first tuple member only) | a real gap. Spec added (`e2b00b8`, each parse kind admitted and its plural refused); killed |
| `shapes.ts:61:walk-first`, `:61:walk-last` (`.some` over the first / last issue only) | equivalent over the class, shown by a captured probe, not by argument alone: `m1/equivalence-probe/` (17 accessory inputs, 9 spacing values, 9 parse elements, through the real `discordMessageShape`): 28 rows have `invalid_union` at index 0 as the only issue, 7 have none, 0 have it elsewhere (`rows.txt`). A union failure is a lone `invalid_union`; a dirty branch carries no `invalid_union`. Not killable without a schema the site does not have. |

Re-run of the 10 mutants (8 survivors + NM-5, NM-21) at `e2b00b8` (`survivors-rerun-e2b00b8.json`, `survivors-sweep-e2b00b8/`): 8 of 10 killed;
the 2 that remain are the equivalent `:61` walk mutants above. The later commits (`cfaa11e`, `f9e66c2`) change only line wraps, one
`eslint-disable-next-line` directive and a spec title; the suite and typecheck were re-run at them (below).

**QA's named mutants** (`qa/…-qa.md` § Named mutants), each made as one change in the sweep's export (`named-mutants-bfc790d.json`, 30
mutants: QA's 17 lines as built, 13 more of mine). 28 of 30 killed on the first run, the two survivors closed as above:

| QA line | Words | Mutant ids and result |
|---|---|---|
| NM-1 | the cap lets a parent refinement run over unvalidated elements | `NM-1` (fatal removed) killed |
| NM-2 | one site keeps `.max()` after element validation | `NM-2` (S5), `NM-27` (S9), `NM-28` (S10) killed |
| NM-3 | off by one | `NM-3` (S1 bound − 1), `NM-29` (the length check `>=`) killed |
| NM-4 | composer bounded only with an open id | `NM-4` killed |
| NM-5 | the shared definition duplicated per site | `NM-5` (import's top-level list on `.max()`): SURVIVED first run; spec added (`e21794c`, 41 invalid and 41 long-text elements); killed at `e2b00b8`. `NM-25` (S4) killed |
| NM-6 | S11's bound 10 instead of 11 | `NM-6` killed |
| NM-7 | the cap reaches `upsert` only | `NM-7` (the `updatePreferences` message uncapped) killed |
| NM-8 | wrong issue path | `NM-8` killed |
| NM-9 | the parse completes, the list is trimmed | `NM-9` killed (the read-count case) |
| NM-10 | off by one at the cap | `NM-10a` (stop at the 20th), `NM-10b` (21 kept) killed |
| NM-11 | the summary added whenever the parse fails | `NM-11` killed |
| NM-12 | cap wired into one procedure | `NM-12`, `NM-12b` killed |
| NM-13 | the cap bounds the count only | `NM-13` killed |
| NM-14 | strip only on the capped path | `NM-14` killed |
| NM-15 | the count at module scope | `NM-15` killed |
| NM-16 | the stop inside `safeParseAsync` | `NM-16` killed |
| NM-17 | the list issue loses zod's wording | `NM-17` killed |
| (mine) | the three unions | `NM-18`, `NM-19`, `NM-20` (not isolated) killed; `NM-21` (fatal always false): SURVIVED first run, spec added (`e21794c`), killed at `e2b00b8`; `NM-23`, `NM-24`, `NM-26` (S7, S8, S6) killed |

Named line `NM-1`'s "`null` under the message-level refinement" is the entry condition 1 row above. No QA line is unplaced; none is "not yet built".
`NM-22` of an earlier draft (replay with the issue's message) was withdrawn: zod 3.22.4's `makeIssue` runs every error map for every issue,
explicit message or not, so the mutant is equivalent to the code.

**M1-i measurement** (outside the suite's pass/fail; `m1/measure/message.save-cap-measure.test.ts`, run through the real `message.upsert`
caller at `f9e66c2`, `m1/measure/tip-f9e66c2.jsonl`; base figures are steering's `verification/018/steering/refute-within-bound/output.txt` at
`7923a1d`, taken on the schema's `safeParse`, so time is parse plus message build there and parse-and-respond here):

| Body | Bytes (tip) | Base issues / message chars / time | Tip issues / message chars / time | Database queries |
|---|---|---|---|---|
| F_fat_buttons | 706,728 | 48,000 / 13,216,002 / 201 + 110 ms | 21 / 5,011 / 3.7 ms | 0 |
| G_fat_buttons_plus_embeds | 707,619 | 48,500 / 13,324,552 / 216 + 231 ms | 21 / 3,669 / 0.6 ms | 0 |
| A_rows_only | 66,728 | 24,000 / 5,980,002 / 104 + 69 ms | 21 / 4,792 / 0.8 ms | 0 |
| B_sections_only | 81,128 | 11,200 / 5,843,202 / 65 + 39 ms | 21 / 4,651 / 1.7 ms | 0 |
| C_galleries_only | 84,328 | 16,000 / 4,008,002 / 25 + 28 ms | 21 / 4,319 / 0.8 ms | 0 |
| D_mixed_plus_embeds | 78,279 | 17,571 / 5,386,054 / 39 + 39 ms | 21 / 3,669 / 0.7 ms | 0 |
| E_rows_plus_embeds | 67,619 | 24,500 / 6,088,552 / 33 + 44 ms | 21 / 3,669 / 0.4 ms | 0 |

Every refusal is at most 5,011 characters, under the 16 KB limit; the QAF-8/9 long-value population is the spec rows "stay small for …"
(8 inputs of 100,000 characters, each refused with 1 to 3 issues).

**Convention check** `node ~/.claude/tools/convention-check.js website --since=7923a1d` at `f9e66c2`: 13 files examined, 0 FAIL, 0 CANDIDATE, 18 SKIP.
The SKIPs are 17 `.png` files under `.playwright-mcp/` (another session's untracked captures, outside the examined set) and the checker's
"id-token, basename" check, which the tool does not implement verbatim (`agent-output/CLAUDE.md` states the class): that one is **unchecked by the tool**;
I read my new basenames and titles for the class by `grep -E` over the 8 test files (one hit, a `100,000` in a title, reworded in `f9e66c2`).
Before this check 32 FAILs stood (lint `max-len`, `import/order`, `member-delimiter-style`, one `no-unsafe-return`); all were fixed in `cfaa11e`.
One command of mine, `eslint --fix` over three directories, also rewrote three tracked test files I had not touched
(`messageValidity.predicate`, `shapes.message-validation`, `shapes.supported-types-parity`); I restored exactly those three to `HEAD` (they were clean at the time, `git status` before it listed only `.playwright-mcp/`).


## Outstanding Items

- M1-g, M1-h are UAT's walks (B-1, B-2, B-6); the editor's Save keeps its toast (D-10); M1-f is a stated limit.
- Architecture A-4's text (the `.max()` deviation, the new bounds, the recent-ids constant) is the architect's closing line.
- `cappedInput`'s `return result.data` is flagged by the base lint config's `no-unsafe-return` (lint is red and out of scope, X-6): 1 finding
  in `shapes.ts` that the M3 config does not report.
- Self-diagnosis: I first wrote the cap's counting around an assumption that zod 3.22.4 skips the error map for an issue with an
  explicit `message`; the architect's findings and `parseUtil.js` `makeIssue` say it runs the maps for every issue. The first
  implementation therefore carried a dead branch (a length check on the complete-parse path) and a redundant `stopped` conjunct; both
  were removed in `32047a2` and `bfc790d`. I tested the plan's example rather than reading the property it protects first.

## Next Steps

Code review of M1 at the handoff SHA, then QA Phase 2 for M1 with its differential (`verification/018/qa/phase-1/differential/`).

## Resumption State

Written 2026-11-20T05:28Z by `implementer-hooks-018` at steering's checkpoint request (steering-roadmap-hooks, before M2). Website tree
`/usr/local/bin/hooks/website` on `chain/018-next-upgrade-save-size-cap` at `f9e66c2`, tracked tree clean (only `.playwright-mcp/` untracked, not mine).

- **Done:** M1 delivered and handed to steering at `f9e66c2` (this document, agent-output `003515a`); `code-reviewer-hooks-018` is spawned on it.
  Plan Status In Progress (`ecffc1e`). Plan revision 7 is what M2 builds on (critic APPROVED `15988b6`; QA re-key and architect read recorded; AF-11,
  F-23, F-24 parked in the Planner batch for a later fold). M2 is capped: `steering/018-rulings.md` block "2026-11-20T05:26Z" (`44efb1f`) — read it first.
  Ruling B (`steering/018-rulings.md` block "2026-11-20T04:51Z", `a654422`): run `pnpm install --frozen-lockfile` in the shared tree after the M2 commit
  and again after M3, record each exit code, cite the block. The shared tree's `node_modules` is still the `7923a1d`-era install (Next 16.1.6); not touched yet.
- **M2 (not committed):** built and checked in isolated exports under `/tmp/claude-1000/-usr-local-bin-hooks-website/62d383f4-5f83-48a2-99a1-2b2bac06a637/scratchpad/`:
  `m2b` (the edited `package.json`, `pnpm-lock.yaml`, `tsconfig.json`; `pnpm install` exit 0) and `m2c` (a fresh export of `f9e66c2` plus those three files,
  `pnpm install --frozen-lockfile` exit 0). The M2 change set, exactly: `package.json` specifiers `next` and `@next/bundle-analyzer` `^16.4.6`, `highlight.js`
  `^11.12.0`; `pnpm-lock.yaml` regenerated; `tsconfig.json` two keys only (`compilerOptions.moduleResolution` "bundler", `ts-node.compilerOptions.moduleResolution` "node"; no `paths`
  entry — revision 7). Copy those three files from `m2b` (or re-derive: `git diff` shows the two tsconfig hunks and three specifiers) into the tree and commit as M2.
  Results already captured under `verification/018/implementation/m2/` (UNCOMMITTED in agent-output, with `lockfile-movers.py`, `lint-differential.py`): frozen install exit 0;
  `next build` (SKIP_ENV_VALIDATION=1) exit 0, no "mandatory changes" line, `tsconfig.json` unchanged by the build; `pnpm run typecheck` exit 0; `ts-node` check of
  `~/utils/limits` exit 0 with `-T` and typed; `highlightAuto` 1 static / 4 server files, `registerLanguage` 1 / 4; 0 files calling `getLanguage(` or `highlight(` on `(void 0)`
  (my regex: `hl-void0.txt`; QA's probe `verification/018/qa/m2-hljs-resolution/` is the named instrument — run it too); lockfile movers `m2/lockfile-movers.txt`
  (41 removed / 44 added package keys against `f9e66c2`, to be dispositioned row by row per M2-b: sharp 0.34.5→0.35.5 with its `@img/*` optional packages, `@emnapi/runtime`,
  `postcss` 8.5.23, `semver`, `@swc/helpers`, `caniuse-lite`/`baseline-browser-mapping` out, `highlight.js` 11.7.0→11.12.0, `next` and its `@next/*`); M2-a `grep -c -E "^  next@"` base 2,
  m2 2 of 2 naming 16.4.6. Build warnings: `middleware` deprecated (X-8, for the architect) and a new "Edge Runtime is deprecated" (`/api/interactions-edge`), not in the release-notes
  reading: record as an M2-d finding for the architect.
  **Still to run for M2-c:** the suite at 16.4.6 in `m2c` (path membership against `base/suite.json`, 154 files / 2259 at the M1 tip), the `hljs` comparison against the base build
  (1 static, 2 server), and the `git diff` of `package.json`. Then write M2's own document (`implementation/018-next-upgrade-save-size-cap-m2-implementation.md`) with the lockfile table.
- **M4 reads to record (carry to the architect and UAT, M4-c):** R6 — Next 16.4.6's `layout-router.js` no longer uses `createRouterCacheKey` for the state key (it uses
  `createSegmentKey` and `useRouterBFCache`, which keeps the last N active segments in hidden `<Activity>` boundaries); a dynamic-param change still gives the new page a fresh
  state key, so B mounts fresh, but A's tree now lingers hidden: the plan's "UAT walk if the read differs" applies. R1/R2 existing tests (`layout.navigation-guard.test.tsx`,
  `NavigationGuardProvider.link-confirmation.test.tsx`) are to be run at the M3 tip.
- **M3 (built in isolation, not committed):** export `.../scratchpad/m3` (M2 state of `m2`, since removed, plus M3): `eslint.config.mjs` (flat config, based on the planner's probe; `caughtErrors: 'none'`
  kept for the TS `no-unused-vars`), `.eslintrc.json` and `.eslintignore` deleted, `src/@types/global.d.ts` directive `@typescript-eslint/ban-types` → `no-empty-object-type`, `package.json`
  (`eslint ~9.39.5`, `@eslint/js ^9.39.5`, `@eslint/eslintrc ^3.3.7`, `eslint-config-next` and `@next/eslint-plugin-next` `^16.4.6`, `eslint-plugin-import ^2.32.0`, `eslint-plugin-react ^7.37.5`,
  removed `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint-plugin-n`, `eslint-plugin-promise`) and its lockfile. It was built on the earlier M2 form (with the withdrawn `paths` entry):
  REBUILD it on revision 7's M2 (`pnpm remove …; pnpm add -D …` as in `m3/pnpm-add.out.txt`) and re-run both configs over the same sources. Captures (uncommitted) in
  `verification/018/implementation/m3/`: `base-eslint.json` (old config, 498 files, 315 errors, 383 warnings), `new-eslint.json`, `differential.txt` (22 rule ids differ; every difference
  has a cause in the plan's class — read `cause-checks.txt` and the notes in this list: react-hooks/* from `eslint-config-next` 16.4.6 (cause 1); `no-non-null-assertion`, `no-var-requires`→`no-require-imports`
  (cause 1); `member-delimiter-style` removed (cause 3); `next-env.d.ts` not linted by the new preset (cause 4); the kept TS rules `unbound-method`, `no-unnecessary-type-arguments`,
  `prefer-nullish-coalescing`, `switch-exhaustiveness-check`, `no-floating-promises`, `no-base-to-string`, `no-unsafe-return` and react's `function-component-definition`,
  `jsx-no-constructed-context-values` (cause 2, plugin version behaviour)), `ledger.md` (109 rows from `make-ledger.py`, to paste into M3's document), `lockfile-movers-m2-to-m3.txt`.
  Lint exits 1 (not 2) with the new config; the lint script's command line is unchanged (M3-e).
- **Questions sent:** none open to me. Sent earlier: steering (X-10 trigger; the shared `node_modules` ask, answered B; the M2 tsconfig finding, answered by revisions 6 and 7; the M1 hand-off).
- **Processes:** the mutation sweeps are finished; no background process of mine runs (`pstree` checked at the checkpoint). Scratch exports remain under the scratchpad (`m2b`, `m2c`, `m3`, `red-e5732b0`, work dirs): delete once M2/M3 are committed.
- **Convention checks:** `node ~/.claude/tools/convention-check.js <repo> --since=7923a1d` before every handoff (id-token check is not implemented by the tool: read basenames and titles by hand).
