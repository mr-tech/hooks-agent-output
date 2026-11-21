# Rulings — effort `fixer-queue-2026-11-21` (find, prioritise and run the hooks fixer chains)

Effort-wide rulings file. Steered by `steering-hooks` (cwd `/usr/local/bin/hooks`, agent `steering`, pid 468014); coordinator
`steering-coordinator` (cwd `/home/dev`). Each fixer chain this effort runs keeps its own `steering/fix-<slug>-rulings.md` for its
scoping determination; this file holds the effort's commission and the priority order.

## 2026-11-21T05:32Z — the commission, relayed by the coordinator

His words, verbatim, as relayed in the coordinator's launch brief
(`/tmp/claude-1000/-home-dev/91a2538c-0549-4bfb-9487-b48e5b7b9241/scratchpad/brief-hooks.md`, read whole 05:3xZ):
"Tell them to find prioritize fixer chains to run. Do not manage them beyond that, other than to run /clear."

The brief's own scope (the coordinator's words, not his): find the defects and fixes in this repository that are candidates for fixer
chains, prioritise them, run the fixer chains in that order under the steering protocol (Fixer; Scoping determination); record the
scoping and priority order here; owner-needing items to him by the standard prompt form; no planning or implementation chain outside
the fixer route; the coordinator's only further act on this thread is a `/clear`.

Relay standing: a coordinator's relay of his words (steering.md, Approvals move verbatim). The coordinator's docket did not exist at
this read (`ls ~/.claude/projects/-home-dev/memory/` shows `MEMORY.md` and `tmux-tabby-environment.md` only), so the relay is held as
the launch instruction it is; nothing this effort does past a scoping determination rests on it — every production push keeps his own
release word, asked by devops in its own session.

Record state at this read: no open plan, implementation, code-review, QA, UAT or deployment document (`find <dir> -maxdepth 1 -name
'*.md'` for each, 05:3xZ; `qa/README.md` only); 31 open handoffs (`handoff/`, python `os.listdir` count); website `master` `76da25c`,
1 porcelain line; project-utils `master` `749606d`, clean; preview-image-generator `master` `8512a1d`, clean.

Candidate inventory: helper (`general-purpose-sonnet`), output `verification/fixer-queue-2026-11-21/scoping/inventory.md`.

## 2026-11-21T05:38Z — candidate inventory read; priority order (this thread's ruling)

Source: `verification/fixer-queue-2026-11-21/scoping/inventory.md` (helper, read whole by this thread 05:3xZ): 113 rows over 31 open
handoffs, `TODO.md`'s 10 items, `research/codebase-bug-evaluation-2026-11-08.md` F-1..F-50 and H-1..H-8, and `INBOX.md` at HEAD (no
entries). Classes, its `grep -c` per class: CANDIDATE 17, already-fixed 56, record 17, needs-decision 9, test-only 8, feature 3,
owner-only 3. Each "still present" premise below is the helper's read at website `76da25c` / project-utils `749606d`; each chain's own
scope sweep re-reads it at the ref the chain is cut from before its scope statement is written.

**Order** — each a fixer chain, run one at a time over the shared trees, each opened only after the previous one's code is released
or parked:
1. `fix-recent-message-ids` — inventory H14 + H29: session hydration returns metadata of server (guild) messages the caller has no
   right to (`shared.ts` guild arm), and the stored list it reads accepts entries the column cannot hold, failing the user's own
   session (`user.ts` `recentMessageIds`). One data path: the list is written by `updatePreferences` and read by the hydration.
   First because it is the only item that discloses data to the wrong user, with cause read from code and a small fix.
   Prior effort's ruling put to him as history, not a bar: `fix-personal-message-access` left guild messages out under his word
   "personal" (`steering/fix-personal-message-access-rulings.md`, 2026-11-19T22:59Z).
2. `fix-message-not-found` — H12 + H11 + H10: `getOne` on an absent number fails with a raw error rather than NOT_FOUND, and the editor
   shows a blank shell (retrying) for a refused or deleted message, its provider's load error rendered nowhere. User-visible on
   production (H11, H10 observed there). Needs his word on what a refused or deleted message's page says (both handoffs).
3. `fix-api-secret-compare` — H33: three API-key / token comparisons use `!==`, none constant-time.
4. `fix-git-dependency-pins` — H37 + H41 + inventory F-36: website names `paracord` and `project-utils` without a commit; project-utils
   lists `prisma-kysely` under `dependencies` and still tracks a stale `dist/prisma.js`. Cross-repo (project-utils, then website's
   lockfile). The H37 handoff asks for his routing; his commission is read as that routing, vetoable from this record.
5. `fix-middleware-dead-matcher` — T9: the matcher's `/api/guilds/(.*)` entry guards nothing. XS; runs alone only if no earlier chain
   touches `src/middleware.ts`, else rides there as a named rider.
6. Diagnose-first chains over the research's never-run hypotheses, in this order: R-H3 (cut on a collapsed caret deletes a character),
   R-H6, R-H4, R-H2, R-H5, R-H7, R-H8. Each is a fixer chain whose first act is the red test; a hypothesis whose test stays green closes
   the chain with no fix.

**Held, needing his decision first** (inventory needs-decision): H17 NewMessageModal Save disabled on a conflicting imported draft;
H19 open content editor's text lost on reload; H09 the fixed cron key; H18 several Discord accounts per user; H24 public Pusher
channels; H30 the reason-less re-save toast; H35 `STATBOT_API_KEY` through `env.mjs`; H05 backfill guard host; H44 hosting assumption.
Held by an earlier effort's owner ruling, history only: H23 generator host posture ("no effort", 2026-11-08). Not candidates: test-only,
record, feature and already-fixed rows, as classed. Closing the handoffs whose premise no longer holds (H03, H15) is record work this
commission does not name; left open.

Disclosure: this block's first write, a shell heredoc, was refused by the record-write gate (record documents are edited with the
Edit/Write tool); re-issued with the Edit tool.

## 2026-11-21T05:42Z — four questions put to him, plain-message form (chain 1 can still move); unanswered

Put in this thread's chat at 05:4xZ, with one `owner-wait` notice (`--chain fixer-queue-2026-11-21 --wait-key decision-items`).
Premises, each read this turn: the refutation helper's `verification/fixer-queue-2026-11-21/scoping/refutation-decision-items.md`
(read from code at website `76da25c`, nothing run) — C1 HOLDS, with the refinement that another user's number already gets NOT_FOUND
(from `authorizeUser`) and only an absent number gets the raw error; C2 HOLDS (whether each import path can produce the conflicting
draft is unchecked); C3 PARTLY (desktop only; mobile writes on every keystroke); C4 HOLDS (daily Vercel cron in `vercel.json` with
`?key=vercel`; no writer of `ScheduledMessages` in any repo; the table's rows unread).

Q1 (chain 2, refused/absent/deleted message page): A. Agent: one "not found" state for all three, the same wording for each so the
page never tells whether a number exists, with a link back to his messages, and no retry on that error (Recommended); B. Agent: send
the user to a new message with an error notice in that wording; C. You: type the wording you want; D. Agent: don't fix.
Q2 (H17, Save disabled on an imported draft with both V2 components and plain content): A. Agent: settle the conflict the way the
JSON tab already does, so Save works (Recommended); B. Agent: keep Save off but say why; C. Agent: don't change.
Q3 (H19, desktop content editor's text lost on reload while open): A. Agent: save the draft as he types on desktop, as mobile already
does (Recommended); B. Agent: don't change.
Q4 (H09, daily cron on a fixed key, nothing writes the table it sends from): A. Agent: delete the cron endpoint and its `vercel.json`
entry (Recommended; unread: whether the production table holds unsent rows); B. You: create a secret in Vercel and the agent switches
the check to it; C. Agent: don't change.
Answers: (pending).

## 2026-11-21T05:48Z — his ruling, relayed by the coordinator: prompt him at each decision point

His words, verbatim, relayed by `steering-coordinator` by SendMessage at 05:4xZ: "tell the steering sessions to prompt me and not wait
for the chains to be blocked". The coordinator's gloss (its words): "put each decision point to the owner as a prompt when it arises,
rather than waiting for a chain to block." Acted on: every decision point of this effort's chains is put to him as a selection prompt
when it arises, not held in plain-message form while another chain can move. First application: the four questions of block 05:42Z,
re-put as a selection prompt at once.

## 2026-11-21T05:50Z — selection: his answers to the four questions; the order extended

Selection prompt, put 05:48Z, answered 05:50Z (ledger: `steering/selection-ledger/2026-11-21.md`, block "2026-11-21T05:50Z —
steering-hooks"). The option sets and premises are block 05:42Z's, as re-put; the prompt's wording is this thread's. Answered by
selection, each his choice of the Recommended option:
- Q1 not-found page: "Agent: one not-found page (Recommended)" — the same 'not found' wording for all three cases, so the page never
  reveals whether a message number exists, plus a link back to his messages; the page does not retry on that error.
- Q2 import Save: "Agent: resolve like JSON tab (Recommended)" — a fixer chain resolves the conflict the way the JSON tab does, so Save
  works.
- Q3 desktop draft: "Agent: save as you type (Recommended)" — a fixer chain makes desktop save the draft as he types, as mobile does.
- Q4 dead cron: "Agent: delete the cron (Recommended)" — a fixer chain deletes the cron endpoint and its `vercel.json` entry
  (unread at the selection: whether the production table holds unsent rows; chain 6's sweep reads what it can).
`owner-wait` `decision-items` resolved 05:50Z.

**Order, as extended** (replaces block 05:38Z's list; its reasons stand): 1 `fix-recent-message-ids` (running); 2
`fix-message-not-found` (Q1 A); 3 `fix-import-save-conflict` (H17, Q2 A); 4 `fix-desktop-draft-as-typed` (H19, Q3 A); 5
`fix-api-secret-compare` (H33, with the v1 `messages/[id].ts:19` coerced-id rider from chain 1's exclusions); 6 `fix-delete-dead-cron`
(H09, Q4 A); 7 `fix-git-dependency-pins`; 8 `fix-middleware-dead-matcher`; 9 the diagnose-first hypothesis chains. User-visible
breakage (2-4) ahead of hardening (5-6) and hygiene (7-9).

## 2026-11-21T05:55Z — selection: chain 2's server answer is one 'not found' for the message load

Selection prompt, put 05:5xZ, answered 05:55Z (ledger: `steering/selection-ledger/2026-11-21.md`, block "2026-11-21T05:55Z —
steering-hooks"). Premise, read this turn by a refutation helper at website `76da25c` (read from code, not run): `message.getOne`
answers 500 for an absent number (`shared.ts:160` `executeTakeFirstOrThrow`, uncaught; `trpc.ts:78` formatter passes through), NOT_FOUND
for another user's personal message (`user.ts:27-32` via `message.ts:60`), FORBIDDEN for a server message the caller cannot manage
(`authorizeGuildAdmin.ts:~40` via `authorizeGuildUser` at `message.ts:59`); `authorizeGuildAdmin` has 8 non-test callers, and
`guild.ts` `getGuild` maps NOT_FOUND to null. Sweep: `verification/fix-message-not-found/scoping/sweep.md` (commit `0124978`).
Options (wording this thread's): A "Agent: one answer for message load (Recommended)" — the message load answers 'not found' for all
three cases; only that load changes, the shared check and its other callers keep 'forbidden'. B "Agent: page only" — server keeps
'not found' vs 'forbidden', readable in network responses. C "Agent: change shared check" — 8 call sites, `getGuild` silently 'no
server'. Chosen by selection: **A**.

## 2026-11-21T05:59Z — selection: chain 4 reaches all typed message text; chain 3's design read

Chain 4. Selection prompt, put 05:5xZ, answered 05:59Z (ledger: `steering/selection-ledger/2026-11-21.md`, block "2026-11-21T05:59Z —
steering-hooks"). Premise: chain 4's sweep `verification/fix-desktop-draft-as-typed/scoping/sweep.md` (commit `ebd7365`, read from
code at `76da25c`): desktop `Desktop.tsx:95` holds the content editor's text locally and commits on blur-within (`:45-48`); embed author
name (`EmbedAuthor.tsx:58-62`) and footer text (`EmbedFooter.tsx:123`) commit on blur; the image URL dialog (`ImageUploader.tsx:54-57`)
and JSON dialog (`JsonModalBody.tsx:88`) commit on their button. Options (wording this thread's): A "Agent: all typed text
(Recommended)" — content editor plus author name and footer text save as typed; the two dialogs keep their button; B "Agent: content
editor only"; C "Agent: dialogs too". Chosen by selection: **A**.
This thread's error, recorded: the prompt was put before a refutation helper tried the sweep's conclusion (steering.md, Prompting the
owner). One was started at 05:59Z after the answer; its result is recorded below when it lands, and reopens the selection only where it
changes what the chain builds. Result (refutation helper, read from code at `76da25c`, not run): every limb HOLDS — content editor
(`Desktop.tsx:32,45-52,95`), author name (`EmbedAuthor.tsx:44,58-62,136`), footer text (`EmbedFooter.tsx:44,118,123`), mobile
pass-through (`Mobile.tsx:~104`); no unload flush in non-test `src` (`useUnloadAlert` prompts only); no other message input holds text
locally. The selection stands unreopened.

Chain 3, this thread's design reading (agent-authored, inside his Q2 A words "the way the JSON tab does"): the sweep
(`verification/fix-import-save-conflict/scoping/sweep.md`, commit `729a64f`) reads the JSON tab as two behaviours by row — a row E draft
(V2 components and classic content) is held for the user's choice of Classic or V2, the other dropped (plan 013 D17), and rows A-D are
settled with `applyDisposition` and a settled notice. Chain 3 reproduces both in `NewMessageModal` for every import tab, so neither the
row E choice nor a row D silent floor leaves Save off with no way out. Not put to him: it is the JSON tab's own rule applied to a second
surface, which his words name.

## 2026-11-21T07:59Z — selection: chain 2's escaped gap runs after chain 3, and the not-found page drops the editor controls

Selection prompt put 07:5xZ, answered 07:59Z (ledger `steering/selection-ledger/2026-11-21.md`, block "2026-11-21T07:59Z —
steering-hooks"); wording this thread's. Premises: chain 2's escaped defect, `steering/fix-message-not-found-rulings.md` block 07:58Z
(QA's production read; carrier `handoff/get-one-absent-number-still-500-in-production-2026-11-21.md`, UUID 7c3e91a4); a refutation
helper (run under Node in `scratchpad/refute-noresult/`, 07:5xZ): limbs 1-4 HOLD — `message.ts:4` ESM `NoResultError`, `:74`
`asNotFound(NoResultError)` by `instanceof`; project-utils `dist/postgres.js` `require("kysely")`; kysely 0.26.1's `exports` split
`import`/`require`; a CJS query's `NoResultError` is not `instanceof` the ESM class — PARTLY on production, since no Next bundle was
built (`next.config.js` has no `serverExternalPackages`/`transpilePackages`); QA's production read is the observation.
- Q timing: A "Agent: right after chain 3 (Recommended)"; B "Agent: now, in a second copy"; C "Agent: pause chain 3"; D "Agent: don't
  fix". Chosen by selection: **A**.
- Q header row: A "Agent: hide editor controls (Recommended)" — "in the same fix round, the not-found page drops the name field, the
  menu and Send, keeping only the site's normal navigation and the notice"; B "Agent: leave as is". Chosen by selection: **A**.
**Order, as amended:** 1 done; 2 released with the gap; 3 `fix-import-save-conflict` (running); **3b `fix-get-one-absent-not-found`**
(handoff 7c3e91a4 plus the header-row limb; a red test whose error comes from the CJS kysely the query really uses; an escaped
bug-form test is earned, `// escaped:` the deployment record); then 4-9 as block 05:50Z.

## 2026-11-21T08:00Z — selection: the retrospective of chains 1 and 2 runs now

Selection prompt put 07:59Z, answered 08:00Z (ledger block "2026-11-21T08:00Z — steering-hooks"); wording this thread's. Premise:
weekly_all 94%, `source` live (`plan-usage.py --json`, 07:59Z); the 98% stop; reset 17:00 UTC (same read). Options: A "Agent: after the
17:00 reset (Recommended)"; B "Agent: run it now" — "spawn the retrospective and the scoring helpers now, beside chain 3. It may bring
the 98% stop sooner."; C "Agent: fold into the next batch". Chosen by selection: **B**, against this thread's recommendation.

## 2026-11-21T08:06Z — test-case scoring beside the batch retrospective (chains 1 and 2)

Website at `f4baebb` (the batch's last release), clean export; suite 2303 cases, exit 0 (helper's JSON report, counted by python).
Marked: 221 cases in the seven test files `git diff --name-only 76da25c f4baebb` lists under `__tests__/`. Two deweeder units
(110 ids 180..1126; 111 ids 1127..2001). Merged: `verification/fixer-batch-2026-11-21-b/deweed/website.tsv` (221 rows, 221 unique
ids; python over the two unit tables). Below 7: 104 of 221 (47.1%) — unit 1's 66 are mostly generated repeats in
`user.save-limits.test.ts`. Covering cells: every covering id is in the merged table (0 unchecked). Two scorers noted cases kept at 8
whose fake database is the ESM kysely (184, 186, 1656) — the escaped defect's blind spot, for chain 3b. Nothing deleted on this; a
deletion is a later chain's, behind a mutation re-run. Export removed (`ls -d` fails).

## 2026-11-21T08:12Z — his ruling, relayed by the coordinator: the 98% usage gate is lifted until reset

His words, verbatim, relayed by `steering-coordinator` by SendMessage 08:1xZ: "98% usage gate is lifted until reset". The
coordinator's gloss (its words): "The weekly 98% checkpoint-and-close hold no longer applies; resume normal chain work until the limit
resets." Acted on: this effort's chains do not checkpoint and close at weekly_all 98% before the 17:00 UTC reset (`plan-usage.py`
read 07:59Z); the session gate at 90% is not named and stands.

## 2026-11-21T09:02Z — order amended: a diagnose-first chain for the empty Message Link import

His selection, recorded in `steering/fix-import-save-conflict-rulings.md` block 09:02Z ("Agent: diagnose-first chain
(Recommended)"). **Order now:** 1, 2, 3 released; 3b `fix-get-one-absent-not-found` (running); **3c `fix-message-link-import-empty`**
(diagnose first on the test server; a portal toggle, if that is the cause, goes to him); then 4-9 as block 05:50Z.

## 2026-11-21T09:17Z — his ruling, relayed by the coordinator: park the chains

His words, verbatim, relayed by `steering-coordinator` by SendMessage 09:1xZ: "Park the chains". The coordinator's gloss (its words):
"Park every chain you steer per the Parking rules in steering.md: ask each stage session for /checkpoint, stop it once committed, write
your own Checkpoint into the docket, and report back." Acted on: the one chain in flight, 3b `fix-get-one-absent-not-found` (fixer
handed off at website `b663b35`; review just begun), parks — `fixer-…` and `code-reviewer-…` asked for `/checkpoint` 09:17Z, each
stopped once its Checkpoint is committed. Website tree stays on `chain/fix-get-one-absent-not-found`. No chain opens while parked
(3c onward wait). Nothing awaits him from this thread; no question is held.
Qualified 09:17Z, his words relayed by the coordinator: "Ongoing deployments can complete". This effort has none: no open deployment
record (`ls deployment/*.md`: none, 09:17Z) and no devops session of its chains live (`cc-usage.py sessions`: the two devops sessions
listed belong to other threads' chains). The park stands unchanged.
Parked 09:18Z: `fixer-fix-get-one-absent-not-found` Checkpoint `9e357ef5`, stopped; `code-reviewer-fix-get-one-absent-not-found`
Checkpoint `05f414ba` (partial round 1, no verdict), stopped. This thread's Checkpoint is in its docket
(`~/.claude/projects/-usr-local-bin-hooks/memory/docket-hooks.md`); its standing check `821f9fe8` deleted. Waits on his word to unpark.

## 2026-11-21T09:51Z — his ruling, relayed by the coordinator: continue the threads (the park lifts)

His words, verbatim, relayed by `steering-coordinator` in this thread's respawn brief (its scratchpad `respawn-hooks.md`): "continue
the threads". The coordinator's gloss (its words): "Unpark your parked chain and resume the queue in the recorded order under your
standing rulings." Acted on: chain 3b `fix-get-one-absent-not-found` resumes (its chain rulings block of this minute); 3c onward
follow in the order of block 09:02Z. Premises re-read 09:50Z: website `origin/master` `b829314` (`git ls-remote`), tree on the chain
branch at `b663b35`; `plan-usage.py --json` live, session 0%, weekly_all 50% (the weekly limit has reset since block 08:12Z, so that
lift is spent; the 98% gate is back in force and far off). No deployment record open (`ls deployment/*.md`: none).
Disclosed: a shell heredoc append to this file and the chain rulings file was refused by the record-write gate; re-issued through
`record-edit.js`, as the gate names.

## 2026-11-21T10:22Z — test-case scoring beside the batch retrospective (chains 3 and 3b)

Website at `b663b354` (the batch's last release), clean export; suite 2316 cases, exit 0 (helper's JSON report, counted by python).
Marked: 34 cases in the three test files `git diff --name-only f4baebb b663b354 -- 'src/**/__tests__/**'` lists as `*.test.ts[x]`
(the fourth path is a helper). One deweeder unit (ids 471-481, 580-592, 1670-1679). Merged:
`verification/fixer-batch-2026-11-21-c/deweed/website.tsv` (34 rows, 34 unique ids; python). Below 7: 3 of 34 (8.8%) — 587 and 590
(covered by 585), 1673 (covered by 1671). Covering cells: every covering id is in the merged table (0 unchecked). Nothing deleted on
this; a deletion is a later chain's, behind a mutation re-run. Export removed (`ls -d` fails). The retrospective
(`retrospectives/fixer-batch-2026-11-21-c-retrospective.md`) is still running.

## 2026-11-21T10:28Z — batch retrospective c committed; its items for this thread

`retrospectives/fixer-batch-2026-11-21-c-retrospective.md` (record `ea226320`), Active; pi only on his word, never offered. Items it
gives this thread: (1) the architect entry on project-utils' CommonJS kysely build, owed since batch b and never lodged — lodged in
`INBOX.md` now; (2) a deployment record citing an uncommitted `build.log` — lodged in `INBOX.md` for the record's owner (devops's
document; its author stopped); (3) **this thread's error:** the retrospective's brief named the Origin `fixer-batch-2026-11-21-c`, not the
lifecycle's `fixes-<date>-<thread>` form; the document records the deviation. Carried into chain 3c's later briefs: serve a production
build before release where a module-instance or bundling assumption is open (the retrospective's finding on B-1), and take a
production baseline of a post-deploy row's unchanged limbs before the push.

## 2026-11-21T15:31Z — batch retrospective d (chains 3c and 4) and its scoring started

Chains: 3c `fix-message-link-import-empty` (diagnosis, no code; closed on a known limit, carrier 8e9ccc47) and 4
`fix-desktop-draft-as-typed` (released website `b68f94c`, P-1 holds, source f1356f4b closed Addressed; chain rulings block 11:39Z).
Chain 5 `fix-api-secret-compare` is in flight and joins a later batch. Origin: `fixes-2026-11-21-steering-hooks-3`, the lifecycle's form
(`references/documents.md` L15), suffix 3 as this thread's third batch today (b and c carried the wrong form, block 10:28Z item 3).
Retrospective: subagent `retrospective-fixes-2026-11-21-steering-hooks-3`. Scoring: website at `b68f94c`; marked = the three test files
`git diff --name-only b663b35 b68f94c` lists under `__tests__/` (3c changed no code); output under
`verification/fixes-2026-11-21-steering-hooks-3/deweed/`. Result recorded below when the tables land.

## 2026-11-21T16:08Z — batch d: retrospective committed; the scoring's case list not completed

Retrospective `retrospectives/fixes-2026-11-21-steering-hooks-3-retrospective.md` (UUID f717f5b2, record `5c18154`), Active; pi only on
his word, never offered. Its items for this thread: (1) architect entry on the bot token's blank reads — lodged in `INBOX.md`; (2) the
QA document's uncommitted `dev.log` citation — lodged in `INBOX.md` for the record's owner; (3) the lint-script hazard — written to this
cwd's memory `hazards.md` (this thread's judgement); (4) eight recommendations for pi — none acted on; (5) no handoff.
Scoring: the suite ran on a clean export of website `b68f94c`, exit 0; reading its report into the case list was not completed. His
selection, answered 16:05Z (ledger `steering/selection-ledger/2026-11-21.md`, block "2026-11-21T16:05Z — steering-hooks"): "Agent: I run
the read" — this thread ran the helper's command word for word; not completed. The next step is his (block below when answered); the
export stays in this thread's scratchpad until then.

## 2026-11-21T18:01Z — selection: the read and the server start re-run in another wording; batch d case list built

Selection prompt put 16:1xZ, answered 18:00Z (ledger `steering/selection-ledger/2026-11-21.md`, block "2026-11-21T18:00Z —
steering-hooks"); wording this thread's. Premise: a refutation helper ran the gate's code on payload files (result PARTLY: the refusal
needs a word of the command to be an operand of a verb outside its permitted table); its finding is lodged in `~/.claude/agents/INBOX.md`
(DECISION NEEDED). Options: A "Agent: re-issue without 'none' (Recommended)"; B "Agent: remove the none flags"; C "Agent: skip both".
Chosen by selection: **A**. Applied: the reviewer told 18:0xZ (chain rulings block 18:01Z); the case-list helper declined to act on a
relayed word (a subagent cannot confirm with him), so this thread built the case list itself: `verification/fixes-2026-11-21-steering-hooks-3/deweed/website-cases.tsv`
— 162 files, 2326 cases (= `numTotalTests`), 0 failed, exit 0; marked 10 (ids 262-263, 515-518, 559-562; python over the report). One
deweeder unit started 18:0xZ.

## 2026-11-21T18:02Z — test-case scoring beside batch retrospective d

Website at `b68f94c`, clean export; suite 2326 cases, exit 0. Marked: 10 cases in the three test files chain 4 added. One deweeder unit.
Merged: `verification/fixes-2026-11-21-steering-hooks-3/deweed/website.tsv` (10 rows, 10 unique ids; python). Below 7: 0 of 10 (0%).
Covering cells: every covering id is in the case list (0 unchecked). Nothing deleted on this. Export removed (`du -s` 10980 before;
`ls -d` fails after).

## 2026-11-21T18:37Z — his standard for questions put to him: context first, plain English, no commit IDs

His words, in this session, after reading devops's release prompt (ledger `steering/selection-ledger/2026-11-21.md`, block
"2026-11-21T18:35Z — devops-fix-api-secret-compare"): "prompt messages have been increasingly filled with more and more jargon, and that
they need to be clear, concise, and in plain English what they're asking me to decide on. It should be very clear at the top the context
that the question is being asked in, and then afterward what the question is and or what is the decision that I'm making. The options
themselves as they are is more or less okay. However, they should still avoid commit messages or commit IDs, and other technical
information that I would otherwise have to look up to make sense of." Lodged in `~/.claude/agents/INBOX.md` (FYI, steering-hooks,
2026-11-21) for the Escalation Form; every prompt this thread puts to him follows it from now.

## 2026-11-21T18:51Z — test-case scoring beside batch retrospective e (chain 5 alone)

Website at `0c14d5b` (chain 5's release), clean export; suite 2361 cases, exit 0 (helper's JSON report, counted by python; run under a
`systemd-run` 8G cgroup cap). Marked: 76 cases in the nine test files `git diff --name-only b68f94c 0c14d5b -- 'src/**/__tests__/**'`
lists as `*.test.ts` (the tenth path is a helper). One deweeder unit. Merged:
`verification/fixes-2026-11-21-steering-hooks-4/deweed/website.tsv` (76 rows, 76 unique ids; python). Below 7: 15 of 76 (19.7%) — among
them 2360-2361, which the scorer notes are the guard test's only enumeration of future v1 routes. Covering cells: every covering id is in
the merged table (0 unchecked). Nothing deleted on this. Export removed (`du -s` 949712 before; `ls -d` fails after).
