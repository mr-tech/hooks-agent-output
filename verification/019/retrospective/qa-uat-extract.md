# Extract: QA and UAT records for chain 019 (Slate formatting, Discord engine)

Read-only extraction. No source file was edited. Every line number below was read from the file or taken from a grep over it. Paths are relative to `/usr/local/bin/hooks/agent-output/`.

Files read in full:

| File | Lines | Bytes |
|---|---|---|
| `qa/closed/019-slate-formatting-discord-engine-qa.md` (main QA, Phase 1) | 1962 | 211074 |
| `qa/closed/019-slate-formatting-discord-engine-m2-qa.md` | 171 | 16496 |
| `qa/closed/019-slate-formatting-discord-engine-m3-qa.md` | 336 | 40500 |
| `qa/closed/019-slate-formatting-discord-engine-m4-qa.md` | 143 | 18188 |
| `qa/closed/019-slate-formatting-discord-engine-m5-qa.md` | 184 | 20144 |
| `qa/closed/019-slate-formatting-discord-engine-m6-qa.md` | 526 | 58938 |
| `qa/closed/website-48eb60a-release-tip-qa.md` | 143 | 13663 |
| `uat/closed/019-slate-formatting-discord-engine-uat.md` | 173 | 16578 |

Stated token cost: none of the eight files states a token cost. Stated durations are listed in section 2.

---

## 1. Verdicts and phase passes

### 1.1 Main QA, `qa/closed/019-slate-formatting-discord-engine-qa.md`

No QA verdict is given in this file. It records Phase 1 only, at chain base `af3d95a` (line 63-65). Line 1962: "Phase 1 baseline only: P-Q1 (2696 of 2696, exit 0, offline at `af3d95a`)." Implementation Review: "Not started. Phase 2." (line 1958).

Frontmatter (lines 5-7): `Verified-At: "af3d95a ... Phase 1 baseline only"`, `Status: Committed`, `Status-Detail: "Committed at website 48eb60a ... Register: B-1 to B-4 and B-6 to B-11 executed; B-5 carried by handoff/slate-formatting-link-targets-post-deploy-2026-11-25.md."`

Phase 1 passes (changelog rows, lines 21-46; line 47 is the devops closure):

| Line | Timestamp | Pass | Website SHA | Findings raised |
|---|---|---|---|---|
| 21 | 2026-11-23T16:03 | Phase 1, Revision 1 | af3d95a | QAF-1 HIGH; QAF-2 to QAF-14 (see 1.2) |
| 22 | 2026-11-23T16:32 | Re-key, Revision 2 | af3d95a (record 8dfd4659) | QAF-15 MEDIUM, QAF-16 MEDIUM, QAF-17 LOW |
| 23 | 2026-11-23T17:18 | Re-key, Revision 3 | af3d95a (record 9ac9ba62) | QAF-18, QAF-19 MEDIUM; QAF-20 LOW; QAF-21 MEDIUM; E-4 declined, QAF-22 LOW routed |
| 24 | 2026-11-23T17:27 | Re-key, Revision 4 | af3d95a (record e53c7cdb) | QAF-23 MEDIUM |
| 25 | 2026-11-23T17:31 | Re-key, Revision 5 | af3d95a (record d2912590) | none |
| 26 | 2026-11-23T17:51 | Re-key, Revision 6 | af3d95a (record 946d4e54) | QAF-24 MEDIUM, QAF-25 MEDIUM |
| 27 | 2026-11-23T17:56 | Re-key, Revision 7 | af3d95a (record e0eb1e87) | QAF-26 MEDIUM, QAF-27 LOW |
| 28 | 2026-11-23T18:01 | Re-key, Revision 8 (AC-4.7) | af3d95a (record 7b419f5b) | QAF-28 MEDIUM |
| 29 | 2026-11-23T18:05 | Re-key, Revision 9 (AC-4.7 delta) | af3d95a (record 47348a6d) | none |
| 30 | 2026-11-23T21:43 | Re-key, Revision 10 (AC-4.4) | af3d95a (record 890d0b78) | QAF-31 LOW |
| 31 | 2026-11-23T21:44 | Revision 10 registrations | (record 223d3911) | none new; QAF-31 marked duplicate of critic F-34 |
| 32 | 2026-11-23T22:31 | Re-key, Revision 11 (AC-3.7) | af3d95a (record ec2440d9) | QAF-34 MEDIUM, QAF-35 LOW |
| 33 | 2026-11-23T22:36 | Re-key, Revision 12 | af3d95a (record b0af4dc3) | none; QAF-34, QAF-35 closed |
| 34 | 2026-11-23T22:39 | Revision 12 stated limits | (record d130532a) | none (SL-12, SL-13) |
| 35 | 2026-11-23T22:49 | M3 pass register row | (M3 pass) | none; B-8 appended |
| 36 | 2026-11-24T04:16 | Re-key, Revisions 13 and 14 | 2e36107 for the reads (record f9b406d6, 2c3c8d1a) | QAF-40 MEDIUM, QAF-41 LOW; B-9 minted |
| 37 | 2026-11-24T04:20 | Re-key, Revision 15 | (record 79eeced6) | QAF-42 LOW (QAF-40, QAF-41 closed) |
| 38 | 2026-11-24T07:10 | Re-key, Revision 16 (AC-6.8) | 119471f reads (record 30e2a5b8) | QAF-43 MEDIUM, QAF-44 LOW; B-10 minted |
| 39 | 2026-11-24T07:22 | Re-key, Revisions 17 and 18 | 119471f (records 34850209, 18e434e6) | none (QAF-43, QAF-44 closed) |
| 40 | 2026-11-24T07:25 | Re-key, Revision 19 | (record 4a68f286) | QAF-45 LOW |
| 41 | 2026-11-24T07:45 | Re-key, Revision 20 | (record cf7e4d91) | none |
| 42 | 2026-11-24T14:48 | Re-key, Revision 21 (AC-6.9) | 42128cd (record 81523bd6) | QAF-52 MEDIUM; B-11 minted |
| 43 | 2026-11-24T17:11 | Re-key, Revision 22 | (record 960052d1) | none (QAF-52 closed) |
| 44 | 2026-11-24T20:12 | Re-key, Revision 23 | 85ece66 counts (record 49a20690) | QAF-53 MEDIUM, QAF-54 LOW |
| 45 | 2026-11-25T06:04 | Re-key, Revision 24 | a7ad3f2 (record 80d6d143) | QAF-55 MEDIUM |
| 46 | 2026-11-25T06:18 | Re-key, Revision 25 | (record cf62ffc1) | none (QAF-55 closed) |
| 47 | 2026-11-25T17:10 | devops-019 document closed | 48eb60a | none |

Phase 1 closure text: lines 1868-1869 say "Later stage documents (the UAT document, then the deployment record and its Stage 1 handoff) are authoritative on each row's execution state."

### 1.2 Main QA findings (QAF-n, severity, title, line)

| QAF | Severity | Title (short) | Line |
|---|---|---|---|
| QAF-1 | HIGH | AC-3.2 membership decided by adapter's token map | 272 |
| QAF-2 | MEDIUM | AC-3.1 oracle parse uses adapter mask | 281 |
| QAF-3 | MEDIUM | AC-2.5 has no resolved-state limb | 286 |
| QAF-4 | MEDIUM | Mask 0 means ALL; DEV_LINKS per surface | 293 |
| QAF-5 | MEDIUM | AC-4.2 href has no scheme guard | 300 |
| QAF-6 | MEDIUM | Frozen literals vs test:discord; normaliser second instrument | 307 |
| QAF-7 | MEDIUM | AC-4.3 omits identical duplicate timestamps | 318 |
| QAF-8 | MEDIUM | Corpus size is not an enumeration of the class | 324 |
| QAF-9 | LOW | AC-3.3 settle limb is absence-of-throw only | 331 |
| QAF-10 | MEDIUM | Wasm content-type not recorded; Firefox and Safari | 336 |
| QAF-11 | LOW | Link inputs existed only in scratch; 106 distinct | 342 |
| QAF-12 | LOW | AC-6.2 emoji forms incomplete | 348 |
| QAF-13 | LOW | "Offline" undefined | 353 |
| QAF-14 | LOW | AC-2.6 grep needs -r; zero holds trivially | 357 |
| QAF-15 | MEDIUM | AC-2.5 pending state unbounded for a hung fetch | 415 |
| QAF-16 | MEDIUM | AC-3.3 typed limb does not say where text is read | 425 |
| QAF-17 | LOW | AC-4.6 refusing control is invented engine output | 433 |
| QAF-18 | MEDIUM | AC-3.2 live limb runs served wasm, not pinned | 505 |
| QAF-19 | MEDIUM | AC-3.7 residue membership decided by predicate only | 515 |
| QAF-20 | LOW | AC-4.7 R case depends on live clock | 523 |
| QAF-21 | MEDIUM | AC-6.5 expected spans computed by code under test | 529 |
| QAF-22 | LOW | RK-2 slower-CPU re-run has no owner | 537 |
| QAF-23 | MEDIUM | AC-6.5 typed-edit differential holds no emoji | 605 |
| QAF-24 | MEDIUM | AC-6.5 helper control cannot fail on url variant | 694 |
| QAF-25 | MEDIUM | AC-4.7 test relies on host locale and zone | 707 |
| QAF-26 | MEDIUM | AC-4.7 CF-13 branches have no failing assertion | 770 |
| QAF-27 | LOW | AC-4.3 no s/S member before the edited timestamp | 793 |
| QAF-28 | MEDIUM | AC-4.7 unloaded-tag fixture (ja-JP) wrong on site | 835 |
| QAF-31 | LOW | AC-4.4 residue lists forums; duplicate of F-34 (SL-11) | 950 |
| QAF-34 | MEDIUM | AC-3.7 measured population is atom-free inputs only | 1029 |
| QAF-35 | LOW | AC-3.7 family claims ungated | 1043 |
| QAF-40 | MEDIUM | AC-6.5 helper cannot give spans for shared-text or escape members | 1122 |
| QAF-41 | LOW | AC-6.7 exclusion conjuncts have no mutant | 1153 |
| QAF-42 | LOW | AC-3.3 drive presses Enter only between lines | 1214 |
| QAF-43 | MEDIUM | AC-6.8 count limb is an upper bound only | 1274 |
| QAF-44 | LOW | AC-6.8 sized texts hold no emoji element | 1284 |
| QAF-45 | LOW | AC-6.8 keystroke changing quote structure outside class | 1370 |
| QAF-52 | MEDIUM | AC-6.9 `>>>` keystroke expected points unreachable in marker model | 1452 |
| QAF-53 | MEDIUM | AC-6.9 paste cost per line not bounded (severity floor) | 1614 |
| QAF-54 | LOW | AC-6.9 count positive control does not show each line | 1641 |
| QAF-55 | MEDIUM | AC-6.9 inline-code members freed from cost limbs (severity floor) | 1759 |

QAF-29 to QAF-30 (M2), QAF-32 to QAF-33, QAF-36, QAF-38 (M3), QAF-37 (M4), QAF-39 (M5), QAF-46 to QAF-51 and QAF-56 (M6) are in their own files (sections 1.3 to 1.8). QAF-1 to QAF-56 are all accounted for across the eight files.

### 1.3 M2, `qa/closed/019-slate-formatting-discord-engine-m2-qa.md`

Phase 2, milestone-scoped.

| Line | Timestamp | SHA | Verdict | Findings |
|---|---|---|---|---|
| 23 | 2026-11-23T19:35 | 78c5f74 | **QA Failed** (verdict section, line 157) | QAF-29 MEDIUM (AC-2.4 modifier kind not mapped); QAF-30 LOW (BITS test non-discriminating) |
| 24 | 2026-11-23T19:49 | 7dcedc9 (refresh, `78c5f74..7dcedc9`) | **QA Complete**, M2 (verdict line 150-154) | QAF-29 and QAF-30 closed (lines 142-148) |

QAF-29 title line: "QAF-29 MEDIUM Phase 2" at line 94. QAF-30 title line: "QAF-30 LOW Phase 2" at line 111.

### 1.4 M3, `qa/closed/019-slate-formatting-discord-engine-m3-qa.md`

Phase 2, milestone-scoped. Four passes.

| Line | Timestamp | SHA | Verdict | Findings |
|---|---|---|---|---|
| 24 | 2026-11-23T22:48 | 2c1590f | **QA Failed** (verdict 127-129) | QAF-32 MEDIUM (AC-3.5 no pass count); QAF-33 MEDIUM (drift report not written) |
| 25 | 2026-11-24T01:08 | e58f2ed (contains 380e82d) | **QA Failed** on QAF-36 (verdict 205-209) | QAF-32 closed (line 123, 192); QAF-33 write limb closed (line 125, 199); QAF-36 MEDIUM raised (line 203) |
| 26 | 2026-11-24T02:11 | d6aab03 | **QA Failed** on QAF-38 (verdict 271-274) | QAF-36 closed (line 203, 240); QAF-38 MEDIUM raised (line 244) |
| 27 | 2026-11-24T02:50 | 81c68b2 | **QA Complete**, M3 (verdict 317-319) | QAF-38 closed (line 307-315) |

QAF-32 title line 123. QAF-33 title line 125. QAF-36 title line 203. QAF-38 title line 244.

### 1.5 M4, `qa/closed/019-slate-formatting-discord-engine-m4-qa.md`

Phase 2, milestone-scoped.

| Line | Timestamp | SHA | Verdict | Findings |
|---|---|---|---|---|
| 26 | 2026-11-24T01:10 | e58f2ed | TDD gate **rejected** (no suite run for the verdict) | none raised; five rows lacked test-first red (lines 50-64) |
| 27 | 2026-11-24T01:27 | e58f2ed (gate reopened on stub-tree records) | **QA Complete**, M4 (verdict 124-127) | QAF-37 LOW (line 103), stated limit |

Reconciles: line 115-118 (M5 moved four M4 paths, verdict binds to e58f2ed); line 119-123 (differential at 2e36107, verdict re-anchored).

### 1.6 M5, `qa/closed/019-slate-formatting-discord-engine-m5-qa.md`

Phase 2, milestone-scoped.

| Line | Timestamp | SHA | Verdict | Findings |
|---|---|---|---|---|
| 26 | 2026-11-24T04:12 | 2e36107 | **QA Failed**, M5 (verdict 128-133) | QAF-39 MEDIUM (quote prefix, severity floor; title line 111) |
| 27 | 2026-11-24T05:19 | cf126ea test paths over 2e36107 | **QA Complete**, M5 (verdict 172-176) | QAF-39 closed (line 169-170) |

### 1.7 M6, `qa/closed/019-slate-formatting-discord-engine-m6-qa.md`

Phase 2. Three passes plus a stopped pass.

| Line | Timestamp | SHA | Verdict | Findings |
|---|---|---|---|---|
| 25 | 2026-11-24T06:58 | 119471f | TDD gate **rejected** (line 46) | none; no suite run |
| 26 | 2026-11-24T07:57 | 119471f | **QA Failed** (verdict 232-252) | QAF-50 MEDIUM (line 206); QAF-46 LOW (177), QAF-47 LOW (184), QAF-48 LOW (190), QAF-49 LOW (200); AC-6.8 fails at 119471f (line 168) |
| 27 | 2026-11-24T09:14 | af3d95a and 42128cd (probe only, no browser verdict) | none | QAF-51 LOW (line 216), pre-existing |
| 28 | 2026-11-24T09:32 | 42128cd | Testing in progress | none |
| 29 | 2026-11-24T14:35 | 42128cd | **Stopped**, no verdict published; status returns to QA Failed at 119471f | none |
| 30 | 2026-11-25T12:37 | 48eb60a | Testing in progress | none |
| 31 | 2026-11-25T15:48 | 48eb60a | **QA Complete**, M6 at 48eb60a (verdict 480-505) | QAF-56 MEDIUM (line 417), stated limit; sweep waived |

QAF-56 is titled at line 417 ("QAF-56 MEDIUM Phase 2"). The 42128cd results (lines 300-357) carry "No new QAF" (line 355-356).

### 1.8 Release-tip QA, `qa/closed/website-48eb60a-release-tip-qa.md`

Phase 3, release tip.

| Line | Timestamp | SHA | Verdict | Findings |
|---|---|---|---|---|
| 27 | 2026-11-25T16:59 | 48eb60a (tree f50f8aa4) | **Release Verified** (verdict 127-129) | none; B-6 EXECUTED, PASS (line 60-63) |
| 28 | 2026-11-25T17:40 | 48eb60a | Release closure, Status Released, pushed 2026-11-25T17:39Z (frontmatter line 7) | none |

Step 1b handoff sweep (lines 65-91): none holds the release.

### 1.9 UAT, `uat/closed/019-slate-formatting-discord-engine-uat.md`

| Line | Timestamp | SHA | Verdict | Findings |
|---|---|---|---|---|
| 8 (Release-Decision) and 21 | 2026-11-25T16:31 | 48eb60a | **APPROVED FOR RELEASE** (lines 146-156) | UAT-1 LOW, pre-existing (line 99); UAT-2 LOW, local-build instrument limit (line 107) |
| 22 | 2026-11-25T17:10 | 48eb60a | devops document closed | none |

---

## 2. Manual testing, manual setup, checks put to the owner

Columns: what was done; stated duration or token cost; script or runner used; line numbers.

### 2.1 Main QA

| What | Duration or cost stated | Runner or script | Lines |
|---|---|---|---|
| Measured baseline in `git archive af3d95a` export, `node_modules` copied with `cp -a` | none | `git archive`, `tar`, `cp -a` | 65-68 |
| P-Q1 offline suite run under `unshare -rn`, `lo` up | none | vitest JSON reporter | 72 |
| P-Q1c control with loopback down: 2681 of 2696, exit 1 | none | vitest in namespace | 73 |
| P-Q12 reachability by `curl` (discord.com/app, registry.npmjs.org) | none | `curl -s -o /dev/null -w %{http_code}` | 84 |
| P-Q13 stage-browser read of production `hooks.gg/message/m/0/edit`, typed link, blur, read `a[href]`; nothing saved or sent | none | manual browser (Chrome stage profile) | 85 |
| P-Q8 scratch recovery of 107 link rows (106 distinct) | none | `ls`, `node` count | 80 |
| EC-4 typing cost: 272 inputs typed into mounted `SlateEditor` | "272 inputs in 3.77 s"; "1.12 ms per character"; headless "2.85 s" | jsdom probe `typing-cost.probe.v2.test.tsx.txt`, `act(() => editor.insertText(ch))` | 404-411 |
| QA walk of Discord's rendering for the `> ` quote column (`discord-quote-probe/walk.md`, record 1e84abe1) | none | manual walk | 1176-1177 |
| B-11 instrument run at 42128cd by browser-walker (`verification/019/qa/phase1-rev21/walk/`, `run-K*.js`) | none | browser-walker helper, `run-K*.js` | 1494-1502 |
| K1b predicted from mounted capture, not run in a browser | none | not run | 1572-1573 |
| P-Q26 mounted-editor limb probe at 42128cd, blob-identical export 680 of 680, `unshare -rn`, exit 0 | none | `qaFenceLimbs.probe.test.tsx.txt` | 1419-1426 |
| P-Q22 keystroke cost, both trees, loads 2.4 to 2.8, median of 10 after 2 warm-ups | none | `qaNormalizeCost.{base,tip}.probe.test.ts` | 1239-1253 |
| P-Q23, P-Q24, P-Q25 probe `qaMergeDirties.probe.test.ts` with `vi.mock` pass-through | none | probe at 119471f | 1310-1316, 1364-1368, 1389-1394 |
| K4 minting walk: stage browser, export 685 of 685, frozen offline install, `next build` exit 0, served on 127.0.0.1:3107, local stack up, nothing saved | none | browser-walker helper, `run-K4.js`, `K4-steps1-4.json` | 1803-1818 |
| Instrument defect found at K4 minting: closing JSON view leaves editor out of edit mode | none | — | 1814-1816 |
| AN-2 capture re-read (analysis, not QA run): 150 of 150 formatted, minimum margin 519.7 ms (warm) | none | analysis puppeteer, `an2-capture.js` | 463-464, 492-494 |
| RK-2 4x CPU re-run assigned to analyst or UAT (QAF-22) | none | `an2-capture.js` at 4x throttle | 537-541 |

Checks put to the owner (search terms "owner", "his", "selection"):
- Line 1587: "the paste under his selection D-26 (block 20:07Z)".
- Line 1679: "his selection 'Agent: time it at QA (Recommended)', 20:54Z" (QAF-53 resolution).
- Line 1733: "It answers D-28 (his selection 05:28Z)".
- Line 1825: "It is his D-29 to D-31 (block 06:14Z, record a7b6ee15)".
- Line 1876: "his link report (D-2) is unfixed" (B-2 falsity).
- Line 1879: "his report, D-2" (B-5).
- Line 1881: "his selection buys him nothing" (B-7 falsity).
- Line 1909 and 1928: "Owner: uat" assumptions.

### 2.2 M2

| What | Duration or cost stated | Runner or script | Lines |
|---|---|---|---|
| `pnpm install --frozen-lockfile` in `git archive 78c5f74` export | none | pnpm | 67 |
| Offline suite `unshare -rn`, `lo` up: 3026 of 3026, exit 0 | none | vitest JSON | 68 |
| `pnpm run typecheck` before and after build (exit 2 then 0) | none | tsc, `next build` | 69-70 |
| `next build` tip and control, `SKIP_ENV_VALIDATION=1` | none | next | 71 |
| Convention checks by hand on nine test and helper files; planted control gives 2 | none | by hand; `conventions-by-hand-78c5f74.txt` | 72 |
| AC-2.6 notice-in-chunk control: remove `startEngine.notice` line, `grep -c` over `.next/static` | none | `m2/run-m2.sh`, `m2/notice-in-chunks.out` | 60 |
| Refresh at 7dcedc9: frozen install, offline 3041 of 3041, build, typecheck, notice re-read | none | vitest | 133-135 |
| QM-1 (spoiler removed) red on 3 cases; QM-2 (BITS.SPOILER changed) red | none | production-file mutants by script | 136-137 |

Owner checks: none. Steering's Phase 2 brief "has not arrived" (line 23).

### 2.3 M3

| What | Duration or cost stated | Runner or script | Lines |
|---|---|---|---|
| Export of 2c1590f, blob identity 642 of 642 | none | `git archive`, `git ls-tree` | 36-37 |
| Offline suite `unshare -rn`: 3348 of 3348, exit 0 | "68 s wall time" (line 83) | vitest JSON | 68, 83-85 |
| Typecheck with Next's `next-env.d.ts` copied in | none | tsc | 69 |
| Live `discord-node` and `discord-dom` run with network: 38 of 38, exit 0 | none | vitest | 70 |
| `pnpm test:discord` offline: exit 1, names `https://discord.com/app` | none | vitest | 73 |
| QA drift probe (`qaDriftProbe.print.test.ts`): served and pinned both `da7b9e5e…57fb0` | none | vitest | 74 |
| `convention-check.js` run; 1 FAIL and 3 CANDIDATE, all in M4 files | none | `node ~/.claude/tools/convention-check.js` | 75 |
| ID-token scan by hand over 52 test paths; control 2 of 3 | none | script `id-token-scan-2c1590f.txt` | 76 |
| AC-3.4 mutation run, 29 product mutants, 22 KILLED, 7 SURVIVED | none | `mutation-run.py` | 77 |
| Destructive-command check stopped one `rm` command; re-issued with literal path (disclosed) | none | Claude Code built-in check | 79-81 |
| Refresh at e58f2ed: offline 3,454 of 3,454 in 69 s, live 41 of 41 | "69 s wall time (start 01:04:29Z, end 01:05:38Z)" | vitest | 186-188 |
| Refresh at d6aab03: offline 3,268 in 86 s | "86 s (02:08:43Z to 02:10:09Z)" | vitest | 234 |
| Refresh at 81c68b2: offline 3,272 in 89 s | "89 s (02:45:43Z to 02:47:12Z)" | vitest | 301 |
| QA drift mutants, 3 of 3 KILLED at d6aab03 | none | `mutation-run.py` | 237 |
| QA routing mutants, 0 of 6 killed at d6aab03; 6 of 6 killed at 81c68b2 | none | `mutation-run.py` | 238, 305 |
| Gate record-write hook: Python script stamped R-58 row, then Edit tool | none | Python, Edit | 329-332 |

Browser: none run. B-8 registered for Chrome paste (line 93, 142-143).
Owner checks: none. The M3 cap is from "effort rulings block 22:35Z" (line 117).

### 2.4 M4

| What | Duration or cost stated | Runner or script | Lines |
|---|---|---|---|
| Frozen offline install in `git archive e58f2ed` export, exit 0 | none | pnpm `--offline` | 40 |
| Offline suite 3,454 of 3,454 (refresh) | none | vitest, from M3 refresh export | 70 |
| Live `discord-node` and `discord-dom` 41 of 41 | none | vitest, network | 71 |
| `SKIP_ENV_VALIDATION=1 pnpm run build` exit 0 | none | next | 73 |
| AC-2.6 chunk read with M2's `probe-notice-in-chunks.sh` | none | shell script | 74 |
| QA probe R-44 exclusion set: 402 by pattern and 402 by walk | none | `qaExclusionProbe.print.test.ts` | 75 |
| QA probe AC-4.2 link-by-emoji class: 1050 inputs, 0 offending | none | `qaLinkEmojiProbe.print.test.tsx` | 76 |
| QA product mutants, 3 of 3 KILLED | none | `mutation-run.py` | 77 |
| QA instrument mutants, 2 of 2 KILLED | none | `mutation-run.py` | 78 |
| ID-token scan by hand over 32 test files | none | script | 79 |

Browser: none. Line 94: "Clicking a rendered link in a real browser is not exercised, and no criterion asks for it."
Owner checks: none.

### 2.5 M5

| What | Duration or cost stated | Runner or script | Lines |
|---|---|---|---|
| Three exports of 2e36107, 668 of 668 blobs, frozen offline install | none | `git archive`, pnpm | 40-43 |
| Offline suite 3,280 of 3,280 | "71 s" (line 72) | vitest | 72 |
| `SKIP_ENV_VALIDATION=1 pnpm run build` with network exit 0; network-isolated first run failed on `next/font` fetch of Inter | none | next | 76 |
| M4 differential: `qaPreviewDump.probe.test.tsx`, 14,280 rows, 0 differ; control 2,356 | none | vitest probe | 77 |
| QAF-39 probe `qaQuotePrefix.probe.test.ts`, 8 rows differ | none | vitest probe | 78 |
| Case-count reconcile by path membership | none | script | 82 |
| `preview.engine-not-ready` isolated run five times, 5 of 5 pass | none | vitest isolated runs | 85-89 |
| Median timing of `decorator.one-parse-per-unit`: 4.87 ms over 20 runs | "4.87 ms over 20 runs" | vitest bench-style | 101 |
| Refresh at cf126ea test paths over 2e36107 | none | overlay of four test paths | 148-180 |
| One read not completed, re-issued as exact-path reads | none | — | 49-50 |

Browser: none. AC-5.5 is UAT's B-3 walk (line 99).
Owner checks: none.

### 2.6 M6

| What | Duration or cost stated | Runner or script | Lines |
|---|---|---|---|
| Export of 119471f with frozen offline install; 677 of 677 blobs | none | `git archive`, pnpm | 40-41, 106-107 |
| Suite timing: 2e36107 70.6 s; 119471f 141.9 s; base 31.1 s | "141.9 s" against "31.1 s" | `/usr/bin/time` | 120, 160 |
| Keystroke cost at field limits, both trees | "433 ms" and "1,798 ms" at 119471f | `normalize-cost-limits-*.json` | 121 |
| Typed-generated file alone | "41.4 s and 137.8 s" (line 120); "33.8 s" at 42128cd (line 314) | vitest | 120, 314 |
| Effort-final mutation sweep, 451 mutants, two shards, `mutation-run.py` | "at most 900 s per run" (line 331) | `mutation-run.py`, `sweep-driver.sh` | 101-105, 327-353 |
| Sweep withdrawn at 119471f (controls failed under load), unscored | none | `sweep-driver.sh` | 101-105 |
| Browser-walker helper: Chrome paste 1,000 lines, six rounds per build, interleaved, at 127.0.0.1:3107 and :3108 | "tip 1,422 to 1,558 ms (median 1,500), base 1,268 to 1,479 ms (median 1,326)" | browser-walker, `walk/run-paste.js` | 452 |
| Browser drag: native drag moved nothing; synthetic `dragstart`/`drop` moved text on both builds | none | `walk/run-drag.js`, `run-drag-synthetic-310{7,8}.js` | 453 |
| Browser caret walk at 42128cd, two `next start` builds, local stack, no save | none | `fix/browser/gt-caret-walk.js`, `uat-local-stack.sh` | 325 |
| AC-6.8 bench, six rounds; round 1 read 17.1 ms and hung until a 25-minute kill (exit 124) | "25-minute kill" (line 454) | `vitest bench`, `withNormalizeNode.keystroke-time.bench.ts` | 454 |
| AC-6.8 bench planted at `FRAME_MS` 0.001, 150 s cap, exit 124 | "150 s cap" (line 320) | vitest bench | 320 |
| `emoji-set-equals-the-engines` 8 of 8 | "14.8 s" (line 164) | vitest | 164 |
| Fix Round 6 bench and fence-and-quote bench, two rounds | none | `vitest bench` | 455 |
| Local stack `uat-local-stack.sh` and ids from 900000000000001; no save | none | `uat-local-stack.sh` | 325 |
| Keystroke-time round 1 under load 1.29, p95 60 ms | "p95 60 ms" (line 420) | load recorded in `loads.txt` | 420, 454 |

Browser walks in M6: lines 325, 452, 453, 455. The planned browser checks for round 8 and round 9 are in the main QA file at lines 1715-1720 and 1722 (not in M6).
Owner checks:
- Line 302: "The owner selected a fix inside 019, before release, for the code-fence normalise throw ... and for CR-23."
- Line 298: "CR-23 (the fence-close cost) is with steering for the owner's word."
- Lines 458-462: the owner's waiver, rulings block "2026-11-25T15:46Z" (record 95913e2e). Quoted words at line 460-461: "Is there much value in maintaining the mutation sweeps since we're just going to be rebuilding? In fact, we should only be doing the bare minimum on 019 now." He chose "Agent: stop the sweep (Recommended)".
- Line 31: "steering-hooks-fixer (message: the owner's waiver of the effort-final sweep, rulings block 15:46Z, record 95913e2e)".

### 2.7 Release-tip QA

| What | Duration or cost stated | Runner or script | Lines |
|---|---|---|---|
| Export `x48p` of 48eb60a, 686 of 686 blobs; install `pnpm install --frozen-lockfile --offline` exit 0 | none | `run-phase3.sh`, `run-phase3-bench.sh` | 43-46 |
| `next typegen` (offline) wrote `next-env.d.ts`; typecheck exit 0 | none | next typegen | 52 |
| Offline `pnpm test`: 4,785 of 4,785, exit 0, 238 files | "74.5 s" (line 54) | vitest JSON | 53-54 |
| Live `pnpm test:discord`: 41 of 41, exit 0 | none | vitest, network | 55 |
| Offline `pnpm test:discord`: exit 1, loud, C1 by construction | none | vitest | 56 |
| Full count `MOUNTED_GENERATOR_COUNT=1000`: 17 of 17, exit 0 | "95.4 s" (line 57) | vitest | 57 |
| Bench `keystroke-time` (14 rows, 200 to 2,048 lines) and `fence-and-quote-time` (7 of 7) | none | `vitest bench`, one round each | 58 |
| AN-3 re-read: test bot posted two messages (embed, V2 text) to `#slate-oracle-walk` with AN-3's poster script, no pings | none | `an3-post.py`, `qaAn3Reread.probe.test.ts.txt`, `an3-compare.py` | 98-112 |
| Stage Chrome, signed in as test account, DOM captured; no challenge; nothing typed or sent | none | manual browser | 110-112 |
| Instrument error: in-page classifier read DIFFER on both surfaces (case-sensitive `/mention/`) | none | `an3-dom.json`, `an3-compare.py` | 118-121 |
| Browser closed; profile lock had no holder; caches emptied | none | — | 125 |

Owner checks: none. Devops asked for the AN-3 re-read "by message" (line 98-99).

### 2.8 UAT

| What | Duration or cost stated | Runner or script | Lines |
|---|---|---|---|
| `pnpm build` in place, capped scope (8 GB), BUILD_ID `2Mpu4y52pbn9VWlrEvGXa` | none | `next build` | 32 |
| `next start -H 127.0.0.1 -p 3000` | none | next | 33 |
| Local Postgres via `tools/uat-local-stack.sh up` (schema pushed, ids from 900000000000001), removed with `down` | none | `uat-local-stack.sh` | 34-35 |
| Browser walks in stage Chrome (kept profile), `browser-walker` helper, three runs; one look of UAT's own (UAT-1) | none | browser-walker helper | 48-49 |
| B-1 Firefox limb (Playwright Firefox 144.0.2) | none | `walk/b1-firefox.js` | 50, 56 |
| B-1 Slow 4G: CDP 562.5 ms / 180 kB/s, cache off; editor shown at 18,972 ms; `/preview` strong at 14,004 ms | "18,972 ms", "14,004 ms" | CDP | 57 |
| B-1 Chrome wasm blocked and unblocked | none | browser-walker | 54-55 |
| B-2 link targets typed in content editor | none | browser-walker | 59 |
| B-3 comparator, planted control (case 104), then 65 cases, 786 characters, 0 differ | none | `B-3-run.json`, comparator probe `b3-node-dump.test.ts.txt` | 60-61, 85-86 |
| B-4 sign-in as test account; guild call needed UAT-2 cookie copy | none | browser-walker, cookie fixture | 62-65, 110-112 |
| B-7 limb 1 (signed in) and limb 2 (`/preview`) | none | browser-walker | 66-67 |
| B-8 Ctrl+V paste, full mode (three inputs) and refused pastes (6,001 chars; title with newline) | none | browser | 68-69 |
| B-9 (1) Enter, (2) paste, (3) Backspace gesture | none | browser | 70-72 |
| B-10 2,000 lines, ten keys at end of line 999, keydown to paint; "54 to 67 ms per key" | "54 to 67 ms per key" (line 73) | browser | 73, 88 |
| B-10 earlier attempts placing caret with ArrowDown ×999 not counted | — | — | 88 |
| B-11 K1a, K1b, K2, K3, K4, ten runs for K4 | none | `run-K*.js` | 74-78 |
| UAT-1 Ctrl+A then Delete over `> pq`; prod and local both save `"> "` | none | browser; prod read of unsaved new message | 99-105 |
| UAT-2 cookie name mismatch over http; fixture copies session cookie in test browser | none | — | 107-113 |
| Tools and browser closed on exit; port 3000 free; containers removed | none | `ps`, `down` | 34-37 |

Owner checks: line 27-28 "QA's effort-final mutation sweep was not run, on the owner's waiver"; line 133-134 "The owner's rulings put the editor's rebuild after 019."

---

## 3. Mutation testing (counts as stated, with lines)

Only counts that the files state are given. No file states a token cost.

**3.1 Main QA (Phase 1).** No mutation run. Named mutants defined: NM-1 to NM-88.

| Mutant range | Defined at | Note |
|---|---|---|
| NM-1 to NM-26 | 207-232 | Named mutant list |
| NM-27 | 233, 946 | Re-keyed: "a mention in any state renders empty" |
| NM-28 | 234 | Oracle membership |
| NM-29 | 391 | Unmapped kind renders nothing |
| NM-30 | 396 | Stale-cache mutant for AC-5.7 |
| NM-31 | 478 | Title/field-name mask with url |
| NM-32 to NM-35 | 482-484 | Timestamp styles, spoiler, run unit |
| NM-36 to NM-38 | 600-601 | Load, edit and emoji display |
| NM-39 to NM-42 | 595-600 | GAME_MENTION mask, box fail, residue signature, edit re-decide |
| NM-43 | 688 | Locale and zone |
| NM-44 | 703 | Helper ignores mask |
| NM-45 to NM-46 | 773-776 | Pre-mount UTC; locale from LoadLocale |
| NM-47 | 799 | Replace regex left at `[tTdDfFR]` |
| NM-48 to NM-57 | 936-946 | Mention lookup and surface wiring |
| NM-58 to NM-64 | 1017-1025 | Residue check |
| NM-65 to NM-67 | 1079-1081 | Atom unit |
| NM-68 to NM-69 | 1155-1156 | Quote carry |
| NM-70 | 1262 | Unit cache keyed on line index |
| NM-71 | 1336 | Resolve per line again |
| NM-72 | cited 1326, 1353 | Resolve first changed unit only; dispositioned equivalent |
| NM-73 to NM-77 | 1479-1488 | No-throw, write, caret, growth |
| NM-78 to NM-80 | 1560-1562 | Caret and budget |
| NM-81 to NM-82 | 1654-1656 | Count memory; settle off mocked boundary |
| NM-83 to NM-84 | 1709-1710 | Forced-normalise observation |
| NM-85 to NM-87 | 1777-1787 | Timer, corpus differential, inline-code |
| NM-88 | 1855-1856 | Per-operation settle, inline-code count |

Statement at 934 and 1015: "Named mutants added (each seen red before its test counts; seeded at M4's Phase 2 sweep)." No kill counts appear in the main file.

**3.2 M2.** "No mutation sweep was run at this milestone" (line 74). "the implementer's 26 named mutants, 25 killed and M2-20 closed by tightening" (line 76). "the review's 8 probes, all killed on their own case" (line 77). Refresh: QM-1 red (line 136), QM-2 red (line 137).

**3.3 M3.**
- AC-3.4 product mutants: 29; 22 KILLED, 7 SURVIVED, 0 stillborn or aborted (line 77). Survivors dispositioned at lines 107-113: G8, W7, G5, G7, W12, W8, W9.
- QA drift mutants at 2c1590f/e58f2ed: "exit 0, 15 of 15 passed: SURVIVED" (line 190).
- QA drift mutants at d6aab03: 3 of 3 KILLED (line 237).
- QA routing mutants at d6aab03: 0 of 6 killed (line 238).
- QA routing mutants at 81c68b2: 6 of 6 KILLED (line 305).

**3.4 M4.**
- QA product mutants: 3 of 3 KILLED (line 77).
- QA instrument mutants: 2 of 2 KILLED (line 78).
- Self-check sweep: 71 mutants at 771c64f, 10 survivors; 9 re-run; six killed; one QA-killed (QA-S1); three equivalent (line 99).

**3.5 M5.**
- m5-d2 survivor: QA probe 8 rows differ (line 78); at cf126ea test paths, KILLED on x8 (line 167).
- G5 KILLED; W12 SURVIVED (line 79, 104).
- Inline-code mutants: 2 of 2 KILLED (line 80).
- Self-check: "Eight agreed. m5-d2 ... is not equivalent" (line 107).

**3.6 M6.**
- QA hand mutants: 13 of 15 KILLED, survivors W9 and W12 (line 125; table 136-150).
- Sweep pass 1 (stated at line 334-335, under the section headed "stopped, unscored", line 327): "402 KILLED, 48 SURVIVED, 1 ABORTED of 451".
- Sweep pass 2 (line 339-340): "0 killed, 39 survived, 1 aborted" (stopped after 40 of 49).
- Sweep not run at 48eb60a on owner's waiver; partial pass-1 tables not scored (lines 463-470).
- Earlier stated: "Hand mutants: 13 of 15 killed, W9 and W12 survive" (line 26).

**3.7 Release-tip and UAT.** No mutation sweep. UAT line 27-28: "QA's effort-final mutation sweep was not run, on the owner's waiver."

---

## 4. Register rows B-1 to B-11

Source: register table, main QA lines 1875-1885. QA states all rows "open" in that table. Execution states are in the UAT document (lines 54-78) and release-tip document (lines 60-63), as the register itself says (lines 1868-1869).

| ID | Description (one line) | How executed | Result |
|---|---|---|---|
| B-1 | AC-2.5: plain text shows while wasm blocked; formatted once loaded | QA spec (1875): devtools block of `.wasm` on local prod build, Chrome and Firefox, Slow 4G. UAT (54-58): Chrome blocked/unblocked via browser-walker; Firefox via `walk/b1-firefox.js`; Slow 4G via CDP | QA: open (1875). UAT: PASS (54-58). Editor shown 18,972 ms; `/preview` strong 14,004 ms (57) |
| B-2 | AC-4.2: link targets keep their emoji | QA spec (1876): type `https://x.y🙂 [a](https://x.y/🙂)` in content editor, read `a[href]`. UAT (59) | QA: open. UAT: PASS; exactly the two expected hrefs, no `slight_smile` |
| B-3 | AC-5.5: Chrome colours match jsdom class lists on 65 AN-6 cases | QA spec (1877): captures compared per character. UAT (60-61): comparator with planted control at case 104, then 65 cases | QA: open, depends on AN-6. UAT: PASS; 786 characters, 0 differ, 0 page errors |
| B-4 | AC-6.3: guild emoji picked into content, code and quote lines keeps every character | QA spec (1878): picker on local build, test-account sign-in, provisioning. UAT (62-65): sign-in, picker on content, code and quote lines | QA: open. UAT: PASS |
| B-5 | AC-4.2 in production (post-deploy) | QA spec (1879): stage browser on `hooks.gg/message/m/0/edit`. Not a pre-release walk (UAT 92-93). Release-tip: not gating (131) | QA: open. Unfixed reading at production 16:00Z (line 85, 1879). Carried by handoff; not executed in these files |
| B-6 | D-12: `pnpm test:discord` exits 0 at tip; `pnpm test` exits 0 offline | QA spec (1880). Release-tip (53-63): offline suite and live run | QA: open. Release-tip: EXECUTED, PASS (60-63). Offline `test:discord` exit 1 by design (C1) |
| B-7 | AC-4.4: listed channel mention shows its name; role keeps id; `/preview` keeps id | QA spec (1881), limb 1 signed in, limb 2 `/preview`. UAT (66-67) | QA: open. UAT: PASS both limbs |
| B-8 | AC-3.3: Chrome `beforeinput` paste branch, full and partial mode | QA spec (1882): Ctrl+V, read JSON view. UAT (68-69) | QA: open. UAT: PASS |
| B-9 | AC-6.7 human-observable: Enter carries `> `, paste adds none, gesture ends quote | QA spec (1883): three steps, gesture named in implementer's M6 document. UAT (70-72): gesture recorded as Backspace | QA: open. UAT: PASS, three steps |
| B-10 | AC-6.8: typing in 2,000-line embed description shows no visible lag | QA spec (1884): paste 2,000 lines, ten keys at end of line 1,000. UAT (73): ten keys at end of line 999 | QA: open. UAT: PASS, 54 to 67 ms per key |
| B-11 | AC-6.9: fence and `>>>` keystrokes: no console error, caret placement, draft keeps keystroke | QA spec (1885): `run-K*.js`, Edit > JSON before next key, reload. Instrument run at 42128cd (1494-1502) and at a7ad3f2 for K4 (1803-1818). UAT (74-78): K1a, K1b, K2, K3, K4 | QA: open. UAT: PASS for all cases; K4 0 errors in ten runs (78) |

Other register material in the main file: B-8 appended at line 35; B-9 minted at line 36; B-10 at line 38; B-11 at line 42 (changelog). User-report notes at lines 1893-1901 ("None is recorded yet").

Factual discrepancies between documents:
- Main QA frontmatter line 7 says "B-1 to B-4 and B-6 to B-11 executed; B-5 carried by handoff". The register State cells at lines 1875-1885 say "open". Lines 1868-1869 say later documents are authoritative.
- B-10 depth: QA line 1884 says "type ten characters at the end of line 1,000". UAT line 73 says "type 10 keys at the end of line 999".
- B-9 gesture: QA line 1883 says "the gesture implementer-019 names to end the quote". UAT line 72 records "gesture (Backspace, the M6 document's)".

---

## 5. Passages on test:discord, fuzzer, differential, oracle (verbatim, up to 10)

1. Main QA line 96: "2. **The preview draws differently from Discord.** Lane: the Discord oracle (AC-3.1, AC-4.x), in `pnpm test:discord`, with frozen"
2. Main QA lines 104-105: "**Test types**: ... the `test:discord` command (legacy oracle fetched at test time, plus the drift" / "alarm); real-browser walks by UAT (B-1 to B-4); and a post-deploy observation (B-5)."
3. Main QA line 111: "| AC-3.1 / AC-4.1 preview | the legacy tree (Discord's fetched code, G-14's parse state) | native `parse` against legacy, **under AN-3's literal masks** (QAF-2) | `test:discord`; frozen members in `pnpm test` (QAF-6) |"
4. Main QA line 195: "- Fuzzer report: the counts per class (agree, disagree, native-only), with the pinned version and the fetched legacy build id. Debug"
5. Main QA lines 606-607: "AC-6.5's "Property, typed edits" names its input class as "M3's lifted typed-edit differential (its 15,480 edits at the committed" ... The differential's token lists hold **no emoji**."
6. M3 QA line 11: "# QA Report: 019 — M3, the fuzzer and oracle in the suite (Phase 2)"
7. M3 QA lines 50-51: "- **Irreversible Side-Effect Register.** M3 changes no guard of E-1 to E-9. Its only new outbound path is the live oracle's fetch of" / "`discord.com`, which the oracle window confines (CR-6, CR-10, below)."
8. M3 QA line 73: "| `unshare -rn` (lo up) `pnpm test:discord` | exit 1; names `https://discord.com/app` (`OracleError ... fetch failed`); **`Tests 3 passed \| 35 skipped (38)`** | `discord-offline-2c1590f.{log.txt,exit}` |"
9. Release-tip QA line 55: "| `pnpm test:discord` live (B-6) | network on, read-only fetches | **41 of 41, exit 0**. Per file: boxes 10/10, live 9/9, reports 6/6, routing 5/5, surfaces 7/7, preview legacy-equality 4/4. Drift alarm: served wasm sha256 `da7b9e5e…57fb0` = pinned, **equal**, so no C2."
10. M6 QA line 124: "| **M5 differential**, a second instrument beside code review's module swap ... | **0 of 6,486** element-free surface-and-input rows differ (9,969 text nodes). Controls: m5-d2 planted moves 0, ..."

---

## 6. Changelog rows per file

Format: timestamp (line), summary of 15 words or fewer. Lines refer to the changelog row in each file.

### 6.1 Main QA (lines 21-47)
- 2026-11-23T16:03 (21): Phase 1 Rev 1 strategy, register B-1 to B-6, QAF-1 to QAF-14.
- 2026-11-23T16:32 (22): Rev 2 re-key; QAF-15 to QAF-17; EC-4 typing cost measured.
- 2026-11-23T17:18 (23): Rev 3 re-key; QAF-18 to QAF-21; E-4 declined; QAF-22 routed.
- 2026-11-23T17:27 (24): Rev 4 re-key; QAF-23; GAME_MENTION masks re-measured.
- 2026-11-23T17:31 (25): Rev 5 re-key; EC-7 added; no new finding.
- 2026-11-23T17:51 (26): Rev 6 re-key; QAF-24, QAF-25; AC-2.3 masks re-run, 0 of 248 differ.
- 2026-11-23T17:56 (27): Rev 7 re-key; QAF-26 MEDIUM, QAF-27 LOW; timestamp locale branches read.
- 2026-11-23T18:01 (28): Rev 8 AC-4.7 re-key; QAF-28 MEDIUM; ja-JP premise corrected.
- 2026-11-23T18:05 (29): Rev 9 AC-4.7 delta; no new finding; QAF-28 closed.
- 2026-11-23T21:43 (30): Rev 10 AC-4.4 re-key; QAF-31 LOW; B-7 minted; premises run.
- 2026-11-23T21:44 (31): Rev 10 registrations; QAF-31 duplicate of F-34 (SL-11).
- 2026-11-23T22:31 (32): Rev 11 AC-3.7 re-key; QAF-34 MEDIUM, QAF-35 LOW raised.
- 2026-11-23T22:36 (33): Rev 12 atom unit re-keyed; QAF-34, QAF-35 closed; no new finding.
- 2026-11-23T22:39 (34): Rev 12 stated limits SL-12, SL-13 reconciled.
- 2026-11-23T22:49 (35): M3 pass row: B-8 appended for Chrome beforeinput paste.
- 2026-11-24T04:16 (36): Revs 13 and 14 re-key; QAF-40, QAF-41; B-9 minted.
- 2026-11-24T04:20 (37): Rev 15 re-key; QAF-40, QAF-41 closed; QAF-42 LOW.
- 2026-11-24T07:10 (38): Rev 16 re-key; QAF-43 MEDIUM, QAF-44 LOW; B-10 minted.
- 2026-11-24T07:22 (39): Revs 17 and 18 re-key; QAF-43, QAF-44 closed.
- 2026-11-24T07:25 (40): Rev 19 re-key; QAF-45 LOW; NM-72 dispositioned.
- 2026-11-24T07:45 (41): Rev 20 re-key; sized-text bound removed; no new finding.
- 2026-11-24T14:48 (42): Rev 21 re-key; QAF-52 MEDIUM; B-11 minted with browser-walker run.
- 2026-11-24T17:11 (43): Rev 22 re-key; QAF-52 closed; B-11 re-specified as K1a and K1b.
- 2026-11-24T20:12 (44): Rev 23 re-key; QAF-53 MEDIUM, QAF-54 LOW; NM-81, NM-82 added.
- 2026-11-25T06:04 (45): Rev 24 re-key; QAF-55 MEDIUM; B-11 gains K4 instrument run.
- 2026-11-25T06:18 (46): Rev 25 re-key; QAF-55 closed; NM-88 added.
- 2026-11-25T17:10 (47): devops-019 closes document; Committed at 48eb60a.

### 6.2 M2 (lines 23-25)
- 2026-11-23T19:35 (23): Phase 2 at 78c5f74; QA Failed on QAF-29; QAF-30 raised.
- 2026-11-23T19:49 (24): Refresh at 7dcedc9; QAF-29, QAF-30 closed; QA Complete.
- 2026-11-25T17:10 (25): devops-019 closes document; Committed at 48eb60a.

### 6.3 M3 (lines 24-28)
- 2026-11-23T22:48 (24): Phase 2 at 2c1590f; QA Failed on QAF-32, QAF-33.
- 2026-11-24T01:08 (25): Refresh at e58f2ed; QAF-32 closed; QAF-36 raised; QA Failed.
- 2026-11-24T02:11 (26): Refresh at d6aab03; QAF-36 closed; QAF-38 raised; QA Failed.
- 2026-11-24T02:50 (27): Refresh at 81c68b2; QAF-38 closed; QA Complete.
- 2026-11-25T17:10 (28): devops-019 closes document; Committed at 48eb60a.

### 6.4 M4 (lines 26-28)
- 2026-11-24T01:10 (26): TDD gate rejects M4 at e58f2ed; five rows lack test-first red.
- 2026-11-24T01:27 (27): Gate passes on stub-tree records; QA Complete; QAF-37 LOW.
- 2026-11-25T17:10 (28): devops-019 closes document; Committed at 48eb60a.

### 6.5 M5 (lines 26-28)
- 2026-11-24T04:12 (26): Phase 2 at 2e36107; QA Failed on QAF-39 MEDIUM.
- 2026-11-24T05:19 (27): Refresh with cf126ea test paths; QAF-39 closed; QA Complete.
- 2026-11-25T17:10 (28): devops-019 closes document; Committed at 48eb60a.

### 6.6 M6 (lines 25-32)
- 2026-11-24T06:58 (25): TDD gate rejects M6 at 119471f; no suite run for verdict.
- 2026-11-24T07:57 (26): Gate passes; Phase 2 at 119471f QA Failed; QAF-50 MEDIUM.
- 2026-11-24T09:14 (27): Outstanding 2 probed at af3d95a and 42128cd; QAF-51 LOW.
- 2026-11-24T09:32 (28): Phase 2 on CR-20 fix round at 42128cd starts.
- 2026-11-24T14:35 (29): Stopped at 42128cd; no verdict; status back to QA Failed.
- 2026-11-25T12:37 (30): Phase 2 on Fix Round 6 at 48eb60a starts.
- 2026-11-25T15:48 (31): QA Complete at 48eb60a; sweep waived by owner; QAF-56 stated limit.
- 2026-11-25T17:10 (32): devops-019 closes document; Committed at 48eb60a.

### 6.7 Release-tip QA (lines 27-28)
- 2026-11-25T16:59 (27): Phase 3 at 48eb60a, runbook R-1: Release Verified; B-6 PASS.
- 2026-11-25T17:40 (28): devops-019 release closure; Status Released, pushed 17:39Z.

### 6.8 UAT (lines 21-22)
- 2026-11-25T16:31 (21): All nine pre-release walks PASS at 48eb60a; APPROVED FOR RELEASE.
- 2026-11-25T17:10 (22): devops-019 closes document; Committed at 48eb60a.
