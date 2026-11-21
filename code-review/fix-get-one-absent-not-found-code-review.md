---
ID: n/a
Origin: fix-get-one-absent-not-found
UUID: fcce3991
Reviewed-At: "b663b35 — repos=website"
Status: In Review
Status-Detail: "Round 1 APPROVED at website b663b35; handed to QA Phase 2 (149 added production lines)."
Round: 1
Verdict: APPROVED
---

# Code Review: fix-get-one-absent-not-found

**Plan Reference**: none (fixer chain); scope statement `steering/fix-get-one-absent-not-found-rulings.md`, block "2026-11-21T08:57Z"
**Implementation Reference**: `agent-output/implementation/fix-get-one-absent-not-found-implementation.md` (record `9e357ef5`, `Handoff-At: b663b35 — repos=website`)
**Date**: 2026-11-21
**Reviewer**: code-reviewer-fix-get-one-absent-not-found

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T09:17 | steering-hooks | Review website `b663b35` against the 08:57Z scope statement | Round 1 opened, then parked partway on steering's relay of "Park the chains". No verdict was given. |
| 2026-11-21T09:55 | steering-hooks (resume brief, ruling 09:51Z) | Resume round 1 | Round 1 APPROVED, 0 findings. The real-postgres probe gives B-1's 500 at `b829314` and NOT_FOUND at `b663b35`. The red run reproduced independently. Handed to QA Phase 2. |

## Scope and stage start

- **Stage start**: the fixer's committed document at `Handoff-At` `b663b35`; no hand-off message was sent (park), per the resume brief.
  website `HEAD` = `chain/fix-get-one-absent-not-found` = `b663b354fb236c3ee58d8b0be01778e1908e0e10` at 09:51Z and again at 09:54Z
  (start and end); tree `?? .playwright-mcp/` only (foreign). `origin/master` `b829314` (`git ls-remote`, 09:51Z).
- **Criteria assessed** (scope statement items, as stated at round open): (1) `message.getOne` answers NOT_FOUND with chain 2's one
  text for a number no row holds, whichever kysely build raised, with an escaped bug-form red test seen red at `b829314`; (2) on
  `/message/m/[id]/edit` in the not-found state the name field, File/Edit/View/Help menus and Send do not render; site navigation and
  the notice stay.
- **Production lines** (counted by me): `git diff --numstat b829314..b663b35` added column, production paths — `Navigation.tsx` 139,
  `shared.ts` 7, `message.ts` 3 = **149** (136 of the 139 are a re-indent: `git diff -w` gives `+3 -1`). ≥ 20, so **QA Phase 2 is owed**.
  Under the brief I did not run the suite.
- **Write set**: the six changed paths are all inside the determination's write set; `MessageProvider/index.tsx` is untouched.
- **Architecture record**: `architecture/system-architecture.md` and `architecture/website.md` exist (read for project-utils'
  `getPostgres` singleton). The change states no new mechanism for the record.

## Evidence

The evidence for criterion 1 comes from **the runtime's own query path**: project-utils' real `getPostgres()` (CJS `require("kysely")`)
over a real postgres. I wrote that instrument; I did not author the code under review. It is a different shape from the fixer's red
test, which uses a capturing driver built from `createRequire(...)('kysely')`. This answers the common brief's hazard 1: no stage relies
only on a fake built from the same kysely copy the code under test imports.

| Check | Instrument | Result |
|---|---|---|
| Criterion 1, base vs tip, real postgres | `verification/fix-get-one-absent-not-found/code-review/run-probe.sh` + `getone.pg.test.ts` (throwaway `postgres:16`, schema `verification/fix-personal-message-access/pg/schema-749606d.sql`, git-archive export per SHA; only env/auth/redis/pusher are mocked, `project-utils` is real) | `b829314`: absent number, as owner and as other user → `{INTERNAL_SERVER_ERROR, "no result", cause NoResultError}`, which is B-1's production signature. `b663b35`: both → `{NOT_FOUND, "This message doesn't exist, or you don't have access to it."}`. Controls the same at both: the owner loads his own row (`900000000000101`); another user gets NOT_FOUND with the same text (hazard 3: one text). Outputs `verification/fix-get-one-absent-not-found/code-review/out/getone-{b829314,b663b35}.json`, vitest exit 0 at both (`out/vitest-*.exit`). Containers removed (`docker ps -a` count of `fgoa*` = 0). |
| Red run, reproduced | tip's two test files + helper over `b829314` source in a git-archive export (node_modules symlinked), `npx vitest run --reporter=verbose` | exit 1, `Tests 2 failed \| 21 passed (23)`. Failing: the CJS-build case (received `INTERNAL_SERVER_ERROR` / `"no result"`) and the not-found header case. This matches the fixer's red. Capture `verification/fix-get-one-absent-not-found/code-review/red-at-b829314.txt`. |
| Mechanism | read of kysely 0.26.1 CJS `select-query-builder.js` `executeTakeFirstOrThrow` / `no-result-error.js` `isNoResultErrorConstructor` (round 1 pre-park) | A class argument is constructed with `new`, so the thrown error is the website's `MessageNotFoundError` whichever kysely build runs the query. Hazard 2 does not apply: the fix does not depend on which kysely build Next resolves. |
| Ruling 09:03Z condition a | `git diff b829314..b663b35 -- src/server/api/utils/shared.ts` | Two hunks only: the class above `getMessage`, and `executeTakeFirstOrThrow(MessageNotFoundError)`. Met. |
| Ruling 09:03Z condition b | read of `updateRecentMessageData` (`message.ts`) and `upsertMessage` (`shared.ts`): neither catches, and the class keeps `'no result'` as its message; the fixer's probe `fixer/probe/` with control | These callers answer as before (`INTERNAL_SERVER_ERROR "no result"`). I read this; the fixer's probe measured it. Met. |
| Ruling 09:03Z condition c | `git grep -n "NoResultError\|MessageNotFoundError\|'no result'" b663b35 -- src bot` | 6 lines: `message.ts` `asNotFound` signature, the import, `getOne`'s catch; `shared.ts` the class (2 lines) and `getMessage`'s call. No `NoResultError` remains. Met. |
| Conventions | `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website --since=b829314` | exit 1. **5 FAIL**, all eslint in `Navigation.tsx`: `prefer-nullish-coalescing` at 235, 246 and 319, and `react-hooks/refs` ×2 at 378. **0 CANDIDATE. 18 SKIP**: 17 are foreign `.playwright-mcp/*.png`, and the ID-token/basename check did not run, so the tool left it unchecked. See dispositions below. |
| FAIL dispositions | eslint over `b829314`'s `Navigation.tsx` in my export (`verification/fix-get-one-absent-not-found/code-review/lint-base-Navigation.json`) | Same 5 rules at base (235, 246, 318, 377 ×2). Each is one line later at the tip because of the added `{!isNotFound && (` line. All are pre-existing. Shipped and recorded per ruling 09:16Z; the handoff `handoff/message-edit-header-preexisting-lint-findings-2026-11-21.md` exists (record `328c2766`). Not findings. |
| ID-token sweep (hand, for the SKIP) | `grep -i -E` of the ID-token class (CLAUDE.md, Test Conventions) over the 235 `+` lines of `git diff -U0 b829314..b663b35 -- src` | 0 hits. Blind spot: it sees only added lines, so an ID token in an unchanged title is not checked here. No basename changed. |
| Comments | `+` comment lines in the same diff | 2: `// escaped: deployment/closed/fix-message-not-found-deployment.md` (comment-gate `ALLOW` `escaped:`), and the re-indented, pre-existing `eslint-disable-next-line no-nested-ternary`. No comment addresses the review. |

## Review of the change

- **`shared.ts`**: `MessageNotFoundError extends Error` with message `'no result'`, passed as `getMessage`'s error constructor.
  Identity is website-owned, so `instanceof` is evaluated between two website modules of one bundle. Keeping the message text keeps
  the other callers' answers byte-identical. kysely's constructor argument (`node`) is ignored. This is correct, because nothing reads it.
- **`message.ts`**: `asNotFound` is retyped to the new class and the `kysely` import is dropped. `getOne` maps every refusal through the
  same `messageNotFound()`, so the absent number, another user's message and an unmanageable server's still share one text.
- **`Navigation.tsx`**: reads `isNotFound` from `useMessage()`, which is the predicate the edit and send pages already use
  (`edit/page.tsx` and `send/page.tsx`, `if (isNotFound) return <MessageNotFound />`). The header extends the existing idiom and does
  not derive its own. The hidden block holds the name field, the four menus, the menu popover and the inline Send. That covers both
  `message?.id ?? 0` Send links (`fileMenuItems` "Send" and `sendItem`, hazard 4). Avatar, `ThemeToggle` and `NavMenu` stay.
  `JsonMenu` stays mounted, closed, and can only be reached through the hidden Edit menu. `SaveAsMenu` renders only with a message,
  and the not-found state has none. While an absent number is still loading, the bar shows until the single NOT_FOUND answer arrives
  (no retry: the "asks for the message once" case). The criterion is stated for the not-found state, so this is no finding.
- **Tests**: case 1 is bug-form with exactly one `// escaped:` line. Its artefact is a release record (`Status: Released` 07:51:38Z,
  record commit `83e96567` 07:53Z), dated before the fix commit `b663b35` (09:09Z). It is escaped provenance. Cases 2 and 3 are
  spec-form and mount with `createRoot`/`act` through the file's `mountDom` under the DOM project. Case 3 is the counterpart that
  guards against hiding the controls everywhere. The fixer's mutants `header-controls-always-hidden` and `…-never-hidden` each kill
  exactly one of cases 2 and 3. The helper change stays under `__tests__/helpers/`. Its new parameter defaults to the ESM build, so
  existing callers are unchanged. The `PresetDialog` mock's `DialogFooter` is the export `SaveAsMenu` imports: it gives back the real
  shape, not invented data. Expectations are literals (`NOT_FOUND_TEXT`, `{nameField:false, menus:[], send:false}`), not derived from
  the code under test.
- **TDD compliance** (fixer form: red, green, controls): red seen at `b829314` (reproduced above); 4 of 4 negative controls killed
  (`fixer/controls/`); no exemption row. `tdd-check.py` covers Python sources only and does not apply here.

## Findings

None.

## Assumption Not Checked

This review assumes the Next production server bundle holds `src/server/api/utils/shared.ts` and `src/server/api/routers/message.ts`
as one module instance in the tRPC API route, so the class `getMessage` throws is the class `getOne` tests. It is not tested here.
Falsity signature: after the deploy, a number no row holds still answers 500 "no result" on hooks.gg. Owner: devops's post-deploy
row (B-1's absent-number limb, re-read by the test account), under the release form "Vercel production build of website `master`".

## Verdict

**APPROVED**, at website `b663b35`. Both scope items are met. Criterion 1 is established on the real query path at both SHAs.
Criterion 2 is established by the reproduced red and the two-sided controls. **QA Phase 2 is owed** (149 added production lines).

## Next Steps

- QA Phase 2 (`qa-fix-get-one-absent-not-found`) at `b663b35`.
- devops: the post-deploy row closes the Assumption Not Checked above. Merge to website `master` needs the owner's word.
