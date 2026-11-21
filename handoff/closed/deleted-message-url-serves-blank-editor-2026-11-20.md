---
UUID: 61603fe9
Status: Addressed
Status-Detail: "Discharged by fixer chain fix-message-not-found, released to website master f4baebb at 2026-11-21T07:51:38Z, on his selection of a not-found state (steering/fixer-queue-2026-11-21-rulings.md, 05:50Z Q1): a deleted message's edit and send pages show the one notice. The page itself still answers HTTP 200; the notice is rendered client-side."
Owning-Stage: planner
Review-Trigger: when the message page's load path (src/app/message/m/[id]) or message.getOne is next changed, or when the next website polish effort is scoped
Priority: low
---

# A deleted message's URL serves a blank editor

## What is seeded

- **Observation** (uat-hooks-017-looks, live hooks.gg at website `7923a1d`, test account 1, 2026-11-20): messages 6022, 6023 and 6024,
  made by the walk, were deleted by 03:10:16Z. Opening their URLs afterwards answered 200 with a blank editor.
- **Not established:** what the page does for a message id that never existed; whether a save from that blank editor creates a new
  message; the intended behaviour. The last needs his word if a chain takes it.
- **Next step, if picked up:** read `message.getOne` and the message page's handling of a missing row at `origin/master`, and state each
  case: deleted, never existed, another user's.

## Evidence

- `verification/017/post-deploy/looks/cleanup.jsonl` and `README.md` (`aaccb15`).

## Origin

uat-hooks-017-looks's report to steering-roadmap-hooks (2026-11-20T03:1xZ): "Their URLs still answer 200 with a blank editor; that is
outside 017 and only noted."

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-20T03:14 | steering-roadmap-hooks | Opened from uat-hooks-017-looks's cleanup note on plan 017's post-deploy walk (`aaccb15`). |
| 2026-11-21T07:53 | steering-hooks | Document closed. Status: Addressed. Discharged by `fix-message-not-found` (`steering/fix-message-not-found-rulings.md` block 06:46Z), released `f4baebb` (`deployment/closed/fix-message-not-found-deployment.md`). |
