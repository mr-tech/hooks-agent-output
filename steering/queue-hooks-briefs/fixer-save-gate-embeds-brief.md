# Brief — fixer-fix-website-save-gate-embeds

Duties negated: none.

From `steering-queue-hooks`, 2026-11-11. You are the session `fixer-fix-website-save-gate-embeds`,
launched in `/usr/local/bin/hooks/website`. Slug: `website-save-gate-embeds`.

## Scoping determination

`/usr/local/bin/hooks/agent-output/steering/queue-hooks-rulings.md`, block "re-checks at website
`6d78b19` and the scoping determinations", paragraph "Held item 4". Route: the owner's selection of
2026-11-11 (same file, block "selections 5 to 8", prompt 7), "Agent: re-check, scope a fix
(Recommended)", put to him as: the save check and the send check disagree on near-empty embeds, so
a pasted V2 component plus an empty embed saves in a state that cannot be sent, with no choice
shown to the user.

Stage set: fixer, then code review at your `Handoff-At`; QA Phase 2 only if the fix adds 20 or more
production lines, otherwise the reviewer also runs the suite and the red test. No plan, critic,
Phase 1 or UAT. Release is a devops session's step under the owner's approval.

## Bounded scope statement

One defect, repository `website` only. A draft holding a Components V2 component plus embeds that
are present but empty must not be saved in a state the send check refuses without the user being
shown a choice.

- In: `src/utils/index.ts` (`hasClassicContent`, `resolveContentLoss`, `gateBeforePersist`),
  `src/utils/limits.tsx` (`validateContentRequirements`), their tests under `src/utils/__tests__/`,
  and the gate's three callers only where its wiring requires:
  `src/providers/MessageProvider/useApiMethods.ts`, `src/app/message/_components/NewMessageModal.tsx`,
  `SaveAsMenu.tsx`.
- Out: `src/server/**`; `project-utils`; `preview-image-generator`; the wider question of which V2
  configurations Discord rejects
  (`agent-output/handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md`); the
  unreachable choice UI in the New Message dialog
  (`agent-output/handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md`).
- Where older text and this fence disagree, this fence governs.

## Fix branch

`fix/website-save-gate-embeds`, created and checked out by this thread at website
`6d78b19269408447f2b089ba64c90db05518b6ce` over a clean tree. Your first act there is
`git -C /usr/local/bin/hooks/website branch --show-current`.

## What to read

- `agent-output/architecture/website.md`, W-1 and W-2, and `agent-output/architecture/system-architecture.md`
  (D-005). W-1: no serialiser deletes user content on its own. W-2: saving a message in a bad state
  is allowed and the server does not gate it, so the fix is on the front end.
- The original evidence: `agent-output/verification/013/probe-cr16-persist-gate/` (its
  `divergence.txt` names the embed shapes).
- `/usr/local/bin/hooks/CLAUDE.md`, Test Conventions.

## Hazard analysis (this thread's, from a helper's read of `master`, read from code and not run)

- The two predicates differ on `{}`, `{title:''}`, an embed holding only `_key`, and `{fields:[]}`.
- The editor's Save is the exposed path: it persists the draft unchanged when the gate does not ask.
  The New Message dialog and the JSON modal normalise or block first.
- No UI route that builds such a draft was found, and how stored messages load was not read. Whether
  a user can reach the state is open: establish it at the mechanism before choosing the change.
- Which way the two checks should agree is yours to decide inside W-1. If either direction changes
  what a user sees beyond the choice already shown for mixed drafts, that is a design decision:
  `BLOCKED:` to this thread.

## Delivery

Your consuming stage is code review: `code-reviewer-fix-website-save-gate-embeds`, a session this
thread starts when your handoff is committed. Send your handoff to it when it is live, to
`steering-queue-hooks` when no reviewer session is live. Owner-needing items, `BLOCKED:` and spawn
cues come to `steering-queue-hooks` by SendMessage.

## Not checked by this brief

- Whether the defect is reachable through the UI, or only through a stored message.
- The probe directory's contents: cited by path, read only by the helper.
- Whether any open handoff other than the two named touches these files.
