---
ID: 018
Origin: 018
UUID: 6273a762
Reviewed-At: "d1bb9b0 — repos=website; CR-2 pin, Round 1 sub-entry 2 at d1bb9b0 (APPROVED); M3 Round 3 at 969d92a (APPROVED_WITH_COMMENTS); M1 sub-entry 1 at a558f2d (APPROVED_WITH_COMMENTS); M2 Round 2 at b0b0158 (APPROVED_WITH_COMMENTS)"
Status: In Review
Status-Detail: "M1 (a558f2d), M2 (b0b0158) and M3 (969d92a) each APPROVED_WITH_COMMENTS and handed to QA Phase 2. CR-2 is carried by the Planner batch; CR-5 goes to the implementer, with a Planner batch row for M2-b's wording."
Round: 3
Verdict: APPROVED_WITH_COMMENTS
---

# Code Review: 018 — Next.js 16.4.6 and the save-list cap (M1, M2, M3)

**Plan Reference**: `agent-output/planning/018-next-upgrade-save-size-cap.md`, revision 7 as read at agent-output `44efb1f` (M1's criteria unchanged since revision 5, `e45e8cf`)
**Implementation Reference**: `agent-output/implementation/018-next-upgrade-save-size-cap-m1-implementation.md` at agent-output `003515a`, `Handoff-At` `f9e66c2`
**Date**: 2026-11-20
**Reviewer**: Code Reviewer (`code-reviewer-hooks-018`)

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T05:35 | steering-roadmap-hooks (brief `steering/018-brief-code-reviewer.md`) | Round 1: review M1 at `f9e66c2` | REJECTED. CR-1 HIGH: on the capped path, an issue with an explicit message comes back with zod's default wording. Run in an isolated export. CR-2 LOW: the cap's counting relies on zod 3.22.4 internals that `^3.20.6` does not pin. Under 3.25.76 the cap misses 1,600 issues. CR-3 INFO: a count reconciled. Captures are under `verification/018/code-review/`. |
| 2026-11-20T05:40 | steering-roadmap-hooks (brief amended `1db98a7`); implementer-hooks-018 (M2 document `b4b34b6`) | Round 2: review M2 at `b0b0158` | APPROVED_WITH_COMMENTS. Reproduced in my own export: M2-a; M2-b's 46 package movers and 12 snapshot-key movers, counted by a second instrument; M2-c's build, typecheck, ts-node and highlight.js bundle checks; M2-d's warnings. The three ts-node scripts typecheck under their options at both trees. CR-4 INFO: an `@img` count does not reproduce. M1 stays REJECTED. |
| 2026-11-20T05:43 | implementer-hooks-018 (fix at website `a558f2d`, documents `802917e`) | Round 1 sub-entry 1: re-review the M1 fix diff `b0b0158..a558f2d` | M1 **APPROVED_WITH_COMMENTS**. CR-1 closed: re-attacked through both procedures' input shapes before and after the fix, and the sweep and caller list re-run. CR-2 is carried by the Planner batch (ruling 05:42Z). CR-3 and CR-4 are reconciled. |
| 2026-11-20T05:56 | implementer-hooks-018 (M3 document `8d72013`) | Round 3: review M3 at `969d92a` | APPROVED_WITH_COMMENTS. The lint differential reproduces on my own exports, and a location-level comparison finds no difference hidden behind an equal count. CR-5 LOW: the lockfile disposition cannot see 3 re-pointed production edges (generator-only path). CR-6 LOW: pre-existing convention FAILs in `global.d.ts`. |
| 2026-11-20T05:57 | implementer-hooks-018 (reconcile `1010ca9`) | Round 3 sub-entry: CR-5's record correction | The instance is corrected, and the implementer's independent edge run equals mine. The class is carried by the Planner batch candidate. M3's verdict is unchanged. |
| 2026-11-20T06:13 | implementer-hooks-018 (pin at website `d1bb9b0`, document `7c76319`) | Round 1 sub-entry 2: CR-2's zod pin | APPROVED. The exact specifier sits under `dependencies`, a frozen offline install exits 0 and resolves zod 3.22.4, and the diff is 1/1 per file. CR-2 is closed. CR-7 INFO: `paracord` and `project-utils` are git dependencies without a commit, pre-existing and a Planner batch candidate. |

## Scope and stage start

- **Stage start:** the implementation document committed at agent-output `003515a`, `Handoff-At` `f9e66c2`. That SHA is the tip of
  `chain/018-next-upgrade-save-size-cap` as read when this round opened. The branch has since moved to `b0b0158` (M2), which is out of this round.
  `f9e66c2` is a commit, so the tree under verdict is fixed by its SHA.
- **Criteria assessed this round, as the plan states them at round open:** M1-a, M1-b, M1-c, M1-d, M1-e and M1-i. M1-f is a stated
  limit and has no code. M1-g and M1-h are UAT's walks. No criterion or limb was added after the round opened.
- **Files reviewed:** every path in the implementation document's Files Modified and Files Created tables, read with
  `git show f9e66c2:<path>`.
- **Instruments:** isolated `git archive` exports of `f9e66c2`, of `7923a1d`, and of `f9e66c2` with zod 3.25.76 swapped in. Each
  ran under a `systemd-run` scope cap and used its own `pnpm install --frozen-lockfile` (the lockfile is the same in both trees:
  `git diff --quiet 7923a1d f9e66c2 -- package.json pnpm-lock.yaml`). A scratch clone at `f9e66c2` was used for the convention check.
  No command ran in the shared tree.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md` (present, tracked:
`git -C /usr/local/bin/hooks/agent-output ls-files architecture`), `architecture/website.md` A-4, and
`architecture/018-next-upgrade-save-size-cap-architecture-findings.md`
**Alignment Status**: ALIGNED, with one premise of the architect's left open (CR-2)

- All 11 sites and the import schema's top-level list use one `boundedArray` helper. It lives in `shapes.ts` beside `discordIdShape`,
  `routers/user.ts` imports it, and its type is the `z.array` input and output with the one cast inside (M1-d, AF-1). The new
  constants follow A-4: one in the barrel, one beside `MAX_MESSAGES`.
- `isolatedUnion` is one helper used at the three plain-union sites. It is typed as `z.ZodType<…>`, not as `ZodUnion` (AF-9).
- `cappedInput` keeps a per-parse count with no global and no `setErrorMap`, uses a synchronous `safeParse`, and throws a
  `ZodError` (AF-8). tRPC 11.10.0's `getParseFn` (installed `dist/initTRPC-RoZMIBeA.mjs`) checks for `parseAsync` before any other
  validator form, so tRPC calls the wrapper's `parseAsync`.
- The architect's premise that "zod 3.22.4's `makeIssue` runs each map for every issue" holds at 3.22.4. The manifest does not pin
  that version: CR-2.
- **Mirror claim (Patterns Extended).** The `.max(CONST)` form is set aside on purpose, and the reason is given (`refute-zod-max`).
  I re-ran the sweep at `f9e66c2` over production `src` (`git grep -n -E "z\.array\(|\.array\(" f9e66c2 -- src ':!**/__tests__/**'`)
  and got 4 hits: `boundedArray`'s two `z.array` and two commented-out lines (`guild.ts`, `user.ts`). That matches the implementer's
  4. The union predicate `z\.union\(|\.or\(` over production `src/server` gives 2 hits: `previewImage.ts:33`, which is Kysely's
  `eb.or` and not zod, and `isolatedUnion`'s own `z.union`. Input sites: see CR-3. No reference query (Serena or language server)
  was available in this session either. The second instrument is the typecheck below.

## TDD Compliance Check

**TDD Table Present**: Yes
**All Rows Complete**: Yes. Each row names a red capture under `verification/018/implementation/m1/`.
**Concerns**:
- `tdd-check.py` covers Python only. These sources are TypeScript, so it cannot run here. I read the rows instead.
- No assertion covers M1-b's `message` limb on the capped path for an explicit-message issue. That is how CR-1 got through.
  `shapes.error-cap.test.ts` "keeps 20 issues and adds one summary issue at the 21st" uses only default-message issues.
- Expectations are independent. Every expected issue in the specs I read is a literal, and none is computed from the M1 schema's own
  output.
- Test authorship: every test is spec-form, with no `// escaped:` line and no bug-form title. The 8 new test files match the
  positive basename form, and the ID-token class matches 0 basenames, 0 titles and 0 comment lines (`grep -c -i -E` over the 8
  files, run in the scratch clone). Helpers sit under `__tests__/helpers/`.
- **Re-derived:** `pnpm run typecheck` (both programs) in the `f9e66c2` export exits **0**
  (`verification/018/code-review/typecheck-f9e66c2.txt`). The first run exited 2 on `TS2307 '~/assets/img/product_image.png'`
  because the export lacked the generated, git-ignored `next-env.d.ts`. I added its three reference lines to the export only, and the
  file records this. `git diff -U0 7923a1d f9e66c2 -- shapes.ts` contains `satisfies` 0 times.
- **Not re-derived here:** the suite counts (2259/2259 exit 0, base 1913/1913) and the mutant sweeps. Running the project suite is
  QA's job. See the Assumption Not Checked.

**Convention check** (`node ~/.claude/tools/convention-check.js <scratch clone at f9e66c2> --since=7923a1d`,
`verification/018/code-review/convention-check-f9e66c2.txt`): 13 files examined, 8 test files, **0 FAIL, 0 CANDIDATE, 3 SKIP**. The
three skips were not checked by the tool:
- `node_modules`: outside the examined set.
- id-token basename: the tool found no `TEST-CONVENTIONS.md` above a clone outside the workspace. The `grep` above covers that class.
- eslint: it exited 2 in the export with "couldn't determine the plugin "react" uniquely". The base lint configuration is out of scope
  (X-6).

The one comment line M1 adds is `// eslint-disable-next-line @typescript-eslint/no-unsafe-return` in `cappedInput`, and comment-gate
passes it.

## Adversarial execution

The change is an input bound on two signed-in procedures. It is not an auth gate and not an irreversible action. I attacked it at
the parser that tRPC calls: `cappedInput(z.object({ message: optionalIdMessageShape }))` over the real `shapes.ts`, the same
construction `message.ts` `upsert` passes to `.input`. The base used `z.object({ message: optionalIdMessageShape }).safeParse`.

- **Input class:** saves with more than 20 issues, where an issue with an explicit message falls among the first 20 kept.
- **Oracle:** M1-b. The first 20 issues must have the same `code`, `path` and `message` as the base, then the summary.

I did not stand up an HTTP server. M1-h's post-deploy row covers the route.

## Findings

### Critical
None.

### High

**CR-1 HIGH Round 1 Correctness**: The capped refusal reports an explicit-message issue with zod's default wording
- **Location**: `src/server/api/utils/shapes.ts` `cappedInput`, the `errorMap` closure (`seen.push({ ...issue, message: ctx.defaultError })`), at `f9e66c2`.
- **Class**: The capped path takes each kept issue's `message` from a different source than the uncapped path. The capped path builds
  it in the error map from `ctx.defaultError`. The uncapped path, and zod itself, use `issueData.message || defaultError`. So any
  issue created with an explicit `message` is reported with the wrong text on the capped path only.
- **Enumeration**: `git grep -n -E "message:|\.(max|min|length|regex|url|refine|datetime|int|nonnegative)\([^)]*,\s*['\`{]|errorMap|required_error|invalid_type_error" f9e66c2 -- src/server/api/utils/shapes.ts src/server/api/routers/user.ts src/server/api/routers/message.ts src/server/api/utils/user.ts src/constants`
  gives 19 hits. 15 are not schema issues: `TRPCError` messages in `message.ts` and `utils/user.ts`, the `message:` keys of
  `upsert`'s and `updatePreferences`' input objects and of a return value, and `cappedInput`'s own `errorMap` lines. Of the
  schema-issue sources in the two procedures' inputs:
  - `refineDisplayableText`'s `ctx.addIssue({ … message: … })` is in the class. Both procedures reach it through `messageShape.data`.
  - `cappedInput`'s summary issue is never routed through the map.
  - The union replay, `ctx.addIssue({ ...issue, fatal })` in `isolatedUnion`, carries an explicit message. Today that message equals
    the default for its code, because the inner `union.safeParse` runs with the default maps only. It is a member that is latent
    today.

  What the predicate cannot see: a message passed through a variable options object or a `z.custom` params object, a message set in
  a schema imported from another module, and any future schema wrapped in `cappedInput`, which is generic.
- **Issue (run, not read)**: Take an `upsert` input whose `data` holds 19 non-fatal issues (one bad `avatar_url` and 3 embeds with 6
  bad URLs each), plus two text displays of 2,500 characters each, so the displayable-text refinement runs and adds issue 20, plus
  `id: 'abc'`. The base refuses with 22 issues, and issue index 19 is `too_big` at `message.data.components` with "Components
  displayable text size exceeds maximum size of 4000". The tip keeps 20 issues and adds the summary, but index 19 reads "String must
  contain at most 4000 character(s)". With the `id` removed (20 issues, uncapped), the tip's line matches the base.
  - Files: `verification/018/code-review/m1-capped-message/` (`inputs.ts`, `probe-tip.capmsg.test.ts`, `probe-base.capmsg.test.ts`,
    `out-tip.json`, `out-base.json`, run logs; both runs exit 0).
  - This breaks M1-b ("the same first min(k, 20) issues": `code`, `path` and `message`). Save As and the new-message modal would show
    a reason that names a 4,000-character string limit the user did not exceed.
  - **Magnitude** (measured on zod 3.22.4): 1 line wrong out of 21. It happens whenever the displayable-text issue is among the 20
    kept issues and at least one more issue follows it. The `id` key comes after `data` in both procedures (`messageShape.extend`
    puts `id` last), so both procedures reach this case.
  - It is HIGH because a criterion the change claims to meet fails, and no assertion catches it (the severity floor makes it at
    least MEDIUM).
- **Required Action**: eliminate the second source of `message`.
  - **Preferred (structural)**: the capped path records each kept issue's message the same way zod does, through one expression used
    by both paths. In the error map that is `issue.message ?? ctx.defaultError`, both for what `seen` records and for what the map
    returns. With this fix the capped path cannot diverge from `result.error.issues` on any issue. `cappedInput` has two callers
    (`message.upsert` and `user.updatePreferences`), and neither changes in any other way. Their uncapped refusals are untouched,
    because the map's return value is ignored when `issueData.message` is set.
  - **Minimum**: the same one-expression change, which here is also the structural form.
  - **Spec**: add a case to `shapes.error-cap.test.ts`. It drives `cappedInput` over a schema whose input produces more than 20 issues
    and includes an issue with an explicit message at a kept position that is **neither first nor last** of the 20. The expected
    message is a literal string. **Falsity signature at `f9e66c2`:** the equality assertion fails and shows the default wording
    (e.g. "Invalid input") where the literal is expected. This is an assertion failure, not a timeout. Show the case red at
    `f9e66c2` before the fix.

### Medium
None.

### Low/Info

**CR-2 LOW Round 1 Dependency**: The cap's counting depends on a zod internal that the manifest does not pin
- **Location**: `src/server/api/utils/shapes.ts` `cappedInput` (the count lives in the error map) and `isolatedUnion` (replays
  issues with an explicit `message`); `package.json` `"zod": "^3.20.6"` (the importer resolves 3.22.4 at `f9e66c2` and at `b0b0158`).
- **Class**: A safety bound that counts in zod's error map assumes the map runs for every issue. zod 3.22.4's `makeIssue` does run it
  for every issue (`lib/helpers/parseUtil.js`). zod 3.23.8's `makeIssue` returns early when `issueData.message !== undefined`
  (read from the packed tarball). `^3.20.6` admits up to 3.25.76 (`npm view zod@^3.20.6 version`).
- **Enumeration**:
  - Issues that skip the map at zod 3.23 and later: every issue `isolatedUnion` replays, from the 3 call sites
    (`git grep -n "isolatedUnion(" f9e66c2 -- src` gives 3), and `refineDisplayableText`'s one issue (CR-1's enumeration).
  - Unpinned dependency specifiers: `zod` only (`grep '"zod"' package.json`).
  - What the predicate cannot see: other zod internals the helpers rely on, such as `pipe` returning on a dirty first stage and the
    abort on a `fatal` issue (OQ-3's deciding source). Those are not enumerated here.
- **Issue (run)**: Same probe, export of `f9e66c2` with `node_modules/zod` pointed at 3.25.76
  (`m1-capped-message/probe-zodversion.capmsg.test.ts`, `out-zodversion-tip.json`, `out-zodversion-tipz.json`). Input: 40 containers
  of 40 sections, each with an invalid accessory.
  - At 3.22.4: 21 issues, 4,049 characters, summary present.
  - At 3.25.76: **1,600 issues, 317,602 characters, no summary**. That is about 20 times M1-i's 16 KB bar.
  - The guard that should catch a version move: `shapes.error-cap.test.ts` "the plain unions of the message shape" counts the map's
    calls (`created`). By reading, under 3.23+ it should give `created: 0`, not 6, and fail. I did not run it (the suite is QA's),
    so the guard is inferred, not measured.
  - Today the lockfile resolves 3.22.4 and installs are frozen. D-6 lets this chain upgrade packages, and M2 regenerated the
    lockfile. The hazard is latent, not live, so it is graded LOW.
- **Required Action**: make the mechanism's version premise part of the manifest, not something the lockfile happens to give.
  - **Preferred (structural)**: pin `zod` to `3.22.4` exactly in `package.json` (pnpm reads `dependencies`; D-6 allows it), so no
    install can resolve a version where the map is skipped. Name the premise in A-4's "List bounds" line, which the architect owns.
  - **Minimum**: keep the specifier, record the premise in A-4, and have QA confirm at Phase 2 that the "plain unions" spec fails
    under zod 3.25.76. The falsity signature to record is `expected { created: 0, returned: 6 } to deeply equal { created: 6, returned: 6 }`.
  - This can go to the Planner batch. It does not block alone.

**CR-3 INFO Round 1 Record**: The implementer's count of input sites is one off; the substance holds
- **Location**: implementation document, Patterns Extended, "Sibling sweep" row ("`\.input\(` over `src/server`: 14 hits, 2 wrapped").
- **Class**: A published count that does not reproduce.
- **Enumeration**: `git grep -c -E "\.input\(" f9e66c2 -- src/server` gives `guild.ts:4`, `message.ts:7`, `user.ts:2`, so 13 lines.
  Two of them are commented out (`guild.ts`, `user.ts` `messages` arrays). That leaves 11 live sites, 2 of them wrapped. None of the
  other 9 takes a list (each read).
- **Required Action**: correct the figure in the implementation document with a dated reconcile note when it is next touched. This
  does not change anything a decision reads.

## Verdict

**Status**: REJECTED
**Rationale**: CR-1 HIGH. M1-b's `message` limb fails on the capped path for any explicit-message issue among the kept 20. This is
shown by a run against the real schema in an isolated export, and no spec covers it. The fix is one expression plus one spec. The
rest of M1 conforms:
- the 11 sites and the import list use one fatal length-first helper;
- the three unions use one isolation helper;
- the per-parse synchronous cap returns 21 issues of at most 5,011 characters on the measured bodies (the implementer's figures;
  21 issues and 4,049 characters in my 40×40 accessory run);
- the composer cut and the server slice read one constant;
- typecheck exits 0 and the `satisfies` clauses are untouched.

## Required Actions

1. CR-1: change the cap's error map to `issue.message ?? ctx.defaultError` for both the recorded and the returned message. Add a
   spec with an explicit-message issue at a kept position that is neither first nor last, red at `f9e66c2`. Record both in the
   implementation document's TDD table.
2. CR-2 (optional this round, Planner batch otherwise): pin `zod` exactly, or record the premise and its falsity check as stated.
3. CR-3: reconcile note.

## Assumption Not Checked

- Round 1: This review assumes the implementer's suite runs at `f9e66c2` (2259 passed of 2259, exit 0) and its mutant sweeps
  (27 of 35 generated mutants killed plus the dispositioned survivors, 28 of 30 named mutants killed on the first run), and does not
  re-run them.
  - **Falsity signature:** a vitest JSON at the fix SHA with `numFailedTests > 0`, a process exit other than 0, or a named mutant
    from `named-mutants-bfc790d.json` surviving when re-run.
  - **Owner:** QA Phase 2 on M1.

## Round 1, sub-entry 1 — M1 fix at `a558f2d`

**Scope:** the fix diff `b0b0158..a558f2d` (website, the implementation documents at agent-output `802917e`).
- Three commits: red specs `c357095`, fix `b639dbe`, lint `a558f2d`.
- Three files: `shapes.ts` (+3/-2, `cappedInput`'s error map only), `shapes.error-cap.test.ts` (+17) and
  `message.save-limits.test.ts` (+21/-2).
- Nothing outside the findings' scope changed, so this is a sub-entry of Round 1, not a new round.
- `a558f2d` is on `chain/018-next-upgrade-save-size-cap`, with M2 (`b0b0158`) below it. The lockfile and `package.json` are identical
  at the two SHAs.

**CR-1: the class is gone.**
- **Re-attack.** I ran a new probe rather than relying on the specs (`verification/018/code-review/m1-fix1/`). It runs both
  procedures' input shapes, each wrapped in the real `cappedInput`, in exports of `b0b0158` (before the fix) and `a558f2d` (after),
  over one install.
- **`upsert`, with `id: 'abc'` after the data:** before the fix, the displayable-text line reads "String must contain at most 4000
  character(s)"; after, it reads "Components displayable text size exceeds maximum size of 4000". 21 issues, with the summary.
- **`updatePreferences`' `message`:**
  - `id: 'abc'` is accepted by `partialMessageShape.id` (`z.string().optional()`), so that input stays at 20 issues and is not
    capped. The implementer's point (b) is right for that input.
  - `id: 5` is **not** accepted, and the issue it adds follows `data`. Before the fix, the displayable-text line reads "String must
    contain at most 4000 character(s)"; after, it reads correctly. So Round 1's statement that both procedures reach the class
    stands; only the `'abc'` example was upsert-specific.
  - The class lives in `cappedInput`, which both callers share. The shared-helper spec covers it for any caller, so no
    procedure-level spec is owed for `updatePreferences`.
- **Sweep re-run at `a558f2d`:** the text predicate gives 17 hits (message.ts 11, user.ts 1, shapes.ts 4, utils/user.ts 1). It is 19
  at `f9e66c2` because the two map lines no longer contain `message:`. The schema-issue sources are unchanged:
  `refineDisplayableText`, the union replay, and the summary.
- **Reference check:** `git grep -n "cappedInput("` outside tests gives 2 callers (`message.ts` `upsert`, `user.ts`
  `updatePreferences`). Neither changes other than through the map. `ctx.defaultError` now appears once, in the one expression
  `issue.message ?? ctx.defaultError`, used for both what `seen` records and what the map returns. There is one source of `message`.
- **`??` against zod's `||`** (implementer's point (a)): the two differ only for an explicit empty-string message.
  `git grep -c -E "message:\s*(''|\"\"|\`\`)" a558f2d -- src` finds no such message. This residue has no member, so it is not a
  finding.
- **Specs:** both new specs are spec-form and use literal expectations.
  - `shapes.error-cap.test.ts` puts the explicit-message issue at kept index 10 of 20 (neither first nor last) and asserts its
    neighbours.
  - `message.save-limits.test.ts` asserts index 19 and the summary through `upsert`'s caller.
  - The implementer reports both as red at the unfixed code at assertion level ("'The flag is not allowed' vs 'Invalid input'"). I
    did not re-run the suite. The pre-fix probe output above shows the same defect on the same tree.
- **Mutant F-3** (the map returns the default): the implementer calls it equivalent, citing zod 3.22.4 `makeIssue`'s
  `issueData.message || errorMessage`, which ignores the map's return value whenever a message is set. I accept this. I read the same
  line at 3.22.4 in Round 1.
- **Disposition (two parts):** the class is gone (probe `m1-fix1/out-a558f2d.json`). If it returns, these fail:
  `shapes.error-cap.test.ts` "keeps the message an issue was created with, at a kept position that is neither first nor last" and
  `message.save-limits.test.ts` "words the displayable-text issue as it does uncapped when an issue follows it".

**CR-2:** routed by steering's ruling (`steering/018-rulings.md` block "2026-11-20T05:42Z", `f391462`) to the plan's Planner batch.
The plan's Planner batch row "CR-2 LOW" carries it, and the pin lands after the fold. It is not owed at `a558f2d`. `no test` in this
sub-entry.

**CR-3:** reconciled in the M1 document (13 lines, 11 live), at agent-output `802917e`. **CR-4:** reconciled in the M2 document
(27 `@img` names).

**Verdict (Round 1, M1):** **APPROVED_WITH_COMMENTS** at `a558f2d`. CR-1 is closed. CR-2 is carried by the Planner batch. CR-3 is
closed.

**Assumption Not Checked (sub-entry):** this review assumes the suite at `a558f2d` (2261 of 2261, exit 0) and the two new specs' red
runs at `b639dbe^`, and does not run them.
- **Falsity signature:** a vitest JSON at `a558f2d` with `numFailedTests > 0` or a non-zero exit, or either new spec passing at
  `c357095`.
- **Owner:** QA Phase 2 on M1.

## Round 1, sub-entry 2 — CR-2's zod pin at `d1bb9b0`

**Scope:** the fix diff `969d92a..d1bb9b0`, recorded in the M2 implementation document's section "Zod pin (CR-2)" at agent-output
`7c76319`. It changes two lines:
- `package.json` `dependencies.zod`: `^3.20.6` → `3.22.4`;
- the website importer's `zod` `specifier` in `pnpm-lock.yaml`.

`git diff --numstat` gives 1/1 on each file, and no other line in either file changes. The fix lands after the Planner batch fold,
as steering's ruling at 05:42Z set out. Nothing outside CR-2's scope changed, so this is a sub-entry of Round 1, not a new round.

**CR-2: the class is gone, re-checked from first principles** (`verification/018/code-review/cr2-pin/`):
- **Where pnpm reads the pin:** `zod` is under `dependencies`, with no `devDependencies` entry and no `pnpm.overrides`. pnpm does
  read the importer's own `dependencies`, which is the gap audit I-6 named for `overrides`.
- **Install and resolution:** in an isolated export of `d1bb9b0`, `pnpm install --frozen-lockfile --offline` exits 0. `zod`
  resolved from `src/server/api/utils` (where `cappedInput` imports it) is 3.22.4.
- **Can the manifest still admit 3.23 or later?** No. The specifier is exact, so no install can resolve a version where `makeIssue`
  skips the error map. The implementer's control shows that a lockfile disagreeing with the manifest is refused under
  `--frozen-lockfile`: `package.json` edited alone exits 1.
- **Two-part disposition:**
  - The class is gone: the specifier admits 3.22.4 only.
  - Checks that fail if it returns: `shapes.error-cap.test.ts` "the plain unions of the message shape" (the map-call count, which by
    reading goes to `created: 0` under 3.23+) and `--frozen-lockfile` refusing a specifier and lockfile that disagree.
- **Unchanged:** the resolved version stays 3.22.4, so no edge moves. The suite, typecheck and build results at `d1bb9b0` are the
  implementer's runs, which I did not re-run.

**CR-7 INFO Round 1 Dependency (pre-existing; the implementer's report)**: `paracord` is an unpinned git dependency
- **Location**: website `package.json` `paracord` (`github:mr-tech/paracord`, no commit). The lockfile records `3f20308` (0.0.5).
- **Class**: A git dependency without a commit lets any lockfile regeneration move it.
  - The implementer saw `pnpm install --lockfile-only` re-resolve it to `1b7cadb` (0.0.9), carrying a second `zod` tree. I did not
    re-run that.
  - Frozen installs are not affected.
- **Enumeration**: `git show d1bb9b0:package.json` lists `github:` dependencies without a `#<sha>` (`paracord`) and with a branch
  (`project-utils#master`). Both re-resolve on regeneration. What the predicate cannot see: tarball or URL dependencies.
- **Required Action**: none in this chain. It predates it. Pinning both by commit is a Planner batch candidate (`pinned-dep-shipping`
  covers the method). The implementer was right to discard the regenerated lockfile and edit the one specifier line by hand.

**Verdict (Round 1, sub-entry 2):** **APPROVED** at `d1bb9b0` for CR-2. The M1 and M2 verdicts are unchanged.

## Round 2 — M2 at `b0b0158`

**Stage start:** steering widened my brief to cover every milestone the implementer hands off (`steering/018-brief-code-reviewer.md`,
`1db98a7`). This round starts at the M2 implementation document, committed at agent-output `b4b34b6` with `Handoff-At` `b0b0158`.
`b0b0158`'s only parent is `f9e66c2`, and its diff touches `package.json`, `pnpm-lock.yaml` and `tsconfig.json` and nothing else.
M2 is capped (`steering/018-rulings.md` block "2026-11-20T05:26Z"). A gap below HIGH therefore goes to the Planner batch as a stated
limit and does not open another round.

**Criteria assessed** (plan revision 7, § M2, unchanged since this round opened): M2-a, M2-b, M2-c and M2-d. M2-e is UAT's walk.
Security runs M2-a's `pnpm audit`.

**Instruments:**
- An isolated `git archive` export of `b0b0158`, installed with `pnpm install --frozen-lockfile` (exit 0), with no `.env` and
  `SKIP_ENV_VALIDATION=1`. Each run was under a `systemd-run` cap.
- A second export of `f9e66c2`, used as the control for the scripts check.
- Every capture is under `verification/018/code-review/m2/`.

**What I ran:**
- **M2-a.** `grep -c -E "^  next@"` gives 2 at `f9e66c2` and 2 at `b0b0158`: `  next@16.4.6:` and
  `  next@16.4.6(@babel/core@7.29.7)(…)`. Both name 16.4.6.
- **M2-b, `package.json` and `tsconfig.json`.** The `package.json` diff is exactly the three specifiers (`next`,
  `@next/bundle-analyzer`, `highlight.js`). The `tsconfig.json` diff is exactly the two keys
  (`compilerOptions.moduleResolution` `bundler`, and `ts-node.compilerOptions.moduleResolution` `node`).
- **M2-b, lockfile movers.** I used a different instrument from the implementer's Python script: `awk` over each section's
  two-space keys, then `sort` and `comm`.
  - `packages:` keys go from 1524 to 1527, the same figures the implementer gives. The key diff has 85 lines
    (`packages-key-diff.txt`), which reduce to 46 mover names (`mover-names.txt`): `next`, `@next/env`, 8 `@next/swc-*`,
    `@next/bundle-analyzer`, `@swc/helpers`, `postcss`, `baseline-browser-mapping`, `caniuse-lite`, `highlight.js`, `sharp`,
    `semver`, `@emnapi/runtime`, and 27 `@img/*`.
  - Every one of the 46 is in the implementer's disposition table. Nothing moved that the table leaves out.
  - Snapshot keys whose package version is the same in both trees but whose key text changed: 12 (`snapshot-key-text-movers.txt`).
    These are the 6 `next` peers the plan names and the 6 vitest-toolchain keys the implementer reports. That matches its list.
  - zod still resolves 3.22.4 in the importer (CR-2).
- **M2-c.**
  - `next build` exits 0 (`build.out.txt`). `tsconfig.json` is byte-identical before and after the build (`cmp`). The output has 0
    lines matching "mandatory".
  - `pnpm run typecheck` exits 0 (`typecheck.out.txt`).
  - `ts-node -r tsconfig-paths/register -T -e "require('~/utils/limits')"` exits 0, and the same command without `-T` (type-checked)
    also exits 0.
  - Files containing `highlightAuto`: 1 under `.next/static`, 2 under `.next/server`. The same counts hold for `registerLanguage`
    (1 and 2).
  - `(void 0).getLanguage(` or `.highlight(` receivers: 0 files. The predicate matches the real form in QA's
    `B-getLanguage-context.txt` and a planted file under `.next` (1 file).
- **Beyond the plan's check, the three ts-node scripts** (`lang`, `push-commands`, `backfill-valid`). The plan names them as at risk
  but checks only `limits.tsx`. Running them would publish Discord commands or write to a database, so I did not run them. Instead,
  `tsc -p tsconfig.scripts-probe.json` checks their three entry files under the `ts-node` block's options (`module` `commonjs`,
  `moduleResolution` `node`, the tsconfig's `include`). It gives exit 0 and 0 errors at both `b0b0158` and `f9e66c2`, with identical
  output (`scripts-probe-*.out.txt`, `scripts-probe-diff.txt` empty).
- **M2-d.** The build prints the `middleware` deprecation and the new "Edge Runtime is deprecated" warning, both reproduced. The
  implementer already routed the second to the architect, and it is plan R-8's M2-I3. No new finding.

**Architecture Alignment:** ALIGNED.
- `bundler` is the value Next 16.4.6 writes as a mandatory change, and the build leaves the file unchanged.
- The `ts-node` key keeps A-4's import check runnable, re-run above.
- `src/@types/highlight.js.d.ts` (an augmentation of `Emitter`/`Node`) is untouched and typechecks against 11.12.0's own types.

**TDD Compliance:** the table states the exemption "not feature code", a dependency and configuration move. Per workflow step 5, the
exemption is checked by execution. The build, typecheck, ts-node and bundle checks above were run on this tree. Suite parity
(2259 of 2259, same per-file counts as the M1 tip) is the implementer's run and is QA's to re-run (Assumption Not Checked). No test
file changed, so the convention check has nothing to examine.

### Findings (Round 2)

**CR-4 INFO Round 2 Record**: The `@img/*` count in the M2 movers table does not reproduce
- **Location**: `implementation/018-next-upgrade-save-size-cap-m2-implementation.md`, M2-b movers table, row "`@img/sharp-*` (22 packages), `@img/sharp-libvips-*` (11), `@img/colour`".
- **Class**: A published count that does not reproduce.
- **Enumeration**: `grep -c -E '^@img/sharp-libvips' mover-names.txt` gives 10. `grep -c -E '^@img/sharp-[^l]|^@img/sharp-linux' mover-names.txt`
  gives 16. Adding `@img/colour` gives 27 `@img/*` names in total, against the table's 22 + 11 + 1 = 34. What the predicate cannot
  see: the 85-line key diff is reduced to names, so a name the table counts once per version would count differently. All 27 names
  are dispositioned under the same `sharp` row either way.
- **Required Action**: a dated reconcile note in the implementation document. This changes nothing a decision reads. Under M2's cap,
  no round is owed.

### Verdict (Round 2)

**Status**: APPROVED_WITH_COMMENTS (M2 only, at `b0b0158`).
**Rationale**: every criterion I could run reproduced on my own export: M2-a, M2-b's movers by a second instrument, M2-c's build,
typecheck, ts-node and bundle limbs, and M2-d's warnings. The only finding is a record count (CR-4 INFO). M1 stays REJECTED at
`f9e66c2` (Round 1, CR-1). This verdict does not cover M1 and does not cover the M1 fix that will land under M2.

### Assumption Not Checked (Round 2)

- This review assumes the suite passes at `b0b0158` on Next 16.4.6 (2259 of 2259, exit 0, the same 154 files and per-file counts as
  the M1 tip) and does not run it.
  - **Falsity signature:** a vitest JSON from an export of `b0b0158` with `numFailedTests > 0`, a process exit other than 0, or a
    file whose (cases, passed) differs from the M1 tip's.
  - **Owner:** QA Phase 2 on M2.

## Round 3 — M3 at `969d92a`

**Stage start:** this round starts at the M3 implementation document, committed at agent-output `8d72013` with `Handoff-At`
`969d92a`. The implementer handed it over, and steering's amended brief (`1db98a7`) covers every milestone the implementer hands
off.
- `969d92a`'s only parent is `a558f2d`.
- The diff touches six paths: `eslint.config.mjs` (new), `.eslintrc.json` and `.eslintignore` (deleted), `package.json`,
  `pnpm-lock.yaml` and `src/@types/global.d.ts` (one directive).
- The `lint` script's line is unchanged.
- M3 is not under M2's cap.

**Criteria assessed** (plan § M3, unchanged since revision 7): M3-a, M3-b, M3-c, M3-d, M3-e, plus the lockfile disposition "in the
M2-b form".

**Instruments.** I used isolated exports of `a558f2d` (the base config) and `969d92a`, each installed with
`pnpm install --frozen-lockfile`. For one of the production-edge comparisons I also used an export of `f9e66c2`. Captures are under
`verification/018/code-review/m3/` (see the README there).

**What I ran:**
- **M3-a.** `eslint .` in the `969d92a` export exits **1** (not 2). `git cat-file -e` finds no `.eslintrc.json` and no
  `.eslintignore` at `969d92a`; both are present at `a558f2d`.
- **M3-c, re-derived and widened.** The plan's differential compares per-rule counts. I also compared findings location by location
  (path, line, column, rule) to break that predicate: a rule whose count stays equal while its findings move would be invisible to a
  count comparison.
  - **Files:** 498 → 497. The only one dropped is `next-env.d.ts`.
  - **Findings:** 665 → 774.
  - **Counts:** 19 rule ids differ, the implementer's 21 less two. The two are `import/extensions` and `quotes`, which fire on the
    `routes.d.ts` import line of a full `next-env.d.ts`. My copy carries only the reference lines, which also accounts for the 665
    against the implementer's 669.
  - **Location level:** **0** rule ids keep an equal count while their findings move.
  - **Base findings absent from the new run:** exactly the 51 `no-non-null-assertion` (cause 1), the 11 `member-delimiter-style`
    (cause 3) and the 1 `no-var-requires` (cause 1, now `no-require-imports`).
  - Every remaining difference is an addition under a rule id the implementer's table names with a cause.
  - **File kinds:** 0 `.mjs`/`.cjs`, 4 `.js`/`.jsx` and 494 → 493 `.ts`/`.tsx` (grep counts over each file list). ESLint 8 did not
    lint `.mjs` either, so the new `**/*.mjs` and `**/*.cjs` ignores keep the base set. The two tracked `.mjs` files
    (`eslint.config.mjs`, `src/env.mjs`) are linted by neither config.
- **M3-b.** I read the ledger's 109 rows against `git show a558f2d:.eslintrc.json` and the new `eslint.config.mjs`. Every top-level
  and override rule is present in the new config with the same options, with three exceptions, each with a stated disposition:
  - the five rules typescript-eslint 8 removed;
  - `caughtErrors: 'none'` added (M3-d item 19);
  - the `no-restricted-syntax` `next/dynamic` selector, carried verbatim.
- **M3-d.** I checked the rows against the config: `reportUnusedDisableDirectives: 'off'`, `caughtErrors: 'none'`, the `files`
  globs, and the directive edited to `no-empty-object-type`.
- **M3-e.** The `lint` script line is unchanged at both SHAs, and lint stays red (exit 1).
- **Convention check** at `969d92a` (`--since=a558f2d`, scratch clone): 2 files examined, **14 FAIL**, 0 CANDIDATE, 6 SKIP. All 14
  are in `src/@types/global.d.ts` (13 `@typescript-eslint/no-unused-vars`, 1 `max-len`), and they are identical, line by line, to
  the base config's findings in that file (CR-6). The SKIPs:
  - the deleted config files;
  - `package.json`, `pnpm-lock.yaml` and `node_modules` (outside the examined set);
  - the id-token basename check (no test file in M3).
- **Lockfile, by a third instrument.** The production dependency closure (`pnpm list --prod --depth Infinity --json`), compared edge
  by edge (`prod-edges.py`). This produced CR-5.

**Architecture Alignment:** ALIGNED. M3 is tooling configuration, and no architecture record entry describes the lint setup beyond
X-6 and X-17, which stay as they are.

**TDD Compliance:** the exemption "not feature code" holds. I checked it by executing both configs over the same sources, as above.

### Findings (Round 3)

**CR-5 LOW Round 3 Dependency record**: The M2-b-form lockfile disposition cannot see a dependency edge re-pointed between
versions that both stay in the lockfile, and M3's record states that no runtime dependency moves
- **Location**: `implementation/018-next-upgrade-save-size-cap-m3-implementation.md` § "Lockfile disposition (M2-b form)" (the
  sentence "No runtime dependency moves (the closure check: `next`, `highlight.js`, `react` are outside it)") and its instrument
  `verification/018/implementation/m2/lockfile-movers.py` (a name moves only when its *set of versions* changes).
- **Class**: A lockfile disposition that compares per-name version sets cannot see a consumer whose dependency is re-pointed from
  one version to another when both versions stay in the lockfile for other consumers. A "no runtime move" claim built on a
  "mover lies inside the lint closure" check cannot see a mover that also lies inside the production closure.
- **Enumeration**: `prod-edges.py` over `pnpm list --prod --depth Infinity --json` of exports at `a558f2d` and `969d92a` gives
  2186 → 2192 edges, 4 removed and 10 added (`prod-edges-compare.txt`). These are 3 re-pointed edges and their children, all under
  `website > project-utils > prisma-kysely > @prisma/internals`:
  - `globby@11.1.0 > fast-glob` 3.2.12 → 3.3.1;
  - `resolve@1.22.4 > is-core-module` 2.13.1 → 2.16.1 (and its `hasown` 2.0.0 → 2.0.2);
  - `make-dir@4.0.0 > semver` 7.5.4 → 7.8.6.

  None of `fast-glob`, `hasown`, `is-core-module` or `semver` appears in the implementer's `lockfile-movers-m2-to-m3.txt` or
  `lockfile-closure.txt`. The same instrument over M2 (`f9e66c2` → `a558f2d`) gives 68 removed and 76 added edges. Every one belongs
  to a class M2-b names (`next` and its declared dependencies, `sharp`, `@next/bundle-analyzer` and its own dependencies, the
  version-text peers), so M2 has no member.

  What the predicate cannot see: optional platform packages not installed on this host, and dev-only edges. A dev-only re-pointing
  inside the lint tree is M3's expected class anyway.
- **Issue (magnitude, read, not run)**: `prisma-kysely` is a Prisma generator. In project-utils `749606d` it is named only in
  `package.json` and `prisma/schema.prisma` (`git grep -c` outside `package.json` and lockfiles: 1, the schema). So by reading, the
  re-pointed packages are not loaded by the site at runtime or by `next build`. All four new versions are inside their consumers'
  ranges. The effect is a false sentence in a release record plus an instrument blind spot. No runtime defect was found.
- **Required Action**: eliminate the blind spot from the disposition, not only this instance.
  - **Preferred (structural)**: the M2-b-form disposition gains an edge-level comparison of the production closure (`prod-edges.py`
    or the lockfile's `snapshots:` dependency maps). Every changed edge is itemised with a disposition. The "no runtime dependency
    moves" sentence is stated only from that comparison.
  - **Minimum**: correct the M3 document's sentence with a dated reconcile note. List the 3 re-pointed edges and their children,
    with the disposition "generator-only path, not loaded at runtime (project-utils read)".
  - Either way, a Planner batch row for M2-b's wording. This does not block QA.
- **Disposition** (Round 3 sub-entry, from agent-output `1010ca9`, document only, website `Handoff-At` still `969d92a`):
  - **The instance is gone.** The M3 document's sentence now states the three re-pointed edges and gives them the generator-only
    disposition.
  - **The edge sets match.** The implementer re-ran the edge comparison independently
    (`verification/018/m3-reconcile/prod-edges-a558f2d-969d92a.txt`), and its edge set is identical to
    `m3/prod-edges-compare.txt`. I compared the two after normalising indentation, with `diff` exiting 0.
  - **The class stays open in M2-b's form.** The planner carries it as the Planner batch candidate (my message of Round 3).
  - **Check that fails if the class returns:** `no test`. The instrument is `m3/prod-edges.py`.

**CR-6 LOW Round 3 Conventions (pre-existing)**: The convention check reports 14 FAIL in `src/@types/global.d.ts`, the one source
file M3 touches
- **Location**: `src/@types/global.d.ts` at `969d92a`: unused type imports on lines 4 and 15–28, and `max-len` on line 12.
- **Class**: Lint findings in a file the change touches, outside the line it changes.
- **Enumeration**: `convention-check.js <clone at 969d92a> --since=a558f2d` gives 14 FAIL, all in this file. The same 14
  (path, line, column, rule) occur in the base config's run (`findings-a558f2d.tsv` and `findings-969d92a.tsv`, the file's lines
  identical). The check examines changed files whole, so it cannot tell a pre-existing finding from a new one; the base run is what
  separates them.
- **Issue**: they are pre-existing and unchanged by M3. Lint is red repository-wide and out of scope (X-6).
- **Required Action**: none in this chain (X-6). The convention check's FAILs are dispositioned here as pre-existing, and the
  implementer's identical disposition stands.

### Verdict (Round 3)

**Status**: APPROVED_WITH_COMMENTS (M3 only, at `969d92a`).
**Rationale**: the differential reproduces on my own exports, and a location-level comparison finds no difference hidden behind an
equal count. The ledger and the ESLint 9 defaults table match the config. The old configs are gone, lint exits 1, and the script is
unchanged. CR-5 is a record and instrument gap with no runtime member found. CR-6 is pre-existing.

### Assumption Not Checked (Round 3)

- This review assumes `next build`'s output at `969d92a` is the same as at `a558f2d`: M3 changes only lint tooling and three edges
  on a generator-only path, so the built `.next` should not change. I did not build either tree.
  - **Falsity signature:** a file under `.next/server` or `.next/static` whose content differs between builds of the two SHAs
    (beyond build ids and timestamps), or any built file containing `fast-glob`, `is-core-module` or `@prisma/internals` code.
  - **Owner:** QA Phase 2 on M3.
- **Reconcile note, 2026-11-20T06:06Z** (QA `e0d8b95`, QAF-11): the premise is false as written, and no code is affected.
  - **What QA found:** five function traces (`.nft.json`: trpc, nextauth, cron, interactions-server, codes/[code]) gain the
    directory and `package.json` of `cross-spawn@7.0.6` and `semver@6.3.1`. No built JS file differs beyond QA's noise floor,
    and 0 built JS files contain `fast-glob`, `is-core-module` or `@prisma/internals` at either tree.
  - **What this corrects:** CR-5's sentence "no runtime member found" was scoped to `pnpm list --prod` edges. That instrument
    names dev-only edges as its blind spot, and the trace change reached the function file set by a path it does not walk.
  - **Verdict:** M3 stays APPROVED_WITH_COMMENTS, because what changed is package metadata in traces, not code.
  - **Carrier:** QA's QAF-11 LOW, with the Planner batch beside CR-5.

## Next Steps

- Implementer (`implementer-hooks-018`): fix CR-1 (and CR-2 if taken) on the chain branch. Re-review is a sub-entry of Round 1,
  scoped to the fix diff.
- QA Phase 2 (after approval): close the Assumption Not Checked. Run the suite and the named mutants at the fix SHA.
- Architect: CR-2's premise line in A-4, if the Preferred form is taken.
- Captures: `verification/018/code-review/` (`m1-capped-message/`, `typecheck-f9e66c2.txt`, `convention-check-f9e66c2.txt`, `m2/`).
- M2 (Round 2): handed to QA Phase 2 on M2 at `b0b0158`, which closes Round 2's Assumption Not Checked. CR-4 is a reconcile note
  for the implementer. UAT owns M2-e.

## Resumption State

Written at the checkpoint steering asked for (context seam), 2026-11-20T06:17Z. Session `code-reviewer-hooks-018`. The brief is
`steering/018-brief-code-reviewer.md`, amended at `1db98a7` to cover every milestone the implementer hands off.

**Done.** Every verdict and capture is committed (latest review commit `7804862`, plan row `563c309`), and every consumer has
been messaged.
- **M1:** REJECTED at `f9e66c2` (CR-1 HIGH), then APPROVED_WITH_COMMENTS at `a558f2d` (Round 1, sub-entry 1). QA Phase 2 PASS
  (`eb0c713`).
- **M2:** APPROVED_WITH_COMMENTS at `b0b0158` (Round 2, CR-4 reconciled). QA PASS (`b247da8`), re-anchored at `a558f2d`.
- **M3:** APPROVED_WITH_COMMENTS at `969d92a` (Round 3).
  - CR-5 LOW: the instance is reconciled at `1010ca9`, and its class is a Planner batch candidate sent to the planner.
  - CR-6 LOW: pre-existing.
  - QA PASS (`e0d8b95`).
  - Its build-output assumption is reconciled against QAF-11 (dated note in Round 3).
- **CR-2 zod pin:** APPROVED at `d1bb9b0` (Round 1, sub-entry 2). CR-3 is reconciled.
- **CR-7 INFO** (unpinned git dependencies `paracord` and `project-utils#master`): sent to the planner as a Planner batch candidate.

**Open and owed by others (no action of mine):**
- The implementer: restamp the future-dated changelog row at `implementation/018-next-upgrade-save-size-cap-m2-implementation.md:27`
  (06:25). I told it in the CR-2 verdict message.
- The record check's other four failures belong to other files' writers and are already in `INBOX.md`.

**Next for me:** M4 when the implementer hands it off. That is a new round (Round 4), starting at its document's `Handoff-At`. Read
plan § M4 and its document, review in isolated exports only (the shared tree moves), and re-arm the cache-warm wake on resume.

**Branch and HEAD:** website `chain/018-next-upgrade-save-size-cap` at `d1bb9b0` (read at the checkpoint).

**Nothing uncommitted or locally mutated:**
- No export or clone of mine remains in the scratchpad: removed after each round.
- Raw ESLint and pnpm listing JSONs were deliberately not committed (sizes are in `verification/018/code-review/m3/README.md`).
- No questions are outstanding.
