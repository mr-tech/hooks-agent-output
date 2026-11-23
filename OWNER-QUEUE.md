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

## Check Vercel has no daily job left for the website

The release that removed the website's old once-a-day job is now live. That job could also have been set up in Vercel's own settings,
outside the code, and no tool the agents have can show that list.

In the Vercel dashboard, open the project **hooks-gg-website** → **Settings → Cron Jobs**.
Pass: the list is empty. If a job is listed, it now calls an address that no longer exists, once a day near 00:00 UTC.

Tell steering-hooks-fixer "empty", or the job's name and schedule.

## Check the website's request logs on Vercel for refused message numbers

The website change that makes the API and the bot check their passwords more safely is live (since 18:35 UTC on 21 Nov) and the bot
works. One thing is left that the agents' Vercel tool cannot show — request logs:

In the Vercel website project's **Logs**, filter to Production, since 18:35 UTC on 21 Nov, path `/api/v1/guilds/`, status 400.
Pass: no 400s on addresses ending in a message number. If there are some, tell steering-hooks-fixer the paths you see (the Statbot API may
be sending message numbers in a form the site now refuses).

Tell steering-hooks-fixer the result; it then closes the old hardening task.

## Choose how the formatting preview shows role, channel and command mentions

The preview is moving onto Discord's own formatter. Its mention code waits for your choice. The site has your server's channel list, but it
has no role or command names. Discord's own style for a name it doesn't know would show every role as "@unknown-role".

steering-hooks-fixer is asking you this as a question in its session. Answer it there.

