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

## 2026-08-24 — steering-hooks-013 — FYI

**Concerns**: `verification/013/README.md`, which is `qa-hooks-013`'s document.

Its title and body scope the directory to *"QA-authored instruments for chain 013"*, and its table
indexes what it holds. That is no longer the whole of what is in there. `code-reviewer-hooks-013`
placed its own round-1 probe at `verification/013/probe-cr1-hash-producer-consumer/` (committed
`ba0f6e3`), so the directory now carries instruments from two stages and the README describes one.

**What is being asked**: nothing blocking. When QA next writes — Phase 2 is already owed — decide
whether the README's scope should widen to the chain's instruments generally, or whether a
non-QA stage's probe should live somewhere else. Either answer is fine and it is QA's to make.

**What the author did**: raised it here rather than by message, because it costs the receiving
session nothing until it next spawns and nothing waits on it.

**What the author deliberately did not do**: edit `verification/013/README.md`, which is another
stage's document. `code-reviewer-hooks-013` also declined to add its own row to QA's table, and
flagged it rather than editing — correctly.

## 2026-08-24 — steering-hooks-013 — FYI

**For `qa-hooks-013`, to be weighed at QA Phase 2 spawn. Nothing is blocked and nothing is asked
of you now.** Two items from code review round 3 (`ecbbe43`, `Reviewed-At: 18407d8`, M7
APPROVED_WITH_COMMENTS) that the reviewer routed to QA because the files are QA's by the plan's own
Serialised Shared Files allocation. Both were sized on an assumption that has since changed.

**1. A pre-registered QA spec is green while asserting a narrative M7 has falsified.**
`012-send-gate-partition.test.ts` carries the header *"Do not update expectations to match — a
disagreement is a finding, not a stale fixture"*. It asserts that 5712 loads in Classic, that
recovering it requires toggling to V2 first, and that the outbound leg destroys the content. After
M7 the record opens in V2 and one toggle to Classic clears the bit with the content intact — the
reviewer executed this; it is R8's "one lossless toggle" run for the first time. The file's own
header says that disagreement is a finding. It is yours to dispose of, not the implementer's and
not mine.

**2. QA's red-test-domain table and the plan's Plan Scope prediction share an error, reached
independently.** Both predict M7-b turns four existing test files red; one went red. Two of the
other three (`012-send-gate-partition.test.ts`, `012-json-editor-repair-path.test.ts`) declare
their own local transcribed `switchToV2`/`switchToClassic` per their own doc comments, so they
never call the product's function and could not go red from a `messageMode.ts` change — proved by
their surviving all three of the reviewer's mutants. Your table re-derived the list explicitly
"not from the plan's list" and reached the same wrong answer, because it used the same instrument:
a `grep -rc` on a symbol name over a class defined by behaviour. Your document already records the
predicate's blind spot for helper-mediated reachers; the converse — a local declaration shadowing
the name — is the one that bit. The plan half of this is held under D25; this half is yours.

**What changed the sizing, and why I am lodging rather than messaging.** Both items were weighed
when QA Phase 2 looked close. It is now **five milestones away** — M8's EC-3, then M8, M2, M3, M4,
M6. Two consequences the reviewer recorded rather than acted on: the suite stays non-green until
you re-anchor `012-message-mode.test.ts`, so every later milestone review must re-establish that
the failures are the *expected* six rather than read a green suite — a weaker signal each time, and
one that fails quietly if a seventh failure arrives looking like the six; and item 2's two drifted
transcriptions sit unfixed, green throughout, over functions **M2, M4 and M8 all change**.

**What I did and did not do.** I did not ask you to re-anchor out of phase, and I did not put that
to the owner. My judgement, which is mine and overridable: the quiet-failure risk is real but is
already mitigated by what the reviewer does each round — it checked the count and identity of the
six this round and caught the drift — and an out-of-phase QA spawn is work the owner would have to
authorise for a benefit I could not show him. **If you disagree when you spawn, say so and I will
put it to him.** I edited nothing of yours and moved no status.
