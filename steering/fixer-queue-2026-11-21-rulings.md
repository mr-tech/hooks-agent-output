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
