# Brief — researcher-hooks-text-limit, second question

Duties negated: none.

From `steering-queue-hooks`, 2026-11-11. A new question for the same session, to start once your
description-limit document is closed. It gets its own research document.

## The question

Which Components V2 configurations does Discord refuse on send, emptiness first, and which of the
refused ones does the website's send check let through?

The owner's words of 2026-08-26, from the handoff below:

> "checking which component v2 configurations are valid (namely, emptiness), for instance, a V2
> message with only an empty Text Display errors on send, and the UI doesn't catch this like empty
> content / embeds."

## Why now

His selection of 2026-11-11: `agent-output/steering/queue-hooks-rulings.md`, block "selection 12".
The option he chose, in full:

> "Agent: measure it now (Recommended)" — "Agent: I have the researcher session measure which V2
> configurations Discord refuses, emptiness first, by sends in the agents' test server only, and
> write it up. The 1024 fix you just chose proceeds separately. Any fix to the send check from the
> results comes back to you as its own question."

## What to read

- `agent-output/handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md`, whole:
  its "What is established and what is not" list is the open ground, its "Where a reader should
  start" names the authorities, and its reconcile note of 2026-11-11 says why its live-send
  constraint no longer binds inside the test server.
- Your own document's N-4 (an empty-string description) belongs to this question.
- `agent-output/architecture/website.md` and `agent-output/architecture/system-architecture.md`.

## Fence

- Sends in the test server (guild `1566742402180456559`) only, under the same skill rules as before.
- Read-only on `website`, `project-utils` and `preview-image-generator`. No fix, no plan.
- The component types in scope are the ones the website's editor can produce. Empty, whitespace-only
  and structurally absent are three different things: keep them apart, as the handoff says.
- No count of stored production records: no agent reads that database.

## Delivery

No stage consumes the document. Owner-needing items, blocks, and one line when the document is
committed come to `steering-queue-hooks` by SendMessage.

## Not checked by this brief

- Which component types the editor can produce, and what the send check does with each shape.
- Plan 012's M2, D5, D8, D14 and QA row R20: cited by the handoff, not read by this thread.
