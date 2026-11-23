---
ID: n/a
Origin: fix-emoji-pretransform-widths
UUID: 27c7b0a0
Status: Active
Status-Detail: "Stage 1 done and Phase 2A readiness recorded; nothing pushed. Owed before the first ref moves: QA's open-handoff sweep (Phase 3 step 1b) and the owner's release approval. Post-deploy row B-1 rides handoff/fix-emoji-pretransform-widths-post-deploy-2026-11-23.md."
---

# Deployment Record: fix-emoji-pretransform-widths

**Plan Reference**: none (fixer route; determination `steering/fix-emoji-pretransform-widths-rulings.md` block "2026-11-22T22:59"; the owner's word for devops to website `master`, same block).
**Stage start**: the QA Phase 2 verdict, `qa/closed/fix-emoji-pretransform-widths-qa.md`, `QA Complete`, `Verified-At 0411d3ba146018a5a8d3e8a45398d7d04f499d18` (record `b3537900`; re-read at write time). No UAT on a `fix-` chain. The code review's anchor reads `Reviewed-At: 0411d3ba…` (record `83e02c84`, Round 1 sub-entry, verdict `APPROVED_WITH_COMMENTS`), re-read at write time.
**Roadmap**: `agent-output/roadmap/` holds only `.gitkeep`; proceeding with reduced context, nothing cited.
**Release Identifier**: website `master` → `0411d3ba146018a5a8d3e8a45398d7d04f499d18` (no `version` field, no tags, no CHANGELOG; none synthesised).
**Brief**: `steering/fix-emoji-pretransform-widths-brief-devops.md` with `…-brief-common.md`; read whole.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T08:33 | `steering-hooks-fixer` (brief above) | Stage 1 and Phase 2A for `chain/fix-emoji-pretransform-widths` at `0411d3b` | Stage 1 done: the three stage documents carry Status `Committed` and are in `closed/` (record `ab4454d8`); two handoffs created. Tip build exit 0. Nothing pushed. The brief arrived with its gate documents named and read. Disclosure: the record's stamp gate refused two typed changelog stamps one minute ahead of the clock; I restamped them from `date -u`. |

## Stage 1 verification (website, at 0411d3b)

| Check | Result | Instrument |
|---|---|---|
| Tree on the chain branch at the head under release | `chain/fix-emoji-pretransform-widths`, HEAD `0411d3ba146018a5a8d3e8a45398d7d04f499d18`; no upstream; nothing pushed | `git branch --show-current`; `git rev-parse HEAD` |
| Nothing in scope uncommitted | website `git status --porcelain`: only `?? .playwright-mcp/` (another session's, not this chain's); record repo `verification/fix-emoji-pretransform-widths/`: the only entries are 10 untracked screenshots `qa/walk-r2/*.png` that QA left uncommitted on purpose (media rule) | `git status --porcelain` |
| Chain range | 4 commits `febf20e..0411d3b` (1da7727, 8cb9265, c2fee5c, 0411d3b); 9 paths, 209 lines added, 21 removed, 6 production paths (83 added lines) and 3 test files | `git log`; `git diff --numstat febf20e 0411d3b` |
| Fast-forward onto production | `git merge-base --is-ancestor febf20e 0411d3b` exit 0; remote `master` = `febf20e39905c977b0d42081137817cb7b704478` (`git ls-remote origin master`, 08:30Z) | exit status; `ls-remote` |
| QA binds the tip | Phase 2 `Verified-At 0411d3b`, the same commit as the tip; tree `d4f88461c7a03f59e67381f24ab9c33e2f071d28` (`git rev-parse 0411d3b^{tree}`) | QA document |
| Release consistency | `package.json` has no `version` field; no CHANGELOG, no tags. The two cross-repo pins, `project-utils` (`github:hooks-gg/project-utils#40ba5d3a…`) and `paracord` (`github:mr-tech/paracord#3f203086…`), are unchanged: `git diff --numstat febf20e 0411d3b -- package.json pnpm-lock.yaml` printed no line | `git diff --numstat` |
| Open disagreements with predecessor documents | none. Non-gating items stay as their documents carry them: CR-2 declined by the reviewer (outside the write set); CR-3 and the `_`-pairing rows carried by steering in `TODO.md`; QA's static-render INFO | documents read |

## Blocking-condition register

Authority: `qa/closed/fix-emoji-pretransform-widths-qa.md`, "Blocking-condition register". One row, **B-1**, class post-deploy-observable (owner devops). No pre-release row exists, so none is unterminated. B-1 never blocks the release act; it is carried in full by `handoff/fix-emoji-pretransform-widths-post-deploy-2026-11-23.md`, which is authoritative on its state from the deploy on. The record has no scheduled reader for it: the read is run in this release session by a `browser-walker` helper after the deploy, so no crontab line is installed and no launcher smoke applies.

## Stage 2 readiness (Phase 2A, 2026-11-23T08:33)

Included: chain `fix-emoji-pretransform-widths` only. Execution mode: **Mode A, agent-executed**, the move run in this session after the owner's answer to the ask put in this session (a role session, not a subagent).

| Step | Result | Instrument |
|---|---|---|
| All chains committed | 1 of 1 | — |
| Tip assembled | the chain branch itself: a fast-forward of remote `master`, no merge commit | `release-move.js website master 0411d3b… --dry-run` exit 0, "ff-from-remote ok; sibling serving refs (none) on one line ok" |
| Release-tip verdict | The assembled tip is the Phase 2 `Verified-At` commit, so the tip's tree is that verdict's tree (`0411d3b^{tree}` = `0411d3b^{tree}`). Phase 2 covers it. What is owed is QA's step 1b, the open-handoff sweep (`stage-procedures/qa-phase-3.md`). The record has no `tools/open-handoff-trigger-sweep.py`; my own read-only enumeration over `handoff/` (35 files, `Status: Open`, whole `Review-Trigger` value matched on `website`, `production`, `vercel`, `master`, `release tip`) listed 16 records. None names this verdict or this release's push except the two this chain created at Stage 1. Two name another chain's already-shipped event (`fix-api-secret-compare-post-deploy`: `0c14d5b` is an ancestor of `origin/master`, exit 0; `vercel-dashboard-cron-list-after-cron-removal`: the dead-cron commit `132a7ab` is on `master`). Requested of steering for QA to run and record as step 1b before the move | `grep`/`awk` over `handoff/*.md`; `git merge-base --is-ancestor` |
| Consistency | see Stage 1 table | |
| Populations (4b) | the release has no consumer or pin population of its own: website is a leaf deployment; the two pins and the lockfile are unchanged in the range | `git diff --numstat` printed no line |
| Packaging (build at the tip) | `npx next build` (Next.js 16.4.6, Turbopack, `"build": "next build"`) in a `git archive` export of `0411d3b` (tree `d4f88461…`), a full copy of `node_modules` (a symlinked one fails Turbopack's root check), under `systemd-run --user --scope -p MemoryMax=8G`: **exit 0**, "Compiled successfully", TypeScript finished, 9 of 9 static pages, 10 app routes and 7 page-router routes listed; 08:30:15Z to 08:30:37Z. Env values were dummies on the command line (key names taken from the build's own error output); no `.env*` value was read. An earlier attempt of this run failed at prerender on missing env keys (twice), which is the dummies, not the code. Export deleted (`ls -d` no such path). No lockfile or package-manager change, so the host-major install check does not apply | `verification/fix-emoji-pretransform-widths/devops/next-build-0411d3b.{txt,exit}`, `…-times.txt` |
| Workspace | website `git status --porcelain`: only `?? .playwright-mcp/`; HEAD `0411d3b` on the chain branch. Predecessor exclusion (QA left screenshots uncommitted, `.playwright-mcp/` untracked): `release-move` reported "untracked 17 path(s) left alone", so neither affects the move | dry-run output |
| History rewritten | no; the verified commit is the tip and reachable | `git cat-file -e` |
| Serving refs | remote heads: `backup`, `external`, `master`, `redesign`, `regex-refactor` (`git ls-remote --heads origin`, 08:30Z). Only `master` is in release-move's serving list: "one serving ref at origin (master); no pair" (`--report` exit 0) | `release-move.js website --report` |

**Phase 2C block (re-derived against the mechanism, per repository: website):**
- **Deploy mechanism.** Re-derived: `.github/` holds `prompts/` only and no `workflows/` (`ls`); `release-move` prints "workflows none"; `vercel.json` is absent at the tip; `package.json` has no deploy script. **Accepted as written, a named risk**: that a push of `master` builds and serves production through Vercel's git integration, whose default-ref behaviour (which commit it checks out) is not read here. Evidence on record: the project's production deployments listed by the look-only CLI (`vercel ls --prod` this run: newest `hooks-gg-website-jibbsnk91-hooks-gg.vercel.app`, Ready, 10h old, built from `master`'s prior pushes), and earlier releases evidenced by the owner's attestation.
- **Rollback.** The reversing patch was dry-run: `git diff febf20e 0411d3b` written to `verification/fix-emoji-pretransform-widths/devops/release-febf20e-0411d3b.diff`, then `git apply --check -R` against the tree at `0411d3b`, exit 0 (the revert applies cleanly). The owner's established fast path is a Vercel promote of the previous deployment (not exercised, accepted as written). A git rollback is a new revert commit pushed as a fast-forward, and needs a new ask.
- **Ordering.** Dry-run → the owner's yes → move → `ls-remote` → B-1 walk. Nothing interleaves with the move.
- **Serving refs.** As in the table.
- **Release tooling.** `release-move.js` takes the repository as a path relative to the workspace root (`/usr/local/bin/hooks`): `website`, not the working directory.

**Runbook (one artifact; results fill in on execution):**

| # | Step | Abort criterion | Result |
|---|---|---|---|
| 1 | `git -C /usr/local/bin/hooks/website ls-remote origin master` | not `febf20e39905c977b0d42081137817cb7b704478` → stop; the tip is no longer a fast-forward and the verdict must be re-taken | `febf20e…` at 08:30Z; to be re-read just before the move |
| 2 | QA's step 1b recorded for this tip | no record → the move takes neither `--qa-record` nor `--reason`; stop | pending |
| 3 | `cd /usr/local/bin/hooks && node ~/.claude/tools/release-move.js website master 0411d3ba146018a5a8d3e8a45398d7d04f499d18 --dry-run --reason "<Phase 2 Verified-At covers the tip; step 1b record>"` | exit ≠ 0 → stop | a dry run without evidence exited 0 earlier this run ("every check passed; nothing moved"; the real move refuses without `--qa-record` or `--reason`) |
| 4 | the owner's yes to the release, in this session | no yes → Aborted; nothing moved | pending |
| 5 | the same command without `--dry-run` (moves local `master`, pushes, switches the tree back to `master`) | exit 2 → nothing moved, stop; exit 1 → read the report for ref state, route to the owner | pending |
| 6 | `git ls-remote origin refs/heads/master` equals `0411d3b…`; tree on `master`, `git status --porcelain` shows no tracked change | any difference → route to the owner | pending |
| 7 | `git branch -d chain/fix-emoji-pretransform-widths` (merged); `ls-remote` shows no chain branch on origin | `-d` refuses → name it to the owner; do not force | pending |
| 8 | look-only: `vercel ls --prod` shows a new production deployment, Ready, serving `https://hooks.gg` (`timeout 60`, stdin closed, retry twice) | not Ready, or Error → report to the owner; never redeploy or change settings | pending; baseline before the release: newest `hooks-gg-website-jibbsnk91-hooks-gg.vercel.app`, Ready |
| 9 | B-1 walk on hooks.gg (the handoff, items 1 and 2) | the line reads `x`, emoji, `lmnopq` → the fix did not reach the build → report; promote of the previous deployment is the owner's call | pending |

## User-visible flows (the fixer's, quoted to the owner with the release)

From `implementation/closed/fix-emoji-pretransform-widths-implementation.md`, "User-visible flows":

1. Paste or type `x🙂 abcdefghijklmnopq`. The emoji appears as an emoji and every letter after it stays. Before the fix, `abcdefghijk` disappeared.
2. In a code block, type `x = "🙂" + 1;`. Everything after the emoji stays.
3. Type `\*` and then an emoji and some text. The `\*` and the text stay.
4. Open a saved message containing `\🙂 **bold**` or `\*not italic\*`. It opens exactly as saved, with the backslashes kept. Before the fix, opening it turned `\🙂` into `:slight_smile:` and dropped the backslashes, and that changed text was what got saved.
5. Type `🙂 *italic*` or `\🙂 **bold**`. The styling covers the right words.
6. (Round 2) Type or paste `wow :ok🙂 hi`. Every character stays; the 🙂 stays a plain emoji beside `:ok` and is not turned into the 👌 emoji.

Unchanged on purpose: an emoji inserted into the editor is still saved and copied as its `:name:` text (the exclusion).

## Open at this point

- QA's step 1b record for this tip (requested of steering).
- The owner's release approval, put by this session once the above is recorded.
- Forward items: B-1 and its guidance limbs, `handoff/fix-emoji-pretransform-widths-post-deploy-2026-11-23.md`; the guild-emoji picker and mobile IME, `handoff/fix-emoji-pretransform-widths-picker-guild-emoji-ime-2026-11-23.md`; CR-2, CR-3 and the `_`-pairing and static-render rows, `TODO.md` item "website editor: nested formatting loses the outer style" (steering's).
