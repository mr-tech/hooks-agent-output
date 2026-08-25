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

Rewritten in plain English 2026-08-25 by steering-hooks-013-2, at your request. Nothing below is new
work — it is the same walkthrough, said properly.

**Where things stand.** Every check an agent can run has passed: the tests pass, the code review
passed, and UAT has approved the release **on condition that you click through the list below**.
The release does not go out until you do. **Nothing here needs you to open another document.**

**Two names you will see in the steps.** They are just labels so you can tell me which step you
mean when you report back:

- **BC-1, BC-11b, BC-15…** — the numbered checks UAT is waiting on. Quote the tag when you tell me
  what happened and it lands in the right row.
- **Seed A** and **Seed B** — the two deliberately-broken test messages you created yesterday
  (5855 and 5856). Seed A is the one with text and the V2 flag; Seed B is the same plus an empty
  components list. You did not record which ID is which, and **it does not matter** — the run
  covers both.

**Where this came from.** UAT wrote the full version (its Appendix B, revision 11). This is the
short executable version of it, so you need open nothing else. **If the two ever disagree, UAT's is
right and this file is the one at fault — tell me.** One difference is deliberate: Appendix B says
to serve commit `821330d`; use **`a151fb4`** instead. The only difference between those two is
three test files, so the app behaves identically.

### 013-A. First: make eight spare test messages. This takes two minutes and the chance disappears at release.

**This is not the thing you did yesterday.** Yesterday you made the two originals. This asks for
spares of the same two shapes, because the run below **destroys a test message every time it takes
a choice**, and there are four such moments per shape. With only the two you have, you run out
halfway.

**Do it on the live site as it is right now** (nothing has been deployed yet), the same way you made
the originals — paste into New Message JSON and save:

    {"content":"hi","flags":32768}                      ← four of these = Seed A spares
    {"content":"hi","flags":32768,"components":[]}      ← four of these = Seed B spares

**Why the timing is fixed:** once 013 is live, nothing in the app can create this shape any more —
that is the whole point of the change. So this is the last chance, and it ends at the moment you
release, not at the end of the sitting.

**If the site refuses the paste**, write down what it said and stop. Do not assume the route has
already closed.

### 013-B. What you need before you start

- [ ] The new build (`a151fb4`) running and reachable, and you logged in.
- [ ] The two original test messages **and the eight spares** visible in your messages list.
- [ ] **The components section expanded in the editor.** If it is collapsed there is no "add
      component" button, and step 1 will look impossible when it is not. **This is the single most
      likely way to get a wrong answer today.**
- [ ] An ordinary V2 message that is **not** a test message — anything with components. For step 7.
- [ ] A Discord message containing a **select menu**, that you have the URL for. Steps 15 and 16 use
      the **same** message.
- [ ] A folder-page export you can paste. For step 13.
- [ ] A JSON payload with a **Thumbnail at the top level** (`"type": 11`). For step 12.

**One thing to be aware of, because it is your call and not mine:** the app only has one database
configured, and it is the live one. So a build running on your own machine still reads and writes
your real messages. That is convenient — the test messages are already there, nothing to set up —
but everything you save today is real. A Vercel preview would not change this; it points at the
same database.

### 013-C. Four ways to accidentally ruin the run

1. **Do step 1 before step 6 on any given message.** Step 6 converts a test message to Classic and
   clears its flag — which is exactly the state step 1 needs it *not* to be in.
2. **After step 6's Load, do not press Save.** Load only changes what is on screen. Saving writes
   the cleared flag and burns the test message.
3. **Only steps 1–6 touch test messages.** Steps 7 onward use scratch input. If you run one of them
   on a test message it will consume it just as a stray Save would.
4. **Steps 15 and 16 are a timed pair, one hour.** Step 16 starts a clock and must finish inside it,
   on the same Discord message. Don't start 15 until you have time for both.

### 013-D. The run

**How to record it:** write what you actually saw next to what was expected — never over it. Your
word with a timestamp is enough on its own. **No screenshots are owed and none will be recorded as
missing.** Everything in the "should see" column is a prediction, not a result.

| # | Do this | You should see | Tag |
|---|---|---|---|
| 1 | Open a **Seed A**. Confirm it is in V2 mode, shows the V2 error, and the word `hi` is still there. Add **one container**. Press **Save**. | A dialog headed **"Are you sure?"**, explaining that Discord cannot show both, with two buttons in this order: *Save as Classic — This will drop your Components V2 components* and *Save as Components V2 — This will drop your message content*. **Nothing is saved yet.** | BC-11b |
| 2 | Do step 1 again but **press Cancel**. Re-open the message. | It is unchanged. **This is the easiest step to skip and one of the more important.** | BC-11b |
| 3 | Do step 1 and take **Save as Components V2**. On a spare, do it again and take **Save as Classic**. | Each choice keeps what it says and drops what it says. Both messages are used up — that is expected. | BC-11b |
| 4 | Repeat 1–3 using **Save As** instead of Save, on spares. | Identical behaviour at both buttons. | BC-11b |
| 5 | Repeat 1–4 on **Seed B** spares. | Same as Seed A throughout. | BC-11b |
| 6 | Open a fresh **Seed A**, open Message JSON. **Is the Load button clickable, or greyed out?** Press **Load** with no edits. **Then stop — do not save.** | Load is **clickable**. A warning appears saying the flag conflicted and it has been made Classic. `hi` is still there. | BC-15 |
| 7 | On your ordinary (non-test) V2 message: open Message JSON, change something, press Load. | A confirmation that says *"This will overwrite the current message"* and then names what it will add or remove, and whether the mode changes. | BC-1 |
| 8 | New Message → paste `{"components":[<a container>]}` | Editor is in V2, flag set, and a warning explains the flag was set to match. | BC-7 |
| 9 | New Message → paste `{"content":"hi","flags":32768}` | Classic, `hi` intact, flag cleared, warning shown, **no V2 error**. This step is also the proof that the old broken shape can no longer be created. | BC-8 |
| 10 | New Message → paste `{"content":"hi","components":[<a container>]}`. Cancel once, then do it twice more taking each choice. | The same two-button dialog, each naming its loss. Nothing is created until you choose. | BC-9 |
| 11 | **Deliberately** repeat steps 8 and 9 at the Message JSON **Load** button too, not just at paste. | Identical behaviour at both places. *"It probably works there too" is not an answer.* | BC-10 |
| 12 | Paste JSON containing a top-level **Thumbnail** (`"type": 11`). | Red text naming it: **"Not carried: Thumbnail. Discord does not support these on hooks.gg."** **If the thumbnail just vanishes silently, that is the failure.** | BC-6 |
| 13 | Paste a **folder-page export**. | The error **"Message must have content, embeds, or components."** **If this one succeeds, that is the failure.** | BC-5 |
| 14 | Try an import that has no content at all. | The dialog **stays open** showing the error. It does not navigate away, and no message is created. | BC-4 |
| 15 | Import by **URL** a Discord message containing a **select menu**. | The dialog shows the components it can support **and** a notice naming the select menu as not carried. | BC-2 |
| 16 | Within the hour, run the bot's **Get Message** on that **same** message, then load the code it gives you. | The editor shows the same notice about the select menu. | BC-3 |

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

### 013-F. Decisions that are yours. None of them blocks the walkthrough.

- **When to repair 5712 and 5842 — this one closes a door if you act, not if you wait.** Those two
  broken records are the only live proof of the problem. Repair them and one of the plan's
  validation items can never be checked again. Either observe it first, or tell me you are letting
  it go. **What is new:** 013 makes the JSON-editor route non-destructive for this shape, while the
  mode toggle still destroys content — so the two ways of repairing them are no longer equivalent.
- **What happens to the test messages afterwards.** Genuinely unruled. My instruction to keep them
  is currently filling that gap by default, which is not the same as you having decided. The spares
  make either answer cheaper.
- **How you would roll back.** The plan says the serving ref goes back to the pre-013 commit, but
  since the release is a fast-forward, that means a force-push. Rolling back in the Vercel dashboard
  instead leaves git pointing at 013, so the next ordinary push quietly re-deploys it. A revert
  commit moves forward, so "rolled back" becomes true of behaviour but not of the commit. **The plan
  picks none of these, and picking one at the console during a bad release is how this goes wrong.**
- **Does pushing still auto-deploy?** You said yes on 2026-08-23. That is on record as something you
  said two days ago, not as a fact today, and it cannot be checked from the repo. It almost
  certainly doesn't matter for 013, but devops needs you to confirm it before it pushes anything.
- **`SaveChoiceModal.tsx`** — a new file that the plan never named. Precedent in this chain says
  adding a file to the inventory is yours to approve.
- **Server-side validation on save** — the thorough fix for one of the medium findings. It is more
  scope than 013 has, so it stays out; what shipped is the documented limitation instead.
- **One notice behaviour you have never actually seen.** An earlier steering session decided not to
  route it to you. It is now built and shipping. Flagging it so it does not slip past as something
  you approved, because you didn't.
- **When the retrospective runs.** My instructions fire it as soon as QA and UAT are both done, even
  if the release happens outside the pipeline. You said *"Retro doesn't happen until after devops
  and release."* **I am doing it your way.** I mention it only because it is a claim about how your
  own system works, which is worth settling rather than me quietly recording a decision for you.

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
