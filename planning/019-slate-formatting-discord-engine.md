---
ID: 019
Origin: 019
UUID: 286c730a
Status: In Progress
Status-Detail: >-
  Revision 9 is approved by all three pre-code gates (critic c1e40234, architect 559253f1, QA 26f3a3c). Implementation of M2 to M6
  started 2026-11-23T18:49Z by implementer-019 on chain/019-slate-formatting-discord-engine (steering's recorded start, effort
  rulings block 18:48Z); M7 is devops's. Steering bounds later changes: M4 and M6 are
  capped below HIGH (block 17:56Z), and any AC-4.7 gap goes to steering before a fold (block 18:02Z).
  Revision 10 folds his mentions selection (D-17) into AC-4.4 and corrects M4's Mirrors line. The critic (71b981ad), the
  architect (b8d11f1b) and QA (f79d7f77) have all approved it, so M4's mention code is released.
  Revision 11 changed AC-3.7's frozen residue list to one literal entry per differing input, and all three gates read it.
  Revision 12 folds their findings: atom-bearing inputs join the list's population, the family check is added, and RK-9 gains
  a fire condition and route. All three gates approved revision 12 (QA e645035, architect 237da08, critic 575a52bc). Steering
  capped M3 at revision 12 (block 22:35Z), so their findings are stated limits SL-12 and SL-13 with no revision 13, and M4's
  residue-list commit is released, read with them.
  From 2026-11-24T00:49Z, M3 to M6 are all capped (his selection, block 00:49Z): a finding below HIGH is a stated limit, with
  no fix or revision round. He chose to keep one release (D-19, block 00:55Z), so M7 stands and the plan is not revised.
  Revision 13 (D-21, block 03:55Z) replaces AC-6.5's expected-span source, because Discord's box exposes no emoji spans. The
  oracle helper is now the source on every surface, frozen, with hand-written literals as its content control, and EC-7 is
  retired. AC-6.5's literals wait for the critic, QA's re-key and the architect's delta read. The rest of M6 proceeds.
  Revision 14 (D-22, block 04:00Z) adds AC-6.7: Enter continues a `> ` quote, a paste is kept exactly, and a typed `> ` on a
  carried line replaces the carried marker. AC-3.3's typed drive follows it. It also folds the critic's F-40 into AC-6.5's
  control. All three gates passed revision 14, with stated limits.
  Revision 15 (steering block 04:18Z) folds QA's QAF-40 into AC-6.5's control (five side-by-side and escape members, plus a
  join mutant) and QAF-41 into AC-6.7 (NM-68, NM-69, and a drive keyed on the input). All three gates passed revision 15
  (QA 3b264329, architect f6f6651e, critic bf589c96), with stated limits, so AC-6.5's literal freeze and the quote-carry change
  are both released.
  Revision 16 (D-23, block 07:05Z) adds AC-6.8: one keystroke's emoji resolve works per run unit, with a counting limb in
  `pnpm test` and a 16 ms median timed limb outside the suite. CR-20's fix enters M6, and the release waits for M6's fix round,
  code review and QA. All three gates approved revision 16 with findings.
  Revision 17 folds those findings into AC-6.8: an exact count per pass with a positive control, a text with an emoji on every
  line, and a bench-file home for the timed limb.
  Revision 18 (steering block 07:15Z, the count literal only) sets AC-6.8's count window to one `Editor.normalize` drain and its
  literal to the lines the keystroke dirties (CF-27).
  Revision 19 (steering block 07:21Z, the last for AC-6.8) drops the per-keystroke literals for F-48. The count over every drain
  is equal at 200 and 2,048 lines and at least 1. CR-20's fix round waits for the three gates on revision 19. After it, an
  AC-6.8 finding below HIGH is a stated limit unless it is a severity floor.
  Revision 20 (steering block 07:42Z, reopening block 07:21Z for this change only) removes the corpus and generator bound of 4,
  which a correct fix exceeds, and adds fenced-quote texts of 200 and 2,048 lines to the equality limb. implementer-019's
  hand-off waits for the three gates' delta reads of revision 20.
  Revision 21 (D-24, his selection 14:32Z) adds AC-6.9: code-fence and `>>>` keystrokes settle without Slate's iteration error,
  write their text, match a fresh load, and do not grow per line (QAF-51, CR-23). M6 gains a second fix round, which waits for
  the three gates on revision 21.
  Revision 22 (steering block 14:48Z, and D-25, his selection 17:03Z) is AC-6.9's last fold. The caret limb takes hand-written
  `>>>` texts (`>>> za`, `>>> zabc`, `za`), so the fix round also fixes the `>>>` caret. The no-throw limb refuses a hidden
  throw (CF-30), and the fence ceiling reads 27 and 104 ms. After it, an AC-6.9 finding below HIGH is a stated limit, except a
  severity floor. All three gates passed revision 22, and the second fix round was released at R-100.
  Code review Round 7 REJECTED that round at `85ece66` on CR-25 HIGH (R-103): closing a fence over emoji lines takes 7.6 s at
  1,000 lines. Revision 23 (steering block 19:43Z, under D-24) adds `a🙂` texts to AC-6.9's fence keystrokes, a standing
  count limb on work per line, and a rewritten residue. His selection at 20:07Z (D-26) adds a paste member to it. Every gate
  passed revision 23, and Fix Rounds 3 and 4 ran on it.
  Revision 24 (D-28, his selection 05:28Z; AN-9) adds the inline-code keystrokes that throw Slate's iteration error over emoji
  lines, which the release would add, to AC-6.9's class. It also binds R-111's fixed-point condition over code review's
  corpus (CR-27). Every gate read revision 24.
  Revision 25 (D-29 to D-31, his selections 06:14Z) adds the six inline-code members to AC-6.9's work-per-line count limb. It
  also takes CF-35's equality form for the corpus differential and F-61's wording. SL-30 is QA Phase 2's entry condition for
  the members' other positions. Fix Round 5 waits for the critic, the architect and QA's re-key on revision 25.
Revision: 25
Target-Release: "website master → Vercel production, one release carrying M2 to M7 (preview and editor together, AF-2)"
Epic-Alignment: "Slate formatting effort (effort rulings `steering/fixer-queue-2026-11-21-rulings.md` blocks 09:07Z, 09:18Z); no roadmap epic"
Lane: full
---

# 019 — Slate formatting: one Discord engine for the preview and the editor, with a Discord-derived fuzzer

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-11-23T15:33 | 0 | planner-slate-formatting | Plan created from brief `steering/slate-formatting-brief-planner.md`, common brief `steering/slate-formatting-brief-common.md`, effort rulings blocks 09:07Z to 15:29Z, inventory `verification/slate-formatting-effort/scoping/inventory.md`, research `research/slate-formatting-discord-oracle-2026-11-23.md` (read at record `b668ea1d` content), architect findings `architecture/slate-formatting-preview-architecture-findings.md` (`86418be`). Scope delta: none (first revision). Size against the original ask: every in-scope inventory row is carried by a milestone or declined in Exclusions; the fuzzer is a suite deliverable (M3). |
| 2026-11-23T15:47 | R-1 | planner-019 | Registered research G-14 as a Planner batch row; its words live in `research/closed/slate-formatting-discord-oracle-2026-11-23.md` (record `a666dbd9`), Remaining gaps G-14. |
| 2026-11-23T15:52 | 1 | planner-019 | Folds his answers to OQ-1 to OQ-3 and steering's three scope additions (effort rulings block 15:49Z, record `093a7c9d`; ledger block "2026-11-23T15:48Z — steering-hooks-fixer"), plus Planner batch row G-14 (research, record `a666dbd9`). It adds D-10 to D-12 and resolves OQ-1 to OQ-3 in place; AC-5.6 and AC-6.2 are restated on the answers, and M3 takes the two-command form. G-14 enters AN-4, AN-7 and AC-3.1. Scope delta: M6 gains S-29's QAF-4 trigger and S-30 (the `>>>` server-side question, settled by a code read at `0411d3b`, with production residue his). M3 gains the fence-loop chain's three drivers as seeds, all carried. M1's AN-4 and AN-7 each gain a G-14 limb. The plan is still the original ask plus three in-region additions, with no milestone added or removed. |
| 2026-11-23T16:24 | 2 | planner-019 | Folds the three gates' verdicts on revision 1, one batch: the critique (`critiques/019-slate-formatting-discord-engine-critique.md`, record `0435794c`, F-1 to F-23), the conformance pass (`architecture/019-slate-formatting-discord-engine-architecture-findings.md`, record `78d7ec06`, CF-1 to CF-7), and QA Phase 1 (`qa/019-slate-formatting-discord-engine-qa.md`, record `75f479a1`, QAF-1 to QAF-14). The arguments live in those documents; § Finding disposition maps each finding to where it is folded. OQ-4 is resolved by CF-7. CF-2's option (b) is OQ-5, at steering as a scope delta, with option (a) written as the floor. Scope delta: M5 gains a per-element parse cache with a counted criterion (CF-1); M6 gains AC-6.5, the editor's emoji lift held equal to the engine (CF-2 a); M3 gains a red-command outcome table and the vitest project form (F-2, CF-3), and the three-class table (F-6); M2 keeps today's hidden-until-ready loading state (F-3) and gains a link scheme allow-list (QAF-5) and R-A's criterion; M7 gains the Test Conventions update. No milestone was added or removed; the plan is the original ask plus the three in-region additions of revision 1. |
| 2026-11-23T16:30 | R-2 | planner-019 | Registered D-13 (OQ-5, CF-2 option b); its words live in effort rulings block "2026-11-23T16:29Z — selection: plan 019 OQ-5" (record `213d34ec`) and the ledger block it cites. |
| 2026-11-23T16:39 | R-3 | planner-019 | Status write: revision 3 held for his answers on AN-3 and D-11's reopening; the events it will fold are the critique pass 2 (`e3e49ac7`), the architect's delta pass (`ee54771c`), QA's re-key (`6dace3fa`), devops's AN-1 Preview record (`2531c04a`) and the analysis (`aafecf1`). |
| 2026-11-23T17:15 | 3 | planner-019 | Folds, as one batch: critique pass 2 (`e3e49ac7`: F-6, F-24 to F-26 with SL-1 to SL-7, Q1, Q2); the architect's delta pass (`ee54771c`, CF-8) and its A′/B3 design (`1c78753`); QA's re-key (`6dace3fa`: QAF-15 to QAF-17, EC-4, NM-30); devops's AN-1 Preview record (`2531c04a`); analysis 019 (`aafecf1`); and D-13 to D-15 (effort rulings blocks 16:29Z, `213d34ec`, and 17:04Z, `af8b5a5a`). § Finding disposition (revision 3) maps each to its place, and the arguments live in those documents. F-24 is folded as D-12 reads ("every release gate"), not put to him. One shell edit of this file was refused by the record-write gate and re-made with Edit. Scope delta: M2 drops the conditional `@discord/markdown-react` and takes seven masks. M3 gains the visible form, the B3 adjustment rule, AC-3.7 and AC-3.8 with outcome row C6, two `discord-*` projects, and a later-release column that runs but does not hold. M4 gains the adjustment module, AC-4.7 (timestamp styles) and AC-4.8 (spoiler pieces). M5 moves from per-line to per-run-unit parsing with inline objects as one `?`, and gains AC-5.8. M6 rewrites AC-6.5 onto the engine and gains AC-6.6 (`simple-markdown` removed). M1 gains AN-8. No milestone was added or removed. Size: the original ask plus revision 1's three in-region additions, now with his three rulings' reach (the editor's emoji, embeds judged by visible style, cross-line colouring), each inside the region. |
| 2026-11-23T17:18 | R-4 | planner-019 | Recorded the architect's delta pass on revision 3 in the owed re-verdicts table: APPROVED_WITH_CHANGES on CF-9 and CF-10, in `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 3" (record `48e51d92`). |
| 2026-11-23T17:20 | R-5 | planner-019 | Recorded QA's Phase 1 re-key on revision 3 in the owed re-verdicts table: QAF-18 to QAF-22, and E-4 declined, in `qa/019-slate-formatting-discord-engine-qa.md` § Re-key on Revision 3 (record `24d537bf`). |
| 2026-11-23T17:25 | 4 | planner-019 | Folds the three gates' verdicts on revision 3 as one batch: critique pass 3 (`af0b21d8`: F-27 to F-30, SL-8, SL-9, and the pass's assumption), the architect's delta pass (`48e51d92`: CF-9, CF-10), and QA's re-key (`24d537bf`: QAF-18 to QAF-22, the `GAME_MENTION` mask cells, E-4 declined). F-27 and QAF-18 are one fold, and so are F-29 and QAF-19; § Finding disposition (revision 4) maps each, and the arguments live in those documents. AN-8's results have not landed and are not folded. Scope delta: M3's native box runs on the pinned wasm, the later-release column holds no release on any cause with devops as its runner, AC-3.7 excuses only a frozen residue signature, and AC-3.8 gains (i′) and an empty-adjustment clause. M4 gains the emoji display helper and the `GAME_MENTION` mask line. M6's AC-6.5 gains re-deciding on edit, a typed-edit property and an independent expected value. M1's AN-8 gains a fifth limb, the slow-CPU capture. D-4 and D-5 are re-aimed. No milestone was added or removed. Size: unchanged from revision 3, the original ask plus revision 1's three in-region additions and his three rulings' reach. |
| 2026-11-23T17:27 | R-6 | planner-019 | Recorded the architect's delta pass on revision 4 in the owed re-verdicts table: APPROVED, with CF-11 LOW non-blocking, in `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 4" (record `a5f78f8`). |
| 2026-11-23T17:30 | 5 | planner-019 | Folds the three gates' verdicts on revision 4, all approving: critique pass 4 (`faa1b319`: F-31 registered as a Planner batch row, and the pass's assumption), the architect's delta pass (`a5f78f83`: CF-11), and QA's re-key (`cf895cd`, link fix `61e58f7`: QAF-23 and its derived mask literals). § Finding disposition (revision 5) maps each. The pass also corrects its own "seven masks" to six: the title and field name share one mask, with and without an embed url. Scope delta: AC-6.5's expected spans come from Discord's native box, and its typed-edit class gains emoji edits over the 1,662 probe. AC-2.3 states its six literals. M3's drift rule holds no gate on a live native-box departure under drift. No milestone was added or removed. Size: unchanged from revision 4. |
| 2026-11-23T17:31 | R-7 | planner-019 | Recorded the architect's delta pass on revision 5 in the owed re-verdicts table: APPROVED, with CF-12 LOW non-blocking, in `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 5" (record `681ae51`). |
| 2026-11-23T17:32 | R-8 | planner-019 | Recorded QA's Phase 1 re-key on revision 5 in the owed re-verdicts table: nothing open, and entry condition EC-7 for AC-6.5, in `qa/019-slate-formatting-discord-engine-qa.md` § Re-key on Revision 5 (record `d060162`). |
| 2026-11-23T17:32 | R-9 | planner-019 | Recorded the critic's pass 5 on revision 5 (APPROVED; critique closed, `critiques/closed/019-slate-formatting-discord-engine-critique.md`, record `944e53f6`) in the owed re-verdicts table. Registered Planner batch rows CF-12 (architect `681ae51`), EC-7 (QA `d060162`) and the critic's pass 5 assumption, each holding M6's approval only. Status write: ready for implementation from M2, with M4 and M6 held. |
| 2026-11-23T17:38 | R-10 | planner-019 | Registered AN-8 limbs 1 to 4 (analysis record `db8199aa`, § Findings "AN-8 Residual reads") as landed, and recorded that F-31 fired: limb 2's written form falsifies the `GAME_MENTION` mask premise. Status write: AC-2.3's `GAME_MENTION` bit on the five legacy-only masks is held from M2's readiness until limb 2b, sent to `analyst-019`, lands. |
| 2026-11-23T17:43 | 6 | planner-019 | Folds AN-8 limbs 1 to 4 and 2b (analysis records `db8199aa`, `3681654e`) and the four Planner batch rows parked at revision 5's approval: F-31 (critique `faa1b319`), CF-12 (architect `681ae51`), EC-7 (QA `d060162`) and the critic's pass 5 assumption (`944e53f6`). § Finding disposition (revision 6) maps each. Limb 2b settles F-31: `GAME_MENTION` stays set on the description, field value and V2 masks, and is cleared on title and field name only. Content's game mentions move from disagree to agree. Scope delta: AC-2.3's three rich-surface values revert to AN-3's masks. AC-4.7 states `s` and `S` (X-24 withdrawn). AC-6.3's provision step adds a local Postgres and the `127.0.0.1` host. AC-6.5's expected value splits by surface between the box and the helper, and gains two entry conditions at M6. No milestone was added or removed. M2's other criteria, M3 and M5 are unchanged from the revision 5 the gates approved. Size: unchanged. This opens critique cycle 2. |
| 2026-11-23T17:46 | R-11 | planner-019 | Recorded the critic's cycle 2 pass 1 on revision 6 (APPROVED, F-32 LOW; `critiques/019-slate-formatting-discord-engine-critique.md`, record `8b596f83`) in the owed re-verdicts table. Registered Planner batch rows F-32 and the pass's heading-bit assumption, each with this pass's read: `verification/019/planning/timestamp-s-S-dayjs-vs-intl.txt` and `syntax-bits-0.16.0.txt`. |
| 2026-11-23T17:52 | R-12 | planner-019 | Recorded the architect's delta pass on revision 6 (APPROVED_WITH_CHANGES on CF-13 LOW; record `93708612`) in the owed re-verdicts table. Registered Planner batch row CF-13 with its disposition, option (a); added the architect's heading-bit measurement to that assumption's row. |
| 2026-11-23T17:53 | 7 | planner-019 | Folds the three gates' verdicts on revision 6: critique cycle 2 pass 1 (`8b596f83`: F-32 and its heading-bit assumption), the architect's delta pass (`93708612`: CF-13, option a), and QA's re-key (`b5985b20`: QAF-24, QAF-25). § Finding disposition (revision 7) maps each. Correction: R-10's F-31 Planner batch cell and my messages to steering and QA attributed the withdrawn `<game:id>` form to a QA probe. It came from AN-3's bit driver, which the analysis attributes to the research's guess (QA, `b5985b20`). The error was mine. Revision 6 replaced that cell, so no current text carries it, and the messages are withdrawn in their channels. Scope delta: AC-4.7's `s` and `S` become a marked deviation from the sibling table, following it in UTC-before-mount and locale, with the picker unchanged, and the test sets its own locale and zone. AC-6.5's helper gains a mask control on url-variant link fixtures, and its heading bit is read, no longer inferred. AC-2.3 is unchanged and released. No milestone was added or removed. Size: unchanged. |
| 2026-11-23T17:56 | R-13 | planner-019 | Recorded the critic's cycle 2 pass 2 on revision 7 (APPROVED, critique closed; `critiques/closed/019-slate-formatting-discord-engine-critique.md`, record `16ca70fe`) and the architect's delta pass (APPROVED_WITH_CHANGES on CF-14 LOW; record `27f61730`) in the owed re-verdicts table. Registered Planner batch row CF-14, holding M4's approval. |
| 2026-11-23T17:57 | R-14 | planner-019 | Registered steering's revision cap on M4 and M6 (effort rulings block "2026-11-23T17:56Z", record `b95a3d43`) as a scope constraint beside the Decisions Register, with its date, reason and voiding event. Re-dispositioned CF-14 under it as a stated limit with no revision round. Status write: M4 and M6 wait on QA's re-key of revision 7 alone. |
| 2026-11-23T17:57 | R-15 | planner-019 | Recorded the architect's reconcile under the cap: revision 7 APPROVED for M4 and M6, with CF-14 a stated limit (`architecture/019-slate-formatting-discord-engine-architecture-findings.md` § Delta pass, revision 7, reconcile note, record `6a669d8`). |
| 2026-11-23T17:59 | 8 | planner-019 | Folds QA's re-key on revision 7 (`c6fa2e26`): QAF-26, a severity-floor finding and so excepted from steering's cap (block 17:56Z; GLOSSARY "Severity floor"), with CF-14 carried by its third point. QAF-27 becomes a stated limit under the cap. It also registers D-16 (effort rulings block 17:58Z, record `d5642c26`). § Finding disposition (revision 8) maps each. Correction: revision 7's AC-4.7 and CF-13's row said the picker "already omits `R`". It offers `R` as a separate button (`MarkdownTimestamp.tsx:115-122` at `af3d95a`, read this pass). The error was mine, found by steering, and the question put to him carried the right premise. Scope delta: AC-4.7 names the resolved dayjs locale and gains one fixture and mutant per branch (pre-mount, mounted, a loaded locale, an unloaded tag). M6 is released. No milestone was added or removed. Size: unchanged. |
| 2026-11-23T18:01 | R-16 | planner-019 | Registered AN-8 limb 5 as landed on its Planner batch row (analysis record `1b5a46d2`, § Findings "Limb 5"); RK-2's text takes it at the next seam fold. |
| 2026-11-23T18:02 | R-17 | planner-019 | Recorded the architect's delta pass on revision 8 (APPROVED; record `e1e6f363`) in the owed re-verdicts table. Registered Planner batch row CF-15 as a stated limit under the cap: AC-4.7's `ja-JP` fixture is read as `vi-VN`, because the site loads `dayjs/locale/ja`. That was the planner's error. |
| 2026-11-23T18:03 | R-18 | planner-019 | Recorded QA's re-key on revision 8 (QAF-28 MEDIUM, a severity floor; record `5ca68b07`) in the owed re-verdicts table, and registered Planner batch row QAF-28, which folds at revision 9 after the critic's cycle 3 verdict. |
| 2026-11-23T18:04 | 9 | planner-019 | Folds the three gates' verdicts on revision 8 as one batch, as steering's ruling directs (effort rulings block 18:02Z, record `0a794563`): QA's QAF-28 (`5ca68b07`), the critic's F-33 with SL-10 (`683f3e9`) and the architect's CF-15 (`e1e6f363`). All three name one member, revision 8's `ja-JP` fixture, which is a locale `loadLocales.ts` loads. § Finding disposition (revision 9) maps each, and registers block 18:02Z beside block 17:56Z. The `ja-JP` choice came from QA's P-Q18 and was taken over by the planner. Both documents now record it. Scope delta: AC-4.7's unloaded-tag fixture becomes `vi-VN`, with the site's locale files loaded and the tag supplied through react-aria, and its locale sentence cites P-Q19. Nothing else changed. No milestone was added or removed. Size: unchanged. |
| 2026-11-23T18:06 | R-19 | planner-019 | Recorded QA's re-key on revision 9 (QAF-28 closed, nothing open; `qa/019-slate-formatting-discord-engine-qa.md` § Re-key on Revision 9, record `26f3a3c`) in the owed re-verdicts table. |
| 2026-11-23T18:06 | R-20 | planner-019 | Recorded the architect's delta pass on revision 9 (APPROVED; CF-16 LOW is with steering under block 18:02Z; record `559253f1`) in the owed re-verdicts table. |
| 2026-11-23T18:07 | R-21 | planner-019 | Registered Planner batch row CF-16 as a stated limit, decided by steering (effort rulings block "2026-11-23T18:06Z", record `e8386c2c`), carrying the architect's remedy to the M4 implementer. |
| 2026-11-23T18:15 | R-22 | planner-019 | Recorded the critic's cycle 3 pass 2 on revision 9 (APPROVED, critique closed; `critiques/closed/019-slate-formatting-discord-engine-critique.md`, record `c1e40234`). Status write: revision 9 is approved by all three gates, and M2 to M7 are ready for implementation on his approval. Resumption State written for a checkpoint. |
| 2026-11-23T18:49 | R-23 | implementer-019 | Status write: In Progress. Implementation of M2 to M6 starts on the chain branch at `5ec0621`, on steering's recorded start (effort rulings block "2026-11-23T18:48Z — 9e released and closing; website tree to plan 019; implementation start"). |
| 2026-11-23T19:15 | R-24 | code-reviewer-019 | Code review Round 1, milestone-scoped (M2 at website `22f3e58`, AC-2.1 to AC-2.7 as Revision 9 states them): REJECTED on CR-1 MEDIUM, a severity floor, and CR-2 MEDIUM; CR-3 and CR-4 are LOW. `code-review/019-slate-formatting-discord-engine-code-review.md`. Plan Status is not moved. |
| 2026-11-23T19:26 | R-25 | code-reviewer-019 | Code review Round 1 sub-entry, milestone-scoped (M2 paths at website `78c5f74`): CR-1 and CR-2 resolved, APPROVED_WITH_COMMENTS. CR-3 is carried to M5 and CR-4 to the M3 round. Same document, record `3d583e9c`. Plan Status is not moved. |
| 2026-11-23T19:35 | R-26 | qa-019 | QA Phase 2 on M2 (milestone-scoped) at website `78c5f74`: **QA Failed** on QAF-29 MEDIUM. AC-2.4's declared clause is unmet for the five modifier members of `Inline` (bold, italic, underline, strikethrough, spoiler), which no map holds. QAF-30 LOW. AC-2.1 to AC-2.3, AC-2.6 (control discriminating) and AC-2.7 pass; AC-2.5's surface limbs belong to M4 and M5. `qa/019-slate-formatting-discord-engine-m2-qa.md`. The plan's Status is not moved. |
| 2026-11-23T19:45 | R-27 | code-reviewer-019 | Code review Round 2, milestone-scoped (M2 paths at website `7dcedc9`, the fix for QAF-29 and QAF-30): APPROVED_WITH_COMMENTS, no new finding. CR-3 is carried to M5 and CR-4 to the M3 round. `code-review/019-slate-formatting-discord-engine-code-review.md`, record `86ba88f4`. Plan Status is not moved. |
| 2026-11-23T19:49 | R-28 | qa-019 | QA Phase 2 refresh on M2 (milestone-scoped) at website `7dcedc9`, after fix round 2: **QA Complete**. QAF-29 and QAF-30 are closed, each seen red under a QA mutant. The offline suite is 3041 of 3041, exit 0. AC-2.1 to AC-2.4, AC-2.6 and AC-2.7 pass; AC-2.5's surface limbs belong to M4 and M5. `qa/019-slate-formatting-discord-engine-m2-qa.md`. The plan's Status is not moved. |
| 2026-11-23T21:24 | R-29 | code-reviewer-019 | Code review Round 3, milestone-scoped (M3 at website `f4060c5`): REJECTED on CR-5 MEDIUM (the generator's game mention is AN-8's withdrawn `<game:id>`, so no input exercises `GAME_MENTION`) and CR-6 MEDIUM (the oracle window keeps live XHR and WebSocket). CR-7 LOW asks for the three base-red hold-outs' deletion as an M6 exit condition, routed to the planner. `code-review/019-slate-formatting-discord-engine-code-review.md`, record `dd5b093d`. Plan Status is not moved. |
| 2026-11-23T21:25 | R-30 | planner-019 | Registered CR-7's M6 carriage as a Planner batch row, a stated limit under the M6 cap (block 17:56Z); its words live in `code-review/019-slate-formatting-discord-engine-code-review.md` CR-7, Round 3 (record `dd5b093d`). Disclosed: the stamp gate refused my first stamp, which I had estimated, and I corrected it to the clock's time with `sed`. The record-write gate then refused a second shell write, so this note is made with Edit. |
| 2026-11-23T21:36 | 10 | planner-019 | Folds his selection on how the preview shows mentions (effort rulings block "2026-11-23T21:31Z", record `16f53b7c`; ledger block "2026-11-23T21:31Z — steering-hooks-fixer") as D-17 and AC-4.4's decision table. It also folds the Planner batch fact from block 21:18Z (record `988e5d69`): M4's Mirrors line names the mention rules, which resolve no id. The premises were re-read at website `5ec0621` this pass. Scope delta: AC-4.4 changes. A channel mention whose id is on the guild's channel list renders that channel's name. Every other mention keeps today's form, and nothing renders "unknown". The resolved-role and resolved-command limbs are gone, because the site holds no role or command data. This is a milestone-level scope delta on M4, which is open, so M4's mention code is held until the critic, the architect and QA pass this revision. This is the first revision since revision 9's approval. It triggers three delta reads: critic, architect, QA re-key. No milestone was added or removed. Size: the original ask, with one criterion's limbs changed inside M4. |
| 2026-11-23T21:42 | R-31 | planner-019 | Recorded the architect's delta pass on revision 10 (APPROVED; `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 10", record `b8d11f1b`) in the owed re-verdicts table. Registered Planner batch row CF-17 LOW, a stated limit under the M4 cap. |
| 2026-11-23T21:43 | R-32 | planner-019 | Recorded the critic's cycle 4 pass 1 on revision 10 (APPROVED, critique closed; `critiques/closed/019-slate-formatting-discord-engine-critique.md`, record `71b981ad`) in the owed re-verdicts table. Registered Planner batch rows F-34 with SL-11, including RK-8's record line, and F-35 MEDIUM. |
| 2026-11-23T21:43 | R-33 | planner-019 | Recorded QA's Phase 1 re-key on revision 10 (nothing blocking; `qa/019-slate-formatting-discord-engine-qa.md` § Re-key on Revision 10, record `f79d7f77`) in the owed re-verdicts table. QAF-31 LOW is added to the F-34 row as the same member. QA's register row B-7 is recorded on the F-35 row. |
| 2026-11-23T21:44 | R-34 | planner-019 | Recorded on the F-35 row QA's re-specification of B-7 into two limbs (`qa/019-slate-formatting-discord-engine-qa.md`, record `ca6d0f21`). |
| 2026-11-23T22:19 | R-35 | planner-019 | Registered two Planner batch rows from the M4 implementation document's Outstanding 0 (record `3e47795f`), relayed by steering: the custom emoji `alt`, and large emoji. |
| 2026-11-23T22:21 | R-36 | planner-019 | Recorded on the large-emoji row steering's answer from his rulings (effort rulings block "2026-11-23T22:20Z", record `d5b28c7`). |
| 2026-11-23T22:28 | 11 | planner-019 | Answers implementer-019's AC-3.7 question (message, 22:2xZ, relayed by steering) by taking its option A. The implementer's residue measurement at website `6379abc` carries the argument; its figures are not re-derived by the planner. Scope delta: AC-3.7's frozen residue list changes from class-predicate entries to one literal entry per differing input, per surface and mask, each naming a family and a reason. A stale entry now fails. The count RK-9 reads becomes entries per surface. AC-3.7 is an M3 criterion, so the M4 cap does not apply, and the change tightens a test instrument without changing product behaviour, so it is not put to him. This is the second revision since revision 9's approval. It triggers three delta reads: critic, architect, QA re-key. No milestone was added or removed. Size: the original ask. |
| 2026-11-23T22:32 | R-37 | planner-019 | Recorded QA's Phase 1 re-key on revision 11 (`qa/019-slate-formatting-discord-engine-qa.md`, record `047add44`) in the owed re-verdicts table. Registered Planner batch rows QAF-34 MEDIUM and QAF-35 LOW, which fold at revision 12 once the critic and the architect have read revision 11. |
| 2026-11-23T22:32 | R-38 | planner-019 | Recorded the architect's delta pass on revision 11 (APPROVED_WITH_CHANGES; `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 11", record `744abb20`) in the owed re-verdicts table. CF-18 MEDIUM is added to the QAF-34 row as the same member. Registered Planner batch row CF-19 LOW. |
| 2026-11-23T22:34 | 12 | planner-019 | Folds the three gates' reads of revision 11: QA's re-key (`047add44`: QAF-34, QAF-35), the architect's delta pass (`744abb20`: CF-18, the same member as QAF-34, and CF-19), and critique cycle 5 pass 1 (`08caeb87`: APPROVED, with F-36, the same member again, and F-37). It is taken now, not parked, because M4's residue-list commit is waiting on it. Revision 11 rode his D-14 selection, whose words include "the rest are listed" (F-37 (1)). Scope delta: AC-3.7's population now includes atom-bearing inputs, with an atom unit compared on kind and source span (architect option a, QA option 1). M4 measures every input and records the entry count per surface and mask. A family check fails an unknown family or a count mismatch. The stale-entry and family limbs are exercised at M4. RK-9 fires once at M4 to steering with the measured counts, and again on any rise. This is the third revision since revision 9's approval. It triggers three delta reads: critic, architect, QA re-key. No milestone was added or removed. Size: the original ask. |
| 2026-11-23T22:36 | R-39 | planner-019 | Recorded QA's Phase 1 re-key on revision 12 (nothing open; `qa/019-slate-formatting-discord-engine-qa.md`, record `e645035`) in the owed re-verdicts table. |
| 2026-11-23T22:37 | R-40 | planner-019 | Recorded the architect's delta pass on revision 12 (APPROVED_WITH_CHANGES; `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 12", record `237da08`) in the owed re-verdicts table. Registered Planner batch row CF-20 LOW, which folds at revision 13 with the critic's read of revision 12. |
| 2026-11-23T22:38 | R-41 | planner-019 | Registered steering's revision cap on M3 (effort rulings block "2026-11-23T22:35Z", record `41101e70`) beside the M4 and M6 cap. Recorded the critic's cycle 6 pass 1 on revision 12 (APPROVED; `critiques/closed/019-slate-formatting-discord-engine-critique.md`, record `575a52bc`) in the owed re-verdicts table. Under the cap, CF-20 is re-dispositioned from a revision-13 fold to stated limit SL-12, together with F-38, the same member. F-39 becomes stated limit SL-13. Status write: M4's residue-list commit is released. |
| 2026-11-23T22:38 | R-42 | planner-019 | Recorded the architect's re-disposition of its revision 12 verdict under the M3 cap (APPROVED, CF-20 a stated limit; record `f7b21366`) in the owed re-verdicts table. |
| 2026-11-23T23:34 | R-43 | planner-019 | Registered D-18, his selection answering RK-9's M4 firing, which keeps D-14 as it stands. Its words live in effort rulings block "2026-11-23T23:33Z" (record `3572a0bd`) and ledger block "2026-11-23T23:33Z — steering-hooks-fixer". RK-9's record takes the line at the seam fold. |
| 2026-11-24T00:27 | R-44 | planner-019 | Registered the M4 implementation document's Outstanding 0a, items (c) to (h) (record `bc73f58c`, sent by implementer-019 at M4's hand-off at website `e58f2ed`), as six Planner batch rows. Each is a stated limit under the M3 and M4 caps. |
| 2026-11-24T00:51 | R-45 | planner-019 | Registered the cap on M4, M5 and M6 from his selection (effort rulings block "2026-11-24T00:49Z", record `8de0ac36`) beside the M3 cap. Recorded steering's commission on shipping M4 alone, and the planner's assessment, as a Planner batch row. Status write. |
| 2026-11-24T00:55 | R-46 | planner-019 | Registered D-19, his selection to keep one release, whose words live in effort rulings block "2026-11-24T00:55Z" (record `11fab77b`). The "Split assessment" row takes the block's measured drift and its correction of my W-3 wording. Status write. |
| 2026-11-23T22:50 | R-43 | qa-019 | QA Phase 2 on M3 (milestone-scoped) at website `2c1590f`: **QA Failed** on QAF-32 MEDIUM and QAF-33 MEDIUM, both severity floors, excepted from the M3 cap (block 22:35Z). QAF-32: offline, `pnpm test:discord` as a whole prints `Tests 3 passed`, which AC-3.5 forbids, and the three passes are AC-3.5's own case. QAF-33: the drift alarm writes no hash to the run output, so C2 would pass silently; today served equals pinned. The other assessed criteria pass, and AC-3.4 is 22 of 29 product mutants killed with every survivor dispositioned. Offline 3348 of 3348 exit 0; live 38 of 38 exit 0, the attempts case included; Findings 5 reproduced at `f4060c5`. Register row B-8 (the `beforeinput` paste branch, UAT). `qa/019-slate-formatting-discord-engine-m3-qa.md`. The plan's Status is not moved. |
| 2026-11-23T22:02 | R-35 | code-reviewer-019 | Code review Round 3 sub-entry, milestone-scoped (M3's fix commit at website `1698c80`): CR-5 and CR-6 RESOLVED; REJECTED on CR-10 MEDIUM (severity floor: the live control's empty `oracle.attempts` has no assertion that fails when `loadBuild`'s wiring is cut or a refused XHR is touched before `open`). `code-review/019-slate-formatting-discord-engine-code-review.md`. Plan Status not moved. |
| 2026-11-23T22:11 | R-36 | code-reviewer-019 | Code review Round 3 sub-entry, milestone-scoped (M3 at website `2c1590f`): CR-10 RESOLVED; CR-11 LOW raised (the XHR refusal records a member when it is called, not when it is read); APPROVED_WITH_COMMENTS, and M3 goes to QA Phase 2. `code-review/019-slate-formatting-discord-engine-code-review.md`. Plan Status not moved. |
| 2026-11-24T01:01 | R-37 | code-reviewer-019 | Code review Round 4, milestone-scoped (M4 at website `e58f2ed`): APPROVED_WITH_COMMENTS. The link allow-list held at the rendered anchor on all six surfaces; CR-12 and CR-13 LOW are stated limits under the 00:49Z cap. Round 3 sub-entry at `380e82d` (M3, test-only): APPROVED_WITH_COMMENTS, CR-14 LOW. `code-review/019-slate-formatting-discord-engine-code-review.md`. Plan Status not moved. |
| 2026-11-24T01:02 | R-47 | planner-019 | Numbering reconcile. The four rows above, qa-019's 22:50 "R-43" and code-reviewer-019's 22:02 "R-35", 22:11 "R-36" and 01:01 "R-37", repeat numbers my rows already hold. They keep their labels as committed and are cited by stamp and author. The sequence continues from R-47. Registered code review CR-11 to CR-14 LOW (record `d31214e4`) as Planner batch rows, stated limits under the 00:49Z cap. |
| 2026-11-24T01:05 | R-48 | planner-019 | Recorded on the CR-13 row the reviewer's resolution (record `06cbf54d`); the row is discharged. |
| 2026-11-24T01:10 | R-49 | qa-019 | QA Phase 2 refresh on M3 fix round 5 (`380e82d`), run at website `e58f2ed`: **QA Failed**, milestone-scoped. QAF-32 is closed, and QAF-33's write limb is closed. QAF-36 MEDIUM is open, a severity floor excepted from the cap: nothing tests that the drift alarm fires on a mismatch. Fix round 6 is owed. Document: `qa/019-slate-formatting-discord-engine-m3-qa.md`, § Refresh pass. |
| 2026-11-24T01:11 | R-50 | qa-019 | QA Phase 2 on M4 at website `e58f2ed`: **QA Failed** at the TDD compliance gate. Five production rows owe the stub-tree red and green; no M4 criterion is assessed yet. Document: `qa/019-slate-formatting-discord-engine-m4-qa.md`. |
| 2026-11-24T01:29 | R-51 | qa-019 | QA Phase 2 on M4 at website `e58f2ed`, re-opened at the TDD gate on the stub-tree records (record `d81cb502`): **QA Complete**, milestone-scoped. AC-3.1, AC-3.6, AC-3.7 (RK-9's count unchanged at 6,142), AC-3.8 (ii) (no members), AC-4.1 to AC-4.8 and AC-2.6 pass. B-2 and B-7 stay with UAT. QAF-37 LOW (a case that cannot fail) is a stated limit for the Planner batch. Document: `qa/019-slate-formatting-discord-engine-m4-qa.md`. |
| 2026-11-24T01:30 | R-52 | planner-019 | Registered QAF-37 LOW as a Planner batch row, a stated limit under the M4 cap. Recorded QA's second-instrument check of the exclusion set on the R-44 (e) and (g) rows (`qa/019-slate-formatting-discord-engine-m4-qa.md`, record `912c7307`). Disclosed: the record-write gate refused a shell edit of this file, and the change was re-issued with the Edit tool. |
| 2026-11-24T01:54 | R-53 | code-reviewer-019 | Code review, Round 3 sub-entry on M3 fix round 6 (QAF-36) at website `b04c09f`: **REJECTED**, milestone-scoped, on CR-15 MEDIUM, a severity floor excepted from the cap. With `driftReport` handing the pinned file to the comparison as the served bytes, the offline case and 15 of 15 live cases pass. `compareWasm` itself is killed under `match = true`, under `match = false` and with its message arms swapped. CR-16 LOW is a stated limit for the Planner batch. Record `7b4c1ad3`. The plan's Status is not moved. |
| 2026-11-24T01:54 | R-54 | planner-019 | Registered two Planner batch rows from code review's Round 3 sub-entry at `b04c09f` (record `7b4c1ad3`): CR-16 LOW, a stated limit under the M3 cap, and CR-15's Risks line for the seam fold. CR-15's code goes to fix round 7. |
| 2026-11-24T02:07 | R-55 | code-reviewer-019 | Code review, fix confirmation of CR-15 at website `d6aab03` (M3 fix round 7): **APPROVED_WITH_COMMENTS**, milestone-scoped. 10 of 11 mutants were killed, network-isolated, and both operand mutants fail on `match`. The live default passes 15 of 15. QAF-36 is closed on both limbs, and M3 goes to QA's refresh. CR-16 LOW stays a stated limit (R-54). Record `fed65ffa`. The plan's Status is not moved. |
| 2026-11-24T02:13 | R-56 | qa-019 | QA refresh on M3 fix rounds 6 and 7 at website `d6aab03`: **QA Failed**, milestone-scoped. QAF-36 is closed. QAF-38 MEDIUM is open, a severity floor excepted from the cap: `routingReport`, which AC-3.8 (i) and (i′) read, is QAF-36's class, and 0 of 6 field mutants are killed live. One fix round is owed. Document: `qa/019-slate-formatting-discord-engine-m3-qa.md`, § Refresh pass, rounds 6 and 7. |
| 2026-11-24T02:43 | R-57 | code-reviewer-019 | Code review, fix confirmation of QA's QAF-38 at website `81c68b2` (M3 fix round 8): **APPROVED_WITH_COMMENTS**, milestone-scoped. 14 of 14 mutants were killed, network-isolated: QA's six constants, five operand or member swaps, both `switchReferrers` forms, and the fetcher not passed on. The live routing controls pass 5 of 5. M3 goes to QA's refresh. Record `47e4ccf5`. The plan's Status is not moved. |
| 2026-11-24T02:50 | R-58 | qa-019 | QA refresh on M3 fix round 8 at website `81c68b2`: **QA Complete**, milestone-scoped. QAF-38 is closed: 6 of 6 `routingReport` field mutants killed offline. Offline 3,272 of 3,272, exit 0; live 41 of 41, exit 0; typecheck exit 0. Every M3 finding is closed. The plan's Status is not moved. Document: `qa/019-slate-formatting-discord-engine-m3-qa.md`, § Refresh pass, round 8. |
| 2026-11-24T03:49 | R-59 | planner-019 | Registered D-20 (his selection on `SlateEditor/index.tsx`'s pre-existing eslint errors; effort rulings block "2026-11-24T03:48Z", record `6866cd75`) and its Planner batch row, a stated limit carried by `handoff/slateeditor-index-preexisting-react-hooks-lint-errors-2026-11-24.md` (UUID 67001740). |
| 2026-11-24T03:57 | 13 | planner-019 | Triggered by D-21 (block 03:55Z, record `5781bb73`), and by implementer-019's probe at `2e36107` showing that Discord's box exposes no emoji spans, which M6's entry condition routes to the planner. AC-6.5's expected spans now come from AC-2.1's oracle helper on every surface, frozen as literals, with hand-written literals replacing the box's content control and QAF-24's mask control kept. EC-7 is retired, since the source is now the engine D-13 names. Candidate (B), the legacy formatter, was not taken because it is not the formatter D-13 chose, and its disagreeing inputs would be listed, not checked. Candidate (C) alone would turn the property into examples, so it serves only as the content control. Scope delta: AC-6.5 changes its expected-value source and entry conditions, and no other milestone moves. Since approval, revisions 10 to 13 have each been read once by the three gates, and this one triggers one round of each. The plan still delivers what was first asked. |
| 2026-11-24T04:00 | R-60 | code-reviewer-019 | Code review Round 5, milestone-scoped (M5 at website `2e36107`, AC-5.1 to AC-5.8 as Revision 12 states them; AC-5.5 is UAT's): **APPROVED_WITH_COMMENTS**. Revision 13 changes AC-6.5 only and no AC-5 line, so the verdict does not expire. CR-3 is RESOLVED (one leaf-role source). Three LOW stated limits for the Planner batch: CR-17 (M4's `visibleForm` dead inline-code arm; the preview's inline code is still guarded by M4's tests, 2 of 2 mutants killed), CR-18 (AC-5.8's emoji exclusion drops whole inputs; carrier: M6's round, after AC-6.5) and CR-19 (three dead interactive parsers). Record `fdb41883`. The plan's Status is not moved. |
| 2026-11-24T04:00 | R-61 | planner-019 | Registered CR-17, CR-18 and CR-19 LOW as Planner batch rows, stated limits under the cap (`code-review/019-slate-formatting-discord-engine-code-review.md` § "Findings (Round 5)", record `fdb41883`). CR-18 and CR-19 are sent to implementer-019 and qa-019 for M6's round. |
| 2026-11-24T04:04 | 14 | planner-019 | Triggered by D-22 (block 04:00Z, record `603fb039`) on implementer-019's quote question, with QA's Discord walk (`1e84abe1`) and the implementer's measurement that the split carry is the one cause of the 194 mounted hold-outs. It also folds the critic's cycle 7 F-40 (`fad4948a`). AC-6.7 gives D-22's decision table; AC-3.3's typed drive follows it; AC-6.5's control gains a cross-line bold member; an owed re-verdicts cell no longer says EC-7 is pending. No Discord read is owed for the `> > ` case, because D-22 decides it and the residue says so. Scope delta: M6 gains AC-6.7 and AC-3.3's typed limb changes its drive; no other milestone moves. Since approval, revisions 10 to 14 have each taken one round per gate, and this one triggers cycle 8 plus one architect and one QA round. The plan still delivers what was first asked. |
| 2026-11-24T04:05 | R-62 | planner-019 | Recorded the architect's delta pass on revision 13 (APPROVED; `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 13", record `d9ddfd22`) in the owed re-verdicts table, and registered CF-21 LOW as a Planner batch row, a stated limit under the M6 cap. |
| 2026-11-24T04:07 | R-63 | planner-019 | Recorded critique cycle 8 pass 1 on revision 14 (APPROVED, closed; `critiques/closed/019-slate-formatting-discord-engine-critique.md`, record `f0488807`) in the owed re-verdicts table. Registered F-41 LOW (SL-15) and F-42 MEDIUM (SL-16) as Planner batch rows, stated limits under the M6 cap, both sent to implementer-019 and qa-019. |
| 2026-11-24T04:08 | R-64 | planner-019 | Recorded the architect's delta pass on revision 14 (APPROVED; `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 14", record `e093c8aa`) in the owed re-verdicts table, and registered CF-22 and CF-23 LOW as Planner batch rows, stated limits under the M6 cap, sent to implementer-019. |
| 2026-11-24T04:13 | R-65 | qa-019 | QA Phase 2 on M5 at website `2e36107`: **QA Failed**, milestone-scoped, on QAF-39 MEDIUM, a severity floor excepted from the cap. Survivor m5-d2 (the quote prefix left out of the run unit) is separated by `>>> a\n> _\n> _b_` on four surfaces, and no case fails. Every other assessed criterion passes; AC-5.5 is UAT's (B-3). The M4 differential shows 0 of 14,280 preview rows moved, so M4's verdict re-anchors at `2e36107`. One fix round is owed. Document: `qa/019-slate-formatting-discord-engine-m5-qa.md`. |
| 2026-11-24T04:17 | R-66 | qa-019 | QA Phase 1 re-key on Revisions 13 and 14, as one. AC-6.5's helper is independent of the lift (its one import is `@discord/markdown-wasm`), but `parse` carries no source span: `😄:smile:`, `:smile:😄` and `😄😄` give one identical tree, and an escape before an emoji moves the offsets. **QAF-40 MEDIUM**: the join, not the engine, decides those spans, and the control has no such member. It holds AC-6.5's literal freeze. **QAF-41 LOW**: AC-6.7's `>>>` and fence exclusions each need a sole-carrier fixture and a mutant (NM-68, NM-69), and the typed drive must key on the table, not on the editor's state. B-9 minted for AC-6.7's walk (SL-15). Document: `qa/019-slate-formatting-discord-engine-qa.md`, § Re-key on Revisions 13 and 14. |
| 2026-11-24T04:18 | R-67 | planner-019 | Recorded QA's re-key on revisions 13 and 14 (record `a1b54c49`) in the owed re-verdicts table. Registered QAF-40 MEDIUM and QAF-41 LOW as Planner batch rows. QAF-40 goes to steering for the cap ruling QA names, and QAF-41 goes to implementer-019. |
| 2026-11-24T04:19 | 15 | planner-019 | Triggered by steering's ruling excepting QAF-40 from the M6 cap (effort rulings block "2026-11-24T04:18Z", record `56a44cc0`), on QA's re-key `a1b54c49`. AC-6.5's control gains QAF-40's five side-by-side and escape members, with the first-occurrence join mutant, which is remedy (b); (a) is not taken, since it is larger. QAF-41 is folded in the same pass at no extra round: AC-6.7 gains NM-68 and NM-69, and AC-3.3's drive reads the table from the input's text. Scope delta: AC-6.5's control and AC-6.7's mutants gain members, and AC-3.3's drive gains one clause; no milestone is added. Since approval, revisions 10 to 15 have run. This is AC-6.5's third consecutive revision, which the block decides, and it triggers one round of each gate on this delta. The plan still delivers what was first asked. |
| 2026-11-24T04:20 | R-68 | qa-019 | QA Phase 1 re-key on Revision 15. QAF-40 and QAF-41 are closed at their cited places. **QAF-42 LOW**: as written, NM-68's fixture `>>> a⏎> b` and NM-69's `` ```⏎> x `` end on the quoted line, so the typed drive presses no Enter where the mutant's carry would fire. Each fixture needs a following line (`>>> a⏎> b⏎c`, `` ```⏎> x⏎y ``) or an explicit Enter. A stated limit under the M6 cap. Nothing holds AC-6.5's literal freeze on QA's account. Document: `qa/019-slate-formatting-discord-engine-qa.md`, § Re-key on Revision 15. |
| 2026-11-24T04:21 | R-69 | planner-019 | Recorded QA's revision 15 re-key (record `3b264329`) in the owed re-verdicts table, and registered QAF-42 LOW as a Planner batch row, a stated limit under the M6 cap, sent to implementer-019. The dropped Enter in revision 15's fixtures is my fold's error: QAF-41 named the key. |
| 2026-11-24T04:21 | R-70 | planner-019 | Recorded the architect's delta pass on revision 15 (APPROVED; `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 15", record `f6f6651e`) in the owed re-verdicts table, and registered CF-24 LOW as a Planner batch row, a stated limit under block 04:18Z, sent to implementer-019. |
| 2026-11-24T04:23 | R-71 | planner-019 | Recorded critique cycle 9 pass 1 on revision 15 (APPROVED; `critiques/closed/019-slate-formatting-discord-engine-critique.md`, record `bf589c96`) in the owed re-verdicts table, so all three gates have passed revision 15. Registered F-43 LOW (SL-17) as a Planner batch row, sent to implementer-019 and qa-019. F-44 is the same member as QAF-42 and is recorded on that row. Disclosed: the record-write gate refused one shell command that held a stray `sed -i`. It was re-issued as the read-only `grep` it needed, and the plan was edited with the Edit tool. |
| 2026-11-24T04:52 | R-72 | planner-019 | Registered steering's ruling on the 22 AC-6.5 members where a hand-written literal and the helper differ (effort rulings block "2026-11-24T04:51Z", record `89dae9f6`) as a Planner batch row: the literals take the helper's values, the 12 link-address members are a stated limit, and the 10 link-label members sit under D-5 and G-14. |
| 2026-11-24T05:14 | R-73 | code-reviewer-019 | Code review, Round 5 sub-entry on M5 Fix Round 1 (QAF-39) at website `cf126ea`: **APPROVED_WITH_COMMENTS**, milestone-scoped. Checked on M5's own source (`2e36107` with `cf126ea`'s four test paths laid over it): the new frozen members x8 and x9 pass, m5-d2 is killed on x8, and the live box re-derives both values (10 of 10). The M5 paths at `cf126ea` carry M6's changes, which are M6's round. Record `79f96321`. The plan's Status is not moved. |
| 2026-11-24T05:17 | R-74 | planner-019 | Registered implementer-019's reading of AC-6.5's run-unit sentence (source text for the lift, `?` for the decorator; M6 document Outstanding Items 2) as a Planner batch row, confirmed as a stated limit under block 04:18Z. |
| 2026-11-24T05:20 | R-75 | qa-019 | QA refresh on M5's QAF-39 fix round (`cf126ea`, test-only), run on `2e36107` with the round's four test paths laid over it, the tree code review approved (steering block 05:14Z): **QA Complete**, milestone-scoped. QAF-39 is closed: m5-d2 is KILLED by `decorator.native-box-classes` on x8. Offline 3,280 of 3,280, exit 0; typecheck exit 0; live 41 of 41, exit 0. AC-5.5 is UAT's (B-3). The plan's Status is not moved. Document: `qa/019-slate-formatting-discord-engine-m5-qa.md`, § Refresh pass — QAF-39 fix round. |
| 2026-11-24T05:21 | R-76 | planner-019 | Marked M7 `PREMISE-STALE` under the re-derivation gates of M4 and M5, both now shipped on the chain branch. M7 is the one downstream milestone not yet authorised. Its re-argument paragraph is owed as a plan revision before devops Stage 1, at the seam fold. The marking was owed from M4's ship at `e58f2ed`, and I missed it then. Retrospective note: the gate has no trigger that reaches the planner when a milestone ships. |
| 2026-11-24T06:54 | R-77 | code-reviewer-019 | Code review Round 6, milestone-scoped (M6 at website `119471f`, AC-6.1, AC-6.1b, AC-6.2, AC-6.5, AC-6.6 and AC-6.7 as Revision 15 states them; AC-6.3 is UAT's): **APPROVED_WITH_COMMENTS**. CR-18 and CR-19 are RESOLVED. AC-6.1b's read holds at the chain base and the tip. The run-unit move is measured decision-neutral (0 of 36,690 nodes differ, with a firing control). Stated limits for the Planner batch: CR-20 MEDIUM (the normaliser rebuilds the run unit per line on every operation; 71 ms per keystroke at 400 lines against 1.1 ms at the base, measured in node; sent to steering for the owner's word on the cap) and CR-21 LOW (`emoji-regex` has no importer). Record `8c2a4593`. The plan's Status is not moved. |
| 2026-11-24T06:55 | R-78 | planner-019 | Registered CR-20 MEDIUM (open, pending his word on the cap via steering), CR-21 LOW and the reviewer's `jumboable` wording note as Planner batch rows (code review Round 6, record `8c2a4593`), and marked the CR-18 and CR-19 rows discharged. |
| 2026-11-24T06:58 | R-79 | qa-019 | QA Phase 2 on M6 at website `119471f`: **QA Failed** at the TDD compliance gate. Five new or changed production functions (`pointAtOffset`, `flatOffset`, `startsOf`, `holdsSpan`, `emojiToImage`'s emoji case) owe a stub-tree red and green, and `parseUnit` owes that or a cited both-trees record. No M6 criterion is assessed yet. Document: `qa/019-slate-formatting-discord-engine-m6-qa.md`. |
| 2026-11-24T07:07 | 16 | planner-019 | Triggered by D-23 (block 07:05Z, record `3ec39942`): CR-20 is fixed before release, with the cap lifted for it alone. AC-6.8 bounds one keystroke's normalise cost. Its count limb in `pnpm test` builds a run unit at most once per changed unit and never more than twice, seen red at `119471f`. Its timed limb, outside the suite, holds the median at or under 16 ms at 200 to 2,048 lines, where the base takes 0.2 to 3.3 ms and the tip 17 to 1,626 ms (the helper's re-timing). R-78's CR-20 row is discharged into it. Scope delta: M6 gains AC-6.8 and CR-20's fix, on his word, and no other milestone moves. Since approval, revisions 10 to 16 have run. This one triggers one round of each gate, then M6's fix round, code review and QA. The plan still delivers what was first asked. |
| 2026-11-24T07:10 | R-80 | planner-019 | Recorded the architect's delta pass on revision 16 (APPROVED; § "Delta pass, revision 16", record `ce656dca`) and QA's re-key on revision 16 (record `d53b1b30`) in the owed re-verdicts table. Registered CF-25 LOW, CF-26 LOW, QAF-43 MEDIUM and QAF-44 LOW as Planner batch rows. QAF-43 and QAF-44 fold at the next revision once the critic's cycle 10 verdict is in, because AC-6.8 sits under D-23's lifted cap. |
| 2026-11-24T07:12 | 17 | planner-019 | Triggered by the three gates' reads of revision 16: the architect (`ce656dca`: CF-25, CF-26), QA (`d53b1b30`: QAF-43, QAF-44) and critique cycle 10 (`0ff39772`: APPROVED, with F-45). All fold into AC-6.8, under D-23's lifted cap. The count limb becomes equality per pass with a positive control and a `vi.mock` pass-through, with its window, character and positions fixed (F-45) and a merge fixture. A 1,000-line `a🙂` text joins both limbs. The timed limb's home is a `*.bench.ts`. Scope delta: AC-6.8's limbs tighten, and no milestone or work outside M6's fix round is added. Since approval, revisions 10 to 17 have run. This is AC-6.8's second revision, and it triggers one round of each gate. The plan still delivers what was first asked. |
| 2026-11-24T07:13 | R-81 | planner-019 | Registered steering's ruling deciding AC-6.8's third revision in advance (effort rulings block "2026-11-24T07:13Z — plan 019 AC-6.8: a third revision is decided now", record `1a6b2ec3`) in the Resumption State. |
| 2026-11-24T07:14 | R-82 | planner-019 | Recorded the architect's delta pass on revision 17 (APPROVED_WITH_CHANGES; § "Delta pass, revision 17", record `328a6eba`) in the owed re-verdicts table, and registered CF-27 MEDIUM as a Planner batch row, a stated limit under block 07:13Z, whose reading governs AC-6.8's count limb until the seam fold. Sent to steering, implementer-019 and qa-019. |
| 2026-11-24T07:17 | 18 | planner-019 | Triggered by steering's ruling making CF-27 a revision 18 exception, for the count literal only (effort rulings block "2026-11-24T07:15Z", record `5638dfe6`). AC-6.8's count window becomes one `Editor.normalize` drain, and its literal the lines the keystroke dirties (1, 2, 1), replacing "distinct run units" per pass. Nothing else changes. The same pass registers the critic's cycle 11 F-46 (SL-19) and F-47 (SL-20) as Planner batch rows (record `2170bc3d`). Scope delta: AC-6.8's count window and literal only. Since approval, revisions 10 to 18 have run. This is AC-6.8's third revision, under steering's exception, and it is read inside the critic's and QA's current reads with the architect confirming CF-27. The plan still delivers what was first asked. |
| 2026-11-24T07:18 | R-83 | planner-019 | Recorded the architect's delta pass on revision 18 (APPROVED, CF-27 resolved as folded; § "Delta pass, revision 18", record `2f2d99a0`) in the owed re-verdicts table. |
| 2026-11-24T07:20 | R-84 | planner-019 | Recorded critique cycle 11 pass 2 on revision 18 (APPROVED; record `e1106d42`) in the owed re-verdicts table. F-48 MEDIUM (SL-21) is held unregistered in form, at the critic's ask, until steering rules whether it is revision 19 or a Planner batch row. |
| 2026-11-24T07:22 | 19 | planner-019 | Triggered by steering's ruling on the critic's F-48 (effort rulings block "2026-11-24T07:21Z", record `9e980e29`), with QA's re-key on revisions 17 and 18 (`e74108e`, P-Q23). AC-6.8's count limb drops every per-keystroke literal. Over every drain, the run-unit count is equal at each sized text's 200-line and 2,048-line sizes (1,000 for `a🙂`) and at least 1, and the corpus and generator inputs take one hand-written bound of 4. `normalizeNode` calls are recorded, not asserted. NM-72's two-unit fixture and the fence-delimiter delete residue come from P-Q23. The timed limb is unchanged. Scope delta: AC-6.8's count property only, with no work outside M6's fix round. Since approval, revisions 10 to 19 have run, and this is AC-6.8's fourth, the last by steering's block. It triggers one round of each gate. The plan still delivers what was first asked. |
| 2026-11-24T07:24 | R-85 | planner-019 | Recorded the architect's delta pass on revision 19 (APPROVED; § "Delta pass, revision 19", record `ccddf880`) in the owed re-verdicts table, and registered CF-28 LOW as a Planner batch row, a stated limit under block 07:21Z, sent to implementer-019 and qa-019 because it adds a member to AC-6.8's text class. |
| 2026-11-24T07:25 | R-86 | planner-019 | Recorded critique cycle 12 pass 1 (APPROVED; record `73a6bce9`) and QA's re-key on revision 19 (record `4764a6e`) in the owed re-verdicts table. Every gate has passed revision 19, so CR-20's fix round is released. Registered F-49 MEDIUM (SL-22) and QAF-45 LOW, the same class, as one Planner batch row under block 07:21Z, sent to implementer-019 and qa-019. |
| 2026-11-24T07:44 | 20 | planner-019 | Triggered by steering's ruling (effort rulings block "2026-11-24T07:42Z", record `bc96c93b`) on implementer-019's report, not re-derived here, that a correct fix exceeds the corpus and generator bound of 4 (430 of about 26,000 keystrokes, maximum 8). AC-6.8 drops that bound, and its literal 8 is refused under axiom E. The equality limb gains fenced-quote texts of 200 and 2,048 lines, with the keystroke on a `> x` line, and the residue now states that the corpus and generator inputs carry no count bound. Scope delta: AC-6.8's count limb loses one bound and gains one sized text, with no work outside M6's fix round. Since approval, revisions 10 to 20 have run, and this is AC-6.8's fifth revision, reopening block 07:21Z for this change only. It triggers one delta read by each gate, and implementer-019's hand-off waits for all three. The plan still delivers what was first asked. |
| 2026-11-24T07:45 | R-87 | planner-019 | Recorded the architect's delta pass on revision 20 (APPROVED; § "Delta pass, revision 20", record `81d964c3`) and QA's re-key on revision 20 (§ "Re-key on Revision 20", record `0dca93e`) in the owed re-verdicts table, and registered CF-29 LOW as a Planner batch row, a stated limit under block 07:21Z, sent to implementer-019 and qa-019. |
| 2026-11-24T07:46 | R-88 | planner-019 | Recorded critique cycle 13 pass 1 on revision 20 (APPROVED; record `1c6ee275`) in the owed re-verdicts table. Every gate has passed revision 20, so the hand-off is released. Registered F-50 MEDIUM (SL-23) and F-51 LOW (SL-24) as Planner batch rows, stated limits under block 07:21Z, sent to implementer-019 and qa-019. |
| 2026-11-24T07:57 | R-89 | qa-019 | QA Phase 2 on M6 at website `119471f`: the TDD gate passes on the stub-tree records; **QA Failed**, milestone-scoped. AC-6.8 fails here as Revision 16 expects (counts grow with size; 1,798 ms at 2,048 lines), so CR-20's fix round is owed. AC-3.3's 60 s cap is exceeded (141.9 s against 31.1 s at the base). QAF-50 MEDIUM is a severity floor: AC-6.7's "partial mode … M6 does not change it" is unasserted, and W12 survives. QAF-46 to QAF-49 LOW, for the Planner batch. QAF-42 closed. M4 and M5 re-anchor at `119471f` (0 of 14,280; 0 of 6,486). The effort-final sweep moves to the fix tip. Document: `qa/019-slate-formatting-discord-engine-m6-qa.md`. |
| 2026-11-24T07:59 | R-90 | planner-019 | Registered QA's QAF-46 to QAF-49 LOW (record `4da9b76b`, § Findings) as Planner batch rows, stated limits under the M6 cap. QAF-46 was sent to implementer-019 and qa-019 because it adds a member to AC-6.5's control. QAF-47 and QAF-49 are carried by two new handoffs, cited in their rows. QAF-42's row records its closure. |
| 2026-11-24T08:18 | R-91 | planner-019 | Registered steering's ruling on AC-3.3's 60 s cap after CR-20's fix (effort rulings block "2026-11-24T08:17Z", record `9c5a0a04`) as a Planner batch row: the generator count drops to fit, and the seam fold records the new count. |
| 2026-11-24T09:08 | R-92 | planner-019 | Registered the CR-20 fix round's hand-off items (implementation document, record `9c6bb958`) as Planner batch rows: the full generator count's missing home, Outstanding 1 as residue, Outstanding 2 held for QA's probe at the chain base, and SL-23's measured premise. R-91's row now records the new count and drops its `pnpm test:discord` sentence. |
| 2026-11-24T09:15 | R-93 | planner-019 | Registered QA's QAF-51 LOW, pre-existing (record `b7a5d9c6`), in Outstanding 2's Planner batch row, carried by a new handoff cited there. |
| 2026-11-24T09:30 | R-95 | planner-019 | Registered code review's Round 6 sub-entry (record `602344ec`) as Planner batch rows: Outstanding 1's row widened to the unclean-fence class, CR-22 LOW a stated limit, and CR-23 MEDIUM a stated limit pending the owner's word through steering. |
| 2026-11-24T14:36 | 21 | planner-019 | Triggered by his selection "Agent: fix both first (Recommended)" (D-24; effort rulings block "2026-11-24T14:33Z", record `d7eb0a40`), which lifts the cap for two items. AC-6.9 is added: code-fence and `>>>` keystrokes settle without Slate's 126-iteration error, write their text, match a fresh load, leave the caret where the next character lands (QA's ask, record `22a797bc`), and meet a growth property and a fence ceiling outside the suite. Outstanding 2's and CR-23's batch rows are discharged into it, and handoff `124c6099` is superseded. Scope delta: M6 gains AC-6.9 and a second fix round on his word, a milestone-level delta he confirmed, and no other milestone moves. Since approval, revisions 10 to 21 have run. This one triggers one round of each gate, then the fix round, code review and QA's M6 re-check. The plan still delivers what was first asked, plus two editor fixes he chose. |
| 2026-11-24T14:40 | R-96 | planner-019 | Recorded the architect's delta pass on revision 21 (APPROVED; § "Delta pass, revision 21", record `f4a9534b`) in the owed re-verdicts table, and registered CF-30 LOW as a Planner batch row. |
| 2026-11-24T14:47 | R-97 | planner-019 | Recorded critique cycle 14 pass 1 on revision 21 (APPROVED; record `3910c29c`) in the owed re-verdicts table, and registered F-52 to F-55 (SL-25 to SL-28) as Planner batch rows. The helper's probe captures are copied to `verification/019/planning/fence-refute/`. Whether F-52's caret literal, F-55's arithmetic and CF-30's refusal land as revision 22 is put to steering. |
| 2026-11-24T17:05 | 22 | planner-019 | Triggered by steering's block "2026-11-24T14:48Z" (record `46278c24`), QA's re-key on revision 21 (QAF-52, record `225ef4a6`) and his selection "Agent: fix it too (Recommended)" (D-25; block "2026-11-24T17:03Z", record `0fa784d0`). AC-6.9's caret limb takes hand-written `>>>` texts (`>>> za`, `>>> zabc`, and `za` for the unmaking Backspace), seen red at `af3d95a` and `42128cd`. The no-throw limb refuses a caught throw or an unbounded `shouldNormalize` (CF-30), and the ceiling reads 27 and 104 ms, cited to `verification/019/planning/fence-refute/` (F-55). Scope delta: M6's second fix round gains the `>>>` caret fix on his word, and no milestone is added. Since approval, revisions 10 to 22 have run. This is AC-6.9's last fold by steering's block, taken by each gate inside its current read. The plan still delivers what was first asked, plus three editor fixes he chose. |
| 2026-11-24T17:08 | R-98 | planner-019 | Recorded the architect's delta pass on revision 22 (APPROVED; § "Delta pass, revision 22", record `f898b32f`) in the owed re-verdicts table, and registered CF-31 LOW as a Planner batch row. |
| 2026-11-24T17:10 | R-99 | planner-019 | Recorded critique cycle 14 pass 2 on revision 22 (APPROVED; record `50b2bbe0`) in the owed re-verdicts table, registered F-56 LOW as a Planner batch row, and corrected SL-26's row to the member count revision 22 lists. |
| 2026-11-24T17:11 | R-100 | planner-019 | Recorded QA's re-key on revision 22 (§ "Re-key on Revision 22", record `e2890214`) in the owed re-verdicts table. Every gate has passed revision 22, so the second M6 fix round is released to implementer-019. |
| 2026-11-24T19:20 | R-101 | planner-019 | Registered the second M6 fix round's hand-off figures (implementation document "Fix Round 2", record `0a086b41`; website `85ece66`) as a Planner batch row, and recorded F-56's settlement in its row. |
| 2026-11-24T19:21 | R-102 | planner-019 | Registered steering's ruling (effort rulings block "2026-11-24T19:20Z", record `7e662177`) in R-101's Planner batch row: QA records the box load beside each growth reading and calls the limb as written, and the planner's hold before a fail is withdrawn. |
| 2026-11-24T09:30 | R-94 | code-reviewer-019 | Round 6 sub-entry, milestone-scoped: M6 is **APPROVED_WITH_COMMENTS** at website `42128cd` (record `c970a8e`, `code-review/019-slate-formatting-discord-engine-code-review.md`). CR-20 is RESOLVED. CR-22 LOW: a failed median in AC-6.8's timed limb hangs the bench run (exit 124) instead of failing it. CR-23 MEDIUM: the fix's whole-unit settle per dirty line makes closing a fence cost 416 ms at 2,048 lines against 166 ms at `119471f`. Both are stated limits, CR-23 pending the owner's word through steering. Outstanding 1's family is wider than recorded, though still within QAF-48's class. The plan Status is not moved. |
| 2026-11-24T19:41 | R-103 | code-reviewer-019 | Round 7, milestone-scoped: M6 Fix Round 2 is **REJECTED** at website `85ece66` (record `e92137fe`, `code-review/019-slate-formatting-discord-engine-code-review.md`) on CR-25 HIGH. Its two new memories are keyed on `editor.children`, which every operation replaces, so whole-run work repeats per operation. Closing a code fence above 1,000 emoji lines (3,999 characters) takes 7.6 s against the chain base's 48 ms throw, and pasting 200 emoji lines takes 940 ms against the base's 241. Plan gap: AC-6.9's text class has no emoji-bearing fill and no paste. CR-24 LOW: the mounted write test swallows the act's error. The throw's fix (CF-30) and the caret fix (CF-31, F-56) hold. D-24 governs the fence member. The plan Status is not moved. |
| 2026-11-24T19:44 | 23 | planner-019 | Triggered by code review Round 7's CR-25 HIGH (R-103, record `e92137fe`) and steering's ruling (effort rulings block "2026-11-24T19:43Z", record `6507ae1e`). AC-6.9's fence keystrokes gain `a🙂` texts at 200 and 1,000 lines, a standing count limb (line settles and fence reads at 1,000 at most 10 times those at 200, seen red at `85ece66`) and a residue that names what stays unbounded; CR-24 LOW is a stated limit. Scope delta: AC-6.9 gains one text and one limb under D-24, and a paste member is held for his selection, joining this revision if he chooses it. Since approval, revisions 10 to 23 have run; the gates are cued once his answer is in, then a third fix round, code review and QA's M6 re-check. The plan still delivers what was first asked, plus three editor fixes he chose. |
| 2026-11-24T20:08 | 23 | planner-019 | Revision 23 completed before any gate read it, on his selection "Agent: fix it too (Recommended)" (D-26; effort rulings block "2026-11-24T20:07Z", record `8b684907`). AC-6.9 gains paste members (N lines of `a` and of `a🙂` pasted through `insertData` into an empty embed description, at 200 and 1,000) under the count limb, seen red at `42128cd` and `85ece66`; the residue drops the paste line. Scope delta: M6's third fix round gains the paste fix on his word, a milestone-level delta he confirmed. Since approval, revisions 10 to 23 have run; this triggers one read by each gate, then the third fix round, code review and QA's M6 re-check. The plan still delivers what was first asked, plus four editor fixes he chose. |
| 2026-11-24T20:11 | R-104 | planner-019 | Recorded the architect's delta pass on revision 23 (APPROVED; § "Delta pass, revision 23", record `569a0fb6`) in the owed re-verdicts table, and registered CF-32 LOW as a Planner batch row. |
| 2026-11-24T20:14 | R-105 | planner-019 | Recorded QA's re-key on revision 23 (§ "Re-key on Revision 23", record `d46f68ff`) in the owed re-verdicts table, and registered QAF-53 MEDIUM (a severity floor, held for steering) and QAF-54 LOW as Planner batch rows. QAF-53 (c) is discharged into `verification/019/planning/paste-refute/`. |
| 2026-11-24T20:14 | R-106 | planner-019 | Recorded critique cycle 15 pass 1 on revision 23 (APPROVED, F-57 HIGH closed by property as SL-29; record `d58217d4`) in the owed re-verdicts table, and registered F-57 (SL-29) and F-58 LOW as Planner batch rows. |
| 2026-11-24T20:55 | R-107 | planner-019 | Registered his selection "Agent: time it at QA (Recommended)" as D-27 (effort rulings block "2026-11-24T20:54Z", record `be956e8d`), with the Planner batch dispositions it sets for QAF-53, F-57, QAF-54 and F-58 and the owed re-verdicts state. Scope delta: none — registration only. |
| 2026-11-24T20:58 | R-108 | planner-019 | Registered code review's report that SL-29's fence members have no valid base reading (record `d5ca86b9`) as a Planner batch row, with the planner's read of its evidence. The fence comparator is put to steering. |
| 2026-11-24T20:59 | R-109 | planner-019 | Registered steering's ruling on SL-29's comparator (effort rulings block "2026-11-24T20:58Z", record `493aa6cc`) in R-108's Planner batch row. Scope delta: none — registration only. |
| 2026-11-24T22:41 | R-110 | planner-019 | Registered steering's ruling on SL-29 at Fix Round 3's tip `2b82972` (effort rulings block "2026-11-24T22:41Z", record `40823e74`) in the SL-29 Planner batch row. Scope delta: none — registration only. |
| 2026-11-24T22:49 | R-111 | planner-019 | Recorded the planner's reading of AC-6.9's no-throw limb against CF-33's form (routed by effort rulings block "2026-11-24T22:48Z", record `97303579`) as a Planner batch row: admitted with no revision, read by a forced normalise that applies no operation after every member. Sent to steering-hooks-fixer, implementer-019, code-reviewer-019 and qa-019. Scope delta: none — the limb's text is unchanged. |
| 2026-11-24T22:55 | R-112 | code-reviewer-019 | Code review Round 8 (M6 Fix Round 3 at website `2b82972`): **REJECTED** on CR-25 HIGH's time member. 7 of SL-29's 8 `a🙂` fence members are over block 20:58Z's line, and steering already sent them back under D-24 (block 22:41Z). CR-25's count member and CR-24 RESOLVED. The paste is within SL-29's line at 200 and 1,000 lines for both fills. CR-26 LOW is new (a fence-closing `> ` line inside a `>>>` quote keeps its marker in its text after a paste; it rides Fix Round 4). Milestone-scoped: plan Status unmoved. Record `7376a74c`; evidence `verification/019/code-review/m6fix3-2b82972/`. |
| 2026-11-24T22:56 | R-113 | planner-019 | Registered code review's CR-26 LOW (Round 8, record `7376a74c`) as a Planner batch row riding Fix Round 4 under block 22:41Z. Scope delta: none — registration only. |
| 2026-11-25T05:22 | R-114 | planner-019 | Registered M6 Fix Round 4's Outstanding 1, 2, 3 and 5 (implementation record `32c4a684`, routed by effort rulings block "2026-11-25T05:19Z") as Planner batch rows. 1, 2 and 5 are stated limits, with 1 and 2 carried by two new handoffs. 3 is MEDIUM and outside every criterion, and whether to lift the cap for it is put to steering. Scope delta: none — registration only. |
| 2026-11-25T05:27 | R-115 | planner-019 | Re-derived Outstanding 3 as HIGH from steering's refutation run (effort rulings block "2026-11-25T05:26Z", record `f9f2974d`), in its Planner batch row: the release adds the throw, and the saved copy lacks the keystroke until the next one. The Revision 24 it would need is described to steering for his selection. Scope delta: none — registration only. |
| 2026-11-25T05:29 | R-116 | planner-019 | Registered his selection "Fix the whole class (Recommended)" as D-28 (effort rulings block "2026-11-25T05:28Z", record `1e4d342a`), and commissioned the analyst for AN-9, the class enumeration Revision 24 waits on. Scope delta: none — registration only. Revision 24 carries the delta. |
| 2026-11-25T05:30 | R-117 | code-reviewer-019 | Code review Round 8 sub-entry (M6 Fix Round 4 at website `a7ad3f2`): **REJECTED** on CR-28 HIGH. A lone backtick typed at the end of line 0, paired with one ending the last line, throws Slate's iteration error from 100 `a🙂` lines and loses the keystroke, where `af3d95a` does not; it has been present since before `85ece66`, and D-28 covers it. CR-27 MEDIUM is a severity floor: R-111's fixed-point condition fails on 6 corpus keystrokes outside the members, from the suppression; the planner is asked whether the condition binds beyond the members. CR-29 MEDIUM goes to steering: typographic-quote lines over SL-29's line. CR-25 HIGH RESOLVED (SL-29 0 of 20 over) and CR-26 LOW RESOLVED. Plan gap: no member changes many lines' emoji layout without retyping them. Milestone-scoped: plan Status unmoved. Record `9cb3a3da`. |
| 2026-11-25T05:31 | R-118 | planner-019 | Withdrew R-114's stated-limit disposition of Fix Round 4's Outstanding 1 in its Planner batch row, because code review's CR-27 (record `9cb3a3da`) shows the suppression causes the six. The planner's error. R-111 binds every input the suppression applies to. CR-27 and CR-28 fold into Revision 24 on AN-9. Scope delta: none — registration only. |
| 2026-11-25T06:01 | 24 | planner-019 | Triggered by his selection "Fix the whole class (Recommended)" (D-28; effort rulings block "2026-11-25T05:28Z", record `1e4d342a`), AN-9 (analysis record `00c91e3`), and code review's Round 8 sub-entry, CR-27 and CR-28 (record `9cb3a3da`, R-117). AC-6.9 states D-28's class and gains AN-9's six inline-code members, and its no-throw limb gains a pending timer's error and R-111's condition over code review's corpus. The residue names AN-9's gaps and the 12 non-fixed-point loads, whose handoff is re-aimed at `codeFence.ts` `afterLine`. The stamp gate refused one stamp the planner typed ahead of the clock in that handoff, and it was corrected to the `date -u` minute. Scope delta: M6's AC-6.9 gains six keystroke members and one sub-limb, a milestone-level delta he chose (D-28); Fix Round 5 follows. CR-27's sub-limb makes the fix meet the no-throw limb as R-111 reads it, so it rides D-24. Since approval, revisions 10 to 24 have run. This one triggers one read by each gate, then Fix Round 5, code review and QA's M6 re-check. The plan still delivers what was first asked, plus five editor fixes he chose. |
| 2026-11-25T06:04 | R-119 | planner-019 | Recorded QA's re-key on revision 24 (§ "Re-key on Revision 24", record `7a6087f6`) in the owed re-verdicts table, and registered QAF-55 MEDIUM, a severity floor, as a Planner batch row held for the batch with the critic's and architect's reads. |
| 2026-11-25T06:07 | R-120 | planner-019 | Recorded the architect's delta pass on revision 24 (APPROVED; § "Delta pass, revision 24", record `6a5aa33`) in the owed re-verdicts table, and registered CF-34, CF-35 and CF-36 LOW as Planner batch rows. CF-36's form is folded into the re-aimed handoff. |
| 2026-11-25T06:08 | R-121 | planner-019 | Recorded critique cycle 16 pass 1 on revision 24 (APPROVED, critique closed; F-59 HIGH closed by property as SL-30, an entry condition, with its form put to him through steering; record `343b1ed0`) in the owed re-verdicts table, and registered F-59 (SL-30), F-60 MEDIUM (SL-31) and F-61 LOW as Planner batch rows. |
| 2026-11-25T06:08 | R-122 | planner-019 | Registered steering's ruling on the architect's Fix Round 5 scope point (effort rulings block "2026-11-25T06:07Z", record `9ba0662c`: option (b); revision 24's scope delta read as within D-28 and D-24) in CF-34's Planner batch row. Corrected D-28's option text to the ledger's (F-61 point 1). Scope delta: none — registration only. |
| 2026-11-25T06:11 | R-123 | planner-019 | Recorded in Outstanding 3's Planner batch row that QA's Chrome walk K4 (record `5a9af9be`) found the backtick's write not lost through native input, which weakens R-115's HIGH basis and the prompt behind D-28. Sent to steering for his word. D-28 stands unless he withdraws it. Scope delta: none — registration only. |
| 2026-11-25T06:16 | 25 | planner-019 | Triggered by his three selections at 06:14Z (D-29 "Keep fixing the class", D-30 "Check them before QA passes", D-31 "Add a speed check"; effort rulings block "2026-11-25T06:14Z", record `a7b6ee15`), QA's QAF-55 (R-119), the critic's F-59 to F-61 (R-121) and the architect's CF-35 (R-120). AC-6.9's work-per-line limb gains the six inline-code members, and the corpus differential becomes an equality between the fixed and pass-through trees. F-61's four wording points land. SL-30 is registered as QA Phase 2's entry condition, and block 06:07Z's (b) was registered at R-122. Scope delta: AC-6.9's count limb gains six members on his D-31, a milestone-level delta he chose, and no milestone is added. Since approval, revisions 10 to 25 have run. This one triggers one read by each gate, then Fix Round 5, code review and QA's M6 re-check. The plan still delivers what was first asked, plus five editor fixes he chose. |
| 2026-11-25T06:18 | R-124 | planner-019 | Recorded QA's re-key on revision 25 (§ "Re-key on Revision 25", record `f7df4423`; no new finding, QAF-55 closed, NM-88 added) and the architect's delta pass on revision 25 (APPROVED, no new finding; CF-35's equality measured at 6 of 36,560; record `e0228ee5`) in the owed re-verdicts table. |
| 2026-11-25T06:19 | R-125 | planner-019 | Recorded critique cycle 17 pass 1 on revision 25 (APPROVED; record `fdebc3ac`) in the owed re-verdicts table. Registered F-62 LOW as a Planner batch row, and restored D-29's dropped option sentence. Every gate has passed revision 25. Scope delta: none — registration only. |

## Resumption State

Written at steering's ask (checkpoint for a clear), 2026-11-24T20:10Z, after revision 23 at `49a20690`.

**Done.**
- Revisions 0 to 23 and registrations R-1 to R-103 are committed. Other stages' rows carry duplicate numbers (R-47 records the
  reconcile) and some sit out of order (R-94 and R-103 are code review's); they are cited by stamp and author. Revision 23 has
  two changelog rows (19:44, drafted; 20:08, completed with D-26) because the paste member joined it before any gate read it.
- Decisions D-20 to D-26 are registered. D-23 (CR-20), D-24 (code-fence and `>>>` throw, CR-23), D-25 (`>>>` caret) and D-26
  (CR-25's paste) each lift the cap for their own items alone.
- M1 to M5 are complete; M5 was QA Complete after QAF-39 (R-75). M4 and M5 shipped on the chain branch, so M7 is marked
  `PREMISE-STALE` (R-76).
- M6: CR-20's fix round (website `42128cd`) was approved by code review. The second fix round (AC-6.9, revision 22) was handed
  at `85ece66` and REJECTED by code review Round 7 on CR-25 HIGH (R-103). Revision 23 (`6ef51baa` drafted, `49a20690`
  completed) answers it: AC-6.9's fence keystrokes over `a🙂` texts, paste members (D-26), a standing count limb (at most 10
  times from 200 to 1,000 lines) and a rewritten residue. CR-24 LOW is a stated limit.
- Handoffs opened this session: `handoff/slate-smart-quote-repair-untested-2026-11-24.md` (QAF-49) and
  `handoff/preview-fenced-code-block-test-hand-rolled-renderer-2026-11-24.md` (QAF-47), both Open. The QAF-51 handoff is
  superseded and in `handoff/closed/`.
- The helper probe captures behind AC-6.9's ceiling and caret are under `verification/019/planning/fence-refute/`.

**Next.**
- **Revision 25 is cued to the critic, the architect (delta pass) and QA's re-key** (D-29 to D-31). Register each pass
  as it lands in the owed re-verdicts row "Revision 25's delta". When all three pass, tell `steering-hooks-fixer`, which
  starts Fix Round 5. With that start, send SL-30 (D-30) and CF-34 with block 06:07Z's (b) to implementer-019,
  code-reviewer-019 and qa-019. Fix Rounds 3 and 4 ran on revision 23 (SL-29, D-27, R-111). QAF-53 (b), F-58, CR-26 and Fix Round
  4's Outstanding 2 and 5 join the seam fold's rows.
- A HIGH finding, or a severity floor, on revision 23 goes to steering for a ruling before any revision 24.
- No other planning pass is owed until the seam fold. The caps stand:
  - M3 to M6 (blocks 22:35Z and 00:49Z): a finding below HIGH becomes a Planner batch stated limit, except a severity floor;
  - AC-6.5 (block 04:18Z): a further gap below HIGH is a stated limit;
  - AC-6.8 (block 07:21Z): every finding below HIGH is a stated limit, and only a severity floor is excepted;
  - AC-6.9 (block 14:48Z): after its last fold, a finding below HIGH from any gate is a stated limit, except a severity floor,
    and a literal a correct fix fails is recorded as the implementer's measured reading beside its hand derivation. CR-25 was
    HIGH, so revision 23 lies outside that rule.
  Register findings from the third fix round's code review and QA as batch rows.
- The seam fold comes after the last milestone's QA Phase 2 on M6 and before the UAT anchor. It is a revision, gated by the
  critic, and it lands the open Planner batch rows' text:
  - M7's re-argument paragraph against M4's, M5's and M6's shipped behaviour (R-76), which opens a critique cycle;
  - AC-6.8's residue property (SL-22), its text class with CF-28's many-unit text, the bench under `__tests__/` (SL-20), and the
    delete residue (SL-19);
  - AC-6.7's "five mutants" and QAF-42's fixtures; SL-16's three cells in AC-6.7's table;
  - AC-6.5's named pairing (SL-17), CF-21's deviation line, the 12 link-address residue (R-72), the run-unit source-text
    sentence (R-74), and the `jumboable` reader wording (R-78);
  - the `uat` Reading Order row and the walk list naming all seven UAT-walked criteria (SL-15, with AC-6.7's B-9 and AC-6.8's
    B-10);
  - CR-21 (`emoji-regex`, with a lockfile-owning change), CR-17, CF-22, CF-23 and CF-24 as their rows state;
  - SL-11 (forum ids) and RK-8's new members (F-34, `jumboify`);
  - F-35 (AC-4.4's walk in the `uat` Reading Order row);
  - the emoji `alt` exception and CF-10's "Today" correction;
  - SL-12's atom sentence and SL-13;
  - R-44's (e) AC-3.1 exclusion, (g) X-27 and (h) AC-4.5's check, and QAF-37's line in AC-3.6's residue (R-52);
  - CR-15's Risks line, the drift alarm's wiring falsifier (R-54);
  - D-20's Exclusions row for `SlateEditor/index.tsx`'s pre-existing eslint errors (R-59);
  - CR-7's M6 exit condition;
  - D-18's line in RK-9's record;
  - the earlier open rows: QAF-27, CF-15 and CF-16, the critic's two assumptions, and AN-8 limb 5;
  - this session's rows: CF-29, SL-23 to SL-28, CF-31, F-56, CR-22, CR-24, QAF-46 to QAF-48, AC-3.3's new generator count (400)
    and its full count's home (`MOUNTED_GENERATOR_COUNT=1000`, run by QA at Phase 2 and Phase 3), Outstanding 1's
    unclean-fence residue (with QAF-48, in X-19's row), AC-6.9's unmaking onset at 122 lines, and AC-6.8's "Every bound"
    line, which now holds only cross-size equality.
- Any question for him goes to steering by SendMessage as a selection prompt, never as prose here (his ruling, relayed 23:3xZ).

**Approach in flight.** None. No uncommitted edit.

**Refs.** Record `master`. The website was read only through `git -C /usr/local/bin/hooks/website show` or `git grep`, at
`af3d95a`, `5ec0621`, `7dcedc9`, `f4060c5`, `2e36107`, `119471f` and `42128cd`. Record shell edits are refused by the
record-write gate; edit the plan with the Edit tool only, and write new record files with the Write tool. Changelog stamps
come from `date -u +%Y-%m-%dT%H:%M`; the stamp-gate hook refuses a typed future stamp. Probe captures are under
`verification/019/planning/`. The shell runs from
`/usr/local/bin/hooks/agent-output`, never from `preview-image-generator` (effort rulings block 15:29Z). Effort rulings:
`steering/fixer-queue-2026-11-21-rulings.md`.

**Questions sent, and to whom.** All to `steering-hooks-fixer`. None is open.

## Reading Order

Each role reads these sections, in this order, by heading. Every other section is reference, reached when a named section cites it.

| Role | Sections |
|---|---|
| implementer | Decisions Register; M1 — Analysis before code; M2 — The engine and its adapter; M3 — The fuzzer and oracle, in the suite; M4 to M6 (each by its heading) |
| code-reviewer | Decisions Register; M2 — The engine and its adapter; M3 — The fuzzer and oracle, in the suite (AC-3.7's families, their reasons and counts, and sampled entries); M4 — The preview on the engine (the adjustment module); M5 — The editor's colouring on `parseLossless`; M6 — The Slate layer: round trip and input; Exclusions |
| qa | Testing Strategy; M3 — The fuzzer and oracle, in the suite; Acceptance criteria of M2 and M4 to M6; Risks; Exclusions |
| uat | Value Statement and Business Objective; Testing Strategy; M2 — The engine and its adapter (AC-2.5); M4 — The preview on the engine (AC-4.2); M6 — The Slate layer: round trip and input (AC-6.3) |
| devops | Header notes; M7 — Release; Testing Strategy (the post-deploy observable); Exclusions |

There is no Handoff Notes section; this table is the plan's one routing surface.

### Owed re-verdicts

| Limb | Decidable since | Owning gate | State |
|---|---|---|---|
| Revision 5's delta (§ Finding disposition (revision 5)): AC-2.3's literals, AC-6.5's expected value and typed-edit class, M3's drift rule, the mask count | revision 5 commit | critic (cycle 1 pass 5) | APPROVED, no new finding; the critique is closed Resolved (record `944e53f6`). A later revision that changes a criterion's text opens cycle 2 |
| Revision 7 | revision 7 commit | critic APPROVED, critique closed (`16ca70fe`); architect APPROVED for M4 and M6 under the cap (`6a669d8`); QA re-key: QAF-26 MEDIUM severity floor, QAF-27 LOW (`c6fa2e26`) | M6 is released: every gate passed revision 7's AC-6.5. AC-2.3's `GAME_MENTION` bits are released: all three gates passed revision 6's AC-2.3 (critic `8b596f83`, architect `93708612`, QA `b5985b20`) |
| Revision 8 | revision 8 commit | critic APPROVED with F-33 / SL-10 (`683f3e9`); architect APPROVED with CF-15 (`e1e6f363`); QA QAF-28 MEDIUM severity floor (`5ca68b07`) | All three name one member, folded at revision 9 |
| Revision 9's delta: AC-4.7's unloaded-tag fixture (`vi-VN`) and its locale sentence only | revision 9 commit | QA re-key: QAF-28 closed, nothing open (record `26f3a3c`); architect APPROVED, CF-15 resolved, with CF-16 LOW at steering under block 18:02Z (record `559253f1`); critic APPROVED, F-33 resolved, critique closed (record `c1e40234`) | Every gate has approved revision 9. M4 is released. CF-16 is a stated limit (steering, block 18:06Z) |
| Revision 10's delta: AC-4.4 (D-17's decision table, its residue and its human-observable form), M4's Mirrors line, and G-13's carriage line only | revision 10 commit | critic; architect (delta pass); QA Phase 1 (re-key) | Architect APPROVED, with CF-17 LOW as a stated limit (record `b8d11f1b`). Critic APPROVED, cycle 4 pass 1, critique closed, with F-34 / SL-11 and F-35 as Planner batch rows (record `71b981ad`). QA re-key: nothing blocking, with QAF-31 LOW, the same member as F-34 (record `f79d7f77`). Every gate has approved revision 10, and M4's mention code is released |
| Revision 11's delta: AC-3.7's frozen residue list (per-input entries, family and reason, the stale-entry failure, RK-9's count unit) only | revision 11 commit | critic; architect (delta pass); QA Phase 1 (re-key) | QA re-key: QAF-34 MEDIUM, which holds the residue-list commit, and QAF-35 LOW (record `047add44`). Architect APPROVED_WITH_CHANGES: the per-input list is approved, with CF-18 MEDIUM (the same member as QAF-34) and CF-19 LOW (record `744abb20`). Critic APPROVED, cycle 5 pass 1, critique closed, with F-36 MEDIUM (the same member) and F-37 LOW (record `08caeb87`). All folded at revision 12 |
| Revision 12's delta: AC-3.7's atom-bearing population and atom unit, the family check, M4's full measurement and the exercise of its new limbs; RK-9's fire condition, route and record; the Reading Order's `code-reviewer` row | revision 12 commit | critic; architect (delta pass); QA Phase 1 (re-key) | QA re-key: nothing open, with QAF-34 and QAF-35 closed (record `e645035`). Architect APPROVED: CF-18 and CF-19 resolved, with CF-20 LOW (record `237da08`, re-dispositioned under the M3 cap as APPROVED at record `f7b21366`). Critic APPROVED, cycle 6 pass 1, with F-38 MEDIUM (the same member as CF-20) and F-39 LOW (record `575a52bc`). Every gate has approved revision 12. Under the M3 cap (block 22:35Z), the findings are stated limits SL-12 and SL-13, with no revision 13. M4's residue-list commit is released, read with them |
| AC-6.5's expected value from module 818948 (CF-11) | revision 5 commit | architect (delta pass) | APPROVED, with CF-12 LOW non-blocking (record `681ae51`); CF-12 is folded at the next planning pass. Superseded at revision 13 (D-21): the box is no longer a source |
| Revision 13's delta: AC-6.5's "Expected value" (the helper on every surface, frozen; the hand-written content control; the residue) and "Entry conditions" (the box condition recorded false; EC-7 retired) only | revision 13 commit | critic; architect (delta pass, spawned by steering); QA Phase 1 (re-key) | Critic APPROVED, cycle 7 pass 1, critique closed, with F-40 LOW (SL-14), which is folded at revision 14 (record `fad4948a`). Architect APPROVED, with CF-21 LOW as a stated limit (record `d9ddfd22`). QA re-key (with revision 14, record `a1b54c49`): QAF-40 MEDIUM holds AC-6.5's literal freeze, pending steering's cap ruling. AC-6.5's literals hold until all three have passed it. The rest of M6 is not held (D-21) |
| Revision 14's delta: AC-6.7 (D-22's table, its limbs, mutants, human-observable form, residue and the held-out lists); AC-3.3's typed drive; AC-6.5's added cross-line control member (F-40) | revision 14 commit | critic (cycle 8); architect (delta pass); QA Phase 1 (re-key) | Critic APPROVED, cycle 8 pass 1, critique closed, with F-41 (SL-15) and F-42 (SL-16) as Planner batch rows (record `f0488807`). Architect APPROVED, with CF-22 and CF-23 LOW as stated limits (record `e093c8aa`). QA re-key (record `a1b54c49`): QAF-41 LOW, folded at revision 15. All three gates have passed revision 14, so M6's quote-carry change and the four cases implementer-019 holds red at `8cb4d83` are released, built to SL-16 and revision 15's mutants. The rest of M6 is not held (D-22) |
| Revision 15's delta: AC-6.5's control gains QAF-40's five members and the first-occurrence join mutant; AC-6.7's "Seen red" gains NM-68 and NM-69; AC-3.3's drive reads the table from the input's text (QAF-41) | revision 15 commit | critic (cycle 9); architect (delta pass); QA Phase 1 (re-key) | QA re-key: QAF-40 and QAF-41 closed, with QAF-42 LOW a Planner batch row; nothing holds the freeze on QA's account (record `3b264329`). Architect APPROVED, with CF-24 LOW as a stated limit (record `f6f6651e`). Critic APPROVED, cycle 9 pass 1, with F-43 (SL-17) a Planner batch row and F-44 the same member as QAF-42 (record `bf589c96`). Every gate has passed revision 15, so AC-6.5's literal freeze is released |
| Revision 16's delta: AC-6.8 (count limb, timed limb, human-observable form, residue); D-23 | revision 16 commit | critic (cycle 10); architect (delta pass); QA Phase 1 (re-key) | Architect APPROVED, with CF-25 and CF-26 LOW (record `ce656dca`). QA re-key: QAF-43 MEDIUM and QAF-44 LOW (record `d53b1b30`). Critic APPROVED, cycle 10 pass 1, with F-45 MEDIUM (SL-18) (record `0ff39772`). All are folded at revision 17 |
| Revision 17's delta: AC-6.8's count limb (equality per pass, positive control, `vi.mock` observation, window, character, positions, merge fixture), the `a🙂` text in both limbs, the bench-file home, residue and B-10 | revision 17 commit | critic (cycle 11); architect (delta pass); QA Phase 1 (re-key) | Architect APPROVED_WITH_CHANGES on CF-27 MEDIUM (record `328a6eba`), re-dispositioned as APPROVED (record `73b316ad`); CF-27 is folded at revision 18. Critic APPROVED, cycle 11 pass 1, with F-46 MEDIUM (SL-19) and F-47 LOW (SL-20) as Planner batch rows (record `2170bc3d`). QA re-key: open |
| Revision 18's delta: AC-6.8's count window (one `Editor.normalize` drain) and its literal (lines dirtied, 1, 2, 1) only (steering block 07:15Z) | revision 18 commit | critic and QA, inside their current reads; architect (confirming CF-27) | Architect APPROVED, CF-27 resolved as folded (record `2f2d99a0`). Critic APPROVED, cycle 11 pass 2, with F-48 MEDIUM (SL-21) on the count literal, whose form, revision 19 or a Planner batch row, is steering's ruling under block 07:15Z (record `e1106d42`); folded at revision 19 by block 07:21Z. QA re-key on revisions 17 and 18: no new finding, with QAF-43 and QAF-44 closed and P-Q23 read (record `e74108e`) |
| Revision 19's delta: AC-6.8's count limb restated with no per-kind literal (cross-size equality, at least 1, corpus bound 4, every drain), the `a🙂` 200-line size, NM-72's fixture, and the delete residue (steering block 07:21Z) | revision 19 commit | critic (cycle 12); architect (delta pass); QA Phase 1 (re-key) | Architect APPROVED, with CF-28 LOW as a stated limit, and CF-27's literal withdrawn as its own error (record `ccddf880`). Critic APPROVED, cycle 12 pass 1, F-48 resolved, with F-49 MEDIUM (SL-22) (record `73a6bce9`). QA re-key: CF-28 agreed, NM-72 dispositioned as equivalent (Phase 2 expects it to survive), and QAF-45 LOW (record `4764a6e`). Every gate has passed revision 19, so CR-20's fix round is released |
| Revision 20's delta: AC-6.8's corpus and generator bound removed, the fenced-quote sized texts added to the equality limb and its "Seen red", and the residue line naming the corpus and generator inputs (steering block 07:42Z) | revision 20 commit | critic (delta read); architect (delta pass); QA Phase 1 (re-key) | Architect APPROVED, with CF-29 LOW as a stated limit (record `81d964c3`). QA re-key: no new finding, with the fenced-quote texts read red at `119471f` by P-Q25 (record `0dca93e`). Critic APPROVED, cycle 13 pass 1, with F-50 MEDIUM (SL-23) and F-51 LOW (SL-24, the same member as CF-29) as Planner batch rows (record `1c6ee275`). Every gate has passed revision 20, so implementer-019's hand-off of CR-20's fix round is released, built to SL-23 and SL-24 |
| Revision 21's delta: D-24 and AC-6.9 (keystroke class, text class, no-throw, write, fresh-load and caret limbs, the cost limbs, human-observable form, residue); AC-6.8's residue pointer | revision 21 commit | critic; architect (delta pass); QA Phase 1 (re-key) | Architect APPROVED, with CF-30 LOW a stated limit and no owner-authored invariant touched; A-11's `handleEditor` sentence is restated at its closing pass (record `f4a9534b`). Critic APPROVED, cycle 14 pass 1, with F-52 to F-55 as SL-25 to SL-28 (record `3910c29c`). QA re-key: QAF-52 MEDIUM on the `>>>` caret texts, with P-Q26 and B-11 (record `225ef4a6`). All folded at revision 22 |
| Revision 22's delta: AC-6.9's `>>>` keystroke members and caret limb (hand-written texts, seen red, D-25), the no-throw limb's refusal (CF-30), and the ceiling's 27 and 104 ms with its citation (steering block 14:48Z) | revision 22 commit | critic, architect and QA re-key, each inside its current read | Architect APPROVED, CF-30 resolved as folded, with CF-31 LOW a stated limit (record `f898b32f`). Critic APPROVED, cycle 14 pass 2: F-52 resolved, SL-25 withdrawn as the critic's error, with F-56 LOW a stated limit (record `50b2bbe0`). QA re-key: no new finding, QAF-52 closed, NM-78 to NM-80, B-11 split into K1a and K1b (record `e2890214`). Every gate has passed revision 22, so the second M6 fix round is released |
| Revision 23's delta: AC-6.9's `a🙂` texts for the fence keystrokes, the work-per-line count limb, the rewritten residue, and CR-25's quoted defect (steering block 19:43Z); a paste member if he chooses it | revision 23 commit | critic; architect (delta pass); QA Phase 1 (re-key) | Cued once, with the paste member added on his selection (D-26). Architect APPROVED, with CF-32 LOW a stated limit (record `569a0fb6`). Critic APPROVED, cycle 15 pass 1, with F-57 HIGH closed by property as SL-29 (an entry condition on QA Phase 2 of the third fix round) and F-58 LOW a stated limit (record `d58217d4`). QA re-key: QAF-53 MEDIUM, a severity floor of F-57's class, and QAF-54 LOW a stated limit (record `d46f68ff`). D-27 (block 20:54Z) decides QAF-53 with no revision 24: SL-29 is QA Phase 2's entry condition, and QAF-53 (b) is a Planner batch row. Every gate has passed revision 23, so the third M6 fix round is released (block 20:54Z) |
| Revision 24's delta: AC-6.9's class statement and its six inline-code members, with their text class (D-28, AN-9); the no-throw limb's pending-timer error and its sub-limb "A suppressed line is a fixed point" with its corpus differential (CR-27, R-111); the write limb's red; the caret and human-observable lines; and the residue's AN-9 gaps and non-fixed-point loads | revision 24 commit | critic; architect (delta pass); QA Phase 1 (re-key) | QA re-key: A1 to A6 checked against AN-9's table, the sub-limb has real red members, with QAF-55 MEDIUM a severity floor and NM-85 to NM-87 and K4 added (record `7a6087f6`). Architect APPROVED, with CF-34 to CF-36 LOW (record `6a5aa33`). Critic APPROVED, cycle 16 pass 1, critique closed, with F-59 HIGH as SL-30 (an entry condition on QA Phase 2 of Fix Round 5, its form with him), F-60 MEDIUM (SL-31) and F-61 LOW (record `343b1ed0`). Every gate has read revision 24. His selections at 06:14Z (D-29 to D-31) settle F-59's form and QAF-55, folded at revision 25 |
| Revision 25's delta: AC-6.9's work-per-line limb over the six inline-code members (D-31, QAF-55, F-60); the corpus differential's equality form (CF-35); F-61's wording points (the owner-told sentence, the mounted timer clause, A4's two forms, the class statement's `\` and `5ec0621` run, the residue's opening); D-29 to D-31 | revision 25 commit | critic; architect (delta pass); QA Phase 1 (re-key) | QA re-key: no new finding, QAF-55 closed, SL-30's probe set read, NM-88 added (record `f7df4423`). Architect APPROVED, no new finding; the equality differential is measured at 6 of 36,560 keystrokes (`verification/019/architect-conformance/rev25/equality-count.txt`; record `e0228ee5`). Critic APPROVED, cycle 17 pass 1, with F-62 LOW a Planner batch row (record `fdebc3ac`). Every gate has passed revision 25, so Fix Round 5 is released on steering's word, with SL-30 (D-30) as QA Phase 2's entry condition |
| AC-2.3's six literals; AC-6.5's typed-edit class (QAF-23) and expected value | revision 5 commit | QA Phase 1 (re-key) | Nothing open (record `d060162`); entry condition EC-7 was folded at revision 6 and retired at revision 13 (D-21) |

## Header notes

- **Plan ID** 019, minted from `.next-id` (19 → 20, record `ae3d41fb`).
- **Target Release.** The website's one serving ref is `master` on origin, and a push to it deploys to Vercel production. Read
  2026-11-23 in revision 0's pass: `git -C website ls-remote origin` lists heads `master` `af3d95a`, `backup`,
  `external-message-api`, `redesign` and `regex-refactor`; `website/.github/workflows` is absent. `node
  ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master af3d95a --dry-run` exits 0, and `--report` exits 0 ("one
  serving ref at origin (master); no pair"). The capture is `verification/019/planning/release-move-dry-af3d95a.txt`. Devops re-runs
  both at the release tip; a dry run to the current SHA shows no split. Chain 9e (`fix-image-uploader-url`) holds the tree now and
  releases on its own, before this chain cuts. The push is devops's act, under his release answer. The package has no `version`
  field (§ Version Management).
- **Base.** The chain's base is website `master` at the moment the chain branch is cut, after 9e's release. It is not `af3d95a`.
  This revision's reads were taken at `af3d95a` (released 2026-11-23T15:29Z, `qa/closed/website-af3d95a-release-tip-qa.md`).
  **Base re-derivation step**: at chain start, the implementer runs `git diff --stat af3d95a <base> -- src` over the region and over
  the files P-4 lists. For every file the diff touches, it re-reads the criteria and rows that cite that file (AC-3.4, AC-6.1,
  AC-6.1b, P-4, M4's path list) and records the result in its implementation document before M2's first commit. QA Phase 1 re-keys
  on that record. The inventory itself was taken at `0411d3b`: from there to `af3d95a`, 8 files moved, all in the Slate block layer
  (`git diff --stat`, revision 0's pass).
- **Lane: full** (not small). It adds a production dependency and a new layer, and it changes the shared preview path that
  `/preview` and the generator use.
- **Architectural surface: adds.** It adds a new layer (one adapter module over `@discord/markdown-wasm`) and a new production
  dependency, so the architect's conformance pass is a named step of the chain. Read before this line: `system-architecture.md`
  Components (website), Dependencies, Problem Areas, D-001 and D-003; `website.md` W-3 and W-4. Lines the chain closes or
  invalidates, for the deployment record to route:
  - The Problem Area "The site's markdown is a hand-kept copy of Discord's rules in two rule sets" (Medium) closes on landing:
    `simple-markdown` leaves the product (D-13, AC-6.6). The adjustment module D-14 adds is a new, smaller hand-kept surface, and
    the architect's closing pass rules whether it is lodged as its own Problem Area.
  - The Problem Area "The editor reads highlight.js's private emitter tree" (Low) closes on landing (CF-7, AC-5.4).
  - The Components line "Packaging: pnpm with a patched dependency (`simple-markdown` via `patches/`)" is removed (AC-6.6).
  - The Dependencies line gains the package and its exact pin, and loses `simple-markdown`. The Quality Attributes "Tests" line
    gains the command form of M3 (M7).
  - D-001 and W-3 are held: one engine for both views, and the editor's emoji come from the same engine (D-13).
  - The architect's lodged candidate "The Slate emoji element stores a `simple-markdown` node" does not arise under D-13 (its delta
    pass on revision 2).
- **QA sequencing.** QA Phase 1 runs before implementation, as the stage set requires (block 09:18Z).
- **Disclosure.** Two read-only website lookups made in revision 0's pass were not completed, then re-run (effort rulings block
  15:29Z).

## Value Statement and Business Objective

As a Hooks user composing a Discord message, I want the editor's colouring and the preview to format every input the way Discord
does, and to keep every character I type, paste or load, so that what I build on Hooks is what Discord shows when it is sent.

This serves his words at 09:07Z and 09:11Z (D-1, D-3): every Slate formatting fix in one effort, held to Discord's behaviour, with a
fuzzer or intensive check over the edge cases. The plan delivers the value itself. Preview and editor move together (AF-2), and the
fuzzer lands in the suite. No core part is deferred. The value statement carries no measured figure. What "the way Discord does"
means differs by surface and by view, and the class table in M3 states what is asserted on each class:
- **Message content, in the preview.** Where Discord's two formatters disagree, it means the native formatter's way (D-5, D-6).
- **Embed and V2 text surfaces.** Discord draws these with its legacy formatter only (AN-3). There it means what each character
  visibly looks like in Discord's legacy rendering (D-14).
- **The editor.** It means Discord's native text box, across line breaks included (D-15).

## Decisions Register

Every row is a decision he has settled. Rulings come from `steering/fixer-queue-2026-11-21-rulings.md` (the "effort rulings"),
except D-8.

| ID | Decision (every operative clause) | Date | His words, verbatim, and route | Reopened by |
|---|---|---|---|---|
| D-1 | Every not-yet-started Slate or formatting fix goes into one effort, and that effort delivers a fuzzer or intensive check that covers the edge cases. | 2026-11-23 | "If at all possible, it'd be nice to batch any other future formatting fixes, basically any Slate related fix, into a singular effort, whether that be a fixer change or a full chain. I do not know, but I would like them all grouped into one. And then alongside that should be some kind of fuzzer and or intensive check just to try and cover every single edge case." Relayed by `steering-hooks-fixer`, block 09:07Z (said in that session). Steering's reading of which items move is agent-authored (same block). | Owner withdrawal only. Consequence: M3 is a deliverable that stays in the suite. |
| D-2 | Hyperlink formatting is in scope. | 2026-11-23 | "one thing that definitely needs to be looked at is hyperlinking, since I believe there's something off with the formatting there." Relayed, block 09:10Z. | Owner withdrawal only. Consequence: LF-1 to LF-6 and the link limbs of M3 to M5. |
| D-3 | The standard is Discord's own formatting behaviour, and many defects are expected. | 2026-11-23 | "I tried my best to get the Slate implementation to be the same as Discord's, but Slate is really difficult to use. So there's undoubtedly a ton of bugs in the implementation." Relayed, block 09:11Z. | Owner withdrawal only. |
| D-4 | Discord's own served code may run as a test oracle, in the test environment only: fetched from public assets at test time, never committed, never shipped. | 2026-11-23 | Asked: "I mean, there shouldn't be any issue in just running the code in the test environment, right? As long as we don't actually ship that code." Then: "Yeah, I mean, we're just using it in test, so I don't see any issue." Relayed, block 09:17Z. The bounds are steering's statement, which his answer accepted. | Owner withdrawal only. Consequence: the oracle (M3) is fetched per run. Every criterion that runs Discord's fetched code derives from this row: AC-3.1 and AC-3.6 (content membership), AC-3.2 (the native box), AC-3.7 (legacy visible forms), AC-3.8 (the staleness check) and AC-6.5's expected spans' join. |
| D-5 | Where Discord's two formatters disagree, the site is held to Discord only where both agree. The disagreeing cases are listed as known differences. | 2026-11-23 | By selection: "Agent: match only where both agree (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "the fuzzer and tests hold the site to Discord only where they agree; the disagreeing cases listed as known differences until Discord's switch ends". Ledger `steering/selection-ledger/2026-11-23.md`, block "2026-11-23T13:09Z — steering-hooks-fixer"; effort rulings block 13:09Z. | Owner withdrawal, or the option's own stop condition, "until Discord's switch ends". That is observable as M3's legacy locator matching no module on a served build (outcome table, cause C3), or a read of the two experiments (research V-2) showing one parser served. The drift alarm reads the native wasm only and does not observe it. Consequence: content's agree and disagree classes (AC-3.1, AC-3.6). The five legacy-only surfaces left this row's treatment under D-14, and the editor under D-15. |
| D-6 | The site uses Discord's published formatter, `@discord/markdown-wasm`, for the preview and the editor's colouring. Both switch in the same release, the plan opens with a build check, and the old formatter stays in tests only. | 2026-11-23 | By selection: "Agent: use Discord's formatter (Recommended)". Option text, agent-authored (`steering-hooks-fixer`), from the architect's findings: "one engine drives the preview and the editor's colouring; the plan opens with a build check; preview and editor switch in the same release; the old formatter stays in tests only". The option also stated that on the 33 disagreeing cases the site shows the new formatter's way. Ledger, same day file, block "2026-11-23T15:23Z — steering-hooks-fixer"; effort rulings block 15:23Z. The architect's record of his answer reads it as "option B with integration requirements 1 to 7" (findings § Owner's answer, agent-authored). | Owner withdrawal. Or M1's build check (AN-1) failing, which returns the choice to him with the architect's fallback A (findings § Verdict). |
| D-7 | A defect or leftover a stage finds in this effort's code is fixed without a fix-or-not question to him. A product-behaviour choice with more than one reasonable answer is still put to him. | 2026-11-22 | "Just fix everything you find along the way." Relayed, block "2026-11-22T04:50". It is in this effort's rulings file, so it binds here (GLOSSARY, "Ruling scope"). | Owner withdrawal only. Consequence: fuzzer finds in the region are in scope (scope statement). |
| D-8 | A timestamp edit in the preview always changes the timestamp clicked, in both cases (code-span miscount, re-render index), with tests for each and for normal editing. | 2026-11-22 | By selection, option A: "Agent: fix both (Recommended)". Option text, agent-authored (`steering-hooks`): "Editing a timestamp always changes the one you clicked, in both cases, with tests for each and for normal editing." Ledger `steering/selection-ledger/2026-11-22.md`, block of 04:0xZ. Carried from `steering/fix-timestamp-edit-target-rulings.md` block "2026-11-22T04:03", moved into this effort by effort block 09:07Z. | Owner withdrawal only. Consequence: AC-4.3. |
| D-9 | The third-party clients' per-client checks stay not done. Third-party clients are a footnote. | 2026-11-23 | By selection: "Agent: leave them not done (Recommended)". Ledger, 2026-11-23 file, block "2026-11-23T09:31Z — steering-hooks-fixer"; effort rulings block 09:32Z. | Owner withdrawal only. Consequence: Exclusions X-10. |
| D-10 | An emoji typed or pasted as a character is saved and sent as that character. Messages already saved with `:name:` stay as they are. | 2026-11-23 | By selection: "Agent: store the character (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "save and send 🙂 as typed; messages already saved as `:name:` stay". The option stated that whether Discord's own box sends the character is unchecked, and that AN-7 reads it. Ledger `steering/selection-ledger/2026-11-23.md`, block "2026-11-23T15:48Z — steering-hooks-fixer"; effort rulings block 15:49Z. | Owner withdrawal, or AN-7 finding that Discord's box sends the `:name:` form. That read is the option's stated unchecked premise; the result goes back to him. Consequence: AC-6.2. |
| D-11 | The editor colours no heading or list marker. (The ruling's second clause, "each line styled alone", is replaced by D-15.) | 2026-11-23 | By selection: "Agent: follow Discord's box (Recommended)". Option text, agent-authored: "no heading or list marker colouring; each line styled alone". Same ledger block; effort rulings block 15:49Z. | Owner withdrawal, or a read finding that Discord's native box styles a heading or list marker. AN-6 read that it does not (analysis `aafecf1`, AN-6 table: `list_marker` and `heading_marker` take no attributes). AN-6 fired this class for the cross-line clause, which he ruled at D-15. Consequence: AC-5.6's marker limb. |
| D-12 | `pnpm test` stays green offline. A separate command holds every comparison against Discord; it fails loudly offline and runs at every release gate and every pin change. | 2026-11-23 | By selection: "Agent: separate Discord command (Recommended)". Option text, agent-authored: "`pnpm test` offline-green; a separate command holds every Discord comparison, fails loudly offline, run at every release gate and pin change". Same ledger block; effort rulings block 15:49Z. | Owner withdrawal only. Consequence: M3's project form and its outcome table; AC-3.5. |
| D-13 | The editor's emoji lift takes its emoji from Discord's formatter (CF-2 option b), so `simple-markdown` leaves the site. This widens D-6's reach from the preview and the editor's colouring to the editor's emoji lift. | 2026-11-23 | By selection: "Agent: engine decides emoji (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "The editor's lift takes its emoji from Discord's formatter, and the old formatter library leaves the site; the cost is the stored emoji shape, with six readers." The other option was "Agent: keep editor's own emoji check". Ledger `steering/selection-ledger/2026-11-23.md`, block "2026-11-23T16:29Z — steering-hooks-fixer"; effort rulings block "2026-11-23T16:29Z — selection: plan 019 OQ-5" (record `213d34ec`), which records the premise read (engine `parse("© ™")` is plain text; the site's lift makes © an emoji element). | Owner withdrawal only. Consequence: AC-6.5 and AC-6.6; X-8 is withdrawn. |
| D-14 | On the embed surfaces (description, title, field name, field value) and the V2 text display, which Discord draws with its legacy formatter only, the site still parses with the engine alone. The preview there is judged by each character's visible styles against Discord's legacy rendering, not by tree shape. A visible difference is either corrected toward legacy by one hand-written adjustment module or listed. A test flags the module as stale if Discord moves embeds to the native formatter. | 2026-11-23 | By selection: "Agent: match how it looks (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "The engine stays the only parser. Legacy-only surfaces are judged by each character's visible styles, not tree shape. A visible residue gets a hand-written adjustment toward legacy (the architect's B3), and the rest are listed. Cost: one adjustment module, stale if Discord moves embeds to native, with a test flagging that. How many differences remain is unmeasured." The other options were "Agent: list the differences" and "Agent: old rules for embeds". Ledger `steering/selection-ledger/2026-11-23.md`, block "2026-11-23T17:04Z — steering-hooks-fixer"; effort rulings block "2026-11-23T17:04Z — selection: plan 019 AN-3 (legacy-only surfaces) and D-11's reopening" (record `af8b5a5a`), which carries the cost text he saw. A′ and B3 are the architect's terms (agent-authored), read in § M3 "Legacy-visible standard". | Owner withdrawal. Or the option's own stop condition, "stale if Discord moves embeds to native", observable through AC-3.8's staleness check (a native-formatter reference in the served embed or V2 renderer). That returns the surface to D-5's treatment, through him. Consequence: AC-3.7, AC-3.8, the adjustment module in M4, and X-23. |
| D-15 | The editor colours inline runs across line breaks, as Discord's native box does, over each run of adjacent line and quote elements. Its expected values come from the native box (module 818948). This replaces D-11's "each line styled alone"; D-11's marker clause stands. | 2026-11-23 | By selection: "Agent: style across lines (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "The editor colours runs across line breaks, like the preview and Discord's native box. It re-parses a run of adjacent lines on each edit (about 10 ms for 4,096 multi-line characters on this box), the change is confined to M5, and the expected values come from the native box (818948)." The other option was "Agent: keep each line alone". Same ledger block and effort rulings block (record `af8b5a5a`). | Owner withdrawal. Or the option's stated cost proving false: AC-5.7's timing read at M5 showing the per-edit re-parse materially above "about 10 ms for 4,096 multi-line characters". That goes back to him. Consequence: M5's run unit, AC-3.2's expected value, AC-5.6, AC-5.7. |
| D-16 | The timestamp format picker stays as it is, with its seven choices (the six table styles and `R`). `s` and `S` render correctly when typed or pasted, but the picker does not offer them. | 2026-11-23 | By selection: "Agent: leave the picker as is (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "s and S display correctly when typed or pasted, but the picker keeps its seven choices. No added work or review round." The other option was "Agent: add s and S to the picker". Ledger `steering/selection-ledger/2026-11-23.md`, block "2026-11-23T17:58Z — steering-hooks-fixer"; effort rulings block "2026-11-23T17:58Z" (record `d5642c26`), which records the premise read at `MarkdownTimestamp.tsx:15-22` and `:115-122`. | Owner withdrawal only. Consequence: AC-4.7's picker line. |
| D-17 | The preview names a channel mention by the channel's name, taken from the server's channel list the site already holds. Role and command mentions keep today's look: a role shows its id in a pill, and a command shows as plain text. Nothing renders as "unknown". No role data is fetched. | 2026-11-23 | By selection: "Agent: channel names only (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "channel mentions show the real channel name from your server's list. Roles and commands stay as they look today: the role id in a pill, and a command as plain text. Nothing is labelled 'unknown'. Small plan change: one plan revision and one re-read by the reviewers, inside the current milestone." The other options were "Agent: also look up role names", "Agent: Discord's unknown style" and "Agent: leave mentions as today". Ledger `steering/selection-ledger/2026-11-23.md`, block "2026-11-23T21:31Z — steering-hooks-fixer"; effort rulings block "2026-11-23T21:31Z" (record `16f53b7c`), with premises in block 21:18Z (record `988e5d69`). | Owner withdrawal only. Or the option's stated cost proving false: the change not fitting "one plan revision and one re-read by the reviewers, inside the current milestone". That goes back to him. Consequence: AC-4.4's table. Users, `@everyone`/`@here`, an unlisted channel and the kinds with no observation keep today's form under the "nothing unknown" clause; that reading is mine (planner-019), stated at AC-4.4. |
| D-18 | D-14 stands with its residue now measured. No adjustment qualified under the plan's rule, so every visible difference on the legacy-only surfaces stays listed: about 1,300 per embed field, of which 42 of the 272 realistic messages differ on the description. Any new difference fails the tests. RK-9's M4 firing is answered, nothing reopens, and nothing waits on it. | 2026-11-23 | By selection: "Agent: keep your choice (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "Nothing changes. The leftover differences stay listed, about 1,300 per embed field, and any new one fails the tests. Most of those 1,300 come from test inputs broken on purpose; 42 come from the 272 realistic messages. No extra work or time." The other options were "Agent: fix the common ones" and "Agent: older rules for embeds". Ledger `steering/selection-ledger/2026-11-23.md`, block "2026-11-23T23:33Z — steering-hooks-fixer"; effort rulings block "2026-11-23T23:33Z" (record `3572a0bd`), whose premises were re-run by steering's helper. | Owner withdrawal only. RK-9's later firing, a count above M4's on any surface or mask (QA at Phase 2, or a later chain's re-measure under SL-13), goes back to him through steering. Consequence: RK-9 and AC-3.7's list. |
| D-19 | The preview and the editor ship together in one release, once M6 is done. M4 does not ship alone, M7 stands, and the plan is not revised. | 2026-11-24 | By selection: "Agent: keep one release (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "The preview and the editor ship together, once M6 is done. No extra work, and one production approval from you. Cost: the preview reaches users later; the planner estimates several hours to about a day, which isn't measured…" The other option was "Agent: ship the preview first", whose text gave the measured drift ("the editor and preview disagree on about 29 of 272 realistic messages"). Ledger `steering/selection-ledger/2026-11-24.md`, block "2026-11-24T00:55Z — steering-hooks-fixer"; effort rulings block "2026-11-24T00:55Z" (record `11fab77b`). | Owner withdrawal only. Consequence: M7, `Target-Release`, M4's rollback line. |
| D-20 | The eslint errors in website `src/components/SlateEditor/index.tsx` that pre-exist at the chain base `5ec0621` ship listed with plan 019's release. M5 goes ahead at `2e36107` without fixing them, the release is not held for them, and their fix comes inside this effort after the release. | 2026-11-24 | By selection: "Agent: list them, fix later (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "M5 goes ahead as it is, with the 8 errors listed as known. A follow-up record carries them to a small fix inside this effort once this release is out. No extra work or review now; nothing changes for users, since the live site already has them." The other option was "Agent: fix them in M5 now". Ledger `steering/selection-ledger/2026-11-24.md`, block "2026-11-24T03:47Z — steering-hooks-fixer"; effort rulings block "2026-11-24T03:48Z" (record `6866cd75`). Counts by steering's eslint helper: 9 at `5ec0621`, 8 at `2e36107` (`verification/019/steering/slateeditor-index-lint/`). | Owner withdrawal only. Consequence: a gate's convention check that reports these errors on this file is read against the handoff's list, not as a finding. |
| D-21 | AC-6.5's expected emoji spans get a replacement source, because Discord's box exposes none. The planner picks it in one small revision, re-read once by the three gates. The implementer builds the rest of M6 meanwhile, and the answers are frozen afterwards. | 2026-11-24 | By selection: "Agent: planner picks a source (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "As the plan says for this case: the planner picks a replacement (Discord's older formatter, hand-written answers, or the test helper already used elsewhere) in one small plan revision, re-read once by the three reviewers. The implementer keeps building the rest of M6 meanwhile; the test's answers are frozen after." The other option was "Agent: list it as a known limit". Ledger `steering/selection-ledger/2026-11-24.md`, block "2026-11-24T03:55Z — steering-hooks-fixer"; effort rulings block "2026-11-24T03:55Z" (record `5781bb73`). The pick (revision 13) is the planner's: the oracle helper on every surface, frozen, with hand-written literals as its content control. | Owner withdrawal only. Consequence: AC-6.5's "Expected value" and "Entry conditions"; EC-7 is retired. |
| D-22 | In the editor, Enter after a `> ` line continues the quote, as Discord's box does. A paste keeps its text exactly as pasted. Typing `> ` at the start of a carried line does not save `> > `. | 2026-11-24 | By selection: "Agent: follow Discord (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "Enter keeps the quote going, as in Discord's box; a paste keeps the text exactly as pasted, as Discord does; typing '> ' on a carried line no longer doubles it (what Discord does there wasn't checked). Cost: one plan revision, because the plan's typing check expects Enter to end the quote, re-read once by the three reviewers; the rest of M6 carries on." The other option was "Agent: Enter ends the quote". Ledger `steering/selection-ledger/2026-11-24.md`, block "2026-11-24T04:00Z — steering-hooks-fixer"; effort rulings block "2026-11-24T04:00Z" (record `603fb039`). Discord's behaviour comes from QA's walk (`verification/019/qa/discord-quote-probe/walk.md`, record `1e84abe1`). | Owner withdrawal only. Consequence: AC-6.7's table and AC-3.3's typed drive (revision 14). |
| D-23 | CR-20's keystroke cost is fixed before release. This lifts the M4 to M6 cap for CR-20 alone; the cap stands for every other gap. The plan gains a limit on one keystroke's cost, and the release waits for the fix round, code review and QA's re-check of M6. | 2026-11-24 | By selection: "Agent: fix it before release (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "The fix is small: the editor rechecks only the part of the message being edited, not every line, plus a test that counts that work. Cost: the plan gains a limit on how long one keystroke may take, re-read once by the three reviewers; then one fix round, code review again, and QA re-checks M6. Release waits for that; the time wasn't estimated." The other option was "Agent: keep the cap, ship it". Ledger `steering/selection-ledger/2026-11-24.md`, block "2026-11-24T07:05Z — steering-hooks-fixer"; effort rulings block "2026-11-24T07:05Z" (record `3ec39942`). | Owner withdrawal only. Consequence: AC-6.8 (revision 16); CR-20's row is discharged into it. |
| D-24 | Both code-block problems are fixed inside 019 before its one release: the 126-iteration normalise throw on opening or closing a code fence, with QAF-51's `>>>` form, and CR-23's fence-close cost. This lifts the M4 to M6 cap for these two items alone; the cap stands for every other gap. | 2026-11-24 | By selection: "Agent: fix both first (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "Matches your 'fix everything we find' and 'all editor fixes in this effort' rulings. The plan gains a check on code-block and >>> keystrokes, re-read by the three reviewers; then a fix round, code review again, and QA re-checks. Release waits for that. The error's cause isn't diagnosed yet, so the time wasn't estimated." The other options were "Agent: fix the slowdown only" and "Agent: ship as is". Ledger `steering/selection-ledger/2026-11-24.md`, block "2026-11-24T14:32Z — steering-hooks-fixer"; effort rulings block "2026-11-24T14:33Z" (record `d7eb0a40`). | Owner withdrawal only. Consequence: AC-6.9 (revision 21). Outstanding 2's and CR-23's Planner batch rows are discharged into it, and handoff `124c6099` is superseded. |
| D-25 | D-24 widens by one item: after `>` typed at the start of `>> …` makes a `>>> ` quote, the caret sits at the start of the line's text, fixed in the same fix round. | 2026-11-24 | By selection: "Agent: fix it too (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "In line with your 'fix everything we find' ruling. It rides the code-block fix round already planned. The plan's next small revision gains the expected cursor position, read once by the three reviewers in the read they're already doing, so no extra round. Release waits only for that round, as it already does." The other option was "Agent: track it for later". Ledger `steering/selection-ledger/2026-11-24.md`, block "2026-11-24T17:03Z — steering-hooks-fixer"; effort rulings block "2026-11-24T17:03Z" (record `0fa784d0`). | Owner withdrawal only. Consequence: AC-6.9's caret limb (revision 22), QAF-52 discharged into it. |
| D-26 | CR-25's paste member is fixed before the one release, in M6's third fix round: a paste through `insertData` of plain and `a🙂` lines. This lifts the cap for this item alone. | 2026-11-24 | By selection: "Agent: fix it too (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "Matches your 'fix everything we find' ruling. The paste check joins the plan revision already waiting for the reviewers, so they read it once with no extra round. It rides the fix round already needed for the code-block slowdown, then code review and QA. Release waits only for that round, as it already does." The other options were "Agent: track it for later" and "Discuss first". Ledger `steering/selection-ledger/2026-11-24.md`, block "2026-11-24T20:07Z — steering-hooks-fixer"; effort rulings block "2026-11-24T20:07Z" (record `8b684907`). | Owner withdrawal only. Consequence: AC-6.9's paste members and count limb (revision 23); CR-25's paste member discharged into them. |
| D-27 | Paste and code-block speed is timed at QA, with no revision 24: SL-29 is an entry condition on QA Phase 2 of M6's third fix round, a timed reading at that round's tip beside `af3d95a`'s on the same probe, with the box load, for each paste member and each fence keystroke on the `a🙂` texts, at 200 and 1,000 lines; a reading that is not roughly today's speed goes to him through steering, and back to a fix under D-26 or D-24. The third fix round starts on revision 23. | 2026-11-24 | By selection: "Agent: time it at QA (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "No further plan revision. The fix round starts as soon as QA approves the current revision. Before QA can pass the fix, it times paste and code-block closing on emoji-heavy messages against today's site on the same test; anything not roughly today's speed comes back to me, and goes back for fixing under your 'fix it too' choice." The other options were "Agent: add a time limit to the plan" and "Discuss first". Ledger `steering/selection-ledger/2026-11-24.md`, block "2026-11-24T20:54Z — steering-hooks-fixer"; effort rulings block "2026-11-24T20:54Z" (record `be956e8d`). | Owner withdrawal only. Consequence: QAF-53 (a) is met by SL-29's reading and its (b) is a Planner batch row; QAF-54 and F-58 are stated limits under block 14:48Z. The option text names code-block closing; SL-29, by the effort rulings block, times each fence keystroke on the `a🙂` texts, opening included. |
| D-28 | The Slate iteration-cap throw that the release adds (Fix Round 4's Outstanding 3) is fixed over its whole class before the one release. Before the revision, an agent probes every formatting character that can pair across lines (backtick, `>`, `\|\|`, `*`, `_`, `~`) at the start and end of lines over 200- and 1,000-line messages. Every keystroke that changes other lines joins AC-6.9's no-throw rule. Then come Revision 24, three plan-gate reads, Fix Round 5, code review and QA again. | 2026-11-25 | By selection: "Fix the whole class (Recommended)". Option text as he saw it in the ledger, agent-authored (`steering-hooks-fixer`): "First, an agent types each formatting character that can pair across lines (backtick, >, \|\|, *, _, ~) at the start and end of lines in 200- and 1,000-line messages. Every keystroke that changes other lines joins the editor's no-crash rule. Then one more plan revision, read by all three plan reviewers, a fifth fix round, code review and QA again. The probe time is not measured. This is the third crash of this kind, and this option covers the kind, not just this case." The other options were "Fix only this keystroke" and "Ship it as a known limit". Corrected at R-122 from the rulings block's wording (critic F-61 point 1). Confirmed by D-29 after the corrected premise. Ledger `steering/selection-ledger/2026-11-25.md`, block "2026-11-25T05:28Z — steering-hooks-fixer"; effort rulings block "2026-11-25T05:28Z" (record `1e4d342a`). | Owner withdrawal only. Consequence: Outstanding 3's Planner batch row is discharged into Revision 24's AC-6.9 class, and its held handoff is not owed. The member set comes from AN-9's enumeration. |
| D-29 | D-28 stands after the corrected premise: in Chrome the backtick's write is kept, the release adds a page error and the emoji drawing change, and the class fix continues. | 2026-11-25 | By selection: "Keep fixing the class (Recommended)". He was told first, agent-authored (`steering-hooks-fixer`): "That came from a test harness, not a browser, and I should have had it typed in a real browser before asking. … The error shows once as a page error. The backtick stays in the message, and a reload keeps it. In that run the emoji on screen dropped from 200 drawn to 1 after the error." Option text: "Your earlier choice stands. The release would otherwise add a page error and the emoji drawing collapse that production doesn't have. The next two questions settle how far the fix reaches." The other option was "Withdraw: known limit". The last sentence was restored at R-125 (critic F-62). Ledger `steering/selection-ledger/2026-11-25.md`, block "2026-11-25T06:14Z — steering-hooks-fixer", question 1; effort rulings block "2026-11-25T06:14Z" (record `a7b6ee15`). | Owner withdrawal only. Consequence: D-28's class work continues (R-123's weakened premise is answered). See body note on "emoji drawing collapse" (Planner batch row "Fix Round 4's Outstanding 3"). |
| D-30 | The D-28 positions beyond the six listed members are checked before QA passes M6, with no plan revision for them: each position shows no error at the fixed branch, and an error sends it back to the fix. This is SL-30's form. | 2026-11-25 | By selection: "Check them before QA passes (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "No plan revision, so Fix Round 5 starts now. Before QA passes M6, each of these positions must show no error at the fixed branch. An error sends it back to the fix." The question named: "A backtick typed mid-line on line 1 errors. So do removing the closing backtick with Backspace, and removing the opening one with Delete. A backtick at the end of a middle line errors at 200 and 1,000 lines. Production errors on none of them." The other options were "List them in the plan" and "Leave as written". Ledger block "2026-11-25T06:14Z — steering-hooks-fixer", question 2; effort rulings block "2026-11-25T06:14Z" (record `a7b6ee15`). | Owner withdrawal only. Consequence: SL-30 is an entry condition on QA Phase 2 of Fix Round 5 (its Planner batch row). "Fix Round 5 starts now" in the option is overtaken by D-31, which takes Revision 25 and its three reads first. |
| D-31 | The six inline-code members join AC-6.9's standing work-per-line count limb (at 1,000 lines at most 10 times the count at 200), in Revision 25, read by the three plan gates before Fix Round 5. | 2026-11-25 | By selection: "Add a speed check (Recommended)". Option text, agent-authored (`steering-hooks-fixer`): "The six cases join the existing check that 1,000 lines cost no more than 10 times 200 lines. That needs a Revision 25 (shared with the previous question's revision if you chose one) and three plan-review reads before Fix Round 5 starts." The other option was "No speed check". Ledger block "2026-11-25T06:14Z — steering-hooks-fixer", question 3; effort rulings block "2026-11-25T06:14Z" (record `a7b6ee15`). | Owner withdrawal only. Consequence: AC-6.9's "Work per line" limb (revision 25); QAF-55 and F-60 (SL-31) are discharged into it. |

**Revision cap on M4 and M6 (steering's ruling, not his).** Effort rulings block "2026-11-23T17:56Z" (record `b95a3d43`), by
`steering-hooks-fixer` under steering.md's standing check: "from Revision 7's verdicts onward, each further gap below HIGH on M4
or M6 goes to the plan's Planner batch as a stated limit, with no revision round. A gate's severity-floor finding is excepted. M2,
M3 and M5 are not capped". Reason given: revision 7 is M4's and M6's second revision after revision 5's approval. Date
2026-11-23. Voided by his word: steering tells him at his next prompt, with the spend. Reading M4 and M6 stays in scope for every
gate; only revising them below HIGH is barred.

**Revision cap on M3 (steering's ruling, not his).** Effort rulings block "2026-11-23T22:35Z" (record `41101e70`), by
`steering-hooks-fixer`: "Past Revision 12, each further M3 gap below HIGH goes to the plan's Planner batch as a stated limit, with
no revision round. A gate's severity-floor finding is excepted. AC-3.7 has now been revised in two consecutive revisions (11, 12);
a revision of it in the next one is decided by this thread before the fold". Reason given: revision 12 is M3's second revision
since revision 9's approval. Date 2026-11-23. Voided by his word: steering tells him at his next prompt, with the spend. Reading M3
stays in scope for every gate.

**Cap on M4, M5 and M6 now (his selection).** Effort rulings block "2026-11-24T00:49Z" (record `8de0ac36`). Put by
`steering-coordinator`, answered 2026-11-24T00:48Z; the option text is the coordinator's: "steering-hooks-fixer caps every
remaining milestone now: problems below HIGH are written down as known limits, with no fix round. Saves fix rounds (M3 is on its
fifth). Costs: more known limits ship." Steering's reading: each gap below HIGH, from a plan gate, code review or QA, goes to the
Planner batch as a stated limit, with no fix or revision round. A gate's severity-floor finding is excepted. Rounds in flight
finish: M3 fix round 5 at `380e82d`, and M4's review at `e58f2ed`. Reopened by his withdrawal only.

**AC-4.7 decided by steering before any further fold (steering's ruling, not his).** Effort rulings block "2026-11-23T18:02Z"
(record `0a794563`): "After Revision 9, a further AC-4.7 gap of any severity is decided here before any fold, against a stated
limit." The reason given is that AC-4.7 was revised in revisions 6, 7 and 8. Revision 9, which folds QAF-28 with the critic's and
architect's revision 8 verdicts and asks gates to read AC-4.7's delta only, is the fold that ruling authorised. Date 2026-11-23.
Voided by his word or by steering's.

The scope statement is quoted verbatim from block 09:18Z in § Objective. It narrows nothing that may be reconsidered beyond what it
says. It carries no expiry: a member found later inside the region is in scope on steering's ruling (same block), and a member
outside the region is a re-scope.

## Objective

The scope statement, verbatim (block 09:18Z): "(website, the region in the inventory's region table: `src/components/SlateEditor/**`,
`src/utils/markdown/**`, `src/components/Markdown*.tsx`, and the editor surfaces that mount them). The editor (typing, paste, load,
save, colouring) and the preview render every input the way Discord does and lose no character. A fuzzer or intensive check, with a
Discord-derived oracle, enumerates the class and stays in the suite. In: S-01..S-06, S-08..S-10, S-13, S-14, S-17, S-18,
LF-1..LF-6, and every defect the fuzzer finds in the region. S-07 (emoji stored as `:name:`) is in, as a question for him through
the plan." Steering added S-29 inside the region (common brief), and S-30 and two widenings at block 15:49Z.

His standard (D-3), narrowed by D-5, D-14 and D-15 and reframed by this plan for criteria:
- The message-content preview is judged against Discord only on inputs where Discord's legacy and native formatters agree. On the
  rest, its renderers are judged against the engine's own tree.
- The embed and V2 previews are judged by visible style against Discord's legacy rendering, the only one Discord uses there.
- The editor is judged against Discord's native text box.

M3's class table states each, and a generated known-differences list names every case not held to Discord. Original wording
beside the reframe: "the editor is meant to match Discord" (block 09:11Z heading, steering's).

### Inventory carriage (every in-scope row)

| Row | Carried by | Note |
|---|---|---|
| S-01 nested runs lose the outer style | M5 | Cause removed: width inference is deleted. Came from `TODO.md` "fix-decorator-nested-styles". |
| S-02 nested highlight.js scope in a code line | M5 (AC-5.4) | Code-line path. |
| S-03 zero-length highlight.js scopes | M5 (AC-5.3) | Code-line path. |
| S-04 ranges past a line's end | M5 (AC-5.3) | |
| S-05 the `_` inside a renamed emoji pairs | M5 | Cause removed: the parse runs over the typed text. |
| S-06 static render manufactures `:ok:` | M4 | Cause removed: the preview no longer pre-transforms. |
| S-07 emoji stored as `:name:` | M6 (D-10, AC-6.2) | |
| S-08 guild emoji from the picker | M6 (AC-6.3, UAT walk) | From handoff 5b19c3e4, item 1. |
| S-09 IME after an emoji | M6 (AC-6.4) | From handoff 5b19c3e4, item 2. The handoff stays its carrier. |
| S-10 timestamp edit target | M4 (AC-4.3) | Came from 9d; D-8. |
| S-13 lift the corpus and the walk runner into the suite | M3 | From `TODO.md` "website editor tests: lift…". |
| S-14 highlight.js private `_emitter` | M5 (AC-5.4) | CF-7: `HighlightResult.value`. |
| S-17 escape rewritten on open | M6 (AC-6.1) | |
| S-18 real-browser assumptions of the decorator | M5 (AC-5.5, UAT walk) | |
| S-29 typing turns a quote line into code and drops its `> ` | M6 (AC-6.1) | The trigger is widened by QAF-4 of the fence-loop chain (`qa/closed/fix-normalize-fence-loop-qa.md`: 346 of 15,480 random typed edits at `61e5dfe` drop a `> `/`>>> ` when typing inside a fence turns a quote line into code), per effort block 15:49Z item 1. |
| S-30 opening a box without saving stored the old `>>>` rewrite on the server | M6 (AC-6.1b), by a read | Added by effort block 15:49Z item 2 (plan-local id; from `retrospectives/fixes-2026-11-23-steering-hooks-fixer-2-retrospective.md` § 3). |
| LF-1 emoji pre-transform rewrites link targets | M4 (AC-4.2), M5 | |
| LF-2 emoji beside links stored as `:name:` | M6 (it is S-07; D-10) | |
| LF-3 bare-URL end rule | M4/M5 by the engine; AC-3.1 asserts | |
| LF-4 `<…>` scheme | M4/M5 by the engine; AC-3.1 and AC-4.6 assert | |
| LF-5 list lines uncoloured | M5 (D-11: no list-marker colouring; content styles still apply) | |
| LF-6 embed-title link behaviour | M4/M5 per surface mask (AN-3) | |
| LF-7, LF-8 | no finding | M3's corpus keeps them as agreement rows. |
| LF-9 coverage gap | M3 | |
| The fence-loop chain's three differential drivers | M3, as seeds and lifted instruments | Effort block 15:49Z item 3: the reviewer's 20-atom differential (`verification/fix-normalize-fence-loop/code-review/probe.differential.test.tsx.txt`), QA's seeded random differential (`…/qa/probe.random-differential.test.tsx.txt`, with `…/qa/probe.wrong-edit-replay.test.tsx.txt`), the fixer's loader-identity driver (`…/round1b/probe.loader-same.test.ts.txt`). All three are carried. |

The research's items left to the effort, by name (research Recommendations item 4, and G-14 added at its close):
- **Research OQ-3 / G-3** (embed and Components V2 rule sets): settled by AN-3 (legacy only), ruled by D-14, carried by the M2 masks
  and AC-3.7.
- **G-8** (module-id stability): settled by AN-4 on stable 679055 and canary 679159; M3's predicate-based locator fails loudly
  (outcome table, C3).
- **G-9** (editor and embed rule sets against the oracle): M3, over every surface.
- **G-11** (the native parser seen rendered, read as test account 2): not completed in AN-7; Exclusions X-13.
- **G-13** (real role, command and usable emoji ids): read in AN-7, and those reads remain the record of how Discord draws them.
  AC-4.4 carries the usable-emoji limb. Under D-17, AC-4.4 has no resolved-role or resolved-command limb, because the site holds
  no role or command data. GAME_MENTION's written form is AN-8.
- **G-14** (emoji inside a masked-link label on a webhook message): AN-4 read the state, and AN-7 found the class to be a
  legacy/native disagreement on the webhook path. It is in AC-3.6's class and the known-differences report.

## Assumptions and open questions

Where the estate was searched: website `af3d95a` (`git grep` and `git show` over `src`, read 2026-11-23); `@discord/markdown-wasm`
0.16.0, `-types` 0.14.0 and `-react` 0.12.0 (`npm pack` into a session scratch directory, read, and for the wasm, run); and
preview-image-generator `prod` `8512a1d` (`git show 8512a1d:src/generateImage.ts`).

Premises read or run:
- **P-1 (run)**: `parse` returns no spans and no source text. It was run under Node, 0.16.0, over four inputs; the output is at
  `verification/019/planning/parse-spans-probe.out`, and no `span` key appears in any `parse` result. A bare `https://x.y🙂` comes
  back as `{type:"link", value:{url:"https://x.xn--y-bz3s/"}}`, and `[a](https://x.y/🙂)` comes back with `url`
  `https://x.y/%F0%9F%99%82`. The top level holds `paragraph` nodes, and content holds `text` nodes. The declared `Block` union names
  neither (F-5; AC-2.4 takes both enumerators). So S-10's edit target and a detected link's label come from `parseLossless` or
  from the source text, and AN-5 picks the form.
- **P-2 (read)**: the generator captures on `page.goto(url, { waitUntil: 'networkidle0' })`, then calls `page.screenshot` with no
  DOM-readiness wait (`preview-image-generator@8512a1d src/generateImage.ts:generateMessagePreviewImage`; puppeteer `^21.1.0`).
- **P-3 (read)**: the browser loader is `WebAssembly.compileStreaming(fetch(new URL("./lib/discord_markdown_wasm_bg.wasm",
  import.meta.url)))` (`@discord/markdown-wasm@0.16.0 src/compile-module.js:compileModule`). `compileStreaming` needs the response
  to be `application/wasm` (QAF-10). `initSync` takes a `WebAssembly.Module` (`src/parse.d.ts`). The wasm's SHA-256 is
  `da7b9e5e…57fb0`, equal to research V-4.
- **P-4 (read)**: the parse-engine consumers at `af3d95a`: `MarkdownProvider` (`useValue`); `DiscordMessageEditor/index.tsx`, which
  holds the loading gate (`show={!!(markdown && (onMount || mounted))}`, F-3); the `DiscordContentEditor` trio; `ContentBody`;
  `TextDisplayEditor`; `Embed` (the description); `EmbedTitle`; `EmbedField`; `SlateEditor`; `decorator`; and `getInitialValue` and
  `withNormalizeNode` (through `parseEmoji` only). The importer listing is `verification/019/planning/markdown-importers-af3d95a.txt`
  (34 lines, 25 outside `__tests__`, `grep -c`). The provider value's full reader list is the architect's CF-5, and the timestamp
  callback's readers are CF-6 (`architecture/019-slate-formatting-discord-engine-architecture-findings.md`).
- **P-5 (read)**: two refusals in the editor's paste handler at `af3d95a` (`src/components/SlateEditor/index.tsx` `onPaste`). In
  `partialMarkdown` mode (embed title and field name), a paste holding a line break is refused. In both modes, a paste over
  `MAX_PASTE_LENGTH` (6,000 characters) is refused. `partialMarkdown` also skips quote and fence recognition on load
  (`getInitialValue`).
- **P-6 (read)**: the vitest config at `af3d95a` declares two projects, `node` and `dom`, through `vitest.config.ts:project`, and
  `package.json` `test` is `vitest run`.
- **P-7 (read)**: the only Slate inline element at `af3d95a` is the emoji element (`src/@types/slate.d.ts`: `EmojiElement.type` is
  `emoji`, `nameEmoji` or `discordEmoji`; `CustomElement.type` is `div`, `codeBlock` or `blockQuote`). Mentions and timestamps are
  text. Discord's two boxes serialise every inline object as one `?` before parsing (analysis `aafecf1` AN-6, run).
- **P-8 (read)**: `simple-markdown` at `af3d95a`. 16 files under `src` import it, 15 of them outside `__tests__`
  (`verification/019/planning/simple-markdown-importers-af3d95a.txt`, `git grep -l`, counted by `grep -c`). Beyond `src`, it is in
  `package.json` (`^0.7.3`), `patches/simple-markdown@0.7.3.patch`, and the `pnpm-workspace.yaml` `patchedDependencies` entry.
  M4's kept renderers (`src/utils/markdown/rules.tsx`, `utils.ts`) are among the importers.

Results of M1 (analysis `analysis/019-slate-formatting-discord-engine-analysis.md`, record `aafecf1`; Vercel limb
`deployment/019-slate-formatting-discord-engine-deployment.md`, record `2531c04a`), each in M1 under its item.

OPEN QUESTION [RESOLVED] OQ-1 (S-07): he chose "store the character" (D-10); M6 AC-6.2 carries it.

OPEN QUESTION [RESOLVED] OQ-2 (heading and list markers, cross-line runs): he chose "follow Discord's box" (D-11); M5 AC-5.6 carries
it.

OPEN QUESTION [RESOLVED] OQ-3 (the oracle offline): he chose "separate Discord command" (D-12); M3 carries it.

OPEN QUESTION [RESOLVED] OQ-4 (S-14): the architect's CF-7 names the public surface, `HighlightResult.value`; M5 AC-5.4 carries it.

OPEN QUESTION [RESOLVED] OQ-5 (the editor's emoji lift): he chose "engine decides emoji" (D-13); M6 AC-6.5 and AC-6.6 carry it.

OPEN QUESTION [RESOLVED] AN-3's legacy-only surfaces: he chose "match how it looks" (D-14); M3 AC-3.7 and AC-3.8, and M4's
adjustment module, carry it.

OPEN QUESTION [RESOLVED] D-11's reopening (AN-6, cross-line runs): he chose "style across lines" (D-15); M5 carries it.

Scope assumptions that a design predating the plan (the architect's findings) makes:
- **Unit**: one adapter for all six surfaces (content, embed description, embed title, field name, field value, Components V2 text
  display), distinguished by `Syntax` mask. AN-3 found the five non-content surfaces legacy-only. D-14 keeps the one engine there,
  with a per-surface adjustment module the adapter calls.
- **Reach**: the read-only preview branches and `/preview` move with the editor surfaces.
- **Layer**: the Slate block layer (quote and fence recognition, `flattenNodeText`, code-line and fence-line context) stays the
  site's own (AF-9). AC-5.6 and AC-3.3 say so. D-15's run unit spans adjacent `div` and `blockQuote` elements, never a `codeBlock`
  element (M5).
- **Emoji lift**: from the engine (D-13, AC-6.5).

## Plan

### M1 — Analysis before code (REQUIRES ANALYSIS; REQUIRED before the approvals named per item)

The analysis is commissioned to the analyst; its document, created under `analysis/`, is named
019-slate-formatting-discord-engine-analysis.md. It inherits ID 019. The analyst works only on the items below, with outputs under
`verification/019/analysis/`. Exports are taken from the chain base (or `af3d95a` before the cut) with a **copied** `node_modules`:
Turbopack refuses a symlinked one (`handoff/bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md` item 1). Any local save on a
build first moves message ids out of production's range (workspace `CLAUDE.md`). The research's scratch instruments
(`legacy-oracle.js`, `tbcmp.py`, `domcmp.py`, research § Scratch instruments) are perishable; AN-4 and AN-6 lift what they use into
`verification/019/analysis/` first (QAF-11).

- **AN-1 Build spike (AF-5; D-6's "build check").**
  - In an export with the package added at exact `0.16.0`, `next build` (Turbopack, the repo's `build` script) emits the wasm as a
    served asset, and the editor page and `/preview` initialise it under `next start`, in Chrome and in Playwright Firefox (QAF-10).
  - If the `new URL(…, import.meta.url)` form is not emitted, the fallback runs: `initSync` with a bundler-supplied
    `WebAssembly.Module`.
  - It records:
    - the editor page's markdown chunk bytes before and after, raw and gzip;
    - the wasm response's `content-type`, `content-encoding` and bytes;
    - the time from navigation to the first formatted render, median and p95 over 20 loads.
  - A Vercel Preview of the spike branch is devops's act. A plain push is predicted not to reach READY: plan 018's OQ-5 [RESOLVED]
    and RK-7 (`planning/closed/018-next-upgrade-save-size-cap.md`) record that a Preview builds only from a branch carrying a
    `vercel.json` build command with `SKIP_ENV_VALIDATION=1`, because `src/env.mjs` needs Production-only variables (F-11). Devops
    takes that form, re-reads the Preview variables first, and records the same numbers there, naming the build form they were taken
    on.
  - **Not completed or fail** (no form initialises under `next build`): this holds M2's approval and returns D-6 to him through
    steering (D-6's reopening class).
- **AN-2 Generator capture (P-2; RK-2).**
  - Puppeteer runs at the generator's own pinned version (`8512a1d` `package-lock.json`), with its exact `goto` options, viewport and
    screenshot, against the spike's `/preview`, with the loading state M2 specifies (hidden until ready). It takes 50 captures each of
    three messages carrying bold, a masked link and a spoiler.
  - It counts captures whose DOM at screenshot time holds the formatted elements (`page.content()` right after `screenshot()`), and
    keeps the JPEGs.
  - On every capture, **pass or fail**, it records the gap between network quiet and the first formatted render, and it reads the
    length of puppeteer's `networkidle0` quiet window at that version from its source (F-4).
  - **Pass**: 150 of 150 formatted, with the gap distribution recorded.
  - **Not completed or fail**: this holds M4's approval and goes to steering. A generator-side wait is outside the region and is a
    re-scope; the analyst states the page-side candidates and does not pick one.
- **AN-3 Surface masks (research OQ-3 / G-3; research H-3).**
  - Which syntax Discord parses in each of: embed description, title, field name, field value, footer and author (confirm they are
    not markdown), and Components V2 text display. Both parsers are read: the legacy `EMBED_TITLE_RULES` and the others in the
    served rule module, and the native mask where the embed renderer is located in the lazy chunks. Then it is confirmed on the test
    server: the test bot posts embeds and a V2 text display carrying one discriminating case per syntax bit to `slate-oracle-walk`,
    read as test account 1.
  - Output: a table, surface × each of the 31 `Syntax` bits (with `DEV_LINKS` stated explicitly, QAF-4) → allowed in legacy,
    allowed in native, rendered. Each surface is also classed: both formatters, legacy only, or native only.
  - **A surface Discord parses with the legacy formatter only** (research H-3) goes to him through steering before M2's approval. It
    carries that surface's disagree count from M3's classification over the 272 corpus (F-7). This is a question under D-5's
    premise, not a re-opening of D-5.
  - **Not completed**: this holds M2's approval. A surface AN-3 cannot settle goes to him through steering, with the proposed mask
    and its residue.
- **AN-4 Legacy oracle in the test environment (G-8; G-14; D-4).**
  - Can the legacy facade (`parseToAST`) and the legacy text-box table (rule-to-Slate, research V-1 module 339200) run under Node
    from assets fetched at test time, or is a headless browser needed? If a browser is needed, it names which driver, what it does
    at install (a browser download or a postinstall step), and whether Vercel's install would run it (F-13).
  - Locator: module content predicates (research V-1 table), failing when a predicate matches zero modules or more than one. It
    re-runs the predicate table on the stable build current at the analysis, against research V-13's build 679055.
  - It reports run time over the 272-case corpus, and the failure modes when discord.com is unreachable or the page changes.
  - **G-14**: the legacy parse state a message the site sends gets. It reads in the served code (research § 3 step 1, module
    354777) which state flags a message with a `webhookId` is parsed under, `allowEmojiLinks` included.
  - **Not completed**: this holds M3's approval.
- **AN-5 Which tree the preview renders from (P-1).**
  - For each node kind whose rendering needs source text or a span: detected and auto link labels (what Discord draws as the label
    of a bare URL, read from the research walk's DOM captures or re-posted), the timestamp edit target (S-10), and the code block's
    language as typed. It settles whether the preview renders from `parse` plus source slices or from `parseLossless` alone, naming
    the form chosen and its reason.
  - **Not completed**: this holds M4's approval.
- **AN-6 Editor token mapping (QAF-1).**
  - Discord's native token-to-decoration mapping (module 818948) as a table, token kind × node context → leaf classes. It is read
    from the served bundle as prose, and nothing is copied (D-4). The table is frozen as literals; AC-3.2 uses it to decide agree
    membership.
  - It runs the legacy text-box table over the corpus to give per-character expected styles, and reports the agree set's size over
    the 86 typed cases (research V-22: 43 of 68 under the researcher's own mapping).
  - It reports how the box treats a style crossing an inline object (emoji, mention, timestamp).
  - **Not completed**: this holds M5's approval.
- **AN-7 Real-Discord reads (G-11, G-13, G-14; D-10's premise).**
  - G-13: a role mention, a slash-command mention and a custom emoji the bot can use, posted with real test-server ids, and the DOM
    read.
  - G-11: `***bi***`, `# # nested` and `**# not head**` read in `slate-oracle-walk` as test account 2, where a session's browser holds
    that profile.
  - D-10's premise: 🙂 typed into Discord's box and sent to the test server, and the stored content read. If it is `:name:`, that goes
    back to him (D-10's reopening class).
  - G-14: a masked link whose label is a Unicode emoji, and one whose label is a custom emoji the poster can use, posted to
    `slate-oracle-walk` as the bot and through a webhook, with both DOMs read. This is the oracle check for the emoji-label class.
  - **Not completed**, per limb: G-11 becomes Exclusions X-13; G-13 becomes X-14, and AC-4.4's unresolved-kind rendering takes its
    source text. The D-10 and G-14 limbs completed (Results below). None of these holds an approval.

- **AN-8 Five residual reads (commissioned at revision 3, the fifth limb at revision 4; REQUIRED before M4's approval).** Outputs under
  `verification/019/analysis/an8/`, added to the same analysis document.
  - **Timestamp styles `s` and `S`** (critique F-25, SL-2). The engine accepts nine style letters, `d f s t D F R S T`, and the bare
    form (critique Appendix). `MarkdownTimestamp.tsx` at `af3d95a` formats six of them and handles `R`. Post `<t:1700000000:s>` and
    `<t:1700000000:S>` to `slate-oracle-walk` through a webhook, and read the drawn text as test account 1.
  - **GAME_MENTION's written form** (analysis gap G-1). Read the regex export of module 856896 in the Node oracle, then post one
    case.
  - **Local-build sign-in** (AC-6.3's provision step; critique SL-7). Can a local production build complete Discord sign-in?
    Check the NextAuth Discord provider's redirect host against the OAuth application, reading key names and hosts only.
  - **The editor-page `pageerror`** (analysis gap G-3; devops's record § 3). Load production `hooks.gg` `/message/m/new` 20 times
    in fresh contexts, and record whether the same `pageerror` appears at the base, with its message and stack.
  - **Generator capture under a slow CPU** (analysis H-1; QAF-22). Re-run `an2-capture.js` against the spike build's `/preview` under
    `Emulation.setCPUThrottlingRate` 4×, 50 captures of each of AN-2's three messages. Record the formatted count and the margin
    distribution beside AN-2's 519.7 ms minimum.
  - **Not completed**, per limb:
    - `s` and `S`: completed (Results below); this outcome did not apply.
    - GAME_MENTION: it stays X-14.
    - Sign-in: AC-6.3's walk is a stated limit quoting the attempt, carried by handoff 5b19c3e4 item 1.
    - `pageerror`: it stays a stated limit, and devops reads it on the chain's Preview at Stage 1.
    - Slow CPU: RK-2 keeps H-1 open with no margin read, and UAT records the generator's capture at B-1's build instead.
    Only the first limb holds M4's approval. A slow-CPU run with fewer than 150 of 150 formatted goes to steering as an
    RK-2 member, because a page-side fix is in the region and a generator-side wait is X-11.

Results of M1 (analysis `aafecf1`, read at revision 3; AN-1's Vercel limb from devops's record `2531c04a`):

| Item | Result | Outcome applied |
|---|---|---|
| AN-1 | PASS in Chrome 157 and Playwright Firefox 144: `compileStreaming` is bundled, `initSync` is not needed, `/preview` is formatted 20 of 20. On the Vercel Preview (the plan 018 `SKIP_ENV_VALIDATION=1` form; a plain push fails env validation, F-11 confirmed), the wasm is served `application/wasm`, br, 447,426 bytes, and `/preview` is formatted 20 of 20 with a median of 1,214 ms | M2's approval is not held. RK-1 is falsified on this box and on Vercel Preview. RK-7's figure is measured: 459,029 bytes gzip-served locally, 447,426 br on Vercel |
| AN-2 | PASS: 150 of 150 formatted, pooled and cold; minimum margin before `networkidle0` 519.7 ms | M4's approval is not held. RK-2 now has a measured margin and a slower-CPU hypothesis (analysis H-1) |
| AN-3 | Content is the only surface on both formatters. Description, field value, title and field name (with and without an embed url), and the V2 text display are legacy-only; footer and author are plain. Native masks: content and description `0x3fffffff`, field value `0x3dffffff`, title and field name `0x19fecd7f` (`0x19fecd07` when the embed has a url), V2 text display `0x3fffffff`. Disagree counts over 272: 37, 37, 32, 54 (37), 37 | Put to him; ruled at D-14. AC-2.3 takes the six masks |
| AN-4 | The legacy facade and both box tables run under Node 24 in jsdom 30.0.1 with no browser: 272 rows in about 1.5 s, plus a 1.80 s fetch. All 13 predicates are unique on stable 679055 and canary 679159. G-14: a webhook message is parsed with `allowLinks` and `allowEmojiLinks` true | M3's approval is not held. F-13's driver clause does not arise |
| AN-5 | `parseLossless` alone: S-10 needs its span, and its nodes rebuild `parse`'s tree on 271 of 272 (the last row is a text-node split). A bare or `<…>` link's label is the normalised `url` | M4's approval is not held. `@discord/markdown-react` is not taken |
| AN-6 | The native box (818948) parses each run of adjacent line and quote elements as one text, so a run crosses line breaks; markers take no style; a masked link's label is styled `link` and its URL is syntax, the reverse of the legacy box. Native and legacy boxes agree on 39 of 65 comparable cases; the legacy table matches the box DOM on 63 of 65. Both boxes read an inline object as one `?` | D-11's reopening class fired; ruled at D-15. M5's approval is not held. The native box is run, not only read |
| AN-8 (limbs 1 to 4 and 2b; analysis records `db8199aa`, `3681654e`) | Limb 1: `s` and `S` drawn as `11/14/23, 10:13 PM` and `11/14/23, 10:13:20 PM` (en-US, UTC). Limb 2: a game mention is `<@$<id>>`, in module 827669; legacy and native agree in content, and a webhook draws a pill. Limb 2b: legacy parses it on the description, the field value and the V2 text display, not on the title or field name. Limb 3: the redirect host passes on `127.0.0.1:3000`, but a full sign-in needs a local Postgres. Limb 4: production raised no `pageerror` in 40 loads. Limb 5 (slow CPU) is in progress | M4's approval is not held. AC-4.7 takes limb 1's formats and X-24 is withdrawn. AC-2.3 and M4's mask line take limb 2b, which settles F-31. AC-6.3's provision step takes limb 3. The `pageerror` stays devops's to read on the chain's Preview at Stage 1. Limb 5 holds nothing |
| AN-7 | G-13 read on real ids. D-10's premise holds: U+1F642 is stored as typed. G-14: a masked link with an emoji label is a link only on the webhook path, drawn by legacy with the emoji as an image, while native leaves the emoji as text. G-11 not completed | X-13 applies. X-15 and X-16 are withdrawn (their reads landed). The G-14 class is a disagreement (AC-3.6) |

Acceptance: each AN item states a result with its capture path, or is marked not completed, and the outcome written above for that
item applies. An item that holds an approval is shown as held in this plan's Status-Detail until it lands.

### M2 — The engine and its adapter

Mirrors: `website@af3d95a src/providers/MarkdownProvider.tsx:useValue` for the lazy client load, and `website@af3d95a
src/components/DiscordMessageEditor/index.tsx` for its loading gate, which is kept (F-3). The exact-pin form follows
`"@vercel/functions": "3.11.3"` and `"zod": "3.22.4"` in `package.json`, and plan 018 M2-b's lockfile disposition.

- Add `@discord/markdown-wasm` `0.16.0`, exact, in `dependencies`. `@discord/markdown-react` is not taken (AN-5).
- One adapter module under `src/utils/markdown/` owns:
  - the call to `init` (AN-1: the bundled `compileStreaming` form serves; `initSync` is not needed);
  - the per-surface `Syntax` masks from AN-3, one named constant per mask (six: content, description, field value, title and
    field name, the same with an embed url, and the V2 text display);
  - the one `parseLossless` call that the preview, the colouring and the emoji lift all read (AN-5, D-13);
  - the per-surface selection of D-14's adjustment module (M4), which content never selects;
  - the node-kind → renderer map, and the token-kind → leaf-class map;
  - the link scheme allow-list (AC-4.6).
- `MarkdownProvider` exposes the adapter's ready state and its parse. It no longer exposes `parseEmoji` or any `simple-markdown`
  parser (D-13). The loading behaviour, by state:
  - **Pending**: as today. The message editor stays hidden until ready (`DiscordMessageEditor` `show`), and the surfaces that render
    `null` without the parser keep doing so (`DiscordContentEditor/index.tsx`, `EmbedField.tsx`). Not a deviation. A fetch that
    hangs rather than fails never reaches Rejected, so the editor stays hidden, as it does today on a hung JavaScript chunk. That
    is a stated limit, X-22 (QAF-15). The bound alternative, a timeout into Rejected, adds a mechanism whose value would have to
    outlast the slowest legitimate load (Firefox p95 6.2 s on loopback, AN-1; Slow 4G unmeasured). It would take an AN-1 re-run
    under throttling and one more gate round, and it is not taken.
  - **Resolved**: every surface renders formatted.
  - **Rejected**: every surface shows its source text unformatted, never an empty block, and one line `markdown-engine-init-failure
    version=0.16.0 reason=<error name>` goes to `console.error` per document. This is a deviation from today, where a failed import
    leaves the editor hidden for good. Its reason is AF-7 and integration requirement 4, which his D-6 selection adopted (findings §
    Owner's answer).
- An engine node or token kind the maps do not hold renders its source characters unformatted, and writes one `console.warn` line
  `markdown-engine-unmapped-kind kind=<kind> version=0.16.0` per kind per document (F-5).
- The MIT notice, "Copyright 2025 Discord, Inc." with the permission text, is carried in the built client assets the editor page
  loads (AF-4). The mechanism is the implementer's.
- **Rider R-A** (handoff `handoff/website-paracord-listed-as-devdependency-but-imported-at-runtime-2026-11-22.md`, 02a4cca1, whose
  trigger this milestone's `package.json` edit fires). It moves `paracord` from `devDependencies` to `dependencies`, with the
  matching lockfile importer entry. Riders yield. Drop disposition, priced now: on any conflict, it drops to an on-next-touch note,
  and the handoff stays Open with this plan cited in its changelog.

Acceptance criteria:
- **AC-2.1 Confinement.** Over every `.ts`, `.tsx`, `.js` and `.mjs` file in the repository outside `node_modules` and `.next` (the
  unrestricted range), the modules whose import specifiers, static or dynamic, name `@discord/markdown-wasm`,
  `@discord/markdown-types` or `@discord/markdown-react` are exactly two:
  - the adapter;
  - one test oracle helper under `src/utils/markdown/__tests__/helpers/`, which calls the engine only with AN-3's literal masks and
    never imports the adapter's mask constants.
  The instrument is a module-graph read, not a path list. It is exercised on one real member and one planted non-member before any
  sweep relies on it.
- **AC-2.2 Pin.** `package.json` names `0.16.0` with no range operator.
  `pnpm-lock.yaml` resolves each package and `@discord/markdown-types@0.14.0` with integrity hashes. Every other pin the lockfile
  moves is listed and dispositioned in the implementation document, from a diff of the base and tip lockfiles (plan 018 M2-b form).
- **AC-2.3 Mask table.** Each of the six masks (M2's adapter list) equals AN-3's value for that surface over all 31 single-bit `Syntax` members
  (`@discord/markdown-types@0.14.0 syntax.d.ts:Syntax`), `DEV_LINKS` included. Expected values are literals from AN-3, with
  `GAME_MENTION` (`0x400`) cleared on the title and field name masks only, where Discord's legacy formatter does not parse a game
  mention (AN-8 limb 2b, analysis record `3681654e`; M4's mask line). The values are AN-3's native masks with that one bit
  cleared where limb 2b says, checked against QA's independent derivation (record `cf895cd`), which differs only in that bit:

  | Mask | Value | `GAME_MENTION` |
  |---|---|---|
  | content | `0x3fffffff` | set |
  | embed description | `0x3fffffff` | set (limb 2b: legacy parses it, and a pill is drawn) |
  | embed field value | `0x3dffffff` | set (limb 2b) |
  | embed title and field name | `0x19fec97f` | cleared (limb 2b: the literal text is drawn) |
  | embed title and field name, embed has a url | `0x19fec907` | cleared (limb 2b) |
  | V2 text display | `0x3fffffff` | set (limb 2b) |

  No mask equals `0`, which the engine reads as `Syntax.ALL` (`syntax.d.ts`; QA P-Q3). A surface AN-3 finds is not markdown
  (footer, author) never calls the engine (QAF-4).
- **AC-2.4 Total maps.** It uses two enumerators (F-5):
  - **declared**: every member of the declared unions at the pin has exactly one map entry. These are the `Block` and `Inline`
    members with their `emoji`, `mention` and `static` sub-kinds, the 16 `LosslessNodeKind` members and the 21 `TokenKind` members
    (counted from `index.d.ts`; the critic re-counted the same);
  - **observed**: every `type` and `kind` value the engine returns over M3's input classes is a key of the map. At this pin that
    includes `paragraph` and `text`, which the declared unions omit (P-1).
  The type-check catches a newly declared kind only. A kind that is returned but undeclared is caught by the observed enumerator
  and, at run time, by the unmapped-kind line.
- **AC-2.5 Init states (QAF-3).** On each of the six surfaces, and on `/preview`:
  - **pending**: today's hidden-until-ready behaviour;
  - **resolved**: formatted elements appear (for `**a**`, a `strong` element containing `a`);
  - **rejected**: every source character shows unformatted, and exactly one init-failure line is written per document.
  "Per document" means per full page load: a client-side navigation between two editor pages does not re-initialise and writes no
  second line, with all six surfaces mounted.
  - Human-observable form: on a local production build, with the wasm request blocked in Chrome devtools, the editor and the preview
    show the plain text; unblocked and reloaded, `**a**` is bold. Walked by UAT (QA register B-1), in Chrome and Firefox. Safari is
    Exclusions X-17. B-1 also records the editor's time-to-shown under Chrome devtools "Slow 4G". That reading is for X-22, not a
    pass condition (QAF-15).
- **AC-2.6 Notice (F-21, QAF-14).** At the tip, both the copyright line and the first sentence of the MIT permission text appear in a
  JavaScript file the editor page loads, read from the page's network list or the build manifest, not only in a sourcemap
  (`grep -rc` over that file). At the base the package is absent, so the base read is not a control. The control is a tip build with
  the notice mechanism removed.
- **AC-2.7 Rider R-A.** `paracord` is in `dependencies` with the same specifier, absent from `devDependencies`, and the lockfile's
  importer entry moved with it. `pnpm install --frozen-lockfile` exits 0 in an export, and no other lockfile pin moves for it.

Rollback: revert the milestone's commits with `git revert <sha>…`, run by the implementer on the chain branch before release, or by
devops on `master` after release under his release answer. The revert restores both `package.json` and `pnpm-lock.yaml`, and the
diff is read before it is committed.

### M3 — The fuzzer and oracle, in the suite (D-1; D-4; D-12; S-13; G-9; LF-9)

Mirrors: the instruments of inventory § 3 and the fence-loop drivers, lifted rather than rewritten. Placement and naming follow the
workspace `CLAUDE.md` Test Conventions, which bind this milestone's test work. The project form mirrors `website@af3d95a
vitest.config.ts:project`.

**Form (D-12, CF-3, CF-8).**
- Two more vitest projects, declared through the existing `project()` factory, which keep the environment-by-extension rule:
  `discord-node` (`__tests__/discord/**/*.test.ts`, `node`) and `discord-dom` (`__tests__/discord/**/*.test.tsx`, `jsdom`, with
  the `dom` project's setup file). The `node` and `dom` projects exclude `__tests__/discord/`.
- `package.json`: `test` becomes `vitest run --project node --project dom`, and `test:discord` is `vitest run --project discord-node
  --project discord-dom`.
- **`pnpm test`** holds the properties (AC-3.3), the finite maps and masks (AC-2.3, AC-2.4), the frozen Discord-derived literals,
  and the frozen inputs. The literals are the legacy trees and visible forms (AC-3.1, AC-3.7), the native box's per-character
  classes (AC-3.2, AC-5.6) and AN-3's masks. It runs offline. "Offline" means a network namespace with only loopback up (`unshare
  -rn` with `lo` up; QA P-Q1, QAF-13).
- **`pnpm test:discord`** fetches Discord's served build and runs its legacy facade, its legacy box table and its native box (module
  818948) under Node in jsdom (AN-4). It holds AC-3.1, AC-3.2's live limb, AC-3.6, AC-3.7, AC-3.8 and the drift alarm. It fails
  where a live value departs from a frozen one, naming both (QAF-6a).
- **Which wasm the native box runs on (critique F-27, QAF-18).** The native box runs on the **pinned** wasm bytes, the site's
  `@discord/markdown-wasm@0.16.0`, which the harness's `fetch` shim serves in place of the served wasm (AN-4 serves the wasm through
  that shim). Its frozen literals are taken under the pinned wasm too. So a difference between the site and the box is never the
  wasm's alone: it comes from the site, or from Discord's served box JavaScript, which is site-reachable (the token-to-class map is
  site code).
  - While the served wasm equals the pinned one, the two runs are identical (both SHA-256 `da7b9e5e…57fb0`, AN-1 and AN-4).
  - Under drift (C2), the live native-box limbs hold no gate. If the served box JavaScript fails to initialise against the pinned
    wasm, they report "not comparable under drift" with both hashes. If it initialises, any departure is reported with C2 and
    rides its upgrade handoff, not C4 or C5. A site regression is still caught: `pnpm test` holds the native-box literals frozen
    under the pinned wasm, offline. Whether the box JavaScript under drift computes as it would on its own wasm is untested (the
    critique's pass 4 assumption). This rule makes the answer not matter for a gate.
  - The implementer's re-derivation list names the wasm each live limb runs on.
- What it can re-derive, and what it cannot (critique F-26, SL-3):
  - **Re-derived live**: the legacy trees, the legacy visible forms per surface, the native box's classes, and the surface class
    check (AC-3.8 iii).
  - **Not re-derived**: AN-3's masks. They are frozen from a read of served code. No running Discord function emits them, so they
    go stale silently between reads. Their bearer is the code read that a pin change (outcome table, C2's pin column) and every C6
    owe. The implementer lists, in its implementation document, which frozen families the command re-derives, and QA's re-key reads
    that list.
- Who runs it (D-12, "every release gate and every pin change"), under the outcome table below:
  - in this chain, QA at Phase 2 and Phase 3;
  - at a pin change, the chain that changes the pin, through its QA;
  - at every later website release, whether or not that chain touches the region (critique F-24), devops at Stage 1, at the release
    tip, recording the output in that chain's deployment document. Devops is named because every website release passes through
    Stage 1, a fixer chain's included, while not every chain has a QA Phase 3 (critique F-28).

**Outcome of a red `pnpm test:discord` (F-2).** The served build has moved about weekly: `npm view @discord/markdown-wasm time`
shows six releases, 0.11.0 on 2026-10-13 to 0.16.0 on 2026-11-16, at intervals of 2, 8, 3, 9 and 12 days (critic's read,
2026-11-23).

| Cause | This chain, Phase 2 or 3 | A pin change | A later chain touching the region | A later release not touching the region |
|---|---|---|---|---|
| C1 fetch fails (loopback-only namespace or a real outage) | The gate re-runs when reachable and holds until a green run. The release waits on the network, not on Discord's schedule. | Same | Same | The command fails loudly (AC-3.5) and devops records the failure in the deployment document. It does not hold the release (critique F-28). A failure that persists into the next region chain's opening is that chain's C1 |
| C2 drift alarm: the served wasm ≠ the pinned wasm | Reported in the run output with both hashes. Not a failure: the site ships Discord's published 0.16.0, unchanged. The native-box limbs still run on the pinned wasm; where the served box JavaScript cannot initialise against it, they report "not comparable under drift" and hold nothing (M3, "Which wasm"). The gate records it, and devops at Stage 1 writes an upgrade handoff (Owning-Stage planner, Review-Trigger "when the pin is next changed, or the next chain touching the region opens") | The upgrade itself is a deliberate change (AF-3). It re-runs the whole command, moves AC-2.2's pin, AC-2.3's and AC-2.4's counts and the `version=` lines, and re-reads AN-3's masks from the served code | Recorded; the handoff is cited | Recorded; the handoff is cited, or written if none is open |
| C3 a locator predicate matches zero modules or several | Holds the gate. The implementer repairs the predicate in this chain. If the legacy parser is gone from the served bundle, D-5's stop condition has fired: it goes to him through steering, and AC-3.1, AC-3.7 and the legacy limbs lose their oracle until he rules | Same | Holds that chain's gate; repair is that chain's | Does not hold the release. Devops writes a handoff (Owning-Stage planner, Review-Trigger "the next chain touching the region opens"). If the legacy parser is gone, it goes to him through steering, as in this chain |
| C4 a frozen literal departs from its live value | Holds the gate. The literal is re-derived from the live oracle in this chain, and the change is read before it is frozen | Same | Same | Does not hold the release; a handoff as for C3 |
| C5 the site differs from the oracle on a class held to Discord | A defect: it holds the gate, and is fixed (D-7) | A defect of the new pin or of the site | A defect: it holds | Does not hold the release, since that chain changed nothing the oracle reads; a handoff as for C3 |
| C6 legacy-only surfaces may have moved (AC-3.8 i or i′), or an adjustment is dead or stale (AC-3.8 ii) | Holds the gate. If (i) or (i′) fires, it goes to him through steering, because re-classing the surfaces under D-5 is his ruling (D-14's stop condition), and the adjustments stay until he rules. If (ii) fires alone, the adjustment is removed or re-derived in this chain | Same | Same | Does not hold the release; (i) goes to him through steering, and (ii) is a handoff as for C3 |

A later release not touching the region runs the command (D-12) and is never held by it: neither by Discord's movement nor by
Discord's reachability. The website region at that tip is the one the previous region chain's gates passed, so a red there is news
about Discord, and its carrier is a handoff. The gate rule for later chains, with devops as its runner, is carried after this
chain closes by the workspace `CLAUDE.md` Test Conventions update in M7.

**Classes (F-6).** Each input is classified on the text Discord would store (research V-19 trimming applied). Content's classes use
the research's **loose** canonical form (research § Methodology: newlines at run and code-body edges trimmed; `http(s)` URLs in
Discord's stored spelling), with the strict-form disagree count reported beside it (F-14). The legacy-only surfaces use the
**visible form** (below).

| View and surface | Class | What is asserted | Against what | Where it is listed |
|---|---|---|---|---|
| Preview, content | agree (legacy ≡ native) | Preview DOM (AC-3.1) | The legacy tree | The run's counts |
| Preview, content | disagree, the G-14 emoji-label class included | Renderer fidelity: the site's DOM equals the engine's own tree (AC-3.6) | The engine's tree through the test normaliser. The renderer is the code under test, and the engine and the normaliser compute its expected value, not the renderer | The known-differences report |
| Preview, the five legacy-only surfaces (AN-3) | every input | Visible-form equality with legacy, except listed residue (AC-3.7) | Discord's legacy rendering for that surface, run live, in the visible form | Residue: the known-differences report, with the surface and "the site follows the engine" |
| Editor, content | every typed input | Per-character classes and marker flags (AC-3.2) | Discord's native box (818948), run live (D-15) | Legacy-box differences: the known-differences report, editor section |
| Editor, the five legacy-only surfaces | every input | Each content character's editor style set equals its preview style set, in the visible form (AC-5.8; the architect's W-3 criterion) | The site's own preview, which AC-3.7 holds to legacy. Discord has no text box for these surfaces | — |

No surface is native-only (AN-3). Nothing asserts that the engine matches Discord on content's disagree class: D-5 removes that
standard there. Such an engine difference is detected by no one, and that is accepted as X-18.

**Visible form (D-14; architect findings record `1c78753`, § "Legacy-only surfaces", part 1).** A rendering is a sequence of
displayed units. A unit is one displayed character, or one atom (a mention, an emoji or a timestamp, with its kind and resolved
value).
- Two renderings are equal when they have the same units in order, and each unit agrees on:
  - the displayed text, so a marker one side consumes is a difference;
  - the inline style set: bold, italic, underline, strikethrough, inline code and spoiler, compared as a set;
  - link membership and `href`, after AC-4.6;
  - block context: heading level, subtext, quote, code block with its language class, and list kind, start number and depth;
  - line-break positions.
- These differences are invisible:
  - inline nesting order;
  - a run split at a text-node boundary, or at a newline both sides keep;
  - `paragraph`, `text` and `empty` wrappers;
  - a spoiler split into pieces that reveal together, which holds only because the renderer reveals them together (AC-4.8);
  - bold or italic on whitespace;
  - block-versus-inline nesting order, except a quote inside a spoiler, whose bar carries the spoiler.
- The form is part of M3's normaliser. Its positive controls report one member of each invisible class equal, and one member of
  each counted dimension different.

**Adjustments toward legacy (D-14; the architect's B3, same section, part 2).** M3 first measures the visible residue on each
legacy-only surface. A residue class gets an adjustment in M4's module only when all three of these hold:
- **(a) engine-only**: it is a rewrite of the engine's lossless tree, using that tree, its spans, and engine re-parses of a node's
  own span under the same mask, never a regex or second grammar over source text;
- **(b) structural**: a predicate over the tree defines the class, never a list of inputs;
- **(c) proven**: in `pnpm test:discord`, it moves every reached member of its class from differs to equal, and moves no input
  from equal to differs on any surface.

Every other residue class is listed in AC-3.7's frozen residue list. The architect's row-by-row reading of research Appendix A is provisional, and the measurement
decides. The count of residue members, before and after adjustment, per surface, is recorded in the implementation document at M3
and M4. D-14's option stated it was unmeasured.

What it holds besides:
- **Generator.** A seeded generator over the syntax class: every `Syntax` bit's constructs, nested to depth 3, with delimiters
  balanced and unbalanced, and the link forms of D-2 (bare, `<…>`, `<email>`, masked with a title and with angle brackets). It also
  generates:
  - emoji in, before and after links, and inside masked-link labels (G-14);
  - every emoji form AC-6.2 lists;
  - escapes, lists, headings, subtext, quotes and fences;
  - timestamps of every style letter, invalid styles included;
  - mentions of every kind.
- **Fixed inputs**: the 272-case research corpus (`research/closed/slate-formatting-discord-oracle-2026-11-23.md` Appendix C, record
  `a666dbd9`) and the inventory's link inputs, **106 distinct strings**, at `verification/019/qa/link-inputs.json` (QAF-11). Both are
  lifted into the repo as data.
- **Lifted seeds** (effort block 15:49Z item 3): the 20-atom differential's atoms; the seeded random typed-edit differential (its
  15,480 edits at its committed seed, with QAF-4's 346 wrong edits as fixed members); and the loader-identity driver's inputs. Each
  becomes a block-layer input class for AC-3.3. The decorator chain's grammar-oracle and probe instruments are lifted the same way
  (S-13). None keeps a review-round or chain name.
- **Coverage report (QAF-8).** Per (`Syntax` bit × surface), the count of agree-class members that contain that construct. A cell at
  0 is named as unexamined in the run output.
- **Known-differences report (CF-4).** Generated, never hand-written, from three sources: content's disagree class, the legacy-only
  surfaces' residue left after adjustment, and the editor's differences from Discord's legacy box. It is written to a
  website-local path that `.gitignore` excludes. The stage that runs the command copies it into `verification/019/`.
- **Drift alarm.** It fetches `discord.com/app`, locates the wasm by the glue predicate (research V-1), and compares its SHA-256
  with the pinned wasm's. A mismatch is reported (C2).
- **Normaliser.** The canonical-form normaliser is a test module. Its positive control is that it reports every Appendix A pair as
  differing, after the research's four recorded artefacts are dispositioned. Its second, differently shaped instrument is the
  research's DOM-to-canonical comparison over the posted messages, re-run on AN-7's reads (QAF-6b). A mismatch is a candidate until
  a member is read.

Acceptance criteria:
- **AC-3.1 Preview oracle, content (D-4, D-5).** For every input in content's agree class, the content preview's rendered DOM in
  loose canonical form equals the legacy tree's.
  - The expected value is the legacy tree, computed by Discord's fetched code under the parse state a webhook-sent message gets
    (AN-4's G-14 read).
  - Membership in the agree class is decided by the legacy and native parses, both run with AN-3's literal masks, never the
    adapter's constants (QAF-2).
  - The native parse decides membership only, never the expected value (axiom E).
  - Input classes: the generator's output at the committed seed and count, the 272 corpus, and the 106 link inputs. A masked link
    with an emoji label is in the disagree class on the webhook path (AN-7), so AC-3.6 holds it. Residue: X-19.
- **AC-3.2 Editor oracle, content (D-4, D-15; QAF-1).** For every typed input, the content editor's per-character style set and
  marker flag equal those of Discord's native box (module 818948). The box is run on the fetched build under Node in jsdom, on the
  pinned wasm (M3, "Which wasm"), over the same text and the same run of adjacent line and quote elements (AN-4, AN-6).
  - The adapter's token map never enters the expected value.
  - `pnpm test` holds the native box's output as frozen literals, and `pnpm test:discord` re-derives them live (C4).
  - The legacy box's output over the same inputs is reported beside it, and its differences go to the known-differences report:
    26 of 65 comparable cases at AN-6, the masked-link reversal among them.
  - Input classes: AN-6's 85 captured typed cases, the 272 corpus as typed text, and the generator's typed limb, each with emoji
    elements present where the input has them.
  - Residue: X-19, and the box inputs replaced by an inline object (an emoji element is one `?` to the box, P-7).
  - Marker limbs follow D-11 and cross-line limbs follow D-15 (AC-5.6).
- **AC-3.3 Round trip (no Discord oracle; research gap 7).** These are properties of the site over the generator, the corpus, the
  1,662-line probe corpus and the lifted block-layer seeds, in each editor mode (F-9):
  - **full mode** (content, embed description, field value, V2 text display) and **partial mode** (`partialMarkdown`: embed title,
    field name);
  - load (`getInitialValue`) then save (`flattenNodeText`) returns the input character for character, emoji included (D-10);
  - typing the input one character at a time into a mounted editor yields the same text. In full mode the drive follows AC-6.7's
    quote continuation (D-22, revision 14). Where AC-6.7's table, computed over the input's text and never read from the
    editor's state (QAF-41), says Enter carries a `> ` onto the new line, the drive acts by the input's line:
    - if the input's line begins with `> `, the drive types it as it stands, and the typed `> ` replaces the carried marker;
    - if it does not, the drive first removes the carried marker by a gesture the implementer names, then types the line. A
      positive control shows that the gesture leaves the line empty.
    The drive removes a carried marker nowhere else, so a marker carried where AC-6.7's table carries none fails the identity;
  - pasting it whole yields the same text, for every input the mode's paste handler accepts. P-5's two refusals (a multi-line paste
    in partial mode; a paste over 6,000 characters in either mode) are kept as today's failure-path behaviour, and after a refused paste
    the editor's text equals its text before the paste;
  - normalisation settles, and a forced re-normalise after settling performs zero operations (QAF-9).
  - **Where the text is read (QAF-16).** The typed and pasted limbs read the value `SlateEditor`'s `onChange` hands the message,
    which save and send consume. They never read `editor.children`. The drive is shown to reach `onChange` before any count, by a
    positive control: typing `a` into an empty editor yields a write of `a`. QA's EC-4 drive did not reach it. The implementer reads
    why, and names the drive it uses in the implementation document.
  - **Count (critic Q2; EC-4).** The typed limb in `pnpm test` runs the 272 corpus, the lifted seeds and 1,000 generator inputs at
    the committed seed. At EC-4's mounted mean of 13.9 ms per input (QA's document, record `6dace3fa`), the generator part adds about
    14 s. That is a projection from 272 inputs, not a measurement. The full generator count runs in `pnpm test:discord`. The cap
    the count serves: `pnpm test`'s added wall time for AC-3.3 stays under 60 s on this box. The implementer re-times with the
    `onChange` drive at M3 and records the figure. Where it exceeds the cap, the generator count drops to fit, and the plan
    records the new count at its next pass.
- **AC-3.4 Seen red (F-10).** Each criterion is shown failing under a restored mutation of the code it exercises. For AC-3.1, AC-3.2
  and AC-3.6, that is the adapter's maps, masks and renderers. For AC-3.3, it is the function each property drives (`getInitialValue`,
  `flattenNodeText`, `withNormalizeNode`, the paste handler). For AC-3.7 it is the adjustment module and the adapter's surface
  selection.
  - A limb that fails at the chain base is shown red there on at least one named input. Which limbs pass at the base is taken from
    a run at the base, not from a list (critique SL-4). A limb the base passes is shown red by mutation only. Known so far: the
    normalisation limb, and the refused-paste limb (read from `onPaste` at `af3d95a`, not run).
  - Named base-red candidates for the typed limb: EC-4's eight corpus rows, 143, 144, 153, 159, 219, 220, 258 and 262 (QA's
    document, record `6dace3fa`). They are candidates until the `onChange` drive is shown red on them.
- **AC-3.5 Fetch failure is loud (D-12).** In the loopback-only namespace, `pnpm test:discord` exits non-zero, naming the fetch, and
  reports no pass count, while `pnpm test` exits 0. A predicate matching zero modules or more than one fails, naming the predicate.
- **AC-3.6 Renderer fidelity, content's disagree class (F-6).** For every input in content's disagree class, the content preview's
  DOM in loose canonical form equals the engine's tree in the same form.
- **AC-3.7 Legacy-visible equality on legacy-only surfaces (D-14).** On each of the five legacy-only surfaces, run under each of
  its masks, for every input in the generator, the 272 corpus and the 106 link inputs:
  - the preview's rendering, in the visible form, equals Discord's legacy rendering of that surface in the visible form, or
  - the input matches an entry of the **frozen residue list**, and its difference is exactly that entry's signature.
  The expected value is computed by Discord's fetched legacy code, with that surface's own call and state (AN-3), and never by the
  engine or the adjustment module (axiom E).
  - **The frozen residue list (critique F-29, SL-8; QAF-19; revision 11).** It has one entry per differing input, per surface
    and mask, and every part is a literal committed as test data at M4 from M3's residue measurement:
    - the surface and its mask;
    - the input, as its literal text, drawn from the classes above (the generator at its committed seed and count, the 272
      corpus, the 106 link inputs);
    - a visible-difference signature: the exact differing units, by position in the visible form, and the dimensions on which
      each one differs;
    - its family, one of a named set the implementation document states, and its reason.
  - **Atom-bearing inputs are in the population (revision 12; QAF-34, CF-18, F-36).** For AC-3.7 only, an atom unit agrees when
    its kind and its source span agree. Its resolved value (a D-17 channel name, an emoji image, a timestamp's formatted text) is
    not compared here, because it depends on data the legacy oracle does not have: the guild's lists, the emoji image table, the
    viewer's locale and clock. AC-4.3, AC-4.4, AC-4.7 and CF-10's emoji helper cover it. Elsewhere the visible form keeps the
    resolved value, as in AC-5.8.
  - **Why per input (revision 11; a deviation from revision 10's "class predicate").** The implementer measured the site's
    preview DOM against live legacy at website `6379abc` (`verification/019/impl/m4-residue-measurement-6379abc.json`,
    `m4-dom-residue-before.json`; the implementer's figures). The critic tallied the DOM file and found the same counts (critique
    cycle 5 pass 1, record `08caeb87`). That measurement covers only the inputs with no atom. There are 2,378 inputs per surface,
    and the atom-free ones are 1,344 on embedDescription, fieldValue and v2Text, and 1,545 on both title masks. The field name
    masks have no cell. Over those atom-free inputs, 500 of 1,344 differ on embedDescription and v2Text (148 minimal-input
    classes), and 501 on fieldValue (151). On embedTitle, 818 of 1,545 differ (174), and on embedTitleWithUrl, 354 (132). The
    entry count over all 2,378 inputs is not yet known. Most classes are the engine and legacy tokenising text differently: unbalanced
    emphasis runs, an empty heading, backtick runs, a list item with an odd character. No predicate over the engine parse
    separates them. A family predicate would admit almost any difference in its family, so "matches no entry fails" would catch
    little. A literal input is the narrowest class an entry can name, so this form is the stricter one.
  - **What fails.** Each of these fails as C5:
    - an input that differs and has no entry;
    - an input whose entry exists but whose difference is not exactly that entry's signature;
    - a stale entry: one whose input now equals legacy, or is no longer in the input classes. A change to the generator, its seed
      or its count therefore fails loudly until the list is re-measured in a reviewed commit.
    - an entry whose family is not in the implementation document's stated set, or a family whose stated member count for a
      surface does not equal the entries' tally for it (QAF-35). This is an offline data-shape check in `pnpm test`.
    The list never grows from a run: the known-differences report is generated, and an input that is newly different with no
    frozen entry fails.
    The stale-entry and family limbs are new checks. M4 runs each against one real member and one real non-member before any run
    relies on it: a planted stale entry and a live one, and a planted unknown family and a stated one (F-37).
  - **Changing the list.** Only a reviewed commit changes it. In this chain that is M4's, and later only a chain touching the
    region. Each entry carries its reason, one of: condition (a) or (b) fails, or an adjustment was tried and failed (c). The
    implementation document states each family once, with its reason and its member count per surface, and each entry names its
    family. Code review reads the families, and samples entries against them (Reading Order).
  - **M4's measurement covers every input** (F-36). M4 measures every input over every surface and mask AC-3.7 names, the two
    field name masks included. Its implementation document records the entry count per surface and mask, before and after
    adjustment, and the corpus members among them. The implementer commits the measurement files it cites.
  - Its count of entries per surface, before and after adjustment, is RK-9's falsifier. QA at Phase 2 reads the count at the tip
    against the one recorded at M4.
- **AC-3.8 Staleness check (D-14's stop condition; architect findings `1c78753`, part 4).** `pnpm test:discord` reads three things,
  and any failure is outcome C6:
  - **(i) routing**: it locates the embed renderer and the V2 text-display module in the fetched bundle by AN-3's content
    predicates, and asserts that neither references the native switch. The switch is found by research V-1's predicate for module
    146849 (`native-markdown"` together with `enable_native_markdown`). A predicate matching zero modules or several is C3;
  - **(i′) legacy calls still present**: the same two modules still call the legacy facade's `parseEmbedTitle` and
    `parseRichEmbedText` (the embed renderer) and its `parse` (the V2 text display), as AN-3 read them. A move to the native
    formatter that adds no reference to the switch in these modules is seen here as a missing call. This answers the critique's
    pass 3 assumption. A move that keeps both the calls and the absence of the switch is not seen: X-26;
  - **(ii) per adjustment**: over its reached class members, the engine's unadjusted output still differs visibly from legacy (the
    adjustment is not dead), and the adjusted output still equals legacy (legacy has not moved). An adjustment that reaches no
    member in the generator and the corpus fails (ii), so it can never pass empty (critique F-29's domain table);
  - **(iii) the surface class**: AN-3's per-surface legacy calls are re-run, and the description's and V2's legacy output still
    equals content's legacy output on the corpus (272 of 272 at AN-3).
  Limb (i)'s predicate is exercised before any run relies on it. The real member is a module that references the switch; AN-3
  names the content path's modules 997141 and 538355, and which of them carries the reference is unread. The real non-member is
  the embed renderer chunk AN-3 read on build 679055, where `grep -c` is 0. M3 runs the predicate on both and records which module
  is the member.

The decorator tests at the base (`decorator.emphasis-syntax-ranges.test.ts`) assert the width inference M5 deletes. Each case is
re-based on the token map, or retired under the Test Conventions' "superseded implementation" class with its named covering case
(integration requirement 7).

AN-4 needs no browser driver. The oracle runs in `jsdom`, already a direct dev dependency (`package.json` at `af3d95a`: `"jsdom":
"^30.0.1"`). Anything M3 does add to `package.json` takes AC-2.2's exact pin and lockfile disposition (F-13).

Rollback: revert its commits, run by the implementer before release or devops after. The production effect is none, except the
`test` script's change, which the revert restores.

### M4 — The preview on the engine (S-06, S-10, LF-1, LF-3, LF-4, LF-6 preview side; D-8)

Mirrors: the site's existing renderers, kept rather than replaced (AF-2): `MarkdownSpoiler`, `MarkdownTimestamp`, the
mention pills, `next/image` emoji and highlight.js code blocks (`website@af3d95a
src/utils/markdown/rules.tsx:staticBaseRules`, each rule's `react` output). The mention pills are the rules `discordChannel`,
`discordRole`, `discordUser` and `discordEveryone`. None of them resolves an id: each renders its capture, such as `#<id>`, in a
`discord-visualizer__mention` span (`website@5ec0621 src/utils/markdown/rules.tsx`, read this pass), and there is no command rule.
The channel-name lookup that AC-4.4 adds mirrors the site's existing readers of the guild's channel list:
`website@5ec0621 src/providers/WebhookProvider.tsx:useValue` reads `useGuild().channels`, and
`src/providers/GuildProvider.tsx:attachChannelsToWebhooks` finds a channel by `id`. The tree comes from AN-5's form. Every static parse path
goes through the adapter with its surface mask: `Markdown.tsx`, `ContentBody`, `TextDisplayEditor`, `Embed`, `EmbedTitle`,
`EmbedField`, the `DiscordContentEditor` read-only branch, and `/preview`. The timestamp callback's signature change and its readers
follow the architect's CF-6.
- The kept renderers' `react` functions in `rules.tsx` and `utils.ts` are re-expressed over the adapter's node types, so they leave
  `simple-markdown`'s types (P-8). Their output is unchanged. The removal of the package itself is AC-6.6, at M6, the last milestone
  that removes a reader (critic Q2).
- **The emoji display helper (CF-10, architect record `48e51d92`).** The engine's `emoji` node gives the emoji's value, but no image
  URL and no jumbo flag. Today both come from `simple-markdown`'s emoji rule. One site-owned helper beside the adapter computes
  `src` and `jumboable`. The preview's emoji renderer (this milestone) and the editor element's renderer (M6) both read it, so the
  two never disagree on an image or a size (W-3). `emoji.tsx` stays as that helper's name and image table, and recognises nothing.
  The jumbo rule follows Discord as AN-7's reads or the corpus show it. Where neither does, it is X-25.
- **The adjustment module (D-14; architect findings `1c78753`, part 3).** It is its own module under `src/utils/markdown/`, beside
  the adapter, and has these properties:
  - only the adapter calls it, selecting it per legacy-only surface beside that surface's mask, and content selects none;
  - it imports tree types only from the adapter, never from `@discord/markdown-*`, so AC-2.1 holds unchanged;
  - each adjustment is one named, exported function with its class predicate, so AC-3.8 (ii) can address it;
  - one legacy difference is settled now, in the adapter's masks rather than in this module. On the title and field name masks
    (with and without an embed url), the mask clears the `GAME_MENTION` bit. There, Discord's legacy formatter leaves
    `<@$<id>>` as text, and Discord draws the literal (AN-8 limb 2b, analysis record `3681654e`, run and observed on every
    variant). On the embed description, the field value and the V2 text display, the legacy tree holds a `gameMention` node
    and Discord draws a pill, so the bit stays set. The legacy facade's `parseRichEmbedText` defaults `allowGameMentions` to
    true (read in build 679055). In content, legacy and native agree on game mentions (limb 2, four cases), so they are in
    content's agree class. This settles critique F-31: its premise held for the title and field name only;
  - it rewrites the one `parseLossless` tree before the renderer map and the token-to-leaf map read it, so the editor's colouring
    on those surfaces takes it too (AC-5.8).
  Which classes it holds is decided by M3's residue measurement under the B3 rule (M3, "Adjustments toward legacy"). Its size is
  recorded at M4.

Acceptance criteria:
- **AC-4.1 (D-5, D-14).** AC-3.1 and AC-3.6 hold for the content preview, and AC-3.7 for the preview on the five legacy-only surfaces.
- **AC-4.2 Links.** For every link the engine returns, the anchor's `href` is the engine's `url`, subject to AC-4.6, and the visible
  label is the one AN-5 establishes Discord draws. The source text's emoji are never rewritten to `:name:` in a target or a label,
  over LF-1's class: every link form × an emoji before, inside and after.
  - Human-observable form: on a local production build, typing `https://x.y🙂` and `[a](https://x.y/🙂)` into the content editor
    gives two preview anchors. Each anchor exists, and neither `href` contains `:slight_smile`. Walked by UAT (QA register B-2).
    The production read is in § Testing Strategy.
- **AC-4.3 Timestamps (D-8; QAF-7).** For every message holding k ≥ 1 timestamps, editing the i-th rendered timestamp rewrites
  exactly that timestamp's source characters and no others, for every i, while the preview stays mounted. The message class
  includes:
  - timestamps inside code spans and code blocks;
  - identical duplicate timestamp strings;
  - an escaped `\<t:…>`;
  - an invalid style letter, which stays text (V-21);
  - timestamps inside a spoiler and inside a link label;
  - timestamps added before, between or after existing ones.
  `localDate` follows a re-render whose source changes that timestamp. The target comes from a span, never from a count or a search
  over the raw string.
- **AC-4.4 Mentions (D-17).** Every mention node the engine returns renders something visible, on every surface. What it renders
  follows the table below, over every member of `MENTION_KINDS` (`website@7dcedc9 src/utils/markdown/engine.ts`: `user`,
  `channel`, `role`, `game`, `command`, `everyone`, `here`, and `static` with its five `STATIC_MENTION_KINDS`) crossed with
  whether a channel's id is on the list. "Today's form" means the text and class that the `rules.tsx` rule at `website@5ec0621`
  renders for the same source (M4's Mirrors line). No mention renders the text `unknown`, `@unknown-role` or `@unknown-user`.

  | Mention | Renders |
  |---|---|
  | `channel`, and its id is a channel on the guild's channel list, or an active thread under one | That channel's or thread's name, after `#`, in today's channel pill (`discord-visualizer__mention discord-visualizer__interactive`) |
  | `channel`, any other case: no list is in reach (`/preview`, which `GuildProvider` does not wrap; signed out; no guild chosen; the list still loading or failed), or the id is not on the list | Today's form: `#<id>` in the same pill |
  | `role` | Today's form: `@&<id>` in the `discord-visualizer__mention` pill |
  | `user` | Today's form: `@<id>` (or `@!<id>`, as typed) in the interactive pill |
  | `everyone`, `here` | Today's form: `@everyone` / `@here` in the pill |
  | `command` | Today's form: its source text, as plain text (no command rule exists today) |
  | `game`, `static` (five kinds) | Its source text (Exclusions X-14) |

  - **Usable custom emoji (unchanged; AN-7, G-13).** It renders as an image whose `alt` is `:name:`.
  - **Where the list comes from.** It is the list `GuildProvider` already holds: text and voice channels with names, each with its
    active threads (`website@5ec0621 src/utils/redis/index.ts:fetchChannels`, read this pass). Nothing new is fetched. Today a
    surface outside `GuildProvider` (`/preview`; `Providers` mounts it only in `src/app/message/layout.tsx`) gets no list.
    `useGuild` throws there, so on such a surface the lookup must not need the provider. There the channel renders today's form,
    and the surface still renders.
  - **The deviations, marked.** Discord draws a resolved channel as a channel-type icon followed by the name, with no `#` character
    (AN-3 capture `verification/019/analysis/an3/an3-dom2.json`, record `aafecf19`: an icon labelled "Text", then
    `slate-oracle-walk`). The site keeps today's `#` text prefix in place of the icon, for every channel type. Threads are looked up
    in each channel's `threads`, where `attachChannelsToWebhooks` searches top-level channels only, because Discord's
    `<#id>` syntax names a thread as well as a channel. The unlisted-channel row, and the user and `everyone`/`here` rows, are my
    reading of D-17's "nothing renders as unknown" with today's form (planner-019). The selection named only channels, roles and
    commands.
  - **Residue.** The name is whatever the list held when it was fetched. `GuildProvider` keeps the list for 5 minutes without
    refetching on focus, and the server caches it for 10 seconds (`staleTime: 5 * 60 * 1000`, `expireSeconds: 10`, read this pass).
    So a channel renamed or deleted within that window can show its old name until the next fetch. Forum, category and archived
    thread ids are not on the list and render today's form. A user report of a wrong channel name goes to this criterion.
  - **Human-observable form.** On a local production build signed in to the test guild `1566742402180456559`, the content
    `<#1574358729577599086>` previews as `#slate-oracle-walk`, and `<@&1>` previews as `@&1`. The same content on `/preview` shows
    `#1574358729577599086`. Walked by UAT on that build before release.
- **AC-4.5** The static emoji pre-transform (`utils.ts:staticParserFor`) has no caller on a preview path, read by AC-2.1's
  module-graph instrument.
- **AC-4.6 Link schemes (QAF-5; critique F-25, SL-1).** Every rendered `href`, over the generator and the fixed inputs, has a scheme
  in the adapter's allow-list: `http`, `https`, `mailto`, `discord`, `tel` and `sms`. Those are every scheme the engine returned at
  the pin under `Syntax.ALL` over the critique's probe inputs (critique Appendix, run at 0.16.0). `dev` is returned only under a
  mask carrying `DEV_LINKS`, which none of the six carries (AN-3).
  - A link whose scheme is outside the list renders its label as text with no `href`.
  - The list is checked by AC-2.4's observed enumerator: every scheme the engine returns over M3's input classes is either in the
    list or has that stated outcome. A scheme newly returned at a pin change is a C2 re-run item.
  - Controls run both ways. The engine-level control: the engine returns no link for `javascript:`, `data:` or `vbscript:` (critique
    Appendix). The renderer-level control: a tree node carrying a `javascript:` url, handed to the renderer, is refused, and an
    allowed one is kept. That node is a fixture inventing engine output, and the implementation document names it as such (QAF-17).
- **AC-4.7 Timestamp styles (critique F-25, SL-2).** Every timestamp form the engine accepts renders as a timestamp element, never as
  raw source and never empty: the nine style letters `d f s t D F R S T` and the bare form. The engine returns a timestamp node for
  all nine and for the bare form (critique Appendix). `R` renders relative time, asserted under a fixed clock against a literal
  (QAF-20). The other six existing formats keep today's output, through the sibling table `TIMESTAMP_TO_DAYJS_FORMAT`
  (`website@af3d95a src/utils/markdown/components/MarkdownTimestamp.tsx`, formatted by dayjs).
  - **`s` and `S`, a deviation from the sibling table (critique F-32; architect CF-13, record `93708612`).** `s` renders as
    `Intl.DateTimeFormat` with `{ dateStyle: 'short', timeStyle: 'short' }`, and `S` with `{ dateStyle: 'short', timeStyle:
    'medium' }`. The reason is that no dayjs form gives Discord's text: dayjs's localized `L LT` and `L LTS` give `11/14/2023
    10:13 PM` and `11/14/2023 10:13:20 PM`, with a four-digit year and no comma, while `Intl` gives Discord's `11/14/23, 10:13 PM`
    and `11/14/23, 10:13:20 PM` exactly (`verification/019/planning/timestamp-s-S-dayjs-vs-intl.txt`; Discord's strings from AN-8
    limb 1, observed for an `en-US`, UTC reader; the option sets are a high-confidence inference).
  - **Everything else follows the sibling.**
    - **Time zone:** while `state.mounted` is false, `s` and `S` format in UTC, as the sibling does (`if (!state.mounted) date =
      date.utc()`).
    - **Locale (CF-14; QAF-26 iii):** `Intl` takes the locale dayjs **resolves** the tag to, `dayjs.locale()` read at render,
      never the tag `src/components/LoadLocale.tsx` hands it. The two differ for any tag with no dayjs file in
      `src/utils/loadLocales.ts`, which imports 29 locales, `ja` and `en-gb` among them, and not `vi`. For `vi-VN`, dayjs falls back
      to `en` and `s` reads `11/14/23, 10:13 PM`, while `Intl` given the tag reads `22:13 14/11/23` (QA P-Q19,
      `verification/019/qa/probe-r8-timestamp-locale.out`, record `5ca68b07`; the critic ran the same pair at `683f3e9`). So `s`
      and `S` always render in the six siblings' language.
    - **Picker (D-16):** the format picker offers seven styles: the six keys of `TIMESTAMP_TO_DAYJS_FORMAT`, mapped at line 105,
      and a separate `R` button at lines 115-122 (`af3d95a`). It stays as it is and lists neither `s` nor `S`, which render
      correctly when typed or pasted.
  - **What the test sets (QAF-25, QAF-26).** `en-US` and UTC are this box's own defaults, so the test sets the locale and the time
    zone itself, never relying on the environment's. Each branch has a fixture that decides it alone, and a mutant shown red on it:
    - **en-US, UTC:** the two literals above;
    - **mounted, `America/New_York`:** `s` is `11/14/23, 5:13 PM`, and `S` is `11/14/23, 5:13:20 PM`;
    - **pre-mount (`state.mounted` false), `America/New_York`:** `s` is `11/14/23, 10:13 PM`, under the UTC rule. NM-45, which
      ignores `mounted`, is red on it;
    - **a non-default locale through `LoadLocale`'s dayjs path, `en-GB`, UTC:** `s` is `14/11/2023, 22:13`. NM-46, which
      hard-codes the locale or reads the host's, is red on it;
    - **a tag the site has no file for, `vi-VN`, UTC (QAF-28; critique F-33; CF-15):** `s` is `11/14/23, 10:13 PM`, the `en` form
      dayjs resolves to. The tag-passing mutant gives `22:13 14/11/23` and is red on it. The test loads the site's locale files as
      production does (`loadLocales.ts`), and supplies the tag where `LoadLocale` reads it, react-aria's locale, never by calling
      `dayjs.locale` directly, or the mutant would have no tag to pass. `cs-CZ` and `da-DK` also serve.
    The expected strings are QA's probe outputs at Node 24.14.0 and ICU 78.2, and the test pins nothing it doesn't set.
  - Other locales are X-19's locale-wording residue. An invalid style letter stays text (AC-4.3).
- **AC-4.8 Spoiler pieces reveal together (D-14's visible form).** Where the engine splits one spoiler into several rendered pieces,
  revealing any piece reveals every piece of that spoiler, on every surface. The visible form treats the split as invisible only
  because this holds.

Re-derivation gate: this milestone changes product behaviour (the preview's rendering of stored messages). When M4 ships on the chain
branch, every downstream milestone not yet authorised for execution is marked `PREMISE-STALE`, until one paragraph re-argues its
premise as a plan revision.

Rollback: revert M4's commits together with M5's, never one alone (AF-2), and with M6's once AC-6.6 has removed `simple-markdown`,
since M4's revert restores readers of that package. Devops after release, the implementer before it. The revert restores
`package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml` and the patch file, and its diff is read before it is committed.

### M5 — The editor's colouring on `parseLossless` (S-01 to S-05, S-14, S-18, LF-1 editor side, LF-5, LF-6 editor side)

Mirrors: Discord's own native box, which decorates from `parseLossless` tokens (research V-6, V-11; module 818948 is read as prose
in AN-6, never copied). The `decorator` contract is kept: `(editor, mounted, isEmbed, parser) → ([node, path]) → Range[]`
(`website@af3d95a src/components/SlateEditor/utils/decorator.tsx` default export), with the surface mask in place of the parser.

- **The run unit (D-15).** The decorator parses each run of adjacent `div` and `blockQuote` elements as one text, as Discord's
  native box does (AN-6): the elements are joined by `\n`, and a quote element contributes its `> ` prefix. Token spans are mapped
  back onto each element's text nodes, so an inline run whose delimiters sit on different lines styles both lines. A `codeBlock`
  element ends a run and keeps the Slate layer's code-line context and highlight.js (AF-9).
- **Inline objects (analysis determination 1, P-7).** An emoji element counts as one `?` in the parsed text, as both Discord boxes
  serialise an inline object. It does not count as its source text. So `**a <emoji> b**` is bold across the emoji, and an emoji's
  name never reaches the parser.
- **One parse per unit (CF-1).** The parse is cached per run unit per change, so a unit is parsed once however many text nodes it
  holds. The architect measured why: 2,154 ms per pass re-parsing per text node, against 5.2 ms parsing once, on a 2,000-character
  line with 401 text nodes (`verification/019/architect-conformance/split.out`). D-15's option priced the run re-parse at about
  10 ms for 4,096 multi-line characters (`verification/019/architect-conformance/time.out`, row `4096 lines`, lossless median
  9.895 ms). The cache form is the implementer's.
- Width inference (`openingWidth`, `closingWidth`, `growMaskedLinkClosing`, `reduceAdjacentSyntax`), the interactive rule set's
  markdown path and `surrogateSourceOffsets` leave the colouring path.
- Code lines take highlight.js's public `HighlightResult.value` and scan its closed HTML grammar (`<span class>`, `</span>`, five
  escaped entities) with no DOM, in place of `_emitter.rootNode` (CF-7).

Acceptance criteria:
- **AC-5.1 (D-15, D-14).** AC-3.2 holds over the content editor, and AC-5.8 over the editors of the five legacy-only surfaces.
- **AC-5.2 Split invariance.** For every run unit, the class set of each character is the same however its text is divided into
  Slate text nodes: by emoji elements (the only inline element, P-7), and by decorator leaf boundaries. This covers S-01's class.
- **AC-5.3 In range.** No decorator range ends past its text node's end, and none is zero-length (S-03, S-04). This holds over the
  generator, the corpus, and the code lines of every language `hljs.listLanguages()` returns at highlight.js 11.12.0 (193, QA's read
  at `af3d95a`).
- **AC-5.4 Code lines (S-02, S-14).** A nested highlight scope keeps its outer scope's class on every character it covers, for every
  language whose grammar nests. The expected value is highlight.js's HTML for the whole line, parsed by jsdom's `DOMParser`, never by
  the decorator's scanner. No highlight.js member outside its public typings is read.
- **AC-5.5 Real browser (S-18).** In Chrome, on a local production build, no character in AN-6's 65 comparable cases (the
  line-crossing cases 104, 105 and 67 among them) is coloured differently from its jsdom class list. Walked by UAT (QA register B-3), with captures under `verification/019/uat/`.
- **AC-5.6 (D-11, D-15; F-8).** The rule covers the inline runs: the five `ModifierKind` members, inline code, and links.
  - Each run unit's inline-run classes are computed from the unit's joined text, so an inline run whose delimiters sit on different
    lines of one unit styles the characters between them on both lines, as the native box does (D-15). A `codeBlock` element
    between two lines ends the unit, and a run never crosses it.
  - No character of a heading marker (`#`, `##`, `###` and its space) or a list marker (`-`, `*`, `1.` and the like, with its space)
    carries a style class (D-11).
  - The subtext marker `-# ` and the whitespace after it carry the open-marker class (AN-6 table, `subtext_marker`).
  - A masked link's label carries the `link` class and its destination carries marker classes (AN-6 table), the native box's form.
  - Code-line, fence-line and quote-line context comes from the Slate layer, as today (`ancestor.lang`, `startCodeBlock`), and keeps
    its styling.
  Expected values are the native box's output (AC-3.2), frozen in `pnpm test` and re-derived live in `pnpm test:discord`.
- **AC-5.7 One parse per unit (CF-1).** In one decorate pass over an editor value, the engine is called at most once per run unit,
  whatever the number of text nodes in it. This is counted, not timed, through a pass-through mock of the adapter's engine call
  (AC-2.1 keeps the adapter the sole importer).
  - It is shown red against the form without the cache, on a unit of at least 50 text nodes.
  - Stale limb (QA NM-30): after an edit to one element, the next decorate pass re-parses that element's unit once, with the new
    text, and no other unit.
  - Timing read for D-15's reopening class: at M5, the per-edit re-parse of a 4,096-character multi-line unit is timed on this box,
    median of 20, and recorded beside the option's "about 10 ms". The reading is not a pass condition, and a material excess goes
    to him through steering.
- **AC-5.8 Editor equals preview on legacy-only surfaces (D-14; the architect's W-3 criterion).** On each of the five legacy-only
  surfaces, for every input in the generator and the 272 corpus, each content character's editor style set equals that
  character's style set in the same surface's preview, in the visible form. Markers carry their marker classes, as AN-6's table
  gives them. Discord has no text box for these surfaces, so this is the standard there.

Re-derivation gate: M5 changes what the editor shows. When it ships on the chain branch, M6 and M7, if not yet authorised, are marked
`PREMISE-STALE` until re-argued.

Rollback: with M4 (AF-2).

### M6 — The Slate layer: round trip and input (S-07, S-08, S-09, S-17, S-29, S-30)

Mirrors: chain `fix-normalize-fence-loop`'s fence and quote handling at `af3d95a` (`codeFence.ts`, `withNormalizeNode.ts`
`handleElement`) and its tests (`withNormalizeNode.quote-and-fence-lines-settle.test.tsx`,
`SlateEditor.opening-writes-stored-text.test.tsx`), which this milestone extends rather than duplicates.

Acceptance criteria:
- **AC-6.1** AC-3.3 holds for every input in its classes. Illustrative members, re-read at the chain base before the change:
  - S-29 in QAF-4's widened form: any typed edit inside a fence that turns a quote line into code keeps that line's `> ` or `>>> `
    in the saved text, over the 346 recorded edits and the random differential's class;
  - S-17: escaped markdown on open.
- **AC-6.1b (S-30), a read rather than a fix.** Read at `0411d3b`: every `saveMessage()` caller is a user act. `git grep -n
  "saveMessage("` gives four sites: two in `Navigation.tsx`, and two in `edit/page.tsx` (the save hotkey and a button). So opening a
  box without saving wrote nothing to the server; a rewritten `>>>` reached it only through a later user Save, or through Send or
  Save-as from that state. The code review re-reads this at the chain base, over the five `message.upsert` writers (QA's count;
  `system-architecture.md` Persisting writers). At the tip, AC-3.3's load-then-save identity holds for every `>>>` input. Production
  residue is X-20.
- **AC-6.2 (D-10; QAF-12).** Over every emoji form, the saved and copied text equals what was typed or pasted, character for
  character, and stored text, `:name:` included, loads and saves unchanged. The forms are:
  - a Unicode character, a ZWJ sequence, a skin-tone sequence, a keycap, a flag, a tag sequence;
  - VS-16 against text presentation;
  - an emoji newer than the site's table;
  - a typed `:name:`, and `:🙂:`;
  - custom `<:n:id>` and `<a:n:id>`;
  - emoji in link labels and targets.
  The expected values are literals. Stored messages are not migrated (D-10).
- **AC-6.3 (S-08; F-18).** A guild emoji picked from the picker into a content line, a code line and a quote line keeps every
  character around the cursor, and inserts the emoji's text form. Walked by UAT (QA register B-4) on a build signed in as a test
  account that can use the test guild's emoji.
  - **Provision step, from plan time** (critique SL-7). AN-8 limb 3 read that the redirect host passes: production's OAuth
    application accepts `http://127.0.0.1:3000/api/auth/callback/discord` and refuses `localhost:3000`, and `.env.local`'s
    `NEXTAUTH_URL` names 127.0.0.1. A complete sign-in was not executed, because no Postgres listens on `127.0.0.1:5432`. So UAT's
    build for B-4:
    - provisions a local Postgres, pushes the schema and moves the message id sequence out of production's range before any
      save (workspace `CLAUDE.md`, "Local builds of `website`");
    - browses `127.0.0.1:3000`, never `localhost`;
    - signs in as a test account through the test-account browser (block 09:05Z item 2: the `discord-test-browser` skill "may
      be able to drive the guild-emoji picker").
    Whether `.env.local`'s client secret is current is shown only by that code exchange. The local client id is production's
    public one.
  - Where sign-in cannot be completed, the limit quotes that attempt, and handoff 5b19c3e4 item 1 stays its carrier.
- **AC-6.4 (S-09; F-18).** Composition events on a phone keyboard: the box has no phone or mobile IME. What would build a place to
  read it is his own phone walk on production after deploy. That is an optional owner observation, whose quoted attestation is
  complete evidence, carried by handoff 5b19c3e4 item 2. Its `Review-Trigger` fires on this chain's edit of `setOnInsert`, if M6
  makes one.
- **AC-6.5 The emoji lift reads the engine (D-13; CF-2 b; QAF-12).** The lift (`getInitialValue` on load, `withNormalizeNode`
  `handleElement` on edit) takes its emoji ranges from the `emoji` nodes of the adapter's one `parseLossless` parse.
  - **Which text it hands the engine (critic Q1).** The lift reads the same run unit the decorator parses (M5, D-15), with existing
    emoji elements as one `?` each. So the colouring and the lift read one parse, and an emoji inside a construct that spans lines
    is an element exactly when the engine's parse of the unit calls it an emoji.
  - **Re-deciding on edit (CF-9).** After each unit parse, an emoji element whose `?` falls inside a `code` or `code_block` node,
    or inside a link's `url` token, is turned back into its source text, in the same normalisation pass as the lift. So typing
    backticks around 🙂, or placing it in a link's URL, leaves the editor showing what the preview shows.
  - **Property, loaded text.** Over the generator, the corpus and the 1,662-line probe, under each surface's mask, the set of
    character ranges turned into emoji elements equals the expected set of emoji spans. Research Appendix B row 230 is a member:
    `©` and `™` stay text.
  - **Property, typed edits (CF-9; QAF-23).** After any sequence of edits, the set of emoji elements equals the set a fresh load
    of the resulting text gives. The input class has two parts:
    - **emoji edits** over the 1,662-line probe's emoji tokens, at every offset around each token: inserting and deleting backticks
      around an emoji (so un-wrapping must re-lift it); adding or removing a link's `](` and `)` around one; and typing an emoji
      inside an existing code span or URL. This is the part that exercises re-deciding. M3's lifted typed-edit differential holds
      no emoji (QA's re-key, record `cf895cd`: an emoji grep over its tokens gives 0);
    - M3's lifted typed-edit differential (its 15,480 edits at the committed seed), which checks that the lift leaves emoji-free
      edits alone.
    Its count in `pnpm test` is fitted inside AC-3.3's 60 s cap, shared with AC-3.3's typed limb. The implementer records the
    count and the time at M6.
  - **Expected value (QAF-21, CF-11, CF-12; axiom E; D-21, revision 13).** On every surface, the expected spans are the output of
    AC-2.1's oracle helper (`website@2e36107 src/utils/markdown/__tests__/helpers/discordOracle.ts:nativeSurfaceParse`), which M6
    extends with an emoji-span join.
    - **How it is independent of the lift.** The helper runs the pinned engine under AN-3's literal surface masks
      (`SURFACE_MASK_LITERALS`), with its own join written from AN-6, over the raw text. Its one import is
      `@discord/markdown-wasm` (read at `2e36107`). It imports nothing from the adapter or the lift, so no expected span is
      computed by the parse the lift reads, or by the lift's own unit, `?` placeholders or offset mapping.
    - **What is and is not under test.** The engine is the authority D-13 names ("the editor's lift takes its emoji from
      Discord's formatter"). So this property tests the lift's run unit, placeholders, offsets and re-deciding, not the engine's
      emoji decision.
    - **Frozen.** The helper's spans over the property's class are generated once at M6 and committed as literals for
      `pnpm test`. That mirrors `website@2e36107 src/utils/markdown/__tests__/helpers/data/discordNativeBox.json` and the AC-3.7
      residue list. A pin change re-derives them (C4).
    - It has two controls:
      - **hand-written literals, under content's mask** (replaces the box's content control). The members are:
        - every AC-6.2 emoji form on its own;
        - each form inside bold, inline code, a code block and a link label;
        - each form on the second line of a bold run that opened on the first line, which crosses the join (F-40, SL-14);
        - one value from two source forms side by side, and an escape before an emoji, where the engine's `parse` gives an
          emoji node with no span and the join decides it (QAF-40; steering block 04:18Z): `😄:smile:`, `:smile:😄`, `😄😄`,
          `\*a😄` and `a\_b😄`, each with its literal. The named mutant "a join that matches each value at its first
          occurrence in the line" is seen red on them;
        - each form in a link URL (`[x](https://x.y/🙂)`, `https://x.y/🙂`, `<https://x.y/🙂>`);
        - each form after a backslash.
        Over these members, the helper's spans equal literals written by hand, never taken from a run. Each literal states its
        basis: AN-7's DOM reads where they cover the form, otherwise the form's own definition. A join that drops, shifts or keeps
        an emoji inside code or a URL fails it. If a literal and the helper differ, the member is listed and goes to steering
        before the literals freeze, because it would mean the engine and Discord's display disagree on a form D-13 covers.
      - **its mask is read (QAF-24)**. The content run cannot catch a helper that ignores its mask. QA measured that the no-url
        title and field name mask moves no emoji span over 417 inputs, and only the url variant differs, on link constructs (QA
        P-Q16, record `b5985b20`). So the helper also runs url-variant link fixtures, `[🙂](https://x.y)`, `https://x.y/🙂`,
        `<https://x.y/🙂>` and `https://x.y🙂`, each with a Unicode, a `:name:` and a custom emoji. QA's mutant NM-44, a helper that
        ignores its mask, is shown red on them.
    - **Residue.** The lift is not compared with what Discord's own client lifts, because its box marks no emoji (below). Beyond
      the hand-written members, an emoji decision Discord's client makes outside the engine is unobserved. A user report of one is
      recorded under AC-6.5's row in QA's register.
  - **Entry conditions at M6, before AC-6.5's literals freeze.**
    - **The box exposes its spans: false (D-21).** Implementer-019's probe at `2e36107` is
      `verification/019/impl/m6-box-emoji-probe-2e36107.test.ts`, with outputs `m6-box-emoji-probe-2e36107.json` and
      `m6-box-emoji-entries-2e36107.json`. Read this pass, over its 12 inputs (`grep -c '"t":'`):
      - an entry carries only `text`, `start`, `attributes` and `data`;
      - the attributes are syntax markers, `strong`, `inlineCode` and `link`;
      - an emoji sits inside a plain-text entry (`a😀b` is one entry with no attribute);
      - the module's exports are `Sd`, `p0` and `tA`.
      Steering's refutation helper confirmed it (effort rulings block 03:55Z). The box is no longer a source, and this revision
      makes the helper the source.
    - **EC-7 is retired (D-21).** It compared the lift's emoji set with the box's, and the box has none. Its question was
      whether following the expected source changes what D-13 described. That cannot arise now that the expected source is the
      engine D-13 names. The hand-written control's route to steering (above) carries the remaining form of it.
  - **Readers (CF-2's list with CF-10's addition).** The emoji element no longer stores a `simple-markdown` node, and its readers
    move to the new shape: `renderElementFactory.tsx` (`emojiToImage`, reading `src` and `jumboable` from M4's emoji display
    helper), `flattenNodeText.ts`, `common.ts` (its two `isEmojiNode(node?.ast)` predicates), `onCopy.ts`, `getInitialValue.ts`,
    `withNormalizeNode.ts` and `src/@types/slate.d.ts`. AC-6.2's round trip over every emoji form is the behavioural check that no
    reader lost a character.
- **AC-6.6 `simple-markdown` leaves the product (D-13; critic Q2).** At the tip:
  - no module in the repository outside `node_modules` and `.next` imports `simple-markdown`, read by AC-2.1's module-graph
    instrument (the population is P-8's 16 files at `af3d95a`);
  - `package.json` has no `simple-markdown` entry, `patches/simple-markdown@0.7.3.patch` is deleted, `pnpm-workspace.yaml` has no
    `patchedDependencies` entry for it, and `src/@types/simple-markdown.d.ts` is deleted;
  - `pnpm install --frozen-lockfile` exits 0 in an export, and AC-2.2's lockfile diff dispositions the pins it removes.
  The base test file `rules.multi-line-code-block.test.ts` imports its types. It is re-based on the adapter or retired under the
  Test Conventions' "superseded implementation" class, with its covering case named.
- **AC-6.7 Quote continuation follows Discord (D-22, revision 14).** In full mode, a line split, a paste and typing `> ` onto a
  carried marker save what this table says. A **`> ` quote line** is a line whose saved text begins with `> ` and that is neither
  inside a `>>>` block nor inside a code fence opened on a line that is not itself a `> ` line. The table is the criterion, and
  the limbs below read it.

  | The line split or pasted into is | Enter, the editor's line-split key, mid-line or at the end | A paste holding line breaks | Typing `> ` at the start of a line holding only a carried `> ` |
  |---|---|---|---|
  | a `> ` quote line | the new line starts with a carried `> ` (Discord's box: QA's walk, step 1) | saved exactly as pasted, with no marker added (walk, step 3) | the typed `> ` replaces the carried marker, so the line saves one `> ` (his option text; Discord not read) |
  | a line inside a `>>>` block | no marker is carried, since `>>>` already quotes to the end (the planner's reading of Discord's rule, not read in the box) | exactly as pasted | does not arise |
  | a line inside a code fence opened on an unquoted line | no marker is carried | exactly as pasted | does not arise |
  | any other line | no marker is carried | exactly as pasted | does not arise |

  - **The typing column is a replacement.** The carried marker and the typed `> ` are one marker in the saved text. Only the
    first `> ` typed onto a line that holds only the carried marker is taken in; a further `> ` is content, so `> > b` typed there
    saves `> > b`. This holds inside a fence opened on a `> ` line too: the 272-corpus row `> ```⏎> x⏎> ```` typed saves as typed.
    That row is one of the four cases implementer-019 holds red at website `8cb4d83` (its account, not re-derived).
  - **The paste column** is AC-3.3's paste limb, unchanged. Its identity now has no carried-marker exception, and P-5's
    refusals stand. At `2e36107` the carry is applied to every split, a paste's included: a paste of `> a⏎b` saves `> a⏎> b`
    (implementer-019's run, not re-derived).
  - **The Enter column.** At `2e36107`, `withNormalizeNode.ts`'s `apply` override carries a split line's `quotePrefix`, with any
    `>>> ` stripped (read this pass). So a line in a `>>>` block already carries an empty marker.
  - **Partial mode** is outside the table, and M6 does not change it.
  - **Expected values** are literals of the saved text, composed from the keys the drive sends, never from the normaliser.
  - **Seen red (AC-3.4)** by three mutants:
    - a carry that never fires fails the Enter column;
    - a carry applied to a paste fails the paste column, as the base does;
    - taking in no typed `> ` fails the typing column, with `> > `;
    - NM-68, a carry that ignores `>>>`, fails on `>>> a⏎> b` and on a `>>> a` line split (QAF-41);
    - NM-69, a carry that ignores the unquoted fence, fails on `` ```⏎> x `` (QAF-41).
    For these mutants to show, AC-3.3's drive decides whether to carry, replace or remove from this table computed over the
    input's text, never from the editor's state. A drive that reads the editor would write a wrong carry back as the same text.
  - **Human-observable form.** In the editor, `> a`, Enter, `b` draws `b` inside the quote in the preview, and a paste of
    `> a⏎b` draws `b` outside it. Walked before release on UAT's local build (AC-6.3's provision step), and checkable in
    production after deploy.
  - **Residue.** Three things are not read from Discord, and no criterion rests on them, because D-22 decides the site's text:
    - the raw text Discord saves after a continued line, inferred by QA's walk from rendering only;
    - what Discord does when `> ` is typed onto a continued line (his option text accepted this as unchecked);
    - what Discord does on Enter in a `>>>` block.
    A REST read of the two test messages is therefore not owed.
  - **The held-out lists (CR-7's exit check, R-30).** implementer-019 measured in a `2e36107` export that a split carrying no
    prefix makes all 194 `MOUNTED_BASE_RED` inputs (388 typed and pasted cases) write exactly what was entered. So the carry is
    their one cause (`verification/019/impl/m6-mounted-holdouts-before-2e36107.json`,
    `m6-mounted-holdouts-split-carries-no-prefix-2e36107.json`). Under this table, each of the 194 passes AC-3.3 with the drive
    above, and CR-7's exit check stands unchanged: M6 does not exit while a hold-out is in `src`. The 346-entry
    `EDITS_BASE_RED` list is deleted at `8cb4d83`, with 15,480 of 15,480 edits passing (the implementer's account, not
    re-derived). An edit in that differential that inserts a line break into a `> ` quote line has, as its expected text, the
    string edit with `> ` after the break, taken from this table.
- **AC-6.8 One keystroke's normalise cost (D-23, revisions 16 to 19; CR-20).** The editor's emoji resolve after one keystroke
  works per run unit, not per line. Two limbs.
  - **Count (the standing instrument, in `pnpm test`).**
    - **The keystroke class:**
      - inserting one character that completes no emoji and no fence (the implementer names it, for example `x`);
      - deleting one character backward and forward;
      - Enter.
      Each runs at a line's start, middle and end; on a one-character line, at start and end (F-45). The class includes one
      keystroke that leaves two changed run units: Enter in the middle of a code line in a fence, `a⏎```⏎xy⏎```⏎b` with Enter
      after `x` (QA's NM-72 fixture, P-Q23, record `e74108e`).
    - **The text class:**
      - plain, `> ` quote and `>>>` texts of 200, 400, 1,000 and 2,048 one-character lines;
      - fenced-quote texts of 200 and 2,048 lines, a quote whose lines open and close code fences (revision 20, steering block
        07:42Z). They repeat the four lines `> ```⏎> x⏎> ```⏎> y`, so both sizes close every fence they open (50 and 512 repeats).
        The keystroke falls on a `> x` line, the fenced line inside the quote, at the same line index at both sizes;
      - `a🙂` texts of 200 and 1,000 lines in the embed description (1,000 lines is 3,999 characters), so that every line holds
        an emoji element (QAF-44). 2,048 lines of `a🙂` exceed the description's 4,096.
    - **The window is every `Editor.normalize` drain the keystroke runs** (revision 19, steering block 07:21Z; CF-27, F-48).
      The count is the total of run-unit builds over those drains. The implementation document records the `normalizeNode`
      calls per keystroke kind as an observation, not an assertion.
    - **The property: size-independent (revision 19).** No per-kind literal is asserted. For each sized text, keystroke kind and
      position, the count on the 200-line size equals the count on the 2,048-line size (on the 1,000-line size for `a🙂`), and
      it is at least 1.
    - **No upper bound is asserted** (revision 20, steering block 07:42Z). A bound on the corpus and generator inputs has no
      basis independent of this editor: the only one to hand was a plain-slate probe, which the editor's own retyping exceeds.
      Its measured maximum is the fixed code's own figure, which axiom E bars. A bound on short inputs also does not test growth.
      The corpus and generator inputs are outside the count limb (residue, below).
    - **Observed through a `vi.mock` pass-through of `./runUnit`** (CF-25), never through a counter added to `src`. A positive
      control in the same run, an in-line insert in a one-line text, counts at least 1 (QAF-43). So a counter that reads 0 fails.
    - **Every bound is a literal or a cross-size equality**, never derived from the production unit function (axiom E).
    - **Seen red** on the tip's per-line rebuild at `119471f` (`withNormalizeNode.ts:resolveEmoji` called once per line), which
      is the decision-only tree for this limb. There the count grows with the line count, so the 200-line and 2,048-line counts
      differ. The fenced-quote texts are seen red there too, by the same differing counts.
  - **Residue (F-45; SL-19).** These keystrokes are outside the count limb, and AC-6.5's typed-edit property holds them:
    - a keystroke whose character completes an emoji or a fence (`:` after `:smile`, or a third backtick);
    - a delete that removes or completes a fence delimiter or an emoji, such as a Backspace at the start of a closing fence. QA
      read that one joining two units with its merged line visited twice (P-Q23, record `e74108e`).
    - The code-fence and `>>>` keystrokes among these are bounded by AC-6.9 (revision 21).
  - **Time (a timed case, outside the standing suite).**
    - **Home (CF-26):** a `*.bench.ts` beside the code, run by `vitest bench`. `pnpm test`'s `*.test.ts` include leaves it out by
      name, so a later chain can re-run it. How it runs under the config's projects is QA's to read at Phase 2.
    - **The property:** the median wall time of one keystroke's normalise, over 50 keystrokes in the keystroke class, is at most
      16 ms in the embed-description surface, under node on this box. That holds on each of the 200, 400, 1,000 and 2,048-line
      texts and on the 1,000-line `a🙂` text. The implementation document records the 95th percentile beside it.
    - What decides 16 ms: one display frame at 60 Hz (16.7 ms), so one keystroke's normalise does not slow typing by a visible
      frame.
    - Measured before this revision, by steering's refutation helper in exports under a `systemd-run` cap (block 07:05Z,
      Premises): the base `2e36107` takes 0.2 to 3.3 ms at every size, and the tip `119471f` takes 17 to 20 ms at 200 lines,
      66 to 72 ms at 400, 407 to 425 ms at 1,000 and 1,572 to 1,626 ms at 2,000. So the bound separates the two trees at every
      size from 200 lines up. QA's own probe agrees: 2.3 ms against 433 ms at 1,000 content lines, and 3.8 ms against 1,798 ms
      at 2,048 description lines (`verification/019/qa/m6/normalize-cost-limits-{2e36107,119471f}.json`, record `d53b1b30`).
    - The sizes are reachable, by the helper's arithmetic, not measured in an editor: content allows 2,000 characters
      (1,000 one-character lines) and the embed description 4,096 (2,048 lines), per `src/constants/messageLimits.ts`.
    - It is a time-based test (testing-patterns, "Time-Based Tests"). It runs in M6's fix round and at QA Phase 2 on M6, not in
      `pnpm test`. The count limb is the criterion's standing instrument. If the fixed tree misses 16 ms at any size, the
      measured figures go to steering before hand-off.
  - **Human-observable form.** Typing in a 2,000-line embed description on UAT's local build shows no lag a person can see.
    Checkable in production after deploy. QA's register row is B-10, and the walk is SL-15's seventh member.
  - **Residue.** The cost inside a browser is not measured, and node is the instrument. Inputs outside the text class, among
    them the 272 corpus and 1,000 generator inputs, carry no count or time bound. Growth on a construct that none of the sized
    texts holds goes uncaught by either limb. The implementation document records the per-kind distribution of builds over the
    corpus and generator inputs as an observation, not an assertion. A user report of a pause on such an input goes under
    AC-6.8's row in QA's register.

- **AC-6.9 Code-fence and `>>>` keystrokes, and pastes, settle (D-24 to D-26; revisions 21 to 23; QAF-51; CR-23; QAF-52;
  CR-25).** A keystroke that changes the type of every line below it, or a paste of many lines, settles without Slate's
  iteration error, writes its text, leaves the document a
  fresh load would build, leaves the caret where the user's next character belongs, and costs no more per line as the message
  grows.
  - **The defects, as reported.** QAF-51 (record `b7a5d9c6`): "Both trees settle at 122 lines and throw 'Could not completely
    normalize the editor after 126 iterations' from 123 lines, also at 200, 1,000 and 2,048." The helper's premise in steering's
    block 14:33Z: on opening or closing a code fence, "12 of 12 throw at each" tree, and "Opening a fence drops that keystroke's
    onChange write until the next keystroke." CR-23 (record `602344ec`): "closing a fence costs 415.7 ms at 2,048 lines" at
    `42128cd`, "whole-unit work done once per dirty line". The owner was told: "in a 200-line message, opening or closing a code
    block hits an internal editor error … when you open a block, the message's saved copy misses that one keystroke until you
    type the next one", and "closing a code block got slower" (ledger 2026-11-24 block 14:32Z, option text agent-authored).
    QAF-52 (record `225ef4a6`): after `>` makes `>>> a`, "the caret stays after the `a`, and z gives `>>> az`", where the start
    of the line's text "gives `>>> za`"; "That misplacement is a real defect". The owner was told "The release ships with the
    cursor still jumping to the end, as it does today" for the option he did not choose (ledger block 17:03Z, agent-authored).
    CR-25 HIGH (record `e92137fe`, at `85ece66`): "Closing a code fence above lines that each hold an emoji: 238 ms at 200
    lines, and **7.6 s at 1,000 lines (3,999 characters, inside the field's 4,096)**", from "whole-run or whole-document work
    repeated for every operation of a multi-operation edit"; "AC-6.9's text class fills every line with `a`, and its residue
    says inputs outside the class carry no bound."
    CR-28 HIGH (code review Round 8 sub-entry at `a7ad3f2`, record `9cb3a3da`, its plan row R-117): "A lone backtick typed at
    the end of line 0, paired with one ending the last line, throws Slate's iteration error from 100 `a🙂` lines and loses the
    keystroke, where `af3d95a` does not". CR-27 MEDIUM (same record and row): "R-111's fixed-point condition fails on 6 corpus
    keystrokes outside the members, from the suppression". For the option he did not choose, the owner was told: "The release
    ships a crash that production doesn't have, recorded for a later fix." (ledger 2026-11-25 block 05:28Z, agent-authored).
    After the corrected premise he was told, in Chrome, "The error shows once as a page error. The backtick stays in the message,
    and a reload keeps it" (ledger block 06:14Z, agent-authored; QA's walk K4, record `5a9af9be`). The write loss is a reading on
    the jsdom mounted path.
  - **The class (D-28, revision 24).** Every single keystroke whose normalise changes the state of lines other than its own,
    where state is a line's type, `quotePrefix`, fence state (`startCodeBlock`, `lang`) or emoji elements. AN-9 enumerated it
    (analysis § "AN-9 A — the member table", record `00c91e3`; captures `verification/019/analysis/an9/`). It typed and
    deleted each character that can pair across a line break (`` ` ``, `>`, `|`, `*`, `_`, `~`), and `\` before a leading
    backtick, which pairs with nothing but escapes it, at the start and the end of line 0. It ran with and without a partner on
    the last line, over `a` and `a🙂` lines at N of 5, 100, 200 and 1,000, on both surfaces at `a7ad3f2`, and once at production
    `5ec0621`. The members are the fence, `>>>` and inline-code rows below. Positions of the inline-code members other than
    line 0's start and end are held by SL-30 (D-30), not listed here. A
    character that pairs but changes only colouring (bold, italic, spoiler and strike keep emoji as emoji) is not a member,
    by AN-9's engine read (`engine-pair3.jsonl`).
  - **The keystroke class**, in full mode on the `content` and `embedDescription` surfaces:
    - making a fence delimiter: the third backtick typed at the end of a `` `` `` line;
    - unmaking one: Backspace at the end of a ```` ``` ```` line;
    - each on line 2 of the text, where it opens or removes a fence that runs to the end. Each also runs on the closing
      delimiter of a fence opened on line 2 and closed on the text's middle line, so that the lines below that delimiter
      change type;
    - making a `>>> ` quote: `>` typed at the start of line 0 when it is `>> a`, and when it is `>> abc`;
    - unmaking one: Backspace at the start of line 0's text in a loaded text whose line 0 is `>>> a`. The marker is the line's
      `quotePrefix`, not text, so this is the only Backspace that reaches it, and `onKeyDown.ts:normalizeBackspace` sets the line
      back to `div`, dropping the whole marker, as at the chain base;
    - a paste (D-26, revision 23): N lines of `a`, and N lines of `a🙂`, pasted whole through the editor's `insertData` into an
      empty `embedDescription` editor, for N of 200 and 1,000. Its caret point is the end of the pasted text;
    - inline code over the lines below (D-28, revision 24; AN-9 A1 to A6), on a text whose last line ends in a backtick:
      - a backtick typed at the end of line 0, and Backspace removing it;
      - a backtick typed at the start of line 0, with and without a space after it, and Backspace removing a leading backtick,
        in both of those start forms;
      - `\` typed before a leading backtick on line 0, and Backspace removing it.
  - **The text class:**
    - the keystroke's line, plus plain `a` lines up to N lines, for N of 40, 122, 123, 200, 1,000 (content's limit) and 2,048
      (the description's limit; on `content`, N stops at 1,000);
    - for the fence keystrokes, on `embedDescription`, the keystroke's line plus `a🙂` lines up to N lines, for N of 200 and
      1,000. The 1,000-line text is 3,999 characters, inside the description's 4,096, and every line holds an emoji element
      (revision 23, CR-25; steering block 19:43Z under D-24);
    - for the inline-code keystrokes, line 0 plus `a🙂` lines up to N lines, the last ending in a backtick: N of 5, 100, 200
      and 1,000 on `embedDescription`, and 5, 100 and 200 on `content`, whose limit a 1,000-line `a🙂` text exceeds. On plain
      `a` lines, or with no partner, AN-9 found no other line changes and no throw, so those texts are not in the class.
  - **No throw (standing, in `pnpm test`).** For every keystroke and every N, the keystroke and the normalise it runs raise no
    exception, and no timer the keystroke leaves pending raises one when run (steering's run, block 05:26Z: `Cannot resolve a
    DOM point from Slate point` after the throw). The timer clause is read on the mounted editor, where AN-9 records the timer's
    error. An unmounted reading leaves no timer to run. Seen red at the chain base `af3d95a` and at `42128cd`, at 123 lines and up for
    `>>>` and at 200 lines and up for the fence keystrokes (QA's and the helper's figures; the implementer re-runs them at
    `42128cd` before the fix, recording per member the sizes at which it throws). The inline-code members are seen red at
    `a7ad3f2` from 100 lines on both surfaces, with the timer's error on the end-of-line backtick, and not at production
    `5ec0621`, so the release added them (AN-9, `member-table-compact.txt`).
    - **Not met by hiding the throw (CF-30, revision 22).** The limb is not met by catching Slate's error, by a
      `shouldNormalize` with no finite budget, or by any change that stops `Editor.normalize` from reporting a drain that does
      not settle. A `shouldNormalize` override whose budget scales with the line count and stays finite is admitted. Code review
      reads which form the fix takes. The architect's mechanism (record `f4a9534b`): the budget is the drain's initial dirty-path
      count times 42, so a retype that dirties every line below inside the drain exceeds it.
    - **A suppressed line is a fixed point (R-111, CR-27; revision 24).** Taking a line's dirty paths out of the drain is
      admitted only where the line is already a normaliser fixed point, for every input the suppression applies to. It is read
      two ways:
      - after every member at every N, a forced `Editor.normalize` over the whole document applies no operation and raises
        nothing, counted through a pass-through spy on `editor.apply` (R-111);
      - over code review's fixed-point corpus (36,560 keystrokes over 1,285 inputs; probe and inputs under
        `verification/019/code-review/m6fix4-a7ad3f2/`), after every keystroke the document on the fixed tree equals the
        document on the same tree with the `getDirtyPaths` override made a pass-through (CF-35, revision 25). The pass-through
        tree is built from that round's own suppression. This is a differential outside the standing suite, run by code review
        and by QA at Phase 2. It needs no exemption for keystrokes the pass-through tree leaves unsettled.
      Seen red at `a7ad3f2`: 6 corpus keystrokes, where the two trees differ (`compare-fixedpoint-tip-vs-nosuppression-mutant.out.txt`),
      and after the throw on three inline-code members (AN-9: 78 to 980 operations).
  - **The write (standing).** After every keystroke, the last text `SlateEditor`'s `onChange` hands the message equals the
    expected text: the fixture's text with that keystroke applied, built by the test from its own literals, never by
    `flattenNodeText` (axiom E). Seen red at `42128cd` on the fence-opening keystroke, and at `a7ad3f2`, mounted, on the backtick
    typed at the end of line 0 over 100 `a🙂` lines and up, where the write waits for the next keystroke (AN-9; steering's run,
    block 05:26Z).
  - **A fresh load (standing).** After every keystroke, each line's type, quote prefix, fence state (`startCodeBlock`, `lang`) and
    emoji elements equal those `getInitialValue` builds from the expected text. A fix that avoids the throw by leaving lines
    untyped fails this limb. Entry condition: the implementer runs this limb at N = 40 at `42128cd`, where nothing throws,
    before writing the fix. If a load and a typing disagree there for a cause outside this criterion, the figures go to steering
    before code.
  - **The caret (standing; QA's ask, record `22a797bc`; D-25).** After every keystroke the selection is collapsed, and a `z`
    typed next lands at the point the keystroke leaves. The expected texts are written by hand from what a user expects, never
    from the editor's output (axioms D and E):
    - a fence keystroke, or an inline-code keystroke: after the typed backtick or `\`, or where the deleted character was;
    - making a `>>> ` quote: the start of the line's text, so `>> a` gives `>>> za` and `>> abc` gives `>>> zabc` on line 0;
    - unmaking it: the start of the line's text, now plain, so `>>> a` gives `za` on line 0.
    The `>>>`-making members are seen red at `af3d95a` and at `42128cd`, at 3 and 40 lines, mounted too, where the caret lands
    at the end of the line's text and gives `>>> az` and `>>> abcz` (steering's helper, effort rulings block 17:03Z; captures
    `verification/019/planning/fence-refute/caret.{af3d95a,42128cd,mounted.42128cd}.raw.txt`). The implementer's N = 40 run at
    `42128cd` cross-checks the unmaking member's text and is never its source.
  - **Work per line (standing, in `pnpm test`; revision 23, CR-25; D-26).** For each fence keystroke on the `a🙂` texts, and for
    each paste member, the number of line settles and the number of fence reads it runs, over every drain, at N = 1,000 is at
    most 10 times the number at N = 200. Basis: work linear in the lines whose type changes gives 5 times, and work repeated for every operation of the
    edit gives about 25 at `85ece66` (code review's measurement). The ratio literal is written by hand and never derived from
    the production code (axiom E).
    - **The inline-code members (D-31, revision 25; QAF-55, F-60).** Each of the six, on the `a🙂` `embedDescription` texts at
      N of 200 and 1,000, meets the same bound on its line settles over every drain: at 1,000 lines at most 10 times the count
      at 200. Basis: a settling fix re-lifts every line below the keystroke, which is linear, and production does no work
      across lines on them (AN-9: 0 other lines changed at `5ec0621`), so no timed yardstick against production applies. Not
      yet seen red: at `a7ad3f2` each member throws before the count completes. QA's Phase 2 reads it red against a planted
      per-operation settle. If the fix moves that work (CF-34), the implementer names the boundary it observes. QA records the
      tip medians with the box load as context for steering, held to no ceiling.
    - **Observed through pass-through `vi.mock`s** at the module boundaries that settle a line and read a line's fence state,
      never through a counter added to `src` (CF-25). Code review's falsity signature names `spansInLine` and `afterLine` at
      `85ece66`. If the fix moves that work, the implementer names the boundary it observes and why it holds the same work.
    - **A positive control** in the same run: one keystroke on a one-line text counts at least 1 on each observed boundary, so
      a counter that reads 0 fails.
    - **Seen red** at `85ece66`, where the ratio is about 25, failing on the count and not by a timeout. The paste members are
      seen red at `42128cd` and `85ece66` too, where their cost grows with the square of the lines: medians of 419 / 954 ms at
      200 lines and 9,773 / 25,548 ms at 1,000 (`a` / `a🙂`) at `85ece66`, against 135 / 237 and 1,695 / 2,972 ms at the base
      `af3d95a` (steering's refutation helper, effort rulings block 20:07Z, Premises).
  - **Cost (a timed case, outside the standing suite, like AC-6.8's timed limb).**
    - **The growth property (CR-23's class):** for each keystroke other than the paste members, the median at N = 2,048 is at
      most 20 times the median at N = 200. The paste members run at 200 and 1,000 lines only and are bounded by the count limb. Basis: work linear in the lines whose type changes gives about 10.2 times, and CR-23's once-per-dirty-line settle
      gives about 100 times.
    - **The fence keystrokes' ceiling, on line 2:** the median is at most 27 ms at N = 200 and at most 104 ms at N = 2,048
      (revision 22). Basis: the chain base `af3d95a`'s medians on the helper's probe, that shape only, are 17.4 ms (unmaking) and
      20.9 ms (making) at 200 lines, and 80.2 and 82.7 ms at 2,048 (`verification/019/planning/fence-refute/af3d95a.raw.txt`).
      The ceiling is the larger figure plus a quarter, rounded up: 26.125 gives 27, and 103.375 gives 104. That is "roughly
      today's speed" in the option he chose. The base threw part-way through, so it did less work than a settling fix must. If
      the fixed tree misses the ceiling while meeting the growth property, the figures go to steering before hand-off and are
      not a fix-round failure.
    - **The red mode (CR-22's class):** a miss fails by assertion with a non-zero exit, never by a run that idles to its timeout.
    - The implementation document records the 95th percentile and the box load beside every median.
  - **Human-observable form.** On UAT's local build, opening and closing a code block near the top of a 2,000-line embed
    description, and typing `>` to make `>>> abc` at its top, show no console error, the next character lands at the caret (at
    the start of `abc` for the quote), and a reload of the saved draft shows the keystroke. The same holds for a backtick typed at
    the end of the first line of a 200-line embed description of emoji lines whose last line ends in a backtick (D-28).
    Checkable in production after deploy. QA's walk row is B-11, SL-15's eighth member.
  - **Residue (rewritten at revision 23, CR-25).** The limbs bind the keystroke class over the text class. The sub-limb "A
    suppressed line is a fixed point" also binds code review's corpus, and SL-30 (D-30) holds the inline-code members' other
    positions before QA Phase 2 passes. Nothing else is bounded by them:
    - a paste other than the listed members: into a non-empty editor, of other fills, or on other surfaces;
    - undo and redo of any member;
    - a fill other than plain `a` and `a🙂` lines, such as mixed emoji, links or nested quotes;
    - the class's other keystrokes, as SL-26 names them;
    - repeated whole-document work an edit does without remembering it, which neither count observes (CR-25's predicate gap);
    - the timed cost of the inline-code members: the timed limbs bind the fence keystrokes, and their count is bound by the
      work-per-line limb only;
    - AN-9's gaps (G-9a to G-9e) beyond SL-30's positions: undo and redo, paste, partial mode, other fills, N between 5 and
      100, the browser's native input, and the preview render. By AN-9's code read, not run, any edit that toggles inline
      code over another line's emoji is a member wherever it is typed;
    - loads that are not a normaliser fixed point (AN-9 B1, B2). Every load in the corpus, its fixtures, AC-6.9's texts and
      AN-9's cell texts is a fixed point, but 12 texts that keystrokes produce are not. In each, a triple backtick that
      Discord's formatter does not read as a fence (escaped, or inside inline code that crosses a line) still counts as one in
      `codeFence.ts` `afterLine`. The load then types the next line as code with its emoji as text, the normaliser lifts it,
      and the engine reads it as emoji. The 8 corpus keystrokes ending in such a text with no suppression are carried by
      `handoff/slate-code-line-emoji-load-normaliser-disagree-2026-11-25.md`.
    These are not known to be bounded. CR-25 found the `a🙂` member through exactly this sentence's earlier form. A user report
    of a slow edit on one of them goes under AC-6.9's row in QA's register. The browser's cost is not measured, and node is the
    instrument.
    In a browser, where the next character lands is checked only in the walk. QA's browser look (handoff `124c6099`, row
    10:00) could not separate it from its instrument's timing, so the caret limb's standing instrument is node.

Re-derivation gate: M6 changes a stored representation (D-10's saved emoji). When it ships on the chain branch, M7, if not yet
authorised, is marked `PREMISE-STALE` until re-argued.

Rollback: revert its commits; the implementer or devops, as above. Reverting M6 alone leaves the site building, because nothing
after M4 reads `simple-markdown`. Reverting M4 or M5 after AC-6.6 has landed takes M6 with it (M4's rollback).

### M7 — Release

**`PREMISE-STALE`** (R-76). M4 changes the preview and M5 the editor, and both have shipped on the chain branch (M4 at
`e58f2ed`, M5 at `2e36107` with `cf126ea`). M7 is not implemented, reviewed or run until a plan revision adds one paragraph
re-arguing its premise against that behaviour. That paragraph is owed at the seam fold, before devops Stage 1.

The same release carries M2 to M7 (AF-2). No release tree holds M4 without M5, checked by devops at Stage 1 from the chain's commit
list.
- Name what the deploy moves: website `master` from the chain base to the tip.
- Record updates, proposed in this chain and landed by their owners:
  - The workspace `CLAUDE.md` Test Conventions (canonical `agent-output/CLAUDE.md`) gain the two-command form with its two
    `discord-*` projects (CF-8), the definition of offline, D-12's rule that `pnpm test:discord` runs at every website release gate
    and every pin change, with devops at Stage 1 as the runner at a later release, and the outcome table's later-release column,
    which holds no release (CF-3, F-2, F-24, F-28). The sentence "runs the whole suite" changes with them. The
    implementer proposes the text in its implementation document at M3, and steering lands it in the record at release.
  - The architect's closing pass: the Problem Area rows (Header notes), the Dependencies line, and the Quality Attributes "Tests"
    line.
- The tip-moving housekeeping lands in one commit before QA Phase 3.

## Testing Strategy

The binding standard is the workspace `CLAUDE.md` § Test Conventions (`agent-output/CLAUDE.md`), axioms A to E included.
- **Test types**: unit tests (Node) for the adapter's maps, masks and allow-list; DOM tests for the renderers and the mounted editor;
  property tests over the generator; the `discord` project (D-12); and real-browser walks by UAT on a local production build.
- **Hosts and instruments**: this box has Chrome through the browser-walker, Playwright Firefox, and the test-account browser (qa and
  uat). Puppeteer at the generator's pin runs in an export. Discord's oracle code (the legacy facade, both box tables, the native
  box) runs under Node in jsdom (AN-4), with no browser. Discord reads use the test-account browser on guild
  `1566742402180456559`. There is no WebKit (X-17).
- **Probe versus gate**: AN-1 to AN-8 are pre-landing probes. AC-2.5, AC-4.2, AC-5.5 and AC-6.3 are post-landing walks (QA
  register B-1 to B-4).
- **Tools changed by this chain and used by its own gates**: the normaliser (M3), in its loose canonical form and its visible form,
  each with its positive controls and second instrument as stated there. The `test` script itself changes: QA Phase 2 runs the chain base's `vitest run` beside the tip's two commands, and
  compares the files collected by path membership.
- **Post-deploy observable** (his link report, D-2; QA register B-5). On production `hooks.gg`, in the route-0 editor, typing
  `https://x.y🙂 [a](https://x.y/🙂)` gives two preview anchors. Each must exist, and neither `href` contains `:slight_smile`. QA read
  production at 2026-11-23T16:00Z and found the hrefs `https://x.y:slight_smile` and `https://x.y/:slight_smile:` (QA document,
  B-5). Its reader is the carrier devops's Stage 1 creates, never Stage 1 itself (F-15).
- **RK-2's post-release read**: a generated preview image of a formatted message is QA's candidate E-4. QA mints it or declines it at
  the re-key after AN-2 lands. Until then, no stage reads a generated image after release (X-21).

## Validation

- The release-move dry run and report at `af3d95a`: exit 0, both (Header notes, revision 0's pass). Devops re-runs both at the tip.
- P-1's probe: exit 0, output captured.
- The suite baseline at `af3d95a`, from QA Phase 1 (`qa/019-slate-formatting-discord-engine-qa.md`, run 2026-11-23): `pnpm test`
  in a loopback-only namespace gives 2696 of 2696, exit 0, 172 files. It is re-read at the chain base by the base re-derivation step.

## Risks

- **RK-1** The wasm does not build or serve under Turbopack (AF-5). Falsifier: AN-1, which passed locally and on a Vercel Preview.
  What remains open is production's build, read at release.
- **RK-2** The generator captures `/preview` before the formatted render (P-2). AN-2 passed 150 of 150, with a minimum margin of
  519.7 ms on this box. Open: a slower host CPU (analysis H-1). Its test, a 4× CPU-throttled re-run of `an2-capture.js`, is AN-8's
fifth limb (QAF-22). After
  release, X-21 applies until QA mints E-4.
- **RK-3** The package's tree shape changes between releases (V-12). The exact pin, the adapter and AC-2.4's two enumerators
  catch it: the type-check catches declared kinds, and the observed enumerator plus the unmapped-kind line catch undeclared ones.
- **RK-4** Users on Discord's legacy path see the disagreeing cases drawn differently from the site (V-18: 33 of the 272 stored
  texts; D-6's option text). This is accepted, and the known-differences report lists them.
- **RK-5** Stored messages' preview images change on regeneration wherever the old rules differed from Discord (V-10). The stored
  corpus is unread (`handoff/bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md` item 7 shares the class). This is accepted
  under D-3.
- **RK-6** The oracle fetch breaks: Discord changes its page or blocks headless clients. The outcome table's C1 and C3 cover it.
- **RK-7** Bundle cost on mobile: the lazily loaded wasm is 459,029 bytes served gzip locally and 447,426 bytes br on Vercel
  (AN-1). The editor page also pays it (analysis I-2). Accepted, since D-6's option text named the build check, and X-22 carries
  the hung-fetch case.
- **RK-8 (standing prediction, the critic's class, cycle 1 pass 1).** The class: "a statement in M2 to M6 of what the site does
  today (a loading state, an editor mode, a refusal, an input the block layer supplies, a build target) is contradicted by the code
  at the base or by a closed plan." Falsifier: a later pass or stage finds one more member. The members so far are F-3, F-8, F-9 and
  F-11, each folded in revision 2 by a premise read at `af3d95a` (P-4, P-5, P-6, AN-1's Vercel limb). Record per review pass:
  - pass 1: four members;
  - pass 2: none (critique record `e3e49ac7`, § Verdict, "RK-8, the class from pass 1: no new member in pass 2");
  - planning pass 3: one member, found by this pass's read of `src/@types/slate.d.ts` at `af3d95a`. AC-5.2 said mentions and
    timestamps divide a line into text nodes, but the emoji element is the only inline element (P-7). It is folded into AC-5.2;
  - critique cycles 1 (passes 3 to 5) and 2: none recorded by the critic;
  - critique cycle 3 pass 1: one member, F-33 (record `683f3e9`). Revision 8's AC-4.7 called `ja-JP` "a tag the site has no file
    for", but `src/utils/loadLocales.ts` at `af3d95a` imports `dayjs/locale/ja`. It is folded at revision 9 (`vi-VN`). Other
    members found outside the critic's passes: revision 7's "the picker already omits `R`" (steering, block 17:58Z), corrected at
    revision 8.
- **RK-9 (D-14's unmeasured residue).** On the legacy-only surfaces, the visible residue left after adjustment is large enough that
  embed previews differ visibly from Discord on ordinary inputs. Falsifier: M3's residue count per surface, before and after
  adjustment, recorded at M3 and M4. The architect's provisional reading of research Appendix A puts the token-level classes
  (unbalanced delimiters, backtick runs, escapes) in the listed set. Accepted under D-14, which stated the count was unmeasured.
  Fire condition and route (CF-19): it fires once at M4, when the after-adjustment count exists. Steering then puts him the per
  surface counts over the 272 corpus and over all inputs, the figure D-14 left unmeasured. D-14's reopening class is owner
  withdrawal, so whether the count is too large is his to judge; no threshold is set for him. It fires again if QA at Phase 2,
  or a later chain's re-measure, reads a count above M4's on any surface, and it routes to steering the same way. A planted
  re-measure is not a firing.
  Record per review pass: before adjustment, over the atom-free inputs only, 37% differ on the description, field value and V2
  text display, 53% on the title, and 23% on the title with an embed url (critique cycle 5 pass 1, record `08caeb87`). The 272
  corpus members among them are 37, 33, 53, 35 and 37, close to AN-3's 37, 32, 54, 37 and 37. Nothing is re-raised.

## Exclusions

| Exclusion | Reason | Carrier |
|---|---|---|
| X-1 The fence-loop and blockquote defects (inventory X-1, X-2) | Chain 9c+9f, released at `af3d95a`. | `deployment/fix-normalize-fence-loop-deployment.md` |
| X-2 S-11 (draft after a typed-back edit) | Draft state, not formatting (block 09:18Z). | `handoff/typed-back-edit-leaves-saved-message-draft-2026-11-21.md`, whose "website editing effort is scoped" trigger fires on this plan and is dispositioned here. |
| X-3 S-12 | Same block. | `handoff/fix-desktop-draft-as-typed-residue-2026-11-21.md` |
| X-4 S-15 | Held for his decision (block 09:18Z). | `handoff/website-018-standing-risks-save-toast-and-lint-stack-2026-11-20.md` RK-3 |
| X-5 S-16 | Already a fixer rider (block 09:18Z). | The fixer queue in `steering/fixer-queue-2026-11-21-rulings.md` block 09:18Z |
| X-6 9e and the `/preview` matcher | Outside the region. | `TODO.md` |
| X-7 S-19 to S-28 | Fixed; their tests stand. | Stated limit (inventory § 1) |
| X-9 Slate block structure from `parseLossless` | A later effort (AF-9). | `system-architecture.md` Problem Areas row |
| X-10 Third-party clients | D-9. | Research G-6 |
| X-11 Generator-side changes | Outside the region. AN-2 passed, so none is needed for the formatted render. The analysis's H-2 (a pooled browser's repeated `/preview` returns 304, which the generator's status check may refuse) is generator-side, and the analyst sent it to steering. | Re-scope to steering |
| X-12 Open handoffs whose trigger this chain fires but that have nothing in the region: the tRPC leftovers (fire on the `package.json` dependency edit); the `qa-014-bc7` inventory (fires on "website test effort scoped"; its items are the analyst's and the record's); the 015 assumptions (fire on "next website effort scoped"; items 1 and 7 are used here as premise and risk) | Nothing in the region. | Each handoff, unchanged |
| X-13 The native parser seen rendered (G-11) | AN-7 did not complete it: no session's browser holds test account 2's profile. Under D-5 it decides nothing; the native half rests on research V-4's byte identity. | Stated limit |
| X-14 Mention kinds with no Discord observation: how Discord draws a game mention whose id it cannot resolve (AN-8 read only a resolved one, drawn as a pill with the game's name and icon), and any kind beyond AN-7's walk | Discord draws an id it cannot resolve as text (V-18); the unresolved game form is unread. | Stated limit at AC-4.4; a user report goes to this row |
| X-17 Safari | No WebKit on the box (QAF-10). | Stated limit; a user report goes to this row |
| X-18 The engine's differences from Discord on content's disagree class | D-5 removes Discord as the standard there; nothing detects them. | The known-differences report |
| X-19 AC-3.1, AC-3.2 and AC-3.7 residue: rendering beyond the tree (emoji image choice, highlight colours, locale wording; research § 4 gap 4); inputs the API rewrites (whole-message edge whitespace, unusable custom emoji ids; V-19); what the loose form blurs (run-edge and code-body newlines, URL spelling); what the visible form treats as invisible (M3); box inputs replaced by an inline object (V-21, P-7); the native box's unclosed-fence-while-typing parse, where the Slate layer's `codeBlock` recognition governs instead (AN-6, AF-9) | No Discord oracle reaches them, or the Slate layer is the site's own. | Stated limit |
| X-20 Production messages already rewritten from `>>>` to `> ` | Production data, his (effort block 15:49Z). | His check, per that block |
| X-21 No post-release read of a generated preview image | QA declined E-4 at its re-key on revision 3 (record `24d537bf`): one post-deploy image cannot refute a race AN-2 sampled 150 times, and a fresh production image needs a production save no stage is cleared to make. | Stated limit; RK-2's pre-landing reads (AN-2, AN-8's fifth limb) |
| X-22 A wasm fetch that hangs rather than fails leaves the message editor hidden with no message (QAF-15) | Today's behaviour on a hung JavaScript chunk, kept by M2's pending state. A timeout bound is priced in M2 and not taken. | Stated limit. B-1's Slow 4G reading is recorded beside it, and a user report goes to this row |
| X-23 Legacy-only residue classes that fail the B3 rule | D-14: "the rest are listed". The site follows the engine there, and the embed preview differs visibly from Discord on those inputs. | The known-differences report, per surface; RK-9 |
| X-25 The jumbo-emoji rule, where neither AN-7's reads nor the corpus show Discord's rule for a case | No Discord observation for that case (CF-10). | Stated limit at M4's emoji display helper; a user report goes to this row |
| X-26 A move of the embed or V2 surfaces to the native formatter that keeps the legacy calls and adds no reference to the switch in those modules | AC-3.8's (i) and (i′) cannot see it; the critique's pass 3 assumption names it. | Stated limit at AC-3.8; a user report goes to this row |

## Finding disposition (revision 9)

Revision 8's verdicts: critic `683f3e9` (APPROVED; F-33 with SL-10), architect `e1e6f363` (APPROVED; CF-15), QA `5ca68b07`
(QAF-28, a severity floor). All three name one member: revision 8's `ja-JP` fixture is a locale the site loads. Revision 9 changes
AC-4.7's locale sentence and that fixture only, under steering's block 18:02Z:

| Source | Item | Folded at |
|---|---|---|
| QA `5ca68b07`; critique `683f3e9`; architect `e1e6f363` | QAF-28; F-33 / SL-10; CF-15 | AC-4.7: the unloaded tag is `vi-VN`; the site's locale files are loaded; the tag is supplied through react-aria |
| Critique `683f3e9` | RK-8 record | RK-8: cycle 3 pass 1, one member |
| Critique `683f3e9` | Assumption (`dayjs.locale()` at render) | Planner batch, open for the M4 implementer |
| Ruling, block 18:02Z | AC-4.7 decided by steering after revision 9 | Decisions Register note |

## Finding disposition (revision 8)

Revision 7's verdicts: critic `16ca70fe` (APPROVED, closed), architect `6a669d8` (APPROVED for M4 and M6 under steering's cap),
QA `c6fa2e26` (QAF-26, QAF-27). Revision 8 changes AC-4.7 only, and registers D-16:

| Source | Item | Folded at |
|---|---|---|
| QA `c6fa2e26` | QAF-26 (MEDIUM, a severity floor; excepted from the cap) | AC-4.7 "What the test sets": one fixture and one mutant per branch |
| QA `c6fa2e26` | QAF-26 (iii), with architect CF-14 | AC-4.7 "Locale": `dayjs.locale()`, the resolved locale, never the tag |
| QA `c6fa2e26` | QAF-27 (LOW) | Planner batch, a stated limit under the cap |
| Ruling, block 17:58Z | D-16 (the picker) | Decisions Register; AC-4.7's picker line, with `R`'s button corrected in |

## Finding disposition (revision 7)

All three gates read revision 6: critic `8b596f83` (APPROVED; F-32), architect `93708612` (APPROVED_WITH_CHANGES; CF-13), QA
`b5985b20` (QAF-24, QAF-25). Revision 7 folds:

| Source | Item | Folded at |
|---|---|---|
| Critique cycle 2 pass 1 | F-32 | AC-4.7: `s` and `S` a marked deviation from `TIMESTAMP_TO_DAYJS_FORMAT`, with dayjs's output beside Discord's |
| Critique cycle 2 pass 1 | Assumption (the heading bit) | AC-6.5: `0x02000000` is `Syntax.HEADING`, read and measured |
| Architect `93708612` | CF-13 | AC-4.7, option (a): UTC before mount, `LoadLocale`'s locale; the picker unchanged |
| QA `b5985b20` | QAF-24 | AC-6.5: the helper's mask control, url-variant link fixtures and NM-44 |
| QA `b5985b20` | QAF-25 | AC-4.7: the test sets locale and zone, plus an `America/New_York` case |
| QA `b5985b20` | AC-2.3 re-checked (0 of 248 cells) | No change; the `GAME_MENTION` bits are released |

## Finding disposition (revision 6)

All three pre-code gates approved revision 5: critic `944e53f6` (cycle 1 closed), architect `681ae51`, QA `d060162`. Revision 6
folds AN-8 and the four Planner batch rows parked at that approval:

| Source | Item | Folded at |
|---|---|---|
| Analysis `db8199aa` | AN-8 limb 1 (`s`, `S`) | AC-4.7; X-24 withdrawn; M1 results |
| Analysis `db8199aa`, `3681654e` | AN-8 limbs 2 and 2b (game mentions) | AC-2.3's table; M4's mask line; X-14; M1 results |
| Analysis `db8199aa` | AN-8 limb 3 (sign-in) | AC-6.3's provision step |
| Analysis `db8199aa` | AN-8 limb 4 (`pageerror`) | M1 results; it stays devops's at Stage 1 |
| Critique pass 4 | F-31 | Settled by limb 2b; Planner batch discharged |
| Architect `681ae51` | CF-12 | AC-6.5 "Expected value", the box and helper split by surface |
| QA `d060162` | EC-7 | AC-6.5 "Entry conditions at M6" |
| Critique pass 5 | Assumption (the box exposes its spans) | AC-6.5 "Entry conditions at M6" |
| This pass | Content's game mentions | Agree class, not disagree (limb 2); M4's mask line |

## Finding disposition (revision 5)

Revision 4's folds were checked by their gates, and each approved it: critique pass 4 (`faa1b319`: F-27 to F-30, SL-8 and SL-9
resolved), architect (`a5f78f83`: CF-9 and CF-10 folded as found), and QA (`cf895cd`, link fix `61e58f7`: QAF-18 to QAF-22 and
E-4 check out). Revision 5 folds:

| Source | Item | Folded at |
|---|---|---|
| Architect `a5f78f83` | CF-11 | AC-6.5 "Expected value": module 818948's own join, with the helper as a positive control |
| QA `cf895cd` | QAF-23 | AC-6.5 "Property, typed edits": emoji edits over the 1,662 probe, inside AC-3.3's 60 s cap |
| QA `cf895cd` | AC-2.3's literals | AC-2.3's mask table, six values |
| Critique pass 4 | F-31 | Planner batch row; M4's mask line marks the premise not established |
| Critique pass 4 | Assumption (box JavaScript under drift) | M3 "Which wasm": under drift the live native-box limbs hold no gate |
| This pass | "Seven masks" | Corrected to six (title and field name share one, with and without an embed url); M2, AC-2.3, AC-4.6, the AN-3 results row |

Revision 4's folds, for reference:

| Source | Item | Folded at |
|---|---|---|
| Critique pass 3 | F-27 | M3 "Which wasm the native box runs on"; outcome row C2; AC-3.2 |
| Critique pass 3 | F-28 | Outcome row C1's later-release cell; M3 "Who runs it" (devops at Stage 1); the paragraph under the table; M7 |
| Critique pass 3 | F-29, SL-8 | AC-3.7's frozen residue list; AC-3.8 (ii)'s empty-adjustment clause |
| Critique pass 3 | F-30 | D-4's and D-5's consequence cells re-aimed |
| Critique pass 3 | SL-9 | Reading Order, code-reviewer row (M3 and M4 added) |
| Critique pass 3 | Assumption (the switch reference) | AC-3.8 (i′); X-26 |
| Architect `48e51d92` | CF-9 | AC-6.5, "Re-deciding on edit" and "Property, typed edits" |
| Architect `48e51d92` | CF-10 | M4's emoji display helper; AC-6.5's reader list (`common.ts`); X-25 |
| QA `24d537bf` | QAF-18 | As F-27 (one fold) |
| QA `24d537bf` | QAF-19 | As F-29 (one fold): an input is excused only by a matching signature |
| QA `24d537bf` | QAF-20 | AC-4.7, `R` under a fixed clock |
| QA `24d537bf` | QAF-21 | AC-6.5, "Expected value" |
| QA `24d537bf` | QAF-22 | AN-8's fifth limb; RK-2 |
| QA `24d537bf` | GAME_MENTION mask cells (8 of 248) | M4's mask line; AC-2.3 |
| QA `24d537bf` | E-4 declined | X-21 stands final |

## Planner batch

| Item | Source row | Disposition |
|---|---|---|
| G-14: which legacy parser state (`allowEmojiLinks`, a message's `webhookId`, research § 3 step 1, module 354777) AC-3.1's oracle runs under, so an emoji inside a masked-link label on a webhook-sent message has the expected value Discord draws; with the research corpus now in its Appendix C as M3's source | `research/closed/slate-formatting-discord-oracle-2026-11-23.md` Remaining gaps row G-14 (record `a666dbd9`); `INBOX.md` last entry, researcher-slate-formatting-oracle FYI | Discharged at revision 1 into AN-4, AN-7 and AC-3.1; corpus source in M3. |
| F-31 (LOW): M4's mask line clears `GAME_MENTION` on the five legacy-only surfaces on a premise AN-3 marks not established. Landing trigger: the planning pass that folds AN-8's GAME_MENTION limb. That pass either confirms the premise from the written form, or re-derives the mask line and AC-2.3's five values | `critiques/019-slate-formatting-discord-engine-critique.md` F-31, cycle 1 pass 4 (record `faa1b319`) | Discharged at revision 6. The premise held for the title and field name only (AN-8 limb 2b, record `3681654e`). AC-2.3 and M4's mask line keep `GAME_MENTION` set on the description, the field value and the V2 text display. |
| CF-12 (LOW): module 818948 is Discord's message box and parses under content's mask, while AC-6.5 runs under each surface's mask, so on the title, field name and field value its emoji spans can be the wrong expected value. A miss shows as red, not a false pass. The fold states either that 818948 takes a flags argument and runs per surface, or that it covers content and every surface whose mask matches content's on the emoji-relevant bits, with the other surfaces on the helper's join under AN-3's literal masks and the content run as its positive control. Whether 818948 takes flags is unread on this box | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 5" (record `681ae51`) | Discharged at revision 6 into AC-6.5 "Expected value", in the second form: the box for content and the surfaces matching it on emoji-relevant bits, the helper for title and field name. |
| EC-7 (QA entry condition): AC-6.5's lift reads the adapter's `parseLossless` emoji nodes, while its expected spans are what native box 818948 lifts, and nobody has measured whether the two sets agree. Before AC-6.5's literals freeze at M6, the implementer runs both over the 272 corpus and the 1,662 probe and records how many inputs differ. On any member the plan states which the lift follows, and a choice that changes what D-13's option described goes to him through steering | `qa/019-slate-formatting-discord-engine-qa.md` § Re-key on Revision 5 (record `d060162`) | Discharged at revision 6 into AC-6.5 "Entry conditions at M6". |
| Critique pass 5 assumption: a run of module 818948 exposes the emoji spans of its own parse, which is AC-6.5's expected value. Untested; AN-6's table shows an emoji as an `atom` | `critiques/closed/019-slate-formatting-discord-engine-critique.md`, cycle 1 pass 5 (record `944e53f6`) | Discharged at revision 6 into AC-6.5 "Entry conditions at M6"; a miss at M3 comes back to the planner before M6. |
| F-32 (LOW): AC-4.7 writes `s` and `S` as `Intl.DateTimeFormat` option sets, while the six sibling styles are entries of `TIMESTAMP_TO_DAYJS_FORMAT` (`website@af3d95a src/utils/markdown/components/MarkdownTimestamp.tsx`, formatted by dayjs), and the plan neither cites the sibling nor marks the departure. Read this pass (`verification/019/planning/timestamp-s-S-dayjs-vs-intl.txt`): dayjs's localized tokens give `11/14/2023 10:13 PM` and `11/14/2023 10:13:20 PM` (`L LT`, `L LTS`; four-digit year, no comma), while `Intl` reproduces Discord's drawn `11/14/23, 10:13 PM` and `11/14/23, 10:13:20 PM` exactly. So the fold marks `s` and `S` a deviation from the sibling table with that reason. The six existing entries keep dayjs. A custom dayjs string such as `M/D/YY, h:mm A` would match en-US only, and is not taken | `critiques/019-slate-formatting-discord-engine-critique.md` F-32, cycle 2 pass 1 (record `8b596f83`) | Discharged at revision 7 into AC-4.7, as a marked deviation with its reason. |
| CF-13 (LOW): AC-4.7's `s` and `S` say "in the viewer's locale and time zone", while the sibling formats in UTC before mount (`website@af3d95a src/utils/markdown/components/MarkdownTimestamp.tsx`: `if (!state.mounted) date = date.utc()`) and takes its locale from `dayjs.locale`, which `src/components/LoadLocale.tsx` sets. The fold takes the architect's option (a), following the pattern: `s` and `S` pass `timeZone: 'UTC'` to `Intl` while `state.mounted` is false, and the locale `LoadLocale` hands dayjs. Only the formatter departs (F-32's reason). The picker offers seven styles, the six table keys (line 105 at `af3d95a`) and a separate `R` button (lines 115-122). It stays as it is and does not list `s` or `S`, as he chose (D-16). The registration first said the picker "already omits `R`", which was wrong (steering, block 17:58Z) | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 6" (record `93708612`) | Discharged at revision 7 into AC-4.7, option (a). The picker choice is flagged to steering as his to overturn. |
| Critique cycle 2 pass 1 assumption: `0x02000000` is the heading bit (AC-6.5 calls it an inference) | `critiques/019-slate-formatting-discord-engine-critique.md`, cycle 2 pass 1 (record `8b596f83`) | Read this pass: `Syntax.HEADING` is `0x2000000` at `@discord/markdown-wasm@0.16.0` (`verification/019/planning/syntax-bits-0.16.0.txt`, run). The architect read the same in `markdown-types` 0.14.0 `syntax.js` (`1<<25`), and measured that the heading bit moves no emoji span: 0 of 50,012 inputs on the pinned wasm, against 494 under a CODE-cleared control (`verification/019/architect-conformance/rev6/`, record `93708612`). Discharged at revision 7: AC-6.5 cites these reads in place of the inference. |
| CF-14 (LOW): AC-4.7's "the locale `LoadLocale.tsx` sets for dayjs" names two values. `LoadLocale` passes react-aria's tag, but the dayjs locale in effect differs: `en-US` becomes `en`, and a tag with no file in `loadLocales.ts` leaves dayjs at `en` (run on dayjs 1.11.7). So for `vi-VN`, `cs-CZ` or `da-DK` the six sibling styles render in English, while `Intl` given react-aria's tag renders `s` and `S` in the viewer's language. Under `vi-VN`, `s` gives `22:13 14/11/23` beside the siblings' `10:13 PM`. The fold: AC-4.7 passes `Intl` the value of `dayjs.locale()` read at render (or the instance's `.locale()`), and adds a test case under a tag the site has no file for (`vi-VN`) asserting the `en` form. QAF-25's `America/New_York` case states `state.mounted` true: unmounted it is `10:13 PM`, under the UTC rule | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 7" (record `27f61730`; captures `verification/019/architect-conformance/rev7/`) | Discharged at revision 8 into AC-4.7. QAF-26, a severity-floor finding excepted from the cap, required the locale to be named in the text, so the same edit carries CF-14's two points. |
| QAF-27 (LOW): add `<t:1700000000:s> <t:1700000000:f>` to AC-4.3's class, editing the `f`. Today two `[tTdDfFR]` regexes skip `s`, so any copy left in the edit path would rewrite the wrong timestamp. AC-4.3's span design passes it by construction | `qa/019-slate-formatting-discord-engine-qa.md` § Re-key on Revision 7 (record `c6fa2e26`) | Stated limit under the revision cap on M4 (block 17:56Z); no revision round. The member is written here for the implementer and QA Phase 2 to add to AC-4.3's class. A user report of the wrong timestamp edited beside an `s` goes to this row. |
| CF-15 (LOW): AC-4.7's "unloaded tag" fixture is `ja-JP`, but `website@af3d95a src/utils/loadLocales.ts` imports `dayjs/locale/ja` (one of its 29 dayjs locale imports, `grep -c`, read this pass; `vi` is not among them). With the site's locale files loaded, `ja-JP` resolves to `ja`, and `s` reads `2023/11/14 22:13`, the same string as the tag-passing mutant. QA's P-Q18 ran without those files, so it saw `en`. The planner's error, in revision 8's text | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 8" (record `e1e6f363`; `verification/019/architect-conformance/rev8/ja-resolution.out`) | Stated limit under the revision cap on M4 (block 17:56Z); not a severity floor, since the case fails loudly either way. For the implementer and QA Phase 2: the unloaded-tag case uses `vi-VN`, which has no file in `loadLocales.ts`, and the test loads the site's locale files as production does. Under that setup `vi-VN` resolves to `en`, so `s` reads `11/14/23, 10:13 PM`, while the tag-passing mutant gives `22:13 14/11/23`. AC-4.7's `ja-JP` line is read as `vi-VN` under this row. QA then classed the same fault QAF-28 MEDIUM, a severity floor: with `ja-JP` the tag mutant survives. So it was excepted from the cap, and the row is discharged at revision 9 into AC-4.7's text. |
| QAF-28 (MEDIUM, a severity floor; excepted from the cap): change AC-4.7's unloaded-tag fixture from `ja-JP` to `vi-VN`, which has no dayjs file, expecting `11/14/23, 10:13 PM`. The tag-passing mutant renders `22:13 14/11/23` and is red on it. The test supplies the tag where `LoadLocale` reads it (react-aria's locale), never by calling `dayjs.locale` directly, or the mutant has no tag to pass. `cs-CZ` and `da-DK` also serve. QA's P-Q18 carries a dated reconcile: its probe loaded only `de` and `en-gb`. The corrected probe is P-Q19, `verification/019/qa/probe-r8-timestamp-locale.out` | `qa/019-slate-formatting-discord-engine-qa.md` § Re-key on Revision 8 (record `5ca68b07`) | Discharged at revision 9 into AC-4.7, with CF-15 and the critic's F-33 / SL-10 (one member, three gates). |
| CF-16 (LOW): AC-4.7's `vi-VN` fixture's expected value depends on test order, because dayjs's locale is process-global. A case that ran earlier and set another loaded locale (for example `en-GB`) leaves it in effect | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 9" (record `559253f1`); decided by steering, effort rulings block "2026-11-23T18:06Z" (record `e8386c2c`) | Stated limit, no revision (steering's decision under block 18:02Z). Carried to the M4 implementer with the architect's remedy: the `vi-VN` case resets dayjs to `en` first, or runs in its own test module. |
| CF-17 (LOW): AC-4.4 says the channel lookup must not need the provider, but does not say how the list reaches the renderer. Today `src/utils/markdown` imports no provider, and per-surface context travels in the parser state (`simple-markdown.d.ts` `State`: `mounted`, `isEmbed`, `onChange`, supplied by `Markdown.tsx`) | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 10" (record `b8d11f1b`) | Stated limit under the revision cap on M4 (block 17:56Z), with no revision round. For the M4 implementer and code review, the architect's form: the list, or a `channelName(id)` function, travels in that state and then in `preview.tsx`'s `Ctx`, the same path AC-4.7's `mounted` and AC-4.3's `onChange` need. A surface supplies it from one read that does not throw: a second `GuildProvider` export, `use(Context)`, which returns null outside `<Guild />`. `Context`'s default is not changed, because `useGuild`'s eight calling files rely on its throw. `/preview` supplies nothing and renders today's form. The alternative, a renderer under `src/utils/markdown` reading the guild context itself, would be that directory's first provider import; it is a deviation for code review to weigh. |
| F-34 (LOW) with SL-11: AC-4.4's residue says forum ids are not on the channel list, but they are. `TEXT_CHANNEL_TYPES` is `[0, 5, 15]` and `FORUM_CHANNEL_TYPE` is 15 (`website@5ec0621 src/constants/index.ts`), so `fetchChannels` keeps forum channels, and their active posts arrive as `threads`. The error is mine, in revision 10's text. It is one more member of RK-8's class. QA found the same member separately as QAF-31 LOW, and read it in `verification/019/qa/probe-r10-mention-premises.out` | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-34, cycle 4 pass 1 (record `71b981ad`); `qa/019-slate-formatting-discord-engine-qa.md` QAF-31, § Re-key on Revision 10 (record `f79d7f77`) | Stated limit SL-11 under the M4 cap (block 17:56Z), with no revision round. For the M4 implementer and QA Phase 2: the residue sentence reads "category ids, archived thread ids, and ids of channel types outside `[0, 5, 15, 2, 13]`". A forum id on the list renders its name under row 1. List membership comes from `fetchChannels`' filter, never from the sentence. At the seam fold, the sentence takes this reading and RK-8's record gains the line "critique cycle 4 pass 1: one member, F-34 (record `71b981ad`)". |
| F-35 (MEDIUM): AC-4.4's walk names UAT, but nothing UAT reads routes to it. The Reading Order's `uat` row names AC-4.2 for M4 and not AC-4.4, and Testing Strategy's post-landing walks are AC-2.5, AC-4.2, AC-5.5 and AC-6.3 (QA register B-1 to B-4). The signed-in build is AC-6.3's provision step, where a complete sign-in was not executed (AN-8 limb 3), and AC-4.4 cites neither that step nor its fallback | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-35, cycle 4 pass 1 (record `71b981ad`) | Open. The critic set its landing trigger: the Planner batch fold at the seam after the last milestone's QA Phase 2, before the UAT anchor. That fold makes three changes. (1) The `uat` row and the walk list name AC-4.4. (2) The walk cites AC-6.3's provision step and takes its "where sign-in cannot be completed" clause for the signed-in half. (3) QA registers the walk; its `/preview` half needs no sign-in. Part (3) is done: QA register row B-7 (record `f79d7f77`), which carries a hazard note: `fetchChannels` writes a 10 s cache entry to the Redis named in `.env.local`, a remote host. QA then re-specified B-7 as two limbs, each run and recorded on its own (record `ca6d0f21`). Limb 1 is signed in, on B-4's provisioning. If sign-in cannot be completed, limb 1 closes as a stated limit that quotes the attempt, carried by handoff 5b19c3e4 item 1. Limb 2 is `/preview`, which runs either way. At the fold, AC-4.4's walk cites B-7's two limbs for part (2). Part (1) still waits for the fold. |
| Custom emoji `alt` (the implementer's Outstanding 0 (b)): AC-4.4 says the image's `alt` is `:name:`. M4's "Their output is unchanged" would keep today's `` alt={`<${a}:${name}:${id}>`} `` (`website@5ec0621 src/utils/markdown/rules.tsx`, the emoji rule's `react`, read this pass). The implementer took AC-4.4's, which is what Discord's DOM shows (`an7-g13-dom.json`) | `implementation/019-slate-formatting-discord-engine-m4-implementation.md` Outstanding 0 (record `3e47795f`), relayed by `steering-hooks-fixer` | Stated limit under the M4 cap (block 17:56Z), with no revision round. AC-4.4 decides, and the implementer's reading stands. The criterion is the more specific text, every gate has approved it, and it follows Discord. At the seam fold, M4's "Their output is unchanged" sentence gains the exception "except a custom emoji's `alt`, which is `:name:` (AC-4.4)". The `alt` is what a screen reader reads and what a copied selection may carry. It moves toward Discord, so it is inside the effort's standard and not put to him. |
| Large emoji (the implementer's Outstanding 0 (a)): CF-10's bullet says "Today both come from `simple-markdown`'s emoji rule", the image URL and the jumbo flag. But at `website@5ec0621`, `src/utils/markdown/emoji.tsx:jumboify`, the only writer of `jumboable`, has no caller. `git grep -n "jumboify\|jumboable" 5ec0621 -- src`, run this pass, shows its definition and readers only: `rules.tsx`'s two emoji renderers and `SlateEditor/utils/renderElementFactory.tsx`. So today neither the preview nor the editor ever draws a large emoji. The implementer reports no caller since `fae733f` (2023-02-28). Under CF-10's helper, the preview now draws a message of only emoji and whitespace large, by the rule the corpus shows (`dom-all-bot.json`). The editor element takes the same helper at M6. This is one more member of RK-8's class, a statement of what the site does today that the base contradicts | `implementation/019-slate-formatting-discord-engine-m4-implementation.md` Outstanding 0 (record `3e47795f`), relayed by `steering-hooks-fixer` | Stated limit under the M4 cap (block 17:56Z), with no revision round. CF-10's text already requires the helper and "the jumbo rule follows Discord", so the built behaviour is what the approved criterion asks for. Only the "today" premise was wrong. It is a visible product change, though, and it was written as a carried-over behaviour, so he never saw it as a change. Steering answered it from his rulings rather than putting it to him as a prompt (effort rulings block "2026-11-23T22:20Z", record `d5b28c7`). The answer rests on his 09:11Z standard and his 15:23Z selection. The built rule stands. He has been told and may veto, and a veto would be a criterion change to CF-10 and AC-6.5's helper limb. The limit of 27, and the multi-line, quote and embed cases, have no Discord observation, so they stay X-25, and an embed keeps size 18. At the seam fold, CF-10's "Today" sentence is corrected, and RK-8's record gains "M4 implementation: one member, `jumboify` uncalled (record `3e47795f`)". |
| QAF-34 (MEDIUM): AC-3.7's population is every input in the generator, the 272 corpus and the 106 link inputs, but the measurement revision 11 cites (`verification/019/impl/m4-dom-residue-before.json`) counts only atom-free inputs. There are 2,378 inputs per surface. 1,344 of them are atom-free on embedDescription, fieldValue and v2Text, and 1,545 on both title masks, so 1,034 and 833 inputs (holding a mention, emoji or timestamp) are unmeasured. Neither the plan nor the M4 document states the exclusion. Revision 11's "500 of 1,344" carried the atom-free base without naming it; the error is mine. QA's options: (1) atom-bearing inputs join the list's population, with the atom unit compared on kind and source text, since the site's resolved values (D-17 names, emoji images) are outside legacy's reach; or (2) they are excluded by a named predicate, with the count per surface recorded and an X-item naming what covers atom rendering (AC-4.3, AC-4.4, AC-6.3) | `qa/019-slate-formatting-discord-engine-qa.md` QAF-34, § Re-key on Revision 11 (record `047add44`); capture `verification/019/qa/probe-r11-residue-population.out` (P-Q21); the architect's CF-18 MEDIUM, the same member, § "Delta pass, revision 11" (record `744abb20`; `verification/019/architect-conformance/rev11/residue-coverage.out`). The architect recommends measuring atoms too, noting that the visible form already defines atom units and that `canonFromDom.ts` at `0b9f76f` reads emoji images and mention pills. The alternative is a stated exclusion, with counts, a reason, and a test that fails if the filter widens | Discharged at revision 12 into AC-3.7, under the architect's option (a) and QA's option (1). Atom-bearing inputs are in the population, and for AC-3.7 an atom unit agrees on kind and source span. Its resolved value is covered by AC-4.3, AC-4.4, AC-4.7 and CF-10. M4 measures every input and records the count. The critic's F-36 is the same member. |
| QAF-35 (LOW): no failure clause reads an entry's family, or the implementation document's family counts per surface, so an unknown family or a count that disagrees with the entries would pass. QA asks for one offline data-shape case asserting that each entry's family is in the stated set and that the family counts sum to the entries, seen red by planting an unknown family | `qa/019-slate-formatting-discord-engine-qa.md` QAF-35, § Re-key on Revision 11 (record `047add44`) | Discharged at revision 12 into AC-3.7 "What fails", with its M4 exercise. |
| CF-19 (LOW): RK-9 now has an exact falsifier, the entry count per surface, but no fire condition and no route. The architect asks the plan to name the count that fires it, for example a share of the 272 corpus still differing after adjustment, and to route a firing to steering | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 11" (record `744abb20`) | Discharged at revision 12 into RK-9. It fires once at M4 with the measured counts, which steering puts to him, and again on any rise. No threshold is set, because D-14's reopening class is his withdrawal. |
| F-36 (MEDIUM): AC-3.7's "Why per input" figures are over the atom-free inputs, and the entry count the list will reach is not stated. Neither measurement file is in `HEAD` | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-36, cycle 5 pass 1 (record `08caeb87`) | Discharged at revision 12. The figures name their subset, and M4 records the count over all inputs and commits the files. It is the same member as QAF-34 and CF-18. |
| F-37 (LOW): three wordings revision 11 left behind: changelog row 11 does not name D-14; the Reading Order's `code-reviewer` row still says "listed classes"; and no milestone exercises the stale-entry limb | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-37, cycle 5 pass 1 (record `08caeb87`) | Discharged at revision 12. Changelog row 12 names D-14 for revision 11, since the changelog is append-only. The `code-reviewer` row says families. AC-3.7 names M4 as where the stale-entry and family limbs are exercised. |
| CF-20 (LOW): revision 12's "kind and source span" cannot be computed on the legacy side. `discordLegacyTrees.json` at `website@0b9f76f` has no span, end, index or offset key; its only start keys are seven list start numbers. The chain's `canonicalForm.ts` already compares atoms by kind and identifying fields: `m channel:<id>`, `e c:<id>:<name>:<animated>` or `e u:<value>`, `ts <timestamp>:<style>`, with position taken from unit order. The architect proposes: "an atom unit agrees when its kind and its identifying fields agree (a mention's kind and id; an emoji's custom id, name and animated flag, or its Unicode value; a timestamp's value and style)". Also: `canonFromDom.ts` reads a mention as `dom:<text>`, which under D-17 is a channel name, so the DOM reader must take the kind and id from the element (for example a data attribute), not from its text | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 12" (record `237da08`) | Stated limit SL-12 under the M3 cap (block 22:35Z), with no revision round, together with the critic's F-38, the same member. For the M4 implementer and QA Phase 2, AC-3.7's atom sentence is read as follows. An atom unit agrees when its kind agrees at the same place in the unit sequence, and its identifying fields agree where the legacy node carries them: a mention's kind and id; an emoji's custom id, name and animated flag, or its Unicode value; a timestamp's seconds and style. These are the fields `canonicalForm.ts` already compares. Nothing on the legacy side is taken from the engine's parse (axiom E). The site's DOM reader takes an atom's kind and id from the element, never from its displayed text, which under D-17 can be a channel name. An atom dimension that no mutant can make differ is reported to the planner. At the seam fold, the sentence takes this text. |
| F-38 (MEDIUM) with SL-12: AC-3.7's atom unit agrees on "source span", but Discord's legacy tree has no span. A legacy timestamp node carries `timestamp`, `parsed`, `full`, `formatted` and `type` (`verification/019/analysis/an3/an3-legacy-corpus.json`). A span taken from the engine for both sides would be compared with itself, against axiom E. QA's QAF-34 had asked for "kind and source text"; my revision 12 wrote "source span" | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-38, cycle 6 pass 1 (record `575a52bc`) | Stated limit SL-12, as the CF-20 row above states it. Not a severity floor, so it falls under the M3 cap. |
| F-39 (LOW): (1) the family check reads "the implementation document's stated set", which the website's suite cannot read; (2) RK-9's route does not say whether anything waits on his answer; (3) a firing by "a later chain's re-measure" has no carrier once this plan closes | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-39, cycle 6 pass 1 (record `575a52bc`) | Stated limit SL-13 under the M3 cap, with no revision round. (1) The family set and the per-surface counts the check reads are committed data in the website, beside the list. The implementation document copies them, and the committed data decides where the two differ. (2) RK-9's firing holds no milestone, review or release in this plan, and D-14 stands until he withdraws it. Whether steering's prompt to him holds anything is steering's call (block 22:35Z). (3) A later chain's re-measure is carried by the handoff the closing stage mints, which names RK-9. Absent that handoff, the clause is dropped at the seam fold. |
| M4 Outstanding 0a (c): AC-3.7's families are a regex grouping of each entry's minimal input, a label rather than a predicate. There are 15 families, and their reasons and per-surface counts are committed beside the entries and copied in the document | `implementation/019-slate-formatting-discord-engine-m4-implementation.md` Outstanding 0a (record `bc73f58c`); the implementer's account, not re-derived | Stated limit under the M3 cap, with no revision round. A family is a label for review and decides no pass or fail. The literal entries decide, and SL-13's family check reads the committed data. This conforms to AC-3.7 as revision 12 states it. |
| M4 Outstanding 0a (d): the adjustment module has size 0. The one candidate, a bare link with a one-character host, reached 0 of the 2,378 inputs, so condition (c) and AC-3.8 (ii) failed, and it was deleted. The inputs that looked like it follow legacy's url-end rule over source text, which fails condition (a) | same (record `bc73f58c`); the implementer's account, not re-derived | Stated limit under the M4 cap. Size 0 is the recorded size M4 owes ("Its size is recorded at M4"). With no adjustment, AC-3.8 (ii) has no members, and the residue states it: a later adjustment re-arms (ii). AC-3.8 (i), (i′) and (iii) still run. He saw this outcome before choosing D-18 ("none of the differences could be fixed under the plan's rules", block 23:33Z), so nothing goes to him. |
| M4 Outstanding 0a (e): AC-3.1 holds on the agree class, except inputs holding a command, game or static mention. Under AC-4.4 (D-17) the site draws those as source text, while legacy holds a node. AC-3.1 names no exclusion. There are 402 such inputs, the same set as AC-3.6's | same (record `bc73f58c`); the count is the implementer's, not re-derived | Stated limit under the M3 cap. AC-3.1's DOM limb is read as excluding inputs that hold a `command`, `game` or `static` mention, because D-17's table draws those kinds as source text by decision (derived from D-17). The parse-level limbs of AC-3.1 keep them. At the seam fold, AC-3.1 names the exclusion and cites D-17. QA at Phase 2 checks the 402 against the predicate, not the count. Checked (R-52): QA's walk of the raw engine parse finds the same 402 members as the pattern at `e58f2ed` (`verification/019/qa/m4/qaExclusionProbe-e58f2ed.json`, record `912c7307`). The legacy-side `game` limb matches nothing, because `canonicalForm.ts` maps no legacy game-mention node. That is M3's GAME_MENTION / content cell (CR-5, carried), which QA records as residue. |
| M4 Outstanding 0a (f): AC-3.1 is compared in the loose form, with two normalisations applied on both sides: a code block's language counts only where it is drawn, and a style nested in the same style (`i(i(x))`) counts once. The plain loose form counted both as differences. AC-3.6 is compared in the visible form over every input, not only the disagree class | same (record `bc73f58c`) | Stated limit under the M3 cap. Both normalisations remove differences the reader cannot see, as the visible form's invisible list already does for nesting. AC-3.6 over every input is wider than the criterion asks, and is kept. Code review checks that each normalisation is applied on both sides, never on one only. |
| M4 Outstanding 0a (g): a timestamp past the safe integers (`<t:99999999999999999>`) renders from `Number(value)`, rounded. It is one input, left out of AC-3.6, and an X-item is owed | same (record `bc73f58c`) | Stated limit under the M4 cap. At the seam fold, Exclusions gains X-27: "timestamps whose seconds exceed `Number.MAX_SAFE_INTEGER` render a rounded time; one input in the classes", with reason "a date past year 275,760 is not a real message's", carried as a stated limit. Until then, this row is its carrier. Checked (R-52): QA's second instrument finds the one timestamp input (corpus:191), in the same record. |
| M4 Outstanding 0a (h): AC-4.5 names AC-2.1's module-graph instrument, which reads package importers, not a function's callers. The check built is that the `staticParserFor` export is absent (a test), plus a hand-read grep | same (record `bc73f58c`) | Stated limit under the M4 cap. An absent export has no caller, so the check is stronger than the criterion's, and it is accepted. At the fold, AC-4.5 names it. |
| QAF-37 (LOW, M4): in `preview.dom-equals-engine-tree.test.tsx`, the case that states AC-3.6's exclusion (a command, game or static mention, or a timestamp past the safe integers) re-asserts the patterns its own filter used, so it cannot fail. A wider exclusion would pass it: adding `role` still leaves at least 1,915 held inputs, above its > 1900 floor (QA's figure, not re-derived) | `qa/019-slate-formatting-discord-engine-m4-qa.md` § Findings, QAF-37 (record `912c7307`; R-51 at `ba9da3aa`) | Stated limit under the M4 cap (block 17:56Z), with no revision round. The exclusion itself is correct at `e58f2ed`, by QA's independent walk (rows (e) and (g) above); what is unguarded is a later widening of it. The next change that touches this test or the exclusion makes the case discriminate, with an expectation independent of the filter, seen red under a widening mutant. Until then the seam fold names it in AC-3.6's residue. |
| `SlateEditor/index.tsx`'s pre-existing eslint errors (8 at website `2e36107`, 9 at `5ec0621`, by steering's helper) blocked M5's hand-off at the convention check | Effort rulings block "2026-11-24T03:48Z" (record `6866cd75`), relayed by `steering-hooks-fixer`; D-20 | Stated limit, derived from D-20, with no revision round. They ship listed, and the carrier is `handoff/slateeditor-index-preexisting-react-hooks-lint-errors-2026-11-24.md` (UUID 67001740), triggered by plan 019's production deploy or an earlier edit of the file outside 019. At the seam fold, Exclusions gains a row citing D-20 and that handoff. A new error on this file beyond the handoff's list is not covered. |
| QAF-40 (MEDIUM, M6): AC-6.5's helper is independent of the lift, but the engine's `parse` gives an emoji node with no span and no source text. At `2e36107`, `😄:smile:`, `:smile:😄` and `😄😄` give one identical tree, and `\*a😄`'s text is `*a`. So for those classes the join M6 writes, not the engine, decides each span, and the hand-written control has no member where one value comes from two source forms side by side. QA's remedies: (a) the helper reads `parseLossless` under `SURFACE_MASK_LITERALS`, which carries spans; or (b) the control gains `😄:smile:`, `:smile:😄`, `😄😄`, `\*a😄` and `a\_b😄`, with a first-occurrence join mutant seen red | `qa/019-slate-formatting-discord-engine-qa.md` § "Re-key on Revisions 13 and 14", QAF-40 (record `a1b54c49`); steering's ruling, effort rulings block "2026-11-24T04:18Z" (record `56a44cc0`) | Discharged at revision 15. Steering excepted it from the M6 cap as QA's severity-floor class (axiom E) and named (b), with (a) only if no larger. (b) is in AC-6.5's control. (a) is not taken, since it rewrites the source sentence rather than adding members. AC-6.5's text still admits it as the helper's own choice, because `parseLossless` comes from the same `@discord/markdown-wasm` (`engine.ts` at `2e36107`). Under the same block, a further AC-6.5 gap below HIGH is a stated limit. |
| QAF-41 (LOW, M6): AC-6.7's `>>>` and fence exclusions have no mutant. NM-68 (a carry that ignores `>>>`) needs `>>> a⏎> b` and SL-16's `>>> a` fixtures, and NM-69 (a carry that ignores the unquoted fence) needs `` ```⏎> x ``; each must go red. AC-3.3's typed drive must decide carry, replace or remove from the table computed over the input, never from the editor's state, or a wrong carry writes back the same text and hides both mutants | same, QAF-41 (record `a1b54c49`) | Discharged at revision 15, folded in the same pass as QAF-40 with no extra gate round (steering block 04:18Z). AC-6.7's "Seen red" gains NM-68 and NM-69 with their fixtures, and AC-3.3's drive computes the table over the input's text. B-9 (AC-6.7's walk, SL-15 and SL-16 (1)) is QA's register row. |
| AC-6.5's 22 members where a hand-written literal and the helper (`nativeEmojiSpans`) differ under content's mask: 52 agree and 22 differ, by the implementer's run, not re-derived. (1) 12 link-address members (`[x](https://x.y/F)`, `https://x.y/F`, `<https://x.y/F>`, with F a ZWJ sequence, a tag sequence, `<:n:123>` or `<a:n:123>`): the helper lifts F, while the literal was `[]`. (2) 10 link-label members (`[F](https://x.y)`): the helper gives `[]` | Steering's ruling, effort rulings block "2026-11-24T04:51Z" (record `89dae9f6`), under AC-6.5's route for a differing member | The literals take the helper's values. (1) The hand-written basis was the form's definition, not an AN-7 DOM read, so no engine and display disagreement is shown. What Discord draws for these 12 is unread: a stated limit under the M3 to M6 cap, with no round. A user report of one is recorded under AC-6.5's row in QA's register. (2) These are in the G-14 known-differences class under D-5, which the plan already lists (Assumptions, the G-14 line: "in AC-3.6's class and the known-differences report"). Native `parse` leaves the label emoji as text, so `[]` is the engine's, as D-13 requires. Each of the 10 literals cites D-5 and G-14 as its basis. At the seam fold, AC-6.5's residue names (1). |
| AC-6.5 "Which text it hands the engine": M6 reads it as source text for the lift and `?` for the decorator. The lift writes each existing element as its source text when it parses a unit (`unitAround(…, 'source')`), while the decorator keeps `?` (D-15). The reason is the implementer's probe in an export: with `?`, `https://x.y/a*b*c🙂` sits inside an address, but read as text it has no emoji node, so the lift and the re-decide fought for 126 normalisation iterations on the generator input `> hello world<id:guide>⏎https://x.y/a*b*c🙂\[x\[` typed. With source text, the elements equal a fresh load by construction. The two readings differ only on AC-5.8's named class `BOX_READS_ELEMENT_AS_QUESTION_MARK` (3 inputs: `link:61`, `gen:870`, `gen:1677`). The figures are the implementer's, not re-derived | `implementation/019-slate-formatting-discord-engine-m6-implementation.md` Outstanding Items 2 (website up to `9719d02`), sent by implementer-019 | Confirmed as a stated limit under steering's block 04:18Z (a further AC-6.5 gap below HIGH), with no revision round. The `?` reading conflicts with AC-3.3's "normalisation settles" and with AC-6.5's typed-edit property, both of which the source-text reading meets. It changes nothing D-13 or D-15 decided: the engine still decides the emoji, and the decorator still reads `?`. What it gives up is the sentence "the colouring and the lift read one parse", which now fails on those 3 named inputs. Code review and QA verify the 3 by id. At the seam fold, the sentence names source text for the lift and cites this row. |
| CF-24 (LOW, M6): the architect recommends QAF-40's remedy (a). The package's own `parseLossless`, run on the pinned 0.16.0 under content's literal mask, gives every emoji node its own span and source text: `😄:smile:` comes out as 0–2 and 2–9, and in `\*a😄` the emoji is at 3–5 (`verification/019/architect-conformance/rev15/`). So the helper can collect the engine's spans with no hand-written join, which removes QAF-40's class. It stays independent of the lift, because it calls the package directly under `SURFACE_MASK_LITERALS` and AC-2.3 pins the adapter's masks | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 15" (record `f6f6651e`) | Stated limit under block 04:18Z, with no revision round. The QAF-40 row already admits (a) as the helper's own choice. If M6 takes it, the five QAF-40 members stay as control members, and the first-occurrence join mutant becomes a helper mutant that collects spans by first occurrence. Sent to implementer-019 as the recommended form. |
| QAF-42 (LOW, M6): AC-6.7's NM-68 fixture `>>> a⏎> b` and NM-69 fixture `` ```⏎> x `` end on the quoted line. AC-3.3's typed drive presses Enter only between the input's lines, so no Enter follows the line the mutant governs, and its carry cannot fire. QAF-41 named the key, and revision 15's fold dropped it | `qa/019-slate-formatting-discord-engine-qa.md` § "Re-key on Revision 15", QAF-42 (record `3b264329`) | Stated limit under the M6 cap, with no revision round. M6 builds each fixture with a following line, `>>> a⏎> b⏎c` and `` ```⏎> x⏎y ``, or with an explicit Enter at the end of the quoted line. QA Phase 2 reads NM-68 and NM-69 red on the fixtures built, so a miss is caught there. At the seam fold, AC-6.7 names the fixtures with their following lines, and its "Seen red" count says five mutants, not three (the critic's wording note, record `bf589c96`). Sent to implementer-019 at registration. The critic's F-44 is the same member. Closed by QA Phase 2 on M6: NM-68 and NM-69 are red on the Enter rows and the typed drives (record `4da9b76b`); the seam-fold wording above stands. |
| F-43 (LOW, M6): AC-6.5's first-occurrence join mutant cannot be red on `\*a😄` and `a\_b😄`, because the emoji occurs once in each (the critic's engine run). It is red on the three side-by-side members only | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-43, cycle 9 pass 1 (record `bf589c96`) | Stated limit SL-17, with no revision round. Each escape member is owed one join mutant that it reddens, named by the implementer, or it is recorded under AC-6.5's row in QA's register as held by its literal alone. If M6 takes CF-24's form, the mutant is a helper mutant on the collected spans. QA reads every member-mutant pair at Phase 2 on M6. At the seam fold, AC-6.5 states the pairing. Sent to implementer-019 and qa-019 at registration. |
| CF-22 (LOW, M6): the carry belongs in an `editor.insertBreak` override, not in `withNormalizeNode`'s `apply` override on `split_node`, because slate-dom 0.123.0's `insertTextData` splits a paste through the same op. That is why a paste gains the marker today | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 14" (record `e093c8aa`) | Stated limit under the M6 cap. It is design guidance for the implementer; AC-6.7's paste column and its "carry applied to a paste" mutant are what verify whichever home is built. Sent to implementer-019 at registration. |
| CF-23 (LOW, M6): AC-6.7's typing column needs to know that a marker was carried, and no field records it; a loaded empty `> ` line is the same node. The architect recommends a transient optional field on `CustomElement`, and does not recommend treating every empty quote line alike, which would decide a case D-22 leaves open | same (record `e093c8aa`) | Stated limit under the M6 cap. SL-16 (2) is the reading: a marker is carried from the split until the line's text next changes, and a loaded or hand-typed `> ` is not carried. Where the state is held is the implementer's to choose, and the architect's recommendation is sent with it. A loaded empty `> ` line taking in a typed `> ` would fail SL-16 (2)'s typed case. Sent to implementer-019 at registration. |
| F-42 (MEDIUM, M6): AC-6.7's table leaves three states to the implementer: (1) how a user ends a continued quote, a gesture with no cell and no walk; (2) when a marker stops being "carried", a state the saved text does not show; (3) whether a `>>>` block's opening line is inside the block | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-42, cycle 8 pass 1 (record `f0488807`) | Stated limit SL-16 under the M6 cap, with no revision round. Not a severity floor. M6 builds to these readings: (1) the implementation document names the gesture, QA's AC-6.7 walk includes ending a quote with it, and a user report that a quote cannot be ended is recorded under AC-6.7; (2) a marker is carried from the split until the line's text next changes, a hand-typed `> ` is not carried, and a second `> ` typed after it is content; (3) the opening line of a `>>>` block is inside it, as `withNormalizeNode.ts` treats it at `2e36107`. Each of (2) and (3) has an AC-3.3 typed case that fails when built the other way. At the seam fold, AC-6.7's table gains these cells. Sent to implementer-019 and qa-019 at registration. |
| F-41 (LOW, M6): AC-6.7's walk names UAT's build, but neither the `uat` Reading Order row nor Testing Strategy's walk list routes to it. The property: every criterion naming UAT as its walker is in both. Over six criteria (AC-2.5, AC-4.2, AC-4.4, AC-5.5, AC-6.3, AC-6.7) it fails for AC-4.4 (F-35, B-7), AC-5.5 (in the list as B-3, absent from the row) and AC-6.7 (absent from both) | same, F-41 (record `f0488807`) | Stated limit SL-15. Until the seam fold, QA's register is UAT's walk list. QA registers AC-6.7's walk at its revision 14 re-key. At the fold, the row and the list name all six. Where the build cannot sign in, the walk falls to AC-6.7's production check. Sent to qa-019 at registration. |
| CF-21 (LOW, M6): AC-6.5 freezes the oracle helper's spans, citing `discordNativeBox.json` and the residue list as precedent. But those are frozen only because their source is Discord's fetched code. The helper runs offline on the pinned wasm, and the suite's pattern is to call such a helper live in `pnpm test`. The architect recommends calling it live and freezing nothing, with both controls kept, and says accepting the deviation also works | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 13" (record `d9ddfd22`) | Stated limit under the M6 cap, with no revision round. The freeze is kept as a marked deviation, because D-21's option text, his selection, says "the test's answers are frozen after". At the seam fold, AC-6.5's precedent citation names it a deviation with that reason, in place of the mirror claim. Steering is told, in case it wants to put live-not-frozen to him. |
| CR-17 (LOW, M4): `visibleForm.ts` `walk` tests `STYLE_NAMES` before `n.name === 'c'`, so its inline-code arm is dead. A comparison on the visible form cannot see an inline-code text difference between the DOM and the engine tree. `decorator.preview-equals` works around it with `codeWithKids` | `code-review/019-slate-formatting-discord-engine-code-review.md` § "Findings (Round 5)", CR-17 (record `fdb41883`; R-60) | Stated limit under the cap, with no revision round. The preview's inline code is still guarded by two M4 tests (the reviewer's 2 of 2 mutants killed). The reviewer's remedy (the `c` arm first, then delete `codeWithKids`) rides the next change to `visibleForm.ts`. |
| QAF-43 (MEDIUM, M6): AC-6.8's count limb is an upper bound only ("at most once", "never more than twice"), so a counter reading 0 passes, for example one left on a builder the fix no longer calls. QA asks for equality with the literal (1 for an in-line insert or delete, 2 for Enter or a merge that leaves two changed units) for a keystroke that changes a unit's text, plus a positive control in the same run (an in-line insert in a one-line text counts 1) | `qa/019-slate-formatting-discord-engine-qa.md` § "Re-key on Revision 16", QAF-43 (record `d53b1b30`) | Discharged at revision 17 into AC-6.8's count limb: equality per pass, with a positive control. |
| QAF-44 (LOW, M6): AC-6.8's sized texts hold no emoji element, so a fix that rebuilds per line only on lines holding an element passes both limbs. QA asks for one sized text whose every line holds an element, for example 1,000 lines of `a🙂` (3,999 characters), in both limbs' text class | same, QAF-44 (record `d53b1b30`) | Discharged at revision 17: the 1,000-line `a🙂` text is in both limbs' text class. |
| CF-25 (LOW, M6): the fix's home. `handleElement` already ends with `resolveEmoji(editor, surface, path[0])`, so `resolveEmoji` builds the changed line's unit once (`unitAround`, `emojiLayout`) and resolves each line in it, and `handleEditor`'s loop over all lines goes. The count limb observes `unitAround` through a `vi.mock` pass-through of `./runUnit`, not a counter in `src`. Unread, for QA: a keystroke that lifts an emoji runs more than one normalisation pass, and the count is stated per pass | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 16" (record `ce656dca`) | The home is a stated limit, design guidance for the implementer. The per-pass window and the `vi.mock` observation are discharged at revision 17 into AC-6.8's count limb. |
| CF-26 (LOW, M6): the timed limb's home is a `*.bench.ts` beside the code, which `pnpm test`'s `*.test.ts` include leaves out by name, so a later chain can re-run it. A one-off probe under `verification/` cannot be. How `vitest bench` behaves under the config's projects is unread, for QA | same (record `ce656dca`) | Discharged at revision 17: AC-6.8's timed limb names the bench file as its home. How it runs under the projects is QA's at Phase 2. |
| F-49 (MEDIUM, M6) with QAF-45 (LOW): AC-6.8's residue is a list of examples, and members outside it fail the new property on a correct fix. At `119471f` (read, not run), `handleEditor` re-types every line whose type a keystroke changed, and each reaches `handleElement`. The residue does not name a character or Enter inside a fence delimiter, or any keystroke on a `>>>` marker. On the sized `>>>` texts, a keystroke at the first line's start re-types 199 lines at one size and 2,047 at the other, so the counts differ. On a corpus input with a fence of more than 4 lines, the bound of 4 is exceeded. QA's QAF-45 is the same class: typing or removing the `>` that makes `>>> ` re-types every following line in one drain, 10 visits and 11 builds on 5 lines at the tip (P-Q24) | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-49, cycle 12 pass 1 (record `73a6bce9`); `qa/019-slate-formatting-discord-engine-qa.md` § "Re-key on Revision 19", QAF-45 (record `4764a6e`) | Stated limit SL-22 under steering's block 07:21Z, with no round. It is not a severity floor. The residue is the property: every keystroke after which a line it did not edit has a different type (code block, quote or plain) or a different set of emoji elements. The count limb runs over the class less that residue, and on the `>>>` texts the keystroke falls on a line other than the first. As an observation, the implementer records the count and time of one residue keystroke, a character typed in front of `>>>`, at 200 and 2,048 lines. A user report of a pause on such a keystroke goes under AC-6.8's row in QA's register. At the seam fold, AC-6.8's residue states this property. Sent to implementer-019 and qa-019 at registration. |
| CF-28 (LOW, M6): every sized text in AC-6.8's count limb (plain, `> `, `>>>`, `a🙂`) holds no fence, so each is one run unit, since units break only at a code block (`runUnit.ts` `isRun`, `119471f`). A partial fix that builds every unit in the document once per keystroke counts 1 at both sizes and passes. The architect recommends a many-unit sized text: `a⏎```⏎x⏎```⏎` repeated, 12 characters per 4 lines, so 341 repeats make 1,364 lines within the description's 4,096. It runs at 200 lines and at the maximum, with the same equality | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 19" (record `ccddf880`) | Stated limit under steering's block 07:21Z, with no revision round. It is below HIGH and not a severity floor. It is adopted as a binding member: M6's fix round adds the many-unit text to the count limb's text class at 200 lines and at 1,364 lines, with the same cross-size equality. It adds a member to a class AC-6.8 lists, as SL-14 did, so it was sent to implementer-019 and qa-019 at registration. At the seam fold, the text class names it. |
| F-46 (MEDIUM, M6): on AC-6.8's count equality. (1) The literal 2 had no member: at `119471f`, `unitAround` makes a unit every adjacent non-code-block line, so one keystroke changes one line or two adjacent ones, and NM-72's fixture has no two-unit case (read, not run). (2) A delete can open or close a fence, but the residue named only inserted characters. (3) "Pass" had no named boundary | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-46, cycle 11 pass 1 (record `2170bc3d`) | Stated limit SL-19, with no round. (1) and (3) are superseded by revision 18. The literal now counts the lines a keystroke dirties, so Enter's 2 has members, and the window is one drain. The implementer still exhibits a two-unit keystroke, or records that the class has none, and QA dispositions NM-72. (2) stands: a delete that removes or completes a fence delimiter or an emoji is residue under AC-6.5's typed-edit property, beside the inserted-character residue. Sent to implementer-019 and qa-019. At the seam fold, AC-6.8's residue names (2). |
| F-47 (LOW, M6): a `*.bench.ts` beside the code is inside the production type-check (`tsconfig.json` includes `src/**/*.ts` and excludes only `**/__tests__`), and there is no sibling bench file at `119471f` | same, F-47 (record `2170bc3d`) | Stated limit SL-20, with no round. The bench file sits under `__tests__/`, a marked deviation from "beside the code" for CF-26's reason, with no sibling precedent. Sent to implementer-019. At the seam fold, AC-6.8's home line says so. |
| CF-27 (MEDIUM, M6): "one normalisation pass" is not a unit Slate has. slate 0.123.0's `normalize` drains dirty paths, calling `normalizeNode` once per dirty path, and a node the override changes is dirtied again within the same drain. Enter's `split_node` dirties both lines, so under CF-25's form Enter inside one unit builds it twice. The equality literal "distinct run units" (1) would then fail a correct fix, or force a dedupe across a drain that nothing holds today. The architect requires the window to be one `Editor.normalize` drain, with the pass count replaced by `normalizeNode` calls per kind. The recommended literal (a) is the lines the keystroke dirties, written by hand per fixture: 1 for an in-line insert or delete, 2 for Enter, 1 for a merge. The alternative (b) keeps "distinct units" and names a per-drain dedupe with its own mutant. NM-72's merge literal comes from a read of what the merge dirties, which is unread and QA's | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 17" (record `328a6eba`) | Discharged at revision 18, steering's narrow exception (effort rulings block "2026-11-24T07:15Z", record `5638dfe6`): the reading replaces the criterion's literal, so it is a criterion change. AC-6.8's count limb now has a one-drain window and literal (a), the lines the keystroke dirties (1, 2, 1), with `normalizeNode` calls recorded per kind. The per-line rebuild at `119471f` still fails it. |
| F-45 (MEDIUM, M6): AC-6.8's count literal depended on three terms the text did not fix: the window (one pass, though a keystroke that completes an emoji takes two or more at `119471f`), the inserted character (`:` after `:smile` lifts, and a third backtick moves lines into a code block), and the middle of a one-character line | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-45, cycle 10 pass 1 (record `0ff39772`) | Discharged at revision 17 into AC-6.8, taking SL-18's readings as criterion text: the window is one pass and holds in every pass; the character completes no emoji and no fence, and one that does is residue held by AC-6.5; one-character lines run at start and end. The critic's other two notes, AC-6.8's walk as SL-15's seventh member and M7's review at the seam fold, are B-10 and R-76's fold item. |
| CR-20 (MEDIUM, M6): `handleEditor`'s `resolveEmoji` rebuilds the run unit once per line on every operation. Measured at the tip in node: 71 ms per keystroke at 400 lines against 1.1 ms at the base, and about 20 ms at 200 lines (the reviewer's figures, not re-derived) | `code-review/019-slate-formatting-discord-engine-code-review.md`, Round 6 at `119471f` (record `8c2a4593`; R-77) | Discharged at revision 16 into AC-6.8, on his word (D-23, block 07:05Z): fixed before release, with the cap lifted for CR-20 alone. The fix resolves per run unit, not per line, in M6's fix round, with AC-6.8's counting case and its timed case. Steering's helper's re-timing replaces the reviewer's figures in AC-6.8. |
| CR-21 (LOW, M6): `emoji-regex` is in `package.json` with no importer | same (record `8c2a4593`) | Stated limit under the cap. It is removed with the next change that owns the lockfile, with that change's lockfile disposition. |
| AC-6.5's reader list says `emojiToImage` reads `jumboable`, but the base never set it (`jumboify` had no caller at `2e36107`), so the tip's omission preserves behaviour | the reviewer's Round 6 note (record `8c2a4593`), relayed by code-reviewer-019 | A wording item for the seam fold, with no round. The reader line drops `jumboable` or marks it never set, citing the large-emoji row above. |
| CR-18 (LOW, M5): AC-5.8's comparison (`decorator.preview-equals.test.tsx` `editorChars`) drops every input whose line holds an element, which is 1,107 to 1,147 of 2,378 per surface, by the reviewer's probe. The stated reason, "an element carries no decoration", covers only the element's character. So AC-5.8's "for every input" is not yet met | same, CR-18 (record `fdb41883`) | Stated limit under the cap until M6. AC-5.8's text is unchanged; the test is brought to it. In M6's round, once AC-6.5's lift reads the engine, the comparison drops only the element's character, and every remaining difference is a finding or a named family. The reviewer's falsifier: at least 2,200 inputs per surface compared, with `corpus:224` drawn as the preview draws it or named. The instrument is `m5-2e36107/crprobe.preview-equals-emoji.test.tsx.txt`. The population past the reviewer's 15-input sample is QA's. Sent to implementer-019 and qa-019 at registration. Discharged: code review Round 6 marks CR-18 RESOLVED at `119471f` (record `8c2a4593`, R-77). |
| CR-19 (LOW, M5): `src/utils/markdown/index.tsx`'s `interactive.parseContent`, `parseEmbedTitle`, `parseEmbedField` and `interactiveWithoutLinks` have no production reader. Only `rules.multi-line-code-block.test.ts` keeps them alive | same, CR-19 (record `fdb41883`) | Stated limit under the cap. They are deleted, with the cases that drive them, at M6 when the lift leaves `interactiveParser`, which AC-6.6 already requires of that test file, or with the next change to `index.tsx`. Sent to implementer-019 at registration. Discharged: code review Round 6 marks CR-19 RESOLVED at `119471f` (record `8c2a4593`, R-77). |
| CR-16 (LOW, M3): in `discordSurfaces.rich-rule-ids.test.ts`, the case "names the predicate when the shape names a module the facade does not require" omits only the rules-module require, so `richRuleIds`'s `!combineId` guard is dead under test. The mutant dropping it SURVIVED. Live, `req(undefined)` still throws, so the run fails, but with a less legible error | `code-review/019-slate-formatting-discord-engine-code-review.md` § "Round 3 sub-entry: QA's QAF-36 at `b04c09f`", CR-16 (record `7b4c1ad3`; R-53 at `2af0fa83`) | Stated limit under the M3 cap (blocks 22:35Z and 00:49Z), with no revision round. It does not fail silently. The reviewer's remedy, a case whose omitted require is the combine module, rides the next change that touches this test or `richRuleIds`; fix round 7 may take it, but nothing waits on it. |
| CR-15's Risks line (CR-15 MEDIUM, M3, a severity floor): the drift alarm can be wired so that it only ever reports "equal", and no assertion fails. The live state today is "equal", so the live cases cannot tell a correct wiring from a broken one. The reviewer names CR-15 as the falsifier of the drift alarm's C2 outcome | same (record `7b4c1ad3`) | The code goes to implementer-019 as fix round 7, which is code review's and QA's to verify; it is not this row's. At the seam fold, Risks gains a line naming the class and its falsifier: CR-15's offline case, red under the two operand mutants the reviewer names. `routingReport`'s fields, the class's other unmeasured population, are QA's. |
| CR-11 (LOW, M3): the oracle window's XHR refusal records a member when it is called, not when it is read | `code-review/019-slate-formatting-discord-engine-code-review.md` CR-11, Round 3 sub-entry at `2c1590f`; carried at Round 4 (record `d31214e4`) | Stated limit under the 00:49Z cap. The refusal still refuses, and CR-6's offline loopback case is unchanged. What is recorded can over-count a call that is never read. A user-visible effect is none, because this code is test-only. |
| CR-12 (LOW, M4): `preview.tsx` `createHeading` draws `` h${level} `` from an unbounded number, with no table and no unmapped-kind line | same, Round 4 at `e58f2ed` (record `d31214e4`) | Stated limit under the cap. The engine emits only levels 1 to 3 at the pin. A pin change is a C2 re-run item (M3), and its re-run includes a heading level beyond 3. The carrier is the chain that moves the pin. |
| CR-13 (LOW, M4): the residue list's family-assignment rules are in no record, so no entry's family can be re-derived. The labels held in the reviewer's 30-entry sample | same, Round 4 (record `d31214e4`) | Discharged: the reviewer marked CR-13 RESOLVED (record `06cbf54d`). The implementer's committed family script (record `511f704`) reproduces the families exactly, by the reviewer's run ("all 6,142 families and the family blocks"). Swapping rules F02 and F03 moves all 700 F02 entries, so the check can fail. |
| CR-14 (LOW, M3): `discordOffline.whole-command.test.ts` spawns a transcribed copy of the `test:discord` command instead of the script, so a change to the script's text is not seen | same, Round 3 sub-entry at `380e82d` (record `d31214e4`) | Stated limit under the cap. It is a transcription of the kind axiom E names. The next change that touches this test or the script spawns the script by name. Until then, QA Phase 3 runs `pnpm test:discord` itself at the release tip (D-12). |
| Split assessment: can M4 (the preview on the engine) ship as its own release before M5 and M6? | Steering's commission, effort rulings block "2026-11-24T00:49Z" (record `8de0ac36`), from his selection "019: propose a split" | Discharged by D-19: he chose to keep one release (block 00:55Z). Steering's refutation helper checked the assessment. It measured the drift: the real decorator against the mounted preview over the 272 corpus, with 29 messages differing in inline or quote style at `e58f2ed`, against 8 at `origin/master`. The figures are bounded, because the alignment is approximate (difflib). It also corrected my wording: W-3 is a confirmed inference he ratified ("Agent's inference is correct"), not a rule of his. The assessment as written follows. **(a) Coherence.** M4 alone leaves the preview on Discord's formatter while the editor's colouring stays on `simple-markdown`'s decorator until M5. The architect's AF-2 (`architecture/closed/slate-formatting-preview-architecture-findings.md`) made "the preview and the editor move in the same release" its required change, because the two "would disagree more than they do today", breaking W-3's "no drift between edit and preview" (`architecture/website.md` W-3, which he ratified). The size of that disagreement is unmeasured: no record compares the old decorator with the new preview, and one run over the 272 corpus would measure it. Nothing is known to break with M5 and M6 absent. M4 leaves `simple-markdown` in place for the editor, and AC-6.6 removes it only at M6. That is from the plan's design, and has not been read at `e58f2ed`; tests and QA Phase 3 at an M4-only tip would confirm it. Until M6, typed emoji are still saved as `:name:` (D-10 is M6's). **(b) What a split costs.** One plan revision: M7 split into two releases, M4's and M5's rollback coupling, the `Target-Release` line and M7's "no release tree holds M4 without M5", with delta reads by all three gates. An architect pass on AF-2 and W-3, whose wording he confirms. A second release cycle: QA Phase 3 at the M4 tip with `pnpm test:discord`, UAT's walks B-1, B-2 and B-7 then (B-3 and B-4 later), devops Stage 1 and 2, and his production approval twice. `/preview`'s screenshot images change at M4's release (W-4). **(c) What it saves.** The preview reaches users earlier by M5's and M6's build and gate time. On this chain's pace (M2 to M4 built from 18:49Z to 00:27Z, about 5.6 hours, with reviews), that is an estimate of several hours to about a day. The estimate is not measured, and the extra release cycle takes part of it back. **(d) Recommendation.** Keep one release. The saving is small and uncertain, against a known drift that his ratified W-3 rules out, and the split adds a release cycle. If he wants the split, the cheapest first step is the one-run measurement in (a), before any revision. |
| Steering's plan fact (the implementer's): M4's Mirrors line cites "guild-resolved mentions", but `rules.tsx` at `website@5ec0621` resolves none | Effort rulings block "2026-11-23T21:18Z" (record `988e5d69`), "Plan fact for the Planner batch" | Discharged at revision 10. Re-read this pass: the four mention rules render their capture and resolve no id. M4's Mirrors line now says so, and names the channel-list readers that AC-4.4's lookup mirrors. |
| Critique cycle 3 pass 1 assumption: `dayjs.locale()` read at render is the locale `LoadLocale` set for that viewer. Untested | `critiques/019-slate-formatting-discord-engine-critique.md`, cycle 3 pass 1 (record `683f3e9`) | Open, for the M4 implementer: AC-4.7's `vi-VN` and `en-GB` fixtures, which supply the tag through react-aria's locale, are what exercise it. A miss is an AC-4.7 gap, and under steering's 18:02Z ruling it goes to steering before any fold. |
| AN-8 limb 5 (slow-CPU capture; QAF-22), still running at revision 6 | `analyst-019`'s message after record `3681654e` | Landed (analysis record `1b5a46d2`, § Findings "Limb 5"; `verification/019/analysis/an8/rows-cpu4-{warm,cold}.json`): at 4× CPU, 150 of 150 formatted in both modes. Warm margin min 562.0 ms, median 646.1, max 1,700.6; cold min 638.0, median 902.7. AN-2's minimum was 519.7 ms. The throttle took effect: first formatted moved from 620 to 1,502 ms warm, and from 692 to 2,133 ms cold. H-1 is falsified at 4× on this box, so nothing goes to steering. RK-2's text takes this at the next seam fold, since it changes no criterion. The production generator's own host stays UAT's B-1 capture. |
| CR-7 (LOW): M3's three base-red hold-outs (`MOUNTED_BASE_RED` in `src/components/SlateEditor/__tests__/helpers/roundTripInputs.ts`, `EDITS_BASE_RED` in `helpers/blockLayerEdits.ts`, and the `holdsEmoji` filter) keep members out of their limbs and are wider than those limbs' red sets. No text in M6 names their deletion. At `website@f4060c5`, `git -C website grep -c "BASE_RED\|holdsEmoji" f4060c5 -- src` gives 14 lines over 5 files (run 2026-11-23, planner-019) | `code-review/019-slate-formatting-discord-engine-code-review.md` CR-7, Round 3 (record `dd5b093d`) | Stated limit under the revision cap on M6 (block 17:56Z), with no revision round. For the M6 implementer, code review and QA Phase 2: M6 does not exit while any of the three hold-outs is in `src`. The same `git grep -c` at M6's tip prints nothing (it exits 1). If a member is still red at M6's tip, its hold-out stays and the case goes to steering before M6 is handed off, because M6 cannot then meet this condition. The split by limb and the re-keying by `(text, line, offset)` belong to the M3 fix round (code review Required Actions, item 3), not to this row. Read with AC-6.7 from revision 14, which names the hold-outs' one cause and the drive they pass under. |
| CF-29 (LOW, M6): revision 20's fenced-quote text takes 20 characters per 4 lines, so its 2,048-line size is 10,239 characters. That is beyond the description's 4,096 (816 lines) and content's 2,000. The count limb should name 2,048 as a growth probe beyond the field limits, and the timed limb should say whether it runs the fenced-quote texts, and if it does, at 816 lines | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 20" (record `81d964c3`) | Stated limit under steering's block 07:21Z, with no revision round. It is below HIGH and not a severity floor. The reading that governs until the seam fold: in the count limb, the fenced-quote 2,048-line size is a growth probe beyond the field limits, built on the editor value directly. The timed limb does not run the fenced-quote texts, and its texts stay those it lists. No member is added or removed, so no test changes. Sent to implementer-019 and qa-019 at registration. At the seam fold, AC-6.8 states both. |
| F-50 (MEDIUM, M6) as SL-23: on the fenced-quote text, a forward delete at the end of a `> x` line joins the closing fence onto it. Every fence below then flips between opening and closing, and `handleEditor` (its `child.startCodeBlock !== fence.inCodeBlock` check, `119471f`, read from code, not run) retypes every line below, so the counts differ with size on a correct fix. SL-22's residue names a line's type, not its fence state | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-50, cycle 13 pass 1 (record `1c6ee275`) | Stated limit SL-23 under steering's block 07:21Z, with no round. It is not a severity floor. SL-22's residue reads: every keystroke after which a line it did not edit has a different type (code block, quote or plain), fence state (`startCodeBlock`, `lang`) or set of emoji elements. On the fenced-quote text the count limb runs over the class less that residue, and the implementation document records which keystrokes it left out. It changes which keystrokes the count limb runs, so it was sent to implementer-019 and qa-019 at registration. At the seam fold, AC-6.8's residue states it. |
| F-51 (LOW, M6) as SL-24: the fenced-quote text at 2,048 lines is 10,239 characters, past the description's 4,096 (`messageLimits.ts`). The largest size inside the limit is 204 repeats, 816 lines, 4,079 characters. The critic leaves the implementer a choice: 200 and 816 lines, or 2,048 with one line saying the size is past the limit and used for growth only | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-51, cycle 13 pass 1 (record `1c6ee275`) | The same member as CF-29, whose reading governs, so there is one form, not a choice: 2,048 lines is kept as a growth probe beyond the field limits, and the test says so in one line. The timed limb does not run the fenced-quote texts. Sent to implementer-019 and qa-019 at registration. |
| QAF-46 (LOW, M6): AC-6.5's hand-written control names "every AC-6.2 emoji form on its own", but has no member for AC-6.2's "an emoji newer than the site's table". `🫩` appears only in `SlateEditor.emoji-forms-reach-the-message`, which reads the saved text, not the spans. The behaviour holds (helper and lift both `[[0,2]]`, QA's probe at `119471f`), but nothing fails if either drops a newer emoji | `qa/019-slate-formatting-discord-engine-m6-qa.md` § Findings, QAF-46 (record `4da9b76b`) | Stated limit under the M6 cap, with no revision round. It adds a member to a class AC-6.5 enumerates, so it changes a test, and while code review and QA Phase 2 on the fix round are ahead it is sent to implementer-019 and qa-019 at registration: CR-20's fix round adds `['an emoji newer than the site\'s table', '🫩', 2]` to `discordOracle.emoji-spans`'s `ALONE`, shown red against a mutation that drops it. At the seam fold, AC-6.5's control names it. |
| QAF-47 (LOW, M6): `src/utils/markdown/__tests__/preview.fenced-code-block-draw.test.ts` (renamed at `4897f1c`) renders through its own `renderToStaticMarkup` helper, the Test Conventions' "Hand-rolled renderer" class, left standing on a surface M6 touched | `qa/019-slate-formatting-discord-engine-m6-qa.md` § Findings, QAF-47 (record `4da9b76b`) | Stated limit under the M6 cap, with no revision round. Its conversion to the DOM harness may outlive the plan, so its carrier is `handoff/preview-fenced-code-block-test-hand-rolled-renderer-2026-11-24.md` (Owning-Stage implementer, event trigger). It enters Exclusions at the seam fold, citing that handoff. |
| QAF-48 (LOW, M6): AC-6.5's loaded-text property leaves out 52 of 3,040 inputs per surface by `hasCleanFences`, citing X-19, which covers only the native box's unclosed-fence parse "where the Slate layer's `codeBlock` recognition governs". On 3 to 11 inputs per surface the lift drops an emoji the engine lifts, mostly on lines the Slate layer types `div` (for example `gen:469`). In the editor the emoji shows as its text, and the preview shows it as an image. The saved text is unchanged | `qa/019-slate-formatting-discord-engine-m6-qa.md` § Findings, QAF-48; `fence-parity-119471f.json` (record `4da9b76b`) | Stated limit under the M6 cap, with no revision round. No test changes. At the seam fold, X-19's row names this class: a fence opened mid-line, or left unclosed, in the run unit's fence-framed parse, where the editor shows the emoji as text and the preview as an image, with the saved text unchanged. A user report of that mismatch goes under AC-6.5's row in QA's register. |
| AC-3.3's 60 s cap after CR-20's fix: the whole offline suite takes 128.0 s with the fix (implementer-019's figure, `verification/019/impl/m6-fix-suite.*`, not re-run here), so the typed limb's generator count drops to fit, by AC-3.3's own Count limb | Effort rulings block "2026-11-24T08:17Z" (record `9c5a0a04`) | No revision: the criterion names its own remedy. The count is fitted on QA's instrument, both whole offline suites run back to back, until the fixed tree is under 91.1 s (the base `af3d95a`'s 31.1 s plus 60 s), with a margin for box load that the implementer names. At the seam fold, AC-3.3's Count limb records the new generator count from the implementation document: 400 inputs in the typed and pasted generator limbs, with the whole offline suite at 64.4 s (implementer-019, record `9c6bb958`). Where the full count runs is the next row. |
| AC-3.3's full generator count has no home: AC-3.3's Count limb says "The full generator count runs in `pnpm test:discord`", and steering's block 08:17Z relied on it, but no typed-generated file exists in the discord projects. `discordOffline.whole-command` runs those projects inside `pnpm test` and asserts the output holds no "N passed", so a file there would break it. implementer-019 added a knob instead: `MOUNTED_GENERATOR_COUNT=1000` runs the full 1,000 (passes, 103.6 s) | `implementation/019-slate-formatting-discord-engine-m6-implementation.md` Outstanding 3 and the cap section (record `9c6bb958`) | Stated limit under the M6 cap, with no revision round. The plan's sentence was wrong, and the error is the plan's. Governing reading until the seam fold: the full 1,000 has no standing instrument. It runs once through the knob at QA Phase 2 on CR-20's fix round and at QA Phase 3 on the release tip, recorded with its exit code. At the seam fold, AC-3.3's Count limb names the knob in place of `pnpm test:discord`. Sent to qa-019 and steering at registration. |
| Outstanding 1 of the CR-20 fix round: the typed-edit differential against `119471f` finds 3 differences in 161,136 keystrokes. `\` typed at the start of the opening fence line of an unclosed-fence input leaves the code line below holding text where `119471f` lifted an emoji. A neighbour step that removed it was thinly tested (10 of 22 mutants killed) and was reverted at `42128cd`. Code review's fixed-point oracle finds the family wider: 8 of 27,252 keystrokes, every one in an input with an unclean fence, and 0 in the corpus or its 19 clean fixtures. One member is a keystroke on a plain line: a backtick typed on line `q` of `q⏎```ts⏎``a 🙂⏎```⏎🙂` leaves line 2's `🙂` as text. So the class is any keystroke in an input whose fences are unclean in the run unit's parse, not only `\` on the opening fence line | `implementation/019-slate-formatting-discord-engine-m6-implementation.md` Outstanding 1 (record `9c6bb958`); `code-review/019-slate-formatting-discord-engine-code-review.md` Round 6 sub-entry (record `602344ec`) | Residue, the same class as QAF-48: an unclosed or unclean fence in the run unit's parse, outside AC-6.5's property by `hasCleanFences`. The saved text is unchanged. No code under the cap, and code review agrees that the neighbour step stays out. At the seam fold, X-19's row names this class with QAF-48's. |
| CR-22 (LOW, M6): AC-6.8's timed limb asserts inside the bench's `teardown` (`withNormalizeNode.keystroke-time.bench.ts`, `report`), so a missed median idles the run to its timeout (exit 124) instead of failing it. Measured at both trees | `code-review/019-slate-formatting-discord-engine-code-review.md` CR-22, Round 6 sub-entry (record `602344ec`) | Stated limit under steering's block 07:21Z, with no round. It is not a severity floor: the count limb in `pnpm test` fails by assertion. Governing reading: QA's Phase 2 and Phase 3 read exit 124 from the bench as the timed limb's red, and say so in their record. The structural remedy (the bound asserted outside the bench lifecycle, with the planted-`FRAME_MS` falsity signature) is the implementer's to take if the file is next opened. At the seam fold, AC-6.8's timed limb states the red mode. |
| CR-23 (MEDIUM, M6): `withNormalizeNode.ts` `resolveEmoji` settles the whole unit once per dirty line (`sharing = … [...unit.lineStarts.keys()]`), so closing a fence costs 415.7 ms at 2,048 lines at `42128cd` against 165.5 ms at `119471f`, and 42.1 ms against 15.8 ms at 200 lines, past one frame there. Cutting the settle to the edited line returns it to `119471f`'s cost. Every fence open and close in the probe also throws Slate's 126-iteration error at both trees, which steering has under refutation (effort rulings block 09:22Z) | `code-review/019-slate-formatting-discord-engine-code-review.md` CR-23, Round 6 sub-entry (record `602344ec`; `fence-toggle.out.txt`) | Discharged at revision 21 into AC-6.9's cost limbs, by his selection (D-24). |
| CF-30 (LOW, M6): the throw's mechanism, read at slate 0.123.0: `shouldNormalize`'s budget is the initial dirty-path count times 42, fixed when the drain starts. A keystroke dirties about 3 paths, which gives 126, and `handleEditor`'s retype then dirties every line below inside that drain, so it throws past about 123 lines. Recommended: retype in the input-path override inside `withoutNormalizing`, before the drain, so Slate sizes the budget to the lines changed. Workable: a `shouldNormalize` override that scales with the line count and stays finite. Not acceptable: an unbounded `shouldNormalize`, or a caught throw | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 21" (record `f4a9534b`) | Discharged at revision 22 into AC-6.9's no-throw limb (steering block 14:48Z). The mechanism and its options go to implementer-019 with the release. |
| CF-31 (LOW, M6): the `>>>` caret defect's mechanism. At `42128cd`, `handleEditor` moves a typed marker out of the text by `Transforms.insertText(editor, content, { at: [childLocation] })`, which replaces the whole node's text, so the caret lands at the end (`>>> az`). Recommended form: delete only the marker's range (0 to the prefix's length) and set `quotePrefix`, so Slate's point transforms keep the caret on the content. Avoid a hand-written `Transforms.select` inside the normaliser | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 22" (record `f898b32f`) | Stated limit under steering's block 14:48Z, with no round. It is guidance on how, not a criterion change: AC-6.9's caret limb decides. It goes to implementer-019 with the release. The architect's closing pass restates A-11 to name how the marker leaves the text. |
| F-56 (LOW, M6), a new member under SL-26: the caret limb binds the `>>>`-making keystroke only, but `withNormalizeNode.ts:handleEditor` replaces a line's text in one branch for `> ` and `>>> ` alike, so a `> ` quote made in front of existing text should have the same caret defect. Read from code, not run | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-56, cycle 14 pass 2 (record `50b2bbe0`) | Stated limit under steering's block 14:48Z, with no round. The `> `-making keystroke is residue. The implementer settles the premise with one case in the pre-fix run and records the result. Code review reads whether the caret fix sits in the shared branch, and reports a fix keyed to `>>>` alone as a deviation from his sibling rule. Sent to implementer-019 with the release. Settled by the pre-fix run (record `0a086b41`): the `> `-making keystroke had the same defect, and the fix sits in the shared arm. |
| The second M6 fix round's hand-off figures (website `85ece66`), implementer-019's, not re-run here. (1) At `42128cd`, the unmaking Backspace throws from 122 lines; the making keystrokes from 123. (2) The timed limb, 3 runs at box load 3.6 to 5.1, all exit 0: line-2 fence medians 6.8 to 10.8 ms at 200 lines (ceiling 27) and 77.9 to 88.4 ms at 2,048 (ceiling 104, 95th percentile up to 101.2). Growth 8.2 to 12.8 times over 21 readings, with one 18.5 (the closing-delimiter keystroke, run 1; its other runs 12.2 and 12.1) against 20. (3) SL-28: the throw's fix and CR-23's landed in one commit, so the growth limb was not seen red on a tree; it is red against NM-76 (5,730 ms against 1,194). (4) SL-27: the top sizes run as growth probes, named so in the case titles | `implementation/019-slate-formatting-discord-engine-m6-implementation.md` "Fix Round 2" (record `0a086b41`) | Observations; no limb missed. (1): AC-6.9's "Seen red at 123 lines and up for `>>>`" is one size too late for the unmaking member. The text class holds both 122 and 123, so no member or test changes, and the seam fold corrects the sentence. (2): the growth limb's margin is thin on one keystroke (18.5 against 20, at box load 3.6 to 5.1). AC-6.9 routes only a ceiling miss to steering; a growth miss fails the limb. QA's Phase 2 records the box load beside each growth reading, as AC-6.9 asks, and calls the limb as the criterion words it. A fail routes as any QA fail does, with no hold for another stage's opinion (effort rulings block "2026-11-24T19:20Z", record `7e662177`, withdrawing the planner's hold). (3) and (4) are as SL-28 and SL-27 asked. |
| CR-25 (HIGH, M6): settled state is remembered under `editor.children` (`withNormalizeNode.ts` `settledIn` and `linesAgree`, at `85ece66`), which every operation replaces, so an edit of E operations over N lines costs O(E × N). Closing a fence over `a🙂` lines takes 7.6 s at 1,000 lines. A paste takes 9.6 s plain and 25 s with emoji at 1,000 lines, against the base's 1.7 and 2.9 s, already so at `42128cd` | `code-review/019-slate-formatting-discord-engine-code-review.md` CR-25, Round 7 (record `e92137fe`) | Not a stated limit: it is HIGH, outside every cap. The fence member is discharged at revision 23 into AC-6.9's `a🙂` texts and count limb (block 19:43Z, under D-24). The paste member is discharged into AC-6.9's paste members and count limb at revision 23 by his selection (D-26). |
| CR-24 (LOW, M6): `SlateEditor.fence-and-quote-keystrokes-reach-the-message.test.tsx` swallows the act's error (`await settle().catch(() => undefined)`), so a mounted-only throw passes whenever the last write is right | `code-review/019-slate-formatting-discord-engine-code-review.md` CR-24, Round 7 (record `e92137fe`) | Stated limit under the AC-6.9 cap (block 14:48Z), with no round. The standing no-throw limb runs unmounted and is unaffected. The implementer removes the swallow if the file is opened in the third fix round, and code review reads it. |
| CF-32 (LOW, M6): the fix's home for CR-25. (1) At `85ece66` both `verifiedLines` and `settledIn` key on `editor.children`, which every operation replaces. Slate keeps the line objects an operation does not touch, so key on them: fence state as a `WeakMap<Element, incoming fence state>`, scanning down from the first changed line and stopping where an unchanged line's incoming state matches; emoji settle per run unit, keyed on its line objects, because of cross-line constructs (F-40). (2) A paste arrives as slate-dom `insertTextData`, N `splitNodes` and N `insertText`, each draining, so the unit is rebuilt about N times. Wrap `insertTextData`/`insertData` in `Editor.withoutNormalizing` so N lines end in one drain. Avoid hashing document text per operation | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 23" (record `569a0fb6`) | Stated limit under the AC-6.9 cap (block 14:48Z), with no round. It is guidance on how, not a criterion change: AC-6.9's count limb decides. It goes to implementer-019 with steering's start. No architecture entry records the normaliser's memoisation, and A-11's restatement at the architect's closing pass gains it. |
| F-52 (MEDIUM, M6) as SL-25: AC-6.9's two `>>>` members treat the marker as text in the line, but at `42128cd` `withNormalizeNode.ts:handleEditor` stores a quote line's marker as `quotePrefix`. Making it (`>` at the start of `>> a`) leaves the caret at `[0,0]` offset 1, the end of `a` (QA's `verification/019/qa/m6/gt-marker-base/model-selection-42128cd.out.txt`), so a `z` gives `>>> az`, not the caret limb's `>z>> a`. For unmaking, no caret position exists inside the marker: Backspace at the content's start goes to `onKeyDown.ts:normalizeBackspace`, which sets the line to `div`, so line 0 becomes `a`. Read from code and QA's capture, not run. A new member of RK-8's class | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-52, cycle 14 pass 1 (record `3910c29c`) | Discharged at revision 22 into AC-6.9's keystroke class and caret limb, with QA's QAF-52 (record `225ef4a6`), the same member. SL-25's reading, the `42128cd` output as the expected value, is not taken: that output is the caret defect (`>>> az`), which D-25 fixes, and the expected texts are hand-written (steering blocks 14:48Z and 17:03Z). At the seam fold, RK-8's record gains this member. |
| F-53 (MEDIUM, M6) as SL-26: AC-6.9's first line names a class, "a keystroke that changes the type of every line below it", but its keystroke class lists six members, and its residue names texts only | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-53 (record `3910c29c`) | Stated limit SL-26. The limbs bind the listed members: six at revision 21, seven from revision 22, which lists `>> a` and `>> abc` for the `>>>`-making keystroke. The class's other keystrokes are residue with no bound: a forward delete of a delimiter backtick, a backtick typed or deleted inside a line, a character other than the listed `>` that makes or breaks `>>> `, Enter or a merge on a delimiter line, a paste, and any of these on other lines. All reach the same `handleEditor` pass, and code review reads whether the fix sits there or is keyed to one keystroke. At the seam fold, AC-6.9's residue states it. |
| F-54 (LOW, M6) as SL-27: each text at its top size is 2N + 1 or 2N + 3 characters, so 2,001 or 2,003 against content's 2,000, and 4,097 or 4,099 against the description's 4,096. The growth limb names no surface | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-54 (record `3910c29c`) | Stated limit SL-27. The top sizes run as growth probes, with one line in the test saying so, or at 999 and 2,047 lines; the implementer chooses and records which. The cost limbs run on the embed description, as AC-6.8's timed limb does. |
| F-55 (MEDIUM, M6) as SL-28, four points on AC-6.9's cost limbs. (1) The base medians at `af3d95a` (17.4, 20.9, 80.2, 82.7 ms) are cited to block 14:33Z, which does not carry them. (2) "Plus a quarter, rounded up" gives 27 and 104 ms, not the limb's 26 and 105, which is the planner's arithmetic error. (3) The growth limb has never been red and cannot be on an existing tree: every tree stops at 126 iterations, so code review's close at `42128cd` is 42.1 to 415.7 ms, 9.9 times. (4) "Seen red at 200 lines and up" holds for the line-2 shape; the middle-line member changes about 100 lines at N = 200 | `critiques/closed/019-slate-formatting-discord-engine-critique.md` F-55 (record `3910c29c`) | (1) is discharged: the planner copied the helper's captures verbatim to `verification/019/planning/fence-refute/` (`af3d95a.raw.txt` lines 4 to 8 hold the medians). (2) is discharged at revision 22: the ceiling reads 27 and 104 ms, cited to that capture. (3) and (4), SL-28: the pre-fix re-run records, per member, the sizes at which it throws. The implementer records the growth ratio on the first tree that settles, and if the throw's remedy and CR-23's land together, the implementation document says the limb was not seen red. AC-6.9's walk is SL-15's eighth member. |
| Outstanding 2 of the CR-20 fix round: typing `>` at the start of `>> a`, making `>>> a`, at the start of a 200-line message throws Slate's "Could not completely normalize the editor after 126 iterations", at `119471f` and at the fix, on the `content` and `embedDescription` surfaces. At 40 lines it settles. The implementer calls it pre-existing, MEDIUM, unprobed in a browser | `implementation/019-slate-formatting-discord-engine-m6-implementation.md` Outstanding 2 and Observations (record `9c6bb958`; `m6-fix-gt-marker-probe.txt`) | Discharged at revision 21 into AC-6.9 by his selection (D-24), and its handoff is superseded (now `handoff/closed/slate-quote-marker-normalize-iteration-cap-2026-11-24.md`). Before that: pre-existing, so a stated limit here. QA's QAF-51 LOW (record `b7a5d9c6`; `verification/019/qa/m6/gt-marker-base/`): both the chain base `af3d95a` and the fix tip `42128cd` settle at 122 lines and throw from 123, and the model is correct after the throw. LOW assumes the browser shows no worse than a console error. qa-019 looks in a browser at its Phase 2 on the fix round and raises the severity if the editor stops taking input. It enters Exclusions at the seam fold, citing the handoff. |
| SL-23's premise, measured: on the fenced-quote text, none of the eight keystroke kinds and places on `> x` at line 101 was left out by the residue filter (`leavesOtherLinesAlone`). The critic's reading that a forward delete there flips the fences below did not hold in this editor | `implementation/019-slate-formatting-discord-engine-m6-implementation.md` Observations (record `9c6bb958`; `m6-fix-fenced-quote-delete.txt`) | An observation. SL-23's residue wording stands, and it excludes nothing on this text. At the seam fold, AC-6.8's residue states the wording without F-50's example. |
| QAF-49 (LOW, M6, pre-existing): `withNormalizeNode.ts` `handleElement`'s smart-quote repair has no test, and QA's mutant W9 (the two replacements swapped) survives the whole suite, as it did at M3. M6 changes none of its lines | `qa/019-slate-formatting-discord-engine-m6-qa.md` § Findings, QAF-49 (record `4da9b76b`) | Stated limit under the M6 cap. It is pre-existing and outside every criterion, so its carrier is `handoff/slate-smart-quote-repair-untested-2026-11-24.md` (Owning-Stage implementer, event trigger). It enters Exclusions at the seam fold, citing that handoff. |
| QAF-53 (MEDIUM, M6, a severity floor): AC-6.9's headline says a paste "costs no more per line as the message grows", and D-26 was chosen against "the release ships with pasting 3 to 9 times slower than today's site". Only the count ratio binds a paste, and no ceiling holds it to today's speed. The implementer's spike meets every count ratio (5) while paste time grows from 200 to 1,000 lines: `a` 49.8 to 692.5 ms, empty lines 46.5 to 1,047.1 ms, `a🙂` 186 to 2,186.1 ms (single shots, no load recorded). Property wanted: (a) a timed paste ceiling at 200 and 1,000 lines against today's `af3d95a` medians, outside the standing suite; (b) the headline's paste clause restated to what the limbs bind; (c) the helper's paste captures in the record | `qa/019-slate-formatting-discord-engine-qa.md` § Re-key on Revision 23, QAF-53 (record `d46f68ff`) | Decided by D-27, with no revision 24. (a) is met by SL-29's timed reading at QA Phase 2 (next row), not by a plan limb. (c) is discharged: the planner copied the helper's captures verbatim to `verification/019/planning/paste-refute/` (README there). (b) stays open here: at the seam fold, AC-6.9's headline paste clause is restated to what binds a paste, the count ratio and SL-29's timed reading against today's site. |
| F-57 (HIGH, M6) as SL-29, closed by property under the critic's stop authority: CR-25's and D-26's defects are times, and no limb reads a time for them. The growth limb leaves the paste out and needs a 2,048-line size the `a🙂` texts lack, and the ceiling is for plain lines. At `85ece66` the counts read linear on work CR-25 calls super-linear (opening a fence over `a🙂`: 200 and 400 line settles; a paste: 399 and 799 unit builds, each over the text pasted so far), so a fix can make the counts linear and leave the paste several times slower than today's. SL-29 is an entry condition on QA Phase 2 of M6's third fix round: the record holds a timed reading at that round's tip beside the chain base's on the same probe, for each paste member and each fence keystroke on the `a🙂` texts, at 200 and 1,000 lines, with the box load, as a timing capture under `verification/019/`. Code review bears the detection with its Round 7 probes, and CR-25 stays unresolved while a member is several times the base. A reading that is not "roughly today's speed" goes to steering | `critiques/closed/019-slate-formatting-discord-engine-critique.md` § Findings, "Closed at cycle 15 pass 1", F-57 (record `d58217d4`) | SL-29 stands as an entry condition, by D-27 (no timed limb, no revision 24). It was sent to implementer-019, code-reviewer-019 and qa-019 with steering's start of the third fix round (20:55Z), at the critic's ask. At Fix Round 3's tip (website `2b82972`, record `731ff3a1`), steering ruled under block "2026-11-24T22:41Z" (record `40823e74`). Paste is within the line. The four `a🙂` fence keystrokes are over it, and they go back for a fix under D-24. A lift redesign inside `src/components/SlateEditor/**` is in scope; architect-019 gives the design read first. Fix Round 4 takes that read together with code review's findings on `2b82972`. No plan revision. If the best form still misses the line, the figures go to steering for a selection by him. |
| QAF-54 (LOW, M6): the count limb's positive control (at least 1 on a one-line text) shows the mocks are wired, not that they see each line. A fix that inlines the per-line settle reads a near-constant count and a ratio near 1. Property wanted: a domain floor at N = 200, line settles at least N − 3 for the line-2 fence keystrokes and at least N for a paste. The spike meets it (200, 397 and 400 at 200 lines) | `qa/019-slate-formatting-discord-engine-qa.md` § Re-key on Revision 23, QAF-54 (record `d46f68ff`) | Stated limit under the AC-6.9 cap (block 14:48Z; block 19:43Z confirms it covers findings below HIGH), confirmed by block 20:54Z (D-27), which runs no revision 24. |
| F-58 (LOW, M6), a new member under SL-26: the `a🙂` texts bind the fence keystrokes only, so the `>>>` keystrokes over emoji lines are residue, and the residue's "a fill other than plain `a` and `a🙂` lines" reads as if `a🙂` were bound for every member. The paste's "seen red" cites times, while the counts that show the limb red are in `verification/019/code-review/m6fix2-85ece66/paste-count-85ece66.jsonl` (40,199 fence reads at 200 lines, 160,399 at 400) | `critiques/closed/019-slate-formatting-discord-engine-critique.md` § Findings, "Closed at cycle 15 pass 1", F-58 (record `d58217d4`) | Stated limit under the AC-6.9 cap (block 14:48Z). The implementer's pre-fix run records the paste members' two counts at 200 and 1,000 lines at `85ece66`. At the seam fold the residue names the `>>>` keystrokes over emoji lines and the paste's "seen red" cites the counts. |
| SL-29's fence members have no base reading of a completed keystroke (code-reviewer-019's message, no severity stated). At `af3d95a` every fence keystroke at 200 and 1,000 lines throws Slate's 126-iteration error, so its median is the time to throw, and "several times `af3d95a` on the same probe" has no denominator for them. The paste members are sound (`verification/019/planning/paste-refute/out-af3d95a.jsonl`, no errors). Read by the planner at 20:58Z: in `verification/019/code-review/m6fix2-85ece66/fence-emoji-af3d95a.jsonl`, 9 of 12 rows carry "Could not completely normalize" (`grep -c`), and every 200- and 1,000-line row, `a` and `a🙂`, opening and closing, is among them (`a🙂` medians 16.2 to 48.1 ms). Only the 40-line `a` rows and the 40-line `a🙂` opening settle. AC-6.9's fence ceiling (27 and 104 ms, `fence-refute/af3d95a.raw.txt`) rests on throw times too, recorded at F-55 (3) | code-reviewer-019's Resumption State (record `d5ca86b9`) | Ruled by steering (effort rulings block "2026-11-24T20:58Z", record `493aa6cc`; no question to him, since the option he chose reads "against today's site on the same test"). Each fence member compares against `af3d95a`'s median on the same probe, with the throw named beside it, as AC-6.9's fence ceiling reads the base. Every SL-29 member, fence and paste, uses one yardstick: a tip median within the larger base median at that N (making or unmaking) plus a quarter is roughly today's speed. A reading above it goes to steering with its figures and load, as AC-6.9 sends a ceiling miss, and is not a fail on its own. A tip reading that throws, or any no-throw or write failure, fails on its own limb. The plain `a` reading at the same tip and size is recorded beside each fence reading as context only. The planner's three candidate comparators were not chosen. |
| The planner's reading of AC-6.9's no-throw limb against CF-33's form (architect-019, record `dffb4dc4`): rebuild the changed lines from the load path, replacing each with `remove_node` and `insert_node` inside `Editor.withoutNormalizing`, under a scoped `editor.getDirtyPaths` override that returns `[]` for those replacement operations alone | Steering's routing (effort rulings block "2026-11-24T22:48Z", record `97303579`) | **Admitted, with no revision.** The limb bars "any change that stops `Editor.normalize` from reporting a drain that does not settle". Taking a line out of the drain hides nothing when the normaliser has no work on that line, so the form is admitted exactly where the suppressed lines are already a normaliser fixed point. Where the normaliser would still change one, the drain it skips is one that does not settle, and the limb fails. The fresh-load limb shows each line equals what `getInitialValue` builds. It does not show that a load's output is a normaliser fixed point: the architect marks unread whether slate-react normalises an initial value on mount, and the fresh-load invariant (architect, § Delta pass, revision 21) names the target state, not that fixed point. So, for this form, the limb is read by one observation after every keystroke member, at every N: a forced normalise over the whole document (`Editor.normalize` with `force: true`) applies no operation and raises nothing. It adds no member to any class the criterion enumerates. It is how code review and QA read the limb's existing clause for a form that skips lines. The form is also bound to its own "Avoid" line: suppression covers only operations the code itself built from the load path, so the keystroke's own operation and every other operation are never covered. D-24's throw fix and the D-25 caret path are kept. If the forced normalise applies an operation, the form does not meet the limb, and the figures go to steering under block 22:41Z. |
| CR-26 (LOW, M6, Fix Round 3's `retypeLines` change): `withNormalizeNode.ts` `holdsMarkerInText` (in `quotePrefixOf` and `retypeLines`) decides a quote line's `> ` placement differently from the load path (`getInitialValue`). Inside a `>>>` quote, a pasted fence-closing `> ```` line keeps its marker in its text (`quotePrefix` `""`), where a fresh load and `85ece66` give `"> "`. Text and caret are right, so the saved text is unchanged. The line's shape differs until a reload. 4 of 15,966 pastes in code review's differential. The 246 fresh-load failures shared by both trees are named there as pre-existing | `code-review/019-slate-formatting-discord-engine-code-review.md` § CR-26 (record `7376a74c`; plan R-112, `2ab6daae`) | Rides Fix Round 4 under block 22:41Z (that round takes code review's findings on `2b82972` with the architect's read). Code review prefers the structural form, `retypeLines` deciding placement with the load path's own function, with a minimum form and a falsity signature in its finding. No criterion changes. The 246 shared fresh-load failures are not re-derived here, and their disposition is a seam-fold row beside Outstanding 1's unclean-fence residue (QAF-48, X-19). |
| Fix Round 4's Outstanding 1: in code review's 36,560-keystroke fixed-point corpus, 14 keystrokes at `a7ad3f2` (8 at `85ece66`) end in a state a second forced normalise changes. In the six new ones the final line is a code line whose emoji the load leaves as text and the normaliser (`resolveLine`, over a unit including the line's neighbours) lifts. At those six the tip equals a fresh load of the final text, and `85ece66` does not | `implementation/019-slate-formatting-discord-engine-m6-implementation.md` § Fix Round 4, Differentials and Outstanding 1 (record `32c4a684`); routed by effort rulings block "2026-11-25T05:19Z" | **Re-opened at R-118; R-114's stated-limit disposition is withdrawn.** At R-114 the planner wrote that the cause of the six "is not the skip". Code review's CR-27 (Round 8 sub-entry, record `9cb3a3da`; `verification/019/code-review/m6fix4-a7ad3f2/compare-fixedpoint-tip-vs-nosuppression-mutant.out.txt`, read) shows the suppression causes them: with the override made a pass-through, the tip's 14 non-fixed-point keystrokes fall to the 8 shared with `85ece66`. The error was the planner's. R-111 admitted the form "exactly where the suppressed lines are already a normaliser fixed point", so the reading binds every input the suppression applies to; only its instrument was scoped to the members. CR-27 MEDIUM is a severity floor. The underlying cause stands: the load and the normaliser disagree about an emoji in a code line. **Discharged at revision 24.** The suppression's part, the six, is AC-6.9's no-throw sub-limb "A suppressed line is a fixed point", read over code review's corpus against the pass-through tree. The load's part is AC-6.9's residue. AN-9 B1 found 12 keystroke-produced texts whose load is not a fixed point, because `codeFence.ts` `afterLine` counts a triple backtick Discord's formatter does not read as a fence. B2 found the normaliser's lifted state is the one the engine supports. Its handoff is re-aimed to that cause. |
| Fix Round 4's Outstanding 2: Backspace on the ```` ``` ```` of line 2 over N lines that each hold `’` costs 121 / 301 ms (`a’` / `a’🙂`) at 200 and 9.4 / 21.3 s at 1,000, the same at `2b82972`; `holdsBadCodepoint` leaves those lines to the per-line normal path | Same document, Class Sweep (Fix Round 4), CR-25 row, member (a), and Outstanding 2 (record `32c4a684`) | **A registration, with no revision.** It is a member of AC-6.9's residue as written ("a fill other than plain `a` and `a🙂` lines"), so no criterion binds it, and binding it would be a criterion change. Severity MEDIUM, re-derived (the implementer gave MEDIUM for such a message, LOW otherwise). A freeze of 9 to 21 s is severe, but it needs a loaded or pasted message of about 1,000 lines each holding a typographic quote, because the editor rewrites a typed one. At 200 lines it is 121 to 301 ms. Below HIGH, so a stated limit under the cap (block 00:49Z), carried by `handoff/slate-fence-close-cost-typographic-quote-lines-2026-11-25.md`, and an Exclusions row at the seam fold. Not read at `af3d95a`, where the fence close throws at 200 lines. |
| Fix Round 4's Outstanding 3: a lone backtick typed at the end of line 0 of 200 or 1,000 `a🙂` lines, whose last line ends in a backtick, throws Slate's "Could not completely normalize the editor after 126 iterations" at `2b82972` and `a7ad3f2`, after 797 / 3,997 operations (the emoji between revert to text, one revert per line). The implementer rates it HIGH "if a user can type that" | Same document, Class Sweep (Fix Round 4), CR-25 row, member (b), and Outstanding 3 (record `32c4a684`; `m6-fix4-class-cost-probe-*.jsonl`) | **Outside every criterion. Binding it would be a revision**, a milestone-level scope delta on M6, which is open: AC-6.9's no-throw limb binds its keystroke class, and a lone inline-code backtick is not a member. D-24's words cover "the 126-iteration normalise throw on opening or closing a code fence, with QAF-51's `>>>` form", so this keystroke is outside D-24's lift. At R-114 its severity was read as MEDIUM, superseded by the HIGH below, which answers the unread base premise: the same Slate throw in a browser left the editor mounted and taking input (QA's look at `42128cd`, QAF-51, `qa/019-slate-formatting-discord-engine-m6-qa.md` row 8), and QAF-51 found the model correct after it. It would be HIGH if a browser showed the editor stop taking input, or the keystroke's text missing from the saved message after a further keystroke. Neither has been read for this keystroke. Not read at `af3d95a`: whether the release adds this throw is open, and QA Phase 2 can run the probe there. **Re-derived HIGH at 05:27Z** (R-115), from steering's refutation run (effort rulings block "2026-11-25T05:26Z", record `f9f2974d`; `verification/019/steering/outstanding3-refute/`, read: `probe-a7.jsonl`, `probe-om.jsonl`, both probes and logs). It mounted the real `SlateEditor`, typed the backtick at the end of line 0, then `x`. (1) At `a7ad3f2`, 200 and 1,000 lines: the 126-iteration throw, then a timer's `Cannot resolve a DOM point from Slate point`. The editor holds the backtick, but `onChange` hands the message nothing after it (0 writes). The `x` is accepted, and its write carries both. (2) At 5 lines, no throw. (3) At `origin/master` `5ec0621`, production code (equal to `af3d95a` over the editor paths, block 20:07Z): no throw at 5, 200 or 1,000 lines, and one write after the backtick. So the release adds the throw on ordinary typed input. Between the backtick and the next keystroke, the message's saved copy lacks the backtick, because `onChange` is the persist path (AC-6.9's write limb). A save in that window loses a character, against the scope statement's "lose no character". That meets the HIGH condition this row named. The browser's native input path was not run. As HIGH it is not capped (block 00:49Z), so a fix is owed. Binding it is still a revision and a milestone-level scope delta on M6, put to him through steering. **Discharged at revision 24** by his selection D-28: AC-6.9's class and its six inline-code members (AN-9 A1 to A6). The held handoff is not owed. **Premise weakened at R-123:** QA's walk K4 in Chrome at `a7ad3f2` (record `5a9af9be`; one observation) typed the backtick at the end of line 0 over 200 `a🙂` lines with a partner. It raised the 126-iteration error once as a page error, with no timer error. The JSON view, read before the next key, already held the backtick, so the write was not lost through the browser's native input. The write loss that made this HIGH holds on the jsdom mounted path only. In the browser the observed defect is a page error the release adds, with the text kept, which is MEDIUM on the QAF-51 precedent. The HIGH, and the prompt sentence "The backtick isn't passed on for saving until the next keystroke, so a save at that moment loses it", went to him before any browser read. R-115 named the browser path as not run and still called it HIGH. A browser walk before the prompt would have caught it. D-28's reopening class is his withdrawal only, so D-28 stands unless he withdraws it. The write limb's node red stands. After the corrected premise he kept the class fix (D-29). One reading of that question's option text, "the emoji drawing collapse that production doesn't have", is not re-derived here. K4 saw 199 lines' emoji turn to text, and AN-9 B2 found that inside real inline code Discord's formatter treats an emoji as text. So the emoji change may be the engine's reading of a line-crossing inline code, not a defect. Whether the tip's emoji state is right is AC-6.9's fresh-load limb's, which compares emoji elements with the load. |
| CR-27 (MEDIUM, M6, a severity floor) and CR-28 (HIGH, M6), code review Round 8 sub-entry at `a7ad3f2`. CR-27: the rebuilt lines are not a normaliser fixed point for 6 corpus keystrokes outside the members, and the no-suppression mutant restores all 6. CR-28: the lone-backtick throw, D-28's member. CR-29, the fence close over typographic-quote lines, goes to steering | `code-review/019-slate-formatting-discord-engine-code-review.md` Round 8 sub-entry (record `9cb3a3da`; plan R-117) | **Discharged at revision 24.** CR-27 is AC-6.9's sub-limb "A suppressed line is a fixed point". R-111 binds every input the suppression applies to (R-118 withdrew R-114's contrary reading, the planner's error). CR-28 is AC-6.9's inline-code members (D-28). CR-29 is the same item as Fix Round 4's Outstanding 2: AC-6.9's residue, carried by `handoff/slate-fence-close-cost-typographic-quote-lines-2026-11-25.md`. |
| QAF-55 (MEDIUM, M6, a severity floor): AC-6.9's headline claims the class "costs no more per line as the message grows", but revision 24's residue frees A1 to A6 from both cost limbs, so a fix that settles them quadratically fails nothing. That is CR-25's HIGH class, found through the same kind of residue sentence. SL-29's yardstick cannot serve them: production's A1 does 2 operations in 1 to 4 ms and changes no other line, while a settling fix must re-lift every line below. Property wanted: A1 to A6 on the `a🙂` `embedDescription` texts join the standing work-per-line count limb (at 1,000 lines at most 10 times the count at 200). QA records their tip medians with load at Phase 2 as context for steering, held to no ceiling | `qa/019-slate-formatting-discord-engine-qa.md` § Re-key on Revision 24 (record `7a6087f6`) | **Discharged at revision 25** by his D-31: A1 to A6 on the `a🙂` `embedDescription` texts join AC-6.9's work-per-line limb, and QA records their tip medians as context. |
| CF-34 (LOW, M6), guidance for Fix Round 5. At `a7ad3f2` the rebuild trigger (`retypeLines`' check, then `rebuildLines`' `sameType`) compares type, `lang`, `startCodeBlock` and `quotePrefix`, not emoji elements. So A1 to A6, which change only emoji, skip the rebuild and go line by line through `resolveEmoji`/`resolveLine`, one operation per call, with `settledIn` still keyed on `editor.children`. Recommended form: compare the affected run units' lines with the load path's built and lifted line over the whole state AC-6.9 names, so one path serves the class, with no branch on the backtick or on line position. Consequence: the suppression then covers emoji rebuilds, so a line where `afterLine` miscounts becomes a non-fixed point the sub-limb counts, and Fix Round 5 may meet B1-shaped texts | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 24", CF-34 (record `6a5aa33`) | Stated limit under the M6 cap: guidance on how, with no criterion change. It goes to implementer-019 with steering's start of Fix Round 5. Steering ruled the scope point (b) (effort rulings block "2026-11-25T06:07Z", record `9ba0662c`). Lines that `afterLine` miscounts stay out of the rebuild, and the fence-count fix stays with the handoff. If (b) cannot meet AC-6.9's limbs, the implementer brings it to steering before widening. |
| CF-35 (LOW, M6): the corpus differential exempts the keystrokes the pass-through tree itself leaves unsettled, the 8. The condition R-111 admits is equality: after each corpus keystroke, the document on the fixed tree equals the document on the pass-through tree. That needs no exemption, and by the architect's derivation, not run, it counts everything the current reading counts | Same section, CF-35 (record `6a5aa33`) | **Discharged at revision 25**: the sub-limb's corpus differential takes the equality form, riding D-31's revision. |
| CF-36 (LOW): the re-aimed handoff's work. `codeFence.ts` `afterLine` is a triple-backtick parity count, and the emoji come from the engine, so these are two recognisers of "this line is code", the same class as CF-2. Recommended: take fence state from the engine's `code_block` spans, with CF-32's convergence stop to bound the cost, rather than teach `afterLine` escapes and inline code | Same section, CF-36 (record `6a5aa33`) | Folded into `handoff/slate-code-line-emoji-load-normaliser-disagree-2026-11-25.md` as its recommended form. No plan criterion changes. The architect's correction of CF-33's premise and of revision 21's A-11 consequence ("stored line structure equals the engine's reading of the saved text") is recorded in its own document. |
| F-59 (HIGH, M6) as SL-30, closed by property under the critic's stop authority: D-28's class is stated whole but bound at line 0 only, while the residue names further members by AN-9's read and leaves them unbounded. Those are a single backtick or an escaping `\` typed, or removed by Backspace or Delete, in the middle of line 0, on a middle line, or on the partner line, over `a🙂` lines with a partner across a line break. His option read "this option covers the kind, not just this case". SL-30 is an entry condition on QA Phase 2 of M6's Fix Round 5: the record holds, at that round's tip, a reading of the thrown error, a pending timer's error and the last write for each of those positions, at the sizes the listed members run, as a probe capture under `verification/019/`. Code review bears the detection with its class probe. A throw at any of them is a member of D-28's class and goes to steering, then back to the fix under D-28, not to a stated limit. Residue of the property: fills other than `a🙂`, partial mode, undo and redo, paste, sizes between 5 and 100, and the browser's native input | `critiques/closed/019-slate-formatting-discord-engine-critique.md` § "Closed at cycle 16 pass 1", F-59 (record `343b1ed0`) | SL-30 stands as an entry condition by his D-30 (no revision for it). Steering's positions run (`verification/019/steering/outstanding3-refute/probe2-*.jsonl`, read) gives these members at `a7ad3f2`: (1) a backtick typed in the middle of line 0, Backspace removing the last line's partner backtick, and Delete removing line 0's backtick throw at 100, 200 and 1,000 lines; (2) a backtick typed at the end of the middle line throws at 200 and 1,000, not at 100; (3) production `5ec0621` throws on none. It goes to implementer-019, code-reviewer-019 and qa-019 with the release of Fix Round 5. |
| F-60 (MEDIUM, M6) as SL-31: the inline-code members have no cost reading. The work-per-line and timed limbs, and SL-29 (D-27), bind the fence and paste members only. At `5ec0621` a single backtick changes no other line, so whatever a fix does per line is new work, and a fix can take seconds at 1,000 lines with every limb green. The critic reads it as below HIGH and not a severity floor, since the plan claims no speed for these members | Same section, F-60 (record `343b1ed0`) | The same member as QA's QAF-55, which QA reads as a severity floor because AC-6.9's headline claims the class "costs no more per line". The two gates disagree on whether it is a floor. **Discharged at revision 25** by his D-31: A1 to A6 join AC-6.9's work-per-line limb. |
| F-61 (LOW, M6): four wording points in revision 24. (1) D-28's option text and AC-6.9's "The owner was told" sentence carry the rulings block's wording, not the ledger's, and leave out "this option covers the kind, not just this case". (2) The no-throw limb's timer clause does not say it is read on the mounted editor; AN-9 records the timer's error mounted only. (3) "Backspace removing a leading backtick" does not name both start forms (AN-9's A4 has two); the class statement says the probe ran "on both surfaces" at `5ec0621`, where AN-9 ran that tree once with no surface, and lists `\` among characters that pair, where AN-9 says it pairs with nothing. (4) The residue opens "The limbs bind the keystroke class over the text class, and nothing else is bounded by them", while the new sub-limb's corpus reading binds 36,560 keystrokes outside that class | Same section, F-61 (record `343b1ed0`) | **Discharged.** (1) for D-28's row at R-122, and for AC-6.9's "The owner was told" sentence at revision 25. (2) to (4) at revision 25: the timer clause is read mounted, A4 names both start forms, the class statement says `\` escapes and pairs with nothing and that `5ec0621` ran once, and the residue names the sub-limb's corpus reach. Point 2 went to qa-019 at R-121. |
| F-62 (LOW, M6): AC-6.9's headline reads "A keystroke that changes the type of every line below it, or a paste of many lines", but the inline-code members change other lines' emoji elements, not their type, and joined at revisions 24 and 25 (D-28, D-31). QA and the critic read the headline's "costs no more per line" differently off that sentence (QAF-55, F-60). D-29's quoted option text dropped the ledger's last sentence | `critiques/closed/019-slate-formatting-discord-engine-critique.md` § "Closed at cycle 17 pass 1", F-62 (record `fdebc3ac`) | D-29's sentence is restored at R-125. At the seam fold the headline names the class by its effect (D-28's "changes the state of lines other than its own"), with the inline-code members among those it costs. |
| Fix Round 4's Outstanding 5: after an Enter, an empty line can keep `empty: false` where a load sets `empty: true`, at `85ece66` and `a7ad3f2`; the implementer does not know what reads the flag | Same document, Outstanding 5 (record `32c4a684`) | **A registration, with no revision.** Read at website `a7ad3f2` (`git grep -n '\bempty\b'` over `src/components/SlateEditor` and `src/utils/markdown`, production files): the flag's one reader is `onKeyDown.ts`'s Backspace at a line's start, `(collapsed && element.empty) || element.type === 'blockQuote'`. For a `blockQuote` line the flag is not consulted. For any other line the branch sets `prevent` only for a non-collapsed selection, so a collapsed Backspace does the same with either value. The writers are `getInitialValue.ts` (`!text.length`, and `true` for empty input), `emojiLift.ts` (`false`) and `withNormalizeNode.ts` `handleElement` (sets `true` on a line with no text). AC-6.9's fresh-load limb does not compare `empty`. Severity LOW: no behaviour reads the difference. A stated limit, with an Exclusions row at the seam fold whose carrier is a stated limit. |

## Version Management

The website `package.json` carries no `version` field, so no version or CHANGELOG milestone is written. Devops names what the deploy
moves.
