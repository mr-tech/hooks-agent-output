# Rulings — v1 guild-messages endpoints unauthenticated (handoff 8818bd89; no chain yet)

Steering session alias chain: steering-new → steering-H (renamed by the owner 2026-10-10).

## 2026-10-10 — "sort the handoffs by impact / severity and address the top one"
Owner's words, verbatim. Steering ranked the 9 Open handoffs; top = `handoff/v1-guild-messages-endpoints-unauthenticated-2026-08-24.md`.

## 2026-10-10 — scoping determination: Research first (by selection)
Prompt put and answered 2026-10-10. Options: Fixer (recommended) / Research first / Full chain / Hold.
Chosen: **Research first**, by selection, not his words. Content: a researcher establishes (a) whether
production answers /api/v1 with no key (one unauthenticated GET to production with a made-up guild ID)
and (b) whether Statbot's key matches the website's. Neither key's value is visible to an agent, so (b) may return to him.
Premises read this turn: at website `f2c85f5` (== origin/master) `src/middleware.ts` matcher is
`['/message/(.*)', '/api/guilds/(.*)', '/preview']` and the predicate is `startsWith('/api/v1/*')`
(`git show` + grep); both v1 handlers 0 matches for auth|session|Bearer|STATBOT|token (`grep -c`);
no commits to those paths b3f8ea9..f2c85f5. Statbot sends `Authorization: Bearer ${apiKey}` to the
hooks.gg client (`statbot-utils/src/api/ApiUtils.ts`, where the hooks.gg client is built, read). Key equality: unverified.

## 2026-10-10 — research returned (researcher subagent, `research/closed/v1-guild-messages-auth-exposure-2026-10-10.md`, b116210)
(a) Proven live: the one sanctioned unauthenticated GET to hooks.gg returned 200 from the handler. (b) Not
establishable by an agent → OWNER-QUEUE entry "Check that Statbot's hooks.gg key matches the website's".
Next: the pipeline for the fix is put to the owner.

## 2026-10-10 — fix route: Fixer (by selection)
Options: Fixer (recommended) / Planner (full chain) / Hold. Chosen **Fixer**, by selection. Scope statement: one
defect, the unauthenticated v1 guild-messages endpoints; files `src/middleware.ts`,
`src/pages/api/v1/guilds/[guildId]/messages.ts`, `.../messages/[id].ts` plus their tests; `website` only, no
other repo. No deploy or push until the owner's key check (OWNER-QUEUE) returns "match". Chain branch
`fix/v1-guild-messages-auth` created by steering at f2c85f5 (tree was clean; chore/agent-comment-sweep untouched, merge still HELD).

## 2026-10-10 — rider: 400 with no `.end()` (by selection) — SCOPE DELTA
Fixer round 1 handed back at website `1acffee` (impl record c97dd96) and reported a second defect: in both v1
handlers a ZodError hits `return res.status(400)` with no `.end()` (steering read it at `messages.ts` at 1acffee).
Options: Add as a rider (recommended) / Separate handoff / Leave it. Chosen **Add as a rider**, by selection.
Scope statement now also covers that 400 path in the same two handlers plus its test. Fixer round 2 on the same branch.
Reviewer start: Fresh subagent (rec) / You spawn it / Hold → **Fresh subagent**, by selection; after the rider round.

## 2026-10-10 — rider 2: `messages/codes/[code].ts` 400 with no `.end()` (by selection) — SCOPE DELTA
Code review round 1: APPROVED_WITH_COMMENTS at website c8c3d70 (`code-review/fix-v1-guild-messages-auth-code-review.md`,
3afec66). CR-2 found the same defect at `src/pages/api/messages/codes/[code].ts:23` (steering read it at c8c3d70).
Options: Rider on this fix (recommended; "the fixer does a third round") / Leave in the handoff. Chosen **Rider**, by
selection. This is the fixer's THIRD round; the option text named it as a fixer round, so this selection is
recorded as the owner's "continue as fixer". The question was not put separately. Scope now also covers that one
400 path plus its test. After round 3: code review re-runs on the new SHA, then QA.
QA start: Fresh subagent (rec) / You spawn it / Hold → **Fresh subagent**, by selection.

## 2026-10-10 — QA Phase 2: QA Complete at website 7606149 (`qa/fix-v1-guild-messages-auth-qa.md`, 9b4de7e)
QAF-1 (test-only patch) sent to the fixer to land; QA's blob check discharges it. Blocking release conditions
B-1 (owner key check, on OWNER-QUEUE) and B-2 (HOOKS_HOST on both Statbot hosts). Post-deploy B-3 and B-4. The register lives in the QA document.

## 2026-10-10 — B-2 and production probes (by selection)
B-2 options: Devops reads, count only (rec) / I'll check it myself / Hold → **Devops reads, count only**: at release
devops runs `grep -cx 'HOOKS_HOST=hooks.gg' <env file>` on statbot-api and statroles prod hosts over claude-ro
(prod-ro-access), expects 1, never prints the value, writes nothing.
Probe options: Yes, both (rec) / Only the post-deploy 401 / Neither → **Yes, both**: devops may send exactly
`curl -sI http://hooks.gg/` before deploy and one unauthenticated GET to
`https://hooks.gg/api/v1/guilds/9999999999999999999/messages` after deploy (expect 401); nothing else.
