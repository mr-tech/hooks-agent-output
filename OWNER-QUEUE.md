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

## 1. Post-deploy checks still open

Derived from the register in `qa/012-message-valid-field-qa.md`, not from this file's previous
state. **No release is recorded complete while any of them is unrun.** These five are independent of
each other — run them in any order.

**Use a scratch message you create for QA-R5, QA-R6 and QA-R7** — each one saves, and a save
recomputes `valid`. SCR-1 is now an ordinary Classic message and is free to reuse or delete.

**QA-R3 — positive control.** GET the v1 guild-messages endpoint for a guild holding a
bare-Text-Display V2 record. **Pass:** `valid: true` at top level, beside `id`/`name`. A `false` here
is the mass-invalidation failure, and it arrives as silence rather than as an error.

**QA-R8 — NULL sweep.** `SELECT count(*) FROM "Messages" WHERE valid IS NULL;` **Pass:** 0. **Must be
before the live declaration.** Run it as SQL — the backfill report corroborates this and is *not* the
instrument: its counters cover only the rows a given run classified, never the table.

**QA-R5 / QA-R6 — mode toggle, both directions, on a scratch message.** Toggle classic→V2, then
V2→classic. **Pass:** the "Switch message mode?" modal appears and warns you about losing content.
Cancel it; you do not need to confirm.

**QA-R7 — save an unsendable draft, on a scratch message.** Compose something deliberately unsendable
and save it. **Pass, two halves:** (a) the save **succeeds**, and (b) that record's v1 representation
then shows `valid: false`. **(a) is the one that matters** — if the save is rejected, the field has
become a gate, which the plan forbids.

## 2. Your decisions — no agent may make these

**QA-R9 — review the backfill's outcome distribution.** Read the report in `verification/012/`.
**This row is your decision, not a QA verdict, and no agent may mark it passed.** What the register
asks you to weigh: the `false` count including the evaluation-failure category's **count and row
ids**. A surprising distribution stops the live declaration. The risk it exists to catch: an
unexpected mass-invalidation reaching Statbot's gate as stopped deliveries across many guilds,
discovered by guild owners rather than by us.

**Not established by that report, in the same sitting:** the **per-field embed limits were never
evaluated** — only the 6,000-character aggregate — so records violating them sit inside the valid
count, uncounted.

**QA-R20 — the whitespace category, same sitting.** Confirm the class is present in the report as its
own named category, with a count **and** row ids. **Record a zero as: empty for this corpus, at this
time.** It is **not** a determination about Discord's behaviour and must not become one. A non-zero
count means records are being marked sendable on a shape nobody has tested Discord against.

**The live declaration to statbot.** Only after QA-R9 and QA-R20 are both reviewed and accepted.
**Telling statbot's steering thread is your call, not mine** — by D12 that chain has been held since
2026-08-23 and no session has been told. Record your words and the time.

**Send the repair guidance.** Ready, and only you can send it. Send exactly this:

> Open the message in the hooks.gg composer. It opens in Components V2 mode with an error saying
> V2 messages cannot contain content or embeds. Press "Classic" on the mode switch at the top of
> the message, then Save. Your text, embeds and link buttons are kept.

**Standing rule, for context:** no agent on this machine ever posts a message anywhere — not Discord,
modmail, support threads, email or ticket replies. Work that ends in "tell someone X" stops at
stating what should be said and to whom.
