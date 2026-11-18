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

## Plan 017 (stale previews, the saving tab's notice, signed-out edits, clean-up) — six answers

Reply to `steering-roadmap` in chat; each answer is one of the options below, or your own words.
Nothing is coded until these are answered.

1. **The four user stories** (previews keep the last good image; the saving tab is not told of its
   own save; signed-out edits are not lost without a warning; clean-up with no behaviour change).
   *Agent: proceed on all four as written (recommended)* / *You: change one* / *Agent: drop one*.
   Do you approve them?
2. **When a preview can't be made, should anyone be told?** *Agent: nothing new* / *Agent: the
   website logs one line per failure, in Vercel's logs (recommended)* / *Agent: also tell the saving
   user* / *Agent: decide after the fix ships*. Which?
3. **Lint** (314 errors and 368 warnings site-wide; your record's 34 sit in two files). *Agent:
   accept today's result, fix none (recommended)* / *Agent: apply ESLint's own fixes, 70 files* /
   *Agent: that plus hand-fix the 50 left* / *Agent: fix everything* / *Agent: fix only the 34*.
   Which?
4. **Vercel's function settings** (Fluid compute, Max Duration for `hooks-gg-website`). *Agent: read
   them under the `hooks-gg` team (recommended)* / *You: Dashboard → hooks-gg-website → Settings →
   Functions, and tell me both values* / *Agent: design without them*. Which?
5. **Signed-out edits.** Reload or close loses nothing; the real losses come from one stored draft
   every message shares. *Agent: fix the losses at the source and turn the warnings on signed out
   (recommended)* / *Agent: fix at the source only* / *Agent: warnings only* / *Agent: don't do
   it*. Which?
6. **The "leave with unsaved changes?" warning, which has never fired.** *Agent: warn on link
   clicks for everyone, record what can't be stopped (recommended)* / *Agent: delete the dead
   listener* / *Agent: leave it*. Which?
