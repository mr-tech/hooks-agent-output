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


## 2026-08-23 — steering-hooks-012 — one live send would close a four-month-old assumption

**Do Thumbnail `accessory.description` and MediaGallery item `description` count toward Discord's
4000-character Components V2 displayable-text total?**

This codebase assumes **not**, and enforces the sum over Text Display `content` only (descending into
Sections and Containers). That assumption is recorded as an assumption, not a finding: plan 007
(`planning/closed/007-components-v2-displayable-text-limit.md`) states it was taken from the shape of
the user's reproduction case and closed as "can be revisited if a user report contradicts this", and
the paired analysis explicitly recommends a proof against the live API that was never run.

**Why it is worth raising now rather than leaving where 007 left it.** It has a second consumer. The
statbot side is budgeting mention substitution into Text Displays and asked hooks.gg what the limit
is; the summed-versus-per-component half of that question is settled by a captured Discord rejection
(50035 / `COMPONENT_DISPLAYABLE_TEXT_SIZE_EXCEEDED`, quoted in 007's analysis) and was relayed to
them. This half is not settled, and if descriptions **do** count, both this codebase's gate and their
budget are over-generous in the same direction — messages pass our checks and Discord rejects them,
which is a silent-drop shape rather than a visible error.

**What would settle it: one message, owner-sent.** A payload whose Text Display content is small
enough to pass alone, plus gallery or thumbnail descriptions sized so the total only breaches 4000 if
descriptions count. HTTP 200 means they do not count and the assumption becomes a finding; HTTP 400
with 50035 means they do, and both gates need the wider sum.

Recorded as owner-executed because **no agent on this machine may post to any channel** — a standing
prohibition with no approval path, not a permission a session could seek. Nobody is asking for it to
be run; it is recorded so the assumption stops being invisible.


## 2026-08-23 — steering-hooks-012 — the devops session cannot verify its own pushes

Its read-only `ls-remote` after the `project-utils` push was blocked by its own session's classifier.
It reported rather than retried, and refused to route the check through the steering thread — both
correct, and the second one is the control working. But its record stands **NOT VERIFIED**, and an
independent check by another session does not discharge its gate.

A session that can push but cannot confirm what it pushed will keep producing records marked NOT
VERIFIED. Only the owner can decide whether that is the intended posture or a permission to widen.
Nothing is being asked for; it is recorded so the gap stops being invisible.
