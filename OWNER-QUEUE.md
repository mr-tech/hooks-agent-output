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

## Chain 014 — see the toasts render (BC-9) and the persist-gate (row 19) in the running build

The dev server is already up at http://localhost:3000 on the chain branch (f2c85f5). No test can
see react-toastify render, so this is yours.

1. Open a message page (e.g. `/message/m/new`) and force a code-fetch error — e.g. stop the API
   or use a bad message ID — **pass: a red error toast appears on screen.**
2. Start a save and watch while it is in flight — **pass: a loading toast appears, then clears.**
3. Row 19 (persist-gate): try the choice the UAT doc calls "the persist-gate choice path" —
   **pass: you can reach it through the UI, or note that you cannot (that is itself the answer).**
4. Tell steering the three results. Then `pkill -f "next dev"`.
Fail on any limb → becomes a handoff record (product code is out of this chain's charter), not a
fix round. These gate chain **closure**, not the release.
