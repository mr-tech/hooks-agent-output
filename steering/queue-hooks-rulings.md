# Rulings — steering-queue-hooks (hooks owner-waiting items, 2026-11-11)

Thread `steering-queue-hooks`, cwd `/usr/local/bin/hooks`, no alias. No chain ID: this thread works
through the items waiting on the owner in `OWNER-QUEUE.md`, `OPEN_QUESTIONS.md` and `TODO.md`'s held
013 list. The held items' text as it stood is `TODO.md` at agent-output `a22fb73`
(`git show a22fb73:TODO.md`, section "The held 013 planner queue"). Selections are in the hook's day
file `steering/selection-ledger/2026-11-11.md`; each block below cites its heading there.

## 2026-11-11T08:33Z — commission (his words)

> "Check if <your_name>-docket.md exists and read into your memory first if so, before anything else.
> Then report the queue and the held items, and wait for instruction."

> "process all items waiting on me. present as prompts"

No docket existed for this thread. Ten prompts were put in three calls.

## 2026-11-11T08:33Z — selections 1 to 4 (put 08:23:47Z, answered 08:26Z)

Ledger block: "2026-11-11T08:26Z — steering-queue-hooks". All four answered by selection except
prompt 2, which is his typed words.

**1. PM2 dump read on the generator host.** Options: *You: run it now* (he removes the read, the
agent re-checks and removes the queue item) / *You: do it later* (stays queued) / *You: leave the
read in place* (the agent removes the queue item and records that he reversed the 2026-11-08 choice;
claude-ro keeps read access). **Chosen: "You: leave the read in place"** (selection).
Premise and read: `ssh hooks-pig 'test -r /home/nodejs/.pm2/dump.pm2; echo $?'` as `claude-ro` → 0
at 2026-11-11T08:22:56Z (this thread). The 2026-11-08 choice itself was read from `OWNER-QUEUE.md`
at `a22fb73`, not from its original ruling.

**2. Competitor-research feature selection (S1 to S33, R0).** Options (multi-select): *Agent: trust
set R0, S30, S16* / *Agent: Tier A S1 S3 S4 S5 S29* / *Agent: S11 + S12 design only* / *Agent: plan
none, close it*. **Answered in his own words, typed:**

> "move this to the end of questions and after any other work in this project is completed. in other
> words, this new stuff is planned after the existing items are handled"

Standing effect: the selection is not put to him again until the other work in this project is
complete; new feature work is planned after the existing items. Carrier: `TODO.md`. Premises and
reads: the scored list and the 1-10 rerating, `research/competitive-feature-landscape-2026-11-08.md`
lines 491 to 614, read this turn; its `Status: Active` (`grep`, line 3).

**3. Discord 4000-character test.** Options: *Agent: send on test server (Recommended)* (a
researcher session sends one sized message in the agents' test server; 200 means descriptions do
not count, 400 with 50035 means they do and the limit check is too generous, which returns to him
as a separate fix question; assumption not ratified: that a webhook can be created there) / *You:
send it yourself* / *Agent: drop the question* (the website keeps assuming descriptions do not
count). **Chosen: "Agent: send on test server (Recommended)"** (selection). Premises and reads: the
question, `OPEN_QUESTIONS.md` at `a22fb73`; the test server being the agents' own, global
`CLAUDE.md` "Outbound messages" and `~/.claude/skills/discord-test-browser/SKILL.md` (read this
turn); the test bot credential file exists (`ls -d`, never opened). Read after the prompt was put:
the skill says the test bot holds Administrator there and a test may create a webhook, so the
unratified assumption has a mechanism on record; it is still unexercised.

**4. Four August record-tool questions.** Options: *Agent: delete 1-3, keep 4 (Recommended)* /
*Agent: delete all four* / *You: keep all four open*. **Chosen: "Agent: delete 1-3, keep 4
(Recommended)"** (selection). Premises and reads, all this turn: (1) `node tools/build-index.js
--tracked --check` → exit 0, bare `--check` → exit 1; (2) `node tools/check-repo.js` → exit 0, "14
external (sibling-repo) links noted but not verified", and `~/.claude/tools/record-engine.js` lines
217 to 218 (read from code); (3) `deployment/closed/fix-v1-guild-messages-auth-deployment.md` lines
38 and 158: remote read by `git ls-remote origin`, "Never marked NOT VERIFIED"; (4) not read at the
tool, said so in the prompt, kept open.

## 2026-11-11T08:33Z — selections 5 to 8 (put at the previous answer, answered 08:28Z)

Ledger block: "2026-11-11T08:28Z — steering-queue-hooks". All by selection. Each prompt offered:
*Agent: re-check, scope a fix* (re-read at today's website; if it still reproduces, a scoping
decision he can veto from the record; nothing reaches production without his release answer) /
*Agent: park it as a handoff* / *Agent: drop it* / *You: keep holding*; prompt 6 offered *Agent:
close it as degenerate* / *Agent: keep it as its own line* / *Agent: re-check, scope a fix* / *You:
keep holding*.

- **5. Save API accepts the 5712/5842 shape from any caller** (held item 1). **Chosen: "Agent:
  re-check, scope a fix (Recommended)"**. Premise marked unread in the prompt: the August claim.
- **6. Empty container residual** (held item 3). **Chosen: "Agent: close it as degenerate"**. The
  behaviour stays; the item leaves the held list by his ruling, not by silence.
- **7. Save check and send check disagree on near-empty embeds** (held item 4). **Chosen: "Agent:
  re-check, scope a fix (Recommended)"**. Premise read: both predicates exist at website `6d78b19`
  (`git grep -c`).
- **8. New Message dialog and guild id '0'** (held item 5). **Chosen: "Agent: re-check, scope a fix
  (Recommended)"**; the option text added "If it cannot, I delete the item and record the read."
  Premise read: `NewMessageModal.tsx` lines 63, 74, 157 at `6d78b19` (read from code, not run).

## 2026-11-11T08:33Z — selections 9 and 10 (put at the previous answer, answered 08:29Z)

Ledger block: "2026-11-11T08:29Z — steering-queue-hooks". Both by selection.

- **9. Plan 013 assumption 7's unreadable check** (held item 6). Options: *Agent: fold into that
  handoff (Recommended)* / *Agent: scope the classifier* / *Agent: drop it* / *You: keep holding*.
  **Chosen: "Agent: fold into that handoff (Recommended)"**. Carrier:
  `handoff/backfill-valid-guard-has-no-db-backed-instrument-2026-08-26.md`, Item 3.
- **10. Four held corrections to plan 013's text** (D23, D24, D25: R4, R2, R8/R-5, the red-domain
  prediction). Options: *Agent: drop all four (Recommended)* (the hold ends with the plan closed and
  its text uncorrected, the code reviews named as the accurate statement; the closed plan is not
  edited) / *Agent: spawn a planner to correct* / *You: keep holding*. **Chosen: "Agent: drop all
  four (Recommended)"**. Premises and reads: rows D23 to D25, `planning/closed/013-components-v2-editing-surfaces.md`
  lines 124 to 126 (first 1800 characters of each); the plan's `Status: Released`; the deployment
  record's non-flag half, `deployment/closed/013-components-v2-editing-surfaces-deployment.md` lines
  250 and 1047. The accurate statements stay where D23 and D25 name them: the code reviews at
  `ba0f6e3` and `ecbbe43`.

## 2026-11-11T08:33Z — re-checks at website `6d78b19` and the scoping determinations

Three helper subagents (Sonnet), each briefed with the question and told to read `master` through
git, read from code and ran nothing.

**Held item 1, save API: no pipeline. Closed by his standing ruling.** The helper's verdict is STILL
ACCEPTS: `message.upsert` validates with `optionalIdMessageShape`, nothing relates `flags` to
`content` or `embeds`, and the write stores the payload and sets `valid`. That is the ruled design:
`architecture/website.md` W-2 (recorded as D-005), his words of 2026-08-24, "A message is allowed to
be saved in a bad state", "the back-end reflects what the front-end allows". A server-side gate is
what that ruling excludes. **This thread's error:** prompt 5 offered a fix without reading the
architecture record first; the premise it lacked is W-2. The determination stays inside the option
he chose (a scoping decision he can veto).

**Held item 5, guild id '0': deleted on the read, as the chosen option said.** Verdict NO LONGER
REPRODUCES: `NewMessageModal` is rendered at `src/app/message/page.tsx` (no `guildId`) and
`f/[id]/page.tsx` (from `useParsePathname`, which maps `'0'` to `''`); the dialog sends
`selectedGuildId || null`. Residue, not a defect today: `useState(guildId ?? '0')` is dead code,
`disableSave` still does not check the guild, and the helper did not trace whether a webhook's or a
loaded message's guild id can be `'0'`.

**Held item 4, save check versus send check: the `fixer` agent.**
- Shape: defect. `hasClassicContent` (`src/utils/index.ts`) ignores embeds whose every key is empty;
  `validateContentRequirements` (`src/utils/limits.tsx`) counts any embed. They differ on `{}`,
  `{title:''}`, `{_key}` only, `{fields:[]}`. Cause proven at the predicates; reachability through
  the UI not proven: the helper found the editor's Save (`useApiMethods.ts`) persists such a draft
  unchanged with no choice shown, and found no UI route that builds the draft, without reading how
  stored messages load.
- Blast radius: the save gate (`gateBeforePersist`, `resolveContentLoss`) and its three callers
  (editor Save, New Message dialog, Save-as menu). Specification uncertainty: which way the two
  agree. W-1 bounds it: no serialiser deletes user content on its own.
- Pipeline: `fixer`, then code review; QA Phase 2 only if the fix adds 20 or more production lines.
  No plan, critic or UAT.
- Scope: one defect, repository `website` only. In: `src/utils/index.ts`, `src/utils/limits.tsx`,
  their tests, and the three callers only where the gate's wiring requires. Out: `src/server/**`
  (W-2), `project-utils`, `preview-image-generator`, the V2-emptiness class
  (`handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md`), the unreachable
  choice UI (`handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md`).
- End step: production. `release-move.js /usr/local/bin/hooks/website master 6d78b19… --dry-run` →
  exit 0, "ff-from-remote ok; sibling serving refs (none)", "workflows none"; `vercel.json` is
  present and the 2026-10-10 and 2026-11-10 releases went live from a push of `master` (devops's
  statements in the ledger, not re-read). The push is a devops session's ask to him.
- Released chains that touched this route: 013 (the gate, M8-G), 014 (its tests). Open carriers: the
  two handoffs above.
- Branch: `fix/website-save-gate-embeds`, created by this thread at `6d78b19` over a clean tree.

**Researcher for the Discord test** (prompt 3): started on his selection. Why a researcher: the
question sits upstream of any effort (whether a limit check is wrong at all).

## 2026-11-11T08:35Z — acts performed on the selections

- Record: `OWNER-QUEUE.md`, `OPEN_QUESTIONS.md`, `TODO.md`, the backfill handoff (Item 3), this file
  and two briefs committed at `1f89106`; the final 2026-11-10 ledger day file at `54c16ba`; `INDEX.md`
  rebuilt (`--tracked`, diff read) at `b157975`. `master` pushed to `origin` (`a22fb73..b157975`; the
  record repository has no `.github` directory, `ls -d`), remote read back by `git ls-remote` as
  `b157975`.
- Website tree: `git switch -c fix/website-save-gate-embeds` at
  `6d78b19269408447f2b089ba64c90db05518b6ce`, 08:35Z. `git status --porcelain` was empty before and
  after (`cmp` of the two captures). Before: `master`. After: `fix/website-save-gate-embeds`, same
  commit. Nothing pushed.
- Sessions started with `tmux-agent spawn`: `researcher-hooks-text-limit` (category
  `hooks-text-limit`, cwd `/usr/local/bin/hooks`, effort high as the tool printed it), live and busy
  in `ListAgents` at 08:35Z; `fixer-fix-website-save-gate-embeds` (category
  `fix-website-save-gate-embeds`, cwd `/usr/local/bin/hooks/website`, effort medium as printed),
  stopped at Claude Code's folder-trust prompt for that directory (pane read 08:35Z). The prompt is
  the owner's to answer; this thread typed nothing into the pane.
- Standing check armed as a one-shot (id `961e52ef`, 09:07Z). Out-of-memory count at arming: 43
  (`grep -c 'invoked oom-killer' /var/log/kern.log`).

## 2026-11-11T08:46Z — fixer handoff received; its three routed items

The fixer's document `implementation/fix-website-save-gate-embeds-implementation.md` (record
`522af59`) reads `Status: Active`, `Handoff-At: 460000b — repos=website`. Website diff
`6d78b19..460000b` by `--numstat`: `src/utils/index.ts` 1/1, two test files 82/0 and 19/1. Its spawn
cue arrived by message (no reviewer session live); the reviewer is started on it.

1. **Its out-of-scope observation is answered by an existing ruling and is not re-asked.** A stored
   draft with the V2 flag set, classic content and no V2 components saves unchanged and the send
   check refuses it (its Diagnosis, last paragraph; read from code, not run). That is the
   flag-over-body shape of plan 013 **D19**, his words of 2026-08-24: "We'll fix the two outliers and
   the question becomes moot because that shape will be disallowed. Whatever default consequence
   there then is does not need to be decided or reasoned around." D43 records his repair of both
   rows. No re-scoping, no rider, no handoff; this block is the item's destination.
2. **Live-state check.** The fix repairs no stored row; whether any stored message holds V2
   components beside an empty embed is his to read against the live database. Carried to the release
   step, where the read-only query is written out for him.
3. **Lint deviation** (34 findings already present at `6d78b19`, left unfixed): the reviewer's to rule.

Raised by this thread from the document's User-visible flows: pasted JSON holding V2 components
plus an empty embed now shows the mixed-draft choice on the two JSON load paths, where before the
empty embed was dropped silently. The fixer's brief said a change in what a user sees beyond the
existing choice is a design decision; the fixer read this as the existing choice. Put to the
reviewer as a candidate, and to him for his own check before release.
