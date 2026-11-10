# Brief — fixer, fix-hooks-record-shared-engine

Duties negated: the fix-branch entry condition (fixer.md, Entry conditions 3) — there is no `fix/` branch; the source lives in the shared record repository `/usr/local/bin/hooks/agent-output`, and you commit on its `master` over the enumerated paths only, by pathspec. Your "pending review at <sha>" rule for record deliverables applies.

You are `fixer-hooks-record-engine`. Work from `/usr/local/bin/hooks/agent-output` (always `git -C`; `/usr/local/bin/hooks` is not a repository).

**Scoping determination and the owner's word**: `steering/record-tools-shared-engine-rulings.md` — the block "scoping determination" and the block headed with his words, "Do what's necessary to make the record healthy." (witnessed by steering in its own session). Read both whole; they are your scope.

**Bounded scope statement.** Move this record's `tools/check-repo.js` and `tools/build-index.js` onto the shared record engine (`~/.claude/tools/record-engine.js`), in the form of the statbot record's entrypoints (`/usr/local/bin/statbot/agent-output/tools/check-repo.js`, `build-index.js`, `recordEntrypoints.test.js`), so that `node tools/check-repo.js` exits 0 on this record. In: the two entrypoints, the entrypoint test, the settings, a baseline file. Out: any edit to the engine or anything under `~/.claude`; any edit to a chain document, handoff or evidence file to make a check pass; `tools/uat-local-stack.sh` and `tools/uatLocalStack.test.js` (chain PI006's); `INDEX.md` (steering rebuilds it); every other repository.

**First deliverable, before any commit: a dry measurement.** Run the engine against this record with candidate settings without changing a tracked file (a scratch entrypoint outside the tree, or `RECORD_ENGINE_DIR`), and record in your document the failure count per check and what each class is. Today's own checker reports 26 (22 duplicate basenames under `verification/01{2,3,5}/` probe folders, 4 documents with no stage suffix): `verification/cleanup-2026-11-10/after-check-repo.txt`.

**Guidance, marked as steering's (design choices inside the scope are yours; record them as agent-authored):**
- The 22 duplicate names: a directory exemption with its reason (`duplicateBasenameExemptDirectories`), not renames — the probes' manifests and runners name one another.
- The rule instants (`gateInstant`, `vocabularyInstant`): the adoption time, so rules this record was never checked against do not fail its closed history.
- Failures no document correction can clear — the 4 unsuffixed documents, and the pre-012 documents this copy omits by `FIRST_CHECKED_CHAIN = 12` (owner ruling 2026-08-24, quoted in the old file's comment) if the engine has no omission for them — go in the baseline file, each identifiable. Steering reads the owner's words as covering that. Anything else you would baseline is `BLOCKED:` to steering first, with the count.
- Keep `--status` and `build-index.js --tracked` working: steering's standing procedures run both.
- If the engine cannot be made to pass here without an engine change, stop: `BLOCKED:` to steering, and the finding goes to `~/.claude/agents/INBOX.md`.

**Stage set**: fixer → code review → QA Phase 2 (the change is over 20 lines). No plan, critic, Phase 1, UAT, deweeder. End step: your commits on `master`; steering pushes (the record has no workflow files, so a push deploys nothing).

**Consuming stage**: `code-reviewer-hooks-record-engine`, by SendMessage naming your document and `Handoff-At`. **Return channel** for `BLOCKED:` and owner-needing items: the `steering-cleanup` session standing in `/usr/local/bin/hooks`. `ListAgents` shows two sessions of that name; address the one whose row is not the statbot one by its `[ref]` (5d9148 when this brief was written — re-read it).

**Architecture**: `~/.claude/agents/record-tools-architecture.md` (the engine and entrypoint design); `architecture/system-architecture.md` holds nothing about record tools.

**Not checked by this brief**: whether the engine omits pre-012 chains (a grep for `legacy|firstChecked|preWorkflow` found nothing); what the engine's index side changes in `INDEX.md`'s format; what `recordEntrypoints.test.js` assumes about a record; how many new failures the engine reports here; whether the hooks checker's `--status` verdict logic exists in the engine.
