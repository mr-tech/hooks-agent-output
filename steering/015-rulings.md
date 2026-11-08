# Rulings — chain 015, bug-evaluation fixes

Steering session alias chain: steering-bug-fixes → steering-hooks-015 (pending; tmux-agent refuses while busy).
Planner: planner-hooks-new → planner-hooks-015 (pending, same reason). File was `steering/bug-fixes-rulings.md` until minting.
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

## 2026-11-08T04:39Z — ID 015 minted by the planner on the owner's word
Reported by planner-hooks-new: selection prompt in its session, answered "Agent: open the chain". The prompt was put in the
planner's session, so this thread did not see it. Chain branches are still to be created, in the repos the plan touches.

## 2026-11-08T04:49Z — revision 1 scope relay: OQ-A–OQ-F, quote confirmation, API-key finding (two selection prompts)
Source: planner-hooks-new's relay of `planning/015-bug-evaluation-fixes.md` rev 1 (`adc5c1a`). Prompts put 04:4xZ, answered 04:49Z.
Premises: plan commit and the Exclusions table X-1–X-11 were read by steering at `adc5c1a`. In prod.yml and
preview.yml, `grep -c -i key` returns 6 each; the value was not read. The typecheck error count (2) and the
"first deploy since 2023-08-22" date are the planner's claims, unread by steering.
- **OQ-A typecheck.** Options: Agent: delete stale dir (Rec) / Agent: scratch configs / Agent: waive the gate. Chosen
  **Agent: delete stale dir**, by selection. The implementer deletes website/.next/dev/types at M0, and the gate is the
  repo's own `pnpm run typecheck`.
- **OQ-B limits.** Options: fix both (Rec) / only F-43 / only F-40 / drop both. Chosen **Agent: fix both**, by selection.
  F-43 sets the footer to 2048 (editor and save check). F-40 accepts png, jpg, jpeg, webp, gif, apng, tiff and webm,
  any case, query string ignored, avif excluded.
- **OQ-C F-49.** Options: both after (Rec) / both before / drop F-49. Chosen **Agent: both after**, by selection.
- **OQ-D F-44.** Options: handoff, out (Rec) / refuse the add / allow, mark invalid. Chosen **Agent: allow, mark
  invalid**, by selection, against the recommendation. F-44 is IN: the multi-component add goes through and the
  message is marked invalid until fixed. X-2 falls away.
- **OQ-E M8.** Options: keep, preview first (Rec) / drop M8, handoff. Chosen **Agent: keep, preview first**, by
  selection. The planner commissions the F-31 analyst.
- **OQ-F PIG host.** Options: drop the pm2 read / hold until you say. Answered in **his own words**: "pretty sure it's a
  digital ocean box. there is no ro user on it". So limb (3)'s read cannot run as a claude-ro read. How limb (3) is
  carried is the planner's to re-derive.
- **Quotes OQ-2 / OQ-3.** Options: use both as rulings / hold M7 and M1-d. Chosen **Agent: use both as rulings**, by
  selection. OQ-2 "Manage Server is probably fine" and OQ-3 "idk" are confirmed as his, with the wording as in the
  research document.
- **API key in plain text in PIG workflows.** Options: handoff, out of chain / noted only / You: handle it yourself.
  Chosen **Agent: handoff, out of chain**, by selection. The handoff records no value.

## 2026-11-08T04:52Z — chain branches created by steering
`chain/015-bug-evaluation-fixes` was created and checked out in website at 7ce866b (from master) and in
preview-image-generator at 471578f (from prod). Both trees were clean just before the switch (`git status --porcelain`, 0 lines).
project-utils has no branch, because plan rev 1 says project-utils ships nothing.

## 2026-11-08T05:11Z — rev 2 deltas M8-0 and M6-l (one selection prompt, two questions)
Premises: M8-0 and M6-l text, read by steering in `planning/015-bug-evaluation-fixes.md` at 5060be6.
- **M8-0, the owner-run host script.** Options: Agent: keep M8-0 (Rec) / Agent: drop M8-0, code-only / Agent: drop F-31
  (M8-a). Answered in **his own words**: "give me the code to add the ro user to the box, in addition to what firewall
  rule(s) to add". So he will create a read-only user on the generator host himself, and steering supplies the commands.
  This meets D12's reopen condition ("A read-only user created there") once the user exists and is confirmed by a
  reachability read. Until then M8-0's route stays open, and the code-reviewer review of `verification/015/pig-host-read.sh`
  (9b99acd) is held.
- **M6-l, the reading of "allow, mark invalid".** Options: use this reading / also allow top-level / hold M6-l. Chosen
  **Agent: use this reading**, by selection. Every add completes; the existing top-level refusal at 40 stays; over 40
  fails validateMessage, so Send is blocked and valid is false.
Steering's call, recorded: the critic and the architect start on rev 3 (800ca67) now, because M0–M7 do not depend on the
host route. A later change to M8-0 will be a delta on M8 alone.

## 2026-11-08T05:20Z — generator host: claude-ro created by the owner; steering's reads
Owner's words: "user should be good. ip: 165.227.249.183". He has not yet answered whether claude-ro reads there
are standing.
Steering read over `ssh -i ~/.ssh/id_ed25519_hooks_pig claude-ro@165.227.249.183` (exit 0):
- `id` is uid 1001 claude-ro, and `sudo -n` needs a password.
- Two PM2 v5.2.2 daemons: nodejs (/home/nodejs/.pm2, app `hello.js`) and **root (/etc/.pm2)**. The root daemon runs
  `/usr/local/bin/hooks-image-preview-generator/deployed/prod/dist/server.js`. No preview-instance process is running.
- `/etc/.pm2` and `/etc/.pm2/logs` are `drwxr-xr-x root`. Steering did not read the files inside.
- The ACLs from steering's instructions point at the nodejs daemon, which is not the generator's.
  /home/nodejs/.pm2/dump.pm2 tests readable by claude-ro; its contents were not read.
**STEERING'S ERROR:** the verification command included `touch /tmp/.claude-ro-probe`, a write on the host. That breaks
the claude-ro reads-only rule. The file exists: 0 bytes, owner claude-ro, 05:18. It has not been removed, because
removing it is another write. That is the owner's call.

## 2026-11-08T05:27Z — generator host: standing reads; dump.pm2 (one selection prompt, two questions)
- **Standing reads.** Options: Agent: standing reads / Agent: ask each time / You: run M8-0 yourself. Chosen **Agent:
  standing reads**, by selection. Reads over claude-ro on 165.227.249.183 are standing, with the rule as the option
  stated it: reads only, never pm2 commands, never a write. Steering added `Host hooks-pig` to ~/.ssh/config.
- **/home/nodejs/.pm2/dump.pm2 readable by claude-ro.** Options: You: remove the access / Agent: leave it, never read.
  Chosen **You: remove the access**, by selection. Until he reports it done, agents never open it.
Steering's read via `hooks-pig`, using `test -r` only, no content read: /etc/.pm2/pm2.log, /etc/.pm2/dump.pm2 and all 8
files in /etc/.pm2/logs are readable by claude-ro, so no ACL is needed. The logs include
`hooks-image-preview-generator-preview-{out,error}.log`. **Root's /etc/.pm2/dump.pm2 is readable** (the planner says it
holds CDN secrets; steering did not read it). /tmp/.claude-ro-probe is now absent, presumably removed by the owner; not
confirmed with him.
