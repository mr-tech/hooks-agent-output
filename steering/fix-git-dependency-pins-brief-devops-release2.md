Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-git-dependency-pins-brief-common.md` (its website line is superseded by
rulings block "2026-11-21T23:58": the website tree is this chain's).

To `devops-fix-git-dependency-pins`, from `steering-hooks`, 2026-11-22T00:2xZ. **Release 2 — website `master`.** Stage 1 now; the release
ask to him (Stage 2) only **on a passing production build** — see the gate below.

## Gate documents (anchors copied at compose time)

- Fixer: `implementation/fix-git-dependency-pins-implementation.md` (record `80a5778`), `Handoff-At: 40ba5d3,3859c29 — repos=project-utils,website`.
- Code review: `code-review/fix-git-dependency-pins-code-review.md` (record `41193a1`), round 2 APPROVED, `Reviewed-At:
  40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165,3859c29d557c920a5b611b8e3a4e7b5bf7b1222e — repos=project-utils,website`, no findings. No QA
  (3 production lines across both halves); the tip's verdict is that review.

## Trees and refs

- Website `chain/fix-git-dependency-pins` head `3859c29`, cut from `origin/master` `132a7ab` (chain 6's commit; not yet deployed).
  No `.github/workflows`; a push to `master` makes Vercel build production.
- **The gate on Stage 2:** website `master`'s production build fails today because five Production settings are missing in Vercel
  (chain 6 rulings `steering/fix-delete-dead-cron-rulings.md` block "2026-11-21T23:55"; his dashboard step in `OWNER-QUEUE.md`;
  `devops-fix-delete-dead-cron` reads the redeploy). Put no release ask to him until `vercel ls --prod` shows a Ready production deployment
  of `132a7ab` serving `hooks.gg` (`vercel inspect https://hooks.gg`). Your release then carries chain 7 on top of chain 6's live commit.
  If steering or `devops-fix-delete-dead-cron` reports the settings fixed, read it yourself before asking.

## Carriers and hazards

- Rulings: `steering/fix-git-dependency-pins-rulings.md` blocks 22:28, 22:58, 23:07, 23:11, 23:16, 23:58, 00:07.
- Code review's Assumption Not Checked (round 2): the deploy host installs this lockfile with pnpm 10.28.2 and fetches private
  project-utils (over SSH, as for `749606d`) — settle it from the last successful production deployment's build log (`vercel logs <url>`,
  look-only; his selection, effort rulings block "2026-11-21T19:02").
- Deploy evidence: read the production deployment's own state after the push (`vercel ls --prod`, `vercel inspect https://hooks.gg`),
  not the push alone — chain 6's push reported complete while its build had errored (chain 6 block 23:23).
- The fixer's **User-visible flows** list (its document) goes to him with the release ask, in his form (effort block "2026-11-21T18:37Z":
  context first, plain English, no commit IDs or tool names); it says paracord's use in the site is unread.
- Outside consumer (block 23:16): `/usr/local/bin/hooks-deprecated/cdn` names project-utils `#master`; unread, changes only if it re-pins.
- Avoid a bare `none` operand; a call not completed → stop and message `steering-hooks`, never re-issue in another form; the record says
  only "not completed".

## Routing

Owner-needing items you are not asking him yourself, spawn cues and the release outcome: SendMessage to `steering-hooks`. Your record:
`deployment/fix-git-dependency-pins-deployment.md` (open since release 1).
