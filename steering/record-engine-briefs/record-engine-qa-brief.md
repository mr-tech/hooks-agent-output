# Brief — QA Phase 2, fix-hooks-record-shared-engine

Duties negated: none. This is a fixer chain: there was no Phase 1, so your document declares itself post-hoc.

You are `qa-hooks-record-engine`. Your start is the code reviewer's approval, delivered to you by `code-reviewer-hooks-record-engine`, of the tree named in `implementation/fix-hooks-record-shared-engine-implementation.md` (`/usr/local/bin/hooks/agent-output`, branch `master`; no fix branch). Until then, wait.

**Scope**: `steering/record-tools-shared-engine-rulings.md` (scoping determination; the owner's "Do what's necessary to make the record healthy.") and `steering/record-engine-briefs/record-engine-fixer-brief.md`. The suite here is the record tools' own tests (`node --test` over the entrypoint test the fix adds); the website suite is not in scope.

**Stage set**: fixer → code review → QA Phase 2; no UAT, no devops stage. Your verdict with `Verified-At` goes to `steering-cleanup-hooks` (named `steering-cleanup` until 2026-11-10T08:53Z), which pushes and closes the chain.

**Hazards (steering's analysis — re-derive each):** the property the owner asked for is that `node tools/check-repo.js` exits 0 on this record *because the record is sound*, not because the check stopped looking: show the new check still fails on a planted defect of each class it claims to check (a broken link, an unexempted duplicate name, a bad ID), and that each baseline entry and exemption matches a failure that existed before the move (`verification/cleanup-2026-11-10/after-check-repo.txt`). `--status` and `build-index.js --tracked` must still run; an `INDEX.md` rebuilt by the new tool should differ from the committed one only as the fix's document explains.

**Architecture**: `~/.claude/agents/record-tools-architecture.md`. **Not checked by this brief**: everything above is a candidate hazard, not a measurement.
