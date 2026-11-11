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

## 2026-11-11T08:48Z — selection 11: the 1024-character description limit (put 08:47:12Z, answered 08:47Z)

Ledger: `steering/selection-ledger/2026-11-11.md`, this thread's block after "08:29Z".
The research document `research/components-v2-description-text-limit-2026-11-11.md` (`de54612`,
`Status: Active`, read this turn: Answer, Findings, Open Questions) answers the briefed question
**No**: descriptions do not count toward the 4000 total, so no fix arises there. Its F-6, outside
the brief and measured on the researcher's own decision: Discord refuses a description over 1024
characters; the website bounds neither field (the researcher's code read at `6d78b19`, not run; its
inference I-1 that a user can compose and fail to send one is untested).

Options: *Agent: scope a fix (Recommended)* (a scoping decision for a small website fix that makes
the editor's check catch descriptions over 1024; starts after the save-check fix now in review,
because the website tree holds one branch at a time; its own small chain with its own review;
nothing reaches production without his release answer) / *Agent: record it as a handoff* (sends
with a longer description keep failing at Discord) / *Agent: drop it*.
**Chosen: "Agent: scope a fix (Recommended)"** (selection).

**Scoping determination: the `fixer` agent, queued.**
- Shape: defect, a missing bound. Discord's half is measured (F-6, requests 25 to 36); the website's
  half is a code read. The fixer's red test is the document's own disconfirming test for I-1.
- Blast radius: `validateMessage` (`src/utils/limits.tsx`), the limit constants, the two description
  inputs (`ThumbnailEditor.tsx`, `MediaGalleryEditor.tsx`), their tests. Specification uncertainty:
  none beyond mirroring how sibling per-field limits are enforced and shown. W-2 holds: the save is
  not refused for a bad state.
- Pipeline: `fixer`, then code review; QA Phase 2 only at 20 or more added production lines.
- Scope: one defect, `website` only. Out: the document's N-1 to N-4, the wider V2-validity class,
  `src/server/**` beyond what the siblings do, the other repositories.
- End step: production. `release-move.js … master 6d78b19… --dry-run` re-run 08:48Z: exit 0,
  "workflows none".
- Starts when the website tree is free of `fix/website-save-gate-embeds`. Carrier until then:
  `TODO.md`, "Website fix: bound V2 description fields at 1024 characters".
- Released chains on this route: 007, 012, 013. Open carrier whose trigger this fires:
  `handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md` (work on the send
  check), re-read this turn.

**Conflict between records, named.** That handoff, `OPEN_QUESTIONS.md` as it stood at `a22fb73`,
and (by the handoff's citation, not read here) plan 012 D14 say no agent may determine Discord's
acceptance rules by a live send, "a standing prohibition with no approval path". The global
`CLAUDE.md` ("Outbound messages") now gives agents the Discord test server, and prompt 3 put the
change to him in those terms before he chose the agent send. The handoff carries a dated note of
this; its August text is left in place.

## 2026-11-11T08:50Z — selection 12: measure the V2-validity class (put 08:48:53Z, answered 08:50Z)

Ledger: `steering/selection-ledger/2026-11-11.md`, this thread's latest block. The prompt quoted his
2026-08-26 words from `handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md`
(read this turn) and said the live-send block is gone inside the test server.

Options: *Agent: measure it now (Recommended)* (the researcher session measures which V2
configurations Discord refuses, emptiness first, by sends in the agents' test server only; the 1024
fix proceeds separately; any fix to the send check from the results returns to him as its own
question) / *Agent: measure first, one fix after* (the 1024 fix waits; that gap stays open
meanwhile) / *You: leave the handoff as is*.
**Chosen: "Agent: measure it now (Recommended)"** (selection).

Started as a second question to the live researcher session, brief
`steering/queue-hooks-briefs/researcher-v2-validity-brief.md`, sent when that session is idle after
closing its first document. Why a researcher: the class is unknown, so there is nothing to plan yet.

## 2026-11-11T09:04Z — code review round 1 REJECTED; CR-1 decided (selection 13, put 09:02:23Z, answered 09:04Z)

Ledger: `steering/selection-ledger/2026-11-11.md`, this thread's latest block. Read this turn:
`code-review/fix-website-save-gate-embeds-code-review.md` (record `d1af1b3`, `Verdict: REJECTED`,
`Reviewed-At: 460000b — repos=website`), finding CR-1 whole; plan 013 D17 in his words.

**The JSON surfaces: decided by this thread on D17, not asked.** His ruling of 2026-08-24: "fail
gracefully when no content will be lost. If content must be lost to fulfill the request, block,
notify, and present the user with a choice." An embed with nothing in it carries no content, so
pasted JSON holding V2 components beside only-empty embeds lands as V2 with no choice, as at
`6d78b19`. The reviewer's option (a) is excluded; plan 013 M8's reading (1) stands uncorrected.

**Save: his selection.** Options: *Agent: drop the empty embed (Recommended)* / *Agent: ask at Save
only* (the 'Save as Classic' choice would drop the components to keep an empty embed; whether
Discord accepts that is unmeasured) / *Agent: withdraw the fix* (such a message keeps saving
unsendable, which his bad-state ruling allows). **Chosen: "Agent: drop the empty embed
(Recommended)"**, put to him as: "Save stores it as V2 without the empty embed and shows no prompt,
following your 'no content lost, fail gracefully' rule. Only embeds with nothing in them are
removed. The reviewer does not recommend the broad form of this (a quiet repair at Save that would
also touch the outlier-shaped rows), so this is limited to empty embeds; whether it can be built
that narrowly is untested, and if not it comes back to you. Cost: one more fixer round and a
re-review."

**Revised bounded scope statement** (replaces the first; this thread's wording around his choice):
a draft holding V2 components beside embeds that are all empty is saved as V2 without those embeds,
with no prompt. The two JSON surfaces behave as at `6d78b19`.
- Limits: only embeds that are empty by `hasClassicContent`'s own test are removed, and only where
  V2 components are present. A row-D save (flag, content, no V2 components) is not touched and the
  flag is not changed by this fix (plan 013 D19, D15). Nothing with content is removed (W-1).
- If it cannot be built inside those limits, the fixer blocks and it returns to him.
- The reviewer's Minimum stands in its second form: a test on each JSON surface for a V2 container
  beside `{}` stating "lands V2 with no choice", by extending the two existing
  `conflict-resting-state` tests.
- Mechanism is the fixer's. The re-review is a sub-entry of Round 1, as the reviewer set it.

**This thread's error, kept:** prompt 7 and the first scope statement framed the defect as "no choice
shown", which pointed the fixer at showing one. D17's principle was on record and unread by this
thread when it wrote them.

## 2026-11-11T09:09Z — selection 14: one send-check fix, 1024 included (put 09:08:56Z, answered 09:09Z)

Reconcile, 09:17Z: this heading read "09:10Z" twice when written; `date -u` at the write was
09:09:53Z. This thread's rounding error; the ledger block is the authority for the answer time.

Ledger: `steering/selection-ledger/2026-11-11.md`, this thread's latest block. Read this turn:
`research/closed/components-v2-send-validity-2026-11-11.md` (`c9f8e3a`, `Status: Answered`), its
Answer section; the counts below are that document's (76 shapes sent, 52 refused by Discord; the
website's `validateMessage`, executed over the same shapes at `6d78b19`, blocks 6 of the 52 and
passes 46). The generic failure message is its code read (F-14).

Options: *Agent: scope one fix, 1024 included (Recommended)* / *Agent: scope it, 1024 separate* (two
changes to the same send check, two reviews, two releases) / *Agent: leave the code as is* /
*Agent: close the handoff*. **Chosen: "Agent: scope one fix, 1024 included (Recommended)"**, put
to him as: "I record one scoping decision for making the send check refuse what Discord refuses,
folding in the 1024-character description limit you already chose, so the send check changes once.
It is likely bigger than a small fixer chain (a plan, review, QA and your own check); the scoping
says which, and whether the File component gap is in or out, and you can veto it from the record.
It starts when the website tree is free."

Effect: selection 11's separate queued fixer is superseded; its measurement and scope fold into
this one. **The scoping determination is owed and not yet written** (carrier: `TODO.md`, "Website
send-check validity fix"). It must state the pipeline, the families in scope from the research
document, and the File component gap (its F-7) as in or out, before any stage starts.

The researcher session's two documents are terminal; the session is stopped.

## 2026-11-11T09:17Z — scoping determination: the send-check validity fix (owed by selection 14)

Written after this thread's `/clear`, from the docket and the reads named here, all this turn. His
word opening the chain is selection 14's chosen option, in the block above. He vetoes from this
record. No stage has started.

**Shape.** A defect class, not one defect: the send check (`validateMessage`,
`src/utils/limits.tsx`) looks inside no V2 component. Cause proven by execution: the research
document's F-1 (`research/closed/components-v2-send-validity-2026-11-11.md`, lines 35 to 268 read):
of 76 shapes sent in the test server Discord refused 52, and the check, run over the same 76,
blocks 6 of those 52 and passes 46. The 1024 bound is the earlier document's F-6
(`research/closed/components-v2-description-text-limit-2026-11-11.md`, `Status: Answered`; its
body not re-read this turn).

**Blast radius.** `validateMessage` has three production callers at website `6d78b19`
(`git grep -n` over `src`, tests excluded): the send page (`src/app/message/m/[id]/send/page.tsx`),
`isMessageValid` (`src/server/api/utils/messageValidity.ts`, which writes the stored `valid` column
on save) and `src/scripts/backfillValid.ts`. So the fix changes three things at once: what the send
page refuses, what `valid` a save records, and what the public v1 API then serves
(`architecture/website.md` A-4, lines 239 to 245 read). A-4's consequence binds the plan: it states
the residue for rows already stored. No copy of the check in `project-utils` (`git grep -l`, exit
1). `preview-image-generator` not read: the secret-file gate refused a repository-wide grep there
and it was not retried.

**Specification uncertainty: real, which is why this is not a fixer.**
- Whitespace: Discord's strip and JavaScript's `trim()` differ on U+0085 and U+FEFF (F-2).
- A component fresh from the add menu is refused, a Separator excepted (F-12): once the check
  agrees with Discord, a draft with a just-added, unfilled component cannot be sent, and what the
  send page tells the user for each family is a design decision.
- The File component (below).
- Whether stored rows are re-derived after the predicate changes (A-4). No agent reads that
  database.

**Pipeline: full chain.** Planner, critic, architect conformance, QA Phase 1, implementer with a
deweeder, code review, QA Phase 2, UAT, devops, retrospective. Reasons: a class of families with
open specification points; a user-visible surface (the send page's refusals); a stored column and
a public API value that move with the predicate. Security: not started; the chain ships nothing
root executes. Analyst: only if the plan commissions one.

**Bounded scope statement.** One change: the website's send check refuses the V2 shapes Discord
was measured refusing, and says which. Repository `website` only.
- In, each by the research document's finding: Text Display content empty or whitespace-only,
  anywhere in the tree (F-2); the four empty collections, Section, Media Gallery, Container, Action
  Row (F-3); required URLs that are empty, and the measured non-URL and link-button scheme cases
  (F-4, measured cases only); a link button with neither label nor emoji (F-5); a description that
  is the empty string (F-6) or over 1024 characters (the earlier document's F-6); the key-absent
  forms measured refused (B6, C4, D6, G3), where the plan finds them reachable.
- **File component (F-7): in as a refusal, out as a capability.** In: the check refuses a message
  holding a File component in the three measured forms, with its own reason, since no V2 send from
  the website carries an attachment. Out: making a File sendable (an upload path) and removing File
  from the add menu; both are new product work and sit behind his ruling of prompt 2 (new work
  after the existing items). The unmeasured case, a File on an edit of a message that already has
  attachments (N-5), is the planner's open question to him, not assumed either way.
- In, as wiring only: the limit constants, the save schema and the editor inputs for the same
  fields, exactly as far as sibling per-field limits already go (A-4: the editor and the save
  schema read the same constant).
- Out: any server-side refusal of a save (W-2, lines 46 to 54 read); any repair or count of stored
  rows by an agent; the add menu's default factories; the generic failure toast in `sendWebhook`
  (F-14), which goes to the plan's Exclusions register and reaches him with revision 1; refusals
  not measured (N-3, N-8); classic messages and the save gate (chain
  `fix-website-save-gate-embeds`); `project-utils`, `preview-image-generator`.

**Limbs of the recommendation this derives from, marked.** The research document's Recommendations:
1 (put OQ-1 to him) done, selection 14; 2 (a count of affected stored messages before deciding) out,
his selection did not ask for it and N-1 names him as the reader; 3 (N-2, whether a user can type a
whitespace-only Text Display, needs a browser) in, as a Phase 1 or UAT flow for the planner to place.

**End step.** Production: a push of website `master`, which goes live through Vercel (devops's
statement in earlier records, not re-read). `release-move.js /usr/local/bin/hooks/website master
6d78b19… --dry-run`, 09:16Z: exit 0, "ff-from-remote ok", "workflows none"; remote `master` is
`6d78b19` (`git ls-remote`). The verdict is re-taken once chain `fix-website-save-gate-embeds` has
released, since that moves the base. The push is a devops session's own ask to him.

**Released chains on this route** (closed plans naming `validateMessage`, `grep -l`): 001, 007, 012,
013, 014, 015. Open handoffs naming the send check or gate (`grep -l` over `handoff/*.md`):
`components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md` (read whole this turn; this
chain is the fix it waits on, and it closes at release) and
`newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md` (not read this turn; the planner
dispositions it). Adjacent by subject, not by that grep and not read this turn:
`backfill-valid-guard-has-no-db-backed-instrument-2026-08-26.md`.

**Start.** When the website tree is free of `fix/website-save-gate-embeds`, as the selection's text
told him. The planner mints the ID then; this thread supplies none.

**Not checked.** The send page's own code beyond the caller line; how sibling per-field limits are
shown in the editor today; whether the website edits sent messages at all (F-10, N-5); the two
handoffs marked unread; the research document's Evidence table (lines 270 to 390).

## 2026-11-11T09:23Z — selection 15: the choice save joins the fix (put 09:23:10Z, answered 09:23Z)

Ledger: `steering/selection-ledger/2026-11-11.md`, block "2026-11-11T09:23Z — steering-queue-hooks".
Code review Round 1 sub-entry: `Verdict: REJECTED`, `Reviewed-At: 4b9fadd — repos=website`
(`code-review/fix-website-save-gate-embeds-code-review.md`, record `65e719a`, lines 205 to 400 read)
on CR-4: Save persists `gate.data` and never writes it back to the editor. The reviewer's fence
question: whether CR-4's pre-existing member `commitSaveChoice` (chain 013, shipped) joins this fix.

**Decided by this thread, not asked:** CR-4 at `saveMessage`, CR-5 and CR-6 are inside the scope
statement (selection 13's "no prompt"; the caller clause). Sent to the fixer at 09:23Z with a hold
on `commitSaveChoice` until his answer.

**Put to him as a rider.** Options: *Agent: fix both paths now (Recommended)* ("The fixer gives
Save and the choice dialog one shared save step that also updates the editor to what was stored.
This changes shipped behaviour: after a choice, the content you chose to drop leaves the editor
too, not only the saved message (by the reviewer's proposed mechanism, not built yet). Cost: it
rides the fixer round already owed for the rejection, with a slightly wider re-review; QA covers
both. Not established: whether this explains the reload prompt you reported on 2026-08-25, which
was a save with nothing changed.") / *Agent: fix the new path only* (the choice dialog keeps
prompting its saver to reload; the finding goes on the open handoff; fixing it later is its own
small chain with its own review and release).
**Chosen: "Agent: fix both paths now (Recommended)"** (selection).

Premises and reads, this turn: both writers at website `4b9fadd`, `useApiMethods.ts` lines 63 to
89 (`git show`, read from code, not run): neither calls `setMessage`; `commitSaveChoice` is present
at `6d78b19` (`grep -n`, lines 79 to 85). The reload prompt on both trees for the choice save is
the reviewer's model, `verification/fix-website-save-gate-embeds/code-review-round1-subentry/save-echo-hash.txt`
(read; not run by this thread, and not an observation of a running instance). No ruling answered
it: plan 013 names `commitSaveChoice` zero times (`grep -c`); plan 015's X-10 row leaves the handoff
untouched. `handoff/save-originating-tab-raises-its-own-update-prompt-2026-08-25.md` read whole: its
trigger (work on the save path) fired; his 2026-08-25 report was limb (d), a save with nothing
changed, which this rider is not shown to explain.

**Scope statement, extended by his selection** (this thread's wording around it): the editor's two
persisting writers, `saveMessage` and `commitSaveChoice`, share one save step that stores the
resolved data and sets the editor's message to it. Everything else in the 09:04Z statement stands.
QA Phase 2 covers both paths; the reviewer's Assumption Not Checked (whether Pusher delivers the
event to the saving client) is QA's, by a browser save.

## 2026-11-11T09:27Z — fixer BLOCKED on the editor's mode after a Classic choice: answered from selection 15, not asked

The fixer's question (by message, 09:26Z; checkpoint website `abdb71b`, not handed off): after
"Save as Classic" on the choice dialog, does the editor's mode switch to Classic in the same step
that writes the stored data back? Its options: (1) set the mode from the stored data in the shared
step, (2) write the data back and leave the mode, (3) stop and leave `commitSaveChoice` as it was.

**Decided by this thread: option 1.** His chosen option's words in selection 15 are "one shared
save step that also updates the editor to what was stored". An editor left in V2 mode over
classic-only data is not updated to what was stored, so (2) does not meet his words and (3)
reverses his selection. Which setter carries it is a mechanism choice inside the agreed scope (the
standing default in `references/escalation.md`): the fixer's, recorded as agent-authored. He is
told in this turn's report and can veto from this record.

Reads, this turn, at `abdb71b` (`git grep -n`, read from code, not run): `detectMessageMode`
(`src/utils/messageMode.ts`) is what the provider's load path uses to set the mode
(`MessageProvider/index.tsx` lines 122 to 123), and `JsonModalBody.tsx` line 89 sets the mode on a
Load commit. The mismatch itself (V2 editing shown over classic data until a reload) is the
fixer's code read, not this thread's. Scope: the setter passed into `useApiMethods` and its call
site in `MessageProvider` are wiring the shared step requires.

## 2026-11-11T09:42Z — code review APPROVED_WITH_COMMENTS at `963a25c`; QA Phase 2 started

Read this turn: `code-review/fix-website-save-gate-embeds-code-review.md` (record `5849cb7`),
`Verdict: APPROVED_WITH_COMMENTS`, `Reviewed-At: 963a25c — repos=website`, lines 51 to 137. Its
spawn cue arrived by message (no QA session live for this chain). QA Phase 2 is owed: 44 added
production lines against `6d78b19` (`git diff --numstat 6d78b19 HEAD -- src`, tests excluded:
1 + 1 + 8 + 15 + 19, read 09:36Z at `963a25c`).

Started `qa-fix-website-save-gate-embeds` with `tmux-agent spawn`, category
`fix-website-save-gate-embeds`, cwd `/usr/local/bin/hooks/website`, brief
`steering/queue-hooks-briefs/qa-save-gate-embeds-brief.md`. The reviewer's two INFO items and both
Assumptions Not Checked name QA Phase 2 in the review document; no finding is left without a path.

## 2026-11-11T10:08Z — QA Phase 2 PASS at `0e3d903`; devops started

Reconcile, 10:09Z: this heading and the devops brief were written with times of 10:09Z and 10:10Z
that this thread estimated; `date -u` at the write read 10:08:43Z. Both corrected to 10:08Z. The
same error as selection 14's heading: a time typed, not read.

Read this turn: `qa/fix-website-save-gate-embeds-qa.md` whole at record `86aff70`, header re-read at
`6ed8112`: `Status: QA Complete`, `Verified-At` `0e3d903` (the reviewed `963a25c` plus one
test-only commit of QA's, `git diff --numstat 963a25c 0e3d903`: one test file, 6/0). Its spawn cue
arrived by message at 10:07Z; no devops session was live (`ListAgents`).

Started `devops-fix-website-save-gate-embeds` with `tmux-agent spawn`, category
`fix-website-save-gate-embeds`, cwd `/usr/local/bin/hooks/website`, brief
`steering/queue-hooks-briefs/devops-save-gate-embeds-brief.md`. The brief conditions its release ask
on the code reviewer's scoped check of `963a25c..0e3d903` (running at 10:08Z; the review anchor
still read `963a25c`). The production push is that session's own ask to him.

QA's non-gating items: QAF-1 resolved in its pass; QAF-2 INFO, no action owed, in its document;
its inbox entry on local walks and Pusher is this thread's to process (next block).

## 2026-11-11T10:13Z — selection 16: local website builds and Pusher (put 10:09Z, answered 10:10Z)

Ledger: `steering/selection-ledger/2026-11-11.md`, block "2026-11-11T10:10Z — steering-queue-hooks".
Source: an inbox entry of `qa-fix-website-save-gate-embeds` (FYI, uncommitted when processed; its
substance is in `qa/fix-website-save-gate-embeds-qa.md`, "Browser walk", Environment).

Options: *Agent: add the id-offset rule (Recommended)* ("I add a short rule to the hooks workspace
CLAUDE.md, which every session here loads: before any save on a local build, restart the message id
numbering far above production's range, as QA did today. Nothing for you to do. Limit: it protects
only as far as each test follows the rule, and it does not tell us whether the Pusher app is
production's.") / *You: give local builds their own Pusher app* (he creates a separate app and puts
its keys in `website/.env.local`; the offset rule applies until then) / *Agent: leave it as
recorded* (the hazard stays only in today's QA document).
**Chosen: "Agent: add the id-offset rule (Recommended)"** (selection).

Premises and reads, this turn: the save event's trigger, website `963a25c` `src/server/api/utils/shared.ts`
line 290, and the channel key, `src/utils/index.ts` lines 493 to 494 (`git grep -n`, read from code,
not run); ids are `BigInt @id @default(autoincrement())` in `project-utils/prisma/schema.prisma`
(model `Message`, line 98 onward; `git grep -n`); chain 015's local test data was "messages 1–6" and
its UAT document names no sequence restart (`uat/closed/015-bug-evaluation-fixes-uat.md` line 138;
`grep -c` for `RESTART|Messages_id_seq`: 0). Unread, and marked so in the prompt: whether
`.env.local`'s Pusher app is production's, and that its keys are non-empty (QA's claim). The
sequence name `Messages_id_seq` and today's id range are QA's, from its document, not run here.

Done: the rule is in `CLAUDE.md`, section "Local builds of `website` — before the first save". The
inbox entry is deleted. Not established by anyone: whether a production user saw a prompt from
chain 015's walks.

## 2026-11-11T10:17Z — chain `fix-website-save-gate-embeds` released; close-out

Read this turn, at the mechanism: `git ls-remote origin master` on website =
`0e3d903ce98e108c7ca848b992ad89ac538f4b44`; the tree on `master` at that commit, `git status
--porcelain` empty; no `fix/*` branch locally or on origin. `deployment/closed/fix-website-save-gate-embeds-deployment.md`
read whole (record `3af5f62`): `Status: Released`; his release answer was given in the devops
session's own prompt ("Agent: push master to 0e3d903 (Recommended)"), not through this thread.

- Stage documents, all in `closed/`: implementation Released, code review Committed, QA Phase 2
  Committed, release-tip QA Released, deployment Released.
- Handoffs: created by the chain, `handoff/save-gate-embeds-owner-checks-on-hooks-gg-2026-11-11.md`
  (Open, his own checks; now `OWNER-QUEUE.md` items 1 and 2). Triggers fired and read during it:
  `save-originating-tab-raises-its-own-update-prompt-2026-08-25.md` (note added, stays Open),
  `website-tests-not-beside-their-module-2026-11-08.md` (row added, stays Open),
  `newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md` (devops's reconcile note, by its
  deployment record; header read by this thread, the note not).
- Forward items beyond the register: swept by devops's Phase 2D (its section "Forward items beyond
  the register"); no architecture or roadmap obligation lodged, by its "Architecture lines" read.
- Sessions stopped with `tmux-agent stop`: fixer, code reviewer, QA, devops (the researcher was
  stopped at 09:10Z). On the box: no containers (`docker ps -a` empty); the `postgres:16` image is
  6 days old and not this chain's. Scratch: the four stopped sessions' directories under
  `/tmp/claude-1000/-usr-local-bin-hooks-website/` deleted (`du -s` 1232K before; `ls -d` fails for
  all four after); no open handoff or docket cited a `/tmp/claude-` path (`grep -l`, exit 1).
- The retrospective is started next, as this thread's subagent. The send-check validity chain may
  start: the website tree is free.

## 2026-11-11T10:19Z — send-check validity chain started: planner spawned

The start condition of the 09:17Z determination is met: the website tree is on `master` at
`0e3d903`, clean, the earlier chain released (close-out block above). `release-move.js
/usr/local/bin/hooks/website master 0e3d903… --dry-run`, 10:18Z: exit 0, "ff-from-remote ok;
sibling serving refs (none)", "workflows none". He has not vetoed the determination.

Started `planner-hooks-new` with `tmux-agent spawn`, category `S016-sendcheck` (anticipating
`.next-id`, which read 16; the planner mints), cwd `/usr/local/bin/hooks/website`, brief
`steering/queue-hooks-briefs/planner-send-check-validity-brief.md`. The `TODO.md` carrier is
deleted in this commit: it carried the start step, which is now done; the determination stays in
the 09:17Z block. The retrospective for `fix-website-save-gate-embeds` was started at 10:18Z as
this thread's subagent.

## 2026-11-11T10:26Z — retrospective for `fix-website-save-gate-embeds` written; its routed item

Read this turn, after this thread's `/clear`: `retrospectives/fix-website-save-gate-embeds-retrospective.md`
is in `HEAD` at record `c787c2d` (`git cat-file -e`, `git diff --quiet HEAD`), `Status: Active`
(line 5). Its header, its owner-needing line (164: "nothing new") and the lines naming the
architect were read; the body was not read whole. `INDEX.md` rebuilt with `--tracked`, diff read
(5/1: this document and the planner brief).

- Its one routed item, a candidate `architecture/website.md` entry for the editor's single
  persisting step, named a stage and no path. Carrier: `TODO.md`, "Candidate
  `architecture/website.md` entry: the editor's one persisting step".
- Its eight recommendations reach their files through pi, which runs on his word alone.
- Nothing of this chain is left in flight for this thread. His two checks stay on
  `handoff/save-gate-embeds-owner-checks-on-hooks-gg-2026-11-11.md` and in `OWNER-QUEUE.md`.

## 2026-11-11T10:30Z — selections 17 to 20: plan 016's four open questions (put 10:28Z, answered 10:30Z)

Ledger: `steering/selection-ledger/2026-11-11.md`, block "2026-11-11T10:30Z — steering-queue-hooks".
All four by selection; the option text around each label is this thread's. Source: plan 016
revision 0 (`planning/016-send-check-validity.md`, record `0ae079d`, `Status: Active`), OQ-0 to
OQ-3, lines 1 to 180 and 232 to 354 read this turn; relayed by the planner's message. No gate has
read the plan, so no option cost a review round.

**17. The plan's goal (OQ-0).** Options: *Agent: plan this goal (Recommended)* ("the planner builds
revision 1 on the goal as written: the 52 shapes Discord was measured refusing in the test server,
plus the 1024-character description limit, as your 09:09Z choice said") / *Agent: narrow to
emptiness* (bad URLs, unlabeled link buttons, File components and over-long descriptions keep
failing with the generic toast; reverses the 09:09Z choice) / *Agent: stop the chain* (plan closed
unbuilt, the August handoff stays open). **Chosen: "Agent: plan this goal (Recommended)"**. The goal
he was shown is the plan's value statement, quoted whole in the question.

**18. Whitespace in a Text Display (OQ-1).** Options: *Agent: trim() plus 2 exceptions
(Recommended)* ("the new check uses trim() and treats those two characters as Discord does, so it
agrees with Discord on all 11 measured. This departs from the classic check in this one feature,
against your mirror-the-siblings rule, which is why it is asked; the classic check is not changed")
/ *Agent: mirror trim() exactly* (U+FEFF alone cannot be sent though Discord accepts it; U+0085
alone passes and fails at Discord; both known limits). **Chosen: "Agent: trim() plus 2 exceptions
(Recommended)"**. Premises and reads, this turn: the research document's F-2, lines 161 to 173
(9 of 11, the two characters, Node 24); the classic check's `trim()`, website `0e3d903`
`src/utils/limits.tsx` line 141 and `src/utils/index.ts` line 38 (`git grep -n`, read from code).
The mirror rule was named from the plan's D-5, which quotes the planner definition; not read in his
own words by this thread.

**19. Whether Save refuses a description over 1024 (OQ-2).** Options: *Agent: cap input, allow save
(Recommended)* ("both description boxes stop typing and pasting at 1024, and Send refuses over
1024. Save does not refuse: a longer description arriving by pasted JSON saves, is recorded as not
valid, and is refused at Send with the reason") / *Agent: refuse the save too* (the save schema
also refuses over 1024; pasted JSON over 1024 refused on load, the planner's code read, not run; a
stored longer description would fail the JSON load paths, existence unknown) / *Agent: Send check
only* (no cap in the boxes). **Chosen: "Agent: cap input, allow save (Recommended)"**. Premises and
reads, this turn, website `0e3d903` by `git grep -n`, read from code, not run:
`src/server/api/utils/shapes.ts` lines 50 and 63 cap the button label and Text Display content,
lines 131 to 149 and 190 cap embed fields and message content, lines 69 and 81 leave both
descriptions `z.string().optional()`; `LinkButtonEditor.tsx` line 46 is the only `maxLength` under
`src/components`. W-2's words, `architecture/website.md` line 50; A-4, lines 243 to 245.
**This thread's error, kept:** the 09:17Z determination put the save schema in "as far as sibling
per-field limits already go" and "any server-side refusal of a save" out, without reading
`shapes.ts`; on the description fields the two clauses contradict. His selection settles it: the
save schema is not edited for this bound.

**20. A File component on an edit (OQ-3).** Options: *Agent: refuse File everywhere (Recommended)*
("the check refuses any message holding a File, on a new send and on an edit. Risk: if Discord does
accept a File naming an existing attachment on an edit, the site blocks an edit that would work;
that is unmeasured") / *Agent: measure it first* (an analyst run in the test server before
implementation) / *Agent: refuse on new sends only* (edits pass unmeasured). **Chosen: "Agent:
refuse File everywhere (Recommended)"**. Premises and reads, this turn: the research document's F-7,
lines 198 to 204, and N-5, line 399; that the website cannot attach a file to a V2 message is the
researcher's code read, marked so in the option. Read by this thread and not put in the prompt: the
File editor's url box is free text with the placeholder `attachment://filename.png`
(`FileEditor.tsx` lines 66 and 77), so a user can type an existing attachment's name; this is the
false-refusal case the option named.

Not put, by the determination: Exclusion X-1 (the generic failure toast) goes to him with revision
1's Exclusions register. The planner's own item (the `messageValidity.predicate` test file and its
handoff) is its to settle in revision 1.

Relayed to the planner by pointer to this block, his four chosen labels verbatim.

## 2026-11-11T10:38Z — selections 21 and 22: revision 1's exclusion of the toast, and rider R1 (put 10:34Z, answered 10:37Z)

Ledger: `steering/selection-ledger/2026-11-11.md`, block "2026-11-11T10:37Z — steering-queue-hooks".
Both by selection; the option text is this thread's. Source: plan 016 revision 1 (record `4c9bcf2`,
`Status: Active`, `Revision: 1`, no open `OPEN QUESTION`), read as its whole diff against revision
0 (`git diff 0ae079d 4c9bcf2`, 69/75), and the handoff
`handoff/send-check-validity-excluded-toast-and-file-upload-2026-11-11.md`, read whole. The
planner's spawn cue arrived by message at 10:33Z. No gate had read the plan when the prompt was put.

**21. The generic send-failure toast (Exclusion X-1).** Options: *Agent: keep it out (Recommended)*
("I start the critic and the architect on revision 1 as it stands. The toast is carried for later
by a handoff the planner already wrote (send-check-validity-excluded-toast-and-file-upload), which
also carries the File upload path your earlier ruling put after the existing items. Nothing more is
planned for the toast until that handoff is picked up.") / *Agent: add it to plan 016* (another
planner revision before any review; adds a milestone; the toast's wording comes back to him;
review, QA and his own check get wider) / *Agent: drop the toast item* (removed from the handoff,
nothing carries it). **Chosen: "Agent: keep it out (Recommended)"**. Premise and read, this turn:
website `0e3d903` `src/utils/sendWebhook.ts` lines 86 to 93 (`git show`, read from code, not run):
any non-200 logs Discord's body with `console.error` and the toast reads "Failed to send message.
Please try again or contact support." (or "edit"). X-2 (the File upload path) was named in the
option as held by his prompt-2 ruling and not asked again. X-3 to X-9 are stated limits or existing
carriers in the plan's Exclusions table; they were not put one by one.

**22. Rider R1: move `messageValidity.predicate.test.ts` beside its module if the chain edits it.**
Options: *Agent: keep the rider (Recommended)* ("the plan goes to review with the rider. Cost by
the plan: one extra line for code review and a check that the file's test count and pass set are
identical before and after the move. It drops on its own if the critic or reviewer objects. The
other five files stay on the handoff.") / *Agent: drop the rider* (the file is left unedited, the
handoff keeps all six, no added cost). **Chosen: "Agent: keep the rider (Recommended)"**. Premises
and reads, this turn: both paths exist in the website tree (`ls -d`); the cost and the drop
disposition are the plan's own text (Testing Strategy, "Rider R1"), quoted as the plan's.

Registered by this thread as D-12 and D-13 in the plan (changelog R-1; the revision stays 1). The
critic, the architect's conformance pass and QA Phase 1 are started on revision 1 (lifecycle
`references/seams.md`, next-act table, the row for a plan revision before implementation approval).
The option named the critic and the architect; QA Phase 1 is the third gate that table starts at
once, and he is told in this turn's report.

Usage at this point: `plan-usage.py --json`, 10:38Z: `weekly_all` 92% (it read 90% at 10:07Z), resets
2026-11-14T17:00Z; the gate is 98%.

## 2026-11-11T11:02Z — his command: the 98% weekly gate does not stop this thread's chains

His typed words, in this session, after this thread reported the weekly figure and the gate:

> "do not stop at 98%"

Effect, read narrowly: at 98% of `weekly_all` this thread does not checkpoint and close chain 016,
stops none of its stage sessions and keeps its standing check; the chain runs on. His words name
the 98% gate alone, so the 90% session-limit hold (steering.md, Usage gates) stands as written.
`plan-usage.py --json` at 11:02Z: `weekly_all` 97%, `weekly_scoped:Fable` 93%. No stage was told of
a gate, so none is told of this. Not put to him: what happens at 100%, which is the plan's own
limit and not a rule of this thread's.

## 2026-11-11T11:08Z — plan 016 revision 2: scope delta read; not put to him as a prompt

Read this turn, after this thread's `/clear`: plan 016 revision 2 (record `6b07655`, `Status:
Active`, `Revision: 2`, no open `OPEN QUESTION`), as its whole diff against this thread's
registration (`git diff 3b4205d 6b07655`, 192/104), its changelog row, value statement, Exclusions
and Planner batch (none registered); QA register rows B-3 and B-4 (`qa/016-send-check-validity-qa.md`
lines 322 and 323). The planner's message at 11:07Z carried the same delta and cued the three gates
itself.

**This thread's judgement: a criterion-level delta inside the class he approved, no milestone added
or removed, so no selection prompt.** The limbs stay L1 to L10. What moved:
- M1's measured population is QA's 116-member corpus (82 refused, 34 accepted; the plan's figures,
  from QA's fixture), up from the research's 76 (52 and 24). His selection 17 option named "the 52
  shapes Discord was measured refusing"; the value statement he approved reads "every V2 shape the
  research measured Discord refusing". The 40 added members are QA's measurements of the same ten
  limbs at nested placements and key-absent forms. Read as the same class with more of it measured,
  not a new one; told to him so he can say otherwise.
- New criteria on M1: AC1-6p (a post-deploy read on hooks.gg, rows B-3 and B-4, the UAT stage's
  with him as fallback only, so nothing enters `OWNER-QUEUE.md`), AC1-9 (every other message keeps
  today's result), AC1-10 (the import closure stays env-free), AC1-11 (the chain adds no lint
  finding). M2's AC2-2 is split into a suite half and a browser half (B-2).
- Rider R1 is dropped on critique F-6, under the drop disposition he was shown at selection 22
  (plan D-13, "Fired").
- Exclusions: X-9 now covers all six files of the tests handoff; X-10 (the base tree's existing
  lint findings: 312 errors and 364 warnings in 109 files, the planner's count at `0e3d903`) is new,
  a stated limit bounded by AC1-11.

**Two design choices of the planner's, recorded as agent-authored and reported to him (lifecycle
`references/escalation.md`, Standing Defaults: a design choice inside the agreed scope); he vetoes
from this record.**
1. The new reason line renders on `/preview` like its sibling error lines, so a draft saved with a
   just-added, unfilled component can get a preview image carrying the red line. Not gated, by the
   mirror-the-siblings rule (plan D-5). UAT records the `/preview` render in B-1's walk. The share
   of drafts affected is unknown (the plan's words, from critic F-1).
2. A link button's label takes selection 18's whitespace rule (U+0085 counts as empty, U+FEFF as
   content). Selection 18's question named the Text Display; QA measured Discord treating a label
   the same way (QAF-3, QA's measurement, not re-read here), and the goal he chose at selection 17
   is agreement with Discord, so it is not re-asked.

Gates at 11:08Z (`ListAgents`): the critic, the architect and QA are busy re-reading revision 2;
the planner is idle. Idle subscriptions held on the three gates.

## 2026-11-11T11:11Z — selection 23: error lines leave preview images, inside plan 016 (put 11:11Z, answered 11:11Z)

Ledger: `steering/selection-ledger/2026-11-11.md`, block "2026-11-11T11:11Z — steering-queue-hooks".
By selection; the option text is this thread's. Source: the planner's message at 11:09Z asking that
its design choice 1 (block 11:08Z above) be put to him, on the architect's AF-11
(`architecture/016-send-check-validity-architecture-findings.md`, record `2520ac7`, `Status: Active`,
delta pass on revision 2 APPROVED; AF-11 read whole). The 11:08Z block's "reported, not asked" for
choice 1 is superseded by this selection; choice 2 (labels) stands as recorded there.

Options: *Agent: hide all on preview, in 016 (Recommended)* ("the planner adds one change to plan
016: the preview route shows no error lines or red border at all, the existing over-limit ones
included, so no preview image carries them. The editor and the send page keep every line. This
reverses your 2026-11-08 choice for the over-40 line. Cost: a third plan revision, and the critic,
the architect and QA each read once more (the critic and architect have read twice so far).
Mechanism is the architect's proposal (a signal only the preview route passes), not built.") /
*Agent: ship 016, fix in a later chain* (the planner's recommendation; from 016's release until the
later chain ships, a V2 draft saved with an unfilled component gets a preview image with the red
line; later, its own small chain with its own review and release) / *Agent: keep same as siblings*
(nothing added or planned; no cost) / *Agent: hide only the new line* (breaks his rule "Never fix
or work around it in one feature only"; a third revision and one more read by each gate).
**Chosen: "Agent: hide all on preview, in 016 (Recommended)"** (selection).

Effect: a scope delta to plan 016 by his word, and a reversal of plan 015 D33 (his "Agent: same as
siblings" of 2026-11-08, `steering/015-rulings.md` block 08:02Z, read this turn; its question then
offered "Agent: hide all on /preview" and he declined it for the rare over-40 case). A planning
revision: the planner is commissioned by pointer to this block. Revision 2's approvals do not carry
to revision 3.

Premises and reads, this turn, website `master` at `0e3d903` (`git show` and `git grep -n`, read from
code, not run): `upsertMessage` calls `postMessagePreviewImage` in both branches
(`src/server/api/utils/shared.ts` lines 269 and 277); `src/app/preview/page.tsx` renders
`DiscordMessageEditor` with no `editableState`; the three existing error lines and the `errorBorder`
carry no edit-mode condition (`DiscordMessageEditor/index.tsx` lines 290 to 293 and 336 to 340).
The Problem Area "Validation errors render into generated preview images"
(`architecture/system-architecture.md` line 195, raised to Medium by the architect at 11:09Z) and
plan 016 D-5 (line 51) were read. Not read by this thread: research F-12's body (that a fresh
component other than a Separator is refused); "routine while composing" is the architect's
judgement, named as his in the question. Gate state put in the question: critique
`Status: Resolved`, `Verdict: APPROVED` at `6b07655` (record `5c1512f`, now under
`critiques/closed/`); QA busy (`ListAgents`, 11:08Z).

**Critique cycle 1's stated limit, for his sight (no action asked):** F-11 LOW, closed by the critic
under its stop authority. The plan defines "whitespace-empty" twice and the two wordings differ on
one unmeasured kind of string (U+0085, other whitespace, U+0085); the implementer follows the formal
definition. The critique's words: "Nothing routes to the owner from this critique."

## 2026-11-11T11:15Z — plan 016 revision 3: scope delta read against selection 23; no further prompt

Read this turn: plan 016 revision 3 (record `21db6c8`, `Status: Active`, `Revision: 3`, no open
`OPEN QUESTION`: `grep -c 'OPEN QUESTION'` 5 at both revisions, all `[RESOLVED]` forms), as its
whole diff against revision 2 (`git diff 6b07655 21db6c8`, 72/36), changelog row included.

- **Milestone M1b added** (the preview route shows no validation chrome), registered as D-14 on
  his selection 23. Its class is the four existing error lines (`noContentError`,
  `embedCharacterError`, `v2TextError`, `componentCountError`), M1's new line and the red border;
  only `src/app/preview/page.tsx` turns them off (AC1b-1 to AC1b-4). This is the option he chose
  ("no error lines or red border at all, the existing over-limit ones included"; "the editor and
  the send page keep every line"), so the milestone is not put to him again. Named for his sight:
  the no-content line of an empty message is an existing line that is not an over-limit one, and
  it leaves preview images too, under "no error lines … at all".
- QAF-9 folded: the whitespace rule is judged per character, so the string the critic's F-11 left
  as residue (U+0085, space, U+0085) is now refused, as QA measured Discord refusing it (the
  plan's citation of `verification/016/corpus/whitespace-rule-check.txt`, not read here). The
  corpus is 120 members (86 refused, 34 accepted; the plan's figures).
- X-8: the planner read `preview-image-generator` at `8de2b53` with a pathspec leaving out
  `.github`; it is not edited.

**The whitespace limb (L1, with L8) has now been revised in revisions 1, 2 and 3.** Under
steering.md (Standing check) a further finding on it is decided by this thread before the planner
folds: another gate round, or the gap recorded as a stated limit.

Gates at 11:15Z (`ListAgents`): the critic, the architect and QA are busy on revision 3. The
planner is idle at a 333K prefix (threshold 325K) and was asked to run `/checkpoint`.

## 2026-11-11T11:21Z — plan 016 revision 4: scope delta read; inside selection 23, no prompt

Read this turn at the commit (`git show c249af3:planning/016-send-check-validity.md`; the path is
clean against `HEAD`; `git diff --numstat 0c01944 c249af3`: 106/33): `Revision: 4`, four milestone
headings (M1, M1b, M2, M3, as at revision 3), the changelog row, X-11 and RK-5. M1b's body and
criteria were read at 11:19Z from the working tree before the commit, not re-read at the commit.
The gate reads it folds, each read at its document's header this turn or the last: architecture
delta on revision 3 APPROVED_WITH_CHANGES (`0bb1084`; AF-12 required, read whole; AF-13
recommended), critique cycle 2 pass 1 APPROVED (`critiques/016-send-check-validity-cycle2-critique.md`,
`56b2916`, `Status: Open`; "None for the owner"), QA's re-key on revision 3 (`d5466ab`).

- **No milestone added.** M1b's class becomes a property: nothing the editor renders on the
  preview route carries an error line, border or ring. Seven members by the planner's code read
  (the username line of `Author.tsx` added), membership settled by QA's render. This is his chosen
  option's "no error lines or red border at all", so it is not put to him.
- **For his sight, agent-authored, his to veto (the planner's X-11):** the preview route's own
  "Invalid message data." text stays, because it shows in place of the editor when the data does
  not parse, so it is not an error line on a message.
- RK-5: preview images generated before release keep their error lines until the message is saved
  again (the plan's stated limit, from critique F-14).
- The whitespace limb is not touched by revision 4 (the planner's statement; the 11:19Z read of
  the diff's M1b region did not cover L1).

**This thread's errors, kept.** (1) At 11:19Z it told `qa-hooks-016`, just cleared, that the plan
read `Revision: 4` and a re-key was owed; that was a working-tree read while `HEAD` read
`Revision: 3`. Corrected to QA by message at 11:20Z; QA confirmed it had done no re-key work.
(2) The 11:15Z block says the five `OPEN QUESTION` hits are "all `[RESOLVED]` forms"; four are, and
the fifth is the Status-Detail's "No OPEN QUESTION remains."

Sessions: `planner-hooks-016` and `qa-hooks-016` were each asked to run `/checkpoint` past the
325K threshold (333K and 344K, `cc-usage.py sessions`) and cleared with `tmux-agent clear` after
their Checkpoints (`0c01944`, `0e90085`); each was then sent a pointer to its Resumption State.
At 11:21Z (`ListAgents`) the critic, the architect and QA are busy on revision 4.

## 2026-11-11T11:22Z — his command: the 98% weekly gate is back in force; chain 016 checkpoints and closes

His typed words, in this session, at about 11:22Z:

> "Reinstate the 98% limit."

Effect: the 11:02Z block ("do not stop at 98%") no longer holds. Steering.md's usage gate applies
as written: at 98% of `weekly_all` every chain checkpoints and closes, stages reach a seam and stop,
this thread stops its stage sessions and its own check, checkpoints and reports, and nothing is put
to him meanwhile.

**The gate has fired, on the last live reading.** `plan-usage.py --json` at 11:12Z read `weekly_all`
99% (the standing check's read). At 11:22Z the same command read 93%, and `plan-usage.py --gate 98`
printed "BELOW 98%: weekly_all 93% … (source claude-code-cache (live failed: HTTPError), 2560s
old)": that 93% is a cached value about 43 minutes old, served because the live fetch failed, so it
is not a reading of now and the gate is not judged on it. The limit resets 2026-11-14T17:00Z.

Acts: each of chain 016's four stage sessions (`planner-hooks-016`, `critic-hooks-016`,
`architect-hooks-016`, `qa-hooks-016`) is told to reach a seam, run `/checkpoint` and end its turn;
this thread then stops each with `tmux-agent stop`, deletes its standing check, and checkpoints.
Chain 016 stands at plan revision 4 (`c249af3`) with its gate round on that revision unfinished or
part-finished; each stage's Resumption State says where it stopped. No implementation has started;
the website tree is on `master` at `0e3d903`.

## 2026-11-11T11:24Z — the gate had not fired: his observation, and this thread's wind-down withdrawn

His typed words, in this session, at about 11:23Z, after this thread reported the wind-down:

> "wait, the usage is 52% right now"

His observation governs: at 52% the 98% weekly gate has not fired, and the 11:22Z block's "The gate
has fired" is wrong. "Reinstate the 98% limit." stands as his ruling: the gate applies as
steering.md writes it.

**This thread's error, kept.** It judged the gate on `weekly_all` 99%, a `plan-usage.py --json`
read at 11:12Z whose `source` field it had not captured (the 11:03Z read, 97%, printed
`"source": "live"`). At 11:22Z and 11:23Z the tool's live fetch failed (`HTTPError`) and it served a
cache 2560 seconds old (93%); this thread set that aside as stale and then acted on the older 99%
without a live reading of now and without telling him the reading first. No instrument on this box
gave a live figure at 11:22Z to 11:23Z; which meter reads 52% was not asked. A gate is judged only
on a reading whose `source` is live.

What the wrong wind-down did, and its undoing:
- `planner-hooks-016` stopped at 11:23Z after its Checkpoint (`a9bb644`, plan `Revision: 4`,
  R-2 at `5f95a30`). `architect-hooks-016` stopped at 11:23Z after its Checkpoint (`f79fc94`,
  delta pass on revision 4 APPROVED at `47c7a4c`). Neither has work owed at 11:24Z; each is
  spawned fresh with `tmux-agent spawn`, its brief naming its Resumption State, when the chain
  next needs it. Cost: a cold start for each.
- `critic-hooks-016`: cycle 2 closed `Resolved`, APPROVED on revision 4
  (`critiques/closed/016-send-check-validity-cycle2-critique.md`, record `d9f2e86`); it had
  checkpointed at a 336K prefix, past its 325K threshold, so it was cleared (`tmux-agent clear`,
  11:24Z) as the threshold rule has it, not stopped.
- `qa-hooks-016`: checkpointed at `cc91291` with its re-key on revision 4 in progress; the stop was
  withdrawn by message at 11:23Z, the error named as this thread's, and it was told to carry on.
- The standing check was re-armed (one-shot `6880eb0a`, 11:53Z) with the source rule in its prompt.
