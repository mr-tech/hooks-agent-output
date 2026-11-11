# TODO — Agent Output

What is not started. Any session may append. **Resolution is deletion, not a tick** — the memory is
the change it caused: the edit, the commit, the file that now exists.

This file holds work an agent could do. Decisions only the owner can take go in `OPEN_QUESTIONS.md`.

---

## Put the competitor-research feature selection to the owner — last

Lodged 2026-11-11 by `steering-queue-hooks`. `research/competitive-feature-landscape-2026-11-08.md`
still waits on his pick of S1 to S33 (and R0). His words when asked on 2026-11-11: "move this to the
end of questions and after any other work in this project is completed. in other words, this new
stuff is planned after the existing items are handled" (`steering/queue-hooks-rulings.md`, selections
1 to 4, prompt 2). Do not put it to him while other work in this project is open; when none is, ask
which items to plan, or none and the research closes.

## Website fix: bound V2 description fields at 1024 characters

Lodged 2026-11-11 by `steering-queue-hooks` on the owner's selection ("Agent: scope a fix"). Scoping
determination, scope and evidence: `steering/queue-hooks-rulings.md`, block "selection 11"; the
measurement is F-6 of `research/components-v2-description-text-limit-2026-11-11.md`. A `fixer` chain,
to start when the website tree is free of `fix/website-save-gate-embeds`.

## `check-repo.js` CHECK 4 has no stage suffix for two artifact kinds stages actually produce

Demoted here from `INBOX.md` 2026-08-25 by steering-hooks-013-3, its author's ask having been
*"nothing blocking"*. **Verified at the tree by that author before filing**, not relayed.

`STAGE_SUFFIXES` (`tools/check-repo.js:545`) maps `deployment/` to the single suffix `deployment`, and
the match at line 577 accepts only `rest === s`, `rest.endsWith('-'+s)` or `rest.includes('-'+s+'-')`.
So under `deployment/` the only legal basename tail is `-deployment`. Three SCOPE failures follow, two
readiness documents and one carry-forward code-review pass.

**It is a model gap, not a naming error.** A readiness assessment is produced *before* the release act
and can return NO-GO; the record is produced *by* it. Naming a readiness document `-deployment` would
make the checker pass by making the corpus wrong, and `STAGE_ORDER` would then order two unlike
documents as the same stage. **Both devops sessions independently declined to coin a name to satisfy
the validator, and each disclosed the failure in its own document.** That call was right and is not
being revisited.

**Not fixed, and here is what fixing it needs.** The obvious candidates are `-readiness` under
`deployment/` and something for a carry-forward pass under `code-review/`. **Adding a suffix silently
blesses whatever name is chosen for every future document**, so it is a convention decision, not a
patch. `tools/` is source: **the change needs the owner's approval, and the convention should be
settled before it is asked for.**

## `verification/` needs a convention: a probe directory must not hold an editable second copy of a file the tree executes

Proposed by `qa-hooks-013-3` 2026-08-25 **with its reason and deliberately not enacted** — it judged enacting
it mid-chain to be displacement while the observation count stands at zero, and I agree. Recorded here so
the proposal survives the session that made it.

**The incident it generalises.** QA's independent oracle was adopted into `website/src/utils/__tests__/`
and a copy remained under `verification/013/probe-qa-verify-rider2/`. Two review findings were then
corrected **in the copy only**. Three stages — QA, `uat`, and this thread — reported or relied on a fix
that had not shipped; `code-reviewer-013-4` caught it by measuring the tree (`grep -c "D13"`: shipped
**0**, probe **5**; 186 lines against 215). **No behaviour was affected** — all sixteen `id`/`expected`
pairs were byte-identical — so the whole cost was to the record.

**Why every existing safeguard missed it**, which is the part worth keeping: **every instrument in that
directory hashes or compares the copy against itself.** None asserts anything about the shipped file, so
all of them are tuned to detect a copy falling **behind**. `uat`'s formulation: *"a copy that lags looks
wrong on inspection; a copy that leads looks like progress."* The reviewer placed it as `probe-cr1` /
`probe-cr10`'s fossil defect **running in reverse**.

**QA's three proposals, in its own order of preference:**

1. **A probe directory must not hold an editable second copy of a file the tree executes.** Its sentence:
   *"the moment my oracle was adopted into `src/utils/__tests__/`, my copy stopped being an instrument and
   became a rival."*
2. **Where a copy must exist, its manifest hashes the SHIPPED file**, so it fails on divergence in
   **either** direction.
3. **Cheapest and best: keep a pointer and a SHA, not a copy. A pointer cannot run ahead.**

**Not decided.** `verification/`'s scope was ruled by QA at P3.16 — the directory is the chain's, and each
stage indexes its own instruments — so a convention over it is the agent-output domain's to set, and it
binds every future chain's probes. It should be settled deliberately rather than as a fix round.


## Seven of the owner's eight 013 checks were never traced back to a milestone criterion

Raised by `qa-hooks-013-4` as its §V.38 Assumption Not Checked, 2026-08-25, and routed to steering as the
party that lifts operator text into `OWNER-QUEUE.md`. **Owned by the planner** — a check that must bind
enters by plan revision, not by queue text alone.

**The gap.** `Criteria-At` names one artifact; the owner executed **eight** checks. QA's Blocking Release
Condition register is the mapping from those checks back to milestone criteria. **QA traced item 8 by
hand** (BC-4 → M3-c, `Milestones` byte-identical rev 49→50). **Items 1–7 it did not trace.**

**QA's stated falsity signature:** the owner executes an item, it fails, and no plan criterion and no QA
assertion corresponds to what he ran — *"the failure has nowhere to land and gets settled by argument over
whether it was really a criterion."*

**Why this is parked rather than commissioned.** Two reasons, and the second is the load-bearing one:

1. **All seven passed.** The signature QA names requires a failure, so for these seven it can no longer
   fire. What remains is record integrity — the chain would claim criteria were validated by checks whose
   binding to them was never established — which is a retrospective concern, not a release blocker.
2. **Commissioning a planner pass would expire both freshly re-issued verdicts.** QA re-anchored to plan
   rev 50 at `4600880` and `uat` at rev 45; a plan write moves the criteria axis and expires them again.
   **Steering did exactly this tonight by accident** — a D53 registration pass one minute after a gate was
   issued — and the cost was a full re-issue round on both stages. Doing it deliberately, to bind checks
   that have already passed, would be a worse version of the same mistake.

**The analysis does not require a plan write; only binding the result does.** The seven traces can be
derived against the existing register at any time and registered later, so this does not have to wait for
a quiet moment in the plan.

**Do it before the next chain's click-through, not after.** QA's point stands in general even though it is
mooted for these seven: tracing is cheap in advance and unsettleable in arrears.

## This repo has no roadmap and no release tracker, across twelve chains

Established by the roadmap pass 2026-08-25 by direct listing: `agent-output/roadmap/` holds **only
`.gitkeep`**. No Master Product Objective, no epics, no release tracker — and none under another name
(`INDEX.md` is generated from front-matter and carries no version, commit or release identifier).

`README.md:107` describes `roadmap/` as holding the Master Product Objective, priority-ordered epics and
the release tracker. **That expectation has never been populated.** Plan 013's own header records the
effort as owner-directed through a handoff rather than through an epic.

**The consequence that reaches beyond the directory**: devops' §16.9 next-actions name *"the roadmap
subagent — the release tracker needs updating"*, so a downstream stage now routes work to an artifact
that does not exist. That will recur every chain until it is settled.

**Three ways out, as the roadmap stage ranked them:**

1. **Rule that this repo does not keep a roadmap**, and stop devops' next-actions naming the stage.
   Cheapest and consistent with twelve chains of practice. **The roadmap stage's own recommendation.**
2. **A tracker-only `roadmap/release-tracker.md`** — no Master Product Objective, no epics, recording 013 <!-- check-repo:ignore — names a path that is absent on purpose: an option's proposed file, never created (project cleanup 2026-11-10) -->
   forward with earlier chains left blank rather than backfilled. A new landmark document with a
   permanent maintenance cost.
3. **A full `product-roadmap.md`** — **blocked outright**: its Strategic Vision and Master Product
   Objective are owner-only fields, so no agent can author the one field the document exists to protect.

**Owner-only.** The roadmap pass could not establish whether a roadmap has been deliberately withheld
here or simply never started — nothing in the repo distinguishes those, and it correctly declined to
create one either way.

## `check-repo.js --status`'s FAILING/BLOCKING flag is 0-for-5 — every flag on this repo is a false positive

Measured 2026-08-25 by `steering-hooks-012-2`, prompted by `uat-hooks-012-2`'s U-12. Command:
`node tools/check-repo.js --status`. The flag renders only in `--status`; the default run never
shows it, which is why it goes unnoticed.

**Five flags, none indicating anything actionable.** Precision owed to `uat-hooks-012-2`, which
corrected an earlier overreaching form of this line: **four of the five sit on chains that are
closed; chain 012 is an OPEN chain with seven open documents**, and it is the flagged *document*
that carries `Status: Released`. The conclusion is unchanged — every flagged document is at a
released or terminal state — but "all on closed chains" would be false.

| Flagged | Why it fires | Real state |
|---|---|---|
| chain 012 `planning` | `REJECTED`, narrating review rounds 1 and 2 | Released, UAT-approved unconditional |
| chain 013 `qa` / `uat` / `deployment` | historical verdict text | chain CLOSED and released |
| chain 5 `qa` | `Status: QA Failed` | fully closed chain; superseded by a second `qa` doc |

**Three independent causes, all in `tools/check-repo.js`:**

1. **No notion of negation.** `FAILING` (line 663) is a bare alternation including `NOT[ _-]EXECUTED`,
   tested against `status + " " + detail`. UAT's `Status-Detail` said **"16 EXECUTED, 4 SUPERSEDED,
   0 NOT EXECUTED"** — *the clause announcing that nothing is blocked rendered the chain as
   `⚠ FAILING/BLOCKING`.* UAT fixed its own field in the round it was found (`4bd552e`); the matcher
   is unfixed and the next such field will do it again.
2. **No notion of tense.** `Status-Detail` legitimately narrates closed review rounds, so a chain
   that was rejected at round 1 and approved at round 6 reads as failing forever.
3. **Inconsistent closed-handling.** Line 702 pushes the flag regardless of `d.closed`; line 720
   filters `!d.closed`. Same predicate, two behaviours in one function.

**Why it is worth closing.** A gate that is wrong every time it fires trains readers to ignore it,
and this repo already has one recorded instance of that disease — `OPEN_QUESTIONS.md` item 1, where
`build-index.js --check` can never pass on the committed form. Two red-by-default instruments is a
pattern, not a coincidence. The failure mode is not noise: it is that a *real* blocked chain would
be indistinguishable from the four standing false positives.

**Requires the owner's approval before landing** — `tools/check-repo.js` is source code off a chain
branch, so it falls under the standing gate rather than the agent-output-document exception.

**Explicitly NOT the fix**: rewording chain 012's planning `Status-Detail` to avoid the word
`REJECTED`. That record is accurate; editing an accurate record to satisfy a naive matcher is
corrupting the record to please the instrument. If the owner nevertheless wants the field reworded,
it is the planner's body text and needs a planner pass, not a steering registration.

## The record tools' tests have no stated naming convention

`tools/recordEntrypoints.test.js` and `tools/uatLocalStack.test.js` are `node --test` files; the
Test Conventions in `CLAUDE.md` are scoped to `website`. Under that scope one new title ("… documents
of chains before 012 …") would match the bare-`0NN` ID-token class. Either state that the record
tools' tests fall outside the conventions, or say which rules bind them. Raised as residue by
`qa-hooks-record-engine` (`qa/closed/fix-hooks-record-shared-engine-qa.md`, Residue) and by the code
review's CR-4; lodged by `steering-cleanup-hooks`, 2026-11-10.

## website `src/middleware.ts` carries a dead matcher entry

`matcher: ['/message/(.*)', '/api/guilds/(.*)', '/preview']` — no route lives under `/api/guilds`
(the guild routes are `/api/v1/guilds/…`), and nothing else in `src` names that path (`git grep
"api/guilds" master -- src`, website `b96e364`). It guards nothing: the middleware only forwards the
pathname and query string as headers. Removing the entry is a one-line tidy for the next website
effort that touches the file; it is not a security item. Read by `steering-cleanup-hooks`,
2026-11-10, while closing the v1 guild-messages handoff.
