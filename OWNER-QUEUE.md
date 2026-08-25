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
of them is unrun.** Most are independent, but **the three that use the scratch record have a strict order** — see below;
running them out of order makes a working fix look broken.

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

### QA-R2, QA-R4 and QA-R15 — rewritten onto a scratch record, because you fixed 5712

These three are the last things blocking chain closure. All three use one purpose-made record,
**SCR-1**, because 5712 is repaired and nothing in the app can produce another stuck message any
more — that is the fix working, which is exactly why the subject has to be made by hand.

**Run them in this order. It matters:**

> **make SCR-1 → QA-R4 → QA-R2 → QA-R15**

**QA-R15 destroys the state the other two exist to observe** — every save recomputes `valid`, so once
you have pressed Classic and saved, R4 and R2 can no longer be observed on that record. Out of order
they report a Send-available composer and `valid: true`, which reads as *the fix never worked*, when
in fact it worked and was then overwritten.

**Step 1 — make SCR-1.** In a guild you control, create a normal Classic message in the composer:
username `QA Scratch`, content `QA-R4/QA-R15 scratch subject - safe to delete.`, no embeds, no
components. Then one SQL UPDATE on that row setting `flags` to `32768` **and** `valid` to `false`
**in the same statement**. Both in one statement matters: it keeps this off the backfill and out of
the distribution you review for QA-R9.

**If anything goes wrong, rebuild rather than interpret.** Re-running the creation SQL returns SCR-1
to the stuck state at no cost. A spoiled observation costs you a re-run, not a verdict — so if a
result is ambiguous, rebuild and repeat rather than deciding what it probably meant.

**QA-R4 — open SCR-1 in the composer.** **Pass:** it opens in Components V2 mode, shows the error
text *"Components V2 messages cannot contain embeds or content."* **verbatim**, and Send is not
available.
- **If it opens in Classic instead of Components V2, stop — that is the signature of the live site
  running old code**, not a broken fix. Nothing else in this group means anything until that is
  sorted.
- **If the error names a different reason, the result is void rather than failing** — SCR-1 was built
  wrong. Rebuild it.

**QA-R2 — read SCR-1 back through the API.** GET the v1 guild-messages endpoint for SCR-1's guild.
**Pass:** SCR-1 shows top-level `valid: false`. **If it shows `true`, or the key is missing, what
that means depends on what QA-R4 just did:**
- QA-R4 *did* show the error with Send unavailable → the check is working and the column was simply
  never set by your creation SQL. **Void — rebuild SCR-1 and redo R4 and R2.**
- QA-R4 showed *no* error → this is the real defect the row exists to catch. **Report it.**

**QA-R15 — last, because it ends SCR-1's stuck state.** Press "Classic" on the mode switch, then
Save. No JSON editor is involved, and **no "Switch message mode?" modal will appear** — that is
expected here and is not QA-R5/QA-R6 failing. **Pass, three parts:** the stuck flag is cleared, the
content is unchanged, and the record then reads `valid: true`. Send becoming available is **not**
sufficient on its own.

**One thing worth knowing about the order.** QA-R15's act — open, press Classic, Save — **is the
same thing the repair guidance tells guild owners to do.** So if you run QA-R15 before you send the
guidance, you will have seen the route work first-hand. You waived that as a requirement and it
stays waived; both orders are fine. Flagging it only because it is free if you happen to go that way.

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

**Send the repair guidance — READY, and only you can send it.** This is what you tell a guild
owner whose message won't send. Send exactly this:

> Open the message in the hooks.gg composer. It opens in Components V2 mode with an error saying
> V2 messages cannot contain content or embeds. Press "Classic" on the mode switch at the top of
> the message, then Save. Your text, embeds and link buttons are kept.

That is the whole instruction — you settled on the one route. The JSON-editor route also works and
is kept in the record as a fallback a support answer may name, but it is deliberately not in the
send.

**Recorded with your ruling, so it is not lost:** you chose to send this without anyone trying the
fix in the app first. Nobody has watched it work — 5712 and 5842 were repaired with SQL, not by
this route — so the first person to actually run it is an affected guild owner following our
instructions. That is your accepted risk and it is not being re-raised; it is written here because
a waiver recorded without its consequence is worse than no record. **If a guild owner reports that
this instruction lost their data, that reopens the route's mechanism — tell me and it goes back to
the planner.**

**Standing rule, for context:** no agent on this machine ever posts a message anywhere — not Discord,
modmail, support threads, email or ticket replies. Work that ends in "tell someone X" stops at
stating what should be said and to whom.
