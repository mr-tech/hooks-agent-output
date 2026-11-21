# Rulings — fixer chain `fix-delete-dead-cron` (website: the daily cron endpoint on a fixed key, sending from a table nothing fills, is deleted)

Fixer chain steered by `steering-hooks` (cwd `/usr/local/bin/hooks`; coordinator `steering-coordinator`), chain 6 of effort
`fixer-queue-2026-11-21`. Commission and order: `steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-21T05:32Z", "05:42Z",
"05:50Z" (his Q4 answer "Agent: delete the cron (Recommended)"). tmux category: `fix-delete-dead-cron`. Source:
`handoff/cron-endpoint-key-is-a-fixed-value-2026-11-19.md` (4bc9b626).

## 2026-11-21T20:26 — selection: chain 6's scope (package removed too; no check of waiting rows first)

Selection prompt put 19:4xZ, answered 20:2xZ (ledger `steering/selection-ledger/2026-11-21.md`, this thread's block of that minute);
wording this thread's, in his 18:37Z form. Premises read before the prompt: the sweep `verification/fix-delete-dead-cron/scoping/sweep-origin-0c14d5b.md`
(helper, at website `0c14d5b`, project-utils `749606d`, preview-image-generator `8512a1d`; one of its calls not completed, not
re-issued — its preview-image-generator zero is unconfirmed by a pathspec count); the refutation helper (scratch `refute-cron/`, 5 claims
HOLD): no code in the three repos inserts `ScheduledMessages` rows, only `cron.ts:56,67` update rows it selected (read from code);
`guild.ts:54-62` and `shared.ts:167` left joins do not depend on the endpoint (read from code; `sent`/`sendAt` stop advancing on any
existing row); deleting `cron.ts` and the `crons` key fails exactly `cron.scheduled-selection.test.ts` in the suite and typecheck (run,
export, 3 of 2361 cases; typecheck with that test also removed not run); `cron-parser`'s only importer is `cron.ts` (`git grep`, run);
nothing else calls `/api/cron` or relies on key `vercel` (read from code). Production rows unread (no instrument).
- Q package: A "Agent: remove it too (Recommended)" — "The package comes out with the job, so nothing unused is left installed. One more
  small change to the same release."; B "Agent: leave it installed". Chosen: **A**.
- Q waiting messages: A "Agent: go ahead without checking (Recommended)" — "The chain starts now. If old waiting messages exist, they
  simply never send (as today's job may already not be sending them)."; B "You: check the table first". Chosen: **A**.

## 2026-11-21T20:26 — scoping determination: fixer chain, website, one handoff

**His words.** Effort block 05:50Z, Q4: "Agent: delete the cron (Recommended)" — a fixer chain deletes the cron endpoint and its
`vercel.json` entry; and block 20:26 above (package removed; no pre-check of rows). Brief common part:
`steering/fix-delete-dead-cron-brief-common.md`.

**Shape.** Hygiene/hardening (a public endpoint on a fixed key, H09), not user-visible: nothing in any repository creates the rows it
sends. No dated outside event. Cause read from code (sweep; refutation run for the build/suite limb). Blast radius: `src/pages/api/cron.ts`,
`vercel.json`'s `crons` key, `cron.scheduled-selection.test.ts`, `package.json`/`pnpm-lock.yaml` (`cron-parser`). No library holds the
fix. End step: website `master`, Vercel production (no `.github/workflows`); his word, asked by devops in its own session.
**Release ref.** `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 0c14d5bed78f… --dry-run` (20:26Z): "DRY RUN:
every check passed; nothing moved"; "workflows none — …/.github/workflows absent"; `--report`: "one serving ref at origin (master); no
pair". Tree: `master` at `0c14d5b` = `origin/master` (`git ls-remote`, 20:26Z); porcelain `?? .playwright-mcp/` only. No deployment record
open (`ls deployment/*.md`: no match).
**Released chains whose scope touched this route:** none found in the sweep's record hits (16 files; `planning/closed/015-bug-evaluation-fixes.md`
L332-333 names it as left out). Open handoffs naming it: the source only.

**Property and sweep.** Property: a scheduled public endpoint guarded by a fixed key runs daily and acts on a table no code fills.
Region: website, project-utils, preview-image-generator (`src`, `package.json`, top-level docs; `.github/` excluded by the secret gate) at
the refs above, plus the record's `architecture`, `research`, `planning`, `handoff` (and `closed/`). Hits placed:
- `src/pages/api/cron.ts` — IN (deleted). `vercel.json` `crons` entry — IN (removed; the file stays only if other keys remain — at
  `0c14d5b` it has none, so the fixer decides between `{}` and deleting the file, recording why).
- `src/server/api/__tests__/cron.scheduled-selection.test.ts` (3 cases) — IN (deleted: Test Conventions, "Superseded implementation";
  no covering test is owed for a removed surface). Its `makeRes` import of `src/server/api/__tests__/helpers/apiResponse.ts` — the helper
  stays (other importers).
- `cron-parser` in `package.json` and the lockfile — IN (his selection A).
- `ScheduledMessages` table, its Prisma schema (`project-utils/prisma/schema.prisma:136-152`) and generated types, the left joins in
  `guild.ts`/`shared.ts` — OUT (the table stays; his Q4 words name the endpoint and its entry only).
- Record: `architecture/system-architecture.md:172` — OUT of the chain, lodged for the architect at closure; the source handoff closes
  Addressed at release; research/planning mentions are history.

**Stage set:** `fixer-fix-delete-dead-cron` → `code-reviewer-fix-delete-dead-cron` (the change adds no production lines, under 20: the
reviewer also runs the suite and typecheck) → devops for website `master` (his word). No plan, critic, Phase 1, QA or UAT. The
fixer's **User-visible flows** list is quoted to him with the release, in his 18:37Z form.

**Scope statement (bounded).** Repository `website` only, from `origin/master` `0c14d5b`, on `chain/fix-delete-dead-cron`:
1. `src/pages/api/cron.ts` is deleted; a request to `/api/cron` then answers the site's ordinary not-found.
2. The `crons` entry leaves `vercel.json`, so Vercel schedules nothing.
3. `cron.scheduled-selection.test.ts` is deleted; suite and `pnpm run typecheck` exit 0.
4. `cron-parser` leaves `package.json` and `pnpm-lock.yaml` (`pnpm remove`), nothing else in the lockfile changing beyond its own subtree.
Red evidence: this chain removes behaviour; its "red" is a check that fails before and passes after (e.g. `vercel.json` has a cron and
the route module exists), recorded in the fixer's document — this thread's guidance; the fixer's red-test duty is its own.
Write set: those four paths (and the lockfile) in website; in the record, the fixer's document and `verification/fix-delete-dead-cron/`.
Any other file is a re-scope.

**What the sweep did not cover** (devops hazard lines): production `ScheduledMessages` rows (any unsent row never sends — his selection
accepted); Vercel's dashboard cron settings (whether a cron also exists there, outside `vercel.json`); writers outside the four repos;
the preview-image-generator zero (one sweep call not completed).

## 2026-11-21T20:27 — chain started

Website `chain/fix-delete-dead-cron` cut by this thread (`git switch --no-track -c … origin/master` after `git ls-remote` read `0c14d5b`;
HEAD `0c14d5b`, no upstream; porcelain before and after identical, `?? .playwright-mcp/` only, `diff` of the two captures). Lockfile: cut
at the tree's own commit, nothing differs across the switch. Briefs: `steering/fix-delete-dead-cron-brief-common.md`, `…-brief-fixer.md`.
`fixer-fix-delete-dead-cron` started with `tmux-agent spawn` (category `fix-delete-dead-cron`, cwd website). The reviewer starts on the
fixer's spawn cue.

## 2026-11-21T20:41 — spawn cue: fixer handed off at `132a7ab`; review

Spawn cue 20:4xZ (the fixer, by SendMessage): `implementation/fix-delete-dead-cron-implementation.md` (record `7c99ece6`), `Handoff-At`
`132a7ab` (read by this thread: the anchor and Status lines). `git diff --numstat 0c14d5b 132a7ab`: `package.json` 0/1, `pnpm-lock.yaml`
0/17, `src/pages/api/cron.ts` 0/81, `cron.scheduled-selection.test.ts` 0/55, `vercel.json` 0/8 (deleted whole) — 0 production lines added,
all in the write set. `code-reviewer-fix-delete-dead-cron` started with `tmux-agent spawn`, brief `steering/fix-delete-dead-cron-brief-code-reviewer.md`.
