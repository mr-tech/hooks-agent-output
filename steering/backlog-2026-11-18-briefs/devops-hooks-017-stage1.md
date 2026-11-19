# Brief — devops-hooks-017, Stage 1 (chain 017)

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/017-brief-common.md` (determination, stage set,
standing prohibitions, architecture record, hazards). Read it before your first act. Stage set, quoted
there: "Planner, critic, architect conformance, QA Phase 1, implementer, code review, QA Phase 2, UAT,
devops, retrospective. **Security** on the preview-image-generator delta before release … Analyst: only
where the plan commissions one."

From `steering-roadmap-hooks`, 2026-11-19T19:0xZ. You are the session `devops-hooks-017`, launched in
`/usr/local/bin/hooks` (a cross-repository chain; `git -C <repo>` on every call; never `git log`/`show`
in `preview-image-generator`, whose `.github/workflows/prod.yml` is secret-gate-flagged: take its tip
from `rev-parse`).

## Resume

Your last Resumption State is in `deployment/017-existing-items-backlog-m5-0-probe-deployment.md`
(agent-output `55bdabc`); that record covers the M5-0 probe alone. This commission is Stage 1 for the
release of plan 017.

## Your commission: devops Stage 1 (devops.md)

Plan `planning/017-existing-items-backlog.md`, revision 11 (agent-output `a971ed8`), Status UAT Approved
(R-61, `9cfc8f5`). § "Release and rollback" (line 1272) names the end step and the deploy order.

Release trees, each copied from its gate document's anchor field:
- website `7293a35`: QA `qa/017-existing-items-backlog-qa.md`, `Verified-At` `7293a35,8512a1d`
  (agent-output `cf69ef1`); UAT `uat/017-existing-items-backlog-uat.md`, APPROVED FOR RELEASE at
  `7293a35`, `8512a1d` (agent-output `f5f78b0`); code review `Reviewed-At` (agent-output `e324582`).
- generator `8512a1d`: the same QA and UAT anchors; security
  `security/017-preview-image-generator-security-audit.md` APPROVED `8de2b53..8512a1d` (agent-output
  `4ae4825`).
- Architect closing pass: `architecture/closed/017-existing-items-backlog-architecture-findings.md`,
  Resolved, anchored at `7293a35`/`8512a1d` (agent-output `0fbb246`). If either tree moves before the
  pushes, a further architect delta read is owed first, and so is a QA verdict at the new tip.

Both trees sit on local branch `chain/017-existing-items-backlog`, with no upstream (website from
`origin/master` `1ad625e`; generator from `origin/prod` `8de2b53`). Switching the shared trees back at
release is yours (CLAUDE.md, Shared working trees); never over a dirty tree. The website holds an
untracked `.playwright-mcp/` that is not the chain's: leave it.

Release-tip QA: a per-plan verdict satisfies the release gate only where its tree is the tip's tree.
QA Phase 3 is `qa-hooks-017`'s. It is cleared: your message to it names its Resumption State
(agent-output `1925e56`).

**Stage 2 needs his release approval**, asked by you in this session (devops.md). Both pushes reach
production (website `master` via Vercel's git integration, no workflows in the repo; generator `prod`
via its workflow). His approval of your plans is not release approval. No approval is carried in this
brief.

## Forward-item sweep (your record)

- Decisions Register and the plan's register (R-1 to R-61) in the plan; rulings in
  `steering/017-rulings.md` (read `steering/017-standing.md` first, then blocks from 17:49Z for today's
  answers: D-33 to D-35, M2 capped, revision 10 confirmed).
- Assumption Not Checked, by path and heading: `qa/017-existing-items-backlog-qa.md` § "Assumption Not
  Checked" (line 1031) and each pass's "Assumption Not Checked (this pass)", "(effort-final pass)";
  the `qa/017-existing-items-backlog-m<n>-qa.md` documents' own; `code-review/017-existing-items-backlog-code-review.md`
  § "Assumption Not Checked" (line 1039); the UAT document's Pass 2 routed assumptions; the security
  audit's.
- Carriers: the post-deploy rows B-6 to B-11 in QA's register (their runners and timing as written);
  UAT's O-1 (below).

## Pending with him (named so you know)

UAT's O-1: four `/preview` error-status answers to the generator on the local production build
(`verification/017/uat/walk-7/`), which UAT recorded as a stated limit (X-22's surface). This thread is
checking it before putting it to him. If his answer would move a release tree, you hear from me before
any push.

## Routing

- Your Stage 1 completion message (devops.md, step 2c) goes to `steering-roadmap-hooks`. The architect's
  closing pass and the critic's read of the current revision have both landed (above).
- Owner-needing items and spawn cues come to me by SendMessage; status goes in your document.
- Arm your cache-warm wake (the `cache-warm` skill).
