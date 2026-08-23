# Chain 012 — carry-forward into the post-refresh code review pass

**Not a verdict.** This is the code-reviewer's own working note, written so that the items below
survive two failure modes that have both already occurred on this chain: a cross-session message
dropped at the recipient's inbox (twice), and this session's context being compacted (twice).
The round-5 verdict survived its drop because it had been committed before it was sent; the
dispositions in the same exchange existed nowhere but the relay and did not survive. Everything
here is therefore written down before it is cited, for the same reason an instrument is.

Written 2026-08-23, with `website` at `f983508` (unmoved; the pin refresh has not landed).

## 1. What D18 does and does not change

Owner ruling D18 — *"Drop it. No more scope expansion. The plan ships as is. Everything else gets
folded into handoffs."* — changes **disposition**, not gates. Confirmed by steering, 2026-08-23.

- New findings become handoff material rather than new plan rows or criteria.
- **A CRITICAL or HIGH defect in what shipped still holds the tree.** That is not scope expansion:
  expansion adds surface; a defect in the contents is what the gate exists for.
- D18 forecloses new rows and new criteria. It does **not** foreclose the records the existing rows
  already owe — a future member of an existing Risks row's class is that row's falsifier firing, and
  recording it is the row's own contract. (The planner reached the same boundary independently from
  the other side and corrected its own draft before commit.)

## 2. Corroboration is not substitution

The implementer has been briefed to run the round-5 completeness check and report its result either
way. That run is **input**, not a discharge. An assumption this stage registered is discharged by
this stage re-deriving it. If the two runs disagree, **the disagreement is itself the finding**.

## 3. Assumptions booked for the post-refresh pass (both mine)

| # | Assumption | Falsity signature | Owner |
|---|---|---|---|
| Round 4 | `pg` dials the host its `Client` constructor reports. | A dial whose observed destination differs from the constructor's reported host. Dischargeable with a confirmation-gated dial against a **non-production** host. | code-reviewer |
| Round 5 | The CR-M6 completeness result survives whatever `pg-connection-string` the refresh installs. Baseline **2.6.1**, recorded in `../verification/012/probe-cr5-override-guard/measured-connector-version.txt`. | An installed version differing from 2.6.1, **or** a non-zero "redirects the guard does not see" from re-running `probe-cr5-override-guard/param-class.js`. | code-reviewer |

Round 3's assumption is **devops'**, at the pin-refresh commit. Not mine to close.

## 4. A claim of mine that was wrong, recorded so it is not re-asserted

I told steering that my rev-21 registration write "had already been committed — no routing was
needed; it had landed before you asked." **That was wrong.** Steering observed, immediately before
routing, ` M planning/012-message-valid-field.md` at 11 insertions / 2 deletions, with the diff body
carrying `-| Revision | 20 |` / `+| Revision | 21 |`. `d8cf9ff` is that same content — `git show
--stat` reports **11 insertions, 2 deletions** on that path — and its message names it
reviewer-authored, planner-committed. So the write was uncommitted at the moment steering routed it,
and the routing was doing work.

The error's shape: I never committed it myself (correctly — the plan is another stage's document),
so "it had landed" was an **inference from my own non-action**, not an observation. Steering's
direct `git status` beat my inference, as it should.

### 4b. The same class again, one message later — and why it was uncheckable

Reporting state to steering I described `d84dbf7` as "an `INDEX.md` registration line **by another
stage**." I had read that commit's subject and stat. I had not read its author, and I asserted
provenance anyway. Steering — who made it — reports it as theirs. Accepted.

That is the identical error to §4, made **one message after** I wrote §4 up as a lesson. Claiming
the lesson is not the same as holding it, and the interval was a single message.

**What makes this one structural rather than merely careless.** Checking afterwards, provenance was
not available to me at all:

- Every commit in `agent-output` has the same author — `git log --format='%an' | sort -u` returns
  exactly one name, `lando`. Authorship metadata cannot distinguish stages here.
- Provenance therefore rests entirely on the `Claude-Session:` trailer. Of `d84dbf7`, `e561967`,
  `d8cf9ff` and `747ddcb`, three carry one; **`d84dbf7` has no body at all** — and it is precisely
  the commit whose provenance was gotten wrong.

So the correct move was not "read the author" — that would have told me nothing. It was to say
**"an `INDEX.md` regeneration; I cannot tell which session made it."** The available honest answer
was weaker than the one I gave, which is the whole failure: an unattributable commit got attributed
because a confident sentence was easier to write than an admission of a gap.

**Rule taken from it:** in this repo a commit is attributable to a stage only where it carries a
session trailer. Absent one, provenance is reported as unknown, or sourced to whoever reports it
first-hand — never inferred from a subject line.

## 5. The SHA hazard: mechanism measured, and both prior models were wrong

Steering reframed this as a workspace hazard rather than a discipline failure, on the model that
**the shell resets to `/usr/local/bin/hooks` between commands** and that path is not a git
repository — so a bare `git` fails outright. I very nearly adopted that. **Measured, it is wrong**,
and my own earlier model was closer but stated for the wrong reason. What actually happens:

- `cd /usr/local/bin/hooks/website` in one call, then a **bare** `pwd` and `git rev-parse HEAD` in
  the *next* call, returns `/usr/local/bin/hooks/website` and `f983508`. **Working directory
  persists across calls**, exactly as the tool contract says.
- The reset I saw — the harness printing `Shell cwd was reset to /usr/local/bin/hooks` — fired only
  when I `cd`-ed to **`/tmp`**. That is a sandbox guard bouncing cwd back to the workspace root when
  it lands **outside** the workspace, not a general per-command reset.
- `/usr/local/bin/hooks` is genuinely not a git repository. That part of steering's report is right;
  it is just not the state a command normally starts in.

**Why the wrong model is dangerous rather than merely inaccurate.** Under it, a bare `git` in a
fresh call fails loudly and is therefore safe. Measured, it does not fail — it silently reports
whichever repository the shell last landed in, which is precisely the wrong-SHA-under-the-wrong-label
failure. The reassuring half of the model covers the actual hazard.

So the hazard is **both** cross-call and intra-command, and is silent in both directions.

**Control: `git -C <repo>` on every invocation**, never `cd <repo> && …` and never a bare `git`.
`-C` binds the repository to each *invocation*, so it is immune to inherited cwd (cross-call) and to
a `cd` earlier in the same compound command (intra-command); per-command `cd` fixes only the second.
"I caught it seven times" was never a control.

Note the shape of this correction: steering's remedy was right and its mechanism was wrong, and I
was about to accept the mechanism because the remedy worked and the reframing was generous. A
control adopted for a wrong reason survives only until someone reasons from it.

Standing request to steering, reciprocated: **if a SHA looks wrong for its label, challenge it
rather than assume it was checked.**
