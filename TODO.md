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
