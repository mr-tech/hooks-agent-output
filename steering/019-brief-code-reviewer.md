Duties negated: none.

# Plan 019 — code-reviewer brief (`code-reviewer-019`)

Written by `steering-hooks-fixer` at 2026-11-23T19:1xZ. First read `steering/slate-formatting-brief-common.md` whole. It holds the stage set,
the scope statement, the rulings, the architecture citations and the hazards, and each hazard is a candidate for you to re-derive. This file
adds only what is yours.

- **Start:** the implementer's committed document `implementation/019-slate-formatting-discord-engine-m2-implementation.md` (records
  `1189b7e0` and `077b51f1`), `Handoff-At: 22f3e58`, on website `chain/019-slate-formatting-discord-engine`. The chain base is `5ec0621`.
- **Scope:** you review every milestone this chain hands off, M2 now and then M3 to M6, each at its own document's `Handoff-At`, in this
  session. Your verdict carries `Reviewed-At: <sha>`.
- **Plan:** `planning/019-slate-formatting-discord-engine.md`, Revision 9 (`47348a6d`). QA Phase 1: `qa/019-slate-formatting-discord-engine-qa.md`
  (`26f3a3c`).
- **The shared tree moves under you.** The implementer goes on to M3 in `/usr/local/bin/hooks/website` while you review. Run everything at the
  hand-off SHA in an isolated export (`git -C /usr/local/bin/hooks/website archive <sha>`) with its own install, under a cap (lifecycle
  `SKILL.md`, Background work). Read code with `git show <sha>:<path>`, never from the working tree. A probe that drives the formatter runs
  network-isolated.
- **Caps that bound your findings** (blocks in `steering/fixer-queue-2026-11-21-rulings.md`): 17:56Z (M4 and M6 are capped: a gap below HIGH
  goes to the plan's Planner batch as a stated limit, not a rejection round, unless it is your severity-floor finding) and 18:02Z/18:06Z (AC-4.7;
  CF-16 is a stated limit).
- **Delivery:** your document goes to QA (`qa-019`, live), the consuming stage under the lifecycle next-act table. Send owner-needing items
  and spawn cues to `steering-hooks-fixer` by SendMessage. Your report goes to your document alone.
