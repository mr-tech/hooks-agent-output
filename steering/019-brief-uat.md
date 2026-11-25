Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/slate-formatting-brief-common.md`. Read it whole first. This effort is plan 019.

From `steering-hooks-fixer`. You are `uat-019`. Run UAT for plan 019
(`/usr/local/bin/hooks/agent-output/planning/019-slate-formatting-discord-engine.md`, Revision 25) per your definition. You start on QA's
committed M6 Phase 2 verdict: `qa/019-slate-formatting-discord-engine-m6-qa.md` § "Pass on Fix Round 6", Status QA Complete, record
`135068f3`, at website `48eb60a`. M2 to M5's QA documents are under `qa/019-*`.

## Stage set and what changed (rulings file `steering/fixer-queue-2026-11-21-rulings.md`)

The stage set is block 09:18Z's, quoted in the common brief. The owner has since cut 019 to release essentials. Read these blocks whole:
- "2026-11-25T15:46Z": his words "we should only be doing the bare minimum on 019 now". He waived QA's effort-final mutation sweep on M6;
  QA's verdict is given without it, on that waiver, so it does not hold UAT back. He also waived the Planner batch fold and the architect's
  closing pass.
- "2026-11-25T15:49Z": **UAT walks all nine flows.** His selection: "Agent: all nine walks (Recommended)". No walk is waived.
- "2026-11-25T15:36Z" and "15:38Z": the editor is to be rebuilt as a separate effort after 019 ships. That does not change what you judge:
  019's editor ships to production and stays live until then.
- `planner-019` is writing one minimal revision (M7's premise paragraph and the waivers). It changes no criterion, so start now on
  Revision 25.

## The walks

The nine pre-release rows of QA's register, `qa/019-slate-formatting-discord-engine-qa.md` lines 1917–1927 (read there; each row names its
criterion, method and pass condition): B-1 (AC-2.5), B-2 (AC-4.2, links keep their emoji: the defect he flagged, D-2), B-3 (AC-5.5),
B-4 (AC-6.3, the guild-emoji picker: needs a local Postgres and a signed-in test account with the guild's emoji), B-7 (AC-4.4), B-8
(AC-3.3's Chrome paste), B-9 (AC-6.7), B-10 (AC-6.8's human form), B-11 (AC-6.9, with QA's K4). B-5 is post-deploy and B-6 is QA Phase
3's; neither is yours.

## Hazards (each a candidate to re-derive)

1. **Local saves.** Before any save on a local build, move the message ids out of production's range (workspace `CLAUDE.md`, "Local builds
   of `website`"), and record the id range the walk wrote.
2. **B-7's channel fetch** writes a 10-second cache entry to the Redis that `website/.env.local` names, which is remote (finding F-35).
   Read key names, hosts and ports only from `.env.local`, never a value. Say in your document what the walk wrote there.
3. **Memory.** The box has had out-of-memory kills this effort (kern.log count 8). Run builds and scripts in a capped scope
   (`systemd-run --user --scope -p MemoryMax=…`), one worker; stop every server you start when you finish.
4. **The website tree** is on `chain/019-slate-formatting-discord-engine` at `48eb60a`, with only a foreign `?? .playwright-mcp/`. No other
   session is working in it now. You may build and serve it in place; never switch, commit or reset it. QA's note: `next build` exits 0
   there.

## Bounds

- Discord: the test server only (guild `1566742402180456559`), as the test account (`discord-test-browser` skill). Nothing reaches any
  other server, DM or person (`/home/dev/.claude/CLAUDE.md`, "Outbound messages": "A message that reaches a real person is mine to send.").
- A call stopped by a control: stop, message `steering-hooks-fixer`, and never re-issue it in another form. The record says only "not
  completed", with no reason.
- Record documents: Write, Edit or `record-edit.js` only; stamps from `date -u` in the same turn. Never use the bare word `none` in a command.
- The owner runs no manual checks: "I won't be running any manual checks. So if agents can't run them then withdraw" (block
  "2026-11-24T03:59Z"). An item only he could perform comes to `steering-hooks-fixer` as a block, never to OWNER-QUEUE.

## Routing

Your UAT document goes to devops per the next-act table; no devops session is live, so deliver it to `steering-hooks-fixer` by SendMessage
while none is. Owner-needing items and spawn cues also go to `steering-hooks-fixer`. A question you put to him yourself follows his
standard: context first, then the decision, plain English, no commit IDs (block "2026-11-21T18:37Z"). Usage: `weekly_all` 88% (live,
15:27Z); the gate is 98%.
