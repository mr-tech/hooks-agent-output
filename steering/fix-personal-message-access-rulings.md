# Rulings — fix-personal-message-access (fixer chain)

Steered by `steering-roadmap-hooks` (cwd `/usr/local/bin/hooks`). Origin: his "Fix right after 017"
(`steering/017-rulings.md` blocks 2026-11-19T08:41Z, 08:43Z, 09:01Z). Coordinator: `steering-coordinator`.

## 2026-11-19T20:30Z — scoping determination (scope awaiting his selection)

**His words that bound it** (block 09:01Z, by selection): "Fix right after 017", covering both defects. On reads, "No, owner only",
with the option text "The fix blocks reading another user's personal message entirely" (block 08:41Z). His question at 08:43Z:
"Are you absolutely sure there's no filtering mechanism that would make it so that the actual query can only get a message the user
owns?"

**Shape.** Defect. No dated outside event. Cause proven: S2 was confirmed on production by the browser check (`verification/access-defects/
browser-check/README.md`, `497f0de`). S2, S6b and S11 were executed through the real routers (`appRouter.createCaller`) against a
throwaway local postgres, with all three NOT REFUTED (`verification/access-defects/scoping/refutation.md`, helper 20:3xZ; env, Pusher,
`waitUntil`, preview generation and redis stubbed in its export; S11's NextAuth adapter path not run). Blast radius: every signed-in hooks.gg
user's personal messages. Specification uncertainty: `app/message/f/[id]` copies a message by number through `getOne`, so after the fix,
copying another user's personal message stops working. That is what "owner only" chose. Where the fix lives: website alone. project-utils holds no query (sweep S23); the
generator takes no user identity (S17).
**End step:** a website `master` push, which Vercel deploys to production; it needs his word (`~/.claude/CLAUDE.md`, Git).
`release-move.js website master 787bec5… --dry-run` at 20:30Z: every check passed. There is one serving ref at origin (`--report`: "one
serving ref at origin (master); no pair"). No workflows (`website/.github/workflows` absent). Released chains whose scope touched the
route: 017 (M5 changed `upsertMessage`), whose open post-deploy carrier is `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`.

**Property** (from his words): a signed-in user can get, change or delete only the personal messages (no guild) they own. A message
number sent by the browser never lets a user read, create, claim, overwrite or delete a row that is not theirs.
**Region swept** (`verification/access-defects/scoping/sweep.md`): every request surface that takes a message identifier, in website
`787bec5`, project-utils `749606d` and generator `8512a1d` (23 rows; predicates, counts and blind spots in the file). Placement of every
hit (S-numbers from the sweep):
- **In scope, whichever option he picks:** S2 `message.getOne` (and S18, the `[id]` pages that use it); S6b `message.upsert` creating a row
  at a client-sent id.
- **In scope under the recommended option only:**
  - S11, the hydrated session reading `recentMessageIds` without an owner check.
  - An owner term in the write queries of S6a and S7: the check and the write are separate queries today.
  - A canonical id at the input of S7, S8 and S9: S9 leaves the owner's own previews in the bucket when the id text is non-canonical.
- **Exclusions he sees in the same question:**
  - S5, the share code: public by design, with a 1-hour code.
  - S16, preview URLs: public by design. Id plus nonce is the capability, and S11's fix closes the nonce leak.
  - S17, the generator's shared key: X-21 already carries it.
  - S15, Pusher channels: public, and they carry a save hash only.
  - S14, the cron key `vercel`: a constant, not a secret. It is not a message-id path.
  - S1b, `authorizeGuildAdmin`: it tests guild membership, not admin bits. Guild messages are outside his "personal" words. Whether
    `session.user.guilds` holds only the guilds he manages is unread.
  Each exclusion he does not bring in becomes one handoff.
**What would catch a breach of the rule:** a router-level test per surface, where a second user is refused (S2, S6b, S11, S6a, S7, S8). Post-deploy,
the browser check re-run on production: test account 1 opens test account 2's personal message and is refused.
**Not covered by the sweep** (sweep step 5): database policy and sequence state, Vercel env, Pusher and bucket settings, NextAuth internals,
and the check-then-write race (read from code only).
**Stage set:** `fixer` (red test per in-scope surface), then `code-reviewer`, then QA Phase 2 (at 20 or more production lines), then
`security` on the change (it changes an authentication boundary on production; this thread's choice, recorded here), then devops for
website `master` (his word needed). No plan, critic, Phase 1 or UAT. Post-deploy: the browser check, walked by a uat-role session on the
test accounts (screenshots stay untracked, his 09:01Z ruling).

## 2026-11-19T22:35Z — scope: fix all three, with query hardening (his selection)

Selection prompt put 22:3xZ. Blocking prompts were back on, per steering-coordinator; the flag `~/.claude/state/prompt-gate-off` was
absent this turn. The question was first put in plain text at 20:3xZ and re-stated at 21:1xZ while prompts were off. Answered 22:35Z.
Selection-ledger day file `steering/selection-ledger/2026-11-19.md`, block "2026-11-19T22:35Z — steering-roadmap-hooks", header
"Access fix".
- **Agent: fix all three (Recommended)** — CHOSEN, by selection. Its description: "Agent fixes 1–3. It also puts the owner check inside
  the save/update/delete queries (today the check and the write are separate queries) and cleans up oddly formatted message numbers, so
  deleting a message no longer leaves its preview images behind. Then a test per case, code review, QA, a security review, and a
  production push that needs your word."
- Agent: fix only 1 and 2. Bug 3 and the query hardening each go to a handoff record for later.
- Agent: don't fix now. Each of the three goes to a handoff record and this fix closes. The holes stay open on production.
Under every option the question kept three items out, each with its own handoff record: the cron key `vercel` (S14), the public Pusher
channels (S15) and the guild-admin membership check (S1b). The options' wording is this thread's.
Premises read this turn: live website `master` is `787bec5` (`ls-remote`, 22:32Z). `refutation.md` was read whole at 21:1xZ: S2, S6b
and S11 NOT REFUTED; S11's NextAuth path was not run.
**Scope statement, now bounded.** In scope: S2 with S18, S6b, S11, an owner term in the S6a and S7 write queries, and a canonical id at
the S7, S8 and S9 inputs. All of it is in website alone. Out: S5, S16 and S17 (no record; X-21 carries S17). S14, S15 and S1b get one
handoff each. The stage set is as in block 20:30Z. Owner-wait `access-fix-scope` resolved (`challenge-alert.js resolved`, exit 0).
Disclosure: the record-write gate refused this block's first write, a shell heredoc. It was re-issued with the Edit tool.

## 2026-11-19T22:37Z — chain started: handoffs, branch, briefs, fixer spawned, standing check armed

- **Exclusion handoffs** (helper subagent, `6f333f0`, check-repo PASS exit 0):
  - `handoff/cron-endpoint-key-is-a-fixed-value-2026-11-19.md` (S14)
  - `handoff/pusher-message-update-channels-are-public-2026-11-19.md` (S15)
  - `handoff/authorize-guild-admin-tests-membership-not-admin-bits-2026-11-19.md` (S1b)
  The helper chose each record's Owning-Stage ("steering thread …") and its event triggers; the sources name neither. The record-write
  gate refused the helper's first shell write, and it re-issued the write with the Write tool.
- **Chain branch:** website `chain/fix-personal-message-access`, cut 22:36Z with `git switch --no-track -c … origin/master` at `787bec5`.
  There is no upstream (`@{u}` fatal). The tree before the switch was `master` at `787bec5`, and `git status --porcelain` showed only
  `?? .playwright-mcp/`: screenshots from 2026-11-11, not this chain's. The switch touches no file (same commit), so I treated it as
  a clean tree and recorded it here. The lockfile is unchanged.
- **Briefs:** `steering/fix-personal-message-access-brief-common.md` (`860d50e`), and the fixer, code-reviewer and qa briefs (`66fcfd6`).
- **Spawned** `fixer-hooks-fix-personal-message-access` (`tmux-agent spawn`, category `fix-personal-message-access`, cwd website, effort
  medium as printed). The code reviewer and QA are spawned when they can start: on the fixer's handoff, and on the review's approval at
  20 or more lines. Security comes after QA.
- **Standing check** armed as a one-shot, id `846d57b8`, for 23:07Z. It replaces the cache-warm wake. OOM count 0. Usage live 22:37Z:
  session 1%, `weekly_all` 19%.
- Disclosure: the stamp gate refused this block's first heading, which was typed a minute ahead of the clock (22:38Z against 22:37Z),
  and it was committed that way at `9943a73`. It now carries the `date -u` minute.

## 2026-11-19T22:59Z — fixer handoff at 2e50cd9; two members ruled in (this thread's error); code reviewer spawned

Fixer message, 22:5xZ. Fix at website `2e50cd9` on `chain/fix-personal-message-access` (`git log`, read this turn). Document
`implementation/fix-personal-message-access-implementation.md` (record `a7e9e8c`): `Status: Active`, `Handoff-At: 2e50cd9…`. 83 production
lines added, by its count. Spawn cue acted on: `code-reviewer-hooks-fix-personal-message-access` spawned (`tmux-agent spawn`, cwd website,
effort medium as printed).
**Ruling (this thread's): two of its "Observed outside the scope" items are in scope.** The words of the option he chose (block 22:35Z) are
"puts the owner check inside the save/update/delete queries" and "cleans up oddly formatted message numbers". My bounded scope statement
named only S6a and S7 for the owner term, and only S7, S8 and S9 for canonical ids. That narrowed the option's words, and it was my error;
the check that would have caught it is reading the scope statement against the chosen option's text before sending. Both members are in
the swept region (S6, S8), so this is a recorded ruling, not a re-scope. The amended scope statement:
- an owner term in the delete query of S8 (`message.delete`) as well as in S6a and S7;
- a canonical id at the `message.upsert` input (S6a/S6b, `optionalIdMessageShape.id`) as well as at S7, S8 and S9.
**Out, each to a handoff** (guild messages are outside his "personal" words, and existence is not a read of a row):
- the hydrated recent list returning server-message rows for stored numbers (S1b's family);
- `getOne` on an absent number failing differently from `NOT_FOUND`.
**Owner-needing, held to the release seam:** the production read of rows planted at browser-sent numbers (the document's Diagnosis,
"Residue already in production"). It does not block code review or QA. No agent read path to hooks.gg's production database is recorded.
I searched `memory/hazards.md`, the architecture record, and the record for "production database" and `claude-ro`. `.env.local` values
are never read. It goes to him with the release question, after a refutation helper reads the fix at its final SHA.
Relays: the fixer (a blocking change to its work) and the code reviewer (hold: the handoff will move off `2e50cd9`).
Handoffs for the two out items (helper subagent, `92c140d`, check-repo PASS exit 0):
`handoff/hydrated-recent-list-returns-guild-message-rows-2026-11-19.md` and
`handoff/get-one-absent-number-fails-without-not-found-2026-11-19.md`.

## 2026-11-19T23:09Z — code review round 1 REJECTED at d597734 (CR-1); CR-2 to CR-5 routed

The fixer handed off round 2 at website `d597734` (record `98a103e`; 107 production lines added, by its count). The code reviewer's
message at 23:0xZ, and `code-review/fix-personal-message-access-code-review.md` (record `1504b59`, read this turn: `Reviewed-At:
d597734…`, `Status: In Review`), give round 1 as REJECTED on CR-1 (MEDIUM): a missing client test of MessageProvider's redirect when a
save lands at a new number. That goes to the fixer as a test-only diff. The ownership property held under the reviewer's attack
instrument: 187/187 at `d597734`; 52 red at `787bec5`.
This thread's routing:
- **CR-2 (LOW), in scope:** `messageIdShape`, and `getOne`'s regex, admit digits beyond int8. It is the fix's own number contract, so
  it falls inside his option's words "cleans up oddly formatted message numbers". The fixer takes it in its next round, together with
  CR-1.
- **CR-3 (INFO), handoff:** `user.updatePreferences` accepts any string in `recentMessageIds`, so a non-int8 entry fails that user's own
  session. It is pre-existing at `787bec5`, self-only, and at an input this fix does not canonicalise.
- **CR-4 (INFO), handoff, owning stage the architect:** the Problem Areas row "`upsertMessage` counts the owner's messages on every
  save" becomes false at release. Trigger: this chain's release.
- **CR-5 (INFO), the fixer's design choice:** the fate of the draft under the dead number is a mechanism inside the agreed scope (Standing
  Default). The fixer decides it, records it as agent-authored, and the CR-1 test states it. Dropping the old draft is a one-line
  production change, and it is within scope on this ruling.
- Assumption Not Checked (that the session carries the caller's own id): the security stage and the post-deploy browser check own it, as
  the reviewer says.
Relays: the fixer and the code reviewer.
Handoffs (helper subagent, `3a22a16`, check-repo PASS exit 0): CR-3 `handoff/update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md`;
CR-4 `handoff/upsert-message-count-problem-area-false-after-access-fix-2026-11-19.md` (Owning-Stage architect, trigger this chain's release).

## 2026-11-19T23:17Z — code review APPROVED_WITH_COMMENTS at 12bcd75; CR-6 folded in before QA

Read this turn: `code-review/fix-personal-message-access-code-review.md` (record `c4a3804`): `Reviewed-At: 12bcd75…`, `Verdict:
APPROVED_WITH_COMMENTS`, round 1 sub-entry 1a. The fixer's `Handoff-At` is `12bcd75`. Website log: `5d9678d` (test), then `12bcd75`
(fix). Per the reviewer's message: CR-1, CR-2 and CR-5 are fixed; its attack instrument passes 187/187 at `12bcd75`. 116 production
lines, so QA Phase 2 is owed.
**CR-6 (LOW), this thread's ruling: fold it in before QA starts.** In zod 3.22, `messageIdShape`'s `.refine` still runs `BigInt()` after a
failed `.regex`, so `safeParse` throws on `1e3` or `１`. The router still refuses with `BAD_REQUEST`, per the reviewer's measurement
through tRPC 11.10. The reason to fold: it sits at the fix's own number contract (the CR-2 site), it is a one-shape change, the fixer is
idle, and QA has not started. Folding now costs one delta review. A handoff would leave a known fault in a shape this chain wrote. The
fixer folds it with a test. The reviewer reviews the delta. QA Phase 2 is spawned on that approval, at the new SHA.
Relays: the fixer and the code reviewer.

## 2026-11-19T23:23Z — code review APPROVED_WITH_COMMENTS at ed88e7c; QA Phase 2 spawned

Read this turn: the review document (record `5fcb74e`) gives `Reviewed-At: ed88e7c…` and `Verdict: APPROVED_WITH_COMMENTS`, round 1
sub-entry 1b. The fixer's `Handoff-At` is `ed88e7c`. Website log: `16bf24d` (fix), then `ed88e7c` (test), on
`chain/fix-personal-message-access`. Per the reviewer's message: CR-6 is fixed (probe 24/24), the attack instrument passes 187/187, and
no finding is open. Spawn cue acted on: `qa-hooks-fix-personal-message-access` spawned (`tmux-agent spawn`, cwd website, effort medium as
printed), on its brief, for QA Phase 2 at `ed88e7c`. The security brief is written for its start on QA's verdict:
`steering/fix-personal-message-access-brief-security.md`.
The fixer was cleared at 23:3xZ after its Checkpoint (`1921854`), on this thread's ask: it was idle at a seam with a 351K prefix, past its
role's 325K threshold.

## 2026-11-19T23:49Z — QA Phase 2 PASS at 75f1543; security spawned; delta review asked; post-deploy items

Read this turn: `qa/fix-personal-message-access-qa.md` (record `0ed724b`): `Status: QA Complete`, `Verified-At: 75f1543…`. `75f1543` is
QA's test-only commit, +34 lines in one test file (`git diff --stat`), which closes QAF-1. Its production tree equals `ed88e7c`: `git diff
--quiet ed88e7c 75f1543 -- src ':!**/__tests__/**'`, exit 0, run by this thread. That is a test-only case QA writes to close a survivor,
added in the chain (Standing Default). By QA's message: the suite passes 1908/1908 with exit 0 at `75f1543`; the real-database
second-user matrix passes 21/21 at `ed88e7c`, with 6 failing at `787bec5`.
- **Security** spawned at `75f1543`: `security-hooks-fix-personal-message-access` (`tmux-agent spawn`, cwd website, effort high as
  printed), on its brief.
- **Code review:** its verdict is at `ed88e7c` and the tree moved, so a delta review at `75f1543` was asked of the reviewer. The broken
  capture path at its document's line 354 rides that message.
- **Post-deploy items B-1 and B-2** (QA's register; this chain has no UAT, so they reach this thread as blocks). Neither gates a release
  act. Carrier: the devops Stage 1 handoff, read by a uat-role session on the test accounts. That is his standing ruling for test accounts
  on live hooks.gg (`steering/015-rulings.md` line 429), with screenshots untracked (his 09:01Z ruling).
  - B-2: a signed-in `getOne` on a number beyond int8 returns 400 with the fix, 500 without.
  - B-1: re-walk `verification/access-defects/browser-check/README.md`.
  The devops brief names both.
- **Release-seam residue read, one count added** (QA's Assumption Not Checked): `select count(*) from "Messages" where fk_users_id is
  not null and fk_guilds_id is not null`. It is the same at base; this chain does not introduce it.

## 2026-11-19T23:50Z — delta code review APPROVED_WITH_COMMENTS at 75f1543; residue refutation started

Read this turn: the review document (record `948b85a`) gives `Reviewed-At: 75f1543…` and `Verdict: APPROVED_WITH_COMMENTS`, sub-entry 1c,
a test-only delta. The reviewer re-ran the production-tree diff against `ed88e7c`, exit 0, and fixed its LINKS failure (check-repo PASS,
by its message). Code review and QA now both anchor at `75f1543`. Security is running there.
A `general-purpose-sonnet` helper was started to refute the fixer's "Residue already in production" conclusion, limbs (a) to (c), through
`appRouter.createCaller` at `75f1543` against a throwaway postgres. This is ahead of the release prompt, per steering.md, Prompting the
owner.
