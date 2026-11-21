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

Determination, stage set and branch cut: written once chain 6 releases and the website tree is back on `master`.
