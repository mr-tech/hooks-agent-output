# Brief — uat-fix-dialog-closes-on-first-portal-load: the production look on hooks.gg

Duties negated: the UAT document. This run writes no `uat/` document and gives no release decision
(the chain released at 22:41Z without a UAT stage, by its scoping determination); its record is the
handoff's changelog rows.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-dialog-closes-on-first-portal-load-brief-common.md`
(prohibitions quoted there, including "Outbound messages"; hazard 5: which build Vercel serves).

From `steering-roadmap`, 2026-11-18. Your session name is `uat-fix-dialog-closes-on-first-portal-load`,
tmux category `fix-dialog-closes-on-first-portal-load`, cwd `/usr/local/bin/hooks/website`.
`/usr/local/bin/hooks` is not a repository: `git -C <repo>` always.

## Your work, and where it is written

The post-deploy row of `agent-output/handoff/upload-message-dialog-closes-on-first-portal-load-2026-11-08.md`
(its `Owning-Stage` names a session holding the test-account browser; devops added its reconcile
row at release). It closes the code review's Assumption Not Checked
(`agent-output/code-review/closed/fix-dialog-closes-on-first-portal-load-code-review.md`, heading
"Assumption Not Checked", Round 1). On hooks.gg, as the test account (`discord-test-browser`
skill; its grant file exists), each on a **fresh page load** (an open tab keeps the old bundle):

1. Message folder → "new message" → "Upload Message": the "Create or upload a new message" dialog
   opens and stays open; open its "Save To" dropdown: it opens. Falsity: the dialog vanishes, or the
   page flashes to the loading dots.
2. Message editor → "Save As" dialog, as the first popover of the page load: the dialog stays open
   and its "Save To" dropdown opens.
3. Message editor top-bar menus (File and the other Navigation menus): each opens on its first use
   in a page load without the page flashing to the loading dots.
4. Embed editor → colour picker: opens on its first use in a page load without the flash.

These four are the fixer's User-visible flows
(`agent-output/implementation/closed/fix-dialog-closes-on-first-portal-load-implementation.md`).

Record each flow as a per-flow row (EXECUTED PASS / EXECUTED FAIL / NOT EXECUTED with the reason)
in the handoff's changelog, with the build you observed (how you established which deployment
served the page) and evidence saved under
`agent-output/verification/fix-dialog-closes-on-first-portal-load/post-deploy/`. Do not close the
handoff or change its `Status`: this thread closes it on your rows. A browser-walker helper may
drive the steps; the rows are yours.

## State at composition (re-derive at yours)

Website `master` at the remote is `1ad625e2161b58c5f870c9db369f4056df690a03` (`git ls-remote`, this
thread, 22:4xZ), pushed 22:41Z (`deployment/closed/fix-dialog-closes-on-first-portal-load-deployment.md`).

## Rules this thread adds (marked as steering's)

- **No production writes.** Open dialogs and menus only: no Save, no Upload, no Send, no message
  created. If a flow cannot be reached without a write, record NOT EXECUTED with what it needed.
- A FAIL is reported to `steering-roadmap` at once by SendMessage, with its evidence; the rollback
  (Vercel promote of the previous deployment) is the owner's call, not yours.

## Delivery

Your report is delivered to `steering-roadmap` by SendMessage; owner-needing items come the same way.
