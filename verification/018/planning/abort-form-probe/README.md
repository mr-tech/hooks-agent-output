# Abort-form list bound probe (zod 3.22.4, website 7923a1d)

Question: does a list-length check that aborts (fatal issue) refuse every over-limit list with exactly one issue for that list, no throw, and without the message-level `superRefine(refineDisplayableText)` running, at all 11 sites and through both save procedures; and does it typecheck with every `satisfies` in shapes.ts unchanged.

Answer: yes on every limb (see Results). Nothing was run in /usr/local/bin/hooks/website; isolated export only.

## Commands
- Export: `git -C /usr/local/bin/hooks/website archive 7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe | tar x -C $S`, then `pnpm install --frozen-lockfile` (exit 0), under `systemd-run --user --scope`.
- Edits: `export.diff` (tracked files shapes.ts and user.ts; the helper `boundedArray(element, max)` sits beside `discordIdShape`, exported, one `as unknown as z.ZodType<output of z.array(element), ZodTypeDef, input of z.array(element)>` cast inside it). Applied at S1-S10 in shapes.ts, S11 in user.ts (max 11), and the import shape's `z.preprocess` top-level components.
- Typecheck: `pnpm exec next typegen` (exists, exit 0, produced next-env.d.ts), then `pnpm run typecheck`: exit 0, no errors at all (`typecheck.log`). All five `satisfies` clauses in shapes.ts (RecentMessageData, IncomingMessage x2, partial form, UpdateMessage) unchanged and passing in both tsc programs.
- Probe: `PROBE_OUT=<rows> npx vitest run src/server/api/routers/__tests__/message.abort-form-probe.test.ts --reporter=verbose > report.txt 2>&1; echo exit $? >> report.txt`; abort form -> `report.txt`, `rows-abort.txt`; base (git stash of the edits, same test) -> `report-base.txt`, `rows-base.txt`. Both exit 0, 288 rows each. Inputs are the real procedure inputs: `messageRouter._def.procedures.upsert._def.inputs[0]` and `userRouter._def.procedures.updatePreferences._def.inputs[0]`, plus `discordMessageImportShape`.

## zod 3.22.4 source (node_modules/zod/lib/types.js, helpers/parseUtil.js)
- types.js:2959-2968, ZodEffects checkCtx.addIssue: `addIssueToContext(ctx, arg); if (arg.fatal) { status.abort(); } else { status.dirty(); }`. A `fatal: true` issue makes the refinement's own status aborted; the dirty form leaves it dirty.
- types.js:3019-3020 (sync refinement branch): `if (inner.status === "aborted") return INVALID;` precedes `executeRefinement(inner.value)` at 3025. So an enclosing refinement (the message `superRefine`) never runs when its inner schema aborted; a merely dirty inner (3021-3022) still runs it, on whatever value came out.
- types.js:3285-3286 (ZodPipeline sync): `if (inResult.status === "aborted") return INVALID;` so the element stage `out` never runs on an aborted first stage. On a dirty first stage (3287-3292) the pipeline returns dirty with the raw list, which then reaches the parent refinement: that is the QA TypeError path.
- helpers/parseUtil.js:62 (mergeArray) and 84-87 (mergeObjectSync): an aborted element/value returns INVALID, so the abort propagates up through arrays, objects, discriminated unions to the root ZodEffects.
- The refinement's own check (`list.length > max`) runs in the first stage before any element is looked at, so no element is validated on an over-limit list; the pipe's second stage only runs for lists within bound.

## Results (rows-abort.txt vs rows-base.txt; full over-limit table in table.md)
- Threw: 0 of 288 rows (abort form); 0 at base.
- Every over-limit row at S1-S10 (kinds valid, invalid, number, null, nested-over-bound; lengths bound+1 and bound+50; both procedures) and S11 (updatePreferences; lengths 12 and 61): `issues=1 atList=1 codes={"too_big":1} innerPath=false textIssue=false`. No site has an over-limit list with issue count != 1.
- Controls at length == bound: all rows identical to base (0 differences).
- "41 text displays of 5000 chars" at S10: base 43 issues (upsert, updatePreferences, import); abort form 1 issue, no displayable-text issue.
- Displayable-text issue appears in 3 base rows and 0 abort rows.
- Import shape, number/null elements: ok at base and abort at every length, because the preprocess drops non-object elements before the list check (same as base; the bound applies to what the preprocess keeps). Over-limit objects at import (valid/invalid/nested) refuse with 1 issue.
- Where base had no bound (S4, S6, S7, S8, S11) the over-limit rows refuse in the abort form and pass or fail on elements at base, as expected of a new bound.
- Caveat: the over-limit message is zod's default text, with path equal to the list path; the issue is too_big, type 'array', inclusive true, exact false, as `.max()` produces.
