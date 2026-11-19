---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Status-Detail: "Stage 1 complete at website 7293a35 and generator 8512a1d (chain branch chain/017-existing-items-backlog in both repositories): plan 017 and its stage documents are Committed and closed. Stage 2 (release) not started: it waits on his release approval, asked by this stage in its own session; no ref has moved and nothing is pushed."
---

# Deployment Record: plan 017 — the existing-items backlog (Stage 1, then Stage 2)

**Plan Reference**: `agent-output/planning/closed/017-existing-items-backlog.md`, `Revision: 11` (agent-output `a971ed8`), Status `Committed` at Stage 1 (R-62, `a1d670b`). The M5-0 probe record is the separate `deployment/017-existing-items-backlog-m5-0-probe-deployment.md` (`Active`; its closure is Phase 2D's, below).
**Commission**: `steering/backlog-2026-11-18-briefs/devops-hooks-017-stage1.md` (`cd16832`), common part `steering/017-brief-common.md`, both read whole. Steering's brief arrived; its forward-item sweep is below.
**Release Identifier**: not yet assigned. The identifier is the SHA on each serving ref the release moves (website `master`, generator `prod`); no tag, and neither package carries a `version` field (below).
**Release Date**: pending his approval.
**Execution Mode**: not yet fixed (Phase 2A step 8). Website `master` and generator `prod` are serving branch moves by `release-move.js`, which Mode A runs in a session he sanctioned; this stage proposes Mode A for both, the generator's runner start being an owner step (plan § "Release and rollback").

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T19:14 | steering-roadmap-hooks → devops-hooks-017 (brief `cd16832`) | Stage 1 for plan 017 | Gates re-derived at the record (below); every pre-release register row terminal; plan at rest; release consistency checked; both trees clean of the chain's work and unmoved (website `7293a35`, generator `8512a1d`). Carrier handoff, scheduled readers B7R and B10R and their crontab lines created (smoke OK). Plan, 8 implementation, code-review, analysis, 9 QA and the UAT documents set `Committed` and moved to `closed/` (one commit each). No push, no merge. Disclosed: the stamp gate refused the carrier's first changelog row, typed ahead of the clock; re-stamped from `date -u` (a format standard satisfied). |

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

## Post-Release Status

Not released. Post-release rows ride `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md` (B-6 to B-11, F-1 to F-6); readers B7R and B10R are scheduled (`# plan 017 B7R` and `# plan 017 B10R` lines in the crontab, smoke OK).

## Next Actions

Stage 2 on his release approval. Routing: `steering-roadmap-hooks` (Stage 1 completion message, naming this document); `roadmap` subagent to record the plan as committed (release tracker).
