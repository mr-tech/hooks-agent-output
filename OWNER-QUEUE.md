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

## 1. Run these — the hold is lifted

You withdrew D20 today (*"013 closed out fixing the JSON importer which was blocking 012. You are
picking up 012."*), so every check below is live again. **No release is recorded complete while any
of them is unrun.** None depends on another — run them in any order.

**Use a scratch message you create for QA-R5, QA-R6 and QA-R7.** Each one saves, and a save
recomputes `valid`. QA is re-specifying two rows (below) and will nominate a subject; don't disturb
whatever it names.

**QA-R3 — positive control.** GET the v1 guild-messages endpoint for a guild holding a
bare-Text-Display V2 record. **Pass:** `valid: true` at top level, beside `id`/`name`. A `false` here
is the mass-invalidation failure, and it arrives as silence rather than as an error.

**QA-R8 — NULL sweep.** `SELECT count(*) FROM "Messages" WHERE valid IS NULL;` **Pass:** 0. **Must be
before the live declaration.** Run it as SQL — the backfill report corroborates this and is *not* the
instrument: its counters cover only the rows that run classified, never the table. Worth knowing
before you do: the table has grown 4825 → 4839 since the first backfill, and a run at 07:47 today
classified 2 rows that were still NULL. Whether a writer path is leaving rows unset is unmeasured.

**QA-R5 / QA-R6 — mode toggle, both directions, on a scratch message.** Toggle classic→V2, then
V2→classic. **Pass:** the "Switch message mode?" modal appears and warns you about losing content.
Cancel it; you do not need to confirm.

**QA-R7 — save an unsendable draft, on a scratch message.** Compose something deliberately unsendable
and save it. **Pass, two halves:** (a) the save **succeeds**, and (b) that record's v1 representation
then shows `valid: false`. **(a) is the one that matters** — if the save is rejected, the field has
become a gate, which the plan forbids, and it goes back to the implementer.

## 2. Only you can do these — no agent may

**Review the distribution (QA-R9). No agent may mark it passed.** Read
`verification/012/backfill-report-1787522866564-i3s31k.md`. Figures: **4825 classified, 4750 valid, 75
invalid**; `evaluationFailures` **0**; `flagStructureDisagreement` **2** (5712, 5842) with
`flagStructureDisagreementValidTrue` **0**, meaning neither was stored as valid. **A surprising
distribution stops the live declaration, not deliveries.** Record your words and the time.

**One thing the clean report does NOT establish, in the same sitting.** The only embed check in that
breakdown is the 6,000-character aggregate. The **per-field embed limits were never evaluated**, so
records that violate them are sitting inside the 4750 marked valid, uncounted. A clean report is not
evidence against that risk, and a working system is the most persuasive possible argument for
quietly treating it as if it were.

**QA-R20 — the whitespace category, same sitting.** Confirm the category is present with both a count
and row ids. Measured **0**. **Record it as: empty for this corpus, at this time.** It is not a
determination about Discord's behaviour and must not become one — the class is now empty *and
unguarded*, and what lands in it next is decided by gate behaviour nobody has tested.

**The live declaration to statbot.** Only after QA-R9 and QA-R20 are both reviewed and accepted.
Then statbot 023 deploys its gate. **Telling statbot's steering thread is your call, not mine** —
by D12 that chain has been held this whole time and no session has been told. Record your words and
the time.

**Sending the repair guidance — not ready for you yet, and that is the only reason it is listed.**
This is the message telling a guild owner how to unstick a message that won't send. **You settled
what it says: switch the message to Classic and save.** One instruction — since 013 shipped, that
clears the stuck flag in one click and keeps their content, embeds and buttons.

**Waiting on:** the planner finalising the wording. Nothing here is yours until that lands, and
then sending it is yours alone — no agent may post it.

**Recorded with your ruling, so it is not lost:** you chose to send this without anyone trying the
fix in the app first. Nobody has watched it work — 5712 and 5842 were repaired with SQL, not by
this route — so the first person to actually run it is an affected guild owner following our
instructions. That is your accepted risk and it is not being re-raised; it is written here because
a waiver recorded without its consequence is worse than no record.

**Standing rule, for context:** no agent on this machine ever posts a message anywhere — not Discord,
modmail, support threads, email or ticket replies. Work that ends in "tell someone X" stops at
stating what should be said and to whom.
