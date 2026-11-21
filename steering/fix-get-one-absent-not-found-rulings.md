# Rulings — fixer chain `fix-get-one-absent-not-found` (website: chain 2's escaped absent-number gap; the not-found page's editor controls)

Fixer chain steered by `steering-hooks` (cwd `/usr/local/bin/hooks`; coordinator `steering-coordinator`), chain 3b of effort
`fixer-queue-2026-11-21`. Commission and order: `steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-21T05:32Z" and
"2026-11-21T07:59Z". Brief common part: `steering/fix-get-one-absent-not-found-brief-common.md`. tmux category:
`fix-get-one-absent-not-found`.

## 2026-11-21T08:57Z — scoping determination: fixer chain, website, one escaped defect and one rider

**His words.** Effort block "2026-11-21T07:59Z": timing "Agent: right after chain 3 (Recommended)" — "chain 3 finishes and releases
first; then a fixer round on this gap runs from the new master, with a red test that uses the real library copy"; header row "Agent:
hide editor controls (Recommended)" — "in the same fix round, the not-found page drops the name field, the menu and Send, keeping only
the site's normal navigation and the notice." Chain 2's own scope (`steering/fix-message-not-found-rulings.md`, block 06:46Z, item 1)
is the property: one NOT_FOUND for an absent number, another user's message and an unmanageable server's.

**Source.** `handoff/get-one-absent-number-still-500-in-production-2026-11-21.md` (UUID 7c3e91a4), IN whole; post-deploy B-1 in
`handoff/fix-message-not-found-post-deploy-2026-11-21.md`, re-read by this chain and closed by it.

**Shape.** Defect, escaped to production (B-1, QA's read on hooks.gg 07:53-07:56Z). Cause established under Node by a refutation helper
(effort block 07:59Z); not shown on the Next bundle. Blast radius: `message.getOne`'s error mapping; the `/message/m/[id]/edit` header.
End step: website `master`, Vercel production; his word, asked by devops in its own session.
**Release ref.** `release-move.js … master b829314… --dry-run` (08:5xZ): "DRY RUN: every check passed; nothing moved"; no workflows.
Tree: `master` `b829314` = `origin/master`; `?? .playwright-mcp/` only. Lockfile unchanged `f4baebb..b829314`.
**Released chains whose scope touched these routes:** `fix-message-not-found` (`f4baebb`, the gap's origin; open carrier B-1);
`fix-import-save-conflict` (`b829314`, 08:53:57Z; the new-message dialog, not these routes; its PD-1 is being read).

**Scope sweep** (helper, `verification/fix-get-one-absent-not-found/scoping/sweep.md`, at `b829314`): P1 "an error identified by
`instanceof` against a package class the raising object may not share": one site — `message.ts:36-41` (`asNotFound`), called at `:74`
with `NoResultError` from `kysely` (`:4`), raised by `getMessage` (`shared.ts:151`) on project-utils' `getPostgres()`; every other
`instanceof` in non-test src is against a website-raised class or a built-in (zod errors from project-utils: cannot tell). P2 "editor
header controls render on a page with no message": `/edit` yes — `m/[id]/layout.tsx` renders `Navigation`, whose `Header`
(`_layout/Navigation.tsx:418-429`) shows the full editor bar (name field `:274-283`, menus, Send `:174`, `:208`, falling back to
`message?.id ?? 0`) whenever the path matches `/edit`; `/send` no. Covering tests: `message.get-one-not-found.test.ts` covers the absent
id over an ESM-kysely fake (green on the defect); no test of the `m/[id]` header. Real-postgres probe reusable:
`verification/fix-recent-message-ids/code-review/recent.pg.test.ts` imports project-utils' real `getPostgres`; `run-probe.sh` runs a
throwaway `postgres:16`.

**Stage set:** `fixer-fix-get-one-absent-not-found` → `code-reviewer-fix-get-one-absent-not-found` (and QA Phase 2,
`qa-fix-get-one-absent-not-found`, at 20 or more added production lines; under 20 the reviewer also runs the suite and the red tests) →
devops for website `master` (his word). No plan, critic, Phase 1 or UAT; the fixer's **User-visible flows**, each with its evidence,
are quoted to him with the release.

**Scope statement (bounded).** Repository `website` only, from `origin/master` `b829314`, on `chain/fix-get-one-absent-not-found`:
1. `message.getOne` answers NOT_FOUND, with chain 2's one text, for a number no row holds, in the runtime production uses — the
   identification of "no row" does not depend on the error class's identity across module builds. Red test: the error comes from the
   kysely build the query really runs (project-utils' real `getPostgres` over a throwaway postgres, or a `require('kysely')`-raised
   error), seen red at `b829314`. It is an escaped bug-form test: `// escaped: deployment/closed/fix-message-not-found-deployment.md`.
2. On `/message/m/[id]/edit` in the not-found state, the editor's header controls (the message name field, the File/Edit/View/Help
   menus, Send) do not render; the site's normal navigation and the notice stay.
Write set: website `src/server/api/routers/message.ts`, `src/server/api/utils/shared.ts` (`getMessage` only), `src/app/message/m/[id]/**`
(layout, `_layout/Navigation.tsx`, pages, `_components`), `src/providers/MessageProvider/index.tsx` (exposing the not-found state
only), their `__tests__/`; in the record, the fixer's document and `verification/fix-get-one-absent-not-found/`. Changing project-utils,
the kysely dependency or Next's bundling config is a re-scope.

**Exclusions.** zod errors raised inside project-utils (cannot tell; no `instanceof` site shown to depend on them): OUT, named for the
reviewer. The outer `/message` header and the send page's controls (`SendMenuTitle`): OUT — `/send` shows no editor header (P2 no).

**Post-deploy (devops brief):** B-1's absent-number limb re-read on hooks.gg by the test account, read only — a number no row holds
answers 404 with the one text and `/edit` shows the notice without the editor bar; then B-1's handoff and 7c3e91a4 close.

**What the sweep did not cover:** the outer `/message` header; `SendMenuTitle`; how `isNotFound` is set in `MessageProvider`; nothing
run; the Next server bundle's module resolution.
