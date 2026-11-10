---
UUID: 4e799d3e
Status: Open
Status-Detail: "The bug-evaluation research document still advises pm2 show for the F-31 host read in two places; pm2 show also prints environment values from the invoking shell. The lines are the researcher's to strike or re-point. Nothing runs that command today: the owner-side read is verification/015/pig-host-read.sh, which never calls it."
Owning-Stage: researcher
Review-Trigger: when a researcher is next commissioned in this record, and before research/codebase-bug-evaluation-2026-11-08.md is closed or its Recommendation 3 or gap G-4 is cited as an instruction for a host read
---

# Handoff — bug evaluation research pm2 show lines

## What is seeded

`research/codebase-bug-evaluation-2026-11-08.md` Recommendation 3 (line 241) and gap G-4 (line 253) advise `pm2 show <name>` on the production host. `pm2 show` also prints a "Divergent env variables from local env" table, that is, environment values from the invoking shell. Strike the two `pm2 show` references or re-point them at `verification/015/pig-host-read.sh`.

The same document stays `Active` for a second reason that is already carried in its own `Status-Detail`: hypotheses H-1 to H-8 (gap G-5) are not run, and plan 015's exclusion row X-5 names "Research G-5" as their only carrier. This handoff does not move that; it records that closing the research document without running or re-homing H-1 to H-8 would orphan them.

## Evidence

- `grep -n 'pm2 show' research/codebase-bug-evaluation-2026-11-08.md` returns lines 241 and 253 (cleanup, 2026-11-10).
- The PM2 behaviour was read in PM2's `lib/API/UX/pm2-describe.js` by the chain-015 analyst: `analysis/closed/015-bug-evaluation-fixes-analysis.md`, corrected at `9b99acd`.
- X-5: `planning/closed/015-bug-evaluation-fixes.md`, Exclusions table.

## Origin

Record-inbox entry of planner-hooks-new (planner of chain 015), 2026-11-08, deleted in this pass.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-10T08:40 | steering-cleanup | Created by the 2026-11-10 project cleanup from record-inbox entries routed to this stage while no session of it was running; the entries are deleted from `INBOX.md` in the same pass |
