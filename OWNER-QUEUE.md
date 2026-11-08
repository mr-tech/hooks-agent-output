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

## Check the statrole editor still loads hooks.gg messages

The hooks.gg auth fix is live, and a request without the key is now refused. This check confirms that
Statbot's own calls, which carry the key, still get through.

1. Open the Statbot dashboard's statrole editor for a guild that has hooks.gg messages.
2. **Pass:** the hooks.gg message list populates. **Fail:** it errors, or it's empty where messages exist.
   That points to a key or host mismatch. The quick undo is to promote the previous deployment in Vercel.

Does the list load? Tell steering "loads" or "empty / error".

## Chain 015 — publish the bot's commands to Discord

The fix lets members with Manage Server (not only Administrator) use *Get Message*. It takes effect
only once the commands are republished.

1. In `/usr/local/bin/hooks/website`: `pnpm run push-commands`.
2. In a server where someone has Manage Server but not Administrator, have them right-click a message
   → Apps. **Pass:** *Get Message* is listed. Note the time.
3. Undo, if needed: revert the commit and run `pnpm run push-commands` again.

Did *Get Message* show up for them, and at what time?

## Chain 015 — message list for an account that administers no server, on hooks.gg

1. Sign in to hooks.gg with a Discord account that administers no server (your second test account
   works), and open the message list.
2. **Pass:** it loads your saved messages, or "No Messages", with no error. Note the time.

Did it load, and at what time?

## Generator host — remove claude-ro's read on the nodejs PM2 dump

You chose to remove it yourself (05:21Z). Agents never open that file in the meantime.

1. On 165.227.249.183 as root: `setfacl -x u:claude-ro /home/nodejs/.pm2/dump.pm2`. If that
   reports no ACL, use `chmod o-r /home/nodejs/.pm2/dump.pm2` instead.
2. **Pass:** `sudo -u claude-ro test -r /home/nodejs/.pm2/dump.pm2; echo $?` prints `1`.

Is it done? Tell steering "done".
