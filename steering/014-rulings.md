# Chain 014 — owner rulings (steering per-effort file)

Verbatim commands from the owner, 2026-08-26, session steering-test-cleanup. Plan-binding
decisions are register-only; rows here are pointers or operational commands. Re-read before any
ask on this chain.

- **Spawning**: "It's fine you spawned the researchers, but all other agents are to be spawned by
  me for efficiency." → every stage session is owner-spawned; steering hands him the brief and the
  session name, then sweeps `/proc`. Never spawn.
- **Direct talk**: "instruct agents to talk directly with eachother as it makes sense to … I do not
  believe Steering needs to be reported to for everything." → briefs name the consuming stage as
  delivery target; steering gets gate state only. Definition half queued in agents TODO.md for pi.
- **Plan-binding, by selection prompt** (register rows in plan 014): Hooks pilot first; delete
  bug-pins → handoff, no fixes; CI out of scope; helper layer planner-per-package; new
  /usr/local/bin/hooks/CLAUDE.md is the conventions home; audit-existing-tests rule reaches
  definitions via this chain's retrospective → pi; D34 shapes-v2 empty-text-display case: "Delete
  it — the handoff supersedes D34"; owner observations on a branch: "No — only releases/incidents
  count; treat as intra-chain"; value statement + mint 014 approved.
- **DOM harness**: "Which makes more sense to do in the long-term? I'm leaning towards 2,
  authorize." (option 2 = authorise a DOM harness as a declared scope delta; analyst needed,
  owner-spawned as `analyst-014`). Steering read this as authorisation and said so; open to his
  correction.
- Chain branch: `chain/014-test-suite-cleanup` in `hooks/website`, created from master `a74b9e2`.
- **Scope**: "Confirm the 6-milestone scope" (M0 baseline run, M1 CLAUDE.md, M2 harness, M3
  helpers, M4a/b/c dispositions, M5 sweep) — by selection.
- **CLAUDE.md home**: "Canonical in hooks/agent-output/CLAUDE.md, symlinked at
  /usr/local/bin/hooks/CLAUDE.md" — by selection; supersedes the bare-path form of D6.
- **Session naming**: "Spawned both, with `agent-[project]-NNN` key. This is what I've settled on,
  and should be added to TODO for the next pi batch" → `critic-hooks-014`, `analyst-hooks-14` (as
  spawned; join key is the exact string). Queued in agents TODO.md.
- **Critic contact** (owner, in conversation): "I stopped the critic and told it only to contact you
  when blocked. Do not update the planner on this." → steering expects no gate-state reports from
  critic-hooks-014; its pass/rung/verdict are read from critiques/014-*.md at write time. Planner
  not told.
- **Steering error, lodged for the retrospective** (2026-08-26): briefs from this thread used
  "gate state" in steering.md's wide sense (pass/rung/verdict/delta); the owner's ruled sense is
  narrow — a block, an owner-needing question, a scope delta. Definition queued with the
  direct-talk pi item in agents TODO.md.
- **2026-08-27, by selection**: "QA first only; implementer after Phase 1 lands." QA spawned as
  `qa-hooks-14`. Glossary queued for pi (agents TODO.md). Plan 014 Approved at rev 4 (`58e1eb1`).
- **2026-08-27 "Do both"**: stages message steering only for an owner-needing item (block, OPEN
  QUESTION, milestone-level scope delta) or a spawn cue. Told the planner to propagate; encoded
  in agents TODO.md for pi.
- **2026-08-27, by selection, implementer ceiling stop at 62b61bd (M4b 3/10)**: "Compact the
  existing implementer and continue it instead." No successor; same session, same name.
