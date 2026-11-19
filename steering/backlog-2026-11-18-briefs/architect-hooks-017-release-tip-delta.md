# Brief — architect-hooks-017 (delta read at the release-tip fix)

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/017-brief-common.md`.

From `steering-roadmap-hooks`, 2026-11-19T20:0xZ. You are the session `architect-hooks-017`.

Stage set, quoted from the determination (`steering/backlog-2026-11-18-rulings.md` block 21:59Z):
"Planner, critic, architect conformance, QA Phase 1, implementer, code review, QA Phase 2, UAT,
devops, retrospective. **Security** on the preview-image-generator delta before release … Analyst:
only where the plan commissions one." Rider M8 added (block 04:50Z).

## Why

Your closing pass (`architecture/closed/017-existing-items-backlog-architecture-findings.md`, Status Resolved,
agent-output `0fbb246`) is anchored to website `7293a35` and generator `8512a1d`. Its Status-Detail says a release
tree that moves before devops's pushes needs a re-read of its delta. The website tree has moved:
- QA's release-tip Phase 3 failed at `7293a35` on QAF-29 and QAF-30, both MEDIUM and test-only
  (`qa/website-7293a35-generator-8512a1d-release-tip-qa.md`, agent-output `4914aaa`).
- The implementer's fix round is at website **`787bec5`** (`implementation/017-existing-items-backlog-release-tip-fix-implementation.md`,
  `a05505e`, Handoff-At `787bec5`).
- Code review APPROVED it at `787bec5` (`code-review/017-existing-items-backlog-release-tip-fix-code-review.md`, `a081c89`).
SHAs copied from those documents' anchor fields this turn. The generator is unchanged at `8512a1d`.

## Your pass

Read the delta website `7293a35..787bec5` and record whether your closing pass still holds at `787bec5`. By this
thread's `git diff --numstat`, the delta is three test files and no production file. Re-derive that yourself.
Your document is closed. How you record the read (a re-opened entry or a new document) is yours under the lifecycle skill.
Do not `git log`/`git show` the generator. Its `.github/workflows/prod.yml` is secret-gate-flagged. It is unchanged here, so it needs no read.

Deadline: before devops's Phase 2B ask (devops.md step 2c). devops-hooks-017 is paused at Phase 2A step 3 for this
read and a fresh QA Phase 3.

## Delivery

- Your committed record's path and commit → `steering-roadmap-hooks` and `devops-hooks-017`, by SendMessage.
- Owner-needing items and spawn cues → `steering-roadmap-hooks`.

## Not checked by this brief

Whether the three test files touch any architecture record's claims; whether check-repo's three unbaselined problems
(raised by the code reviewer, none in your document) bear on your record.
