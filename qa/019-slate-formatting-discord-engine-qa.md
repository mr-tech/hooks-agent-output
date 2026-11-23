---
ID: 019
Origin: 019
UUID: 286c730a
Verified-At: "af3d95a — repos=website; Phase 1 baseline only: the offline suite run at the chain base, no implementation exists yet"
Status: Awaiting Implementation
Status-Detail: >-
  Phase 1 re-keyed on plan 019 Revision 12 (record b0af4dc3), AC-3.7's atom population and RK-9. QAF-34 and QAF-35 are
  closed; nothing is open from QA in Phase 1. QAF-31 is carried as SL-11. Register: B-1 to B-7. Implementation of M2 to M6 started 18:49Z; Phase 2 on M2
  is in its own document.
Phase: 1
---

# QA Report: 019 — Slate formatting: one Discord engine for the preview and the editor

## Resumption State

Written 2026-11-23T19:55 at a checkpoint steering asked for (350K, past the 325K threshold).

- **Done.**
  - Phase 1 on revisions 1 to 12, each re-key committed. Revision 12 closes QAF-34 and QAF-35; nothing is open in Phase 1.
  - Phase 2 on M2, in its own document, `qa/019-slate-formatting-discord-engine-m2-qa.md`. It was QA Failed at website `78c5f74`
    on QAF-29, record `0b00154b`. The refresh is QA Complete at `7dcedc9`, record `c699c85`. Plan rows R-26 and R-28.
- **Next.**
  - Phase 2 on each later milestone (M3 to M6), each in its own `qa/019-…-m<n>-qa.md`. Each starts at that milestone's committed
    code review verdict at its `Reviewed-At`, never at a hand-off message.
  - Carried into those passes:
    - AC-2.5's surface limbs, at M4 and M5;
    - AC-2.1's oracle-helper mask clause (`Syntax.ALL & ~Syntax.DEV_LINKS`), at M3, the code review's item first;
    - QAF-27's `<t:…:s> <t:…:f>` member, at the AC-4.3 audit;
    - the effort-final mutation sweep over `git diff 5ec0621..<final tip>` production paths, with mutant-gen.
  - Any further AC-4.7 gap goes to `steering-hooks-fixer` before any fold (block 18:02Z). M4 and M6 are capped below HIGH, except
    a severity floor (block 17:56Z).
- **Branch and HEAD.** The website shared tree is on `chain/019-slate-formatting-discord-engine` at `7dcedc9`. It is not mine to
  switch.
- **Approach in flight.** None.
- **Uncommitted or local.** Nothing in the record. The exports were deleted. The scratchpad `pkg/` holds `npm pack` of the
  markdown-wasm 0.16.0 and types 0.14.0 packages, which the probes run from; it is perishable and can be re-packed.
- **Evidence not recorded.** None.
- **Questions out.** None.

**Plan Reference**: `agent-output/planning/019-slate-formatting-discord-engine.md`. This document is keyed to Revision 12 (record
`b0af4dc3`). Revision 1 (record `103687b4`) was read whole by the first pass. Each later revision was read as its delta, and its
§ Re-key section says what moved.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T16:03 | steering-hooks-fixer (brief `steering/019-brief-qa.md`, common brief `steering/slate-formatting-brief-common.md`) | QA Phase 1 on Revision 1 | Phase 1: test strategy, Irreversible Side-Effect Register, infrastructure, named mutants, blocking-condition register B-1 to B-6, findings QAF-1 to QAF-14. It measured the populations it could at website `af3d95a`: an offline suite baseline, the Syntax bit count, the highlight.js language count, the save and upsert routes and the corpus counts. It captured the inventory's link inputs from a scratch directory that would not survive a reboot, and took a production reading for the post-deploy row. |
| 2026-11-23T16:32 | planner-019 (message: revision 2 at record `8dfd4659`) | Re-key Phase 1 on revision 2 | Phase 1 re-key. Read revision 2 by the Reading Order's QA row, plus M1 and the finding disposition. It verified that each of QAF-1 to QAF-14 is folded where the disposition says, re-keyed register B-1, B-2, B-4 and B-5, and measured EC-4 (the typing cost) as AC-3.3 now asks before implementation approval. It raises QAF-15 to QAF-17. One website read in this pass was not completed, then re-run under effort rulings block 15:29Z. R-2 (D-13, record `4c872804`) registers a decision that revision 3 folds; AC-6.5 and X-8 re-key then. |
| 2026-11-23T17:18 | planner-019 (message: revision 3 at record `9ac9ba62`) | Re-key Phase 1 on revision 3 | Phase 1 re-key, read as the delta from `4c872804`. It confirmed the folds of QAF-15 to QAF-17, EC-4 and NM-30, and re-keyed AC-2.3, AC-3.2, AC-3.7, AC-3.8, AC-4.7, AC-4.8, AC-5.6 to AC-5.8, AC-6.5 and AC-6.6. It measured P-8 (16 of 16 files) and read the draft store's shape. E-4 is declined, with the reason and QAF-22. It swept the register on a stated predicate, B-1, B-3, B-4 and B-6 re-specified, and raises QAF-18 to QAF-21. |
| 2026-11-23T17:27 | planner-019 (message: revision 4 at record `e53c7cdb`) | Re-key Phase 1 on revision 4 | Phase 1 re-key, read as the word diff from `9ac9ba62`. It confirmed the folds of QAF-18 to QAF-22 and E-4. It re-measured the masks with `GAME_MENTION` cleared on the five legacy-only surfaces (1 of 248 cells differs, content's, as intended) and published AC-2.3's seven literals. It re-keyed AC-3.2, AC-3.7, AC-3.8 (i′), AC-4.7, AC-6.5 (CF-9) and the emoji display helper (CF-10). It swept the register, with B-1 and B-6 re-specified, and raises QAF-23. One command was refused by the record-write gate and re-issued in a read-only form (disclosed in the section). |
| 2026-11-23T17:31 | planner-019 (message: revision 5 at record `d2912590`) | Re-key Phase 1 on revision 5 | Phase 1 re-key, read as the word diff from `e53c7cdb`. It confirmed the folds of QAF-23, AC-2.3's six literals and CF-11's expected value, and reconciled the mask count to six. It adds EC-7 (the box's emoji spans against `parseLossless`'s emoji nodes, measured before AC-6.5's literals freeze) and swept the register with no change. No new finding. |
| 2026-11-23T17:51 | planner-019 (message: revision 6 at record `946d4e54`) | Re-key Phase 1 on revision 6 | Phase 1 re-key, read as the word diff from `d2912590` and AN-8 limb 2b (`3681654e`). AC-2.3's six masks were re-run against AN-3's table, with its stale `GAME_MENTION` row replaced by limb 2b's run: 0 of 248 cells differ, and revision 4's masks give the three expected differences as a control. Three premises were run: `0x02000000` is HEADING, the field value's emoji spans equal content's, and Node prints `s` and `S` with the bytes Discord drew. It re-keyed AC-2.3 (NM-39), AC-4.7, AC-6.3 with B-4, and AC-6.5. It raises QAF-24 and QAF-25 (both MEDIUM) and swept the register: B-4 re-specified, the others cleared. |
| 2026-11-23T17:56 | planner-019 (message: revision 7 at record `e0eb1e87`) | Re-key Phase 1 on revision 7 | Phase 1 re-key, read as the word diff from `946d4e54`. It confirmed the folds of QAF-24 and QAF-25 (closed), F-32, CF-13 option (a) and the heading-bit read, which agrees with P-Q14. It read the sibling `MarkdownTimestamp.tsx`, `Markdown.tsx` and `LoadLocale.tsx` at `af3d95a`, and ran the two CF-13 branches' literals and the dayjs locale resolution (P-Q18). It raises QAF-26 MEDIUM and QAF-27 LOW, and swept the register with no change. |
| 2026-11-23T18:01 | planner-019 (message: revision 8 at record `7b419f5b`) | Re-key Phase 1 on revision 8 (AC-4.7 only) | Phase 1 re-key, read as the word diff from `e0eb1e87`. It confirmed QAF-26's folds (i) and (ii), (iii)'s resolved-locale reading, QAF-27 as a Planner batch limit, and D-16. A check of `src/utils/loadLocales.ts` at `af3d95a` found the site loads 29 dayjs locales, `ja` among them. So this document's P-Q18 premise that `ja-JP` is unloaded was wrong, and AC-4.7's `ja-JP` fixture took it. The corrected probe (P-Q19) gives `ja-JP` the same string under both readings. P-Q18 carries a dated reconcile, and QAF-28 MEDIUM (a severity floor, excepted from the cap) asks for `vi-VN` with `11/14/23, 10:13 PM`. |
| 2026-11-23T18:05 | planner-019 (message: revision 9 at record `47348a6d`) | Re-key Phase 1 on revision 9 (AC-4.7's delta only, block 18:02Z) | Phase 1 re-key on AC-4.7's delta. It confirmed QAF-28's fold against P-Q19: the `vi-VN` tag, `11/14/23, 10:13 PM`, the tag mutant's `22:13 14/11/23`, the site's locale files loaded, and the tag supplied through react-aria. `cs-CZ` and `da-DK` are valid alternates (P-Q19). QAF-28 is closed, and there is no new finding. The register is swept, with no change. |
| 2026-11-23T21:43 | planner-019 (message: revision 10 at record `890d0b78`) | Re-key Phase 1 on revision 10 (AC-4.4, D-17) | Phase 1 re-key, read as the delta from `47348a6d`. It ran the premises at the cited commits (P-Q20, `verification/019/qa/probe-r10-mention-premises.out`): `MENTION_KINDS`, the four mention rules' text and classes, `useGuild`'s throw, the list's caching and shape, and the mount sites. It re-keyed AC-4.4 as an oracle over 12 kinds × 5 list states, with coupling fixtures, NM-48 to NM-57 and NM-27 re-read. It minted B-7 for the human-observable form. The listed types include forums (15), against the Residue: QAF-31 LOW. Register swept; B-1 to B-6 cleared. |
| 2026-11-23T21:44 | planner-019 (message: R-32 at record `223d3911`) | Phase 1, revision 10 registrations (SL-11, F-35) | QAF-31 marked as a duplicate of the critic's F-34, now SL-11, with the planner's reading checked against P-Q20. B-7 re-specified in its own cell under F-35: limb 1 (signed in) uses AC-6.3's provision step and its sign-in-not-completed clause; limb 2 (`/preview`) needs no sign-in. No new finding. |
| 2026-11-23T22:31 | planner-019 (message: revision 11 at record `ec2440d9`) | Re-key Phase 1 on revision 11 (AC-3.7, the residue list) | Phase 1 re-key, read as the delta from `48e39a5f`. It ran the cited measurement's population (P-Q21, `verification/019/qa/probe-r11-residue-population.out`): the DOM residue compares atom-free inputs only, 1,344 or 1,545 of 2,378, which no document states. That is QAF-34 MEDIUM. It re-keyed AC-3.7's three failure clauses, the mask key and the two passing cases as sole-carrier fixtures, with a generator control, NM-58 to NM-64, and RK-9's count read by two instruments. QAF-35 LOW: family claims are ungated. Register swept; B-1 to B-7 cleared. |
| 2026-11-23T22:36 | planner-019 (message: revision 12 at record `b0af4dc3`) | Re-key Phase 1 on revision 12 (AC-3.7 atoms, RK-9) | Phase 1 re-key, read as the delta from `64d3a137`. QAF-34 is closed under option (1) and QAF-35 by the family limb. The atom unit (kind and span, not resolved value) is re-keyed as three sole-carrier fixtures with NM-65 to NM-67. RK-9's rise at Phase 2 is a firing QA routes to steering. No new finding. Register swept; B-1 to B-7 cleared. |

## Reading

- Read whole: the brief, the common brief, the plan, the architect's pre-plan findings
  (`architecture/slate-formatting-preview-architecture-findings.md`), the scoping inventory
  (`verification/slate-formatting-effort/scoping/inventory.md`), and rulings block 15:49Z.
- Read in part: the research (`research/closed/slate-formatting-discord-oracle-2026-11-23.md`: V-18 to V-23, § 4, Open questions,
  Remaining gaps, Scratch instruments, the Appendix C block counts), and the Test Conventions in `agent-output/CLAUDE.md`.
- The architect's conformance pass on Revision 1 landed at record `78d7ec06` while this pass ran. Only its headings were read. Its
  CF-2 (editor and preview recognise different emoji) names an input class that QAF-12 enumerates. A later revision re-runs this
  phase on its delta.
- Not read: `system-architecture.md` and `website.md` beyond the lines the common brief and the architect's findings quote (W-3,
  W-4, D-001's Problem Area). Nothing in `preview-image-generator` was read by this session (standing rule). The P-2 premise is the
  planner's read.

## Measured baseline and premises (run in this pass)

All website reads are at `af3d95a`, from `git -C website …` or from an export:
`git archive af3d95a | tar -x` into this session's scratchpad (`exp-af3d95a`), with `node_modules` copied (`cp -a`, not linked)
from the shared tree, which sits at `af3d95a` on `chain/fix-image-uploader-url` with a clean tracked tree. The lockfile equals the
base's (`git diff --quiet af3d95a -- pnpm-lock.yaml`). The shared tree was not switched or written.

| # | Premise | Instrument | Result | Capture |
|---|---|---|---|---|
| P-Q1 | `pnpm test` is green with no network at the base (D-12's starting point) | `unshare -rn sh -c 'ip link set lo up && npx vitest run --reporter=json …'` in the export | **2696 of 2696 passed, exit 0, 172 `testResults` entries.** | `verification/019/qa/suite-af3d95a-offline-lo.{json,log.txt,exit}` |
| P-Q1c | The namespace really cuts the network (control for P-Q1) | the same run with loopback left down (`unshare -rn npx vitest run …`) | 2681 of 2696, exit 1, 15 failures in 3 files that use local servers: `trpc.batch-refusal` ("fetch failed"), `trpc.site-link`, `MessageNotFound.edit-and-send-pages` | `verification/019/qa/suite-af3d95a-offline.{json,log.txt,exit}` |
| P-Q2 | `Syntax` has 31 single-bit members (AC-2.3's class) | `probe-schemes-and-flags.mjs` under `unshare -rn` over `npm pack` of `@discord/markdown-wasm@0.16.0` and `-types@0.14.0` | 38 members: 31 single-bit (including `DEV_LINKS`) and 7 groups (`EMOJI`, `LINKS`, `MENTIONS`, `CODE_SPANS`, `ITALIC`, `QUOTES`, `ALL`) | `verification/019/qa/probe-schemes-and-flags.{mjs,out}` |
| P-Q3 | A mask of `0` parses nothing | same probe | **False**: `parse("**a**", 0)` equals `parse("**a**", Syntax.ALL)`, as the package's own doc comment says (`syntax.d.ts`) | same |
| P-Q4 | `parse` returns only http(s) and mailto links | same probe, 20 inputs | `javascript:`, `JaVaScRiPt:`, `data:`, `vbscript:`, `ftp:` and `foo:` give no link. `<mailto:a@b.c>` and `<a@b.c>` give `mailto:`. **`dev://branch/main` is a link under `Syntax.ALL`**, and not once `DEV_LINKS` is cleared. `https://x.y!` gives `url` `https://x.y!/`. | same |
| P-Q5 | Lossless node kinds 16, token kinds 21 (AC-2.4) | read `index.d.ts` `LosslessNodeKind`, `TokenKind` at `-types@0.14.0` (unpacked in the scratchpad) | 16 and 21, the same as the plan's hand count | — (a read) |
| P-Q6 | highlight.js language count (AC-5.3) | `require("highlight.js").listLanguages().length` in the export | highlight.js 11.12.0, **193** | — (one line, quoted here) |
| P-Q7 | The research corpus sizes (M3's fixed inputs) | the lines of each `~~~~json` block of Appendix C, counted by `awk` | 272 cases; 86 typed inputs, as 79 ids plus seven; 18 link inputs | — |
| P-Q8 | The inventory's "107 link inputs" exist where M3 can lift them | `ls` and a `node` count of the inventory session's scratch (`/tmp/claude-1000/-usr-local-bin-hooks/be654015-…/scratchpad/link-out{,2,3}.json`) | They existed **only in that scratch directory**: 76 + 21 + 10 = 107 rows of `t`, **106 distinct strings**. Now captured (QAF-11). | `verification/019/qa/link-inputs.json` (sha256 `218d5eff…f933f208`; sources' sha256 are in this pass's command record) |
| P-Q9 | The fence-loop seeds exist | `ls` of the four driver files; read `random-differential-exp-61e5dfe.json` | All four present. Seed 20261123, 15,480 edits, `editTextWrong` 346 at `61e5dfe`. Not re-run at `af3d95a` (M6 re-reads S-29 there). | `verification/fix-normalize-fence-loop/qa/` |
| P-Q10 | S-30's user-act-only save routes, at the chain base rather than `0411d3b` | `git -C website grep -n "saveMessage(" af3d95a -- src` (outside `__tests__`); the same for `.upsert.useMutation` | `saveMessage(`: 4 sites, the same as the plan's read at `0411d3b` (`Navigation.tsx` ×2, `edit/page.tsx` ×2). `message.upsert` mutations: 5 (`MessageProvider/index.tsx`, `SaveAsMenu.tsx`, `NewMessageModal.tsx`, `m/new/page.tsx`, `f/[id]/page.tsx`) | — |
| P-Q11 | AC-2.1's population and its base value | `git ls-tree -r --name-only af3d95a`, filtered to `.ts/.tsx/.js/.mjs` outside `node_modules` and `.next`; `git grep -c "@discord/markdown" af3d95a` | 527 files in the repo, 521 of them under `src`, `bot` and `lang`; 0 references at the base | — |
| P-Q12 | Reachability of each environment the plan's Validation names | `curl -s -o /dev/null -w %{http_code}` | `discord.com/app` 200, `registry.npmjs.org` 200 (16:01Z). Chrome on the stage profile: worked (B-5's run). Playwright's cache holds `chromium-1200` and `firefox-1497`, and no WebKit. | — |
| P-Q13 | B-5's instrument separates fixed from unfixed on production | stage browser, production `hooks.gg/message/m/0/edit`: type `https://x.y🙂 [a](https://x.y/🙂)`, blur, read `main a[href]` | Anchors `["https://x.y:slight_smile","https://x.y:slight_smile"]` and `["https://x.y/:slight_smile:","a"]`, which is the unfixed value. Nothing saved or sent. The route-0 local draft of the test profile now holds the probe text. | `verification/019/qa/prod-link-href-unfixed.txt` |

**Definition used for "offline" (D-12).** No route beyond loopback: `unshare -rn` with `lo` up. With `lo` down, 15 cases fail
that never left the box (P-Q1c), so the definition matters (QAF-13).

## Test Strategy (Pre-Implementation)

**From the user's side.** A Hooks user types, pastes or loads a message. They see it coloured in the editor and rendered in the
preview, save it, and send it to Discord. Four things can break, and each is one test lane:
1. **Characters lost or rewritten** (save, send, copy). This is the worst failure, because it reaches Discord and the database. Lane:
   properties over the Slate layer (AC-3.3, AC-6.x), in `pnpm test`. There is no Discord oracle here (research gap 7).
2. **The preview draws differently from Discord.** Lane: the Discord oracle (AC-3.1, AC-4.x), in `pnpm test:discord`, with frozen
   members in `pnpm test` (QAF-6).
3. **The editor colours differently from Discord's box.** These are separate expected values from the preview's (hazard 2;
   research V-21). Lane: AC-3.2 and AC-5.x. QAF-1 governs which instrument decides the asserted set.
4. **The page never formats, formats late, or breaks** (wasm init, bundling, the generator's capture). Lane: AN-1 and AN-2 probes,
   then AC-2.5 and the B-rows on real builds.

**Test types**: unit tests (Node) for masks, maps and the normaliser; DOM tests (`.tsx`, jsdom) for renderers and the mounted
editor; property tests over the seeded generator; the `test:discord` command (legacy oracle fetched at test time, plus the drift
alarm); real-browser walks by UAT (B-1 to B-4); and a post-deploy observation (B-5).

**Expected values, by source** (hazards 1 and 2):

| Criterion | Expected value from | Membership decided by | Command |
|---|---|---|---|
| AC-3.1 / AC-4.1 preview | the legacy tree (Discord's fetched code, G-14's parse state) | native `parse` against legacy, **under AN-3's literal masks** (QAF-2) | `test:discord`; frozen members in `pnpm test` (QAF-6) |
| AC-3.2 / AC-5.1 editor | AN-6's legacy text-box run | the legacy run against a native mapping **independent of the adapter's map** (QAF-1) | as above |
| AC-2.3 masks, AC-5.6 markers | literals from AN-3 and AN-6 | — | `pnpm test` |
| AC-3.3, AC-5.2 to AC-5.4, AC-6.x | properties and literals; highlight.js's own HTML for AC-5.4 | — | `pnpm test` |
| AC-3.5 fetch failure, drift alarm | the command's exit and output | — | `test:discord` in the offline namespace |

Any run that asserts against Discord loads both formatters, because the standard is where they agree (hazard 1). A run that cannot
fetch the legacy one has no expected values, and it exits non-zero (AC-3.5).

### Per-criterion population, measured where it exists

| Criterion | Population it judges (measured, command) | Edge cases this phase adds |
|---|---|---|
| AC-2.1 | 527 files, 521 under `src`/`bot`/`lang`; 0 references at base (P-Q11). The module-graph instrument is not built yet (infrastructure). | A dynamic `import()` with a template string; a re-export through a barrel (`export * from`); a type-only import of `-types` (still a name, so still in the class); `bot/` and `lang/` files that `tsc` does not include. |
| AC-2.2 | the lockfile diff from base to tip | A transitive pin moved by `pnpm install` (plan 018 M2-b form); the `paracord` rider R-A's importer entry. |
| AC-2.3 | 6 surfaces × 31 bits = 186 cells (P-Q2) | **A mask of `0` means ALL** (P-Q3, QAF-4); `DEV_LINKS` per surface (P-Q4, QAF-4); footer and author, which are not markdown, must never reach `parse`. |
| AC-2.4 | 16 node kinds, 21 token kinds (P-Q5); `parse`'s `Block` kinds as P-1 observed | `modifier` fragments sharing an `id` across blocks (a spoiler split across lines, AF `SpoilerProps.id`); `mention.static` with all 5 sub-kinds. |
| AC-2.5 | 3 states × 6 surfaces | **The resolved limb** (QAF-3); several surfaces mounted on one page, each starting `init`; a client-side navigation between two editor pages ("per page load"); Firefox (QAF-10). |
| AC-2.6 | `.next/static` of the build export | The line must be in a file the editor page serves, not only in a sourcemap (QAF-14). |
| AC-3.1 | Corpus 272 (P-Q7): agree 235 as written and 239 stored (research V-18, a record, not re-run). Links: 106 distinct (P-Q8). Generator: ≥ 4,000, not built. | A coverage table per (Syntax bit × surface) of agree-class members (QAF-8). V2 text display is native-only, so it has no Discord expected value (QAF-8). Masked links with an emoji label under G-14's state. |
| AC-3.2 | 86 typed, 68 comparable, 43 agree under the researcher's mapping (V-22, a record) | QAF-1. Inline objects (V-21 residue). A style that crosses an inline object (AN-6). |
| AC-3.3 | 1,662-line corpus (seed 20261123); 15,480 random edits with 346 wrong at `61e5dfe` (P-Q9); generator; corpus | A **bounded** limb: after normalisation settles, a forced re-normalise performs zero operations (QAF-9). Typing cost (QAF-9). `>>>` blocks, `\r\n`, a trailing newline, an empty message, a lone surrogate. |
| AC-3.4 | every criterion × (base red, mutant red) | A red at base must be on a **named input**, not only a count. |
| AC-3.5 | the offline namespace (P-Q1c's form) | DNS failure, HTTP 5xx, a 200 with a changed page (a predicate matching 0 modules), two modules matching, a wasm hash mismatch (drift). Each is a distinct exit, and each names its cause. |
| AC-4.2 | the link forms × emoji placements | Every form: bare, `<…>`, `<email>`, masked, masked with `<url>`, masked with a title. Every emoji placement: before, inside the target, inside the label, after. Punycoded hosts (P-1: `https://x.xn--y-bz3s/`). The href scheme guard (QAF-5). |
| AC-4.3 | messages with k ≥ 1 timestamps. At the base, no preview timestamp test exists: the only test file holding `<t:` is `decorator.emphasis-syntax-ranges.test.ts` (`git grep -l "<t:" af3d95a -- 'src/**/__tests__/*'`). | **Two identical `<t:…>` strings** (QAF-7); `\<t:…>` escaped; an invalid style letter, which stays text (V-21); timestamps in a spoiler or a link label; read-only branches of the embed surfaces. |
| AC-4.4 | 13 kinds (8 plus 5 static, AC-2.4's list) | An unknown id per kind (V-18 forms); `@silent` (legacy only, V-21). 2026-11-23T21:43 reconcile (revision 10, D-17): superseded by § Re-key on Revision 10, 12 leaf kinds × 5 list states; the V-18 forms are now forbidden outputs. `@silent` stays as text. |
| AC-4.5 | the module graph, as for AC-2.1 | A call through `interactiveParser` reached from a preview branch. |
| AC-5.2 | every line × every split by an inline object | A split **inside** a delimiter run (`*🙂*`, `**🙂**`, `~~<@1>~~`); an emoji the engine recognises and the Slate lift does not, or the reverse (architect CF-2, read as a class only). |
| AC-5.3 | 193 languages (P-Q6) plus the generator and the corpus | The 2 languages with zero-length scopes (S-03 record); ranges on `#` lines (S-04). |
| AC-5.4 | languages whose grammar nests (python f-strings, ruby `#{}`, js `/** @param */`, S-02) | The outer scope is the line's first range (S-02's exact shape). |
| AC-5.6 | every marker kind | `#` without a space (`#nospace`, not a heading), `-# `, `1)`, a nested list's indent, `>q` and `>>>a` (plain, V-21). |
| AC-6.1 | 346 recorded edits plus the random differential class (P-Q9); S-17 escapes | Re-read at `af3d95a` before the change (the plan says so). |
| AC-6.1b | 4 `saveMessage` sites and 5 upsert mutations at `af3d95a` (P-Q10) | Send and Save-as from an opened, unsaved `>>>` message. |
| AC-6.2 | the emoji forms listed | QAF-12: flags, VS-16 against text presentation (`❤` vs `❤️`), tag sequences (🏴󠁧󠁢󠁥󠁮󠁧󠁿), an emoji newer than the site's table, `:🙂:`, emoji in link labels and targets (LF-2). |

### Required Unit Tests

- Adapter masks (AC-2.3): 186 literal cells. Assert `mask !== 0` for every surface, and that no non-markdown surface calls `parse`.
- Adapter maps (AC-2.4): exhaustiveness through `satisfies Record<Kind, …>`, plus one fixture per map entry in which that entry alone
  decides the rendered element or class (the conjunct rule). An entry that no fixture isolates is a coverage gap at Phase 2.
- Normaliser (M3), with its own tests run first: Appendix A's disagreeing pairs must all be reported as different (QAF-6b). A
  planted single-mark difference must be reported (positive control). An identical pair must be equal.
- Href scheme guard (QAF-5): `javascript:`, `JaVaScRiPt:`, `data:`, `vbscript:`, `dev:` refused; `https:`, `http:`, `mailto:`
  admitted (the control in both directions).
- Init telemetry (AC-2.5, Telemetry Validation below).

### Required Integration Tests

- DOM (`.tsx`): each of the six surfaces' preview branch and editor mounted through the real `MarkdownProvider`, with init pending,
  resolved and rejected. The pending and rejected states are produced by controlling the adapter's init promise. That substitute
  stands for the browser path only, because Node initialises on the first `parse` (`parse.d.ts`). Its use is named in the
  implementation document (Iron Law 5).
- Mounted editor, AC-3.3: load, type character by character, paste whole, save. Run over the generator, the 1,662 corpus and the
  fence-loop seeds lifted as data.
- Timestamp edit, AC-4.3: mount the preview, edit the i-th timestamp for every i, add timestamps while it stays mounted, and assert
  the source and `localDate`.
- `test:discord`: the legacy oracle over corpus, links and generator; the drift alarm; and AC-3.5 in the offline namespace.

### TESTING INFRASTRUCTURE NEEDED

1. **Two commands (D-12).** A `test:discord` script and a vitest project or config that `pnpm test` excludes by path, not by an
   environment flag that defaults to skip. `pnpm test` stays offline-green under P-Q1's namespace, and that run is the D-12 check
   at every gate.
2. **Legacy oracle runner** (AN-4): Node, or a headless browser driver pinned as a devDependency. The fetched assets go to an OS
   temp directory outside the website tree (ISER E-6).
3. **Module-graph instrument** for AC-2.1 and AC-4.5: TypeScript compiler API resolution, or `dependency-cruiser` at an exact pin,
   covering `bot/`, `lang/`, `.mjs` and dynamic imports. Exercised on the adapter (a member) and a planted test-only import in an
   export (a non-member) before the sweep relies on it.
4. **Data under `__tests__/`**: Appendix C (272, 86, 18), `verification/019/qa/link-inputs.json` (106), and the fence-loop seeds.
   Lifted with names per the Test Conventions; no file name or title carries `probe`-round, chain, `qa`, a milestone or a date.
5. **Normaliser** as a module under `src/**/__tests__/helpers/`, with its own test file.
6. **Seeded RNG**: the `mulberry32` already used by the probes, lifted at its third duplicate (helper policy).
7. **Browsers**: Chrome (the stage profile) for B-1 to B-4. Playwright Firefox `firefox-1497` is on the box for QAF-10's limb.
   WebKit is absent, so Safari is a stated gap.
8. **Local production build stack** for the UAT rows: the record's `tools/uat-local-stack.sh` if present, with the id-sequence move
   before the first save (workspace `CLAUDE.md`).
9. **Mutation**: `node ~/.claude/tools/mutant-gen.js` over the effort's production diff, in a `git archive` export, at Phase 2.

### Telemetry Validation

- Normal level: one `console.error` line per page load on init failure, `markdown-engine-init-failure version=0.16.0 reason=<error
  name>`. Tests spy `console.error` and assert the fields (event, version, reason class), not the full message text. They assert
  that no message content appears in the line (no user text, no PII), and they count the line with 2 or more surfaces mounted.
- Fuzzer report: the counts per class (agree, disagree, native-only), with the pinned version and the fetched legacy build id. Debug
  level carries per-case trees. The report's counts state their predicate ("N generated inputs at seed S, count C, surface X").
- The drift alarm prints both hashes.

### Acceptance Criteria (QA's reading, to verify at Phase 2)

Every AC of M2 to M6 as written, plus the amendments asked in QAF-1 to QAF-14. Phase 2 records the criteria list before executing
anything (qa.md step 3).

### Named mutants

Each line gives the behaviour, the wrong change, and the criterion it tests.
- NM-1 Link href: the renderer uses the label text as `href`. AC-4.2.
- NM-2 Token map: a `delimiter` of kind bold gets the italic class. AC-3.2, AC-5.1.
- NM-3 Mask: the embed title mask keeps `MASKED_LINK`. AC-2.3, AC-3.1.
- NM-4 Mask: a no-markdown surface passes `0`, which means ALL. AC-2.3.
- NM-5 Mask: `DEV_LINKS` is left set on the content mask. AC-2.3 and QAF-5's property.
- NM-6 Init: the ready state never flips after `init` resolves, so the text stays plain. AC-2.5's resolved limb (QAF-3).
- NM-7 Init: the failure line is logged once per surface or per render, not once per load. AC-2.5.
- NM-8 Timestamp: the target is found by searching the source for the timestamp's text, not from its span. AC-4.3.
- NM-9 Timestamp: the target is the n-th regex match, counting code spans (S-10 cause 1). AC-4.3.
- NM-10 Timestamp: `localDate` is not resynced on a re-render that changes it. AC-4.3.
- NM-11 Decorator: each Slate text node is parsed alone, not the line. AC-5.2.
- NM-12 Decorator: an emoji element is counted at its `:name:` width in the span mapping. AC-5.2, AC-6.2.
- NM-13 Code line: the zero-length range filter is dropped. AC-5.3.
- NM-14 Code line: a nested highlight scope replaces the outer class. AC-5.4.
- NM-15 Marker: a heading marker gets the syntax class. AC-5.6.
- NM-16 Marker: a block is parsed whole, not per line, so a run crosses lines. AC-5.6.
- NM-17 Save: `flattenNodeText` serialises an emoji element as `:name:`. AC-6.2.
- NM-18 Save: a `>>>` quote is emitted as `> ` per line. AC-6.1b, AC-3.3.
- NM-19 Edit: the quote marker is dropped when the line becomes code (S-29). AC-6.1.
- NM-20 Oracle: a failed fetch is caught and the case skipped. AC-3.5.
- NM-21 Oracle: the locator takes the first of several predicate matches. AC-3.5.
- NM-22 Normaliser: it drops nesting order or a mark, so different trees compare equal. AC-3.1 (positive control, QAF-6b).
- NM-23 Oracle: the legacy parse runs with `allowEmojiLinks` false whatever AN-4's G-14 read finds. AC-3.1.
- NM-24 Href: the scheme allow-list is removed. QAF-5.
- NM-25 Oracle: fetched Discord assets are cached under the website tree. ISER E-6.
- NM-26 Preview: `staticParserFor`'s pre-transform is still called on one preview path. AC-4.5.
- NM-27 Mention: an unresolved kind renders empty. AC-4.4. 2026-11-23T21:43 reconcile (revision 10): read as "a mention in any list state renders empty"; NM-48 to NM-57 added (§ Re-key on Revision 10).
- NM-28 Oracle membership: the agree set is computed with the adapter's token map or masks. QAF-1, QAF-2. It is mutated by
  planting a wrong map entry: the case must stay in the asserted set and turn red.

### Entry conditions (probe shapes for the implementer)

- EC-1 (AC-3.1) Before building the comparison, show the comparand exists on the live path. The fetched legacy facade returns a
  tree for one corpus input. The native parse of that input under AN-3's literal content mask equals it in canonical form (a real
  agree member). One Appendix A input differs (a real non-member).
- EC-2 (AC-3.2) AN-6's legacy box run yields a per-character style set for one typed case. Show one agree member and one
  non-member under the independent native mapping (QAF-1).
- EC-3 (D-12) `unshare -rn sh -c 'ip link set lo up && pnpm test'` exits 0. `pnpm test:discord` in the same namespace exits
  non-zero, naming the fetch.
- EC-4 (AC-3.3) Time 100 generator inputs typed character by character into the mounted editor before fixing the suite's count
  (QAF-9).
- EC-5 Every new test file passes `node ~/.claude/tools/convention-check.js website --files <path>` and `pnpm run typecheck`.

## Irreversible Side-Effect Register

Each effect is listed by what it does, not by syntax. Cells naming a mechanism carry their read, or `UNVERIFIED`.

| ID | Effect | What must be true first | Routes and ordering | Reversible? | Read |
|---|---|---|---|---|---|
| E-1 | Push to website `master`, which deploys to Vercel production | Owner's release answer; one release carries M2 to M7, and no tree holds M4 without M5 (AF-2) | One route: devops. `website/.github/workflows` is absent. | Redeploy of a prior commit only; users who loaded the release have seen it | The plan header (`release-move.js` dry run, `verification/019/planning/release-move-dry-af3d95a.txt`). Not re-read here. |
| E-2 | Message save overwrites stored content in the database, and an update broadcasts its hash over Pusher | A user act. The content is `flattenNodeText` of the editor, which M6 changes (D-10: the character, not `:name:`). | `saveMessage(` at 4 sites and 5 `message.upsert` mutations (P-Q10). Whether `NewMessageModal`, `m/new` and `f/[id]` write editor text or other data: **UNVERIFIED**. The broadcast on update: `website.md` A-mechanism paragraph ("When the save updates the existing row, the server broadcasts…"). | The previous content is gone unless the database keeps history: **UNVERIFIED** | P-Q10; `website.md` |
| E-3 | Send to Discord through a webhook, which posts a real message in the user's server | A user act; the text sent derives from the editor's saved form | `/message/m/[id]/send` (the route exists, P-Q13 snapshot). The send path's read of content: **UNVERIFIED**. | No (a sent message) | — |
| E-4 | A preview image is regenerated from `/preview` and stored (RK-5) | The generator's capture follows the formatted render (AN-2) | Generator: `networkidle0`, then screenshot (P-2, the planner's read). Where the image is stored: **UNVERIFIED** (outside the region). | Unknown | P-2 |
| E-5 | Local draft writes (browser storage) per change | — | `utils/messageDrafts.ts` (inventory § 4). Not re-read. | No (an overwrite) | inventory |
| E-6 | Discord's served code committed or shipped, against D-4 | `test:discord` writes fetched assets outside the website tree only | Every fetch site of the command. After a `test:discord` run in an export, `git status --porcelain --ignored` shows no new path. | No, once pushed (history) | — (a check owed, NM-25) |
| E-7 | Posts to the test server (AN-3, AN-7) | Channel `#slate-oracle-walk`; the bot or the test accounts | Analyst and QA, per `discord-test-browser` | No, but in the agents' own server | brief |
| E-8 | A local-build save raises "Message Update Detected" for a production user | The id sequence moved before the first save | Procedure only (workspace `CLAUDE.md`). No code enforces it. | No | workspace `CLAUDE.md` |
| E-9 | A mutation sweep writes production source | An isolated `git archive` export | QA Phase 2 only | Yes in an export | qa.md |

E-2 and E-3 are where M6's change reaches outside the process. Their guard is AC-3.3 together with AC-6.2: what the editor saves
equals what was typed. **This does not discharge E-2 or E-3**: the routes marked UNVERIFIED are the code review's and Phase 2's to
read, and AC-3.3 is the sole control until they are read.

## Findings (to the planner, one batch)

QAF-1 HIGH Phase 1
AC-3.2 names the source of the editor's expected value (AN-6's legacy run, "never from the adapter's token map"). It does not name
what decides **membership** of the agree set, that is, agreement with "Discord's native mapping". Module 818948 is read as prose
only (D-4), so the plan has no runnable native mapping except the adapter's own token map. If the adapter's map decides membership,
every case the map gets wrong disagrees with the legacy run, leaves the asserted set, and lands in the known-differences list. The
defect class AC-3.2 exists to catch then removes itself, and the suite stays green.
*Asked*: membership is computed by a native mapping fixed independently of the adapter: AN-6's prose read frozen as literals, or a
separately written mapping like the researcher's `tbcmp.py`. The adapter's map never enters the oracle. Positive control: NM-28.

QAF-2 MEDIUM Phase 1
AC-3.1's membership parse uses a mask, and the plan does not say whose. If it uses the adapter's mask constant, a wrong mask moves
the affected cases into "disagree", and AC-3.1 cannot fail on them. AC-2.3 tests the constants, but not the masks the oracle runs.
*Asked*: the oracle passes AN-3's literal masks. NM-3 must turn AC-3.1 red on a member, not only AC-2.3.

QAF-3 MEDIUM Phase 1
AC-2.5 asks only that the characters show in all three states. A provider whose ready state never flips after `init` resolves (NM-6)
passes every limb, and every page shows plain text forever. This is a bounded behaviour ("until init resolves") with no cell
counting what happens after the event.
*Asked*: a resolved limb on every surface, where formatted elements appear after resolution (for example, `strong` for `**a**`).
State what "per page load" means under client-side navigation between two editor pages and with 6 surfaces mounted (NM-7).

QAF-4 MEDIUM Phase 1
P-Q3: a `Syntax` mask of `0` means ALL. P-Q4: `DEV_LINKS` is one of the 31 bits, and under ALL `dev://branch/main` is a link.
AC-2.3's table can therefore express neither "no markdown" (footer and author, if AN-3 confirms) nor the danger of a mask built by
subtraction that reaches 0.
*Asked*: AC-2.3 adds that no mask equals 0 and that a non-markdown surface never calls `parse`. AN-3's table rows carry `DEV_LINKS`
explicitly. Mutants: NM-4, NM-5.

QAF-5 MEDIUM Phase 1
AC-4.2 sets `href` to the engine's `url` and keeps no scheme guard. Today the engine refuses `javascript:`, `data:` and `vbscript:`
(P-Q4), and `simple-markdown` sanitised (inventory LF-4). But the package is 0.x with monthly releases (hazard 5), and `/preview`
renders other users' messages. Under the input-robustness order, where X could exploit, a guard is owed regardless.
*Asked*: an allow-list in the adapter's link renderer (http, https, mailto, plus whatever AN-3 allows), and a property over the
generator that every rendered `href` has an allowed scheme. Controls go both ways (Required Unit Tests). Mutant: NM-24.

QAF-6 MEDIUM Phase 1
(a) D-12 puts "every comparison against Discord" in `test:discord`. But AC-2.3, AC-5.6 and AC-3.2 take Discord-derived literals
(from AN-3 and AN-6), and the plan does not say which command holds them. Literals in `pnpm test` go stale with no link to the
drift alarm; literals only in `test:discord` leave `pnpm test` without the editor's expected values.
*Asked*: frozen literals in `pnpm test`, and `test:discord` re-derives them live and fails where a live value departs from the
frozen literal. That ties pin changes to a re-validation.
(b) The normaliser is built by this chain and judges AC-3.1. The Testing Strategy names only "its own tests run first", which is
neither the chain base nor a differently shaped second instrument (qa.md, "An Instrument Score Travels With Its Predicate").
*Asked*: the normaliser reports every Appendix A pair as differing, after its four recorded artefacts are dispositioned. As a second
instrument, use the research's DOM-to-canonical comparison over the posted messages, or AN-7's DOM reads. Mutant: NM-22.

QAF-7 MEDIUM Phase 1
AC-4.3's class omits **two identical timestamp strings** in one message. A target found by searching the source for the
timestamp's text (NM-8) passes every case where the timestamps differ.
*Asked*: add identical duplicates, `\<t:…>`, an invalid style letter (stays text, V-21), and timestamps inside a spoiler and a link
label.

QAF-8 MEDIUM Phase 1
"≥ 4,000 unique strings" is a size, not an enumeration of the class. Under agree-only, a construct that always disagrees, or that
the generator rarely emits on a surface, has no asserted member.
*Asked*: the command reports, per (Syntax bit × surface), the count of agree-class members containing that construct. A cell at 0
is named as unexamined. V2 text display is native-only, so it has no Discord expected value at all. AC-3.1 states that as residue,
not as covered.

QAF-9 LOW Phase 1
AC-3.3's "settles in fewer passes than Slate's iteration limit" is the absence-of-throw form. *Asked*: add a cell that counts after
the event, where a forced re-normalise after settling performs zero operations. Typing every generator input character by
character into a mounted editor has an unmeasured cost against `pnpm test`'s runtime. EC-4 measures it before the count is fixed.

QAF-10 MEDIUM Phase 1
The preview renders in users' browsers, and `WebAssembly.compileStreaming` refuses a response whose type is not `application/wasm`.
AN-1 records the wasm response's `content-encoding` and bytes, but not its `content-type`. Every walk is in Chrome.
*Asked*: AN-1 also records `content-type` under `next start` and on any Vercel Preview. B-1's resolved limb runs in Playwright
Firefox too (on the box, P-Q12). Safari is a stated gap (no WebKit on the box).

QAF-11 LOW Phase 1
M3's "inventory's 107 link inputs" existed only in the inventory session's scratch directory (P-Q8). They are now captured at
`verification/019/qa/link-inputs.json`: **106 distinct strings**, because 107 counts one string twice across the three runs.
*Asked*: the plan cites that path and the figure 106. The research's scratch instruments (`legacy-oracle.js`, `tbcmp.py`,
`domcmp.py`) are perishable in the same way. Lifting them is AN-4's and AN-6's, before a reboot loses them.

QAF-12 LOW Phase 1
AC-6.2's emoji forms omit flags, VS-16 against text presentation, tag sequences, an emoji newer than the site's table, `:🙂:`, and
emoji in link labels and targets (LF-2). CF-2 of the architect's conformance pass names the case where the engine and the Slate lift
recognise different emoji. That is a class for AC-5.2 and AC-6.2 here, whatever the plan decides about the lift.

QAF-13 LOW Phase 1
D-12's "offline" is undefined. With loopback down, 15 base cases fail that never leave the box (P-Q1c).
*Asked*: define offline as P-Q1's namespace (no route beyond loopback), and use the same namespace for AC-3.5's unreachable case.

QAF-14 LOW Phase 1
AC-2.6 has two problems. `grep -c` over a directory needs `-r`. And 0 at the base holds trivially, because the package is absent.
*Asked*: at the tip, the line is in a file the editor page actually loads (read from the page's network list or the build
manifest), not only in a sourcemap.

## Re-key on Revision 2

Revision 2 (record `8dfd4659`) was read by the Reading Order's QA row (Testing Strategy, M3, the criteria of M2 and M4 to M6,
Risks, Exclusions), plus M1, Assumptions, and § Finding disposition. R-2 (record `4c872804`) registers D-13 (OQ-5, option b: the
engine decides emoji) for revision 3, which rewrites AC-6.5 and X-8. That limb of this re-key is owed at revision 3.

### Findings QAF-1 to QAF-14: folded, each checked at its cited place

| Finding | Where revision 2 folds it | Check |
|---|---|---|
| QAF-1 | AC-3.2; AN-6 | Membership compares the legacy box run with "AN-6's frozen native mapping … separate from the adapter"; the adapter's map "never enters membership or expected value". **Closed.** |
| QAF-2 | AC-3.1; AC-2.1 | Both parses use AN-3's literal masks. AC-2.1 admits exactly one oracle helper that never imports the adapter's constants. **Closed.** |
| QAF-3 | AC-2.5 | Resolved limb present (`strong` for `**a**`); "per document" defined with six surfaces and client navigation. **Closed.** Pending is now today's hidden-until-ready, which opens QAF-15. |
| QAF-4 | AC-2.3; AN-3 | No mask equals 0; non-markdown surfaces never call the engine; `DEV_LINKS` named. **Closed.** |
| QAF-5 | AC-4.6 | Allow-list `http`, `https`, `mailto`, `discord`, with controls both ways. **Closed**, with QAF-17 on how the refusing control is built. |
| QAF-6 | M3 form; Normaliser | Frozen literals in `pnpm test`, re-derived live by `test:discord` (C4). Normaliser positive control (Appendix A) and second instrument (the DOM-to-canonical comparison on AN-7's reads). **Closed.** |
| QAF-7 | AC-4.3 | All six members listed. **Closed.** |
| QAF-8 | M3 coverage report; three-class table | Coverage per (bit × surface) with zero cells named; native-only is AC-3.6's renderer-fidelity check, with X-18 stating that no Discord standard applies there. **Closed.** |
| QAF-9 | AC-3.3 | Idempotence limb present; the count is fixed from EC-4, measured below. **Closed**, with QAF-16. |
| QAF-10 | AN-1; AC-2.5; X-17 | `content-type` recorded; Chrome and Firefox; Safari excluded. **Closed.** |
| QAF-11 | M3 fixed inputs; M1 | 106 distinct strings at the record path; scratch instruments lifted by AN-4 and AN-6. **Closed.** |
| QAF-12 | AC-6.2; AC-6.5 | The forms are listed. AC-6.5's form changes at revision 3 (D-13). **Closed for AC-6.2**; AC-6.5 is re-keyed at revision 3. |
| QAF-13 | M3; AC-3.5 | Offline defined as the loopback-only namespace and used for AC-3.5. **Closed.** |
| QAF-14 | AC-2.6 | A served file, `grep -rc`, and a control build with the mechanism removed. **Closed.** |

### Criteria new in revision 2, re-keyed

| Criterion | Population and instrument | Edge cases and mutants |
|---|---|---|
| AC-2.4 observed enumerator, and the unmapped-kind `console.warn` line | Every `type` and `kind` value returned over M3's inputs; at the pin, `paragraph` and `text` are observed but undeclared (P-1) | NM-29: an unmapped kind renders nothing instead of its source characters. Assert the warn line's fields (kind, version) and once per kind per document. |
| AC-2.7 rider R-A | `package.json` and the lockfile importer; `pnpm install --frozen-lockfile` in an export | A second pin moved by the install (AC-2.2's diff catches it). |
| AC-3.3 modes | full mode (content, description, field value, V2 text) and partial mode (title, field name); P-5's two paste refusals | After a refused paste the text is unchanged; a 6,000-character boundary (6,000 accepted, 6,001 refused: the boundary was read, not run). |
| AC-3.6 renderer fidelity | the disagree and native-only classes on every surface: 37 of 272 disagree as written, 33 stored (research, a record) | The expected value is the engine's tree through the normaliser, never the renderer: axiom E holds because the renderer is the code under test. |
| AC-4.6 link schemes | every rendered `href` over the generator and the fixed inputs | QAF-17 |
| AC-5.7 one parse per element | engine calls per decorate pass, counted; a line of ≥ 50 text nodes | NM-30: the cache keyed per text node, or never invalidated on a change. Add the stale limb: after an edit to a line, its next decorate re-parses it once, with the new text. Counting engine calls needs a pass-through mock of the engine module, because the adapter is the sole importer (AC-2.1). |
| AC-6.3 provision step | the analyst's sign-in read alongside AN-7 | B-4's earliest-decidable condition |
| AC-6.4 | an optional owner phone walk, carried by handoff 5b19c3e4 item 2 | Not a register row: its carrier is the handoff. |

### EC-4 measured: the cost of typing into a mounted editor (AC-3.3's count)

| | |
|---|---|
| Instrument | `verification/019/qa/typing-cost.probe.v2.test.tsx.txt`, copied into a `git archive af3d95a` export as `src/components/SlateEditor/__tests__/typingCostV2.probe.test.tsx`, run in the `dom` project under the loopback-only namespace |
| Input | the 272-case corpus as data, `verification/019/qa/corpus-272.json` (from Appendix C's first block), 3,362 code points |
| Drive | one `act(() => editor.insertText(ch))` per code point (`insertBreak` for a line break), on the real `SlateEditor` mounted with `createRoot`. The editor instance is read from `slate-dom`'s `ELEMENT_TO_NODE`. This is a model-level keystroke with render and decorate, not a browser `beforeinput` event. |
| Result (exit 0) | Mounted: **1.12 ms per character**; per input, median 5.1 ms, p95 44.4 ms, max 718 ms; 272 inputs in 3.77 s. Headless (the same plugins, no React): 0.85 ms per character, 2.85 s. Capture: `verification/019/qa/typing-cost-af3d95a.{json,log.txt,exit}`. |
| Projection | At the corpus's mean of 13.9 ms per input mounted, 4,000 generator inputs add about 55 s to `pnpm test` for the typed limb alone. This is a projection from 272 inputs, not a measurement of the generator. |
| Side reading | Typed character by character, 8 of 272 inputs do not keep their text, mounted and headless alike: `> a\n> b`, `> a\nb`, `> a\n\n> b`, `> a\n>>> b`, `😀`, `👍🏽`, `# h\ntext\n- a\n> q\n-# s`, `> ||sp||\n> **b**` (corpus rows 143, 144, 153, 159, 219, 220, 258, 262). These are named base-red candidates for AC-3.3's typed limb (AC-3.4), not verdicts. |
| Instrument history | Run 1 read `performance.now()` under fake timers and got 10 ms steps, with the headless figure at 0 (kept as `typing-cost-af3d95a-run1-defective.*`). Faking only the timer functions stalled slate-react's focus (run 2, `…-run2-stalled.*`). v2 binds the real `performance.now` before the timers install. |
| Open: what reaches the message | The component's `onChange` gave one write per mount, the opening `''`, and none for the typed characters (`typing-cost-writes-sample.json`, 3 inputs). So this drive does not reach what the message store receives. The cause was not read. See QAF-16. |

### New findings

QAF-15 MEDIUM Phase 1
AC-2.5's pending state is now today's hidden-until-ready (F-3), and nothing bounds it. Today's wait is a same-origin JavaScript
chunk. Revision 2 adds about 451 KB gzip of wasm and its compile (RK-7) to the same gate. A fetch that hangs rather than fails never
reaches the rejected state, so the message editor stays hidden with no message.
A gate that holds work back needs a liveness check beside its limit (qa.md, "Absence and liveness"). AN-1 measures time to the first
formatted render on a fast local `next start` only.
*Asked*: AN-1 also measures on a throttled profile (Chrome devtools "Slow 4G"), with the editor's time-to-shown recorded. The plan
then states either a bound (a timeout that moves pending to the rejected state's plain text) or a stated limit for a hung fetch.
B-1 carries the throttled observation.

QAF-16 MEDIUM Phase 1
AC-3.3's typed limb says "typing the input one character at a time into a mounted editor yields the same text". It does not say
where that text is read. EC-4's drive reached render and decorate but not `SlateEditor`'s `onChange`: one write per mount, none
for the typed characters. A property that reads `editor.children` can pass while the message receives something else.
*Asked*: the typed and pasted limbs read the value `onChange` hands the message (what save and send consume, E-2 and E-3). They
use a drive shown first to reach it: typing `a` yields a write `a`, as a positive control before any count. The implementer reads
why the model-level drive does not emit, and names the drive in the implementation document.

QAF-17 LOW Phase 1
AC-4.6's refusing control is "a planted `javascript:` url". The engine never returns one: P-Q4 shows `javascript:`, `data:` and
`vbscript:` give no link at 0.16.0. So the planted member has to be a tree node handed to the renderer, and that fixture invents
what the engine returns (Iron Law 5).
*Asked*: name it as such in the implementation document, and pair it with the generator property, which runs on the engine's real
output. `discord://` is admitted on research Appendix B row 42's word. Confirming the engine links it is a one-line run of P-Q4's
probe at the implementer's first commit.

## Re-key on Revision 3

Revision 3 (record `9ac9ba62`) was read as its delta from `4c872804`: § Results of M1, M2 to M6's criteria, M3's form, the outcome
table, the classes, the visible form and adjustment rule, the Testing Strategy, Risks, and Exclusions X-22 to X-24. It folds D-13 to
D-15 and analysis `aafecf1`.

### Folds of the second pass, checked

| Item | Where revision 3 folds it | Check |
|---|---|---|
| QAF-15 | M2 pending; X-22; B-1's Slow 4G reading | It takes the stated-limit branch, with the bound priced and not taken. That is the asked form. B-1 records the reading, and it is not a pass condition. **Closed.** |
| QAF-16 | AC-3.3, "Where the text is read" | The typed and pasted limbs read `onChange`, with the `a` → `a` control first; the implementer names the drive. **Closed.** |
| QAF-17 | AC-4.6 | An engine-level control and a renderer-level fixture named as invented engine output. **Closed.** |
| EC-4 | AC-3.3 count; AC-3.4 | 1,000 generator inputs plus the corpus and seeds in `pnpm test`, under a 60 s cap, re-timed with the `onChange` drive at M3. The eight rows are base-red candidates. **Closed.** QA Phase 2 reads the re-timed figure. |
| NM-30 | AC-5.7 stale limb | Re-parses the edited unit once, and no other. **Closed.** |
| QAF-12, AC-6.5 limb owed at revision 2 | AC-6.5 rewritten onto the engine (D-13) | See QAF-21. |

### Premises re-read in this pass

- **P-8, 16 files** (AC-6.6's population). Measured: `git -C website grep -l "simple-markdown" af3d95a -- . ':!pnpm-lock.yaml'` gives
  19 files, 16 of them `.ts`/`.tsx`/`.js`/`.mjs` (`package.json`, the patch and `pnpm-workspace.yaml` are the other three). **Equal
  to the plan's 16.**
- **AN-2's figures, from the capture.** `verification/019/analysis/an2/rows-{cold,warm}.json`: `formattedInDom` is true on 150 of
  150 in each. The minimum `marginMs` is 552.8 cold and **519.7 warm**, equal to the plan's quote.
- **AN-3's seven masks against AN-3's own table.** `verification/019/qa/probe-mask-vs-an3-table.{mjs,out}` decodes each mask with
  the pinned `Syntax` constants, beside the table's legacy cell (`verification/019/analysis/an3/an3-table.md`), over 8 columns × 31 bits = 248
  cells. **240 agree.** The 8 that differ are all `GAME_MENTION`: every native mask sets it, and the legacy formatter has no rule
  for it on any surface. So game mentions are a disagree or residue class on every surface, and AN-8's `GAME_MENTION` limb reads
  their written form. Positive control on the same run: the title mask with `BOLD` flipped is detected. AC-2.3's literals equal
  AN-3's values.
- **Drafts and D-13's new element shape.** `utils/messageDrafts.ts` at `af3d95a` stores `message.data` (the message's text form),
  not Slate nodes (`website@af3d95a src/utils/messageDrafts.ts`, line 77: `data: message.data`). So the emoji element's shape change reaches no stored draft. Read, not run.

### Criteria new or changed in revision 3, re-keyed

| Criterion | Population and instrument | Edge cases, mutants and asks |
|---|---|---|
| AC-2.3, seven masks | 7 × 31 = 217 literal cells (AN-3's values). 2026-11-23T17:31 reconcile (revision 5): six masks, the title and field name sharing one with and without an embed url, so 6 × 31 = 186 literal cells. | The title and field-name mask switches on whether the embed has a url (`0x19fecd7f` / `0x19fecd07`). NM-31: the adapter picks the no-url mask for a title with a url. Assert both on a title and on a field name. |
| AC-3.2, native box expected values (D-15) | AN-6's 85 typed cases, the 272 corpus typed, the generator's typed limb; module 818948 run live under jsdom | **QAF-18** |
| AC-3.7, legacy-visible equality, and the adjustment rule | 5 surfaces × their masks × (generator, 272, 106); disagree counts at AN-3 over 272: 37, 37, 32, 54 (37), 37 (the analysis, a record) | **QAF-19**. The visible form's positive controls are stated per invisible class and per counted dimension, which is the asked shape. |
| AC-3.8, staleness | three limbs in `test:discord` | Limb (i)'s member and non-member are named, and the member is still unread (the plan says so). A run where (i) has not been seen to fire on its member is not evidence. |
| AC-4.7, timestamp styles | 9 letters plus the bare form | **QAF-20** (the `R` letter is a time-based cell). NM-32: `s`/`S` fall through to raw source. |
| AC-4.8, spoiler pieces | every spoiler the engine splits, on every surface | A DOM test: activate one piece by click and by keyboard (a `detail: 0` click, Test Conventions), and count the revealed pieces. NM-33: reveal state kept per piece. |
| AC-5.6 / AC-5.7, run unit (D-15) | run units of adjacent `div` and `blockQuote` elements; a `codeBlock` ends a unit | Cases: a run across a quote and a plain line; a run broken by a code block; an emoji (`?`) inside a run that crosses lines. NM-34: the quote's `> ` prefix is left out of the joined text, which shifts every span after it. NM-35: a `codeBlock` does not end the unit. |
| AC-5.8, editor equals preview on legacy-only surfaces | 5 surfaces × (generator, 272) | Both sides come from one `parseLossless` tree. A defect in the tree or in the adjustment module shows on both and cancels here. AC-3.7 is that defect's only control, so AC-5.8 counts for the leaf map only. This is a stated scope, not a finding. |
| AC-6.5, the lift reads the engine | generator, 272, 1,662, under each surface's mask | **QAF-21** |
| AC-6.6, `simple-markdown` leaves | P-8's 16 files; package, patch, workspace entry, type file | Measured above. The module-graph instrument from AC-2.1, plus `pnpm install --frozen-lockfile` in an export. |

### E-4: declined as a register row, with its risk routed

The candidate was a post-deploy read of a production preview image of a formatted message.
- **Measured instead (AN-2).** The analysis ran the generator's own puppeteer, `goto` options and screenshot against the spike's
  `/preview`: 150 of 150 captures were formatted, and the minimum margin before `networkidle0` was 519.7 ms.
- **Why one image is not an instrument.** A post-deploy look at a single image cannot refute a race: a pass is one draw from a
  distribution that AN-2 already sampled 150 times.
- **Why the read has no executor.** The production images surface only on `/message` and `/message/f/[id]`, through
  `getPreviewImageUrl` (read at `af3d95a`). A fresh image needs a save on production by a signed-in account, and no stage here is
  cleared to make one.
- **What would refute it.** The open limb is a slower host CPU (RK-2, analysis H-1). Its stronger test is pre-release: AN-2's
  `an2-capture.js` re-run at 4× CPU throttle. That re-run has no owner in revision 3 (QAF-22).
- **X-21 stays**, and is now final: no stage reads a generated image after release.

### New findings

QAF-18 MEDIUM Phase 1
AC-3.2's live limb runs module 818948 "with the served wasm", while the site parses with the pinned 0.16.0. Under outcome C2 (served
≠ pinned), the outcome table calls the drift "not a failure". But AC-3.2's live limb then compares two parser versions. Any
difference shows up as C4 (frozen ≠ live) or C5 (a site defect), and a site that has not changed holds the gate for Discord's
release.
*Asked*: the live limb runs 818948 over the **pinned** wasm bytes, so the box's JavaScript is live and the parser is the site's. It
then reports separately what the served wasm changes. Or: under C2, AC-3.2's live differences are classed as drift and reported,
not C4 or C5. The same question applies to every live limb that runs the served wasm, and the implementer's re-derivation list
(M3, "Not re-derived") names the wasm each limb uses.

QAF-19 MEDIUM Phase 1
AC-3.7 passes an input that is "a member of a listed residue class". If membership is decided by the class predicate on the input,
a site defect on an input that also matches a residue predicate is excused. This is QAF-1's shape again, on the legacy-only
surfaces.
*Asked*: an input is excused only when its visible difference is the class's difference. Compare the visible-form diff signature,
meaning which unit and which dimension differ, not predicate membership alone. Each residue class reports its member count and how
many of its members match its signature, and a member that differs otherwise is C5.

QAF-20 LOW Phase 1
AC-4.7 asserts that `R` renders relative time. A relative-time cell depends on the clock, and in the standing suite it is a
time-based cell (testing-patterns skill, "Time-Based Tests").
*Asked*: the `R` case fixes the clock (fake `Date`) and asserts a literal, such as the wording for a timestamp a stated interval
before the fixed now. No live clock is read.

QAF-21 MEDIUM Phase 1
AC-6.5's property compares the lift's emoji ranges with "the `emoji` node spans that parse returns", where the parse is "the
adapter's one `parseLossless` parse" that the lift itself reads. Computed that way, the expected value comes from the code under
test (axiom E). A wrong mask constant, a wrong run-unit join (NM-34) or a wrong `?` substitution moves both sides together and
stays green.
*Asked*: the expected spans come from the test oracle helper (AC-2.1's second member), with AN-3's literal masks and the oracle's
own join of the run unit. Research Appendix B row 230 (`©`, `™` stay text) stays as a literal member.

QAF-22 LOW Phase 1
RK-2's open limb, a slower host CPU (analysis H-1), names its test, a 4× CPU-throttled re-run of `an2-capture.js`, but no owner or
time. With E-4 declined, nothing reads this risk before or after release.
*Asked*: assign that re-run, to the analyst before M4's approval or to UAT at B-1's build, and record its margin beside AN-2's
519.7 ms. A capture that is not formatted under throttle goes to steering as AN-2's fail outcome.

### Register sweep (D-13 to D-15 moved premises the rows were written against)

Predicate: a row whose condition, instrument or predicted value cites the editor's colouring, an embed or V2 surface, the emoji
element, or `test:discord`'s outcome. Members: B-3 (colouring), B-4 (emoji insert), B-6 (`test:discord`). B-1 is re-specified by
revision 3's own text. Checked and cleared: B-2 and B-5 are content-preview links only, and no ruling moved them.

## Re-key on Revision 4

Revision 4 (record `e53c7cdb`) was read as its word diff from `9ac9ba62`. It changes AC-2.3, AC-3.2, AC-3.7, AC-3.8, AC-4.7 and
AC-6.5, adds CF-9 (emoji re-decided on edit), CF-10 (the emoji display helper), AC-3.8 (i′), and X-25 and X-26. Devops runs
`test:discord` at Stage 1 of every later website release, and a C1 there holds no release.

**Disclosure.** One shell command in this pass was refused by the record-write gate. It read
`verification/019/analysis/an3/an3-table.md` as an argument beside a shell redirect, and the gate took it for a write to that
record. It was re-issued with the probe written by the Write tool and writing its own output file, so the table is only read. The
gate guards writes to record documents; this run wrote only `verification/019/qa/probe-mask-vs-an3-table.r4.out`.

### Folds of the third pass, checked

| Item | Where revision 4 folds it | Check |
|---|---|---|
| QAF-18 (with critique F-27) | M3 "Which wasm the native box runs on"; C2; AC-3.2 | The box runs on the pinned bytes through the harness's `fetch` shim, and its frozen literals are taken there too. Under drift, the box limbs are "not comparable under drift" and hold nothing. **Closed.** |
| QAF-19 (with F-29) | AC-3.7's frozen residue list | Each entry has a surface, a predicate evaluated on the oracle helper's parse with literal masks, and a signature. A predicate match with another difference fails as C5, and the list never grows from a run. **Closed.** |
| QAF-20 | AC-4.7 | `R` is asserted under a fixed clock against a literal. **Closed.** |
| QAF-21 | AC-6.5 "Expected value" | The spans come from the oracle helper, with its own join written from AN-6's description. **Closed.** |
| QAF-22 | AN-8's fifth limb; RK-2 | Assigned to the analyst, with UAT at B-1's build as the fallback. Fewer than 150 of 150 formatted goes to steering. **Closed**; B-1 is re-specified below. |
| GAME_MENTION cells | M4's mask line; AC-2.3 | Re-measured below. |
| E-4 | X-21 | Final, with QA's reason quoted. **Closed.** |

### GAME_MENTION, re-measured

`verification/019/qa/probe-mask-vs-an3-table.r4.{mjs,out}` (exit 0, network-isolated) clears `GAME_MENTION` on the five
legacy-only surfaces' masks and keeps content's. Over the same 248 cells, **1 differs**: content's `GAME_MENTION`, which revision 4
places in content's disagree class on purpose. Every mask is non-zero, and none sets `DEV_LINKS`. The planted control (`BOLD`
flipped) is detected.

The resulting literals, derived independently of the adapter from the pinned `Syntax` constants and AN-3's values, are AC-2.3's
expected values:

| Mask | Value |
|---|---|
| content | `0x3fffffff` |
| embed description | `0x3ffffbff` |
| embed field value | `0x3dfffbff` |
| embed title, and field name | `0x19fec97f` |
| embed title, and field name, when the embed has a url | `0x19fec907` |
| V2 text display | `0x3ffffbff` |

### Criteria changed or added in revision 4, re-keyed

| Criterion | Population and instrument | Edge cases, mutants and asks |
|---|---|---|
| AC-2.3 | the seven literals above | NM-39: `GAME_MENTION` left set on one legacy-only mask (the mask cell turns red, and AC-3.7 shows a game mention as an unlisted difference). |
| AC-3.2 | native box on the pinned wasm | The drift-time outcome "not comparable" needs a control that can produce it: a run with a planted mismatched wasm hash shows the limb reporting it rather than passing. NM-40: a box that fails to initialise is counted as a pass. |
| AC-3.7 frozen residue list | entries committed at M4 | NM-41: the signature compares only the unit, not the dimension. A residue entry must fail one input whose difference is on the right unit but on another dimension. |
| AC-3.8 (i′) | legacy calls in the two modules | Its member and non-member are named as for (i). X-26 is the stated gap. |
| AC-4.7 | 9 letters plus the bare form | The fixed-clock literal for `R` (QAF-20 closed). |
| AC-6.5, re-decided on edit (CF-9) | loaded text: the generator, the corpus and the 1,662 probe; typed edits: the 15,480-edit differential plus wrap and URL edits | **QAF-23.** NM-36: re-deciding runs on load only, not on edit. NM-37: code spans are re-decided but link URLs are not. NM-42: un-wrapping (removing the backticks) does not re-lift. |
| M4 emoji display helper (CF-10) | every emoji form of AC-6.2 | For each form, the preview's `img` `src` and jumbo state equal the editor element's (W-3). NM-38: the editor computes `src` itself. Jumbo: X-25 where no Discord read exists. |

### New finding

QAF-23 MEDIUM Phase 1
AC-6.5's "Property, typed edits" names its input class as "M3's lifted typed-edit differential (its 15,480 edits at the committed
seed), plus edits that wrap an existing emoji in backticks or move it into a link's URL". The differential's token lists hold **no
emoji**. `verification/fix-normalize-fence-loop/qa/probe.random-differential.test.tsx.txt` has `LEAD` and `BODY` of
markers, letters, backticks and quote prefixes only, and an emoji-range `grep -c` over the file gives 0. So the 15,480 edits cannot
exercise the emoji re-decision the property exists for. Only the hand-listed wrap and URL edits can, and the class has no
generator.
*Asked*: the typed-edit limb also runs, at every offset, over an emoji-bearing seed. The 1,662-line probe's token set holds `🙂`,
`👍🏻`, `❤️`, `:ok:` and `<:x:123>` (`verification/fix-emoji-pretransform-widths/code-review/probe2.review.test.tsx.txt`, `TOKENS`).
The edits are: insert a backtick before and after an emoji, delete a backtick that wraps one (un-wrap, NM-42), insert and delete a
link's `](` or `)` around one, and type an emoji inside an existing code span and inside a URL. The count is fitted to AC-3.3's
60 s cap.

### Register sweep (revision 4's moved premises)

Predicate: rows whose instrument or predicted value cites the generator capture, the native box's wasm, or `test:discord`'s
outcomes. Members: B-1 (QAF-22's fallback) and B-6 (the drift outcome). Checked and cleared: B-2, B-3, B-4 and B-5.

## Re-key on Revision 5

Revision 5 (record `d2912590`, with R-6 at `46248cd7`) was read as its word diff from `e53c7cdb`.

| Item | Where revision 5 folds it | Check |
|---|---|---|
| QAF-23 | AC-6.5, "Property, typed edits" | Emoji edits over the 1,662 probe's emoji tokens at every offset: backticks in and out (un-wrap re-lifts), `](` and `)` around an emoji, and an emoji typed inside a code span or URL. The emoji-free differential is kept for what it can check. The count sits inside AC-3.3's 60 s cap and is recorded at M6. **Closed.** |
| AC-2.3 literals | AC-2.3's table, cited to `cf895cd` | Six values, equal to `probe-mask-vs-an3-table.r4.out`. The `GAME_MENTION` clearing rests on a premise AN-8 has not yet read (critique F-31, in the Planner batch). A re-derivation at that pass re-opens AC-2.3's five legacy-only values. **Closed** for this revision. |
| AC-6.5 expected value (CF-11) | module 818948's emoji spans on the pinned wasm, frozen for `pnpm test`, re-derived by C4 | Independent of the adapter and of AN-6's prose (axiom E). The oracle helper is kept as a positive control against those literals. See EC-7. |
| C2 drift rule | M3 "Which wasm" | Under drift, a departure is reported with C2 and never classed as C4 or C5. A site regression is still caught by the frozen literals in `pnpm test`. That is consistent with QAF-18. |

**EC-7 (entry condition for AC-6.5, a probe shape).** AC-6.5 now has two clauses that can disagree. The lift "takes its emoji
ranges from the `emoji` nodes of the adapter's one `parseLossless` parse", while the expected spans are what the native box
(818948) lifts. Nobody has measured whether the box's emoji spans equal `parseLossless`'s `emoji` nodes over the same unit. Before
the literals are frozen at M6, the implementer runs both over the 272 corpus and the 1,662 probe and records the count of inputs
where they differ. On 0, the clauses are one. On any member, the plan names which one the lift follows. If following the box
changes what the editor shows against D-13's option text, that is his question through steering. This is an entry condition,
not a finding: neither clause is wrong until a member exists.

Register sweep: predicate, rows citing AC-2.3 or AC-6.5. No row does (B-4 cites AC-6.3's picker insert, whose element shape
revision 5 does not move). Checked and cleared: B-1 to B-6.

## Re-key on Revision 6

Revision 6 (record `946d4e54`) was read as its word diff from `d2912590`, with AN-8 limbs 2 and 2b in the analysis (record
`3681654e`). Captures for this pass are in `verification/019/qa/`. The probes ran under `unshare -rn` from an `npm pack` of
`@discord/markdown-wasm@0.16.0` (sha256 `bbc3b919…f9610`) and `-types@0.14.0` (`c5b0efdf…7b2`), re-packed in this session's
scratchpad.

**Attribution check.** `planner-019`'s message said a QA probe used the withdrawn `<game:id>` form. The record does not say so. The
form is in AN-3's bit driver (`verification/019/analysis/an3/an3-bits.json`, `GAME_MENTION` case `x <game:123456789012345678> x`).
The analysis attributes it to "the research's `<game:id>` guess" (AN-8 limb 2). QA's mask probes post nothing; they decode masks
against AN-3's table. So there is nothing in the record to correct, and the message's wording is corrected to the planner in the
same channel.

### AC-2.3 re-measured

`probe-mask-vs-an3-table.r6.mjs` (sha256 `5c919de3…34820`) types revision 6's six literals over eight surface variants. It compares
each against AN-3's table column (`an3-table.md`, sha256 `80c7e15f…cd18`). AN-3's `GAME_MENTION` row is stale, because it was
posted in the `<game:id>` form, so the probe replaces that row with limb 2b's run (`an8/gm-surfaces.json`, sha256
`774f85c4…0392`). In that run, legacy allows the bit where every one of the three cases holds a `gameMention` node.

Predicted: 0. **Result: `r6 cells 248 mismatches 0`** (`probe-mask-vs-an3-table.r6.out`). Two controls ran on the same run, and
both fired:
- Revision 4's masks give exactly three disagreements: `GAME_MENTION` on the description, the field value and the V2 text
  display.
- A `BOLD` flip on the title mask is detected.

No mask is `0`, and `DEV_LINKS` is clear on all six.

### Premises of revision 6, run (`probe-r6-premises.mjs`, `.out`)

| # | Premise | Result |
|---|---|---|
| P-Q14 | AC-6.5: `0x02000000` is the heading bit ("by inference from AN-3's table") | **Holds**: `0x02000000 = HEADING`. The field value clears only HEADING relative to content. The title and field name masks clear the five mention bits, CODE_BLOCK, HEADING, LIST and SUBTEXT, and the url variant also clears the four link bits. |
| P-Q15 | AC-6.5: the field value's emoji spans equal content's, so the box is its expected value | **Holds on the measured set**: `parseLossless` emoji-node spans under each mask, against content's, over 417 inputs. The inputs are the 272 corpus, the 106 link inputs and a 39-cell grid (`🙂`, `:ok:`, `<:x:…>` inside 13 constructs: plain, inline code, code block, heading, subtext, list, masked-link label, URL path, `<…>` link, quote, spoiler, bold, escaped). Description, field value and V2 differ on 0 inputs. Control: content with EMOJI cleared differs on 24 of 39 grid cells, the cells that hold an emoji under content. |
| P-Q16 | AC-6.5: the title and field name surfaces can differ from content (CF-12's reason for the helper) | **Only with an embed url.** The title and field name mask with no url differs on **0** of 417 inputs. The grid covers every bit it clears that can hold an emoji: code block, heading, list and subtext; a mention holds no emoji. With an embed url it differs on 11, all link constructs (masked-link label, URL path, `<…>` link, and bare `https://x.y🙂`). This bears on QAF-24. |
| P-Q17 | AC-4.7: the `Intl` option sets give Discord's bytes under Node | **Holds**: Node v24.14.0, ICU 78.2, `en-US`, `timeZone: 'UTC'` print `11/14/23, 10:13 PM` and `11/14/23, 10:13:20 PM`. They match the drawn text in `an8/dom-account1.json` code point for code point, with U+0020 before `PM` and not U+202F. This box's default locale and zone give the same string with neither passed, which bears on QAF-25. |

### Criteria changed in revision 6, re-keyed

| Criterion | Population and instrument | Edge cases, mutants and asks |
|---|---|---|
| AC-2.3 | the six literals, 31 bits by 8 variants | NM-39 is re-specified. 2026-11-23T17:51 reconcile: the mutant is `GAME_MENTION` flipped on any one variant: set on a title or field name mask, or cleared on the description, field value or V2 mask. Each flip turns a mask cell red. The probe's r4 control shows the rich-surface half of the class. |
| M3 corpus (limb 2) | the four limb 2 cases (`an8/gm-cases.json`) | Content's game mentions move to the agree class, so they enter AC-3.1's agree corpus with Discord's expected node. On the title and field name, both formatters leave the text literal, so those cases are agree members too, not AC-3.7 residue. |
| AC-4.7 | 9 letters plus the bare form; `s` and `S` literals (P-Q17) | **QAF-25.** NM-43: the component passes `'en-US'` and `'UTC'` instead of the viewer's locale and zone. |
| AC-6.3 / B-4 | the picker walk on a local build | Provision step re-keyed into B-4 (register). The plan's step is checked against the workspace `CLAUDE.md` "Local builds of `website`" rule. It moves the sequence after the schema push and before any save. The rule's further obligations bind UAT: record the id range written, recreate a database holding low ids, and stop and remove what the run set up. B-4 now carries them. |
| AC-6.5 expected value (CF-12) | box: content, description, field value, V2; helper: title and field name | P-Q14 and P-Q15 confirm the box's assignment on the measured set. **QAF-24** covers the helper's control. EC-7 and the critic's "box exposes its spans" condition are folded as I asked, with the lift following the box on any member: **closed**. |

### New findings

QAF-24 MEDIUM Phase 1
AC-6.5's helper limb (title and field name) has a content run as its positive control: "over content, the helper's spans equal
the box's frozen literals". That control cannot fail when the helper ignores its mask. Under content's mask the helper is right
by construction. On the no-url title and field name mask it is also right by coincidence, because that mask moves no emoji span
on any of 417 inputs (P-Q16). So a helper that always parses under content's mask passes the control and every no-url case. The
one place the helper differs from the box is the url variant, on link constructs. The property "the helper runs under AN-3's
literal masks" has no assertion that fails when it is lost.
*Asked*: the helper's limb carries, as fixtures that alone decide the outcome, the url-variant link members P-Q16 found: `[🙂](https://x.y)`,
`https://x.y/🙂`, `<https://x.y/🙂>` and `https://x.y🙂`, each with each of the three emoji forms. For each, the expected span is
an independent literal: the emoji is a span under the url mask, where links are off. Name NM-44, the helper parsing under
content's mask, and show it red on those fixtures. The no-url title and field name may stay on the box, which P-Q16 shows equal
to content on this set. That choice is the planner's, and the sweep bounds it to these 417 inputs.

QAF-25 MEDIUM Phase 1
AC-4.7 says `s` and `S` render "in the viewer's locale and time zone". The only literals it asserts are for `en-US` and UTC, and
that is this box's own default (P-Q17: `Intl.DateTimeFormat` with no locale and no `timeZone` prints the same string). So a
component that hard-codes `'en-US'` and `'UTC'`, or one that drops the viewer's zone, passes every stated assertion here. A test
that only passes because the host is UTC also fails on any machine that is not. "Viewer's locale and time zone" is a behaviour
the criterion claims, with no assertion that fails when it is lost.
*Asked*: the AC-4.7 test sets the zone and locale itself, by an injected argument or a fixed `TZ` for the process, and never
relies on the host's default. It adds one case in the other direction, with an independent literal: `<t:1700000000:s>` for an
`en-US` reader in `America/New_York` is `11/14/23, 5:13 PM` (22:13 UTC is 17:13 EST on 14 November). NM-43 is red on it. Other
locales' wording stays X-19's residue.

### Register sweep (revision 6's moved premises)

Predicate: rows whose instrument or predicted value runs a local build, signs in, cites AC-2.3's masks, AC-4.7 or AC-6.5, or reads
AN-8. Members: B-1 (local build; AN-8 limb 5), B-2 and B-3 (local build), and B-4 (sign-in, AN-8 limb 3).
- Re-specified: B-4, with the provision step, host, id-range record, teardown and limb dependency, each a dated reconcile in its
  own cell.
- Checked and cleared: B-1 (limb 5 is still in progress, and the row's fallback stands unchanged); B-2 and B-3 (no sign-in or save in
  their walks); B-5 and B-6 (no member).

Rows inherited and not discharged: B-1 to B-6, all open.

## Re-key on Revision 7

Revision 7 (record `e0eb1e87`, with R-11 at `5960e792` and R-12 at `afd62e33`) was read as its word diff from `946d4e54`. The
website was read at `af3d95a` by `git -C website show` (`MarkdownTimestamp.tsx`, `Markdown.tsx`, `LoadLocale.tsx`, `rules.tsx`'s
timestamp rule, the `dayjs/locale` imports of `src/utils/loadLocales.ts`).

| Item | Where revision 7 folds it | Check |
|---|---|---|
| QAF-24 | AC-6.5, the helper's second control | The url-variant link fixtures, each with a Unicode, a `:name:` and a custom emoji, and NM-44 red on them. **Closed.** |
| QAF-25 | AC-4.7, "What the test sets" | The test sets locale and zone itself. It asserts the `en-US` UTC literals and `America/New_York`'s `11/14/23, 5:13 PM`. The planner's `S` there, `11/14/23, 5:13:20 PM`, is reproduced in P-Q18. **Closed**, but see QAF-26 for the branches revision 7 adds. |
| F-32 | AC-4.7, a marked deviation | dayjs cannot give Discord's text, so `s` and `S` leave `TIMESTAMP_TO_DAYJS_FORMAT` with a stated reason. No test consequence beyond AC-4.7's literals. |
| CF-13 (a) | AC-4.7, "Everything else follows the sibling" | Two new branches, UTC while `state.mounted` is false and the locale from `LoadLocale`. They are QAF-26. |
| Heading bit | AC-6.5, read and measured | Agrees with P-Q14 (`0x02000000 = HEADING`) and P-Q15. |
| AC-2.3 | unchanged, released | Nothing to re-key. |

**P-Q18 (run; `probe-r7-timestamp-locale.cjs`, `.out`).** Node v24.14.0, ICU 78.2, dayjs 1.11.7 read from the shared tree's
installed `node_modules`, under `unshare -rn`:
- Pre-mount, `en-US`, UTC: `s` is `11/14/23, 10:13 PM`.
- Mounted, `en-US`, `America/New_York`: `s` is `11/14/23, 5:13 PM` and `S` is `11/14/23, 5:13:20 PM`.
- "The locale `LoadLocale` sets for dayjs" has two readings: the tag react-aria hands `dayjs.locale()`, or the locale dayjs
  resolves it to.
  - They agree for `en-US` (dayjs `en`), `en-GB` (`en-gb`, giving `14/11/2023, 22:13`) and `de-DE` (`de`, giving
    `14.11.23, 22:13`).
  - They differ for `ja-JP`, a locale the site does not load into dayjs: dayjs falls back to `en`. The tag gives
    `2023/11/14 22:13`, and the resolved locale gives `11/14/23, 10:13 PM`.
  - 2026-11-23T18:01 reconcile: **this bullet is wrong for the site.** The probe loaded only `de` and `en-gb`, so `ja` was unloaded in
    the probe, not on the site. That was defensible only for the probe's own setup. It was never checked against
    `src/utils/loadLocales.ts`, which imports `dayjs/locale/ja`. On the site, `ja-JP` resolves to `ja`, and both readings give
    `2023/11/14 22:13` (P-Q19, § Re-key on Revision 8). The statement holds for a tag with no file there, such as `vi-VN`, `cs-CZ`
    or `da-DK`. QAF-26 (iii)'s `ja-JP` example below carries the same error.

**Read, for AC-4.3 (QAF-27).** At `af3d95a`, two sites restrict the style letter to `[tTdDfFR]`:
- `rules.tsx`'s timestamp match. So `<t:…:s>` is text today and takes no timestamp index.
- `MarkdownTimestamp.tsx`'s replace regex, which `Markdown.tsx` counts by `index`.

Once `s` and `S` render as timestamps, any surviving copy of that regex makes the i-th rendered timestamp and the i-th regex match
diverge. An edit would then rewrite the wrong timestamp in the user's message. AC-4.3 already removes the count: the target comes
from a span, and CF-6 changes the callback. So this is a coverage point, not a defect in the plan.

### New findings

QAF-26 MEDIUM Phase 1
AC-4.7's CF-13 fold adds two behaviours, and no stated assertion fails when either is lost:
- **UTC while `state.mounted` is false.** Every stated case pins a zone, so a component that ignores `mounted` passes all of them.
  The en-US UTC case passes because its zone is already UTC, and the New York case passes if it runs mounted. NM-45 is that
  component.
- **The locale from `LoadLocale`.** Every stated case is `en-US`, which is also the default. So a component that passes `'en-US'`,
  or no locale at all, passes (NM-46).

The locale clause is also ambiguous, and P-Q18 shows the two readings differ for any locale the site does not load into dayjs.
For `ja-JP`, the sibling's dayjs output is English, while `Intl` given the tag is Japanese. Under the contract-first order, the
contract is the thing to fix, not a guard behind it.

*Asked*:
- (i) A pre-mount case, `state.mounted` false with the zone set to `America/New_York`, expecting `11/14/23, 10:13 PM`. The mounted
  New York case stays, and NM-45 is shown red on the pair.
- (ii) A non-default locale case, with dayjs's locale set through the path `LoadLocale` uses. For `en-GB` and UTC the expected
  value is `14/11/2023, 22:13`. NM-46 is shown red on it.
- (iii) AC-4.7 names which reading it means. Either the tag (`useLocale`'s value), or dayjs's resolved locale, which "follows the
  sibling" suggests. If dayjs's, a `ja-JP` case expects `11/14/23, 10:13 PM`. If the tag, it expects `2023/11/14 22:13`.

The literals are ICU 78.2's, so the test records the Node it ran under.
*Routing*: this is a severity-floor finding, a behaviour the criterion claims with no assertion that fails when it is lost. So it is excepted from M4's revision cap (effort rulings block "2026-11-23T17:56Z", record `b95a3d43`) and is asked as a revision item.

QAF-27 LOW Phase 1
AC-4.3's message class lists timestamps inside code, duplicates, escapes, invalid letters, spoilers, link labels and added ones.
It names no member where an `s` or `S` timestamp precedes the edited one. That member is new with AC-4.7, because `<t:…:s>` is
text at `af3d95a`. It is also the only input that reddens a surviving `[tTdDfFR]` copy in the replace or match path (the read
above). The span-addressed design makes the member pass by construction, so the ask is a named fixture, not a change.
*Asked*: AC-4.3's class gains `<t:1700000000:s> <t:1700000000:f>`, editing the second (the `f`, i = 1), expecting only the `f`
rewritten. NM-47 is the replace regex left at `[tTdDfFR]`, red on it.
*Routing*: LOW on M4, under the cap (block "2026-11-23T17:56Z"). It goes to the plan's Planner batch as a stated limit, with no revision round. QA Phase 2 looks for the member when it audits AC-4.3, and records its absence as residue.

### Register sweep (revision 7's moved premises)

Predicate: rows whose instrument or predicted value cites AC-4.7, AC-4.3, AC-6.5's helper, or a timestamp. Members: none. B-1
to B-6 are checked and cleared: B-2 and B-5 read link hrefs, B-3 colours, B-4 the picker, and none renders a timestamp style.

Rows inherited and not discharged: B-1 to B-6, all open.

## Re-key on Revision 8

Revision 8 (record `7b419f5b`, with R-13 to R-15) was read as its word diff from `e0eb1e87`. It changes AC-4.7 only, and registers
D-16 and steering's revision cap.

| Item | Where revision 8 folds it | Check |
|---|---|---|
| QAF-26 (i) pre-mount | AC-4.7, "What the test sets" | `state.mounted` false, `America/New_York`, `11/14/23, 10:13 PM`, with NM-45. **Closed.** |
| QAF-26 (ii) loaded locale | the same | `en-GB` through `LoadLocale`'s dayjs path, `14/11/2023, 22:13`, with NM-46. `en-gb` is in `loadLocales.ts`. **Closed.** |
| QAF-26 (iii) which locale | AC-4.7, "Locale" | The resolved `dayjs.locale()`, never the tag. **Closed** as a contract. Its unloaded-tag fixture is QAF-28. |
| Mounted `America/New_York` | the same | `s` and `S` both, as P-Q18 gives. |
| QAF-27 | Planner batch, stated limit under the cap | The member is written there. QA Phase 2 looks for it at the AC-4.3 audit. |
| D-16, picker | AC-4.7 | The picker offers `R` as a separate button (read at `MarkdownTimestamp.tsx` `af3d95a`). This document never claimed the picker omits `R`, so nothing here needs correcting. |

**P-Q19 (run; `probe-r8-timestamp-locale.cjs`, `.out`).** The probe loads exactly the dayjs locales `src/utils/loadLocales.ts` imports
at `af3d95a`: 29 of them, `ja` included. Its control, with none loaded, reproduces P-Q18's `ja-JP -> en`. With the site's set loaded:
- `ja-JP` resolves to `ja`. Both readings give `2023/11/14 22:13`, so they **agree**.
- `vi-VN`, `cs-CZ` and `da-DK` resolve to `en`. The resolved locale gives `11/14/23, 10:13 PM`, while the tag gives
  `22:13 14/11/23`, `14.11.23 22:13` and `14.11.2023, 22.13`, so they **differ**.
- `en-US` and `en-GB` agree, as before.

The architect's CF-14 already named `vi-VN`. QA's `ja-JP` example came from P-Q18's wrong premise. The method failure: the probe's
loaded set was not derived from the site's file.

### New finding

QAF-28 MEDIUM Phase 1
AC-4.7's unloaded-tag fixture is "`ja-JP`, UTC: `s` is `11/14/23, 10:13 PM`, the `en` form dayjs resolves to. A mutant that passes
the tag to `Intl` is red on it." On the site, dayjs resolves `ja-JP` to `ja`, because `loadLocales.ts` imports it. A correct
implementation then renders `2023/11/14 22:13`, so the fixture's expected value is wrong, and the test fails against correct code.
The tag-passing mutant renders the same string, so the fixture cannot tell the two apart. The clause "never the tag" is left
with no assertion that fails when it is lost: a severity floor, excepted from the cap (block 17:56Z). The error is QA's
(P-Q18, corrected above).
*Asked*: the fixture's tag becomes `vi-VN`, a tag with no file in `loadLocales.ts`, expecting `11/14/23, 10:13 PM`. The
tag-passing mutant renders `22:13 14/11/23` and is red on it (P-Q19). The test supplies the tag where `LoadLocale` reads it
(react-aria's locale), not by calling `dayjs.locale` directly. Otherwise the mutant has no tag to pass, and the fixture cannot
represent the case.

### Register sweep

Predicate: rows citing AC-4.7 or a timestamp. Members: none. B-1 to B-6 are checked and cleared.

Rows inherited and not discharged: B-1 to B-6, all open.

## Re-key on Revision 9

Revision 9 (record `47348a6d`) was read as AC-4.7's delta from `fb162ef1` only, per effort rulings block "2026-11-23T18:02Z"
(record `0a794563`).

| Item | Where revision 9 folds it | Check |
|---|---|---|
| QAF-28 | AC-4.7, the unloaded-tag fixture and the "Locale" sentence | The case is `vi-VN`, UTC, expecting `11/14/23, 10:13 PM`. The tag mutant gives `22:13 14/11/23`, with `loadLocales.ts` loaded and the tag supplied through react-aria's locale. All of it matches P-Q19. The locale sentence now cites P-Q19 and no longer P-Q18. **Closed.** |
| Alternates | AC-4.7 | `cs-CZ` and `da-DK` resolve to `en` and differ from their tags (P-Q19), so each serves the same role. |

No new finding. Register sweep: predicate, rows citing AC-4.7 or a timestamp. Members: none, so B-1 to B-6 are cleared. Rows
inherited and not discharged: B-1 to B-6, all open.

## Re-key on Revision 10

Revision 10 (record `890d0b78`) was read as its delta from `47348a6d` (`git show 890d0b78`): AC-4.4, D-17, M4's Mirrors line,
G-13's carriage line, the Owed re-verdicts row and the Planner batch row for block 21:18Z. Nothing else moved. The trigger is
the M4 production round that opens on AC-4.4's moved criterion (M4's mention code is held for this pass). Premises were read by
`git show` at the commits the plan cites, captured in `verification/019/qa/probe-r10-mention-premises.out` (P-Q20 below).

### Premises of revision 10, run (P-Q20)

| Plan claim | Read | Result |
|---|---|---|
| `MENTION_KINDS` is `user`, `channel`, `role`, `game`, `command`, `everyone`, `here`, `static`, with five `STATIC_MENTION_KINDS` (`website@7dcedc9 src/utils/markdown/engine.ts`) | § 1 | Holds: 8 keys, `static` carrying `home`, `browse`, `customize`, `guide`, `linked_roles`. So the table's input space is 12 leaf kinds. |
| Today's form: `discordChannel`, `discordRole`, `discordUser`, `discordEveryone` render their capture in a `discord-visualizer__mention` span; no command rule (`website@5ec0621 rules.tsx`) | § 2 | Holds. Channel and user carry `discord-visualizer__mention discord-visualizer__interactive`; role and `@everyone`/`@here` carry `discord-visualizer__mention` alone. The user regex is `^<(@!?([0-9]+))>`, so `@!<id>` is today's form for `<@!id>`. |
| `useGuild` throws outside the provider; the list is held 5 min, no refetch on focus; the server caches it 10 s | § 3, § 4 | Holds: `throw new Error('Guild components must be wrapped in <Guild />')`; `staleTime: 5 * 60 * 1000`, `refetchOnWindowFocus: false`; `expireSeconds: 10`. While loading or failed, `channels` is `[]` (`channelsAndHooks ?? { channels: [], webhooks: [] }`). |
| The list is text and voice channels with names, each with its active threads | § 4, § 10 | Holds, with a correction the residue needs: `TEXT_CHANNEL_TYPES` is `[0, 5, 15]`, so **forum channels (15) and announcement channels (5) are on the list**, and an active forum post is attached to its forum's `threads`. Category (4) is absent. Each thread entry holds `{ id, name }` only. See QAF-31. |
| `Providers` mounts only in `src/app/message/layout.tsx`; `/preview` is outside it | § 5 | Holds. |
| The M4 preview renders mentions through no rule yet | § 6 | At `93b26fd` (M4 slice 1), `renderLosslessTree` sends `mention` to `sourceOf`, the source text, and takes no context. The lookup is still to be written, which matches the hold. |
| `<#1574358729577599086>` is `slate-oracle-walk` | § 7 | AN-3's `an3-dom2.json` holds the id 4 times and the name beside Discord's rendered pill. That is Discord's capture, not this site's list. Whether a local build's list holds it is this pass's assumption (below). |

### AC-4.4 re-keyed: the decision table, verified as an oracle over its whole input space

This replaces the AC-4.4 rows of § Per-criterion population ("13 kinds … an unknown id per kind (V-18 forms)") and NM-27's
"unresolved" reading. The V-18 forms (`@unknown-role`, `/ping`) are now outputs the criterion forbids, no longer expected values.

**The input space.** The 12 leaf kinds × the list states the code can be in: (a) no provider in reach (`/preview`, or a surface
mounted bare); (b) provider, empty list (loading, failed, signed out, no guild chosen: all reach the code as `[]`); (c) provider,
list without the id; (d) provider, the id is a top-level channel; (e) provider, the id is only a thread under a listed channel.
That is 60 cells. The channel row varies by state; the other 11 kinds are invariant across all five. Each cell's expected value
is a literal written in the test (axiom E), never derived from `rules.tsx` or the lookup. The oracle iterates `MENTION_KINDS` and
`STATIC_MENTION_KINDS` with a `satisfies Record<…>` expectation map, so a kind added to the engine fails to type-check until its
row is written.

**Each conjunct carries the decision alone in at least one fixture.**

- *Kind is `channel`.* A role `<@&C>` and a user `<@C>` whose id `C` is a listed channel's id, in state (d): both keep today's
  form. This is the coupling fixture: a lookup keyed on the id alone renders the channel's name there (NM-52).
- *The id is on the list.* Two listed channels, the mention naming the second: the second's name (NM-49). State (c) with a
  non-empty list: `#<id>` (NM-49, NM-50).
- *Top-level or thread.* State (e), the id only in a channel's `threads`: the thread's name (NM-48). An active forum post under a
  listed forum (type 15): its name (QAF-31's member).
- *A list is in reach.* The same content in state (a) and state (d): `#<id>` and the name. State (a) is a real mount of
  `/preview`'s page (the existing `src/app/preview/__tests__/page.invalid-data.test.tsx` harness is the pattern to extend) and
  asserts the page rendered, not merely that no name appeared (NM-51).

**Both directions per named sub-class.** For each row of the table: a member that resolves (a listed channel, a listed thread, a
listed forum) and a member that does not (unlisted, empty list, no provider), at the granularity the code consumes, the rendered
text and the pill's class list. A category id (type 4, absent from the list) is the unlisted member that looks most like a listed
one.

**The negative clause is a class, enumerated.** "No mention renders `unknown`, `@unknown-role` or `@unknown-user`": the oracle
asserts over all 60 cells, and over the M3 generator's corpus rendered through the preview in states (a) and (c), that no
rendered text node contains `unknown` (case-insensitive). Its positive control is NM-50 and NM-56, each seen red on it.

**On every surface.** One state-(d) and one state-(a) fixture per preview surface (`Markdown.tsx`, `ContentBody`,
`TextDisplayEditor`, `Embed`, `EmbedTitle`, `EmbedField`, the `DiscordContentEditor` read-only branch, `/preview`), so a surface
the lookup is not wired into is red (NM-57, one mutant per surface).

**Fixture realism (Iron Law 5).** The list a fixture supplies has `fetchChannels`' output shape at `website@5ec0621`:
`{ id, name, type, threads: [{ id, name }] }`, with no field the list does not hold (threads carry no `parent_id` or `type`). It
reaches the code through the same context `GuildProvider` provides, or the value type it holds; the implementer's document names
which. A fixture that hands the renderer a resolved name directly measures the arithmetic, not the wiring, and does not count.

**Residue, recorded, not blocking.** The name's staleness window (5 min client, 10 s server) has no test by design. Archived
threads and categories render today's form. A thread under an unlisted parent renders today's form. These go to the
known-differences list.

**Human-observable form.** Minted as register row B-7.

### Named mutants added (each seen red before its test counts; seeded at M4's Phase 2 sweep)

- NM-48 Mention lookup: top-level channels only, threads ignored. AC-4.4 state (e).
- NM-49 Mention lookup: returns the first listed channel whatever the id. AC-4.4 two-channel and state (c) fixtures.
- NM-50 Mention lookup: an unlisted id renders `#unknown` (or `#deleted-channel`). AC-4.4 state (c) and the negative clause.
- NM-51 Mention lookup: reads `useGuild()`, which throws outside the provider. AC-4.4 state (a) on `/preview`.
- NM-52 Mention lookup: keyed on the id without the kind (coupling). AC-4.4's role and user fixtures with a listed channel's id.
- NM-53 Resolved channel: name rendered without `#` (Discord's icon form). AC-4.4 state (d) text.
- NM-54 Resolved channel: the pill loses `discord-visualizer__interactive`. AC-4.4 state (d) class list.
- NM-55 User mention: `<@!id>` renders `@<id>`. AC-4.4's user row.
- NM-56 Role mention: renders `@unknown-role` (the retired V-18 branch). AC-4.4's role row and the negative clause.
- NM-57 Surface wiring: one surface gets no lookup (six to eight mutants, one per surface). AC-4.4 per-surface fixtures.
- NM-27 is re-keyed: a mention in any state renders empty. AC-4.4, every cell.

### New finding

QAF-31 LOW Phase 1 Duplicates: F-34 in critiques/closed/019-slate-formatting-discord-engine-critique.md
AC-4.4's Residue says "Forum, category and archived thread ids are not on the list and render today's form". At
`website@5ec0621`, `fetchChannels` keeps channels whose type is in `TEXT_CHANNEL_TYPES` `[0, 5, 15]` or `VOICE_CHANNEL_TYPES`
`[2, 13]` (`src/constants/index.ts`; P-Q20 § 10), so a forum channel (15) is on the list, and an active forum post is attached to
its `threads`. By the table's first row, both render their name. The property: the Residue names only ids the list leaves out, so
an implementer and QA read one expected value for a forum mention. If the implementer follows the Residue, either the lookup
filters forums (a deviation from the table no criterion asks for) or a forum fixture asserts the id form and encodes a wrong
expectation. Ask: strike "Forum" from the Residue (categories and archived threads stay). Until folded, Phase 2 reads the table's
first row as authoritative: a listed forum and an active forum post render their names. Under the M4 cap (block 17:56Z) this is a
stated-limit candidate for the Planner batch.
2026-11-23T21:44 reconcile: the critic raised the same member first (F-34, record `71b981ad`). The planner registered it as SL-11 (R-32, record `223d3911`) with the reading "category ids, archived thread ids, and channel types outside [0, 5, 15, 2, 13]", list membership taken from `fetchChannels`' filter. That reading matches P-Q20 § 4 and § 10, and Phase 2 uses it. QAF-31 is carried as SL-11 until the seam fold.

### Register sweep (D-17 moved AC-4.4's premise)

Predicate: rows citing AC-4.4, a mention, G-13 or `GuildProvider`. Members: none of B-1 to B-6 (B-4 cites the emoji picker, AC-6.3,
whose usable-emoji limb D-17 left unchanged; checked and cleared). B-7 is minted for AC-4.4's human-observable form. Rows inherited
and not discharged: B-1 to B-7, all open.

Phase 1 is keyed to revision 10. Open for the planner: QAF-31 LOW. Nothing else blocks M4's mention code from QA's side.

## Re-key on Revision 11

Revision 11 (record `ec2440d9`) was read as its delta from `48e39a5f`, AC-3.7's frozen residue list only: entries per input,
surface and mask; the signature made exact; family and reason; the stale-entry failure; RK-9's unit. The trigger is M4's residue-list
commit, which waits on this pass. A premise the revision cites was run: P-Q21, `verification/019/qa/probe-r11-residue-population.out`.

### Premise run (P-Q21): the population the list is measured over

The revision cites "500 of 1,344 inputs" for embedDescription and v2Text and "818 of 1,545" for embedTitle, from
`verification/019/impl/m4-dom-residue-before.json`. In that file every surface has `n: 2378`, the whole of AC-3.7's input classes,
which matches M3's live run. Beside it is `atomFree`: 1,344 on embedDescription, fieldValue and v2Text, and 1,545 on embedTitle and
embedTitleWithUrl. The `count` is taken over `atomFree` only. Members per surface: 500, 501, 818, 354 and 500, each distinct, over 148,
151, 174, 132 and 148 classes. So the DOM measurement compares only the inputs that hold no atom (mention, emoji, timestamp). Neither
the M4 implementation document nor the plan states that exclusion (`grep` of the M4 document for `atomFree` or "atom-free": 0 hits).
The legacy-only `m4-residue-measurement-6379abc.json` covers all 2,378 (1,190, 1,208, 1,369, 630 and 1,190 differ; these equal QA's
M3 run at `2c1590f`). See QAF-34.

### AC-3.7's list re-keyed: each failure clause carries the decision alone

The check reads, per surface and mask, the site's preview against live legacy in the visible form, and the frozen list. The plan's
three failure clauses and the two passing cases each get a fixture in which that clause alone decides. Each fixture is a planted list
or a planted input over the real check, never a copy of its logic:

| Clause | Fixture (planted) | Expected |
|---|---|---|
| differs, no entry | the real list with one entry removed | red, naming the input and surface |
| entry, signature not exact | one entry's signature changed: (a) one unit's position moved, (b) one dimension added, (c) one dimension dropped, (d) one differing unit dropped | each red. (b) and (d) separate an exact comparison from a subset or superset test |
| stale: input equals legacy | an entry planted for an input the site renders equal to legacy (an agree-class corpus member) | red, as stale |
| stale: input not in the classes | an entry planted for a text the generator at its seed and count, the corpus and the link inputs do not hold | red, as stale |
| mask keys the entry | an embedTitle entry planted for an input that differs under embedTitle only, filed under embedTitleWithUrl | red on both surfaces: no entry on one, stale on the other |
| passing: listed and exact | the real list, unchanged | green |
| passing: equal and unlisted | an agree-class input with no entry | green |

**The generator control.** The plan says a change to the generator's seed or count fails loudly. One run with the count lowered by
one input that has an entry must go red as stale on that entry. This is the positive control for "no longer in the input classes".

**Independence (axiom E).** The list is measured data, committed. The check must never read the run's own known-differences report
or a list it built in the same run (NM-63). The no-entry and stale fixtures are what discriminate against that.

**RK-9's count (Phase 2).** Entries per surface and mask is read from the committed list file (a JSON count), and, by a second
instrument of a different shape, from the live run: the number of inputs that differ after adjustment on that surface, in the
known-differences report. When the list is complete and not stale the two are equal. A third reconciliation is the implementation
document's family member counts per surface, which sum to the entries. Phase 2 reads all three at the tip against M4's recorded
figure.

### Named mutants added (each seen red before its test counts; seeded at M4's Phase 2 sweep)

- NM-58 Residue check: a differing input with no entry passes. AC-3.7 "no entry".
- NM-59 Residue check: the signature is compared as a subset (an entry's units and dimensions contained in the actual). AC-3.7
  fixtures (b) and (d).
- NM-60 Residue check: the units are compared without their positions. AC-3.7 fixture (a).
- NM-61 Residue check: an entry whose input equals legacy passes. AC-3.7 "stale, equals legacy".
- NM-62 Residue check: an entry whose input is outside the classes passes. AC-3.7 "stale, not in the classes", and the generator
  control.
- NM-63 Residue check: the list is read from the run's own report. AC-3.7 no-entry and stale fixtures.
- NM-64 Residue check: the entry is keyed on surface without mask. AC-3.7 mask fixture.

### New findings

QAF-34 MEDIUM Phase 1
AC-3.7 holds "for every input in the generator, the 272 corpus and the 106 link inputs", and revision 11's stale clause fails an entry
"no longer in the input classes". The measurement revision 11 cites, and builds the list from, compares only atom-free inputs: 1,344 of
2,378 on embedDescription, fieldValue and v2Text, and 1,545 of 2,378 on the two title masks (P-Q21). Neither the plan nor the M4
implementation document states the exclusion. The 1,034 and 833 inputs per surface that hold a mention, emoji or timestamp are not
measured. So either the list misses every differing atom-bearing input, and the M4 check fails at first run on inputs no entry can
name; or the check narrows itself to atom-free inputs, and AC-3.7 silently covers 57 % of its class on four surfaces. The property: the
population the list is measured over equals the population the check reads, and both are the criterion's. The visible form already
defines an atom as a unit with its kind and resolved value (M3, "Visible form"). What is unstated is how a site atom (a resolved channel
name under D-17, an emoji image) compares with legacy's. Ask, for the planner: AC-3.7 states the atom-bearing inputs' treatment. Either
they are in the list's population, with the atom unit compared on kind and source text (the site's resolved values are outside legacy's
reach), or they are excluded by a named predicate, their count per surface recorded, and the exclusion listed as an X-item with what
else covers atom rendering (AC-4.3, AC-4.4, AC-6.3). The stale clause's "input classes" then names that population.

QAF-35 LOW Phase 1
Revision 11 has each entry name "its family, one of a named set the implementation document states", and the implementation document
state each family's member count per surface. No failure clause reads either, so an entry with a family outside the set, or a stated
count that disagrees with the entries, passes. The property: a family claim the reviewer samples against is true of the data. Ask: one
offline data-shape case over the committed list, asserting that each entry's family is in the stated set and that the per-surface
family counts sum to the entries. Seen red by a planted unknown family.

### Register sweep (revision 11 moved AC-3.7's premise)

Predicate: rows citing AC-3.7, AC-3.8 (ii), RK-9 or the residue. Members: none of B-1 to B-7 (checked and cleared; B-6 cites
`test:discord`'s exit and outcome cause, which a residue failure reads as C5, unchanged in kind). No row is minted: AC-3.7 has no
human-observable form. Rows inherited and not discharged: B-1 to B-7, all open.

Phase 1 is keyed to revision 11. Open for the planner: QAF-34 MEDIUM and QAF-35 LOW. QAF-34 bears on M4's residue-list commit.

## Re-key on Revision 12

Revision 12 (record `b0af4dc3`) was read as its delta from `64d3a137`. That covers AC-3.7's atom-bearing population and atom unit,
the family limb in "What fails", M4's every-input measurement, RK-9's fire condition and route, and the Planner batch rows for
QAF-34, QAF-35, CF-18, CF-19, F-36 and F-37.

### Folds checked

| Item | Where revision 12 folds it | Check |
|---|---|---|
| QAF-34 | AC-3.7, "Atom-bearing inputs are in the population"; "M4's measurement covers every input"; the "Why per input" figures now name the atom-free subset | Option (1), as asked. Every input over every surface and mask, the two field-name masks included, with the entry count recorded per surface and mask, before and after adjustment, and the measurement files committed. The stale clause's "input classes" is now the whole population. **Closed.** |
| QAF-35 | AC-3.7 "What fails", the family limb, offline in `pnpm test`, exercised at M4 on a real member and a real non-member (F-37) | As asked. **Closed.** |
| RK-9 (CF-19) | Fires once at M4 and again on any rise; routed to steering; no threshold | QA's obligation at Phase 2 changes. Reading a count above M4's on any surface and mask is a firing that this stage routes to steering. It is not a QA finding of its own severity. A planted re-measure is not a firing. |

### The atom unit re-keyed (AC-3.7 only)

For AC-3.7 an atom agrees when its kind and its source span agree, and its resolved value is not compared. Each conjunct carries the
decision alone in one fixture, over the real check:

| Fixture | Expected | Mutant it kills |
|---|---|---|
| Same source span, different kind: an input whose span is an atom on one side and text, or an atom of another kind, on the other. A corpus member where the engine and legacy split a mention or emoji differently is the real member; a planted pair otherwise | differs | NM-65: kind not compared |
| Same kind, different span: two atoms of one kind whose spans differ by a character | differs | NM-66: span not compared |
| Same kind and span, different resolved value: a listed channel's name on the site against `#<id>` in legacy, or a formatted timestamp against legacy's text | equal | NM-67: resolved value compared (the revision's exclusion lost) |

NM-67's fixture also guards the population: with resolved values compared, every atom-bearing input holding a channel mention or a
timestamp would differ, and the list would fill with entries that encode an oracle's missing data rather than a rendering difference.
Phase 2 reads the share of atom-bearing inputs among the entries per surface beside the atom-free share. A sharp jump marks this case.

### Phase 2 obligations, restated

The entry count is read per surface and mask, now seven cells with the two field-name masks, by the two instruments of § Re-key on
Revision 11. The stale-entry and family limbs are read as exercised at M4, on a real member and a real non-member each, from M4's
captures. The atom fixtures above count among AC-3.7's sole-carrier cases.

No new finding. Register sweep: predicate, rows citing AC-3.7, RK-9 or the residue. Members: none of B-1 to B-7, so all are checked and
cleared. Rows inherited and not discharged: B-1 to B-7, all open.

Phase 1 is keyed to revision 12. Nothing is open for the planner from QA's side. M4's residue-list commit is not held on QA's account.

## Blocking-condition register (the chain's one register)

The register records state at the time of writing. Later stage documents (the UAT document, then the deployment record and its
Stage 1 handoff) are authoritative on each row's execution state.

> **BLOCKING RELEASE CONDITION** — each pre-release item must be executed and recorded in the UAT document before merge/deploy.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode | Owner | Discharging document | State |
|---|---|---|---|---|---|---|---|---|---|---|
| B-1 | observable pre-release | AC-2.5: the plain text shows while the wasm is blocked, and the formatted text shows once it loads (QAF-3) | Chrome devtools request block of the `.wasm` on a local production build of the tip; then unblocked and reloaded. In Chrome and Playwright Firefox (revision 2). Also loaded under Chrome's "Slow 4G" throttle (QAF-15). | UAT through the stage browser / the owner | M2 to M5 built locally; AN-1 passed | Blocked (the rejected state): every character, unformatted, and one `markdown-engine-init-failure` line. Unblocked: `**a**` renders as `strong`. Throttled: the editor is shown within the bound the plan states for QAF-15. 2026-11-23T17:18 reconcile (revision 3): the throttled time-to-shown is recorded for X-22 and is not a pass condition. 2026-11-23T17:27 reconcile (revision 4): if AN-8's fifth limb is not completed, this row also runs `verification/019/analysis/an2/an2-capture.js` at 4× CPU throttle against B-1's build's `/preview` (50 captures of each of AN-2's three messages). Predicted: 150 of 150 formatted, with the margin recorded beside AN-2's 519.7 ms. Fewer goes to steering as an RK-2 member. | If a blocked wasm empties the box, a user on a flaky network loses sight of their message; if it never formats after load, the effort ships nothing; if it waits unbounded, a slow phone never shows the editor | uat | UAT document for 019 (to be created; the UAT brief names it) | open. 2026-11-23T16:32 re-key: Firefox and the throttled limb added; pending is hidden-until-ready (AC-2.5, revision 2). |
| B-2 | observable pre-release | AC-4.2: link targets keep their emoji | Type `https://x.y🙂` and `[a](https://x.y/🙂)` in the content editor of a local production build; read the preview's `a[href]` | UAT / owner | as B-1 | A target with no `:slight_smile`; hrefs equal the engine's `url` (P-1: `https://x.xn--y-bz3s/` and `https://x.y/%F0%9F%99%82`), with labels as AN-5 settles | If the target still carries `:slight_smile`, his link report (D-2) is unfixed | uat | UAT document for 019 | open |
| B-3 | observable pre-release | AC-5.5: Chrome colours match the jsdom class lists on AN-6's discriminating cases. 2026-11-23T17:18 reconcile (revision 3, D-15): the cases are AN-6's 65 comparable cases, the line-crossing cases 104, 105 and 67 among them, coloured by run unit. | Captures under `verification/019/uat/`, compared per character | UAT / owner | as B-1; AN-6 landed | 0 characters differ | If slate-react drops or merges a range in a real browser, the editor colours differently from what the suite proved | uat | UAT document for 019 | open; depends on AN-6 |
| B-4 | observable pre-release | AC-6.3: a guild emoji picked into content, code and quote lines keeps every character | Picker click on a local build signed in as a test account with access to the guild's emoji | UAT / owner | The analyst's provision read (AC-6.3, alongside AN-7) shows a local build can complete Discord sign-in. 2026-11-23T17:18 reconcile (revision 3): that read is AN-8's sign-in limb, before M4's approval, and the emoji element now has D-13's shape; otherwise a stated limit quoting that attempt, carried by handoff 5b19c3e4 item 1. 2026-11-23T17:51 reconcile (revision 6, AN-8 limb 3): the build first provisions a throwaway local Postgres, pushes the schema, and runs `ALTER SEQUENCE "Messages_id_seq" RESTART WITH 900000000000001` before any save. A database already holding low-numbered messages is recreated, not reused. The walk browses `http://127.0.0.1:3000`, never `localhost`. The UAT document records the id range the walk wrote, and that the database was stopped and removed on every exit path (`ps`). Limb dependency: the sign-in's code exchange is the only read of whether `.env.local`'s client secret is current. If the exchange fails, the row closes as the stated limit, quoting that attempt (handoff 5b19c3e4 item 1) | All characters kept; the emoji's text form inserted. Sign-in: the callback at `127.0.0.1:3000/api/auth/callback/discord` returns to the editor signed in as the test account, and the picker lists the test guild's emoji | If the picker path deletes text, users lose content on insert | uat | UAT document for 019 | open. 2026-11-23T16:32 re-key: earliest-decidable condition set to the provision read (revision 2). 2026-11-23T17:51 re-key: provision step and host set (revision 6). |
| B-5 | post-deploy-observable | AC-4.2 in production (the plan's post-deploy observable; his report, D-2) | Stage browser on `hooks.gg/message/m/0/edit`: type `https://x.y🙂 [a](https://x.y/🙂)`, blur, read `main a[href]` (minted run, P-Q13) | devops at Stage 1, or QA / owner | Production serves a commit containing the release tip (the running-commit precondition: Vercel deployment commit contains the tip) | **Unfixed (measured at production, 16:00Z):** `https://x.y:slight_smile` and `https://x.y/:slight_smile:`. **Fixed:** no `:slight_smile` in either; hrefs equal the engine's `url` as in B-2. One observation refutes by construction. | If production still shows `:slight_smile`, the deploy did not carry the fix, or carried it to a commit not serving | devops creates the carrier; its reader is the carrier's Owning-Stage, never the Stage 1 session (F-15) | the Stage 1 handoff devops creates, `handoff/<name>.md` | open. 2026-11-23T16:32 re-key: the fixed form now also requires two anchors to exist (AC-4.2, revision 2), which B-5's read already returns. |
| B-6 | observable pre-release | D-12: `pnpm test:discord` exits 0 at the release tip, and `pnpm test` exits 0 offline | The two commands; `pnpm test` under P-Q1's namespace | QA Phase 3 | the release tip assembled | Both exit 0; the drift alarm's hashes equal. 2026-11-23T17:18 reconcile (revision 3): `test:discord` now also holds AC-3.7 and AC-3.8. A C2 drift is reported, not failed, under the outcome table, and the row reads its outcome cause (C1 to C6) beside the exit code. QAF-18 bears on C2's reading. 2026-11-23T17:27 reconcile (revision 4): under C2, the native-box limbs run on the pinned wasm, or report "not comparable under drift" with both hashes and hold nothing. The row records which. | If either is skipped, the release ships unchecked against Discord, or with a suite that needs the network | qa (Phase 3) | the release-tip QA record | open |
| B-7 | observable pre-release | AC-4.4 (D-17): a listed channel mention previews as its name; a role keeps its id; `/preview` keeps the id | Stage browser on a local production build of M4 with the mention code, signed in as the test account, guild `1566742402180456559` chosen. Type `<#1574358729577599086> <@&1>` into content; read the preview pill texts and class lists. Then the same content on `/preview`. | UAT through the stage browser / the owner | M4's mention code built locally; the local build completes Discord sign-in (B-4's provision read, AN-8's sign-in limb); the page's webhook channel picker lists the guild's channels (it reads the same `useGuild().channels`), read first | Signed in: `#slate-oracle-walk` in `discord-visualizer__mention discord-visualizer__interactive`, and `@&1` in `discord-visualizer__mention`. `/preview`: `#1574358729577599086`, page rendered. No text `unknown` anywhere. One observation refutes by construction. | If the signed-in preview still shows `#1574358729577599086`, the lookup is not wired to the list the page already holds, and his selection buys him nothing; if `/preview` errors, the lookup needs the provider (NM-51 escaped the suite) | uat | UAT document for 019 | open. 2026-11-23T21:44 reconcile (F-35, R-32): the row has two limbs, each run and recorded on its own. Limb 1, signed in ("its id is a channel on the guild's channel list" → "That channel's … name"; "`<@&1>` previews as `@&1`"), uses the build AC-6.3's provision step sets up for B-4: a local Postgres with the schema pushed and the message id sequence moved before any save, `127.0.0.1:3000` and never `localhost`, and sign-in through the test-account browser. Where sign-in cannot be completed, limb 1 closes as a stated limit that quotes the attempt, with handoff 5b19c3e4 item 1 as carrier (AC-6.3's clause), and limb 2 still runs. Limb 2, `/preview` ("no list is in reach (`/preview` …)" → "Today's form: `#<id>`"), needs no sign-in or database. The row depends on B-4's provisioning, so if B-4 is withdrawn, limb 1 is too. UAT's Reading Order row names AC-4.4 at the seam fold (F-35). Hazard, read this pass: the build's `fetchChannels` writes a 10 s cache entry to the `.env.local` Redis, a remote host whose identity is not established on this box (host class read only, P-Q20 § 8). The walk saves nothing; a build that also saves runs the workspace's local-build sequence first (as B-4). Not run at minting: no local build with the mention code exists. |

Candidate held, not minted: a production preview image of a formatted message shows formatted text (E-4, RK-2). Its instrument is
not established until AN-2 reports. It is minted at the re-key after AN-2 lands, or declined there with the reason.
2026-11-23T17:18 reconcile: declined at the revision 3 re-key (§ Re-key on Revision 3, "E-4"); RK-2's open limb is routed as QAF-22.

Rows inherited and not discharged: B-1 to B-6, all open (no implementation exists).

## Assumption Not Checked

This pass assumes production `hooks.gg` serves website `af3d95a` (the release record's claim), and it does not test that. If the
Vercel production deployment's commit is not `af3d95a`, B-5's "unfixed" reading is of another tree. **Owner: devops**, who reads
the deployment's commit at Stage 1 before reading B-5.

Revision 10 re-key: this pass assumes that the bot whose token a local build reads from `.env.local` is a member of the test guild `1566742402180456559`, so `fetchChannels` returns that guild's channels there, and that channel `1574358729577599086` is still on it as `slate-oracle-walk`; it does not test that, because using the token reads a credential this stage does not read. If false, the signed-in local preview shows `#<id>` for every channel and the webhook channel picker is empty, and B-7 reads a wiring failure that is really a provisioning one. **Owner: uat**, at B-7, which reads the channel picker before the mention.

Re-key pass: this pass assumes EC-4's model-level drive costs about the same as a drive that reaches `onChange` (QAF-16), and it does
not test that. If the drive the implementer names costs materially more per character than 1.12 ms, the projected 55 s understates
`pnpm test`'s added time. **Owner: the implementer**, who re-times with the named drive at M3. QA Phase 2 reads that figure.

Revision 3 re-key: this pass assumes that Discord's native box code (module 818948), run under jsdom on the fetched build, colours
the way Discord's native text box does in a browser, and it does not test that. AC-3.2's and AC-5.6's expected values rest on it.
No account on the native path has been seen (G-11 not completed, X-13). If an account on the native path shows its text box
colouring a case differently from the module's jsdom output, the editor's frozen literals encode the wrong standard. **Owner: the
analyst**, through AN-7's G-11 limb, carried as X-13 until an account on the native path is available.

Revision 8 re-key: this pass assumes the tag react-aria hands `LoadLocale` for a Vietnamese browser is `vi-VN` or `vi`, and it
does not test that. Either has no dayjs file, so the fixture's outcome is the same either way. If react-aria normalises to a tag
that dayjs does load, the fixture still holds, but `vi-VN` stops standing for a real viewer. **Owner: uat**, under the revision 7
assumption's browser read below.

Revision 7 re-key: this pass assumes that react-aria's `useLocale` in the browser returns the viewer's language (so `LoadLocale`'s
tag is the viewer's), and it does not test that, because no browser runs here. If it returns a fixed default, every viewer sees
`en-US` text for `s` and `S` whatever the browser's language, and QAF-26's locale case proves only the wiring. **Owner: uat**,
which reads one `s` timestamp in the preview under a non-`en-US` browser language on its build, beside the `f` sibling's
language.

Revision 6 re-key: this pass assumes that B-4's local build, with a fresh local Postgres, lists the test guild's emoji in the
picker once signed in, and it does not test that. Whether the picker's guild list comes from the session's `guilds` scope alone or
also from rows a fresh database lacks was not read. If the walk signs in and the picker shows no guild emoji, AC-6.3 is unwalkable
on that build, and the row closes as a stated limit for a reason other than sign-in. **Owner: uat** at B-4. It reads the picker
after sign-in, and records which before choosing the limit.

Revision 4 re-key: this pass assumes that the harness's `fetch` shim, serving the pinned wasm to Discord's served box JavaScript,
initialises and parses exactly as the served page would with identical bytes. It does not test that, because no harness exists yet.
If the shimmed run's output differs from an unshimmed run on a day the hashes are equal, AC-3.2's frozen literals carry a harness
artefact. **Owner: the implementer** at M3, who runs the box shimmed and unshimmed while the hashes are equal (both
`da7b9e5e…57fb0`) and records equality on the 85 typed cases. QA Phase 2 reads that record.

## Implementation Review (Post-Implementation)

Not started. Phase 2.

## Test Execution Results

Phase 1 baseline only: P-Q1 (2696 of 2696, exit 0, offline at `af3d95a`).
