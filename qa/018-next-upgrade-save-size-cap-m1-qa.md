---
ID: 018
Origin: 018
UUID: 6273a762
Verified-At: "a558f2d — repos=website; M1 at its fix tip, plus the M2 refresh at the same tree; isolated exports with their own install, shapes.ts blob 94d2bf4 verified equal"
Status: QA Complete
Status-Detail: "M1 PASS at website a558f2d (code review Round 1 sub-entry 1, 57ff6f8). Suite 2261/2261 exit 0; differential 0 violations over 1224 labels; sweep 66 of 69 killed plus NM-4 re-targeted, 3 equivalent. M2's verdict refreshed at a558f2d. No finding."
Phase: 2
---

# QA Report: Plan 018 — M1, the save-list cap and the error cap (M-001)

**Plan Reference**: `agent-output/planning/018-next-upgrade-save-size-cap.md`, revision 7 (`af8a9d6`), § M1. M1's criteria are
unchanged since revision 5, which the Phase 1 document was keyed to (`qa/018-next-upgrade-save-size-cap-qa.md`). That document holds
the chain's blocking-condition register; this pass amends B-2 there.
**Stage start:** the code review's committed verdict, `code-review/018-next-upgrade-save-size-cap-code-review.md` Round 1 sub-entry 1,
APPROVED_WITH_COMMENTS, `Reviewed-At` `a558f2d` (agent-output `57ff6f8`), re-read at the record. The tree under test is
`7923a1d..a558f2d`. That range holds M1 (`e5732b0`…`f9e66c2`), M2 (`b0b0158`) and M1's fix round (`c357095`, `b639dbe`,
`a558f2d`).
**Implementation:** `implementation/018-next-upgrade-save-size-cap-m1-implementation.md` (agent-output `802917e`).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T05:57 | code-reviewer-hooks-018 (Round 1 sub-entry 1, `57ff6f8`) | QA Phase 2 on M1 at `a558f2d` | Phase 2 on M1, with the M2 refresh at the same tree. The TDD gate passes. Suite 2261/2261, exit 0. The two fix specs are red at `c357095`. Differential v3: 0 violations over 1224 labels, and the instrument was mutated first (a planted tip gives 1). Sweep of M1's guards: 66 of 69 killed, 1 not applied and re-targeted (killed), 3 survivors shown equivalent. The handoff's trigger has not fired. 0 ID tokens in the test files. Code review's Assumption Not Checked is closed. Revision-3 and revision-4 Assumptions are routed to a B-2 limb (UAT). **PASS (M1).** |

## Criteria this pass assesses (listed before execution)

M1-a, M1-b, M1-c, M1-d, M1-e and M1-i (*wiring*, *stop checking*, *short reason*, *no huge error*), each as Phase 1 instruments
them. M1-f is stated residue (RK-3). M1-g and M1-h are register rows B-1, B-2 and B-6 (UAT). The TDD gate comes first. The M2
refresh at `a558f2d` follows from Verdict Freshness, because the fix round changed production code over `b0b0158`.

## TDD Compliance gate

The implementation document's TDD Compliance table and the Fix Round 1 table were read:
- Every new function and behaviour has a row, all three answers Yes, a failure reason, and a red-run capture.
- The module rows cite `TypeError: … is not a function`. Every other row of the same file cites an assertion-level failure in a
  stub tree.
- The fix round's two rows were re-run here at `c357095` (production as at `b0b0158`): **2 failed, 158 passed**. The failures are
  exactly the two named cases, with the `AssertionError`s the table quotes (`m1-phase2/c357095-fix-specs.json`, `suite-summary.txt`).

**Pass.**

## Test Execution Results

Driver: `verification/018/qa/m1-phase2/run.sh`, under `systemd-run --user --scope`. It ran on a `git archive` export of `a558f2d`
with its own `pnpm install --frozen-lockfile` (exit 0), no `.env` and `SKIP_ENV_VALIDATION=1`. Suites and the differential ran
under `unshare -rn`. The `shapes.ts` blob `94d2bf4` matched in the export. Exit codes are in `exits.txt`. Exports are deleted.

| Criterion | Instrument | Result |
|---|---|---|
| Whole suite (code review's Assumption Not Checked) | `vitest --reporter=json` | **2261 of 2261, 0 failed, 154 files, `success` true, process exit 0**. Against `b0b0158`, path membership is identical. The only per-file differences are `message.save-limits.test.ts` 149 → 150 and `shapes.error-cap.test.ts` 9 → 10, the fix's two specs |
| M1-a, M1-b, M1-c, M1-i *short reason* (procedures and import schema) | differential v3 (test file sha256 `d597c91a…`, `compare.py` `6dd66ac7…`, `instrument.sha256`) through `messageRouter`/`userRouter` `.createCaller`, against `base-7923a1d.json` | **0 violations over 1224 labels** (`tip-vs-base.txt`, exit 0). 351 inputs accepted, against 390 at base: the over-bound lists at the five new sites are now refused. 6 throws, the known `import S1 null` residue, equal to base |
| — the instrument's control on this run | a copy of the tip JSON with one within-bound message changed (`upsert S1 n=1 invalid`) | **1 violation, exit 1** (`planted-wrong-vs-base.txt`) |
| M1-i *stop checking*, *no huge error*, *wiring* (NM-15) | the suite's cases in `helpers/saveErrorCapSpecs.ts` (blob `b78f39d`), run for each procedure | read count < 200 on 40 × 40 counting texts; exactly 20 (no summary) and 21 (20 plus summary); the over-limit list's one issue counts toward 20; the displayable-text issue keeps its own message; two concurrent refusals and one sequential refusal keep their own 15; every QAF-9 long-value member (8 bodies, `parse` alone and three) gives one or three issues of exactly `code,message,path` and under 16 KB, with no 1000-char run of the value; steering's fat-buttons and invalid-sections bodies give 21 issues under 16 KB. All of these are in the 2261 passes |
| M1-i *wiring*, synchronous stop (NM-16) | the suite's process exit code | 0, so no unhandled rejection |
| M1-e | `usePreferences.recent-list-bound.test.tsx` (blob `85e6a92`), literal ids | in the passes; NM-4 is killed (below) |
| Typecheck | `pnpm run typecheck` | exit 0 after the build (`a558f2d-typecheck-after-build.txt`) |

**Residue (not a finding):** run before any build, typecheck exits 2: TS2307 on `~/assets/img/product_image.png` in
`src/app/page.tsx` (`a558f2d-typecheck.txt`). The image module's declarations come from `next-env.d.ts`, which `next build`
generates and `.gitignore` excludes (line 86 at `7923a1d`). The same import is at `7923a1d` (`src/app/page.tsx` line 10). The plan's
M2-c order (build, then typecheck) is the order that holds. This is pre-existing, outside M1 and M2.

### Test audit (workspace conventions, M1's 8 test-tree files at `a558f2d`)

| Check | Result |
|---|---|
| Basename positive form | the 5 test files conform. The 3 helpers sit under `__tests__/helpers/`, as the helper policy places them |
| ID-token class over titles and comment lines | **0 hits**. On the same run, the predicate's control matches 2 of 3 planted lines, as it should |
| Source-text reads (`readFileSync`, `__filename`) and constants used as expectations (`MAX_*`, `~/constants`) | **0**. Every expected value is a literal |
| Handoff `mutant-equivalence-by-argument-unverified-2026-11-19.md` | trigger not fired: of the 16 files in `7923a1d..a558f2d`, 0 match its four website paths (`grep -c`) |

### Mutation sweep: the Irreversible Side-Effect Register guards M1 changed (E-1 to E-3: input validation before the write)

The runs went to a helper (`sweep/`). It used `mutation-run.py` on a clone checked out at `a558f2d` with its own install, suite
`npx vitest run src/server/api src/providers/MessageProvider`, timeout 300 s. All three controls passed (829 cases).

- **Range:** `7923a1d..a558f2d`. Production files mutated: `src/constants/index.ts`, `src/providers/MessageProvider/usePreferences.ts`,
  `src/server/api/routers/message.ts`, `src/server/api/routers/user.ts`, `src/server/api/utils/shapes.ts`. Skipped: 8 test-tree
  files, and the three non-JS files (`gen.txt`).
- **Suite instruments by blob:** `sweep/suite-instrument-blobs.txt`. Every one is committed at `a558f2d`.

| Mutants file (sha256 in `mutant-files.sha256`) | Killed | Not killed |
|---|---|---|
| `gen-mutants-a558f2d.json`: `mutant-gen.js --range 7923a1d..a558f2d`, which yields every candidate on an added line. Operators: comparisons, logical, `!`, booleans, n → n+1, `if` → `if (false &&`, walk truncation. Excludes `??`, `?.` and `=>` | **33 of 35** | `shapes.ts:61:walk-first`, `shapes.ts:61:walk-last` |
| `named-mutants-bfc790d.json`: QA's NM-1 to NM-17 and the implementer's additions | **29 of 29** applied | NM-4 not applied: the line wraps since `bfc790d` |
| `named-mutants-a558f2d.json`: the fix round's F-1 to F-4 | **3 of 4** | F-3 |
| `nm4-retarget.json`: NM-4 at the wrapped line, run by QA | **1 of 1** | — |

**Survivors, each dispositioned:**
- **F-3** (the map returns `ctx.defaultError` in place of `message`). **Equivalent.** zod 3.22.4's `makeIssue`
  (`lib/helpers/parseUtil.js`, read in the installed package) returns `message: issueData.message || errorMessage`. So a map's return
  is used only when the issue has no message of its own, and then `issue.message ?? ctx.defaultError` is `ctx.defaultError`. What
  the cap records (`seen`) is not mutated. The bound: zod is `^3.20.6` in the specifier, which is CR-2, carried by the Planner batch.
- **`shapes.ts:61` walk-first and walk-last** (`fatal` read from the first or the last issue, in place of `.some`). **Equivalent,
  bounded.** zod 3.22.4's `ZodUnion._parse` (`lib/types.js`) has two outcomes:
  - a dirty branch's own issues;
  - one `invalid_union` issue alone.
  `invalid_union` can sit among other issues only if a branch nests a union. At `a558f2d`, the three `isolatedUnion` call sites hold
  `thumbnailShape`/`linkButtonShape` and literals, and `z.union(` occurs only inside `isolatedUnion` itself (`git grep`). So no
  branch nests one, and `.some` reads the same as the first and the last on every reachable input. **Stated limit:** a union added
  inside an accessory option makes these mutants non-equivalent. The `fatal` read then needs a case in which `invalid_union` is
  neither first nor last.

**Score, with its predicate:** 66 of 69 applied mutants are killed. That covers every `mutant-gen` candidate on an added line of the
five production files in `7923a1d..a558f2d`, plus QA's and the implementer's named mutants. It excludes `??`, `?.`, `=>`,
`for…of` and `Object.keys` walks, and comparisons inside template substitutions. NM-4 is killed after re-targeting, and the 3
survivors are equivalent as argued above. **No coupling mutants were added.** M1's compound guards are `boundedArray`'s length
check and the composer's `id !== message?.id && ids.length <= MAX_RECENT_MESSAGE_IDS`. The latter's two conjuncts each carry a
generated swap and an `if-false`, all killed, and the plan claims no independence between them. **The effort-final sweep stays
owed** at the chain's last Phase 2, over the whole production diff.

### The M2 refresh at `a558f2d`

The fix round changed `shapes.ts` over `b0b0158`, so M2's verdict (`qa/018-next-upgrade-save-size-cap-m2-qa.md`) expired. It was
re-run over the same surface on this tree:
- `next build` exits 0, with 0 "mandatory" lines;
- `tsconfig.json` is byte-identical to the commit;
- typecheck after the build exits 0;
- `ts-node -T` exits 0;
- the markers are in 1 static and 2 server files, with 0 `(void 0)` receivers (`bundle-counts.txt`);
- the suite is above.

**M2 re-anchored at `a558f2d`: PASS.**

## Assumptions carried from Phase 1

- **Revision 5 (AF-9's helper keeps the plain union's issue):** **closed.** The differential's UA, US and S6 within-bound labels equal
  the base on `code`, `path` and `message` (0 violations).
- **Revision 3 (the HTTP handler sends the capped message as the caller returns it) and revision 4 (the caller context reaches the
  input stage as the HTTP route does): re-specified, not closed by this pass.** The procedures run `protectedProcedure` before
  `.input(…)`, so an HTTP read reaches validation only with a signed-in session, that is, Discord OAuth on a local build. That
  set-up belongs to UAT's local walks (B-1 to B-3). Both assumptions are routed to a new limb of **B-2** (amended in its cell in the
  Phase 1 document today): on the same signed-in local build, Save As a body with 21 invalid field names inside one embed. The
  network response of `message.upsert` must parse to 21 issues, the 21st `{code: 'custom', path: [], message: 'Stopped checking
  after 20 errors'}`, equal to the caller's on the same body. Owner: UAT at B-2.
- **Revision 6 (form A binds highlight.js):** closed in the M2 pass and here (0 `(void 0)` receivers).
- **Revision 7 (the editor's decorations under 11.12.0):** stays with UAT at B-9.

## Assumption Not Checked

This pass assumes, and does not test, that tRPC's HTTP adapter carries the capped `ZodError` to the client as the caller returns it.
That is the same premise the B-2 limb above settles; the transport is not exercised here. The signature of its falsity: the B-2
limb's network response shows a different issue count, order or summary than the caller's for the same body, or a body over 16 KB.
Owner: UAT at B-2.

**Rows inherited and not discharged:** B-1 to B-10, all. This pass amends B-2's cell only.

**Disclosure (gate satisfied in this round):** the record's stamp gate refused this document's first write. Its changelog row carried
a typed-ahead stamp (`06:0x`). The gate's remedy was applied: the stamp is the clock's UTC minute, substituted by `date -u`.
