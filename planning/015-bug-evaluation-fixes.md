---
ID: 015
Origin: 015
UUID: 861e5f61
Status: In Progress
Status-Detail: "M0 and M2 delivered. Code review has approved M1, M4, M5-a to M5-g, M6-b to M6-l and M8-b to M8-e (M8-b at rev 27, Round 20). M8-b was narrowed by the D35 re-put, and M8-d gains limb (d) for D36. M8-a is with the implementer (CR-27, carrying the D36 guard) and M6-a (CR-22). All four gates passed rev 26 except M8-b's D35 limb, now superseded. Rev 27 is approved by the architect, QA and code review (Round 20, with CR-32 and CR-33 LOW, folded at rev 28). The critic (cycle 9 pass 2) is reading it. M3 is removed (D30)."
Revision: 27
Target Release: "website master → the chain-015 merge SHA (Vercel production); preview-image-generator prod → the chain-015 merge SHA (prod.yml; no preview leg, D16). Neither package carries a version artefact."
Epic-Alignment: "none registered — no roadmap exists (agent-output/roadmap holds only .gitkeep, read 2026-11-08); the source of the effort is research/codebase-bug-evaluation-2026-11-08.md (aea4a05)"
Lane: "standard — agent-output/README.md carries no small-lane section (grep -i small, 0 hits, 2026-11-08); the blast radius spans the save schema, a bot command's permissions and a production PM2 service, none a leaf"
Architectural-Surface: "none added. Two record lines are touched — see § Architecture lines this chain touches"
---

# Plan 015 — Bug-evaluation fixes (website, preview-image-generator)

## Reading Order

Authoritative routing for every consuming role. Sections not named here are reference, reached when a named
section cites them; the critic reads the whole plan.

| Role | Sections, in order |
|---|---|
| implementer | Decisions Register → Plan → the milestone being implemented (M0 first) → Testing Strategy → Exclusions |
| code-reviewer | Decisions Register → the milestone under review → Testing Strategy → Architecture lines this chain touches |
| qa | Testing Strategy → Plan → each milestone → Validation → Risks |
| uat | Value Statement and Business Objective → Validation → M2 → M6 |
| devops | M9 — Release (devops; owner steps named) → M8 → Entry work (2026-11-08) → Risks |

Owed re-verdicts:

| Limb | Decidable since | Owning gate | State |
|---|---|---|---|
| M8 (rewritten for D16–D18 and run 1) | rev 4 | critic, architect | approved (critic c1p2 `3398fc0`; architect `192ec29`) |
| M1-a (widened to four sites) | rev 4 | critic, architect | approved (same) |
| M6-l (iii)–(v) | rev 4 | critic, architect | approved (same) |
| M8-a (2), M8-0 run 2, M9 (D19) | rev 5 | critic | approved (critique closed `dee418b`) |
| M1-c clear-out cells; M1-d limit; M2 QAF-1 note; P3 idle cell; M8 E-1 and M8-c route | rev 6 | critic (new cycle), architect, qa | M1-d approved by all three. The rest drew findings (critic `39fb6b9`; architect `1be7e72`; QA `2e4d4d5`), folded at rev 7 |
| M1-c no-account cell; M2 QAF-1 note; P3 pool read and run-2 read; M8 E-1 (loopback, self-check, install location); M8-c browser source and fallback | rev 7 | critic (cycle 2 pass 2), architect, qa | approved (critic `1ce2ae4`; architect `592eb23`; QA `ba277d8`), with AF-16, L-C2-4, QAF-8 and QAF-9 folded at rev 8 |
| M1-c no-account cell and ordering anchor; the session row moved outside M1-c; M8-0 run-2 span and its pool-creation read | rev 8 | critic, architect, qa (delta only) | approved (critic `f64ae27`; architect `ca8da09`; QA `c2a657a`); QAF-10, M-C3-1 and L-C3-1 folded at rev 9 |
| M1-c "no account found" class and lookup-error residue; M1-f premise and RK-7; M1-h restated to D21's property (rev 10); re-derivation after M1; M8-a run-2 span bounds and its read list; P3 instrument liveness; Validation sign-out note | rev 9, rev 10 | critic, architect, qa (one delta round over both) | approved (architect `a34ca86`, QA `45d2d91`, critic `da1c87c`); AF-17 (D22), QAF-12, QAF-13, M-C3-2, L-C3-2 and L-C3-3 folded at rev 11 |
| M1-c lookup-error cell (D22); M1-h trigger "or returns" and decision table; M8-a run-2 span anchored on stop (1) and stop (2) timestamps; RK-7 reducing predicate; re-derivation reading of block 05:50Z | rev 11 | critic, architect, qa (delta only) | approved (architect `8868b7d`, QA `22fef2d`, critic `d18de10`); QAF-14 to QAF-16 and L-C3-4 folded at rev 12 with CR-3 |
| M1-c account decision from the `Accounts` row (CR-3), "falsy return" withdrawn, deletion-failure outcome (QAF-15); M1-h table row 6 timing (QAF-14); run-2 stop line (QAF-16) | rev 12, rev 13 | critic, architect, qa, code review (one round over `14fe94f`..rev 13) | approved (architect `f7e6602`; critic `6970763`, cycle 3 closed; QA `aad87b6`; code review `7976a9a`), with CR-6 to CR-8, QAF-17 and QAF-18 folded at rev 14 |
| D23 clock assumption (no gate re-read, by D23's own terms); M1-i restated over the `cookies()` read; M2-a's colour class (third site); re-derivation after M2 | rev 13 | same round as above, except D23's assumption | approved (same round) |
| M1-i "present" = `cookies()` and its residue; M2-a third colour member (Picker → M6-f); M3 premise unsettled and held for a Chrome read (rev 15); M4-c restated; M4-d over D24–D26: eight hosts, one widened shared constant, its two consumers (rev 16); M6-f covers colour 0; X-17 | rev 14–16 | critic (cycle 4), architect, qa, code review (one round over `9cbe755`..rev 16) | approved by the architect (`565e240` read), the critic (`28f0f16`) and QA (`e43f305`); code review Round 4 (`19dbf64` row): CR-11, folded at rev 17; CR-12 (HIGH, pre-existing) is with the owner. M-C4-1, L-C4-1, AF-19, QAF-21 and QAF-22 are folded at rev 17 |
| M4-d over both F-27 predicate sites (D28); the CR-12 rider (D27, rev 18) (`WebhookProvider.tsx`, `useValidateWebhook.ts`); trim; refused-input display; guild/channel/message groups; id from the constant's group | rev 17, rev 18 | critic (cycle 4), architect, qa, code review (one round over `565e240`..rev 18) | approved (architect, rev 17–18 read; critic `e05a8d4`; QA `31173a1`; code review `e343d2e` row); AF-20, QAF-23 and L-C4-2 folded at rev 19 |
| CR-12 rider: belonging as `guild_id` equality, absent `guild_id` refused; `fetchChannel` refusals 401/403, 404 and other with their texts | rev 19 | critic, architect, qa, code review (delta only) | open |
| M4-d webhook-URL load failure: "Invalid URL" at both sites (D29); the old-message network clause scoped to the message fetch | rev 20 | critic (cycle 5, new file), architect, qa, code review (delta only) | architect approved (`8affd6a`, AF-21 INFO, no plan change); code review REJECTED the limb's place (`e524a96`, CR-16), folded at rev 21; critic and qa read it in the rev 21 round |
| M4-d webhook-load limb: each site's stated place, the dialog's on its shared error line (CR-16); M3 removed (D30); X-18 with its untested residue; the value-statement sentence carried as already true | rev 21 | critic (cycle 5), architect, qa, code review (one round over `e118cc3`..rev 21) | open |
| M5-h restated over classes (1)–(3), with residue X-19 (D31, D28, CR-18); M6-l (vi) error placement (D32) | rev 22 | critic (cycle 6), architect, qa, code review (delta only) | approved by all four: architect (`5581822`, AF-23 to AF-25), code review Round 11 (`9268f02`, CR-20), QA (`1017bdc`, QAF-28), critic cycle 6 pass 1 (`eee4a31`, M-C6-1, L-C6-1); all folded at rev 23 |
| M5-h class (3) as the real page's crash set, members as read-backed illustrations, X-19 re-cited; M6-l (ii) one literal; M6-l (vi) on `/preview` (D33) | rev 23 | critic (cycle 6), architect, qa, code review (delta only) | approved by the architect (`25b3e57`, AF-27 for code review), the critic (`0649ef4`, L-C6-2) and QA (`28be7bf`); code review Round 12 REJECTED (`1c1adb6`, CR-21); all folded at rev 24 |
| M5-h (3) type-12 member, X-19 residue and Verification presence rule (CR-21); M4-d non-JSON member (L-C5-1); M5-i (new, D28); X-20/D34; X-21 | rev 24 | critic (cycle 7), architect, qa, code review (delta only) | approved by all four: architect (`1a3bc68`, AF-28, AF-29), QA (`4d091e4`), critic cycle 7 pass 1 (`1b5f3e8`, L-C7-1), code review Round 13 (`3960833`); folded at rev 25 |
| M6-a without the title member (CR-23); Exclusions standing constraint, X-16 and X-21 clauses (L-C7-1); X-20/D34 cite W-7 (AF-28); X-22 (modal seed) | rev 25 | critic (cycle 8), architect, qa, code review (delta only) | approved by all four: architect (`5efb7ab`), code review Round 15 (`1d0059a`), QA (`983a84d`), critic cycle 8 pass 1 (`4429f17`, L-C8-1, folded at rev 26) |
| M5-h (3) anchored to the tip, `fields: null` moved (CR-29); M8-b non-objects (D35, D28 for `null`); M8-d as a property, with (c) and its unmeasured limb; RK-8; M6-a note (L-C8-1) | rev 26 | critic (cycle 9), architect, qa, code review (delta only) | all four passed except M8-b's D35 limb: architect (`7652b59`, AF-30), QA (`9fdf439`, QAF-33), critic cycle 9 pass 1 (`e233c82`; M-C9-1, M-C9-2, L-C9-1), code review Round 19 REJECTED for that limb (`5ab0802`, CR-30, CR-31). Folded at rev 27 |
| M8-b narrowed (D35 re-put); M8-d (d) startup line (D36), X-24; RK-8 signature and carrier (CR-31, M-C9-2), M9 carrier line; M5-h (3) deciding read and move rule (M-C9-1); X-23 | rev 27 | critic (cycle 9 pass 2), architect, qa, code review (delta only) | architect approved (`b2add20`; AF-31 LOW for the implementer and code review, no plan text owed). QA approved, no new finding (`b21c7b5`; QAF-33 resolved; one Assumption Not Checked parked in Planner batch). Code review Round 20 APPROVED_WITH_COMMENTS (`b5666ed`; CR-32, CR-33 LOW, Planner batch). Critic open |

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-11-08T04:43 | 1 | planner (planner-hooks-015) | Created. ID minted on the owner's selection (04:39Z). Source: `research/codebase-bug-evaluation-2026-11-08.md` at agent-output `aea4a05`; scoping: `steering/015-rulings.md` (committed as `bug-fixes-rulings.md`) block "2026-11-08T04:37Z — scoping determination" (`a111e80`). Scope delta: none (first revision); the plan carries 48 of the 50 rated findings in ten milestones (M0–M9), the original ask being the 50-finding pool. |
| 2026-11-08T04:51 | 2 | planner (planner-hooks-015) | Folds the owner's answers in `steering/015-rulings.md` block "2026-11-08T04:49Z" (`e8631f8`): OQ-A–OQ-F closed, D3–D5 confirmed, D7–D13 registered, F-31 analyst commissioned, API-key handoff written (X-12). Scope delta: F-44 joins M6 as M6-l (allow the add, mark the message invalid); X-2 and X-3 removed; M8 gains M8-0, an owner-run read that replaces limb (3)'s `claude-ro` read; M0 is settled as deleting the stale directory. The plan now carries 49 of the 50 findings, the original ask being 50. |
| 2026-11-08T04:58 | 3 | planner (planner-hooks-015) | Folds analysis `analysis/015-bug-evaluation-fixes-analysis.md` (`7e24de3`): under PM2 the drain never runs, because `shutdown_with_message` sends an IPC message, not SIGINT. Scope delta: M8-a is rewritten as P1–P4 with `kill_timeout` 12000 ms; M8-0's commands and prediction come from the analysis, which writes the script; RK-5 is added (Chromium after SIGKILL on PM2 7.x); the architecture-line entry now proposes the correction. Sized against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T05:12 | R-1 | planner (planner-hooks-015) | Registered D14 and D15 from `steering/015-rulings.md` block "2026-11-08T05:11Z" (`9247ddb`). Scope delta: none, registration only. |
| 2026-11-08T05:28 | 4 | planner (planner-hooks-015) | Folds critique `critiques/015-bug-evaluation-fixes-critique.md` cycle 1 pass 1 (`68308e8`): H-1, M-1 to M-4, L-1 to L-5 (L-2 is moot under D17), Q-2. Also folds the architect's findings (`b838a01`: AF-1 to AF-4), the rulings blocks 05:21Z, 05:24Z and 05:26Z (D16 to D18; D11 and D12 superseded), and M8-0 run 1 (`fe27690`, `1fc16f5`). Scope delta: M1-a widens to four `in` sites. M6-l gains its stored-`valid` residue (X-13), the no-live-sends constraint (X-14) and a home for the shared counter. M8 loses its preview leg, M8-0 becomes an agent read with run 1 done, and M8-a is bound to a verifying stop of the new code with a fixed log-line predicate. RK-6 and a Reading Order are added. Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T05:33 | 5 | planner (planner-hooks-015) | Folds D19 (rulings block 05:29Z, `fa693e0`: the verifying stop is devops' `prod.yml` re-run), critique cycle 1 pass 2 L-6 to L-9 (`3398fc0`), and architect AF-11 and AF-12 (`192ec29`). Scope delta: M8-a (2)'s cause moves from the owner's `pm2 reload` to a devops re-run, which is a second production deploy needing his approval. M8-0 run 2's reader is devops. Stop (1) is restated as a 12 s delay, not downtime. M1-a's route statement is corrected. D15 is brought current; X-15 carries the June–August gap. No criterion changes. Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T05:35 | R-2 | planner (planner-hooks-015) | Registered D20 from `steering/015-rulings.md` block "2026-11-08T05:33Z" (`d852da1`), plus a Planner batch row for the body text it releases. Scope delta: none, registration only. |
| 2026-11-08T05:43 | 6 | planner (planner-hooks-015) | Folds QA Phase 1's batch QAF-1 to QAF-5 (`qa/015-bug-evaluation-fixes-qa.md`, `bf15750`; QA read rev 4) and the D20 Planner batch row. Scope delta: M1-c gains clear-out cells for a failed revoke and a missing account; P3 gains the idle-process cell; M8's local route carries entry condition E-1 (no credentials, no network, no CDN write); M2 names the transcribed-schema test it rewrites; M1-d and X-16 state the concurrency limit; M8-c runs locally with a browser under D20. Opens a new critique cycle (criterion text changed). Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T05:48 | 7 | planner (planner-hooks-015) | Folds the three gate results on rev 6: critique cycle 2 pass 1 (`39fb6b9`: M-C2-1 to M-C2-3, L-C2-1 to L-C2-3), the architect's delta (`1be7e72`: AF-13 to AF-15) and QA's re-key (`2e4d4d5`: QAF-6, QAF-7). Scope delta: E-1 brings loopback up, gains a self-check and installs inside the export; M8-c names its browser source and gets back its code-review fallback; M1-c's no-account cell names the two keys it clears and the `user-guilds` residue; P3 places the pool read in `getPool.ts` and names run 2's request read; M2's note becomes a property that cites QA. Criterion text changed, so the critic, the architect and QA each re-read. Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T05:51 | 8 | planner (planner-hooks-015) | Folds four findings on rev 7: architect AF-16 (`592eb23`), critique L-C2-4 (`1ce2ae4`), and QA QAF-8 and QAF-9 (`ba277d8`). It is the first revision since implementation approval (rulings `7efd8b0`), and it triggers one delta round from each of the three gates. It is not a milestone-level scope delta. M1-c's deliverable is unchanged and no work is added. The text now attributes the session-row deletion to next-auth's adapter, as all three gates read it. QAF-8 is RK-6's second member and is remedied by the property over the class. Scope delta: in M1-c, the no-account cell drops the session-row limb, the session row is placed outside M1-c, and the ordering anchor becomes the `Accounts` update. In M8-0, every run-2 read is bounded to the stopped process's span, and pool creation is read from `Created instance` lines. Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T05:53 | R-3 | planner (planner-hooks-015) | Parked QA's QAF-10 (`c2a657a`) as a Planner batch row. Its words are in `qa/015-bug-evaluation-fixes-qa.md`. Scope delta: none, registration only. |
| 2026-11-08T05:56 | R-4 | planner (planner-hooks-015) | Recorded critique cycle 3 pass 1, APPROVED on rev 8 (`f64ae27`). M-C3-1 joins the QAF-10 batch row, and L-C3-1 gets its own batch row. Their words are in `critiques/015-bug-evaluation-fixes-cycle3-critique.md`. Scope delta: none, registration only. |
| 2026-11-08T05:54 | impl | implementer (implementer-hooks-015) | Status → In Progress. Implementation starts at M0 on the chain branch, entry conditions recorded in `implementation/015-bug-evaluation-fixes-m0-implementation.md`. No criterion text touched. |
| 2026-11-08T06:03 | cr | code-reviewer (code-reviewer-hooks-015) | Round 1, M0 only, at website `037935d`: APPROVED_WITH_COMMENTS (CR-1 LOW, CR-2 INFO), `code-review/015-bug-evaluation-fixes-code-review.md`. The review is milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T06:09 | qa | qa (qa-hooks-015) | Phase 2, M0 only, at website `037935d`: PASS (`qa/015-bug-evaluation-fixes-m0-qa.md`). The bot collection change discriminates in both directions, and path membership equals the base's 54. QAF-11 MEDIUM goes to the implementer: a wall-clock wait in `SectionEditor.auto-remove-dispatch` flaked 1 of 4 full runs. It is not caused by M0. Milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T06:23 | 9 | planner (planner-hooks-015) | Triggered by the M1 handoff (`implementation/015-bug-evaluation-fixes-m1-implementation.md`, `7f45611`; website `be881c9`), its Outstanding Items 1–3 and declared behaviour changes. It also folds the parked rows QAF-10 (`c2a657a`), M-C3-1 and L-C3-1 (`f64ae27`). This is the second revision since implementation approval, and it triggers one delta round per gate. OQ-I goes to the owner as a milestone-level scope delta on M1-h. Option (A) adds one more M1-h code-review round and one more QA Phase 2 run; option (B) adds none. Scope delta: in M1-c, the "no account found" class becomes `NoResultError` or a falsy return, with a lookup-error residue. M1-f's premise is corrected, and RK-7 is added. M1-h's criterion, which holds at the base, is restated pending OQ-I. A re-derivation paragraph covers M2–M9, and no milestone is marked stale. M8-a's run-2 span is bounded by ready lines only, with its reads listed. P3 gains instrument liveness. Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T06:26 | 10 | planner (planner-hooks-015) | Registers D21 from rulings block 06:25Z "OQ-I" (`33928c8`) and restates M1-h to its property. The criterion text moves, so this is a revision, not a registration. It is the third revision since implementation approval. It is a milestone-level scope delta on M1-h that the owner chose himself (D21): M1-h reopens for one change, one code-review round and one QA Phase 2 re-run. The gates read rev 9 and rev 10 in one delta round, not two. Scope delta: M1-h is restated as a property over the three promises `hydratedAuthCallback` starts, with four rejection inputs; OQ-I is closed. Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T06:31 | 11 | planner (planner-hooks-015) | Folds the three verdicts on revs 9 and 10 (architect `a34ca86` AF-17; QA `45d2d91` QAF-12, QAF-13; critic `da1c87c` M-C3-2, L-C3-2, L-C3-3) and registers D22 (rulings 06:29Z, `904ec0d`). It is the fourth revision since implementation approval, and it triggers one delta round per gate. M1-c reopens under D22, which the owner chose with its cost stated. M1-h's additions only complete D21, so they ride it. Scope delta: M1-c gains the lookup-error cell. M1-h's trigger becomes "awaits anything else or returns", and an eight-row decision table replaces the four inputs. The run-2 span is anchored on `pm2.log`'s stop timestamps with no positional bound; this is RK-6's fourth revision of that limb. RK-7 names QA's transitive scan as its predicate, and the re-derivation paragraph reads block 05:50Z instead of hedging. Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T06:33 | cr | code-reviewer (code-reviewer-hooks-015) | Round 2, M1, at website `be881c9`: REJECTED, `code-review/015-bug-evaluation-fixes-code-review.md` (`53ee954`). CR-3 MEDIUM: sign-out reads a cached `null` as "no account" and skips the revoke and the `Accounts` update for an existing row. This is the "falsy return" member of rev 9's M1-c class, and it needs a planner fold. CR-4 MEDIUM: the cookie parser throws on legal `%` octets (M1-i). CR-5 LOW. M1-a, b, d, e, f, g, j and k are met. M1-h was reopened by rev 10 and is not verdicted at `be881c9`. Round 1's CR-1 is RESOLVED. The review is milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T06:37 | 12 | planner (planner-hooks-015) | Folds code review Round 2 CR-3 (`53ee954`) and the rev-11 verdicts' findings: QA QAF-14 to QAF-16 (`22fef2d`) and critic L-C3-4 (`d18de10`, the same member as QAF-16). The architect (`8868b7d`) had none. It is the fifth revision since implementation approval, and it triggers one delta round per gate. CR-3 corrects a chain-introduced defect (M1-j, `a2592f0`) inside M1-c's reopen, which D22 already pays for, and does not change what D22 decided (steering's reading, which the planner concurs with). Scope delta: M1-c's account decision and token come from the `Accounts` row, never from the shared cache key, and rev 9's "falsy return" member is withdrawn. M1-c gains the deletion-failure outcome. M1-h's row 6 covers M rejecting after G settles; row 8 already covered it. The run-2 span names `Stopping app` as the stop line, states the UTC clock premise with run 1's reads, and adds the `date +%z` and `online`-versus-ready checks. Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T06:40 | 13 | planner (planner-hooks-015) | Triggered by D23 (rulings 06:39Z, `7faa2e0`) and the implementer's M2 and M1 fix round 1 (website `6001f7f`; documents `3ba52f3`). It is the sixth revision since implementation approval, and steering briefs one round over `14fe94f`..rev 13 for the critic, the architect, QA and code review. Scope delta: rev 12's run-2 clock checks are withdrawn for D23's stated assumption. QAF-16's naming of `Stopping app` as the stop line is kept, as the planner's judgement against D23's words: it says which line is the stop, which the span needs whatever the clock, and it is not the clock rewrite D23 declined. M1-i is restated over the `cookies()` read, because CR-4's fix deleted the parser. M2-a names its colour class with the `EmbedEditor` border as the third site. A re-derivation paragraph after M2 marks nothing stale. Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T06:44 | R-5 | planner (planner-hooks-015) | Parked the M3 premise read as a Planner batch row; its words and reads are in that row and `verification/015/m3-same-node-propagation-probe-run1.txt`. Scope delta: none, registration only. |
| 2026-11-08T06:44 | cr | code-reviewer (code-reviewer-hooks-015) | Round 3, M2, at website `6001f7f` against rev 13: APPROVED_WITH_COMMENTS (CR-8, CR-9 and CR-10 LOW), `code-review/015-bug-evaluation-fixes-code-review.md` (`7976a9a`). Round 2 sub-entry at `6001f7f`: CR-4 RESOLVED and M1-i met under rev 13. Round 2's REJECTED stands for M1-c (CR-3) and M1-h, both held for the rev 13 round. For the planner: CR-7 LOW (M1-i's "present" is wider than what `cookies()` reports) and CR-8 LOW (M2-a's enumeration misses `Picker.tsx`, outcome-neutral, fixed at M6-f). Milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T06:48 | 14 | planner (planner-hooks-015) | Registers D24 (rulings 06:45Z, `9b94838`). It folds the rev 12+13 gate findings: code review CR-6 to CR-8 (`7976a9a`), and QA QAF-17 and QAF-18 (`aad87b6`), which duplicate CR-8 and CR-7. It folds the implementer's M4-c question and the R-5 batch row. The architect (`f7e6602`) and critic (`6970763`) had none. It is the seventh revision since implementation approval, and it opens critique cycle 4. Scope delta: M1-i defines "present" as what `cookies()` returns, with two residue classes. M2-a names `Picker.tsx` as a third member sent to M6-f. M3 gains its premise note. M4-c drops the non-existent name-view button. M4-d takes D24's inputs and text, with hosts mirroring `DISCORD_MESSAGE_LINK_REGEX`. CR-6 becomes X-17 with a handoff, not a rider. Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T06:51 | 15 | planner (planner-hooks-015) | Registers D25 (rulings 06:50Z, `9f97a5f`), and replaces rev 14's § M3 premise note. That note's reproduction conclusion was withdrawn at 06:52Z on the implementer's document-root probe; the error was the planner's. It is the eighth revision since implementation approval. Steering briefs one round over `9cbe755`..rev 15 in place of a rev 14 round. Scope delta: M4-d admits `discordapp.com`, and OQ-J goes to the owner. Widening the shared `DISCORD_MESSAGE_LINK_REGEX` would also change the New Message dialog and `message.getFromUrl`. M3 is held for a real-Chrome read, with QA's four cells per dialog and both outcomes routed. Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T06:53 | 16 | planner (planner-hooks-015) | Registers D26 (rulings 06:52Z, `7207289`) and restates M4-d. It is the ninth revision since implementation approval. Steering briefs one round over `9cbe755`..rev 16. Scope delta: M4-d's link class becomes eight hosts in the one shared constant. The New Message dialog's link load and `message.getFromUrl` join M4-d's criterion as the constant's consumers, with a human-observable walk; the owner accepted that change as stated, at no extra milestone or round. D25's bare-host reading is overridden. Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T06:57 | cr | code-reviewer (code-reviewer-hooks-015) | Round 4, the gate read of `9cbe755..565e240` (revs 14–16), mechanisms at website `6001f7f`: REJECTED for M4-d only, `code-review/015-bug-evaluation-fixes-code-review.md` (`32efd0b`). For the planner: CR-11 MEDIUM. M4-d's `getFromUrl` limb names the channel and message groups but not the guild group, the only input to `authorizeGuildAdmin`. Restate it over all three, with a guild-group cell. M1-i, M2-a/M6-f, M4-c and X-17 are approved: CR-7 and CR-8 RESOLVED, CR-6 routed. CR-12 HIGH, pre-existing on `master` and outside D6, escalated to steering for the owner: `getFromUrl` authorizes the link's guild but fetches the link's channel with the bot token, unbound. Milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T06:54 | qa | qa (qa-hooks-015) | Phase 2, M2 only, at website `6001f7f` against rev 16 (§ M2 unchanged since rev 14): PASS (`qa/015-bug-evaluation-fixes-m2-qa.md`). Suite 720/720, 71 files, exit 0. 18/18 implementer mutants and 6/6 QA mutants were killed at `6001f7f`. QAF-19 and QAF-20 (LOW) go to the implementer; QAF-20 duplicates CR-10 and times it before the effort-final pass. Milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T06:57 | 17 | planner (planner-hooks-015) | Folds critique cycle 4 pass 1 (`28f0f16`: M-C4-1, L-C4-1), architect AF-19 (`565e240` read), QA QAF-21 and QAF-22 (`e43f305`), and code review Round 4 CR-11 (`19dbf64` row), which duplicates QAF-21. CR-12 (HIGH, pre-existing on `master`) is with steering for the owner and is not folded. Disclosure: rev 17's M4-d body edits were committed inside code review's row commit `19dbf64`, before this row; M-C4-1 is taken at once as a milestone-level scope delta on open M4. It is the tenth revision since implementation approval, and it triggers one delta round per gate. Scope delta: M4-d now covers both sites of F-27's predicate. The New Message dialog's webhook load gains the anchored test, the D24 network text and ordering. The planner judges that the owner's standing mirror rule and D24 ("anything else is refused before fetching") compel it, and routes it to steering for the owner if steering judges otherwise. QAF-22 is settled as the base behaviour (trim, nothing shown on refusal), so no new flow. Against the ask: 49 of 50 findings, unchanged; F-27 is sized to both of its sites. |
| 2026-11-08T06:59 | cr | code-reviewer (code-reviewer-hooks-015) | Round 4 sub-entry at rev 17 (`94e9987`): CR-11 RESOLVED. M4-d's `getFromUrl` limb, restated by destination, names the guild id the gate reads. Round 4 is now APPROVED_WITH_COMMENTS (`code-review/015-bug-evaluation-fixes-code-review.md`, `49a25a0`). CR-12 HIGH is still with the owner through steering. Rev 17's two-site enumeration is outside this sub-entry. Milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T07:02 | 18 | planner (planner-hooks-015) | Registers D27 and D28 (rulings 07:01Z, `3d7af67`), and folds CR-12 into M4-d as a named rider. The rider has a property over three channel classes, the sibling read (no precedent; reuses `redis.fetchChannel`), an instrument, and a drop disposition priced in advance (a security handoff; the hole stays open in production). It is the eleventh revision since implementation approval. Steering briefs one round over `565e240`..rev 18. Scope delta: a pre-existing HIGH security defect outside F-1 to F-50 rides M4-d on the owner's selection, adding one change, review and QA. Rev 17's second F-27 site is confirmed by D28. Against the ask: 49 of 50 findings plus one rider (CR-12). |
| 2026-11-08T07:04 | cr | code-reviewer (code-reviewer-hooks-015) | Round 5, the gate read of `565e240..67cb5e7` (rev 17–18, M4-d only), with mechanisms checked at website `6001f7f`: APPROVED_WITH_COMMENTS, `code-review/015-bug-evaluation-fixes-code-review.md` (`430c277`). M-C4-1's two sites reproduce. The D27 rider's property and cell are discriminating. CR-13 LOW goes to the implementer at M4: `redis.fetchChannel` types the channel as `Guild`, so retype it and compare `guild_id`. No plan change is owed. The M4 code review is Round 6, on the one-tree handoff. Milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T07:05 | 19 | planner (planner-hooks-015) | Folds the rev 17+18 verdicts' findings: QA QAF-23 (`31173a1`) and critic L-C4-2 (`e05a8d4`), the same member, plus architect AF-20. Code review (`e343d2e` row) had none for the plan. It is the twelfth revision since implementation approval, and it triggers one delta round per gate. Scope delta: in the CR-12 rider, belonging is equality over the field's domain, so an absent `guild_id` (a DM or group-DM channel) is refused, and the lookup's refusals are listed by status with their existing texts. No work is added to the rider. Against the ask: 49 of 50 findings plus one rider. |
| 2026-11-08T07:07 | cr | code-reviewer (code-reviewer-hooks-015) | Round 6, the gate read of `67cb5e7..330348f` (rev 19, CR-12 rider only), with mechanisms checked at website `6001f7f`: APPROVED, no findings, `code-review/015-bug-evaluation-fixes-code-review.md` (`7d26b77`). The `guild_id` equality refuses an absent field. The refusal texts match `fetchChannel` word for word. The unmapped failures throw before any content. The M4 code review is Round 7. Milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T07:22 | cr | code-reviewer (code-reviewer-hooks-015) | Round 7, M4 at website `1e12837` against rev 19: APPROVED_WITH_COMMENTS, `code-review/015-bug-evaluation-fixes-code-review.md` (`a99e9ff`). Every M4 limb is met, including both F-27 sites and the D27 rider. The rider was attacked on the real `getFromUrl` (only Redis, Postgres and Discord faked): 26 of 26 cases as expected at `1e12837`, and the probe leaks at `6001f7f`. CR-11 and CR-13 are RESOLVED in code. For the planner: CR-14 LOW. The two F-27 sites show different texts for a failed webhook-URL fetch, and rev 19's network clause does not say whether that fetch is in scope. State one text for both sites. QA Phase 2 may take M4 at `1e12837`. Milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T07:24 | 20 | planner (planner-hooks-015) | Folds code review Round 7 CR-14 (`a99e9ff`) and registers D29 (rulings block 07:24Z "CR-14", `27f8cd7`). Disclosure: the stamp gate refused this row's first, hand-typed stamp (07:27); it now carries `date -u`. It is the thirteenth revision since implementation approval. It is a milestone-level scope delta on open M4 that the owner chose with its cost stated: one change, one code-review round and one QA Phase 2 re-run on M4, after one delta round of the critic (cycle 5), the architect and QA. Scope delta: M4-d's network clause is scoped to the old-message fetch, and a new limb makes a failed webhook-URL load show "Invalid URL" at both F-27 sites; M4-b is unchanged. No downstream milestone rests on either site's error text (grep of the plan for `NewMessageModal`, `useValidateWebhook` and "Invalid URL": M4 only), so none is marked `PREMISE-STALE`. Against the ask: 49 of 50 findings plus one rider. |
| 2026-11-08T07:25 | cr | code-reviewer (code-reviewer-hooks-015) | Round 2 sub-entry, the M1-c and M1-h rebuild at website `579e8b2` against rev 19: Round 2 (M1) moves from REJECTED to APPROVED_WITH_COMMENTS, `code-review/015-bug-evaluation-fixes-code-review.md` (`befc32f`). CR-3 is RESOLVED structurally: sign-out decides from the `Accounts` row. Probed across the cache states, the revoke outcomes and the lookup error, with Redis down too; the probe is red at `6001f7f`. M1-h: all eight rows have cells. CR-15 LOW goes to the implementer: row 2's after-return member has no cell. CR-9 and CR-6 are RESOLVED. QA Phase 2 may take M1-c and M1-h at `579e8b2`. Milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T07:26 | cr | code-reviewer (code-reviewer-hooks-015) | Round 8, the gate read of `330348f..e118cc3` (rev 20, D29), with mechanisms checked at website `1e12837`: REJECTED for M4-d's webhook-load limb only, `code-review/015-bug-evaluation-fixes-code-review.md` (`e524a96`). For the planner: CR-16 MEDIUM. The limb shows "Invalid URL" "at the webhook URL field" and "under the field" at both sites, but the New Message dialog has no field-level error (`errorMessage=`: 0 in `NewMessageModal.tsx`). Its webhook errors render in one shared line below the load options. State the place: (a) the shared line, with the walk reworded, or (b) a field `errorMessage` mirroring `WebhookMenu`, removed from the shared line. The rest of the delta is approved. Milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T07:28 | 21 | planner (planner-hooks-015) | Folds code review Round 8 CR-16 (`e524a96`) and registers D30 (rulings block 07:26Z "M3: drop M3, not a defect", `f005cef`), together, as steering asked. It is the fourteenth revision since implementation approval, and steering briefs one round over `e118cc3`..rev 21. CR-16 places the dialog's "Invalid URL" on its existing shared error line. That rides D29's chosen words ("copies the send page. One small change"), which is steering's reading and the planner's. A field-level error on the dialog would be new UI and was not taken. M3 is removed on the owner's selection, with no code written for it. Scope delta: M4-d's webhook-load limb states each site's place, and its cell fails on the text appearing elsewhere or nowhere. M3 is removed, and F-15/F-39 become X-18 with the untested residue named (the uploader's Clear, a production build, other browsers). The value-statement sentence is carried as already true (D30). Against the ask: 47 of 50 findings fixed, F-15/F-39 closed as not reproducible, plus one rider. |
| 2026-11-08T07:29 | cr | code-reviewer (code-reviewer-hooks-015) | Round 9, the gate read of `e118cc3..3d193f9` (rev 21): APPROVED, no findings, `code-review/015-bug-evaluation-fixes-code-review.md` (`22e086c`). CR-16 is RESOLVED: each site shows "Invalid URL" in its existing place (the dialog's shared error line, the send page's field error). D30: M3 carried no code-review limb, its cited Chrome read (`8996505`) exists as described, and no M3 code is on the chain branch. Milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T07:32 | R-6 | planner (planner-hooks-015) | Parked critique cycle 5 L-C5-1 (LOW) as a Planner batch row; its words are in `critiques/015-bug-evaluation-fixes-cycle5-critique.md` (`79e8572`). Scope delta: none, registration only. |
| 2026-11-08T07:56 | cr | code-reviewer (code-reviewer-hooks-015) | `code-review/015-bug-evaluation-fixes-code-review.md` (`d7708e8`), against rev 21. **Round 10, M5 at website `da24eb7`: REJECTED for M5-h only.** CR-18 MEDIUM: a `/preview` JSON object of the wrong shape still crashes the page (4 of 5 probed members throw in `makeEditable`, `verification/015/cr-m5-probes/run1-da24eb7.txt`). Steering's 07:30Z call puts that class in M5-h. **For the planner:** register in § M5-h the 07:52Z non-object ruling (`c1be05e`) and the wrong-shape class. M5-a to M5-g are met; CR-19 is LOW. **M4's D29 change and the QAF-25 cells** (a Round 7 sub-entry at `da24eb7`): M4 stays APPROVED_WITH_COMMENTS, CR-14 is RESOLVED, and CR-17 is LOW. **CR-15 is RESOLVED** at `3031878`. QA Phase 2 may take M4 and M5-a to M5-g at `da24eb7`, and M1 at `3031878`. This review is milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T07:57 | 22 | planner (planner-hooks-015) | Folds code review Round 10 CR-18 (`d7708e8`; plan row `31f9fc0`) and registers D31 and D32 (rulings block 07:52Z, `c1be05e`). It is taken at once, ahead of the item 3 probe steering asked to batch with it, because it unblocks waiting code: M5-h's fix after CR-18's rejection, and M6-l, now being coded. It is the fifteenth revision since implementation approval. Steering judged CR-18's member class a D28 sibling (`a49da66`), so it rides with no owner question. Scope delta: M5-h is restated over three refused classes, the third read from `makeEditable`'s source at `da24eb7`, so anything that renders today still renders. Re-derivation: M8 (stored messages screenshotted) keeps its premise, M7 and M9 read no `/preview` behaviour, so none is marked `PREMISE-STALE`. X-19 carries the render-time residue. M6-l gains (vi), the error's place and text. Against the ask: 47 of 50 findings fixed, F-15/F-39 closed as not reproducible, plus one rider. |
| 2026-11-08T08:03 | cr | code-reviewer (code-reviewer-hooks-015) | Round 11, the gate read of `3d193f9..5201612` (rev 22): APPROVED_WITH_COMMENTS, `code-review/015-bug-evaluation-fixes-code-review.md` (`9268f02`). M5-h class (3): every listed member crashes the page at website `da24eb7`, by execution (`verification/015/cr-m5-probes/edge-run3-da24eb7.txt`, `real-run4-da24eb7.txt`). **For the planner: CR-20 LOW.** (a) `embeds:""` and `fields:""` crash in the editor's `validateEmbedCharacterCount`, not in `makeEditable`. State (3)'s basis as the page's crash set, and never as "`makeEditable` throws", which would leave both crashing. (b) Array elements of `embeds`, `fields` and a type-1 child, and a type-17 container's `null` direct child, all render; state them as rendered. (c) Re-cite X-19 to `real-run4-da24eb7.txt`: the cited `run1` stubbed the editor. M6-l (vi): no finding, because `v2TextError` and `errorBorder` reach the Send page through `MessagePreview`. Milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T08:05 | 23 | planner (planner-hooks-015) | Folds the rev 22 verdicts' findings: architect AF-23 to AF-25 (`5581822`), code review CR-20 (`9268f02`), QA QAF-28 (`1017bdc`) and critic M-C6-1 and L-C6-1 (`eee4a31`). It also registers D33 (rulings 08:02Z, `9f321b8`) and steering's M5-h restatement under `a49da66`. It is taken at once because the implementer holds M5-h on it, and it is the sixteenth revision since implementation approval. Rev 22's class (3) was the planner's source reading, and it was wrong in both directions. AF-23 (a makeEditable-only basis) and L-C6-1 (a shape predicate) are superseded by the executed reads and steering's property call, which CR-20 and QAF-28 resolve (`""` crashes the real page). Scope delta: M5-h class (3) becomes the real page's crash set at `da24eb7`, with members as illustrations from three executed reads (the planner's 44-row run, code review's, the critic's), so it gains `embeds`/`fields` `null`, falsy `components`, a section's null `accessory` and the critic's three render-time members; X-19 is re-cited. M6-l (ii) shares (vi)'s literal, and (vi) also shows on `/preview` (D33). Against the ask: 47 of 50 findings fixed, F-15/F-39 closed as not reproducible, plus one rider. |
| 2026-11-08T08:09 | cr | code-reviewer (code-reviewer-hooks-015) | Round 12, the gate read of `5201612..39dbc0d` (rev 23): REJECTED for M5-h's residue text only, `code-review/015-bug-evaluation-fixes-code-review.md` (`1c1adb6`). CR-20 is RESOLVED: class (3) is the real page's crash set, decided by executed reads. **For the planner: CR-21 MEDIUM.** X-19 records `{"components":[{"type":12,"items":"x"}]}` as "renders blank, 0 nodes, without throwing", outside the class and unchanged. With the real page and editor it throws "gallery.items.map is not a function", in both orders (`verification/015/cr-m5-probes/reported-run1-da24eb7.txt`, `reported-run2-da24eb7.txt`). A root emptied to 0 nodes is the crash signature. Move it into (3); drop or restate X-19's blank-render class; and state that each cell asserts its outcome's presence (the error line text or the editor's content), never only that nothing threw. All 12 members listed as rendering do render, with no error-boundary fallback (`reported-run3`). M6-l (ii) and (vi)/D33: no finding. Milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T08:09 | R-7 | planner (planner-hooks-015) | Parked critique cycle 6 L-C6-2 (LOW) as a Planner batch row; its words are in `critiques/015-bug-evaluation-fixes-cycle6-critique.md` (`0649ef4`). Scope delta: none, registration only. |
| 2026-11-08T08:11 | 24 | planner (planner-hooks-015) | Folds code review Round 12 CR-21 (`1c1adb6`) and registers D34 (rulings 08:10Z "AF-26", `766bd4b`). It also folds the implementer's D28 seed probe (`verification/015/d28-seed-probes/report.md`) and discharges R-6 (L-C5-1) and R-7 (L-C6-2). It records rev 23's verdicts. It is taken at once because M5-h is held on it, and it is the seventeenth revision since implementation approval. The planner's run recorded a crash as "rendered: 0 nodes" (an emptied root); the error was the planner's instrument reading. Scope delta: M5-h (3) gains the type-12 non-array `items` member, X-19 loses its blank-render class, and Verification requires each outcome's presence. M4-d's webhook-load limb names the non-JSON response. M5-i is added, a D28 sibling: `WebhookMenu`'s first-visit tab. X-20 (with its handoff) and X-21 are added. The `NewMessageModal` seed waits on a browser read, with its disposition priced. Against the ask: 47 of 50 findings fixed, F-15/F-39 closed as not reproducible, plus one rider and one D28 sibling (M5-i). |
| 2026-11-08T08:13 | cr | code-reviewer (code-reviewer-hooks-015) | Round 13, the gate read of `39dbc0d..018f72d` (rev 24): APPROVED, no findings, `code-review/015-bug-evaluation-fixes-code-review.md` (`3960833`). CR-21 is RESOLVED. M4-d's non-JSON member holds at both webhook sites at website `da24eb7`; it is growth on M4, and its cell is owed by the implementer. M5-i's seed and the controlled accordion were both read, so the property can be built. D34/X-20, X-21 and the `NewMessageModal` row raise no finding. Milestone-scoped, so plan Status is unmoved. |
| 2026-11-08T08:14 | R-8 | planner (planner-hooks-015) | Parked architect AF-28's plan-side limbs (`1a3bc68`) as a Planner batch row; the handoff side was corrected at `116c361`. Scope delta: none, registration only. |
| 2026-11-08T08:15 | R-9 | planner (planner-hooks-015) | Parked critique cycle 7 L-C7-1 (LOW) as a Planner batch row; its words are in `critiques/015-bug-evaluation-fixes-cycle7-critique.md` (`1b5f3e8`). Scope delta: none, registration only. |
| 2026-11-08T08:19 | R-10 | planner (planner-hooks-015) | Recorded the outcome of the `NewMessageModal` seed read in its Planner batch row (implementer `fbe28b4`; planner source read `verification/015/m5-modal-seed-next-keying-read.txt`). Scope delta: none, registration only. |
| 2026-11-08T08:25 | cr | code-reviewer (code-reviewer-hooks-015) | Round 14, M6 at website `24ac49f` against rev 24: REJECTED for M6-a and F-45's class, `code-review/015-bug-evaluation-fixes-code-review.md` (`e0054f7`). M6-b to M6-l are met; QA Phase 2 may take them at `24ac49f`. CR-22 MEDIUM (implementer): a fence with an empty or whitespace-only line inside still renders no code block, a member of M6-a's "every fenced block". **For the planner: CR-23 LOW**, M6-a names `parseEmbedTitle`, which omits the code-block rule by construction: restate the title member. CR-24 MEDIUM (implementer, D28): two react-use `useMount` callbacks (`BottomPortal`, `ColorPickerWrapper`) return cleanups that never run. CR-17 and CR-19 are RESOLVED. Milestone-scoped: plan Status unmoved. |
| 2026-11-08T08:26 | 25 | planner (planner-hooks-015) | Folds code review Round 14 CR-23 (`e0054f7`) and discharges R-8 (AF-28, `1a3bc68`), R-9 (critique L-C7-1, `1b5f3e8`) and R-10 (the modal-seed reads). It is taken after all four gates approved rev 24, and it is the eighteenth revision since implementation approval. Naming `parseEmbedTitle` in M6-a was the planner's error since rev 4: titles have omitted code blocks by design since `d5f2dc8`. Dropping the member changes no code and restores the base behaviour, which steering may put to the owner if it reads this as a scope delta. Scope delta: M6-a drops the title member. Exclusions gain the L-C7-1 standing constraint, with clauses on X-16 and X-21. X-20 and D34 cite W-7. X-22 records the modal seed as not a defect. Against the ask: 47 of 50 findings fixed, F-15/F-39 closed as not reproducible, plus one rider and one D28 sibling. |
| 2026-11-08T08:28 | cr | code-reviewer (code-reviewer-hooks-015) | Round 15, the gate read of `018f72d..dd9e88a` (rev 25): APPROVED, no findings, `code-review/015-bug-evaluation-fixes-code-review.md` (`1d0059a`). CR-23 is RESOLVED: `parseEmbedTitle` omits `codeBlock` at `7ce866b`, first at `d5f2dc8`. CR-22 stands with the implementer. X-22's keying claim holds against next 16.1.6 by reading. |
| 2026-11-08T08:30 | R-11 | planner (planner-hooks-015) | Parked critique cycle 8 L-C8-1 (LOW) as a Planner batch row; its words are in `critiques/015-bug-evaluation-fixes-cycle8-critique.md` (`4429f17`). Scope delta: none, registration only. |
| 2026-11-08T08:36 | qa | qa (qa-hooks-015) | Phase 1 approves rev 25 (`983a84d`) with no new finding. Phase 2 at website `24ac49f`, milestone-scoped, each verdict in its own document. **M6-b to M6-l: QA Failed** on suite coverage (`qa/015-bug-evaluation-fixes-m6-qa.md`). QAF-30 MEDIUM: M6-l (vi)'s add gate above 40, the line's place, the live drop and `/preview` have no cell that discriminates them. QAF-31 MEDIUM: the nested duplicate cells cannot tell a copy placed before the original. QAF-32 LOW. No production defect was found. **M1 PASS** (QAF-26 RESOLVED). **M5-a to M5-g PASS** (QAF-29 RESOLVED; CR-19 refreshed). **M4's PASS is refreshed for CR-17**; its non-JSON member's scoped pass is still owed. Earlier milestone verdicts not rowed here: M4 Failed at `1e12837`, then PASS at `da24eb7`; M1 Failed at `3031878`; M5-a to M5-g Failed at `da24eb7`. Each is in its own document. Plan Status unmoved. |
| 2026-11-08T09:18 | cr | code-reviewer (code-reviewer-hooks-015) | Rounds 16 to 18 and sub-entries at website `476c633` and preview-image-generator `6c613a5`, `code-review/015-bug-evaluation-fixes-code-review.md` (`2fa6d8b`). CR-18 (M5-h), CR-22, CR-24 and CR-25 are RESOLVED; M5-h, M5-i, M6 and M7 are approved. M8 is REJECTED for M8-a: CR-27 MEDIUM, a failed drain still logs the drain-complete line that M8-0 run 2 counts. M8-b to M8-e are met; M8-d's `factoryCreateError` mechanism is accepted over the plan's rethrow-only sketch (CR-28 LOW). **For the planner: CR-29 LOW**, M5-h class (3) lists `fields: null` as crashing, and at the tip it renders (M6-c): restate class (3) against the tip, or move the member. |
| 2026-11-08T09:23 | 26 | planner (planner-hooks-015) | Folds the implementer's delivery 2 drifts (`3926486`), code review CR-29 and the M8-d wording read (`2fa6d8b`, plus its message on `min` 2), and critique L-C8-1 (R-11). It registers D35 (rulings 09:22Z, `f502eb5`). It is taken after all four gates approved rev 25, and it is the nineteenth revision since implementation approval. M8-d's "rejects in the pool factory" was a mechanism the plan should not have stated; the error was the planner's. Scope delta: M5-h (3) is anchored to the tip, and `fields: null` moves to rendering. M8-b refuses every non-object body (D35; `null` under D28). M8-d becomes a property with three limbs and an unmeasured per-request count. RK-8 is added. The M6-a note's provenance is corrected. No code changes. Against the ask: 47 of 50 findings fixed, F-15/F-39 closed as not reproducible, plus one rider and one D28 sibling. |
| 2026-11-08T09:25 | R-12 | planner (planner-hooks-015) | Recorded the architect's rev 26 verdict, APPROVED, in the owed re-verdicts row; its words are in `architecture/015-bug-evaluation-fixes-architecture-findings.md` (`7652b59`). Corrected that row's critic cycle to 9, as steering briefed. Scope delta: none, registration only. |
| 2026-11-08T09:26 | R-13 | planner (planner-hooks-015) | Recorded QA's rev 26 re-key, approved except QAF-33, in the owed re-verdicts row, and parked QAF-33 (MEDIUM) as a Planner batch row. Their words are in `qa/015-bug-evaluation-fixes-qa.md` (`9fdf439`). The array guard is routed to the implementer through steering. Scope delta: none, registration only. |
| 2026-11-08T09:26 | R-14 | planner (planner-hooks-015) | Registered D36, the owner's RK-8 selection; its words are in rulings block 09:25Z (`f5ab120`). Its criterion text is parked as a Planner batch row for rev 27. Scope delta: none, registration only. |
| 2026-11-08T09:29 | R-15 | planner (planner-hooks-015) | Parked the D35 re-put as a Planner batch row for rev 27; its words are in rulings block 09:28Z (`c8c7649`). Scope delta: none, registration only. |
| 2026-11-08T09:30 | R-16 | planner (planner-hooks-015) | Recorded critique cycle 9 pass 1, APPROVED, in the owed re-verdicts row, and parked M-C9-1, M-C9-2 and L-C9-1 as Planner batch rows; their words are in `critiques/015-bug-evaluation-fixes-cycle9-critique.md` (`e233c82`). Scope delta: none, registration only. |
| 2026-11-08T09:33 | cr | code-reviewer (code-reviewer-hooks-015) | Round 19, the gate read of `dd9e88a..c375d2c` (rev 26): REJECTED for M8-b's D35 limb only, `code-review/015-bug-evaluation-fixes-code-review.md`. CR-29 is RESOLVED: at website `476c633` with the guard commit reverted, all 44 class-probe members fall exactly on rev 26's crashing and rendering lists (`verification/015/cr-m5-probes/class-noguard-run1-476c633.txt`). **For the planner: CR-30 MEDIUM** duplicates QAF-33. Arrays reach `generateImage` at generator `6c613a5` (`cr-m8-probes/body-class-run1-6c613a5.txt`), and `null` crashes base `471578f` by execution. The 09:28Z re-put supersedes it; fold at rev 27 (R-15) and cite the run. **CR-31 LOW**: RK-8's falsity signature is not a hang. The renamed-field mutant exits the process with code 1 in 378 ms on node 24 (`cr-m8-probes/rk8-field-mutant-6c613a5.txt`). State it with D36's criterion at rev 27. M8-d's property and the L-C8-1 correction: no finding. Plan Status unmoved. |
| 2026-11-08T09:35 | 27 | planner (planner-hooks-015) | Folds the rev 26 verdicts: architect AF-30 (`7652b59`), QA QAF-33 (`9fdf439`), critique cycle 9 M-C9-1, M-C9-2 and L-C9-1 (`e233c82`), and code review Round 19 CR-30 and CR-31 (`5ab0802`). It writes D35 for the owner's re-put (09:28Z, `c8c7649`) and gives D36 (`f5ab120`) its criterion, discharging R-13 to R-16. RK-8's "hang" premise, shared by AF-30 and M-C9-2, was the planner's and is false (CR-31). This is the twentieth revision since implementation approval. Scope delta: M8-b is narrowed, so arrays are no longer refused (X-23). M8-d gains (d), a startup line (D36), and its per-request count becomes X-24. RK-8 gains its exit signature and a post-closure carrier minted at M9. M5-h (3) names its deciding enumerator and move rule. Code owed: the D36 startup line only, riding CR-27. Against the ask: 47 of 50 findings fixed, F-15/F-39 closed as not reproducible, plus one rider and one D28 sibling. |
| 2026-11-08T09:37 | R-17 | planner (planner-hooks-015) | Recorded the architect's rev 27 verdict, APPROVED, in the owed re-verdicts row; its words are in `architecture/015-bug-evaluation-fixes-architecture-findings.md` (`b2add20`). Scope delta: none, registration only. |
| 2026-11-08T09:38 | R-18 | planner (planner-hooks-015) | Recorded QA's rev 27 re-key, which passes, in the owed re-verdicts row, and parked its Assumption Not Checked on RK-8's carrier as a Planner batch row. Their words are in `qa/015-bug-evaluation-fixes-qa.md` (`b21c7b5`). Scope delta: none, registration only. |
| 2026-11-08T09:39 | R-19 | planner (planner-hooks-015) | Recorded code review Round 20 in the owed re-verdicts row and parked CR-32 and CR-33 (LOW) as Planner batch rows; their words are in `code-review/015-bug-evaluation-fixes-code-review.md` (`b5666ed`). Scope delta: none, registration only. |
| 2026-11-08T09:40 | cr | code-reviewer (code-reviewer-hooks-015) | Round 20, the gate read of `c375d2c..18d361c` (rev 27): APPROVED_WITH_COMMENTS, `code-review/015-bug-evaluation-fixes-code-review.md`. CR-30 and CR-31 are RESOLVED; M8-b is met at rev 27 at generator `6c613a5`. **For the planner: CR-32 LOW**: M5-h (3)'s re-run trigger leaves out `src/utils/limits.tsx` (`validateEmbedCharacterCount`, CR-20). Widen it to any non-test `src/` change, and cite `class-noguard-run2-476c633.txt`: the enumerator now reverses only guard commit `09c7c45`, with identical results. **CR-33 LOW**: M8-d (d) must name `_waitingClientsQueue` with a callable `dequeue`. With `dequeue` renamed and the field kept, the process exits with code 1 (`cr-m8-probes/rk8-method-mutant-6c613a5.txt`); the D36 guard checks both levels. Plan Status unmoved. |

## Value Statement and Business Objective

As a **community leader building Discord messages in Hooks.gg**, I want the defects the 2026-11-08 bug evaluation
found in the editor, the save path, the bot and the preview service fixed, so that **what I build is what saves,
what sends and what the preview shows** — a black embed saves, a Cancel key press never deletes, a multi-line code
block renders, a moderator with Manage Server can use *Get Message*, and a user who administers no server can open
the message list. This serves the Master Product Objective as the workspace README states it: a WYSIWYG Discord
message builder that sends through webhooks.

## Decisions Register

| # | Decision (every operative clause) | Date | Owner's words, verbatim — route | Reopened by | Consequence |
|---|---|---|---|---|---|
| D1 | Open chain 015 for this effort. | 2026-11-08 | "Agent: open the chain" — selection-prompt answer to the planner, 04:39Z, this session. | Owner withdrawal only. | ID 015 minted; `.next-id` → 16. |
| D2 | Start the chain; `researcher-competitors` holds Playwright, so no stage starts, stops, reinstalls or reconfigures Playwright or its browsers, or kills a browser process, while it is live; a stage needing a browser asks steering first. | 2026-11-08 | "Start the chain. Note that `researcher-competitors` is currently using playwright." — relayed by steering-bug-fixes, rulings block 04:37Z (`a111e80`). The constraint's operative clauses are steering's wording (agent-authored). | `researcher-competitors` no longer live (session-liveness read), or owner withdrawal. | Every browser-run criterion is placed behind a steering go (§ Testing Strategy). |
| D3 | A username stays required to send; no defect (OQ-1). | 2026-11-08 | "Even though it's not required by Discord, it's not always possible to know what webhook the user is going to send it as ahead of time, and I don't think it's necessarily bad UX to just make them set it explicitly so they know for sure what it's going to look like. This is a WYSIWYG editor after all." — **as recorded in the research document** (`aea4a05`); not yet confirmed by steering in this session. | Owner withdrawal; steering's confirmation differing from the record. | No milestone touches `validateMessage`'s username rule. |
| D4 | `get_message` is usable by members holding Manage Server (OQ-2); the value that expresses it is `ManageGuild` alone. | 2026-11-08 | "Manage Server is probably fine. Tengentially [sic] related, the system needs RBAC controls." — recorded in the research document (`aea4a05`), and confirmed as his by selection ("Agent: use both as rulings"), relayed by steering-bug-fixes, rulings block 04:49Z (`e8631f8`). The `ManageGuild`-alone reading is the researcher's (agent-authored, F-28 correction). | Owner withdrawal; a Discord observation (M7-a's check) that a Manage-Server-only member still cannot see the command after the push. | M7. |
| D5 | The message cap is 1000: the 1001st new message is refused (OQ-3 → planner's call). | 2026-11-08 | "idk" — recorded in the research document and confirmed as his by the same selection (04:49Z, `e8631f8`). The call is the planner's (agent-authored): the code's own error text, "limit of 1000", is the only statement of intent there is. | Owner states a different cap. | M1-d. |
| D6 | The candidate pool is F-1–F-50; H-1–H-8, the eleven handoffs in research § Findings 7, the RBAC remark and any security assessment are out; recommendation limbs (1)–(3) are in as owner-side checks, (4) out. | 2026-11-08 | Steering's scoping determination under "Start the chain" (agent-authored by steering-bug-fixes, `a111e80`). | Owner withdrawal. | § Exclusions rows X-5–X-8. |
| D7 | The implementer deletes `website/.next/dev/types` at M0; the typecheck gate is the repo's own `pnpm run typecheck`. | 2026-11-08 | "Agent: delete stale dir" — selection-prompt answer relayed by steering-bug-fixes, block 04:49Z (`e8631f8`). | `pnpm run typecheck` red at the base after the deletion. | M0. |
| D8 | F-43: footer bound 2048 in both the editor and the save check. F-40: an image URL is valid when its path ends in png, jpg, jpeg, webp, gif, apng, tiff or webm, in any case, with the query string ignored; avif is excluded. | 2026-11-08 | "Agent: fix both" — selection, same block. The option text was the planner's (agent-authored, rev-1 relay). | Owner withdrawal; a Discord read showing a listed extension unrendered. | M2-d, M6-b. |
| D9 | Every duplicate, top-level and nested, inserts the copy after the original. | 2026-11-08 | "Agent: both after" — selection, same block. | Owner withdrawal only. | M6-i. |
| D10 | F-44: an add that crosses the 40-component cap goes through, and the message is marked invalid until fixed. | 2026-11-08 | "Agent: allow, mark invalid" — selection, same block, chosen against the planner's recommendation. | Owner withdrawal only. | M6-l. The criterion's wording is the planner's reading of "allow" (§ M6-l). |
| D11 | M8 stays in the chain; it deploys to the preview instance first, then prod; the planner commissions the F-31 analyst. | 2026-11-08 | "Agent: keep, preview first" — selection, same block. | Owner withdrawal; the preview deploy failing (RK-3). | **Superseded by D16** (05:26Z): the preview leg is withdrawn; M8 stays and the analyst was commissioned. |
| D12 | The generator host is a DigitalOcean box with no read-only user, so no agent reads it. | 2026-11-08 | "pretty sure it's a digital ocean box. there is no ro user on it" — his own words, relayed by steering, same block. | A read-only user created there. | **Reopened by its own class** (a read-only user created; reachability read 05:20Z) and **superseded by D17**. |
| D13 | The plain-text API key in the generator's workflows goes to a handoff, out of chain, recording no value. | 2026-11-08 | "Agent: handoff, out of chain" — selection, same block. | Owner withdrawal only. | X-12. |
| D14 | M6-l's reading of D10 stands: every add completes; the existing top-level refusal at 40 stays; a total over 40 fails `validateMessage`, so Send is blocked and `valid` is false. | 2026-11-08 | "Agent: use this reading" — selection relayed by steering-hooks-015, rulings block 05:11Z (`9247ddb`). The option text is steering's (agent-authored). | Owner withdrawal only. | M6-l unchanged; the reading is now his. |
| D15 | He will create a read-only user on the generator host himself; steering supplies the commands and the firewall rules. | 2026-11-08 | "give me the code to add the ro user to the box, in addition to what firewall rule(s) to add" — his own words, relayed by steering-hooks-015, block 05:11Z (`9247ddb`). | Owner withdrawal; the user's absence on a reachability read. | **Met** 05:20Z (steering's reachability read); for M8-0's route, **superseded by D17**. |
| D16 | M8 deploys straight to prod, and the `preview` branch is deleted. | 2026-11-08 | "straight to prod. delete the preview branch" — his own words, relayed by steering-hooks-015, block 05:26Z (`a16e431`), given after steering told him the branch is 0 commits ahead of prod and no preview app exists. Steering deleted the branch on his word. | Owner withdrawal only. | M8 has no beta host. The transition stop and the verifying stop are both on production (M8-a). |
| D17 | `claude-ro` reads on the generator host are standing: reads only, never a pm2 command, never a write. | 2026-11-08 | "Agent: standing reads" — selection relayed by steering-hooks-015, block 05:21Z (`42354bf`); the option text is steering's (agent-authored). | Owner withdrawal; the access removed. | M8-0 is an agent read. |
| D18 | Root `dump.pm2` is read only through a host-side filter that prints name, `kill_timeout` and `shutdown_with_message` per app; env is never printed. `/home/nodejs/.pm2/dump.pm2` is never opened. | 2026-11-08 | "Agent: filtered extract only" — selection, block 05:24Z (`8d2d82f`); "You: remove the access" for the nodejs dump — selection, block 05:21Z. The option texts are steering's (agent-authored). | Owner withdrawal only. | M8-0's dump read. |
| D19 | M8's verifying stop is caused by devops re-running `prod.yml` through `workflow_dispatch` after the prod push; that run is a second production deploy and needs his approval like any prod push; an agent reads the result over `claude-ro`. | 2026-11-08 | "Agent: re-run prod.yml" — selection relayed by steering-hooks-015, block 05:29Z (`fa693e0`); the option text is the planner's (agent-authored, rev-4 relay). | Owner withdrawal only. | M8-a (2), M8-0 run 2, M9. |
| D20 | The Playwright constraint of D2 is lifted: chain-015 stages may use Playwright and browsers; installing or upgrading Playwright is not implied. | 2026-11-08 | "the researcher is done. playwright is now available" — his own words, relayed by steering-hooks-015, block 05:33Z (`d852da1`). | Owner withdrawal only. | Retires D2's constraint class. It releases the steering-go gates at § M8's verification paragraph (M8-c may run locally with a browser), § Testing Strategy (agent browser use) and RK-5's untested note. The body text is folded at the next planning pass (Planner batch). |
| D21 | M1-h closes both rejection-handler windows in `hydratedAuthCallback`: during the guild fetch and during the account lookup. The implementer makes the further change; code review and QA re-check M1-h once. | 2026-11-08 | "Agent: fix both windows" — selection relayed by steering-hooks-015, rulings block 06:25Z "OQ-I" (`33928c8`). The option text is the planner's (agent-authored, rev 9 relay). The probe premise behind it is `verification/015/m1h-rejection-window-probe-run1.txt`, which steering read. | Owner withdrawal only. | M1-h's property (§ M1-h). OQ-I is closed. |
| D22 | M1-c is fixed in this chain: sign-out always clears both cached session entries (`user-access-token`, `user-session-token`), a database error included, and the error still reaches the caller. Residue: `user-guilds` (600 s), the revoke and the `Accounts` update on that path. | 2026-11-08 | "Agent: fix it in this chain" — selection relayed by steering-hooks-015, rulings block 06:29Z "AF-17 sign-out gap" (`904ec0d`). The option text is steering's (agent-authored), built from the planner's proposal. | Owner withdrawal only. | M1-c's lookup-error cell. M1-c reopens for one change, one code-review round and one QA Phase 2 re-run. |
| D23 | The run-2 span's clock premise is recorded as a stated assumption beside the check — "the box runs in UTC" — with no rewrite of the requirement; the critic, the architect and QA do not re-read it again. | 2026-11-08 | "Agent: record as assumption" — selection relayed by steering-hooks-015, rulings block 06:39Z "L-C3-4" (`7faa2e0`). The option text is steering's (agent-authored): "Agent: the planner records 'the box runs in UTC' as a stated assumption beside the check, with no rewrite of the requirement. The critic, architect and QA don't re-read it again. If the box's time zone ever changes, the window could be off by the offset." Steering read the premise at 06:37Z (`Etc/UTC`). | Owner withdrawal; the host's time zone read as other than UTC. | Rev 12's added run-2 checks (`date +%z`, the `online`/ready comparison, no span on a mismatch) are withdrawn at rev 13. |
| D24 | M4-d: an old-message fetch that fails with no response shows "Could not load the message. Check your connection and try again."; Discord refusals keep their texts; the message box accepts only an all-digits id or a Discord message link (discord.com/channels/<server>/<channel>/<message>), and anything else is refused before fetching. | 2026-11-08 | "Agent: implementer's text" and "Agent: digits or Discord link" — two selections relayed by steering-hooks-015, rulings block 06:45Z "M4-d flow questions" (`9b94838`). The option texts are steering's; the error text is the implementer's (agent-authored). | Owner withdrawal only. | M4-d. Hosts were not asked. The planner mirrors the shared `DISCORD_MESSAGE_LINK_REGEX` (§ M4-d), which D24's words do not settle; a different host set from the owner reopens that limb only. |
| D25 | M4-d's message box also admits discordapp.com message links, beside the site's pattern (discord.com with optional www., canary. or ptb.). | 2026-11-08 | "Agent: also discordapp.com" — selection relayed by steering-hooks-015, rulings block 06:50Z "M4-d link hosts" (`9f97a5f`). The option text is steering's (agent-authored): "Agent: the site's pattern plus old discordapp.com links. The planner would then decide whether the New Message dialog gets the same change (a further scope question)." | Owner withdrawal only. | M4-d's host set. Where the pattern lives is OQ-J. The planner's bare-host reading was overridden by D26. |
| D26 | OQ-J: the shared `DISCORD_MESSAGE_LINK_REGEX` widens once, so M4-d's edit box, the New Message dialog's link load and `message.getFromUrl` all accept discordapp.com links, the New Message dialog's behaviour change being accepted; and discordapp.com takes an optional www., canary. or ptb., as discord.com does. | 2026-11-08 | "Agent: widen the shared rule" and "Agent: all variants" — two selections relayed by steering-hooks-015, rulings block 06:52Z "OQ-J" (`7207289`). The option texts are steering's, drawn from the planner's relay (agent-authored). | Owner withdrawal only. | M4-d's link class and its two consumers (§ M4-d). OQ-J is closed. |
| D27 | CR-12 is fixed in chain 015: M4-d refuses unless the fetched message's channel belongs to the server the caller was checked against; the hole stays open until chain 015 releases. | 2026-11-08 | "Agent: fix it in chain 015" — selection relayed by steering-hooks-015, rulings block 07:01Z "CR-12" (`3d7af67`). The option text is steering's (agent-authored): "Agent: the planner adds it to M4-d: refuse unless the fetched message's channel belongs to the server you were checked against. Cost: a plan revision with one more review round on M4-d, one change, code review and QA. It reaches production only when chain 015 releases, after all its milestones (hours at least), so the hole stays open until then." | Owner withdrawal only. | M4-d's named rider, with its drop disposition priced. |
| D28 | The same defect at a sibling site of a finding the chain already fixes is fixed at every site without coming to the owner (the class of M-C4-1). | 2026-11-08 | "I already ruled on this class of item. Yes fix." — his own words, relayed by steering-hooks-015, rulings block 07:01Z "M-C4-1" (`3d7af67`). The class wording is steering's summary ("Same-defect-in-a-sibling items no longer come to him"), agent-authored. | Owner withdrawal only. | M4-d's two sites stand (rev 17). Later members of the class are folded and reported, never asked. |
| D29 | CR-14: a webhook-URL load that fails with no response shows "Invalid URL" at both F-27 sites; the New Message dialog copies the send page. | 2026-11-08 | "Agent: 'Invalid URL' at both" — selection relayed by steering-hooks-015, rulings block 07:24Z "CR-14" (`27f8cd7`). Description chosen: "Agent: the New Message dialog copies the send page. One small change and a test at each place. A dropped connection then tells the user the URL is wrong, as the send page already does today. Cost: a plan revision with a review round, then a code change, code review and QA re-run on M4 (planner's recommendation)." The label is steering's and the description the planner's (agent-authored; rulings `27f8cd7`, critique L-C5-1). | Owner withdrawal only. | M4-d's webhook-load limb. The site behaviour it rests on is the planner's code read at `1e12837`, not run. |
| D30 | M3 is removed from the chain. F-15/F-39 are recorded as not reproducible (dead code only). The value statement's "a Cancel key press never deletes" is kept as already true, with the real-Chrome read as its evidence. No code. | 2026-11-08 | "Agent: drop M3, not a defect" — selection relayed by steering-hooks-015, rulings block 07:26Z "M3: drop M3, not a defect" (`f005cef`). Description chosen: "Agent: M3 is removed from the chain, and F-15/F-39 are recorded as not reproducible (dead code only). The plan's promise 'a Cancel key press never deletes' is kept as already true, with the Chrome read as evidence. Cost: a small plan revision and a review round; no code (implementer's recommendation)." The option text is steering's (agent-authored). | A real-browser read in which Enter with focus on a dialog's non-confirm button runs the confirm action (the X-18 residue included), or a user report of it; owner withdrawal. | § M3 (removed), X-18. Evidence: `verification/015/m3-chrome-read/README.md` (`8996505`). |
| D31 | M5-h: every `/preview` `data` value that is not a JSON object (a number, a string, a list, `null`) shows "Invalid message data.", as built; no code change. | 2026-11-08 | "Agent: error line for them too" — selection relayed by steering-hooks-015, rulings block 07:52Z (`c1be05e`). The option text is the planner's (agent-authored, relayed by steering). | Owner withdrawal only. | M5-h class (2). Its premise is the implementer's jsdom probe (`verification/015/m5h-preview-data-probe-6c42032.txt`); real Chrome was not read. |
| D32 | M6-l: while the total exceeds 40, "Message has N components; the limit is 40." (N live) shows in red under the components, with a red border, in the editor and on the Send page, following the text-length errors; the Add Component button and counter still hide at 40 and over. | 2026-11-08 | "Agent: red line + red border" — selection relayed by steering-hooks-015, rulings block 07:52Z (`c1be05e`). The option text is the implementer's, relayed by steering (agent-authored). | Owner withdrawal only. | M6-l (vi). Its premise is the implementer's code read; steering did not read it. |
| D33 | M6-l: the over-40 line and border also show on `/preview`, so an over-40 message's generated preview image carries them, exactly as the text-length errors already do. | 2026-11-08 | "Agent: same as siblings" — selection relayed by steering-hooks-015, rulings block 08:02Z "AF-25" (`9f321b8`). The option text is steering's (agent-authored). | Owner withdrawal only. | M6-l (vi). Its premise is the architect's read (`5581822`, D-003); steering did not read it. |
| D34 | AF-26: a Hooks user holding several Discord `Accounts` rows is a known limit, with no code in chain 015. An Exclusions row plus a handoff carry both sites (`removeUserSession`, `fetchUserAccount`), reopened if such a user is found or reported. | 2026-11-08 | "what do you mean by \"linking a second Discord account\"? If someone signs in with a different account, that's a different Hooks user" — his own words, then "Agent: record as known limit" by selection after steering's explanation; both relayed by steering-hooks-015, rulings block 08:10Z "AF-26" (`766bd4b`). The option text is steering's (agent-authored). | A user with more than one Discord row found or reported (the handoff's trigger); owner withdrawal. | X-20; the sentence is recorded as the standing rule `architecture/website.md` W-7 (`952e69f`); `handoff/one-hooks-user-several-discord-accounts-2026-11-08.md`. |
| D35 | M8-b: a `/generate` body that is not parsable JSON, or parses to `null`, a number, a string or a boolean, gets 500. A body that parses to a list (an array) is not refused: it goes on to image generation as an object body does. | 2026-11-08 | First, "Agent: refuse all, as built", relayed by steering-hooks-015 in rulings block 09:22Z (`f502eb5`). Its stated cost, "no code change", was the planner's error: lists passed the built guard (QAF-33). Then, superseding it for lists only, "Agent: as built, lists pass", re-put with the corrected cost in rulings block 09:28Z (`c8c7649`). Its description, verbatim: "Agent: keep exactly what's built. Lists keep getting through to the image step, recorded as a known limit. Cost: a plan revision narrowing your earlier wording, and a review round." Both selections relayed by steering. Both option texts are agent-authored: the planner's, then steering's. | Owner withdrawal only. | M8-b; X-23. "Only the website calls `/generate`" is the planner's claim, unread; QA sends it to devops at release readiness. |
| D36 | RK-8: M8-d keeps its private-field reach, and the generator gets a startup check that logs a named error line if that private part is missing. | 2026-11-08 | "Agent: accept + startup guard". This is a selection relayed by steering-hooks-015, rulings block 09:25Z "RK-8, the M8-d private-field reach" (`f5ab120`). The description chosen, verbatim: "Agent: keep the fix, and the implementer adds a check at startup. If a library upgrade ever removes the private part, the generator logs a named error line instead of failing silently (architect's AF-30). Cost: a few lines and one test, riding the M8-a fix already under way, with the same code review and QA." The option text is steering's, drawn from AF-30 (agent-authored). | A generic-pool release that adds a public way to reject a waiting acquire. RK-8's lockfile trigger observes it. | M8-d and RK-8. The guard rides the CR-27 fix. Its criterion is written at rev 27 (Planner batch). |

## Objective

Fix 49 rated intent-vs-execution defects at their sites, each under a property-form criterion with a red test where
the repository carries a runner, ship them to production on website and preview-image-generator, and run the three
owner-side checks the scoping admitted.

## Assumptions and open questions

Every finding's location and rating were read at the same SHAs as today's tips: website `7ce866b`,
preview-image-generator `471578f` (prod), project-utils `749606d` (`git rev-parse`, 2026-11-08, equal to
`git ls-remote` heads). The research's ratings are carried, not re-rated. Spot re-reads this pass (`grep -rn` at
`7ce866b`): the dead compare `tagName !== '~/components/Button'` at exactly three sites (`grep -rc "tagName !==
'~/components/Button'" src`, 3 files at 1 each, re-run 2026-11-08; `grep -rln "useHotkeys(\['enter'\]" src` names
the same three) (`ConfirmationDialog.tsx` `Inner`,
`WarningDialog.tsx` `WarningDialog`, `ImageUploader.tsx` hotkey handler); `ADMIN_PERMS` in
`bot/scripts/app_commands/common.ts`, consumed by `messageCommands.ts` only; `MAX_EMBED_FOOTER_TEXT_LENGTH = 256`
feeding `shapes.ts` `embedShape` and `EmbedFooter.tsx`; `~/components/Button` renders a `<button>` element
(`Button.tsx`).

- OPEN QUESTION [RESOLVED]: OQ-A (typecheck gate) — D7. The gate fails only because of
  `.next/dev/types/validator.ts`: the planner's run at `7ce866b` exited 1 with 2 `error TS` lines, both in that
  file. The file is git-ignored output of a 2026-09-08 `next dev`.
- OPEN QUESTION [RESOLVED]: OQ-B (what the editor allows, `website.md` W-2) — D8.
- OPEN QUESTION [RESOLVED]: OQ-C (F-49 placement) — D9.
- OPEN QUESTION [RESOLVED]: OQ-D (F-44) — D10; F-44 is in, as M6-l.
- OPEN QUESTION [RESOLVED]: OQ-E (preview-image-generator) — D11. M8 is the service's first deploy since
  2023-08-22 (`git log -1 prod`), on a self-hosted runner. `prod.yml` keys the cached `node_modules` on the
  lockfile, runs `npm run build`, then `.github/deploy.sh` → `pm2 startOrReload ecosystem.config.js --update-env`.
- OPEN QUESTION [RESOLVED]: OQ-F (generator host) — D12. No agent reads the host; limb (3) becomes owner step M8-0.
- Analysis complete: `analysis/015-bug-evaluation-fixes-analysis.md` (`7e24de3`), F-31's premise.
  - **Stop path.** Read from PM2 source at 5.3.0, 5.4.3, 6.0.14 and 7.1.2. With `shutdown_with_message: true`,
    `lib/God/Methods.js` `God.killProcess` sends the IPC message `'shutdown'` and never SIGINT. SIGINT is used
    only when the process has no IPC channel, and fork mode always has one. After `kill_timeout`, SIGKILL
    follows. The planner re-read `God.killProcess` at 5.3.0 and found the `shutdown_with_message == true` branch
    calling `proc.send('shutdown')`.
  - **Consequence.** `server.ts` handles SIGINT only, so the drain has never run under PM2. F-31's framing, "cut
    off before its own fallback", understates it.
  - **Deploys.** `startOrReload --update-env` applies changed keys on the deploy that carries them, but a key
    deleted from the file keeps its stored value.
  - **Host reads.** The analysis's § Host observation lists the read-only commands M8-0 runs.

  Owner step M8-0 confirms all of this on the host.

## Plan

Milestones are independent of one another except M0 (first) and M9 (last). Each fix lands at its finding's site;
every criterion is a property over the class the finding names. Rollback for every website milestone: `git -C
website revert <commit>` on the chain branch, by the implementer before merge; after release, devops reverts on
`master` and pushes (production push, owner-approved). Lockfile: no milestone adds or moves a dependency; a moved
pin in `pnpm-lock.yaml` or `package-lock.json` is a criterion failure.

The re-derivation gate: M1-d, M2, M6-b and M6-l change product behaviour (a stored representation the schema admits, an
operational limit, an accepted input class). At implementation approval every milestone M0–M9 is approved
together, so the gate's population is empty; a milestone the owner withholds from that approval is marked
`PREMISE-STALE` until re-argued.

**Re-derivation after M1 (rev 9).** M1, delivered at website `be881c9`, ships five behaviours observable outside
the source: sign-out revokes the Discord token; the 1001st new message is refused; a bad signature with
malformed JSON gets 401; a cached `null` is a hit for 600 s; the client env guard refuses server keys. Steering
recorded implementation start for the plan as a whole (rulings block 05:50Z, `7efd8b0`), so no milestone is
marked `PREMISE-STALE`. Read 2026-11-08 (critic L-C3-3): that block records the gates' approvals of rev 7 and
the implementer's start at M0, and no owner approval of M2–M9. M2–M9 had not begun, so they are in the gate's
population. This paragraph is their re-argument, reviewed with rev 9. M2–M7 touch the editor, the save schema, the send page and the bot. None of them reads sign-out,
the cap, the signature path, the account cache or a server env key from the client. So each still does what M1
does not, and none of its premises moves. M8 is another repository. M9 and § Validation gain one consequence:
any walk that signs out revokes that account's Discord token and must sign in again (QA I-2).

**Re-derivation after M2 (rev 13).** M2, delivered at website `6001f7f`, ships four behaviours observable outside
the source: colour 0 saves, colour 0 is kept on ingress, colour 0 draws a black border, and footer text of 2048
and an author name of 256 are admitted in both the editor and the save schema.
- M4 (send page), M5 (pages and providers), M7 (bot) and M8 (generator) read no stored
  colour or footer bound, so their premises do not move.
- M6-f (the picker's six-digit default) now also sees colour 0 stored. Its property already covers every
  integer colour, 0 included.
- M6-j (a footer without `text`) and M6-c (hiding an embed with nothing displayable) do not read the bounds.
- Downstream consumers of the stored values are RK-2.
No milestone is marked `PREMISE-STALE`.

### M0 — Baseline and gate instrument (first; blocks every other milestone)

- Record at the chain branch's base: `npx vitest run --reporter=json` counters and process exit, beside the
  planner's read of 2026-11-08 at `7ce866b`: 598 tests, 598 passed, 0 failed, 54 files, exit 0.
- Typecheck gate (D7): delete `website/.next/dev/types` (git-ignored; regenerated by the next `next dev` or
  `next build`), after `pgrep -af "next dev"` shows no process for this tree. Acceptance: `pnpm run typecheck`
  exits 0 at the base before any source change, and the deletion is the only act on `.next`. That command is the
  gate at every later milestone.
- Held shared state: `website/node_modules` (installed by researcher-bugs) is not reinstalled or wiped; no
  milestone needs an install.

### M1 — Server and data path (website): F-1, F-2, F-3, F-4, F-5, F-6, F-7, F-8, F-9, F-10, F-11

- **M1-a (F-2)** — the originating statement, verbatim: *"Empty-array `in` predicates compile to `in ()`, a
  Postgres syntax error."*
  - **The class.** Every Kysely `in` predicate under `src/server` over a list that can be empty. `grep -rn
    "'in'," src/server` (architect AF-2, re-read by the planner at `7ce866b`) returns four sites:
    - `shared.ts` `getPartialMessages` and `getUserRecentMessages`. These are live: a user who administers no
      server reaches the first, and an empty `recentMessageIds` reaches the second.
    - `user.ts` `authorizeUser` and `authorizeGuildUser.ts` `getOldMessages`. These are latent: their only route
      is `message.ts`, through `authorizeAction` and through direct calls with `message.id` (architect AF-12).
      Every caller passes a single id, never a list. That id is wrapped as a one-item list, so no empty list
      reaches them at `7ce866b`.
  - **Property.** At every member, for the inputs {empty list, non-empty list}, no compiled SQL contains `in ()`.
    An empty list returns before the query is built, and the result is what an empty `in` set means at that site:
    - `getPartialMessages` keeps the user's own messages and drops only the guild `exists` limb;
    - `getUserRecentMessages` returns no messages;
    - `authorizeUser` and `getOldMessages` treat the list as naming no messages.
  - **Independence.** The expected SQL shape is a literal, never produced by the function under test.
- **M1-b (F-1)** — every compiled cron selection filters `ScheduledMessages.error` with `is null`. Residue (stated
  limit): no producer inserts into `ScheduledMessages` (research F-1), so the fix has no observable effect in
  production.
- **M1-c (F-3)** — the revoke request `removeUserSession` sends carries `token` set to the account's access token
  for every session with one; a session with no access token sends no revoke request.
  - **Clear-out (QA QAF-3).** The DB and Redis clear-out runs for every session in the class:
    - token present, with the revoke answering 2xx, answering non-2xx, or rejecting (a network failure);
    - token absent;
    - no account found;
    - the lookup failing with any other error, for which the Redis limb only applies (D22, below).
  - **The no-account cell (critic L-C2-1, architect AF-15, QA QAF-7).** `clearUser` (`src/utils/redis/index.ts`)
    deletes three keys, and the third, `user-guilds`, is keyed on the account's `providerAccountId`. The
    `Accounts` update is keyed on it too. So with no account found, `removeUserSession` deletes exactly the
    `user-access-token` and `user-session-token` keys. It issues no `Accounts` update and sends no revoke.
    Residue (stated limit): the `user-guilds` entry is not addressable and expires on its own 600 s TTL
    (`fetchUserGuilds`, `expireSeconds: 600`, read at `7ce866b`).
  - **The session row is outside M1-c (architect AF-16, critic L-C2-4, QA QAF-9).** next-auth 4.24.5 (installed)
    deletes the `Sessions` row in its signout route, `adapter.deleteSession(sessionToken)`, and only then fires
    `events.signOut`, which calls `removeUserSession` (`next-auth/core/routes/signout.js`, read by the planner,
    the architect and QA). No cell of M1-c asserts the row's removal, and `removeUserSession` does not delete it
    a second time.
  - **"No account found" (implementation M1 Outstanding Item 1; confirmed).** At `7ce866b` an absent `Accounts`
    row never reaches `removeUserSession`'s `Expected to find account` throw. `fetchUserAccount`'s loader runs
    `executeTakeFirstOrThrow()` (`src/utils/redis/index.ts`), so it raises Kysely's `NoResultError` (read by the
    planner at `7ce866b`).
  - **The account decision rests on the row (code review CR-3; rev 12).** Whether sign-out treats an account as
    existing, and the access token it revokes and clears, are read from the `Accounts` row at sign-out. They are
    never read from a value cached under `user-access-token:<userDbId>`.
    - **Why.** That key is shared with the `skipUpdate = false` loader, which caches `null` for a usable-account
      failure: no `refresh_token`, or a refused refresh (CR-3's enumeration at `be881c9`, 3 readers and 2
      `null` producers). Since M1-j (`a2592f0`), sign-out read that `null` as "no account" and skipped the
      revoke and the `Accounts` update for an existing row. Code review measured it at `7b10f4e` (full clear-out)
      against `a2592f0` and `be881c9` (none); captures in `verification/015/cr-m1-probes/`.
    - **The class.** The cache key holds nothing (a miss), holds an account, or holds `null` from either
      producer. Every member gives the same outcome as the miss for the same `Accounts` row.
    - **"No account found"** is exactly the row being absent (`NoResultError`). Rev 9's "falsy return" member is
      withdrawn: it read the cached `null` as no account.
  - **A lookup error (D22; architect AF-17).** Any other lookup error, such as Postgres unreachable, still
    reaches the caller. Before it does, `removeUserSession` deletes both keys addressable from its own
    arguments: `user-access-token:<userDbId>` and `user-session-token:<sessionToken>`.
    - **Why.** `user-session-token` is `fetchAccountFromSession`'s 600 s session→account cache, holding
      `access_token`. `authorizeGuildAdmin.ts` trusts it without re-reading `Sessions` (read at `be881c9` by the
      planner, the architect and steering). Left in place, a signed-out cookie would pass the guild-admin check
      for up to 600 s.
    - **At the base.** At `7ce866b`, any lookup error also aborted before the clear-out: `fetchUserAccount` throws
      before `clearUser` is reached in `removeUserSession` (planner's read).
    - **Residue (stated limit).** On this path, `user-guilds` (600 s TTL), the `Accounts` update and the revoke
      cannot be addressed without the account.
    - **Literal outcome for the input "the lookup rejects with an error other than `NoResultError`":** both keys
      are deleted, and then the caller receives that rejection.
    - **If the key deletion also fails (QA QAF-15):** the caller still receives the lookup's rejection, not the
      Redis error. No `unhandledRejection` is emitted.
  - **Ordering.** A failed revoke never prevents sign-out. The access token is read before the `Accounts`
    update sets `access_token` to null. At `7ce866b`, a rejected `fetch` aborts before the clear-out.
- **M1-d (F-4, D5)** — the inputs are {existing message, new message} × {count < 1000, count = 1000} ×
  {user-scoped save, guild-scoped save}. The count is the owner's messages: the user's (`fk_users_id`) or the
  guild's (`fk_guilds_id`), per `upsertMessage`'s `isUserSelect(select)`. A new message is refused exactly when
  that count before the insert is ≥ 1000, with today's error text. An existing message is never refused by the
  cap.
  - **Stated limit (QA QAF-4; X-16).** Concurrency is outside the property. `upsertMessage` counts, then inserts,
    with no lock or constraint, so two concurrent saves at 999 can both pass. Fixing that needs a constraint or a
    transaction, which is beyond F-4's comparator.
- **M1-e (F-5)** — `userOrDiscordIdShape` accepts exactly `"0"` and strings of 17–23 decimal digits; every
  other string is refused (members: `"0abc"`, `"00"`, a 16-digit and a 24-digit string).
- **M1-f (F-6)** — in the client branch of the `env.mjs` proxy, reading `NODE_ENV` is not refused; reading any
  other non-`NEXT_PUBLIC_` server key is refused.
  - **Premise corrected (M1 Outstanding Item 3).** The refusal is new behaviour, not kept behaviour. At
    `7ce866b` the guard `!prop === 'NODE_ENV'` is always false, so the proxy refused no key. The client read
    that this now throws on is RK-7.
- **M1-g (F-7)** — `interactions-edge` `handler`: a request whose signature does not verify gets 401 whatever its
  body (members: malformed JSON, valid JSON); the body is parsed only after verification.
- **M1-h (F-8)** — the originating statement, verbatim: *"`Promise.all` with an inner `await` runs
  sequentially."* Rev 8's criterion, "the guild fetch and the message fetch are both started before either is
  awaited", already holds at `7ce866b` (M1 Outstanding Item 2). The message fetch starts before the account
  lookup, so it overlaps the guild fetch. The defect that remains is a rejection-handler gap: while the
  inner `await` runs, `messagePromise` has no handler.
  - OPEN QUESTION [RESOLVED]: OQ-I (how far the F-8 fix goes) — D21, "fix both windows".
  - **The second window.** The same gap has a second member in the same function:
    `await redis.fetchUserAccount(userDbId)` runs while `messagePromise` has no handler. The planner's probe shows
    the window lasts the whole account lookup, not one tick. A promise rejecting during a 20 ms await, with its
    handler attached afterwards, raised `unhandledRejection` on Node v24.14.0
    (`verification/015/m1h-rejection-window-probe.mjs`; capture `m1h-rejection-window-probe-run1.txt`,
    2026-11-08T06:22Z).
  - **Property (D21: "fix both windows"; critic M-C3-2, QA QAF-12).** Every promise `hydratedAuthCallback`
    starts has a rejection handler attached before the function next awaits anything else **or returns**. So no
    exit path leaves a started promise unhandled, and a rejection that settles after the function has returned
    emits no `unhandledRejection`.
    - **The class, enumerated at `be881c9`:** the message fetch (M, `getUserRecentMessages`), the account lookup
      (A, `redis.fetchUserAccount`) and the guild fetch (G, `redis.fetchUserGuilds`). G is started only when A
      yields an account with an access token. The class is enumerated from the function's own calls, not by a grep
      for one variable name.
    - **Decision table.** Every combination of how A ends, how M ends and when, and how G ends maps to what the
      caller receives. In every row, 0 `unhandledRejection` events are emitted over the run, including after the
      function returns. The rows are the criterion; the prose above reads them.

      | A | M | G | Caller receives |
      |---|---|---|---|
      | rejects | resolves, or rejects before or after A | not started | A's rejection |
      | resolves falsy (no account) | resolves, or rejects before or after A | not started | `{}` |
      | account, no access token | resolves | not started | the session |
      | account, no access token | rejects, at any time | not started | M's rejection |
      | account with token | resolves | resolves | the session |
      | account with token | rejects during A, during G, or after G has settled | resolves | M's rejection |
      | account with token | resolves | rejects | G's rejection |
      | account with token | rejects | rejects | the first of the two to settle (`Promise.all`) |

      Rows 1 and 2 with M rejecting after A are the paths where the function leaves without awaiting M (QAF-12
      (a) and (b); M-C3-2). A catch-and-rethrow around A alone passes the other rows and fails these two.
    - **Reopening and cost.** M1-h reopens to close the account-lookup window: one further change in
      `hydratedAuthCallback`, one code-review round and one QA Phase 2 re-run for M1-h.
- **M1-i (F-9)** — originating statement, verbatim: *"Cookie parser throws on a nameless cookie and truncates
  values containing `=`."*
  - **Subject restated at rev 13.** Code review's CR-4 remedy (website `6001f7f`) deleted `parseServerCookies`.
    `Redirects/Server.tsx`, its one caller, now reads the session cookie through Next's own `cookies()`
    (`next/headers`). That mirrors the framework's parser and leaves no project parser to fix.
  - **Property.** For every `Cookie` header the request grammar admits, the server redirect component renders
    without throwing. That covers a segment with no `=`, `=` inside a value, legal `%` octets, and no cookie at
    all. It redirects exactly when `cookies()` (`next/headers`) returns neither `__Secure-next-auth.session-token`
    nor `next-auth.session-token`, and the path is neither `/message/m/0/edit` nor `/message/m/0/send`.
  - **"Present" is what `cookies()` returns (code review CR-7; QA QAF-18).** Residue (stated limit): Next's
    parser differs from the raw header for two input classes the grammar admits.
    - A session pair whose value fails to decode (`ab%`, `%zz`) is reported absent, so the request is
      redirected.
    - A bare `next-auth.session-token` with no `=` is reported present (value `"true"`), so it is not
      redirected.
    next-auth writes neither form. Evidence: QA's probe `verification/015/qa-m1i-cookie-presence-probe.cjs`, run
    1, and code review's `cr-m1-cookie-reattack-run1.txt`.
- **M1-j (F-10)** — a cached `null` is a hit: a second call within `expireSeconds` for an account with no refresh
  token, or a session with no account, does not query Postgres.
- **M1-k (F-11)** — with `NEXT_PUBLIC_CDN_PORT` set in development, the URL is `<host>:<port>/dev/…`.

The website-api-handler-hardening handoff's trigger fires on M1 (edits under `src/pages/api/` and `env.mjs`);
disposition X-9.

### M2 — Limits and the save schema (website): F-12, F-13, F-14, F-43

- **M2-a (F-12)** — originating statement: *"A black embed cannot be saved."* Property: for every integer colour
  in [0, 16777215] the editor can produce, `embedShape` admits it, so a message whose only fault would have been
  `color: 0` saves; `discordResponseToMessage` keeps `color` whenever the response carries the field, 0
  included. Human-observable: pick black in the colour picker, save, reload — the embed is black. Walked on the
  locally served chain tip (§ Validation).
  - **The class behind the observable (rev 13; implementation M2).** It is every site that tests an integer
    colour for truthiness, so that 0 reads as "no colour". The implementer's sweep (E15 in the M2 implementation
    document) found two members at `7ce866b`: `discordResponseToMessage.ts` and the `EmbedEditor` border
    (`EmbedEditor/index.tsx`). For colour 0, the border draws black. `ContainerEditor` already tested
    `accent_color != null`, and the border mirrors it.
    - **A third member (code review CR-8; QA QAF-17).** `ColorPicker/Picker.tsx` `Picker` tests
      `initColor ? … : '#000000'`. E15's `\bcolor` cannot match `initColor`. For 0 its outcome is black either
      way, so it is outcome-equivalent, and it goes to M6-f, which rewrites that line. Instruments:
      `verification/015/qa-m2a-colour-truthiness-sweep.sh` (QA, run 1) and code review's sweep (`7976a9a`).
  - **Standing-suite defect (QA QAF-1; critic L-C2-3).** The standing suite holds a transcription of
    `embedShape` that already diverges from it (Axiom E). Property: at M2, no expectation over `embedShape`'s
    admitted class is computed from a copy of the schema; every one runs against the real `embedShape`. The file,
    and how each case is shown red, are QA's: `qa/015-bug-evaluation-fixes-qa.md` § M2.
- **M2-b (F-13)** — the author-name error shows exactly when the name exceeds 256 characters (the save schema's
  bound, `MAX_EMBED_AUTHOR_NAME_LENGTH`).
- **M2-c (F-14)** — `validateEmbedTitle`'s error names the title.
- **M2-d (F-43, D8)** — footer text of 0–2048 characters shows no length error and saves; at 2049 the error
  shows. One constant drives both the editor and `embedShape`, as `MAX_EMBED_FOOTER_TEXT_LENGTH` does at
  `7ce866b`.

### M3 — Removed (D30): F-15, F-39 do not reproduce

The originating statement, verbatim: *"Enter on a focused Cancel button runs the confirm action."* A real-Chrome
read of the unfixed tree does not reproduce it. The read was website `6001f7f`, Chrome 156.0.8078.47, under
`next dev --webpack` and E-1 isolation: `verification/015/m3-chrome-read/README.md` (`8996505`, the implementer's
read). In each of the three dialogs that carry the dead compare (`WarningDialog`, `ConfirmationDialog`,
`ImageUploader`; § Assumptions), Enter with focus on Cancel leaves the action unrun. The controls behave as
predicted: Enter on the confirm button runs it, Enter with the body focused runs it, and a click on Cancel does not.

The owner removed M3 (D30). The dead compare `tagName !== '~/components/Button'` stays in the code, with no fix
and no test in this chain. The value statement's "a Cancel key press never deletes" is carried as already true at
`6001f7f`, with that read as its evidence. No milestone delivers it. The untested residue and the reopening class
are in X-18.

### M4 — Send page and webhook menu (website): F-16, F-17, F-18, F-27

- **M4-a (F-16)** — while a send is pending, Send is disabled, so any number of presses during it produces
  exactly one webhook request; a failed send leaves no unhandled rejection (vitest process exit 0 with the
  failure case in the suite) and re-enables Send.
- **M4-b (F-17)** — "Invalid URL" shows exactly when a non-empty custom URL has finished validating and
  `selectedWebhook` is `null`.
- **M4-c (F-18)** — the thread Clear button, which exists only in the list view, is enabled whenever a thread is
  selected (`threadId` non-empty) and nothing is loading. No button is added to the custom view, which has only
  "List". Restated at rev 14: rev 6's "both the list and the name views" named a button that does not exist
  (implementer's question, confirmed against `WebhookMenu` at `6001f7f`).
- **M4-d (F-27, D24)** — the originating statement, verbatim: *"Webhook provider: unanchored id test, unhandled
  fetch rejection, no request ordering."*
  - **The sites (critic M-C4-1; rev 17).** The class is enumerated by the defect's own predicate, not by the
    remedy's constant. `git grep -nE "\\d\+/\.test"` at `6001f7f` gives 2 sites, and both carry all three of
    F-27's limbs:
    - `WebhookProvider.tsx` `useValue`: the send page's old-message box;
    - `useValidateWebhook.ts`: the New Message dialog's webhook load, used by `NewMessageModal`.
    Every limb below holds at both. Fixing only one would break the owner's standing mirror rule ("Never fix or
    work around it in one feature only").
  - At each site, the message box accepts exactly two input classes, read after trimming surrounding whitespace
    as both sites do at `6001f7f` (QA QAF-22 (1)). It refuses everything else before any fetch:
  - an all-digits id;
  - a Discord message link (D25, D26): `https://`, then a host, then `/channels/<digits>/<digits>/<digits>`,
    with nothing after it. The host set is eight members: `discord.com` and `discordapp.com`, each bare or with
    a `www.`, `canary.` or `ptb.` prefix.
  - **One shared definition (D26).** The link class is the shared `DISCORD_MESSAGE_LINK_REGEX`
    (`src/constants/index.ts`), widened once. M4-d's box uses it; it adds no copy.
  - **Consumers of the widened constant.** The class is enumerated by `git grep -n DISCORD_MESSAGE_LINK_REGEX` at
    `6001f7f`, excluding tests and the definition:
    - `NewMessageModal` (the bot link load's `enabled` test);
    - `message.getFromUrl` (its zod input and its `match`).
    For each, every one of the eight host forms is admitted. Every input the constant refused at `6001f7f` on
    other grounds is still refused: another host, `http://`, a trailing path, a non-digit id. For every admitted
    form, `getFromUrl` passes the link's own guild id to the authorization gate (`authorizeGuildAdmin`), and the
    link's own channel id and message id to the request (code review CR-11; QA QAF-21; critic L-C4-1).
  - **The id fetched.** At both M4-d sites, for every admitted link, the message id fetched is the constant's
    message-id capture group, and no second parser derives it (architect AF-19).
  - **Human-observable (D26: the New Message dialog's change is accepted).** In the New Message dialog, a
    `discordapp.com` message link is accepted for the bot load where it was refused before. Walked on the locally
    served chain tip, without sending.
  - OPEN QUESTION [RESOLVED]: OQ-J (where the widened pattern lives, and the `discordapp.com` subdomains) —
    D26.
  - **Refused members (critic L-C4-1):** non-digit text that contains a digit (`abc123`); a URL on any other host;
    a message link with a trailing path.
  - **What a refused input shows (QA QAF-22 (2)).** No fetch, and the same as at `6001f7f`: the message and the
    error are both cleared, so nothing is shown. No new message text is added.
  - **Network failure, old-message fetch.** At both sites, an old-message fetch that fails with no response shows
    exactly "Could not load the message. Check your connection and try again." (D24) and leaves no unhandled
    rejection. Discord refusals keep their existing texts.
  - **Failed webhook-URL load (D29, code review CR-14; class named per critique L-C5-1).** At both sites, a
    webhook-URL fetch that fails with no response, or gets a response whose body is not JSON, shows exactly
    "Invalid URL" (no trailing period), and leaves no unhandled rejection. At `1e12837` the send page already
    shows it for both: any failure leaves `selectedWebhook` `null`. In the dialog, both reach
    `useValidateWebhook`'s catch. Each
    site shows it where it already shows a webhook-load error; no new error place is added (D29, "one small
    change"; code review CR-16):
    - **Send page:** the custom-URL input's field error (`WebhookMenu` `errorMessage` at website `1e12837`). The
      text and its condition are M4-b's, unchanged.
    - **New Message dialog:** the dialog's shared error line, the one text-error line below the load options
      (`NewMessageModal` `messageErrorString`, which carries `useValidateWebhook`'s `webhookError` at `1e12837`).
      Its precedence over the other load errors is unchanged. The dialog has no field-level error at `1e12837`
      (`grep -c "errorMessage="` over the file, 0), so none is added.

    A Discord refusal of the webhook URL (a JSON body with a `message`) keeps each site's existing text: "Invalid
    URL" on the send page (M4-b), Discord's own message in the dialog. At each site, the verifying cell asserts the literal at that site's
    stated place, and fails if the text appears nowhere or anywhere else; its expected value is never read from
    the code under test. Human-observable: with the network cut after a valid-looking webhook URL is typed, the
    send page shows "Invalid URL" under its URL field, and the New Message dialog shows it on the error line
    below the load options. Walked on the locally served chain tip, without sending.
  - **Ordering.** At both sites, of two overlapping validations only the latest input's result is applied.
  - **Named rider: the cross-server read in `getFromUrl` (code review CR-12, HIGH; D27).** This is a pre-existing
    defect on `master` (`7ce866b`), outside F-1 to F-50. It rides M4-d because M4-d already opens `getFromUrl`.
    - **The defect.** `getFromUrl` authorizes the link's guild id (`authorizeGuildAdmin`), then fetches
      `/channels/<channel>/messages/<message>` with the bot token. Nothing binds that channel to the authorized
      guild, so a manager of server A can read a message in server B that the bot can see.
    - **Property (rev 19: critic L-C4-2, QA QAF-23).** For every admitted link, `getFromUrl` returns message
      content only when the channel object's `guild_id` equals the guild id that passed `authorizeGuildAdmin`.
      The domain is every value of that field, and every other value is refused with no message content in the
      response:
      - a different guild id;
      - no `guild_id` at all, which is what Discord's channel object carries for a DM or group-DM channel.
      A first draft of the form "refuse only when `guild_id` is set and differs" fails this property.
    - **The lookup fails (architect AF-20).** `redis.fetchChannel` has never run (uncalled at `6001f7f`), so each
      of its mapped refusals is a member. Each is refused, with no content, and the caller receives its existing
      text:
      - 401 and 403: "Missing permissions. Make sure the bot has access to this channel in Discord.";
      - 404: "Channel does not exist.";
      - any other status: "An unknown error occurred. Please try again later or contact support."
      The check happens before the message fetch, or its result is discarded before anything is returned.
    - **Sibling.** No precedent binds a channel to an authorized guild:
      `git -C website grep -c "guild_id" 6001f7f -- src/server` returns no file. The channel lookup reuses the
      existing `redis.fetchChannel` (`src/utils/redis/index.ts`; exported, uncalled at `6001f7f`) rather than a new
      request path.
    - **Instrument.** A cell whose link names a guild id distinct from the channel's `guild_id`, and that
      fails if any message content is returned. The Discord leg is unexecuted (CR-12's Assumption Not Checked).
      The property holds whatever Discord returns, so it is not a premise of the fix.
    - **Riders yield; drop disposition, priced in advance.** If critique or review conflicts with the rider, it
      does not hold M4-d. It drops to a handoff with `Owning-Stage: security` and `Review-Trigger: before chain
      015 releases`, plus an Exclusions row. The price of dropping: the cross-server read stays open in
      production after chain 015 releases, until that handoff is discharged.
    - **Timing (D27's stated cost).** The fix reaches production only when chain 015 releases. The hole stays
      open on `master` until then.

### M5 — Editor pages and providers (website): F-19–F-26

- **M5-a (F-19)** — after a confirmed Load, the JSON dialog closes on Esc and outside-click, as after a cancelled
  one.
- **M5-b (F-20)** — Copy to Clipboard is disabled whenever Pretty-print is (the draft is not parsable/conforming);
  pressing it never throws.
- **M5-c (F-21)** — the update prompt includes "Any changes you have made will be lost." exactly when the
  composer has unsaved changes at the moment the event arrives. Hash comparison is untouched (X-10).
- **M5-d (F-22)** — the guild dropdown reflects `session.user.guilds` after every session update, without
  remount.
- **M5-e (F-23)** — "Today" is shown exactly when the message date's year, month and day equal today's, both
  copies (`Header.tsx`, `f/[id]/page.tsx` `getDateString`).
- **M5-f (F-24)** — opening Save As proposes the message's current name and server.
- **M5-g (F-25)** — the delete failure toast names the delete.
- **M5-h (F-26, D31; D28's class under steering's call, rulings `a49da66`; code review CR-18, CR-20)** — the
  originating statement's subject is a `/preview` link whose `data` crashes the page. Two rulings widen rev 21's
  "not parsable JSON": D31 (every non-object value) and steering's D28 call (valid JSON of the wrong shape that
  crashes). For every non-empty `data`, the page shows exactly one line, "Invalid message data." (the inline
  text-error line on the existing dark background, as built at website `da24eb7`), and no editor, exactly when
  `data` is in one of these classes:
  - (1) not parsable JSON;
  - (2) parsable, but not a JSON object: `null`, a number, a string, a boolean, an array (D31);
  - (3) a JSON object on which the real page crashes, on the tree the guard lands on with the guard removed (the chain
    tip, not a fixed SHA; code review CR-29), in `makeEditable` or in the editor's render. The deciding read is the
    guard-removed enumerator: code review's `verification/015/cr-m5-probes/run-class-guard-removed.sh`, which exports
    the tip and restores `src/app/preview/page.tsx` from before the guard. Its last run is
    `class-noguard-run1-476c633.txt` (44 cells, every one on the lists below; summary beside it). Code review re-runs it
    at the tip in any review round where a website commit after its last run's SHA touches `src/app/preview/`,
    `src/utils/index.ts` (`makeEditable`) or the editor components the page renders. A crashing member that renders at
    the re-run moves to the rendering list; a rendering member that crashes moves to the crashing list; the planner
    moves it at the next revision. The probe run with the guard present (`class-probe-run-476c633.txt`) shows that
    members render, and cannot decide crash membership. The reads below were taken at website `da24eb7`. The rule is
    steering's call under `a49da66`, restated after critique cycle 6 M-C6-1: every wrong-shape value that
    crashes the real page rides M5-h. This is the property. Its members are illustrations, never the predicate, and
    membership is decided by an executed read on the real editor, never a source reading. How the guard achieves it
    is the implementer's. Whatever the mechanism, the refusal is the same one line on the existing background, as
    the owner chose; a separate error page is the option he declined. The reads:
    - `verification/015/m5h-class-probe/run1-da24eb7.txt`: the planner's run, 44 rows, exit 0, built on code
      review's harness `verification/015/cr-m5-probes/`;
    - code review's `real-run4-da24eb7.txt`;
    - the critic's `verification/015/critic-m5h-render-probes/README.md`.
    The crashing members they establish:
    - `content` is a number (critic's read);
    - a type-1 action row's `components` is a string, or a type-17 container's `components` is a number (critic's
      read: both pass `makeEditable` and throw at render);
    - a type-12 media gallery's `items` is not an array (code review's reads `reported-run1` and `reported-run2`:
      `{"components":[{"type":12,"items":"x"}]}` throws "gallery.items.map is not a function"; the planner's run
      recorded the emptied root as 0 nodes, CR-21);
    - `embeds` is `null`, a number, `false`, `true`, `""`, a non-empty string, or an object;
    - an `embeds` element is `null`, a number or a string;
    - an embed's `fields` is a number, `""`, a non-empty string, or an object;
    - a `fields` element is `null` or a number;
    - `components` is `false`, `0`, `""`, a number, a string, or an object;
    - a type-1 or type-9 component's `components` element is `null` or a number; a type-9 `accessory` is `null`;
      a type-12 `items` element is `null` or a number;
    - any of the previous member, nested inside a type-17 container (probed: a type-1 child `null` inside one).

  For every member the reads show **rendering**, the editor renders, with no error line:
  - `{}`;
  - `embeds` `[]`;
  - an `embeds` element or a `fields` element that is an array;
  - a top-level `components` element that is `null`, a number or an array;
  - a type-1 child that is an array;
  - a type-17 container's direct child that is `null` or a number.
  - an embed's `fields` that is `null`. It crashed at `da24eb7` and renders at website `476c633`, after M6-c's
    `hasValidField` rewrite (guard-removed enumerator, `class-noguard-run1-476c633.txt`, 21 nodes; code review
    CR-29 resolved).
  A stored message that renders today still renders, so M8's premise (the generator screenshots stored messages)
  does not move.
  - **Residue (X-19).** `data` no read covers is outside what the reads settle: other fields, other component
    types, deeper nesting. The property binds it, but it carries no cell, and no instrument shows whether the guard
    catches it. While this plan is open, a report of a `/preview` link that crashes or renders blank is recorded
    under X-19 and is the planner's to act on. After closure it is a new defect report against this property.
  - **Verification.** Each listed member's expected outcome, the error line or the editor, is the literal the read
    records. It is never computed by calling the page's own predicate. A "rendered" read counts only with the editor
    present: a node count at least the positive control's order (`{}` 17, `{"content":"hello"}` 18 in the planner's
    run). A root emptied after a render error reads as 0 nodes, and that is a crash. Each cell asserts that its
    outcome is present, the line or the editor, never only that nothing threw (code review CR-21). A missing `data`
    still renders nothing.
  - **Human-observable.** `/preview?data={"embeds":""}` shows "Invalid message data.", and
    `/preview?data={"embeds":[[]]}` shows the editor. Walked on the locally served chain tip.

- **M5-i (D28 sibling of F-22/F-24; the implementer's probe `verification/015/d28-seed-probes/report.md`, run at
  website `ef5a9cc`)** — the send page's webhook menu (`WebhookMenu`) seeds its open category once at mount, from
  `hasWebhooks` (`useState(hasWebhooks ? guild?.id : 'load')`). On a first visit the webhook list arrives after
  mount (code path, `GuildProvider` `getWebhooksAndChannels`), so the menu opens the "load" tab even though the
  guild has webhooks. That is F-22/F-24's mount-time capture, and under D28 it rides with no owner question.
  Property: until the user picks a category, the open category is the current guild's webhook list whenever
  `hasWebhooks` holds (signed in, a guild selected, at least one webhook), and "load" otherwise. It follows every
  change of those inputs while the menu stays mounted. Once the user picks a category, the pick is kept, as at
  `ef5a9cc` (probe cell (b)). The siblings mirrored are M5-d (follow the input) and M5-f (refill, but never over the
  user's own value). Residue: a guild change while the send page stays mounted after a user's pick was not traced
  (X-21). Human-observable: on a first visit to a guild's send page that has webhooks, the menu opens on that
  guild's webhook list. Walked on the locally served chain tip.

### M6 — Editor components and markdown (website): F-37, F-38, F-40, F-41, F-42, F-44, F-45–F-50

- **M6-a (F-38)** — originating statement: *"Multi-line fenced code blocks never parse in the preview."*
  Property: every fenced block — with or without a language tag, 1 to N content lines — parses as a code block in
  `parseContent` and `parseEmbedField`. Members: the research's three executed strings. Embed titles are outside
  the property: `parseEmbedTitle` deliberately omits `codeBlock` (with `heading` and `list`) at the base
  (`src/utils/markdown/index.tsx` at website `7ce866b`; first excluded at `57b58d8`, 2023-03-23, by `git log -G"parseEmbedTitle.*codeBlock"`), so a title renders no code block, unchanged
  (code review CR-23). The title member came from the research's F-38 mechanism sentence ("parseContent,
  parseEmbedField and parseEmbedTitle … are built from staticBaseRules"), which is superseded on titles (critique L-C8-1).
  Human-observable: a two-line code block in the read-only preview renders as a block; also in the `/preview`
  screenshot after M8/production.
- **M6-b (F-40, D8)** — a URL is valid exactly when its path's final segment ends in one of `.png .jpg .jpeg
  .webp .gif .apng .tiff .webm`, in any case, with the query and fragment ignored. Members: `.jpeg`, `.PNG` and
  `a.png?ex=1` are accepted; `a.png.html` and `a.avif` are refused. The set's eight members are D8's list,
  carried verbatim.
- **M6-c (F-41)** — in read-only mode an embed with no displayable content and no fields is hidden.
- **M6-d (F-42)** — in read-only mode an edit to field *k* writes field *k*, whichever earlier fields are hidden.
- **M6-e (F-45)** — unmounting `Author` leaves no interval running.
- **M6-f (F-46)** — the picker's default colour is six hex digits for every integer colour, 0 included. That
  covers `Picker.tsx`'s `initColor` truthiness test, the third M2-a class member (CR-8; QAF-17).
- **M6-g (F-47)** — the emoji replacer tries longer surrogate sequences before their prefixes.
- **M6-h (F-48)** — `aria-expanded` is true exactly when the spoiler's content is visible.
- **M6-i (F-49, D9)** — every duplicate inserts the copy directly after the original. Members: embed and
  component at top level, plus the four nested editors.
- **M6-j (F-50)** — a footer object without `text` renders without throwing.
- **M6-k (F-37)** — `UpsertMapMap.delete(key)` without `innerKey` removes the whole entry for `key`.
- **M6-l (F-44, D10)** — originating statement: *"Component cap is checked before adds that add several."*
  D10's words are "allow, mark invalid". Read as properties (the reading is the planner's):
  - (i) Every add the editor offers completes in full, whatever count it reaches. That covers a Section, a
    container duplicate and every nested add (`ActionRowEditor.addButton`, `SectionEditor.addTextComponent`).
    `canAddComponent`'s existing refusal of a top-level add at a total ≥ 40 is unchanged; D10 does not speak
    to it.
  - (ii) `validateMessage` returns an error exactly when the total component count over every nesting level
    exceeds 40. Its text is the same literal that (vi) shows, "Message has N components; the limit is 40.", from
    one definition, not two copies (architect AF-24: the pattern in `limits.tsx`, where `validateMessage` and the
    editor's error lines call the same validators). So the send gate refuses such a message, and the stored
    `valid` field (`isMessageValid` → `validateMessage`, `messageValidity.ts`) reads false.
  - (iii) The total is counted by one definition, shared by the editor's `canAddComponent` and
    `validateMessage`. That definition is today's `countTotalComponents` (`DiscordMessageEditor/index.tsx`,
    module-private at `7ce866b`), lifted rather than duplicated, as `website.md` A-3 did for the notice.
    - **Destination** (architect AF-4): it is exported from `src/utils/limits.tsx`, beside `sumDisplayableText`,
      the sibling counter that feeds a validator there. Its parameter type is structural, because
      `validateMessage` receives `MessageData` components without `_key`.
    - **The count.** At every nesting level it counts exactly what `countTotalComponents` counts at `7ce866b`.
  - (iv) **The stored residue**, a stated limit (architect AF-1, recommended (a); critic L-3).
    - **What it is.** `valid` is written at save time (`upsertMessage` → `isMessageValid`) and served by the v1
      API. A message stored before the release with more than 40 components keeps `valid = true` until it is
      next saved.
    - **Population.** Unknown: no database instrument is reachable from this box.
    - **Carrier.** Nothing in this chain re-derives stored rows. `backfillValid.ts` is untouched: it selects only
      rows whose `valid` is null, so the trigger of `handoff/backfill-valid-guard-has-no-db-backed-instrument-2026-08-26.md`
      does not fire. That handoff stays the carrier for any future re-derivation over non-null rows (X-13).
  - (v) No M6-l criterion is settled by sending live messages to Discord. This is the constraint carried from
    `handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md` (X-14).
  - (vi) **Where the error shows (D32).** While the total exceeds 40, the text "Message has N components; the
    limit is 40.", with N the live total, shows in red under the components, and the components area takes a red
    border. This holds in the editor and on the Send page, and also on `/preview`, so an over-40 message's
    generated preview image carries them too, exactly as the text-length errors already do (D33). The text sits
    where the text-length errors do (`DiscordMessageEditor` `v2TextError` line at website `da24eb7`, the sibling
    it mirrors). The border joins the same errors' treatment, `styles.errorBorder` keyed on `embedCharacterError
    || v2TextError` (architect's read, AF-24). The Send page renders the same editor, so it is not a second site.
    The line and the border go away as soon as the total is 40 or fewer. The Add Component button and counter still hide at 40 and over.
  Expected counts in the tests are literals; so is the error text for at least two totals (41 and one higher).
  Human-observable: at 39 components, add a Section. The add completes, Send is disabled, and the red line reads
  "Message has 41 components; the limit is 40." (or the actual total) under a red border, in the editor and on
  the Send page. Walked on the locally served chain tip.

### M7 — Bot (website/bot): F-28, F-29, F-30 — turns on D4

- **M7-a (F-28)** — `ADMIN_PERMS` is the string of `ManageGuild` alone (`"32"`); the expected value is a literal.
  **Owner step** (publishes to Discord; no pipeline party runs it): after the website release, `pnpm run
  push-commands` from `website/`, per `package.json`. Human-observable / post-deploy (limb 2): a member holding
  Manage Server and not Administrator sees *Get Message* in a message's context menu; the owner attests with the
  time. Rollback: revert the commit and re-run `push-commands` (owner).
- **M7-b (F-29)** — `setTimestamp(t)` sets the payload's timestamp to `t`.
- **M7-c (F-30)** — `isUserCommand` is true exactly for user commands.

### M8 — preview-image-generator: F-31–F-35 (D16: straight to prod; M8-0 run 1 done)

Host facts (steering's standing `hooks-pig` reads, rulings blocks 05:20Z–05:24Z and OQ-G, `a16e431`):
- The generator runs under **root's** PM2 daemon, version 5.2.2, with `PM2_HOME` `/etc/.pm2`. It is one app,
  `hooks-image-preview-generator-prod`, with `kill_timeout` 5000 and `shutdown_with_message` true, read from
  root's `dump.pm2` through the filtered extract.
- PM2 5.2.2's `God.killProcess` is identical to 5.3.0's: the planner ran a `diff` of the function after
  `npm pack pm2@5.2.2`. So the analysis holds at the host's version.
- No preview instance exists, and the `preview` branch is deleted (D16).

- **M8-0 (agent read, D17/D18; it replaces limb (3)'s owner step).**
  - **The instrument.** `verification/015/pig-host-read.sh`, run as `claude-ro` over `hooks-pig`. It reads files
    only, never calls `pm2` and never writes. It reads:
    - `pm2.log`'s stop and kill lines for the app;
    - the app's out log, the shutdown-line count by the predicate in P1;
    - root `dump.pm2` through a host-side filter that prints only name, `kill_timeout` and
      `shutdown_with_message`, per D18;
    - Chromium processes whose parent is pid 1.
    It never opens `/home/nodejs/.pm2/dump.pm2` (rulings 05:21Z). The analyst writes it, and the code-reviewer
    reviews it with M8's code.
  - **Run 1, done** (2026-11-08T05:25Z; capture `verification/015/m8-0-run1-2026-11-08T0525Z.txt`, `fe27690`;
    result in the analysis, `1fc16f5`).
    - **Confirmed for production stops.** The stored values are `kill_timeout` 5000 and `shutdown_with_message`
      true. `pm2.log` records two stops of the prod app (2024-06-15, 2026-06-15), each `still alive after
      5000ms` → SIGKILL. The out log, which runs from 2023-08-22 over both stops (180,284 lines), holds 0
      `Server received` lines. The drain has never run.
    - **Inconclusive.** No deploy reload is on record, so the reload path rests on PM2 source alone (5.2.2 =
      5.3.0 on that path).
    - **Unread.** The daemon's `PM2_KILL_*` environment: root's `environ` is off limits to `claude-ro`.
      P1's fallback-signal limb therefore assumes SIGINT, the PM2 default, and the residue is a daemon
      started with `PM2_KILL_SIGNAL` set. It is moot for the message path, which run 1 shows is the one in
      use.
  - **Run 2**, by devops (critique L-6), after the `prod.yml` re-run of M8-a (2) completes and `pm2.log` shows the
    app online. It reads M8-a's criterion and captures to verification/015/.
- **M8-a (F-31)** — the originating statement, verbatim: *"Graceful shutdown is cut off by PM2 before its own
  fallback."* Reframed by the analysis: the shutdown never starts under PM2. Properties (analysis § 3):
  - **P1.**
    - **Triggers.** Every stop PM2 can send reaches `shutdown()`: the `'shutdown'` IPC message, and the signal
      PM2 falls back to. That signal is SIGINT unless the daemon sets `PM2_KILL_SIGNAL`, which is unread
      (M8-0 run 1; critique L-4).
    - **Idempotent.** `shutdown()` is idempotent, because both triggers may arrive.
    - **Stated explicitly.** `ecosystem.config.js` states `shutdown_with_message` explicitly, since a deleted
      key keeps its stored value.
    - **The log line.** Inside the idempotency guard, so once per drain, `shutdown()` logs a line that begins
      with `Server received` and names the trigger. When the drain completes, it logs a second line giving the
      elapsed milliseconds (architect AF-3).
    - **The predicate.** M8-0 counts lines that begin with `Server received`; the `Server running at` ready line
      is outside the class. The local probe exercises both members, sending a `'shutdown'` message to a
      locally started server, before any host read relies on the predicate (critique M-3).
  - **P2, the window.** `kill_timeout` is 12000 ms, outlasting the app's own 10 s fallback. The 2 s margin is
    the planner's choice, not a measurement; the drain time is first measured at run 2.
  - **P3, what it must not slow.** The process exits as soon as the drain completes, so the 10 s fallback is an
    upper bound, never a floor. A fork-mode reload is stop-then-start, so the production gap at each deploy is
    the drain time itself.
    - **The idle cell (QA QAF-2).** A process that never created its pool launches no browser at stop: its
      drain completes without one. At `471578f`, `getPool()` creates the pool on first call, and generic-pool
      autostarts with `min = 2` (QA's read of 3.9.0). So today a drain of an idle process would first launch two
      Chromiums.
    - **Where the read lives (architect AF-14).** The drain asks "does a pool exist?" through a read that never
      creates one. That read is a second export of `src/getPool.ts`, beside the `globalForPool` singleton and the
      default export that mirrors it (`preview-image-generator@471578f src/getPool.ts`). `server.ts` neither
      reaches into `globalForPool` nor keeps its own flag.
    - **Run 2.** M8-0 run 2 records whether the stopped process had created its pool, so that the
      drain-complete figure is read for what it measures. The read is bounded to the stopped process's span
      (below, "Every run-2 read"):
      - **Primary figure:** the `Created instance` lines in that span. The pool factory logs one per launched
        Chromium (`getPool.ts` factory `create`, `console.debug`, `471578f`).
      - **Secondary figure:** the `POST /generate` lines in that span. `server.ts` logs `req.method, req.url`
        before its auth check, so this counts unauthenticated requests too and does not by itself show a pool
        (QA QAF-8).
      `pig-host-read.sh` gains this read before run 2. The analyst writes it and the code-reviewer reviews it with
      M8's code, as for run 1.
      - **Instrument liveness (critic L-C3-1).** Run 1's capture holds no `Created instance` line (`grep -c`, 0 of
        97 lines). The analyst's first run of the extended script must read `Created instance` non-zero in an
        earlier process's span in the production out log before run 2 relies on it. If it reads zero
        everywhere, the figure is dropped, and run 2 reports pool creation as not established.
  - **P4.** The stop handlers are registered no later than the `ready` message.
  - **Growth beyond the finding (critique L-5).** P3 and P4 go beyond F-31's statement. They are the analysis's
    V-4 and V-5.
    - P3 cannot be dropped without re-pricing P2: without it, P1 and P2 turn today's ~5 s deploy gap into a
      10 s floor.
    - P4 can be dropped to a stated limit: a stop arriving between `listen` and handler registration kills the
      process undrained.
  - **The two stops (critique H-1; RK-6).**
    - **(1) The transition stop.** It is the deploy's own `startOrReload`, which stops the *old* process. That
      process has no `'message'` listener, and the new `kill_timeout` already applies to it (analysis V-3).
      Expected signature: no shutdown line, then `still alive after 12000ms` → SIGKILL. This is **expected, not
      a refutation.**
      Stated limits:
      - The push adds a 12 s delay before the switch-over, not 12 s of downtime (architect AF-11). The old process
        ignores the message and keeps serving its old code until the SIGKILL. Previews break only for requests
        in flight at the kill, and in the gap between the kill and the new process's `listen`. That is handoff
        `preview-image-failure-shows-broken-not-stale`'s window (X-11).
      - At PM2 5.2.2 the SIGKILL takes the whole process tree, Chromium included, so RK-5's orphans do not arise.
    - **(2) The verifying stop (D19).** It is the first stop of a process running the M8 commit. Devops causes
      it by re-running `prod.yml` through `workflow_dispatch` after the M9 push, with the owner's approval as for
      any prod push.
      - This re-run is itself a second production deploy. Its `startOrReload` stops the *new* process, which
        handles the message, so the drain runs and the gap is the drain time (P3).
      - The architect's reading of stop (1)'s deployed-directory replacement carries over (AF-9d, low bearing).
      **Every run-2 read** (RK-6's class; QA QAF-8, QAF-10, QAF-13; critic M-C3-1) is bounded to the stopped
      process's own span in the shared out log. The span is fixed only by `pm2.log`'s stop timestamps, which are
      independent of every quantity counted inside it and of the order of lines in the out log. Each out-log line
      carries an ISO timestamp, because `server.ts` overrides `console.debug` to prefix `new Date()` (`471578f`;
      run 1's capture shows `2024-06-15T11:56:00.002Z Server running at …`).
      - **Start:** the first `Server running at` line timestamped after `pm2.log`'s stop (1) timestamp. That is
        the process the push started.
      - **End:** the first `Server running at` line timestamped after `pm2.log`'s stop (2) timestamp. That is the
        process the re-run started.
      - **Restarts:** every ready line strictly between Start and End is a crash-restart (`exp_backoff_restart_delay`,
        `max_restarts: 10` in `ecosystem.config.js`). Each one is reported, and the read stops there; it never
        picks one.
      - **No span:** a missing Start or End is reported as no span, never filled from another stop.
      - **The stop timestamp (QA QAF-16)** is `pm2.log`'s `Stopping app` line for the app: the earliest line of a
        stop, and unambiguous. Run 1 counts 2 for the prod app.
      - **Stated assumption (D23): the generator host runs in UTC.** `pm2.log`'s stamps are zone-less local time
        (`2026-11-08T04:17:40:`), and the out log's are UTC ISO, so the span is right only while that holds.
        - Read by steering at 06:37Z: `date` and `date -u` agree, `/etc/timezone` is `Etc/UTC`, and
          `/etc/localtime` points at `zoneinfo/Etc/UTC`.
        - If the host's time zone ever changes, the span could be off by the offset.
        - The requirement itself is not rewritten for this.
      The reads this span bounds are every read run 2 takes: the `Server received` count, the drain-complete line
      and its elapsed figure, the `Created instance` count, the `POST /generate` count, and the exit time against
      the stop timestamp. A span with zero `Server received` lines is a valid read and refutes P1.
      **Criterion, read by M8-0 run 2 on stop (2) only:**
      - the out log gains exactly one `Server received` line naming the trigger, plus the drain-complete line;
      - the process exits before 12000 ms;
      - `pm2.log` shows no `still alive` or SIGKILL line for that stop.
      The drain-complete line's elapsed figure is the drain measurement.
  - **Rollback.** Devops reverts the M8 commit on `prod` and pushes, with the owner's approval as for any prod
    push. The reverted file restates the old values, so `--update-env` applies them.
- **M8-b (F-32, D35)** — a `/generate` request whose body is not parsable JSON, or parses to `null`, a number, a string
  or a boolean, gets 500, and the process keeps serving. A body that parses to an array is outside the refused class
  (D35): it proceeds as an object body does, and its residue is X-23. `null` exited the process at base `471578f`
  with "Cannot destructure property 'id'" (code review's executed read, `verification/015/cr-m8-probes/body-class-run1-471578f.txt`),
  so it is F-32's defect under D28. The other refused members did not crash; refusing them is D35. At
  preview-image-generator `6c613a5` the five refused members get 500 and the process serves on (`body-class-run1-6c613a5.txt`).
- **M8-c (F-33)** — a page is closed whether the screenshot succeeds or throws; no rejection is unhandled.
- **M8-d (F-34)** — while Chromium launches fail: (a) every request waiting for a browser gets 500, never a hang and
  never a `TypeError`; (b) the process keeps serving; (c) while no request waits, no launch is attempted, apart from the
  pool creating its configured minimum (`min` 2). (c) is measured over a window: no new launch line in the 3 s after a
  burst of 6 failing requests (code review's `verification/015/cr-m8-probes/attack-run1-6c613a5.txt`). Launches per
  failing request are unmeasured: 12 launch-error lines for 6 requests do not separate two launches per request from two
  lines per failure. The instrument that settles it is a per-request count of launch attempts and `Created instance`
  lines. No stage runs that instrument: the count is a stated limit, X-24. The plan's earlier sketch, "rejects in the
  pool factory", was a mechanism and was insufficient: generic-pool 3.9.0 leaves the waiting acquire pending and retries
  creation in a loop (the implementer's measurement, 11,654 attempts in 3 s). The mechanism is the implementer's; its
  dependency risk is RK-8.
  (d) (D36) Whenever the pool lacks the private waiting-queue member the remedy reaches, the generator writes a log line
  at startup, before it serves a request, that names the missing member. The line is required at startup whatever
  happens after it; D36 names only the line, so whether the process then serves or refuses to start (as M8-e does) is
  the implementer's choice. Member: the 3.9.0 tree with that member renamed, where code review's mutant
  `verification/015/cr-m8-probes/rk8-field-mutant-6c613a5.txt` exits the process on the first failing launch with no
  line naming the cause. Non-member: the 3.9.0 tree as resolved, which must write no such line.
- **M8-e (F-35)** — with `API_KEY` unset or empty, the server refuses to start, with a log line naming the variable.
  The refusal lives in `src/config.ts`, the generator's one reader of the environment (architect AF-4). The other
  values `config.ts` casts unvalidated are outside F-35 (architect AF-9b). `prod.yml` sets `API_KEY`, so the
  deploy is unaffected.

No automated coverage: the repo has no runner, and the chain declines to add one. Every branch above is
therefore an operator-visible criterion. Where each is verified:
- **Entry condition for every local generator run (QA E-1, QAF-5).** The generator's real credentials and the
  network are out of reach of any local run, because a well-formed `/generate` request reaches
  `deleteMessagePreviewImages`, an S3 list-and-delete, even when the browser launch fails. So every local run:
  - happens in an export of the chain tree without the tree's `.env`;
  - takes its dependencies from an install **inside that export**, run before the namespace is entered, because
    the install needs the network (QA QAF-6; critic M-C2-2). The install is `npm ci --omit=optional` under
    `PUPPETEER_SKIP_DOWNLOAD=1`. The export never links to the shared tree's `node_modules`, which another
    session can change mid-run;
  - runs the server inside `unshare -rn`, whose **first step brings loopback up** with `ip link set lo up`. The
    namespace starts with `lo` DOWN: the architect (AF-13) and the critic (M-C2-1) each measured a loopback
    connect failing with `ENETUNREACH` (Errno 101) until `lo` was up, and succeeding after it;
  - passes a **self-check before any criterion is read**: a loopback GET to the started server answers, and an
    external name lookup fails. A failed self-check stops the run. Its remedy is never dropping `-n`, which is the
    limb that keeps the S3 bucket out of reach;
  - sets every `CDN_*` variable, `PREVIEW_ENDPOINT` (a loopback URL) and `API_KEY` explicitly to probe values;
  - never sources the shared tree's `.env`. `dotenv` does not override variables already set, and the export
    carries no `.env`.
  No probe of this chain may delete or write a CDN object.
- **Locally, no browser:** M8-b, M8-d, M8-e, QAF-2's idle cell, and P1's two log lines and predicate (a
  `'shutdown'` message sent to a locally started server).
  - **Forcing condition.** No browser is downloaded at the install, so a launch fails, which is M8-d's forcing
    condition. It holds only while `~/.cache/puppeteer` is absent after the install. QA's E-2 re-checks it at the
    probe, which also settles whether `--omit=optional` still runs puppeteer's install script under the variable
    (critique cycle 2, "Assumption Not Checked").
  - **The variable.** QA read puppeteer's own `getConfiguration.js` at 21.1.0: any non-empty
    `PUPPETEER_SKIP_DOWNLOAD` skips the download (QA E-2, `2e4d4d5`).
  - **No pool before parsing.** That M8-b's path creates no pool before parsing is an unread inference
    (`getPool()` is called inside `generateImage` and `shutdown`, per `grep -n` at `471578f`). The implementer
    confirms it at M8.
- **M8-c needs a real browser (critic M-C2-3).** It runs locally under E-1. D20 allows a browser to be used; it
  does not supply one.
  - **Source.** Puppeteer has none on this route, and the namespace cannot fetch one. So the source is
    `executablePath` to a binary already on this box. Read 2026-11-08 by `--version`: `/usr/bin/google-chrome`
    156.0.8078.47 and `/snap/bin/chromium` 157.0.8103.38. Whether a snap binary launches inside `unshare -rn`
    is unread.
  - **Compatibility, unread.** No document has read whether puppeteer 21.1.0 drives either binary. The
    implementer settles it at M8, before M8-c is relied on, with one launch and one screenshot under E-1 against
    the chosen binary, recording the binary, its version and the result.
  - **Fallback.** If no binary on the box launches and screenshots under puppeteer 21.1.0, M8-c is verified by
    code review and stated as a limit. Installing or upgrading Playwright or a browser is not implied.
- **On production:** P1–P3, through M8-0 run 2 on stop (2).

### M9 — Release (devops; owner steps named)

- **website.** The chain branch merges to `master`, and the push deploys to Vercel production (owner-approved
  push). Pre-push: `release-move.js website master <sha> --dry-run`.
- **preview-image-generator (D16).** Devops pushes `prod` (owner-approved), with
  `release-move.js preview-image-generator prod <sha> --dry-run` first. Then:
  - the transition stop (M8-a (1)) happens;
  - the verifying stop (M8-a (2)) follows;
  - M8-0 run 2 reads it.
  `preview.yml` still sits in the tree, but nothing triggers it now that the branch is deleted.
- **RK-8 carrier.** At closure, devops mints the handoff RK-8 names (Owning-Stage devops; event trigger: a lockfile move
  of generic-pool), carrying M8-d (d)'s startup line as the read.
- **Owner steps:**
  - `push-commands` (M7-a);
  - the F-2 check (limb 1, § Validation);
  - the M7-a Discord check (limb 2);
  - approval of the second production deploy, devops' `prod.yml` re-run (D19).
  Limb (3) is now agent-read (M8-0, D17).

## Testing Strategy

QA Phase 1 runs before implementation (stage set, D6).

The standard is `agent-output/CLAUDE.md` § Test Conventions (`website`): vitest, tests beside the code under
`__tests__/`, spec-form names, DOM tests (`.tsx`) mounted with `createRoot`/`act`, every new test seen red
against a restored mutation, exit code recorded beside counters. Expected types: pure-logic tests for M1, M2,
M6-b/f/g/k, M7; DOM component tests for M4, M5, M6 components. The F-1/F-2 class (Kysely predicates over a
nullable or a possibly-empty list) is covered by compiling the query, as the research's proof did — no database is
reachable here. preview-image-generator has no runner (M8 note). Read instruments per host: website — vitest on
this box (exists); Vercel production — the owner's browser; Discord — the owner's client; the generator host —
`claude-ro` file reads over `hooks-pig` (D17, M8-0); no pm2 command and no write; this box
can run the M8-b/d/e probes once the generator's dependencies are installed (M8 note). Agent browser use is open under D20.

## Validation

- Planner's run at `7ce866b`, 2026-11-08: vitest 598/598, 54 files, exit 0; `pnpm run typecheck` exit 1, the two
  errors confined to `.next/dev/types/validator.ts` (D7 settles the gate at M0).
- Pre-release walk (owner): the chain tip served locally against `.env.local`, whose database is the live one —
  the precedent of `uat/closed/013-components-v2-editing-surfaces-uat.md` § B.1; writes during the walk land in
  his real account. A Vercel preview of the chain branch is the alternative (the `preview.yml` endpoint
  `hooks-gg-website-git-redesign-hooks-gg.vercel.app` shows branch previews have existed) and points at the same
  database.
- Sign-out during any walk revokes that account's Discord token (M1-c, from `be881c9`; QA I-2). The walker
  signs in again afterwards.
- Limb (1), F-2: the owner signs in with an account that administers no server and opens the message list — at
  `7ce866b` (expected failure) and the chain tip (lists his messages); attested with times. Repeated post-deploy
  in production.

## Risks

- **RK-1** — F-38's new regex may match more than Discord does (a lazy cross-line body). Falsifier: a string
  Discord renders as text that the preview renders as a block; checked against Discord's own rule
  (`[^\n][^]*?`, research F-38) by QA.
- **RK-2** — M2 widens what saves. Any consumer reading stored `color`/`footer.text` (statbot, chain 012's `valid`
  column) sees new values. Falsifier: a consumer refusing `color: 0` or a 2048-character footer.
- **RK-3** — M8 is the first PIG deploy since 2023 on a self-hosted runner; the cache key means `npm ci` is
  skipped on a lockfile hit. With no preview leg (D16), the first exercise of that path is the production push. Falsifier:
  the `prod.yml` run failing, or the app not `online` in M8-0 run 2. The clearing act is devops' rollback (M8-a).
- **RK-4** — M7-a's `push-commands` republishes every command, not only `get_message`. Falsifier: a command's
  definition differing after the push.
- **RK-5** — a stop that ends in SIGKILL may leave Chromium behind.
  - Before PM2 7.x, PM2's SIGKILL took the whole process tree; at 7.1.2 it takes only the Node process (analysis
    § 1). So on 7.x, every stop that reaches SIGKILL may orphan Chromium processes. The analysis gives this
    low-to-moderate confidence and did not run it, then under D2's constraint, which D20 has since lifted.
  - The host runs PM2 5.2.2 (rulings 05:20Z), whose SIGKILL takes the whole tree. So RK-5 does not arise at
    this host unless its PM2 is upgraded to 7.x. M8-a's P1–P3 remove the SIGKILL on the normal path.
  - Falsifier: Chromium processes without a live parent on the host after a stop. This is read by M8-0's
    `ps`-based command.
- **RK-6** (standing prediction, from critique cycle 1 H-1, stated as a class) — an M8 observation read off the
  wrong stop: the deploy's own stop of the old process, read as if it were a stop of the new code.
  - Falsifier: a host read whose verdict on P1 rests on a stop by a process that does not run the M8 commit.
  - Record per review pass:
    - cycle 1 pass 1 found one member (rev 3's M8-a criterion), remedied at rev 4;
    - cycle 1 passes 2 and 3 and cycle 2 passes 1 and 2 found none;
    - QA Phase 1's re-key to rev 7 (`ba277d8`, QAF-8) found one: the run-2 request read windowed "after the last
      `Server running at`", which is the process the re-run started. Remedied at rev 8 by the property over the
      class: every run-2 read is bounded to the stopped process's span (M8-a, "Every run-2 read").
    - QA's rev-8 delta (`c2a657a`, QAF-10) and critique cycle 3 pass 1 (`f64ae27`, M-C3-1) reported the same
      member again. Rev 8's span ended at the `Server received` line it counted, so the count could not fail,
      and with no drain there was no span. Remedied at rev 9 by bounding the span only by ready lines and stop
      (2)'s `pm2.log` timestamp, and enumerating the reads it bounds.
    - QA's rev 9+10 delta (`45d2d91`, QAF-13) found the same member's last instance shape. Start was "the last
      ready line before the re-run's", a positional bound, so a crash-restart between push and re-run would
      silently move it. Remedied at rev 11 by bounding both ends only by `pm2.log`'s stop (1) and stop (2)
      timestamps. This is the fourth revision of this limb. The property now uses no positional "last" bound
      anywhere.
    - Critique cycle 3 pass 2 (`da1c87c`) found none.
- **RK-7** — M1-f makes the client env guard refuse server keys for the first time (M1 Outstanding Item 3). A
  client-reachable read of a non-`NEXT_PUBLIC_` key, other than `NODE_ENV`, now throws in the browser.
  - The sweep at `be881c9` found two client-reachable importers of `env.mjs`, `constants/index.ts` and
    `usePusher.ts`, and both read `NEXT_PUBLIC_` keys only. The implementer located them with
    `grep -rl "env.mjs" src bot` and read both files.
  - **The reducing predicate (critic L-C3-2).** The grep does not decide client reach. That predicate is QA's
    transitive scan: value imports followed from 80 client roots reach no module that reads a server key at
    `be881c9`, and three planted controls fire (`verification/015/qa-rk7-client-reach-run.sh`, QA `45d2d91`).
  - Falsifier: a page that throws on load with the guard's refusal. The editor walks (B-2 to B-5) load the
    client and would show it before release.
- **RK-8** — M8-d's remedy uses generic-pool's README-documented `factoryCreateError` handler, which reaches the
  private `_waitingClientsQueue` of a dependency pinned as `generic-pool@^3.9.0` (implementer's M8 Outstanding Item 1;
  accepted by code review; accepted by the owner with a startup guard, D36). A minor or patch upgrade within the caret
  range can rename or remove the field. If it does, the process exits, not hangs: on node 24, the first failing
  Chromium launch throws a TypeError reading `dequeue` inside generic-pool's creation `.catch`, the waiting request gets
  ECONNRESET, and the process exits with code 1 after 378 ms (code review CR-31,
  `verification/015/cr-m8-probes/rk8-field-mutant-6c613a5.txt`; control `rk8-field-control-6c613a5.txt`: 500, alive).
  Under PM2 that is a restart per failing launch. Instrument: M8-d (d)'s startup line in the prod out log. It is read at
  the deploy of any preview-image-generator commit that moves the lockfile's resolved generic-pool version. While this
  plan is open, that read is the planner's to route. After closure, its carrier is a handoff devops mints at M9
  (Owning-Stage devops; Review-Trigger: a preview-image-generator commit that changes the generic-pool version its
  lockfile resolves). The reader is the devops session deploying that commit. Falsifier: the startup line present, or a
  prod exit whose log shows that TypeError. Passes since rev 26: none observed.

## Exclusions

Standing constraint (critique L-C7-1): every row carried as a stated limit over a behavioural residue names three
things: the row a report of a member lands under, who acts on it while this plan is open (the planner), and its
fate after closure.

| # | Exclusion | Reason | Carrier |
|---|---|---|---|
| X-1 | F-36 (`project-utils/dist/prisma.js`) | Severity 1, harmless unless imported; removal needs a project-utils push and a website lockfile pin move, and `system-architecture.md` D-002 warns committed dist is not cleaned as stray output | Stated limit |
| X-5 | H-1–H-8 | Out by D6 | Research G-5 |
| X-6 | Research § Findings 7 handoffs | Out by D6 | Each handoff |
| X-7 | RBAC remark | Out by D6 | Stated limit (product direction, no effort) |
| X-8 | Security assessment | Out by D6 | Stated limit |
| X-9 | `website-api-handler-hardening` items 2–5 (trigger fires on M1) | Outside the F-1–F-50 pool (D6); item 4's required-variable change is a release behaviour the owner rules on | That handoff |
| X-10 | `save-originating-tab-raises-its-own-update-prompt` and `unsaved-change-guards-disabled…` (triggers touch M5-c) | M5-c changes only which `hasChanged` value the prompt reads; the hash forms and the guard predicate stay | Those handoffs |
| X-11 | `preview-image-failure-shows-broken-not-stale` (trigger fires on the M9 PIG redeploy) | Website-side nonce fix, outside the pool (D6) | That handoff |
| X-12 | The plain-text API key in `prod.yml` / `preview.yml` | Out of chain by D13 | `handoff/preview-image-generator-api-key-in-workflow-files-2026-11-08.md` |
| X-13 | Re-deriving stored `valid` for rows saved before M6-l | Stated limit (M6-l (iv)); a re-derivation over non-null rows would modify `backfillValid.ts` and is a scope change | `handoff/backfill-valid-guard-has-no-db-backed-instrument-2026-08-26.md` |
| X-14 | `components-v2-emptiness…`, whose trigger fires on M6-l (a change to the send gate's predicate) | The emptiness class is outside the F-1–F-50 pool (D6); M6-l (v) carries its no-live-sends constraint | That handoff |
| X-15 | The generator's 2026-06-15 → 2026-08-23 gap in `pm2.log` (analysis § M8-0 run 1) | Outside F-1–F-50 (D6); whether the generator was down for the whole gap is not established | Steering's FYI to the owner, rulings block 05:29Z (`fa693e0`) (critique L-8) |
| X-16 | The message cap under concurrent saves | A constraint or a transaction is beyond F-4's comparator change (QA QAF-4) A report of a message count over 1000 lands here; the planner acts while the plan is open; after closure it is a new defect report against M1-d. | Stated limit (M1-d) |
| X-17 | `Providers.tsx` decoding a client-reachable `x-query-params` header (code review CR-6, `7976a9a`) | Outside F-1 to F-50 (D6). As a rider it would be a scope delta for the owner; the planner does not propose one | `handoff/providers-query-params-header-decode-throws-2026-11-08.md` |
| X-18 | F-15, F-39 (Enter on a dialog's Cancel runs confirm; the dead `tagName` compare at three sites) | Not reproducible in real Chrome at `6001f7f` (`verification/015/m3-chrome-read/README.md`, `8996505`); removed by the owner (D30). Untested residue: Enter on the uploader's Clear button (the read tested Cancel only); a production build (the read ran `next dev --webpack`); browsers other than Chrome 156. | Stated limit (D30; reopened by the class D30 names) |
| X-19 | `/preview` `data` no executed read covers (other fields, other component types, deeper nesting) | M5-h's property binds it, but no cell or instrument checks it. While this plan is open, a report of a crashing or blank `/preview` link lands here and is the planner's to act on. Rev 23's blank-render class is dropped: its one member, `{"components":[{"type":12,"items":"x"}]}`, crashes the real page (code review CR-21, `reported-run1/2-da24eb7.txt`; the planner's run read the emptied root as 0 nodes). `{"components":[null]}` renders with the real editor (critic `verification/015/critic-m5h-render-probes/README.md`). | Stated limit (M5-h residue) |
| X-20 | A Hooks user with several Discord `Accounts` rows: sign-out revokes one arbitrary row (`removeUserSession`), and the lookup returns one arbitrary row (`fetchUserAccount`) (architect AF-26) | The owner's ruling (D34). Through the site's buttons a second row cannot arise; next-auth links one only through a hand-typed sign-in URL while signed in (steering's read, `766bd4b`; the send page's Log in panel renders only without a session, the architect's read at website `3031878`, AF-28). A second account contradicts the owner's rule `architecture/website.md` W-7 (`952e69f`). Population unread. | `handoff/one-hooks-user-several-discord-accounts-2026-11-08.md` |
| X-21 | `WebhookMenu`: a guild change while the send page stays mounted, after the user has picked a category | Not traced by the implementer's probe (`verification/015/d28-seed-probes/report.md`); M5-i's property keeps a user's pick, as at the base. A report of the menu showing another guild's tab after a guild switch lands here; the planner acts while the plan is open; after closure it is a new defect report against M5-i. | Stated limit (M5-i) |
| X-22 | `NewMessageModal`'s `selectedGuildId` seed on a folder switch (D28 candidate) | Not a defect: a client navigation `/message/f/A` → `/message/f/B` mounts B's page and modal fresh, so the seed reads B's `guildId` (planner's source read of next 16.1.6 `layout-router.js` and `createRouterCacheKey`, `verification/015/m5-modal-seed-next-keying-read.txt`, not run). The implementer's browser read could not decide it (`verification/015/d28-folder-switch/README.md`, `fbe28b4`). A report of a stale Save To default after a folder switch lands here; the planner acts while the plan is open; after closure it is a new defect report. | Stated limit (read from source) |
| X-23 | A `/generate` body that parses to an array (`[]`, `[1,2]`, `[{}]`) | The owner's ruling (D35 re-put). Such a body proceeds as an object body does: it attempts a browser launch exactly like the object control (code review CR-30, `verification/015/cr-m8-probes/body-class-run1-6c613a5.txt`). It destructures to an undefined `id`, so the image step lists and deletes under `previews/undefined/` and then writes a PutObject there once a browser renders (QA QAF-33, `9fdf439`, code read, not run on S3). An object body without `id` takes the same path, and no criterion of this chain refuses it. While this plan is open, a report of objects under `previews/undefined/` lands here and the planner acts. After closure it is a new defect report against M8-b. | Stated limit (D35) |
| X-24 | M8-d's launches per failing request (one or two) | No stage runs a per-request count of launch attempts and `Created instance` lines (critique L-C9-1). M8-d (a) to (c) hold whichever it is. While this plan is open, a report of launch-error volume during a Chromium outage lands here and the planner acts. After closure it is a new defect report against M8-d. | Stated limit (M8-d) |

Not triggered, re-read 2026-11-08 against every milestone including M6-l: `backfill-valid-guard…` (`backfillValid.ts`
is not modified; its stored-residue tie is X-13), `components-v2-invariant…`, `fix-v1-guild-messages-auth-post-deploy`,
`message-init-cached-edits-lost`, `newmessagemodal-persist-gate…`, `v1-guild-messages-endpoints…`.

## Architecture lines this chain touches

- `system-architecture.md` § Components, preview-image-generator: "graceful SIGINT drain". The analysis
  contradicts it from PM2's source: PM2 sends an IPC `'shutdown'` message and the drain never runs. M8-0's
  first run confirms it on the host. The chain proposes the correction to the architect, who holds the record;
  after M8 the line reads as a drain on PM2's `'shutdown'` message, with SIGINT as the fallback.
- `preview-image-generator.md` P-3's shown mechanism ("no build step — the checkout
  is production") disagrees with `prod.yml` (npm ci, build, copy to `deployed/<env>`, pm2 reload) — for the
  architect's conformance pass.

## Entry work (2026-11-08)

- Hooks: `core.hooksPath` unset and no non-sample `.git/hooks` in website and preview-image-generator; no tracked
  build output (`git ls-files` over `dist|build|.next`, 0 each); no `.claude` Stop guard in either repo or the
  workspace root (`ls -a`, `ls -la .claude`).
- Serving refs (`git ls-remote origin`): website `master` 7ce866b (Vercel production; no `.github/workflows`);
  preview-image-generator `prod` 471578f (`prod.yml`), `preview` c233ec4 (`preview.yml`), `master` 87dcb41 — all
  ancestors of `prod`. `release-move.js --dry-run`: website master — every check passed, no workflow;
  preview-image-generator prod — every check passed, sibling `master` on one line. Every remote push is devops's
  act. project-utils: not shipped by this plan (X-1).
- One launch directory serves both repos: `/usr/local/bin/hooks`.

## Planner batch

| Item | Source row | Disposition |
|---|---|---|
| D2's steering-go wording at § M8 (M8-c), § Testing Strategy and RK-5 is released by D20 | D20 | Discharged at rev 6 |
| QAF-10 (MEDIUM). Rev 8's run-2 span ends at the `Server received` line it counts, so "exactly one" cannot fail, and with no drain the span is undefined. This is RK-6's third member on the run-2 bounds (after rev 3's and QAF-8). It is remedied by the property over the class, not by another instance fix: every run-2 read is bounded only by events independent of any quantity counted inside it. Those events are the stopped process's own ready line, the last before the re-run's, and the re-run process's ready line, cross-checked against `pm2.log`'s timestamp for stop (2). Any extra ready line inside the span (`exp_backoff_restart_delay`, `max_restarts: 10`) is reported, never resolved by choosing one. The fold enumerates every read the span bounds: the `Server received` count, the drain-complete line and its elapsed figure (which rev 8's span leaves outside it), the `Created instance` and `POST /generate` counts, and the exit time. It also writes RK-6's record for both passes that reported this member. | `qa/015-bug-evaluation-fixes-qa.md` QAF-10 (`c2a657a`); critique cycle 3 M-C3-1 (`f64ae27`), the same member | Discharged at rev 9 (M8-a, "Every run-2 read"; RK-6's record). |
| M3 premise question (implementer probe `verification/015/m3-premise-probe-6001f7f.txt`, via steering). The planner read it at 06:43Z, and F-15 reproduces in the app. next 16.1.6 hydrates the App Router with the React root on `document` (`client/app-index.js`: `const appElement = document`), and the editor is an App Router page. So usePress's `stopPropagation` (`@react-aria/interactions` 3.27.0 `usePress` `onKeyDown`) runs from React's listener on `document` and cannot stop react-hotkeys-hook 5.2.4's listener on the same node (`verification/015/m3-same-node-propagation-probe-run1.txt`). The probe mounted on a `div`, which is not the production root. M3's criterion is unchanged. | steering message 06:42Z; planner read | Discharged at rev 14. **Superseded at rev 15:** this row's conclusion ("F-15 reproduces in the app") was withdrawn at 06:52Z on the implementer's document-root probe. Closed at rev 21: the real-Chrome read does not reproduce F-15, and M3 is removed (D30, § M3, X-18). |
| L-C3-1 (LOW). The `Created instance` primary figure cites no non-zero read from the production out log. Run 1's capture holds none (`grep -c "Created instance"`, 0 of 97 lines, 2026-11-08T05:56Z). | critique cycle 3 L-C3-1 (`f64ae27`) | Discharged at rev 9 (P3, "Instrument liveness"). |
| L-C5-1 (LOW). (i) M4-d's webhook-load limb names only "fails with no response"; the dialog's catch also takes a response whose body is not JSON, which the send page already shows as "Invalid URL". Name the class at both sites: no response or a non-JSON response shows "Invalid URL"; a JSON body with a message keeps each site's existing text. (ii) D29's verbatim column: per rulings `27f8cd7`, the label is steering's and the description the planner's. | critique cycle 5 L-C5-1 (`79e8572`) | Discharged at rev 24 (M4-d "Failed webhook-URL load"; D29 row). |
| L-C6-2 (LOW). (i) X-19's blank-render class (`{"components":[{"type":12,"items":"x"}]}`, 0 nodes) names no detection owner: add the row a report lands under and who acts (the planner while the plan is open; a handoff after closure). (ii) M5-h class (3) calls type 1 a "container"; type 1 is an action row. | critique cycle 6 L-C6-2 (`0649ef4`) | Discharged at rev 24: (i) the blank-render class is dropped (it was a crash, CR-21), and X-19 states its detection owner; (ii) corrected in M5-h (3). |
| `NewMessageModal` `selectedGuildId` seed (D28 candidate). The implementer's probe shows it never follows the `guildId` prop and keeps a user's pick. Whether a client navigation from `/message/f/A` to `/message/f/B` remounts the modal is not established. | `verification/015/d28-seed-probes/report.md`; implementer via steering | Discharged at rev 25 (X-22). The implementer's browser read could not decide it (logged-out redirect; `verification/015/d28-folder-switch/README.md`, `fbe28b4`). The planner's source read of next 16.1.6 settles it (`verification/015/m5-modal-seed-next-keying-read.txt`, read from source, not run): `layout-router.js` keys each segment's child by `createRouterCacheKey`, so `id|A|d` → `id|B|d` mounts B's page and modal fresh, and the seed reads B's `guildId`. By the disposition priced in advance, it becomes an Exclusions row citing both reads, not M5-j. |
| AF-28 (LOW), plan side. X-20 and D34 cite `architecture/website.md` W-7 (`952e69f`), and X-20's "steering's read" adds the architect's read of `send/page.tsx` at website `3031878` (recorded at agent-output `0f893c8`) (Log in panel only without a session). | architect AF-28 (`1a3bc68`) | Discharged at rev 25. |
| L-C7-1 (LOW), the second member of L-C6-2 (i)'s shape, remedied by the property. Every Exclusions row carried as a stated limit over a behavioural residue names three things: the row a report of a member lands under, who acts while the plan is open, and its fate after closure. This is a standing constraint on the register. The critic enumerated 18 rows: 8 stated limits, 4 behavioural residues. X-18 and X-19 comply; X-16 and X-21 owe one clause each. Also: rev 24's owed-verdicts row says critic "cycle 6"; it is cycle 7 (cycle 6 closed at `42a1783`). | critique cycle 7 L-C7-1 (`1b5f3e8`) | Discharged at rev 25. |
| L-C8-1 (LOW). M6-a's title note: (i) the title member came from the research's F-38 mechanism sentence ("parseContent, parseEmbedField and parseEmbedTitle … are built from staticBaseRules"), not first from rev 4. Re-status the claim at the plan's citation. (ii) `codeBlock` was first excluded from `parseEmbedTitle` at website `57b58d8` (2023-03-23), not `d5f2dc8`: `git log -G"parseEmbedTitle.*codeBlock" 7ce866b -- src/utils/markdown/index.tsx`, the planner's re-run. The planner's `-S` search found the exact three-item list. Also: rev 25's owed-verdicts row says critic "cycle 7"; it is cycle 8 (cycle 7 closed at `0029245`). | critique cycle 8 L-C8-1 (`4429f17`) | Discharged at rev 26. |
| QAF-33 (MEDIUM). D35's title says every non-object `/generate` body gets 500 "as the implementer built it", and the option put to the owner said "no code change". Both are false for arrays: `src/server.ts` `processImage` at preview-image-generator `6c613a5` refuses only `typeof parsedBody !== 'object' \|\| parsedBody === null`, so `[]` and `[{}]` pass and reach `generateImage` (I-1's S3 path). The planner ran that guard expression over `"x"`, `true`, `1`, `null`, `[]`, `[{}]` and `{}`: only the two arrays and `{}` pass (2026-11-08T09:27Z, node, transcribed from line 25). M8-b's criterion already covers arrays ("parses to anything but a JSON object"), so the code owes the guard and no criterion changes. D35's operative ruling, "refuse all", stands. Its "as built" premise and the stated cost were the planner's error. They are corrected in the D35 row at the next revision, and the owner is told through steering. | QA re-key `9fdf439`, QAF-33 | Discharged at rev 27 (D35 rewritten; M8-b narrowed; X-23). |
| D36's startup guard has no criterion text in M8-d or RK-8. The criterion is that the generator emits a named error line at startup whenever the pool's waiting queue lacks the member that M8-d reaches. Fold it at rev 27 with the QAF-33 correction to D35, once the critic's and code review's rev 26 verdicts are in. The implementer is not held: the ruling routes the guard into the CR-27 fix. | D36 (`f5ab120`) | Discharged at rev 27 (M8-d (d); RK-8). |
| D35 re-put. The owner chose "Agent: as built, lists pass" (rulings 09:28Z, `c8c7649`), which supersedes "refuse all" for lists only. Rev 27: (i) D35's row is rewritten by replacement. Its title now has two operative clauses: bad JSON, `null`, numbers, strings and booleans get 500; a list passes to `generateImage`. Its route cites both selections, and the corrected cost is quoted verbatim. (ii) M8-b's criterion is narrowed: arrays leave the refused class. (iii) QAF-33 becomes an Exclusions stated limit, carrying the L-C7-1 three clauses: the row a report lands under, who acts while the plan is open, and its fate after closure. At the fold, read what a list body does at the M8 tip (it destructures like `{}`) before writing the limit's residue. (iv) QA's array cells are dropped, and the string and boolean cells stand. This is a criterion change, so it opens a new critique cycle. No code is owed. | D35 re-put (`c8c7649`), QAF-33 (`9fdf439`) | Discharged at rev 27 (D35; M8-b; X-23 with the S3 consequence, code review CR-30). |
| M-C9-1 (MEDIUM). M5-h class (3) is anchored to the moving tip, but no step produces the tip read. It cites the guard-present probe, which cannot decide crash membership. Cite the guard-removed enumerator instead (`verification/015/cr-m5-probes/run-class-guard-removed.sh`, `class-noguard-run1-476c633.txt`, 44 cells). Name the gate that re-runs it if `src/app/preview` or the render path moves after `476c633`, and state the move rule in both directions. | critique cycle 9 (`e233c82`) | Discharged at rev 27 (M5-h (3)). |
| M-C9-2 (MEDIUM). RK-8's post-release falsifier names no carrier or detection owner. After D36 the instrument exists: the startup error line. Still owed: who reads that line after a dependency bump once the chain is closed, and the row's fate after closure, in L-C7-1's standing form. | critique cycle 9 (`e233c82`) | Discharged at rev 27 (RK-8; M9 carrier line). |
| L-C9-1 (LOW). M8-d's unmeasured per-request launch count names its instrument but no runner or stage. Either name the stage, or state it as a limit with a detection owner. | critique cycle 9 (`e233c82`) | Discharged at rev 27 (X-24). |
| QA Assumption Not Checked (`b21c7b5`). D36's startup line sees only a missing member. A generic-pool release that keeps the member's name and changes its shape or meaning passes the line silently. RK-8's post-closure handoff (M9 carrier line) should therefore run the M8-d probe, a failing factory with a waiting request, at the lockfile-move deploy, and not only read the startup line. QA stated no severity. The planner rates it LOW: it bites only on a generic-pool move, which RK-8's carrier already catches, and it changes no code, test or pre-release verifier. | QA re-key (`b21c7b5`) | Open. Fold at the seam before UAT (RK-8 and the M9 carrier line). |
| CR-32 (LOW). M5-h (3)'s re-run trigger omits `src/utils/limits.tsx` (`validateEmbedCharacterCount` throws on `embeds: ""`, CR-20), which is one of the four crash sites found by execution. Preferred trigger: any non-test change under website `src/` after the last run's SHA (about 10 s per run). Also: cite `class-noguard-run2-476c633.txt`, and say the enumerator "reverses the guard commit" (`09c7c45`), not "restores page.tsx". This changes a pre-release verifier's trigger, not code. | code review Round 20 (`b5666ed`) | Open. Fold at rev 28, once the critic's rev 27 verdict is in. |
| CR-33 (LOW). M8-d (d)'s member is the renamed field alone. The remedy reaches `_waitingClientsQueue.dequeue`, and keeping the field while renaming `dequeue` exits the same way: code 1 after 424 ms (`verification/015/cr-m8-probes/rk8-method-mutant-6c613a5.txt`). Name the member "`_waitingClientsQueue` with a callable `dequeue`" and add that run as a second member. State the dequeued request's `reject`, which cannot be checked at startup, as RK-8 residue. This makes (d) meet D36's "removes the private part", so it rides D36. AF-30's guard form already checks `dequeue`; steering was told at once so the guard is built to it. | code review Round 20 (`b5666ed`) | Open. Fold at rev 28, once the critic's rev 27 verdict is in. |

## Resumption State (checkpoint, planner-hooks-015)

- **Done (checkpoint 2026-11-08T09:24).** The plan is at revision 26 (`c375d2c`). All four gates approved rev 25 (architect `5efb7ab`, code review Round 15 `1d0059a`, QA `983a84d`, critic cycle 8 `4429f17`). Revs 20–26 this generation:
  - rev 20: CR-14/D29;
  - rev 21: CR-16/D30 (M3 removed);
  - rev 22: CR-18/D31/D32;
  - rev 23: M5-h as a crash-set property; D33;
  - rev 24: CR-21; M5-i; D34 with X-20 and `handoff/one-hooks-user-several-discord-accounts-2026-11-08.md`;
  - rev 25: CR-23; L-C7-1; AF-28; X-22;
  - rev 26: CR-29; D35; M8-d as a property; RK-8; L-C8-1.
  Registrations R-6 to R-11 are all discharged; the Planner batch table has no open row. Planner reads committed: `verification/015/m5h-class-probe/` (44 rows, website `da24eb7`) and `verification/015/m5-modal-seed-next-keying-read.txt` (next 16.1.6 source).
- **In flight.** Steering briefed rev 26 over `dd9e88a..c375d2c`: critic (cycle 9, new file), architect, code review gate read, QA re-key. Each gate delivers to the planner. On arrival:
  - record each verdict in the rev 26 owed-verdicts row (it says "critic (cycle 8)", but steering briefed cycle 9; correct it then);
  - park LOW findings that change no code as Planner batch rows (R-12 onward);
  - fold anything that changes code or a criterion the implementer is waiting on, as rev 27, once every gate's verdict is in, or at once if it unblocks waiting code.
- **Next.**
  - **Standing rules.**
    - Under D28, fold same-defect sibling sites without an owner question and report them.
    - After implementation approval, park findings that change no code, test or pre-release verifier as Planner batch rows.
    - Membership claims about code behaviour cite an executed read, never a source reading: rev 22, rev 23 and the 0-nodes misread each cost a round.
    - A plan states properties, never mechanisms (the M8-d lesson).
  - **Open, not a finding.** QA left "refused" open between a throw and an empty return in the CR-12 rider; pin it only if a gate asks.
- **Open with others.**
  - None of the planner's questions to the owner are pending.
  - With the implementer: CR-22 (M6-a empty-line fences) and CR-27 (M8-a). Both are code fixes with no plan change.
  - Security: security-hooks-015 started on the generator change (steering's 09:22Z re-weigh). Its findings may reach the planner.
- **Uncommitted, left in place.** `INBOX.md` holds this session's FYI entry: the research document's `pm2 show` advice. Per the inbox rule, the domain owner commits it. `tools/check-repo.js` reports 33 problems, none in planner documents; QA logged the item in INBOX.
- **Branches.** The website and preview-image-generator chain branches are steering's. The planner touches no source. No process is running.
