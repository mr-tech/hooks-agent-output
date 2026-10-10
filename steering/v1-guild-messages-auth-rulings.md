# Rulings — v1 guild-messages endpoints unauthenticated (handoff 8818bd89; no chain yet)

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
