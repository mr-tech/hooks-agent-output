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

## CHAIN 013 — LIVE. NOTHING IN THIS SECTION IS ON HOLD.

**Rebuilt 2026-08-25, because this file had gone stale and you caught it.** It held the pre-release
walkthrough you have already run, and was **missing six items outright** — BC-18, BC-19a, BC-19b,
BC-21, U-C5, U-C6. Your words: *"idk what this is. Not in OWNER-QUEUE"*. **That was a defect in this
file, and this file is the coordinator's.** You work from here; an item that is not here does not
exist to you, and relaying lists at you in chat instead is not a substitute.

**Where things stand.** `origin/master` = **`2d90e8a`**, your own commit, live. 013 released at
`a151fb4`; four post-release fixes and your removal of the code-path notice since. Registered as
**D30–D40**. **No QA, no code review and no UAT ran on any of it** — your waiver (D35) — and that
round now carries a **review debt that blocks chain closure** (D39), parked on your word.

### 013-A. Run these — nothing blocks them

| Do this | You should see | Tag |
|---|---|---|
| New Message → paste `{"components":[{"type":17,"components":[{"type":10,"content":"hi"}]}]}`. Then add `"flags":32768`. | A **persistent in-modal** warning that the flag was set to match — **not a toast**. Adding the flag clears it. | **BC-18** |
| The same deliberate paste **on the live site**, once. | The notice renders. **This one exists because a notice that fails to render looks exactly like nothing having been dropped** — waiting for user reports cannot detect an absence. | **BC-21** |

**Both predictions are stale and I am not going to pretend otherwise.** Under D31/D32 the resting
state of a conflict is now the error line with the **`Resolve`** control, not the two choice buttons.
**Write down what you actually see; do not try to match the old wording.**

### 013-B. Still owed to you by me — do not wait on these

- **BC-4** — *an import with no content at all; the dialog stays open showing the error, navigates
  nowhere, creates nothing.* **I still have not written you a payload.** It stays visibly owed rather
  than me authoring a fixture for a row I do not own.
- **BC-5** — *paste a folder-page export; expect* **"Message must have content, embeds, or
  components."** **Nobody has established what a folder-page export literally looks like.** UAT
  refused to invent one, correctly — a made-up fixture makes the step read as executed while testing
  nothing.

### 013-C. Decisions, no browser needed

- **BC-2 / BC-3 — and there is now a discrepancy in your own report I will not resolve for you.**
  You said BC-2's notice showed and you removed it. **BC-2's notice is on the import dialog
  (`NewMessageModal`) and still exists**, reworded by you to `Not supported on Hooks.gg:`.
  **BC-3's is the editor-side one you deleted.** If what you saw was the dialog notice, that is BC-2
  observed and BC-3's subject gone — two different outcomes. **Tell me which and I record it.**
  Your three standing options are unchanged: **withdraw both** (what ships unobserved is whether the
  notice *renders* on the Discord-ingress surfaces); **give me one URL**, if a Discord message with a
  select menu is already in front of you — one message, not a hunt, and it covers both; or **leave
  them open**, non-terminal, still blocking an unconditional approval. **They are a timed pair** —
  BC-3 must run inside a 1h TTL of the Get Message call on the *same* message.
- **U-C5** — R-5's widening. It is the blocking edge before any deployment record.
- **When to repair 5712 and 5842.** *"Haven't done it yet."* **This one closes a door if you act, not
  if you wait** — they are the only live proof of the problem. 013 made the JSON-editor route
  non-destructive for this shape while the mode toggle still destroys content, so the two repair
  routes are no longer equivalent. **They are also the only records that can still reach
  `SaveAsMenu`'s conflict gate**; once repaired, removing that gate becomes a fair question.

### 013-D. Do NOT run these — their subject is gone or they were never runnable

**None of these is closed. I am telling you not to spend time on them, not recording a result.**

- **BC-19a / BC-19b** — you ran 19a and then deleted `CodeMessageNotice.tsx`. **Their subject no
  longer exists.** Whether that discharges them, voids them, or leaves the release verdict short is
  **`uat`'s ruling and nobody else's** — the standing verdict is *approved conditional on BC-18,
  BC-19a and BC-19b*, so two of its three conditions now have no object. **Routed, not decided.**
- **BC-15** — needs a 5712-shaped record; it inherits the population **BC-11b** is already
  `TERMINAL: CANNOT BE EXECUTED` over. UAT states that as judgement and did **not** close it.
- **BC-11b** — `TERMINAL: CANNOT BE EXECUTED`. **A fourth terminal state. Never read it as "closed."**

### 013-D2. Prediction stale — do not execute against the old wording

**BC-1, BC-6, BC-7, BC-8, BC-9, BC-10** (and BC-18/BC-21 above). The code beneath them moved under
D30–D33. **BC-9's "two options" is specifically no longer the default.** Executing a row against
wording the code no longer produces yields a **false failure** — UAT marked these rather than
rewriting them, and I did not object.

### 013-E. Rules for the whole sitting

- **If a test message opens as Classic with no V2 error and no components section**, that is
  genuinely ambiguous — it could be a bug in how the message is read back, or the dialog simply not
  firing. **Write down exactly what you saw and hand it back. Don't decide which it is.** Same if
  you get a validation error where a choice dialog was expected.
- **If Save As gives you a guild error, that is a new problem, not one we already know about.**
  Worth reporting rather than shrugging at — QA tested that path and it worked.
- **If anything contradicts step 6, tell me.** That reopens QA's verdict. It is not an old known
  quirk to be explained away.
- **Any step that fails goes back to the implementer before release.**

### 013-F. Standing decisions of yours, still open

- **What happens to the test messages afterwards.** Genuinely unruled. My instruction to keep them is
  filling that gap by default, which is not the same as you having decided.
- **`SaveChoiceModal.tsx`** — a file the plan never named. Precedent in this chain says adding a file
  to the inventory is yours to approve.
- **Server-side validation on save** — the thorough fix for a medium finding. More scope than 013 has,
  so it stays out; what shipped is the documented limitation.

**Settled since this file was last accurate, and deleted from the list rather than ticked:**
rollback (**BC-11b** terminal; Vercel promote is your choice and does **not** move `master`);
when the retrospective runs (**D38** — held on your judgement that findings are still accruing, with
your reason now on the record so no stage fires the trigger on elapsed time); and **the notice you
had never seen** — that vague flag is what you just hit. It was `CodeMessageNotice`, an earlier
steering thread declined to route it to you, and **D40 records that you never approved it and that
the record confirms you didn't**.

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
