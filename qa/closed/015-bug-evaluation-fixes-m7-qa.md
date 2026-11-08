---
ID: 015
Origin: 015
UUID: 861e5f61
Verified-At: "476c633 — repos=website; M7 only, run in git-archive exports of 476c633 under unshare -rn, not the shared tree"
Status: Committed
Status-Detail: "Committed with chain 015 (website b96e364 and preview-image-generator 8de2b53); the verdict recorded in the body stands at its own Verified-At. Earlier detail is in the body and changelog."
Phase: 2
---

# QA Report: Plan 015 — M7 (bot)

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 27 (agent-output `18d361c`), § M7, read in full. M7 is unchanged by revs 26 and 27.
**Implementation**: `implementation/015-bug-evaluation-fixes-m7-implementation.md`, `Handoff-At: 476c633` (code in `a4b4434`).
**Code review**: `code-review/015-bug-evaluation-fixes-code-review.md` Round 17 (`2fa6d8b`), `Reviewed-At` `476c633`: M7 approved. Re-derived from the committed section; this is the stage start.
**Phase 1 and the chain's register**: `qa/015-bug-evaluation-fixes-qa.md` § M7 (keyed to rev 27 at `b21c7b5`). No row is appended.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T09:52 | code-reviewer-hooks-015 → qa-hooks-015 (`2fa6d8b`); steering-hooks-015 (brief at rev 27) | QA Phase 2 for M7 at `476c633` | Created. PASS, milestone-scoped. The plan Status is left alone. |
| 2026-11-08T21:31 | devops-hooks-015 | Document closed | Status: Committed (was QA Complete). Stage 1 closure: chain 015 committed on chain/015-bug-evaluation-fixes at website b96e364 and preview-image-generator 8de2b53, not pushed or merged. Moved to closed/. |

## Scope and criteria assessed

Fixed before execution (plan § M7; Phase 1 § M7):
- **M7-a.** The message command requires Manage Server alone: `ADMIN_PERMS === "32"`, as a literal.
- **M7-b.** `setTimestamp(t)` puts `t` in the payload's `timestamp`.
- **M7-c.** `isUserCommand` is true only for a user command, over a user command, a slash command and a message command.

## TDD compliance gate

Passed. `m7-implementation.md` carries the table: three rows (`ADMIN_PERMS`, `setTimestamp`, `isUserCommand` through `getLocalizedStrings`), each Yes/Yes/Yes, with assertion-level failure reasons.

## Test Execution Results

The suite at website `476c633` (git-archive export, `unshare -rn`) passed 1118/1118 cases in 114 files, with vitest exit 0 and `pnpm run typecheck` exit 0 (`verification/015/qa-p2-r2-run-476c633.txt`). The bot test collection is live: the three files below are among the 6 added since `24ac49f`, compared by path membership.

| Criterion | Cell (file, title) | Assertion | Mutant (seen red) |
|---|---|---|---|
| M7-a | `common.admin-permissions.test.ts`, "requires the Manage Server permission alone"; "publishes the message command with that permission" | `expect(ADMIN_PERMS).toBe('32')`; the published command's `default_member_permissions` equals `['32']` | `bot-admin`, 2 cells red |
| M7-b | `DiscordEmbed.set-timestamp.test.ts`, "puts the given timestamp in the payload" (plus the default-time and unset siblings) | `expect(embed.createPayload().timestamp).toBe('2024-05-06T07:08:09.000Z')` | `bot-ts`, 2 cells red |
| M7-c | `common.localized-strings.test.ts`: a user command, a slash command and a message command, each read from every language | A literal per-language map per command type | `bot-user`, 1 cell red |

Mutants: `mutators/qa-r2-supplement.py`, outputs `mutation-qa-r2*-476c633.txt`, run by a helper and re-read by QA.

M7-c is tested through `getLocalizedStrings`, because `isUserCommand` is not exported. Each command type reads a different property, so a wrong branch changes the output, and `bot-user` shows that it does. Naming: no ID token appears in any basename, title or comment. Every expected value is a literal.

## Implementation Review (Post-Implementation)

The change is as small as the plan describes: one constant, one payload field, one predicate. There is no overreach.

## Findings

None.

## Assumption Not Checked

This pass assumes that Discord applies `default_member_permissions: "32"` to an already-registered command once `push-commands` re-publishes it. Nothing in the suite can see Discord's side.
- **Signature of its falsity:** after the owner's `push-commands`, a member without Manage Server can still invoke the message command, or a member who has Manage Server and lacks the old permission still cannot.
- **Owner of closing:** the plan's owner step `push-commands` (M7-a), observed by UAT in its walk if the test account's role can be set. Otherwise it stays the owner's, as the plan's Owner steps list it.

## Blocking-condition register

No row is appended. M7-a's operator act is the plan's owner step, not a QA row.

## Handoff

- **Verdict:** PASS for M7 at `476c633`. Next: UAT for M7, after the effort-final QA pass.
