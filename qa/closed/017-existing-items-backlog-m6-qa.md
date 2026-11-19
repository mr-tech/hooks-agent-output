---
ID: 017
Origin: 017
UUID: 5c3e9a71
Verified-At: "8512a1d — repos=preview-image-generator; M6 only. The probe, QA's unchanged-lines check and QA's mutant set ran in git archive exports of 8512a1d (and of 8de2b53 for the red), each excluding .github, with one npm ci from the identical lockfile, network-isolated."
Status: Released
Status-Detail: "Released at release identifier website master 787bec5 and generator prod 8512a1d (pushed 2026-11-19T20:11Z and 20:14Z by devops Stage 2); closed. Anchor fields above keep the values the document was written at. Post-deploy rows B-6 to B-11 ride handoff/017-existing-items-backlog-post-deploy-2026-11-19.md."
Phase: 2
---

# QA Report: Plan 017 — M6 (the generator writes only a confirmed image and deletes nothing)

**Plan Reference**: `agent-output/planning/017-existing-items-backlog.md`, revision 7. Since my M5 pass, the plan has
gained only rows R-38 to R-40. No criterion moved.
**Implementation Reference**: `implementation/017-existing-items-backlog-m6-implementation.md`, `Handoff-At: 8512a1d`
(record fix round at agent-output `008468b`).
**Stage start**: code review Round 7 sub-entry, APPROVED at `Reviewed-At: 8512a1d`
(`code-review/017-existing-items-backlog-code-review.md`, agent-output `a010246`; plan R-39 `2208314`), re-derived at the
record. `code-reviewer-hooks-017`'s message was the hand-off. The generator tree is on `chain/017-existing-items-backlog`
at `8512a1d` (`rev-parse`, `branch --show-current`).
**Blocking-condition register**: `qa/017-existing-items-backlog-qa.md`. This pass appends no row. B-4, B-6, B-10 and
B-11 are inherited.
**Captures**: `verification/017/qa-m6/`.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T07:54 | code-reviewer-hooks-017 (cross-session message; review `a010246`, plan R-39 `2208314`) | QA Phase 2 for M6 at generator `8512a1d` | Phase 2, M6 only. The probe reproduces: 17 of 17 at the tip, 13 of 17 failing at the base. QA's unchanged-lines check passes on both trees, and its control fires. QA's mutant set: 20 of 21 killed, the survivor equivalent. **QA Complete**, milestone-scoped. No finding. Process fact: my first compound read was not completed. I read the record alone and read the generator tip with `rev-parse` and `branch --show-current`. I made every export with `':(exclude).github'`. |
| 2026-11-19T19:13 | devops-hooks-017 (Stage 1) | Document closed | Document closed. Status: Committed. Plan 017 is committed on chain/017-existing-items-backlog (website 7293a35, generator 8512a1d) at devops Stage 1; the release is Stage 2. |
| 2026-11-19T20:18 | devops-hooks-017 (Stage 2) | Document closed | Document closed. Status: Released. Plan 017 released: website master 787bec5 (2026-11-19T20:11:47Z) and generator prod 8512a1d (20:14:17Z); release-tip verdict agent-output c09fd41. Deployment record deployment/closed/017-existing-items-backlog-deployment.md. |

## Criteria assessed

I recorded these before running anything:
- M6-0, the rig;
- M6-a: 204 exactly when stored. Its render-path members are `goto` rejecting, `goto` resolving null or a status outside
  200 to 299, the screenshot rejecting and the put rejecting. The bad-body 500 and the key, path and method 404 are
  unchanged;
- M6-b: the generator deletes nothing;
- M6-c: the six kept lines (`Server running at`, `Server received`, `Created instance`, `POST /generate`, the drain-complete
  line, and `Generated image for message … in <N>ms`). Also the new failure line: one per render-path failure, with prefix,
  class, id and ms, and no content, nonce or key. Also its shape in `verification/015/pig-host-read.sh`;
- the request contract (Exclusion X-4);
- Phase 1's NM-18, NM-19 and NM-20, and QAF-14's liveness precondition.

**Example classes.**
- "A status outside 200 to 299" is exemplified by 404, 500, 300, 199 and null. The check is one compound predicate,
  `status < 200 || status > 299`. Each conjunct is the sole carrier of the decision in at least one case: the lower
  bound in `goto-199` and `goto-null`, the upper bound in `goto-404`, `goto-500` and `goto-300`. Both boundaries sit on
  a pair: `goto-299` (204) against `goto-300` (500), and `goto-199` (500) against the `ok` page's 200.
- "`goto` rejects" is exemplified by a reset, a hang past puppeteer's 30 s timeout, and a 204 navigation, which Chrome
  aborts. All three reach one `.catch`.

## Implementation Review (Post-Implementation)

- **TDD gate: passes.**
  - The repository has no suite. The instrument is the probe: red against `8de2b53` (13 of 17), green against `8512a1d`.
  - The four rows each answer Yes, except the "unchanged" row, which correctly states there is no red, since that
    behaviour is preserved.
  - I reproduced the red and the green below rather than citing them.
- **Production diff.** `git diff 8de2b53 8512a1d -- src/generateImage.ts src/server.ts`, +19 −29, is the plan's surfaces
  and nothing else:
  - `PreviewFailure` with its four classes;
  - `goto`, the status check, `screenshot` and the put each throw it;
  - `deleteMessagePreviewImages`, the `Promise.all` and the list and delete imports are removed;
  - one failure line in `server.ts`'s error branch, gated on `instanceof PreviewFailure`.

  No overreach. Setup failures (`newPage`, `setViewport`, the pool) carry no class line. That is the implementer's
  recorded Deviation, a reading of M6-c's list of four classes. The website still logs the 500 (M5-f `status-500`). It
  is left to the planner; it is not a finding.
- **The record change.** `verification/015/pig-host-read.sh` (blob `17059da` in this tree) is section [7] after CR-16's
  scope fix, which code review approved.

## Test Coverage Analysis

Each member, with its probe case and QA's mutants that fail it (`qa-m6/sweep-failing-cases.txt`, from each mutant's
`FAIL` lines):

| Member | Case | Failed by |
|---|---|---|
| 204 and stored: key `previews/42/<nonce>.jpeg`, `image/jpeg`, `public-read`, the "Generated image … in <N>ms" line | `ok`, `goto-299` | `generateImage.ts:37:num` (`200` → `201`, fails `ok`), `>` → `>=` (fails `goto-299`), `qa-put-key-always-dev`, NM-19 |
| A status above 299 | `goto-404`, `goto-500`, `goto-300` | `qa-upper-bound-dropped`, `||` → `&&`, NM-18a, `299` → `300` |
| A status below 200, or null | `goto-199`, `goto-null` | `qa-lower-bound-dropped`, `if (false && …)`, NM-18b |
| `goto` rejects | `goto-reset`, `goto-204` (`goto-hang` in the full run) | `qa-goto-rejection-unclassed` |
| The screenshot rejects | `screenshot` | `qa-screenshot-rejection-unclassed` |
| The put rejects: 500 with no 204 | `put` | NM-20 (QA's form, below), `qa-put-failure-swallowed`, `qa-put-labelled-screenshot` |
| M6-b, no list or delete | every case (`other=-`) | NM-19: 12 cases |
| M6-c's failure line: one per failure, its class, no nonce | the 10 failing cases, `setup-rejects` | `server.ts:39:if-false` (9), `qa-line-names-nonce` (9), `qa-line-for-every-error` (`setup-rejects`) |
| Bad body 500; wrong key, path or method 404 | the four request cases | Unchanged code outside the diff. Green on both trees. |
| M6-c's kept lines | QA's `unchanged-lines-check.mjs` (below) | its control (below) |

**NM-20.** Phase 1 named it "204 before the put resolves". The implementer's form crashed the generator, so its kill
was "no summary". QA's form is `void` for the put's `await`: it also returns 204 while the put is in flight, and for a
failing put the rejection then goes unhandled and the generator exits. Its row reads `None` because the probe died later,
when connections were refused. But its output (`sweep/NM-20-qa-204-before-put-settles.out`) records the assertion first:
`FAIL put status=204 … :: status 204, want 500; 0 failure lines, want 1`. The kill is credited on that line. The
non-crashing sibling, `qa-put-failure-swallowed` (the put's rejection swallowed), is killed on the same case by status.

**The survivor**, `generateImage.ts:36:num` (`?? 0` → `?? 1`), is **equivalent**. A null response's stand-in status is
only compared `< 200`, and 0 and 1 both satisfy it, so a null response answers 500 either way. This agrees with the
implementer and with code review.

**M6-c's kept lines: a gap in the instrument, closed by QA.**
- The probe prints the counts of `Server running at`, `Created instance`, `POST /generate` and the closing lines, but
  its `failed` total does not include them. A renamed `Created instance` gives "cases 16, failed 0"
  (`qa-m6/control-created-instance-renamed.run.out`).
- QA's `qa-m6/unchanged-lines-check.mjs` (blob `dcd2549`) fails on those counts. Its expected values are literals from
  the base run at `8de2b53`: Server running 1, Created instance 2, POST /generate 15 (14 in quick mode), Server
  received 1.
  - It passes on the tip and on the base (`tip-8512a1d.unchanged-lines.out`, `base-8de2b53.unchanged-lines.out`, exit 0).
  - Its positive control fires: the same rename gives exit 1, "Created instance count=0 want=2"
    (`control-created-instance-renamed.unchanged-lines.out`).
  - The `Generated image … in <N>ms` text is asserted by the probe itself, on `ok` and `goto-299`.
- **Limit: the drain-complete line is never observed by the probe on either tree.** After SIGINT the generator logs
  `Server received SIGINT. Closing server.` and nothing more: no `Server closed.` and no `Drain complete`. The
  `setTimeout(… process.exit(0), 10e3)` in `shutdown()` ends the process before the server close and the pool drain
  settle, on `8de2b53` as on `8512a1d` (`tip-8512a1d/probe-result.json`, `base-8de2b53/probe-result.json`, each
  `closing` holding only the `Server received` line).
  - So the probe's "closing lines: 1" is not evidence for the drain-complete member. No expected value can be taken from
    the base, and asserting 0 would pin a possible defect (axiom D).
  - M6's diff does not touch `shutdown()`. The member holds by construction for this change, and it is recorded as an
    instrument limit, not a finding.
  - The observation itself goes to `handoff/preview-image-generator-drain-under-load-unobserved-2026-11-08.md`'s owner
    through `INBOX.md`. Under the probe's keep-alive load, the drain does not complete within the 10 s exit timer.
- **Not counted.** `Server received` is checked as one line, which is all the probe's single SIGINT produces. Its
  emission on the `shutdown` message path is unexercised by the probe.

**QAF-14's liveness precondition and the class counts.**
- `m6-probe/pig-host-read-fixture.sh`, run over this pass's tip probe lines (`qa-m6/pig-host-read-fixture-tip.out`),
  counts goto-rejected 3, error-status 5, screenshot 1 and put 1. An independent `node` count of
  `^preview-image-failure id=\S+ class=(\S+) ` over the same `generatorLines` gives the same 3, 5, 1, 1.
- Its near-miss class, a stack head and a stack frame are not counted.
- `m6-probe/liveness-scope-fixture.sh` (`qa-m6/liveness-scope-fixture.out`) prints every case's wanted value, including
  "NOT READ" when no stamped ready line exists.

**Fixture limits**, as the implementer states them:
- A sub-200 status and a null `goto` are driven by `shim-screenshot.cjs`, not by Chrome. Chrome never hands puppeteer a
  status below 200, and it aborts a 204 navigation.
- The production behaviour for those two members is the code read.

## Test Execution Results

Every run was network-isolated (`unshare -rn`, loopback up) in a `git archive` export excluding `.github`. Both exports
use one `npm ci` from the lockfile, which is byte-identical at both SHAs (`cmp`), with Chrome's download skipped and
`/usr/bin/google-chrome` used. Each run ended with "left over processes: generator 0, chrome 0".

| Command | Result |
|---|---|
| `m6-probe/run.sh <export 8512a1d> qa-m6/tip-8512a1d` (full, with the 30 s hang) | 17 cases, failed 0 |
| `m6-probe/run.sh <export 8de2b53> qa-m6/base-8de2b53` | 17 cases, failed 13. The base answers 204 for 404, 500, 300, 199 and null and stores the error page. It lists and deletes on every case and writes no failure line. |
| `qa-m6/unchanged-lines-check.mjs` on tip, base and the control | exit 0, exit 0, exit 1 (above) |
| `mutant-gen.js --range 8de2b53..8512a1d` (`m6-mutants-gen.{json,out}`) | 8 mutants: `generateImage.ts` lines 36 and 37, and `server.ts` line 39 |
| QA's set, `m6-mutants-all.json` (blob `23ddd38`: the 8 generated plus 13 of QA's in `m6-mutants-qa.json`) run by `m6-probe/mutate-probe.py` (blob `b930c7d`) with `--quick` through a `general-purpose` helper; source `probe.mjs` `726d36f`, `run.sh` `730dd02` (`sweep/`, `sweep-run.{out,err,exit}`) | Control 16 cases, 0 failed. **20 of 21 KILLED**: 19 count-checked at 16 cases, and NM-20 credited on its recorded assertion (above). 1 SURVIVED, equivalent. |

**Scope of the sweep.** This is the milestone's sweep over M6's production diff, `8de2b53..8512a1d`. It covers
`src/generateImage.ts` and `src/server.ts`, which also hold the generator's side of E-3 (the put) and E-4 (the
deletion removed). It is seeded at:
- the status check's two conjuncts and two constants, one each way;
- each `.catch`'s class;
- the failure line's gate and fields;
- the put's key, and its being awaited (NM-20);
- the deletion's return (NM-19).

The effort-final sweep over the chain's whole production diff is still owed.

## Findings

None. The instrument gap on M6-c's kept lines is closed by QA's own check, written, seen red and passing on this pass.
The drain-complete line is an instrument limit outside M6's diff.

## Verdict

**QA Complete** for M6 at generator `8512a1d`, milestone-scoped.
- Every M6-a member has a case that fails under a mutant of its branch.
- M6-b holds on every case and is failed by NM-19.
- M6-c's failure line is checked per class and redaction. Its kept lines are checked by QA's check, except the
  drain-complete line, which no probe observes on either tree.
- The red and the green reproduce.

The plan's Status is unmoved. The security review of the delta follows, per the stage set. The effort-final sweep is
owed. Rows inherited and not discharged: B-4 (UAT); B-6, B-10 and B-11 (post-deploy, carrier handoff by devops at
Stage 1).

## Assumption Not Checked

This pass assumes that a `/preview` page which falls back to "Invalid message data." answers 200 in production, as code
review's Round 7 assumption states, and does not test it. The probe's stub `/preview` serves set statuses, never the
website's page.
- **If it answers 200**, the generator stores that fallback image and answers 204. A message whose data the preview page
  cannot render then shows a stored "Invalid message data." image, not its last good preview.
- **Signature.** On B-6's look, a saved message's preview reads "Invalid message data.".
- **Owner.** UAT, at B-6's predecessor walk B-4 (the local stack serves the real `/preview`), and the owner at B-6.
  Named again in the hand-off.

## Handoff

- **To the security review** (stage set): M6 is cleared at `8512a1d`.
- **To UAT**, when the chain reaches it: B-4, with this pass's assumption (the fallback page's status).
- **To the drain handoff's owner**: via `INBOX.md`, the observation that the drain never completes inside the 10 s exit
  timer under the probe.
- **Next for QA**: M7 Phase 2 when delivered, then the effort-final sweep.
