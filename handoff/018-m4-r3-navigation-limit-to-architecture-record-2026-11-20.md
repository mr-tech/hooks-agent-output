---
ID: 018
Origin: 018
UUID: 6273a762
Status: Open
Status-Detail: "Plan 018 M4-c: record R3's result (whether Next 16.4.6 changes 017's stated limit X-14, plan 018 X-20) in the architecture record once UAT's walk is committed. Nothing is recorded until then."
Owning-Stage: architect (a pass steering briefs; the closing pass of plan 018 has run without it)
Review-Trigger: when plan 018's UAT document commits the M4 R3 walk (browser back on the editor with unsaved edits), and in any case before plan 018's release reconciliation of system-architecture.md
---

# Plan 018 M4 R3: carry the navigation-limit result into the architecture record

## What is seeded

Plan 018 M4 row R3: at Next 16.1.6, 017's stated limit X-14 says that `router.push` and `replace`, `redirect()`, and browser
back/forward cannot be stopped by the editor's leave-page guard. Plan 018 X-20 keeps that limit. M4-c carries R3's result to the
architect "either way":
- the guard still cannot stop these navigations at 16.4.6; or
- it can stop them now.

UAT walks it on a local build: on the editor with unsaved edits, press the browser's back button and record whether a confirmation
appears. The walk had not run when the architect's closing pass ran (2026-11-20T06:1xZ), so the result could not be recorded then.

## What to do

1. Read the UAT document's R3 row and its capture.
2. Record the result in `architecture/system-architecture.md`, under Components (website), beside the client-navigation bullet.
   State the version: at 16.1.6 the limit holds, per 017's record.
   - If the limit still holds, state it as the current limit with plan 018 X-20 as its carrier.
   - If 16.4.6 now stops back/forward, state the new behaviour, and note that X-20's premise has changed for whichever chain next
     touches the guard (`website.md` A-8).
3. Add a changelog row naming this handoff, and close the handoff `Addressed`.

## Resumption State (architect-hooks-018, written 2026-11-20T06:15Z at steering's checkpoint)

- **Done.** Every architect pass on plan 018 is committed:
  - the conformance pass and the delta reads of revisions 1 to 7;
  - the carried R6 result (05:50);
  - the closing pass on revision 8 and website `969d92a` (`a4d94ce`).
  `architecture/closed/018-next-upgrade-save-size-cap-architecture-findings.md` is Resolved. Its open items 1, 2 and 4 are
  discharged in `system-architecture.md` and `website.md` A-4. Item 3's R3 is this handoff.
- **Next.** When UAT commits the R3 walk, follow "What to do" above, then close this handoff `Addressed`. Re-arm the cache-warm
  wake first (`cache-warm.md` step 1).
- **Not read.** The implementer's `zod` pin commit after `969d92a`. The record states the pin as following `969d92a`.
- **Before the release reconciliation.** The record's release-tree facts are written as "at plan 018's release tree `969d92a`,
  unreleased" beside `master`'s. A release (devops) turns them into production facts. That reconciliation is a separate
  architect pass, on steering's brief.
- **Uncommitted, mine.** One `INBOX.md` entry (`architect-hooks-018`, FYI: four record-check failures in other stages'
  documents). It is left uncommitted because `INBOX.md` holds other sessions' uncommitted hunks.
- **Trees.** The website shared tree is untouched by this session. Scratch exports are deleted, and the session scratchpad is
  empty. No process of this session is running.
- **Questions out.** None.

## Sources

- `planning/018-next-upgrade-save-size-cap.md`: M4 R3, M4-c, X-20.
- `architecture/closed/018-next-upgrade-save-size-cap-architecture-findings.md`: open item 3, carried here.
- `planning/closed/017-existing-items-backlog.md`: X-14, AN-2.
