---
ID: 019
Origin: 019
UUID: 286c730a
Verified-At: "af3d95a — repos=website; Phase 1 baseline only: the offline suite run at the chain base, no implementation exists yet"
Status: Awaiting Implementation
Status-Detail: >-
  Phase 1 re-keyed on plan 019 Revision 4 (record e53c7cdb). QAF-1 to QAF-22 are folded, verified in the re-key sections.
  QAF-23 is new and goes to the planner. AC-2.3's seven mask literals are measured. Register B-1 to B-6 is swept; B-1 and B-6
  are re-specified. Implementation is not approved.
Phase: 1
---

# QA Report: 019 — Slate formatting: one Discord engine for the preview and the editor

**Plan Reference**: `agent-output/planning/019-slate-formatting-discord-engine.md`. This pass is keyed to Revision 2 (record
`8dfd4659`) with R-2 (record `4c872804`). Revision 1 (record `103687b4`) was read whole by the first pass; § Re-key on Revision 2
says what moved.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T16:03 | steering-hooks-fixer (brief `steering/019-brief-qa.md`, common brief `steering/slate-formatting-brief-common.md`) | QA Phase 1 on Revision 1 | Phase 1: test strategy, Irreversible Side-Effect Register, infrastructure, named mutants, blocking-condition register B-1 to B-6, findings QAF-1 to QAF-14. It measured the populations it could at website `af3d95a`: an offline suite baseline, the Syntax bit count, the highlight.js language count, the save and upsert routes and the corpus counts. It captured the inventory's link inputs from a scratch directory that would not survive a reboot, and took a production reading for the post-deploy row. |
| 2026-11-23T16:32 | planner-019 (message: revision 2 at record `8dfd4659`) | Re-key Phase 1 on revision 2 | Phase 1 re-key. Read revision 2 by the Reading Order's QA row, plus M1 and the finding disposition. It verified that each of QAF-1 to QAF-14 is folded where the disposition says, re-keyed register B-1, B-2, B-4 and B-5, and measured EC-4 (the typing cost) as AC-3.3 now asks before implementation approval. It raises QAF-15 to QAF-17. One website read in this pass was not completed, then re-run under effort rulings block 15:29Z. R-2 (D-13, record `4c872804`) registers a decision that revision 3 folds; AC-6.5 and X-8 re-key then. |
| 2026-11-23T17:18 | planner-019 (message: revision 3 at record `9ac9ba62`) | Re-key Phase 1 on revision 3 | Phase 1 re-key, read as the delta from `4c872804`. It confirmed the folds of QAF-15 to QAF-17, EC-4 and NM-30, and re-keyed AC-2.3, AC-3.2, AC-3.7, AC-3.8, AC-4.7, AC-4.8, AC-5.6 to AC-5.8, AC-6.5 and AC-6.6. It measured P-8 (16 of 16 files) and read the draft store's shape. E-4 is declined, with the reason and QAF-22. It swept the register on a stated predicate, B-1, B-3, B-4 and B-6 re-specified, and raises QAF-18 to QAF-21. |
| 2026-11-23T17:27 | planner-019 (message: revision 4 at record `e53c7cdb`) | Re-key Phase 1 on revision 4 | Phase 1 re-key, read as the word diff from `9ac9ba62`. It confirmed the folds of QAF-18 to QAF-22 and E-4. It re-measured the masks with `GAME_MENTION` cleared on the five legacy-only surfaces (1 of 248 cells differs, content's, as intended) and published AC-2.3's seven literals. It re-keyed AC-3.2, AC-3.7, AC-3.8 (i′), AC-4.7, AC-6.5 (CF-9) and the emoji display helper (CF-10). It swept the register, with B-1 and B-6 re-specified, and raises QAF-23. One command was refused by the record-write gate and re-issued in a read-only form (disclosed in the section). |

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
| AC-4.4 | 13 kinds (8 plus 5 static, AC-2.4's list) | An unknown id per kind (V-18 forms); `@silent` (legacy only, V-21). |
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
- NM-27 Mention: an unresolved kind renders empty. AC-4.4.
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
  the pinned `Syntax` constants, beside the table's legacy cell (`analysis/an3/an3-table.md`), over 8 columns × 31 bits = 248
  cells. **240 agree.** The 8 that differ are all `GAME_MENTION`: every native mask sets it, and the legacy formatter has no rule
  for it on any surface. So game mentions are a disagree or residue class on every surface, and AN-8's `GAME_MENTION` limb reads
  their written form. Positive control on the same run: the title mask with `BOLD` flipped is detected. AC-2.3's literals equal
  AN-3's values.
- **Drafts and D-13's new element shape.** `utils/messageDrafts.ts` at `af3d95a` stores `message.data` (the message's text form),
  not Slate nodes (`website@af3d95a src/utils/messageDrafts.ts`, line 77: `data: message.data`). So the emoji element's shape change reaches no stored draft. Read, not run.

### Criteria new or changed in revision 3, re-keyed

| Criterion | Population and instrument | Edge cases, mutants and asks |
|---|---|---|
| AC-2.3, seven masks | 7 × 31 = 217 literal cells (AN-3's values) | The title and field-name mask switches on whether the embed has a url (`0x19fecd7f` / `0x19fecd07`). NM-31: the adapter picks the no-url mask for a title with a url. Assert both on a title and on a field name. |
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

## Blocking-condition register (the chain's one register)

The register records state at the time of writing. Later stage documents (the UAT document, then the deployment record and its
Stage 1 handoff) are authoritative on each row's execution state.

> **BLOCKING RELEASE CONDITION** — each pre-release item must be executed and recorded in the UAT document before merge/deploy.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode | Owner | Discharging document | State |
|---|---|---|---|---|---|---|---|---|---|---|
| B-1 | observable pre-release | AC-2.5: the plain text shows while the wasm is blocked, and the formatted text shows once it loads (QAF-3) | Chrome devtools request block of the `.wasm` on a local production build of the tip; then unblocked and reloaded. In Chrome and Playwright Firefox (revision 2). Also loaded under Chrome's "Slow 4G" throttle (QAF-15). | UAT through the stage browser / the owner | M2 to M5 built locally; AN-1 passed | Blocked (the rejected state): every character, unformatted, and one `markdown-engine-init-failure` line. Unblocked: `**a**` renders as `strong`. Throttled: the editor is shown within the bound the plan states for QAF-15. 2026-11-23T17:18 reconcile (revision 3): the throttled time-to-shown is recorded for X-22 and is not a pass condition. 2026-11-23T17:27 reconcile (revision 4): if AN-8's fifth limb is not completed, this row also runs `verification/019/analysis/an2/an2-capture.js` at 4× CPU throttle against B-1's build's `/preview` (50 captures of each of AN-2's three messages). Predicted: 150 of 150 formatted, with the margin recorded beside AN-2's 519.7 ms. Fewer goes to steering as an RK-2 member. | If a blocked wasm empties the box, a user on a flaky network loses sight of their message; if it never formats after load, the effort ships nothing; if it waits unbounded, a slow phone never shows the editor | uat | UAT document for 019 (to be created; the UAT brief names it) | open. 2026-11-23T16:32 re-key: Firefox and the throttled limb added; pending is hidden-until-ready (AC-2.5, revision 2). |
| B-2 | observable pre-release | AC-4.2: link targets keep their emoji | Type `https://x.y🙂` and `[a](https://x.y/🙂)` in the content editor of a local production build; read the preview's `a[href]` | UAT / owner | as B-1 | A target with no `:slight_smile`; hrefs equal the engine's `url` (P-1: `https://x.xn--y-bz3s/` and `https://x.y/%F0%9F%99%82`), with labels as AN-5 settles | If the target still carries `:slight_smile`, his link report (D-2) is unfixed | uat | UAT document for 019 | open |
| B-3 | observable pre-release | AC-5.5: Chrome colours match the jsdom class lists on AN-6's discriminating cases. 2026-11-23T17:18 reconcile (revision 3, D-15): the cases are AN-6's 65 comparable cases, the line-crossing cases 104, 105 and 67 among them, coloured by run unit. | Captures under `verification/019/uat/`, compared per character | UAT / owner | as B-1; AN-6 landed | 0 characters differ | If slate-react drops or merges a range in a real browser, the editor colours differently from what the suite proved | uat | UAT document for 019 | open; depends on AN-6 |
| B-4 | observable pre-release | AC-6.3: a guild emoji picked into content, code and quote lines keeps every character | Picker click on a local build signed in as a test account with access to the guild's emoji | UAT / owner | The analyst's provision read (AC-6.3, alongside AN-7) shows a local build can complete Discord sign-in. 2026-11-23T17:18 reconcile (revision 3): that read is AN-8's sign-in limb, before M4's approval, and the emoji element now has D-13's shape; otherwise a stated limit quoting that attempt, carried by handoff 5b19c3e4 item 1 | All characters kept; the emoji's text form inserted | If the picker path deletes text, users lose content on insert | uat | UAT document for 019 | open. 2026-11-23T16:32 re-key: earliest-decidable condition set to the provision read (revision 2). |
| B-5 | post-deploy-observable | AC-4.2 in production (the plan's post-deploy observable; his report, D-2) | Stage browser on `hooks.gg/message/m/0/edit`: type `https://x.y🙂 [a](https://x.y/🙂)`, blur, read `main a[href]` (minted run, P-Q13) | devops at Stage 1, or QA / owner | Production serves a commit containing the release tip (the running-commit precondition: Vercel deployment commit contains the tip) | **Unfixed (measured at production, 16:00Z):** `https://x.y:slight_smile` and `https://x.y/:slight_smile:`. **Fixed:** no `:slight_smile` in either; hrefs equal the engine's `url` as in B-2. One observation refutes by construction. | If production still shows `:slight_smile`, the deploy did not carry the fix, or carried it to a commit not serving | devops creates the carrier; its reader is the carrier's Owning-Stage, never the Stage 1 session (F-15) | the Stage 1 handoff devops creates, `handoff/<name>.md` | open. 2026-11-23T16:32 re-key: the fixed form now also requires two anchors to exist (AC-4.2, revision 2), which B-5's read already returns. |
| B-6 | observable pre-release | D-12: `pnpm test:discord` exits 0 at the release tip, and `pnpm test` exits 0 offline | The two commands; `pnpm test` under P-Q1's namespace | QA Phase 3 | the release tip assembled | Both exit 0; the drift alarm's hashes equal. 2026-11-23T17:18 reconcile (revision 3): `test:discord` now also holds AC-3.7 and AC-3.8. A C2 drift is reported, not failed, under the outcome table, and the row reads its outcome cause (C1 to C6) beside the exit code. QAF-18 bears on C2's reading. 2026-11-23T17:27 reconcile (revision 4): under C2, the native-box limbs run on the pinned wasm, or report "not comparable under drift" with both hashes and hold nothing. The row records which. | If either is skipped, the release ships unchecked against Discord, or with a suite that needs the network | qa (Phase 3) | the release-tip QA record | open |

Candidate held, not minted: a production preview image of a formatted message shows formatted text (E-4, RK-2). Its instrument is
not established until AN-2 reports. It is minted at the re-key after AN-2 lands, or declined there with the reason.
2026-11-23T17:18 reconcile: declined at the revision 3 re-key (§ Re-key on Revision 3, "E-4"); RK-2's open limb is routed as QAF-22.

Rows inherited and not discharged: B-1 to B-6, all open (no implementation exists).

## Assumption Not Checked

This pass assumes production `hooks.gg` serves website `af3d95a` (the release record's claim), and it does not test that. If the
Vercel production deployment's commit is not `af3d95a`, B-5's "unfixed" reading is of another tree. **Owner: devops**, who reads
the deployment's commit at Stage 1 before reading B-5.

Re-key pass: this pass assumes EC-4's model-level drive costs about the same as a drive that reaches `onChange` (QAF-16), and it does
not test that. If the drive the implementer names costs materially more per character than 1.12 ms, the projected 55 s understates
`pnpm test`'s added time. **Owner: the implementer**, who re-times with the named drive at M3. QA Phase 2 reads that figure.

Revision 3 re-key: this pass assumes that Discord's native box code (module 818948), run under jsdom on the fetched build, colours
the way Discord's native text box does in a browser, and it does not test that. AC-3.2's and AC-5.6's expected values rest on it.
No account on the native path has been seen (G-11 not completed, X-13). If an account on the native path shows its text box
colouring a case differently from the module's jsdom output, the editor's frozen literals encode the wrong standard. **Owner: the
analyst**, through AN-7's G-11 limb, carried as X-13 until an account on the native path is available.

Revision 4 re-key: this pass assumes that the harness's `fetch` shim, serving the pinned wasm to Discord's served box JavaScript,
initialises and parses exactly as the served page would with identical bytes. It does not test that, because no harness exists yet.
If the shimmed run's output differs from an unshimmed run on a day the hashes are equal, AC-3.2's frozen literals carry a harness
artefact. **Owner: the implementer** at M3, who runs the box shimmed and unshimmed while the hashes are equal (both
`da7b9e5e…57fb0`) and records equality on the 85 typed cases. QA Phase 2 reads that record.

## Implementation Review (Post-Implementation)

Not started. Phase 2.

## Test Execution Results

Phase 1 baseline only: P-Q1 (2696 of 2696, exit 0, offline at `af3d95a`).
