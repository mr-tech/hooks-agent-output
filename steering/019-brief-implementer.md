Duties negated: none.

# Plan 019 — implementer brief (`implementer-019`)

Written by `steering-hooks-fixer` at 2026-11-23T18:48Z. First read `steering/slate-formatting-brief-common.md` whole. It holds the stage set,
the scope statement, the rulings, the architecture citations and the hazards. This file adds only what is yours.

- **Plan:** `planning/019-slate-formatting-discord-engine.md`, Revision 9 (record `47348a6d`).
- **Your start:** this thread's recorded start, in `steering/fixer-queue-2026-11-21-rulings.md`, block
  `2026-11-23T18:48Z — 9e released and closing; website tree to plan 019; implementation start`. QA Phase 1 is
  `qa/019-slate-formatting-discord-engine-qa.md` at record `26f3a3c`. Start with M2, then follow the plan's order through M6. M7 is devops's.
- **Tree:** `/usr/local/bin/hooks/website`, on `chain/019-slate-formatting-discord-engine` at `5ec0621` (cut 18:47:45Z from `origin/master`).
  Your first act there is `git branch --show-current`. `?? .playwright-mcp/` is foreign; leave it alone.
- **Base moved:** QA's Phase 1 baseline ran at `af3d95a`. The chain base is `5ec0621`, which adds 9e's `ImageUploader.tsx`, `useDialogEnter.ts`
  and two `ImageUploader.*` tests, all outside the region. Re-run the baseline suite at `5ec0621` and record it before any change.
- **Pinned build first:** M2 adds `@discord/markdown-wasm`, pinned exactly (common brief hazard 5). Your first run is `pnpm install --frozen-lockfile`
  at the base. After you add the dependency, the pinned install and `next build` come before any other run, because hazard 3 is unread.
- **Shared tree hazard:** a stale `.next/types/validator.ts` has made in-tree `pnpm run typecheck` exit 2. It is build output, and a build
  regenerates it. Record which applies to you; do not delete it.
- **Rulings that bound you** (blocks in the effort rulings file): 17:56Z (M4 and M6 are capped: a gap below HIGH becomes a stated limit);
  18:02Z and 18:06Z (AC-4.7; CF-16 is a stated limit, and the vi-VN case resets dayjs to `en` first or runs in its own module); 17:17Z (D-15's
  reading). His selections are in the plan's Decisions Register.
- **User-visible flows:** before code on M4, M5 or M6, send this thread the flows that hold a decision, by SendMessage. Record the others in
  your document. Those flows are not coded until his answers come back.
- **Delivery:** your document goes to the code-reviewer, the consuming stage (lifecycle next-act table). Send this thread `BLOCKED:` items,
  owner-needing questions and spawn cues by SendMessage to `steering-hooks-fixer`. Your report goes to your document alone.
