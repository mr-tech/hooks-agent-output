# Brief — planner-hooks-017 (resume: the Planner batch fold)

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/017-brief-common.md` — read it whole before
your first act; its 2026-11-19T07:24Z update covers the branches.

From `steering-roadmap-hooks`, 2026-11-19T08:2xZ. You are the session `planner-hooks-017`, launched in
`/usr/local/bin/hooks`. Chain 017 was parked at 07:15Z and resumed on his word (`steering/017-rulings.md`
blocks 07:15Z and 07:24Z). You are a fresh session: start from your last committed Resumption State,
plan `planning/017-existing-items-backlog.md` § "Resumption State", agent-output `b2eefcd`.

Stage set, quoted from the determination (`steering/backlog-2026-11-18-rulings.md` block 21:59Z):
"Planner, critic, architect conformance, QA Phase 1, implementer, code review, QA Phase 2, UAT,
devops, retrospective. **Security** on the preview-image-generator delta before release … Analyst:
only where the plan commissions one." Rider M8 added (block 04:50Z).

## First deliverable — premise re-read

Re-read at the mechanism each premise your Resumption State rests on (plan revision 7 `6ade256`; website
tip `4b8db9c`; the generator tip as the gate documents record it — `8512a1d` in code review's and QA's
headers; do not `git log` the generator, the secret-file gate refuses it). Record the result.

## Your trigger has fired

Your Resumption State: the Planner batch folds at the seam after the last milestone's QA Phase 2 passes.
Every milestone now has QA Complete; the last was M7 (`qa/017-existing-items-backlog-m7-qa.md`,
agent-output `9a155ee`, plan R-44). Plan rows R-29 to R-44 were written since your checkpoint; read them.

Items for you to disposition beside your batch rows (pointers; each is the source document's, and yours to
re-derive):
- Security L-001 LOW, "the planner's call under X-4": `security/017-preview-image-generator-security-audit.md`
  § Low Findings (agent-output `4ae4825`). Its remedy would move the generator tip and re-open review and QA.
- M6's Deviations line on a fifth failure class for setup failures:
  `implementation/017-existing-items-backlog-m6-implementation.md` (agent-output `008468b`).
- Code review's Round 7 assumption on `/preview`'s fallback render being stored as a preview:
  `code-review/017-existing-items-backlog-code-review.md` § assumptions, Round 7 line (agent-output `8296f7e`);
  owned by UAT B-6 meanwhile. Disposition it against item 2's property (the determination's item 2 block):
  in scope, or an exclusion. An exclusion he has not seen comes to him as a question through me.

Standing caps: M4 (block 04:14Z) and M8 (block 06:01Z). A criterion change on an open milestone, or a
milestone-level scope delta, interrupts and comes to me before any further pass.

Not yours and not in 017: the two website access defects security observed outside the delta (`message.getOne`,
client `id` on `message.upsert`). They are with him as a separate question (block 08:12Z). Do not fold them.

## Delivery

- Your committed revision → the critic, `critic-hooks-017` (I start it on your revision), by SendMessage to
  `steering-roadmap-hooks` with the revision number, commit and scope-delta line, since no critic session
  is live now.
- `OPEN QUESTION` items, owner-needing items and spawn cues → `steering-roadmap-hooks`.

## Not checked by this brief

Whether any gate wrote a Planner batch row since your checkpoint; whether L-001's remedy is wanted.
