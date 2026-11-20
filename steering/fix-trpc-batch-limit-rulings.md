# Rulings — fixer chain `fix-trpc-batch-limit` (website: tRPC batch limit, `x-pathname` trust, dead `overrides` key)

Fixer chain steered by `steering-roadmap-hooks` (cwd `/usr/local/bin/hooks`; coordinator `steering-coordinator`). His word opening
it: `steering/website-deps-review-rulings.md`, block "2026-11-20T23:44Z — his answers on the dependency-review leftovers". Brief
common part: `steering/fix-trpc-batch-limit-brief-common.md`. tmux category: `fix-trpc-batch-limit`.

## 2026-11-20T23:57Z — scoping determination: fixer chain, website, items 1 to 3 of the leftovers handoff

**Source.** `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md` (read whole 23:4xZ). Its limbs, marked:
item 1 (batch limit) IN; item 2 (`x-pathname` trusted for a redirect; the dead `x-query-params` write) IN; item 3 (`package.json`
`overrides` pnpm ignores) IN; item 4 (project-utils `prisma-kysely` declaration) OUT, own trigger; item 5 (no guard forcing a new list
input onto the cap) OUT, own trigger; item 6 (scheduled audit) OUT of this chain, a separate piece of work under the same answer;
item 7 (hosting assumption) OUT, own trigger.

**Shape.** Defect (hardening of LOW and informational security findings). No dated outside event. Cause proven: item 1 measured by
security on a local production build of `d1bb9b0` (`verification/018/security/out/requests-d1bb9b0.txt` §4); items 2 and 3 read at
`origin/master` by the sweep. Blast radius: website's tRPC entry point, its middleware and the one header-reading server component,
and `package.json`. Specification uncertainty: low. Library holding the fix: `@trpc/server` 11.10.0's `allowBatching` option (the
sweep, P1: the dist defaults it to true and has no count check). End step: website `master`, which Vercel deploys to production;
his word needed (CLAUDE.md, Git), asked by devops in its own session.
**Release ref.** `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master d1bb9b07… --dry-run` (23:5xZ): "DRY RUN:
every check passed; nothing moved"; workflows "none — …/.github/workflows absent"; `--report`: "one serving ref at origin (master);
no pair". Tree: `master` `d1bb9b0` = `origin/master` after `git fetch`; one untracked path (`.playwright-mcp/`), nothing tracked
modified (`git status --porcelain` to a file, 1 line).
**Released chains whose scope touched these routes:** 018 (`d1bb9b0`; capped save input; its open carrier
`handoff/website-018-standing-risks-save-toast-and-lint-stack-2026-11-20.md`), 017, and the `fix-message-page-header-decode`
fixer (all closed). The 017 post-deploy carrier (`handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`) waits only on B-10's
2026-12-19 read, outside these routes.

**Scope sweep** (helper, `verification/fix-trpc-batch-limit/scoping/sweep.md`; instruments, regions and limits there), read at each
repo's `origin/master` (website `d1bb9b0`, project-utils `749606d`, preview-image-generator `8512a1d` = its `origin/prod`):
- P1 "one request can carry an unbounded number of procedure calls": one batch-capable server entry point,
  `website:src/pages/api/trpc/[trpc].ts:8` (`createNextApiHandler`, no `allowBatching`). The site's own client uses `httpLink`, never a
  batch link, at `src/utils/api.ts:31`, `:46` and `src/providers/TrpcProvider.tsx:19`. No tRPC or batch endpoint in the other repos.
- P2 "a server decision trusts a request header assumed to be set by middleware": `x-pathname`, read at
  `src/app/_navigation/Redirects/Server.tsx:5`, set by `src/middleware.ts:14` on matcher `['/message/(.*)', '/api/guilds/(.*)',
  '/preview']`; the component is mounted under `src/app/message/layout.tsx`. `x-query-params` is written at `middleware.ts:20` and read
  by no server code; its only reads are in `src/app/_components/__tests__/Providers.request-headers.test.ts:36,45`.
- P3 "a dependency pin declared where the package manager does not read it": website (pnpm 10.28.2) `package.json:138` top-level
  `overrides` (`semver ^7.5.3`); `pnpm-lock.yaml` has no `overrides:` section. preview-image-generator (npm) declares the same key and
  npm honours it (a single `semver` 7.5.4 in its lock). project-utils has none.

**Stage set:** `fixer-fix-trpc-batch-limit` → `code-reviewer-fix-trpc-batch-limit` (and QA Phase 2, `qa-fix-trpc-batch-limit`, only if
the fix adds 20 or more production lines; under 20 the reviewer also runs the suite and the red test) → devops for website `master`
(his word). No plan, critic, Phase 1 or UAT. Security not in the set: the change ships nothing root executes; the findings are
security's own, and its owed fixes are quoted in the handoff. Retrospective: joins the next fixer batch.

**Scope statement (bounded).** Repository `website` only, from `origin/master` `d1bb9b0`, on `chain/fix-trpc-batch-limit`:
1. A tRPC request that names more than one procedure call is refused before any call runs, at the single entry point
   `src/pages/api/trpc/[trpc].ts` (`allowBatching: false`, or a count of the comma-separated paths where the fixer shows the site's
   client needs batches). The site's own three links keep working.
2. The redirect decision in `src/app/_navigation/Redirects/Server.tsx` no longer rests on a client-settable `x-pathname`: the path comes
   from a source the client cannot set, or the middleware sets the header on every path where that component reads it (the bare
   `/message` path read by the fixer). The dead `x-query-params` write in `src/middleware.ts` is removed, with the test reads of it.
3. `package.json`'s top-level `overrides` key is deleted (it does nothing under pnpm). Writing a real pin under `pnpm.overrides` is OUT:
   it changes the lockfile's resolution, and the audit at `d1bb9b0` holds no entry (handoff item 7, its `pnpm-audit-prod-d1bb9b0`
   summary); the fixer re-reads `pnpm audit --prod` at its tip and stops to steering if `semver` appears.
**Exclusions (every sweep hit placed):** headers that clients are meant to send and that are checked, not trusted as middleware-set —
`cookie` (`Providers.tsx:33`), `user-agent` (`IsMobileWrapper.tsx:9`), `x-signature-*` (`api/interactions-edge.ts:35-36`),
`x-hooks-api-token` (`api/interactions-server.ts:11`), `authorization` (`api/v1/guilds/[guildId]/messages.ts:23`, `[id].ts:23`, and
preview-image-generator `src/server.ts:49`): outside P2's property. preview-image-generator's `overrides`: honoured by npm, no defect.
project-utils: no hit. Every other `src/**` file.
**Not covered by the sweep (hazards for devops):** Vercel's request-size limits; the installed `node_modules` (read from published
tarballs); the matcher's behaviour on a bare `/message`; no live request sent. Any external caller of `/api/trpc` that batches would be
refused after release; none is known (the public API is `/api/v1`) — read from code, not run.
**Branch cut** 23:57:29Z: `git switch --no-track -c chain/fix-trpc-batch-limit origin/master` in `/usr/local/bin/hooks/website`, over a
tracked tree read clean (`git status --porcelain --untracked-files=no` to a file, 0 bytes); before and after `d1bb9b0`; the lockfile
is unchanged across the switch (same commit).
