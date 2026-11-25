---
UUID: 64366e77
Status: Open
Status-Detail: "Only if plan 019 is rolled back: whether the old site previews and sends a message the new editor saved with emoji characters has not been read."
Owning-Stage: devops
Review-Trigger: "a revert of website master past 48eb60a (plan 019's release) is decided"
---

# Rollback of plan 019: read one saved emoji message on the reverted site

## What is seeded

After 019, the editor saves a typed or pasted emoji as the character; before it, the site wrote `:name:`. Messages saved while 019 serves
keep the character after a revert. Only the old editor's load and save were read for that case, at `5ec0621`. The old preview and send
paths (`src/utils/markdown/emoji.tsx` there) were not read.

**If a rollback is taken:** read one message saved by the new editor, holding an emoji character, on the reverted site, in its preview.
Wrong if it shows a raw or missing emoji where a pasted one shows normally today. Sending it is the owner's act, in a test server.

## Evidence

`critiques/closed/019-slate-formatting-discord-engine-critique.md` § Assumption Not Checked (cycle 18 pass 1);
`planning/closed/019-slate-formatting-discord-engine.md` § M7.

## Origin

Critique cycle 18 pass 1, which names devops as the owner of this read.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-25T16:53 | devops-019 | Written at Stage 1 closure. |
