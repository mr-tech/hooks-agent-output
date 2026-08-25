---
ID: 013
Origin: 013
UUID: 22d69e06
Reviewed-At: "Round 20 (current, binding): abcf585 on branch chain/013-toast-vessel — the owner-ruling 2026-08-25 toast→persistent-vessel round (five paths: NewMessageJsonInput.tsx, MessageProvider/index.tsx, CodeMessageNotice.tsx [new], layout.tsx, 013-owner-toast-vessel-2026-08-25.test.ts [new]). Base = merge-base(abcf585,a151fb4) = a151fb4, one commit atop it. HEAD and all five blobs verified byte-identical at pass start and end. APPROVED_WITH_COMMENTS, SCOPED — no plan revision, no planner; verdict scoped to code quality + conformance to the relayed owner ruling. This is a POST-RELEASE fix: a151fb4 is live on origin/master (re-derived via git ls-remote, not a tracking ref), so all a151fb4-stamped verdicts are expired and devops must re-run readiness + cut a new release. Superseded/expired: the round-19 verdict at a151fb4 (was live, now the base of this fix). NO VERDICT TRAVELS BETWEEN TREES. Round 19-δ2 (superseded, was the settled tip): a151fb4 — the chain tip has stopped moving. Re-derived with git-side predicates (not piped counts — grep -vc over piped diff is unsound here): `git diff --name-only 53beb37..a151fb4 -- ':(exclude)*__tests__*'` is EMPTY, so the ENTIRE non-test tree is byte-identical to my binding round-19 verdict tree; both reviewed source blobs unchanged (JsonModalBody.tsx cfbec5b, discordResponseToMessage.ts 81f4562). The delta 164d720..a151fb4 is FOUR test files (M/M/M/A — I independently re-derived 4, correcting QA's 3, which counted its own commit), all QA-domain: F-QA21 (a test assertion `flags as number & 32768` that parsed as a TS type assertion, not a bitwise AND, silently asserting flags===0 — a vacuous-green defect in the TEST; the source's switchToClassic correctly clears only the V2 bit, as reviewed round 19), F-QA16 re-anchors (Block-E 'flag never reaches the textarea' REPLACED not restored, per my constraint), F-QA19 new coverage. My CR21-C hole-check block is intact at a151fb4. Zero source delta ⟹ the round-19 APPROVED verdict CARRIES to a151fb4 in full (delta-round identity rule, strongest form). The code-review gate is MET at a151fb4. Round 19-δ (prior tip): 164d720 — a TEST-ONLY micro-round landing INFO-3 (the CR21-C hole-check negatives ported into 013-fqa15-rowd-load-gate.test.ts, +27, one file). The two reviewed SOURCE blobs are byte-identical to 53beb37 (JsonModalBody.tsx cfbec5b, discordResponseToMessage.ts 81f4562), so the round-19 APPROVED verdict carries unchanged; a byte-identical source tree requires identity re-verification, not a fresh attack. Confirmed: diff confined to the one test file; the three ported assertions are byte-for-byte my CR21-C with the same loadDisabled helper; all referenced symbols imported (applyDisposition/resolveContentLoss/validateContentRequirements/FLAG). One non-blocking comment-hygiene note (the added prose block narrates the review exchange; the describe() string already carries the machine-read label). QA cleared to anchor Verified-At at 164d720. Round 19 (binding verdict): 53beb37 (chain/013-components-v2-editing-surfaces) — the QA Phase 2 fix round: JsonModalBody Load gate floors the RESOLVED draft `validateContentRequirements(applyDisposition(validatedDraft))` (F-QA15), and discordResponseToMessage.ts exports its two SUPPORTED_*_TYPES sets (F-QA17, export-only); two files. HEAD and both reviewed blobs (JsonModalBody.tsx cfbec5b, discordResponseToMessage.ts 81f4562) verified byte-identical to the commit at pass start AND end; the tree did not move. Superseded, retained for the record: round 18 at 4e9da96, round 17 at ad9f331, round 16 at e61e602, round 15 at 12f4ce6, round 14 at 66e1974, round 13 at 7890fc9, round 12 at 299b842, round 11 at 54fed63, round 10 at 82af843, round 9 at ee3bc3e, round 8 at b3f8ea9, round 7 at 87cfbd8, round 6 at 816d7fd, round 5 at 0c8fad5, round 4 at 92ce026, round 3 at 18407d8, round 2 at 495463a, round 1 at a4eb00d. NO VERDICT IN THIS DOCUMENT TRAVELS BETWEEN THESE TREES."
Status: Code Review Approved
Status-Detail: >-
  Round 20 (binding) at abcf585 (branch chain/013-toast-vessel): APPROVED_WITH_COMMENTS, SCOPED. The
  owner-ruling 2026-08-25 toast→persistent-vessel round. AUTHORITY IS THIN: no plan revision, no planner
  ("toast" appears 0 times in the plan); verdict scoped to code quality + conformance to the relayed
  ruling, NOT ratification of the ruling (owner's) nor the product call on the retained site (owner's).
  Enumeration (git-side, c85945f..a151fb4): 013 introduced exactly THREE toast.warn, all stateful; the
  change disposes all three — TWO CONVERTED (NewMessageJsonInput settled notice → persistent settledNotice
  state, which also closes my rounds-9/10/11 re-fire class at the root; MessageProvider dropped-types →
  persistent CodeMessageNotice banner), ONE RETAINED with argument (JsonModalBody Load toast). The retained
  site is the substance: I attacked it (sibling asymmetry — same noticeMessageForSettled the sibling now
  renders persistently, and JsonModalBody has a during-edit vessel), but it does not hold the tree — a real
  interaction-model difference (sibling live-applies each parse; Load applies discretely then onClose()s)
  makes "transient action-report" defensible, and the owner himself named "the Load one" as his conditional
  exception. FINAL CALL ON THE RETAINED SITE = OWNER'S (product judgment), routed not shelved. TDD ordering
  lapse disclosed with a valid stash-revert compensation (7/9 red on reverted tree). Test is source-text
  pinning (non-vacuous) not behavioural — DOM residue → Assumption Not Checked, routed to QA/UAT. tsc 0;
  eslint 0 on the four source files. POST-RELEASE: a151fb4 is live on origin/master (git ls-remote), so the
  a151fb4 verdicts are expired and devops must re-run readiness + cut a new release. This Status names the
  non-terminal "review passed" state for the abcf585 tree; DevOps still owns the terminal Committed close,
  and the plan Status stays steering's/owner's. Handing off to the qa subagent for execution. Prior
  (superseded, was live): round-19 verdict at a151fb4.
  CODE-REVIEW GATE MET at the settled final tip a151fb4 (round-19 APPROVED verdict, re-anchored). The
  entire non-test tree is byte-identical from my binding verdict tree 53beb37 through 164d720 to a151fb4
  (git-side test-excluded diff EMPTY); the delta is four QA-domain test files (F-QA21/F-QA16/F-QA19), zero
  source. This status is the non-terminal "review passed" state — it is NOT a terminal status: DevOps still
  owns the terminal close to Committed after the chain commits, and the PLAN document's own Status remains
  steering's to advance (M6 etc. are not mine mid-plan). U-C1 is answerable from here: the verdict is APPROVED
  and now anchored to the tip UAT/QA read. Full round-19 verdict basis follows.
  Round 19, the QA Phase 2 fix round, at 53beb37 (two files: JsonModalBody.tsx, discordResponseToMessage.ts).
  APPROVED. F-QA15: the Load gate now floors the RESOLVED draft — `validateContentRequirements(applyDisposition(
  validatedDraft))` — which is exactly what commitLoad loads (line 73), the structural fix recommended at
  round 16 (CR18-D). Re-attacked from first principles (gate fix, established by execution, probe-cr21 30/30):
  CLOSURE — all 8 row-D members now load (switchToClassic clears the flag + filters to type-1, so the floor's
  hasV2&&hasContent branch cannot fire post-resolution); NO HOLE — empty, flag-only-empty (row C → switchToV2
  keeps empty), and whitespace-only all stay blocked (my CR21-C, the negative the implementer's test lacks →
  non-blocking INFO-3); NO CRASH — the unguarded applyDisposition at the gate is safe only because the parse
  effect stores validatedDraft=null for row E, asserted invariant (CR21-E). Mutation evidence: OLD gate (raw
  floor) blocks the 5712 shape, FIXED gate enables it — CR21-B flips on revert. Steering's four checks each
  re-derived: (1) closure+no-hole CONFIRMED; (2) QA's own probe reproduced independently → 28/29, the sole
  failure being Block A's now-obsolete pre-fix source anchor (QA owns re-anchoring, F-QA16), Blocks B/C/E green
  = no real regression; (3) F-QA18 sweep COMPLETE — all 5 production V2-classification predicates derive from
  V2_COMPONENT_TYPE_VALUES=[9,10,11,12,13,14,17] (incl. Thumbnail 11), no hand-rolled classifier bypasses it,
  gateBeforePersist routes through hasV2Components; (4) F-QA17 export-only, both SUPPORTED_*_TYPES copies
  execute to equal sets {1,9,10,12,13,14,17}/{1,9,10,12,13,14} at runtime (CR21-G). Verification: tsc 0
  project-wide; eslint 0 errors on both changed files (1 warning at discordResponseToMessage.ts:159 is
  PRE-EXISTING, byte-identical at parent, not on a changed line). No CRITICAL/HIGH/MEDIUM findings this round;
  one non-blocking INFO-3 (fix test asserts closure but not no-hole) routed to the implementer. Carried,
  unchanged: MEDIUM-4 predicates still diverge in code (owner-pending); F-QA15's floor gate remains its
  incidental mitigation, preserved by keeping the !!contentFloorError term. Assumption Not Checked (DOM: the
  computed isDisabled actually renders an enabled Load button for row D — no DOM harness at this tree) routed
  to QA Phase 2's refresh pass. Plan Status left to steering. Handing off to the qa subagent for test execution.
---

# Code Review: Plan 013 — Components V2 support across the editing surfaces (M1 only)

**Plan Reference**: `agent-output/planning/013-components-v2-editing-surfaces.md` (read at rev 13; D22 re-read at rev 14, `ae13df0`)
**Implementation Reference**: `agent-output/implementation/013-components-v2-editing-surfaces-implementation.md` (round 1 read at `599856d`; round 2 at `acbbe58`)
**QA Reference**: `agent-output/qa/013-components-v2-editing-surfaces-qa.md` (`98f978e`, Phase 1)
**Critique Reference**: `agent-output/critiques/013-components-v2-editing-surfaces-critique.md` (`d38f057`, cycle 1 pass 5, APPROVE)
**Date**: 2026-08-24
**Reviewer**: code-reviewer-hooks-013

## Changelog

| Date | Agent Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-25 | steering-hooks-013-2 (return channel) | Review new work on `chain/013-toast-vessel` tip `abcf585` (base `a151fb4`): the owner-ruling 2026-08-25 toast→persistent-vessel change; authority flagged thin (verbal ruling, no plan/planner); attack the deliberately-retained third site | **Round 20. APPROVED_WITH_COMMENTS — SCOPED.** Authority re-checked and stated: no plan revision, no planner ("toast" = 0 in the plan body); verdict **scoped** to code quality + conformance to the relayed ruling, not ratification of it. **This is a POST-RELEASE fix** — re-derived `git ls-remote origin master` → a151fb4, so my round-19 tree is live; a151fb4 verdicts expired, devops must re-run readiness + new release. **Enumeration (git-side, c85945f..a151fb4)**: 013 introduced **exactly three toast.warn**, all stateful, zero toast.error/loading — the change disposes all three. **Two CONVERTED, clean, no regression**: NewMessageJsonInput settled notice → persistent `settledNotice` state (removes `lastNoticeClassRef`; **structurally closes my own rounds 9/10/11 re-fire MEDIUM-2 at the root**), and MessageProvider dropped-types → persistent `CodeMessageNotice` banner (internal-consistency with the other M3-b entry points). **One RETAINED with argument — the substance, attacked**: JsonModalBody's Load toast. Sharp attack = the **sibling asymmetry** (same `noticeMessageForSettled` the sibling renders persistently; JsonModalBody has a during-edit vessel). It **does not hold the tree** because a genuine **interaction-model difference** (sibling live-applies each parse → continuous state; Load applies discretely then `onClose()`s → action-report) makes "transient" defensible, and the **owner himself named "the Load one"** as his conditional exception. **FINAL CALL = OWNER'S** (product judgment), routed not shelved: if persistent is wanted, render the notice in JsonModalBody's existing during-edit region and drop the line-72 toast (small, contained). **TDD**: ordering lapse disclosed + valid stash-revert compensation (7/9 red on reverted tree, 2/9 green assert unchanged code — correctly). **Test is source-text pinning, non-vacuous, not behavioural** → DOM residue = Assumption Not Checked (the notices actually rendering/visible), routed to QA/UAT. tsc 0; eslint 0 on the four source files; suite not run (QA's; implementer reports 559/559/0). SHA byte-identical at pass start and end. Status → non-terminal "review passed" for abcf585 (DevOps owns Committed; plan Status steering's/owner's). Handing off to qa. |
| 2026-08-24 | steering-hooks-013-2 (return channel) | Re-verify/transfer my verdict to the settled final tip `a151fb4` (U-C1: no one else will transfer it); rule on the doc `Status` UAT flagged | **Round 19-δ2. CODE-REVIEW GATE MET at `a151fb4`; verdict transferred; Status → Code Review Approved.** Re-derived with **git-side predicates** (steering warned, correctly, that `grep -vc "__tests__"` over piped diff returns a false 3 — RTK positional-predicate hazard): `git diff --name-only 53beb37..a151fb4 -- ':(exclude)*__tests__*'` is **EMPTY** — the **entire non-test tree is byte-identical** from my binding verdict tree through to the final tip; both reviewed source blobs unchanged (JsonModalBody cfbec5b, discordResponseToMessage 81f4562). Delta 164d720..a151fb4 = **FOUR test files** (M/M/M/A via `git diff --name-status`; I independently re-derived **4, correcting QA's 3** — QA counted its own commit), all **QA-domain**: **F-QA21** (a test assertion `flags as number & 32768` that parsed as a TS **type assertion**, not a bitwise AND — erased at runtime, silently asserting `flags===0`, vacuously green; QA mutation-caught it when a flag-wiping mutant survived 15/15, then upgraded severity — a defect in the **test**, not the source: `switchToClassic` correctly clears only the V2 bit `& ~IS_COMPONENTS_V2_FLAG`, as I reviewed round 19); **F-QA16** re-anchors (Block-E "flag never reaches the textarea" **REPLACED not restored**, per my round-9/17 constraint — verified); **F-QA19** new coverage (QA closed a vacuous assertion of its own). **My CR21-C hole-check block is intact** at a151fb4 (lines 106-122). **Zero source delta ⟹ the round-19 APPROVED verdict CARRIES in full** (delta-round identity rule, strongest form: whole tree, not two files). **Status**: moved `In Review → Code Review Approved` — the non-terminal "review passed" state; document-lifecycle defines no "approved" terminal status, so DevOps still owns the terminal close to **Committed**, and the **plan** document's Status stays steering's to advance. Not written to clear a condition — it is the accurate state, and it answers U-C1: verdict APPROVED, anchored to the tip UAT/QA read. Standing condition persists: anything past a151fb4 re-opens re-verification. |
| 2026-08-24 | steering-hooks-013-2 (return channel) | Re-verify the INFO-3 micro-round at `164d720` (test-only, one file) per my standing "any commit after 53beb37 re-opens re-verification" condition | **Round 19-δ. CLEARED — no change to the verdict; QA released to `164d720`.** Test-only round: `git diff 53beb37..164d720` is **one file, +27, pure additions** — `013-fqa15-rowd-load-gate.test.ts`. Both reviewed **source blobs byte-identical** to 53beb37 (JsonModalBody cfbec5b, discordResponseToMessage 81f4562), so the round-19 APPROVED verdict carries unchanged and a byte-identical source tree needs **identity re-verification, not a fresh attack** (delta-round rule). **Port fidelity (the check only I could make, since I wrote the negatives)**: the three ported assertions are **byte-for-byte my CR21-C** — empty draft, flag-only-empty (row C via switchToV2), whitespace-only — with the identical `loadDisabled` helper `!!validateContentRequirements(applyDisposition(draft))`; all referenced symbols are imported (applyDisposition/resolveContentLoss from ~/utils, validateContentRequirements from ~/utils/limits, FLAG), so the block binds to the real functions and passes by identity against the byte-identical source. No source touched; no restoration of the Block-E "flag never reaches the textarea" assertion. **One non-blocking note** (comment hygiene, not held): the added `// Code review round 19 (INFO-3…) — ported from the reviewer's own probe` prose block narrates the review exchange to a human reader — trimmable, since the `describe()` string already carries the machine-read label and the record lives in this document; route to the implementer for any future touch, does not change the decision. Implementer's own numbers (tsc 0, suite 544/538/6 same six pre-existing) are its claims; my clearance rests on the identity + port-fidelity checks above. QA anchors Verified-At at 164d720. |
| 2026-08-24 | steering-hooks-013-2 (return channel) | Review chain 013's QA Phase 2 fix round at `53beb37` (two files: `JsonModalBody.tsx`, `discordResponseToMessage.ts`), doc `5456527`; re-derive four checks | **Round 19. APPROVED.** F-QA15: the Load gate now floors the **RESOLVED** draft — `validateContentRequirements(applyDisposition(validatedDraft))` — exactly what `commitLoad` loads (`:73`), the structural fix recommended at round 16 (CR18-D). Re-attacked from first principles (gate fix, established by execution — `probe-cr21` **30/30** + mutation evidence): **CLOSURE** all 8 row-D members now load (`switchToClassic` clears the flag + filters to type-1, so the floor's `hasV2&&hasContent` can't fire post-resolution); **NO HOLE** empty / flag-only-empty (row C → `switchToV2` keeps empty) / whitespace-only stay blocked (my **CR21-C**, the negative the implementer's own test lacks → non-blocking **INFO-3**); **NO CRASH** the unguarded `applyDisposition` at the gate is safe **only** because the parse effect stores `validatedDraft=null` for row E (asserted invariant, CR21-E). Mutation: OLD gate (raw floor) blocks the 5712 shape, FIXED gate enables it — CR21-B flips on revert. **Steering's four checks each re-derived, not trusted**: (1) closure+no-hole CONFIRMED; (2) reproduced QA's own probe independently → **28/29**, sole failure = Block A's now-obsolete pre-fix source anchor (QA owns re-anchoring, F-QA16), Blocks B/C/E green = no real regression; (3) **F-QA18 sweep COMPLETE** — all 5 production V2-classification predicates (`index.ts:31,71,655`, `limits.tsx:117`, `backfillValid.ts:79`) derive from `V2_COMPONENT_TYPE_VALUES=[9,10,11,12,13,14,17]` (incl. Thumbnail 11); no hand-rolled classifier bypasses it (the only hardcoded `type===N` are structural tree-walks); `gateBeforePersist`→`resolveContentLoss`→`hasV2Components`; (4) **F-QA17 export-only**, both `SUPPORTED_*_TYPES` copies execute to equal sets `{1,9,10,12,13,14,17}`/`{1,9,10,12,13,14}` at runtime (CR21-G, my instrument, not QA's suite). Verification: **tsc 0** project-wide; **eslint 0 errors** on both changed files (1 warning at `discordResponseToMessage.ts:159` is **PRE-EXISTING**, byte-identical at parent, not on a changed line). No CRITICAL/HIGH/MEDIUM this round; one non-blocking **INFO-3** (fix test asserts closure, not no-hole) routed to the implementer. **Carried, unchanged**: MEDIUM-4 (owner-pending; F-QA15's floor gate remains its incidental mitigation, `!!contentFloorError` term preserved). **Assumption Not Checked** (DOM: the computed `isDisabled` actually renders an enabled Load button for row D — no DOM harness at this tree) routed to QA Phase 2's refresh pass. SHA verified byte-identical at pass start AND end. Plan Status left to steering. Handing off to the qa subagent for test execution. |
| 2026-08-24 | implementer-hooks-013-3 (direct, per D22/D26) | Re-review the round-17 MED-6 fix at `4e9da96` (one file, `JsonModalBody.tsx` 1/4), doc `e5c982a` | **Round 18. APPROVED — MED-6 CLOSED; M4 passes code review.** Delta round on the Load guard, re-attacked from first principles. Gate changed to `!validatedDraft || !!contentFloorError`; `isValid` state removed. A full state table over every reachable Load-rendered state shows the new gate **reproduces** the old decision on all three (fresh loadable→enabled, floor-failing→disabled, parse-error→disabled) and flips **only** the dismissed-choice state (enabled→**DISABLED**) — exactly MED-6. The `isValid` removal is behaviour-preserving (`isValid` false only in the catch branch, where `validatedDraft` is also null; **no other reader**, grep-confirmed), and dropping `!!error` is safe (`error` truthy only in the catch branch, `validatedDraft` null there). `!!contentFloorError` **kept**, so MEDIUM-4's mitigation is not widened. MED-6 is now **unrepresentable** — Load disables whenever there is no loadable resolved draft — **at parity with the sibling's `disableSave`**. Executed: `probe-cr19` updated to **17/17**, CR19-B carrying BOTH gates (old=ENABLED control, new=DISABLED fix) so the flip is a measured before/after. tsc 0; eslint 0 on the file; baseline six **MATCH** clean **517/511/6** (implementer's 524 = +7 foreign QA file; **no new test** — gate-expression change + dead-state removal); CR3 122/122; `next build` 0. **Carried, unchanged**: MEDIUM-4 (steering: minimum-fix-only, owner-pending). **M4 passes code review** (HIGH-1 + MED-6 both closed); the one remaining M4 obligation is **QA Phase 2's mounted-render check** for the row-E choice (carried Assumption Not Checked) — a QA-stage item, not a code-review blocker. Plan Status left to steering (M6 unimplemented). Handing off to qa. |
| 2026-08-24 | implementer-hooks-013-3 (direct, per D22/D26) | Re-review the round-16 HIGH-1 fix at `ad9f331` (one file, `JsonModalBody.tsx` 48/17), doc `324cfb9` | **Round 17. APPROVED_WITH_COMMENTS — HIGH-1 CLOSED.** Delta round on a guard fix, re-attacked from first principles. The Preferred/structural fix was taken: `resolveContentLoss` runs **inside the parsing `useEffect`**, and on `requiresChoice` sets `pendingChoice` + `setValidatedDraft(null)` + returns, so the render short-circuits `if (pendingChoice) return <choice/>` **before** the Load gate — `validatedDraft` is null for a row-E draft, so `contentFloorError` no longer hides the choice. JsonModalBody now mirrors the approved sibling `NewMessageJsonInput` exactly. Established by execution: `probe-cr19` **16/16** with a CONTROL modelling the removed `e61e602` wiring (choice unreachable there) — a measured difference, not a vacuous pass. `commitLoad` is doubly guarded (`!validatedDraft` AND `requiresChoice`); no row-E load path exists. Class re-swept and predicate broken: the class is closed on **both** import surfaces; `NewMessageModal:125` (pre-resolved), `DiscordMessageEditor:198` (D15 composer floor) and `limits.tsx:133` (`validateMessage` composition) confirmed non-members. **One NEW MEDIUM (MED-6), does NOT hold the tree**: the escape hatch (`dismissedChoice`/`reopenChoice`) was ported from the sibling but the sibling's submit gate was not — in the dismissed-choice state Load is **ENABLED** (`isDisabled` omits the `!validatedDraft` term the sibling carries as `!loadedMessage`); a click runs a confirmation dialog then no-ops. Integrity intact (`commitLoad` no-ops); the defect is an enabled control that misrepresents its effect. Routed as follow-up. Verification re-run: tsc 0; eslint 0 on JsonModalBody; baseline six **MATCH** clean **517/511/6** (implementer's 524 = +7 foreign QA file; **no new test added**, consistent with a UI-wiring fix); CR3 122/122; cr18 22/22 (predicate facts, now **superseded by cr19** for the wiring). **TDD note accepted**: no new pure function; the falsified M4-c exemption claim corrected in place. **Carried**: MEDIUM-4 still diverges in code (steering: minimum-fix-only); the floor gate still blocks flag-only-V2+content, so its incidental mitigation survives. Plan Status NOT advanced (M4 not complete until MED-6 dispositioned + QA mount check). |
| 2026-08-24 | implementer-hooks-013-3 (direct, per D22/D26) | Review M4 at `e61e602` (eight files), doc `b365ef0` | **Round 16. REJECTED — one HIGH, in M4-c.** M4-a, M4-b and MEDIUM-5 are sound; the defect is the M4-c Load gate on `JsonModalBody`. M4-c added `\|\| !!contentFloorError` to the Load `isDisabled`, with `contentFloorError = validateContentRequirements(validatedDraft)` over the **un-resolved** draft. That predicate is a **superset** of `resolveContentLoss`'s `requiresChoice`, so **every** draft that would trigger the inline row-E choice (`commitSettled`→`pendingChoice`) is disabled at the Load button first — **the row-E choice flow is unreachable dead code.** Violates **D17** (JSON submission surfaces resolve row E via the five-row CHOICE; the `validateContentRequirements` error is D15/composer-only). `probe-cr18` **13/13** with a parent-gate control (row E was ENABLED before M4-c). The impl doc's **TDD exemption** for the M4-c wiring ("render-path only, no new logic") is **falsified** — the `isDisabled` composition changed branch reachability. Fix: gate on `!requiresChoice && contentFloorError` (Preferred: route row E to the choice in the effect, as the sibling `NewMessageJsonInput` already does) — this also **preserves** the round-14 MEDIUM-4 empty-embed mitigation M4-c incidentally provides, so do NOT simply remove the gate. **Verified good**: M4-b parity test non-vacuous & discriminating (`probe-cr18b` 4/4; SUPPORTED sets = schema discriminants, stray Thumbnail-11 removed); **MEDIUM-5 CLOSED** on both paste & ingress (`probe-cr18c`, section dropped+named); M4-a `saveAsPayload` wrap sound; tsc 0; eslint neutral on touched files (flagged issues pre-existing); baseline six **MATCH** at clean **517/511/6** (implementer's 524 was working-tree-inflated by the +7 foreign QA file — same conclusion); CR3 122/122; TDD reds reproduced (git-stash differential + my re-verify). **Carried**: MEDIUM-4 predicates still diverge in code (steering: minimum-fix-only; the M4-c gate is its incidental mitigation). Plan Status NOT advanced. |
| 2026-08-24 | implementer-hooks-013-3 (direct, per D22/D26) | Review M3 at `12f4ce6` (ten files), doc `f8dd433` | **Round 15. APPROVED_WITH_COMMENTS — M3 complete.** First pass; the sweep is the whole surface. **M3-a**: components + the flag carried; the WHOLE `flags` field is copied and that is the **ruled-correct** pass-through (`system-architecture.md:91`, owner ruling: non-V2 bits pass through unexamined) — **I checked the ruling before raising it, and it dissolved my first finding.** **M3-b core correct**: the converter's kept-set **exactly matches** the strict persist shape's discriminants; unsupported top-level/container-child types + non-link ActionRow buttons dropped and labelled; residue reaches all three entry points (code-path toast is a stable one-shot, not the round-9 re-fire). **M3-c** refuses empty success fail-safe. **TDD red reproduced independently** (9 fails, `TypeError` on the new `{data,droppedComponentTypes}` return); implementer **disclosed** a TDD ordering lapse — handled right. `probe-cr17` 15/15, tsc 0, baseline MATCH clean **504/498/6**, CR3 122/122. Architectural grounding **exists**, re-checked. **MEDIUM-5**: a Section **accessory** is never filtered — a non-link button accessory from ingress is carried **unnamed** and fails opaquely at persist (the D9-avoided mode); ingress-specific (paste rejects it loud), outside M3-b's **declared** class, narrow, fail-safe. **LOW-5**: committed tree **fails** `eslint --max-warnings=0` (`member-delimiter-style` on the new `RawComponent` type), contradicting the ESLint-clean claim. **INFO-2** (my round-14 miss): M8-G's `NewMessageModal` choice branch is **dead code** — `loadedMessage` is never row E. Pairing run. |
| 2026-08-24 | implementer-hooks-013-3 (direct, per D22/D26) | Review M8-G at `66e1974` (eight files), doc `e1305c9` | **Round 14. APPROVED_WITH_COMMENTS — M8-G complete.** **T2 fired for the first time in seven rounds** and the persist-path attack it owed was run: an isolated instance (git archive, dummy env, `DATABASE_URL` on dead port `59999` set explicitly per probe-cr14) driven with raw sockets — **every `message.upsert` body returned 401**, so unauth cannot persist; the server shape has no mutual-exclusivity refinement, so once authed the **only** gate is client-side. **TDD red reproduced independently and behavioural**: 5 fails against real deleting code at `7890fc9`+new tests, incl. the exact `expected undefined to be 'Hello world'`. Writer sweep re-run and broadened to the v1 write surface (GET-only, no server writer); all three real writers gated, both canned-intro writers confirmed non-members. **MEDIUM-4**: the persist gate's `hasClassicContent` is narrower than the send floor's `validateContentRequirements` — they disagree on empty-ish embeds — so retiring `stripKeys`' deletion turns a pasted V2+empty-embed from cleaned-and-sendable into retained-but-**unsendable with no choice** (`probe-cr16` 21/21, with a `7890fc9` control); malformed-paste-only, fail-safe, root pre-existing; fix **aligns the predicates**, not restore the deletion. **LOW-3**: the choice UI is triplicated and `SaveAsMenu` strands its choice on dismissal — round-9 MEDIUM-3 recurring in a new copy; `SaveChoiceModal` extracted but used by one of three sites. Two non-test `stripKeys` consumers (send wire form fail-closed, `usePusher` hash parity) cleared. CRITICAL-1 reconfirmed live on the v1 control, **not re-escalated**. Pairing run; **T2 fired**. |
| 2026-08-24 | implementer-hooks-013-3 (direct, per D22/D26) | Re-verify the round-12 HIGH-1/INFO-1 fix at `7890fc9` (two files), doc `4d00fa1` | **Round 13. APPROVED — M2-c complete.** HIGH-1 closed **structurally**: the overwrite sentence is unconditional and the diff additive, so the class is unrepresentable. `probe-cr13` (16/16) with a `299b842` control that fails the same assertion, plus an exhaustive 18-cell sweep. Red reproduced at `7890fc9~1` and it is **behavioural**, not existence-only. `probe-cr12` correctly expired 6/13 — and the contrast with `probe-cr10` (which never expires) validates round 11: **import your subject, do not transcribe it.** **The class sweep was incomplete** — their predicate could not see `showConfirmation(` or `.ts` files, so there are **five** sites, not three. `usePusher.ts:43` is a genuine member; root cause is `hasChanged` being gated on `status === "authenticated"`, which also makes `Navigation`'s Reload **skip its dialog entirely**. Pre-existing and out of chain scope — **routed to steering as a handoff candidate, not held**. Pairing run; T2 empty for the sixth round. |
| 2026-08-24 | implementer-hooks-013-3 (direct, per D22/D26) | Review M2-c at `299b842` (three files), doc `b7a7801` | **Round 12. REJECTED — one HIGH.** M2-c's criterion is met and the new functions are correct; the defect is what the wiring **removed**. `describeLoadDiff`'s no-diff branch returns "No component or mode changes.", and that replaced "This will overwrite the current message." as the entire confirmation body. Executed (`probe-cr12`, 13/13): on the **dominant** path — the modal is seeded with the current message — a user overwriting their own edited message is told there are no changes; same for content replaced, embeds replaced, and 3 containers collapsing to 1. The repo's other two confirmations both state their consequence. **TDD verified, not accepted**: red reproduced at `299b842~1` (12 failed), and since an existence-red proves only absence, **three mutants run, all killed (7/1/3)**. `joinWithAnd`'s behaviour-preservation **settled by execution** — 2000-case randomised differential with a positive control. `import/no-cycle` confirmed pre-existing from the line-17 import. Pairing run; T2 empty for the fifth round. |
| 2026-08-24 | implementer-hooks-013-3 (direct, per D22/D26) | Re-verify the round-10 fix at `54fed63` (`0/1`, pure deletion), doc `ee1b3a3` | **Round 11. APPROVED.** MEDIUM-2 residual CLOSED — `probe-cr11` (17/17), two arms differing only by the deleted line, so the closure is a measurement not an assertion. Attacked the deletion for suppression holes rather than only confirming it: genuine class changes still warn across an invalid state, row E does not swallow a following warning, the first warning is not suppressed. The row-A re-fire is deliberately preserved and now **asserted**, so a later tidy cannot remove a warning the review chose to keep. **Instrument defect found**: `probe-cr10` is **stale by construction** — it hardcodes the pre-fix body and reported 12/12 at `54fed63` too, where the defect is fixed. Superseded by CR11; the `probe-cr1` hazard reproduced in a new instrument, caught only by re-running the old probe against the new tree. CR11 not exempted from the same critique: it establishes what the line does, the diff establishes it is gone, neither alone suffices. All round-9 findings now closed or routed; pairing run, T2 empty for the fourth round. |
| 2026-08-24 | implementer-hooks-013-3 (direct, per D22/D26) | Re-review the round-9 fix round at `82af843` (`33/4`), doc `46d84aa` | **Round 10. APPROVED_WITH_COMMENTS.** Fix round, so the guard was **attacked, not read**. **MEDIUM-3 CLOSED structurally** — the Preferred fix taken when the Minimum was on offer; `dismissedChoice` + a Resolve button re-entering the same object, cleared on text change. Captured check `probe-cr10` CR10-D **with a pre-fix control**, so it fails if the class returns. **LOW-2 CLOSED** — and the implementer's sweep predicate was **broken and re-run**: theirs matched line-leading `//` only, blind to trailing, block, JSDoc and JSX comments; all four re-swept, zero of any form. **MEDIUM-2 NOT CLOSED** — `probe-cr10` (12/12) falsifies the claim that the transition guard removes the class: the `catch` branch clears `lastNoticeClassRef`, so any unparseable intermediate re-arms the notice and the same warning re-fires, including on text that ends byte-identical; 8 round trips → 9 identical toasts, a measured **lower bound**. The row-A excursion also re-fires but is **defensible and deliberately not raised** — lumping them would have demanded a worse guard. Residual is one line, does not hold the tree, and a reasoned disagreement goes to steering. MEDIUM-1 untouched as routed (`probe-cr9` 24/24). Pairing run both halves; T2 empty at `82af843` with both controls. |
| 2026-08-24 | implementer-hooks-013-3 (direct, per D22/D26) + code-reviewer-hooks-013-2 seam flush (`7e764f2`) | First pass on `ee3bc3e` — the paste surface, M8-F/M8-E parity, one file 69/7 | **Round 9. APPROVED_WITH_COMMENTS.** Third generation on this plan; this is the review the second seam names as the successor's first action. Reviewed as a FIRST PASS, not a fix round — the sweep is the whole surface. Verification re-run and nothing inherited: tsc 0, eslint 0, expected-six MATCH at clean 481/475/6, CR3 122/122, the R9 sweeps, and T2 EMPTY at `ee3bc3e` with path and predicate controls (M8-G still unwired; persist attack still not owed). Built `probe-cr9-paste-surface` (24/24) and with it established by EXECUTION that the disposition is taken on the post-`z.preprocess` object, so `filterSupportedComponents` deletes V2 components before `resolveContentLoss` sees them and row E flips to a settled row — M8-E's "nothing lands until you choose" is bypassed for an enumerated input class, and the notice names only the flag. An old-vs-new differential shows the commit changed WHICH half is silently lost rather than closing the silence. Routed to **M4-b** (D9) rather than held against the tree. Two cheap unit-own MEDIUMs: `toast.warn` fired from a keystroke-keyed effect, and Cancel stranding the surface with no stated cause. **Record correction**: `system-architecture.md` and the 013 architecture findings BOTH EXIST and existed at rounds 6/7/8 — round 6's absence claim is false and three verdicts were scoped by it; re-checked here, not inherited. Plan Status field NOT set, per both seams and steering. |
| 2026-08-24 | steering-hooks-013 (cross-session brief) | Review `a4eb00d` — milestone M1 only, mid-implementation | Round 1. Read plan rev 13 per the Reading Order for this role (Decisions Register in full → Milestones → Out of Scope → Risks), QA Phase 1 (EC-5 and the M1 unit obligations), the critique, both architecture documents, and the implementation document. Every count in the implementation document re-derived rather than accepted. Built and ran a two-tree differential probe (`verification/013/probe-cr1-hash-producer-consumer/`) to settle M1-d's final clause by execution. **REJECTED** on one HIGH. |
| 2026-08-24 | steering-hooks-013 (D22 amendment, mid-pass) | Fix rounds run direct with the implementer from the first finding set onward | Read D22 at plan rev 14 (`ae13df0`) directly, not from the relay. This verdict still goes to steering, as the amendment says. Findings from here go to `implementer-hooks-013`; the four never-settled classes are marked inline where they arise (HIGH-1 carries one). |
| 2026-08-24 | implementer-hooks-013 (direct, per D22) | Re-review M1 fix round 1 at `495463a`; implementation doc at `acbbe58` | Round 2. Every enumeration in round 1 re-run rather than inherited, and the differential re-derived from first principles: the round-1 instrument hardcoded the old consumer form, so it was rewired to read the tree under test and then validated by reproducing the round-1 captures case-for-case before it was trusted. Sixteen new cases added, including two false-negative controls the round-1 corpus had no way to express. Second probe built to settle MEDIUM-1's extraction by execution. Implementer's own specs mutation-tested. Two of my own slips are disclosed rather than left silent: I introduced a `check-repo.js` basename collision mid-pass and cleared it by renaming the three probe configs, and one append landed a stray copy of a review-document fragment in the `website` working tree, which I removed within the same minute — `git status` in `website` is back to the same two untracked out-of-scope files it started with, and no tracked file was touched. **APPROVED_WITH_COMMENTS.** |
| 2026-08-24 | implementer-hooks-013 (direct, per D22) | Review M7 — mode follows the flag (D15) — at `18407d8`; implementation doc at `83164da` | Round 3. First pass on M7. Plan re-read at rev 16 per this role's Reading Order (Decisions Register -> Milestones -> Out of Scope -> Risks), including D15/D16/D7/D17/D24 and R8. Every enumeration in the implementation document re-derived. Third probe built (`probe-cr3-mode-predicate/`) to settle the classification change by execution over the whole 36-cell (flag x structure) partition rather than from the diff, with three mutants as controls and the implementer's own spec mutation-checked. **APPROVED_WITH_COMMENTS.** |
| 2026-08-24 | steering-hooks-013 (correction, post-verdict) | "QA is not the next stage" — second round running | Correction pass, no verdict change and no re-review: `18407d8` unmoved. Verified the phasing against the plan myself rather than on the relay — Testing Strategy says QA Phase 1 runs **before** implementation, so Phase 2 follows implementation's completion, not a milestone; five milestones remain and the implementer's next step is M8's **EC-3** (QA's F-QA4, High). Round 3's Next Steps rewritten and round 2's left standing with a marked correction rather than silently edited. Round 1 had this right; rounds 2 and 3 drifted from it, which is my regression and is recorded as such. Steering has lodged the underlying definition gap for retrospective → pi (`~/.claude/agents/INBOX.md`, `ee1ae0e`). |
| 2026-08-24 | steering-hooks-013 (D25 round) — self-initiated follow-up | Steering asked to be told if the per-round expected-six check is thinner than it is being treated as | Between-rounds note, **no verdict, no re-review**; `18407d8` remains the binding tree and `92ce026` is unsubmitted. Tested the check rather than introspecting about it. One of my own worries collapsed — the five `standardizeMessage` reds are per-test, not module-load, so nothing is masked and the check is stronger than I had framed it. The baseline itself was prose, so it is now an instrument: `verification/013/baseline-expected-six/` (`63b9a91`), four controls, end-to-end run re-deriving round 3's 443/437/6. Building it diagnosed **INFO-4** — suite figures are quoted from the shared working tree, which vitest contaminates with other sessions' untracked test files; measured twice at +7/+7/+0, cause named as `qa-hooks-013`'s 7-test probe. Residual blind spot stated, not closed, with CR3 named as the compensating instrument. No QA re-anchor requested. |
| 2026-08-24 | implementer-hooks-013 (direct, per D22) | Review M8's **entry condition EC-3** — the pure resolver and persist gate — at `92ce026` | Round 4. First pass on EC-3; **not** milestone M8, which has not started. Fourth probe built (`probe-cr4-disposition-gate/`) to settle the disposition by execution over the whole eight-cell partition, with expectations transcribed from the **plan's** table rather than the code, four mutants as controls, and one attempted mutant recorded as NOT RUN because the shell left a literal `\n` and its green is not evidence. TDD red re-derived by reverting `utils/index.ts` to `18407d8` against the `92ce026` spec (15/4 TypeError, matching the table). Implementer's spec mutation-checked and genuine. `tsc`, `next build` and the failure set all re-derived on clean extractions; two instrument failures of my own (Turbopack rejecting an out-of-root `node_modules` symlink, and a gitignored `.env`) are recorded in `gates/README.md` rather than reported as build failures. Three MEDIUM, one LOW (routed to QA), two INFO. **APPROVED_WITH_COMMENTS.** |
| 2026-08-24 | implementer-hooks-013 (direct, per D22) | Re-review the EC-3 fix round at `0c8fad5` (`2f49182` + `0c8fad5`) | Round 5. Sweep re-run rather than the flagged sites checked; the round fixed a **guard** and an **instrument**, so both were re-attacked from first principles rather than read. Fifth probe built (`probe-cr5-application-half/`): all three round-4 MEDIUMs verified closed by execution, the implementer's vacuous-`.toThrow()` self-catch confirmed by reintroducing the loose form (it passes against a tree with no `applyDisposition`), and the new import cycle probed in **both** module orders. Two new MEDIUM found by re-attack, both in `applyDisposition` — an untied draft/disposition pair demonstrated to destroy a body silently, and an advertised `dropSet` that disagrees with what is enacted. One INFO records my own round-4 inconsistency (the spec's header row table). **APPROVED_WITH_COMMENTS.** |
| 2026-08-24 | implementer-hooks-013-2 (direct, per D22) | Re-review the round-5 fix round at `52e0e8a`; re-anchored mid-pass to `816d7fd` | Round 6, and the first round by this reviewer generation — carried from files (`e0f477f`, `3304fad`), not from a conversation. Every sweep and every figure in the implementation document re-derived rather than accepted, including the architecture document's absence, which was re-checked from the workspace root rather than inherited. The implementer's comment-only claim for `816d7fd` was settled by **executing** it — emitted JavaScript compared byte-for-byte at both commits — after a **positive control** caught my first comparison reporting IDENTICAL over four empty files, which is recorded in full because it is the defect this role raises against others. Sixth probe built (`probe-cr6-derivation-round/`): an exhaustive 1120-draft corpus, an oracle written independently of the implementation, a mutant control, and a purity check under frozen inputs. TDD red re-derived (10 red, matching) and **classified** — 5 discriminators, 4 pre-existence TypeErrors, 1 throw-match — so MEDIUM-2's fix is test-gated and MEDIUM-1's is not. Both round-5 MEDIUMs closed structurally; two new MEDIUM about enforcement rather than behaviour, one of them found by mutating the code to re-add the deleted parameter and watching every gate stay green. The implementer's comment sweep was verified by **breaking its predicate**, which found the class is wider than its comment-shaped form. The plan's Status field was NOT set, for the reasoning given in the verdict. **APPROVED_WITH_COMMENTS**, bound to `816d7fd` and to no other tree. |
| 2026-08-24 | implementer-hooks-013-2 (direct, per D22) | Re-review the round-6 fix round at `87cfbd8` | Round 7. **Scope widened on my own initiative**: `87cfbd8` sits on `a3e758b`, the M2+M8 Load wiring, which no round had reviewed — reviewing only the 1-line delta would have passed the wiring through unexamined. **The adversarial-execution obligation, live since `a3e758b`, was discharged**: an isolated instance stood up with a wholly dummy environment and its database pointed at a dead port (the repository's real config names a remote hosted database, which is not mine to write to), then driven from **raw sockets** — 42 enumerated cases against `message.upsert`, **0 bypasses**, oracle fixed before the attack and asserted on the response and the server log rather than a status code. **Enumerating what the entry point branches on at module scope — a required step of that attack — surfaced a CRITICAL outside this chain**: the `/api/v1` authorization guard cannot fire, for two independent reasons, in front of two handlers with no auth of their own; demonstrated by execution and escalated IMMEDIATE, but kept out of the 013 verdict because `middleware.ts` is untouched by this chain. Seventh probe built (`probe-cr7-wiring-and-boundary/`, 17/17) with a negative control on the validator. Two hypotheses of mine were tested and **died** — the top-level component-type gap, and a `dropSet` wording concern from round 6 that `DROP_SET_LABELS` already resolves — and are recorded as such. TDD red re-derived: 3/3, all discriminating, no arity artifacts. LOW-1's class recurred in its own replacement, established by 4 mutants with no separation, so the ask is a rule rather than another point fix. **APPROVED_WITH_COMMENTS**, bound to `87cfbd8`. |
| 2026-08-24 | implementer-hooks-013-2 (direct, per D22) | Re-review the round-7 fix round at `b3f8ea9` (LOW-1: delete a dominated regression test) | Round 8, deliberately short — a 15-line test-only deletion. Verified what a deletion can actually break rather than re-reviewing the tree: exactly one test removed (counted independently on both trees), and **zero mutant-detection capability lost**, established by re-running round 7's mutant set plus more against the post-deletion file. Pairing, probes, spec, typecheck and the pinned failure set all re-run. **One INFO found while checking the deletion**: `switchToClassic`'s embed preservation is held by exactly one *incidental* assertion across 370 tests, and that test has already been rewritten twice in this chain — routed to QA's follow-up register, not held against the tree, per the rounds-stop rule. **A correction to my own round-7 rule, recorded rather than quietly applied**: a dominance matrix reported a dominated pair four times and all four were artifacts of my mutant set, each dissolving when the missing mutant was added — so dominance licenses deletion only when it is *structural*, which is what round 7's actually rested on. **APPROVED**, bound to `b3f8ea9`. |
| 2026-08-24 | steering-hooks-013-2 (generation seam) | "Shore up your state and prepare to handoff to a successor code-reviewer session" | **Seam flush, no verdict and no re-review.** State re-derived rather than remembered: my domain is clean and committed (83 instrument files, 9 probes, both READMEs, verified by `git ls-files` after an initial `0` that was my own persisted-`cd` bug and is disclosed as such); `agent-output` has moved three commits past mine, so **D26** (plan rev 18) and the **owner's handoff disposition of CRITICAL-1** (`a3d60d5`) were read first-hand rather than assumed. **The mandatory end-of-pass SHA re-verify fired**: the tree moved mid-flush from `b3f8ea9` to `ee3bc3e` as the paste-surface commit (M8-F/M8-E parity, 69/7 on `NewMessageJsonInput.tsx`) landed while I wrote. The flush was corrected by replacement rather than smoothed over, and the successor's first action changed from "wait for a commit" to "review `ee3bc3e`" — production source on a surface no round has examined, reached by no verdict in this document. T2 re-run at the new HEAD: still empty, both controls firing, so M8-G is unwired and the persist attack is still not owed. Established the file is untouched by the chain three independent ways after `git log \| grep -c ''` returned **1** over a **0-byte** result — a new instance of the standing RTK unsoundness, recorded. Every command handed to the successor was **run and controlled first**, which caught a wrong path in the first seam's own writer list (`SaveAsMenu.tsx`). All six first-seam obligations dispositioned: one discharged and re-scoped, five still standing. Two of nine probe rigs found in the degenerate state and the repair recorded. |

## Scope Actually Assessed

`a4eb00d` is one commit and it is milestone **M1** in full — no more, no less. Confirmed against the
tree rather than against the commit message:

```
git -C website diff --numstat c85945f a4eb00d
1   0   package.json
2   2   src/app/message/m/[id]/_components/JsonModalBody.tsx
2   2   src/app/message/m/[id]/_components/SaveAsMenu.tsx
116 0   src/utils/__tests__/013-m1-transport-form.test.ts
12  35  src/utils/index.ts
```

Five files, matching the implementation document's Files Modified / Files Created tables. **M2–M8
are not reviewed, not scored and not commented on** — they do not exist at this tree.

Two untracked files are present (`013-m7-mode-follows-flag.test.ts`,
`013-qa-phase1-seed-route-probe.test.ts`). Declared out of scope by the brief; neither is read as
coverage of any criterion here. Noted only because the first fails collection
(`Invalid environment variables`), which changes `numTotalTestSuites` from the 133 the
implementation document recorded to 134 while contributing zero tests — see Verification Re-Run.

## Verification Re-Run (Validation item 1 — "the reviewer and QA re-run, never inherit")

Nothing below is inherited from the implementation document; each was re-derived at `a4eb00d`.

| Check | Method | Result |
|---|---|---|
| Typecheck | `npx tsc --noEmit` | **0 errors**. The D21 `typecheck` script exists in `package.json`, so Validation item 1 now names a command that runs. |
| Build | `npx next build` | **exit 0**, `✓ Compiled successfully in 9.6s`, 9/9 static pages. |
| Full suite | `npx vitest run --reporter=json --outputFile=…`, totals read from the JSON reporter (never a piped count — RTK.md) | `numTotalTests` **425**, passed **420**, failed **5**, suites **134**. Reconciles with the implementation document except the suite count, explained by the untracked M7 file added to the tree after that document was written. |
| The 5 failures | JSON reporter, per-assertion | **All 5** in `src/utils/__tests__/012-json-editor-repair-path.test.ts`, all `TypeError: standardizeMessage is not a function`. Exactly the expected consequence of M1-a, on the file QA's Phase 1 red-test-domain table names as row 1, which is QA's to re-anchor at Phase 2. **Nothing else is red.** |
| M1-a enumeration (Validation item 2) | `grep -rc standardizeMessage src bot public prisma` — counts computed inside grep | 2 files, 4 hits: `013-m1-transport-form.test.ts:1` (a doc-comment reference in the new spec) and `012-json-editor-repair-path.test.ts:3`. **Zero in `src/utils/index.ts`, zero at any write boundary, seed control or hash.** M1-a holds. |
| R2 / assumption 3 (the plan assigns this capture **to the reviewer**) | `git diff --numstat c85945f a4eb00d -- '*valid*'` → empty | `src/server/api/utils/messageValidity.ts` is **unchanged** between base and tip. No member of R2. Note for the planner: R2's row names the file as `messageValidity.ts`; its actual path is `src/server/api/utils/messageValidity.ts`, and a bare-basename check resolves to nothing. Not a defect in the code — a citation that a reader following it literally cannot resolve. |
| TDD red claim | the implementer's own spec, byte-identical, executed against the pre-M1 tree | **3 of 7 red**, with exactly the quoted `AssertionError: expected '1c94efab' not to be '1c94efab'`. See LOW-1. |

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md` (D-001–D-005) and
`agent-output/architecture/website.md` (W-1–W-6), both read directly at this pass. Both exist; I state
that having read them rather than inheriting the implementation document's claim that it read them.

**Alignment Status**: **ALIGNED**.

The plan's own `Architectural-Surface` field says *"none added — consolidation of an existing
serialisation seam inside `website`"*, and that is what the diff does. `canonicalize` is a private
module-local helper on the existing seam; no new layer, contract or core path appears. The change
direction — one transport form replacing a lossy display projection — is a reduction in
representations, not an addition.

## TDD Compliance Check

**TDD Table Present**: Yes. **All Rows Complete**: Yes.

**Verified rather than accepted.** I copied `013-m1-transport-form.test.ts` out of `a4eb00d`
byte-identical and ran it against a materialisation of the pre-M1 tree
(`git -C website archive c85945f | tar -x -C /tmp/013-base`, `node_modules` symlinked; `git worktree`
deliberately avoided on a shared repo). Result: **3 failed | 4 passed**, with the exact
`AssertionError` string the document quotes.

So the table's *"Failure Verified? Yes"* row is **true, and stronger than claimed** — see LOW-1.

The `canonicalize` row's exemption argument is **honest and correct as far as it goes**: it states
plainly that the helper is not gated as its own unit and why. I verified the underlying claim rather
than accepting it. The two cases that exercise `canonicalize`'s distinguishing behaviour — key-order
equality and `_key` equality — were **green at `c85945f`**, so neither is red-then-green against the
pre-fix defect. They are not thereby worthless: both discriminate against the obvious wrong
implementation (a bare `JSON.stringify(data)`), which is a real guard. The document does not
overclaim them, and I record this as verified-and-accepted, not as a finding.

What *is* a finding is the pair of round-trip cases offered as M1-b's and M1-c's instrument, which
also pass at `c85945f` — see MEDIUM-1.

## Adversarial Execution — why the trigger is not met, and what was executed instead

M1 adds and modifies no security boundary, no authentication or authorization gate, and no
irreversible action. Enumerated against the diff: `SaveAsMenu.onSubmit` writes a **new** record
(create, not destructive); `JsonModalBody`'s change is a seed initialiser; `hashMessage` feeds a
confirmation prompt; `package.json` gains a script. The one destructive normalisation in the
neighbourhood — `stripKeys` deleting `content`/`embeds` under V2 components — is **not changed by
M1**: it already ran, ahead of `standardizeMessage`, at both call sites before this commit. So
standing the service up and driving it over a raw socket is not the instrument this change calls for.

It does not follow that reading was enough. The claim under review — *"the producer and the consumer
compute the same function over the same form"* — is a decision-neutrality claim in the sense the
review standards name: an argument about it does not settle it and the diff's file list does not
settle it. I therefore **executed both trees over a randomised-by-construction corpus of the affected
input class** and compared the one quantity a decision reads (the hash). That instrument, its
positive controls, its captured runs against both trees, and its stated blind spots live at:

> `agent-output/verification/013/probe-cr1-hash-producer-consumer/`

The process producing the evidence is the **product's own round trip** — `stripKeys`, `makeEditable`,
`hashMessage` and `optionalIdMessageShape` are imported from the tree under test at every step;
nothing is reimplemented. Positive controls are required to **mismatch**, so a green matrix cannot be
confused with a probe that imported nothing.

## Findings

### Critical

None.

### High

**[HIGH] Architecture Alignment / Correctness**: `hashMessage`'s producer and consumer still compute
different functions, so M1-d's final clause is false at this tree — and M1 **widens** the class of
false *"Message Update Detected — any changes you have made will be lost"* prompts

- **Location**: `src/providers/MessageProvider/usePusher.ts`, the `message-update` channel handler
  (`hashMessage(stripKeys(messageRef.current))`); `src/server/api/utils/shared.ts`, `upsertMessage`'s
  Pusher trigger (`hashMessage(message)`); `src/utils/index.ts`, `hashMessage`.
- **Class**: A hash used as a cross-tab equality oracle is computed from **two different
  normalisations of the same message** — the producer hashes the server's zod-parsed `data` (which is
  byte-for-byte what is stored), the consumer hashes `stripKeys(<live draft>)`. Any normalisation the
  shape performs that `stripKeys` does not makes an *unchanged* message hash **unequal**, and fires
  the reload prompt on a tab that has lost nothing.
- **Enumeration**: the divergence class is the shape's normalising leaves that sit under `data`.
  `grep -c "\.trim()" src/server/api/utils/shapes.ts` → **21**;
  `awk 'NR>=39 && NR<=137' src/server/api/utils/shapes.ts | grep -c "\.trim()"` → **10** inside the
  component and embed shapes, of which **5 sit under `components`** and therefore entered the hashed
  form for the first time at M1: `linkButtonShape.label`, `linkButtonShape.url`,
  `thumbnailShape.media.url`, `mediaGalleryItemShape.media.url`, `fileShape.file.url`. Consumer/
  producer call sites: `git grep -c hashMessage a4eb00d -- src` → `usePusher.ts:2`, `shared.ts:3`,
  `utils/index.ts:1`, spec `:8`.
  **What this predicate does not match**: `.trim()` is one divergence form only. It cannot see zod's
  unknown-key stripping, `z.preprocess`, `.default()`, `.catch()`, or refinement-driven rewriting —
  and the probe's corpus, built from the shape's *string* leaves, does not exercise those either. A
  divergence introduced through any of them would pass both the grep and the probe. This limitation
  is a property of the predicate and is stated here, not discovered later.
- **Issue**: This is the clause M1-d exists for, and the plan opened **both** files to make it true.
  Plan Scope's inventory assigns `src/providers/MessageProvider/usePusher.ts` (`message-update`
  handler) → **M1**, and `src/server/api/utils/shared.ts` (`upsertMessage` Pusher trigger, the hash
  producer) → **M1**. Neither was opened. Two of M1's five inventory files were left untouched, and
  the criterion they were opened for is the one that is false.
  Established by execution, not by reading — `run-a4eb00d.txt` vs `run-c85945f.txt`:

  | Case | `c85945f` | `a4eb00d` |
  |---|---|---|
  | SEQ-B B1 — trailing space in classic `content` | MISMATCH | MISMATCH *(pre-existing)* |
  | SEQ-B B2 — trailing space in a **button label** | equal | **MISMATCH (new)** |
  | SEQ-B B3 — leading space in a **V2 accessory URL** | equal | **MISMATCH (new)** |
  | CTRL C2 — a genuine V2 component-body edit | **EQUAL — the defect M1 fixes** | mismatch, as required |

  The last row is worth stating on its own: **M1's headline fix is real and independently confirmed
  here.** The finding is not that M1 broke change detection; it is that M1 turned the hash's blindness
  into the hash's over-sensitivity in a class the plan told it to close, at two files it did not open.
  The prompt is persistent rather than a race window: `MessageProvider`'s `upsert.onSuccess` does
  `setSavedMessage(message)` and never replaces the live draft with the server's parsed form, so the
  divergent draft survives the save and every later broadcast re-fires the prompt until the user
  reloads.
- **Magnitude**: measured where measurable, declared where not. **Measured**: 3 of 19 probe cases
  mismatch at `a4eb00d` against 1 at `c85945f`; **2 of the 3 are new**; the newly reachable trigger
  surface is 5 `.trim()` sites. **Not measured**: how often a real user's draft carries a trimmable
  component string — I have no database access and no production telemetry, and the probe establishes
  a mechanism and a reachable input class, never a rate. That half is an **unmeasured hypothesis** and
  is not what this finding gates on. What it gates on is the measured half: an acceptance criterion of
  the milestone under review is reported delivered and is demonstrably false.
- **Plan Risks row**: this instantiates the falsifier of **R4 — "Hash change breaks cross-tab
  detection during rollout"**, whose falsifier reads *"A 'Message Update Detected' prompt firing on
  every save for a client that has not reloaded."* B2/B3 are literal members. R4's *mitigation* is
  "Accept", but R4's stated cause is **rollout skew** (old client, new server) — a transient. What the
  probe found is a **permanent same-version divergence**, which R4's acceptance argument does not
  cover. Naming the row so the planner can write the prediction record in this cycle rather than a
  later one.
- **Required Action** — eliminate the class, not the three cases:
  - **Preferred (structural)**: give the hash **one** normaliser that both sides call, so the two
    forms cannot drift. Since `canonicalize` now strips `_key`s itself, the consumer's `stripKeys`
    call is no longer needed for its original purpose and is the sole remaining source of asymmetry;
    the natural shape is for `hashMessage` to own the whole normalisation (shape-parse included) and
    for both call sites to hand it the raw message. Note the trade-off before choosing: dropping the
    consumer's `stripKeys` makes a stored row that is not a `stripKeys` fixed point hash differently
    from the composer's view of it — which the probe's SEQ-A shows is *unreachable today*, because the
    only `id`-bearing writer applies `stripKeys` before the payload leaves the browser, but which M4-a
    is scheduled to change. Design the fix against that, not around today's reachability.
  - **Minimum**: at the consumer, normalise through the same shape the producer's input passed
    (`discordMessageShape` / `optionalIdMessageShape`) before hashing, at the single `usePusher` call
    site. This closes B1, B2 and B3 together.
  - **Not acceptable as the fix**: special-casing trim at the five enumerated leaves. That restores
    exactly the reasoning that produced the class — two normalisations kept in sync by hand — and the
    next shape change silently re-opens it.
- **D22 routing, stated so it is not settled in the wrong place**: making the two call sites agree is a
  code fix inside M1's own inventory and is **yours**. Changing what the shape stores — removing or
  relaxing `.trim()` — is a **product-behaviour change** and is **D22 exception 1**: it goes to
  steering for the planner, and must not be agreed between us. If you judge that this is not a finding
  at all, that is **D22 exception 2** — stop and send it to steering rather than arguing it here.

### Medium

**[MEDIUM] Checks That Cannot Fail**: the tests offered as M1-b's and M1-c's instrument pass on the
tree that has the defect those criteria name

- **Location**: `src/utils/__tests__/013-m1-transport-form.test.ts`, `describe('M1-b/M1-c — the
  transport form round-trips the whole message')` — both cases.
- **Class**: A test presented as an acceptance criterion's instrument that exercises a code path the
  change did not touch. It cannot fail under the defect the criterion exists to detect, so a green
  result carries no information about the criterion — while being counted as if it did.
- **Enumeration**: run the spec against the base tree and read which cases are green there.
  `PROBE_SRC=/tmp/013-base/src npx vitest run …` → **4 of 7 green at `c85945f`**, two of which are
  exactly these. Corroborated structurally: the `src/utils/index.ts` hunks touch only
  `standardizeMessage` → `canonicalize` and `hashMessage`; `stripKeys` and `makeEditable` — the two
  functions these cases call — are **unmodified** between `c85945f` and `a4eb00d`.
  Captured at `verification/013/probe-cr1-hash-producer-consumer/run-m1spec-vs-c85945f.txt`.
  **What this predicate does not match**: running the spec against the base tree cannot see a test
  newly written against *unchanged* code inside a file the diff *does* touch, nor one whose fixture is
  green at base for an unrelated reason.
- **Issue**: M1-b is *"Save As is a faithful copy"* and M1-c is *"the JSON view shows the whole
  message"*. What M1 actually changed for those is **two expressions**: `SaveAsMenu.onSubmit`'s
  `data:` and `JsonModalBody`'s seed. Neither is executed by any test. The cases that stand in for
  them test `stripKeys(makeEditable(x))`, which behaved identically before the commit. The
  implementation document is candid that the call sites are *"verified by direct reading"* — but its
  Milestones Completed table still records M1-b and M1-c as delivered, and the Test Coverage section
  presents these two cases as *"M1-b/M1-c instrument"*.
  The plan does not sanction this gap the way it sanctions others: **M1-b and M1-c are absent from
  "Surfaces Without Automated Coverage"**, whose list is explicit (M2-c, M3-b, M3-c, M4-c, M8-B, M8-D,
  M8-E, M8-G, M4-b). The Testing Strategy puts M1-b in the unit suite and says the enumeration is to
  be **"generated across the shape's partition rather than hand-listed"**; QA Phase 1 restates it with
  the partition spelled out, adds *"the JSON modal seed and Copy output parse through
  `discordMessageImportShape` to `≡` the stored `data`"*, and adds *"producer and consumer compute the
  same function over the same form"*. Two hand-authored fixtures at a layer the change did not touch
  is none of those things.
- **Whose work this is, split honestly**: the **generated partition suite is QA's** — the plan says
  *"Test cases are QA's, not this plan's"* — and I am not asking you to write it. What is yours is
  that the two changed expressions are currently **unreachable** by any module-level test, which is
  what forces the substitution in the first place.
- **Required Action**:
  - **Preferred (structural)**: make the two changed expressions reachable without a browser harness —
    extract the Save-As payload and the JSON-modal seed as small exported pure functions over
    `message` in `src/utils/index.ts` (M1's own file) and have the two components call them. The class
    disappears because there is then nothing left that only a component can execute.
  - **Minimum**: correct the claim rather than the code — mark M1-b and M1-c in the implementation
    document as *delivered in code, instrument owed to QA Phase 2*, and stop citing the two round-trip
    cases as their instrument. This is the acceptable outcome if you and QA prefer to leave the
    extraction to M2, which reopens both files anyway.

### Low / Info

**[LOW] TDD Compliance**: the red set is under-reported — 3 cases were red, 2 are named
- **Location**: implementation document, TDD Compliance table, `hashMessage` row; and `a4eb00d`'s
  commit message (*"both hashMessage both-directions cases (flag-bit change, component-field
  change)"*).
- **Class**: a TDD record that names a subset of the cases that were red. It understates rather than
  overstates, so it is not a false claim — but a later reader reconciling the record against the tree
  finds a discrepancy and cannot tell which direction it runs in without re-deriving.
- **Enumeration**: the spec's 7 cases, run at `c85945f` — 3 red (`differs when a message gains V2
  components…`, `differs when the V2 flag bit changes…`, `differs when a component field changes…`),
  4 green. Captured at `run-m1spec-vs-c85945f.txt`. Cannot be broader: the class is one table row.
- **Required Action**: **Minimum** — name all three red cases in the table row. No structural form.

**[LOW] Observability / Evidence**: M1-a's plan-mandated instrument was substituted, not run
- **Location**: implementation document, *"M1-a instrument (Validation item 2)"*.
- **Class**: an acceptance criterion naming two instruments, one of which is discharged by the other.
- **Enumeration**: M1-a says *"enumerated by symbol reference (serena `find_referencing_symbols` on
  `src/utils/index.ts`, and `grep -rc` as the independent count)"*; Validation item 2 says *"M1-a's
  reference list captured in the implementation doc; `grep -rc …` reconciles with it"*. The document
  supplies the grep and calls it the instrument; no reference list is captured. One instrument, not two.
- **Issue, and why it is LOW and not higher**: the outcome is unaffected and I re-derived it. The
  symbol is **deleted**, so `find_referencing_symbols` has no symbol to resolve, and `grep` over the
  name is a strict superset of any reference list — a zero-hit grep is conclusive where a reference
  list would be vacuous. The gap is in the record, not the answer. Worth one line because the same
  substitution at M3 or M8, where the symbols survive, would **not** be conclusive: grep matches
  name-strings, not symbols.
- **Required Action**: **Minimum** — record why grep is sufficient *for a deleted symbol* rather than
  presenting it as the criterion's instrument, so the reasoning does not get reused where it fails.

**[LOW] Error Handling**: the JSON-modal seed can now be the literal `undefined` where it previously threw
- **Location**: `src/app/message/m/[id]/_components/JsonModalBody.tsx`, the `usePassedProp` seed.
- **Class**: an expression whose nullish branch is admitted by the code (`message ?? {}`) but whose
  result is not — `JSON.stringify(undefined, null, 2)` returns `undefined`, and TypeScript's
  `JSON.stringify` overload declares `string`, so `tsc` cannot see it.
- **Enumeration**: one site. `git grep -c "JSON.stringify" a4eb00d -- 'src/app/message/**'` bounds the
  family; this is the only member seeded from a nullable `message`. Cannot be broader without a
  predicate for "stringify of a possibly-undefined value", which no grep expresses.
- **Issue**: disposed of by the review standards' input-robustness order. Step 1: **can the caller
  send it?** The contract says yes — `message ?? {}` is in the source, so the author admitted a
  nullish `message`. Step 2 therefore applies: **the defect is the contract**, not a missing runtime
  guard. Do not add a `?? '{}'`. Either the component's contract says `message` is non-null at render
  (and the `?? {}` goes), or the nullish case is a real state and gets an explicit branch. Step 4 is
  worth stating too: M1 **improved** this — the previous expression called `standardizeMessage(undefined)`
  and threw a `TypeError`. This is a note, not a regression.
- **Required Action**: **Preferred (structural)** — settle the contract at the component boundary and
  delete whichever half is dead. **Minimum** — none required for M1; it belongs with M2, which reopens
  this file.

**[INFO] Dead Code**: `message && hashMessage(message);` — a computed value discarded
- **Location**: `src/server/api/utils/shared.ts`, `upsertMessage`, immediately above the Pusher block.
- **Pre-existing; not introduced by M1 and not changed by it.** Raised because Serialised Shared Files
  assigns `shared.ts` to **M1 only** — no later milestone reopens it — and because it sits in the
  producer half of HIGH-1, which is where the fix for that finding most likely lands. Deleting it
  while you are there costs nothing; deciding it is out of scope is also fine. If the fix for HIGH-1
  goes to the consumer side instead, leave it and say so.

**[INFO] Repository hygiene**: `node tools/check-repo.js` exits 1 — 9 problems, all pre-existing
- Run at this pass per the document-lifecycle self-check. All 9 are chain-012 artifacts: 4 link
  failures and 3 basename collisions under `verification/012/`, and 2 scope-suffix failures, one of
  which — `code-review/012-carry-forward-to-post-refresh-pass.md` — is in **this agent's exclusive
  domain**. My pass creates none of them; re-running after writing this document confirms it adds no
  new failure.
- I have **not** renamed the 012 document. It is cited from `INDEX.md`, chain 012 is still live
  (`012-message-valid-field-code-review.md` is `Status: In Review`), and renaming a committed document
  another document resolves through is not a unilateral act mid-chain. Routed to steering rather than
  done or dropped.

## Positive Observations

These are not courtesies; each was checked.

- **`canonicalize` is the right shape.** Recursive, total over JSON values, `null`-safe
  (`value && typeof value === 'object'` correctly falls through for `null`), order-preserving for
  arrays and order-normalising for objects. It is module-private, which is correct — it has exactly
  one caller and no independent contract.
- **The retirement is complete, not additive.** `standardizeMessage` is **deleted**, not left beside
  its replacement. The review standards' Incomplete Extraction trap — the tested new implementation
  added next to the untested live one, suite green, two implementations of one rule — is precisely
  what was avoided. `grep -rc` over `src`, `bot`, `public` and `prisma` confirms zero source
  references remain.
- **The five red tests were left red.** The 012 file that M1 retires the symbol from was **not
  edited**, exactly as Serialised Shared Files requires, and the implementation document says so with
  the reason. The tempting fix — patch the five failing tests and hand over a green suite — would have
  quietly taken QA's Phase 2 re-anchoring decision away from QA. It was not taken.
- **The scope note is honest.** *"This pass delivered one of seven milestones… this is a scoped,
  honest partial delivery, not a completed implementation"* is the sentence a reviewer most wants to
  find and most rarely does.
- **The `canonicalize` TDD exemption is argued, not asserted.** It states what was not gated and why,
  rather than claiming coverage it does not have. I verified the underlying claim; the argument holds.
- **No source comment was added.** The diff introduces no explanatory prose in the source file and no
  comment addressed to this review. The one comment touched is the pre-existing StackOverflow
  attribution URL, which stays.
- **D21 was enacted minimally.** One line, and `npx tsc --noEmit` now runs — Validation item 1 names a
  command that exists, which it did not before.

## Assumption Not Checked

**This review assumes that `useApiMethods.saveMessage` is the only `message.upsert` caller that
supplies an `id` — and therefore the only writer whose payload becomes a Pusher broadcast — and it
does not test that.** The probe's SEQ-A result (producer and consumer agree in the steady state at
both trees, including the `A9` and `A10` shapes the plan says exist today) rests entirely on it: it is
true only because every broadcast-producing payload passes through `stripKeys` in the browser before
it leaves. I enumerated the upsert callers with `git grep -n "message\.upsert"`, which matches the
mutation-hook name and **cannot see** a payload that acquires an `id` indirectly — through a spread of
an existing message, an `overrideMessage` argument, or a router-level default.

**Falsity signature**: a writer that upserts with an `id` and a payload that never passed through
`stripKeys`. Its observable signature is a SEQ-A mismatch — a *"Message Update Detected"* prompt on a
tab holding exactly what the server stored, with no edit anywhere. If such a writer exists, HIGH-1 is
worse than reported: the divergence would reach the steady state and not only the saving tab, and it
would be reachable without any whitespace.

**Owning stage: QA, Phase 2.** This is not a new obligation invented here — QA's own **F-QA8** already
records that `grep -rc "message\.upsert"` is unsound for the IS-1 writer enumeration and requires
re-derivation by reference-following rather than by that grep. F-QA8's re-derivation closes this
assumption as a by-product. It is named again in Next Steps so it is routed rather than shelved.

## Verdict

**Status**: **REJECTED**

**Rationale**: One HIGH. M1-d's final clause — *"The producer (`upsertMessage`'s Pusher trigger) and
the consumer (`usePusher`) compute the same function over the same form"* — is **false at this tree**,
demonstrated by executing both trees over the affected input class rather than argued from the diff.
The plan opened both of those files under M1 for this purpose and **neither was opened**: two of M1's
five inventory files are untouched, and the criterion they were opened for is the one that fails. The
consequence is measured: the class of false *"any changes you have made will be lost"* prompts is
**wider at `a4eb00d` than at `c85945f`** — 3 mismatching cases against 1, two of them new, through 5
newly-hashed `.trim()` leaves. The implementation document reports M1-d delivered.

The rejection is on that criterion, not on the code's quality. **M1's central fix is real and I
confirmed it independently**: a genuine V2 component-body edit hashed *identically* before this commit
and hashes differently after — my own positive control, not the implementer's test. The diff is small,
correctly scoped, deletes rather than duplicates, and its documentation is unusually honest. Rejected
because an acceptance property of the milestone under review is reported closed and is not.

**This verdict binds `a4eb00d2c4869844bca4cbfa974749cbacc962fa` and no other tree.** Any change to any
covered blob expires it and the review re-runs.

## Required Actions

1. **HIGH-1** — eliminate the two-normalisation class between `hashMessage`'s producer and consumer.
   Structural form preferred; the point fix at `usePusher` is the minimum. **Do not** special-case the
   five trim leaves. If the fix you want changes what the shape stores, that is a product-behaviour
   change → **D22 exception 1**, steering and the planner, not us.
2. **MEDIUM-1** — either make `SaveAsMenu`'s payload expression and `JsonModalBody`'s seed expression
   reachable by a module-level test (preferred), or correct the implementation document so M1-b and
   M1-c read as *delivered in code, instrument owed to QA Phase 2* and stop citing the two round-trip
   cases as their instrument. Your call which; both close it.
3. **LOW-1** — name all three red cases in the TDD table row.
4. **LOW-2** — record why `grep` is conclusive *for a deleted symbol*, so the substitution is not
   reused at M3 or M8 where it would not be.
5. **LOW-3 / INFO-1** — no action required for M1. Judgement calls; say what you decided.

**On re-submission**: send me the new sha. I will re-run every enumeration in this document myself and
re-derive the differential from first principles against the new tree — a fix to a guard or an
instrument is re-attacked, not read. Each disposition needs two things, not one: that the class is
gone, and the path of the captured check that fails if it returns — or `no test`, explicitly.

## Captured Instruments

| Path | What it settles |
|---|---|
| `agent-output/verification/013/probe-cr1-hash-producer-consumer/` | M1-d's producer/consumer clause, by execution over both trees. `differential.test.ts` (19 cases, 2 positive controls), `vitest.config.ts` (tree-selectable via `PROBE_SRC`), `run-a4eb00d.txt`, `run-c85945f.txt`, `run-m1spec-vs-c85945f.txt`, and a README stating the sequences modelled and the probe's blind spots. |

The M1-b/M1-c partition suite is **`no test` from me by design**: Vitest already reaches
`src/**/__tests__/`, the plan puts that enumeration in the project's own suite, and QA owns the cases.
Authoring it here would give it a second home. MEDIUM-1 hands the implementer the extraction that
makes it writable.

## Next Steps

**Handing off to the implementer subagent** — `implementer-hooks-013`, **directly**, per D22 — to
address HIGH-1 and MEDIUM-1 and return a new sha for re-review. Findings go to it; this verdict goes
to steering.

**Routed, not shelved**: the Assumption Not Checked above belongs to **QA Phase 2**, discharged by its
own **F-QA8** re-derivation of the `message.upsert` writer set by reference-following. QA re-derives it
rather than inheriting this review's SEQ-A result.

**To steering**, three items that are not the implementer's: R2's unresolvable file citation
(`messageValidity.ts` → `src/server/api/utils/messageValidity.ts`) and R4's prediction record, both the
planner's; and the mis-suffixed `code-review/012-carry-forward-to-post-refresh-pass.md`, which I have
left in place rather than rename mid-chain.

**QA is not yet due.** This gate is not passed, and QA Phase 2 is scoped to the whole plan, not to M1.

---

# ROUND 2 — re-review of M1 fix round 1 at `495463a`

Everything above this line is round 1 against `a4eb00d` and is retained unedited as the record of
that tree. **The binding verdict is the one below.**

## Scope Actually Assessed (round 2)

```
git -C website diff --numstat a4eb00d 495463a
2    2   src/app/message/m/[id]/_components/JsonModalBody.tsx
2    2   src/app/message/m/[id]/_components/SaveAsMenu.tsx
10   1   src/providers/MessageProvider/usePusher.ts
54   0   src/utils/__tests__/013-m1-fix-round-1-extraction.test.ts
114  0   src/utils/__tests__/013-m1-fix-round-1-hash-parity.test.ts
8    0   src/utils/index.ts
```

One commit, six files, `+190 / -5`. It matches the implementation document's Files Modified / Files
Created tables — re-derived from the tree, not read off the tables. All six were read in full via
`git show 495463a:<path>`, not from the working tree.

`src/server/api/utils/shared.ts` and `src/server/api/utils/shapes.ts` are **unchanged** this round.
Both were nevertheless re-read in full at `495463a`, because the fix's correctness is a claim about
what the shape does and that claim cannot be checked from the side that changed. `shapes.ts` at 259
lines is the load-bearing artifact here; the decisive facts it settles are in HIGH-1's disposition.

**M2–M8 remain unreviewed and unscored.** They do not exist at this tree.

## Verification Re-Run (round 2 — nothing inherited)

| Check | Method | Result |
|---|---|---|
| Typecheck | `npx tsc --noEmit` **in the real repo** | **0 errors**. Run in `website` itself, not in the `/tmp` archive: `git archive` omits gitignored assets, so a `/tmp` tree fails on `TS2307: Cannot find module '~/assets/img/product_image.png'` — an artifact of the extraction, not of the commit. Worth recording because the naive run exits 2 and looks like a regression. |
| Build | `npx next build` | `BUILD_EXIT=0`. |
| Full suite, **committed tree** | `git stash`-free: run against a `/tmp` materialisation of `495463a` | **427 total / 422 pass / 5 fail**, 136 suites. All five failures are in `012-json-editor-repair-path.test.ts` — the known pre-existing set, unchanged in identity and count from round 1. |
| Full suite, **working tree** | `npx vitest run` in `website` | **434 / 429 / 5**. This is the number the implementation document reports. |
| Provenance of the delta | diff of the two runs | The 7-test delta is entirely the two **untracked, out-of-scope** files. Not a defect; recorded because *the implementer's reported 434/429/5 is a working-tree number and the committed tree's is 427/422/5*. A count that includes files the commit does not contain cannot be reproduced by anyone checking out that sha. Raised as INFO-4. |
| Repo self-check | `node tools/check-repo.js`, run **from `agent-output/tools/`** | **9 problems, all pre-existing 012 artifacts** (4 links, 3 basenames, 2 scope). Same 9 as round 1. I introduced a 10th mid-pass by naming three probe configs `vitest.config.ts`; renaming them to `vitest.cr1.config.ts`, `vitest.cr1-mutation.config.ts` and `vitest.cr2.config.ts` cleared it. Disclosed here rather than left silent: it was my regression in my own domain, caught by the gate and fixed by satisfying it. |

## Enumerations Re-Run — the sweep, not the flagged sites

Per the standing rule, the implementer's Class Sweep Table (present at `acbbe58`, four rows) is
**re-derived, not accepted**, and each predicate is checked against the class's definition rather
than against the phrasing of the sites it was written from.

| Class | Predicate I ran | Hits | Disposition |
|---|---|---|---|
| `hashMessage` consumers | `git grep -c "hashMessage(" -- src bot` plus serena `find_referencing_symbols` on the definition | source: `usePusher.ts` ×1, `shared.ts` ×2, definition in `utils/index.ts` | Complete. Both producer sites are inside the tRPC mutation, downstream of `optionalIdMessageShape.parse` — so they were never the divergent side, which is why leaving `shared.ts` untouched is right rather than merely convenient. |
| `.trim()` in the shape | `git grep -c "\.trim()" -- src/server/api/utils/shapes.ts` | **21 total, 10 in the component/embed region**; identical at `a4eb00d` and `495463a` | The fix did not add or remove a trim leaf. It inherits all 21 by construction. **This is the point**: no leaf list is embedded anywhere, so the count changing does not break the fix. |
| Inline `stripKeys(...).data` payload expressions | `git grep -c "stripKeys(" -- src` + serena `find_referencing_symbols` | 4 source sites | Three are the extraction's; the fourth is `src/app/message/m/[id]/send/page.tsx` `sendWebhook({ message: stripKeys({ data: message.data }).data, … })` — **surfaced by serena, not by my grep pattern**. Transport-form family, not a hash consumer, so outside HIGH-1 and owned by a later milestone. Recorded so it is not rediscovered as a surprise at M5. |
| `saveAsPayload` / `jsonModalSeed` consumers | serena `find_referencing_symbols` on both, union'd with `git grep -c` | exactly the two components, plus the new spec | No stragglers; the extraction left no inline copy behind. |
| `standardizeMessage` (round 1's deleted symbol) | `git grep -c "standardizeMessage" -- src bot` | **4 hits in 2 test files, 0 in source** | Unchanged. Round 1's LOW-2 concern was that a name-grep would be reused where it is not sound; see LOW-2's disposition. |

**Blind spot in my own enumeration, stated at authoring time**: serena's
`find_referencing_symbols` results omitted references living in test files that `git grep` found. I
used the **union** of the two, not either alone. A reader reproducing this with only one instrument
will get a shorter list than mine, and neither instrument sees a reference constructed dynamically
(a string key, a re-export under another name); none exists here, but the predicate could not tell
me so.

## Re-Attack — the fix to a guard is attacked, not read

HIGH-1's fix is a **normalisation guard**, and MEDIUM-1's is a **change to what an instrument can
see**. Both fall squarely under the standing rule that a fix to a guard or an instrument is
re-attacked from first principles. Reading `normalizeForHash` and agreeing with it would not have
been review.

**The round-1 instrument was stale and would have answered the wrong question.** It hardcoded
`hashMessage(stripKeys(...))` as the consumer form — which was the live call site at `a4eb00d` and
is not the live call site at `495463a`. An instrument's validity is indexed to the claim it was
built for; the claim moved. The consumer side was rewired to read the tree under test through a
**namespace import**, deliberately not a named one:

```ts
import * as usePusherModule from '~/providers/MessageProvider/usePusher';
const CONSUMER_FORM = typeof usePusherModule.normalizeForHash === 'function'
  ? usePusherModule.normalizeForHash
  : (m) => stripKeys(m);
```

A missing *named* export is a link-time error; a missing *namespace member* is `undefined`. That
one choice keeps a single instrument runnable against all four trees, so the comparison across them
is a comparison and not four different experiments.

**The instrument edit was itself validated before it was trusted.** Re-running the amended probe
against `a4eb00d` and `c85945f` reproduced the round-1 captures case-for-case. Had the edit changed
the old trees' answers, I would have had a neutered instrument agreeing with the fix — which is
precisely the failure mode that makes "the tests are green" worthless.

## The Differential — four trees, 35 cases

`SEQ-A` models the steady state (composer holds exactly what the server stored). `SEQ-B` models the
saving tab holding its own pre-save draft when its own broadcast arrives — a persistent state, not a
race window, because `MessageProvider`'s `upsert.onSuccess` calls `setSavedMessage(message)` with
the **local draft** and never replaces it with the server's parsed form. `CTRL` rows must mismatch.

| Tree | Result |
|---|---|
| **`495463a`** (fix round 1) | **35 passed** — every `SEQ-B` case equal, all four controls mismatch, both guards green |
| `a4eb00d` (M1, round 1's tree) | 8 failed — `B1 B2 B3 D1 D2 D3 D4 D5` |
| `c85945f` (pre-M1 base) | 6 failed — `B1 D3 D4 D5`; **controls `C2` and `C3` came out EQUAL** |
| `/tmp/013-mutant` (`495463a` with the `safeParse` normalisation deleted) | 8 failed — **identical to `a4eb00d`** |

Three things follow that reading the diff could not have produced.

**1. The class was wider than round 1 measured, and the fix closes the extra width too.** `D3`
(embed title), `D4` (embed field name/value) and `D5` (`username`/`avatar_url`) mismatch **at
`c85945f` as well** — false-prompt sources that predate this chain entirely. Round 1 reported the
class as "3 cases at `a4eb00d` against 1 at `c85945f`". That was correct for the corpus I had and
**understated the defect**: the true pre-existing count is 4, not 1, and the true `a4eb00d` count is
8, not 3. My round-1 corpus was drawn from the *component* string leaves because M1 was what
widened the hashed form, and it structurally could not see leaves that were already hashed before
M1. I declared that blind spot when I authored the corpus; this is what it was hiding. The
correction is against my own round-1 number, not against the implementer.

**2. The fix does not blind the detector.** This is the failure mode a normalising fix invites and
the one no round-1 control could express: a normaliser that over-collapses stops false prompts by
making the detector stop detecting. `C3` (button label `B` → `B2`) and `C4` (embed title `T` → `T2`)
are genuine, non-whitespace edits to *trimmed* leaves — exactly the leaves the fix now normalises —
and both still mismatch at `495463a`. The guard removes the whitespace distinction and nothing else.

**3. The pre-M1 tree was worse in the more dangerous direction, which round 1 only half-saw.** At
`c85945f`, `C2` (a genuine V2 component-body edit) **and** `C3` (a genuine button-label edit) both
come out **EQUAL** — the tab is never told a real change landed, so it can silently overwrite it.
That is a **false negative**, strictly worse than the false prompt M1 introduced. Round 1 recorded
`C2`; `C3` is new this round and confirms the same hole was wider. M1 closed both, and this fix
closes M1's cost without reopening them. That is the clearest single statement of what the milestone
bought.

**Why it holds, structurally.** `normalizeForHash` applies `discordMessageShape` — the server's own
shape — rather than replicating any leaf list. It can therefore only collapse distinctions the
server itself collapses, so nothing that could persist is lost, and the 21-trim-leaf count can move
without breaking it. **That is the argument for accepting the fix. The green matrix is only its
evidence.** The mutant run is what makes the evidence load-bearing: delete the `safeParse` and the
matrix reverts exactly to `a4eb00d`'s 8 failures, so the fix is doing the work and the probe can
detect its absence.

## Finding Dispositions

Each records **two** things: that the class is gone, and the path of the captured check that fails
if it returns — or `no test`, explicitly.

### HIGH-1 — two normalisations across the `hashMessage` seam — **CLOSED**

**Class eliminated, not point-fixed.** The Minimum fix was taken (`normalizeForHash` at the consumer,
`shared.ts` untouched) but it was implemented in the structural spirit: the whole shape is applied,
so the fix has no leaf list to fall out of date. The two things I asked *not* to happen did not
happen — the five trim leaves are not special-cased anywhere, and no product behaviour changed, so
D22 exception 1 never fired.

I confirmed the decision to leave `shared.ts` alone rather than accepting it: both producer call
sites sit downstream of the tRPC mutation's `optionalIdMessageShape.parse` (`routers/message.ts`,
`upsert`), so the producer was already emitting the parsed form and was never the divergent side.

**Check that fails if the class returns**:
`agent-output/verification/013/probe-cr1-hash-producer-consumer/differential.test.ts` —
`SEQ-B` `B1`–`B3` and `D1`–`D5`, with controls `C1`–`C4` and guards `N1`/`F1`. Captured runs
`run-r2-495463a.txt`, `run-r2-a4eb00d.txt`, `run-r2-c85945f.txt`, `run-r2-mutant.txt`. Mutant-killed,
so the check is known to be able to fail.

**Also `no test` from me, deliberately, for the in-suite half**: the implementer's
`013-m1-fix-round-1-hash-parity.test.ts` is the right home for the in-repo regression, Vitest already
reaches it, and QA owns the acceptance cases. I mutation-tested it rather than authoring a rival —
see MEDIUM-1.

### MEDIUM-1 — payload/seed expressions unreachable by a module-level test — **CLOSED**

The **Preferred** structural fix was taken: `saveAsPayload` and `jsonModalSeed` extracted to
`src/utils/index.ts`, both components rewired, imports narrowed, no inline copy left behind
(enumeration above, 4 `stripKeys` sites, 3 accounted for and the 4th out of scope).

**Behaviour preservation was settled by execution, not by argument.** A "pure extraction" claim is a
claim, and the diff's file list does not settle it. `probe-cr2-m1bc-extraction-equivalence/` holds
the literal `a4eb00d` inline expressions — rebuilt from the tree's own `stripKeys`, its only
ingredient — beside the tree's exported functions and compares `JSON.stringify` byte-identity plus
`toStrictEqual` over 26 rows. **27/27 at `495463a`, every row identical; 7 failed against a mutant
that drops `components`.**

**Check**: `agent-output/verification/013/probe-cr2-m1bc-extraction-equivalence/equivalence.test.ts`,
runs `run-cr2-495463a.txt` and `run-cr2-mutant.txt`.

**Second check, on the instrument rather than the code** — the question round 1 actually raised was
whether the expressions were *reachable by a test*, so a green test is not by itself the answer;
a test that cannot fail would also be green. `mutation-check/` runs **the implementer's own three
specs** against an arbitrary tree via `PROBE_SRC`: 16/16 on the clean tree, **4 failed on the
mutants** — the three hash-parity cases die on the `normalizeForHash` mutation and the extraction
case dies on the `saveAsPayload` mutation. Their specs discriminate. Round 1's diagnosis is also
confirmed from the other side: `013-m1-transport-form.test.ts` **survived both mutants**, which is
exactly why it could not stand as M1-b/M1-c's instrument.

### LOW-1 — TDD table named one red case where there were three — **CLOSED**

Verified in `acbbe58` against my own re-derived red set (`run-m1spec-vs-c85945f.txt`, 3 of 7 red),
not against the document's own account. Three rows added for `normalizeForHash`, `saveAsPayload`
and `jsonModalSeed`. **`no test`** — a documentation defect has no runtime signature.

### LOW-2 — grep-for-a-deleted-symbol substitution, unqualified — **CLOSED**

The added line is better than what I asked for. It states the *reason* the substitution was sound —
"a name-string grep is a strict superset of any reference list for a symbol that no longer exists" —
and then draws the boundary itself: **not** reusable at a milestone where the symbol under scrutiny
survives. That is the general form, and it is the form that stops the substitution being reused at
M3 or M8 where it would be unsound. **`no test`** — a reasoning record, not behaviour.

### LOW-3 — `jsonModalSeed`'s declared return type is unsound — **CARRIED, unchanged, M2's**

`JSON.stringify`'s lib signature returns `string` unconditionally, so a `data`-less input yields the
*value* `undefined` from a function typed `string`. The extraction neither worsened nor closed this:
the inline expression carried the identical unsoundness. Now measured rather than asserted — CR2
rows `E9` (no `data` key), `E13` (`null`) and `E14` (`undefined`) show both old and new returning
`undefined`. Not raised against this round; M2 reopens `JsonModalBody` and owns it.

**Check**: the three CR2 rows above, which will change behaviour the day the type is fixed.

### INFO-1 — dead `message && hashMessage(message);` in `shared.ts` — **unchanged, correctly left**

The implementer left it and said so. Right call: `shared.ts` is untouched this round by design, and
touching it to tidy one dead expression would have put the producer side into a fix round that had
no business there.

## New This Round — follow-up register, not held against the tree

Per **"Rounds stop"**: this round's differentials establish that none of the four items below changes
a decision — CR1 is 35/35 and CR2 is 27/27 at `495463a`, so there is no behavioural quantity left
for them to move. They are recorded and routed, not made into another fix round. None is CRITICAL or
HIGH; reject authority is not engaged.

### INFO-2 — `normalizeForHash` normalises `data` only, while `hashMessage` hashes `{name, data}`

**Location**: `src/providers/MessageProvider/usePusher.ts`, `normalizeForHash`.
**Class**: a normaliser whose scope is narrower than the hashed form's scope — any field the shape
normalises that the normaliser does not reach reopens HIGH-1 for that field.
**Enumeration**: `messageShape`'s fields, read at `495463a`:
`name: z.string().min(1).max(MAX_MESSAGE_NAME_LENGTH)` — **no `.trim()` and no transform of any
kind**; `guildId: discordIdShape.nullable().optional()`; `data: discordMessageShape`. So the gap is
**empirically empty today** and the fix is correct as written. It does not match a transform added
via `z.preprocess` at the `messageShape` level rather than on the leaf, which would not appear in a
`.trim()` grep.
**Magnitude**: zero today — measured, not assumed: `SEQ-B` guard `N1` (name whitespace parity) is
**green at `495463a`**, which it can only be while `name` carries no transform.
**Required Action**: none now. `N1` is the standing guard: it goes red the day someone adds a
transform to `messageShape.name` without widening `normalizeForHash`, which is exactly when a person
needs to be told. **Check**: `probe-cr1-hash-producer-consumer/differential.test.ts`, `GUARD | N1`.

### INFO-3 — a near-vacuous case in the implementer's spec

**Location**: `src/utils/__tests__/013-m1-fix-round-1-hash-parity.test.ts`, the
`falls back to the stripKeys form (not a throw)` case, which asserts
`expect(() => normalizeForHash(...)).not.toThrow()`.
**Class**: a test whose assertion cannot fail under the defect it names. `safeParse` never throws by
contract, so this case passes on the pre-fix tree, on the mutant, and on a `return stripped`
stub — it constrains nothing.
**Enumeration**: one occurrence; `git grep -c "not.toThrow" -- src` = 1. Confirmed by execution
rather than by reading: this case is among the 12 that **survived** both mutants in
`mutation-check/run-implementer-specs-mutant.txt`, while its three siblings died.
**Required Action** (eliminate the class, not the line): assert the *value* — that the fallback
returns the `stripKeys` form — rather than the absence of a throw. My own `F1` row does this and can
be copied. Not worth a round on its own; fold it into whichever round next touches this file.

### INFO-4 — the two new specs carry review-thread prose in the source file

**Location**: file-level docblocks in `013-m1-fix-round-1-hash-parity.test.ts` and
`013-m1-fix-round-1-extraction.test.ts`.
**Class**: explanation addressed to a human reader — and specifically to *the review process*,
naming finding IDs and citing this review's probe path — living in a source file. No tool consumes
it; it fails the tool test, and rationale's two homes are the test's own assertions or the
agent-output record.
**Enumeration**: `git grep -c "code review HIGH-1\|code review MEDIUM-1" -- src` = 2 files. The
predicate matches this round's phrasing only; it would not see a docblock that explains itself
without naming a finding.
**No comment gate is installed in this repo** (`ls -d .husky` → absent), so there is no allowlist to
be authoritative here.
**I am recording this as INFO and not as a defect of this round, because I passed the identical
pattern at round 1**: `013-m1-transport-form.test.ts` carries the same file-level docblock and I
raised nothing. Raising it now would be a moving standard. The under-application was mine; the
standard applies from the next round of this plan onward, uniformly, and the existing three
docblocks are grandfathered rather than singled out.

### INFO-5 — the reported suite count is a working-tree number

**Location**: implementation document (`acbbe58`), the `434 / 429 / 5` line.
**Class**: a verification figure that cannot be reproduced from the sha it is attached to.
**Enumeration**: one figure; the committed tree at `495463a` gives **427 / 422 / 5** over 136 suites,
and the 7-test delta is entirely the two untracked out-of-scope files.
**Magnitude**: no correctness impact — the five failures are the known `012-json-editor-repair-path`
set at both counts, and no in-scope test is affected. It matters only as provenance: a reader
checking out `495463a` will not see 434.
**Required Action**: when a suite figure is recorded against a sha, take it from a clean
materialisation of that sha. Applies to my round-1 count too, which had the same provenance.

## Assumption Not Checked

**This review assumes that every row already in `Messages.data` parses cleanly under the current
`discordMessageShape`, and it does not test that.** The fix's guarantee is conditional:
`normalizeForHash` returns the shape-normalised form **only when `safeParse` succeeds**, and falls
back to the bare `stripKeys` form — that is, to the exact pre-fix behaviour, with HIGH-1's class
fully live — when it does not. Every one of my 35 cases feeds it a payload the current shape
accepts, so the entire green matrix is a statement about the success branch. I verified the fallback
does not throw (`F1`); I did not verify that the fallback is unreachable in the steady state.

**Falsity signature**: a stored row that the *current* shape rejects — a row written before a shape
tightening, an import path with looser rules, a leaf whose constraint was narrowed after the row
landed. Its observable signature is HIGH-1 recurring on exactly those messages and no others: a tab
editing one legacy message gets the false *"any changes you have made will be lost"* prompt on
whitespace, while every other message in the same session behaves correctly. That per-row split is
the discriminator — a defect that follows the row rather than the user or the surface.

**Owning stage: QA, Phase 2.** This needs the stored corpus, which I have no access to from a review
pass and will not acquire by reading source. The discharging check is mechanical: run
`discordMessageShape.safeParse` over the `data` column and report the reject count and the shape of
the rejects. If it is zero, the fallback is unreachable and HIGH-1 is closed unconditionally; if it
is not, the fallback branch needs its own decision and the finding reopens at that scope. Named
again in Next Steps so it is routed rather than shelved.

## Verdict

**Status**: **APPROVED_WITH_COMMENTS**

**Rationale**: Both blocking findings are closed, and closed by re-derivation rather than by reading
the fix. HIGH-1's class is gone across a 35-case differential spanning four trees, and the fix is
shown to be load-bearing by a mutant that reverts the matrix exactly to `a4eb00d`'s eight failures.
The structural reason is the one that matters: `normalizeForHash` applies the server's own shape
rather than replicating any leaf list, so it can only collapse distinctions the server itself
collapses, and the 21-trim-leaf count can move without breaking it. MEDIUM-1's extraction is
byte-equivalent over 26 rows by execution, and the implementer's own specs are shown to discriminate
under mutation — which is what MEDIUM-1 actually asked for, since a green test that cannot fail
would not have closed it.

The re-attack also **corrected my own round-1 numbers against myself**: the class was wider than I
measured — 8 mismatching cases at `a4eb00d` and 4 at `c85945f`, not 3 and 1 — because three
false-prompt sources predate the chain entirely and my component-scoped corpus could not see them.
The fix closes those too. And two new false-negative controls establish the direction round 1 could
not: at `c85945f` a genuine V2 component-body edit **and** a genuine button-label edit both hashed
identically, so the pre-M1 tree silently failed to warn on real changes. M1 closed that; this round
closes M1's cost without reopening it.

**Comments, not conditions.** LOW-3 is carried unchanged to M2, which reopens `JsonModalBody` and
owns it. INFO-2 through INFO-5 are routed to the follow-up register: this round's differentials
establish that none of them changes a decision, and per "Rounds stop" they do not hold the tree. The
Assumption Not Checked above is QA Phase 2's and is the one thing that could reopen HIGH-1 — it is
routed, not waived.

**This verdict binds `495463ac3198a2c810198bdb6199bb5944ec6505` and no other tree.** Verified at the
start of the pass and re-verified unmoved at the end. Any change to any covered blob expires it and
the review re-runs.

## Required Actions

**None blocking.** The gate is passed.

Carried forward, owned elsewhere:

1. **LOW-3** → **M2**, with `JsonModalBody`. CR2 rows `E9`/`E13`/`E14` are the standing measurement.
2. **Assumption Not Checked** → **QA Phase 2**. `safeParse` over the stored `data` corpus.
3. **INFO-2** → no action; guard `N1` is the standing tripwire.
4. **INFO-3** → fold into whichever round next touches the hash-parity spec.
5. **INFO-4** → applies uniformly from the next round of this plan onward; the three existing
   docblocks are grandfathered, and the under-application at round 1 was mine.
6. **INFO-5** → take suite figures from a clean materialisation of the sha they are attached to.
   Applies to my round-1 count as much as to the implementation document's.

## Captured Instruments (round 2)

| Path | What it settles |
|---|---|
| `agent-output/verification/013/probe-cr1-hash-producer-consumer/` | HIGH-1's disposition, by execution across four trees. `differential.test.ts` (35 cases: `SEQ-A` ×20, `SEQ-B` ×9, 4 positive controls incl. two false-negative controls, 2 guards), `vitest.cr1.config.ts` (tree-selectable via `PROBE_SRC`, output via `PROBE_OUT`), round-2 captures `run-r2-495463a.txt` / `run-r2-a4eb00d.txt` / `run-r2-c85945f.txt` / `run-r2-mutant.txt`, round-1 captures retained, README extended with a round-2 section stating what was added, what the instrument edit was validated against, and what it still cannot see. |
| `agent-output/verification/013/probe-cr1-hash-producer-consumer/mutation-check/` | Whether the **implementer's own** specs discriminate. `vitest.cr1-mutation.config.ts` runs them against an arbitrary tree via `PROBE_SRC`; `run-implementer-specs-clean-495463a.txt` (16/16) and `run-implementer-specs-mutant.txt` (4 failed). |
| `agent-output/verification/013/probe-cr2-m1bc-extraction-equivalence/` | MEDIUM-1's behaviour-preservation claim, by execution rather than by argument. `equivalence.test.ts` (26 corpus rows + 1 positive control), `vitest.cr2.config.ts`, `run-cr2-495463a.txt` (27/27), `run-cr2-mutant.txt` (7 failed), README. |

All three carry a positive control and all three are shown to kill a mutant, so a green run from any
of them is distinguishable from an instrument that imported nothing.

**Still `no test` from me, explicitly**: the in-suite regression for HIGH-1 and the M1-b/M1-c
partition cases. Vitest already reaches `src/**/__tests__/`, the plan puts those enumerations in the
project's own suite, and QA owns the acceptance cases. Authoring them here would give them a second
home. What I owed instead was evidence that the in-suite versions can fail, and `mutation-check/`
is that evidence.

## Next Steps

**Handing off to the qa subagent for test execution.**

> **CORRECTION, 2026-08-24, added after round 3** — *this line was wrong when written and is left
> standing with its correction rather than rewritten.* **QA was not the next stage at `495463a`.**
> The plan runs **QA Phase 1 before implementation** (Testing Strategy), so Phase 2 runs after
> implementation *completes*, not after a milestone; seven milestones remained at this tip. The
> correct next stage was the implementer's next milestone. Round 1 stated this correctly ("QA is not
> yet due … QA Phase 2 is scoped to the whole plan, not to M1") and rounds 2 and 3 both drifted from
> it; `steering-hooks-013` corrected it after round 3. The routing below — that these items are
> **owned by** QA Phase 2 — is unaffected and stands; only the claim about what runs next was wrong.

**Routed, not shelved** — the Assumption Not Checked above belongs to **QA Phase 2**: run
`discordMessageShape.safeParse` over the stored `Messages.data` corpus and report the reject count.
A non-zero count reopens HIGH-1 at the scope of the fallback branch; zero closes it unconditionally.
QA's existing **F-QA8** re-derivation of the `message.upsert` writer set — round 1's assumption,
still open — remains due in the same phase.

**To steering**, unchanged and still not the implementer's: R2's unresolvable file citation and R4's
prediction record, both the planner's and both **HELD** as one pass under owner ruling D23 (plan rev
15, `b9e35c8`) — until that pass runs, the authoritative statement of both is this document at
`ba0f6e3`, per steering's own instruction. The mis-suffixed
`code-review/012-carry-forward-to-post-refresh-pass.md` stays in place under the standing 012 hold.

**Where a finding instantiates a plan Risks row**: HIGH-1 was R4's falsifier and it is now closed;
that outcome is the planner's to write into the prediction record when D23's held pass runs.

---

# ROUND 3 — milestone M7, "Mode follows the flag" (D15), at `18407d8`

Rounds 1 and 2 above are M1 and are retained unedited. **M1's approval at `495463a` is unaffected
by this round**; nothing M7 touches is in M1's file set. The binding verdict for M7 is below.

## Scope Actually Assessed

```
git -C website diff --numstat 495463a 18407d8
3    5   src/app/message/m/[id]/send/page.tsx
4    5   src/providers/MessageProvider/index.tsx
98   0   src/utils/__tests__/013-m7-mode-follows-flag.test.ts
22   0   src/utils/messageMode.ts
```

One commit, four files, `+127 / -10`. Re-derived from the tree, not read off the implementation
document's tables, and matching them. All four read in full via `git show 18407d8:<path>`.

Three files were **not** changed and were nevertheless read in full at `18407d8`, because M7's
correctness is a set of claims about them: `src/utils/limits.tsx` (whose `validateContentRequirements`
is the predicate M7-a says the mode must agree with), `src/utils/index.ts` (`hasV2Components`,
`V2_COMPONENT_TYPES`) and `src/components/DiscordMessageEditor/index.tsx` (the toggle that calls
`applyModeSwitch`, whose output M7-b changes without the file changing).

`JsonModalBody.tsx` is untouched. The implementer says this was confirmed with steering; I confirmed
it against the plan independently — M7's **Files** line reads *"The modal's mode writer
(`JsonModalBody.tsx` Load) is **not** M7's file: it is M8's."* Correct.

**M2–M6 and M8 are not reviewed, not scored and not commented on.** They do not exist at this tree.

## Verification Re-Run (nothing inherited)

| Check | Method | Result |
|---|---|---|
| Typecheck | `npx tsc --noEmit` **in the real repo** | **0 errors** (`TSC_EXIT=0`). Run in `website` itself: a `/tmp` materialisation fails on gitignored assets, which is an artifact of `git archive`, not of the commit. |
| Build | `npx next build` | `BUILD_EXIT=0`, **0 warnings** (`grep -ci warn` over the captured output → 0). |
| Full suite, **committed tree** | clean `/tmp` materialisation of `18407d8` | **443 total / 437 pass / 6 fail**, 26 test files. |
| Failure identity **and reason** | `grep -E "AssertionError\|TypeError"` over the run | 5 × `TypeError: standardizeMessage is not a function` — byte-for-byte the known pre-existing set, **same reason** as at `495463a`, not merely the same count — plus **one new**: `012-message-mode.test.ts > switchToV2 — classic -> v2 branch > clears content and embeds, preserves components and flags`, failing `AssertionError: expected 32768 to be +0`. That is D16 being enacted against a test that asserts the pre-D16 behaviour. |
| Provenance of the reported figure | diff against the implementation document | The document reports `450 / 444 / 6`, a **working-tree** figure; the committed tree gives `443 / 437 / 6`. The 7-test delta is the one untracked out-of-scope file. Same class as round 2's INFO-5, second occurrence — see INFO-3. |
| **R2's plan-assigned reviewer obligation** | `git rev-parse c85945f:src/server/api/utils/messageValidity.ts` vs `18407d8:` | **Discharged.** Both resolve to blob `f477b7129e49e69ccf1b73b4654359e5d4c5f698` — byte-identical between chain base and tip. Risk R2's mitigation reads *"the file's hash unchanged between base and tip is captured by the reviewer"*; this is the first round that has captured it. Note the path: the plan cites the file bare, and it resolves only as `src/server/api/utils/messageValidity.ts` — round 1's R2 finding, still held under D24. |

**On the one red test.** It is not a defect and it is not the implementer's to fix. The plan names it
by name and assigns it: Plan Scope records `012-message-mode.test.ts` among the *"existing tests …
whose `flags` assertions M7-b makes red"* and closes *"Named here as a coordination fact; what to do
with them is QA's."* Serialised Shared Files repeats it: *"The 012 test files named in Plan Scope are
QA's to re-anchor; the implementer does not edit them."* I verified both lines rather than accepting
the implementer's account of them. **Validation and Release Conditions item 1 — the full suite green
— therefore remains unmet at this tip, by design, and is QA's to close.** It is a release condition,
not a milestone gate, and it does not hold this verdict.

## Enumerations Re-Run — the sweep, not the flagged sites

| Class | Predicate I ran | Hits | Disposition |
|---|---|---|---|
| `IS_COMPONENTS_V2_FLAG` readers in source | `git grep -c "IS_COMPONENTS_V2_FLAG" 18407d8 -- src bot` | 6 source files: `constants/messageLimits.ts`, `scripts/backfillValid.ts`, `utils/index.ts`, `utils/limits.tsx`, `utils/messageMode.ts`, `utils/sendWebhook.ts` | Exactly the plan's own six. Confirms the implementer's count; re-derived, not accepted. |
| `setMessageMode` writers | `git grep -c "setMessageMode" 18407d8 -- src` | 3 writers (`MessageProvider/index.tsx`, `DiscordMessageEditor/index.tsx`, `JsonModalBody.tsx`) plus the definition in `useEditableState.ts` and the type in `global.d.ts` | Matches the plan's enumeration. M7 owns the first, M7-b reaches the second through `applyModeSwitch`, and the third is M8's by the plan's own assignment. |
| The two V2-type sets | `git grep -c "V2_TYPES\|V2_COMPONENT_TYPES"` plus reading both definitions | `limits.tsx`'s `V2_TYPES` and `utils/index.ts`'s `V2_COMPONENT_TYPES` are **both** `new Set(V2_COMPONENT_TYPE_VALUES)` | They cannot disagree on membership: one array constant, two Sets. This is why M7-a's "same predicate" clause holds — see INFO-1 for the residue. |
| Consumers of the three new exports | `git grep -c` union'd with serena `find_referencing_symbols` | `send/page.tsx`, `MessageProvider/index.tsx`, the M7 spec, and `messageMode.ts` itself | No stragglers; no inline copy of either predicate left behind in either component. |
| `hasV2Components` consumers | same | `utils/index.ts` (definition + 2 internal uses), `messageMode.ts` | Both former component-level callers are gone, which is M7-c's point. |
| Test files referencing `switchToV2` / `applyModeSwitch` | `git grep -c` over `src/utils/__tests__` | 4 files | **Two of them do not reference the product's function at all** — see MEDIUM-2. This is the enumeration that produced this round's most consequential finding. |

**Blind spot, stated at authoring time**: `git grep -c` on a symbol name matches a *name*, not a
symbol, so it cannot distinguish a reference to the product's export from a local declaration that
shadows it. That is precisely what it failed to distinguish here, and it is the same limit round 1's
LOW-2 established for a *deleted* symbol — the superset property that made the grep sound there makes
it unsound here, where the symbol survives. I used serena `find_referencing_symbols` for the new
exports and read both suspect files directly rather than trusting either count.

## Adversarial Execution — why the trigger is not met, and what was executed instead

M7 touches `showV2PatchWarning`, which decides whether a caution is shown before a user patches an
already-sent Discord message. That is adjacent to an irreversible action, so the trigger deserves an
answer rather than an assumption.

**It is not met.** The predicate feeds exactly one thing —
`<NullableComponent show={showV2PatchWarning}>` — and I checked the gate it does *not* feed:

```
const allowSave = !!(isMessageValid && selectedWebhook && !isLoading && (!showEdit || oldMessage));
```

`allowSave` does not read the warning, and M7 does not touch `allowSave`. So M7-c can add or remove
a caution; it cannot permit or forbid the irreversible act. There is no authentication or
authorisation gate anywhere in M7's four files, and no security boundary.

**What was executed instead**, because "it only affects a warning" is still a claim about direction:
the probe asserts **monotonicity of the warning set over the whole 36-row partition** — no message
that warned before M7 stops warning, and both suppressing conjuncts (`showEdit`, `oldMessage`) still
suppress on every row. Measured: six cells change `false → true`, zero change `true → false`. The
change is strictly toward more caution, and that is established by running it, not by reading it.

## The Differential — 36 cells, four trees

`probe-cr3-mode-predicate/` runs the tree's own `isMessageV2`, `detectMessageMode`,
`showV2PatchWarning` and `applyModeSwitch` over every combination of six flag states and six
component shapes. The new side transcribes nothing; the old side is a **declared model** — two lines
of guard quoted verbatim from `git show 495463a:.../MessageProvider/index.tsx`, wrapped around the
*real* `hasV2Components` imported from the tree under test, because `detectMode` is declared inside
`useValue()` and is not importable. That asymmetry is stated in the probe and in its README rather
than glossed.

M7-a's "same predicate" clause is checked against the product, not against a model:
`validateContentRequirements` emits *"Components V2 messages cannot contain embeds or content."*
**iff** its own internal `hasV2` is true, so giving it content turns that error into a readable oracle
for a variable that is not exported.

| Tree | Result |
|---|---|
| **`18407d8`** (M7) | **122 / 122 passed** |
| `495463a` (pre-M7) | 11 failed — **6 in section A** (the mode predicate disagrees with `validateContentRequirements` on every flag-only row) and **5 in section D** (`switchToV2` does not set the bit; OQ-7's misreport is live) |
| `18407d8` + flag disjunct deleted from `isMessageV2` | 14 failed — killed |
| `18407d8` + `switchToV2` stops ORing the bit | 5 failed — killed |
| `18407d8` + `applyModeSwitch`'s ternary inverted | 11 failed — killed |

Four things follow that reading the diff could not produce.

**1. Twelve of thirty-six mode cells changed, and they fall into two classes, not one.** Six are
cells the flag decides — the V2 bit set with no V2 components — of which four flip `classic → v2`
(D15/D12's class, the milestone's whole purpose) and two go from *no mode written* to `v2`. The other
six are cells where **a mode is now written where the pre-M7 guard wrote none**, and **four of those
have nothing to do with the flag**. See MEDIUM-1.

**2. Nothing moves in the unsafe direction.** No row that classified as `v2` becomes `classic`, and
after M7 no row in the partition is left with no mode written at all. Research G4's gap is closed
for the whole partition, not only for the flag-carrying records the plan's text discusses.

**3. `applyModeSwitch` — the plan's *named* M7-b instrument — behaves over the D7 residue.** Driven
through `applyModeSwitch` rather than through `switchToV2`/`switchToClassic` directly, over four
unrelated-bit combinations in both directions plus a round trip: bits preserved exactly, Action Rows
surviving the outbound leg, and the round trip restoring the original `flags` value. D7's residue is
intact in both directions, which M7-b requires and which no test in M7's own spec asserts through
the named instrument (LOW-1).

**4. M7 makes 5712's recovery non-destructive, and that is bigger than the plan's one-line note.**
Pre-M7 the record opened in **Classic**, so reaching the flag-clearing toggle required switching *to*
V2 first — and that outbound leg unconditionally cleared `content`. The existing 012 spec states this
as settled fact in its own header comment: *"reaching the V2->classic branch that D11 patches
requires toggling classic->V2 FIRST. That outbound leg unconditionally clears content and embeds."*
After M7 the record opens in V2 and **one toggle to Classic clears the bit with the content intact** —
executed, section E. R8 calls this "one lossless toggle"; this is the first time it has been run.

## Findings

### MEDIUM-1 — the class of records whose mode changes is wider than the plan and the document describe

**Location**: `src/providers/MessageProvider/index.tsx`, `detectMode` (the removed
`if (msg?.data?.components)` guard); recorded against
`agent-output/implementation/013-components-v2-editing-surfaces-implementation.md` (`83164da`) and
the plan's **R8** row and **Validation and Release Conditions item 5**.

**Class**: a behaviour change described by one of the two classes it produces. The implementation
document and R8 both frame M7's mode change as *"every existing record with the bit set and no V2
components opens in V2 where it opened in Classic before"*. That is true and it is half of it. The
old guard skipped **every** message with no `components` key, flag or no flag, leaving whatever mode
was standing; the new predicate writes a mode for all of them. So an ordinary classic message — no
flag, no components key — now actively sets **Classic** where it previously set nothing.

**Enumeration**: the full 36-cell partition, run rather than reasoned —
`probe-cr3-mode-predicate/run-cr3-18407d8.txt`, rows marked `B*`. Six cells gain a written mode;
**four of them (`R00`, `R10`, `R40`, `R50`) are not flag-related**. `git grep -c` cannot enumerate
this class at all: it is a property of a removed conditional, not of any symbol, which is why it took
execution to find. The predicate does not see load paths that never called `detectMode` in the first
place — if one exists, its cells are outside this count.

**Is the code wrong? No.** M7-a says the mode is *"V2 iff … and **Classic otherwise**"*, over the
class *"every message the composer loads into the editor"*. Writing Classic for a classic message is
the criterion, not scope growth. The implementation is correct and I am not asking for a code change.

**Magnitude**: user-visible, and this is a **reasoned consequence, not a measurement** — I have no
production access and state it as a hypothesis. A user composing in V2 who then loads a classic
message (a Save As copy, a local-store restore, a bot code) previously kept V2 mode and now gets
switched to Classic. Whether that is better is not mine to judge; that it is a change nobody has
written down is the finding.

**Required Action — eliminate the class of *undescribed* change, not the line**:
- **Preferred (structural)**: the implementation document's M7 section states the change as its two
  classes with the cell counts, so no downstream stage reconstructs it from the diff; and **the
  planner widens R8 and Validation item 5's deployment-record clause** to name both classes, since
  R-5 currently obliges the deployment record to state only the flag class.
- **Minimum**: the implementation document records the second class in one sentence.

**This one is not settled between us.** The half that touches R8 and R-5 is **D22 exception 1** — a
finding implying the plan is incomplete — and goes to steering for the planner, not to the
implementer. Flagged inline as the rule requires.

**Check that fails if the class is reintroduced or mis-described**:
`agent-output/verification/013/probe-cr3-mode-predicate/mode-differential.test.ts`, section B, whose
`B*` rows print the class explicitly; captured at `run-cr3-18407d8.txt`.

### MEDIUM-2 — two of the four files named as M7's red-test domain cannot go red, and their transcriptions have drifted

**Location**: `src/utils/__tests__/012-send-gate-partition.test.ts` and
`src/utils/__tests__/012-json-editor-repair-path.test.ts`; recorded against the implementation
document's reconciliation sweep (`83164da`), the plan's **Plan Scope** red-domain sentence, and QA's
**red-test domain** table rows 1 and 4 (`qa/013-components-v2-editing-surfaces-qa.md`).

**Class**: a test that **models** the function under test instead of executing it, listed as
coverage of that function — and, downstream of that, a reconciliation sweep that reads *"still
green"* from such a file as evidence that nothing regressed.

Both files declare their own local `switchToV2` / `switchToClassic`. `012-send-gate-partition.test.ts`
says so in a comment — *"Transcribed from handleModeSwitch's `switchMode`"*, and above it,
*"SEMANTICS the implementation must have, not the implementation."* Its local `switchToV2` is
`{...prev, content: '', embeds: []}` — the **pre-D16** behaviour. The product's is not that any more.
The transcription has silently drifted, and it is green.

Three consequences, in increasing order of importance:

1. **The plan's prediction could never have fired.** Plan Scope predicts M7-b turns
   `012-send-gate-partition.test.ts` red *"(3)"* and lists `switchToV2`/`applyModeSwitch` *"3"* for
   `012-json-editor-repair-path.test.ts`. Neither file calls the product's function. Predicted red:
   four files; actual red: one. The prediction was derived by counting a **name**, which is exactly
   the substitution round 1's LOW-2 established as unsound wherever the symbol survives — and QA
   re-derived it independently and reached the same wrong answer **using the same instrument**, its
   own predicate being *"every file whose text references a symbol whose behaviour a milestone
   changes … enumerated by `grep -rc`"*. QA recorded the predicate's blind spot for
   helper-mediated reachers; the converse blind spot — a local declaration shadowing the name — is
   not recorded, and it is the one that bit.
2. **The sweep's conclusion is right by accident.** The implementation document reports these files
   *"fully green — no unexpected regression"*. Green from a file that cannot go red carries no
   information about M7 either way. The reasoning, not the conclusion, is the defect.
3. **`012-send-gate-partition.test.ts` now carries a claim M7 has falsified**, in a file whose own
   header says *"Do not 'update expectations to match' — a disagreement is a finding, not a stale
   fixture."* Its comment reads *"detectMode derives mode from structure, never flags"* and its
   narrative asserts that recovering 5712 *"requires toggling classic->V2 FIRST"* and that *"that
   outbound leg destroys the content."* After M7 all three are false — the probe's section E shows
   the one-toggle lossless exit. A pre-registered spec asserting a superseded narrative, still
   passing, is the failure mode its own header was written to prevent.

**Enumeration**, run before this finding was written, with two independent predicates that agree:

```
git grep -c "^function switchToV2\|^function switchToClassic" 18407d8 -- src/utils/__tests__
  → 012-json-editor-repair-path.test.ts: 2      012-send-gate-partition.test.ts: 2
git grep -lc "Transcribed from\|not the implementation\|SEMANTICS the implementation" 18407d8 -- src bot
  → the same two files, and no others
```

Both predicates match only these two files. Neither can see a transcription written as
`const switchToV2 = …`, a transcription of a *differently named* product function, or an inline
re-implementation with no declaration at all — so the true class may be larger and these two
predicates cannot tell me by how much.

**Settled by execution, not by reading.** `mutation-check/` runs both files, plus the M7 spec,
against three mutants of `messageMode.ts`. `012-send-gate-partition.test.ts` fails on **none** of
them — it is inert with respect to the module it is listed as covering.

**Required Action — eliminate the class**:
- **Preferred (structural)**: both files import `switchToV2`/`switchToClassic` from
  `~/utils/messageMode` and delete their local copies. A transcription that can drift is the defect;
  a file that imports the product cannot drift silently. Where a test genuinely needs the *old*
  behaviour as a historical fixture, it states the old value as a literal rather than as a
  re-implementation that looks live.
- **Minimum**: the stale comment and the falsified narrative in `012-send-gate-partition.test.ts` are
  corrected, and QA's red-domain table records that rows 1 and 4 are name-matches, not behaviour
  members.

**Owner: QA, not the implementer.** Both are 012 test files, which Serialised Shared Files puts
explicitly out of the implementer's hands. What *is* the implementer's is the sweep's reasoning — see
the Required Actions list. The plan-side half (Plan Scope's prediction) is **D22 exception 1** and
goes to steering.

**Check**:
`agent-output/verification/013/probe-cr3-mode-predicate/mutation-check/` —
`run-implementer-specs-mut-isv2.txt`, `run-implementer-specs-mut-switchv2.txt`,
`run-implementer-specs-mut-apply.txt`. The absence of any `012-send-gate-partition.test.ts` failure
across all three is the finding's evidence.

### LOW-1 — M7's own spec does not reach M7-b's named instrument, and the document says it does

**Location**: `src/utils/__tests__/013-m7-mode-follows-flag.test.ts`; the implementation document's
**Test Coverage** bullet for M7.

**Class**: a milestone's stated instrument replaced by an assertion one level below its call site, so
the dispatch between them is unasserted — plus a coverage claim naming a symbol the spec never
imports.

M7-b's criterion names its instrument explicitly: *"Instrument: the draft `applyModeSwitch` returns,
asserted over the class in the suite."* The spec asserts `switchToV2` and `switchToClassic` directly.
The document's Test Coverage bullet says the spec covers *"`switchToV2`/`switchToClassic`/
`applyModeSwitch` over the D7-residue … and OQ-7 … properties"*.

**Enumeration**: `git grep -c "applyModeSwitch" 18407d8 -- src` → `messageMode.ts` 1,
`DiscordMessageEditor/index.tsx` 2 (the real toggle), `012-message-mode.test.ts` 4. The M7 spec: **0**.
The predicate would not see the symbol reached through an alias or a re-export; neither exists here.

**Settled by execution.** With `applyModeSwitch`'s ternary inverted, the M7 spec passes **entirely**;
the mutant is killed only by `012-message-mode.test.ts`
(`mutation-check/run-implementer-specs-mut-apply.txt`). So the dispatch *is* covered — by the one
file the plan hands to QA for re-anchoring, and which currently carries this round's single red test.
That is a fragile place for a milestone's named instrument to live.

**Magnitude**: low. `applyModeSwitch` is a one-line ternary and it is covered today.

**Required Action**: **Preferred** — the M7 spec's M7-b cases drive `applyModeSwitch(targetMode, …)`
rather than the two branch functions, which is what the criterion names and costs one line per case;
my section D can be copied. **Minimum** — correct the Test Coverage bullet, which currently claims
coverage the spec does not have.

### LOW-2 — the TDD table under-counts the red set (second instance on this plan)

**Location**: implementation document (`83164da`), TDD Compliance table, the `detectMessageMode` and
`switchToV2` rows.

**Class**: a TDD table whose per-symbol red counts do not sum to the red set that was actually
observed — so a reader cannot reconstruct the red run from the table.

**Enumeration and measurement**: I ran the M7 spec from `18407d8` against `495463a`'s source
(`mutation-check/vitest.redcheck.config.ts`, captured at
`mutation-check/run-m7spec-vs-495463a.txt`). **15 of 16 red**, the one green being the unchanged
`switchToClassic` case — which the document names correctly. The table's rows sum to 14:
`isMessageV2` 4 + `detectMessageMode` 4 + `showV2PatchWarning` 4 + `switchToV2` 2. The measured
reasons are `isMessageV2` 4, `detectMessageMode` **5**, `showV2PatchWarning` 4, `AssertionError` 2.
The extra `detectMessageMode` red is M7-b's OQ-7 case, which calls `detectMessageMode` and so went
red on a `TypeError` rather than on the flag assertion the table attributes to that row.

**Why it is worth a line**: this is the **second instance of the same class on this plan** — round 1's
LOW-1 recorded a TDD table naming one red case where there were three (`ba0f6e3`, `Reviewed-At:
a4eb00d`), and this is the second (`e1ca0e8` line, `Reviewed-At: 18407d8`). Two citable instances
make it a **pattern**, and it is routed as one in Next Steps. The under-count is small each time; the
recurrence is the point, because the TDD table is the only record that the red was red for the
milestone's reason.

**Required Action**: state each row's red set by *case*, and where a case goes red for a reason
belonging to a different row, say so. **Minimum**: correct the two counts.

### INFO-1 — one product predicate, two implementations, and why the tidy fix is the wrong one

M7-a requires the mode predicate to be *"the same predicate as `validateContentRequirements`'s
`hasV2`, so the two never disagree on one record."* What is delivered is two implementations that
agree: `isMessageV2` composes `hasV2Components` with the flag mask; `limits.tsx` inlines
`components.some((c) => V2_TYPES.has(c.type)) || !!(flags & IS_COMPONENTS_V2_FLAG)`.

They cannot disagree on membership — `V2_TYPES` and `V2_COMPONENT_TYPES` are both
`new Set(V2_COMPONENT_TYPE_VALUES)`, one array constant — and I verified agreement by execution on
all 36 rows (probe section A, 36/36 `agree`). The residue is the guard: `hasV2Components` returns
`false` for a non-array `components`, where `limits.tsx` would throw; `validateMessage`'s
destructuring default makes that unreachable today.

**I am not asking for the tidy fix, and this is the reason.** `src/utils/index.ts` does
`export * from './limits'`, so `limits.tsx` importing `isMessageV2` from `~/utils/messageMode`
— which imports `~/utils` — closes a cycle `limits → messageMode → utils/index → limits`. The
duplication is a consequence of the module layout and predates M7. A cleanup that unified them the
obvious way would trade a harmless duplication for an import cycle: the safe fix here is not the tidy
one. If it is ever unified, the structural home is a leaf module both can import — beside
`V2_COMPONENT_TYPE_VALUES` in `constants/messageLimits.ts`, or a new `utils/v2.ts` — and that is M2's
or a later milestone's call, not M7's.

**Check**: probe section A, all 36 rows, plus `CTRL-1`, which asserts that a structural-only
predicate **disagrees** with `limits.tsx` on a flag-only row — so section A's agreement is
distinguishable from a comparison of two references to the same function.

### INFO-2 — the removed `?.data?.` guard: disposed of, not overlooked

The old `detectMode` and `messageHasV2` both guarded `msg?.data?.components`; the new predicates
guard only the message and then read `data.components`. Applying the input-robustness order rather
than reflexively asking for a runtime guard: **`ActiveMessage.data` is declared non-optional**
(`type ActiveMessage = … & { data: EditableMessageData }`, `src/@types/global.d.ts`), so the contract
says the caller cannot send `data: undefined` — step 1, no finding, stop. Nothing here could exploit,
so step 3 does not reopen it. Recorded explicitly so a later round does not re-raise it as an
oversight; the removal is correct and the old guard was defending against something the type forbids.

### INFO-3 — suite figure provenance, second occurrence

The document's `450 / 444 / 6` is a working-tree figure; `18407d8` itself gives `443 / 437 / 6`. No
correctness impact — the six failures are identical in identity and reason at both counts — but the
figure cannot be reproduced by anyone checking out the sha it is attached to. Round 2 raised the same
class (INFO-5) against my own round-1 count as much as against the document's. Second occurrence;
routed with LOW-2 as part of the same record-accuracy pattern in Next Steps.

## Positive Observations

- **The closure section is the best thing in this round's document.** The QA-routed Assumption Not
  Checked asked whether the two predicates could be lifted without changing behaviour. The
  implementer read both closures directly, reported that **the risk QA named did not materialise**,
  and then reported the thing QA had not asked about: that a *faithful* lift would have shipped the
  bug M7 exists to fix, because both originals were structural-only. Answering the question that was
  asked, finding that it was the wrong question, and saying both — rather than reporting "no closure
  risk, extraction safe" and lifting — is the behaviour the assumption mechanism exists to produce.
- **The fix inherits the disjunction rather than re-deriving it.** `isMessageV2` composes the
  existing `hasV2Components` and the existing constant; it invents no leaf list and no second
  definition of "V2". This is the same structural instinct that made M1's fix round hold, applied
  again without being asked.
- **`switchToClassic` was left alone.** I-D11's behaviour is untouched, the plan says it should be,
  and the spec's one green-at-base case documents that deliberately rather than by omission.
- **The `switchToV2` diff is `+1` with no deletions and preserves every other bit** — `| FLAG` rather
  than an assignment. D7's residue survives in both directions, which I verified through
  `applyModeSwitch` over four bit combinations and a round trip, not from the diff.
- **`JsonModalBody.tsx` was not touched**, against the pull of it being the obvious third mode
  writer. The plan assigns it to M8 and the implementer checked rather than assumed.
- **The red was verified for the right reason before the green.** Fifteen of sixteen cases red at the
  chain base, and the sixteenth green because its behaviour genuinely does not change.

## Assumption Not Checked

**This review assumes that `MessageProvider`'s four `detectMode` call sites are the complete set of
paths by which a message reaches the composer's editor, and it does not test that.** Everything above
is a statement about the *predicate*: given a message, which mode does it classify to. Whether the
predicate is *reached* on every load path is a different claim, and the probe cannot make it — the
repo has no browser harness (plan assumption 5), so I read the call sites rather than exercising
them. M7-a's class is *"every message the composer loads into the editor — by id from the API, from
a bot code, from local store, a Save As copy, a JSON Load, a New Message import"*, which is six named
entry points against four call sites; the plan reconciles that by assigning the JSON Load to M8, but
the reconciliation is prose and I did not execute it.

**Falsity signature**: a load path that populates `message` without passing through `detectMode`.
Its observable signature is specific and distinguishable from every other defect in this plan — the
mode on screen is *stale rather than wrong*: it shows whatever the previous message's mode was, so
the same record opens in V2 or Classic **depending on what the user looked at before it**. Path
dependence is the discriminator. A record that always opens in the same wrong mode is MEDIUM-1's
class or a predicate bug; a record whose opening mode depends on history is an unreached call site.

**Owning stage: QA, Phase 2.** QA's required-tests table already scopes M7-a over the load-path
class, and the discharging check is a call-site enumeration by reference-following from
`setMessageMode` and from the provider's message-setting effects — not by grep, for the reason
MEDIUM-2 documents at length. Named again in Next Steps so it is routed rather than shelved.

## Verdict

**Status**: **APPROVED_WITH_COMMENTS**

**Rationale**: M7's code is correct and the milestone's substance is delivered. That is established
by execution over the whole 36-cell (flag × structure) partition rather than argued from a
four-file diff: 122/122 at `18407d8`, 11 failures at `495463a` locating the defect precisely on the
six flag-only rows and on `switchToV2`, and three independent mutants — one per moving part — all
killed. Every one of the twelve cells whose classification changed is explained by a clause of M7-a,
no cell moves in the unsafe direction, the patch warning only ever grows, and D7's residue survives
the toggle in both directions through the plan's named instrument. The predicate agrees with
`validateContentRequirements` on all 36 rows against a positive control that shows the comparison can
fail. Typecheck 0, build 0/0.

**Two MEDIUM findings, neither of which is a defect in the code.** MEDIUM-1 is a change that is
correct and under-described: the mode-writing class is twice the size the plan's R8 row and the
implementation document state, and four of the six newly-written cells have nothing to do with the
flag. MEDIUM-2 is a pre-existing test-quality defect that M7 *surfaced* rather than caused — two of
the four files named as M7's red-test domain transcribe the mode functions locally, cannot go red
from a `messageMode.ts` change, and now carry a narrative M7 has falsified while still passing. Its
owner is QA. What is the implementer's in MEDIUM-2 is narrower and worth stating plainly: a
reconciliation sweep that reads *"still green"* as evidence, from files that could not have gone red.

**Neither MEDIUM blocks QA**, and one of them is QA's to fix. The single red test in the suite is
predicted by name in the plan and assigned to QA by two separate sections, both of which I verified
rather than accepted; Validation item 1 therefore remains open by design.

**Not settled here, per D22 exception 1** — both halves that imply the plan is incomplete go to
steering for the planner, not to the implementer: R8 and Validation item 5's deployment-record clause
name only the flag class (MEDIUM-1), and Plan Scope's red-domain prediction counts names rather than
behaviour members (MEDIUM-2).

**This verdict binds `18407d8d03411103cec06124c8c476362c0ad3f8` and no other tree.** Verified at the
start of the pass and re-verified unmoved at the end. Any change to any covered blob expires it and
the review re-runs. **M1's approval at `495463a` stands and is untouched by this round.**

## Required Actions

**None blocking.** The gate is passed and QA may proceed.

To the implementer, before M7 is called closed in the record:

1. **MEDIUM-1 (minimum half)** — the implementation document states the second mode-writing class:
   a mode is now written for every record with no `components` key, not only flag-carrying ones.
   Four of the six newly-written cells are not flag-related.
2. **MEDIUM-2 (the half that is yours)** — the reconciliation sweep's entry for
   `012-send-gate-partition.test.ts` and `012-json-editor-repair-path.test.ts` records that green
   there is **uninformative**, because both transcribe the functions locally. The conclusion may
   stand; the reasoning may not.
3. **LOW-1** — drive M7-b's cases through `applyModeSwitch` (preferred), or correct the Test Coverage
   bullet, which claims coverage the spec does not have.
4. **LOW-2** — correct the two TDD-table red counts and state each row's red set by case.
5. **INFO-3** — take suite figures from a clean materialisation of the sha they are attached to.

To QA, at Phase 2 (not blocking this verdict):

6. **MEDIUM-2 (the substance)** — re-anchor `012-message-mode.test.ts`'s pre-D16 assertion, and treat
   the two transcribing files as the finding their own header describes: import the product's
   functions and delete the local copies, rather than updating the transcriptions to match.
7. **The Assumption Not Checked** — enumerate the composer's load paths by reference-following and
   confirm each reaches `detectMode`.

## Captured Instruments (round 3)

| Path | What it settles |
|---|---|
| `agent-output/verification/013/probe-cr3-mode-predicate/` | What M7 actually changed, by execution over the whole mode-decision input class. `mode-differential.test.ts` (122 assertions over 36 rows: predicate agreement against `validateContentRequirements`'s own error as oracle, the old/new classification differential, warning monotonicity, the flag algebra through `applyModeSwitch`, and 5712's one-toggle exit), `vitest.cr3.config.ts` (tree-selectable via `PROBE_SRC`, output via `PROBE_OUT`), captures for `18407d8`, `495463a` and three mutants, and a README stating what the probe proves, that its old side is a **declared model** rather than a probe, and what it cannot see. |
| `agent-output/verification/013/probe-cr3-mode-predicate/mutation-check/` | Whether the **implementer's own** M7 spec and the two 012 specs discriminate. `vitest.cr3-mutation.config.ts` plus `vitest.redcheck.config.ts` (spec from one tree, source from another — how LOW-2's red count was measured). Runs: clean, three mutants, and the M7 spec against `495463a` (15/16 red). |

Both carry positive controls and both kill their mutants, so a green run from either is
distinguishable from an instrument that imported nothing.

**`no test` from me, explicitly**, for M7's in-suite coverage: Vitest already reaches
`src/**/__tests__/`, the plan puts M7-a/b/c's enumerations in the project's own suite, and QA owns
the acceptance cases. What I owed instead was evidence that the in-suite version can fail, and
`mutation-check/` is that evidence — including the finding that one of its four mutant-detections
lives in a file scheduled for rework by another stage.

## Next Steps

**Handing off to the implementer subagent** — `implementer-hooks-013`, directly, per D22 — to
continue with the remaining milestones. Its next step is **M8's EC-3**, QA's Phase-1 entry condition
(**F-QA4**, High): one shared, importable, pure persist gate consulted by all five `message.upsert`
writers, rather than a gate written three times across independent `.tsx` call sites. EC-3 gates M8
and M2 both, and QA assigns it to the implementer *before any M8 spec is written*.

**QA is not the next stage, and this document said otherwise in an earlier draft.** The plan runs
**QA Phase 1 before implementation** (Testing Strategy), so **Phase 2 runs after implementation
completes**, not after a milestone — five milestones remain (M2, M3, M4, M6, M8). Round 1 stated this
correctly and rounds 2 and 3 both drifted from it; `steering-hooks-013` corrected it, I verified the
phasing against the plan rather than taking it on the relay, and round 2's line above now carries the
same correction. The items below are **owned by** QA Phase 2 — that routing is unchanged and does not
imply QA runs next.

**A sequencing consequence worth stating once, since it now spans five milestones**: the suite stays
non-green until QA Phase 2 re-anchors `012-message-mode.test.ts`, so every subsequent milestone review
— mine included — must re-establish that the six failures are the *expected* six rather than reading a
green suite. MEDIUM-2's two drifted transcriptions sit unfixed for the same span, and a transcription
that has already drifted once can drift further as M2, M4 and M8 change the same functions. Recorded
for steering as a sequencing fact, not reassigned: the files are QA's by the plan's own allocation.

**Routed, not shelved** — the Assumption Not Checked above belongs to **QA Phase 2**: enumerate the
composer's load paths by reference-following and confirm each reaches `detectMode`. Its falsity
signature is path-dependent mode on open. QA's two still-open assumptions from earlier rounds ride
the same phase: `safeParse` over the stored `Messages.data` corpus (round 2) and **F-QA8**'s
`message.upsert` writer set (round 1).

**To steering, for the planner** — two items settled by neither of us, both **D22 exception 1**:

1. **R8 and Validation item 5** name only the flag class of M7's mode change. The measured class is
   twice that size and four of the six newly-written cells are not flag-related (MEDIUM-1). R-5's
   deployment-record clause inherits the gap.
2. **Plan Scope's red-domain prediction** counts symbol *names*, not behaviour members: two of its
   four M7 files transcribe the functions locally and could never go red (MEDIUM-2). QA's own
   re-derivation reproduced the error with the same instrument, so this is a plan-and-QA item, not a
   plan-only one.

**Pattern, with two citable instances** — the TDD table under-counting its red set: round 1's LOW-1
(`ba0f6e3`, `Reviewed-At: a4eb00d`) and this round's LOW-2 (`Reviewed-At: 18407d8`). Recorded for the
retrospective. INFO-3's suite-figure provenance is a second occurrence of round 2's INFO-5 and rides
with it. Neither is escalated further; both are small each time and the recurrence is the signal.

**Also for steering, discharged rather than outstanding**: risk **R2**'s mitigation — *"the file's
hash unchanged between base and tip is captured by the reviewer"* — is captured here for the first
time. `src/server/api/utils/messageValidity.ts` is blob `f477b71…` at both `c85945f` and `18407d8`.
The plan's bare citation of that filename remains the unresolvable one from round 1, still **held**
under D24 along with R4's prediction record; until that pass runs, this review is the authoritative
statement of both.

**M1 is unaffected.** Its approval at `495463a` (round 2, `e1ca0e8`) stands.

---

# Between rounds — the expected-six baseline is now an instrument (2026-08-24)

Not a review round. **No verdict here applies to `92ce026`**, which has not been submitted; the
binding verdict remains round 3 at `18407d8`.

Steering's D25 reply made this reviewer's per-round *"still the expected six"* check the standing
mitigation for the five milestones during which the suite cannot be green, in preference to an
out-of-phase QA re-anchor. Steering asked to be told if that check is thinner than it was being
treated as. Answering that honestly required testing the check rather than introspecting about it,
so the check was tested, and one worry of mine collapsed while a different one was confirmed and
closed.

**The worry that collapsed.** I had been treating the five `standardizeMessage` reds as possible
whole-file masking — if the module failed at load, everything else in the file would be invisible.
It does not. `standardizeMessage` is called inside the per-test helper `editorRoundTrip`, not at
module scope; the file loads, all six of its tests are collected, and one passes. Nothing is masked,
and a new test in that file that broke would raise the count. **The check is stronger in that
dimension than I had been treating it as**, and steering's judgement is better supported than my own
framing of it was.

**The worry that was confirmed, and what it cost.** The baseline the check compares against existed
only as sentences in this document. By my own deliverables rule, *a number reproducible only by
rebuilding the instrument is prose* — and the next four reviews were being asked to re-derive it
from my paragraphs. It is now
`agent-output/verification/013/baseline-expected-six/`: `check-expected-six.sh <sha>` re-derives the
failure **set** and diffs it against a pin, exit 2 on divergence. Four controls, including reason
drift on the same test and a simulated seventh failure; both diverge as required, and an end-to-end
run at `18407d8` independently re-derives round 3's `443/437/6`.

**What building it turned up — INFO-4, and it is the reason this was worth doing now.** Suite figures
in the implementation record are taken from the shared *working tree*, which carries other sessions'
untracked test files, and **vitest collects them**. Measured twice, identical signature:

| round | reported | clean `git archive` extraction | delta |
|---|---|---|---|
| M7 `18407d8` | 450/444/6 | **443/437/6** | +7 / +7 / +0 |
| M8-EC3 `92ce026` | 469/463/6 | **462/456/6** | +7 / +7 / +0 |

Cause, now named rather than inferred: `src/utils/__tests__/013-qa-phase1-seed-route-probe.test.ts`,
7 tests, untracked, `qa-hooks-013`'s work in progress. Round 3 recorded the M7 gap as
working-tree-versus-committed without identifying the file; this is the same mechanism, so INFO-3's
provenance note now has a diagnosed cause and a second instance.

**Class:** a suite figure quoted from a tree that is not the commit. **Enumeration:** `git -C
website status --short` before any suite run — any `??` under a test glob contaminates it; this does
not match files ignored by `.gitignore` but still collected, nor a *tracked* file another session has
modified but not committed, which changes results without appearing as `??`. **Required action —
Preferred (structural):** quote suite figures from `check-expected-six.sh <sha>`, which extracts
clean and cannot see the working tree. **Minimum:** state the tree the figures came from.

Severity stays INFO: both times the foreign tests all passed, so they inflated totals without
touching the failure set, and both conclusions held. That is luck about the foreign file's colour,
not a property of the method — a foreign red would have been read as a regression in the commit.

**The residual blind spot, stated rather than closed.** The comparator keys on
`file :: test :: first reason line`, so a new defect reproducing an existing red *exactly* is
invisible to it — live here, since any future defect leaving the V2 flag set at that point yields
`012-message-mode.test.ts`'s identical `expected 32768 to be +0`. Reason *drift* is caught (control
1). The compensating instrument is `probe-cr3-mode-predicate/`, which covers that surface
behaviourally over 36 rows and keys on nothing in the suite output. That pairing is what makes the
mitigation adequate; the count check alone would not be.

**No re-anchor requested.** With the baseline mechanical and CR3 covering the collision-prone
surface, steering's call to prefer this over an out-of-phase QA spawn holds on the evidence, not
merely on the absence of a counter-argument.

---

# Round 4 — M8's EC-3 (the pure resolver and persist gate) at `92ce026`

**Reviewed-At**: `92ce026a5bb0ddf0b2d1fe451d14bd74c77c746a`, chain branch
`chain/013-components-v2-editing-surfaces`. Verified at the start of the pass and again at the end.
Round 3's verdict stays bound to `18407d8` and does **not** travel to this tree.

**Verdict: APPROVED_WITH_COMMENTS.** EC-3's substance is delivered — the disposition and the gate
exist as pure importable functions, so `requiresChoice` / `mustAsk` are assertable without the
call-site observation no harness here can make. The implementation is faithful to the plan's own
eight-cell table, the TDD is genuine under mutation, and all three gates reproduce independently.
Every finding below is about a **contract that M8 is about to consume at seven call sites**, and
each is cheapest to fix now, before the wiring exists.

## Scope, and what I checked rather than accepted

`+78 −0` in `src/utils/index.ts`, `+168 −0` in a new spec. Nothing else. Purely additive: no
existing export touched.

| claim | how re-derived | result |
|---|---|---|
| eight-cell fidelity to D17 | `probe-cr4-disposition-gate/`, 10 cells driven directly, expectations transcribed from the **plan's** table | **10/10 match** |
| TDD red, "right reason" | reverted `utils/index.ts` to `18407d8`, kept the spec at `92ce026` | **19 failed**, `15 × resolveContentLoss is not a function`, `4 × gateBeforePersist` — exactly the table's 15/4 |
| the spec is not a check that cannot fail | three mutants against the implementer's own spec | **dies on all three** (4, 1, 2 failures) |
| `tsc --noEmit` 0 | clean `git archive` extraction | **0** |
| `next build` exit 0, 0 warnings | clean extraction | **exit 0, 0 warnings** |
| suite "no new failures" | `baseline-expected-six/check-expected-six.sh` at `18407d8` vs the `92ce026` pin | **MATCH** — the set is unchanged between the two trees |
| nothing is wired | `git grep -c` on all five new symbols | definitions + spec only, **0 other consumers** |

**On the suite figure, stated non-circularly**: the baseline was pinned *at* `92ce026`, so
"MATCH at `92ce026`" would be comparing a tree to itself and proves nothing. The load-bearing run is
the one at **`18407d8`**, which matches the `92ce026` pin — that is what establishes this commit
introduced no new failure. Clean figures are **462/456/6** here and **443/437/6** there; see INFO-4.

**Good patterns, said plainly.** The row table is transcribed into the spec's header as a comment
addressed to a *tool*-free reader — but the expectations themselves are literals off that table, so
EC-5 independence genuinely holds and the mutation results prove it. `gateBeforePersist` does its
own bit-masking rather than trusting a caller, which is precisely the right instinct — and is the
reason MEDIUM-3 below is about `resolveContentLoss` and not about the gate.

## MEDIUM-1 — `dropSet` is constant across the entire input domain, and empty on the one row where content is certainly lost

**Location**: `src/utils/index.ts`, `resolveContentLoss` (all four return sites), and the
`ContentLossDisposition` interface.

**Class**: a returned field that carries no information — identical for every input — while its name
and type promise a per-row answer, and whose value is actively misleading on row E.

**Enumeration**: `probe-cr4-disposition-gate`, section CR4-B, run over all ten cells. Captured
output: `dropSet` is `[]` in **10 of 10**, row E included. The predicate is exhaustive over the
`(bit × components × content)` partition the plan defines; it does **not** cover embeds shapes beyond
the three in CR4-E, and it cannot see a future caller that sets `dropSet` itself.

**Why it matters, concretely.** Row E is the one disposition where the user is *told what will be
dropped* — that is the whole of D17's governing principle. A caller writing the obvious
`if (d.dropSet.length) showDrops(d.dropSet)` renders **nothing** on exactly that row. The real drops
live only in `options[].dropSet`, which a reader of the top-level field has no reason to consult.
Worse for the next gate: **M8-F's parity obligation is stated over "row, drop set, notice class"**,
so a field that never varies satisfies "same drop set at both surfaces" vacuously — the parity check
QA is being asked to build cannot fail on this component.

**Required action — Preferred (structural)**: make the trap unrepresentable by discriminating the
type on the choice, so no value ever carries both a meaningless `dropSet` and the real drops:
a `requiresChoice: true` disposition has `options` and **no** `dropSet` field; a
`requiresChoice: false` disposition has `dropSet` and **no** `options`. TypeScript then rejects
`d.dropSet` on a row-E value at compile time rather than returning `[]`.
**Minimum**: leave the shape and have QA's M8-F parity instrument assert over `options[].dropSet`
rather than `dropSet` — this keeps the trap but stops the parity check being vacuous.

**Magnitude**: unmeasured beyond the enumeration — the consequence is a hypothesis about M8's
callers, since no caller exists yet. What *is* measured is that the field is constant over the
domain and empty on row E.

## MEDIUM-2 — the decision is centralised; applying the decision is not

**Location**: `src/utils/index.ts` — `resolveContentLoss` / `gateBeforePersist` as the complete
delivered surface.

**Class**: an entry condition that centralises a *decision* while leaving its *application* to each call
site, so the divergence hazard the condition exists to close survives one level down.

**Enumeration**: `git grep -c` at `92ce026` for every exported symbol of this change —
`resolveContentLoss` (2 in `index.ts`, 22 in the spec), `gateBeforePersist` (1 / 7),
`ContentLossDisposition` (2), `ContentLossOption` (4), `ROW_E_OPTIONS` (2). **No function anywhere
consumes a `ContentLossDisposition` and returns a draft.** The predicate matches exported names in
`src/`; it does not match a helper that might be added inside a component, nor an application written
inline without naming the type.

**Why it matters.** The resolver reports `mode: 'classic'` for row D and
`options: [{mode:'v2', dropSet:['content','embeds']}]` for row E — but *nothing ships that turns
either into a draft*. Row D requires clearing the V2 bit; row E requires deleting the chosen keys.
So each of M8's consumers — the two JSON surfaces plus the five IS-1 writers, **seven sites** — must
implement flag-clearing and key-dropping itself. That is R9's failure mode ("one object, two
dispositions") restated for the application half, and it is exactly what EC-3 was raised to prevent:
QA's own falsity signature for skipping EC-3 is *"the decision lives in `JsonModalBody`,
`NewMessageJsonInput`, `SaveAsMenu` and `useApiMethods` separately"*. The decision no longer does.
The application still would.

**Required action — Preferred (structural)**: add the application alongside the decision — a pure
`applyDisposition(draft, disposition, chosenOption?) → draft` in the same module, so the surfaces
*render and apply* what the resolver reports and no call site writes flag or key manipulation of its
own. M7 already ships `applyModeSwitch`/`switchToClassic`, which clears the bit correctly; the
application function should delegate to it rather than restate it.
**Minimum**: M8 wires exactly one shared helper for the application even if it lives in a component
module, and the implementation doc names the single site.

**This is the finding I would most like acted on before M8 begins**, because its cost multiplies by
seven once the wiring is written.

## MEDIUM-3 — `flagBit: boolean` invites the caller to compute the wrong bit

**Location**: `src/utils/index.ts`, `resolveContentLoss` first parameter.

**Class**: a contract that accepts a *derived* value where the raw value is available, so every call
site re-derives it and any one of them can derive it wrongly — with no type error.

**Enumeration + demonstration**: `probe-cr4-disposition-gate`, CR4-C, executed:
with `flags = 4` (`SUPPRESS_EMBEDS`, D7 residue, **not** the V2 bit) over classic content,
`resolveContentLoss(!!(flags & IS_COMPONENTS_V2_FLAG), …)` returns row **A** (nothing shown) while
`resolveContentLoss(!!flags, …)` returns row **D** — a warning, and the message re-moded. Both calls
type-check. The same section shows `gateBeforePersist({flags: 4, …})` is **not** susceptible,
because it takes the number and masks internally.

**Disposition order applied**: the contract says `boolean`, and every boolean is a valid boolean — so
this is not a missing runtime guard, it is the contract leaving the question open (step 2). The fix
belongs in the signature, not behind it.

**Required action — Preferred (structural)**: take `flags: number | undefined` and mask inside,
exactly as `gateBeforePersist` already does; the misuse then cannot be written. The boolean parameter
buys nothing — no caller has a bit without having the number.
**Minimum**: keep the boolean but have all seven M8 call sites obtain it only via
`gateBeforePersist`, never by calling `resolveContentLoss` directly.

## LOW-1 — EC-3 names `chosenOutcome`; the delivered object has `options`, and the substitution is undeclared

**Location**: `ContentLossDisposition` versus QA's EC-3 probe text.

EC-3 specifies the resolver returns
`{ row, mode, dropSet, noticeClass, requiresChoice, chosenOutcome }`. The delivered interface has
`options` in place of `chosenOutcome`. **I think the substitution is right**: the resolver is pure
over `(flagBit, components, content, embeds)` and cannot know a choice that has not been made, so
`chosenOutcome` is not computable from its inputs — `options` is the computable form of the same
idea. But the implementation doc describes the shape without noting that a **named field of the
entry condition is absent**, so a reader checking EC-3 off against the delivery finds a field
missing and no disposition for it.

**Class**: a named element of an entry condition satisfied by substitution without the substitution
being declared. **Enumeration**: the six field names in EC-3's probe text against the interface —
five present, one substituted, 1 of 6. **Required action**: not a code change — **QA owns EC-3** and
should record whether `options` discharges `chosenOutcome`. Routed to `qa-hooks-013`, not to the
implementer.

## INFO-1 — two spec names promise a mutation the function does not perform

`013-m8-ec3-resolver-gate.test.ts` names tests *"row D: … Classic, warning, **bit cleared**"* and
*"row B: … V2, **bit set**, warning"*. Nothing in either test asserts a bit changing, and nothing
could: `resolveContentLoss` is pure and returns a report, never a draft. The names describe a
**caller's** obligation. A reader auditing "is the bit cleared on row D?" finds a green test named
for it that never checks it — coverage claimed by a name rather than an assertion. This is the
same defect class as MEDIUM-2 seen from the test side. **Required action**: rename to what is
asserted (*"reports Classic with the conflict notice"*), and let the real obligation be asserted
against the application function MEDIUM-2 asks for.

## INFO-4 (carried) — suite figures are quoted from the shared working tree

Filed in the between-rounds note above and repeated here because it recurs in this commit's message
(`469/463/6`; clean is `462/456/6`). Cause: `013-qa-phase1-seed-route-probe.test.ts`, 7 tests,
untracked, another session's. **Required action — Preferred (structural)**: quote suite figures from
`baseline-expected-six/check-expected-six.sh <sha>`, which extracts clean and cannot see the working
tree. **Minimum**: name the tree the figures came from. Steering has corrected the attribution
upstream — this is a shared-tree property, **not** an implementer accuracy problem, and should not be
recorded as one.

## TDD Compliance

Verified, not accepted. The table's two rows claim red at 15/4 with `TypeError`; reverting
`utils/index.ts` to `18407d8` against the `92ce026` spec reproduces **15 × `resolveContentLoss is not
a function`** and **4 × `gateBeforePersist is not a function`**, 19 failed. No exemption is claimed
and none is needed. Expectations independence (EC-5) holds and is demonstrated by mutation rather
than asserted: the spec dies on all three mutants.

## Adversarial execution — why it is scoped out this round, and when it becomes mandatory

`gateBeforePersist` is a guard on an irreversible action (a persisted overwrite), which normally
triggers the standing requirement to stand the service up and attack it. It does **not** this round,
for a reason established by enumeration rather than assumed: `git grep -c` shows **no call site
consumes either function**, so no running instance can reach them and any "attack" would only be my
own harness calling a pure function — which is what the CR4 probe already does, exhaustively.

**This exemption expires the moment M8 wires the gate.** At that point the gate is reachable, and the
review of that commit must drive the five IS-1 writers against a running instance and assert the
negative on the persistence surface itself — no `message.upsert` before a choice — not on the
response. Recorded here so the next round inherits the obligation rather than the exemption.

## Assumption Not Checked

**This review assumes that an embed reaching `resolveContentLoss` through the real import pipeline
has the same emptiness verdict as the hand-built embeds CR4-E drove, and does not test it.** CR4-E
called `hasClassicContent` through the resolver with literal embed objects (`[{}]`, `[{title:'x'}]`);
it never fed an embed that had passed through `filterSupportedComponents` and
`discordMessageImportShape.parse`, which may add or strip keys (`_key` is already special-cased in
`hasClassicContent`, which is evidence that pipeline-shaped embeds differ from hand-built ones).
**Falsity signature**: a pasted object whose embed is meaningful before parsing and empty after (or
the reverse) lands on a different row at the wired JSON surface than the resolver reports in
isolation — observable as row B where the probe says row E, i.e. a silent strip of a real body,
which is the defect 013 exists to fix. **Owner**: the implementer, at M8-A/M8-B, where the resolver
first sees post-parse data — the disposition must be taken on the object that will actually land;
QA's M8-F parity instrument is the backstop that would catch it if the wiring takes it on the
pre-parse object instead. Named again in Next Steps.

## Next Steps

1. **`implementer-hooks-013`** — MEDIUM-2 first and before any M8 wiring: an application function, so
   flag-clearing and key-dropping are written once rather than seven times. Then MEDIUM-1
   (discriminated union) and MEDIUM-3 (`flags: number`), both of which are signature changes that get
   more expensive with every call site added. INFO-1 is a rename. **Carry the Assumption Not Checked
   into M8-A/M8-B**: take the disposition on the post-parse object, and say in the implementation doc
   which object it was taken on.
2. **`qa-hooks-013`** — LOW-1: record whether `options` discharges EC-3's named `chosenOutcome`. And
   note MEDIUM-1's consequence for **M8-F**: a parity assertion over `dropSet` cannot fail, because
   that field is constant across the domain; assert over `options[].dropSet` instead.
3. **`steering-hooks-013`** — nothing new is routed. INFO-4's attribution correction is already in
   hand.

**QA is not the next stage** — Phase 2 follows implementation's completion, and M2, M3, M4, M6 and
M8 itself remain. EC-3 is a precondition; M8 has not started.

**M1 and M7 are unaffected.** Their approvals at `495463a` and `18407d8` stand on their own trees.

---

# Round 5 — EC-3 fix round at `0c8fad5`

**Reviewed-At**: `0c8fad5173613d2163bd9d1ecb62123ab2e928cb` (`2f49182` + `0c8fad5`, both after
`92ce026`). Verified at the start of the pass and again at the end. Round 4's verdict stays bound to
`92ce026`.

**Verdict: APPROVED_WITH_COMMENTS.** All three round-4 MEDIUMs are closed **structurally** — the
Preferred fix in each case, not the Minimum — and each closure is verified by execution, not by
reading the diff. Two new MEDIUM findings arise from the re-attack, both in the newly added
`applyDisposition`, and one of them is round-4 MEDIUM-3's own class reappearing at the new function.
Neither blocks EC-3; both should land **before M8 wires anything**, which is the very next unit of
work.

## Dispositions of the round-4 findings — class gone, and the check that fails if it returns

Per the standing rule, each disposition records two things: that the class is eliminated, and the
captured check that fails if it comes back.

| finding | class gone? | check that fails if it returns |
|---|---|---|
| MEDIUM-1 dead `dropSet` | **Yes, structurally** — discriminated union; `'dropSet' in d` is `false` in **8/8** cells, the field is removed rather than emptied | `probe-cr5-application-half/application-half.cr5.test.ts`, CR5-A. Also in the project's own suite (the implementer's row-E assertion) |
| MEDIUM-2 no applier | **Yes** — `applyDisposition` added, delegating to `applyModeSwitch` rather than restating flag rules | CR5-B/C/D; and `013-m8-ec3-resolver-gate.test.ts`'s six `applyDisposition` assertions |
| MEDIUM-3 `flagBit: boolean` | **Yes, structurally** — signature is now `flags: number \| undefined`, masked internally | CR5-A: `flags = 4` → row **A**, `4 \| BIT` → row **D** |
| INFO-1 misleading test names | Yes | `no test` — a naming change; nothing asserts a name |

**I re-ran the sweep rather than checking the flagged sites.** `git grep -c` on all six exported
symbols at `0c8fad5`: definitions and the spec only, no `.tsx` consumer. The predicate matches
exported names in `src/`; it does not match an inline reimplementation that never names the symbols.

## Verified rather than accepted

| claim | how | result |
|---|---|---|
| eight cells survive the signature change | CR5-A, expectations from the plan's table | **8/8** |
| TDD red for the fix round | reverted `index.ts` to `92ce026` against the `0c8fad5` spec | **8 red**: 5 × `TypeError: applyDisposition is not a function`, 1 × the throw-match, 1 × the `dropSet` absence assertion, 1 × the MEDIUM-3 regression |
| the vacuity self-catch is real | reintroduced the bare `.toThrow()` | **green against a tree with no `applyDisposition`** — the vacuity was real, the tightening closes it |
| `tsc --noEmit` | clean extraction | **0** |
| `next build` | clean extraction | **exit 0, 0 warnings** |
| failure set unchanged | `check-expected-six.sh 0c8fad5` | **MATCH**, clean totals **472/466/6** |

**On the red count, a correction in the implementer's favour.** Their message to me said *"8/8 red
for `applyDisposition`"*; the **implementation document says 6/6**, which is what I reproduce (5
`TypeError` + 1 throw-match). The other two of the eight are the MEDIUM-1 and MEDIUM-3 regression
assertions going red — which is *better* than claimed, because it shows those two are genuinely
discriminating tests and not decoration. The authoritative record is right; only the summary rounded.

**Two things done well enough to name.** First, the implementer caught a **check that cannot fail in
their own work** — a bare `.toThrow()` satisfied by the pre-existence `TypeError` — and tightened it
before I saw it. I verified the vacuity by reintroducing it, and it is exactly as they described.
Second, they removed a rationale docblock and a header paragraph written *to a future reviewer*
before committing. Both are the discipline this process asks for, applied unprompted.

## MEDIUM-1 (round 5) — `draft` and `disposition` are untied, and a mismatched pair destroys a body silently

**Location**: `src/utils/index.ts`, `applyDisposition(draft, disposition, chosenOption?)`.

**Class**: a contract that accepts a **derived** value alongside the source it was derived from,
without tying them — so a caller can pass a disposition computed from a *different* draft and the
function will apply it. **This is round-4 MEDIUM-3's class**, closed at `resolveContentLoss` and
reopened at `applyDisposition` in the same round.

**Enumeration**: the three exported functions taking a disposition or a derived flag —
`resolveContentLoss` (**closed**, now takes raw `flags`), `gateBeforePersist` (**never had it**,
takes the draft and derives internally), `applyDisposition` (**open**). 1 of 3. The predicate is the
exported signatures in `src/utils/index.ts`; it does not match a future function that takes a
disposition without naming the type.

**Demonstrated, not theorised** — CR5-D, executed:
a row-B disposition (*"nothing to lose — save as V2"*, `requiresChoice: false`) computed from an
empty-bodied V2 draft, applied to a draft carrying `content: 'a body the user typed'` and an embed,
yields **`content: ''`, `embeds: []`** — the body destroyed, **no choice presented** — while
`gateBeforePersist` on that same draft returns **`mustAsk: true`**. The gate and the applier
disagree about the same object, and the applier wins because nothing consults the gate.

That is precisely D18's subject: *"the save path stops silently destroying the user's classic
body — it blocks and asks."* The new API can be driven into the behaviour the ruling forbids.

**Required action — Preferred (structural)**: make the mismatch unrepresentable by removing the
parameter — `applyDisposition(draft, chosenOption?)`, computing the disposition from the draft
internally exactly as `gateBeforePersist` does. Callers that need the disposition for rendering
still call `resolveContentLoss`/`gateBeforePersist`; nobody hands one back in.
**Minimum**: keep the signature and have every M8 call site obtain draft and disposition in one
expression, never storing a disposition across a state change — with the invariant stated in the
implementation doc rather than in a comment.

**Magnitude**: unmeasured as a production consequence — nothing is wired, so this is a hypothesis
about M8's callers. What is measured is that the mismatched pair is accepted and destroys the body.

## MEDIUM-2 (round 5) — the advertised drop and the enacted drop are separate sources of truth, and already disagree

**Location**: `ROW_E_OPTIONS` in `src/utils/index.ts` versus `switchToClassic`/`switchToV2` in
`src/utils/messageMode.ts`.

**Class**: a user-facing promise and its enactment maintained in two places with nothing asserting
they agree.

**Enumeration**: the two members of `ROW_E_OPTIONS`, each compared against what `applyModeSwitch`
actually does. **2 of 2 checked, 1 disagrees.** The predicate compares the advertised `dropSet`
strings to the observed field changes; it cannot see a disagreement in a drop that no `dropSet`
string names.

**Executed** — CR5-B: the classic option advertises `dropSet: ['components']`, but
`switchToClassic` **keeps Action Rows** (`type === 1`), so `[container, actionRow]` becomes
`[actionRow]`. The notice M8-E renders from that string will tell the user their components will be
dropped while their button rows survive. The v2 option agrees exactly (`content`, `embeds`).

Also established: **`applyDisposition` never reads `dropSet`**. A deliberately bogus
`dropSet: ['nothing','at','all']` changes nothing about what is dropped — the drops are enacted
entirely by `mode`. So `dropSet` is a *label*, and nothing keeps the label honest.

Direction matters here and it is the safe one: the label **overstates** the loss (more is promised
dropped than actually is), so no user is under-warned. That is why this is MEDIUM and not HIGH.

**Required action — Preferred (structural)**: derive the label from the enactment instead of
maintaining it beside it — compute each option's `dropSet` by diffing the draft against
`applyModeSwitch(option.mode, draft)`, so the advertised drop is by construction what happens.
**Minimum**: correct the string to what is actually dropped (V2 components, not all components) and
have QA's M8-E instrument assert the notice against the applied result rather than against the
constant.

## INFO-1 (round 5) — a new import cycle, tested and benign, recorded as fragility

`src/utils/index.ts` now imports `applyModeSwitch` from `~/utils/messageMode`, while
`messageMode.ts` imports `hasV2Components` from `~/utils` — a cycle through the barrel.

I did not assert this was safe. Probed in **both** import orders including the TDZ-risky leaf-first
one (`cycle-index-first.cr5.test.ts`, `cycle-mode-first.cr5.test.ts`): both modules initialise and
every cross-referenced function works, and `next build` bundles it. **It holds only because neither
module calls the other at module-evaluation time** — `ROW_E_OPTIONS` and `V2_COMPONENT_TYPES` are
module-scope `const`s that would be in TDZ if it did. No action required now; the structural exit, if
one is ever wanted, is to move `hasV2Components` and its type set out of the barrel into a leaf both
sides import.

## INFO-2 (round 5) — the spec's header duplicates the plan's row table, and I let this pass in round 4

`013-m8-ec3-resolver-gate.test.ts` carries the D17 row table in a header comment. Under the tool
test that is prose in a source file, and it is a **second source of truth** that can drift from the
plan silently — the same class as MEDIUM-2 above, one level up. **I did not raise this in round 4
and should have**; recording my own inconsistency rather than quietly starting to enforce it. The
fix is not to delete the table but to make it executable, as the CR5 and CR4 probes do — transcribe
it into a `const` the assertions iterate, so drift from the plan shows up as a failing test rather
than as a stale comment.

## INFO-3 (round 5) — the +7 recurs, and is now disclosed

Clean totals at `0c8fad5` are **472/466/6**; the reported figure is **479/473/6**. Third instance,
same `+7/+7/+0`, same cause. **The implementer has acted on this**: the implementation document now
says *"(working tree, includes the untracked QA probe)"* — the Minimum action from INFO-4, taken
unprompted. No further action asked of them; the structural form remains
`check-expected-six.sh <sha>`.

## TDD Compliance

Verified by re-derivation, not accepted. Ten new tests, 29/29 green at the tip, and the red state
reproduces exactly against `92ce026`'s source. No exemption claimed. The `applyDisposition` throw
assertion is genuinely discriminating, proven by reintroducing the loose form and watching it pass.

## Adversarial execution

Still scoped out, and for the same enumerated reason: `git grep -c` shows no call site reaches any of
the three functions, so nothing can be driven against a running instance that the probe does not
already drive directly. **The exemption expires when M8 wires the gate** — which is now the next unit
of work, so the next review round on wiring must stand the service up and assert the negative on the
persistence surface itself.

## Assumption Not Checked

**This review assumes `applyModeSwitch` behaves at the persist boundary the same way it behaves when
called directly on a plain object, and does not test it.** Every CR5 assertion calls
`applyDisposition` on hand-built literals; none drives it through a real draft object as the
composer holds it — which may carry `_key` fields, React state identity, or keys the spread
preserves and the persist path then serialises. **Falsity signature**: an applied disposition that
looks correct in isolation persists a record still carrying the dropped key — a V2 record with a
surviving `content`, i.e. the 5712 shape D19 exists to abolish, recreated by the very function meant
to prevent it. **Owner**: the implementer, at M8-G, where `applyDisposition` first meets a real
writer, with QA's IS-1 no-upsert-before-choice instrument as the backstop. Named again in Next Steps.

## Next Steps

1. **`implementer-hooks-013`** — before wiring anything: **MEDIUM-1 (round 5)** first, since the
   wiring about to be written is exactly what would carry a stale disposition across a state change;
   then **MEDIUM-2 (round 5)**. Both are cheaper now than after the JSON modal's Load exists. The
   plan-order correction (`d598b54`, M2 before M8) does not change this — the shared M2+M8 wiring in
   `JsonModalBody.tsx` is the first consumer either way. **Carry the Assumption Not Checked into
   M8-G** and name, in the implementation doc, the actual object `applyDisposition` is handed.
2. **`qa-hooks-013`** — LOW-1 from round 4 still stands. Add: **M8-E's notice instrument must assert
   against the applied result, not against `ROW_E_OPTIONS`' constant strings** — MEDIUM-2 (round 5)
   shows the constant is already wrong for the classic option.
3. **`steering-hooks-013`** — nothing routed. Noting only that round-4 MEDIUM-3's class reappeared at
   a new function inside the same fix round; that is a data point about class-scoped findings
   needing an enumeration that includes *functions not yet written*, not a process failure by the
   implementer, who fixed exactly what was enumerated.

**QA is not the next stage.** M2, M3, M4, M6 and M8 remain; the next unit is the shared M2+M8 wiring
in `JsonModalBody.tsx`'s Load.

**M1, M7 and EC-3-at-`92ce026` are unaffected.** Their verdicts stand on their own trees.

## Method note (round 5, added after steering's D25-round query) — I tested the "same shape" hypothesis and it does not hold

Steering proposed that round 3's red-domain error and round 5's enumeration limitation are the same
shape — *"the instrument's basis and the class's definition were not the same thing, and the gap was
invisible from inside the instrument"* — and asked me to test it rather than accept it. Tested
against this document; **it does not hold**, and the test found something more specific.

**Round 3's red-domain error**: a class defined by *behaviour* (files that go red when `messageMode`
changes) enumerated by a *symbol-name* predicate. Wrong **kind** of predicate. Note who made it:
that was the plan's and QA's instrument, and I caught it **because** I ran two independent predicates
of my own and wrote down what neither could see — *"neither can see a transcription written as
`const switchToV2 = …` … so the true class may be larger and these two predicates cannot tell me by
how much."* The gap was **visible from inside**, and stating it is what made the finding checkable.

**Round 4 MEDIUM-3's limitation** (the one that reopened at `applyDisposition`): the enumeration was
**complete and correct over the tree it ran against**. There was no third function at `92ce026`. So
it is not a wrong-kind-of-predicate error at all.

**What it actually was, and it is measurable.** MEDIUM-3's section is headed
**"Enumeration + demonstration"** and delivers only the demonstration — `flags = 4` yielding row D.
A demonstration establishes that the defect exists *at a site*; an enumeration establishes the
class's *extent*. Merging the headings let the vivid half stand in for the other. With no predicate
stated, there was nothing to write a blind-spot clause against — and had I written one, the natural
sentence was *"this covers functions existing at `92ce026`; it cannot see a function the fix will
add"*, which is exactly the gap that materialised.

**Measured across this document**: 16 findings carry an explicit "what this predicate does not
match" clause. **MEDIUM-3 is the sole finding that carries none.** One skip in seventeen, with a
recognisable signature.

**Consequence for the retrospective, stated so it is not merged into a vaguer item.** These two need
different remedies and combining them would deliver neither:

- Round 3's remedy is **instrument choice** — a behaviour-defined class needs reference-following,
  not name-matching. That item is stronger standing alone, and QA reproducing it independently is
  what makes it about the instrument rather than about a person.
- Round 5's remedy is **not a new rule**. The blind-spot clause is already mandatory in this role's
  definition (*"the blind spot is a property of the predicate and is knowable at authoring time"*).
  This is a **compliance** miss, not a design gap, and the check is mechanical: no finding ships
  whose Enumeration lacks a "does not match" clause, and "Enumeration + demonstration" is a heading
  to distrust, because it invites exactly this substitution.

I am adopting that check for the remaining rounds of this plan. Steering offered to drop the
hypothesis if it failed; it failed, but the test was worth running and this note is its output.

---

# Standing obligations for the next code-reviewer on plan 013

Written at a generation seam, on the owner's ruling *"Respawn at the next seam, same with
code-reviewer"* (relayed by `steering-hooks-013`, 2026-08-24). **Everything a successor needs is
below or cited from here; nothing in this section depends on remembering a conversation.** Both this
thread and the steering thread respawned at this point, so a successor cannot ask either of us.

## 1. Adversarial execution — the exemption, and a trigger a successor can test

Rounds 4 and 5 scoped out the mandatory "stand the service up and attack it" step for
`gateBeforePersist`, which guards an irreversible action (a persisted overwrite). **The exemption
rests on one fact only: nothing can reach the gate.** It is not a judgement about the code.

**Test the trigger mechanically — do not interpret "M8 wires the gate":**

```
git -C /usr/local/bin/hooks/website grep -c \
  "gateBeforePersist\|applyDisposition\|resolveContentLoss" <sha> -- src \
  | grep -v "src/utils/index.ts" | grep -v "__tests__"
```

**Empty output → the exemption still holds.** **Any hit → the exemption has expired**, and that
round MUST drive the five IS-1 writers against a running instance and assert the negative *on the
persistence surface itself* — no `message.upsert` before a choice — not on a response status. The
five writers are enumerated in QA's IS-1 row: `useApiMethods.saveMessage`, `SaveAsMenu.onSubmit`,
`NewMessageModal.onSubmit`, `m/new/page.tsx`, `f/[id]/page.tsx`.

**The command above was run, and controlled.** At `0c8fad5` it returns **empty**, which is
correct — nothing is wired. Control against a symbol that *does* have consumers
(`hasV2Components`) returns `src/utils/messageMode.ts:2` through the identical pipeline, so the
empty result is a real absence and not a broken predicate. **Blind spot**: it matches these three
names only — it cannot see a consumer that reaches the gate through a re-export under another name,
nor an inline reimplementation that never calls them.

The next unit of work is the shared M2+M8 wiring in `JsonModalBody.tsx`'s Load (plan order corrected
at `d598b54`: **M2 before M8**), so the expiry is expected at that commit.

## 2. My enumeration limitation, recorded as mine

Round 4's MEDIUM-3 named a class — *"a contract that accepts a derived value where the raw value is
available"* — and the fix closed it at `resolveContentLoss`. **The same class reopened in the same
fix round** at the newly added `applyDisposition` (round 5, MEDIUM-1). My enumeration covered
functions that existed at `92ce026`; it could not reach a function the fix would add.

The diagnosis is in the **Method note (round 5)** above: that finding is the **only one of 17** in
this document whose Enumeration carries no "what this predicate does not match" clause, and its
heading — *"Enumeration + demonstration"* — is what let the demonstration stand in for the
enumeration.

**Adopted check, carry it forward**: no finding ships whose Enumeration lacks an explicit
"does not match" clause, and treat *"Enumeration + demonstration"* as a heading to distrust. When a
finding's Required Action will cause **new code to be written in the same module**, state the class
as an invariant the new code inherits — the enumeration cannot cover code that does not exist yet.

## 3. A hypothesis that was tested and withdrawn — do not resurrect it

`steering-hooks-013` proposed that round 3's red-domain error and round 5's enumeration limitation
were the same shape (*"the instrument's basis and the class's definition were not the same thing"*).
**Tested against this document; it failed** — see the Method note. **Steering then withdrew it
explicitly** rather than softening it, and asked that the withdrawal be recorded so neither
successor revives it:

> round 3's was a wrong *kind* of predicate over a behaviour-defined class, and the gap **was**
> visible from inside the instrument … Round 4's MEDIUM-3 enumeration was complete and correct over
> the tree it ran against. "Instrument basis ≠ class definition" does not describe the second one.

The two remain **separate** retrospective items with different remedies: round 3 needs an
instrument-choice fix (reference-following, not name-matching, for a behaviour-defined class) and is
stronger standing alone — QA reproduced it independently, which makes it about the instrument rather
than a person. Round 5 needs **no new rule**; it is a compliance miss against one this role already
states.

## 4. The plan's Status field — do not set it

**This role's definition instructs the reviewer to set the plan's Status to "Code Review Approved"
on a passing review. Do not do that on plan 013.** Steering ruled twice — rounds 2 and 3 — that the
field stays as it is, *for the reviewer's own reasoning*: this plan is being reviewed
**milestone by milestone**, and a plan-level "approved" status asserted from a milestone-level
verdict would be false at the plan level. Five milestones (M2, M3, M4, M6, M8) remain undelivered.

**If the field's absence is raised at you, do not move it — refer it to steering.** Steering lodged
the underlying definition gap in `~/.claude/agents/INBOX.md` (`ee1ae0e`) for retrospective → pi.
This paragraph exists because that ruling lived only in cross-session messages until now.

## 5. Instruments — which are current, and which are paired

Index: **`agent-output/verification/013/README-code-review-instruments.md`** (mine;
`verification/013/README.md` is QA's document and is not mine to edit).

The one thing not to get wrong: **`baseline-expected-six/` and `probe-cr3-mode-predicate/` are a
pair and both are run every round.** The failure-set comparator cannot see a new defect that
reproduces an existing red exactly — live here, since anything leaving the V2 flag set yields
`012-message-mode.test.ts`'s identical `expected 32768 to be +0`. CR3 covers that surface
behaviourally and keys on nothing in the suite output. **Steering is carrying a judgement conditional
on both being run** (that an out-of-phase QA re-anchor was not worth putting to the owner). If the
mode-predicate probe stops being run, that judgement lapses — say so rather than letting it hold.

Also note **`probe-cr4-disposition-gate/` is superseded in part**: the signature changed at
`2f49182`, so its boolean call shape now under-reads (`true & 32768 === 0`). Use CR5.

## 6. Standing procedural facts a successor would otherwise re-derive

- **The suite is not green and will not be** until QA re-anchors `012-message-mode.test.ts` at
  Phase 2. Six failures are expected; establish it is *the same six* with the pinned baseline, never
  by reading a total.
- **Never take suite figures from the working tree.** It is shared and carries other sessions'
  untracked test files, which vitest collects. Measured three times at exactly `+7/+7/+0`
  (`013-qa-phase1-seed-route-probe.test.ts`, `qa-hooks-013`'s). This is a shared-tree property, **not
  an implementer accuracy problem** — steering corrected that attribution to the owner.
- **RTK filtering makes exact-match and positional predicates unsound.** Use `git grep -c`,
  `grep -c`, `git diff --numstat`, `git rev-parse`, or write to a file and read it. A `git log`
  reading of the tip disagreed with `git rev-parse` in this very chain, and `rev-parse` was right.
- **Verdicts do not travel between trees.** Re-verify the SHA at the start *and* end of every pass;
  the tree moved under this reviewer mid-session once already.

---

# Round 6 — the round-5 fix round, at `816d7fd`

**Reviewed-At**: `816d7fd5804fee5d51e526d7d01622624bde108b` (chain branch
`chain/013-components-v2-editing-surfaces`). Verified at the start of the pass and again at the end.

**The tree moved twice during this pass, and the verdict is bound to one commit only.** The round
opened on `52e0e8a` at the implementer's request. Mid-pass the implementer committed `816d7fd`
(a self-caught source-comment correction) and I re-anchored — I did not carry the `52e0e8a` work
across on the strength of a "comment-only" claim; I established emitted-code identity by execution
first (below). Then, while this document was being written, the implementer committed `a3e758b`
(the M2+M8 Load wiring). **`a3e758b` is a different unit of work and this verdict does not reach
it.** What `a3e758b` changes about one of my findings is stated in the finding itself, so the fix
is not misdirected; everything else about it is round 7's, under a materially different obligation —
see "Adversarial execution" below.

**Verdict: APPROVED_WITH_COMMENTS.** Both round-5 MEDIUMs are closed **structurally**, the Preferred
fix in each case, and both closures are established by execution over an exhaustive corpus rather
than by reading the diff. Two new MEDIUMs, both about *enforcement* rather than about behaviour:
the EC-3 contract is checked by no instrument in the repository, and the class round-5 MEDIUM-1
closed is residual at the sibling parameter — where it now fails in the **unsafe** direction, which
its predecessor did not.

## Scope actually assessed

`git diff --numstat 0c8fad5 816d7fd` → two files: `src/utils/index.ts` (+63/−24) and
`src/utils/__tests__/013-m8-ec3-resolver-gate.test.ts` (+56/−64). Both read at `816d7fd` via
`git show`, not from the working tree. The working tree carries one foreign untracked file
(`src/utils/__tests__/013-qa-phase1-seed-route-probe.test.ts`, `qa-hooks-013`'s); it is excluded
from scope and is not mine to touch.

**Sources of truth read.** `agent-output/planning/013-components-v2-editing-surfaces.md` (body);
`agent-output/implementation/013-components-v2-editing-surfaces-implementation.md`; this document's
rounds 4 and 5 and its "Standing obligations" section. **`agent-output/architecture/system-architecture.md`
was checked for and does not exist** — established by `ls agent-output/architecture/` run from
`/usr/local/bin/hooks`, the workspace root, not from inside `website/`. I did not carry a
predecessor's absence claim; I re-ran it. **Consequently this verdict is scoped to what I could
assess**: implementation quality, contract design, and conformance to the plan's D17/D18 rulings.
It makes no claim of architectural grounding, because there is no architecture document to ground it
against.

## Verification re-run — nothing inherited

Every figure below is one I produced at `816d7fd`. None is taken from the implementer's message or
from the implementation document.

| claim | instrument | result |
|---|---|---|
| the project's own spec passes | `npx vitest run src/utils/__tests__/013-m8-ec3-resolver-gate.test.ts` | **32/32** |
| typecheck clean | `npx tsc --noEmit` | **exit 0, 0 errors** |
| failure **set** unchanged | `baseline-expected-six/check-expected-six.sh 816d7fd` | **MATCH** — the expected six by identity and reason; clean totals **475/469/6** |
| the paired behavioural probe (see "the pairing") | `probe-cr3-mode-predicate/` | **122/122** |
| compilation | `next build` in a `cp -al` extraction | **✓ Compiled successfully in 8.9s** (prerender not reached — rig, see Method notes) |
| lint on the changed file | `npx eslint src/utils/index.ts --max-warnings=0` | **1 error, `import/no-cycle`** — round 5's INFO-1, introduced at `2f49182`, not by this round (`git show 2f49182 -- src/utils/index.ts` shows the `~/utils/messageMode` import added there) |

**On the suite figure, the implementer is right and had already corrected themselves.** Their
round-5 message said `482/476/6`; they then self-corrected to `475/469/6`. I reproduce **475/469/6**
at both `52e0e8a` and `816d7fd` from a clean `git archive` extraction. The `+7/+7/+0` delta is the
foreign untracked QA probe that vitest collects in the shared tree — a shared-tree property, **not
an implementer accuracy problem**, and the fourth occurrence of it in this chain. Nothing is asked
of the implementer here; its disposition is QA's, lodged DECISION NEEDED at `2e33fd3`.

**The pairing was run.** `check-expected-six.sh` and `probe-cr3-mode-predicate/` are a pair because
the comparator keys on `file :: test :: first reason line` and therefore cannot see a new defect that
reproduces an existing red exactly — a case that is live in this chain, since anything leaving the V2
flag set yields `012-message-mode.test.ts`'s identical `expected 32768 to be +0`. Both ran; the
judgement `steering-hooks-013` is carrying conditional on that pairing **has not lapsed**.

## Was `816d7fd` decision-neutral? Established by execution, not by the diff's file list

The implementer described `816d7fd` as comment-only. That is a decision-neutrality claim, and
neither their word nor a diff read settles it. I transpiled both files at both commits with the
repository's own `esbuild` and compared the emitted JavaScript byte-for-byte:

```
emit(52e0e8a:src/utils/index.ts)  ==  emit(816d7fd:src/utils/index.ts)             IDENTICAL (13138 B)
emit(52e0e8a:…013-m8-ec3-resolver-gate.test.ts) == emit(816d7fd:…)                 IDENTICAL (11326 B)
POSITIVE CONTROL: emit(816d7fd index.ts) vs emit(index.ts with `dropped` → `dropped.slice()`)
                                                                                   DIFFER at byte 2188
```

The positive control matters and is not decoration — **my first run of this comparison was vacuous
and reported IDENTICAL for all four files because esbuild had rejected the arguments and written
zero bytes**; four empty files compare equal. The control is what caught it. Recorded in full under
Method notes, because it is exactly the failure this role exists to catch and I nearly shipped it.

Emitted-code identity is a stronger basis than a diff read, so the attack results below — produced
against `52e0e8a` — carry to `816d7fd`, and I re-ran every one of them at `816d7fd` anyway.

## Enumerations re-run — the sweep, and the predicate broken

**I re-ran every sweep myself rather than accepting the implementer's counts.** All at `816d7fd`,
with `git grep -c` (which computes before the output filter; see Method notes).

| predicate | implementer reported | I reproduce | what the predicate does **not** match |
|---|---|---|---|
| `applyDisposition(` outside `__tests__` | 0 | **0** | a call reaching it through a re-export under another name; an inline reimplementation naming nothing |
| `dropSet` in `src/` outside `__tests__` | 3, all in `index.ts` | **3** — the interface field, the doc-comment mention *(now removed at `816d7fd`, so 2)*, the one construction site | a hand-built option literal that never uses the key name |
| `ROW_E_OPTIONS` | 0 | **0** | — (symbol deleted; a re-added constant under a different name is invisible) |
| rationale comments in the two changed files | 6 removed | **0 remain** in the changed regions | **see below — this is the predicate I broke** |

**Breaking the comment predicate is what found something.** The shape predicate
(`^\s*//`, `^\s*/\*`, `^\s*\*`) confirms the sweep: zero comment-shaped rationale survives. I then
ran two predicates it cannot see past — trailing same-line comments (**0**) and JSX comments
(**0**) — and one keyed on *keyword rather than shape*:
`git grep -in "round-5\|round 5\|MEDIUM-\|round-4" 816d7fd -- <the two files>` → **0 in `index.ts`,
6 in the spec**, every one of them inside a `describe`/`it` **string**, where a comment-shaped
predicate cannot reach. That is LOW-2 below. The implementer's sweep was correct against the class
as they scoped it; the class is slightly wider than its comment-shaped form.

## Re-attack — the fix to a guard is attacked, not read

`applyDisposition` is a guard and `diffDroppedKeys` is a newly authored instrument, so both trigger
re-attack from first principles. I did not read the fix and agree with it.

**The instrument, named before it was built.** The process whose output is my evidence is the
repository's own `applyModeSwitch`/`switchToClassic`/`switchToV2` — the code under review, executed —
not a model of it. `diffDroppedKeys`' oracle in my probe is written independently of `index.ts`'s
own `diffDroppedKeys`, so CR6-B is a check and not a restatement of the implementation.

**The corpus is exhaustive, not sampled.** The full cross product of
5 flag values × 8 component shapes × 4 content values × 7 embed shapes = **1120 drafts**, including
`[]`, `[{}]`, `[{_key:'a'}]`, whitespace-only content, non-V2 residue flags, Action-Row-only
component lists, and mixed `[container, actionRow]` orderings. 325 land in row E, 795 settled.

`probe-cr6-derivation-round/derivation.cr6.test.ts`, **10/10 at both `52e0e8a` and `816d7fd`**:

| check | result |
|---|---|
| **CR6-A** — D18's core invariant: `gateBeforePersist(d).mustAsk === true` ⟺ `applyDisposition(d)` throws | **1120/1120**. The gate and the applier can no longer disagree about any object in the domain |
| **CR6-A** — no settled draft loses classic content it was carrying | **795/795** |
| **CR6-A** — arity: `applyDisposition.length === 2` (the old signature was 3) | closed |
| **CR6-B** — every row-E option's advertised `dropSet` equals the keys the real serialiser changes, computed by an independent oracle | **325/325 drafts, both options each** |
| **CR6-B mutant control** — the pre-`52e0e8a` hardcoded `['content','embeds']` literal fails that same check | **fails**, as it must; the check discriminates |
| **CR6-D** — purity: the resolver, the gate and the applier mutate none of their inputs (deep-frozen across the corpus) | **1120/1120 unmutated** |
| **CR6-C** — the residual (MEDIUM-2 below) | demonstrated |
| **CR6-E** — key-level granularity bound (INFO-2 below) | demonstrated |

Purity was worth attacking specifically and is worth calling out as clean: `resolveContentLoss` is
declared a **pure** resolver in D17/D18, and this round made it call the serialiser. Had
`switchToClassic` mutated rather than copied, `resolveContentLoss` — and therefore
`gateBeforePersist`, the guard — would have begun mutating its caller's draft as a side effect of
being asked a question. Both switches build new objects (`{...prev}`, `.filter`), so it holds; I
checked it rather than assumed it, over the whole corpus with frozen inputs.

## Dispositions of the round-5 findings

Each records two things: that the class is gone, and the captured check that fails if it returns.

| finding | class gone? | check that fails if it returns |
|---|---|---|
| **MEDIUM-1 (r5)** `draft`/`disposition` untied | **Yes, structurally** — the parameter is removed, not documented around; the disposition is derived internally exactly as `gateBeforePersist` does. Verified by execution over 1120 drafts (CR6-A) | **`no test` — and this is a finding.** See MEDIUM-1 (round 6): re-adding the parameter leaves the suite **32/32 green** and `tsc --noEmit` at **0 errors**. Nothing in the repository fails |
| **MEDIUM-2 (r5)** advertised vs enacted drop | **Yes, structurally** — the label is computed by running the real `applyModeSwitch` and diffing, per the Preferred action verbatim. Verified over all 325 row-E drafts against an independent oracle (CR6-B) | `probe-cr6-derivation-round/derivation.cr6.test.ts` CR6-B, plus the project's own three new spec rows. Mutant control included |
| **INFO-1 (r5)** import cycle | unchanged; still benign, still fragile for the same reason | carried, no action |
| **INFO-2 (r5)** spec header duplicates the plan's row table | **No — still present**, `013-m8-ec3-resolver-gate.test.ts` header docblock. The comment sweep did not reach it (it predates this round) | carried; see INFO-1 (round 6) |
| **INFO-3 (r5)** working-tree suite figure | **Yes** — corrected to `475/469/6`, which I reproduce exactly | `check-expected-six.sh <sha>` |

Both MEDIUMs took the **Preferred (structural)** fix rather than the Minimum. In MEDIUM-1's case
that meant deleting a parameter rather than writing down an invariant about it, which is the
difference between a class that is unrepresentable and a class that is merely discouraged.

## Findings

### MEDIUM-1 (round 6) — the EC-3 contract is enforced by no instrument in this repository, so "unrepresentable" is a claim about callers that do not exist yet

- **Location**: `website/tsconfig.json`, the `exclude` array, against `applyDisposition` /
  `resolveContentLoss` / `gateBeforePersist` in `src/utils/index.ts`.
- **Class**: a type-level contract whose only consumers live under `__tests__` is checked by
  nothing — `tsconfig.json` carries `"exclude": ["node_modules", "**/__tests__"]`, so `tsc` never
  sees those call sites, and vitest transpiles without typechecking. A structural claim about such
  a contract is true of production callers that do not exist and false of every caller that does.
- **Enumeration**: the seven EC-3 exports —
  `resolveContentLoss`, `gateBeforePersist`, `applyDisposition`, `ContentLossOption`,
  `ContentLossDisposition`, `ContentLossRow`, `ContentLossNoticeClass` — via
  `git grep -c <sym> 816d7fd -- src ':!src/utils/__tests__' ':!src/utils/index.ts'`:
  **0 non-test consumers, 7 of 7.** *What the predicate does not match*: a consumer reaching a
  symbol through a re-export under a different name; and a consumer outside `src/` — note that
  `bot/`, `scripts/` and `lang/` **are** in tsconfig's `include`, so a consumer there would be
  typechecked and the predicate would miss that mitigation.
- **Demonstrated, not theorised.** Mutant: re-add `callerDisposition: ContentLossDisposition` as a
  **required** second parameter to `applyDisposition` — precisely the class round-5 MEDIUM-1 closed.
  Result: `npx tsc --noEmit` **exit 0, 0 errors**; `013-m8-ec3-resolver-gate.test.ts` **32/32 green**.
  The regression is invisible to every gate the project runs.
- **Why it matters here specifically**: this is a **dead control being counted**. Round 5's
  disposition table records MEDIUM-1 as closed structurally; a reader takes that to mean something
  would fail if it came back. Nothing would. A dead control is worse than an absent one.
- **Magnitude**: measured on the instruments (0 type errors, 32/32 green under the mutant).
  Production consequence at `816d7fd` is **unmeasured**, because nothing is wired.
- **What `a3e758b` changes, so the fix is not misdirected.** The M8 wiring adds consumers in
  `src/app/message/m/[id]/_components/JsonModalBody.tsx`, which **is** typechecked. Re-running the
  same enumeration at `a3e758b`: `resolveContentLoss`, `applyDisposition` and `ContentLossOption`
  now have typechecked consumers; **`gateBeforePersist`, `ContentLossDisposition`, `ContentLossRow`
  and `ContentLossNoticeClass` still have zero — 4 of 7 remain open.** The class narrows at
  `a3e758b`; it does not close. `gateBeforePersist` in particular — the D18 persist gate itself —
  is still reachable from no production code.
- **Required Action**:
  - **Preferred (structural)**: typecheck the specs — a `tsconfig.test.json` extending the base
    config with `"include": ["src/**/__tests__/**/*.ts"]`, run beside `tsc --noEmit` in the same
    gate. **This is scope growth beyond plan 013 and is not the implementer's to take on their own
    initiative** — routed to `steering-hooks-013-2` per D22, not asked of the implementer here.
  - **A tidy fix here reintroduces the defect the exclusion exists to prevent.** The exclusion was
    added deliberately by `8f28066 exclude __tests__ from tsconfig to fix Vercel build`. Do **not**
    remove `"**/__tests__"` from the base `tsconfig.json`; add a second config. I am naming this
    because deleting the exclusion is the obvious-looking fix and it would break the deploy.
  - **Minimum** (inside this chain, the implementer's): correct the round-5 MEDIUM-1 disposition
    record in the implementation document to `no test`, and name `a3e758b` as the commit where
    enforcement begins for the three wired symbols.

### MEDIUM-2 (round 6) — `chosenOption` still carries a draft-derived label into the applier, and this residual fails in the unsafe direction

- **Location**: `applyDisposition`'s `chosenOption?: ContentLossOption` parameter, `src/utils/index.ts`.
- **Class**: the same class round-5 MEDIUM-1 closed — a parameter carrying a value derived from a
  draft, untied to the draft actually passed — residual at the sibling parameter. `chosenOption.mode`
  is read; `chosenOption.dropSet` is read by nothing, so the label the user was shown and the loss
  actually enacted can differ.
- **Enumeration**: parameters of the three exported EC-3 functions that carry a draft-derived value.
  `resolveContentLoss` — none (raw scalars; closed at round 4). `gateBeforePersist` — none (derives
  internally). `applyDisposition` — `chosenOption`. **1 of 3, open.** *What the predicate does not
  match*: a function M8 adds after `816d7fd`; and a derived value smuggled in as a property of
  `draft` itself rather than as its own parameter.
- **Demonstrated, executed** (CR6-C): draft A `{flags:0, content:'hi', embeds:[], components:[container]}`
  yields a v2 option advertising `dropSet: ['content']`. The user then adds an embed; draft B's own
  v2 option would advertise `['content','embeds']`. `applyDisposition(draftB, optionFromA)` is
  **accepted**, and returns `content: ''`, `embeds: []` — the embed destroyed under a label that
  never named it. Also executed: a deliberately bogus `dropSet: ['nothing','at','all']` produces a
  **byte-identical** result to the honest option, confirming `dropSet` is read by nothing.
- **The direction reversed, and that is why this is not simply a repeat.** Round-5 MEDIUM-2's
  constant label *overstated* the loss — more promised dropped than actually was — so no user was
  under-warned, and that is expressly why it was MEDIUM and not HIGH. This residual path
  **understates** it: the user is warned about `content` and loses an embed. The safe-direction
  argument that held for the predecessor does not hold here.
- **Magnitude**: production consequence **unmeasured** — a hypothesis about M8's callers, since
  nothing was wired at `816d7fd`. What is measured is that the mismatched pair is accepted and
  destroys an embed the label did not name.
- **Required Action**:
  - **Preferred (structural)**: `applyDisposition(draft, chosenMode?: MessageMode)`. A bare mode
    carries no draft-derived label, so nothing stale can travel — the same move that closed
    round-5 MEDIUM-1, applied to the parameter beside it. Callers rendering the notice keep calling
    `resolveContentLoss`/`gateBeforePersist`; nobody hands a derived object back in.
  - **Minimum**: every call site obtains the option and applies it in one expression, never storing
    an option across a state change — the invariant recorded in the implementation document, not in
    a source comment.
- **The invariant the new code inherits** (stated because the enumeration cannot cover code that
  does not exist yet, per this document's own adopted check): *any draft-derived value is valid only
  for the exact draft object it was derived from.* The M8 wiring must satisfy that, and its
  implementation document should say how.

### LOW-1 (round 6) — the test named as MEDIUM-1's regression check discriminates nothing its siblings do not

- **Location**: `013-m8-ec3-resolver-gate.test.ts`,
  `it("MEDIUM-1 (round 5) regression: applyDisposition cannot be handed a mismatched disposition …")`.
- **Class**: a test whose name asserts a property its body does not exercise. Its draft literal is
  byte-identical to the existing `row B/C settled` test's, and nothing mismatched appears anywhere
  in it.
- **Enumeration**: four mutants applied to `applyDisposition`'s two return sites —
  (M1) return `draft` unchanged; (M2) `chosenOption?.mode ?? disposition.mode` on settled rows;
  (M3) always `'classic'`; (M4) drop the row-E guard and default to `'v2'`. For each, the effect on
  the named test and on `row B/C settled` was recorded: **identical in 4 of 4** — both red under M1
  and M3, both green under M2 and M4. **No mutant separates them.** *What this does not match*: four
  hand-chosen mutants at one function's return sites; a mutant elsewhere in the module could in
  principle separate them and I did not search exhaustively.
- Additionally, against the pre-fix tree it goes red as
  `TypeError: Cannot read properties of undefined (reading 'requiresChoice')` — the *pre-existence*
  reason, shared with three sibling tests. That is the same vacuity shape the implementer themselves
  caught and fixed in round 5's bare `.toThrow()`; it has reappeared one test over.
- **Required Action**:
  - **Preferred (structural)**: delete it. The property it names is not runtime-testable at all
    (MEDIUM-1 round 6), and the honest disposition record is `no test` — a duplicate test wearing
    the claim in its name is what makes a dead control look live.
  - **Minimum**: rename it to what it actually checks — *a row-B draft resolves to V2 and preserves
    its components* — and record the disposition's real check as `tsc`, conditional on specs being
    typechecked.

### LOW-2 (round 6) — review-round references survive in test-name strings, where a comment-shaped sweep cannot see them

- **Location**: `013-m8-ec3-resolver-gate.test.ts`, six `describe`/`it` name strings.
- **Class**: a reference to a review document's item **number** carried in a source file without the
  item's **name**. Review numbering is per-round and restarts, so `MEDIUM-2` resolves to a different
  finding in round 4 than in round 5, and neither is recoverable from the source once the round
  closes.
- **Enumeration**: `git grep -in "round-5\|round 5\|MEDIUM-\|round-4" 816d7fd -- src/utils/index.ts
  src/utils/__tests__/013-m8-ec3-resolver-gate.test.ts` → **0 in `index.ts`, 6 in the spec**, all
  inside name strings. *What the predicate does not match*: a reference phrased in prose
  ("the reviewer's second finding"), and — deliberately — stable ruling ids such as `D17`/`D18`,
  which are **not** in this class and should stay.
- **Why LOW and not MEDIUM**: test names are consumed by the runner, so they pass the tool test as
  code, not as comments. And **four of the six already pair the number with the property** — e.g.
  *"(MEDIUM-2, round 5) — an empty embeds array is not a real loss"* — which is self-detecting on
  read and fine as it stands. Only two carry bare numbers:
  `describe('EC-3 — applyDisposition, the application half (MEDIUM-2 round 4 / MEDIUM-1 round 5, D18)')`
  and LOW-1's own test name.
- **Required Action**: **Minimum** — in those two, keep the property description and drop the
  round-numbered reference; keep `D18`. No structural change is warranted, and I am explicitly not
  asking for a sweep of the other four.

### INFO-1 (round 6) — round-5 INFO-2 carried, unchanged

The spec's header docblock still reproduces the plan's D17 row table as prose
(`013-m8-ec3-resolver-gate.test.ts`, the module docblock). It predates this round and the comment
sweep did not reach it. Round 5's recommendation is unchanged and I endorse it: do not delete the
table, make it executable — transcribe it into a `const` the assertions iterate, so drift from the
plan surfaces as a failing test rather than as a stale comment.

### INFO-2 (round 6) — the key-level label cannot describe a partial components loss, and that bound is worth writing down

CR6-E, executed: for `components: [container, actionRow]`, the classic option's `dropSet` is
`['components']`, and `switchToClassic` returns `[actionRow]` — the Action Row **survives**. The
`dropSet` fix makes the label track *which keys* change; it cannot express *which elements within a
key* change, because `dropSet` is a set of key names.

This is **not** a reopening of round-5 MEDIUM-2 and I am not raising it as one: the enacted-versus-
advertised agreement the Preferred action asked for holds exactly, at the granularity `dropSet` has.
It is recorded because the notice M8-E renders from that string will read "components" while some
components survive, and **the notice's wording — not `dropSet` — is where that is solved.** Also
bounded, and executed: a draft whose only components are Action Rows never reaches row E at all
(`resolveContentLoss(0, [actionRow], 'hi', [])` → row **A**, `requiresChoice: false`), so the case
is confined to mixed component lists. QA's M8-E instrument is the right owner.

### INFO-3 (round 6) — an input-robustness question, disposed of at step 1, and why the disposal is conditional

CR5's now-expired assertions surface a tempting finding: `applyDisposition(draft, {mode: null})`
silently applies **classic** rather than throwing, because `applyModeSwitch` treats any non-`'v2'`
value as classic. Applying the disposition order: *can the caller send it?* `ContentLossOption.mode`
is `MessageMode`, a closed union excluding `null`, so the contract says no — **stop, no finding**.
There is no exploit path, so step 3 does not override.

Recorded rather than dropped for one reason: that disposal rests entirely on the type system, and
per MEDIUM-1 (round 6) the type system did not see any caller of this function at `816d7fd`. The
step-1 answer is therefore **conditional on MEDIUM-1 (round 6)**, and becomes unconditional for each
call site as it lands in typechecked `src/`. Worth stating so a later reader does not take the
disposal as unconditional and skip the guard when a caller arrives from parsed JSON.

## TDD Compliance

**Table present**: yes. **All rows complete**: yes. **No exemption claimed** — correctly, since this
round changed behaviour.

**Verified by re-derivation, not accepted.** I reverted `src/utils/index.ts` to `0c8fad5` in an
isolated `git archive` extraction — the shared working tree was not touched — and ran the
`816d7fd` spec against it: **10 failed, 22 passed**. That matches the implementer's claim of 10
exactly. Reasons, which are the load-bearing part:

- **5 × `AssertionError` on `dropSet` values** — the genuinely discriminating half. These are red
  because the old hardcoded label differs from the derived one, which is MEDIUM-2's actual subject.
- **4 × `TypeError: Cannot read properties of undefined (reading 'requiresChoice')`** — the
  pre-existence reason, from the arity change.
- **1 × the throw-match assertion.**

The five `dropSet` assertions are real discriminators. The four `TypeError`s are not — they would go
red for any signature change whatever — and one of them is LOW-1's, which is why LOW-1 is a finding
rather than a note. **The honest summary is that MEDIUM-2's fix is test-gated and MEDIUM-1's is not**,
and the implementation document should say so rather than presenting ten reds as ten discriminators.

## Adversarial execution

**At `816d7fd` the exemption held, and I tested the trigger mechanically rather than interpreting it**,
using the command this document's Standing obligations section pins:

```
git grep -c "gateBeforePersist\|applyDisposition\|resolveContentLoss" 816d7fd -- src \
  | grep -v "src/utils/index.ts" | grep -v "__tests__"
```

→ **empty**. Control through the identical pipeline on a symbol that does have consumers
(`hasV2Components`) → `src/utils/messageMode.ts:2`, so the empty result is a real absence and not a
broken predicate. Nothing can be driven against a running instance that CR6 does not already drive
directly.

**The exemption has now expired.** The same command at `a3e758b` returns
`src/app/message/m/[id]/_components/JsonModalBody.tsx:4`. **Round 7 — the review of `a3e758b` — is
under the mandatory obligation**: stand the service up, drive the five IS-1 writers
(`useApiMethods.saveMessage`, `SaveAsMenu.onSubmit`, `NewMessageModal.onSubmit`, `m/new/page.tsx`,
`f/[id]/page.tsx`) from a raw socket rather than a client library, and assert the negative **on the
persistence surface itself** — no `message.upsert` before a choice — never on a response status. Note
for that round: at `a3e758b`, `gateBeforePersist` still has **zero** production consumers, so
"every application site routes through `applyDisposition`" and "the persist gate is wired" are two
different claims and only the first has been made.

## Positive observations

- **Both fixes took the Preferred structural option, not the Minimum.** MEDIUM-1 was closed by
  *deleting a parameter* rather than by documenting an invariant about it. That is the difference
  between a class that cannot be expressed and one that is merely discouraged, and it is the harder
  of the two to choose when the Minimum is sitting right there.
- **`diffDroppedKeys` derives the label by running the real serialiser.** The tempting fix for
  round-5 MEDIUM-2 was to correct the string. Deriving it from execution means the label cannot drift
  from `switchToClassic`/`switchToV2` again, including through future changes to either — and the
  two new spec rows (the partial-components case and the empty-embeds case) are exactly the two cases
  that distinguish a derived label from a corrected one.
- **`ROW_E_OPTIONS` was deleted, not emptied.** The module-scope constant is gone rather than left
  behind holding a better value — which also removes a module-evaluation-time object from a module
  that participates in an import cycle, making the cycle strictly less fragile than round 5 found it.
- **Two self-catches, both unprompted and both correct.** The source-comment reintroduction and the
  working-tree suite figure were caught and corrected by the implementer before I raised either. I
  had the comment finding written when their correction arrived; it is theirs, not mine, and the
  record should show that. The comment sweep they ran was also correct against its own predicate —
  what I found by breaking it (LOW-2) is a wider class, not a missed member of theirs.
- **Purity was preserved through a change that easily could have broken it.** Making a resolver
  declared pure call the serialiser is exactly where a mutating switch would have leaked side effects
  into a guard. It holds across 1120 frozen drafts.

## Assumption Not Checked

**This review assumes that the object M8's wiring hands `applyDisposition` is a single coherent
draft — one object whose `flags`, `components`, `content` and `embeds` are all current with respect
to each other — and does not test it.** Every CR6 assertion builds that object as one literal. The
composer does not hold it that way: `DiscordMessageEditor/index.tsx` keeps `content`, `embeds` and
`components` as three separate `useStateSetter` slices over `message`, and **`flags` is not among
them** — `git grep -c flags 816d7fd -- src/components/DiscordMessageEditor/index.tsx` returns
**nothing**, so wherever the flag comes from at the call site, it is not that component's state.

**Falsity signature**: a call site reassembles the four fields from separate sources and reads a
`flags` value stale with respect to the components slice — so `resolveContentLoss` sees flag-clear
plus V2 components (**row B**, settled) where the live editor state is **row E**. `applyDisposition`
then applies V2 and clears the body **with no choice presented**: precisely the behaviour D18
forbids, and the 5712 shape D19 exists to abolish, reintroduced by the reassembly at the call site
rather than by any defect in the function. Note this is *not* reachable through `applyDisposition`'s
own contract — it is reachable only by constructing its argument from more than one snapshot, which
is why no amount of testing the function closes it.

**Owner**: the **implementer**, at the M2+M8 Load wiring — which is `a3e758b`, already committed, so
this is live rather than prospective. The wiring's implementation document must name the actual
object handed to `applyDisposition` and where its `flags` value comes from. QA's IS-1
no-upsert-before-choice instrument is the backstop. Routed again in Next Steps.

*(One assumption I did **not** need to carry: whether `hasClassicContent` classifies the composer's
real default embed as I assumed. I checked instead of assuming — the add-embed handler is
`setEmbeds([...embeds, {} as EditableEmbed])`, a bare `{}`, and `[{}]` is in the corpus and correctly
reports no classic content. Closed, not declared.)*

## Verdict

**Status: APPROVED_WITH_COMMENTS**, bound to **`816d7fd`** and to no other tree.

**Rationale.** Both round-5 MEDIUMs are closed structurally and both closures are established by
execution over an exhaustive 1120-draft corpus with an independent oracle and a mutant control — not
by reading the diff, and not by accepting the implementer's counts, every one of which I reproduced
myself. The behaviour delivered is correct across the whole input domain I could construct, the
resolver's declared purity survives a change that put it at risk, and the round took the harder
structural fix in both cases.

The two new MEDIUMs are about **enforcement, not behaviour**, which is why they do not reject.
Neither describes a defect a user can reach at `816d7fd`: nothing was wired. MEDIUM-1 says the
record overstates what protects the fix; MEDIUM-2 says the class closed at one parameter is residual
at the one beside it. Both are cheaper to fix before the wiring hardens than after — and the wiring
has now landed, which raises their priority without changing their severity.

**Neither reaches HIGH.** MEDIUM-2's failure mode requires a caller to hold an option across a
state change, and no such caller existed on the reviewed tree; its magnitude as a production
consequence is explicitly unmeasured. MEDIUM-1 is a documentation-integrity defect about a control,
not a control failure.

**Three MEDIUMs across rounds 5 and 6 in one file is close to the "pattern of MEDIUM findings"
rejection threshold, and I considered it.** I am not rejecting, for a reason I want on the record:
each round's MEDIUMs have been *found by the previous round's fix being correct enough to expose the
next layer*, and each has been fixed structurally on first ask. That is a converging process, not an
accumulating one. If a fix round were to introduce a MEDIUM in a layer already reviewed, that
reasoning would not hold and I would reject.

**I am not setting the plan's `Status` field.** My definition instructs it on a passing review; I am
declining for the same reason my predecessor did, and having read their reasoning I independently
agree with it rather than deferring to it: this plan is being reviewed milestone by milestone, five
of its eight milestones are undelivered, and writing "Code Review Approved" at the plan level would
publish a false claim about work that does not exist. A milestone-level verdict cannot carry a
plan-level status. The definition gap is already lodged for retrospective → pi at `ee1ae0e`; if the
field's absence is raised at me I will refer it to steering rather than move it.

## Required Actions

**To `implementer-hooks-013-2`** (none of these block; all are cheaper before the wiring hardens):

1. **MEDIUM-2 (round 6)** — `applyDisposition(draft, chosenMode?: MessageMode)`. Preferred/structural.
   The same move that closed round-5 MEDIUM-1, applied to the parameter beside it. **Do this before
   more call sites accumulate**, since `a3e758b` has already added two.
2. **MEDIUM-1 (round 6), Minimum only** — correct the round-5 MEDIUM-1 disposition record to
   `no test`, and name `a3e758b` as where enforcement begins for the three now-wired symbols. The
   structural half is not yours (see below).
3. **LOW-1** — delete or rename the MEDIUM-1 regression test. Preferred: delete.
4. **LOW-2** — drop the bare round-numbers from the two `describe`/`it` names that carry no property
   with them. Keep `D18`. Leave the other four alone.
5. **Carry the Assumption Not Checked into the `a3e758b` implementation document**: name the actual
   object handed to `applyDisposition` and where its `flags` comes from.

**To `steering-hooks-013-2`** (routed per D22 as scope growth, not asked of the implementer):

6. **MEDIUM-1 (round 6), Preferred/structural** — a `tsconfig.test.json` so spec files are
   typechecked. This is outside plan 013's milestones and needs the owner's word. **Carry the
   warning with it**: the base `tsconfig.json` exclusion exists because of
   `8f28066 exclude __tests__ from tsconfig to fix Vercel build`, so the fix adds a second config
   and must not delete the exclusion from the first.

**To `qa-hooks-013`**:

7. Round-5's item stands: M8-E's notice instrument asserts against the **applied result**, not
   against the option constants. Add: per INFO-2 (round 6), the notice **wording** is where partial
   components loss is solved — `dropSet` cannot express it, and asserting the notice says
   "components" is not the same as asserting it is true.

## Captured Instruments (round 6)

New, at `agent-output/verification/013/probe-cr6-derivation-round/`:

| file | what it establishes |
|---|---|
| `derivation.cr6.test.ts` | CR6-A/B/C/D/E — the 1120-draft exhaustive corpus, the D18 gate/applier invariant, the advertised-vs-enacted agreement against an independent oracle, the mutant control, the purity check, the residual demonstration, and the granularity bound |
| `vitest.cr6.config.ts` | its config |
| `run-cr6-52e0e8a.txt`, `run-cr6-816d7fd.txt` | captured runs at both trees, 10/10 each |

**Superseded**: `probe-cr5-application-half/`'s CR5-B, CR5-C and CR5-D now fail (3 of 19) — **all
three by instrument expiry, none by defect.** They were built for the three-parameter signature and
the constant `dropSet`, both of which this round removed; their failure *is* the fix working. CR5-A
and the two cycle probes remain valid and pass. Recorded in the instruments README. An instrument's
validity is indexed to the claim it was built for, and these two claims are gone.

**Neither of the two round-6 MEDIUMs gets a captured check from me, deliberately.** MEDIUM-1's
subject is that no runtime check *can* exist for it — writing one would be the dead control the
finding is about. MEDIUM-2's fix belongs in the project's own suite, where a framework already
reaches this code: authoring it is not mine. Both are `no test` from me, explicitly, and the
instrument's location is handed to the implementer with the finding.

## Next Steps

1. **`implementer-hooks-013-2`** — Required Actions 1–5. MEDIUM-2 (round 6) first and before further
   wiring.
2. **`steering-hooks-013-2`** — Required Action 6 (scope growth, owner's word needed). Also: your
   pairing condition **has not lapsed** — both `check-expected-six.sh` and `probe-cr3-mode-predicate/`
   were run this round, 122/122 on the latter.
3. **`qa-hooks-013`** — Required Action 7.
4. **Round 7 = `a3e758b`, under the adversarial-execution obligation.** The exemption expired at
   that commit, tested mechanically, not interpreted. That round stands the service up and asserts
   the negative on the persistence surface. It also re-reads this round's declined and deferred
   findings first, per the standing rule.

**QA is not the next stage.** M3, M4 and M6 remain, and M8-G is not delivered.

**Rounds 1–5's verdicts are unaffected.** Each stands on its own tree.

## Method notes (round 6)

### A vacuous comparison I nearly shipped, and the control that caught it

Establishing that `816d7fd` was decision-neutral meant comparing emitted JavaScript at two commits.
My first run reported:

```
IDENTICAL   (index.ts)
IDENTICAL   (013-m8-ec3-resolver-gate.test.ts)
```

Both were false. `esbuild` had rejected its arguments (`"loader" without extension only applies when
reading from stdin`), written **zero bytes** to all four output files, and `cmp` had dutifully
reported four empty files as pairwise identical. The sha256 of every output was
`e3b0c44298fc…` — the hash of the empty string, which is what made it visible.

**The comparison could not have failed.** Any pair of inputs would have produced IDENTICAL, including
two files that differ completely. It is precisely the "Checks That Cannot Fail" defect this role
raises against others, arising in my own instrument, in the same pass in which I raised LOW-1 for a
version of it.

What caught it was adding a **positive control**: emit a copy of the file with one token changed
(`return dropped;` → `return dropped.slice();`) and require the comparator to report DIFFER. It did,
at byte 2188 — and only then does IDENTICAL on the real pair mean anything. The general form, which
is worth more than this instance: **an equality check between two derived artifacts must be shown to
be capable of reporting inequality, on that run, on those artifacts.** A control is not the same as
a mutant test of the code; it is a test of the comparator.

### Three rig failures, recorded so they are not rediscovered

These join the two already recorded in `probe-cr4-disposition-gate/gates/README.md`. All three
produce a red or absent result that has nothing to do with the code under review.

1. **A probe directory's `node_modules` can silently degenerate from a symlink into a real
   directory.** `probe-cr3-mode-predicate/node_modules` had become a real directory containing only a
   `.vite` cache, so `npx` could not resolve the workspace vitest, fetched **vitest 4.1.11 from the
   network**, and failed at config load with `Error: Cannot find module 'vitest/config'` and exit 1.
   That reads exactly like "the CR3 probe fails at this tree" — which, given the pairing this probe
   is half of, would have been a consequential misreading. **A further trap**: `ln -sfn <target>
   node_modules` does **not** repair it — when `node_modules` is an existing directory, `ln` creates
   the link *inside* it. The fix is `rm -rf node_modules && ln -sfn <target> node_modules`. Verify
   with `ls node_modules/vitest` before trusting a run.
2. **`eslint` cannot run from a `git archive` extraction with a symlinked `node_modules`.** It exits
   2 with `ESLint couldn't determine the plugin "react" uniquely`, seeing two `eslint-plugin-react`
   versions through the pnpm store. Lint provenance questions are better answered from the real tree
   plus `git show`, not from an extraction.
3. **`next build` in an extraction needs more dummy env than the CR4 README lists.** Beyond that
   list: `PREVIEW_IMAGE_API_KEY`, `PREVIEW_IMAGE_URL`, `NEXT_PUBLIC_PUSHER_KEY`,
   `NEXT_PUBLIC_PUSHER_CLUSTER`, `PUSHER_APP_ID`, `PUSHER_SECRET`, `ENCRYPTION_IV`,
   `HOOKS_API_TOKEN`. Compilation completes before env validation runs, so
   `✓ Compiled successfully` is obtainable — and is the part that carries typecheck and bundling —
   even when prerendering then fails on `Invalid environment variables`. **This round reached
   compilation and not prerender**, and says so rather than claiming a clean build.

### On `git grep -c` versus the output filter

Every count in this round used `git grep -c`, `grep -c` or `git diff --numstat`, all of which compute
before the output filter. This is not caution for its own sake: an exact-match or positional
predicate over filtered output is unsound rather than merely inaccurate, and reproduces stably, so
re-running it looks like confirmation. Where a claim rested on a count, a contradicting counter was
what would have caught it — never a second run of the same filtered form.

---

# Round 7 — the M2+M8 Load wiring and the round-6 fix round, at `87cfbd8`

**Reviewed-At**: `87cfbd84943eb598d59f7276287ac661a98b1c4f` (chain branch
`chain/013-components-v2-editing-surfaces`). Verified at the start of the pass and again at the end.
All files read via `git show 87cfbd8:<path>`, never from the working tree.

**Scope is wider than the fix round.** The implementer asked for a re-review of `87cfbd8`, but
`87cfbd8` sits on `a3e758b` — the M2+M8 Load wiring, which **no round has reviewed**. Round 7 therefore
covers `816d7fd..87cfbd8` in full: `JsonModalBody.tsx` (+77/−10), `index.ts` (+31/−4), and two spec
files. Reviewing only the 1-line fix-round delta would have passed the wiring through unexamined.

**Verdict: APPROVED_WITH_COMMENTS** for the plan-013 work at `87cfbd8`.

**Separately, and not part of that verdict: one CRITICAL finding outside this chain, escalated
immediately.** It was found by following this role's own instruction to enumerate what the entry
point branches on at module scope *before* attacking, and it is pre-existing — `src/middleware.ts`
is untouched by chain 013. It does not change the 013 verdict and 013 does not depend on it. It is
stated first because of its severity, not because of its relevance to the milestone.

## CRITICAL-1 (round 7) — an authorization guard that cannot fire, in front of two unauthenticated data endpoints

**NOT A PLAN-013 FINDING.** Pre-existing, outside this chain's diff, and outside its scope.
Escalated per this role's IMMEDIATE tier (security vulnerability, <1h) and routed to steering
under D22 as needing the owner's word.

- **Location**: `src/middleware.ts` — the `config.matcher` array and the
  `url.pathname.startsWith('/api/v1/*')` branch — guarding
  `src/pages/api/v1/guilds/[guildId]/messages.ts` and
  `src/pages/api/v1/guilds/[guildId]/messages/[id].ts`.
- **Class**: an authorization guard whose predicate cannot match the paths it exists to protect,
  in front of handlers that perform no authorization of their own.
- **Two independent reasons the guard is dead**, either of which alone would disable it:
  1. `config.matcher = ['/message/(.*)', '/api/guilds/(.*)', '/preview']`. The route is
     `/api/v1/guilds/…`, not `/api/guilds/…`, so **the middleware never executes for it**.
  2. `url.pathname.startsWith('/api/v1/*')` tests for a **literal asterisk** in the path. No real
     request URL contains one, so the `Bearer ${STATBOT_API_KEY}` comparison is unreachable even
     when the middleware does run.
- **Enumeration**: `git ls-tree -r --name-only 87cfbd8 | grep "pages/api/v1"` → **2 handlers**;
  `git grep -n "auth\|session\|Bearer\|STATBOT\|token"` inside each → **0 hits in both**. **2 of 2
  carry no authorization of their own.** *What the predicate does not match*: protection applied by
  a wrapper the handler is exported through (there is none — both are
  `export default async function handler` directly), and any edge, CDN or platform rule living
  outside this repository.
- **Demonstrated by execution against a running instance**, raw socket, no client library:

  | request | response |
  |---|---|
  | `GET /api/v1/guilds/123456789012345678/messages`, no auth header | **500** |
  | same, `Authorization: Bearer wrong` | **500** |
  | same, `Authorization: Bearer ` (empty) | **500** |
  | `GET /api/v1/guilds/123456789012345678/messages/1`, no auth | **500** |
  | `POST` same path (control) | **405** — from the handler's own `req.method !== 'GET'` check |

  **The oracle was fixed before the attack**: the instance ran with `DATABASE_URL` pointed at a dead
  local port, so *the handler executing* manifests as a 500 from its own `catch`, while *the guard
  firing* would have produced the middleware's rewrite instead. The 500s and the handler-authored
  405 both prove the handler ran. **The guard did not fire.**
- **What the endpoint returns when a database is present**: every message row for the supplied guild
  — `id`, `name`, the full `data` object, and `valid`. Discord guild IDs are not secrets.
- **Magnitude**: unauthenticated read of all stored messages per guild id, on a local instance built
  from `87cfbd8`. **Explicitly unmeasured**: whether an edge or platform layer in front of the
  deployed application blocks `/api/v1/*`. I did not test any deployed environment and did not try;
  the hosted database this repository is configured against is not mine to touch.
- **Required Action**:
  - **Preferred (structural)**: authenticate **in the handlers**, not in path-matching middleware —
    a shared `requireStatbotAuth(req)` as the first statement of each, so a newly added v1 route
    cannot be unprotected by omission. Path-pattern authorization fails open on every route someone
    forgets to list; handler-side authorization fails closed.
  - **Minimum**: fix **both** the matcher and the predicate.
  - **A partial fix here looks correct and changes nothing.** The two defects mask each other:
    repairing `startsWith('/api/v1/*')` alone leaves the matcher excluding the route, and repairing
    the matcher alone leaves the predicate unmatchable. Whoever fixes this must verify by execution
    that an unauthenticated request is actually refused, not that the code now reads correctly.
- **Not mine to communicate.** I have not contacted anyone and will not. This is stated here and
  reported to the repository owner through my own session and to `steering-hooks-013-2`.

---

## Plan 013 at `87cfbd8` — the rest of round 7

### Adversarial execution — the obligation, discharged and bounded

The exemption expired at `a3e758b`. **I did not read the wiring and agree with it; I stood the
service up and attacked it.**

**Before standing it up I enumerated what the entry point branches on at module scope** and checked
each condition's live value in this box. That step is what produced CRITICAL-1 — `middleware.ts`
reads `STATBOT_API_KEY` at module scope and branches on it, and the branch is dead. A live-capable
branch discovered by accident would have been a hazard; this one was discovered on purpose.

**What I ran it against, and the safety constraint that shaped it.** `.env.local` configures this
repository against a **remote hosted database** (`viaduct.proxy.rlwy.net`). Driving mutations into
that is not review, so the instance ran from an isolated `git archive` extraction with an entirely
dummy environment and `DATABASE_URL` pointed at a dead local port — every persistence attempt fails
closed and is observable. **There is no `schema.prisma` anywhere in this repository**, so a
database-backed instance cannot be built from it at all; that bounds what any adversarial round here
can reach, and it is a fact about the repository rather than a choice of mine.

**Oracle, fixed before the attack**: auth *held* for an input iff the response says `UNAUTHORIZED`
and nothing shows the resolver ran; auth was *bypassed* iff anything showed the resolver executing —
a database reach attempt (`ECONNREFUSED`, `P1001`), or a success payload. I asserted the negative on
both the response and the server log, not on a status code alone.

**Input class enumerated, not sampled** — 42 cases driven from a raw socket, so nothing
percent-encoded, canonicalised or repaired my bytes on the way in:

| dimension | cases |
|---|---|
| methods | POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD, TRACE, and an invented `FOO` |
| path forms | batch and non-batch, `%2E`-encoded dot, three casings, trailing `/`, trailing `.`, `%00`, `%20`, doubled slashes, `/./`, two `..` traversals, `%61pi`, and both orderings of a two-procedure batch |
| content types | `application/json`, with charset, uppercased, `text/plain`, form-encoded, and absent |
| headers | duplicate and conflicting `Content-Type`, forged `Authorization`, forged `X-Forwarded-For`/`-Host`/`X-Real-IP`, forged `next-auth` and `__Secure-next-auth` session cookies, forged `Host` |

**Result: 0 bypasses in 42.** Twelve reached the procedure and were refused `UNAUTHORIZED`; the rest
were refused earlier (404/405/415/400/308). `protectedProcedure`'s `enforceUserIsAuthed` holds
across the whole class, including against forged session cookies and every path-normalisation trick
I could drive. **That is a negative result and it is worth having**: it is the part of D18's
persistence story that is actually sound, and it was established by execution rather than assumed.

**What this could not reach, stated rather than glossed**: the five IS-1 writers are client-side
React call sites, and the plan's own assumption 5 records that no component or browser harness
exists here. My predecessor's standing note directed the expiring round to "drive the five IS-1
writers"; that instruction was written expecting the wiring to be the *persist* path. The wiring
that actually landed is the **Load** path, which does not persist. I drove the persistence boundary
those writers all funnel into (`message.upsert`) instead, and say so rather than claiming their
coverage.

### Verification re-run — nothing inherited

| claim | instrument | result |
|---|---|---|
| the EC-3 spec passes | `vitest run 013-m8-ec3-resolver-gate.test.ts` | **32/32** |
| typecheck | `npx tsc --noEmit` | **exit 0, 0 errors** |
| failure **set** unchanged | `check-expected-six.sh 87cfbd8` | **MATCH**; clean totals **482/476/6** |
| the paired behavioural probe | `probe-cr3-mode-predicate/` | **122/122** |
| round-5's closures still hold | `probe-cr6-derivation-round/` | **8/10** — the 2 failures are CR6-C, **instrument expiry, not defect** (below) |
| new this round | `probe-cr7-wiring-and-boundary/` | **17/17** |

**The suite figure is right again.** The implementer reported working-tree `489/483/6` and true
`482/476/6`; I reproduce **482/476/6** from a clean extraction. Third consecutive round in which
their corrected figure is exactly right. The `+7` remains the foreign untracked QA probe.

**The pairing was run**, so the judgement `steering-hooks-013-2` is carrying conditional on it has
not lapsed.

### Enumerations re-run — the sweep, not the flagged sites

All at `87cfbd8`, by me, with `git grep -c`:

| predicate | implementer reported | I reproduce |
|---|---|---|
| `applyDisposition(` outside `__tests__` | 2, both in `JsonModalBody.tsx` | **2, both there** |
| `chosenOption` anywhere in `src` | none threaded into `applyDisposition` | **3, all in `JsonModalBody.tsx`**, all local to `commitChoice`, none crossing the boundary |
| `ContentLossOption` outside `__tests__` | 5, type-only or display-labelling | **2 files** (`JsonModalBody.tsx`, `index.ts`), none passed to `applyDisposition` |
| `gateBeforePersist` callers | 1 hit = the declaration, **0 callers** | **confirmed** — the one hit is `index.ts:183`, the declaration |
| `enforceImportMutualExclusivity` remaining | still live at the paste surface | **confirmed** — `NewMessageJsonInput.tsx:61` |

The implementer **self-corrected a grep error while writing their own handoff** — that
`gateBeforePersist(` matches its own declaration — and reported the corrected count. I reproduce
their corrected number, not their first one.

### Dispositions of the round-6 findings

| finding | class gone? | check that fails if it returns |
|---|---|---|
| **MEDIUM-2 (r6)** `chosenOption` carries a stale label | **Yes, structurally** — the parameter is now `chosenMode?: MessageMode`; no label crosses the boundary at all. CR6-C, the probe that demonstrated the defect, **can no longer be expressed** | CR7-C, and the project's own new regression row. Type-level: `tsc` at `JsonModalBody.tsx`'s typechecked call site |
| **MEDIUM-1 (r6)** Minimum — the record | **Yes** — the implementation doc now carries a correction paragraph stating plainly that *no test* enforced the round-5 closure before `a3e758b`, and naming where enforcement begins. I read it; it is accurate and does not overstate | the correction is the deliverable |
| **MEDIUM-1 (r6)** Preferred — `tsconfig.test.json` | **Not done, correctly** — routed to steering as scope growth. The implementer declined it on exactly that basis rather than taking it on their own initiative | still open, with steering |
| **LOW-1 (r6)** the vacuous regression test | **Deleted.** But its class recurred in the replacement — see LOW-1 (round 7) | — |
| **LOW-2 (r6)** bare round numbers | **Yes** — `(MEDIUM-2 round 4 / MEDIUM-1 round 5, D18)` → `(D18)`. The four already-paired references were left alone, as asked | — |
| **Assumption Not Checked (r6)** | **Carried, explicitly not closed**, with the falsity signature and the obligation on the future wiring named in Outstanding Items | carried again below |

**CR6-C's two failures are the fix working.** Round 6's probe demonstrated the stale-label replay;
that class is now unrepresentable, so the tests that expressed it cannot run. Instrument expiry, not
regression — CR6-A, B, D and E all still pass, so round 5's closures also still hold.

### TDD Compliance

**Table present, rows complete, no exemption claimed.** Re-derived rather than accepted: reverting
`index.ts` to `a3e758b` against the `87cfbd8` spec gives **3 failed / 29 passed**, matching the
implementer's claim exactly. The reasons are the discriminating ones, which is the part that matters:

- `expected 'hi' to be ''` — a mode **string** read as `.mode` yields `undefined`, so both row-E
  applications fell through to `switchToClassic` regardless of the mode requested.
- `expected [Function] to throw error matching /chosenMode/ but got '…chosenOption is r…'`.
- `expected [ { title: 'x' } ] to deeply equal []` — the new regression row.

**No pre-existence `TypeError`s this time.** Round 6's red set was 5 discriminators to 4
arity-artifacts; this one is 3 for 3. That is a real improvement in the gate's quality and not just
in its count.

### Findings

#### MEDIUM-1 (round 7) — D18/D19 is enforced in one client component and nowhere else; the persist API accepts the shape it exists to abolish

- **Location**: `messageShape` / `discordMessageShape` in `src/server/api/utils/shapes.ts`, against
  `message.upsert` in `src/server/api/routers/message.ts`.
- **Class**: a data-integrity invariant enforced only on one client path, while the persistence API
  accepts violations of it from every caller.
- **Enumeration**: refinements reachable from the persist input shape —
  `optionalIdMessageShape` → `messageShape` → `discordMessageShape` →
  `discordMessageBaseShape.superRefine(refineDisplayableText)`. **One refinement, and it checks
  displayable-text size only: 0 of 1 concerns V2/classic exclusivity.** Separately, the five IS-1
  writers: **0 of 5 gated.** *What the predicate does not match*: a check inside `upsertMessage`'s
  own body (I read `shared.ts:234` — there is none) and a database-level constraint, which I
  **cannot cover at all** because no schema lives in this repository; that population is uncovered
  and its fallback is whoever owns `project-utils`.
- **Demonstrated by execution** (CR7-A): six 5712-shaped payloads — flag+content, flag+embed,
  flag+content+container, flag+embed+container, all three together, and residue-flag `4|BIT`+content
  — are **all accepted** by `messageShape.safeParse`. **Negative control**: the same validator does
  reject an empty name and a negative `flags`, so acceptance is a real signal rather than a validator
  that passes everything.
- **Why it matters**: D19 exists to abolish the 5712 shape. At `87cfbd8` the only thing preventing
  it is `JsonModalBody`'s Load path. Gating the five writers at M8-G will make the *clients* well
  behaved; it will not make the invariant true, because the API still accepts violations.
- **Magnitude**: measured at the validator (6 of 6 accepted, control rejects). Production
  consequence unmeasured — I did not and will not drive the hosted database.
- **Severity MEDIUM, not HIGH**: M8-G is scheduled and the gap is already a named Outstanding Item.
  What is new here is the *measurement* — that client-side gating is not sufficient — not the
  existence of ungated writers.
- **Required Action**:
  - **Preferred (structural)**: a `superRefine` on the persist shape rejecting *flag set together
    with classic content*, so the invariant holds at a boundary no client can bypass.
  - **Minimum**: deliver M8-G as planned, and record in the plan that the client gate is a
    convenience, not a boundary.
- **Routed to `steering-hooks-013-2`, not settled here.** This is D22's first never-settle class: it
  implies the plan's own model of where D18/D19 is enforced is incomplete. It is not for the
  implementer and me to decide.

#### LOW-1 (round 7) — the replacement regression test again does not discriminate; second instance of the class

- **Location**: `013-m8-ec3-resolver-gate.test.ts`, `it('MEDIUM-2 (round 6) regression: …')`.
- **Class**: a test whose name asserts a property its body does not isolate — it is dominated by an
  existing sibling, so no defect can fail it without failing that sibling first.
- **Enumeration**: four mutants, each recorded against the new test **and** its nearest sibling
  (`row E with the v2 mode chosen`): (M1) `switchToV2` stops clearing `embeds`; (M2) stops clearing
  `content`; (M3) row E ignores `chosenMode` and always applies classic; (M4) `switchToV2` *injects*
  a stray embed — designed specifically so only the new test's unique draft could catch it.
  **Identical in 4 of 4.** *What this does not match*: four hand-chosen mutants at two functions; I
  did not search exhaustively.
- **And here no mutant can separate them**, which is the sharper statement: the new test's first
  draft is the sibling's draft with `embeds` already empty, and its assertions are a strict subset
  of the sibling's. A strictly weaker input with strictly weaker assertions cannot fail where the
  sibling passes, unless a defect keys on the input difference — and "clears embeds only when
  non-empty" passes both.
- **This is the second instance**, after round 6's LOW-1. The fix for the first produced the second,
  which makes it a habit rather than a slip and is why it is worth a rule rather than another
  point fix.
- **Required Action**:
  - **Preferred (structural)** — adopt the rule, not the edit: **a test named as a regression check
    ships with the mutant that separates it from its nearest sibling. If no such mutant exists, the
    honest record is `no test` plus the naming of what does enforce the property** — here, `tsc` at
    `JsonModalBody.tsx`'s call site, which the implementation doc already states correctly.
  - **Minimum**: rename it to what it checks, or delete it and rely on the correction paragraph.

#### INFO-1 (round 7) — one silent strip was retired; another still sits in front of the gate

`a3e758b`'s stated purpose was retiring the pre-Zod silent strip
(`enforceImportMutualExclusivity`) from Load, and it did. But `discordMessageImportShape` runs
`filterSupportedComponents` as a `z.preprocess`, **before** `resolveContentLoss` ever sees the
object. Executed (CR7-B): pasting `{content:'hi', components:[{type:3, …}]}` yields
`components: []`, and the resolver then reports **row A, `requiresChoice: false`,
`noticeClass: 'none'`** — the user's select is gone with no notice and no choice. Same for a
container whose children are all unsupported: the whole container is dropped and the draft looks
loss-free.

Not a regression and not this round's doing — it is pre-existing behaviour of the import shape. It
is named because the round's own framing was "retire the silent strip", and one remains, upstream of
the gate, where the gate cannot see what it removed. The right owner is the plan: D18 asks that the
save path stop silently destroying user content, and this is a second, narrower instance of exactly
that on the same surface.

#### INFO-2 (round 7) — a guard hole disposed of at step 1, with the same conditional as round 6

Executed (CR7-C): `applyDisposition(rowEDraft, 'V2')` — wrong case — is **not** rejected. It is
truthy, so the guard passes, and `applyModeSwitch` treats anything that is not exactly `'v2'` as
classic, so the draft's components are dropped instead of its content. Every *falsy* non-mode value
(`undefined`, `null`, `''`, `0`, `false`, `NaN`) does throw `/chosenMode/`, verified across all six.

Applying the disposition order: **can the caller send it?** `chosenMode?: MessageMode` is a closed
union, and the sole call site is now in typechecked production code — so **no, and there is no
finding**. Recorded anyway because the underlying default is the unsafe direction (`applyModeSwitch`
silently falls to classic rather than refusing an unknown mode), and because the step-1 answer
depends on the call site staying typechecked — which is exactly what MEDIUM-1 (round 6) showed is
not automatic here.

### Positive observations

- **The wiring gets the hard part right, and I checked it rather than assuming.** For row E,
  `commitSettled` calls `setPendingChoice` and returns **without** calling `updateMessage` — so
  nothing reaches the persistence-adjacent surfaces at all. That matters more than it looks:
  `MessageProvider` carries `useEffect(… , [message])` writing every message change into
  `localMessageStore`, and `getMessage` lets a newer local record **win over the server's** on the
  next load. Had row E updated state before the choice, a discarded draft would have survived a
  reload and beaten the saved message. It does not. I traced that surface specifically because a
  response status would never have shown it.
- **`describeDropSet` resolves round 6's INFO-2 rather than inheriting it.** I flagged that
  `dropSet` is key-granular and cannot express a partial components loss. The wiring solves it in
  the *wording*: `components` maps to "your Components V2 components", so for
  `[container, actionRow]` the notice reads "This will drop your Components V2 components" and the
  Action Row genuinely survives. Executed (CR7-D): the notice is **true** for the partial case. That
  is the right fix in the right place, and it is where I said the fix belonged.
- **`switchToClassic`'s `type === 1` filter is exactly right on this path, and I tried to break it.**
  I expected a gap between "keep only Action Rows" and "drop only V2 types" — a top-level type-3
  select would then be dropped silently on a row the resolver calls loss-free. Executed (CR7-B):
  `SUPPORTED_TOP_LEVEL_TYPES` is `{1} ∪ V2_COMPONENT_TYPE_VALUES` exactly, so after the import shape
  the two predicates are exact complements. **The hypothesis was wrong and the code was right.**
- **Three self-catches this round.** The comment sweep and suite figure last round; this round, a
  grep error caught while writing the handoff (`gateBeforePersist(` matching its own declaration),
  corrected before it reached me. And `gateBeforePersist`'s unwired state was recorded as a
  **deliberate open decision with the alternatives spelled out**, rather than settled by omission —
  which is precisely what I asked for and is better than what I asked for.
- **The TDD gate improved in kind, not just in count**: 3 of 3 discriminating reds, versus round 6's
  5 of 9.

### Assumption Not Checked

**This review assumes that `commitSettled`, `commitChoice` and `cancelChoice` behave as React
callbacks the way they behave as straight-line functions, and does not test it.** Every CR7
assertion calls the pure functions directly; nothing drives the component. The plan's own assumption
5 records that no component or browser harness exists here, and standing the server up does not
reach a client-side callback — so this is the residue that remained after the adversarial run, not
something I skipped.

**Falsity signature**: a re-render between `setPendingChoice` and `commitChoice` — a Pusher-driven
`reloadMessage`, a refetch, a parent remount — replaces the draft under the pending choice, so
`pendingChoice.validated` is no longer the object the displayed `dropSet` was computed from. The
user then reads a notice describing one draft and has another applied: **round 6's MEDIUM-2 class
re-entering through React state instead of through a parameter**, where deleting the parameter
cannot reach it. `MessageProvider` wires `usePusher(messageRef, reloadMessage, hasChanged)`, so an
external reload during the choice is a real event, not a hypothetical one.

**Owner**: `qa-hooks-013`, at M8-E's instrument — the only stage positioned to assert it, and the
reason the plan's assumption 5 needs revisiting rather than restating. If a component harness is
ever added, this is the first thing to point it at. Named again in Next Steps.

### Verdict

**Status: APPROVED_WITH_COMMENTS**, bound to **`87cfbd8`** and to no other tree.

**Rationale.** Round 6's MEDIUM-2 is closed structurally — the probe that demonstrated the defect can
no longer be written, which is the strongest form of closure available. The Minimum on MEDIUM-1 was
delivered as an accurate record correction that does not overstate itself, and the Preferred half was
correctly declined and routed rather than taken unilaterally. The wiring itself is sound where it
matters most: nothing reaches state, storage or the network before a choice is made, and I verified
that against the localStorage surface specifically rather than against a status code. The
adversarial obligation was discharged — 42 raw-socket cases against the persistence boundary, zero
bypasses — and its limits are stated rather than papered over.

**Nothing here reaches HIGH for plan 013.** MEDIUM-1 (round 7) describes a boundary that was always
this way and that M8-G is scheduled to address on the client side; what I add is the measurement that
the client side is not sufficient, which is a question for the plan and not a defect in the delivered
code. LOW-1 is a test-quality habit, not a behaviour risk.

**I am not setting the plan's `Status` field**, for the reason given in round 6 and unchanged: three
milestones and M8-G remain, and a plan-level approval asserted from a milestone-level verdict would
be false.

**CRITICAL-1 does not reject this implementation**, because it is not this implementation. Reject
authority covers the work under review; CRITICAL-1 is a pre-existing defect in a file this chain
never touched, and holding plan 013's milestone hostage to it would misroute both.

### Required Actions

**To the repository owner, via `steering-hooks-013-2` — IMMEDIATE:**

1. **CRITICAL-1.** Two unauthenticated data endpoints behind a guard that cannot fire. Fix both the
   matcher and the predicate, or better, move authorization into the handlers. Verify the fix by
   executing an unauthenticated request, not by reading the code — the two defects mask each other
   and a half-fix reads as correct.

**To `steering-hooks-013-2` — plan-level, per D22:**

2. **MEDIUM-1 (round 7).** The persist API accepts the 5712 shape from any caller. Does D18/D19 mean
   a client convention or a server-enforced invariant? M8-G as planned delivers the former. This
   changes what the plan must contain, so it is not mine or the implementer's to settle.
3. **MEDIUM-1 (round 6) Preferred** — `tsconfig.test.json` — still open with you from last round.

**To `implementer-hooks-013-2`:**

4. **LOW-1 (round 7)** — adopt the rule (a regression test ships with its separating mutant, or
   records `no test`), and rename or delete the current one. The rule matters more than the edit.
5. Carry the round-7 Assumption Not Checked forward alongside round 6's; both concern the same
   seam — the object a real call site hands in — from different directions.

**To `qa-hooks-013`:**

6. M8-E's notice instrument should assert the rendered notice against the applied result. Round 6's
   concern about partial-component wording is **resolved** by `DROP_SET_LABELS` — verify it stays
   resolved rather than re-raising it.
7. **The round-7 Assumption Not Checked is yours**: a re-render between choice and commit. It is the
   one thing neither the probe nor the running instance could reach.

### Captured Instruments (round 7)

New, at `agent-output/verification/013/probe-cr7-wiring-and-boundary/`:

| file | what it establishes |
|---|---|
| `boundary.cr7.test.ts` | CR7-A the persist shape accepts six 5712 payloads with a negative control; CR7-B the top-level type complement and the surviving silent strip; CR7-C the re-attacked guard and its truthy-string hole; CR7-D the notice the user actually reads | 
| `vitest.cr7.config.ts`, `run-cr7-87cfbd8.txt` | config and the captured 17/17 run |
| `attack-upsert.py`, `attack-v1.py`, `run-attack-87cfbd8.txt` | the raw-socket adversarial run — 42 cases against `message.upsert`, and the six that establish CRITICAL-1 |

**Superseded**: `probe-cr6-derivation-round/`'s CR6-C (2 of 10) — instrument expiry, the class is
unrepresentable. CR6-A/B/D/E remain current.

### Next Steps

1. **`steering-hooks-013-2`** — CRITICAL-1 immediately; then MEDIUM-1 (round 7) and the carried
   `tsconfig.test.json` question.
2. **`implementer-hooks-013-2`** — LOW-1's rule; then M3, M4, M6 and M8-G. **M8-G is the round where
   the persist gate finally gets a consumer**, and where the open decision the implementer recorded
   (which of `gateBeforePersist` / `resolveContentLoss` / `applyDisposition` each writer needs) has
   to be made explicitly.
3. **`qa-hooks-013`** — items 6 and 7.

**QA is still not the next stage.** M3, M4, M6 and M8-G remain.

**Rounds 1–6's verdicts are unaffected.** Each stands on its own tree.

---

# Round 8 — the round-7 fix round (a test deletion), at `b3f8ea9`

**Reviewed-At**: `b3f8ea901b2b747252fd1e5b0b83f85bfcf6d53e`. Verified at the start of the pass and
again at the end; the tree did not move during it.

**Verdict: APPROVED.** No findings hold the tree. One INFO routes to the follow-up register.

**This is a delta round and it is deliberately short.** The change is `0 additions, 15 deletions` in
one test file, and `git diff --name-only 87cfbd8 b3f8ea9 | grep -v __tests__` returns **nothing** —
no production source was touched, so production behaviour is unchanged by construction and no
differential over it is possible or needed. What a deletion *can* do is quietly remove coverage,
and that is what this round actually checks.

## The deletion, verified rather than accepted

- **Exactly one test removed, and it is the named one.** Counted independently with `grep -c` on
  both trees (computing before the output filter, not from the diff): **32 → 31**. The removed block
  is `it('MEDIUM-2 (round 6) regression: …')`, matching the implementer's account.
- **Zero mutant-detection capability lost.** I re-ran round 7's mutant set — and more — against the
  **post-deletion** file: `switchToV2` stops clearing embeds; stops clearing content; row E ignores
  `chosenMode`; `switchToV2` *injects* a stray embed (the mutant I built specifically for the deleted
  test's unique draft); and the row-E guard removed. **All five still caught**, the injecting mutant
  by 7 tests. The deleted test was carrying nothing its siblings were not.
- Spec **31/31**; `tsc --noEmit` **0**; `check-expected-six.sh b3f8ea9` **MATCH** at clean
  **481/475/6** — exactly the implementer's stated true figure, and the fourth consecutive round in
  which their corrected number is right. The pairing was run: `probe-cr3-mode-predicate/`
  **122/122**, so steering's conditional judgement has not lapsed. `probe-cr7-…` **17/17**;
  `probe-cr6-…` 8/10, the same two CR6-C instrument-expiry failures as round 7, unchanged.
- The rule was **adopted in the document, not just applied**, and the implementer added a residual
  count of their own ("no test named as a regression check remains without either a separating
  mutant or an explicit `no test` note. Residual count: 0"). Round 7's Assumption Not Checked is
  carried to Outstanding Items with its falsity signature and QA named as owner.

## INFO-1 (round 8) — `switchToClassic`'s embed preservation is held by exactly one incidental assertion

Found while checking the deletion, not by looking for it.

- **Class**: a behavioural property protected only by a test that does not name it — the property
  survives as a side effect of an assertion about something else.
- **Enumeration and demonstration, executed**: mutate `switchToClassic` to clear `embeds`, then run
  **all of `src/utils/__tests__`** (370 passing tests at baseline). **Exactly 1 test newly fails** —
  and it is the round-5 `dropSet` test *"v2 option claims 'embeds' only when the draft actually
  carries meaningful embeds"*, which catches it only because `diffDroppedKeys` executes the real
  `applyModeSwitch` and the computed label shifts. No test asserts the property directly: every
  classic-path draft in the EC-3 block carries `embeds: []`, so within that block the same mutant
  kills **0 of 6**. *What this does not match*: tests outside `src/utils/__tests__`; I did not sweep
  `src/server/api/utils/__tests__` or the component trees.
- **Why it is worth recording**: the one test holding it up has been **rewritten twice in this chain
  already** (round 5's `dropSet` derivation, round 6's signature change). A third rewrite that
  changes its fixture drops the last check on a data-preservation property, silently and with a
  green suite. That is the "check that exists only by accident" shape.
- **Required Action** — **Minimum**: one test asserting directly that a classic application
  preserves a draft's meaningful embeds. **Preferred (structural)**: none warranted; this is a
  missing assertion, not a design defect. **Owner: `qa-hooks-013`**, whose role covers auditing the
  implementer's tests — authoring it is not mine.
- **Routed to the follow-up register, not held against the tree**, per the rounds-stop rule: no
  finding this round changes a decision, and this one predates the round.

## Method note — four dominance reports, four artifacts, and what that means for round 7's rule

I set out to close a residual question rather than declare it: round 7's LOW-1 removed one dominated
test, so are there others in that block? I built a mutant × test matrix over the six remaining
`applyDisposition` tests and computed subset relations on their kill sets.

**It reported a dominated pair four times, and all four were artifacts of my own mutant set.** Each
time I added the mutant the set was missing, the reported dominance dissolved:

| reported | why it was wrong | the mutant that dissolved it |
|---|---|---|
| `row B/C settled` ⊂ `row E v2` | 8 mutants, none touching the **settled** return | M9/M10/M11 — settled branch always classic / always v2 / returns draft |
| `row A/settled` kills nothing | same gap | M10 |
| `row A/settled` ⊂ `row B/C settled` | no mutant on the **classic** content path | M12 — `switchToClassic` clears content |
| `row A/settled` ⊂ `row D settled` | no mutant separating "flags is exactly 0" from "the V2 bit is clear" | M14 — `switchToClassic` ORs in a stray non-V2 bit: **row A fails, row D passes**, executed |

**With 14 mutants, no dominance survives in that block.** More usefully: mutant-based dominance is
only ever a statement about the mutant set, and I watched it produce four false positives in a row.
Reporting any of them would have asked for the deletion of a test that carries real, distinct
coverage — the exact opposite of the intended effect.

**This refines round 7's rule rather than undermining it, and the distinction is the point.** Round
7's LOW-1 did not rest on mutant evidence: that test's input was the sibling's draft with `embeds`
already empty and its assertions a strict subset, so domination was **structural** — provable from
the test's own text, with the mutants as confirmation. Everything above is mutant evidence alone, and
it was wrong every time. So:

> **Dominance justifies deleting a test only when it is structural — strictly weaker input *and* a
> subset of assertions, readable from the test itself. A subset relation between kill sets over a
> hand-built mutant set is a hypothesis about the mutant set, not a finding about the tests.**

I am recording this against my own round-7 finding rather than quietly applying it, because a reader
could reasonably take round 7's rule as licensing kill-set-subset deletions, and it does not.

## Assumption Not Checked

**This review assumes the 14 mutants are representative of how `applyDisposition` and
`applyModeSwitch` actually break, and does not test that.** Every one is a single-line edit at a
return site or a field assignment. **None models an interaction defect** — one where
`resolveContentLoss` misroutes a draft *and* the switch mishandles it, such that the two errors
cancel inside the assertions.

**Falsity signature**: a change to `hasClassicContent`'s embed predicate (which already carries the
`_key`-exclusion special case) shifts a draft from row E to row B while `switchToV2` still clears the
same fields — every assertion in the block passes, `dropSet` is computed from the same shifted
predicate so it agrees, and a real draft lands in V2 with its embed destroyed and no choice offered.
Single-line mutants cannot produce that shape, so a green result under all 14 is not evidence
against it.

**Owner**: `qa-hooks-013`, at M8's test audit — this is a statement about the test block's
discriminating power, which is QA's to assess, not a defect in the code. Named again in Next Steps.

## Next Steps

1. **`qa-hooks-013`** — INFO-1 (a direct assertion that classic application preserves embeds), plus
   the round-8 Assumption Not Checked above, plus round 7's items 6 and 7 already routed.
2. **`steering-hooks-013-2`** — nothing new. Still open from earlier rounds: the `middleware.ts`
   CRITICAL (immediate, outside this chain), the plan-level MEDIUM on the persist API, and
   `tsconfig.test.json`.
3. **`implementer-hooks-013-2`** — nothing outstanding from code review. Next units are M3, M4, M6
   and M8-G.

**QA is still not the next stage.** M3, M4, M6 and M8-G remain.

**Rounds 1–7's verdicts are unaffected.** Each stands on its own tree.

---

# Standing obligations for the next code-reviewer on plan 013 — second seam

Written by `code-reviewer-hooks-013-2` at a generation seam, following the same convention as the
first seam above (`e0f477f`, `3304fad`): the flush is a section of this document, not a separate
file, and **every command handed over below was run and controlled before it was written down.**
Nothing here depends on remembering a conversation. My predecessor's section remains valid where I
have not marked it discharged or amended — read both.

## 0. State of the tree at this seam — re-derived, not remembered

| fact | value | how established |
|---|---|---|
| `website` branch | `chain/013-components-v2-editing-surfaces` | `git rev-parse --abbrev-ref HEAD` |
| `website` HEAD | **`ee3bc3e`** | `git rev-parse HEAD` — **THE TREE MOVED MID-FLUSH; see the correction below** |
| last tree I hold a verdict on | `b3f8ea9` | round 8, APPROVED. **`ee3bc3e` is UNREVIEWED.** |
| `website` working tree | clean but for QA's untracked probe | `?? src/utils/__tests__/013-qa-phase1-seed-route-probe.test.ts` |
| `agent-output` HEAD | `a6dc80b` | three commits past my `cf84cb8` |
| my domain | **clean and committed** | `git status --short code-review/ verification/` → nothing but probe `node_modules` |
| instruments | **83 files, 9 probes, both READMEs** | `git ls-files verification/013 \| grep -c ''` |

**Corrected mid-flush, and left visible rather than smoothed over, because it is the rule working.**
When I began this section the working tree was dirty over `b3f8ea9`: `NewMessageJsonInput.tsx`
carried an uncommitted **69 / 7** (`git diff --numstat`), pulling in `applyDisposition` (×2),
`ContentLossOption` (×2), `pendingChoice` (×3) and `resolveContentLoss` (×1) — the paste surface
being wired to EC-3. I wrote it up as in-flight work to wait for. **The end-of-pass SHA re-verify —
mandatory, and the reason it is mandatory — caught that it had landed while I wrote**, as

```
ee3bc3e  Plan 013, M8-F/M8-E paste-surface parity: NewMessageJsonInput.tsx …
```

with `git diff --numstat b3f8ea9 ee3bc3e` → exactly `69  7` on that one file. My read of *what* it
was proved right; **my guess at which milestone was wrong — it is M8-F/M8-E parity, not M3.** That
file is untouched by chain 013 through `b3f8ea9`, established three independent ways after one
reading disagreed: identical blob `da90f6c` at `92ce026` and `b3f8ea9`, zero bytes of `git log`
output, and an empty `git diff --numstat` across the chain range.

**So your first action is not to wait for a commit — it is to review `ee3bc3e`.** No verdict in this
document reaches it. It is a **single-file, production-source change to a surface no round has
examined**, wiring the paste path into EC-3, and it is a first pass, not a fix round: review it as
one. Note it lands *after* an APPROVED, so there is no open finding pulling you toward the flagged
sites — the sweep is the whole surface.

## 1. Disposition of the first seam's six obligations

| # | first-seam obligation | disposition |
|---|---|---|
| 1 | Adversarial-execution exemption + expiry trigger | **DISCHARGED, and the trigger has expired.** See §2 — the expiry fired at `a3e758b` and I attacked. The obligation is now *re-scoped*, not closed. |
| 2 | No finding ships without a "does not match" clause | **STILL STANDING — I complied, keep complying.** Every enumeration in rounds 6–8 carries one. |
| 3 | The withdrawn "instrument basis ≠ class definition" hypothesis | **STILL STANDING. Do not resurrect it.** Nothing in rounds 6–8 revived it. |
| 4 | Do not set the plan's Status field | **STILL STANDING, and still correct.** I did not set it at round 8 despite APPROVED. Five milestones remain; M3/M4/M6/M8-G outstanding. Refer any challenge to steering. |
| 5 | `baseline-expected-six` + `probe-cr3-mode-predicate` are a pair, run both | **STILL STANDING — I ran both every round** (round 8: CR3 122/122). **Steering's conditional judgement still rides on this.** If you stop running CR3, say so plainly; do not let that judgement hold silently. |
| 6 | Suite not green / never take figures from the working tree / RTK unsoundness / verdicts do not travel | **ALL STILL STANDING.** Each bit me or was re-confirmed in rounds 6–8; see §4. |

## 2. The adversarial obligation, re-scoped — this is the important one

**The first seam's exemption is gone.** T1 below returns a hit at `b3f8ea9`, so "nothing can reach
the gate" is no longer true.

**But note the trigger drift, because it will mislead you if you do not.** The first seam wrote that
trigger expecting the wiring to be the **persist** path, and instructed the expiring round to "drive
the five IS-1 writers". What actually landed at `a3e758b` was the **Load** path, which does not
persist. So in round 7 I drove the boundary those writers funnel into — `message.upsert` — and said
so rather than claiming the writers' coverage. **The writers themselves are still undriven.**

**T2 is the trigger that matters now**, and it is the M8-G trigger. Run it; empty means M8-G is not
yet wired and the persist-path attack is still not owed:

```bash
cd /usr/local/bin/hooks/website
W="src/providers/MessageProvider/useApiMethods.ts \
src/app/message/m/[id]/_components/SaveAsMenu.tsx \
src/app/message/_components/NewMessageModal.tsx \
src/app/message/m/new/page.tsx \
src/app/message/f/[id]/page.tsx"
git grep -c "gateBeforePersist\|applyDisposition\|resolveContentLoss" <sha> -- $W
```

**Controlled, and re-run at the new HEAD:** returns **empty at both `b3f8ea9` and `ee3bc3e`** — so
**M8-G is still not wired and the persist-path attack is still not owed**, including after the
paste-surface commit. Two controls, both run at both SHAs:
(a) **path control** — all five paths `git cat-file -e` clean at `b3f8ea9`; *note one of the first
seam's five paths was wrong* (`SaveAsMenu.tsx` is under `m/[id]/_components/`, not
`_components/`), which is precisely why the path control exists and why the corrected list is above;
(b) **predicate control** — the identical pipeline over the same five files on a symbol they do use
returns a hit in **all five**, so the empty result is a real absence, not a broken predicate.

**Blind spot, same as the first seam's**: it matches three names and cannot see a consumer reaching
the gate via a re-export under another name, nor an inline reimplementation that never calls them.

**When T2 fires, that round owes the persist-path attack**: drive the five writers against a running
instance and assert the negative **on the persistence surface itself** — no `message.upsert` before
a choice — never on a response status. `probe-cr7-wiring-and-boundary/attack-upsert.py` is the
starting point (42 raw-socket cases). **Two hard constraints on standing an instance up**, both paid
for already: `website/.env.local` points at a **remote hosted database** — never stand an instance
against it and never drive a mutation through it; use a dummy env with `DATABASE_URL` on a dead
port, which is not merely safe but *makes the oracle work*, since handler execution then manifests
as an observable connection failure. There is **no `schema.prisma`** in this repo.

## 3. New standing items from rounds 6–8

**a. My own round-7 rule was wrong as stated, and I corrected it publicly.** The implementer adopted
it verbatim, so the unqualified version is loose in the record:

> **Dominance justifies deleting a test only when it is *structural* — strictly weaker input **and**
> a subset of assertions, readable from the test's own text. A subset relation between kill sets over
> a hand-built mutant set is a hypothesis about the mutant set, not a finding about the tests.**

A dominance matrix reported a dominated pair **four times; all four were artifacts of my own
incomplete mutant set**, each dissolving when the missing mutant was added. Acting on any would have
deleted real coverage. If a fix round cites "dominance" to justify a deletion, **require the
structural form** — the kill-set form is not sufficient.

**b. Round-8 INFO-1 is live and routed to QA, not to the tree.** `switchToClassic`'s embed
preservation is held by **exactly one incidental assertion in 370 tests** — the round-5 `dropSet`
test, which catches it only because `diffDroppedKeys` executes the real `applyModeSwitch`. Within
the EC-3 block the same mutant kills **0 of 6**. That test has been rewritten twice in this chain; a
third rewrite drops the last check on a data-preservation property **with a green suite**.
**Expiry test** (cheap, mechanical): run `probe-cr8-deletion-coverage/m13-embed-preservation.py`. It
currently kills exactly one test. **Kills ≥2 → a direct assertion has landed and INFO-1 is closed.**

**c. CRITICAL-1 is dispositioned — do not re-escalate it as IMMEDIATE.** The owner ruled it a
**handoff**, not a chain and not an immediate fix. Document at `agent-output` `a3d60d5`
(`handoff/v1-guild-messages-endpoints-unauthenticated-2026-08-24.md`, `Status: Open`,
`Owning-Stage: Unassigned`); my executed evidence and both attack scripts are cited there at
`79bbcaf`. **The exposure is unchanged and chain 013 proceeds without touching it.** Its
`Review-Trigger` binds you in two places: before anyone edits `src/middleware.ts`, adds a route
under `/api/v1/`, or touches the `matcher` array — **and before chain 013 closes**, whose deploy
puts the same endpoints in front of traffic again. Raise it at chain close; do not let the release
pass silently.

**d. D26 is new (plan rev 18, `a6dc80b`) and changes your reporting timing, not your gates.** Stage
sessions interrupt steering only when something **prevents them continuing**; everything else is
carried to end-of-run. D22's four never-settled classes are **retimed, not waived**. The row states
explicitly that **no gate is waived** — reject-on-quality authority, the `Reviewed-At` binding, and
QA's `Verified-At` all stand. A **blocked action is always blocking** and therefore always
immediate, and is still never retried in different words.

## 4. Rig hazards — two of the nine probes are in the degenerate state right now

**Check before running any probe.** Controlled: the command below distinguishes two states that
both genuinely exist in the tree at this moment, which is the control.

```bash
cd /usr/local/bin/hooks/agent-output/verification/013
for d in probe-*/node_modules; do
  printf "%-45s " "$d"
  if [ -L "$d" ]; then echo "SYMLINK (ok)"; elif [ -d "$d" ]; then echo "REAL DIR — DEGENERATE"; fi
done
```

At this seam: `probe-cr3`, `cr5`, `cr6`, `cr7` are **SYMLINK (ok)**; **`probe-cr1` and `probe-cr2`
are REAL DIR with 0 entries — degenerate.** That is the exact shape that cost me a round: `npx` then
fetches vitest from the network and fails with `Cannot find module 'vitest/config'`, **exit 1, no
tests run** — which reads like a probe failure rather than a rig failure. **`ln -sfn` does not
repair it** (it creates the link *inside* the directory). The repair is:

```bash
rm -rf node_modules && ln -sfn /usr/local/bin/hooks/website/node_modules node_modules
```

Those `node_modules` entries show as untracked in `git status`. **They are mine, not foreign** — do
not mistake them for another session's work, and never commit them.

**A new RTK instance, caught at this seam and worth adding to the first seam's list.**
`git log --oneline <range> -- <path> | grep -c ''` returned **1** over a result whose raw byte count
was **0** — a false positive for "this file was touched in the chain". Caught only because it
contradicted `git rev-parse` on the two blobs (identical) and `git diff --numstat` (empty).
Consistent with the standing rule: **an exact-match or positional predicate over filtered output is
unsound.** Write to a file and read it, or use something computing before the filter.

## 5. What is routed elsewhere — not yours to carry

- **steering / owner**: CRITICAL-1 (handoff, §3c); the plan-level MEDIUM (persist API accepts the
  5712 shape from any caller); `tsconfig.test.json`.
- **QA**: round-8 INFO-1 (§3b); the rounds 6/7/8 Assumptions Not Checked; the M8-E notice
  instrument; the `012-message-mode.test.ts` re-anchor that makes the suite green.
- **implementer**: nothing outstanding from code review at `b3f8ea9`. Next units M3, M4, M6, M8-G —
  and M3 is already in flight uncommitted (§0).

**Two seam gaps I reported to steering and which may still be open**: the R9 watch (`9de4ed7`)
appears in this document only once, as a plan risk row, without its close condition or escalation
path; and D22's four never-settle classes are referenced but never enumerated in one place. D26 has
since restated them (§3d) — check whether that closes the second.

## 6. What I would tell you in one line

**Review `ee3bc3e` first — the paste surface, committed while I was writing this and covered by no
verdict here — and keep watching whether the wiring reaches the persist path, because that is where
T2 fires and the attack you owe stops being optional.**

---

# ROUND 9 — first pass on the paste surface at `ee3bc3e`

**Reviewed-At**: `ee3bc3e3b2b68fd723fd04e0650cc26238e95688` (chain branch
`chain/013-components-v2-editing-surfaces`). Verified at the start of the pass and again at the end;
the tree did not move. `agent-output` at `7e764f2` throughout.

Written by `code-reviewer-hooks-013-3`, the third generation on this plan. This is the review the
second seam's flush names as the successor's first action: `ee3bc3e` landed while that flush was
being written, is production source on a surface no round has examined, and **is a first pass, not a
fix round** — the sweep is the whole surface, not a set of flagged sites.

**Verdict: APPROVED_WITH_COMMENTS.** The wiring is faithful to `JsonModalBody.tsx` and the four pure
functions are reused unchanged and correctly. Three MEDIUMs: one that this commit newly introduces at
this surface and that defeats M8-E's own guarantee for a reachable input class (established by
execution, not by reading the diff), and two that are this unit's own and cheap.

## Scope actually assessed

`git diff --numstat b3f8ea9 ee3bc3e` → **one file**, `src/app/message/_components/NewMessageJsonInput.tsx`,
**69/7**. Read at `ee3bc3e` via `git show`, not from the working tree. The working tree carries one
foreign untracked file (`src/utils/__tests__/013-qa-phase1-seed-route-probe.test.ts`, `qa-hooks-013`'s);
excluded from scope and not mine to touch.

### Sources of truth read — and a correction to this document's own record

**`agent-output/architecture/system-architecture.md` EXISTS, and has existed since the repository's
init commit.** Round 6 states it *"was checked for and does not exist"* and scoped its verdict
accordingly — *"It makes no claim of architectural grounding, because there is no architecture
document to ground it against."* That claim is false, and I did not inherit it: I re-ran the check
myself, as this role requires.

| check | instrument | result |
|---|---|---|
| does it exist now | `ls -d agent-output/architecture/system-architecture.md` from `/usr/local/bin/hooks` | **present** |
| when created | `git -C agent-output log --diff-filter=A -- architecture/system-architecture.md` | **`fb99edd`, 2026-08-23 03:48 — the init commit** |
| ever deleted | `git -C agent-output log --diff-filter=D -- architecture/system-architecture.md` | **0 bytes of output — never** |
| present at round 6 | `git -C agent-output cat-file -e d692206:architecture/system-architecture.md` | **present** |
| present at rounds 7, 8 | same, at `79bbcaf` / `cf84cb8` | **present at both** |

There is also a **plan-specific** architecture document that no round has read:
`architecture/013-components-v2-editing-surfaces-architecture-findings.md`, created at `bff15eb`
(2026-08-24 01:29), **3h38m before round 6** — verdict **APPROVED at rev 10**, carrying F-1, O-1..O-4
and RC-1's discharge.

**This is a record defect, not a tree defect.** No round-6/7/8 finding changes, and no verdict is
withdrawn — those rounds under-claimed rather than over-claimed, which is the safe direction. But
three verdicts declared themselves architecturally ungrounded when the grounding was on disk, and a
successor reading only the flush would have inherited it a fourth time. The likely mechanism is the
one already on this project's hazard list: an existence predicate over RTK-filtered `ls` output
returns a **false absence**, non-deterministically. That is a reason to use `ls -d <path>` or
`git cat-file -e`, both of which I did.

**This round is grounded architecturally.** Plan (Reading Order row for code-reviewer: Decisions
Register → Milestones → Out of Scope → Risks), implementation doc at `08a440d`, the architecture
findings above, and rounds 4–8 of this document.

## Verification re-run — nothing inherited

Every figure is one I produced at `ee3bc3e`.

| claim | instrument | result |
|---|---|---|
| typecheck clean | `npx tsc --noEmit` | **exit 0, 0 errors** |
| lint on the changed file | `npx eslint …/NewMessageJsonInput.tsx --max-warnings=0` | **exit 0, 0 issues** |
| failure **set** unchanged | `baseline-expected-six/check-expected-six.sh ee3bc3e` | **MATCH — the expected six by identity and reason**, clean totals **481/475/6** |
| the paired behavioural probe | `probe-cr3-mode-predicate/` | **122/122** |
| round-8 INFO-1 expiry | `probe-cr8-deletion-coverage/m13-embed-preservation.py` | **kills 1 of 370** — still exactly one incidental assertion. **INFO-1 remains OPEN.** |
| this round's own probe | `probe-cr9-paste-surface/` | **24/24** |

**The pairing was run**, both halves. The judgement steering carries conditional on it **has not
lapsed**.

**The implementer's suite figure is right, and I checked rather than accepted it.** They reported a
working-tree 488/482/6 and a true figure of 481/475/6 derived from the established `+7/+7/+0` offset,
noting they did **not** re-run `check-expected-six.sh` this round. I ran it: **481/475/6, MATCH**.
Their derived figure is correct. This is exactly the case for the gate re-running counts rather than
accepting them — the derivation was sound, and it is now established rather than inferred.

**Their R9 sweeps are also right**, re-run by me with `git grep -c` (which computes before the output
filter): `applyDisposition(` → **2 in `NewMessageJsonInput.tsx`, 2 in `JsonModalBody.tsx`, 4
production total**; `enforceImportMutualExclusivity(` → **0 production** (2 test files only).

**Rig health checked before any probe ran**, per the second seam's standing item. `probe-cr1` and
`probe-cr2` are still **REAL DIR — DEGENERATE**; I did not need them and did not repair them.
`probe-cr8`'s rig had to be **rebuilt from scratch** — its `/tmp/cr8-mut` extraction had been cleared,
and the script fails immediately without it. Rebuilt at `ee3bc3e` (`git archive` + symlinked
`node_modules` + `mm.pristine.ts`) before running. **Successors: `/tmp` does not survive; the CR8
scripts need that extraction rebuilt, and the rebuild recipe is now in the CR9 README's neighbours.**

## Adversarial execution — the trigger, re-run and controlled

The change touches neither a security boundary nor an auth gate. It touches an **irreversible action**
only through `NewMessageModal.onSubmit` → `message.upsert`, so the T2 trigger handed over at the
second seam governs. **I re-ran it rather than trusting it.**

```bash
W="src/providers/MessageProvider/useApiMethods.ts \
src/app/message/m/[id]/_components/SaveAsMenu.tsx \
src/app/message/_components/NewMessageModal.tsx \
src/app/message/m/new/page.tsx \
src/app/message/f/[id]/page.tsx"
git grep -c "gateBeforePersist\|applyDisposition\|resolveContentLoss" ee3bc3e -- $W
```

**Result at `ee3bc3e`: empty — 0 bytes, exit 1.** Both controls run at `ee3bc3e`:

- **path control** — all five paths `git cat-file -e` clean. (The second seam's corrected list is
  right; `SaveAsMenu.tsx` is under `m/[id]/_components/`.)
- **predicate control** — the identical pipeline on a symbol those files do use returns a hit in
  **all five** (33/36/15/16/7). The empty result is a real absence, not a broken predicate.

**So M8-G is still unwired and the persist-path attack is still not owed.** Blind spot, unchanged: it
matches three names and cannot see a consumer reaching the gate via a re-export under another name,
nor an inline reimplementation.

**One thing the trigger does not say, and a successor should not misread.** `NewMessageModal.tsx` is
one of the five writers, and this commit gates **one of its four payload sources**. `loadedMessage` is

```js
const tmp = discordMessage?.message ?? webhookMessage ?? commandMessage?.data ?? jsonMessage;
```

Only `jsonMessage` — the paste route — now carries a disposition. The Discord-URL, webhook-URL and
bot-code routes still reach `upsert` ungated. That is M8-G's and D9's work and **not a defect in this
commit**; it is recorded because the trigger's empty result could otherwise be read as "this writer is
untouched", when in fact it is now **partially** gated, which is a state no round has recorded before.

## Findings

### MEDIUM-1 — the disposition is taken on the post-preprocess object, so the gate cannot see what the schema already deleted; row E flips to a settled row and M8-E's guarantee is bypassed

**Location**: `src/app/message/_components/NewMessageJsonInput.tsx`, the `useUpdateEffect` body —
`discordMessageImportShape.parse(parsed)` then `resolveContentLoss(validated.…)`. Same shape at
`JsonModalBody.tsx`'s `commitSettled`.

**Class**: *any content-loss decision taken on a value a schema preprocess has already mutated.* The
gate exists to stop silent removal; computing it downstream of a silent remover makes the removal
structurally invisible to it.

**Enumeration**: `git grep -c "resolveContentLoss(" ee3bc3e -- 'src/**/*.ts' 'src/**/*.tsx'` → 4 hits:
`NewMessageJsonInput.tsx:1`, `JsonModalBody.tsx:1`, `src/utils/index.ts:3` (the definition plus
`gateBeforePersist`/`applyDisposition`), `013-m8-ec3-resolver-gate.test.ts:26`. **Both production
sites are members** — each is fed a `discordMessageImportShape.parse` result. **Does not match**: a
consumer reaching the resolver through a re-export under another name; an inline reimplementation; and
it cannot see preprocesses on any *other* shape, so it under-reads if a second import shape is added.

**Established by execution**, `probe-cr9-paste-surface/` (24/24, `run-cr9-ee3bc3e.txt`), not by reading:

- `{flags: 32768, content: 'hello', components: [{type:17, components:[{type:2,…}]}]}` is **row E as
  pasted** and **row D at the surface**. The container is destroyed; no choice is offered.
- The notice the user then reads — *"…it has been saved as Classic and the flag cleared."* — contains
  **no drop/remove/lose/delete verb at all**. It reports the flag, and says nothing about the
  container. Asserted directly (CR9-A).
- Without the flag the same input lands on **row A, `noticeClass: 'none'`** — no notice whatsoever.
- The most ordinary member: an **empty container** `{type:17, components:[]}` (CR9-F).
- Sweep (`sweep-child-types.txt`): container child types **[2,3,4,11,17] flip silently**,
  **[9,14] reject visibly**, **[1,10,12,13] hold at row E**. Type 11 is itself a V2 type.

**This commit newly introduced it at this surface** — established by differential (CR9-G), because
"pre-existing" would otherwise be assumed:

| | `content` | `components` |
|---|---|---|
| before `ee3bc3e` | deleted silently | preserved (raw) |
| at `ee3bc3e` | preserved | **deleted silently** |

The commit did not close the silence; it **changed which half is lost**. So this is neither a clean
regression nor untouched pre-existing behaviour, and calling it either would be wrong.

**This is round-4's Assumption Not Checked coming due, exactly where it was routed** — *"the
disposition must be taken on the object that will actually land"*, owner **the implementer at
M8-A/M8-B**, falsity signature *"lands on a different row at the wired JSON surface than the resolver
reports in isolation"*. That signature has now fired, at the surface the assumption named. It is also
round-7 INFO-1's class, which round 7 routed to **the plan** — and the plan agrees: D18's enactment row
records *"the lenient filter names what it dropped, D9's form"* as **M4-b**, undelivered. **D9 is an
owner ruling** (*"Drop them, say what was dropped"*).

**Required Action — eliminate the class, do not patch the site.**
- **Preferred (structural)**: make the preprocess's removals part of the value the surface receives, so
  the disposition is computed on a value that carries its own drop record — i.e. deliver **M4-b**. Then
  no call site can take a disposition on a silently-shortened object, because there is no longer such
  an object.
- **Minimum**: at both production sites, compare components before and after `parse` and surface a
  named drop when they differ.

**Routing**: the remedy is a milestone this plan already owns (**M4-b**), not this unit's work.
**MEDIUM-1 does not hold the tree** — it is recorded, executed, and routed. What is new and belongs to
this unit's record is the *reach*: the flip defeats M8-E's "nothing lands until you choose" for the
enumerated input class, which round 7's row-A instance did not.

**Magnitude**: reachability is bounded by the fixtures being hand-built rather than drawn from real
Discord payloads. The empty-container case (CR9-F) needs no exotic input. **Unmeasured**: how often
real pasted payloads fall in the class.

### MEDIUM-2 — `toast.warn` is fired from an effect that re-runs on every keystroke

**Location**: `NewMessageJsonInput.tsx`, `useUpdateEffect` body — `if (notice) toast.warn(notice);`.

**Class**: *a user-visible, non-idempotent side effect invoked from an effect keyed on a value that
changes on every keystroke.* The sibling surface fires the identical call from an **event handler**;
this one fires it from a **subscription**.

**Enumeration**: `git grep -c "toast\." ee3bc3e --` over both JSON surfaces → 1 each. `JsonModalBody.tsx`'s
call sits in `commitSettled`, reached only from the **Load button's** `onPress`. `NewMessageJsonInput.tsx`'s
sits directly in the effect body. **1 of the 2 sites is a member. Does not match**: any other toast in
the repo (not swept — the class here is specifically toast-from-a-keystroke-keyed-effect), nor a
side effect reached indirectly from the effect body through a helper.

**Mechanism, by reading — labelled a reading, not an execution.** The chain is:
`useCodeMirror`'s `dispatch(tr) { view.update([tr]); onChange(view.state.doc.sliceString(0)); }` fires
`onChange` on **every transaction**; `onChange` is `setJsonMessageString`; `useUpdateEffect` is a plain
`useEffect` minus the first mount (`react-use/lib/useUpdateEffect.js`, read directly) keyed on
`[jsonMessageString]`. So each keystroke that changes the document re-runs the effect body.

**Narrowed honestly**: most intermediate keystrokes leave the JSON unparseable and take the `catch`
branch, so no toast. The live case is **editing a message that is already valid JSON and already lands
on row B or D** — e.g. typing inside a `content` string of a V2-flagged message — which yields **one
toast per keystroke**. Before `ee3bc3e` this surface raised no toast at all.

**Not executed.** The repository has **no DOM or component test harness** — no jsdom, no
testing-library, and **zero `.tsx` tests among 28 test files** — so nothing in the repo or in my
instruments renders this component. Recorded as a reading with its links named.

**Required Action**:
- **Preferred (structural)**: move the notice out of the subscription — fire it from the same kind of
  edge the sibling uses (a commit/confirm action), so a notice cannot be a function of keystroke count.
- **Minimum**: fire only on a *transition* into the notice-bearing disposition — hold the last emitted
  `noticeClass` and emit only when it changes.

### MEDIUM-3 — Cancel leaves a blocked state with no visible cause and no way back to the choice

**Location**: `NewMessageJsonInput.tsx`, `cancelChoice`.

**Class**: *an edge-triggered gate whose only trigger is a value change, paired with a dismiss action
that does not change that value* — so dismissal is not re-enterable.

**Enumeration**: the two `pendingChoice` dismiss paths across the two surfaces. `JsonModalBody.tsx`'s
`cancelChoice` returns the user to a view that still has its **Load button**, so the choice is
re-reachable by the same action that raised it. `NewMessageJsonInput.tsx` has no such affordance: the
only trigger is `useUpdateEffect` on `[jsonMessageString]`. **1 of 2 sites is a member. Does not match**:
dismissal paths that unmount the whole surface (none here).

**By reading**, the state after Cancel is: `pendingChoice` null → the editor remounts carrying the same
text (`useCodeMirror` recreates the view with `doc: value`, so the implementer's "pasted text is
untouched" is correct); `error` is null, set before the row-E branch; `setMessage(null)` has run, so
the parent's `loadedMessage` is undefined and its continue button is `isDisabled={!loadedMessage || …}`.
The user sees **valid-looking JSON, no error, and a disabled button, with nothing on screen explaining
why**. The effect will not re-fire until the text changes.

**Required Action**:
- **Preferred (structural)**: make the choice a function of current state rather than of a change
  event — derive `pendingChoice` from `jsonMessageString` so dismissal cannot strand the surface.
- **Minimum**: on cancel, set `error` to a sentence naming the unresolved conflict, so the disabled
  button has a stated cause.

### LOW-1 — the schema-safety argument checked refinements and missed the preprocess

**Location**: implementation doc `08a440d`, this pass's changelog row.

The unit's stated justification for inverting strip and validate is that the shapes *"place no
cross-field refinement between `content`/`embeds` and `components`, so validate-then-resolve is … the
only order either surface could safely use."* The refinement claim is **true** —
`refineDisplayableText` only bounds total displayable text, which I checked. But the hazard at this
seam is not a refinement; it is the **`z.preprocess` on `components`** in the same shape declaration,
three lines above the `superRefine`. The argument examined the right file and the wrong feature, and
MEDIUM-1 is its consequence.

**Required Action**: none against the tree. Recorded because the *reasoning shape* — "I checked for
cross-field constraints, therefore field-local rewriting is safe" — will recur wherever a Zod shape is
read for safety. When an order-of-operations claim is made about a schema, the check is
**`preprocess`/`transform`/`default`/`catch` as well as refinements**.

### LOW-2 — a source comment addressed to the reader, not to a tool

**Location**: `NewMessageJsonInput.tsx`, in the row-E branch —
`// Row E (D17): nothing lands until the user chooses. Mirrors JsonModalBody's commitSettled/pendingChoice split (M8-F parity).`

Prose addressed to a human reader; no tool consumes it. There is **no pre-commit comment gate in this
repo** (checked: no `.husky`, no active `pre-commit`, no `lint-staged`), so this is the standing rule
rather than a gate rejection. The commit **removed** a three-line prose comment and **added** a
two-line one, so it perpetuates the class rather than introducing it.

**Required Action**: remove it. Its content is already in the implementation doc's changelog row and in
this document. **Minimum**: delete the two lines. Do not replace it with a shorter comment.

### INFO-1 — `enforceImportMutualExclusivity` is dead in production and its doc comment now states the opposite of what the code does

Zero production callers (verified above). It remains exported, and its JSDoc reads *"Mode detection
runs on the raw data BEFORE any schema filtering."* After this commit **neither** JSON surface does
that — both resolve after filtering, which is precisely MEDIUM-1. A future reader taking that sentence
as current will be misled about the live behaviour.

The implementer **disclosed** the retention and its reason (deleting it would touch test files this
unit does not own and risk the pinned six-failure baseline). That reasoning is sound and I endorse
leaving the function. **The stale doc comment is the part worth acting on**, and it is a comment on a
now-dead function — the cheap disposition is to delete the function and its dedicated coverage in a
unit that owns those test files, not to edit the comment in place.

### INFO-2 — round-8 INFO-1 has not expired

`m13-embed-preservation.py` at `ee3bc3e`: **1 newly-failing test of 370**, unchanged from `b3f8ea9`.
`switchToClassic`'s embed preservation is still held by exactly one incidental assertion. Expected —
no test file changed in this commit — but **run rather than inferred**, and the rig rebuilt to run it.
Still QA's, still open. Kills ≥ 2 closes it.

## Positive observations

- **Row E genuinely blocks.** `setPendingChoice` + `setMessage(null)` + `return` — nothing reaches the
  parent's `loadedMessage`, so nothing can reach `upsert` before a choice. For the input class that
  actually reaches row E, M8-E's guarantee holds, and I checked the early return rather than assuming it.
- **The four pure functions are reused verbatim, in the right order, with the right arguments.** No
  reimplementation, no new pure function, no drift from the sibling surface. The argument order matches
  `resolveContentLoss`'s signature exactly at both sites.
- **`setError(null)` precedes the row-E branch**, so a stale parse error cannot survive into the choice
  view. Easy to get wrong; it is right.
- **The implementer's disclosure discipline is high.** The retained dead function, the absent parity
  test and the un-re-run baseline are all stated plainly as decisions with reasons, not smoothed over.
  The un-re-run baseline is the one I checked hardest, and their derived figure was correct.

## Assumption Not Checked

**This review assumes that `applyModeSwitch`'s output shape is what the persist boundary accepts, and
does not test it.** CR9-G surfaced, incidentally, that the new path leaves `content: ''` where the old
path **deleted** the key (asserted in CR9-G's second case). I did not drive that shape at
`message.upsert`, and no round has: round 7 attacked the boundary at `87cfbd8`, before this surface
produced payloads.

**Falsity signature**: a message dispositioned to `v2` from the paste surface is rejected at the
persist boundary, or is accepted and stored carrying an empty-string `content` alongside the V2 flag —
i.e. the 5712-shaped record that 012's QA has an outstanding re-measure for — where the pre-`ee3bc3e`
paste surface would have produced no `content` key at all.

**Owner: QA, at Phase 2**, alongside the 5712/5842 re-measure it already owns; the discriminating check
is to compare the persisted record's key set for a V2 paste against the same paste at `b3f8ea9`. Named
again in Next Steps.

## Captured instruments

| path | what it is |
|---|---|
| `agent-output/verification/013/probe-cr9-paste-surface/paste.cr9.test.ts` | 24 assertions: the post-preprocess flip, its notice, the child-type sweep, the empty-container case, the old-vs-new differential, and two comparator controls |
| `…/probe-cr9-paste-surface/vitest.cr9.config.ts` | its config |
| `…/probe-cr9-paste-surface/run-cr9-ee3bc3e.txt` | the run at `ee3bc3e` — 24/24 |
| `…/probe-cr9-paste-surface/sweep-child-types.txt` | the child-type enumeration, silent-flip vs visible-rejection vs held |
| `…/probe-cr9-paste-surface/README.md` | what it answers, how to run it, and its blind spots stated at authoring time |

**`no test` for MEDIUM-2 and MEDIUM-3.** Both are component-level behaviours and the repository has no
harness that can render a component. Authoring one is not mine and is not a spec change this unit can
carry; the instrument for them, if the repo gains a harness, belongs with the fix.

## Required Actions

1. **MEDIUM-2** — take the notice off the keystroke-keyed effect. This unit's own defect, cheap.
2. **MEDIUM-3** — give Cancel a stated cause or make the choice state-derived. This unit's own defect, cheap.
3. **LOW-2** — delete the two-line comment.
4. **MEDIUM-1** — **not this unit's fix.** Routed to **M4-b** (the plan's own answer, D9's form). Its
   reach at this surface is recorded above and should be cited when M4-b is planned.

## Next Steps

1. **`implementer-hooks-013-3`** — MEDIUM-2, MEDIUM-3, LOW-2. All three are local to
   `NewMessageJsonInput.tsx` and none touches a shared symbol or a test file this unit does not own.
2. **A planner pass, when the owner releases the planner queue — NOT steering, and NOT me.**
   MEDIUM-1's reach: **M4-b now has a demonstrated, executed instance that defeats M8-E's guarantee**,
   not merely round 7's row-A instance. It **must reach M4's Risks before M4 is planned.**

   **Routing corrected by `steering-hooks-013-2` after this round was written, and recorded here so a
   successor does not repeat my mistake.** I asked steering to get this into the plan's Risks on the
   view that registration is steering's. **It is not.** Steering's write set is exactly a Decisions
   Register row, a changelog line, and any Status field an *owner ruling* moves — **no body text**. A
   new or widened Risk **is** body text, which makes it a **planner pass**, and the planner queue is
   **held by owner ruling**. Steering has therefore recorded it as the **seventh held item**, carrying
   the part that is new (row A had nothing to choose; this defeats the choice itself). Nothing is
   escalated and nothing is held against the tree — D18/D9 already own the remedy at M4-b.

   **The general rule, since this will recur**: a finding that wants a *plan body* edit — a Risk, a
   milestone clause, an acceptance property — cannot be routed to steering. It waits for a planner
   pass. Route it to the held queue and say so; do not write it as though steering can absorb it.
3. **QA** — this round's Assumption Not Checked (the `content: ''` shape at the persist boundary), with
   the 5712/5842 re-measure it already owns; and round-8 INFO-1, still open at 1 kill.
4. **The retrospective / pi** — the round-6 architecture-absence error above. A false absence from a
   filtered existence check propagated through three verdicts. The remedy is already this project's
   standing rule; what is new is that it reached a *sources-of-truth* check, not just a count.

## Status field — NOT set, deliberately

This role's definition instructs me to set the plan's Status to "Code Review Approved" on a passing
review. **I have not**, on both seams' standing instruction and steering's two rulings: plan 013 is
reviewed milestone by milestone, and a plan-level approval asserted from a milestone verdict would be
false at the plan level. M2-c, M3, M4, M6 and M8-G remain. **If this is raised at me, it goes to
steering, not to my judgement.** Third generation to decline it on its own reasoning; the definition
gap is lodged at `~/.claude/agents/INBOX.md` (`ee1ae0e`).

## Standing obligations carried forward — third seam is NOT open

I am not flushing. The second seam's section stands **unamended except as follows**:

- **§0's "your first action is to review `ee3bc3e`" is DISCHARGED** — this round is it.
- **§1's obligations 2, 3, 4, 5, 6 all STILL STAND.** I complied with each: every enumeration above
  carries a "does not match" clause; the withdrawn hypothesis was not revived; Status not set; the
  pairing run (CR3 122/122, expected-six MATCH); suite figures taken from a clean extraction, never
  from the working tree.
- **§2's T2 is re-run and still empty at `ee3bc3e`, with both controls.** The persist-path attack
  remains not owed. **Retarget note added**: `NewMessageModal.tsx` is now *partially* gated (1 of 4
  payload sources) — an empty T2 no longer means that writer is wholly untouched.
- **§3a (structural dominance only), §3c (CRITICAL-1 is a handoff; raise at chain close, do not
  re-escalate), §3d (D26 retimes, waives nothing) — unchanged.**
- **§4's rig list needs one addition**: `probe-cr8`'s `/tmp/cr8-mut` extraction **does not survive**
  and must be rebuilt before its scripts run. `probe-cr1`/`probe-cr2` remain degenerate.
- **New**: do not inherit round 6's architecture-absence claim. Both architecture documents exist;
  the corrected record is at the top of this round.

---

# ROUND 10 — the round-9 fix round, at `82af843`

**Reviewed-At**: `82af843ae842697383d899f53aedc76e1f561966` (chain branch
`chain/013-components-v2-editing-surfaces`). Verified at the start of the pass and again at the end;
the tree did not move. `agent-output` at `46d84aa` on entry.

**Verdict: APPROVED_WITH_COMMENTS.** MEDIUM-3 is closed **structurally** — the Preferred fix, and it
now has a check that fails if the class returns. LOW-2 is closed, verified with a broader predicate
than the one claimed. **MEDIUM-2 is NOT closed**: the guard reduces frequency but does not remove the
class, and the implementer's claim that it does is falsified by execution. The residual is one line.

## Scope actually assessed

`git diff --numstat ee3bc3e 82af843` → **one file**, `NewMessageJsonInput.tsx`, **33/4**. Read at
`82af843` via `git show`. `JsonModalBody.tsx` **did not change this round** (empty `--numstat`), so
the sibling surface is untouched and the parity question is unchanged.

## Verification re-run — nothing inherited

| claim | instrument | result |
|---|---|---|
| typecheck | `npx tsc --noEmit` | **exit 0** |
| lint on the changed file | `npx eslint … --max-warnings=0` | **exit 0** |
| failure **set** unchanged | `check-expected-six.sh 82af843` | **MATCH**, clean **481/475/6** |
| the pairing's other half | `probe-cr3-mode-predicate/` | **122/122** |
| round-9 MEDIUM-1 still stands | `probe-cr9-paste-surface/` | **24/24** — the class is untouched, as routed |
| this round's attack | `probe-cr10-notice-guard/` | **12/12** |

**The pairing was run, both halves.** Steering's conditional judgement has not lapsed.
**T2 re-run at `82af843`: empty**, path control clean on all five, predicate control firing in all
five (29/31/15/15/6). **M8-G still unwired; the persist-path attack is still not owed.**

The implementer's own figures (tsc 0, eslint 0, true 481/475/6, same six) are all reproduced.

## Finding dispositions

### MEDIUM-3 — CLOSED, structurally, the Preferred fix

`cancelChoice` no longer discards the resolved choice: it moves `pendingChoice` into `dismissedChoice`,
the main view renders an error-styled notice naming the unresolved conflict with a **Resolve** button
calling `reopenChoice`, and `dismissedChoice` is cleared at the top of the effect so it cannot outlive
the text it was resolved against.

**The class is gone**, not the symptom: the finding was *an edge-triggered gate whose dismissal is not
re-enterable*, and dismissal is now re-enterable without a text edit. `reopenChoice` restores the
**same** object rather than re-deriving it, so re-entry cannot disagree with what was dismissed.

**Captured check**: `verification/013/probe-cr10-notice-guard/guard.cr10.test.ts`, block **CR10-D**.
It asserts the affordance exists after Cancel, that Resolve restores the same object, and that a
dismissed choice dies on any text change — **with a control reproducing the `ee3bc3e` `cancelChoice`**,
which leaves nothing to re-enter, so the check discriminates rather than passing vacuously.
**This is the check that fails if the class returns.**

### LOW-2 — CLOSED, and the sweep was re-run with a broken predicate

The comment is gone and nothing replaced it. **I did not accept the implementer's sweep.** Their
predicate was `grep -n "^\s*//"` — line-leading `//` only. I broke it and re-ran, at `82af843`:

| predicate | forms it can see | hits |
|---|---|---|
| `^[[:space:]]*//` (theirs) | line-leading `//` | **0** |
| `//` | **also trailing comments** | **0** |
| `/\*` | **also block comments and JSDoc** | **0** |
| `{/\*` | **also JSX comments** | **0** |

**Zero comments of any form.** Their predicate could not see three of those four classes; the file
happens to be clean in all of them, so the conclusion held — but it held by luck of the file, not by
the predicate. **Does not match**: a comment carried inside a string literal or a template literal,
which none of these can distinguish from code.

**Credit, and it matters.** The implementer self-caught two rationale comments on the new state before
committing and removed them — the same class as LOW-2, caught by self-review rather than by this gate.
That is the gate working upstream of itself.

### MEDIUM-2 — NOT CLOSED. The guard reduces frequency; the class survives.

**The claim under attack**, from the fix-round message:

> *"The transition guard removes the **class** (repeat toasts on an unchanged notice), not just the
> frequency."*

**Falsified by execution** — `probe-cr10-notice-guard/` (12/12), summary in `attack-summary.txt`. I
attacked the guard rather than reading it, per the standing rule that a fix to a guard is re-attacked
from first principles.

```
sequence                                    toasts   a correct guard would give
  10x identical row-D text                   1        1     <- the fix works here
  typing, all states valid                   1        1     <- and here
  delete one char, retype it                 2        1     <- CLASS SURVIVES
  add a second key (7 invalid intermediates) 2        1     <- CLASS SURVIVES
  8 invalid->valid round trips               9        1     <- unbounded
  excursion to row A and back                2        1     <- see below, NOT raised
```

**Mechanism**: the `catch` branch sets `lastNoticeClassRef.current = null`. Any unparseable
intermediate therefore re-arms the notice, and the *same* warning fires again when the document parses
again — including when the text ends up **byte-identical** to where it started. Deleting a closing
brace and retyping it is enough. Editing JSON passes through unparseable states constantly, so this is
the ordinary case, not a corner.

**Class**: *a de-duplication guard whose memory is cleared by a transient of the input method rather
than by a change in the thing being de-duplicated.*

**Enumeration**: guards of this shape in the changed file — `lastNoticeClassRef` is the only one
(`git grep -c "Ref.current" 82af843 -- <file>` → 1). `JsonModalBody.tsx` needs none: its `toast` is
behind the Load button's `onPress`, not behind a subscription, and it did not change this round.
**1 of 2 surfaces is a member. Does not match**: any other de-duplication memory in the repo (not
swept — the class here is scoped to this notice guard), nor a guard keyed on something other than
`noticeClass`.

**Magnitude — measured, not hypothesised**: 9 identical toasts across 8 invalid→valid round trips
(CR10-B), unbounded in the number of round trips. **Lower bound**, not upper: CR10 models the `useRef`
as surviving, which it does across re-render but not across remount, so the real guard is never
stronger than modelled.

**One row of that table is NOT raised, and separating them is the point.** The row-A excursion
(`row D → row A → row D`) also re-fires, but there the message genuinely stopped being a conflict and
became one again — warning twice is defensible. **Only the `catch`-branch reset is the defect.** A
finding that lumped them would have demanded a worse guard.

**Required Action — Minimum is sufficient and is one line**: do not clear `lastNoticeClassRef` in the
`catch` branch. An unparseable document is a transient of typing, not a disposition the user reached;
the last *disposition* the surface actually showed is still the last one shown. **Preferred
(structural)** remains what round 9 said — take the notice off the subscription entirely — but I
accept the implementer's reason for declining it: this surface has no discrete commit action, and
inventing one is a UX change beyond a MEDIUM's scope. **That reasoning is sound and I am not
re-pressing it.**

**If the implementer disagrees that the `catch` reset is wrong** — a case can be made that a parse
error is a state change worth re-warning after — **that is a legitimate disagreement, and it goes to
steering as a question, not settled by either of us.** It does not hold the tree either way.

### MEDIUM-1 — untouched, correctly

Not addressed, per round 9's routing to **M4-b**. `probe-cr9` re-run at `82af843`: **24/24**, so the
class is exactly where round 9 left it. The implementer recorded it in Outstanding Items as a carried
fact with the right framing — the silence is `filterSupportedComponents`' preprocess, not either JSON
surface's unit. **Steering has since recorded it as the seventh held item**, and the routing correction
(a plan **body** edit is a planner pass, not a steering registration) is at the end of round 9.

## Positive observations

- **The declined Preferred on MEDIUM-2 was declined with a reason, not silently.** "This surface has
  no discrete commit action, so adding one is a UX change beyond a MEDIUM's scope" is correct, and
  saying so beats quietly taking the Minimum.
- **MEDIUM-3 was taken structurally when the Minimum was on offer.** The Minimum was "set `error` to a
  sentence"; what landed re-enters the actual choice. That is the harder and better fix.
- **The self-caught comments.** Two rationale comments written and removed before commit, disclosed
  unprompted. The class is being caught upstream of the gate now.

## Assumption Not Checked

**This review assumes `lastNoticeClassRef` survives every re-render of this component in the real
tree, and does not test it.** CR10 models a `useRef` as stable; a `useRef` is stable across re-render
but **not across remount**, and this component has a conditional early return that unmounts and
remounts the CodeMirror host on every entry to and exit from the choice view.

**Falsity signature**: a user who enters the row-E choice view and cancels back out sees the settled
notice fire again on the next parse even with no change of `noticeClass` — i.e. toast counts higher
than CR10-B's, which are stated as a lower bound for exactly this reason. The `useRef` lives on the
component, not on the branch, so it *should* survive; what is untested is whether anything above this
component remounts it.

**Owner: QA**, at Phase 2, on the first surface it gains a component harness for — this is unreachable
without one, which is why it is routed rather than closed here. The discriminating check is to mount
the component, drive row D → row E → Cancel → row D, and count toasts. Named again in Next Steps.

## Captured instruments

| path | what it is |
|---|---|
| `verification/013/probe-cr10-notice-guard/guard.cr10.test.ts` | 12 assertions: the guard attacked over six keystroke sequences, and CR10-D, MEDIUM-3's closure check with a pre-fix control |
| `…/probe-cr10-notice-guard/vitest.cr10.config.ts` | its config |
| `…/probe-cr10-notice-guard/run-cr10-82af843.txt` | the run — 12/12 |
| `…/probe-cr10-notice-guard/attack-summary.txt` | the six sequences and their toast counts |
| `…/probe-cr10-notice-guard/README.md` | the claim attacked, what is transcribed vs executed, and three blind spots |

**MEDIUM-3's disposition records both halves**: the class is gone, **and** the check that fails if it
returns is `guard.cr10.test.ts` block CR10-D. **LOW-2**: `no test` — a comment's absence is a sweep,
not a behaviour, and the sweep is recorded above rather than captured as an executable.

## Required Actions

1. **MEDIUM-2 residual** — do not clear `lastNoticeClassRef` in the `catch` branch. One line. Does not
   hold the tree; if you disagree, put it to steering rather than to me.

Nothing else. MEDIUM-3 and LOW-2 are closed.

## Next Steps

1. **`implementer-hooks-013-3`** — the one-line MEDIUM-2 residual, then the next units (M2-c's diff
   text, then M8-G) per steering.
2. **QA** — this round's Assumption Not Checked (does anything remount this component, weakening the
   `useRef` guard), on the first surface that gains a component harness; plus round 9's
   (`content: ''` at the persist boundary) and round-8 INFO-1, still open at 1 kill.
3. **A planner pass, when the owner releases that queue** — MEDIUM-1's reach into M4's Risks, per the
   routing correction at the end of round 9. Steering carries it as the seventh held item.

---

# ROUND 11 — the round-10 fix round, at `54fed63`

**Reviewed-At**: `54fed635686b3dcd813c95bb464056ff97a00a6a` (chain branch
`chain/013-components-v2-editing-surfaces`). Verified at the start of the pass and again at the end;
the tree did not move. `agent-output` at `ee1b3a3` on entry.

**Verdict: APPROVED.** MEDIUM-2's residual is closed, established by a differential whose two arms
differ only by the deleted line. **Every finding this reviewer raised against the paste surface is now
closed or routed.** No finding holds the tree.

## Scope actually assessed

`git diff --numstat 82af843 54fed63` → one file, **0/1** — a pure deletion of
`lastNoticeClassRef.current = null;` from the `catch` branch. Read at `54fed63` via `git show`. The
change matches the Required Action's stated scope exactly; nothing else moved.

## Verification re-run — nothing inherited

| claim | instrument | result |
|---|---|---|
| typecheck | `npx tsc --noEmit` | **exit 0** |
| lint on the changed file | `npx eslint … --max-warnings=0` | **exit 0** |
| failure **set** unchanged | `check-expected-six.sh 54fed63` | **MATCH**, clean **481/475/6** |
| the pairing's other half | `probe-cr3-mode-predicate/` | **122/122** |
| round-9 MEDIUM-1 still stands where routed | `probe-cr9-paste-surface/` | **24/24** |
| the closure | `probe-cr11-guard-closure/` | **17/17** |

**Pairing run, both halves.** Steering's conditional judgement has not lapsed.
**T2 at `54fed63`: empty**, path control clean on all five, predicate control firing in all five.
**M8-G still unwired; the persist-path attack is still not owed.**

## MEDIUM-2 residual — CLOSED

`probe-cr11-guard-closure/` (17/17) drives the guard over the sequences CR10 raised. Its two arms are
the **same transcription parameterised by one boolean**, so any difference between the columns is
attributable to the deleted line and to nothing else:

```
sequence                                  82af843   54fed63
  delete one char, retype it               2         1
  add a second key                         2         1
  8 invalid->valid round trips             9         1
  truncated paste-over                     2         1
  10x identical row-D                      1         1
  row D -> broken -> row B (must warn)     2         2
  row D -> row A -> row D (defensible)     2         2
```

**The class is gone**, and the control column is what makes that a measurement rather than a vacuous
pass. **Captured check**: `verification/013/probe-cr11-guard-closure/closure.cr11.test.ts` — CR11-A
holds the closure with its pre-fix control; **this is the check that fails if the class returns.**

**I attacked the deletion for holes it might have opened, rather than only confirming the fix.**
A guard whose memory is never cleared can suppress a warning that ought to fire. CR11-C:

- **row D → broken → row B**: a genuine change of notice class still warns, across the invalid state. **2 toasts, different text.**
- **row E → row D**: `requiresChoice` sets the ref to `'choice'`, and a following settled warning is **not** swallowed. **1 toast.**
- **broken from the very first keystroke → row D**: the first real warning is **not** suppressed. **1 toast.**
- **row D → row A → row D**: still warns twice. Round 10 judged this **defensible** and did not ask for
  it to change; CR11-C now **asserts** it, so a later tidy cannot silently remove it.

**What the fix does NOT give, stated rather than implied** (CR11-D): a *different* message on the same
notice class is not re-warned. That is what de-duplication by class means, it was true before the fix
on valid paths, and it is **not** a finding — recorded so CR11-A is not read as a stronger claim than it is.

**The implementer declined the escape hatch I offered**, on the ground that the executed evidence
showed ordinary character-level editing rather than a rare path. That is the right reading of the
evidence, and declining to route a question they could answer themselves is the right instinct.

## INSTRUMENT DEFECT — `probe-cr10` is stale by construction and must not be trusted about any later tree

**Found by re-running it at `54fed63`, where it reported 12/12 — the same result as at `82af843`,
against a tree where the defect it demonstrates has been fixed.**

`probe-cr10`'s transcription **hardcodes** the effect body including the `catch`-branch reset. It does
not read the tree under test. So it will keep reporting the defect for as long as it exists, on every
future tree, and **a reader running it after `54fed63` would conclude the defect is still present.**

This is **exactly the hazard already on this project's instrument list** — `probe-cr1`'s round-1 form
"hardcoded the old consumer and was rewired to read the tree under test". I reproduced it in a new
instrument three rounds later, and only caught it because I re-ran the old probe against the new tree
rather than assuming a fix round supersedes it.

**Disposition**: `probe-cr10` is **superseded by CR11 for the guard claim** and is retained only as the
record of what `82af843` did. Marked in the instruments README. **Its passing is not evidence about any
tree after `82af843`.**

**CR11 shares the architecture and I am not exempting it.** CR11 is a *differential between two
transcribed variants*; it establishes **what the deleted line does**, which is tree-independent and
stays true. It does **not** establish that the line is actually gone from the tree. That link is the
`git diff 82af843 54fed63` above, read directly — `0/1`, the single line. **Neither closes MEDIUM-2
alone; together they do**, and a successor should not treat CR11 as self-sufficient.

## Positive observations

- **A one-line pure deletion, matching the Required Action's scope exactly.** No opportunistic tidying
  rode along — `--numstat` `0/1`. That is the right shape for a fix round.
- **The declined escape hatch.** I offered steering as a route for a reasoned disagreement; they judged
  the evidence settled it and did not spend the round trip.
- **Three rounds, three shapes of fix, each proportionate**: structural where structure was available
  (MEDIUM-3), minimum where the structural option was a scope overreach and said so (MEDIUM-2's first
  pass), and a one-line deletion when the residual was precisely located.

## Assumption Not Checked

**This review assumes the React `useRef` holding the guard's memory is not reset by anything above this
component, and does not test it** — carried unchanged from round 10, because this round's deletion does
not touch it and nothing new bears on it. A `useRef` survives re-render but not remount; every toast
count in CR10 and CR11 is therefore a **lower bound**, not an exact figure.

**Falsity signature**: a user who enters the row-E choice view, cancels back out, and returns to a
settled row sees the warning fire again with no change of `noticeClass` — toast counts above CR11's.

**Owner: QA**, at Phase 2, on the first surface that gains a component harness; unreachable here, which
is why it is routed rather than closed. The discriminating check is to mount the component and drive
row D → row E → Cancel → row D, counting toasts. Named again in Next Steps.

## Captured instruments

| path | what it is |
|---|---|
| `verification/013/probe-cr11-guard-closure/closure.cr11.test.ts` | 17 assertions: the closure with a pre-fix control on every sequence, four suppression attacks, and the non-claim |
| `…/probe-cr11-guard-closure/vitest.cr11.config.ts` | its config |
| `…/probe-cr11-guard-closure/run-cr11-54fed63.txt` | the run — 17/17 |
| `…/probe-cr11-guard-closure/closure-summary.txt` | the two-column differential |
| `…/probe-cr11-guard-closure/README.md` | the claim, the transcription limit, and what CR11 cannot establish alone |

## Required Actions

**None.** All three round-9 findings are closed: MEDIUM-2 (this round), MEDIUM-3 and LOW-2 (round 10).

## Next Steps

1. **`implementer-hooks-013-3`** — nothing outstanding from code review on this surface. Next units are
   **M2-c's diff text, then M8-G**, per steering.
2. **QA** — the Assumption Not Checked above (does anything remount this component); round 9's
   (`content: ''` at the persist boundary); round-8 INFO-1, still open at 1 kill.
3. **A planner pass, when the owner releases that queue** — MEDIUM-1's reach into M4's Risks. Steering
   carries it as the seventh held item; the routing rule is at the end of round 9.
4. **Whoever reviews M8-G** — T2 has now been empty for four consecutive rounds. When it fires, that
   round owes the persist-path attack against a running instance, asserting the negative **on the
   persistence surface**, never on a response status; and `.env.local` points at a **remote hosted
   database** — a dummy env with `DATABASE_URL` on a dead port is what makes the oracle work.

---

# ROUND 12 — M2-c, the Load overwrite confirmation, at `299b842`

**Reviewed-At**: `299b842d22712c6922bdae72797d53b8b6e4afa4` (chain branch
`chain/013-components-v2-editing-surfaces`). Verified at the start of the pass and again at the end;
the tree did not move. `agent-output` at `b7a7801` on entry.

**Verdict: REJECTED.** One HIGH. The new confirmation meets M2-c's stated criterion — it does name
added and removed top-level component types and a mode change, and it does it well — but **it replaced
the sentence telling the user an overwrite is happening, and on the modal's dominant path the user is
now told "No component or mode changes." while their message is overwritten.** That is a regression in
a confirmation guarding an irreversible, data-destroying action. The fix is small and local.

The TDD on this unit is the strongest I have seen on this plan, and the finding is not about the new
functions — both are correct. It is about what the wiring removed.

## Scope actually assessed

`git diff --numstat 54fed63 299b842` → three files: `src/utils/index.ts` (57/6),
`JsonModalBody.tsx` (11/5), and a new spec `013-m2c-load-diff.test.ts` (125/0). Read at `299b842` via
`git show`.

## Verification re-run — nothing inherited

| claim | instrument | result |
|---|---|---|
| typecheck | `npx tsc --noEmit` | **exit 0** |
| lint, both changed production files | `npx eslint … --max-warnings=0` | **1 error, `import/no-cycle`** — pre-existing, see below |
| failure **set** unchanged | `check-expected-six.sh 299b842` | **MATCH**, clean **493/487/6** |
| the pairing's other half | `probe-cr3-mode-predicate/` | **122/122** |
| earlier findings still where routed | `probe-cr9` / `probe-cr11` | **24/24** / **17/17** |
| this round | `probe-cr12-load-confirmation/` | **13/13** |

**Pairing run, both halves.** **T2 at `299b842`: empty**, both controls firing — **fifth consecutive
round; M8-G still unwired.** The implementer's true figure **493/487/6** is reproduced exactly.

**The `import/no-cycle` is pre-existing and I established that rather than accepting it.** The
instruments README records that eslint cannot run from a `git archive` extraction, so provenance is
answered from the real tree plus `git show`:

```
54fed63:src/utils/index.ts:17  import { applyModeSwitch } from '~/utils/messageMode';
299b842:src/utils/index.ts:17  import { applyModeSwitch, isMessageV2 } from '~/utils/messageMode';
```

Line 17 already imported from that module. Adding a second binding to the **same import statement**
cannot create a cycle the statement did not already carry. Round 5's INFO-1, introduced at `2f49182`.

## TDD compliance — verified, not accepted, and it holds

**Red verified independently.** I extracted `299b842~1`, dropped the new spec in, and ran it:
**12 failed**, every one `computeLoadDiff is not a function` / `describeLoadDiff is not a function`.
The implementer's 12/12 red claim is exact.

**But "is not a function" only proves absence, so I mutated the implementation to establish that the
spec discriminates behaviour**, which an all-existence red does not show:

| mutant | tests killed |
|---|---|
| M1 — dedupe removed (`Set` → per-instance) | **7 of 12** |
| M2 — mode taken from components only, ignoring the flag | **1 of 12** (the flag-only test — precisely the one that exists for it) |
| M3 — `addedTypes` / `removedTypes` swapped | **3 of 12** |
| (restored) | 12/12 pass |

**Expectations are independent**: the fixtures assert literal strings (`'Action Row'`, `'Container'`)
and the literal `32768`, not values re-derived from `TOP_LEVEL_COMPONENT_LABELS` or
`IS_COMPONENTS_V2_FLAG`. A test computing its expectation from the map the code reads could not fail
under a wrong map; these can and would.

**The behaviour-preservation claim for `joinWithAnd` is settled by execution, not by the 7/7 re-run.**
CR12-E compares the real post-extraction `describeDropSet` against the `54fed63` body transcribed
verbatim, over a **2000-case deterministic randomised corpus** (no `Math.random`), **with a positive
control** confirming the comparator reports DIFFER when the old body is perturbed, and a check that the
zero-length early return survived. **Identical on all 2000.** The extraction is behaviour-preserving.

## Findings

### HIGH-1 — the Load confirmation no longer says an overwrite is happening, and on the dominant path it says the opposite

**Location**: `src/utils/index.ts`, `describeLoadDiff` — the `if (!parts.length) return 'No component
or mode changes.';` branch; and `JsonModalBody.tsx`'s `withConfirmation({ message: … })`, which
replaced `'This will overwrite the current message.'` with the computed line.

**The dialog the user reads** is `title: 'Are you sure?'` / this message / button `'Load'`. The title
is generic and the button is a verb — **`message` is the entire informative body.**

**Executed** (`probe-cr12-load-confirmation/`, 13/13, `dialog-table.txt`):

```
  edit text inside a container     -> "No component or mode changes."
  replace a classic message body   -> "No component or mode changes."
  replace all embeds               -> "No component or mode changes."
  collapse 3 containers to 1       -> "No component or mode changes."
  remove an Action Row             -> "This will remove Action Row."
  add a Container + mode switch    -> "This will add Container; switch from Classic to Components V2."
  flag-only mode change            -> "This will switch from Classic to Components V2."
```

**The last three are correct, useful, and a real improvement over the generic sentence.** The first
four are the problem, and the first is the *dominant* path: **the modal is seeded with the current
message** (`jsonModalSeed(message)`), so the overwhelmingly common Load is "I edited this message's own
JSON and I am loading it back" — which changes text inside components, leaves top-level types
identical, and now produces **"No component or mode changes."**

**Class**: *a confirmation that asserts the absence of change over a wider scope than the comparison it
actually performed.* The comparison is top-level component **types** plus mode. The sentence is read as
"nothing will change", and it displaced the only statement that an overwrite occurs.

**Enumeration**: `git grep -c "describeLoadDiff\|computeLoadDiff" 299b842 -- 'src/**/*.ts' 'src/**/*.tsx'`
→ 3 hits: `JsonModalBody.tsx:2` (**the sole production consumer**), `src/utils/index.ts:2`
(definitions), `013-m2c-load-diff.test.ts:16`. **1 production call site, and it is a member.**
`git grep -n "overwrite"` over `src` shows the word now survives in `JsonModalBody.tsx` **only on the
`validatedDraft`-null fallback**, which the implementer correctly notes is unreachable while Load is
disabled without a validated draft — so in practice **the word is gone from the reachable dialog**.
**Does not match**: a confirmation whose text is composed elsewhere or passed as a variable; and it
does not evaluate the other two `withConfirmation` sites, which I read separately.

**The house style corroborates this.** The repo's other two confirmations both state their consequence:
`'Are you sure you want to clear this message?'` and `'Are you sure you want to refresh this message?
Your changes will be lost.'` After this commit the Load confirmation is the only destructive one that
does not.

**M2-c's stated criterion is met, and I want that on the record.** Its class is *"every Load whose
accepted object differs from the current `data` in components or flags"*, and over that class the
confirmation names the difference in one line — correctly, as the last three rows show. A Load
differing only in `content`, `embeds`, component **count** or **nesting** is outside that class, so the
criterion does not require naming it. **The defect is not a failure of M2-c; it is a regression
introduced alongside it** — the base warning was removed when the criterion only asked for it to be
augmented.

**Required Action — eliminate the class, not the four rows.**
- **Preferred (structural)**: make the overwrite statement unconditional and the diff an addition to
  it, so no computed branch can ever produce a body that omits the consequence. Something of the shape
  `This will overwrite the current message.` + (when there is a diff) ` It will remove …; add …; switch
  ….` The no-diff branch then reads as an overwrite with no *component or mode* change, which is both
  true and complete.
- **Minimum**: change the no-diff return so it still names the overwrite.

**Do not** simply widen the diff to cover content, embeds, counts and nesting. That is a larger change,
it is outside M2-c's criterion, and it would not fix the class — a wider comparison can still come up
empty and would assert absence just as confidently.

**Magnitude**: reachability is not hypothesised — the seeded-modal path is how this dialog is normally
reached, and CR12-A drives it. **Unmeasured**: the real-world ratio of edit-and-reload Loads to
paste-a-different-message Loads.

### INFO-1 — the spec's "no changes" test is purely negative, and it is what let HIGH-1 through

`describeLoadDiff`'s no-change test asserts only `not.toMatch(/remove/i)`, `not.toMatch(/add/i)`,
`not.toMatch(/switch/i)`. **Every one of those passes for the empty string.** Nothing pins what the
user is actually told on that branch, which is exactly the branch HIGH-1 is about.

The rest of the spec is strong — this one test is the gap, and it is the same shape as the standing
caution about negative assertions: a test that says only what a string *lacks* cannot notice that it
also lacks the thing that mattered. **Required Action**: whatever text the HIGH-1 fix lands on, pin it
positively on that branch.

## Positive observations

- **The TDD is the best on this plan.** Genuine red at `299b842~1`, independent literal expectations,
  and a spec that killed all three mutants I aimed at it — including a mutant on the flag-only mode
  path, which is the subtle one and has a test written specifically for it.
- **`isMessageV2` reused rather than reimplemented**, so the mode question is answered by the same
  predicate M7-a's criterion names. That is the right call and it is why M2 catches a flag-only change.
- **The `joinWithAnd` extraction is a real DRY win and is genuinely behaviour-preserving** — 2000 cases,
  identical, with a positive control. Extracting it *while* adding the second consumer is the right
  moment to do it.
- **The scope note is correct**: computing the diff pre-disposition is right, because this confirmation
  fires before Load commits anything, and M8-E's per-option `describeDropSet` remains the separate
  statement for row E's own choices.
- **The `validated` → `validatedDraft` rename** resolves a real shadow against `commitSettled`'s
  parameter rather than suppressing the rule.

## Assumption Not Checked

**This review assumes `message?.data` — the "current" side of the diff — is the same object the Load
will actually overwrite, and does not test it.** `computeLoadDiff(message?.data ?? {}, validatedDraft)`
reads provider state at render time, while `commitSettled` writes at confirm time. If anything mutates
`message.data` between the dialog opening and the user confirming (a cross-tab update, a Pusher event —
the architecture record names Pusher on this surface), the diff the user read describes a state that no
longer exists.

**Falsity signature**: a user who leaves the confirmation dialog open while another tab edits the same
message sees a diff naming types that are no longer present, and confirms an overwrite whose stated
effect differs from its real one.

**Owner: QA**, at Phase 2, with the cross-tab work M1 already touches; the discriminating check is to
open the dialog, mutate `message.data` from another source, and compare the rendered diff against a
diff recomputed at confirm time. Unreachable here without a component harness. Named in Next Steps.

## Captured instruments

| path | what it is |
|---|---|
| `verification/013/probe-cr12-load-confirmation/confirmation.cr12.test.ts` | 13 assertions: the dominant path, count/nesting invisibility, three correct-behaviour controls, the prior-vs-new comparison, and CR12-E's 2000-case behaviour-preservation differential with a positive control |
| `…/probe-cr12-load-confirmation/vitest.cr12.config.ts` | its config |
| `…/probe-cr12-load-confirmation/run-cr12-299b842.txt` | the run — 13/13 |
| `…/probe-cr12-load-confirmation/dialog-table.txt` | the seven dialog bodies |
| `…/probe-cr12-load-confirmation/README.md` | the claim, the transcription limit, blind spots |

**The mutation run is not captured as a file** — it was three in-place edits to a `/tmp` extraction,
reproduced in the round-12 table above with its exact mutants. `no test` for it as a standing
instrument: it is a one-off audit of a spec, not a property of the tree, and re-running it means
re-applying the three mutants listed.

## Required Actions

1. **HIGH-1** — the confirmation must state the overwrite on every reachable path. Preferred: make the
   overwrite sentence unconditional and the diff additive.
2. **INFO-1** — pin the no-diff branch's text positively once HIGH-1 lands.

## Next Steps

1. **`implementer-hooks-013-3`** — HIGH-1 then INFO-1. Both are local to `describeLoadDiff` and its one
   call site; neither needs a new function.
2. **QA** — this round's Assumption Not Checked (the diff is computed at render, applied at confirm);
   plus the carried ones from rounds 9 and 11, and round-8 INFO-1.
3. **A planner pass, when that queue reopens** — MEDIUM-1's reach into M4's Risks, unchanged.

---

# ROUND 13 — the round-12 fix round, at `7890fc9`

**Reviewed-At**: `7890fc90600fd53ffe810a5cf78d0a9a5698aafd` (chain branch
`chain/013-components-v2-editing-surfaces`). Verified at the start of the pass and again at the end;
the tree did not move. `agent-output` at `4d00fa1` on entry.

**Verdict: APPROVED.** HIGH-1 is closed structurally — the Preferred fix, taken exactly as specified —
and INFO-1 with it. **M2-c is complete.** Nothing holds the tree.

**But the class sweep was incomplete, and re-running it found two sites the implementer's predicate
could not see — one of which is a genuine member.** It is pre-existing, untouched by chain 013, and is
routed to steering as a handoff candidate rather than held against this commit.

## Scope actually assessed

`git diff --numstat 299b842 7890fc9` → two files: `src/utils/index.ts` (**3/2**) and
`013-m2c-load-diff.test.ts` (10/1). `JsonModalBody.tsx` unchanged — correct, since both actions were
local to `describeLoadDiff`.

## Verification re-run — nothing inherited

| claim | instrument | result |
|---|---|---|
| typecheck | `npx tsc --noEmit` | **exit 0** |
| lint | `npx eslint src/utils/index.ts --max-warnings=0` | **1 error**, the same pre-existing `import/no-cycle` |
| failure **set** unchanged | `check-expected-six.sh 7890fc9` | **MATCH**, clean **494/488/6** |
| the pairing's other half | `probe-cr3-mode-predicate/` | **122/122** |
| earlier findings still where routed | `probe-cr9` / `probe-cr11` | **24/24** / **17/17** |
| this round | `probe-cr13-overwrite-closure/` | **16/16** |

**Pairing run, both halves.** **T2 at `7890fc9`: empty**, both controls firing — **sixth consecutive
round; M8-G still unwired.** The implementer's true figure **494/488/6** is reproduced exactly.

## HIGH-1 — CLOSED, structurally

```js
const overwrite = 'This will overwrite the current message.';
if (!parts.length) return overwrite;
return `${overwrite} It will ${parts.join('; ')}.`;
```

The sentence is built unconditionally and the diff is additive. **No branch can omit it** — that is the
Preferred fix, and it makes the class unrepresentable rather than patching the four rows round 12
listed.

**Established by execution** (`probe-cr13-overwrite-closure/`, 16/16, `closure-and-sweep.txt`): all
eight round-12 paths now state the overwrite, including the four that did not; the diff clauses are
still present and correct where a diff exists; and an **exhaustive sweep of the 18-cell diff space**
(removed × added × modeChanges) confirms no input produces a body lacking the sentence.

**Control**: the `299b842` body, transcribed verbatim, **fails** the same assertion on the no-diff
paths. So the closure is a measurement, not a vacuous pass. **Captured check**:
`probe-cr13-overwrite-closure/closure.cr13.test.ts`, block **CR13-A** — **this is the check that fails
if the class returns**, and unlike CR10 it imports the real function, so it reads the tree.

**TDD verified, not accepted**, and this round's red is stronger than the last. I extracted `7890fc9~1`
and ran the new spec: **2 failed**, with

```
AssertionError: expected 'No component or mode changes.' to match /overwrite/i
AssertionError: expected 'This will add Container.' to match /overwrite/i
```

These are **behavioural** reds, not `is not a function` — they fail against a real, wrong
implementation, which is the stronger form. **INFO-1 is closed by the first of them**: the no-change
branch is now pinned positively, and the second test confirms a genuine diff still opens with the
unconditional sentence rather than only the clauses.

## `probe-cr12` has expired, correctly — and it is the contrast round 11 predicted

`probe-cr12` now reports **6 failed / 7 passed** at `7890fc9`. **Those six failures are the fix
working**: they assert the `299b842` strings, which no longer exist. Marked in the instruments README
alongside CR5-B/C/D and CR6-C, which expired the same way.

**This is worth naming because it validates round 11's distinction.** CR12 **imports** the real
`describeLoadDiff`, so it reads the tree and expires when the tree changes. `probe-cr10`
**transcribes** its subject, so it never expires and reported 12/12 on a tree where its defect was
fixed. Same author, three rounds apart; the difference is entirely whether the instrument imports or
transcribes. Prefer importing wherever the subject is importable.

## The class sweep — re-run, predicate broken, and two sites recovered

The implementer swept `grep -rn "withConfirmation(" src --include="*.tsx"` → 3 hits, and reported
"no other hit to disposition". **I did not accept that.** The predicate cannot see:

- **`showConfirmation(`** — the underlying call that `withConfirmation` merely wraps
  (`ConfirmationProvider.tsx:66`), so any direct caller is invisible to it;
- **`.ts` files** — the `--include` is `*.tsx` only.

Broadened (`git grep -n "showConfirmation(\|withConfirmation(" 7890fc9 -- 'src/**/*.ts' 'src/**/*.tsx'`),
the sweep returns **five** call sites, not three:

| site | how called | disposition |
|---|---|---|
| `JsonModalBody.tsx:215` | `withConfirmation` | **FIXED this round** |
| `Navigation.tsx:132` (Clear) | `withConfirmation` | static string, no computed branch — **not a member** |
| `Navigation.tsx:161` (Reload) | `withConfirmation` | **MEMBER** — via `enabled: hasChanged` |
| `DiscordMessageEditor/index.tsx:228` | `showConfirmation` | **missed by the predicate.** Computed message (ternary on `targetMode`) — but **both branches assert a loss**, and `enabled: hasDepartingData` matches what `applyModeSwitch` actually removes. **Not a member.** |
| `usePusher.ts:43` | `showConfirmation` | **missed by the predicate** (`.ts`). **MEMBER.** |

**Does not match**, stated for my own predicate: a confirmation whose options object is built elsewhere
and passed by reference, and any dialog not routed through `ConfirmationProvider` at all
(`WarningDialog.tsx` is a separate component and was not swept).

### The two members share one root cause — and it is not this chain's

`hasChanged`, at `MessageProvider/index.tsx`:

```js
const hasChanged = useMemo(
  () => status === 'authenticated' && !typedDeepEqual(savedMessage?.data, message?.data), …);
```

**It is false for an unauthenticated user no matter how much they have edited**, because it is gated on
the session rather than on the data. Executed (CR13-B, with `typedDeepEqual` the real function): the
same edit gives `true` when authenticated and `false` when not.

Both dependents then misbehave, and the second is worse than the first:

1. **`usePusher.ts:43`** — the cross-tab reload prompt is
   `…Would you like to reload it?${hasChanged ? ' Any changes you have made will be lost.' : ''}`.
   An unauthenticated user with unsaved edits is asked to reload **with the data-loss clause omitted**.
   That is the class exactly: the message asserts, by omission, an absence of loss on the strength of a
   comparison narrower than the loss.
2. **`Navigation.tsx:161`** — the Reload button passes `enabled: hasChanged`, and
   `ConfirmationProvider.showConfirmation` does `if (!options.enabled) { void options.onConfirm(); }`.
   So for an unauthenticated user **the dialog is skipped entirely** and `reloadMessage` runs
   immediately. Asserted in CR13-B against the provider's own transcribed logic: no dialog shown, the
   destructive action ran.

**Routing — this does not hold the tree, and I am not asking for it to be fixed here.** It is
pre-existing, untouched by chain 013, and outside every milestone in this plan. It is the same shape as
CRITICAL-1: real, out of scope, and needing an owner decision rather than a chain fix. **Recommended to
steering as a handoff candidate**; I have not written a handoff document, which is not mine to author.

**What I could not establish**: whether an unauthenticated user can reach a state with meaningful
unsaved edits on a message that also receives Pusher updates. `usePusher` requires
`isApiMessage(messageRef.current)` — a saved message with an id — which a public link satisfies, but I
did not stand the app up to confirm the editing surface is live for that user. **Stated as unmeasured
rather than asserted.**

## Positive observations

- **The Preferred fix was taken exactly as specified**, and the shape is right: one unconditional
  sentence, clauses appended. `3/2` on the production file — no scope growth.
- **The instruction not to widen the diff was followed**, and the reasoning was restated correctly
  rather than just obeyed.
- **The red is behavioural this time.** `expected 'No component or mode changes.' to match /overwrite/i`
  is a test failing against a real wrong implementation — a stronger gate than the previous round's
  existence reds, and it came from INFO-1 being fixed properly rather than minimally.
- **The implementer ran a class sweep unprompted and reported its predicate.** That it was incomplete is
  a finding; that it was *stated in a form I could break* is why the two missed sites were recoverable
  at all. A sweep reported as a bare conclusion would have hidden them.

## Assumption Not Checked

**This review assumes `withConfirmation` and `showConfirmation` are the only routes to a modal
confirmation in this application, and does not test it.** The sweep above is complete over those two
names; `src/components/WarningDialog.tsx` exists as a separate component with its own `message: string`
prop and was **not** swept, because it is not routed through `ConfirmationProvider`.

**Falsity signature**: a destructive action in this app presents a confirmation whose text is composed
by something other than `ConfirmationOptions`, so a future sweep of this class over those two names
reports "no members" while one is on screen.

**Owner: QA**, at Phase 2, as a one-line addition to whatever inventory it builds of destructive-action
surfaces — the discriminating check is to enumerate `WarningDialog`'s consumers and ask whether any
guards an irreversible action. Named again in Next Steps.

## Captured instruments

| path | what it is |
|---|---|
| `verification/013/probe-cr13-overwrite-closure/closure.cr13.test.ts` | 16 assertions: HIGH-1's closure over all eight round-12 paths with a `299b842` control, an exhaustive 18-cell structural sweep, and CR13-B's execution of the `hasChanged` conflation at both dependent sites |
| `…/probe-cr13-overwrite-closure/vitest.cr13.config.ts` | its config |
| `…/probe-cr13-overwrite-closure/run-cr13-7890fc9.txt` | the run — 16/16 |
| `…/probe-cr13-overwrite-closure/closure-and-sweep.txt` | the closure table and the five-site sweep with dispositions |
| `…/probe-cr13-overwrite-closure/README.md` | the claims, what is imported vs transcribed, blind spots |

## Required Actions

**None against this tree.** HIGH-1 and INFO-1 are closed; M2-c is complete.

## Next Steps

1. **`implementer-hooks-013-3`** — nothing outstanding from code review. Next unit is **M8-G**, the five
   persisting writers, per steering. **That is the round T2 finally fires**, and it owes the
   persist-path attack against a running instance: assert the negative **on the persistence surface**
   (no `message.upsert` before a choice), never on a response status. `.env.local` points at a **remote
   hosted database** — use a dummy env with `DATABASE_URL` on a dead port, which is both the safe option
   and the one that makes the oracle work. There is no `schema.prisma` in this repo.
2. **`steering-hooks-013-2`** — the `hasChanged` conflation as a **handoff candidate**: pre-existing,
   out of chain scope, two confirmation sites affected, evidence captured in `probe-cr13`. An owner
   decision, not a chain fix, and not mine to author as a handoff document.
3. **QA** — this round's Assumption Not Checked (`WarningDialog` is outside the confirmation sweep),
   plus the carried ones from rounds 9, 11 and 12, and round-8 INFO-1.
4. **A planner pass, when that queue reopens** — MEDIUM-1's reach into M4's Risks, unchanged.

---

# ROUND 14 — M8-G, the five-writer persist gate (D18), at `66e1974`

**Reviewed-At**: `66e1974519df1497423b154c17f22618459f7fe0` (chain branch
`chain/013-components-v2-editing-surfaces`). Verified at the start of the pass and again at the end;
the tree did not move. `agent-output` at `975bfa6` on entry, `e1305c9` after the implementer's doc
landed.

**Verdict: APPROVED_WITH_COMMENTS.** M8-G's stated criterion is **met and verified** — every real
persisting writer is gated on row E, both canned-intro writers are confirmed non-members, the
`stripKeys` deletion is retired with an independently-reproduced TDD red, and the persist surface
holds auth under raw-socket attack. **This is the round T2 finally fired, and the persist-path attack
it owed was run.** Two findings, neither holding the tree: **one MEDIUM regression** that M8-G's own
retirement of `stripKeys` exposes (a predicate divergence, structural root pre-existing), and **one
LOW** (the choice UI triplicated, its copies already diverging on dismissal). Both routed.

## Scope actually assessed

`git diff --numstat 7890fc9 66e1974` → eight files: `NewMessageModal.tsx` (251/197),
`SaveAsMenu.tsx` (61/3), `SaveChoiceModal.tsx` (44/0, new), `MessageProvider/index.tsx` (27/3),
`useApiMethods.ts` (32/5), `utils/index.ts` (0/4, the deletion retired), and two test files
(`components-v2-data-layer.test.ts` 5/3, `mutual-exclusivity.test.ts` 22/15). Read via `git show`,
not the working tree.

## T2 FIRED — for the first time in seven rounds

```
git grep -c "gateBeforePersist\|applyDisposition\|resolveContentLoss" 66e1974 -- <the five writer paths>
```

returns three hits — `NewMessageModal.tsx:3`, `SaveAsMenu.tsx:3`, `useApiMethods.ts:3` — where every
round 7–13 returned empty. **Path control**: all five paths `git cat-file -e` clean at `66e1974`.
**Predicate control**: `import` over the same five returns a hit in all five, so the three-of-five
result is a real partition (two writers are the canned-intro pages, which are not members — see the
sweep), not a broken predicate.

## Verification re-run — nothing inherited

| claim | instrument | result |
|---|---|---|
| typecheck | `npx tsc --noEmit` | **exit 0** |
| lint (changed files) | `npx eslint <6 changed src files>` | **1 error**, the same pre-existing `import/no-cycle` in `utils/index.ts` — and the M8-G diff changed **no** import line, confirmed by `git diff 7890fc9 66e1974 -- src/utils/index.ts | grep '^[-+]import'` → empty |
| failure **set** unchanged | `baseline-expected-six/check-expected-six.sh 66e1974` | **MATCH**, clean **494/488/6**, the six pinned failures by identity and reason |
| the pairing's other half | `probe-cr3-mode-predicate/` | **122/122** |
| this round | `probe-cr16-persist-gate/` | **21/21** |

**Never taken from the working tree.** The comparator runs its own clean `git archive` extraction, so
the implementer's shared-tree raw figure (501/495/6) was not used; the clean figure is 494/488/6.

## The milestone criterion IS met — verified three ways

**1. The writer sweep, re-run and the predicate broken.** The implementer enumerated
`api.message.upsert.useMutation|upsertMessage(` → 15 lines and dispositioned each. I re-ran it
independently and broke it two further ways: (a) the server-side `upsertMessage` and the tRPC router
sites are not client writers (confirmed); (b) I enumerated the **v1 API write surface** the client
sweep cannot see — `src/pages/api/v1/guilds/.../messages{,/[id]}.ts` — and both are `GET`-only
(`if (req.method !== 'GET') return res.status(405)`), so there is no server-side persisting writer
outside the tRPC path. The client persisting-writer set is exactly five, and:

| writer | disposition | verified |
|---|---|---|
| `useApiMethods.saveMessage` (Save item/hotkey + edit-page Save) | **gated** — `gateBeforePersist(draft.data)` before `upsertMessage`; the gate lives inside `saveMessage`, so both call sites inherit it | read |
| `SaveAsMenu.onSubmit` | **gated** — `gateBeforePersist` before `submitData` | read |
| `NewMessageModal.onSubmit` | **gated** — covers all four `loadedMessage` sources | read |
| `m/new/page.tsx` (two buttons) | **not a member** — `copyIntroMessage()` has no `components` key, so `resolveContentLoss` can never return row E | `copyIntroMessage.ts` read: fixed classic content, `components` absent |
| `f/[id]/page.tsx` | **not a member** — same `copyIntroMessage()` payload | read |

**2. The TDD red reproduced independently, and it is behavioural.** I built an old-source + new-test
tree — `git archive 7890fc9` overlaid with the two M8-G test files from `66e1974` — and ran them:
**5 failed**, including the exact `AssertionError: expected undefined to be 'Hello world'` the
implementer reported, plus `expected undefined to be 'Kept'` and `…to be 'keep'`. One roundtrip test
+ four mutual-exclusivity tests = the claimed 1 + 4. These fail against **real deleting code**, the
strong form, not `is not a function`.

**3. The `stripKeys` retired-deletion sweep, re-run and broadened.** The implementer searched
`src/utils/__tests__/*.test.ts`; I broadened to every `*.test.ts`/`*.test.tsx` in `src` and to every
non-test consumer of `stripKeys`/`saveAsPayload`/`jsonModalSeed`. No test outside `src/utils/__tests__`
references the retired behaviour; the two non-test consumers I had not seen are dispositioned below.

## The adversarial obligation — discharged

M8-G's gate is entirely client-side, so the question the attack answers is: **what does the
persistence surface do with a row-E payload the client gate never saw?** An isolated instance was
built at `66e1974` (`git archive` + `cp -al node_modules` — Turbopack rejects an out-of-root symlink,
per round 7), a **wholly dummy** `.env.local` with `DATABASE_URL` on dead port `59999` set **also
explicitly in the process env** (per probe-cr14, `override:true` would defeat it but Next's loader
does not use it), `next dev -p 3118`. **Before attacking**, the entry point's module-scope branch —
`middleware`'s `startsWith('/api/v1/*')` — was enumerated and its live value checked.

**Oracle, fixed before the attack** (`probe-cr16-persist-gate/attack-persist.py`): `UNAUTHORIZED` with
no persistence reach = auth holds; any `ECONNREFUSED`/`59999`/kysely/postgres/`"result"` = the
resolver reached the persistence surface.

**Input class enumerated**: `message.upsert` with a row-E body (V2 component + classic content), the
empty-embed divergence body, batch and non-batch tRPC envelopes, and a v1-read control.

**Result** (`attack-persist-out.txt`):
- Every upsert body: **401 Unauthorized, no DB reach.** `upsert` is a `protectedProcedure`; an
  unauthenticated attacker **cannot** persist. No new CRITICAL on the persist path.
- The server input shape `optionalIdMessageShape` carries **no** mutual-exclusivity refinement and
  **no** `filterSupportedComponents` (read from `shapes.ts`). So once authenticated, the **only** gate
  between a row-E payload and the DB is client-side — which is what makes the MEDIUM below reach
  persistence for the ordinary authenticated user.
- **Control D reconfirmed CRITICAL-1 live**: an unauthenticated `GET /api/v1/guilds/…/messages`
  reached the backend (ioredis on the dead port), so the guard did **not** fire. Pre-existing, already
  handoff-dispositioned — **not re-escalated**, recorded only.

## MEDIUM-4 — the persist gate's "has content" is narrower than the send floor's; M8-G exposes it as a save-but-unsendable regression

**Location**: `resolveContentLoss` via `hasClassicContent` (`src/utils/index.ts`, symbol
`hasClassicContent`) vs `validateContentRequirements` (`src/utils/limits.tsx`, symbol
`validateContentRequirements`), the two predicates on either side of the persist decision.

**Class**: a persisted draft is gated on one definition of "has classic content" and validated for
sending on a **different** one; wherever they disagree, the gate stays silent and the message
persists in a state the send floor rejects. `hasClassicContent` `.trim()`s content and, for embeds,
counts only those with a non-empty non-`_key` field; `validateContentRequirements` counts
`embeds.length > 0` bare. The class is every empty-ish embed (and any content the two trim
differently) carried alongside a V2 component.

**Enumeration**: `git grep -n "content\.trim()\|embeds\.length > 0\|embeds && .*length" 66e1974 --
'src/**/*.ts' 'src/**/*.tsx' | grep -v __tests__` → **3** definitions of "has classic content":
`utils/index.ts:37-38` (the gate), `limits.tsx:115` (the send floor), and `backfillValid.ts:94` (a
migration script, reads content only — not on this path). Does **not** match: a fourth definition
built inline inside a component, or one phrased over a renamed local. Executed divergence table
(`probe-cr16` CR16-A, `divergence.txt`): for `{}`, empty-title, `_key`-only, empty-`fields`, and
two-empty-embeds — **gate silent, floor blocks**; whitespace content and genuine content/embeds —
**agree**. So the class is exactly the empty-ish embeds.

**Reachability, disposition order applied**. Through the editor's own buttons: **not reachable** —
`showEmbedButton` requires `isClassicMode`, `showComponentButton` requires `isV2Mode`
(`DiscordMessageEditor/index.tsx:201-204`), mode-exclusive. Through **paste/import**: **reachable and
a regression** — every `embedShape` field is `.optional()` so `{}` survives
`discordMessageImportShape.parse`, and `filterSupportedComponents` keeps the V2 component (CR16-E,
end-to-end through the real shape). Post-M8-G the empty embed is **retained** → content-invalid →
unsendable; pre-M8-G `stripKeys` **deleted** it → valid → sendable (CR16-E control). The `valid`
column feeds `buildMessageValues` (`server/api/utils/shared.ts:209`) and is **exposed by the v1 API**,
so the degraded state is externally visible.

**Magnitude** (stated, not measured against traffic): the input is **malformed paste only** — real
Discord JSON with `flags=32768` never carries content/embeds, and the editor cannot build the
combination — so the class is narrow. The failure is **fail-safe** (marked invalid, will not send bad
data to Discord) and **loses no data** (retained). What it does is convert a previously working
save-and-send into a silent save-but-unsendable **with no choice offered** — which is precisely the
failure mode D18 exists to prevent, for this one input class.

**This instantiates the plan's D18 risk** that a gate keyed on a different predicate than the
validator leaves an unguarded gap; name that row when the planner writes the prediction record.

**Required Action — eliminate the class, do NOT restore the deletion.** Re-adding
`delete embeds/content` to `stripKeys` would reintroduce exactly the class D18 removed — that tidy is
not acceptable. **Preferred (structural)**: make the persist gate and the send floor read **one**
"has classic content" predicate, so a draft the floor will reject cannot pass the gate unasked.
**Minimum**: clean truly-empty embeds at the import/editor boundary (not the serialiser) so the
divergent input never forms. Captured check: `probe-cr16-persist-gate/gate.cr16.test.ts` blocks
CR16-A/B/E — **this is the check that fails if the class returns** (it imports the real predicates).

## LOW-3 — the row-E choice UI is triplicated and its copies already diverge on dismissal

**Location**: `SaveAsMenu.tsx` (symbol `SaveAsMenu`, the inline `pendingChoice` branch),
`NewMessageModal.tsx` (its inline branch), and `SaveChoiceModal.tsx` (the extracted component,
consumed only by `MessageProvider/index.tsx`).

**Class**: the same "Are you sure? / choose which to keep / nothing is saved until you choose" dialog
is reimplemented per call site, and dismissing it (Escape / backdrop → `PresetDialog`'s `onClose`)
does not uniformly clear the pending choice. `SaveChoiceModal` passes `onClose={onCancel}` (clears);
`NewMessageModal` passes `onClose={pendingChoice ? cancelChoice : onClose}` (clears); **`SaveAsMenu`
passes `onClose={onClose}` (does not clear)**. `SaveAsMenu` is mounted whenever `message` is truthy
(`Navigation.tsx:415`), so its `useState` survives the close, and reopening shows the stale choice
rather than the form (CR16-D, a state-machine model with the correct wiring as control).

**Enumeration**: `git grep -c "cannot show both" 66e1974 -- 'src/**/*.tsx'` → **5** copies of the
shared paragraph (`NewMessageJsonInput`, `NewMessageModal`, `JsonModalBody`, `SaveAsMenu`,
`SaveChoiceModal`); of the three that own a `PresetDialog` for the **save** choice, one uses the
extracted component and two are inline. Does not match: a dialog whose text is composed elsewhere and
passed by prop.

**This is the round-9 MEDIUM-3 class recurring in a new copy** — dismissal stranding choice state —
which was closed for the paste surface and has reappeared because the UI was copied rather than
reused. **Severity LOW** because the stranded state is not stale-*data*-dangerous (the message data is
unchanged, so the re-shown choice is still correct) and the user can clear it via the dialog's own
Cancel; it is a UX oddity, not a wrong write.

**Required Action. Preferred (structural)**: consume `SaveChoiceModal` at all three save sites, so the
dismissal contract exists once. **Minimum**: change `SaveAsMenu`'s branch to
`onClose={pendingChoice ? cancelChoice : onClose}`, matching `NewMessageModal`.

## Two non-test consumers of the changed `stripKeys`, examined and cleared

`stripKeys`' output changed for V2+content inputs, so every consumer of its result was checked, not
just the writers:

- **`send/page.tsx:93`** (`stripKeys({ data: message.data }).data`, the wire form) — **fail-closed.**
  `allowSave` requires `isMessageValid`, and `validateContentRequirements` blocks V2+content
  (including the empty embed — I verified the floor catches it), so no row-E or divergence draft
  reaches the send. The implementer's "left untouched, nothing reachable changed" claim holds.
- **`usePusher.ts:17`** (`normalizeForHash` → `stripKeys` → `discordMessageShape.safeParse`) — **hash
  parity preserved.** `stripKeys` is one shared function versioned on both sides of the hash, so its
  change moves client and server together; existing persisted messages already carry no residual
  content (they were stripped at save), so their hash is unaffected. The only exposure is a message
  edited **across the deploy boundary** seeing a transient, self-correcting reload prompt — routed to
  QA as this round's Assumption Not Checked.

## Positive observations

- **The Preferred shape was taken for the retirement**: the deletion is gone and the gate is wired at
  the writer, not bolted back onto the serialiser — exactly D18's placement.
- **The gate lives inside `saveMessage`**, so the Save item, the Save hotkey, and the edit-page Save
  button all inherit it from one site rather than three parallel guards.
- **The class sweep was reported with its enumeration commands and every hit's disposition**, in a
  form I could break — which is why the v1 write surface and the two extra consumers were checkable at
  all.
- **The TDD red is behavioural**, and the implementer named the exact assertion, which reproduced
  verbatim.

## Assumption Not Checked

**This review assumes the authenticated persist of a row-E / empty-embed draft behaves as the server
shape implies — reaching the DB and being stored with `valid = false` — and does not test it.** The
isolated instance cannot mint a real session, so the reach past auth is argued from
`optionalIdMessageShape` carrying no mutual-exclusivity refinement (read), not executed against an
authed session.

**Falsity signature**: a hidden server-side refinement rejecting row E would make the authenticated
save fail with a 4xx rather than persist `valid=false`; `shapes.ts` shows none, but only an
authenticated save proves it.

**Owner: QA**, Phase 2 — one authenticated save of a pasted V2 + empty-embed message, asserting the
stored row's `valid` and the send button's disabled state. Named again in Next Steps. (The
cross-deploy hash-parity question above rides the same QA pass.)

## Captured instruments

| path | what it is |
|---|---|
| `verification/013/probe-cr16-persist-gate/gate.cr16.test.ts` | 21 assertions: CR16-A the gate-vs-floor divergence table (imports both real predicates), CR16-B the empty-embed persisted-then-unsendable path with a 7890fc9 `stripKeys` control, CR16-D the SaveAsMenu strand as a state machine with the correct wiring as control, CR16-E the end-to-end reachability + regression through the real import shape |
| `…/probe-cr16-persist-gate/divergence.txt` | the CR16-A table |
| `…/probe-cr16-persist-gate/attack-persist.py` | the raw-socket persist-surface attack, oracle fixed before the run |
| `…/probe-cr16-persist-gate/attack-persist-out.txt` | its result — auth held on every upsert body, CRITICAL-1 reconfirmed on the v1 control |
| `…/probe-cr16-persist-gate/server-boot-and-attack.txt` | the isolated instance's boot + the ioredis-on-dead-port reach that reconfirmed CRITICAL-1 |
| `…/probe-cr16-persist-gate/README.md` | claims, imported-vs-transcribed, reachability disposition order, blind spots |

## Required Actions

**None hold the tree.** M8-G is complete: the milestone criterion is met and verified. MEDIUM-4 and
LOW-3 are regressions/quality findings routed for a follow-up fix, neither a data-loss nor a security
issue, both fail-safe.

## Next Steps

1. **`implementer-hooks-013-3`** — M8-G approved. **MEDIUM-4**: align the persist gate and send floor
   on one "has classic content" predicate (Preferred) or clean empty embeds at the import boundary
   (Minimum) — **do not restore `stripKeys`' deletion**, which reintroduces D18's class. **LOW-3**:
   consume `SaveChoiceModal` at all three save sites (Preferred) or fix `SaveAsMenu`'s `onClose`
   (Minimum). `probe-cr16` is the captured check for both. Remaining milestones after this: M3, M4, M6.
2. **`steering-hooks-013-2`** — MEDIUM-4 instantiates the D18 predicate-divergence risk; it is a
   regression this commit introduced (root pre-existing in `hasClassicContent`), narrow (malformed
   paste), fail-safe. Flagged for the prediction record, not held.
3. **QA** — this round's Assumption Not Checked (authenticated persist of a row-E/empty-embed draft →
   `valid=false`; and the cross-deploy hash-parity transient), plus the carried ones from rounds 9,
   11, 12, 13, and round-8 INFO-1.
4. **A planner pass, when that queue reopens** — MEDIUM-1's reach into M4's Risks, unchanged.

**CRITICAL-1's `Review-Trigger` binds again before chain 013 closes** (the deploy puts the v1
guild-messages endpoints back in front of traffic); raise at chain close, do not re-escalate as
IMMEDIATE. Confirmed live again this round on control D, unchanged.

---

# ROUND 15 — M3, Discord ingress carries V2 (M3-a/b/c), at `12f4ce6`

**Reviewed-At**: `12f4ce672edc914be3e7998f8488a39dc3204393` (chain branch
`chain/013-components-v2-editing-surfaces`). Verified at the start of the pass and again at the end;
the tree did not move. `agent-output` at `f8dd433`. **First pass, not a fix round** — the sweep is
the whole surface.

**Verdict: APPROVED_WITH_COMMENTS.** M3's three sub-criteria are **met and verified**: M3-a carries
components and the flag (whole-field flags copy is the ruled-correct pass-through), M3-b's residue is
bounded and loud over its **declared class** with the converter's kept-set exactly matching the strict
persist shape, and M3-c refuses empty success fail-safe. TDD red reproduced independently (9 fails,
`TypeError` on the new return shape). Two findings, neither holding the tree: **one MEDIUM** (a
Section-accessory gap outside M3-b's declared class that reintroduces the D9-avoided opaque failure on
ingress) and **one LOW** (the committed tree does not pass the lint gate). Plus **one INFO** that
corrects a round-14 miss of my own.

## Architectural grounding EXISTS — re-checked, not inherited

`agent-output/architecture/system-architecture.md` (first heading `# System Architecture — Hooks.gg`)
and `agent-output/architecture/013-components-v2-editing-surfaces-architecture-findings.md` (verdict
rev 10 APPROVED) **both exist**, established by directory listing and first-line reads, not carried
from a predecessor. The paths are workspace-absolute under `/usr/local/bin/hooks/agent-output/`. This
matters because a **round-6 claim of architectural absence was false**, and this milestone's sharpest
question is settled **by the architecture doc's own owner ruling** (below).

## Scope actually assessed

`git diff --numstat 66e1974 12f4ce6` → ten files: the converter `discordResponseToMessage.ts`
(98/2), three ingress entry points (`message.ts` 4/2, `useValidateWebhook.ts` 8/1,
`redis/messageStore.ts` 5/3), two notice-rendering sites (`NewMessageModal.tsx` 14/1,
`MessageProvider/index.tsx` 6/0), one type (`global.d.ts` 1/0), and three new test files. Read via
`git show`, not the working tree.

## Verification re-run — nothing inherited

| claim | instrument | result |
|---|---|---|
| typecheck | `npx tsc --noEmit` | **exit 0** |
| lint gate | `npx eslint <touched> --max-warnings=0` (JSON, filter-immune) | **FAILS** — see LOW-5; the M3-new error is real, `global.d.ts` + one 136-char line are pre-existing |
| failure **set** unchanged | `baseline-expected-six/check-expected-six.sh 12f4ce6` | **MATCH**, clean **504/498/6** |
| the pairing's other half | `probe-cr3-mode-predicate/` | **122/122** |
| this round | `probe-cr17-ingress/` | **15/15** |

**Never taken from the working tree.** The comparator runs its own clean `git archive` extraction, so
the implementer's shared-tree raw figure (511/505) was not used; the clean figure is 504/498/6, same
six pinned failures by identity and reason.

## The sharpest question — the `flags` copy — is settled by the owner's ruling, in favour of the code

The converter copies the **whole** Discord `flags` bitfield (`if (discordMessage.flags) message.flags
= discordMessage.flags`), not only the V2 bit, and the old converter carried **no** flags at all — so
this is new. `sendWebhook.ts:67` serialises the whole `message` (including `flags`) into
`payload_json`, and Discord honours `SUPPRESS_EMBEDS`/`SUPPRESS_NOTIFICATIONS` on webhook execute — so
I first read this as an over-copy that would re-apply inherited suppress bits on send.

**It is not a defect.** `system-architecture.md:91` carries an explicit owner ruling: *"V2 is the only
one the product has an opinion about … Every other Discord bit (4 `SUPPRESS_EMBEDS`, 4096
`SUPPRESS_NOTIFICATIONS`, and any future one) is user data that passes through every surface unexamined
and unchanged."* Whole-field pass-through is the **ruled-correct** behaviour; carrying only the V2 bit
would violate it. I checked the ruling before raising the finding, and it dissolves it. (`probe-cr17`
CR17-A records the round-trip as conformant.)

## M3-a — MET

Components carried; the V2 bit copied from Discord's `flags`, never derived from structure. Both D12
partition halves hold: (i) a V2-typed message keeps the bit and `hasV2Components` is true; (ii) a
V2-marked Action-Rows-only message keeps the bit with `hasV2Components` false and passes
`validateContentRequirements`. Whole-flags pass-through as above.

## M3-b — MET over its declared class; the accessory gap is MEDIUM-5

**The core is correct, established by execution** (`probe-cr17` CR17-B): the converter's kept sets are
`{1,9,10,12,13,14,17}` top-level and `{1,9,10,12,13,14}` container-child — an **exact match** with the
strict persist shape's discriminated-union discriminants, so nothing carried fails persist on type and
nothing supported is over-dropped. Unsupported top-level types (e.g. Select), unsupported
container-children, and non-link buttons **inside Action Rows** are dropped and **labelled**, and the
label travels to each entry point's own receiving end: the import dialog for URL/webhook
(`NewMessageModal`, `discordMessage?.droppedComponentTypes ?? webhookDroppedComponentTypes`) and a
`toast.warn` on the code path (`MessageProvider` `codeMessage` effect). The code-path toast is keyed on
`codeMessage`, which is stable react-query data (`staleTime: Infinity`), so it fires once — **not** the
round-9 re-fire pattern. The full converter-caller sweep (`git grep discordResponseToMessage`) is three
sites, all three surfacing the residue; there is no fourth ingress path.

### MEDIUM-5 — a Section accessory is never filtered, so a non-link accessory fails opaquely on ingress

**Location**: `src/utils/discordResponseToMessage.ts`, symbol `filterTopLevelComponent` (and
`filterContainerChild`) — a `type === Section` is returned whole without inspecting its `accessory`.

**Class**: an unsupported component reaching persist via **ingress** without being named in
`droppedComponentTypes`, producing the opaque Zod failure D9 exists to eliminate. The converter filters
top-level types, container-child types, and Action-Row buttons — but a **Section accessory** is none of
those, so it is never inspected. The strict `sectionShape.accessory` is
`z.union([thumbnailShape, linkButtonShape])`; a Section whose accessory is a **non-link (interactive)
button** (a valid Discord shape from another bot) is carried unnamed and rejected only at
`message.upsert` with an opaque error.

**Enumeration**: `git grep -n 'accessory' 12f4ce6 -- src/utils/discordResponseToMessage.ts` → **0**
hits (the converter never touches accessories); `… src/server/api/utils/shapes.ts` → the
`sectionShape.accessory` union (line 76). Does **not** match: an accessory whose shape happens to
satisfy the union (a Thumbnail, or a link button) — those persist fine, so the class is exactly
non-link-button accessories (and any future non-union accessory type). Established by execution
(`probe-cr17` CR17-C, CR17-E): the converter carries it with `droppedComponentTypes === []`, then
`discordMessageShape.safeParse` fails; the **paste** path rejects the same shape loudly at paste via
`discordMessageImportShape`, so this is **ingress-specific** — ingress defers to an opaque save-fail
where paste fails loud.

**Magnitude** (unmeasured, stated as such): reachability is **narrow** — it needs another bot's V2
Section carrying an interactive-button accessory, imported by URL/webhook/code — and the outcome is
**fail-safe** (the save fails; nothing corrupt is stored). Impact is a confusing unexplained save error
rather than data loss.

**Required Action — eliminate the class, don't special-case the site. Preferred (structural)**: filter
Section accessories in the converter as ActionRow buttons already are — drop a non-link-button
accessory and add its label to `droppedComponentTypes` — and mirror it on the paste path's
`filterSupportedComponents` so the two agree. **Minimum**: drop the accessory and name it on the
converter alone. Captured check: `probe-cr17-ingress/ingress.cr17.test.ts` CR17-C/CR17-E — **the check
that fails if the class returns**. This is **outside M3-b's formally declared class** (top-level and
container-child types), so it does not fail the milestone criterion; it misses D9's intent for this
shape.

## M3-c — MET, fail-safe; and its interaction with M8-G is safe (INFO-2)

`disableSave` now includes `!!contentFloorError` where `contentFloorError =
validateContentRequirements(loadedMessage)`, closing research F5's empty-`valid=false` flows
(6/11/12/13). I chased one interaction hard: `validateContentRequirements` errors on **row E**
(V2+content), not only on empty, so `disableSave` would block a row-E message — and `onSubmit` is
exactly where M8-G's row-E choice fires. **But it is not reachable** (`probe-cr17` CR17-D):
`loadedMessage` can never be row E — the three ingress sources never carry V2+content, and `jsonMessage`
is set only by `NewMessageJsonInput`, which resolves row E in its own choice UI and emits
`applyDisposition(...)`, a resolved message (`applyDisposition` with no mode **throws** on row E and the
code guards it). So M3-c blocks **empty** (correct) and, incidentally, the round-14 MEDIUM-4 empty-embed
divergence (fail-safe at this surface) — and blocks **no reachable choice**. I retracted the finding by
chasing reachability rather than asserting it.

### INFO-2 — M8-G's NewMessageModal choice branch is unreachable (a round-14 miss of mine)

The same reachability means M8-G's `pendingChoice`/`gateBeforePersist` branch in `NewMessageModal` is
**dead code** given the current `loadedMessage` sources plus Discord's exclusivity invariant —
`mustAsk` is always false there. **Round 14 approved M8-G without noticing this**; I record it now.
It is harmless defensive depth (it becomes live if a future source can produce row E), not a defect,
and it rests on Discord's own invariant, which I did not execute.

## LOW-5 — the committed tree does not pass the lint gate

**Location**: `src/utils/discordResponseToMessage.ts:44` (the `RawComponent` inline type), committed
object `12f4ce6` (working tree confirmed identical to the committed object).

**Class**: a committed source line the project lint gate (`eslint --max-warnings=0`) rejects.
`member-delimiter-style` (configured **error**, single-line delimiter `comma`) fires **twice** on
`type RawComponent = { type: number; components?: RawComponent[]; style?: number };` — semicolons where
the config requires commas. New in M3, and `--fix`-able, so the most likely cause is that `pnpm lint
--fix` cleaned a working state that was **not** the committed one (a shared-tree / commit-hygiene gap).
This contradicts the doc's "ESLint clean on all seven touched production files" claim.

**Enumeration** (filter-immune, `eslint --format json`): `discordResponseToMessage.ts` — 2 errors
(member-delimiter-style L44) + 2 warnings (max-len L66 new, L135 **pre-existing** — 136 chars at parent
`66e1974` too). `global.d.ts` — 13 `no-unused-vars` + 1 max-len, **all pre-existing** (lines 4–28
identical at parent). Does **not** match: rules the gate has `--fix`ed away in a working tree I cannot
see. **Required Action. Minimum**: run `pnpm lint --fix` and commit the result. **Preferred**: the same,
plus confirm the max-len on the new L66 is resolved (it is a warning that `--max-warnings=0` still
fails on).

## TDD — red reproduced independently, and one disclosed ordering lapse

I built an old-source (`66e1974`) + new-test tree and ran the M3 specs: **9 failures**, including the
implementer's disclosed `TypeError: Cannot read properties of undefined (reading 'flags')` — the tests
destructure the new `{ data, droppedComponentTypes }` return shape against the old bare-`MessageData`
converter. Genuine reds for the right reason. The implementer **disclosed** a TDD ordering lapse
(`messageStore.store`'s change made before `013-m3-code-path.test.ts` was written) with `git stash`
compensating evidence, and recorded it in the TDD Compliance table rather than smoothing it over —
the correct handling of a process slip; noted, not held.

## The adversarial trigger is not crossed by M3

M3 is an import/read path. `getMessage` remains a `protectedProcedure` with its auth branches
unchanged (the diff touches only the `case 200` return); `messageStore.store` is bot-command-triggered,
not a website auth surface; no irreversible action is added. So the mandatory stand-up-and-attack does
not trigger for M3 (last round's persist-surface attack covered the write boundary). The one server
change was read and confirmed auth-neutral.

## Positive observations

- **The converter's kept-set exactly matches the strict persist shape** — the M3-b core is right, and
  the Thumbnail-11 exclusion the implementer flagged is correct (Thumbnail is a Section accessory, not
  a top-level type; carrying it top-level would fail persist).
- **The residue travels correctly to all three entry points**, and the code-path toast is a stable
  one-shot, not a re-fire.
- **The flags determination was reasoned openly** and matches the owner's pass-through ruling.
- **The TDD ordering lapse was disclosed**, not hidden — the right behaviour.

## Assumption Not Checked

**This review assumes a Discord API message never carries `IS_COMPONENTS_V2` together with content or
embeds, and does not test it.** INFO-2's "the NewMessageModal choice branch is dead code" and M3-a(ii)'s
partition both rest on Discord enforcing that exclusivity server-side; I verified the code paths but
not Discord's behaviour.

**Falsity signature**: a fetched message carrying both would make `gateBeforePersist(loadedMessage)`
return `mustAsk` true in `NewMessageModal`, turning the "dead" M8-G branch live — and would make M3-c's
`disableSave` block that live choice, promoting INFO-2 into a reachable HIGH.

**Owner: QA**, Phase 2 — one URL import of a hand-constructed (or bot-sent) message with the V2 flag
and content, asserting whether the choice appears or the Save is blocked. Named again in Next Steps.

## Captured instruments

| path | what it is |
|---|---|
| `verification/013/probe-cr17-ingress/ingress.cr17.test.ts` | 15 assertions: CR17-A flags pass-through (ruled-acceptable), CR17-B the kept-set == strict-shape match + labelled drops, CR17-C the Section-accessory opaque-failure gap, CR17-D the M3-c/M8-G reachability retraction, CR17-E the ingress-vs-paste asymmetry |
| `…/probe-cr17-ingress/ingress-findings.txt` | the findings summary the probe writes |
| `…/probe-cr17-ingress/README.md` | claims, the flags ruling, reachability, blind spots |

## Required Actions

**None hold the tree.** M3's three sub-criteria are met and verified. MEDIUM-5 (Section-accessory
opaque failure, outside M3-b's declared class) and LOW-5 (lint gate) are routed for a follow-up fix.

## Next Steps

1. **`implementer-hooks-013-3`** — M3 approved. **MEDIUM-5**: filter Section accessories in the
   converter (Preferred: mirror on `filterSupportedComponents` too) so a non-link accessory is named in
   `droppedComponentTypes` instead of failing opaquely at persist — natural to fold into **M4** (the
   JSON-import ground). **LOW-5**: `pnpm lint --fix` and commit the result; the committed tree currently
   fails `--max-warnings=0` on `discordResponseToMessage.ts:44`. Next unit is **M4** (its Dependencies
   line: "M3 holds `NewMessageModal.tsx` first"), then M6. MEDIUM-4 from round 14 still owes its
   **minimum** fix per steering when M4/M6 start.
2. **QA** — this round's Assumption Not Checked (does Discord ever send V2 + content — the falsifier
   that would promote INFO-2 to a reachable HIGH), plus the MEDIUM-5 UX check (what a non-link Section
   accessory import shows the user), and the carried assumptions from rounds 9, 11, 12, 13, 14, and
   round-8 INFO-1.
3. **A planner pass, when that queue reopens** — MEDIUM-1's reach into M4's Risks, unchanged; and the
   M4-b Thumbnail-11 finding the implementer named (out of M3 scope).

---

# ROUND 16 — M4, create-path parity + lenient-filter consistency, at `e61e602`

**Reviewed-At**: `e61e6025918a63bb435e2aeff1c2e6eb920de1bf` (chain branch
`chain/013-components-v2-editing-surfaces`). Verified at the start of the pass and again at the end;
the tree did not move. `agent-output` at `b365ef0` on entry.

**Verdict: REJECTED — one HIGH, localized to M4-c.** M4-a (`saveAsPayload` wrap), M4-b (SUPPORTED/schema
set-equality parity) and the MEDIUM-5 Section-accessory fix are **sound and verified**. The defect is the
**M4-c Load-button gate on `JsonModalBody`**, which makes the D17-mandated row-E choice flow unreachable
dead code. It is introduced by this pass, it is grounded in a specific owner ruling, and the impl doc's
TDD-exemption that would have justified not testing it is falsified by execution. It should be fixed
before QA rather than filed as a comment.

## Scope actually assessed

`git diff --numstat e61e602~1 e61e602` (plus the intermediate LOW-5 fix `15f2669` folded into this
range) → the eight files the implementer named: `shapes.ts` (M4-b/MEDIUM-5), `discordResponseToMessage.ts`
(MEDIUM-5 ingress), `JsonModalBody.tsx` (M4-b/M4-c), `NewMessageModal.tsx` (M4-a), `NewMessageJsonInput.tsx`
(M4-b), the parity test `013-m4-shapes-parity.test.ts`, and the appended `013-m3-discord-ingress.test.ts`
and `shapes-v2.test.ts`. `limits.tsx` and `index.ts` — **unchanged this chain** (`git log 66e1974..e61e602`
empty for both), which is the MEDIUM-4 fact below.

## Verification re-run — nothing inherited

| claim | instrument | result |
|---|---|---|
| typecheck | `npx tsc --noEmit` | **exit 0** |
| lint, touched source files | `npx eslint --max-warnings=0 <6 M4 src files>` | flagged issues are **all pre-existing** (shapes.ts `sumDisplayableText` line 160 delimiter/len — same line at `e61e602~1`; the avatar_url 136-char line; the standard `__tests__`-not-in-tsconfig parsing error). **M4 added no >100-char line and no new rule violation in its own hunks.** |
| failure **set** unchanged | `check-expected-six.sh e61e602` | **MATCH** — the expected six by identity and reason. Totals **517/511/6** (clean extraction). |
| the pairing's other half | `probe-cr3-mode-predicate/` | **122/122** |
| this round | `probe-cr18-loadgate-choice/` | **22/22** (13 + 4 + 5) |

**On the total.** The implementer reported **524/518/6**; my clean `git archive` extraction gives
**517/511/6**. The +7 is the untracked foreign file `013-qa-phase1-seed-route-probe.test.ts` (7 passing
tests) that `vitest` collects from the shared working tree — exactly the contamination
`baseline-expected-six` exists to defeat. The failure **set** is identical, so the conclusion ("no new
failures, the six pre-existing reds unchanged") holds; the count is corrected, not the finding.

## HIGH-1 — M4-c's Load gate makes `JsonModalBody`'s row-E choice unreachable

**Severity: HIGH.** Designed, previously-reachable, user-facing functionality on the JSON edit surface
is made unreachable dead code by the change under review, in violation of owner ruling D17.

**Location.** `src/app/message/m/[id]/_components/JsonModalBody.tsx`, the Load `Button`'s
`isDisabled={!!error || !isValid || !!contentFloorError}` (the `|| !!contentFloorError` clause added by
M4-c), where `contentFloorError = validatedDraft ? validateContentRequirements(validatedDraft) : undefined`
and `validatedDraft = discordMessageImportShape.parse(rawParsed)` — the **un-resolved** import, set in the
effect, never passed through `resolveContentLoss`/`applyDisposition`.

**Class.** *A JSON submission surface gates its load/submit action on the composer's
`validateContentRequirements` floor predicate applied to an un-resolved draft, so it blocks row E — which
D17 mandates be resolved by the five-row CHOICE, not errored — instead of gating only the empty floor on
the resolved object.* The two row-E predicates disagree, and the gate uses the wrong one:

- `resolveContentLoss(...).requiresChoice` = `hasV2Components(**structural**) && hasClassicContent` — the
  surface's own disposition predicate (`src/utils/index.ts`).
- `validateContentRequirements` errors when `hasV2 && hasContent`, `hasV2 = hasStructuralV2 || **hasFlagV2**`,
  `hasContent = content.trim() || embeds.length>0` (`src/utils/limits.tsx`) — the **composer's** error rule
  (D15), a **superset** of the choice predicate.

Because the gate predicate is a superset, **every** draft that would set `pendingChoice` also trips the
gate: `commitSettled` → `setPendingChoice` is unreachable, and the "Save as Components V2 / Save as Classic"
UI it renders is dead. Owner ruling **D17** (planning doc, D15 row and the five-row bullet): at the two
**JSON submission surfaces** the disposition is "not a function of that predicate but of the three-way cell",
and row E (V2 components + content/embeds, whatever the flag) → "the user **chooses** Classic or V2". The
`validateContentRequirements` **error** is the **composer's** behaviour (D15's second sentence), not the JSON
surface's. M4-c applied the composer's rule to a JSON submission surface.

**Enumeration.** `git grep -n "validateContentRequirements(" e61e602 -- 'src/**/*.tsx' ':!**/__tests__/**'`
→ **3** gate sites:

| site | draft it gates | member? |
|---|---|---|
| `JsonModalBody.tsx:139` (Load) | `validatedDraft` = **un-resolved** `discordMessageImportShape.parse` — **can be row E** | **MEMBER** |
| `NewMessageModal.tsx:125` (Save) | `loadedMessage` = `makeEditable(...).data` over `jsonMessage`, which `NewMessageJsonInput` **`applyDisposition`-resolves** upstream (lines 94–113) before `setMessage` — **never row E** (round-15 CR17-D, re-verified at e61e602) | **not a member** (its own `gateBeforePersist` choice branch was already dead — round-15 INFO-2) |
| `DiscordMessageEditor/index.tsx:198` | `message` — this **is** the composer; the error rule is **correct** here (D15) | **not a member** |

*Does not match* (stated at authoring time): a submit/load gate that reads `validateContentRequirements`
indirectly (through `validateMessage` or another wrapper) — the predicate is the literal call; and any JSON
surface that resolves the draft *before* the gate (as `NewMessageJsonInput` does), which removes it from the
class by construction rather than by the predicate.

**Established by execution** — `probe-cr18-loadgate-choice/gate-choice.cr18.test.ts`, **13/13**, the real
functions imported:
- **CR18-A**: a genuine row-E paste — `choiceWanted` (real `resolveContentLoss`) is `true`, and
  `loadDisabled_M4c` (real `validateContentRequirements` over the real parse) is `true`. The choice is wanted
  and the button that reaches it is disabled.
- **CONTROL**: the parent gate `!!error || !isValid` returns `false` on that same draft — so this is a
  **measurement of M4-c's added clause**, not a vacuous pass. The choice flow *was* reachable before M4-c.
- **CR18-B**: over a corpus, `requiresChoice ⇒ gate-disabled` holds for every member — the choice can never
  be reached.
- **CR18-D**: `applyDisposition(rowE,'v2')` and `applyDisposition(rowE,'classic')` **both** pass
  `validateContentRequirements` — the gate belongs on the **resolved** object (which always passes), not the
  raw draft.

**The TDD-exemption claim is falsified.** The impl doc (`## …M4-b/M4-c JSON-surface wiring` note) exempts
the M4-c gate from a TDD row as "React render-path changes over data already returned by TDD-gated pure
functions … with no new logic of their own." Per my obligation to verify an exemption rather than accept it,
I executed both trees over the affected surface (CR18-A control): M4-c's `isDisabled` composition **changed
the reachability** of the `pendingChoice` branch. That is a behaviour change, not a render-path no-op, so the
exemption does not hold and the defect it covered is this finding.

**Required Action — eliminate the class, do not patch the site.**

- **Preferred (structural).** Route row E to the choice **in the effect**, exactly as the sibling
  `NewMessageJsonInput.tsx` already does (lines 94–113: compute `resolveContentLoss`, and on `requiresChoice`
  set `pendingChoice` there rather than deferring to the Load button). Then the Load gate never sees a row-E
  draft, and the class — "a JSON surface gates on the composer floor over an un-resolved draft" — cannot be
  represented on this surface.
- **Minimum (point fix).** Gate on `!requiresChoice && contentFloorError` instead of bare `contentFloorError`,
  i.e. only block when the disposition does **not** offer a choice. Concretely, derive
  `const requiresChoice = validatedDraft ? resolveContentLoss(validatedDraft.flags, validatedDraft.components,
  validatedDraft.content, validatedDraft.embeds).requiresChoice : false;` and disable on
  `!!error || !isValid || (!requiresChoice && !!contentFloorError)`.

**This fix must not reintroduce a class it is adjacent to.** The M4-c gate is *also* what incidentally blocks
the round-14 **MEDIUM-4** empty-embed case on this surface (V2 + an empty embed `{}`: `requiresChoice=false`
because `hasClassicContent` filters empty embeds, but `contentFloorError=true` because
`validateContentRequirements` counts `embeds.length>0`). Both fixes above **preserve** that: for the
empty-embed draft `requiresChoice=false`, so `!requiresChoice && contentFloorError` still blocks it; only the
true row-E draft (`requiresChoice=true`) is unblocked. **Do not fix HIGH-1 by removing the gate** — that would
re-expose MEDIUM-4 on `JsonModalBody`.

Where this instantiates a plan Risks row: this is the **D18 predicate-divergence** family the round-14
MEDIUM-4 already named — the same two predicates (`hasClassicContent` vs `validateContentRequirements`)
disagreeing, here surfaced as a *reachability* defect rather than a *sendability* one.

## What is sound — verified, not assumed

- **M4-b — the parity test is a real, discriminating instrument.** `probe-cr18b` (4/4):
  `topLevelComponentShape.options.map(o => o.shape.type.value)` returns the concrete set `{1,9,10,12,13,14,17}`
  (7 real numbers), container-child `{1,9,10,12,13,14}` (6) — **not** vacuous, and a simulated divergence (a
  stray `11`, the M3-era Thumbnail bug) **would** break the `toEqual`. The real `SUPPORTED_TOP_LEVEL_TYPES` at
  e61e602 is `{1,9,10,12,13,14,17}` — the stray `11` the M3-era code carried is **removed**, so the two
  independent sources now agree and are pinned to agree. Good design: the assertion reads the schema, so a
  future SUPPORTED/schema drift fails the suite.
- **MEDIUM-5 — CLOSED on both surfaces.** `probe-cr18c` (5/5): a Section whose accessory is a non-link
  (interactive) button is **dropped and named** (`'Button'`) by `filterSupportedComponents`/
  `discordMessageImportShape` (paste) and by `discordResponseToMessage` (ingress); a Thumbnail accessory is
  **kept** (control — the fix is not over-broad). `filterSection`/`isSupportedAccessory` are shared with
  `describeUnsupportedComponentTypes` via the one `filterTopLevelComponent`, so the notice and the filter
  cannot drift.
- **M4-a — `saveAsPayload` wrap is correct.** `submitData` now sends `data: saveAsPayload({ data })` =
  `stripKeys({data}).data`, which strips `_key`s and OR-derives the V2 bit from structure without deleting
  content/embeds — the same persist normalization the other writers use. Before M4-a the create path sent raw
  `data`. `saveAsPayload` is TDD-gated at M1; the wrap is a one-line call-site change.
- **TDD.** The implementer's reds are behavioural/existence and reproduced two ways: their own
  `git stash`/re-run/`git stash pop` differential (10 new-test reds on the reverted source, the same 6
  pre-existing), and my independent baseline comparator (set MATCH). The parity reds
  (`describeUnsupportedComponentTypes is not a function`; `Set{…11…} to deeply equal Set{…}`) and the MEDIUM-5
  red (`expected false to be true`) match the impl doc's TDD table.
- **LOW-5 (round 15) is fixed** at the intermediate `15f2669`: `discordResponseToMessage.ts`'s `RawComponent`
  delimiters corrected; the touched file no longer carries the `member-delimiter-style` error.

## Assumption Not Checked

**This review assumes that standing up `JsonModalBody` in a browser and pasting a row-E JSON reproduces the
disabled Load button with the choice UI never appearing — I established it by executing the real
`resolveContentLoss`/`validateContentRequirements`/`discordMessageImportShape` over the exact expressions the
component computes, but did not render the React component in a DOM.** No browser/component harness exists in
this repo (impl doc, Surfaces Without Automated Coverage, assumption 5), so the render-path composition of
`isDisabled` from those values is verified by reading the JSX, not by mounting it.

**Falsity signature**: the component, mounted, shows the row-E choice despite the disabled Load button —
i.e. some render path reaches `pendingChoice` without going through the Load `onConfirm` I traced (there is
none in the source at e61e602, but a DOM run is the discriminating check).

**Owner: QA**, at Phase 2, as one row in whatever inventory it builds of the JSON-import surfaces: mount
`JsonModalBody`, paste `{ flags: 32768, content: 'x', components: [{ type: 17, components: [{ type: 10,
content: 'y' }] }] }`, and assert whether the choice buttons ever appear. Named again in Next Steps.

## Captured instruments

| path | what it is |
|---|---|
| `verification/013/probe-cr18-loadgate-choice/gate-choice.cr18.test.ts` | 13 assertions: HIGH-1 — row E wanted-but-disabled, parent-gate control, the superset invariant over a corpus, the resolved-object-always-passes fact, and the row-D collateral. **This is the check that fails if the class returns.** |
| `…/discriminate.cr18b.test.ts` | 4 assertions: the M4-b parity extraction is non-vacuous and would break under a SUPPORTED/schema divergence |
| `…/medium5.cr18c.test.ts` | 5 assertions: MEDIUM-5 closed — non-link Section accessory dropped+named on paste AND ingress; Thumbnail kept |
| `…/vitest.cr18.config.ts`, `…/run-cr18-e61e602.txt`, `…/README.md` | config, the 22/22 run, and the claims + blind spots |

## Required Actions

1. **HIGH-1** — fix the M4-c Load gate on `JsonModalBody` per Required Action above (Preferred: route row E to
   the choice in the effect; Minimum: `!requiresChoice && contentFloorError`). **Must not remove the gate**
   (re-exposes MEDIUM-4). A fix round re-attacks this from first principles (the trigger is that the fix
   touches a guard).

## Next Steps

1. **`implementer-hooks-013-3`** — HIGH-1 above, then re-submit M4 for a delta round. When you fix it, show
   the sweep of the three `validateContentRequirements` gate sites and the disposition of each; I will re-run
   `probe-cr18` and break its predicate, not just re-run it.
2. **`steering-hooks-013-2`** — **MEDIUM-4 is still unfixed in code** (`limits.tsx`/`index.ts` untouched this
   chain); the M4-c gate is currently its only incidental mitigation on `JsonModalBody`, and HIGH-1's fix is
   written to preserve that. If the minimum-fix-only instruction still stands, the predicate alignment remains
   a routed pre-existing item, not a chain fix — flagging that the two are now coupled through one gate.
3. **QA** — this round's Assumption Not Checked (mount `JsonModalBody`, paste row E, assert the choice UI
   appears once HIGH-1 is fixed), plus the MEDIUM-5 UX check carried from round 15 and the assumptions carried
   from rounds 9, 11, 12, 13, 14, and round-8 INFO-1.
4. **A planner pass, when that queue reopens** — MEDIUM-1's reach into M4's Risks, unchanged.

---

# ROUND 17 — the round-16 HIGH-1 fix round, at `ad9f331`

**Reviewed-At**: `ad9f331f82581b9f387b8ea18db4b2f8936d4805` (chain branch
`chain/013-components-v2-editing-surfaces`). Verified at the start of the pass and again at the end;
the tree did not move, and `JsonModalBody.tsx` in the working tree matches the committed blob.
`agent-output` at `324cfb9` on entry. Scope: **one file**, `git diff --numstat e61e602 ad9f331` →
`src/app/message/m/[id]/_components/JsonModalBody.tsx` **48/17**.

**Verdict: APPROVED_WITH_COMMENTS.** HIGH-1 is **closed structurally** — the Preferred fix, taken as
specified. One **new MEDIUM (MED-6)** was introduced by the fix; it does not hold the tree and is
routed as a follow-up. **M4 is not yet complete**: MED-6 needs dispositioning and the row-E choice
still owes a mounted-render check at QA. Plan Status field NOT advanced.

## Re-attack from first principles — the fix touches a guard, so it was not read and agreed with

The reject reason was that M4-c's Load gate made the D17 row-E choice unreachable. The fix moved the
disposition into the parsing effect. I traced the new control flow from source and executed the real
predicates against a control that models the removed wiring.

**The new flow** (`JsonModalBody.tsx` at `ad9f331`, by symbol):

- `useEffect` (the `[messageString]` effect, lines 122–155): after `discordMessageImportShape.parse`,
  it now calls `resolveContentLoss(...)`; `if (disposition.requiresChoice)` →
  `setPendingChoice({ validated, disposition })`, `setValidatedDraft(null)`, `setAllowMenuClose(false)`,
  **return**. Otherwise `setPendingChoice(null)`, `setValidatedDraft(parsed)`.
- The render short-circuits at `if (pendingChoice) return (<choice view/>)` (line 165) **before** the
  main body that carries the Load button (line 246+). So for a row-E draft the Load button is never
  rendered — the choice is.
- `contentFloorError = validatedDraft ? validateContentRequirements(validatedDraft) : undefined`
  (line 162): **null for a row-E draft**, because the effect nulled `validatedDraft`. The superset
  predicate can no longer hide the choice, because it is no longer evaluated over a row-E draft.
- `commitLoad` (lines 63–78) is doubly guarded — `if (!validatedDraft) return;` **and**
  `if (disposition.requiresChoice) return;` — so even if the Load button were reached, no row-E object
  can be loaded without a choice.

This makes `JsonModalBody` structurally identical to the **approved sibling** `NewMessageJsonInput`
(lines 87–124), which already routes row E in its own effect (`setPendingChoice` + `setMessage(null)`).
That is exactly the Preferred fix named in round 16.

**Established by execution — `probe-cr19-loadgate-fix/` (16/16), with a control.** CR19-A drives three
genuine row-E drafts (V2+content, V2+content-no-flag, V2+embed) through a faithful model of the new
effect executing the **real** `resolveContentLoss`: each sets `pendingChoice`, nulls `validatedDraft`,
and reaches the choice view. The **CONTROL** models the removed `e61e602` effect (validatedDraft always
set, choice behind the Load button): `choiceViewReached = false` **and** `loadDisabled = true` — the
dead-code state round 16 rejected. So the closure is a **measured difference**, not a re-run of a green
suite.

**Not treated as proof by a green suite.** `probe-cr18` still reports 22/22 at `ad9f331` — but that is
the **predicate superset** relationship (the functions were untouched), and it now describes a wiring
that no longer exists. cr18 is **superseded by cr19 for the wiring** and retained only as the predicate
record. I state this because a transcription does not expire when the tree moves (the round-13 hazard),
and cr18's green must not be mistaken for evidence the fix works.

## The class sweep — re-run, predicate broken

The implementer swept the three `validateContentRequirements` gate sites. I re-ran it and broke the
predicate: the HIGH-1 **class** is not "a `validateContentRequirements` call" but **"an import surface
that gates loading on a content-floor predicate computed over an un-resolved draft, hiding a
`resolveContentLoss` choice."** Enumerated by both predicates at `ad9f331`:

`git grep -n "validateContentRequirements\|resolveContentLoss" ad9f331 -- 'src/**/*.ts' 'src/**/*.tsx'`
(production, non-test):

| site (symbol) | reads an un-resolved draft? | routes row E? | disposition |
|---|---|---|---|
| `JsonModalBody.tsx` effect + Load `isDisabled` | no longer — effect resolves first | **yes, in-effect** | **FIXED this round** |
| `NewMessageJsonInput.tsx:94` effect | no — resolves in-effect (round 11) | yes, in-effect | non-member (approved) |
| `NewMessageModal.tsx:125` `contentFloorError` | no — `loadedMessage` is `applyDisposition`-resolved upstream by `NewMessageJsonInput`, null for row E | n/a | **non-member** (re-verified: `loadedMessage` never row E) |
| `DiscordMessageEditor/index.tsx:198` `noContentError` | composer send-time floor, D15 — not an import gate, no choice UI | n/a | **non-member** |
| `limits.tsx:133` inside `validateMessage` | internal validator composition, not a UI gate | n/a | **non-member** |

**What the predicate does NOT match** (stated for my own sweep): a floor gate whose draft is produced
by a code path not named `resolveContentLoss`/`validateContentRequirements` (none found), and
`WarningDialog`-routed surfaces (outside the confirmation sweep, carried from round 13). The class is
**closed on both import surfaces**.

## MED-6 (NEW this round) — incomplete port: Load is enabled in the dismissed-choice state

**Severity: MEDIUM.** Does **not** hold the tree (HIGH-1 is the blocking reason and it is closed);
routed as a follow-up.

**Location**: `JsonModalBody.tsx`, the Load button `isDisabled` (line 276) versus the ported
`cancelChoice`/`reopenChoice`/`dismissedChoice` escape hatch (lines 90–101, 235–245).

**Class**: an enabled submit control that misrepresents its effect — a control whose `isDisabled` omits
a term that a reachable state makes decisive, so the control appears actionable while its handler
no-ops. Specifically: after `cancelChoice` on a row-E draft, the effect has **not** re-run (no
`messageString` change), so `validatedDraft` is `null`, `pendingChoice` is `null`, `dismissedChoice` is
set. Load `isDisabled = !!error || !isValid || !!contentFloorError` = `false || false || false` =
**false → ENABLED**. Clicking it runs the confirmation dialog (whose copy is the `validatedDraft ? … :
'This will overwrite the current message.'` fallback — line 268–270), and on confirm `commitLoad`
hits `if (!validatedDraft) return;` and **no-ops**. Data integrity is intact; the defect is the enabled
control and the misleading "will overwrite" copy over an action that does nothing.

**Why it is a regression from *this* fix, and why it is the sibling's own pattern the port dropped**:
the approved sibling gates submit on **`disableSave = !loadedMessage || !!contentFloorError`**
(`NewMessageModal.tsx:191`) — when the resolved message is null (row-E/dismissed), submit is
**disabled**. The fix ported the escape hatch (`dismissedChoice`/`reopenChoice`/banner) from
`NewMessageJsonInput` but **not** the `!loadedMessage`-equivalent submit gate. `JsonModalBody`'s Load
carries no `!validatedDraft` term, so it diverges from the sibling exactly in the state the escape hatch
creates. Round 9's MEDIUM-3 class (a dismissed choice stranding the user) is mitigated here by the
banner, but the button beside the banner contradicts it.

**Enumeration** (run at `ad9f331`): the sibling submit gates carrying `!loadedMessage` /
`!validatedDraft` presence terms —
`git grep -n "isDisabled=\|disableSave" ad9f331 -- src/app/message/_components/NewMessageModal.tsx src/app/message/m/'[id]'/_components/JsonModalBody.tsx`
→ NewMessageModal `disableSave = !loadedMessage || …` (line 191), used at the success buttons (373, 396,
444); JsonModalBody Load `isDisabled = !!error || !isValid || !!contentFloorError` (276) — **the one
submit control in the pair that omits the presence term.** One member. The predicate does not match a
control whose presence guard is expressed in the handler instead of `isDisabled` (which is precisely
what `commitLoad` does, and why integrity is preserved despite the enabled button).

**Required Action** — eliminate the class, do not patch the coordinate:
- **Preferred (structural)**: gate Load on the presence of a loadable resolved draft, so the enabled-
  dead-button state is unrepresentable: `isDisabled={!validatedDraft || !!contentFloorError}` (the
  `!validatedDraft` term subsumes `!isValid` and the row-E/dismissed states; keep `!!contentFloorError`
  for the flag-only-V2+content case where `validatedDraft` is non-null). This matches the sibling's
  `disableSave` shape.
- **Minimum**: add `|| !!dismissedChoice` to the existing `isDisabled`.
- Either way the confirmation copy is then only shown for a real draft, so the misleading "will
  overwrite" string on a no-op disappears with the class.

**Magnitude**: unmeasured-by-execution for the rendered dialog copy (the model does not mount the
confirmation); the button-state divergence itself is executed (`probe-cr19` CR19-B: `loadDisabled=false`
for JsonModalBody vs `siblingSubmitDisabled=true` for the sibling). No performance dimension.

**Captured check**: `probe-cr19-loadgate-fix/gate-fix.cr19.test.ts`, block **CR19-B** — fails if the
divergence is closed (i.e. once fixed, the JsonModalBody arm flips to disabled and CR19-B must be
updated to assert parity). `no test` in the project suite: the wiring is not mounted there; the
discriminating check is a mounted render, handed to QA below with the finding.

## Verification — nothing inherited

| claim | instrument | result |
|---|---|---|
| typecheck | `npx tsc --noEmit` at `ad9f331` | **exit 0** |
| lint, the one changed file | `./node_modules/.bin/eslint 'src/app/message/m/[id]/_components/JsonModalBody.tsx' --max-warnings=0` | **0** (exit 0) |
| failure **set** unchanged | `baseline-expected-six/check-expected-six.sh ad9f331` (clean `git archive`) | **MATCH**, clean **517/511/6** |
| HIGH-1 closure + MED-6, executed | `probe-cr19-loadgate-fix/` (real predicates, modeled wiring, e61e602 control) | **16/16** |
| predicate facts (superseded for wiring) | `probe-cr18-loadgate-choice/` | **22/22** |
| M8 mode predicate, collateral | `probe-cr3-mode-predicate/` | **122/122** |

**No new test was added**, and the clean total is unchanged from round 16 (517/511/6). That is
**consistent** with a UI-wiring fix that introduced no new pure function — and it is exactly why the
row-E closure still owes a mounted-render check (below). The implementer's working-tree figure
**524/518/6** is the same set inflated by the +7 foreign QA file (`013-qa-phase1-seed-route-probe`),
reproduced here as before.

## TDD note — accepted, verified not accepted

The implementer added no new TDD-gate row (no new pure function; the four functions called from the new
site are already gated) and **corrected the falsified M4-c exemption claim in place** under the M4
delivery row, restating it as a control-flow (reachability) change rather than a display change. I
re-read that correction; it is accurate. The behaviour-preservation obligation for the wiring is
discharged by `probe-cr19`'s control (old wiring → choice unreachable; new wiring → reachable), which is
an execution of both trees over the row-E input class, not an assertion.

## Positive observations

- **The Preferred fix was taken exactly as specified**, and it converges the two JSON surfaces onto one
  pattern (`resolveContentLoss` in the effect) rather than leaving them divergent. That is the right
  shape and it retires the class on both surfaces at once.
- **The class sweep was run unprompted and reported in a form I could break** — three sites, each with
  a stated reason for membership/non-membership. That it under-scoped the class (to the
  `validateContentRequirements` name) is why re-running it mattered, but a bare conclusion would have
  hidden the sibling comparison entirely.
- **`commitLoad` guards rather than casts.** Replacing the `as` cast with an early `if (!validatedDraft)
  return` surfaces the invariant instead of papering over it — the implementer's stated reasoning, and
  it is why MED-6 is only a UX defect and not a data-integrity one.
- **The MEDIUM-4 coupling was respected**: the floor gate still blocks flag-only-V2+content, so the
  incidental mitigation steering asked to keep survives the fix (`probe-cr19` CR19-C).
- **A rationale comment on `commitLoad` was caught and removed** before commit (the LOW-2 tool-test
  class), and the removal was disclosed. Re-checked: `git grep -n "//\|/\*" ad9f331 -- …JsonModalBody.tsx`
  shows only pre-existing commented-out dead code and one `eslint-disable` — no review-thread comment
  introduced by this round.

## Assumption Not Checked

**This review assumes the parsing `useEffect` runs on each `messageString` change with the state
transitions traced from source, and does not test the effect's live scheduling under CodeMirror's
`onChange` and `usePassedProp`'s seed — `probe-cr19` models the effect as a synchronous function of the
raw input and does not mount the component.**

**Falsity signature**: a real mount shows a row-E paste that does **not** reach the choice view (e.g. an
effect ordering or a debounce leaves `pendingChoice` unset for a tick while the Load button renders
enabled over a stale `validatedDraft`), or the dismissed-state Load behaves differently from the modeled
`isDisabled=false`. Either would mean the wiring closure is weaker than the model asserts.

**Owner: QA, Phase 2** — mount `JsonModalBody`, paste a row-E message, assert the choice UI renders
before any Load button; click a choice option and assert the disposition applies; then Cancel and assert
the Load button's state (this is also the discriminating check for MED-6). Named again in Next Steps.

## Captured instruments

| path | what it is |
|---|---|
| `verification/013/probe-cr19-loadgate-fix/gate-fix.cr19.test.ts` | 16 assertions: CR19-A HIGH-1 closure over three row-E drafts with an `e61e602`-wiring control; CR19-B the MED-6 dismissed-state divergence (JsonModalBody enabled vs sibling disabled) + the `commitLoad` no-op invariant; CR19-C MEDIUM-4 unchanged; CR19-D resolved object passes the floor; CR19-E non-members load, empty floor blocked at the button |
| `…/probe-cr19-loadgate-fix/vitest.cr19.config.ts` | its config |
| `…/probe-cr19-loadgate-fix/run-cr19-ad9f331.txt` | the run — 16/16 |
| `…/probe-cr19-loadgate-fix/README.md` | claims, model-vs-tree boundary, what supersedes cr18, coverage gaps |

## Required Actions

**None hold the tree.** HIGH-1 is closed. **MED-6** (enabled Load in the dismissed-choice state) is a
follow-up: the structural fix is `isDisabled={!validatedDraft || !!contentFloorError}`, mirroring the
sibling's `disableSave`.

## Next Steps

1. **`implementer-hooks-013-3`** — **MED-6** above, at your next touch of `JsonModalBody` (structural
   fix preferred; it also removes the misleading "will overwrite" copy on the no-op). Not a re-submit
   trigger on its own. When you fix it, flip `probe-cr19` CR19-B to assert parity with the sibling.
2. **QA, Phase 2** — the mounted-render check for the row-E choice (this round's Assumption Not Checked),
   which is also MED-6's discriminating check; plus the carried assumptions from rounds 9, 11, 12, 13,
   14, and round-8 INFO-1, and the MEDIUM-5 UX check from round 15.
3. **`steering-hooks-013-2`** — **MEDIUM-4** remains a routed pre-existing item (predicates diverge in
   `limits.tsx`/`index.ts`); the `JsonModalBody` floor gate is still its incidental mitigation and MED-6's
   fix must keep the `!!contentFloorError` term so that mitigation survives. The two remain coupled
   through one gate.
4. **A planner pass, when that queue reopens** — MEDIUM-1's reach into M4's Risks, unchanged.

---

# ROUND 18 — the round-17 MED-6 fix round, at `4e9da96`

**Reviewed-At**: `4e9da96043a471d8eafc59c43f92d85d9a279a09` (chain branch
`chain/013-components-v2-editing-surfaces`). Verified at the start of the pass and again at the end; the
tree did not move, and `JsonModalBody.tsx` in the working tree matches the committed blob. `agent-output`
at `e5c982a` on entry (the implementer's round-17 fix-round row on the **implementation** doc — confirmed
it did not touch this review doc). Scope: **one file**, `git diff --numstat ad9f331 4e9da96` →
`src/app/message/m/[id]/_components/JsonModalBody.tsx` **1/4**.

**Verdict: APPROVED — MED-6 CLOSED.** With HIGH-1 (round 17), the two code-review findings on M4 are both
closed. **M4 passes code review.** The one remaining M4 obligation is QA Phase 2's mounted-render check
(carried Assumption Not Checked), which is a QA-stage item, not a code-review blocker. Plan Status left to
steering (M6 is unimplemented; plan-level status is not mine to advance mid-plan).

## The change

```diff
-  const [isValid, setIsValid] = useState(false);
   ...
-      setIsValid(true);          // success branch
   ...
-      setIsValid(false);         // catch branch
   ...
-            isDisabled={!!error || !isValid || !!contentFloorError}
+            isDisabled={!validatedDraft || !!contentFloorError}
```

This is the Preferred/structural fix from round 17's MED-6, taken exactly: gate on the presence of a
loadable resolved draft. The implementer went one step further and removed the now-redundant `isValid`
state entirely rather than leaving a dead variable — prompted, per their account, by `no-unused-vars`
firing the moment `!validatedDraft` subsumed it. That removal is a broader edit than the one term I
specified, so it was re-attacked, not accepted.

## Re-attack from first principles — the state table

The fix touches a guard, so I did not read it and agree. The Load button renders only when `pendingChoice`
is null (else the `if (pendingChoice) return <choice/>` early return fires). Over every reachable state in
which the Load button renders:

| state | `error` | `validatedDraft` | `isValid` (old) | `contentFloorError` | OLD `!!error \|\| !isValid \|\| !!floor` | NEW `!validatedDraft \|\| !!floor` |
|---|---|---|---|---|---|---|
| fresh loadable draft (non-row-E, passes floor) | null | set | true | undefined | **false → enabled** | **false → enabled** |
| success but floor fails (flag-only-V2+content, empty floor) | null | set | true | string | **true → disabled** | **true → disabled** |
| parse / Zod error (catch branch) | string | null | false | undefined | **true → disabled** | **true → disabled** |
| **dismissed-choice** (post-cancel, no effect re-run) | null | **null** | true | undefined | **false → ENABLED (MED-6)** | **true → DISABLED (fix)** |

The new gate **reproduces the old decision on the first three** and **flips only the fourth** — which is
exactly MED-6. No other reachable state changes.

**The `isValid` removal is behaviour-preserving**, established by tracing every writer:
- `isValid` was set `false` only in the **catch** branch, which also sets `validatedDraft = null` in the
  same branch — so `!isValid` and `!validatedDraft` are true together there; the term is subsumed.
- `isValid` was set `true` on **every** successful parse (before the `requiresChoice` split), and each
  post-split path sets `validatedDraft` to its matching null/non-null value in the same branch.
- **No other reader**: `git grep -n "isValid" 4e9da96 -- …JsonModalBody.tsx` → **zero** hits. The state
  was consumed only by the gate expression it was removed from.
- **Dropping `!!error` is safe**: `error` is truthy only in the catch branch, where `validatedDraft` is
  null, so `!validatedDraft` covers every state the old `!!error` disjunct disabled. No state has `error`
  truthy with `validatedDraft` non-null. (`error` state itself is retained — it still drives the error
  banner; only its use in the gate was dropped.)

**MEDIUM-4 is not widened.** The `!!contentFloorError` term is kept verbatim, so the flag-only-V2+content
case (`validatedDraft` non-null, floor fires) stays disabled exactly as before. The fix does not touch the
predicate divergence steering routed as minimum-fix-only.

## Established by execution — `probe-cr19` updated to 17/17, before/after measured

`probe-cr19-loadgate-fix/` now carries **both** gates as executable models over the **real**
`resolveContentLoss`/`validateContentRequirements`:

- `loadDisabled_old` = `!!error || !isValid || !!contentFloorError` (round-17 gate).
- `loadDisabled_new` = `!validatedDraft || !!contentFloorError` (round-18 gate).

**CR19-B** asserts the flip as a measurement: in the dismissed-choice state `loadDisabled_old = false`
(the MED-6 defect, retained as the control) and `loadDisabled_new = true` (the fix), and
`loadDisabled_new === siblingSubmitDisabled(null)` — **parity with the approved sibling**
(`NewMessageModal.tsx:191`, `disableSave = !loadedMessage || …`). CR19-A/C/D/E re-run against the live
(new) gate and hold: HIGH-1 closure intact, MEDIUM-4 case still blocked, non-members still load. The
`commitLoad` no-op invariant holds under both gates (defence in depth). Run captured at
`run-cr19-4e9da96.txt` (17/17).

## Verification — nothing inherited

| claim | instrument | result |
|---|---|---|
| typecheck | `npx tsc --noEmit` at `4e9da96` | **exit 0** |
| lint, the one changed file | `./node_modules/.bin/eslint '…/JsonModalBody.tsx' --max-warnings=0` | **0** |
| failure **set** unchanged | `baseline-expected-six/check-expected-six.sh 4e9da96` (clean `git archive`) | **MATCH**, clean **517/511/6** |
| MED-6 flip + HIGH-1 + MEDIUM-4, executed | `probe-cr19-loadgate-fix/` (real predicates; old+new gate models) | **17/17** |
| M8 mode predicate, collateral | `probe-cr3-mode-predicate/` | **122/122** |

**No new test**, and the clean total is unchanged (517/511/6) — consistent with a gate-expression change
plus a dead-state removal, no new logic. The implementer's working-tree **524/518/6** is the same set
inflated by the +7 foreign QA file, as in rounds 16–17.

## `isValid` removal — one note, not a finding

The removal is correct and I verified it changes no reachable behaviour. It does, however, mean the Load
button's disabled state is now derived **solely** from `validatedDraft` presence and the floor — there is
no longer an independent "is the current text valid JSON" signal in this component. That is fine today
because `validatedDraft` is null on every parse failure. If a future change ever sets `validatedDraft`
without having parsed successfully (e.g. an optimistic seed), the gate would no longer catch it. **Not a
defect in this tree** — stated so the coupling is on the record for whoever next opens this file. No action.

## Assumption Not Checked

**This review assumes the dismissed-choice residual state is reached only via `cancelChoice` with no
intervening effect re-run, and that the effect sets `validatedDraft`/`error` exactly as traced from
source; it does not mount the component to confirm the live effect scheduling.** `probe-cr19` models the
effect as a synchronous function of the raw input.

**Falsity signature**: a real mount shows the dismissed-state Load button **enabled** (e.g. an effect
ordering leaves `validatedDraft` transiently non-null after cancel), or a row-E paste's Load state differs
from the modeled `!validatedDraft` decision.

**Owner: QA, Phase 2** — the **same** mounted-render check already owed for the row-E choice closes this
too: mount `JsonModalBody`, paste row E, assert the choice renders; choose an option and assert it applies;
Cancel and assert the Load button is **disabled** with the Resolve banner shown. Named again in Next Steps.

## Captured instruments

| path | what it is |
|---|---|
| `verification/013/probe-cr19-loadgate-fix/gate-fix.cr19.test.ts` | 17 assertions; now spans ad9f331→4e9da96. CR19-A HIGH-1 closure (e61e602 control); **CR19-B MED-6 before/after** — `loadDisabled_old` dismissed→ENABLED (control) vs `loadDisabled_new` dismissed→DISABLED = sibling parity; CR19-C MEDIUM-4 unchanged; CR19-D resolved object passes floor; CR19-E non-members load |
| `…/probe-cr19-loadgate-fix/run-cr19-4e9da96.txt` | the round-18 run — 17/17 |
| `…/probe-cr19-loadgate-fix/README.md` | claims, model-vs-tree boundary, old-vs-new gate, coverage gaps |
| `…/probe-cr19-loadgate-fix/run-cr19-ad9f331.txt` | the round-17 run — 16/16 (retained) |

## Required Actions

**None.** HIGH-1 and MED-6 are both closed; M4 passes code review.

## Next Steps

1. **QA, Phase 2** — the mounted-render check for the row-E choice AND the dismissed-state Load-disabled
   assertion (one mount closes both this round's and round 17's Assumption Not Checked); plus the carried
   assumptions from rounds 9, 11, 12, 13, 14, round-8 INFO-1, and the MEDIUM-5 UX check from round 15.
   **Handing off to the qa subagent for the mount check.**
2. **`implementer-hooks-013-3`** — nothing outstanding on `JsonModalBody`/M4 from code review. Next unit is
   **M6** (the plan's last milestone; touches no source per the Serialised Shared Files line, verified
   round 17).
3. **`steering-hooks-013-2`** — **MEDIUM-4** remains the one routed pre-existing item (predicates diverge
   in `limits.tsx`/`index.ts`, owner-pending); the `JsonModalBody` floor gate is still its incidental
   mitigation and the MED-6 fix kept the `!!contentFloorError` term so it survives. Plan-level Status is
   yours to advance across M4/M6.
4. **A planner pass, when that queue reopens** — MEDIUM-1's reach into M4's Risks, unchanged.

# ROUND 19 — QA Phase 2 fix round (F-QA15/F-QA17/F-QA18), at `53beb37`

**Verdict: APPROVED.** The QA Phase 2 fix round passes code review. F-QA15 is closed structurally
(the Load gate now floors the RESOLVED draft — exactly what `commitLoad` loads); F-QA17 is an
export-only change over two set-equal constants; F-QA18 is coverage-only and its sweep is complete.
`Reviewed-At: 53beb37` — HEAD and both reviewed blobs (JsonModalBody.tsx `cfbec5b`,
discordResponseToMessage.ts `81f4562`) verified byte-identical to the commit at pass start AND end;
the tree did not move.

## The change (two source files, three findings)

- **F-QA15** — `JsonModalBody.tsx:159-160`. Was `contentFloorError = validatedDraft ?
  validateContentRequirements(validatedDraft) : undefined`; now
  `validateContentRequirements(applyDisposition(validatedDraft))`. The floor is computed over the
  RESOLVED draft. `commitLoad` (`:73`) loads `applyDisposition(validatedDraft)` — the gate now
  floors **exactly** the object Load produces. This is the structural fix recommended at round 16
  (CR18-D), not a point patch.
- **F-QA17** — `utils/discordResponseToMessage.ts:10,20`. `const` → `export const` on
  `SUPPORTED_TOP_LEVEL_TYPES`/`SUPPORTED_CONTAINER_CHILD_TYPES`. Diff is export-only (verified
  `53beb37~1..53beb37`); no membership change. The export lets F-QA17's parity test import the
  ingress copy and pin it set-equal to the shapes.ts copy.
- **F-QA18** — no code change (coverage-only), resolved on a sweep of V2-classification predicates.

## Re-attack from first principles — the fix touches a gate, so it was re-derived, not read-and-agreed

The Input Robustness order and the "re-attack any guard fix" rule apply. Established by execution
(`probe-cr21-fqa15-closure`, 30 assertions green at `53beb37`; mutation evidence recorded):

- **CLOSURE (CR21-B, 16 assertions).** All 8 row-D members QA enumerates classify row D
  (`requiresChoice=false`, `mode=classic`) AND now LOAD (`contentFloorError===undefined`). `switchToClassic`
  clears `IS_COMPONENTS_V2_FLAG` and filters components to type-1, so the resolved draft has
  `hasFlagV2=false` and `hasStructuralV2=false`; the floor's `hasV2 && hasContent` branch cannot fire
  post-resolution. The M2-a repair path for records 5712/5842/5855/5856 is open.
- **NO HOLE (CR21-C, 3 assertions).** The implementer's own test asserts only that row D loads. This
  probe adds the negative: empty draft, flag-only-empty (row C → `switchToV2` keeps it empty), and
  whitespace-only content all stay BLOCKED through the fixed gate (floor Branch 2, `!hasContent &&
  !hasComponents`). `applyDisposition` never manufactures content, so the fix opens nothing that was
  previously refused.
- **NO CRASH (CR21-E, 4 assertions).** The gate calls `applyDisposition(validatedDraft)` UNGUARDED,
  and `applyDisposition` throws when `requiresChoice` (row E). It is safe **only** because the parse
  effect stores `validatedDraft=null` for row E (`setValidatedDraft(null)` on `requiresChoice`, then
  return) and the gate short-circuits on `!validatedDraft`. Every row-E member is asserted
  `requiresChoice=true` AND `applyDisposition(rowE)` throws — documenting the load-bearing coupling.
  Because `resolveContentLoss` is a pure function of the draft's own fields, the render-time
  recomputation inside `applyDisposition(validatedDraft)` cannot diverge from the parse-time
  classification that produced the stored non-null `validatedDraft`.
- **CONTROLS (CR21-D).** Rows A/B/C legit drafts still LOAD — the fix is not a blanket permit.

**Mutation evidence.** Modelled OLD gate (floor raw draft) vs FIXED gate (floor `applyDisposition`)
on the 5712 shape: OLD → disabled=true (the defect), FIXED → disabled=false (the fix). Both asserted,
both passed — CR21-B genuinely flips red on a revert.

## Steering's four checks — each re-derived, not trusted

1. **F-QA15 closure over all 8 row-D members + no hole on the resolved draft** — CONFIRMED
   (CR21-B/C/E above). The gate floors the resolved draft = what `commitLoad` loads; there is no
   double-strip because `validatedDraft` is the raw parsed object and `applyDisposition` is applied
   once, identically, at both the gate and `commitLoad`.
2. **Implementer's "28/29, sole failure = obsolete regression-anchor"** — CONFIRMED independently. Ran
   QA's `probe-qa-p2-rowd-load-gate` at `53beb37`: 28 passed / 1 failed. The one failure is Block A's
   source-text anchor asserting the PRE-fix gate expression `validateContentRequirements(validatedDraft)`
   is present; the fix replaced it with `applyDisposition(validatedDraft)`. This is exactly the
   README's predicted R3 kill. Blocks B/C/E all green — no real regression; the anchor is obsolete by
   design, and QA owns re-anchoring it (F-QA16).
3. **F-QA18 sweep completeness** — CONFIRMED. Every production V2-classification predicate —
   `hasV2Components` (`index.ts:31`), the two same-set uses at `index.ts:71,655`, and the two inline
   duplicates at `limits.tsx:117` and `backfillValid.ts:79` — derives from the single constant
   `V2_COMPONENT_TYPE_VALUES = [9,10,11,12,13,14,17]` (`constants/messageLimits.ts:9`), which includes
   type 11 (Thumbnail). Probed the predicate's blind spot (a hand-rolled classifier hardcoding type
   numbers): the only hardcoded `type===N` comparisons are structural tree-walks (`sumDisplayableText`,
   drop-labeling recursion), none a V2/classic classifier. `gateBeforePersist` → `resolveContentLoss`
   → `hasV2Components`, so the persist gate treats a top-level Thumbnail as V2. Coverage-only resolution
   is sound.
4. **F-QA17 sets genuinely agree today** — CONFIRMED at runtime (CR21-G, my own instrument, not QA's
   suite). Both copies execute to top-level `{1,9,10,12,13,14,17}` and container-child
   `{1,9,10,12,13,14}`. Export-only diff; sets unchanged and equal.

## Verification — nothing inherited

- **tsc**: 0 errors project-wide at `53beb37` (`DATABASE_URL` on a dead port).
- **eslint** on the two changed files: 0 errors, 1 warning — `discordResponseToMessage.ts:159`
  max-len 136 — which is **pre-existing** (byte-identical at `53beb37~1`, not introduced by the
  export-only change, and not on a changed line). Not a finding for this round; it predates F-QA17.
- **probe-cr21-fqa15-closure**: 30/30 (closure + hole + crash-invariant + parity) plus CR21-G 2/2.
- **QA's probe reproduced**: 28/29, the single failure being the obsolete Block-A anchor.

## TDD

No exemption claimed. F-QA15 ships with `013-fqa15-rowd-load-gate.test.ts`, F-QA17 with
`013-fqa17-supported-types-parity.test.ts`, F-QA18 with `013-fqa18-thumbnail-persist-gate.test.ts`
(the implementer's tests — QA owns executing them). The one coverage gap I note, not as a blocker:
the implementer's F-QA15 test asserts only that row D LOADS; it lacks the negative (that
empty/flag-only-empty still BLOCK). My CR21-C supplies that hole-check as review evidence. Handed to
the implementer with the finding below.

## Positive observations

- The fix is the **structural** option from round 16 (CR18-D), not a point patch: making the gate
  floor the same resolved object `commitLoad` persists eliminates the class "gate and load disagree
  about the draft," rather than special-casing row D.
- F-QA17 follows the M4-b pin-set-equal pattern already used against the schema discriminants —
  consistent with the established approach to duplicated support sets.

## Finding — INFO (routed, non-blocking)

**INFO-3 — F-QA15's shipped test asserts closure but not the absence of a hole.**
- **Location**: `website/src/utils/__tests__/013-fqa15-rowd-load-gate.test.ts` (the row-D-loads test).
- **Class**: a fix test that asserts the newly-permitted set loads but not that the
  previously-refused-and-still-invalid set stays refused cannot catch a future regression that
  widens the gate into a blanket permit.
- **Enumeration**: the draft classes that MUST stay blocked through this gate are exactly
  {empty draft; flag-only-empty (row C resolving to empty); whitespace-only content, no flag/comps}.
  Three members; enumerated and executed green in `probe-cr21-fqa15-closure` CR21-C. The predicate
  does NOT cover row-E drafts (they never reach the floor — `validatedDraft` is null), which is
  correct to exclude.
- **Required Action**: **Minimum** — the implementer adds the three CR21-C negative cases to
  `013-fqa15-rowd-load-gate.test.ts` (the instrument already exists at
  `verification/013/probe-cr21-fqa15-closure/fqa15-closure.cr21.test.ts` CR21-C; port it).
  **Preferred (structural)** — none; the gate itself is already structural. `no test` is NOT recorded:
  the check belongs in the project's own suite (a vitest spec already reaches this code), so authoring
  it is the implementer's, not mine.
- **Magnitude**: not a correctness defect in shipped code — the gate is correct today (proven by
  CR21-C). This is a test-coverage gap: an unmeasured future-regression exposure, not a present fault.

## Assumption Not Checked

**This review assumes React applies the computed `isDisabled` to the rendered Load button as
written (`!validatedDraft || !!contentFloorError`), and does not test it.** The premise: the pure
function `contentFloorError` computing `undefined` for a row-D draft actually renders an enabled
button in a mounted `JsonModalBody`. Falsity signature: an operator opens record 5712's JSON, sees
the flag-conflict notice, presses Load, and the button is still inert — row D remains non-loadable
in the browser despite the gate computing `false`. This is the identical DOM residue QA's own probe
states (no `@testing-library/react`/jsdom/happy-dom at this tree; vitest `environment: node`,
`include: src/**/*.test.ts` excludes `.tsx`). **Owner: QA Phase 2's refresh pass** — a mounted or
manual-in-browser check of the Load button's disabled state for a row-D draft, routed in Next Steps.

## Captured instruments

| path | what it is |
|---|---|
| `verification/013/probe-cr21-fqa15-closure/fqa15-closure.cr21.test.ts` | 30 assertions at `53beb37`: CR21-A shipped-gate anchors; **CR21-B closure** (8 row-D members load); **CR21-C hole check** (empty/flag-only-empty/whitespace stay blocked); CR21-D controls; **CR21-E crash-invariant** (row-E → null stored, applyDisposition throws); CR21-F single-source parity |
| `…/probe-cr21-fqa15-closure/fqa17-parity.cr21.test.ts` | CR21-G, 2 assertions — the two `SUPPORTED_*_TYPES` copies execute to equal sets, independent of QA's suite |
| `…/probe-cr21-fqa15-closure/vitest.config.ts` | aliases `~`→website/src; run from `website/` |
| `…/probe-cr21-fqa15-closure/README.md` | claim-vs-QA's-claim boundary, fix description, block table, mutation evidence, DOM residue |

QA's `probe-qa-p2-rowd-load-gate` was reproduced read-only from its intended location (temp copy
into `src/utils/__tests__/`, removed after) — 28/29 as above; not modified.

## Required Actions

**None blocking.** F-QA15/F-QA17/F-QA18 all pass code review. One non-blocking INFO-3 (test-coverage
gap) routed to the implementer.

## Next Steps

1. **QA, Phase 2 refresh pass** — (a) this round's Assumption Not Checked: the mounted/in-browser
   Load-button disabled-state check for a row-D draft (record 5712), which also closes the carried
   row-E mount assumption from rounds 16-18; (b) **F-QA16** — re-anchor
   `probe-qa-p2-rowd-load-gate` Block A to the fixed gate (its one failure is the now-obsolete
   pre-fix source anchor; do NOT restore the Block-E first line asserting "the flag never reaches the
   textarea" — substantively false at the tip under D18); (c) execute the three shipped fix tests
   (`013-fqa15/17/18-*.test.ts`) and the carried assumptions from earlier rounds. **Handing off to
   the qa subagent for test execution.**
2. **`implementer-hooks-013-3`** — non-blocking **INFO-3**: port the three CR21-C negative cases into
   `013-fqa15-rowd-load-gate.test.ts` so the fix test asserts no-hole, not only closure. Nothing else
   outstanding on F-QA15/17/18 from code review.
3. **`steering-hooks-013-2`** — verdict APPROVED at `53beb37`. **MEDIUM-4** remains the one routed
   pre-existing item (predicates diverge in `limits.tsx`/`index.ts`, owner-pending); F-QA15's floor
   gate is still its incidental mitigation and the fix preserved the `!!contentFloorError` term, so it
   survives. Any commit after `53beb37` re-opens full re-verification — tell me the new SHA.

# ROUND 20 — owner ruling 2026-08-25, toast→persistent-vessel, at `abcf585` (branch `chain/013-toast-vessel`)

**Verdict: APPROVED_WITH_COMMENTS — scoped (see Authority). The code is sound and conforms to the
relayed ruling; the one substantive judgment (the retained Load toast) is a UX product decision
routed to the owner, and it does not hold the tree.** `Reviewed-At: abcf585` — HEAD and all five
blobs verified byte-identical to the commit at pass start and end; branch `chain/013-toast-vessel`,
base = merge-base(abcf585, a151fb4) = a151fb4 (my last-approved tree), exactly one commit atop it.

## Authority — stated because it is thin, and it bounds this verdict

This work exists on an **owner ruling given in conversation on 2026-08-25**, relayed by
steering-hooks-013-2. **013's plan has NOT been revised and no planner ran** — I re-checked: the word
"toast" appears in the plan body zero times, and `planner-hooks-013-2` has not produced a document.
There is therefore **no plan acceptance criteria, no milestone, and no architectural grounding** for
this change; the review's source of truth is the owner's ruling as relayed and as I re-derived it
from his own words. **I scope my verdict accordingly** (role definition, item 4): I assess (a) code
quality, (b) conformance to the stated principle, (c) completeness of the enumeration — and I do
**not** ratify the relayed ruling itself (owner's to confirm) nor make the product call on the
retained site (owner's). If the relayed ruling is incomplete or mis-transcribed, my conformance
finding inherits that. This is a legitimate scoped verdict, not a claim of grounding I did not have.

**Risk posture — this is a POST-RELEASE fix to live code.** I re-derived it, not from a tracking
ref: `git ls-remote origin master` → `a151fb47a84d…` = a151fb4. So the tree I approved at round 19 is
live on master. The owner's "fix before release" was unsatisfiable from issuance (the push preceded
it). Consequence for the pipeline: devops must re-run readiness and cut a NEW release; this is not a
pre-release gate. Neither steering nor devops authored the push; the owner has not confirmed it. Not
mine to resolve — recorded for whoever owns the deploy.

## The ruling, and the class it defines

Owner (two parts, the second amends the first): permanent/stateful warnings put into toasts are
wrong UX and must become persistent in-surface messages; transient action-reports (a request firing
or failing, or "an action where the state cannot be represented persistently") may stay toasts.
Scope: **the notices 013 itself introduced**, not older ones; app-wide sweep declined.

**Enumeration (class-scoped, re-run by me, git-side).** The class is "toast calls 013 introduced."
`git diff c85945f..a151fb4 -- 'src/**/*.tsx' 'src/**/*.ts' ':(exclude)*__tests__*'`, added lines
matching `toast.`, returns **exactly three, all `toast.warn`**:
- `NewMessageJsonInput.tsx` — the paste/new-message JSON surface settled notice
- `MessageProvider/index.tsx` — the code-import `droppedComponentTypes` "Not carried" notice
- `JsonModalBody.tsx:72` — the edit-modal Load-action settled notice

013 added **zero** `toast.error/loading/success/info`. So the class is fully bounded by these three,
and the change disposes all three (2 converted, 1 retained). **What the predicate cannot see**: a
stateful notice delivered through a non-`toast.` channel (e.g. a bespoke portal) — none exists in the
013 diff. Enumeration complete; the disposition covers 100% of the class.

## The two conversions — APPROVED, clean, and they close my own rounds 9–11 finding

- **NewMessageJsonInput.tsx** — the `react-toastify` import and the `useRef` `lastNoticeClassRef`
  debounce are removed; the settled notice becomes `useState` `settledNotice`, reset to `null` at the
  effect top and set on the settled branch, rendered `<NullableComponent show={!error &&
  settledNotice}>` in the same pattern as the file's existing `droppedComponentTypes` block. This
  **structurally dissolves the re-fire class I raised across rounds 9/10/11** (MEDIUM-2: the toast
  re-fired because the catch branch cleared the ref — 9 identical toasts over 8 round-trips). There is
  no toast to re-fire now; the rendered `<p>` reflects current state, reset each parse. The owner's
  principle vindicates that finding at the root. Correct here because this surface **live-applies** on
  every parse (`setMessage(applyDisposition(validated))` in the effect, line 108), so the notice is a
  continuous property of the applied state.
- **MessageProvider/index.tsx** + **CodeMessageNotice.tsx** (new) + **layout.tsx** — the dropped-types
  toast becomes `codeMessageDroppedNotice` provider state (null when no drops), exposed on the context
  `State`, rendered by the new `CodeMessageNotice` persistent banner mounted in `[id]/layout.tsx`
  (covers edit and send). Internal-consistency argument holds: the other M3-b entry points already
  render this identical fact persistently, so the code path was the sole toast outlier. No stale-stuck
  risk: the effect resets to `null` on any `codeMessage` without drops (`?.length ? msg : null`); the
  four other `toast.*` sites in the provider are request lifecycle (transient) and correctly untouched
  — the test even pins that they remain, so this is not a blanket removal.

No regression in either conversion — the notices are strictly more visible (persistent vs transient),
which is the owner's intent.

## The retained site (JsonModalBody Load toast) — the substance; attacked, then routed to the owner

Steering asked me to attack this, not confirm it. I did. **My adversarial finding, and why it does
not become a rejection:**

The sharp attack is the **sibling asymmetry**: the retained notice is `noticeMessageForSettled(...)`,
the *same function* NewMessageJsonInput now renders persistently, and JsonModalBody *already has a
live render phase* with four persistent vessels (error, droppedComponentTypes, contentFloorError,
dismissedChoice, lines 221–242). So a persistent vessel for the settled notice is demonstrably
*possible* here — the implementer's "no durable place exists" claim is about the *post-`onClose()`*
state, and it overlooks the *during-edit* vessel the sibling uses.

**Why it nonetheless does not hold the tree:**
1. **A genuine interaction-model difference blunts the asymmetry.** NewMessageJsonInput **live-applies**
   on every parse, so its notice is continuous state. JsonModalBody applies **discretely on a Load
   click** and then `onClose()`s — the notice fires once, reporting what the Load action did, and no
   "after" surface stays mounted. Under the owner's own words — "reporting on an action" — that is a
   defensible reading of transient.
2. **The owner himself named "the Load one"** as the site his refinement said cuts the other way. The
   determination he set is conditional ("*if* the error is not stateful but transient"), and the
   implementer reached the owner's own conclusion independently, disclosing it as a deliberate finding
   with a repo-wide vessel search — not an oversight.
3. **The residue is a UX product judgment**, hinging on whether the *explanation* (why the mode
   changed) is state the owner wants retained after Load, or action-feedback. That is his call, and a
   peer relay cannot settle it for me.

**Disposition — OWNER-DECISION (routed, not held).** I record the asymmetry as the evidence the owner
needs, and the interaction-model distinction as the case for the retention. If the owner wants the
Load notice persistent, the shipped-here path is to render `noticeMessageForSettled` in
JsonModalBody's existing during-edit notice region (mirroring the sibling) and drop the line-72 toast
— a small, contained change, not new UI machinery. If he ratifies the retention, nothing changes.
**Named in Next Steps so it is routed, not shelved.** CRITICAL/HIGH authority is not on this ladder;
this is not a code defect.

## TDD — ordering lapse disclosed with compensating evidence (accepted, verified not accepted)

The implementer discloses implementation-before-test and compensates by the same stash-revert
procedure used earlier in this chain: `git stash` the three tracked files, `mv` the two untracked
files out, run the new spec against the genuinely-reverted tree — **7/9 fail** for correct reasons
(old toast/import present, new state/exports/file absent), **2/9 pass** because they assert *unchanged*
code (JsonModalBody still toasts; MessageProvider's transient toasts remain) — restore, re-run 9/9.
That is a valid red-demonstration for a source-text spec and the disclosure is complete. **The 2
green-on-reverted assertions are correct, not vacuous**: they pin the deliberate non-member and the
not-a-blanket-removal, which are true before and after by design.

**On the test's nature (LOW, noted):** `013-owner-toast-vessel-2026-08-25.test.ts` is **source-text
pinning** (`readFileSync` + `toContain`), not behavioural — it locks the code shape (toast removed,
state added, rendered) but cannot observe the notice actually rendering, being visible, or being
styled. That is the same DOM-harness residue every round of this chain carries (no jsdom/RTL at this
tree). Acceptable as a shape-lock; it is not evidence the UX works. Routed as Assumption Not Checked.

## Verification — nothing inherited

- **tsc**: 0 errors project-wide at abcf585 (`DATABASE_URL` dead port).
- **eslint** on the four changed source files: 0 errors (the new test file shows only the chain's
  standing per-file `parserOptions.project` `__tests__`-exclusion parse error, not a content finding).
- **Enumeration** (013's introduced toasts): git-side, three `toast.warn`, all dispositioned.
- **SHA**: HEAD abcf585, all five blobs byte-identical at pass start and end.

I did not run the project suite (QA's role); the implementer reports 559/559/0. My clearance rests on
the code read, the git-side enumeration, and tsc/eslint — not on that number.

## Assumption Not Checked

**This review assumes the persistent notices actually render — visible and correctly styled — in a
mounted browser, and does not test it.** The premise: `settledNotice`/`codeMessageDroppedNotice` set
to a string produces a visible in-surface message via `NullableComponent`. Falsity signature: a user
pastes a row-D JSON (new-message modal) or imports a code message with dropped types and sees *no*
message where the toast used to be — the notice silently lost rather than made persistent. No DOM
harness exists at this tree, so the shipped test (source-text) cannot see it. **Owner: QA's execution
pass and UAT's business-value check** — the whole point of this change is runtime-visible UX, which
only a mounted render or manual check confirms. Routed in Next Steps.

## Captured instruments

No new probe: the review's load-bearing evidence is git-side and reproducible from commands in-line
(the `c85945f..a151fb4` toast enumeration; the `abcf585` blob-identity table; the source reads of the
five diffs). Nothing here rests on a computed artifact that needs to live under `verification/`.

## Required Actions

**None blocking.** The code passes code review, scoped to what the authority permits. Two routed,
non-blocking items below.

## Next Steps

1. **Owner (the one decision that is his)** — ratify or reverse the retained `JsonModalBody` Load
   toast. My analysis: the notice is the same `noticeMessageForSettled` the sibling now renders
   persistently, and JsonModalBody has a during-edit vessel that could hold it; the case *for* the
   toast is the live-apply-vs-apply-on-click interaction difference and your own "the Load one" carve-
   out. If persistent is wanted: render the notice in JsonModalBody's existing during-edit region and
   drop the line-72 toast — small and contained. **This is a product call; I do not decide it and do
   not hold the tree on it.**
2. **QA + UAT** — the Assumption Not Checked: a mounted/manual check that the two converted notices
   actually render (visible, styled) where the toasts used to be. The shipped test is source-text
   only and cannot see it. **Handing off to the qa subagent for execution.**
3. **Whoever owns the deploy (via steering)** — this is a post-release fix (a151fb4 is live on
   origin/master, re-derived via `git ls-remote`). All a151fb4-stamped QA/code-review/UAT verdicts are
   expired; devops must re-run readiness and cut a new release once this branch clears the pipeline.
4. **Planner/owner** — the process gap: substantive live-code change on a verbal ruling with no plan
   revision and no planner. Not mine to fix; recorded so it is visible.
