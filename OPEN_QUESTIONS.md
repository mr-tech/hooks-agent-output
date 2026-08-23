# Open Questions — Agent Output

What only the owner can decide. Any session may append; **only the owner answers.** An answered
question is deleted, not marked answered — the memory is the change it caused. Write a memory
record only for a standing ruling, chiefly one that forbids something, since a prohibition is the
one outcome that leaves no artifact to point at.

## 2026-08-23 — steering-hooks-012 — three conventions only the owner can state

These were carried in this thread's docket, which is the wrong home: they are not in-flight work,
they are decisions awaiting the owner. Moved here so they survive a generation turnover.

**1. `tools/build-index.js --check` can never pass on the committed form.** Verified by generating
both modes and diffing: they differ on exactly one line — the scope header — so `--check` (default
mode) exits 1 against a `--tracked`-committed `INDEX.md` even with a clean tree and byte-identical
entries. Anyone using `--check` as a gate gets a permanent red, which trains readers to ignore it.
Three dispositions: make `--check` compare against `--tracked`; make it take a mode flag; or state
that `--check` is a working-tree instrument only and is not a gate. Not fixed — `tools/` is source,
and changing a checker's semantics is the owner's call, not a session's.

**2. The `deployment/` date-naming divergence is reported, not failed** by `check-repo.js`. Making
it fail needs a convention that does not exist: a per-directory statement of which stages must carry
an `ID`. Offered 2026-08-23 and not taken up; recorded rather than invented.

**3. The cross-repo citation convention is undecided.** `handoff/message-valid-field-for-statbot-2026-08-23.md`
(`4fe6725`) backticks two paths that live in another repo, so the ported `check-repo.js` resolves
them against this repo and reports them dangling. Either a cross-repo citation carries a relative
path, or a repo named in prose exempts the path — neither repo's README states which. Note this is a
*different* case from a **forward** reference to a file that does not exist yet: that one already has
a sanctioned disposition, the `check-repo:ignore` marker with its reason stated on the citing line,
and rewording around it costs the path, which in an instruments table is the content.
