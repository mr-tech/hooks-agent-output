# Brief — devops-fix-website-save-gate-embeds

Duties negated: none.

From `steering-queue-hooks`, 2026-11-11T10:08Z. You are the session
`devops-fix-website-save-gate-embeds`, launched in `/usr/local/bin/hooks/website`, started on QA's
spawn cue. Repositories: `/usr/local/bin/hooks/website` (source) and
`/usr/local/bin/hooks/agent-output` (record). `/usr/local/bin/hooks` is not a repository:
`git -C <repo>` always.

## The owner's word, and what it does not cover

His selections opened and shaped this chain; read them in
`agent-output/steering/queue-hooks-rulings.md` (whole file), chiefly the blocks "selections 5 to 8"
(prompt 7), "CR-1 decided" (selection 13) and "selection 15". The option he chose to open it said
"nothing reaches production without his release answer". **Nothing he has said names a merge or a
push.** The release of this fix is your own Phase 2B ask to him, in your session; nothing in this
brief or from steering stands in for his answer.

## Stage set

A fixer chain: fixer, code review, QA Phase 2, devops. No plan, critic, Phase 1 or UAT (rulings
file, block "re-checks at website `6d78b19` and the scoping determinations", paragraph "Held item
4"; QA Phase 2 became owed at 44 added production lines, block "2026-11-11T09:42Z").

## Start

QA's committed verdict: `agent-output/qa/fix-website-save-gate-embeds-qa.md`, record `6ed8112`.
Copied at 10:08Z from its header: `Status: QA Complete`, `Verified-At: "0e3d903 — repos=website;
production files identical to 963a25c (git diff --numstat 963a25c 0e3d903: one test file, 6/0)"`.

**A gate still running when this brief was written.** The code review's anchor read
`Reviewed-At: 963a25c — repos=website` at 10:08Z
(`agent-output/code-review/fix-website-save-gate-embeds-code-review.md`, record `5849cb7`,
`Verdict: APPROVED_WITH_COMMENTS`). QA then added one test-only commit, `0e3d903`, and sent the
reviewer a scoped check of `963a25c..0e3d903`; the reviewer was busy on it at 10:08Z. Your release
ask waits on the code reviewer's scoped check of `963a25c..0e3d903` landing in its document; re-read
that document's anchor before you ask him anything. Preparation that touches no ref may proceed.

The fixer's document: `agent-output/implementation/fix-website-save-gate-embeds-implementation.md`
(`Handoff-At: 963a25c — repos=website`, record `d89d629`).

## Tree

Website is on `fix/website-save-gate-embeds` at `0e3d903` (10:08Z). The switch back to `master` at
the merge is yours, and the fix branch is deleted after the merge (fixer.md, "The fix branch").
Remote `master` read `6d78b19` by `git ls-remote origin master` at 10:08Z.

## What a push of website `master` triggers

`release-move.js /usr/local/bin/hooks/website master 6d78b19… --dry-run` at 09:16Z printed
"workflows none — /usr/local/bin/hooks/website/.github/workflows absent". `vercel.json` is present
(`ls -d`, 10:08Z). That a push of `master` goes live in production through Vercel is the statement
of earlier deployment records (`agent-output/deployment/closed/fix-agent-comment-sweep-merge-deployment.md`,
`fix-v1-guild-messages-auth-deployment.md`), not re-read by this thread today. Re-derive it.

## Carried to the release step, by name

1. **His live-state read.** The fix repairs no stored row. Whether any stored message holds V2
   components beside an empty embed is his to read against the live database; the read-only query
   is written out for him at the release step (rulings file, block "fixer handoff received", item
   2). No agent reads that database.
2. **His own check of the user-visible flows.** The fixer's document, section "User-visible flows";
   QA walked them on a local build (its "Browser walk" table), not on hooks.gg.
3. **QA's Assumption Not Checked.** Whether hooks.gg's Pusher app delivers the save event to the
   saving client as the local one did; QA's document names the release step as its owner and gives
   the signature of its falsity. It sits inside item 2.
4. **Shipped behaviour that changes**, for his release ask: after a choice in the "Choose which to
   keep" dialog the editor holds what was stored, and after "Save as Classic" it switches to
   Classic mode (rulings file, blocks "selection 15" and "2026-11-11T09:27Z").

## Open records this release touches

- `agent-output/handoff/save-originating-tab-raises-its-own-update-prompt-2026-08-25.md`: stays
  Open. This fix is not shown to explain its limb (d); QA's walk holds one observation on that shape.
- `agent-output/handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md`: not
  this chain's; it waits on a later chain.

## Delivery

An owner-needing item other than your own release ask, or a spawn cue, goes to
`steering-queue-hooks` by SendMessage. After the release, the chain's retrospective is this
thread's to start.

## Architecture

`agent-output/architecture/system-architecture.md`, `agent-output/architecture/website.md`.

## Not checked by this brief

- The diff, the suite at `0e3d903`, and QA's captures: none read or run by this thread beyond the
  QA document itself (read whole at record `86aff70`; its header re-read at `6ed8112`).
- Whether Vercel's integration is still connected.
- Whether any other session holds uncommitted work in the website tree (it read clean at 09:36Z).
