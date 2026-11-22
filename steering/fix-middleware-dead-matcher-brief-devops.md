Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-middleware-dead-matcher-brief-common.md` — read it whole first. Its hazard 3
is corrected by the review's CR-1: the only `x-pathname` reader, `Redirects/Server.tsx`, is imported only by the message layout, so
`/preview` receives the header with nothing reading it (CR-1 is ruled outside this release; rulings block 17:40).

From `steering-hooks-fixer`, 2026-11-22T17:40Z. You are `devops-fix-middleware-dead-matcher`. Release fixer chain
`fix-middleware-dead-matcher` (website) per your definition: Stage 1 now; Stage 2 only on the owner's release approval, which you ask him
for in this session (the push to website `master` deploys to Vercel production).

## Gate documents (anchors copied at compose time)

- Fixer: `implementation/fix-middleware-dead-matcher-implementation.md`, `Handoff-At: 453de76 — repos=website` (record `2e61217`).
- Code review: `code-review/fix-middleware-dead-matcher-code-review.md`, `Reviewed-At: 453de76187c5c368732a20d2dd8a671ed97eed4c —
  repos=website` (record `4823fb3`, round 1 APPROVED_WITH_COMMENTS, CR-1 LOW). No QA in this stage set (19 production lines, re-derived by
  the reviewer): the reviewer ran the suite (2362/2362, exit 0), typecheck and the red test in exports.

## Trees and refs (read by steering 17:40Z)

- Website `/usr/local/bin/hooks/website` on `chain/fix-middleware-dead-matcher` (head `453de76`, no upstream), cut from `origin/master`
  `3859c29`; `git ls-remote origin master` read `3859c29d557c…` at 17:40Z. Porcelain `?? .playwright-mcp/` only (not this chain's).
- No `.github/workflows`. The determination's `release-move.js … --dry-run` on `master` `3859c29` passed (17:1xZ); re-run it at your tip.
- The shared tree's gitignored `.next/types/validator.ts` is stale (names the removed cron route): `pnpm run typecheck` in the live tree
  exits 2 until a build regenerates it; Vercel builds from a clean checkout. Shared-tree state; leave it.

## Decisions and carriers for your forward-item sweep

- Rulings: `/usr/local/bin/hooks/agent-output/steering/fix-middleware-dead-matcher-rulings.md` — blocks 01:49 (his selection; scope),
  16:59 (the rider), 17:15 (his selection; the determination), the hand-off block and 17:40 (CR-1's disposition).
- Assumption Not Checked: the code review's § "Assumption Not Checked" (two discriminating post-deploy requests: signed-out
  `GET /message/m/0/edit` must not redirect; signed-out `GET /message/m/1/edit` with `x-pathname: /message/m/0/edit` must redirect), and
  the fixer's document's own section.
- The reviewer's `check-proxy-registered.py` (base exit 1, tip exit 0), under `verification/fix-middleware-dead-matcher/code-review/`,
  for the release build.
- Architecture: steering lodges one entry at closure.

## Instruments you hold

- Vercel CLI, look-only (his selection, effort rulings `steering/fixer-queue-2026-11-21-rulings.md` block "2026-11-21T19:02"): from the
  website dir with stdin closed, `vercel ls --prod`, `vercel inspect <url>`, `vercel logs <url>` (CLI 29.1.1 returns the build log). The
  CLI hangs intermittently: `timeout 60`, retry once. Never deploy, change settings or read secret values.
- Public requests to hooks.gg, signed out, read-only (the two above).

## Hazards (each a candidate to re-derive)

1. The proxy runs on Node.js in production, not edge (his selection 17:15 accepted it; latency unmeasured). Post-deploy: the build log
   carries no "middleware file convention is deprecated" line; `inspect` shows how the proxy is deployed — record what it shows.
2. A Vercel build holding both `middleware.ts` and `proxy.ts` fails: the tip holds only `src/proxy.ts`.
3. Deploy evidence is the production deployment itself (Ready, built from your tip, serving hooks.gg), not the push.
4. His standard for questions to him (effort block "2026-11-21T18:37Z"): your release ask opens with the context, then the decision, in
   plain English, with no commit IDs, tool or branch names; the fixer's **User-visible flows** list in his words.
5. Avoid a bare `none` operand; a call not completed → stop and message `steering-hooks-fixer`, never re-issue; the record says only
   "not completed".

## Routing

- Owner-needing items you are not asking him yourself, and spawn cues: SendMessage to `steering-hooks-fixer`.
- Stage 1 completion and the Stage 2 / post-deploy outcome: to `steering-hooks-fixer` by SendMessage.
- Your document under `deployment/`; evidence under `verification/fix-middleware-dead-matcher/devops/`.
