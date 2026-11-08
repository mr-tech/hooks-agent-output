---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Open
Status-Detail: "Cycle 5 pass 1: delta-bounded read of revision 20 (330348f..e118cc3, --numstat 26/8, read whole; the D29 webhook-load limb and D29's register row). Verdict APPROVED (after implementation approval). One MEDIUM (M-C5-1, duplicates code review CR-16: the dialog has no field-level error for the limb's place clause) and one LOW (L-C5-1) are owed at the planner's CR-16 fold, which this critique re-reads as pass 2."
Artifact-Revision: 20 — read at agent-output e118cc3; the plan body is unchanged through 8b7d585 (two code-review changelog rows, --numstat 2/0)
Reviewed-At: e118cc3 — repos=agent-output; website 1e12837 (chain/015-bug-evaluation-fixes, the M4 handoff tree the delta cites; tip 579e8b2, which touches none of the three files read), preview-image-generator 471578f (chain/015-bug-evaluation-fixes), unchanged since cycle 1
Verdict: APPROVED
---

# Critique — Plan 015, Bug-evaluation fixes — cycle 5

**Artifact**: `planning/015-bug-evaluation-fixes.md`, revision 20 (`e118cc3`). **Analysis**: none commissioned for this delta. **Prior cycles**: `critiques/closed/015-bug-evaluation-fixes-critique.md` (cycle 1), `…-cycle2-critique.md`, `…-cycle3-critique.md`, `…-cycle4-critique.md` (closed at rev 19, `f8d564c`). **Date**: 2026-11-08.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-08T07:31 | steering-hooks-015 (message, 07:25Z) | cycle 5 pass 1: open cycle 5 as a delta read over `330348f..e118cc3` (rev 20: D29, the "Invalid URL" webhook-load limb at both F-27 sites) | Delta-bounded pass. Both sites' failure behaviour re-derived at website `1e12837`: the D29 premise holds. One MEDIUM (M-C5-1, duplicates CR-16): the limb places the text "at the webhook URL field" / "under the field" at both sites, and the New Message dialog has no such surface. One LOW (L-C5-1): the failure class names only "no response" where the dialog's catch also fires on a non-JSON response; D29's attribution precision. RK-6: no new member. Verdict APPROVED; both findings owed at the CR-16 fold. |

## Boundary

Delta-bounded, the cycle's entry pass: `git diff --numstat 330348f..e118cc3 -- planning/015-bug-evaluation-fixes.md` = 26/8, and the diff was read whole (`scratchpad/rev20-plan.diff`). The delta is one new M4-d limb, the old-message network clause re-scoped, the D29 register row, the header, one Owed re-verdicts row, one changelog row and the planner's Resumption State; no milestone is reshaped, so the whole-document read is not the entry. After `e118cc3` the plan moved to `8b7d585` by two code-review changelog rows (`--numstat 2/0`; the Round 2 sub-entry and Round 8), neither touching criterion text. The rulings block the delta cites (`27f8cd7`, "CR-14") was read; the later block (07:26Z, "M3: drop M3, not a defect", `f005cef`) is not folded at rev 20 and is outside this pass. Standing exclusions carried from cycle 4: D23's run-2 UTC assumption is not re-read; M3 is read only as a hold.

## Pricing

Sized to the ask: 49 of 50 findings plus the owner-selected CR-12 rider (D27). D29 adds no scope — it aligns the two F-27 sites on a failure text within F-27's own fix, selected by the owner with its cost stated (rulings 07:24Z). The next revision will carry the M3 drop (rulings 07:26Z), which changes the "49 of 50" line; that is the planner's row to write, not this pass's.

## Value Statement Assessment

Unchanged at rev 20; assessed in cycle 1. The new limb serves the value-statement sentence on a legible failure (a dropped connection tells the user something true) and defers nothing.

## Assumption Not Checked

This pass assumes that in the New Message dialog's webhook load option the two error sources that precede `webhookError` in `NewMessageModal` `messageErrorString` (`discordMessageError?.message ?? commandMessageError?.message ?? webhookError ?? webhookMessageError`, website `1e12837`) are null, so the D29 text would be the string shown; it was read, not run. Falsity's signature: with the network cut, the dialog shows a stale bot-link or command error, or nothing, where "Invalid URL" is expected. Owner of closing it: QA Phase 2's cell on the dialog at the D29 fix SHA (and the implementer's test, which must mount the dialog's error line, not the hook alone).

## Reachability re-derived (the D29 premise)

D29's row says the site behaviour "is the planner's code read at `1e12837`, not run". Read again at `1e12837`:

- Send page: `WebhookProvider.tsx` `useValue` — `fetch(url).then(res => res.status === 200 ? res.json() : null).catch(() => null)`, so a failed fetch, a non-200 and a non-JSON 200 all leave `selectedWebhook === null`; `WebhookMenu/index.tsx` renders `errorMessage={url && !isWebhookLoading && selectedWebhook === null ? 'Invalid URL' : undefined}` on the custom-URL input. "Invalid URL" at the field on a network failure: confirmed, and already M4-b's condition.
- Dialog: `useValidateWebhook.ts` — the webhook effect's `catch` sets `webhookError` to `MESSAGE_LOAD_FAILED_ERROR` (D24's text); a JSON body with `message` shows Discord's text. Confirmed as the plan states.
- Dialog's receiving end: `NewMessageModal.tsx` consumes `webhookError` only through `messageErrorString` (line 185 at `1e12837`), rendered once at line 345–346 as `<div className="mt-2 text-sm text-error">` under `NullableComponent`; `grep -c 'errorMessage='` over the file = 0. There is no field-level error on the dialog's webhook URL input. This is M-C5-1.

## Findings

### Medium

**M-C5-1 MEDIUM cycle 5 pass 1 — The webhook-load limb names a place the New Message dialog does not have. Duplicates: CR-16 in code-review/015-bug-evaluation-fixes-code-review.md**
- **State**: OPEN.
- **Location**: plan § M4-d, "Network failure, webhook-URL load (D29, code review CR-14)": "shows exactly \"Invalid URL\" … at the webhook URL field" and the human-observable clause "both the send page and the New Message dialog show \"Invalid URL\" under the field".
- **Description**: at website `1e12837` the dialog renders every webhook error in one shared line below the load options (`NewMessageModal.tsx` `messageErrorString`, above); its URL input carries no `errorMessage`. The limb's place clause is read from the sibling (`WebhookMenu`'s field) and asserted over both sites; at the dialog it has no receiving end. The text clause is sound; the place clause is not.
- **Impact**: QA's cell and the UAT walk are aimed at a surface the dialog lacks, so as written the criterion can neither pass nor fail there; an implementer following the plan either adds a field error (new UI the owner did not select) or satisfies the text in the shared line and leaves the plan false.
- **Recommendation**: state the place per site — the field on the send page (M4-b), and for the dialog whichever CR-16's (a) or (b) the planner takes — and reword the human-observable walk to match. Choosing between (a) and (b) is design and is the planner's; a field-level error at the dialog would be a sibling-mirroring form and should say so, with D29's "copies the send page" read as the text, or as text and place, stated explicitly. Landing: the planner's CR-16 fold (already owed by the code review's REJECTED limb, plan changelog row 07:26); this critique re-reads it as pass 2.
- **Recurrence noted, no stop fired**: the shape — a plan clause naming a UI surface at one site read from its sibling rather than from the site's own render — appeared once before in this chain (rev 6's name-view button, dropped at rev 14 on the implementer's question). That instance was not a critique finding and lies in an earlier cycle, so the within-cycle stop authority does not fire; the standing constraint it suggests is for the planner: every clause in M4 that names where a text appears is read from that site's own render at the cited SHA, with the read beside it.

### Low

**L-C5-1 LOW cycle 5 pass 1 — Two precisions in the D29 limb and row.**
- **State**: OPEN.
- **Location**: plan § M4-d, the D29 limb; Decisions Register D29, verbatim column.
- **Description**: (i) The limb's class is "a webhook-URL fetch that fails with no response". At the dialog the same `catch` also fires when a response arrives whose body is not JSON (`res.json()` throws — a proxy's HTML error page); at the send page that member already shows "Invalid URL" (non-200 → `null`; 200 non-JSON → `catch` → `null`). The residue is unnamed, so the two sites' domains are not stated as the same class though the fix will make them so. (ii) The rulings block (`27f8cd7`) says the option label texts are steering's and the description the planner's; D29 says "The option text is the planner's, relayed by steering". The label "Agent: 'Invalid URL' at both" is steering's.
- **Impact**: (i) one unstated member per site in QA's derivation; (ii) a register attribution that misnames an author by one word.
- **Recommendation**: (i) name the class as {no response, a response that is not JSON} → "Invalid URL" at both sites, and {a JSON body with `message`} → each site's existing text, one clause; (ii) "label steering's, description the planner's". Landing: Planner batch row, folded with the CR-16 fold; no work is added.

## Risks register

RK-6 (the M8 wrong-stop class): rev 20 touches no M8 read; no new member.

## Questions

None for the owner. The CR-16 choice between the shared line and a field error is the planner's design call under D29; if the planner reads a field error as new UI beyond "copies the send page", that is the planner's own stop (planner.md, "a milestone-level scope delta (owner)"), not this gate's.

## Unresolved Open Questions

None: `grep -c 'OPEN QUESTION'` = 8, `grep -c 'OPEN QUESTION \['` = 8, bold open = 0.

## Verdict

**Pass 1 — APPROVED** (cycle 5, pass 1; after implementation approval, REQUEST REVISION reserved for HIGH or CRITICAL, none raised). Sized to the ask: 49 of 50 plus the CR-12 rider; D29 adds no scope. The D29 premise re-derived at `1e12837` holds at both sites. One MEDIUM, M-C5-1, duplicating code review CR-16 — the dialog has no field to show the text "under" — and one LOW, L-C5-1, both landing at the planner's CR-16 fold, which this critique reads as pass 2. D24–D29 terminal; nothing here re-raises them. RK-6: no new member. No owner-needing item.

**Next**: the planner (the CR-16 fold, with L-C5-1 as a batch row or folded in the same clause). QA and the implementer read the fold when it lands; the M4 change for D29 waits on it, as the code review says.
