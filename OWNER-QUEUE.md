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

## 1. Blocking — run the backfill

Released and live: `website` `master` is now `c85945f`. The backfill fills `valid` for every existing
row; until it runs, old rows stay `NULL`. **Run it from the `website` working directory.**

**Step 1 — run it bare. It will refuse, and that is correct:**

```
npm run backfill-valid
```

The refusal names the exact host your `DATABASE_URL` resolves to and tells you the value to set. This
is the guard you asked for on 2026-08-23 ("Guard it before the pin refresh"); a bare run refusing is
the guard working, not a fault.

**Step 2 — re-run with the host it named:**

```
BACKFILL_CONFIRM="<host from the refusal>" npm run backfill-valid
```

Nothing here reconstructs the host; the guard tells you, which is the whole point of it. Optional:
`BACKFILL_REPORT_DIR=<dir>` moves where the report is written.

**Pass:** the run completes and writes a per-run report. The report that counts as gate evidence is
the one where `rowsClassifiedThisRun > 0` — your own ruling of 2026-08-23 ("Correct the plan text").

**What to do with the result:** it is the input to your distribution review. **One thing to know
before you read it: a clean distribution is not evidence that per-embed limits are being checked.**
The distribution is computed by the same predicate that skips those checks, so anything failing that
way is counted as valid. UAT recorded that risk as unverified rather than covered. Then tell steering
the run is done and it will queue what follows.

## 2. Only you can do these — no agent may

Nothing right now. Three owner-executed steps sit behind the deploy — the backfill run, the
distribution review, and sending the repair guidance — and will be listed here, with their steps,
when each becomes runnable. They are not listed now because this file is for what you can act on.

**Standing rule, for context:** no agent on this machine ever posts a message anywhere — not Discord,
modmail, support threads, email or ticket replies. Work that ends in "tell someone X" stops at
stating what should be said and to whom.
