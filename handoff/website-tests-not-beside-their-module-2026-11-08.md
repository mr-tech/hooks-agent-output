---
UUID: 6cc21df2
Status: Open
Status-Detail: "Six website test files that predate chain 015 likely sit in a __tests__/ directory other than the one beside their production module (Test Conventions, Placement). Each needs a read to confirm its module, then a rename with identical per-file case count and pass set. Outside plan 015's pool (D6); nothing blocks on it."
Owning-Stage: planner
Review-Trigger: when any of the six files named below is next edited, or when the next website test-cleanup effort is scoped
---

# Website tests likely not beside their production module

## What is seeded

`agent-output/CLAUDE.md` § Test Conventions (`website`), Placement: tests live beside the code they cover,
`src/**/__tests__/<module>.<behaviour>.test.ts[x]`, the `__tests__/` directory being the one directly under the
production module's own directory.

Six test files predating chain 015 are likely members of the class "a test file whose `__tests__/` directory is not
the one directly under its production module's directory":

- `messageStore.dropped-set-report`
- `messageValidity.predicate`
- `useApiMethods.json-editor-repair`
- `usePusher.hash-parity`
- `cron.scheduled-selection`
- `interactions-edge.signature-before-parse`

Owed, per file: read the test to confirm which production module it covers (the predicate below matches stems,
not imports); where it is misplaced, move it beside that module. The rename class's evidence is a per-file case
count and pass set identical before and after (Test Conventions, "Review-round / ticket / date-named" row's
evidence form, applied to a move). No assertion changes, so no falsity signature is owed.

Not members (the predicate's false positives, per code review's reading): the `utils.*` (6), `constants.*` (1) and
`DiscordMessageEditor.*` (2) hits, whose module is a directory's `index` file or whose stem collides with an
unrelated file.

## Evidence

- Instrument: `verification/015/cr-qaf-probes/test-placement.py <website> <sha>`, which matches each test's
  `<module>` segment to production files with that stem. It cannot see a module named by a directory's `index`
  file, counts as placed a stem shared by several files when one sits in the parent, and skips `helpers/`.
- Runs: `placement-4f9ed85.txt` (16 MISPLACED), `placement-476c633.txt` (15), `placement-b195eeb.txt` (15, after
  chain 015's own member `formatKey.key-format` was moved, CR-35 RESOLVED).

## Origin

Code review, chain 015, Round 2/3 sub-entry at website `4f9ed85`, CR-35 LOW
(`code-review/015-bug-evaluation-fixes-code-review.md`), whose Required Action routed the six earlier members to
plan 015's Planner batch; the planner excluded them from the chain at plan revision 28 (Exclusions X-26).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-08T10:49 | planner (planner-hooks-015) | Created from CR-35's six earlier members, at plan 015 revision 28. |
| 2026-11-10T10:15 | steering-cleanup-hooks | `Review-Trigger` fired and was read: the comment sweep (website `6d78b19`, chain `fix-agent-comment-sweep-merge`) edited three of the six files — `messageValidity.predicate`, `useApiMethods.json-editor-repair`, `usePusher.hash-parity` — by removing comments only; none was moved (devops's read, `deployment/closed/fix-agent-comment-sweep-merge-deployment.md`). The relocation this handoff carries is still owed; it stays Open for the planner, and the trigger can fire again. |
| 2026-11-11T09:05 | steering-queue-hooks | Inbox entry from `code-reviewer-fix-website-save-gate-embeds` demoted here: its CR-2 (`code-review/fix-website-save-gate-embeds-code-review.md`) re-enumerated the same six files at website `6d78b19` and names the enumeration's blind spot. No member added. |
