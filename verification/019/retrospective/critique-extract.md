# Critique extract: Plan 019, Slate formatting on Discord's engine

Source (read-only, not edited): `/usr/local/bin/hooks/agent-output/critiques/closed/019-slate-formatting-discord-engine-critique.md` (2074 lines, 206785 bytes; `wc -l -c FILE`).
Header status: Resolved; cycle 18 pass 1 on plan revision 26, Verdict APPROVED (lines 1-9).

Disclosure: one shell command was refused by the record-write gate (`record-write-gate-hook`) because it combined `sed -i` with the critique path. It was not retried. Nothing was written to the critique. The one correction it was meant to apply (F-52's raise-section line) is applied in this file instead (see Appendix A, row F-52).

Line numbers are the critique's own. "H", "M", "L" = HIGH, MEDIUM, LOW. CRITICAL does not occur as a finding (see section 3).

---

## 1. Cycle and pass table

Cycles 1 to 18; 26 critique passes. Timestamp is the planner row's value, minute precision. Source lines: planner row (closure row in brackets; the closure row is a `critic-019 | Document closed` row). Finding IDs and severities are from Appendix A.

| Cycle | Pass | Plan revision reviewed | Timestamp | Verdict | Findings raised (severity) | Source line (closure row) |
|---|---|---|---|---|---|---|
| 1 | 1 | 1 | 2026-11-23T16:11 | REQUEST REVISION | F-1 H, F-2 H, F-3 H; F-4 to F-18 M (15); F-19 to F-23 L (5) | 118 (none; REQUEST REVISION) |
| 1 | 2 | 2 | 2026-11-23T16:34 | REQUEST REVISION | F-24 M, F-25 M, F-26 M | 119 (none; REQUEST REVISION) |
| 1 | 3 | 3 | 2026-11-23T17:19 | REQUEST REVISION | F-27 M, F-28 M, F-29 M, F-30 L | 120 (none; REQUEST REVISION) |
| 1 | 4 | 4 | 2026-11-23T17:27 | APPROVED | F-31 L | 121 |
| 1 | 5 | 5 | 2026-11-23T17:31 | APPROVED | none | 122 [123] |
| 2 | 1 | 6 | 2026-11-23T17:44 | APPROVED | F-32 L | 124 |
| 2 | 2 | 7 | 2026-11-23T17:54 | APPROVED | none | 125 [126] |
| 3 | 1 | 8 | 2026-11-23T18:00 | APPROVED | F-33 M | 127 |
| 3 | 2 | 9 | 2026-11-23T18:04 | APPROVED | none | 128 [129] |
| 4 | 1 | 10 | 2026-11-23T21:41 | APPROVED | F-34 L, F-35 M | 130 [131] |
| 5 | 1 | 11 | 2026-11-23T22:32 | APPROVED | F-36 M, F-37 L | 133 [134] |
| 6 | 1 | 12 | 2026-11-23T22:35 | APPROVED | F-38 M, F-39 L | 136 [137] |
| 7 | 1 | 13 | 2026-11-24T04:00 | APPROVED | F-40 L | 139 [140] |
| 8 | 1 | 14 | 2026-11-24T04:06 | APPROVED | F-41 L, F-42 M | 142 [143] |
| 9 | 1 | 15 | 2026-11-24T04:22 | APPROVED | F-43 L, F-44 L | 145 [146] |
| 10 | 1 | 16 | 2026-11-24T07:10 | APPROVED | F-45 M | 148 [149] |
| 11 | 1 | 17 | 2026-11-24T07:14 | APPROVED | F-46 M, F-47 L | 151 [152] |
| 11 | 2 | 18 | 2026-11-24T07:19 | APPROVED | F-48 M | 154 [155] |
| 12 | 1 | 19 | 2026-11-24T07:24 | APPROVED | F-49 M | 157 [158] |
| 13 | 1 | 20 | 2026-11-24T07:45 | APPROVED | F-50 M, F-51 L | 160 [161] |
| 14 | 1 | 21 | 2026-11-24T14:44 | APPROVED | F-52 M, F-53 M, F-54 L, F-55 M | 163 [164] |
| 14 | 2 | 22 | 2026-11-24T17:08 | APPROVED | F-56 L | 165 [166] |
| 15 | 1 | 23 | 2026-11-24T20:12 | APPROVED | F-57 H, F-58 L | 168 [169]; steering message 170 (no pass) |
| 16 | 1 | 24 | 2026-11-25T06:06 | APPROVED | F-59 H, F-60 M, F-61 L | 171 [172] |
| 17 | 1 | 25 | 2026-11-25T06:18 | APPROVED | F-62 L | 173 [174] |
| 18 | 1 | 26 | 2026-11-25T15:57 | APPROVED | F-63 L, F-64 L, F-65 L | 175 [176] |

Pass counts, by command: `grep -c 'cycle [0-9]* pass [0-9]*: plan revision' FILE` returns 26 (the planner rows at lines 118 to 175 listed above). Cycle 1 passes 1 to 3 carry REQUEST REVISION in their rows; passes 4 onward carry APPROVED.

---

## 2. Changelog rows (all 47, lines 116 to 176)

Command: `grep -nE '^\| 20[0-9-]+T' FILE` (47 rows; `grep -cE '^\| 20[0-9-]+T' FILE` returns 47). Summaries are condensed to 15 words or fewer.

| Line | Timestamp | Summary |
|---|---|---|
| 118 | 2026-11-23T16:11 | Cycle 1 pass 1, rev 1: F-1 to F-23 raised; REQUEST REVISION. |
| 119 | 2026-11-23T16:34 | Cycle 1 pass 2, rev 2: F-1 to F-5, F-7 to F-23 resolved; F-24 raised; REQUEST REVISION. |
| 120 | 2026-11-23T17:19 | Cycle 1 pass 3, rev 3: F-6, F-24 to F-26 resolved; F-27 to F-30 raised; REQUEST REVISION. |
| 121 | 2026-11-23T17:27 | Cycle 1 pass 4, rev 4: F-27 to F-30 resolved; F-31 raised; APPROVED. |
| 122 | 2026-11-23T17:31 | Cycle 1 pass 5, rev 5: no new findings; F-31 landing trigger recorded; APPROVED. |
| 123 | 2026-11-23T17:31 | Closure: every finding resolved, or F-31 carries a landing trigger. |
| 124 | 2026-11-23T17:44 | Cycle 2 pass 1, rev 6 (reopened): F-31 resolved; F-32 raised; APPROVED. |
| 125 | 2026-11-23T17:54 | Cycle 2 pass 2, rev 7: F-32 resolved; no new findings; APPROVED. |
| 126 | 2026-11-23T17:54 | Closure: F-1 to F-32 all resolved and verified landed. |
| 127 | 2026-11-23T18:00 | Cycle 3 pass 1, rev 8: F-33 raised; M4/M6 revision cap recorded; self-correction of cycle 2 pass 2. |
| 128 | 2026-11-23T18:04 | Cycle 3 pass 2, rev 9: F-33 resolved; no new findings; APPROVED. |
| 129 | 2026-11-23T18:04 | Closure: F-1 to F-33 all resolved and verified landed. |
| 130 | 2026-11-23T21:41 | Cycle 4 pass 1, rev 10: F-34 (LOW) and F-35 (MEDIUM) raised; APPROVED. |
| 131 | 2026-11-23T21:41 | Closure: F-34 closed by property; F-35 landed-by-author. |
| 133 | 2026-11-23T22:32 | Cycle 5 pass 1, rev 11: F-36 (MEDIUM) and F-37 (LOW) raised; APPROVED. |
| 134 | 2026-11-23T22:32 | Closure: F-36 and F-37 landed-by-author. |
| 136 | 2026-11-23T22:35 | Cycle 6 pass 1, rev 12: F-36, F-37 resolved; F-38, F-39 raised; APPROVED. |
| 137 | 2026-11-23T22:35 | Closure: F-38 and F-39 landed-by-author. |
| 139 | 2026-11-24T04:00 | Cycle 7 pass 1, rev 13: F-40 (LOW) raised; APPROVED. |
| 140 | 2026-11-24T04:00 | Closure: F-40 landed-by-author. |
| 142 | 2026-11-24T04:06 | Cycle 8 pass 1, rev 14: F-40 resolved; F-41 (LOW), F-42 (MEDIUM) raised; APPROVED. |
| 143 | 2026-11-24T04:06 | Closure: F-41 and F-42 landed-by-author. |
| 145 | 2026-11-24T04:22 | Cycle 9 pass 1, rev 15: F-43 and F-44 (both LOW) raised; APPROVED. |
| 146 | 2026-11-24T04:22 | Closure: F-43 and F-44 landed-by-author. |
| 148 | 2026-11-24T07:10 | Cycle 10 pass 1, rev 16: F-45 (MEDIUM) raised; APPROVED. |
| 149 | 2026-11-24T07:10 | Closure: F-45 landed-by-author. |
| 151 | 2026-11-24T07:14 | Cycle 11 pass 1, rev 17: F-45 resolved; F-46 (MEDIUM), F-47 (LOW) raised; APPROVED. |
| 152 | 2026-11-24T07:14 | Closure: F-46 and F-47 landed-by-author. |
| 154 | 2026-11-24T07:19 | Cycle 11 pass 2, rev 18 (steering block 07:15Z): F-48 (MEDIUM) raised; APPROVED. |
| 155 | 2026-11-24T07:19 | Closure: F-48 landed-by-author. |
| 157 | 2026-11-24T07:24 | Cycle 12 pass 1, rev 19: F-48 resolved; F-49 (MEDIUM) raised; APPROVED. |
| 158 | 2026-11-24T07:24 | Closure: F-49 landed-by-author. |
| 160 | 2026-11-24T07:45 | Cycle 13 pass 1, rev 20: F-50 (MEDIUM), F-51 (LOW) raised; APPROVED. |
| 161 | 2026-11-24T07:45 | Closure: F-50 and F-51 landed-by-author. |
| 163 | 2026-11-24T14:44 | Cycle 14 pass 1, rev 21: F-52 (MEDIUM), F-53 (MEDIUM), F-54 (LOW), F-55 (MEDIUM) raised; APPROVED. |
| 164 | 2026-11-24T14:44 | Closure: F-52 to F-55 landed-by-author. |
| 165 | 2026-11-24T17:08 | Cycle 14 pass 2, rev 22 (steering block 14:48Z): F-52 resolved; F-56 (LOW) raised; APPROVED. |
| 166 | 2026-11-24T17:08 | Closure: F-56 landed-by-author. |
| 168 | 2026-11-24T20:12 | Cycle 15 pass 1, rev 23: F-57 (HIGH), F-58 (LOW) raised; APPROVED. |
| 169 | 2026-11-24T20:12 | Closure: F-57 closed by property with SL-29 entry condition; F-58 landed-by-author. |
| 170 | 2026-11-24T20:55 | Steering message relaying his F-57 selection; no pass, no revision. |
| 171 | 2026-11-25T06:06 | Cycle 16 pass 1, rev 24: F-59 (HIGH), F-60 (MEDIUM), F-61 (LOW) raised; APPROVED. |
| 172 | 2026-11-25T06:06 | Closure: F-59 closed by property with SL-30; F-60 and F-61 landed-by-author. |
| 173 | 2026-11-25T06:18 | Cycle 17 pass 1, rev 25: F-60, F-61 resolved; F-62 (LOW) raised; APPROVED. |
| 174 | 2026-11-25T06:18 | Closure: F-62 landed-by-author. |
| 175 | 2026-11-25T15:57 | Cycle 18 pass 1, rev 26: F-63, F-64, F-65 (all LOW) raised; M7 premise re-argued; APPROVED. |
| 176 | 2026-11-25T15:57 | Closure: F-63 to F-65 landed-by-author; carried by the rebuild sizing document. |

---

## 3. Totals and commands

Commands are run against `FILE` = the critique path above.

| Quantity | Command | Result |
|---|---|---|
| Highest finding ID | `grep -oE '\bF-[0-9]+\b' FILE \| sort -t- -k2,2n -u \| tail -1` | F-65 |
| Distinct finding IDs | `grep -oE '\bF-[0-9]+\b' FILE \| sort -u \| wc -l` | 65 (F-1 to F-65, none missing) |
| Finding header lines (any severity, incl. resolution lines) | `grep -nE '^F-[0-9]+ ' FILE \| wc -l` | 71 (70 severity-tagged; line 1058 is prose) |
| Severity-tagged header lines | `grep -noE '^F-[0-9]+ (CRITICAL\|HIGH\|MEDIUM\|LOW)' FILE \| wc -l` | 70 = 65 IDs + 5 IDs with a second (resolution) header: F-36, F-37, F-40, F-45, F-48 |
| CRITICAL | `grep -c 'CRITICAL' FILE` | 1 hit, line 804, prose on the stop rule; no CRITICAL finding |
| Raised findings by severity | `cut -f2 raise.tsv \| sort \| uniq -c` (scratch TSV = Appendix A) | HIGH 5, MEDIUM 35, LOW 25 (total 65) |
| Raised per pass | `awk -F'\t' '{print $3"."$4}' raise.tsv \| sort -u \| wc -l` (scratch TSV) | 23 of 26 passes raise at least one ID (passes 1.5, 2.2 and 3.2 raise none) |
| Changelog rows | `grep -cE '^\| 20[0-9-]+T' FILE` | 47 |

HIGH IDs: F-1, F-2, F-3, F-57, F-59. Cycle-1 counts agree with the changelog row at line 118 ("3 HIGH, 15 MEDIUM, 5 LOW").

Appendix A's per-severity counts reproduce with `awk -F'|' '$2 ~ /^ F-[0-9]+ $/ {gsub(/ /,"",$3); print $3}' OUTPUT_FILE | sort | uniq -c`, where OUTPUT_FILE is this file. Run on this file: 5 HIGH, 35 MEDIUM, 25 LOW; `... | wc -l` on the same filter gives 65 rows.

---

## 4. Recurring themes

Method. Titles are the `**Title**` lines (`grep -n 'Title\*\*' FILE`, 29 lines, all from the cycle 4 onward sections). Findings without a Title line (F-1 to F-33 and F-52, F-60, F-61) are quoted from their header summary after the em dash (`grep -nE '^F-[0-9]+ ' FILE`). Titles are quoted, with truncation marked "...". Grouping is by category words in the quoted text; no assessment is made. Each finding is listed once; the "not grouped" row holds findings whose quoted text has none of these categories.

**Premise staleness** (a stated premise or fact that a read finds stale, unread or false)
- F-12: "the base is `master` at the cut, with a re-derivation step" (header 1862)
- F-34: "AC-4.4's residue says forum ids are not on the channel list, and they are." (line 1795)
- F-36: "AC-3.7's 'Why per input' figures are over the inputs without atoms, and the entry count the list will reach is..." (line 1758)
- F-37: "three wordings revision 11 left behind." (line 1779)
- F-38: "AC-3.7's atom unit agrees on 'source span', and Discord's legacy tree has no span." (line 1717)
- F-64: "M7's rollback sentence is marked inference where a read settles it, and names no runner." (line 1222)

**Register drift** (a register row, option text, cell or predicate differs from its source)
- F-19: "the criteria name their decision rows" (header 1876)
- F-20: "Exclusions rows with carriers" (header 1878)
- F-23: "replaced by D-13: AC-6.5 on the engine, AC-6.6" (header 1884)
- F-24: "the command runs at every later website release, as D-12 reads" (header 1886)
- F-30: "D-4's and D-5's consequence cells are re-aimed" (header 1898)
- F-40: "the hand-written control names no member that crosses a line break, and one owed re-verdicts cell still folds..." (line 1696)
- F-62: "AC-6.9's headline does not name the inline-code members, and D-29's option text drops a sentence." (line 1247)
- F-63: "D-32's and D-34's option texts are the rulings block's paraphrase, not the ledger's words." (line 1206)
- F-65: "the carry count's predicate leaves out rows that are partly discharged." (line 1232)

**AC wording, AC-2 to AC-4 and early AC-6** (criterion text ambiguous, unbound or with an unfixed term)
- F-3: "pending stays hidden as today; rejected is a marked deviation" (header 1844)
- F-5: "declared and observed enumerators, an outcome for an unmapped kind, the `0` rule" (header 1848)
- F-8: "the rule names the inline runs; block context stays the Slate layer's" (header 1854)
- F-9: "two modes, the paste limb bounded, the refusals kept" (header 1856)
- F-14: "the loose form is named, with the strict count and its blur in X-19" (header 1866)
- F-16: "AC-2.7" (header 1870)
- F-18: "AC-6.3 has a provision step and AC-6.4 names what a place would take" (header 1874)
- F-21: "AC-2.1, AC-2.2, AC-2.6" (header 1880)
- F-31: "AN-8 limb 2b read it per surface: `GAME_MENTION` stays set on the description..." (header 1838)
- F-32: "`s` and `S` are a marked deviation from `TIMESTAMP_TO_DAYJS_FORMAT`..." (header 1836)
- F-33: "the unloaded-tag fixture is `vi-VN`, with the site's locale files loaded..." (header 1834)
- F-39: "the family check's comparand, and what RK-9's route holds." (line 1736)

**Limb and residue wording, AC-6.5 to AC-6.9** (a limb or residue does not bind a member, or a term is not fixed)
- F-42: "AC-6.7's table leaves three states to the implementer." (line 1669)
- F-43: "AC-6.5's join mutant cannot be red on the two escape members it is said to be seen red on." (line 1616)
- F-44: "NM-68's and NM-69's fixtures end on the line their dropped conjunct governs." (line 1642)
- F-45: "AC-6.8's count literal depends on three terms the criterion does not fix." (line 1587)
- F-46: "AC-6.8's equality has three terms with no member or no boundary." (line 1543)
- F-48: "AC-6.8's literal counts lines dirtied, and builds follow line entries to `normalizeNode`..." (line 1513)
- F-49: "AC-6.8's residue is a list of examples, and the keystrokes it misses fail the size-equality on a correct fix" (line 1481)
- F-50: "on the fenced-quote text, one keystroke in the class flips every fence below it, and SL-22's wording does not..." (line 1446)
- F-51: "the fenced-quote text's larger size is longer than any field allows." (line 1464)
- F-52: "AC-6.9's `>>>` members are stated in the marker model, with hand-written caret texts." (header 1370, the cycle 14 pass 1 resolution line)
- F-53: "the keystroke class lists members of the class its first line names, and the residue names no keystroke." (line 1380)
- F-56: "the caret limb binds the `>>>`-making keystroke, and the `> `-making one shares its code path." (line 1355)
- F-59: "D-28's class is stated whole and bound at line 0 only, while the plan names further members by read and leaves them unbounded." (line 1260)

**Cost and count limbs** (timing or count evidence, growth or ceiling)
- F-54: "each text's top size is just past its field's limit, and the growth limb names no surface." (line 1401)
- F-55: "the cost limbs' figures have no capture, the ceiling's literals do not follow from its arithmetic, and the..." (line 1418)
- F-57: "no limb reads the elapsed cost of a paste or of a fence keystroke over emoji lines, which are the defects D-26..." (line 1303)
- F-58: "the a[emoji] texts bind the fence keystrokes only, and the paste's 'seen red' cites times for a count limb." (line 1341)
- F-60: "the six inline-code members join AC-6.9's work-per-line count limb by his D-31" (header 1295)
- F-61: "point 1 landed in D-28's row at plan R-122 and in AC-6.9's reports at revision 25" (header 1298)

**Walk routing** (a walk names a route that nothing reads)
- F-35: "AC-4.4's walk names UAT, and nothing UAT reads routes to it." (line 1816)
- F-41: "AC-6.7's walk names UAT's build, and nothing UAT reads routes to it." (line 1651)

**Cross-document and convention consistency** (two documents, or a plan and a convention, disagree)
- F-6: "the class table has the editor's rows" (header 1850)
- F-7: "a legacy-only surface went to him before M2's approval; ruled at D-14" (header 1852)
- F-11: "AN-1 takes plan 018's build form" (header 1860)
- F-13: "AN-4 needs no driver; M3 takes AC-2.2's pin rule; the rollback names its runner" (header 1864)
- F-15: "QA's production read is cited and the reader is the carrier" (header 1868)
- F-17: "Reading Order with the owed re-verdicts table" (header 1872)
- F-22: "gates stated in M5 and M6; devops mints the handoff" (header 1882)
- F-27: "the native box runs on the pinned wasm; under drift its limbs are 'not comparable'..." (header 1892)
- F-28: "the later-release column holds no release on any cause; devops at Stage 1 is the runner" (header 1894)
- F-47: "the bench file's home is inside the production type-check unless it sits under `__tests__/`." (line 1574)

**Not grouped** (outcome or stated-limit tracking, no category word in the quoted text)
- F-1: "each AN item carries its 'Not completed' outcome and the approval it holds" (header 1840)
- F-2: "outcome table by cause and gate, the release-interval figure, the Test Conventions carrier" (header 1842)
- F-4: "the gap is recorded on every capture; the missing production read is a stated limit" (header 1846)
- F-10: "the mutated code is named per criterion" (header 1858)
- F-25: "SL-1: `tel` and `sms` listed, checked by the observed enumerator (AC-4.6)..." (header 1888)
- F-26: "SL-3 to SL-7 landed or discharged at revision 3..." (header 1890)
- F-29: "the property is adopted: AC-3.7's frozen residue list..." (header 1896)

Coverage check: 6 + 9 + 12 + 13 + 6 + 2 + 10 + 7 = 65 (IDs F-1 to F-65, each once).

---

## 5. Passages mentioning the listed terms

Hits by term, from `grep -n` runs on FILE:
- "cap": `grep -niE '\bcaps?\b' FILE`, 12 lines (127, 139, 327, 406, 610, 707, 740, 864, 904, 917, 918, 1983).
- "D-33": `grep -n 'D-33' FILE`, 11 lines (6, 176, 181, 190, 196, 1215, 1219, 1229, 1241, 2004, 2017).
- "waive": `grep -ni 'waive' FILE`, 2 lines (175, 190).
- "release essentials": `grep -ni 'release essentials' FILE`, 2 lines (182, 2018).
- "Revision 7" (case-insensitive, `grep -noiE 'revision 7\b'`): 5 lines (125, 921, 930, 1173, 1836).
- "PREMISE-STALE": `grep -c 'PREMISE-STALE' FILE`, 24 lines.
- "steering decides": `grep -ciE 'steering decides' FILE`, 0 exact matches. Nearest: line 587 "steering's to decide."

The cap of 15 passages is applied. The 15 below are chosen to cover every term; the remaining hits are listed by line number above.

1. Line 181-182 (D-33; release essentials):
   > "hard stop did not fire (pass 1 of 15 in this cycle). Pricing: smaller than the ask's remaining steps, by his selection. D-33"
   > "cuts 019 to its release essentials, and revision 26 adds no criterion, milestone or mechanism."
2. Line 2017-2018 (D-33; release essentials):
   > "AC-6.8, and block 14:48Z for AC-6.9. Block 18:02Z sends any AC-4.7 gap to steering before a fold. D-33 (block"
   > "2026-11-25T15:46Z) cuts 019 to its release essentials: no batch fold, no architect closing pass, no effort-final sweep."
3. Line 2004 (D-33):
   > "By D-33 the plan's Planner batch is not folded, so every finding whose landing was the batch's seam fold (the SL rows,"
4. Line 1219 (D-33):
   > "- **Landing trigger**: none in 019, whose batch is not folded (D-33); the sizing document carries it."
5. Line 6 (D-33; PREMISE-STALE):
   > "Cycle 18 pass 1 on plan revision 26, the minimal revision under D-33: APPROVED, and closed at that pass. M7's premise paragraph is read and M7 is no longer PREMISE-STALE."
6. Line 175 (waive; changelog row):
   > "...the architect's closing-pass rows are waived; UAT's nine walks are named; the unfolded Planner batch is carried by the rebuild sizing document..."
7. Line 190 (waive; D-33):
   > "- **The waivers are his.** The selection ledger's block 15:46Z carries both answers, and D-33's option text is the ledger's"
8. Line 254 (PREMISE-STALE):
   > "**M7 is out of scope for this pass** (`PREMISE-STALE`, R-76)."
9. Line 592 (PREMISE-STALE):
   > "**M7 is out of scope for this pass.** It is marked `PREMISE-STALE` (R-76), and its re-argument is owed from the planner as a"
10. Line 327 (cap):
   > "- **The cap is not stretched.** CR-25 is HIGH, and steering's block 19:43Z puts the fence member under D-24 and the paste to"
11. Line 707 (cap):
   > "**F-42** (MEDIUM) is a stated limit under the cap on M6 (effort rulings block 00:49Z): the table leaves three states to the"
12. Line 904 (cap):
   > "- **Steering's revision cap** is recorded as a scope constraint with its date, its reason and what voids it. Its premise"
13. Line 917 (cap):
   > "AC-4.7, checked in this pass, and its one gap is stated limit SL-10 with its bearer. That is also where steering's cap would"
14. Line 587 (nearest to "steering decides"):
   > "steering's to decide."
15. Line 1836 (Revision 7, case-insensitive; F-32 header):
   > "F-32 LOW cycle 2 pass 1 — RESOLVED — `s` and `S` are a marked deviation from `TIMESTAMP_TO_DAYJS_FORMAT`, with the reason and its capture; UTC before mount and the locale follow the sibling. Plan revision 7, AC-4.7."

Not quoted (full hit lists above): cap lines 127, 139, 406, 610, 740, 864, 918, 1983; D-33 lines 6, 176, 196, 1215, 1229, 1241; Revision 7 lines 125, 921, 930, 1173; PREMISE-STALE lines other than 254 and 592 (22 more).

---

## Appendix A: finding raise table (one row per ID)

Severity and raise line are from the finding header. Where an ID has a second header (resolution line), the raise line is the one in the "Closed at cycle N pass M" section that states the raise. F-52's header at 1370 is the cycle 14 pass 1 section line, which states its resolution. No separate raise header exists for it.

| ID | Severity | Cycle | Pass | Changelog row | Header line |
|---|---|---|---|---|---|
| F-1 | HIGH | 1 | 1 | 118 | 1840 |
| F-2 | HIGH | 1 | 1 | 118 | 1842 |
| F-3 | HIGH | 1 | 1 | 118 | 1844 |
| F-4 | MEDIUM | 1 | 1 | 118 | 1846 |
| F-5 | MEDIUM | 1 | 1 | 118 | 1848 |
| F-6 | MEDIUM | 1 | 1 | 118 | 1850 |
| F-7 | MEDIUM | 1 | 1 | 118 | 1852 |
| F-8 | MEDIUM | 1 | 1 | 118 | 1854 |
| F-9 | MEDIUM | 1 | 1 | 118 | 1856 |
| F-10 | MEDIUM | 1 | 1 | 118 | 1858 |
| F-11 | MEDIUM | 1 | 1 | 118 | 1860 |
| F-12 | MEDIUM | 1 | 1 | 118 | 1862 |
| F-13 | MEDIUM | 1 | 1 | 118 | 1864 |
| F-14 | MEDIUM | 1 | 1 | 118 | 1866 |
| F-15 | MEDIUM | 1 | 1 | 118 | 1868 |
| F-16 | MEDIUM | 1 | 1 | 118 | 1870 |
| F-17 | MEDIUM | 1 | 1 | 118 | 1872 |
| F-18 | MEDIUM | 1 | 1 | 118 | 1874 |
| F-19 | LOW | 1 | 1 | 118 | 1876 |
| F-20 | LOW | 1 | 1 | 118 | 1878 |
| F-21 | LOW | 1 | 1 | 118 | 1880 |
| F-22 | LOW | 1 | 1 | 118 | 1882 |
| F-23 | LOW | 1 | 1 | 118 | 1884 |
| F-24 | MEDIUM | 1 | 2 | 119 | 1886 |
| F-25 | MEDIUM | 1 | 2 | 119 | 1888 |
| F-26 | MEDIUM | 1 | 2 | 119 | 1890 |
| F-27 | MEDIUM | 1 | 3 | 120 | 1892 |
| F-28 | MEDIUM | 1 | 3 | 120 | 1894 |
| F-29 | MEDIUM | 1 | 3 | 120 | 1896 |
| F-30 | LOW | 1 | 3 | 120 | 1898 |
| F-31 | LOW | 1 | 4 | 121 | 1838 |
| F-32 | LOW | 2 | 1 | 124 | 1836 |
| F-33 | MEDIUM | 3 | 1 | 127 | 1834 |
| F-34 | LOW | 4 | 1 | 130 | 1794 |
| F-35 | MEDIUM | 4 | 1 | 130 | 1815 |
| F-36 | MEDIUM | 5 | 1 | 133 | 1757 |
| F-37 | LOW | 5 | 1 | 133 | 1778 |
| F-38 | MEDIUM | 6 | 1 | 136 | 1716 |
| F-39 | LOW | 6 | 1 | 136 | 1735 |
| F-40 | LOW | 7 | 1 | 139 | 1695 |
| F-41 | LOW | 8 | 1 | 142 | 1650 |
| F-42 | MEDIUM | 8 | 1 | 142 | 1668 |
| F-43 | LOW | 9 | 1 | 145 | 1615 |
| F-44 | LOW | 9 | 1 | 145 | 1641 |
| F-45 | MEDIUM | 10 | 1 | 148 | 1586 |
| F-46 | MEDIUM | 11 | 1 | 151 | 1542 |
| F-47 | LOW | 11 | 1 | 151 | 1573 |
| F-48 | MEDIUM | 11 | 2 | 154 | 1512 |
| F-49 | MEDIUM | 12 | 1 | 157 | 1480 |
| F-50 | MEDIUM | 13 | 1 | 160 | 1445 |
| F-51 | LOW | 13 | 1 | 160 | 1463 |
| F-52 | MEDIUM | 14 | 1 | 163 | 1370 |
| F-53 | MEDIUM | 14 | 1 | 163 | 1379 |
| F-54 | LOW | 14 | 1 | 163 | 1400 |
| F-55 | MEDIUM | 14 | 1 | 163 | 1414 |
| F-56 | LOW | 14 | 2 | 165 | 1354 |
| F-57 | HIGH | 15 | 1 | 168 | 1302 |
| F-58 | LOW | 15 | 1 | 168 | 1340 |
| F-59 | HIGH | 16 | 1 | 171 | 1259 |
| F-60 | MEDIUM | 16 | 1 | 171 | 1295 |
| F-61 | LOW | 16 | 1 | 171 | 1298 |
| F-62 | LOW | 17 | 1 | 173 | 1246 |
| F-63 | LOW | 18 | 1 | 175 | 1205 |
| F-64 | LOW | 18 | 1 | 175 | 1221 |
| F-65 | LOW | 18 | 1 | 175 | 1231 |
