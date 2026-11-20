# Union sites under the error cap (zod 3.22.4, website 7923a1d) — planning run for F-17

Run 2026-11-20T04:18Z–04:25Z by planner-hooks-018, in an isolated export of website `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe`
(`git archive | tar x`, `pnpm install --frozen-lockfile`, exit 0) under the session scratchpad. Nothing ran in
`/usr/local/bin/hooks/website`. The export was deleted after the captures were copied here.

## Question

F-17 (critique pass 3, `f209354`): M1-i's stop counts issues *created* during the parse; M1-b counts issues *returned*. Where a
plain `z.union` fails, its losing branches create issues that never surface. (1) How far do the two counts part over the site's
real save inputs, at every plain-union site? (2) Does a union whose branches parse outside the caller's error map make the two
counts equal, with the refusal and everything else unchanged?

## Union sites at 7923a1d

`git grep -n -E 'union|\.or\(' 7923a1d -- src/server/api/utils/shapes.ts src/server/api/routers/user.ts src/server/api/routers/message.ts`:
three plain unions — `sectionShape.accessory` (`z.union([thumbnailShape, linkButtonShape])`), `separatorShape.spacing`
(`z.union([z.literal(1), z.literal(2)])`) and the element of `allowed_mentions.parse`. The critique named two; `spacing` is the third.
The other unions in the file are `z.discriminatedUnion`, which parses only the chosen option.

## Method

`message.union-cap-probe.test.ts` (copied here; it ran at `src/server/api/routers/__tests__/` in the export). Inputs: the real
procedure inputs (`message.upsert`, `user.updatePreferences` via `_def.procedures.<name>._def.inputs[0]`), with n ∈ {1, 3, 6, 10,
20} failing elements at each union site: an accessory failing both branches (`{type: 99}`), an accessory whose thumbnail branch is
dirty (bad url), a separator with `spacing: 3`, `parse: 'bogus'`, and a mix of the three. Per row: k (issues in the plain parse's
result), c (calls to a counting contextual error map), and the refusal of the architect's wrapper form (AF-8 run: keep each created
issue, stop on the 21st, return the first 20 kept plus a summary), compared with the base result's first min(k, 20) issues
(code, path and message).

- Base: `rows-base.txt` (+ `.issues`, the full base issue lists; `.capped`, the wrapper's refusals).
- Candidate: `isolated-union.diff` applied to `shapes.ts` (a helper parsing the union outside the caller's map and re-adding the
  result's issues, fatal where the union itself failed, at the three sites; ILLUSTRATIVE ONLY, not a design), then the same probe:
  `rows-iso.txt` (+ `.issues`, `.capped`).

## Results

1. **Base: the counts part at every union site.** c = 6k (accessory, all branches fail), 4k (accessory, dirty thumbnail), 3k
   (spacing), 4k (`parse`). The wrapper stops on created issues, so six bad accessories (k = 6) are refused with 21 issues of which 17
   are not in the base result — the losing branches' lines ("Invalid literal value, expected 11", "… expected 2", `media`
   "Required"); `rows-base.txt`, row `message.upsert|accessory-all-branches-fail|n=6`. 30 of 50 rows have `firstMinK20Equal=false`
   at base (`grep -c`).
2. **Candidate: the counts are equal.** c = k on all 50 rows (awk over `rows-iso.txt`: 0 rows with c ≠ k); the wrapper's refusal
   carries the base's first min(k, 20) issues on all 50 rows (`grep -c 'firstMinK20Equal=false' rows-iso.txt`: 0) and no issue
   absent from the base on any row (`grep -c 'returnedNotInBase=0'`: 50); k = 23 and 43 are refused with 21 issues, the base's
   first 20 plus the summary.
3. **Candidate changes nothing else.** Uncapped issue lists identical to the base (`cmp rows-base.txt.issues rows-iso.txt.issues`: 0).
   The 288-row abort-form probe (`../abort-form-probe/message.abort-form-probe.test.ts`) gives identical rows at base and candidate
   (`cmp abort-rows-base.txt abort-rows-iso.txt`: 0), and the base rows equal the committed `../abort-form-probe/rows-base.txt`. Full
   suite: 1913 of 1913 passed, 149 files, exit 0, at base and candidate, same case set, no status difference (`suite-summary.txt`,
   `suite-base.txt`, `suite-iso.txt`). `pnpm exec next typegen` exit 0, then `pnpm run typecheck` exit 0 with the candidate (`typecheck-iso.txt`).

## Limits

The candidate's per-element branch work still runs, outside the count: it is bounded by the branch shapes (no list inside any
branch at the three sites), and by the 20-issue stop on what surfaces. Its time on steering's worst within-bound body was not
measured here. The wrapper's own TypeScript typing was not checked (the architect's run states the same).
