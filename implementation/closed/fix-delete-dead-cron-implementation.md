---
ID: n/a
Origin: fix-delete-dead-cron
UUID: af508ebe
Status: Released
Status-Detail: "Released: website master moved 0c14d5b to 132a7ab on the owner's release approval (deployment/closed/fix-delete-dead-cron-deployment.md); the fix branch is merged and deleted."
Handoff-At: 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 — repos=website
Origin-Chain: none
---

# Fixer — the daily cron endpoint, its schedule, its test and `cron-parser` are removed (website)

## Scope statement

Route: the owner's scoping determination, `steering/fix-delete-dead-cron-rulings.md`, block "2026-11-21T20:26 — scoping determination:
fixer chain, website, one handoff", relayed by `steering-hooks` in `steering/fix-delete-dead-cron-brief-fixer.md` (with
`…-brief-common.md`). His words, as that block quotes them: effort block 05:50Z Q4, "Agent: delete the cron (Recommended)"; block 20:26
selections "Agent: remove it too (Recommended)" (the package) and "Agent: go ahead without checking (Recommended)" (waiting rows).

Bounded scope, quoted from the block: repository `website` only, from `origin/master` `0c14d5b`, on `chain/fix-delete-dead-cron`:
1. `src/pages/api/cron.ts` is deleted; a request to `/api/cron` then answers the site's ordinary not-found.
2. The `crons` entry leaves `vercel.json`, so Vercel schedules nothing.
3. `cron.scheduled-selection.test.ts` is deleted; suite and `pnpm run typecheck` exit 0.
4. `cron-parser` leaves `package.json` and `pnpm-lock.yaml` (`pnpm remove`), nothing else in the lockfile changing beyond its own subtree.

Write set: those paths (and the lockfile) in website; in the record, this document and `verification/fix-delete-dead-cron/`.

## Entry Conditions

| # | Condition | State |
|---|---|---|
| 1 | Scoping determination | `steering/fix-delete-dead-cron-rulings.md` block "2026-11-21T20:26 — scoping determination…", relayed in the fixer brief. Met. |
| 2 | Bounded scope statement | The block's "Scope statement (bounded)" and "Write set" (quoted above). Property and swept region: the block's "Property and sweep". Met. |
| 3 | Fix branch | `git -C /usr/local/bin/hooks/website branch --show-current` → `chain/fix-delete-dead-cron` (cut by steering, rulings block "2026-11-21T20:27"); HEAD `0c14d5b` at start; porcelain `?? .playwright-mcp/` only (`verification/fix-delete-dead-cron/tree-before-baseline.txt`). Not switched by this session. |
| 4 | Record on the mechanism | `architecture/system-architecture.md:172` (names the cron; made stale by this chain; out of scope, lodged by steering for the architect at closure). `research/competitive-feature-landscape-2026-11-08.md:166` and `research/codebase-bug-evaluation-2026-11-08.md:84` (no writer of `ScheduledMessages`), as read and cited by the sweep `verification/fix-delete-dead-cron/scoping/sweep-origin-0c14d5b.md` Step 6. |

## Diagnosis

**Cause.** At `0c14d5b`, `vercel.json` (8 lines, only key `crons`) schedules `GET /api/cron?key=vercel` daily at `0 0 * * *`.
`src/pages/api/cron.ts` (81 lines) accepts any caller whose query `key` equals the string literal `'vercel'` (line 15). It selects
`ScheduledMessages` rows and updates them (lines 56, 67). No code in website, project-utils or preview-image-generator inserts such rows.
**Instruments:** a read of both files at `0c14d5b` (`git show`), and the sweep `scoping/sweep-origin-0c14d5b.md` Steps 1–5 (route, key,
writers, readers, the only test that imports the route).

**Nothing else resolves `/api/cron` after the deletion** (read this session): the tracked route files under `src/pages` (`git ls-files src/pages
src/app/api`) are `auth/[...nextauth].ts`, `cron.ts`, `interactions-edge.ts`, `interactions-server.ts`, `messages/codes/[code].ts`,
`trpc/[trpc].ts` and `v1/guilds/[guildId]/messages{,/[id]}.ts`. No catch-all sits at the `api/` level. `next.config.js` `redirects()`
covers only `/support` and `/message/m/:id`, and it has no rewrites. `src/middleware.ts`'s matcher does not include `/api/cron` (sweep
Step 1). With the module gone, Next.js answers the path with its ordinary not-found.

**Consumers of what is removed:**
- the route module: imported only by the deleted test (sweep Step 3(a), Step 5).
- `cron-parser`: imported only by `cron.ts` (`git grep "cron-parser" -- src` at `0c14d5b`: `src/pages/api/cron.ts:1` only).
- `vercel.json`: nothing in the repo reads it (`git grep -n vercel.json` outside the lockfile: no hit).
- The test's helpers stay, because each has other importers. `./helpers/apiResponse` (`makeRes`) is imported by 7 other test files.
  `../utils/__tests__/helpers/capturingDatabase` is imported by 8 other test files (`git grep -n` over `src`).

**`vercel.json`: deleted, not left as `{}`.** At `0c14d5b` the file sets only `crons` (sweep Step 1, whole file). Vercel treats
`vercel.json` as optional overrides of the project settings, so an absent file and `{}` give the same configuration. This box has not
checked that against Vercel; devops confirms it from the build log. Deleting the file leaves nothing behind. Nothing in the repo reads the
file (above). An older plan cites a `buildCommand` key at `7923a1d` (sweep Step 1 note), but that key is not in the file at this base.

**Residue in production** (not read here: no instrument on this box reads production rows or the Vercel dashboard):
- Any `ScheduledMessages` row still waiting never sends after the deploy. The owner accepted this without a check first (block 20:26,
  selection A). The table, its schema and the left joins in `guild.ts:54-62` and `shared.ts:161-169` are out of scope and unchanged, so
  the message pages keep showing such rows' stored `sent`/`sendAt` values.
- The release form (a Vercel production deployment of `master`) carries the new configuration as a whole: the deployment ships without
  `crons`, and the route module is absent from its build. If a cron is also configured outside `vercel.json`, in Vercel's own settings,
  it would call a path that now answers not-found. Not checked here (brief common part, hazard 3). The owner, or devops on his word,
  reads the live cron list after the deploy.

**Base vs fix:** the change removes a behaviour and adds none. The only behaviour difference between base and fix is that
`/api/cron` (any key) now answers not-found and no schedule calls it.

**Origin-Chain: none.** The route and `vercel.json` were both added by `fd1fe18` (2023-03-27, "add schedule message cron";
`git log --diff-filter=A -- src/pages/api/cron.ts vercel.json`), a commit with no pipeline chain. `git log -L15,16:src/pages/api/cron.ts`
shows the key check unchanged since then.

## Change

Website commit `132a7ab6f49d8a85ead507e2221ab3c3a531fd00` on `chain/fix-delete-dead-cron`. `git diff --numstat 0c14d5b 132a7ab`:

| Added | Deleted | Path |
|---|---|---|
| 0 | 1 | `package.json` — `"cron-parser": "^4.8.1"` removed from `dependencies` |
| 0 | 17 | `pnpm-lock.yaml` — `cron-parser@4.8.1` (importer entry, package, snapshot) and its only dependency `luxon@3.3.0` (package, snapshot) |
| 0 | 81 | `src/pages/api/cron.ts` — deleted |
| 0 | 55 | `src/server/api/__tests__/cron.scheduled-selection.test.ts` — deleted |
| 0 | 8 | `vercel.json` — deleted |

0 production lines added. Disposition of the deleted test: Test Conventions, "Superseded implementation". The surface is removed, so
no covering test is owed.

**Package-manager operation.** `pnpm remove cron-parser` under pnpm 10.28.2, the repo's `packageManager` pin. Output:
`verification/fix-delete-dead-cron/pnpm-remove.txt`, exit 0. Its peer-dependency warnings and its "Ignored build scripts:
@vercel/speed-insights" notice were already there before this change and are not about this package. Full diff:
`lockfile-diff.txt`. Every moved pin:
- `cron-parser@4.8.1`: removed, as the scope requires.
- `luxon@3.3.0`: removed. Its only dependent was `cron-parser`, and after the change `grep -c luxon pnpm-lock.yaml` → 0.

No other entry moved, and the header `lockfileVersion: '9.0'` is unchanged. `pnpm install --frozen-lockfile --lockfile-only` exits 0
(`frozen-lockfile-check.txt`), so the lockfile agrees with `package.json`. The deploy host's pnpm major was not read on this box: Vercel
takes it from the `packageManager` pin when corepack is enabled. Devops confirms it from the build log.

## Test

This change only removes things. Its spec-form evidence is a check of the removed surface's absence, recorded before and after, not a
suite case (a suite test asserting a file's absence would be a source-text assertion). Instrument:
`verification/fix-delete-dead-cron/check-cron-removed.js <website-repo> <sha>`. It reads the tree at `<sha>` through git only, never
the working tree. It has six limbs, each of which prints PASS or FAIL:

1. no route module resolves `/api/cron`, and there is no `api/` catch-all;
2. `vercel.json` is absent or has no `crons` key;
3. `cron-parser` is not declared in `package.json`;
4. no `cron-parser` line remains in `pnpm-lock.yaml`;
5. the cron route test file is absent;
6. nothing under `src` imports the route or `cron-parser`.

- **Red run** at base `0c14d5b`: `node check-cron-removed.js /usr/local/bin/hooks/website 0c14d5bed78f…` → all 6 limbs FAIL, exit 1
  (`red-check-at-base.txt`). Each limb fails on its own at base, so each is its own negative control: every limb has been seen to
  respond.
- **Green run** at `132a7ab`: all 6 limbs PASS, exit 0 (`green-check-at-fix.txt`). That file also holds a `fatal: path 'vercel.json'
  does not exist` line. It is git's stderr from the script's `show` of the absent file, which the script expects and catches.

Behaviour scope item 1 names: no request was served, because this box treats the local Pusher app as production's and the route would
query a database. The not-found follows from the route enumeration in the Diagnosis, which is a read, not a served request. Checking it
on the live site after the deploy is the first User-visible flow below.

No lifetime is added, no work is declined and no value is resolved differently, so no exit enumeration or routing table is owed.

## Verification

| Check | Command | Result |
|---|---|---|
| Suite at base | `systemd-run --user --scope -p MemoryMax=8G npx vitest run --reporter=json` in the tree at `0c14d5b` | 2361 / 2361 passed, 166 files, process exit 0 (`suite-base-0c14d5b.json`, `.txt`) |
| Suite at fix | same, in the tree at the fix (content of `132a7ab`) | 2358 / 2358 passed, 165 files, process exit 0 (`suite-fix.json`, `.txt`). The difference is exactly the deleted file's 3 cases and 1 file. |
| Typecheck, shared tree | `pnpm run typecheck` | exit 2, only on `.next/types/validator.ts(227,39)` "Cannot find module '../../src/pages/api/cron.js'" (`typecheck-fix.txt`). That file is gitignored, untracked and generated by an earlier Next build on this box (mtime 2026-11-20 06:11Z, before this change). This session did not delete it, because it belongs to the shared tree's build state. |
| Typecheck, isolated export at `132a7ab` | `git worktree add --detach`, `node_modules` linked to the tree's, `npx next typegen` (exit 0, `typegen-export-132a7ab.txt`), then `pnpm run typecheck` | **exit 0**, both tsc programs (`typecheck-export-132a7ab.txt`). Without typegen, the export fails on `~/assets/img/product_image.png`, because `next-env.d.ts` is gitignored. |
| Typecheck, export at `0c14d5b` (control) | same procedure | exit 2, only `src/pages/api/cron.ts(1,33)` "Cannot find module 'cron-parser'" (`typecheck-export-0c14d5b.txt`). This is expected: the linked `node_modules` no longer holds the package. It shows the export procedure responds to the removed module. |
| Lint | `npx eslint . --max-warnings=0`, without `--fix` (the repo's `lint` script has `--fix`, which would rewrite files), in both exports | exit 1 at base and at fix: 761 findings at base, 757 at fix. Per-file digests: `lint-export-{0c14d5b,132a7ab}.digest.tsv`. Set difference (`LC_ALL=C comm`): 4 findings only at base, all in the deleted `src/pages/api/cron.ts` (`lint-only-at-base.tsv`), and 0 only at fix (`lint-only-at-fix.tsv`). The change adds no lint finding. The other 757 are present at base and outside this scope. |
| Convention check | `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website --since=0c14d5b…` | exit 0: 0 FAIL, 0 CANDIDATE, 23 SKIP (`convention-check.txt`). Unchecked, as SKIPs: the 3 deleted paths (missing files), `package.json` and `pnpm-lock.yaml` (extensions outside the set), untracked `.playwright-mcp/*.png` (not this chain's), and the ID-token/basename check (the checker does not implement the record's class verbatim). No source file with comments was added. |
| Workspace build verification | `agent-output/CLAUDE.md` names none for website (no pinned-build rule) | not applicable |

Both worktree exports were removed after the runs (`git worktree remove --force`, exit 0 each; `git worktree list` shows the main tree
only; `node_modules` in the main tree confirmed intact). The raw eslint JSON reports (19 MB each) and text logs (238 KB each) were moved to this session's
scratchpad and are not committed; captures are committed as `.txt` because the record ignores `*.log`. The digests above hold what the comparison used.

## User-visible flows

For the owner's own check after the release, in plain English:

1. **The old daily job's web address is gone.** Opening the site's `/api/cron` address, with or without anything after it, shows the
   site's normal "not found" answer instead of running the job.
2. **Vercel no longer runs a daily job for the site.** After the release, the project's scheduled-jobs list in Vercel should be empty.
   This box cannot see that list.
3. **Messages that were waiting to be sent on a schedule stay unsent.** Nothing on the site ever created such messages, but if any exist
   from long ago, they will never go out. As you chose, nobody checked for them first. Message pages look the same as before.

Nothing else on the site changes: editing, sending, sign-in and the message pages are untouched.

## Handoff

- **SHA:** website `132a7ab6f49d8a85ead507e2221ab3c3a531fd00` on `chain/fix-delete-dead-cron` (not pushed; no upstream).
- **Reviews:** `code-reviewer-fix-delete-dead-cron`, which steering starts on this document's spawn cue. The reviewer also runs the suite
  and typecheck (stage set). No QA Phase 2, because 0 production lines are added (under 20).
- **Merges:** devops, for website `master`, which Vercel deploys to production. The push needs the owner's release approval, asked by
  devops in its own session (brief common part, "End step").
- **For devops** (brief common part, hazard lines): confirm from the build log the pnpm major the deploy host used and that the
  deployment carries no cron. Vercel's own cron settings outside `vercel.json` stay unread here.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-21T20:40 | fixer | Document created. Fix committed at website `132a7ab` (anchor: that commit). Red check 6/6 FAIL at `0c14d5b`, green 6/6 PASS at `132a7ab`. Suite 2361→2358 (exit 0 both). Export typecheck exit 0. Lint adds no finding. Convention check 0 FAIL / 0 CANDIDATE. Handoff to code review. |
| 2026-11-21T20:54 | devops | Stage 1: Status Committed, document moved to closed/. Stage start: the code review APPROVED at `Reviewed-At` 132a7ab (no QA, no UAT in the chain's stage set). Committed state recorded: website branch `chain/fix-delete-dead-cron`, tip 132a7ab, not pushed (`verification/fix-delete-dead-cron/devops/tree-and-refs-stage1.txt`). |
| 2026-11-21T23:19 | devops | Phase 2D: Status Released. Website `master` moved `0c14d5b` to `132a7ab` at 2026-11-21T23:18:58Z; `git ls-remote origin master` read back `132a7ab` (`verification/fix-delete-dead-cron/devops/post-move-readback.txt`). |
| 2026-11-21T23:25 | devops | Reconcile note: `Released` here means pushed, and the push stands. The row above does not say the change is live, and it is not: Vercel's production deployment of that push errored, so production still serves the previous release. See `deployment/fix-delete-dead-cron-deployment.md` § Correction. |
