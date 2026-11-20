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

## Plan 017: three looks on hooks.gg (live now)

Both releases are live on hooks.gg: the website went out at 20:11 UTC and the preview generator at 20:15 UTC on 19 November.
Do these on hooks.gg whenever suits you, then tell `steering-roadmap-hooks` what you saw for each one.

1. **Preview updates (B-6).** Edit and save one of your messages, then look at its preview in the message list.
   *Pass:* the preview shows your new edit within a minute, and opening the preview image never shows "Invalid message data."
   *If it still shows the old one,* say so: background work after a save isn't running in production.
2. **Update notice with two tabs (B-8).** Open one of your messages in two tabs. In tab 1, save and keep typing straight away.
   *Pass:* tab 1 shows no "Message Update Detected", and tab 2 does. *If tab 1 shows it,* your August report still stands.
3. **Drafts and leave warning (B-9).** Signed out, type a draft, sign in, open a saved message, then go back to new: is the
   draft still there? With unsaved edits, click a link away from the editor: does it ask first, does Cancel keep your edits,
   and does confirming leave the page? *Pass:* yes to every one of those questions.

---

## Personal-message access fix: one database check (live since 01:34 UTC, 20 November)

The fix is live on hooks.gg. Two read-only queries look for rows the old hole may have left in production; only you can reach that
database.

1. Run, on this box: `bash /usr/local/bin/hooks/agent-output/verification/fix-personal-message-access/owner/residue-read.sh`.
   It takes the connection string from the active `DATABASE_URL` in `website/.env.local` and never prints it. If that isn't
   production's database, put production's URL on the script's `DB=` line first. The session is forced read-only.
2. *Pass:* "query 1" lists no rows, and "query 2" prints `0`. Any row in query 1 is a planted message number the site hasn't reached
   yet. A count above 0 in query 2 means messages owned by both a user and a server.
3. Paste the whole output to `steering-roadmap-hooks`, with the time you ran it and whether it was production's database.

---
