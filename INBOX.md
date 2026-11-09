# Inbox — Agent Output (hooks)

What other sessions need from this domain. The steering session standing in this repo processes it
at spawn; until then an entry costs that session nothing, which is the point.

**This file deliberately has no frontmatter.** It is not a chain document.

**Write here instead of editing this repo's files.** A session with something to record for this
domain appends one entry and stops: it does not edit records, conventions or the domain's docket,
and it does not create a new file in this tree. It never edits, reorders or deletes another author's
entry. Commit the one path, by pathspec.

**Inbox or live message.** `SendMessage` wakes the receiver over its full prefix and costs it a turn;
an inbox write costs it nothing until it next spawns. Blocking or time-critical → message; everything
else → here.

**Entry format** — enough that it can be acted on without a conversation:

```
## <date> — <author session name> — <FYI | DECISION NEEDED | BLOCKING>

What it concerns. What is being asked, in full. What the author already did, and what the author
deliberately did not do.
```

The session name is the routing address — the name as `ListAgents` prints it, copied exactly.

**Resolution is deletion.** Each entry reaches exactly one terminal state — acted on, converted into
a docket or TODO item, demoted into a record, routed onward, or rejected with the reason recorded —
and is then deleted rather than marked done. The memory is the change it caused: the edit, the
commit, the file that now exists. Written and deleted within one turn is a complete lifecycle.

## Record — why this file exists

Until 2026-08-23 exactly two domains on this machine had an inbox: the Agents domain
(`~/.claude/agents`) and the statbot Agent Output domain
(`/usr/local/bin/statbot/agent-output`) — because only those two had a single owning session to
address. This repo becoming a third such domain is the owner's ruling of 2026-08-23, taken with
that consequence stated at the time: an inbox implies an owning interpreter for this repo.

**That interpreter is the hooks steering session** — the steering thread standing in
`/usr/local/bin/hooks` — by the owner's ruling of 2026-08-23. It processes this file at spawn, and
it is the session other domains address about this repo.

Entries follow, newest at the bottom.

None. The inbox is empty.

## 2026-08-26T01:46 — pi-statbot-023-hooks-012-013 — FYI

**pi batch 7 processed retrospectives 012 and 013** (both now `Processed` in `retrospectives/closed/`; mirror ledger at `process-improvement/closed/012-013-batch7-agent-instruction-updates.md`; full analysis and ledger in the statbot record). Definitions and skills landed: agents `afbf96e`, `d073c60`; agent-skills `d3d3a55`, `df5653a`. README: the stale "retrospective hangs off UAT" sentence and the pi arrow are deleted (`fbd055c`) — the definitions carry the rule (fires after all effort files are closed out; pi on the owner's command only).

**Sweep of this workspace's memory, on the owner's authorisation (pi may delete from any domain, no prohibitions guard).** From `docket.md`: the pi-not-a-stage, retrospective-trigger, /proc-sweep and UAT-pass paragraphs (now `steering.md` / `retrospective.md` / `uat.md`); the "Agents inbox — six items" section (all six processed); the "Sessions" section (now `steering.md` "Long-lived stage sessions": `/proc` liveness and role, `python3 ~/.claude/tools/cc-usage.py sessions` for warmth — that script *is* reachable from a session, contrary to the deleted hazards line); the "My error class" section (now the skill's "The receiving party re-derives" and `steering.md`'s OWNER-QUEUE rule). From `hazards.md`, 14 entries whose rule is now definition text: transcript-size/prefix, verify-before-repeating, ListAgents-rows-outlive, registered-vs-launch name, count-over-a-range, second-instrument, registered-row descriptive clauses, owner-queue omission, ask-in-his-vocabulary, never-tell-another-session, predicate-not-consequence, row-title-terminal, one-writer-or-many-readers, hardcoded-probe. The 19 remaining entries are untouched; a header fragment left in the docket was removed. **Read both files before your next rewrite** — they are shorter than you left them.

**Routed to you as this record's `tools/` owner** (definition text deliberately not added — owner ruling): (1) `check-repo.js` needs an owner and a clean baseline or it stops being run (013 P-10 — 9 → 26 failures trained four stages to dismiss a real `ID: 11` defect); (2) a `Status-Detail` size check in `check-repo.js` (012 R6 / 013 P-12 — the prose rule was breached in both chains); (3) `INDEX.md` regeneration has no owner (013 N-8).

**What I did**: the above; nothing else in this repository edited. **Deliberately not done**: no chain document touched; 013's chain stays open (BC-12/14/17/20 are their owners'); this entry left uncommitted for the owner's commit gate.

## 2026-08-30T06:52 — pi-agents-hooks-014 — FYI
pi batch 10 (retrospective 014). Definitions `~/.claude/agents` 96a3980, skill c6dd817; retrospective 014 Processed → closed/; mirror ledger at process-improvement/closed/014-batch10-agent-instruction-updates.md.
Memory sweep performed in this workspace's memory (`hazards.md` existence-check bullet → pointer to the skill's two-instrument rule; `docket.md` item 2 "undocumented" clause → planner.md citation). Reported only: `hazards.md` "No CLAUDE.md under /usr/local/bin/hooks" is stale since 014 M1 — yours to correct. Routed to this repository's `tools/` owner: a mechanical duplicate-register-ID check in `check-repo.js` (the prose rule failed again on UAT-1). Nothing else owed.

## 2026-08-31 — planner-S024 (statbot) — FYI

BC-7/AC8 of chain 014 ("the next chain's planner cites the standard") has its closing observation:
Statbot plan 024 (`/usr/local/bin/statbot/agent-output/planning/024-test-conventions.md`, revision 1,
2026-08-31T01:02) cites `/usr/local/bin/hooks/CLAUDE.md` → `agent-output/CLAUDE.md` as the shape its own
Test Conventions section mirrors, and names the Hooks class table, axioms A–E, naming predicates
and helper policy as the basis it reconciles against. pi batch 10's ledger named S-024's citation
as the class-closer. What I did: this entry only. What I did not do: edit the 014 QA register row
BC-7/AC8, the retrospective, or any closed document — the row's terminal write is that domain's.
Commit of this path is left to the hooks steering session (another domain's repository).

## 2026-09-02 — pi-S025-S026-S027-S028 — FYI

**Statbot's `tools/check-repo.js` gained CHECK 9 `status-vocabulary` (pi seam-protocol run); this
repository's copy has not.** The check reads the Status vocabulary from `~/.claude/tools/seam.js`
(`--vocabulary` prints it) and fails an open document whose `Status` is not one token of its kind, or
whose anchor field's first token does not parse; it notes and passes when seam.js is absent. Port on
this repository's steering thread's word: the function `checkStatusVocabulary`, the `os` require, and
its call in `main()`, from the statbot record repo's commit carrying it once the owner approves that
commit. What I did: this entry. What I deliberately did not do: edit this repository.

## 2026-10-20 — implementer-PI001 — FYI
This record's `tools/check-repo.js` and `tools/build-index.js` are their own copies. Plan PI001 (statbot record `planning/PI001-record-tools-backlog.md`, D-11, D-16) moved the statbot and paracord records' checks into one shared engine, `~/.claude/tools/record-engine.js`, with a thin entrypoint in each record: `tools/check-repo.js` there is about forty lines that set `SETTINGS` (root, record name, the unique-basename exceptions, whether the document rules and the status-vocabulary instant are on) and call the engine; it loads the engine from `~/.claude/tools` (or the directory `RECORD_ENGINE_DIR` names). The engine adds, over a copy like this one: changelog-row and stamped-heading rules from a gate instant, a duplicate `R-n`/`D-n` rule, one UUID per Origin, a handoff `Priority:` check, closed documents against the status vocabulary from an instant, links resolved against what each record lists, a stale-baseline warning, unknown-argument refusal with exit 2, and a baseline keyed by identity.
Asking for: the owner of this record decides whether to adopt the shared engine in place of this copy (the hooks record was left out of the plan by D-16, so nothing has changed here). If adopted, the entrypoints in the statbot record (`tools/check-repo.js`, `tools/build-index.js`) are the form to copy, and the engine's owner is the Agents domain (findings to `~/.claude/agents/INBOX.md`).
**Done here**: this entry. **Not done**: any edit to this record's tools, which D-16 left out of plan PI001, and this file's commit, which its owning session does.

## 2026-11-08 — planner-hooks-new (planner of chain 015) — FYI
`research/codebase-bug-evaluation-2026-11-08.md`: Recommendation 3 and gap G-4 advise `pm2 show <name>` for the F-31 host read.
Finding: `pm2 show` also prints a "Divergent env variables from local env" table, that is, environment values from the invoking shell. This was read in PM2's `lib/API/UX/pm2-describe.js` by the chain-015 analyst; see `analysis/015-bug-evaluation-fixes-analysis.md`, corrected at `9b99acd`. The owner-side read for that limb is now `verification/015/pig-host-read.sh`, which never calls `pm2 show`. Asking the researcher, or whoever owns the document, to strike or re-point the two `pm2 show` lines.
**Done here**: this entry. **Not done**: any edit to the research document, because it is not this session's file.

## 2026-11-08 — qa-hooks-015 — FYI
`tools/check-repo.js` over the record: `FAIL — 30 problem(s)`, none in a document qa-hooks-015 wrote (run 2026-11-08 ~05:45Z, from the agent-output root).
By group:
- LINKS 7, e.g. `steering/015-rulings.md:4` → `steering/bug-fixes-rulings.md`; `INBOX.md:85` → `planning/PI001-record-tools-backlog.md`; three `verification/012/*` → `backfill-report.md`.
- BASENAMES 16: duplicate basenames under `verification/013/probe-qa-p3-*`.
- FRONTMATTER 3: `code-review/closed/013-components-v2-editing-surfaces-code-review.md` carries ID and Origin `11`, which is not zero-padded and disagrees with its filename.
- SCOPE 4: `code-review/closed/012-carry-forward-to-post-refresh-pass.md` and `deployment/closed/{012,013,014}-*-readiness.md` lack a recognised stage suffix.

Asking the record's owner to fix, baseline or prune these.
**Done here**: this entry. **Not done**: any fix, because none of these files is this session's.

## 2026-11-08 — critic-hooks-015 — FYI
For code-reviewer-hooks-015: the Round 15 record (`code-review/015-bug-evaluation-fixes-code-review.md` at `1d0059a`, and its row in the plan's changelog, `de43f58`) says `parseEmbedTitle` omits `codeBlock` "first at `d5f2dc8`". The exclusion was introduced at website `57b58d8` (2023-03-23, "integrate interactive title markdown editing"); `d5f2dc8` (2023-06-05) removed `'br'` and added `'list'` with `'codeBlock'` already on both sides of its diff. Instrument: `git -C website log --reverse --format='%h %ad %s' --date=short -G"parseEmbedTitle.*codeBlock" -- src/utils/markdown/index.tsx` (first row `57b58d8`); a `-S` search for the exact three-item list finds `d5f2dc8`, which answers a different question. The plan side is carried by the planner (batch row L-C8-1, R-11 `83c4c3e`); the code-review document's own line is the code-reviewer's to reconcile.
**Done here**: this entry. **Not done**: any edit to the code-review document or its changelog row, because neither is this session's.

## 2026-11-08 — security-hooks-015 — FYI
`handoff/preview-image-generator-api-key-in-workflow-files-2026-11-08.md` (plan 015 X-12) and `architecture/preview-image-generator.md` P-2.
Two record items from `security/015-preview-image-generator-security-audit.md` (M-001 and I-6), established by read-only `claude-ro` host reads over `hooks-pig` at 2026-11-08T09:29Z (capture `verification/015/security-host-read-2026-11-08T0929Z.txt`, § E and § H):
- For whoever the owner routes the handoff to: the key it covers also sits on the host in two world-readable copies that `.github/deploy.sh` recreates at every deploy — `/usr/local/bin/hooks-image-preview-generator/deployed/prod/.env` is `-rw-r--r-- root` (311 B; `test -r` as claude-ro → yes; content not read) and `/etc/.pm2/dump.pm2` is `-rw-r--r-- root`; `cp -r ./` also copies the checkout's `.git` into the deployed directory. The owner saw the dump's readability at OQ-H (rulings 05:24Z) and chose the filtered read; the `.env` copy and the `.git` copy were not in that prompt. Asking that the handoff's "Owed" list gain: `chmod 600 .env` and exclude `.git` in `deploy.sh`; `chmod 700 /etc/.pm2`; and that its rotation question be read as covering these copies too.
- For the architect: P-2 says the security and maintenance risk of the 2023 dependencies is "a separate question … nobody has assessed". H-001 and H-003 in the security document are that assessment's first result (Chrome 116.0.5845.96, before the CVE-2023-4863 fix, as root with `--no-sandbox`; Node 18.17.1, end of life). Asking that P-2 point at the security document so the sentence stops being true by omission.
**Done here**: this entry; the findings and the owner decision they raise are in the security document and with steering-hooks-015. **Not done**: any edit to the handoff or the architecture record, because neither is this session's; this file's commit, which its owning session does.

## 2026-11-08 — qa-hooks-015 — DECISION NEEDED
`agent-output/CLAUDE.md` § Test Conventions, the ID-token class: it does not match QA finding IDs of the form `QAF-n`.
The class lists `fqa` and `f-qa` but not `qaf`. Measured by qa-hooks-015 (`grep -ciE` with the class regex, verbatim from the file): over `it('qaf-27 cell')` it gives 0, and over the control `it('cr-27 cell')` it gives 1. Population today: `git grep -ciE "\bqaf-?[0-9]+" 4f9ed85 -- '*__tests__*'` in website matches 0 files, so the gap is latent. Options: add `qaf` to the class alternation, or leave it as it stands.
**Done here**: the measurement, recorded in `qa/015-bug-evaluation-fixes-m1-m2-qa-findings-qa.md`. **Not done**: any edit to `CLAUDE.md`, which is not this session's file.


## 2026-11-08 — uat-hooks-015 — FYI
`planning/015-bug-evaluation-fixes.md` § Validation, the pre-release walk bullet: "the chain tip served locally against `.env.local`, whose database is the live one". This is false at 2026-11-08. That file's only selectable `DATABASE_URL` is 127.0.0.1:5432, the local stack ruled "stay local" (`steering/014-rulings.md`, 2026-08-27). Nothing listens there (`ss -ltn`), and `docker ps -a` lists no containers. The site's Discord sign-in at website `b96e364` failed with next-auth `getUserByAccount` ECONNREFUSED 127.0.0.1:5432 (`verification/015/uat/server-b96e364.txt`). This is UAT-1 in `uat/015-bug-evaluation-fixes-uat.md`. For the planner (Planner batch): the bullet's premise. For steering/owner: the walk environment, already escalated by message.
**Done here**: UAT-1 recorded; the owner-needing choice sent to steering-hooks-015. **Not done**: any edit to the plan beyond UAT's own Status row; this file's commit.

## 2026-11-08 — devops-hooks-015 — FYI
architecture/015-bug-evaluation-fixes-architecture-findings.md (ID 015, Status Active) — chain 015's architecture findings document.
Chain 015 reached its Stage 1 commit: the plan, code-review, QA, UAT and implementation documents are closed as Committed (agent-output 69b5beb), and the release itself (pushes) waits on the owner's approval. The findings document still carries the chain's ID and is open. Please close it (Resolved, or the status its findings call for) when the architect next runs, and land the two architecture lines the plan names: `system-architecture.md` § Components, preview-image-generator ("graceful SIGINT drain": PM2 sends an IPC shutdown message and the M8 fix drains on it, SIGINT as fallback) and `preview-image-generator.md` P-3 ("no build step" disagrees with prod.yml: npm ci, build, copy to deployed/<env>, pm2 reload). Read: planning/closed/015-bug-evaluation-fixes.md § Architecture lines this chain touches.
**Done here**: routed the notice only. **Not done**: closing the findings document or editing architecture/ — the architect's. The two lines become landable as shipped fact only after Stage 2; devops will name them again in the deployment record at Phase 2D.

## 2026-11-08 — devops-hooks-015 — FYI
Chain 015 released: deployment/015-bug-evaluation-fixes-deployment.md (website master b96e364 pushed 21:38:22Z; preview-image-generator prod 8de2b53 pushed 21:38:42Z, deployed 22:02Z and re-run 22:04:49Z). Four routings in one entry:
1. **Architect (architecture line, supersedes the Stage 1 notice's "after Stage 2")**: `system-architecture.md` § Components, preview-image-generator, "graceful SIGINT drain" now has shipped evidence: PM2 5.2.2 sends an IPC shutdown message, and at stop (2) the M8 build logged `Server received shutdown message. Closing server.` and `Drain complete in 1ms.` then exited 0 s after `Stopping app` (verification/015/m8-0-run2-2026-11-08T2205Z.txt, span 3; an idle drain, no in-flight render observed). The old build's stop was a SIGKILL at the full window (same capture, spans 1 and 2). `preview-image-generator.md` P-3 ("no build step") disagrees with prod.yml, as the plan's § Architecture lines this chain touches states; the host also needed a runner started before the push deployed. Reconciliation is the architect's; the architecture findings document `architecture/015-bug-evaluation-fixes-architecture-findings.md` (Status Active) closes with it.
2. **Roadmap (obligation)**: no roadmap exists (agent-output/roadmap holds only .gitkeep, per the plan), so no epic or criterion moves. Chain 015's released state: the bug-evaluation fixes F-1 to F-50 as scoped by plan 015 rev 29, released 2026-11-08, post-deploy rows B-6 and B-7 open in handoff/bug-evaluation-fixes-post-deploy-2026-11-08.md. For the roadmap agent when it next runs.
3. **Security**: `security/015-preview-image-generator-security-audit.md` (Status Active) names its closing condition: "Moves to Review Complete when devops records the prod push of a SHA this review covers". The record is deployment/015-bug-evaluation-fixes-deployment.md § Release Execution: prod 471578f → 8de2b53 at 21:38:42Z, and 8de2b53 is the reviewed tip. Close to Review Complete; the host-posture handoff is separate and stays open.
4. **Critic**: `critiques/015-bug-evaluation-fixes-cycle9-critique.md` (Status Open) says "Open until L-C9-3 carries a Planner batch row or lands; then Resolved". The plan's Planner batch row L-C9-3 reads "Discharged" (planning/closed/015-bug-evaluation-fixes.md, row L-C9-3). L-C9-4 rides handoff/preview-image-generator-generic-pool-private-field-2026-11-08.md. Close to Resolved.
5. **Analyst**: `analysis/015-bug-evaluation-fixes-analysis.md` (M8-0; run 1 and run 2 both now captured) and `analysis/015-bug-evaluation-fixes-upload-dialog-analysis.md` (D39; its open owner question was answered by the D40 live check and handoff/upload-message-dialog-closes-on-first-portal-load-2026-11-08.md) are both Active with their questions answered. Close with the terminal token the analysis vocabulary gives them.
**Done here**: the routing only. **Not done**: closing any of these five documents, which belong to the architect, security, critic and analyst, or editing architecture/.

## 2026-11-08 — architect-hooks-015 — FYI
Two architecture obligations outlive chain 015's findings document, closed Resolved at `architecture/closed/015-bug-evaluation-fixes-architecture-findings.md`:
1. `architecture/system-architecture.md` has not been reconciled to chains 012–014's implemented state. Chain 015's reconciliation is landed; the earlier chains' is not.
2. `architecture/013-components-v2-editing-surfaces-architecture-findings.md` is still `Status: Active`, although chain 013 is closed. Its open items need dispositioning and the document closing.
Both belong to the architect. Asking for the next architect session the owner or steering commissions to take them.
**Done here**: this entry. **Not done**: either reconciliation, because it was outside the closure brief; and this file's commit, which belongs to its domain owner.

## 2026-11-08 — security-hooks-015 — FYI
`tools/check-repo.js` at the security audit's closure (2026-11-08T22:1xZ, from the agent-output root, output saved and read from a file): `FAIL — 39 problem(s)` — LINKS 8, BASENAMES 24, FRONTMATTER 3, SCOPE 4. None names `security/` or `handoff/preview-image-generator-host-security-posture-2026-11-08.md` (`grep -c 'security/'` over the saved output → 0). Among them: `INBOX.md:85` and `:97` and `steering/015-rulings.md:4` cite documents this record does not hold; the `verification/015/cr-m8-probes` basename collisions steering's 22:13Z rulings block names. For the owners of those documents and this record's `tools/` owner (the pi-statbot-023-hooks-012-013 entry of 2026-08-26 above, `check-repo.js` baseline).
**Done here**: this entry. **Not done**: any repair — none of the failing documents is this session's; this file's commit.
Re-run 2026-11-08T22:21Z after `f477529` (the cr-m8-probes rename): `FAIL — 37 problem(s)`, BASENAMES 22; still none in `security/` or the handoff.

## 2026-11-09 — pi-batch — FYI
`node tools/check-repo.js` at 2026-11-09T03:02Z, run by pi batch 31 before hand-back, fails on six closed documents no `INBOX.md` entry names: SCOPE — `deployment/closed/012-message-valid-field-readiness.md`, `deployment/closed/013-components-v2-editing-surfaces-readiness.md`, `deployment/closed/014-test-suite-cleanup-readiness.md` (no recognised stage suffix, expected `deployment`); LINKS — `implementation/closed/012-message-valid-field-implementation.md:43` (`verification/012/backfill-report.md` does not resolve); duplicate basenames — `verification/013/probe-cr25-mutation-error-readability/RUN.md` and `verification/013/probe-cr27-settledmode-reachability/RUN.md` (with their `output.txt` and `probe.ts`). Each is the record owner's to rename, re-point or baseline.
**Done here**: this entry. **Not done**: no edit to any of them.

## 2026-11-09 — pi-batch — FYI
For the architect, from retrospective 015 (`retrospectives/closed/015-bug-evaluation-fixes-retrospective.md`, R8 and its Handoff): (1) `architecture/preview-image-generator.md` P-3 names "a self-hosted runner" but not its liveness as a deploy dependency — at 015's release the generator deployed 24 minutes after the push because the runner was down until the owner started it; (2) `architecture/system-architecture.md` § Roadmap Readiness still describes plan 013 as "open and in critique". Asking for both to be reconciled on the architect's next commission.
**Done here**: routed; pi batch 31 records the routing. **Not done**: no architecture edit, which is the architect's.
