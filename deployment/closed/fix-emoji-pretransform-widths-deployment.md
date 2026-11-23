---
ID: n/a
Origin: fix-emoji-pretransform-widths
UUID: 27c7b0a0
Status: Released
Status-Detail: "Released 2026-11-23T08:38Z: website master febf20e -> 0411d3b on origin (release-move.js exit 0; ls-remote read back). Chain branch merged and deleted. B-1 executed PASS on hooks.gg production. The guild-emoji picker and mobile IME limbs ride handoff/fix-emoji-pretransform-widths-picker-guild-emoji-ime-2026-11-23.md; they do not hold this record open."
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
| 2026-11-23T08:37 | `qa-fix-emoji-pretransform-widths` (message, QA Phase 3 `Release Verified` at `0411d3b`, record `4f43628b`) | Step 1b and release-tip verdict | Re-read at the record: committed, `Verified-At 0411d3b`, tree equal to Phase 2's. Dry run with `--qa-record` exit 0. The release ask is put to the owner next. |
| 2026-11-23T08:38 | `devops-fix-emoji-pretransform-widths` (Phase 2B, 2C) | Release ask answered; release executed | The owner answered the selection prompt put in this session with "Release now (Recommended)". Move run in this session: `release-move.js` exit 0 at 08:38:18Z to 08:38:23Z; origin `master` read back as `0411d3b`. Chain branch deleted with `git branch -d`. A new Vercel production deployment (`hooks-gg-website-c8t6ruw19-hooks-gg.vercel.app`) appeared Building at 08:38:31Z. Phase 2D follows below. |
| 2026-11-23T08:45 | `devops-fix-emoji-pretransform-widths` (Phase 2D) | Post-release and closure | Vercel production deployment Ready 34s after the push. B-1 walk on hooks.gg: PASS (`x`, emoji, ` abcdefghijklmnopq`; `wow :ok🙂 hi` exact; standard-emoji picker limb PASS). Handoff closed `Addressed`, Phase 3 record and implementation `Released`. Record closed `Released`. |

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
| 2 | QA's step 1b recorded for this tip | no record → the move takes neither `--qa-record` nor `--reason`; stop | `qa/website-0411d3b-release-tip-qa.md`, `Release Verified`, `Verified-At 0411d3b`, record `4f43628b`; step 1b: 35 open handoffs, exactly 1 triggered by this push (B-1's carrier), 7 other candidates not triggered. Abort criterion not met |
| 3 | `cd /usr/local/bin/hooks && node ~/.claude/tools/release-move.js website master 0411d3ba146018a5a8d3e8a45398d7d04f499d18 --dry-run --qa-record /usr/local/bin/hooks/agent-output/qa/website-0411d3b-release-tip-qa.md` | exit ≠ 0 → stop | a dry run with the QA record exited 0 after step 2 ("evidence qa-record …; every check passed; nothing moved"); a dry run without evidence exited 0 earlier this run ("every check passed; nothing moved"; the real move refuses without `--qa-record` or `--reason`) |
| 4 | the owner's yes to the release, in this session | no yes → Aborted; nothing moved | Yes, by selection ("Release now (Recommended)"), answered before 08:38:12Z |
| 5 | the same command without `--dry-run` (moves local `master`, pushes, switches the tree back to `master`) | exit 2 → nothing moved, stop; exit 1 → read the report for ref state, route to the owner | `release-move.js website master 0411d3b… --qa-record …/website-0411d3b-release-tip-qa.md`: exit 0, 08:38:18Z to 08:38:23Z: "OK moved master: febf20e… -> 0411d3b… on origin; tree on master". The runbook-step-1 re-read and a final dry run were at 08:38:12Z (`master` still `febf20e…`; "every check passed"). Abort criterion not met |
| 6 | `git ls-remote origin refs/heads/master` equals `0411d3b…`; tree on `master`, `git status --porcelain` shows no tracked change | any difference → route to the owner | `ls-remote` = `0411d3ba146018a5a8d3e8a45398d7d04f499d18`; `branch --show-current` = `master`; `rev-parse HEAD master` both `0411d3b…`; porcelain only `?? .playwright-mcp/` (not this chain's). Pass |
| 7 | `git branch -d chain/fix-emoji-pretransform-widths` (merged); `ls-remote` shows no chain branch on origin | `-d` refuses → name it to the owner; do not force | `git branch -d` exit 0; `git rev-parse --verify --quiet chain/fix-emoji-pretransform-widths` exit 1 (gone); `ls-remote --heads origin 'chain/*'` 0 lines. Pass |
| 8 | look-only: `vercel ls --prod` shows a new production deployment, Ready, serving `https://hooks.gg` (`timeout 60`, stdin closed, retry twice) | not Ready, or Error → report to the owner; never redeploy or change settings | Before the release: newest `hooks-gg-website-jibbsnk91-hooks-gg.vercel.app`, Ready, 10h. After: `hooks-gg-website-c8t6ruw19-hooks-gg.vercel.app`, Building at 08:38:31Z, **Ready, 34s** at 08:39:56Z (`vercel ls --prod`, look only). `vercel inspect` hung on three runs (timeout 60 each), so which commit and alias it carries was not read; not needed as evidence (see Release Execution). Pass |
| 9 | B-1 walk on hooks.gg (the handoff, items 1 and 2) | the line reads `x`, emoji, `lmnopq` → the fix did not reach the build → report; promote of the previous deployment is the owner's call | **PASS**, abort criterion not met: the pasted line reads `x`, emoji, ` abcdefghijklmnopq` (all 17 letters), and `wow :ok🙂 hi` reads exactly, 0 emoji images; `handoff/closed/fix-emoji-pretransform-widths-post-deploy-2026-11-23.md`, `verification/fix-emoji-pretransform-widths/devops/walk/` |

## User-visible flows (the fixer's, quoted to the owner with the release)

From `implementation/closed/fix-emoji-pretransform-widths-implementation.md`, "User-visible flows":

1. Paste or type `x🙂 abcdefghijklmnopq`. The emoji appears as an emoji and every letter after it stays. Before the fix, `abcdefghijk` disappeared.
2. In a code block, type `x = "🙂" + 1;`. Everything after the emoji stays.
3. Type `\*` and then an emoji and some text. The `\*` and the text stay.
4. Open a saved message containing `\🙂 **bold**` or `\*not italic\*`. It opens exactly as saved, with the backslashes kept. Before the fix, opening it turned `\🙂` into `:slight_smile:` and dropped the backslashes, and that changed text was what got saved.
5. Type `🙂 *italic*` or `\🙂 **bold**`. The styling covers the right words.
6. (Round 2) Type or paste `wow :ok🙂 hi`. Every character stays; the 🙂 stays a plain emoji beside `:ok` and is not turned into the 👌 emoji.

Unchanged on purpose: an emoji inserted into the editor is still saved and copied as its `:name:` text (the exclusion).

## User Confirmation

Put to the owner directly by this session as a selection prompt (Phase 2B), after QA's Phase 3 record, the tip build and the dry run. It opened with the context (the lost letters after a pasted or typed emoji, and a stored message rewritten on load), then the decision, in plain English with no commit IDs, tool or branch names. It gave the five flows in the fixer's words plus the `wow :ok🙂 hi` case, what was tested (full suite, a real-browser walk 5 of 5 with the fix and 5 of 5 failing without it, the production build) and what was not (custom server emoji from the picker, phone keyboards), that damage already done is not restored, that Vercel deploys on its own in about 30 seconds, the rollback paths, and that I would check hooks.gg with a paste, saving nothing. Options: release now, hold, abort. **Response: "Release now (Recommended)"**, by selection, before 08:38:12Z. Declined: no.

## Release Execution

Mode A, run in this session. Commands and results are in the runbook above. `release-move.js` exit 0; origin `master` = `0411d3ba146018a5a8d3e8a45398d7d04f499d18`, read by `git ls-remote origin refs/heads/master`. Push ref `master`, SHA `0411d3b`, 08:38:18Z to 08:38:23Z.

**Serving state**: the push is the deploy evidence, complete as it stands, recorded VERIFIED on the push. Beside it and not required: a new Vercel production deployment went Ready 34s after the push, and the B-1 walk on hooks.gg read the fixed behaviour. Which commit the Vercel integration checks out (its default-ref behaviour) is the named risk, accepted as written; the walk is its falsity signature and did not fire. Nothing is marked NOT VERIFIED.

## Phase 2D: release metadata and reconciliation

Standing note: point-in-time as of 2026-11-23T08:46Z; the serving line may have moved since, and later records are authoritative on their own refs.

| Field | Value |
|---|---|
| Release identifier | website `master` → `0411d3ba146018a5a8d3e8a45398d7d04f499d18` (no version field, no tags; none created) |
| Environment / serving ref | production (Vercel, deploys `master`; no GitHub workflow); `master`, the sole serving ref (`release-move`: no sibling to split) |
| Release date | 2026-11-23, 08:38Z |
| Execution mode | Mode A, agent-executed, in this session |
| Authorizer | the owner, by selection at the Phase 2B prompt |
| Included plans | none; chain `fix-emoji-pretransform-widths` only (fixer route, `ID: n/a`) |
| Repositories and SHAs shipped | `website` only: `febf20e` → `0411d3b` (1da7727, 8cb9265, c2fee5c, 0411d3b). `agent-output` is the record, not a shipped repository |

**Deployed against verified, per repository (website).** Deployed ref `master`; the pushed commit is `0411d3b`, read from `ls-remote` after the move. Phase 2's `Verified-At`, the code review's `Reviewed-At`, the Phase 3 record's `Verified-At` and the fixer's `Handoff-At` are all `0411d3b`. **The same commit**, so no diff of the surface is owed.

**Fix branch.** `chain/fix-emoji-pretransform-widths` is merged (`git merge-base --is-ancestor 0411d3b origin/master` exit 0 at the push) and deleted with `git branch -d` (runbook step 7).

**Architecture lines.** `grep -n -iE` of `architecture/website.md` and `architecture/system-architecture.md` for `withNormalizeNode`, `getInitialValue`, `surrogateSource`, `translateSurrogates`, `decorator` and `emoji` finds `system-architecture.md` line 238, the Problem Area on `decorator.tsx` reading highlight.js's private emitter (`codeLineRanges`, untouched by this chain; the code review read the same row), and unrelated `frequentlyUsedEmojis` storage lines. No line is closed or invalidated, so no architect entry is lodged; steering lodges any entry at closure. `agent-output/roadmap` holds only `.gitkeep` and the scoping names no epic or criterion, so no roadmap entry is lodged.

## Chain documents and terminal tokens (Phase 2D steps 2b, 5b, 5c)

Enumerated by `grep -rl "fix-emoji-pretransform-widths" --include=*.md` over the record, outside `verification/` and `steering/`.

| Document | Terminal token | Where |
|---|---|---|
| `implementation/…-implementation.md` | Released | `implementation/closed/` |
| `code-review/…-code-review.md` | Committed | `code-review/closed/` |
| `qa/…-qa.md` (Phase 2) | Committed | `qa/closed/` |
| `qa/website-0411d3b-release-tip-qa.md` (Phase 3) | Released | `qa/closed/` |
| this deployment record | Released | `deployment/closed/` |
| `handoff/…-post-deploy-2026-11-23.md` | Addressed | `handoff/closed/` |
| `handoff/…-picker-guild-emoji-ime-2026-11-23.md` | Open (steering's; guild emoji and mobile IME) | `handoff/` |

`fix-` chains whose `Handoff-At` is an ancestor of the released tip: a loop over every `implementation/closed/fix-*` document with Status `Committed` and `repos=website` (`git merge-base --is-ancestor`) listed this chain only. No other chain is open. The handoffs the chain answered (a fixer chain's source handoffs, named in its scoping block) are steering's to list and close `Addressed` at the chain's closure; none is named in the brief to this stage.

**Forward items beyond the register**, found by `grep -l 'Assumption Not Checked'` over the chain's documents (code review, Phase 2 QA, Phase 3 QA) and the routing phrases:
- Code review: jsdom paste versus a real browser. Discharged by QA's browser walk, 5 of 5 at `0411d3b`, and by the B-1 walk on production.
- QA Phase 2: the emoji picker's insert path. Standard-emoji limb discharged by the production walk (S3, handoff Result); guild emoji and mobile IME carried by `handoff/fix-emoji-pretransform-widths-picker-guild-emoji-ime-2026-11-23.md`.
- QA Phase 3: that a push of `master` serves the pushed commit. Closed by B-1 on production.
- CR-2 (declared type for `sourceOffsets`): declined by the reviewer, outside the write set (`src/@types/simple-markdown.d.ts`); a LOW note for any chain that edits the type file, carried in the code review document and not in a handoff of its own.
- CR-3, the heading ranges past the line end, the `_`-pairing rows and QA's static-render note: carried by steering in `TODO.md`, item "website editor: nested formatting loses the outer style" (lines 224 to 230 read at write time).
- The implementation's "Residue already in production": text lost before the fix is not restored, and the owner checks live saved messages. Not carried by a stage; named to the owner in the release ask.
- Retrospective: not mine to invoke; the spawn cue goes to steering in this turn's message.

## Post-Release Status

- **Status**: Released, 2026-11-23T08:38Z. The one register row, B-1, is terminal (EXECUTED, PASS). Deploy evidenced by the push, with a new production deployment Ready and the production walk reading the fix.
- **Known issues**: none open in this chain. Not covered by any stage: guild emoji from the picker and mobile keyboards (handoff above). Messages already damaged before the fix stay damaged.
- **Rollback plan**: Vercel promote of the previous production deployment, `hooks-gg-website-jibbsnk91-hooks-gg.vercel.app` (accepted as written, not exercised). A git revert of `febf20e..0411d3b` applies cleanly (`git apply --check -R`, exit 0) and ships as a new fast-forward push, which needs a new ask. Communicating a rollback to anyone is the owner's.

## Next Actions

Standing note: later documents are authoritative on current state.
- Guild emoji and mobile IME: `handoff/fix-emoji-pretransform-widths-picker-guild-emoji-ime-2026-11-23.md` (`Owning-Stage` steering; event-form `Review-Trigger`).
- Nothing else has a trigger at or after this record's closure that lacks a carrier.
