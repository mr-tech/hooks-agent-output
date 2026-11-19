---
UUID: 4e5ca400
Status: Addressed
Status-Detail: "Discharged by uat-hooks-017's walk on a uat-local-stack.sh stack (2026-11-19): first save id 900000000000001; count of ids below 900000000000001 was 0 after it and after every later save (ids written: 900000000000001, 900000000000002). Record: uat/017-existing-items-backlog-uat.md, Flow Execution."
Owning-Stage: uat (or qa, whichever next walks a local website build); steering names this file in that walk's brief
Review-Trigger: "when the next browser walk on a stack built by tools/uat-local-stack.sh is briefed"
---

# Handoff — a save on a local build can write a client-sent low message id

## What is seeded

`tools/uat-local-stack.sh up` (from record `7d59233`) moves `"Messages_id_seq"` to
900000000000001 and fails where a stored "Messages" id is below it. That bounds a save that sends
no id. It does not bound a save whose client state carries an id: the website's save inserts the
id the client sends. A walk that saves from an editor draft or a URL from another environment,
carrying a message id the local database does not hold, would create a "Messages" row in
production's id range after `up` printed `message ids: next 900000000000001`, and its save event
would publish on `message-update-<that id>` (workspace `CLAUDE.md`, "Local builds of `website` —
before the first save").

Owed by the next walk on this stack, in its stage document:
- the message id its first save wrote;
- the result of `select count(*) from "Messages" where id < 900000000000001` after that save
  (expected 0);
- where the count is not 0: the client state that carried the id, and the stack recreated before
  any further save.

Whether any walk has done this is not established; no instrument was run.

## Evidence

Code reads by `code-reviewer-fix-uat-local-stack-id-sequence`, not run:
`website/src/server/api/utils/shared.ts`, `upsertMessage` sets `values.id = message.id` whenever
the client sends one and `buildUpsertMessageQuery` inserts it `onConflict('id')`;
`project-utils/prisma/schema.prisma`, `model Message`, `id BigInt @id @default(autoincrement())`.

## Origin

`code-review/closed/fix-uat-local-stack-id-sequence-code-review.md`, "Assumption Not Checked" and
"Next Steps" (Round 1). Written by `steering-queue-hooks` after the chain's retrospective
(`retrospectives/fix-uat-local-stack-id-sequence-retrospective.md`, Handoff section) found the
item carried only in a steering memory file, which stage sessions do not load.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-11T20:17 | steering-queue-hooks | Created at the close-out of `fix-uat-local-stack-id-sequence`. |
| 2026-11-19T10:30 | uat-hooks-017 | Document closed | Status: Addressed. First save id 900000000000001; count below 900000000000001 = 0 (`verification/017/uat/walk-1/S2-db.txt`, `messages-final.txt`). |
