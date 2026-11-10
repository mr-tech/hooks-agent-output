# Brief — code reviewer, fix-hooks-record-shared-engine

Duties negated: none.

You are `code-reviewer-hooks-record-engine`. A fixer chain: no plan and no critique exist. Your start is the fixer's committed document `implementation/fix-hooks-record-shared-engine-implementation.md` in `/usr/local/bin/hooks/agent-output` and its `Handoff-At`, delivered to you by `fixer-hooks-record-engine`; until then, wait.

**Scope the fix is held to**: `steering/record-tools-shared-engine-rulings.md` (the scoping determination and the block headed "Do what's necessary to make the record healthy."), and the fixer's brief beside this file, `steering/record-engine-briefs/record-engine-fixer-brief.md` — its "Out" list is the exclusion in sweep form: no engine edit, no chain document or evidence edited to make a check pass, PI006's two `tools/uat*` files untouched, `INDEX.md` untouched. The tree is the record repository's `master`; there is no fix branch.

**Stage set**: fixer → code review → QA Phase 2. Your verdict is delivered to `qa-hooks-record-engine` on approval, to the fixer on rejection. Owner-needing items and spawn cues: `steering-cleanup-hooks` (named `steering-cleanup` until 2026-11-10T08:53Z).

**Hazards (steering's analysis — re-derive each):**
- A baseline can hide a real defect. Every baselined entry should be a failure that existed before the move and that no document correction can clear; the brief sanctions only the 4 unsuffixed documents and pre-012 legacy documents.
- A directory exemption for duplicate names should be no wider than the probe folders that need it.
- Rule instants set at adoption switch rules off for history: check they are not set later than the adoption commit.
- `node tools/check-repo.js` exit 0, `--status`, and `node tools/build-index.js --tracked` are what other stages and steering run; an `INDEX.md` format change is a behaviour change to name.
- The new entrypoints depend on `~/.claude/tools/record-engine.js`, which has no remote.

**Architecture**: `~/.claude/agents/record-tools-architecture.md`. **Not checked by this brief**: anything about the engine's behaviour on this record; the brief's hazards are candidates, not findings.
