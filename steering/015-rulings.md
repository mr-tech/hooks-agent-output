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

## 2026-11-08T05:21Z — generator host: standing reads; dump.pm2 (one selection prompt, two questions)
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

## 2026-11-08T05:24Z — OQ-G and OQ-H (one selection prompt, two questions; relayed from planner-hooks-015)
- **OQ-H, root dump.pm2.** Options: Agent: filtered extract only / Agent: logs only / You: lock it down too. Chosen
  **Agent: filtered extract only**, by selection. The extract prints only name, kill_timeout and shutdown_with_message
  per app (jq on the host). Env is never printed.
- **OQ-G, how M8 deploys.** Options: Agent: preview first (Rec) / Agent: straight to prod / Agent: drop M8, handoff.
  **No option chosen.** Instead he pasted his own host observation, verbatim:
  `root@hooks-preview-image-generator:~# pm2 l` → one row: id 0, name "hooks-image-previ…" (truncated), mode fork,
  ↺ 0, status online, cpu 0%, memory 80.2mb.
  Steering's reading, marked as the thread's: this agrees with steering's 05:20Z ps read (one root-daemon process,
  deployed/prod). ↺ 0 means no restart counted since that process started. OQ-G stays unanswered and is re-put to him.

## 2026-11-08T05:26Z — OQ-G: "straight to prod. delete the preview branch"
His words, verbatim. He gave them after asking "The preview branch is vestigial, is it not?" and steering's answer:
preview c233ec4 (2023-08-21) is 0 commits ahead of prod; no preview app is in root's dump.pm2; the preview logs were last
written 2023-08-20. **OQ-G = straight to prod**: M8 deploys by a devops push of `prod`, with host log reads before and
after. The shutdown check runs on the next stop of the new process.
**Executed by steering on his word:** `git push origin --delete preview` (remote ref was c233ec4) and
`git branch -d preview` in preview-image-generator. `git ls-remote origin refs/heads/preview` is now empty.
Containment was read immediately before: `rev-list --count origin/prod..origin/preview` = 0. The `preview.yml` workflow
file remains in the prod and master trees, and nothing now triggers it.

## 2026-11-08T05:29Z — M8's verifying stop of the new process (selection; relayed from planner-hooks-015, rev 4 f19e688)
Options: You: pm2 reload once (plan default) / Agent: re-run prod.yml / Agent: skip the proof. Chosen **Agent: re-run
prod.yml**, by selection. After the prod push, devops re-runs prod.yml through workflow_dispatch. That is a second
production deploy and needs his approval like any prod push. An agent reads the result over claude-ro.
Premise read this turn: `workflow_dispatch:` is at prod.yml line 12 (grep).
FYI relayed to him, as the planner's and analyst's claim: pm2.log in verification/015/m8-0-run1-2026-11-08T0525Z.txt
shows "Stopping app ... id:0" with a SIGKILL at 2026-06-15T10:02:41, then the next "starting" at 2026-08-23T04:18:19
(steering read those lines in the file). Whether the generator was down for the whole gap is not established.

## 2026-11-08T05:33Z — "the researcher is done. playwright is now available"
His words, verbatim. This lifts the 04:37Z constraint: stages of chain 015 may use Playwright and browsers. The usual
rules on shared-tree state still apply, so installing or upgrading Playwright is not implied.

## 2026-11-08T05:50Z — implementation start recorded (planner.md Process step 6)
Every pre-code gate has approved **plan revision 7** (38b12e6):
- critic cycle 2 pass 2 APPROVED (1ce2ae4);
- architect delta APPROVED (592eb23);
- **QA Phase 1 at ba277d8** (Awaiting Implementation, approves the start).
No OPEN QUESTION is open: `grep -c 'OPEN QUESTION:'` = 0, all are marked RESOLVED.
Non-blocking items go to the planner: QAF-8 (MEDIUM, owed before the M8-0 run-2 script extension), QAF-9, AF-16 and L-C2-4.
Trees: website and preview-image-generator are on chain/015-bug-evaluation-fixes at 7ce866b and 471578f, both clean.
implementer-hooks-015 is spawned at M0. Before code on any milestone touching a user-visible surface, its flow questions
come to the owner.

## 2026-11-08T06:25Z — OQ-I (plan rev 9, 1b8b43b): how far the F-8 fix goes (selection)
Options: Agent: fix both windows / Agent: stop, note the limit. The planner made no recommendation. Chosen **Agent: fix
both windows**, by selection. The implementer also closes the account-lookup window in the same function. Code review and
QA re-check that one item once.
Premise read by steering this turn: verification/015/m1h-rejection-window-probe-run1.txt (planner, node v24.14.0) prints
"UNHANDLED messages failed" and exit=0.

## 2026-11-08T06:29Z — AF-17 sign-out gap: fix it in this chain (selection)
Put 06:29Z, answered 2026-11-08T06:29Z, **by selection** (labels and descriptions steering's). Source: architect AF-17 (a34ca86), planner's verification (message 06:29Z).
Options: Agent: fix it in this chain / Agent: keep it as a stated limit / You: discuss first. Chosen **Agent: fix it in this chain**.
The description he chose: M1-c is changed so sign-out always clears both cached session entries (user-access-token, user-session-token), a database error included, and the error still reaches the caller. Cost: plan revision 11, with the gates re-reading that limb only, then one change, one code-review round and one QA Phase 2 re-run on M1-c. Residue that stays: user-guilds (600 s), the revoke and the Accounts update on that path.
Premises, read by steering this turn at website be881c9 (code read, not run): removeUserSession (src/server/auth.ts:77-99) rethrows non-NoResultError before clearUser runs; clearUser (src/utils/redis/index.ts:253-259) deletes both keys; fetchAccountFromSession caches user-session-token for 600 s (:413-416); authorizeGuildAdmin.ts:24 reads it. "Not a regression at 7ce866b" is the planner's claim, which steering did not read.

## 2026-11-08T06:32Z — rev 11 (14fe94f): steering's weighing, no owner prompt
- M8-0 run-2 span is in its fourth revision (RK-6; revs 8, 9, 11). Steering weighed the cost: the fold adds no gate round of its own, because the rev 11 round runs anyway for M1-c/M1-h. So it was not put to him as "fix vs stated limit". A fifth revision of this limb goes to him as that cost question before it is folded.
- M1-h's no-account and early-return rows (M-C3-2, QAF-12) ride D21 ("fix both windows") as the same class, completing a property he chose. This is steering's and the planner's judgement, not his words.

## 2026-11-08T06:34Z — CR-3 (code review Round 2 REJECTED M1 at be881c9, 53ee954): routed to the planner, no owner prompt
CR-3 MEDIUM: sign-out reads a cached null in user-access-token as "no account" and skips the revoke, the Accounts update and the user-guilds clear. The reviewer's executed probe dates it to M1-j (a2592f0). Steering's judgement: this fixes the chain's own regression within M1-c, and the M1-c re-review that D22 already costs covers it, so it is not a scope delta for the owner. If the planner's fold widens M1-c beyond that, it comes back to him.

## 2026-11-08T06:39Z — L-C3-4 (run-2 span clock premise): record as assumption (selection)
Put ~06:37Z, answered ~06:38Z, **by selection** (labels and descriptions steering's). This is the cost question promised at a fifth revision of the run-2 span limb (block "rev 11 … weighing").
Options: Agent: record as assumption / Agent: rewrite it (5th time) / You: discuss first. Chosen **Agent: record as assumption**. Its description, verbatim: "Agent: the planner records 'the box runs in UTC' as a stated assumption beside the check, with no rewrite of the requirement. The critic, architect and QA don't re-read it again. If the box's time zone ever changes, the window could be off by the offset."
Premise read by steering at 06:37Z over `ssh hooks-pig` (standing claude-ro read): `date` and `date -u` agree; /etc/timezone is Etc/UTC; /etc/localtime → zoneinfo/Etc/UTC. "Zone-less pm2.log vs UTC out log" is the critic's claim (d18de10).
**STEERING'S ERROR:** plan rev 12 (c5d6acd, committed 06:37:53Z) had already folded L-C3-4 and QAF-16 as a criterion rewrite (run 2 prints `date +%z` and checks the online stamp against the ready stamp, reporting no span on a mismatch). Steering put the prompt without first reading the plan's tip, so the prompt did not say a rewrite had already landed. The ruling stands as given: the planner brings that limb back to the stated assumption.

## 2026-11-08T06:45Z — M4-d flow questions (implementer-hooks-015): one selection prompt, two questions
Put ~06:47Z, answered 2026-11-08T06:45Z, **by selection** (labels and descriptions steering's; Q1's proposed text the implementer's).
- **Network-error text.** Options: Agent: implementer's text / Agent: shorter text. Chosen **Agent: implementer's text**. When the old-message fetch fails with no response, the box shows "Could not load the message. Check your connection and try again." Discord refusals keep their existing texts.
- **What the box accepts.** Options: Agent: digits-only id, any URL / Agent: digits or Discord link / Agent: leave as is. Chosen **Agent: digits or Discord link**. An id must be all digits, and a URL must be a Discord message link (discord.com/channels/<server>/<channel>/<message>). Anything else is refused before fetching.
Premise read by steering at website 6001f7f (code read, not run): WebhookProvider.tsx:100 and useValidateWebhook.ts:40 test `isValidUrl(x) || /\d+/.test(x.trim())`; WebhookProvider.tsx:98-127 sets oldMessageError per status and has no catch.
This sharpens M4-d's "message URL", so it goes to the planner to register. Which hosts count as a "Discord message link" (ptb/canary, discordapp.com) was not asked; that is the planner's to state, or to bring back to him.

## 2026-11-08T06:46Z — M1-c and M1-h released on plan rev 13 (9cbe755)
Every pre-code gate has passed rev 13: critic cycle 3 closed APPROVED (6970763), architect APPROVED (f7e6602), QA Phase 1 re-key passes with QAF-17/18 LOW to the planner, not blocking code (aad87b6). No OPEN QUESTION is open (planner's report). M3 was released by the planner's R-5 (a07e9c3). Pending registration, not blocking M1: M4-d (9b94838), and M4-c's "name view" question.
Steering's error, recorded: on 06:44Z I told code-reviewer-hooks-015 that 6001f7f carried neither M1-c nor M1-h. In fact it carries the M1-h change 69b17af. I withdrew that to the reviewer.

## 2026-11-08T06:50Z — M4-d link hosts: also discordapp.com (selection)
Put ~06:53Z, answered 2026-11-08T06:50Z, **by selection** (labels and descriptions steering's; the pattern facts are the planner's read of src/constants/index.ts DISCORD_MESSAGE_LINK_REGEX, which steering did not read).
Options: Agent: reuse site's pattern / Agent: discord.com only / Agent: also discordapp.com. Chosen **Agent: also discordapp.com**. Its description, verbatim: "Agent: the site's pattern plus old discordapp.com links. The planner would then decide whether the New Message dialog gets the same change (a further scope question)."
So the edit-message box accepts discord.com, www., canary., ptb. and discordapp.com message links. If changing the New Message dialog too (for example by widening the shared constant) is proposed, that is a scope delta and comes back to him.

## 2026-11-08T06:52Z — OQ-J (plan rev 15, 2042464): widen the shared link rule; all discordapp.com variants (selection, two questions)
Put ~06:57Z, answered 2026-11-08T06:52Z, **by selection** (option texts steering's, drawn from the planner's OQ-J relay).
- **New Message dialog.** Options: Agent: widen the shared rule / Agent: send page only / Agent: drop discordapp.com. Chosen **Agent: widen the shared rule**. DISCORD_MESSAGE_LINK_REGEX changes once, so the edit box, NewMessageModal's link load and message.getFromUrl all accept discordapp.com links. The New Message dialog's behaviour change is accepted as stated. Cost as stated: no extra milestone or round; the same M4 change, review and QA cover it.
- **Subdomains.** Options: Agent: plain discordapp.com / Agent: all variants. Chosen **Agent: all variants**. discordapp.com takes an optional www., canary. or ptb., as discord.com does. This overrides the planner's bare-host reading.
Premise read by steering at website HEAD: constants/index.ts:30 is the regex (discord.com only); it is used at NewMessageModal.tsx:90 and server/api/routers/message.ts:70,72. "Mirror rule as his standing rule" is the planner's attribution, which steering did not read.

## 2026-11-08T07:01Z — CR-12 (cross-guild read in getFromUrl): fix it in chain 015 (selection)
Put ~07:00Z, answered by selection (option texts steering's). Options: Agent: fix it in chain 015 / Agent: separate quick fix / Agent: handoff + security / Agent: record only. Chosen **Agent: fix it in chain 015**. Its description, verbatim: "Agent: the planner adds it to M4-d: refuse unless the fetched message's channel belongs to the server you were checked against. Cost: a plan revision with one more review round on M4-d, one change, code review and QA. It reaches production only when chain 015 releases, after all its milestones (hours at least), so the hole stays open until then."
Premise read by steering at website origin/master 7ce866b (ls-remote): getFromUrl (server/api/routers/message.ts ~69-90) authorizes the link's guildId and then GETs /channels/{channelId}/messages/{messageId}, with no channel-to-guild check. Whether Discord serves the cross-guild read was not executed (CR-12's Assumption Not Checked).

## 2026-11-08T07:01Z — M-C4-1 (F-27's second site, useValidateWebhook.ts): "I already ruled on this class of item. Yes fix."
His own words, verbatim, in answer to steering's selection prompt (fix both boxes / send page only / neither). M4-d covers both sites, as rev 17 states. **Steering's error:** this was a same-defect-in-a-sibling item, which his mirror-the-siblings class ruling already decides. It should not have been put to him. From now on such items ride without a prompt.

## 2026-11-08T07:24Z — CR-14 (webhook-URL network-failure text): "Invalid URL" at both sites (selection)
Put ~07:22Z, answered by selection (options composed from planner-hooks-015's relay; label texts steering's). Options: Agent: 'Invalid URL' at both / Agent: new webhook text at both / Agent: leave it as built. Chosen **Agent: 'Invalid URL' at both**. Its description, verbatim: "Agent: the New Message dialog copies the send page. One small change and a test at each place. A dropped connection then tells the user the URL is wrong, as the send page already does today. Cost: a plan revision with a review round, then a code change, code review and QA re-run on M4 (planner's recommendation)."
Premise: the site behaviour at website 1e12837 is the planner's code read (WebhookProvider useValue → "Invalid URL"; useValidateWebhook → D24's message text). Steering did not read it.

## 2026-11-08T07:26Z — M3: drop M3, not a defect (selection)
Put ~07:29Z, answered by selection (options steering's, from the implementer's and the planner's option sets). Options: Agent: drop M3, not a defect / Agent: clean up the dead guard / You: discuss first. Chosen **Agent: drop M3, not a defect**. Its description, verbatim: "Agent: M3 is removed from the chain, and F-15/F-39 are recorded as not reproducible (dead code only). The plan's promise 'a Cancel key press never deletes' is kept as already true, with the Chrome read as evidence. Cost: a small plan revision and a review round; no code (implementer's recommendation)."
Premise read by steering: verification/015/m3-chrome-read/README.md (8996505), at website 6001f7f in Chrome 156. In all three dialogs, cell a (Enter on Cancel) leaves the action unrun; the controls b and c run it, and d (click) does not.

## 2026-11-08T07:30Z — M5 flow questions (implementer-hooks-015): one selection prompt, two questions
Put ~07:35Z, answered by selection (labels and descriptions steering's; the options the implementer's).
- **M5-h, /preview with non-JSON data.** Options: Agent: short error line / Agent: blank page / Agent: new error page. Chosen **Agent: short error line**: a single line of red text, "Invalid message data.", on the existing dark background, in the inline text-error idiom.
- **M5-f, Save As defaults.** Options: Agent: reset on open / Agent: rebuild each open. Chosen **Agent: reset on open**: name and server are refilled from the message on each open, and typed-then-cancelled values are dropped. An earlier save error may still show on reopen.
Steering's call, not his: valid JSON of the wrong shape (e.g. data=null) is the same defect on the same page. If the implementer's probe shows it crashes, it rides M5-h under D28's class, reported to the planner.

## 2026-11-08T07:32Z — M4's D29 change released on plan rev 21 (3d193f9)
The rev 20 + 21 round has passed every gate: critic cycle 5 pass 2 APPROVED (79e8572), architect APPROVED (081bb4e), code review Round 9 APPROVED (22e086c), and QA's Phase 1 re-key to rev 21 (c4e82b3: QAF-24 resolved). M4 Phase 2 at 1e12837 failed on test coverage only (QAF-25 MEDIUM: 7 surviving mutants, 3 limbs). Those cells ride the D29 reopen. L-C5-1 LOW is a Planner batch row and does not block code.

## 2026-11-08T07:42Z — steering-coordinator coordinates chain 015's Playwright use (owner confirmed, selection)
steering-coordinator relayed his words: "You are to coordinate `steering-emoji-epic` and `steering-hooks-01` using memory only, namely around playwright coordination. Do not write files. Brief them of your existence." Steering confirmed it with him here by selection: **Agent: yes, accept it**. Scope is Playwright only: browser launches, e2e runs, browser installs, the dev-server ports a run binds, and shared browser profiles. Before any such act, a chain-015 stage asks steering, and steering asks steering-coordinator for a go. If the coordinator cannot be reached, that goes to the owner as a block. This narrows D20's free use of Playwright.

## 2026-11-08T07:52Z — M5-h wider refusal and M6-l error placement (two selection prompts)
Both answered by selection; labels and descriptions are steering's, the options the planner's and the implementer's.
- **M5-h, valid JSON that is not a message object** (number, string, list). Options: Agent: error line for them too / Agent: only crashing links / You: discuss first. Chosen **Agent: error line for them too**: every non-object value shows "Invalid message data.", as built (page.invalid-data.test.tsx). The cost is a plan update and a short review, with no code change. Premise: implementer's jsdom probe verification/015/m5h-preview-data-probe-6c42032.txt (steering did not read it); real Chrome not read.
- **M6-l, where the over-40 error shows.** Options: Agent: red line + red border / Agent: red line only / Agent: next to Send only. Chosen **Agent: red line + red border**: "Message has 41 components; the limit is 40." (the count is live) in red under the components, with a red border, in the editor and on the Send page, following the text-length errors in DiscordMessageEditor. The Add Component button and counter still hide at 40 and over. Premise: implementer's code read, which steering did not read.

## 2026-11-08T08:02Z — AF-25 (over-40 error on /preview and in generated images): same as siblings (selection)
Put ~08:00Z, answered by selection (option texts steering's). Options: Agent: same as siblings / Agent: hide all on /preview / Agent: hide only the new one. Chosen **Agent: same as siblings**: the over-40 line and border also show on /preview, so an over-40 message's generated preview image carries them, exactly as the existing text-length errors already do. No extra work. Premise: the architect's read (5581822, D-003), which steering did not read.

## 2026-11-08T08:03Z — steering's relay error: M5-h correction withdrawn
At ~08:01Z steering relayed the planner's AF-23 correction to implementer-hooks-015 as an instruction: "do NOT refuse embeds/fields \"\"; the predicate is makeEditable's throw". That was a peer's claim, relayed without a read. Code review Round 11 (9268f02, CR-20) then executed the real page at da24eb7: embeds:"" and fields:"" crash it, in validateEmbedCharacterCount. Steering withdrew the instruction and told the implementer to hold M5-h until rev 23.
