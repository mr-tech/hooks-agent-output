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

## 1. Blocking — the post-release checks

Released and live; backfill done (4825 rows classified). These close the chain. **Nothing here is
optional: no release is recorded complete while any of them is unrun.**

### Read this before starting — two ways to destroy your own evidence

- **QA-R5, QA-R6 and QA-R7 must be run on a SCRATCH message you create. Never on message 5712.**
  Each of them saves, which recomputes `valid` and wipes out the preconditions of M6-c, QA-R2 and
  QA-R4. The published ordering only guards against QA-R15; this one it leaves implicit.
- **QA-R15 goes LAST.** It deliberately changes 5712, and afterwards QA-R2's expected answer becomes
  `true` rather than `false`.

### These four are ordered. Do them in this sequence.

**M6-c — sentinel spot-check.** Two SQL reads against production:
```sql
SELECT id, valid FROM "Messages" WHERE id = 5712;
SELECT id, valid FROM "Messages" WHERE id = <one known bare-Text-Display V2 record>;
```
**Pass:** 5712 → `false`; the bare-V2 record → `true`. **Do not check this against the backfill
report** — 5712's expected `false` traces to the Discord `400`/`50035` you recorded, and the report is
the predicate's own output, so using it here is circular. **Record both values and the time. If either
is wrong, STOP and do not run the rest.**

**QA-R2 — 5712 over the API.** GET the v1 guild-messages endpoint for guild `966088462803537960` and
find message 5712. **Pass:** `valid: false` appearing at **top level**, beside `id`/`name` — not inside
`data`. **Fail:** `true`, or the key missing entirely (missing means the row is still NULL, i.e. a
backfill gap).

**QA-R4 — 5712 in the composer.** Load it. **Pass:** the mutual-exclusivity notification shows **and**
Send is disabled. **Read-only — do not save.** Send still enabled means the original defect is unfixed.

**QA-R15 — LAST, and it persists.** Load 5712 and bring it to Send-enabled using the composer's
supported controls **only — no JSON modal**. Save. Then check the persisted record's flags.
**Pass, both halves:** it was reachable **and** the saved record carries **no `IS_COMPONENTS_V2_FLAG`**.
Without the second half the check proves nothing — Send-enabled is reachable on the old code too, by
rebuilding it as genuine V2 with the flag still set.

### These four are order-free. Any time.

**QA-R3 — positive control.** Same GET as QA-R2, but for a guild holding a bare-Text-Display V2
record. **Pass:** `valid: true` at top level. A `false` here is the mass-invalidation failure, and it
arrives as silence rather than as an error.

**QA-R8 — NULL sweep.** `SELECT count(*) FROM "Messages" WHERE valid IS NULL;` **Pass:** 0. **Must be
before the live declaration.** The backfill report corroborates this but is not the instrument — it is
one line of SQL, run it.

**QA-R5 / QA-R6 — mode toggle, both directions, ON A SCRATCH MESSAGE.** Toggle classic→V2, then
V2→classic. **Pass:** the "Switch message mode?" modal appears and warns you about losing content.
Cancel it; you do not need to confirm.

**QA-R7 — save an unsendable draft, ON A SCRATCH MESSAGE.** Compose something deliberately unsendable
and save it. **Pass, two halves:** (a) the save **succeeds**, and (b) that record's v1 representation
then shows `valid: false`. **(a) is the one that matters** — if the save is rejected, the field has
become a gate, which the plan forbids, and it goes back to the implementer.

## 2. Only you can do these — no agent may

**Decide row 5842 — this blocks sending the repair guidance, nothing else.** The backfill found two
records whose flags and structure disagree: 5712, which this whole chain is built around, and **5842,
which appears nowhere in any document except the backfill report**. The repair guidance drafted for
you has three shapes, all derived from 5712. If 5842 is a fourth shape, the guidance is wrong for it —
and the specific failure is that someone follows it and loses data doing exactly what they were told.
**One read of row 5842's `data` settles it:** is it (i) no components, (ii) type-1 components and no
content, (iii) both content and type-1 components, or (iv) none of those? Tell steering the answer.

**Review the distribution (QA-R9). Your decision — no agent may mark it passed.** Read
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
Then statbot 023 deploys its gate. Record your words and the time.

**Sending the repair guidance.** Devops has drafted it; the text is in the deployment record. **Held
until row 5842 is settled**, above.

**Standing rule, for context:** no agent on this machine ever posts a message anywhere — not Discord,
modmail, support threads, email or ticket replies. Work that ends in "tell someone X" stops at
stating what should be said and to whom.
