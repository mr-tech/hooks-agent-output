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

## 1. Your decisions — no agent may make these

**QA-R9 — does the backfill distribution stop the live declaration?** That is the whole question.
You are not confirming the script's arithmetic; you are making the judgement no agent may make.
The run is `verification/012/backfill-report-1787522866564-i3s31k.md` — the one table-wide run
(4825 classified of 4825 rows). **4750 valid, 75 invalid**, and the 75 are:

| Reason | Count |
|---|---|
| Username too short or too long | 36 |
| Must have content, embeds, or components | 29 |
| Username has invalid characters | 3 |
| Components text over 4000 | 3 |
| V2 message with embeds or content | 2 |
| Embeds over 6000 | 1 |
| Message too long | 1 |

**`evaluationFailures` is 0** — the number that would be alarming if it were not, since it means no
row failed to evaluate at all. **Say whether that looks like a normal residue or like something
broke.** If it looks normal, this is done. The risk it guards: an unexpected mass-invalidation
reaching Statbot's gate as stopped deliveries across many guilds, found by guild owners not by us.

**Not established by that report:** the **per-field embed limits were never evaluated** — only the
6,000-character aggregate — so records violating them sit inside the 4750, uncounted.

**QA-R20 — record the whitespace class as empty.** The class is records whose `data.components` is
structurally Components V2 **and** whose `content` is non-empty but **whitespace only**. It is
present in that same report as its own named category with a count and row ids, and reads
`"whitespaceContent": { "count": 0, "rowIds": [] }`. **All that is asked of you is to record it as:
empty for this corpus, at this time.** It is **not** a determination about what Discord accepts and
must not become one — the class is now empty *and* unguarded, and what lands in it next is decided
by gate behaviour nobody has tested.

## 2. Then, in this order

**The live declaration to statbot.** Only after QA-R9 and QA-R20 are both settled. **Telling
statbot's steering thread is your call, not mine** — by D12 that chain has been held since
2026-08-23 and no session has been told. Record your words and the time.

**Send the repair guidance.** Only you can send it. Send exactly this:

> Open the message in the hooks.gg composer. It opens in Components V2 mode with an error saying
> V2 messages cannot contain content or embeds. Press "Classic" on the mode switch at the top of
> the message, then Save. Your text, embeds and link buttons are kept.

**Standing rule, for context:** no agent on this machine ever posts a message anywhere — not Discord,
modmail, support threads, email or ticket replies. Work that ends in "tell someone X" stops at
stating what should be said and to whom.
