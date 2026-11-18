# Brief — analyst-hooks-017

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/017-brief-common.md` (determination, stage
set, prohibitions, hazards). Read it before your first act.

From `steering-roadmap`, 2026-11-18. You are the session `analyst-hooks-017`, launched in
`/usr/local/bin/hooks` (a cross-repository chain). Chain ID 017, inherited from the commissioning
plan.

## Your commission

Plan `agent-output/planning/017-existing-items-backlog.md`, revision 0 (agent-output `f2153bd`),
section "Analysis commissioned": AN-1 (item 3), AN-2 (item 4), AN-3 (item 2), each with the
plan's own scope words; you work only on these. Document:
`agent-output/analysis/017-existing-items-backlog-analysis.md`. Evidence under
`agent-output/verification/017/analysis/`.

## Constraints specific to this commission

- **The website tree is held by chain A** (`fix/dialog-closes-on-first-portal-load`, with that
  fixer's uncommitted edits in it). Do not run, edit, install or build in
  `/usr/local/bin/hooks/website`'s working tree. Work from an isolated export of `395510e`
  (`git -C /usr/local/bin/hooks/website archive 395510e…`), and give it its own install; the shared
  tree's `node_modules` is another session's state and is held.
- **No Pusher publish from this box** (the plan's words for AN-1). A local build that saves at all
  falls under the local-build rule quoted in the common part, and its walk discharges
  `agent-output/handoff/local-walk-save-can-write-a-client-sent-low-message-id-2026-11-11.md`'s owed
  reads (record the first save's id and the count of `"Messages"` ids below 900000000000001 after
  it); that handoff is named here as the rule its trigger sets.
- **AN-3:** a read of the Vercel deployment's own settings that no agent can make is an
  owner-needing item: send it to `steering-roadmap` with what you tried, never guess the setting.
- Production: no host act and no hooks.gg save is part of this commission.

## Delivery

Your consuming stage is the planner, `planner-hooks-017`: send it your committed document's path and
SHA by SendMessage. Owner-needing items and spawn cues go to `steering-roadmap` by SendMessage.

## Not checked by this brief

Whether `tools/uat-local-stack.sh` builds `395510e` as it stands; whether Vercel's runtime
documentation for the installed Next is reachable from this box.
