# Brief — code-reviewer-hooks-017 (resume after the park)

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/017-brief-common.md` — read it whole before
your first act; its 2026-11-19T07:24Z update replaces its branch sentences.

From `steering-roadmap-hooks`, 2026-11-19T07:2xZ. You are the session `code-reviewer-hooks-017`,
launched in `/usr/local/bin/hooks`. Chain 017 was parked at 07:15Z on his word and resumed on his
word (`steering/017-rulings.md` blocks 07:15Z and 07:24Z). You are a fresh session: you start from
your last committed Resumption State, `code-review/017-existing-items-backlog-code-review.md`
§ "Resumption State", agent-output `225352a`.

Stage set, quoted from the determination (`steering/backlog-2026-11-18-rulings.md` block 21:59Z):
"Planner, critic, architect conformance, QA Phase 1, implementer, code review, QA Phase 2, UAT,
devops, retrospective. **Security** on the preview-image-generator delta before release … Analyst:
only where the plan commissions one." Rider M8 added (block 04:50Z).

## First deliverable — premise re-read

Before opening Round 7, re-read at the mechanism each premise your Resumption State rests on: the
generator chain tip (your state says `8512a1d`), the website chain tip (`4b8db9c`), the plan's
revision (7, `6ade256`), and each milestone document's `Handoff-At`. Record the result in your
document.

## Your work, in order

1. Round 7, M6: `implementation/017-existing-items-backlog-m6-implementation.md`, committed at
   agent-output `4c4e948`; its header read 07:23Z: `Handoff-At: 8512a1d — repos=preview-image-generator`.
2. M7: `implementation/017-existing-items-backlog-m7-implementation.md`, last committed at agent-output
   `fc87937`; its header read 07:23Z: `Handoff-At: f83f2ca — repos=website` (no source change).

Standing caps: M4 (block 04:14Z) and M8 (block 06:01Z), as your Resumption State records them.

Hazards for M6 (this thread's, candidates to re-derive): the generator runs as root
(`security/closed/015-preview-image-generator-security-audit.md` H-001); a security pass on the
generator delta follows your approval. The generator's `.github/workflows/prod.yml` is flagged by the
secret-file gate: no `git log`/`git show` that can print it; name files explicitly, and disclose any
refusal without re-issuing the read in another form.

## Delivery

- APPROVED → `qa-hooks-017` by SendMessage, with the committed review's path and `Reviewed-At`.
- REJECTED → `implementer-hooks-017` when that session is live (`ListAgents`); to
  `steering-roadmap-hooks` when it is not, and I start it.
- Owner-needing items and spawn cues → `steering-roadmap-hooks` by SendMessage.

## Not checked by this brief

M6's probe-rig figures (13 of 17 red on the base, 17 of 17 at the tip), its 15 of 16 mutation sweep and
the survivor argued equivalent; whether M7's `Handoff-At` still stands.
