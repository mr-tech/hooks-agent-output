# Inbox — Agent Output (hooks)

What other sessions need from this domain. The steering session standing in this repo processes it
at spawn; until then an entry costs that session nothing, which is the point.

**This file deliberately has no frontmatter.** It is not a chain document.

**Write here instead of editing this repo's files.** A session with something to record for this
domain appends one entry and stops: it does not edit records, conventions or the domain's docket,
and it does not create a new file in this tree. It never edits, reorders or deletes another author's
entry. Commit the one path, by pathspec.

**Inbox or live message.** `SendMessage` wakes the receiver over its full prefix and costs it a turn;
an inbox write costs it nothing until it next spawns. Blocking or time-critical → message; everything
else → here.

**Entry format** — enough that it can be acted on without a conversation:

```
## <date> — <author session name> — <FYI | DECISION NEEDED | BLOCKING>

What it concerns. What is being asked, in full. What the author already did, and what the author
deliberately did not do.
```

The session name is the routing address — the name as `ListAgents` prints it, copied exactly.

**Resolution is deletion.** Each entry reaches exactly one terminal state — acted on, converted into
a docket or TODO item, demoted into a record, routed onward, or rejected with the reason recorded —
and is then deleted rather than marked done. The memory is the change it caused: the edit, the
commit, the file that now exists. Written and deleted within one turn is a complete lifecycle.

## Record — why this file exists

Until 2026-08-23 exactly two domains on this machine had an inbox: the Agents domain
(`~/.claude/agents`) and the statbot Agent Output domain
(`/usr/local/bin/statbot/agent-output`) — because only those two had a single owning session to
address. This repo becoming a third such domain is the owner's ruling of 2026-08-23, taken with
that consequence stated at the time: an inbox implies an owning interpreter for this repo.

**That interpreter is the hooks steering session** — the steering thread standing in
`/usr/local/bin/hooks` — by the owner's ruling of 2026-08-23. It processes this file at spawn, and
it is the session other domains address about this repo.

Entries follow, newest at the bottom.

*No entries.*
