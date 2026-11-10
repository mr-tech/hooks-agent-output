# Rulings — hooks record tools onto the shared engine (no chain yet)

Steering session: steering-cleanup (cwd `/usr/local/bin/hooks`). Opened from the 2026-11-10 project
cleanup (`steering/cleanup-2026-11-10.md`, pass 9).

## 2026-11-10T08:47Z — closing prompt of the project cleanup: four selections

Put 2026-11-10T08:45Z, answered 08:46Z. All four answered by selection, not in his words. Ledger:
`steering/selection-ledger/2026-11-10.md`, block "2026-11-10T08:46Z — steering-cleanup".

1. **Record check (26 remaining failures).** Options: *Agent: scope moving to the shared engine* (I
   record a scoping determination and bring it back before any stage starts; unread whether it clears
   the 4 suffix failures) / *Agent: keep this copy, add exceptions* (exceptions keyed by bare file
   name hide future files of that name; the 4 suffix failures stay) / *You: leave it failing* (exit 1
   with 26 stays). Chosen: **Agent: scope moving to the shared engine**.
2. **Test ID rule.** Options: *Agent: add qaf to the rule* / *You: leave the rule as it is* (a
   `qaf-N` title would pass). Chosen: **Agent: add qaf to the rule**. Done: `CLAUDE.md` committed.
3. **Old branches.** Options: *Agent: delete them locally* (8 website, 1 generator, 1 project-utils,
   `git worktree prune`; local only) / *You: leave them*. Chosen: **Agent: delete them locally**.
   Done: ten `git branch -d`, each printed "Deleted branch"; three worktree entries pruned.
4. **Stray ledger file.** Options: *Agent: delete the file* / *You: leave it in place* (stays
   untracked). Chosen: **Agent: delete the file**. Done: `rm`, untracked, never committed.

Premises, each read in this session at the mechanism: 26 failures (`node tools/check-repo.js`, exit
1, saved as `verification/cleanup-2026-11-10/after-check-repo.txt`); exceptions keyed by basename
(`tools/check-repo.js` `DUPLICATE_BASENAME_EXCEPTIONS`); the ten branches merged (`git branch
--merged` per repo against `master`/`prod`); the ledger file's mtime and block (`os.stat`, `cat`).
The QA count of 0 matching test files was marked in the option as QA's read, not re-run.

## 2026-11-10T08:47Z — scoping determination (agent-authored; no stage has started)

**Shape.** Hygiene, record tooling. Cause proven: the 22 BASENAMES failures exist because this
record's own `tools/check-repo.js` can only exempt a file name everywhere, never per directory.

**What the move is.** Replace this record's `tools/check-repo.js` (846 lines) and
`tools/build-index.js` with thin entrypoints that set `SETTINGS` and call
`~/.claude/tools/record-engine.js`, in the form of the statbot record's entrypoints, and bring over
`tools/recordEntrypoints.test.js`. <!-- check-repo:ignore — a file the move would create; it does not exist in this record yet -->

**What it clears, and what it does not.**
- 22 BASENAMES: clearable. The engine takes `duplicateBasenameExemptDirectories`
  (`record-engine.js:81-103`), a directory pattern with a reason, which fits the probe folders under
  `verification/`.
- 4 SCOPE: **not cleared.** The engine's `STAGE_SUFFIXES` (`record-engine.js:427-439`) is the same
  table as this record's: `deployment/` accepts only `-deployment`. Those four need either an entry
  in the engine's baseline file (`tools/check-repo-baseline.json`; adding to a baseline is the <!-- check-repo:ignore — a file the move would create; it does not exist in this record yet -->
  owner's decision) or a suffix added in the engine, which the Agents domain owns.
- New failures: **unmeasured.** The engine adds rules this record has never been checked against
  (changelog-row and heading stamps from a gate instant, duplicate R-n/D-n, status vocabulary on
  closed documents from an instant, handoff `Priority`). The cleanup's survey already names seven
  closed documents with a `Status` outside the vocabulary. The instants are settings, so the move
  can start them at the adoption date.
- Chains before 012: this copy omits them by `FIRST_CHECKED_CHAIN = 12` (owner ruling 2026-08-24).
  Whether the engine has an equivalent is unread (`grep -i 'legacy|firstChecked|preWorkflow'` over
  the engine returned nothing); without one, 83 legacy files come back into the check.

**Blast radius.** This record's `tools/` only; every stage that runs the check here; a new
dependency on `~/.claude/tools`, which has no remote. No product repository, no deploy. Coupling:
chain PI006 has committed in this record's `tools/` on 2026-11-10 (`uat-local-stack.sh`,
`uatLocalStack.test.js`) and the engine belongs to the Agents domain, so an engine change
(legacy omission, a readiness suffix) is that domain's, not this effort's. Statbot plan PI001 left
this record out by D-16 ("Agent: leave it out"), carried by the inbox entry processed today.

**Specification uncertainty.** Three settings are choices: the two instants, the exempt directory
patterns, and the fate of the pre-012 documents and the four unsuffixed ones.

**End step.** A commit on this record's `master`, pushed; the record has no workflow files (`.github`
absent on disk and in `HEAD`), so the push deploys nothing. `release-move.js --dry-run` was not run:
no release ref is in scope.

**Pipeline proposed.** The `fixer` agent with code review and a QA Phase 2 verdict (the change is
over 20 lines), no plan, critic or UAT. Bounded scope: the two entrypoints, the entrypoint test, the
settings; a dry measurement of the engine against this record first, its failure count reported
before anything is committed; no edit to the engine; no edit to any chain document to make a check
pass. If the dry measurement shows the engine needs a change to be usable here, the fixer stops and
the item goes to `~/.claude/agents/INBOX.md`.

**Not started.** Per the option he chose, this comes back to him before any stage starts.
