# Owner queue — everything waiting on you, with the steps

**This file deliberately has no frontmatter.** It is not a chain document; it is an operational list.

**What this is.** One place for every item that needs the owner, written so it can be acted on
**without opening another document**. Each entry states what to do, where, what a pass looks like,
and what to do with the result. Links are for depth, never for instructions — if you have to follow
one to know what to do, that is a defect in this file, and it is the coordinator's to fix.

**Entry test — the owner must be the one who must act.** Work an agent could do, written here
instead, converts a task into a decision he has to read, in the file whose whole purpose is being
short enough to act on. Findings go to the agent that can act, or to the record. So does context:
listing a settled decision here "so it is not lost" is the same defect wearing a different hat —
a closed decision belongs in the document it settled, and this file keeps nothing for reference.

**Who maintains it.** The steering session, as items land and close. Completed items are deleted,
not ticked — the record of what was done lives in the chain documents, and a deletion here states
in its commit message what the deleted text carried and where it now lives.

---

## 1. Blocking — the production DDL

**Run this against the production database:**

```sql
ALTER TABLE "Messages" ADD COLUMN valid BOOLEAN;
```

**Pass:** the statement succeeds. Existing rows get `NULL`; the live site does not know the column
exists, so nothing changes until the `website` deploy. Safe to run at any time.

**Then tell steering it is done.** The deploy is a *separate* approval and does not follow from this
one — you said a push to `master` auto-deploys, so approving the deploy is approving production
changing that instant. Steering will come back for it.

**Notes, so you do not have to check:** the table is `Messages`, plural, though the Prisma model is
singular. The column is nullable, matching the schema at the `project-utils` commit already pushed.
There is no migration tooling in that repo to run instead — this is a manual statement in your own
session, which is why no agent could do it.

## 2. Only you can do these — no agent may

Nothing right now. Three owner-executed steps sit behind the deploy — the backfill run, the
distribution review, and sending the repair guidance — and will be listed here, with their steps,
when each becomes runnable. They are not listed now because this file is for what you can act on.

**Standing rule, for context:** no agent on this machine ever posts a message anywhere — not Discord,
modmail, support threads, email or ticket replies. Work that ends in "tell someone X" stops at
stating what should be said and to whom.
