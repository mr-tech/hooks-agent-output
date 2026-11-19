# Brief — architect-hooks-017 (the closing pass)

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/017-brief-common.md` — read it whole before
your first act; its 2026-11-19T07:24Z update covers the branches.

From `steering-roadmap-hooks`, 2026-11-19T08:4xZ. You are the session `architect-hooks-017`, launched in
`/usr/local/bin/hooks`. Chain 017 was parked at 07:15Z and resumed on his word (`steering/017-rulings.md`
blocks 07:15Z and 07:24Z). You are a fresh session: start from your last committed Resumption State,
`architecture/017-existing-items-backlog-architecture-findings.md` § "Resumption State", agent-output
`61fc3ff`.

Stage set, quoted from the determination (`steering/backlog-2026-11-18-rulings.md` block 21:59Z):
"Planner, critic, architect conformance, QA Phase 1, implementer, code review, QA Phase 2, UAT,
devops, retrospective. **Security** on the preview-image-generator delta before release … Analyst:
only where the plan commissions one." Rider M8 added (block 04:50Z).

## First deliverable — premise re-read

Re-read at the mechanism each premise your Resumption State rests on, and record the result.

## Your pass

The closing pass your Resumption State names, over everything folded after your approval. The last
revision you read is **revision 7** (`6ade256`); the plan is now **revision 8** (agent-output `5e36106`,
the Planner batch fold), approved by the critic with no finding (`critiques/closed/017-existing-items-backlog-critique.md`,
agent-output `56a602a`). Implemented trees: website `chain/017-existing-items-backlog` at `4b8db9c`;
generator `chain/017-existing-items-backlog` at `8512a1d` as the gate documents record it (code review
`a010246`, QA `dd7a449`, security `4ae4825`). Do not `git log`/`git show` the generator so that its
`.github/workflows/prod.yml` could print: the secret-file gate refuses it, even with `--name-only`; read named
`src/` files by explicit path and disclose any refusal without re-issuing in another form.

Pointers beside your list:
- Security's audit `security/017-preview-image-generator-security-audit.md` (`4ae4825`): I-1 (the generator
  no longer deletes), I-8 (the first `npm audit` of the generator's lockfile; security routed an `INBOX.md`
  entry to your pass on it, against `preview-image-generator.md` P-2).
- Revision 8's X-21 names your Problem Areas row on `/generate`'s body trust as its carrier, extended by
  the log sink. X-21 and X-22 are with him unanswered (blocks 08:36Z); record them as pending, not accepted.

Deadline: your committed pass lands before devops Stage 1's message (devops.md step 2c).

## Delivery

- Your committed findings document's path and commit → `steering-roadmap-hooks` by SendMessage; a finding
  that changes the plan → `planner-hooks-017` (live).
- Owner-needing items and spawn cues → `steering-roadmap-hooks`.

## Not checked by this brief

Whether the master document's other lags (chain A, plan 016's closure) belong in this pass; the diagram.
