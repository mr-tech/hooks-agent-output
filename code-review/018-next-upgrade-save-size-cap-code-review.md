---
ID: 018
Origin: 018
UUID: 6273a762
Reviewed-At: "b0b0158 — repos=website; Round 2 is M2 at b0b0158 (APPROVED_WITH_COMMENTS); Round 1 is M1 at f9e66c2 (REJECTED, CR-1 open)"
Status: In Review
Status-Detail: "M1 REJECTED at f9e66c2 and awaiting the implementer's CR-1 fix, re-reviewed as a sub-entry of Round 1. M2 APPROVED_WITH_COMMENTS at b0b0158, handed to QA Phase 2 on M2."
Round: 2
Verdict: APPROVED_WITH_COMMENTS
---

# Code Review: 018 — Next.js 16.4.6 and the save-list cap (M1, M2)

**Plan Reference**: `agent-output/planning/018-next-upgrade-save-size-cap.md`, revision 7 as read at agent-output `44efb1f` (M1's criteria unchanged since revision 5, `e45e8cf`)
**Implementation Reference**: `agent-output/implementation/018-next-upgrade-save-size-cap-m1-implementation.md` at agent-output `003515a`, `Handoff-At` `f9e66c2`
**Date**: 2026-11-20
**Reviewer**: Code Reviewer (`code-reviewer-hooks-018`)

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T05:35 | steering-roadmap-hooks (brief `steering/018-brief-code-reviewer.md`) | Round 1: review M1 at `f9e66c2` | REJECTED. CR-1 HIGH: on the capped path, an issue with an explicit message comes back with zod's default wording. Run in an isolated export. CR-2 LOW: the cap's counting relies on zod 3.22.4 internals that `^3.20.6` does not pin. Under 3.25.76 the cap misses 1,600 issues. CR-3 INFO: a count reconciled. Captures are under `verification/018/code-review/`. |
| 2026-11-20T05:40 | steering-roadmap-hooks (brief amended `1db98a7`); implementer-hooks-018 (M2 document `b4b34b6`) | Round 2: review M2 at `b0b0158` | APPROVED_WITH_COMMENTS. Reproduced in my own export: M2-a; M2-b's 46 package movers and 12 snapshot-key movers, counted by a second instrument; M2-c's build, typecheck, ts-node and highlight.js bundle checks; M2-d's warnings. The three ts-node scripts typecheck under their options at both trees. CR-4 INFO: an `@img` count does not reproduce. M1 stays REJECTED. |

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

## Next Steps

- Implementer (`implementer-hooks-018`): fix CR-1 (and CR-2 if taken) on the chain branch. Re-review is a sub-entry of Round 1,
  scoped to the fix diff.
- QA Phase 2 (after approval): close the Assumption Not Checked. Run the suite and the named mutants at the fix SHA.
- Architect: CR-2's premise line in A-4, if the Preferred form is taken.
- Captures: `verification/018/code-review/` (`m1-capped-message/`, `typecheck-f9e66c2.txt`, `convention-check-f9e66c2.txt`, `m2/`).
- M2 (Round 2): handed to QA Phase 2 on M2 at `b0b0158`, which closes Round 2's Assumption Not Checked. CR-4 is a reconcile note
  for the implementer. UAT owns M2-e.
