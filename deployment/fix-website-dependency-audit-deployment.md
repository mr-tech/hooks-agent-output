---
ID: n/a
Origin: fix-website-dependency-audit
UUID: d9ef268a
Status: Active
Status-Detail: "Crontab line installed 2026-11-21T01:11Z; no push and no serving ref (record origin deploys nothing). Open on the chain's end step: the first scheduled run, 2026-11-21T06:43Z, is read at B-1."
---

# Deployment Record: fix-website-dependency-audit

**Plan Reference**: none (fixer route; owner's Q2 "yes", `steering/website-deps-review-rulings.md` block 2026-11-20T23:44Z; "record entry only", `steering/fix-website-dependency-audit-rulings.md` block 2026-11-20T23:58Z).
**Stage start**: QA Phase 2 verdict `qa/fix-website-dependency-audit-qa.md`, `QA Complete`, `Verified-At ead3ea1` (record `8762f1b`). No UAT on a `fix-` chain. Code review `code-review/fix-website-dependency-audit-code-review.md`, `Reviewed-At c5508c7`, APPROVED. Brief: `steering/fix-website-dependency-audit-brief-devops.md` with its common part.
**Roadmap**: `agent-output/roadmap` not read for this chain (a fixer chain with no epic); proceeding with reduced context, nothing cited.
**Release Identifier**: none. No ref moves and nothing is published. The deliverable is a crontab line running the record's `tools/website-dependency-audit.js`; the tool at install is record `master` `5d0baf8`.
**Execution Mode**: agent-executed (crontab install in this session, the act the brief names). No push; the record's `origin` deploys nothing.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T01:11 | steering-roadmap-hooks (brief, record `6d1e563`) | Install the crontab line; read the first run | Stage 1 and the end step's install. Tree and verdict checked, cron-environment smoke run at `5d0baf8` quiet, log folder made, line installed (below). The first scheduled run is 06:43Z, hours out: record open on B-1. |

## Pre-Release Verification

| Check | Result | Instrument |
|---|---|---|
| QA verdict and its tree | `QA Complete`, `Verified-At ead3ea1`. Since then two commits: `ead3ea1..5d0baf8` changes `tools/website-dependency-audit.js` and `tools/website-audit-dispositions.json` by one line each, `REVIEW` and `_review` from `pending review at f943553` to `reviewed`; the test file is byte-identical. QA's verdict names this move as the fixer's post-verdict act that changes no behaviour | `git diff --numstat ead3ea1 HEAD -- tools/`; `git diff` of the two files read |
| Marker | `pending review at` removed from both files; `--help` prints `Review state: reviewed` | `grep -n`; the tool's `--help` |
| Suite at `5d0baf8` | 23 tests, 23 pass, exit 0 | `node --test tools/websiteDependencyAudit.test.js` |
| Release consistency | No `version` field applies. The cross-repo reference is the website `origin/master` the tool audits: local clone `76da25c`, the value QA's B-1 row predicted | `git -C website rev-parse origin/master` |
| Packaging | No build; the tool is a script run in place. Its three prerequisites exist: `/usr/local/bin/node`, `/home/dev/.local/share/pnpm/pnpm`, the website clone | `ls` |
| Workspace | Nothing in the chain's paths uncommitted at the start of this stage (`git status --porcelain -- tools implementation qa code-review steering` showed only the steering selection-ledger day file, another session's). Untracked `verification/fix-website-dependency-audit/` files at the time of writing are the code reviewer's capture and this stage's own | `git status --porcelain` |
| Cron-environment smoke at `5d0baf8` | `env -i HOME=/home/dev PATH=/usr/local/bin:/usr/bin:/bin`, `--inbox` and `--state` pointing at scratch files under the session's scratchpad: `2026-11-21T01:10Z website 76da25c (origin/master; remote head 76da25c): advisories 81, undispositioned 0, newly reported 0 []`, exit 0; the scratch inbox stayed 16 bytes. The record's `INBOX.md` was not named. Capture: `verification/fix-website-dependency-audit/devops-smoke-cron-env-5d0baf8.txt`. This is not the first scheduled run and does not close B-1 | the run itself |

**Release-tip verdict gate.** There is no assembled tip: the work is on record `master`, with no chain branch and no merge. The verdict `Verified-At ead3ea1` stands for the three tool paths, and the diff to the installed tree is the two marker lines above.

## Mechanism, re-derived before the line was installed

| Line | State | Instrument |
|---|---|---|
| Deploy mechanism | Re-derived: a user crontab line, `cd /usr/local/bin/hooks/agent-output && PATH=… node tools/website-dependency-audit.js --pnpm …`, appending to `/home/dev/.local/state/website-dependency-audit/cron.log`. The `cron` daemon is running (pid 915) in UTC (`date +%Z`), so `43 6 * * *` is 06:43Z | `crontab -l`; `ps -eo pid,lstart,args`; `date +%Z` |
| Which SHA runs | The line runs the file in the record's working tree. At install that is the committed blob at `5d0baf8` (no uncommitted change to the tool paths). A later commit to those paths changes what the next run executes, and expires QA's verdict by its own terms | `git diff --quiet HEAD -- tools/…` |
| Rollback | Remove the two lines (the comment and the schedule line): `crontab -l` before the install is saved at `verification/fix-website-dependency-audit/devops-crontab-before.txt`, so `crontab - < <that file>` restores it exactly if no other line was added since. The tool's writes are `INBOX.md` entries (the owner deletes an entry) and `~/.local/state/website-dependency-audit/reported.json` (delete to re-report) | read of the two captures |
| Ordering constraint | The log folder exists before the first run (made 01:10Z, `ls -ld`) | `mkdir -p`; `ls -ld` |
| Serving refs | None. Nothing pushed | — |

## Release Execution

- **Folder:** `mkdir -p /home/dev/.local/state/website-dependency-audit`, exit 0 (the folder was absent before).
- **Crontab:** `crontab -l` saved (before, 80 lines); two lines appended: the comment (owner, date, removal condition, as the crontab's other lines carry) and `43 6 * * * cd /usr/local/bin/hooks/agent-output && PATH=/usr/local/bin:/usr/bin:/bin /usr/local/bin/node tools/website-dependency-audit.js --pnpm /home/dev/.local/share/pnpm/pnpm >> /home/dev/.local/state/website-dependency-audit/cron.log 2>&1 # fix-website-dependency-audit`. The live crontab then equalled the intended file (`cmp` exit 0); no existing line removed (`diff` shows 0 removed, 3 added: a blank line, the comment, the schedule line). Captures: `devops-crontab-before.txt`, `devops-crontab-after.txt`, `devops-crontab-installed-lines.txt` under `verification/fix-website-dependency-audit/`. Time 2026-11-21T01:11Z.
- **Rounds disclosed.** The first form of the install, `crontab <file>` with the file in the session's scratchpad, was refused by the `crontab` binary itself with `<scratchpad directory>/: Not a regular file` (exit 1), though `stat` shows a regular file; it changed nothing (`crontab -l | grep -c` 0). It is a tool error, not a permission control or hook. The standard stdin form, `crontab - < <the same file>`, installed it (exit 0).
- **Not run:** no push, no tag, no publish, nothing on a host other than this machine's user crontab.

## Decisions register (this chain's rulings file)

| Block | Applied |
|---|---|
| 23:58Z record entry only | The tool writes only `INBOX.md`; no Discord or webhook, no headless agent: the crontab line runs the tool and nothing else |
| 23:59Z determination | Stage set followed; end step is this install and the first run's read; no push |
| 2026-11-21T00:01Z seed per advisory | The dispositions file carries `module\|GHSA` keys; the first run's `undispositioned 0` is the check |
| 2026-11-21T00:19Z failure-streak and stale-ref entries; versions a stated limit | Present in the tool (QA's suite covers them); the stated limit CR-3 is unchanged |

## Blocking-condition register (the chain's; QA's row, executed here)

| ID | Class | Condition | Prediction | State |
|---|---|---|---|---|
| B-1 | post-deploy-observable | The first scheduled run under cron's environment reads a non-empty audit | One line `website 76da25c (origin/master; remote head 76da25c): advisories 81, undispositioned 0, newly reported 0 []` unless advisories were published since; U > 0 is correct behaviour, with U entries in `INBOX.md`. Refuted by a `failed:` line with one failure entry, or by `advisories 0` | **Open** — to be read at `cron.log` after 2026-11-21T06:43Z, result in the record below |

Both Assumptions Not Checked (QA: real `pnpm audit` output over `76da25c`'s lockfile has the fixture's shape; the code review: the cron environment lets `pnpm audit` answer) close at the same read. The smoke run above is the same environment run by hand and gave the predicted line, which lowers the risk without closing either.

## First scheduled run (to be completed)

Fire time 2026-11-21T06:43Z. Read: `/home/dev/.local/state/website-dependency-audit/cron.log`; `INBOX.md` is read only by `grep -c` for this tool's entries, never written.

(not yet read)

## Post-Release Status

Installed 2026-11-21T01:11Z. Known issues: none yet. Rollback: above. Forward items: the handoff `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md` item 6 is this chain's; steering owns that handoff's routing and is told at close.

## Next Actions

The first-run read at 06:43Z is this record's own end step, not a later trigger; it is read in this session (cache-warm wake armed), and the record closes after it.
