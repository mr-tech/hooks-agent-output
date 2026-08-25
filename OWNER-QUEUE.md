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

Added 2026-08-25 by steering-hooks-013-2. **Every agent gate is met**: QA Complete and code review
APPROVED, both at `a151fb4`; UAT Complete, APPROVED FOR RELEASE **conditional on the walkthrough
below**; plan rev 21, `Status: UAT Approved`. **The release cannot proceed until you run this.**

**Authority for depth**: UAT's Appendix B, rev 11 (`86c9afb`). The steps below are the executable
extract so you need open nothing else. **If the two ever disagree, Appendix B wins and this file is
the defect.** One deliberate difference: Appendix B names the tip as `821330d`; it is now
**`a151fb4`** — the delta is one commit, three test files, zero production files, so behaviour is identical.

### 013-A. MINT SPARE SEEDS FIRST. Two minutes, and it expires at the deploy.

**Do this before anything else in the sitting.** Paste each into production's New Message JSON at
the CURRENT production site (still `c85945f`), exactly as you minted 5855 and 5856:

    {"content":"hi","flags":32768}                      ← 5712-shaped
    {"content":"hi","flags":32768,"components":[]}      ← 5842-shaped

**Four of each.** **Why it is not optional:** BC-11b's own predicted value requires *"both outcomes
verified by repeating with the other option"*, and taking an option **writes to the record and
consumes it**. Two shapes × two controls × both options = four destructive legs. **On two seeds the
row cannot be run to its own prediction.** The mint route closes **at the deploy**, not at the
sitting — so the window is open now and shuts the moment you release.

**If production's New Message JSON refuses the paste, record what you saw and stop.** Do not
conclude the route is closed.

### 013-B. Before you start

- [ ] Chain tip **`a151fb4`** served and reachable, logged in as yourself.
- [ ] Seeds **5855** and **5856** present, **plus the spares** — confirm in the messages list first.
- [ ] **The components section EXPANDED in the composer.** Collapsed, there is no add-component
      control and **BC-11b reads as unreachable when it is not** — the single most likely way to get
      a false negative in the whole sitting.
- [ ] A **scratch V2 message** that is not a seed (any ordinary message with components) — for BC-1.
- [ ] A **Discord message carrying a select menu**, reachable by URL — for BC-2, and the **same**
      message for BC-3.
- [ ] A **folder-page export** to paste — for BC-5.
- [ ] A JSON payload with a **top-level Thumbnail (type 11)** — for BC-6.

**The trade-off, stated because it is yours to accept:** the only selectable `DATABASE_URL` is the
remote hosted database, so a locally-served tip **already sees the seeds and no seeding step is
needed** — and anything you save during the sitting lands in the real account. A Vercel preview of
the chain branch is the alternative if branch pushes produce one, but **it points at the same
database**, so it changes where the code runs, not what the writes touch.

### 013-C. Four ordering rules — three of these were invisible until someone looked

1. **BC-11b before BC-15 on any given record.** BC-15's Load applies row D, leaving the draft
   Classic with the bit cleared — **no longer a row-E candidate**, which is exactly what BC-11b needs.
2. **After BC-15's Load, do NOT press Save.** Load changes the draft, not the stored record; saving
   persists the cleared bit and consumes the seed.
3. **Seed containment. Only BC-11b and BC-15 touch seeds or spares.** BC-1, BC-7, BC-8 and BC-9 all
   drive Load or paste flows that clear the flag or write a record — run on a seed they consume it
   exactly as a stray Save would. Everything else runs on scratch input.
4. **BC-2 → BC-3 is a timed pair.** BC-3's Get Message run **starts a one-hour TTL clock** and must
   complete inside it on the **same** message. **Do not start it until ready to do both.**

### 013-D. The run, in order

**Recording rule throughout: write the observed result BESIDE the prediction, never over it.** Your
attestation quoted with its timestamp is complete evidence — **no capture file is owed and none will
be recorded as missing.** Every "expect" below is a prediction, not a result.

| # | Row | Do | Expect |
|---|---|---|---|
| 1 | **BC-11b** *(blocking)* | On a **5712-shaped seed**: open → confirm V2 mode, V2 error visible, body `hi` present → add **one container** → **Save** | The ask appears and **names BOTH drops**. Nothing written yet |
| 2 | BC-11b leg 2 | **Dismiss without choosing**, re-open the record | Nothing was written. **The easiest leg to skip** |
| 3 | BC-11b leg 3 | Repeat 1 then **take option A**; on a spare, repeat and **take option B** | Each option lands what it names and drops what it names. Both consumed — expected |
| 4 | BC-11b at **Save As** | Repeat 1–3 at **Save As** instead of Save, on spares | Same behaviour at both controls |
| 5 | BC-11b on **5842 shape** | Repeat 1–4 on a 5842-shaped seed | Same result |
| 6 | **BC-15** *(blocking)* | On a **fresh 5712-shaped seed**: open Message JSON → **is Load enabled, not inert?** → press **Load** with zero edits → **THEN STOP. DO NOT SAVE** | Button **enabled**; warning appears; body `hi` survives; record shows Classic |
| 7 | BC-1 | On the **scratch** V2 message: open Message JSON, change something, Load | Confirmation names which top-level types are added/removed and whether the mode changes |
| 8 | BC-7 | New Message paste `{"components":[<container>]}` | Editor in V2, bit set, visible warning |
| 9 | BC-8 | New Message paste `{"content":"hi","flags":32768}` | Classic, `hi` intact, bit cleared, visible warning, **no** V2 error. *This shape is now disposed of, not minted — this step is the evidence D20's route is closed at the tip* |
| 10 | BC-9 | Paste `{"content":"hi","components":[<container>]}`; dismiss once, then run twice more taking each option | Two options, each naming its drop. Nothing created until one is taken |
| 11 | BC-10 | **Deliberately** repeat steps 8 and 9 at the **modal Load** surface as well as the paste surface | Identical row, drop set and notice class at both. *"Satisfied incidentally" is not a terminal state* |
| 12 | BC-6 | Paste JSON with a **top-level Thumbnail (type 11)** | The notice **NAMES** the dropped type. Today it is silent; a component vanishing without trace is the failure |
| 13 | BC-5 | Paste a **folder-page export** | The composer's floor error — *"Message must have content, embeds, or components."* **A green state here is the failure** |
| 14 | BC-4 | Attempt an import that fails the floor | Dialog **stays open** with the error and does **not** navigate. No new message created |
| 15 | BC-2 | Import by **URL** a Discord message carrying a **select menu** | Dialog shows supported components **and** a notice naming the select |
| 16 | BC-3 *(starts the 1h clock)* | Run the bot's **Get Message** on the **same** message, then load the code | The editor shows the same notice, within the TTL |

### 013-E. Rules that govern every step

- **Ambiguity rule.** A seed opening in **Classic with no V2 error and no components section** is
  **ambiguous** between a read-path defect and the ask not firing. **Record exactly what you saw and
  hand it back — do not conclude either.** Same for a validation error appearing instead of the ask.
- **A guild error at Save As is a NEW finding, not F-QA11.** F-QA11 is bounded to a New Message
  site; Save As reaches the boundary as `null`, which QA executed and found accepted. So a guild
  error at step 4 is positively distinguishable and worth reporting.
- **If an observation contradicts the gate — BC-15 above all — that is a finding and QA wants it
  back.** It re-opens QA's verdict. It is not a stale fixture for anyone to explain away.
- **Any row failing returns to the implementer before release.**

### 013-F. Decisions still yours, none blocking the walkthrough

- **The D19 repair ordering — this one forecloses if you act, not if you wait.** M8-G's production
  observation exists **only while 5712/5842 are unrepaired**. Repairing kills validation item 8
  permanently. Either take the observation first or say you are forgoing it. **New since this was
  first raised:** 013 makes the editor path **lossless** for this shape while the toggle path still
  destroys content, so the two repair routes are no longer equal in cost.
- **The seeds' disposition.** D20 expressly left it unruled, and my instruction to you not to delete
  them is occupying that space. Spares make this cheaper either way.
- **The rollback mechanism.** Release condition 7 says the serving ref moves back to `c85945f`, but
  the release is a fast-forward so that is a **force-push**. A Vercel dashboard rollback leaves the
  git ref at the 013 tip, so the next ordinary push silently re-deploys 013; a revert commit moves
  forward, so "rollback to `c85945f`" becomes true of behaviour but not of the SHA. **The plan
  chooses neither, and choosing at the console during a bad release is the failure mode.**
- **Today's auto-deploy answer.** Your 2026-08-23 *"Yes, push auto-deploys."* is recorded as a dated
  prior answer, not as today's fact — it is unestablishable from the repo. Benign for 013 (one
  component in the release order), but devops needs it confirmed before Stage 2.
- **`SaveChoiceModal.tsx`** — a tracked file the plan does not name, added in `66e1974`. D14 shows
  this plan treats adding a file to the inventory as owner-authorised.
- **MEDIUM-4's preferred fix** — server-side validation at the tRPC `message.upsert` procedure. It is
  scope growth and stays blocked; the minimum (document the trust boundary) is what shipped.
- **M4-b's notice clause** — an earlier steering generation declined to route it and **you have never
  seen it**. It is now implemented. It must not reach you as though you had ruled on it.
- **Retro timing.** `steering.md` fires the retrospective on QA Complete plus UAT Complete *"even
  when release execution happens outside the pipeline"*; you said *"Retro doesn't happen until after
  devops and release."* **I am following you.** Flagged because it is a claim about how your own
  system works, and that is a fact to settle rather than a ruling for me to register on your behalf.

---

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
