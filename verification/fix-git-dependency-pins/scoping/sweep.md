# Sweep: git-dependency pins, build-only deps, committed build output, release path

Chain: `fix-git-dependency-pins` (scoping). Sweep helper, read-only. Nothing committed, nothing installed, no tree changed. Places nothing in or out of scope.

## SHAs read (origin/master, from `git -C <repo> ls-remote origin master`)

| Repo | origin/master |
|---|---|
| website | `0c14d5bed78fd938f8290ed9ae57834e093bfdc1` |
| project-utils | `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f` |
| preview-image-generator | `8512a1d003af7fdbce56b85ef27218dd885becd1` (package.json, package-lock.json, src only; see Limits) |
| agent-output | `42089d322d7d43cdcdd9e00c145c0f71b9900ef6` |

Every file read was `git show <sha>:<path>` or `git grep ... <sha>` or `git ls-tree -r --name-only <sha>`. No working tree was read. The object for each SHA exists locally (`git -C <repo> cat-file -t <sha>` printed `commit` for all three checked).

## Process notes

- **Not completed (1).** A Bash call bundling a `git grep` over `preview-image-generator` for lockfile git sources, with the reads in (2).
- **Not completed (2).** The reads `git config --get remote.origin.url` for website and project-utils; `git grep` lockfile git-source lines for website, project-utils and agent-output; `ls -d` of the skill's `/usr/local/bin/statbot` and `/usr/local/bin/paracord` paths. Not re-issued; their results below are marked "not read".
- The preview-image-generator lockfile was read as one blob (`git show 8512a1d...:package-lock.json`, saved to scratch, counted with `grep -c`).
- No `.github/` file in preview-image-generator was read. No `.env*` file in any repo was read.
- A stray Bash command redirected output to `/usr/local/bin/hooks/agent-output/..`; bash refused ("Is a directory"), so nothing was written.
- Created the output directory `agent-output/verification/fix-git-dependency-pins/scoping/` with `mkdir -p` (it did not exist). The output file did not exist before this write, so no `sweep-origin.md` was needed.

## P1. Git-host dependencies named without a fixed commit

Repo-wide `git grep -n -E '(github:|git\+|git://|codeload|tar\.gz|bitbucket:|gitlab:)' <sha> -- '*package.json'` over the four repos returned 2 lines, both in website:

| # | Repo:path:line | Spec | Lockfile resolution (quoted) | Reachable on dependency remote? |
|---|---|---|---|---|
| 1 | `website:package.json:69` (dependencies) | `"project-utils": "github:hooks-gg/project-utils#master"` (a branch, moving) | `website:pnpm-lock.yaml:167-168`: `specifier: github:hooks-gg/project-utils#master` / `version: git+https://git@github.com:hooks-gg/project-utils.git#749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f`. Package entry `:5397-5398`: `resolution: {commit: 749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f, ...}` | **Yes, as master tip.** `git -C project-utils ls-remote origin master` printed `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f refs/heads/master`. Identity of `origin` with GitHub `hooks-gg/project-utils` is not confirmed by a URL read (not completed); the record names that repo at `agent-output:architecture/system-architecture.md:60`. |
| 2 | `website:package.json:126` (devDependencies) | `"paracord": "github:mr-tech/paracord"` (no commit, tag or branch) | `website:pnpm-lock.yaml:333-334`: `specifier: github:mr-tech/paracord` / `version: https://codeload.github.com/mr-tech/paracord/tar.gz/3f203086ae38699f26dbee90dadbb395a96be227`. Package entry `:5148-5149`: `paracord@https://codeload.github.com/mr-tech/paracord/tar.gz/3f20308...`, `version: 0.0.5`. | **Unread.** `mr-tech/paracord` is not one of the four workspace repos. The handoff's claim that a fresh resolve gives `1b7cadb` (0.0.9) is taken from `handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md` and was not re-derived. |

Lockfile git-source lines in website (`git -C website show 0c14d5b...:pnpm-lock.yaml` saved, then `grep -c -E 'codeload|git\+|github\.com'`): **8**. Two importer lines (`:168`, `:334`), two package lines (`:5148-5149`, `:5397-5398`), and two snapshot lines (`:12605`, `:12890`) account for them.

Other repos, package.json: 0 git-source lines each in project-utils, preview-image-generator and agent-output (the repo-wide `git grep` above).

Lockfiles, other repos:
- preview-image-generator `package-lock.json` (saved blob): `grep -c '"resolved": "'` = 912, of which `grep -c '"resolved": "https://registry.npmjs.org/'` = 912. `grep -c -E 'codeload|git\+|git://'` = 0. `grep -c '"resolved": "https://github.com'` = 0. Its `github.com` string matches (101) are non-resolution URL fields.
- project-utils `package-lock.json`: **not read** (not completed).
- agent-output lockfiles (if any): **not read** (not completed).

## P2. Build or codegen-only packages under runtime `dependencies` in a library

Library read: project-utils at `749606d`. Its runtime `dependencies` (`project-utils:package.json:12-15`): `kysely` ^0.26.1, `pg` ^8.11.1, `prisma-kysely` ^1.5.0 (line 14), `zod` ^3.20.6.

| Package | Site | Import sites | Class |
|---|---|---|---|
| `prisma-kysely` | `project-utils:package.json:14` | Only `project-utils:prisma/schema.prisma:5` (`provider = "prisma-kysely"`, the generator, output `../src/generated/db`). `git grep -n 'prisma' 749606d -- src` returns no import of it. | **Build/codegen only, listed under runtime `dependencies`.** |
| `kysely` | `:12` | `src/postgres.ts:1` (runtime); `src/generated/*/types.ts:1` (`import type`) | Runtime (kept) |
| `pg` | `:13` | `src/postgres.ts:2` (runtime) | Runtime |
| `zod` | `:15` | `src/env.js:1` (runtime) | Runtime |

Build-only packages correctly placed in the `devDependencies` block of project-utils' `package.json` (from line 17): `prisma` (25), `rimraf`, `typescript`, `eslint` and types. Observation, not a P2 site: `build:types` runs `api-extractor run`, and `@microsoft/api-extractor` is not declared in `devDependencies` (checked by reading the full `package.json` at `749606d`).

Consumers installing project-utils, within the workspace: **website only** (`website:package.json:69`; lockfile importer `website:pnpm-lock.yaml:166-168`). The lockfile snapshot `website:pnpm-lock.yaml:12890-12894` shows `prisma-kysely: 1.7.1` under project-utils' dependencies, so each website install pulls the codegen package as a runtime transitive. Consumers outside the workspace: not read.

Count: `git -C project-utils grep -n` over the `dependencies` block gives the sites above; 1 P2 site.

## P3. Tracked build output with no source it is built from

project-utils `git ls-tree -r --name-only 749606d` returned 27 files: `grep -c '^dist/'` = **13**, `grep -c '^src/'` = 5 (`src/env.js`, `src/generated/Database/types.ts`, `src/generated/db/types.ts`, `src/index.ts`, `src/postgres.ts`).

| Tracked dist file | Source at `749606d` | Imported by | Exposed by package.json |
|---|---|---|---|
| `dist/index.js` (+ `.map`) | `src/index.ts` | package root (`main`) | `main`: `dist/index.js` |
| `dist/postgres.js` (+ `.map`) | `src/postgres.ts` | `dist/index.js:4` (`require("./postgres")`) | via index |
| `dist/env.js` (+ `.map`) | `src/env.js` | `dist/postgres.js`, `dist/prisma.js` | via index |
| `dist/generated/db/types.js` (+ `.map`) | `src/generated/db/types.ts` | types only | `types`: `dist/index.d.ts` |
| `dist/generated/Database/types.js` (+ `.map`) | `src/generated/Database/types.ts` (source exists) | nothing | nothing |
| **`dist/prisma.js`** (+ `.map`) | **none: `src/prisma.ts` is not in the tree** | nothing (see below) | no export; reachable only by deep path |
| `dist/index.d.ts` | no tracked source; rolled up by api-extractor (`api-extractor.json` `dtsRollup.untrimmedFilePath: ./dist/index.d.ts`) from untracked `build/types` (`.gitignore` lists `build`) | `types` entry | `types`: `dist/index.d.ts` |

**P3 sites (no matching source):**
1. project-utils `dist/prisma.js` (and `dist/prisma.js.map`, whose `sources` is `["../../src/prisma.ts"]`). Check: `git -C project-utils grep -n prisma 749606d -- dist` returns only `dist/prisma.js:21` (its own sourceMappingURL) and the `.map` line. `dist/index.js` requires only `./postgres`. Website: the 54 `project-utils` hit lines (`git -C website grep -n -E 'project-utils|paracord' 0c14d5b`, saved) contain **0** deep `project-utils/...` imports (`grep -c -E "'project-utils/"` = 0). So nothing imports it in the library or in the consumer. Its `package.json` declares `main: dist/index.js`, `types: dist/index.d.ts`, **no `exports`, no `files`**, so `project-utils/dist/prisma` resolves for any consumer that wants it. The record calls it stale: `agent-output:research/codebase-bug-evaluation-2026-11-08.md:139` (F-36, "2023-07-26", "Harmless unless imported") and `agent-output:planning/closed/015-bug-evaluation-fixes.md:1157` (X-1). The record's mechanism (stale untracked `build/js/prisma.js` surviving `tsc -b` and being copied by `cp -r build/js dist`) is consistent with the build script text, but I did not run a build to confirm it.
2. `project-utils:dist/index.d.ts`: no tracked source. It is generated from untracked `build/types` by api-extractor. Not stale-by-name; listed for completeness (the record calls committed dist "never to be cleaned as stray output": `agent-output:architecture/system-architecture.md:238`).

Record cross-check: `agent-output:architecture/system-architecture.md:237` says project-utils tracks `dist/` in git "13 and 264 files respectively". My count of 13 for project-utils matches.

Also noted, not a P3 site: `project-utils:src/generated/Database/types.ts` has no generator output path in `prisma/schema.prisma` (`output = "../src/generated/db"`), so it is an orphan source. The record also notes it: `agent-output:planning/closed/012-message-valid-field.md:474`.

## P4. Release path for a project-utils change reaching website

Skill read: `/home/dev/.claude/skills/pinned-dep-shipping/SKILL.md`. It applies to "a source change in a git-dependency repo ... that consumers pin by commit SHA and that carries its build output in the tree" (its own examples: statbot-utils, paracord). project-utils matches that shape but is not named in it.

Release order the skill states ("The release walk, in order"):
1. **Build** in the dependency repo (`npm run build`/`rb`). Confirm `dist/` and `.d.ts` changed. "A commit whose dist/ is stale against src/ is a refusal."
2. **Commit source and build output together, by pathspec** (`git commit --only <src paths> dist ...`). Not `git add -A`, `-u` or `rbp`.
3. **Push the branch consumers resolve** (statbot-utils `prod`; paracord `master`). The skill's push rule: a push that deploys nothing needs no prompt. For project-utils the consumer resolves `master` (`website:package.json:69` `#master`).
4. **Re-pin each consumer:** `pnpm update <pkg>`, keep only the pin's lines, `pnpm install --frozen-lockfile` exit 0, then `git commit --only pnpm-lock.yaml`.
5. **Prove the pinned tree builds:** `verify-pinned-build.sh <consumer>` (skill: it checks only a statbot-utils pin and SKIPs a consumer without one, so it does not cover website's project-utils pin). Paracord and other pins are verified by hand: `git ls-remote <url> <branch>` and `readlink -f node_modules/<pkg>`.

Record's own release order for the project-utils change (`agent-output:planning/closed/012-message-valid-field.md:447`): DDL → project-utils push → website pin/lockfile refresh and deploy → backfill → review → live declaration → statbot gate. Binding precedence stated there: "project-utils push before the website pin refresh."

Skill paths `/usr/local/bin/statbot/statbot-utils/dist` and `/usr/local/bin/paracord/paracord/dist` were not confirmed to exist (not completed). The verify script and `pinned-build-sweep` were not read.

Website lock vs project-utils origin/master, at read time:
- Website lock pins project-utils to **`749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f`** (`pnpm-lock.yaml:168`, `:5398`).
- `git -C project-utils ls-remote origin master` = **`749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f`**.
- Equal at this read: no drift for project-utils at these SHAs. Any later project-utils push moves `#master` and the lockfile still says 749606d until a re-pin (`system-architecture.md:238`). Whether a non-frozen install would move it was not tested (no pnpm run).
- Record drift, artifact wins: `agent-output:architecture/system-architecture.md:166` says the lock is at `eb38a15` "which is project-utils master HEAD"; the current lock says `749606d`. The record is behind the lock, as the record's own 014 entry (`planning/closed/014-test-suite-cleanup.md:47`, "749606d0 is that repo's master at the remote") shows.

Paracord side of P4: website's paracord pin (3f20308) is a codeload tarball with no branch. Its remote was not read, so whether 3f20308 is on mr-tech/paracord's `master` is unread.

## Handoff read whole

`agent-output/handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md` (Status Open; Owning-Stage devops; Review-Trigger: next lockfile regeneration or next website release whose package.json or lock differs from d1bb9b0). It says: `paracord` at website `d1bb9b0` is `github:mr-tech/paracord`, lock `3f20308`; `project-utils` is `github:hooks-gg/project-utils#master`, lock `749606d`; a regeneration re-resolves paracord to `1b7cadb` and moves a second zod tree (3.25.76 to 4.6.7 under `zod-validation-error`). My read is at website `0c14d5b`, not `d1bb9b0`; the pins I read at `0c14d5b` are the same two SHAs the handoff names.

## Record greps

Command, for each term: `git -C agent-output grep -n -F -- <term> 42089d322d7d43cdcdd9e00c145c0f71b9900ef6 -- architecture research handoff planning` (the pathspec includes every `closed/` subdirectory). Output saved; counts by `grep -c ''` and `cut -d: -f2 | sort | uniq -c`.

| Term | Lines | Files | Hits (path:line) |
|---|---|---|---|
| `paracord` | 1 | 1 | `architecture/system-architecture.md:117` (`paracord` from `github:mr-tech/paracord`) |
| `prisma-kysely` | 2 | 1 | `architecture/system-architecture.md:121`, `:236` |
| `dist/prisma` | 2 | 2 | `research/codebase-bug-evaluation-2026-11-08.md:139` (F-36); `planning/closed/015-bug-evaluation-fixes.md:1157` (X-1) |
| `project-utils` | 62 | 16 | see below |

`project-utils` per file (count, `uniq -c`): `planning/closed/012-message-valid-field.md` 17; `architecture/system-architecture.md` 17; `research/codebase-bug-evaluation-2026-11-08.md` 6; `planning/closed/015-bug-evaluation-fixes.md` 4; `architecture/closed/015-bug-evaluation-fixes-architecture-findings.md` 3; `research/closed/components-v2-editing-flows-2026-08-23.md` 2; `planning/closed/014-test-suite-cleanup.md` 2; `planning/closed/013-components-v2-editing-surfaces.md` 2; `handoff/closed/architecture-record-reconciliation-owed-2026-11-10.md` 2; and 1 each in `research/competitive-feature-landscape-2026-11-08.md`, `planning/closed/016-send-check-validity.md`, `handoff/one-hooks-user-several-discord-accounts-2026-11-08.md`, `handoff/local-walk-save-can-write-a-client-sent-low-message-id-2026-11-11.md`, `handoff/closed/bug-evaluation-fixes-post-deploy-2026-11-08.md`, `architecture/closed/013-components-v2-editing-surfaces-architecture-findings.md`, `architecture/architecture-diagram.mmd`. Sum 62.

Pin-related `project-utils` lines (`grep -c -i pin` over the saved hits = **19**), key ones:
- `architecture/system-architecture.md:166`: `#master` declared; lock "currently `eb38a15`" (stale, see P4).
- `architecture/system-architecture.md:238`: "consumers pin `#master`, so a project-utils push changes consumers on next install"; committed artifacts "must never be 'cleaned up'".
- `architecture/system-architecture.md:273`: refresh the website pin "as a deliberate step".
- `planning/closed/012-message-valid-field.md:388`: pin-resolution precondition, lock `eb38a15`.
- `planning/closed/012-message-valid-field.md:445`, `:447`: release order (see P4).
- `planning/closed/014-test-suite-cleanup.md:47`: `749606d0` byte-identical in website `a74b9e2` and `f2c85f5`; master at remote.
- `planning/closed/015-bug-evaluation-fixes.md:234`: project-utils `749606d` at 2026-11-08.
- `planning/closed/015-bug-evaluation-fixes.md:1157`: X-1, `dist/prisma.js` removal needs a project-utils push and website lockfile pin move.
- `architecture/closed/015-bug-evaluation-fixes-architecture-findings.md:207`: the schema at `749606d`, "the commit the website lockfile pins", holds only `@@unique([provider, providerAccountId])`.

## Commands behind each count

- SHAs: `git -C <repo> ls-remote origin master`.
- Object existence: `git -C <repo> cat-file -t <sha>`.
- P1 manifests: `git -C <repo> grep -n -E '(github:|git\+|git://|codeload|tar\.gz|bitbucket:|gitlab:)' <sha> -- '*package.json'` (website 2 lines; others 0).
- P1 lock, website: saved `git show <sha>:pnpm-lock.yaml`; `grep -c -E 'codeload|git\+|github\.com'` = 8; `grep -n` for lines.
- P1 lock, preview-image-generator: saved `git show <sha>:package-lock.json`; `grep -c '"resolved": "'` = 912; `grep -c '"resolved": "https://registry.npmjs.org/'` = 912; `grep -c -E 'codeload|git\+|git://'` = 0; `grep -c '"resolved": "https://github.com'` = 0.
- Reachability: `git -C project-utils ls-remote origin master` = 749606d.
- P2 and P3: `git show <sha>:<path>` for `package.json`, `tsconfig.json`, `api-extractor.json`, `prisma/schema.prisma`, `src/*`, `dist/*`, `.githooks/pre-commit`, `.gitignore`; `git ls-tree -r --name-only <sha>` (saved; `grep -c '^dist/'` = 13, `grep -c '^src/'` = 5, total 27); `git -C project-utils grep -n` for `prisma|require\(|from ['"]` across src, prisma, configs and dist.
- Consumer imports: `git -C website grep -n -E 'project-utils|paracord' <sha>` saved (54 lines); `grep -c -E "from 'project-utils'|vi.mock\('project-utils'"` = 47; `grep -c -E "'project-utils/"` = 0; `grep -c 'paracord'` = 5.
- Record: as in the table.

## What no instrument here could see

- Paracord's remote (`mr-tech/paracord`) and whether `3f20308` or `1b7cadb` is on its branch: outside the workspace and not read.
- The `origin` URL of `/usr/local/bin/hooks/project-utils` (the `remote.origin.url` read was not completed). The identity with GitHub `hooks-gg/project-utils` rests on the record.
- What `pnpm install` (frozen or not) or `pnpm update` would resolve: no install, no lockfile regeneration, no run.
- Whether `dist/*` matches a fresh build of `src/*`: no build was run, so the stale-output claim for `dist/prisma.js` is established by absence of a source file and by the build script text, not by a diff.
- Local state: uncommitted files, local branches (the record says project-utils work sometimes sits on `chain/...` branches), and the local `.githooks` installation. Only `origin/master` was read.
- Consumers outside this workspace (the statbot family the skill names) and the live production install (Vercel or the QA exports). Their pins were not read.
- project-utils `package-lock.json` and any agent-output lockfile: not read (not completed).
- The skill's referenced scripts (`verify-pinned-build.sh`, `pinned-build-sweep`) and paths (`/usr/local/bin/statbot`, `/usr/local/bin/paracord`): not read or not confirmed.
- Preview-image-generator `.github/` and any secret or `.env*` file: deliberately not read.
- Git history of project-utils (when `dist/prisma.js` was last tracked with a source): not swept.
- Record outside `architecture`, `research`, `handoff`, `planning` (for example `implementation/`, `qa/`, `deployment/`): not grepped.
- Whether the record's own claims are current: the record is read as text, not checked against artifacts beyond the SHAs above.
