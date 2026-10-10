---
ID: n/a
Origin: fix-v1-guild-messages-auth
UUID: 9c90dfa0
Status: Active
Status-Detail: "Stage 1 BLOCKED at the blocking-checklist gate: B-1 (owner key check) and B-2 (HOOKS_HOST read, sanctioned for release time) are open pre-release rows. Every other Stage 1 check passes at website ddbd750. Nothing committed, merged, pushed or closed by this stage."
---

# Deployment Record: fix-v1-guild-messages-auth

**Plan Reference**: none (fixer route; owner's selection, `steering/v1-guild-messages-auth-rulings.md`, "fix route: Fixer").
**Stage start**: the QA Phase 2 verdict, `qa/fix-v1-guild-messages-auth-qa.md`, QA Complete, `Verified-At` 7606149 (committed at 9b4de7e; re-read this run). No UAT on a `fix-` chain.
**Release Identifier**: not yet assigned (Stage 2). Target: `website` `master`.
**Roadmap**: none for `website` in this record (`ls agent-output/roadmap` → no such directory). Proceeding with reduced context.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-10-10T08:26 | steering (subagent spawn), Stage 1 only | Stage 1 for `website` `fix/v1-guild-messages-auth` at ddbd750 onto `master` f2c85f5 | Steering's brief arrived. Orphan check: no open document in `deployment/`. Stage 1 checks pass except **step 2b**: register rows B-1 and B-2 are open, so the commit is blocked. No ref moved; no document's Status changed; no host read and no production request made. |

## Stage 1 verification (website, at ddbd750)

| Check | Result | Instrument |
|---|---|---|
| Tree on the chain branch at the head under release | `fix/v1-guild-messages-auth`, HEAD `ddbd750c1ab4…` | `git -C website branch --show-current`; `rev-parse HEAD` |
| Nothing in scope uncommitted | `status --porcelain` 0 lines; untracked (`ls-files --others --exclude-standard`) 0 | written to file, `wc -l`; `grep -c .` |
| Fix range | 4 commits f2c85f5..ddbd750 (1acffee, c8c3d70, 7606149, ddbd750); 9 paths, 4 production + 5 test/helper | `git log --oneline`; `git diff --numstat` |
| QAF-1 discharge | `rev-parse ddbd750:src/server/api/v1/__tests__/guildMessages.statbot-key-required.test.ts` = `7dcbfa69ca1e49c5b690dbe43de9549438630548`, the hash the QA document names; 7606149..ddbd750 touches that one path only | `git rev-parse`; `git diff --name-only` |
| QA verdict still binds production bytes | `git diff --quiet 7606149 ddbd750 -- src/middleware.ts src/pages` exit 0 | exit status |
| Fast-forward onto production | `merge-base --is-ancestor f2c85f5 ddbd750` exit 0. `master` = `origin/master` = remote `refs/heads/master` = f2c85f5 | `git ls-remote origin` (at the remote) |
| HELD chore branch excluded | `merge-base --is-ancestor 9cefc7d ddbd750` exit 1: `chore/agent-comment-sweep` is not in this release | exit status |
| Release consistency | `package.json` has no `version` field; no CHANGELOG (`cat-file -e ddbd750:CHANGELOG.md` exit 128); repo has 0 tags. Nothing is synthesised. Cross-repo references (`project-utils` `github:…#master`, `paracord` `github:mr-tech/paracord`) and the lockfile are unchanged in the range: `git diff --quiet f2c85f5 ddbd750 -- package.json pnpm-lock.yaml pnpm-workspace.yaml vercel.json next.config.js .gitignore` exit 0 | exit status; `node` over `package.json` |
| Gitignore review | No change proposed. Nothing untracked; `.gitignore` unchanged in the range | as above |

## Blocking-condition register (authority: `qa/fix-v1-guild-messages-auth-qa.md`, the chain's one register; re-read 2026-10-10T08:26)

Standing note: point-in-time; a later write to the QA register or to this record supersedes this table.

| Row | Class | State at this read | Effect here |
|---|---|---|---|
| B-1 (owner's key comparison, "match") | pre-release | **Open.** OWNER-QUEUE carries the ask; no answer in the rulings file | Blocks Stage 1 commit (step 2b) |
| B-2 (`grep -cx 'HOOKS_HOST=hooks.gg'` on the statbot-api and statroles hosts, count only) | pre-release | **Open.** Sanctioned "at release" (rulings, "B-2 and production probes"). Not run: Stage 1 only, and the sanction sits with the steering thread that holds his words | Blocks Stage 1 commit (step 2b). Discharges into this record |
| B-3 (unauthenticated GET → 401) | post-deploy | Open | Never blocks the release act. Carrier handoff owed at the commit (Stage 1 step 8), not created while the commit is blocked |
| B-4 (Statbot's own calls still succeed) | post-deploy | Open; depends on B-1, B-2 | As B-3 |

The pre-deploy `curl -sI http://hooks.gg/` (QA, Assumption Not Checked) is sanctioned for "before deploy". It was not sent.

## Deploy mechanism (re-derived from the repo; not yet the Phase 2C block)

- No `.github` at ddbd750 (`git cat-file -e ddbd750:.github` exit 128). `vercel.json` holds only a `crons` entry, which is configuration, not a trigger. `package.json` has no deploy script.
- Production is Vercel (`architecture/system-architecture.md`, owner ruling 2026-08-23). Whether Vercel's git integration builds production from a push to `master` is **not readable from the repo**. That integration is outside the repo. The precedent: release 014 pushed `master` to f2c85f5, and the owner attested "The site is serving f2c85f5" (`deployment/closed/014-test-suite-cleanup-deployment.md`). That is evidence of past behaviour. It is not a read of the integration's settings.
- Serving refs at the remote: `master` (sole serving ref by that record); `backup`, `external-message-api`, `redesign`, `regex-refactor` also exist at origin.
- Correction to a closed record: `014-test-suite-cleanup-deployment.md` §4 says "No PM2 `ecosystem.config.*` exists in `website`". `ecosystem.config.json` is tracked at f2c85f5 and ddbd750 (`cat-file -e` exit 0; added at fc5e2c6). The conclusion that PM2 is not the live path still stands on the owner's ruling.

## Stage 2 prerequisites recorded now

1. B-1 answered "match", and B-2 = 1 on each host, recorded here.
2. **Release-tip verdict**: the assembled tip is ddbd750 itself (a fast-forward, while `master` stays at f2c85f5). QA's verdict is `Verified-At` 7606149. QA's patched full-suite run (598/598, exit 0) ran over content equal to ddbd750 by blob equality. However, no QA record names ddbd750. Phase 2A needs either a QA record at ddbd750 or QA's own statement that the 7606149 verdict covers ddbd750.
3. Build at the tip (`next build`) is a Phase 2A step and has not been run.
4. Rollback: the owner's established mechanism is Vercel promote of a previous deployment (014 record). Accepted as written: a named risk.
