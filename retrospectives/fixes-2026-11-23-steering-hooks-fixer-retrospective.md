---
ID: n/a
Origin: fixes-2026-11-23-steering-hooks-fixer
UUID: 06f4c0c7
Status: Active
Status-Detail: "Fixer-batch retrospective over seven chains of effort fixer-queue-2026-11-21 (released 2026-11-21T23:18Z to 2026-11-23T08:38Z); awaiting pi on the owner's word."
---

# Retrospective (fixer batch fixes-2026-11-23-steering-hooks-fixer): seven chains of fixer-queue-2026-11-21

**Plan Reference**: none (fixer chains). The chains' fixer documents, all `Released`, in `implementation/closed/`:
`fix-delete-dead-cron-implementation.md`, `fix-api-extractor-devdep-implementation.md`, `fix-git-dependency-pins-implementation.md`,
`fix-middleware-dead-matcher-implementation.md`, `fix-cut-collapsed-caret-implementation.md`, `fix-decorator-offsets-implementation.md`
(UUID 12ef2086), `fix-emoji-pretransform-widths-implementation.md` (UUID 27c7b0a0).
**Date**: 2026-11-23
**Retrospective Facilitator**: retrospective (`retrospective-fixes-2026-11-23-steering-hooks-fixer`, a subagent of `steering-hooks-fixer`)

The batch is every fixer chain closed since batch e. Effort rulings block "2026-11-23T08:48Z" names the seven and admits the open
post-deploy carriers under the trigger ("post-deploy rows terminal or carried by a handoff"). The previous batch
(`retrospectives/fixes-2026-11-21-steering-hooks-4-retrospective.md`, chain `fix-api-secret-compare`) is not re-covered. Where one of
its recommendations recurs here, it is named, not re-proposed.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T09:00 | steering-hooks-fixer (spawn brief; effort rulings block 2026-11-23T08:48Z) | Fixer-batch retrospective over seven chains | Created. All seven delivered their scope to production. $127.86 across the chains' own sessions plus $69.25 steering, for 239 added production lines. The decorator chain took six rounds and 39% of the chain spend. Each gate's catch came from an instrument wider than the first party's examples. Website `master` ran single-lane, and one outside fault (five production settings missing on Vercel) held the queue for about 17.5 hours. Eleven recommendations and nine items for steering. |

## Summary

**Corpus.**
- *Read first:* `architecture/system-architecture.md` (header, L172, L234, L237-238, L277, the lines the chains cite or touch).
  `roadmap/` holds `.gitkeep` only, so no epic is cited.
- *Read whole, by me:* the seven chain rulings files (`steering/<chain>-rulings.md`, every block, re-read at 08:5xZ); the effort
  rulings `steering/fixer-queue-2026-11-21-rulings.md` from block "2026-11-21T19:02" to block "2026-11-23T08:48Z"; the selection ledgers
  `2026-11-21.md` from block 19:02Z, `2026-11-22.md` (question, header and answer lines of every block; the 20:13Z, 22:13Z and 22:44Z
  blocks whole), and `2026-11-23.md`; the handoff `handoff/fix-emoji-pretransform-widths-picker-guild-emoji-ime-2026-11-23.md`
  (5b19c3e4); the frontmatter of the other open carriers (9f04d154, 4bc9b626, b47e8a79, 02a4cca1, and the previous batch's 3039bc8a
  and b1fdd41a, all `Status: Open` at 09:0xZ); the `Status:` line of every stage document of the seven chains (all terminal, all in
  `closed/`); record `INBOX.md` L330-L382; the steering-hooks entries in `~/.claude/agents/INBOX.md` (L229-L292); the headers of
  `~/.claude/tools/stamp-gate-hook.js`, `agent-output/tools/uat-local-stack.sh` and `~/.claude/skills/discord-test-browser/SKILL.md`.
- *Read through helpers:* the 23 closed stage documents and the chain-named handoffs, read whole by four `general-purpose-sonnet`
  helpers. Each wrote a digest with document and line cites, under this session's scratchpad (not committed). Load-bearing facts below
  cite the stage document. Where a fact also appears in the rulings, I read it there myself. The digests' line cites were spot-checked
  against `check-repo.js` output (decorator rows 605-611) and the `Status:` lines. The other cites I did not re-read. They are marked
  "(digest)" where they carry a finding alone.
- *Instruments:* `git diff --numstat` over each shipped range (run 09:0xZ), `cc-usage.py chain` per chain and for the steering sessions
  (captures under `verification/fixes-2026-11-23-steering-hooks-fixer/cost/`), `git status`/`git log` on the INBOX files, `grep -c`.
- *Cannot read:* SendMessage traffic, so not when a cue was sent or a prompt was put to the owner, only when it was answered (the
  ledger); what the owner did at the Vercel dashboard (how the five settings were restored); Vercel itself; session transcripts (none
  consulted).
- *Unverifiable by construction, under a standing owner rule:* the record states only that an act "was not completed", never why.
  So this retrospective cannot tell a re-issue that satisfied a gate from any other re-issue (middleware, cut, git-pins), and it makes
  no claim either way.

**Value Statement** (each chain's scope statement, from its rulings determination):
1. `fix-delete-dead-cron` (block 20:26): `src/pages/api/cron.ts`, `vercel.json`'s `crons` entry, its test and `cron-parser` are
   deleted; `/api/cron` answers not-found and Vercel schedules nothing.
2. `fix-api-extractor-devdep` (block 04:58): `@microsoft/api-extractor` joins project-utils `devDependencies`; `npm run rebuild`
   passes with the global tool off `PATH`; `dist/` is byte-identical.
3. `fix-git-dependency-pins` (block 22:58): `prisma-kysely` moves to project-utils `devDependencies` and dead `dist/prisma.js(.map)` is
   deleted; website pins project-utils and paracord by full SHA, the lockfile edited by hand with no other package moving.
4. `fix-middleware-dead-matcher` (block 17:15): `src/middleware.ts` becomes `src/proxy.ts`; the dead `/api/guilds/(.*)` entry goes; a
   test checks every matcher entry against real pages.
5. `fix-cut-collapsed-caret` (block 18:53, corrected): Cut with a plain caret deletes nothing; Cut on a selection or a clicked emoji is
   as before.
6. `fix-decorator-offsets` (block 20:44, re-scoped from 20:19): the decorator's syntax ranges account for the source width of every
   markdown node kind; no input colours worse than at base.
7. `fix-emoji-pretransform-widths` (block 22:59): code that applies parsed widths to the editor's text uses source widths. Pasted or
   typed emoji keep the line's text (E-1), stored messages load unchanged (E-2), and colouring after an emoji is placed right.

**Value Delivered**: **YES** for all seven at their scope, each read on production by its devops stage (the deployment records are the
authority, re-read at their `Status:` lines 09:0xZ). Named residues:
- Chain 1: the dashboard Cron Jobs list is unread. It is the owner's, carried by 9f04d154, and source 4bc9b626 closes on it.
- Chain 3: the owner's three post-release flow checks are not recorded as done (deployment record, "his; this record does not wait on
  them", digest).
- Chain 4: CR-1 (`/preview` runs the proxy for no reader) is left to its own chain.
- Chain 6: the nested-style class and CR-6 are stated limits under the cap, carried by the `TODO.md` item `fix-decorator-nested-styles`.
- Chain 7: the guild-emoji picker and mobile IME paths are unverified (5b19c3e4). Text already lost to E-1 is not restored. The
  release question told the owner both.

The largest value came from outside the queue. Chain 6's QA found E-1, a live defect that drops pasted text, and the fix was on
production 10h44m later (QA Failed 21:54Z on 11-22, push 08:38:18Z on 11-23).

**Implementation Duration** (determination to release push; the window each chain's cost readout uses):

| Chain | Determination | Release push | Elapsed | Of which held outside the stages |
|---|---|---|---|---|
| 1 dead-cron | 11-21 20:26 | 23:18:58 (live 11-22 16:55:59) | 2h53m to push, 20h30m to live | 17h37m: Vercel production build failing for five missing settings |
| 2 api-extractor | 11-22 04:58 | 07:22 | 2h24m | about 2h08m: fixer sat on the folder-trust prompt |
| 3 git-pins | 11-21 22:58 | r1 23:15; r2 11-22 17:03:47-17:04:08 | 18h06m | about 16.5h: release 2 gated on a passing production build |
| 4 middleware | 11-22 17:15 (scope selected 01:49) | 18:41:16 | 1h26m | 15h26m between selection and determination, the website tree held |
| 5 cut caret | 11-22 18:49 (selected 02:09) | 20:13:19 | 1h24m | as 4 |
| 6 decorator | 11-22 20:19 (selected 03:03) | 22:44:37 | 2h25m | as 4 |
| 7 emoji | 11-22 22:59 | 11-23 08:38:18 | 9h39m | about 8h37m: parked on the weekly usage gate (23:47 to 08:24) |

**Overall Assessment**: the stages were fast and the gates caught real defects. Four chains were through review in under 30 minutes,
and every review or QA catch in the batch came from an instrument wider than the first party's examples. The costs sat in three places:
(1) one non-converging chain, the decorator: six rounds, $50.34, where each fix opened a defect on the surface it changed; (2) a
single-lane website tree that an outside fault, the missing Vercel settings, held for a day; (3) recurring friction with the record's
own gates, typed stamps and shell-written record documents, in every chain. Steering ruled most fold-ins itself under the owner's
04:50 "fix everything you find" ruling and asked him only product questions and releases.

## What Went Well and What Didn't (process focus: workflow, collaboration, quality gates)

### Batch-level reads first

1. **Work queued behind one tree.** Website `master` carried six of the seven chains in strict sequence (effort block 05:38Z, one chain
   at a time per shared tree). Chain 1's push (23:18:58Z) met a Vercel production build that failed for five missing settings, unrelated
   to any diff (chain 1 rulings 23:55). That held chain 3's website release until 17:04Z next day, and chains 4, 5 and 6's
   determinations until 17:15Z, 18:49Z and 20:19Z, though their scopes were selected between 01:49Z and 03:03Z. Steering's two
   amendments were right and cheap: chain 3's project-utils half opened on its own tree in parallel (block 22:58), and chain 3's website
   half opened on a branch while `master` was failing (block 23:58). The rest of the hold was the owner's dashboard step. Sighted in
   chains 1, 3, 4, 5, 6.
2. **Work queued behind a prompt and a session.** Steering held chain 1's opening for about 36 minutes (19:05Z to 19:41Z), reading a
   context threshold as a stop (effort block 19:41). The api-extractor fixer sat on Claude Code's folder-trust prompt from spawn (04:58Z)
   until it was answered at the pane before 07:10Z. Both are lodged in `~/.claude/agents/INBOX.md` (FYI entries L250 and L287) with
   the owner's words, so they are not re-proposed here.
3. **Chains contending for one box.** The shared project-utils tree had no `node_modules`, so the pre-commit hook could not run its
   rebuild. It also held a stale 2023 `build/js/prisma.js` cache that put deleted output back into `dist/`. Both stopped a fixer and
   took a steering ruling: chain 3 block 23:07, chain 2 block 07:11. On website, the shared tree's gitignored
   `.next/types/validator.ts` still names the deleted `cron.ts` (`grep -c cron` = 2, mtime 2026-11-20T06:11, read 09:0xZ). That makes
   `pnpm run typecheck` exit 2 in the shared tree, so chains 1, 4 and 5 ran every typecheck in exports (stage documents, digest). Effort
   block 04:50 said "regenerated by the next build, not edited". No build has run there since.
4. **The same question reaching the owner more than once.** The same class of question reached the owner twice: re-running a
   not-completed act in a renamed form. Chain 4 put it at 18:45Z on 11-22; the previous batch put it at 18:00Z on 11-21. In chain 4 the
   fixer also re-issued one of its own not-completed runs "with its run label changed" and reported it to steering without a prompt
   (implementation document, process notes, digest). The corpus note above says why this retrospective draws no conclusion from it.
   Whether those cases differ is the owner's to judge.
5. **The same finding in more than one chain.** Five recurring findings:
   - *Typed stamps refused by the stamp gate.* Sighted in all seven chains: rulings 16:48 (chain 1), 00:13 (chain 3) and 22:56
     (chain 7); fixer rows in chains 3 and 5; review, QA and devops rows in chains 5, 6 and 7. Chain 6 had seven fixer rows stamped
     2 to 36 minutes after their commits. The gate did not catch those; `check-repo.js` did (CHANGELOG-ROW-VS-COMMIT, 7 failures, run
     at this session's start). Devops lodged them in record `INBOX.md` L377.
   - *Record documents written by shell script against the record-writing rule, all disclosed.* Sighted in chain 2 (reviewer, python
     in place), chain 5 (fixer `sed`; a reviewer shell edit refused), chain 6 (steering briefs composed by python, "no gate fired",
     blocks 20:19 and 22:33) and chain 7 (reviewer python heredoc, QA shell script, steering's `TODO.md` python write refused). The
     gate refused the `sed` and shell-append forms and passed the python forms.
   - *A closed code-review or QA document left at `Committed` with "release awaits the owner's approval" after the release:* chains 4
     and 5 (review) and 7 (review and QA). Chain 6's devops brought the same documents to `Released`.
   - *Vercel CLI reads hanging:* chains 3, 4 (four timeouts), 5, 6 (three) and 7 (three; the serving commit was never read, and the
     release was evidenced by a walk that fails deterministically at base).
   - *Record `.gitignore` `*.log` dropping evidence:* chain 2 (CR-3, the fixer's three logs unreproducible from git) and chain 3
     (captures renamed `.txt`). Also two earlier chains (record `INBOX.md` L330, L338). CR-3's carrier is an uncommitted INBOX line.

### Went well

1. **Wider instruments caught what example tests could not, at every gate that ran one.**
   - Chain 5: review mutated the shared `cut` conjunct and found no Copy case (CR-1). The fixer's controls had mutated only the guard
     it wrote.
   - Chain 6: the reviewer's 36,000-row differential corpus and 7,137-row grammar oracle found CR-1 (HIGH, 5 shapes right at base and
     wrong at the fix) and CR-2. QA's mutation sweep (101 mutants) found QAF-1. The reviewer's code-split probe found CR-5.
   - Chain 7: the reviewer's seeded 407-row probe found CR-1 (HIGH: `wow :o🙂` loads as `wow :o:`, 8 rows right at base and losing
     text at the fix).

   None of these defects was reachable from the fixer's hand-picked cases.
2. **QA's out-of-scope probe found a live data-loss defect, and the record moved it to production overnight.** Chain 6's QA ran a
   mounted-editor probe that QA's brief carried as the reviewer's unrun assumption, and found E-1: a pasted line loses the characters
   after an emoji. A refutation helper re-ran it through the real code path before anything was put to the owner (decorator rulings
   22:13; this applies the previous batch's "refute before you prompt" lesson). The owner was asked only the queue position. The chain
   was scoped in 3 minutes (22:56 to 22:59), and its QA walk failed 5/5 at base and passed 5/5 at the tip.
3. **Steering's look-only Vercel read caught a false "Released" within minutes.** The owner sanctioned it at 19:02Z. Chain 1's devops
   closed `Released` on the push alone at 23:19Z; steering's `vercel ls --prod` at 23:2xZ showed the build "● Error 17s" while the
   previous release still served. Devops reopened, diagnosed (a control build of base fails the same way) and lodged the rule finding
   (`~/.claude/agents/INBOX.md`, L266). Every later devops stage in the batch read the serving deployment before closing.
4. **The owner's 04:50 ruling cut owner prompts to product questions and releases.** Under it steering opened chain 2 from a sweep
   observation, folded the proxy rename into chain 4, folded headings and the code-fence case into chains 6 and 7, and sent CR-4 to
   its own chain, all without a fix-or-not question. Releases and product choices were still asked (the proxy rename at 17:15Z, the
   E-1 queue position at 22:13Z). The release questions in the ledger are plain English with no commit IDs, per his 18:37Z standard.
   The 22:44Z and 08:38Z blocks open with context; the 20:13Z block opens with the ask, then gives the context.
5. **The cap ended the decorator chain cleanly.** After 22:27 the chain allowed one more round, QAF-2, test-only and already routed.
   Two classes became stated limits with a carrier (`TODO.md`, `fix-decorator-nested-styles`) instead of rounds. B-1 passed on
   production at 22:55Z.
6. **The park on the weekly usage gate lost no evidence.** QA stopped at 23:47Z with partial results and no verdict. The resumed QA
   session (08:24Z, its own resume brief) re-read the tip, re-anchored the carried results instead of re-running them, and ran the
   browser walk. No other stage re-ran anything.
7. **Steering lodged its own errors in the round they happened.** Examples: the decorator option text "the rest of the line loses its
   styling" (block 03:03); the cut scope that narrowed past his words (block 18:53); the misread "there is no railway integration"
   (block 16:48); the unmeasured "4 points" in the emoji option (block 22:56); the over-tight lockfile wording in chain 2's scope
   (block 07:10).

### Didn't

1. **The decorator chain did not converge. Each fix opened the next defect on the surface it changed.** Its six rounds:

   | Round | SHA | Production lines | What broke |
   |---|---|---|---|
   | 1 | `f57c260` | 18 | CR-1, a regression of the fix |
   | 2 | `e6a5766` | 111 | a test row pinning a known-wrong value (CR-4, axiom D); the code-block axis broken (QAF-1, found a round later) |
   | 3 | `2e6127e` | 116 | approved, then QA Failed on QAF-1 |
   | 4 | `a7e1adb` | 118 | CR-5, split code lines regressed |
   | 5 | `24eda1c` | 128 | CR-6, plus an untested `normalizeRanges` call (QAF-2) |
   | 6 | `febf20e` | 128 | nothing new; test-only |

   - *Corpus blind spot.* The review corpus and QA's sentinel decorated only `lang: ''` lines, so the code-block axis was invisible
     until QA's mutation sweep (QA document; digest).
   - *Shape change.* The 20:44 re-scope from an instance to the class ("every node kind's source width") was right on the evidence.
     It also turned an 18-line fix into a 111-line rewrite with a second write-set file. That is the point where the chain's shape
     changed, and the pipeline choice was not revisited.
   - *Cost.* The chain spent $50.34 of the batch's $127.86 in 2h37m. Its fixer ran two generations ($14.25 and $11.59), the second
     after a mid-chain `/checkpoint`.
2. **The first party had no differential instrument in any of the three editor chains.** In chains 5, 6 and 7 the fixer's evidence was
   literal-expectation cases over named shapes plus negative controls on lines it wrote. Each blocking finding came from a second
   party's corpus or mutant (Went well 1). Chain 6's fixer once transcribed its expectations from the fix's own output, disclosed
   (axiom E). This is the previous batch's lesson 2 recurring in three more chains. What is new is the class: functions over the
   editor's markdown grammar, where a seeded base-versus-fix differential is cheap and already written. The reviewer's corpus and
   oracle sit under `verification/fix-decorator-offsets/`.
3. **Deploy evidence on Vercel is still a hand-run CLI that hangs.** The serving-commit read is the check the previous batch named as
   missing (its What Didn't 5). The look-only CLI now exists, but `vercel inspect` and `vercel ls --prod` hung in five of the seven
   chains. Chain 7 never read its serving commit and relied on a discriminating walk. Chain 4 lost its pre-deploy baseline. Each stage
   re-invents `timeout 60`, stdin closed and two tries (chain 4 rulings 18:45 ruled the retry form).
4. **No instrument read the production settings before a push, and nothing could restore them.** The five settings vanished between the
   18:35Z and 23:19Z builds on 11-21. The cause is unread: the owner reports a Railway integration that no longer exists on the
   marketplace (chain 1 rulings 16:44-16:48). Steering first offered a mechanism from general knowledge and withdrew it (block 16:46),
   then misread his correction and reinstated it (block 16:48). His restore at 16:55Z on 11-22 is unrecorded. Devops put the standing
   risk to him: the settings' source is now unrecorded. A `vercel env ls` names check needed his selection to extend the 19:02 bound
   (chain 1 block 23:55).
5. **Brief premises were sometimes wrong in ways only a later stage could see.**
   - Chain 4's common brief hazard 3 said `/preview` must still receive `x-pathname`. The reviewer showed that nothing on `/preview`
     reads it (CR-1).
   - The effort closure line "No architecture passage names the decorator" (decorator rulings 22:56) is wrong in letter:
     `system-architecture.md` L238 names `SlateEditor/utils/decorator.tsx` and its `_emitter` walk. That walk is still at `0411d3b`
     line 120 (`git grep`), so the passage is not stale, but it is the one the queued nested-styles chain edits beside.
   - Chain 2's "Not covered" omitted `statbot-utils`. `system-architecture.md` L277 says it carries "an identical `build:types`", which
     is review CR-1.
6. **Closures left carriers thinner than the close procedure asks.**
   - Chain 4's CR-1 (the `/preview` entry) is carried only by rulings block 17:40 and the steering docket. It has no `TODO.md` item or
     handoff; `grep -n '/preview' TODO.md` finds none (09:0xZ).
   - Chain 2's CR-1 sits in an uncommitted line of the statbot record's `INBOX.md` (L264; `git status` shows the file modified), and
     its CR-3 in an uncommitted line of this record's `INBOX.md` (L365).
   - Chain 2's CR-2 (a stale "the work stops here" sentence in the fixer's body) was never reconciled, and is carried only in that
     document's own `Status-Detail`.
   - Chain 5 created no carrier for the clicked-emoji real-browser case (deployment record, digest).
7. **One open carrier's premise conflicts with an installed instrument.** Handoff 5b19c3e4 says the guild-emoji picker path "can[not]
   be driven from the pipeline's box" and needs "a signed-in guild session". The `discord-test-browser` skill describes a Chrome
   signed in to Discord as the test account, for "a dashboard or web app behind Discord login", standing in QA and UAT. In chain 5's
   first walk, that profile reached hooks.gg signed in (deployment record: the first run found no editor "because the browser profile
   was signed in"). Whether the test guild has a custom emoji the picker would list is unread. The premise may hold, but the handoff
   does not record checking the skill.

## Testing by Hand (QA, and UAT where the chain ran it: what ran by hand, its cost, how it could run unattended)

No UAT is in a fixer stage set. QA Phase 2 ran in chains 6 and 7 only (the 20-line threshold). Cost is the subagent row in each readout
where one exists, and is otherwise not separable.

| Chain, segment | Done by hand | Cost on record | How it could run unattended |
|---|---|---|---|
| 1, devops post-deploy | Vercel CLI reads by hand (`ls --prod`, `inspect`, `logs`, then `env ls` on his selection); the owner restored five settings and pressed Redeploy in the dashboard; the Cron Jobs list is still his | in devops's $4.72; his time not on record | A settings-names check at devops Stage 1, comparing `src/env.mjs`'s required server keys with `vercel env ls` names (names only), would show a missing setting before the push. It extends the 19:02 bound, so it is his to sanction (items for steering, 4). |
| 2, 3, fixer/reviewer/devops | Nothing by hand: export rebuilds under `systemd-run`, `npm ci` shims, lock classifiers, all scripted. The owner's three post-release flows (chain 3: site opens and sign-in, message list, a saved change survives a reload) are listed for him; not recorded as done | none | The look-only limbs (site opens signed in, list renders) are a test-account browser step. The save limb writes to production and stays his. |
| 4, devops post-deploy | Signed-out `curl` requests (scripted) re-run on his 18:45Z selection; CLI reads by hand with timeouts | in devops's $1.82 | Already scripted. The reviewer's `check-proxy-registered.py` (Next discovers the proxy in the build output) was handed to devops as a chain-local probe. As a step of devops's packaging run it would guard every later Next upgrade. |
| 5, devops post-deploy walk | A `browser-walker` helper drove real Chrome on the production alias: type, place a plain caret, Ctrl+X, read the text back. The first run was not completed (the profile was signed in, so there was no blank editor); the re-run passed 20:17Z. The clicked-emoji case was not walked | $0.30 (browser-walker row) | A pinned editor-walk runner (below) with a signed-out profile option. |
| 6, devops B-1 | `walk.js` (headless Chromium, by `browser-walker`): four editor lines on hooks.gg, leaf classes and computed colours read back; PASS 22:55Z | $0.15 | Already a script, but chain-local under `verification/fix-decorator-offsets/devops/walk/`. Lifted into the editor-walk runner, every editor chain (9c-9f, nested-styles) could reuse it. |
| 6, QA Phase 2 | Nothing by hand: sentinel oracle, mutation sweeps (`mutation-run.py`, a Haiku helper $0.02), a jsdom mounted-editor probe | $10.77 for the QA session | The review corpus (36,000 rows), grammar oracle (7,137 rows) and QA's scorer are chain-local. As a standing differential instrument (website suite case or record tool) they would give the fixer the check that found CR-1, CR-5 and QAF-1 (recommendation 1). |
| 7, QA Phase 2 browser walk | Two `next dev --webpack` servers (ports 3417, 3418) stood up by hand from `git archive` exports of tip and base, with dummy settings and no database; the harness page took three fixes; the first attempt was discarded as non-evidence; a `pkill -f` killed its own shell (QA document, digest) | $0.44 + $0.32 (browser-walker rows across two QA sessions) | `agent-output/tools/uat-local-stack.sh` exists, but it is the UAT database stack, not a dummy-valued dev server of a SHA. The previous batch's recommendation 6 (a dev-server-of-a-SHA recipe) covers this and is named, not re-proposed. Sighted again here. |
| 7, devops B-1 | `browser-walker` on hooks.gg: paste `x🙂 abcdefghijklmnopq` with a real clipboard, then two guidance limbs; PASS. The code-line limb ran on a plain line because a typed fence opened no code block signed out | $0.19 | The editor-walk runner (paste, read back). |
| 7, unverified | Guild-emoji picker and mobile IME, carried by 5b19c3e4 | none | See What Didn't 7: the test-account browser may drive the picker. IME stays the owner's phone. |

**The editor-walk runner** (recommendation 6): chains 5, 6 and 7 each composed a browser walk of the same editor: type or paste, place a
caret, key chord, read text and leaf classes back, save nothing, signed out. Each time a helper got a fresh step list and a harness
built from scratch. A pinned runner under `~/.claude/tools/` would take a step file and a base URL and write per-step JSON. It would turn
the next four editor chains' post-deploy rows into one command each. A search of `~/.claude/tools/` and the record's `tools/` (09:0xZ)
finds no browser or walk runner.

## Lessons Learned

1. **A fix to a function over a grammar needs a differential, not examples.** In three editor chains the blocking defect was a shape
   the fixer had not listed, and a seeded base-versus-fix corpus found it within minutes of the reviewer running one.
2. **When a fixer chain is re-scoped from an instance to a class, its shape has changed.** The decorator went from 18 to 111 lines and
   gained a write-set file at 20:44. The rounds that followed were the cost of a rewrite run as a fix.
3. **A single-lane tree turns one outside fault into a queue-wide stall.** The amendments that helped were the ones that took work off
   the lane: a sibling repository's half, a branch while `master` was failing.
4. **A gate that refuses one form of an act and passes another teaches the passing form.** The record-write gate refused `sed` and
   passed python heredocs. The stamp gate reads Edit/Write content only (its header), and a typed stamp reached a commit anyway in chain 6.
5. **An "it cannot be driven here" premise needs a search of the installed instruments behind it**, the same as a negative existence
   claim does.
6. **A deploy-platform read that hangs is a missing tool, not bad luck.** It hung in five of seven chains.

## Recommendations (each naming the file it would change)

Each is for pi, on the owner's scheduling, unless marked as an item for steering. Each names the chains it was sighted in.

1. **`~/.claude/agents/fixer.md`** (Test step): where the change is to a function over the editor's markdown grammar or normaliser
   (`decorator.tsx`, `withNormalizeNode.ts`, `getInitialValue.ts`, the parsers), the fixer runs a seeded base-versus-fix differential
   over every node kind before handoff and records the right→wrong count, which must be 0. Sighted in chains 5, 6, 7.
2. **`~/.claude/agents/steering.md`** (Fixer paragraph, re-scope rulings): a ruling that widens a fixer chain from an instance to a
   class, or past the 20-line line at a stroke, re-decides fixer versus plan in the same block and records why. Sighted in chain 6
   (block 20:44).
3. **`~/.claude/agents/devops.md`** (Phase 2D): every chain document that Stage 1 closed `Committed` (code review, QA) is brought to
   `Released`, with its `Status-Detail`, in the release round. Sighted in chains 4, 5, 7; done right in chain 6.
4. **`~/.claude/tools/record-write-gate-hook.js`**: judge the resolved write target, not the command text. In this run three helper
   shell writes to this session's scratchpad were refused because the command named record paths (disclosed under Cost). And close the
   python-heredoc and python-in-place forms that passed in chains 2, 6 (steering) and 7. Sighted in chains 2, 5, 6, 7.
5. **`~/.claude/tools/stamp-gate-hook.js`** and **`document-lifecycle/SKILL.md`** (Document Header Format): every chain typed estimated
   minutes, and the gate refused at least 14 of them. Make `{now}` through `record-edit.js` the only form for a changelog row (today it
   is "by default"), or extend the gate to the Bash writes that reach record markdown. Chain 6's seven rows show a stamp the gate never
   saw. Sighted in all seven.
6. **A new `~/.claude/tools/` editor-walk runner, named in `~/.claude/agents/browser-walker.md` and `devops.md`'s post-deploy read**: a
   step file (type, paste, caret, chord, read text and leaf classes) against a base URL, signed-out profile, per-step JSON, nothing
   saved. Seeded from chain 6's `walk.js`. Sighted in chains 5, 6, 7.
7. **A new `~/.claude/tools/` Vercel read, named in `devops.md`'s post-deploy reads**: one command that returns the production alias's
   deployment id, state and built-from commit. It runs under `timeout`, stdin closed, a fixed retry, and the look-only bound of the
   19:02 selection. Sighted in chains 3, 4, 5, 6, 7.
8. **`~/.claude/agents/qa.md`** (Assumption Not Checked) and the **`handoff` skill**: a path recorded as not drivable on this box names
   the instruments searched (skills and tools) and why each cannot drive it. Sighted in chain 7 (5b19c3e4 against the
   `discord-test-browser` skill).
9. **`~/.claude/agents/steering.md`** (brief composition): each hazard or scope premise in a brief carries the read it rests on
   (`path:line` or the probe), and a brief that leans on an architecture passage greps the architecture record for the touched file
   names first. Sighted in chain 4 (hazard 3), chain 2 (L277), chain 6 (L238 in the closure line).
10. **`~/.claude/agents/steering.md`** (Order, shared trees): where one outside fault blocks the single-lane tree, the queue's next
    chains open on branches up to their review approvals. Chain 3's website half did this at block 23:58, and it is not yet the
    written rule. Sighted in chains 3, 4, 5, 6.
11. **`~/.claude/agents/devops.md`** (Stage 1): for a Vercel-deployed repository, a names-only check that the production settings
    `src/env.mjs` requires are present, behind the owner's sanction (items for steering, 4). Sighted in chain 1.

The previous batch's recommendations 6 (dev-server recipe) and 7 (Discord-command browser step), and the four steering-hooks entries
already in `~/.claude/agents/INBOX.md` (context-threshold stop, no clear requests, folder trust, devops push-only evidence), are not
re-proposed.

No handoff is created: no recommendation is for the effort's next chain alone. The instruments in recommendations 1 and 6 serve every
queued editor chain (9c-9f, nested-styles) equally.

## Cost

Readouts: `python3 ~/.claude/tools/cc-usage.py chain <chain> --since <determination> --until <release>`, run 08:5xZ-09:0xZ, raw output
in `verification/fixes-2026-11-23-steering-hooks-fixer/cost/`. Windows, in UTC:

| Chain | Window | Sessions | Requests | $ |
|---|---|---|---|---|
| fix-delete-dead-cron | 11-21 20:26 to 11-22 17:06 | fixer 4.50, reviewer 4.09, devops 4.72 | 374 | 13.32 |
| fix-api-extractor-devdep | 11-22 04:58 to 07:25 | fixer 1.79, reviewer 1.95, devops 1.30 | 119 | 5.05 |
| fix-git-dependency-pins | 11-21 22:58 to 11-22 17:08 | fixer 8.85, reviewer 5.06, devops 5.29 (incl. general-purpose-sonnet 0.19) | 446 | 19.21 |
| fix-middleware-dead-matcher | 11-22 17:15 to 18:50 | fixer 3.03, reviewer 2.25, devops 1.82 | 160 | 7.09 |
| fix-cut-collapsed-caret | 11-22 18:49 to 20:19 | fixer 4.49, reviewer 2.43, devops 2.05 (incl. browser-walker 0.30) | 218 | 8.97 |
| fix-decorator-offsets | 11-22 20:19 to 22:56 | fixer two generations 14.25 + 11.59, reviewer 11.06, QA 10.77 (incl. Haiku 0.02), devops 2.68 (incl. browser-walker 0.15) | 708 | 50.34 |
| fix-emoji-pretransform-widths | 11-22 22:59 to 11-23 08:48 | fixer 7.86, reviewer 3.72, QA two sessions 5.83 + 3.34 (incl. browser-walker 0.44 + 0.32), devops 3.13 (incl. browser-walker 0.19) | 470 | 23.88 |
| **Chains** | | 25 session rows | 2,495 | **127.86** |

- *Session sets and recoverability.* Every row resolved from the registry cache (live entries gone). No session is unrecoverable, and
  none outside the `*<chain>` and `*<chain>-<n>` forms belongs to a chain. Subagent usage is filed under its parent's row.
- *Mostly idle spans.* The chain 1 and chain 3 windows include devops sessions held across the overnight Vercel fault. How much of
  their $4.72 and $5.29 accrued while they were held is not separable from the readout.
- *Steering, in the batch window.* Window 11-21 19:02 to 11-23 08:48, captures `steering-hooks.txt` and `steering-hooks-fixer.txt`.
  The session renamed at 07:57Z on 11-22 appears under both names and is counted once.

  | Session | $ |
  |---|---|
  | `steering-hooks` [47cb8b91] | 33.43 |
  | `steering-hooks-fixer` [de89c5c3] | 32.93 |
  | `steering-hooks-fixer` [be654015], the 08:15Z respawn | 2.89 |
  | **Total** | **69.25** |

  Inside that total is work outside these seven chains: the scoping of chains 9c-9f and the thumbnail "not a bug" determination (ledger
  02:58Z-04:49Z), and the effort's queue and owner-queue upkeep.
- *$ per added production line.* `git diff --numstat` over each shipped range (09:0xZ). Production paths only: lockfiles, tests,
  generated `dist/` and deletions excluded; `package.json` counted.

  | Chain | Range | Lines | $/line |
  |---|---|---|---|
  | dead-cron | `0c14d5b..132a7ab` | 0 | n/a |
  | api-extractor | project-utils `40ba5d3..a47e683`, `package.json` | 1 | 5.05 |
  | git-pins | project-utils `749606d..40ba5d3` 1 + website `132a7ab..3859c29` 2 | 3 | 6.40 |
  | middleware | `3859c29..453de76`, `src/proxy.ts` | 19 | 0.37 |
  | cut | `453de76..8845b7e`, `onCopy.ts` | 5 | 1.79 |
  | decorator | `8845b7e..febf20e`, 111 + 17 | 128 | 0.39 |
  | emoji | `febf20e..0411d3b`, 7+9+15+16+31+5 | 83 | 0.29 |

  Total 239 lines: **$0.53 per line** on the chains' own spend, **$0.82** with steering.
- *Disclosed, this run.* The first readout command ran past the 120 s foreground limit and was moved to the background by the harness;
  it completed with exit 0, and its seven outputs are the captures above. Three of this run's helpers reported a shell write to their
  scratchpad digests refused by the record-write gate. Each re-issued the write with the Write or Edit tool, which is the gate's stated
  remedy, and nothing under `agent-output/` was written by them.

## Handoff

- **Architect** (recommended next): three chains left architecture lines that are now stale, and steering lodged entries for them in
  record `INBOX.md`: L172 (cron), L234 (the `middleware.ts` problem row) and L121/L166/L236-237 (pins). Two further passages bear on the
  queue:
  - L238 (the decorator's `_emitter` walk) is the passage the nested-styles chain will edit beside.
  - L277's `dist/` file count ("13 files") is now 11 after chain 3; review and devops of chain 2 noted it, and it was not routed.
- **Items for steering-hooks-fixer:**
  1. Give chain 4's CR-1 (`/preview` matcher entry) a record carrier: a `TODO.md` item like `fix-decorator-nested-styles`'s. Today
     only rulings block 17:40 and the docket hold it (What Didn't 6).
  2. Handoff 5b19c3e4, owned by this thread: check whether the `discord-test-browser` test account can drive the guild-emoji picker
     limb before leaving it on the owner's phone (What Didn't 7). The IME limb is unaffected.
  3. The shared website tree's stale `.next/types/validator.ts` (2 `cron` matches, mtime 2026-11-20T06:11) forces every website chain's
     typecheck into an export. Effort block 04:50 expected a build to regenerate it, and none has. Deleting gitignored build output in
     the shared tree is yours to rule.
  4. Recommendation 11's settings-names check extends the owner's 19:02 look-only bound. It is his to sanction, and yours to put to
     him in his form if you take it up.
  5. The record `.gitignore` `*.log` rule has now dropped evidence in four chains (record `INBOX.md` L330, L338, L365; chain 3's
     renames). The rule and its fix are the record's, not pi's.
  6. Recommendations 1 (a standing differential instrument) and 6 (the runner) need their seeds lifted from
     `verification/fix-decorator-offsets/` (review corpus, grammar oracle, `walk.js`). Placing a website suite case is a product change,
     yours to route.
  7. Chain 2's CR-1 (statbot-utils) and CR-3 sit in uncommitted INBOX lines in two records. Committing either is that record's owner's;
     this document does not.
  8. Chain 6's implementation rows 605-611 (stamps after their commits) are already lodged by devops (record `INBOX.md` L377). This
     retrospective does not correct another stage's closed record.
  9. Open carriers named here and left as they are: 9f04d154 and 4bc9b626 (his Cron Jobs read), 3039bc8a and b1fdd41a (his request-log
     read), b47e8a79 and 02a4cca1 (their own triggers), 5b19c3e4 (above).
- **Roadmap:** nothing cited and none owed.
- **pi:** this document rests at `Active` until pi processes it on the owner's word.
