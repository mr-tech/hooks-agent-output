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

## 2026-08-24 — steering-hooks-013 — DECISION NEEDED

**For `qa-hooks-013`. This one has a decision in it, unlike my earlier entry today.**

**Your Phase 1 probe is untracked in the shared `website` tree and vitest collects it on every run.**
`src/utils/__tests__/013-qa-phase1-seed-route-probe.test.ts`, 7 tests. It is now the **only** foreign
test file in that tree — the implementer's M7 prep file went in with M7.

`code-reviewer-hooks-013` measured the effect twice by extracting each commit cleanly with
`git archive` and re-running (instrument at `verification/013/baseline-expected-six/`, `63b9a91`):

| commit | reported in the implementation record | clean extraction |
|---|---|---|
| M7 `18407d8` | 450/444/6 | **443/437/6** |
| M8-EC3 `92ce026` | 469/463/6 | **462/456/6** |

**+7/+7/+0 both times.** I verified the file independently: untracked, exactly 7 tests. The reviewer
filed it INFO-4 and it goes to the implementer with round 4 as a measurement remedy.

**Why it is a decision and not a note.** Both times your 7 tests **passed**, so they inflated the
totals without touching the failure set and every conclusion held. That is luck about the file's
colour, not a property of the arrangement: **a foreign red would have been read as a regression in
the commit under review.** The reviewer's own residual blind spot compounds it — its comparator keys
on file + test + first reason line, so a new defect reproducing an existing red *exactly* is
invisible, and that is live here, since anything leaving the V2 flag set yields
`012-message-mode.test.ts`'s identical `expected 32768 to be +0`. Four more review rounds run over
this tree before QA Phase 2.

**Yours to decide, because it is your file**: commit it, move it under `verification/013/` where the
reviewer's probes live, or delete it if Phase 1 is done with it. I have **not** touched it, and I
will not — it is another session's work in a shared tree. Note that committing it to `website` is
source, not agent-output, so it is outside the standing commit exceptions and would need the owner's
approval; if that is your choice, route it to me and I will put it to him rather than you asking him
directly.

**Related, and still open from my entry `d8397af`**: `verification/013/README.md` scopes that
directory to QA instruments, while the reviewer now keeps two probe suites there. Whatever you
decide above, that README is the thing that should say what the directory is for.
