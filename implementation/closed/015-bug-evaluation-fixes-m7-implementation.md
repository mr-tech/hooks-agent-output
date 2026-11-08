---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Committed
Status-Detail: "Committed with chain 015 (website b96e364 and preview-image-generator 8de2b53). Earlier detail is in the body and changelog."
Handoff-At: "476c633 — repos=website"
---

# Implementation 015 — M7 (bot)

## Plan Reference

`agent-output/planning/015-bug-evaluation-fixes.md` § M7 at rev 25 (`dd9e88a`; M7 unchanged since rev 1). Decisions Register D4 (Manage Server alone) read. QA Phase 1: `qa/015-bug-evaluation-fixes-qa.md` § M7. Bot test collection was added at M0 (`037935d`). The M5-h/M5-i, M6-fix-round, M4-d and M8 deliveries have their own documents (see Next Steps); this one is M7 only.

## Date

2026-11-08

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T09:05 | steering-hooks-015 → implementer-hooks-015 (message "Resume chain 015", then M7, then M8) | Implement M7 | M7-a, M7-b and M7-c coded in `a4b4434`. |
| 2026-11-08T21:31 | devops-hooks-015 | Document closed | Status: Committed (was Active). Stage 1 closure: chain 015 committed on chain/015-bug-evaluation-fixes at website b96e364 and preview-image-generator 8de2b53, not pushed or merged. Moved to closed/. |

## Implementation Summary

- **M7-a (F-28, D4).** `ADMIN_PERMS` is `PermissionFlagsBits.ManageGuild.toString()`, the string `"32"`. The old value was `Administrator & ManageGuild`, which is `"0"`, and Discord reads `"0"` as administrators only. The published message command (`messageCommands.ts`) takes it unchanged.
- **M7-b (F-29).** `DiscordEmbed.setTimestamp(t)` assigns `this.#payload.timestamp = t`. It was a comparison statement, so the payload never carried the timestamp. The default argument (the current time) now reaches the payload too.
- **M7-c (F-30).** `isUserCommand` tests for `'user'`. It tested for `'slash'`, so a user command fell through to the message branch of `getLocalizedStrings`.
- Two long signatures in `common.ts` were wrapped to clear the whole-file lint check on a file this change touches.

**Owner step, not run.** `pnpm run push-commands` from `website/` after the website release (M7-a, I-6). It republishes every bot command to Discord. Nothing here ran it.

## Milestones Completed

M7-a, M7-b, M7-c.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | Steering's message "Resume chain 015 … Then M7, then M8" (cross-session, 2026-11-08, no stamp); every pre-code gate had approved the plan revisions that carry M7 | Not a test |
| QA Phase 1 covers M7 | `qa/015-bug-evaluation-fixes-qa.md` § M7: `ADMIN_PERMS === "32"`, `setTimestamp(t)` then the payload's timestamp equals `t`, `isUserCommand` over three command kinds | The three test files below |
| Bot test collection | `vitest.config.ts` node project includes `bot/**/*.test.ts`; `tsconfig.test.json` includes `bot/**/__tests__` (`037935d`) | `pnpm run typecheck` exit 0 at the handoff |
| User-visible surface | None in the product UI. The Discord context menu is observed only after the owner's push-commands (B-6) | Not a test |
| E-5 (no network in tests) | Every run inside `unshare -rn` with lo up | The M7 runs |

## Files Modified

| Path | Changes | Lines |
|---|---|---|
| `bot/scripts/app_commands/common.ts` | `ADMIN_PERMS`; `isUserCommand`; two signatures wrapped | +8 −4 |
| `bot/utils/DiscordEmbed.ts` | `setTimestamp` assigns | +1 −1 |

## Files Created

| Path | Purpose |
|---|---|
| `bot/scripts/app_commands/__tests__/common.admin-permissions.test.ts` | M7-a: `ADMIN_PERMS` is `'32'`; the published message command carries it |
| `bot/scripts/app_commands/__tests__/common.localized-strings.test.ts` | M7-c: through `getLocalizedStrings`, a user, a slash and a message command each read their own strings in every language (the language data is a mock at the module boundary, since the product has no user command) |
| `bot/utils/__tests__/DiscordEmbed.set-timestamp.test.ts` | M7-b: given timestamp, default timestamp (fake clock), none before it is set |
| `agent-output/verification/015/`: `m7-first-run.txt`, `m7-green-run.txt`, `mutators/m7-table.py`, `m7-sweep.sh`, `m7-sweep-summary-a4b4434.txt`, `mutation-*-a4b4434.txt` | Evidence |

## Patterns Extended

| Surface | Pattern extended (rung) |
|---|---|
| Existing tests named before adding | None covers `bot/`: `find bot -name '*.test.*'` was empty before this round. `src/utils/__tests__/serverCommands.get-message.test.ts` covers the interaction handler, not these three functions |
| Test placement | `bot/**/__tests__/<module>.<behaviour>.test.ts`, the collection M0 added (rung 1: the `src` convention) |
| Language data | `vi.mock` of the module that holds the data, as other suites mock `~/env.mjs` (rung 1) |
| `isUserCommand` | Tested through `getLocalizedStrings`, its only caller, not exported for the test (no test-only export) |

## TDD Compliance

Red run: `verification/015/m7-first-run.txt` (against the unchanged code, network-isolated): 5 failed, 3 passed. Green: `m7-green-run.txt`, 8 of 8, exit 0. Mutants through `m7-sweep.sh` in isolated exports (`mutate-run.sh`, `unshare -rn`), summary `m7-sweep-summary-a4b4434.txt`.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `ADMIN_PERMS` | `common.admin-permissions.test.ts` | Yes | Yes | New file, first row; the run failed on assertions, not imports: `expected '0' to be '32'`, and `expected [ '0' ] to deeply equal [ '32' ]` for the published command. Mutants `m7a-and-of-two-bits` (the old value), `m7a-administrator-only` (`"8"`), `m7a-or-of-two-bits` (`"40"`): 2 of 2 cells red each | Yes |
| `DiscordEmbed.setTimestamp` | `DiscordEmbed.set-timestamp.test.ts` | Yes | Yes | New file, first row; assertion level: `expected undefined to be '2024-05-06T07:08:09.000Z'` and `… '2025-01-02T03:04:05.000Z'`. Mutants `m7b-timestamp-compares` (2 red), `m7b-timestamp-ignores-argument` (2 red). The third cell (no timestamp before one is set) is a control and passes at the base | Yes |
| `isUserCommand` through `getLocalizedStrings` | `common.localized-strings.test.ts` | Yes | Yes | New file, first row; assertion level: `expected { 'en-US': undefined, de: undefined } to deeply equal { 'en-US': 'user name', … }`. The slash and message cells are controls and pass at the base. Mutants `m7c-user-test-for-slash` (1 red), `m7c-user-test-for-message` (2 red) | Yes |

Each guard here has one conjunct. The boundary pairs are the three command kinds (inside: user; outside: slash and message) and the two timestamp sources (given; default).

## Class Sweep

Not a fix round: no reviewer finding drives this delivery. The three defects are the plan's own findings, so each class is enumerated once for the record (`verification/015/m5hi-m6fix-m7-m8-enumerations-a1456c9.txt`, taken at `a1456c9`; the `bot/` lines it lists did not change afterwards).

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| F-30 (a command-type test that names the wrong kind) | `git grep -n "commandType ===" a1456c9 -- bot src` | 2: `common.ts:14` (`'slash'`, in `isSlashCommand`), `common.ts:20` (`'user'`, in `isUserCommand`) | Both correct now. The message branch has no test: it is the fall-through. Residual 0 wrong |
| F-29 (a comparison used as a statement) | `git grep -nE '^\s*(this\|[a-z_]+)(\.[#A-Za-z_]+)+ === ' a1456c9 -- bot src` outside tests | 4: `src/env.mjs:11`, `:125`, `src/pages/api/trpc/[trpc].ts:12`, `src/utils/redis/index.ts:375` | All four are the second line of a multi-line condition, not a statement. Not applicable. The predicate cannot see a comparison whose left side is not a dotted name |
| F-28 (a permission value built with a bitwise AND of two distinct flags) | `git grep -n "PermissionFlagsBits" a1456c9 -- bot src` | `common.ts` only (the one use) | Fixed. Residual 0 |

## Test Execution Results

| Command | Results | Notes |
|---|---|---|
| `verification/015/impl-suite-run.sh 476c633 <scratch> m7-m5hi-final` (isolated export, `unshare -rn`) | vitest 1118 tests, 1118 passed, 0 failed, 114 files (reporter `testResults` entries), **exit 0**; `pnpm run typecheck` (both programs) **exit 0**, 0 `error TS`; stderr 0 lines | Counts by `numTotalTests`; `m7-m5hi-final-run-476c633.txt`, `m7-m5hi-final-testresults-476c633.json`. One gate run covers every delivery at this SHA. An earlier run at `a1456c9` exited 1 with 1 failed case (the `/preview` positive control read the message text before the editor had rendered it); the cell now waits for the text (`476c633`), and the run above is the repeat
| `npx vitest run bot/` | 3 files, 8 tests, 8 passed, exit 0 | `m7-green-run.txt` |
| Mutation sweep, `m7-sweep.sh a4b4434` | 3 controls green; 7 mutants, 7 killed | `m7-sweep-summary-a4b4434.txt`. The driver's first version was truncated by a copy error and produced an empty summary; it was fixed and re-run, and the summary shown is the re-run |
| `npx eslint` over `bot/scripts/app_commands`, `bot/utils/DiscordEmbed.ts` and the three tests | 0 error, 0 warning on the files this change touches | `DiscordMessage.ts` has two pre-existing long-line warnings and is untouched |

**Gate satisfaction, disclosed.** `eslint --fix` ran on the three new test files only (brace style). Two pre-existing over-long signatures in `common.ts` were wrapped, because the convention check counts a warning in a touched file as a failure. No source comment was added.

## Outstanding Items

1. **Owner step:** `pnpm run push-commands` after release (M7-a), then the B-6 Discord check by a member holding Manage Server and not Administrator.
2. **Downstream premise.** This changes who can see the *Get Message* command once pushed: moderators holding Manage Server, not only administrators. Chain 015's other milestones do not read it.
3. **Not human-observed.** The Discord context menu is not reachable from here.
4. **Self-diagnosis (method).** My M7 mutant driver was built by copying the first 18 lines of another driver and appending; the cut fell inside a function, so the script failed to parse and wrote an empty summary. I read the empty summary as "still running". The check I should apply sooner: run `bash -n` on a generated driver, and read a summary's line count before waiting on it.

## Next Steps

Code review, with the M5-h/M5-i, M6 fix round, M4-d cells and M8 deliveries (all handed at website `476c633` and preview-image-generator `6c613a5`). Then QA Phase 2; UAT's B-6 after the owner's push-commands.
