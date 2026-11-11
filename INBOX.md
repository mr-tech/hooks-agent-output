# Inbox — Agent Output (hooks)

What other sessions need from this domain. The steering session standing in this repo processes it
at spawn; until then an entry costs that session nothing, which is the point.

**This file deliberately has no frontmatter.** It is not a chain document.

**Write here instead of editing this repo's files.** A session with something to record for this
domain appends one entry and stops: it does not edit records, conventions or the domain's docket,
and it does not create a new file in this tree. It never edits, reorders or deletes another author's
entry. Commit the one path, by pathspec.

**Inbox or live message.** `SendMessage` wakes the receiver over its full prefix and costs it a turn;
an inbox write costs it nothing until it next spawns. Blocking or time-critical → message; everything
else → here.

**Entry format** — enough that it can be acted on without a conversation:

```
## <date> — <author session name> — <FYI | DECISION NEEDED | BLOCKING>

What it concerns. What is being asked, in full. What the author already did, and what the author
deliberately did not do.
```

The session name is the routing address — the name as `ListAgents` prints it, copied exactly.

**Resolution is deletion.** Each entry reaches exactly one terminal state — acted on, converted into
a docket or TODO item, demoted into a record, routed onward, or rejected with the reason recorded —
and is then deleted rather than marked done. The memory is the change it caused: the edit, the
commit, the file that now exists. Written and deleted within one turn is a complete lifecycle.

## Record — why this file exists

Until 2026-08-23 exactly two domains on this machine had an inbox: the Agents domain
(`~/.claude/agents`) and the statbot Agent Output domain
(`/usr/local/bin/statbot/agent-output`) — because only those two had a single owning session to
address. This repo becoming a third such domain is the owner's ruling of 2026-08-23, taken with
that consequence stated at the time: an inbox implies an owning interpreter for this repo.

**That interpreter is the hooks steering session** — the steering thread standing in
`/usr/local/bin/hooks` — by the owner's ruling of 2026-08-23. It processes this file at spawn, and
it is the session other domains address about this repo.

Entries follow, newest at the bottom.

## 2026-11-11 — code-reviewer-fix-website-save-gate-embeds — FYI

Two pre-existing website test-convention debts that the save-gate-embeds review found and that fall
outside that fix's fence (`code-review/fix-website-save-gate-embeds-code-review.md`, CR-2 and CR-3).
Asked: a carrier for each, whether a handoff, a later chore chain, or rejection with a reason.
(1) **Test placement**: 7 test files sit outside their production module's `__tests__/`:
`src/utils/__tests__/{useApiMethods.json-editor-repair,usePusher.hash-parity,messageStore.dropped-set-report,messageValidity.predicate}.test.ts`
and `src/server/api/__tests__/{cron.scheduled-selection,interactions-edge.signature-before-parse}.test.ts`
(the modules are under `src/providers/MessageProvider/`, `src/utils/redis/`, `src/server/api/utils/`
and `src/pages/api/`). The enumeration and its blind spot are in CR-2. (2) **Lint debt**: 34 eslint
findings at website `6d78b19` in `src/utils/index.ts` (2: `import/no-cycle`, `no-nested-ternary`)
and `src/utils/__tests__/utils.disposition-resolver.test.ts` (32). Capture:
`verification/fix-website-save-gate-embeds/code-review-round1/lint-base-6d78b19.txt`. Already done:
both are enumerated, and the fix's own new test file is told to move (CR-2). Deliberately not done:
no handoff document written and no file moved, because the fence bars both.
