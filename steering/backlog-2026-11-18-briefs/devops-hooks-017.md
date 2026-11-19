# Brief — devops-hooks-017

Duties negated: Stage 1 and Stage 2 (devops.md) are not this commission. This session runs plan gate
M5-0 limb 2's probe push alone; no plan Status write, no document closure, no merge, no shared-branch
move. Stage 1 comes later, by a separate brief.

Common part: `/usr/local/bin/hooks/agent-output/steering/017-brief-common.md` (determination, stage
set, prohibitions, architecture record, hazards). Read it before your first act.

From `steering-roadmap`, 2026-11-19T04:5xZ. You are the session `devops-hooks-017`, launched in
`/usr/local/bin/hooks` (a cross-repository chain; `git -C <repo>` on every call).

## Your commission

Plan `agent-output/planning/017-existing-items-backlog.md`, revision 4 (agent-output `a97628d`), gate
**M5-0 limb 2**, the `waitUntil` probe (OQ-7). Read § M5, "M5-0 — gate before M5 or M6 code", and the
Decisions Register rows D-15, D-17 and D-19, in the plan. M1 to M4 pass both gates (QA M4
`qa/017-existing-items-backlog-m4-qa.md`, code review `code-review/017-existing-items-backlog-code-review.md`);
read them there if you need them.

- The probe branch is the implementer's to write (M5-0 limb 2). `implementer-hooks-017` messages you
  its branch name and SHA when it is committed. Until then, do the pre-push work that needs no SHA:
  establish what the preview deployment's environment connects to (QA's E-6,
  `qa/017-existing-items-backlog-qa.md`), and read the website's workflow files for what a branch
  push triggers.
- **The push needs his approval** (D-15: "Before M5 code, a devops session asks you for the probe
  push."). Ask him in this session, by selection prompt, under the Escalation Form
  (`~/.claude/agent-skills/document-lifecycle/references/escalation.md`). No approval is carried in
  this brief.
- After his approval, the push, the build confirmation, the requests, the log read (instrument and
  `--deployment` scope as M5-0 limb 2 states), the capture under `verification/017/m5-0/`, the outcome
  classification (D-19), one repair-and-re-run on a not-readable run under the same approval, and the
  deletion of the probe branch, local and remote, after the read. The probe branch is never merged.

## Your record

Record this work in a deployment document under `agent-output/deployment/` with the chain's ID, as
devops.md lays out, scoped to the M5-0 probe. Its outcome line is what the next stages read.

## Routing

- Outcome **kept alive**: message `implementer-hooks-017` (M5 and M6 code may start on gate M5-0),
  naming your document.
- Outcome **not kept alive**, or a second not-readable run: message `steering-roadmap`. Under D-15 and
  D-19 that goes to him with the fallback, and M5 and M6 stop.
- Owner-needing items and spawn cues: SendMessage to `steering-roadmap`. Status reaches steering
  through your document, not by message.
- Arm your cache-warm wake (the `cache-warm` skill).
