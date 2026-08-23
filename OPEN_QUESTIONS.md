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


## 2026-08-23 — steering-hooks-012 — chain 012 release: everything that needs the owner

These were carried in this thread's docket and relayed in conversation, which is the wrong home for
them — the docket is where a steering thread left off, not a queue the owner works. Written here so
they are actionable without a conversation and survive this session.

**Everything below is blocked behind item 1.** Nothing else in chain 012 can move until it lands.

### 1. ACTIONABLE NOW — the production DDL

```sql
ALTER TABLE "Messages" ADD COLUMN valid BOOLEAN;
```

- Table is **`Messages`**, plural — the Prisma model is singular `Message` with `@@map("Messages")`
  at `schema.prisma:119`. Verified, not assumed.
- Column is **nullable**, matching `valid Boolean?` in the schema at the already-pushed
  `project-utils` commit `749606d` (checked at that SHA, not in the working tree).
- **Additive and safe to run now.** Existing rows get `NULL`; the currently deployed site does not
  know the column exists, so nothing changes until the `website` push.
- **There is no migration tooling to run instead** — QA verified across `project-utils`' full git
  history that no migration mechanism exists. This is a manual statement in the owner's own session,
  which is why no agent could ever have done it.
- Recorded as plan milestone M1's attestation; no register row carries the DDL, which is why devops
  refused to infer its state and held the release.

### 2. The release act itself — a separate decision, not implied by item 1

Confirming the DDL landed does **not** approve the release. The release is a fast-forward of
`website` `master` `72dc7de` → `c85945f`, and per the owner's own statement (2026-08-23) **a push to
`master` auto-deploys**, so merge and deploy are the same instant. Assembled and held at devops
readiness `9c6de10` / `2838a04`; `origin/master` verified still `72dc7ded`.

**All verdicts expire if any production code lands on the chain branch during the hold** — code
review `06b204d`, QA `cc3763a`, UAT `522096c` and the readiness assessment would need re-running
rather than reusing.

### 3. Sequenced behind the deploy — owner-executed, in this order

The order is load-bearing: **backfill → M6-a/M6-b/M6-c → QA-R2 → QA-R4 → QA-R15 → live declaration
to statbot**. QA-R15 is a *persisting* act and destroys the other rows' preconditions if run first.

- **The backfill run.** Exact invocation is in the implementation and readiness documents; the script
  guards refuse to run without an explicit confirmation of the target host, by design (owner ruling
  D17, *"Guard it before the pin refresh"*). This thread will surface the executable line once the
  deploy has happened and it is actually runnable — it is not runnable before then.
- **The M6-b distribution review.** **A clean M6-b report does not speak to plan Risk R7** — per-embed
  misvouching is counted nowhere, because the distribution is computed by the very predicate that
  omits those checks, so its members sit in the `true` column. UAT recorded R7 unverified rather than
  covered (finding U-1). Do not read a clean distribution as evidence against it.
- **QA-R9 and QA-R20** — owner gates whose earliest-decidable moment is *after* the backfill.
- **The repair guidance (QA-R19).** Devops has **drafted** three shapes (B5/5712 text-no-components →
  JSON editor Load, lossless; B4 components-no-content → mode toggle, lossless; B3 both → no lossless
  path, guidance names which side is lost). Full text in the readiness document. **The owner sends
  it.** No agent on this machine may post or deliver a message to any person or channel — a standing
  prohibition with no approval path.

### 4. Not blocking, but only the owner can settle it

**The devops session cannot verify its own pushes.** Its read-only `ls-remote` after the
`project-utils` push was blocked by its session's classifier. It reported rather than retried, and
refused to route the check through this thread — both correct. Its record stands **NOT VERIFIED**,
and an independent check by this thread does not discharge its gate. A session that can push but
cannot confirm what it pushed will keep producing records marked NOT VERIFIED.
