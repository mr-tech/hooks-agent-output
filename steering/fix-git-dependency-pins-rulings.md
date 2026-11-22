# Rulings — fixer chain `fix-git-dependency-pins` (website pins its GitHub dependencies; project-utils tidy-ups)

Fixer chain steered by `steering-hooks` (cwd `/usr/local/bin/hooks`; coordinator `steering-coordinator`), chain 7 of effort
`fixer-queue-2026-11-21`. Commission and order: `steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-21T05:32Z", "05:38Z"
(item 4: H37 + H41 + F-36; "The H37 handoff asks for his routing; his commission is read as that routing, vetoable from this record"),
"05:50Z" (order: 7). tmux category: `fix-git-dependency-pins`. Source: `handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md`
(H37, its item 4 = H41) and `research/codebase-bug-evaluation-2026-11-08.md` F-36.

## 2026-11-21T22:28 — selection: chain 7's scope (pin by hand; both library tidy-ups in)

Selection prompt put 22:2xZ, answered 22:2xZ (ledger `steering/selection-ledger/2026-11-21.md`, this thread's block of that minute);
wording this thread's, in his 18:37Z form. Premises read before the prompt: the sweep `verification/fix-git-dependency-pins/scoping/sweep.md`
(`44830ec`; at website `0c14d5b`, project-utils `749606d`; two reads not completed, marked "not read" there): website `package.json:69`
`github:hooks-gg/project-utils#master` (lock `749606d` = project-utils `origin/master`, `git ls-remote` 22:28Z) and `:126`
`github:mr-tech/paracord` (lock `3f203086…`); project-utils `package.json:14` `prisma-kysely` in `dependencies`, used only by
`prisma/schema.prisma:5`; `dist/prisma.js(.map)` with no `src/prisma.ts`. The refutation helper (scratch `refute-pins/`): claims 3-5 HOLD
(read from code: no runtime import of `prisma-kysely`; nothing imports `dist/prisma.js`; the build's `rimraf dist` drops it); claims 1-2
PARTLY (run, export): a hand-edited lockfile specifier installs `--frozen-lockfile` exit 0 with a specifier-only diff and the same 1408
package entries; `pnpm install --lockfile-only` after the pin rewrites ~91 (project-utils) / ~40 (paracord) unrelated lockfile lines;
paracord's `3f20308` tarball answers HTTP 200. Project-utils pushes: no `.github/` at `749606d` (`git ls-tree`), `release-move.js --report`:
"one serving ref at origin (master); no pair".
- Q pin method: A "Agent: pin by hand (Recommended)" — "Only the two library entries change; every other package the site installs stays
  exactly as it is today."; B "Agent: pin, let others update". Chosen: **A**.
- Q library: A "Agent: include both (Recommended)" — "Library fixed and published first, then the website pinned to that new version: two
  pushes, only the website one needs your release answer."; B "Agent: pins only". Chosen: **A**.
**Note for the determination (this thread's):** with A on both, the website's project-utils pin is the new library commit, not `749606d`;
moving `prisma-kysely` to `devDependencies` changes the website lockfile's project-utils subtree too, so "only the two entries change" in
option text meant no unrelated package moves — the determination bounds the lockfile diff to the two pinned packages' own subtrees.

## 2026-11-21T22:58 — scoping determination: fixer chain, project-utils then website; the project-utils half opens now

**His words.** Block 22:28 above (pin by hand; both tidy-ups); effort block 05:38Z item 4 and 05:50Z order. Brief common part:
`steering/fix-git-dependency-pins-brief-common.md`. **Order amended (this thread's ruling):** effort block 05:38Z opened each chain after
the previous one's release because of the shared trees; chain 7's project-utils half shares no tree with chain 6 (on website), so it
opens now, and its website half starts only once chain 6 has released and this thread has switched the website tree.

**Shape.** Hygiene/supply-chain. No dated event. Cause read from code and, for the pin form, run (block 22:28). Blast radius: project-utils
`package.json` (+ its `package-lock.json`), `dist/prisma.js`, `dist/prisma.js.map`; website `package.json` lines 69 and 126 and the
`pnpm-lock.yaml` entries of those two packages. End steps: project-utils `master` (no `.github/`; `release-move.js … 749606d --dry-run`
22:58Z: "DRY RUN: every check passed"; "workflows none"; deploys nothing, no approval) — pushed by devops mid-chain, before the website pin;
then website `master` (Vercel production, his word, asked by devops in its own session; dry run at `0c14d5b` passed 20:26Z).
Trees: project-utils `master` `749606d` = `origin/master` (`git ls-remote`, 22:58Z), porcelain empty. Website: on chain 6's branch until
chain 6 releases.

**Sweep** (block 22:28 premises; `verification/fix-git-dependency-pins/scoping/sweep.md`). P1 hits: website `package.json:69`, `:126` —
IN. P2: project-utils `package.json:14` `prisma-kysely` — IN (to `devDependencies`). P3: `dist/prisma.js`, `.map` — IN (deleted).
Record: `architecture/system-architecture.md:121,166,236-237` (the pin and the dist listing) — OUT of the chain, lodged for the architect at
closure. `paracord`'s other ref `1b7cadb` (handoff) — OUT (the pin is to the lockfile's `3f20308`, his "the exact version the live site
already uses").

**Stage set:** `fixer-fix-git-dependency-pins` → `code-reviewer-fix-git-dependency-pins` (production lines added under 20: the reviewer
also runs the suites, typecheck and the fixer's red evidence) → devops: project-utils `master` push (mid-chain, no approval) → fixer: the
website pin → reviewer → devops for website `master` (his word). No plan, critic, Phase 1, QA or UAT.

**Scope statement (bounded).**
Project-utils half, on `chain/fix-git-dependency-pins` cut from `origin/master` `749606d`:
1. `prisma-kysely` moves from `dependencies` to `devDependencies` in `package.json`; `package-lock.json` changes only in that package's
   `dev` flags/placement.
2. `dist/prisma.js` and `dist/prisma.js.map` are deleted; a `npm run rebuild` (or `build` + `build:types`) leaves `dist/` byte-identical
   to the committed tree apart from those two deletions — any other `dist/` difference is a stop-and-ask, not a fix.
Website half, on `chain/fix-git-dependency-pins` cut from `origin/master` after chain 6's release:
3. `package.json:69` `project-utils` names the new project-utils commit (the one devops pushed); `:126` `paracord` names `3f203086…`
   (the lockfile's commit). Both by full SHA.
4. `pnpm-lock.yaml` is edited by hand to match (his selection A): the two specifier lines, project-utils' resolved commit and its own
   dependency list (`prisma-kysely` leaves its runtime set, with whatever subtree only it held); no other package version moves.
   `pnpm install --frozen-lockfile` exits 0; suite and `pnpm run typecheck` exit 0.
Write set: those paths; in the record, the fixer's document and `verification/fix-git-dependency-pins/`. Any other file is a re-scope.

**What the sweep did not cover** (devops hazard lines): `mr-tech/paracord`'s remote beyond the tarball's HTTP 200; whether a fresh
`dist/` build matches the committed one (to be shown in item 2); consumers of project-utils outside this workspace (statbot repos may
pin it — unread); project-utils' and agent-output lockfiles (not read).

## 2026-11-21T22:58 — chain started (project-utils half)

Project-utils `chain/fix-git-dependency-pins` cut by this thread (`git switch --no-track -c … origin/master` after `git ls-remote` read
`749606d`; HEAD `749606d`, no upstream; porcelain empty before and after, `diff` of the two captures). Briefs:
`steering/fix-git-dependency-pins-brief-common.md`, `…-brief-fixer.md`. `fixer-fix-git-dependency-pins` started with `tmux-agent spawn`
(category `fix-git-dependency-pins`, cwd `/usr/local/bin/hooks`, a cross-repo chain). The website half waits on chain 6's release.

## 2026-11-21T23:07 — project-utils half handed off at `40ba5d3`; review; a cache file brought into scope

Spawn cue 23:0xZ (the fixer, by SendMessage): `implementation/fix-git-dependency-pins-implementation.md` (record `44bb065`), `Handoff-At`
`40ba5d3 — repos=project-utils; website half not started` (read by this thread). `git -C project-utils diff --numstat 749606d 40ba5d3`:
`dist/prisma.js` 0/21, `dist/prisma.js.map` 0/1, `package-lock.json` 760/194 (the fixer: `prisma-kysely`'s 283-entry subtree gains
`dev: true`, nothing added, removed or re-versioned — the reviewer re-derives), `package.json` 1/1. All in the write set.
**This thread's ruling (inside the swept region, P3's mechanism):** the fixer found gitignored `build/js/prisma.js(.map)` in the shared
project-utils tree (from 2023) that every rebuild copies back into `dist/` as untracked files. Deleting those two ignored files is in
scope: they are what makes the deleted output reappear; no session owns them (no live chain on project-utils but this one; `git status
--ignored` shows only `build/`). Untracked-only: no commit changes. `code-reviewer-fix-git-dependency-pins` started with `tmux-agent
spawn`, brief `steering/fix-git-dependency-pins-brief-code-reviewer.md`.

## 2026-11-21T23:11 — round 1 approved at `40ba5d3`; devops started for the project-utils push

Spawn cue 23:1xZ (the reviewer, by SendMessage): `code-review/fix-git-dependency-pins-code-review.md` (record `fd88ffc`), `Reviewed-At`
`40ba5d3a5b54… — repos=project-utils; round 1 covers the project-utils half only`, APPROVED, no findings (read by this thread: anchor line,
commit subject). Assumption Not Checked: consumers outside the workspace loading `prisma-kysely` via project-utils' runtime install. This
thread's read: no `package.json` under `/usr/local/bin/statbot` or `/usr/local/bin/paracord` names `project-utils`
(`grep -l --include=package.json -r`, `node_modules` excluded); elsewhere unread. `devops-fix-git-dependency-pins` started with
`tmux-agent spawn` (cwd `/usr/local/bin/hooks`), brief `steering/fix-git-dependency-pins-brief-devops.md` (release 1: project-utils
`master`, deploys nothing).

## 2026-11-21T23:16 — release 1 pushed: project-utils `master` at `40ba5d3`; the website half waits on chain 6

Devops by message 23:1xZ: project-utils `master` `749606d` → `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165` (fast-forward), pushed; record
`deployment/fix-git-dependency-pins-deployment.md` (`935e635`), open for release 2. This thread's read: `git ls-remote origin master` →
`40ba5d3…` (23:16Z). Devops's items: (1) a further consumer, `/usr/local/bin/hooks-deprecated/cdn/package.json`, names
`github:hooks-gg/project-utils#master`; whether it loads `prisma-kysely` is unread (devops's read not completed; this thread does not
re-read it) — it changes only if that tree re-pins; put to him in chat. Also `/home/dev/review/website`, a review copy. (2) Repository
webhooks unread. (3) The website pin names `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165`. Website `origin/master` still `0c14d5b`; chain 6's
release ask still open (23:16Z), so the website switch waits.

## 2026-11-21T23:58 — website half opened on a branch; its release waits on a passing production build

Chain 6's push landed on website `master` (`132a7ab`, `git ls-remote` 23:58Z) but Vercel's production build fails for missing production
settings, unrelated to either chain (chain 6 rulings block 23:55). The website half's work is on a branch and touches `master` only at
release, so it starts now; its release (devops, his word) waits until a production build passes. Website `chain/fix-git-dependency-pins`
cut by this thread from `origin/master` `132a7ab` (`git switch --no-track -c`; no upstream; porcelain `?? .playwright-mcp/` before and
after, `diff` of the captures). The fixer is messaged: pin project-utils `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165` (devops, block
23:16) and paracord `3f203086ae38699f26dbee90dadbb395a96be227` (the lockfile's, block 22:28).

## 2026-11-22T00:07 — website half handed off at `3859c29`; review round 2

Spawn cue 00:0xZ (the fixer, by SendMessage): `implementation/fix-git-dependency-pins-implementation.md` (record `80a5778`), `Handoff-At`
`40ba5d3,3859c29 — repos=project-utils,website` (read by this thread). `git diff --numstat 132a7ab 3859c29`: `package.json` 2/2,
`pnpm-lock.yaml` 6/1190; in the write set. Production lines across both halves: 3 (the fixer's count). One fixer read (where website
uses paracord) not completed, not re-issued; its flow list says so. Round 2 brief: `steering/fix-git-dependency-pins-brief-code-reviewer-round2.md`,
sent to the live `code-reviewer-fix-git-dependency-pins`.

## 2026-11-22T00:2x — round 2 approved; devops briefed for release 2, its ask gated on a passing production build

Spawn cue 00:2xZ (the reviewer, by SendMessage): round 2 APPROVED, record `41193a1`, `Reviewed-At 40ba5d3a5b54…,3859c29d557c… —
repos=project-utils,website`, no findings. Assumption Not Checked: the deploy host's pnpm and private fetch of project-utils, routed to
devops. Release 2 brief `steering/fix-git-dependency-pins-brief-devops-release2.md` sent to the live `devops-fix-git-dependency-pins`:
Stage 1 now; no release ask until a Ready production deployment of website `132a7ab` serves `hooks.gg`.
