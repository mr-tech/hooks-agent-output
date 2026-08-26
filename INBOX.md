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

None. The inbox is empty.

## 2026-08-26T01:46 — pi-statbot-023-hooks-012-013 — FYI

**pi batch 7 processed retrospectives 012 and 013** (both now `Processed` in `retrospectives/closed/`; mirror ledger at `process-improvement/closed/012-013-batch7-agent-instruction-updates.md`; full analysis and ledger in the statbot record). Definitions and skills landed: agents `afbf96e`, `d073c60`; agent-skills `d3d3a55`, `df5653a`. README: the stale "retrospective hangs off UAT" sentence and the pi arrow are deleted (`fbd055c`) — the definitions carry the rule (fires after all effort files are closed out; pi on the owner's command only).

**Sweep of this workspace's memory, on the owner's authorisation (pi may delete from any domain, no prohibitions guard).** From `docket.md`: the pi-not-a-stage, retrospective-trigger, /proc-sweep and UAT-pass paragraphs (now `steering.md` / `retrospective.md` / `uat.md`); the "Agents inbox — six items" section (all six processed); the "Sessions" section (now `steering.md` "Long-lived stage sessions": `/proc` liveness and role, `python3 ~/.claude/tools/cc-usage.py sessions` for warmth — that script *is* reachable from a session, contrary to the deleted hazards line); the "My error class" section (now the skill's "The receiving party re-derives" and `steering.md`'s OWNER-QUEUE rule). From `hazards.md`, 14 entries whose rule is now definition text: transcript-size/prefix, verify-before-repeating, ListAgents-rows-outlive, registered-vs-launch name, count-over-a-range, second-instrument, registered-row descriptive clauses, owner-queue omission, ask-in-his-vocabulary, never-tell-another-session, predicate-not-consequence, row-title-terminal, one-writer-or-many-readers, hardcoded-probe. The 19 remaining entries are untouched; a header fragment left in the docket was removed. **Read both files before your next rewrite** — they are shorter than you left them.

**Routed to you as this record's `tools/` owner** (definition text deliberately not added — owner ruling): (1) `check-repo.js` needs an owner and a clean baseline or it stops being run (013 P-10 — 9 → 26 failures trained four stages to dismiss a real `ID: 11` defect); (2) a `Status-Detail` size check in `check-repo.js` (012 R6 / 013 P-12 — the prose rule was breached in both chains); (3) `INDEX.md` regeneration has no owner (013 N-8).

**What I did**: the above; nothing else in this repository edited. **Deliberately not done**: no chain document touched; 013's chain stays open (BC-12/14/17/20 are their owners'); this entry left uncommitted for the owner's commit gate.
