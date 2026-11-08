---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Open
Status-Detail: "Cycle 9 pass 1 on revision 26 (c375d2c): APPROVED after implementation approval. Two MEDIUM and one LOW, none HIGH or CRITICAL, so no REQUEST REVISION; each goes to the plan's Planner batch for the next planning pass. Open until the batch rows carrying them are read."
Artifact-Revision: 26 — read at agent-output c375d2c, the plan's tip at this read (git diff --numstat c375d2c..HEAD -- planning/015-bug-evaluation-fixes.md: empty)
Reviewed-At: c375d2c — repos=agent-output; website 476c633 (chain tip code review read for Rounds 16–18; page.tsx history and probe files read there), preview-image-generator 6c613a5 (chain tip; src/server.ts, src/getPool.ts, package-lock.json, prod.yml read there) and 471578f (base; src/server.ts read)
Verdict: APPROVED
---

# Critique — Plan 015, Bug-evaluation fixes — cycle 9

**Artifact**: `planning/015-bug-evaluation-fixes.md`, revision 26 (`c375d2c`). **Analysis**: none commissioned. **Prior cycles**: cycles 1–8 under `critiques/closed/` (cycle 8 closed at rev 25 + R-11, `1168da8`). Cycle 8 resolved before this revision, so rev 26 opens cycle 9, pass 1. **Date**: 2026-11-08.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-08T09:26 | steering-hooks-015 (message, ~09:24Z) | cycle 9 pass 1: delta over `dd9e88a..c375d2c` (rev 26) | Delta-bounded pass. M5-h class (3)'s tip anchor read against code review's two runs at website `476c633` (guard present and guard removed); `fields: null` renders in both (21 nodes). D35's premise read at preview-image-generator `471578f` and `6c613a5` (`src/server.ts`), the website's one caller found (`src/server/api/utils/shared.ts:postMessagePreviewImage`, an object always). M8-d's window read in `attack-run1-6c613a5.txt`; RK-8's mechanism read in `src/getPool.ts` and generic-pool 3.9.0's README and lockfile pin. L-C8-1 verified landed. Verdict APPROVED; M-C9-1, M-C9-2 MEDIUM and L-C9-1 LOW to the Planner batch. |

## Boundary

Delta-bounded, the cycle's entry pass: `git diff --numstat dd9e88a..c375d2c -- planning/015-bug-evaluation-fixes.md` = 43/14, 151 diff lines, read whole (`scratchpad/rev26.diff`); the plan is unmoved past `c375d2c` (`--numstat c375d2c..HEAD` empty at 09:26Z). The delta touches the header and owed-verdicts table, four changelog rows (three other gates', one rev 26), D35, M5-h (3) and its rendering list, M6-a's title note, M8-b, M8-d, RK-8, one Planner batch row and the planner's Resumption State. No milestone is reshaped: M8-d is restated as a property over the same behaviour, M5-h's class keeps its predicate and moves one member. The whole-document read is not taken. Rulings file: block 09:22Z (`f502eb5`, heading `d42657d`) read.

## Pricing

Sized to the ask: 47 of 50 fixed, F-15/F-39 closed under D30, the CR-12 rider and the D28 sibling M5-i. D35 widens M8-b from the one crashing body (`null`) to every non-object body at no code change — the implementer's build already refuses them — on the owner's selection; it adds no milestone and no machinery. The M8-d restatement removes a mechanism from the plan rather than adding one.

## Value Statement Assessment

Unchanged at rev 26. F-32 and F-34 are served by M8-b and M8-d as restated; F-18's wrong-shape class by M5-h with the member moved.

## Assumption Not Checked

This pass assumes code review's `verification/015/cr-m8-probes/attack.cjs` counts launch attempts by a predicate that matches the pool's launch-error line format at `6c613a5` — the capture's `launch-error lines after burst=12 after 3 s idle=12` is the script's own count, and this pass did not read the predicate or the log it ran over — and does not test it. Falsity's signature: a format the predicate does not match reads 0 before and after the burst, so M8-d (c) passes vacuously; equally, a predicate matching a line the pool also emits on success inflates both counts alike and still reads "no new launch". The stage that owns closing it is QA Phase 2 at M8, whose cells for (c) take the instrument; the planner's L-C9-1 row names the same instrument for the unmeasured limb.

Premises run in this pass rather than routed: `git log --oneline da24eb7..476c633 -- src/app/preview/page.tsx` in website = one commit (`09c7c45`, the M5-h guard), so the guard-removed probe's stand-in (`run-class-guard-removed.sh` replaces `page.tsx` with `da24eb7`'s blob) removes the guard and nothing else at `476c633`; `prod.yml` at `6c613a5` installs with `npm ci --omit=optional` (line 51), so the host resolves `package-lock.json`'s `generic-pool` 3.9.0 and RK-8 is not live at this deploy; `git grep PREVIEW_IMAGE_URL` over website at `476c633` outside `src` and over project-utils: no hits.

## Rev 26 read against its sources

- **M5-h (3) anchored to the tip (CR-29).** Code review's guard-present run (`cr-m5-probes/class-probe-run-476c633.txt`, line 21) and its guard-removed run (`class-noguard-run1-476c633.txt`, 44 `REAL` cells, `grep -c`) both show `{"embeds":[{"title":"t","fields":null}]}` rendering at 21 nodes, above the positive control's 17; every other listed crashing member throws in the guard-removed run and reads `Invalid message data.` in the guard-present one, the type-12 `items: "x"` member reading `rendered:0 nodes` there (the emptied-root crash signature the plan's Verification names). The move is sound. What the plan cites is the guard-present run, which can show a member renders but cannot decide crash membership; the run that decides it at the tip is the guard-removed one, which the plan does not name — M-C9-1.
- **D35 / M8-b.** `src/server.ts` at `471578f`: `JSON.parse(body)` with no try, then `const { id, nonce, message } = parsedBody` in the `end` handler — `null` destructures to a TypeError in a listener, which is an uncaught exception, so the "crashed the process" claim follows from the code read (not run, as the plan says). At `6c613a5` the parse is in a try with `typeof parsedBody !== 'object' || parsedBody === null` throwing and the catch writing 500 (lines 22–27): "as the implementer built it" holds. The register row carries the selection, its route, the description text marked agent-authored (the planner's), a reopening class and the unread claim named. The caller claim: website `src/server/api/utils/shared.ts:postMessagePreviewImage` sends `JSON.stringify({ id, nonce, message })` with a Bearer header — one call site in `src`, none outside it, none in project-utils. Under the disposition order the non-object class is unreachable from that caller; the ruling is terminal and the guard costs nothing, so no finding.
- **M8-d as a property.** (a)–(c) over "while Chromium launches fail"; (c) carries its window (3 s after a burst of 6) and its capture, which reads `statuses=[500×6] ms=38 … after burst=12 after 3 s idle=12`, `CELL PASS` on both. The 38 ms argues the 500s come from the factory failure, not an acquire timeout. The unmeasured per-request count names its instrument and no runner — L-C9-1. The removed mechanism sentence ("rejects in the pool factory") is gone from the body; the changelog carries the admission.
- **RK-8.** `src/getPool.ts` at `6c613a5` lines 89–91 casts the pool to reach `_waitingClientsQueue` and dequeues on `factoryCreateError`; generic-pool 3.9.0's README documents the event (line 222), `lib/Pool.js` owns the private queue (line 61), and `package-lock.json` resolves 3.9.0 under `^3.9.0`. The risk is stated correctly; its falsifier is post-release and it names no carrier — M-C9-2.
- **L-C8-1 landed.** M6-a's note now reads "first excluded at `57b58d8`, 2023-03-23, by `git log -G"parseEmbedTitle.*codeBlock"`" and names the research's F-38 mechanism sentence as the superseded source at the plan's citation; the batch row reads "Discharged at rev 26". Both limbs present; landed-by-author at rev 26, the discharging document being the plan at `c375d2c`.
- **Owed re-verdicts.** Rev 25's row now says critic cycle 8 and records the four approvals. The rev 26 row and the Status-Detail say "critic (cycle 8)"; this is cycle 9 (cycle 8 closed at `1168da8`). The lag has recurred every revision and is noted in the delivery, not raised as a finding.
- **PREMISE-STALE.** D35 is a product behaviour (an API response) and lands in M8-b; every downstream milestone (M8-a, M8-c to M8-e, M9) was authorised at implementation approval, and M8-0's run-2 reads count `POST /generate` lines, not statuses. None owed; the plan's "No milestone is marked" stands.
- **Decisions Register.** D24–D35 terminal; nothing here names new evidence in a reopening class.

## Findings

### Medium

**M-C9-1 MEDIUM cycle 9 pass 1 — M5-h class (3) is anchored to the moving tip but names no step that produces the tip read, and cites the probe that cannot decide membership.**
- **State**: OPEN. Landing: a Planner batch row at the planner's next pass; after implementation approval it moves no code, so it folds at the next planning pass or the seam before the UAT anchor.
- **Location**: plan § M5-h, class (3) ("on the tree the guard lands on with the guard removed (the chain tip, not a fixed SHA …)"), the rendering list's `fields: null` entry citing `verification/015/cr-m5-probes/class-probe-run-476c633.txt`, and the Verification clause.
- **Description**: (i) Membership in (3) is "crashes with the guard removed", which only the guard-removed run decides; the plan cites the guard-present run, which shows a member renders (sufficient for the move, since the guard only refuses) but cannot show a rendering member has started to crash. The enumerator that exists — code review's `run-class-guard-removed.sh` and `class-noguard-run1-476c633.txt`, 44 cells — is not named. (ii) The anchor is a moving tree and the plan names no step that re-produces the read at the tree the release moves — "Enumerator placed" requires the producing step. (iii) The move rule runs one way ("a member that a later milestone made render moves to the rendering list"); a rendering member a later change makes crash has no rule, and the guard-removed stand-in is exact only while `page.tsx` has no commit after `09c7c45` other than the guard's (one commit in `da24eb7..476c633` today).
- **Impact**: the class's members at release are decided by an artefact nobody is named to produce; the two lists would be read as current at a tree they were not run on.
- **Recommendation**: cite the guard-removed run as the enumerator for (3) at `476c633`; name the step that re-runs it when website's `src/app/preview` or the editor's render path moves after `476c633` (the gate that reads the release tip is the natural owner — naming the gate, not the cells); state the move rule over both directions. No new machinery: the script and its capture exist.

**M-C9-2 MEDIUM cycle 9 pass 1 — RK-8's falsifier is a post-release read with no carrier and no detection owner.**
- **State**: OPEN. Landing: a Planner batch row at the planner's next pass (no code moves).
- **Location**: plan § Risks, RK-8 ("Instrument: the M8-d probe … run after any change to the lockfile's resolved generic-pool version. No standing runner exists in the repo").
- **Description**: the event that arms the risk — the lockfile's `generic-pool` resolution moving off 3.9.0 — happens after this chain closes (prod.yml installs by `npm ci`, so no deploy of this chain moves it). planner.md requires a post-release falsifier to name its carrier — a register row or the handoff the closing stage mints — and the L-C7-1 standing constraint requires a stated limit over a behavioural residue to name who acts while the plan is open and its fate after closure. RK-8 names neither; "no standing runner" states the gap without assigning it.
- **Impact**: the one failure the risk predicts is a silent hang of every waiting `/generate` request after a routine dependency bump, and no document will prompt the probe's run at that event.
- **Recommendation**: give RK-8 a carrier — an Exclusions-form stated-limit row (report lands under RK-8; the planner while open; after closure a handoff with `Owning-Stage` devops and `Review-Trigger` "`package-lock.json`'s resolved `generic-pool` version changes") — naming who runs the M8-d probe then and what they do on a hang. Whether a pin without the caret is wanted instead is a one-line owner question the row can carry; this critique proposes no runner.

### Low

**L-C9-1 LOW cycle 9 pass 1 — M8-d's unmeasured limb names its instrument and no runner.**
- **State**: OPEN. Landing: a Planner batch row at the planner's next pass.
- **Location**: plan § M8-d ("Launches per failing request are unmeasured … The instrument that settles it is a per-request count of launch attempts and `Created instance` lines").
- **Description**: a limb marked unmeasured names the stage and command that measure it next, or is a stated limit with a detection owner (planner.md, Milestones). The plan does neither. The capture already in hand (`attack-run1-6c613a5.txt`) records only burst totals.
- **Impact**: F-34's remedy quality (one launch per request against two) stays unknown with nobody owed the read.
- **Recommendation**: name the stage whose M8 run takes the per-request count (QA Phase 2 is the stage already running M8-d's cells), or state the limb as a stated limit with its detection owner.

## Risks register

RK-6 (the M8 wrong-stop class): rev 26 touches no run-2 read; no new member. RK-8 is new this revision and is M-C9-2's subject.

## Questions

None for the owner.

## Unresolved Open Questions

None: `grep -c 'OPEN QUESTION:'` over the plan at `c375d2c` is not re-run here; the rev 26 diff carries no `OPEN QUESTION` line, and the 08:37Z rulings block records 0 at rev 25.

## Verdict

**Pass 1 — APPROVED** (cycle 9, pass 1; after implementation approval, REQUEST REVISION is reserved for HIGH or CRITICAL, none raised). Sized to the ask: 47 of 50 plus the rider and M5-i; D35 adds a ruling, not work. M5-h's member move is confirmed at `476c633` in both of code review's runs; D35's premise holds at base and tip; M8-d's window is read from its capture; RK-8's mechanism is as stated. Three findings, none moving code: M-C9-1 (the tip-anchored class's enumerator and producing step), M-C9-2 (RK-8's carrier), L-C9-1 (the unmeasured limb's runner) — each a Planner batch row at the planner's next pass; this critique closes when the rows are read. D24–D35 terminal. RK-6: no new member. No owner-needing item.

**Next**: the planner — three batch rows (M-C9-1, M-C9-2, L-C9-1). The implementer: rev 26 changes M8-b's and M8-d's text for milestones already built and reviewed (M8-b to M8-e met at `6c613a5`; M8-a with the implementer on CR-27), with no code change asked; it may proceed against rev 26.
