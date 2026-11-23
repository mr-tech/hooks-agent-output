---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: >-
  Revision 7, for the critic (cycle 2 pass 2), the architect's delta pass and QA Phase 1's re-key. M2 (AC-2.3's GAME_MENTION
  bits included, which all three gates passed at revision 6), M3 and M5 stand ready for implementation, on his approval. The
  critic (16ca70fe) and the architect (27f61730) approved revision 7. M4 and M6 wait on QA's re-key. Steering capped their
  further revision below HIGH (block 17:56Z), so CF-14 is a stated limit. M2's start also waits on the website tree.
Revision: 7
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

## Resumption State

Written at revision 7's commit. Revisions 0 to 7 and registrations R-1 to R-12 are committed. Revision 7 goes to `critic-019`
(cycle 2 pass 2), `architect-019` (delta) and `qa-019` (re-key), each by message naming the plan and its SHA. Their verdicts
release M4 and M6. AN-8 limb 5 is a Planner batch row and lands in RK-2 at the next pass.

**Refs.** Record `master`; website read at `af3d95a` only through `git -C /usr/local/bin/hooks/website show` or `git grep`. The shell
runs from `/usr/local/bin/hooks/agent-output`, never from `preview-image-generator` (effort rulings block 15:29Z).

**Questions sent, and to whom.** All to `steering-hooks-fixer`. OQ-1 to OQ-3 and OQ-5 are answered (D-10 to D-13), and the two
analysis questions are answered (D-14, D-15). None is open.

## Reading Order

Each role reads these sections, in this order, by heading. Every other section is reference, reached when a named section cites it.

| Role | Sections |
|---|---|
| implementer | Decisions Register; M1 — Analysis before code; M2 — The engine and its adapter; M3 — The fuzzer and oracle, in the suite; M4 to M6 (each by its heading) |
| code-reviewer | Decisions Register; M2 — The engine and its adapter; M3 — The fuzzer and oracle, in the suite (AC-3.7's listed classes and their reasons); M4 — The preview on the engine (the adjustment module); M5 — The editor's colouring on `parseLossless`; M6 — The Slate layer: round trip and input; Exclusions |
| qa | Testing Strategy; M3 — The fuzzer and oracle, in the suite; Acceptance criteria of M2 and M4 to M6; Risks; Exclusions |
| uat | Value Statement and Business Objective; Testing Strategy; M2 — The engine and its adapter (AC-2.5); M4 — The preview on the engine (AC-4.2); M6 — The Slate layer: round trip and input (AC-6.3) |
| devops | Header notes; M7 — Release; Testing Strategy (the post-deploy observable); Exclusions |

There is no Handoff Notes section; this table is the plan's one routing surface.

### Owed re-verdicts

| Limb | Decidable since | Owning gate | State |
|---|---|---|---|
| Revision 5's delta (§ Finding disposition (revision 5)): AC-2.3's literals, AC-6.5's expected value and typed-edit class, M3's drift rule, the mask count | revision 5 commit | critic (cycle 1 pass 5) | APPROVED, no new finding; the critique is closed Resolved (record `944e53f6`). A later revision that changes a criterion's text opens cycle 2 |
| Revision 7's delta (§ Finding disposition (revision 7)): AC-4.7's `s` and `S`; AC-6.5's helper controls and the heading read | revision 7 commit | critic (cycle 2 pass 2) APPROVED, critique closed (record `16ca70fe`); architect APPROVED for M4 and M6 under the cap, CF-14 a stated limit (reconcile note, record `6a669d8`, over its verdict at `27f61730`); QA Phase 1 (re-key) owed | M4 and M6 wait on QA alone. CF-14 is a stated limit under the revision cap (Planner batch). AC-2.3's `GAME_MENTION` bits are released: all three gates passed revision 6's AC-2.3 (critic `8b596f83`, architect `93708612`, QA `b5985b20`) |
| AC-6.5's expected value from module 818948 (CF-11) | revision 5 commit | architect (delta pass) | APPROVED, with CF-12 LOW non-blocking (record `681ae51`); CF-12 is folded at the next planning pass |
| AC-2.3's six literals; AC-6.5's typed-edit class (QAF-23) and expected value | revision 5 commit | QA Phase 1 (re-key) | Nothing open (record `d060162`); entry condition EC-7 for AC-6.5 is folded at the next planning pass |

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

**Revision cap on M4 and M6 (steering's ruling, not his).** Effort rulings block "2026-11-23T17:56Z" (record `b95a3d43`), by
`steering-hooks-fixer` under steering.md's standing check: "from Revision 7's verdicts onward, each further gap below HIGH on M4
or M6 goes to the plan's Planner batch as a stated limit, with no revision round. A gate's severity-floor finding is excepted. M2,
M3 and M5 are not capped". Reason given: revision 7 is M4's and M6's second revision after revision 5's approval. Date
2026-11-23. Voided by his word: steering tells him at his next prompt, with the spend. Reading M4 and M6 stays in scope for every
gate; only revising them below HIGH is barred.

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
- **G-13** (real role, command and usable emoji ids): read in AN-7; AC-4.4 carries it. GAME_MENTION's written form is AN-8.
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
  - typing the input one character at a time into a mounted editor yields the same text;
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
  - **The frozen residue list (critique F-29, SL-8; QAF-19).** Each entry has three parts, and all are literals committed as test
    data at M4 from M3's residue measurement:
    - the surface;
    - a class predicate. It is evaluated on the oracle helper's own engine parse with AN-3's literal masks (AC-2.1), never on the
      adapter's output or the site's rendering;
    - a visible-difference signature: which units, by their place in the class's construct, differ, and on which dimensions of the
      visible form.
  - **What fails.** An input whose difference matches no entry fails as C5. So does one that matches an entry's predicate but
    differs otherwise, or on other units. The list never grows from a run: the known-differences report is generated, and an input
    that is newly different with no frozen entry fails.
  - **Changing the list.** Only a reviewed commit changes it. In this chain that is M4's, and later only a chain touching the
    region. Each entry carries its reason, one of: condition (a) or (b) fails, or an adjustment was tried and failed (c). The
    implementation document records the reasons, and code review reads them (Reading Order).
  - Its count per surface, before and after adjustment, is RK-9's falsifier. QA at Phase 2 reads the count at the tip against the
    one recorded at M4.
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
guild-resolved mentions, `next/image` emoji and highlight.js code blocks (`website@af3d95a
src/utils/markdown/rules.tsx:staticBaseRules`, each rule's `react` output). The tree comes from AN-5's form. Every static parse path
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
- **AC-4.4 Mentions.** Every mention kind in AC-2.4's declared class renders something visible. A resolved role, command or usable
  custom emoji renders as Discord drew it with real test-server ids (AN-7, G-13: a role as "@Streamers", a command as "/slateping",
  an emoji as an image whose `alt` is `:name:`). A kind the site cannot resolve renders as Discord draws an unresolved one (research
  V-18: "@unknown-role", "/ping"). A kind with no Discord observation renders its source text (Exclusions X-14).
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
  - **Everything else follows the sibling.** While `state.mounted` is false, `s` and `S` format in UTC, as the sibling does
    (`if (!state.mounted) date = date.utc()`). The locale is the one `src/components/LoadLocale.tsx` sets for dayjs, passed to
    `Intl`. The format picker maps `Object.keys(TIMESTAMP_TO_DAYJS_FORMAT)`, and already omits `R`. It stays as it is and lists
    neither `s` nor `S`.
  - **What the test sets (QAF-25).** `en-US` and UTC are this box's own defaults, so the test sets the locale and the time zone
    itself, never relying on the environment's. It asserts the two literals above under `en-US` and UTC, and one case under
    `America/New_York`: `11/14/23, 5:13 PM` for `s`.
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
  - **Expected value (QAF-21, CF-11, CF-12; axiom E).** The expected spans are never computed by the adapter's parse that the
    lift itself reads. They come from two sources, by surface:
    - **Discord's native box (module 818948)**, for content and for every surface whose mask equals content's on the bits that
      decide whether an emoji sits inside a construct: the code-block, inline-code, link and emoji bits. Those surfaces are the
      embed description and the V2 text display (both `0x3fffffff`, equal to content), and the field value (`0x3dffffff`). The
      field value differs from content in one bit, `0x02000000`, which is `Syntax.HEADING` at the pin
      (`verification/019/planning/syntax-bits-0.16.0.txt`, run). The architect measured that it moves no emoji span: 0 of 50,012
      inputs on the pinned wasm, against 494 under a control that clears only `CODE` (`verification/019/architect-conformance/rev6/`,
      record `93708612`). The box is Discord's message box, so it parses under
      content's mask. Whether it takes a flags argument is unread (CF-12). It runs on the pinned wasm in `pnpm test:discord`, the
      box doing its own join, and its spans are frozen as literals for `pnpm test` (C4 re-derives them).
    - **AC-2.1's oracle helper**, for the title and field name masks, where code blocks, headings, lists and (with an embed url)
      links are off, so the box's spans could be wrong. The helper runs the engine under AN-3's literal masks with its own join
      written from AN-6. It has two controls:
      - **content**: over content, the helper's spans equal the box's frozen literals;
      - **its mask is read (QAF-24)**. The content run cannot catch a helper that ignores its mask. QA measured that the no-url
        title and field name mask moves no emoji span over 417 inputs, and only the url variant differs, on link constructs (QA
        P-Q16, record `b5985b20`). So the helper also runs url-variant link fixtures, `[🙂](https://x.y)`, `https://x.y/🙂`,
        `<https://x.y/🙂>` and `https://x.y🙂`, each with a Unicode, a `:name:` and a custom emoji. QA's mutant NM-44, a helper that
        ignores its mask, is shown red on them.
  - **Entry conditions at M6, before AC-6.5's literals freeze.**
    - **The box exposes its spans** (critique pass 5's assumption). M3 records whether a run of module 818948 exposes the emoji
      spans of its own parse; AN-6's table shows an emoji as an `atom` token. If it does not, the result goes to the planner
      before M6, and the helper with its content control is not a substitute until a planning pass says so.
    - **The lift and the box agree (QA EC-7).** The implementer runs the adapter's `parseLossless` emoji set and the box's over the
      272 corpus and the 1,662 probe, and records how many inputs differ.
      - On 0, the clauses agree.
      - On any member, the lift follows the box, which is what AC-6.5's property asserts. Each member is listed.
      - A member whose box-following form changes what D-13's option described ("the editor's lift takes its emoji from Discord's
        formatter") goes to him through steering before M6's literals freeze.
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

Re-derivation gate: M6 changes a stored representation (D-10's saved emoji). When it ships on the chain branch, M7, if not yet
authorised, is marked `PREMISE-STALE` until re-argued.

Rollback: revert its commits; the implementer or devops, as above. Reverting M6 alone leaves the site building, because nothing
after M4 reads `simple-markdown`. Reverting M4 or M5 after AC-6.6 has landed takes M6 with it (M4's rollback).

### M7 — Release

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
    timestamps divide a line into text nodes, but the emoji element is the only inline element (P-7). It is folded into AC-5.2.
- **RK-9 (D-14's unmeasured residue).** On the legacy-only surfaces, the visible residue left after adjustment is large enough that
  embed previews differ visibly from Discord on ordinary inputs. Falsifier: M3's residue count per surface, before and after
  adjustment, recorded at M3 and M4. The architect's provisional reading of research Appendix A puts the token-level classes
  (unbalanced delimiters, backtick runs, escapes) in the listed set. Accepted under D-14, which stated the count was unmeasured.

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
| CF-13 (LOW): AC-4.7's `s` and `S` say "in the viewer's locale and time zone", while the sibling formats in UTC before mount (`website@af3d95a src/utils/markdown/components/MarkdownTimestamp.tsx`: `if (!state.mounted) date = date.utc()`) and takes its locale from `dayjs.locale`, which `src/components/LoadLocale.tsx` sets. The fold takes the architect's option (a), following the pattern: `s` and `S` pass `timeZone: 'UTC'` to `Intl` while `state.mounted` is false, and the locale `LoadLocale` hands dayjs. Only the formatter departs (F-32's reason). The picker maps `Object.keys(TIMESTAMP_TO_DAYJS_FORMAT)` (line 105 at `af3d95a`) and so already omits `R`. It stays as it is and does not list `s` or `S`, since nothing in the ask or the rulings asks for new picker entries | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 6" (record `93708612`) | Discharged at revision 7 into AC-4.7, option (a). The picker choice is flagged to steering as his to overturn. |
| Critique cycle 2 pass 1 assumption: `0x02000000` is the heading bit (AC-6.5 calls it an inference) | `critiques/019-slate-formatting-discord-engine-critique.md`, cycle 2 pass 1 (record `8b596f83`) | Read this pass: `Syntax.HEADING` is `0x2000000` at `@discord/markdown-wasm@0.16.0` (`verification/019/planning/syntax-bits-0.16.0.txt`, run). The architect read the same in `markdown-types` 0.14.0 `syntax.js` (`1<<25`), and measured that the heading bit moves no emoji span: 0 of 50,012 inputs on the pinned wasm, against 494 under a CODE-cleared control (`verification/019/architect-conformance/rev6/`, record `93708612`). Discharged at revision 7: AC-6.5 cites these reads in place of the inference. |
| CF-14 (LOW): AC-4.7's "the locale `LoadLocale.tsx` sets for dayjs" names two values. `LoadLocale` passes react-aria's tag, but the dayjs locale in effect differs: `en-US` becomes `en`, and a tag with no file in `loadLocales.ts` leaves dayjs at `en` (run on dayjs 1.11.7). So for `vi-VN`, `cs-CZ` or `da-DK` the six sibling styles render in English, while `Intl` given react-aria's tag renders `s` and `S` in the viewer's language. Under `vi-VN`, `s` gives `22:13 14/11/23` beside the siblings' `10:13 PM`. The fold: AC-4.7 passes `Intl` the value of `dayjs.locale()` read at render (or the instance's `.locale()`), and adds a test case under a tag the site has no file for (`vi-VN`) asserting the `en` form. QAF-25's `America/New_York` case states `state.mounted` true: unmounted it is `10:13 PM`, under the UTC rule | `architecture/019-slate-formatting-discord-engine-architecture-findings.md` § "Delta pass, revision 7" (record `27f61730`; captures `verification/019/architect-conformance/rev7/`) | Stated limit under the revision cap on M4 (Decisions Register note, block 17:56Z); no revision round, and the plan text is unchanged. For the implementer, the architect's reading of AC-4.7's phrase stands as what it means: `Intl` takes the dayjs locale in effect, `dayjs.locale()` read at render, not react-aria's tag. That keeps `s` and `S` in the siblings' language. QAF-25's `America/New_York` case reads `11/14/23, 5:13 PM` with `state.mounted` true. Residue, if the implementer takes the phrase the other way: `s` and `S` render in the viewer's language where the six siblings fall back to English (`vi-VN`, `cs-CZ`, `da-DK`). A user report goes to this row. It does not hold M4's approval. |
| AN-8 limb 5 (slow-CPU capture; QAF-22), still running at revision 6 | `analyst-019`'s message after record `3681654e` | Open. It holds no approval. It lands in RK-2 at the next planning pass. A run with fewer than 150 of 150 formatted goes to steering at once (AN-8's not-completed text). |

## Version Management

The website `package.json` carries no `version` field, so no version or CHANGELOG milestone is written. Devops names what the deploy
moves.
