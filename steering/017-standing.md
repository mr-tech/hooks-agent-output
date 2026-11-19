# Standing rulings — 017 (Hooks.gg backlog items 2 to 5)

Every ruling still in force for chain 017, each by pointer to its block in `steering/017-rulings.md`
(event log) or the effort-wide `steering/backlog-2026-11-18-rulings.md`. Plan-binding decisions are the
plan's Decisions Register rows (D-n) in `planning/017-existing-items-backlog.md`; this file points, it
does not restate them. Rewritten whole at every touch. A successor reads this file whole, then the event
log from its last generation's first block.

## Commission and scope

- His commission: "Do all 5 in whatever order and group however you determine best." — effort-wide file,
  block "2026-11-18T21:53Z — commission (his words)".
- Scoping determination, chain B (items 2 to 5), stage set and scope statement — effort-wide file, block
  "2026-11-18T21:59Z — scoping determination: chain B (items 2 to 5)". No dated outside event (its line 77).
- Scope M1 to M7 confirmed; exclusions X-1 to X-16 accepted — block 2026-11-18T23:26Z. X-17 to X-19
  accepted — block 2026-11-19T00:11Z. X-18's third case accepted as a known limit — block 00:27Z.
- Rider M8 (the two dialogs' page-wide Enter) added to 017, ships in 017's release — block 04:50Z.
- New feature work only after these existing items (`steering/queue-hooks-rulings.md:35`).

## Product rulings (his selections; registered in the plan)

- Stories 1 to 4 as worded; statement 5 in the corrected wording — blocks 2026-11-18T23:08Z and 2026-11-19T05:01Z (OQ-14).
- Preview failure: the website logs failures, no user sees anything (OQ-1) — block 23:08Z.
- Lint: base result accepted, fix none (OQ-6) — block 23:08Z.
- Signed-out edits: fix at source and turn warnings on (Q-A); leave warning on link clicks for everyone,
  unstoppable navigations a known limit (Q-B, D-12) — block 23:08Z. D-12 covers the `/send` same-tab
  external links — block 02:43Z.
- OQ-8 sign-in exits skip the prompt; OQ-9 probe "fails" = didn't keep running; OQ-10 guard on send links —
  block 00:11Z.
- OQ-11 cap 20 drafts / 1 MB; OQ-12 fix in shared storage code; OQ-13 sweep after each save — block 00:27Z
  (F-24's correction beside it changes nothing he chose).

## Process rulings in force

- Vercel reads: G-1 by `vercel api` under the hooks-gg team (block 23:12Z); further read-only Vercel and
  `claude-ro` host reads are Standing Defaults, never asked (blocks 23:15Z, 23:41Z, bounds in 23:41Z).
- M5-0: probe pushes approved in devops's session (D-15, D-30); limb 2 kept alive, limb 3 lasts; T = 40 s
  stands — blocks 05:01Z, 05:06Z, 05:19Z.
- Implementation of M5, M6, M8 on revision 7 (`6ade256`), QA Phase 1 at `7eda138`; M7 last — block 05:19Z.
- M4 capped (each further gap below HIGH to the Planner batch, severity-floor findings excepted) — block
  04:14Z.
- Branches: website `chain/017-existing-items-backlog` from `1ad625e` (block 00:29Z); generator
  `chain/017-existing-items-backlog` at `8de2b53` (block 05:21Z). Generator `.github/workflows/prod.yml` is
  secret-gate-flagged: no `git log`/`show` that can print it.
- This thread's name `steering-roadmap-hooks`; alias chain in the event log's header — block 05:22Z.
- Selection prompts: at any turn that ends with every chain waiting on him, the open asks go as a
  selection prompt in that turn (his clarification) — block 23:10Z.
- Never raise the missing-roadmap question (`memory/roadmap-no-mention.md`).
