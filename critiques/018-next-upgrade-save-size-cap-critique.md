---
ID: 018
Origin: 018
UUID: 6273a762
Status: Open
Status-Detail: "Cycle 1 pass 2 on plan revision 2: REQUEST REVISION, on one open question only. F-1 to F-15 RESOLVED. F-16 LOW is new. OQ-5 (what the preview check can be) is unresolved and with steering for the owner; M5's criteria are conditional on it, so one more revision is owed when he answers. M1 to M4 carry no open finding above LOW."
Artifact-Revision: 2 — the delta c2a6b85..7a1bd46 read whole; last whole read is revision 1 at c2a6b85
Reviewed-At: "7a1bd46 — repos=agent-output; website code read at 7923a1d (origin/master)"
Verdict: REQUEST REVISION
---

# Critique — Plan 018, Next.js 16.4.6 and the save-list cap

**Artifact**: `planning/018-next-upgrade-save-size-cap.md`, revision 2 (`7a1bd46`), read as the delta from revision 1
(`c2a6b85`). **Read at pass 2**: the planner's two new captures, `verification/018/planning/abort-form-probe/` (row file and
listing) and `verification/018/planning/preview-imitation/README.md`. **Analysis**: none commissioned. **Read at pass 1**:
the briefs, `steering/018-rulings.md`, the scoping and answer blocks of `steering/website-deps-review-rulings.md`, the
03:25Z ledger block, the security audit, both scoping sweeps, `architecture/website.md` W-2, A-1 and A-4, the planner's
probes, chain 017's preview record, website source at `7923a1d`, and at the seam the architect's and QA's findings.
**Roadmap**: `roadmap/` is empty, so alignment is judged against the rulings and the architecture record.
**Date**: 2026-11-20.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-20T03:55 | steering-roadmap-hooks (brief `steering/018-brief-critic.md`) | cycle 1 pass 1: plan revision 1, whole-document read | First pass of the cycle, so the whole plan was read at `c2a6b85`. New findings: F-1 to F-15 (3 HIGH, 7 MEDIUM, 5 LOW), all OPEN. Verdict REQUEST REVISION. F-1 carried a question for the owner on D-3, sent to steering. At the seam, after `da790b7`, the architect's and QA's documents were read: F-2, F-8 and F-11 marked as duplicates of QAF-1, QAF-2 and QAF-3, and F-3 narrowed. |
| 2026-11-20T04:08 | planner-hooks-018 (message naming revision 2 at `7a1bd46`) | cycle 1 pass 2: plan revision 2, delta-bounded | Depth: delta-bounded. The delta `c2a6b85..7a1bd46` (301 added, 227 removed, `git diff --numstat`, one commit) adds and removes no milestone and was read whole. Artifact changes: OQ-5 opened with two runs; OQ-3 re-closed on the abort form; M1's class is 21 pairs with its consumers named; M1-f, M1-g and M1-h restated; M2-a and M2-c given base readings; M3's value, ledger and cause class; M4's class from a search (R4 dropped, R6 and R7 added); M5 conditional on OQ-5; X-18 to X-20; RK-6 and RK-7. Findings addressed: F-1 to F-15, all RESOLVED. New: F-16 LOW. Verdict REQUEST REVISION, on OQ-5 alone. A code read of mine in F-1 was wrong and is recorded under Process record. |

## Verdict

**REQUEST REVISION — cycle 1, pass 2.** The only thing that holds approval is OQ-5.

Pricing: sized to the ask for M1, M2, M4 and M5. M3 remains one milestone more than the ask, admitted by D-6; its value
is now stated, with its cost beside it. No rider.

Revision 2 resolves all fifteen findings of pass 1. The two premises that mattered most are now runs, not inference: the
abort form refuses with one issue across 288 rows of the site's own schema, with no throw, and a build imitating the
Preview environment fails without the override and serves everything except the sign-in routes with it.

What remains is OQ-5, which is his. M5's criteria are written "under the recommended option", so the plan cannot be
approved for M5 until his answer is folded. That fold is the revision this verdict asks for; nothing else is asked of the
planner now. F-16 is LOW and rides the same revision.

No milestone is marked `PREMISE-STALE`. `Target-Release` is untouched and equals the scoping block's end step. The stop
authority did not fire: no new member of the pass 1 class appeared in the delta (RK-6's record for pass 2: none). The hard
stop did not fire (pass 2 of 15).

Routed to the owner, through steering: whether M1 to M4 may start before OQ-5 is answered (see Unresolved Open Questions).

## Value Statement Assessment

Revision 2 adds a clause for M3 and a line on what M1 leaves. Both are accurate against the plan's own text. The statement
stays a user story, checkable, delivered directly by M1 and M2. The M3 clause states a developer-side value and says it
buys nothing at runtime, which is the honest form.

## Assumption Not Checked

Cycle 1 pass 2: this pass assumes the planner's abort-form test file measures the site's own `shapes.ts` and `user.ts` as
its README says, and does not test it. I counted its row file (288 rows, 0 containing "threw", `grep -c`) and did not read
the test file or re-run it. If it is false, a refused over-limit list throws or carries extra issues at implementation,
which M1-a's cases catch. Closing it is QA's at its re-key of revision 2.

Pass 1's assumption stands and is now carried in the plan's Assumptions: the helper's release-notes reading is complete.

## Unresolved Open Questions

One: **OQ-5**, what the preview check can be. It is with steering for the owner, with four options and the planner's
recommendation.

This plan has 1 unresolved open question. The selection owed on it — approve M1 to M4 for implementation with OQ-5
unresolved, or hold everything until the planner has folded his answer — is sent to steering to put beside OQ-5's own
prompt, so he is asked once. The plan is not approved over it by this pass.

## Findings

Open:

F-16 LOW cycle 1 pass 2 — OPEN — M1-g's server walk does not say how its message gets into the editor
- **Location**: plan M1-g, "Server".
- **Description**: the walk needs a stored message whose `allowed_mentions.users` holds 150 well-formed ids. After M1 the
  JSON view refuses that paste, and the editor cannot add mention ids (M1-f). So on the M1 build the message cannot be
  made through the product; it has to be saved on a `7923a1d` build first, or seeded. "Loaded before the JSON view is
  next opened" does not say which.
- **Impact**: UAT finds the set-up step missing at the walk.
- **Recommendation**: name the set-up step. Landing: the revision that folds OQ-5.

Resolved at cycle 1 pass 2, each by plan revision 2 (`7a1bd46`); the arguments are in this critique at `ac93b5a`:

- F-1 HIGH cycle 1 pass 1 RESOLVED — the preview premise is replaced by two runs and OQ-5; M5 is held on it; RK-7 registered. Plan § Assumptions OQ-5, § M5.
- F-2 HIGH cycle 1 pass 1 RESOLVED — OQ-3 re-closed on the abort form over the real schema; M1-a lists its element kinds and requires a returned refusal. Plan OQ-3, M1-a, M1-d. Duplicates: QAF-1 in qa/018-next-upgrade-save-size-cap-qa.md
- F-3 HIGH cycle 1 pass 1 RESOLVED — M1-f states what each surface shows; the reason-less toast is X-18 (AD-4); M1-g has a browser and a server form. Plan M1-f, M1-g, X-18.
- F-4 MEDIUM cycle 1 pass 1 RESOLVED — M5-b's set comes from the route table and `redirects()`, each with its answer from the imitation run. Plan M5-b.
- F-5 MEDIUM cycle 1 pass 1 RESOLVED — M3's value is in the Value Statement with RK-5 beside it.
- F-6 MEDIUM cycle 1 pass 1 RESOLVED — M4's class names its search; R6 and R7 added, R4 dropped, other hits dispositioned. Plan § M4.
- F-7 MEDIUM cycle 1 pass 1 RESOLVED — M2-c names its environment form and has base readings for build and typecheck. Plan M2-c, V-2.
- F-8 MEDIUM cycle 1 pass 1 RESOLVED — M1 names its three browser consumers and what binds each. Plan § M1 "Consumers", M1-f. Duplicates: QAF-2 in qa/018-next-upgrade-save-size-cap-qa.md
- F-9 MEDIUM cycle 1 pass 1 RESOLVED — M1-h, M4's rows and M5-e each name a runner; R3 has an observation. Plan M1-h, § M4 table, M5-e.
- F-10 MEDIUM cycle 1 pass 1 RESOLVED — M3-c has five causes and compares the linted-file set; M3-d's class is the migration guide's list. Plan M3-c, M3-d.
- F-11 LOW cycle 1 pass 1 RESOLVED — M1-e's class crosses stored length with message open or not. Plan M1-e. Duplicates: QAF-3 in qa/018-next-upgrade-save-size-cap-qa.md
- F-12 LOW cycle 1 pass 1 RESOLVED — the override's `parserOptions` is in the ledger and the count's instrument is named. Plan § M3 "Today", M3-b.
- F-13 LOW cycle 1 pass 1 RESOLVED — M2-a's predicate is anchored, with a real member and non-member. Plan M2-a.
- F-14 LOW cycle 1 pass 1 RESOLVED — the within-bound maximum is X-19, measured by security at the tip. Plan § Value Statement, X-19.
- F-15 LOW cycle 1 pass 1 RESOLVED — the references read M4; R3 cites X-20; "Premise, run" says what the README does not establish.

## Questions

1. For the owner, through steering, beside OQ-5: may M1 to M4 start before OQ-5 is answered? The plan says M5 waits on it
   and M1 to M4 do not.

## Review-method lines with no finding (pass 2)

- **Boundary.** One commit touches the plan between the two revisions (`git log c2a6b85..7a1bd46`), and its diff was read
  whole, so no section is taken as untouched on the planner's word.
- **The abort-form count.** `grep -c .` over `rows-abort.txt`: 288 rows; `grep -c -i threw`: 0. The planner's 182
  over-limit tally was not recounted.
- **The imitation run.** Its README's table reads as OQ-5 reports it: seven pages 200, two redirects, the image 200, and
  the two auth routes 500 without the skip at request time.
- **Decisions Register.** D-3's reopening cell now names OQ-5. No decision is re-raised. AD-4 is recorded as
  agent-authored.
- **Exclusions.** X-18 to X-20 each carry a reason and a carrier. X-16 to X-20 postdate D-7 and are steering's to tell him.
- **The class of pass 1.** RK-6 is registered with its domain and falsifier. Record for pass 2: no new member in the delta.

## Process record

- **A code read of mine in F-1 was wrong.** Pass 1 said, as "read from code, not run", that `/message` and
  `/message/m/0/edit` would fail the environment check at request time on a preview. The planner's run shows both answer
  200; only `/api/auth/*` fails. The finding's first limb (the build) and its sign-in limb held. The check that would
  have caught it: the run I asked the planner for, which takes minutes in an isolated export.
- **Pass 1's probe.** A script in this session's scratchpad required the installed zod by absolute path. It was a replica
  and is superseded by the planner's abort-form probe over the real schema. Its output is in this critique at `ac93b5a`.
- **Session start (pass 1).** No orphan in `critiques/`. `node tools/check-repo.js` fails on one line that is not this
  document's, `steering/018-rulings.md:48`, which `INBOX.md` already carries.
