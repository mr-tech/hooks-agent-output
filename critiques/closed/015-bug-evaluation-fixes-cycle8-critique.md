---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Resolved
Status-Detail: "Cycle 8 closed after pass 1: revision 25 (dd9e88a) APPROVED; L-C8-1 LOW carried by Planner batch row R-11 (83c4c3e), both limbs and the cycle slip, landing at the next planning pass or the seam before the UAT anchor — landed-by-author at that fold, not critic-verified. Every finding carries a landing trigger recorded in the plan."
Artifact-Revision: 25 — read at agent-output dd9e88a; R-11 (83c4c3e) adds the L-C8-1 batch row and two changelog lines, no requirement moved
Reviewed-At: 83c4c3e — repos=agent-output; website 24ac49f (chain/015-bug-evaluation-fixes tip, the M6 handoff tree; the M6-a mechanism read at 7ce866b, 57b58d8 and d5f2dc8), preview-image-generator 471578f (chain/015-bug-evaluation-fixes), unchanged since cycle 1
Verdict: APPROVED
---

# Critique — Plan 015, Bug-evaluation fixes — cycle 8

**Artifact**: `planning/015-bug-evaluation-fixes.md`, revision 25 (`dd9e88a`). **Analysis**: none commissioned; the research `research/codebase-bug-evaluation-2026-11-08.md` is read for F-38's statement. **Prior cycles**: cycles 1–7 under `critiques/closed/` (cycle 7 closed at rev 24 + R-9, `0029245`). Cycle 7 resolved before this revision, so rev 25 opens cycle 8, pass 1 (the plan's Owed re-verdicts row says "cycle 7"). **Date**: 2026-11-08.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-08T08:29 | steering-hooks-015 (message, 08:27Z) | cycle 8 pass 1: delta over `018f72d..dd9e88a` (rev 25) | Delta-bounded pass. M6-a's title drop re-derived at website `7ce866b` (`parseEmbedTitle` omits `codeBlock`, `heading`, `list`) and in history (`57b58d8` introduced the `codeBlock` omit; `d5f2dc8` swapped `br` for `list`). The research's F-38 names `parseEmbedTitle`, so the member's provenance is the research, not rev 4: L-C8-1 LOW with the date slip. L-C7-1 verified landed (standing constraint; X-16, X-21 clauses). X-22's source read checked against the installed next 16.1.6 `layout-router.js`. RK-6: no new member. Verdict APPROVED. |
| 2026-11-08T08:31 | planner-hooks-015 (message, 08:30Z) | Document closed | Status: Resolved. Plan R-11 (`83c4c3e`; `dd9e88a..83c4c3e --numstat 3/0`: a code-review Round 15 row, the R-11 line, the L-C8-1 batch row) read: the row carries both limbs — the research's F-38 as the title member's source, `57b58d8` as the exclusion's origin (the planner's own re-run of `git log -G` confirms it; its `-S` search had matched the exact three-item list) — the cycle slip, its source (`4429f17`) and a landing trigger. Nothing else is owed; the file moves to `critiques/closed/`. Noted for another domain: code review's Round 15 row (plan changelog; `code-review/…` at `1d0059a`) also says "first at `d5f2dc8`"; an INBOX.md entry is appended for the code-reviewer, since that document is not this gate's. |

## Boundary

Delta-bounded, the cycle's entry pass: `git diff --numstat 018f72d..dd9e88a -- planning/015-bug-evaluation-fixes.md` = 27/10, read whole (`scratchpad/rev25-plan.diff`); `steering/015-rulings.md` 4/0 (the 08:12Z correction line and the 08:15Z release block, read). The delta rewrites M6-a's parser list, adds the Exclusions standing constraint and X-22, extends X-16, X-20 and X-21, cites W-7 in D34, discharges three Planner batch rows and adds three changelog rows. No milestone is reshaped beyond the diff, so the whole-document read is not taken. `dd9e88a` is the plan's tip at this read.

## Pricing

Sized to the ask: 47 of 50 fixed, F-15/F-39 closed under D30, plus the CR-12 rider and the D28 sibling M5-i. Dropping M6-a's title member is not a narrowing of the defect: at the base the title parser excludes `codeBlock` by an explicit omit list (with `heading` and `list`), so a code block in a title has never rendered, single-line or multi-line; making it render would add a capability the base deliberately withholds. The changelog leaves steering the option of putting it to the owner as a scope delta; this gate reads it as a false premise corrected, with no owner question of its own.

## Value Statement Assessment

Unchanged at rev 25. F-38's statement — "Multi-line fenced code blocks never parse in the preview" — is served by M6-a over `parseContent` and `parseEmbedField`, where code blocks are admitted and the regex is the defect.

## Assumption Not Checked

This pass assumes the planner's source read of next 16.1.6 (`verification/015/m5-modal-seed-next-keying-read.txt`) draws the right conclusion from `layout-router.js` — that a change in the dynamic segment's value (`id|A|d` → `id|B|d`) yields a different `createRouterCacheKey` and so a fresh mount of the page and its modal — and does not run it: the installed `layout-router.js` does key each segment's child by `createRouterCacheKey` (lines 374 and 388 at next 16.1.6, read in this pass), and the bfcache keeps the *previous* segment's tree in a hidden `<Activity>`, which preserves A's state but does not reuse it for B. Falsity's signature: after `/message/f/A` → `/message/f/B` by client navigation with a cached guild, Save To still proposes A's server. Owner of closing it: X-22's stated limit names the planner while the plan is open and a defect report after; the implementer's browser read (`d28-folder-switch/README.md`) could not decide it and says why (no session reachable logged out).

## Rev 25 read against its sources

- **M6-a title drop (CR-23).** `src/utils/markdown/index.tsx` at `7ce866b`: `parseEmbedTitle: staticParserFor(omit(staticWithoutLinks, ['codeBlock', 'heading', 'list']))` and the interactive twin — confirmed; `parseEmbedField` omits only `heading`. History: `git log -G"parseEmbedTitle.*codeBlock"` gives `57b58d8` (2023-03-23, "integrate interactive title markdown editing") as the commit that added `'codeBlock'` to the title's omit list; `d5f2dc8` (2023-06-05) removed `'br'` and added `'list'`, the `codeBlock` omit already present on its `-` lines. The plan's "since `d5f2dc8`" is therefore the wrong anchor, and its "rev 4–24 named the title in error" the wrong source: the research's F-38 row says "`parseContent`, `parseEmbedField` and `parseEmbedTitle` … are built from `staticBaseRules`, so every two-line-or-longer code block renders as raw backticks", which is where the title entered — and that mechanism claim is false at `7ce866b` for the title. L-C8-1.
- **L-C7-1 landed.** The standing constraint sits above the Exclusions table in the three-part form; X-16 ("a report of a message count over 1000 lands here; the planner acts while the plan is open; after closure a new defect report against M1-d" — the cap is D5's 1000) and X-21 carry their clauses; X-22, new, complies. The "cycle 6 → 7" slip is fixed in the rev 24 row; the rev 25 row now says "cycle 7" where this is cycle 8.
- **X-20 / D34 / W-7 (AF-28).** D34's effect column and X-20 cite `website.md` W-7 (`952e69f`), and X-20 adds the architect's `send/page.tsx` read at `3031878`. Consistent with the rulings file's 08:12Z correction.
- **X-22.** The `NewMessageModal` seed closes as not a defect on a source read marked "not run", with the implementer's three browser runs recorded as unable to decide (database sessions; the dead-port database is by design). The disposition priced at rev 24 ("if it remounts, an Exclusions row citing the read") is the one taken. Carrier "Stated limit (read from source)" with detection owner named.
- **PREMISE-STALE.** Rev 25 ships no behaviour change (M6-a's title limb was never in the code; the rest is register text). None owed.

## Findings

### Low

**L-C8-1 LOW cycle 8 pass 1 — M6-a's title drop misnames its source and its date.**
- **State**: OPEN with its landing trigger recorded — Planner batch row R-11 (plan `83c4c3e`), both limbs carried; folds at the next planning pass, at latest the seam before the UAT anchor. It closes landed-by-author at that fold, the discharging document being the plan revision that folds it; no critic pass verifies it.
- **Location**: plan § M6-a, "`parseEmbedTitle` deliberately omits `codeBlock` … since `d5f2dc8` … (rev 4–24 named the title in error)"; changelog row rev 25, "Naming `parseEmbedTitle` in M6-a was the planner's error since rev 4: titles have omitted code blocks by design since `d5f2dc8`".
- **Description**: (i) the title entered through the research's F-38 row, which asserts all three parsers are built from `staticBaseRules`; the plan quotes F-38's bold statement verbatim and carries the research as its source, so the superseded claim is the research's and the supersession is carried at the plan's point of citation (lifecycle: re-status the superseded claim where it stands — the research is ID-less and not edited), not attributed to a planning revision. (ii) `codeBlock` was excluded from titles at `57b58d8` (2023-03-23); `d5f2dc8` changed `br` → `list` with the exclusion already in place. One sentence each; no criterion moves.
- **Impact**: a reader checking "by design since `d5f2dc8`" at that commit finds the exclusion on both sides of the diff and doubts the claim; the retrospective reads the error as the planner's where the research made it.
- **Recommendation**: cite `57b58d8` as the exclusion's origin and name the research's F-38 mechanism sentence as the superseded source, one line at the citation. Landing: Planner batch row at the planner's next pass; this critique closes when the row is read.

## Risks register

RK-6 (the M8 wrong-stop class): rev 25 touches no M8 read; no new member.

## Questions

None for the owner. Whether the title drop is put to him as a scope delta is steering's option, left open by the changelog; this gate's reading (a false premise corrected, no capability removed) is above.

## Unresolved Open Questions

None: the rev 25 diff carries no `OPEN QUESTION` line.

## Verdict

**Pass 1 — APPROVED** (cycle 8, pass 1; after implementation approval, REQUEST REVISION reserved for HIGH or CRITICAL, none raised). Sized to the ask: 47 of 50 plus the rider and M5-i; the title drop removes no delivered capability. M6-a's mechanism re-derived at `7ce866b` and in history; L-C7-1 verified landed as the standing constraint; W-7 citations and X-22 consistent with their reads. One LOW, L-C8-1 (source and date of the title exclusion), a Planner batch row. D24–D34 terminal; nothing here re-raises them. RK-6: no new member. No owner-needing item.

## Resumption State (checkpoint, critic-hooks-015, 2026-11-08T08:44; written into the closed cycle-8 document because no critique is open)

- **Done.** Cycles 1–8 closed under `critiques/closed/` (cycle 5 `1b4b98d`, cycle 6 `42a1783`, cycle 7 `0029245`, cycle 8 `1168da8`). Latest plan read: rev 25 at agent-output `83c4c3e` (R-11); plan tip at this write `afca4c5` (steering's M6-a release block, not a plan change). This session's passes: cycle 5 (revs 20–21), cycle 6 (revs 22–23), cycle 7 (rev 24), cycle 8 (rev 25), all APPROVED after implementation approval. Open findings, each carried by a Planner batch row with a landing trigger (landed-by-author at the fold, never critic-verified): L-C5-1 (discharged at rev 24), L-C6-2 (discharged at rev 24), L-C7-1 (discharged at rev 25), L-C8-1 (R-11, open). Critic probe committed: `verification/015/critic-m5h-render-probes/` (real-editor render of `/preview` wrong-shape members at website `da24eb7`; cited by M5-h class (3)).
- **Next.** When steering routes a revision that changes criterion text, milestone scope or an instrument's form: open cycle 9 in `critiques/015-bug-evaluation-fixes-cycle9-critique.md` (header per the critic definition; ID/Origin/UUID from the plan: 015/015/861e5f61), delta-bounded from the last revision read whole in a closed cycle (`git diff --numstat 83c4c3e..<new> -- planning/015-bug-evaluation-fixes.md`, boundary by `--numstat` and the commit list; verify the plan is unmoved past the briefed SHA). After implementation approval (rulings `7efd8b0`), REQUEST REVISION only on HIGH or CRITICAL; MEDIUM and LOW go to the planner's next pass or a Planner batch row, and the critique closes when the row is read. Each pass counts within its cycle; the plan's Owed re-verdicts row has lagged the cycle number by one every revision — say so in the delivery, not as a finding.
- **Approach in flight.** Every count by `grep -c`/`--numstat`; every mechanism claim re-derived at the cited SHA (`git show <sha>:<path>`); a premise a run settles in under a minute is run and quoted, not routed (this session: the real-editor render probe; `git log -G` for the title exclusion's origin). Standing rules learned this session: a probe row reading "rendered: 0 nodes" is the crash signature of an emptied root, never a render (cycle 6 reconcile note); a stubbed child in a probe cannot see the real component's render; the Exclusions register's stated-limit residue rows carry a detection owner (standing constraint, L-C7-1). Standing exclusions: D23's run-2 UTC assumption is not re-read. Deliveries: planner by SendMessage at every pass; the implementer when a revision changed a milestone being coded (next-act table); steering only for an owner-needing item or a spawn cue (once this session I sent steering a status report by mistake — lodged in cycle 5).
- **Branch and HEAD.** agent-output `master`, last own commit `1168da8` (this Checkpoint follows it). website `b608555` on `chain/015-bug-evaluation-fixes` (tip moved past the `24ac49f` M6 handoff tree read in cycle 8), preview-image-generator `471578f`. Nothing uncommitted of mine except one `INBOX.md` entry (critic-hooks-015, for the code-reviewer: Round 15's "first at `d5f2dc8`" should read `57b58d8`), left for the inbox's owner to commit per the inbox rule; `INBOX.md`'s working-tree diff also carries other sessions' entries. Scratch files only under this session's scratchpad (`rev*.diff`, `m5h-render/`, `r6.diff`, `r11.diff`); the `m5h-render/export-da24eb7` export is a scratch clone of website at `da24eb7` with a `node_modules` symlink, held by no process — deleted at this checkpoint. No process of mine runs (`pstree -ap $PPID` at 08:44: only the tool shell).
- **Evidence not yet recorded.** None.
- **Open with others.** None owed to me. Assumptions carried: QA Phase 2's M5-h cells (jsdom versus Chrome for the render crashes; the planner's 44-row run as committed), M5-i cells (the seed probe's accordion read); X-22's stated limit (next 16.1.6 keying, read not run) with the planner; the code-reviewer's INBOX item above.

## Closure

Closed 2026-11-08T08:31 at plan rev 25 with R-11 (`83c4c3e`): L-C8-1 carried by the plan's Planner batch row with its landing trigger. Items carried past this document: this pass's Assumption Not Checked (the next 16.1.6 keying conclusion, read not run) is X-22's stated limit with the planner as its owner while the plan is open; the code-review record's "first at `d5f2dc8`" is an INBOX.md entry for the code-reviewer. A later revision that changes criterion text, milestone scope or an instrument's form opens cycle 9 in a new file.

**Next** (as written at pass 1): the implementer — M6-a is being fixed (CR-22) and rev 25 changes its member list; it may proceed against rev 25 (the next-act table: an approval after implementation approval goes to the implementer where the revision changed a milestone being coded). The planner: L-C8-1's batch row at its next pass.
