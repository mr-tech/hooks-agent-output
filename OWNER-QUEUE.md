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

## CHAIN 013 — LIVE. NOTHING IN THIS SECTION IS ON HOLD.

**Where things stand.** `origin/master` = **`2d90e8a`**, your own commit, live. The chain's work sits on
branch `chain/013-rider-2` at `b56570d`, **unpushed — nothing has been released.**

**`uat` has issued the release decision: APPROVED FOR RELEASE, conditional on the eight checks below.**
Code review and QA are both complete at that commit. **If any of the eight fails it goes back to the
implementer rather than out.**

**The release decision was not yours to make and is not listed here as an item** — it is `uat`'s, written
against the condition ledger. What *is* yours is the eight checks, because no instrument in this chain
can reach them.

### Chain 013 — eight things to check before the merge

**Why before the merge:** pushing to `master` deploys. There is no window between merging and shipping, so
these happen first. **If any of them fails, it goes back to the implementer rather than out.**

**How to report each one:** *pass*, or *what you actually saw*. **If you cannot reach a step, say so —
that is a result, not a gap.** Nothing here needs you to fetch anything from Discord.

---

**1. The Load confirmation tells the truth. (BC-1) — do this one first.**

*Why first: every automated test in this chain stops at the text the dialog is handed. **Nothing proves the
dialog puts it on screen.** You are the only instrument that reaches this.*

- Paste this into **New Message** and save it — that is your V2 test message, no hunting required:
  `{"components":[{"type":17,"components":[{"type":10,"content":"hi"}]}]}`
- Open it, change the JSON so the message would come out **Classic** instead, and press **Load**.
- **Read the confirmation dialog before you confirm anything.**

**Passes if the dialog names *both*:** which top-level components are being added or removed, **and**
whether the message type changes (V2 ↔ Classic). **Both must be right — either one wrong is a fail.**

**Fails if** it says the type changes when it does not, **or** says nothing about the type when it does
change — and also if it is **empty, truncated, or showing text from a previous message.** That last one
matters most: **the text can be correct and the screen still wrong**, and no test in this chain can see it.

---

**2. Pasting a V2 container gives you V2, with the flag actually set. (BC-7)**

- Paste into **New Message**: `{"components":[{"type":17,"components":[{"type":10,"content":"hi"}]}]}`

**Passes if all three:** the editor is in **V2** · the container is there · **a warning is shown**
· **and the V2 flag bit is set.**

> **The flag bit is checked by opening the Message JSON. Not by the screen looking right.** Everything can
> look correct on screen while the message is wrong on the wire — the JSON is the only place it shows.
> **"It looked fine" is not an answer for this one.**

---

**3. Pasting a flag over plain content gives you Classic, and keeps your text. (BC-8)**

- Paste into **New Message**: `{"content":"hi","flags":32768}`

**Passes if all five:** the editor is **Classic** · the text `hi` is still there · **a warning is shown**
· **no V2 error appears** · **and the V2 flag bit is cleared.**

> **Same rule as above: the bit is checked in the Message JSON, not on screen.**

---

**4. Pasting both content and components asks you which to keep. (BC-9)**

- Paste into **New Message**: `{"content":"hi","components":[{"type":17,"components":[{"type":10,"content":"hi"}]}]}`

**Passes if all of:** you are offered **two options** · **each one says what it will drop** · **nothing is
created before you choose** · **backing out leaves your message and the pasted text exactly as they were**
· **and both options work** — take one, then repeat and take the other.

> **NOT a failure:** the two options **do not appear on their own**. A notice appears first with a
> **Resolve** link, and the options are behind it. **That is the intended behaviour.**

---

**5. An unsupported component is named, not silently dropped. (BC-6)**

- Paste into **New Message**:
  `{"components":[{"type":17,"components":[{"type":10,"content":"hi"}]},{"type":11,"media":{"url":"https://picsum.photos/200"}}]}`

**Passes if:** the container survives **and the notice names the dropped type** — it must say what was
removed, not just that something was.

> **NOT a failure:** a *container that ends up empty* being removed without being named. That is by design
> and is a different case from this one.

---

**6. The paste warning stays put, and goes away when you fix the JSON. (BC-18)**

- Paste either item 3's or item 4's payload into **New Message** and leave the modal open.

**Passes if all three:** a warning **appears** · it **stays** — it does not vanish on the next keystroke ·
**and it clears once you correct the JSON.**

> **NOT a failure:** if you correct it *through* a state that has both V2 components and ordinary content,
> the warning is **replaced** by a different notice with a **Resolve** link rather than disappearing.
> **A notice that changes is not a notice that failed to clear.**

---

**7. The same paste behaves the same way in both places. (BC-10)**

- Take **any one** of the payloads above. Paste it into **New Message**. Then paste **the same one** at the
  **Load** surface on an existing message.

**Passes if:** both surfaces do the same thing — same outcome, same thing dropped, same kind of notice.

*(The automated half of this is already done. This is one spot-check by eye that the two surfaces agree.)*

---

**8. A bad import keeps the dialog open instead of navigating away. (BC-4) — THIS ONE IS NOW YOURS. The fixture exists.**

*This replaces the "BLOCKED, NOT ON YOU" version. Nothing was owed by you before and nothing was missed. It is now the last of the eight.*

- Open **New Message** and click the **JSON** tab.
- Paste exactly this, replacing whatever is in the box:

  `{"content": ""}`

- **Stop there. Read the area directly below the JSON box before you press anything.**

**It passes if all three hold:**

1. **The dialog stays open.**
2. **The message below the box reads exactly:** `Message must have content, embeds, or components.`
3. **Then** press **Continue**. **Save is greyed out and does nothing**, and **you are not taken anywhere** — no new message is created.

**Three ways to get a wrong answer. If you hit one, write what is in bold instead of *pass* or *fail*:**

- **You pressed `Continue` before reading below the box.** Page 2 does not show that error. You get a greyed-out **Save** with nothing on that page saying why. **This is not a failure — go back to the first page and read there.** (The missing explanation on page 2 is a real defect; it is already written down, and it is not what this check is about.)
- **You used `{}` instead.** Don't — it looks like an equally good test and isn't. It breaks the same rule, but the check that produces the error never runs on it, so you get **no error and a greyed-out `Continue`**. That is neither pass nor fail. **If that is what you saw, write "not executed".**
- **You pasted `{"content": ""}`, the text is visibly sitting in the box, and still no error appears and `Continue` stays greyed out.** **That one is a finding, not a mistake on your part — write down exactly that.** It would mean the editor never handed your text to the app, which nothing in this chain has ever tested.

**One thing that is not the answer:** the JSON tab shows its own complaints while you are still typing — malformed JSON and schema errors, inside the accordion. Those don't settle anything. **Only the exact sentence in point 2 does.**

*Lifted verbatim from `uat` register **rev 45, §R45.3** (`d60174d`). If that register is past rev 45,
this copy may have drifted — the register is authoritative, not this page.*

---

**Four checks. All four are about the site as it is running right now. Three are clicks; one is a question that may have no answer, and "no answer" is a fine reply.**

**One thing you will notice, and it is not a fault.** The message the app shows when a load changes your message is **shorter than our notes describe** — it no longer lists which component types were added or removed. **That is your own "remove unnecessary diff" change and it belongs there.** The separate *dropped-components* warning is untouched, and check 12 depends on that one. Nothing in these four checks depends on the wording you removed.

---

**9. Does a V2 message still send after the deploy? (BC-12)**

- Open a **V2 message you already have** — ideally one that sent fine before today.
- **Save As** to make a copy.
- **Send the copy to Discord.**

**It passes if both hold:**
1. **The copy actually appears in Discord.**
2. **No error appears in the app.**

- **If the send fails with any error at all, that is a fail and it is a hotfix trigger — not a try-again.** **Do not send it a second time to see whether it works.** One failure decides this row. **Write down the error text exactly as it appears.**
- If you have no pre-existing V2 message and build a fresh one instead, **say so** — it still counts, I just need to know which it was.

---

**10. Is the original defect actually fixed in production? (BC-14) — four things, and two of them are invisible unless you open the Message JSON.**

**All four are owed. Three passing is not this check passing.**

- **(a)** Take a **V2 message with components on it**. Press **Save As**. → **The copy has every component the original had. Count them.**
- **(b)** On that copy, open **Message JSON**. → **The components are there in the JSON. Count them there too.**
- **(c)** Open **the same message in two browser tabs**. In tab 1, change **only a component** — touch nothing else — and **Save**. Switch to tab 2. → **Tab 2 shows "Message Update Detected".**
- **(d)** Now press **Save** without changing anything at all. → **Nothing is raised. No "Message Update Detected".**

- **(b) is the one that fails silently.** The screen can look completely correct while the JSON is missing the components. **"It looked right" is not an observation of (b).** **Give me both numbers.**
- **(c) fails by something NOT appearing; (d) fails by something appearing.** They are opposites on purpose. If (c) shows nothing, switch tabs once more before calling it — but if it still shows nothing, that is a fail.
- **If the two counts differ from each other, or from what the original had, that is the defect.** Write down all three numbers.

---

**11. Can Discord hand us a message with both text and components? (BC-17) — a question first. Do not build anything for this one.**

**The question: do you know of a Discord message that is old enough to predate Discord's V2 rules AND has both ordinary text content and components on it?**

- **If yes:** import it by link. **It passes if you are shown a choice naming what would be dropped**, rather than the app silently keeping one and losing the other. **Tell me which of the two you saw.**
- **If no, or you cannot find one:** reply exactly **`BC-17: no such message known`**. **That is a real answer and it is the one I expect. It does not fail the check.**

**If your answer is "no such message", then this check cannot be executed by anyone — tonight or later.** What it needs to run is the very thing it is asking whether exists, and neither QA nor I will manufacture one. **So I am recommending you withdraw it, and here is what withdrawing costs, plainly:**

> **The import path's mixed-message branch ships untested and unobserved. No automated test in this chain covers it. If Discord ever does return such a message, the user importing it loses half of it with no prompt — and nothing in this system would tell you it happened.**

**That risk is what you would be accepting. Only you can withdraw it.** Reply **`withdraw BC-17`** if you accept that, or **`BC-17 stands`** to leave it open past this chain.

---

**12. Does the dropped-components warning actually stop an unaware send? (BC-20)**

- **Do an import that drops components** — **the same import you used for BC-6 earlier tonight is exactly right**, since that check's whole point was that something got removed.
- **Then head toward sending it.**

**It passes if all three hold:**
1. **A warning appears saying components were dropped, and it names what was dropped.**
2. **The warning is still in front of you when you go to send** — you cannot reach a send without having seen it.
3. **You cannot publish it without that warning having been shown first.**

- **A warning that appears but names nothing is a finding, not a pass.** **Write down exactly what it says**, word for word.
- **What this can and cannot settle, so you are not misled by a pass:** it shows the guard **fires**. It cannot show that no message has ever gone out unaware — that one is an absence, and no amount of nothing-going-wrong is evidence for it. **I will record it as exactly what you saw and nothing wider.**

---

**Reply in one go — this format finishes it:**

```
BC-12:  sent / failed  (+ exact error text if failed)
BC-14:  copy=N   json=N   other-tab-prompt=yes/no   no-op-save=quiet/prompted
BC-17:  no such message known    — or —   choice shown / silently lost
        (+ withdraw BC-17  /  BC-17 stands)
BC-20:  warning=yes/no,  it said: "…"
```

*Authored by `uat-hooks-013-6` and lifted verbatim from its report to steering, 2026-08-25. **Steering
checked afterwards: `uat` rev 50 (`61b4b48`) records these checks' derivation — each traced to its own
register cell — but does NOT carry this operator text verbatim. So this page is currently the only copy
of the text as delivered, and an earlier version of this stamp wrongly claimed rev 50 carried it.**
`uat` has been told. The register remains authoritative for what the checks MEAN; this page is the
authority for what was actually put in front of the owner.*

---

*End of the section for `OWNER-QUEUE.md`.*

### Decisions, no browser needed

Nothing.

## EVERYTHING BELOW IS ON HOLD — 2026-08-23

**Your words:** *"This effort is on hold until the fixes are implemented."* Registered as **D20**
(plan rev 34, `827dfb0`), read as the whole effort and as the Components-V2 editing fixes.

**Nothing in this file is asking you to do anything right now.** It is kept rather than emptied
because none of it is done and none of it is withdrawn — the hold is a pause, not a disposition.
When the hold lifts, this is the list, unchanged.

**One consequence you may not have had in view when you said it:** the live declaration is in here,
and D12 orders statbot chain 023's deploy of its `valid` gate *after* that declaration. So statbot
023 is held too, for as long as this is. No session has been told — telling statbot's steering
thread is yours to call, not mine.

## 1. On hold — the post-release checks

Released and live; backfill done (4825 rows classified). **Nothing here is optional: no release is
recorded complete while any of them is unrun.** They no longer close the chain on their own —
you ruled QA-R4 and QA-R15 stay open, so closure waits on the separate Components-V2-editing
research effort however these go. Run them anyway; each one is a live defect check.

### Read this before starting — do not destroy your own evidence

**QA-R5, QA-R6 and QA-R7 must be run on a SCRATCH message you create. Never on message 5712.** Each
of them saves, which recomputes `valid`. 5712 is still the subject of two open rows, and a save
wipes their preconditions permanently.

### Run any of these, any time — none depends on another

**QA-R3 — positive control.** GET the v1 guild-messages endpoint for a guild holding a
bare-Text-Display V2 record. **Pass:** `valid: true` at top level, beside `id`/`name`. A `false`
here is the mass-invalidation failure, and it arrives as silence rather than as an error.

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

## 2. On hold — only you can do these, no agent may

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

**Sending the repair guidance. Now held on two independent grounds, not one.**
Devops has drafted it; the text is in the deployment record.
- **Row 5842's shape is unknown** — above.
- **The guidance's main route may itself destroy content.** Its shape-(i) advice points affected
  guild owners at the JSON editor's **Load** — and shape (i) is the shape 5712 actually has, measured
  from production. Your observation that the JSON view may strip V2 content is a candidate falsifier
  for exactly that route. Candidate, not established. If it holds, the guidance tells people to do
  something that loses their data, and it reads to them as a hooks.gg bug rather than as following
  instructions. **Do not send it until this is settled**; the generic research handoff is written and
  committed.

**Standing rule, for context:** no agent on this machine ever posts a message anywhere — not Discord,
modmail, support threads, email or ticket replies. Work that ends in "tell someone X" stops at
stating what should be said and to whom.
