# TODO — Agent Output

What is not started. Any session may append. **Resolution is deletion, not a tick** — the memory is
the change it caused: the edit, the commit, the file that now exists.

This file holds work an agent could do. Decisions only the owner can take go in `OPEN_QUESTIONS.md`.

---

## Per-repo architecture records do not exist

`architecture/system-architecture.md` now covers the workspace at workspace altitude, but there are
no per-repo records (`architecture/<repo>.md`) for `website`, `project-utils`,
`preview-image-generator` or `cdn`. A brief for work in a repo carrying such a record is supposed to
cite it; here there is nothing to cite.

Raised by `architect-hooks-1`, 2026-08-23. Whether every repo needs one, or only `website` and
`project-utils`, is a judgement for the architect.

## 012's re-measurement of 5712/5842 must key on the reason string, not `valid = false`

Chain 012's QA owes a re-measurement of records 5712 and 5842 after 013 ships. **The obvious form of
that measurement is wrong.**

An unqualified `valid = false` **does not discriminate**. `validateMessage` refuses a V2 message
carrying embeds or content with *"Components V2 messages cannot contain embeds or content."*, but it
also refuses a username-less message with *"This username is too short or too long."* — an unrelated
reason. A record can therefore be invalid for two independent reasons at once, and the boolean cannot
tell them apart. **Key on the reason string.**

Established by execution at `c85945f` by `qa-hooks-013-2` (F-QA13, `32737d3`), while checking an
inference `uat-hooks-013` had deliberately flagged as unexecuted rather than relied on. The
conclusion the inference reached was correct; the trap was in its reasoning, and executing it is what
surfaced the trap.

Recorded here because it is a chain-013 finding with a chain-012 consequence, 012 is wholly held
under D20 with no live session to receive it, and the 013 documents that carry it are not what a 012
resumption reads. Anything else touching `valid` — the R-5 deployment-record line, or a rewording of
assumption 7's falsifier — is bitten by the same thing.

Raised by `steering-hooks-013-2`, 2026-08-24.

## Three open handoffs, unassigned — moved here from steering's docket 2026-08-24

Unstarted work, so it belongs here rather than in a docket. Each is `Status: Open` in `handoff/` with no
owning stage. **Cite the handoff documents; the lines below are pointers, not restatements.**

- **`8818bd89` (`a3d60d5`) — v1 guild-messages endpoints have no authorization.** `middleware.ts`'s guard
  **cannot fire**: the `matcher` prefix is wrong **and** the check is `startsWith('/api/v1/*')` with a
  literal asterisk. **Each defect masks the other, so either fix alone reads correct and changes nothing** —
  whoever takes this must fix both or verify neither. Owner answered **`handoff`** when asked how to route
  it. **Cheapest thing to settle first: whether the deployed edge already blocks `/api/v1/*`** — not
  established, and it decides the severity. Related: CRITICAL-1, reconfirmed live at `66e1974` against a
  local instance, **not** established for the deployed environment.
- **`35274074` (`aa430c8`) — four unsaved-change guards are inert for unauthenticated users.** `hasChanged`
  is `status === 'authenticated' && …`. **Run item 4's falsity signature BEFORE fixing `hasChanged`**:
  fixing it closes items 1–3 and leaves item 4 broken while the document reads fully discharged.
- **`e6ac06b5` (`58d177f`) — failed preview generation shows a broken image, not a stale one.** Against the
  owner's *"Show a stale one is fine"*. **The fallback may have nothing to fall back to** — establish that
  before designing the fix.
