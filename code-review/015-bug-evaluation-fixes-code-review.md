---
ID: 015
Origin: 015
UUID: 861e5f61
Reviewed-At: "2a4533b,c5303ca,8de2b53 — repos=agent-output,website,preview-image-generator; Round 21 (plan gate read, rev 28) at agent-output 2a4533b, its figures checked against captures at preview-image-generator 8de2b53 and website c5303ca; Round 14 sub-entry (CR-38 fix) at website c5303ca; Round 14 sub-entry (CR-37, CR-26 fixes) at website 2618926; sub-entry (CR-26, QAF-34, QAF-35, CR-35, CR-36) at website b195eeb; Round 18 sub-entry (CR-27 fix, D36 guard) at preview-image-generator 8de2b53, complete; Round 2/3 sub-entry (QAF-27, QAF-20, test-only) at website 4f9ed85; Round 20 (plan gate read, rev 27) at agent-output 18d361c, its mechanisms executed at website 476c633 and preview-image-generator 6c613a5; Round 19 (plan gate read, rev 26) at agent-output c375d2c, its mechanisms executed at website 476c633 and preview-image-generator 6c613a5 (base 471578f); Round 18 (M8) at preview-image-generator 6c613a5; Rounds 16 (M5-i) and 17 (M7) and the Round 10 (M5-h), Round 14 (CR-22/24/25) and Round 7 (M4-d non-JSON cells) sub-entries at website 476c633; criteria plan rev 27 (18d361c) for M8, rev 25 (dd9e88a) earlier. Earlier: Round 14 at 24ac49f, Round 10 at da24eb7, the Round 2 sub-entry (CR-15) at 3031878"
Status: In Review
Status-Detail: "Round 18 sub-entry (QAF-37 rig cell at agent-output 8fb1eee): APPROVED. Round 21 (rev 28 gate read): APPROVED_WITH_COMMENTS — CR-32, CR-33, CR-34 RESOLVED; CR-39 LOW (the RK-8 carrier probes named by description and 'on the deployed engine'; to the M9 handoff at mint). Round 14 sub-entry at website c5303ca: APPROVED — CR-38 RESOLVED (redundant Button autofocus effect removed; react-aria's path guarded). Website c5303ca supersedes 2618926 for QA. Round 14 sub-entry at website 2618926: APPROVED_WITH_COMMENTS — CR-37 and CR-26 RESOLVED (dynamic import() the stated residue). Earlier sub-entry at website b195eeb (CR-26 fix, QAF-34, QAF-35, CR-35, CR-36): REJECTED for CR-26's callers on CR-37 MEDIUM (Button autoFocus and DiscordMessageEditor onMount effects survive emptying; severity floor, blocks QA for b195eeb). CR-26 narrowed (react-use/lib and /esm index imports pass, LOW). CR-35, CR-36 RESOLVED; QAF-34 and QAF-35 met. Round 18 sub-entry at generator 8de2b53: M8 APPROVED_WITH_COMMENTS. CR-27 and CR-28 RESOLVED; D36 guard meets M8-d (d) as written; the drift run measures the post-line residue (pending acquire held, 3,700 to 4,700 launches/s, ~36k stderr lines/s on node 24 in E-1): CR-34 LOW (planner, D37 fold). Round 2/3 sub-entry at website 4f9ed85 (QAF-27, QAF-20, test-only): APPROVED_WITH_COMMENTS, CR-35 LOW (formatKey test not beside its module) and CR-36 LOW (record count). Round 20 (rev 27 gate read): APPROVED_WITH_COMMENTS (CR-32, CR-33 LOW, planner). Round 19: REJECTED for M8-b D35 limb only, superseded and folded at rev 27. Round 17 (M7), Round 16 (M5-i): APPROVED. M5-h: Round 10 APPROVED_WITH_COMMENTS (CR-29 RESOLVED). M6: Round 14 APPROVED_WITH_COMMENTS (CR-26 LOW). Round 15 (rev 25): APPROVED."
Round: 21
Verdict: APPROVED_WITH_COMMENTS
---

# Code Review: Plan 015 — Bug-evaluation fixes

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`.
- Round 1 read rev 8 at `ec45936`.
- Round 2 recorded its criteria from rev 8 at `bf10a46` and read rev 9 and rev 10 at `bceb84a` as growth.
- The Round 2 sub-entry and Round 3 review against rev 13 (`9cbe755`), whose delta `14fe94f..9cbe755` I also read as one of its gates (steering's brief, 2026-11-08).
- Round 4 reads the delta `9cbe755..565e240` (revs 14–16) as one of its gates (steering's brief, 2026-11-08, after `/clear`).

**Implementation References**:
- `implementation/015-bug-evaluation-fixes-m0-implementation.md` (`6299c9b`, `Handoff-At` 037935d).
- `implementation/015-bug-evaluation-fixes-m1-implementation.md` (`7f45611`, `Handoff-At` be881c9; § Fix Round 1 at `3ba52f3`, `Handoff-At` 6001f7f; § Fix Round 2 at `c938573`, `Handoff-At` 579e8b2).
- `implementation/015-bug-evaluation-fixes-m2-implementation.md` (`3ba52f3`, `Handoff-At` 6001f7f).
- `implementation/015-bug-evaluation-fixes-m4-implementation.md` (`d30916f`, `Handoff-At` 1e12837); reopened at `40ece24`, `Handoff-At` 6c42032, for D29 and QAF-25).
- `implementation/015-bug-evaluation-fixes-m5-implementation.md` (`40ece24`, `Handoff-At` da24eb7).
- The M1 document again at `40ece24` (§ CR-15, `Handoff-At` 3031878).

**Date**: 2026-11-08
**Reviewer**: Code Reviewer (code-reviewer-hooks-015)

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T06:03 | steering-hooks-015 → code-reviewer-hooks-015 (brief); implementer-hooks-015 handoff at website `037935d` | Round 1: review M0 | APPROVED_WITH_COMMENTS. CR-1 LOW and CR-2 INFO. TDD row 2's missing pre-change red closed by `verification/015/cr-m0-bot-typecheck-probe.sh`, run 1. |
| 2026-11-08T06:32 | implementer-hooks-015 (message) | Round 1 sub-entry: CR-1 fix confirmation at agent-output `96e123d` | CR-1 RESOLVED. `verification/015/m0-testresults-paths-037935d.txt` holds 54 paths, 0 under `bot/`. Its membership equals a second, differently shaped instrument (`git ls-tree -r --name-only 037935d`, test-shaped files): `diff` empty. |
| 2026-11-08T06:32 | implementer-hooks-015 (message) handoff at website `be881c9` | Round 2: review M1 (F-1 to F-11), `037935d..be881c9` | REJECTED. CR-3 MEDIUM: sign-out with a cached `null` skips the revoke and the `Accounts` update. CR-4 MEDIUM: the cookie parser throws on legal `%` octets. CR-5 LOW: revoke failures are silent. M1-a, b, d, e, f, g, j and k pass. M1-h reopened under D21 (plan rev 10) and is re-checked at the fix SHA. The `be881c9` "formatting only" claim holds for production code. |
| 2026-11-08T06:44 | implementer-hooks-015 (message) handoff at website `6001f7f`; steering-hooks-015 (message, review against plan rev 13 `9cbe755`) | Round 2 sub-entry: M1 fix round 1 (`be881c9..6001f7f`) | CR-4 RESOLVED (structural; re-attacked, `cr-m1-cookie-reattack-run1.txt`). M1-i is met under rev 13. CR-5 DECLINED by the implementer. CR-3 stays open: folded at rev 12, code held. M1-h is held for the rev 13 round, and the rebuild owes one cell per decision-table row. New: CR-6 LOW (the CR-4 sweep's `Providers.tsx` disposition) and CR-7 LOW (rev 13 M1-i's "present"). Round 2's REJECTED stands for M1-c and M1-h only. |
| 2026-11-08T06:44 | implementer-hooks-015 (message) handoff at website `6001f7f` | Round 3: review M2 (F-12, F-13, F-14, F-43; QAF-1) against plan rev 13 | APPROVED_WITH_COMMENTS. M2-a to M2-d and QAF-1 are met. CR-8 LOW: the colour sweep misses `Picker.tsx`. CR-9 LOW: a lint suppression keeps the dead `validateEmbed`. CR-10 LOW: the touched supplemental test file keeps a transcription and tautologies. |
| 2026-11-08T06:57 | steering-hooks-015 (message, after `/clear`) | Round 4: plan gate read, `9cbe755..565e240` (revs 14–16): M1-i (CR-7), M2-a/M6-f (CR-8), M4-d (D24–D26) | REJECTED for M4-d only. CR-6, CR-7 and CR-8 are dispositioned by the folds. CR-11 MEDIUM: M4-d's `getFromUrl` property names the channel and message groups but not the guild group, which is the only input to the authorization gate. CR-12 HIGH, pre-existing on `master`, escalated: `getFromUrl` authorizes the link's guild and fetches the link's channel with the bot token, and nothing ties the two together. Instrument: `verification/015/cr-m4d-link-class-sweep.sh`. |
| 2026-11-08T06:59 | planner-hooks-015 (message), plan rev 17 at `94e9987` | Round 4 sub-entry: CR-11 fix confirmation | CR-11 RESOLVED. M4-d's `getFromUrl` limb is now restated by destination: the link's own guild id goes to `authorizeGuildAdmin`, and its channel and message ids go to the request. Round 4 is now APPROVED_WITH_COMMENTS. CR-12 is with the owner. The rest of rev 17 (the two-site enumeration, M-C4-1) is outside this sub-entry. |
| 2026-11-08T07:04 | steering-hooks-015 (message) | Round 5: plan gate read, `565e240..67cb5e7` (rev 17–18), M4-d only: M-C4-1's two sites and the D27 rider for CR-12 | APPROVED_WITH_COMMENTS. The two-site sweep reproduces (2 sites). The CR-12 rider's property and cell are discriminating. CR-13 LOW: `redis.fetchChannel`, which the rider reuses, types Discord's channel as `Guild`, so `guild_id` is not on its type. The M4 code review becomes Round 6. |
| 2026-11-08T07:06 | steering-hooks-015 (message) | Round 6: plan gate read, `67cb5e7..330348f` (rev 19), CR-12 rider only | APPROVED, no findings. Belonging as `guild_id` equality refuses an absent `guild_id`. The three refusal texts match `fetchChannel` at `6001f7f` word for word. The unmapped failures (no response; cache-lock wait timeout) throw before any content, so the safety property covers them. The M4 code review becomes Round 7. |
| 2026-11-08T07:08 | qa-hooks-015 (message; Assumption Not Checked routed from `qa/015-bug-evaluation-fixes-qa.md` `a47f5e9`) | Round 6 sub-entry: `authorizeGuildAdmin`'s refusal path, read as the rider's premise | No finding. A signed-in non-owner, non-Administrator of server A is refused with FORBIDDEN before any message fetch. The admin-bit test was run on the real module, 6 of 6 as expected (`verification/015/cr-m4d-admin-bit-probe-run1-6001f7f.txt`). Stated residue: the 600 s `user-guilds` cache. |
| 2026-11-08T07:21 | implementer-hooks-015 (message) handoff at website `1e12837`; steering-hooks-015 (Round 7 held for one tree, option (a)) | Round 7: review M4 (F-16, F-17, F-18, F-27 at both sites, D27 rider, CR-11, CR-13) against plan rev 19 | APPROVED_WITH_COMMENTS. Every limb is met. The rider was attacked on the real `getFromUrl` with only Redis, Postgres and Discord faked: 26 cases at `1e12837` all refused or were controls as expected, and the attack leaks at `6001f7f` (`cr-m4-getfromurl-attack-run2/3`). CR-14 LOW: the two F-27 sites answer a failed *webhook* fetch differently. CR-11 and CR-13 RESOLVED. |
| 2026-11-08T07:25 | implementer-hooks-015 (message) handoff at website `579e8b2` (§ Fix Round 2, `c938573`) | Round 2 sub-entry: the M1-c and M1-h rebuild (`1e12837..579e8b2`), plus CR-9 and CR-6 | Round 2 is now APPROVED_WITH_COMMENTS for M1. CR-3 RESOLVED, structurally: sign-out decides from the `Accounts` row, and `skipUpdate` is gone. My probes give 9 of 9 rows as expected at `579e8b2`, and they go red at `6001f7f` on cached `null` and on the lookup error. M1-h: every one of the eight rows has a cell. CR-15 LOW: row 2's "M rejects after the function returned" member has no cell, and by reasoning it is covered by the during-A cells. CR-9 and CR-6 RESOLVED. |
| 2026-11-08T07:26 | steering-hooks-015 (message) | Round 8: plan gate read, `330348f..e118cc3` (rev 20, D29 for CR-14) | REJECTED for the webhook-load limb only. CR-16 MEDIUM: the limb places "Invalid URL" "at the webhook URL field" and "under the field" at both sites, but at `1e12837` the New Message dialog has no field-level error. Its webhook errors render in one shared line below the load options. The rest of the delta (the old-message clause now scoped to the message fetch, D29's registration) is approved. |
| 2026-11-08T07:29 | steering-hooks-015 (message); planner-hooks-015 (message) | Round 9: plan gate read, `e118cc3..3d193f9` (rev 21: the CR-16 fold, D30) | APPROVED, no findings. CR-16 RESOLVED, option (a): the dialog's "Invalid URL" goes on its shared error line, and the send page keeps its field error. D30 removes M3, which carried no code-review limb. Its evidence (`m3-chrome-read/README.md`, `8996505`) exists and states what the plan cites. No M3 code is on the chain branch. |
| 2026-11-08T07:55 | implementer-hooks-015 (message) handoff at website `6c42032` (M4 reopen) and `3031878` (M1); steering-hooks-015 (brief, after `/clear`) | Round 2 sub-entry: CR-15 at `3031878` | CR-15 RESOLVED. The row-2 after-return cell is red under `m1h-message-handler-dropped` (its title is among the 6 failures; control 30 of 30). |
| 2026-11-08T07:55 | same handoff | Round 7 sub-entry: M4's D29 change and the QAF-25 cells (`579e8b2..46a9cab`, plus `6c42032`), bound to `da24eb7` | M4 stays APPROVED_WITH_COMMENTS. CR-14 RESOLVED: the dialog shows "Invalid URL" on its shared error line, no field error was added, and each site's cell asserts the literal exactly once, in place. CR-17 LOW: the two sites write the literal by hand, while D24's sibling text is a shared constant. The rider's files are unchanged, so the attack was not re-run. |
| 2026-11-08T07:55 | implementer-hooks-015 (message) handoff at website `da24eb7`; steering-hooks-015 (brief) | Round 10: review M5 (F-19 to F-26) against plan rev 21, with the rulings `a49da66` and `c1be05e` recorded as growth | REJECTED for M5-h only. CR-18 MEDIUM: a `/preview` JSON object of the wrong shape still crashes the page. 4 of 5 probed members throw in `makeEditable`, with both controls as expected (`verification/015/cr-m5-probes/run1-da24eb7.txt`). Steering's 07:30Z call puts that class in M5-h. M5-a to M5-g are met. CR-19 LOW: a hand-rolled latest-value ref where `useLatest` is the repo's idiom. |
| 2026-11-08T08:02 | steering-hooks-015 (brief); planner-hooks-015 (message) | Round 11: plan gate read, `3d193f9..5201612` (rev 22): M5-h classes (1)–(3) and X-19 (CR-18 fold, D31), M6-l (vi) (D32) | APPROVED_WITH_COMMENTS. CR-18's plan half is folded: every listed class (3) member crashes the page at `da24eb7`, by execution (`cr-m5-probes/edge-run3-da24eb7.txt`, `real-run4-da24eb7.txt`). CR-20 LOW: `embeds:""` and `fields:""` crash in the editor's `validateEmbedCharacterCount`, not in `makeEditable`, so "read from its source" is the wrong basis. Four members (array elements, a type-17 `null` direct child) render but are left open. X-19 cites my stubbed run. M6-l (vi): the sibling line and border reach the Send page through `MessagePreview`. No finding. |
| 2026-11-08T08:08 | steering-hooks-015 (brief) | Round 12: plan gate read, `5201612..39dbc0d` (rev 23): M5-h (3) as the crash-set property, X-19, M6-l (ii) one literal, M6-l (vi) on `/preview` (D33) | REJECTED for M5-h's residue text only. CR-20 RESOLVED. CR-21 MEDIUM: X-19 keeps `{"components":[{"type":12,"items":"x"}]}` out of the class as "renders blank, 0 nodes, without throwing". With the real page and editor, it throws "gallery.items.map is not a function" in both orders (`cr-m5-probes/reported-run1`, `reported-run2`); a root emptied to 0 nodes is the crash signature. M6-l (ii) and (vi)/D33: no finding. |
| 2026-11-08T08:13 | steering-hooks-015 (brief) | Round 13: plan gate read, `39dbc0d..018f72d` (rev 24): the CR-21 fold, M4-d's non-JSON member (L-C5-1), M5-i (D28), D34/X-20, X-21 | APPROVED, no findings. CR-21 RESOLVED. The non-JSON member holds at both webhook sites at `da24eb7` (it is growth on M4, and its cell is owed). M5-i's seed and the controlled accordion (`dangerouslySetExpanded`) were both read, so the property can be built. |
| 2026-11-08T08:23 | implementer-hooks-015 handoff at website `24ac49f` (`implementation/015-bug-evaluation-fixes-m6-implementation.md`, `eef8924`); steering-hooks-015 (resume brief) | Round 14: review M6 (F-37, F-38, F-40 to F-42, F-44 to F-50) against plan rev 24, `da24eb7..24ac49f` | REJECTED for M6-a and F-45's class. CR-22 MEDIUM: a fence with an empty or whitespace-only line inside still renders no code block (`cr-m6-probes/run-fence.sh`, 10 of 10). CR-24 MEDIUM: two `useMount` callbacks return cleanups react-use discards (`usemount-cleanup-sweep.sh`, 2 members; the implementer's sweep could not see the concise form). CR-23 LOW (planner): M6-a names `parseEmbedTitle`, which omits the rule. CR-25 LOW (record). M6-b to M6-l met; the `/preview` crash set is unchanged (`cr-m5-probes/real-run5-24ac49f.txt`). |
| 2026-11-08T08:23 | same handoff (`a665901`) | Round 7 sub-entry: CR-17 at `24ac49f` | CR-17 RESOLVED. One `INVALID_URL_ERROR` beside `MESSAGE_LOAD_FAILED_ERROR`, used at both webhook sites. The literal sweep (single, double and back quotes, production) leaves only the two embed-editor sites outside the class; the cells keep their literals. |
| 2026-11-08T08:23 | same handoff (`a665901`) | Round 10 sub-entry: CR-19 at `24ac49f` | CR-19 RESOLVED. `usePusher` reads `useLatest(hasChanged)`. The re-expressed mutants are killed (`m5-sweep-summary-ef5a9cc.txt`). The two hand-written syncs that predate this change remain, not owed. |
| 2026-11-08T08:27 | steering-hooks-015 (brief); planner-hooks-015 (message) | Round 15: plan gate read, `018f72d..dd9e88a` (rev 25): M6-a without the title member (CR-23), L-C7-1 clauses, W-7 cite (AF-28), X-22 | APPROVED, no findings. CR-23 RESOLVED: the omission is at `7ce866b` and first appears at `d5f2dc8`. CR-22 stands. X-22's keying claim holds against next 16.1.6 by reading (the modal mounts under `f/[id]`; the dynamic segment's key differs per id). |
| 2026-11-08T09:17 | implementer-hooks-015 (message) handoff at website `476c633`, generator `6c613a5`; documents at agent-output `3926486` | Round 10 sub-entry: M5-h fix (CR-18) | CR-18 RESOLVED. Re-attacked: the class probe at the tip matches the plan's lists (44 rows), and 35 unlisted members all show the line or the editor, none blank (`cr-m5-probes/run-unlisted.sh`). CR-29 LOW (planner): `fields: null` now renders, against class (3)'s list. Round 10 is APPROVED_WITH_COMMENTS. |
| 2026-11-08T09:17 | same handoff | Round 14 sub-entry: CR-22, CR-24, CR-25 (`9cc06d8`, `4aa9d3a`) | All three RESOLVED. The fence structure probe on both trees: one block per fence, inner text exact. The useMount sweep finds 0. CR-26 LOW: the lint guard flags 3 of 8 planted members. Round 14 is APPROVED_WITH_COMMENTS. |
| 2026-11-08T09:17 | same handoff | Round 7 sub-entry: M4-d non-JSON cells (`1968281`) | Test-only; the rev 24 member is carried at both sites. |
| 2026-11-08T09:17 | same handoff | Round 16: M5-i (`ad54eb3`) | APPROVED. A derived open category reaches the real accordion through `dangerouslySetExpanded`; the falsy `''` path is covered. |
| 2026-11-08T09:17 | same handoff | Round 17: M7 (`a4b4434`) | APPROVED. `ADMIN_PERMS` is `"32"` with one consumer (`get_message`); no handler-side check, so Discord's gate is the only one (D4). M7-b and M7-c change no live path today. |
| 2026-11-08T09:17 | same handoff | Round 18: M8 (preview-image-generator `471578f..6c613a5`) | REJECTED for M8-a. Stood up under E-1: the implementer's rig reproduces 25 of 25, and code review's attack (`cr-m8-probes/attack.cjs`) finds CR-27 MEDIUM: a failed drain still logs "Drain complete", the line run 2 counts. M8-d ruled: the `factoryCreateError` rejection is accepted (no storm under 6 concurrent requests), with CR-28 LOW (unguarded private field; the "README remedy" claim is false). |
| 2026-11-08T09:31 | steering-hooks-015 (brief, after `/clear`) | Round 19: plan gate read, `dd9e88a..c375d2c` (rev 26): M5-h (3) anchor and the CR-29 member move, D35 in M8-b, M8-d as a property, RK-8 | REJECTED for M8-b's D35 limb only. CR-29 RESOLVED: at `476c633` with the guard commit reverted, all 44 class-probe members fall exactly on rev 26's two lists (`cr-m5-probes/class-noguard-run1-476c633.txt`). CR-30 MEDIUM, duplicates QAF-33: arrays pass the generator's object check and reach `generateImage` (`cr-m8-probes/body-class-run1-6c613a5.txt`); the owner's 09:28Z re-put has already made lists a known limit, folded at rev 27. M8-d's property: no finding. CR-31 LOW (planner): RK-8 predicts a hang; the renamed-field mutant exits the process with code 1 in 378 ms on node 24 (`rk8-field-mutant-6c613a5.txt`). |
| 2026-11-08T09:38 | steering-hooks-015 (brief) | Round 20: plan gate read, `c375d2c..18d361c` (rev 27): the CR-30 fold (D35 re-put, X-23), CR-31 (RK-8 exit signature), M8-d (d) under D36, X-24, and the M5-h (3) deciding-read rule | APPROVED_WITH_COMMENTS. CR-30 and CR-31 RESOLVED. CR-32 LOW (planner): the M5-h re-run trigger names `src/app/preview/`, `src/utils/index.ts` and "the editor components", which leaves out `src/utils/limits.tsx`, the site of a known class (3) crash (CR-20). I also corrected my enumerator so it reverses only the guard's diff; the new run is identical (`class-noguard-run2-476c633.txt`). CR-33 LOW (planner, and the implementer's guard): with `dequeue` renamed and the field kept, the process exits the same way (`rk8-method-mutant-6c613a5.txt`), so (d) must name `dequeue`. |
| 2026-11-08T09:55 | implementer-hooks-015 (message) handoff at preview-image-generator `8de2b53` (`implementation/015-bug-evaluation-fixes-m8-implementation.md`, agent-output `9f431e7`) | Round 18 sub-entry: CR-27 fix and D36 guard (`6c613a5..8de2b53`, 2 commits, `src/server.ts`, `src/getPool.ts`) | Partial, held at steering's usage-gate stop. CR-27 RESOLVED: the re-attack's tightened row C (a TypeError is seen, there is no drain-complete line, and there is one `Drain failed after Nms:` line on stdout) fails 3 of 3 at `6c613a5` and passes 3 of 3 at `8de2b53` (`cr-m8-probes/attack-r3-*.txt`). The rig gives 32 of 32 at `8de2b53`. Row A's timing race (the implementer's report) is fixed with a 250 ms settle, and it passes 6 of 6. The D36 guard's verdict is pending: see the sub-entry. |
| 2026-11-08T10:12 | steering-hooks-015 (brief, after the usage gate; rulings 09:58Z) | Round 18 sub-entry completed: the D36 guard verdict and the drift measurement at preview-image-generator `8de2b53` | M8 APPROVED_WITH_COMMENTS. CR-28 RESOLVED (the field is reached only through the guarded helper; `sweeps-8de2b53.txt`). M8-d (d) is met as written (rig cells 33 to 36, red at `6c613a5` and `7e5ca5f`), so the conditional owner prompt (rulings 09:42Z) is not owed. Drift mutant (`cr-m8-probes/drift-*-8de2b53-*.txt`): one guard line on stderr before ready; `pending` stays 1; 11,015 to 14,118 launches in 3 s over three runs; process alive. CR-34 LOW (planner): RK-8's residue must carry that magnitude. |
| 2026-11-08T10:12 | implementer-hooks-015 handoff at website `4f9ed85` (`implementation/015-bug-evaluation-fixes-m1-m2-qa-findings-implementation.md`, `b0c4c60`). Its message to this role failed; steering's brief is the route | Round 2 and Round 3 sub-entry: QAF-27 (M1) and QAF-20 (M2), `476c633..4f9ed85`, test-only | APPROVED_WITH_COMMENTS. Every path is under `__tests__/`. The ID-token class gives 0 hits (control 1). The literal oracles match Discord's rule. CR-35 LOW (implementer): `formatKey.key-format.test.ts` is not beside its module (`cr-qaf-probes/test-placement.py`: the delta adds 1 of 16 hits; 6 earlier likely members go to the Planner batch). CR-36 LOW (record): "three `stays` rows" lists two. |
| 2026-11-08T10:23 | implementer-hooks-015 (message) handoff at website `b195eeb` (`implementation/015-bug-evaluation-fixes-qaf34-qaf35-cr26-implementation.md`, `cd35f29`). No steering brief has arrived | Sub-entry: CR-26 (Round 14), QAF-34 (Round 14), QAF-35 (Round 10), CR-35 and CR-36 (Rounds 3 and 2), `4f9ed85..b195eeb` | REJECTED for CR-26's callers. CR-37 MEDIUM: emptying `Button`'s autoFocus effect or `DiscordMessageEditor`'s `onMount` effect leaves 1119 of 1119 passing, while `useMounted` is killed (26 cases) (`mutation-cr26-*-b195eeb.txt`). CR-26 narrowed: the ban flags 7 of 14 plants and passes both controls, but `react-use/lib` and `react-use/esm` index imports pass (`cr26-ban/lint-b195eeb.txt`). CR-35 and CR-36 RESOLVED. QAF-34 and QAF-35 met. |
| 2026-11-08T10:34 | implementer-hooks-015 (message) handoff at website `2618926` (implementation document § Round 2, `34288c1`). No steering brief has arrived | Round 14 sub-entry: CR-37 and CR-26 fixes, `b195eeb..2618926` | APPROVED_WITH_COMMENTS. CR-37 RESOLVED: (b) is killed by both editor mutants; (a) is killed by the effect-plus-react-aria mutant. My Button mutant was equivalent, because react-aria's `useFocusable` autofocuses; that part of the `b195eeb` evidence is corrected in the sub-entry, and the verdict does not move. CR-26 RESOLVED: 9 of 14 plants flagged, controls 0, no static spelling passes lint. CR-38 LOW: the redundant `Button` effect. |
| 2026-11-08T10:38 | implementer-hooks-015 (message) handoff at website `c5303ca` (implementation document § Round 3, `14b1c50`). No steering brief has arrived | Round 14 sub-entry: CR-38 fix, `2618926..c5303ca` | APPROVED. CR-38 RESOLVED: the react-aria mutant kills `Button auto focus` (1 failed; control 2 of 2). The focus-call sweep finds 4, none paired with `autoFocus`. Assumption Not Checked to UAT: `focusSafely` defers focus under virtual-cursor modality. |
| 2026-11-08T10:55 | planner-hooks-015 (message), rev 28 at agent-output `2a4533b`. No steering brief has arrived | Round 21: plan gate read, `18d361c..2a4533b` (rev 28, the D37 fold) | APPROVED_WITH_COMMENTS. CR-32, CR-33 and CR-34 RESOLVED: every cited figure matches its capture, and the planner's `c5303ca` enumerator run equals run 2 at `476c633` cell for cell. CR-39 LOW (planner, into the M9 handoff at mint): the carrier's M8-d probe has no path, and "drift probe on the deployed engine" (my wording from Round 18) cannot run on the host. |
| 2026-11-08T11:02 | planner-hooks-015 (message), relaying critique L-C9-3 (`8b7f9b0`) | Correction of record: changelog stamps | My rows from this session, here and in the plan, were stamped ahead of their commits. They are restamped from `git show -s --format=%cI` (10:12, 10:23, 10:34, 10:38, 10:55), and four guessed message-arrival times in the sub-entries are removed. No verdict moves. This row is stamped from `date -u`. |
| 2026-11-08T11:27 | implementer-hooks-015 (message): QAF-37 rig cell at agent-output `8fb1eee` (§ QAF-37, `b449f15`) | Round 18 sub-entry: QAF-37 rig cell, generator `8de2b53` unchanged | APPROVED. Re-run: control 35 of 35 (exit at 10,030 ms). Fallback removed fails 2 cells; fallback at 5 s and at 13 s each fail the window cell (`cr-m8-probes/qaf37/`). |

## Round 1 (M0, website `037935d`) — dispositions

- CR-1 LOW Round 1 RESOLVED — the 54-path base list is stored at agent-output `96e123d`. Check that fails if it returns: `diff` against `git ls-tree` at `037935d`, recorded in the changelog row above.
- CR-2 INFO Round 1 ROUTED — the typecheck gate reads git-ignored `.next` output. Routed to QA Phase 2 by message (`1109c72d`). No implementer action owed.
- Round 1 verdict: APPROVED_WITH_COMMENTS for M0. Its argument is in the commit that carried it (`0c3e7f9`).

## Round 2 (M1, website `be881c9`)

### Scope and identity

- **Tree.** website `be881c9`, the M1 `Handoff-At`. Files were read with `git show be881c9:<path>`.
- **Criteria recorded at round open:** plan § M1, rev 8 at `bf10a46`. Rev 9 and rev 10 (`bceb84a`) landed during the round, and I recorded them as growth: M1-c's no-account class, M1-f's premise, and M1-h restated to D21.
- **Evidence process.**
  - **Production limbs:** the diff read at `be881c9`, plus my own probes, executed in git-archive exports with website's `node_modules` linked read-only. The probes exercise the real modules under the suite's own stub shapes.
  - **Mutation and red/green rows:** the implementer's captures. The mutation sweep is QA's.

### Per-limb result at `be881c9` (rev 8 criteria)

| Limb | Result | Basis |
|---|---|---|
| M1-a | Met | All four `in` sites return before the query on an empty list. Sweep re-run: `git grep -n "'in'," be881c9 -- src bot`, non-test → 4. The cross-check `['"](not in\|in)['"]` → 4. Same sites. |
| M1-b | Met | `cron.ts` uses `'is', null`. `git grep -nE "'(=\|!=\|<>)', null"` → 0. |
| M1-c | **Not met**: CR-3 | A cached `null` drops the clear-out for an existing row. |
| M1-d | Met | `>=`, with today's text, in `upsertMessage`. |
| M1-e | Met | `/^(0\|[0-9]{17,23})$/`. |
| M1-f | Met | `prop !== 'NODE_ENV'`. |
| M1-g | Met; attacked | § Adversarial execution. |
| M1-h | Reopened under D21 | The criterion grew during the round. |
| M1-i | Not met at `be881c9` (CR-4); **met at `6001f7f`** | § Round 2 sub-entry. |
| M1-j | Met | `getItem` returns `{ item } \| null`; all three callers read `.item`. |
| M1-k | Met | The port precedes `/dev`. |

- **Formatting-only claim (`be881c9`).** Settled by execution, comparing syntax trees: `verification/015/cr-emit-compare.cjs`, run `cr-emit-compare-run-9e4955a-be881c9.txt`.
  - Controls: an extra token and an ASI-relevant break are detected; layout and a trailing comma are ignored.
  - `shapes.ts` and `auth.ts` are IDENTICAL.
  - Two void drafts of the instrument were superseded and are not cited.
- **Gate satisfied (disclosure).** The stamp-gate hook refused this round's first write, because I had typed two changelog stamps ahead of the clock. Both rows were re-stamped through `record-edit.js`'s now-token, changing the stamps only.

### Adversarial execution (M1-c revoke, M1-f guard, M1-g signature gate)

- **M1-g** (`verification/015/cr-m1-probes/interactions-edge.attack.test.ts`; captures `cr-m1-probes-run-{7b10f4e,a2592f0,be881c9}.txt`).
  - Input class, 20 cells: methods {GET, PUT, lowercase `post`}; nine header shapes, from none and partial through odd-length, non-hex, another body's signature, an altered timestamp and a duplicated signature header; bodies {malformed JSON, ping, command, 1 MB junk, none}.
  - Controls: a valid ping (lowercase and uppercase hex) and a valid command.
  - Oracle: status, a `JSON.parse` spy and a command spy.
  - Result: every unsigned or mis-signed cell → 401 or 405, with `parses=0` and `commandCalls=0`. Controls → 200.
  - Disclosed shim: Node lacks the `NODE-ED25519` name that `PlatformAlgorithm.VercelProd` uses, so the probe maps it to `Ed25519`. The handler's guard and parse order runs unshimmed.
- **M1-c:** probed with the real `removeUserSession`, using a Redis stub able to hold a value (CR-3).
- **M1-f:** the guard only throws on the client. It is not a leakage boundary; its failure mode is RK-7.

### Round 2 findings

**CR-3 MEDIUM Round 2 Correctness**: sign-out takes a cached `null` for "no account" and skips the revoke and the `Accounts` update for an existing row
- **Location**: `src/server/auth.ts` `removeUserSession` at `be881c9`, read through `src/utils/redis/index.ts` `fetchUserAccount`. The state arises from `getItem` (M1-j, `a2592f0`).
- **Class**: A decision about what to clear or revoke is taken from a cache value whose `null` means "no usable account" (the `skipUpdate = false` loader). That loader shares the key `user-access-token:<userId>` with the `skipUpdate = true` read that sign-out needs.
- **Enumeration**:
  - `git grep -n "fetchUserAccount(" be881c9 -- src bot`, non-test → 3 calls: `removeUserSession` (the member), `authCallback` and `hydratedAuthCallback` (the `null` producers).
  - 2 `null`-returning loader branches: `!refresh_token` and a refused refresh.
  - Blind spot: another key shared by loaders with different semantics; by reading, `fetchAccountFromSession` and `fetchUserGuilds` each have one loader.
- **Issue**: Executed (`verification/015/cr-m1-probes/signout.cached-null.test.ts`):

  | Commit | Cache key holds `"null"`, account row present with tokens |
  |---|---|
  | `7b10f4e` (M1-c, before M1-j) | `fetchCalls=1 accountsUpdates=1 dbQueries=2`, three keys cleared |
  | `a2592f0` (M1-j) | `fetchCalls=0 accountsUpdates=0 dbQueries=0`, two keys cleared |
  | `be881c9` | `fetchCalls=0 accountsUpdates=0 dbQueries=0`, two keys cleared |

  - The producer cell shows a refused refresh caching `"null"`. The `user-session-token` key is still deleted.
  - Magnitude, read rather than measured: dead tokens on the refused-refresh path. A possibly live token on the `!refresh_token` path, a row population that is unmeasured.
- **Required Action**: sign-out decides on the `Accounts` row, never on a cache value written by a loader with different semantics.
  - **Preferred (structural)**: a direct Postgres read.
  - The test's Redis stub must hold a value. The new cell must be red at `a2592f0` and `be881c9` and green at `7b10f4e`.
- **State at `6001f7f`:** the plan folded it at rev 12, and rev 13 keeps it: "the account decision rests on the row … never read from a value cached under `user-access-token:<userDbId>`", and the "falsy return" member is withdrawn. The rev 13 text matches this finding's class and Preferred action. The code is held until the rev 13 gates pass, so CR-3 stays open and is re-verified at the rebuild SHA.

CR-4 MEDIUM Round 2 RESOLVED — the project cookie parser is deleted. `Redirects/Server.tsx` reads the session cookie through `next/headers` `cookies()` (`6001f7f`).
- Class residual: `git grep -n parseServerCookies 6001f7f -- src` → 0.
- Re-attacked from first principles against the parser `cookies()` wraps (`verification/015/cr-m1-probes/cookie-parser-reattack.cjs`, run `cr-m1-cookie-reattack-run1.txt`, next 16.1.6). 14 headers, including the three that threw, a lone-surrogate escape and 10,000 malformed segments: 0 throws, and the session cookie was found in every well-formed case.
- Check that fails if it returns: `Server.session-cookie-redirect.test.ts`'s three malformed-`%` cells (red at the pre-change `Server.tsx` on `URIError`, implementation § Fix Round 1).

CR-5 LOW Round 2 DECLINED — by the implementer (§ Fix Round 1): the plan sets no logging requirement on the revoke, and the implementer offers to add one on request. The operator-visible gap (a refused revoke leaves no log line) stays for UAT to observe.

**CR-6 LOW Round 2 (sub-entry) Class sweep**: the CR-4 sweep's "always well-formed" disposition for `Providers.tsx` does not hold
- **Location**: `src/app/_components/Providers.tsx` `getMessage` and `src/middleware.ts` default export at `6001f7f`. The disposition is in M1 implementation § Fix Round 1, Class Sweep (CR-4).
- **Class**: A decode of an internal request header whose only writer is middleware, where the middleware neither always runs nor always overwrites the header. Client input therefore reaches a throwing decode.
- **Enumeration**: `git grep -nE "decodeURI(Component)?\(" 6001f7f -- src bot`, non-test → 2.
  - `Providers.tsx` `getMessage` is the member.
  - `onCopy.ts` decodes a fragment the editor itself just wrote through `setFragmentData`, so the implementer's disposition holds there.
  - Blind spot: this predicate cannot see a header-derived value decoded by a library (`queryString.parse`) rather than by `decodeURI*`.
- **Issue**, by reading at `6001f7f`:
  - `middleware.ts` clones the request's headers and sets `x-query-params` only when there is a query string. Its matcher covers only `/message/(.*)`, `/api/guilds/(.*)` and `/preview`.
  - `Providers` is a root-level provider. On any other path, and on a matched path with no query string, a client-sent `x-query-params` reaches `decodeURIComponent` unchanged. `x-query-params: %` would throw.
  - Magnitude: the client can only fail its own request, so this is not a cross-user exposure. It was not executed (no running server); this is a reading, stated as one.
  - It sits outside F-1–F-50 (D6) as a defect; the finding is the disposition's factual error.
- **Required Action**:
  - **Minimum**: correct the disposition line in the M1 document to name the pass-through.
  - **Preferred (structural)**: middleware always deletes an inbound `x-query-params` before setting it. That is a source change outside the pool, so it is the planner's call whether it rides this chain or goes to a handoff.
  - Non-blocking.

**CR-7 LOW Round 2 (sub-entry) Plan text, M1-i rev 13**: "present" is wider than what `cookies()` reports
- **Location**: plan § M1-i, rev 13 (`9cbe755`), its Property sentence.
- **Class**: A property quantified over every header the grammar admits, whose observable ("present") is computed by a parser that drops some admitted pairs.
- **Enumeration**: re-attack run `cr-m1-cookie-reattack-run1.txt`. Of 14 headers, 1 grammar-admitted session pair is dropped: `next-auth.session-token=ab%` → `null`, because Next skips a pair whose value fails to decode. Blind spot: only the inputs listed in the probe.
- **Issue**: For that header the component would redirect a request that carries a session cookie, which contradicts "redirects exactly when neither … is present". next-auth's own tokens never contain `%`, so the contract bars it in practice and no code change is owed. The property as written is still falsifiable by a hand-made header.
- **Required Action (planner)**: bound "present" to "as `next/headers` `cookies()` reads it", or state the residue. Non-blocking; route with the rev 13 gate round.

## Round 2 sub-entry (M1-c and M1-h rebuild, website `579e8b2`, plan rev 19)

- **Scope.** The fix diff `1e12837..579e8b2` (`12ac7ed`, `579e8b2`) is in scope: `src/server/auth.ts` `removeUserSession`, `src/utils/redis/index.ts` `fetchUserAccount` (`skipUpdate` removed), `src/utils/limits.tsx` (CR-9), and the two `auth.*` test files. It stays within CR-3, M1-h and CR-9, so it is a sub-entry. M1-c's and M1-h's criteria are unchanged since rev 13. I read them at rev 19 (`330348f`).
- **CR-3 MEDIUM Round 2 RESOLVED (structural).** `removeUserSession` reads `access_token` and `providerAccountId` from `Accounts` with `executeTakeFirst()` and never reads `user-access-token`. The class "a cache state decides the account" can no longer be represented: no reader of that key remains on the sign-out path. `fetchUserAccount` has 2 callers left (`git grep -n fetchUserAccount 579e8b2`, non-test: `authCallback` and `hydratedAuthCallback`), and neither is sign-out.
  - **Executed** (`verification/015/cr-m1-probes/signout.row-decision.test.ts`, driver `run.sh`; real `hydratedAuthOptions.events.signOut`, Kysely through the capturing driver, Redis in memory). At `579e8b2` (`cr-m1-probes-run-579e8b2.txt`), all as expected:
    - a row with a token, cache miss, cached `null`, or cached stale account: the revoke carries the row's token, there is one update with parameters `[null, null, "discord", <id>]`, and three keys are cleared;
    - a row with no token, while the cache holds a token: no revoke, one update;
    - an absent row while the cache holds an account: no revoke, no update, two keys;
    - revoke rejected or answering 500: the clear-out still runs and sign-out resolves;
    - a lookup error: two keys are cleared, then the lookup's error reaches the caller;
    - a lookup error with Redis down: the lookup's error reaches the caller, with 0 `unhandledRejection` events.
  - **Discrimination.** At `6001f7f` (`cr-m1-probes-run-6001f7f.txt`), cached `null` gives no revoke and no update, and a lookup error clears nothing: 3 red. The "cached stale account" cell passes on both trees. My plain-JSON cache value does not match the cache's `compress-json` format, so the loader treats it as a miss. That cell does not discriminate, and I make no claim from it. The implementer's cached-other-token cell is the discriminating one (red at `6001f7f`, per its record).
  - The run exits 1 for one reason only: my Round 2 probe `cookies.percent.test.ts` imports `~/utils/parseServerCookies`, which CR-4's fix deleted. That is the instrument going stale, not the tree.
- **M1-h: met.** `hydratedAuthCallback` is unchanged since `69b17af`: there are 0 lines in `1e12837..579e8b2` that touch it, and `messagePromise.catch(() => {})` is attached at creation, before the first await. Cells in `auth.hydrated-session.test.ts`, with `unhandledRejection` counted over each run:
  - row 1: M resolves, M rejects before A, M rejects after the function has left;
  - row 2: M resolves, M rejected earlier (twice);
  - row 3; row 4 at once and later; row 5;
  - row 6 during A, during G, and after G settled;
  - row 7; row 8, both orders.
  - All eight rows have a cell, which is what Round 2 asked for. The implementer's mutants are not re-run here (QA's).

**CR-15 LOW Round 2 (sub-entry) Test coverage**: row 2's "M rejects after the function has returned" member has no cell
- **Location**: `src/server/__tests__/auth.hydrated-session.test.ts` at `579e8b2`, the describe "by how the account lookup, the recent messages and the guild fetch end".
- **Class**: A member the plan names as discriminating, with no cell of its own. Rev 13's table: "Rows 1 and 2 with M rejecting after A are the paths where the function leaves without awaiting M."
- **Enumeration**: by reading the 17 cells against the 8 rows. Row 1's after-return member has a cell: "rejects with the lookup's error when the recent messages reject after the function has left". Row 2's has none: its cells are "M resolves" and "rejected earlier". That is 1 member. Blind spot: my row mapping is by title and body reading.
- **Issue**: By reasoning, not by a run, every regression I could construct for this member is already caught.
  - A handler can't be removed once it is attached. So a missing handler during A fails the "during A" cells, and a derived `.then` without a catch on the `return {}` path fails "rejected earlier".
  - So the gap is the plan's stated cell, not a known escape: LOW.
- **Required Action (implementer, non-blocking)**: add the row-2 cell. A resolves `null`, the function returns `{}`, then M rejects; assert `{}` and `unhandled` equal to `[]` after settle. Falsity signature: it fails under a mutant that leaves M with no handler on the `return {}` path, so it must be shown red on such a mutant.
- **CR-9 LOW Round 3 RESOLVED.** `validateEmbed` and its suppression are deleted: `git grep -c -w validateEmbed 579e8b2 -- src bot` returns no file, and `limits.tsx` has no `eslint-disable`.
- **CR-6 LOW Round 2 RESOLVED (Minimum).** The CR-4 sweep line is corrected in the M1 document (`3ba52f3..c938573`: 3 changed lines on `x-query-params`). The Preferred action is X-17.
- **Conventions.** eslint gives exit 0 on the 4 changed files, which are byte-identical to `579e8b2` in the shared tree. `convention-check --since=1e12837 --no-eslint` in a detached worktree gives 0 FAIL and 0 CANDIDATE (`cr-m1-convention-check-579e8b2.txt`). The ID-token check by hand gives 0 hits in both test files.
- **Verdict.** Round 2 (M1) moves from REJECTED to APPROVED_WITH_COMMENTS at `579e8b2`. CR-15 is LOW, and CR-5 is DECLINED. QA Phase 2 may take M1-c and M1-h at `579e8b2`.

## Round 2 sub-entry (CR-15, website `3031878`)

- **Scope.** `579e8b2..3031878`: one test file, `auth.hydrated-session.test.ts`, +16 lines. The diff is test-only, so this is a scoped check (M1 document § CR-15, `Handoff-At` 3031878).
- **CR-15 LOW Round 2 RESOLVED.**
  - The new cell matches the Required Action's shape. A resolves `null`, the function returns `{}`, and then M rejects. The cell asserts `{ value: {} }`, and that `unhandled` equals `[]` after the settle.
  - Its red: `mutation-m1r-m1h-message-handler-dropped-3031878.txt` lists it among the 6 failures. `grep -c` of its full title with the `×` mark gives 1. The control passes 30 of 30 (`mutation-m1r-control-3031878.txt`).
  - The title is in spec form. The ID-token check (Round 10) finds nothing outside fixture ids.
  - Check that fails if it returns: that cell.

## Round 2 sub-entry (M1 fix round 1, website `6001f7f`, plan rev 13)

- **Scope.** The fix diff `be881c9..6001f7f` for M1: `Redirects/Server.tsx`, `parseServerCookies.ts` (deleted), `auth.ts` (`69b17af`) and their tests. No touch outside the findings' and the plan's reopened limbs, so it is a sub-entry, not a round.
- **M1-i (rev 13 restatement): met.** The component renders without throwing for every probed header, and redirects only when neither session name is present. The `next/navigation` and `next/headers` mocks in `Server.session-cookie-redirect.test.ts` build the cookie store from `NextRequest(...).cookies`, the same `RequestCookies` class `cookies()` wraps, so the test's parser is the production parser. The one plan-text gap is CR-7.
- **M1-h: held, not verdicted.** Steering's 2026-11-08 message holds M1-h's code until the rev 13 round passes. Recorded for the rebuild:
  - By reading, `69b17af` attaches `messagePromise.catch(() => {})` at creation, before the first await. That satisfies all eight rows of rev 13's decision table.
  - The test cells cover rows 2 and 6 (during A, during G) only. Rows 1, 3, 4, 5, 7 and 8, and row 6 "after G has settled", carry no cell. The rebuild owes a cell per row.
  - The implementer's surviving mutant (`m1h-guild-fetch-awaited-inside-array`) is equivalent once the handler exists. Accepted.
- **M1-c: held**; CR-3 open, as above.
- **Rev 13 delta, read as a gate.**
  - M1-c's rev 12 and 13 text: no finding. It carries CR-3's class, including the cache-state members that must give the miss's outcome.
  - M1-i: CR-7.
  - M2-a's class: see CR-8 under Round 3.
  - D23 and the M8 run-2 text are outside code review's limbs.

## Round 3 (M2, website `6001f7f`, plan rev 13)

### Scope and identity

- **Tree.** website `6001f7f`, `Handoff-At` of the M2 document. M2's commit is `7befedb`; the tip also carries M1's fix round.
- **Criteria recorded at round open:** plan § M2, rev 13 (`9cbe755`): M2-a (with its rev 13 colour class and QAF-1 property), M2-b, M2-c and M2-d.
- **Evidence process.** The diff read at `6001f7f`, my own re-runs of the sweeps, and the implementer's mutant captures (`verification/015/mutation-m2-*-7befedb.txt`). I ran no mutants: QA's.

### Per-limb result at `6001f7f`

| Limb | Result | Basis |
|---|---|---|
| M2-a | Met | `embedShape` colour `.int().min(0).max(0xffffff)`; ingress `e.color !== undefined`; `EmbedEditor` border `color != null`. The picker yields 0 for black: `Picker.tsx` `hexToInt('#000000')`. Discord's documented `color` is optional and not nullable, so the `!== undefined` test is within contract. |
| M2-a, QAF-1 | Met | `embedShape` is exported and the 12 moved cases import it. `git grep -l "z.object" 6001f7f -- 'src/**/*.test.ts*'` → 0. |
| M2-b | Met | `validateEmbedAuthorName` uses `MAX_EMBED_AUTHOR_NAME_LENGTH` (256), the schema's bound. |
| M2-c | Met | "Title is too long." |
| M2-d | Met | `MAX_EMBED_FOOTER_TEXT_LENGTH` = 2048 in `messageLimits.ts`, imported by both `EmbedFooter.tsx` and `shapes.ts`. The editor's error renders as the shared `errorStateBorder` through `data-erroring-state`, the idiom of `EmbedAuthor` and `EmbedField`. The commented-out error text is pre-existing. |

### Architecture Alignment

**Alignment Status**: ALIGNED for M2.
- The constants move into `messageLimits.ts`, which `constants/index.ts` re-exports, so callers of `~/constants` are unaffected (`export *`).
- The border mirrors `ContainerEditor`'s `accent_color != null`.

### TDD Compliance Check

**TDD Table Present**: Yes. **All Rows Complete**: Yes. The footer DOM test's red is a named mutant, as disclosed.

- **Test authorship (8 changed test files, `be881c9..6001f7f`).**
  - All basenames match the positive form.
  - The ID-token check over basenames, titles and comment lines gave 0 hits. This is the same hand-run as Round 2, whose planted control fired.
- **Convention check.** In a detached worktree at `6001f7f`, `--since=be881c9 --no-eslint`: 15 files examined, 0 FAIL, 0 CANDIDATE. SKIPs: the two deleted files, `constants/index.ts` (no added lines) and the id-token check (run by hand).
- **eslint.** 0 errors and 0 warnings in all 16 changed files, each byte-identical in the shared tree to `6001f7f`.

### Round 3 findings

**CR-8 LOW Round 3 Class sweep**: the F-12 colour sweep misses `Picker.tsx`
- **Location**: `src/components/DiscordMessageEditor/components/EmbedEditor/ColorPicker/Picker.tsx` `Picker`, `defaultColor` at `6001f7f`.
- **Class**: As rev 13 states it, every site that tests an integer colour for truthiness, so that 0 reads as "no colour".
- **Enumeration**:
  - `git grep -nEi "(colou?r|accent)[A-Za-z_]*\)? *(\?[^.?]|&&|\|\|)|!(\w+\.)*[a-z_]*colou?r[a-z_]*\b|if \(!?(\w+\.)*[a-z_]*colou?r[a-z_]*\)" 6001f7f -- src bot`, non-test, CSS-class lines excluded → 3. Two are the `accent_color?:` declarations, and one is the member: `initColor ? … : '#000000'`.
  - E15's `\bcolor` cannot match `initColor`; that is the predicate's blind spot.
  - Blind spot of this predicate: a truthiness test on a colour held under a name containing neither "colo(u)r" nor "accent".
- **Issue**: For 0, `initColor` falsy gives `'#000000'`, black either way, so this member's outcome is neutral today. It is outside the plan's stated enumeration ("two members at `7ce866b`"). M6-f (the picker's six-digit default) rewrites this line.
- **Required Action**: the plan's M2-a enumeration names the member. M6-f's rewrite tests `initColor != null` and formats with `intToHex`, the six-digit helper. Non-blocking; planner and implementer at M6-f.

**CR-9 LOW Round 3 Gate satisfaction**: a lint suppression keeps dead code alive
- **Location**: `src/utils/limits.tsx` `validateEmbed` at `6001f7f`.
- **Class**: A lint finding met by suppressing the rule rather than by changing the code the rule flags.
- **Enumeration**:
  - `git diff be881c9 6001f7f | grep -c "^+.*eslint-disable"` → 1, this site.
  - `git grep -nw validateEmbed 6001f7f -- src bot` → 1, the definition only.
  - Blind spot: suppressions added through `.eslintrc` overrides or file-level `/* eslint-disable */`.
- **Issue**: The function has no reference, and the suppression exists only to keep it. The implementer disclosed it.
- **Required Action**: delete `validateEmbed` and the suppression. Deleting unreferenced code the milestone's gate flags satisfies the gate; it is not scope growth. Non-blocking.

**CR-10 LOW Round 3 Test conventions**: the touched `bugFixCoverage.supplemental.test.ts` still breaks the conventions
- **Location**: `src/utils/__tests__/bugFixCoverage.supplemental.test.ts` at `6001f7f`, touched by M2 (`7befedb`).
- **Class**: A test file touched in the chain that still carries convention departures: a local transcription of production logic (Axiom E), tautological cases, and a basename that names no production module.
- **Enumeration**, by reading the whole file (3 describes, 16 cases):
  - `useParsePathname Regex Correctness` (7 cases) declares its own `folderRegex` and `messageRegex` and imports nothing from `useParsePathname`: the zero-production-import transcription class.
  - `formatKey matches clearUser key pattern …` (2 cases) compares `formatKey(k, x)` with `formatKey(k, x)`, so it cannot fail.
  - The basename's module segment `bugFixCoverage` is no module. The shape regex passes it, so this is the regex's blind spot.
- **Issue**: The suite counts 9 cases that cannot discriminate. QA's QAF-1 owes the rename once the file is touched, and the implementer has asked QA how to split it (M2 implementation, Outstanding Item 1).
- **Required Action**: split the file by module.
  - The `constructImageUrl` cases go to a `constructImageUrl.*` file, keeping their `// escaped:` line.
  - The two literal `formatKey` cases go to a `formatKey.*` file; the tautologies are deleted.
  - The `useParsePathname` describe is converted to exercise the real hook, or deleted with the surface listed as outstanding.
  - QA decides the timing (now or with a later touch). Non-blocking for M2.

## Round 18 sub-entry (QAF-37 rig cell; agent-output `8fb1eee`, generator `8de2b53` unchanged): APPROVED

- **Stage start.** The implementer's message (cross-session) names the rig cell at agent-output `8fb1eee` and § QAF-37 of `implementation/015-bug-evaluation-fixes-m8-implementation.md` (`b449f15`). No source changed: the generator chain branch is still `8de2b53`. The diff is `verification/015/m8-local-probe/probe.cjs` (+17), read whole, plus the implementer's control capture. It is an instrument, so it was re-run, not read. Scoped as a sub-entry of Round 18 (M8-a P1). Its adequacy is QA's.
- **The cell's mechanism holds by reading.** A raw socket sends `POST /generate` headers with no terminating blank line, so a request is in progress. `closeIdleConnections` leaves that connection open, `server.close` never calls back, and because no request completed, no pool exists. So only `shutdown`'s 10 s `setTimeout(() => process.exit(0), 10e3)` can end the process. The window, 9,500 ms ≤ t < 12,000 ms, brackets the fallback below the ecosystem's `kill_timeout` of 12000.
- **Re-run** (`cr-m8-probes/qaf37/run.sh 8de2b53`; the rig rebuilt with `m8-local-probe/run.sh`, probe blob `14f5cfc`, the same as QA's summary; every edit read back):
  - Control: 35 of 35, exit after 10,030 ms.
  - Fallback removed (QA's `qa-ef-fallback-timer-removed`): the two exit cells fail, with no exit by 14 s.
  - My two variants: fallback at 5 s fails the window cell (5,020 ms), and fallback at 13 s fails it too (13,038 ms). So the window discriminates at both bounds.
  - Captures: `cr-m8-probes/qaf37/{control,variant-*}-8de2b53.txt` and `summary-8de2b53.txt`.
- **Not shown red.** The third cell ("no drain-complete line and no drain-failed line") passes under every variant. Its regexes match real lines in the rig's success and failure cells, so it is not vacuous by construction. No mutant here makes a drain line appear on this path. That is test adequacy, so it goes to QA.
- **Verdict: APPROVED.** No finding.
- **Assumption Not Checked.** This review assumes that Node 18.17.1 (production's engine) keeps a connection with an incomplete request open across `closeIdleConnections` as node 24 does. If it does not, on Node 18 the cell's process exits through the drain path before 9.5 s, with a drain line. M8-0 run 2 (Node 18) owns closing it, with devops.

## Round 21 (plan gate read, rev 28, agent-output `2a4533b`; figures checked against captures at preview-image-generator `8de2b53` and website `c5303ca`): APPROVED_WITH_COMMENTS

- **Stage start.** The planner's message (cross-session) names rev 28 at agent-output `2a4533b`, for a gate read of `18d361c..2a4533b`. No steering brief has arrived for it. I read the rev 28 commit's plan diff (86/67) in full, plus the minted handoff. The interval commits (`965e2a9..2a4533b`) are QA rows and QA captures; the plan rows among them are QA's.
- **Criteria this round assesses**, as rev 28 states them: M5-h (3)'s deciding read and re-run trigger, M8-d (d), RK-8, the M9 RK-8 carrier line, X-25 and X-26, and the discharge of each Planner batch row I raised.
- **CR-32 RESOLVED.** The trigger is now "any non-test file under `src/`", "reverses the guard commit `09c7c45`", and run 2 is cited.
  - The planner's run at `c5303ca` (`m5h-class-probe/noguard-run1-c5303ca.txt`, header `tip c5303ca`, `page.tsx` blob `df48c12`, the same as at `476c633`) matches `class-noguard-run2-476c633.txt` cell for cell. Both have 44 `REAL` lines with outcome and node count equal (`diff` rc 0, with the timestamp text normalised out) and 44 passed, exit 0.
  - No non-test `src/` change follows `c5303ca`, so the trigger does not fire in this round.
- **CR-33 RESOLVED.** (d) names "`_waitingClientsQueue` with a callable `dequeue`", with both members cited. `rk8-method-mutant-6c613a5.txt` reads `"code":1,"ms":424`, as stated. The `reject` residue is in RK-8.
- **CR-34 RESOLVED.** RK-8's "Signature at the M8 tip" carries the measurement exactly as captured: 13,631 / 14,118 / 11,015 launches in 3 s; 571,609 and 681,157 stderr lines (runs 1 and 2); pending 1; controls with no line and two launches; every request 500 within 146 ms (`drift-*-8de2b53-*.txt`). It also states production's engine and failure mode as unmeasured, and marks "expected to wait where S3 answers" as inference. The owner's selection (rulings 10:14Z, "record it, no code") is cited.
- **M-C9-3 closed** on the Round 18 sub-entry, accurately stated. **QAF-36's stated-limit branch**: (d) keeps "a log line", and every read covers both PM2 logs. No criterion is weakened.
- **X-26** names the six members (`grep -c` 6 in `handoff/website-tests-not-beside-their-module-2026-11-08.md`), with Owning-Stage planner and an event-form Review-Trigger. **X-25** cites the security handoff. Its "no lockfile move" claim is consistent with the Round 18 sub-entry's diff read (lockfile unchanged in `6c613a5..8de2b53`).
- **CR-39 LOW** below.
- **Verdict: APPROVED_WITH_COMMENTS.** CR-39 changes no criterion and no pre-release verifier. It routes to the M9 carrier at mint, not to a rev 29.
- **Assumption Not Checked.** This review assumes RK-8's inference that, where S3 answers, a request under the drift mutant waits rather than returning. I did not run it with an S3 stub. If it is false, with a local S3 stub answering, the drift mutant's `/generate` returns before the 15 s cut while `pending` is 1. QA's effort-final Phase 2 owns closing it, or devops at the M9 carrier read (Next Steps).

**CR-39 LOW Round 21 Carrier probes not executable as named**: RK-8's instrument and the M9 carrier line call for "the M8-d probe (a failing factory with one waiting request)" and "the drift probe on the deployed engine (`run-drift.sh`)". The first has no path. The second, as worded, could be read as a run on the production host. It cannot run there: it needs an E-1 export with no browser binary, `unshare -rn` and a mutated library copy, and the host reader is the read-only `claude-ro`. Wherever it runs, it measures the engine's retry rate, not production's failure mode.
- **Origin.** The phrase "runs the drift probe on the deployed engine" is mine, from the Round 18 sub-entry's Assumption Not Checked. The planner carried it faithfully. The defect in the phrasing is code review's.
- **Location**: plan rev 28 RK-8 § "Instrument and carrier", and § M9 "RK-8 carrier".
- **Class**: a post-closure carrier instruction whose instrument is named by description, or under conditions it cannot run in.
- **Enumeration**: `grep -n "probe" ` over RK-8 and the M9 carrier line at `2a4533b` gives the two instruments above. The other carriers in the plan were not read for this class (not measured).
- **Required Action (planner, carried into the M9 handoff's text at mint, no plan revision)**:
  - Name the M8-d probe by path: `verification/015/m8-local-probe/probe.cjs`, cells `M8-d pool: a launch failure rejects the request…` and `no creation retry storm…`, run by `m8-local-probe/run.sh`.
  - Say that `run-drift.sh` runs locally on an E-1 export of the deployed commit, under the deployed Node version (18.17.1 in the security audit's host read, `d9e5184`; devops re-reads it at M9), against a `cp -a` copy with the member renamed. Its result is the engine's rate with a missing binary, and production's crash or timeout failure mode stays unmeasured.
  - Falsity signature: a devops reader who follows the handoff text alone produces `drift-*` captures with a `node -v` line equal to the host's.

## Round 14 sub-entry (CR-38 fix; website `2618926..c5303ca`): APPROVED

- **Stage start.** The implementer's message (cross-session) names `c5303ca`, documented in the implementation document's § Round 3 (agent-output `14b1c50`). It is a fix confirmation under Round 14. No steering brief arrived. The diff is one file, `src/components/Button.tsx` (+2 −8), read whole. It removes the mount `useEffect`, the `useEffect` import and the now-unused `autoFocus` destructure. `autoFocus` still reaches `useButton` inside `_props` (`git grep -nw autoFocus c5303ca -- src/components/Button.tsx` gives 0 named sites, `git grep -c useEffect` gives 0). The shared tree is at `c5303ca` with 0 status lines.
- **CR-38 RESOLVED.** I re-ran it myself with `mutate-run.sh` on `Button.auto-focus.test.tsx` at `c5303ca`:
  - Control: 2 of 2, exit 0 (`mutation-cr38-control-cr-c5303ca.txt`).
  - The implementer's `cr38-button-autofocus-not-passed-to-usebutton.py` (read back, 1 line): 1 failed (`is the focused element after mounting with autoFocus`), exit 1 (`mutation-cr38-aria-dropped-cr-c5303ca.txt`). My first invocation passed the mutator by a relative path and failed with "MUTATOR FAILED", with no counts. That was my invocation error, and the file was overwritten by the corrected run.
  - So the remaining single source of truth is guarded.
  - Class re-swept: `git grep -n "\.focus()" c5303ca -- src ':!*__tests__*'` gives 4 calls in 3 files (`Navigation.tsx`, `DiscordContentEditor/Mobile.tsx`, `SlateEditor/index.tsx` ×2), down from 5 at `2618926`. Each file has `grep -c autoFocus` 0, so each is an event-driven focus, not a mount duplicate of an `autoFocus` prop. The class has 0 members. The predicate cannot see an `autoFocus` passed in one file and duplicated by a focus call in another.
- **Conventions.** `convention-check.js website --since=2618926`: 0 FAIL, 0 CANDIDATE, 1 SKIP (id-token; no test file is in the diff).
- **Verdict: APPROVED.** Website `c5303ca` supersedes `2618926` for QA.
- **Assumption Not Checked.** react-aria focuses through `focusSafely` (`@react-aria/interactions` 3.27.0, `dist/focusSafely.mjs`). That is `focusWithoutScrolling`, and under virtual-cursor modality it waits until running transitions end. The deleted effect called `.focus()` at once. So this deletion changes behaviour only for a screen-reader (virtual-modality) user: an `autoFocus` button is focused after transitions, not during them. This review assumes that is acceptable, as react-aria's documented intent, and does not test it in a real screen reader. If it is false, an `autoFocus` button inside a transitioning dialog is not focused, or is focused late, for a VoiceOver user. UAT owns closing it, as a user-visible check.

## Round 14 sub-entry (CR-37 and CR-26 fixes; website `b195eeb..2618926`): APPROVED_WITH_COMMENTS

- **Stage start.** The implementer's message (cross-session) names `2618926`, documented in the implementation document's § Round 2 (agent-output `34288c1`). It is a fix confirmation, so it is a sub-entry of Round 14, which raised CR-26 and CR-37's surface, not a new round. No steering brief arrived. The diff (2 commits: `.eslintrc.json` 10/0, two test files 26/0 and 25/0, no production source) was written to a file and read. The shared tree is at `2618926` with 0 status lines.
- **CR-37 RESOLVED.** These are fixes to a guard and an instrument, so they were re-attacked, not read: `cr-m6-probes/cr26-ban/mutators/run-fix-check.sh 2618926`. It runs the two cells' files under a control and four mutants, each mutated line read back (`verification/015/mutation-cr37-*-2618926.txt`).
  - Control: 25 of 25, exit 0.
  - (b) `DiscordMessageEditor calls onMount once after mounting and not again when it re-renders`: killed by `editor-onmount-effect-empty` (1 failed). It is also killed by a mutant I added, `editor-onmount-deps-dropped` (the `[]` removed), so the "not again" half discriminates.
  - (a) `Button auto focus` (focused with `autoFocus`, not without): `button-autofocus-effect-empty` **survives** (25 of 25). It is an equivalent mutant. `@react-aria/interactions` 3.27.0, which react-aria 3.46.0 resolves, has `useFocusable` focus on mount from `props.autoFocus` (`dist/useFocusable.mjs`, `autoFocusRef`), and `Button` passes `autoFocus` to `useButton` inside `_props`. The implementer's `cr37-button-autofocus-effect-and-aria-dropped` (the effect emptied, and `autoFocus: false` passed to `useButton`) kills it (1 failed). So the behaviour is now asserted, which is CR-37's class. The oracle is `document.activeElement`.
  - Before this fix, `git grep -lw` for `autoFocus` and for `onMount` over `__tests__` gave 0 files each, so both behaviours had no assertion at all. After it, they have one each.
- **Correction to the `b195eeb` sub-entry (dated 2026-11-08, my error).** It says the suite "cannot see the loss of two of the three behaviours". For `Button` that is wrong. Emptying the effect loses no behaviour, because react-aria focuses the button itself, so the surviving mutant showed equivalence, not a blind spot. CR-37 stood on (b), which is a real loss unseen, and on (a)'s static absence of any assertion. Its severity and verdict do not move. The `b195eeb` text is left as written and corrected here.
- **CR-26 RESOLVED.** `cr26-ban/run.sh` at `2618926` (`lint-2618926.txt`, config blob `cf662fd`):
  - The ban flags 9 of 14 plants, now including `react-use/lib` and `react-use/esm` index imports. Both controls give 0.
  - The package's only entry points are `lib/` and `esm/` (`ls node_modules/react-use`), and both are covered.
  - Unflagged by this rule: `react-use/lib/useMount.js` (an error under `import/extensions`) and `require` (an error under `@typescript-eslint/no-var-requires`), so no static spelling passes lint. The stated residue is dynamic `import('react-use')`, which no import rule sees.
- **Conventions.** `convention-check.js website --since=b195eeb`: 0 FAIL, 0 CANDIDATE, 2 SKIP (`.eslintrc.json`, id-token). The ID-token class by hand over the two test files' titles and comments: 0. The new `Button.auto-focus.test.tsx` has the positive form and sits beside `Button.tsx`, on `helpers/dom.ts`. The editor case extends an existing file.
- **Verdict: APPROVED_WITH_COMMENTS** (CR-38 LOW). Website `2618926` (QAF-34, QAF-35, CR-26, CR-37) goes to QA.
- **Assumption Not Checked.** This review assumes jsdom's `document.activeElement` follows `focus()` the way a real browser does for a mounted `<button>`. If it does not, `Button auto focus` passes or fails in jsdom differently from a browser. That is the Environment-fidelity convention's question, and QA owns it at Phase 2.

**CR-38 LOW Round 14 Two mechanisms for one behaviour**: `Button`'s mount effect (`useEffect(() => { if (autoFocus) localRef.current?.focus(); }, [])`) repeats what react-aria's `useFocusable` already does from the `autoFocus` prop that `useButton` receives.
- **Location**: `Button` in `src/components/Button.tsx` at website `2618926`, the mount `useEffect` and the `useButton(_props …)` call.
- **Class**: a component that implements a behaviour its own interaction library already provides from the same prop. That is two sources of truth: removing either leaves the behaviour, so neither one can be tested alone.
- **Enumeration**: cannot be enumerated in general (it needs each library's semantics). For this behaviour, `git grep -n "\.focus()" 2618926 -- src ':!*__tests__*'` gives 5 hand-written focus calls in 4 files (`Navigation.tsx`, `Button.tsx`, `DiscordContentEditor/Mobile.tsx`, `SlateEditor/index.tsx` ×2), which a reader can check against an `autoFocus` passed to a react-aria hook. I have not dispositioned those beyond `Button`.
- **Required Action (implementer, non-blocking; next website commit, else the Planner batch)**: delete the effect and its `useEffect` import if it is then unused. `Button auto focus` then guards react-aria's path directly. Falsity signature: the cell fails under a single mutant that passes `autoFocus: false` to `useButton`.

## Round 14, Round 10 and Round 2/3 sub-entry (CR-26, QAF-34, QAF-35, CR-35, CR-36; website `4f9ed85..b195eeb`): REJECTED for CR-26's callers (CR-37 MEDIUM)

- **Stage start and route.** The implementer's message (cross-session) names `Handoff-At` `b195eeb` in `implementation/015-bug-evaluation-fixes-qaf34-qaf35-cr26-implementation.md` (agent-output `cd35f29`). Steering's brief for this delta has not arrived. I read the plan's Decisions Register (no change since rev 27) and the predecessor's Assumption Not Checked myself.
- **Delta.** `git diff --numstat 4f9ed85 b195eeb`: 7 paths in 4 commits. The production paths are `.eslintrc.json` (15/7) and the three `useMount` callers (`Button.tsx` 4/3, `DiscordMessageEditor/index.tsx` 2/3, `utils/hooks/index.ts` 2/3). Everything else is under `__tests__/`; the `formatKey` file moves at 100% similarity. Each surface is a fix confirmation, so it is a sub-entry of its raising round: CR-26 under Round 14; QAF-34 (M6-a) under Round 14; QAF-35 (M5-h (3)) under Round 10; CR-35 and CR-36 under Round 3 and Round 2. Nothing touches beyond those findings' scope, so no round opens. The whole diff was written to a file and read.
- **CR-26: narrowed, not RESOLVED (LOW, non-blocking).**
  - The fix is the structural form, a `no-restricted-imports` ban on `useMount` from `react-use` (`paths` with `importNames`, plus the pattern `react-use/*/useMount`). `no-restricted-syntax` is back to `"off"`, as at `7ce866b` (`git show 7ce866b:.eslintrc.json`), so airbnb's own `no-restricted-syntax` entries are no weaker than before the chain.
  - **Confirming the implementer's question (1).** The falsity signature does change form, correctly. An import ban's signature is "every import spelling flagged, an unrelated import not". A benign use being flagged is the point of making the class unrepresentable.
  - **Re-attacked from first principles:** `cr-m6-probes/cr26-ban/run.sh`, 14 plants linted over stdin with the repo's config at `b195eeb` (`lint-b195eeb.txt`). The ban flags named, aliased, namespace, `react-use/lib/useMount`, `react-use/esm/useMount`, `export { useMount } from` and `export * from`, which is 7. Both controls pass: `useEffectOnce` from `react-use`, and `useEffect` from `react`. All 8 members of CR-26's original enumeration are now caught at their import line.
  - **Not flagged by the ban:** `import { useMount } from 'react-use/lib'` and `from 'react-use/esm'`, which no other rule flags either, although both index files export `useMount` (`grep -c useMount node_modules/react-use/{lib,esm}/index.js` gives 5 and 2; the package has no `exports` map). Also not flagged by the ban: `react-use/lib/useMount.js`, which `import/extensions` flags; `require('react-use')`, which `@typescript-eslint/no-var-requires` flags; and dynamic `import('react-use')`, which no rule flags.
  - So the class still has two static spellings that pass lint, plus the dynamic one. The tree has 0 members: `git grep -cw useMount b195eeb -- src public` gives 1 hit, a commented-out line in `DiscordContentEditor/Desktop.tsx` that predates this delta. Every `react-use` import in `src` is from the bare package path.
  - **Required Action (implementer, non-blocking; at its next website commit, else the Planner batch):** add `react-use/lib` and `react-use/esm` to `paths` with `importNames: ["useMount"]`. Falsity signature: the `lib-index` and `esm-index` plants each give 1 `no-restricted-imports` message, and both controls give 0. The dynamic-import residue is stated as unflagged rather than guarded, because no import rule sees a member read off a dynamic module.
- **The callers' substitution.** react-use 17.4.0, which the lockfile resolves, defines `useMount(fn)` as `useEffectOnce(() => { fn(); })`, and `useEffectOnce(e)` as `useEffect(e, [])` (`node_modules/react-use/lib/useMount.js`, `useEffectOnce.js`). Each rewrite is that definition inlined, with a block body that discards the callback's return:
  - `Button`: `if (autoFocus) …focus()`.
  - `DiscordMessageEditor`: `{ onMount?.(); }`, not the concise `() => onMount?.()`, so a returned value is still discarded.
  - `useMounted`: the same body.
  - `react-hooks/exhaustive-deps` is `"off"` in the repo config, so the `[]` raises nothing.
  - **Whether an assertion fails when each effect is lost** (severity floor): I emptied each effect to `useEffect(() => {}, [])` in an isolated export of `b195eeb`, ran the whole suite with `verification/015/mutate-run.sh` (driver `cr-m6-probes/cr26-ban/mutators/run-mutants.sh`) and read each mutated line back:
    - `useMounted` emptied: **killed**. 26 cases in 4 files fail, exit 1 (`mutation-cr26-usemounted-effect-empty-b195eeb.txt`).
    - `Button`'s autoFocus effect emptied: **survives**. 1119 of 1119 pass, exit 0 (`mutation-cr26-button-autofocus-effect-empty-b195eeb.txt`).
    - `DiscordMessageEditor`'s `onMount` effect emptied: **survives**. 1119 of 1119 pass, exit 0 (`mutation-cr26-editor-onmount-effect-empty-b195eeb.txt`).
    - So the implementer's "identical pass set" cannot see the loss of two of the three behaviours it says it preserves. That is CR-37.
- **QAF-34 (M6-a, "static and interactive").** The title case is now a `describe.each` over `markdown.static.parseEmbedTitle` and `markdown.interactive.parseEmbedTitle`. The interactive predicate (`node.type` includes `codeBlock`) gets a positive control: `interactive parseContent` parses the same fence as a `codeBlock`, so the predicate is not vacuous. The red is the implementer's `m6a-title-codeblock-interactive` mutant (1 case), recorded and not re-run. The oracle is a literal `false` against an independent parser's positive.
- **QAF-35 (M5-h (3)).** `'{'` and `'[{}]'` join the existing `it.each`, extending the found pattern. The implementer states plainly that no natural mutant separates a row from its sibling branch. That is test adequacy, so it goes to QA.
- **CR-35 RESOLVED.** `test-placement.py` at `b195eeb` gives 15 misplaced, 0 of them `formatKey` (`placement-b195eeb.txt`). The rename at 100% similarity keeps the case count by identity. The 6 earlier likely members stay with the Planner batch, as sent.
- **CR-36 RESOLVED.** The QAF document's M1-i bullet now reads "two `stays` rows", and a dated changelog row says so.
- **Conventions.** `convention-check.js website --since=4f9ed85` over the shared tree, which is at `b195eeb` with 0 `git status --porcelain` lines: 0 FAIL, 0 CANDIDATE, 2 SKIP (`.eslintrc.json`, id-token). eslint ran. The ID-token class was applied by hand to the three touched test files: 0 hits (`cr-qaf-probes/id-token-b195eeb.txt`).
- **Verdict: REJECTED for CR-26's callers (CR-37 MEDIUM, severity floor).** QAF-34, QAF-35, CR-35 and CR-36 are met. CR-26's ban is the right structure but narrowed, not RESOLVED (two index subpaths, LOW, non-blocking). Under the floor, the tree `b195eeb` does not go to QA until CR-37's two assertions land.
- **Answers to the implementer's two questions.** (1) Confirmed, the signature changes form, with the two subpaths it misses. (2) CR-36 is reconciled.

**CR-37 MEDIUM Round 14 Preserved behaviour without an assertion**: CR-26's fix moves three mount effects off react-use's `useMount`. For two of them, no assertion in the suite fails when the effect is lost.
- **Location**: the mount `useEffect` in `Button` (`src/components/Button.tsx`, the `autoFocus` focus) and in `DiscordMessageEditor` (`src/components/DiscordMessageEditor/index.tsx`, the `onMount?.()` call), at website `b195eeb`.
- **Class**: a mount-time effect whose behaviour the change claims to preserve, with no assertion that fails when the effect is emptied. Severity floor: at least MEDIUM, and it blocks hand-off to QA.
- **Enumeration**: the three effects the delta moved, each emptied in turn (`cr-m6-probes/cr26-ban/mutators/`): 2 survive, 1 is killed. This sees only the delta's effects. A mutation sweep of the change is QA's, not mine. A static cross-check, `git grep -lw` for `autoFocus` and for `onMount` over `__tests__`, gives 0 files each.
- **Required Action (implementer)**:
  - Spec-form DOM tests on the existing harness (`createRoot` and `act`). These are intra-chain, so no bug form and no `// escaped:` line. For (b), extend an existing `DiscordMessageEditor` test (`DiscordMessageEditor.component-limit.test.tsx` and `.duplicate-placement.test.tsx` already mount it). `Button` has none, so (a) is a new `src/components/__tests__/Button.<behaviour>.test.tsx` on `helpers/dom.ts`.
  - (a) `Button` with `autoFocus` is the focused element after mount, and without it is not. The negative half makes an always-focus mutant fail too.
  - (b) `DiscordMessageEditor` calls `onMount` exactly once after mount and not again on a re-render. "Once" makes a dropped `[]` fail too.
  - The expected values are `document.activeElement` and a call count, never derived from the component.
  - Falsity signature: (a) fails under `button-autofocus-effect-empty.py` and (b) under `editor-onmount-effect-empty.py`, each shown red, then green at the fix SHA.
- **Assumption Not Checked.** This review assumes the implementer's recorded mutants for QAF-34 and QAF-35 (`verification/015/mutation-qaf3*-*.txt`) ran against the tree they name. I read them and did not re-run them. If that is false, a mutant file's export line names a SHA other than `b93e897`/`00c9bee`, or the killed case is absent from the test at `b195eeb`. QA's Phase 2 mutation sweep owns closing it.

## Round 2 and Round 3 sub-entry (QAF-27 for M1, QAF-20 for M2; website `476c633..4f9ed85`, test-only): APPROVED_WITH_COMMENTS

- **Stage start and route.** `Handoff-At` `4f9ed85` in `implementation/015-bug-evaluation-fixes-m1-m2-qa-findings-implementation.md` (agent-output `b0c4c60`). The implementer's handoff message to this role failed ("No agent named 'code-reviewer-hooks-015' is reachable", that document's Resumption State). Steering's brief of 2026-11-08 (after the usage gate) is the route.
- **Scope check.** `git diff --numstat 476c633 4f9ed85` shows 5 paths, every one under `__tests__/`: two cell additions (+13/−1 and +15/−1), one deletion (−142), one move target (+54), and one new file (+13). So the delta is test-only, which settles the brief's "not checked" premise. `4f9ed85` itself (one commit over `825a7d8`) removes five comment lines from `constructImageUrl.default-avatar.test.ts`, as claimed. Per this definition, a test-only diff is a scoped check under the rounds that own the surfaces (M1 Round 2, M2 Round 3) and does not open a round. Its adequacy is QA's.
- **Read against the conventions** (`agent-output/CLAUDE.md` § Test Conventions; each file read at `4f9ed85` via `git show`):
  - *Spec-form.* The new cells name behaviours ("stays on the page for a session value holding a legal %41 octet", "clears out all the same when the key deletion resolves with per-command errors"). No ID tokens appear in basenames, titles or comments. The class regex hit 0 across the four files; the planted control hit 1 (`cr-qaf-probes/id-token-4f9ed85.txt`). The tool skips this check here, because no `TEST-CONVENTIONS.md` sits above the repo, so it was applied by hand.
  - *Escaped provenance.* The moved `describe` keeps its one `// escaped: analysis/closed/005-user-reported-bugs-analysis.md` line. The artefact is tracked (`git cat-file -e HEAD:…`, and `ls -d`). The titles stay spec-form.
  - *Oracle independence (axiom E).* QAF-20 step 3 replaces the `'0000'` self-comparison with the literal `…/avatars/1.png`. That literal matches Discord's documented default-avatar rule, `(id >> 22) % 6`, for `1000000000000000000`. It is not the test's derivation, and it discriminates: if `'0000'` were taken as non-zero, the `disc % 5` path would give `0.png`. The max-snowflake literal gives 1 by the same rule (`cr-qaf-probes/avatar-literals.txt`). The two self-comparison `formatKey` cases and the seven regex-transcription cases are deleted. `git grep -c bugFixCoverage 4f9ed85 -- src` gives 0 (exit 1). `git grep -c useParsePathname 4f9ed85 -- '*__tests__*'` gives 0, so the hook is untested, and that is recorded as the implementation's Outstanding Item 1.
  - *Positive controls on the new predicates.* The implementer's mutant `qaf27-m1c-sessions-delete-added` kills three cells, so `sessionsStatements()` is not vacuous. The other six mutants are each tied to their cells in the implementation's TDD table. I read them as recorded and did not re-run them (mutation is QA's).
  - *Arithmetic re-run.* 1118 + 5 + 1 + 5 + 2 − 16 = 1115. The diff adds two `stays` rows, two `sends` rows and one `it`, which is 5 for M1-i, consistent with that sum (but see CR-36).
  - *Convention check.* `node ~/.claude/tools/convention-check.js website --since=476c633`, run over the shared tree after `git diff --numstat 4f9ed85` showed the four files identical there: 0 FAIL, 0 CANDIDATE, 3 SKIP (`.eslintrc.json`, the deleted file, id-token). eslint ran there with no FAIL. In a detached worktree at `4f9ed85` (since removed), eslint broke on the symlinked `node_modules`, the recorded hazard. The fixed-wait scan finds no candidate, so the second `setImmediate` turn is a turn yield, not a timed wait. Whether that second turn is needed is not separated (the implementer's own note). That is test adequacy, so it goes to QA.
- **CR-35 LOW (Round 3, M2) and CR-36 LOW (Round 2, M1)** below. Neither blocks QA.
- **Verdict: APPROVED_WITH_COMMENTS.** QAF-27's owed members and QAF-20's steps 1 to 5 are delivered as the QA findings required.
- **Assumption Not Checked.** This review assumes the vitest pass set recorded at `825a7d8` (1115 of 1115, exit 0) holds at `4f9ed85`, where only five comment lines changed in one file. If it does not, a case in `constructImageUrl.default-avatar.test.ts` fails or is missing at `4f9ed85`, or the exit code is non-zero. QA's effort-final Phase 2 owns closing it (Next Steps).

**CR-35 LOW Round 3 Test not beside its module**: `formatKey.key-format.test.ts` sits in `src/utils/__tests__/`, but `formatKey.ts` is in `src/utils/redis/`, which already has its own `__tests__/` directory.
- **Location**: `src/utils/__tests__/formatKey.key-format.test.ts` at website `4f9ed85` (new file). Its module, `src/utils/redis/formatKey.ts`, sits beside `src/utils/redis/__tests__/redis.fetch-channel.test.ts`.
- **Class**: a test file whose `__tests__/` directory is not the one directly under its production module's directory (Test Conventions, "Tests live beside the code they cover"). The Patterns row "None exists for `formatKey`" is true of `formatKey` tests. It misses the placement pattern its own module directory carries.
- **Enumeration**: `verification/015/cr-qaf-probes/test-placement.py <website> <sha>` matches each test's `<module>` segment to production files with that stem. Results: 16 MISPLACED at `4f9ed85` (`placement-4f9ed85.txt`) and 15 at `476c633` (`placement-476c633.txt`). The delta adds exactly one member, this file, which is also the positive control (absent at base, present at tip). The predicate cannot see a module named by a directory's `index` file. So the `utils.*` (6), `constants.*` (1) and `DiscordMessageEditor.*` (2) hits are its false positives, where the stem collides with an unrelated file. It also counts as placed a stem shared by several files when one of them sits in the parent, and it skips `helpers/`. That leaves 6 likely members that predate this delta: `messageStore.dropped-set-report`, `messageValidity.predicate`, `useApiMethods.json-editor-repair`, `usePusher.hash-parity`, `cron.scheduled-selection` and `interactions-edge.signature-before-parse`. Each still needs a reading to confirm which module it covers.
- **Required Action (implementer)**: *Minimum*: move this file to `src/utils/redis/__tests__/formatKey.key-format.test.ts`, with per-file case count and pass set identical before and after (the rename class's evidence). *Preferred*: also disposition the 6 earlier members. They are not this delta's, so they go to the Planner batch as one row, not into this fix. No assertion changes, so no falsity signature is owed.

**CR-36 LOW Round 2 Count in the record**: the implementation document's QAF-27 M1-i bullet says "three `stays` rows" and lists two.
- **Location**: `implementation/015-bug-evaluation-fixes-m1-m2-qa-findings-implementation.md` § the QAF-27 M1-i bullet (agent-output `b0c4c60`).
- **Class**: a stated count in a stage document that disagrees with the diff it describes. Here it is 3 + 2 + 1 = 6 against the 5 that the diff carries and the document's own arithmetic uses.
- **Enumeration**: cannot be enumerated by a predicate. The other counts in that document (the Before/After table and the 1115 arithmetic) were re-derived above and agree.
- **Required Action (implementer)**: one dated reconcile note correcting "three" to "two". The verdict does not move.

## Round 18 sub-entry (CR-27 fix and D36 guard, preview-image-generator `8de2b53`): M8 APPROVED_WITH_COMMENTS

- **Stage start.** The implementer's handoff names `Handoff-At` `8de2b53` (agent-output `9f431e7`). The fix diff `6c613a5..8de2b53` (2 commits, `src/server.ts` 4/2, `src/getPool.ts` 18/4; lockfile unchanged) was written to a file and read in full. It was resumed after the usage gate (rulings 09:58Z). The exports were rebuilt: `m8-local-probe/run.sh … 8de2b53` gives 32 of 32 again, `sha 8de2b5337179…`, 0 env files in the export, with npm ci and tsc both exit 0.
- **Plan revision read.** Rev 27 (`18d361c`). The plan's delta to `73435b3` (56/26 lines) adds Planner batch rows, changelog rows and Status-Detail only. No criterion, milestone or release condition moved, so the verdict reads rev 27's criteria.
- **CR-27 RESOLVED.** This is a structural fix. In `shutdown`, `Drain complete` now sits inside the `try`, after `Promise.all`. The `catch` logs `Drain failed after Nms: <message>` with `console.debug` (stdout) and keeps the stderr error and `process.exit(0)`.
  - Re-attacked: `attack.cjs` row C now requires the failure to happen (a TypeError is seen), no drain-complete line, and exactly one failure line on stdout. Results: FAIL 3 of 3 at `6c613a5`, PASS 3 of 3 at `8de2b53` (`attack-r3-<sha>-<n>.txt`). The class sweep `git grep -n "Drain complete" 8de2b53 -- src` finds 1 site, on the success branch (`sweeps-8de2b53.txt`).
  - Row A's settle (my instrument) passes 6 of 6 across both trees.
- **CR-28 RESOLVED.** The private field is now reached only through `waitingQueueDequeue`, which checks both `_waitingClientsQueue` and a callable `dequeue`. `createPool` attaches the handler only when that check passes, and `checkPoolShape` writes the named line when it does not. The Required Action's "fail at pool creation" is superseded by the owner's log-and-serve selection (D36, AF-31). The Patterns row is corrected (implementation document, "Creation-error handling"). Re-swept: `git grep -c '\._[a-zA-Z]' 8de2b53 -- src` gives 9, one of them the dependency field (in `waitingQueueDequeue`) and the rest the generator's own `_id`/`_useCount`. The bracket form gives 0 (`sweeps-8de2b53.txt`).
- **D36 guard: M8-d (d) is met as written.** So the owner prompt that rulings 09:42Z made conditional on this verdict is not owed.
  - It checks a real generic-pool instance (`autostart: false`, `min: 0`, `max: 1`, a rejecting create) built before `listen`, so it does not depend on the lazy first-request pool. CR-33 and Round 20's lazy-pool assumption are both met.
  - Rig cells 33 to 36 assert the line once before any request for both member forms (field renamed; `dequeue` renamed with the field kept), no line on the resolved tree, and no crash on a failing launch with the member absent. Recorded red: `run-d36-red-6c613a5.txt` and `run-d36-red-7e5ca5f.txt` give `lines: 0` and `status:1`.
  - eslint over both changed files in the export exits 0 (`eslint-8de2b53.txt`). `convention-check.js preview-image-generator --since=6c613a5`: 0 FAIL, 0 CANDIDATE. Its eslint was skipped in the shared tree (no `node_modules`), hence the export run.
- **The drift measurement** (the held step). The instrument is `cr-m8-probes/drift.cjs`, `drift-launch-count.cjs` and `run-drift.sh`. The process whose output is the evidence is the generator's own build at `8de2b53`. I authored only the observer: a preload that counts `puppeteer.launch` calls and reads the live pool's `pending`, plus a stderr line count, as two differently shaped launch counters.
  - The mutant is a `cp -a` of the export with every `_waitingClientsQueue` in `node_modules/generic-pool/lib/Pool.js` renamed. The runner reads back 8 renamed and 0 left; the control reads 8 and 0 renamed. The runs are on node v24.14.0 inside `unshare -rn`, where puppeteer has no browser, so every launch fails at once. Three runs each: `drift-{control,mutant}-8de2b53-{1,2,3}.txt`.
  - **Control.** No guard line. `pending` is 0 by 3 s. There are 2 launches in all (the pool's `min`). The process is alive.
  - **Mutant.** The guard line appears once, **on stderr**, before `ready`. `pending` stays **1** at 3 s and at about 16 s, so the waiting acquire is never rejected. In the 3 s after the request, the preload count gives 13,631, 14,118 and 11,015 launches across the three runs, and the stderr count gives 15,131, 14,120 and 12,270. The gap tracks the preload's snapshot age: the counters agree to within 2 when the snapshot is 10 ms old (run 2). By about 16 s (run 1): about 62,600 launches and 571,609 stderr lines. The process stays alive and serving.
  - The HTTP status is no oracle here. Both trees answer 500 within 150 ms, because `generateImage`'s `Promise.all` rejects on the S3 delete leg (the CDN port is dead in E-1) while the acquire may still wait. So the pool's `pending` is what the verdict reads.
  - **Reading.** The cost that ships is the one R-23 names and steering described to the owner at ~09:46Z ("leaves requests waiting while the pool keeps retrying"). It is F-34's base behaviour after the named line. It is not AF-31's earlier exit-and-restart. So the accepted cost is the one that ships. Its magnitude was not stated to anyone, and that goes to CR-34.
- **Verdict.** M8-a is now met (CR-27 RESOLVED), and M8-b to M8-e stand from Round 18 and Rounds 19/20. **M8 is APPROVED_WITH_COMMENTS** (CR-34 LOW). It hands to QA.
- **Assumption Not Checked.** This review assumes that production's launch-failure mode (Chrome 116 present, so a crash or timeout rather than a missing binary, on Node 18.17.1) retries at a rate of the same order as E-1's missing-binary rate on node 24, which is the fastest-failing case. If it does not, the prod error log grows at a rate very different from about 36k lines/s during a launch outage after drift. devops owns closing it at the RK-8 lockfile-trigger read (the M9 carrier), which runs the drift probe on the deployed engine (Next Steps).

**CR-34 LOW Round 18 Residue magnitude unstated**: R-23's restatement of RK-8's post-line residue says "pending while creation retries" and gives no rate. At `8de2b53` under drift, the measured rate is 3,700 to 4,700 launches/s (11,015 to 14,118 in 3 s over three runs) and about 36,000 stderr lines/s (run 1).
- **Location**: plan Planner batch row R-23 ("With the member absent at `8de2b53`, the handler is not attached…"), parked under D37. RK-8 (rev 27) still states CR-31's exit signature from `6c613a5`.
- **Class**: a risk residue accepted on a qualitative description where a measurement exists. Here it is the cost of a degraded mode whose log volume is the operator-visible effect.
- **Enumeration**: `grep -c "member absent\|creation retries\|keeps retrying"` over the plan at `73435b3` gives 1, R-23's row. The predicate cannot see a residue phrased without those words. RK-8, which states CR-31's exit, is one such member, found by reading. Steering's 09:49Z rulings block carries the owner-facing text, outside the plan.
- **Magnitude**: measured on node v24.14.0 in E-1 (no browser binary, the fastest failure), three runs, `drift-mutant-8de2b53-*.txt`. Production's engine and failure mode are unmeasured (this round's Assumption Not Checked).
- **Required Action (planner, at the D37 pre-UAT fold)**: RK-8's restated residue cites the measured pending acquire and rate with its capture path and the engine it was measured on. The M9 carrier's read names PM2's **error** log (concurring with R-23's stream row). That stream is also an operator-visible signal, so UAT reads it as an operator-visible check. Whether the measured magnitude changes steering's 09:49Z "not re-put" is steering's call. I have sent it the figures.

## Round 20 (plan gate read, rev 27, agent-output `18d361c`; mechanisms executed at website `476c633` and preview-image-generator `6c613a5`)

- **Scope.** Steering's brief covers the delta `c375d2c..18d361c` (plan 85/24), written to a file and read in full. It folds CR-30 (the D35 re-put, M8-b narrowed, X-23), CR-31 (RK-8), D36's M8-d (d), X-24, the M5-h (3) deciding-read rule (M-C9-1), and the RK-8 carrier at M9. The architect's rev 27 pass (`b2add20`, AF-31) landed while I was reading. AF-31 concerns whether the guard serves or refuses to start, and it does not overlap the findings below.
- **CR-30 RESOLVED.**
  - D35 is rewritten with both selections.
  - M8-b refuses exactly bad JSON, `null`, numbers, strings and booleans. Those five are the five my `body-class-run1-6c613a5.txt` shows refused.
  - X-23 carries the array residue with QAF-33's S3 consequence, marked as read from code, and has the three L-C7-1 clauses.
  - M8-b's `null` claim now cites the executed base run.
  - M8-b at rev 27 is met at `6c613a5` by that run, so Round 18's M8-b verdict is restored under rev 27.
- **CR-31 RESOLVED.** RK-8 states the measured exit, its control and the PM2 consequence. The falsifier is the startup line, or a prod exit whose log shows that TypeError. The carrier is a devops handoff minted at M9 with an event trigger. It says "on node 24"; a host before Node 15 would show the hang. That is already covered by Round 18's open Assumption Not Checked on the host's Node version, so it is no new finding.
- **X-24.** No finding. It is a stated limit with the three clauses.

### Findings

CR-32 LOW Round 20 — the M5-h (3) re-run trigger names `src/app/preview/`, `src/utils/index.ts` and "the editor components the page renders". That set leaves out `src/utils/limits.tsx`, where `validateEmbedCharacterCount` throws on `embeds: ""` (CR-20).
- **Location**: plan § M5-h (3), the deciding-read paragraph at `18d361c`.
- **Class**: a re-run trigger stated as a hand-picked path list, over a membership decided by a whole render path.
- **Enumeration**: the class (3) crash sites established by execution in Rounds 10 to 19:
  - `makeEditable` (`src/utils/index.ts`);
  - `validateEmbedCharacterCount` (`src/utils/limits.tsx`, `git grep` at `476c633`);
  - `hasValidField` (`src/components/DiscordMessageEditor/components/EmbedEditor/Embed.tsx`, the change that moved `fields: null`);
  - the gallery's `items.map` (the editor's components).

  One of the four lies outside the named set. This list cannot see a crash site not yet found. The page's import closure is not measured.
- **Instrument correction (mine)**: `run-class-guard-removed.sh` used to swap in `page.tsx`'s whole pre-guard blob. That would discard any later change under `src/app/preview/`, which is exactly when the trigger fires.
  - It now reverse-applies only the guard commit's diff (argument: `09c7c45`) and stops if that patch no longer applies.
  - At `476c633` the reversed file is byte-identical to the guard parent's blob (`0e3fc49`, both recorded in the run). The 44 results are identical to run 1 (`class-noguard-run2-476c633.txt`).
  - The plan's "restores `page.tsx` from before the guard" now describes run 1's method.
- **Required Action (planner, rev 28 or a batch row)**:
  - Preferred: state the trigger as any non-test change under the website's `src/` after the last run's SHA. The run takes about 10 s, so a wide trigger costs nothing.
  - Minimum: add `src/utils/limits.tsx`, and name the editor as `src/components/DiscordMessageEditor/**`.
  - In either case, cite run 2 and the guard commit, not a pre-guard blob.

CR-33 LOW Round 20 — M8-d (d) asks for a line when the pool "lacks the private waiting-queue member the remedy reaches", and gives only the renamed field as its member. The remedy reaches `_waitingClientsQueue.dequeue`. A tree that keeps the field but drops `dequeue` fails the same way.
- **Location**: plan § M8-d (d) at `18d361c`; `createPool`'s `factoryCreateError` listener in `src/getPool.ts` at `6c613a5`.
- **Class**: a presence guard specified at one level of a two-level private access path.
- **Executed**: `cr-m8-probes/run-rk8-field.sh` on a second isolated copy of the export.
  - Mutant: `build/getPool.js` calls `dequeueRenamed()`, with the field read unchanged. It was read back from disk, and the output records the field read.
  - Result: `ECONNRESET`, then exit 1 after 424 ms, on `TypeError: waitingClients.dequeueRenamed is not a function` (`rk8-method-mutant-6c613a5.txt`).
  - A check for the field alone writes no line here.
- **Enumeration**: the remedy's private path has 3 links: the `_waitingClientsQueue` field, its `dequeue` method, and the dequeued request's `reject`. Startup can check the first two. The third exists only once a client is waiting, so it cannot be checked at startup and stays under RK-8's exit signature.
- **Required Action**:
  - Planner: (d) names the member as `_waitingClientsQueue` with a callable `dequeue`, and adds this run as its second member. The unreachable `reject` link is stated as RK-8's residue.
  - Implementer: the D36 guard, now being written in the CR-27 fix, checks both levels. Steering is told so that the guard does not land with one level only.

### Round 20 verdict

APPROVED_WITH_COMMENTS. CR-30 and CR-31 are RESOLVED. CR-32 and CR-33 are LOW.
- **M8-b.** It is met at rev 27, at `6c613a5`, for its five refused members.
- **Assumption Not Checked.** This review assumes the D36 guard can run before the first request, while `getPool()` creates the pool lazily. `server.ts` at `7e5ca5f` imports only `getExistingPool`, so no pool instance exists at startup to inspect. If that is false, the guard cannot be at startup without building a pool, or it inspects something other than the instance whose field the listener reads; its signature would be a guard that passes on a prototype while the instance lacks the field. The implementer owns this, and I review it in the CR-27 fix sub-entry.
- **Next Steps.**
  - The planner folds CR-32 and CR-33.
  - The implementer's CR-27 handoff, carrying the D36 guard, comes as a Round 18 sub-entry.
  - QA keeps Round 19's Assumption Not Checked.

## Round 19 (plan gate read, rev 26, agent-output `c375d2c`; mechanisms executed at website `476c633` and preview-image-generator `6c613a5`)

- **Scope.** Steering's brief (after `/clear`): M5-h (3)'s anchor and the CR-29 member move, D35 in M8-b, M8-d as a property, RK-8. The delta `dd9e88a..c375d2c` for `planning/` and `steering/015-rulings.md` was written to a file and read in full (plan 43/14). I also re-ran the L-C8-1 provenance search: `git log -G"parseEmbedTitle.*codeBlock" 7ce866b` gives `57b58d8` (2023-03-23) as the oldest hit, as rev 26 states.
- **The record moved during this round.** Since `c375d2c` it has advanced to `7080e00`, with no plan revision. It now holds QA's QAF-33 (`9fdf439`), D36 (RK-8: accept, plus a startup guard; rulings 09:25Z, `f5ab120`), the D35 re-put (rulings 09:28Z, `c8c7649`: "as built, lists pass"), and R-12 to R-16. I read those blocks before writing the findings below, and the findings take account of them.
- **Process whose output is the evidence.**
  - M5-h: the real `/preview` page and editor at website `476c633`, with `src/app/preview/page.tsx` swapped for its blob at `da24eb7`. That swap reverts exactly the guard commit `09c7c45`, the only commit on that file in `da24eb7..476c633`. The export's blob hash equals the source blob (`0e3fc49`), and both are recorded in the run.
  - M8-b and RK-8: the generator built at `6c613a5` (and at base `471578f`) under E-1. The implementer's rig built the exports; at `6c613a5` it gives 26 PASS.

### M5-h (3) anchor and the CR-29 move

- **The reads.** The planner's class probe, unmodified, ran at `476c633` with the guard reverted: `cr-m5-probes/run-class-guard-removed.sh` produced `class-noguard-run1-476c633.txt` and `class-noguard-summary-476c633.txt` (44 rows, `grep -c '^REAL'` = 44; vitest 44 passed, exit 0).
  - Every member rev 26 lists as crashing crashes: it throws, or for the type-12 `items: "x"` member, it empties the root to 0 nodes.
  - Every member rev 26 lists as rendering renders, `fields: null` included (21 nodes).
  - Controls are as expected: the positive control renders 18 nodes, and `null` shows the line.
- **The instrument discriminates.** The same probe with the guard present (`class-probe-run-476c633.txt`) shows the line on every crashing member, while this run shows them throwing.
- **CR-29 RESOLVED.** No finding. The words "the tree the guard lands on" and "the chain tip" can diverge once later commits land. The parenthetical settles the reading as the tip, and that is what I measured.

### Findings

CR-30 MEDIUM Round 19 — D35 and rev 26's M8-b list arrays among the non-object bodies that get 500 "as the implementer built it". At `6c613a5`, an array passes the object check and reaches `generateImage`. Duplicates: QAF-33 in qa/015-bug-evaluation-fixes-qa.md
- **Location**: plan § M8-b and D35 at `c375d2c`; `processImage` in `src/server.ts` at preview-image-generator `6c613a5`, unchanged at `7e5ca5f` by `git grep`.
- **Class**: a "not a JSON object" refusal written as `typeof x !== 'object' || x === null`. That predicate admits arrays.
- **Enumeration**:
  - The predicate `git grep -nE "typeof [A-Za-z_.]+ [!=]== 'object'"` finds 1 site in the generator's `src` at `6c613a5` and 1 at `7e5ca5f`: this one.
  - The chain's other refusal of a non-object body is `/preview`'s `parseMessageData`. It has the `Array.isArray` limb and is not a member.
  - The predicate cannot see an `instanceof Object` or `Object.prototype.toString` form. Its 15 website hits outside tests are general type tests, not body refusals, and are not dispositioned here.
- **Executed** (`cr-m8-probes/run-body-class.sh`, `body-class.cjs`; one fresh server per body; `body-class-run1-6c613a5.txt`):
  - Unparsable, `null`, `5`, `"x"` and `true` are refused at parse, with `Request body is not an object.` or a `SyntaxError`.
  - `[]`, `[1,2]` and `[{"id":"m",…}]` each attempt a browser launch, exactly as the object control does. Their 500 is E-1's missing Chrome, so it is not a refusal. The process stays alive in every case.
  - At base (`body-class-run1-471578f.txt`), `null` exits the process with `Cannot destructure property 'id' of 'parsedBody' as it is null`, which is D35's F-32 claim, now executed. The other non-objects at base also exit, but through F-34's unhandled launch failure, not through the body.
- **Disposition**: the owner re-put the question with the cost corrected and chose "as built, lists pass" (rulings 09:28Z). The planner folds it at rev 27 (R-15). No code is owed.
- **Required Action (planner, at rev 27)**: state lists as passing, by name. The stated-limit row carries the consequence QA's QAF-33 names: `deleteMessagePreviewImages(undefined)` under `previews/undefined/`, then a `PutObject`. The row cites this run and QA's reasoning.

CR-31 LOW Round 19 — RK-8 says a changed private field makes M8-d's (a) "fail as a hang". On node 24, the measured failure is a process exit at the first launch failure.
- **Location**: plan § Risks RK-8 at `c375d2c`. The same premise appears in AF-30 ("what that throw then does is unread") and in critique cycle 9 M-C9-2's Impact ("a silent hang").
- **Class**: a falsity signature stated by reading, where execution shows a different one.
- **Enumeration**: I ran the word-bounded `grep -ciwE 'hangs?'` at agent-output `7080e00`. A bare `hang` also matches "change", and my first run made that mistake. The hits are:
  - the plan, 2 (M8-d's own "never a hang", and RK-8);
  - the architecture findings, 2 (AF-30);
  - critique cycle 9, 2 (M-C9-2);
  - the QA document, 1 (M8-d's property, not RK-8).

  So 3 documents carry the hang premise for RK-8. The predicate cannot see the same premise written another way, such as "never resolves" or "pending".
- **Executed**:
  - `cr-m8-probes/run-rk8-field.sh`, `rk8-field.cjs`. Mutant: an isolated copy of the E-1 export, with `build/getPool.js` reading `_waitingClientsQueueRenamed`. The rename was read back from disk and is recorded in the output.
  - Control (`rk8-field-control-6c613a5.txt`): one failing `/generate` gets 500, and the process stays alive.
  - Mutant (`rk8-field-mutant-6c613a5.txt`): the request gets `ECONNRESET`, and the process exits with code 1 after 378 ms on `TypeError: Cannot read properties of undefined (reading 'dequeue')`.
  - The listener throws inside generic-pool 3.9.0's `_createResource` `.catch`, so the rejection is unhandled. Node 15 and later exits on an unhandled rejection. On an older runtime it would warn and then leave the acquire pending, which would be the hang. The host's Node version is still unread (Round 18's Assumption Not Checked).
  - Every launch failure reaches that listener, the pool's `min` 2 creations included. So the falsity signature is an exit, and under PM2 a restart at each launch failure. That is (b) failing, not (a).
- **Required Action (planner, at rev 27 with D36's criterion)**: state RK-8's falsity signature as measured: an exit code 1 at the first launch failure on Node 15 and later, and a pending acquire before that. D36's startup line then pre-empts both. The architect and the critic own their wording. I am routing this to them through the planner's fold and do not edit their documents.

**No finding on M8-d's property.**
- `min = 2` is the pool default in `createPool` at `6c613a5`, and the plan's "(c) apart from the configured minimum" matches it.
- In generic-pool 3.9.0, `_ensureMinimum` runs at start and after each destroy, and a failed create re-runs only `_dispense`. So no launch follows without a waiting client. That is consistent with Round 18's attack A: 0 new lines in 3 s.
- The per-request count is honestly stated as unmeasured.

### Round 19 verdict

REJECTED, for M8-b's D35 limb as written at rev 26 (CR-30, a duplicate of QAF-33). The owner's 09:28Z re-put has already superseded it, and rev 27's fold discharges it. M5-h (3), with CR-29 RESOLVED, M8-d and the L-C8-1 correction are approved. CR-31 is LOW, for the planner.

- **M8-b at rev 26.** Round 18's "M8-b met" was against rev 25 and does not carry over. Under rev 27's restatement (lists pass), the `6c613a5` behaviour I measured meets it.
- **Assumption Not Checked.** This review assumes that an array body, with a browser that launches and a reachable S3, ends in 204 after deleting `previews/undefined/*` and writing `previews/undefined/undefined.jpeg`. That is read from code, not run: E-1 has neither a browser nor S3. Falsity signature: a 500 from `generateImage` for an array body with a working browser and a loopback S3 fake. Owner: QA, for the stated-limit row's consequence.
- **Next Steps.**
  - The planner folds CR-30 and CR-31 at rev 27.
  - QA owns the Assumption Not Checked.
  - The CR-27 fix (with D36's guard) arrives by its own handoff, as a Round 18 sub-entry.

## Round 18 (M8, preview-image-generator `6c613a5`, plan rev 25)

### Scope and identity

- **Stage start.** The handoff is from implementer-hooks-015 (message): `implementation/015-bug-evaluation-fixes-m8-implementation.md` at agent-output `3926486`, range `471578f..6c613a5`. It has 2 commits and 5 files (`server.ts`, `getPool.ts`, `generateImage.ts`, `config.ts`, `ecosystem.config.js`), read in full as one diff. The tree was checked at the start and the end; the repository has no uncommitted change.
- **Criteria.** § M8 at plan rev 25 (`dd9e88a`), recorded before reading.
- **Adversarial execution.** M8 changes a stop path (PM2 kill) and a production service's start gate, so I stood the service up and attacked it.
  - **Process whose output is the evidence:** the generator built at `6c613a5` (`tsc -b`), under E-1. That is an export without `.env`, dependencies installed inside it, `unshare -rn` with loopback up, and a self-check: loopback answers and an external lookup gives `EAI_AGAIN`.
  - **Reproduction:** the implementer's rig (`verification/015/m8-local-probe/run.sh`) at `6c613a5` gives 25 of 25 PASS (`cr-m8-probes/rig-reproduction-6c613a5.txt`).
  - **My own instrument:** `cr-m8-probes/attack.cjs`, run by `run-attack.sh` in the same export (`attack-run1-6c613a5.txt`). Its input class:
    - A: six concurrent `/generate` requests under launch failure, then 3 s idle;
    - B: a stop with an in-flight request;
    - C: B with `http.Server.prototype.closeIdleConnections` removed, the shape of a Node runtime before 18.2.
  - **Oracle:** plan M8-a P1 and P3, and M8-d.
- eslint over `src` in the export: exit 0, no output (`cr-m8-probes/eslint-6c613a5.txt`). convention-check: 0 FAIL, with the eslint SKIP closed by that run.
- I read `prod.yml` for the env path. It carries the plaintext API key (D13, X-12), and no value from it is recorded here.

### Per-limb result at `6c613a5`

| Limb | Result | Evidence |
|---|---|---|
| M8-a P1 | **Not met** (CR-27) | The triggers, idempotence, the explicit `shutdown_with_message`, both log lines and the predicate hold on the success path (rig cells). On a failed drain, the drain-complete line is still logged (attack C). |
| M8-a P2 | Met | `kill_timeout: 12000`. |
| M8-a P3 | Met | An idle exit in 14 ms with no browser (rig). An in-flight request holds the drain to the 10 s fallback (attack B: exit at 10016 ms, no drain-complete line). The pool read is `getExistingPool()`, beside the singleton (AF-14). |
| M8-a P4 | Met | Both handlers are registered before `listen`. |
| M8-b | Met | Unparsable, `null` and number bodies give 500, and the process keeps serving (rig). |
| M8-c | Met | `page.close()` is in `finally`. The rig's real-browser cells pass with `/usr/bin/google-chrome`. |
| M8-d | Met; CR-28 | One request and six concurrent requests all get 500, and no launch is attempted while idle after the burst (attack A: 12 launch-error lines after the burst, 12 after 3 s idle). |
| M8-e | Met | Unset and empty both exit 2 with a line naming `API_KEY`. `stop_exit_codes: [2]` (unchanged) keeps PM2 from restarting it. The check reads `process.env` at import, the same point the old `config.ts` read it, and PM2 passes `ecosystem.config.js`'s `dotenv` load to the app, so the env path is unchanged. |

**M8-d mechanism (Outstanding Item 1, the implementer's question).** Ruling: the property binds, not the plan's sketch. A rethrow alone leaves the waiting client queued, and the pool re-dispenses, which the implementer measured at 11,654 attempts in 3 s. Rejecting the head waiting client on `factoryCreateError` meets "the next request gets 500" with no storm (attack A). I accept it, with CR-28.

### Round 18 findings

**CR-27 MEDIUM Round 18 Success signal on the failure path**: `shutdown()` logs "Drain complete in Nms." after a drain that failed
- **Location**: `shutdown` in `src/server.ts` at `6c613a5`. The `catch` around `Promise.all` falls through to the drain-complete `console.debug` and `process.exit(0)`.
- **Class**: a completion line written whether or not the work completed. Here it is the very line M8-a's production criterion (M8-0 run 2) counts as the drain having run.
- **Enumeration**: `git grep -n "Drain complete" 6c613a5 -- src` gives 1 site, and the `catch` before it is the only failure path. Attack C reproduces it: with `closeIdleConnections` absent, the process exits in 11 ms, abandons the in-flight request, and logs `Drain complete in 1ms.`. The `TypeError` goes only to stderr, which PM2 writes to the error log, and run 2 reads the out log. The predicate cannot see other success-shaped lines; the generator has one.
- **Magnitude**: measured locally on node 24 with the method removed. Whether the host's PM2 runs the app under a Node without it is unread (this round's Assumption Not Checked). `pool.drain()` rejecting takes the same path.
- **Required Action (implementer, blocks M8-a)**:
  - Preferred (structural): log the drain-complete line only on the success branch. Log a failure line on stdout that the out-log read can count (for example "Drain failed after Nms: <message>"), and keep the exit.
  - Minimum: none narrower. `server.closeIdleConnections?.()` alone removes one cause and keeps the false line.
  - The rig owes a cell that fails at `6c613a5`: attack C's shape, a failed drain, logs no drain-complete line.
  - The plan's run-2 criterion already treats a missing drain-complete line as a failure, so no plan change is needed.

**CR-28 LOW Round 18 Unguarded private API**: `getPool.ts` reaches generic-pool's private `_waitingClientsQueue` with no check that it exists
- **Location**: `createPool` in `src/getPool.ts`, the `waitingClients` binding and the `factoryCreateError` handler, at `6c613a5`.
- **Class**: a dependency's private field read without a presence check. It holds for 3.9.0, which the lockfile pins (`package.json` allows `^3.9.0`). If the field is renamed, the handler throws `TypeError` inside the pool's rejection path, and only at the first launch failure.
- **Enumeration**: `git grep -n "\._[a-zA-Z]" 6c613a5 -- src` (`cr-m8-probes/sweeps-6c613a5.txt`) finds one private dependency field, this one. The `_useCount` and `_id` hits are the generator's own fields on its `Browser` type. A field reached by bracket notation would not be seen.
- **Record**: the implementation document's Patterns Extended row calls this "generic-pool's own README remedy". The 3.9.0 README (§ pool.on, read in the export's `node_modules/generic-pool/README.md`) shows only a logging handler and does not mention `_waitingClientsQueue`. The claim is to be corrected.
- **Required Action (implementer, non-blocking)**: fail at pool creation when `_waitingClientsQueue?.dequeue` is not a function, so a dependency bump fails at deploy and not at the first launch failure. Correct the Patterns row.

### Round 18 verdict

REJECTED for M8-a (CR-27). M8-b to M8-e are met. CR-28 is LOW. The M8-0 run-2 extension of `pig-host-read.sh` (the `Created instance` read) has not landed yet (`grep -c 'Created instance'` gives 0) and is reviewed when it does. Release consequences are devops's to establish.

## Round 17 (M7, website `476c633`, plan rev 25)

- **Scope.** `a4b4434`: `bot/scripts/app_commands/common.ts` and `bot/utils/DiscordEmbed.ts`, with their cells. The handoff is the implementer's message, with `implementation/015-bug-evaluation-fixes-m7-implementation.md` at agent-output `3926486`. Criteria: § M7 at rev 25.
- **The gate (M7-a), which widens authorization.** `ADMIN_PERMS` went from `Administrator & ManageGuild`, which is `8n & 32n = 0n` and which Discord reads as administrators only, to `ManageGuild`, which is `"32"`. Its one consumer is `messageCommands.ts` (`get_message`).
  - Neither handler (`bot/edgeCommands.ts`, `bot/serverCommands.ts` `get_message`) checks a permission. Discord's `default_member_permissions` is the only gate, and Discord applies it before dispatching the interaction.
  - The command answers with the target message, which the invoking member can already see. D4 is the owner's ruling. I did not stand up Discord: the gate is Discord's, and pushing commands is the owner's step.
- **M7-b and M7-c.** `setTimestamp` assigns where it compared. `isUserCommand` tests `'user'`. No bot caller of `setTimestamp` and no user command exist (`git grep` at `476c633`), so neither changes a live path today.
- **Cells.** The literal `'32'` and the pushed payload's `default_member_permissions` are asserted. The convention check is clean.

### Round 17 verdict

APPROVED. M7-a to M7-c are met. M7-a's limb 2 is the owner's post-push attestation.

## Round 16 (M5-i, website `476c633`, plan rev 25)

- **Scope.** `ad54eb3`: `WebhookMenu/index.tsx` and `WebhookMenu.open-category.test.tsx`. The handoff is the implementer's message, with `implementation/015-bug-evaluation-fixes-m5-implementation.md` § Delivery 2 at agent-output `3926486`.
- **The change.** Only the user's pick is state (`pickedCategory`). The open category is derived on every render: the pick, else the guild's id when `hasWebhooks`, else `'load'`.
- **It reaches the control.** `StyledAccordion` sets `dangerouslySetExpanded={selected ? item.id === selected : undefined}`, so a truthy derived value controls the real `react-accessible-accordion` after mount.
  - The one falsy value, `''`, arises when `hasWebhooks` holds but the guild object has not arrived. It falls back to the uncontrolled `preExpanded`.
  - The cell "opens the guild's webhooks when the guild object arrives after its webhooks" covers that path with the real accordion.
- **Pattern.** It mirrors M5-d and M5-f, deriving from inputs and keeping the user's value, as the plan names.
- **Cells.** They read the expanded heading in the real accordion, with providers mocked. Covered: first visit, late guild, guild change, the three "load" causes, and the pick kept across changes. Residue X-21 is stated.

### Round 16 verdict

APPROVED. M5-i is met.

## Round 15 (plan gate read, rev 25, agent-output `dd9e88a`; mechanisms at website `24ac49f`)

- **Scope.** The delta `018f72d..dd9e88a`, written to files and read in full. It includes the R-8 to R-10 rows and the code review rows already recorded. It covers M6-a without its title member (the CR-23 fold), the L-C7-1 standing constraint with its X-16 and X-21 clauses, X-20's W-7 cite (AF-28), and X-22 (the `NewMessageModal` seed).
- **CR-23 RESOLVED.** M6-a now names `parseContent` and `parseEmbedField` only. It states titles as outside the property, by design. The base facts check out:
  - `git show 7ce866b:src/utils/markdown/index.tsx` omits `codeBlock` from both `parseEmbedTitle` builders.
  - `git log -S"'codeBlock', 'heading', 'list'"` first finds the omission at `d5f2dc8`, and the parent of `d5f2dc8` lacks it.
  - The implementer's control cell ("does not render a fence as a code block") is now the title's spec. The M6-a title limb needs no further assessment.
- **CR-22 is unaffected.** M6-a still binds "every fenced block … 1 to N content lines" in both parsers, and the planner keeps that property. CR-22 stays with the implementer, blocking.
- **X-22, a mechanism check against the code at `24ac49f`, read only, not run.**
  - `NewMessageModal` mounts inside `app/message/f/[id]/page.tsx` (`git grep`), under the dynamic segment.
  - next 16.1.6 `createRouterCacheKey` keys a dynamic segment as `name|value|type`, so `/message/f/A` and `/message/f/B` have different keys, and B's page and modal mount fresh.
  - The planner's read (`verification/015/m5-modal-seed-next-keying-read.txt`) also quotes the bfcache that keeps A's subtree in a hidden `Activity` boundary. On a return to A, A's state, including a user's pick, survives. That is consistent with M5-i's "keeps a user's pick" and is no finding.
- **Exclusions text.** X-16 and X-21 each carry the three clauses L-C7-1 requires (where a report lands, the planner acts while the plan is open, after closure it is a new defect report). X-20 cites W-7 (`952e69f`) and the architect's `send/page.tsx` read. No finding.

### Round 15 verdict

APPROVED, no findings. CR-23 is RESOLVED. Round 14 stays REJECTED for M6-a (CR-22) and F-45's class (CR-24).

## Round 14 (M6, website `24ac49f`, plan rev 24)

### Scope and identity

- **Stage start.** The handoff is from implementer-hooks-015: `implementation/015-bug-evaluation-fixes-m6-implementation.md` at `eef8924`, `Handoff-At` `24ac49f`. Steering's resume brief named the same SHA. The later commit `709a7fa` adds a checkpoint and a scaffold to that document and does not move `Handoff-At`.
- **Criteria.** § M6 at plan rev 24 (`018f72d`), recorded before I read the diff. The plan delta `018f72d..dd30d3c` (rows R-8 and R-9, and the Round 13 row) was written to a file and read. It changes no criterion.
- **Tree.** website `24ac49f`. I read it with `git show` and checked it at the start and at the end of the review. The range `da24eb7..24ac49f` has 7 commits and 40 files.
  - Production: 18 files, read in full as one diff.
  - Tests: 22 files, read beside the code they cover.
- **The same range also carries:**
  - CR-17 and CR-19 (`a665901`), recorded as sub-entries of Rounds 7 and 10.
  - QAF-26 (`13be10d`) and QAF-29 (`24ac49f`): test-only, and QA's gate. Test-only diffs take no round. Their convention check is below.
  - `ef5a9cc`: M6-b's final form, reviewed with M6-b.
- **Instruments** are in `verification/015/cr-m6-probes/`, plus `cr-m5-probes/real-run5-24ac49f.txt`.

### Per-limb result at `24ac49f` (rev 24 criteria)

| Limb | Result | Evidence |
|---|---|---|
| M6-a | **Not met** (CR-22); title member to the planner (CR-23) | `run-fence.sh` run 1: every member with a blank or whitespace-only line inside renders no code block, in `parseContent` (content and embed descriptions) and `parseEmbedField`: 10 of 10. The two controls hold. |
| M6-b | Met | `isValidImageUrl` takes the text before the first `?` or `#`, lower-cases it, and tests `endsWith` against D8's eight extensions verbatim. The `includes(ext)` class has 0 production hits. |
| M6-c | Met | `hasValidField` has a second caller, the `EmbedFields` gate in `Embed`, which I traced. With empty fields, in both modes, the output is the same as at `da24eb7`: the base rendered `EmbedFields`, which returned `null`, and the head returns `null` itself. |
| M6-d | Met | The index is taken before the filter. Set, delete and both move bounds use it. |
| M6-e | Met as stated (Author); F-45's class is not eliminated (CR-24) | `useEffect` clears both the timeout and the interval. |
| M6-f | Met | `intToHex(initColor ?? 0)`, and `intToHex` pads to 6 digits. |
| M6-g | Met | The comparator takes two arguments, longest first. The one-argument sort sweep finds 0 hits. |
| M6-h | Met | `aria-expanded={isVisible}`. |
| M6-i | Met | All six insert sites use `idx + 1` (the `splice(…, 0,` sweep finds 7 hits; the seventh is `WebhookMenu`'s breadcrumb, which is not a duplicate). |
| M6-j | Met | `footer?.text?.trim()`. A sweep shaped by the class found no other unguarded read of a required embed field in the editor, utils or preview. |
| M6-k | Met | `innerKey === undefined` deletes the whole entry; `delete(k, 0)` deletes the inner key. |
| M6-l (i) | Met | The add cells from 39 and the container-duplicate cell; nested adds never read the total. |
| M6-l (ii) | Met | `validateMessage` → `validateComponentCount`, one literal shared with the editor line. The cells use literal totals 41 and 44. |
| M6-l (iii) | Met | One definition in `limits.tsx`, with a structural parameter. Its body is the `7ce866b` body apart from casts. The seven "offers adds only below the limit" cells, nested members included, pass at both trees (`m6l-first-run.txt` lists none of them as failing), so the editor's count is the same before and after the lift. |
| M6-l (iv), (v) | Met (stated limit; nothing sent) | — |
| M6-l (vi) | Met | The line sits beside `v2TextError` in the same ungated block, and the border joins the same `errorBorder` key. The not-editing cell shows both. `/preview` crash set: re-run, see below. |

### Probe: `/preview` at `24ac49f`

`cr-m5-probes/run-real.sh` was re-run at `24ac49f` (`real-run5-24ac49f.txt`). The crash set matches run 4 at `da24eb7` exactly: `{"embeds":""}` and `{"embeds":[{"fields":""}]}` still throw, which is CR-18 and still held. `{"components":[null]}` and the type-17 null child still render, so the new counter on the render path adds no crash member. `{"embeds":[[]]}` drops from 19 to 17 nodes, which is M6-c hiding an empty embed.

### Measured: the code-block regex cost

`cr-m6-probes/codeblock-regex-timing.mjs`, run on node 24.14.0, on input "```a" followed by N newlines:
- the old regex took 15.3 ms at N=4096 and 5.5 s at N=80000;
- the new regex took 24.5 ms at N=4096 and 8.9 s at N=80000.

The other input shapes stay under 1 ms. The quadratic cost was already there, and the change multiplies it by about 1.6. No finding.

### Architecture Alignment

ALIGNED. One counter, lifted and not copied (AF-4's destination). The validator sits beside its siblings (AF-24). `MAX_TOTAL_COMPONENTS` moves to `messageLimits.ts` and is re-exported by `constants/index.ts` (`export * from './messageLimits'`), so no importer changes. No dependency moved.

### TDD Compliance Check

- The table is present, with 19 rows. The three "No" rows (M6-g, M6-i nested, M6-l (i)) are controls, each closed by a named killed mutant (`m6-sweep-summary-4fbc920.txt`, `-ef5a9cc.txt`).
- Expected values are literals throughout: counts, the error text at 41 and 44, hex strings and code text.
- The `ResizeObserver` stub in `DiscordMessageEditor.component-limit.test.tsx` is present but inert. No assertion rests on it firing: the asserted paths are a click and `setMessage`, and Headless UI positioning is never asserted. It is the first such stub in the suite (`git grep ResizeObserver` finds 1 test file). Under the environment-fidelity convention, this gives no finding.
- The child-stub idiom (`vi.mock` of `ComponentEditor` recording props) asserts the real parent's `setMessage` output and never the stub's own behaviour.
- `node ~/.claude/tools/convention-check.js website --since=da24eb7`: 40 files, 22 test files, 0 FAIL, 0 CANDIDATE, 1 SKIP (the id-token and basename rule). I ran that rule by hand over the 22 files, covering basenames, titles and comments, with a positive control firing on a planted line. It gives 4 hits, all ISO timestamps used as fixture data, which is the named exemption.
- There is no real-time wait. `Author` and `formatMessageDate` use fake timers.

### Round 14 findings

**CR-22 MEDIUM Round 14 Property unmet**: a fenced block with an empty or whitespace-only line inside does not render as a code block
- **Location**: `staticBaseRules.codeBlock.match` (`SimpleMarkdown.inlineRegex`) and `staticBaseRules.paragraph` in `src/utils/markdown/rules.tsx`, reached through `parseContent` and `parseEmbedField`, at `24ac49f`.
- **Class**: a fenced block whose content includes an empty or whitespace-only line. That makes it a member of M6-a's "every fenced block … 1 to N content lines". The fence is matched only in inline scope, inside a paragraph that the paragraph rule has already ended at that line.
- **Enumeration**: `verification/015/cr-m6-probes/run-fence.sh`, run 1 at `24ac49f`. Five members times two parsers give 10 of 10 with no code block. The probe's third column falls back to `parseContent`, because no `parseEmbedDescription` exists, so it repeats the first. Both controls hold.
  - Not seen by the probe: the interactive (editing) parser, whose rule is a different one; CRLF line ends; and other member shapes.
- **Issue**: Outstanding Item 2 of the implementation document records this as "not in the plan", because the mechanism differs. The criterion is a property over every fenced block, and the mechanism does not decide which blocks belong to it.
- **Required Action (implementer, blocks M6-a)**:
  - Preferred (structural): match the fence at block scope, ordered ahead of the paragraph rule, so the paragraph rule can never split a fence. Then one rule decides a fence in every parser that includes it.
  - Minimum: none narrower meets the property.
  - Cells: an empty line and a whitespace-only line inside the fence, with and without a tag, in both parsers. The expected code text is a literal. Falsity signature: the new cells are red at `24ac49f`, as run 1 of the probe already is.
  - The other remedy is the planner's alone: narrow M6-a's property through steering, with an Exclusions row.

**CR-23 LOW Round 14 Criterion contradicts construction** (planner): M6-a names `parseEmbedTitle`, which leaves out the code-block rule by design
- **Location**: `parseEmbedTitle`, static and interactive (`omit(…, ['codeBlock', 'heading', 'list'])`), in `src/utils/markdown/index.tsx`; plan § M6-a.
- **Class**: a criterion member that names a parser built without the rule the criterion is about.
- **Enumeration**: `git grep -n "omit(" 24ac49f -- src/utils/markdown/index.tsx` gives 4 lines, and the 2 `parseEmbedTitle` lines are the ones that omit `codeBlock`. It cannot see a rule left out by any other construction.
- **Required Action (planner)**: restate M6-a's title member, either dropped or as "a title renders no code block", and align QA Phase 1's wording. The implementer's control cell then becomes that member's spec. Until the restatement, the title limb is unassessed.

**CR-24 MEDIUM Round 14 Class not eliminated (D28)**: two react-use `useMount` callbacks return cleanups that never run
- **Location**: `BottomPortal`, `useMount(() => () => { setChildrenProps(…) })`, in `src/components/BottomPortal.tsx`; and `ColorPickerWrapper`, `useMount(() => () => removeBlockStyle())`, in `src/components/DiscordMessageEditor/components/EmbedEditor/ColorPicker/index.tsx`, at `24ac49f`.
- **Class**: a cleanup returned from a react-use `useMount` callback. react-use 17.4.0's `useMount` runs `useEffectOnce(function () { fn(); })` and discards the return (read in `node_modules/react-use/lib/useMount.js`). The implementer widened F-45 to exactly this class (Implementation Summary, M6-e).
- **Enumeration**: `verification/015/cr-m6-probes/usemount-cleanup-sweep.sh` at `24ac49f` finds 6 call sites, one of them commented out, and 2 concise-form members; its positive control gives 1.
  - The implementer's predicate (`grep -A12 'useMount(' | grep -E 'return \(\) =>|return clear'`) cannot see the concise form. Its "0 hits, residual 0" is therefore a false negative.
  - Neither predicate sees a callback passed by reference or an aliased import.
- **Effect** (an unmeasured hypothesis; not driven): if the colour picker unmounts while open, `overflow-hidden` stays on `<html>` and the page cannot scroll. If a `BottomPortal` unmounts, its entry stays in the parent list. It is not established which UI path unmounts the picker while it is open.
- **Required Action (implementer)**: D28 brings both sites into scope without asking the owner.
  - Preferred (structural): replace them with `useEffect(…, [])` and add a lint rule that stops a `useMount` callback returning a function, for example `no-restricted-imports` on react-use's `useMount`.
  - Minimum: fix the two sites in the same way as `Author`, each with a cell that is red at `24ac49f`: after unmount, the `<html>` class or the portal entry is still there.
  - Correct the F-45 row of the Class Sweep.
- **Pattern note**: this is the second sweep false negative on this chain where the predicate followed the flagged site's spelling. The first was CR-8 (Round 3, the colour sweep missing `Picker.tsx`).

**CR-25 LOW Round 14 Record**: the implementation document's Plan Reference says revisions 22 to 24 "touch M5-h only"
- **Location**: § Plan Reference of `implementation/015-bug-evaluation-fixes-m6-implementation.md` (`eef8924`).
- **Class**: a stage document stating a plan revision other than the one whose criteria its code meets. Rev 22 added M6-l (vi) (D32), and rev 23 added (ii)'s one literal and (vi)'s `/preview` limb (D33), according to the plan's Reading Order rows. The code meets rev 24.
- **Enumeration**: cannot enumerate across documents; this document has 1.
- **Required Action (implementer)**: one dated reconcile note naming rev 24 as the revision M6-l was built to.

### Round 14 verdict

REJECTED for M6-a (CR-22) and for F-45's class under D28 (CR-24). M6-b to M6-l are met, M6-e as stated. QA Phase 2 may take M6-b to M6-l at `24ac49f`. The fixes are reviewed as a sub-entry of this round.

### Round 14 sub-entry (CR-22, CR-24, CR-25; website `476c633`, fixes `9cc06d8` and `4aa9d3a`)

- **Scope.** `rules.tsx`, `BottomPortal.tsx`, `ColorPicker/index.tsx` and `.eslintrc.json`, with their cells, read as the fix diff. `b608555` (QAF-30 to QAF-32) is test-only and QA's gate; its convention check gives 0 FAIL.
- **CR-22 RESOLVED.** The paragraph rule now takes a whole fence as one unit, from the same `FENCE` pattern the code-block rule uses.
  - `cr-m6-probes/run-fence.sh` run 2 at `476c633`: every member renders a code block, and the plain-text control does not.
  - Re-attacked with a structure probe on both trees (`run-structure.sh`, `structure-run1-24ac49f.txt` and `-476c633.txt`). It records the blocks rendered and the text outside them, not just whether a code block appears.
    - Every member renders one block with its inner text exact, including CRLF.
    - Two fences stay two blocks, and the text around a fence stays outside it.
    - A stray fence in each of two paragraphs now becomes one block spanning them. Discord has no paragraphs, so this matches its rendering. It is noted for QA's RK-1 differential.
    - The parse cost of 4000-character adversarial inputs at the tip is at most 80 ms, against 53 ms at `24ac49f`.
  - The cells add seven literal members. The check that fails if it returns: `rules.multi-line-code-block.test.ts`.
- **CR-24 RESOLVED.** Both sites use `useEffect(() => cleanup, [])`. `usemount-cleanup-sweep.sh` at `476c633` finds 0 members, and its positive control gives 1. The checks that fail if it returns: `ColorPicker.scroll-lock-release.test.tsx` and `BottomPortal.unmount-cleanup.test.tsx`.
- **CR-25 RESOLVED.** The dated reconcile note is in the M6 implementation document.

**CR-26 LOW Round 14 (sub-entry) Guard narrower than its class**: the new `no-restricted-syntax` selectors catch a returned function literal only
- **Location**: `no-restricted-syntax` in `.eslintrc.json` at `476c633`.
- **Class**: a `useMount` callback that returns a function, in any spelling.
- **Enumeration**: `cr-m6-probes/usemount-lint-planted.tsx`, 9 planted forms linted over stdin with the repo's config, which is the same file as at `476c633` (`usemount-lint-planted-476c633.txt`). It flags 3 of the 8 members: a concise arrow, a block `return` of an arrow, and a function expression. It misses 5:
  - a returned identifier, concise and block (`() => cleanup`);
  - an aliased import;
  - a namespace call (`ReactUse.useMount`);
  - a callback passed by reference.
  The non-member control is not flagged.
- **Required Action (implementer, non-blocking)**: Preferred (structural): `no-restricted-imports` for `useMount` from `react-use`. Only 3 live callers remain and none returns, so they move to `useEffect(…, [])` and the class becomes unrepresentable. Minimum: keep the selectors and state their blind spots beside the rule in the record. The falsity signature for a replacement rule: the planted file's 8 members all flagged, and the control not.

## Round 13 (plan gate read, rev 24, agent-output `018f72d`; mechanisms at website `da24eb7`)

- **Scope.** The plan delta `39dbc0d..018f72d`, written to a file and read in full. It covers:
  - the CR-21 fold (M5-h's type-12 member, X-19 restated, the presence rule);
  - M4-d's webhook-load limb naming the non-JSON response (L-C5-1);
  - M5-i (new, D28);
  - D34 with X-20 and its handoff, and X-21;
  - the `NewMessageModal` Planner batch row.
  The website chain tip has moved to `24ac49f` (M6, plus `a665901`, which by its subject takes CR-17 and CR-19). None of that is handed off, and none of it is reviewed here.
- **CR-21 MEDIUM Round 12 RESOLVED.**
  - The type-12 non-array `items` member is in class (3), citing my reads. X-19 drops the blank-render class and names a detection owner.
  - Verification now counts a "rendered" read only with the editor present, reads an emptied root as a crash, and requires each cell to assert that its outcome is present.
  - Check that fails if it returns: the M5-h cells, under that presence rule. `cr-m5-probes/run-reported.sh` re-runs the read.
- **M4-d, failed webhook-URL load (L-C5-1): no finding.** The added member holds at `da24eb7` at both sites:
  - Dialog: `useValidateWebhook`'s webhook effect awaits `res.json()`, so a non-JSON body rejects into the catch, which sets `'Invalid URL'`.
  - Send page: `WebhookProvider`'s fetch maps a non-200 to `null`, and a 200 with a non-JSON body rejects into `.catch(() => null)`. Either way `selectedWebhook` stays `null`, and M4-b shows "Invalid URL".
  - **Growth on M4, recorded:** the non-JSON member is new criterion text since Round 7. The cells at `da24eb7` drive a network rejection and a JSON refusal, not a non-JSON body. Its cell is the implementer's, and its adequacy is QA's at the M4 re-run.
- **M5-i: no finding.** The mechanism holds at `da24eb7`.
  - `WebhookMenu` seeds `selectedCategory` once: `useState(hasWebhooks ? (guild?.id ?? '') : 'load')`.
  - The accordion is controlled: `StyledAccordion` passes `dangerouslySetExpanded={selected ? item.id === selected : undefined}`, so updating `selectedCategory` re-opens the right panel without a remount. The property can be built.
  - A user's pick arrives through `onChange={setSelectedCategory}`, so "until the user picks" has a distinct path to key on.
  - The cited probe commit `ef5a9cc` is on the chain branch.
  - Residue X-21 is stated.
- **D34 / X-20: no finding.** No code; its handoff and reopen trigger are stated. X-21 is the M5-i residue. The `NewMessageModal` row prices its disposition in advance (M5-j or an Exclusions row), with a browser read under steering-coordinator's go.

### Round 13 verdict

APPROVED. CR-21 is RESOLVED, and the rest of the delta raises no finding. M5-h's code stays REJECTED under Round 10 until the implementer's fix.

## Round 12 (plan gate read, rev 23, agent-output `39dbc0d`; mechanisms at website `da24eb7`)

- **Scope.** The plan delta `5201612..39dbc0d`, written to a file and read in full: M5-h (3) restated as the real page's crash set, with its members and X-19 (CR-20, M-C6-1, QAF-28, AF-23); M6-l (ii) shares (vi)'s literal (AF-24); M6-l (vi) on `/preview` (D33). I read the planner's and the critic's probe outputs that the plan cites.
- **Evidence process.** My instrument is `verification/015/cr-m5-probes/page.reported-error-probe.test.tsx`, driver `run-reported.sh`. It runs the real page and editor, waits for Suspense, and records any `window` error event or `console.error` beside the outcome, so it can see a render error that React reports without rethrowing.
  - Run 1 (`reported-run1-da24eb7.txt`): positive control 18 nodes; throwing control `{"embeds":""}` throws.
  - Run 2 (`reported-run2-da24eb7.txt`): the same rows with the suspect row first, to test order dependence. Same outcomes.
  - Run 3 (`reported-run3-da24eb7.txt`) settles the error-boundary premise. The one boundary at `da24eb7` is `components/ErrorBoundary.tsx` (`react-error-boundary`), which wraps `DiscordContentEditor` only. `git grep -c` lists 2 files, and no `error.tsx` exists under `src/app`. A crash inside it would render a "Something went wrong:" fallback and pass for a render. All 12 members the plan lists as rendering render the full editor (17 to 25 nodes) with no fallback text; the controls behave as expected. The predicate is text-based, so it would miss a fallback with other text.
- **CR-20 LOW Round 11 RESOLVED.** Class (3) is now a property: the inputs the real page crashes on at `da24eb7`. Membership is decided by an executed read, never by reading source, so the `""` members and the editor-render members fall inside by construction. The four members I left open are stated as rendered, which matches my real run 4. X-19 is re-cited. Check that fails if it returns: the M5-h cells, one per listed member, with the literal outcome its read records.
- **Members re-checked against the cited reads.** Every row in the planner's `m5h-class-probe/run1-da24eb7.txt` that records "rendered" shows the full editor (17 to 25 nodes; the positive control has 18), except one. Every row the plan lists as crashing records a throw in the planner's run, the critic's run, or my runs.
- **M6-l (ii): no finding.** The one-definition claim holds at `da24eb7`. `validateMessage` (`limits.tsx`) calls `validateEmbedCharacterCount` and `validateDisplayableTextCount`, the same validators the editor's two error lines call (`DiscordMessageEditor/index.tsx`).
- **M6-l (vi), D33: no finding.** `/preview` mounts `DiscordMessageEditor` directly, and that editor's `v2TextError` line and `errorBorder` are independent of editing mode (Round 11). So the over-40 line reaches `/preview` and its preview image the same way the text-length errors do.

**CR-21 MEDIUM Round 12 Plan text, M5-h X-19**: a crash member is recorded as "renders blank without throwing" and left out of the class
- **Location**: plan § M5-h, "Residue (X-19)", second class, and Exclusions row X-19, at rev 23 (`39dbc0d`): "`{"components":[{"type":12,"items":"x"}]}`, 0 nodes. It is neither crashing nor in the class, and is unchanged." The source read is `verification/015/m5h-class-probe/run1-da24eb7.txt`, row 46.
- **Class**: An outcome recorded from a probe row whose observed state is the crash signature (the page root emptied to 0 nodes) but whose error did not surface as a throw. As a result, a crash member is classed as a render.
- **Enumeration**:
  - Rows in the cited reads with a render outcome below the positive control's node count: `m5h-class-probe/run1` has 1 (row 46, 0 nodes), and the critic's `run4` has 0. That is 1 member.
  - My run of that member with the real page and editor throws "gallery.items.map is not a function", in both orders (`reported-run1-da24eb7.txt`, `reported-run2-da24eb7.txt`). The `Array.isArray` guard in `injectComponentKeys` lets a string `items` through `makeEditable`, and the media-gallery renderer then calls `.map` on it.
  - Blind spot: the predicate (node count below the positive control) cannot see a crash inside a subtree that an error boundary replaces with fallback content. The one boundary (around `DiscordContentEditor`) was checked in run 3: no member the plan lists as rendering shows its fallback.
- **Issue**: The plan's property says every crash member is refused. X-19 says this member is not a crash, and that it stays unchanged. These cannot both hold. Read as written, the guard need not cover the member, and any cell built from the read's literal ("unchanged") would pin a crash (Axiom D). This is the CR-18 class again: a crash member left unrefused, inside the limb that claims to remove it: MEDIUM.
- **Required Action (planner)**:
  - Move `{"components":[{"type":12,"items":"x"}]}` (a type-12 `items` that is not an array) into class (3)'s crashing members, citing `reported-run1-da24eb7.txt`.
  - Delete X-19's "renders blank without throwing" class, which now has no read member. Or keep it only as unmeasured, with the 0-node signature stated as a crash, not a render.
  - State in Verification that a read's "rendered" outcome counts only when the editor is present (at least the positive control's node count). Each cell asserts the presence of its outcome, the error line's text or the editor's own content, never only the absence of a throw. A root that silently unmounts then fails the cell.
- **Implementer** (when building M5-h): the same presence assertion. A cell that only checks that `act` did not throw cannot fail on this member.

### Round 12 verdict

REJECTED for M5-h's residue text (CR-21 MEDIUM, planner). The rest of the delta is approved, including M5-h's property restatement (CR-20 RESOLVED), M6-l (ii) and M6-l (vi)/D33.

## Round 11 (plan gate read, rev 22, agent-output `5201612`; mechanisms at website `da24eb7`)

- **Scope.** The delta `3d193f9..5201612`, written to a file and read in full: M5-h restated over classes (1) to (3), with X-19 as residue (D31, D28, CR-18); M6-l (vi) (D32); and the rest of the delta (the owed-re-verdict row, the changelog rows, D31 and D32's registrations).
- **Evidence process.** I checked the plan's mechanism claims against website `da24eb7` with `git show` and `git grep`, and executed two instruments in exports (`git archive`, `unshare -rn`). Both are in `verification/015/cr-m5-probes/`.
  - **`makeEditable` alone:** `makeEditable.edge-probe.test.ts`, driver `run-edge.sh <website> <scratch> <sha> <out>`. Only `~/env.mjs` is mocked. Two rows are controls; the rest record what they observe.
    - Run 1 is invalid: the env guard loads through `~/utils`.
    - Run 2 is invalid: it recorded nothing.
    - Run 3 (`edge-run3-da24eb7.txt`): 18 rows, both controls as expected. The export's blob of `utils/index.ts` equals the tree's (`702f8fa`).
  - **The real page with the real editor:** `page.real-editor-probe.test.tsx`, driver `run-real.sh`. Only `~/env.mjs` and `next/navigation` are mocked. It waits 20 ticks of 25 ms for Suspense to settle.
    - Run 1 is invalid: an incomplete `MarkdownProvider` mock, caught by the positive control.
    - Runs 2 and 3 are superseded: run 2 did not wait for Suspense (its positive control showed 1 node); run 3 is a subset of run 4.
    - Run 4 (`real-run4-da24eb7.txt`): 9 rows. Controls as expected: `{"content":"hello"}` renders the editor (18 nodes, its header text), and `null` shows the error line.
- **M5-h (1) and (2): no finding.** They match what was built and D31.
- **M5-h (3): CR-20 LOW.** These listed members are crash members at `da24eb7`, by execution:
  - in `makeEditable` (edge run 3): `embeds` 5, 0 or `false`; an `embeds` element that is `null` or a string; `components` truthy and not an array; a type-1, 9 or 12 child that is `null`, including one inside a type-17 container;
  - in the editor's render (real run 4): `{"embeds":""}` ("embeds.reduce is not a function") and an embed with `"fields":""` ("embed.fields?.reduce is not a function"), both in `src/utils/limits.tsx` `validateEmbedCharacterCount`.
- **M6-l (vi): no finding.** The mechanism claims hold at `da24eb7`. I read the border too, which the planner says it did not.
  - `DiscordMessageEditor` renders `v2TextError` as `mt-1 text-xs font-semibold text-error` below the `discord-visualizer__accessories` block, and that block takes `styles.errorBorder` when `embedCharacterError || v2TextError`. Neither depends on editing mode.
  - The Send page renders the editor through `MessagePreview` → `dynamics/DiscordMessageEditor`, so the same line and border reach it.
  - `canAddComponent = totalComponentCount < MAX_TOTAL_COMPONENTS` (40), so the button hides at 40 and over.
  - The cell requirement of literal text for two totals (41 and higher) is discriminating against a fixed or off-by-one count.

**CR-20 LOW Round 11 Plan text, M5-h class (3)**: the list is right about which inputs crash, but it cites the wrong source for two members and leaves four members' outcomes open
- **Location**: plan § M5-h (3) and X-19 at rev 22 (`5201612`). Code at `da24eb7`: `src/utils/index.ts` `makeEditable` and `injectComponentKeys`, and `src/utils/limits.tsx` `validateEmbedCharacterCount`.
- **Class**: A refused set defined as "what function F cannot process, read from F's source", whose crash set is in fact the union of F and a second reader. As a result, the stated basis misdescribes the residue's boundary, and members the list words ambiguously have no settled outcome.
- **Enumeration**: 16 edge members run through `makeEditable` alone (edge run 3), and 7 through the real page (real run 4):
  - **Listed, and they do crash, but not in `makeEditable`:** `{"embeds":""}` and an embed with `"fields":""`. `makeEditable` processes both (`?? []` lets `""` through), but the editor's render throws in `validateEmbedCharacterCount`. So the list is right, and "read from its source" (`makeEditable`) is not its basis. A predicate of "`makeEditable` throws" would leave both crashing.
  - **Open in the plan, and they render at `da24eb7` (real run 4):**
    - an `embeds` element that is an array;
    - a `fields` element that is an array;
    - a type-1 child that is an array (whether arrays are "not an object" reads either way);
    - a type-17 container's direct child that is `null` ("a type-17 container's children are the same class, recursively" also reads either way).
  - **X-19 cites my stubbed run.** It quotes `run1-da24eb7.txt`'s "editor:undefined", which came from a stubbed editor. Real run 4 now shows that `{"components":[null]}` does render under jsdom with the real editor (18 nodes), so the claim holds, but on that run, not on the one cited.
  - Blind spots: my members are hand-picked edges. The editor's full read set (each component type's renderer) is not enumerated. That is X-19.
- **Issue**: The four open members have no literal outcome the plan settles, and both outcomes avoid a crash: LOW.
- **Required Action (planner)**:
  - State (3)'s basis as the inputs the page crashes on at `da24eb7`: in `makeEditable`, or in the editor's render (`validateEmbedCharacterCount` for `""` `embeds` and `fields`). Keep the list. Do not restate it as "`makeEditable` throws".
  - State the four open members as rendered. That keeps "every other `data` renders as at `da24eb7`" true. Word element members as "`null` or not an object or array", or name arrays explicitly.
  - Re-cite X-19 to `real-run4-da24eb7.txt`.
  - The cells' falsity signature: an array element and a type-17 `null` direct child, each expected to render, so a guard that refuses extra inputs fails; and `""` `embeds` and `fields`, each expected to show the error line, so a guard built on `makeEditable` alone fails.

## Round 10 (M5, website `da24eb7`, plan rev 21)

### Scope and identity

- **Tree.** website `da24eb7`, the M5 `Handoff-At`, re-derived from `implementation/015-bug-evaluation-fixes-m5-implementation.md` at `40ece24`. The chain tip was `da24eb7` at the start and the end of the review, and the shared tree was clean (`git status --porcelain`: 0 lines). Files were read with `git show da24eb7:<path>`, and the diffs of `23a621e` and `da24eb7` were written to files and read in full.
- **Criteria recorded at round open:** plan § M5 at rev 21 (`3d193f9`; the plan's last commit, `daa9012`, is a Planner batch row and changes no criterion): M5-a to M5-h.
- **Growth, recorded, not absorbed.** Two rulings blocks are not in the plan yet; the planner registers them:
  - 07:30Z "M5 flow questions" (`a49da66`): M5-h's error line; M5-f's reset on open; and steering's call that valid JSON of the wrong shape rides M5-h under D28 if a probe shows it crashes.
  - 07:52Z (`c1be05e`, which landed during this round): every non-object value shows the error line, as built.
- **Evidence process.**
  - Production limbs: the diff, the sites re-read at `da24eb7`, and my probe of `/preview` (below).
  - TDD: the implementer's first-run reds and mutant summaries (`m5-sweep-summary-6c42032.txt`, `m5-sweep-summary-da24eb7.txt`), read but not re-run (QA's sweep).
  - Conventions: `convention-check --since=7ce866b` in the shared tree at `da24eb7` (`cr-m4r-m5-convention-check-da24eb7.txt`), plus the ID-token check by hand.

### Per-limb result at `da24eb7`

| Limb | Result | Basis |
|---|---|---|
| M5-a | Met | `commitLoad` calls `setAllowMenuClose(true)` before `onClose()`, as `onCancel` and `cancelChoice` already did. Its two earlier returns (`!validatedDraft`; `requiresChoice`) cannot be reached from the confirm: Load is disabled without a validated draft, and the validation effect never sets a draft that requires a choice. The cells assert the flag (Outstanding item 2). The Esc keypress is Round 10's Assumption Not Checked. |
| M5-b | Met | Copy is `isDisabled` when `toCopyText` returns `null` (a parse failure or an import-shape failure), and `onPress` copies the precomputed text. Cells cover a not-JSON draft and a non-conforming one, each pressed with no throw. |
| M5-c | Met; CR-19 | The prompt reads `hasChangedRef.current` when the event arrives. The subscription's dependencies are unchanged. |
| M5-d | Met | The `useMemo` dependencies are `[session, setSelectedGuildId]`, which is every value the memo reads. |
| M5-e | Met | One shared `formatMessageDate` compares year, month and day, and both copies call it. `getDate()` outside it: 0 hits. The duplicate is removed rather than fixed twice, as the mirror rule asks. |
| M5-f | Met (the owner's "reset on open") | An effect on `isOpen` refills the name and server when the dialog opens. The survivor `m5f-save-as-refills-on-close-too` differs only during the leave transition, which jsdom does not render. Keeping the guard is right: no finding. |
| M5-g | Met | The toast text. `Failed to refresh` has 1 hit left, in `useApiMethods.ts`, which is the real reload failure. |
| M5-h | **Not met for the ruled class (CR-18)** | Unparsable JSON and every non-object value show "Invalid message data." (as ruled at 07:52Z). A JSON object of the wrong shape still crashes the page: see the probe below. |

### Probe: `/preview` with JSON objects of the wrong shape

- **Whose output is the evidence:** the real `Page` and the real `makeEditable` at `da24eb7`, run under vitest's DOM project in an export (`git archive`, `unshare -rn`). Only `DiscordMessageEditor` and `MarkdownProvider` are stubbed. The crash happens in `makeEditable`, before the editor. I did not test how the real editor handles an object that passes `makeEditable`.
- **Instrument:** `verification/015/cr-m5-probes/page.wrong-shape-probe.test.tsx`, driver `run.sh <website> <scratch> <sha> <out>`. Run 1 is `run1-da24eb7.txt`. The export's blob of `page.tsx` equals the tree's (`0e3fc49`).
- **Controls:** `{"content":"hello"}` renders the editor with `hello`, and `null` shows the error line. Both pass.
- **Result: 4 of 5 crash.**
  - `{"embeds":5}` throws "number 5 is not iterable".
  - `{"embeds":[null]}` throws "Cannot read properties of null (reading '_key')".
  - `{"embeds":[{"fields":5}]}` throws.
  - `{"components":"x"}` throws "casted.data.components.map is not a function".
  - `{"components":[null]}` passes `makeEditable` and reaches the editor stub. What the real editor does with it is unknown.
- **Why the implementer's probe missed it:** `m5h-preview-data-probe-6c42032.txt` samples the object class with `{}` only. Its positive control also prints `rendered: ` with no text, so its "rendered" lines don't show that the editor ran.

### Architecture Alignment

ALIGNED. One date formatter replaces two copies (the one-definition pattern, A-3). No new dependency. One departure from the repo's idiom: CR-19.

### TDD Compliance Check

**TDD Table Present**: Yes. **All Rows Complete**: Yes.
- **Ordering is disclosed.** The two date-wiring rows were written after the rewiring, and their reds are named stand-in mutants. Every limb from M5-a to M5-h has a first red against the unchanged code (`m5<letter>-red-first-run.txt`).
- **Expectations are independent.** They are literal texts ("Error. Failed to delete message. Please try again.", "Invalid message data.", "Any changes you have made will be lost.", `'{\n  "content": "hi"\n}'`), fixed instants under fake timers, and guild keys written as literals. None is derived from the code under test.
- **Mutants.** 25 runs at `6c42032`, 23 killed. Both survivors are dispositioned:
  - One guard was removed in `da24eb7`. That removal preserves behaviour: `typeof null === 'object'`, so `null` still returns `null`, and the null cell stays.
  - The other is equivalent under jsdom (M5-f, above).
  - The 5 preview mutants are killed again at `da24eb7`.
- **No bug-form test.** Every title states a behaviour.
- **Conventions.**
  - convention-check: 0 FAIL, 0 CANDIDATE. Its SKIPs are the id-token basename check (no `TEST-CONVENTIONS.md`, so I ran it by hand) and two non-source paths.
  - ID-token check by hand over the 16 test files changed since `1e12837`: 8 hits, all the fixture id `'m1'` in `auth.hydrated-session.test.ts`, which the named data exemption covers. Basenames, titles and comments: 0. A planted `it("cr-12 rider")` fired.
- **Sweep reconciliation (no finding).**
  - The implementer's `JSON.parse` sweep says "10 hits" but lists 9. `git grep -c` at `da24eb7` gives 9 (3 + 4 + 1 + 1).
  - The close-flag sweep says "6 files". `git grep -c` gives 17 lines in 5 files.
  - Every hit I counted is dispositioned in its row.

### Round 10 findings

**CR-18 MEDIUM Round 10 Unhandled input class, M5-h**: a `/preview` link whose `data` is a JSON object of the wrong shape still crashes the page
- **Location**: `src/app/preview/page.tsx` `parseMessageData` and `Page` (`makeEditable({ data } as ApiMessage)`), and `src/utils/index.ts` `makeEditable`, at `da24eb7`.
- **Class**: Data from a URL reaches code that dereferences its fields, and only its JSON type is checked, not the shape of the fields that code reads.
- **Enumeration**:
  - The fields `makeEditable` dereferences: `data.embeds` (iterated), each embed (`_key`), `embed.fields` (iterated), each field (`_key`), `data.components` (`.map`), and each component (spread, then `.type`). My probe shows 4 crashing members (above).
  - Callers of `makeEditable` (`git grep -n "makeEditable(" da24eb7 -- src ':!*__tests__*'`): 8. Only `preview/page.tsx` takes its argument from a URL. The other 7 take stored data, schema-validated data or Discord API data.
  - Blind spots: the predicate cannot see a second URL-to-render path that does not call `makeEditable`. It also does not test what the real editor does with an object that passes `makeEditable`.
- **Issue**:
  - Steering ruled at 07:30Z (`a49da66`) that valid JSON of the wrong shape is the same defect on the same page, and that it rides M5-h under D28 if a probe shows a crash. The implementer's probe found only `null` because it tried a single object, `{}`.
  - The owner's 07:52Z ruling (`c1be05e`) settles non-object values, and it rests on that probe. It does not cover objects, so this finding does not conflict with it.
  - The crash is a blank page for a hand-made link, so user impact is low. But the ruled class is not met, and the behaviour M5-h claims ("an error state, not a crash") has no cell for any object member: MEDIUM.
- **Required Action (implementer)**:
  - **Minimum:** `parseMessageData` refuses an object unless every field `makeEditable` reads has the shape it reads: `embeds` absent or an array of objects; each embed's `fields` absent or an array of objects; `components` absent or an array of objects.
  - **Preferred (structural):** validate `data` against a schema before `makeEditable`. If the full save schema (`discordMessageShape`) is chosen, first check that the links the generator (M8) builds from stored messages still pass it, because data saved under an older schema may not. A guard narrower than the full schema is acceptable if it covers exactly `makeEditable`'s read set.
  - **Cells:** one per field `makeEditable` reads. In each cell the bad member sits beside valid fields, not as the only key. Each cell fails if the page throws or renders the editor. Falsity signature: a guard that checks only `embeds` fails the `components` and `fields` cells.
- **Planner:** register the wrong-shape class and the 07:52Z non-object ruling in § M5-h. The plan text says only "not parsable JSON".
- **QA and UAT:** whether `{"components":[null]}` breaks the real editor is untested here.

**CR-19 LOW Round 10 Pattern departure**: `usePusher` hand-rolls a latest-value ref where the repo's idiom is `react-use`'s `useLatest`
- **Location**: `src/providers/MessageProvider/usePusher.ts` `hasChangedRef` (`useRef(hasChanged)`, plus `hasChangedRef.current = hasChanged` in render), at `da24eb7`.
- **Class**: A ref kept equal to the latest prop or state by hand, where `useLatest` already does that.
- **Enumeration**:
  - `git grep -n useLatest da24eb7 -- src ':!*__tests__*'` gives 17 production sites. One is `MessageProvider/index.tsx`'s `messageRef = useLatest(message)`, the ref passed to this same hook.
  - Hand-written ref syncs in render (`git grep -nE "Ref\.current = [a-zA-Z]+;"`, read by hand): 3. They are `usePusher.ts` (new), `DiscordMessageEditor/index.tsx` `messageRef` and `GuildProvider.tsx` `guildIdRef`. The last two are pre-existing and not part of this change.
  - Blind spots: the predicate cannot see a sync written in another expression form, or one inside an effect.
- **Issue**: The implementer's flows table names no pattern for the ref. A hand-written sync is the same mechanism spelled differently, so the repo now has a second idiom for it. Behaviour is the same either way.
- **Required Action (implementer, non-blocking)**: `const hasChangedRef = useLatest(hasChanged);`. The two pre-existing sites are outside this change and not owed here. The existing cells stay the check: `m5c-pusher-ref-never-updated` is killed by them.

### Round 10 verdict

REJECTED for M5-h only (CR-18 MEDIUM). M5-a to M5-g are met. CR-19 is LOW and non-blocking. QA Phase 2 may take M5-a to M5-g at `da24eb7`. M5-h waits for its fix, which will be a sub-entry of this round.

### Round 10 sub-entry (CR-19, website `24ac49f`, fix `a665901`)

- **Sweep, re-run**: `git grep -nE '[A-Za-z]+Ref\.current = [A-Za-z]+;' 24ac49f -- src`, read by hand (`verification/015/cr-m6-probes/cr17-cr19-sweeps-24ac49f.txt`). `usePusher` no longer appears. The syncs that remain in render are `DiscordMessageEditor` `messageRef` and `GuildProvider` `guildIdRef`, which predate this change and are not owed. The other hits are assignments of literals or flags, not latest-value syncs.
- **Disposition**: CR-19 RESOLVED. The check that fails if it returns: `usePusher.update-prompt.test.tsx` kills `m5c-pusher-reads-render-flag` and `m5c-pusher-ref-never-updated` (`m5-sweep-summary-ef5a9cc.txt`).

### Round 10 sub-entry (M5-h fix, CR-18; website `476c633`, fix `09c7c45`, cells `a1456c9` and `476c633`)

- **The fix.** `parseMessageData` runs `JSON.parse`, the object test and `makeEditable` inside one `try`. The editor is wrapped in `react-error-boundary`'s `ErrorBoundary`, whose fallback is the same one line, on the same background.
- **Re-attacked from first principles**, against the real editor at `476c633`:
  - The planner's class probe (`m5h-class-probe/run.sh`, output `cr-m5-probes/class-probe-run-476c633.txt`): 44 rows, exit 0. Every row matches the plan's lists except `{"embeds":[{"title":"t","fields":null}]}`, which renders (21 nodes) because M6-c removed its crash (CR-29).
  - `run-real.sh` run 6 and `run-reported.sh` run 4 at `476c633` agree.
  - **Members no earlier read lists**: `cr-m5-probes/page.unlisted-members-probe.test.tsx` via `run-unlisted.sh` (`unlisted-run1-476c633.txt`). It has 35 rows: other component types (10, 2, 11, 13, 14, unknown, a string type), embed sub-objects of the wrong type, and nested containers. Every row shows either the line (2 nodes) or the editor (17 nodes or more). None threw and none rendered blank, so the X-19 residue the property binds is met on everything probed.
  - That run exits 1 with all 35 passing. The cause is two unhandled rejections from `ImageUploader`'s async effect (`isValidImageUrl` on a numeric URL, from `avatar_url: 5` and `image.url: 5`). They are outside React render, so no boundary catches them, and the page still renders the editor. The base threw the same way (`url.includes`), and the save schema admits no non-string URL. It is an observation and gives no finding.
- **No reset path.** The boundary has no `resetKeys`, but nothing navigates to `/preview` on the client (`git grep` at `476c633`), so a stale error state cannot be reached.
- **Cells.** 6 non-object members, 34 refused members and 11 rendering members, each asserting that its outcome is present (CR-21): exactly one `text-error` line and no editor, or the editor root and no line. The two convention-check CANDIDATEs are `vi.waitFor` condition waits whose 5000 ms only bounds a failure. Disposition: not a time-based cell.
- **CR-18 RESOLVED.** The check that fails if it returns: `page.invalid-data.test.tsx`, plus `cr-m5-probes/run-unlisted.sh` for the members outside the list.

**CR-29 LOW Round 10 (sub-entry) Criterion member contradicts the tip** (planner): M5-h class (3) lists `fields: null` as crashing, and at the tip it renders
- **Location**: plan § M5-h class (3), "an embed's `fields` is `null`, …", read at `dd9e88a`; the cell "fields null" under "still renders the editor" in `page.invalid-data.test.tsx`.
- **Class**: a class (3) member pinned to `da24eb7`'s crash set that no longer crashes, because a later milestone fixed it. "Exactly when" then makes the plan text and the tip disagree.
- **Enumeration**: the class probe's rows at `da24eb7` (run 1) against `476c633`: 1 member moved, `fields: null`. It cannot see members outside its 44 rows.
- **Required Action (planner)**: restate class (3) membership against the chain tip's real page, or move `fields: null` to the rendering list. The tip's behaviour is the better one, so the code does not change.

## Round 9 (plan gate read, rev 21, agent-output `3d193f9`; mechanisms at website `1e12837`)

- **Scope.** The delta `e118cc3..3d193f9`, written to a file and read in full, with the ruling `f005cef`. It covers M4-d's webhook-load limb (the CR-16 fold) and D30 (M3 removed, X-18).
- **CR-16 MEDIUM Round 8 RESOLVED.** Option (a): each site's existing place. The send page uses `WebhookMenu`'s custom-URL `errorMessage`, under M4-b. The dialog uses `NewMessageModal` `messageErrorString`, the one error line below the load options, with its precedence unchanged and no field error added. The walk is reworded to match. Each cell asserts the literal at its stated place, and fails if the text appears elsewhere or nowhere. The places were re-read at `1e12837` in Round 8. The checks that fail if it returns are the implementer's two cells, confirmed at the D29 code change (a Round 7 sub-entry).
- **D30: no finding.** M3 carried no code-review limb, and none is lost. Checked:
  - The cited evidence exists: `verification/015/m3-chrome-read/README.md` at `8996505` (website `6001f7f`, Chrome 156.0.8078.47, three dialogs, cells a–d, a fresh context per cell).
  - No M3 file is on the chain branch: `git ls-tree -r` of the tip, `enter-key` → 0.
  - The dead `tagName` compare stays in the code by the owner's choice. X-18 names the residue: the uploader's Clear, a production build, and other browsers.

## Round 8 (plan gate read, rev 20, agent-output `e118cc3`) — dispositions

- CR-16 MEDIUM Round 8 RESOLVED: at rev 21 (Round 9), and met in code at `da24eb7` (Round 7 sub-entry). The checks that fail if it returns are the two `*.failed-webhook-load` cells.
- Round 8 verdict: REJECTED for the webhook-load limb, cleared by Round 9. Its argument is in the commit that carried it (`e524a96`).

## Round 7 (M4, website `1e12837`, plan rev 19)

### Scope and identity

- **Tree.** website `1e12837`, the `Handoff-At` of the M4 document (`d30916f`). Files were read with `git show 1e12837:<path>`, and the diff `6001f7f..1e12837` (15 files) was written to a file and read in full. By the end of the review the chain tip had moved to `579e8b2` (`12ac7ed`, `579e8b2`: M1-c/M1-h rebuild work, not yet handed off). That delta's `redis/index.ts` hunk touches only `fetchUserAccount`, so no M4 surface is affected. This verdict binds to `1e12837`.
- **Criteria recorded at round open:** plan § M4 at rev 19 (`330348f`): M4-a, M4-b, M4-c, and M4-d with its two sites (D28), trim, refused-input display, network text (D24), ordering, the shared constant over eight hosts (D26), `getFromUrl` by destination (CR-11), the id taken from the constant's group (AF-19), and the D27 rider (rev 19 form).
- **Evidence process.** For production limbs: the diff, plus my own attack on the real procedure (below). For TDD: the implementer's red/green captures and named mutants, which I did not re-run (QA's sweep). My instruments: `verification/015/cr-m4-probes/` (driver `run.sh <repo> <scratch> <sha> <out>`), and the convention check `cr-m4-convention-check-1e12837.txt`.

### Per-limb result at `1e12837`

| Limb | Result | Basis |
|---|---|---|
| M4-a | Met | `page.tsx` `sendMessage` wraps `sendWebhook` in `useLoading`'s `withSending`, and `isSending` is a conjunct of the Send gate. The `.catch(() => null)` cannot hide the failure: `sendWebhook` returns `toast.promise(...)`, whose error toast shows it. |
| M4-b | Met | `WebhookMenu` `errorMessage` is `url && !isWebhookLoading && selectedWebhook === null`. Sweep: `selectedWebhook !== null` gives 0 hits. |
| M4-c | Met | Clear `isDisabled={isLoading \|\| !threadId}`; no button added. |
| M4-d, two sites | Met | `WebhookProvider` `useValue` and `useValidateWebhook` both take the id from `parseMessageId`: trimmed, then `^\d+$`, or the constant's `messageId` group. The plan's predicate `\d\+/\.test` gives 0 hits at `1e12837`. Each effect has a stale flag in cleanup and a catch. Message-fetch failure shows the D24 literal at both sites. Refused input clears the message and error (QAF-22 (2)). |
| M4-d, constant | Met | `(?:(?:www\|canary\|ptb)\.)?discord(?:app)?\.com` with named groups `guildId`, `channelId` and `messageId`. No `g` flag, anchored. |
| M4-d, CR-11 | Met (CR-11 RESOLVED) | `getFromUrl` destructures `match.groups`. The test's literals: guild `111` reaches `authorizeGuildAdmin`, and `/channels/222/messages/333` reaches the request, for all eight hosts. |
| M4-d, AF-19 | Met | One parser (`parseMessageId`); no `split('/').pop()` remains in either site. |
| M4-d, D27 rider | Met; attacked | After the awaited gate, `redis.fetchChannel(channelId)`, then a refusal unless `'guild_id' in channel && channel.guild_id === guildId`, all before the message request. See below. |
| CR-13 | RESOLVED | `fetchChannel` is typed `request<Channel>`. |

### Adversarial execution (D27 rider, `getFromUrl`)

- **What runs real:** `getFromUrl`, `authorizeGuildAdmin`, `getFromCache`, `fetchChannel`, `fetchGuild`, `fetchUserGuilds`, `fetchAccountFromSession` and `hasDiscordPermissions`.
- **What is faked:** Redis (an in-memory map with `NX`), the Postgres account row, Discord's bot API (a channel table plus message bodies `SECRET-<channel>`), and `/users/@me/guilds`. The user is Administrator of A and holds Manage Messages only in B.
- **Oracle:** the outcome; whether `SECRET` appears anywhere in it; and whether the fake Discord ever received a `/messages/` request.
- **Input class and results, run 2 at `1e12837`: 26 of 26 as expected.**
  - Controls: a channel of A and a thread of A return content (positive).
  - Refused with no content and zero message requests:
    - links naming A, for a channel or thread of B;
    - a DM and a group DM;
    - `guild_id: null`;
    - `guild_id` as a number;
    - a lookup refused (403 → its FORBIDDEN text) or missing (404 → "Channel does not exist.").
  - Refused by the gate before any channel lookup: a Manage-Server-only user of A; a link naming B; no session cookie.
  - Refused by the pattern: trailing `\n`, trailing `/`, `?x=1`, `#x`, `discord.com.evil.example`, `discord.com@evil.example`, an embedded link on another host, upper-case host, `media.discordapp.com`, a full-width digit.
  - A leading-zero guild id is refused (NOT_FOUND from `fetchGuild`).
  - A held channel-cache lock times out to INTERNAL_SERVER_ERROR, with no content.
- **Discrimination.** The same probe at `6001f7f` (run 3) fails 2 cases: the discord.com cross-guild link and the held-lock case both return `SECRET-302`. So the probe sees CR-12, and the rider removes it. Run 1 is kept as an invalid run: my channel ids were not digits, and the positive control caught it.
- **Observed, no finding (pre-existing):**
  - `fetchGuild` runs alongside the gate, so an unauthorized caller can tell "bot is not in this server" from FORBIDDEN.
  - The cache layer's string rejection reaches the client verbatim (`fetch timed out. key: channel-302`), because `errorFormatter` returns `shape`.
  - Neither is content. Both belong to the cache layer and the router shape, outside M4.
- **Unexecuted:** Discord itself (CR-12's Assumption Not Checked, Round 4).

### Architecture Alignment

ALIGNED. One link definition (D26, A-3), now with named groups, as Round 4 preferred. One id parser shared by both F-27 sites. The rider reuses the cache layer's `fetchChannel`, with no new request path. The class sweep for caller-supplied channel ids in `src/server` and `src/pages/api` (`git grep -c -E "channel(_id|Id)"`) finds 1 file, `message.ts`, which is the rider's own site and the dev-only fixture. Blind spot: ids under other names, and `bot/`.

### TDD Compliance Check

**TDD Table Present**: Yes. **All Rows Complete**: Yes. Ordering is disclosed: the router test and the link refusals were written after the code, and their reds are named mutants. "No" rows are named controls.
- **Expectations are independent.** The D24 text, the refusal texts and the ids are literals in the tests. No expected value is derived from `MESSAGE_LOAD_FAILED_ERROR` or the constant.
- **Mocking.** The router test mocks `authorizeGuildAdmin` to pass, so the gate is not under test there. That gap is covered by Round 6's sub-entry and this round's attack, not by the suite. Recorded, not a finding: the gate is pre-existing and was read and run here.
- **Conventions.**
  - All 7 new basenames are in the positive form, and each module segment names its module.
  - The ID-token check by hand over basenames, titles and comments gives 0 hits. A planted `cr-12 rider` title fired.
  - `convention-check --since=6001f7f` in a detached worktree: 0 FAIL, 0 CANDIDATE. SKIPs: id-token (run by hand) and eslint (run in the shared tree on the 15 files, byte-identical to `1e12837`: exit 0).
- **`page.tsx`'s two class-order hunks** are lint-required: eslint flags both at `6001f7f`. They were disclosed as gate satisfaction. No finding.

### Round 7 findings

**CR-14 LOW Round 7 Sibling divergence**: the two F-27 sites answer a failed *webhook* fetch differently
- **Location**:
  - `src/providers/WebhookProvider.tsx` `useValue`, the webhook effect: `.catch(() => null)`, which leads to "Invalid URL" through M4-b.
  - `src/utils/hooks/useValidateWebhook.ts`, the webhook effect: `catch { setWebhookError(MESSAGE_LOAD_FAILED_ERROR) }`, which leads to "Could not load the message. …" under the webhook field.
  - Both at `1e12837`.
- **Class**: One failure, a network failure of the webhook-URL fetch, answered with different user-facing texts at the two sites the plan requires to mirror each other. At one site, the text names the wrong object.
- **Enumeration**: the catch blocks of the webhook-URL fetch effects. `git grep -n "fetch(url)" 1e12837 -- src` hits 2 sites (`WebhookProvider.tsx` and `useValidateWebhook.ts`), and I read each catch. The predicate cannot see a webhook fetch through another variable name.
- **Issue**: D24 settles the text for "an old-message fetch". Rev 19's "a fetch that fails with no response shows exactly …" at both sites does not say whether the webhook fetch is included. Where the contract cannot settle it, the contract is the defect. The implementer disclosed this as Outstanding item 3. The tests pin both behaviours: `WebhookProvider…` "settles with no webhook" and `useValidateWebhook…` "shows the connection error when the webhook fetch rejects".
- **Required Action**:
  - **Planner:** state which text a webhook-URL fetch failure shows, as one answer for both sites.
  - **Implementer:** align both sites and their cells to that answer. Falsity signature: one cell per site, with the same rejected webhook fetch, asserting the same literal text; a site that diverges fails.
  - Non-blocking. Both are user-visible, so UAT checks the result on the dialog and on the send page.

### Round 7 verdict

APPROVED_WITH_COMMENTS for M4 at `1e12837`. CR-14 is LOW and changes no safety outcome. QA Phase 2 may take M4 at `1e12837`.

### Round 7 sub-entry (M4-d non-JSON cells, website `476c633`, `1968281`)

- Test-only, with no production change. Both F-27 sites (`WebhookMenu.failed-webhook-load`, `NewMessageModal.failed-webhook-load`) gain a cell where the response's `json()` rejects. Each asserts "Invalid URL" present exactly once, in place, with the error class. This carries rev 24's non-JSON member (Round 13), and test adequacy is QA's.

### Round 7 sub-entry (CR-17, website `24ac49f`, fix `a665901`)

- **Sweep, re-run**: `git grep -nE` at `24ac49f` over `src` for the text `Invalid URL` in single, double or back quotes (`verification/015/cr-m6-probes/cr17-cr19-sweeps-24ac49f.txt`). In production, only `EmbedAuthor.tsx` and `EmbedTitle.tsx` remain; they are outside the class, because the text there names an embed's link field. The constant is defined once (`src/constants/index.ts`) and imported at both webhook sites. The test hits are the cells' own literals, which Axiom E requires.
- **Disposition**: CR-17 RESOLVED. The check that fails if the class returns is the pair of cells `WebhookMenu.failed-webhook-load` and `NewMessageModal.failed-webhook-load`, which assert the literal in place.

### Round 7 sub-entry (D29 change and QAF-25 cells, website `da24eb7`; M4 content `46a9cab` and `6c42032`)

- **Scope.** The fix diff `579e8b2..46a9cab` plus `6c42032`, written to files and read in full. (`3031878` in that range is M1's, recorded under Round 2.)
  - Production: 1 line, the webhook catch in `useValidateWebhook.ts`. Tests: two new files and three tightened.
  - It stays within D29 and QAF-25, so it is a sub-entry.
  - `Reviewed-At` moves to `da24eb7`. The M4 files are identical at `6c42032` and `da24eb7`: `git diff --name-only 6c42032 da24eb7` lists only `src/app/preview/page.tsx`.
- **D29 is met at both sites.**
  - **Dialog.** The webhook effect's catch sets `'Invalid URL'`. That text reaches the user only through `messageErrorString`, which `NewMessageModal` renders below the load options as `<div className="mt-2 text-sm text-error">`. `errorMessage=` in the file is still 0, so no field error was added (CR-16 option (a)). A Discord refusal still sets Discord's `message`.
  - **Send page.** Unchanged: `WebhookMenu`'s `errorMessage`, under M4-b.
  - **CR-14 LOW Round 7 RESOLVED:** one answer at both sites. The checks that fail if it returns are `NewMessageModal.failed-webhook-load` and `WebhookMenu.failed-webhook-load`.
- **The cells meet CR-16's falsity signature.**
  - Each asserts exactly one leaf node with the literal `Invalid URL` in the whole mounted tree, so the text appearing elsewhere fails, and so does the text appearing nowhere.
  - The dialog cell places the text on a `text-error` element whose parent holds more than one input. That is the shared line under the accordion, not a single field's container. The menu cell places it in the URL input's container.
  - Mutant runs (`m4-d29-sweep-summary-46a9cab.txt`): each of these reddens the dialog cell: the pre-change text, the dropped catch, the refusal mapped to `Invalid URL`, and the error line dropping `webhookError`.
  - The expected values are literals.
- **QAF-25 cells.** The five refusal texts, the refused input's `''` and `guild_id: null` are all literals. QA's named mutants redden each one (same summary).
- **Conventions.** `6c42032` replaces non-null assertions with optional chaining in the two new files, to satisfy the lint gate (disclosed). convention-check over the tree: 0 FAIL (Round 10's run).
- **The rider is untouched.** `message.ts` is unchanged since `1e12837` (`git diff --quiet`: 0), and the `redis/index.ts` hunks touch only `fetchUserAccount` (M1). So I did not re-run the `getFromUrl` attack (`cr-m4-probes/`).

**CR-17 LOW Round 7 (sub-entry) Duplicated literal at two mirrored sites**: the two webhook sites each write `'Invalid URL'` by hand
- **Location**: the webhook-effect catch in `src/utils/hooks/useValidateWebhook.ts`, and `errorMessage` in `src/app/message/m/[id]/send/_components/WebhookMenu/index.tsx`, at `da24eb7`.
- **Class**: A user-facing text that the plan requires to be the same at two sites, written as two independent literals. The same change's sibling text (`MESSAGE_LOAD_FAILED_ERROR`, D24) is one shared constant.
- **Enumeration**: `git grep -c "'Invalid URL'" da24eb7 -- src ':!*__tests__*'` gives 4 files.
  - Two are the webhook sites.
  - Two are the embed editors (`EmbedAuthor.tsx`, `EmbedTitle.tsx`). There the text refers to an embed's link field, which is a different message, so they are outside this class.
  - Blind spots: the predicate cannot see the text built from parts or written in double quotes.
- **Issue**: Only the two cells hold D29's "one answer for both sites"; the code does not. The impact is low because the cells catch a divergence.
- **Required Action (implementer, non-blocking)**: Preferred: one constant beside `MESSAGE_LOAD_FAILED_ERROR` in `src/constants`, used at both webhook sites. The cells keep their literals (Axiom E). The embed editors stay as they are.
- **Sub-entry verdict.** Round 7 stays APPROVED_WITH_COMMENTS for M4, now at `da24eb7`. QA Phase 2 may re-run M4 there.

## Round 6 (plan gate read, rev 19, agent-output `330348f`; mechanisms at website `6001f7f`)

### Round 6 sub-entry: `authorizeGuildAdmin`'s refusal path (QA's routed assumption, `a47f5e9`)

- **The question.** The rider binds the channel to whichever guild passed `authorizeGuildAdmin`, so it is only as strong as that gate. Does a signed-in non-manager of server A get content for a server-A link?
- **Read at `6001f7f`.** `authorizeGuildAdmin` refuses in four cases: no session cookie, or one that is not a string (UNAUTHORIZED); no account or `access_token` (UNAUTHORIZED); no guild list (UNAUTHORIZED); and the link's guild missing from the list (FORBIDDEN). The list comes from `redis.fetchUserGuilds`, which keeps only guilds where `guild.owner` is set or `hasDiscordPermissions(guild.permissions, ['Administrator'])` holds. A non-owner, non-Administrator of A (Manage Server alone included) has no A entry, so is refused FORBIDDEN. In `getFromUrl`, the gate's rejection rejects `Promise.all([authorizeGuildAdmin, fetchGuild])`, which is awaited before the `/channels/…/messages/…` request, so no content is fetched.
- **Executed.** `hasDiscordPermissions` is the real module at `6001f7f`, run under node v24.14.0 with six cases whose expectations are literal Discord bits: Administrator only; Manage Server only; none; two non-admin bits; all bits above 2^53; one high non-admin bit. Result: 6 of 6 as expected (`verification/015/cr-m4d-admin-bit-probe.mts`, run 1). `fetchUserGuilds`'s trim and `authorizeGuildAdmin`'s `find` were read, not run: Redis and Discord stand behind them.
- **Stated residue (no finding).** `user-guilds` is cached for 600 s, keyed by the user's Discord id. A user who loses Administrator keeps passing the gate until the entry expires or sign-out clears it (M1-c, D22). This is pre-existing and bounded, and it is not the falsity QA named.
- **For Round 7.** The rider's channel lookup has to sit behind the gate as well: after the awaited `Promise.all`, or inside it with the message fetch still after. A lookup that runs before the gate is not a leak of content, but it is a channel probe by an unauthorized caller.
- **Assumption Not Checked.** This review assumes that Discord's `/users/@me/guilds` reports a user's `owner` and `permissions` truthfully for the token's own user, and does not test it. Falsity signature: a test account that is not an Administrator of a server loads that server's message link and gets content. Owner: UAT, on M4-d's walk with the test account (discord-test-browser), never against a user's server.

- **Scope.** The CR-12 rider's Property and "The lookup fails" in § M4-d, from the delta `67cb5e7..330348f` written to a file and read. Nothing else in M4-d changed.
- **Equality over the domain.** "`guild_id` equals the authorized guild id" refuses a different id and an absent field (DM or group DM). The rev 18 cells stay discriminating, and the absent-field member needs its own cell, which QA owns. No finding.
- **Refusal texts.** Re-read at `6001f7f` in `fetchChannel`: 401 and 403 both read "Missing permissions. Make sure the bot has access to this channel in Discord.", 404 reads "Channel does not exist.", and the default reads "An unknown error occurred. Please try again later or contact support." All match the plan.
- **Unmapped failures.** Two failures have no mapped text: a request with no response, which throws from the client before any status, and the cache lock-miss path, where `wait` rejects with `fetch timed out. key: …` after `timeoutSeconds`. Both throw before the message fetch, so the property's "no message content" holds for them. The plan scopes its text list to *mapped* refusals, so this is no finding. For Round 7: neither must be caught and turned into a pass.

## Round 5 (plan gate read, rev 17–18, agent-output `67cb5e7`; mechanisms at website `6001f7f`)

- **Scope.** § M4-d and D27 at `67cb5e7`, from the delta `565e240..67cb5e7` written to a file and read. Rev 17's restatement of CR-11 was confirmed in Round 4's sub-entry. The M4 code (`588d11a` and later) is not reviewed here: it is Round 6, on the implementer's one-tree handoff (steering, option (a)).
- **M-C4-1, two sites.** I re-ran the plan's predicate: `git grep -c -E '\\d\+/\.test' 6001f7f -- src bot` → 2 (`WebhookProvider.tsx`, `useValidateWebhook.ts`). This matches the plan. Every limb (accepted classes, network text, ordering, the id fetched) is now stated "at both sites". No finding.
- **D27 rider (CR-12).** The property is stated over three input classes: same guild → returned; other guild → refused, with no content; lookup refused or failed → refused. The check comes before the message fetch, or its result is discarded. Its cell (link guild ≠ channel `guild_id`, fails on any content returned) has the falsity signature Round 4 asked for. Combined with the same-guild cell, a comparison against the wrong field fails one of the two cells either way. "Holds whatever Discord returns" correctly takes the unexecuted Discord leg out of the fix's premises.
  - The sibling claim reproduces: `git grep -l guild_id 6001f7f -- src/server` → 0 files. `fetchChannel` (`src/utils/redis/index.ts`) is exported and has no caller (`git grep -n fetchChannel`: definition and export only).
  - `fetchChannel` caches for 10 s through `getFromCache`, which stores `compress-json` output and restores it with `decompress`. That is lossless, so `guild_id` survives the cache. Its refusals throw `TRPCError` with channel-specific texts for 401/403/404, which are "that refusal's existing text".
  - The drop disposition is priced in advance (a security handoff, plus an Exclusions row, before chain 015 releases).

**CR-13 LOW Round 5 Mechanism claim, D27 rider**: the reused `fetchChannel` types Discord's channel object as `Guild`
- **Location**: `src/utils/redis/index.ts` `fetchChannel`, `getApi().request<Guild>('GET', `/channels/${channelId}`, …)` at `6001f7f`.
- **Class**: A response type that names a different Discord object than the endpoint returns, so fields the caller needs are missing from the type, and fields with the same name mean something else.
- **Enumeration**: `git grep -n "request<" 6001f7f -- src bot` gives 8 lines. One is a comment and one is prose, which leaves 6 live typed requests (5 in `redis/index.ts`, 1 in `message.ts`). I read each against its endpoint path by hand. 1 mismatches: this site. Capture: `verification/015/cr-m4d-request-type-sites-6001f7f.txt`. The predicate cannot see untyped `request(` calls or requests through any other client, and no mechanical check connects a type name to an endpoint, so the per-site judgement is a reading.
- **Issue**: a rider written against this return type finds no `guild_id`. The type invites `channel.id === guildId`, which compiles because `Guild.id` exists, or a cast. The `.id` form fails closed, refusing every link, and the rider's same-guild cell catches it. So this changes no outcome the plan's cells would let through: LOW.
- **Required Action (implementer, at M4)**: type `fetchChannel`'s request as Discord's channel type (the `Channel` type `fetchChannels` already uses), and compare `guild_id`. No plan change is needed.

## Round 4 (plan gate read, revs 14–16, agent-output `565e240`; mechanisms at website `6001f7f`)

### Scope and identity

- **Tree.** The plan at `565e240` (rev 16). Delta `9cbe755..565e240`, written to a file and read in full. Mechanism claims were checked at website `6001f7f` with `git show` and `git grep`; the working tree was not used. The website chain tip has moved to `b25f561`, which carries M4 work not yet handed off. That work is not reviewed here: M4 is Round 5, opened when its own handoff arrives.
- **Limbs, as briefed:** M1-i (CR-7), M2-a and M6-f (CR-8), and M4-d (D24–D26), plus X-17 (CR-6).
- **Evidence process.** The plan text, my own re-runs at `6001f7f`, and `verification/015/cr-m4d-link-class-sweep.sh`, which I wrote for this read. Its binding predicate fired on a planted control (2 of 2), recorded in its run file. It is a model of the code, not a probe of Discord: what Discord returns for a cross-guild channel is not tested (Assumption Not Checked, Round 4).

### Dispositions

- CR-6 LOW Round 2 ROUTED: X-17, `handoff/providers-query-params-header-decode-throws-2026-11-08.md`. The CR-6 Minimum (correcting the implementer's disposition line) is still the implementer's.
- CR-7 LOW Round 2 RESOLVED: rev 14's M1-i defines "present" as what `cookies()` returns, with two residue classes. Both are shown in QA's `qa-m1i-cookie-presence-probe-run1.txt` (`next-auth.session-token`, no `=` → present `"true"`; `%zz` and a truncated escape → absent), and the `ab%` member is shown in my `cr-m1-cookie-reattack-run1.txt`. My re-attack also shows whitespace around `=` reading as absent. RFC 6265's `cookie-pair` has no whitespace around `=`, so that case is outside the grammar the residue is bounded by: no finding. Check that fails if it returns: QA's probe, run 1.
- CR-8 LOW Round 3 RESOLVED: M2-a names `Picker.tsx` `Picker` as the third member, and M6-f's criterion now says "0 included" and covers that line. Re-read at `6001f7f`: `defaultColor={initColor ? `#${initColor.toString(16)}` : '#000000'}`. Check: `verification/015/qa-m2a-colour-truthiness-sweep.sh`, run 1.

### M4-d (rev 16) against website `6001f7f`

- **The shared constant.** `DISCORD_MESSAGE_LINK_REGEX` in `src/constants/index.ts` is `^https://(?:www\.|canary\.|ptb\.)?discord\.com/channels/(\d+)/(\d+)/(\d+)$`. It has no `g` flag, so `.test` keeps no `lastIndex` state across the two consumers. It is anchored, so the plan's statement that it is "still refused" holds for every refused class it names at `6001f7f`.
- **Consumers.** `git grep -c` gives 2 in `NewMessageModal.tsx` (import, plus the `enabled` test of `getFromUrl.useQuery`), 3 in `message.ts` (import, the zod `.regex`, and `.match`), and 1 definition. This matches the plan and the architect's `565e240` pass.
- **Hand copies.** Every non-test line naming a `discord(app).com` host is listed in `cr-m4d-link-class-sweep-6001f7f.txt`. Apart from the constant, the only `/channels` text is placeholder strings: `NewMessageModal.tsx` and `EditMessageMenu.tsx`. No second link parser exists, so D26's "widened once" can be met. The predicate cannot see a host assembled from parts, or a link test written without the host text.
- **Placeholders.** The two `https://discord.com/channels/...` placeholders stay correct after the widening, because discord.com remains admitted. No finding.

### Round 4 findings

**CR-11 MEDIUM Round 4 Plan text, M4-d (rev 16)**: the `getFromUrl` property omits the capture group the authorization gate reads — Duplicates: QAF-21 in `qa/015-bug-evaluation-fixes-qa.md` (QA rates it LOW. I hold MEDIUM under the severity floor: the authorization gate relies on the guild group, and no assertion is stated for it) and critic L-C4-1 in `critiques/015-bug-evaluation-fixes-cycle4-critique.md`
- **Location**: plan § M4-d, "Consumers of the widened constant": "`getFromUrl`'s match groups still yield channel id and message id for every admitted form". Code: `src/server/api/routers/message.ts` `getFromUrl`, `const [, guildId, channelId, messageId] = match` and `authorizeGuildAdmin(guildId, req)` at `6001f7f`.
- **Class**: A criterion that widens an input to an authorization-gated procedure, and states what the widened parse must still yield without naming every value the gate consumes.
- **Enumeration**: the consumers of the widened constant whose captured values reach a gate. `git grep -c DISCORD_MESSAGE_LINK_REGEX 6001f7f -- src bot` gives the two consumer files. Only `getFromUrl` destructures the groups, and the guild group is the only argument to `authorizeGuildAdmin` there (sweep run file, "getFromUrl body": 1 authorization call). That is 1 member. The predicate is limited to this constant: other gates parsing other link classes are not enumerated.
- **Issue**: D26 widens the host part. Adding a capturing host group, which is the natural way to write `discord(app)?`, shifts every index. The plan's stated property catches a shift of the channel and message ids. It does not state that the first value is still the link's guild id, so a widening that reads channel and message by index from the end, or by named groups, while leaving `guildId` at index 1, passes the criterion as written and authorizes against the wrong value. By reading, the likely outcome is fail-closed: a host string is in no user's guild list, so the gate returns FORBIDDEN. That is a broken load for every link, not a bypass. The bypass shape is CR-12, which already exists. Either way, the code relies on this behaviour and no assertion fails when it is lost: severity floor MEDIUM.
- **Required Action (planner)**: restate the limb as "for every admitted form, `getFromUrl` passes the link's own guild id to the authorization gate, and the link's channel and message ids to the request". State the falsity signature the cell must show: a test whose link's guild id differs from both its channel and message ids, using distinct literals with the guild group neither first nor last among the values asserted. The cell fails when the gate receives anything but the link's guild literal. The cell's expected values are literals written in the test, never re-derived by matching against the constant (Axiom E). Preferred (structural): named groups in the constant (`(?<guildId>\d+)` and so on), read by name at `getFromUrl`, so that a host group cannot shift what the gate reads. Minimum: the restated property and its cell.

**CR-12 HIGH Round 4 Security, pre-existing (on `master`)**: `getFromUrl` authorizes the link's guild but fetches the link's channel, which can belong to any guild the bot can read
- **Location**: `src/server/api/routers/message.ts` `getFromUrl` at `6001f7f` and at `master` (`cr-m4d-link-class-sweep-master.txt`): `authorizeGuildAdmin(guildId, req)`, then `getApi().request('GET', `/channels/${channelId}/messages/${messageId}`)` with the bot token (`src/utils/discord.ts` `getApi`, `new Api(env.DISCORD_BOT_TOKEN)`).
- **Class**: An authorization decision made on one identifier of a request, while the protected action is addressed by another identifier of the same request that the code never binds to the first.
- **Enumeration**: in `getFromUrl`, lines comparing `guild_id`, looking up a channel, or comparing `guildId`: **0** at `6001f7f` and at `master`. The predicate fired 2 of 2 on a planted control. It cannot see a binding done inside a helper under another name. Population beyond this procedure (other routers that authorize a guild and then act on a caller-supplied channel or message id): **not measured**. Security's to sweep.
- **Issue**: a user who manages guild A, with the bot in A, submits `https://discord.com/channels/<A>/<channel in B>/<message in B>`. `authorizeGuildAdmin(A)` passes, `redis.fetchGuild(A)` passes, and the bot-token request returns the message from guild B whenever the bot can read that channel. The message content is returned to the caller. So it is a cross-guild read of any message the bot can see. It predates chain 015 and is outside F-1 to F-50 (D6). It matters to this round because D26 widens the inputs this procedure accepts, and the M4-d walk drives this procedure.
- **Magnitude**: established by reading the code at both SHAs only. That Discord serves `GET /channels/{c}/messages/{m}` for a channel outside the URL's guild, given the bot has access, is the unexecuted premise (Assumption Not Checked, Round 4). An unmeasured hypothesis on the Discord leg.
- **Required Action**: the owner decides whether this rides chain 015 as a scope delta or goes to a handoff and the security agent; this review does not decide it. The fix, wherever it lands: Preferred (structural): fetch the message's channel (or use the message's `guild_id` where Discord supplies it) and refuse unless its `guild_id` equals the authorized guild, so the gate and the action are addressed by one identifier. Minimum: the same comparison, inline in `getFromUrl`. The cell's falsity signature: with a stubbed channel whose `guild_id` is a literal other than the link's guild, the procedure must refuse, and the test fails if the message is returned.
- **Escalated** to steering-hooks-015 immediately, for the owner (security vulnerability).
- CR-12 HIGH Round 4 ROUTED: the owner chose to fix it in chain 015 as an M4-d rider (rulings 07:01Z, `3d7af67`). The planner folds it at the next revision. Code review checks it at the gate read steering briefs over `565e240..<that tip>`, and the class sweep and re-attack run at Round 5. The check that fails if it returns is the implementer's cell with Round 4's falsity signature.

### Round 4 record note (2026-11-08T06:58)

- **A commit of mine carried another session's hunks.** My plan changelog-row commit `19dbf64` also carried the planner's uncommitted rev 17 text for M4-d: the two-site enumeration (critic M-C4-1), the guild-group property (QAF-21, L-C4-1), the id-fetched limb (AF-19), and the QAF-22 refusal text. `git diff -- planning/…` written to a file just before my edit was 0 bytes. The planner wrote between that check and `git commit --only`. I did not re-run the diff on the edited file, and that was my error. History is not rewritten: no amend and no reset. Reported to the planner and steering. As a result, the committed plan carries part of rev 17 under `Revision: 16`, until the planner commits rev 17.
- **CR-11** is folded in substance by that rev 17 text ("the guild id, the channel id and the message id, in that order; the guild id is `authorizeGuildAdmin`'s input"). I verdict it at the rev 17 gate read, and the cell's falsity signature (above) still applies to the implementer's test.

### Round 4 sub-entry (CR-11 fix, plan rev 17 at `94e9987`)

- **Scope.** The CR-11 limb only: § M4-d, "Consumers of the widened constant", read with `git show 94e9987:planning/…`.
- CR-11 MEDIUM Round 4 RESOLVED. The text: "For every admitted form, `getFromUrl` passes the link's own guild id to the authorization gate (`authorizeGuildAdmin`), and the link's own channel id and message id to the request." It names every value the gate and the action consume, by where each goes rather than by group position. So a host group that shifts the indices cannot satisfy it. The class has one member (the Round 4 enumeration), and the sweep (`cr-m4d-link-class-sweep.sh`) has no other consumer that destructures the groups. The check that fails if it returns is `no test` at plan level. The implementer's M4 cell carries it, with the Round 4 falsity signature (distinct literals, and the cell fails if the gate receives any other value), and Round 5 checks it. The named-groups preference stays a build recommendation, which the planner rightly keeps out of the plan text.
- **Not covered here.** Rev 17's two-site enumeration (critic M-C4-1, a scope delta with steering) and its other M4-d text are a criterion change. They are read at the next gate read steering briefs, or at Round 5's criteria record.

### Round 4 verdict

M1-i, M2-a and M6-f (the folds of CR-7 and CR-8), M4-c and X-17: approved. M4-d: REJECTED on CR-11 until it is folded. CR-12 does not hold rev 16; it holds whatever the owner decides about it. No limb of mine is reached by the M3 premise hold.

## Verdict

**Round 18 (M8, preview-image-generator `6c613a5`)**: REJECTED for M8-a (CR-27 MEDIUM). M8-b to M8-e are met. CR-28 is LOW.

**Round 17 (M7, website `476c633`)**: APPROVED.

**Round 16 (M5-i, website `476c633`)**: APPROVED.

**Round 14, after its sub-entry at `476c633`**: APPROVED_WITH_COMMENTS. CR-22, CR-24 and CR-25 are RESOLVED; CR-26 is LOW.

**Round 10, after its sub-entry at `476c633`**: APPROVED_WITH_COMMENTS. CR-18 is RESOLVED; CR-29 is LOW (planner).

**Round 15 (plan gate read, rev 25)**: APPROVED. CR-23 is RESOLVED.

**Round 14 (M6, website `24ac49f`, plan rev 24)**: REJECTED for M6-a (CR-22 MEDIUM) and for F-45's class under D28 (CR-24 MEDIUM). M6-b to M6-l are met. CR-23 (planner) and CR-25 (record) are LOW. CR-17 and CR-19 are RESOLVED (sub-entries of Rounds 7 and 10).

**Round 13 (plan gate read, rev 24)**: APPROVED. CR-21 is RESOLVED.

**Round 12 (plan gate read, rev 23)**: REJECTED for M5-h's residue text (CR-21 MEDIUM, planner). CR-20 is RESOLVED. M6-l (ii) and (vi)/D33 are approved.

**Round 11 (plan gate read, rev 22)**: APPROVED_WITH_COMMENTS (CR-20 LOW, for the planner). M5-h's plan text now carries CR-18's class. M5-h's code stays REJECTED under Round 10 until its fix.

**Round 10 (M5, website `da24eb7`, plan rev 21)**: REJECTED for M5-h only (CR-18 MEDIUM). M5-a to M5-g are met; CR-19 is LOW.

**Round 7 sub-entry (M4's D29 change and QAF-25 cells, `da24eb7`)**: Round 7 stays APPROVED_WITH_COMMENTS. CR-14 is RESOLVED; CR-17 is LOW.

**Round 2 sub-entry (CR-15, `3031878`)**: CR-15 is RESOLVED. Round 2 stays APPROVED_WITH_COMMENTS.

**Round 9 (plan gate read, rev 21)**: APPROVED. CR-16 is RESOLVED, and D30 has no finding. Round 8's REJECTED is cleared by it.

**Round 8 (plan gate read, rev 20)**: REJECTED for M4-d's webhook-load limb only (CR-16 MEDIUM, planner).

**Round 7 (M4, website `1e12837`, plan rev 19)**: APPROVED_WITH_COMMENTS (CR-14 LOW). CR-11 and CR-13 are RESOLVED in code.

**Round 6 (plan gate read, rev 19, CR-12 rider)**: APPROVED.

**Round 5 (plan gate read, rev 17–18, M4-d)**: APPROVED_WITH_COMMENTS (CR-13 LOW, for the implementer at M4).

**Round 4 (plan gate read, revs 14–16), after its sub-entry at rev 17**: APPROVED_WITH_COMMENTS. CR-11 is RESOLVED at `94e9987`. CR-12 HIGH is pre-existing and escalated to the owner through steering. Every other briefed limb is approved.

**Round 3 (M2) — Status**: APPROVED_WITH_COMMENTS
**Rationale**: M2-a to M2-d and QAF-1 meet their rev 13 properties at `6001f7f`. CR-8, CR-9 and CR-10 are LOW and change no M2 outcome.

**Round 2 (M1), after its sub-entry at `579e8b2`**: APPROVED_WITH_COMMENTS (CR-15 LOW). CR-3 RESOLVED; M1-h met. It was REJECTED at `be881c9` and at the `6001f7f` sub-entry, for M1-c and M1-h only. M1-i is met (CR-4 RESOLVED). CR-6 and CR-7 are LOW.

## Required Actions

1. **Implementer, blocking M8-a:** CR-27, reviewed as a Round 18 sub-entry.
2. **Implementer, non-blocking:** CR-28 (a presence check on the private queue, and the Patterns row corrected), CR-26 (the lint guard's reach), and CR-10 as QA times it.
3. **Planner:** CR-29 (M5-h class (3)'s `fields: null` member).
4. **Analyst, before M8-0 run 2:** the `Created instance` read in `pig-host-read.sh`, reviewed when it lands. Each is reviewed when it is handed off.

## Assumption Not Checked

- **Round 18:** This review assumes that the host's root PM2 daemon runs the generator on a Node runtime that has `http.Server.prototype.closeIdleConnections` (18.2 or later). `prod.yml`'s `setup-node` 18 sets the runner's PATH, not necessarily the daemon's interpreter. It does not read the host.
  - Falsity signature: the generator's PM2 error log shows `TypeError: server.closeIdleConnections is not a function` at a stop. Until CR-27 is fixed, the out log shows a drain-complete line in a few ms with requests cut off.
  - Owner: devops, by a `claude-ro` read of the daemon's interpreter version before the M9 push (M8-0's read-only route, D17).
- **Round 17:** This review assumes that `pnpm run push-commands` replaces the existing *Get Message* command's `default_member_permissions` on Discord. A server's own per-command override, if any, persists. It does not push.
  - Falsity signature: after the push, a member with Manage Server and without Administrator does not see *Get Message* in a server with no override.
  - Owner: the owner's M7-a limb 2 attestation.
- **Round 16:** This review assumes that `react-accessible-accordion`'s `dangerouslySetExpanded` opens the section in a real browser as it does under jsdom. It does not test this in a browser.
  - Falsity signature: on a first visit to a send page whose guild has webhooks, the menu shows the custom-webhook ("load") section open.
  - Owner: UAT, on M5-i's walk.
- **Round 14:** This review assumes that the M6-l error line, which jsdom renders in the block below the components, is visible in a real browser on the Send page and on `/preview`, and is not clipped or hidden by layout. It does not test this in a browser.
  - Falsity signature: on the served chain tip with 41 components, the red border shows and no red line can be seen.
  - Owner: UAT, on M6-l's human-observable walk.
- **Round 13:** This review assumes that on a first visit to a send page, the guild's webhook list arrives after `WebhookMenu` mounts, so the seed reads `hasWebhooks` false and opens "load". The implementer's probe (`verification/015/d28-seed-probes/report.md`) shows this; I did not run it.
  - Falsity signature: M5-i's cell for the first visit is green against the unchanged code, with no red first run.
  - Owner: the implementer's red first run at M5-i, which code review checks at handoff.
- **Round 12:** This review assumes that every stored message the generator (M8) screenshots renders today. If so, rev 23's "a stored message that renders today still renders" means no stored message's preview image changes to the error line. The review does not read the stored corpus.
  - Falsity signature: after release, a generated preview image shows "Invalid message data." for a saved message.
  - Owner: devops at M8/M9 (the post-release generator read); the corpus itself is the owner's data and not an agent read.
- **Round 11:** This review assumes that jsdom's render of the real `DiscordMessageEditor` stands in for a browser's, for the members that rendered in real run 4: `{"components":[null]}`, a type-17 `null` direct child, and array elements. It does not test this in a browser.
  - Falsity signature: in Chrome, `/preview?data={"components":[null]}` shows a blank or crashed page.
  - Owner: UAT, on M5-h's walk (served chain tip, a browser run through steering). The member is X-19's.
- **Round 10:** This review assumes that `PresetDialog` (Headless UI) closes on Esc and on an outside click whenever `allowMenuClose` is true, so that the flag M5-a's cells assert is what the user's keypress reaches. It does not test this in a browser.
  - Falsity signature: after a confirmed Load, the user reopens the JSON dialog, presses Esc, and the dialog stays open.
  - Owner: UAT, on M5-a's walk against the served chain tip. A browser run goes through steering, under the 07:42Z Playwright ruling.
- **Round 1:** This review assumes vitest's node project collects and executes a case under `bot/**/__tests__` at `037935d`, and does not test it.
  - Owner: QA Phase 2. Closed there by `qa-m0-bot-collection-probe` (`bf10a46`).
- **Round 2:** This review assumes no client bundle reads a non-`NEXT_PUBLIC_` key, other than `NODE_ENV`, through `env.mjs` at `be881c9`, and does not test it.
  - Falsity signature: a page that throws the guard's refusal on load (RK-7).
  - Owner: UAT's editor walks B-2 to B-5.
- **Round 3:** This review assumes that a black embed saved through the real tRPC save path reloads as `color: 0`, that is, no layer between `embedShape` and the stored JSON drops or rewrites a 0. It does not test this.
  - I read the schema, ingress and border only, and did not drive a save.
  - Falsity signature: the B-2 walk's reload shows the default border, or the stored message lacks `color`.
  - Owner: UAT (M2-a's human-observable limb, walked on the served chain tip).

- **Round 7:** This review assumes that the vitest DOM fake of `fetch` (a rejected promise) stands in for a browser's no-response failure in both validation effects, and does not test it in a browser.
  - Falsity signature: in a real browser, with the network cut, the send page or the dialog shows nothing, or leaves the loading state stuck, where the D24 text should appear.
  - Owner: UAT, on M4-d's walk with the network offline in devtools, without sending.
- **Round 4:** This review assumes that Discord's `GET /channels/{channel}/messages/{message}` with the bot token returns a message from a channel in a guild other than the link's, whenever the bot can read that channel. It does not test this.
  - I read `getFromUrl` and `authorizeGuildAdmin` only, and did not drive a request.
  - Falsity signature: the request returns 403 or 404 for a channel outside the link's guild while the bot has access to it. CR-12 would then fall to LOW.
  - Owner: security (CR-12's routing), driven with a test guild pair, never against a live user's guild.

## Next Steps

- **QA Phase 2** (qa-hooks-015):
  - **M8 (M8-a to M8-e) at generator `8de2b53`**, from the Round 18 sub-entry: APPROVED_WITH_COMMENTS. The drift instrument is `verification/015/cr-m8-probes/run-drift.sh` (control and mutant, three runs each).
  - **Website `c5303ca`** (QAF-34, QAF-35, CR-26, CR-37, CR-38), from the Round 14 sub-entries: APPROVED. It supersedes `2618926`. The jsdom focus-fidelity assumption is QA's.
  - **QAF-27 and QAF-20 at website `4f9ed85`**, test-only, from the Round 2/3 sub-entry: APPROVED_WITH_COMMENTS. Its Assumption Not Checked (the 1115 pass set at `4f9ed85`) and the second `setImmediate` turn's necessity are QA's.
  - At website `476c633`: M6-a (CR-22 RESOLVED), M5-h (CR-18 RESOLVED), M5-i (Round 16), M7 (Round 17) and the M4-d non-JSON cells. M6-b to M6-l were already cleared at `24ac49f`.
  - Earlier: M1 with the QAF-26 cells and M5-e with the QAF-29 cells at `24ac49f`; M4 at `da24eb7` (Round 7 plus its sub-entry); M5-a to M5-g at `da24eb7` (Round 10); M1 at `3031878` (CR-15 RESOLVED). Instrument for M5-h's later re-check: `verification/015/cr-m5-probes/`.
- **Implementer** (implementer-hooks-015): nothing owed from code review. CR-38, CR-37, CR-26, CR-35 and CR-36 are RESOLVED.
- **Planner**: CR-39 LOW, carried into the M9 RK-8 handoff's text at mint (no rev 29). CR-32, CR-33 and CR-34 are RESOLVED at rev 28; CR-35's earlier members are X-26.
- **Devops**: Round 18's Assumption Not Checked (the daemon's Node version) before the M9 push. At the M9 RK-8 mint, CR-39's probe paths and conditions. Round 21's Assumption Not Checked (a request waits where S3 answers), unless QA closes it first. The Round 18 sub-entry's Assumption Not Checked (production's launch-failure retry rate) is closed at the RK-8 lockfile-trigger read, by running `run-drift.sh`'s probe on the deployed engine.
- **UAT**: the D36 line on PM2's error log as an operator-visible check (CR-34, R-23). An `autoFocus` button under a screen reader's virtual cursor (the CR-38 sub-entry's Assumption Not Checked). The Assumptions Not Checked of Rounds 14 and 10, and those of the earlier rounds.
- **Steering**: CR-34's magnitude, for its 09:49Z "not re-put" call.

## Resumption State (code-reviewer-hooks-015, after the usage gate; last written at the Round 21 commit, d7b0c57)

- **Tree.** website `chain/015-bug-evaluation-fixes` at `c5303ca`, reviewed. Mutant exports `website-b195eeb-cr26-*` are in the scratchpad. preview-image-generator at `8de2b53`, not pushed. No mutation in any shared tree. The detached worktree `web-4f9ed85` was removed. The exports `pig-probe-8de2b53` and `pig-drift-8de2b53` (the mutant copy) live in this session's scratchpad only. Rebuild them with `m8-local-probe/run.sh … 8de2b53` and `cp -a`, then rename `_waitingClientsQueue` in `node_modules/generic-pool/lib/Pool.js`.
- **Done this session.** Round 21 (rev 28 gate read) is APPROVED_WITH_COMMENTS (CR-39 LOW). The Round 14 sub-entry at website `c5303ca` is APPROVED (CR-38 RESOLVED). The Round 14 sub-entry at website `2618926` is APPROVED_WITH_COMMENTS (CR-37 and CR-26 RESOLVED; CR-38 LOW). The sub-entry at website `b195eeb` is REJECTED on CR-37 (CR-26 narrowed; CR-35 and CR-36 RESOLVED). The Round 18 sub-entry is complete (M8 APPROVED_WITH_COMMENTS; CR-27 and CR-28 RESOLVED; CR-34 LOW). The Round 2/3 sub-entry at website `4f9ed85` is APPROVED_WITH_COMMENTS (CR-35, CR-36 LOW). Both are delivered to the implementer and QA, with CR-34's figures to steering.
- **Done earlier, all committed.** M0: Round 1. M1: Round 2. M2: Round 3. M4: Round 7 plus sub-entries. M5: Round 10 plus the M5-h sub-entry; M5-i: Round 16. M6: Round 14 plus its sub-entry. M7: Round 17. M8: Round 18 plus this sub-entry. Plan gate reads: Rounds 4, 5, 6, 8, 9, 11, 12, 13, 15, 19, 20.
- **Next.**
  - The analyst's `pig-host-read.sh` extension, when it lands.
- **Instruments.**
  - `cr-m8-probes/`: the attack, `drift.cjs` + `drift-launch-count.cjs` + `run-drift.sh`, the RK-8 probes, sweeps, eslint.
  - `cr-qaf-probes/`: `test-placement.py`, the id-token capture, the avatar literals.
  - `cr-m5-probes/`, `cr-m6-probes/`, `cr-m4-probes/`, `cr-m1-probes/`.
- **Hazards.**
  - `prod.yml` holds a plaintext key, so never quote it.
  - A probe export or worktree with symlinked `node_modules` breaks eslint plugin resolution.
  - `convention-check.js` skips id-token in this workspace (no `TEST-CONVENTIONS.md`), so apply the class by hand.
  - Vitest probes can exit 1 with every case passing, so read the exit code.
  - In E-1, `/generate`'s HTTP status is decided by the S3 delete leg, so read the pool's `pending` for acquire state.
- **Questions out.** None.
