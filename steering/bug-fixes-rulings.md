# Rulings — bug-evaluation fix chain (no ID yet; the planner mints it)

Steering session: steering-bug-fixes. This file is renamed to `<ID>-rulings.md` once the ID is minted.
Source document: `research/codebase-bug-evaluation-2026-11-08.md` (agent-output `aea4a05`, Status Active).

## 2026-11-08T04:37Z — "Start the chain. Note that `researcher-competitors` is currently using playwright."
Owner's words, verbatim, given after steering relayed researcher-bugs' message recommending a planner chain on the
research document. The second sentence is an operating constraint: `researcher-competitors` (live, busy) holds
Playwright. No stage of this chain may start, stop, reinstall or reconfigure Playwright or its browsers, or kill a
browser process, while that session is live; a stage needing a browser asks steering first.

## 2026-11-08T04:37Z — scoping determination: full chain (owner's word "Start the chain")
**Shape.** A defect batch: 50 intent-vs-execution findings, F-1–F-50. The researcher read every one at the code.
Only F-1/F-2 (the SQL shape) and F-38 were proven by execution, so the rest are unproven until a red test exists.
Blast radius: `website` (server/data path, validation, pages/providers, bot, editor), `project-utils`,
`preview-image-generator`. Spec uncertainty: OQ-1–OQ-3 are answered in the document (OQ-1 no defect; OQ-2
`ManageGuild` alone; OQ-3 "idk", so the cap is the planner's call). Steering has not yet confirmed those quotes with
the owner in this session. No library-vs-consumer split was identified: project-utils is a dependency, so the
planner states where each project-utils fix lands.
**Pipeline.** Full chain: planner → critic → architect conformance → QA Phase 1 → implementer → code-reviewer →
QA Phase 2 → UAT → devops → retrospective. Researcher: done (the source document). Security: not started; the
research is explicitly not a security assessment, and no artifact that root executes has been identified. Steering
re-weighs this when the plan names its deploy surfaces.
**Bounded scope.** The candidate pool is F-1–F-50 as rated in the document. Which findings become milestones is the
planner's call, and its revision-1 scope relay, with the Exclusions register, goes to the owner before the critic
sees the plan.
Out of scope:
- H-1–H-8 (hypotheses, not findings), unless the plan commissions their disconfirming tests.
- § Findings 7, the eleven already-open handoffs (cited, not re-rated).
- The RBAC remark (product direction, no effort behind it).
- Any security assessment.
**Recommendation limbs** (§ Recommendations):
- (1) F-2 confirmed against a DB: IN, as an owner-side check the planner places.
- (2) F-28 visibility in Discord: IN, as an owner-side post-deploy check.
- (3) F-31 `pm2 show` kill_timeout: IN, as a read-only `claude-ro` read under the owner's sanction.
- (4) OQ-1: OUT (answered, no defect).
**End step.** Production:
- website: a push to `master`, which Vercel deploys (architecture record line 145). There is no GitHub Actions
  workflow.
- preview-image-generator: a push to `prod` runs `prod.yml` (npm ci, build). A `preview` branch runs `preview.yml`.
- project-utils: a push to `master` triggers no workflow. Consumers pick it up via the pin.
**`release-move.js --dry-run` verdicts** at current tips, this turn:
- website master 7ce866b: passed.
- project-utils master 749606d: passed.
- preview-image-generator prod 471578f: passed; its sibling serving ref `master` (87dcb41) is on one line.
**Released chains touching these routes:** `fix-v1-guild-messages-auth` (2026-10-10). Its open post-deploy carriers
are `handoff/fix-v1-guild-messages-auth-post-deploy-2026-10-10.md` and the OWNER-QUEUE statrole-editor check.
Chain 012 (the `valid` field), whose open carriers are the two 012 handoffs in the docket.
**Tree state read this turn:** all three repos are clean (`git status --porcelain` empty). website is on master
7ce866b, project-utils on master 749606d, preview-image-generator on prod 471578f. Each equals its remote head
(`git ls-remote`).
**Held shared state:** researcher-bugs ran `pnpm install --frozen-lockfile --ignore-scripts` in website, so
node_modules is present. Not to be wiped without asking. `pnpm run typecheck` is red from a torn, git-ignored
`.next/dev/types` artefact (research § Instrumentation Gaps). That is a known constraint on the implementer's gate,
for the planner to settle.
**Chain branches:** created by steering in each repo the plan touches, once the ID exists and before implementation.
