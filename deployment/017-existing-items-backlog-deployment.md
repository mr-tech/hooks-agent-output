---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Status-Detail: "Stage 2, Phase 2A complete at website 787bec5 and generator 8512a1d: QA's release-tip record is Release Verified (agent-output c09fd41) and the architect's delta read is clear (eb46ec9). Phase 2B, his release approval, is next; no ref has moved and nothing is pushed."
---

# Deployment Record: plan 017 — the existing-items backlog (Stage 1, then Stage 2)

**Plan Reference**: `agent-output/planning/closed/017-existing-items-backlog.md`, `Revision: 11` (agent-output `a971ed8`), Status `Committed` at Stage 1 (R-62, `a1d670b`). The M5-0 probe record is the separate `deployment/017-existing-items-backlog-m5-0-probe-deployment.md` (`Active`; its closure is Phase 2D's, below).
**Commission**: `steering/backlog-2026-11-18-briefs/devops-hooks-017-stage1.md` (`cd16832`), common part `steering/017-brief-common.md`, both read whole. Steering's brief arrived; its forward-item sweep is below.
**Release Identifier**: proposed, assigned when each ref moves: website `master` `787bec5627702d2881b826e596ec2b8f8853c4fa`, generator `prod` `8512a1d003af7fdbce56b85ef27218dd885becd1`. The identifier is the SHA on each serving ref the release moves (website `master`, generator `prod`); no tag, and neither package carries a `version` field (below).
**Release Date**: pending his approval.
**Execution Mode**: not yet fixed (Phase 2A step 8). Website `master` and generator `prod` are serving branch moves by `release-move.js`, which Mode A runs in a session he sanctioned; this stage proposes Mode A for both, the generator's runner start being an owner step (plan § "Release and rollback").

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T19:14 | steering-roadmap-hooks → devops-hooks-017 (brief `cd16832`) | Stage 1 for plan 017 | Gates re-derived at the record (below); every pre-release register row terminal; plan at rest; release consistency checked; both trees clean of the chain's work and unmoved (website `7293a35`, generator `8512a1d`). Carrier handoff, scheduled readers B7R and B10R and their crontab lines created (smoke OK). Plan, 8 implementation, code-review, analysis, 9 QA and the UAT documents set `Committed` and moved to `closed/` (one commit each). No push, no merge. Disclosed: the stamp gate refused the carrier's first changelog row, typed ahead of the clock; re-stamped from `date -u` (a format standard satisfied). |
| 2026-11-19T19:23 | steering-roadmap-hooks → devops-hooks-017 (message, Stage 2 go; no approval carried) | Stage 2, Phase 2A | Phase 3 requested of qa-hooks-017 (message 4cccfcec, Resumption State 1925e56). Carrier F-7 added (UAT, event trigger). Packaging built at both tips (exit 0, 0); both rollback patches apply in reverse (exit 0); both `release-move.js` dry runs pass; two read-only pollers written, stub dry-run (7 of 7) and run live once; runbook, operational block and owner step written (below). Disclosed: a `git pull` run by mistake in the record repository (nothing to pull: up-to-date; no tree moved); the first consumer search was refused by a gate and re-issued once as a listing with absolute paths aimed at statbot-v3 and statbot-api src, its true target; the release-tip build script's first run wrote its logs to a relative path and failed (re-run with absolute paths, exit 0), and the generator packaging's first run had a mis-ordered `timeout` argument (exit 127, re-run). |
| 2026-11-19T19:55 | qa-hooks-017 → devops-hooks-017 (message, release-tip record `qa/website-7293a35-generator-8512a1d-release-tip-qa.md`, agent-output `4914aaa`) | Phase 3 verdict | **Release Verification Failed** (not passed to `release-move.js --qa-record`): QAF-29 MEDIUM, QAF-30 MEDIUM (test-only remedies, with `implementer-hooks-017`). Verdict section, runbook G9 and G10 rows and Next Actions updated. QAF-28 LOW (to devops): a read-only containment path exists (the deployed checkout's prod ref over `claude-ro`); instrument `verification/017/devops/read-generator-deployed-ref.sh`, baseline `read-generator-deployed-ref-live-baseline.txt` (exit 0, 1, 3, 0 as predicted), B-11 amended in the carrier. Nothing pushed; no ref moved. |
| 2026-11-19T20:04 | qa-hooks-017 → devops-hooks-017 (message: fix code-review APPROVED at website 787bec5, agent-output `a081c89`) | Re-derive at the new tip; request the fresh Phase 3 | Tips, trees, refs and fix scope re-read; packaging, rollback patch check and dry runs re-run at website `787bec5` (section "Re-derived at the new website tip"); W2 and W5 commands carry the new tip. Phase 3 requested of QA naming the assembled tip. The architect's delta read is still owed (a prerequisite below). Nothing pushed. |
| 2026-11-19T20:04 | architect-hooks-017 → devops-hooks-017 (message; delta read `eb46ec9`) | Architect gate at the release-tip fix | Gate clear at website `787bec5` (no finding, no production delta); recorded in "Re-derived at the new website tip", item (2). Open: QA's fresh Phase 3 only, then the readiness re-commit and Phase 2B. |
| 2026-11-19T20:10 | qa-hooks-017 → devops-hooks-017 (message; record `c09fd41`) | Phase 3 successor verdict | **Release Verified** at website `787bec5`, generator `8512a1d` (verdict section). Phase 2A complete: every plan Committed (one), verdict at the assembled tip, consistency, populations, packaging, workspace, history unrewritten, mode A, serving-ref order, operational block, runbook. Phase 2B ask put to him next (readiness section "Phase 2B"). Nothing pushed. |

## Stage 1 verification (devops.md Stage 1, steps 2 to 7)

### Stage start and gates (step 2, 2a)

| Gate | Document at a SHA | Anchor | Result |
|---|---|---|---|
| QA Complete | `qa/closed/017-existing-items-backlog-qa.md` (agent-output `cf69ef1`) | `Verified-At` website `7293a35`, generator `8512a1d` (plan-level, re-issued after M2's fix rounds 3 to 7); suite 1853/1853 exit 0, typecheck 0, M7-b 0 above base | `QA Complete`. This record carries the QA `Verified-At` forward; the binding freshness check is release-level (Phase 2A) |
| UAT | `uat/closed/017-existing-items-backlog-uat.md` (agent-output `f5f78b0`, plan R-61 `9cfc8f5`) | `Verified-At` website `7293a35`, generator `8512a1d`; pass 2 on a production build | `Release-Decision: APPROVED FOR RELEASE` (pass 1's NOT APPROVED at `4b8db9c` is expired). My stage start |
| Code review | `code-review/closed/017-existing-items-backlog-code-review.md` (agent-output `e324582`) | `Reviewed-At` `7293a35,8512a1d`, Round 10 | `APPROVED` |
| Security (preview-image-generator delta) | `security/017-preview-image-generator-security-audit.md` (agent-output `4ae4825`) | `Reviewed-At` `8512a1d`, base `8de2b53` | APPROVED, no required control; L-001 LOW accepted (X-21, D-32). Status stays `Active`: the audit's closer is the security stage, at chain closure |
| Architect closing pass | `architecture/closed/017-existing-items-backlog-architecture-findings.md` (agent-output `0fbb246`) | revision 11, website `7293a35`, generator `8512a1d` | `Resolved`, no finding open. If either tree moves before the pushes, a further architect delta read is owed first, and a QA verdict at the new tip |
| Critic | `critiques/closed/017-existing-items-backlog-critique.md` (agent-output `f580df0`) | `Artifact-Revision` 11, `Reviewed-At` `a971ed8` | `Resolved`, `APPROVED`, F-1 to F-29 resolved |

Tree identity, read this turn with `git -C <repo> rev-parse HEAD` / `branch --show-current` (the generator's tip taken from `rev-parse`, no `git log` or `show`): website `7293a3567f8166c6160f31fa4517674c6b19401e`, generator `8512a1d003af7fdbce56b85ef27218dd885becd1`, both on `chain/017-existing-items-backlog`, both equal to the gate documents' anchors. The effort's production delta between pass 1 and pass 2 is `git -C website diff --name-only 4b8db9c 7293a35` minus `__tests__`: `src/providers/MessageProvider/usePusher.ts` and `src/server/api/utils/shared.ts` only, which is what UAT's carry-forward of B-2, B-3, B-4, B-12 limb 2 and B-13 limb 4 rests on (re-derived here, not taken from UAT's text).

### Blocking-condition register (step 2b)

One register: `qa/closed/017-existing-items-backlog-qa.md` § "Blocking-condition register (chain 017)", with UAT's § "Blocking-condition register — execution state" authoritative on execution (QA's own State column is point-in-time and still says `open` for rows UAT executed). Every row classified observable pre-release carries a terminal state:

| Row | State | Result (source) |
|---|---|---|
| B-1 | EXECUTED | PASS at `7293a35` (walk 7; UAT pass 2); pass 1's FAIL (UAT-1) superseded by D-33 |
| B-2, B-3 | EXECUTED | PASS (pass 1, path unchanged at `7293a35`) |
| B-4 | EXECUTED | PASS (pass 1; save path smoke-checked at `7293a35`) |
| B-5 | EXECUTED | kept alive (devops's probe record, M5-0 limb 2) |
| B-12 | EXECUTED | PASS, limb 1 at `7293a35`, limb 2 pass 1 |
| B-13 | EXECUTED | PASS, limbs 1 to 3 at `7293a35`, limb 4 pass 1 |
| B-14 | EXECUTED | Lasts (devops's probe record, M5-0 limb 3) |
| B-15 | EXECUTED | PASS, two runs, production build at `7293a35` |

No row is NOT EXECUTED, blank or narrated without a state. Post-deploy rows B-6 to B-11 never block the release act; their carrier is `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md` (created at this Stage 1, named here for Post-Release Status).

### The plan is at rest (step 2c)

Every Planner batch row (11 of 11) is discharged (revisions 1, 8 and 9: M6-a, M7-c, the base move, X-23, M4-d's table, M4-a, M3's write matrix, M6-c, X-21, X-24, X-22). The critic's cycle 4 pass 2 is `Resolved` on revision 11; the architect's closing pass is `Resolved` on revision 11 and the trees above; no conformance pass is open. The plan carries no `OPEN QUESTION` unresolved (the critique's premises: 15 of 15 resolved at `a971ed8`).

### Roadmap

Not cited: nothing is read from it for this release.

### Release consistency (steps 3 and 4)

- Neither package carries a `version` field (`git show HEAD:package.json` in both repositories, `grep` for `"version"` returns none), so none is synthesised and no version artifact moves (plan `Target-Release`).
- Cross-repo references: the website's `project-utils` dependency is `github:hooks-gg/project-utils#master`, locked at `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f`, which is `origin/master` of `project-utils` today (`git ls-remote`); `paracord` is unchanged. The chain's only dependency change is website `package.json` +1 line (`@vercel/functions` `3.11.3`, exact) and `pnpm-lock.yaml` +80 lines, 0 removed (`git diff --numstat origin/master..HEAD`). The generator's `package.json` and lockfile are untouched (`git diff --stat origin/prod..HEAD` lists `src/generateImage.ts` and `src/server.ts` only). The website has no `.github/workflows` file (0 tracked); its deploy is Vercel's git integration on `master`. The generator's workflow lines are not read in this stage (named, not completed).
- Packaging is Stage 2's (Phase 2A step 5: a build re-run at the assembled tip, and the install under the deploy host's package-manager major for this lockfile change; the website's `packageManager` is `pnpm@10.28.2`).

### Workspace (step 5)

`git status --porcelain` in the website: `?? .playwright-mcp/` only (not the chain's, left, as briefed). Generator: clean. Record repository: nothing of the chain's plan scope uncommitted; `verification/017/` shows one untracked directory, `steering-refute-o1/`, which is steering's own capture for O-1 (named; it goes back to steering to commit). The record's `INBOX.md` carries others' uncommitted entries (not touched).

### Committed state (step 6, 7)

On a chain branch, the standard arrangement: the work is committed there by the implementer. Recorded: website `chain/017-existing-items-backlog` tip `7293a3567f8166c6160f31fa4517674c6b19401e` (32 commits ahead of `origin/master` `1ad625e`, a fast-forward: `merge-base --is-ancestor` exit 0), generator `chain/017-existing-items-backlog` tip `8512a1d003af7fdbce56b85ef27218dd885becd1` (1 commit ahead of `origin/prod` `8de2b53`, a fast-forward: exit 0). Neither branch has an upstream. **No push and no merge to a shared branch was made.**

### Closed documents (step 8)

Closed `Committed` with the chain-branch tips as the identifier in `Status-Detail`, one changelog row each, one commit each: planning (R-62, `a1d670b`, then the move), analysis, code-review, implementation M1 to M8, QA M1 to M8 and the plan-level QA, UAT. Each carried `## Resumption State` replaced by its one closing line (analysis, code-review, M3, M4, M5, M7 implementation, plan-level QA, plan). Already closed before this stage: the critique and the architecture findings. **Still open, by design**: the security audit (`Active`; the security stage closes it at chain closure, and its two observations outside the reviewed delta are with steering as an owner-needing scope item); the M5-0 probe record (closed with this record at Phase 2D). The release-tip QA record (Phase 3) does not exist yet.

### Forward-item sweep (the brief's list; Phase 2D step 5c's start)

Instrument: `verification/017/devops/assumptions-extract.md`, every section headed "Assumption Not Checked" by heading in the QA, UAT, code-review, implementation, plan, critique, analysis and architecture documents (18 sections; the UAT and the security audit carry none by that heading). Decisions Register and R-1 to R-61 were read in the plan; steering's `017-standing.md` and the rulings blocks from 17:49Z to 19:13Z were read.

- **Discharged by UAT's pass 2** (read at its document): QA's Pusher-delivers-to-sender, M2 one-handler-per-provider, M3 native `storage` event across tabs, M4 lone-prompt focus, M4 headlessui two-dialogs, M8 Enter-on-Button and RK-11, code review Rounds 2 to 5, 9, 10 and QAF-27, B-15's build kind.
- **Carried to production** (named in the carrier handoff, F-1 to F-6): Postgres `server_version`/clock (RK-9; no database read from this box); the Preview-versus-Production function limit; the `previewImageNonce` column type; Spaces `LastModified`/addressing; the `/preview` fallback line; UAT's O-1, which he settled by selection at 19:13Z ("Agent: release, watch prod"): B-6 and B-10 carry it.
- **Carried to QA Phase 3 at the release tip (Stage 2, Phase 2A step 3)**: the M1 fresh install against the lockfile, the M7-b re-lint on the merged tip (code review Round 8), `mutant-gen`'s call-deletion set (QA effort-final).
- **Uncarried, stated limit**: the M8 QA assumption that focus stays inside a closing headlessui panel through its 75 ms leave was owed to UAT at B-13 as "a look at `document.activeElement` straight after closing the image dialog with Enter"; UAT's record carries no such look. Consequence if false: QAF-22's closing-window case specifies a guard no user can reach; the plan's property stands either way. It is named to steering in the Stage 1 message, not given a post-deploy carrier (no production instrument sees it).

### Record checks

`node tools/check-repo.js` after the closures: exit 1 on 4 problems (260 total, 256 baselined). One is this record's: the carrier names `deployment/017-existing-items-backlog-deployment.md`, which this document creates. Three are other stages' and go to `INBOX.md`: `code-review/closed/017-existing-items-backlog-code-review.md:526` and `implementation/closed/017-existing-items-backlog-m6-implementation.md:27` (a backticked path that omits the leading `verification/017/` and so does not resolve; the instrument is under `verification/017/code-review/m6/`), and `implementation/closed/017-existing-items-backlog-m2-implementation.md:32` (a row stamped 18:34 against a commit at 18:33Z).

## Stage 2 prerequisites (not started)

1. **His release approval, asked by this stage in its session** (Phase 2B), after Phase 2A completes: every plan Committed (one plan), release-tip verdict recorded (`qa-hooks-017`, Phase 3, `qa-phase-3.md`; the merge result is a fast-forward in both repositories, so the tip's tree equals the Phase 2 `Verified-At` tree and the request is for the open-handoff sweep and the carried Phase 3 items above), packaging at the tip, serving-ref ordering (`release-move.js --report`: website one serving ref at origin (`master`), no pair; generator `master@87dcb41` and `prod@8de2b53`, "prod contains master"; read this turn, exit 0), the operational-text block per repository, the in-flight runbook, the owner step for the generator's runner.
2. Order: website first, verified live (B-11: `vercel inspect` commit contained in the release); then the generator, whose deploy evidence is the host's start line after the push, read through `ssh hooks-pig`. Rollback runs the reverse way. Plan RK-6: the generator deploy stops a process that has served requests (`handoff/preview-image-generator-drain-under-load-unobserved-2026-11-08.md`).
3. A release tree that moves before the pushes needs the architect's delta read and a QA verdict at the new tip first.

## Stage 2, Phase 2A: release readiness (steering's Stage 2 go, 2026-11-19; no approval carried by it)

### Release tip (steps 2a, 7)

Both moves are fast-forwards of the shared branch's current remote commit, so the assembled tip is the chain tip itself and nothing is merged or rewritten. Re-read at the write (`git ls-remote origin`): website `master` `1ad625e2161b58c5f870c9db369f4056df690a03`; generator `prod` `8de2b5337179623f7fbd82904221078c2930214a`, `master` `87dcb410e8fd3e24d61ca94bcfeeecd2794921dd`. `git merge-base --is-ancestor` exit 0 for website `origin/master` to `7293a35` and generator `origin/prod` to `8512a1d`.

| Repository | Release tip (chain branch) | Tree (`rev-parse <tip>^{tree}`) | Ref moved |
|---|---|---|---|
| website | `7293a3567f8166c6160f31fa4517674c6b19401e` | `3bc5a89ec128e92d4f8e57c9662fa50142ae808c` | `master` (Vercel production) |
| preview-image-generator | `8512a1d003af7fdbce56b85ef27218dd885becd1` | `0dbbb74721c9243508dc436f6ced9be331a3081a` | `prod` (`prod.yml`), then `master` follows |

No history was rewritten between verification and release: each Verified-At SHA is the branch head and is reachable from `chain/017-existing-items-backlog`.

### Release-tip verdict (step 3)

**Release Verification Failed** at website `7293a35`, generator `8512a1d` (`qa/website-7293a35-generator-8512a1d-release-tip-qa.md`, agent-output `4914aaa`, `Phase` 3). It is not `Release Verified` and is never passed to `release-move.js --qa-record`. Blocking: QAF-29 MEDIUM (the share-code load's route-0 draft write has no failing assertion) and QAF-30 MEDIUM (the M8 dialogs' `contents` wrapper), both test-only remedies, handed to `implementer-hooks-017`. Holds at the tip per QA: fresh frozen-lockfile install equals the shared install (1490 of 1490, M1's assumption discharged), suite 1853 of 1853 exit 0, typecheck 0, M7-b 60 files 0 violations (plants 3 of 3), generator call-deletion 3 of 3. QA's step 1b: 22 open handoffs, 3 members; the drain handoff fires at the generator push (row G10). Step 2: no gated set exists.

**Successor verdict: `Release Verified`** at website `787bec5` (tree `e4f7c052`) and generator `8512a1d`: `qa/website-787bec5-generator-8512a1d-release-tip-qa.md`, agent-output `c09fd41`, `Phase` 3, `Status` `Release Verified`, `Verified-At` "787bec5,8512a1d". Read at the commit by this stage, with both chain tips and trees and the remote refs re-read at that time (website `787bec5` / `e4f7c05…`, generator `8512a1d`; website `master` `1ad625e`, generator `prod` `8de2b53`, `master` `87dcb41`: all unmoved). It is the `--qa-record` for `release-move.js`. QA's read: fresh frozen-lockfile install, suite 1857 of 1857 exit 0, typecheck 0, only the fix's four cases differ from `7293a35`, the four survivors killed 4 of 4, M7-b 60 files 0 violations, step 1b byte-identical (22 open, the same three members), no gated set; QAF-28 resolved by G9 limb 2, with one residue QA names (`deploy.sh` has no `set -e`, so a partial `cp` could reload with the new ref; B-6 to B-9 and G10 would show it). The verdict expires on any later commit on either chain branch. The failed verdict above stays as the predecessor.

**Consequences, re-derived on the new tip.** The website tip moves (test-only), which expires this record's website lines: the tip and tree, the packaging build, the rollback patch check, the `release-move.js` dry run, the W1 to W3 commands and the architect's closing pass (a delta read is owed, and a QA verdict at the new tip, after code review's scoped check of the test-only diff). The generator tip `8512a1d` is not touched by either remedy; its lines stand while it stays the tip. The readiness document is re-committed with those lines before any ref moves. **QA's Assumption Not Checked** (the 12 dependency build scripts pnpm 10 ignored): the packaging build above ran the same `pnpm install --frozen-lockfile` under pnpm 10.28.2 and then `next build`, exit 0, so the build half is covered at `7293a35` and is re-run at the new tip; the runtime half is B-11 and B-6's. **Request as first made** (kept): requested of `qa-hooks-017` at 2026-11-19T19:16Z (message `4cccfcec`; its Resumption State is agent-output `1925e56`). The tip's tree is a Phase 2 `Verified-At` tree (the same SHAs, `qa/closed/017-existing-items-backlog-qa.md`, `cf69ef1`), so the request is for QA's step 1b (the open-handoff sweep) and the gated time-based set, plus three carried items: the fresh install against the lockfile, M7-b re-read at the tip with `--plant`, and the call-deletion set. No ref moves, and no approval is asked, before the verdict is recorded here with its SHA.

### Re-derived at the new website tip (after the release-tip fix; QAF-29, QAF-30)

The fix is code-review `APPROVED` at website `787bec5` (`code-review/017-existing-items-backlog-release-tip-fix-code-review.md`, agent-output `a081c89`, implementation document `a05505e`). Everything below supersedes the website lines above that name `7293a35`; the generator lines stand (its tip is unchanged).

| Read | Result |
|---|---|
| `git -C website rev-parse HEAD`, `branch --show-current` | `787bec5627702d2881b826e596ec2b8f8853c4fa`, `chain/017-existing-items-backlog` |
| Tree `rev-parse chain/017-existing-items-backlog^{tree}` | website `e4f7c05269b7804e543f41e6a84ae36c2e183828` (no longer a Phase 2 `Verified-At` tree: QA runs steps 2 and 3 in full); generator `0dbbb74721c9243508dc436f6ced9be331a3081a`, tip `8512a1d003af7fdbce56b85ef27218dd885becd1` unchanged |
| `git ls-remote origin` at this read | website `master` `1ad625e2161b58c5f870c9db369f4056df690a03`; generator `prod` `8de2b5337179623f7fbd82904221078c2930214a`, `master` `87dcb410e8fd3e24d61ca94bcfeeecd2794921dd`: all unmoved |
| `merge-base --is-ancestor`: `1ad625e` to `787bec5`; `7293a35` to `787bec5` | exit 0; exit 0 (a fast-forward onto `master`, so the assembled tip is the chain tip) |
| Fix scope, `git diff --numstat 7293a35 787bec5`; `--name-only` minus `__tests__` | 3 files (+62 −2): `ImageUploader.enter-scope.test.tsx` 16 0, `WarningDialog.enter-scope.test.tsx` 19 0, `MessageProvider.stored-draft.test.tsx` 27 2; the non-test remainder is empty (grep exit 1): no production path changed |
| Packaging at `787bec5`: `release-tip-build.sh` in a `git archive` export, capped scope (`systemd-run --user --scope`), pnpm 10.28.2 | install exit 0, build exit 0, probe route absent (`verification/017/devops/tip-build-website-787bec5/`); the export is removed. The same install ignores the 12 dependency build scripts QA named, and `next build` exits 0: the build half of QA's Assumption Not Checked is covered at this tip |
| Rollback patch `1ad625e..787bec5`, 6454 diff lines, written to `rollback-website-787bec5.diff` first | `git apply --check -R` exit 0, from the pipe and from the file |
| `release-move.js` dry runs | website `master` `787bec5`: every check passed (`release-move-dry-website-787bec5.txt`); generator `prod` `8512a1d` re-run: every check passed, workflow summary `prod.yml` on push to `prod` (`release-move-dry-generator-rerun.txt`); `--report` for the website: one serving ref, no pair |
| Workspace | website `git status --porcelain`: `?? .playwright-mcp/` only (not the chain's); generator clean |

**Still open before the approval is asked**: (1) QA's fresh Phase 3 at the assembled tip (requested this turn, with the release-tip record's `Phase` 3 and `Status` `Release Verified` the evidence `release-move.js` takes); (2) ~~the architect's delta read~~ **closed**: `architecture/closed/017-existing-items-backlog-architecture-findings.md` at agent-output `eb46ec9` (read 20:03Z, delta `7293a35..787bec5`, three test files, no production file): the closing pass holds at website `787bec5`, no finding, generator `8512a1d` unchanged (read at the document and the commit by this stage, trees re-read: website `787bec5`, generator `8512a1d`); (3) this readiness block re-committed after QA's record, before any ref moves.

### Release consistency at the tip (step 4)

As at Stage 1, read at the tip: no `version` field in either `package.json`; the website's `project-utils` lock pin `749606d` equals that repository's `origin/master`; the chain's one dependency change is `@vercel/functions` `3.11.3` (website `package.json` +1, `pnpm-lock.yaml` +80, none removed); the generator's package files are untouched.

**Populations re-derived (4b).** The one population the release condition rests on is the generator's callers, because the generator's contract changes (204 only after a confirmed image; deletion moves to the website): `git grep PREVIEW_IMAGE_URL` over the website at `HEAD` finds one call site, `src/server/api/utils/previewImage.ts` (plus `env.mjs` and a test helper). `project-utils/src` has no call. A search of `statbot-v3/src` and `statbot-api/src` for the variable and for the generator's host name returned no file (a listing; scope those two directories, not the whole statbot tree; one first attempt at it was not completed and was re-issued once in a form that shows its true target). The Vercel project has separate `PREVIEW_IMAGE_URL` records for Production and Preview (the M5-0 record), so a Preview deployment may call a generator that is not production's; whether it is the same host is not read. Serving refs per repository: website one (`master`), generator two (`master`, `prod`), enumerated from the repository by `release-move.js --report` (website: "one serving ref at origin (master); no pair"; generator: "prod contains master", exit 0), not from any gate's count.

### Packaging integrity at the tip (step 5)

Each is a build re-run in a throwaway `git archive` export of the tip (not an inference from an earlier capture), in a capped scope (`systemd-run --user --scope -p RuntimeMaxSec -p MemoryMax -p TasksMax`); exports removed at the end of this stage's run.

| Repository | Command | Result | Capture |
|---|---|---|---|
| website `7293a35` | `pnpm install --frozen-lockfile` under pnpm 10.28.2 (the `packageManager` field; node v24.14.0 here, the project's `nodeVersion` is 24.x), then `next build` (Next.js 16.1.6) with the Production target's variable names and dummy values, no `SKIP_ENV_VALIDATION` | install exit 0; build exit 0; 10 app routes, the probe route absent | `verification/017/devops/tip-build-website/` (`install.log`, `build.log`, `summary.txt`), script `release-tip-build.sh` |
| generator `8512a1d` | `npm ci --omit=optional`, then `npm run build` (`tsc -b && rimraf dist && cp -r build dist`), the forms the deploy workflow's run steps name; `PUPPETEER_SKIP_DOWNLOAD=1` so the install fetches no browser (no step runs one) | `npm ci` exit 0; build exit 0; `dist/` produced | `verification/017/devops/tip-build-generator/`, script `release-tip-build-generator.sh` |

The lockfile change is the website's (`@vercel/functions`). The package manager on the deploy host is Vercel's: the project's install command is `pnpm install` (project JSON, read this turn: `installCommand` with the git-credential line, no `buildCommand`), and the `packageManager` field names pnpm 10.28.2, the version this box ran. Whether Vercel's build image honours that field was not read; it is **accepted as written, a named risk**. The evidence beside it is that Vercel built the M5-0 probe commit (`aca8cb3`, same dependency at the same version, a differently shaped lockfile) on this project and that the production deployment from chain A is Ready; the install under Vercel's pnpm of this tip's lockfile is first seen at the push. A failed Vercel build leaves production serving `1ad625e` (Vercel keeps the previous production deployment), so that failure is a no-deploy, not an outage (Vercel's documented behaviour, not executed here).

### Workspace (step 6)

Both product trees are on `chain/017-existing-items-backlog` at the tips above. The website's untracked `.playwright-mcp/` (17 paths, not the chain's) is the one exclusion a predecessor declared; `release-move.js` leaves untracked paths alone and its dry run passed with it present (`untracked 17 path(s) left alone`), so it does not affect the release mechanism. No tracked build artefact is excluded (entry facts: none under `dist`/`build`/`.next`). The generator's tree is clean. The record repository: this stage's paths are committed; `INBOX.md` holds other sessions' entries.

### Execution mode (step 8)

**Mode A for both moves**, run by this session once he sanctions them in this session (Phase 2B): `release-move.js` for each serving branch move, the default form for the website (it fast-forwards the shared tree's `master` to the verified tip and switches the shared tree back onto `master`, which is the one switch Phase 2C owns; the website tree is clean of tracked changes) and for the generator. The generator's runner start is the owner step `verification/017/owner-steps-generator-runner.md`.

### Operational text re-derived against the mechanism (before the first ref moves)

| Repository | Line | Mark | Instrument |
|---|---|---|---|
| website | Deploy mechanism: Vercel git integration, project `hooks-gg-website`, linked to GitHub `hooks-gg/website`, `productionBranch` `master`, no deploy hooks; no `.github/workflows` (0 tracked); a push to `master` builds a production deployment | **re-derived** | `vercel api /v9/projects/<id>` link fields (`verification/017/devops/website-deploy-mechanism.txt`); `release-move.js` dry run: "workflows none" |
| website | Rollback: a revert commit pushed through `release-move.js` (a fast-forward; the tool refuses a non-fast-forward), or Vercel's promote of the previous production deployment `dpl_FgUy9jKLcQXGdJJZdDXu77TnBtkF` (commit `1ad625e`, the owner's console, not run) | **re-derived (patch check)**: `git apply --check -R` of `1ad625e..7293a35` (6394 diff lines, written to a file first) against the tree, exit 0 | `verification/017/devops/rollback-website.diff` |
| website | Ordering: first, and verified live before the generator moves (plan: the new website with the old generator behaves as today; the reverse window leaks objects) | **accepted as written from the plan**, with row W5's check as the gate | plan § "Release and rollback" |
| website | Serving refs: one (`master`) | **re-derived** | `release-move.js --report` |
| generator | Deploy mechanism: `prod.yml` on push to `prod` runs on a self-hosted runner: `npm ci --omit=optional`, `npm run build`, then the deploy script (copy to `deployed/$ENV`, `pm2 startOrReload --update-env`, `pm2 reset`, `pm2 save`) | **re-derived for the trigger and the first two steps** (`release-move.js` workflow summary: "on push to prod → npm ci --omit=optional; npm run build"); the deploy script's steps are **accepted as written** from chain 015's record (`deployment/closed/015-bug-evaluation-fixes-deployment.md`, re-derived there from the file); the workflow's lines were not read in this stage (not completed) | `verification/017/devops/release-move-dry-generator.txt` |
| generator | Runner: the job queues and deploys nothing while the runner is down (P-3; 24 minutes at chain 015's release) | **accepted as written** and named a risk; liveness is his to confirm before the yes, nothing is read from the host | `verification/017/owner-steps-generator-runner.md` |
| generator | Rollback: a revert pushed to `prod` with the runner running, which is another deploy with another stop; the generator is reverted first and confirmed deployed, then the website | **re-derived (patch check)**: `git apply --check -R` of `8de2b53..8512a1d` over `src/generateImage.ts` and `src/server.ts` (106 diff lines), exit 0 | `verification/017/devops/rollback-generator.diff` |
| generator | Serving refs: `master` `87dcb41` and `prod` `8de2b53`; "prod contains master"; after the push `prod` is ahead and `master` behind (allowed). The plan has `master` follow so that `prod` keeps containing it: row G12 | **re-derived** | `release-move.js --report` (exit 0) |
| generator | Stop of a process that has served requests (RK-6, the drain handoff): the deploy reloads the process | **accepted as written**; the transition read is row G10 | `handoff/preview-image-generator-drain-under-load-unobserved-2026-11-08.md` |

### Open disagreements with predecessor documents (step 9b)

None open. One field flagged stale and not a disagreement: QA's register State column says `open` for rows UAT later executed; QA's own text names UAT's table and then this record as authoritative, and Stage 1 reconciled each row to a terminal state. Predecessor Assumption Not Checked lines this release exercises, each with the read that closes it: the Phase 3 items (above, QA's); F-1 to F-5 (the carrier handoff; production reads after the deploys). **A live session could run before the first ref moves, read-only and optional**, named to steering in this turn's message: F-1 (`show server_version` on the production database) and F-3 (the `Messages."previewImageNonce"` column type), two single read queries on his production database, for which this box has no access; neither gates the release (each shows in his B-6 look).

### Runbook (one ordered artifact; completed rows are the execution record)

Results are blank until run. Each gate row carries its abort criterion with the command it gates. A classifier or hook denial of any push row is reported to him, never retried. Pollers (`verification/017/devops/poll-*.sh`) are read-only, exit non-zero after three consecutive unreadable reads, and carry a read bound; their stub dry run (`poll-stub-dryrun.sh`, seven cases, exits as designed) and one live baseline read each (`poll-live-baseline-*.txt`: website exit 0 on the current production commit, generator exit 0 on the current boundary) were run before any real use.

| # | Step | Command / instrument | Abort criterion | Result |
|---|---|---|---|---|
| 0 | Pre-go reads (done now, read-only; live value beside the prediction) | B-11 website: production deployment `dpl_FgUy9j…`, commit `1ad625e…`, READY, tip not contained (`merge-base --is-ancestor` exit 1); prediction after W3: exit 0. B-11 generator: boundary stamp `2026-11-08T22:04:51.196Z`; prediction: a later stamp after G8. B-7: failure lines 0, control 219 records (prediction: 0 now). B-10: classes all 0, liveness 76. Captures `b11-baseline-website-production.txt`, `b7-baseline-*`, `b10-baseline-*` | a read that does not match its stated baseline stops the release | Read 2026-11-19T19:08Z to 19:22Z: as stated |
| W1 | Re-read refs and trees at write time | `git -C /usr/local/bin/hooks/website ls-remote origin master` = `1ad625e…`; `git -C … rev-parse HEAD` of both trees = the tips; `ls-remote origin prod master` (generator) = `8de2b53…`, `87dcb41…` | any ref or tree differs from this record: stop; a moved tree needs the architect's delta read and a QA verdict first | |
| W2 | Website dry run | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 787bec5627702d2881b826e596ec2b8f8853c4fa --dry-run --qa-record <the committed Phase 3 record>` | non-zero exit | |
| W3 | **Website move** (his sanction, this session) | the same command without `--dry-run` | non-zero exit; a denial | |
| W4 | Ledger: E-WEBSITE-PUSH | `git ls-remote origin master` equals the tip; ref, SHA and the push time into the carrier's event ledger | the remote ref is not the tip | |
| W5 | **B-11, website: gate for the generator** | `bash verification/017/devops/poll-website-deploy.sh 787bec5627702d2881b826e596ec2b8f8853c4fa 20 30`, then `npx vercel@66.2.0 inspect https://hooks.gg --scope hooks-gg` and `merge-base --is-ancestor <tip> <deployment commit>` | exit 4 (ERROR or CANCELED), 3 or 5: the generator does not move; report to him with the rollback form | |
| W6 | First B-7 read | `bash verification/017/post-deploy/kit/b7-read.sh verification/017/devops/b7-after-website`; control above 0 | control 0 or a read exit non-zero: recorded, not a stop | |
| G7 | Generator dry run and the runner check | `release-move.js /usr/local/bin/hooks/preview-image-generator prod 8512a1d003af7fdbce56b85ef27218dd885becd1 --dry-run --qa-record <…>`; his confirmation of the runner was part of his yes | non-zero exit | |
| G8 | **Generator move** (his sanction, this session) | the same command without `--dry-run` | non-zero exit; a denial | |
| G9 | **B-11, generator** | `bash verification/017/devops/poll-generator-start.sh <push ISO time> 12 60` (limb 1: the start line), then `bash verification/017/devops/read-generator-deployed-ref.sh <release SHA>` (limb 2, QAF-28: the deployed checkout's prod ref equals the release SHA; read-only, one `claude-ro` read) | limb 2 exit 1 or 3: reported to him, B-6 to B-9 would read old code, not a stop of the release act; exit 5 (runner down, job queued): print `verification/017/owner-steps-generator-runner.md` Step A to him and wait; exit 3: stop and report | |
| G10 | Transition read (RK-6) | `ssh hooks-pig 'bash -s' < verification/015/pig-host-read.sh` once after G9's exit 0; capture to `verification/017/devops/`. Record the drain handoff's five fields from section [6] (`Created instance` must be above 0 for a drain under load; `POST /generate`; the `Drain complete in <N>ms.` figure or `Drain failed after`; the exit time against `Stopping app`; any `still alive after 12000ms` or SIGKILL line) and section [5]'s count of Chromium processes (not `chrome_crashpad`) whose parent is pid 1 (predicted 0 at PM2 5.x); check that [2] and [3] print `+0000` mtimes; then disposition `handoff/preview-image-generator-drain-under-load-unobserved-2026-11-08.md` | record only, no stop | |
| G11 | Ledger: E-GENERATOR-PUSH and E-GENERATOR-START | push time and SHA; the start line's stamp | | |
| G12 | `master` follows | `release-move.js /usr/local/bin/hooks/preview-image-generator master 8512a1d… --qa-record <…>` after G9 exits 0 (a push of a branch the workflow does not trigger on) | non-zero exit; the workflow summary lists a trigger on `master` | |
| R | Rollback, if any abort criterion fires after a move | generator first: a revert commit through `release-move.js`, confirm deployed (G9's poller), then the website's; owner communicates (devops sends nothing) | | |

## Phase 2B: user confirmation

_The ask is recorded here as put, and his answer under it._

## Post-Release Status

Not released. Post-release rows ride `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md` (B-6 to B-11, F-1 to F-6); readers B7R and B10R are scheduled (`# plan 017 B7R` and `# plan 017 B10R` lines in the crontab, smoke OK).

## Next Actions

Phase 2A is complete at the Release Verified verdict (`c09fd41`); Phase 2B's ask is with him. On his yes: Phase 2C runbook rows W1 to G12 in order (his sanction taken in this session). On a no: mark Aborted, plans stay Committed. Stage 2 on his release approval. Routing: `steering-roadmap-hooks` (Stage 1 completion message, naming this document); `roadmap` subagent to record the plan as committed (release tracker).

## Resumption State

**Updated 2026-11-19T19:55 (supersedes the Waiting on and Next lines below):** QA's Phase 3 record is `Release Verification Failed` (agent-output `4914aaa`). Waiting on the implementer's test-only fix for QAF-29 and QAF-30 (website tip moves; generator `8512a1d` untouched), then code review's scoped check, the architect's delta read and a fresh Phase 3. Done this turn: QAF-28 containment limb (script, baseline, carrier B-11, runbook G9), G10's recording list. On the next Phase 3 verdict at the new tips: re-read the refs and trees, re-run the website packaging build, rollback patch check and dry runs at the new tip, re-commit the readiness lines, then Phase 2B. Uncommitted: this record, the carrier, `verification/017/devops/read-generator-deployed-ref*` until committed this turn.

Written 2026-11-19T19:28Z at steering's `/checkpoint` (context past threshold), at a seam: waiting on QA's Phase 3 verdict.

- **Done**: Stage 1 (committed, closed documents, carrier, readers B7R and B10R). Stage 2 Phase 2A except step 3: tip assembly (fast-forwards), consistency, populations, packaging at both tips (exit 0, 0), rollback patch checks (exit 0, 0), `release-move.js` dry runs (pass), operational-text block, runbook W1 to G12 with blank results, pollers (stub 7 of 7, live baselines), owner step file. Readiness committed at agent-output `21d55f9`.
- **Waiting on**: `qa-hooks-017` for the Phase 3 record (requested 19:16Z, message `4cccfcec`; follow-up `61f11950` asks QA to read the runbook's B-7, B-10, B-11 rows and give the record path). QA's work so far is under `verification/017/qa-phase3/` (its commits, last seen `5fb3504`). Nothing of mine is in flight.
- **Next, in order**: (1) when QA's Phase 3 record is committed with `Phase` 3 and `Status` `Release Verified` at the tips (`7293a35`, `8512a1d`), record its path, SHA and the step 1b count in this document's release-tip verdict section (replace "Pending"), and read QA's second read of the runbook rows. A `Release Verification Failed` goes to the implementer and the owner via steering. (2) Phase 2B: read `~/.claude/agent-skills/document-lifecycle/references/escalation.md` first; the prompt gate flag `~/.claude/state/prompt-gate-off` is absent (read 19:2xZ), so the ask goes as a selection prompt in this session. The summary: release identifier (the SHA on each ref moved), plan 017 and its five value items, environment production, website `master` (Vercel) first then generator `prod` (`prod.yml` on a self-hosted runner, whose liveness is his to confirm before the yes), the order and why, rollback form, O-1 settled by D-36, the optional DB reads (F-1, F-3). Record how the ask was put and when, and his answer, in the readiness section. (3) On yes: Phase 2C runbook rows W1 to G12 in order, each result written into the table as run; row G9's owner step prints `verification/017/owner-steps-generator-runner.md` Step A only if the poller exits 5. (4) Phase 2D: `deployment-record.md` steps; close the release-tip QA record, this record and the M5-0 probe record; the architecture and roadmap inbox lines; the security audit's closer is the security stage (route it); then one message to steering naming the closed chain (the retrospective's spawn cue).
- **Trees**: website `chain/017-existing-items-backlog` at `7293a35`, generator at `8512a1d`, record `master` HEAD `5fb3504` at this read. Any move of a release tree needs the architect's delta read and a QA verdict at the new tip. The website holds an untracked `.playwright-mcp/` that is not the chain's.
- **Mutated and not restored**: the user's crontab carries six lines tagged `# plan 017 B7R` and `# plan 017 B10R` (installed at Stage 1, recorded in the carrier; they are the readers' schedule, not scratch). No export, container or process of mine remains (scratch exports removed; `ps` shows none).
- **Uncommitted**: nothing of mine in the record except my `INBOX.md` entry (appended uncommitted by rule). `verification/017/qa-phase3/` is QA's.
- **Evidence run, not yet recorded**: none.
- **Questions out**: none to the owner. Sent: QA (`4cccfcec`, `61f11950`), steering (Stage 1 completion; Phase 2A status with the optional DB reads). Steering's session is `steering-roadmap-hooks`.
- **On resume**: arm the cache-warm wake; re-read this document, the plan's Decisions Register (`planning/closed/017-existing-items-backlog.md`) and `steering/017-rulings.md` from the 19:13Z block; check whether either tree or the remote refs moved (`git ls-remote`, `rev-parse`); state in one line what is resumed from which SHA.
