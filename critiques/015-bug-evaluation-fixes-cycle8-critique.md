---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Open
Status-Detail: "Cycle 8 pass 1: delta-bounded read of revision 25 (018f72d..dd9e88a, --numstat 27/10, read whole; M6-a drops the title member under CR-23, the Exclusions standing constraint with X-16/X-21 clauses, W-7 cited in D34/X-20, X-22). Verdict APPROVED (after implementation approval). One LOW (L-C8-1): the title member's provenance is the research's F-38, not rev 4, and codeBlock was excluded from titles at 57b58d8, before d5f2dc8. Owed as a Planner batch row. M6-a may proceed against rev 25."
Artifact-Revision: 25 — read at agent-output dd9e88a, the plan's tip at this read
Reviewed-At: dd9e88a — repos=agent-output; website 24ac49f (chain/015-bug-evaluation-fixes tip, the M6 handoff tree; the M6-a mechanism read at 7ce866b, 57b58d8 and d5f2dc8), preview-image-generator 471578f (chain/015-bug-evaluation-fixes), unchanged since cycle 1
Verdict: APPROVED
---

# Critique — Plan 015, Bug-evaluation fixes — cycle 8

**Artifact**: `planning/015-bug-evaluation-fixes.md`, revision 25 (`dd9e88a`). **Analysis**: none commissioned; the research `research/codebase-bug-evaluation-2026-11-08.md` is read for F-38's statement. **Prior cycles**: cycles 1–7 under `critiques/closed/` (cycle 7 closed at rev 24 + R-9, `0029245`). Cycle 7 resolved before this revision, so rev 25 opens cycle 8, pass 1 (the plan's Owed re-verdicts row says "cycle 7"). **Date**: 2026-11-08.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-08T08:29 | steering-hooks-015 (message, 08:27Z) | cycle 8 pass 1: delta over `018f72d..dd9e88a` (rev 25) | Delta-bounded pass. M6-a's title drop re-derived at website `7ce866b` (`parseEmbedTitle` omits `codeBlock`, `heading`, `list`) and in history (`57b58d8` introduced the `codeBlock` omit; `d5f2dc8` swapped `br` for `list`). The research's F-38 names `parseEmbedTitle`, so the member's provenance is the research, not rev 4: L-C8-1 LOW with the date slip. L-C7-1 verified landed (standing constraint; X-16, X-21 clauses). X-22's source read checked against the installed next 16.1.6 `layout-router.js`. RK-6: no new member. Verdict APPROVED. |

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
- **State**: OPEN.
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

**Next**: the implementer — M6-a is being fixed (CR-22) and rev 25 changes its member list; it may proceed against rev 25 (the next-act table: an approval after implementation approval goes to the implementer where the revision changed a milestone being coded). The planner: L-C8-1's batch row at its next pass.
