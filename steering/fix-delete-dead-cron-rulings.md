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

## 2026-11-21T20:48 — review approved at `132a7ab`; devops started

Spawn cue 20:4xZ (the reviewer, by SendMessage): `code-review/fix-delete-dead-cron-code-review.md` (record `0c6cd42c`), `Reviewed-At`
`132a7ab`, round 1 APPROVED, no findings (read by this thread: the anchor line and the commit subject). Assumption Not Checked, routed to
devops: production carries no cron (no `vercel.json`, no dashboard cron). `git ls-remote origin master`: `0c14d5b`.
`devops-fix-delete-dead-cron` started with `tmux-agent spawn` (cwd website), brief `steering/fix-delete-dead-cron-brief-devops.md`.

## 2026-11-21T23:23 — pushed on his word; Vercel's production build of it errored; production still serves the previous release

Devops by message 23:2xZ: his selection "Agent: release it now (Recommended)" (in its session); website `origin/master` `0c14d5b` →
`132a7ab`, pushed 23:18:58Z; record `deployment/closed/fix-delete-dead-cron-deployment.md` (Released). This thread's read 23:2xZ
(Vercel CLI, look-only, his selection effort block 19:02): `vercel ls --prod` — newest production deployment
`hooks-gg-website-dbbvp2cya-…` "● Error 17s"; `vercel inspect` of it: `dpl_E9QKLBn9M8VxTosRLrSJxrQDYSxy`, status Error, created
23:19:00Z, aliases only the project and git-master ones; `vercel inspect https://hooks.gg` → `dpl_AsiVPq5vBJY7dqJim5PcmFVWCrn9`
(18:35:46Z, the `0c14d5b` build). `vercel logs` of the errored one: no log lines. So the release is on `master` but not live; users see
the previous release; the record's "Released" does not hold. Devops told at once (by message, 23:2xZ); the diagnosis is its. Owner-wait
`release-ask` resolved. Chain 7's website half held off `master` until devops reports.

## 2026-11-21T23:55 — cause: five production settings missing; his dashboard step queued

Devops by message 23:5xZ (record reopened, Status Active, `893b6f2`, `e6e04e1`): the errored build failed at prerender of "/" with
"Invalid environment variables" naming `DATABASE_URL`, `REDISHOST`, `REDISPORT`, `REDISUSER`, `REDISPASSWORD` (`src/env.mjs:115`); a
control build of base `0c14d5b` with no settings fails identically, so not the change; on his selection in devops's session ("Agent: list
setting names with the Vercel tool", which extends block 19:02's bound by that one command) `vercel env ls` shows no row for those five
in any environment. Every push to website `master` fails to deploy until they are supplied; a revert would fail the same. Devops
withdrew its earlier retrospective cue (not acted on here). His step queued in `OWNER-QUEUE.md` (restore the five for Production,
Redeploy the 23:19 deployment, check Cron Jobs empty); devops reads the result. Devops's rule finding lodged in `~/.claude/agents/INBOX.md`
(FYI). Chain 7's website half stays off `master` until a production build passes.

## 2026-11-22T16:44 — his report: the five settings came from Railway; cause and restore path unknown to him

His words, in this session, on the Vercel settings step: "Those were previously supplied directly from railway, but I can't find why
they were removed nor how to get them back". Kinds: a mechanism claim (the five came from Railway directly, likely Railway's Vercel
integration — not read by this thread) and an observation (he cannot find the cause or a restore path). Reads this turn: Railway CLI
`/usr/local/bin/railway` 2.1.0, `railway whoami` answers "Response not successful status=404" (not usable as installed); Vercel CLI
29.1.1 has no `integration` command; the record's only Railway mentions are the old local-database notes (015, 014). So no agent tool
on this box can read the integration's state. Put to him in chat: the likely cause as a candidate, the manual copy path, and the
public-address hazard (Railway's private addresses do not reach Vercel). Chains 6 and 7 stay held on his step.

## 2026-11-22T16:46 — his correction: there is no Railway integration; this thread's candidate withdrawn

His words, in this session: "there is no railway integration". This thread's 16:44 candidate (Railway's Vercel integration added the
five and its removal deleted them) is withdrawn, the error this thread's: it rested on general knowledge, not a read. What stands
(devops record `deployment/fix-delete-dead-cron-deployment.md`, lines 36-48, read this turn): the 18:35Z build of the same code had the
five; at 23:53Z `vercel env ls` listed 27 project settings and none of the five; devops's two readings are (1) project settings removed
after 18:35Z, (2) a link that the project list does not show (e.g. team-level shared settings) broke. Put to him: Vercel's activity log
and the team's shared settings as the places that can show which, and the manual copy from Railway (public addresses) as the restore.

## 2026-11-22T16:48 — his clarification: there was an integration, and it is gone from the marketplace

His words, in this session: "no, I 100% had some kind of integration before. what I mean is that I can't find it anymore. it doesn't
exist on the marketplace". Correction to block 16:46: this thread misread his "there is no railway integration" as "never was"; he
meant it no longer exists. The integration reading of block 16:44 is reinstated as a candidate (still not read at the mechanism).
Reads this turn (web): no notice of the Railway-Vercel integration's removal found; `vercel.com/marketplace/railway` and
`vercel.com/integrations/railway` answer 200 but render client-side (inconclusive); Railway's changelog index 2023-08-18..2026-11-20 names
no removal (titles only). Whether Vercel deletes an integration's settings when the integration goes: not found in Vercel's docs.
Restore path put to him: copy the five from Railway by hand (public addresses), then Redeploy.
Disclosed: this heading was first typed with an estimated minute; the stamp gate refused it; restamped with the tool's `2026-11-22T16:48`.

## 2026-11-22T16:59 — he redeployed; hooks.gg serves a new Ready build; both devops sessions told

His words, in this session: "redeployed". This thread's read (`vercel inspect https://hooks.gg`, website dir, stdin closed, 16:59Z):
`dpl_CnknfaUPDjpEMaaw1781YXMq34rW` (`hooks-gg-website-1nodvml13-hooks-gg.vercel.app`), Ready, created 16:55:59Z; `vercel ls --prod`
hung both tries (`timeout 60`), not read. Not read by this thread: the commit it was built from, how he supplied the five settings.
Sent by message: `devops-fix-delete-dead-cron` (its post-deploy read now due: build, live site, Cron Jobs handoff trigger) and
`devops-fix-git-dependency-pins` (its release-2 gate is its own read; it asks him for the release if met). Owner-wait
`fix-delete-dead-cron` resolved (`challenge-alert.js resolved`).
