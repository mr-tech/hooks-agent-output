---
ID: 019
Origin: 019
UUID: 286c730a
Status: Resolved
Status-Detail: "Cycle 11 pass 2 on plan revision 18: APPROVED, and closed at that pass. F-1 to F-33, F-36, F-37, F-40 and F-45 are RESOLVED, each verified landed. F-34 (SL-11), F-35, F-38 (SL-12), F-39 (SL-13), F-41 (SL-15), F-42 (SL-16), F-43 (SL-17), F-44, F-46 (SL-19) and F-47 (SL-20) are Planner batch rows in the plan (R-32, R-41, R-63, R-69, R-71, revision 18's row). F-48 is closed by property with stated limit SL-21 and closes as landed-by-author; whether it is a further revision of AC-6.8 is with steering under its block 07:15Z. M7 is marked PREMISE-STALE (plan R-76) and was not reviewed. A later revision that changes a criterion's text opens cycle 12."
Artifact-Revision: 18 — read as the delta 34850209..18e434e6 (cycle 11 pass 2)
Reviewed-At: "18e434e6 — repos=agent-output; website read at 119471f"
Verdict: APPROVED
---

# Critique — Plan 019, Slate formatting on Discord's engine

**Artifact**: `planning/019-slate-formatting-discord-engine.md`, revision 18 (`18e434e6`). Revisions 1 and 2 were read whole
(passes 1 and 2); revision 3 as a delta with M5 and M6 whole (pass 3); revisions 4 to 18 as deltas.
**Read at cycle 11 pass 2**: the plan's diff `34850209..18e434e6`; effort rulings block 2026-11-24T07:15Z (record
`5638dfe6`) and the tail of block 07:13Z quoted in its diff; website at `119471f`: `withNormalizeNode.ts` at `splitCarrying`;
slate 0.123.0 from the website's `node_modules`, run on a plain editor (Appendix, "Slate probe").
**Read at cycle 11 pass 1**: the plan's diff `30e2a5b8..34850209`; QA's document at "Re-key on Revision 16" (QAF-43, QAF-44,
NM-70 to NM-72), as it stands at record `d53b1b30` or later; website at `119471f`: `withNormalizeNode.ts` at its
`editor.normalizeNode` override, `splitCarrying` and `resolveCarried`, `runUnit.ts` at `unitAround`, `vitest.config.ts` at
its project includes and `tsconfig.json` at its include and exclude lists.
**Read at cycle 10 pass 1**: the plan's diff `79eeced6..30e2a5b8`; the plan at `30e2a5b8` at every line holding "run unit";
effort rulings block 2026-11-24T07:05Z (record `3ec39942`); the code reviewer's captures under
`verification/019/code-review/m6-119471f/` (its README, the four `normalize-cost-*.out.txt` files and the tip probe); website
at `119471f`: `src/components/SlateEditor/utils/withNormalizeNode.ts` at `handleEditor`'s emoji loop and `resolveEmoji`,
`runUnit.ts` at `unitAround`, and `decorator.tsx` at its per-pass unit map.
**Read at cycle 9 pass 1**: the plan's diff `2c3c8d1a..79eeced6`; the plan at `79eeced6` at AC-6.5 and AC-6.7 whole; effort
rulings block 2026-11-24T04:18Z (record `56a44cc0`); QA's document at "QAF-40", "QAF-41" and "Re-key on Revision 15" (QAF-42),
as it stands at record `c1028a1d`; website at `2e36107`: `src/utils/markdown/engine.ts` at its import line; the pinned engine
(`@discord/markdown-wasm` 0.16.0 in the website's `node_modules`), run on the five new control members.
**Read at cycle 8 pass 1**: the plan's diff `f9b406d6..2c3c8d1a`; effort rulings block 2026-11-24T04:00Z; the plan at
`2c3c8d1a` at every line naming UAT as a walker, the Reading Order's `uat` row and Testing Strategy's walk list; website at
`2e36107`: `src/components/SlateEditor/utils/withNormalizeNode.ts` at `quotePrefixOf` and the `editor.apply` override;
`verification/019/qa/discord-quote-probe/walk.md` (record `1e84abe1`).
**Read at cycle 7 pass 1**: the plan's diff `b0af4dc3..f9b406d6`; effort rulings block 2026-11-24T03:55Z; website at `2e36107`:
`src/utils/markdown/__tests__/helpers/discordOracle.ts` at its import and export lines, and the presence of
`helpers/data/discordNativeBox.json`; the implementer's probe outputs `verification/019/impl/m6-box-emoji-probe-2e36107.json`
and `m6-box-emoji-entries-2e36107.json`; GLOSSARY, "Severity floor".
**Read at cycle 6 pass 1**: the plan's diff `ec2440d9..b0af4dc3`; the plan at `b0af4dc3` at "Visible form" and the class
table above it; QA's document and the architect's findings at their lines naming QAF-34 and CF-18;
`verification/019/analysis/an3/an3-legacy-corpus.json` for what a legacy atom node carries.
**Read at cycle 5 pass 1**: the plan's diff `890d0b78..ec2440d9`; the plan at `ec2440d9` at AC-3.7 whole, AC-3.4, AC-3.8,
"Adjustments toward legacy", M4's adjustment-module lines, outcome rows C5 and C6, RK-9, X-23 and the Reading Order; the two
measurement files the revision cites, `verification/019/impl/m4-residue-measurement-6379abc.json` and
`m4-dom-residue-before.json`, with their run logs, as they stand in the working tree (neither is in `HEAD` at `047add44`);
the M4 implementation document and the code-review document at their lines naming AC-3.7; the effort rulings file's block
headings from 22:00Z.
**Read at cycle 4 pass 1**: the plan's diff `47348a6d..890d0b78`; effort rulings blocks 21:18Z, 21:31Z and 21:38Z; the plan's
AC-6.3, AN-8 sign-in limb, Testing Strategy, Reading Order, X-14 and RK-8 as they stand at `890d0b78`; website at `5ec0621`:
`src/utils/markdown/rules.tsx` (the four mention rules), `src/providers/GuildProvider.tsx` whole,
`src/providers/WebhookProvider.tsx:useValue`, `src/utils/redis/index.ts:fetchChannels`, `src/app/_components/Providers.tsx`,
`src/app/message/layout.tsx`, the `src/app` layout and preview listing, `src/constants/index.ts` (the channel-type sets); website
at `7dcedc9`: `src/utils/markdown/engine.ts` (`MENTION_KINDS`, `STATIC_MENTION_KINDS`);
`verification/019/analysis/an3/an3-dom2.json` for the channel's drawn form.
**Read at cycle 3 pass 2**: the plan's diff `7b419f5b..47348a6d`; effort rulings block 18:02Z.
**Read at cycle 3 pass 1**: the plan's diff `e0eb1e87..7b419f5b`; effort rulings blocks 17:56Z and 17:58Z; website
`src/utils/loadLocales.ts` and its two importers, `MarkdownTimestamp.tsx` at its picker lines, and `pnpm-lock.yaml`'s dayjs
entry, all at `af3d95a`; `verification/019/qa/probe-r7-timestamp-locale.out`; GLOSSARY, "Severity floor".
**Read at cycle 2 pass 2**: the plan's diff `946d4e54..e0eb1e87`; `verification/019/planning/timestamp-s-S-dayjs-vs-intl.txt`;
website `MarkdownTimestamp.tsx` and `src/components/LoadLocale.tsx` at `af3d95a`.
**Read at cycle 2 pass 1**: the plan's diff `d2912590..946d4e54`; the analysis's AN-8 section at `3681654e` (limbs 1, 2 and
2b); website `src/utils/markdown/components/MarkdownTimestamp.tsx` at `af3d95a`.
**Read at cycle 1 pass 5**: the plan's diff `e53c7cdb..d2912590`; `verification/019/qa/probe-mask-vs-an3-table.r4.out`.
**Analysis**: `analysis/019-slate-formatting-discord-engine-analysis.md` (`3681654e`). AN-8's limbs 1 to 4 and 2b have landed;
limb 5 has not.
**Read at cycle 1 pass 4**: the plan's diff `9ac9ba62..e53c7cdb`; the analysis at its wasm-hash lines and AN-3's GAME_MENTION
row; QA's document at `24d537bf` for its GAME_MENTION finding; `verification/019/qa/probe-mask-vs-an3-table.out`; QA's P-Q9 row
for the 15,480 figure.
**Read at earlier passes**: listed in this critique at `af0b21d` (pass 3), `e3e49ac7` (pass 2) and `0435794c` (pass 1).
**Roadmap**: `roadmap/` holds no roadmap document, so alignment is judged against the rulings and the architecture record.
**Date**: 2026-11-23.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-23T16:11 | steering-hooks-fixer (brief `steering/019-brief-critic.md`) | cycle 1 pass 1: plan revision 1, whole-document read | Depth: whole-document, the cycle's first pass, at `103687b4`. New findings: F-1 to F-23 (3 HIGH, 15 MEDIUM, 5 LOW), all OPEN. Verdict REQUEST REVISION. |
| 2026-11-23T16:34 | planner-019 (message naming revision 2 at `8dfd4659`) | cycle 1 pass 2: plan revision 2, whole-document read | Depth: whole-document. Findings addressed: F-1 to F-5 and F-7 to F-23 RESOLVED (22). New findings: F-24 (MEDIUM), and F-25 and F-26, closed by property with stated limits SL-1 to SL-7. The stop authority fired on both. Verdict REQUEST REVISION. |
| 2026-11-23T17:19 | planner-019 (message naming revision 3 at `9ac9ba62`); steering-hooks-fixer (resume pointer after a clear) | cycle 1 pass 3: plan revision 3 | Resumed after a clear from this document's Resumption State at `c579526e`. Depth: delta-bounded, M5 and M6 read whole. Findings addressed: F-6, F-24, F-25 and F-26 RESOLVED. New findings: F-27 and F-28 (MEDIUM), F-30 (LOW); F-29 closed by property with stated limit SL-8; SL-9 under F-26's property. The stop authority fired on F-29. Verdict REQUEST REVISION. |
| 2026-11-23T17:27 | planner-019 (message naming revision 4 at `e53c7cdb`) | cycle 1 pass 4: plan revision 4 | Depth: delta-bounded. The delta `9ac9ba62..e53c7cdb` is 132 added and 75 removed lines over 1,083 (`git diff --numstat`, three commits, two of them registrations R-4 and R-5), fully readable as a diff; it reshapes no milestone. Boundary check by this pass's own instrument, the ID regex over both revisions computed in memory: none removed; added X-25 and X-26; no criterion ID added, and AC-2.3, AC-3.2, AC-3.7, AC-3.8, AC-4.7 and AC-6.5 changed in place, as the owed re-verdicts table lists. Artifact changes: the folds of pass 3, the architect's CF-9 and CF-10, QA's QAF-18 to QAF-22 and its GAME_MENTION mask finding. Findings addressed: F-27 to F-30 RESOLVED; SL-8 and SL-9 landed; the pass-3 assumption answered by AC-3.8 (i′) and X-26. New finding: F-31 (LOW), OPEN with a landing trigger. Verdict APPROVED. |
| 2026-11-23T17:31 | planner-019 (message naming revision 5 at `d2912590`) | cycle 1 pass 5: plan revision 5 | Depth: delta-bounded. The delta `e53c7cdb..d2912590` is 73 added and 35 removed lines (`git diff --numstat`, two commits, one of them registration R-6), fully readable as a diff; it reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed, none added. Artifact changes: AC-2.3 states six mask literals (and "seven masks" is corrected to six); AC-6.5's expected spans come from Discord's native box, with emoji edits added to its typed-edit class (the architect's CF-11, QA's QAF-23); M3's drift rule holds no gate on a live native-box departure under drift; F-31 is a Planner batch row and M4's mask line marks its premise not established. Findings addressed: F-31 carries its landing trigger in the plan. New findings: none. Verdict APPROVED. |
| 2026-11-23T17:31 | critic-019 | Document closed | Status: Resolved. Every finding is RESOLVED or, for F-31, carries a landing trigger recorded in the plan's Planner batch. |
| 2026-11-23T17:44 | planner-019 (message naming revision 6 at `946d4e54`) | cycle 2 pass 1: plan revision 6 | Reopened from `critiques/closed/` for cycle 2, which revision 6 opens by changing criterion text. Depth: delta-bounded; the delta `d2912590..946d4e54` is 99 added and 43 removed lines (`git diff --numstat`, four commits, three of them registrations R-7 to R-10), fully readable as a diff, and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed as a token (X-24 has no Exclusions row left and is named only where withdrawn); added EC-7, QA's entry condition. Artifact changes: AN-8 limbs 1 to 4 and 2b folded (AC-2.3's mask table, M4's mask line, AC-4.7, AC-6.3's provision step, X-14); AC-6.5's expected value split by surface with two entry conditions at M6 (the architect's CF-12, QA's EC-7, this critique's pass-5 assumption). Findings addressed: F-31 RESOLVED, read against the analysis. New finding: F-32 (LOW), OPEN. Verdict APPROVED. |
| 2026-11-23T17:54 | planner-019 (message naming revision 7 at `e0eb1e87`) | cycle 2 pass 2: plan revision 7 | Depth: delta-bounded; the delta `946d4e54..e0eb1e87` is 55 added and 18 removed lines (`git diff --numstat`, three commits, two of them registrations R-11 and R-12), fully readable as a diff, and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed, none added. Artifact changes: AC-4.7 marks `s` and `S` a deviation from the sibling table with its reason, follows the sibling in UTC before mount and in locale, and says what its test sets (the architect's CF-13, QA's QAF-25); AC-6.5's helper gains a mask control (QA's QAF-24) and cites the heading bit as read. Findings addressed: F-32 RESOLVED. New findings: none. Verdict APPROVED. |
| 2026-11-23T17:54 | critic-019 | Document closed | Status: Resolved. Every finding, F-1 to F-32, is RESOLVED and verified landed. |
| 2026-11-23T18:00 | planner-019 (message naming revision 8 at `7b419f5b`); steering-hooks-fixer (the M4 and M6 revision cap, effort rulings block 17:56Z) | cycle 3 pass 1: plan revision 8 | Reopened from `critiques/closed/` for cycle 3, which revision 8 opens by changing AC-4.7's text. Depth: delta-bounded; the delta `e0eb1e87..7b419f5b` is 60 added and 16 removed lines (`git diff --numstat`, four commits, three of them registrations R-13 to R-15), fully readable as a diff, and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed; added D-16. Artifact changes: AC-4.7 names the resolved dayjs locale and lists a fixture per branch (QA's QAF-26, the architect's CF-14); D-16 registers his picker selection; steering's revision cap is recorded as a scope constraint; QAF-27 is a stated limit. New finding: F-33 (MEDIUM), a further member of RK-8's class, closed by property with stated limit SL-10; the stop authority fired. Verdict APPROVED. Correction of this critique's own cycle 2 pass 2: it read the picker's key mapping and reported the cited sibling behaviours as holding, and did not read the clause "already omits `R`", which was false; steering found it. |
| 2026-11-23T18:04 | planner-019 (message naming revision 9 at `47348a6d`); steering-hooks-fixer (effort rulings block 18:02Z: read AC-4.7's delta only) | cycle 3 pass 2: plan revision 9 | Depth: delta-bounded, and bounded further to AC-4.7 by steering's decision. The delta `7b419f5b..47348a6d` is 52 added and 18 removed lines (`git diff --numstat`, four commits, three of them registrations R-16 to R-18). Boundary check: the in-memory ID regex over both revisions shows none removed and none added, and the diff, read whole, changes no criterion but AC-4.7; its other hunks are the header, the owed re-verdicts table, steering's 18:02Z constraint beside the Decisions Register, RK-8's record, the disposition table and Planner batch rows. Findings addressed: F-33 RESOLVED, SL-10 discharged into AC-4.7's text. New findings: none. Verdict APPROVED. |
| 2026-11-23T18:04 | critic-019 | Document closed | Status: Resolved. Every finding, F-1 to F-33, is RESOLVED and verified landed. |
| 2026-11-23T21:41 | planner-019 (message naming revision 10 at `890d0b78`) | cycle 4 pass 1: plan revision 10 | Resumed after a clear from this document's Resumption State; nothing written before the clear was re-verified, and this pass's claims are its own reads. Cycle 4 opens because revision 10 changes AC-4.4's text. Depth: delta-bounded; the delta `47348a6d..890d0b78` is 100 added and 17 removed lines (`git diff --numstat`, 13 commits, 12 of them registrations R-19 to R-30), fully readable as a diff, and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed; added D-17. The diff, read whole, changes no criterion but AC-4.4; its other hunks are the header, the changelog, the Resumption State, the owed re-verdicts table, register row D-17, G-13's carriage line, M4's Mirrors line and Planner batch rows. Artifact changes: AC-4.4 is D-17's decision table over the eight mention kinds, with its list source, deviations, residue and walk; the resolved-role and resolved-command limbs are gone. New findings: F-34 (LOW), one more member of RK-8's class, closed by property with stated limit SL-11, the stop authority firing; F-35 (MEDIUM), for the Planner batch. Verdict APPROVED. |
| 2026-11-23T21:41 | critic-019 | Document closed | Status: Resolved, set at the approving pass and edited in `critiques/closed/` without a move. F-34 is closed by property. F-35 closes as landed-by-author, its discharging document the plan's Planner batch. |

| 2026-11-23T22:32 | planner-019 (message naming revision 11 at `ec2440d9`) | cycle 5 pass 1: plan revision 11 | Cycle 5 opens because revision 11 changes AC-3.7's text. Depth: delta-bounded; the delta `890d0b78..ec2440d9` is 49 added and 17 removed lines (`git diff --numstat`, 10 commits, 9 of them registrations), fully readable as a diff, and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed, none added. The diff, read whole, changes no criterion but AC-3.7; its other hunks are the header, the changelog, the owed re-verdicts table and Planner batch rows, which register this critique's F-34 and F-35 among others. Artifact changes: AC-3.7's frozen residue list holds one literal entry per differing input, per surface and mask, each with a family and a reason; a stale entry fails; RK-9's count is entries per surface. New findings: F-36 (MEDIUM) and F-37 (LOW), both for the Planner batch. Verdict APPROVED. |
| 2026-11-23T22:32 | critic-019 | Document closed | Status: Resolved, set at the approving pass and edited in `critiques/closed/` without a move. F-36 and F-37 close as landed-by-author, their discharging document the plan's Planner batch. |

| 2026-11-23T22:35 | planner-019 (message naming revision 12 at `b0af4dc3`) | cycle 6 pass 1: plan revision 12 | Cycle 6 opens because revision 12 changes AC-3.7's text. Depth: delta-bounded; the delta `ec2440d9..b0af4dc3` is 42 added and 9 removed lines (`git diff --numstat`, 3 commits, 2 of them registrations R-37 and R-38), fully readable as a diff, and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed, none added. The diff, read whole, changes AC-3.7 and RK-9 and no other criterion; its other hunks are the header, the changelog, the Reading Order's `code-reviewer` row, the owed re-verdicts table and Planner batch rows. Artifact changes: atom-bearing inputs join AC-3.7's population with an atom unit compared on kind and source span; a family check; M4 measures every input over every mask and exercises the two new limbs; RK-9 gains a fire condition and a route. Findings addressed: F-36 and F-37 RESOLVED. New findings: F-38 (MEDIUM) with stated limit SL-12, and F-39 (LOW), both for the Planner batch. Verdict APPROVED. |
| 2026-11-23T22:35 | critic-019 | Document closed | Status: Resolved, set at the approving pass and edited in `critiques/closed/` without a move. F-38 and F-39 close as landed-by-author, their discharging document the plan's Planner batch. |

| 2026-11-24T04:00 | planner-019 (message naming revision 13 at `f9b406d6`) | cycle 7 pass 1: plan revision 13 | Cycle 7 opens because revision 13 changes AC-6.5's text. Depth: delta-bounded; the delta `b0af4dc3..f9b406d6` is 139 added and 53 removed lines (`git diff --numstat`, 25 commits, 24 of them registrations and Status writes), fully readable as a diff, and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed; added D-18 to D-21, and X-27 as a Planner batch row's future Exclusions row. The diff, read whole, changes no criterion but AC-6.5; its other hunks are the header, the changelog, the Resumption State, the owed re-verdicts table, register rows D-18 to D-21, the two cap notes beside the register and Planner batch rows. Artifact changes: AC-6.5's expected spans come from AC-2.1's oracle helper on every surface, frozen as literals, with a hand-written content control in place of the box's and QAF-24's mask control kept; the box entry condition is recorded false and EC-7 is retired. New finding: F-40 (LOW), a stated limit under the cap on M6. Verdict APPROVED. |
| 2026-11-24T04:00 | critic-019 | Document closed | Status: Resolved, set at the approving pass and edited in `critiques/closed/` without a move. F-40 closes as landed-by-author, its discharging document the plan's Planner batch. |

| 2026-11-24T04:06 | planner-019 (message naming revision 14 at `2c3c8d1a`) | cycle 8 pass 1: plan revision 14 | Cycle 8 opens because revision 14 adds AC-6.7 and changes AC-3.3's and AC-6.5's text. Depth: delta-bounded; the delta `f9b406d6..2c3c8d1a` is 67 added and 7 removed lines (`git diff --numstat`, 3 commits, 2 of them registrations), fully readable as a diff. It adds one criterion to M6 and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed; added AC-6.7 and D-22. The diff, read whole, changes AC-3.3's typed limb, AC-6.5's control and adds AC-6.7; its other hunks are the header, the changelog, the Resumption State, the owed re-verdicts table, register row D-22 and Planner batch rows. Artifact changes: AC-6.7 is D-22's decision table for Enter, a paste and a typed `> ` on a carried line; AC-3.3's typed drive follows it; AC-6.5's control gains the cross-line bold member. Findings addressed: F-40 RESOLVED. New findings: F-41 (LOW), the second instance of F-35's shape, closed by property with stated limit SL-15, the stop authority firing; F-42 (MEDIUM) with stated limit SL-16. Verdict APPROVED. |
| 2026-11-24T04:06 | critic-019 | Document closed | Status: Resolved, set at the approving pass and edited in `critiques/closed/` without a move. F-41 and F-42 close as landed-by-author, their discharging document the plan's Planner batch. |

| 2026-11-24T04:22 | planner-019 (message naming revision 15 at `79eeced6`) | cycle 9 pass 1: plan revision 15 | Resumed after a clear from this document's Resumption State at `8af264cb`; nothing written before the clear was re-verified, and this pass's claims are its own reads. Cycle 9 opens because revision 15 changes AC-6.5's, AC-6.7's and AC-3.3's text. Depth: delta-bounded; the delta `2c3c8d1a..79eeced6` is 39 added and 8 removed lines (`git diff --numstat`, 7 commits, 6 of them registrations), fully readable as a diff, and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed; added NM-68 and NM-69, and B-9, SL-15 and SL-16 in registration rows. The diff, read whole, changes AC-6.5's control, AC-6.7's "Seen red" and AC-3.3's drive clause; its other hunks are the header, the changelog, the Resumption State, the owed re-verdicts table and Planner batch rows. Artifact changes: AC-6.5's control gains five members and a first-occurrence join mutant (QAF-40, steering block 04:18Z); AC-6.7 gains NM-68 and NM-69; AC-3.3's drive computes the table over the input's text. New findings: F-43 (LOW), the second instance of QAF-42's shape, closed by property with stated limit SL-17, the stop authority firing; F-44 (LOW), a duplicate of QAF-42. Verdict APPROVED. |
| 2026-11-24T04:22 | critic-019 | Document closed | Status: Resolved, set at the approving pass and edited in `critiques/closed/` without a move. F-43 and F-44 close as landed-by-author, their discharging document the plan's Planner batch. |

| 2026-11-24T07:10 | planner-019 (message naming revision 16 at `30e2a5b8`) | cycle 10 pass 1: plan revision 16 | Cycle 10 opens because revision 16 adds AC-6.8. Depth: delta-bounded; the delta `79eeced6..30e2a5b8` is 73 added and 10 removed lines (`git diff --numstat`, 13 commits, 12 of them registrations and verdict rows), fully readable as a diff. It adds one criterion to M6 and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed; added AC-6.8 and D-23, and CR-20, CR-21 and SL-17 in registration rows. The diff, read whole, adds AC-6.8 and register row D-23; its other hunks are the header, the changelog, the Resumption State, the owed re-verdicts table, M7's `PREMISE-STALE` mark (R-76) and Planner batch rows. Artifact changes: AC-6.8 bounds one keystroke's normalise cost by a count limb in the suite and a timed limb outside it, on his 07:05Z selection. M7 is out of scope for this pass. New finding: F-45 (MEDIUM), the second instance of F-42's shape, closed by property with stated limit SL-18, the stop authority firing; AC-6.8's walk is a seventh member under SL-15. Verdict APPROVED. |
| 2026-11-24T07:10 | critic-019 | Document closed | Status: Resolved, set at the approving pass and edited in `critiques/closed/` without a move. F-45 closes as landed-by-author, its discharging document the plan's Planner batch. |

| 2026-11-24T07:14 | planner-019 (message naming revision 17 at `34850209`) | cycle 11 pass 1: plan revision 17 | Cycle 11 opens because revision 17 changes AC-6.8's text. Depth: delta-bounded; the delta `30e2a5b8..34850209` is 46 added and 20 removed lines (`git diff --numstat`, 2 commits, 1 of them a registration), fully readable as a diff, and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed; added NM-72 and B-10, and CF-25, CF-26, QAF-43, QAF-44 and SL-18 in registration rows. The diff, read whole, changes AC-6.8 only; its other hunks are the header, the changelog, the owed re-verdicts table and Planner batch rows. Artifact changes: the count limb is an equality per pass with a positive control and a `vi.mock` observation, its window, character and positions are fixed, a 1,000-line `a🙂` text joins both limbs, and the timed limb's home is a bench file. Findings addressed: F-45 RESOLVED. New findings: F-46 (MEDIUM), three new members under F-45's property, stated limit SL-19; F-47 (LOW), stated limit SL-20. M7 is out of scope for this pass. Verdict APPROVED. |
| 2026-11-24T07:14 | critic-019 | Document closed | Status: Resolved, set at the approving pass and edited in `critiques/closed/` without a move. F-46 and F-47 close as landed-by-author, their discharging document the plan's Planner batch. |

| 2026-11-24T07:19 | planner-019 (message naming revision 18 at `18e434e6`; steering block 07:15Z asks for it inside the current read) | cycle 11 pass 2: plan revision 18 | Taken as pass 2 of cycle 11, as block 07:15Z asks, though pass 1 had closed. Depth: delta-bounded; the delta `34850209..18e434e6` is 24 added and 12 removed lines (`git diff --numstat`, 3 commits, 2 of them registrations), fully readable as a diff, and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed; added CF-27, F-46, F-47, SL-19 and SL-20, all in registration rows. The diff, read whole, changes AC-6.8's window and property lines only; its other hunks are the header, the changelog, the Resumption State, the owed re-verdicts table and Planner batch rows. Artifact changes: the count window is one `Editor.normalize` drain and the literal is the lines the keystroke dirties (1, 2, 1). Findings addressed: F-46 (1) and (3) are superseded by the new literal, and (2) stands as SL-19. New finding: F-48 (MEDIUM), the second instance of CF-27's shape, closed by property with stated limit SL-21, the stop authority firing; it is sent to steering under block 07:15Z. Verdict APPROVED. |
| 2026-11-24T07:19 | critic-019 | Document closed | Status: Resolved, set at the approving pass and edited in `critiques/closed/` without a move. F-48 closes as landed-by-author, its discharging document the plan's Planner batch. |

## Verdict

**APPROVED — cycle 11, pass 2.** The stop authority fired on one shape (F-48). The hard stop did not fire (pass 2 of 15 in
this cycle). Pricing: sized to the ask plus his rulings. Revision 18 changes two lines of the one criterion his 07:05Z
selection added. It is the count limb's third text in three revisions, and the question that follows from that is routed
below.

CR-20's fix round is released by this gate only as read with SL-21, and steering holds the call on whether SL-21 is a
revision. The architect's and QA's reads of revision 18 are separate.

What holds in revision 18's delta:
- **The fold is the block's.** Only AC-6.8's window and literal move, to the reading block 07:15Z names.
- **The window is a unit Slate has.** Run in this pass on slate 0.123.0: one keystroke's `normalize` calls `normalizeNode`
  for each dirty text, line and the editor.
- **Two of the three literals are what a plain editor does.** An in-line insert or delete sends 1 line to `normalizeNode`,
  and Enter sends 2.
- **The red tree is still red**: at `119471f` the per-line loop adds one build for every line.

**Stop authority: F-48.** The literal still rejects a correct fix for some keystrokes in the class, which is CF-27's shape
again, folded one revision ago. Run in this pass: a merge sends its one line to `normalizeNode` twice, against the literal 1,
and Enter followed by the marker write `splitCarrying` makes on a `> ` line sends lines 3 times over two drains, against the
literal 2. It is not sent back by this gate. The class is stated once as a property over the seven keystroke cases, checked
by the probe, and the gap is stated limit SL-21 with its bearer.

**Routed to steering, not to the owner by this gate.** Block 07:15Z says a reading that replaces a criterion's literal is a
criterion change. SL-21 is such a reading, so whether it is revision 19 or stays a limit is steering's ruling. The scope
question goes with it: three revisions have gone to the exact count per keystroke kind, which QAF-43 added and his option
text ("a test that counts that work") did not ask for in that form. Whether the exact literal should stay, or the limb
should return to a bound with QAF-43's positive control, is put to steering as a selection. Classed ship: the fix round
shows a wrong literal as a red case within its first run, and nothing ships on it.

**F-46**: (1) and (3) are superseded, as the plan's row says, and (2) stands as SL-19. The row keeps the implementer's
two-unit exhibit; under the new literal nothing depends on it.

**M7 is out of scope for this pass** (`PREMISE-STALE`, R-76).

**RK-8, the class from pass 1: no new member found by this pass.**

`Target-Release` is unchanged. No `OPEN QUESTION` is unresolved (0 of 7 lines without `[RESOLVED]` or `[CLOSED]`, counted in
memory over the plan at `18e434e6`).

The cycle 11 pass 1 verdict follows, as written at that pass.

**APPROVED — cycle 11, pass 1.** The stop authority stays fired on F-45's shape, and its new members are stated limits
(F-46). The hard stop did not fire (pass 1 of 15 in this cycle). Pricing: sized to the ask plus his rulings. Revision 17
tightens the one criterion his 07:05Z selection added, and adds no criterion, milestone or instrument beyond a bench file
for the timed limb.

CR-20's fix round is released by this gate, read with SL-19 and SL-20. The architect's and QA's reads of revision 17 are
separate.

What holds in revision 17's delta:
- **F-45 is resolved.** The window is one pass and holds in every pass, the inserted character completes no emoji and no
  fence with the rest named as residue under AC-6.5, and a one-character line runs at start and end.
- **The count can now fail both ways.** It is an equality with a hand-written literal, and a positive control in the same
  run counts 1, so a counter on a function nobody calls fails (QAF-43).
- **The observation stays out of `src`**: a `vi.mock` pass-through of `./runUnit`, where `unitAround` is the one export the
  normaliser, the lift and the decorator all import at `119471f`.
- **The red tree is still red.** At `119471f` an in-line insert builds once in `handleElement` and once per line in
  `handleEditor`, against the literal 1.
- **The emoji text closes QAF-44's gap**: 1,000 lines of `a🙂` puts an element on every line in both limbs.
- **The walk has its row**: B-10, named as SL-15's seventh member.

**F-46** (MEDIUM): the equality makes three terms matter that the upper bound let pass. No keystroke in the class can leave
two run units holding a changed line, so the literal 2 and NM-72's fixture have no member; a delete can open or close a
fence, which the residue names only for an insert; and "pass" has no boundary the text names. These are new members under
F-45's property, and they are stated limit SL-19 with its bearer, not a revision. A third revision of AC-6.8 would be
steering's to decide.

**F-47** (LOW): the bench file's home, "beside the code", is inside the production type-check unless it sits under
`__tests__/`. Stated limit SL-20.

**M7 is out of scope for this pass.** It is marked `PREMISE-STALE` (R-76), and its re-argument is owed from the planner as a
revision at the seam fold, before devops Stage 1.

**RK-8, the class from pass 1: no new member found by this pass.**

`Target-Release` is unchanged. No `OPEN QUESTION` is unresolved (0 of 7 lines without `[RESOLVED]` or `[CLOSED]`, counted in
memory over the plan at `34850209`). Routed to the owner: nothing.

The cycle 10 verdict follows, as written at that pass.

**APPROVED — cycle 10, pass 1.** The stop authority fired on one shape (F-45). The hard stop did not fire (pass 1 of 15 in
this cycle). Pricing: sized to the ask plus his rulings. Revision 16 adds one criterion to M6 on his 07:05Z selection, whose
option text priced "a limit on how long one keystroke may take" and "a test that counts that work".

CR-20's fix round is released by this gate, read with SL-18. The architect's and QA's reads of revision 16 are separate.

What holds in revision 16's delta:
- **D-23** carries the option text of effort rulings block 07:05Z word for word, with the option not chosen. AC-6.8 names
  the row. The cap is lifted for CR-20 alone, as the block says.
- **The defect is where the plan says.** At `119471f`, `handleEditor` calls `resolveEmoji` once for every line, and each
  call builds the whole run unit with `unitAround`. A unit is every adjacent line that is not a code block, so a plain text
  of N lines builds an N-line unit N times.
- **The count limb is red on that tree.** Its bound is 2 builds, and the tip does one per line, on every text in the class
  of three lines or more.
- **The bound separates the two trees.** The reviewer's captures, read in this pass, give the tip 20 ms at 200 lines, 70 to
  75 ms at 400 and 413 ms at 1,000, and the base 1.1 ms at 400 and 2.1 ms at 1,000. Steering's re-timing in the block gives
  the same order. 16 ms sits between them from 200 lines up, and its reason, one 60 Hz frame, is stated.
- **The timed limb says what it is**: outside `pnpm test`, run in M6's fix round by the implementer and at Phase 2 by QA,
  with a route to steering if the fixed tree misses the bound. The count limb is the standing instrument.
- **The colouring is not a second copy of the defect.** `decorator.tsx` keeps one unit per decorate pass in a map keyed by
  line, so it builds each unit once.
- **The residue is stated**: node is the instrument, and the browser's cost is unmeasured, with a walk on UAT's build.

**Stop authority: F-45.** The count limb's expected literal depends on three terms its text does not fix. That is F-42's
shape again, which was raised on AC-6.7 at cycle 8 and registered. It is not sent back. The class is stated as a property
over the terms the literal depends on, checked in this pass, and its gaps are stated limit SL-18 with its bearer. It is
MEDIUM, and after implementation approval a revision is asked for only on HIGH or above.

**SL-15, a seventh member.** AC-6.8's human-observable form is walked "on UAT's local build", and neither the `uat` row nor
the walk list names it. SL-15 already bears it: QA registers the walk at its re-key on revision 16, and the fold names all
seven.

**M7 is out of scope for this pass.** It is marked `PREMISE-STALE` (R-76), and its re-argument is owed from the planner as a
revision at the seam fold, before devops Stage 1.

**RK-8, the class from pass 1: no new member found by this pass.**

`Target-Release` is unchanged. No `OPEN QUESTION` is unresolved (0 of 7 lines without `[RESOLVED]` or `[CLOSED]`, counted in
memory over the plan at `30e2a5b8`). Routed to the owner: nothing.

The cycle 9 verdict follows, as written at that pass.

**APPROVED — cycle 9, pass 1.** The stop authority fired on one shape (F-43). The hard stop did not fire (pass 1 of 15 in this
cycle). Pricing: sized to the ask plus his rulings. Revision 15 adds members and mutants to two existing criteria and one
clause to a third, on steering's block 04:18Z, and adds no criterion, milestone or instrument.

AC-6.5's literal freeze is released by this gate, read with SL-17. The architect's and QA's reads of revision 15 are separate.

What holds in revision 15's delta:
- **The fold is the remedy the block names.** AC-6.5's control carries the block's five members and its mutant, word for
  word. Remedy (a) is not taken, and the Planner batch row says why.
- **The engine premise is true.** Run in this pass on the pinned engine (0.16.0, `parse`, default flags): `😄:smile:`,
  `:smile:😄` and `😄😄` return one identical tree, two emoji nodes of value `😄` with no span, and `\*a😄` and `a\_b😄` return
  the texts `*a` and `a_b` followed by one emoji node.
- **The mutant can fail on the three side-by-side members.** A join that takes each value at its first occurrence gives
  both nodes of each member one span, and the literals hold two.
- **Remedy (a) stays open to the helper, as the batch row says.** At `2e36107`, `engine.ts` imports `parseLossless` from
  `@discord/markdown-wasm`, the helper's one permitted import. The five members and their literals bind either way.
- **AC-3.3's drive clause** makes the test decide carry, replace or remove from AC-6.7's table over the input, so a wrong
  carry is no longer written back as the same text. The table is the criterion's, not production's, and the expected values
  stay literals composed from the keys sent.
- **The owed re-verdicts table** has a row for revision 15, and the rows for 13 and 14 say what each gate found.

**Stop authority: F-43.** "Seen red on them" names five members, and the mutant cannot be red on two of them. QA's QAF-42,
raised on this revision and registered at R-69, is the same shape on NM-68 and NM-69 (F-44). Neither is sent back. The class
is stated as a property over every mutant and fixture pair the delta names, checked in this pass, and its gaps are stated
limit SL-17 with its bearer. Under block 04:18Z a further AC-6.5 gap below HIGH is a stated limit, and M6 is capped.

Wording for the seam fold, with no finding: AC-6.7's "Seen red" still says "by three mutants" above five.

**RK-8, the class from pass 1: no new member found by this pass.**

No milestone is marked `PREMISE-STALE` by this delta. `Target-Release` is unchanged. No `OPEN QUESTION` is unresolved (0 of 7
lines without `[RESOLVED]` or `[CLOSED]`, counted in memory over the plan at `79eeced6`). Routed to the owner: nothing.

The cycle 8 verdict follows, as written at that pass.

**APPROVED — cycle 8, pass 1.** The stop authority fired on one shape (F-41). The hard stop did not fire (pass 1 of 15 in this
cycle). Pricing: sized to the ask plus his rulings. Revision 14 adds one criterion to M6 on his 04:00Z selection, which the
option text priced as one revision, and changes the typed drive that selection made wrong.

M6's quote-carry change and its four red cases are released by this gate, read with SL-16. The architect's and QA's reads of
revision 14 are separate.

What holds in revision 14's delta:
- **D-22** carries the option text of effort rulings block 04:00Z word for word, with the option not chosen. AC-6.7 names
  the row.
- **The table covers every line kind against every action**: four line kinds by three actions, with "does not arise" where
  no carried marker can exist.
- **The two Discord cells are what QA's walk shows**: after `> a` and a line break, `b` is drawn inside the quote (step 1),
  and a pasted `> a⏎b` leaves line 2 plain (step 3). The walk says the raw text was inferred from rendering, and the plan's
  residue says the same and rests no criterion on it.
- **The Enter column's code claim holds.** At `2e36107`, `withNormalizeNode.ts`'s `editor.apply` override passes a split
  line's `quotePrefix` on with any leading `>>> ` removed.
- **The typed drive can still fail.** It removes a carried marker only where the table carries one, so a marker carried
  anywhere else breaks the identity. Its removal gesture has a positive control.
- **Three mutants** are named, one per column, and the expected values are literals composed from the keys sent.
- **F-40 is resolved**: AC-6.5's control lists each emoji form on the second line of a bold run, and the owed re-verdicts
  cell no longer says EC-7 is pending.

**Stop authority: F-41.** AC-6.7's walk is "on UAT's local build", and neither the Reading Order's `uat` row nor Testing
Strategy's walk list names AC-6.7. That is F-35's shape again, which was raised on AC-4.4 at cycle 4 and parked for the seam
fold. It is not sent back. The class is stated as a property over every criterion that names UAT as its walker, checked in
this pass, and its gaps are stated limit SL-15 with its bearer.

**F-42** (MEDIUM) is a stated limit under the cap on M6 (effort rulings block 00:49Z): the table leaves three states to the
implementer, the first of which is how a user ends a continued quote.

**RK-8, the class from pass 1: no new member found by this pass.**

No milestone is marked `PREMISE-STALE` by this delta. `Target-Release` is unchanged. No `OPEN QUESTION` is unresolved (0 lines
without `[RESOLVED]` or `[CLOSED]`, counted in memory over the plan at `2c3c8d1a`). Routed to the owner: nothing.

The cycle 7 verdict follows, as written at that pass.

**APPROVED — cycle 7, pass 1.** Neither the stop authority nor the hard stop fired (pass 1 of 15 in this cycle). Pricing: sized
to the ask plus his rulings. Revision 13 replaces one expected-value source that turned out not to exist, on his 03:55Z
selection, and adds no criterion, milestone or instrument.

AC-6.5's literals are released by this gate. The architect's and QA's reads of revision 13 are separate.

What holds in revision 13's delta:
- **D-21** carries the option text of effort rulings block 03:55Z word for word, with the option not chosen. The pick is
  marked as the planner's.
- **The box premise is false, as the plan says.** This pass tallied the implementer's two probe files: 12 inputs, every
  entry's keys are `text`, `start` and `attributes`, the attributes name only `strong`, `inlineCode`, `link` and their
  syntax markers, no key is `emoji`, and the exports are `Sd`, `p0` and `tA`.
- **The helper is independent of the adapter and the lift.** At `2e36107`, `discordOracle.ts` has one import,
  `{ parse, Syntax }` from `@discord/markdown-wasm`, and `nativeSurfaceParse` calls `parse` with a literal mask.
- **The plan says what the property no longer tests.** The engine decides what is an emoji on both sides, which is D-13's
  choice. The property tests the lift's run unit, placeholders, offsets and re-deciding. The comparison with what Discord's
  own client lifts is stated as residue, with the row a user report goes to.
- **The content control is a finite listed class** with a route: a literal that differs from the helper goes to steering
  before the freeze.
- **The frozen form names its sibling**, `helpers/data/discordNativeBox.json`, which is in the tree at `2e36107`.
- **EC-7's retirement follows**: it compared the lift with the box, and the box marks no emoji.
- **Candidates (B) and (C)** were declined with reasons in changelog row 13. Neither changes what D-13 described.

One finding, **F-40** (LOW), is a stated limit under the cap on M6 (effort rulings block 00:49Z) and takes no revision round.

**RK-8, the class from pass 1.** One member in this delta, found by the plan's own entry condition and not by this pass: AC-6.5
at revision 5 took the box to expose emoji spans. This critique's cycle 1 pass 5 assumption named it, revision 6 made it an
entry condition, and the implementer's probe closed it at M6.

No milestone is marked `PREMISE-STALE` by this delta. `Target-Release` is unchanged, and D-19 keeps one release. No `OPEN
QUESTION` is unresolved (0 lines without `[RESOLVED]` or `[CLOSED]`, counted in memory over the plan at `f9b406d6`). Routed to
the owner: nothing.

The cycle 6 verdict follows, as written at that pass.

**APPROVED — cycle 6, pass 1.** Neither the stop authority nor the hard stop fired (pass 1 of 15 in this cycle). Pricing: sized
to the ask plus his rulings. Revision 12 widens AC-3.7's population to the class the criterion already named, and adds one
data-shape check, two exercises at M4 and a route for RK-9. This is the second revision in a row spent on the residue list's
own checks. A further limb on the list would be growth beyond the ask, and a question for him, not a fold.

M4's residue-list commit is released by this gate, read with SL-12. The architect's and QA's reads of revision 12 are
separate.

What holds in revision 12's delta:
- **F-36 is resolved.** The figures name their subset (1,344 and 1,545 of 2,378), the plan says the full count is not yet
  known, and M4 measures every input over every surface and mask, both field name masks included, records the count before
  and after adjustment, and commits the files.
- **F-37 is resolved.** Changelog row 12 names D-14 for revision 11. The `code-reviewer` row says families. M4 runs the
  stale-entry and family limbs against a real member and a real non-member each.
- **Atoms are in the population**, which closes cycle 5 pass 1's assumption in the plan's text. What an atom resolves to is
  left to AC-4.3, AC-4.4, AC-4.7 and CF-10, each of which covers its kind on these surfaces.
- **RK-9's route re-raises nothing.** It tells him the count D-14 left unmeasured and sets no threshold, since D-14 reopens
  on his withdrawal only.

Two findings go to the Planner batch and take no revision round:
- **F-38** (MEDIUM). The atom unit agrees on "kind and source span". Discord's legacy tree carries no span, so the legacy side
  of that comparison has nothing to give. Stated limit SL-12 gives the reading M4 builds to.
- **F-39** (LOW). The family check compares against a set "the implementation document" states, which a test in the website
  cannot read; and RK-9's route does not say what, if anything, waits on his answer.

**RK-8, the class from pass 1: no new member found by this pass.**

No milestone is marked `PREMISE-STALE` by this delta. `Target-Release` is unchanged. No `OPEN QUESTION` is unresolved (0 lines
without `[RESOLVED]` or `[CLOSED]`, counted in memory over the plan at `b0af4dc3`). Routed to the owner: nothing by this pass.
RK-9's own route sends him the M4 counts through steering when they exist.

The cycle 5 verdict follows, as written at that pass.

**APPROVED — cycle 5, pass 1.** Neither the stop authority nor the hard stop fired (pass 1 of 15 in this cycle). Pricing: sized
to the ask plus his rulings; revision 11 changes the form of one test-data list and adds no criterion, milestone or instrument.

M4's residue-list commit is released by this gate. The architect's and QA's reads of revision 11 are separate.

What holds in revision 11's delta:
- **The literal form is the stricter one.** An input that differs with no entry fails, and so does an entry whose difference
  is not exactly its signature. That is the property F-29 closed on, with the class an entry names narrowed to one input.
- **A stale entry fails**, so the list cannot keep an excuse the site no longer needs, and a change of generator, seed or
  count is loud.
- **The figures are the file's.** This pass tallied `m4-dom-residue-before.json` by its own count of class members: 500, 501,
  818, 354 and 500 differing inputs, in 148, 151, 174, 132 and 148 classes, each member distinct. They match the plan.
- **No standing verdict expires.** The site-DOM limb of AC-3.7 and the list are M4's work (M4 implementation document, "Not
  built yet"; code-review document, Round 3), so M3's review at `2c1590f` did not rest on the list's form.
- **The adjustment rule is untouched.** B3's condition (b) and AC-3.8 (ii) still address an adjustment by its own tree
  predicate. The list's entries no longer carry one.
- **The family set has its producing step**: the implementation document at M4 states each family once, with its reason and
  its member count per surface.

Two findings go to the Planner batch and take no revision round, since after implementation approval only a HIGH or CRITICAL
finding does:
- **F-36** (MEDIUM). The revision's figures read "500 of 1,344 inputs". The file's own fields say 1,344 is the inputs with no
  atom, out of 2,378. AC-3.7 covers all 2,378, so the entry count the list will reach is not stated.
- **F-37** (LOW). Three wordings the revision left behind.

Stated limits under F-29's property, with their bearers:
- A commit that re-measures the list changes thousands of literal lines. Its reviewer reads the families and their counts and
  samples entries, as AC-3.7 says. A change inside entries that are already listed, made in that same commit, is seen only
  where a sampled entry shows it. Code review of that commit bears it, and reports a family whose count moved without a stated
  cause.
- AC-3.7 now speaks for the generator at its committed seed and count. It says nothing about another seed until the list is
  re-measured for it.

**RK-9.** The count before adjustment is now measured on the inputs without atoms: 37% on the description, field value and V2
text display, 53% on the title, and 23% on the title with an embed url (500, 501 and 500 of 1,344; 818 and 354 of 1,545). The
corpus members among them are 37, 33, 53, 35 and 37, close to the counts AN-3 gave before D-14 was selected (37, 32, 54, 37,
37). D-14 accepted the residue as unmeasured, and no evidence in its reopening class is new, so nothing is re-raised. The
count after adjustment, at M4, is still RK-9's read.

**RK-8, the class from pass 1: no new member found by this pass.** The plan's R-35 row records one the implementer found
(`jumboify` has no caller).

No milestone is marked `PREMISE-STALE` by this delta. `Target-Release` is unchanged. No `OPEN QUESTION` is unresolved (0 lines
without `[RESOLVED]` or `[CLOSED]`, counted in memory over the plan at `ec2440d9`). Routed to the owner: nothing.

The cycle 4 verdict follows, as written at that pass.

**APPROVED — cycle 4, pass 1.** The stop authority fired on one shape (F-34). The hard stop did not fire (pass 1 of 15 in this
cycle). Pricing: sized to the ask plus his rulings; revision 10 changes one criterion inside M4 on his 21:31Z selection, removes
two limbs and adds one lookup over data the site already holds. The thread lookup and the `#` prefix are the planner's readings
inside his option's words, recorded as his to veto (effort rulings block 21:38Z).

M4's mention code is released by this gate. The architect's and QA's reads of revision 10 are separate.

What holds in revision 10's delta:
- **D-17** carries the option text of effort rulings block 21:31Z word for word, with the three options not chosen, and its
  reopening clause quotes the option's own cost sentence. AC-4.4 names the row.
- **The decision table is total.** `MENTION_KINDS` at `7dcedc9` has eight members (`user`, `channel`, `role`, `game`, `command`,
  `everyone`, `here`, `static`) and `STATIC_MENTION_KINDS` five. Each has a row, and `channel` has both of its cases.
- **"Today's form" is what the code draws.** At `5ec0621` the four rules `discordChannel`, `discordRole`, `discordUser` and
  `discordEveryone` each render their capture and resolve no id. The classes in the table are the classes in the rules, and
  `rules.tsx` has no command rule.
- **The list is where the plan says.** `GuildProvider` is mounted once, in `Providers`, which only `src/app/message/layout.tsx`
  uses. `src/app/preview/page.tsx` sits outside it, and `useGuild` throws without the provider. With no session, no guild or
  no data, `channels` is an empty array, so every "no list in reach" case in row 2 reduces to "the id is not on the list".
- **The residue's timings** are the code's: `staleTime` of 5 minutes with `refetchOnWindowFocus: false`, and `expireSeconds: 10`
  in `fetchChannels`.
- **The deviations are marked**: the `#` prefix in place of Discord's icon (the capture shows an icon, then
  `slate-oracle-walk`), and the lookup inside `threads`, which `attachChannelsToWebhooks` does not do.

**Stop authority: F-34.** AC-4.4's residue says "Forum, category and archived thread ids are not on the list". Forum ids are on
it: `fetchChannels` keeps a channel whose type is in `TEXT_CHANNEL_TYPES` or `VOICE_CHANNEL_TYPES`, and
`src/constants/index.ts` at `5ec0621` defines those as `[0, 5, 15]` and `[2, 13]`, with `FORUM_CHANNEL_TYPE = 15`. This is one
more member of RK-8's class, a statement of what the site does today that the base contradicts. It is not sent back for a
revision. The table itself is right, because its rows turn on list membership and never on channel type. The class is stated
below as a property over revision 10's delta, checked in this pass, and its one gap is stated limit SL-11 with its bearer.

**RK-8, the class from pass 1.** One new member in this pass (F-34). The planner writes it into RK-8's record at the fold.

**F-35** (MEDIUM) does not hold approval and takes no revision round: after implementation approval, and under steering's cap
on M4 (block 17:56Z), a gap below HIGH is a Planner batch row. AC-4.4's walk names UAT as its runner, but no surface UAT reads
routes to it, and it has no clause for a build that cannot sign in.

Readings recorded, not findings:
- The clause "no mention renders the text `unknown`" is read as a consequence of the table. A channel whose own name is
  `unknown` renders `#unknown` under row 1.
- Preview images are screenshots of `/preview` (architecture W-4), so a channel mention in a preview image stays `#<id>` while
  the message editor's preview shows the name. AC-4.4 states this in row 2 and in its walk.
- M1's AN-7 line still says "AC-4.4's unresolved-kind rendering takes its source text". AN-7 completed, so that outcome never
  applied.

No milestone is marked `PREMISE-STALE` by this delta. `Target-Release` is unchanged. No `OPEN QUESTION` is unresolved (0 lines
without `[RESOLVED]` or `[CLOSED]`, counted in memory over the plan at `890d0b78`). Routed to the owner: nothing.

The cycle 3 verdicts follow, as written at their passes.

**APPROVED — cycle 3, pass 2.** Neither the stop authority nor the hard stop fired (pass 2 of 15 in this cycle). Pricing: sized
to the ask plus his rulings; revision 9 changes one fixture and one sentence of AC-4.7.

- **F-33 is resolved.** The unloaded-tag fixture is `vi-VN`, which `loadLocales.ts` does not import; the test loads the site's
  locale files as production does and supplies the tag through react-aria's locale. The expected text and the mutant's text
  are the pair this critique ran at cycle 3 pass 1 (`11/14/23, 10:13 PM` against `22:13 14/11/23`).
- **Steering's 18:02Z decision** is recorded beside the Decisions Register as a constraint with its date, its reason and what
  voids it. Its premise holds: AC-4.7 changed in revisions 6, 7 and 8.
- **RK-8's record** carries cycle 3 pass 1's member and the one steering found. No new member in this pass.
- **The cycle 3 pass 1 assumption** is a Planner batch row for M4's implementer.

No milestone is marked `PREMISE-STALE`. `Target-Release` is unchanged. No `OPEN QUESTION` is unresolved. Routed to the owner:
nothing.

The cycle 3 pass 1 verdict follows, as written at that pass.

**APPROVED — cycle 3, pass 1.** The stop authority fired on one shape (F-33). The hard stop did not fire (pass 1 of 15 in this
cycle). Pricing: sized to the ask plus his rulings; revision 8 touches AC-4.7 only and adds no criterion, milestone or
instrument.

What holds in revision 8's delta:
- **D-16** matches effort rulings block 17:58Z word for word, and the picker line now reads as the code does: six table keys
  and a separate `R` button (`MarkdownTimestamp.tsx` at `af3d95a`, read in this pass).
- **Steering's revision cap** is recorded as a scope constraint with its date, its reason and what voids it. Its premise
  holds: revision 8 is M4's third revision since revision 5's approval.
- **The locale rule** closes this critique's cycle 2 pass 2 assumption: `Intl` takes the locale dayjs resolves to, so `s` and
  `S` render in the six siblings' language. Every one of the 29 dayjs locale names `loadLocales.ts` loads is a tag `Intl`
  accepts and resolves to the same language (run in this pass, Node 24.14.0, ICU 78.2: 0 of 29 rejected).
- **The `en-GB` literal** is right: `14/11/2023, 22:13` (same run).

**Stop authority: F-33.** AC-4.7's fifth fixture is "a tag the site has no file for, `ja-JP`", expected to give the `en` form.
The site loads a `ja` file (`src/utils/loadLocales.ts` at `af3d95a` imports `dayjs/locale/ja`), and dayjs 1.11.7 resolves
`ja-JP` to `ja` when it is loaded. So with the site's own loader the fixture exercises the loaded branch, its literal is wrong,
and the mutant it is meant to catch (the tag passed to `Intl`) gives the same text as correct code. This is one more member
of the class RK-8 has predicted since pass 1, a statement of what the site does today that the base contradicts; six earlier
members were each folded singly. It is not sent back for a revision round. The class is stated below as a property over
AC-4.7, checked in this pass, and its one gap is stated limit SL-10 with its bearer. That is also where steering's cap would
send it; under the GLOSSARY's definition it is a severity-floor finding and so excepted from the cap, but the stop authority
binds this gate first.

**RK-8, the class from pass 1.** One new member in this pass (F-33). One member appeared in revision 7 and was found by
steering, not by this critique's pass on that revision (the `R` button; corrected in revision 8).

No milestone is marked `PREMISE-STALE`. `Target-Release` is unchanged. No `OPEN QUESTION` is unresolved. Routed to the owner:
nothing.

The cycle 2 verdicts follow, as written at their passes.

**APPROVED — cycle 2, pass 2.** Neither the stop authority nor the hard stop fired (pass 2 of 15 in this cycle). Pricing: sized
to the ask plus his three rulings, unchanged; revision 7 adds no criterion, milestone or instrument.

- **F-32 is resolved.** AC-4.7 names the dayjs format table as the sibling, marks `s` and `S` a deviation, and gives the reason
  with its capture: dayjs's `L LT` gives `11/14/2023 10:13 PM`, and Discord draws `11/14/23, 10:13 PM`. Everything else about
  the two styles follows the sibling. The three sibling behaviours the criterion cites were read at `af3d95a` and hold
  (`if (!state.mounted) date = date.utc()`; `LoadLocale` sets `dayjs.locale` from react-aria's `useLocale`; the picker maps
  `Object.keys(TIMESTAMP_TO_DAYJS_FORMAT)`). The `America/New_York` literal is right (22:13 UTC is 5:13 PM there).
- **The pass-1 assumption** is read: `0x02000000` is `Syntax.HEADING` at the pin, by the planner's run and the architect's.
- **RK-8: no new member found by this pass.**

Not a finding: the planner left the format picker without `s` and `S` and flagged that choice to steering as his to overturn.
It adds nothing he did not ask for.

No milestone is marked `PREMISE-STALE`. `Target-Release` is unchanged. No `OPEN QUESTION` is unresolved. Routed to the owner:
nothing.

The cycle 2 pass 1 verdict follows, as written at that pass.

**APPROVED — cycle 2, pass 1.** Neither the stop authority nor the hard stop fired (pass 1 of 15 in this cycle). Pricing: sized
to the ask plus his three rulings, unchanged; revision 6 adds no criterion, milestone or instrument, and withdraws one stated
limit (X-24).

What this pass read in revision 6's delta:
- **F-31 is settled.** AN-8 limb 2b ran Discord's legacy code per surface and read the drawn result: a game mention is a pill
  on the description, the field value and the V2 text display, and literal text on the title and field name. AC-2.3's table
  and M4's mask line now say exactly that, and content's game mentions are in the agree class (limb 2, four cases).
- **The pass-5 assumption** is an entry condition at M6: M3 records whether the box exposes its emoji spans, and a miss goes
  to the planner before M6's literals freeze.
- **AC-6.5's expected value** is split by surface, with the box for content and the three surfaces whose masks match it on the
  bits that matter, and the oracle helper for the title and field name. A wrong split shows as red, not as a false pass.
- **AC-6.3's provision step** names what UAT's build needs (a local Postgres, the `127.0.0.1` host, the id-sequence move).

One finding is open and does not hold approval: **F-32** (LOW). AC-4.7 writes `s` and `S` as `Intl.DateTimeFormat` option sets
"in the viewer's locale and time zone". The six styles beside them come from one dayjs format table, and the plan does not
say the two new ones depart from it or why. It needs to land before M4 is coded.

**RK-8, the class from pass 1: no new member found by this pass.**

No milestone is marked `PREMISE-STALE`. `Target-Release` is unchanged and equals the scoping block's end step. No `OPEN
QUESTION` is unresolved. Routed to the owner: nothing.

Cycle 1's verdicts follow, as written at their passes.

**APPROVED — cycle 1, pass 5.** Neither the stop authority nor the hard stop fired (pass 5 of 15). Pricing: sized to the ask
plus his three rulings, unchanged; revision 5 adds no criterion, milestone or instrument.

Pass 5 read revision 5's delta and found nothing new:
- **F-31** is a Planner batch row with its landing trigger, and M4's mask line now says the premise is not established.
- **AC-2.3's six literals** each differ from AN-3's native mask by the one bit `0x400` on the five legacy-only masks, and
  content's is unchanged (this pass's arithmetic; QA's probe at revision 4 reads "cells 248 mismatches 1", content's).
- **The pass-4 assumption** no longer bears on a gate: under drift a live native-box departure is reported with C2 and holds
  nothing, and `pnpm test`'s frozen literals under the pinned wasm still catch a site regression.
- **AC-6.5's expected value** moved to Discord's native box doing its own join (the architect's CF-11), with the oracle helper
  as a positive control. This pass's assumption below is about its reach.

The pass-4 verdict follows, as written at that pass.

**APPROVED — cycle 1, pass 4.** Neither the stop authority nor the hard stop fired (pass 4 of 15).

Pricing: sized to the ask plus his three rulings, unchanged from revision 3. Seven milestones. Revision 4 adds no criterion;
it restates six, adds one read to AN-8 (the slow-CPU capture, from QA) and one site helper for the emoji image and size (from
the architect).

What revision 4 settled:
- **F-27.** The native box now runs on the pinned wasm, and its literals are taken under it. Under drift the native-box limbs
  report "not comparable under drift" with both hashes and hold nothing.
- **F-28.** A later release that does not touch the region is held by nothing the command reports, a fetch failure included.
  Devops at Stage 1 runs it there.
- **F-29 and SL-8.** AC-3.7 excuses an input only through a frozen residue list. Each entry's predicate is evaluated on the
  oracle helper's parse, not the site's output; a newly different input fails; the list changes only by a reviewed commit. An
  adjustment that reaches no member fails AC-3.8 (ii).
- **F-30, SL-9** and the pass-3 assumption (AC-3.8 (i′), with X-26 for what it still cannot see).

One finding is open and does not hold approval: **F-31** (LOW). The mask line clears `GAME_MENTION` on the legacy-only surfaces
on a premise the analysis marks not established. AN-8's limb reads it, and the planner's next batch folds AN-8.

A reading recorded, not a finding: outcome row C6's later-release cell names limb (i) and not (i′). The row's first cell groups
the two, so (i′) at a later release is read as (i): it goes to him through steering and holds no release.

**RK-8, the class from pass 1: no new member found by this pass.** Two statements of today's site that revision 4 added (the
emoji image and jumbo flag come from `simple-markdown`'s emoji rule; `common.ts` holds two `isEmojiNode(node?.ast)` predicates)
are the architect's reads at CF-10 and were not re-read here.

No milestone is marked `PREMISE-STALE`. `Target-Release` is unchanged and equals the scoping block's end step. No `OPEN
QUESTION` is unresolved.

Routed to the owner: nothing.

## Value Statement Assessment

Present, in user-story form, and delivered directly. Unchanged at revision 4.

## Assumption Not Checked

Cycle 11 pass 2: this pass assumes that the website's `normalizeNode` override, with the fix in CF-25's form, sends lines
to `handleElement` as often as a plain editor sends them to `normalizeNode`, and does not test it. The probe ran plain slate
with no override. If it is false, for example because `handleEditor` rewrites a line's type and dirties it again, the count
on the fixed tree is higher than SL-21's figures for that keystroke. The signature is a build count above the recorded
`normalizeNode` line entries. The implementer owns closing it in M6's fix round, from the record AC-6.8 already owes.

Cycle 11 pass 1: this pass assumes that no keystroke in AC-6.8's class leaves two run units each holding a line it changed,
and does not test it. The ground is a read of `unitAround` at `119471f`, not a run: a unit is every adjacent line that is not
a code block, so two units always have a code-block line between them, and one keystroke changes one line or two adjacent
ones. If it is false, the implementer can exhibit a fixture whose count is 2 with the resolve run on both units, and SL-19
(1) has no member. The implementer owns closing it in M6's fix round.

Cycle 10 pass 1: this pass assumes that one build of a 2,048-line run unit, with its engine parse, costs well under 16 ms,
so a per-unit fix can meet the timed limb, and does not test it. The only ground is arithmetic on the block's figure: 1,572
to 1,626 ms for about 2,000 builds at 2,000 lines is under 1 ms a build. Nothing was run, because it needs an export and a
vitest run. If it is false, the fixed tree misses 16 ms at 1,000 or 2,048 lines while the count limb passes. The implementer
owns closing it in M6's fix round, and AC-6.8 already sends the measured figures to steering before hand-off in that case.

Cycle 9 pass 1: this pass assumes that AC-3.3's typed drive presses Enter only between the input's lines, which is QA's
reading in QAF-42, and does not test it against the drive at `8cb4d83`. If it is false, NM-68 and NM-69 can go red on the
fixtures as written, and F-44 has no member. The signature is NM-68 red on `>>> a⏎> b` with no line added after `> b`. QA owns
closing it at Phase 2 on M6, where it reads both mutants on the fixtures as built.

Cycle 8 pass 1: this pass assumes that the editor's own test for a quote line picks the same lines as AC-6.7's definition, "a
line whose saved text begins with `> `", and does not test it. At `2e36107`, `quotePrefixOf` in `withNormalizeNode.ts`
matches `^ *> `, which admits leading spaces, and nothing was run in this pass. If it is false, a line such as ` > a` carries
a marker where the table carries none, and AC-3.3's typed cases holding such a line go red at M6 with no hold-out to excuse
them. The implementer owns closing it at M6; a red case of that form goes to the planner, since the table and the editor's
block layer would then disagree on what a quote line is.

Cycle 7 pass 1: this pass assumes that the engine's `parse` output, which is all the helper calls today, lets the helper place
each emoji in the raw text by itself, and does not test it. The emoji-span join is M6's to write and does not exist at
`2e36107`. If it is false, the helper has to call the engine's `parseLossless`, the same function the adapter calls for the
lift, and "never computed by the parse the lift reads" then holds for the adapter's code only. The signature is a
`parseLossless` import in `discordOracle.ts`. The implementer owns closing it at M6, and code review reads the helper's
imports against AC-2.1.

Cycle 6 pass 1: this pass assumes that Discord's legacy tree names every atom kind the engine returns on the legacy-only
surfaces with a node type of its own, so that "kind agrees" has a legacy side for each, and does not test it. This pass read
one legacy atom node, a timestamp. If it is false for a kind (legacy leaves it as text, as AN-8 found for a game mention on
the title), every input holding that kind differs on that surface and becomes a list entry, which is the criterion working;
the signature to watch is a family made of one atom kind on one surface. The implementer owns closing it at M4's full
measurement, and code review reads such a family's reason.

Cycle 5 pass 1 (settled at plan revision 12: atom-bearing inputs are in AC-3.7's population): this pass assumes that the site's rendering can be compared with legacy in the visible form on an input that
holds an atom (a mention, an emoji or a timestamp), so that the list gets entries for those inputs too, and does not test it.
No document says why `m4-dom-residue-before.json` counts only its `atomFree` inputs, and no test was run in this pass. If it
is false, M4's list holds entries for 1,344 of 2,378 inputs per surface (1,545 on the title), and AC-3.7 passes while saying
nothing about the rest. The signature is a list whose inputs include none with an atom. The implementer owns closing it at
M4's list commit, and QA at Phase 2 reads the number of inputs compared per surface against 2,378.

Cycle 4 pass 1: this pass assumes that the bot whose token `getApi` uses on UAT's local build is a member of the test guild
`1566742402180456559`, so that `getWebhooksAndChannels` returns that guild's channels there, and does not test it. Reading it
takes the build's credentials and a signed-in session, which this pass did not have. If it is false, the walk shows
`#1574358729577599086` in the message editor's preview, which is also what a broken lookup shows, so the walk cannot tell the
two apart. UAT owns closing it at the build's provision step: the channel list is seen non-empty in the site's own channel
picker before AC-4.4's walk is read. AC-6.3's guild-emoji walk rests on the same bot membership.

Cycle 3 pass 2: this pass assumes that the suite's DOM environment lets a test set the locale react-aria's `useLocale` reports
to `LoadLocale`, and does not test it. No test was written or run in this pass. If it is false, M4's implementer cannot drive
the `vi-VN` and `en-GB` fixtures the way AC-4.7 requires and would have to call `dayjs.locale` directly, which the criterion
bars because the tag-passing mutant then has no tag to pass. The implementer at M4 owns closing it; a miss is an AC-4.7 gap
and goes to steering before any fold (effort rulings block 18:02Z).

Cycle 3 pass 1 (carried at plan revision 9 as a Planner batch row for M4's implementer): this pass assumes that `dayjs.locale()`, read when a timestamp renders, is the locale `LoadLocale` set for
that viewer, and does not test it. dayjs keeps one locale per process, and nothing was rendered in this pass. If it is false
(a server render that serves two viewers, or a route that renders a timestamp without `LoadLocale` above it), `s` and `S`
take another locale than the viewer's before mount and change at hydration. The six sibling styles have the same exposure
today, so the two would still agree with each other. The implementer at M4 owns closing it, with AC-4.7's pre-mount fixture.

Cycle 2 pass 2 (settled at plan revision 8: `Intl` takes dayjs's resolved locale, so an unloaded tag gives the siblings'
language): this pass assumes that every locale react-aria reports to `LoadLocale` is one dayjs has loaded, and does not
test it. `src/utils/loadLocales.ts` at `af3d95a` names dayjs locale files (`git grep -c "dayjs/locale"`: 29 lines in that file);
which locales those cover against what a browser can report was not read. If it is false, a viewer in an unloaded locale sees
`s` and `S` in their own language from `Intl` and the six sibling styles in dayjs's fallback, in one message. The implementer
at M4 owns closing it; a user report goes to X-19's locale-wording residue.

Cycle 2 pass 1 (read at plan revision 7: `0x02000000` is `Syntax.HEADING`): this pass assumes that `0x02000000`, the one bit by which the field value's mask differs from content's, is
the heading bit, and does not test it. The plan marks it an inference from AN-3's table, and `@discord/markdown-types` is not
in the workspace to read. If it is false and the bit is one that decides whether an emoji sits inside a construct, AC-6.5 goes
red on field-value inputs with no site defect, because the box's spans were taken under content's mask. The implementer at M2
owns closing it: AC-2.3 checks each mask over all 31 single-bit members with the package installed.

Cycle 1 pass 5 (now an entry condition at M6; plan revision 6, AC-6.5): this pass assumes that a run of Discord's native box (module 818948) exposes the emoji spans of its own parse,
and does not test it. The analysis's AN-6 table describes the box's output as leaf attributes per token, where an emoji is an
`atom` carrying the enclosing styles, not a span marked as an emoji. If it is false, M3's implementer finds no emoji span to
freeze for AC-6.5, and the expected value falls back to the oracle helper that revision 5 made the positive control. The
implementer at M3 owns closing it and takes a miss to the planner; the architect's delta pass on revision 5 reads the same form.

Cycle 1 pass 4 (no longer bears on a gate; plan revision 5, M3 "Which wasm"): this pass assumes that Discord's served box JavaScript, run against the pinned wasm bytes while the served wasm
differs, either fails to initialise or computes what it would on its own wasm, and does not test it. No Discord build was run.
If it is false, a native-box limb goes red under drift as a moved literal (C4) when neither the site nor Discord's box moved,
and the gate holds on it. The implementer at M3 owns closing it (its re-derivation list names the wasm each live limb runs
on); QA reads any C4 that arrives together with C2 against both hashes before it is treated as a hold.

Pass 3's line is answered by AC-3.8 (i′), with X-26 as its stated residue.

## Unresolved Open Questions

None.

## Findings

### Open

None.

### Closed at cycle 11 pass 2

F-48 MEDIUM cycle 11 pass 2 — closed by property with stated limit SL-21; landed-by-author, discharging document: the plan's Planner batch. Duplicates the shape of CF-27 in `architecture/019-slate-formatting-discord-engine-architecture-findings.md`
- **Title**: AC-6.8's literal counts lines dirtied, and builds follow line entries to `normalizeNode`, which differ for a
  merge and for Enter on a `> ` line.
- **Location**: plan revision 18, AC-6.8 "Count": "The window" and "The property".
- **Description**: under CF-25's form the unit is built once each time `normalizeNode` receives a line. The literal is "the
  number of lines the keystroke dirties": 1 in-line, 2 for Enter, 1 for a merge. Run on slate 0.123.0 (Appendix): a Backspace
  at a line's start and a Delete at a line's end each leave one line and send it to `normalizeNode` twice. Enter sends 2
  lines; where the line carries a marker, `splitCarrying` then writes the marker in a second `withoutNormalizing` block,
  which is a second drain and a third line entry. The window is "one `Editor.normalize` drain after the keystroke", and
  that keystroke has two.
- **Impact**: the literal fails a correct fix on 3 of the 7 keystroke cases below: both merges, on every text, and Enter on
  the `> ` texts and the corpus's quote lines. The plan's "the merge fixture's literal comes from QA's read of what the
  merge dirties" gives QA the merge, and a read of what it dirties gives 1.
- **The property, in place of a revision**: for every keystroke case in the class, the literal equals the number of times
  `normalizeNode` receives a line over every drain the keystroke runs, on a plain slate editor. Its domain is seven cases.
  The probe gives: in-line insert 1; in-line delete 1 (backward run, forward not run); Enter 2; Enter with the marker write
  3; merge backward 2; merge forward 2. The plan's literals agree on the first three and differ on the last three; the
  seventh, in-line delete forward, is unrun.
- **SL-21, the reading M6 builds to**: the literal for a keystroke case is the count of line entries to `normalizeNode` over
  all the drains that keystroke runs, written by hand from the record AC-6.8 already owes ("the `normalizeNode` calls per
  keystroke kind"), never from the unit builder. The implementer bears it in the fix round and records the figure per case;
  QA at Phase 2 reads each literal against that record, and a case whose count the record does not explain goes to the
  planner.
- **Landing trigger**: steering's ruling under block 07:15Z, as revision 19 or as a Planner batch row folded at the seam
  after the last milestone's QA Phase 2.

### Closed at cycle 11 pass 1

F-45 MEDIUM cycle 10 pass 1 — RESOLVED at cycle 11 pass 1 — SL-18's three readings are AC-6.8's text. Plan revision 17 (`34850209`).

F-46 MEDIUM cycle 11 pass 1 — closed as landed-by-author, with stated limit SL-19; discharging document: the plan's Planner batch. Duplicates the shape of F-45 in this document
- **Title**: AC-6.8's equality has three terms with no member or no boundary.
- **Location**: plan revision 17, AC-6.8 "Count": the keystroke class's last sentence, "The window", "The property" and
  the residue line under the limb.
- **Description**: (1) The literal 2. The class "includes at least one keystroke that leaves two changed run units, for
  example a Backspace that joins lines from two units". By `unitAround` at `119471f`, a unit is every adjacent line that is
  not a code block. Two units therefore have a code-block line between them, and one keystroke in the class changes one
  line, or two adjacent lines for Enter. So the number of distinct run units holding a changed line is at most 1, the
  literal 2 has no fixture, and QA's NM-72 has none either. Read from the code, not run. (2) Deletes at a fence. The residue
  excludes an inserted character that completes an emoji or a fence. A delete can do the same: removing a backtick from a
  fence line turns code-block lines into run lines, and the normaliser then changes lines the keystroke did not. The class
  holds "deleting one character backward and forward" at every line's start, and the corpus holds fences. (3) The pass.
  The property is an equality "in each pass". At `119471f` an in-line insert reaches `editor.normalizeNode` for the text,
  the line and the editor, and only the line's entry builds; Enter on a `> ` line normalises once after the split and once
  after `splitCarrying` writes the marker. "Exactly 1 in each pass" is true or false by where a pass begins and ends, and
  the text does not say.
- **Impact**: (1) leaves 1 clause of the class that cannot be met as written, which the fix round would stall on or meet
  with an invented fixture. (2) and (3) can turn the equality red on a correct tree, for 1 of the 3 keystroke kinds on the
  corpus's fence lines and for Enter on the `> ` texts.
- **New members under F-45's property**: the terms the literal depends on now number nine with "pass boundary" and "the
  two-unit member" added, and the property fails for these 2 and for the character term's delete half.
- **SL-19, the readings M6 builds to**: (1) the implementer exhibits a keystroke that leaves two run units holding a changed
  line, or records in the implementation document that the class has none; then the literal is 1 for every kind, and QA
  dispositions NM-72 at Phase 2 as having no fixture. (2) A delete that removes or completes a fence delimiter or an emoji
  is residue with the inserted characters, held by AC-6.5's typed-edit property. (3) A pass is the run of normaliser entries
  over one unchanged document; the implementation document names the boundary the test reads, beside the pass count it
  already owes. QA at Phase 2 on M6 bears finding a keystroke in the class whose count these leave open, and tells the
  planner.
- **Landing trigger**: the Planner batch fold at the seam after the last milestone's QA Phase 2; the planner sends SL-19 to
  the implementer and QA now, since it bears on the fix round.

F-47 LOW cycle 11 pass 1 — closed as landed-by-author, with stated limit SL-20; discharging document: the plan's Planner batch
- **Title**: the bench file's home is inside the production type-check unless it sits under `__tests__/`.
- **Location**: plan revision 17, AC-6.8 "Time", "Home (CF-26)".
- **Description**: the home is "a `*.bench.ts` beside the code". At `119471f` no bench file exists (0 paths match), so the
  form has no sibling and names none. `tsconfig.json` includes `src/**/*.ts` and excludes only `**/__tests__`, and the
  workspace Test Conventions place every test and helper under `__tests__/` for that reason.
- **SL-20**: the bench file sits under the `__tests__/` directory beside the code it times, named for the module and the
  behaviour as a test file is. The form is a deviation with CF-26's reason, that a later chain can re-run it. The
  implementer bears it, and code review reads the path.
- **Landing trigger**: the Planner batch fold at the seam after the last milestone's QA Phase 2.

### Closed at cycle 10 pass 1

F-45 MEDIUM cycle 10 pass 1 — closed by property with stated limit SL-18; landed-by-author, discharging document: the plan's Planner batch. Duplicates the shape of F-42 in this document
- **Title**: AC-6.8's count literal depends on three terms the criterion does not fix.
- **Location**: plan revision 16, AC-6.8 "Count": the keystroke class, the property and the expected count.
- **Description**: (1) The window. The property counts builds in "one normalisation pass", and the expected count is "a
  literal per keystroke kind". At `119471f`, `handleEditor` returns as soon as `resolveEmoji` changes the document, and the
  normaliser runs again. So a keystroke that completes an emoji, reverts one or resolves a carried marker takes two passes
  or more, and at least 2 builds of its unit, against the literal 1 for an in-line insert. (2) The inserted character.
  "Inserting one character" names none. A plain letter never lifts and never opens a fence; `:` after `:smile` does the
  first, and a third backtick does the second, which moves lines between a run unit and a code block. Which keystrokes the
  literal 1 covers depends on the character picked. (3) The position. The size texts are one-character lines, which have a
  start and an end and no middle, and deleting their one character leaves an empty line.
- **Impact**: read per keystroke, the literal 1 is red on a correct tree for 1 of the 4 keystroke kinds whenever the
  character completes an emoji. Read per pass, it is met, and the builds a lifting keystroke adds across passes are counted
  by nothing. The cost at stake is small, under 1 ms a build by the arithmetic above, so this is not a gate.
- **The property, in place of a revision**: every term the expected literal depends on is fixed by the criterion's text.
  Its domain is the seven terms of the count limb: keystroke kind, position, inserted character, text, window, the counted
  function and the literal. It holds for 4 (kind, text, the counted function, the literal). It fails for 3 (window,
  inserted character, position).
- **SL-18, the readings M6 builds to**: (1) the window is one normalisation pass, as the property's sentence says, and a
  keystroke that makes the normaliser change the document is bounded pass by pass. (2) The inserted character is one that
  completes no emoji and no fence; a character that does is residue, held to AC-6.5's typed-edit property for its result
  and to nothing for its count. (3) On a one-character line the positions are start and end. The implementer names the
  character and records the pass count per keystroke kind in the implementation document, and QA at Phase 2 on M6 bears
  finding a keystroke kind whose count the readings leave open, and tells the planner.
- **Landing trigger**: the Planner batch fold at the seam after the last milestone's QA Phase 2, where AC-6.8's count limb
  gains the three terms; the planner sends SL-18 to the implementer and QA now, since it bears on the fix round.

### Closed at cycle 9 pass 1

F-43 LOW cycle 9 pass 1 — closed by property with stated limit SL-17; landed-by-author, discharging document: the plan's Planner batch. Duplicates the shape of QAF-42 in `qa/019-slate-formatting-discord-engine-qa.md`
- **Title**: AC-6.5's join mutant cannot be red on the two escape members it is said to be seen red on.
- **Location**: plan revision 15, AC-6.5 "Expected value", the hand-written control's member "one value from two source
  forms side by side, and an escape before an emoji".
- **Description**: the line lists `😄:smile:`, `:smile:😄`, `😄😄`, `\*a😄` and `a\_b😄` and says the mutant "a join that
  matches each value at its first occurrence in the line" is "seen red on them". In `\*a😄` and `a\_b😄` the emoji occurs
  once, so its first occurrence is its true place and the mutant gives the literal's span. Run in this pass: the engine
  returns one emoji node for each. The mutant is red on 3 of the 5 members. The two escape members still tell a wrong join
  apart, since a join that counts offsets over the engine's text, where the backslash is gone, places the emoji one
  character early; no named mutant shows it.
- **Impact**: read as "red on each", the line cannot be met. Read as "red on the set", 2 of 5 members are added without
  having been seen to fail (Test Conventions, axiom A).
- **The property, in place of a revision**: every mutant and fixture pair a "seen red" line names is a pair on which the
  mutant gives a result other than the expected literal. Its domain here is the pairs revision 15's delta names, 8 of them:
  the join mutant on each of the five members, NM-68 on `>>> a⏎> b` and on a `>>> a` line split, and NM-69 on `` ```⏎> x ``.
  It holds for 3 (the side-by-side members). It fails for 2 (the escape members). For NM-68 on `>>> a⏎> b` and NM-69 on its
  fixture it fails by QA's reading of the drive (F-44, not re-derived). For NM-68 on a `>>> a` line split it depends on what
  the mutant carries from a line that opens a block, which the plan does not say. The pairs named before revision 15 are
  outside this claim and were not re-read.
- **SL-17**: the join mutant is owed red on the three side-by-side members. Each escape member is owed one mutant of the
  join that it reddens, named by the implementer, or it is recorded under AC-6.5's row in QA's register as held by its
  literal alone. QA at Phase 2 on M6 bears the detection: it reads every pair red on the fixtures as built, and a pair that
  is not red goes to the implementer as a fixture or a mutant to add, with no revision round.
- **Landing trigger**: the Planner batch fold at the seam after the last milestone's QA Phase 2, where AC-6.5's line names
  which members the mutant reddens.

F-44 LOW cycle 9 pass 1 — closed as landed-by-author under SL-17; discharging document: the plan's Planner batch (R-69). Duplicates: QAF-42 in `qa/019-slate-formatting-discord-engine-qa.md`
- **Title**: NM-68's and NM-69's fixtures end on the line their dropped conjunct governs.
- **Location**: plan revision 15, AC-6.7 "Seen red", the NM-68 and NM-69 lines.
- **Description**: as QAF-42 states it. The typed drive presses Enter between the input's lines, and in `>>> a⏎> b` and
  `` ```⏎> x `` no Enter follows the last line. QA's QAF-41 named the key, and the fold dropped it.
- **Landing trigger**: QAF-42's Planner batch row; QA reads both mutants at Phase 2 on M6.

### Closed at cycle 8 pass 1

F-41 LOW cycle 8 pass 1 — closed by property with stated limit SL-15; landed-by-author, discharging document: the plan's Planner batch. Duplicates the shape of F-35 in this document
- **Title**: AC-6.7's walk names UAT's build, and nothing UAT reads routes to it.
- **Location**: plan revision 14, AC-6.7 "Human-observable form"; Reading Order, the `uat` row; Testing Strategy, "Probe
  versus gate".
- **Description**: the walk is "before release on UAT's local build (AC-6.3's provision step)". The `uat` row names AC-2.5,
  AC-4.2 and AC-6.3. The walk list names AC-2.5, AC-4.2, AC-5.5 and AC-6.3 (QA register B-1 to B-4). AC-6.7 is in neither
  and has no register row.
- **The property, in place of a revision**: every criterion whose text names UAT as its walker is in the `uat` Reading Order
  row and in Testing Strategy's walk list with its QA register row. Its domain, from the plan's own text at `2c3c8d1a`, is
  six criteria: AC-2.5, AC-4.2, AC-4.4, AC-5.5, AC-6.3 and AC-6.7. It holds for AC-2.5, AC-4.2 and AC-6.3. It fails for 3 of
  the 6: AC-4.4 (F-35, registered as B-7, its text parked for the fold), AC-5.5 (in the list as B-3, absent from the row)
  and AC-6.7 (absent from both).
- **SL-15**: until the seam fold, QA's register is UAT's walk list, not the `uat` row. QA registers AC-6.7's walk at its
  re-key on revision 14. At the fold, the row and the list name all six. Where the build cannot sign in, the walk falls to
  the production check AC-6.7 already names. QA bears finding a walk the register lacks, and tells the planner.
- **Residue**: a walk QA's register holds that no criterion names (B-8, the `beforeinput` paste branch) is outside this
  property.

F-42 MEDIUM cycle 8 pass 1 — closed as landed-by-author, with stated limit SL-16; discharging document: the plan's Planner batch
- **Title**: AC-6.7's table leaves three states to the implementer.
- **Location**: plan revision 14, AC-6.7's table and "The typing column is a replacement"; AC-3.3, the typed limb's drive.
- **Description**: (1) Ending a continued quote. After Enter on a `> ` line the new line holds a carried marker, and the
  only way out is to remove it. AC-3.3 calls that "a gesture the implementer names", with a positive control. The table has
  no cell for it and the human-observable form does not show it, so how a user leaves a quote is decided in code and walked
  by nobody. (2) "Carried" is a state the saved text does not show: a line holding a carried `> ` and a line where the user
  typed `> ` read the same. The table says what the first typed `> ` does to a carried marker and not when a marker stops
  being carried. (3) Whether the line that opens a `>>>` block is itself "inside" the block is not said; the code at
  `2e36107` strips the `>>> ` from what it carries, so it treats it as inside.
- **Impact**: (1) is 1 of the 2 things a user does next on a continued line, and it has no criterion. (2) and (3) are
  readings the implementer and QA could take differently.
- **SL-16, the readings M6 builds to**: (1) the implementation document names the gesture, QA's register walk for AC-6.7
  includes ending a quote with it, and a user report that a quote cannot be ended goes to AC-6.7. (2) A marker is carried
  from the split until the line's text next changes; a `> ` the user typed by hand is not carried, and a second `> ` typed
  after it is content. (3) The opening line of a `>>>` block is inside the block. The M6 implementer and QA at Phase 2 bear
  them. Not a severity floor: each reading has an AC-3.3 typed case that fails when it is built the other way, except (1),
  whose control shows the gesture works.
- **Landing trigger**: the Planner batch fold at the seam after the last milestone's QA Phase 2; the planner sends SL-16 to
  the implementer and QA now, since it bears on the held quote-carry code.

### Closed at cycle 7 pass 1

F-40 LOW cycle 7 pass 1 — RESOLVED at cycle 8 pass 1 — AC-6.5's control lists each form on the second line of a bold run that opened on the first; the owed re-verdicts cell says EC-7 was folded at revision 6 and retired at revision 13. Plan revision 14.

The finding as written at cycle 7 pass 1:

F-40 LOW cycle 7 pass 1 — closed as landed-by-author, with stated limit SL-14; discharging document: the plan's Planner batch
- **Title**: the hand-written control names no member that crosses a line break, and one owed re-verdicts cell still folds
  EC-7.
- **Location**: plan revision 13, AC-6.5 "Expected value", the hand-written control's member list; Reading Order, owed
  re-verdicts table, the row "AC-2.3's six literals; AC-6.5's typed-edit class (QAF-23) and expected value".
- **Description**: (1) The helper and the lift each join a run of adjacent lines by their own code, both written from AN-6
  in the same milestone. The control is what checks the helper's join by hand. Its members are each emoji form alone,
  inside bold, inline code, a code block and a link label, in a link URL and after a backslash. Only the code block has to
  span lines. A join wrong in the same way on both sides, on a style that opens on one line and closes on the next, passes
  the property and the control. (2) That owed re-verdicts row still says EC-7 "is folded at the next planning pass";
  revision 13 retires it.
- **Impact**: one construct family, inline styles across a line break, has no hand-checked member (0 of the control's
  listed contexts must cross a line except the code block). The mask control and the property still run over it.
- **SL-14**: the control's "inside bold" member is read as including one input where the emoji sits on the second line of a
  bold run that opened on the first. The M6 implementer and QA at Phase 2 bear it. Not a severity floor: the property over
  the typed-edit class still fails when the lift's join and the helper's differ.
- **Landing trigger**: the Planner batch fold at the seam after the last milestone's QA Phase 2; the planner sends SL-14 to
  the implementer and QA now, since it adds a member to a class AC-6.5 lists.

### Closed at cycle 6 pass 1

F-38 MEDIUM cycle 6 pass 1 — closed as landed-by-author, with stated limit SL-12; discharging document: the plan's Planner batch
- **Title**: AC-3.7's atom unit agrees on "source span", and Discord's legacy tree has no span.
- **Location**: plan revision 12, AC-3.7 "Atom-bearing inputs are in the population"; "Visible form";
  `verification/019/analysis/an3/an3-legacy-corpus.json`.
- **Description**: AC-3.7's expected value is computed by Discord's fetched legacy code and never by the engine. A legacy
  timestamp node in the capture carries `timestamp`, `parsed`, `full`, `formatted` and `type`, and no position in the source.
  So a span on the legacy side can only come from somewhere else. QA's QAF-34 asked for "kind and source text"; the plan
  wrote "source span".
- **Impact**: if the span is taken from the engine's parse for both sides, 1 of the 2 dimensions the atom unit names is
  compared with itself and can never differ, against axiom E. The unit's kind and its place in the unit sequence are still
  compared, so a wrong or missing atom is still seen.
- **SL-12, the reading M4 builds to**: an atom unit agrees when its kind agrees at the same place in the unit sequence, and
  where the legacy node carries the atom's identity (a mention's id, a timestamp's seconds, an emoji's name or id), on that
  identity too. Nothing on the legacy side is taken from the engine's parse. The M4 implementer and QA at Phase 2 bear it;
  an atom dimension that cannot be made to differ under a mutant is reported to the planner.
- **Recommendation**: at the fold, the sentence says what the legacy side supplies for an atom.
- **Landing trigger**: the Planner batch fold at the seam after the last milestone's QA Phase 2; the planner sends SL-12 to
  the implementer and QA now, since it bears on M4's list commit.

F-39 LOW cycle 6 pass 1 — closed as landed-by-author; discharging document: the plan's Planner batch
- **Title**: the family check's comparand, and what RK-9's route holds.
- **Location**: plan revision 12, AC-3.7 "What fails", fourth limb; RK-9 "Fire condition and route".
- **Description**: (1) The family limb is "an offline data-shape check in `pnpm test`" against "the implementation
  document's stated set" and its member counts. That document is in the record repository, which the website's suite does
  not read. The set and counts the check reads must be data in the website, and the plan does not say so or say which copy
  decides when the two differ. (2) RK-9 fires to steering, who puts him the counts. The text does not say whether M4, QA or
  the release waits on his answer. It is read here as holding nothing, since RK-9 is a risk and D-14 stands until he
  withdraws it. (3) A firing by "a later chain's re-measure" has no carrier once this plan is closed.
- **Impact**: one question each for the implementer, devops and a later planner. None changes what is built.
- **Recommendation**: at the fold, the limb names the committed data as what the check reads; RK-9 says it holds nothing;
  the later-chain firing rides the handoff the closing stage mints, or is dropped.
- **Landing trigger**: the same fold.

### Closed at cycle 5 pass 1

F-36 MEDIUM cycle 5 pass 1 — RESOLVED at cycle 6 pass 1 — the figures name their atom-free subset; M4 measures every input over every surface and mask, records the count and commits the files. Plan revision 12, AC-3.7 "Why per input" and "M4's measurement covers every input". The same member is QAF-34 in QA's document and CF-18 in the architect's findings, each raised on revision 11.

F-37 LOW cycle 5 pass 1 — RESOLVED at cycle 6 pass 1 — changelog row 12 names D-14; the `code-reviewer` row says families; M4 exercises the stale-entry and family limbs. Plan revision 12.

The two findings as written at cycle 5 pass 1:

F-36 MEDIUM cycle 5 pass 1 — closed as landed-by-author; discharging document: the plan's Planner batch
- **Title**: AC-3.7's "Why per input" figures are over the inputs without atoms, and the entry count the list will reach is
  not stated.
- **Location**: plan revision 11, AC-3.7 "Why per input" and its last bullet (RK-9's count);
  `verification/019/impl/m4-dom-residue-before.json`, fields `n`, `atomFree` and `count`;
  `verification/019/impl/m4-residue-measurement-6379abc.json`.
- **Description**: the plan says "500 of 1,344 inputs differ" and "818 of 1,545". In the file, `n` is 2,378 on every surface
  and 1,344 and 1,545 are `atomFree`. AC-3.7 is stated over every input in the generator, the 272 corpus and the 106 link
  inputs, under each mask. So the DOM measurement leaves 1,034 inputs unread on the description, field value and V2 text
  display, and 833 on the title. The other cited file, which this pass takes to be the tree-level comparison, counts 1,190,
  1,208, 1,369, 630 and 1,190 of 2,378. The files hold five cells; the field name, with and without an embed url, has none.
  Neither file is in `HEAD`.
- **Impact**: RK-9's falsifier is now "entries per surface", and QA reads the tip's count against M4's. With 43% of the
  inputs unmeasured in the visible form on three surfaces (1,034 of 2,378), the list may be two to three times the size
  the revision's figures suggest, and nobody can say which from the plan. The choice of the literal form does not turn on
  it.
- **Recommendation**: at the fold, the figures name their subset; the implementation document at M4 records the entry count
  per surface and mask over all 2,378 inputs, which is the count RK-9 reads; the implementer commits the two files.
- **Landing trigger**: the Planner batch fold at the seam after the last milestone's QA Phase 2. The count itself lands with
  M4's list commit.

F-37 LOW cycle 5 pass 1 — closed as landed-by-author; discharging document: the plan's Planner batch
- **Title**: three wordings revision 11 left behind.
- **Location**: plan revision 11, changelog row 11; Reading Order, the `code-reviewer` row; AC-3.7 "What fails".
- **Description**: (1) The changelog row says the change is not put to him because it tightens a test instrument. A change to
  a criterion of an open milestone rides his last selection on it only when the row names that selection, and the row does
  not name D-14, whose words are "the rest are listed". (2) The `code-reviewer` row still routes to "AC-3.7's listed classes
  and their reasons", and the reviewer now reads families and samples entries. (3) The stale-entry limb is a new check on
  the list, and the plan names no milestone that runs it against a real stale entry and a real live one before a run relies
  on it.
- **Impact**: each costs one reader a look elsewhere. None changes what is built.
- **Recommendation**: at the fold, the row names D-14, the Reading Order row says families, and M4 is named as where the
  stale-entry check is seen to fail on a stale entry.
- **Landing trigger**: the same fold.

### Closed at cycle 4 pass 1

F-34 LOW cycle 4 pass 1 — RESOLVED, closed by property with stated limit SL-11
- **Title**: AC-4.4's residue says forum ids are not on the channel list, and they are.
- **Location**: plan revision 10, AC-4.4 "Residue"; `website@5ec0621 src/constants/index.ts:TEXT_CHANNEL_TYPES`,
  `src/utils/redis/index.ts:fetchChannels`.
- **Description**: `TEXT_CHANNEL_TYPES` is `[0, 5, 15]` and `FORUM_CHANNEL_TYPE` is 15, so `fetchChannels` keeps forum
  channels, and their active posts arrive as `threads`. The residue sentence puts forum ids outside the list.
- **Impact**: a fixture or a walk written from the sentence expects `#<id>` for a forum id that the table's row 1 names.
  The table decides, so the cost is one wrong expectation, found when it goes red.
- **The property, in place of a revision**: every statement in revision 10's delta about what the site does at a named
  commit holds at that commit. Its domain is the statements the delta makes, listed here from the diff: the four mention
  rules and their classes; no command rule; `WebhookProvider.tsx:useValue` reads `useGuild().channels`;
  `attachChannelsToWebhooks` finds by `id` over top-level channels; `fetchChannels` returns named text and voice channels
  with their active threads; `GuildProvider` is mounted only through `src/app/message/layout.tsx`; `useGuild` throws
  outside it; the two cache timings; the members of `MENTION_KINDS` and `STATIC_MENTION_KINDS`; forum, category and
  archived thread ids are off the list. Each was read at its commit in this pass. All hold but the last, and of the last,
  the category and archived-thread parts hold (`/threads/active` returns active threads only).
- **SL-11**: the residue sentence is read as "category ids, archived thread ids, and ids of channel types outside
  `[0, 5, 15, 2, 13]`". A forum id on the list renders its name under row 1. The M4 implementer and QA Phase 2 bear it:
  they take list membership from `fetchChannels`' filter, never from the sentence. A user report goes to AC-4.4.
- **Residue of the property**: statements the plan makes about the site outside this delta were not re-read in this pass.

F-35 MEDIUM cycle 4 pass 1 — closed as landed-by-author; discharging document: the plan's Planner batch
- **Title**: AC-4.4's walk names UAT, and nothing UAT reads routes to it.
- **Location**: plan revision 10, AC-4.4 "Human-observable form"; Reading Order, the `uat` row; Testing Strategy, "Probe
  versus gate"; AC-6.3 "Provision step".
- **Description**: the walk is "on a local production build signed in to the test guild … Walked by UAT on that build before
  release". The `uat` row of the Reading Order names AC-4.2 for M4 and not AC-4.4. Testing Strategy lists the post-landing
  walks as AC-2.5, AC-4.2, AC-5.5 and AC-6.3 (QA register B-1 to B-4), and AC-4.4 is not among them. The signed-in build
  is the one AC-6.3's provision step describes, where a complete sign-in was not executed (AN-8 limb 3), and AC-6.3 says what
  happens when sign-in cannot be completed. AC-4.4 cites neither that step nor a fallback.
- **Impact**: UAT reads its row and the B-1 to B-4 list, so 1 of the 5 walks the plan now names would be missed, and the
  channel-name limb would release on suite evidence alone. Where sign-in fails, AC-4.4 has no stated limit to fall to, while
  its `/preview` half needs no sign-in and can still be walked.
- **Recommendation**: at the Planner batch fold, the `uat` row and the walk list name AC-4.4; the walk cites AC-6.3's
  provision step and takes its "where sign-in cannot be completed" clause for the signed-in half; QA registers the walk.
- **Landing trigger**: the Planner batch fold at the seam after the last milestone's QA Phase 2, before the UAT anchor. The
  planner registers the row from this pass.

### Resolved

F-33 MEDIUM cycle 3 pass 1 — RESOLVED — the unloaded-tag fixture is `vi-VN`, with the site's locale files loaded and the tag supplied through react-aria's locale; SL-10 is discharged into the text. Plan revision 9, AC-4.7 (on steering's decision, effort rulings block 18:02Z). The same member is CF-15 in the architect's findings and QAF-28 in QA's document, each raised on revision 8.

F-32 LOW cycle 2 pass 1 — RESOLVED — `s` and `S` are a marked deviation from `TIMESTAMP_TO_DAYJS_FORMAT`, with the reason and its capture; UTC before mount and the locale follow the sibling. Plan revision 7, AC-4.7.

F-31 LOW cycle 1 pass 4 — RESOLVED — AN-8 limb 2b read it per surface: `GAME_MENTION` stays set on the description, field value and V2 masks and is cleared on title and field name only. Plan revision 6, AC-2.3, M4's mask line, Planner batch row F-31 discharged. Read against analysis `3681654e` at cycle 2 pass 1.

F-1 HIGH cycle 1 pass 1 — RESOLVED — each AN item carries its "Not completed" outcome and the approval it holds. Plan revision 2, M1.

F-2 HIGH cycle 1 pass 1 — RESOLVED — outcome table by cause and gate, the release-interval figure, the Test Conventions carrier. Plan revision 2, M3, D-5, M7.

F-3 HIGH cycle 1 pass 1 — RESOLVED — pending stays hidden as today; rejected is a marked deviation. Plan revision 2, M2, AC-2.5, P-4.

F-4 MEDIUM cycle 1 pass 1 — RESOLVED — the gap is recorded on every capture; the missing production read is a stated limit. Plan revision 2, AN-2, RK-2, X-21.

F-5 MEDIUM cycle 1 pass 1 — RESOLVED — declared and observed enumerators, an outcome for an unmapped kind, the `0` rule. Plan revision 2, AC-2.4, M2, RK-3, AC-2.3.

F-6 MEDIUM cycle 1 pass 1 — RESOLVED — the class table has the editor's rows. Plan revision 3, M3 "Classes".

F-7 MEDIUM cycle 1 pass 1 — RESOLVED — a legacy-only surface went to him before M2's approval; ruled at D-14. Plan revisions 2 and 3.

F-8 MEDIUM cycle 1 pass 1 — RESOLVED — the rule names the inline runs; block context stays the Slate layer's. Plan revision 2, AC-5.6.

F-9 MEDIUM cycle 1 pass 1 — RESOLVED — two modes, the paste limb bounded, the refusals kept. Plan revision 2, AC-3.3, P-5.

F-10 MEDIUM cycle 1 pass 1 — RESOLVED — the mutated code is named per criterion. Plan revision 2, AC-3.4.

F-11 MEDIUM cycle 1 pass 1 — RESOLVED — AN-1 takes plan 018's build form. Plan revision 2, AN-1.

F-12 MEDIUM cycle 1 pass 1 — RESOLVED — the base is `master` at the cut, with a re-derivation step. Plan revision 2, Header notes.

F-13 MEDIUM cycle 1 pass 1 — RESOLVED — AN-4 needs no driver; M3 takes AC-2.2's pin rule; the rollback names its runner. Plan revision 2, AN-4, M3.

F-14 MEDIUM cycle 1 pass 1 — RESOLVED — the loose form is named, with the strict count and its blur in X-19. Plan revision 2, M3.

F-15 MEDIUM cycle 1 pass 1 — RESOLVED — QA's production read is cited and the reader is the carrier. Plan revision 2, Testing Strategy.

F-16 MEDIUM cycle 1 pass 1 — RESOLVED — AC-2.7. Plan revision 2, M2.

F-17 MEDIUM cycle 1 pass 1 — RESOLVED — Reading Order with the owed re-verdicts table. Plan revision 2.

F-18 MEDIUM cycle 1 pass 1 — RESOLVED — AC-6.3 has a provision step and AC-6.4 names what a place would take. Plan revision 2, M6.

F-19 LOW cycle 1 pass 1 — RESOLVED — the criteria name their decision rows. Plan revision 2.

F-20 LOW cycle 1 pass 1 — RESOLVED — Exclusions rows with carriers. Plan revision 2, Exclusions.

F-21 LOW cycle 1 pass 1 — RESOLVED — AC-2.1, AC-2.2, AC-2.6. Plan revision 2, M2.

F-22 LOW cycle 1 pass 1 — RESOLVED — gates stated in M5 and M6; devops mints the handoff. Plan revision 2.

F-23 LOW cycle 1 pass 1 — RESOLVED — replaced by D-13: AC-6.5 on the engine, AC-6.6. Plan revision 3, M6. Duplicates: CF-2 in architecture/019-slate-formatting-discord-engine-architecture-findings.md

F-24 MEDIUM cycle 1 pass 2 — RESOLVED — the command runs at every later website release, as D-12 reads. Plan revision 3, M3 "Who runs it", M7.

F-25 MEDIUM cycle 1 pass 2 — RESOLVED — SL-1: `tel` and `sms` listed, checked by the observed enumerator (AC-4.6). SL-2: AC-4.7, AN-8's first limb, X-24. Plan revision 3.

F-26 MEDIUM cycle 1 pass 2 — RESOLVED — SL-3 to SL-7 landed or discharged at revision 3 (M3 "Form", AC-3.4, AN-5, AN-3, AN-8). SL-9: the code-reviewer row names M3 and M4. Plan revision 4, Reading Order.

F-27 MEDIUM cycle 1 pass 3 — RESOLVED — the native box runs on the pinned wasm; under drift its limbs are "not comparable" and hold nothing. Plan revision 4, M3 "Which wasm the native box runs on", outcome row C2, AC-3.2.

F-28 MEDIUM cycle 1 pass 3 — RESOLVED — the later-release column holds no release on any cause; devops at Stage 1 is the runner. Plan revision 4, outcome row C1, M3 "Who runs it", M7.

F-29 MEDIUM cycle 1 pass 3 — RESOLVED — the property is adopted: AC-3.7's frozen residue list (predicate on the oracle helper's parse, a difference signature, changed only by a reviewed commit), and AC-3.8 (ii) fails an adjustment that reaches no member. SL-8 landed with it. Plan revision 4, AC-3.7, AC-3.8.

F-30 LOW cycle 1 pass 3 — RESOLVED — D-4's and D-5's consequence cells are re-aimed. Plan revision 4, Decisions Register.

## Questions

None.

## Scope assumptions the plan lists

Unchanged from pass 3: one adapter with seven masks (five of them now with `GAME_MENTION` cleared, F-31); the read-only
branches move with the editor surfaces; the Slate block layer stays the site's own; the emoji lift reads the engine.

## Review-method lines with no finding

Pass 4:
- **Decisions Register.** D-4 and D-5 changed in their consequence cells only; no verbatim cell moved. No row is re-raised.
- **Restated figures**, each read at its source: the wasm hash `da7b9e5e…` equal for the built and the served file (analysis
  AN-1 and AN-4 lines); QA's 8 of 248 mask cells (`probe-mask-vs-an3-table.out`: "cells 248 mismatches 8", all GAME_MENTION);
  15,480 typed edits (QA's P-Q9).
- **Instruments.** AC-3.7's residue count names its reader (QA at Phase 2, against the count recorded at M4). AC-4.7's `R` limb
  is read under a fixed clock. AC-6.5's expected spans come from the oracle helper's own join, not the adapter's.
- **Runners.** The later-release run is devops's at Stage 1, recorded in that chain's deployment document.
- **Exclusions.** X-25 and X-26 carry a reason and a carrier. X-21 is restated on QA's declining of E-4.
- **Reading Order.** Rows name current headings; the code-reviewer row reaches AC-3.7 and the adjustment module.
- **Release target.** Unchanged.

Earlier passes, still standing: listed in this critique at `af0b21d`.

## Process record

- Cycle 8 pass 1: the plan was read as `git diff f9b406d6 2c3c8d1a` saved in this session's scratchpad. The list of
  UAT-walked criteria came from a pattern run in memory over the plan at `2c3c8d1a` and was read line by line. Nothing was
  installed or run beyond reads. The architect's and QA's reads of revisions 13 and 14 were not read before this pass was
  written.

- Cycle 7 pass 1: the plan was read as `git diff b0af4dc3 f9b406d6` saved in this session's scratchpad. The probe tally ran
  in memory. Nothing was installed or run beyond reads. The architect's and QA's reads of revision 13 were not read before
  this pass was written.

- Cycle 6 pass 1: the plan was read as `git diff ec2440d9 b0af4dc3` saved in this session's scratchpad. Nothing was installed
  or run beyond reads of committed captures.

- Cycle 5 pass 1: the plan was read as `git diff 890d0b78 ec2440d9` saved in this session's scratchpad, and the plan's other
  sections from `git show ec2440d9` held in memory. The record-write gate refused one command that saved that export to the
  scratchpad through a shell variable, reading the path as a record document; it was re-run with nothing written but a text
  extract at a literal scratchpad path. The tally of the measurement files ran in memory. QA's re-key on revision 11
  (`047add44`) was committed while this pass ran and was not read before this pass was written.

- Cycle 4 pass 1: the plan was read as `git diff 47348a6d 890d0b78` saved in this session's scratchpad, with website source
  exported there by `git -C /usr/local/bin/hooks/website show`; the ID comparison ran in memory. Nothing was installed or
  run. The architect's and QA's reads of revision 10 were not read before this pass was written. `node tools/check-repo.js`
  at session start printed one failure outside this document (the M4 implementation document's `Handoff-At`).

- Cycle 3 pass 1: the architect's and QA's passes on revision 8 were not read before this pass was written. At the seam their
  commit subjects show the same `ja-JP` fixture raised by each (`architecture/…-architecture-findings.md` CF-15 at `e1e6f363`,
  a stated limit under the cap; `qa/…-qa.md` QAF-28 at `5ca68b07`, asking `vi-VN`). F-33 was reached independently and names
  the same member; the three meet at the planner.

- Pass 4: the plan was read as `git diff 9ac9ba62 e53c7cdb` saved in this session's scratchpad; the ID comparison ran in memory.
  Nothing was installed or run.
- Pass 4: the architect's delta pass on revision 4 was committed (`a5f78f83`) while this pass ran and was not read before
  this pass was written. QA's re-key on revision 4 was not yet committed.
- Pass 3: one comparison command was not completed, then re-run in a form that writes no file.
- Passes 1 to 3 otherwise: in this document at `af0b21d`.

## Resumption State

Written at the close of cycle 11 pass 2 on 2026-11-24 (APPROVED on plan revision 18, `18e434e6`). Nothing is in flight and no process is running. One question awaits an answer: F-48 with SL-21, and whether the count limb keeps an exact literal, sent to `steering-hooks-fixer` as a selection under its block 07:15Z. The cache-warm wake is armed in this session; after a clear, arm it again. The verdict was sent to `planner-019` (F-48 with SL-21) and `implementer-019` (CR-20's fix round is released by this gate only as read with SL-21, pending steering). M7 is `PREMISE-STALE` (plan R-76) and is not reviewed until the planner's re-argument revision at the seam fold. M3 to M6 are capped (effort rulings blocks 22:35Z and 00:49Z): a finding below HIGH is a stated limit with no revision round, a severity floor excepted; under block 04:18Z a further AC-6.5 gap below HIGH is a stated limit. Any question for the owner goes to `steering-hooks-fixer` by SendMessage as a selection prompt, never as prose here. A later criterion-changing revision opens cycle 12: read the plan as the `git diff` from `34850209` with the ID-set comparison computed in memory (no file written from the shell), and work under the brief (`steering/019-brief-critic.md`, `steering/slate-formatting-brief-common.md`: shell in the record folder, website by `git show <sha>:<path>`, record documents by Write or Edit only) and steering's two standing decisions in the effort rulings file (block 17:56Z, the M4 and M6 cap; block 18:02Z, any AC-4.7 gap to steering before a fold).

## Appendix — engine probes (cycle 1 pass 2)

`@discord/markdown-wasm@0.16.0` with `@discord/markdown-types@0.14.0`, `npm install --ignore-scripts`, Node 24.14.0, `parse`
with its default flags (`Syntax.ALL`), 2026-11-23.

**Link schemes.** Each input, then the `url` of every link node returned:

| Input | Link `url` |
|---|---|
| `<+15551234567>` | `tel:+15551234567` |
| `<a@b.co>` | `mailto:a@b.co` |
| `a@b.co` | no link |
| `<mailto:a@b.co>` | `mailto:a@b.co` |
| `<tel:+15551234567>` | `tel:+15551234567` |
| `<ftp://x.y>`, `[a](ftp://x.y)` | no link |
| `[a](tel:+15551234567)` | `tel:+15551234567` |
| `[a](mailto:a@b.co)` | `mailto:a@b.co` |
| `[a](sms:+15551234567)` | `sms:+15551234567` |
| `[a](discord://-/channels/1/2)` | `discord://-/channels/1/2` |
| `discord://-/channels/1/2` | no link |
| `[a](steam://run/1)`, `[a](spotify:track:1)`, `[a](//x.y)`, `[a](file:///etc/passwd)` | no link |
| `[a](javascript:alert(1))`, `[a](data:text/html,x)`, `[a](vbscript:x)` | no link |
| `[a](HTTP://X.Y)` | `http://x.y/` |
| `dev://branch/main`, `[a](dev://branch/main)` | `dev://branch/main` |
| `[a](blob:https://x.y/1)` | `https://x.y/1` |

**`Syntax`.** `Object.keys(Syntax)`: 38 keys; 31 hold a single bit; the other seven are `EMOJI`, `LINKS`, `MENTIONS`,
`CODE_SPANS`, `ITALIC`, `QUOTES` and `ALL`.

**Timestamp styles.** `<t:1700000000:X>` for every ASCII letter X: a timestamp node comes back for `d f s t D F R S T`,
nine letters, and for `<t:1700000000>` with no style.

**Heading levels.** `# a`, `## a` and `### a` return headings of level 1, 2 and 3. `#### a` and `##### a` return a paragraph.

## Appendix — Slate probe (cycle 11 pass 2)

slate 0.123.0 from the website's `node_modules`, Node 24.14.0, 2026-11-24. A plain `createEditor()` with three one-text
lines `a`, `bc`, `d`, no website override, and `normalizeNode` wrapped to log each entry. Each row is one keystroke on a
fresh editor, with the entries in the order received.

| Keystroke | `normalizeNode` entries | Line entries |
|---|---|---|
| `Transforms.insertText` of `x` inside line 1 | text 1.0, line 1, editor | 1 |
| `deleteBackward` inside line 1 | text 1.0, line 1, editor | 1 |
| `insertBreak` inside line 1 | line 1, text 2.0, text 1.0, line 2, editor | 2 |
| `insertBreak`, then `setNodes` on the new line inside `withoutNormalizing`, as `splitCarrying` does | the row above, then line 2, editor | 3, over two drains |
| `deleteBackward` at the start of line 1 (a merge) | line 0, text 0.0, line 0, editor | 2 |
| `deleteForward` at the end of line 1 (a merge) | line 1, text 1.0, line 1, editor | 2 |
