---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Open
Status-Detail: "Cycle 4, pass 1, delta-bounded read of revisions 14–16 as one round (9cbe755..565e240, --numstat 91/15, read whole). Verdict APPROVED (after implementation approval): M1-i's residue, M2-a's third member, M4-c, M4-d's eight-host class over the shared constant and its two consumers, M6-f, X-17 and the M3 hold approved; D23's limb not re-read. New: M-C4-1 MEDIUM — M4-d's class is enumerated from the consumers of the fix's constant, not from the sites of the defect it fixes, and the second site (useValidateWebhook.ts, the New Message dialog's webhook load) still carries the permissive test at website b25f561; owed to the planner at its next pass while M4 is being coded. L-C4-1 LOW parks as a Planner batch row. Open until the M-C4-1 fold is read."
Artifact-Revision: 16 — read at agent-output 565e240
Reviewed-At: 565e240 — repos=agent-output; website b25f561 (chain/015-bug-evaluation-fixes, the tip at this read; the delta cites 6001f7f), preview-image-generator 471578f (chain/015-bug-evaluation-fixes), unchanged since cycle 1
Verdict: APPROVED
---

# Critique — Plan 015, Bug-evaluation fixes — cycle 4

Cycles 1–3 are closed under `critiques/closed/` (`015-bug-evaluation-fixes-critique.md`, `…-cycle2-critique.md`, `…-cycle3-critique.md`; the last at `6970763`, rev 13 approved). This document opens cycle 4 on revs 14–16, which change criterion text in M1-i, M2-a, M3 (held), M4-c, M4-d and M6-f and register D24–D26; the delta is fully readable in the diff, so the pass is delta-bounded and the whole-document read is the escalation, not taken. Per D23 the run-2 UTC assumption is not re-read; per steering's brief, M3 is held for a real-browser read and only its hold note is read here.

**Artifact**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 16 (`565e240`). Delta read whole: `git diff 9cbe755..565e240 -- planning/015-bug-evaluation-fixes.md` (`--numstat` 91/15); the fourteen intervening commits are the gates' rev-12/13 verdicts, code review Round 3, steering's rulings and R-5. Also read: rulings blocks 06:45Z, 06:46Z, 06:50Z, 06:52Z (`9b94838`, `6adf865`, `9f97a5f`, `7207289`); QA QAF-17, QAF-18; code review Round 2 sub-entry and CR-6 head; `handoff/providers-query-params-header-decode-throws-2026-11-08.md` header; website `src/constants/index.ts` `DISCORD_MESSAGE_LINK_REGEX` and every consumer at HEAD; `WebhookProvider.tsx` and `useValidateWebhook.ts` at `6001f7f` and `b25f561`; `message.ts` `getFromUrl`; `Picker.tsx`.
**Date**: 2026-11-08. **Critic**: critic-hooks-015.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-08T06:55 | steering-hooks-015 → critic-hooks-015 | Cycle 4 as one round over `9cbe755..565e240` (revs 14–16) | cycle 4 pass 1. Delta-bounded, boundary verified by `--numstat` against the commit list. Re-derived at website HEAD `b25f561`: the regex is `discord.com` only with `www.|canary.|ptb.`; its non-test consumers are `NewMessageModal.tsx:90` and `message.ts:70,72`, which destructures `[, guildId, channelId, messageId]`; `Picker.tsx` line 20 `initColor ? … : '#000000'`; the permissive message-id test `isValidUrl(x) \|\| /\d+/.test(x)` has two sites at `6001f7f` (`WebhookProvider.tsx:100`, `useValidateWebhook.ts:40`), and at `b25f561` only the first is changed. X-17's handoff carries `Owning-Stage` and an event-form `Review-Trigger`. New: M-C4-1 MEDIUM, L-C4-1 LOW. RK-6: no new member. APPROVED. |

## Assumption Not Checked

**Pass 1** assumes that a Playwright-driven Chrome can run on this box for M3's held read under E-1 isolation — D20 lifts the constraint but says installing Playwright is not implied, and no document records a browser launched through Playwright here (M8-c's one-launch settle is puppeteer's, and unread). Falsity signature: M3 stays held while every other website milestone closes, with no capture under `verification/015/` naming a Chrome version. Owner of closing: QA and the implementer, who own the read; the plan's fallback (a bundle of the dialog in Chrome) is theirs to arm — named again in the handoff.

**Measured this pass**: `git grep -n DISCORD_MESSAGE_LINK_REGEX HEAD -- src` → the definition, two imports, three use sites (`NewMessageModal.tsx:90`; `message.ts:70`, `:72`) — the plan's consumer enumeration holds. `git grep` for the permissive test at `6001f7f` → two sites (above); at `b25f561` `WebhookProvider.tsx` now tests `/^\d+$/` and `DISCORD_MESSAGE_LINK_REGEX.exec(text)?.[3]`, and `useValidateWebhook.ts:40` is unchanged.

## Value Statement Assessment

Unchanged at rev 16. No drift. D26's widening of the New Message dialog's link load is accepted by the owner as stated (rulings 06:52Z) and is registered as such.

## Overview

**Pricing against the ask**: sized to the ask, with one owner-accepted widening registered. Revs 14–16 register three owner rulings (D24–D26), fold six LOW gate findings, restate M4-c to a button that exists, hold M3 on an unsettled premise with both outcomes routed, and send CR-6 out as a handoff rather than a rider. D26 adds the New Message dialog's link load and `getFromUrl` to M4-d's criterion — scope growth, explicitly accepted by the owner at no extra milestone or round (OQ-J), so it is priced scope, not a finding. 49 of 50 findings, unchanged.

**Owed re-verdicts (rev 14–16 row)**: M1-i "present" = `cookies()` and its residue — **approved** (the two residue classes match my own pass-4 probe of Next 16.1.6's parser: the undecodable value dropped, the bare name present as `"true"`; next-auth writes neither). M2-a third member → M6-f — **approved** (`Picker.tsx` read; outcome-equivalent at 0; M6-f's text now names it). M3 premise unsettled, held — **approved as a hold**: the two probes' disagreement is stated with the planner's withdrawal recorded, the instrument's terms are attributed to QA, both outcomes are routed (the negative one to the owner before any re-fold); the milestone's body is not reviewed on this pass. M4-c restated — **approved** (the name-view button never existed; the criterion now names the one button, read against `WebhookMenu` by the implementer). M4-d over D24–D26 — **approved save M-C4-1** (below): the eight-host class is finite and listed, the shared constant is the one definition, the constant's consumers are enumerated by a tree-reading instrument, the match groups still yield guild, channel and message ids by position, the network-failure text is D24's verbatim, and the human-observable walk is named. M6-f covers colour 0 — approved. X-17 — **approved**: the handoff is routed (`Owning-Stage: planner`, event-form trigger, `Priority: low`).

## Findings

### Medium

**M-C4-1 MEDIUM cycle 4 pass 1 — M4-d's input class is enumerated from the consumers of the fix's constant, not from the sites of the defect it fixes, and the second site is left permissive.** State: OPEN. Plan § M4-d: "the message box accepts exactly two input classes, and refuses everything else before any fetch", with the class enumerated by `git grep -n DISCORD_MESSAGE_LINK_REGEX` at `6001f7f`. That grep finds where the *remedy* already lives; the *defect* F-27 names — the `isValidUrl(x) || /\d+/.test(x.trim())` test — has two sites at `6001f7f`: `src/providers/WebhookProvider.tsx:100` (the edit page's provider, the box M4-d names) and `src/utils/hooks/useValidateWebhook.ts:40`, the New Message dialog's webhook-load path (`NewMessageModal.tsx:84`), which derives the id by `split('/').pop()` and fetches `${url}/messages/${id}` for any valid URL. The plan's own "Network failure" limb says "in either validation effect", so it knows two effects exist, yet the input-class property is stated over one. At `b25f561` the implementer has changed the first site only. Impact: D24's "anything else is refused before fetching" is false for the New Message dialog's webhook load; the owner's standing sibling rule ("a bug in a shared pattern is fixed once … never fix it in one feature only", planner.md Milestones) is violated by the enumeration, not by the implementer, who coded to the plan. Recommendation: state M4-d's property over the class enumerated by the defect's predicate — `grep -n "/\\\\d+/.test" src` at the base, two members — naming `useValidateWebhook.ts` as the second site, with the same two admitted classes; or, if the planner reads the New Message dialog's webhook load as outside F-27's statement, an Exclusions row with a reason and a carrier. Whether this adds work to an open milestone is the planner's to judge against F-27's verbatim statement and to route (planner.md, "Revisions"); this critique proposes no design. Landing: the planner's next pass, while M4 is being coded; nothing else is held.

### Low

**L-C4-1 LOW cycle 4 pass 1 — Two wording precisions in M4-d.** State: OPEN. (i) "Refused members: text containing a digit" reads as refusing the all-digits id the property admits; the member is text that contains a digit but is not all digits (the base's `/\d+/` member). (ii) "`getFromUrl`'s match groups still yield channel id and message id" — the code destructures `[, guildId, channelId, messageId]`, so the property is over three groups by position, which a non-capturing host alternation preserves. Landing: Planner batch row; folds with M-C4-1 or at the next code-moving revision.

## Questions

None for the owner. M-C4-1's scope question, if the planner reads it as one, travels through the planner's own stop (planner.md, "a milestone-level scope delta (owner)").

## Unresolved Open Questions

None. OQ-J is `[RESOLVED]` at rev 16 by D26; no other `OPEN QUESTION` was added.

## Verdict

**Pass 1 — APPROVED** (cycle 4, pass 1; after implementation approval, so REQUEST REVISION is reserved for HIGH or CRITICAL and neither is raised). Sized to the ask: 49 of 50, with D26's widening registered as owner-accepted scope. D23's limb not re-read; M3 read as a hold only. One MEDIUM: M-C4-1 — M4-d's class is enumerated from the wrong predicate and leaves the New Message dialog's webhook load permissive; owed to the planner at its next pass, which is urgent only because M4 is being coded at `b25f561`. L-C4-1 parks as a Planner batch row. D24–D26 are terminal; nothing here re-raises them. RK-6: no new member. This critique closes when the M-C4-1 fold is read.

**Next**: the planner (M-C4-1 now; L-C4-1 as a batch row); the implementer reads M4-d's change at the fold. No owner-needing item from this gate.
