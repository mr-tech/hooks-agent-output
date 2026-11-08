---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Open
Status-Detail: "Cycle 5 pass 2: delta-bounded read of revision 21 (e118cc3..3d193f9, --numstat 42/60, read whole; the CR-16 fold and D30, M3 removed). Verdict APPROVED (after implementation approval). M-C5-1 verified landed → RESOLVED. L-C5-1 LOW stays OPEN, owed as a Planner batch row at the planner's next pass (rev 21 predates pass 1). No new finding. Closes when that row is read."
Artifact-Revision: 21 — read at agent-output 3d193f9; the plan body is unchanged through 081bb4e (architecture's rev 21 row)
Reviewed-At: 3d193f9 — repos=agent-output; website 3031878 (chain/015-bug-evaluation-fixes tip; the M4 tree the delta cites is 1e12837, and 1e12837..3031878 touches only src/server/__tests__/auth.hydrated-session.test.ts), preview-image-generator 471578f (chain/015-bug-evaluation-fixes), unchanged since cycle 1
Verdict: APPROVED
---

# Critique — Plan 015, Bug-evaluation fixes — cycle 5

**Artifact**: `planning/015-bug-evaluation-fixes.md`, revision 20 (`e118cc3`). **Analysis**: none commissioned for this delta. **Prior cycles**: `critiques/closed/015-bug-evaluation-fixes-critique.md` (cycle 1), `…-cycle2-critique.md`, `…-cycle3-critique.md`, `…-cycle4-critique.md` (closed at rev 19, `f8d564c`). **Date**: 2026-11-08.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-08T07:31 | steering-hooks-015 (message, 07:25Z) | cycle 5 pass 1: open cycle 5 as a delta read over `330348f..e118cc3` (rev 20: D29, the "Invalid URL" webhook-load limb at both F-27 sites) | Delta-bounded pass. Both sites' failure behaviour re-derived at website `1e12837`: the D29 premise holds. One MEDIUM (M-C5-1, duplicates CR-16): the limb places the text "at the webhook URL field" / "under the field" at both sites, and the New Message dialog has no such surface. One LOW (L-C5-1): the failure class names only "no response" where the dialog's catch also fires on a non-JSON response; D29's attribution precision. RK-6: no new member. Verdict APPROVED; both findings owed at the CR-16 fold. |
| 2026-11-08T07:31 | steering-hooks-015 (message, 07:29Z) | cycle 5 pass 2: read `e118cc3..3d193f9` (rev 21: the CR-16 fold, D30 — M3 removed, X-18) | Delta-bounded pass. M-C5-1 verified landed (each site's place stated; the dialog's on its shared error line, matching the `1e12837` read) → RESOLVED. D30 and X-18 read against `verification/015/m3-chrome-read/README.md` (`8996505`): the plan's restatement matches the capture; the dead compare's class re-counted at `6001f7f` = 3 sites; the dropped WIP test lives only under `verification/`, so "no test in this chain" holds. L-C5-1 not folded (rev 21 predates pass 1): OPEN, a Planner batch row owed. No new finding; RK-6 no new member. Verdict APPROVED. |

## Boundary (pass 2, rev 21)

Delta-bounded: `git diff --numstat e118cc3..3d193f9 -- planning/015-bug-evaluation-fixes.md` = 42/60, read whole (`scratchpad/rev21-plan.diff`); `steering/015-rulings.md` 4/0 (the 07:26Z block, read). The delta rewrites the webhook-load limb's place clauses, replaces § M3's body with its removal, drops M3 from the uat Reading Order row, the stored-state line and the Testing Strategy, adds D30, X-18, one Owed re-verdicts row, the changelog row, and closes the M3 Planner batch row. M3's removal reshapes a milestone, but the reshaping is fully readable in the diff — the new § M3 is twelve lines resting on one capture — so the whole-document read is not taken; the boundary check is my own grep for `\bM3\b` over the rev 21 body: 12 hits, all in the header, the register, changelog and batch history, or the new § M3 — none a stale "held for a Chrome read" in body text. After `3d193f9` the plan moved to `081bb4e` by one architecture changelog row. Pass 1's boundary is below.

## Boundary (pass 1, rev 20)

Delta-bounded, the cycle's entry pass: `git diff --numstat 330348f..e118cc3 -- planning/015-bug-evaluation-fixes.md` = 26/8, and the diff was read whole (`scratchpad/rev20-plan.diff`). The delta is one new M4-d limb, the old-message network clause re-scoped, the D29 register row, the header, one Owed re-verdicts row, one changelog row and the planner's Resumption State; no milestone is reshaped, so the whole-document read is not the entry. After `e118cc3` the plan moved to `8b7d585` by two code-review changelog rows (`--numstat 2/0`; the Round 2 sub-entry and Round 8), neither touching criterion text. The rulings block the delta cites (`27f8cd7`, "CR-14") was read; the later block (07:26Z, "M3: drop M3, not a defect", `f005cef`) is not folded at rev 20 and is outside this pass. Standing exclusions carried from cycle 4: D23's run-2 UTC assumption is not re-read; M3 is read only as a hold.

## Pricing

Sized to the ask: 49 of 50 findings plus the owner-selected CR-12 rider (D27). D29 adds no scope — it aligns the two F-27 sites on a failure text within F-27's own fix, selected by the owner with its cost stated (rulings 07:24Z). The next revision will carry the M3 drop (rulings 07:26Z), which changes the "49 of 50" line; that is the planner's row to write, not this pass's.

## Value Statement Assessment

Unchanged at rev 20; assessed in cycle 1. The new limb serves the value-statement sentence on a legible failure (a dropped connection tells the user something true) and defers nothing.

## Assumption Not Checked

**Pass 2.** This pass assumes that the `next dev --webpack` rendering the Chrome read ran matches the production build's focus and keydown routing in the three dialogs — the residue X-18 already names — and does not test it: the read ran the dev server only. Falsity's signature: on the deployed site, Enter with focus on Cancel runs the confirm action where the dev read showed it unrun. Owner of closing it: X-18's stated limit with D30's reopening class (a real-browser read or a user report), recorded under D30; UAT's walk of the deployed site is the first place it could be seen. The pass-1 assumption on `messageErrorString` precedence stands, now stated in the plan ("Its precedence over the other load errors is unchanged") and owned by QA Phase 2's dialog cell.

**Pass 1.** This pass assumes that in the New Message dialog's webhook load option the two error sources that precede `webhookError` in `NewMessageModal` `messageErrorString` (`discordMessageError?.message ?? commandMessageError?.message ?? webhookError ?? webhookMessageError`, website `1e12837`) are null, so the D29 text would be the string shown; it was read, not run. Falsity's signature: with the network cut, the dialog shows a stale bot-link or command error, or nothing, where "Invalid URL" is expected. Owner of closing it: QA Phase 2's cell on the dialog at the D29 fix SHA (and the implementer's test, which must mount the dialog's error line, not the hook alone).

## Reachability re-derived (the D29 premise)

D29's row says the site behaviour "is the planner's code read at `1e12837`, not run". Read again at `1e12837`:

- Send page: `WebhookProvider.tsx` `useValue` — `fetch(url).then(res => res.status === 200 ? res.json() : null).catch(() => null)`, so a failed fetch, a non-200 and a non-JSON 200 all leave `selectedWebhook === null`; `WebhookMenu/index.tsx` renders `errorMessage={url && !isWebhookLoading && selectedWebhook === null ? 'Invalid URL' : undefined}` on the custom-URL input. "Invalid URL" at the field on a network failure: confirmed, and already M4-b's condition.
- Dialog: `useValidateWebhook.ts` — the webhook effect's `catch` sets `webhookError` to `MESSAGE_LOAD_FAILED_ERROR` (D24's text); a JSON body with `message` shows Discord's text. Confirmed as the plan states.
- Dialog's receiving end: `NewMessageModal.tsx` consumes `webhookError` only through `messageErrorString` (line 185 at `1e12837`), rendered once at line 345–346 as `<div className="mt-2 text-sm text-error">` under `NullableComponent`; `grep -c 'errorMessage='` over the file = 0. There is no field-level error on the dialog's webhook URL input. This is M-C5-1.

## Rev 21 read against its sources (pass 2)

- **CR-16 fold.** The limb now names the send page's field error (`WebhookMenu` `errorMessage`) and the dialog's shared error line (`NewMessageModal` `messageErrorString`, carrying `webhookError`), with `grep -c "errorMessage="` = 0 cited for the dialog — the same read as this critique's at `1e12837`. The cell "fails if the text appears nowhere or anywhere else" is a property at each site's stated place. The fold rides D29's "copies the send page. One small change" rather than adding a field error; the changelog says so and names the alternative not taken. Nothing is owed on this limb.
- **D30 / § M3 / X-18.** The plan's restatement of the capture matches `verification/015/m3-chrome-read/README.md` (`8996505`) on every point checked: tree `6001f7f`, Chrome 156.0.8078.47, `next dev --webpack` after a Turbopack failure, three dialogs, cell (a) survived/present/not saved in each with the focus trail ending on `BUTTON:Cancel` (`run-warningdialog-output.txt`), controls (b), (c) run the action, (d) does not, and "Enter on Clear not run". The class the dead compare defines: `git grep -c "tagName !== '~/components/Button'" 6001f7f -- src` = 3 files (`ConfirmationDialog`, `ImageUploader`, `WarningDialog`), the three the read covers. X-18's residue names the uploader's Clear, a production build and other browsers; D30's reopening class names the observation and the report that would reopen it, so the detection cost is stated (a real-browser read or a user report, recorded under D30). "No fix and no test in this chain" holds: the implementer's dropped WIP test is committed as `verification/015/m3-dropped-wip-dialogs.enter-key.test.tsx.txt` (`761a3c8`), and `1e12837..3031878` in website touches only `auth.hydrated-session.test.ts`.
- **Value statement.** Its sentence "a Cancel key press never deletes" is carried as already true at `6001f7f` with the read as evidence, and no milestone or UAT walk now delivers it (the uat Reading Order row drops M3). Not a finding: the chain ships no change to the dialogs, so the human-observable-form rule (behaviour the plan changes) does not bind, and the scope of the evidence is in the sentence ("at `6001f7f`") with the residue in X-18. The value statement's text is unchanged.
- **Pricing.** "47 of 50 fixed, F-15/F-39 closed as not reproducible, plus one rider" — consistent with pass 1's 49 of 50 less the two closed.
- **PREMISE-STALE.** Removing a milestone that wrote no code ships no product behaviour; no marking is owed.

## Findings

### Medium

**M-C5-1 MEDIUM cycle 5 pass 1 — The webhook-load limb names a place the New Message dialog does not have. Duplicates: CR-16 in code-review/015-bug-evaluation-fixes-code-review.md**
- **State**: RESOLVED at pass 2 — rev 21 (`3d193f9`) states each site's place; the dialog's is its shared error line below the load options, the field-error form named as not taken. With code review CR-16 (`e524a96`), the same member. The argument below is retained as raised.
- **Location**: plan § M4-d, "Network failure, webhook-URL load (D29, code review CR-14)": "shows exactly \"Invalid URL\" … at the webhook URL field" and the human-observable clause "both the send page and the New Message dialog show \"Invalid URL\" under the field".
- **Description**: at website `1e12837` the dialog renders every webhook error in one shared line below the load options (`NewMessageModal.tsx` `messageErrorString`, above); its URL input carries no `errorMessage`. The limb's place clause is read from the sibling (`WebhookMenu`'s field) and asserted over both sites; at the dialog it has no receiving end. The text clause is sound; the place clause is not.
- **Impact**: QA's cell and the UAT walk are aimed at a surface the dialog lacks, so as written the criterion can neither pass nor fail there; an implementer following the plan either adds a field error (new UI the owner did not select) or satisfies the text in the shared line and leaves the plan false.
- **Recommendation**: state the place per site — the field on the send page (M4-b), and for the dialog whichever CR-16's (a) or (b) the planner takes — and reword the human-observable walk to match. Choosing between (a) and (b) is design and is the planner's; a field-level error at the dialog would be a sibling-mirroring form and should say so, with D29's "copies the send page" read as the text, or as text and place, stated explicitly. Landing: the planner's CR-16 fold (already owed by the code review's REJECTED limb, plan changelog row 07:26); this critique re-reads it as pass 2.
- **Recurrence noted, no stop fired**: the shape — a plan clause naming a UI surface at one site read from its sibling rather than from the site's own render — appeared once before in this chain (rev 6's name-view button, dropped at rev 14 on the implementer's question). That instance was not a critique finding and lies in an earlier cycle, so the within-cycle stop authority does not fire; the standing constraint it suggests is for the planner: every clause in M4 that names where a text appears is read from that site's own render at the cited SHA, with the read beside it.

### Low

**L-C5-1 LOW cycle 5 pass 1 — Two precisions in the D29 limb and row.**
- **State**: OPEN at pass 2 — rev 21 (`3d193f9`) was written before pass 1 was committed (`6a4c245`) and does not fold it; the limb still reads "fails with no response" and D29 still reads "The option text is the planner's". Landing: a Planner batch row at the planner's next pass; this critique closes when the row is read.
- **Location**: plan § M4-d, the D29 limb; Decisions Register D29, verbatim column.
- **Description**: (i) The limb's class is "a webhook-URL fetch that fails with no response". At the dialog the same `catch` also fires when a response arrives whose body is not JSON (`res.json()` throws — a proxy's HTML error page); at the send page that member already shows "Invalid URL" (non-200 → `null`; 200 non-JSON → `catch` → `null`). The residue is unnamed, so the two sites' domains are not stated as the same class though the fix will make them so. (ii) The rulings block (`27f8cd7`) says the option label texts are steering's and the description the planner's; D29 says "The option text is the planner's, relayed by steering". The label "Agent: 'Invalid URL' at both" is steering's.
- **Impact**: (i) one unstated member per site in QA's derivation; (ii) a register attribution that misnames an author by one word.
- **Recommendation**: (i) name the class as {no response, a response that is not JSON} → "Invalid URL" at both sites, and {a JSON body with `message`} → each site's existing text, one clause; (ii) "label steering's, description the planner's". Landing: Planner batch row, folded with the CR-16 fold; no work is added.

## Risks register

RK-6 (the M8 wrong-stop class): revs 20 and 21 touch no M8 read; no new member at either pass.

## Questions

None for the owner at either pass. (Pass 1:) The CR-16 choice between the shared line and a field error is the planner's design call under D29; if the planner reads a field error as new UI beyond "copies the send page", that is the planner's own stop (planner.md, "a milestone-level scope delta (owner)"), not this gate's.

## Unresolved Open Questions

None: `grep -c 'OPEN QUESTION'` = 8, `grep -c 'OPEN QUESTION \['` = 8, bold open = 0 (rev 20; rev 21 adds none — the diff carries no `OPEN QUESTION` line).

## Verdict

**Pass 2 — APPROVED** (cycle 5, pass 2; after implementation approval, REQUEST REVISION reserved for HIGH or CRITICAL, none raised). Sized to the ask: 47 of 50 fixed, F-15/F-39 closed as not reproducible under D30, plus the CR-12 rider; rev 21 adds no work and removes M3's. M-C5-1 verified landed → RESOLVED. D30's restatement of the Chrome read matches the capture, the dead compare's class is three sites and the read covers all three, and X-18 names the residue with D30 the row a report lands under. L-C5-1 LOW stays OPEN as a Planner batch row owed at the planner's next pass, which this critique closes on. D24–D30 terminal; nothing here re-raises them. RK-6: no new member. No owner-needing item.

**Next**: the planner (L-C5-1's batch row at its next pass; nothing else is owed from this gate). The implementer's D29 change at both sites may proceed against rev 21, as the code review's Round 8 conditioned it on this fold; QA reads rev 21 for its M4 re-key and the M3 cells' retirement.

---

**Pass 1 — APPROVED** (cycle 5, pass 1; after implementation approval, REQUEST REVISION reserved for HIGH or CRITICAL, none raised). Sized to the ask: 49 of 50 plus the CR-12 rider; D29 adds no scope. The D29 premise re-derived at `1e12837` holds at both sites. One MEDIUM, M-C5-1, duplicating code review CR-16 — the dialog has no field to show the text "under" — and one LOW, L-C5-1, both landing at the planner's CR-16 fold, which this critique reads as pass 2. D24–D29 terminal; nothing here re-raises them. RK-6: no new member. No owner-needing item.

**Next**: the planner (the CR-16 fold, with L-C5-1 as a batch row or folded in the same clause). QA and the implementer read the fold when it lands; the M4 change for D29 waits on it, as the code review says.
