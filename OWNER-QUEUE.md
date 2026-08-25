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

**Who maintains it.** The steering session, as items land and close.

**A DONE ITEM IS DELETED. NOT TICKED, NOT ANNOTATED, NOT MOVED TO A "done" HEADING, AND NOT LEFT
AS A LINE SAYING IT IS DONE.** There is no form of words that lets a finished item stay on this
list. A sentence reporting that something is done is *reading* the owner has to do to discover he
has nothing to do — which is the exact cost this file exists to avoid, and the owner has now
corrected it twice. **The record of what was done lives in the chain documents**; the deletion's
commit message states what the deleted text carried and where it went. **The same rule kills
"do not run these" sections, settled-decision notes kept "so they are not lost", and status
lines about items nobody is waiting on.** If it does not need the owner to act, it is not here.

---

## 1. Your decision — no agent may make this

**QA-R20 — is a whitespace count of 0 what you expect?** That is the only question, and answering
it finishes this row.

In `verification/012/backfill-report-1787522866564-i3s31k.md`, the category
`"whitespaceContent"` reads `{ "count": 0, "rowIds": [] }`. It means no record in the table has
Components-V2-structured components together with content that is only whitespace. **Say whether
that is expected.**

Nothing else is asked of you. The row also requires that the result is written down as *empty for
this corpus at this time*, rather than as a claim about what Discord accepts — but **devops is the
recorder for that**, not you, and that constraint was mistakenly put on your list.

## 2. Then, in this order

**The live declaration to statbot.** Only after QA-R20 above. **Telling
statbot's steering thread is your call, not mine** — by D12 that chain has been held since
2026-08-23 and no session has been told. Record your words and the time.

**Send the repair guidance.** Only you can send it. Send exactly this:

> Open the message in the hooks.gg composer. It opens in Components V2 mode with an error saying
> V2 messages cannot contain content or embeds. Press "Classic" on the mode switch at the top of
> the message, then Save. Your text, embeds and link buttons are kept.

**Standing rule, for context:** no agent on this machine ever posts a message anywhere — not Discord,
modmail, support threads, email or ticket replies. Work that ends in "tell someone X" stops at
stating what should be said and to whom.
