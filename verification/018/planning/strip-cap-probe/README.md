# The error cap with issues carrying code, path and message only (zod 3.22.4, website 7923a1d) — planning run for QAF-8

Run 2026-11-20T04:2xZ by planner-hooks-018 in an isolated export of website `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe`
(`git archive | tar x`, `pnpm install --frozen-lockfile` exit 0), with `../union-cap-probe/isolated-union.diff` applied to
`shapes.ts` (`patch` exit 0). Nothing ran in `/usr/local/bin/hooks/website`; the export was deleted after the copy.

## Question

QAF-8 (`qa/018-next-upgrade-save-size-cap-qa.md`, `9218925`): one issue can carry the refused input (`received`, `unionErrors`), so
a count cap does not bound the refusal. Does a refusal whose issues carry only `code`, `path` and `message` (1) bound the message
on QAF-8's literal-position inputs and on steering's within-bound worst bodies, (2) render the same client lines as the base, and
(3) do so through the site's own tRPC procedure builder?

## Method

`message.strip-cap-probe.test.ts`: the real `message.upsert` input (`_def.procedures.upsert._def.inputs[0]`) behind a per-call
wrapper (the architect's AF-8 form: a counting error map that stops on the 21st created issue, 20 kept plus a summary, thrown as a
`ZodError`), each issue reduced to `code`, `path`, `message`, mounted with `createTRPCRouter` and `publicProcedure` from the site's
`trpc.ts` (its `errorFormatter`). Inputs: QAF-8's six long-value cases plus 20 sections each with a 100,000-character accessory
type; four of steering's within-bound bodies (`../../steering/refute-within-bound/probe.ts`, rebuilt here); six bad accessories
(F-17); one valid message. "Client lines equal" compares `formatMutationError` over the base's full issue JSON and over the
returned message, for inputs with 20 or fewer base issues. zod-error 1.5.0 (`node_modules/zod-error/lib/utils/get-error-message`)
reads only `issue.code`, `issue.path` and `issue.message` outside its tests (`grep -rn -o` over `lib/functions` and `lib/utils`).

## Results (`strip-rows.txt`, `strip-report.txt`: exit 0, no unhandled error)

- Every refusal's issues carry exactly the keys `code,message,path`; no message carries the 100,000-character input.
- QAF-8's inputs: 168 to 512 characters (base: 100,255 to 904,406, QA's `issue-size-probe/report.txt`); 20 sections with a long
  accessory type: 20 issues, 3,372 characters, from a 2,001,568-byte body built in-process (above the route's 1 MB limit; only
  the parse is exercised).
- Steering's bodies (11,200 to 48,500 base issues): 21 issues, 3,669 to 5,011 characters, 0.3 to 0.5 ms per call.
- Every input with 20 or fewer base issues renders the same client lines as the base (`client lines equal to base true`, 8 rows).

## The async form (`strip-rows-async.txt`, `strip-report-async.txt`, `message.strip-cap-probe.async-variant.test.ts.txt`)

The same wrapper calling `safeParseAsync` instead of `safeParse`: vitest exit 1, "Vitest caught 3 unhandled errors" (`Unhandled
Rejection … Symbol(stop)`), and `steering B_sections_only` returned a different set of 20 issues (4,719 characters against 4,651)
— a stopped async parse creates issues in an order other than the final list's. The save schema at `7923a1d` has no async step
(`git show 7923a1d:src/server/api/utils/shapes.ts | grep -c -E 'async|Promise'`: 0).

## Limits

Typing of the wrapper not checked. Timing is in-process, one call each, no HTTP.
