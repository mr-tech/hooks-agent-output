---
UUID: 4acd59e4
Status: Open
Status-Detail: "On production, an account refused another user's personal message at /message/m/<id>/edit saw a blank editor shell while the page kept retrying getOne on 404, and no load-error text had appeared by the 8 s read. Whether the text appears once the retries end is unchecked. No stage owns it yet."
Owning-Stage: steering thread for the website access surfaces (to route it to a stage)
Review-Trigger: when the website message editor's load path for /message/m/[id]/edit is next edited, or when the next chain touching website access control opens
---

# Editor shows a blank shell when a personal message's load is refused

## What is seeded

On production (website `983681c`, the release of fixer chain `fix-personal-message-access`), test account 1 opened test account 2's
personal message at `/message/m/6021/edit`. The post-deploy row B-1 predicted "the editor's load error, none of account 2's content".
Observed at the 8-second read: the marker of account 2's message was absent from the page text (B-1 passed, no content leaked), but no
load-error wording had rendered. The page was a blank editor shell: menu bar, an empty box and the cookie banner. The page's own
`message.getOne` for 6021 answered 404 on each of four requests (console errors at 1418, 3006, 5594 and 10224 ms) and was still
retrying at the read. Account 1's direct `getOne` 6021 answered 404 `NOT_FOUND`, "One of the provided messages does not exist."

Two things are not established. First, whether the load-error text renders once the retries end: the read stopped at 8 s and
the retries had not ended. Second, which of the two outcomes a refused user is meant to see; the B-1 prediction named a load error, and
the observed page showed none within the read.

This is a user-facing gap on a refusal: a user refused a message sees an empty editor with no wording. It concerns product copy,
not access.

Cross-reference, not a second record: the walk's F-2 (`getOne` on a deleted number answers 500 "no result") is carried by
`handoff/get-one-absent-number-fails-without-not-found-2026-11-19.md`. No record is written for it here.

## Evidence

`verification/fix-personal-message-access/post-deploy/README.md`, row B-1 (01:41:13-21Z) and finding F-1 LOW;
`verification/fix-personal-message-access/post-deploy/b1-step5-account1-6021.json`. The console log
`b1-step5-account1-6021-console.log` is kept untracked beside it (the record ignores `*.log`); the screenshot is untracked at
`/home/dev/.cache/ms-playwright-mcp/output/b1-pd-step5-account1-6021.png`. The B-1 row as the reader recorded it:
`handoff/fix-personal-message-access-post-deploy-2026-11-20.md`.

## Origin

Finding F-1 of the post-deploy reads of fixer chain `fix-personal-message-access` (session `uat-hooks-fix-personal-message-access`,
2026-11-20), raised by steering thread `steering-roadmap-hooks`.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-20T01:44 | helper for steering-roadmap-hooks | Created from F-1 of the post-deploy reads. F-2 is cross-referenced to the existing absent-number handoff, not duplicated. Disclosure: the record-write gate refused the first, shell-heredoc write; re-issued with the Write tool |
