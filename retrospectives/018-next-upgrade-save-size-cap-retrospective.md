---
ID: 018
Origin: 018
UUID: 6273a762
Status: Active
Status-Detail: "Written after chain 018's close-out (every stage document terminal and in closed/; website master 7923a1d to d1bb9b0, released 2026-11-20T08:07:52Z; post-deploy carrier Addressed). Rests until pi runs on the owner's command."
---

# Retrospective 018: Next.js 16.4.6 and the save-list cap (H-002, M-001)

**Plan Reference**: `agent-output/planning/closed/018-next-upgrade-save-size-cap.md` (revision 8, Released)
**Date**: 2026-11-20
**Retrospective Facilitator**: retrospective (`retrospective-018`, a subagent of `steering-roadmap-hooks`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T13:57 | steering-roadmap-hooks (spawn brief) | Retrospective of chain 018 from the record alone | Written. Value delivered: YES. Seven recommendations, each naming the file it would change. Cost readout: $233.60 from the determination to the release, across the 018 family, security and steering. Captures are under `verification/018/retrospective/`. |

## Summary

**Corpus**: This retrospective read the agent-output record at agent-output `52dcdab`, plus the working-tree selection-ledger day file `steering/selection-ledger/2026-11-20.md`, which is uncommitted. From that record it read:
- the plan, with its Decisions Register and changelog;
- every closed stage document carrying 018: implementation M1 to M4, code review, critique, architecture findings, QA Phase 1, QA M1 to M4, UAT, security audit and deployment;
- the release-tip QA record `qa/closed/website-7923a1d-d1bb9b0-release-tip-qa.md`;
- the closed post-deploy and R3 handoffs, and the four open carriers named in the brief;
- steering's `018-rulings.md`, `website-deps-review-rulings.md` (blocks 01:59Z to 03:08Z) and `018-brief-common.md`;
- `architecture/website.md` and the 018 rows of `system-architecture.md`;
- `INBOX.md` (the uat-hooks-018 sign-out entry).

`agent-output/roadmap/` holds only `.gitkeep`, so no roadmap was read and none is cited.

Three `general-purpose-sonnet` helpers extracted process facts from the large stage documents, with file:line cites. Their working notes are in this session's scratchpad. Every figure a recommendation rests on was re-read from its source document, or re-derived at the tool it names (convention-check.js, tdd-check.py, mutant-gen.js).

Outside this corpus, and so unverifiable-by-construction rather than refuted:
- anything ruled in conversation and not lodged;
- what any session carried between its own clears, including steering's own resets: the cost readout shows three steering sessions in the window, and the rulings file records none of the switches;
- session transcripts, which were not read;
- the H-001 fixer chain beyond the rulings blocks it shares with this chain.

**Value Statement**: "As the operator of hooks.gg, I want the site on a Next.js release that carries no advisory the dependency review found reached, and I want a signed-in save that sends an oversized list to be refused with one error for that list, so that neither a crafted App Router request nor one oversized list in a save can make the server spend seconds of CPU and hundreds of megabytes building an error." (plan § Value Statement; the lint move M3 is stated there as buying nothing at runtime).

**Value Delivered**: YES. Authority for this: the closed post-deploy carrier `handoff/closed/018-next-upgrade-save-size-cap-post-deploy-2026-11-20.md` and `security/closed/018-next-upgrade-save-size-cap-security-audit.md`, both re-read at this write.
- Production serves Next 16.4.6 (B-7 PASS, 13:37:23Z).
- On hooks.gg, a 50-invalid-embed save is refused with **1** issue, where the base gave 51 (B-6 PASS, 13:45Z).
- Code-block highlighting and the recent-messages list hold in production (B-10 and B-8 PASS).
- Security closed H-002 and M-001 at the released commit.

**Implementation Duration**: 2 h 15 min, from implementation start on revision 5 (04:33Z, after every pre-code gate approved) to UAT APPROVED FOR RELEASE (06:48Z). For comparison:
- determination to release was 5 h 15 min (02:53Z to 08:07:52Z);
- release to close-out took a further 5 h 47 min (to about 13:55Z), 5.5 h of it a single unanswered permission prompt (below).

**Overall Assessment**: A well-gated chain that delivered on the day it was opened, with one code-review rejection and no QA failure.
- The pre-code gates earned their cost. Critic, architect and QA each independently caught the revision-6 `tsconfig` `paths` entry, which dropped highlight.js from the bundle while build, typecheck and suite all stayed green (critique F-21 CRITICAL, AF-10 HIGH, QAF-10 HIGH).
- The release-check preview the owner chose caught a version instrument that would have failed falsely at release (UAT-1).
- Three costs stand out:
  - a wrong premise in a steering option, which put one question to the owner twice;
  - eight plan revisions, against eight critic passes on the costliest model in the chain;
  - a housekeeping step that sat between the release push and the post-deploy reads, which turned a 08:08Z release into a 13:55Z close-out.

## Timeline Analysis

This section carries the finding the summary rows cannot: where the elapsed time went.

| Window (UTC, 2026-11-20) | Span | What happened | Source |
|---|---|---|---|
| 02:53 to 03:08 | 15 min | Scoping determination; three scope questions put, first in plain text, then as a selection | `website-deps-review-rulings.md` blocks 02:53Z to 03:08Z |
| 03:11 to 04:33 | 1 h 22 min | Plan revisions 0 to 5; critic passes 1 to 5; architect; 5 QA Phase 1 re-keys; two owner prompts (03:25Z, 04:11Z) | plan changelog; `018-rulings.md` 03:25Z to 04:33Z |
| 04:33 to 06:20 | 1 h 47 min | M1 to M4 implemented. M2 forced revisions 6 and 7 mid-implementation, and steering capped M2 at 05:26Z. Code review rejected M1 once (CR-1 HIGH, 05:35Z) and approved the fix at 05:43Z. Fold to revision 8 and the `zod` pin. Effort-final QA PASS at `d1bb9b0` (06:19Z) | plan R-4 to R-21 |
| 06:20 to 07:17 | 57 min | Release-check preview READY (06:22Z); UAT APPROVED (06:48Z); security APPROVED (07:04Z); devops Stage 1, Phase 3 and the release ask (07:17Z) | deployment changelog |
| 07:17 to 08:07 | 50 min | Push held for P-1's 08:07Z decisive read (X-12) on the owner's selection | deployment § User Confirmation |
| 08:07:56 to about 13:36 | about 5.5 h | devops held on a Claude Code permission prompt for runbook step 5 (branch deletion, including `git push origin --delete` of the release-check branch). Runbook steps 6 to 8 (the serving read, B-7, the ledger fill and cueing UAT and QA) waited behind it. An owner-wait alert went out at 08:19Z and a selection at 09:2xZ was answered by 10:05Z, but the pane prompt itself stayed open at 10:05Z | `018-rulings.md` blocks 10:05Z, 13:41Z; deployment § Release Date ("five and a half hours of session time passed between two calls") |
| 13:36 to 13:55 | 19 min | B-7, then B-6 and B-10, then B-8; reconciliation; security close; carrier closed | post-deploy carrier changelog |

## What Went Well and What Didn't (process focus: workflow, collaboration, quality gates)

**Went well**

- **Independent pre-code gates each caught a defect the automated checks could not.** The revision-6 `paths` entry made `highlight.js` `undefined` in the built bundle while build, typecheck and suite stayed green. The critic (F-21), the architect (AF-10) and QA (QAF-10) each found it by their own run, and revision 7 removed it. Revisions 2 to 5 were critique, architecture and QA driven and fixed the mechanism before code: the abort form, the per-site population and the error cap's unit (F-17). The one HIGH that reached code review (CR-1, a capped refusal using zod's default wording) was fixed in one round of about 8 minutes (plan R-9, R-11).
- **Steering's refutation habit held up.** Each owner premise was put to a `general-purpose-sonnet` helper briefed with the conclusion alone: ESLint 8 and 16.4.6 (03:25Z), the preview build (04:11Z), the within-bound residue (04:11Z) and the union count (04:16Z). The within-bound run (48,500 issues from 707 KB with every list inside its bound) turned into the owner's D-9, the error cap. Without it, M-001 would have closed with a 13 MB error still buildable.
- **The milestone cap worked as written.** It fired on M2's second post-approval revision (05:26Z, with spend and hours reported). CR-2 and the later below-HIGH items then went to one Planner-batch fold (revision 8) instead of separate rounds. The fold, the `zod` pin, its review and the effort-final QA ran in 13 minutes (06:06Z to 06:19Z).
- **The release-check preview paid for itself.** UAT ran the planner's B-7 version instrument against the preview and found it fetched only `/_next/static/chunks/`. At 16.4.6 every script is under `/_next/static/immutable/`, so the release read would have failed falsely and passed "16.1.6 = 0" vacuously (UAT-1; the carrier's B-7 instrument cell).
- **Verdict identity was clean.** UAT, security, effort-final QA and QA Phase 3 all name `d1bb9b0`, the deployed commit, with tree equality re-derived by devops (deployment § Reconciliation). The sequencing against P-1 (X-12) was devops's own catch and was put to the owner with its cost.

**Didn't go well**

- **A steering premise was cited from an outcome, not from its mechanism, and one owner question was put twice.** The 03:08Z "Preview" option told the owner that a branch push makes a Vercel preview, citing two READY previews from 2026-11-19. Those previews were built from `probe/017-waituntil`, whose only change was a `vercel.json` build-skip command. The critic found this at F-1 (`018-rulings.md` block 03:59Z, which records it as the thread's error, with the README read that would have caught it). The question went back to him at 04:11Z with four options. The read behind the premise was real (a `vercel api` listing), but it read the outcome (READY), not what produced it. This is the same family as the hazards record's "instrument measured something adjacent". In the same window, the earlier H-001 fixer chain's 01:59Z "Unused deps" premise was also taken from another document's claim and re-put (block 02:03Z). That is two re-puts in one steering window, both on premises carried from another party's prose.
- **A permission-gated housekeeping step sat between the release and its evidence.** The devops runbook (deployment § Runbook) put step 5, deleting the chain and release-check branches including a remote `git push origin --delete`, before step 6 (the serving read), step 7 (B-7) and step 8 (filling the ledger and cueing UAT and QA). The user setting `Bash(git push:*)` asks before any push. The prompt opened at 08:07:56Z with the owner away. Production was serving the release from 08:07:54Z, but nothing confirmed it or read the post-deploy rows until 13:37Z. The chain itself created the remote branch: the release-check design (D-8) leaves a branch to delete, and the Phase 2B ask (ledger 07:17Z) did not say that a second permission prompt would follow the push.
- **Plan churn and pass count.** There were eight revisions in under three hours. The critic made eight passes and QA Phase 1 seven re-keys, and the architect re-read most revisions. Revisions 6 and 7 rewrote M2 after implementation had started on revision 5, when the implementer's M2 report surfaced the `moduleResolution` need. The critic sessions ran on the `fable` tier and cost $62.76, a third of the 018 family's $182.18 to release, for 59 + 81 requests. The first critic pass ran at xhigh by the determination's order. Steering's block 03:34Z says the critic was to be set to medium once that pass was committed, but no later block records the change, so the effort level of the second session ($27.13) is not known from the record.
- **The local-build sign-out broke the post-deploy reads.** UAT pressed "Log out" on a local build at about 06:28Z. `.env.local` carries production's Discord client id, so the sign-out's token revoke ended the test account's hooks.gg session. At 13:38Z B-6's first read came back 401, and B-8's first walk found the session signed out. B-8 then took three walks, one more of them on message numbers with no row. The mechanism is stated in `INBOX.md` (uat-hooks-018 entry); the full revocation chain is inferred there, not proven.
- **Tooling gaps forced hand substitutes in four documents.** Each gap was checked at the tool itself:
  - `convention-check.js` skips its ID-token and basename checks on this workspace. Its pinned `HOOKS_CLASS_LINE` (line 91) lacks `qaf`, which the workspace `CLAUDE.md`'s class now carries, so the "does not implement verbatim" skip at line 393 fires. The implementer and the reviewer each substituted a hand `grep -E` (M1, M2, M3, code review).
  - `tdd-check.py` refuses `.ts`/`.tsx` sources (line 39, `NOT_PYTHON`), so the TDD rows of the only tested repository were read by hand.
  - `mutant-gen.js` has no `??` operator (0 occurrences), so four mutants of the M1 fix were hand-made.
- **Typed stamps and shell appends kept hitting the record gates.** The stamp gate refused a typed minute (future-dated, or a placeholder) in the architect's work (04:16 and 06:12), QA M1, QA Phase 3 and steering's 13:41Z heading. QA Phase 1 also corrected two minutes it had typed ahead of the clock. The record-write gate refused steering's shell appends (04:16Z, 07:13Z). That is seven gate refusals. The critic wrote a pass with an in-place python script and security appended `INBOX.md` with a heredoc; no gate refused either, and both disclosed it. Each refusal was satisfied and disclosed in the round, so the controls worked. But nine first writes across five sessions (architect, QA, steering, critic, security) went out in a form the lifecycle skill already forbids.
- **An rtk usage message reached the owner as a question.** UAT left "whether it was a workaround" to him for a helper's `find … -delete`, which rtk's filter had refused with its own remedy ("Use `find` directly"). Steering read the helper's transcript, found no control involved, and still had to put it (06:50Z), because the global `CLAUDE.md` makes that call his. He chose "Not a workaround".
- **An open carrier is not routed.** `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md` carries `Owning-Stage: Unassigned …`. `references/documents.md` says that without an owning stage a handoff "is not routed". It holds security's L-001, the one measured residual of M-001's class: one tRPC batch carries about 1,050 capped saves.

## Testing by Hand (QA, and UAT where the chain ran it: what ran by hand, its cost, how it could run unattended)

No document states wall time or tokens per walk. The figures below are the cost readout's session rows and the documents' minute stamps.

| Segment | What ran by hand | Cost (record) | How it could run unattended |
|---|---|---|---|
| QA Phase 1 | Production base reads at 04:09Z: the session read, a 50-embed `message.upsert` (51 issues), and `window.next.version`. A `/preview` read at 05:22Z. The B-8 minting read waited because another session held the browser | QA sessions $15.32 + $13.80 (Phase 1 and re-keys, mixed with Phase 2) | The HTTP reads are curl-with-session-cookie scripts. `verification/018/uat/preview/m5e-version-read.sh` already covers the version read. Worth building: one `prod-base-reads.sh` taking the cookie from the stage browser's profile, so a base read and its post-deploy twin (B-6, B-8) run as one script |
| QA Phase 2, M1 to M4 | Scripted end to end (`verification/018/qa/m*-phase2/run.sh`, isolated exports, own installs, differential, mutation sweep through `mutation-run.py`). Hand steps: re-targeting NM-4 after a line wrap, one `ts-node` key mutant, the R6 re-read of installed `next` | in the QA rows above | Already unattended; nothing proposed. The hand mutants are the `mutant-gen.js` gap (Recommendation 5) |
| QA Phase 3 | No suite. One handoff-trigger sweep `phase3-open-handoff-triggers.py`, written for this pass because no record tool sweeps open handoffs' triggers | $1.31 (the third QA session) | Lift it into the record's `tools/` as the standing open-handoff trigger sweep that Phase 3 and devops step 1b both run |
| UAT (06:20Z to 06:48Z) | Four `browser-walker` helpers drove walks A, B1, B2, C and D (plus a planted control): Discord sign-in, JSON-view paste base vs tip, Save As and Save, the capped refusal over HTTP, highlight.js counts, and the leave-page and R5 flows under CDP throttling. Tip and base exports built and served by hand, the local stack up through `tools/uat-local-stack.sh`, an S3 stub | UAT $7.35 own + $1.97 browser-walker (181 requests) | The record has no pinned browser runner (`tools/` holds only the stack script and the record checks). Worth building: a Playwright script over the kept Chrome profile for B-1, B-2 and B-9, whose DOM reads already exist as JS snippets (`b9-hljs-count.js`); the HTTP limb of B-2 as a curl with the session cookie; B-4, M5-c and M5-e as curl scripts (M5-e exists). Discord sign-in is the blocker for full automation, so the runner starts from a signed-in profile and fails fast on a signed-out session |
| Post-deploy (13:37Z to 13:48Z) | B-6 by hand (first read signed out, re-signed through Discord's authorise page). B-8 by three walks (signed out; rowless message numbers; then PASS). B-10 by `browser_evaluate` | part of the $17.82 the 018 family spent after 08:08Z | The same runner, with a session pre-check as its first step. The signed-out failure that cost two of the four post-deploy attempts would then stop in one line, not in a walk |

## Lessons Learned

1. **A premise read from an outcome is not a premise about the mechanism.** "Two READY previews exist" was true, but "a branch push makes a preview" did not follow from it. The read must reach what produced the outcome: the commit and config that built it. The global rule "Check what your options say before you ask me" was followed in form, which is why this is a lesson and not a lapse of attention.
2. **Order a runbook by what the release owes, not by tidiness.** Steps that produce release evidence or cue readers go first after the move. Housekeeping goes last, and a step that will raise a permission prompt is named in the release ask.
3. **Gates working on independent instruments find what green suites cannot.** Here, three gates on three separate runs each caught the bundle-level highlight.js loss. That independence is worth its cost on a framework upgrade. On a plan that needs no re-run per revision, it is costly: eight critic passes.
4. **A test account shared with production is production state.** A sign-out on a local build is a production act when the Discord app is production's.
5. **A tool that silently skips is a gate that is not there.** `convention-check.js` printed a skip, four documents recorded "unchecked by the tool", and every one did the check by hand. The fix is one line in the tool.

## Recommendations (each naming the file it would change)

Each reaches its stage through pi, on the owner's scheduling.

1. **`~/.claude/agents/devops.md`, Phase 2C (Release Execution).** Add one rule: after the move, the serving read, the version read and the ledger fill with reader cueing run before any housekeeping step, such as deleting a local or remote branch. Also: the Phase 2B ask names every further act of the runbook that will raise a permission prompt, so the owner stays for it or answers it in the same sitting. Sighted: chain 018, where 5.5 h passed between the push and the first post-deploy read.
2. **`~/.claude/agents/steering.md`, Prompting the owner (option premises).** Add one sentence: a premise about how a mechanism behaves (a build, a deploy, a preview) cites a read of the mechanism or of the provenance of the artifact cited (its README, its commit's diff), not only the outcome's existence. Sighted: chain 018 (03:08Z "Preview", re-put 04:11Z). The H-001 fixer chain in the same window (01:59Z "Unused deps", re-put 02:03Z) shows the same root at a different step.
3. **`/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Local builds of `website` — before the first save"** (the owner's file, so this is his to word). Add beside the message-id rule: a local walk signed in as the test account does not press Log out, because the local build revokes the token with production's Discord app. The `INBOX.md` entry of uat-hooks-018 carries the mechanism. The same line belongs in `~/.claude/agents/browser-walker.md` for any walk the stage briefs on this workspace. Sighted: chain 018, B-6 and B-8.
4. **`~/.claude/tools/convention-check.js`, line 91 `HOOKS_CLASS_LINE`.** Re-pin it to the workspace `CLAUDE.md`'s current ID-token class line, which adds `qaf`. Add a test in `convention-check.test.js` that reads the live line, so the next drift fails the tool's own suite instead of skipping silently. Sighted: chain 018, M1, M2, M3 and code review.
5. **`~/.claude/tools/mutant-gen.js` (operator table, line 12) and `~/.claude/tools/tdd-check.py` (`NOT_PYTHON`, line 39).** Add the `??` and `||` swap pair to `mutant-gen.js`. For `tdd-check.py`, either extend it to TypeScript sources or have `implementer.md` and `code-reviewer.md` state that its TDD-row reading is by hand on TypeScript repositories, so it is not re-discovered each chain. Sighted: chain 018, M1 and code review.
6. **`~/.claude/agents/steering.md`, the common-brief template.** Add one line naming the record-write forms: Edit or `record-edit.js` with `{now}`, never a typed minute, heredoc or in-place script. The stamp and record-write gates refused the other forms seven times in this chain, and two more writes took them unrefused, across five sessions. The lifecycle skill already states the rule. The recommendation puts it where every stage reads first.
7. **`~/.claude/CLAUDE.md`, "A blocked action is reported, never retried in different words"** (the owner's file, his to word). Lodge his 06:50Z ruling that an rtk filter's own usage refusal, which names its remedy, is a gate satisfied by that remedy and not a control. Any stage could then disclose it without a question to him. Sighted: chain 018 UAT.

No recommendation is for the effort's next chain alone, so no handoff is created in this run. The routing gap on `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md` (`Owning-Stage: Unassigned`) is steering's to settle. It is named here and in the report to steering, not edited, because it is not this stage's document.

## Cost

The readout is `python3 ~/.claude/tools/cc-usage.py chain <suffix> --since 2026-11-20T02:53 --until 2026-11-20T08:08`, from the scoping determination to the release. Raw output is in `verification/018/retrospective/`.

| Family | Sessions in window | $ |
|---|---|---|
| `*hooks-018` (`cost-018.txt`) | 18 resolved from cache: planner ×3 (the first named `planner-hooks-website-deps-upgrade` until the 03:2xZ rename), critic ×2, architect ×2, QA ×3, implementer ×3, code reviewer ×2, UAT ×1, devops ×2. Rows at $0.00 are cleared successors with no requests in the window | 182.18 |
| `security-hooks-website-deps` (`cost-deps.txt`) | Outside the 018 name family. One session with usage ([37e84afc], $28.25), which also carried the dependency review's own updates in this window | 28.25 |
| `steering-roadmap-hooks` (`cost-steering.txt`) | Three sessions with usage: [cc97952f] $9.02, [295810e9] $11.05, [3776c96c] $3.11. 11 of 12 resolved; **one unrecoverable**. The row also carries steering's work on other chains in the window: 017's looks walk and the P-1 carrier of `fix-message-page-header-decode`. A same-named `steeering-roadmap-hooks` row (seen 2026-11-19) is from an earlier effort and is $0.00 here | 23.17 |
| **Total, determination to release** | | **233.60** |

Subagent usage is filed under its parent's row: the planner's `general-purpose` and `general-purpose-sonnet` helpers ($1.44), UAT's `browser-walker` ($1.97), devops's refutation helper ($0.09), the implementer's `web-fetch` ($0.01), QA's helpers ($0.02), and steering's refutation helpers ($0.45 + $0.18).

After the release, the 018 family spent a further $17.82 to close-out: $200.00 to 13:55Z (`cost-018-close.txt`). That covers the post-deploy reads, the architect's reconciliation and devops's close.

The $ per added production line is computed from `git -C website diff --numstat 7923a1d d1bb9b0` (`numstat.txt`; 18 commits, +1909 −1480):

| Class | Lines added | $ per line ($233.60) |
|---|---|---|
| `src/` production paths (`shapes.ts` 93, `user.ts` 7, `usePreferences.ts` 4, `constants` 2, `message.ts` 2, `global.d.ts` 1) | 109 | $2.14 |
| Plus config (`eslint.config.mjs` 185, `package.json` 11, `tsconfig.json` 3) | 308 | $0.76 |

The lockfile (+554) and tests (+1047) are excluded from both rows.

## Handoff

- **pi** (on the owner's command): Recommendations 1 to 7.
- **steering**: the `Owning-Stage: Unassigned` carrier named under Recommendations; then the roadmap obligation once this retrospective closes. The roadmap is absent; see the corpus note.
- **architect**: no recommendation. The architectural outcomes (A-4 "List bounds", the `zod` pin consequence, the Next 16.4.6 Problem Areas) were landed by the architect's closing and reconciliation passes (`system-architecture.md` rows 2026-11-20T06:12, 13:42; `website.md` rows 15, 16).
