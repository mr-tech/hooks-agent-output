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

## 2026-11-08T08:10Z — AF-26 (two Discord accounts on one Hooks user): record as known limit
First prompt, ~08:10Z (revoke all / known limit / block a second link). He answered in his own words: "what do you mean by \"linking a second Discord account\"? If someone signs in with a different account, that's a different Hooks user". Steering read the mechanism. Through the site's own buttons this holds: NavMenu.tsx:141 signs out when a session exists, and the edit page's Log in panel shows only with !session; send/page.tsx:137 was not read. But next-auth core/lib/callback-handler.js links a new Discord account to an already signed-in user, reachable by visiting the sign-in URL by hand while signed in. Second prompt put with that explanation. Options: Agent: record as known limit / Agent: fix both places now / Agent: block the hand-made link. Chosen **Agent: record as known limit**, by selection: no code; an Exclusions row plus a handoff covering both sites (removeUserSession and fetchUserAccount), reopened if a user with two Discord rows is found or reported. Population unread.

## 2026-11-08T08:11Z — "one Discord account is one Hooks user" recorded as a standing design rule (selection)
Proposed by architect-hooks-015 as website.md entry A-6, quoting his words: "If someone signs in with a different account, that's a different Hooks user." Options: Agent: yes, record the rule / Agent: no, it was just an answer. Chosen **Agent: yes, record the rule**, by selection. The architect lands A-6 with the sentence verbatim. Its read (0f893c8): send/page.tsx at 3031878 renders Log in only when session === null, which closes steering's unread site.
Correction (08:12Z): the entry landed as website.md **W-7**, not A-6 (architect, 952e69f). The block above says "A-6"; read W-7.

## 2026-11-08T08:15Z — M5-h and M5-i released on plan rev 24 (018f72d)
Every gate has passed rev 24: code review Round 13 APPROVED (3960833), architect APPROVED (1a3bc68; AF-28/29 LOW), QA Phase 1 re-key approved with no new finding (4d091e4), and critic cycle 7 closed (0029245; L-C7-1 parked as R-9). M5-h (crash-set property) and M5-i (D28) are released to the implementer.

## 2026-11-08T08:37Z — M6-a released on plan rev 25 (dd9e88a)
Every gate has passed rev 25: architect delta APPROVED (5efb7ab), code review Round 15 APPROVED (1d0059a), critic cycle 8 closed APPROVED (1168da8; L-C8-1 LOW parked as R-11), and QA's Phase 1 re-key approved with no new finding (983a84d). No OPEN QUESTION is open: `grep -c 'OPEN QUESTION:'` on the plan = 0. M6-a (CR-22 blank fence lines, the title member dropped per CR-23) and CR-24 (F-45's sibling class, D28) are released to the implementer. QA Phase 2 at 24ac49f (a7dfb4d): M1, M4, M5-a..g PASS; M6-b..l QA Failed on coverage (QAF-30, QAF-31 MEDIUM; QAF-32 LOW), in the M6 QA document.

## 2026-11-08T09:22Z — /generate non-object bodies: refuse all, as built (selection)
Put ~09:2xZ, answered by 09:22Z, **by selection** (labels and descriptions steering's; the options planner-hooks-015's, message ~09:09Z). Options: Agent: refuse all, as built (Rec) / Agent: only crashing bodies / Agent: decide at UAT. Chosen **Agent: refuse all, as built**. Its description, verbatim: "Agent: every body that isn't a JSON object gets a 500, as the implementer already built it. This matches your /preview ruling (non-object data shows the error line). Cost: no code change; it rides the plan revision the planner is already making, with that revision's normal review round."
Premise read by steering at preview-image-generator 471578f (code read, not run): src/server.ts:21-27, an unguarded `JSON.parse(body)` in the `end` handler, then `const { id, nonce, message } = parsedBody`. Line 43 gates on `req.headers.authorization === config.API_KEY`. "Only the website calls /generate" is the planner's claim, which steering did not read. Rides rev 26 (M8-b).

## 2026-11-08T09:22Z — security re-weigh: security started on the generator change (steering's call, owner may veto)
The 04:37Z determination left security unstarted, "re-weighed when the plan names its deploy surfaces". M8 ships preview-image-generator to prod, and root's PM2 daemon executes it (`/etc/.pm2`, `deployed/prod/dist/server.js`; steering's read, block 05:20Z). Under steering.md, security runs wherever the chain ships an artifact root executes, unless he declines on that premise. Scope: `471578f..6c613a5` in preview-image-generator only. D6/X-8 (no general security assessment) stand. Brief: `steering/015-security-brief.md`. Session security-hooks-015.
Steering's observation, for the retrospective: the implementer committed the M6-a fix (website 9cc06d8, 08:33:46Z) before rev 25's last gate passed (QA 983a84d; release block 08:37Z). Code review approved M6 at 476c633 against rev 25 (2fa6d8b).

## 2026-11-08T09:25Z — RK-8, the M8-d private-field reach: accept + startup guard (selection)
The architect rated it a necessary deviation (7652b59, rev 26 pass), so under steering.md Conformance it was put to him, although the architect wrote "nothing for the owner". **By selection**; labels and descriptions are steering's, drawn from AF-30. Options: Agent: accept + startup guard (Rec) / Agent: accept as built / Agent: accept + guard + exact pin / Agent: drop it, use a timeout. Chosen **Agent: accept + startup guard**. Its description, verbatim: "Agent: keep the fix, and the implementer adds a check at startup. If a library upgrade ever removes the private part, the generator logs a named error line instead of failing silently (architect's AF-30). Cost: a few lines and one test, riding the M8-a fix already under way, with the same code review and QA."
Premises: the architect's read at preview-image-generator 6c613a5 (getPool.ts reaches `_waitingClientsQueue`; the lockfile resolves 3.9.0, the newest published version; prod.yml runs `npm ci`). Steering did not read these.

## 2026-11-08T09:28Z — D35 re-put with corrected cost: as built, lists pass (selection)
The planner reported (R-13, 40cc9e9) that D35's option text was wrong. "As already built, no code change" was false for lists. Steering read preview-image-generator 6c613a5 src/server.ts:25: `if (typeof parsedBody !== 'object' || parsedBody === null) throw`, so `[]` and `[{}]` pass to generateImage (QA's QAF-33, 9fdf439). Steering re-put the question, **by selection**; labels and descriptions are steering's. Options: Agent: refuse all, add the check / Agent: only crashing bodies / Agent: as built, lists pass. Chosen **Agent: as built, lists pass**. Its description, verbatim: "Agent: keep exactly what's built. Lists keep getting through to the image step, recorded as a known limit. Cost: a plan revision narrowing your earlier wording, and a review round."
This supersedes D35's "refuse all" for lists only: bad JSON, null, numbers, strings and booleans still get 500. No array-refusal code. QAF-33 becomes a stated limit. The planner folds it at rev 27.

## 2026-11-08T09:40Z — rev 28 fold: park, fold before UAT (selection; three-consecutive-revision cost question)
M8-d and M5-h (3) were each revised at rev 26 and rev 27. The planner proposed rev 28 for three LOW items (planner message ~09:40Z; registrations 92b925f): CR-32 (widen M5-h (3)'s re-run trigger to src/utils/limits.tsx), CR-33 (D36's member is `_waitingClientsQueue` with a callable `dequeue`), and QA's Assumption Not Checked (the RK-8 handoff runs the M8-d probe). Under steering.md, a limb revised in three consecutive revisions is weighed as a cost question first. Put **by selection**; labels and descriptions are steering's. Options: Agent: park, fold before UAT (Rec) / Agent: rev 28 now / Agent: record as limits, no fold. Chosen **Agent: park, fold before UAT**. Its description, verbatim: "Agent: the planner keeps the three LOW items as queued rows and folds them in one pass just before user acceptance testing, sharing that pass's single review round. Until then they're tracked in the plan, not yet criteria. Saves one full four-reviewer round now."
The implementer builds the CR-33 guard form regardless, under D36 (relayed 09:3xZ). Code review checks it at the CR-27 sub-entry.

## 2026-11-08T09:40Z — plan rev 27 (18d361c) passed every gate
Approvals: architect (b2add20; AF-31 LOW), QA re-key (b21c7b5), code review Round 20 APPROVED_WITH_COMMENTS (b5666ed; CR-32, CR-33 LOW), critic cycle 9 pass 2 APPROVED (c97c25a; M-C9-3 MEDIUM, L-C9-2 LOW). No OPEN QUESTION is open: `grep -c 'OPEN QUESTION:'` = 0. The implementer is not held; its owed code is the D36 guard riding the CR-27 fix.
Steering's call, not his: M-C9-3 (the startup line is read where no pool exists yet) is the same lazy-pool point as CR-33's second half. That point went to the implementer at 09:3xZ ("the guard must inspect a real pool instance"), and code review checks it at the CR-27 sub-entry. So it rides the parked pre-UAT fold (block 09:40Z). If the planner judges that it cannot wait, it comes back to steering.

## 2026-11-08T09:42Z — M-C9-3: steering's framing corrected; the premise moved to 8de2b53, no owner prompt yet
**STEERING'S ERROR:** block 09:4xZ ("rev 27 passed every gate") called M-C9-3 the same point as CR-33's lazy-pool note. The planner showed the difference (144e947, message ~09:45Z). CR-33 is about how to build the check. M-C9-3 is about what M8-d (d)'s text requires: a line "at startup, before it serves a request". At 7e5ca5f that could not be met, because the pool is created on the first /generate. The planner proposed an owner prompt: (ii) the line on first pool creation, or (i) create the pool at startup.
Premise moved before the prompt: preview-image-generator 8de2b53 (09:40:15Z, read by steering via `git diff 7e5ca5f 8de2b53`) adds `checkPoolShape()`, called in server.ts before `server.listen`. It builds a probe pool (`autostart: false, min: 0, max: 1`, a rejecting create), tests `_waitingClientsQueue.dequeue`, and on failure logs a named line and keeps serving. On its face that meets (d) as written, with no Chromium launch. Code review judges it at the CR-27 sub-entry. The question goes to the owner only if that verdict says (d) cannot be met as written.

## 2026-11-08T09:43Z — generator host security posture: accept, record only (selection)
Source: security-hooks-015, security/015-preview-image-generator-security-audit.md (d9e5184), Reviewed-At 7e5ca5f. The change is APPROVED and does not gate M9. Host findings outside the chain (D6/X-8): H-001 (Chrome 116 runs as root with --no-sandbox and renders user image URLs; predates the CVE-2023-4863 fix), H-002 (DevTools port reachable by local accounts), H-003 (:3000 reachable from the internet; Node 18.17.1 EOL), M-001 (.env and dump.pm2 world-readable; deploy copies .git), M-002 (the Actions runner runs as root).
Put **by selection**; labels and descriptions are steering's, drawn from security's options. Options: Agent: follow-up effort after 015 (Rec) / You: mitigate now + follow-up / Agent: accept, record only / You: discuss first. Chosen **Agent: accept, record only**. Its description, verbatim: "Agent: no effort. The findings stay in the security document, carried by a follow-up record so they don't lapse when the chain closes. The risks stay as they are."
Premise read by steering: verification/015/security-external-connect-2026-11-08T0935Z.txt, "port 3000: CONNECTED". The other host facts are security's captures; steering did not re-read the Chrome version or the uid lines. Carrier: a handoff minted by security-hooks-015.

## 2026-11-08T09:49Z — D36 residue: owner informed, not re-put (steering's call)
The planner noted (R-23, 4d506cf) that D36's option text did not say what happens after the line. If the member is absent, a Chromium outage brings back F-34's original hang and creation-retry loop at 8de2b53. AF-31 (log and serve) was settled after his selection. Steering told him in its report at ~09:46Z: "A failed browser launch then leaves requests waiting while the pool keeps retrying. That's the known cost of keeping the server up". The condition only arises after a generic-pool change that removes the member, and D36's promise of a named line holds. So it is not re-put. If he raises it, it is reopened.

## 2026-11-08T09:55Z — usage gate: chain 015 checkpointed and stopped until the weekly reset
At the 09:53Z standing check, `plan-usage.py --json` (source live) read weekly_all 98.0%, resets 2026-11-11T09:00Z. Under steering.md § Usage gates, every stage reached a seam, ran /checkpoint, and was stopped with `tmux-agent stop`. Checkpoints: planner 73435b3, QA 735941c, architect 48853af, critic 37bcd83, code review 678c9c6 (Round 18 sub-entry partial: CR-27 RESOLVED, the D36 guard verdict held for a drift-mutant run), security 712c34b, implementer 45b3a3f. The website and preview-image-generator trees are clean (`git status --porcelain` empty). The standing check is not re-armed. Resume wake ab348eac is set for 2026-11-11 09:05Z (session-only). Steering's own state is in its docket.

## 2026-11-08T09:58Z — "continue steering-hooks-015": usage gate lifted, chain resumed
His words, verbatim, after steering reported that the gate's premise no longer reads as it did. Premise read this turn: `plan-usage.py --json` (source live), run twice at 09:57Z–09:58Z, reads weekly_all **0.0%**, resetting 2026-11-14T16:59Z. That contradicts the 09:53Z read (98.0%, resetting 2026-11-11T09:00Z), and steering has not established why. `CronList` is empty, so resume wake ab348eac no longer exists. Trees: website chain branch at 4f9ed85, generator chain branch at 8de2b53, both clean (`git status --porcelain`, 0 lines).
Respawned now, each from its own Resumption State: code-reviewer-hooks-015 (the Round 18 drift run at generator 8de2b53; website 476c633..4f9ed85, whose handoff from the implementer failed) and implementer-hooks-015 (QAF-34, QAF-35, CR-26). QA, planner, critic, architect and security are respawned when their next act can start.

## 2026-11-08T10:14Z — CR-34, the retry storm when the pool member is gone: record it, no code (selection)
Put ~10:15Z, answered 2026-11-08T10:14Z, **by selection** (labels and descriptions steering's). This reopens the 09:49Z "not re-put" call, because code review measured the cost's size (3540028, CR-34 LOW).
Options: Agent: record it, no code (Rec) / Agent: slow the retries / Agent: refuse to serve instead / You: discuss first. Chosen **Agent: record it, no code**. Its description, verbatim: "Agent: the planner writes the measured rate and log volume into the plan's known-risk row, in the pre-UAT fold already planned. No code change and no extra review round. The risk stays as built."
Premises read by steering this turn:
- verification/015/cr-m8-probes/drift-mutant-8de2b53-{1,2,3}.txt: at 3 s, 11015–14118 launches; stderr 570,000–681,000 lines per run (LINES lines); pool pending=1. The controls show 2–3 launches. These are local runs with no browser binary; the rate on the real host is unmeasured.
- `ssh hooks-pig df -h /`: 49G free of 58G.
- package-lock.json:3467: generic-pool resolves 3.9.0.
"~100 bytes a line, so a few hours to fill the disk" was steering's assumption, and the option text said so. This rides the parked pre-UAT fold (block 09:40Z) as CR-34.

## 2026-11-08T11:01Z — rev 28 (2a4533b) passed every gate; a commit-attribution slip recorded
Approvals: code review Round 21 APPROVED_WITH_COMMENTS (d7b0c57), architect APPROVED (ca92900), critic cycle 9 pass 3 APPROVED (8b7f9b0), QA Phase 1 re-key (cfbdc7d). CR-39, AF-32 and L-C9-4 are parked for the RK-8 handoff text at M9: the drift probe is local only, never run on the host.
Steering's observation, for the retrospective: QA's plan-row commit 4c23db0 also carried the planner's uncommitted R-26 hunks. The CLAUDE.md single-row exception requires the diff to hold only the stage's own row. Then the planner's 839e9f5 message misattributed QA's row; the planner disclosed this itself (message ~11:05Z). Content at HEAD is correct; no history rewritten.

## 2026-11-08T14:18Z — effort-final plumbing sweep: QA runs the 15 (selection)
Put ~12:45Z, answered 2026-11-08T14:18Z, **by selection** (labels and descriptions steering's, from qa-hooks-015's ask). Options: Agent: QA runs the 15 / Agent: record as a limit / You: discuss first. Chosen **Agent: QA runs the 15**. Its description, verbatim: "Agent: QA adds one mutant per plumbing line and runs them. Cost: about 15 runs, roughly 10 minutes (QA's estimate), no other stage involved. Any survivor becomes another test gap for the implementer."
Premises: QA's verdict was QA Failed on test adequacy (3e074cf, read). The count of "about 15 plumbing hunks" in verification/015/effort-final/gap-dispositions.md is QA's claim; steering did not recount it. Since the prompt, QA passed the effort-final at website 620b4ee and generator 8de2b53 (a906b0c), after code review approved 620b4ee (8f4578c, test-only). By QA's own statement, a survivor of the 15 withdraws that PASS. So UAT is held until the 15 runs report.

## 2026-11-08T14:44Z — UAT started: QA effort-final PASS at website b96e364, generator 8de2b53
QA's Verified-At "b96e364,8de2b53" (qa/015-bug-evaluation-fixes-effort-final-qa.md, 3cab676; plan Status QA Complete, 91c714d). It came after code review APPROVED b96e364 (c878f4a; CR-40 RESOLVED). The owner's plumbing sweep (bab96e0) is discharged: QAF-41 and QAF-42 RESOLVED, test-only. uat-hooks-015 spawned, delivering to devops. The Playwright rule (block 07:42Z) applies: steering asks steering-coordinator before any browser act.

## 2026-11-08T14:45Z — Playwright go for UAT (steering-coordinator, block 07:42Z)
Requested for uat-hooks-015: one MCP Chrome on profile mcp-chrome-313b550; next dev on 127.0.0.1:3000 from a git-archive export (b96e364, then 7ce866b briefly); setOffline() in that browser. Go given 14:45Z. The coordinator's reads: 0 matching processes, no Singleton locks, 0 listeners on :3000. Terms: chain 015 holds the profile and :3000 until UAT reports browser_close and the server stopped, and releases as soon as the walk ends (chain 069's production checks wait on the same profile). The live-DB saves are under the test account only (QA I-10, E-9).

## 2026-11-08T19:47Z — UAT-1, no local Postgres: recreate it (selection)
Put ~14:5xZ, answered by 2026-11-08T19:47Z, **by selection** (labels and descriptions steering's, from uat-hooks-015's options a/b/c). Options: Agent: recreate local Postgres (Rec) / You: walk them yourself / Agent: mark not executed. Chosen **Agent: recreate local Postgres**. Its description, verbatim: "Agent: UAT pulls a postgres docker image and starts a fresh container on 127.0.0.1:5432, with the schema pushed from project-utils' prisma file as chain 014 did. It's empty, so the walks create their own test data. Nothing outside this machine is written. Needs a port go from steering-coordinator. Then UAT runs the 7 checks."
Premises read by steering this turn: website/.env.local's live DATABASE_URL host is 127.0.0.1:5432, and the Railway line is commented out (host only read, credentials masked).  shows 0 listeners. docker: 0 containers, no postgres image. 014-rulings.md:136 records "stay local" as the steady state. The ruling keeps "stay local": .env.local is not changed.
The plan's Validation premise ("`.env.local`, whose database is the live one") and QA I-10 are false at this date. UAT records that as a finding for the planner.
STEERING'S ERROR: uat-hooks-015 reported the browser and :3000 released at 15:16Z, and steering did not relay that to steering-coordinator until 19:4xZ, after the coordinator asked at 17:38Z.
UAT's conditional approval (5de25d7; plan Status UAT Approved, bbf24a1) names the six rows. They must be EXECUTED before the website merge to master. devops-hooks-015 is not spawned until they are, because Stage 1 would otherwise run on a ledger with NOT EXECUTED rows.

## 2026-11-08T19:50Z — coordinator go for UAT's six rows: browser, :3000, :5432 (block 07:42Z)
steering-coordinator gave the go at 19:49Z for the MCP browser and next dev on 127.0.0.1:3000, and at ~19:50Z for :5432: a postgres:16 container `hooks-postgres-local`, loopback only, registered to chain 015 as the owner's standing local stack. Steering relayed both to uat-hooks-015. Source: steering's docket, written in the previous generation before its /clear; the coordinator's messages are not re-read here. uat-hooks-015 is walking B-1, B-2, B-9, B-10, B-14 and the B-11 dialog leg. On its browser release, steering tells the coordinator in that same turn.

## 2026-11-08T20:08Z — UAT's remaining rows: B-1, B-14, the Upload Message dialog (one selection prompt, three questions)
Source: uat-hooks-015's message ~20:05Z. B-2 is EXECUTED PASS (uat's claim; its document is not yet re-read). Put ~20:06Z, answered 20:08Z. Labels and descriptions are steering's.
- **B-1** (message list for a user who administers no server). Options: You: walk it locally / You: check after deploy / You: withdraw B-1. Answered in **his own words**: "I’ll give a new user that fulfills this role". B-1 waits for that account. It stays pre-release.
- **B-14** (first visit to a server's send page opens on its webhooks). Options: You: name a server / You: walk it yourself / You: check after deploy / You: withdraw B-14. Answered in **his own words**: "Use the test server if it’s possible. If not, create a new server and configure it how you need. Lodge this ruling in agents inbox". So UAT, as the test account, may create a Discord server and add the Hooks.gg bot and webhooks there. Lodged in ~/.claude/agents/INBOX.md.
- **Upload Message dialog** (B-9, B-10, the B-11 dialog leg). Options: Agent: UAT checks hooks.gg / You: check, type result / You: withdraw the three. Chosen **Agent: UAT checks hooks.gg**, by selection. Its description, verbatim: "Agent: UAT opens hooks.gg in the test browser as the test account, once steering-coordinator gives the browser go, and clicks New Message → Upload Message. It saves nothing. If the dialog opens live, the fault is local-only and the three checks still need a route. If it doesn't open, it's an existing live defect: a handoff is written and the three rows come back to you."
Premises: every fact above is uat-hooks-015's claim (message ~20:05Z): the test account's three servers, no bot in Claude or statbot-065-install-test, the Save As 400 on AAAA…, and the dialog fault at both trees. Steering read only that verification/015/uat/newmessage-dialog-open.js exists (ls). Recipients: uat-hooks-015 (executes) and steering-coordinator (browser go).

## 2026-11-08T20:12Z — hooks.gg Upload Message check re-put after a premise correction: sign in live (selection)
uat-hooks-015 (message ~20:10Z) said the 20:08Z option's "It saves nothing" was wrong for sign-in. Upload Message is on /message/f/0, which needs a session, and signing in writes the test account's Users, Accounts and Sessions rows to the production DB. That is uat's claim; steering did not read the code. Re-put per the Escalation Form. Labels and descriptions are steering's. Options: Agent: yes, sign in live / You: check, type result / You: withdraw the three / Agent: don't check live. Chosen **Agent: yes, sign in live**, by selection. Its description, verbatim: "Agent: UAT signs the test account in on hooks.gg and clicks New Message → Upload Message. The production database gets that account's sign-in rows, and no message rows. The rest is as you chose: if the dialog opens, the fault is local-only; if it doesn't, a handoff is written and the three checks come back to you."
Coordinator go for UAT acts (1) hooks.gg and (2) B-14 on :3000, ~20:10Z. Release comes after B-14. B-1 needs its own go.

## 2026-11-08T20:40Z — B-9, B-11 dialog leg, B-10 routes; localized testing needs no ask (one selection prompt, two questions)
Source: uat-hooks-015's results message (~20:36Z), uat's claims, not re-read by steering. B-14 EXECUTED PASS on the existing "Claude" server: bot added, owner solved the hCaptcha, one webhook created, nothing posted. Upload Message opens on live hooks.gg (7ce866b), so UAT-4 is a local `next dev` artefact and needs no handoff. Labels and descriptions are steering's.
- **B-9 and the B-11 dialog leg.** Options: Agent: local production build (Recommended) / You: check after deploy / You: walk them yourself / You: withdraw both. Answered in **his own words**: "1, and lodge in agents inbox that I don't need to be asked for localized testing, even if that involves setting up infra on this box. Just tell me after the fact, in addition to evaluating if such a task should be made into something more permanent for future efforts, and make sure to clean up after yourself." So route 1 applies: UAT runs next build and next start on 127.0.0.1:3000, after the coordinator's go. The rest is a standing ruling, lodged in ~/.claude/agents/INBOX.md. The coordinator's go on shared browser and port resources still applies (block 07:42Z), because the ruling removes asking *him*, not resource arbitration.
- **B-10.** Options: You: add test account / You: check after deploy / You: withdraw B-10. Chosen **You: add test account**, by selection. Its description, verbatim: "You: invite the test account as a plain member (no admin or Manage Server) to a server of yours that has the Hooks.gg bot, and type its name under Other. Agent: UAT walks B-10 on the same route you pick for B-9. UAT reads one message link there and saves nothing." He typed no server name, so B-10 waits for that name.
